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
import java.io.PrintWriter;
import net.sf.odinms.provider.MapleData;
import net.sf.odinms.provider.MapleDataProvider;
import net.sf.odinms.provider.MapleDataProviderFactory;

/**
 *
 * @author Danny
 */
public class WZStringDumper {

    public static void main(String args[]) throws FileNotFoundException, IOException {
        File stringFile = MapleDataProviderFactory.fileInWZPath("string.wz");
        MapleDataProvider stringProvider = MapleDataProviderFactory.getDataProvider(stringFile);

        MapleData cash = stringProvider.getData("Cash.img");
        MapleData consume = stringProvider.getData("Consume.img");
        MapleData eqp = stringProvider.getData("Eqp.img").getChildByPath("Eqp");
        MapleData etc = stringProvider.getData("Etc.img").getChildByPath("Etc");
        MapleData ins = stringProvider.getData("Ins.img");
        MapleData pet = stringProvider.getData("Pet.img");
        MapleData map = stringProvider.getData("Map.img");
        MapleData mob = stringProvider.getData("Mob.img");
        MapleData skill = stringProvider.getData("Skill.img");
        MapleData npc = stringProvider.getData("Npc.img");

        String output = args[0];

        File outputDir = new File(output);
        File cashTxt = new File(output + "\\点装.txt");
        File useTxt = new File(output + "\\消耗.txt");
        File eqpDir = new File(output + "\\装备");
        File etcTxt = new File(output + "\\其它.txt");
        File insTxt = new File(output + "\\设置.txt");
        File petTxt = new File(output + "\\宠物.txt");
        File mapTxt = new File(output + "\\地图.txt");
        File mobTxt = new File(output + "\\怪物.txt");
        File skillTxt = new File(output + "\\技能.txt");
        File npcTxt = new File(output + "\\NPC.txt");
        outputDir.mkdir();
        cashTxt.createNewFile();
        useTxt.createNewFile();
        eqpDir.mkdir();
        etcTxt.createNewFile();
        insTxt.createNewFile();
        petTxt.createNewFile();
        mapTxt.createNewFile();
        mobTxt.createNewFile();
        skillTxt.createNewFile();
        npcTxt.createNewFile();

        System.out.println("提取 Cash.img 数据...");
        PrintWriter writer = new PrintWriter(new FileOutputStream(cashTxt));
        for (MapleData child : cash.getChildren()) {
            MapleData nameData = child.getChildByPath("name");
            MapleData descData = child.getChildByPath("desc");
            String name = "";
            String desc = "(无描述)";
            if (nameData != null) {
                name = (String) nameData.getData();
            }
            if (descData != null) {
                desc = (String) descData.getData();
            }
            writer.println(child.getName() + " - " + name + " - " + desc);
        }
        writer.flush();
        writer.close();
        System.out.println("Cash.img 提取完成.");

        System.out.println("提取 Consume.img 数据...");
        writer = new PrintWriter(new FileOutputStream(useTxt));
        for (MapleData child : consume.getChildren()) {
            MapleData nameData = child.getChildByPath("name");
            MapleData descData = child.getChildByPath("desc");
            String name = "";
            String desc = "(无描述)";
            if (nameData != null) {
                name = (String) nameData.getData();
            }
            if (descData != null) {
                desc = (String) descData.getData();
            }
            writer.println(child.getName() + " - " + name + " - " + desc);
        }
        writer.flush();
        writer.close();
        System.out.println("Consume.img 提取完成.");

        System.out.println("提取 Eqp.img 数据...");
        for (MapleData child : eqp.getChildren()) {
            System.out.println("提取 " + child.getName() + " 数据...");
            File eqpFile = new File(output + "\\装备\\" + child.getName() + ".txt");
            eqpFile.createNewFile();
            PrintWriter eqpWriter = new PrintWriter(new FileOutputStream(eqpFile));
            for (MapleData child2 : child.getChildren()) {
                MapleData nameData = child2.getChildByPath("name");
                MapleData descData = child2.getChildByPath("desc");
                String name = "";
                String desc = "(无描述)";
                if (nameData != null) {
                    name = (String) nameData.getData();
                }
                if (descData != null) {
                    desc = (String) descData.getData();
                }
                eqpWriter.println(child2.getName() + " - " + name + " - " + desc);
            }
            eqpWriter.flush();
            eqpWriter.close();
            System.out.println(child.getName() + " 提取完成.");
        }
        System.out.println("Eqp.img 提取完成.");

        System.out.println("提取 Etc.img 数据...");
        writer = new PrintWriter(new FileOutputStream(etcTxt));
        for (MapleData child : etc.getChildren()) {
            MapleData nameData = child.getChildByPath("name");
            MapleData descData = child.getChildByPath("desc");
            String name = "";
            String desc = "(无描述)";
            if (nameData != null) {
                name = (String) nameData.getData();
            }
            if (descData != null) {
                desc = (String) descData.getData();
            }
            writer.println(child.getName() + " - " + name + " - " + desc);
        }
        writer.flush();
        writer.close();
        System.out.println("Etc.img 提取完成.");

        System.out.println("提取 Ins.img 数据...");
        writer = new PrintWriter(new FileOutputStream(insTxt));
        for (MapleData child : ins.getChildren()) {
            MapleData nameData = child.getChildByPath("name");
            MapleData descData = child.getChildByPath("desc");
            String name = "";
            String desc = "(无描述)";
            if (nameData != null) {
                name = (String) nameData.getData();
            }
            if (descData != null) {
                desc = (String) descData.getData();
            }
            writer.println(child.getName() + " - " + name + " - " + desc);
        }
        writer.flush();
        writer.close();
        System.out.println("Ins.img 提取完成.");

        System.out.println("提取 Pet.img 数据...");
        writer = new PrintWriter(new FileOutputStream(petTxt));
        for (MapleData child : pet.getChildren()) {
            MapleData nameData = child.getChildByPath("name");
            MapleData descData = child.getChildByPath("desc");
            String name = "";
            String desc = "(无描述)";
            if (nameData != null) {
                name = (String) nameData.getData();
            }
            if (descData != null) {
                desc = (String) descData.getData();
            }
            writer.println(child.getName() + " - " + name + " - " + desc);
        }
        writer.flush();
        writer.close();
        System.out.println("Pet.img 提取完成.");

        System.out.println("提取 Map.img 数据...");
        writer = new PrintWriter(new FileOutputStream(mapTxt));
        for (MapleData child : map.getChildren()) {
            writer.println(child.getName());
            writer.println();
            for (MapleData child2 : child.getChildren()) {
                MapleData streetData = child2.getChildByPath("streetName");
                MapleData mapData = child2.getChildByPath("mapName");
                String streetName = "(无数据名)";
                String mapName = "(无地图名)";
                if (streetData != null) {
                    streetName = (String) streetData.getData();
                }
                if (mapData != null) {
                    mapName = (String) mapData.getData();
                }
                writer.println(child2.getName() + " - " + streetName + " - " + mapName);
            }
            writer.println();
        }
        writer.flush();
        writer.close();
        System.out.println("Map.img 提取完成.");

        System.out.println("提取 Mob.img 数据...");
        writer = new PrintWriter(new FileOutputStream(mobTxt));
        for (MapleData child : mob.getChildren()) {
            MapleData nameData = child.getChildByPath("name");
            String name = "";
            if (nameData != null) {
                name = (String) nameData.getData();
            }
            writer.println(child.getName() + " - " + name);
        }
        writer.flush();
        writer.close();
        System.out.println("Mob.img 提取完成.");

        System.out.println("提取 Skill.img 数据...");
        writer = new PrintWriter(new FileOutputStream(skillTxt));
        for (MapleData child : skill.getChildren()) {
            MapleData nameData = child.getChildByPath("name");
            MapleData descData = child.getChildByPath("desc");
            MapleData bookData = child.getChildByPath("bookName");
            String name = "";
            String desc = "";
            if (nameData != null) {
                name = (String) nameData.getData();
            }
            if (descData != null) {
                desc = (String) descData.getData();
            }
            if (bookData != null) {
                continue;
            } else {
                writer.println(child.getName() + " - " + name + " - " + desc);
            }
        }
        writer.flush();
        writer.close();
        System.out.println("Skill.img 提取完成.");

        System.out.println("提取 Npc.img 数据...");
        writer = new PrintWriter(new FileOutputStream(npcTxt));
        for (MapleData child : npc.getChildren()) {
            MapleData nameData = child.getChildByPath("name");
            String name = "";
            if (nameData != null) {
                name = (String) nameData.getData();
            }
            writer.println(child.getName() + " - " + name);
        }
        writer.flush();
        writer.close();
        System.out.println("Npc.img 提取完成.");
    }
}