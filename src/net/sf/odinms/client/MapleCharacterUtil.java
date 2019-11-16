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

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import net.sf.odinms.provider.MapleData;
import net.sf.odinms.provider.MapleDataProviderFactory;

public class MapleCharacterUtil {

    private static List<String> bannedNames = new ArrayList<String>();
    private static Pattern namePattern = Pattern.compile("^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$");

    private MapleCharacterUtil() {
        // whoosh
    }

    public static boolean canCreateChar(String name, int world) {
        if (!isNameLegal(name)) {
            return false;
        }
        if (MapleCharacter.getIdByName(name, world) != -1) {
            return false;
        }
        return true;
    }

    public static boolean isNameLegal(String name) {
        if (name.getBytes().length < 4 || name.getBytes().length > 12 || isBanned(name)) {
            return false;
        }
        return namePattern.matcher(name).matches();
    }

    public static boolean isBanned(String name) {
        if (bannedNames.isEmpty()) {
            MapleData bannedName = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("net.sf.odinms.wzpath") + "/Etc.wz")).getData("ForbiddenName.img");
            for (MapleData bname : bannedName.getChildren()) {
                bannedNames.add(bname.getData().toString());
            }
        }
        for (String bName : bannedNames) {
            if (name.toLowerCase().contains(bName)) {
                return true;
            }
        }
        return false;
    }

    public static String makeMapleReadable(String in) {
        String wui = in.replace('I', 'i');
        wui = wui.replace('l', 'L');
        wui = wui.replace("rn", "Rn");
        wui = wui.replace("vv", "Vv");
        wui = wui.replace("VV", "Vv");
        return wui;
    }
}