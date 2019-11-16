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

package net.sf.odinms.net.world;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import net.sf.odinms.tools.Pair;

/**
 *
 * @author Danny
 */
@SuppressWarnings("serial")
public class PlayerBuffStorage implements Serializable {

    private List<Pair<Integer, List<PlayerBuffValueHolder>>> buffs = new ArrayList<Pair<Integer, List<PlayerBuffValueHolder>>>();
    private int id = (int) (Math.random() * 100);
    private List<Pair<Integer, List<PlayerCoolDownValueHolder>>> coolDowns = new ArrayList<Pair<Integer, List<PlayerCoolDownValueHolder>>>();
    public void addBuffsToStorage(int chrid, List<PlayerBuffValueHolder> toStore) {
        for (Pair<Integer, List<PlayerBuffValueHolder>> stored : buffs) {
            if (stored.getLeft() == Integer.valueOf(chrid)) {
                buffs.remove(stored);
            }
        }
        buffs.add(new Pair<Integer, List<PlayerBuffValueHolder>>(Integer.valueOf(chrid), toStore));
    }

    public List<PlayerBuffValueHolder> getBuffsFromStorage(int chrid) {
        List<PlayerBuffValueHolder> ret = null;
        Pair<Integer, List<PlayerBuffValueHolder>> stored;
        for (int i = 0; i < buffs.size(); i++) {
            stored = buffs.get(i);
            if (stored.getLeft().equals(Integer.valueOf(chrid))) {
                ret = stored.getRight();
                buffs.remove(stored);
            }
        }
        return ret;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        return result;
    }
public void addCooldownsToStorage(int chrid, List<PlayerCoolDownValueHolder> toStore) {
		for (Pair<Integer, List<PlayerCoolDownValueHolder>> stored : coolDowns) {
			if (stored.getLeft() == Integer.valueOf(chrid)) {
				coolDowns.remove(stored);
			}
		}
		coolDowns.add(new Pair<Integer, List<PlayerCoolDownValueHolder>>(Integer.valueOf(chrid), toStore));
	}
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final PlayerBuffStorage other = (PlayerBuffStorage) obj;
        if (id != other.id) {
            return false;
        }
        return true;
    }
}
