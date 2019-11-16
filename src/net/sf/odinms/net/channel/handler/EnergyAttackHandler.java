package net.sf.odinms.net.channel.handler;

import java.util.ArrayList;
import java.util.List;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.server.MapleStatEffect;
import net.sf.odinms.tools.Pair;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author Danny
 */
public class EnergyAttackHandler extends AbstractDealDamageHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        slea.readByte();
        AttackInfo attack = new AttackInfo();
        attack.numAttackedAndDamage = slea.readByte();
        attack.numAttacked = (attack.numAttackedAndDamage >>> 4) & 0xF;
        attack.numDamage = attack.numAttackedAndDamage & 0xF;
        attack.skill = slea.readInt();
        slea.readInt();
        attack.stance = slea.readByte();
        attack.direction = slea.readByte();
        slea.readByte();
        attack.speed = slea.readByte();
        slea.readInt();
        slea.readInt();
        attack.allDamage = new ArrayList<Pair<Integer, List<Integer>>>();
        for (int i = 0; i < attack.numAttacked; i++) {
            int oid = slea.readInt();
            slea.readByte();
            slea.skip(13);
            List<Integer> allDamageNumbers = new ArrayList<Integer>();
            for (int j = 0; j < attack.numDamage; j++) {
                allDamageNumbers.add(slea.readInt());
            }
            attack.allDamage.add(new Pair<Integer, List<Integer>>(oid, allDamageNumbers));
        }
        int maxdamage = c.getPlayer().getCurrentMaxBaseDamage();
        MapleStatEffect effect = attack.getAttackEffect(c.getPlayer());
        if (effect != null) {
            maxdamage *= effect.getDamage() / 100.0;
        }
        applyAttack(attack, c.getPlayer(), maxdamage, 1);
    }
}