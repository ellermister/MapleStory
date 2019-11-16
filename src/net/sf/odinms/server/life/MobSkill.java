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

package net.sf.odinms.server.life;

import java.awt.Point;
import java.awt.Rectangle;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleDisease;
import net.sf.odinms.client.status.MonsterStatus;
import net.sf.odinms.server.MaplePortal;
import net.sf.odinms.server.MapleSquad;
import net.sf.odinms.server.MapleSquadType;
import net.sf.odinms.server.maps.MapleMap;
import net.sf.odinms.server.maps.MapleMapObject;
import net.sf.odinms.server.maps.MapleMapObjectType;

/**
 *
 * @author Danny (Leifde)
 */
public class MobSkill {

    private int skillId;
    private int skillLevel;
    private int mpCon;
    private List<Integer> toSummon = new ArrayList<Integer>();
    private int spawnEffect;
    private int hp;
    private int x;
    private int y;
    private long duration;
    private long cooltime;
    private float prop;
    private Point lt,  rb;
    private int limit;
    private int count;

    public MobSkill(int skillId, int level) {
        this.skillId = skillId;
        this.skillLevel = level;
    }

    public void setMpCon(int mpCon) {
        this.mpCon = mpCon;
    }

    public void addSummons(List<Integer> toSummon) {
        for (Integer summon : toSummon) {
            this.toSummon.add(summon);
        }
    }

    public void setSpawnEffect(int spawnEffect) {
        this.spawnEffect = spawnEffect;
    }

    public void setHp(int hp) {
        this.hp = hp;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public void setCoolTime(long cooltime) {
        this.cooltime = cooltime;
    }

    public void setProp(float prop) {
        this.prop = prop;
    }

    public void setLtRb(Point lt, Point rb) {
        this.lt = lt;
        this.rb = rb;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public void applyEffect(MapleCharacter player, MapleMonster monster, boolean skill) {
        MonsterStatus monStat = null;
        MapleDisease disease = null;
        boolean heal = false;
        boolean dispel = false;
        boolean banish = false;
        switch (skillId) {
            case 100:
            case 110:
                monStat = MonsterStatus.WEAPON_ATTACK_UP;
                break;
            case 101:
            case 111:
                monStat = MonsterStatus.MAGIC_ATTACK_UP;
                break;
            case 102:
            case 112:
                monStat = MonsterStatus.WEAPON_DEFENSE_UP;
                break;
            case 103:
            case 113:
                monStat = MonsterStatus.MAGIC_DEFENSE_UP;
                break;
            case 114: // Heal
                heal = true;
                break;
            case 120:
                disease = MapleDisease.SEAL;
                break;
            case 121:
                disease = MapleDisease.DARKNESS;
                break;
            case 122:
                disease = MapleDisease.WEAKEN;
                break;
            case 123:
                disease = MapleDisease.STUN;
                break;
            case 124: // Curse TODO
                disease = MapleDisease.CURSE;
                break;
            case 125:
                //disease = MapleDisease.POISON;
                break;
            case 126: // Slow
                disease = MapleDisease.SLOW;
                break;
            case 127:
                dispel = true;
                break;
            case 128: // Seduce
                if (makeChanceResult()) { // HT is 100%, yet some others mobs aren't - we can handle those later
                    MapleSquad htSquad = player.getClient().getChannelServer().getMapleSquad(MapleSquadType.HORNTAIL);
                    if (htSquad != null && htSquad.containsMember(player)) {
                        int i = 0;
                        for (MapleCharacter htMember : htSquad.getMembers()) {
                            if (htMember.isAlive() && htMember.getMap() == player.getMap()) {
                                if (i < getCount()) {
                                    htMember.giveDebuff(MapleDisease.SEDUCE, this);
                                    i++;
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                }
                break;
            case 129: // Banish
                if (lt != null && rb != null && skill)
                    for (MapleCharacter chr : getPlayersInRange(monster, player))
                        chr.changeMapBanish(monster.getBanish().getMap(), monster.getBanish().getPortal(), monster.getBanish().getMsg());
                else
                    player.changeMapBanish(monster.getBanish().getMap(), monster.getBanish().getPortal(), monster.getBanish().getMsg());
                break;
            case 131: // Poison Mist
                // TODO: make this work
                break;
            case 140:
                if (makeChanceResult() && !monster.isBuffed(MonsterStatus.MAGIC_IMMUNITY)) {
                    monStat = MonsterStatus.WEAPON_IMMUNITY;
                }
                break;
            case 141:
                if (makeChanceResult() && !monster.isBuffed(MonsterStatus.WEAPON_IMMUNITY)) {
                    monStat = MonsterStatus.MAGIC_IMMUNITY;
                }
                break;
            case 200:
                boolean canSpawn = true;
                if (player.getEventInstance() != null) {
                    if (player.getEventInstance().getName().indexOf("FoJ", 0) != -1) {
                        canSpawn = false;
                    } else if (player.getEventInstance().getName().indexOf("BossQuest", 0) != -1 && monster.getId() == 8500001) {
                        canSpawn = false;
                    }
                }
                if (monster.getMap().getSpawnedMonstersOnMap() < 50 && canSpawn) {
                    for (Integer mobId : getSummons()) {
                        MapleMonster toSpawn = MapleLifeFactory.getMonster(mobId);
                        toSpawn.setPosition(monster.getPosition());
                        int ypos, xpos;
                        xpos = (int) monster.getPosition().getX();
                        ypos = (int) monster.getPosition().getY();
                        switch (mobId) {
                            case 8500003: // Pap bomb high
                                toSpawn.setFh((int) Math.ceil(Math.random() * 19.0));
                                ypos = -590;
                            case 8500004: // Pap bomb
                                //Spawn between -500 and 500 from the monsters X position
                                xpos = (int) (monster.getPosition().getX() + Math.ceil(Math.random() * 1000.0) - 500);
                                if (ypos != -590) {
                                    ypos = (int) monster.getPosition().getY();
                                }
                                break;
                            case 8510100: //Pianus bomb
                                if (Math.ceil(Math.random() * 5) == 1) {
                                    ypos = 78;
                                    xpos = (int) (0 + Math.ceil(Math.random() * 5)) + ((Math.ceil(Math.random() * 2) == 1) ? 180 : 0);
                                } else {
                                    xpos = (int) (monster.getPosition().getX() + Math.ceil(Math.random() * 1000.0) - 500);
                                }
                                break;
                        }
                        // Get spawn coordinates (This fixes monster lock)
                        // TODO get map left and right wall. Any suggestions? PM TheRamon
                        switch (monster.getMap().getId()) {
                            case 220080001: //Pap map
                                if (xpos < -890) {
                                    xpos = (int) (-890 + Math.ceil(Math.random() * 150));
                                } else if (xpos > 230) {
                                    xpos = (int) (230 - Math.ceil(Math.random() * 150));
                                }
                                break;
                            case 230040420: // Pianus map
                                if (xpos < -239) {
                                    xpos = (int) (-239 + Math.ceil(Math.random() * 150));
                                } else if (xpos > 371) {
                                    xpos = (int) (371 - Math.ceil(Math.random() * 150));
                                }
                                break;
                        }
                        toSpawn.setPosition(new Point(xpos, ypos));
                        monster.getMap().spawnMonsterWithEffect(toSpawn, getSpawnEffect(), toSpawn.getPosition());
                    }
                }
                break;
        }

        if (monStat != null || heal) {
            if (lt != null && rb != null && skill) {
                List<MapleMapObject> objects = getObjectsInRange(monster, MapleMapObjectType.MONSTER);
                if (heal) {
                    for (MapleMapObject mons : objects) {
                        ((MapleMonster) mons).heal(getX(), getY());
                    }
                } else {
                    for (MapleMapObject mons : objects) {
                        if (!monster.isBuffed(monStat)) {
                            ((MapleMonster) mons).applyMonsterBuff(monStat, getX(), getSkillId(), getDuration(), this);
                        }
                    }
                }
            } else {
                if (heal) {
                    monster.heal(getX(), getY());
                } else {
                    if (!monster.isBuffed(monStat)) {
                        monster.applyMonsterBuff(monStat, getX(), getSkillId(), getDuration(), this);
                    }
                }
            }
        }

        if (disease != null || dispel || banish) {
            if (skill && lt != null && rb != null) {
                List<MapleCharacter> characters = getPlayersInRange(monster, player);
                for (MapleCharacter character : characters) {
                    if (dispel) {
                        character.dispel();
                    } else if (banish) {
                        if (player.getEventInstance() == null) {
                            MapleMap to = player.getMap().getReturnMap();
                            MaplePortal pto = to.getPortal((short) (0 + 10 * Math.random()));
                            character.changeMap(to, pto);
                        }
                    } else {
                        character.giveDebuff(disease, this);
                    }
                }
            } else {
                if (dispel) {
                    player.dispel();
                } else {
                    player.giveDebuff(disease, this);
                }
            }
        }
        monster.usedSkill(skillId, skillLevel, cooltime);
        monster.setMp(monster.getMp() - getMpCon());
    }

    public int getSkillId() {
        return skillId;
    }

    public int getSkillLevel() {
        return skillLevel;
    }

    public int getMpCon() {
        return mpCon;
    }

    public List<Integer> getSummons() {
        return Collections.unmodifiableList(toSummon);
    }

    public int getSpawnEffect() {
        return spawnEffect;
    }

    public int getHP() {
        return hp;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public long getDuration() {
        return duration;
    }

    public long getCoolTime() {
        return cooltime;
    }

    public Point getLt() {
        return lt;
    }

    public Point getRb() {
        return rb;
    }

    public int getLimit() {
        return limit;
    }

    public int getCount() {
        return count;
    }

    public boolean makeChanceResult() {
        return prop == 1.0 || Math.random() < prop;
    }

    private Rectangle calculateBoundingBox(Point posFrom, boolean facingLeft) {
        Point mylt;
        Point myrb;
        if (facingLeft) {
            mylt = new Point(lt.x + posFrom.x, lt.y + posFrom.y);
            myrb = new Point(rb.x + posFrom.x, rb.y + posFrom.y);
        } else {
            myrb = new Point(lt.x * -1 + posFrom.x, rb.y + posFrom.y);
            mylt = new Point(rb.x * -1 + posFrom.x, lt.y + posFrom.y);
        }
        Rectangle bounds = new Rectangle(mylt.x, mylt.y, myrb.x - mylt.x, myrb.y - mylt.y);
        return bounds;
    }

    private List<MapleCharacter> getPlayersInRange(MapleMonster monster, MapleCharacter player) {
        Rectangle bounds = calculateBoundingBox(monster.getPosition(), monster.isFacingLeft());
        List<MapleCharacter> players = new ArrayList<MapleCharacter>();
        players.add(player);
        return monster.getMap().getPlayersInRect(bounds, players);
    }

    private List<MapleMapObject> getObjectsInRange(MapleMonster monster, MapleMapObjectType objectType) {
        Rectangle bounds = calculateBoundingBox(monster.getPosition(), monster.isFacingLeft());
        List<MapleMapObjectType> objectTypes = new ArrayList<MapleMapObjectType>();
        objectTypes.add(objectType);
        return monster.getMap().getMapObjectsInRect(bounds, objectTypes);
    }
}