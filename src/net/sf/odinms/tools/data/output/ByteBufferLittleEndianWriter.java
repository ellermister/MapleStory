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

package net.sf.odinms.tools.data.output;

import org.apache.mina.common.ByteBuffer;

/**
 * Uses a <code>org.apache.mina.common.ByteBuffer</code> to implement
 * a generic little-endian sequence of bytes.
 * 
 * @author Frz
 * @version 1.0
 * @since Revision 323
 */
public class ByteBufferLittleEndianWriter extends GenericLittleEndianWriter {

    private ByteBuffer bb;

    /**
     * Constructor - Constructs this object as fixed at the default size.
     */
    public ByteBufferLittleEndianWriter() {
        this(200, true);
    }

    /**
     * Constructor - Constructs this object as fixed at size <code>size</code>.
     * 
     * @param size The size of the fixed bytebuffer.
     */
    public ByteBufferLittleEndianWriter(int size) {
        this(size, false);
    }

    /**
     * Constructor - Constructs this object as optionally fixed at size <code>size</code>.
     * 
     * @param initialSize The size of the fixed bytebuffer.
     * @param autoExpand Expand if needed.
     */
    public ByteBufferLittleEndianWriter(int initialSize, boolean autoExpand) {
        bb = ByteBuffer.allocate(initialSize);
        bb.setAutoExpand(autoExpand);
        setByteOutputStream(new ByteBufferOutputstream(bb));
    }

    /**
     * Returns a flipped version of the underlying bytebuffer.
     * 
     * @return A flipped version of the underlying bytebuffer.
     */
    public ByteBuffer getFlippedBB() {
        return bb.flip();
    }

    /**
     * Returns the underlying bytebuffer.
     * 
     * @return The underlying bytebuffer.
     */
    public ByteBuffer getByteBuffer() {
        return bb;
    }
}
