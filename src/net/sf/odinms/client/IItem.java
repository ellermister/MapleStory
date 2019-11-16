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
import java.util.List;

public interface IItem extends Comparable<IItem> {

    public final int PET = 3;
    public final int ITEM = 2;
    public final int EQUIP = 1;
    public void setFlag(byte b);

    byte getFlag();

    byte getType();

    byte getPosition();

    void setPosition(byte position);

    int getItemId();

    short getQuantity();

    String getOwner();

    int getPetId();

    IItem copy();

    void setOwner(String owner);

    void setQuantity(short quantity);

    public void log(String msg, boolean fromDB);

    List<String> getLog();

    Timestamp getExpiration();

    void setExpiration(Timestamp expire);

    int getSN();

    int getUniqueId();

    void setUniqueId(int id);

    void setSN(int sn);
    
    boolean 友谊戒指();
    
    boolean 恋人戒指();
    
    boolean 结婚戒指();
}