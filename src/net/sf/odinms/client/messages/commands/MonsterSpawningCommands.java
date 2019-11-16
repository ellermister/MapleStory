package net.sf.odinms.client.messages.commands;

import static net.sf.odinms.client.messages.CommandProcessor.getNamedDoubleArg;
import static net.sf.odinms.client.messages.CommandProcessor.getNamedIntArg;
import static net.sf.odinms.client.messages.CommandProcessor.getOptionalIntArg;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.messages.Command;
import net.sf.odinms.client.messages.CommandDefinition;
import net.sf.odinms.client.messages.IllegalCommandSyntaxException;
import net.sf.odinms.client.messages.MessageCallback;
import net.sf.odinms.server.life.MapleLifeFactory;
import net.sf.odinms.server.life.MapleMonster;
import net.sf.odinms.server.life.MapleMonsterStats;
import net.sf.odinms.tools.MaplePacketCreator;

public class MonsterSpawningCommands implements Command {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(MonsterSpawningCommands.class);

    @Override
    public void execute(MapleClient c, MessageCallback mc, String[] splitted) throws Exception, IllegalCommandSyntaxException {
        if (splitted[0].equals("!召唤")) {
            int mid = Integer.parseInt(splitted[1]);
            int num = Math.min(getOptionalIntArg(splitted, 2, 1), 500);

            Integer hp = getNamedIntArg(splitted, 1, "hp");
            Integer exp = getNamedIntArg(splitted, 1, "exp");
            Double php = getNamedDoubleArg(splitted, 1, "php");
            Double pexp = getNamedDoubleArg(splitted, 1, "pexp");
            // !spawn 100100 hplock
            boolean hpLock = false;
            boolean moveLock = false;
            for (String s : splitted) {
                if (s.equalsIgnoreCase("hpLock")) {
                    hpLock = true;
                }
                if (s.equalsIgnoreCase("moveLock")) {
                    moveLock = true;
                }
            }
            MapleMonster onemob = MapleLifeFactory.getMonster(mid);
            int newhp = 0;
            int newexp = 0;
            double oldExpRatio = ((double) onemob.getHp() / onemob.getExp());

            if (hp != null) {
                newhp = hp.intValue();
            } else if (php != null) {
                newhp = (int) (onemob.getMaxHp() * (php.doubleValue() / 100));
            } else {
                newhp = onemob.getMaxHp();
            }
            if (exp != null) {
                newexp = exp.intValue();
            } else if (pexp != null) {
                newexp = (int) (onemob.getExp() * (pexp.doubleValue() / 100));
            } else {
                newexp = onemob.getExp();
            }

            if (newhp < 1) {
                newhp = 1;
            }
            double newExpRatio = ((double) newhp / newexp);
            if (newExpRatio < oldExpRatio && newexp > 0) {
                mc.dropMessage("You cannot spawn this monster! The new hp/exp ratio is better than the old one. (" + newExpRatio + " < " + oldExpRatio + ")");
                return;
            }

            MapleMonsterStats overrideStats = new MapleMonsterStats();
            overrideStats.setHp(newhp);
            overrideStats.setExp(newexp);
            overrideStats.setMp(onemob.getMaxMp());

            for (int i = 0; i < num; i++) {
                MapleMonster mob = MapleLifeFactory.getMonster(mid);
                mob.setHp(newhp);
                mob.setOverrideStats(overrideStats);
                mob.setHpLock(hpLock);
                mob.setMoveLocked(moveLock);
                if (moveLock) {
                    c.getPlayer().getMap().spawnFakeMonsterOnGroundBelow(mob, c.getPlayer().getPosition());
                } else {
                    c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, c.getPlayer().getPosition());
                }
            }
        } else if (splitted[0].equals("!攻城活动")) {
            c.getPlayer().getMap().spawnFakeMonsterOnGroundBelow(MapleLifeFactory.getMonster(8800000), c.getPlayer().getPosition());
            for (int i = 8800003; i <= 8800010; i++) {
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(i), c.getPlayer().getPosition());
            }
            for (int i = 0; i <= 10; i++) {
            MapleMonster mob = MapleLifeFactory.getMonster(9400202);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, c.getPlayer().getPosition());
            }
            for (int i = 9400100; i <= 9400103; i++) {
            MapleMonster mob0 = MapleLifeFactory.getMonster(i);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob0, c.getPlayer().getPosition());
            }
            for (int i = 9400110; i <= 9400113; i++) {
            MapleMonster mob1 = MapleLifeFactory.getMonster(i);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob1, c.getPlayer().getPosition());
            }
            c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.musicChange("Bgm14/HonTale"));
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(8810026), c.getPlayer().getPosition());
            MapleMonster mob2 = MapleLifeFactory.getMonster(8150100);
            MapleMonster mob3 = MapleLifeFactory.getMonster(8150101);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob2, c.getPlayer().getPosition());
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob3, c.getPlayer().getPosition());
} else {
      MapleMonster mob0;
      if (splitted[0].equals("!闹钟")) {
        mob0 = MapleLifeFactory.getMonster(8500001);
        c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob0, c.getPlayer().getPosition()); } else {
        int i;
        if (splitted[0].equals("!nxslimes")) {
          for (i = 0; i <= 10; ++i) {
            MapleMonster mob = MapleLifeFactory.getMonster(9400202);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, c.getPlayer().getPosition());
          }
        } else if (splitted[0].equals("!蝙蝠怪")) {
          MapleMonster mob = MapleLifeFactory.getMonster(8130100);
          c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!蝙蝠魔")) {
          MapleMonster mob = MapleLifeFactory.getMonster(8150000);
          c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!御姐")) {
          for (i = 9400100; i <= 9400103; ++i) {
            MapleMonster mob8 = MapleLifeFactory.getMonster(i);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob8, c.getPlayer().getPosition());
          }
          for (i = 9400110; i <= 9400113; ++i) {
            MapleMonster mob1 = MapleLifeFactory.getMonster(i);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob1, c.getPlayer().getPosition());
          }
          for (i = 9400121; i <= 9400122; ++i) {
            MapleMonster mob2 = MapleLifeFactory.getMonster(i);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob2, c.getPlayer().getPosition());
          }
          MapleMonster mob3 = MapleLifeFactory.getMonster(9400300);
          c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob3, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!蘑菇王")) {
          MapleMonster mob = MapleLifeFactory.getMonster(6130101);
          c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!僵尸蘑菇王")) {
          MapleMonster mob = MapleLifeFactory.getMonster(6300005);
          c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!蓝蘑菇王")) {
          MapleMonster mob = MapleLifeFactory.getMonster(9400205);
          c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!theboss")) {
          MapleMonster mob = MapleLifeFactory.getMonster(9400300);
          c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!鲨鱼")) {
          MapleMonster mob = MapleLifeFactory.getMonster(8150100);
          MapleMonster mob1 = MapleLifeFactory.getMonster(8150101);
          c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, c.getPlayer().getPosition());
          c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob1, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!鱼王")) {
          MapleMonster mob = MapleLifeFactory.getMonster(8510000);
          c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!扎昆")) {
          c.getPlayer().getMap().spawnFakeMonsterOnGroundBelow(MapleLifeFactory.getMonster(8800000), c.getPlayer().getPosition());
          for (i = 8800003; i <= 8800010; ++i)
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(i), c.getPlayer().getPosition());
        
        }else if (splitted[0].equals("!黑龙")) {
          c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.musicChange("Bgm14/HonTale"));
          c.getPlayer().getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(8810026), c.getPlayer().getPosition()); 
        } else if (splitted[0].equals("!hplock")) {
            int oid = Integer.parseInt(splitted[1]);
            MapleMonster mmo = c.getPlayer().getMap().getMonsterByOid(oid);
            if (mmo != null) {
                mmo.setHpLock(!mmo.isHpLocked());
                mc.dropMessage("Monster with oID " + oid + " is " + (mmo.isHpLocked() ? "" : "no longer ") + "HP Locked.");
            }
        } else if (splitted[0].equals("!unfreezeoid")) {
            int oid = Integer.parseInt(splitted[1]);
            MapleMonster mmo = c.getPlayer().getMap().getMonsterByOid(oid);
            if (mmo != null) {
                if (mmo.isFake() && mmo.isMoveLocked()) {
                    mmo.setMoveLocked(false);
                    c.getPlayer().getMap().makeMonsterReal(mmo);
                }
                mc.dropMessage("Monster with oID " + oid + " is " + (mmo.isMoveLocked() ? "" : "no longer ") + "Move Locked.");
            }
        }
    }
}
    }

    @Override
    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
                    new CommandDefinition("召唤", "", "Spawns the monster with the given id", 4),
                    new CommandDefinition("攻城活动", "", "", 5),
                    new CommandDefinition("hplock", "", "", 5),
                    new CommandDefinition("闹钟", "", "", 5),
                    new CommandDefinition("蝙蝠怪", "", "", 5),
                    new CommandDefinition("蝙蝠魔", "", "", 5),
                    new CommandDefinition("御姐", "", "", 5),
                    new CommandDefinition("蘑菇王", "", "", 5),
                    new CommandDefinition("僵尸蘑菇王", "", "", 5),
                    new CommandDefinition("蓝蘑菇王", "", "", 5),
                    new CommandDefinition("鲨鱼", "", "", 5),
                    new CommandDefinition("鱼王", "", "", 5),
                    new CommandDefinition("扎昆", "", "", 5),
                    new CommandDefinition("黑龙", "", "", 5),
                    new CommandDefinition("unfreezeoid", "", "", 5)
                };
    }
}