/**
                《该文件是Vr001 封测版服务端的核心文件之一》
  目前版权 (C) 2010年   Vr001 封测版             <159502199@qq.com>
 * -----------------------------------------------------------*
  之前人员 (C) 2008年   Huy              <patrick.huy@frz.cc>
                       Matthias Butz       <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>
 * ------------------------------------------------------------*
 ◎该服务端目前维护人员:Vr001 封测版
 ◎这个文件是自由形式.你可以任意内容
 ◎这个程序发布的目的是期望它能有用
 ◎如果你需要技术支持,可以联系更新/维护人员<QQ100807851>
 ◎你应该已经收到一份Affero GNU通用公共授权
 -如果不是,请仔细查看http://www.gnu.org/licenses/*
**/

/* Vr001 封测版脚本的注释信息：
	NPC 名称: 	      明珠港星级传送
	Map(s): 	        金银岛 - 明珠港(104000000)
	用途解释:                
*/
var status = 0;
var cost;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 1 && mode == 0) {
			cm.sendNext("在这个村子里还有许多漂亮的景点，如果你想去蚂蚁洞广场，欢迎随时使用我们的出租车服务。");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("您好~！我们是星级出租车。不同于村落之间来往的一半的中巴我们给您提供更高级的服务。因此车费有点贵…您只要支付10000金币，我们就会将您安全迅速的送到#b蚂蚁洞广场#k。但是等级太低进去会很危险是否要进去呢？");
		} else if (status == 1) {
if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BEGINNER)) {
				cm.sendYesNo("蚂蚁洞广场是位于金银岛中间的迷宫深处。在那里有24小时排挡。你是否要付10000金币后去蚂蚁洞广场？");
				cost = 1000;
			} else {
				cm.sendYesNo("此段未翻译成功，请联系GM");
				cost = 10000;
			}
		} else if (status == 2) {
			if (cm.getMeso() < cost) {
				cm.sendNext("对不起，你的金币不够支付车费。")
			} else {
				cm.gainMeso(-cost);
				cm.warp(105070001, 0);
			}
			cm.dispose();
		}
	}
}
