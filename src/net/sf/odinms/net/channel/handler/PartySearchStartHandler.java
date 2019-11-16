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

package net.sf.odinms.net.channel.handler;

import java.util.Collection;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleJob;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.server.maps.MapleMap;
import net.sf.odinms.server.maps.MapleMapObject;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author Quasar
 * @author Moist
 */
public class PartySearchStartHandler extends AbstractMaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int min = slea.readInt();
        int max = slea.readInt();
        int members = slea.readInt();
        int jobs = slea.readInt();
        MapleCharacter chr = c.getPlayer();
        MapleMap map = chr.getMap();
        Collection<MapleMapObject> mapobjs = map.getAllPlayers();
        for (MapleMapObject mapobj : mapobjs) {
            if (mapobj instanceof MapleCharacter) {
                MapleCharacter tchar = (MapleCharacter) mapobj;
                int charlvl = tchar.getLevel();
                MapleJob tjob = tchar.getJob();
                if (charlvl >= min && charlvl <= max && isValidJob(tjob, jobs)) {
                    // Join the party - it's how it works in v68
                }
            }
        }
    }

    private boolean isValidJob(MapleJob thejob, int jobs) {
        if (thejob == MapleJob.BEGINNER) {
            return ((jobs & 2) > 0);
        } else if (thejob == MapleJob.WARRIOR) {
            return ((jobs & 4) > 0);
        } else if (thejob == MapleJob.HERO || thejob == MapleJob.FIGHTER || thejob == MapleJob.CRUSADER) {
            return ((jobs & 8) > 0);
        } else if (thejob == MapleJob.PALADIN || thejob == MapleJob.PAGE || thejob == MapleJob.WHITEKNIGHT) {
            return ((jobs & 16) > 0);
        } else if (thejob == MapleJob.DARKKNIGHT || thejob == MapleJob.SPEARMAN || thejob == MapleJob.DRAGONKNIGHT) {
            return ((jobs & 32) > 0);
        } else if (thejob == MapleJob.MAGICIAN) {
            return ((jobs & 64) > 0);
        } else if (thejob == MapleJob.FP_ARCHMAGE || thejob == MapleJob.FP_WIZARD || thejob == MapleJob.FP_MAGE) {
            return ((jobs & 128) > 0);
        } else if (thejob == MapleJob.IL_ARCHMAGE || thejob == MapleJob.IL_WIZARD || thejob == MapleJob.IL_MAGE) {
            return ((jobs & 256) > 0);
        } else if (thejob == MapleJob.BISHOP || thejob == MapleJob.CLERIC || thejob == MapleJob.PRIEST) {
            return ((jobs & 512) > 0);
        } else if (thejob == MapleJob.PIRATE) {
            return ((jobs & 1024) > 0);
        } else if (thejob == MapleJob.BUCCANEER || thejob == MapleJob.MARAUDER || thejob == MapleJob.BRAWLER) {
            return ((jobs & 2048) > 0);
        } else if (thejob == MapleJob.CORSAIR || thejob == MapleJob.GUNSLINGER || thejob == MapleJob.OUTLAW) {
            return ((jobs & 4096) > 0);
        } else if (thejob == MapleJob.THIEF) {
            return ((jobs & 8192) > 0);
        } else if (thejob == MapleJob.NIGHTLORD || thejob == MapleJob.ASSASSIN || thejob == MapleJob.HERMIT) {
            return ((jobs & 16384) > 0);
        } else if (thejob == MapleJob.SHADOWER || thejob == MapleJob.BANDIT || thejob == MapleJob.CHIEFBANDIT) {
            return ((jobs & 32768) > 0);
        } else if (thejob == MapleJob.BOWMAN) {
            return ((jobs & 65536) > 0);
        } else if (thejob == MapleJob.BOWMASTER || thejob == MapleJob.HUNTER || thejob == MapleJob.RANGER) {
            return ((jobs & 131072) > 0);
        } else if (thejob == MapleJob.CROSSBOWMASTER || thejob == MapleJob.CROSSBOWMAN || thejob == MapleJob.SNIPER) {
            return ((jobs & 262144) > 0);
        }
        return false;
    }
}