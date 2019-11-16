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

package net.sf.odinms.net.login;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import net.sf.odinms.client.MapleJob;
import net.sf.odinms.database.DatabaseConnection;

/**
 *
 * @author Matze
 */
public class RankingWorker implements Runnable {

    private long lastUpdate = System.currentTimeMillis();
    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(RankingWorker.class);

    public void run() {
        Connection con = DatabaseConnection.getConnection();
        try {
            con.setAutoCommit(false);
            updateRanking(null);
            updateRanking(MapleJob.BEGINNER);
            updateRanking(MapleJob.WARRIOR);
            updateRanking(MapleJob.MAGICIAN);
            updateRanking(MapleJob.BOWMAN);
            updateRanking(MapleJob.THIEF);
            updateRanking(MapleJob.PIRATE);
            con.commit();
            con.setAutoCommit(true);
            lastUpdate = System.currentTimeMillis();
        } catch (SQLException ex) {
            try {
                con.rollback();
                con.setAutoCommit(true);
            //log.warn("Could not update rankings", ex); //We don't want to know
            } catch (SQLException ex2) {
                //log.error("Could not rollback unfinished ranking transaction", ex2); //We don't want to know
            }
        }
    }

    private void updateRanking(MapleJob job) throws SQLException {
        Connection con = DatabaseConnection.getConnection();
        String sqlCharSelect = "SELECT c.id, " + (job != null ? "c.jobRank, c.jobRankMove" : "c.rank, c.rankMove") + ", a.lastlogin AS lastlogin, a.loggedin FROM characters AS c LEFT JOIN accounts AS a ON c.accountid = a.id WHERE c.gm = 0 ";
        if (job != null) {
            sqlCharSelect += "AND c.job DIV 100 = ? ";
        }
        sqlCharSelect += "ORDER BY c.level DESC , c.exp DESC , c.fame DESC , c.meso DESC";
        PreparedStatement charSelect = con.prepareStatement(sqlCharSelect);
        if (job != null) {
            charSelect.setInt(1, job.getId() / 100);
        }
        ResultSet rs = charSelect.executeQuery();
        PreparedStatement ps = con.prepareStatement("UPDATE characters SET " + (job != null ? "jobRank = ?, jobRankMove = ? " : "rank = ?, rankMove = ? ") + "WHERE id = ?");
        int rank = 0;
        while (rs.next()) {
            int rankMove = 0;
            rank++;
            if (rs.getLong("lastlogin") < lastUpdate || rs.getInt("loggedin") > 0) {
                rankMove = rs.getInt((job != null ? "jobRankMove" : "rankMove"));
            }
            rankMove += rs.getInt((job != null ? "jobRank" : "rank")) - rank;
            ps.setInt(1, rank);
            ps.setInt(2, rankMove);
            ps.setInt(3, rs.getInt("id"));
            ps.executeUpdate();
        }
        rs.close();
        charSelect.close();
        ps.close();
    }
}