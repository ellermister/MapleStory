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

package net.sf.odinms.server.quest;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;

import net.sf.odinms.client.MapleQuestStatus;
import net.sf.odinms.database.DatabaseConnection;

/**
 *
 * @author Matze
 */
public class MapleCustomQuest extends MapleQuest {

	public MapleCustomQuest(int id) {
		try {
			this.id = id;
			startActs = new LinkedList<MapleQuestAction>();
			completeActs = new LinkedList<MapleQuestAction>();
			startReqs = new LinkedList<MapleQuestRequirement>();
			completeReqs = new LinkedList<MapleQuestRequirement>();
			Connection con = DatabaseConnection.getConnection();
			PreparedStatement ps = con.prepareStatement("SELECT * FROM questrequirements WHERE " + "questid = ?");
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			MapleQuestRequirement req;
			MapleCustomQuestData data;
			while (rs.next()) {
				Blob blob = rs.getBlob("data");
				ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(blob.getBytes(1, (int) blob.length())));
				data = (MapleCustomQuestData) ois.readObject();
				req = new MapleQuestRequirement(this, MapleQuestRequirementType.getByWZName(data.getName()), data);
				MapleQuestStatus.Status status = MapleQuestStatus.Status.getById(rs.getInt("status"));
				if (status.equals(MapleQuestStatus.Status.NOT_STARTED)) {
					startReqs.add(req);
				} else if (status.equals(MapleQuestStatus.Status.STARTED)) {
					completeReqs.add(req);
				}
			}
			rs.close();
			ps.close();
			ps = con.prepareStatement("SELECT * FROM questactions WHERE questid = ?");
			ps.setInt(1, id);
			rs = ps.executeQuery();
			MapleQuestAction act;
			while (rs.next()) {
				Blob blob = rs.getBlob("data");
				ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(blob.getBytes(1, (int) blob.length())));
				data = (MapleCustomQuestData) ois.readObject();
				act = new MapleQuestAction(MapleQuestActionType.getByWZName(data.getName()), data, this);
				MapleQuestStatus.Status status = MapleQuestStatus.Status.getById(
					rs.getInt("status"));
				if (status.equals(MapleQuestStatus.Status.NOT_STARTED)) {
					startActs.add(act);
				} else if (status.equals(MapleQuestStatus.Status.STARTED)) {
					completeActs.add(act);
				}
			}
			rs.close();
			ps.close();
		} catch (SQLException ex) {
			log.error("Error loading custom quest.", ex);
		} catch (IOException e) {
			log.error("Error loading custom quest.", e);
		} catch (ClassNotFoundException e) {
			log.error("Error loading custom quest.", e);
		}
	}
}