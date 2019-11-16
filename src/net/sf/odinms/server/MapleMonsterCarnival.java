/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

package net.sf.odinms.server;

import java.util.concurrent.ScheduledFuture;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.net.world.MapleParty;
import net.sf.odinms.server.maps.MapleMap;
import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.net.world.MaplePartyCharacter;
import net.sf.odinms.tools.MaplePacketCreator;

public class MapleMonsterCarnival {

    public static int D = 3;
    public static int C = 2;
    public static int B = 1;
    public static int A = 0;
    private MapleParty p1,  p2;
    private MapleMap map;
    private ScheduledFuture<?> timer;
    private ScheduledFuture<?> effectTimer;
    private long startTime;
    private MapleCharacter leader1,  leader2;
    private int redCP,  blueCP,  redTotalCP,  blueTotalCP;

    public MapleMonsterCarnival(MapleParty p1, MapleParty p2, int mapid) {
        this.p1 = p1;
        this.p2 = p2;
        int chnl = p1.getLeader().getChannel();
        int chnl1 = p2.getLeader().getChannel();
        if (chnl != chnl1) {
            throw new RuntimeException("ERROR: CPQ leaders are on different channels.");
        }
        ChannelServer cs = ChannelServer.getInstance(chnl);
        p1.setEnemy(p2);
        p2.setEnemy(p1);
        map = cs.getMapFactory().getMap(mapid);
        int redPortal = 0;
        int bluePortal = 0;
        if (map.isPurpleCPQMap()) {
            redPortal = 2;
            bluePortal = 1;
        }
        for (MaplePartyCharacter mpc : p1.getMembers()) {
            MapleCharacter mc;
            mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
            if (mc != null) {
                mc.setMonsterCarnival(this);
                mc.changeMap(map, map.getPortal(redPortal));
                mc.setTeam(0);
                if (p1.getLeader().getId() == mc.getId()) {
                    leader1 = mc;
                }
            }
        }
        for (MaplePartyCharacter mpc : p2.getMembers()) {
            MapleCharacter mc;
            mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
            if (mc != null) {
                mc.setMonsterCarnival(this);
                mc.changeMap(map, map.getPortal(bluePortal));
                mc.setTeam(1);
                if (p2.getLeader().getId() == mc.getId()) {
                    leader2 = mc;
                }
            }
        }
        startTime = System.currentTimeMillis() + 60 * 10000;
        timer = TimerManager.getInstance().schedule(new Runnable() {

            public void run() {
                timeUp();
            }
        }, 10 * 60 * 1000);
        effectTimer = TimerManager.getInstance().schedule(new Runnable() {

            public void run() {
                complete();
            }
        }, 10 * 60 * 1000 - 10 * 1000);
        TimerManager.getInstance().schedule(new Runnable() {

            public void run() {
                map.addClock(60 * 10);
            }
        }, 2000);
    }

    public void playerDisconnected(int charid) {
        if (leader1.getId() == charid || leader2.getId() == charid) {
            earlyFinish();
            int team = -1;
            for (MaplePartyCharacter mpc : leader1.getParty().getMembers()) {
                if (mpc.getId() == charid) {
                    team = 0;
                }
            }
            for (MaplePartyCharacter mpc : leader2.getParty().getMembers()) {
                if (mpc.getId() == charid) {
                    team = 1;
                }
            }
            if (team == -1) {
                team = 1;
            }
            String teamS = "undefined";
            switch (team) {
                case 0:
                    teamS = "Red";
                    break;
                case 1:
                    teamS = "Blue";
                    break;
            }
            map.broadcastMessage(MaplePacketCreator.serverNotice(5, "Maple " + teamS + " has quitted the Monster Carnival."));
            return;
        } else {
            map.broadcastMessage(MaplePacketCreator.serverNotice(5, ChannelServer.getInstance(1).getPlayerStorage().getCharacterById(charid).getName() + " has quitted the Monster Carnival."));
        }
    }

    public void earlyFinish() {
        dispose(true);
    }

    public void leftParty(int charid) {
        playerDisconnected(charid);
    }

    protected int getRankByCP(int cp) {
        if (cp < 50) {
            return D;
        } else if (cp > 50 && cp < 100) {
            return C;
        } else if (cp > 100 && cp < 300) {
            return B;
        } else if (cp > 300) {
            return A;
        }
        return D;
    }

    protected void dispose() {
        dispose(false);
    }

    protected void dispose(boolean warpout) {
        int chnl = p1.getLeader().getChannel();
        ChannelServer cs = ChannelServer.getInstance(chnl);
        MapleMap out = cs.getMapFactory().getMap(980000000);
        for (MaplePartyCharacter mpc : leader1.getParty().getMembers()) {
            MapleCharacter mc;
            mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
            if (mc != null) {
                mc.setCPQRanking(getRankByCP(this.redTotalCP));
                mc.resetCP();
                if (warpout) {
                    mc.changeMap(out, out.getPortal(0));
                }
            }
        }
        for (MaplePartyCharacter mpc : leader2.getParty().getMembers()) {
            MapleCharacter mc;
            mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
            if (mc != null) {
                mc.setCPQRanking(getRankByCP(this.blueTotalCP));
                mc.resetCP();
                if (warpout) {
                    mc.changeMap(out, out.getPortal(0));
                }
            }
        }
        timer.cancel(false);
        effectTimer.cancel(false);
        redTotalCP = 0;
        blueTotalCP = 0;
        leader1.getParty().setEnemy(null);
        leader2.getParty().setEnemy(null);
    }

    public void exit() {
        dispose();
    }

    public ScheduledFuture<?> getTimer() {
        return this.timer;
    }

    public void finish(int winningTeam) {
        int chnl = leader1.getClient().getChannel();
        int chnl1 = leader2.getClient().getChannel();
        if (chnl != chnl1) {
            throw new RuntimeException("CPQ leaders are on different channels..");
        }
        ChannelServer cs = ChannelServer.getInstance(chnl);
        if (winningTeam == 0) {
            for (MaplePartyCharacter mpc : leader1.getParty().getMembers()) {
                MapleCharacter mc;
                mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
                if (mc != null) {
                    mc.setCPQRanking(getRankByCP(this.redTotalCP));
                    mc.changeMap(cs.getMapFactory().getMap(map.getId() + 2), cs.getMapFactory().getMap(map.getId() + 2).getPortal(0));
                    mc.setTeam(-1);
                }
            }
            for (MaplePartyCharacter mpc : leader2.getParty().getMembers()) {
                MapleCharacter mc;
                mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
                if (mc != null) {
                    mc.setCPQRanking(getRankByCP(this.blueTotalCP));
                    mc.changeMap(cs.getMapFactory().getMap(map.getId() + 3), cs.getMapFactory().getMap(map.getId() + 3).getPortal(0));
                    mc.setTeam(-1);
                }
            }
        } else if (winningTeam == 1) {
            for (MaplePartyCharacter mpc : leader2.getParty().getMembers()) {
                MapleCharacter mc;
                mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
                if (mc != null) {
                    mc.changeMap(cs.getMapFactory().getMap(map.getId() + 2), cs.getMapFactory().getMap(map.getId() + 2).getPortal(0));
                    mc.setTeam(-1);
                }
            }
            for (MaplePartyCharacter mpc : leader1.getParty().getMembers()) {
                MapleCharacter mc;
                mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
                if (mc != null) {
                    mc.changeMap(cs.getMapFactory().getMap(map.getId() + 3), cs.getMapFactory().getMap(map.getId() + 3).getPortal(0));
                    mc.setTeam(-1);
                }
            }
        }
        dispose();
    }

    public void timeUp() {
        int cp1 = this.redTotalCP;
        int cp2 = this.blueTotalCP;
        if (cp1 == cp2) {
            extendTime();
            return;
        }
        if (cp1 > cp2) {
            finish(0);
        } else {
            finish(1);
        }
    }

    public long getTimeLeft() {
        return (startTime - System.currentTimeMillis());
    }

    public int getTimeLeftSeconds() {
        return (int) (getTimeLeft() / 1000);
    }

    public void extendTime() {
        map.broadcastMessage(MaplePacketCreator.serverNotice(5, "The time has been extended."));
        startTime = System.currentTimeMillis() + 3 * 1000;
        map.addClock(3 * 60);
        timer = TimerManager.getInstance().schedule(new Runnable() {

            public void run() {
                timeUp();
            }
        }, 3 * 60 * 1000);
        effectTimer = TimerManager.getInstance().schedule(new Runnable() {

            public void run() {
                complete();
            }
        }, 3 * 60 * 1000 - 10);
    }

    public void complete() {
        int cp1 = this.redTotalCP;
        int cp2 = this.blueTotalCP;
        if (cp1 == cp2) {
            return;
        }
        boolean redWin = cp1 > cp2;
        int chnl = leader1.getClient().getChannel();
        int chnl1 = leader2.getClient().getChannel();
        if (chnl != chnl1) {
            throw new RuntimeException("CPQ leaders are on different channels..");
        }
        ChannelServer cs = ChannelServer.getInstance(chnl);
        map.killAllMonsters();
        for (MaplePartyCharacter mpc : leader1.getParty().getMembers()) {
            MapleCharacter mc;
            mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
            if (mc != null) {
                if (redWin) {
                    mc.getClient().getSession().write(MaplePacketCreator.showEffect("quest/carnival/win"));
                    mc.getClient().getSession().write(MaplePacketCreator.playSound("MobCarnival/Win"));
                } else {
                    mc.getClient().getSession().write(MaplePacketCreator.showEffect("quest/carnival/lose"));
                    mc.getClient().getSession().write(MaplePacketCreator.playSound("MobCarnival/Lose"));
                }
            }
        }
        for (MaplePartyCharacter mpc : leader2.getParty().getMembers()) {
            MapleCharacter mc;
            mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
            if (mc != null) {
                if (!redWin) {
                    mc.getClient().getSession().write(MaplePacketCreator.showEffect("quest/carnival/win"));
                    mc.getClient().getSession().write(MaplePacketCreator.playSound("MobCarnival/Win"));
                } else {
                    mc.getClient().getSession().write(MaplePacketCreator.showEffect("quest/carnival/lose"));
                    mc.getClient().getSession().write(MaplePacketCreator.playSound("MobCarnival/Lose"));
                }
            }
        }
    }

    public MapleParty getRed() {
        return p1;
    }

    public void setRed(MapleParty p1) {
        this.p1 = p1;
    }

    public MapleParty getBlue() {
        return p2;
    }

    public void setBlue(MapleParty p2) {
        this.p2 = p2;
    }

    public MapleCharacter getLeader1() {
        return leader1;
    }

    public void setLeader1(MapleCharacter leader1) {
        this.leader1 = leader1;
    }

    public MapleCharacter getLeader2() {
        return leader2;
    }

    public void setLeader2(MapleCharacter leader2) {
        this.leader2 = leader2;
    }

    public MapleCharacter getEnemyLeader(int team) {
        switch (team) {
            case 0:
                return leader2;
            case 1:
                return leader1;
        }
        return null;
    }

    public int getBlueCP() {
        return blueCP;
    }

    public void setBlueCP(int blueCP) {
        this.blueCP = blueCP;
    }

    public int getBlueTotalCP() {
        return blueTotalCP;
    }

    public void setBlueTotalCP(int blueTotalCP) {
        this.blueTotalCP = blueTotalCP;
    }

    public int getRedCP() {
        return redCP;
    }

    public void setRedCP(int redCP) {
        this.redCP = redCP;
    }

    public int getRedTotalCP() {
        return redTotalCP;
    }

    public void setRedTotalCP(int redTotalCP) {
        this.redTotalCP = redTotalCP;
    }

    public int getTotalCP(int team) {
        if (team == 0) {
            return redTotalCP;
        } else if (team == 1) {
            return blueTotalCP;
        } else {
            throw new RuntimeException("Unknown team");
        }
    }

    public void setTotalCP(int totalCP, int team) {
        if (team == 0) {
            this.redTotalCP = totalCP;
        } else if (team == 1) {
            this.blueTotalCP = totalCP;
        }
    }

    public int getCP(int team) {
        if (team == 0) {
            return redCP;
        } else if (team == 1) {
            return blueCP;
        } else {
            throw new RuntimeException("Unknown team");
        }
    }

    public void setCP(int CP, int team) {
        if (team == 0) {
            this.redCP = CP;
        } else if (team == 1) {
            this.blueCP = CP;
        }
    }
}
