package net.sf.odinms.client.messages.commands;

import java.net.InetAddress;
import java.rmi.RemoteException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collection;
import java.util.LinkedHashSet;

import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.messages.Command;
import net.sf.odinms.client.messages.CommandDefinition;
import net.sf.odinms.client.messages.IllegalCommandSyntaxException;
import net.sf.odinms.client.messages.MessageCallback;
import static net.sf.odinms.client.messages.commands.WarpCommands.getNameById;
import net.sf.odinms.database.DatabaseConnection;
import net.sf.odinms.net.MaplePacket;
import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.net.world.remote.WorldChannelInterface;
import net.sf.odinms.net.world.remote.WorldLocation;
import net.sf.odinms.server.MaplePortal;
import net.sf.odinms.server.MapleTrade;
import net.sf.odinms.server.maps.MapleMap;
import net.sf.odinms.tools.MaplePacketCreator;

public class WarpCommands implements Command {

    public static String getNameById(int id) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM characters where id = ?");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            String name = null;
            if (rs.next()) {
                name = rs.getString("name");
            }
            ps.close();
            return name;
        } catch (SQLException ex) {
        }
        return "<Couldn't retreive name, player id is " + id + ">";
    }

    @Override
    public void execute(MapleClient c, MessageCallback mc, String[] splitted) throws Exception, IllegalCommandSyntaxException {
        ChannelServer cserv = c.getChannelServer();
        if (splitted[0].equals("!传送到")) {
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            if (victim != null) {
                if (splitted.length == 2) {
                    MapleMap target = victim.getMap();
                    c.getPlayer().changeMap(target, target.findClosestSpawnpoint(victim.getPosition()));
                } else {
                    int mapid = Integer.parseInt(splitted[2]);
                    MapleMap target = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(mapid);
                    victim.changeMap(target, target.getPortal(0));
                }
            } else {
                try {
                    victim = c.getPlayer();
                    WorldLocation loc = c.getChannelServer().getWorldInterface().getLocation(splitted[1]);
                    if (loc != null) {
                        mc.dropMessage("你将更换频道,这可能需要几秒钟.");
                        MapleMap target = c.getChannelServer().getMapFactory().getMap(loc.map);
                        String ip = c.getChannelServer().getIP(loc.channel);
                        c.getPlayer().getMap().removePlayer(c.getPlayer());
                        victim.setMap(target);
                        String[] socket = ip.split(":");
                        if (c.getPlayer().getTrade() != null) {
                            MapleTrade.cancelTrade(c.getPlayer());
                        }
                        try {
                            WorldChannelInterface wci = ChannelServer.getInstance(c.getChannel()).getWorldInterface();
                            wci.addBuffsToStorage(c.getPlayer().getId(), c.getPlayer().getAllBuffs());
                        } catch (RemoteException e) {
                            c.getChannelServer().reconnectWorld();
                        }
                        c.getPlayer().saveToDB(true);
                        if (c.getPlayer().getCheatTracker() != null) {
                            c.getPlayer().getCheatTracker().dispose();
                        }
                        ChannelServer.getInstance(c.getChannel()).removePlayer(c.getPlayer());
                        c.updateLoginState(MapleClient.LOGIN_SERVER_TRANSITION);
                        try {
                            MaplePacket packet = MaplePacketCreator.getChannelChange(InetAddress.getByName(socket[0]), Integer.parseInt(socket[1]));
                            c.getSession().write(packet);
                        } catch (Exception e) {
                            throw new RuntimeException(e);
                        }
                    } else {
                        int map = Integer.parseInt(splitted[1]);
                        MapleMap target = cserv.getMapFactory().getMap(map);
                        c.getPlayer().changeMap(target, target.getPortal(0));
                    }

                } catch (Exception e) {
                    mc.dropMessage("Something went wrong: " + e.getMessage());
                }
            }
        } else if (splitted[0].equals("!传送到id")) {
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterById(Integer.parseInt(splitted[1]));
            if (victim != null) {
                if (splitted.length == 2) {
                    MapleMap target = victim.getMap();
                    c.getPlayer().changeMap(target, target.findClosestSpawnpoint(victim.getPosition()));
                } else {
                    int mapid = Integer.parseInt(splitted[2]);
                    MapleMap target = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(mapid);
                    victim.changeMap(target, target.getPortal(0));
                }
            } else {
                try {
                    victim = c.getPlayer();
                    WorldLocation loc = c.getChannelServer().getWorldInterface().getLocation(getNameById(Integer.parseInt(splitted[1])));
                    if (loc != null) {
                        mc.dropMessage("你将更换频道,这可能需要几秒钟.");
                        MapleMap target = c.getChannelServer().getMapFactory().getMap(loc.map);
                        String ip = c.getChannelServer().getIP(loc.channel);
                        c.getPlayer().getMap().removePlayer(c.getPlayer());
                        victim.setMap(target);
                        String[] socket = ip.split(":");
                        if (c.getPlayer().getTrade() != null) {
                            MapleTrade.cancelTrade(c.getPlayer());
                        }
                        try {
                            WorldChannelInterface wci = ChannelServer.getInstance(c.getChannel()).getWorldInterface();
                            wci.addBuffsToStorage(c.getPlayer().getId(), c.getPlayer().getAllBuffs());
                        } catch (RemoteException e) {
                            c.getChannelServer().reconnectWorld();
                        }
                        c.getPlayer().saveToDB(true);
                        if (c.getPlayer().getCheatTracker() != null) {
                            c.getPlayer().getCheatTracker().dispose();
                        }
                        ChannelServer.getInstance(c.getChannel()).removePlayer(c.getPlayer());
                        c.updateLoginState(MapleClient.LOGIN_SERVER_TRANSITION);
                        try {
                            MaplePacket packet = MaplePacketCreator.getChannelChange(InetAddress.getByName(socket[0]), Integer.parseInt(socket[1]));
                            c.getSession().write(packet);
                        } catch (Exception e) {
                            throw new RuntimeException(e);
                        }
                    } else {
                        int map = Integer.parseInt(splitted[1]);
                        MapleMap target = cserv.getMapFactory().getMap(map);
                        c.getPlayer().changeMap(target, target.getPortal(0));
                    }

                } catch (Exception e) {
                    mc.dropMessage("Something went wrong: " + e.getMessage());
                }
            }
            }	else if (splitted[0].equals("!拉全部")) {
                	for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters())
                    	if (mch.getMapId() != c.getPlayer().getMapId())
                        mch.changeMap(c.getPlayer().getMap(), c.getPlayer().getPosition());
        } else if (splitted[0].equals("!拉")) {
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            victim.changeMap(c.getPlayer().getMap(), c.getPlayer().getMap().findClosestSpawnpoint(c.getPlayer().getPosition()));
        } else if (splitted[0].equals("!传送")) {
            if (splitted.length == 1) {
                mc.dropMessage("Syntax: !传送 <Map ID> <Portal ID>");
            } else {
                MapleMap target = null;
                try {
                    target = cserv.getMapFactory().getMap(Integer.parseInt(splitted[1]));
                } catch (Exception e) {
                }
                if (target == null) {
                    mc.dropMessage("你输入了错误的地图ID");
                } else {
                    MaplePortal targetPortal = null;
                    if (splitted.length > 2) {
                        try {
                            targetPortal = target.getPortal(Integer.parseInt(splitted[2]));
                        } catch (Exception e) {
                        }
                    }
                    if (targetPortal == null) {
                        targetPortal = target.getPortal(0);
                    }
                    c.getPlayer().changeMap(target, targetPortal);
                }
            }
        } else if (splitted[0].equals("!拉全部到")) {
            int mapid = Integer.parseInt(splitted[1]);
            MapleMap map = c.getChannelServer().getMapFactory().getMap(mapid);
            MapleMap warpFrom = c.getPlayer().getMap();
            Collection<MapleCharacter> cmcwf = new LinkedHashSet<MapleCharacter>(warpFrom.getCharacters());
            for (MapleCharacter chr : cmcwf) {
                chr.changeMap(map, map.getPortal(0));
            }
        } else if (splitted[0].equals("!offlinewarp")) {
            if (splitted.length < 3) {
                mc.dropMessage("Please include the name of the character and the id of the map you'd like to warp them to!");
                return;
            }
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            if (victim != null) {
                mc.dropMessage(splitted[1] + " is online. Please use the normal functions!");
                return;
            } else {
                WorldLocation loc = c.getChannelServer().getWorldInterface().getLocation(splitted[1]);
                if (loc != null) {
                    mc.dropMessage(splitted[1] + " is online. Please use the normal functions!");
                    return;
                } else {
                    int toMapId = Integer.parseInt(splitted[2]);
                    MapleMap toMap = c.getChannelServer().getMapFactory().getMap(toMapId);
                    if (toMap == null) {
                        mc.dropMessage("Map: " + toMapId + " does not exist!");
                        return;
                    }
                    if (c.getPlayer().changeMapOffline(splitted[1], toMapId)) {
                        mc.dropMessage(splitted[1] + " has been warped.");
                    } else {
                        mc.dropMessage(splitted[1] + " was not warped. Please ensure you typed their name correctly.");
                    }
                }
            }
        } else if (splitted[0].equalsIgnoreCase("!warpalive") || splitted[0].equalsIgnoreCase("!warpdead")) {
            int mapid = Integer.parseInt(splitted[1]);
            MapleMap map = c.getChannelServer().getMapFactory().getMap(mapid);
            boolean alive = splitted[0].equalsIgnoreCase("!warpalive") ? true : false;
            Collection<MapleCharacter> cmc = new LinkedHashSet<MapleCharacter>(c.getPlayer().getMap().getCharacters());
            for (MapleCharacter warpies : cmc) {
                if (alive && warpies.isAlive() && !warpies.isGM()) {
                    warpies.changeMap(map, map.getPortal(0));
                } else if (!alive && !warpies.isAlive() && !warpies.isGM()) {
                    warpies.changeMap(map, map.getPortal(0));
                }
            }
        }
    }

    @Override
    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
            new CommandDefinition("传送到", "", "", 3),
            new CommandDefinition("传送到id", "playername", "Warps yourself to the player", 1),
                    new CommandDefinition("拉全部", "playerid", "Warps yourself to the player", 1),
                    new CommandDefinition("拉全部到", "playername", "Warps the player with the given name to yourself", 3),
                    new CommandDefinition("offlinewarp", "playername mapid", "Warps a player whilst they are offline", 5),
                    new CommandDefinition("传送", "mapid", "Warps you to the given mapid (use /m instead)", 5),
                    new CommandDefinition("拉", "mapid", "Warps you and everyone in your map to the mapid specified", 5),
                    new CommandDefinition("warpalive", "mapid", "Warps all alive people on your map to the designated map", 1),
                    new CommandDefinition("warpdead", "mapid", "Warps all dead people on your map to the designated map", 1)
                };
    }
}