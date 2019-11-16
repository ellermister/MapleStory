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
package net.sf.odinms.provider.wz;

import java.io.File;
import java.io.FileInputStream;
import net.sf.odinms.tools.data.input.LittleEndianAccessor;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/*
 * Ported Code, see WZFile.java for more info
 */
public class WZTool {

    private static Logger log = LoggerFactory.getLogger(WZTool.class);
    private static byte[] encKey;
    

    static {
        File keyFile = new File("Cms.hex");
        try {
            FileInputStream fis = new FileInputStream(keyFile);
            encKey = new byte[65535];
            fis.read(encKey);
            fis.close();
        } catch (Exception ex) {
            log.error("文件所需要的加密匙丢失.");
            ex.printStackTrace();
        }
    }

    private WZTool() {
    }

    public static byte[] readListString(byte[] str) {
        for (int i = 0; i < str.length; i++) {
            str[i] = (byte) (str[i] ^ encKey[i]);
        }
        return str;
    }

    public static String readDecodedString(LittleEndianAccessor llea) {
        int strLength;
        byte b = llea.readByte();
        if (b == 0x00) {
            return "";
        }
        if (b >= 0) {
            if (b == 0x7F) {
                strLength = llea.readInt();
            } else {
                strLength = (int) b;
            }
            if (strLength < 0) {
                log.error("Strlength < 0");
                return "";
            }
            byte str[] = new byte[strLength * 2];
            for (int i = 0; i < strLength * 2; i++) {
                str[i] = llea.readByte();
            }
            return DecryptUnicodeStr(str);
        } else {
            if (b == -128) {
                strLength = llea.readInt();
            } else {
                strLength = (int) (-b);
            }
            if (strLength < 0) {
                log.error("Strlength < 0");
                return "";
            }
            byte str[] = new byte[strLength];
            for (int i = 0; i < strLength; i++) {
                str[i] = llea.readByte();
            }
            return DecryptAsciiStr(str);
        }
    }

    public static String DecryptAsciiStr(byte[] str) {
        byte xorByte = (byte) 0xAA;
        for (int i = 0; i < str.length; i++) {
            str[i] = (byte) (str[i] ^ xorByte ^ encKey[i]);
            xorByte++;
        }
        return new String(str);
    }

    public static String DecryptUnicodeStr(byte[] str) {
        int xorChar = 0xAAAA;
        char[] charRet = new char[str.length / 2];
        for (int i = 0; i < str.length; i++) {
            str[i] = (byte) (str[i] ^ encKey[i]);
        }
        for (int i = 0; i < (str.length / 2); i++) {
            char toXor = (char) ((str[i] << 8) | str[i + 1]);
            charRet[i] = (char) (toXor ^ xorChar);
            xorChar++;
        }
        return String.valueOf(charRet);
    }

    public static String readDecodedStringAtOffset(SeekableLittleEndianAccessor slea, int offset) {
        slea.seek(offset);
        return readDecodedString(slea);
    }

    public static String readDecodedStringAtOffsetAndReset(SeekableLittleEndianAccessor slea, int offset) {
        long pos = slea.getPosition();
        slea.seek(offset);
        String ret = readDecodedString(slea);
        slea.seek(pos);
        return ret;
    }

    public static int readValue(LittleEndianAccessor lea) {
        byte b = lea.readByte();
        if (b == -128) {
            return lea.readInt();
        } else {
            return ((int) b);
        }
    }

    public static float readFloatValue(LittleEndianAccessor lea) {
        byte b = lea.readByte();
        if (b == -128) {
            return lea.readFloat();
        } else {
            return 0;
        }
    }
}