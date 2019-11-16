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

package net.sf.odinms.client;

import java.sql.Timestamp;
import java.util.LinkedList;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.Randomizer;

 public class Equip extends Item implements IEquip {

    private byte upgradeSlots;
    private byte level, flag;
    private byte locked;
    private MapleJob job;
    private short str,  dex,  _int,  luk,  hp,  mp,  watk,  matk,  wdef,  mdef,  acc,  avoid,  hands,  speed,  jump,  vicious;
    private boolean ring;
    private int sn;
    private int uniqueid;
    private Timestamp expiration;
    private int partnerUniqueId;
    private int partnerId;
    private String partnerName;
    private int itemExp,  itemLevel;
    //private int ringid;
    public Equip(int id, byte position) {
        super(id, position, (short) 1);
        this.ring = false;
                this.itemLevel = 1;

    }

    public Equip(int id, byte position, boolean ring) {
        super(id, position, (short) 1);
        this.ring = false;
        this.itemExp = 0;
        this.itemLevel = 1;
        //this.ringid = -1;
    }

    public Equip(int id, byte position, boolean ring, int partnerUniqueId, int partnerId, String partnerName) {
        super(id, position, (short) 1);
        this.ring = false;
        this.partnerUniqueId = partnerUniqueId;
        this.partnerId = partnerId;
        this.partnerName = partnerName;
    }
 public Equip(int id, byte position, int slots) {
        super(id, position, (short) 1);
        this.upgradeSlots = (byte) slots;
        this.itemExp = 0;
        this.itemLevel = 1;
     
 }
    @Override
    public IItem copy() {
        Equip ret = new Equip(getItemId(), getPosition(), ring);
        ret.str = str;
        ret.dex = dex;
        ret._int = _int;
        ret.luk = luk;
        ret.hp = hp;
        ret.mp = mp;
        ret.matk = matk;
        ret.mdef = mdef;
        ret.watk = watk;
        ret.wdef = wdef;
        ret.acc = acc;
        ret.avoid = avoid;
        ret.hands = hands;
        ret.speed = speed;
        ret.jump = jump;
        ret.flag = flag;
        ret.locked = locked;
        ret.upgradeSlots = upgradeSlots;
        ret.level = level;
        ret.vicious = vicious;
        ret.log = new LinkedList<String>(log);
        ret.setOwner(getOwner());
        ret.setQuantity(getQuantity());
        return ret;
    }

    @Override
    public byte getType() {
        return IItem.EQUIP;
    }

    @Override
    public byte getUpgradeSlots() {
        return upgradeSlots;
    }

    @Override
    public byte getLocked() {
        return locked;
    }

    @Override
    public short getStr() {
        return str;
    }

    @Override
    public short getDex() {
        return dex;
    }

    @Override
    public short getInt() {
        return _int;
    }

    @Override
    public short getLuk() {
        return luk;
    }

    @Override
    public short getHp() {
        return hp;
    }

    @Override
    public short getMp() {
        return mp;
    }

    @Override
    public short getWatk() {
        return watk;
    }

    @Override
    public short getMatk() {
        return matk;
    }

    @Override
    public short getWdef() {
        return wdef;
    }

    @Override
    public short getMdef() {
        return mdef;
    }

    @Override
    public short getAcc() {
        return acc;
    }

    @Override
    public short getAvoid() {
        return avoid;
    }

    @Override
    public short getHands() {
        return hands;
    }

    @Override
    public short getSpeed() {
        return speed;
    }

    @Override
    public short getJump() {
        return jump;
    }

    @Override
    public byte getFlag() {
        return flag;
    }

    @Override
    public void setFlag(byte flag) {
        this.flag = flag;
    }

    public MapleJob getJob() {
        return job;
    }

    public void setStr(short str) {
        this.str = str;
    }

    public void setDex(short dex) {
        this.dex = dex;
    }

    public void setInt(short _int) {
        this._int = _int;
    }

    public void setLuk(short luk) {
        this.luk = luk;
    }

    public void setHp(short hp) {
        this.hp = hp;
    }

    public void setMp(short mp) {
        this.mp = mp;
    }

    public void setWatk(short watk) {
        this.watk = watk;
    }

    public void setMatk(short matk) {
        this.matk = matk;
    }

    public void setWdef(short wdef) {
        this.wdef = wdef;
    }

    public void setMdef(short mdef) {
        this.mdef = mdef;
    }

    public void setAcc(short acc) {
        this.acc = acc;
    }

    public void setAvoid(short avoid) {
        this.avoid = avoid;
    }

    public void setHands(short hands) {
        this.hands = hands;
    }

    public void setSpeed(short speed) {
        this.speed = speed;
    }

    public void setJump(short jump) {
        this.jump = jump;
    }

    public void setLocked(byte locked) {
        this.locked = locked;
    }

    public void setUpgradeSlots(byte upgradeSlots) {
        this.upgradeSlots = upgradeSlots;
    }

    public void setUpgradeSlots(int i) {
        this.upgradeSlots = (byte) i;
    }



    public short getVicious() {
        return vicious;
    }

    public void setVicious(int i) {
        this.vicious = (short) i;
    }

    public void setVicious(short vicious) {
        this.vicious = vicious;
    }

    @Override
    public int getSN() {
        return sn;
    }

    @Override
    public void setSN(int sn) {
        this.sn = sn;
    }

    @Override
    public int getUniqueId() {
        return uniqueid;
    }

    @Override
    public void setUniqueId(int id) {
        this.uniqueid = id;
    }

    public byte getLevel() {
        return level;
    }

    public void setLevel(byte level) {
        this.level = level;
    }

    public void gainLevel(MapleClient c, boolean timeless) {
        if (level < 6) {
            if (c.getPlayer().getJob().isA(MapleJob.MAGICIAN)) {
                this.matk += Randomizer.getInstance().nextInt(5);
                this._int += Randomizer.getInstance().nextInt(1) + 1;
                this.luk += Randomizer.getInstance().nextInt(1);
            } else {
                this.watk += Randomizer.getInstance().nextInt(3);
            }
        }
        this.level++;
    }

    public int getItemExp() {
        return itemExp;
    }

    public void gainItemExp(MapleClient c, int gain, boolean timeless) {
        itemExp += gain;
        int expNeeded = 0;
        if (timeless) {
            expNeeded = ExpTable.getTimelessItemExpNeededForLevel(itemLevel + 1);
        } else {
            expNeeded = ExpTable.getReverseItemExpNeededForLevel(itemLevel + 1);
        }
        if (itemExp >= expNeeded) {
            gainLevel(c, timeless);
            c.getSession().write(MaplePacketCreator.showItemLevelup());
        }
    }

    public void setItemExp(int itemExp) {
        this.itemExp = itemExp;
        this.itemLevel = Math.max((itemExp - 70) / 10, 0);
    }

    public int getItemLevel() {
        return itemLevel;
    }

    @Override
    public void setQuantity(short quantity) {
        if (quantity < 0 || quantity > 1) {
            throw new RuntimeException("Setting the quantity to " + quantity + " on an equip (itemid: " + getItemId() + ")");
        }
        super.setQuantity(quantity);
    }

    public void setJob(MapleJob job) {
        this.job = job;
    }

    @Override
    public Timestamp getExpiration() {
        return expiration;
    }

    @Override
    public void setExpiration(Timestamp expire) {
        this.expiration = expire;
    }

    public boolean isRing() {
        return ring;
    }

    public void setRing(boolean is) {
        ring = is;
    }

    public int getPartnerUniqueId() {
        return partnerUniqueId;
    }

    public int getPartnerId() {
        return partnerId;
    }

    public String getPartnerName() {
        return partnerName;
    }
}