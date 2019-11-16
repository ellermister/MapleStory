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

package net.sf.odinms.provider;

import java.io.File;
import java.io.IOException;
import net.sf.odinms.provider.wz.WZFile;
import net.sf.odinms.provider.xmlwz.XMLWZFile;

public class MapleDataProviderFactory {

    private final static String wzPath = System.getProperty("net.sf.odinms.wzpath");

    private static MapleDataProvider getWZ(Object in, boolean provideImages) {
        if (in instanceof File) {
            File fileIn = (File) in;
            if (fileIn.getName().endsWith("wz") && !fileIn.isDirectory()) {
                try {
                    return new WZFile(fileIn, provideImages);
                } catch (IOException e) {
                    throw new RuntimeException("加载WZ数据文件失败", e);
                }
            } else {
                return new XMLWZFile(fileIn);
            }
        }
        throw new IllegalArgumentException("无法创建数据输入input " + in);
    }

    public static MapleDataProvider getDataProvider(Object in) {
        return getWZ(in, false);
    }

    public static MapleDataProvider getImageProvidingDataProvider(Object in) {
        return getWZ(in, true);
    }

    public static File fileInWZPath(String filename) {
        return new File(wzPath, filename);
    }
}