/*
玩家移动
*/

/*package net.sf.odinms.net.channel.handler;

import java.util.ConcurrentModificationException;
import java.util.List;

import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.anticheat.CheatingOffense;
import net.sf.odinms.server.movement.AbsoluteLifeMovement;
import net.sf.odinms.server.movement.LifeMovementFragment;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class MovePlayerHandler extends AbstractMovementPacketHandler {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(MovePlayerHandler.class);

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
       // slea.readByte();
       // slea.readLong();
       // slea.readLong();//v079
       // slea.readLong();//v079
       // slea.readLong();//v079
    slea.skip(24);
    slea.readByte();
    slea.readInt();
    slea.readInt();
        List<LifeMovementFragment> res = parseMovement(slea);
        c.getPlayer().setLastRes(res);
        if (res != null) {
            if (slea.available() != 18) {
                log.warn("slea.available != 18 (运动分析误差)");
                return;
            }
            MapleCharacter player = c.getPlayer();
            try {
                if (!player.isHidden()) {
                    c.getPlayer().getMap().broadcastMessage(player, MaplePacketCreator.movePlayer(player.getId(), res), false);
                }
                if (CheatingOffense.FAST_MOVE.isEnabled() || CheatingOffense.HIGH_JUMP.isEnabled()) {
                    checkMovementSpeed(player, res);
                }
                updatePosition(res, player, 0);
                player.getMap().movePlayer(player, player.getPosition());
            } catch (ConcurrentModificationException cme) {
            } catch (Exception e) {
                log.warn("Failed to move player (" + player.getName() + ")");
            }
        }
    }

    private static void checkMovementSpeed(MapleCharacter chr, List<LifeMovementFragment> moves) {
        double playerSpeedMod = chr.getSpeedMod() + 0.005;
        boolean encounteredUnk0 = false;
        for (LifeMovementFragment lmf : moves) {
            if (lmf.getClass() == AbsoluteLifeMovement.class) {
                final AbsoluteLifeMovement alm = (AbsoluteLifeMovement) lmf;
                double speedMod = Math.abs(alm.getPixelsPerSecond().x) / 125.0;
                if (speedMod > playerSpeedMod) {
                    if (alm.getUnk() == 0) { // to prevent FJ fucking us
                        encounteredUnk0 = true;
                    }
                    if (!encounteredUnk0) {
                        if (speedMod > playerSpeedMod) {
                            chr.getCheatTracker().registerOffense(CheatingOffense.FAST_MOVE);
                        }
                    }
                }
            }
        }
    }
} */
package net.sf.odinms.net.channel.handler;

import java.util.ConcurrentModificationException;
import java.util.List;

import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.anticheat.CheatingOffense;
import net.sf.odinms.server.movement.AbsoluteLifeMovement;
import net.sf.odinms.server.movement.LifeMovementFragment;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class MovePlayerHandler extends AbstractMovementPacketHandler {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(MovePlayerHandler.class);

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        slea.readByte();
        slea.readLong();
        slea.readLong();//v079
        slea.readLong();//v079
        slea.readLong();//v079
        List<LifeMovementFragment> res = parseMovement(slea);
        c.getPlayer().setLastRes(res);
        if (res != null) {
            if (slea.available() != 18) {
                log.warn("slea.available != 18 (movement parsing error)");
                return;
            }
            MapleCharacter player = c.getPlayer();
            try {
                if (!player.isHidden()) {
                    c.getPlayer().getMap().broadcastMessage(player, MaplePacketCreator.movePlayer(player.getId(), res), false);
                }
                if (CheatingOffense.FAST_MOVE.isEnabled() || CheatingOffense.HIGH_JUMP.isEnabled()) {
                    checkMovementSpeed(player, res);
                }
                updatePosition(res, player, 0);
                player.getMap().movePlayer(player, player.getPosition());
            } catch (ConcurrentModificationException cme) {
            } catch (Exception e) {
                log.warn("Failed to move player (" + player.getName() + ")");
            }
        }
    }

    private static void checkMovementSpeed(MapleCharacter chr, List<LifeMovementFragment> moves) {
        double playerSpeedMod = chr.getSpeedMod() + 0.005;
        boolean encounteredUnk0 = false;
        for (LifeMovementFragment lmf : moves) {
            if (lmf.getClass() == AbsoluteLifeMovement.class) {
                final AbsoluteLifeMovement alm = (AbsoluteLifeMovement) lmf;
                double speedMod = Math.abs(alm.getPixelsPerSecond().x) / 125.0;
                if (speedMod > playerSpeedMod) {
                    if (alm.getUnk() == 0) { // to prevent FJ fucking us
                        encounteredUnk0 = true;
                    }
                    if (!encounteredUnk0) {
                        if (speedMod > playerSpeedMod) {
                            chr.getCheatTracker().registerOffense(CheatingOffense.FAST_MOVE);
                        }
                    }
                }
            }
        }
    }
}