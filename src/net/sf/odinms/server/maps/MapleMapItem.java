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

import java.awt.Point;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.sf.odinms.client.IItem;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.database.DatabaseConnection;
import net.sf.odinms.tools.MaplePacketCreator;

/**
 *
 * @author Matze
 */
public class MapleMapItem extends AbstractMapleMapObject {

    protected IItem item;
    protected MapleMapObject dropper;
    protected MapleCharacter owner;
    protected int meso;
    protected boolean pickedUp = false;
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(MapleMapItem.class);

    /** Creates a new instance of MapleMapItem */
    public MapleMapItem(IItem item, Point position, MapleMapObject dropper, MapleCharacter owner) {
        setPosition(position);
        this.item = item;
        this.dropper = dropper;
        this.owner = owner;
        this.meso = 0;
    }

    public MapleMapItem(int meso, Point position, MapleMapObject dropper, MapleCharacter owner) {
        setPosition(position);
        this.item = null;
        this.meso = meso;
        this.dropper = dropper;
        this.owner = owner;
    }

    public IItem getItem() {
        return item;
    }

    public MapleMapObject getDropper() {
        return dropper;
    }

    public MapleCharacter getOwner() {
        return owner;
    }

    public int getMeso() {
        return meso;
    }

    public boolean isPickedUp() {
        return pickedUp;
    }

    public void setPickedUp(boolean pickedUp) {
        this.pickedUp = pickedUp;
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        client.getSession().write(MaplePacketCreator.removeItemFromMap(getObjectId(), 1, 0));
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.ITEM;
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        if (getMeso() > 0) {
            client.getSession().write(MaplePacketCreator.dropMesoFromMapObject(getMeso(), getObjectId(), getDropper().getObjectId(), getOwner().getId(), null, getPosition(), (byte) 2));
        } else {
            client.getSession().write(MaplePacketCreator.dropItemFromMapObject(getItem().getItemId(), getObjectId(), 0, getOwner().getId(), null, getPosition(), (byte) 2));
        }
    }

    public boolean isQuestItem(int itemid) {
        int numrow = 0;
        Connection con = DatabaseConnection.getConnection();
        try { //reading from the DB instead of XML parsing; since SQL might not be complete
            PreparedStatement ps = con.prepareStatement("SELECT * FROM monsterquestdrops WHERE itemid = ?");
            ps.setInt(1, itemid);
            ResultSet rs = ps.executeQuery();
            rs.last();
            numrow = rs.getRow();
            rs.close();
            ps.close();
        } catch (Exception e) {
            log.error("Exception: " + e);
        }

        if (numrow > 0) {
            return true;
        } else {
            return false;
        }
    }

    public int getItemQuestId(int itemid) {
        Connection con = DatabaseConnection.getConnection();
        int questid = -1;
        try {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM monsterquestdrops WHERE itemid = ?");
            ps.setInt(1, itemid);
            ResultSet rs = ps.executeQuery();
            questid = rs.getInt("questid");
            rs.close();
            ps.close();
        } catch (SQLException SQLe) {
            SQLe.printStackTrace();
        } catch (Exception e) {
            log.error("Exception: " + e);
        }
        return questid;
    }
}