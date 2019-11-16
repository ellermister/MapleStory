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

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import net.sf.odinms.provider.MapleData;
import net.sf.odinms.provider.MapleDataProvider;
import net.sf.odinms.provider.MapleDataProviderFactory;
import net.sf.odinms.provider.MapleDataTool;
import net.sf.odinms.tools.Pair;

/**
 * Created By :
 * @author Bassoe
 * Modified By :
 * @author Jay Estrella
 */
public class MapleOxQuizFactory {

    private static MapleDataProvider stringData = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("net.sf.odinms.wzpath") + "/Etc.wz"));
    private static Map<Pair<Integer, Integer>, String[]> questions = new HashMap<Pair<Integer, Integer>, String[]>(); // <<img dir, id> / [Question, answer, explanation]>>

    public static String getOXQuestion(int imgdir, int id) {
        String ret = questions.get(new Pair<Integer, Integer>(imgdir, id))[0];
        if (ret == null) {
            synchronized (questions) {
                MapleData itemsData = stringData.getData("OXQuiz.img").getChildByPath(String.valueOf(imgdir));
                MapleData itemFolder = itemsData.getChildByPath(String.valueOf(id));
                String itemName = MapleDataTool.getString("q", itemFolder, "NO-NAME");
                questions.put(new Pair<Integer, Integer>(imgdir, id), new String[]{itemName, String.valueOf(MapleDataTool.getInt(itemFolder.getChildByPath("a"))), MapleDataTool.getString("d", itemFolder, "NO-NAME")});
                ret = id + " " + itemName; // No idea if it's like that or not.
            }
        }
        return ret;
    }

    public static int getOXAnswer(int imgdir, int id) {
        return Integer.parseInt(questions.get(new Pair<Integer, Integer>(imgdir, id))[1]);
    }

    public static String getOXExplain(int imgdir, int id) {
        return questions.get(new Pair<Integer, Integer>(imgdir, id))[2];
    }
}
