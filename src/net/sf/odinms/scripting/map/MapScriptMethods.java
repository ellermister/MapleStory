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

package net.sf.odinms.scripting.map;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.SkillFactory;
import net.sf.odinms.tools.MaplePacketCreator;

public class MapScriptMethods {

    private MapleClient c;

    public MapScriptMethods(MapleClient c) {
        this.c = c;
    }

    protected MapleClient getClient() {
        return c;
    }

    public MapleCharacter getPlayer() {
        return c.getPlayer();
    }

    public void Adventure() {
        c.getSession().write(MaplePacketCreator.lockUI(true));
        if (c.getPlayer().getGender() == 0) {
            c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction3.img/goAdventure/Scene0", -1));
        } else {
            c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction3.img/goAdventure/Scene1", -1));
        }
   } 
       public void Lith() {
        c.getSession().write(MaplePacketCreator.lockUI(true));
            if (c.getPlayer().getGender() == 2010000) {   
            c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction3.img/goLith/Scene0", -1));
         } else {
            c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction3.img/goLith/Scene1", -1));
        }
    }
    public void displayAranIntro() {
        switch (c.getPlayer().getMapId()) {
            case 914090010:
                c.getSession().write(MaplePacketCreator.lockUI(true));
                c.getSession().write(MaplePacketCreator.disableUI(true));
                c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction1.img/aranTutorial/Scene0", -1));
                break;
            case 914090011:
                if (c.getPlayer().getGender() == 0) {
                    c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction1.img/aranTutorial/Scene10", -1));
                    break;
                } else {
                    c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction1.img/aranTutorial/Scene11", -1));
                    break;
                }
            case 914090012:
                if (c.getPlayer().getGender() == 0) {
                    c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction1.img/aranTutorial/Scene20", -1));
                    break;
                } else {
                    c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction1.img/aranTutorial/Scene21", -1));
                    break;
                }
            case 914090013:
                c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction1.img/aranTutorial/Scene3", -1));
                break;
            case 914090100:
                c.getSession().write(MaplePacketCreator.lockUI(true));
                c.getSession().write(MaplePacketCreator.disableUI(true));
                c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction1.img/aranTutorial/HandedPoleArm" + c.getPlayer().getGender(), -1));
                break;
        }
    }

    public void arriveIceCave() {
        unlockUI();
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000014), 0, 0);
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000015), 0, 0);
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000016), 0, 0);
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000017), 0, 0);
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000018), 0, 0);
        c.getPlayer().setRemainingSp(0);

        c.getSession().write(MaplePacketCreator.showWZEffect("Effect/Direction1.img/aranTutorial/ClickLilin", -1));
    }

    @SuppressWarnings("static-access")
    public void lockUI() {
        c.getPlayer().tutorial = true;
        c.getSession().write(MaplePacketCreator.lockUI(true));
        c.getSession().write(MaplePacketCreator.disableUI(true));
    }

    @SuppressWarnings("static-access")
    public void unlockUI() {
        c.getPlayer().tutorial = false;
        c.getSession().write(MaplePacketCreator.lockUI(false));
        c.getSession().write(MaplePacketCreator.disableUI(false));
    }

    @SuppressWarnings("static-access")
    public boolean inIntro() {
        return c.getPlayer().tutorial;
    }

    public void enterRien() {
        if (c.getPlayer().getJob().getId() == 2100 && !c.getPlayer().getAranIntroState("ck=1")) {
            c.getPlayer().addAreaData(21019, "miss=o;arr=o;ck=1;helper=clear");
            c.getSession().write(MaplePacketCreator.updateIntroState("miss=o;arr=o;ck=1;helper=clear", 21019));
            unlockUI();
        }
    }

    public void showWZEffect(String path, int info) {
        c.getSession().write(MaplePacketCreator.showWZEffect(path, info));
    }

    public void showWZEffectS(String path, int info) {
        c.getSession().write(MaplePacketCreator.showWZEffectS(path, info));
    }

    public void playWZSound(String path) {
        c.getSession().write(MaplePacketCreator.playWZSound(path));
    }

    public void updateQuest(int questid, String status) {
        c.getSession().write(MaplePacketCreator.updateQuest(questid, status));
    }

    public void displayGuide(int guide) {
        c.getSession().write(MaplePacketCreator.displayGuide(guide));
    }

    public void removeTutorialSummon() {
        c.getSession().write(MaplePacketCreator.spawnTutorialSummon(0));
    }

    public void tutorialSpeechBubble(String message) {
        c.getSession().write(MaplePacketCreator.tutorialSpeechBubble(message));
    }

    public void showInfo(String message) {
        c.getSession().write(MaplePacketCreator.showInfo(message));
    }

    public void showMapEffect(String path) {
        c.getSession().write(MaplePacketCreator.showMapEffect(path));
    }
}