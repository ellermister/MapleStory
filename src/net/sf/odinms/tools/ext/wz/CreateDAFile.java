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

package net.sf.odinms.tools.ext.wz;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import net.sf.odinms.provider.MapleData;
import net.sf.odinms.provider.MapleDataProvider;
import net.sf.odinms.provider.MapleDataProviderFactory;
import net.sf.odinms.tools.data.output.MaplePacketLittleEndianWriter;

/**
 *
 * @author Danny
 */
public class CreateDAFile {

    public static void main(String args[]) throws FileNotFoundException, IOException {
        File stringFile = MapleDataProviderFactory.fileInWZPath("string.wz");
        MapleDataProvider stringProvider = MapleDataProviderFactory.getDataProvider(stringFile);
        MapleData cash = stringProvider.getData("Cash.img");
        //MapleData pachinko = stringProvider.getData("pachinko.img");    //豆豆关联
        MapleData consume = stringProvider.getData("Consume.img");
        MapleData eqp = stringProvider.getData("Eqp.img").getChildByPath("Eqp");
        MapleData etc = stringProvider.getData("Etc.img").getChildByPath("Etc");
        MapleData ins = stringProvider.getData("Ins.img");
        MapleData pet = stringProvider.getData("Pet.img");
        MapleData map = stringProvider.getData("Map.img");
        MapleData mob = stringProvider.getData("Mob.img");
        MapleData skill = stringProvider.getData("Skill.img");
        MapleData npc = stringProvider.getData("Npc.img");
        File daFile = new File("ids.da");
        daFile.createNewFile();
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        int numCategories = 10;
        mplew.writeShort(numCategories);
        mplew.writeMapleAsciiString("Cash");
        List<DataEntry> cashData = new ArrayList<DataEntry>();
        for (MapleData child : cash.getChildren()) {
            MapleData nameData = child.getChildByPath("name");
            MapleData descData = child.getChildByPath("desc");
            String name = "";
            String desc = "(no description)";
            if (nameData != null) {
                name = (String) nameData.getData();
            }
            if (descData != null) {
                desc = (String) descData.getData();
            }
            cashData.add(new DataEntry(Integer.parseInt(child.getName()), name, desc));
        }
        mplew.writeShort(cashData.size());
        for (DataEntry data : cashData) {
            mplew.writeInt(data.getId());
            mplew.writeShort(2);
            mplew.writeMapleAsciiString(data.name);
            mplew.writeMapleAsciiString(data.desc);
        }

        mplew.writeMapleAsciiString("Consume");
        List<DataEntry> consumeData = new ArrayList<DataEntry>();
        for (MapleData child : consume.getChildren()) {
            MapleData nameData = child.getChildByPath("name");
            MapleData descData = child.getChildByPath("desc");
            String name = "";
            String desc = "(no description)";
            if (nameData != null) {
                name = (String) nameData.getData();
            }
            if (descData != null) {
                desc = (String) descData.getData();
            }
            consumeData.add(new DataEntry(Integer.parseInt(child.getName()), name, desc));
        }
        mplew.writeShort(consumeData.size());
        for (DataEntry data : consumeData) {
            mplew.writeInt(data.getId());
            mplew.writeShort(2);
            mplew.writeMapleAsciiString(data.name);
            mplew.writeMapleAsciiString(data.desc);
        }

        mplew.writeMapleAsciiString("Equip");
        List<DataEntry> equipData = new ArrayList<DataEntry>();
        for (MapleData child : eqp.getChildren()) {
            for (MapleData child2 : child.getChildren()) {
                MapleData nameData = child2.getChildByPath("name");
                MapleData descData = child2.getChildByPath("desc");
                String name = "";
                String desc = "(no description)";
                if (nameData != null) {
                    name = (String) nameData.getData();
                }
                if (descData != null) {
                    desc = (String) descData.getData();
                }
                equipData.add(new DataEntry(Integer.parseInt(child2.getName()), name, desc));
            }
        }
        mplew.writeShort(equipData.size());
        for (DataEntry data : equipData) {
            mplew.writeInt(data.getId());
            mplew.writeShort(2);
            mplew.writeMapleAsciiString(data.name);
            mplew.writeMapleAsciiString(data.desc);
        }

        mplew.writeMapleAsciiString("Etc");
        List<DataEntry> etcData = new ArrayList<DataEntry>();
        for (MapleData child : etc.getChildren()) {
            MapleData nameData = child.getChildByPath("name");
            MapleData descData = child.getChildByPath("desc");
            String name = "";
            String desc = "(no description)";
            if (nameData != null) {
                name = (String) nameData.getData();
            }
            if (descData != null) {
                desc = (String) descData.getData();
            }
            etcData.add(new DataEntry(Integer.parseInt(child.getName()), name, desc));
        }
        mplew.writeShort(etcData.size());
        for (DataEntry data : etcData) {
            mplew.writeInt(data.getId());
            mplew.writeShort(2);
            mplew.writeMapleAsciiString(data.name);
            mplew.writeMapleAsciiString(data.desc);
        }

        mplew.writeMapleAsciiString("Ins");
        List<DataEntry> insData = new ArrayList<DataEntry>();
        for (MapleData child : ins.getChildren()) {
            MapleData nameData = child.getChildByPath("name");
            MapleData descData = child.getChildByPath("desc");
            String name = "";
            String desc = "(no description)";
            if (nameData != null) {
                name = (String) nameData.getData();
            }
            if (descData != null) {
                desc = (String) descData.getData();
            }
            insData.add(new DataEntry(Integer.parseInt(child.getName()), name, desc));
        }
        mplew.writeShort(insData.size());
        for (DataEntry data : insData) {
            mplew.writeInt(data.getId());
            mplew.writeShort(2);
            mplew.writeMapleAsciiString(data.name);
            mplew.writeMapleAsciiString(data.desc);
        }

        mplew.writeMapleAsciiString("Pet");
        List<DataEntry> petData = new ArrayList<DataEntry>();
        for (MapleData child : pet.getChildren()) {
            MapleData nameData = child.getChildByPath("name");
            MapleData descData = child.getChildByPath("desc");
            String name = "";
            String desc = "(no description)";
            if (nameData != null) {
                name = (String) nameData.getData();
            }
            if (descData != null) {
                desc = (String) descData.getData();
            }
            petData.add(new DataEntry(Integer.parseInt(child.getName()), name, desc));
        }
        mplew.writeShort(petData.size());
        for (DataEntry data : petData) {
            mplew.writeInt(data.getId());
            mplew.writeShort(2);
            mplew.writeMapleAsciiString(data.name);
            mplew.writeMapleAsciiString(data.desc);
        }

        mplew.writeMapleAsciiString("Map");
        List<DataEntry> mapData = new ArrayList<DataEntry>();
        for (MapleData child : map.getChildren()) {
            for (MapleData child2 : child.getChildren()) {
                MapleData nameData = child2.getChildByPath("streetName");
                MapleData descData = child2.getChildByPath("mapName");
                String name = "(no street name)";
                String desc = "(no map name)";
                if (nameData != null) {
                    name = (String) nameData.getData();
                }
                if (descData != null) {
                    desc = (String) descData.getData();
                }
                mapData.add(new DataEntry(Integer.parseInt(child2.getName()), name, desc));
            }
        }
        mplew.writeShort(mapData.size());
        for (DataEntry data : mapData) {
            mplew.writeInt(data.getId());
            mplew.writeShort(2);
            mplew.writeMapleAsciiString(data.name);
            mplew.writeMapleAsciiString(data.desc);
        }

        mplew.writeMapleAsciiString("Mob");
        List<DataEntry> mobData = new ArrayList<DataEntry>();
        for (MapleData child : mob.getChildren()) {
            MapleData nameData = child.getChildByPath("name");
            //MapleData descData = child.getChildByPath("desc");
            String name = "";
            //String desc = "(no description)";
            if (nameData != null) {
                name = (String) nameData.getData();
            }
            //if (descData != null) {
            //	desc = (String) descData.getData();
            //}
            mobData.add(new DataEntry(Integer.parseInt(child.getName()), name, ""));
        }
        mplew.writeShort(mobData.size());
        for (DataEntry data : mobData) {
            mplew.writeInt(data.getId());
            mplew.writeShort(2);
            mplew.writeMapleAsciiString(data.name);
            mplew.writeMapleAsciiString(data.desc);
        }

        mplew.writeMapleAsciiString("Skill");
        List<DataEntry> skillData = new ArrayList<DataEntry>();
        for (MapleData child : skill.getChildren()) {
            MapleData nameData = child.getChildByPath("name");
            MapleData descData = child.getChildByPath("desc");
            String name = "";
            String desc = "(no description)";
            if (nameData != null) {
                name = (String) nameData.getData();
            }
            if (descData != null) {
                desc = (String) descData.getData();
            }
            skillData.add(new DataEntry(Integer.parseInt(child.getName()), name, desc));
        }
        mplew.writeShort(skillData.size());
        for (DataEntry data : skillData) {
            mplew.writeInt(data.getId());
            mplew.writeShort(2);
            mplew.writeMapleAsciiString(data.name);
            mplew.writeMapleAsciiString(data.desc);
        }

        mplew.writeMapleAsciiString("NPC");
        List<DataEntry> npcData = new ArrayList<DataEntry>();
        for (MapleData child : npc.getChildren()) {
            MapleData nameData = child.getChildByPath("name");
            //MapleData descData = child.getChildByPath("desc");
            String name = "";
            //String desc = "(no description)";
            if (nameData != null) {
                name = (String) nameData.getData();
            }
            //if (descData != null) {
            //	desc = (String) descData.getData();
            //}
            npcData.add(new DataEntry(Integer.parseInt(child.getName()), name, ""));
        }
        mplew.writeShort(npcData.size());
        for (DataEntry data : npcData) {
            mplew.writeInt(data.getId());
            mplew.writeShort(2);
            mplew.writeMapleAsciiString(data.name);
            mplew.writeMapleAsciiString(data.desc);
        }

        FileOutputStream fos = new FileOutputStream(daFile);
        fos.write(mplew.getPacket().getBytes());
        fos.flush();
        fos.close();
    }

    private static class DataEntry {

        private int id;
        private String name;
        private String desc;

        public DataEntry(int id, String name, String desc) {
            this.id = id;
            this.name = name;
            this.desc = desc;
        }

        public int getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public String getDesc() {
            return desc;
        }
    }
}