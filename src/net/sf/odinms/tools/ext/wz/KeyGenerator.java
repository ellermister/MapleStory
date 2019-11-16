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

package net.sf.odinms.tools.ext.wz;

import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

/**
 *
 * @author Danny
 */
public class KeyGenerator {

    public static void main(String[] args) {
        System.out.println("启动密匙生成...");
        byte[] iv = new byte[]{(byte) 0x4d, (byte) 0x23, (byte) 0xc7, (byte) 0x2b,
            (byte) 0x4d, (byte) 0x23, (byte) 0xc7, (byte) 0x2b,
            (byte) 0x4d, (byte) 0x23, (byte) 0xc7, (byte) 0x2b,
            (byte) 0x4d, (byte) 0x23, (byte) 0xc7, (byte) 0x2b,
        };
        byte[] key = new byte[]{(byte) 0x13, 0x00, 0x00, 0x00,
            (byte) 0x08, 0x00, 0x00, 0x00,
            (byte) 0x06, 0x00, 0x00, 0x00,
            (byte) 0xB4, 0x00, 0x00, 0x00,
            (byte) 0x1B, 0x00, 0x00, 0x00,
            (byte) 0x0F, 0x00, 0x00, 0x00,
            (byte) 0x33, 0x00, 0x00, 0x00,
            (byte) 0x52, 0x00, 0x00, 0x00
        };

        System.out.println("开始初始化 AES 加解密系统...");

        Cipher cipher = null;
        SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");

        try {
            cipher = Cipher.getInstance("AES");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return;
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
            return;
        }

        try {
            cipher.init(Cipher.ENCRYPT_MODE, skeySpec);
        } catch (InvalidKeyException e) {
            e.printStackTrace();
            return;
        }

        System.out.println("密码初始化完成.");

        byte[] encKey = new byte[0xFFFF];

        System.out.println("运行 AES 解密使用 OFB 模式...");
        for (int i = 0; i < 0xFFFF; i += 16) {
            try {
                iv = cipher.doFinal(iv);
            } catch (IllegalBlockSizeException e) {
                e.printStackTrace();
            } catch (BadPaddingException e) {
                e.printStackTrace();
            }
            int len = 16;
            if (i == 0xFFF0) {
                len = 15;
            }
            System.arraycopy(iv, 0, encKey, i, len);
        }
        System.out.println("运行完成.");
        System.out.println("成功生成密匙.");
        System.out.println("正在写入 Cms.key ...");

        File keysFile = new File("Cms.hex");

        try {
            keysFile.createNewFile();
            DataOutputStream dos = new DataOutputStream(new FileOutputStream(keysFile));
            dos.write(encKey);
            dos.flush();
            dos.close();
        } catch (IOException ex) {
            ex.printStackTrace();
            return;
        }

        System.out.println("写入完成.");
        System.out.println("密钥完整生成.");
    }
}