var status = 0; 
var mobIds;
var slc=-1;

function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    if (mode == -1) { 
        cm.dispose(); 
    } else {         
        if (mode == 1) 
            status++; 
        else {            
            cm.dispose(); 
            return; 
        } 

		if (status == 0) { 
			if (cm.getMapMobsIds().size() <= 0) {
				cm.sendOk("当前地图没有刷新怪物，无法查看爆率。");
				cm.dispose();
				return;
			}
			mobIds = cm.getMapMobsIds();
			var selStr = "请选择你要查看怪物的爆率。\r\n\r\n#r 当前地图总共:["+mobIds.size()+"]种怪#k";
			for (var i=0;i<mobIds.size();i++) {
				 selStr +="\r\n#b#L" + i + "##o"+mobIds.get(i)+"##l";				
			}
			cm.sendSimple(selStr);
        } else if (status == 1) {
			slc=selection;
			if(slc<0||slc>=mobIds.size()){
				cm.sendOk("没有选择的怪物");
				cm.dispose();
				return;
			}

			var mobId=mobIds.get(slc);
            if (cm.getMapMobDropsIds(mobId).size() <= 0) {
				cm.sendOk("当前地图没有刷新怪物，无法查看爆率。");
				cm.dispose();
				return;
			}
			var selStr = "#r#o"+mobId+"#爆率。\r\n\r\n#k";

			var items = cm.getMapMobDropsIds(mobId);
			for (var i=0;i<items.size();i++) {
				selStr +=" #v"+items.get(i)+"##b  #z"+items.get(i)+"##b "

			}
			cm.sendOk(selStr); 
			cm.dispose();         
        }        
        
    }
}