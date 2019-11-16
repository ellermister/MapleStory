package net.sf.odinms.client.messages.commands;

import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedHashSet;

import java.util.List;
import net.sf.odinms.client.Equip;
import net.sf.odinms.client.IItem;
import net.sf.odinms.client.Item;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleInventoryType;
import net.sf.odinms.client.MapleJob;
import net.sf.odinms.client.MaplePet;
import net.sf.odinms.client.MapleStat;
import net.sf.odinms.client.messages.Command;
import net.sf.odinms.client.messages.CommandDefinition;
import net.sf.odinms.client.messages.CommandProcessor;
import static net.sf.odinms.client.messages.CommandProcessor.getOptionalIntArg;
import net.sf.odinms.client.messages.IllegalCommandSyntaxException;
import net.sf.odinms.client.messages.MessageCallback;
import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.scripting.npc.NPCScriptManager;
import net.sf.odinms.server.MapleInventoryManipulator;
import net.sf.odinms.server.MapleItemInformationProvider;
import net.sf.odinms.server.MaplePortal;
import net.sf.odinms.server.MapleShopFactory;
import net.sf.odinms.server.life.MapleLifeFactory;
import net.sf.odinms.server.life.MapleMonster;
import net.sf.odinms.server.life.MapleNPC;
import net.sf.odinms.server.maps.MapleMap;
import net.sf.odinms.server.maps.MapleMapObject;
import net.sf.odinms.server.maps.MapleMapObjectType;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.StringUtil;

public class CharCommands implements Command {

    @SuppressWarnings("static-access")
    @Override
    public void execute(MapleClient c, MessageCallback mc, String[] splitted) throws Exception, IllegalCommandSyntaxException {
        MapleCharacter player = c.getPlayer();
        ChannelServer cserv = c.getChannelServer();
        if (splitted[0].equals("!最大属性")) {
            player.setMaxHp(30000);
            player.setMaxMp(30000);
            player.setStr(Short.MAX_VALUE);
            player.setDex(Short.MAX_VALUE);
            player.setInt(Short.MAX_VALUE);
            player.setLuk(Short.MAX_VALUE);
            player.updateSingleStat(MapleStat.MAXHP, 30000);
            player.updateSingleStat(MapleStat.MAXMP, 30000);
            player.updateSingleStat(MapleStat.STR, Short.MAX_VALUE);
            player.updateSingleStat(MapleStat.DEX, Short.MAX_VALUE);
            player.updateSingleStat(MapleStat.INT, Short.MAX_VALUE);
            player.updateSingleStat(MapleStat.LUK, Short.MAX_VALUE);
        } else if (splitted[0].equals("!最小属性")) {
            player.setMaxHp(50);
            player.setMaxMp(5);
            player.setStr(4);
            player.setDex(4);
            player.setInt(4);
            player.setLuk(4);
            player.updateSingleStat(MapleStat.MAXHP, 50);
            player.updateSingleStat(MapleStat.MAXMP, 5);
            player.updateSingleStat(MapleStat.STR, 4);
            player.updateSingleStat(MapleStat.DEX, 4);
            player.updateSingleStat(MapleStat.INT, 4);
            player.updateSingleStat(MapleStat.LUK, 4);
        } else if (splitted[0].equals("!最大血量")) {
            int stat = Integer.parseInt(splitted[1]);
            player.setMaxHp(stat);
            player.updateSingleStat(MapleStat.MAXHP, stat);
        } else if (splitted[0].equals("!最大魔量")) {
            int stat = Integer.parseInt(splitted[1]);
            player.setMaxMp(stat);
            player.updateSingleStat(MapleStat.MAXMP, stat);
        } else if (splitted[0].equals("!设置血量")) {
            int stat = Integer.parseInt(splitted[1]);
            player.setHp(stat);
            player.updateSingleStat(MapleStat.HP, stat);
        } else if (splitted[0].equals("!设置魔量")) {
            int stat = Integer.parseInt(splitted[1]);
            player.setMp(stat);
            player.updateSingleStat(MapleStat.MP, stat);
        } else if (splitted[0].equals("!力量")) {
            int stat = Integer.parseInt(splitted[1]);
            player.setStr(stat);
            player.updateSingleStat(MapleStat.STR, stat);
        } else if (splitted[0].equals("!敏捷")) {
            int stat = Integer.parseInt(splitted[1]);
            player.setDex(stat);
            player.updateSingleStat(MapleStat.DEX, stat);
        } else if (splitted[0].equals("!智力")) {
            int stat = Integer.parseInt(splitted[1]);
            player.setInt(stat);
            player.updateSingleStat(MapleStat.INT, stat);
        } else if (splitted[0].equals("!运气")) {
            int stat = Integer.parseInt(splitted[1]);
            player.setLuk(stat);
            player.updateSingleStat(MapleStat.LUK, stat);
        } else if (splitted[0].equals("!技能点")) {
            int sp = Integer.parseInt(splitted[1]);
            if (sp + player.getRemainingSp() > Short.MAX_VALUE) {
                sp = Short.MAX_VALUE;
            }
            player.setRemainingSp(sp);
            player.updateSingleStat(MapleStat.AVAILABLESP, player.getRemainingSp());
        } else if (splitted[0].equals("!能力点")) {
            int ap = Integer.parseInt(splitted[1]);
            if (ap + player.getRemainingAp() > Short.MAX_VALUE) {
                ap = Short.MAX_VALUE;
            }
            player.setRemainingAp(ap);
            player.updateSingleStat(MapleStat.AVAILABLEAP, player.getRemainingAp());
        } else if (splitted[0].equals("!转职")) {
            int jobId = Integer.parseInt(splitted[1]);
            if (MapleJob.getById(jobId) != null) {
                player.changeJob(MapleJob.getById(jobId));
            }
        } else if (splitted[0].equals("!刷钱")) {
            if (Integer.MAX_VALUE - (player.getMeso() + Integer.parseInt(splitted[1])) >= 0) {
                player.gainMeso(Integer.parseInt(splitted[1]), true);
            } else {
                player.gainMeso(Integer.MAX_VALUE - player.getMeso(), true);
            }
        } else if (splitted[0].equals("!等级")) {
            int quantity = Integer.parseInt(splitted[1]);
            c.getPlayer().setLevel(quantity);
            c.getPlayer().levelUp();
            int newexp = c.getPlayer().getExp();
            if (newexp < 0) {
                c.getPlayer().gainExp(-newexp, false, false);
            }
        } else if (splitted[0].equals("!地图代码")) {
            int currentMap = player.getMapId();
            mc.dropMessage("你所在的地图代码为：[" + currentMap + "]");
            }else if (splitted[0].equals("!全掉")) {
                ChannelServer cserv1 = c.getChannelServer();
                int level = 0;
                for (MapleCharacter mch : cserv1.getPlayerStorage().getAllCharacters()){
                    mch.getClient().getSession().close();
                    mch.getClient().disconnect();
                }
        } else if (splitted[0].equals("!刷新地图")) {
            boolean custMap = splitted.length >= 2;
            int mapid = custMap ? Integer.parseInt(splitted[1]) : player.getMapId();
            MapleMap map = custMap ? player.getClient().getChannelServer().getMapFactory().getMap(mapid) : player.getMap();
            if (player.getClient().getChannelServer().getMapFactory().destroyMap(mapid)) {
                MapleMap newMap = player.getClient().getChannelServer().getMapFactory().getMap(mapid);
                MaplePortal newPor = newMap.getPortal(0);
                LinkedHashSet<MapleCharacter> mcs = new LinkedHashSet<MapleCharacter>(map.getCharacters()); // do NOT remove, fixing ConcurrentModificationEx.
                outerLoop:
                for (MapleCharacter m : mcs) {
                    for (int x = 0; x < 5; x++) {
                        try {
                            m.changeMap(newMap, newPor);
                            continue outerLoop;
                        } catch (Throwable t) {
                        }
                    }
                    mc.dropMessage("Failed warping " + m.getName() + " to the new map. Skipping...");
                }
                mc.dropMessage("地图刷新完毕，如还出现NPC不见请使用此命令.");
                return;
            }
            mc.dropMessage("Unsuccessful reset!");
          } else if (splitted[0].equals("!装备")) {
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            short quantity = (short) getOptionalIntArg(splitted, 2, 1);
            if (Integer.parseInt(splitted[1]) >= 5000000 && Integer.parseInt(splitted[1]) <= 5000100) {
                if (quantity > 1) {
                    quantity = 1;
                }
                int petId = MaplePet.createPet(Integer.parseInt(splitted[1]));
                MapleInventoryManipulator.addById(c, Integer.parseInt(splitted[1]), quantity, player.getName() + "used !item with quantity " + quantity, player.getName(), petId);
                return;
            } else if (ii.isRechargable(Integer.parseInt(splitted[1]))) {
                quantity = ii.getSlotMax(c, Integer.parseInt(splitted[1]));
                MapleInventoryManipulator.addById(c, Integer.parseInt(splitted[1]), quantity, "Rechargable item created.", player.getName(), -1);
                return;
            }
            MapleInventoryManipulator.addById(c, Integer.parseInt(splitted[1]), quantity, player.getName() + "used !item with quantity " + quantity, player.getName(), -1);
         } else if (splitted[0].equals("!刷")) {
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            short quantity = (short) getOptionalIntArg(splitted, 2, 1);
            if (Integer.parseInt(splitted[1]) >= 5000000 && Integer.parseInt(splitted[1]) <= 5000100) {
                if (quantity > 1) {
                    quantity = 1;
                }
                int petId = MaplePet.createPet(Integer.parseInt(splitted[1]));
                return;
            } else if (ii.isRechargable(Integer.parseInt(splitted[1]))) {
                quantity = ii.getSlotMax(c, Integer.parseInt(splitted[1]));
                return;
            }
            MapleInventoryManipulator.addById(c, Integer.parseInt(splitted[1]), quantity, player.getName() + "used !nonameitem with quantity " + quantity);
         } else if (splitted[0].equals("!丢装备")) {
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            int itemId = Integer.parseInt(splitted[1]);
            short quantity = (short) getOptionalIntArg(splitted, 2, 1);
            IItem toDrop;
            if (ii.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                toDrop = ii.randomizeStats((Equip) ii.getEquipById(itemId));
            } else {
                toDrop = new Item(itemId, (byte) 0, quantity);
            }
            toDrop.log("Created by " + player.getName() + " using !drop. Quantity: " + quantity, false);
            toDrop.setOwner(player.getName());
            player.getMap().spawnItemDrop(player, player, toDrop, player.getPosition(), true, true);
        } else if (splitted[0].equals("!丢")) {
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            int itemId = Integer.parseInt(splitted[1]);
            short quantity = (short) getOptionalIntArg(splitted, 2, 1);
            IItem toDrop;
            if (ii.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                toDrop = ii.randomizeStats((Equip) ii.getEquipById(itemId));
            } else {
                toDrop = new Item(itemId, (byte) 0, quantity);
            }
            player.getMap().spawnItemDrop(player, player, toDrop, player.getPosition(), true, true);
       } else if ((splitted[0].equals("!警告")) || (splitted[0].equals("!警告s"))) {
          String playerid = splitted[1];
          if ((splitted.length < 2) || (splitted.length > 2))
            throw new IllegalCommandSyntaxException(2);

          MapleCharacter target = null;
          Collection cservs = ChannelServer.getAllInstances();
          for (Iterator i$ = cservs.iterator(); i$.hasNext(); ) { ChannelServer cserver = (ChannelServer)i$.next();
            if (splitted[0].equals("!警告"))
              target = cserver.getPlayerStorage().getCharacterById(Integer.parseInt(playerid));
            else
              target = cserver.getPlayerStorage().getCharacterByName(splitted[1]);

            if (target != null)
              target.gainWarning(true, 1);
          }
        } else if (splitted[0].equals("!坐标")) {
            mc.dropMessage("你所在的坐标为： " + c.getPlayer().getPosition().x + " X轴、" + c.getPlayer().getPosition().y + " Y轴.");
        } else if (splitted[0].equals("!清空")) {
            if (splitted.length < 2) {
                mc.dropMessage("如果你想全部清空的话,请使用：!清空 全部");
            } else {
                String type = splitted[1];
                boolean pass = false;
                if (type.equals("equip") || type.equals("全部")) {
                    if (!pass) {
                        pass = true;
                    }
                    for (int i = 0; i < 101; i++) {
                        IItem tempItem = c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte) i);
                        if (tempItem == null) {
                            continue;
                        }
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.EQUIP, (byte) i, tempItem.getQuantity(), false, true);
                    }
                }
                if (type.equals("use") || type.equals("全部")) {
                    if (!pass) {
                        pass = true;
                    }
                    for (int i = 0; i < 101; i++) {
                        IItem tempItem = c.getPlayer().getInventory(MapleInventoryType.USE).getItem((byte) i);
                        if (tempItem == null) {
                            continue;
                        }
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, (byte) i, tempItem.getQuantity(), false, true);
                    }
                }
                if (type.equals("etc") || type.equals("全部")) {
                    if (!pass) {
                        pass = true;
                    }
                    for (int i = 0; i < 101; i++) {
                        IItem tempItem = c.getPlayer().getInventory(MapleInventoryType.ETC).getItem((byte) i);
                        if (tempItem == null) {
                            continue;
                        }
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.ETC, (byte) i, tempItem.getQuantity(), false, true);
                    }
                }
                if (type.equals("setup") || type.equals("全部")) {
                    if (!pass) {
                        pass = true;
                    }
                    for (int i = 0; i < 101; i++) {
                        IItem tempItem = c.getPlayer().getInventory(MapleInventoryType.SETUP).getItem((byte) i);
                        if (tempItem == null) {
                            continue;
                        }
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.SETUP, (byte) i, tempItem.getQuantity(), false, true);
                    }
                }
                if (type.equals("cash") || type.equals("全部")) {
                    if (!pass) {
                        pass = true;
                    }
                    for (int i = 0; i < 101; i++) {
                        IItem tempItem = c.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte) i);
                        if (tempItem == null || tempItem.getUniqueId() != 0) {
                            continue;
                        }
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.CASH, (byte) i, tempItem.getQuantity(), false, true);
                    }
                }
                if (!pass) {
                    mc.dropMessage("!清空 " + type + " 不存在");
                } else {
                    mc.dropMessage("成功清理.");
                }
            }
        } else if (splitted[0].equals("!无敌")) {
            player.setGodmode(!player.hasGodmode());
            mc.dropMessage("你现在为 " + (player.hasGodmode() ? "" : "非 ") + "无敌模式.");
 } else if (splitted[0].equals("!满血满魔")) {
            player.setHp(player.getMaxHp());
            player.updateSingleStat(MapleStat.HP, player.getMaxHp());
            player.setMp(player.getMaxMp());
            player.updateSingleStat(MapleStat.MP, player.getMaxMp());
 } else if (splitted[0].equalsIgnoreCase("!全部复活")) {
            for (MapleCharacter map : player.getMap().getCharacters()) {
                if (map != null) {
                    map.setHp(map.getCurrentMaxHp());
                    map.updateSingleStat(MapleStat.HP, map.getHp());
                    map.setMp(map.getCurrentMaxMp());
                    map.updateSingleStat(MapleStat.MP, map.getMp());
                }
            }
        } else if (splitted[0].equals("!清怪") || splitted[0].equals("!怪物信息")) {
            String mapMessage = "";
            MapleMap map = c.getPlayer().getMap();
            double range = Double.POSITIVE_INFINITY;
            List<MapleMapObject> monsters = map.getMapObjectsInRange(c.getPlayer().getPosition(), range, Arrays.asList(MapleMapObjectType.MONSTER));
            boolean kill = splitted[0].equals("!清怪");
            for (MapleMapObject monstermo : monsters) {
                MapleMonster monster = (MapleMonster) monstermo;
                if (kill) {
                    map.killMonster(monster, c.getPlayer(), true);
                } else {
                    mc.dropMessage("Monster " + monster.toString());
                }
            }
            if (kill) {
                mc.dropMessage("杀死了 " + monsters.size() + " 个怪物" + mapMessage + ".");
            }
        } else if (splitted[0].equals("!清怪1")) {
            MapleMap map = c.getPlayer().getMap();
            map.killAllMonsters();
        } else if (splitted[0].equalsIgnoreCase("!给点卷")) {
            MapleCharacter victim3 = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            if (victim3 != null) {
                int amount;
                try {
                    amount = Integer.parseInt(splitted[2]);
                } catch (NumberFormatException fuckme) {
                    return;
                }
                int type = getOptionalIntArg(splitted, 3, 1);
                victim3.modifyCSPoints(type, amount);
                victim3.dropMessage(5, player.getName() + " 已经给你 " + amount + " 商城点卷.");
                mc.dropMessage("成功.");
            } else {
                mc.dropMessage("玩家未找到.");
            }
         } else if (splitted[0].equalsIgnoreCase("!取消隐身")) {
            MapleCharacter victim5 = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            if (victim5 != null) {
                victim5.dispelSkill(9101004);
                mc.dropMessage("成功.");
            } else {
                mc.dropMessage("玩家未找到.");
            }
       } else if (splitted[0].equalsIgnoreCase("!取消buff")) {
            MapleCharacter victim5 = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            if (victim5 != null) {
                victim5.cancelAllBuffs();
                mc.dropMessage("成功");
            } else {
                mc.dropMessage("玩家未找到.");
            }
        } else if (splitted[0].equalsIgnoreCase("!踢人")) {
            MapleCharacter victim1 = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            victim1.getClient().disconnect();
            victim1.getClient().getSession().close();      
    } else if (splitted[0].equalsIgnoreCase("!读取玩家")) {
            StringBuilder builder = new StringBuilder();
            MapleCharacter victim1 = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            if (victim1 == null) {
                return;
            }
            builder.append(MapleClient.getLogMessage(victim1, "")); // Could use null i think ?
            mc.dropMessage(builder.toString());

            builder = new StringBuilder();
            builder.append("坐标: X: ");
            builder.append(victim1.getPosition().x);
            builder.append(" Y: ");
            builder.append(victim1.getPosition().y);
            builder.append(" | RX0: ");
            builder.append(victim1.getPosition().x + 50);
            builder.append(" | RX1: ");
            builder.append(victim1.getPosition().x - 50);
            builder.append(" | FH: ");
            builder.append(victim1.getMap().getFootholds().findBelow(player.getPosition()).getId());
            mc.dropMessage(builder.toString());
            builder = new StringBuilder();
            builder.append("HP: ");
            builder.append(victim1.getHp());
            builder.append("/");
            builder.append(victim1.getCurrentMaxHp());
            builder.append(" | MP: ");
            builder.append(victim1.getMp());
            builder.append("/");
            builder.append(victim1.getCurrentMaxMp());
            builder.append(" | EXP: ");
            builder.append(victim1.getExp());
            builder.append(" | 在一个组队里: ");
            builder.append(victim1.getParty() != null);
            builder.append(" | 在一个商城里: ");
            builder.append(victim1.getTrade() != null);
            mc.dropMessage(builder.toString());
            builder = new StringBuilder();
            builder.append("远程地址: ");
            builder.append(victim1.getClient().getSession().getRemoteAddress());
            mc.dropMessage(builder.toString());
            victim1.getClient().dropDebugMessage(mc);
     } else if (splitted[0].equals("!快速刷装备")) {
             mc.dropMessage("============管理员刷装备或道具的命令=============");
             mc.dropMessage("!刷GM装备 ---------------- 刷一套GM装备");
             mc.dropMessage("!刷BOSS装备 -------------- 刷一套BOSS装备");
             mc.dropMessage("!刷骑宠 ------------------ 刷骑宠:皮鞍子、野猪、银猪、赤羚龙");
             mc.dropMessage("!刷道具 ------------------ 刷道具:魔法石100、召回石100、火眼20、D片20");
             mc.dropMessage("!刷药水 ------------------ 刷药水:超级药水200、万能药水50");
             mc.dropMessage("!刷变身卡 ---------------- 刷5种变身卡各5个");
             mc.dropMessage("!刷喇叭 ------------------ 刷3种喇叭各10个");
             mc.dropMessage("!刷GM卷 ------------------ 刷全部100%GM卷各1张");
             mc.dropMessage("!刷耳环 ------------------ 刷耳环");
             mc.dropMessage("!刷盾牌 ------------------ 刷盾牌");
             mc.dropMessage("!刷玩具 ------------------ 刷玩具武器");
             mc.dropMessage("!刷椅子 ------------------ 刷椅子");
             mc.dropMessage("!刷战士武器 -------------- 刷全部高级战士武器");
             mc.dropMessage("!刷弓箭武器 -------------- 刷全部高级弓箭武器");
             mc.dropMessage("!刷法师武器 -------------- 刷全部高级法师武器");
             mc.dropMessage("!刷飞侠武器 -------------- 刷全部高级飞侠武器");
             mc.dropMessage("!刷祝福 ------------------ 刷祝福");
            }else if  (splitted[0].equals("!刷GM装备")) {
            MapleInventoryManipulator.addById(c, 1002140, (short) 1, c.getPlayer().getName() + ".");//hat 维泽特帽
            MapleInventoryManipulator.addById(c, 1322013, (short) 1, c.getPlayer().getName() + ".");//weapon 维泽特提包
            MapleInventoryManipulator.addById(c, 1042003, (short) 1, c.getPlayer().getName() + ".");//shirt 维泽特西装
            MapleInventoryManipulator.addById(c, 1062007, (short) 1, c.getPlayer().getName() + ".");//pants 维泽特西裤
            MapleInventoryManipulator.addById(c, 1082230, (short) 1, c.getPlayer().getName() + ".");//白色发光手套

            } else if  (splitted[0].equals("!刷BOSS装备")) {
            MapleInventoryManipulator.addById(c, 1122000, (short) 1, c.getPlayer().getName() + ".");//黑龙项链
            MapleInventoryManipulator.addById(c, 2041200, (short) 3, c.getPlayer().getName() + ".");//暗黑龙王石(给黑龙项链升级)
            MapleInventoryManipulator.addById(c, 1002357, (short) 1, c.getPlayer().getName() + ".");//扎昆头盔1
            MapleInventoryManipulator.addById(c, 1002430, (short) 1, c.getPlayer().getName() + ".");//扎昆头盔3

            } else if  (splitted[0].equals("!刷骑宠")) {
            MapleInventoryManipulator.addById(c, 1912000, (short) 1, c.getPlayer().getName() + ".");//皮鞍子(!skill 1004 0 骑宠技能)
            MapleInventoryManipulator.addById(c, 1902000, (short) 1, c.getPlayer().getName() + ".");//野猪
            MapleInventoryManipulator.addById(c, 1902001, (short) 1, c.getPlayer().getName() + ".");//银猪
            MapleInventoryManipulator.addById(c, 1902002, (short) 1, c.getPlayer().getName() + ".");//赤羚龙(尾数0-2是3种坐骑)

            } else if  (splitted[0].equals("!刷道具")) {
            MapleInventoryManipulator.addById(c, 4006000, (short) 100, c.getPlayer().getName() + ".");//魔法石
            MapleInventoryManipulator.addById(c, 4006001, (short) 100, c.getPlayer().getName() + ".");//召回石
            MapleInventoryManipulator.addById(c, 4001017, (short) 20, c.getPlayer().getName() + ".");//火眼(召唤扎坤)
            MapleInventoryManipulator.addById(c, 4031179, (short) 20, c.getPlayer().getName() + ".");//D片(召唤闹钟)

            } else if  (splitted[0].equals("!刷药水")) {
            MapleInventoryManipulator.addById(c, 2000005, (short) 200, c.getPlayer().getName() + " got Wizet pants by using !addyaoshui");//超级药水(血蓝全满)
            MapleInventoryManipulator.addById(c, 2050004, (short) 50, c.getPlayer().getName() + " got Wizet pants by using !addyaoshui");//万能药水(恢复异常状态)

            } else if  (splitted[0].equals("!刷变身卡")) {
            MapleInventoryManipulator.addById(c, 5300000, (short) 5, c.getPlayer().getName() + ".");//蘑菇的雕像
            MapleInventoryManipulator.addById(c, 5300001, (short) 5, c.getPlayer().getName() + ".");//漂漂猪的雕像
            MapleInventoryManipulator.addById(c, 5300002, (short) 5, c.getPlayer().getName() + ".");//白外星人的雕像
            MapleInventoryManipulator.addById(c, 5300003, (short) 5, c.getPlayer().getName() + ".");//龙族变身秘药
            MapleInventoryManipulator.addById(c, 5300005, (short) 5, c.getPlayer().getName() + ".");//提干变身药

            } else if  (splitted[0].equals("!刷喇叭")) {
            MapleInventoryManipulator.addById(c, 5390000, (short) 10, c.getPlayer().getName() + ".");//炽热情景喇叭
            MapleInventoryManipulator.addById(c, 5390001, (short) 10, c.getPlayer().getName() + ".");//绚烂情景喇叭
            MapleInventoryManipulator.addById(c, 5390002, (short) 10, c.getPlayer().getName() + ".");//爱心情景喇叭

            } else if  (splitted[0].equals("!刷耳环")) {
            MapleInventoryManipulator.addById(c, 1032042, (short) 1, c.getPlayer().getName() + ".");//冒险岛耳环
            MapleInventoryManipulator.addById(c, 1032030, (short) 1, c.getPlayer().getName() + ".");//勇气耳环
            MapleInventoryManipulator.addById(c, 1032031, (short) 1, c.getPlayer().getName() + ".");//坚毅耳环
            MapleInventoryManipulator.addById(c, 1032053, (short) 1, c.getPlayer().getName() + ".");//四叶草耳环
            MapleInventoryManipulator.addById(c, 1032038, (short) 1, c.getPlayer().getName() + ".");//雪花耳钉
            MapleInventoryManipulator.addById(c, 1032029, (short) 1, c.getPlayer().getName() + ".");//925银耳环

            } else if  (splitted[0].equals("!刷盾牌")) {
            MapleInventoryManipulator.addById(c, 1092049, (short) 1, c.getPlayer().getName() + ".");//热情剑盾
            MapleInventoryManipulator.addById(c, 1092050, (short) 1, c.getPlayer().getName() + ".");//冷艳剑盾
            MapleInventoryManipulator.addById(c, 1092047, (short) 1, c.getPlayer().getName() + ".");//冒险岛飞侠盾牌
            MapleInventoryManipulator.addById(c, 1092018, (short) 1, c.getPlayer().getName() + ".");//飞侠盾牌(后2位尾数18-20都是)
            MapleInventoryManipulator.addById(c, 1092036, (short) 1, c.getPlayer().getName() + ".");//绿色臂盾
            MapleInventoryManipulator.addById(c, 1092037, (short) 1, c.getPlayer().getName() + ".");//紫色臂盾
            MapleInventoryManipulator.addById(c, 1092038, (short) 1, c.getPlayer().getName() + ".");//蓝色臂盾
            MapleInventoryManipulator.addById(c, 1092033, (short) 1, c.getPlayer().getName() + ".");//四叶草盾牌
            MapleInventoryManipulator.addById(c, 1092044, (short) 1, c.getPlayer().getName() + ".");//爱心盾牌
            MapleInventoryManipulator.addById(c, 1092031, (short) 1, c.getPlayer().getName() + ".");//七星瓢虫盾牌

            } else if  (splitted[0].equals("!刷玩具")) {
            MapleInventoryManipulator.addById(c, 1302063, (short) 1, c.getPlayer().getName() + ".");//燃烧的火焰刀
            MapleInventoryManipulator.addById(c, 1402044, (short) 1, c.getPlayer().getName() + ".");//南瓜灯笼
            MapleInventoryManipulator.addById(c, 1422036, (short) 1, c.getPlayer().getName() + ".");//玩具匠人的锤子(有特效)
            MapleInventoryManipulator.addById(c, 1382016, (short) 1, c.getPlayer().getName() + ".");//香菇
            MapleInventoryManipulator.addById(c, 1442018, (short) 1, c.getPlayer().getName() + ".");//冻冻鱼
            MapleInventoryManipulator.addById(c, 1432039, (short) 1, c.getPlayer().getName() + ".");//钓鱼竿
            MapleInventoryManipulator.addById(c, 1442023, (short) 1, c.getPlayer().getName() + ".");//黑拖把
            MapleInventoryManipulator.addById(c, 1302013, (short) 1, c.getPlayer().getName() + ".");//红鞭子
            MapleInventoryManipulator.addById(c, 1432009, (short) 1, c.getPlayer().getName() + ".");//木精灵枪
            MapleInventoryManipulator.addById(c, 1302058, (short) 1, c.getPlayer().getName() + ".");//冒险岛伞
            MapleInventoryManipulator.addById(c, 1302066, (short) 1, c.getPlayer().getName() + ".");//枫叶庆典旗
            MapleInventoryManipulator.addById(c, 1302049, (short) 1, c.getPlayer().getName() + ".");//光线鞭子
            MapleInventoryManipulator.addById(c, 1322051, (short) 1, c.getPlayer().getName() + ".");//七夕
            MapleInventoryManipulator.addById(c, 1372017, (short) 1, c.getPlayer().getName() + ".");//领路灯
            MapleInventoryManipulator.addById(c, 1322026, (short) 1, c.getPlayer().getName() + ".");//彩虹游泳圈
            MapleInventoryManipulator.addById(c, 1332020, (short) 1, c.getPlayer().getName() + ".");//太极扇
            MapleInventoryManipulator.addById(c, 1332053, (short) 1, c.getPlayer().getName() + ".");//野外烧烤串
            MapleInventoryManipulator.addById(c, 1332054, (short) 1, c.getPlayer().getName() + ".");//闪电飞刀
            MapleInventoryManipulator.addById(c, 1402017, (short) 1, c.getPlayer().getName() + ".");//船长佩剑
            MapleInventoryManipulator.addById(c, 1402029, (short) 1, c.getPlayer().getName() + ".");//鬼刺狼牙棒
            MapleInventoryManipulator.addById(c, 1302080, (short) 1, c.getPlayer().getName() + ".");//闪光彩灯鞭
            MapleInventoryManipulator.addById(c, 1442046, (short) 1, c.getPlayer().getName() + ".");//超级雪板
            MapleInventoryManipulator.addById(c, 1442061, (short) 1, c.getPlayer().getName() + ".");//仙人掌之矛
            MapleInventoryManipulator.addById(c, 1432046, (short) 1, c.getPlayer().getName() + ".");//圣诞枪
            MapleInventoryManipulator.addById(c, 1442047, (short) 1, c.getPlayer().getName() + ".");//玫瑰(47-50)

            } else if  (splitted[0].equals("!刷战士装备")) {
            MapleInventoryManipulator.addById(c, 1302056, (short) 1, c.getPlayer().getName() + ".");//一刀两段(单手剑)
            MapleInventoryManipulator.addById(c, 1402037, (short) 1, c.getPlayer().getName() + ".");//龙背刃
            MapleInventoryManipulator.addById(c, 1402005, (short) 1, c.getPlayer().getName() + ".");//斩魔刀
            MapleInventoryManipulator.addById(c, 1402035, (short) 1, c.getPlayer().getName() + ".");//斩天刀
            MapleInventoryManipulator.addById(c, 1312015, (short) 1, c.getPlayer().getName() + ".");//战魂之斧
            MapleInventoryManipulator.addById(c, 1312031, (short) 1, c.getPlayer().getName() + ".");//狂龙怒斩斧
            MapleInventoryManipulator.addById(c, 1412010, (short) 1, c.getPlayer().getName() + ".");//项羽之斧
            MapleInventoryManipulator.addById(c, 1322052, (short) 1, c.getPlayer().getName() + ".");//狂龙地锤
            MapleInventoryManipulator.addById(c, 1432011, (short) 1, c.getPlayer().getName() + ".");//寒冰破魔枪
            MapleInventoryManipulator.addById(c, 1432030, (short) 1, c.getPlayer().getName() + ".");//红莲落神枪
            MapleInventoryManipulator.addById(c, 1432038, (short) 1, c.getPlayer().getName() + ".");//盘龙七冲枪
            MapleInventoryManipulator.addById(c, 1442045, (short) 1, c.getPlayer().getName() + ".");//血龙神斧

            } else if  (splitted[0].equals("!刷弓箭武器")) {
            MapleInventoryManipulator.addById(c, 1452044, (short) 1, c.getPlayer().getName() + ".");//金龙震翅弓
            MapleInventoryManipulator.addById(c, 1462039, (short) 1, c.getPlayer().getName() + ".");//黄金飞龙弩
            MapleInventoryManipulator.addById(c, 1452019, (short) 1, c.getPlayer().getName() + ".");//天鹰弓白
            MapleInventoryManipulator.addById(c, 1462015, (short) 1, c.getPlayer().getName() + ".");//光圣鹞弩白
            MapleInventoryManipulator.addById(c, 1452056, (short) 1, c.getPlayer().getName() + ".");//鸟弓
            MapleInventoryManipulator.addById(c, 1462049, (short) 1, c.getPlayer().getName() + ".");//鸟弩

            } else if  (splitted[0].equals("!刷法师武器")) {
            MapleInventoryManipulator.addById(c, 1372031, (short) 1, c.getPlayer().getName() + ".");//圣贤短杖
            MapleInventoryManipulator.addById(c, 1382037, (short) 1, c.getPlayer().getName() + ".");//偃月之杖
            MapleInventoryManipulator.addById(c, 1382035, (short) 1, c.getPlayer().getName() + ".");//冰肌玲珑杖
            MapleInventoryManipulator.addById(c, 1382036, (short) 1, c.getPlayer().getName() + ".");//黑精灵王杖

            } else if (splitted[0].equals("!刷飞侠武器")) {
            MapleInventoryManipulator.addById(c, 1332050, (short) 1, c.getPlayer().getName() + ".");//半月龙鳞裂
            MapleInventoryManipulator.addById(c, 1472051, (short) 1, c.getPlayer().getName() + ".");//寒木升龙拳
            MapleInventoryManipulator.addById(c, 2070016, (short) 4000, c.getPlayer().getName() + ".");//水晶齿轮5组 //(2070006 齿轮镖，2070007 月牙镖)
            MapleInventoryManipulator.addById(c, 1472067, (short) 1, c.getPlayer().getName() + ".");//鸟拳

            } else if (splitted[0].equals("!刷GM卷")) {
            MapleInventoryManipulator.addById(c, 2340000, (short) 1, c.getPlayer().getName() + ".");//祝福卷轴
            MapleInventoryManipulator.addById(c, 2043303, (short) 1, c.getPlayer().getName() + ".");//短剑攻击诅咒卷轴
            MapleInventoryManipulator.addById(c, 2040303, (short) 1, c.getPlayer().getName() + ".");//耳环智力诅咒卷轴
            MapleInventoryManipulator.addById(c, 2040506, (short) 1, c.getPlayer().getName() + ".");//全身铠甲敏捷诅咒卷轴
            MapleInventoryManipulator.addById(c, 2040710, (short) 1, c.getPlayer().getName() + ".");//鞋子跳跃诅咒卷轴
            MapleInventoryManipulator.addById(c, 2040807, (short) 1, c.getPlayer().getName() + ".");//手套攻击诅咒卷轴
            MapleInventoryManipulator.addById(c, 2043003, (short) 1, c.getPlayer().getName() + ".");//单手剑攻击诅咒卷轴
            MapleInventoryManipulator.addById(c, 2043103, (short) 1, c.getPlayer().getName() + ".");//单手斧攻击诅咒卷轴
            MapleInventoryManipulator.addById(c, 2043203, (short) 1, c.getPlayer().getName() + ".");//单手钝器攻击诅咒卷轴
            MapleInventoryManipulator.addById(c, 2043703, (short) 1, c.getPlayer().getName() + ".");//短杖魔力诅咒卷轴
            MapleInventoryManipulator.addById(c, 2043803, (short) 1, c.getPlayer().getName() + ".");//长杖魔力诅咒卷轴
            MapleInventoryManipulator.addById(c, 2044003, (short) 1, c.getPlayer().getName() + ".");//双手剑攻击诅咒卷轴
            MapleInventoryManipulator.addById(c, 2044103, (short) 1, c.getPlayer().getName() + ".");//双手斧攻击诅咒卷轴
            MapleInventoryManipulator.addById(c, 2044303, (short) 1, c.getPlayer().getName() + ".");//枪攻击诅咒卷轴
            MapleInventoryManipulator.addById(c, 2044403, (short) 1, c.getPlayer().getName() + ".");//矛攻击诅咒卷轴
            MapleInventoryManipulator.addById(c, 2044503, (short) 1, c.getPlayer().getName() + ".");//弓攻击诅咒卷轴
            MapleInventoryManipulator.addById(c, 2044603, (short) 1, c.getPlayer().getName() + ".");//弩攻击诅咒卷轴
            MapleInventoryManipulator.addById(c, 2044703, (short) 1, c.getPlayer().getName() + ".");//拳套攻击诅咒卷轴

            } else if (splitted[0].equals("!刷椅子")) {
            MapleInventoryManipulator.addById(c, 3010000, (short) 1, c.getPlayer().getName() + ".");//休闲椅
            MapleInventoryManipulator.addById(c, 3010001, (short) 1, c.getPlayer().getName() + ".");//蓝色木椅
            MapleInventoryManipulator.addById(c, 3010003, (short) 1, c.getPlayer().getName() + ".");//红色时尚转椅
            MapleInventoryManipulator.addById(c, 3010007, (short) 1, c.getPlayer().getName() + ".");//粉色海狗靠垫
            MapleInventoryManipulator.addById(c, 3010008, (short) 1, c.getPlayer().getName() + ".");//藍色海狗靠垫
            MapleInventoryManipulator.addById(c, 3010010, (short) 1, c.getPlayer().getName() + ".");//白色海狗靠垫
            MapleInventoryManipulator.addById(c, 3010012, (short) 1, c.getPlayer().getName() + ".");//蓝色高靠背椅
            MapleInventoryManipulator.addById(c, 3010014, (short) 1, c.getPlayer().getName() + ".");//月亮弯弯
            MapleInventoryManipulator.addById(c, 3011000, (short) 1, c.getPlayer().getName() + ".");//钓鱼椅
            MapleInventoryManipulator.addById(c, 3010009, (short) 1, c.getPlayer().getName() + ".");//粉色爱心马桶

            } else if (splitted[0].equalsIgnoreCase("!打开商店")) {
            if (splitted.length != 2) {
                return;
            }
            int shopid;
            try {
                shopid = Integer.parseInt(splitted[1]);
            } catch (NumberFormatException asd) {
                return;
            }
            MapleShopFactory.getInstance().getShop(shopid).sendShop(c);
        } else if (splitted[0].equalsIgnoreCase("!打开npc")) {
            if (splitted.length != 2) {
                return;
            }
            int npcid;
            try {
                npcid = Integer.parseInt(splitted[1]);
            } catch (NumberFormatException asd) {
                return;
            }
            MapleNPC npc = MapleLifeFactory.getNPC(npcid);
            if (npc != null && !npc.getName().equalsIgnoreCase("MISSINGNO")) {
                NPCScriptManager.getInstance().start(c, npcid);
            } else {
                mc.dropMessage("NPC未找到.");
            }
     } else if (splitted[0].equalsIgnoreCase("!计时器")) {
            player.getMap().broadcastMessage(MaplePacketCreator.getClock(getOptionalIntArg(splitted, 1, 60)));
     } else if (splitted[0].equalsIgnoreCase("!杀")) {
            MapleCharacter victim1 = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            if (victim1 != null) {
                victim1.setHp(0);
                victim1.setMp(0);
                victim1.updateSingleStat(MapleStat.HP, 0);
                victim1.updateSingleStat(MapleStat.MP, 0);
            } else {
                mc.dropMessage("玩家未找到!");
            }       
           } else if (splitted[0].equalsIgnoreCase("!换职业")) {
            MapleCharacter victim1 = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            int job;
            try {
                job = Integer.parseInt(splitted[2]);
            } catch (NumberFormatException blackness) {
                return;
            }
            if (victim1 != null) {
                victim1.setJob(job);
            } else {
                mc.dropMessage("玩家未找到!");
            }         
        } else if (splitted[0].equalsIgnoreCase("!换说话背景")) {
            MapleCharacter victim1 = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            if (victim1 != null) {
                String text = StringUtil.joinStringFrom(splitted, 2);
                victim1.getMap().broadcastMessage(MaplePacketCreator.getChatText(victim1.getId(), text, false, 0));
            } else {
                mc.dropMessage("玩家未找到.");
            }
           
        } else if (splitted[0].equalsIgnoreCase("!管理员帮助")) {
                mc.dropMessage("==============管理员指令帮助===============");
                mc.dropMessage("!个人指令 --------------------- 管理员个人指令");
                mc.dropMessage("!管理指令 --------------------- 管理类指令");
                mc.dropMessage("!设置指令 --------------------- 服务器指令");
                mc.dropMessage("!活动指令 --------------------- 活动类指令");
                mc.dropMessage("!见习指令 --------------------- 见习管理员指令");
                mc.dropMessage("==========================================");
  } else if (splitted[0].equalsIgnoreCase("!个人指令")) {
                mc.dropMessage("==============这里是管理员个人指令列表=================");
                mc.dropMessage("!装备 <装备代码> ---------------------- [刷装备到背包上]");
                mc.dropMessage("!刷 <物品代码> <数量> ----------------- [刷物品到背包上]");
                mc.dropMessage("!丢装备 <装备代码> -------------------- [丢装备到地上]");
                mc.dropMessage("!丢 <物品代码> <数量> ----------------- [丢物品到地上]");
                mc.dropMessage("!最大属性 ----------------------------- [属性最大化]");
                mc.dropMessage("!最小属性 ----------------------------- [属性初始化]");
                mc.dropMessage("!最大血量 <数值> ---------------------- [设置最大HP]");
                mc.dropMessage("!最大魔量 <数值> ---------------------- [设置最大MP]");
                mc.dropMessage("!设置血量 <数值> ---------------------- [设置血量]");
                mc.dropMessage("!设置魔量 <数值> ---------------------- [设置魔量]");
                mc.dropMessage("!快速刷装备 --------------------------- [快速刷装备命令]");
                mc.dropMessage("!力量 <数值>  ------------------------- [设置自己的力量值]");
                mc.dropMessage("!敏捷 <数值>  ------------------------- [设置自己的敏捷值]");
                mc.dropMessage("!智力 <数值>  ------------------------- [设置自己的智力值]");
                mc.dropMessage("!运气 <数值>  ------------------------- [设置自己的运气值]");
                mc.dropMessage("!技能点 <数值>   ---------------------- [设置自己的技能点]");
                mc.dropMessage("!能力点 <数值>   ---------------------- [设置自己的能力点]");
                mc.dropMessage("!转职 <职业代码> ---------------------- [转变职业,管理员代码：900]");
                mc.dropMessage("!刷钱 <数值> -------------------------- [增加自己的金币]");
                mc.dropMessage("!等级 <等级> -------------------------- [设置自己的等级]");
                mc.dropMessage("!地图代码  ---------------------------- [查看自己的地图ID]");
                mc.dropMessage("!坐标  -------------------------------- [查看自己的坐标]");
                mc.dropMessage("!清空 <equip|use|etc|setup|cash|全部> - [清空背包,如清空全部:!清空 全部]");
                mc.dropMessage("!无敌 --------------------------------- [无敌模式,再按一次关闭]");
                mc.dropMessage("!满血满魔 ----------------------------- [满血满魔,信春哥原地复活]");
    } else if (splitted[0].equalsIgnoreCase("!管理指令")) {
                mc.dropMessage("==============这里是管理员管理指令列表=================");
                mc.dropMessage("!打开商店 <代码> --------------------- [打开指定商店]");
                mc.dropMessage("!打开npc <代码> ---------------------- [打开指定NPC]");
                mc.dropMessage("!临时npc <代码> ---------------------- [安放一个临时NPC，服务器重启消失.]");
                mc.dropMessage("!永久npc <代码> ---------------------- [安放一个永久NPC，服务器重启不消失.]");
                mc.dropMessage("!公告 <p|l|nv|v|b> <要说的内容> ------ [公告命令,<>内为可选参数,自己试下效果]");
                mc.dropMessage("!公告1 <要说的内容> ------------------ [以自己的名字作为公告]");
                mc.dropMessage("!公告2 <要说的内容> ------------------ [全服GM说话]");
                mc.dropMessage("!顶部公告 <要说的内容> --------------- [设置顶部黄色滚动内容]");
                mc.dropMessage("===================================================");
                mc.dropMessage("!计时器 <数值> ----------------------- [在当前地图添加一个计时器]");
                mc.dropMessage("!传送到 <玩家名字> ------------------- [将自己传送到指定名字的玩家身边]");
                mc.dropMessage("!传送到id	<玩家ID> ------------------ [将自己传送到指定ID的玩家身边]");
                mc.dropMessage("!拉全部 ------------------------------ [将全服人拉到身边]");
                mc.dropMessage("!拉全部到 <地图ID> ------------------- [将当前地图所有玩家传送到指定地图ID的地图]");
                mc.dropMessage("!拉 <玩家名字> ----------------------- [将指定名字的玩家传送到自己身边]");
                mc.dropMessage("!传送 <地图代码> <洞口> -------------- [传送地图,洞口可以不填写]");
                mc.dropMessage("===================================================");
                mc.dropMessage("!刷新地图 ---------------------------- [对所在地图进行刷新]");
                mc.dropMessage("!警告 <玩家ID> ----------------------- [给玩家一次警告,3次自动封号]");
                mc.dropMessage("!警告s <玩家名字> -------------------- [给玩家一次警告,3次自动封号]");
                mc.dropMessage("!封号 <玩家ID> <封号原因>-------------- [使用数字ID封号]");
                mc.dropMessage("!封号2 <角色名字> <封号原因>----------- [使用角色名字封号]");
                mc.dropMessage("!全掉 -------------------------------- [让全部玩家掉线]");
                mc.dropMessage("!全部过来 ---------------------------- [把全服务器的玩家拉过来]");
                mc.dropMessage("!解封 <人物名> ----------------------- [解封帐号]");
                mc.dropMessage("!在线玩家 ---------------------------- [查看在线玩家]");
                mc.dropMessage("!在线管理 ---------------------------- [查看在线管理员]");
                mc.dropMessage("!连接状态 ---------------------------- [查看服务器连接状态]");

} else if (splitted[0].equalsIgnoreCase("!设置指令")) {
                mc.dropMessage("==============这里是服务器设置列表=================");
                mc.dropMessage("!当前设置 ---------------------------- [查看当前游戏系统配置]");
                mc.dropMessage("!活动设置 ---------------------------- [活动使用，临时改变服务器经验.金钱配置]");
                mc.dropMessage("!重载家族 ---------------------------- [重新加载家族数据]");
                mc.dropMessage("!重载门 ------------------------------ [重新加载门的脚本]");
                mc.dropMessage("!重载反应 ---------------------------- [重新加载反应脚本]");
                mc.dropMessage("!重载副本 ---------------------------- [重新加载event脚本]");
} else if (splitted[0].equalsIgnoreCase("!活动指令")) {
                mc.dropMessage("==============这里是管理员活动指令列表=================");
                mc.dropMessage("!给当前地图 <item|meso|exp> <数值> --- [给当前地图所有玩家道具或金币或经验.如给当前地图所有玩空祝福卷 !givemap item 2340000 给游戏币100W用 !givemap meso 1000000]");
                mc.dropMessage("!全部复活 ---------------------------- [当前地图所有人满血满蓝，死亡状态可复活.]");
                mc.dropMessage("!给点卷 <玩家名字> <数量> ------------- [给玩家点卷]");
                mc.dropMessage("!设置人气 <玩家名字> <数量> ----------- [设置玩家的人气]");
                mc.dropMessage("!取消隐身 <玩家名字> ------------------ [取消指定玩家的隐身辅助技能]");
                mc.dropMessage("!取消buff <玩家名字> ------------------ [取消指定玩家的全部BUFF辅助技能]");
                mc.dropMessage("!踢人 <玩家名字> ---------------------- [把指定玩家踢下线]");
                mc.dropMessage("!读取玩家 <玩家名字> ------------------ [读取指定玩家信息]");
                mc.dropMessage("!杀 <玩家名字> ------------------------ [杀死指定玩家]");
                mc.dropMessage("!换职业 <玩家名字> <职业ID> ------- [给指定玩家换职业]");
                mc.dropMessage("!换说话背景 <玩家名字>  ------------------- [给指定玩家说话背景]");
                mc.dropMessage("===================================================");
                mc.dropMessage("!清怪 ---------------------------- [杀死所有该地图怪物]");
                mc.dropMessage("!清怪1 ----------------------- [杀死地图怪物，并且不掉落东西.]");
                mc.dropMessage("!怪物信息 ----------------------- [得到该地图怪物信息]");
                mc.dropMessage("!召唤 <怪物代码> <数量>-------------- [刷指定怪,数量不写时默认为1]");
                mc.dropMessage("!攻城活动 ---------------------------- [召唤BOSS,可做活动使用]");
                mc.dropMessage("!快速召唤boss --------------------------- [查看召唤BOSS简便命令]");
   } else if (splitted[0].equalsIgnoreCase("!快速召唤boss")) {
                mc.dropMessage("===================================================");
                mc.dropMessage("!闹钟 -------------------------- [刷闹钟]");
                mc.dropMessage("!蝙蝠怪 --------------------------- [刷蝙蝠怪]");
                mc.dropMessage("!蝙蝠魔 ----------------------------- [刷蝙蝠魔]");
                mc.dropMessage("!御姐 ------------------------- [刷御姐&老板&日本BOSS]");
                mc.dropMessage("!蘑菇王 ---------------------------- [刷蘑菇王]");
                mc.dropMessage("!僵尸蘑菇王 ---------------------- [僵尸蘑菇王]");
                mc.dropMessage("!蓝蘑菇王 ------------------------ [蓝蘑菇王]");
                mc.dropMessage("!鲨鱼 ------------------------------ [刷鲨鱼]");
                mc.dropMessage("!鱼王 ----------------------------- [刷鱼王 右]");
                mc.dropMessage("!扎昆 ------------------------------ [刷整只扎昆]");
                mc.dropMessage("!黑龙 --------------------------- [刷整只黑龙]");
      } else if (splitted[0].equalsIgnoreCase("!见习指令")) {
                mc.dropMessage("==================见习管理员指令=====================");
                mc.dropMessage("!刷新地图 ---------------------------- [对所在地图进行刷新]");
                mc.dropMessage("!警告 <玩家ID> ----------------------- [给玩家一次警告,3次自动封号]");
                mc.dropMessage("!警告s <玩家名字> -------------------- [给玩家一次警告,3次自动封号]");
                mc.dropMessage("!全部过来 ---------------------------- [把全服务器的玩家拉过来]");
                mc.dropMessage("!封号 <玩家ID> <封号原因>-------------- [使用数字ID封号]");
                mc.dropMessage("!封号2 <角色名字> <封号原因>----------- [使用角色名字封号]");
                mc.dropMessage("!在线玩家 ----------------------------- [查看在线玩家]");
                mc.dropMessage("!取消隐身 <玩家名字> ------------------- [取消指定玩家的隐身辅助技能]");
                mc.dropMessage("!取消buff <玩家名字> ------------------- [取消指定玩家的全部BUFF辅助技能]");
                mc.dropMessage("!公告 <p|l|nv|v|b> <要说的内容> ---- [公告命令,<>内为可选参数,自己试下效果]");
                mc.dropMessage("!转职 <职业代码> ---------------------- [转变职业,管理员代码：900]");
                mc.dropMessage("!无敌 ----------------------------- [无敌模式,再按一次关闭]");
                mc.dropMessage("!满血满魔 -------------------------------- [满血满魔,信春哥原地复活]");
     } else {
                    Iterator i$;
                    MapleCharacter player1;
                    if (splitted[0].equalsIgnoreCase("!给当前地图")) {
                      LinkedHashSet cmc = new LinkedHashSet(c.getPlayer().getMap().getCharacters());
                      String type = splitted[1];
                      if (type.equalsIgnoreCase("item")) {
                        int itemid = Integer.parseInt(splitted[2]);
                        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                        short quantity = (short)CommandProcessor.getOptionalIntArg(splitted, 3, 1);
                        boolean pet = (itemid >= 5000000) && (itemid <= 5000100);
                        for (i$ = cmc.iterator(); i$.hasNext(); ) { player1 = (MapleCharacter)i$.next();
                          if (pet) {
                            if (quantity > 1)
                              quantity = 1;

                            int petId = MaplePet.createPet(itemid);
                            MapleInventoryManipulator.addById(player1.getClient(), itemid, quantity, "from !givemap", c.getPlayer().getName(), petId);
                            return; }
                          if (ii.isRechargable(itemid)) {
                            quantity = ii.getSlotMax(c, itemid);
                            MapleInventoryManipulator.addById(player1.getClient(), itemid, quantity, "Rechargable item created.", c.getPlayer().getName(), -1);
                            return;
                          }
                          MapleInventoryManipulator.addById(player1.getClient(), itemid, quantity, player1.getName() + "got from !givemap with quantity " + quantity, c.getPlayer().getName(), -1); }
                      } else {
                        int amt;
                        MapleCharacter player2;
                        if (type.equalsIgnoreCase("meso")) {
                          amt = Integer.parseInt(splitted[2]);

                          for (i$ = cmc.iterator(); i$.hasNext(); ) { 
                              player2 = (MapleCharacter)i$.next();
                              player2.gainMeso(amt, true, true, true);
                          }
                        } else if (type.equalsIgnoreCase("exp")) {
                          amt = Integer.parseInt(splitted[2]);

                          for (i$ = cmc.iterator(); i$.hasNext(); ) {
                            player2 = (MapleCharacter)i$.next();
                            player2.gainExp(amt, true, true, false); }
                        }
                      }
     }
 } 
    }

    @Override
    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
                    new CommandDefinition("最大属性", "", "", 5),
                    new CommandDefinition("最小属性", "", "", 5),
                    new CommandDefinition("最大血量", "", "", 5),
                    new CommandDefinition("最大魔量", "", "", 5),
                    new CommandDefinition("设置血量", "", "", 5),
                    new CommandDefinition("设置魔量", "", "", 5),
                    new CommandDefinition("力量", "", "", 5),
                    new CommandDefinition("敏捷", "", "", 5),
                    new CommandDefinition("智力", "", "", 5),
                    new CommandDefinition("运气", "", "", 5),
                    new CommandDefinition("技能点", "", "", 5),
                    new CommandDefinition("能力点", "", "", 5),
                    new CommandDefinition("转职", "", "", 1),//巡查
                    new CommandDefinition("刷钱", "", "", 5),
                    new CommandDefinition("等级", "", "", 5),
                    new CommandDefinition("地图代码", "", "", 5),
                    new CommandDefinition("全掉", "", "", 5),
                    new CommandDefinition("刷新地图", "", "", 1),//巡查
                    new CommandDefinition("装备", "", "", 5),
                    new CommandDefinition("刷", "", "", 5),
                    new CommandDefinition("警告", "", "", 1),//巡查
                    new CommandDefinition("警告s", "", "", 1),//巡查
                    new CommandDefinition("丢装备", "", "", 5),
                    new CommandDefinition("丢", "", "", 5),
                    new CommandDefinition("position", "", "", 5),
                    new CommandDefinition("无敌", "", "", 1),//巡查
                    new CommandDefinition("满血满蓝", "", "", 1),//巡查
                    new CommandDefinition("全部复活", "", "", 5),
                    new CommandDefinition("给点卷", "", "", 5),
                    new CommandDefinition("取消隐身", "", "", 1),//巡查
                    new CommandDefinition("取消buff", "", "", 1),//巡查
                    new CommandDefinition("踢人", "", "", 5),
                    new CommandDefinition("读取玩家", "", "", 5),
                    new CommandDefinition("快速刷装备", "", "", 5),
                    new CommandDefinition("刷GM装备", "", "", 5),
                    new CommandDefinition("刷BOSS装备", "", "", 5),
                    new CommandDefinition("刷骑宠", "", "", 5),
                    new CommandDefinition("刷道具", "", "", 5),
                    new CommandDefinition("刷药水", "", "", 5),
                    new CommandDefinition("刷变身卡", "", "", 5),
                    new CommandDefinition("刷喇叭", "", "", 5),
                    new CommandDefinition("刷耳环", "", "", 5),
                    new CommandDefinition("刷盾牌", "", "", 5),
                    new CommandDefinition("刷玩具", "", "", 5),
                    new CommandDefinition("刷战士装备", "", "", 5),
                    new CommandDefinition("刷法师装备", "", "", 5),
                    new CommandDefinition("刷弓箭武器", "", "", 5),
                    new CommandDefinition("刷飞侠装备", "", "", 5),
                    new CommandDefinition("刷GM卷", "", "", 5),
                    new CommandDefinition("刷椅子", "", "", 5),
                    new CommandDefinition("打开商店", "", "", 5),
                    new CommandDefinition("打开npc", "", "", 5),
                    new CommandDefinition("计时器", "", "", 5),
                    new CommandDefinition("杀", "", "", 5),
                    new CommandDefinition("换职业", "", "", 5),
                    new CommandDefinition("换说话背景", "", "", 5),
                    new CommandDefinition("管理员帮助", "", "", 5),
                    new CommandDefinition("活动指令", "", "", 5),
                    new CommandDefinition("个人指令", "", "", 5),
                    new CommandDefinition("管理指令", "", "", 5),
                    new CommandDefinition("快速召唤boss", "", "", 5),
                    new CommandDefinition("设置指令", "", "", 5),
                    new CommandDefinition("见习指令", "", "", 1),
                    new CommandDefinition("给当前地图", "", "", 5),
                    new CommandDefinition("清怪", "", "", 5),
                    new CommandDefinition("清怪1", "", "", 5),
                    new CommandDefinition("怪物信息", "", "", 5)};
    }
}