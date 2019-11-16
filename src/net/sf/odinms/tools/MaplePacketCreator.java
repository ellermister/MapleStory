package net.sf.odinms.tools;

import java.awt.Point;
import java.awt.Rectangle;
import java.net.InetAddress;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.Map.Entry;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import net.sf.odinms.client.BuddylistEntry;
import net.sf.odinms.client.IEquip;
import net.sf.odinms.client.IItem;
import net.sf.odinms.client.ISkill;
import net.sf.odinms.client.Item;
import net.sf.odinms.client.MapleBuffStat;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleInventory;
import net.sf.odinms.client.MapleInventoryType;
import net.sf.odinms.client.MapleKeyBinding;
import net.sf.odinms.client.MaplePet;
import net.sf.odinms.client.MapleQuestStatus;
import net.sf.odinms.client.MapleStat;
import net.sf.odinms.client.IEquip.ScrollResult;
import net.sf.odinms.client.MapleDisease;
import net.sf.odinms.client.MapleJob;
import net.sf.odinms.client.MapleMount;
import net.sf.odinms.client.MapleRing;
import net.sf.odinms.client.SkillMacro;
import net.sf.odinms.client.status.MonsterStatus;
import net.sf.odinms.database.DatabaseConnection;
import net.sf.odinms.net.ByteArrayMaplePacket;
import net.sf.odinms.net.MaplePacket;
import net.sf.odinms.net.SendPacketOpcode;
import net.sf.odinms.net.channel.handler.SummonDamageHandler.SummonAttackEntry;
import net.sf.odinms.net.login.LoginServer;
import net.sf.odinms.net.world.MapleParty;
import net.sf.odinms.net.world.MaplePartyCharacter;
import net.sf.odinms.net.world.PartyOperation;
import net.sf.odinms.net.world.PlayerCoolDownValueHolder;
import net.sf.odinms.server.MapleItemInformationProvider;
import net.sf.odinms.server.playerinteractions.*;
import net.sf.odinms.server.MapleStatEffect;
import net.sf.odinms.server.MTSItemInfo;
import net.sf.odinms.server.playerinteractions.HiredMerchant;
import net.sf.odinms.server.playerinteractions.MaplePlayerShop;
import net.sf.odinms.server.life.MapleMonster;
import net.sf.odinms.server.life.MapleNPC;
import net.sf.odinms.server.maps.MapleMap;
import net.sf.odinms.server.maps.MapleReactor;
import net.sf.odinms.server.movement.LifeMovementFragment;
import net.sf.odinms.tools.data.output.LittleEndianWriter;
import net.sf.odinms.tools.data.output.MaplePacketLittleEndianWriter;
import net.sf.odinms.net.world.guild.*;
import net.sf.odinms.client.MapleCSInventory;
import net.sf.odinms.client.MapleCSInventoryItem;
import net.sf.odinms.net.LongValueHolder;
import net.sf.odinms.server.MapleDueyActions;
import net.sf.odinms.server.MapleShopItem;
import net.sf.odinms.server.MapleTrade;
import net.sf.odinms.server.constants.Items;
import net.sf.odinms.server.constants.ServerConstants;
import net.sf.odinms.server.life.MobSkill;
import net.sf.odinms.server.maps.MapleMist;
import net.sf.odinms.server.maps.MapleSummon;

/**
 * Provides all MapleStory packets needed in one place.
 *
 * @author Frz
 * @since Revision 259
 * @version 1.0
 */
public class MaplePacketCreator {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(MaplePacketCreator.class);
    private final static byte[] CHAR_INFO_MAGIC = new byte[]{(byte) 0xff, (byte) 0xc9, (byte) 0x9a, 0x3b};
    public static final List<Pair<MapleStat, Integer>> EMPTY_STATUPDATE = Collections.emptyList();
    private final static long FINAL_TIME = 3439785600000L;

    /**
     * Sends a hello packet.
     *
     * @param mapleVersion The maple client version.
     * @param sendIv the IV used by the server for sending
     * @param recvIv the IV used by the server for receiving
     * @param testServer
     * @return
     */
    public static MaplePacket getHello(short mapleVersion, byte[] sendIv, byte[] recvIv, boolean testServer) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(16);

        mplew.writeShort(0x0d);
        mplew.writeShort(mapleVersion);
        mplew.write(new byte[]{0, 0});
        mplew.write(recvIv);
        mplew.write(sendIv);
        mplew.write(testServer ? 5 : 4);

        return mplew.getPacket();
    }

    /**
     * Sends a ping packet.
     *
     * @return The packet.
     */
    public static MaplePacket getPing() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(16);

        mplew.writeShort(SendPacketOpcode.PING.getValue());

        return mplew.getPacket();
    }

    /**
     * Gets a login failed packet.
     *
     * Possible values for <code>reason</code>:<br>
     * 3: ID deleted or blocked<br>
     * 4: Incorrect password<br>
     * 5: Not a registered id<br>
     * 6: System error<br>
     * 7: Already logged in<br>
     * 8: System error<br>
     * 9: System error<br>
     * 10: Cannot process so many connections<br>
     * 11: Only users older than 20 can use this channel<br>
     * 13: Unable to log on as master at this ip<br>
     * 14: Wrong gateway or personal info and weird korean button<br>
     * 15: Processing request with that korean button!<br>
     * 16: Please verify your account through email...<br>
     * 17: Wrong gateway or personal info<br>
     * 21: Please verify your account through email...<br>
     * 23: License agreement<br>
     * 25: Maple Europe notice =[<br>
     * 27: Some weird full client notice, probably for trial versions<br>
     *
     * @param reason The reason logging in failed.
     * @return The login failed packet.
     */
    public static MaplePacket getLoginFailed(int reason) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(16);

        mplew.writeShort(SendPacketOpcode.LOGIN_STATUS.getValue());
        mplew.writeInt(reason);
        mplew.writeShort(0);

        return mplew.getPacket();
    }

    public static MaplePacket getPermBan(byte reason) {
        // 00 00 02 00 01 01 01 01 01 00
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(16);

        mplew.writeShort(SendPacketOpcode.LOGIN_STATUS.getValue());
        mplew.writeShort(0x02); // Account is banned
        mplew.write(0x0);
        mplew.write(reason);
        mplew.write(HexTool.getByteArrayFromHexString("01 01 01 01 00"));

        return mplew.getPacket();
    }

    public static MaplePacket getTempBan(long timestampTill, byte reason) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(17);

        mplew.writeShort(SendPacketOpcode.LOGIN_STATUS.getValue());
        mplew.write(0x02);
        mplew.write(HexTool.getByteArrayFromHexString("00 00 00 00 00")); // Account is banned
        mplew.write(reason);
        mplew.writeLong(timestampTill); // Tempban date is handled as a 64-bit long, number of 100NS intervals since 1/1/1601. Lulz.

        return mplew.getPacket();
    }

    /**
     * Gets a successful authentication and PIN Request packet.
     *
     * @param account The account name.
     * @return The successful authentication packet.
     */
    public static MaplePacket getAuthSuccess(MapleClient c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LOGIN_STATUS.getValue());
        mplew.writeInt(1632938240);
        mplew.write(0);
        mplew.write((byte) c.getGender());
        mplew.writeShort(0);
        mplew.writeMapleAsciiString(c.getAccountName());
        mplew.write(HexTool.getByteArrayFromHexString("00 00 00 03 01 00 00 00 E2 ED A3 7A FA C9 01"));
        mplew.writeInt(0);
        mplew.writeLong(0);
        mplew.writeMapleAsciiString(String.valueOf(c.getAccID()));
        mplew.writeMapleAsciiString(c.getAccountName());
        mplew.write(1);

        return mplew.getPacket();
    }

    public static MaplePacket licenseRequest() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LOGIN_STATUS.getValue());
        mplew.write((byte) 0x16);
        return mplew.getPacket();
    }

    public static MaplePacket licenseResult() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LICENSE_RESULT.getValue());
        mplew.write(1);
        return mplew.getPacket();
    }

    public static MaplePacket genderChanged(MapleClient c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(3);

        mplew.writeShort(SendPacketOpcode.GENDER_SET.getValue());
        mplew.write(0);
        mplew.writeMapleAsciiString(c.getAccountName());
        mplew.writeMapleAsciiString(String.valueOf(c.getAccID()));

        return mplew.getPacket();
    }

    public static MaplePacket genderNeeded(MapleClient c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(3);

        mplew.writeShort(SendPacketOpcode.CHOOSE_GENDER.getValue());
        mplew.writeMapleAsciiString(c.getAccountName());

        return mplew.getPacket();
    }

    /**
     * Gets a packet detailing a PIN operation.
     *
     * Possible values for <code>mode</code>:<br>
     * 0 - PIN was accepted<br>
     * 1 - Register a new PIN<br>
     * 2 - Invalid pin / Reenter<br>
     * 3 - Connection failed due to system error<br>
     * 4 - Enter the pin
     *
     * @param mode The mode.
     * @return PIN Operation packet
     */
    public static MaplePacket pinOperation(byte mode) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(3);

        mplew.writeShort(SendPacketOpcode.PIN_OPERATION.getValue());
        mplew.write(mode);

        return mplew.getPacket();
    }

    public static MaplePacket pinAssigned() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(3);

        mplew.writeShort(SendPacketOpcode.PIN_ASSIGNED.getValue());
        mplew.write(0);

        return mplew.getPacket();
    }

    /**
     * Gets a packet detailing a server and its channels.
     *
     * @param serverIndex The index of the server to create information about.
     * @param serverName The name of the server.
     * @param channelLoad Load of the channel - 1200 seems to be max.
     * @return The server info packet.
     */
    public static MaplePacket getServerList(int serverId, String serverName, Map<Integer, Integer> channelLoad) {
        /*
         * 0B 00 00 06 00 53 63 61 6E 69 61 00 00 00 64 00 64 00 00 13 08 00 53 63 61 6E 69 61 2D 31 5E 04 00 00 00 00
         * 00 08 00 53 63 61 6E 69 61 2D 32 25 01 00 00 00 01 00 08 00 53 63 61 6E 69 61 2D 33 F6 00 00 00 00 02 00 08
         * 00 53 63 61 6E 69 61 2D 34 BC 00 00 00 00 03 00 08 00 53 63 61 6E 69 61 2D 35 E7 00 00 00 00 04 00 08 00 53
         * 63 61 6E 69 61 2D 36 BC 00 00 00 00 05 00 08 00 53 63 61 6E 69 61 2D 37 C2 00 00 00 00 06 00 08 00 53 63 61
         * 6E 69 61 2D 38 BB 00 00 00 00 07 00 08 00 53 63 61 6E 69 61 2D 39 C0 00 00 00 00 08 00 09 00 53 63 61 6E 69
         * 61 2D 31 30 C3 00 00 00 00 09 00 09 00 53 63 61 6E 69 61 2D 31 31 BB 00 00 00 00 0A 00 09 00 53 63 61 6E 69
         * 61 2D 31 32 AB 00 00 00 00 0B 00 09 00 53 63 61 6E 69 61 2D 31 33 C7 00 00 00 00 0C 00 09 00 53 63 61 6E 69
         * 61 2D 31 34 B9 00 00 00 00 0D 00 09 00 53 63 61 6E 69 61 2D 31 35 AE 00 00 00 00 0E 00 09 00 53 63 61 6E 69
         * 61 2D 31 36 B6 00 00 00 00 0F 00 09 00 53 63 61 6E 69 61 2D 31 37 DB 00 00 00 00 10 00 09 00 53 63 61 6E 69
         * 61 2D 31 38 C7 00 00 00 00 11 00 09 00 53 63 61 6E 69 61 2D 31 39 EF 00 00 00 00 12 00
         */
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SERVERLIST.getValue());
        mplew.write(serverId);
        mplew.writeMapleAsciiString(serverName);
        mplew.write(LoginServer.getInstance().getFlag());
        mplew.writeMapleAsciiString(LoginServer.getInstance().getEventMessage());
        mplew.write(0x64); // rate modifier, don't ask O.O!
        mplew.write(0x0); // event xp * 2.6 O.O!
        mplew.write(0x64); // rate modifier, don't ask O.O!
        mplew.write(0x0); // drop rate * 2.6

        int lastChannel = 1;
        Set<Integer> channels = channelLoad.keySet();
        for (int i = 30; i > 0; i--) {
            if (channels.contains(i)) {
                lastChannel = i;
                break;
            }
        }
        mplew.write(lastChannel);
        mplew.writeInt(500);
        int load;
        for (int i = 1; i <= lastChannel; i++) {
            if (channels.contains(i)) {
                load = channelLoad.get(i);
            } else {
                load = 1200;
            }
            mplew.writeMapleAsciiString(serverName + "-" + i);
            mplew.writeInt(load);
            mplew.write(0);
            mplew.writeShort(i - 1);
        }
        mplew.writeShort(0);

        return mplew.getPacket();
    }

    /**
     * Gets a packet saying that the server list is over.
     *
     * @return The end of server list packet.
     */
    public static MaplePacket getEndOfServerList() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SERVERLIST.getValue());
        mplew.write(0xFF);

        return mplew.getPacket();
    }

    /**
     * Gets a packet detailing a server status message.
     *
     * Possible values for <code>status</code>:<br>
     * 0 - Normal<br>
     * 1 - Highly populated<br>
     * 2 - Full
     *
     * @param status The server status.
     * @return The server status packet.
     */
    public static MaplePacket getServerStatus(int status) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SERVERSTATUS.getValue());
        mplew.write(status);

        return mplew.getPacket();
    }

    /**
     * Gets a packet telling the client the IP of the channel server.
     *
     * @param inetAddr The InetAddress of the requested channel server.
     * @param port The port the channel is on.
     * @param clientId The ID of the client.
     * @return The server IP packet.
     */
    public static MaplePacket getServerIP(InetAddress inetAddr, int port, int clientId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SERVER_IP.getValue());
        mplew.writeShort(0);
        byte[] addr = inetAddr.getAddress();
        mplew.write(addr);
        mplew.writeShort(port);
        // 0x13 = numchannels?
        mplew.writeInt(clientId); // this gets repeated to the channel server
        // leos.write(new byte[] { (byte) 0x13, (byte) 0x37, 0x42, 1, 0, 0, 0, 0, 0 });
        mplew.write(new byte[]{1, 0, 0, 0, 0});
        // 0D 00 00 00 3F FB D9 0D 8A 21 CB A8 13 00 00 00 00 00 00

        return mplew.getPacket();
    }

    /**
     * Gets a packet telling the client the IP of the new channel.
     *
     * @param inetAddr The InetAddress of the requested channel server.
     * @param port The port the channel is on.
     * @return The server IP packet.
     */
    public static MaplePacket getChannelChange(InetAddress inetAddr, int port) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CHANGE_CHANNEL.getValue());
        mplew.write(1);
        byte[] addr = inetAddr.getAddress();
        mplew.write(addr);
        mplew.writeShort(port);

        return mplew.getPacket();
    }

    /**
     * Gets a packet with a list of characters.
     *
     * @param c The MapleClient to load characters of.
     * @param serverId The ID of the server requested.
     * @return The character list packet.
     */
    public static MaplePacket getCharList(MapleClient c, int serverId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CHARLIST.getValue());
        mplew.write(0);
        mplew.writeInt(0);
        List<MapleCharacter> chars = c.loadCharacters(serverId);
        mplew.write((byte) chars.size());
        for (MapleCharacter chr : chars) {
            addCharEntry(mplew, chr);
        }
        mplew.writeShort(3);
        mplew.writeInt(LoginServer.getInstance().getMaxCharacters());

        return mplew.getPacket();
    }

    /**
     * Adds character stats to an existing MaplePacketLittleEndianWriter.
     *
     * @param mplew The MaplePacketLittleEndianWrite instance to write the stats to.
     * @param chr The character to add the stats of.
     */
    private static void addCharStats(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        mplew.writeInt(chr.getId()); // 角色ID
        mplew.writeAsciiString(chr.getName());  //自动填充到13位
        for (int x = chr.getName().getBytes().length; x < 13; x++) { // fill to maximum name length
            mplew.write(0);
        }
        mplew.write(chr.getGender()); // 性别 (0 = 男, 1 = 女)
        mplew.write(chr.getSkinColor().getId()); // 皮肤
        mplew.writeInt(chr.getFace()); // 脸型
        mplew.writeInt(chr.getHair()); // 发型
        mplew.writeLong(0);
        mplew.writeLong(0);
        mplew.writeLong(0);
        mplew.write(chr.getLevel()); // level
        mplew.writeShort(chr.getJob().getId()); // job
        mplew.writeShort(chr.getStr()); // str
        mplew.writeShort(chr.getDex()); // dex
        mplew.writeShort(chr.getInt()); // int
        mplew.writeShort(chr.getLuk()); // luk
        mplew.writeShort(chr.getHp()); // hp (?)
        mplew.writeShort(chr.getMaxHp()); // 最大HP
        mplew.writeShort(chr.getMp()); // mp (?)
        mplew.writeShort(chr.getMaxMp());  //最大MP
        mplew.writeShort(chr.getRemainingAp()); // 剩余AP
        mplew.writeShort(chr.getRemainingSp()); //// 剩余SP 
        mplew.writeInt(chr.getExp()); //当前经验
        mplew.writeShort(chr.getFame()); // fame
        mplew.writeInt(0);
        mplew.writeLong(DateUtil.getFileTimestamp(System.currentTimeMillis()));
        mplew.writeInt(chr.getMapId()); // current map id
        mplew.write(chr.getInitialSpawnpoint()); // spawnpoint
    }

    /**
     * Adds the aesthetic aspects of a character to an existing
     * MaplePacketLittleEndianWriter.
     *
     * @param mplew The MaplePacketLittleEndianWrite instance to write the stats to.
     * @param chr The character to add the looks of.
     * @param mega Unknown
     */
    private static void addCharLook(MaplePacketLittleEndianWriter mplew, MapleCharacter chr, boolean mega) {
        mplew.write(chr.getGender());
        mplew.write(chr.getSkinColor().getId()); // skin color
        mplew.writeInt(chr.getFace()); // face
        mplew.write(mega ? 0 : 1);
        mplew.writeInt(chr.getHair()); // hair
        MapleInventory equip = chr.getInventory(MapleInventoryType.EQUIPPED);
        Map<Byte, Integer> myEquip = new LinkedHashMap<Byte, Integer>();
        Map<Byte, Integer> maskedEquip = new LinkedHashMap<Byte, Integer>();
        synchronized (equip) {
            for (IItem item : equip.list()) {
                byte pos = (byte) (item.getPosition() * -1);
                if (pos < 100 && myEquip.get(pos) == null) {
                    myEquip.put(pos, item.getItemId());
                } else if ((pos > 100 || pos == -128) && pos != 111) {
                    pos -= 100;
                    if (myEquip.get(pos) != null) {
                        maskedEquip.put(pos, myEquip.get(pos));
                    }
                    myEquip.put(pos, item.getItemId());
                } else if (myEquip.get(pos) != null) {
                    maskedEquip.put(pos, item.getItemId());
                }
            }
            for (Entry<Byte, Integer> entry : myEquip.entrySet()) {
                mplew.write(entry.getKey());
                mplew.writeInt(entry.getValue());
            }
            mplew.write(0xFF); // end of visible itens
            // masked itens

            for (Entry<Byte, Integer> entry : maskedEquip.entrySet()) {
                mplew.write(entry.getKey());
                mplew.writeInt(entry.getValue());
            }
            /*
             * for (IItem item : equip.list()) { byte pos = (byte)(item.getPosition() * -1); if (pos > 100) {
             * mplew.write(pos - 100); mplew.writeInt(item.getItemId()); } }
             */
            // ending markers
            mplew.write(0xFF);
            IItem cWeapon = equip.getItem((byte) -111);
            if (cWeapon != null) {
                mplew.writeInt(cWeapon.getItemId());
            } else {
                mplew.writeInt(0); // cashweapon
            }
        }
        mplew.writeInt(0);
        mplew.writeLong(0);
    }

    private static void addInventoryInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        mplew.write(1);
        mplew.writeMapleAsciiString(chr.getName());
      //mplew.writeInt(chr.getCSPoints(1));//抵用卷
        mplew.writeInt(chr.getMeso()); //冒险币
        mplew.writeInt(chr.getId());
        mplew.writeLong(0);
        mplew.write(chr.getInventory(MapleInventoryType.EQUIP).getSlots()); // equip slots
        mplew.write(chr.getInventory(MapleInventoryType.USE).getSlots()); // use slots
        mplew.write(chr.getInventory(MapleInventoryType.SETUP).getSlots()); // set-up slots
        mplew.write(chr.getInventory(MapleInventoryType.ETC).getSlots()); // etc slots
        mplew.write(chr.getInventory(MapleInventoryType.CASH).getSlots()); // cash slots
        mplew.writeLong(DateUtil.getFileTimestamp(System.currentTimeMillis()));
        MapleInventory iv = chr.getInventory(MapleInventoryType.EQUIPPED);
        Collection<IItem> equippedC = iv.list();
        List<Item> equipped = new ArrayList<Item>(equippedC.size());
        synchronized (iv) {
            for (IItem item : equippedC) {
                if (((Item) item).getPosition() > -100) {
                    equipped.add((Item) item);
                }
            }
        }
        Collections.sort(equipped);
        for (Item item : equipped) {
            addItemInfo(mplew, item);
        }
        mplew.write(0); // start of equiped cash inventory
        equipped.clear();
        synchronized (iv) {
            for (IItem item : equippedC) {
                if (((Item) item).getPosition() < -100) {
                    equipped.add((Item) item);
                }
            }
        }
        Collections.sort(equipped);
        for (Item item : equipped) {
            addItemInfo(mplew, item);
        }
        mplew.write(0); // start of equip inventory
        iv = chr.getInventory(MapleInventoryType.EQUIP);
        synchronized (iv) {
            for (IItem item : iv.list()) {
                addItemInfo(mplew, item);
            }
        }
        mplew.write(0); // start of use inventory
        // addItemInfo(mplew, new Item(2020028, (byte) 8, (short) 1));
        iv = chr.getInventory(MapleInventoryType.USE);
        synchronized (iv) {
            for (IItem item : iv.list()) {
                addItemInfo(mplew, item);
            }
        }
        mplew.write(0); // start of set-up inventory
        iv = chr.getInventory(MapleInventoryType.SETUP);
        synchronized (iv) {
            for (IItem item : iv.list()) {
                addItemInfo(mplew, item);
            }
        }
        mplew.write(0); // start of etc inventory
        iv = chr.getInventory(MapleInventoryType.ETC);
        synchronized (iv) {
            for (IItem item : iv.list()) {
                addItemInfo(mplew, item);
            }
        }
        mplew.write(0); // start of cash inventory
        iv = chr.getInventory(MapleInventoryType.CASH);
        synchronized (iv) {
            for (IItem item : iv.list()) {
                addItemInfo(mplew, item);
            }
        }
    }

    private static void addSkillRecord(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        mplew.write(0); // start of skills
        Map<ISkill, MapleCharacter.SkillEntry> skills = chr.getSkills();
        mplew.writeShort(skills.size());
        for (Entry<ISkill, MapleCharacter.SkillEntry> skill : skills.entrySet()) {
            mplew.writeInt(skill.getKey().getId());
            mplew.writeInt(skill.getValue().skillevel);
            if (skill.getKey().isFourthJob()) {
                mplew.writeInt(skill.getValue().masterlevel);
            }
        }
        mplew.writeShort(chr.getAllCooldowns().size());
        for (PlayerCoolDownValueHolder cooling : chr.getAllCooldowns()) {
            mplew.writeInt(cooling.skillId);
            int timeLeft = (int) (cooling.length + cooling.startTime - System.currentTimeMillis());
            mplew.writeShort(timeLeft / 1000);
        }
    }

    /**
     * Adds an entry for a character to an existing
     * MaplePacketLittleEndianWriter.
     *
     * @param mplew The MaplePacketLittleEndianWrite instance to write the stats to.
     * @param chr The character to add.
     */
    private static void addCharEntry(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        addCharStats(mplew, chr);
        addCharLook(mplew, chr, false);
        mplew.write(0);
        if (chr.getJob().isA(MapleJob.GM)) {
            mplew.write(2);
            return;
        }
    }

    /**
     * Adds a quest info entry for a character to an existing
     * MaplePacketLittleEndianWriter.
     *
     * @param mplew The MaplePacketLittleEndianWrite instance to write the stats to.
     * @param chr The character to add quest info about.
     */
    private static void addQuestRecord(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        List<MapleQuestStatus> started = chr.getStartedQuests();
        mplew.writeShort(started.size());
        for (MapleQuestStatus q : started) {
            mplew.writeShort(q.getQuest().getId());
            String killStr = "";
            for (int kills : q.getMobKills().values()) {
                killStr += StringUtil.getLeftPaddedStr(String.valueOf(kills), '0', 3);
            }
            mplew.writeMapleAsciiString(killStr);
        }
        List<MapleQuestStatus> completed = chr.getCompletedQuests();
        mplew.writeShort(completed.size());
        for (MapleQuestStatus q : completed) {
            mplew.writeShort(q.getQuest().getId());
            mplew.writeLong(DateUtil.getFileTimestamp(q.getCompletionTime()));
        }
    }
//戒指信息?
    private static void addRingInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        MapleInventory iv = chr.getInventory(MapleInventoryType.EQUIPPED);
        Collection<IItem> equippedC = iv.list();
        List<Item> equipped = new ArrayList<Item>(equippedC.size());
        for (IItem item : equippedC) {
            equipped.add((Item) item);
        }
        Collections.sort(equipped);
        List<IEquip> rings = new ArrayList<IEquip>();
        for (Item item : equipped) {
            if (item.getItemId() >= 1112800 && item.getItemId() <= 1112802 || item.getItemId() >= 1112001 && item.getItemId() <= 1112003) {
                rings.add(MapleRing.loadFromDb(item.getItemId(), item.getPosition(), item.getUniqueId()));
            }
        }
        iv = chr.getInventory(MapleInventoryType.EQUIP);
        for (IItem item : iv.list()) { //112800四叶挚友戒指 //112802闪星挚友戒指
            if (item.getItemId() >= 1112800 && item.getItemId() <= 1112802 || item.getItemId() >= 1112001 && item.getItemId() <= 1112003) {
                rings.add(MapleRing.loadFromDb(item.getItemId(), item.getPosition(), item.getUniqueId()));
            }
        }
        Collections.sort(rings);
        boolean FR_last = false;
        for (IEquip ring : rings) {
            if ((ring.getItemId() >= 1112800 && ring.getItemId() <= 1112802 || ring.getItemId() >= 1112001 && ring.getItemId() <= 1112003 || ring.getItemId() <= 1112804) && rings.indexOf(ring) == 0) {
                mplew.writeShort(0);
            }
            mplew.writeShort(0);
            mplew.writeShort(1);
            mplew.writeInt(ring.getPartnerId());
            mplew.writeAsciiString(StringUtil.getRightPaddedStr(ring.getPartnerName(), '\0', 13));       //对方的名字 且自动填充到13位
            mplew.writeInt(ring.getUniqueId());
            mplew.writeInt(0);
            mplew.writeInt(ring.getPartnerUniqueId());
            if (ring.getItemId() >= 1112800 && ring.getItemId() <= 1112802 || ring.getItemId() >= 1112001 && ring.getItemId() <= 1112003 || ring.getItemId() <= 1112804) { //1112804 结婚戒指
                FR_last = true;
                mplew.writeInt(0);
                mplew.writeInt(ring.getItemId());
                mplew.writeShort(0);
            } else {
                if (rings.size() > 1) {
                    mplew.writeShort(0);
                }
                FR_last = false;
            }
        }
        if (!FR_last) {
            mplew.writeShort(0);// addMiniGameRecordInfo(mplew, chr); //short amount, int int int int int
            mplew.writeShort(0);// addCoupleRecordInfo(mplew, chr); //short amount, foreach amount, encode (0x21 bytes)
            mplew.writeShort(0);// addFriendRecordInfo(mplew, chr); //short amount, foreach amount, encode (0x25 bytes)
            mplew.writeShort(0);// addMariageRecordInfo(mplew, chr); //short amount, foreach amount, encode (0x30 bytes)
        }
    } 
    
    

    private static void addTeleportRockRecord(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        List<Integer> maps = chr.getTRockMaps(0);
        for (int map : maps) {
            mplew.writeInt(map);
        }
        for (int i = maps.size(); i < 5; i++) {
            mplew.write(CHAR_INFO_MAGIC);
        }
        maps = chr.getTRockMaps(1);
        for (int map : maps) {
            mplew.writeInt(map);
        }
        for (int i = maps.size(); i < 10; i++) {
            mplew.write(CHAR_INFO_MAGIC);
        }
    }

    /**
     * Gets character info for a character.
     *
     * @param chr The character to get info about.
     * @return The character info packet.
     */
    public static MaplePacket getCharInfo(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.WARP_TO_MAP.getValue()); // 0x49
        mplew.writeInt(chr.getClient().getChannel() - 1);
        mplew.write(0);
        mplew.write(1);
        mplew.write(1);
        mplew.writeShort(0);
        mplew.writeInt((int) (Math.random() * 10));
        mplew.writeLong(DateUtil.getFileTimestamp(System.currentTimeMillis()));
        mplew.writeLong(-1);
        mplew.write(0); //?
        addCharStats(mplew, chr);
        mplew.write(chr.getBuddylist().getCapacity());
        addInventoryInfo(mplew, chr);
        addSkillRecord(mplew, chr);//技能
        addQuestRecord(mplew, chr); //任务
        addRingInfo(mplew, chr); //戒指
        addTeleportRockRecord(mplew, chr);
        //addMonsterBookInfo(mplew, chr);
        mplew.writeShort(0);
        mplew.writeLong(0);
        mplew.write(0);
        mplew.writeInt(0);

        mplew.writeLong(DateUtil.getFileTimestamp(System.currentTimeMillis()));
        return mplew.getPacket();
    }

    /**
     * Gets an empty stat update.
     *
     * @return The empy stat update packet.
     */
    public static MaplePacket enableActions() {
        return updatePlayerStats(EMPTY_STATUPDATE, true);
    }

    /**
     * Gets an update for specified stats.
     *
     * @param stats The stats to update.
     * @return The stat update packet.
     */
    public static MaplePacket updatePlayerStats(List<Pair<MapleStat, Integer>> stats) {
        return updatePlayerStats(stats, false);
    }

    /**
     * Gets an update for specified stats.
     *
     * @param stats The list of stats to update.
     * @param itemReaction Result of an item reaction(?)
     * @return The stat update packet.
     */
    public static MaplePacket updatePlayerStats(List<Pair<MapleStat, Integer>> stats, boolean itemReaction) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UPDATE_STATS.getValue());
        if (itemReaction) {
            mplew.write(1);
        } else {
            mplew.write(0);
        }
        int updateMask = 0;
        for (Pair<MapleStat, Integer> statupdate : stats) {
            updateMask |= statupdate.getLeft().getValue();
        }
        List<Pair<MapleStat, Integer>> mystats = stats;
        if (mystats.size() > 1) {
            Collections.sort(mystats, new Comparator<Pair<MapleStat, Integer>>() {

                @Override
                public int compare(Pair<MapleStat, Integer> o1, Pair<MapleStat, Integer> o2) {
                    int val1 = o1.getLeft().getValue();
                    int val2 = o2.getLeft().getValue();
                    return (val1 < val2 ? -1 : (val1 == val2 ? 0 : 1));
                }
            });
        }
        mplew.writeInt(updateMask);
        for (Pair<MapleStat, Integer> statupdate : mystats) {
            if (statupdate.getLeft().getValue() >= 1) {
                if (statupdate.getLeft().getValue() == 0x1) {
                    mplew.writeShort(statupdate.getRight().shortValue());
                } else if (statupdate.getLeft().getValue() <= 0x4) {
                    mplew.writeInt(statupdate.getRight());
                } else if (statupdate.getLeft().getValue() < 0x80) {
                    mplew.write(statupdate.getRight().shortValue());
                } else if (statupdate.getLeft().getValue() < 0x40000) {
                    mplew.writeShort(statupdate.getRight().shortValue());
                } else {
                    mplew.writeInt(statupdate.getRight().intValue());
                }
            }
        }

        return mplew.getPacket();
    }

    /**
     * Gets a packet telling the client to change maps.
     *
     * @param to The <code>MapleMap</code> to warp to.
     * @param spawnPoint The spawn portal number to spawn at.
     * @param chr The character warping to <code>to</code>
     * @return The map change packet.
     */
    public static MaplePacket getWarpToMap(MapleMap to, int spawnPoint, MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.WARP_TO_MAP.getValue());
        mplew.writeInt(chr.getClient().getChannel() - 1);
        mplew.write(0);
        mplew.write(3);
        mplew.writeShort(0);
        mplew.write(0);
        mplew.writeInt(to.getId());
        mplew.write(spawnPoint);
        mplew.writeShort(chr.getHp());
      //mplew.write(0); //取消此处可防止出现无可开始任务的错误。但是人物头上一直会有个灯泡！
        mplew.writeLong(DateUtil.getFileTimestamp(System.currentTimeMillis()));

        return mplew.getPacket();
    }

    /**
     * Gets a packet telling the client to change maps.
     *
     * @param to The <code>MapleMap</code> to warp to.
     * @param spawnPoint The spawn portal number to spawn at.
     * @param chr The character warping to <code>to</code>
     * @return The map change packet.
     */
    public static MaplePacket getWarpToMap(int to, int spawnPoint, MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.WARP_TO_MAP.getValue());
        mplew.writeInt(chr.getClient().getChannel() - 1);
        mplew.write(0x1);
        mplew.write(0x2);
        mplew.writeShort(0);
        mplew.writeInt(to);
        mplew.write(spawnPoint);
        mplew.writeShort(chr.getHp());
        mplew.write(0);
        mplew.writeLong(DateUtil.getFileTimestamp(System.currentTimeMillis()));

        return mplew.getPacket();
    }

    /**
     * Gets a packet to spawn a portal.
     *
     * @param townId The ID of the town the portal goes to.
     * @param targetId The ID of the target.
     * @param pos Where to put the portal.
     * @return The portal spawn packet.
     */
    public static MaplePacket spawnPortal(int townId, int targetId, Point pos) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_PORTAL.getValue());
        mplew.writeInt(townId);
        mplew.writeInt(targetId);
        if (pos != null) {
            mplew.writeShort(pos.x);
            mplew.writeShort(pos.y);
        }

        return mplew.getPacket();
    }

    /**
     * Gets a packet to spawn a door.
     *
     * @param oid The door's object ID.
     * @param pos The position of the door.
     * @param town
     * @return The remove door packet.
     */
    public static MaplePacket spawnDoor(int oid, Point pos, boolean town) {
        // [D3 00] [01] [93 AC 00 00] [6B 05] [37 03]
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_DOOR.getValue());
        mplew.write(town ? 1 : 0);
        mplew.writeInt(oid);
        mplew.writeShort(pos.x);
        mplew.writeShort(pos.y);

        return mplew.getPacket();
    }

    /**
     * Gets a packet to remove a door.
     *
     * @param oid The door's ID.
     * @param town
     * @return The remove door packet.
     */
    public static MaplePacket removeDoor(int oid, boolean town) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        if (town) {
            mplew.writeShort(SendPacketOpcode.SPAWN_PORTAL.getValue());
            mplew.writeInt(999999999);
            mplew.writeInt(999999999);
        } else {
            mplew.writeShort(SendPacketOpcode.REMOVE_DOOR.getValue());
            mplew.write(/*town ? 1 : */0);
            mplew.writeInt(oid);
        }

        return mplew.getPacket();
    }

    /**
     * Gets a packet to spawn a special map object.
     *
     * @param summon
     * @param skillLevel The level of the skill used.
     * @param animated Animated spawn?
     * @return The spawn packet for the map object.
     */
    public static MaplePacket spawnSpecialMapObject(MapleSummon summon, int skillLevel, boolean animated) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_SPECIAL_MAPOBJECT.getValue());
        mplew.writeInt(summon.getOwner().getId());
        mplew.writeInt(summon.getObjectId()); // Supposed to be Object ID, but this works too! <3
        mplew.writeInt(summon.getSkill());
        mplew.write(114); // test
        mplew.write(skillLevel);
        mplew.writeShort(summon.getPosition().x);
        mplew.writeShort(summon.getPosition().y);
        mplew.write(4); // test
        mplew.write(31); // test
        mplew.write(0); // test
        mplew.write(summon.getMovementType().getValue()); // 0 = don't move, 1 = follow (4th mage summons?), 2/4 = only tele follow, 3 = bird follow
        mplew.write(1); // 0 and the summon can't attack - but puppets don't attack with 1 either ^.-
        mplew.write(animated ? 0 : 1);

        return mplew.getPacket();
    }

    /**
     * Gets a packet to remove a special map object.
     *
     * @param summon
     * @param animated Animated removal?
     * @return The packet removing the object.
     */
    public static MaplePacket removeSpecialMapObject(MapleSummon summon, boolean animated) {
        // [86 00] [6A 4D 27 00] 33 1F 00 00 02
        // 92 00 36 1F 00 00 0F 65 85 01 84 02 06 46 28 00 06 81 02 01 D9 00 BD FB D9 00 BD FB 38 04 2F 21 00 00 10 C1 2A 00 06 00 06 01 00 01 BD FB FC 00 BD FB 6A 04 88 1D 00 00 7D 01 AF FB
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.REMOVE_SPECIAL_MAPOBJECT.getValue());
        mplew.writeInt(summon.getOwner().getId());
        mplew.writeInt(summon.getObjectId());
        mplew.write(animated ? 4 : 1); // ?
        return mplew.getPacket();
    }

    /**
     * Adds info about an item to an existing MaplePacketLittleEndianWriter.
     *
     * @param mplew The MaplePacketLittleEndianWriter to write to.
     * @param item The item to write info about.
     */
    /**
     * Adds info about an item to an existing MaplePacketLittleEndianWriter.
     *
     * @param mplew The MaplePacketLittleEndianWriter to write to.
     * @param item The item to write info about.
     */
    protected static void addItemInfo(MaplePacketLittleEndianWriter mplew, IItem item) {
        addItemInfo(mplew, item, false, false);
    }

    protected static void addItemInfo(MaplePacketLittleEndianWriter mplew, IItem item, boolean zeroPosition, boolean leaveOut) {
        addItemInfo(mplew, item, zeroPosition, leaveOut, false);
    }

    /**
     * Adds item info to existing MaplePacketLittleEndianWriter.
     *
     * @param mplew The MaplePacketLittleEndianWriter to write to.
     * @param item The item to add info about.
     * @param zeroPosition Is the position zero?
     * @param leaveOut Leave out the item if position is zero?
     */
    private static void addItemInfo(MaplePacketLittleEndianWriter mplew, IItem item, boolean zeroPosition, boolean leaveOut, boolean cs) {
        if (item.getUniqueId() > 0) {
            if (item.getItemId() >= 5000000 && item.getItemId() <= 5000100) {//褐色小猫
                addPetItemInfo(mplew, item, zeroPosition, leaveOut, cs); //宠物装备
              } else if (item.友谊戒指() || item.恋人戒指()) {
           // } else if (item.getItemId() >= 1112800 && item.getItemId() <= 1112802 || item.getItemId() >= 1112001 && item.getItemId() <= 1112003) {
                addRingItemInfo(mplew, item, zeroPosition, leaveOut, cs);//戒指装备
            } else {
                addCashItemInfo(mplew, item, zeroPosition, leaveOut, cs);//点装
            }
        } else {
            addNormalItemInfo(mplew, item, zeroPosition, leaveOut, false);
        }
    }
    
    //普通物品的生成
    private static void addNormalItemInfo(MaplePacketLittleEndianWriter mplew, IItem item, boolean zeroPosition, boolean leaveOut, boolean cs) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        IEquip equip = null;
        boolean masking = false;
        boolean equipped = false;
        if (item.getType() == IItem.EQUIP) {
            equip = (IEquip) item;
        }
        byte pos = item.getPosition();
        if (zeroPosition) {
            if (!leaveOut) {
                mplew.write(0);
            }
        } else if (pos <= (byte) -1) {
            pos *= -1;
            if (pos > 100) {
                masking = true;
                //mplew.write(0);
                mplew.write(pos - 100);
            } else {
                mplew.write(pos);
            }
            equipped = true;
        } else {
            mplew.write(item.getPosition());
        }
        mplew.write(item.getType());
        mplew.writeInt(item.getItemId());
        mplew.write((ii.isCash(item.getItemId()) && equipped) || cs ? 1 : 0);
        if ((ii.isCash(item.getItemId()) && equipped) || cs) {
            mplew.writeLong(-1);
        }
        mplew.writeLong(DateUtil.getFileTimestamp(item.getExpiration() == null ? FINAL_TIME : item.getExpiration().getTime()));
        if (item.getType() == IItem.EQUIP) {
            mplew.write(equip.getUpgradeSlots());
            mplew.write(equip.getLevel());
            mplew.writeShort(equip.getStr()); // str
            mplew.writeShort(equip.getDex()); // dex
            mplew.writeShort(equip.getInt()); // int
            mplew.writeShort(equip.getLuk()); // luk
            mplew.writeShort(equip.getHp()); // hp
            mplew.writeShort(equip.getMp()); // mp
            mplew.writeShort(equip.getWatk()); // watk
            mplew.writeShort(equip.getMatk()); // matk
            mplew.writeShort(equip.getWdef()); // wdef
            mplew.writeShort(equip.getMdef()); // mdef
            mplew.writeShort(equip.getAcc()); // accuracy
            mplew.writeShort(equip.getAvoid()); // avoid
            mplew.writeShort(equip.getHands()); // hands
            mplew.writeShort(equip.getSpeed()); // speed
            mplew.writeShort(equip.getJump()); // jump
            mplew.writeMapleAsciiString(equip.getOwner());
            mplew.write(equip.getLocked());
            mplew.writeShort(equip.getFlag()); //Item Flags
            if (!masking) {
               mplew.writeInt(0);
               mplew.write(0);
                mplew.writeShort(equip.getVicious());
                mplew.writeShort(0);
               mplew.writeLong(0);
                
                mplew.writeLong(DateUtil.getFileTimestamp(item.getExpiration() == null ? FINAL_TIME : item.getExpiration().getTime()));
            } else {
                mplew.write(HexTool.getByteArrayFromHexString("00 00 02 00 00 00 70 3E BC 5C 4C 07 CA 01"));
            }
            mplew.writeInt(-1);
        } else {
            mplew.writeShort(item.getQuantity());
            mplew.writeMapleAsciiString(item.getOwner());
            mplew.writeShort(item.getFlag());
            if (ii.isThrowingStar(item.getItemId()) || ii.isBullet(item.getItemId())) {
                mplew.write(HexTool.getByteArrayFromHexString("02 00 00 00 54 00 00 34"));
            }
        }
    }

    private static void addCashItemInfo(MaplePacketLittleEndianWriter mplew, IItem item, boolean zeroPosition, boolean leaveOut, boolean cs) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        IEquip equip = null;
        boolean masking = false;
        boolean equipped = false;
        if (item.getType() == IItem.EQUIP) {
            equip = (IEquip) item;
        }
        byte pos = item.getPosition();
        if (zeroPosition) {
            if (!leaveOut) {
                mplew.write(0);
            }
        } else if (pos <= (byte) -1) {
            pos *= -1;
            if (pos > 100) {
                mplew.write(pos - 100);
                masking = true;
            } else {
                mplew.write(pos);
            }
            equipped = true;
        } else {
            mplew.write(item.getPosition());
        }
        mplew.write(item.getType());
        mplew.writeInt(item.getItemId());
        mplew.write((ii.isCash(item.getItemId()) && equipped) || cs ? 1 : 0);
        if ((ii.isCash(item.getItemId()) && equipped) || cs) {
            mplew.writeLong(item.getUniqueId());
        }
        mplew.writeLong(DateUtil.getFileTimestamp(item.getExpiration() == null ? FINAL_TIME : item.getExpiration().getTime()));
        if (item.getType() == IItem.EQUIP) {
            mplew.write(equip.getUpgradeSlots());
            mplew.write(equip.getLevel());
            mplew.writeShort(equip.getStr()); // str
            mplew.writeShort(equip.getDex()); // dex
            mplew.writeShort(equip.getInt()); // int
            mplew.writeShort(equip.getLuk()); // luk
            mplew.writeShort(equip.getHp()); // hp
            mplew.writeShort(equip.getMp()); // mp
            mplew.writeShort(equip.getWatk()); // watk
            mplew.writeShort(equip.getMatk()); // matk
            mplew.writeShort(equip.getWdef()); // wdef
            mplew.writeShort(equip.getMdef()); // mdef
            mplew.writeShort(equip.getAcc()); // accuracy
            mplew.writeShort(equip.getAvoid()); // avoid
            mplew.writeShort(equip.getHands()); // hands
            mplew.writeShort(equip.getSpeed()); // speed
            mplew.writeShort(equip.getJump()); // jump
            mplew.writeMapleAsciiString(equip.getOwner());
            //道具交易次数?
            mplew.writeShort(0);
            //道具经验?
            mplew.writeShort(0);
            // 0 normal; 1 locked
            mplew.write(equip.getLocked());
            mplew.write(0);
            if (!masking && !cs) {
                mplew.writeLong(0);
                mplew.write(HexTool.getByteArrayFromHexString("00 00 00 00 00 00"));
                mplew.writeLong(DateUtil.getFileTimestamp(System.currentTimeMillis()));
            } else {
                mplew.write(HexTool.getByteArrayFromHexString("00 00 00 00 00 00"));
                mplew.writeLong(DateUtil.getFileTimestamp(System.currentTimeMillis()));
            }
            mplew.writeInt(-1);
        } else {
            mplew.writeShort(item.getQuantity());
            mplew.writeMapleAsciiString(item.getOwner());
            mplew.writeShort(0); // this seems to end the item entry
            // but only if its not a THROWING STAR :))9 O.O!

            if (ii.isThrowingStar(item.getItemId()) || ii.isBullet(item.getItemId())) {
                mplew.write(HexTool.getByteArrayFromHexString("02 00 00 00 54 00 00 34"));
            }
        }

    }

    private static void addPetItemInfo(MaplePacketLittleEndianWriter mplew, IItem item, boolean zeroPosition, boolean leaveOut, boolean cs) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        IEquip equip = null;
        byte pos = item.getPosition();
        if (zeroPosition) {
            if (!leaveOut) {
                mplew.write(0);
            }
        } else if (pos <= (byte) -1) {
            pos *= -1;
            if (pos > 100) {
                mplew.write(pos - 100);
            } else {
                mplew.write(pos);
            }
        } else {
            mplew.write(item.getPosition()); //位置
        }
        mplew.write(3);
        mplew.writeInt(item.getItemId());//物品ID
        mplew.write(1);
        mplew.writeInt(item.getUniqueId());
        mplew.writeInt(0);
        MaplePet pet = MaplePet.loadFromDb(item.getItemId(), item.getPosition(), item.getUniqueId());
        mplew.writeLong(DateUtil.getFileTimestamp(item.getExpiration() == null ? FINAL_TIME : item.getExpiration().getTime()));
        String petname = pet.getName();
        if (petname.getBytes().length > 13) {
            petname = petname.substring(0, 13);
        }
        mplew.writeAsciiString(petname);
        for (int i = petname.getBytes().length; i < 13; i++) {
            mplew.write(0);
        }
        mplew.write(pet.getLevel());
        mplew.writeShort(pet.getCloseness());
        mplew.write(pet.getFullness());

        mplew.writeLong(DateUtil.getFileTimestamp(item.getExpiration() == null ? FINAL_TIME : item.getExpiration().getTime()));
        mplew.write(HexTool.getByteArrayFromHexString("00 00 00 00 00 00 00 00 00 00"));

    }
   //戒指信息
    private static void addRingItemInfo(MaplePacketLittleEndianWriter mplew, IItem item, boolean zeroPosition, boolean leaveOut, boolean cs) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        boolean ring = false;
        IEquip equip = null;
        if (item.getType() == IItem.EQUIP) {
            equip = (IEquip) item;
            if (equip.isRing()) {
                ring = true;
            }
        }
        byte pos = item.getPosition();
        boolean masking = false;
        boolean equipped = false;

        if (zeroPosition) {
            if (!leaveOut) {
                mplew.write(0);
            }
        } else if (pos <= (byte) -1) {
            pos *= -1;
            if ((pos > 100 || pos == -128) || ring) {
                masking = true;
                //mplew.write(0);
                mplew.write(pos - 100);
            } else {
                mplew.write(pos);
            }
            equipped = true;
        } else {
            mplew.write(item.getPosition());
        }
        /*if (ring) {
            mplew.write(1);
            mplew.writeInt(equip.getUniqueId());
            mplew.writeInt(0);
        }*/
        /*if (!equipped) {
            mplew.write(0);
        }*/
        mplew.write(item.getType());
        mplew.writeInt(item.getItemId());
        mplew.write(1);
        mplew.writeInt(equip.getUniqueId());
        mplew.writeInt(0);
        mplew.writeLong(DateUtil.getFileTimestamp(item.getExpiration() == null ? FINAL_TIME : item.getExpiration().getTime()));
        mplew.write(equip.getUpgradeSlots());
        mplew.write(equip.getLevel());
        mplew.writeShort(equip.getStr()); // str
        mplew.writeShort(equip.getDex()); // dex
        mplew.writeShort(equip.getInt()); // int
        mplew.writeShort(equip.getLuk()); // luk
        mplew.writeShort(equip.getHp()); // hp
        mplew.writeShort(equip.getMp()); // mp
        mplew.writeShort(equip.getWatk()); // watk
        mplew.writeShort(equip.getMatk()); // matk
        mplew.writeShort(equip.getWdef()); // wdef
        mplew.writeShort(equip.getMdef()); // mdef
        mplew.writeShort(equip.getAcc()); // accuracy
        mplew.writeShort(equip.getAvoid()); // avoid
        mplew.writeShort(equip.getHands()); // hands
        mplew.writeShort(equip.getSpeed()); // speed
        mplew.writeShort(equip.getJump()); // jump
        mplew.writeMapleAsciiString(equip.getOwner());
        //道具交易次数?
        mplew.writeShort(0);
        //道具经验?
        mplew.writeShort(0);
        mplew.write(equip.getLocked());
        mplew.write(0);
        mplew.writeShort(0);
        mplew.writeShort(0);
        mplew.writeShort(0);
        mplew.writeLong(DateUtil.getFileTimestamp(System.currentTimeMillis()));
        mplew.writeInt(-1);
    }

    /**
     * Gets the response to a relog request.
     *
     * @return The relog response packet.
     */
    public static MaplePacket getRelogResponse() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(3);

        mplew.writeShort(SendPacketOpcode.RELOG_RESPONSE.getValue());
        mplew.write(1);

        return mplew.getPacket();
    }

    /**
     * Gets a server message packet.
     *
     * @param message The message to convey.
     * @return The server message packet.
     */
    //服务器公告
    public static MaplePacket serverMessage(String message) {
        return serverMessage(4, 0, message, true, false);
    }

    /**
     * Gets a server notice packet.
     *
     * Possible values for <code>type</code>:<br>
     * 0: [Notice]<br>
     * 1: Popup<br>
     * 2: Megaphone<br>
     * 3: Super Megaphone<br>
     * 4: Scrolling message at top<br>
     * 5: Pink Text<br>
     * 6: Lightblue Text
     *
     * @param type The type of the notice.
     * @param message The message to convey.
     * @return The server notice packet.
     */
    public static MaplePacket serverNotice(int type, String message) {
        return serverMessage(type, 0, message, false, false);
    }

    /**
     * Gets a server notice packet.
     *
     * Possible values for <code>type</code>:<br>
     * 0: [Notice]<br>
     * 1: Popup<br>
     * 2: Megaphone<br>
     * 3: Super Megaphone<br>
     * 4: Scrolling message at top<br>
     * 5: Pink Text<br>
     * 6: Lightblue Text
     *
     * @param type The type of the notice.
     * @param channel The channel this notice was sent on.
     * @param message The message to convey.
     * @return The server notice packet.
     */
    public static MaplePacket serverNotice(int type, int channel, String message) {
        return serverMessage(type, channel, message, false, false);
    }

    public static MaplePacket serverNotice(int type, int channel, String message, boolean smegaEar) {
        return serverMessage(type, channel, message, false, smegaEar);
    }

    /**
     * Gets a server message packet.
     *
     * Possible values for <code>type</code>:<br>
     * 0: [Notice]<br>
     * 1: Popup<br>
     * 2: Megaphone<br>
     * 3: Super Megaphone<br>
     * 4: Scrolling message at top<br>
     * 5: Pink Text<br>
     * 6: Lightblue Text
     * B: 心脏
     * C: 白骨
     * 
     * @param type The type of the notice.
     * @param channel The channel this notice was sent on.
     * @param message The message to convey.
     * @param servermessage Is this a scrolling ticker?
     * @return The server notice packet.
     */
    private static MaplePacket serverMessage(int type, int channel, String message, boolean servermessage, boolean megaEar) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SERVERMESSAGE.getValue());
        mplew.write(type);
        if (servermessage) {
            mplew.write(1);
        }
        mplew.writeMapleAsciiString(message);
        if (type == 3 || type == 0x0B || type == 0x0C) {
            mplew.write(channel - 1); // channel
            mplew.write(megaEar ? 1 : 0);

        }
        if (type == 6) {
            mplew.writeInt(0);
        }

        return mplew.getPacket();
    }

    public static MaplePacket getItemMega(int channel, String message, IItem item, boolean megaEar) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SERVERMESSAGE.getValue());
        mplew.write(0x0E);
        mplew.writeMapleAsciiString(message);
        mplew.writeInt(channel - 1); // channel
        addItemInfo(mplew, item, true, true);
        return mplew.getPacket();
    }

    public static MaplePacket getItemMegas(int channel, String message, IItem item, boolean megaEar) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SERVERMESSAGE.getValue());
        mplew.write(0x0F);
        mplew.writeMapleAsciiString(message);
        mplew.writeInt(channel - 1);
        addItemInfo(mplew, item, true, true);
        return mplew.getPacket();
    }

    public static MaplePacket getMegaphone(Items.MegaPhoneType type, int channel, String message, IItem item, boolean showEar) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SERVERMESSAGE.getValue());
        mplew.write(type.getValue());
        mplew.writeMapleAsciiString(message);
        if (type == Items.MegaPhoneType.SUPERMEGAPHONE) {
            mplew.write(channel - 1);
            mplew.write(showEar ? 1 : 0);
        } else if (type == Items.MegaPhoneType.ITEMMEGAPHONE) {
            mplew.write(channel - 1);
            mplew.write(showEar ? 1 : 0);
            if (item != null) {
                addItemInfo(mplew, item);
            } else {
                mplew.write(0);
            }
        }
        return mplew.getPacket();
    }

    public static MaplePacket getItemMegaI(int channel, String message, IItem item, boolean megaEar) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SERVERMESSAGE.getValue());
        mplew.write(8);
        mplew.writeMapleAsciiString(message);
        mplew.writeInt(channel - 1); // channel
        addItemInfo(mplew, item, true, true);
        return mplew.getPacket();
    }

    public static MaplePacket getMultiMega(int channel, List<String> message, boolean megaEar) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SERVERMESSAGE.getValue());
        mplew.write(0x0A);
        mplew.writeMapleAsciiString(message.get(0));
        mplew.write(message.size());
        for (int i = 0; i < message.size() - 1; i++) {
            mplew.writeMapleAsciiString(message.get(i + 1));
        }
        mplew.write((byte) (channel - 1)); // channel
        mplew.write(megaEar ? 1 : 0);
        return mplew.getPacket();
    }

    /**
     * Gets an avatar megaphone packet.
     *
     * @param chr The character using the avatar megaphone.
     * @param channel The channel the character is on.
     * @param itemId The ID of the avatar-mega.
     * @param message The message that is sent.
     * @param ear
     * @return The avatar mega packet.
     */
    public static MaplePacket getAvatarMega(MapleCharacter chr, int channel, int itemId, List<String> message, boolean ear) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.AVATAR_MEGA.getValue());
        mplew.writeInt(itemId); //喇叭ID
        mplew.writeMapleAsciiString(chr.getName()); //使用者姓名
        for (String s : message) {
            mplew.writeMapleAsciiString(s);
        }
        mplew.writeInt(channel - 1); // channel
        mplew.write(ear ? 1 : 0);
        addCharLook(mplew, chr, true);//角色外观

        return mplew.getPacket();
    }

    /**
     * Gets a NPC spawn packet.
     *
     * @param life The NPC to spawn.
     * @return The NPC spawn packet.
     */
    public static MaplePacket spawnNPC(MapleNPC life) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_NPC.getValue());
        mplew.writeInt(life.getObjectId());
        mplew.writeInt(life.getId());
        mplew.writeShort(life.getPosition().x);
        mplew.writeShort(life.getCy());
        mplew.write(life.getF() == 1 ? 0 : 1);
        mplew.writeShort(life.getFh());
        mplew.writeShort(life.getRx0());
        mplew.writeShort(life.getRx1());
        mplew.write(1);

        return mplew.getPacket();
    }

    public static MaplePacket spawnNPCRequestController(MapleNPC life, boolean show) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_NPC_REQUEST_CONTROLLER.getValue());
        mplew.write(1);
        mplew.writeInt(life.getObjectId());
        mplew.writeInt(life.getId());
        mplew.writeShort(life.getPosition().x);
        mplew.writeShort(life.getCy());
        mplew.write(life.getF() == 1 ? 0 : 1);
        mplew.writeShort(life.getFh());
        mplew.writeShort(life.getRx0());
        mplew.writeShort(life.getRx1());
        mplew.write(show ? 1 : 0);

        return mplew.getPacket();
    }

    
    public static MaplePacket removeNPC(int objid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.REMOVE_NPC.getValue());
        mplew.writeInt(objid);
        return mplew.getPacket();
    }

    /**
     * Gets a spawn monster packet.
     *
     * @param life The monster to spawn.
     * @param newSpawn Is it a new spawn?
     * @return The spawn monster packet.
     */
    public static MaplePacket spawnMonster(MapleMonster life, boolean newSpawn) {
        return spawnMonsterInternal(life, false, newSpawn, false, 0, false);
    }

    /**
     * Gets a spawn monster packet.
     *
     * @param life The monster to spawn.
     * @param newSpawn Is it a new spawn?
     * @param effect The spawn effect.
     * @return The spawn monster packet.
     */
    public static MaplePacket spawnMonster(MapleMonster life, boolean newSpawn, int effect) {
        return spawnMonsterInternal(life, false, newSpawn, false, effect, false);
    }

    /**
     * Gets a control monster packet.
     *
     * @param life The monster to give control to.
     * @param newSpawn Is it a new spawn?
     * @param aggro Aggressive monster?
     * @return The monster control packet.
     */
    public static MaplePacket controlMonster(MapleMonster life, boolean newSpawn, boolean aggro) {
        return spawnMonsterInternal(life, true, newSpawn, aggro, 0, false);
    }

    public static MaplePacket makeMonsterInvisible(MapleMonster life) {
        return spawnMonsterInternal(life, true, false, false, 0, true);
    }

    /**
     * Internal function to handler monster spawning and controlling.
     *
     * @param life The mob to perform operations with.
     * @param requestController Requesting control of mob?
     * @param newSpawn New spawn (fade in?)
     * @param aggro Aggressive mob?
     * @param effect The spawn effect to use.
     * @return The spawn/control packet.
     */
    private static MaplePacket spawnMonsterInternal(MapleMonster life, boolean requestController, boolean newSpawn, boolean aggro, int effect, boolean makeInvis) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (makeInvis) {
            mplew.writeShort(SendPacketOpcode.SPAWN_MONSTER_CONTROL.getValue());
            mplew.write(0);
            mplew.writeInt(life.getObjectId());
            return mplew.getPacket();
        }
        if (requestController) {
            mplew.writeShort(SendPacketOpcode.SPAWN_MONSTER_CONTROL.getValue());
            if (aggro) {
                mplew.write(2);
            } else {
                mplew.write(1);
            }
        } else {
            mplew.writeShort(SendPacketOpcode.SPAWN_MONSTER.getValue());
        }
        mplew.writeInt(life.getObjectId());
        mplew.write(1); // ????!? either 5 or 1?
        mplew.writeInt(life.getId());
        mplew.write(0);
        mplew.writeShort(0);
        mplew.writeLong(0);
        mplew.writeInt(0);
        mplew.write(136);
        mplew.writeInt(0);
        mplew.writeShort(0);
        mplew.writeShort(life.getPosition().x);
        mplew.writeShort(life.getPosition().y);
        mplew.write(life.getStance());
        mplew.writeShort(0); // ?
        mplew.writeShort(life.getFh());
        if (effect > 0) {
            mplew.write(effect);
            mplew.write(0);
            mplew.writeShort(0);
            if (effect == 15) { //(Dojo spawn effect)
                mplew.write(0);
            }
        }
        if (newSpawn) {
            mplew.writeShort(-2);
        } else {
            mplew.writeShort(-1);
        }
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /**
     * Handles monsters not being targettable, such as Zakum's first body.
     * @param life The mob to spawn as non-targettable.
     * @param effect The effect to show when spawning.
     * @return The packet to spawn the mob as non-targettable.
     */
    public static MaplePacket spawnFakeMonster(MapleMonster life, int effect) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_MONSTER_CONTROL.getValue());
        mplew.write(1);
        mplew.writeInt(life.getObjectId());
        mplew.write(1);
        mplew.writeInt(life.getId());
        mplew.write(0);
        mplew.writeShort(0);
        mplew.writeLong(0);
        mplew.writeInt(0);
        mplew.write(136);
        mplew.writeInt(0);
        mplew.writeShort(0);
        mplew.writeShort(life.getPosition().x);
        mplew.writeShort(life.getPosition().y);
        mplew.write(life.getStance());
        mplew.writeShort(life.getStartFh());
        mplew.writeShort(life.getFh());
        if (effect > 0) {
            mplew.write(effect);
            mplew.write(0);
            mplew.writeShort(0);
        }
        mplew.writeShort(-2);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /**
     * Makes a monster previously spawned as non-targettable, targettable.
     * @param life The mob to make targettable.
     * @return The packet to make the mob targettable.
     */
    public static MaplePacket makeMonsterReal(MapleMonster life) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_MONSTER.getValue());
        mplew.writeInt(life.getObjectId());
        mplew.write(1);
        mplew.writeInt(life.getId());
        mplew.write(0);
        mplew.writeShort(0);
        mplew.writeLong(0);
        mplew.writeInt(0);
        mplew.write(136);
        mplew.writeInt(0);
        mplew.writeShort(0);
        mplew.writeShort(life.getPosition().x);
        mplew.writeShort(life.getPosition().y);
        mplew.write(life.getStance());
        mplew.writeShort(life.getStartFh());
        mplew.writeShort(life.getFh());
        mplew.writeShort(-1);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /**
     * Gets a stop control monster packet.
     *
     * @param oid The ObjectID of the monster to stop controlling.
     * @return The stop control monster packet.
     */
    public static MaplePacket stopControllingMonster(int oid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_MONSTER_CONTROL.getValue());
        mplew.write(0);
        mplew.writeInt(oid);

        return mplew.getPacket();
    }

    /**
     * Gets a response to a move monster packet.
     *
     * @param objectid The ObjectID of the monster being moved.
     * @param moveid The movement ID.
     * @param currentMp The current MP of the monster.
     * @param useSkills Can the monster use skills?
     * @return The move response packet.
     */
    public static MaplePacket moveMonsterResponse(int objectid, short moveid, int currentMp, boolean useSkills) {
        return moveMonsterResponse(objectid, moveid, currentMp, useSkills, 0, 0);
    }

    /**
     * Gets a response to a move monster packet.
     *
     * @param objectid The ObjectID of the monster being moved.
     * @param moveid The movement ID.
     * @param currentMp The current MP of the monster.
     * @param useSkills Can the monster use skills?
     * @param skillId The skill ID for the monster to use.
     * @param skillLevel The level of the skill to use.
     * @return The move response packet.
     */
    public static MaplePacket moveMonsterResponse(int objectid, short moveid, int currentMp, boolean useSkills, int skillId, int skillLevel) {
        // A1 00 18 DC 41 00 01 00 00 1E 00 00 00
        // A1 00 22 22 22 22 01 00 00 00 00 00 00
        // EE 00 D5 C9 38 00 07 00 00 0F 00 00 00
        // F2 00 2E 96 00 00 01 00 00 0F 00 00 00
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MOVE_MONSTER_RESPONSE.getValue());
        mplew.writeInt(objectid);
        mplew.writeShort(moveid);
        mplew.write(useSkills ? 1 : 0);
        mplew.writeShort(currentMp);
        mplew.write(skillId);
        mplew.write(skillLevel);

        return mplew.getPacket();
    }

    /**
     * Gets a general chat packet.
     *
     * @param cidfrom The character ID who sent the chat.
     * @param text The text of the chat.
     * @param whiteBG
     * @param show
     * @return The general chat packet.
     */
    public static MaplePacket getChatText(int cidfrom, String text, boolean whiteBG, int show) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CHATTEXT.getValue());
        mplew.writeInt(cidfrom);
        mplew.write(whiteBG ? 1 : 0);
        mplew.writeMapleAsciiString(text);
        mplew.write(show);

        return mplew.getPacket();
    }

    /**
     * For testing only! Gets a packet from a hexadecimal string.
     *
     * @param hex The hexadecimal packet to create.
     * @return The MaplePacket representing the hex string.
     */
    public static MaplePacket getPacketFromHexString(String hex) {
        byte[] b = HexTool.getByteArrayFromHexString(hex);
        return new ByteArrayMaplePacket(b);
    }

    /**
     * Gets a packet telling the client to show an EXP increase.
     *
     * @param gain The amount of EXP gained.
     * @param inChat In the chat box?
     * @param white White text or yellow?
     * @return The exp gained packet.
     */
    public static MaplePacket getShowExpGain(int gain, boolean inChat, boolean white) {

        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(3); // 3 = exp, 4 = fame, 5 = mesos, 6 = guildpoints
        mplew.write(white ? 1 : 0);
        mplew.writeInt(gain);
        mplew.write(0);
        mplew.write(inChat ? 1 : 0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.write(0);
        mplew.write(0);

        return mplew.getPacket();
    }

    /**
     * Gets a packet telling the client to show a fame gain.
     *
     * @param gain How many fame gained.
     * @return The meso gain packet.
     */
    public static MaplePacket getShowFameGain(int gain) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(4);
        mplew.writeInt(gain);

        return mplew.getPacket();
    }

    /**
     * Gets a packet telling the client to show a meso gain.
     *
     * @param gain How many mesos gained.
     * @return The meso gain packet.
     */
    public static MaplePacket getShowMesoGain(int gain) {
        return getShowMesoGain(gain, false);
    }

    /**
     * Gets a packet telling the client to show a meso gain.
     *
     * @param gain How many mesos gained.
     * @param inChat Show in the chat window?
     * @return The meso gain packet.
     */
    public static MaplePacket getShowMesoGain(int gain, boolean inChat) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        if (!inChat) {
            mplew.write(0);
            mplew.write(1);
            mplew.write(0);
        } else {
            mplew.write(5);
        }
        mplew.writeInt(gain);
        mplew.writeShort(0); // inet cafe meso gain ?.o

        return mplew.getPacket();
    }

    /**
     * Gets a packet telling the client to show a item gain.
     *
     * @param itemId The ID of the item gained.
     * @param quantity How many items gained.
     * @return The item gain packet.
     */
    public static MaplePacket getShowItemGain(int itemId, short quantity) {
        return getShowItemGain(itemId, quantity, false);
    }

    /**
     * Gets a packet telling the client to show an item gain.
     *
     * @param itemId The ID of the item gained.
     * @param quantity The number of items gained.
     * @param inChat Show in the chat window?
     * @return The item gain packet.
     */
    public static MaplePacket getShowItemGain(int itemId, short quantity, boolean inChat) {
        
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        if (inChat) {
            mplew.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
            mplew.write(3);
            mplew.write(1);
            mplew.writeInt(itemId);
            mplew.writeInt(quantity);
        } else {
            mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
            mplew.writeShort(0);
            mplew.writeInt(itemId);
            mplew.writeInt(quantity);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }

        return mplew.getPacket();
    }

    public static MaplePacket killMonster(int oid, boolean animation) {
        return killMonster(oid, animation ? 1 : 0);
    }

    /**
     * Gets a packet telling the client that a monster was killed.
     *
     * @param oid The objectID of the killed monster.
     * @param animation 0 = dissapear, 1 = fade out, 2+ = special
     * @return The kill monster packet.
     */
    public static MaplePacket killMonster(int oid, int animation) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.KILL_MONSTER.getValue());
        mplew.writeInt(oid);
        mplew.write(animation); // Not a boolean, really an int type

        return mplew.getPacket();
    }

    /**
     * Gets a packet telling the client to show mesos coming out of a map
     * object.
     *
     * @param amount The amount of mesos.
     * @param itemoid The ObjectID of the dropped mesos.
     * @param dropperoid The OID of the dropper.
     * @param ownerid The ID of the drop owner.
     * @param dropfrom Where to drop from.
     * @param dropto Where the drop lands.
     * @param mod ?
     * @return The drop mesos packet.
     */
    public static MaplePacket dropMesoFromMapObject(int amount, int itemoid, int dropperoid, int ownerid, Point dropfrom, Point dropto, byte mod) {
        return dropItemFromMapObjectInternal(amount, itemoid, dropperoid, ownerid, dropfrom, dropto, mod, true);
    }

    /**
     * Gets a packet telling the client to show an item coming out of a map
     * object.
     *
     * @param itemid The ID of the dropped item.
     * @param itemoid The ObjectID of the dropped item.
     * @param dropperoid The OID of the dropper.
     * @param ownerid The ID of the drop owner.
     * @param dropfrom Where to drop from.
     * @param dropto Where the drop lands.
     * @param mod ?
     * @return The drop mesos packet.
     */
    public static MaplePacket dropItemFromMapObject(int itemid, int itemoid, int dropperoid, int ownerid, Point dropfrom, Point dropto, byte mod) {
        return dropItemFromMapObjectInternal(itemid, itemoid, dropperoid, ownerid, dropfrom, dropto, mod, false);
    }

    /**
     * Internal function to get a packet to tell the client to drop an item onto
     * the map.
     *
     * @param itemid The ID of the item to drop.
     * @param itemoid The ObjectID of the dropped item.
     * @param dropperoid The OID of the dropper.
     * @param ownerid The ID of the drop owner.
     * @param dropfrom Where to drop from.
     * @param dropto Where the drop lands.
     * @param mod ?
     * @param mesos Is the drop mesos?
     * @return The item drop packet.
     */
    public static MaplePacket dropItemFromMapObjectInternal(int itemid, int itemoid, int dropperoid, int ownerid, Point dropfrom, Point dropto, byte mod, boolean mesos) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DROP_ITEM_FROM_MAPOBJECT.getValue());
        mplew.write(mod);
        mplew.writeInt(itemoid);
        mplew.write(mesos ? 1 : 0); // 1 = mesos, 0 =item
        mplew.writeInt(itemid);
        mplew.writeInt(0); // owner charid
        mplew.write(4);
        mplew.writeShort(dropto.x);
        mplew.writeShort(dropto.y);
        if (mod != 2) {
            mplew.writeInt(0);
            mplew.writeShort(dropfrom.x);
            mplew.writeShort(dropfrom.y);
        } else {
            mplew.writeInt(dropperoid);
        }
        mplew.write(0);
        if (mod != 2) {
            mplew.write(0); //fuck knows
            mplew.write(1); //PET Meso pickup
        }
        if (!mesos) {
            mplew.writeLong(DateUtil.getFileTimestamp(System.currentTimeMillis()));
        }

        return mplew.getPacket();
    }

    /* (non-javadoc)
     * TODO: make MapleCharacter a mapobject, remove the need for passing oid
     * here.
     */
    /**
     * Gets a packet spawning a player as a mapobject to other clients.
     *
     * @param chr The character to spawn to other clients.
     * @return The spawn player packet.
     */
    public static MaplePacket spawnPlayerMapobject(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_PLAYER.getValue());
        mplew.writeInt(chr.getId());
        mplew.write(0);
        mplew.writeMapleAsciiString(chr.getName());
        if (chr.getGuildId() <= 0) {
            mplew.writeMapleAsciiString("");
            mplew.write(new byte[6]);
        } else {
            MapleGuildSummary gs = chr.getClient().getChannelServer().getGuildSummary(chr.getGuildId());
            if (gs != null) {
                mplew.writeMapleAsciiString(gs.getName());
                mplew.writeShort(gs.getLogoBG());
                mplew.write(gs.getLogoBGColor());
                mplew.writeShort(gs.getLogo());
                mplew.write(gs.getLogoColor());
            } else {
                mplew.writeMapleAsciiString("");
                mplew.write(new byte[6]);
            }
        }
        mplew.writeInt(0);
        mplew.write(0);
        mplew.write(0xE0);
        mplew.write(0x1F);
        mplew.write(0);
        if (chr.getBuffedValue(MapleBuffStat.MORPH) != null) {
            mplew.write(2);
        } else {
            mplew.write(0);
        }
        mplew.write(new byte[3]);
        long buffmask = 0;
        Integer buffvalue = null;
        if (chr.getBuffedValue(MapleBuffStat.DARKSIGHT) != null && !chr.isHidden()) {
            buffmask |= MapleBuffStat.DARKSIGHT.getValue();
        }
        if (chr.getBuffedValue(MapleBuffStat.COMBO) != null) {
            buffmask |= MapleBuffStat.COMBO.getValue();
            buffvalue = Integer.valueOf(chr.getBuffedValue(MapleBuffStat.COMBO).intValue());
        }
        if (chr.getBuffedValue(MapleBuffStat.SHADOWPARTNER) != null) {
            buffmask |= MapleBuffStat.SHADOWPARTNER.getValue();
        }
        if (chr.getBuffedValue(MapleBuffStat.SOULARROW) != null) {
            buffmask |= MapleBuffStat.SOULARROW.getValue();
        }
        if (chr.getBuffedValue(MapleBuffStat.MORPH) != null) {
            buffvalue = Integer.valueOf(chr.getBuffedValue(MapleBuffStat.MORPH).intValue());
        }
        mplew.writeInt((int) ((buffmask >> 32) & 0xffffffffL));
        if (buffvalue != null) {
            if (chr.getBuffedValue(MapleBuffStat.MORPH) != null) {
                mplew.writeShort(buffvalue);
            } else {
                mplew.write(buffvalue.byteValue());
            }
        }
        mplew.writeInt((int) (buffmask & 0xffffffffL));
        mplew.write(new byte[6]);
        int CHAR_MAGIC_SPAWN = new Random().nextInt();
        mplew.writeInt(CHAR_MAGIC_SPAWN);//1
        mplew.writeLong(0);
        mplew.writeShort(0);
        mplew.write(0);
        mplew.writeInt(CHAR_MAGIC_SPAWN);//2
        mplew.writeLong(0);
        mplew.writeShort(0);
        mplew.write(0);
        mplew.writeInt(CHAR_MAGIC_SPAWN);//3
        mplew.writeShort(0);
        mplew.write(0);
        IItem mount = chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -18);
        if (chr.getBuffedValue(MapleBuffStat.MONSTER_RIDING) != null && mount != null) {
            mplew.writeInt(mount.getItemId());
            mplew.writeInt(1004);
            mplew.writeInt(0x01261F00);
            mplew.write(0);
        } else {
            mplew.writeInt(CHAR_MAGIC_SPAWN);//4
            mplew.writeLong(0);
            mplew.write(0);
        }
        mplew.writeLong(0);
        mplew.writeInt(CHAR_MAGIC_SPAWN);//5
        mplew.write(0);
        mplew.write(1);
        mplew.write(0x41);
        mplew.write(0x9A);
        mplew.write(0x70);
        mplew.write(7);
        mplew.writeLong(0);
        mplew.writeShort(0);
        mplew.writeInt(CHAR_MAGIC_SPAWN);//6
        mplew.writeLong(0);
        mplew.writeInt(0);
        mplew.write(0);
        mplew.writeInt(CHAR_MAGIC_SPAWN);//7
        mplew.writeLong(0);
        mplew.writeShort(0);
        mplew.write(0);
        mplew.writeInt(CHAR_MAGIC_SPAWN);//8
        mplew.write(0);
        mplew.writeShort((short) chr.getJob().getId());
        addCharLook(mplew, chr, false);
        mplew.writeInt(chr.getInventory(MapleInventoryType.CASH).countById(5110000));
        mplew.writeInt(chr.getItemEffect());
        mplew.writeInt(0);
        mplew.writeInt(-1);
        mplew.writeInt(chr.getChair());
        mplew.writeShort(chr.getPosition().x);
        mplew.writeShort(chr.getPosition().y);
        mplew.write(chr.getStance());
        mplew.write(0);
        mplew.writeShort(0);
        mplew.writeInt(1);
        mplew.writeLong(0);
        mplew.write(0);
        mplew.writeShort(0);
        MapleInventory iv = chr.getInventory(MapleInventoryType.EQUIPPED);
        Collection<IItem> equippedC = iv.list();
        List<Item> equipped = new ArrayList<Item>(equippedC.size());
        for (IItem item : equippedC) {
            equipped.add((Item) item);
        }
        Collections.sort(equipped);
        List<IEquip> rings = new ArrayList<IEquip>();
        for (Item item : equipped) {
            if (item.getItemId() >= 1112800 && item.getItemId() <= 1112802 || item.getItemId() >= 1112001 && item.getItemId() <= 1112003) {
                rings.add(MapleRing.loadFromDb(item.getItemId(), item.getPosition(), item.getUniqueId()));
            }
        }
        Collections.sort(rings);
        if (rings.size() > 0) {
            for (IEquip ring : rings) {
                mplew.write(1);
                mplew.writeInt(1);
                mplew.writeInt(ring.getUniqueId());
                mplew.writeInt(0);
                mplew.writeInt(ring.getPartnerUniqueId());
                mplew.writeInt(0);
                mplew.writeInt(ring.getItemId());
            }
            mplew.writeShort(0);
            mplew.write(0);
        } else {
            mplew.writeInt(0);
            addRings2(mplew, chr, false);//戒指效果函数
        }
        return mplew.getPacket();
    }

    public static MaplePacket facialExpression(MapleCharacter from, int expression) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.FACIAL_EXPRESSION.getValue());
        mplew.writeInt(from.getId());
        mplew.writeInt(expression);

        return mplew.getPacket();
    }

    private static void serializeMovementList(LittleEndianWriter lew, List<LifeMovementFragment> moves) {
        lew.write(moves.size());
        for (LifeMovementFragment move : moves) {
            move.serialize(lew);
        }
    }

    public static MaplePacket movePlayer(int cid, List<LifeMovementFragment> moves) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MOVE_PLAYER.getValue());
        mplew.writeInt(cid);
        mplew.writeInt(0);
        serializeMovementList(mplew, moves);

        return mplew.getPacket();
    }

    public static MaplePacket moveSummon(int cid, int oid, Point startPos, List<LifeMovementFragment> moves) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MOVE_SUMMON.getValue());
        mplew.writeInt(cid);
        mplew.writeInt(oid);
        mplew.writeShort(startPos.x);
        mplew.writeShort(startPos.y);
        serializeMovementList(mplew, moves);

        return mplew.getPacket();
    }

    public static MaplePacket moveMonster(int useskill, int skill, int skill_1, int skill_2, int skill_3, int oid, Point startPos, List<LifeMovementFragment> moves) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MOVE_MONSTER.getValue());
        mplew.writeInt(oid);
        mplew.write(0);
        mplew.write(useskill); // 0
        mplew.write(skill); // -1
        mplew.write(skill_1); // 0
        mplew.write(skill_2); // 0
        mplew.write(skill_3); // 0
        mplew.write(0); // 0
        mplew.writeShort(startPos.x);
        mplew.writeShort(startPos.y);
        serializeMovementList(mplew, moves);

        return mplew.getPacket();
    }

    public static MaplePacket summonAttack(int cid, int summonSkillId, int newStance, List<SummonAttackEntry> allDamage) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SUMMON_ATTACK.getValue());
        mplew.writeInt(cid);
        mplew.writeInt(summonSkillId);
        mplew.write(newStance);
        mplew.write(allDamage.size());
        for (SummonAttackEntry attackEntry : allDamage) {
            mplew.writeInt(attackEntry.getMonsterOid()); // oid
            mplew.write(1); //?
            mplew.write(6); // who knows
            mplew.writeInt(attackEntry.getDamage()); // damage
        }

        return mplew.getPacket();
    }

    public static MaplePacket Combo_Effect(int combo) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.COMBO_EFFECE.getValue());
        mplew.writeInt(combo);

        return mplew.getPacket();
    }

    public static MaplePacket closeRangeAttack(int cid, int skill, int stance, int numAttackedAndDamage, List<Pair<Integer, List<Integer>>> damage, int speed, int pos) {

        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CLOSE_RANGE_ATTACK.getValue());
        if (skill == 4211006) {  // 金钱炸弹
            addMesoExplosion(mplew, cid, skill, stance, numAttackedAndDamage, 0, damage, speed, pos);
        } else {
            addAttackBody(mplew, cid, skill, stance, numAttackedAndDamage, 0, damage, speed, pos);
        }

        return mplew.getPacket();
    }
      //远程攻击
   /* public static MaplePacket rangedAttack(int cid, int skill, int stance, int numAttackedAndDamage, int projectile, List<Pair<Integer, List<Integer>>> damage, int speed) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.RANGED_ATTACK.getValue());
        return mplew.getPacket();
    } */
    
   public static MaplePacket rangedAttack(int cid, int skill, int stance, int numAttackedAndDamage, int projectile, List<Pair<Integer, List<Integer>>> damage, int speed, Short x, Short y, int pos) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.RANGED_ATTACK.getValue());
        addAttackBody(mplew, cid, skill, stance, numAttackedAndDamage, projectile, damage, speed, pos);
        mplew.writeShort(x);
        mplew.writeShort(y);
        return mplew.getPacket();
    }

    public static MaplePacket magicAttack(int cid, int skill, int stance, int numAttackedAndDamage, List<Pair<Integer, List<Integer>>> damage, int charge, int speed, int pos) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MAGIC_ATTACK.getValue());
        addAttackBody(mplew, cid, skill, stance, numAttackedAndDamage, 0, damage, speed, pos);
        if (charge != -1) {
            mplew.writeInt(charge);
        }

        return mplew.getPacket();
    }
    //魔法师攻击
    private static void addAttackBody(LittleEndianWriter lew, int cid, int skill, int stance, int numAttackedAndDamage, int projectile, List<Pair<Integer, List<Integer>>> damage, int speed, int pos) {
        lew.writeInt(cid);
        lew.write(numAttackedAndDamage);
        lew.write(0);
        if (skill > 0) {
            lew.write(0xFF); // too low and some skills don't work (?)
            lew.writeInt(skill);
        } else {
            lew.write(0);
        }
        lew.write(0);
        lew.write(pos);
        lew.write(stance);
        lew.write(speed);
        lew.write(0);
        lew.writeInt(projectile);

        for (Pair<Integer, List<Integer>> oned : damage) {
            if (oned.getRight() != null) {
                lew.writeInt(oned.getLeft().intValue());
                lew.write(0xFF);
                for (Integer eachd : oned.getRight()) {
                    lew.writeInt(skill == 3221007 ? eachd.intValue() + 0x80000000 : eachd.intValue());
                }
            }
        }
    }

    private static void addMesoExplosion(LittleEndianWriter lew, int cid, int skill, int stance, int numAttackedAndDamage, int projectile, List<Pair<Integer, List<Integer>>> damage, int speed, int pos) {
        // BC 00 90 E5 2F 00 00 5A 1A 3E 41 40 00 00 3F 00 03 0A 00 00 00 00 //078
        lew.writeInt(cid);
        lew.write(numAttackedAndDamage);
        lew.write(0x5A);
        lew.write(0x1A);
        lew.writeInt(skill);
        lew.write(0);
        lew.write(pos);
        lew.write(stance);
        lew.write(speed);
        lew.write(0x0A);
        lew.writeInt(projectile);

        for (Pair<Integer, List<Integer>> oned : damage) {
            if (oned.getRight() != null) {
                lew.writeInt(oned.getLeft().intValue());
                lew.write(0xFF);
                lew.write(oned.getRight().size());
                for (Integer eachd : oned.getRight()) {
                    lew.writeInt(eachd.intValue());
                }
            }
        }

    }

    public static MaplePacket getNPCShop(MapleClient c, int sid, List<MapleShopItem> items) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.OPEN_NPC_SHOP.getValue());
        mplew.writeInt(sid);
        mplew.writeShort(items.size()); // item count
        for (MapleShopItem item : items) {
            mplew.writeInt(item.getItemId());
            mplew.writeInt(item.getPrice());
            if (!ii.isThrowingStar(item.getItemId()) && !ii.isBullet(item.getItemId())) {
                mplew.writeShort(1); // stacksize o.o
                mplew.writeShort(item.getBuyable());
            } else {
                mplew.writeShort(0);
                mplew.writeInt(0);
                // o.O getPrice sometimes returns the unitPrice not the price
                mplew.writeShort(BitTools.doubleToShortBits(ii.getPrice(item.getItemId())));
                mplew.writeShort(ii.getSlotMax(c, item.getItemId()));
            }
        }

        return mplew.getPacket();
    }

    /**
     * code (8 = sell, 0 = buy, 0x20 = due to an error the trade did not happen
     * o.o)
     *
     * @param code
     * @return
     */
    public static MaplePacket confirmShopTransaction(byte code) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CONFIRM_SHOP_TRANSACTION.getValue());
        // mplew.writeShort(0xE6); // 47 E4
        mplew.write(code); // recharge == 8?

        return mplew.getPacket();
    }

    /*
     * 19 reference 00 01 00 = new while adding 01 01 00 = add from drop 00 01 01 = update count 00 01 03 = clear slot
     * 01 01 02 = move to empty slot 01 02 03 = move and merge 01 02 01 = move and merge with rest
     */
    public static MaplePacket addInventorySlot(MapleInventoryType type, IItem item) {
        return addInventorySlot(type, item, false);
    }

    public static MaplePacket addInventorySlot(MapleInventoryType type, IItem item, boolean fromDrop) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        if (fromDrop) {
            mplew.write(1);
        } else {
            mplew.write(0);
        }
        mplew.write(HexTool.getByteArrayFromHexString("01 00")); // add mode
        mplew.write(type.getType()); // iv type
        mplew.write(item.getPosition()); // slot id
        addItemInfo(mplew, item, true, false);

        return mplew.getPacket();
    }

    public static MaplePacket updateInventorySlot(MapleInventoryType type, IItem item) {
        return updateInventorySlot(type, item, false);
    }

    public static MaplePacket updateInventorySlot(MapleInventoryType type, IItem item, boolean fromDrop) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        if (fromDrop) {
            mplew.write(1);
        } else {
            mplew.write(0);
        }
        mplew.write(HexTool.getByteArrayFromHexString("01 01")); // update
        // mode
        mplew.write(type.getType()); // iv type
        mplew.write(item.getPosition()); // slot id
        mplew.write(0); // ?
        mplew.writeShort(item.getQuantity());

        return mplew.getPacket();
    }

    public static MaplePacket moveInventoryItem(MapleInventoryType type, byte src, byte dst) {
        return moveInventoryItem(type, src, dst, (byte) -1);
    }

    public static MaplePacket moveInventoryItem(MapleInventoryType type, byte src, byte dst, byte equipIndicator) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        mplew.write(HexTool.getByteArrayFromHexString("01 01 02"));
        mplew.write(type.getType());
        mplew.writeShort(src);
        mplew.writeShort(dst);
        if (equipIndicator != -1) {
            mplew.write(equipIndicator);
        }

        return mplew.getPacket();
    }

    public static MaplePacket moveAndMergeInventoryItem(MapleInventoryType type, byte src, byte dst, short total) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        mplew.write(HexTool.getByteArrayFromHexString("01 02 03"));
        mplew.write(type.getType());
        mplew.writeShort(src);
        mplew.write(1); // merge mode?
        mplew.write(type.getType());
        mplew.writeShort(dst);
        mplew.writeShort(total);

        return mplew.getPacket();
    }

    public static MaplePacket moveAndMergeWithRestInventoryItem(MapleInventoryType type, byte src, byte dst, short srcQ, short dstQ) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        mplew.write(HexTool.getByteArrayFromHexString("01 02 01"));
        mplew.write(type.getType());
        mplew.writeShort(src);
        mplew.writeShort(srcQ);
        mplew.write(HexTool.getByteArrayFromHexString("01"));
        mplew.write(type.getType());
        mplew.writeShort(dst);
        mplew.writeShort(dstQ);

        return mplew.getPacket();
    }

    public static MaplePacket clearInventoryItem(MapleInventoryType type, byte slot, boolean fromDrop) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        mplew.write(fromDrop ? 1 : 0);
        mplew.write(HexTool.getByteArrayFromHexString("01 03"));
        mplew.write(type.getType());
        mplew.writeShort(slot);

        return mplew.getPacket();
    }

    public static MaplePacket scrolledItem(IItem scroll, IItem item, boolean destroyed) {
        // 18 00 01 02 03 02 08 00 03 01 F7 FF 01
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        mplew.write(1); // fromdrop always true
        mplew.write(destroyed ? 2 : 3);
        mplew.write(scroll.getQuantity() > 0 ? 1 : 3);
        mplew.write(MapleInventoryType.USE.getType());
        mplew.writeShort(scroll.getPosition());
        if (scroll.getQuantity() > 0) {
            mplew.writeShort(scroll.getQuantity());
        }
        mplew.write(3);
        if (!destroyed) {
            mplew.write(MapleInventoryType.EQUIP.getType());
            mplew.writeShort(item.getPosition());
            mplew.write(0);
        }
        mplew.write(MapleInventoryType.EQUIP.getType());
        mplew.writeShort(item.getPosition());
        if (!destroyed) {
            addItemInfo(mplew, item, true, true);
        }
        mplew.write(1);

        return mplew.getPacket();
    }

    public static MaplePacket getScrollEffect(int chr, ScrollResult scrollSuccess, boolean legendarySpirit) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_SCROLL_EFFECT.getValue());
        mplew.writeInt(chr);
        switch (scrollSuccess) {
            case SUCCESS:
                mplew.writeShort(1);
                mplew.writeShort(legendarySpirit ? 1 : 0);
                break;
            case FAIL:
                mplew.writeShort(0);
                mplew.writeShort(legendarySpirit ? 1 : 0);
                break;
            case CURSE:
                mplew.write(0);
                mplew.write(1);
                mplew.writeShort(legendarySpirit ? 1 : 0);
                break;
            default:
                throw new IllegalArgumentException("effect in illegal range");
        }

        return mplew.getPacket();
    }

    public static MaplePacket removePlayerFromMap(int cid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.REMOVE_PLAYER_FROM_MAP.getValue());
        // mplew.writeShort(0x65); // 47 63
        mplew.writeInt(cid);

        return mplew.getPacket();
    }

    /**
     * animation: 0 - expire<br/> 1 - without animation<br/> 2 - pickup<br/>
     * 4 - explode<br/> cid is ignored for 0 and 1
     *
     * @param oid
     * @param animation
     * @param cid
     * @return
     */
    public static MaplePacket removeItemFromMap(int oid, int animation, int cid) {
        return removeItemFromMap(oid, animation, cid, false, 0);
    }

    /**
     * animation: 0 - expire<br/> 1 - without animation<br/> 2 - pickup<br/>
     * 4 - explode<br/> cid is ignored for 0 and 1.<br /><br />Flagging pet
     * as true will make a pet pick up the item.
     *
     * @param oid
     * @param animation
     * @param cid
     * @param pet
     * @param slot
     * @return
     */
    public static MaplePacket removeItemFromMap(int oid, int animation, int cid, boolean pet, int slot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.REMOVE_ITEM_FROM_MAP.getValue());
        mplew.write(animation); // expire
        mplew.writeInt(oid);
        if (animation >= 2) {
            mplew.writeInt(cid);
            if (pet) {
                mplew.write(slot);
            }
        }

        return mplew.getPacket();
    }

    public static MaplePacket updateCharLook(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.UPDATE_CHAR_LOOK.getValue());
        mplew.writeInt(chr.getId());
        mplew.write(1);
        addCharLook(mplew, chr, false);
        MapleInventory iv = chr.getInventory(MapleInventoryType.EQUIPPED);
        Collection<IItem> equippedC = iv.list();
        List<Item> equipped = new ArrayList<Item>(equippedC.size());
        for (IItem item : equippedC) {
            equipped.add((Item) item);
        }
        Collections.sort(equipped);
        List<IEquip> rings = new ArrayList<IEquip>();
        for (Item item : equipped) {
            if (item.getItemId() >= 1112800 && item.getItemId() <= 1112802 || item.getItemId() >= 1112001 && item.getItemId() <= 1112003) {
                rings.add(MapleRing.loadFromDb(item.getItemId(), item.getPosition(), item.getUniqueId()));
            }
        }
        Collections.sort(rings);
        if (rings.size() > 0) {
            mplew.write(0);
            for (IEquip ring : rings) {
                mplew.write(1);
                mplew.writeInt(1);//?
                mplew.writeInt(ring.getUniqueId());
                mplew.writeInt(0);
                mplew.writeInt(ring.getPartnerUniqueId());
                mplew.writeInt(0);
                mplew.writeInt(ring.getItemId());
            }
            mplew.write(0);
        } else {
            mplew.write(0);
            mplew.writeShort(0);
        }
        return mplew.getPacket();
    }

    public static MaplePacket upChrLook() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.UPCHRLOOK.getValue());
        mplew.write(HexTool.getByteArrayFromHexString("02 28 00 B9 18 B9 58 54 60 63 0C 85 32 5F 28 81 18 B9 73 EA 1B 97 70 5E CD C9 3E EB 37 42 E0 F9 96 2D 1C FE DC BA 98 76 54 32 10"));
        return mplew.getPacket();
    }

    public static MaplePacket dropInventoryItem(MapleInventoryType type, short src) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        // mplew.writeShort(0x19);
        mplew.write(HexTool.getByteArrayFromHexString("01 01 03"));
        mplew.write(type.getType());
        mplew.writeShort(src);
        if (src < 0) {
            mplew.write(1);
        }

        return mplew.getPacket();
    }

    public static MaplePacket dropInventoryItemUpdate(MapleInventoryType type, IItem item) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        mplew.write(HexTool.getByteArrayFromHexString("01 01 01"));
        mplew.write(type.getType());
        mplew.writeShort(item.getPosition());
        mplew.writeShort(item.getQuantity());

        return mplew.getPacket();
    }
    public static MaplePacket damagePlayer(int skill, int monsteridfrom, int cid, int damage) {
        return damagePlayer(skill, monsteridfrom, cid, damage, 0, 0, false, 0, false, 0, 0, 0);
    }
    public static MaplePacket damagePlayer(int skill, int monsteridfrom, int cid, int damage, int fake, int direction, boolean pgmr, int pgmr_1, boolean is_pg, int oid, int pos_x, int pos_y) {
        // 82 00 30 C0 23 00 FF 00 00 00 00 B4 34 03 00 01 00 00 00 00 00 00
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DAMAGE_PLAYER.getValue());
        // mplew.writeShort(0x84); // 47 82
        mplew.writeInt(cid);
        mplew.write(skill);
        mplew.writeInt(damage);
        mplew.writeInt(monsteridfrom);
        mplew.write(direction);
        if (pgmr) {
            mplew.write(pgmr_1);
            mplew.write(is_pg ? 1 : 0);
            mplew.writeInt(oid);
            mplew.write(6);
            mplew.writeShort(pos_x);
            mplew.writeShort(pos_y);
            mplew.write(0);
        } else {
            mplew.writeShort(0);
        }
        mplew.writeInt(damage);
        if (fake > 0) {
            mplew.writeInt(fake);
        }
        return mplew.getPacket();
    }

    public static MaplePacket charNameResponse(String charname, boolean nameUsed) {
        // 0D 00 0C 00 42 6C 61 62 6C 75 62 62 31 32 33 34 00
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CHAR_NAME_RESPONSE.getValue());
        mplew.writeMapleAsciiString(charname);
        mplew.write(nameUsed ? 1 : 0);

        return mplew.getPacket();
    }

    public static MaplePacket addNewCharEntry(MapleCharacter chr, boolean worked) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ADD_NEW_CHAR_ENTRY.getValue());
        mplew.write(worked ? 0 : 1);
        addCharEntry(mplew, chr);

        return mplew.getPacket();
    }

    /**
     *
     * @param c
     * @param quest
     * @return
     */
    public static MaplePacket startQuest(MapleCharacter c, short quest) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(1);
        mplew.writeShort(quest);
        mplew.writeShort(1);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static MaplePacket charInfo(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CHAR_INFO.getValue());
        mplew.writeInt(chr.getId());
        mplew.write(chr.getLevel());
        if (chr.getJob() != null) {
            mplew.writeShort(chr.getJob().getId());
        } else {
            mplew.writeShort(0);
        }
        mplew.writeShort(chr.getFame());
        mplew.write(chr.isMarried()); // heart red or gray
        String guildName = "-";
        String allianceName = "-";
        MapleGuildSummary gs = chr.getClient().getChannelServer().getGuildSummary(chr.getGuildId());
        if (chr.getGuildId() > 0 && gs != null) {
            guildName = gs.getName();
            try {
                MapleAlliance alliance = chr.getClient().getChannelServer().getWorldInterface().getAlliance(gs.getAllianceId());
                if (alliance != null) {
                    allianceName = alliance.getName();
                }
            } catch (RemoteException re) {
                re.printStackTrace();
                chr.getClient().getChannelServer().reconnectWorld();
            }
        }
        mplew.writeMapleAsciiString(guildName);
        mplew.writeMapleAsciiString(allianceName); // Alliance

        List<MaplePet> pets = chr.getPets();
        for (MaplePet pet : pets) {
            mplew.write(pet.getUniqueId());
            mplew.writeInt(pet.getItemId()); // petid
            mplew.writeMapleAsciiString(pet.getName());
            mplew.write(pet.getLevel()); // pet level
            mplew.writeShort(pet.getCloseness()); // pet closeness
            mplew.write(pet.getFullness()); // pet fullness
            mplew.writeShort(0); // ??
            if (chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -114) != null) {
                mplew.writeInt(chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -114).getItemId());
            } else {
                mplew.writeInt(0);
            }
        }
        mplew.write(0);
        if (chr.getMount() != null 
                && chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -18) != null) { //是否有骑宠
            if (chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -18).getItemId() == chr.getMount().getItemId()) {
                if (chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -19) != null) { // saddle
                    mplew.write(chr.getMount().getId()); //mount
                    mplew.writeInt(chr.getMount().getLevel()); //level
                    mplew.writeInt(chr.getMount().getExp()); //exp
                    mplew.writeInt(chr.getMount().getTiredness()); //tiredness
                }
            }
        } else {
            mplew.write(0);
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM wishlist WHERE charid = ?");
            ps.setInt(1, chr.getId());
            ResultSet rs = ps.executeQuery();
            int i = 0;
            while (rs.next()) {
                i++;
            }
            mplew.write(i);
            rs.close();
            ps.close();
        } catch (SQLException e) {
            log.info("Error getting wishlist data:", e);
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM wishlist WHERE charid = ? ORDER BY sn DESC");
            ps.setInt(1, chr.getId());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                mplew.writeInt(rs.getInt("sn"));
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            log.info("Error getting wishlist data:", e);
        }
        mplew.writeInt(chr.getMonsterBook().getBookLevel());
        mplew.writeInt(chr.getMonsterBook().getNormalCard());
        mplew.writeInt(chr.getMonsterBook().getSpecialCard());
        mplew.writeInt(chr.getMonsterBook().getTotalCards());
        mplew.writeInt(chr.getMonsterBookCover() > 0 ? MapleItemInformationProvider.getInstance().getCardMobId(chr.getMonsterBookCover()) : 0);
       // mplew.write(HexTool.getByteArrayFromHexString("00 00 00 00 00 00 01 00 00 00 D0 ED 2D 00 0C 87 A5 16 B4 F0 B0 16 10 00 00 00 84 E3 C6 2A 36 15 CF 59 6C 24 3E 00 CD DB 43 00 10 00 00 00 02 00 00 00 67 34 00 00 7F 36 00 00 DD CD CF 2A 10 00 00 00 B4 8B BB 2A 00 00 00 00 00 00 00 00 01 00 CD 00 10 00 00 00 18 E6 C6 2A DE 26 93 07 FD DC AB 7B 45 08 08 08 10 00 00 00"));
mplew.writeInt(0);
    mplew.writeShort(0);
    MapleInventory iv = chr.getInventory(MapleInventoryType.SETUP);
    List<Item> chairItems = new ArrayList();
    //List chairItems = new ArrayList();
   for (IItem item : iv.list() ) {
      if ((item.getItemId() >= 3010000) && (item.getItemId() <= 3020001)) {
        
          chairItems.add((Item) item);

 }
    }
   mplew.writeInt(chairItems.size());
    for (IItem item : chairItems ) {
      mplew.writeInt(item.getItemId());
    }
    mplew.writeInt(0); 
        return mplew.getPacket();
    }

    /**
     *
     * @param c
     * @param quest
     * @return
     */
    public static MaplePacket forfeitQuest(MapleCharacter c, short quest) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(1);
        mplew.writeShort(quest);
        mplew.writeShort(0);
        mplew.write(0);
        mplew.writeInt(0);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /**
     *
     * @param c
     * @param quest
     * @return
     */
    public static MaplePacket completeQuest(MapleCharacter c, short quest) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(1);
        mplew.writeShort(quest);
        mplew.write(2);
        mplew.writeLong(DateUtil.getFileTimestamp(System.currentTimeMillis()));

        return mplew.getPacket();
    }

    /**
     *
     * @param c
     * @param quest
     * @param npc
     * @param progress
     * @return
     */
    public static MaplePacket updateQuestInfo(MapleCharacter c, short quest, int npc, byte progress) {
        // [A5 00] [08] [69 08] [86 71 0F 00] [00 00 00 00]
        // [C5 00] [08] [38 20] [A9 84 8C 00] [00 00] //Ver076
        // [D2 00] [08] [39 20] [A9 84 8C 00] [00 00] //Ver077
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UPDATE_QUEST_INFO.getValue());
        mplew.write(progress);
        mplew.writeShort(quest);
        mplew.writeInt(npc);
        mplew.writeInt(0);
        return mplew.getPacket();
    }

    public static MaplePacket updateQuest(int quest, String status) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(1);
        mplew.writeShort(quest);
        mplew.write(1);
        mplew.writeMapleAsciiString(status);
        return mplew.getPacket();
    }

    public static MaplePacket updateQuestFinish(short quest, int npc, short nextquest) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.UPDATE_QUEST_INFO.getValue());
        mplew.write(8);
        mplew.writeShort(quest);
        mplew.writeInt(npc);
        mplew.writeShort(nextquest);
        mplew.writeShort(0);
        return mplew.getPacket();
    }

    private static <E extends LongValueHolder> long getLongMask(List<Pair<E, Integer>> statups) {
        long mask = 0;
        for (Pair<E, Integer> statup : statups) {
            mask |= statup.getLeft().getValue();
        }
        return mask;
    }

    private static <E extends LongValueHolder> long getLongMaskFromList(List<E> statups) {
        long mask = 0;
        for (E statup : statups) {
            mask |= statup.getValue();
        }
        return mask;
    }

    /**
     * It is important that statups is in the correct order (see decleration
     * order in MapleBuffStat) since this method doesn't do automagical
     * reordering.
     *
     * @param buffid
     * @param bufflength
     * @param statups
     * @param morph
     * @return
     */

    public static MaplePacket giveBuff(MapleCharacter c, int buffid, int bufflength, List<Pair<MapleBuffStat, Integer>> statups) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        if (bufflength % 20000000 == 1004 || bufflength == 5221006) {
            long mask = getLongMask(statups);
            mplew.write(0);
            mplew.writeLong(mask);
            mplew.writeLong(0);
            for (Pair<MapleBuffStat, Integer> statup : statups) {
                if (statup.getRight().shortValue() >= 1000 && statup.getRight().shortValue() != 1002) {
                    mplew.writeShort(statup.getRight().shortValue() + (c.getGender() * 100));
                } else {
                    mplew.write(0);
                }
                mplew.writeInt(buffid);
                mplew.writeInt(bufflength);
            }
            mplew.writeInt(0);
            mplew.writeShort(0);
            mplew.write(0);
            mplew.write(2);
        } else {
            long mask = getLongMask(statups);
            mplew.writeLong(0);
            mplew.writeLong(mask);
            for (Pair<MapleBuffStat, Integer> statup : statups) {
                if (statup.getRight().shortValue() >= 1000 && statup.getRight().shortValue() != 1002) {
                    mplew.writeShort(statup.getRight().shortValue() + (c.getGender() * 100));
                } else {
                    mplew.writeShort(statup.getRight().shortValue());
                }
                mplew.writeInt(buffid);
                mplew.writeInt(bufflength);
            }
            if (bufflength % 20000000 == 1004 || bufflength == 5221006) {
                mplew.writeInt(0);
            } else {
                mplew.writeShort(0); // ??? wk charges have 600 here o.o
            }
            mplew.write(0); // combo 600, too
            mplew.write(0); // new in v0.56
            mplew.write(0);
        }
        return mplew.getPacket();
    }

    public static MaplePacket giveGmHide(boolean hidden) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GM.getValue());
        mplew.write(16);
        mplew.write(hidden ? 1 : 0);

        return mplew.getPacket();
    }

    public static MaplePacket showMonsterRiding(int cid, List<Pair<MapleBuffStat, Integer>> statups, int itemId, int skillId) {
        //C9 00 1D CE 4A 00 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 B0 05 1D 00 EC 03 00 00 00 00 00 00 00 00 00
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        mplew.writeInt(cid);
        mplew.write(0);
        long mask = getLongMask(statups);
        mplew.writeLong(mask);
        mplew.writeLong(0);
        mplew.write(0);
        mplew.writeInt(itemId);
        mplew.writeInt(skillId);
        mplew.writeInt(0);
        mplew.writeShort(0);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static MaplePacket giveDash(List<Pair<MapleBuffStat, Integer>> statups, int duration) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        mplew.write(0);
        mplew.writeLong(MapleBuffStat.DASH.getValue());
        mplew.writeLong(0);
        mplew.write(0);
        for (Pair<MapleBuffStat, Integer> stat : statups) {
            mplew.writeInt(stat.getRight().shortValue());
            mplew.writeInt(5001005);
            mplew.writeInt(0);
            mplew.writeShort(duration);
            mplew.write(0);
        }
        mplew.write(0);
        mplew.writeShort(0);
        mplew.write(2);

        return mplew.getPacket();
    }

    public static MaplePacket showDashEffecttoOthers(int cid, List<Pair<MapleBuffStat, Integer>> statups, int duration) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        mplew.writeInt(cid);
        mplew.writeLong(0);
        mplew.writeLong(MapleBuffStat.DASH.getValue());
        mplew.writeShort(0);
        for (Pair<MapleBuffStat, Integer> stat : statups) {
            mplew.writeInt(stat.getRight().shortValue());
            mplew.writeInt(5001005);
            mplew.write(HexTool.getByteArrayFromHexString("1A 7C 8D 35"));
            mplew.writeShort(duration);
        }
        mplew.writeShort(0);

        return mplew.getPacket();
    }

    public static MaplePacket giveForeignBuff(MapleCharacter c, List<Pair<MapleBuffStat, Integer>> statups, MapleStatEffect effect) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        // [C5 00] [12 01 2B 00] [00 00 00 00 00 00 00 00] [00 00 00 00 80 00 00 00] [0A 00] [00 00] [00] //077
        // [C5 00] [1F 01 2B 00] [00 00 00 00 00 00 00 00] [00 00 00 00 80 00 00 00] [0A 00] [00 00] [00]
        // [C9 00] [1D CE 4A 00] [00 00 00 00 00 00 00 00] [02 00 00 00 80 00 00 00] [28 E8] [03 00] [00 00] [00]
        mplew.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        mplew.writeInt(c.getId());
        long mask = getLongMask(statups);
        mplew.writeLong(0);
        mplew.writeLong(mask);
        for (Pair<MapleBuffStat, Integer> statup : statups) {
            if (effect.isMorph() && statup.getRight().intValue() <= 255) {
                mplew.write(statup.getRight().byteValue());
            } else {
                if (effect.isPirateMorph()) {
                    mplew.writeShort(statup.getRight().shortValue() + (c.getGender() * 100));
                } else {
                    mplew.writeShort(statup.getRight().shortValue());
                }
            }
        }
        mplew.writeShort(0); // same as give_buff
        if (effect.isMorph() && !effect.isPirateMorph()) {
            mplew.writeShort(0);
        }
        mplew.write(0);
        mplew.write(0);//?

        return mplew.getPacket();
    }

    public static MaplePacket giveDebuff(long mask, List<Pair<MapleDisease, Integer>> statups, MobSkill skill) {
        // [1D 00] [00 00 00 00 00 00 00 00] [00 00 02 00 00 00 00 00] [00 00] [7B 00] [04 00] [B8 0B 00 00] [00 00] [84 03] [01]
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        mplew.writeLong(0);
        mplew.writeLong(mask);
        for (Pair<MapleDisease, Integer> statup : statups) {
            mplew.writeShort(statup.getRight().shortValue());
            mplew.writeShort(skill.getSkillId());
            mplew.writeShort(skill.getSkillLevel());
            mplew.writeInt((int) skill.getDuration());
        }
        mplew.writeShort(0); // ??? wk charges have 600 here o.o
        mplew.writeShort(900); //Delay
        mplew.write(2);

        return mplew.getPacket();
    }

    public static MaplePacket giveForeignDebuff(int cid, long mask, MobSkill skill) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        mplew.writeInt(cid);
        mplew.writeLong(0);
        mplew.writeLong(mask);
        mplew.writeShort(skill.getSkillId());
        mplew.writeShort(skill.getSkillLevel());
        mplew.writeShort(0);
        mplew.writeShort(0x84);
        mplew.write(3);
        return mplew.getPacket();
    }

    public static MaplePacket cancelForeignDebuff(int cid, long mask) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.CANCEL_FOREIGN_BUFF.getValue());
        mplew.writeInt(cid);
        mplew.writeLong(0);
        mplew.writeLong(mask);

        return mplew.getPacket();
    }

    public static MaplePacket cancelForeignBuff(int cid, List<MapleBuffStat> statups) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.CANCEL_FOREIGN_BUFF.getValue());
        mplew.writeInt(cid);
        long mask = getLongMaskFromList(statups);
        long mask2 = 42949673024L;
        if (mask == MapleBuffStat.MONSTER_RIDING.getValue() || mask == MapleBuffStat.DASH.getValue() || mask == mask2) {
            mplew.write(0);
        } else {
            mplew.writeLong(0);
        }
        mplew.writeLong(mask);
        if (mask == MapleBuffStat.MONSTER_RIDING.getValue() || mask == MapleBuffStat.DASH.getValue() || mask == mask2) {
            mplew.writeInt(0);
            mplew.writeShort(0);
            mplew.write(0);
        }
        return mplew.getPacket();
    }

    public static MaplePacket cancelBuff(List<MapleBuffStat> statups) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        long mask = getLongMaskFromList(statups);
        long mask2 = 42949673024L;
        if (mask == MapleBuffStat.MONSTER_RIDING.getValue() || mask == MapleBuffStat.DASH.getValue() || mask == mask2 || mask ==1142461300736L) {
            mplew.write(0);
        } else {
            mplew.writeLong(0);
        }
        mplew.writeLong(mask);
        if (mask == MapleBuffStat.MONSTER_RIDING.getValue() || mask == MapleBuffStat.DASH.getValue() || mask == mask2 || mask ==1142461300736L) { //船长下船
            mplew.writeInt(0);
            mplew.writeShort(0);
            mplew.write(0);
        }
        mplew.write(mask == MapleBuffStat.DASH.getValue() ? 4 : 3);
        return mplew.getPacket();
    }

    public static MaplePacket cancelDebuff(long mask) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        mplew.writeLong(0);
        mplew.writeLong(mask);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static MaplePacket getPlayerShopChat(MapleCharacter c, String chat, byte slot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(HexTool.getByteArrayFromHexString("06 08"));
        mplew.write(slot);
        mplew.writeMapleAsciiString(c.getName() + " : " + chat);

        return mplew.getPacket();
    }

    public static MaplePacket getPlayerShopChat(MapleCharacter c, String chat, boolean owner) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(HexTool.getByteArrayFromHexString("06 08"));
        mplew.write(owner ? 0 : 1);
        mplew.writeMapleAsciiString(c.getName() + " : " + chat);

        return mplew.getPacket();
    }

    public static MaplePacket getPlayerShopNewVisitor(MapleCharacter c, int slot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0x04);
        mplew.write(slot);
        addCharLook(mplew, c, false);
        mplew.writeMapleAsciiString(c.getName());
        return mplew.getPacket();
    }

    public static MaplePacket getPlayerShopRemoveVisitor(int slot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0x0A);
        mplew.write(slot);
        return mplew.getPacket();
    }

    public static MaplePacket getTradePartnerAdd(MapleCharacter c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(HexTool.getByteArrayFromHexString("04 01"));
        addCharLook(mplew, c, false);
        mplew.writeMapleAsciiString(c.getName());

        return mplew.getPacket();
    }

    public static MaplePacket getTradeInvite(MapleCharacter c) { // 交易邀请
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(HexTool.getByteArrayFromHexString("02 03"));
        mplew.writeMapleAsciiString(c.getName());
        mplew.write(HexTool.getByteArrayFromHexString("B7 50 00 00"));

        return mplew.getPacket();
    }

    public static MaplePacket getTradeMesoSet(byte number, int meso) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0xF);
        mplew.write(number);
        mplew.writeInt(meso);

        return mplew.getPacket();
    }

    public static MaplePacket getTradeItemAdd(byte number, IItem item) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0xE);
        mplew.write(number);
        addItemInfo(mplew, item);

        return mplew.getPacket();
    }

    public static MaplePacket getPlayerShopItemUpdate(MaplePlayerShop shop) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0x15);
        mplew.write(shop.getItems().size());
        for (MaplePlayerShopItem item : shop.getItems()) {
            mplew.writeShort(item.getBundles());
            mplew.writeShort(item.getItem().getQuantity());
            mplew.writeInt(item.getPrice());
            addItemInfo(mplew, item.getItem(), true, true);
        }

        return mplew.getPacket();
    }

    /**
     *
     * @param c
     * @param shop
     * @param owner
     * @return
     */
    public static MaplePacket getPlayerShop(MapleClient c, MaplePlayerShop shop, boolean owner) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(HexTool.getByteArrayFromHexString("05 04 04"));
        mplew.write(owner ? 0 : 1);
        mplew.write(0);
        addCharLook(mplew, shop.getMCOwner(), false);
        mplew.writeMapleAsciiString(shop.getMCOwner().getName());
        mplew.write(1);
        addCharLook(mplew, shop.getMCOwner(), false);
        mplew.writeMapleAsciiString(shop.getMCOwner().getName());
        mplew.write(0xFF);
        mplew.writeMapleAsciiString(shop.getDescription());
        List<MaplePlayerShopItem> items = shop.getItems();
        mplew.write(0x10);
        mplew.write(items.size());
        for (MaplePlayerShopItem item : items) {
            mplew.writeShort(item.getBundles());
            mplew.writeShort(item.getItem().getQuantity());
            mplew.writeInt(item.getPrice());
            addItemInfo(mplew, item.getItem(), true, true);
        }
        return mplew.getPacket();
    }

    public static MaplePacket getTradeStart(MapleClient c, MapleTrade trade, byte number) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(HexTool.getByteArrayFromHexString("05 03 02"));
        mplew.write(number);
        if (number == 1) {
            mplew.write(0);
            addCharLook(mplew, trade.getPartner().getChr(), false);
            mplew.writeMapleAsciiString(trade.getPartner().getChr().getName());
        }
        mplew.write(number);

        addCharLook(mplew, c.getPlayer(), false);
        mplew.writeMapleAsciiString(c.getPlayer().getName());
        mplew.write(0xFF);

        return mplew.getPacket();
    }

    public static MaplePacket getTradeConfirmation() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0x10);

        return mplew.getPacket();
    }

    public static MaplePacket getTradeCompletion(byte number) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0xA);
        mplew.write(number);
        mplew.write(8);

        return mplew.getPacket();
    }

    public static MaplePacket getTradeCancel(byte number) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0xA);
        mplew.write(number);
        mplew.write(2);

        return mplew.getPacket();
    }

    public static MaplePacket removeCharBox(MapleCharacter c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.UPDATE_CHAR_BOX.getValue());
        mplew.writeInt(c.getId());
        mplew.write(0);
        return mplew.getPacket();
    }

    public static MaplePacket getNPCTalk(int npc, byte msgType, String talk, String endBytes) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(4); // ?
        mplew.writeInt(npc);
        mplew.write(msgType);
        mplew.write(0); // ?
        mplew.writeMapleAsciiString(talk);
        mplew.write(HexTool.getByteArrayFromHexString(endBytes));

        return mplew.getPacket();
    }

    public static MaplePacket getNPCTalk(int npc, byte msgType, String talk, String endBytes, byte speaker) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(4); // ?
        mplew.writeInt(npc);
        mplew.write(msgType);
        mplew.write(speaker);
        mplew.writeMapleAsciiString(talk);
        mplew.write(HexTool.getByteArrayFromHexString(endBytes));
        return mplew.getPacket();
    }

    public static MaplePacket getNPCTalkStyle(int npc, String talk, int styles[], int card) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(4); // ?
        mplew.writeInt(npc);
        mplew.write(7);
        mplew.write(0);
        mplew.writeMapleAsciiString(talk);
        mplew.write(styles.length);
        for (int i = 0; i < styles.length; i++) {
            mplew.writeInt(styles[i]);
        }
        mplew.writeInt(card);
        return mplew.getPacket();
    }

    public static MaplePacket getNPCTalkNum(int npc, String talk, int def, int min, int max) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(4); // ?
        mplew.writeInt(npc);
        mplew.write(3);
        mplew.write(0);
        mplew.writeMapleAsciiString(talk);
        mplew.writeInt(def);
        mplew.writeInt(min);
        mplew.writeInt(max);

        return mplew.getPacket();
    }

    public static MaplePacket getNPCTalkText(int npc, String talk) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(4); // ?
        mplew.writeInt(npc);
        mplew.write(2);
        mplew.write(0);
        mplew.writeMapleAsciiString(talk);
        mplew.writeInt(0);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static MaplePacket showLevelup(int cid) {
        return showForeignEffect(cid, 0);
    }

    public static MaplePacket showJobChange(int cid) {
        return showForeignEffect(cid, 9);
    }

    public static MaplePacket showForeignEffect(int cid, int effect) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
        mplew.writeInt(cid); // charid
        mplew.write(effect); // 0 = Level up, 8 = ?, 9 = job change, 10 = Quest Complete

        return mplew.getPacket();
    }

       public static MaplePacket showBuffeffect(int cid, int skillid, int effectid) {
        return showBuffeffect(cid, skillid, effectid, (byte) 3, false);
    }
    
       public static MaplePacket 综合技能状态(int cid, int skillid, int effectid,int skillie) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
        mplew.writeInt(cid); // ?
        mplew.write(effectid);
        mplew.writeInt(skillid);
        mplew.write(skillie);
        return mplew.getPacket();
    }
    

       public static MaplePacket showBuffeffect(int cid, int skillid, int effectid, byte direction) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
        mplew.writeInt(cid); // ?
        mplew.write(effectid);
        mplew.writeInt(skillid);
        mplew.write(2);
        mplew.write(1);
        if (direction != (byte) 3) {
            mplew.write(direction);
        }

        return mplew.getPacket();
    }

    public static MaplePacket showBuffeffect(int cid, int skillid, int effectid, byte direction, boolean morph) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
        mplew.writeInt(cid);
        if (morph) {
            mplew.write(1);
            mplew.writeInt(skillid);
            mplew.write(direction);
        }
        mplew.write(effectid);
        mplew.writeInt(skillid);
        mplew.write(1);
        if (direction != (byte) 3) {
            mplew.write(direction);
        }

        return mplew.getPacket();
    }

    public static MaplePacket showOwnBuffEffect(int skillid, int effectid) {
        return showOwnBuffEffect(skillid,effectid,1);
    }
    
    //public static MaplePacket showOwnBuffEffect(int skillid, int effectid) {
    public static MaplePacket showOwnBuffEffect(int skillid, int effectid,int skilllevel) {  
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        mplew.write(effectid);
        mplew.writeInt(skillid);
        mplew.write(1); //Ver0.78?
        mplew.write(skilllevel);
        //mplew.write(1); // probably buff level but we don't know it and it doesn't really matter
        return mplew.getPacket();
    }

    public static MaplePacket showOwnBerserk(int skilllevel, boolean Berserk) { // 恶龙附身？
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        mplew.write(1);
        mplew.writeInt(1320006);
        mplew.write(skilllevel);
        mplew.write(Berserk ? 1 : 0);

        return mplew.getPacket();
    }

    public static MaplePacket showBerserk(int cid, int skilllevel, boolean Berserk) { // 恶龙附身？
        // [99 00] [5D 94 27 00] [01] [46 24 14 00] [14] [01]
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
        mplew.writeInt(cid);
        mplew.write(1);
        mplew.writeInt(1320006);
        mplew.write(skilllevel);
        mplew.write(Berserk ? 1 : 0);

        return mplew.getPacket();
    }

    public static MaplePacket beholderAnimation(int cid, int skillid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
        mplew.writeInt(cid);
        mplew.writeInt(skillid);
        mplew.writeShort(135);

        return mplew.getPacket();
    }
    
    public static MaplePacket updateSkill(int skillid, int level, int masterlevel) {
        // 1E 00 01 01 00 E9 03 00 00 01 00 00 00 00 00 00 00 01
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UPDATE_SKILLS.getValue());
        mplew.write(1);
        mplew.writeShort(1);
        mplew.writeInt(skillid);
        mplew.writeInt(level);
        mplew.writeInt(masterlevel);
        mplew.write(1);

        return mplew.getPacket();
    }

    public static MaplePacket updateQuestMobKills(MapleQuestStatus status) {
        // 21 00 01 FB 03 01 03 00 30 30 31
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(1);
        mplew.writeShort(status.getQuest().getId());
        mplew.write(1);
        String killStr = "";
        for (int kills : status.getMobKills().values()) {
            killStr += StringUtil.getLeftPaddedStr(String.valueOf(kills), '0', 3);
        }
        mplew.writeMapleAsciiString(killStr);
        mplew.writeInt(0);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static MaplePacket getShowQuestCompletion(int id) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_QUEST_COMPLETION.getValue());
        mplew.writeShort(id);

        return mplew.getPacket();
    }
//键盘排序
    public static MaplePacket getKeymap(Map<Integer, MapleKeyBinding> keybindings) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.KEYMAP.getValue());
        mplew.write(0);

        for (int x = 0; x < 90; x++) {
            MapleKeyBinding binding = keybindings.get(Integer.valueOf(x));
            if (binding != null) {
                mplew.write(binding.getType());
                mplew.writeInt(binding.getAction());
            } else {
                mplew.write(0);
                mplew.writeInt(0);
            }
        }

        return mplew.getPacket();
    }
    //自动吃药
    public static MaplePacket sendAutoHpPot(int itemId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.AUTO_HP_POT.getValue());
        mplew.writeInt(itemId);

        return mplew.getPacket();
    }
    //自动吃蓝
    public static MaplePacket sendAutoMpPot(int itemId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.AUTO_MP_POT.getValue());
        mplew.writeInt(itemId);

        return mplew.getPacket();
    }
    //悄悄话
    public static MaplePacket getWhisper(String sender, int channel, String text) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.WHISPER.getValue());
        mplew.write(18);
        mplew.writeMapleAsciiString(sender);
        mplew.writeShort(channel - 1);
        mplew.writeMapleAsciiString(text);

        return mplew.getPacket();
    }

    /**
     *
     * @param target name of the target character
     * @param reply error code: 0x0 = cannot find char, 0x1 = success
     * @return the MaplePacket
     */
    public static MaplePacket getWhisperReply(String target, byte reply) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.WHISPER.getValue());
        mplew.write(10);
        mplew.writeMapleAsciiString(target);
        mplew.write(reply);

        return mplew.getPacket();
    }

    public static MaplePacket getFindReplyWithMap(String target, int mapid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.WHISPER.getValue());
        mplew.write(9);
        mplew.writeMapleAsciiString(target);
        mplew.write(1);
        mplew.writeInt(mapid);
        mplew.write(new byte[8]); // ?? official doesn't send zeros here but whatever

        return mplew.getPacket();
    }

    public static MaplePacket getFindReply(String target, int channel) {
        // Received UNKNOWN (1205941596.79689): (25)
        // 54 00 09 07 00 64 61 76 74 73 61 69 01 86 7F 3D 36 D5 02 00 00 22 00
        // 00 00
        // T....davtsai..=6...."...
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.WHISPER.getValue());
        mplew.write(9);
        mplew.writeMapleAsciiString(target);
        mplew.write(3);
        mplew.writeInt(channel - 1);

        return mplew.getPacket();
    }

    public static MaplePacket getInventoryFull() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        mplew.write(1);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static MaplePacket getShowInventoryFull() {
        return getShowInventoryStatus(0xff);
    }

    public static MaplePacket showItemUnavailable() {
        return getShowInventoryStatus(0xfe);
    }

    public static MaplePacket getShowInventoryStatus(int mode) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(0);
        mplew.write(mode);
        mplew.writeInt(0);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static MaplePacket getStorage(int npcId, byte slots, Collection<IItem> items, int meso) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        mplew.write(0x16);
        mplew.writeInt(npcId);
        mplew.write(slots);
        mplew.writeShort(0x7E);
        mplew.writeShort(0);
        mplew.writeInt(0);
        mplew.writeInt(meso);
        mplew.write((byte) items.size());
        for (IItem item : items) {
            addItemInfo(mplew, item, true, true);
        }
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static MaplePacket getStorageFull() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        mplew.write(0x11);

        return mplew.getPacket();
    }

    public static MaplePacket mesoStorage(byte slots, int meso) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        mplew.write(0x13);
        mplew.write(slots);
        mplew.writeShort(2);
        mplew.writeShort(0);
        mplew.writeInt(0);
        mplew.writeInt(meso);

        return mplew.getPacket();
    }

    public static MaplePacket storeStorage(byte slots, MapleInventoryType type, Collection<IItem> items) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        mplew.write(0xD);
        mplew.write(slots);
        mplew.writeShort(type.getBitfieldEncoding());
        mplew.writeShort(0);
        mplew.writeInt(0);
        mplew.write(items.size());
        for (IItem item : items) {
            addItemInfo(mplew, item, true, true);
        // mplew.write(0);
        }

        return mplew.getPacket();
    }

    public static MaplePacket takeOutStorage(byte slots, MapleInventoryType type, Collection<IItem> items) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        mplew.write(0x9);
        mplew.write(slots);
        mplew.writeShort(type.getBitfieldEncoding());
        mplew.writeShort(0);
        mplew.writeInt(0);
        mplew.write(items.size());
        for (IItem item : items) {
            addItemInfo(mplew, item, true, true);
        // mplew.write(0);
        }

        return mplew.getPacket();
    }

    /**
     *
     * @param oid
     * @param remhp in %
     * @return
     */
    //显示怪物HP
    public static MaplePacket showMonsterHP(int oid, int remhppercentage) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_MONSTER_HP.getValue());
        mplew.writeInt(oid);
        mplew.write(remhppercentage);

        return mplew.getPacket();
    }
    //显示BOSS HP
    public static MaplePacket showBossHP(int oid, int currHP, int maxHP, byte tagColor, byte tagBgColor) {
        //53 00 05 21 B3 81 00 46 F2 5E 01 C0 F3 5E 01 04 01
        //00 81 B3 21 = 8500001 = Pap monster ID
        //01 5E F3 C0 = 23,000,000 = Pap max HP
        //04, 01 - boss bar color/background color as provided in WZ
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BOSS_ENV.getValue());
        mplew.write(5);
        mplew.writeInt(oid);
        mplew.writeInt(currHP);
        mplew.writeInt(maxHP);
        mplew.write(tagColor);
        mplew.write(tagBgColor);

        return mplew.getPacket();
    }
    //人气反馈
    public static MaplePacket giveFameResponse(int mode, String charname, int newfame) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.FAME_RESPONSE.getValue());
        mplew.write(0);
        mplew.writeMapleAsciiString(charname);
        mplew.write(mode);
        mplew.writeShort(newfame);
        mplew.writeShort(0);

        return mplew.getPacket();
    }

    /**
     * status can be: <br>
     * 0: ok, use giveFameResponse<br>
     * 1: the username is incorrectly entered<br>
     * 2: users under level 15 are unable to toggle with fame.<br>
     * 3: can't raise or drop fame anymore today.<br>
     * 4: can't raise or drop fame for this character for this month anymore.<br>
     * 5: received fame, use receiveFame()<br>
     * 6: level of fame neither has been raised nor dropped due to an unexpected
     * error
     *
     * @param status
     * @return
     */
    public static MaplePacket giveFameErrorResponse(int status) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.FAME_RESPONSE.getValue());
        mplew.write(status);

        return mplew.getPacket();
    }

    public static MaplePacket receiveFame(int mode, String charnameFrom) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.FAME_RESPONSE.getValue());
        mplew.write(5);
        mplew.writeMapleAsciiString(charnameFrom);
        mplew.write(mode);

        return mplew.getPacket();
    }
    //开启组队
    public static MaplePacket partyCreated() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        mplew.write(8);

        mplew.writeShort(0x8b);
        mplew.writeShort(2);
        mplew.write(CHAR_INFO_MAGIC);
        mplew.write(CHAR_INFO_MAGIC);
        mplew.writeInt(0);

        return mplew.getPacket();
    }
     //组队邀请
    public static MaplePacket partyInvite(MapleCharacter from) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        mplew.write(4);
        mplew.writeInt(from.getParty().getId());
        mplew.writeMapleAsciiString(from.getName());
        mplew.write(0);

        return mplew.getPacket();
    }

    /**
     * 10: A beginner can't create a party.
     * 1/11/14/19: Your request for a party didn't work due to an unexpected error.
     * 13: You have yet to join a party.
     * 16: Already have joined a party.
     * 17: The party you're trying to join is already in full capacity.
     * 19: Unable to find the requested character in this channel.
     *
     * @param message
     * @return
     */
    public static MaplePacket partyStatusMessage(int message) {
        // 32 00 08 DA 14 00 00 FF C9 9A 3B FF C9 9A 3B 22 03 6E 67
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        mplew.write(message);
        return mplew.getPacket();
    }

    /**
     * 23: 'Char' have denied request to the party.
     *
     * @param message
     * @param charname
     * @return
     */
    public static MaplePacket partyStatusMessage(int message, String charname) {
        // 32 00 08 DA 14 00 00 FF C9 9A 3B FF C9 9A 3B 22 03 6E 67
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        mplew.write(message);
        mplew.writeMapleAsciiString(charname);

        return mplew.getPacket();
    }

    private static void addPartyStatus(int forchannel, MapleParty party, LittleEndianWriter lew, boolean leaving) {
        List<MaplePartyCharacter> partymembers = new ArrayList<MaplePartyCharacter>(party.getMembers());
        while (partymembers.size() < 6) {
            partymembers.add(new MaplePartyCharacter());
        }
        for (MaplePartyCharacter partychar : partymembers) {
            lew.writeInt(partychar.getId());
        }
        for (MaplePartyCharacter partychar : partymembers) {
            lew.writeAsciiString(StringUtil.getRightPaddedStr(partychar.getName(), '\0', 13));
        }
        for (MaplePartyCharacter partychar : partymembers) {
            lew.writeInt(partychar.getJobId());
        }
        for (MaplePartyCharacter partychar : partymembers) {
            lew.writeInt(partychar.getLevel());
        }
        for (MaplePartyCharacter partychar : partymembers) {
            if (partychar.isOnline()) {
                lew.writeInt(partychar.getChannel() - 1);
            } else {
                lew.writeInt(-2);
            }
        }
        lew.writeInt(party.getLeader().getId());
        for (MaplePartyCharacter partychar : partymembers) {
            if (partychar.getChannel() == forchannel) {
                lew.writeInt(partychar.getMapid());
            } else {
                lew.writeInt(0);
            }
        }
        for (MaplePartyCharacter partychar : partymembers) {
            if (partychar.getChannel() == forchannel && !leaving) {
                lew.writeInt(partychar.getDoorTown());
                lew.writeInt(partychar.getDoorTarget());
                lew.writeInt(partychar.getDoorPosition().x);
                lew.writeInt(partychar.getDoorPosition().y);
            } else {
                lew.writeInt(0);
                lew.writeInt(0);
                lew.writeInt(0);
                lew.writeInt(0);
            }
        }
    }

    public static MaplePacket updateParty(int forChannel, MapleParty party, PartyOperation op, MaplePartyCharacter target) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        switch (op) {
            case DISBAND:
            case EXPEL:
            case LEAVE:
                mplew.write(0xC);
                mplew.writeInt(party.getId());
                mplew.writeInt(target.getId());

                if (op == PartyOperation.DISBAND) {
                    mplew.write(0);
                    mplew.writeInt(party.getId());
                } else {
                    mplew.write(1);
                    if (op == PartyOperation.EXPEL) {
                        mplew.write(1);
                    } else {
                        mplew.write(0);
                    }
                    mplew.writeMapleAsciiString(target.getName());
                    addPartyStatus(forChannel, party, mplew, false);
                // addLeavePartyTail(mplew);
                }

                break;
            case JOIN:
                mplew.write(0xF);
                mplew.writeInt(party.getId());
                mplew.writeMapleAsciiString(target.getName());
                addPartyStatus(forChannel, party, mplew, false);
                // addJoinPartyTail(mplew);
                break;
            case SILENT_UPDATE:
            case LOG_ONOFF:
                mplew.write(0x7);
                mplew.writeInt(party.getId());
                addPartyStatus(forChannel, party, mplew, false);
                break;
            case CHANGE_LEADER:
                mplew.write(0x1A);
                mplew.writeInt(target.getId());
                mplew.write(0);
                break;

        }

        return mplew.getPacket();
    }

    public static MaplePacket partyPortal(int townId, int targetId, Point position) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        mplew.writeShort(0x23);
        mplew.writeInt(townId);
        mplew.writeInt(targetId);
        mplew.writeShort(position.x);
        mplew.writeShort(position.y);

        return mplew.getPacket();
    }

    public static MaplePacket updatePartyMemberHP(int cid, int curhp, int maxhp) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UPDATE_PARTYMEMBER_HP.getValue());
        mplew.writeInt(cid);
        mplew.writeInt(curhp);
        mplew.writeInt(maxhp);

        return mplew.getPacket();
    }

    /**
     * mode: 0 buddychat; 1 partychat; 2 guildchat; 3 Alliance chat
     *
     * @param name
     * @param chattext
     * @param mode
     * @return
     */
    public static MaplePacket multiChat(String name, String chattext, int mode) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MULTICHAT.getValue());
        mplew.write(mode);
        mplew.writeMapleAsciiString(name);
        mplew.writeMapleAsciiString(chattext);

        return mplew.getPacket();
    }

    public static MaplePacket applyMonsterStatus(int oid, Map<MonsterStatus, Integer> stats, int skill, boolean monsterSkill, int delay) {
        return applyMonsterStatus(oid, stats, skill, monsterSkill, delay, null);
    }

    public static MaplePacket applyMonsterStatus(int oid, Map<MonsterStatus, Integer> stats, int skill, boolean monsterSkill, int delay, MobSkill mobskill) {
        // 9B 00 67 40 6F 00 80 00 00 00 01 00 FD FE 30 00 08 00 64 00 01
        // 1D 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 10 00 01 00 79 00 01 00 B4 78 00 00 00 00 84 03
        // B4 00 A8 90 03 00 00 00 04 00 01 00 8C 00 03 00 14 00 4C 04 02
        // D8 00 EF AE F4 00 00 00 01 00 01 00 5D 43 23 00 0E 00 E8 03 02
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.APPLY_MONSTER_STATUS.getValue());
        mplew.writeInt(oid);
        int mask = 0;
        for (MonsterStatus stat : stats.keySet()) {
            mask |= stat.getValue();
        }
        mplew.writeLong(0);
        mplew.writeInt(0);
        mplew.writeInt(mask);
        for (Integer val : stats.values()) {
            mplew.writeShort(val);
            if (monsterSkill) {
                mplew.writeShort(mobskill.getSkillId());
                mplew.writeShort(mobskill.getSkillLevel());
            } else {
                mplew.writeInt(skill);
            }
            mplew.writeShort(0); // as this looks similar to giveBuff this
        // might actually be the buffTime but it's not displayed anywhere

        }
        mplew.writeShort(delay); // delay in ms
        mplew.write(2); // ?

        return mplew.getPacket();
    }

    public static MaplePacket cancelMonsterStatus(int oid, Map<MonsterStatus, Integer> stats) {
        // D9 00 EF AE F4 00 00 00 01 00 03 //074
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CANCEL_MONSTER_STATUS.getValue());
        mplew.writeInt(oid);
        int mask = 0;
        for (MonsterStatus stat : stats.keySet()) {
            mask |= stat.getValue();
        }
        mplew.writeLong(0);
        mplew.writeInt(0);
        mplew.writeInt(mask);
        mplew.write(3);

        return mplew.getPacket();
    }

    public static MaplePacket getClock(int time) { // time in seconds
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CLOCK.getValue());
        mplew.write(2); // clock type. if you send 3 here you have to send another byte (which does not matter at all) before the timestamp
        mplew.writeInt(time);

        return mplew.getPacket();
    }

    public static MaplePacket getClockTime(int hour, int min, int sec) { // Current Time
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CLOCK.getValue());
        mplew.write(1); // Clock-Type
        mplew.write(hour);
        mplew.write(min);
        mplew.write(sec);
        return mplew.getPacket();
    }

    public static MaplePacket spawnLove(int oid, int itemid, String name, String msg, Point pos, int ft) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SPAWN_LOVE.getValue());
        mplew.writeInt(oid);
        mplew.writeInt(itemid);
        mplew.writeMapleAsciiString(msg);
        mplew.writeMapleAsciiString(name);
        mplew.writeShort(pos.x);
        mplew.writeShort(ft);
        return mplew.getPacket();
    }

    public static MaplePacket removeLove(int oid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.REMOVE_LOVE.getValue());
        mplew.writeInt(oid);
        return mplew.getPacket();
    }

    public static MaplePacket spawnFace(int skill) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(0xCF);
        mplew.writeInt(skill);
        return mplew.getPacket();
    }

    public static MaplePacket spawnMist(MapleMist mist) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        Rectangle position = mist.getBox();
        mplew.writeShort(SendPacketOpcode.SPAWN_MIST.getValue());
        mplew.writeInt(mist.getObjectId());
        mplew.writeInt(mist.isMobMist() ? 0 : mist.isPoison() ? 1 : 2);
        mplew.writeInt(mist.getOwner().getId());
        mplew.writeInt(mist.getSourceSkill().getId());
        mplew.write(mist.getOwner().getSkillLevel(mist.getSourceSkill()));
        mplew.writeShort(mist.isMobMist() ? 0 : 8);
        mplew.writeInt(position.x);
        mplew.writeInt(position.y);
        mplew.writeInt(position.x + position.width);
        mplew.writeInt(position.y + position.height);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    //臭屁 花香
    public static MaplePacket spawnCashMist(MapleCharacter chr, int itemid) {
        //if(show)//System.out.println("调用的函数："+new Throwable().getStackTrace()[0]); //显示调用的类 函数名 函数所在行
        int x = chr.getPosition().x;
        int y = chr.getPosition().y;
        int x1 = -110 + x;
        int y1 = -82 + y;
        int x2 = 110 + x;
        int y2 = 83 + y;
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SPAWN_MIST.getValue());
        mplew.writeInt(104);
        mplew.writeInt(3);
        mplew.writeInt(chr.getId());
        mplew.writeInt(itemid);
        mplew.write(0);
        mplew.writeShort(3);
        mplew.writeInt(x1);
        mplew.writeInt(y1);
        mplew.writeInt(x2);
        mplew.writeInt(y2);
        mplew.writeInt(0);
        return mplew.getPacket();
    }
    //移除烟雾
    public static MaplePacket removeMist(int oid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.REMOVE_MIST.getValue());
        mplew.writeInt(oid);

        return mplew.getPacket();
    }
    //怪物伤害
    public static MaplePacket damageSummon(int cid, int summonSkillId, int damage, int unkByte, int monsterIdFrom) {
        // 77 00 29 1D 02 00 FA FE 30 00 00 10 00 00 00 BF 70 8F 00 00
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DAMAGE_SUMMON.getValue());
        mplew.writeInt(cid);
        mplew.writeInt(summonSkillId);
        mplew.write(unkByte);
        mplew.writeInt(damage);
        mplew.writeInt(monsterIdFrom);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static MaplePacket damageMonster(int oid, int damage) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DAMAGE_MONSTER.getValue());
        mplew.writeInt(oid);
        mplew.write(0);
        mplew.writeInt(damage);

        return mplew.getPacket();
    }

    public static MaplePacket healMonster(int oid, int heal) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DAMAGE_MONSTER.getValue());
        mplew.writeInt(oid);
        mplew.write(0);
        mplew.writeInt(-heal);

        return mplew.getPacket();
    }

    public static MaplePacket updateBuddylist(Collection<BuddylistEntry> buddylist) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BUDDYLIST.getValue());
        mplew.write(7);
        mplew.write(buddylist.size());
        for (BuddylistEntry buddy : buddylist) {
            if (buddy.isVisible()) {
                mplew.writeInt(buddy.getCharacterId()); // cid
                mplew.writeAsciiString(StringUtil.getRightPaddedStr(buddy.getName(), '\0', 13));
                mplew.write(0);
                mplew.writeInt(buddy.getChannel() - 1);
                mplew.writeAsciiString(StringUtil.getRightPaddedStr(buddy.getGroup(), '\0', 17));
            }
        }
        for (int x = 0; x < buddylist.size(); x++) {
            mplew.writeInt(0);
        }
        return mplew.getPacket();
    }

    public static MaplePacket buddylistMessage(byte message) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BUDDYLIST.getValue());
        mplew.write(message);

        return mplew.getPacket();
    }

    public static MaplePacket requestBuddylistAdd(int cidFrom, String nameFrom) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BUDDYLIST.getValue());
        mplew.write(9);
        mplew.writeInt(cidFrom);
        mplew.writeMapleAsciiString(nameFrom);
        mplew.writeInt(cidFrom);
        mplew.writeAsciiString(StringUtil.getRightPaddedStr(nameFrom, '\0', 13));
        mplew.write(1);
        mplew.write(5);
        mplew.write(0);
        mplew.writeShort(0);
        mplew.writeAsciiString(StringUtil.getRightPaddedStr("群未定", '\0', 17));
        mplew.write(0);

        return mplew.getPacket();
    }

    public static MaplePacket updateBuddyChannel(int characterid, int channel) {
        // 38 00 14 F5 C5 58 00 00 06 00 00 00
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BUDDYLIST.getValue());
        mplew.write(0x14);
        mplew.writeInt(characterid);
        mplew.write(0);
        mplew.writeInt(channel);

        return mplew.getPacket();
    }

    public static MaplePacket itemEffect(int characterid, int itemid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_ITEM_EFFECT.getValue());

        mplew.writeInt(characterid);
        mplew.writeInt(itemid);

        return mplew.getPacket();
    }

    public static MaplePacket itemEffects(int characterid, int itemid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());

        mplew.writeInt(characterid);
        mplew.writeInt(itemid);

        return mplew.getPacket();
    }

    public static MaplePacket updateBuddyCapacity(int capacity) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BUDDYLIST.getValue());
        mplew.write(0x15);
        mplew.write(capacity);

        return mplew.getPacket();
    }
     //椅子效果
    public static MaplePacket showChair(int characterid, int itemid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_CHAIR.getValue());

        mplew.writeInt(characterid);
        mplew.writeInt(itemid);

        return mplew.getPacket();
    }

    public static MaplePacket cancelChair() {
        return cancelChair(-1);
    }

    public static MaplePacket cancelChair(int id) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CANCEL_CHAIR.getValue());
        if (id == -1) {
            mplew.write(0);
        } else {
            mplew.write(1);
            mplew.writeShort(id);
        }
        return mplew.getPacket();
    }

    // is there a way to spawn reactors non-animated?
    public static MaplePacket spawnReactor(MapleReactor reactor) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        Point pos = reactor.getPosition();

        mplew.writeShort(SendPacketOpcode.REACTOR_SPAWN.getValue());
        mplew.writeInt(reactor.getObjectId());
        mplew.writeInt(reactor.getId());
        mplew.write(reactor.getState());
        mplew.writeShort(pos.x);
        mplew.writeShort(pos.y);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static MaplePacket triggerReactor(MapleReactor reactor, int stance) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        Point pos = reactor.getPosition();

        mplew.writeShort(SendPacketOpcode.REACTOR_HIT.getValue());
        mplew.writeInt(reactor.getObjectId());
        mplew.write(reactor.getState());
        mplew.writeShort(pos.x);
        mplew.writeShort(pos.y);
        mplew.writeShort(stance);
        mplew.write(0);
        mplew.write(5); // frame delay, set to 5 since there doesn't appear to be a fixed formula for it

        return mplew.getPacket();
    }

    public static MaplePacket destroyReactor(MapleReactor reactor) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        Point pos = reactor.getPosition();

        mplew.writeShort(SendPacketOpcode.REACTOR_DESTROY.getValue());
        mplew.writeInt(reactor.getObjectId());
        mplew.write(reactor.getState());
        mplew.writeShort(pos.x);
        mplew.writeShort(pos.y);

        return mplew.getPacket();
    }

    public static MaplePacket musicChange(String song) {
        return environmentChange(song, 6);
    }

    public static MaplePacket showEffect(String effect) {
        return environmentChange(effect, 3);
    }

    public static MaplePacket playSound(String sound) {
        return environmentChange(sound, 4);
    }

    public static MaplePacket environmentChange(String env, int mode) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BOSS_ENV.getValue());
        mplew.write(mode);
        mplew.writeMapleAsciiString(env);

        return mplew.getPacket();
    }

    public static MaplePacket startMapEffect(String msg, int itemid, boolean active) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MAP_EFFECT.getValue());
        mplew.write(active ? 0 : 1);

        mplew.writeInt(itemid);
        if (active) {
            mplew.writeMapleAsciiString(msg);
        }

        return mplew.getPacket();
    }

    public static MaplePacket removeMapEffect() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MAP_EFFECT.getValue());
        mplew.write(0);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static MaplePacket showGuildInfo(MapleCharacter c) {
        //whatever functions calling this better make sure
        //that the character actually HAS a guild
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        mplew.write(0x1A); //signature for showing guild info
        if (c == null) { //show empty guild (used for leaving, expelled)
            mplew.write(0);
            return mplew.getPacket();
        }
        MapleGuildCharacter initiator = c.getMGC();
        MapleGuild g = c.getClient().getChannelServer().getGuild(initiator);
        if (g == null) { //failed to read from DB - don't show a guild
            mplew.write(0);
            log.warn(MapleClient.getLogMessage(c, "Couldn't load a guild"));
            return mplew.getPacket();
        } else {
            //MapleGuild holds the absolute correct value of guild rank
            //after it is initiated
            MapleGuildCharacter mgc = g.getMGC(c.getId());
            c.setGuildRank(mgc.getGuildRank());
        }
        mplew.write(1); //bInGuild
        mplew.writeInt(c.getGuildId()); //not entirely sure about this one
        mplew.writeMapleAsciiString(g.getName());
        for (int i = 1; i <= 5; i++) {
            mplew.writeMapleAsciiString(g.getRankTitle(i));
        }
        Collection<MapleGuildCharacter> members = g.getMembers();
        mplew.write(members.size());
        //then it is the size of all the members
        for (MapleGuildCharacter mgc : members) // and each of their character ids o_O
        {
            mplew.writeInt(mgc.getId());
        }
        for (MapleGuildCharacter mgc : members) {
            mplew.writeAsciiString(StringUtil.getRightPaddedStr(mgc.getName(), '\0', 13));
            mplew.writeInt(mgc.getJobId());
            mplew.writeInt(mgc.getLevel());
            mplew.writeInt(mgc.getGuildRank());
            mplew.writeInt(mgc.isOnline() ? 1 : 0);
            mplew.writeInt(g.getSignature());
            mplew.writeInt(mgc.getAllianceRank());
        }
        mplew.writeInt(g.getCapacity());
        mplew.writeShort(g.getLogoBG());
        mplew.write(g.getLogoBGColor());
        mplew.writeShort(g.getLogo());
        mplew.write(g.getLogoColor());
        mplew.writeMapleAsciiString(g.getNotice());
        mplew.writeInt(g.getGP());
        mplew.writeInt(g.getAllianceId());

        // System.out.println("DEBUG: showGuildInfo packet:\n" + mplew.toString());
        return mplew.getPacket();
    }
       //家族
    private static void getGuildInfo(MaplePacketLittleEndianWriter mplew, MapleGuild guild) {
        mplew.writeInt(guild.getId());
        mplew.writeMapleAsciiString(guild.getName());
        for (int i = 1; i <= 5; i++) {
            mplew.writeMapleAsciiString(guild.getRankTitle(i));
        }
        Collection<MapleGuildCharacter> members = guild.getMembers();
        mplew.write(members.size());
        //then it is the size of all the members
        for (MapleGuildCharacter mgc : members) //and each of their character ids o_O
        {
            mplew.writeInt(mgc.getId());
        }
        for (MapleGuildCharacter mgc : members) {
            mplew.writeAsciiString(StringUtil.getRightPaddedStr(mgc.getName(), '\0', 13));
            mplew.writeInt(mgc.getJobId());
            mplew.writeInt(mgc.getLevel());
            mplew.writeInt(mgc.getGuildRank());
            mplew.writeInt(mgc.isOnline() ? 1 : 0);
            mplew.writeInt(guild.getSignature());
            mplew.writeInt(mgc.getAllianceRank());
        }
        mplew.writeInt(guild.getCapacity());
        mplew.writeShort(guild.getLogoBG());
        mplew.write(guild.getLogoBGColor());
        mplew.writeShort(guild.getLogo());
        mplew.write(guild.getLogoColor());
        mplew.writeMapleAsciiString(guild.getNotice());
        mplew.writeInt(guild.getGP());
        mplew.writeInt(guild.getAllianceId());
    }

    public static MaplePacket makeNewAlliance(MapleAlliance alliance, MapleClient c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        mplew.write(0x0F);
        mplew.writeInt(alliance.getId());
        mplew.writeMapleAsciiString(alliance.getName());
        for (int i = 1; i <= 5; i++) {
            mplew.writeMapleAsciiString(alliance.getRankTitle(i));
        }
        mplew.write(alliance.getGuilds().size());
        for (Integer guild : alliance.getGuilds()) {
            mplew.writeInt(guild);
        }
        mplew.writeInt(2); // probably capacity
        mplew.writeShort(0);
        for (Integer guildd : alliance.getGuilds()) {
            try {
                getGuildInfo(mplew, c.getChannelServer().getWorldInterface().getGuild(guildd, null));
            } catch (RemoteException re) {
                c.getChannelServer().reconnectWorld();
            }
        }
        return mplew.getPacket();
    }

    public static MaplePacket guildMemberOnline(int gid, int cid, boolean bOnline) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        mplew.write(0x3d);
        mplew.writeInt(gid);
        mplew.writeInt(cid);
        mplew.write(bOnline ? 1 : 0);

        return mplew.getPacket();
    }

    public static MaplePacket guildInvite(int gid, String charName) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        mplew.write(0x05);
        mplew.writeInt(gid);
        mplew.writeMapleAsciiString(charName);

        return mplew.getPacket();
    }

    /**
     * 'Char' has denied your guild invitation.
     *
     * @param charname
     * @return
     */
    public static MaplePacket denyGuildInvitation(String charname) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        mplew.write(0x37);
        mplew.writeMapleAsciiString(charname);

        return mplew.getPacket();
    }

    public static MaplePacket genericGuildMessage(byte code) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        mplew.write(code);

        return mplew.getPacket();
    }

    public static MaplePacket newGuildMember(MapleGuildCharacter mgc) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        mplew.write(0x27);
        mplew.writeInt(mgc.getGuildId());
        mplew.writeInt(mgc.getId());
        mplew.writeAsciiString(StringUtil.getRightPaddedStr(mgc.getName(), '\0', 13));
        mplew.writeInt(mgc.getJobId());
        mplew.writeInt(mgc.getLevel());
        mplew.writeInt(mgc.getGuildRank()); //should be always 5 but whatevs
        mplew.writeInt(mgc.isOnline() ? 1 : 0); //should always be 1 too
        mplew.writeInt(1); //? could be guild signature, but doesn't seem to matter
        mplew.writeInt(3);

        return mplew.getPacket();
    }

    //someone leaving, mode == 0x2c for leaving, 0x2f for expelled
    public static MaplePacket memberLeft(MapleGuildCharacter mgc, boolean bExpelled) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        mplew.write(bExpelled ? 0x2f : 0x2c);

        mplew.writeInt(mgc.getGuildId());
        mplew.writeInt(mgc.getId());
        mplew.writeMapleAsciiString(mgc.getName());

        return mplew.getPacket();
    }

    //rank change
    public static MaplePacket changeRank(MapleGuildCharacter mgc) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        mplew.write(0x40);
        mplew.writeInt(mgc.getGuildId());
        mplew.writeInt(mgc.getId());
        mplew.write(mgc.getGuildRank());

        return mplew.getPacket();
    }

    public static MaplePacket guildNotice(int gid, String notice) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        mplew.write(0x44);

        mplew.writeInt(gid);
        mplew.writeMapleAsciiString(notice);

        return mplew.getPacket();
    }

    public static MaplePacket guildMemberLevelJobUpdate(MapleGuildCharacter mgc) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        mplew.write(0x3C);

        mplew.writeInt(mgc.getGuildId());
        mplew.writeInt(mgc.getId());
        mplew.writeInt(mgc.getLevel());
        mplew.writeInt(mgc.getJobId());

        return mplew.getPacket();
    }

    public static MaplePacket rankTitleChange(int gid, String[] ranks) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        mplew.write(0x3e);
        mplew.writeInt(gid);

        for (int i = 0; i < 5; i++) {
            mplew.writeMapleAsciiString(ranks[i]);
        }

        return mplew.getPacket();
    }

    public static MaplePacket guildDisband(int gid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        mplew.write(0x32);
        mplew.writeInt(gid);
        mplew.write(1);

        return mplew.getPacket();
    }

    public static MaplePacket guildEmblemChange(int gid, short bg, byte bgcolor, short logo, byte logocolor) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        mplew.write(0x42);
        mplew.writeInt(gid);
        mplew.writeShort(bg);
        mplew.write(bgcolor);
        mplew.writeShort(logo);
        mplew.write(logocolor);

        return mplew.getPacket();
    }

    public static MaplePacket guildCapacityChange(int gid, int capacity) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        mplew.write(0x3a);
        mplew.writeInt(gid);
        mplew.write(capacity);

        return mplew.getPacket();
    }

    public static void addThread(MaplePacketLittleEndianWriter mplew, ResultSet rs) throws SQLException {
        mplew.writeInt(rs.getInt("localthreadid"));
        mplew.writeInt(rs.getInt("postercid"));
        mplew.writeMapleAsciiString(rs.getString("name"));
        mplew.writeLong(DateUtil.getFileTimestamp(rs.getLong("timestamp")));
        mplew.writeInt(rs.getInt("icon"));
        mplew.writeInt(rs.getInt("replycount"));
    }

    public static MaplePacket BBSThreadList(ResultSet rs, int start) throws SQLException {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BBS_OPERATION.getValue());
        mplew.write(0x06);
        if (!rs.last()) {
            //no result at all
            mplew.write(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
            return mplew.getPacket();
        }
        int threadCount = rs.getRow();
        if (rs.getInt("localthreadid") == 0) { //has a notice
            mplew.write(1);
            addThread(mplew, rs);
            threadCount--; //one thread didn't count (because it's a notice)
        } else {
            mplew.write(0);
        }
        if (!rs.absolute(start + 1)) { //seek to the thread before where we start
            rs.first(); //uh, we're trying to start at a place past possible
            start = 0;
        // System.out.println("Attempting to start past threadCount");
        }
        mplew.writeInt(threadCount);
        mplew.writeInt(Math.min(10, threadCount - start));
        for (int i = 0; i < Math.min(10, threadCount - start); i++) {
            addThread(mplew, rs);
            rs.next();
        }

        return mplew.getPacket();
    }

    public static MaplePacket showThread(int localthreadid, ResultSet threadRS, ResultSet repliesRS) throws SQLException, RuntimeException {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BBS_OPERATION.getValue());
        mplew.write(0x07);
        mplew.writeInt(localthreadid);
        mplew.writeInt(threadRS.getInt("postercid"));
        mplew.writeLong(DateUtil.getFileTimestamp(threadRS.getLong("timestamp")));
        mplew.writeMapleAsciiString(threadRS.getString("name"));
        mplew.writeMapleAsciiString(threadRS.getString("startpost"));
        mplew.writeInt(threadRS.getInt("icon"));
        if (repliesRS != null) {
            int replyCount = threadRS.getInt("replycount");
            mplew.writeInt(replyCount);
            int i;
            for (i = 0; i < replyCount && repliesRS.next(); i++) {
                mplew.writeInt(repliesRS.getInt("replyid"));
                mplew.writeInt(repliesRS.getInt("postercid"));
                mplew.writeLong(DateUtil.getFileTimestamp(repliesRS.getLong("timestamp")));
                mplew.writeMapleAsciiString(repliesRS.getString("content"));
            }
            if (i != replyCount || repliesRS.next()) {
                //in the unlikely event that we lost count of replyid
                throw new RuntimeException(String.valueOf(threadRS.getInt("threadid")));
            /**
             *we need to fix the database and stop the packet sending or else it'll probably error 38 whoever tries to read it
             *there is ONE case not checked, and that's when the thread has a replycount of 0 and there is one or more replies to the
             *thread in bbs_replies
             */
            }
        } else {
            mplew.writeInt(0); //0 replies
        }
        return mplew.getPacket();
    }
/*public static MaplePacket ZreHylvl(int npcid, ResultSet rs) throws SQLException  {

  MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
  mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
  mplew.write(0x49);
  mplew.writeInt(npcid);
  if (!rs.last())
  {
   mplew.writeInt(0);
   return mplew.getPacket();
  }

  mplew.writeInt(rs.getRow());

  rs.beforeFirst();
  while (rs.next())
  {
   mplew.writeMapleAsciiString(rs.getString("name"));
   mplew.writeInt(rs.getInt("level"));
   mplew.writeInt(rs.getInt("str"));
   mplew.writeInt(rs.getInt("dex"));
   mplew.writeInt(rs.getInt("int"));
   mplew.writeInt(rs.getInt("luk"));
  }

  return mplew.getPacket();
 }
public static MaplePacket ZreHyfame(int npcid, ResultSet rs) throws SQLException
 {
  MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

  mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
  mplew.write(0x49);
  mplew.writeInt(npcid);
  if (!rs.last())
  {
   mplew.writeInt(0);
   return mplew.getPacket();
  }

  mplew.writeInt(rs.getRow());

  rs.beforeFirst();
  while (rs.next())
  {
   mplew.writeMapleAsciiString(rs.getString("name"));
   mplew.writeInt(rs.getInt("fame"));
   mplew.writeInt(rs.getInt("str"));
   mplew.writeInt(rs.getInt("dex"));
   mplew.writeInt(rs.getInt("int"));
   mplew.writeInt(rs.getInt("luk"));
  }

  return mplew.getPacket();
 }

public static MaplePacket ZreHymeso(int npcid, ResultSet rs) throws SQLException
 {
  MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

  mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
  mplew.write(0x49);
  mplew.writeInt(npcid);
  if (!rs.last())
  {
   mplew.writeInt(0);
   return mplew.getPacket();
  }

  mplew.writeInt(rs.getRow());
  rs.beforeFirst();
  while (rs.next())
  {
   mplew.writeMapleAsciiString(rs.getString("name"));
   mplew.writeInt(rs.getInt("meso"));
   mplew.writeInt(rs.getInt("str"));
   mplew.writeInt(rs.getInt("dex"));
   mplew.writeInt(rs.getInt("int"));
   mplew.writeInt(rs.getInt("luk"));
  }

  return mplew.getPacket();
 }

public static MaplePacket ZreHyzs(int npcid, ResultSet rs) throws SQLException
 {
  MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

  mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
  mplew.write(0x49);
  mplew.writeInt(npcid);
  if (!rs.last())
  {
   mplew.writeInt(0);
   return mplew.getPacket();
  }

  mplew.writeInt(rs.getRow());

  rs.beforeFirst();
  while (rs.next())
  {
   mplew.writeMapleAsciiString(rs.getString("name"));
   mplew.writeInt(rs.getInt("reborns"));
   mplew.writeInt(rs.getInt("str"));
   mplew.writeInt(rs.getInt("dex"));
   mplew.writeInt(rs.getInt("int"));
   mplew.writeInt(rs.getInt("luk"));
  }

  return mplew.getPacket();
 }
/*public static MaplePacket ZreHypvpkills(int npcid, ResultSet rs) throws SQLException
 {
  MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

  mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
  mplew.write(0x49);
  mplew.writeInt(npcid);
  if (!rs.last())
  {
   mplew.writeInt(0);
   return mplew.getPacket();
  }

  mplew.writeInt(rs.getRow());

  rs.beforeFirst();
  while (rs.next())
  {
   mplew.writeMapleAsciiString(rs.getString("name"));
   mplew.writeInt(rs.getInt("pvpkills"));
   mplew.writeInt(rs.getInt("str"));
   mplew.writeInt(rs.getInt("dex"));
   mplew.writeInt(rs.getInt("int"));
   mplew.writeInt(rs.getInt("luk"));
  }

  return mplew.getPacket();
 } */

/*public static MaplePacket ZreHypvpdeaths(int npcid, ResultSet rs) throws SQLException
 {
  MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

  mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
  mplew.write(0x49);
  mplew.writeInt(npcid);
  if (!rs.last())
  {
   mplew.writeInt(0);
   return mplew.getPacket();
  }

  mplew.writeInt(rs.getRow());
  rs.beforeFirst();
  while (rs.next())
  {
   mplew.writeMapleAsciiString(rs.getString("name"));
   mplew.writeInt(rs.getInt("pvpdeaths"));
   mplew.writeInt(rs.getInt("str"));
   mplew.writeInt(rs.getInt("dex"));
   mplew.writeInt(rs.getInt("int"));
   mplew.writeInt(rs.getInt("luk"));
  }

  return mplew.getPacket();
 } */
    public static MaplePacket showGuildRanks(int npcid, ResultSet rs) throws SQLException {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        mplew.write(0x49);
        mplew.writeInt(npcid);
        if (!rs.last()) { //no guilds o.o
            mplew.writeInt(0);
            return mplew.getPacket();
        }
        mplew.writeInt(rs.getRow()); //number of entries
        rs.beforeFirst();
        while (rs.next()) {
            mplew.writeMapleAsciiString(rs.getString("name"));
            mplew.writeInt(rs.getInt("GP"));
            mplew.writeInt(rs.getInt("logo"));
            mplew.writeInt(rs.getInt("logoColor"));
            mplew.writeInt(rs.getInt("logoBG"));
            mplew.writeInt(rs.getInt("logoBGColor"));
        }

        return mplew.getPacket();
    }

    public static MaplePacket updateGP(int gid, int GP) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        mplew.write(0x48);
        mplew.writeInt(gid);
        mplew.writeInt(GP);

        return mplew.getPacket();
    }

    public static MaplePacket skillEffect(MapleCharacter from, int skillId, int level, byte flags, int speed, int op) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SKILL_EFFECT.getValue());
        mplew.writeInt(from.getId());
        mplew.writeInt(skillId);
        mplew.write(level);
        mplew.write(flags);
        mplew.write(speed);
        mplew.write(op);

        return mplew.getPacket();
    }

    public static MaplePacket skillCancel(MapleCharacter from, int skillId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CANCEL_SKILL_EFFECT.getValue());
        mplew.writeInt(from.getId());
        mplew.writeInt(skillId);

        return mplew.getPacket();
    }

    public static MaplePacket showMagnet(int mobid, byte success) { // Monster Magnet
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_MAGNET.getValue());
        mplew.writeInt(mobid);
        mplew.write(success);

        return mplew.getPacket();
    }

    /**
     * Sends a player hint.
     *
     * @param hint The hint it's going to send.
     * @param width How tall the box is going to be.
     * @param height How long the box is going to be.
     * @return The player hint packet.
     */
    public static MaplePacket sendHint(String hint, int width, int height) {
        if (width < 1) {
            width = hint.getBytes().length * 10;
            if (width < 40) {
                width = 40;
            }
        }
        if (height < 5) {
            height = 5;
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PLAYER_HINT.getValue());
        mplew.writeMapleAsciiString(hint);
        mplew.writeShort(width);
        mplew.writeShort(height);
        mplew.write(1);

        return mplew.getPacket();
    }

    public static MaplePacket messengerInvite(String from, int messengerid) {//招待邀请
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MESSENGER.getValue());
        mplew.write(0x03);
        mplew.writeMapleAsciiString(from);
        mplew.write(0x05);
        mplew.writeInt(messengerid);
        mplew.write(0x00);

        return mplew.getPacket();
    }

    public static MaplePacket addMessengerPlayer(String from, MapleCharacter chr, int position, int channel) {//招待添加玩家
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MESSENGER.getValue());
        mplew.write(0x00);
        mplew.write(position);
        addCharLook(mplew, chr, true);
        mplew.writeMapleAsciiString(from);
        mplew.write(channel);
        mplew.write(0x00);

        return mplew.getPacket();
    }

    public static MaplePacket removeMessengerPlayer(int position) {//移除玩家(玩家离开)
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MESSENGER.getValue());
        mplew.write(0x02);
        mplew.write(position);

        return mplew.getPacket();
    }

    public static MaplePacket updateMessengerPlayer(String from, MapleCharacter chr, int position, int channel) {//更新招待玩家
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MESSENGER.getValue());
        mplew.write(0x07);
        mplew.write(position);
        addCharLook(mplew, chr, true);
        mplew.writeMapleAsciiString(from);
        mplew.write(channel);
        mplew.write(0x00);

        return mplew.getPacket();
    }

    public static MaplePacket joinMessenger(int position) {//加入招待
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MESSENGER.getValue());
        mplew.write(0x01);
        mplew.write(position);

        return mplew.getPacket();
    }

    public static MaplePacket messengerChat(String text) {//招待聊天
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MESSENGER.getValue());
        mplew.write(0x06);
        mplew.writeMapleAsciiString(text);

        return mplew.getPacket();
    }

    public static MaplePacket messengerNote(String text, int mode, int mode2) {//招待说明
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MESSENGER.getValue());
        mplew.write(mode);
        mplew.writeMapleAsciiString(text);
        mplew.write(mode2);

        return mplew.getPacket();
    }

    public static MaplePacket warpCS(MapleClient c) {
        return warpCS(c, false);
    }

    public static MaplePacket warpMTS(MapleClient c) {
        return warpCS(c, true);
    }

    public static MaplePacket warpCS(MapleClient c, boolean MTS) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        MapleCharacter chr = c.getPlayer();
        mplew.writeShort(MTS ? SendPacketOpcode.MTS_OPEN.getValue() : SendPacketOpcode.CS_OPEN.getValue());
        mplew.writeLong(-1);
        mplew.write(0);
        addCharStats(mplew, chr);
        mplew.write(20); // ???
        mplew.write(0);
        mplew.writeInt(chr.getMeso()); // mesos
        mplew.writeInt(chr.getId());
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.write(chr.getInventory(MapleInventoryType.EQUIP).getSlots()); // equip slots
        mplew.write(chr.getInventory(MapleInventoryType.USE).getSlots()); // use slots
        mplew.write(chr.getInventory(MapleInventoryType.SETUP).getSlots()); // set-up slots
        mplew.write(chr.getInventory(MapleInventoryType.ETC).getSlots()); // etc slots
        mplew.write(chr.getInventory(MapleInventoryType.CASH).getSlots()); // cash slots
        mplew.writeLong(DateUtil.getFileTimestamp(System.currentTimeMillis()));
        MapleInventory iv = chr.getInventory(MapleInventoryType.EQUIPPED);
        Collection<IItem> equippedC = iv.list();
        List<Item> equipped = new ArrayList<Item>(equippedC.size());
        for (IItem item : equippedC) {
            if (((Item) item).getPosition() > -100) {
                equipped.add((Item) item);
            }
        }

        Collections.sort(equipped);
        for (Item item : equipped) {
            addItemInfo(mplew, item);
        }
        mplew.write(0); // start of equiped cash inventory
        equipped.clear();
        for (IItem item : equippedC) {
            if (((Item) item).getPosition() < -100) {
                equipped.add((Item) item);
            }
        }
        Collections.sort(equipped);
        for (Item item : equipped) {
            addItemInfo(mplew, item);
        }

        mplew.write(0);
        iv = chr.getInventory(MapleInventoryType.EQUIP);
        for (IItem item : iv.list()) {
            addItemInfo(mplew, item, false, false, true);
        }
        mplew.write(0); // start of use inventory
        iv = chr.getInventory(MapleInventoryType.USE);
        for (IItem item : iv.list()) {
            addItemInfo(mplew, item, false, false, true);
        }
        mplew.write(0); // start of set-up inventory
        iv = chr.getInventory(MapleInventoryType.SETUP);
        for (IItem item : iv.list()) {
            addItemInfo(mplew, item, false, false, true);
        }
        mplew.write(0); // start of etc inventory
        iv = chr.getInventory(MapleInventoryType.ETC);
        for (IItem item : iv.list()) {
            addItemInfo(mplew, item, false, false, true);
        }
        mplew.write(0); // start of cash inventory
        iv = chr.getInventory(MapleInventoryType.CASH);
        for (IItem item : iv.list()) {
            addItemInfo(mplew, item, false, false, true);
        }
        mplew.write(0);
        Map<ISkill, MapleCharacter.SkillEntry> skills = chr.getSkills();
        mplew.writeShort(skills.size());
        for (Entry<ISkill, MapleCharacter.SkillEntry> skill : skills.entrySet()) {
            mplew.writeInt(skill.getKey().getId());
            mplew.writeInt(skill.getValue().skillevel);
            if (skill.getKey().isFourthJob()) {
                mplew.writeInt(skill.getValue().masterlevel);
            }
        }
        mplew.writeShort(0);
        mplew.writeShort(3);
        mplew.writeInt(662990);
        mplew.write(HexTool.getByteArrayFromHexString("5A 5A 5A 5A 45 46 47 48 49 5A B0 1D 01 00 34 95 08 00 00 11 00 F0 03 00 4D CE 43 44 63 CA 01 08 04 00 05 05 49 70 FD C9 01 F1 03 00 07 0B 20 44 63 CA 01 09 04 00 E6 FA 4E 70 FD C9 01 F2 03 80 F7 05 23 44 63 CA 01 0A 04 00 F4 21 56 70 FD C9 01 F3 03 80 51 68 25 44 63 CA 01 0B 04 00 F0 C7 CB E1 00 CA 01 39 20 00 7D C1 6D C3 5A CA 01 F4 03 80 AB CA 27 44 63 CA 01 0C 04 00 DD 95 0A 44 63 CA 01 FC 03 80 6A FA 47 44 63 CA 01 B0 1D 80 28 6F 6F 80 63 CA 01 F5 03 00 9C C5 2A 44 63 CA 01 F6 03 00 F6 27 2D 44 63 CA 01 98 12 80 C4 5C 4A 44 63 CA 01 F7 03 80 40 85 32 44 63 CA 01"));
        mplew.writeLong(0);
        for (int i = 0; i < 15; i++) {
            mplew.write(CHAR_INFO_MAGIC);
        }
        mplew.write(HexTool.getByteArrayFromHexString("00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"));

        mplew.writeMapleAsciiString(chr.getClient().getAccountName());
        if (MTS) {
            mplew.writeInt(5000);
            mplew.write(HexTool.getByteArrayFromHexString("07 00 00 00 2C 01 00 00 18 00 00 00 A8 00 00 00 90 63 80 7A 56 49 CA 01"));
        } else {
            mplew.write(HexTool.getByteArrayFromHexString("46 00 00 00 07 A5 9B 00 08 A5 9B 00 09 A5 9B 00 0A A5 9B 00 0B A5 9B 00 0C A5 9B 00 0D A5 9B 00 0E A5 9B 00 0F A5 9B 00 10 A5 9B 00 11 A5 9B 00 12 A5 9B 00 13 A5 9B 00 14 A5 9B 00 15 A5 9B 00 16 A5 9B 00 17 A5 9B 00 18 A5 9B 00 19 A5 9B 00 1A A5 9B 00 1B A5 9B 00 1C A5 9B 00 1D A5 9B 00 1E A5 9B 00 1F A5 9B 00 20 A5 9B 00 21 A5 9B 00 22 A5 9B 00 23 A5 9B 00 24 A5 9B 00 25 A5 9B 00 26 A5 9B 00 27 A5 9B 00 28 A5 9B 00 29 A5 9B 00 2A A5 9B 00 2B A5 9B 00 2C A5 9B 00 2D A5 9B 00 2E A5 9B 00 2F A5 9B 00 30 A5 9B 00 31 A5 9B 00 32 A5 9B 00 33 A5 9B 00 34 A5 9B 00 35 A5 9B 00 36 A5 9B 00 37 A5 9B 00 38 A5 9B 00 39 A5 9B 00 3A A5 9B 00 3B A5 9B 00 3C A5 9B 00 3D A5 9B 00 3E A5 9B 00 3F A5 9B 00 40 A5 9B 00 41 A5 9B 00 42 A5 9B 00 43 A5 9B 00 44 A5 9B 00 45 A5 9B 00 46 A5 9B 00 47 A5 9B 00 48 A5 9B 00 49 A5 9B 00 4A A5 9B 00 4B A5 9B 00 4C A5 9B 00 7B 0B AC 96 98 00 00 0C 00 00 01 02 A5 97 98 00 00 08 00 00 02 BA 97 98 00 00 0C 00 00 01 02 BB 97 98 00 00 0C 00 00 01 02 C1 97 98 00 00 0C 00 00 01 02 C2 97 98 00 00 0C 00 00 01 02 D5 97 98 00 00 0C 00 00 01 02 D6 97 98 00 00 0C 00 00 01 02 87 98 98 00 00 0C 00 00 01 02 A5 98 98 00 00 0C 00 00 01 02 FE 98 98 00 00 0C 00 00 01 02 FF 99 98 00 00 0C 00 00 01 02 27 9B 98 00 00 04 00 00 01 49 9B 98 00 00 0C 00 00 01 02 4C 9B 98 00 00 0C 00 00 01 02 4F 9B 98 00 00 0C 00 00 01 02 95 9B 98 00 00 08 00 00 02 9D 9B 98 00 00 08 00 00 02 9F 9B 98 00 04 00 00 00 DC 05 00 00 FC 9B 98 00 00 08 00 00 02 15 9C 98 00 00 08 00 00 02 17 9C 98 00 00 08 00 00 03 18 9C 98 00 00 08 00 00 03 19 9C 98 00 00 08 00 00 03 1A 9C 98 00 00 08 00 00 03 1B 9C 98 00 00 08 00 00 03 5A 9C 98 00 00 08 00 00 03 5B 9C 98 00 00 0C 00 00 01 02 97 9C 98 00 00 0C 00 00 01 02 BC 9C 98 00 00 0C 00 00 01 02 C6 9C 98 00 00 08 00 00 02 C7 9C 98 00 00 08 00 00 02 C8 9C 98 00 00 0C 00 00 01 02 CC 9C 98 00 00 08 00 00 00 CD 9C 98 00 00 08 00 00 00 CE 9C 98 00 10 0C 00 00 62 01 02 CF 9C 98 00 00 0C 00 00 01 02 D3 9C 98 00 10 0C 00 00 62 01 02 DB 9C 98 00 00 08 00 00 02 F0 9C 98 00 00 0C 00 00 01 02 F8 9C 98 00 00 08 00 00 00 07 9D 98 00 02 08 00 00 01 00 00 08 9D 98 00 02 08 00 00 01 00 00 0A 9D 98 00 00 0C 00 00 01 02 0C 9D 98 00 00 08 00 00 00 1A 9D 98 00 00 08 00 00 00 20 9D 98 00 00 08 00 00 00 26 9D 98 00 00 0C 00 00 01 02 29 9D 98 00 00 0C 00 00 01 02 2D 9D 98 00 00 0C 00 00 01 02 2E 9D 98 00 00 08 00 00 00 2F 9D 98 00 00 08 00 00 00 30 9D 98 00 00 08 00 00 00 31 9D 98 00 00 08 00 00 00 32 9D 98 00 00 08 00 00 00 33 9D 98 00 00 08 00 00 00 34 9D 98 00 00 08 00 00 00 35 9D 98 00 00 08 00 00 00 37 9D 98 00 00 08 00 00 00 3E 9D 98 00 00 08 00 00 00 49 9D 98 00 00 0C 00 00 01 02 4A 9D 98 00 00 08 00 00 00 4B 9D 98 00 00 08 00 00 00 4C 9D 98 00 00 0C 00 00 01 02 52 9D 98 00 04 08 00 00 E0 01 00 00 00 53 9D 98 00 04 0C 00 00 C0 03 00 00 01 01 54 9D 98 00 04 08 00 00 C0 12 00 00 00 55 9D 98 00 00 0C 00 00 01 02 56 9D 98 00 00 08 00 00 00 57 9D 98 00 00 08 00 00 00 59 9D 98 00 00 08 00 00 00 5A 9D 98 00 00 08 00 00 00 5C 9D 98 00 00 08 00 00 00 5D 9D 98 00 00 08 00 00 00 5E 9D 98 00 00 0C 00 00 01 02 5F 9D 98 00 00 08 00 00 00 60 9D 98 00 00 08 00 00 00 64 9D 98 00 00 08 00 00 00 65 9D 98 00 00 08 00 00 00 67 9D 98 00 00 08 00 00 03 68 9D 98 00 00 08 00 00 03 69 9D 98 00 00 08 00 00 03 6D 9D 98 00 10 08 00 00 61 02 73 9D 98 00 00 08 00 00 00 77 9D 98 00 00 08 00 00 02 7A 9D 98 00 00 08 00 00 00 7B 9D 98 00 00 08 00 00 00 7E 9D 98 00 00 08 00 00 00 80 9D 98 00 10 08 00 00 63 02 82 9D 98 00 00 08 00 00 00 85 9D 98 00 10 0C 00 00 63 01 02 86 9D 98 00 00 0C 00 00 01 02 88 9D 98 00 00 08 00 00 00 89 9D 98 00 00 08 00 00 00 8A 9D 98 00 00 08 00 00 00 8B 9D 98 00 00 08 00 00 02 8C 9D 98 00 00 08 00 00 02 8D 9D 98 00 00 08 00 00 02 8E 9D 98 00 10 08 00 00 62 02 90 9D 98 00 10 00 00 00 62 91 9D 98 00 10 00 00 00 62 92 9D 98 00 00 08 00 00 00 93 9D 98 00 10 00 00 00 62 94 9D 98 00 10 00 00 00 62 95 9D 98 00 10 08 00 00 63 00 96 9D 98 00 00 08 00 00 02 97 9D 98 00 10 00 00 00 62 98 9D 98 00 10 00 00 00 62 99 9D 98 00 10 00 00 00 62 9A 9D 98 00 00 04 00 00 01 9B 9D 98 00 10 08 00 00 63 00 9C 9D 98 00 00 08 00 00 02 9D 9D 98 00 00 0C 00 00 01 02 9E 9D 98 00 00 08 00 00 02 9F 9D 98 00 10 08 00 00 63 00 A0 9D 98 00 10 08 00 00 62 02 A1 9D 98 00 10 00 00 00 62 A2 9D 98 00 10 08 00 00 63 00 A3 9D 98 00 10 08 00 00 62 02 A4 9D 98 00 10 08 00 00 62 02 A5 9D 98 00 10 00 00 00 62 A6 9D 98 00 10 00 00 00 62 A7 9D 98 00 10 00 00 00 62 A8 9D 98 00 10 00 00 00 62 A9 9D 98 00 00 08 00 00 00 AA 9D 98 00 10 08 00 00 62 02 AB 9D 98 00 00 08 00 00 00 AC 9D 98 00 10 08 00 00 62 02 AD 9D 98 00 00 08 00 00 00 AE 9D 98 00 00 08 00 00 02 AF 9D 98 00 10 08 00 00 63 00 B0 9D 98 00 10 08 00 00 62 02 B1 9D 98 00 10 08 00 00 63 00 B2 9D 98 00 10 0C 00 00 63 01 02 B4 9D 98 00 10 04 00 00 62 01 BA 9D 98 00 10 04 00 00 62 01 BF 9D 98 00 10 0C 00 00 62 01 02 C0 9D 98 00 00 08 00 00 00 C1 9D 98 00 10 0C 00 00 62 01 02 C2 9D 98 00 00 0C 00 00 01 02 C3 9D 98 00 10 04 00 00 62 01 C4 9D 98 00 10 0C 00 00 62 01 02 C5 9D 98 00 10 04 00 00 62 01 C6 9D 98 00 10 04 00 00 62 01 C9 9D 98 00 10 00 00 00 62 CA 9D 98 00 00 0C 00 00 01 00 CD 9D 98 00 10 00 00 00 62 D0 9D 98 00 00 0C 00 00 01 00 D1 9D 98 00 10 08 00 00 62 02 D2 9D 98 00 00 0C 00 00 01 00 6D 1D 9A 00 00 04 00 00 01 B4 1D 9A 00 00 08 00 00 03 28 1E 9A 00 00 04 00 00 01 5F 1E 9A 00 00 04 00 00 01 95 1E 9A 00 00 04 00 00 01 99 1E 9A 00 00 04 00 00 01 BF 1E 9A 00 00 04 00 00 01 C0 1E 9A 00 00 04 00 00 01 C1 1E 9A 00 00 04 00 00 01 48 1F 9A 00 00 04 00 00 01 49 1F 9A 00 00 04 00 00 01 50 1F 9A 00 00 04 00 00 01 66 1F 9A 00 00 04 00 00 01 6A 1F 9A 00 00 04 00 00 01 83 1F 9A 00 00 04 00 00 01 96 1F 9A 00 00 04 00 00 01 99 1F 9A 00 00 04 00 00 01 9A 1F 9A 00 00 04 00 00 01 9B 1F 9A 00 00 04 00 00 01 9C 1F 9A 00 00 04 00 00 01 9D 1F 9A 00 00 04 00 00 01 9E 1F 9A 00 00 04 00 00 01 9F 1F 9A 00 00 04 00 00 01 A0 1F 9A 00 00 04 00 00 01 A1 1F 9A 00 00 04 00 00 01 A2 1F 9A 00 00 04 00 00 01 A3 1F 9A 00 00 04 00 00 01 A4 1F 9A 00 00 04 00 00 01 A5 1F 9A 00 00 04 00 00 01 A6 1F 9A 00 00 04 00 00 01 A7 1F 9A 00 00 04 00 00 01 A8 1F 9A 00 00 04 00 00 01 A9 1F 9A 00 00 04 00 00 01 AA 1F 9A 00 00 04 00 00 01 AB 1F 9A 00 00 04 00 00 01 C0 A3 9B 00 00 08 00 00 04 C1 A3 9B 00 00 08 00 00 04 C2 A3 9B 00 00 08 00 00 04 C3 A3 9B 00 00 08 00 00 04 C4 A3 9B 00 00 08 00 00 04 C5 A3 9B 00 00 08 00 00 04 C6 A3 9B 00 00 08 00 00 04 C7 A3 9B 00 00 08 00 00 04 C8 A3 9B 00 00 08 00 00 04 C9 A3 9B 00 00 08 00 00 04 CA A3 9B 00 00 08 00 00 04 CB A3 9B 00 00 08 00 00 04 CC A3 9B 00 00 08 00 00 04 CD A3 9B 00 00 08 00 00 04 CE A3 9B 00 00 08 00 00 04 CF A3 9B 00 00 08 00 00 04 D0 A3 9B 00 00 08 00 00 04 D1 A3 9B 00 00 08 00 00 04 D2 A3 9B 00 00 08 00 00 04 D3 A3 9B 00 00 08 00 00 04 D4 A3 9B 00 00 08 00 00 04 D5 A3 9B 00 00 08 00 00 04 D6 A3 9B 00 00 08 00 00 04 D7 A3 9B 00 00 08 00 00 04 D8 A3 9B 00 00 08 00 00 04 D9 A3 9B 00 00 08 00 00 04 DA A3 9B 00 00 08 00 00 04 DB A3 9B 00 00 08 00 00 04 DC A3 9B 00 00 08 00 00 04 DD A3 9B 00 00 08 00 00 04 DE A3 9B 00 00 08 00 00 04 DF A3 9B 00 00 08 00 00 04 E0 A3 9B 00 00 08 00 00 04 E1 A3 9B 00 00 08 00 00 04 E2 A3 9B 00 00 08 00 00 04 E3 A3 9B 00 00 08 00 00 04 E4 A3 9B 00 00 08 00 00 04 E5 A3 9B 00 00 08 00 00 04 E6 A3 9B 00 00 08 00 00 04 E7 A3 9B 00 00 08 00 00 04 E8 A3 9B 00 00 08 00 00 04 E9 A3 9B 00 00 08 00 00 04 EA A3 9B 00 00 08 00 00 04 EB A3 9B 00 00 08 00 00 04 EC A3 9B 00 00 08 00 00 04 ED A3 9B 00 00 08 00 00 04 EE A3 9B 00 00 08 00 00 04 EF A3 9B 00 00 08 00 00 04 F0 A3 9B 00 00 08 00 00 04 F1 A3 9B 00 00 08 00 00 04 F2 A3 9B 00 00 08 00 00 04 F3 A3 9B 00 00 08 00 00 04 F4 A3 9B 00 00 08 00 00 04 F5 A3 9B 00 00 08 00 00 04 F6 A3 9B 00 00 08 00 00 04 F7 A3 9B 00 00 08 00 00 04 F8 A3 9B 00 00 08 00 00 04 F9 A3 9B 00 00 08 00 00 04 FA A3 9B 00 00 08 00 00 04 FB A3 9B 00 00 08 00 00 04 FC A3 9B 00 00 08 00 00 04 FD A3 9B 00 00 08 00 00 04 FE A3 9B 00 00 08 00 00 04 FF A3 9B 00 00 08 00 00 04 00 A4 9B 00 00 08 00 00 04 01 A4 9B 00 00 08 00 00 04 02 A4 9B 00 00 08 00 00 04 03 A4 9B 00 00 08 00 00 04 04 A4 9B 00 00 08 00 00 04 05 A4 9B 00 00 08 00 00 04 06 A4 9B 00 00 08 00 00 04 07 A4 9B 00 00 08 00 00 04 08 A4 9B 00 00 08 00 00 04 09 A4 9B 00 00 08 00 00 04 0A A4 9B 00 00 08 00 00 04 0B A4 9B 00 00 08 00 00 04 0C A4 9B 00 00 08 00 00 04 0D A4 9B 00 00 08 00 00 04 0E A4 9B 00 00 08 00 00 04 0F A4 9B 00 00 08 00 00 04 10 A4 9B 00 00 08 00 00 04 11 A4 9B 00 00 08 00 00 04 12 A4 9B 00 00 08 00 00 04 13 A4 9B 00 00 08 00 00 04 14 A4 9B 00 00 08 00 00 04 15 A4 9B 00 00 08 00 00 04 16 A4 9B 00 00 08 00 00 04 17 A4 9B 00 00 08 00 00 04 18 A4 9B 00 00 08 00 00 04 19 A4 9B 00 00 08 00 00 04 1A A4 9B 00 00 08 00 00 04 1B A4 9B 00 00 08 00 00 04 1C A4 9B 00 00 08 00 00 04 1D A4 9B 00 00 08 00 00 04 1E A4 9B 00 00 08 00 00 04 1F A4 9B 00 00 08 00 00 04 20 A4 9B 00 00 08 00 00 04 21 A4 9B 00 00 08 00 00 04 22 A4 9B 00 00 08 00 00 04 23 A4 9B 00 00 08 00 00 04 24 A4 9B 00 00 08 00 00 04 25 A4 9B 00 00 08 00 00 04 26 A4 9B 00 00 08 00 00 04 27 A4 9B 00 00 08 00 00 04 28 A4 9B 00 00 08 00 00 04 29 A4 9B 00 00 08 00 00 04 2A A4 9B 00 00 08 00 00 04 2B A4 9B 00 00 08 00 00 04 2C A4 9B 00 00 08 00 00 04 2D A4 9B 00 00 08 00 00 04 2E A4 9B 00 00 08 00 00 04 2F A4 9B 00 00 08 00 00 04 30 A4 9B 00 00 08 00 00 04 31 A4 9B 00 00 08 00 00 04 32 A4 9B 00 00 08 00 00 04 33 A4 9B 00 00 08 00 00 04 34 A4 9B 00 00 08 00 00 04 35 A4 9B 00 00 08 00 00 04 36 A4 9B 00 00 08 00 00 04 37 A4 9B 00 00 08 00 00 04 38 A4 9B 00 00 08 00 00 04 39 A4 9B 00 00 08 00 00 04 3A A4 9B 00 00 08 00 00 04 3B A4 9B 00 00 08 00 00 04 3C A4 9B 00 00 08 00 00 04 3D A4 9B 00 00 08 00 00 04 3E A4 9B 00 00 08 00 00 04 3F A4 9B 00 00 08 00 00 04 40 A4 9B 00 00 08 00 00 04 41 A4 9B 00 00 08 00 00 04 42 A4 9B 00 00 08 00 00 04 43 A4 9B 00 00 08 00 00 04 44 A4 9B 00 00 08 00 00 04 45 A4 9B 00 00 08 00 00 04 46 A4 9B 00 00 08 00 00 04 47 A4 9B 00 00 08 00 00 04 48 A4 9B 00 00 08 00 00 04 49 A4 9B 00 00 08 00 00 04 4A A4 9B 00 00 08 00 00 04 4B A4 9B 00 00 08 00 00 04 4C A4 9B 00 00 08 00 00 04 4D A4 9B 00 00 08 00 00 04 4E A4 9B 00 00 08 00 00 04 4F A4 9B 00 00 08 00 00 04 50 A4 9B 00 00 08 00 00 04 51 A4 9B 00 00 08 00 00 04 52 A4 9B 00 00 08 00 00 04 53 A4 9B 00 00 08 00 00 04 54 A4 9B 00 00 08 00 00 04 55 A4 9B 00 00 08 00 00 04 56 A4 9B 00 00 08 00 00 04 57 A4 9B 00 00 08 00 00 04 58 A4 9B 00 00 08 00 00 04 59 A4 9B 00 00 08 00 00 04 5A A4 9B 00 00 08 00 00 04 5B A4 9B 00 00 08 00 00 04 5C A4 9B 00 00 08 00 00 04 5D A4 9B 00 00 08 00 00 04 5E A4 9B 00 00 08 00 00 04 5F A4 9B 00 00 08 00 00 04 60 A4 9B 00 00 08 00 00 04 61 A4 9B 00 00 08 00 00 04 62 A4 9B 00 00 08 00 00 04 63 A4 9B 00 00 08 00 00 04 64 A4 9B 00 00 08 00 00 04 65 A4 9B 00 00 08 00 00 04 66 A4 9B 00 00 08 00 00 04 67 A4 9B 00 00 08 00 00 04 68 A4 9B 00 00 08 00 00 04 69 A4 9B 00 00 08 00 00 04 6A A4 9B 00 00 08 00 00 04 6B A4 9B 00 00 08 00 00 04 6C A4 9B 00 00 08 00 00 04 6D A4 9B 00 00 08 00 00 04 6E A4 9B 00 00 08 00 00 04 6F A4 9B 00 00 08 00 00 04 70 A4 9B 00 00 08 00 00 04 71 A4 9B 00 00 08 00 00 04 72 A4 9B 00 00 08 00 00 04 73 A4 9B 00 00 08 00 00 04 74 A4 9B 00 00 08 00 00 04 75 A4 9B 00 00 08 00 00 04 76 A4 9B 00 00 08 00 00 04 77 A4 9B 00 00 08 00 00 04 78 A4 9B 00 00 08 00 00 04 79 A4 9B 00 00 08 00 00 04 7A A4 9B 00 00 08 00 00 04 7B A4 9B 00 00 08 00 00 04 7C A4 9B 00 00 08 00 00 04 7D A4 9B 00 00 08 00 00 04 7E A4 9B 00 00 08 00 00 04 7F A4 9B 00 00 08 00 00 04 80 A4 9B 00 00 08 00 00 04 81 A4 9B 00 00 08 00 00 04 82 A4 9B 00 00 08 00 00 04 83 A4 9B 00 00 08 00 00 04 84 A4 9B 00 00 08 00 00 04 85 A4 9B 00 00 08 00 00 04 86 A4 9B 00 00 08 00 00 04 87 A4 9B 00 00 08 00 00 04 88 A4 9B 00 00 08 00 00 04 89 A4 9B 00 00 08 00 00 04 8A A4 9B 00 00 08 00 00 04 8B A4 9B 00 00 08 00 00 04 8C A4 9B 00 00 08 00 00 04 8D A4 9B 00 00 08 00 00 04 8E A4 9B 00 00 08 00 00 04 8F A4 9B 00 00 08 00 00 04 90 A4 9B 00 00 08 00 00 04 91 A4 9B 00 00 08 00 00 04 92 A4 9B 00 00 08 00 00 04 93 A4 9B 00 00 08 00 00 04 94 A4 9B 00 00 08 00 00 04 95 A4 9B 00 00 08 00 00 04 96 A4 9B 00 00 08 00 00 04 97 A4 9B 00 00 08 00 00 04 98 A4 9B 00 00 08 00 00 04 99 A4 9B 00 00 08 00 00 04 9A A4 9B 00 04 08 00 00 70 02 00 00 04 9B A4 9B 00 04 08 00 00 20 02 00 00 04 9C A4 9B 00 04 08 00 00 70 02 00 00 04 9D A4 9B 00 04 08 00 00 00 04 00 00 04 9E A4 9B 00 04 08 00 00 00 04 00 00 04 9F A4 9B 00 04 08 00 00 70 02 00 00 04 A0 A4 9B 00 04 08 00 00 20 02 00 00 04 A1 A4 9B 00 04 08 00 00 10 03 00 00 04 A2 A4 9B 00 04 08 00 00 A0 04 00 00 04 A3 A4 9B 00 04 08 00 00 C0 02 00 00 04 A4 A4 9B 00 04 08 00 00 E4 11 00 00 04 A5 A4 9B 00 04 08 00 00 10 03 00 00 04 A6 A4 9B 00 04 08 00 00 10 03 00 00 04 A7 A4 9B 00 04 08 00 00 00 04 00 00 04 A8 A4 9B 00 04 08 00 00 C0 02 00 00 04 A9 A4 9B 00 04 08 00 00 C0 02 00 00 04 AA A4 9B 00 04 08 00 00 C0 02 00 00 04 AB A4 9B 00 04 08 00 00 A0 05 00 00 04 AC A4 9B 00 04 08 00 00 30 06 00 00 04 AD A4 9B 00 04 08 00 00 00 04 00 00 04 AE A4 9B 00 04 08 00 00 E0 05 00 00 04 AF A4 9B 00 04 08 00 00 98 0D 00 00 04 B0 A4 9B 00 04 08 00 00 60 03 00 00 04 B1 A4 9B 00 04 08 00 00 10 03 00 00 04 B2 A4 9B 00 04 08 00 00 70 02 00 00 04 B3 A4 9B 00 04 08 00 00 70 02 00 00 04 B4 A4 9B 00 04 08 00 00 10 03 00 00 04 B5 A4 9B 00 04 08 00 00 70 02 00 00 04 B6 A4 9B 00 04 08 00 00 20 02 00 00 04 B7 A4 9B 00 04 08 00 00 70 02 00 00 04 B8 A4 9B 00 04 08 00 00 A0 04 00 00 04 B9 A4 9B 00 04 08 00 00 F0 04 00 00 04 BA A4 9B 00 04 08 00 00 FC 0D 00 00 04 BB A4 9B 00 04 08 00 00 C0 02 00 00 04 BC A4 9B 00 04 08 00 00 C0 02 00 00 04 BD A4 9B 00 04 08 00 00 20 02 00 00 04 BE A4 9B 00 04 08 00 00 60 03 00 00 04 BF A4 9B 00 04 08 00 00 60 03 00 00 04 C0 A4 9B 00 04 08 00 00 E0 06 00 00 04 C1 A4 9B 00 04 08 00 00 20 02 00 00 04 C2 A4 9B 00 04 08 00 00 70 02 00 00 04 C3 A4 9B 00 04 08 00 00 50 04 00 00 04 C4 A4 9B 00 04 08 00 00 F0 04 00 00 04 C5 A4 9B 00 04 08 00 00 58 07 00 00 04 C6 A4 9B 00 04 08 00 00 60 03 00 00 04 C7 A4 9B 00 04 08 00 00 20 02 00 00 04 C8 A4 9B 00 04 08 00 00 D0 01 00 00 04 C9 A4 9B 00 04 08 00 00 C0 02 00 00 04 CA A4 9B 00 04 08 00 00 46 01 00 00 04 CB A4 9B 00 04 08 00 00 20 02 00 00 04 CC A4 9B 00 04 08 00 00 00 04 00 00 04 CD A4 9B 00 04 08 00 00 A0 05 00 00 04 CE A4 9B 00 04 08 00 00 10 03 00 00 04 CF A4 9B 00 04 08 00 00 40 05 00 00 04 D0 A4 9B 00 04 08 00 00 2C 06 00 00 04 D1 A4 9B 00 04 08 00 00 56 02 00 00 04 D2 A4 9B 00 04 08 00 00 20 02 00 00 04 D3 A4 9B 00 04 08 00 00 00 04 00 00 04 D4 A4 9B 00 04 08 00 00 C0 02 00 00 04 D5 A4 9B 00 04 08 00 00 20 02 00 00 04 D6 A4 9B 00 04 08 00 00 70 02 00 00 04 D7 A4 9B 00 04 08 00 00 60 03 00 00 04 D8 A4 9B 00 04 08 00 00 00 04 00 00 04 D9 A4 9B 00 04 08 00 00 C0 02 00 00 04 DA A4 9B 00 04 08 00 00 C0 02 00 00 04 DB A4 9B 00 04 08 00 00 2C 06 00 00 04 DC A4 9B 00 04 08 00 00 70 02 00 00 04 DD A4 9B 00 04 08 00 00 20 02 00 00 04 DE A4 9B 00 04 08 00 00 60 03 00 00 04 DF A4 9B 00 04 08 00 00 70 02 00 00 04 E0 A4 9B 00 04 08 00 00 C0 02 00 00 04 E1 A4 9B 00 04 08 00 00 10 03 00 00 04 E2 A4 9B 00 04 08 00 00 30 06 00 00 04 E3 A4 9B 00 04 08 00 00 60 03 00 00 04 E4 A4 9B 00 04 08 00 00 A0 05 00 00 04 E5 A4 9B 00 04 08 00 00 40 05 00 00 04 E6 A4 9B 00 04 08 00 00 2C 06 00 00 04 E7 A4 9B 00 04 08 00 00 C0 02 00 00 04 E8 A4 9B 00 04 08 00 00 C0 02 00 00 04 E9 A4 9B 00 04 08 00 00 70 02 00 00 04 EA A4 9B 00 04 08 00 00 C0 02 00 00 04 EB A4 9B 00 04 08 00 00 20 02 00 00 04 EC A4 9B 00 04 08 00 00 B0 04 00 00 04 ED A4 9B 00 04 08 00 00 50 04 00 00 04 EE A4 9B 00 04 08 00 00 50 04 00 00 04 EF A4 9B 00 04 08 00 00 A0 05 00 00 04 F0 A4 9B 00 04 08 00 00 A0 05 00 00 04 F1 A4 9B 00 04 08 00 00 20 08 00 00 04 F2 A4 9B 00 04 08 00 00 10 03 00 00 04 F3 A4 9B 00 04 08 00 00 F0 04 00 00 04 F4 A4 9B 00 04 08 00 00 70 02 00 00 04 F5 A4 9B 00 04 08 00 00 70 02 00 00 04 F6 A4 9B 00 04 08 00 00 20 02 00 00 04 F7 A4 9B 00 04 08 00 00 20 02 00 00 04 F8 A4 9B 00 04 08 00 00 A0 04 00 00 04 F9 A4 9B 00 04 08 00 00 10 03 00 00 04 FA A4 9B 00 04 08 00 00 C0 02 00 00 04 FB A4 9B 00 04 08 00 00 A0 05 00 00 04 FC A4 9B 00 04 08 00 00 20 08 00 00 04 FD A4 9B 00 04 08 00 00 70 02 00 00 04 FE A4 9B 00 04 08 00 00 10 03 00 00 04 FF A4 9B 00 04 08 00 00 70 02 00 00 04 00 A5 9B 00 04 08 00 00 70 02 00 00 04 01 A5 9B 00 04 08 00 00 D0 01 00 00 04 02 A5 9B 00 04 08 00 00 00 04 00 00 04 03 A5 9B 00 04 08 00 00 00 04 00 00 04 04 A5 9B 00 04 08 00 00 F0 04 00 00 04 05 A5 9B 00 04 08 00 00 40 05 00 00 04 06 A5 9B 00 04 08 00 00 A0 05 00 00 04 07 A5 9B 00 04 04 00 00 30 02 00 00 01 08 A5 9B 00 04 04 00 00 3C 08 00 00 01 09 A5 9B 00 04 04 00 00 30 01 00 00 01 0A A5 9B 00 04 04 00 00 80 03 00 00 01 0B A5 9B 00 04 04 00 00 70 02 00 00 01 0C A5 9B 00 04 04 00 00 80 03 00 00 01 0D A5 9B 00 04 04 00 00 F0 00 00 00 01 0E A5 9B 00 04 04 00 00 A4 01 00 00 01 0F A5 9B 00 04 04 00 00 9E 0C 00 00 01 10 A5 9B 00 04 04 00 00 98 04 00 00 01 11 A5 9B 00 04 04 00 00 98 01 00 00 01 12 A5 9B 00 04 04 00 00 0C 04 00 00 01 13 A5 9B 00 04 04 00 00 00 04 00 00 01 14 A5 9B 00 04 04 00 00 18 01 00 00 01 15 A5 9B 00 04 04 00 00 80 01 00 00 01 16 A5 9B 00 04 04 00 00 E6 08 00 00 01 17 A5 9B 00 04 04 00 00 DC 01 00 00 01 18 A5 9B 00 04 04 00 00 70 02 00 00 01 19 A5 9B 00 04 04 00 00 34 08 00 00 01 1A A5 9B 00 04 04 00 00 22 02 00 00 01 1B A5 9B 00 04 04 00 00 52 03 00 00 01 1C A5 9B 00 04 04 00 00 0E 07 00 00 01 1D A5 9B 00 04 04 00 00 50 04 00 00 01 1E A5 9B 00 04 04 00 00 40 05 00 00 01 1F A5 9B 00 04 04 00 00 EC 04 00 00 01 20 A5 9B 00 04 04 00 00 9A 10 00 00 01 21 A5 9B 00 04 04 00 00 80 01 00 00 01 22 A5 9B 00 04 04 00 00 EC 04 00 00 01 23 A5 9B 00 04 04 00 00 AE 02 00 00 01 24 A5 9B 00 04 04 00 00 AE 02 00 00 01 25 A5 9B 00 04 04 00 00 41 03 00 00 01 26 A5 9B 00 04 04 00 00 A4 01 00 00 01 27 A5 9B 00 04 04 00 00 B0 04 00 00 01 28 A5 9B 00 04 04 00 00 E0 05 00 00 01 29 A5 9B 00 04 04 00 00 0C 04 00 00 01 2A A5 9B 00 04 04 00 00 9A 10 00 00 01 2B A5 9B 00 04 04 00 00 F0 04 00 00 01 2C A5 9B 00 04 04 00 00 DC 01 00 00 01 2D A5 9B 00 04 04 00 00 EC 04 00 00 01 2E A5 9B 00 04 04 00 00 68 02 00 00 01 2F A5 9B 00 04 04 00 00 52 03 00 00 01 30 A5 9B 00 04 04 00 00 22 02 00 00 01 31 A5 9B 00 04 04 00 00 10 03 00 00 01 32 A5 9B 00 04 04 00 00 80 01 00 00 01 33 A5 9B 00 04 04 00 00 AE 02 00 00 01 34 A5 9B 00 04 04 00 00 EB 03 00 00 01 35 A5 9B 00 04 04 00 00 20 12 00 00 01 36 A5 9B 00 04 04 00 00 C8 06 00 00 01 37 A5 9B 00 04 04 00 00 AE 02 00 00 01 38 A5 9B 00 04 04 00 00 BC 02 00 00 01 39 A5 9B 00 04 04 00 00 FB 04 00 00 01 3A A5 9B 00 04 04 00 00 68 02 00 00 01 3B A5 9B 00 04 04 00 00 50 04 00 00 01 3C A5 9B 00 04 04 00 00 20 02 00 00 01 3D A5 9B 00 04 04 00 00 22 02 00 00 01 3E A5 9B 00 04 04 00 00 48 0D 00 00 01 3F A5 9B 00 04 04 00 00 10 03 00 00 01 40 A5 9B 00 04 04 00 00 52 04 00 00"));
            mplew.write(HexTool.getByteArrayFromHexString("01 41 A5 9B 00 04 04 00 00 AE 02 00 00 01 42 A5 9B 00 04 04 00 00 A8 07 00 00 01 43 A5 9B 00 04 04 00 00 EA 04 00 00 01 44 A5 9B 00 04 04 00 00 AE 02 00 00 01 45 A5 9B 00 04 04 00 00 50 04 00 00 01 46 A5 9B 00 04 04 00 00 10 03 00 00 01 47 A5 9B 00 04 04 00 00 34 08 00 00 01 48 A5 9B 00 04 04 00 00 97 02 00 00 01 49 A5 9B 00 04 04 00 00 A0 05 00 00 01 4A A5 9B 00 04 04 00 00 DC 01 00 00 01 4B A5 9B 00 04 04 00 00 DC 01 00 00 01 4C A5 9B 00 04 04 00 00 6A 05 00 00 01 60 2A 9D 00 04 00 00 00 EC 02 00 00 61 2A 9D 00 04 00 00 00 A4 06 00 00 62 2A 9D 00 04 00 00 00 FE 01 00 00 63 2A 9D 00 04 00 00 00 52 03 00 00 64 2A 9D 00 04 00 00 00 70 02 00 00 65 2A 9D 00 04 00 00 00 FA 05 00 00 66 2A 9D 00 04 00 00 00 3F 05 00 00 67 2A 9D 00 04 00 00 00 41 03 00 00 68 2A 9D 00 04 00 00 00 A8 02 00 00 69 2A 9D 00 04 00 00 00 96 03 00 00 6A 2A 9D 00 04 00 00 00 95 04 00 00 6B 2A 9D 00 04 00 00 00 41 03 00 00 6C 2A 9D 00 04 00 00 00 98 01 00 00 6D 2A 9D 00 04 00 00 00 40 04 00 00 6E 2A 9D 00 04 00 00 00 42 02 00 00 6F 2A 9D 00 04 00 00 00 20 02 00 00 70 2A 9D 00 04 00 00 00 41 03 00 00 71 2A 9D 00 04 00 00 00 42 02 00 00 72 2A 9D 00 04 00 00 00 42 02 00 00 73 2A 9D 00 04 00 00 00 A0 04 00 00 74 2A 9D 00 04 00 00 00 91 08 00 00 75 2A 9D 00 04 00 00 00 97 02 00 00 76 2A 9D 00 04 00 00 00 40 04 00 00 77 2A 9D 00 04 00 00 00 FA 05 00 00 78 2A 9D 00 04 00 00 00 A9 01 00 00 79 2A 9D 00 04 00 00 00 41 03 00 00 7A 2A 9D 00 04 00 00 00 40 04 00 00 7B 2A 9D 00 04 00 00 00 40 04 00 00 7C 2A 9D 00 04 00 00 00 42 02 00 00 7D 2A 9D 00 04 00 00 00 EC 02 00 00 7E 2A 9D 00 04 00 00 00 42 02 00 00 7F 2A 9D 00 04 00 00 00 FA 05 00 00 80 2A 9D 00 04 00 00 00 41 03 00 00 81 2A 9D 00 04 00 00 00 40 04 00 00 82 2A 9D 00 04 00 00 00 00 04 00 00 83 2A 9D 00 04 00 00 00 40 04 00 00 84 2A 9D 00 04 00 00 00 41 03 00 00 85 2A 9D 00 04 00 00 00 95 04 00 00 86 2A 9D 00 04 00 00 00 EC 02 00 00 87 2A 9D 00 04 00 00 00 3F 05 00 00 88 2A 9D 00 04 00 00 00 97 02 00 00 89 2A 9D 00 04 00 00 00 95 04 00 00 8A 2A 9D 00 04 00 00 00 96 03 00 00 8B 2A 9D 00 04 00 00 00 EC 02 00 00 8C 2A 9D 00 04 00 00 00 41 03 00 00 8D 2A 9D 00 04 00 00 00 FA 05 00 00 8E 2A 9D 00 04 00 00 00 96 03 00 00 8F 2A 9D 00 04 00 00 00 ED 01 00 00 90 2A 9D 00 04 00 00 00 96 03 00 00 91 2A 9D 00 04 00 00 00 97 02 00 00 92 2A 9D 00 04 00 00 00 96 03 00 00 93 2A 9D 00 04 00 00 00 40 04 00 00 94 2A 9D 00 04 00 00 00 42 02 00 00 95 2A 9D 00 04 00 00 00 96 03 00 00 96 2A 9D 00 04 00 00 00 F0 04 00 00 97 2A 9D 00 04 00 00 00 70 02 00 00 98 2A 9D 00 04 00 00 00 80 04 00 00 99 2A 9D 00 04 00 00 00 3C 06 00 00 9A 2A 9D 00 04 00 00 00 97 02 00 00 9B 2A 9D 00 04 00 00 00 34 05 00 00 9C 2A 9D 00 04 00 00 00 97 02 00 00 9D 2A 9D 00 04 00 00 00 C0 02 00 00 9E 2A 9D 00 04 00 00 00 20 02 00 00 9F 2A 9D 00 04 00 00 00 10 03 00 00 A0 2A 9D 00 04 00 00 00 30 06 00 00 A1 2A 9D 00 04 00 00 00 97 02 00 00 A2 2A 9D 00 04 00 00 00 54 06 00 00 A3 2A 9D 00 04 00 00 00 EC 02 00 00 A4 2A 9D 00 04 00 00 00 20 02 00 00 A5 2A 9D 00 04 00 00 00 70 02 00 00 A6 2A 9D 00 04 00 00 00 C0 02 00 00 A7 2A 9D 00 04 00 00 00 10 03 00 00 A8 2A 9D 00 04 00 00 00 BE 02 00 00 A9 2A 9D 00 04 00 00 00 0A 02 00 00 AA 2A 9D 00 04 00 00 00 DA 04 00 00 AB 2A 9D 00 04 00 00 00 41 03 00 00 AC 2A 9D 00 04 00 00 00 A3 03 00 00 AD 2A 9D 00 04 00 00 00 B6 03 00 00 AE 2A 9D 00 04 00 00 00 70 02 00 00 AF 2A 9D 00 04 00 00 00 97 02 00 00 B0 2A 9D 00 04 00 00 00 72 03 00 00 B1 2A 9D 00 04 00 00 00 69 01 00 00 B2 2A 9D 00 04 00 00 00 18 03 00 00 B3 2A 9D 00 04 00 00 00 60 03 00 00 B4 2A 9D 00 04 00 00 00 A0 05 00 00 B5 2A 9D 00 04 00 00 00 52 03 00 00 B6 2A 9D 00 04 00 00 00 EC 02 00 00 B7 2A 9D 00 04 00 00 00 34 09 00 00 B8 2A 9D 00 04 00 00 00 B0 01 00 00 B9 2A 9D 00 04 00 00 00 72 03 00 00 BA 2A 9D 00 04 00 00 00 C0 02 00 00 BB 2A 9D 00 04 00 00 00 DB 01 00 00 BC 2A 9D 00 04 00 00 00 46 05 00 00 BD 2A 9D 00 04 00 00 00 96 03 00 00 BE 2A 9D 00 04 00 00 00 90 01 00 00 BF 2A 9D 00 04 00 00 00 1D 01 00 00 C0 2A 9D 00 04 00 00 00 52 02 00 00 C1 2A 9D 00 04 00 00 00 41 03 00 00 C2 2A 9D 00 04 00 00 00 70 02 00 00 C3 2A 9D 00 04 00 00 00 86 02 00 00 C4 2A 9D 00 04 00 00 00 DA 04 00 00 C5 2A 9D 00 04 00 00 00 97 02 00 00 C6 2A 9D 00 04 00 00 00 70 02 00 00 C7 2A 9D 00 04 00 00 00 02 04 00 00 C8 2A 9D 00 04 00 00 00 C0 03 00 00 C9 2A 9D 00 04 00 00 00 97 02 00 00 CA 2A 9D 00 04 00 00 00 70 02 00 00 CB 2A 9D 00 04 00 00 00 44 03 00 00 CC 2A 9D 00 04 00 00 00 80 04 00 00 CD 2A 9D 00 04 00 00 00 4D 08 00 00 CE 2A 9D 00 04 00 00 00 70 02 00 00 CF 2A 9D 00 04 00 00 00 F2 09 00 00 D0 2A 9D 00 04 00 00 00 18 03 00 00 D1 2A 9D 00 04 00 00 00 94 05 00 00 D2 2A 9D 00 04 00 00 00 10 03 00 00 D3 2A 9D 00 04 00 00 00 FD 0C 00 00 D4 2A 9D 00 04 00 00 00 9C 06 00 00 D5 2A 9D 00 04 00 00 00 92 07 00 00 D6 2A 9D 00 04 00 00 00 70 02 00 00 D7 2A 9D 00 04 00 00 00 A3 03 00 00 D8 2A 9D 00 04 00 00 00 8E 05 00 00 D9 2A 9D 00 04 00 00 00 96 03 00 00 DA 2A 9D 00 04 00 00 00 70 02 00 00 DB 2A 9D 00 04 00 00 00 8E 12 00 00 DC 2A 9D 00 04 00 00 00 BE 02 00 00 DD 2A 9D 00 04 00 00 00 40 04 00 00 DE 2A 9D 00 04 00 00 00 D0 01 00 00 DF 2A 9D 00 04 00 00 00 C8 01 00 00 E0 2A 9D 00 04 00 00 00 BE 02 00 00 E1 2A 9D 00 04 00 00 00 42 02 00 00 E2 2A 9D 00 04 00 00 00 C0 02 00 00 E3 2A 9D 00 04 00 00 00 BE 02 00 00 E4 2A 9D 00 04 00 00 00 97 02 00 00 E5 2A 9D 00 04 00 00 00 A0 05 00 00 E6 2A 9D 00 04 00 00 00 42 02 00 00 E7 2A 9D 00 04 00 00 00 E0 01 00 00 E8 2A 9D 00 04 00 00 00 EA 04 00 00 E9 2A 9D 00 04 00 00 00 10 03 00 00 EA 2A 9D 00 04 00 00 00 EC 02 00 00 EB 2A 9D 00 04 00 00 00 20 02 00 00 EC 2A 9D 00 04 00 00 00 52 03 00 00 ED 2A 9D 00 04 00 00 00 80 04 00 00 EE 2A 9D 00 04 00 00 00 62 07 00 00 EF 2A 9D 00 04 00 00 00 FA 05 00 00 F0 2A 9D 00 04 00 00 00 B0 04 00 00 F1 2A 9D 00 04 00 00 00 BE 00 00 00 F2 2A 9D 00 04 00 00 00 10 0E 00 00 F3 2A 9D 00 04 00 00 00 40 04 00 00 F4 2A 9D 00 04 00 00 00 C0 02 00 00 F5 2A 9D 00 04 00 00 00 20 02 00 00 F6 2A 9D 00 04 00 00 00 40 05 00 00 F7 2A 9D 00 04 00 00 00 41 03 00 00 F8 2A 9D 00 04 00 00 00 10 03 00 00 F9 2A 9D 00 04 00 00 00 02 04 00 00 FA 2A 9D 00 04 00 00 00 E8 05 00 00 FB 2A 9D 00 04 00 00 00 A0 05 00 00 FC 2A 9D 00 04 00 00 00 20 02 00 00 FD 2A 9D 00 04 00 00 00 10 03 00 00 FE 2A 9D 00 04 00 00 00 72 03 00 00 FF 2A 9D 00 04 00 00 00 1A 0E 00 00 00 2B 9D 00 04 00 00 00 C0 02 00 00 01 2B 9D 00 04 00 00 00 8E 12 00 00 02 2B 9D 00 04 00 00 00 10 03 00 00 03 2B 9D 00 04 00 00 00 10 03 00 00 04 2B 9D 00 04 00 00 00 C0 02 00 00 05 2B 9D 00 04 00 00 00 00 04 00 00 06 2B 9D 00 04 00 00 00 8E 05 00 00 07 2B 9D 00 04 00 00 00 20 03 00 00 08 2B 9D 00 04 00 00 00 10 03 00 00 09 2B 9D 00 04 00 00 00 97 02 00 00 0A 2B 9D 00 04 00 00 00 70 02 00 00 0B 2B 9D 00 04 00 00 00 70 02 00 00 0C 2B 9D 00 04 00 00 00 00 04 00 00 0D 2B 9D 00 04 00 00 00 96 03 00 00 0E 2B 9D 00 04 00 00 00 60 03 00 00 0F 2B 9D 00 04 00 00 00 3E 06 00 00 10 2B 9D 00 04 00 00 00 C0 02 00 00 11 2B 9D 00 04 00 00 00 C0 02 00 00 12 2B 9D 00 04 00 00 00 22 0B 00 00 13 2B 9D 00 04 00 00 00 68 01 00 00 14 2B 9D 00 04 00 00 00 64 14 00 00 15 2B 9D 00 04 00 00 00 A0 05 00 00 16 2B 9D 00 04 00 00 00 00 04 00 00 17 2B 9D 00 04 00 00 00 C0 02 00 00 18 2B 9D 00 04 00 00 00 22 0B 00 00 19 2B 9D 00 04 00 00 00 72 03 00 00 1A 2B 9D 00 04 00 00 00 BE 02 00 00 1B 2B 9D 00 04 00 00 00 8E 12 00 00 1C 2B 9D 00 04 00 00 00 C0 07 00 00 1D 2B 9D 00 04 00 00 00 00 04 00 00 1E 2B 9D 00 04 00 00 00 40 04 00 00 1F 2B 9D 00 04 00 00 00 EC 02 00 00 20 2B 9D 00 04 00 00 00 70 02 00 00 21 2B 9D 00 04 00 00 00 C0 02 00 00 22 2B 9D 00 04 00 00 00 00 04 00 00 23 2B 9D 00 04 00 00 00 1D 01 00 00 24 2B 9D 00 04 00 00 00 B0 01 00 00 25 2B 9D 00 04 00 00 00 FE 01 00 00 26 2B 9D 00 04 00 00 00 EC 02 00 00 27 2B 9D 00 04 00 00 00 20 03 00 00 28 2B 9D 00 04 00 00 00 10 03 00 00 29 2B 9D 00 04 00 00 00 A0 0F 00 00 2A 2B 9D 00 04 00 00 00 20 03 00 00 2B 2B 9D 00 04 00 00 00 40 04 00 00 2C 2B 9D 00 04 00 00 00 FE 01 00 00 2D 2B 9D 00 04 00 00 00 EA 04 00 00 2E 2B 9D 00 04 00 00 00 30 06 00 00 2F 2B 9D 00 04 00 00 00 BE 02 00 00 30 2B 9D 00 04 00 00 00 C0 02 00 00 31 2B 9D 00 04 00 00 00 95 04 00 00 32 2B 9D 00 04 00 00 00 42 02 00 00 33 2B 9D 00 04 00 00 00 EE 00 00 00 34 2B 9D 00 04 00 00 00 10 03 00 00 35 2B 9D 00 04 00 00 00 20 02 00 00 36 2B 9D 00 04 00 00 00 D0 01 00 00 37 2B 9D 00 04 00 00 00 FB 04 00 00 38 2B 9D 00 04 00 00 00 F6 09 00 00 39 2B 9D 00 04 00 00 00 C0 02 00 00 3A 2B 9D 00 04 00 00 00 40 04 00 00 3B 2B 9D 00 04 00 00 00 90 01 00 00 3C 2B 9D 00 04 00 00 00 FA 05 00 00 3D 2B 9D 00 04 00 00 00 F0 04 00 00 3E 2B 9D 00 04 00 00 00 20 02 00 00 3F 2B 9D 00 04 00 00 00 70 02 00 00 40 2B 9D 00 04 00 00 00 10 03 00 00 41 2B 9D 00 04 00 00 00 C0 02 00 00 42 2B 9D 00 04 00 00 00 D8 0E 00 00 43 2B 9D 00 04 00 00 00 F0 04 00 00 44 2B 9D 00 04 00 00 00 FB 04 00 00 45 2B 9D 00 04 00 00 00 61 04 00 00 46 2B 9D 00 04 00 00 00 DA 04 00 00 47 2B 9D 00 04 00 00 00 52 03 00 00 48 2B 9D 00 04 00 00 00 C0 02 00 00 49 2B 9D 00 04 00 00 00 10 03 00 00 4A 2B 9D 00 04 00 00 00 C8 01 00 00 4B 2B 9D 00 04 00 00 00 B0 01 00 00 4C 2B 9D 00 04 00 00 00 EC 02 00 00 4D 2B 9D 00 04 00 00 00 C0 08 00 00 4E 2B 9D 00 04 00 00 00 A3 03 00 00 4F 2B 9D 00 04 00 00 00 B6 03 00 00 50 2B 9D 00 04 00 00 00 B6 03 00 00 51 2B 9D 00 04 00 00 00 72 03 00 00 52 2B 9D 00 04 00 00 00 97 02 00 00 53 2B 9D 00 04 00 00 00 A4 06 00 00 54 2B 9D 00 04 00 00 00 41 03 00 00 55 2B 9D 00 04 00 00 00 A0 04 00 00 56 2B 9D 00 04 00 00 00 F0 04 00 00 57 2B 9D 00 04 00 00 00 B6 03 00 00 58 2B 9D 00 04 00 00 00 72 03 00 00 59 2B 9D 00 04 00 00 00 EC 02 00 00 5A 2B 9D 00 04 00 00 00 A0 04 00 00 5B 2B 9D 00 04 00 00 00 A3 03 00 00 5C 2B 9D 00 04 00 00 00 8C 0A 00 00 5D 2B 9D 00 04 00 00 00 41 03 00 00 5E 2B 9D 00 04 00 00 00 10 03 00 00 5F 2B 9D 00 04 00 00 00 B6 03 00 00 60 2B 9D 00 04 00 00 00 34 09 00 00 61 2B 9D 00 04 00 00 00 64 02 00 00 62 2B 9D 00 04 00 00 00 42 02 00 00 63 2B 9D 00 04 00 00 00 41 03 00 00 64 2B 9D 00 04 00 00 00 C0 02 00 00 65 2B 9D 00 04 00 00 00 60 09 00 00 66 2B 9D 00 04 00 00 00 60 03 00 00 67 2B 9D 00 04 00 00 00 D0 02 00 00 68 2B 9D 00 04 00 00 00 42 02 00 00 69 2B 9D 00 04 00 00 00 50 04 00 00 6A 2B 9D 00 04 00 00 00 70 02 00 00 6B 2B 9D 00 04 00 00 00 50 04 00 00 6C 2B 9D 00 04 00 00 00 0A 02 00 00 6D 2B 9D 00 04 00 00 00 72 03 00 00 6E 2B 9D 00 04 00 00 00 F6 09 00 00 6F 2B 9D 00 04 00 00 00 00 04 00 00 70 2B 9D 00 04 00 00 00 C2 01 00 00 71 2B 9D 00 04 00 00 00 FE 01 00 00 72 2B 9D 00 04 00 00 00 30 06 00 00 73 2B 9D 00 04 00 00 00 8E 05 00 00 74 2B 9D 00 04 00 00 00 A0 05 00 00 12 2D 31 01 00 04 00 00 01 14 2D 31 01 00 04 00 00 01 15 2D 31 01 00 04 00 00 01 16 2D 31 01 00 04 00 00 01 17 2D 31 01 00 04 00 00 01 18 2D 31 01 00 04 00 00 01 19 2D 31 01 00 04 00 00 01 1A 2D 31 01 00 04 00 00 01 1C 2D 31 01 00 04 00 00 01 1F 2D 31 01 00 04 00 00 01 20 2D 31 01 00 04 00 00 01 21 2D 31 01 00 04 00 00 01 22 2D 31 01 00 04 00 00 01 23 2D 31 01 00 08 00 00 03 24 2D 31 01 00 04 00 00 01 25 2D 31 01 00 04 00 00 01 26 2D 31 01 00 04 00 00 01 28 2D 31 01 00 04 00 00 01 29 2D 31 01 00 04 00 00 01 2A 2D 31 01 00 04 00 00 01 2B 2D 31 01 00 04 00 00 01 2C 2D 31 01 10 00 00 00 05 2D 2D 31 01 00 04 00 00 01 2E 2D 31 01 00 04 00 00 01 2F 2D 31 01 00 04 00 00 01 30 2D 31 01 00 04 00 00 01 31 2D 31 01 00 04 00 00 01 32 2D 31 01 00 04 00 00 01 33 2D 31 01 00 04 00 00 01 34 2D 31 01 00 04 00 00 01 35 2D 31 01 00 04 00 00 01 36 2D 31 01 00 04 00 00 01 37 2D 31 01 00 04 00 00 01 38 2D 31 01 00 04 00 00 01 39 2D 31 01 00 04 00 00 01 3A 2D 31 01 00 04 00 00 01 3B 2D 31 01 00 04 00 00 01 3C 2D 31 01 00 04 00 00 01 3D 2D 31 01 00 04 00 00 01 3E 2D 31 01 00 04 00 00 01 3F 2D 31 01 00 04 00 00 01 40 2D 31 01 00 04 00 00 01 41 2D 31 01 00 04 00 00 01 42 2D 31 01 00 04 00 00 01 43 2D 31 01 00 04 00 00 01 44 2D 31 01 00 04 00 00 01 45 2D 31 01 00 04 00 00 01 46 2D 31 01 00 04 00 00 01 47 2D 31 01 00 04 00 00 01 48 2D 31 01 00 04 00 00 01 49 2D 31 01 00 0C 00 00 01 02 4D 2D 31 01 00 04 00 00 01 4E 2D 31 01 00 04 00 00 01 4F 2D 31 01 00 04 00 00 01 50 2D 31 01 00 04 00 00 01 51 2D 31 01 00 04 00 00 01 52 2D 31 01 00 04 00 00 01 53 2D 31 01 00 04 00 00 01 54 2D 31 01 00 04 00 00 01 55 2D 31 01 00 04 00 00 01 56 2D 31 01 00 04 00 00 01 57 2D 31 01 00 04 00 00 01 58 2D 31 01 00 04 00 00 01 59 2D 31 01 00 04 00 00 01 5A 2D 31 01 00 04 00 00 01 5B 2D 31 01 00 04 00 00 01 5C 2D 31 01 00 04 00 00 01 5D 2D 31 01 00 04 00 00 01 5E 2D 31 01 00 04 00 00 01 5F 2D 31 01 00 04 00 00 01 60 2D 31 01 00 04 00 00 01 61 2D 31 01 00 04 00 00 01 62 2D 31 01 00 04 00 00 01 63 2D 31 01 00 04 00 00 01 64 2D 31 01 00 04 00 00 01 65 2D 31 01 00 04 00 00 01 6A 2D 31 01 00 04 00 00 01 6B 2D 31 01 00 04 00 00 01 6C 2D 31 01 00 04 00 00 01 6D 2D 31 01 00 04 00 00 01 6E 2D 31 01 00 04 00 00 01 70 2D 31 01 00 04 00 00 01 74 2D 31 01 00 04 00 00 01 75 2D 31 01 00 04 00 00 01 76 2D 31 01 00 04 00 00 01 7A 2D 31 01 00 04 00 00 01 7B 2D 31 01 00 04 00 00 01 7C 2D 31 01 00 04 00 00 01 7D 2D 31 01 00 04 00 00 01 7E 2D 31 01 00 04 00 00 01 7F 2D 31 01 00 04 00 00 01 80 2D 31 01 00 04 00 00 01 82 2D 31 01 00 04 00 00 01 83 2D 31 01 00 04 00 00 01 84 2D 31 01 00 04 00 00 01 8A 2D 31 01 00 04 00 00 01 8B 2D 31 01 00 04 00 00 01 8C 2D 31 01 00 04 00 00 01 8D 2D 31 01 00 04 00 00 01 8E 2D 31 01 00 04 00 00 01 8F 2D 31 01 00 04 00 00 01 93 2D 31 01 00 04 00 00 01 99 2D 31 01 00 04 00 00 01 9A 2D 31 01 00 04 00 00 01 A6 2D 31 01 00 04 00 00 01 A7 2D 31 01 00 04 00 00 01 A8 2D 31 01 00 04 00 00 01 A9 2D 31 01 00 04 00 00 01 AA 2D 31 01 00 04 00 00 01 AB 2D 31 01 00 04 00 00 01 AC 2D 31 01 00 04 00 00 01 AD 2D 31 01 00 04 00 00 01 AE 2D 31 01 00 04 00 00 01 AF 2D 31 01 00 04 00 00 01 B0 2D 31 01 00 04 00 00 01 B1 2D 31 01 00 04 00 00 01 B2 2D 31 01 00 04 00 00 01 B3 2D 31 01 00 04 00 00 01 B4 2D 31 01 00 04 00 00 01 B5 2D 31 01 00 04 00 00 01 B6 2D 31 01 00 04 00 00 01 B7 2D 31 01 00 04 00 00 01 B8 2D 31 01 00 04 00 00 01 B9 2D 31 01 00 04 00 00 01 BA 2D 31 01 00 04 00 00 01 BC 2D 31 01 00 04 00 00 01 BD 2D 31 01 00 04 00 00 01 BE 2D 31 01 00 04 00 00 01 BF 2D 31 01 00 04 00 00 01 C0 2D 31 01 00 04 00 00 01 C7 2D 31 01 00 04 00 00 01 C8 2D 31 01 00 04 00 00 01 C9 2D 31 01 00 04 00 00 01 CA 2D 31 01 00 04 00 00 01 CB 2D 31 01 00 04 00 00 01 CC 2D 31 01 00 04 00 00 01 CD 2D 31 01 00 04 00 00 01 CE 2D 31 01 00 04 00 00 01 CF 2D 31 01 00 04 00 00 01 D1 2D 31 01 00 04 00 00 01 D2 2D 31 01 00 04 00 00 01 D3 2D 31 01 00 04 00 00 01 D4 2D 31 01 00 04 00 00 01 D5 2D 31 01 00 04 00 00 01 D6 2D 31 01 00 04 00 00 01 D7 2D 31 01 00 04 00 00 01 D8 2D 31 01 00 04 00 00 01 D9 2D 31 01 00 04 00 00 01 DA 2D 31 01 00 04 00 00 01 DB 2D 31 01 00 04 00 00 01 DC 2D 31 01 00 04 00 00 01 DD 2D 31 01 00 04 00 00 01 DE 2D 31 01 00 04 00 00 01 DF 2D 31 01 14 0C 00 00 62 97 02 00 00 01 01 E0 2D 31 01 00 04 00 00 01 E1 2D 31 01 00 04 00 00 01 E2 2D 31 01 00 04 00 00 01 E3 2D 31 01 00 04 00 00 01 F0 2D 31 01 00 04 00 00 01 F1 2D 31 01 00 04 00 00 01 F2 2D 31 01 10 00 00 00 05 F3 2D 31 01 10 00 00 00 05 F4 2D 31 01 00 04 00 00 01 F5 2D 31 01 00 04 00 00 01 F6 2D 31 01 00 04 00 00 01 F7 2D 31 01 00 04 00 00 01 FA 2D 31 01 00 04 00 00 01 FB 2D 31 01 00 04 00 00 01 FC 2D 31 01 00 04 00 00 01 FD 2D 31 01 00 04 00 00 01 FE 2D 31 01 00 04 00 00 01 FF 2D 31 01 00 04 00 00 01 00 2E 31 01 00 04 00 00 01 12 2E 31 01 00 04 00 00 01 13 2E 31 01 00 04 00 00 01 14 2E 31 01 00 04 00 00 01 15 2E 31 01 00 04 00 00 01 16 2E 31 01 00 04 00 00 01 17 2E 31 01 00 04 00 00 01 18 2E 31 01 00 04 00 00 01 1A 2E 31 01 00 04 00 00 01 1D 2E 31 01 00 04 00 00 01 1E 2E 31 01 00 04 00 00 01 1F 2E 31 01 00 04 00 00 01 20 2E 31 01 00 04 00 00 01 21 2E 31 01 00 04 00 00 01 22 2E 31 01 00 04 00 00 01 23 2E 31 01 00 04 00 00 01 24 2E 31 01 00 04 00 00 01 25 2E 31 01 00 04 00 00 01 26 2E 31 01 00 04 00 00 01 27 2E 31 01 00 04 00 00 01 28 2E 31 01 00 04 00 00 01 29 2E 31 01 00 04 00 00 01 2A 2E 31 01 00 04 00 00 01 2B 2E 31 01 00 04 00 00 01 2C 2E 31 01 00 04 00 00 01 2D 2E 31 01 00 04 00 00 01 2E 2E 31 01 00 0C 00 00 01 02 2F 2E 31 01 00 04 00 00 01 30 2E 31 01 00 04 00 00 01 31 2E 31 01 00 04 00 00 01 32 2E 31 01 00 04 00 00 01 33 2E 31 01 00 04 00 00 01 34 2E 31 01 00 04 00 00 01 35 2E 31 01 00 04 00 00 01 36 2E 31 01 00 04 00 00 01 38 2E 31 01 00 04 00 00 01 39 2E 31 01 00 04 00 00 01 3C 2E 31 01 00 04 00 00 01 3D 2E 31 01 00 04 00 00 01 3E 2E 31 01 00 04 00 00 01 3F 2E 31 01 00 04 00 00 01 40 2E 31 01 00 04 00 00 01 41 2E 31 01 00 04 00 00 01 42 2E 31 01 00 08 00 00 03 43 2E 31 01 00 08 00 00 03 44 2E 31 01 00 04 00 00 01 45 2E 31 01 00 04 00 00 01 46 2E 31 01 00 04 00 00 01 48 2E 31 01 00 04 00 00 01 49 2E 31 01 00 04 00 00 01 4A 2E 31 01 00 04 00 00 01 4B 2E 31 01 00 04 00 00 01 4C 2E 31 01 00 04 00 00 01 4D 2E 31 01 00 04 00 00 01 4E 2E 31 01 00 04 00 00 01 4F 2E 31 01 00 04 00 00 01 50 2E 31 01 00 04 00 00 01 51 2E 31 01 00 04 00 00 01 52 2E 31 01 00 04 00 00 01 53 2E 31 01 00 04 00 00 01 54 2E 31 01 00 04 00 00 01 55 2E 31 01 00 04 00 00 01 56 2E 31 01 00 04 00 00 01 57 2E 31 01 00 04 00 00 01 58 2E 31 01 00 04 00 00 01 59 2E 31 01 00 04 00 00 01 5C 2E 31 01 00 04 00 00 01 5D 2E 31 01 00 04 00 00 01 5E 2E 31 01 00 04 00 00 01 6B 2E 31 01 00 04 00 00 01 6C 2E 31 01 00 04 00 00 01 6D 2E 31 01 00 04 00 00 01 6E 2E 31 01 00 04 00 00 01 74 2E 31 01 00 08 00 00 03 82 2E 31 01 00 08 00 00 03 83 2E 31 01 00 08 00 00 03 84 2E 31 01 00 04 00 00 01 85 2E 31 01 00 04 00 00 01 86 2E 31 01 00 04 00 00 01 87 2E 31 01 10 00 00 00 05 88 2E 31 01 00 04 00 00 01 89 2E 31 01 00 04 00 00 01 8A 2E 31 01 00 04 00 00 01 8B 2E 31 01 00 0C 00 00 01 02 8C 2E 31 01 00 04 00 00 01 8D 2E 31 01 00 04 00 00 01 8E 2E 31 01 00 04 00 00 01 90 2E 31 01 00 04 00 00 01 91 2E 31 01 00 04 00 00 01 92 2E 31 01 00 04 00 00 01 93 2E 31 01 00 04 00 00 01 95 2E 31 01 00 04 00 00 01 96 2E 31 01 00 04 00 00 01 98 2E 31 01 00 04 00 00 01 99 2E 31 01 00 04 00 00 01 9A 2E 31 01 00 04 00 00 01 9B 2E 31 01 00 04 00 00 01 9C 2E 31 01 00 04 00 00 01 9D 2E 31 01 00 04 00 00 01 9E 2E 31 01 00 04 00 00 01 9F 2E 31 01 00 04 00 00 01 A0 2E 31 01 00 04 00 00 01 A1 2E 31 01 00 04 00 00 01 A2 2E 31 01 00 04 00 00 01 A3 2E 31 01 00 04 00 00 01 A4 2E 31 01 00 04 00 00 01 AA 2E 31 01 00 04 00 00 01 AB 2E 31 01 00 04 00 00 01 AC 2E 31 01 00 04 00 00 01 AD 2E 31 01 00 04 00 00 01 AE 2E 31 01 00 04 00 00 01 AF 2E 31 01 00 04 00 00 01 B0 2E 31 01 00 04 00 00 01 B2 2E 31 01 00 0C 00 00 01 02 B3 2E 31 01 00 04 00 00 01 B8 2E 31 01 00 04 00 00 01 B9 2E 31 01 00 0C 00 00 01 02 D6 2E 31 01 00 04 00 00 01 D9 2E 31 01 00 04 00 00 01 DA 2E 31 01 10 00 00 00 05 DB 2E 31 01 00 04 00 00 01 DC 2E 31 01 10 00 00 00 05 DD 2E 31 01 10 00 00 00 05 DE 2E 31 01 00 04 00 00 01 E2 2E 31 01 00 04 00 00 01 E3 2E 31 01 00 04 00 00 01 E4 2E 31 01 00 04 00 00 01 E6 2E 31 01 00 0C 00 00 01 02 EE 2E 31 01 00 0C 00 00 01 02 EF 2E 31 01 00 04 00 00 01 F0 2E 31 01 00 04 00 00 01 F1 2E 31 01 00 08 00 00 00 F2 2E 31 01 00 04 00 00 01 F5 2E 31 01 00 0C 00 00 01 02 FA 2E 31 01 00 04 00 00 01 FB 2E 31 01 00 04 00 00 01 FC 2E 31 01 00 0C 00 00 01 02 01 2F 31 01 00 0C 00 00 01 02 02 2F 31 01 00 0C 00 00 01 02 03 2F 31 01 00 08 00 00 00 04 2F 31 01 00 08 00 00 00 06 2F 31 01 00 0C 00 00 01 02 07 2F 31 01 00 04 00 00 01 08 2F 31 01 00 04 00 00 01 09 2F 31 01 00 0C 00 00 01 02 0A 2F 31 01 00 0C 00 00 01 02 0B 2F 31 01 00 08 00 00 00 0C 2F 31 01 00 0C 00 00 01 02 0D 2F 31 01 00 04 00 00 01 0E 2F 31 01 00 04 00 00 01 0F 2F 31 01 00 0C 00 00 01 02 10 2F 31 01 00 0C 00 00 01 02 11 2F 31 01 00 08 00 00 00 12 2F 31 01 00 0C 00 00 01 02 13 2F 31 01 00 0C 00 00 01 02 14 2F 31 01 00 04 00 00 01 15 2F 31 01 00 0C 00 00 01 02 1C 2F 31 01 00 0C 00 00 01 02 1D 2F 31 01 00 04 00 00 01 1E 2F 31 01 00 0C 00 00 01 02 21 2F 31 01 10 04 00 00 55 01 22 2F 31 01 10 04 00 00 55 01 23 2F 31 01 10 08 00 00 63 00 24 2F 31 01 10 0C 00 00 5A 01 02 25 2F 31 01 10 0C 00 00 5A 01 02 26 2F 31 01 10 08 00 00 63 00 27 2F 31 01 10 0C 00 00 5A 01 02 2F 2F 31 01 10 04 00 00 61 01 31 2F 31 01 10 04 00 00 55 01 32 2F 31 01 00 0C 00 00 01 00 A0 B3 32 01 00 04 00 00 01 A1 B3 32 01 00 04 00 00 01 A2 B3 32 01 00 04 00 00 01 A4 B3 32 01 00 04 00 00 01 A5 B3 32 01 00 04 00 00 01 A6 B3 32 01 00 0C 00 00 01 02 A7 B3 32 01 00 04 00 00 01 A8 B3 32 01 14 0C 00 00 62 42 02 00 00 01 01 A9 B3 32 01 00 04 00 00 01 AA B3 32 01 00 04 00 00 01 AB B3 32 01 00 04 00 00 01 AC B3 32 01 00 04 00 00 01 AD B3 32 01 00 04 00 00 01 AE B3 32 01 00 04 00 00 01 AF B3 32 01 00 04 00 00 01 B0 B3 32 01 00 04 00 00 01 B1 B3 32 01 00 04 00 00 01 B2 B3 32 01 00 04 00 00 01 B4 B3 32 01 00 04 00 00 01 B5 B3 32 01 00 04 00 00 01 B7 B3 32 01 00 04 00 00 01 B8 B3 32 01 00 04 00 00 01 B9 B3 32 01 00 04 00 00 01 BA B3 32 01 00 04 00 00 01 BB B3 32 01 00 04 00 00 01 BC B3 32 01 00 04 00 00 01 BD B3 32 01 00 04 00 00 01 BE B3 32 01 00 04 00 00 01 BF B3 32 01 00 04 00 00 01 C0 B3 32 01 00 08 00 00 03 C1 B3 32 01 00 04 00 00 01 C2 B3 32 01 00 04 00 00 01 C3 B3 32 01 00 04 00 00 01 C4 B3 32 01 00 04 00 00 01 C5 B3 32 01 00 04 00 00 01 C6 B3 32 01 00 04 00 00 01 C7 B3 32 01 00 04 00 00 01 C8 B3 32 01 00 04 00 00 01 C9 B3 32 01 00 04 00 00 01 CC B3 32 01 00 0C 00 00 01 02 CD B3 32 01 00 04 00 00 01 CE B3 32 01 00 04 00 00 01 CF B3 32 01 00 04 00 00 01 D0 B3 32 01 00 04 00 00 01 D1 B3 32 01 00 04 00 00 01 D2 B3 32 01 00 04 00 00 01 D3 B3 32 01 00 04 00 00 01 D4 B3 32 01 00 08 00 00 03 D5 B3 32 01 00 04 00 00 01 D6 B3 32 01 00 04 00 00 01 D7 B3 32 01 00 04 00 00 01 D8 B3 32 01 00 0C 00 00 01 02 D9 B3 32 01 00 04 00 00 01 DA B3 32 01 00 04 00 00 01 DB B3 32 01 00 04 00 00 01 DC B3 32 01 00 04 00 00 01 DD B3 32 01 00 04 00 00 01 DE B3 32 01 08 00 00 00 01 DF B3 32 01 00 04 00 00 01 E0 B3 32 01 00 08 00 00 02 E1 B3 32 01 00 0C 00 00 01 02 E2 B3 32 01 00 04 00 00 01 E4 B3 32 01 00 04 00 00 01 E5 B3 32 01 00 0C 00 00 01 02 E6 B3 32 01 00 04 00 00 01 E7 B3 32 01 00 04 00 00 01 E8 B3 32 01 00 04 00 00 01 E9 B3 32 01 00 0C 00 00 01 02 EA B3 32 01 00 04 00 00 01 EB B3 32 01 00 04 00 00 01 EC B3 32 01 00 0C 00 00 01 02 ED B3 32 01 00 04 00 00 01 EE B3 32 01 00 04 00 00 01 EF B3 32 01 00 08 00 00 02 F0 B3 32 01 00 0C 00 00 01 02 F2 B3 32 01 10 08 00 00 63 00 40 3A 34 01 00 04 00 00 01 41 3A 34 01 00 04 00 00 01 42 3A 34 01 00 04 00 00 01 43 3A 34 01 00 04 00 00 01 44 3A 34 01 00 04 00 00 01 45 3A 34 01 00 04 00 00 01 46 3A 34 01 00 04 00 00 01 47 3A 34 01 00 04 00 00 01 48 3A 34 01 00 04 00 00 01 49 3A 34 01 00 04 00 00 01 4A 3A 34 01 00 04 00 00 01 4B 3A 34 01 00 04 00 00 01 4C 3A 34 01 00 04 00 00 01 4D 3A 34 01 00 04 00 00 01 4E 3A 34 01 00 04 00 00 01 4F 3A 34 01 00 04 00 00 01 50 3A 34 01 00 04 00 00 01 51 3A 34 01 00 04 00 00 01 52 3A 34 01 00 04 00 00 01 53 3A 34 01 00 04 00 00 01 54 3A 34 01 00 04 00 00 01 55 3A 34 01 00 04 00 00 01 56 3A 34 01 00 04 00 00 01 57 3A 34 01 00 04 00 00 01 58 3A 34 01 00 04 00 00 01 59 3A 34 01 00 04 00 00 01 5A 3A 34 01 00 04 00 00 01 5B 3A 34 01 00 04 00 00 01 5C 3A 34 01 00 04 00 00 01 5D 3A 34 01 00 04 00 00 01 5F 3A 34 01 00 04 00 00 01 60 3A 34 01 00 04 00 00 01 61 3A 34 01 00 04 00 00 01 62 3A 34 01 00 04 00 00 01 63 3A 34 01 00 04 00 00 01 64 3A 34 01 00 04 00 00 01 65 3A 34 01 00 04 00 00 01 66 3A 34 01 00 04 00 00 01 67 3A 34 01 00 04 00 00 01 68 3A 34 01 00 04 00 00 01 69 3A 34 01 00 04 00 00 01 70 3A 34 01 00 04 00 00 01 73 3A 34 01 00 04 00 00 01 74 3A 34 01 00 04 00 00 01 75 3A 34 01 00 04 00 00 01 7A 3A 34 01 00 04 00 00 01 7B 3A 34 01 00 0C 00 00 01 02 7D 3A 34 01 00 04 00 00 01 7E 3A 34 01 00 04 00 00 01 7F 3A 34 01 00 04 00 00 01 81 3A 34 01 00 0C 00 00 01 02 82 3A 34 01 00 04 00 00 01 83 3A 34 01 00 04 00 00 01 84 3A 34 01 00 0C 00 00 01 02 85 3A 34 01 00 04 00 00 01 88 3A 34 01 00 04 00 00 01 89 3A 34 01 00 04 00 00 01 8A 3A 34 01 00 04 00 00 01 8B 3A 34 01 00 04 00 00 01 92 3A 34 01 00 04 00 00 01 93 3A 34 01 00 0C 00 00 01 02 95 3A 34 01 00 0C 00 00 01 02 96 3A 34 01 00 0C 00 00 01 02 98 3A 34 01 00 04 00 00 01 99 3A 34 01 00"));
            mplew.write(HexTool.getByteArrayFromHexString("0C 00 00 01 02 9A 3A 34 01 00 04 00 00 01 9B 3A 34 01 10 0C 00 00 5A 01 02 EA C0 35 01 00 04 00 00 01 EB C0 35 01 00 04 00 00 01 EC C0 35 01 00 04 00 00 01 ED C0 35 01 00 04 00 00 01 EE C0 35 01 00 04 00 00 01 EF C0 35 01 00 04 00 00 01 F0 C0 35 01 00 04 00 00 01 F3 C0 35 01 00 04 00 00 01 F4 C0 35 01 00 04 00 00 01 F5 C0 35 01 00 04 00 00 01 F6 C0 35 01 00 04 00 00 01 F7 C0 35 01 00 04 00 00 01 F8 C0 35 01 00 08 00 00 03 F9 C0 35 01 10 00 00 00 05 FA C0 35 01 10 00 00 00 05 FB C0 35 01 00 04 00 00 01 FC C0 35 01 00 04 00 00 01 01 C1 35 01 00 04 00 00 01 02 C1 35 01 00 04 00 00 01 03 C1 35 01 00 04 00 00 01 04 C1 35 01 00 04 00 00 01 05 C1 35 01 00 04 00 00 01 06 C1 35 01 00 04 00 00 01 07 C1 35 01 00 04 00 00 01 08 C1 35 01 00 04 00 00 01 09 C1 35 01 00 04 00 00 01 0A C1 35 01 00 04 00 00 01 0B C1 35 01 00 04 00 00 01 0C C1 35 01 00 04 00 00 01 0D C1 35 01 00 04 00 00 01 0E C1 35 01 00 04 00 00 01 0F C1 35 01 00 04 00 00 01 10 C1 35 01 00 04 00 00 01 11 C1 35 01 00 04 00 00 01 12 C1 35 01 00 04 00 00 01 13 C1 35 01 00 04 00 00 01 14 C1 35 01 00 04 00 00 01 15 C1 35 01 00 04 00 00 01 16 C1 35 01 00 04 00 00 01 17 C1 35 01 00 04 00 00 01 18 C1 35 01 00 04 00 00 01 19 C1 35 01 00 0C 00 00 01 02 1A C1 35 01 00 04 00 00 01 1B C1 35 01 00 04 00 00 01 1C C1 35 01 00 04 00 00 01 1D C1 35 01 00 04 00 00 01 1E C1 35 01 00 04 00 00 01 1F C1 35 01 00 04 00 00 01 20 C1 35 01 00 04 00 00 01 21 C1 35 01 00 04 00 00 01 2E C1 35 01 00 04 00 00 01 2F C1 35 01 00 04 00 00 01 38 C1 35 01 00 04 00 00 01 39 C1 35 01 00 04 00 00 01 3A C1 35 01 00 04 00 00 01 3F C1 35 01 00 04 00 00 01 40 C1 35 01 00 04 00 00 01 41 C1 35 01 00 04 00 00 01 42 C1 35 01 00 04 00 00 01 44 C1 35 01 00 04 00 00 01 47 C1 35 01 00 04 00 00 01 48 C1 35 01 00 04 00 00 01 49 C1 35 01 10 00 00 00 05 4A C1 35 01 10 00 00 00 05 4B C1 35 01 00 04 00 00 01 4C C1 35 01 00 04 00 00 01 4D C1 35 01 00 04 00 00 01 4E C1 35 01 00 04 00 00 01 51 C1 35 01 00 04 00 00 01 52 C1 35 01 00 04 00 00 01 53 C1 35 01 00 04 00 00 01 54 C1 35 01 00 04 00 00 01 55 C1 35 01 00 04 00 00 01 56 C1 35 01 00 04 00 00 01 5C C1 35 01 00 04 00 00 01 5D C1 35 01 00 04 00 00 01 5E C1 35 01 00 04 00 00 01 5F C1 35 01 00 04 00 00 01 60 C1 35 01 00 04 00 00 01 61 C1 35 01 00 04 00 00 01 62 C1 35 01 00 04 00 00 01 63 C1 35 01 00 04 00 00 01 64 C1 35 01 00 04 00 00 01 65 C1 35 01 00 04 00 00 01 66 C1 35 01 00 04 00 00 01 67 C1 35 01 00 04 00 00 01 68 C1 35 01 00 04 00 00 01 69 C1 35 01 00 04 00 00 01 6A C1 35 01 00 04 00 00 01 6B C1 35 01 00 04 00 00 01 6C C1 35 01 00 04 00 00 01 6D C1 35 01 00 04 00 00 01 6E C1 35 01 00 04 00 00 01 6F C1 35 01 00 04 00 00 01 70 C1 35 01 00 04 00 00 01 71 C1 35 01 00 04 00 00 01 72 C1 35 01 00 04 00 00 01 73 C1 35 01 00 04 00 00 01 74 C1 35 01 00 04 00 00 01 75 C1 35 01 00 04 00 00 01 76 C1 35 01 00 04 00 00 01 77 C1 35 01 00 04 00 00 01 78 C1 35 01 00 04 00 00 01 79 C1 35 01 00 04 00 00 01 7A C1 35 01 00 04 00 00 01 7B C1 35 01 00 04 00 00 01 7C C1 35 01 00 04 00 00 01 7D C1 35 01 00 04 00 00 01 7E C1 35 01 00 04 00 00 01 7F C1 35 01 00 04 00 00 01 86 C1 35 01 00 08 00 00 03 87 C1 35 01 00 08 00 00 03 88 C1 35 01 00 04 00 00 01 89 C1 35 01 00 04 00 00 01 8A C1 35 01 00 04 00 00 01 8B C1 35 01 00 04 00 00 01 8D C1 35 01 00 04 00 00 01 90 C1 35 01 00 04 00 00 01 94 C1 35 01 00 04 00 00 01 98 C1 35 01 00 04 00 00 01 99 C1 35 01 00 04 00 00 01 9D C1 35 01 00 04 00 00 01 9E C1 35 01 00 04 00 00 01 A2 C1 35 01 00 08 00 00 03 A3 C1 35 01 00 04 00 00 01 A4 C1 35 01 00 04 00 00 01 A5 C1 35 01 00 04 00 00 01 A6 C1 35 01 00 04 00 00 01 A7 C1 35 01 00 04 00 00 01 AA C1 35 01 00 04 00 00 01 AB C1 35 01 00 04 00 00 01 AC C1 35 01 00 04 00 00 01 AD C1 35 01 00 04 00 00 01 AE C1 35 01 00 04 00 00 01 B0 C1 35 01 00 04 00 00 01 B1 C1 35 01 00 04 00 00 01 B2 C1 35 01 00 04 00 00 01 B3 C1 35 01 00 04 00 00 01 B4 C1 35 01 00 04 00 00 01 B5 C1 35 01 00 04 00 00 01 B6 C1 35 01 00 04 00 00 01 B7 C1 35 01 00 04 00 00 01 B8 C1 35 01 00 04 00 00 01 B9 C1 35 01 00 04 00 00 01 BF C1 35 01 00 04 00 00 01 C0 C1 35 01 00 0C 00 00 01 02 C1 C1 35 01 00 0C 00 00 01 02 C2 C1 35 01 00 04 00 00 01 CA C1 35 01 00 0C 00 00 01 02 CD C1 35 01 00 04 00 00 01 CE C1 35 01 00 04 00 00 01 CF C1 35 01 00 04 00 00 01 D0 C1 35 01 00 04 00 00 01 D1 C1 35 01 00 04 00 00 01 D2 C1 35 01 10 00 00 00 05 D3 C1 35 01 00 04 00 00 01 D8 C1 35 01 00 0C 00 00 01 02 D9 C1 35 01 00 04 00 00 01 DA C1 35 01 00 04 00 00 01 DB C1 35 01 00 04 00 00 01 DC C1 35 01 00 04 00 00 01 DD C1 35 01 00 04 00 00 01 DE C1 35 01 00 04 00 00 01 DF C1 35 01 00 0C 00 00 01 02 E7 C1 35 01 00 04 00 00 01 E8 C1 35 01 00 04 00 00 01 E9 C1 35 01 00 04 00 00 01 F1 C1 35 01 00 0C 00 00 01 02 F2 C1 35 01 00 04 00 00 01 F4 C1 35 01 00 08 00 00 00 F5 C1 35 01 00 0C 00 00 01 02 F6 C1 35 01 00 0C 00 00 01 02 F7 C1 35 01 00 0C 00 00 01 02 F8 C1 35 01 00 08 00 00 00 F9 C1 35 01 00 0C 00 00 01 02 FC C1 35 01 00 0C 00 00 01 02 02 C2 35 01 00 04 00 00 01 03 C2 35 01 00 04 00 00 01 04 C2 35 01 00 08 00 00 00 06 C2 35 01 00 08 00 00 00 07 C2 35 01 10 04 00 00 55 01 8E 47 37 01 00 04 00 00 01 8F 47 37 01 00 04 00 00 01 90 47 37 01 00 04 00 00 01 91 47 37 01 00 04 00 00 01 92 47 37 01 00 04 00 00 01 93 47 37 01 00 04 00 00 01 94 47 37 01 00 04 00 00 01 95 47 37 01 00 04 00 00 01 96 47 37 01 00 04 00 00 01 97 47 37 01 00 04 00 00 01 98 47 37 01 00 04 00 00 01 99 47 37 01 00 04 00 00 01 9A 47 37 01 00 04 00 00 01 9B 47 37 01 00 04 00 00 01 9C 47 37 01 00 04 00 00 01 9D 47 37 01 00 04 00 00 01 9E 47 37 01 00 0C 00 00 01 02 9F 47 37 01 00 04 00 00 01 A0 47 37 01 00 04 00 00 01 A1 47 37 01 00 04 00 00 01 A4 47 37 01 00 04 00 00 01 A5 47 37 01 00 04 00 00 01 A6 47 37 01 00 04 00 00 01 A7 47 37 01 00 04 00 00 01 A8 47 37 01 00 04 00 00 01 A9 47 37 01 00 04 00 00 01 AB 47 37 01 00 04 00 00 01 AC 47 37 01 00 04 00 00 01 AD 47 37 01 00 04 00 00 01 AE 47 37 01 00 04 00 00 01 AF 47 37 01 00 04 00 00 01 B0 47 37 01 00 04 00 00 01 B1 47 37 01 00 04 00 00 01 B2 47 37 01 00 04 00 00 01 B4 47 37 01 00 04 00 00 01 B5 47 37 01 00 04 00 00 01 BA 47 37 01 00 04 00 00 01 BB 47 37 01 00 04 00 00 01 BC 47 37 01 00 04 00 00 01 BD 47 37 01 00 04 00 00 01 BE 47 37 01 00 04 00 00 01 BF 47 37 01 00 04 00 00 01 C0 47 37 01 00 04 00 00 01 C1 47 37 01 00 04 00 00 01 C2 47 37 01 00 04 00 00 01 C5 47 37 01 00 04 00 00 01 CA 47 37 01 00 04 00 00 01 CB 47 37 01 00 04 00 00 01 CC 47 37 01 00 04 00 00 01 CD 47 37 01 00 04 00 00 01 CE 47 37 01 00 04 00 00 01 D0 47 37 01 00 04 00 00 01 D1 47 37 01 00 04 00 00 01 D2 47 37 01 00 04 00 00 01 D3 47 37 01 00 04 00 00 01 D4 47 37 01 00 04 00 00 01 D7 47 37 01 00 04 00 00 01 D8 47 37 01 00 04 00 00 01 D9 47 37 01 00 04 00 00 01 DD 47 37 01 00 04 00 00 01 DE 47 37 01 00 04 00 00 01 DF 47 37 01 00 04 00 00 01 E7 47 37 01 00 04 00 00 01 E8 47 37 01 00 04 00 00 01 E9 47 37 01 00 04 00 00 01 EA 47 37 01 00 04 00 00 01 EB 47 37 01 00 04 00 00 01 EC 47 37 01 00 04 00 00 01 EF 47 37 01 00 04 00 00 01 F0 47 37 01 00 08 00 00 03 F1 47 37 01 00 04 00 00 01 F3 47 37 01 00 04 00 00 01 F4 47 37 01 00 04 00 00 01 F5 47 37 01 00 04 00 00 01 F6 47 37 01 00 04 00 00 01 F7 47 37 01 00 04 00 00 01 F8 47 37 01 00 04 00 00 01 F9 47 37 01 00 04 00 00 01 FA 47 37 01 00 04 00 00 01 FB 47 37 01 00 04 00 00 01 FC 47 37 01 00 04 00 00 01 FD 47 37 01 00 04 00 00 01 FE 47 37 01 00 04 00 00 01 FF 47 37 01 00 04 00 00 01 01 48 37 01 00 04 00 00 01 02 48 37 01 00 04 00 00 01 06 48 37 01 00 04 00 00 01 08 48 37 01 00 04 00 00 01 0B 48 37 01 10 00 00 00 02 0D 48 37 01 00 04 00 00 01 0F 48 37 01 00 04 00 00 01 10 48 37 01 00 04 00 00 01 11 48 37 01 00 04 00 00 01 12 48 37 01 00 04 00 00 01 13 48 37 01 00 04 00 00 01 14 48 37 01 00 04 00 00 01 15 48 37 01 00 04 00 00 01 17 48 37 01 00 04 00 00 01 18 48 37 01 00 04 00 00 01 19 48 37 01 00 04 00 00 01 1B 48 37 01 00 08 00 00 02 1F 48 37 01 00 04 00 00 01 20 48 37 01 00 04 00 00 01 21 48 37 01 00 04 00 00 01 22 48 37 01 00 04 00 00 01 23 48 37 01 00 04 00 00 01 24 48 37 01 00 04 00 00 01 25 48 37 01 00 04 00 00 01 26 48 37 01 00 04 00 00 01 27 48 37 01 00 04 00 00 01 28 48 37 01 00 04 00 00 01 29 48 37 01 00 04 00 00 01 2A 48 37 01 00 04 00 00 01 33 48 37 01 00 08 00 00 02 38 48 37 01 00 04 00 00 01 39 48 37 01 00 04 00 00 01 3A 48 37 01 00 04 00 00 01 3B 48 37 01 00 04 00 00 01 3C 48 37 01 00 04 00 00 01 3E 48 37 01 00 08 00 00 02 43 48 37 01 00 04 00 00 01 44 48 37 01 00 0C 00 00 01 02 4C 48 37 01 00 04 00 00 01 4D 48 37 01 00 04 00 00 01 4E 48 37 01 00 04 00 00 01 50 48 37 01 00 04 00 00 01 51 48 37 01 00 04 00 00 01 52 48 37 01 00 04 00 00 01 53 48 37 01 00 04 00 00 01 54 48 37 01 00 04 00 00 01 55 48 37 01 00 04 00 00 01 56 48 37 01 00 04 00 00 01 58 48 37 01 00 04 00 00 01 59 48 37 01 00 04 00 00 01 5A 48 37 01 00 0C 00 00 01 02 5B 48 37 01 00 0C 00 00 01 02 5D 48 37 01 00 04 00 00 01 5E 48 37 01 00 04 00 00 01 5F 48 37 01 00 04 00 00 01 60 48 37 01 00 04 00 00 01 62 48 37 01 00 0C 00 00 01 02 63 48 37 01 00 04 00 00 01 64 48 37 01 00 0C 00 00 01 02 66 48 37 01 00 0C 00 00 01 02 67 48 37 01 00 0C 00 00 01 02 68 48 37 01 00 0C 00 00 01 02 69 48 37 01 00 0C 00 00 01 02 6A 48 37 01 00 08 00 00 00 6B 48 37 01 00 0C 00 00 01 02 6C 48 37 01 00 0C 00 00 01 02 6E 48 37 01 00 0C 00 00 01 02 6F 48 37 01 00 0C 00 00 01 02 70 48 37 01 00 04 00 00 01 71 48 37 01 10 04 00 00 55 01 72 48 37 01 10 0C 00 00 5A 01 02 73 48 37 01 10 04 00 00 55 01 74 48 37 01 10 04 00 00 55 01 31 CE 38 01 00 04 00 00 01 32 CE 38 01 00 04 00 00 01 33 CE 38 01 00 04 00 00 01 34 CE 38 01 00 04 00 00 01 35 CE 38 01 00 04 00 00 01 36 CE 38 01 00 04 00 00 01 37 CE 38 01 00 04 00 00 01 38 CE 38 01 00 04 00 00 01 39 CE 38 01 00 04 00 00 01 3A CE 38 01 00 08 00 00 02 3B CE 38 01 00 04 00 00 01 3C CE 38 01 00 04 00 00 01 3D CE 38 01 00 04 00 00 01 3E CE 38 01 00 04 00 00 01 3F CE 38 01 00 04 00 00 01 40 CE 38 01 00 04 00 00 01 41 CE 38 01 00 0C 00 00 01 02 42 CE 38 01 00 04 00 00 01 43 CE 38 01 00 04 00 00 01 44 CE 38 01 00 04 00 00 01 45 CE 38 01 00 04 00 00 01 46 CE 38 01 00 04 00 00 01 47 CE 38 01 00 04 00 00 01 48 CE 38 01 00 04 00 00 01 49 CE 38 01 00 04 00 00 01 4A CE 38 01 00 04 00 00 01 4B CE 38 01 00 04 00 00 01 4C CE 38 01 00 04 00 00 01 4D CE 38 01 00 04 00 00 01 4E CE 38 01 00 04 00 00 01 4F CE 38 01 00 04 00 00 01 50 CE 38 01 00 04 00 00 01 51 CE 38 01 00 04 00 00 01 52 CE 38 01 00 04 00 00 01 53 CE 38 01 00 04 00 00 01 56 CE 38 01 00 04 00 00 01 58 CE 38 01 00 04 00 00 01 59 CE 38 01 00 04 00 00 01 5A CE 38 01 00 04 00 00 01 5B CE 38 01 00 04 00 00 01 5C CE 38 01 00 04 00 00 01 5D CE 38 01 00 04 00 00 01 5E CE 38 01 00 04 00 00 01 5F CE 38 01 00 04 00 00 01 60 CE 38 01 00 04 00 00 01 61 CE 38 01 00 04 00 00 01 62 CE 38 01 00 04 00 00 01 63 CE 38 01 00 04 00 00 01 64 CE 38 01 00 04 00 00 01 65 CE 38 01 00 04 00 00 01 67 CE 38 01 00 04 00 00 01 69 CE 38 01 00 04 00 00 01 6A CE 38 01 00 04 00 00 01 6B CE 38 01 00 04 00 00 01 6C CE 38 01 00 04 00 00 01 6D CE 38 01 00 04 00 00 01 6E CE 38 01 00 04 00 00 01 70 CE 38 01 00 04 00 00 01 71 CE 38 01 00 04 00 00 01 75 CE 38 01 00 04 00 00 01 76 CE 38 01 00 0C 00 00 01 02 77 CE 38 01 00 04 00 00 01 78 CE 38 01 00 04 00 00 01 79 CE 38 01 00 04 00 00 01 7A CE 38 01 00 04 00 00 01 7C CE 38 01 00 04 00 00 01 7D CE 38 01 00 04 00 00 01 7E CE 38 01 00 04 00 00 01 82 CE 38 01 00 08 00 00 03 83 CE 38 01 00 08 00 00 02 84 CE 38 01 10 04 00 00 01 01 85 CE 38 01 00 04 00 00 01 86 CE 38 01 00 04 00 00 01 87 CE 38 01 00 04 00 00 01 88 CE 38 01 00 04 00 00 01 89 CE 38 01 00 04 00 00 01 8A CE 38 01 00 04 00 00 01 8D CE 38 01 00 04 00 00 01 8E CE 38 01 00 04 00 00 01 8F CE 38 01 00 0C 00 00 01 02 90 CE 38 01 00 04 00 00 01 91 CE 38 01 00 08 00 00 02 92 CE 38 01 00 04 00 00 01 93 CE 38 01 00 04 00 00 01 94 CE 38 01 00 04 00 00 01 95 CE 38 01 00 04 00 00 01 96 CE 38 01 00 04 00 00 01 97 CE 38 01 00 04 00 00 01 98 CE 38 01 00 04 00 00 01 99 CE 38 01 00 04 00 00 01 A2 CE 38 01 00 04 00 00 01 A3 CE 38 01 00 04 00 00 01 A7 CE 38 01 00 04 00 00 01 A9 CE 38 01 00 04 00 00 01 AA CE 38 01 00 0C 00 00 01 02 AB CE 38 01 00 04 00 00 01 AC CE 38 01 00 04 00 00 01 AD CE 38 01 00 04 00 00 01 B2 CE 38 01 00 04 00 00 01 B3 CE 38 01 00 04 00 00 01 B4 CE 38 01 00 04 00 00 01 B5 CE 38 01 00 04 00 00 01 B8 CE 38 01 00 04 00 00 01 B9 CE 38 01 00 04 00 00 01 BA CE 38 01 00 04 00 00 01 BB CE 38 01 00 04 00 00 01 BC CE 38 01 00 04 00 00 01 BE CE 38 01 00 0C 00 00 01 02 BF CE 38 01 00 04 00 00 01 C0 CE 38 01 00 04 00 00 01 C1 CE 38 01 00 04 00 00 01 C2 CE 38 01 00 04 00 00 01 C3 CE 38 01 00 04 00 00 01 C4 CE 38 01 00 04 00 00 01 C5 CE 38 01 00 04 00 00 01 CB CE 38 01 00 04 00 00 01 CC CE 38 01 00 0C 00 00 01 02 CD CE 38 01 00 0C 00 00 01 02 CE CE 38 01 00 04 00 00 01 CF CE 38 01 00 04 00 00 01 D0 CE 38 01 10 0C 00 00 5A 01 02 C9 54 3A 01 00 04 00 00 01 CA 54 3A 01 00 04 00 00 01 CB 54 3A 01 00 04 00 00 01 CC 54 3A 01 00 04 00 00 01 CD 54 3A 01 00 04 00 00 01 D0 54 3A 01 00 04 00 00 01 D1 54 3A 01 00 04 00 00 01 D2 54 3A 01 00 04 00 00 01 D3 54 3A 01 00 04 00 00 01 D4 54 3A 01 00 04 00 00 01 D5 54 3A 01 00 04 00 00 01 D6 54 3A 01 10 00 00 00 05 D7 54 3A 01 10 00 00 00 05 D8 54 3A 01 00 04 00 00 01 D9 54 3A 01 00 04 00 00 01 DA 54 3A 01 00 04 00 00 01 DB 54 3A 01 00 04 00 00 01 DC 54 3A 01 00 04 00 00 01 DD 54 3A 01 00 04 00 00 01 DE 54 3A 01 00 0C 00 00 01 02 DF 54 3A 01 00 04 00 00 01 E0 54 3A 01 00 04 00 00 01 E1 54 3A 01 00 04 00 00 01 E2 54 3A 01 00 0C 00 00 01 02 E3 54 3A 01 00 04 00 00 01 E4 54 3A 01 00 04 00 00 01 E5 54 3A 01 00 04 00 00 01 E6 54 3A 01 00 04 00 00 01 E7 54 3A 01 00 04 00 00 01 E8 54 3A 01 00 04 00 00 01 E9 54 3A 01 00 04 00 00 01 EA 54 3A 01 00 04 00 00 01 EB 54 3A 01 00 04 00 00 01 FC 54 3A 01 00 04 00 00 01 FD 54 3A 01 00 04 00 00 01 FE 54 3A 01 00 04 00 00 01 FF 54 3A 01 00 04 00 00 01 00 55 3A 01 00 04 00 00 01 01 55 3A 01 00 04 00 00 01 02 55 3A 01 00 04 00 00 01 03 55 3A 01 00 04 00 00 01 05 55 3A 01 00 04 00 00 01 06 55 3A 01 00 04 00 00 01 07 55 3A 01 00 04 00 00 01 08 55 3A 01 00 04 00 00 01 09 55 3A 01 00 04 00 00 01 0A 55 3A 01 00 04 00 00 01 0B 55 3A 01 00 04 00 00 01 0F 55 3A 01 00 04 00 00 01 10 55 3A 01 00 04 00 00 01 11 55 3A 01 00 04 00 00 01 12 55 3A 01 00 04 00 00 01 13 55 3A 01 00 04 00 00 01 14 55 3A 01 00 04 00 00 01 15 55 3A 01 00 04 00 00 01 16 55 3A 01 00 04 00 00 01 17 55 3A 01 00 04 00 00 01 18 55 3A 01 00 04 00 00 01 19 55 3A 01 00 04 00 00 01 1A 55 3A 01 00 04 00 00 01 1B 55 3A 01 00 04 00 00 01 1C 55 3A 01 00 04 00 00 01 1D 55 3A 01 00 04 00 00 01 1E 55 3A 01 00 04 00 00 01 1F 55 3A 01 00 04 00 00 01 20 55 3A 01 00 04 00 00 01 21 55 3A 01 00 04 00 00 01 22 55 3A 01 00 04 00 00 01 23 55 3A 01 00 04 00 00 01 24 55 3A 01 00 04 00 00 01 25 55 3A 01 00 04 00 00 01 26 55 3A 01 00 04 00 00 01 27 55 3A 01 00 08 00 00 02 2B 55 3A 01 00 04 00 00 01 2F 55 3A 01 00 04 00 00 01 31 55 3A 01 00 08 00 00 03 32 55 3A 01 10 00 00 00 05 33 55 3A 01 00 04 00 00 01 38 55 3A 01 00 04 00 00 01 39 55 3A 01 00 0C 00 00 01 02 3A 55 3A 01 00 04 00 00 01 3B 55 3A 01 00 04 00 00 01 3C 55 3A 01 00 04 00 00 01 3D 55 3A 01 00 04 00 00 01 3E 55 3A 01 00 04 00 00 01 3F 55 3A 01 00 04 00 00 01 40 55 3A 01 00 04 00 00 01 41 55 3A 01 00 04 00 00 01 42 55 3A 01 00 04 00 00 01 45 55 3A 01 00 04 00 00 01 46 55 3A 01 00 04 00 00 01 47 55 3A 01 00 04 00 00 01 4C 55 3A 01 00 04 00 00 01 51 55 3A 01 00 04 00 00 01 53 55 3A 01 00 04 00 00 01 59 55 3A 01 00 04 00 00 01 5A 55 3A 01 00 04 00 00 01 5B 55 3A 01 00 0C 00 00 01 02 5D 55 3A 01 00 0C 00 00 01 02 60 55 3A 01 00 0C 00 00 01 02 61 55 3A 01 00 0C 00 00 01 02 65 55 3A 01 00 0C 00 00 01 02 66 55 3A 01 00 0C 00 00 01 02 68 55 3A 01 10 0C 00 00 5A 01 02 6E 55 3A 01 00 0C 00 00 01 00 61 DB 3B 01 00 04 00 00 01 62 DB 3B 01 00 04 00 00 01 63 DB 3B 01 00 04 00 00 01 64 DB 3B 01 10 00 00 00 05 65 DB 3B 01 00 0C 00 00 01 02 66 DB 3B 01 00 04 00 00 01 69 DB 3B 01 00 04 00 00 01 6A DB 3B 01 00 04 00 00 01 6C DB 3B 01 00 04 00 00 01 6D DB 3B 01 00 04 00 00 01 6E DB 3B 01 00 08 00 00 03 6F DB 3B 01 00 04 00 00 01 70 DB 3B 01 00 04 00 00 01 71 DB 3B 01 00 04 00 00 01 72 DB 3B 01 00 04 00 00 01 73 DB 3B 01 00 04 00 00 01 74 DB 3B 01 00 0C 00 00 01 02 75 DB 3B 01 00 04 00 00 01 76 DB 3B 01 00 0C 00 00 01 02 77 DB 3B 01 00 0C 00 00 01 02 78 DB 3B 01 00 04 00 00 01 79 DB 3B 01 00 04 00 00 01 7F DB 3B 01 00 0C 00 00 01 02 80 DB 3B 01 00 04 00 00 01 81 DB 3B 01 00 04 00 00 01 85 DB 3B 01 00 0C 00 00 01 02 86 DB 3B 01 00 0C 00 00 01 02 8A DB 3B 01 00 04 00 00 01 08 62 3D 01 00 04 00 00 01 09 62 3D 01 00 04 00 00 01 0A 62 3D 01 00 04 00 00 01 0B 62 3D 01 00 04 00 00 01 0C 62 3D 01 00 04 00 00 01 0D 62 3D 01 10 00 00 00 05 0E 62 3D 01 10 00 00 00 05 0F 62 3D 01 10 00 00 00 05 10 62 3D 01 00 04 00 00 01 11 62 3D 01 00 04 00 00 01 12 62 3D 01 00 04 00 00 01 13 62 3D 01 00 04 00 00 01 14 62 3D 01 00 04 00 00 01 15 62 3D 01 00 04 00 00 01 16 62 3D 01 00 04 00 00 01 17 62 3D 01 00 04 00 00 01 18 62 3D 01 00 04 00 00 01 19 62 3D 01 00 04 00 00 01 1A 62 3D 01 00 04 00 00 01 1B 62 3D 01 00 04 00 00 01 1C 62 3D 01 00 04 00 00 01 1D 62 3D 01 00 04 00 00 01 1E 62 3D 01 00 04 00 00 01 1F 62 3D 01 00 04 00 00 01 20 62 3D 01 00 04 00 00 01 21 62 3D 01 00 04 00 00 01 22 62 3D 01 00 04 00 00 01 23 62 3D 01 00 04 00 00 01 24 62 3D 01 00 04 00 00 01 25 62 3D 01 00 04 00 00 01 26 62 3D 01 00 04 00 00 01 27 62 3D 01 00 04 00 00 01 28 62 3D 01 00 04 00 00 01 29 62 3D 01 00 04 00 00 01 2A 62 3D 01 00 04 00 00 01 2B 62 3D 01 00 04 00 00 01 2D 62 3D 01 00 04 00 00 01 2E 62 3D 01 00 04 00 00 01 2F 62 3D 01 00 04 00 00 01 30 62 3D 01 00 04 00 00 01 31 62 3D 01 00 0C 00 00 01 02 32 62 3D 01 00 04 00 00 01 33 62 3D 01 00 04 00 00 01 34 62 3D 01 00 04 00 00 01 36 62 3D 01 00 04 00 00 01 37 62 3D 01 00 04 00 00 01 38 62 3D 01 00 04 00 00 01 39 62 3D 01 00 04 00 00 01 3A 62 3D 01 00 04 00 00 01 3B 62 3D 01 00 04 00 00 01 3C 62 3D 01 00 04 00 00 01 3D 62 3D 01 00 04 00 00 01 3E 62 3D 01 00 04 00 00 01 3F 62 3D 01 00 04 00 00 01 40 62 3D 01 00 04 00 00 01 41 62 3D 01 00 04 00 00 01 42 62 3D 01 00 04 00 00 01 43 62 3D 01 00 04 00 00 01 44 62 3D 01 00 04 00 00 01 45 62 3D 01 00 04 00 00 01 46 62 3D 01 00 04 00 00 01 47 62 3D 01 00 04 00 00 01 48 62 3D 01 00 04 00 00 01 49 62 3D 01 00 04 00 00 01 4A 62 3D 01 00 04 00 00 01 4B 62 3D 01 00 04 00 00 01 4C 62 3D 01 00 04 00 00 01 4D 62 3D 01 00 04 00 00 01 4E 62 3D 01 00 04 00 00 01 4F 62 3D 01 00 04 00 00 01 51 62 3D 01 00 0C 00 00 01 02 52 62 3D 01 00 04 00 00 01 53 62 3D 01 00 0C 00 00 01 02 54 62 3D 01 00 04 00 00 01 56 62 3D 01 00 0C 00 00 01 02 57 62 3D 01 00 04 00 00 01 58 62 3D 01 00 04 00 00 01 59 62 3D 01 00 04 00 00 01 5A 62 3D 01 00 04 00 00 01 5B 62 3D 01 00 04 00 00 01 5C 62 3D 01 00 04 00 00 01 5D 62 3D 01 00 04 00 00 01 5E 62 3D 01 00 04 00 00 01 5F 62 3D 01 00 04 00 00 01 60 62 3D 01 00 04 00 00 01 62 62 3D 01 00 04 00 00 01 63 62 3D 01 00 04 00 00 01 64 62 3D 01 00 04 00 00 01 65 62 3D 01 00 04 00 00 01 66 62 3D 01 00 04 00 00 01 67 62 3D 01 00 0C 00 00 01 02 6E 62 3D 01 00 04 00 00 01 6F 62 3D 01 00 04 00 00 01 70 62 3D 01 00 04 00 00 01 71 62 3D 01 00 0C 00 00 01 02 72 62 3D 01 00 04 00 00 01 73 62 3D 01 00 04 00 00 01 74 62 3D 01 00 04 00 00 01 77 62 3D 01 00 04 00 00 01 78 62 3D 01 00 04 00 00 01 79 62 3D 01 00 04 00 00 01 7A 62 3D 01 00 04 00 00 01 7B 62 3D 01 00 04 00 00 01 7C 62 3D 01 10 00 00 00 05 7D 62 3D 01 00 04 00 00 01 7E 62 3D 01 10 04 00 00 04 01 7F 62 3D 01 00 0C 00 00 01 02 84 62 3D 01 00 0C 00 00 01 02 85 62 3D 01 00 04 00 00 01 86 62 3D 01 00 0C 00 00 01 02 88 62 3D 01 00 04 00 00 01 89 62 3D 01 00 04 00 00 01 8A 62 3D 01 00 04 00 00 01 8B 62 3D 01 00 0C 00 00 01 02 8C 62 3D 01 00 0C 00 00 01 02 8D 62 3D 01 00 04 00 00 01 8E 62 3D 01 00 04 00 00 01 8F 62 3D 01 00 04 00 00 01 90 62 3D 01 00 04 00 00 01 91 62 3D 01 00 04 00 00 01 94 62 3D 01 00 0C 00 00 01 02 95 62 3D 01 00 04 00 00 01 96 62 3D 01 00 04 00 00 01 97 62 3D 01 00 0C 00 00 01 02 98 62 3D 01 00 0C 00 00 01 02 99 62 3D 01 00 0C 00 00 01 02 9A 62 3D 01 00 0C 00 00 01 02 9B 62 3D 01 00 04 00 00 01 9C 62 3D 01 00 04 00 00 01 9D 62 3D 01 00 04 00 00 01 A2 62 3D 01 00 04 00 00 01 A3 62 3D 01 00 04 00 00 01 A4 62 3D 01 00 04 00 00 01 A5 62 3D 01 00 04 00 00 01 A6 62 3D 01 00 0C 00 00 01 02 A7 62 3D 01 10 00 00 00 05 A8 62 3D 01 10 00 00 00 05 A9 62 3D 01 10 00 00 00 05 AA 62 3D 01 10 00 00 00 05 AB 62 3D 01 00 0C 00 00 01 02 AC 62 3D 01 10 00 00 00 05 AD 62 3D 01 00 0C 00 00 01 02 AE 62 3D 01 00 04 00 00 01 B0 62 3D 01 00 0C 00 00 01 02 B1 62 3D 01 00 0C 00 00 01 02 B2 62 3D 01 00 04 00 00 01 B3 62 3D 01 00 04 00 00 01 B4 62 3D 01 00 04 00 00 01 B8 62 3D 01 00 0C 00 00 01 02 B9 62 3D 01 00 0C 00 00 01 02 BA 62 3D 01 00 04 00 00 01 BB 62 3D 01 00 0C 00 00 01 02 BC 62 3D 01 00 04 00 00 01 BD 62 3D 01 00 04 00 00 01 BE 62 3D 01 00 0C 00 00 01 02 BF 62 3D 01 00 0C 00 00 01 02 C0 62 3D 01 00 04 00 00 01 C1 62 3D 01 00 0C 00 00 01 02 C2 62 3D 01 00 04 00 00 01 C3 62 3D 01 00 0C 00 00 01 02 C5 62 3D 01 00 0C 00 00 01 02 C6 62 3D 01 00 08 00 00 00 C7 62 3D 01 10 0C 00 00 5A 01 02 C9 62 3D 01 00 08 00 00 00 CA 62 3D 01 10 0C 00 00 5A 01 02 CB 62 3D 01 00 08 00 00 00 CC 62 3D 01 10 0C 00 00 5A 01 02 CD 62 3D 01 00 08 00 00 00 CE 62 3D 01 00 0C 00 00 01 02 D2 62 3D 01 10 0C 00 00 5A 01 02 D3 62 3D 01 00 0C 00 00 01 00 A8 E8 3E 01 00 04 00 00 01 A9 E8 3E 01 00 04 00 00 01 AA E8 3E 01 00 04 00 00 01 AB E8 3E 01 00 04 00 00 01 AC E8 3E 01 00 04 00 00 01 AD E8 3E 01 00 04 00 00 01 AE E8 3E 01 00 04 00 00 01 AF E8 3E 01 00 04 00 00 01 B0 E8 3E 01 00 04 00 00 01 B1 E8 3E 01 00 04 00 00 01 B2 E8 3E 01 00 04 00 00 01 B3 E8 3E 01 00 04 00 00 01 B4 E8 3E 01 00 04 00 00 01 B5 E8 3E 01 00 04 00 00 01 B6 E8 3E 01 00 04 00 00 01 B7 E8 3E 01 00 04 00 00 01 B8 E8 3E 01 00 04 00 00 01 B9 E8 3E 01 00 04 00 00 01 BA E8 3E 01 00 0C 00 00 01 02 BB E8 3E 01 00 04 00 00 01 BC E8 3E 01 00 04 00 00 01 BD E8 3E 01 00 04 00 00 01 BE E8 3E 01 00 04 00 00 01 BF E8 3E 01 00 04 00 00 01 C0 E8 3E 01 00 0C 00 00 01 02 C1 E8 3E 01 00 04 00 00 01 C2 E8 3E 01 00 04 00 00 01 C3 E8 3E 01 00 04 00 00 01 C4 E8 3E 01 00 04 00 00 01 C5 E8 3E 01 00 04 00 00 01 C6 E8 3E 01 00 04 00 00 01 C7 E8 3E 01 00 04 00 00 01 C8 E8 3E 01 00 04 00 00 01 CA E8 3E 01 00 04 00 00 01 CB E8 3E 01 00 04 00 00 01 CC E8 3E 01 00 04 00 00 01 CD E8 3E 01 10 04 00 00 01 01 CE E8 3E 01 00 0C 00 00 01 02 D2 E8 3E 01 00 04 00 00 01 D5 E8 3E 01 00 04 00 00 01 D6 E8 3E 01 00 04 00 00 01 D7 E8 3E 01 00 04 00 00 01 D8 E8 3E 01 00 04 00 00 01 D9 E8 3E 01 00 04 00 00 01 DA E8 3E 01 00 04 00 00 01 DB E8 3E 01 00 04 00 00 01 DC E8 3E 01 00 04 00 00 01 DD E8 3E 01 00 0C 00 00 01 02 DE E8 3E 01 00 0C 00 00 01 02 DF E8 3E 01 00 0C 00 00 01 02 E0 E8 3E 01 00 04 00 00 01 E1 E8 3E 01 00 04 00 00 01 E4 E8 3E 01 00 04 00 00 01 E5 E8 3E 01 00 04 00 00 01 E8 E8 3E 01 00 08 00 00 03 E9 E8 3E 01 00 0C 00 00 01 02 EA E8 3E 01 00 0C 00 00 01 02 EB E8 3E 01 00 0C 00 00 01 02 EC E8 3E 01 00 0C 00 00 01 02 EF E8 3E 01 00 08 00 00 00 F1 E8 3E 01 10 04 00 00 61 01 51 6F 40 01 00 04 00 00 01 52 6F 40 01 00 04 00 00 01 53 6F 40 01 00 04 00 00 01 54 6F 40 01 00 04 00 00 01 55 6F 40 01 00 04 00 00 01 56 6F 40 01 00 04 00 00 01 57 6F 40 01 00 04 00 00 01 58 6F 40 01 00 04 00 00 01 59 6F 40 01 00 04 00 00 01 5A 6F 40 01 00 04 00 00 01 5B 6F 40 01 00 04 00 00 01 5C 6F 40 01 00 0C 00 00 01 02 5D 6F 40 01 00 04 00 00 01 5E 6F 40 01 00 0C 00 00 01 02 5F 6F 40 01 00 04 00 00 01 60 6F 40 01 00 04 00 00 01 61 6F 40 01 00 0C 00 00 01 02 62 6F 40 01 00 0C 00 00 01 02 63 6F 40 01 00 08 00 00 00 E0 F5 41 01 00 04 00 00 01 E1 F5 41 01 00 04 00 00 01 E2 F5 41 01 00 04 00 00 01 E3 F5 41 01 00 04 00 00 01 E4 F5 41 01 00 04 00 00 01 E5 F5 41 01 00 04 00 00 01 E6 F5 41 01 00 04 00 00 01 E7 F5 41 01 00 04 00 00 01 E8 F5 41 01 00 04 00 00 01 E9 F5 41 01 00 04 00 00 01 EA F5 41 01 00 04 00 00 01 EB F5 41 01 00 04 00 00 01 EC F5 41 01 00 0C 00 00 01 02 ED F5 41 01 00 04 00 00 01 EE F5 41 01 00 04 00 00 01 F1 F5 41 01 00 04 00 00 01 F2 F5 41 01 00 04 00 00 01 F3 F5 41 01 00 04 00 00 01 F4 F5 41 01 00 04 00 00 01 F6 F5 41 01 00 04 00 00 01 F7 F5 41 01 00 04 00 00 01 F8 F5 41 01 00 04 00 00 01 F9 F5 41 01 00 04 00 00 01 FA F5 41 01 10 00 00 00 05 FC F5 41 01 00 04 00 00 01 FE F5 41 01 00 04 00 00 01 FF F5 41 01 00 04 00 00 01 00 F6 41 01 00 04 00 00 01 01 F6 41 01 00 04 00 00 01 02 F6 41 01 00 04 00 00 01 03 F6 41 01 00 04 00 00 01 04 F6 41 01 00 04 00 00 01 08 F6 41 01 00 04 00 00 01 09 F6 41 01 00 04 00 00 01 0D F6 41 01 00 04 00 00 01 0E F6 41 01 00 04 00 00 01 0F F6 41 01 00 04 00 00 01 12 F6 41 01 00 04 00 00 01 13 F6 41 01 00 04 00 00 01 14 F6 41 01 00 04 00 00 01 19 F6 41 01 00 04 00 00 01 1A F6 41 01 00 04 00 00 01 1C F6 41 01 00 04 00 00 01 1D F6 41 01 00 04 00 00 01 1E F6 41 01 00 04 00 00 01 1F F6 41 01 00 04 00 00 01 20 F6 41 01 00 04 00 00 01 21 F6 41 01 00 04 00 00 01 22 F6 41 01 00 0C 00 00 01 02 23 F6 41 01 00 04 00 00 01 24 F6 41 01 00 04 00 00 01 25 F6 41 01 00 04 00 00 01 29 F6 41 01 00 04 00 00 01 2C F6 41 01 00 0C 00 00 01 02 2E F6 41 01 00 04 00 00 01 2F F6 41 01 00 0C 00 00 01 02 30 F6 41 01 00 0C 00 00 01 02 33 F6 41 01 00 04 00 00 01 34 F6 41 01 00 04 00 00 01 36 F6 41 01 00 04 00 00 01 37 F6 41 01 00 04 00 00 01 38 F6 41 01 00 0C 00 00 01 02 39 F6 41 01 00 04 00 00 01 3C F6 41 01 00 0C 00 00 01 02 3E F6 41 01 00 08 00 00 00 42 F6 41 01 00 04 00 00 01 43 F6 41 01 00 08 00 00 00 44 F6 41 01 00 08 00 00 00 45 F6 41 01 00 0C 00 00 01 02 48 F6 41 01 10 0C 00 00 5A 01 02 80 7C 43 01 00 04 00 00 01 81 7C 43 01 00 04 00 00 01 86 7C 43 01 00 04 00 00 01 89 7C 43 01 00 08 00 00 02 8C 7C 43 01 00 04 00 00 01 8F 7C 43 01 00 0C 00 00 01 02 97 7C 43 01 10 04 00 00 61 01 9A 7C 43 01 10 04 00 00 61 01 80 C3 C9 01 00 04 00 00 01 81 C3 C9 01 00 04 00 00 01 82 C3 C9 01 00 04 00 00 01 83 C3 C9 01 00 04 00 00 01 84 C3 C9 01 00 04 00 00 01 85 C3 C9 01 00 04 00 00 01 86 C3 C9 01 00 04 00 00 01 87 C3 C9 01 00 04 00 00 01 88 C3 C9 01 00 04 00 00 01 89 C3 C9 01 00 04 00 00 01 8A C3 C9 01 00 04 00 00 01 8B C3 C9 01 00 04 00 00 01 8C C3 C9 01 00 04 00 00 01 8D C3 C9 01 00 04 00 00 01 8E C3 C9 01 00 04 00 00 01 8F C3 C9 01 00 04 00 00 01 90 C3 C9 01 00 04 00 00 01 91 C3 C9 01 00 04 00 00 01 92 C3 C9 01 00 04 00 00 01 93 C3 C9 01 00 04 00 00 01 96 C3 C9 01 10 00 00 00 05 97 C3 C9 01 10 00 00 00 05 9A C3 C9 01 00 04 00 00 01 9B C3 C9 01 00 04 00 00 01 9C C3 C9 01 00 04 00 00 01 9D C3 C9 01 02 04 00 00 0B 00 01 9E C3 C9 01 00 04 00 00 01 9F C3 C9 01 02 04 00 00 0B 00 01 A0 C3 C9 01 00 04 00 00 01 A1 C3 C9 01 02 04 00 00 0B 00 01 A8 C3 C9 01 00 0C 00 00 01 02 A9 C3 C9 01 00 04 00 00 01 AA C3 C9 01 00 0C 00 00 01 02 AB C3 C9 01 00 04 00 00 01 AE C3 C9 01 00 04 00 00 01 AF C3 C9 01 00 04 00 00 01 B1 C3 C9 01 00 08 00 00 03 B2 C3 C9 01 00 08 00 00 03 B3 C3 C9 01 00 08 00 00 03 B4 C3 C9 01 00 08 00 00 03 B5 C3 C9 01 00 08 00 00 03 B6 C3 C9 01 00 08 00 00 03 B7 C3 C9 01 00 08 00 00 03 B8 C3 C9 01 00 08 00 00 03 B9 C3 C9 01 00 08 00 00 03 BA C3 C9 01 00 08 00 00 03 BB C3 C9 01 00 08 00 00 03 BC C3 C9 01 00 08 00 00 03 BD C3 C9 01 00 08 00 00 03 BE C3 C9 01 00 08 00 00 03 BF C3 C9 01 00 08 00 00"));
            mplew.write(HexTool.getByteArrayFromHexString("03 C0 C3 C9 01 00 08 00 00 03 C1 C3 C9 01 00 08 00 00 03 C2 C3 C9 01 00 08 00 00 03 C3 C3 C9 01 00 08 00 00 03 C4 C3 C9 01 00 08 00 00 03 C5 C3 C9 01 00 08 00 00 03 C6 C3 C9 01 00 08 00 00 03 C7 C3 C9 01 00 08 00 00 03 C8 C3 C9 01 00 08 00 00 03 C9 C3 C9 01 00 08 00 00 03 CA C3 C9 01 00 08 00 00 03 CB C3 C9 01 00 08 00 00 03 CC C3 C9 01 00 08 00 00 03 CD C3 C9 01 00 08 00 00 03 CE C3 C9 01 00 08 00 00 03 CF C3 C9 01 00 08 00 00 03 D0 C3 C9 01 00 08 00 00 03 D1 C3 C9 01 00 08 00 00 03 D2 C3 C9 01 00 08 00 00 03 D3 C3 C9 01 00 08 00 00 03 D4 C3 C9 01 00 08 00 00 03 D5 C3 C9 01 00 08 00 00 03 D6 C3 C9 01 00 08 00 00 03 20 4A CB 01 00 04 00 00 01 21 4A CB 01 00 04 00 00 01 22 4A CB 01 00 04 00 00 01 23 4A CB 01 00 04 00 00 01 24 4A CB 01 00 04 00 00 01 25 4A CB 01 00 04 00 00 01 26 4A CB 01 00 04 00 00 01 27 4A CB 01 00 04 00 00 01 28 4A CB 01 00 04 00 00 01 29 4A CB 01 00 04 00 00 01 2C 4A CB 01 00 04 00 00 01 2D 4A CB 01 00 04 00 00 01 2E 4A CB 01 00 0C 00 00 01 02 2F 4A CB 01 00 0C 00 00 01 02 36 4A CB 01 00 04 00 00 01 37 4A CB 01 00 04 00 00 01 38 4A CB 01 00 04 00 00 01 39 4A CB 01 00 04 00 00 01 3A 4A CB 01 00 04 00 00 01 3B 4A CB 01 00 04 00 00 01 4A 4A CB 01 00 04 00 00 01 4B 4A CB 01 00 04 00 00 01 4C 4A CB 01 00 04 00 00 01 4D 4A CB 01 00 04 00 00 01 4E 4A CB 01 00 04 00 00 01 4F 4A CB 01 00 04 00 00 01 50 4A CB 01 00 04 00 00 01 51 4A CB 01 00 04 00 00 01 52 4A CB 01 00 04 00 00 01 53 4A CB 01 00 04 00 00 01 54 4A CB 01 00 04 00 00 01 55 4A CB 01 00 04 00 00 01 56 4A CB 01 00 04 00 00 01 57 4A CB 01 00 04 00 00 01 58 4A CB 01 00 04 00 00 01 59 4A CB 01 00 04 00 00 01 5A 4A CB 01 00 04 00 00 01 5B 4A CB 01 00 04 00 00 01 5C 4A CB 01 00 04 00 00 01 5D 4A CB 01 00 04 00 00 01 5E 4A CB 01 00 04 00 00 01 5F 4A CB 01 00 04 00 00 01 60 4A CB 01 00 04 00 00 01 67 4A CB 01 00 04 00 00 01 68 4A CB 01 00 04 00 00 01 69 4A CB 01 00 04 00 00 01 6A 4A CB 01 00 08 00 00 03 6B 4A CB 01 00 08 00 00 03 6C 4A CB 01 00 08 00 00 03 6D 4A CB 01 00 08 00 00 03 6E 4A CB 01 00 08 00 00 03 6F 4A CB 01 00 08 00 00 03 75 4A CB 01 00 0C 00 00 01 02 76 4A CB 01 00 08 00 00 03 77 4A CB 01 00 08 00 00 03 78 4A CB 01 00 08 00 00 03 7A 4A CB 01 10 0C 00 00 5A 01 02 7B 4A CB 01 10 0C 00 00 5A 01 02 C0 D0 CC 01 00 04 00 00 01 C1 D0 CC 01 00 0C 00 00 01 02 C2 D0 CC 01 00 04 00 00 01 C3 D0 CC 01 00 04 00 00 01 C4 D0 CC 01 00 04 00 00 01 C5 D0 CC 01 00 04 00 00 01 C6 D0 CC 01 00 04 00 00 01 C7 D0 CC 01 00 04 00 00 01 C8 D0 CC 01 00 04 00 00 01 CA D0 CC 01 00 04 00 00 01 CB D0 CC 01 00 04 00 00 01 CC D0 CC 01 00 04 00 00 01 D0 D0 CC 01 00 0C 00 00 01 02 D1 D0 CC 01 00 04 00 00 01 D2 D0 CC 01 00 04 00 00 01 D4 D0 CC 01 00 0C 00 00 01 02 D7 D0 CC 01 00 04 00 00 01 D8 D0 CC 01 00 04 00 00 01 D9 D0 CC 01 00 04 00 00 01 DB D0 CC 01 00 04 00 00 01 DC D0 CC 01 00 04 00 00 01 DD D0 CC 01 00 0C 00 00 01 02 DE D0 CC 01 00 04 00 00 01 E0 D0 CC 01 00 08 00 00 03 E2 D0 CC 01 00 08 00 00 03 E3 D0 CC 01 00 08 00 00 03 80 F0 FA 02 00 04 00 00 01 81 F0 FA 02 00 04 00 00 01 82 F0 FA 02 00 04 00 00 01 83 F0 FA 02 00 04 00 00 01 84 F0 FA 02 00 04 00 00 01 85 F0 FA 02 00 04 00 00 01 86 F0 FA 02 00 04 00 00 01 87 F0 FA 02 00 04 00 00 01 88 F0 FA 02 00 04 00 00 01 89 F0 FA 02 00 04 00 00 01 8A F0 FA 02 00 04 00 00 01 8B F0 FA 02 00 04 00 00 01 8C F0 FA 02 00 04 00 00 01 8D F0 FA 02 00 04 00 00 01 8E F0 FA 02 00 04 00 00 01 8F F0 FA 02 00 04 00 00 01 90 F0 FA 02 00 04 00 00 01 91 F0 FA 02 00 04 00 00 01 92 F0 FA 02 00 04 00 00 01 93 F0 FA 02 00 04 00 00 01 94 F0 FA 02 00 04 00 00 01 95 F0 FA 02 00 04 00 00 01 96 F0 FA 02 00 04 00 00 01 97 F0 FA 02 00 04 00 00 01 98 F0 FA 02 00 04 00 00 01 99 F0 FA 02 00 04 00 00 01 9A F0 FA 02 00 04 00 00 01 9B F0 FA 02 00 04 00 00 01 9C F0 FA 02 00 04 00 00 01 9D F0 FA 02 00 04 00 00 01 9E F0 FA 02 00 04 00 00 01 9F F0 FA 02 00 04 00 00 01 A0 F0 FA 02 00 04 00 00 01 A1 F0 FA 02 00 04 00 00 01 A2 F0 FA 02 00 04 00 00 01 A3 F0 FA 02 00 04 00 00 01 A4 F0 FA 02 00 04 00 00 01 A5 F0 FA 02 00 04 00 00 01 A6 F0 FA 02 00 04 00 00 01 A7 F0 FA 02 00 04 00 00 01 A9 F0 FA 02 00 04 00 00 01 AA F0 FA 02 00 04 00 00 01 AB F0 FA 02 00 04 00 00 01 AC F0 FA 02 00 04 00 00 01 AD F0 FA 02 00 04 00 00 01 AE F0 FA 02 00 04 00 00 01 AF F0 FA 02 00 04 00 00 01 B0 F0 FA 02 00 04 00 00 01 B1 F0 FA 02 00 04 00 00 01 B2 F0 FA 02 00 04 00 00 01 B3 F0 FA 02 00 04 00 00 01 B5 F0 FA 02 00 04 00 00 01 B6 F0 FA 02 00 04 00 00 01 B7 F0 FA 02 00 04 00 00 01 B8 F0 FA 02 00 04 00 00 01 B9 F0 FA 02 00 04 00 00 01 BA F0 FA 02 00 04 00 00 01 BB F0 FA 02 00 04 00 00 01 BC F0 FA 02 00 04 00 00 01 BD F0 FA 02 00 04 00 00 01 BE F0 FA 02 00 04 00 00 01 BF F0 FA 02 00 04 00 00 01 C0 F0 FA 02 00 04 00 00 01 C1 F0 FA 02 00 04 00 00 01 C2 F0 FA 02 00 04 00 00 01 C3 F0 FA 02 00 04 00 00 01 C4 F0 FA 02 00 04 00 00 01 C5 F0 FA 02 00 04 00 00 01 C6 F0 FA 02 00 04 00 00 01 D0 F0 FA 02 10 0C 00 00 60 01 02 D1 F0 FA 02 00 04 00 00 01 D2 F0 FA 02 00 04 00 00 01 D3 F0 FA 02 00 04 00 00 01 D4 F0 FA 02 00 04 00 00 01 D5 F0 FA 02 00 04 00 00 01 D6 F0 FA 02 00 04 00 00 01 D7 F0 FA 02 00 04 00 00 01 27 77 FC 02 00 04 00 00 01 28 77 FC 02 00 04 00 00 01 29 77 FC 02 00 04 00 00 01 2A 77 FC 02 00 04 00 00 01 2B 77 FC 02 00 04 00 00 01 2C 77 FC 02 00 04 00 00 01 2D 77 FC 02 00 04 00 00 01 2E 77 FC 02 00 04 00 00 01 2F 77 FC 02 00 04 00 00 01 30 77 FC 02 00 04 00 00 01 31 77 FC 02 00 04 00 00 01 32 77 FC 02 00 04 00 00 01 33 77 FC 02 00 04 00 00 01 3F 77 FC 02 00 04 00 00 01 40 77 FC 02 00 0C 00 00 01 02 C2 FD FD 02 00 04 00 00 01 C3 FD FD 02 00 04 00 00 01 C4 FD FD 02 00 04 00 00 01 C5 FD FD 02 00 04 00 00 01 C6 FD FD 02 00 04 00 00 01 C7 FD FD 02 00 04 00 00 01 C8 FD FD 02 00 04 00 00 01 C9 FD FD 02 00 04 00 00 01 CA FD FD 02 00 04 00 00 01 CB FD FD 02 00 04 00 00 01 CC FD FD 02 00 04 00 00 01 CD FD FD 02 00 04 00 00 01 CE FD FD 02 00 04 00 00 01 CF FD FD 02 00 04 00 00 01 D1 FD FD 02 00 04 00 00 01 D2 FD FD 02 00 04 00 00 01 D3 FD FD 02 00 04 00 00 01 D4 FD FD 02 00 04 00 00 01 D5 FD FD 02 00 04 00 00 01 DA FD FD 02 00 04 00 00 01 DB FD FD 02 00 04 00 00 01 DC FD FD 02 00 04 00 00 01 DD FD FD 02 00 04 00 00 01 DE FD FD 02 00 04 00 00 01 DF FD FD 02 00 04 00 00 01 E0 FD FD 02 00 04 00 00 01 E1 FD FD 02 00 04 00 00 01 E2 FD FD 02 00 04 00 00 01 E3 FD FD 02 00 04 00 00 01 E4 FD FD 02 00 04 00 00 01 E5 FD FD 02 00 04 00 00 01 E7 FD FD 02 00 04 00 00 01 E8 FD FD 02 00 04 00 00 01 E9 FD FD 02 00 04 00 00 01 EA FD FD 02 00 04 00 00 01 EB FD FD 02 00 04 00 00 01 F0 FD FD 02 02 00 00 00 01 00 60 84 FF 02 00 0C 00 00 01 02 01 0B 01 03 00 04 00 00 01 02 0B 01 03 00 04 00 00 01 0B 0B 01 03 00 04 00 00 01 0C 0B 01 03 00 04 00 00 01 0D 0B 01 03 00 04 00 00 01 0E 0B 01 03 00 04 00 00 01 0F 0B 01 03 00 0C 00 00 01 02 10 0B 01 03 10 04 00 00 60 01 11 0B 01 03 00 04 00 00 01 12 0B 01 03 00 04 00 00 01 13 0B 01 03 00 04 00 00 01 14 0B 01 03 00 08 00 00 02 15 0B 01 03 00 08 00 00 02 17 0B 01 03 28 00 00 00 01 25 00 1D 0B 01 03 00 04 00 00 01 1E 0B 01 03 00 04 00 00 01 1F 0B 01 03 00 04 00 00 01 20 0B 01 03 00 04 00 00 01 21 0B 01 03 00 04 00 00 01 22 0B 01 03 00 04 00 00 01 23 0B 01 03 00 04 00 00 01 24 0B 01 03 00 04 00 00 01 25 0B 01 03 00 04 00 00 01 26 0B 01 03 00 04 00 00 01 27 0B 01 03 00 04 00 00 01 28 0B 01 03 00 04 00 00 01 29 0B 01 03 00 0C 00 00 01 02 2E 0B 01 03 00 04 00 00 01 2F 0B 01 03 00 04 00 00 01 30 0B 01 03 00 04 00 00 01 37 0B 01 03 00 0C 00 00 01 02 3C 0B 01 03 00 0C 00 00 01 02 3D 0B 01 03 10 0C 00 00 60 01 02 3E 0B 01 03 10 04 00 00 60 01 3F 0B 01 03 10 0C 00 00 60 01 02 40 0B 01 03 10 04 00 00 60 01 41 0B 01 03 00 04 00 00 01 42 0B 01 03 00 04 00 00 01 44 0B 01 03 00 04 00 00 01 45 0B 01 03 00 04 00 00 01 46 0B 01 03 00 04 00 00 01 47 0B 01 03 00 04 00 00 01 48 0B 01 03 00 04 00 00 01 49 0B 01 03 00 0C 00 00 01 02 4A 0B 01 03 08 00 00 00 01 4B 0B 01 03 08 00 00 00 01 4C 0B 01 03 08 00 00 00 01 4D 0B 01 03 08 00 00 00 01 56 0B 01 03 08 00 00 00 01 57 0B 01 03 08 00 00 00 01 58 0B 01 03 08 00 00 00 01 59 0B 01 03 08 00 00 00 01 61 0B 01 03 00 08 00 00 00 62 0B 01 03 00 08 00 00 00 63 0B 01 03 00 08 00 00 00 64 0B 01 03 00 08 00 00 00 65 0B 01 03 00 08 00 00 00 66 0B 01 03 00 08 00 00 00 67 0B 01 03 00 08 00 00 00 68 0B 01 03 00 08 00 00 00 69 0B 01 03 00 04 00 00 01 6A 0B 01 03 00 04 00 00 01 6B 0B 01 03 00 04 00 00 01 6C 0B 01 03 00 04 00 00 01 6D 0B 01 03 00 04 00 00 01 6E 0B 01 03 00 04 00 00 01 6F 0B 01 03 00 04 00 00 01 70 0B 01 03 00 04 00 00 01 71 0B 01 03 00 04 00 00 01 72 0B 01 03 00 04 00 00 01 73 0B 01 03 00 04 00 00 01 74 0B 01 03 00 04 00 00 01 75 0B 01 03 00 04 00 00 01 76 0B 01 03 00 04 00 00 01 77 0B 01 03 00 04 00 00 01 78 0B 01 03 00 04 00 00 01 79 0B 01 03 00 04 00 00 01 7A 0B 01 03 00 04 00 00 01 7B 0B 01 03 00 08 00 00 02 7C 0B 01 03 00 0C 00 00 01 02 7D 0B 01 03 00 0C 00 00 01 02 7F 0B 01 03 00 08 00 00 00 80 0B 01 03 00 08 00 00 00 81 0B 01 03 00 08 00 00 00 87 0B 01 03 10 0C 00 00 60 01 02 88 0B 01 03 00 08 00 00 00 89 0B 01 03 00 0C 00 00 01 02 A0 91 02 03 00 04 00 00 01 A1 91 02 03 00 04 00 00 01 A2 91 02 03 00 04 00 00 01 A4 91 02 03 00 04 00 00 01 A5 91 02 03 00 04 00 00 01 A7 91 02 03 00 04 00 00 01 A8 91 02 03 00 04 00 00 01 A9 91 02 03 00 04 00 00 01 AA 91 02 03 00 04 00 00 01 AB 91 02 03 00 04 00 00 01 B1 91 02 03 00 04 00 00 01 B2 91 02 03 00 04 00 00 01 B3 91 02 03 00 04 00 00 01 B4 91 02 03 00 04 00 00 01 B5 91 02 03 00 04 00 00 01 B6 91 02 03 00 04 00 00 01 BE 91 02 03 00 04 00 00 01 BF 91 02 03 00 04 00 00 01 C1 91 02 03 00 04 00 00 01 C2 91 02 03 00 04 00 00 01 C3 91 02 03 00 04 00 00 01 C4 91 02 03 00 04 00 00 01 C5 91 02 03 00 04 00 00 01 C9 91 02 03 00 0C 00 00 01 02 CA 91 02 03 00 04 00 00 01 CB 91 02 03 00 04 00 00 01 CC 91 02 03 00 04 00 00 01 CD 91 02 03 00 04 00 00 01 CE 91 02 03 10 00 00 00 05 CF 91 02 03 10 00 00 00 05 D0 91 02 03 10 00 00 00 05 D1 91 02 03 10 00 00 00 05 D2 91 02 03 00 04 00 00 01 D3 91 02 03 00 04 00 00 01 D4 91 02 03 00 04 00 00 01 D5 91 02 03 00 04 00 00 01 D6 91 02 03 00 04 00 00 01 D7 91 02 03 00 04 00 00 01 D8 91 02 03 00 04 00 00 01 DD 91 02 03 10 00 00 00 05 DE 91 02 03 10 00 00 00 05 E1 91 02 03 10 08 00 00 5A 03 E3 91 02 03 00 0C 00 00 01 02 E4 91 02 03 00 04 00 00 01 E5 91 02 03 00 04 00 00 01 E6 91 02 03 00 04 00 00 01 E7 91 02 03 00 04 00 00 01 E8 91 02 03 00 04 00 00 01 E9 91 02 03 00 04 00 00 01 EA 91 02 03 00 04 00 00 01 EB 91 02 03 00 04 00 00 01 EC 91 02 03 00 04 00 00 01 ED 91 02 03 00 04 00 00 01 EE 91 02 03 00 04 00 00 01 EF 91 02 03 00 04 00 00 01 F0 91 02 03 00 04 00 00 01 F1 91 02 03 00 0C 00 00 01 02 F3 91 02 03 00 0C 00 00 01 02 F4 91 02 03 00 04 00 00 01 F5 91 02 03 00 0C 00 00 01 02 00 87 93 03 00 04 00 00 01 01 87 93 03 00 04 00 00 01 02 87 93 03 00 04 00 00 01 03 87 93 03 00 04 00 00 01 04 87 93 03 00 04 00 00 01 05 87 93 03 00 04 00 00 01 0B 87 93 03 00 04 00 00 01 0D 87 93 03 00 0C 00 00 01 02 0F 87 93 03 00 04 00 00 01 10 87 93 03 00 04 00 00 01 11 87 93 03 10 00 00 00 05 12 87 93 03 00 04 00 00 01 13 87 93 03 00 04 00 00 01 14 87 93 03 00 0C 00 00 01 02 17 87 93 03 00 0C 00 00 01 02 18 87 93 03 00 04 00 00 01 19 87 93 03 00 04 00 00 01 1A 87 93 03 00 0C 00 00 01 02 1B 87 93 03 00 04 00 00 01 1C 87 93 03 00 0C 00 00 01 02 1D 87 93 03 00 04 00 00 01 1E 87 93 03 00 04 00 00 01 21 87 93 03 00 04 00 00 01 22 87 93 03 10 04 00 00 04 01 23 87 93 03 00 04 00 00 01 29 87 93 03 00 0C 00 00 01 02 2C 87 93 03 00 0C 00 00 01 02 2E 87 93 03 10 0C 00 00 5A 01 02 A1 0D 95 03 00 04 00 00 01 A2 0D 95 03 00 04 00 00 01 A3 0D 95 03 00 04 00 00 01 A4 0D 95 03 00 04 00 00 01 A5 0D 95 03 00 04 00 00 01 A6 0D 95 03 00 04 00 00 01 A7 0D 95 03 00 04 00 00 01 A8 0D 95 03 10 00 00 00 05 A9 0D 95 03 10 00 00 00 05 AA 0D 95 03 00 0C 00 00 01 02 AB 0D 95 03 00 04 00 00 01 AC 0D 95 03 00 04 00 00 01 AD 0D 95 03 00 04 00 00 01 AE 0D 95 03 00 04 00 00 01 AF 0D 95 03 00 04 00 00 01 B0 0D 95 03 00 04 00 00 01 B1 0D 95 03 00 04 00 00 01 B2 0D 95 03 00 04 00 00 01 B3 0D 95 03 00 04 00 00 01 B4 0D 95 03 00 04 00 00 01 B6 0D 95 03 00 04 00 00 01 B7 0D 95 03 00 04 00 00 01 B8 0D 95 03 00 04 00 00 01 B9 0D 95 03 00 04 00 00 01 BA 0D 95 03 00 04 00 00 01 BB 0D 95 03 00 04 00 00 01 BC 0D 95 03 00 04 00 00 01 BD 0D 95 03 00 04 00 00 01 BE 0D 95 03 00 04 00 00 01 BF 0D 95 03 00 04 00 00 01 C3 0D 95 03 00 04 00 00 01 C4 0D 95 03 00 04 00 00 01 C7 0D 95 03 00 04 00 00 01 C8 0D 95 03 00 04 00 00 01 C9 0D 95 03 00 04 00 00 01 CA 0D 95 03 00 04 00 00 01 CB 0D 95 03 00 04 00 00 01 CC 0D 95 03 00 04 00 00 01 CD 0D 95 03 00 04 00 00 01 CE 0D 95 03 00 04 00 00 01 CF 0D 95 03 00 04 00 00 01 D0 0D 95 03 00 04 00 00 01 D1 0D 95 03 00 04 00 00 01 D2 0D 95 03 00 04 00 00 01 D3 0D 95 03 00 04 00 00 01 DA 0D 95 03 00 0C 00 00 01 02 40 94 96 03 00 0C 00 00 01 02 41 94 96 03 00 0C 00 00 01 02 44 94 96 03 00 04 00 00 01 45 94 96 03 00 04 00 00 01 46 94 96 03 00 04 00 00 01 47 94 96 03 00 04 00 00 01 48 94 96 03 00 04 00 00 01 49 94 96 03 00 04 00 00 01 4A 94 96 03 00 04 00 00 01 4B 94 96 03 00 04 00 00 01 4C 94 96 03 00 04 00 00 01 4D 94 96 03 00 04 00 00 01 4E 94 96 03 00 04 00 00 01 4F 94 96 03 00 04 00 00 01 50 94 96 03 00 04 00 00 01 51 94 96 03 00 04 00 00 01 52 94 96 03 00 04 00 00 01 53 94 96 03 00 04 00 00 01 54 94 96 03 00 04 00 00 01 55 94 96 03 00 04 00 00 01 56 94 96 03 00 04 00 00 01 57 94 96 03 00 0C 00 00 01 02 58 94 96 03 00 0C 00 00 01 02 59 94 96 03 00 04 00 00 01 5A 94 96 03 00 04 00 00 01 5B 94 96 03 00 0C 00 00 01 02 5D 94 96 03 00 04 00 00 01 5E 94 96 03 00 04 00 00 01 5F 94 96 03 00 04 00 00 01 60 94 96 03 00 04 00 00 01 61 94 96 03 00 0C 00 00 01 02 62 94 96 03 00 04 00 00 01 63 94 96 03 00 04 00 00 01 64 94 96 03 00 04 00 00 01 65 94 96 03 00 04 00 00 01 66 94 96 03 00 04 00 00 01 67 94 96 03 00 04 00 00 01 68 94 96 03 00 04 00 00 01 69 94 96 03 00 04 00 00 01 6A 94 96 03 00 04 00 00 01 6B 94 96 03 00 04 00 00 01 6C 94 96 03 00 04 00 00 01 6D 94 96 03 00 04 00 00 01 6E 94 96 03 00 04 00 00 01 70 94 96 03 00 04 00 00 01 72 94 96 03 00 04 00 00 01 75 94 96 03 00 04 00 00 01 76 94 96 03 00 04 00 00 01 77 94 96 03 00 04 00 00 01 78 94 96 03 00 04 00 00 01 7A 94 96 03 00 04 00 00 01 7B 94 96 03 00 04 00 00 01 7C 94 96 03 10 0C 00 00 5A 01 02 7D 94 96 03 10 0C 00 00 5A 01 02 82 1D 2C 04 00 04 00 00 01 83 1D 2C 04 00 04 00 00 01 84 1D 2C 04 00 04 00 00 01 85 1D 2C 04 00 04 00 00 01 86 1D 2C 04 00 04 00 00 01 87 1D 2C 04 10 00 00 00 05 88 1D 2C 04 10 00 00 00 05 89 1D 2C 04 00 04 00 00 01 8A 1D 2C 04 00 04 00 00 01 8B 1D 2C 04 00 04 00 00 01 8C 1D 2C 04 00 04 00 00 01 8D 1D 2C 04 00 04 00 00 01 8E 1D 2C 04 00 04 00 00 01 8F 1D 2C 04 10 00 00 00 05 90 1D 2C 04 10 00 00 00 05 91 1D 2C 04 00 04 00 00 01 92 1D 2C 04 00 04 00 00 01 93 1D 2C 04 00 04 00 00 01 AC 1D 2C 04 00 0C 00 00 01 02 AD 1D 2C 04 00 0C 00 00 01 02 AE 1D 2C 04 00 0C 00 00 01 02 AF 1D 2C 04 00 0C 00 00 01 02 B0 1D 2C 04 00 0C 00 00 01 02 B1 1D 2C 04 00 0C 00 00 01 02 B2 1D 2C 04 00 04 00 00 01 B3 1D 2C 04 00 04 00 00 01 B4 1D 2C 04 00 04 00 00 01 B5 1D 2C 04 00 04 00 00 01 B6 1D 2C 04 00 04 00 00 01 B7 1D 2C 04 00 04 00 00 01 B8 1D 2C 04 00 04 00 00 01 B9 1D 2C 04 00 04 00 00 01 BA 1D 2C 04 00 04 00 00 01 C1 1D 2C 04 00 04 00 00 01 C2 1D 2C 04 00 04 00 00 01 C3 1D 2C 04 00 04 00 00 01 C4 1D 2C 04 00 04 00 00 01 C5 1D 2C 04 00 04 00 00 01 C6 1D 2C 04 00 04 00 00 01 C7 1D 2C 04 00 04 00 00 01 C8 1D 2C 04 00 04 00 00 01 CC 1D 2C 04 00 08 00 00 02 CE 1D 2C 04 00 04 00 00 01 CF 1D 2C 04 00 04 00 00 01 D0 1D 2C 04 00 04 00 00 01 D1 1D 2C 04 00 04 00 00 01 D2 1D 2C 04 00 04 00 00 01 D3 1D 2C 04 00 04 00 00 01 D4 1D 2C 04 00 04 00 00 01 D5 1D 2C 04 00 04 00 00 01 D6 1D 2C 04 00 04 00 00 01 D7 1D 2C 04 00 04 00 00 01 D8 1D 2C 04 00 04 00 00 01 D9 1D 2C 04 00 04 00 00 01 DA 1D 2C 04 00 04 00 00 01 DB 1D 2C 04 00 04 00 00 01 DC 1D 2C 04 00 04 00 00 01 DD 1D 2C 04 00 04 00 00 01 DE 1D 2C 04 00 04 00 00 01 DF 1D 2C 04 00 04 00 00 01 E0 1D 2C 04 00 04 00 00 01 E1 1D 2C 04 00 04 00 00 01 E2 1D 2C 04 00 04 00 00 01 E3 1D 2C 04 00 04 00 00 01 E4 1D 2C 04 00 04 00 00 01 E5 1D 2C 04 00 04 00 00 01 E6 1D 2C 04 00 04 00 00 01 E7 1D 2C 04 00 08 00 00 02 E8 1D 2C 04 00 04 00 00 01 E9 1D 2C 04 00 08 00 00 03 EA 1D 2C 04 10 00 00 00 05 EB 1D 2C 04 10 00 00 00 05 EC 1D 2C 04 10 00 00 00 05 ED 1D 2C 04 10 00 00 00 05 EE 1D 2C 04 00 04 00 00 01 EF 1D 2C 04 00 04 00 00 01 F0 1D 2C 04 00 04 00 00 01 F1 1D 2C 04 00 04 00 00 01 F2 1D 2C 04 00 04 00 00 01 F3 1D 2C 04 00 04 00 00 01 F4 1D 2C 04 00 04 00 00 01 F5 1D 2C 04 00 04 00 00 01 F6 1D 2C 04 00 04 00 00 01 F7 1D 2C 04 00 04 00 00 01 F8 1D 2C 04 00 04 00 00 01 F9 1D 2C 04 00 04 00 00 01 FB 1D 2C 04 00 04 00 00 01 FD 1D 2C 04 00 04 00 00 01 09 1E 2C 04 00 0C 00 00 01 02 0A 1E 2C 04 00 0C 00 00 01 02 0B 1E 2C 04 00 08 00 00 02 0C 1E 2C 04 00 08 00 00 02 0D 1E 2C 04 00 0C 00 00 01 02 0E 1E 2C 04 00 0C 00 00 01 02 0F 1E 2C 04 00 0C 00 00 01 02 10 1E 2C 04 00 04 00 00 01 11 1E 2C 04 00 04 00 00 01 12 1E 2C 04 04 0C 00 00 E0 01 00 00 01 01 13 1E 2C 04 04 0C 00 00 C0 03 00 00 01 01 14 1E 2C 04 04 0C 00 00 C0 12 00 00 01 01 15 1E 2C 04 00 08 00 00 00 16 1E 2C 04 00 08 00 00 03 17 1E 2C 04 00 08 00 00 03 18 1E 2C 04 00 08 00 00 03 19 1E 2C 04 00 04 00 00 01 1A 1E 2C 04 00 08 00 00 02 1B 1E 2C 04 00 0C 00 00 01 02 1C 1E 2C 04 10 08 00 00 5A 02 1D 1E 2C 04 10 04 00 00 55 01 1E 1E 2C 04 10 04 00 00 55 01 1F 1E 2C 04 10 0C 00 00 5A 01 02 00 00 00 00 00 00 00 00 00 00 00 05 00 10 00 06 00 08 00 A0 01 13 00 18 56 A1 0A 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 03 00 15 00 06 01 0E 00 04 00 00 00 31 00 31 00 00 00 00 00 00 00 00 00 08 00 18 00 06 00 0C 00 B8 01 13 00 E8 53 A1 0A 69 00 6C 00 6C 00 2F 00 39 00 30 00 30 00 31 00 30 00 30 00 36 00 2F 00 65 00 66 00 66 00 65 00 01 00 00 00 00 00 00 00 29 0B 01 03 01 00 00 00 00 00 00 00 10 0B 01 03 01 00 00 00 00 00 00 00 87 0B 01 03 01 00 00 00 00 00 00 00 3D 0B 01 03 01 00 00 00 00 00 00 00 D0 F0 FA 02 01 00 00 00 01 00 00 00 29 0B 01 03 01 00 00 00 01 00 00 00 10 0B 01 03 01 00 00 00 01 00 00 00 87 0B 01 03 01 00 00 00 01 00 00 00 3D 0B 01 03 01 00 00 00 01 00 00 00 D0 F0 FA 02 02 00 00 00 00 00 00 00 29 0B 01 03 02 00 00 00 00 00 00 00 10 0B 01 03 02 00 00 00 00 00 00 00 87 0B 01 03 02 00 00 00 00 00 00 00 3D 0B 01 03 02 00 00 00 00 00 00 00 D0 F0 FA 02 02 00 00 00 01 00 00 00 29 0B 01 03 02 00 00 00 01 00 00 00 10 0B 01 03 02 00 00 00 01 00 00 00 87 0B 01 03 02 00 00 00 01 00 00 00 3D 0B 01 03 02 00 00 00 01 00 00 00 D0 F0 FA 02 03 00 00 00 00 00 00 00 29 0B 01 03 03 00 00 00 00 00 00 00 10 0B 01 03 03 00 00 00 00 00 00 00 87 0B 01 03 03 00 00 00 00 00 00 00 3D 0B 01 03 03 00 00 00 00 00 00 00 D0 F0 FA 02 03 00 00 00 01 00 00 00 29 0B 01 03 03 00 00 00 01 00 00 00 10 0B 01 03 03 00 00 00 01 00 00 00 87 0B 01 03 03 00 00 00 01 00 00 00 3D 0B 01 03 03 00 00 00 01 00 00 00 D0 F0 FA 02 04 00 00 00 00 00 00 00 29 0B 01 03 04 00 00 00 00 00 00 00 10 0B 01 03 04 00 00 00 00 00 00 00 87 0B 01 03 04 00 00 00 00 00 00 00 3D 0B 01 03 04 00 00 00 00 00 00 00 D0 F0 FA 02 04 00 00 00 01 00 00 00 29 0B 01 03 04 00 00 00 01 00 00 00 10 0B 01 03 04 00 00 00 01 00 00 00 87 0B 01 03 04 00 00 00 01 00 00 00 3D 0B 01 03 04 00 00 00 01 00 00 00 D0 F0 FA 02 05 00 00 00 00 00 00 00 29 0B 01 03 05 00 00 00 00 00 00 00 10 0B 01 03 05 00 00 00 00 00 00 00 87 0B 01 03 05 00 00 00 00 00 00 00 3D 0B 01 03 05 00 00 00 00 00 00 00 D0 F0 FA 02 05 00 00 00 01 00 00 00 29 0B 01 03 05 00 00 00 01 00 00 00 10 0B 01 03 05 00 00 00 01 00 00 00 87 0B 01 03 05 00 00 00 01 00 00 00 3D 0B 01 03 05 00 00 00 01 00 00 00 D0 F0 FA 02 06 00 00 00 00 00 00 00 29 0B 01 03 06 00 00 00 00 00 00 00 10 0B 01 03 06 00 00 00 00 00 00 00 87 0B 01 03 06 00 00 00 00 00 00 00 3D 0B 01 03 06 00 00 00 00 00 00 00 D0 F0 FA 02 06 00 00 00 01 00 00 00 29 0B 01 03 06 00 00 00 01 00 00 00 10 0B 01 03 06 00 00 00 01 00 00 00 87 0B 01 03 06 00 00 00 01 00 00 00 3D 0B 01 03 06 00 00 00 01 00 00 00 D0 F0 FA 02 07 00 00 00 00 00 00 00 29 0B 01 03 07 00 00 00 00 00 00 00 10 0B 01 03 07 00 00 00 00 00 00 00 87 0B 01 03 07 00 00 00 00 00 00 00 3D 0B 01 03 07 00 00 00 00 00 00 00 D0 F0 FA 02 07 00 00 00 01 00 00 00 29 0B 01 03 07 00 00 00 01 00 00 00 10 0B 01 03 07 00 00 00 01 00 00 00 87 0B 01 03 07 00 00 00 01 00 00 00 3D 0B 01 03 07 00 00 00 01 00 00 00 D0 F0 FA 02 08 00 00 00 00 00 00 00 29 0B 01 03 08 00 00 00 00 00 00 00 10 0B 01 03 08 00 00 00 00 00 00 00 87 0B 01 03 08 00 00 00 00 00 00 00 3D 0B 01 03 08 00 00 00 00 00 00 00 D0 F0 FA 02 08 00 00 00 01 00 00 00 29 0B 01 03 08 00 00 00 01 00 00 00 10 0B 01 03 08 00 00 00 01 00 00 00 87 0B 01 03 08 00 00 00 01 00 00 00 3D 0B 01 03 08 00 00 00 01 00 00 00 D0 F0 FA 02 00 00 00 00 00"));
        }
        return mplew.getPacket();
    }

    public static void toCashItem(MaplePacketLittleEndianWriter mplew, int sn, int type1, int type2) {
        // E1 9C 98 00 00 06 00 00 00 - Globe Cap
        mplew.writeInt(sn);
        mplew.write(0);
        mplew.write(type1);
        mplew.writeShort(0);
        mplew.write(type2);
    }

    public static void toCashItem(MaplePacketLittleEndianWriter mplew, int sn, int type0, int type1, int type2) {
        mplew.writeInt(sn);
        mplew.write(type0);
        mplew.write(type1);
        mplew.writeShort(0);
        mplew.write(type2);
    }
    //商城更新点券和抵用券
    public static MaplePacket showNXMapleTokens(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_UPDATE.getValue());
        mplew.writeInt(chr.getCSPoints(0)); // Paypal/PayByCash NX
        mplew.writeInt(chr.getCSPoints(1)); // Maple Points

        return mplew.getPacket();
    }

    public static MaplePacket enableCSorMTS() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.write(HexTool.getByteArrayFromHexString("15 00 01 00 00 00 00"));

        return mplew.getPacket();
    }

    public static MaplePacket getGiftFinish(String name, int itemid, short amount) { // 送礼完成
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(0x53);

        mplew.writeMapleAsciiString(name);
        mplew.writeInt(itemid);
        mplew.writeShort(amount);

        return mplew.getPacket();
    }

    public static MaplePacket showBoughtCSItem(MapleClient c, MapleCSInventoryItem item) { //购买提示
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(0x4C);
        mplew.writeInt(item.getUniqueId());
        mplew.writeInt(0);
        mplew.writeInt(c.getAccID());
        mplew.writeInt(0);
        mplew.writeInt(item.getItemId());
        mplew.writeInt(item.getSn());
        mplew.writeShort(item.getQuantity());
        mplew.writeMapleNameString(item.getSender());
        mplew.write(HexTool.getByteArrayFromHexString("00 00 00 00 00 00 00 00 08 00 00"));
        mplew.writeLong(item.getExpire() == null ? DateUtil.getFileTimestamp(FINAL_TIME) : DateUtil.getFileTimestamp(item.getExpire().getTime()));
        mplew.writeLong(0);

        return mplew.getPacket();
    }

    public static MaplePacket showBoughtCSQuestItem(byte position, int itemid) { //购买任务物品
        // 3F 01 6F 01 00 00 00 01 00 09 00 D7 82 3D 00
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(111);
        mplew.writeInt(1);
        mplew.writeShort(1);
        mplew.writeShort(position);
        mplew.writeInt(itemid);

        return mplew.getPacket();
    }

    public static MaplePacket showCouponRedeemedItem(int itemid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.writeShort(0x3C);
        mplew.writeInt(0);
        mplew.writeInt(1);
        mplew.writeShort(1);
        mplew.writeShort(0x1A);
        mplew.writeInt(itemid);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static MaplePacket showCheckName() { //显示 检查角色名
        //23 01 3E A7 C0 62 00 00 00 00 00 01 FA 3C 00 00 00 00 00 CA 4A 0F 00 2B 2D 31 01 01 00 00 00 60 4B 40 00 F4 AC 77 00 00 00 00 00 CD 77 3C AB 25 CA 01 00 00 00 00 00 00 00 00
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(0x43);
        mplew.write(0x8E);
        return mplew.getPacket();
    }

    public static MaplePacket showCannotToMe() { //显示 不能向自己的帐号赠送
        //23 01 3E A7 C0 62 00 00 00 00 00 01 FA 3C 00 00 00 00 00 CA 4A 0F 00 2B 2D 31 01 01 00 00 00 60 4B 40 00 F4 AC 77 00 00 00 00 00 CD 77 3C AB 25 CA 01 00 00 00 00 00 00 00 00
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(0x43);
        mplew.write(0x8D);
        return mplew.getPacket();
    }

    public static MaplePacket sendWishList(int characterid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(0x46);
        Connection con = DatabaseConnection.getConnection();
        int i = 10;

        try {
            PreparedStatement ps = con.prepareStatement("SELECT sn FROM wishlist WHERE charid = ? LIMIT 10");
            ps.setInt(1, characterid);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                mplew.writeInt(rs.getInt("sn"));
                i--;

            }
            rs.close();
            ps.close();
        } catch (SQLException se) {
            log.info("Error getting wishlist data:", se);
        }

        while (i > 0) {
            mplew.writeInt(0);
            i--;

        }
        return mplew.getPacket();
    }

    // Decoding : Raz (Snow) | Author : Penguins (Acrylic) | Finishing: Bassoe
    public static MaplePacket updateWishList(int characterid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(0x4A);

        Connection con = DatabaseConnection.getConnection();
        int i = 10;
        try {
            PreparedStatement ps = con.prepareStatement("SELECT sn FROM wishlist WHERE charid = ? LIMIT 10");
            ps.setInt(1, characterid);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                mplew.writeInt(rs.getInt("sn"));
                i--;

            }
            rs.close();
            ps.close();
        } catch (SQLException se) {
            log.info("Error getting wishlist data:", se);
        }

        while (i > 0) {
            mplew.writeInt(0);
            i--;

        }
        return mplew.getPacket();
    }

    public static MaplePacket wrongCouponCode() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(0x51);
        mplew.write(0x50);

        return mplew.getPacket();
    }

    public static MaplePacket getFindReplyWithCS(String target) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.WHISPER.getValue());
        mplew.write(9);
        mplew.writeMapleAsciiString(target);
        mplew.write(2);
        mplew.writeInt(-1);

        return mplew.getPacket();
    }

    public static MaplePacket updatePet(MaplePet pet, boolean alive) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        mplew.write(0);
        mplew.write(2);
        mplew.write(3);
        mplew.write(5);
        mplew.write(pet.getPosition());
        mplew.writeShort(0);
        mplew.write(5);
        mplew.write(pet.getPosition());
        mplew.write(0);
        mplew.write(3);
        mplew.writeInt(pet.getItemId());
        mplew.write(1);
        mplew.writeInt(pet.getUniqueId());
        mplew.writeInt(0);
        //mplew.writeLong(DateUtil.getFileTimestamp(item.getExpiration() == null ? FINAL_TIME : item.getExpiration().getTime()));
        mplew.write(HexTool.getByteArrayFromHexString("00 80 05 BB 46 E6 17 02"));
        String petname = pet.getName();
        if (petname.getBytes().length > 13) {
            petname = petname.substring(0, 13);
        }
        mplew.writeAsciiString(petname);
        for (int i = petname.getBytes().length; i < 13; i++) {
            mplew.write(0);
        }
        mplew.write(pet.getLevel());
        mplew.writeShort(pet.getCloseness());
        mplew.write(pet.getFullness());
        if (alive) {
            mplew.writeLong(DateUtil.getFileTimestamp((long) (System.currentTimeMillis() * 1.5), false));
            mplew.write(HexTool.getByteArrayFromHexString("00 00 3F 00 00 00"));
        } else {
            mplew.writeLong(DateUtil.getFileTimestamp(FINAL_TIME));
        }
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static MaplePacket showPet(MapleCharacter chr, MaplePet pet, boolean remove) {
        return showPet(chr, pet, remove, false);
    }

    public static MaplePacket showPet(MapleCharacter chr, MaplePet pet, boolean remove, boolean hunger) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_PET.getValue());
        mplew.writeInt(chr.getId());
        mplew.write(chr.getPetSlot(pet));
        if (remove) {
            mplew.write(0);
            mplew.write(hunger ? 1 : 0);
        } else {
            mplew.write(1);
            mplew.write(0);
            mplew.writeInt(pet.getItemId());
            mplew.writeMapleAsciiString(pet.getName());
            mplew.writeInt(pet.getUniqueId());
            mplew.writeInt(0);
            mplew.writeShort(pet.getPos().x);
            mplew.writeShort(pet.getPos().y);
            mplew.write(pet.getStance());
            mplew.writeInt(pet.getFh());
        }

        return mplew.getPacket();
    }

    public static MaplePacket movePet(int cid, int pid, int slot, List<LifeMovementFragment> moves) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MOVE_PET.getValue());
        mplew.writeInt(cid);
        mplew.write(slot);
        mplew.writeInt(pid);
        serializeMovementList(mplew, moves);

        return mplew.getPacket();
    }
    //宠物说话
    public static MaplePacket petChat(int cid, int slot, int act, String text) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PET_CHAT.getValue());
        mplew.writeInt(cid);
        mplew.write(slot);
        mplew.writeShort(act);
        mplew.writeMapleAsciiString(text);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static MaplePacket commandResponse(int cid, int slot, int animation, boolean success) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PET_COMMAND.getValue());
        mplew.writeInt(cid);
        mplew.write(slot);
        mplew.write((animation == 1 && success) ? 1 : 0);
        mplew.write(animation);
        if (animation == 1) {
            mplew.write(0);
        } else {
            mplew.writeShort(success ? 1 : 0);
        }
        return mplew.getPacket();
    }

    public static MaplePacket showOwnPetLevelUp(int index) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        mplew.write(4);
        mplew.write(0);
        mplew.write(index); // Pet Index

        return mplew.getPacket();
    }

    public static MaplePacket showPetLevelUp(MapleCharacter chr, int index) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
        mplew.writeInt(chr.getId());
        mplew.write(4);
        mplew.write(0);
        mplew.write(index);

        return mplew.getPacket();
    }

    public static MaplePacket changePetName(MapleCharacter chr, String newname, int slot) {
        // 82 00 E6 DC 17 00 00 04 00 4A 65 66 66 00
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PET_NAMECHANGE.getValue());
        mplew.writeInt(chr.getId());
        mplew.write(0);
        mplew.writeMapleAsciiString(newname);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static MaplePacket petStatUpdate(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UPDATE_STATS.getValue());
        int mask = 0;
        mask |= MapleStat.PET.getValue();
        mplew.write(0);
        mplew.writeInt(mask);
        List<MaplePet> pets = chr.getPets();
        for (MaplePet pet : pets) {
            mplew.writeInt(pet.getUniqueId());
            mplew.writeInt(0);
        }
        for (int i = 0; i < (3 - pets.size()); i++) {
            mplew.writeLong(0);
        }
        mplew.write(0);

        return mplew.getPacket();
    }

    public static MaplePacket showCharCash(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CHAR_CASH.getValue());
        mplew.writeInt(chr.getId());
        mplew.writeInt(chr.getCSPoints(1));

        return mplew.getPacket();
    }

    public static MaplePacket weirdStatUpdate() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UPDATE_STATS.getValue());
        mplew.write(0);
        mplew.write(0x38);
        mplew.writeShort(0);
        mplew.writeLong(0);
        mplew.writeLong(0);
        mplew.writeLong(0);
        mplew.write(0);
        mplew.write(1);

        return mplew.getPacket();
    }

    public static MaplePacket showForcedEquip() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.FORCED_MAP_EQUIP.getValue());
        mplew.writeInt(0);
        return mplew.getPacket();
    }

    public static MaplePacket summonSkill(int cid, int summonSkillId, int newStance) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SUMMON_SKILL.getValue());
        mplew.writeInt(cid);
        mplew.writeInt(summonSkillId);
        mplew.write(newStance);

        return mplew.getPacket();
    }

    public static MaplePacket skillCooldown(int sid, int time) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.COOLDOWN.getValue());
        mplew.writeInt(sid);
        mplew.writeShort(time);

        return mplew.getPacket();
    }
    //使用技能书
    public static MaplePacket skillBookSuccess(MapleCharacter chr, int skillid, int maxlevel, boolean canuse, boolean success) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.USE_SKILL_BOOK.getValue());
        mplew.writeInt(chr.getId()); // character id
        mplew.write(1);
        mplew.writeInt(skillid);
        mplew.writeInt(maxlevel);
        mplew.write(canuse ? 1 : 0);
        mplew.write(success ? 1 : 0);

        return mplew.getPacket();
    }
     //技能宏
    public static MaplePacket getMacros(SkillMacro[] macros) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SKILL_MACRO.getValue());
        int count = 0;
        for (int i = 0; i < 5; i++) {
            if (macros[i] != null) {
                count++;
            }
        }
        mplew.write(count); // number of macros
        for (int i = 0; i < 5; i++) {
            SkillMacro macro = macros[i];
            if (macro != null) {
                mplew.writeMapleAsciiString(macro.getName());
                mplew.write(macro.getShout());
                mplew.writeInt(macro.getSkill1());
                mplew.writeInt(macro.getSkill2());
                mplew.writeInt(macro.getSkill3());
            }
        }

        return mplew.getPacket();
    }

    public static MaplePacket getPlayerNPC(int id) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PLAYER_NPC.getValue());
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM playernpcs WHERE id = ?");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                mplew.write(rs.getByte("dir"));
                mplew.writeInt(id);
                mplew.writeMapleAsciiString(rs.getString("name"));
                mplew.write(0);
                mplew.write(rs.getByte("skin"));
                mplew.writeInt(rs.getInt("face"));
                mplew.write(0);
                mplew.writeInt(rs.getInt("hair"));
            }
            rs.close();
            ps.close();
        } catch (Exception e) {
        }
        try {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM playernpcs_equip WHERE npcid = ? AND type = 0");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                mplew.write(rs.getByte("equippos"));
                mplew.writeInt(rs.getInt("equipid"));
            }
            rs.close();
            ps.close();
        } catch (Exception e) {
        }
        mplew.writeShort(-1);
        int count = 0;
        try {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM playernpcs_equip WHERE npcid = ? AND type = 1");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                mplew.writeInt(rs.getInt("equipid"));
                count += 1;
            }
            rs.close();
            ps.close();
        } catch (Exception e) {
        }
        while (count < 4) {
            mplew.writeInt(0);
            count += 1;
        }
        return mplew.getPacket();
    }

    public static MaplePacket showNotes(ResultSet notes, int count) throws SQLException {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_NOTES.getValue());
        mplew.write(3);
        mplew.write(count);
        for (int i = 0; i < count; i++) {
            mplew.writeInt(notes.getInt("id"));
            mplew.writeMapleAsciiString(notes.getString("from"));
            mplew.writeMapleAsciiString(notes.getString("message"));
            mplew.writeLong(DateUtil.getFileTimestamp(notes.getLong("timestamp")));
            mplew.write(1);
            notes.next();
        }

        return mplew.getPacket();
    }

    public static void sendUnkwnNote(String to, String msg, String from) throws SQLException {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("INSERT INTO notes (`to`, `from`, `message`, `timestamp`) VALUES (?, ?, ?, ?)");
        ps.setString(1, to);
        ps.setString(2, from);
        ps.setString(3, msg);
        ps.setLong(4, System.currentTimeMillis());
        ps.executeUpdate();
        ps.close();
    }

    public static MaplePacket updateAriantPQRanking(String name, int score, boolean empty) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ARIANT_PQ_START.getValue());
        //E9 00 pid
        //01 unknown
        //09 00 53 69 6E 50 61 74 6A 65 68 maple ascii string name
        //00 00 00 00 score
        mplew.write(empty ? 0 : 1);
        if (!empty) {
            mplew.writeMapleAsciiString(name);
            mplew.writeInt(score);
        }

        return mplew.getPacket();
    }

    public static MaplePacket catchMonster(int mobid, int itemid, byte success) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CATCH_MONSTER.getValue());
        //BF 00
        //38 37 2B 00 mob id
        //32 A3 22 00 item id
        //00 success??
        mplew.writeInt(mobid);
        mplew.writeInt(itemid);
        mplew.write(success);

        return mplew.getPacket();
    }

    public static MaplePacket showAllCharacter(int chars, int unk) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.ALL_CHARLIST.getValue());
        mplew.write(1);
        mplew.writeInt(chars);
        mplew.writeInt(unk);
        return mplew.getPacket();
    }

    public static MaplePacket showAllCharacterInfo(int worldid, List<MapleCharacter> chars) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.ALL_CHARLIST.getValue());
        mplew.write(0);
        mplew.write(worldid);
        mplew.write(chars.size());
        for (MapleCharacter chr : chars) {
            addCharEntry(mplew, chr);
        }
        return mplew.getPacket();
    }

    public static MaplePacket useChalkboard(MapleCharacter chr, boolean close) {
        // [7B 00] [65 48 55 00] [01] [09 00 61 73 64 66 67 68 6A 6B 6C]
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CHALKBOARD.getValue());
        mplew.writeInt(chr.getId());
        if (close) {
            mplew.write(0);
        } else {
            mplew.write(1);
            mplew.writeMapleAsciiString(chr.getChalkboard());
        }

        return mplew.getPacket();
    }

    private static void addRings2(MaplePacketLittleEndianWriter mplew, MapleCharacter chr, boolean isUpdateCharlook) {
        //if(show)//System.out.println("调用的函数："+new Throwable().getStackTrace()[0]); //显示调用的类 函数名 函数所在行
        MapleInventory iv = chr.getInventory(MapleInventoryType.EQUIPPED);
        Collection<IItem> equippedC = iv.list();
        boolean 结婚戒指 = false;
        List<IEquip> 恋人戒指 = new ArrayList<IEquip>();
        List<IEquip> 友谊戒指 = new ArrayList<IEquip>();
        for (IItem item : equippedC) {
            if (item.友谊戒指()) {
                友谊戒指.add(MapleRing.loadFromDb(item.getItemId(), item.getPosition(), item.getUniqueId()));
            } else if(item.恋人戒指()){
                恋人戒指.add(MapleRing.loadFromDb(item.getItemId(), item.getPosition(), item.getUniqueId()));
            } else if(item.结婚戒指()) {
                结婚戒指 = true;
            }
        }
        mplew.write(恋人戒指.size());
        for (IEquip ring : 恋人戒指) {
                mplew.writeInt(1);
                mplew.writeInt(ring.getUniqueId()); //戒指的uniqueid
                mplew.writeInt(0);
                mplew.writeInt(ring.getPartnerUniqueId()); //对方戒指的uniqueid 对应Ring表里的partnerRingId
                mplew.writeInt(0);
                mplew.writeInt(ring.getItemId());
        }
        mplew.write(友谊戒指.size());
        for (IEquip ring : 友谊戒指) {
                mplew.writeInt(1);
                mplew.writeInt(ring.getUniqueId()); //戒指的uniqueid
                mplew.writeInt(0);
                mplew.writeInt(ring.getPartnerUniqueId()); //对方戒指的uniqueid 对应Ring表里的partnerRingId
                mplew.writeInt(0);
                mplew.writeInt(ring.getItemId());
        }
        boolean 带结婚戒指 = 结婚戒指;
        mplew.write(带结婚戒指 ? 1 : 0);//带结婚戒指 是1  否0
        if(带结婚戒指){
            mplew.writeInt(chr.getId());//自己的cid
            mplew.writeInt(chr.getPartner().getId());//配偶的cid
        } else if(!带结婚戒指 && !isUpdateCharlook) {
            mplew.writeShort(0);
        }
        mplew.writeShort(0);
        if(isUpdateCharlook) {
            mplew.writeShort(0);
        }
    }
    
    
    public static MaplePacket removeItemFromDuey(boolean remove, int Package) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.DUEY.getValue());
        mplew.write(0x17);
        mplew.writeInt(Package);
        mplew.write(remove ? 3 : 4);
        return mplew.getPacket();
    }

    public static MaplePacket sendDueyMessage(byte operation) {
        return sendDuey(operation, null);
    }
     //送货员
    public static MaplePacket sendDuey(byte operation, List<MapleDueyActions> packages) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.DUEY.getValue());
        mplew.write(10);
        if (operation == 9) {
            mplew.write(0);
            mplew.write(packages.size());
            for (MapleDueyActions dp : packages) {
                mplew.writeInt(dp.getPackageId());
                mplew.writeAsciiString(dp.getSender());
                for (int i = dp.getSender().getBytes().length; i < 13; i++) {
                    mplew.write(0);
                }
                mplew.writeInt(dp.getMesos());
                mplew.writeLong(DateUtil.getFileTimestamp(dp.sentTimeInMilliseconds()));
                mplew.writeLong(0);
                for (int i = 0; i < 48; i++) { //message is supposed to be here...
                    mplew.writeInt(new Random().nextInt(Integer.MAX_VALUE));
                }
                mplew.writeInt(0);
                mplew.write(0);
                if (dp.getItem() != null) {
                    mplew.write(1);
                    addItemInfo(mplew, dp.getItem(), true, true);
                } else {
                    mplew.write(0);
                }
            }
            mplew.write(0);
        }
        return mplew.getPacket();
    }

    public static MaplePacket sendMTS(List<MTSItemInfo> items, int tab, int type, int page, int pages) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(0x14); //operation
        mplew.writeInt(pages * 10);
        mplew.writeInt(items.size()); //number of items
        mplew.writeInt(tab);
        mplew.writeInt(type);
        mplew.writeInt(page);
        mplew.write(1);
        mplew.write(1);
        for (int i = 0; i < items.size(); i++) {
            MTSItemInfo item = items.get(i);
            addItemInfo(mplew, item.getItem(), true, true);
            mplew.writeInt(item.getID()); //id
            mplew.writeInt(item.getTaxes()); //this + below = price
            mplew.writeInt(item.getPrice()); //price
            mplew.writeInt(0);
            mplew.writeLong(DateUtil.getFileTimestamp(item.getEndingDate()));
            mplew.writeMapleAsciiString(item.getSeller()); //account name (what was nexon thinking?)
            mplew.writeMapleAsciiString(item.getSeller()); //char name
            for (int ii = 0; ii < 28; ii++) {
                mplew.write(0);
            }
        }
        mplew.write(1);

        return mplew.getPacket();
    }

    public static MaplePacket showMTSCash(MapleCharacter p) {
        //16 01 00 00 00 00 00 00 00 00
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MTS_OPERATION2.getValue());
        mplew.writeInt(p.getCSPoints(1));
        return mplew.getPacket();
    }

    public static MaplePacket MTSWantedListingOver(int nx, int items) {
        //Listing period on [WANTED] items
        //(just a message stating you have gotten your NX/items back, only displays if nx or items != 0)
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(0x3A);
        mplew.writeInt(nx);
        mplew.writeInt(items);
        mplew.writeLong(0);
        return mplew.getPacket();
    }

    public static MaplePacket MTSConfirmSell() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(0x1D);
        return mplew.getPacket();
    }

    public static MaplePacket MTSConfirmBuy() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(0x33);
        return mplew.getPacket();
    }

    public static MaplePacket MTSFailBuy() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(0x34);
        mplew.write(0x42);
        return mplew.getPacket();
    }

    public static MaplePacket MTSConfirmTransfer(int quantity, int pos) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(0x27);
        mplew.writeInt(quantity);
        mplew.writeInt(pos);
        return mplew.getPacket();
    }

    public static MaplePacket NotYetSoldInv(List<MTSItemInfo> items) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(32);
        mplew.writeInt(items.size());
        if (items.size() != 0) {
            for (MTSItemInfo item : items) {
                addItemInfo(mplew, item.getItem(), true, true);
                mplew.writeInt(item.getID()); //id
                mplew.writeInt(item.getTaxes()); //this + below = price
                mplew.writeInt(item.getPrice()); //price
                mplew.writeInt(0);
                mplew.writeLong(DateUtil.getFileTimestamp(item.getEndingDate()));
                mplew.writeMapleAsciiString(item.getSeller()); //account name (what was nexon thinking?)
                mplew.writeMapleAsciiString(item.getSeller()); //char name
                for (int ii = 0; ii < 28; ii++) {
                    mplew.write(0);
                }
            }
        } else {
            mplew.writeInt(0);
        }

        return mplew.getPacket();
    }

    public static MaplePacket TransferInventory(List<MTSItemInfo> items) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MTS_OPERATION.getValue());
        mplew.write(30);
        mplew.writeInt(items.size());
        if (items.size() != 0) {
            for (MTSItemInfo item : items) {
                addItemInfo(mplew, item.getItem(), true, true);
                mplew.writeInt(item.getID()); //id
                mplew.writeInt(item.getTaxes()); //taxes
                mplew.writeInt(item.getPrice()); //price
                mplew.writeInt(0);
                mplew.writeLong(DateUtil.getFileTimestamp(item.getEndingDate()));
                mplew.writeMapleAsciiString(item.getSeller()); //account name (what was nexon thinking?)
                mplew.writeMapleAsciiString(item.getSeller()); //char name
                for (int i = 0; i < 28; i++) {
                    mplew.write(0);
                }
            }
        }
        mplew.write(0xD0 + items.size());
        mplew.write(HexTool.getByteArrayFromHexString("FF FF FF 00"));

        return mplew.getPacket();
    }

    public static MaplePacket showZakumShrineTimeLeft(int timeleft) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ZAKUM_SHRINE.getValue());
        mplew.write(0);
        mplew.writeInt(timeleft);

        return mplew.getPacket();
    }
     //船效果
    public static MaplePacket boatPacket(int effect) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BOAT_EFFECT.getValue());
        mplew.writeShort(effect); //1034: balrog boat comes, 1548: boat comes in ellinia station, 520: boat leaves ellinia station

        return mplew.getPacket();
    }
     //开始怪物嘉年华
    public static MaplePacket startMonsterCarnival(int team) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MONSTER_CARNIVAL_START.getValue());
        mplew.write(team);
        mplew.write(HexTool.getByteArrayFromHexString("00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"));
        return mplew.getPacket();
    }
    //玩家死亡信息
    public static MaplePacket playerDiedMessage(String name, int lostCP, int team) { //CPQ
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MONSTER_CARNIVAL_DIED.getValue());
        mplew.write(team); //team
        mplew.writeMapleAsciiString(name);
        mplew.write(lostCP);
        return mplew.getPacket();
    }

    public static MaplePacket CPUpdate(boolean party, int curCP, int totalCP, int team) { //CPQ
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        if (!party) {
            mplew.writeShort(SendPacketOpcode.MONSTER_CARNIVAL_OBTAINED_CP.getValue());
        } else {
            mplew.writeShort(SendPacketOpcode.MONSTER_CARNIVAL_PARTY_CP.getValue());
            mplew.write(team); //team?
        }
        mplew.writeShort(curCP);
        mplew.writeShort(totalCP);
        return mplew.getPacket();
    }

    public static MaplePacket playerSummoned(String name, int tab, int number) {
        //E5 00
        //02 tabnumber
        //04 number
        //09 00 57 61 72 50 61 74 6A 65 68 name
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MONSTER_CARNIVAL_SUMMON.getValue());
        mplew.write(tab);
        mplew.write(number);
        mplew.writeMapleAsciiString(name);
        return mplew.getPacket();
    }

    public static MaplePacket TrockRefreshMapList(MapleCharacter chr, byte vip) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.TROCK_LOCATIONS.getValue());
        mplew.write(3);
        mplew.write(vip);
        List<Integer> maps = chr.getTRockMaps(vip);
        for (int map : maps) {
            mplew.writeInt(map);
        }
        for (int i = maps.size(); i <= 10; i++) {
            mplew.write(CHAR_INFO_MAGIC);
        }
        maps.clear();

        return mplew.getPacket();
    }

    public static MaplePacket giveEnergyCharge(int barammount) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        mplew.writeInt(0);
        mplew.writeLong(MapleBuffStat.ENERGY_CHARGE.getValue());
        mplew.writeShort(0);
        mplew.writeInt(0);
        mplew.writeShort(barammount);
        mplew.writeShort(0);
        mplew.writeLong(0);
        mplew.write(0);
        mplew.writeInt(50);
        return mplew.getPacket();
    }

    public static MaplePacket giveForeignEnergyCharge(int cid, int barammount) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        mplew.writeInt(cid);
        mplew.writeLong(0);
        mplew.writeLong(MapleBuffStat.ENERGY_CHARGE.getValue());
        mplew.writeShort(0);
        mplew.writeShort(barammount);
        mplew.writeShort(0);
        mplew.writeLong(0);
        mplew.writeShort(0);
        mplew.writeShort(0);
        return mplew.getPacket();
    }

    public static MaplePacket spouseChat(String from, String message, int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SPOUSE_CHAT.getValue());
        mplew.write(type);
        if (type == 4) {
            mplew.write(1);
        } else {
            mplew.writeMapleAsciiString(from);
            mplew.write(5);
        }
        mplew.writeMapleAsciiString(message);
        return mplew.getPacket();
    }

    public static MaplePacket reportReply(byte type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.REPORT_PLAYER_MSG.getValue());
        mplew.write(type);
        return mplew.getPacket();
    }

    /**
     * Adds a announcement box to an existing MaplePacketLittleEndianWriter.
     *
     * @param mplew The MaplePacketLittleEndianWriter to add an announcement box to.
     * @param shop The shop to announce.
     */
    private static void addAnnounceBox(MaplePacketLittleEndianWriter mplew, IPlayerInteractionManager interaction) {
        mplew.write(4);
        if (interaction.getShopType() == 2) {
            mplew.writeInt(((MaplePlayerShop) interaction).getObjectId());
        }
        mplew.writeMapleAsciiString(interaction.getDescription()); // desc
        mplew.write(0);
        mplew.write(interaction.getItemType());
        mplew.write(1);
        mplew.write(interaction.getFreeSlot() > -1 ? 4 : 1);

        if (interaction.getShopType() == 2) {
            mplew.write(0);
        }
    }

    public static MaplePacket sendInteractionBox(MapleCharacter c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.UPDATE_CHAR_BOX.getValue());
        mplew.writeInt(c.getId());
        addAnnounceBox(mplew, c.getInteraction());
        return mplew.getPacket();
    }

    public static MaplePacket hiredMerchantBox(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
       // mplew.writeShort(SendPacketOpcode.SPAWN_HIRED.getValue());
       // mplew.write(0x07);
          mplew.writeShort(52);
    mplew.write(7);
        return mplew.getPacket();
    }

    /*public static MaplePacket getInteraction(MapleCharacter chr, boolean firstTime) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue()); // header.

        IPlayerInteractionManager ips = chr.getInteraction();
        int type = ips.getShopType();
        if (type == 1) {
            mplew.write(HexTool.getByteArrayFromHexString("05 05 04"));
        } else if (type == 2) {
            mplew.write(HexTool.getByteArrayFromHexString("05 04 04"));
        } else if (type == 3) {
            mplew.write(HexTool.getByteArrayFromHexString("05 02 02"));
        } else if (type == 4) {
            mplew.write(HexTool.getByteArrayFromHexString("05 01 02"));
        }

        mplew.write(ips.isOwner(chr) ? 0 : 1);
        mplew.write(0);
        if (type == 2 || type == 3 || type == 4) {
            addCharLook(mplew, ((MaplePlayerShop) ips).getMCOwner(), false);
            mplew.writeMapleAsciiString(ips.getOwnerName());
        } else {
            mplew.writeInt(((HiredMerchant) ips).getItemId());
            mplew.writeMapleAsciiString("雇佣商人");
        }
        for (int i = 0; i < 3; i++) {
            if (ips.getVisitors()[i] != null) {
                mplew.write(i + 1);
                addCharLook(mplew, ips.getVisitors()[i], false);
                mplew.writeMapleAsciiString(ips.getVisitors()[i].getName());
            }
        }
        mplew.write(0xFF);
        if (type == 1) {
            mplew.writeShort(0);
            mplew.writeMapleAsciiString(ips.getOwnerName());
            if (ips.isOwner(chr)) {
                mplew.writeInt(Integer.MAX_VALUE); // contains timing, suck my dick we dont need this
                mplew.write(firstTime ? 1 : 0);
                mplew.write(HexTool.getByteArrayFromHexString("00 00 00 00 00"));
            }
        }
        mplew.writeMapleAsciiString(ips.getDescription());
        if (type == 3) {
            mplew.write(ips.getItemType());
            mplew.write(0);
        } else {
            mplew.write(0x10);
            if (type == 1) {
                mplew.writeInt(0);
            }
            mplew.write(ips.getItems().size());
            if (ips.getItems().size() == 0) {
                if (type == 1) {
                    mplew.write(0);
                } else {
                    mplew.writeInt(0);
                }
            } else {
                for (MaplePlayerShopItem item : ips.getItems()) {
                    mplew.writeShort(item.getBundles());
                    mplew.writeShort(item.getItem().getQuantity());
                    mplew.writeInt(item.getPrice());
                    addItemInfo(mplew, item.getItem(), true, true);
                }
            }
        }
        return mplew.getPacket();
    }
*/
    public static MaplePacket getInteraction(MapleCharacter chr, boolean firstTime) {
    MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
    mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());

    IPlayerInteractionManager ips = chr.getInteraction();
    int type = ips.getShopType();
    if (type == 1)
      mplew.write(HexTool.getByteArrayFromHexString("05 05 04"));
    else if (type == 2)
      mplew.write(HexTool.getByteArrayFromHexString("05 04 04"));
    else if (type == 3)
      mplew.write(HexTool.getByteArrayFromHexString("05 02 02"));
    else if (type == 4) {
      mplew.write(HexTool.getByteArrayFromHexString("05 01 02"));
    }

    mplew.write((ips.isOwner(chr)) ? 0 : 1);
    mplew.write(0);
    if ((type == 2) || (type == 3) || (type == 4)) {
      addCharLook(mplew, ((MaplePlayerShop)ips).getMCOwner(), false);
      mplew.writeMapleAsciiString(ips.getOwnerName());
    } else {
      mplew.writeInt(((HiredMerchant)ips).getItemId());
      mplew.writeMapleAsciiString("雇佣商人");
    }
    for (int i = 0; i < 3; ++i)
      if (ips.getVisitors()[i] != null) {
        mplew.write(i + 1);
        addCharLook(mplew, ips.getVisitors()[i], false);
        mplew.writeMapleAsciiString(ips.getVisitors()[i].getName());
      }

    mplew.write(255);
    if (type == 1) {
      mplew.writeShort(0);
      mplew.writeMapleAsciiString(ips.getOwnerName());
      if (ips.isOwner(chr)) {
        mplew.writeInt(2147483647);
        mplew.write((firstTime) ? 1 : 0);
        mplew.write(HexTool.getByteArrayFromHexString("00 00 00 00 00"));
      }
    }
    mplew.writeMapleAsciiString(ips.getDescription());
    if (type == 3) {
      mplew.write(ips.getItemType());
      mplew.write(0);
    } else {
      mplew.write(16);
      if (type == 1)
        mplew.writeInt(0);

      mplew.write(ips.getItems().size());
      if (ips.getItems().size() == 0)
        if (type == 1)
          mplew.write(0);
        else
          mplew.writeInt(0);

      else
        for (MaplePlayerShopItem item : ips.getItems()) {
          mplew.writeShort(item.getBundles());
          mplew.writeShort(item.getItem().getQuantity());
          mplew.writeInt(item.getPrice());
          addItemInfo(mplew, item.getItem(), true, true);
        }
    }

    return mplew.getPacket();
  }
    public static MaplePacket shopChat(String message, int slot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(HexTool.getByteArrayFromHexString("06 08"));
        mplew.write(slot);
        mplew.writeMapleAsciiString(message);
        return mplew.getPacket();
    }

    public static MaplePacket shopErrorMessage(int error, int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0x0A);
        mplew.write(type);
        mplew.write(error);
        return mplew.getPacket();
    }

    public static MaplePacket spawnHiredMerchant(HiredMerchant hm) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SPAWN_HIRED_MERCHANT.getValue());
        mplew.writeInt(hm.getOwnerId());
        mplew.writeInt(hm.getItemId());
        mplew.writeShort((short) hm.getPosition().getX());
        mplew.writeShort((short) hm.getPosition().getY());
        mplew.writeShort(0);
        mplew.writeMapleAsciiString(hm.getOwnerName());
        mplew.write(0x05);
        mplew.writeInt(hm.getObjectId());
        mplew.writeMapleAsciiString(hm.getDescription());
        mplew.write(hm.getItemId() % 10);
        mplew.write(HexTool.getByteArrayFromHexString("01 04"));
        return mplew.getPacket();
    }

    public static MaplePacket destroyHiredMerchant(int id) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.DESTROY_HIRED_MERCHANT.getValue());
        mplew.writeInt(id);
        return mplew.getPacket();
    }

    public static MaplePacket shopItemUpdate(IPlayerInteractionManager shop) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0x17);// v77 = 0x15 //v78 = 0x17
        if (shop.getShopType() == 1) {
            mplew.writeInt(0);
        }
        mplew.write(shop.getItems().size());
        for (MaplePlayerShopItem item : shop.getItems()) {
            mplew.writeShort(item.getBundles());
            mplew.writeShort(item.getItem().getQuantity());
            mplew.writeInt(item.getPrice());
            addItemInfo(mplew, item.getItem(), true, true);
        }
        return mplew.getPacket();
    }

    public static MaplePacket shopVisitorAdd(MapleCharacter chr, int slot) { //玩家进入SHOP
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0x04);
        mplew.write(slot);
        addCharLook(mplew, chr, false);
        mplew.writeMapleAsciiString(chr.getName());
        return mplew.getPacket();
    }

    public static MaplePacket shopVisitorLeave(int slot) { //玩家离开SHOP
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.write(0x0A);
        if (slot > 0) {
            mplew.write(slot);
        }

        return mplew.getPacket();
    }

    public static MaplePacket updateHiredMerchant(HiredMerchant shop) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UPDATE_HIRED_MERCHANT.getValue());
        mplew.writeInt(shop.getOwnerId());
        mplew.write(0x04);
        mplew.writeInt(shop.getObjectId());
        mplew.writeMapleAsciiString(shop.getDescription());
        mplew.write(shop.getItemId() % 10);
        mplew.write(shop.getFreeSlot() > -1 ? 3 : 2);
        mplew.write(0x04);

        return mplew.getPacket();
    }

    public static MaplePacket getMiniBoxFull() { // 满了？
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        mplew.writeShort(5);
        mplew.write(2);
        return mplew.getPacket();
    }
    //极速领域
    public static MaplePacket giveInfusion(int bufflength, int speed) {
       // public static MaplePacket giveInfusion(int skillid, int bufflength, int speed) {    
         MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        mplew.writeLong(0);
        mplew.writeLong(MapleBuffStat.MORPH.getValue());
        mplew.writeShort(speed);
        mplew.writeInt(5121009);
        mplew.writeLong(0);
        mplew.writeShort(bufflength);
        mplew.writeShort(0);

        return mplew.getPacket();
    }

    public static MaplePacket giveForeignInfusion(int cid, int speed, int duration) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        mplew.writeInt(cid);
        mplew.writeLong(0);
        mplew.writeLong(MapleBuffStat.MORPH.getValue());
        mplew.writeShort(0);
        mplew.writeInt(speed);
        mplew.writeInt(5121009);
        mplew.writeLong(0);
        mplew.writeInt(duration);
        mplew.writeShort(0);

        return mplew.getPacket();
    }

    public static MaplePacket sendMaplePolice(int reason, String reasoning, int duration) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.GM_POLICE.getValue());
        mplew.writeInt(duration);
        mplew.write(4);
        mplew.write(reason);
        mplew.writeMapleAsciiString(reasoning);
        return mplew.getPacket();
    }

    public static MaplePacket updateEquipSlot(IItem item) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        mplew.write(0); // any number,
        mplew.write(HexTool.getByteArrayFromHexString("02 03 01"));
        mplew.writeShort(item.getPosition()); // set item into this slot
        mplew.write(0);
        mplew.write(item.getType()); // 1 show / 0 disapear ? o________o
        mplew.writeShort(item.getPosition()); // update this slot ?
        addItemInfo(mplew, item, true, true);
        mplew.writeMapleAsciiString("wat"); // does nothing,

        return mplew.getPacket();
    }

    public static MaplePacket updateBattleShipHP(int chr, int hp) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_MONSTER_HP.getValue());
        mplew.writeInt(chr);
        mplew.write(hp);

        return mplew.getPacket();
    }

    public static MaplePacket updateMount(int charid, MapleMount mount, boolean levelup) {
        return updateMount(charid, mount.getLevel(), mount.getExp(), mount.getTiredness(), levelup);
    }

    public static MaplePacket updateMount(int charid, int newlevel, int newexp, int tiredness, boolean levelup) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.UPDATE_MOUNT.getValue());
        mplew.writeInt(charid);
        mplew.writeInt(newlevel);
        mplew.writeInt(newexp);
        mplew.writeInt(tiredness);
        mplew.write(levelup ? (byte) 1 : (byte) 0);
        return mplew.getPacket();
    }

    public static MaplePacket getAllianceInfo(MapleAlliance alliance) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        mplew.write(0x0C);
        mplew.write(1);
        mplew.writeInt(alliance.getId());
        mplew.writeMapleAsciiString(alliance.getName());
        for (int i = 1; i <= 5; i++) {
            mplew.writeMapleAsciiString(alliance.getRankTitle(i));
        }
        mplew.write(alliance.getGuilds().size());
        mplew.writeInt(2); // probably capacity
        for (Integer guild : alliance.getGuilds()) {
            mplew.writeInt(guild);
        }
        mplew.writeMapleAsciiString(alliance.getNotice());
        return mplew.getPacket();
    }

    public static MaplePacket getGuildAlliances(MapleAlliance alliance, MapleClient c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        mplew.write(0x0D);
        mplew.writeInt(alliance.getGuilds().size());
        for (Integer guild : alliance.getGuilds()) {
            try {
                getGuildInfo(mplew, c.getChannelServer().getWorldInterface().getGuild(guild, null));
            } catch (RemoteException re) {
                c.getChannelServer().reconnectWorld();
            }
        }
        return mplew.getPacket();
    }

    public static MaplePacket addGuildToAlliance(MapleAlliance alliance, int newGuild, MapleClient c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        mplew.write(0x12);
        mplew.writeInt(alliance.getId());
        mplew.writeMapleAsciiString(alliance.getName());
        for (int i = 1; i <= 5; i++) {
            mplew.writeMapleAsciiString(alliance.getRankTitle(i));
        }
        mplew.write(alliance.getGuilds().size());
        for (Integer guild : alliance.getGuilds()) {
            mplew.writeInt(guild);
        }
        mplew.writeInt(2);
        mplew.writeMapleAsciiString(alliance.getNotice());
        mplew.writeInt(newGuild);
        try {
            getGuildInfo(mplew, c.getChannelServer().getWorldInterface().getGuild(newGuild, null));
        } catch (RemoteException re) {
            c.getChannelServer().reconnectWorld();
        }
        return mplew.getPacket();
    }

    public static MaplePacket allianceMemberOnline(MapleCharacter mc, boolean online) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        mplew.write(0x0E);
        mplew.writeInt(mc.getGuild().getAllianceId());
        mplew.writeInt(mc.getGuildId());
        mplew.writeInt(mc.getId());
        mplew.write(online ? 1 : 0);

        return mplew.getPacket();
    }

    public static MaplePacket allianceNotice(int id, String notice) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        mplew.write(0x1C);
        mplew.writeInt(id);
        mplew.writeMapleAsciiString(notice);
        return mplew.getPacket();
    }

    public static MaplePacket changeAllianceRankTitle(int alliance, String[] ranks) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        mplew.write(0x1A);
        mplew.writeInt(alliance);
        for (int i = 0; i < 5; i++) {
            mplew.writeMapleAsciiString(ranks[i]);
        }
        return mplew.getPacket();
    }

    public static MaplePacket updateAllianceJobLevel(MapleCharacter mc) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        mplew.write(0x18);
        mplew.writeInt(mc.getGuild().getAllianceId());
        mplew.writeInt(mc.getGuildId());
        mplew.writeInt(mc.getId());
        mplew.writeInt(mc.getLevel());
        mplew.writeInt(mc.getJob().getId());

        return mplew.getPacket();
    }

    public static MaplePacket removeGuildFromAlliance(MapleAlliance alliance, int expelledGuild, MapleClient c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        // PLEASE NOTE THAT WE MUST REMOVE THE GUILD BEFORE SENDING THIS PACKET. <3
        // ALSO ANOTHER NOTE, WE MUST REMOVE ALLIANCEID FROM GUILD BEFORE SENDING ASWELL <3
        mplew.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        mplew.write(0x10);
        mplew.writeInt(alliance.getId());
        mplew.writeMapleAsciiString(alliance.getName());
        for (int i = 1; i <= 5; i++) {
            mplew.writeMapleAsciiString(alliance.getRankTitle(i));
        }
        mplew.write(alliance.getGuilds().size());
        for (Integer guild : alliance.getGuilds()) {
            mplew.writeInt(guild);
        }
        mplew.write(HexTool.getByteArrayFromHexString("02 00 00 00"));
        mplew.writeMapleAsciiString(alliance.getNotice());
        mplew.writeInt(expelledGuild);
        try {
            getGuildInfo(mplew, c.getChannelServer().getWorldInterface().getGuild(expelledGuild, null));
        } catch (RemoteException re) {
            c.getChannelServer().reconnectWorld();
        }
        mplew.write(0x01);
        return mplew.getPacket();
    }

    public static MaplePacket disbandAlliance(int alliance) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        mplew.write(0x1D);
        mplew.writeInt(alliance);

        return mplew.getPacket();
    }

    public static MaplePacket transferFromCSToInv(IItem item, int position) {
        //23 01 4D 01 00 01 CA 4A 0F 00 01 A7 C0 62 00 00 00 00 00 00 CD 77 3C AB 25 CA 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 65 69 6E 6E 08 00 00 40 E0 FD 3B 37 4F 01 FF FF FF FF
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(0x5D);
        mplew.write(position);//in csinventory
        addItemInfo(mplew, item, true, false, true);
        return mplew.getPacket();
    }

    public static MaplePacket transferFromInvToCS(MapleCharacter c, MapleCSInventoryItem item) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(0x5F);
        mplew.writeInt(item.getUniqueId());
        mplew.writeInt(0);
        mplew.writeInt(c.getAccountID());
        mplew.writeInt(0);
        mplew.writeInt(item.getItemId());
        mplew.writeInt(item.getSn());
        mplew.writeShort(item.getQuantity());
        mplew.writeAsciiString(item.getSender());
        for (int i = item.getSender().getBytes().length; i < 13; i++) {
            mplew.write(0);
        }
        mplew.writeLong(item.getExpire() == null ? DateUtil.getFileTimestamp(FINAL_TIME) : DateUtil.getFileTimestamp(item.getExpire().getTime()));
        mplew.writeLong(0);
        return mplew.getPacket();
    }

    public static MaplePacket getCSInventory(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(0x42);
        MapleCSInventory csinv = chr.getCSInventory();
        mplew.writeShort(csinv.getCSItems().size());
        for (MapleCSInventoryItem citem : csinv.getCSItems().values()) {
            mplew.writeInt(citem.getUniqueId());
            mplew.writeInt(0);
            mplew.writeInt(chr.getAccountID());
            mplew.writeInt(0);
            mplew.writeInt(citem.getItemId());
            mplew.writeInt(citem.getSn());
            mplew.writeShort(citem.getQuantity());
            mplew.writeAsciiString(citem.getSender());
            for (int i = citem.getSender().getBytes().length; i < 13; i++) {
                mplew.write(0);
            }
            mplew.writeLong(citem.getExpire() == null ? DateUtil.getFileTimestamp(FINAL_TIME) : DateUtil.getFileTimestamp(citem.getExpire().getTime()));
            mplew.writeLong(0);
        }

        mplew.writeShort(4);
        mplew.writeShort(3);
        return mplew.getPacket();
    }

    public static MaplePacket getCSGifts(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        mplew.write(0x44);//32

        Collection<MapleCSInventoryItem> inv = chr.getCSInventory().getCSGifts().values();
        mplew.writeShort(inv.size());
        for (MapleCSInventoryItem gift : inv) {
            mplew.writeInt(gift.getUniqueId());
            mplew.writeInt(0);
            mplew.writeInt(gift.getItemId());
            mplew.writeAsciiString(gift.getSender());
            for (int i = gift.getSender().getBytes().length; i < 13; i++) {
                mplew.write(0);
            }
            mplew.writeAsciiString(gift.getMessage());
            for (int i = gift.getMessage().getBytes().length; i < 73; i++) {
                mplew.write(0);
            }
        }
        return mplew.getPacket();
    }

    public static MaplePacket showCygnusIntro(int id) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.Animation_EFFECT.getValue());
        mplew.write(0x14);
        mplew.writeMapleAsciiString("Effect/Direction.img/cygnus/Scene" + id);
        return mplew.getPacket();
    }

    public static MaplePacket showCygnusIntro_3(int id) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.Animation_EFFECT.getValue());
        mplew.write(0x14);
        mplew.writeMapleAsciiString("Effect/Direction3.img/cygnus/Scene" + 0);
        return mplew.getPacket();
    }

    public static MaplePacket CygnusIntroLock(boolean enable) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CYGNUS_INTRO_LOCK.getValue());
        mplew.write(enable ? 1 : 0);
        return mplew.getPacket();
    }

    public static MaplePacket CygnusIntroDisableUI(boolean enable) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CYGNUS_INTRO_DISABLE_UI.getValue());
        mplew.write(enable ? 1 : 0);
        return mplew.getPacket();
    }

    public static MaplePacket sendCygnusMessage(int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.CYGNUS_CHAR_CREATED.getValue());
        mplew.writeInt(type);
        return mplew.getPacket();
    }

    public static MaplePacket boatPacket(boolean type) {

        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.BOAT_EFFECT.getValue());
        mplew.writeShort(type ? 1 : 2);

        return mplew.getPacket();
    }

    public static MaplePacket trembleEffect(int type, int delay) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        
        mplew.writeShort(SendPacketOpcode.BOSS_ENV.getValue());
        mplew.write(1);
        mplew.write(type);
        mplew.writeInt(delay);
        
        return mplew.getPacket();
    }

    public static MaplePacket getEnergy(int level) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        
        mplew.writeShort(SendPacketOpcode.ENERGY.getValue());
        mplew.writeMapleAsciiString("energy");
        mplew.writeMapleAsciiString(Integer.toString(level));
        
        return mplew.getPacket();
    }

    public static MaplePacket Mulung_DojoUp2() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
    
        mplew.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        mplew.write(7);
    
        return mplew.getPacket();
    }

    public static MaplePacket sendHammerSlot(int slot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.VICIOUS_HAMMER.getValue());
        mplew.write(0x34);
        mplew.writeInt(0);
        mplew.writeInt(slot);
        return mplew.getPacket();
    }

    public static MaplePacket sendHammerEnd() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.VICIOUS_HAMMER.getValue());
        mplew.write(0x38);
        mplew.writeInt(0);
        return mplew.getPacket();
    }

    public static MaplePacket updateHammerItem(IItem item) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        mplew.write(0);
        mplew.write(2);
        mplew.write(3);
        mplew.write(item.getType());
        mplew.writeShort(item.getPosition());
        mplew.write(0);
        mplew.write(1);
        addItemInfo(mplew, item, false, false, true);
        return mplew.getPacket();
    }

    /**
     * 发送错误信息到客户端.
     *     @数据包的值大概如下:<br>
     *       0x01 (1) - 现在关闭了缩地门
     *       0x02 (2) - 不能去那里
     *       0x03 (3) - 对不起，正在准备冒险岛ONLINE商城
     *       0x04 (4) - 因为有地气阻挡，无法接近。
     *       0x05 (5) - 无法进行瞬间移动的地区。
     *       0x06 (6) - 因为有地气阻挡，无法接近。
     *       0x07 (7) - 你因不当行为，而遭游戏管理员禁止攻击，禁止获取经验值和金币，禁止交易，禁止丢弃道具，禁止开启个人商店与精灵商人，禁止组队，禁止使用拍卖系统，因此无法使用改功能。
     *     @返回数据包后通知。
     */
    public static MaplePacket sendBlockedMessage(int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.BLOCK_MSG.getValue());
        mplew.write(type);
        return mplew.getPacket();
    }

    public static MaplePacket loadFamily(MapleCharacter player) {
        String[] title = {"直接移动到学院成员身边", "直接召唤学院成员", "我的爆率 1.5倍(15分钟)", "我的经验值 1.5倍(15分钟)", "学院成员的团结(30分钟)", "我的爆率 2倍(15分钟)", "我的经验值 2倍(15分钟)", "我的爆率 2倍(30分钟)", "我的经验值 2倍(30分钟)", "我的组队爆率 2倍(30分钟)", "我的组队经验值 2倍(30分钟)"};
        String[] description = {"[对象] 我\n[效果] 直接可以移动到指定的学院成员身边。", "[对象] 学院成员 1名\n[效果] 直接可以召唤指定的学院成员到现在的地图。", "[对象] 我\n[持续效果] 15分钟\n[效果] 打怪爆率增加到 #c1.5倍# \n※ 与爆率活动重叠时失效。", "[对象] 我\n[持续效果] 15分钟\n[效果] 打怪经验值增加到 #c1.5倍# \n※ 与经验值活动重叠时失效。", "[启动条件] 校谱最低层学院成员6名以上在线时\n[持续效果] 30分钟\n[效果] 爆率和经验值增加到 #c2倍# ※ 与爆率、经验值活动重叠时失效。", "[对象] 我\n[持续效果] 15分钟\n[效果] 打怪爆率增加到 #c2倍# \n※ 与爆率活动重叠时失效。", "[对象] 我\n[持续效果] 15分钟\n[效果] 打怪经验值增加到 #c2倍# \n※ 与经验值活动重叠时失效。", "[对象] 我\n[持续效果] 30分钟\n[效果] 打怪爆率增加到 #c2倍# \n※ 与爆率活动重叠时失效。", "[对象] 我\n[持续效果] 30分钟\n[效果] 打怪经验值增加到 #c2倍# \n※ 与经验值活动重叠时失效。", "[对象] 我所属组队\n[持续效果] 30分钟\n[效果] 打怪爆率增加到 #c2倍# \n※ 与爆率活动重叠时失效。", "[对象] 我所属组队\n[持续效果] 30分钟\n[效果] 打怪经验值增加到 #c2倍# \n※ 与经验值活动重叠时失效。"};
        int[] repCost = {3, 5, 7, 8, 10, 12, 15, 20, 25, 40, 50};
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LOAD_FAMILY.getValue());
        mplew.writeInt(11);
        for (int i = 0; i < 11; i++) {
            mplew.write(i > 4 ? (i % 2) + 1 : i);
            mplew.writeInt(repCost[i] * 100);
            mplew.writeInt(1);
            mplew.writeMapleAsciiString(title[i]);
            mplew.writeMapleAsciiString(description[i]);
        }
        return mplew.getPacket();
    }

    public static MaplePacket sendFamilyMessage() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.FAMILY_MESSAGE.getValue());
        mplew.writeInt(0);
        return mplew.getPacket();
    }

    public static MaplePacket getFamilyInfo(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.OPEN_FAMILY.getValue()); // who cares what header is
        mplew.writeInt(chr.getFamily().getReputation()); // cur rep left
        mplew.writeInt(chr.getFamily().getTotalReputation()); // tot rep left
        mplew.writeInt(chr.getFamily().getTodaysRep()); // todays rep
        mplew.writeShort(chr.getFamily().getJuniors()); // juniors added
        mplew.writeShort(chr.getFamily().getTotalJuniors()); // juniors allowed
        mplew.writeShort(0);
        mplew.writeInt(chr.getFamilyId()); // id?
        mplew.writeMapleAsciiString(chr.getFamily().getFamilyName());
        mplew.writeInt(0);
        mplew.writeShort(0);
        return mplew.getPacket();
    }

    public static MaplePacket sendFamilyInvite(int playerId, String inviter) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.FAMILY_INVITE.getValue());
        mplew.writeInt(playerId);
        mplew.writeMapleAsciiString(inviter);
        return mplew.getPacket();
    }

    public static MaplePacket sendEngagementRequest(String name) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.FAMILY_ACTION.getValue()); //<name> has requested engagement. Will you accept this proposal?
        mplew.write(0);
        mplew.writeMapleAsciiString(name); // name
        mplew.writeInt(10); // playerid
        return mplew.getPacket();
    }

    public static MaplePacket sendGroomWishlist() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.FAMILY_ACTION.getValue()); //<name> has requested engagement. Will you accept this proposal?
        mplew.write(9);
        return mplew.getPacket();
    }

    public static MaplePacket sendFamilyJoinResponse(boolean accepted, String added) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.FAMILY_MESSAGE2.getValue());
        mplew.write(accepted ? 1 : 0);
        mplew.writeMapleAsciiString(added);
        return mplew.getPacket();
    }

    public static MaplePacket getSeniorMessage(String name) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.FAMILY_SENIOR_MESSAGE.getValue());
        mplew.writeMapleAsciiString(name);
        mplew.writeInt(0);
        return mplew.getPacket();
    }

    public static MaplePacket sendGainRep(int gain, int mode) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.FAMILY_GAIN_REP.getValue());
        mplew.writeInt(gain);
        mplew.writeShort(0);
        return mplew.getPacket();
    }

    public static MaplePacket updateItemInSlot(IItem item) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        mplew.write(0); // could be from drop
        mplew.write(2); // always 2
        mplew.write(3); // quantity > 0 (?)
        mplew.write(item.getType()); // inventory type
        mplew.write(item.getPosition()); // item slot
        mplew.writeShort(0);
        mplew.write(1);
        mplew.write(item.getPosition()); // wtf repeat
        addItemInfo(mplew, item, true, false);
        return mplew.getPacket();
    }

    public static MaplePacket itemExpired(int itemid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(2);
        mplew.writeInt(itemid);
        return mplew.getPacket();
    }

    public static MaplePacket showSpecialEffect(int effect) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        mplew.write(effect);
        return mplew.getPacket();
    }

    public static MaplePacket playPortalSound() {
        return showSpecialEffect(7);
    }

    public static MaplePacket showMonsterBookPickup() {
        return showSpecialEffect(14);
    }

    public static MaplePacket showEquipmentLevelUp() {
        return showSpecialEffect(17);
    }

    public static MaplePacket showItemLevelup() {
        return showSpecialEffect(17);
    }

    public static MaplePacket sendHammerData(int hammerUsed) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.VICIOUS_HAMMER.getValue());
        mplew.write(HexTool.getByteArrayFromHexString("34 00 00 00 00"));
        mplew.writeInt(hammerUsed);
        return mplew.getPacket();
    }

    public static MaplePacket sendHammerMessage() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.VICIOUS_HAMMER.getValue());
        mplew.write(HexTool.getByteArrayFromHexString("38 00 00 00 00"));
        return mplew.getPacket();
    }

    public static MaplePacket hammerItem(IItem item) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        mplew.write(0); // could be from drop
        mplew.write(2); // always 2
        mplew.write(3); // quantity > 0 (?)
        mplew.write(1); // Inventory type
        mplew.write(item.getPosition()); // item slot
        mplew.writeShort(0);
        mplew.write(1);
        mplew.write(item.getPosition()); // wtf repeat
        addItemInfo(mplew, item, true, false);
        return mplew.getPacket();
    }

    public static MaplePacket sendDojoAnimation(byte firstByte, String animation) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.BOSS_ENV.getValue());
        mplew.write(firstByte);
        mplew.writeMapleAsciiString(animation);
        return mplew.getPacket();
    }

    public static MaplePacket getDojoInfo(String info) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(10);
        mplew.write(HexTool.getByteArrayFromHexString("B7 04"));
        mplew.writeMapleAsciiString(info);
        return mplew.getPacket();
    }

    public static MaplePacket getDojoInfoMessage(String message) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(9);
        mplew.writeMapleAsciiString(message);
        return mplew.getPacket();
    }

    public static MaplePacket updateDojoStats(MapleCharacter chr, int belt) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(0x0A);
        mplew.write(HexTool.getByteArrayFromHexString("B7 04")); //?
        mplew.writeMapleAsciiString("pt=" + chr.getDojoPoints() + ";belt=" + belt + ";tuto=" + (chr.getFinishedDojoTutorial() ? "1" : "0"));
        return mplew.getPacket();
    }

    public static MaplePacket dojoWarpUp() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.DOJO_WARP_UP.getValue());
        mplew.write(0);
        mplew.write(6);
        return mplew.getPacket();
    }

    public static MaplePacket addCard(boolean full, int cardid, int level) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MONSTERBOOK_ADD.getValue());
        mplew.write(full ? 0 : 1);
        mplew.writeInt(cardid);
        mplew.writeInt(level);
        return mplew.getPacket();
    }

    public static MaplePacket showGainCard() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        mplew.write(0x0D);
        return mplew.getPacket();
    }

    public static MaplePacket showForeginCardEffect(int id) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
        mplew.writeInt(id);
        mplew.write(0x0D);
        return mplew.getPacket();
    }

    public static MaplePacket changeCover(int cardid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MONSTER_BOOK_CHANGE_COVER.getValue());
        mplew.writeInt(cardid);
        return mplew.getPacket();
    }

    public static MaplePacket getStatusMsg(int itemid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(7);
        mplew.writeInt(itemid);
        return mplew.getPacket();
    }

    public static MaplePacket enableTV() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.ENABLE_TV.getValue());
        mplew.writeInt(0);
        mplew.write(0);
        return mplew.getPacket();
    }

    public static MaplePacket removeTV() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.REMOVE_TV.getValue());
        return mplew.getPacket();
    }

    public static MaplePacket sendTV(MapleCharacter chr, List<String> messages, int type, MapleCharacter partner) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SEND_TV.getValue());
        mplew.write(partner != null ? 2 : 0);
        mplew.write(type); //Heart = 2  Star = 1  Normal = 0
        addCharLook(mplew, chr, false);
        mplew.writeMapleAsciiString(chr.getName());
        if (partner != null) {
            mplew.writeMapleAsciiString(partner.getName());
        } else {
            mplew.writeShort(0);
        }
        for (int i = 0; i < messages.size(); i++) {
            if (i == 4 && messages.get(4).length() > 15) {
                mplew.writeMapleAsciiString(messages.get(4).substring(0, 15));
            } else {
                mplew.writeMapleAsciiString(messages.get(i));
            }
        }
        mplew.writeInt(1337);
        if (partner != null) {
            addCharLook(mplew, partner, false);
        }
        return mplew.getPacket();
    }

    public static MaplePacket updateIntroState(String mode, int quest) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(10); //mode
        mplew.writeShort(quest);
        mplew.writeMapleAsciiString(mode);
        return mplew.getPacket();
    }

    public static MaplePacket addTutorialStats() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(0);
        mplew.writeShort(SendPacketOpcode.ENABLE_TEMPORARY_STATS.getValue());
        mplew.writeInt(3871);
        mplew.writeShort(999);
        mplew.writeShort(999);
        mplew.writeShort(999);
        mplew.writeShort(999);
        mplew.writeShort(255);
        mplew.writeShort(999);
        mplew.writeShort(999);
        mplew.write(120);
        mplew.write(140);
        return mplew.getPacket();
    }

    public static MaplePacket removeTutorialStats() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.DISABLE_TEMPORARY_STATS.getValue());
        return mplew.getPacket();
    }

    public static MaplePacket lockUI(boolean mode) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.TUTORIAL_DISABLE_UI.getValue());
        mplew.write(mode ? 1 : 0);
        return mplew.getPacket();
    }

    public static MaplePacket disableUI(boolean mode) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.TUTORIAL_LOCK_UI.getValue());
        mplew.write(mode ? 1 : 0);
        return mplew.getPacket();
    }

    public static MaplePacket spawnTutorialSummon(int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.TUTORIAL_SUMMON.getValue());
        mplew.write(type);
        return mplew.getPacket();
    }

    public static MaplePacket displayGuide(int guide) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.TUTORIAL_GUIDE.getValue());
        mplew.write(1);
        mplew.writeInt(guide);
        mplew.writeInt(12000);
        return mplew.getPacket();
    }

    public static MaplePacket tutorialSpeechBubble(String message) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.TUTORIAL_GUIDE.getValue());
        mplew.write(0);
        mplew.writeMapleAsciiString(message);
        mplew.writeInt(200);
        mplew.writeInt(4000);
        return mplew.getPacket();
    }

    public static MaplePacket showInfo(String message) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SHOW_INFO.getValue());
        mplew.writeMapleAsciiString(message);
        return mplew.getPacket();
    }

    public static MaplePacket showMapEffect(String path) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MAP_EFFECT.getValue());
        mplew.write(3);
        mplew.writeMapleAsciiString(path);
        return mplew.getPacket();
    }

    public static MaplePacket showTipsEffect(String env) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        mplew.write(23);
        mplew.writeMapleAsciiString(env);
        mplew.writeInt(1);
        return mplew.getPacket();
    }

    public static MaplePacket showWZEffect(String path, int info) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        if (info == -1) {
            mplew.write(0x12);//12
        } else {
            mplew.write(0x17);//17
        }
        mplew.writeMapleAsciiString(path);
        if (info > -1) {
            mplew.writeInt(info);
        }
        return mplew.getPacket();
    }

    public static MaplePacket showWZEffectS(String path, int info) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        mplew.write(0x14);
        mplew.writeMapleAsciiString(path);
        if (info > -1) {
            mplew.writeInt(info);
        }
        return mplew.getPacket();
    }

    public static MaplePacket playWZSound(String path) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MAP_EFFECT.getValue());
        mplew.write(4); //mode
        mplew.writeMapleAsciiString(path);
        return mplew.getPacket();
    }

    public static MaplePacket blockedPortal() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.UPDATE_STATS.getValue());
        mplew.write(1);
        mplew.writeInt(0);
        return mplew.getPacket();
    }

    /**
     * @param buffid
     * @param bufflength
     * @param statups
     * @param morph
     * @param firstLong
     * @return
     */
    public static MaplePacket givePirateBuff(int buffid, int bufflength, List<Pair<MapleBuffStat, Integer>> statups) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        long mask = getLongMask(statups);
        mplew.writeLong(mask);
        mplew.writeLong(0);
        mplew.writeShort(0);
        for (Pair<MapleBuffStat, Integer> statup : statups) {
            mplew.writeShort(statup.getRight().shortValue());
            mplew.writeShort(0);
            mplew.writeInt(buffid);
            mplew.writeInt(0);
            mplew.write(0);
            mplew.writeShort(bufflength);
        }
        mplew.writeShort(0);
        mplew.write(0);

        return mplew.getPacket();
    }
  /*public static MaplePacket sendYellowTip(String message) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort((int) 0x4A);
        mplew.write(5);
        mplew.writeMapleAsciiString(message);
        return mplew.getPacket();
    } */  //昨天修改
  
    public static MaplePacket showPirateBuff(int cid, int skillid, int time, List<Pair<MapleBuffStat, Integer>> statups) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        mplew.writeInt(cid);
        long mask = getLongMask(statups);
        mplew.writeLong(mask);
        mplew.writeLong(0);
        mplew.writeShort(0);
        for (Pair<MapleBuffStat, Integer> statup : statups) {
            mplew.writeShort(statup.getRight());
            mplew.writeShort(0);
            mplew.writeInt(skillid);
            mplew.writeInt(0);
            mplew.write(0);
            mplew.writeShort(time);
        }
        mplew.writeShort(0);

        return mplew.getPacket();
    }
}
