//玩具城电梯系统修复
//修复

importPackage(net.sf.odinms.scripting.reactor);
var elevator_s;
var elevator_m;
var returnMap;
var arrive;

function init() {
	elevator_m = em.getChannelServer().getMapFactory().getMap(222020211);
	em.setProperty("isUp","false");
	em.setProperty("isDown","false");
	//em.getChannelServer().getMapFactory().getMap(222020200).setReactorState();
	onDown();
}

function onDown() {
	em.getChannelServer().getMapFactory().getMap(222020100).resetReactors();
	arrive = em.getChannelServer().getMapFactory().getMap(222020100);
	returnMap = em.getChannelServer().getMapFactory().getMap(222020100);
	warpToD();
	elevator_s = em.getChannelServer().getMapFactory().getMap(222020110);
	elevator_m = em.getChannelServer().getMapFactory().getMap(222020111);
	em.setProperty("isDown","true");
	em.schedule("goingUp", 60000);
}

function goingUp() {
	warpToM();
	em.setProperty("isDown","false");
	em.schedule("onUp", 50000);
	//em.getChannelServer().getMapFactory().getMap(222020100).setReactorState();
}

function onUp() {
	em.getChannelServer().getMapFactory().getMap(222020200).resetReactors();
	arrive = em.getChannelServer().getMapFactory().getMap(222020200);
	returnMap = em.getChannelServer().getMapFactory().getMap(222020200);
	warpToD();
	elevator_s = em.getChannelServer().getMapFactory().getMap(222020210);
	elevator_m = em.getChannelServer().getMapFactory().getMap(222020211);
	em.setProperty("isUp","true");
	em.schedule("goingDown", 60000);
}

function goingDown() {
	warpToM();
	em.setProperty("isUp","false");
	em.schedule("onDown", 50000);
	//em.getChannelServer().getMapFactory().getMap(222020200).setReactorState();
}

function warpToD() { 
	var temp1 = elevator_m.getCharacters().iterator(); 
   	     while(temp1.hasNext()) { 
                temp1.next().changeMap(arrive, arrive.getPortal(0)); 
        } 
} 


function warpToM() { 
var temp1 = elevator_s.getCharacters().iterator(); 
   	     while(temp1.hasNext()) { 
                temp1.next().changeMap(elevator_m, elevator_m.getPortal(0)); 
        } 
} 
