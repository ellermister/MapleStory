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

package net.sf.odinms.server.maps; //1处

import java.util.concurrent.ScheduledFuture;
import net.sf.odinms.server.MaplePortal;
import net.sf.odinms.server.TimerManager;
import net.sf.odinms.tools.MaplePacketCreator;

public class MapMonitor
{
  private ScheduledFuture<?> monitorSchedule;
  private MapleMap map;
  private MaplePortal portal;
  private int ch;
  private MapleReactor reactor;

  public MapMonitor(final MapleMap map, MaplePortal portal, int ch, MapleReactor reactor)
  {
    this.map = map;
    this.portal = portal;
    this.ch = ch;
    this.reactor = reactor;
    this.monitorSchedule = TimerManager.getInstance().register(new Runnable()
    {
      public void run()
      {
        if (map.getCharacters().size() <= 0)
          cancelAction();
      }
    }
    , 5000L);
  }

  public void cancelAction()
  {
    this.monitorSchedule.cancel(false);
    this.map.killAllMonsters();
    if (this.portal != null)
      this.portal.setPortalState(true);

    if (this.reactor != null) {
      this.reactor.setState((byte)0);
      this.reactor.getMap().broadcastMessage(MaplePacketCreator.triggerReactor(this.reactor, 0));
    }
    this.map.resetReactors();
  }
}