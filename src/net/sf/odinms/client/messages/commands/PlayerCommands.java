
package net.sf.odinms.client.messages.commands;

import net.sf.odinms.client.messages.Command;
import net.sf.odinms.client.messages.CommandDefinition;
import net.sf.odinms.client.messages.IllegalCommandSyntaxException;
import net.sf.odinms.client.messages.MessageCallback;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleStat;
import net.sf.odinms.client.messages.ServernoticeMapleClientMessageCallback;
import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.scripting.npc.NPCScriptManager;
import net.sf.odinms.server.MaplePortal;
import net.sf.odinms.server.maps.MapleMap;
import net.sf.odinms.tools.MaplePacketCreator;

public class PlayerCommands implements Command {
	@Override
	public void execute(MapleClient c, MessageCallback mc, String[] splitted) throws Exception,
																					IllegalCommandSyntaxException {
	MapleCharacter player = c.getPlayer();
        ChannelServer cserv = c.getChannelServer();

          if (splitted[0].equals("@力量") || splitted[0].equals("@智力") || splitted[0].equals("@运气") || splitted[0].equals("@敏捷")) {
            int amount = Integer.parseInt(splitted[1]);
		boolean str = splitted[0].equals("@力量");
		boolean Int = splitted[0].equals("@智力");
		boolean luk = splitted[0].equals("@运气");
		boolean dex = splitted[0].equals("@敏捷");
          if(amount > 0 && amount <= player.getRemainingAp() && amount <= 32763 || amount < 0 && amount >= -32763 && Math.abs(amount) + player.getRemainingAp() <= 32767) {
		if (str && amount + player.getStr() <= 32767 && amount + player.getStr() >= 4) {
		player.setStr(player.getStr() + amount);
		player.updateSingleStat(MapleStat.STR, player.getStr());
		player.setRemainingAp(player.getRemainingAp() - amount);
		player.updateSingleStat(MapleStat.AVAILABLEAP, player.getRemainingAp());
	} else if (Int && amount + player.getInt() <= 32767 && amount + player.getInt() >= 4) {
		player.setInt(player.getInt() + amount);
		player.updateSingleStat(MapleStat.INT, player.getInt());
		player.setRemainingAp(player.getRemainingAp() - amount);
		player.updateSingleStat(MapleStat.AVAILABLEAP, player.getRemainingAp());
	} else if (luk && amount + player.getLuk() <= 32767 && amount + player.getLuk() >= 4) {
		player.setLuk(player.getLuk() + amount);
		player.updateSingleStat(MapleStat.LUK, player.getLuk());
		player.setRemainingAp(player.getRemainingAp() - amount);
		player.updateSingleStat(MapleStat.AVAILABLEAP, player.getRemainingAp());
	} else if (dex && amount + player.getDex() <= 32767 && amount + player.getDex() >= 4) {
		player.setDex(player.getDex() + amount);
		player.updateSingleStat(MapleStat.DEX, player.getDex());
		player.setRemainingAp(player.getRemainingAp() - amount);
		player.updateSingleStat(MapleStat.AVAILABLEAP, player.getRemainingAp());
	} else {
	mc.dropMessage("请确保你的某个属性值不超过32767点！.");
	}
		} else {
			mc.dropMessage("请确保你的某个属性值不超过32767点！并且有足够的点加！.");
		}
	} else if (splitted[0].equals("@自杀")) {
		player.setHp(0);
                new ServernoticeMapleClientMessageCallback(5, c).dropMessage("[命令使用成功] 你成功被春哥爆菊了!");
		player.updateSingleStat(MapleStat.HP, 0);
	} else if (splitted[0].equals("@清零")) {
                player.setExp(0);
                player.updateSingleStat(MapleStat.EXP, player.getExp());
		mc.dropMessage("经验清理完毕！");
        } else if (splitted[0].equalsIgnoreCase("@帮助")) {
                mc.dropMessage("==============================================");
                mc.dropMessage("===========<青春纪念册冒险岛命令如下>===========");
                mc.dropMessage("==============================================");
                mc.dropMessage("@力量 数量   快速加力量.");
                mc.dropMessage("@敏捷 数量   快速加敏捷.");
                mc.dropMessage("@智力 数量   快速加智力.");
                mc.dropMessage("@运气 数量   快速加运气.");
                mc.dropMessage("@存档          在线存档.");
                mc.dropMessage("@爆率查询      正在修复.");
                mc.dropMessage("@假死      解决NPC不能对话等各种卡死现象的命令.");
                mc.dropMessage("@自由      回到自由市场.卡地图不能出去使用.");
                mc.dropMessage("@修复      在线经验清零.");
         } else if (splitted[0].equals("@自由")) {
               if ((c.getPlayer().getMapId() < 910000000) || (c.getPlayer().getMapId() > 910000022)){
               new ServernoticeMapleClientMessageCallback(5, c).dropMessage("已经传送到自由市场.");
                c.getSession().write(MaplePacketCreator.enableActions());
                MapleMap to;
                MaplePortal pto;
                to = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(910000000);
                c.getPlayer().saveLocation("FREE_MARKET");//取消
                pto = to.getPortal("out00");
                c.getPlayer().changeMap(to, pto);
             }
        } else if (splitted[0].equals("@存档")) {
                if (!player.getCheatTracker().Spam(60000, 0)) { // 1 minute
                    player.saveToDB(true);
                    mc.dropMessage("信息已经成功存档！");
                } else {
                    mc.dropMessage("你每分钟只能保存一次！");
                }
        } else if (splitted[0].equals("@假死")) {
                    NPCScriptManager.getInstance().dispose(c);
                    c.getSession().write(MaplePacketCreator.enableActions());
                  mc.dropMessage("可以对话了！.");
       } else if (splitted[0].equals("@召唤跟班")){  
              if (c.getPlayer().getWarning()!=0) {
              c.getPlayer().setWarning(0);
           mc.dropMessage("成功！下线再上即可。");
          } else {     
                  mc.dropMessage("目前已拥有跟班了！"); 
              }
            }
        }
	@Override
	public CommandDefinition[] getDefinition() {
		return new CommandDefinition[] {
                    new CommandDefinition("清零", "", "Fixed negative exp", 0),
                    new CommandDefinition("帮助", "", "Does Sexual Commands", 0),
                    new CommandDefinition("存档", "", "S3xual So S3xual Saves UR ACC", 0),
                    new CommandDefinition("力量", "<amount>", "Sets your strength to a higher amount if you have enough AP or takes it away if you aren't over 32767 AP.", 0),
                    new CommandDefinition("智力", "<amount>", "Sets your intelligence to a higher amount if you have enough AP or takes it away if you aren't over 32767 AP.", 0),
                    new CommandDefinition("运气", "<amount>", "Sets your luck to a higher amount if you have enough AP or takes it away if you aren't over 32767 AP.", 0),
                    new CommandDefinition("敏捷", "<amount>", "Sets your dexterity to a higher amount if you have enough AP or takes it away if you aren't over 32767 AP.", 0),
                    new CommandDefinition("自由", "", "一键回程", 0),
                    new CommandDefinition("自杀", "", "自杀", 0),
                    new CommandDefinition("假死", "", "Stuck", 0),
                    new CommandDefinition("版本", "", "查看版本", 0),
   

		};
	}
     public static void Fake(Exception e){
    e.toString();
     }
  }