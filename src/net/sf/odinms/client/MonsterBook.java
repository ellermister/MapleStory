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

package net.sf.odinms.client;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.sf.odinms.database.DatabaseConnection;
import net.sf.odinms.tools.MaplePacketCreator;

public final class MonsterBook {

    private int SpecialCard = 0,  NormalCard = 0,  BookLevel = 1;
    private Map<Integer, Integer> cards = new LinkedHashMap<Integer, Integer>();

    public void addCard(final MapleClient c, final int cardid) {
        c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showForeginCardEffect(c.getPlayer().getId()), false);
        for (Entry<Integer, Integer> all : cards.entrySet()) {
            if (all.getKey() == cardid) {
                if (all.getValue() > 4) {
                    c.getSession().write(MaplePacketCreator.addCard(true, cardid, all.getValue()));
                } else {
                    all.setValue(all.getValue() + 1);
                    c.getSession().write(MaplePacketCreator.addCard(false, cardid, all.getValue()));
                    c.getSession().write(MaplePacketCreator.showGainCard());
                    calculateLevel();
                }
                return;
            }
        }
        cards.put(cardid, 1);
        c.getSession().write(MaplePacketCreator.addCard(false, cardid, 1));
        c.getSession().write(MaplePacketCreator.showGainCard());
        calculateLevel();
    }

    private final void calculateLevel() {
        final int size = NormalCard + SpecialCard;
        BookLevel = 8;
        for (int i = 1; i < 8; i++) {
            if (size < net.sf.odinms.client.ExpTable.getBookLevel(i)) {
                BookLevel = i;
                return;
            }
        }
    }

    public int getBookLevel() {
        return BookLevel;
    }

    public Map<Integer, Integer> getCards() {
        return cards;
    }

    public int getTotalCards() {
        return SpecialCard + NormalCard;
    }

    public int getNormalCard() {
        return NormalCard;
    }

    public int getSpecialCard() {
        return SpecialCard;
    }

    public void loadCards(final int charid) throws SQLException {
        PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM monsterbook WHERE charid = ? ORDER BY cardid ASC");
        ps.setInt(1, charid);
        ResultSet rs = ps.executeQuery();
        int cardid, level;
        while (rs.next()) {
            cardid = rs.getInt("cardid");
            level = rs.getInt("level");
            if (cardid / 1000 >= 2388) {
                SpecialCard++;
            } else {
                NormalCard++;
            }
            cards.put(cardid, level);
        }
        rs.close();
        ps.close();
        calculateLevel();
    }

    public void saveCards(final int charid) {
        if (cards.size() == 0) {
            return;
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM monsterbook WHERE charid = ?");
            ps.setInt(1, charid);
            ps.execute();
            ps.close();
            boolean first = true;
            StringBuilder query = new StringBuilder();
            for (Entry<Integer, Integer> all : cards.entrySet()) {
                if (first) {
                    query.append("INSERT INTO monsterbook VALUES (");
                    first = false;
                } else {
                    query.append(",(");
                }
                query.append(charid);
                query.append(", ");
                query.append(all.getKey());
                query.append(", ");
                query.append(all.getValue());
                query.append(")");
            }
            ps = con.prepareStatement(query.toString());
            ps.execute();
            ps.close();
        } catch (Exception e) {
        }
    }
}