/*2101014.js - Lobby and Entrance
 * @author Jvlaple
 * For Jvlaple's AriantPQ
 */
importPackage(java.lang);
importPackage(Packages.server);
 
var status = 0;
var toBan = -1;
var choice;
var arena;
var arenaName;
var type;
var map;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1) {
			status++;
		} else {
			status--;
		}
		if (cm.getPlayer().getMapId() == 980010000) {
			if (status == 0) {
				var toSnd = "Voce gostaria de participar do Desafio #eAriant Coliseu#n?\r\n\r\n#e#r       (Escolha uma arena)#n#k\r\n#b";
				if (cm.getSquadState(MapleSquadType.ARIANT1) != 2 && cm.getSquadState(MapleSquadType.ARIANT1) != 1) {
					toSnd += "#L0#Comece Ariant Coliseu (1)#l\r\n";
				} else if (cm.getSquadState(MapleSquadType.ARIANT1) == 1) {
					toSnd += "#L0#Junte-se ao Ariant Coliseu (1)  Dono (" + cm.getSquadMember(MapleSquadType.ARIANT1, 0).getName() + ")" + " Membros Atuais: " + cm.numSquadMembers(MapleSquadType.ARIANT1) + "\r\n";
				}
				if (cm.getSquadState(MapleSquadType.ARIANT2) != 2 && cm.getSquadState(MapleSquadType.ARIANT2) != 1) {
					toSnd += "#L1#Comece Ariant Coliseu (2)#l\r\n";
				} else if (cm.getSquadState(MapleSquadType.ARIANT2) == 1) {
					toSnd += "#L1#Junte-se ao Ariant Coliseu (2)  Dono (" + cm.getSquadMember(MapleSquadType.ARIANT2, 0).getName() + ")" + " Membros Atuais:: " + cm.numSquadMembers(MapleSquadType.ARIANT2) + "\r\n";
				}
				if (cm.getSquadState(MapleSquadType.ARIANT3) != 2 && cm.getSquadState(MapleSquadType.ARIANT3) != 1) {
					toSnd += "#L2#Comece Ariant Coliseu (3)#l\r\n";
				} else if (cm.getSquadState(MapleSquadType.ARIANT3) == 1) {
					toSnd += "#L2#Junte-se ao Ariant Coliseu (3)  Dono (" + cm.getSquadMember(MapleSquadType.ARIANT3, 0).getName() + ")" + " Membros Atuais:: " + cm.numSquadMembers(MapleSquadType.ARIANT3) + "\r\n";
				}
				if (toSnd.equals("Voce gostaria de participar do Desafio Ariant Coliseu? Escolha uma arena!\r\n#b")) {
                                        cm.sendOk("Todas as arenas esta ocupadas agora. Eu sugiro que voce volte mais tarde ou mudar de canal.");
					cm.dispose();
				} else {
					cm.sendSimple(toSnd);
				}
			} else if (status == 1) {
				switch (selection) {
					case 0 : choice = MapleSquadType.ARIANT1;
							 map = 980010100;
							 break;
					case 1 : choice = MapleSquadType.ARIANT2;
							 map = 980010200;
							 break;
					case 2 : choice = MapleSquadType.ARIANT3;
							 map = 980010300;
							 break;
					default : choice = MapleSquadType.UNDEFINED;
							  map = 0;
							  return;
							  break;
					}
				if (cm.getSquadState(choice) == 0) {
					if (cm.createMapleSquad(choice) != null) {
						cm.getPlayer().dropMessage("Sua Arena foi criada. Aguarde as pessoas entrarem agora!");
						cm.warp(map, 0);
						cm.dispose();
					} else {
						cm.getPlayer().dropMessage("Houve um erro. Por favor, reporte este fato a um GameMaster o mais breve possivel.");
						cm.dispose();
					}
				} else if (cm.getSquadState(choice) == 1) {
					if (cm.numSquadMembers(choice) > 5) {
						cm.sendOk("Desculpe, a Lobby esta cheia agora.");
						cm.dispose();
					} else {
						if (cm.canAddSquadMember(choice)) {
							cm.addSquadMember(choice);
							cm.sendOk("Voce ja se inscreveu!");
							cm.warp(map, 0);
							cm.dispose();
						} else {
							cm.sendOk("Desculpe, mas o lider pediu para nao ser autorizado a entrar.");
							cm.dispose();
						}
					}
				} else {
					cm.sendOk("Algo ocorreu mal.");
					cm.dispose();
				}
			}  
		} 
	}
}