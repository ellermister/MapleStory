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

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.Map;
import net.sf.odinms.database.DatabaseConnection;

/**
 *
 * @author Anujan
 */
public class SpeedRankings {

    private static String[] zTeamNames = new String[10];
    private static long[] zRankTime = new long[10];
    private static String[] pTeamNames = new String[10];
    private static long[] pRankTime = new long[10];
    private static Map<Integer, Long> zStartTime = new LinkedHashMap<Integer, Long>();
    private static Map<Integer, Long> pStartTime = new LinkedHashMap<Integer, Long>();
    private static Map<Integer, Long> zEndTime = new LinkedHashMap<Integer, Long>();
    private static Map<Integer, Long> pEndTime = new LinkedHashMap<Integer, Long>();

    public static void loadFromDB() { //I'll recache with this too i guess
        //Type 0 = Zakum, 1 = Pap
        for (int type = 0; type <= 1; type++) {
            try {
                Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT * FROM speedrankings where type = ? ORDER BY time ASC LIMIT 10");
                ps.setInt(1, type);
                ResultSet rs = ps.executeQuery();
                int i = 0;
                while (rs.next() && i < zRankTime.length) {
                    if (type == 0) {
                        zTeamNames[i] = rs.getString("names");
                        zRankTime[i] = rs.getLong("time");
                    } else if (type == 1) {
                        pTeamNames[i] = rs.getString("names");
                        pRankTime[i] = rs.getLong("time");
                    }
                    i++;
                }
                ps.close();
                rs.close();
            } catch (SQLException se) {
                se.printStackTrace();
                return;
            }
        }
        return;
    }

    public static void insertRankingToSQL(int type, String names, long time) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT into speedrankings (type, names, time) VALUES (?, ?, ?)");
            ps.setInt(1, type);
            ps.setString(2, names);
            ps.setLong(3, time);
            ps.execute();
            ps.close();
            if (type == 0 && time < zRankTime[9]) {
                loadFromDB();
            } else if (type == 1 && time < pRankTime[9]) {
                loadFromDB();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static long getTime(int rank, int type) {
        if (type == 0) {
            return zRankTime[rank];
        } else if (type == 1) {
            return pRankTime[rank];
        }
        return 0;
    }

    public static String getTeamMembers(int rank, int type) {
        if (type == 0) {
            return zTeamNames[rank];
        } else if (type == 1) {
            return pTeamNames[rank];
        }
        return null;
    }

    public static void setStartTime(int type, int oid, long time) {
        if (type == 0 && !zStartTime.containsKey(oid)) {
            zStartTime.put(oid, time);
        } else if (type == 1 && !pStartTime.containsKey(oid)) {
            pStartTime.put(oid, time);
        }
        return;
    }

    public static void setEndTime(int type, int oid, long time) {
        if (type == 0 && !zEndTime.containsKey(oid)) {
            zEndTime.put(oid, time);
        } else if (type == 1 && !pEndTime.containsKey(oid)) {
            pEndTime.put(oid, time);
        }
        return;
    }

    public static long calcTime(int type, int oid) {
        long time = Long.MAX_VALUE;
        try {
            if (type == 0) {
                time = ((long) zEndTime.get(oid) - zStartTime.get(oid));
            } else if (type == 1) {
                time = ((long) pEndTime.get(oid) - pStartTime.get(oid));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return time;
    }
}