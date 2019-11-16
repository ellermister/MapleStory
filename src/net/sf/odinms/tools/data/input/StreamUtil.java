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

package net.sf.odinms.tools.data.input;

import java.awt.Point;

import net.sf.odinms.tools.data.output.LittleEndianWriter;

/**
 * This class provides an abstraction layer to a coordinate in a little-endian
 * stream of bytes.
 * 
 * @author Frz
 * @since Revision 299
 * @version 1.0
 */
public class StreamUtil {

    /**
     * Read a 2-D coordinate of short integers (x, y).
     * 
     * @param lea The accessor to read the point from.
     * @return A <code>point</code> object read from the accessor.
     */
    public static Point readShortPoint(LittleEndianAccessor lea) {
        int x = lea.readShort();
        int y = lea.readShort();
        return new Point(x, y);
    }

    /**
     * Writes a 2-D coordinate of short integers (x, y).
     * 
     * @param lew The stream-writer to write the point to.
     * @param p The point to write to the stream-writer.
     */
    public static void writeShortPoint(LittleEndianWriter lew, Point p) {
        lew.writeShort(p.x);
        lew.writeShort(p.y);
    }
}
