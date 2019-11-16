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

package net.sf.odinms.server.maps;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.MaplePacket;
import net.sf.odinms.tools.MaplePacketCreator;
import java.util.Calendar;
import java.util.concurrent.ScheduledFuture;

public class MapleMapTimer {

    private int duration;
    private Calendar startTime;
    private Calendar predictedStopTime;
    private int mapToWarpTo = -1;
    private int minLevelToWarp = 0;
    private int maxLevelToWarp = 256;
    private ScheduledFuture<?> sf0F;

    public MapleMapTimer(ScheduledFuture<?> sfO, int newDuration, int mapToWarpToP, int minLevelToWarpP, int maxLevelToWarpP) {
        this.duration = newDuration;
        this.startTime = Calendar.getInstance();
        this.predictedStopTime = Calendar.getInstance();
        this.predictedStopTime.add(Calendar.SECOND, duration);
        this.mapToWarpTo = mapToWarpToP;
        this.minLevelToWarp = minLevelToWarpP;
        this.maxLevelToWarp = maxLevelToWarpP;
        this.sf0F = sfO;
    }

    public MaplePacket makeSpawnData() {
        int timeLeft;
        long StopTimeStamp = this.predictedStopTime.getTimeInMillis();
        long CurrentTimeStamp = Calendar.getInstance().getTimeInMillis();
        timeLeft = (int) (StopTimeStamp - CurrentTimeStamp) / 1000;
        return MaplePacketCreator.getClock(timeLeft);
    }

    public void sendSpawnData(MapleClient c) {
        c.getSession().write(makeSpawnData());
    }

    public ScheduledFuture<?> getSF0F() {
        return sf0F;
    }

    public int warpToMap() {
        return this.mapToWarpTo;
    }

    public int minLevelToWarp() {
        return this.minLevelToWarp;
    }

    public int maxLevelToWarp() {
        return this.maxLevelToWarp;
    }

    public int getTimeLeft() {
        int timeLeft;
        long StopTimeStamp = predictedStopTime.getTimeInMillis();
        long CurrentTimeStamp = Calendar.getInstance().getTimeInMillis();
        timeLeft = (int) (StopTimeStamp - CurrentTimeStamp) / 1000;
        return timeLeft;
    }
}
