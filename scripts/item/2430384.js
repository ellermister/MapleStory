function start() {
	
	var rand = Math.floor(Math.random() * 14);
	var item;
	var num;
	var name;
	
	if (rand <3){
		item = 1022097;
		num = 1;
		name = "龙眼镜";
	}else if (rand < 1){
		item = 1142216
		num = 1;
		name = "VIP勋章"
	}else if (rand == 2){
		item = 1102207
		num = 1;
		name = "金魂披风"
	}else if (rand == 3){
		item = 1122104
		num = 1;
		name = "旭日吊坠"
	}else if (rand == 4){
		item = 1012191
		num = 1;
		name = "暗影双刀面巾"
	}else if (rand == 5){
		item = 1002850
		num = 1;
		name = "圣诞鹿变身帽"
	}else if (rand == 11){
		item = 1112494
		num = 1;
		name = "老公老婆戒指LV49"
	}else if (rand == 12){
		item = 2040121
		num = 1;
		name = "暗影双刀秘密卷轴"
	}else if (rand == 6){
		item = 1122143
		num = 1;
		name = "觉醒的冒险之心(战士)"
	}else if (rand == 7){
		item = 1122144
		num = 1;
		name = "觉醒的冒险之心(魔法师)"
	}else if (rand == 8){
		item = 1122145
		num = 1;
		name = "觉醒的冒险之心(弓箭手)"
	}else if (rand == 9){
		item = 1122146
		num = 1;
		name = "觉醒的冒险之心(飞侠)"
	}else if (rand == 10){
		item = 1122147
		num = 1;
		name = "觉醒的冒险之心(海盗)"
	}else if (rand == 13){
		item = 2040212
		num = 1;
		name = "龙眼镜专用特殊卷轴"
	}else{
		item = 2040212
		num = 1;
		name = "龙眼镜专用特殊卷轴"
	}//rand
	if (it.gainItem(item,num)){
	it.remove(-1); //减少1个使用的这个道具
	it.sendY("打开了冒险岛7周年纪念箱，获取了 "+name+" "+num+"个")
	}
	it.dispose(); 
}