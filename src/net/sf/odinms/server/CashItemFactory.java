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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.odinms.provider.MapleData;
import net.sf.odinms.provider.MapleDataProvider;
import net.sf.odinms.provider.MapleDataProviderFactory;
import net.sf.odinms.provider.MapleDataTool;
import net.sf.odinms.tools.StringUtil;

/**
 *
 * @author Lerk
 */
public class CashItemFactory {

    private static Map<Integer, Integer> snLookup = new HashMap<Integer, Integer>();
    private static Map<Integer, Integer> idLookup = new HashMap<Integer, Integer>();
    private static Map<Integer, CashItemInfo> itemStats = new HashMap<Integer, CashItemInfo>();
    private static MapleDataProvider data = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("net.sf.odinms.wzpath") + "/Etc.wz"));
    private static MapleData commodities = data.getData(StringUtil.getLeftPaddedStr("Commodity.img", '0', 11));
    private static Map<Integer, List<CashItemInfo>> cashPackages = new HashMap<Integer, List<CashItemInfo>>();

    public static CashItemInfo getItem(int sn) {
        CashItemInfo stats = itemStats.get(sn);
        if (stats == null) {
            int cid = getCommodityFromSN(sn);

            int itemId = MapleDataTool.getIntConvert(cid + "/ItemId", commodities);
            int count = MapleDataTool.getIntConvert(cid + "/Count", commodities, 1);
            int price = MapleDataTool.getIntConvert(cid + "/Price", commodities, 0);
            int period = MapleDataTool.getIntConvert(cid + "/Period", commodities, 0);
            int gender = MapleDataTool.getIntConvert(cid + "/Gender", commodities, 2);
            boolean onSale = MapleDataTool.getIntConvert(cid + "/OnSale", commodities, 0) == 1;

            stats = new CashItemInfo(sn, itemId, count, price, period, gender, onSale);

            itemStats.put(sn, stats);
        }

        return stats;
    }

    private static int getCommodityFromSN(int sn) {
        int cid;

        if (snLookup.get(sn) == null) {
            int curr = snLookup.size() - 1;
            int currSN = 0;
            if (curr == -1) {
                curr = 0;
                currSN = MapleDataTool.getIntConvert("0/SN", commodities);
                snLookup.put(currSN, curr);

            }
            for (int i = snLookup.size() - 1; currSN != sn; i++) {
                curr = i;
                currSN = MapleDataTool.getIntConvert(curr + "/SN", commodities);
                snLookup.put(currSN, curr);
            }
            cid = curr;
        } else {
            cid = snLookup.get(sn);
        }
        return cid;
    }

    public static List<CashItemInfo> getPackageItems(int itemId) {
        if (cashPackages.containsKey(itemId)) {
            return cashPackages.get(itemId);
        }
        List<CashItemInfo> packageItems = new ArrayList<CashItemInfo>();
        MapleDataProvider dataProvider = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("net.sf.odinms.wzpath") + "/" + "Etc.wz"));
        MapleData a = dataProvider.getData("CashPackage.img");
        for (MapleData b : a.getChildren()) {
            if (itemId == Integer.parseInt(b.getName())) {
                for (MapleData c : b.getChildren()) {
                    for (MapleData d : c.getChildren()) {
                        int SN = MapleDataTool.getIntConvert("" + Integer.parseInt(d.getName()), c);
                        packageItems.add(getItem(SN));
                    }
                }
                break;
            }
        }
        cashPackages.put(itemId, packageItems);
        return packageItems;
    }

    public static int getSnFromId(int id) {
        int cid;

        if (idLookup.get(id) == null) {
            int curr = idLookup.size() - 1;
            int currSN = 0;
            if (curr == -1) {
                curr = 0;
                currSN = MapleDataTool.getIntConvert("0/ItemId", commodities);
                idLookup.put(currSN, curr);

            }
            for (int i = idLookup.size() - 1; currSN != id; i++) {
                curr = i;
                currSN = MapleDataTool.getIntConvert(curr + "/ItemId", commodities);
                idLookup.put(currSN, curr);
            }
            cid = curr;
        } else {
            cid = idLookup.get(id);
        }
        return MapleDataTool.getIntConvert(cid + "/SN", commodities);
    }
}