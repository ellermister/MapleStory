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

package net.sf.odinms.tools;

/**
 *
 * @author Patrick/PurpleMadness
 */
public class ReadableMillisecondFormat {

    public long milliseconds;

    public ReadableMillisecondFormat(long milliseconds) {
        this.milliseconds = milliseconds;
    }

    public int getSeconds(boolean withMinutes) {
        return (int) Math.floor(((double) milliseconds / 1000) % (withMinutes ? 60 : 0));
    }

    public int getMinutes(boolean withHours) {
        if (getSeconds(false) == 0) {
            return 0;
        }
        return (int) Math.floor((getSeconds(false) / 60) % (withHours ? 60 : 0));
    }

    public int getHours() {
        if (getMinutes(false) == 0) {
            return 0;
        }
        return (int) Math.floor(getMinutes(false) / 60);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        if (getHours() > 0) {
            sb.append(getHours() + " hours,");
        }
        if (getMinutes(false) > 0) {
            sb.append(getMinutes(true) + " minutes,");
        }
        sb.append(sb.length() > 0 ? " and " : "");
        sb.append(getSeconds(true) + " seconds.");
        return sb.toString();
    }
}
