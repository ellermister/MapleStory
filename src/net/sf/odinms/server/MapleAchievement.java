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

import java.rmi.RemoteException;

import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.tools.MaplePacketCreator;

/**
 *
 * @author Patrick/PurpleMadness
 */
public class MapleAchievement {

    private String name;
    private int reward;
    private boolean notice;
    private boolean repeatable = false;

    public MapleAchievement(String name, int reward) {
        this.name = name;
        this.reward = reward;
        this.notice = true;
    }

    public MapleAchievement(String name, int reward, boolean notice) {
        this.name = name;
        this.reward = reward;
        this.notice = notice;
    }

    public MapleAchievement(String name, int reward, boolean notice, boolean repeatable) {
        this.name = name;
        this.reward = reward;
        this.notice = notice;
        this.repeatable = repeatable;
    }

    public String getName() {
        return name;
    }

    public boolean isRepeatable() {
        return repeatable;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getReward() {
        return reward;
    }

    public void setReward(int reward) {
        this.reward = reward;
    }

    public void finishAchievement(MapleCharacter player) {
        if (player.isGM()) {
            return;
        }
        try {
            player.modifyCSPoints(1, reward);
            player.setAchievementFinished(MapleAchievements.getInstance().getByMapleAchievement(this));
            player.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "[系统奖励] 您因为 " + name + " 获得 " + reward + " 点奖励."));
            if (notice && !player.isBanned()) {
                ChannelServer.getInstance(player.getClient().getChannel()).getWorldInterface().broadcastMessage(player.getName(), MaplePacketCreator.serverNotice(6, "[系统奖励] 祝贺 " + player.getLevel() + "级 玩家: " + player.getName() + " " + name + "!").getBytes());
            }
        } catch (RemoteException e) {
            player.getClient().getChannelServer().reconnectWorld();
        }
    }
}