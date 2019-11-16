package net.sf.odinms.net.channel.handler;

import java.util.Iterator;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;
import net.sf.odinms.net.world.guild.*;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MaplePet;
import net.sf.odinms.client.MapleCharacter;
public class GuildOperationHandler extends AbstractMaplePacketHandler {
private int paypalnx;

    private boolean isGuildNameAcceptable(String name) {
        if (name.getBytes().length < 3 || name.getBytes().length > 12) {
            return false;
        }
        return true;
    }
    private void respawnPlayer(MapleCharacter mc) {
        mc.getMap().broadcastMessage(mc, MaplePacketCreator.removePlayerFromMap(mc.getId()), false);
        mc.getMap().broadcastMessage(mc, MaplePacketCreator.spawnPlayerMapobject(mc), false);
        if (mc.getNoPets() > 0) {
            for (MaplePet pet : mc.getPets()) {
                if (pet != null) {
                    mc.getMap().broadcastMessage(mc, MaplePacketCreator.showPet(mc, pet, false, false), false);
                }
            }
        }
    }

    private class Invited {

        public String name;
        public int gid;
        public long expiration;

        public Invited(String n, int id) {
            name = n.toLowerCase();
            gid = id;
            expiration = System.currentTimeMillis() + 60 * 60 * 1000; // 1 hr expiration
        }

        @Override
        public boolean equals(Object other) {
            if (!(other instanceof Invited)) {
                return false;
            }
            Invited oth = (Invited) other;
            return (gid == oth.gid && name.equals(oth));
        }
    }
    private org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(this.getClass());
    private java.util.List<Invited> invited = new java.util.LinkedList<Invited>();
    private long nextPruneTime = System.currentTimeMillis() + 20 * 60 * 1000;

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        // prune away any expired guild requests
        if (System.currentTimeMillis() >= nextPruneTime) {
            Iterator<Invited> itr = invited.iterator();
            Invited inv;
            while (itr.hasNext()) {
                inv = itr.next();
                if (System.currentTimeMillis() >= inv.expiration) {
                    itr.remove();
                }
            }

            nextPruneTime = System.currentTimeMillis() + 20 * 60 * 1000;
        }
        MapleCharacter mc = c.getPlayer();
        byte type = slea.readByte();
        switch (type) {
            case 0x02:
                // guild creation 3C 00 02 07 00 73 79 6E 65 72 67 79
                if (mc.getGuildId() > 0 || mc.getMapId() != 200000301) {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "你已经有家族了,不能创建家族."));
                    return;
                }
                if (mc.getMeso() < MapleGuild.CREATE_GUILD_COST) {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "你没有足够的金币创建家族."));
                    return;
                }
                String guildName = slea.readMapleAsciiString();
                if (!isGuildNameAcceptable(guildName)) {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "你不能使用这个家族名."));
                    return;
                }
                int gid;
                try {
                    gid = c.getChannelServer().getWorldInterface().createGuild(mc.getId(), guildName);
                } catch (java.rmi.RemoteException re) {
                    log.error("RemoteException occurred", re);
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "Unable to connect to the World Server. Please try again later."));
                    return;
                }
                if (gid == 0) {
                    c.getSession().write(MaplePacketCreator.genericGuildMessage((byte) 0x1c));
                    return;
                }
                mc.gainMeso(-MapleGuild.CREATE_GUILD_COST, true, false, true);
                mc.setGuildId(gid);
                mc.setGuildRank(1);
                mc.saveGuildStatus();
                c.getSession().write(MaplePacketCreator.showGuildInfo(mc));
                c.getSession().write(MaplePacketCreator.serverNotice(1, "创建家族成功."));
                if (c.getPlayer().getLevel() >= 120) {
                    c.getPlayer().finishAchievement(7);
                     c.getSession().write(MaplePacketCreator.serverNotice(5, "创建家族成功！"));
                } else {
                   c.getSession().write(MaplePacketCreator.serverNotice(5, "创建家族成功！"));
                }
                respawnPlayer(mc);
                break;

            case 0x05:
                // invitation - make sure this person is authorized to invite
                if (mc.getGuildId() <= 0 || mc.getGuildRank() > 2) {
                    log.info("[hax] " + mc.getName() + " used guild invitation when s/he isn't allowed.");
                    return;
                }
                String name = slea.readMapleAsciiString();
                MapleGuildResponse mgr = MapleGuild.sendInvite(c, name);
                if (mgr != null) {
                    c.getSession().write(mgr.getPacket());
                } else {
                    Invited inv = new Invited(name, mc.getGuildId());
                    if (!invited.contains(inv)) {
                        invited.add(inv);
                    }
                }
                break;
            case 0x06:
                // accepted guild invitation
                log.info(slea.toString());
                if (mc.getGuildId() > 0) {
                    log.info("[hax] " + mc.getName() + " attempted to join a guild when s/he is already in one.");
                    return;
                }
                // read data
                gid = slea.readInt();
                int cid = slea.readInt();
                if (cid != mc.getId()) {
                    log.info("[hax] " + mc.getName() + " attempted to join a guild with a different character id.");
                    return;
                }
                // make sure the person is actually on the invited list
                name = mc.getName().toLowerCase();
                Iterator<Invited> itr = invited.iterator();
                boolean bOnList = false;
                while (itr.hasNext()) {
                    Invited inv = itr.next();
                    if (gid == inv.gid && name.equals(inv.name)) {
                        bOnList = true;
                        itr.remove();
                        break;
                    }
                }
                if (!bOnList) {
                    log.info("[hax] " + mc.getName() + " is trying to join a guild that never invited him/her (or that the invitation has expired)");
                    return;
                }
                // so we're on the list, and everything checks out, proceed to add
                mc.setGuildId(gid); // joins the guild
                mc.setGuildRank(5); // start at lowest rank
                int s;
                try {
                    s = c.getChannelServer().getWorldInterface().addGuildMember(mc.getMGC());
                } catch (java.rmi.RemoteException e) {
                    log.error("RemoteException occurred while attempting to add character to guild", e);
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "Unable to connect to the World Server. Please try again later."));
                    // revert the guild changes
                    mc.setGuildId(0);
                    return;
                }
                if (s == 0) {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "家族人数已经到达最高限制."));
                    mc.setGuildId(0);
                    return;
                }
                // send her the guild info
                c.getSession().write(MaplePacketCreator.showGuildInfo(mc));
                mc.saveGuildStatus(); // update database
                respawnPlayer(mc);
                break;
            case 0x07:
                // leaving
                // 3C 00 07 37 75 00 00 04 00 4A 61 6E 65
                cid = slea.readInt();
                name = slea.readMapleAsciiString();

                // make sure the info is correct to prevent guild hack
                // lol this is probably where nexon messed up during guild hack
                if (cid != mc.getId() || !name.equals(mc.getName()) || mc.getGuildId() <= 0) {
                    log.info("[hax] " + mc.getName() + " tried to quit guild under the name \"" + name + "\" and current guild id of " + mc.getGuildId() + ".");
                    return;
                }
                try {
                    c.getChannelServer().getWorldInterface().leaveGuild(mc.getMGC());
                } catch (java.rmi.RemoteException re) {
                    log.error("RemoteException occurred while attempting to leave guild", re);
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "Unable to connect to the World Server. Please try again later."));
                    return;
                }
                // show that the player now has empty guild
                c.getSession().write(MaplePacketCreator.showGuildInfo(null));
                mc.setGuildId(0);
                mc.saveGuildStatus();
                respawnPlayer(mc);
                break;
            case 0x08:
                // expel 3C 00 08 37 75 00 00 04 00 4A 61 6E 65
                cid = slea.readInt();
                name = slea.readMapleAsciiString();

                if (mc.getGuildRank() > 2 || mc.getGuildId() <= 0) {
                    log.info("[hax] " + mc.getName() + " is trying to expel without rank 1 or 2.");
                    return;
                }

                // there is one case that MapleGuild have to consider
                // and that's the possibility of a jr kicking a jr, but we can't
                // check that here
                try {
                    c.getChannelServer().getWorldInterface().expelMember(mc.getMGC(), name, cid);
                } catch (java.rmi.RemoteException re) {
                    log.error("RemoteException occurred while attempting to change rank", re);
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "Unable to connect to the World Server. Please try again later."));
                    return;
                }
                break;
            case 0x0d:
                // guild rank titles change
                if (mc.getGuildId() <= 0 || mc.getGuildRank() != 1) {
                    log.info("[hax] " + mc.getName() + " tried to change guild rank titles when s/he does not have permission.");
                    return;
                }
                String ranks[] = new String[5];
                for (int i = 0; i < 5; i++) {
                    ranks[i] = slea.readMapleAsciiString();
                }
                try {
                    c.getChannelServer().getWorldInterface().changeRankTitle(mc.getGuildId(), ranks);
                } catch (java.rmi.RemoteException re) {
                    log.error("RemoteException occurred", re);
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "Unable to connect to the World Server. Please try again later."));
                    return;
                }
                break;
            case 0x0e:
                // rank change
                cid = slea.readInt();
                byte newRank = slea.readByte();

                // as usual, first check permissions
                if (mc.getGuildRank() > 2 || (newRank <= 2 && mc.getGuildRank() != 1) || mc.getGuildId() <= 0) {
                    log.info("[hax] " + mc.getName() + " is trying to change rank outside of his/her permissions.");
                    return;
                }

                if (newRank <= 1 || newRank > 5) {
                    return;
                }
                try {
                    c.getChannelServer().getWorldInterface().changeRank(mc.getGuildId(), cid, newRank);
                } catch (java.rmi.RemoteException re) {
                    log.error("RemoteException occurred while attempting to change rank", re);
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "Unable to connect to the World Server. Please try again later."));
                    return;
                }
                break;
            case 0x0f:
                // guild emblem change 3C 00 0F E8 03 07 D0 07 02
                if (mc.getGuildId() <= 0 || mc.getGuildRank() != 1 || mc.getMapId() != 200000301) {
                    log.info("[hax] " + mc.getName() + " tried to change guild emblem without being the guild leader.");
                    return;
                }
                if (mc.getMeso() < MapleGuild.CHANGE_EMBLEM_COST) {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "你没有足够的金币创建家族"));
                    return;
                }
                short bg = slea.readShort();
                byte bgcolor = slea.readByte();
                short logo = slea.readShort();
                byte logocolor = slea.readByte();
                try {
                    c.getChannelServer().getWorldInterface().setGuildEmblem(mc.getGuildId(), bg, bgcolor, logo, logocolor);
                } catch (java.rmi.RemoteException re) {
                    log.error("RemoteException occurred", re);
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "Unable to connect to the World Server. Please try again later."));
                    return;
                }
                mc.gainMeso(-MapleGuild.CHANGE_EMBLEM_COST, true, false, true);
                respawnPlayer(mc);

                // c.getSession().write(MaplePacketCreator.serverNotice(1, "Your Guild's emblem has been changed."));

                break;
            case 0x10:
                // guild notice change 3C 00 10 0B 00 74 65 73 74 20 6E 6F 74 69 63 65
                if (mc.getGuildId() <= 0 || mc.getGuildRank() > 2) {
                    log.info("[hax] " + mc.getName() + " tried to change guild notice while not in a guild.");
                    return;
                }

                String notice = slea.readMapleAsciiString();
                if (notice.length() > 100) {
                    return; // hax.
                }
                try {
                    c.getChannelServer().getWorldInterface().setGuildNotice(mc.getGuildId(), notice);
                } catch (java.rmi.RemoteException re) {
                    log.error("RemoteException occurred", re);
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "Unable to connect to the World Server. Please try again later."));
                    return;
                }
                break;
            default:
                log.info("Unhandled GUILD_OPERATION packet: \n" + slea.toString());
        }
    }
}
