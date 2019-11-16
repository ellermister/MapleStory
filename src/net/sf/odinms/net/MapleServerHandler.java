package net.sf.odinms.net;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.net.login.LoginServer;
import net.sf.odinms.net.login.LoginWorker;
import net.sf.odinms.tools.HexTool;
import net.sf.odinms.tools.MapleAESOFB;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.ByteArrayByteStream;
import net.sf.odinms.tools.data.input.GenericSeekableLittleEndianAccessor;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

import org.apache.mina.common.IdleStatus;
import org.apache.mina.common.IoHandlerAdapter;
import org.apache.mina.common.IoSession;

public class MapleServerHandler extends IoHandlerAdapter {

    private final static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(MapleServerHandler.class);
    private final static short MAPLE_VERSION = 79;
    private PacketProcessor processor;
    private int channel = -1;
    private boolean trace = false;

    public MapleServerHandler(PacketProcessor processor) {
        this.processor = processor;
    }

    public MapleServerHandler(PacketProcessor processor, int channel) {
        this.processor = processor;
        this.channel = channel;
    }

    @Override
    public void messageSent(IoSession session, Object message) throws Exception {
        Runnable r = ((MaplePacket) message).getOnSend();
        if (r != null) {
            r.run();
        }
        super.messageSent(session, message);
    }

    @Override
    public void exceptionCaught(IoSession session, Throwable cause) throws Exception {
        //MapleClient client = (MapleClient) session.getAttribute(MapleClient.CLIENT_KEY);
        //log.error(MapleClient.getLogMessage(client, cause.getMessage()), cause);
    }

    @Override
    public void sessionOpened(IoSession session) throws Exception {
        //log.info("IoSession with {} opened", session.getRemoteAddress());
        if (!LoginServer.getInstance().ipCanConnect(session.getRemoteAddress().toString())) {
            session.close();
            return;
        }
        LoginServer.getInstance().addConnectedIP(session.getRemoteAddress().toString());

        if (channel > -1) {
            if (ChannelServer.getInstance(channel).isShutdown()) {
                session.close();
                return;
            }
        }

        byte ivRecv[] = {70, 114, 122, 82};
        byte ivSend[] = {82, 48, 120, 115};

        ivRecv[3] = (byte) (Math.random() * 255);
        ivSend[3] = (byte) (Math.random() * 255);
        MapleAESOFB sendCypher = new MapleAESOFB(MapleAESOFB.MAPLE_AES_KEY, ivSend, (short) (0xFFFF - MAPLE_VERSION));
        MapleAESOFB recvCypher = new MapleAESOFB(MapleAESOFB.MAPLE_AES_KEY, ivRecv, MAPLE_VERSION);

        MapleClient client = new MapleClient(sendCypher, recvCypher, session);
        client.setChannel(channel);

        session.write(MaplePacketCreator.getHello(MAPLE_VERSION, ivSend, ivRecv, false));
        session.setAttribute(MapleClient.CLIENT_KEY, client);
        session.setIdleTime(IdleStatus.READER_IDLE, 30);
        session.setIdleTime(IdleStatus.WRITER_IDLE, 30);
    }

    @Override
    public void sessionClosed(IoSession session) throws Exception {
        synchronized (session) {
            MapleClient client = (MapleClient) session.getAttribute(MapleClient.CLIENT_KEY);
            if (client != null) {
                client.disconnect();
                LoginWorker.getInstance().deregisterClient(client);
                session.removeAttribute(MapleClient.CLIENT_KEY);
            }
        }
        super.sessionClosed(session);
    }

    @Override
    public void messageReceived(IoSession session, Object message) throws Exception {
        byte[] content = (byte[]) message;

        SeekableLittleEndianAccessor slea = new GenericSeekableLittleEndianAccessor(new ByteArrayByteStream(content));
        short packetId = slea.readShort();
        MapleClient client = (MapleClient) session.getAttribute(MapleClient.CLIENT_KEY);

        MaplePacketHandler packetHandler = processor.getHandler(packetId);
        if (log.isTraceEnabled() || log.isInfoEnabled()) {
            String from = "";
            if (client.getPlayer() != null) {
                from = "from " + client.getPlayer().getName() + " ";
            }
            if (packetHandler == null) {
                //log.info("发现玩家  {} ({}) {}\n{}", new Object[]{from, content.length, HexTool.toString(content), HexTool.toStringFromAscii(content)});
            } else if (log.isTraceEnabled()) {
                //log.trace("有消息 {}由 {} ({}) {}\n{}", new Object[]{from, packetHandler.getClass().getSimpleName(), content.length, HexTool.toString(content), HexTool.toStringFromAscii(content)});
            }
        }
        if (packetHandler != null && packetHandler.validateState(client)) {
            try {
                if (trace) {
                    String from = "";
                    if (client.getPlayer() != null) {
                        from = "from " + client.getPlayer().getName() + " ";
                    }
                    log.info("Got Message {}handled by {} ({}) {}\n{}", new Object[]{from, packetHandler.getClass().getSimpleName(), content.length, HexTool.toString(content), HexTool.toStringFromAscii(content)});
                }
                packetHandler.handlePacket(slea, client);
                if (client.hasPacketLog()) {
                    String handlerName = packetHandler.getClass().getSimpleName();
                    if (!handlerName.matches("NPCAnimation") && !handlerName.matches("NoOpHandler") && !handlerName.matches("MovePlayerHandler") && !handlerName.matches("SpecialMoveHandler") && !handlerName.matches("HealOvertimeHandler")) {
                        StringBuilder plogs = new StringBuilder("Received packet handled by ");
                        plogs.append(packetHandler.getClass().getSimpleName());
                        plogs.append(" (");
                        plogs.append(content.length);
                        plogs.append(")\r\n");
                        plogs.append(HexTool.toString(content));
                        plogs.append("\r\n");
                        plogs.append(HexTool.toStringFromAscii(content));
                        plogs.append("\r\n\r\n\r\n");
                        //Didn't work Angel-SL
                        //String plogs = String.format("Received packet handled by {} ({})\r\n{}\r\n{}\r\n\r\n", new Object[] { packetHandler.getClass().getSimpleName(), content.length, HexTool.toString(content), HexTool.toStringFromAscii(content) });
                        client.writePacketLog(plogs.toString());
                    }
                }
            } catch (Throwable t) {
                log.error(MapleClient.getLogMessage(client, "Exception during processing packet: " + packetHandler.getClass().getName() + ": " + t.getMessage()), t);
                t.printStackTrace();
            }
        }
    }

    @Override
    public void sessionIdle(final IoSession session, final IdleStatus status) throws Exception {
        MapleClient client = (MapleClient) session.getAttribute(MapleClient.CLIENT_KEY);

        if (client != null && client.getPlayer() != null && log.isTraceEnabled()) {
            log.trace("Player {} went idle", client.getPlayer().getName());
        }

        if (client != null) {
            client.sendPing();
        }
        super.sessionIdle(session, status);
    }
}
