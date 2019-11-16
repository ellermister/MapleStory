package net.sf.odinms.client.anticheat;

import java.awt.Point;
import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import java.util.concurrent.ScheduledFuture;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.server.AutobanManager;
import net.sf.odinms.server.TimerManager;
import net.sf.odinms.tools.StringUtil;

public class CheatTracker {

    private Map<CheatingOffense, CheatingOffenseEntry> offenses = Collections.synchronizedMap(new LinkedHashMap<CheatingOffense, CheatingOffenseEntry>());
    private WeakReference<MapleCharacter> chr;
    private long regenHPSince;
    private long regenMPSince;
    private int numHPRegens;
    private int numMPRegens;
    private int numSequentialAttacks;
    private long lastAttackTime;
    private long lastDamage = 0;
    private long takingDamageSince;
    private int numSequentialDamage = 0;
    private long lastDamageTakenTime = 0;
    private int numSequentialSummonAttack = 0;
    private long summonSummonTime = 0;
    private int numSameDamage = 0;
    private long attackingSince;
    private long lastFJTime;
    private int infiniteFJCount = 0;
    private Point lastMonsterMove;
    private int monsterMoveCount;
    private int attacksWithoutHit = 0;
    private String[] lastText = {"", "", ""};
    private int mobsOwned;
    private Boolean pickupComplete = Boolean.TRUE;
    private ScheduledFuture<?> invalidationTask;
private long[] lastTime = new long[6];
    public CheatTracker(MapleCharacter chr) {
        this.chr = new WeakReference<MapleCharacter>(chr);
        invalidationTask = TimerManager.getInstance().register(new CheatTracker.InvalidationTask(), 60000);
        takingDamageSince = attackingSince = regenMPSince = regenHPSince = System.currentTimeMillis();
    }

    public boolean checkAttack(int skillId) {
        numSequentialAttacks++;

        long oldLastAttackTime = lastAttackTime;
        lastAttackTime = System.currentTimeMillis();
        long attackTime = lastAttackTime - attackingSince;
        if (numSequentialAttacks > 3) {
            final int divisor;
            if (skillId == 3121004 || skillId == 5221004 || skillId == 13111002) { // hurricane
                divisor = 10;
            } else {
                divisor = 300;
            }
            if (attackTime / divisor < numSequentialAttacks) {
                registerOffense(CheatingOffense.FASTATTACK);
                return false;
            }
        }
        if (lastAttackTime - oldLastAttackTime > 1500) {
            attackingSince = lastAttackTime;
            numSequentialAttacks = 0;
        }
        return true;
    }

    public void checkTakeDamage() {
        numSequentialDamage++;
        long oldLastDamageTakenTime = lastDamageTakenTime;
        lastDamageTakenTime = System.currentTimeMillis();

        long timeBetweenDamage = lastDamageTakenTime - takingDamageSince;

        if (timeBetweenDamage / 500 < numSequentialDamage) {
            registerOffense(CheatingOffense.FAST_TAKE_DAMAGE);
        }

        if (lastDamageTakenTime - oldLastDamageTakenTime > 4500) {
            takingDamageSince = lastDamageTakenTime;
            numSequentialDamage = 0;
        }
    }

    public int checkDamage(long dmg) {
        if (dmg > 1 && lastDamage == dmg) {
            numSameDamage++;
        } else {
            lastDamage = dmg;
            numSameDamage = 0;
        }
        return numSameDamage;
    }

    public synchronized boolean checkHPLoss() {
        if (!chr.get().isGM()) {
            if (mobsOwned >= 50) {
                registerOffense(CheatingOffense.ATTACK_WITHOUT_GETTING_HIT);
                AutobanManager.getInstance().autoban(chr.get().getClient(), "无敌自动封号");
            }
        }
        if (chr.get().getHp() >= chr.get().getMaxHp()) {
            mobsOwned++;
        } else {
            mobsOwned = 0;
        }
        return false;
    }

    public void checkMoveMonster(Point pos) {
        if (pos.equals(lastMonsterMove)) {
            monsterMoveCount++;
            if (monsterMoveCount > 30) { //15
                registerOffense(CheatingOffense.MOVE_MONSTERS);
                AutobanManager.getInstance().autoban(chr.get().getClient(), "吸怪自动封号1");
            }
        } else {
            lastMonsterMove = pos;
            monsterMoveCount = 1;
        }
    }
    

    public synchronized void checkFJ() {
        long oldLastFJTime = lastFJTime;
        lastFJTime = System.currentTimeMillis();
        if (lastFJTime - oldLastFJTime > 200) {
            infiniteFJCount = 0;
        } else {
            infiniteFJCount++;
        }
        if (infiniteFJCount > 10 && !(chr.get().isGM())) {
            AutobanManager.getInstance().autoban(chr.get().getClient(), "异常移动");
        }
    }
        public synchronized boolean Spam(int limit, int type) {
            if (type < 0 || lastTime.length < type) {
                type = 1; // default xD
            }
            if (System.currentTimeMillis() < limit + lastTime[type]) {
                return true;
            }
            lastTime[type] = System.currentTimeMillis();
            return false;
        }

    public boolean textSpam(String text) {
        if (!chr.get().isGM()) {
            if (lastText[0].equalsIgnoreCase(text) && lastText[1].equalsIgnoreCase(text) && lastText[2].equalsIgnoreCase(text)) {
                return true;
            } else if (!lastText[2].equals(text) && lastText[1].equals(text) && lastText[0].equals(text)) {
                lastText[2] = text;
            } else if (!lastText[1].equals(text) && lastText[0].equals(text)) {
                lastText[1] = text;
            } else if (!lastText[0].equals(text)) {
                lastText[0] = text;
            }
        }
        return false;
    }

    public boolean checkHPRegen() {
        numHPRegens++;
        if ((System.currentTimeMillis() - regenHPSince) / 10000 < numHPRegens) {
            registerOffense(CheatingOffense.FAST_HP_REGEN);
            return false;
        }
        return true;
    }

    public void resetHPRegen() {
        regenHPSince = System.currentTimeMillis();
        numHPRegens = 0;
    }

    public boolean checkMPRegen() {
        numMPRegens++;
        long allowedRegens = (System.currentTimeMillis() - regenMPSince) / 10000;
        if (allowedRegens < numMPRegens) {
            registerOffense(CheatingOffense.FAST_MP_REGEN);
            return false;
        }
        return true;
    }

    public void resetMPRegen() {
        regenMPSince = System.currentTimeMillis();
        numMPRegens = 0;
    }

    public void resetSummonAttack() {
        summonSummonTime = System.currentTimeMillis();
        numSequentialSummonAttack = 0;
    }

    public boolean checkSummonAttack() {
        numSequentialSummonAttack++;
        //estimated
        long allowedAttacks = (System.currentTimeMillis() - summonSummonTime) / 2000 + 1;
        if (allowedAttacks < numSequentialAttacks) {
            registerOffense(CheatingOffense.FAST_SUMMON_ATTACK);
            return false;
        }
        return true;
    }

    public void checkPickupAgain() {
        synchronized (pickupComplete) {
            if (pickupComplete) {
                pickupComplete = Boolean.FALSE;
            } else {
                registerOffense(CheatingOffense.TUBI);
            }
        }
    }

    public void pickupComplete() {
        synchronized (pickupComplete) {
            pickupComplete = Boolean.TRUE;
        }
    }

    public int getAttacksWithoutHit() {
        return attacksWithoutHit;
    }

    public void setAttacksWithoutHit(int attacksWithoutHit) {
        this.attacksWithoutHit = attacksWithoutHit;
    }

    public void registerOffense(CheatingOffense offense) {
        registerOffense(offense, null);
    }

    public void registerOffense(CheatingOffense offense, String param) {
        MapleCharacter chrhardref = chr.get();
        if (chrhardref == null || !offense.isEnabled()) {
            return;
        }

        CheatingOffenseEntry entry = offenses.get(offense);
        if (entry != null && entry.isExpired()) {
            expireEntry(entry);
            entry = null;
        }
        if (entry == null) {
            entry = new CheatingOffenseEntry(offense, chrhardref);
        }
        if (param != null) {
            entry.setParam(param);
        }
        entry.incrementCount();
        if (offense.shouldAutoban(entry.getCount())) {
            AutobanManager.getInstance().autoban(chrhardref.getClient(), StringUtil.makeEnumHumanReadable(offense.name()));
        }
        offenses.put(offense, entry);
        CheatingOffensePersister.getInstance().persistEntry(entry);
    }

    public void expireEntry(CheatingOffenseEntry coe) {
        offenses.remove(coe.getOffense());
    }

    public int getPoints() {
        int ret = 0;
        CheatingOffenseEntry[] offenses_copy;
        synchronized (offenses) {
            offenses_copy = offenses.values().toArray(new CheatingOffenseEntry[offenses.size()]);
        }
        for (CheatingOffenseEntry entry : offenses_copy) {
            if (entry.isExpired()) {
                expireEntry(entry);
            } else {
                ret += entry.getPoints();
            }
        }
        return ret;
    }

    public Map<CheatingOffense, CheatingOffenseEntry> getOffenses() {
        return Collections.unmodifiableMap(offenses);
    }

    public String getSummary() {
        StringBuilder ret = new StringBuilder();
        List<CheatingOffenseEntry> offenseList = new ArrayList<CheatingOffenseEntry>();
        synchronized (offenses) {
            for (CheatingOffenseEntry entry : offenses.values()) {
                if (!entry.isExpired()) {
                    offenseList.add(entry);
                }
            }
        }
        Collections.sort(offenseList, new Comparator<CheatingOffenseEntry>() {

            @Override
            public int compare(CheatingOffenseEntry o1, CheatingOffenseEntry o2) {
                int thisVal = o1.getPoints();
                int anotherVal = o2.getPoints();
                return (thisVal < anotherVal ? 1 : (thisVal == anotherVal ? 0 : -1));
            }
        });
        int to = Math.min(offenseList.size(), 4);
        for (int x = 0; x < to; x++) {
            ret.append(StringUtil.makeEnumHumanReadable(offenseList.get(x).getOffense().name()));
            ret.append(": ");
            ret.append(offenseList.get(x).getCount());
            if (x != to - 1) {
                ret.append(" ");
            }
        }
        return ret.toString();
    }

    public void dispose() {
        invalidationTask.cancel(false);
    }

    private class InvalidationTask implements Runnable {

        @Override
        public void run() {
            CheatingOffenseEntry[] offenses_copy;
            synchronized (offenses) {
                offenses_copy = offenses.values().toArray(new CheatingOffenseEntry[offenses.size()]);
            }
            for (CheatingOffenseEntry offense : offenses_copy) {
                if (offense.isExpired()) {
                    expireEntry(offense);
                }
            }

            if (chr.get() == null) {
                dispose();
            }
        }
    }
}