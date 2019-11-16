package net.sf.odinms.net.channel.handler;

import java.net.SocketAddress;
import java.rmi.RemoteException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collection;
import java.util.List;


import java.util.logging.Level;
import net.sf.odinms.client.BuddylistEntry;
import net.sf.odinms.client.CharacterNameAndId;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleQuestStatus;
import net.sf.odinms.client.SkillFactory;
import net.sf.odinms.database.DatabaseConnection;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.net.world.CharacterIdChannelPair;
import net.sf.odinms.net.world.MaplePartyCharacter;
import net.sf.odinms.net.world.PartyOperation;
import net.sf.odinms.net.world.PlayerBuffValueHolder;
import net.sf.odinms.net.world.guild.MapleAlliance;
import net.sf.odinms.net.world.remote.WorldChannelInterface;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;
import net.sf.odinms.server.MapleItemInformationProvider;
import net.sf.odinms.client.MapleInventoryType;
import net.sf.odinms.client.IItem;


public class PlayerLoggedinHandler extends AbstractMaplePacketHandler {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(PlayerLoggedinHandler.class);

    @Override
    public boolean validateState(MapleClient c) {
        return !c.isLoggedIn();
    }

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int cid = slea.readInt();
        MapleCharacter player = null;
        try {
            player = MapleCharacter.loadCharFromDB(cid, c, true);
            c.setPlayer(player);
        } catch (SQLException e) {
            log.error("载入人物失败", e);
        }
        c.setAccID(player.getAccountID());
        int state = c.getLoginState();
        boolean allowLogin = true;
        ChannelServer channelServer = c.getChannelServer();
        synchronized (this) {
            try {
                WorldChannelInterface worldInterface = channelServer.getWorldInterface();
                if (state == MapleClient.LOGIN_SERVER_TRANSITION) {
                    for (String charName : c.loadCharacterNames(c.getWorld())) {
                        if (worldInterface.isConnected(charName)) {
                            allowLogin = false;
                            break;
                        }
                    }
                }
            } catch (RemoteException e) {
                channelServer.reconnectWorld();
                allowLogin = false;
            }
            if (state != MapleClient.LOGIN_SERVER_TRANSITION || !allowLogin) {
                c.setPlayer(null);
                c.getSession().close();
                return;
            }
            c.updateLoginState(MapleClient.LOGIN_LOGGEDIN);
        }
        ChannelServer cserv = ChannelServer.getInstance(c.getChannel());
        cserv.addPlayer(player);
        //在这里先取消掉所有的状态，主要防止召唤兽复制。
        //player.cancelAllBuffs(); //取消自己的技能效果
        try {
            List<PlayerBuffValueHolder> buffs = ChannelServer.getInstance(c.getChannel()).getWorldInterface().getBuffsFromStorage(cid);
            if (buffs != null) {
                c.getPlayer().silentGiveBuffs(buffs);
            }
        } catch (RemoteException e) {
            c.getChannelServer().reconnectWorld();
        }
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("SELECT skillid, starttime,length FROM cooldowns WHERE characterid = ?");
            ps.setInt(1, c.getPlayer().getId());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                if (rs.getLong("length") + rs.getLong("starttime") - System.currentTimeMillis() <= 0) {
                    continue;
                }
                c.getPlayer().giveCoolDowns(rs.getInt("skillid"), rs.getLong("starttime"), rs.getLong("length"));
            }
            rs.close();
            ps.close();
            ps = con.prepareStatement("DELETE FROM cooldowns WHERE characterid = ?");
            ps.setInt(1, c.getPlayer().getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException se) {
            se.printStackTrace();
        }
        c.getSession().write(MaplePacketCreator.getCharInfo(player));
        //SocketAddress ip = c.getSession().getRemoteAddress();
        if (player.gmLevel() > 0) {
        }
        if (player.gmLevel() == 0) {
        System.out.print("玩家 [ " + c.getPlayer().getName() + " ],Lv "+c.getPlayer().getLevel()+" .进入了游戏服务器.\r\n");
       }else {
        System.out.print("管理员 [ " + c.getPlayer().getName() + " ] .进入游戏服务器.\r\n");
            //SkillFactory.getSkill(9001002).getEffect(1).applyTo(player);//神圣祈祷
            //SkillFactory.getSkill(9001003).getEffect(1).applyTo(player);//枫印祝福
            //SkillFactory.getSkill(9001008).getEffect(1).applyTo(player);//神圣之火
            SkillFactory.getSkill(9001001).getEffect(1).applyTo(player);//上乘轻功
            SkillFactory.getSkill(9001004).getEffect(1).applyTo(player);//隐身
        }
        if(c.getPlayer().getHp() < 50) { //这里判断暂时这样写吧！
        c.getSession().write(MaplePacketCreator.serverNotice(5, "[游戏公告] 生命低于 50 !请留意HP!"));
         }
        String prefix = "";
        IItem eqp = player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -17);
        if (eqp != null && eqp.getItemId()== 1122017) {  //1122017精灵吊坠
            prefix ="由于装备了"+MapleItemInformationProvider.getInstance().getName(eqp.getItemId())+",打猎时额外获得10%的经验值奖励.";
            c.getPlayer().dropMessage(5, prefix);
        }
                if (eqp != null && eqp.getItemId()== 1122018) {  //1122018温暖的围脖
            prefix ="由于装备了"+MapleItemInformationProvider.getInstance().getName(eqp.getItemId())+",打猎时额外获得10%的经验值奖励.";
            c.getPlayer().dropMessage(5, prefix);
        }
            if(c.getPlayer().isGM()) {
                c.getPlayer().dropMessage("当前在线人数为:" + c.getPlayer().Lianjie() + "人");
            }else
        player.sendKeymap();
        c.getSession().write(MaplePacketCreator.sendAutoHpPot(c.getPlayer().getAutoHpPot()));
        c.getSession().write(MaplePacketCreator.sendAutoMpPot(c.getPlayer().getAutoMpPot()));
        player.getMap().addPlayer(player);
        try {
            Collection<BuddylistEntry> buddies = player.getBuddylist().getBuddies();
            int buddyIds[] = player.getBuddylist().getBuddyIds();
            cserv.getWorldInterface().loggedOn(player.getName(), player.getId(), c.getChannel(), buddyIds);
            if (player.getParty() != null) {
                channelServer.getWorldInterface().updateParty(player.getParty().getId(), PartyOperation.LOG_ONOFF, new MaplePartyCharacter(player));
            }
            CharacterIdChannelPair[] onlineBuddies = cserv.getWorldInterface().multiBuddyFind(player.getId(), buddyIds);
            for (CharacterIdChannelPair onlineBuddy : onlineBuddies) {
                BuddylistEntry ble = player.getBuddylist().get(onlineBuddy.getCharacterId());
                ble.setChannel(onlineBuddy.getChannel());
                player.getBuddylist().put(ble);
            }
            c.getSession().write(MaplePacketCreator.updateBuddylist(buddies));
            c.getSession().write(MaplePacketCreator.loadFamily(player));
            if (player.getFamilyId() > 0) {
                c.getSession().write(MaplePacketCreator.getFamilyInfo(player));
            }
            c.getPlayer().sendMacros();
            if (player.getGuildId() > 0) {
                c.getChannelServer().getWorldInterface().setGuildMemberOnline(player.getMGC(), true, c.getChannel());
                c.getSession().write(MaplePacketCreator.showGuildInfo(player));
                int allianceId = player.getGuild().getAllianceId();
                if (allianceId > 0) {
                    MapleAlliance newAlliance = channelServer.getWorldInterface().getAlliance(allianceId);
                    if (newAlliance == null) {
                        newAlliance = MapleAlliance.loadAlliance(allianceId);
                        channelServer.getWorldInterface().addAlliance(allianceId, newAlliance);
                    }
                    c.getSession().write(MaplePacketCreator.getAllianceInfo(newAlliance));
                    c.getSession().write(MaplePacketCreator.getGuildAlliances(newAlliance, c));
                    c.getChannelServer().getWorldInterface().allianceMessage(allianceId, MaplePacketCreator.allianceMemberOnline(player, true), player.getId(), -1);
                }
            }
        } catch (RemoteException e) {
            log.info("REMOTE THROW", e);
            channelServer.reconnectWorld();
        }
        player.updatePartyMemberHP();
        for (MapleQuestStatus status : player.getStartedQuests()) {
            c.getSession().write(MaplePacketCreator.weirdStatUpdate()); //修复频道退出
            if (status.hasMobKills()) {
                c.getSession().write(MaplePacketCreator.updateQuestMobKills(status));
            }
        }
        CharacterNameAndId pendingBuddyRequest = player.getBuddylist().pollPendingRequest();
        if (pendingBuddyRequest != null) {
            player.getBuddylist().put(new BuddylistEntry(pendingBuddyRequest.getName(), pendingBuddyRequest.getId(), -1, false));
            c.getSession().write(MaplePacketCreator.requestBuddylistAdd(pendingBuddyRequest.getId(), pendingBuddyRequest.getName()));
        }
        try {
            player.showNote();
        } catch (SQLException ex) {
            java.util.logging.Logger.getLogger(PlayerLoggedinHandler.class.getName()).log(Level.SEVERE, null, ex);
        }
        if(!c.getPlayer().hasMerchant() && c.getPlayer().tempHasItems()){
            c.getPlayer().dropMessage(1, "请通过弗兰德里取回保管的物品");
        }
        player.checkMessenger();
        player.showMapleTips();
        player.checkBerserk();
        player.checkDuey();
        //player.expirationTask();
        c.getSession().write(MaplePacketCreator.showCharCash(c.getPlayer()));
        c.getSession().write(MaplePacketCreator.weirdStatUpdate());
        }
} 
