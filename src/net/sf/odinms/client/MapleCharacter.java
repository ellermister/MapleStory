/*
《该文件是RainOS服务端的核心文件之一》
目前版权 (C) 2010年   RainOS             <61954551@qq.com>
 * -----------------------------------------------------------*
之前人员 (C) 2008年   Huy              <patrick.huy@frz.cc>
Matthias Butz       <matze@odinms.de>
Jan Christian Meyer <vimes@odinms.de>
 * ------------------------------------------------------------*
◎该服务端目前维护人员:RainOS
◎这个文件是自由形式.你可以任意内容
◎这个程序发布的目的是期望它能有用@
◎如果你需要技术支持,可以联系更新/维护人员<QQ61954551>
◎你应该已经收到一份Affero GNU通用公共授权
-如果不是,请仔细查看http://www.gnu.org/licenses/*
 */
package net.sf.odinms.client;

import java.awt.Point;
import java.io.File;
import java.lang.ref.WeakReference;
import java.rmi.RemoteException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicInteger;
import java.text.NumberFormat;
import java.text.DecimalFormat;
import java.util.ConcurrentModificationException;
import java.util.Date;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.HashSet;
import java.util.StringTokenizer;
import java.util.logging.Level;
import static net.sf.odinms.client.MapleCharacter.getDefault;
import static net.sf.odinms.client.MapleCharacter.rand;
import static net.sf.odinms.client.MapleCharacter.tempban;
import static net.sf.odinms.client.MapleCharacter.tutorial;

import net.sf.odinms.client.anticheat.CheatTracker;
import net.sf.odinms.client.messages.ServernoticeMapleClientMessageCallback;
import net.sf.odinms.database.DatabaseConnection;
import net.sf.odinms.database.DatabaseException;
import net.sf.odinms.net.MaplePacket;
import net.sf.odinms.net.PacketProcessor;
import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.net.channel.handler.DueyActionHandler.Actions;
import net.sf.odinms.net.world.MapleMessenger;
import net.sf.odinms.net.world.MapleMessengerCharacter;
import net.sf.odinms.net.world.MapleParty;
import net.sf.odinms.net.world.MaplePartyCharacter;
import net.sf.odinms.net.world.PartyOperation;
import net.sf.odinms.net.world.PlayerBuffValueHolder;
import net.sf.odinms.net.world.PlayerCoolDownValueHolder;
import net.sf.odinms.net.world.remote.WorldChannelInterface;
import net.sf.odinms.scripting.event.EventInstanceManager;
import net.sf.odinms.server.MapleItemInformationProvider;
import net.sf.odinms.server.MaplePortal;
import net.sf.odinms.server.MapleStatEffect;
import net.sf.odinms.server.TimerManager;
import net.sf.odinms.server.life.MapleMonster;
import net.sf.odinms.server.maps.AbstractAnimatedMapleMapObject;
import net.sf.odinms.server.maps.MapleDoor;
import net.sf.odinms.server.maps.MapleMap;
import net.sf.odinms.server.maps.MapleMapFactory;
import net.sf.odinms.server.maps.MapleMapObject;
import net.sf.odinms.server.maps.MapleMapObjectType;
import net.sf.odinms.server.maps.MapleSummon;
import net.sf.odinms.server.maps.SavedLocationType;
import net.sf.odinms.server.maps.SummonMovementType;
import net.sf.odinms.server.quest.MapleCustomQuest;
import net.sf.odinms.server.quest.MapleQuest;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.Pair;
import net.sf.odinms.net.world.guild.*;
import net.sf.odinms.provider.MapleData;
import net.sf.odinms.provider.MapleDataProvider;
import net.sf.odinms.provider.MapleDataProviderFactory;
import net.sf.odinms.server.MapleAchievement;
import net.sf.odinms.server.MapleAchievements;
import net.sf.odinms.server.MapleInventoryManipulator;
import net.sf.odinms.server.MaplePlayerNPC;
import net.sf.odinms.server.life.MobSkill;
import net.sf.odinms.server.movement.LifeMovementFragment;
import net.sf.odinms.server.MapleMonsterCarnival;
import net.sf.odinms.server.MapleShop;
import net.sf.odinms.server.MapleStorage;
import net.sf.odinms.server.MapleTrade;
import net.sf.odinms.server.maps.MapleMapEffect;
import net.sf.odinms.server.playerinteractions.HiredMerchant;
import net.sf.odinms.server.playerinteractions.IPlayerInteractionManager;
import net.sf.odinms.server.playerinteractions.MaplePlayerShop;

public class MapleCharacter extends AbstractAnimatedMapleMapObject implements InventoryContainer {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(PacketProcessor.class);
    public static final double MAX_VIEW_RANGE_SQ = 850 * 850;
    private int world;
    private int accountid;
    private int rank;
    private int rankMove;
    private int jobRank;
    private int jobRankMove;
  //private int slot = 0;  //个人
    private int familyId;
    private String name;
    private int level;
    private int sg2;
    private int str,  dex,  luk,  int_;
    private AtomicInteger exp = new AtomicInteger();
    private int hp,  maxhp;
    private int mp,  maxmp;
    private int mpApUsed,  hpApUsed;
    private int hair,  face;
    private AtomicInteger meso = new AtomicInteger();
    private int remainingAp,  remainingSp;
    private int savedLocations[];
    private int fame;
    private long lastfametime;
    private List<Integer> lastmonthfameids;
    // local stats represent current stats of the player to avoid expensive operations
    private transient int localmaxhp,  localmaxmp;
    private transient int localstr,  localdex,  localluk,  localint_;
    private transient int magic,  watk;
    private transient double speedMod,  jumpMod;
    private transient int localmaxbasedamage;
    private int id;
    private MapleClient client;
    private MapleMap map;
    private int initialSpawnPoint;
    // mapid is only used when calling getMapId() with map == null, it is not updated when running in channelserver mode
    private int mapid;
    private int cygnusLinkId = 0;
    private MapleShop shop = null;
    private MapleStorage storage = null;
    private SkillMacro[] skillMacros = new SkillMacro[5];
    private MapleTrade trade = null;
    private MapleSkinColor skinColor = MapleSkinColor.NORMAL;
    private MapleJob job = MapleJob.BEGINNER;
    private int gender;
    private int GMLevel;
    private boolean invincible;
    private boolean hidden = false;
    private boolean canDoor = true;
    private int chair;
    private int itemEffect;
    private int APQScore;
    private MapleParty party;
    private EventInstanceManager eventInstance = null;
    private MapleInventory[] inventory;
    private Map<MapleQuest, MapleQuestStatus> quests;
    private Set<MapleMonster> controlled = new LinkedHashSet<MapleMonster>();
    private Set<MapleMapObject> visibleMapObjects = new LinkedHashSet<MapleMapObject>();
    private Map<ISkill, SkillEntry> skills = new LinkedHashMap<ISkill, SkillEntry>();
    private Map<MapleBuffStat, MapleBuffStatValueHolder> effects = new EnumMap<MapleBuffStat, MapleBuffStatValueHolder>(MapleBuffStat.class);
    private Map<Integer, MapleKeyBinding> keymap = new LinkedHashMap<Integer, MapleKeyBinding>();
    private List<MapleDoor> doors = new ArrayList<MapleDoor>();
    private ArrayList<Integer> excluded = new ArrayList<Integer>();
    private Map<Integer, MapleSummon> summons = new LinkedHashMap<Integer, MapleSummon>();
    private BuddyList buddylist;
    private Map<Integer, MapleCoolDownValueHolder> coolDowns = new LinkedHashMap<Integer, MapleCoolDownValueHolder>();
    // anticheat related information
    private CheatTracker anticheat;
    private ScheduledFuture<?> dragonBloodSchedule;
    private ScheduledFuture<?> mapTimeLimitTask = null;
    //guild related information
    private int guildid;
    private int guildrank,  allianceRank;
    private MapleGuildCharacter mgc = null;
    // cash shop related information
    private int paypalnx;
    private int maplepoints;
    private int cardnx;
    // misc information
    private List<MapleDisease> diseases = new ArrayList<MapleDisease>();
    private boolean incs;
    private boolean inmts;
    private MapleMessenger messenger = null;
    int messengerposition = 4;
    private int slots = 0;
    private ScheduledFuture<?> hpDecreaseTask;
    private ScheduledFuture<?> beholderHealingSchedule;
    private ScheduledFuture<?> beholderBuffSchedule;
    private ScheduledFuture<?> BerserkSchedule;
    private MapleCSInventory csinventory;
    private boolean Berserk = false;
    public SummonMovementType getMovementType;
    private String chalktext; // Chalkboard
    private int team;
    private int canTalk;
    private int zakumLvl; // zero means they havent started yet
    //marriage
    private int married;
    private int partnerid;
    private int marriageQuestLevel;
    private List<LifeMovementFragment> lastres;
    // enable/disable smegas - player command
    private boolean smegaEnabled = true;
    private long afkTimer = 0;
    private long loggedInTimer = 0;
    private boolean isEnteringPortal = false;
    private int currentPage = 0,  currentType = 0,  currentTab = 1;
    private int energybar = 0;
    ScheduledFuture energyDecrease = null;
    private int hppot = 0;
    private int mppot = 0;
    private int bossPoints;
    private int bossRepeats;
    private long nextBQ = 0;
    private boolean hasMerchant;
    private boolean playerNPC;
    private int battleshipHP;
    private MapleMount maplemount;
    private List<Integer> finishedAchievements = new ArrayList<Integer>();
    private boolean banned = false; //Prevent evading GM police with ccing
    private boolean needsParty = false;
    private int needsPartyMinLevel;
    private int needsPartyMaxLevel;
    //CPQ
    private boolean CPQChallenged = false;
    private int CP = 0;
    private int totalCP = 0;
    private MapleMonsterCarnival monsterCarnival;
    private int CPQRanking = 0;
    private int autoHpPot,  autoMpPot;
    private Point lastPortalPoint;
    private boolean partyInvite;
    private long lastSave;
    private boolean muted;
    Calendar unmuteTime = null;
    private boolean godmode;
    private Map<Long, MapleStatEffect> buffsToCancel = new HashMap<Long, MapleStatEffect>();
    private boolean questDebug = false;
    private List<String> mapletips = new ArrayList<String>();
    //Present
    private int Present;
    //MonsterBook
    private int bookCover;
    private MonsterBook monsterbook;
    // shop
    private IPlayerInteractionManager interaction = null;
    // DOJO
    private int vanquisherStage;
    private int vanquisherKills;
    private int dojoPoints;
    private int lastDojoStage;
    private int dojoEnergy;
    private long dojoFinish;
    private boolean finishedDojoTutorial;
    private Map<Integer, String> entered = new LinkedHashMap<Integer, String>();
    //pets
    private MaplePet pet = null;
    private ScheduledFuture<?> fullnessSchedule;
    private ScheduledFuture<?> fullnessSchedule_1;
    private ScheduledFuture<?> fullnessSchedule_2;
    private List<MaplePet> pets = new ArrayList<MaplePet>();
    //WarningSystem
    private int Warning;
    //战神Combo
    private int combo = 0;
    //private int comboCount = 0;
    private int comboCounter = 0;
    private Byte hammerSlot = null;
    public int lastAttack;
    public static boolean tutorial = false;
    public ArrayList<String> ares_data = new ArrayList<String>();
    private List<String> blockedPortals = new ArrayList<String>();
    private int energyChargeLevel = 0;
    private ScheduledFuture<?> energyChargeSchedule;
    public int vip;
    private int menpai;
    public int pvpkills;
    public int pvpdeaths;
    public int reborns;
    private int csb;
    public int rw13;
    public int rw15;
    private long deadtime = 1000L;
    private long lasttime = 976867676767L;
    private long currenttime = 976867676767L;
 //币种
   /* public void gainNX(int nxchange) {
    this.paypalnx += nxchange;
  } */
    public void gainNX(int amount) {
    this.paypalnx += amount;
     saveToDB(true);
   }
    public int getNX() {
    return this.paypalnx;
  }
    private MapleCharacter() {
        setStance(0);
       inventory = new MapleInventory[MapleInventoryType.values().length];
        for (MapleInventoryType type : MapleInventoryType.values()) {
       inventory[type.ordinal()] = new MapleInventory(type, (byte) 100);
  }

        savedLocations = new int[SavedLocationType.values().length];
        for (int i = 0; i < SavedLocationType.values().length; i++) {
            savedLocations[i] = -1;
        }

        quests = new LinkedHashMap<MapleQuest, MapleQuestStatus>();
        anticheat = new CheatTracker(this);
        setPosition(new Point(0, 0));
    }
     public void dropMessage(String message) {
        client.getSession().write(MaplePacketCreator.serverNotice(isGM() ? 6 : 5, message));
    }
  
    public void dropMessage(int type, String message) {
        client.getSession().write(MaplePacketCreator.serverNotice(type, message));
    }  
     
   public void setfsbLog(String fsbid) {
    java.sql.Connection con = DatabaseConnection.getConnection();
    try {
      PreparedStatement ps = con.prepareStatement("insert into fsblog (characterid, fsbtype,accountid,account,charactername) values (?,?,?,?,?)");
      ps.setInt(1, this.id);
      ps.setString(2, fsbid);
      ps.setInt(3, getClient().getAccID());
      ps.setString(4, getClient().getAccountName());
      ps.setString(5, getClient().getPlayer().getName());
      ps.executeUpdate();
      ps.close();
    } catch (Exception Ex) {
      log.error("插入语句错误，请确认你的SQL密码正确且没有关闭。", Ex);
    }
  } 
    public void changeMap(MapleMap to) {
        changeMap(to, to.getPortal(0));
    }

    public void changeMap(final MapleMap to, final MaplePortal pto) {
        if (to.getId() == 100000200 || to.getId() == 211000100 || to.getId() == 220000300) {
            changeMapInternal(to, pto.getPosition(), MaplePacketCreator.getWarpToMap(to, pto.getId() - 2, this));
        } else {
            changeMapInternal(to, pto.getPosition(), MaplePacketCreator.getWarpToMap(to, pto.getId(), this));
        }
    }

    public void changeMap(final MapleMap to, final Point pos) {
        changeMapInternal(to, pos, MaplePacketCreator.getWarpToMap(to, 0x80, this));
    }

    public void changeMapBanish(int mapid, String portal, String msg) {
        dropMessage(6, msg);
        MapleMap map_ = ChannelServer.getInstance(client.getChannel()).getMapFactory().getMap(mapid);
        changeMap(map_, map_.getPortal(portal));
    }

    public MapleCharacter getThis() {
        return this;
    }

    public IPlayerInteractionManager getInteraction() {
        return interaction;
    }

    public void setInteraction(IPlayerInteractionManager box) {
        interaction = box;
    }

    public void message(String m) {
        dropMessage(5, m);        //6
    }

    public int addDojoPointsByMap() {
        int pts = 0;
        if (dojoPoints < 17000) {
            pts = 1 + ((getMap().getId() - 1) / 100 % 100) / 6;
            if (party != null) {
                int highest = level, lowest = level;
                for (MaplePartyCharacter mpc : party.getMembers())
                    if (mpc.getLevel() > highest)
                        highest = mpc.getLevel();
                    else if (mpc.getLevel() < lowest)
                        lowest = mpc.getLevel();
                pts += (highest - lowest < 30) ? 0 : -pts;
            } else
                pts++;
            this.dojoPoints += pts;
        }
        return pts;
    }

    public void addExcluded(int x) {
        excluded.add(x);
    }

    public void showMapleTips() {
        for (String s : mapletips) {
            client.getSession().write(MaplePacketCreator.serverNotice(5, s));
        }
    }

    public int getPresent() {
        return this.Present;
    }

    public void setPresent(int state) {
        this.Present = state;
    }

    public boolean getFinishedDojoTutorial() {
        return finishedDojoTutorial;
    }

    public MonsterBook getMonsterBook() {
        return monsterbook;
    }

    public int getMonsterBookCover() {
        return bookCover;
    }
public void maxAllSkills(int amount) {
        MapleDataProvider dataProvider = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("net.sf.odinms.wzpath") + "/" + "String.wz"));
        MapleData skilldData = dataProvider.getData("Skill.img");
        for (MapleData skill_ : skilldData.getChildren()) {
            try {
                ISkill skill = SkillFactory.getSkill(Integer.parseInt(skill_.getName()));
                if (GMLevel >= 0) {
                    changeSkillLevel(skill, skill.getMaxLevel(), skill.getMaxLevel());
                }
            } catch (NumberFormatException nfe) {
                break;
            } catch (NullPointerException npe) {
                continue;
            }
        }
    }

    public static MapleCharacter loadCharFromDB(int charid, MapleClient client, boolean channelserver) throws SQLException {
        MapleCharacter ret = new MapleCharacter();
        ret.client = client;
        ret.id = charid;

        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("SELECT * FROM characters WHERE id = ?");
        ps.setInt(1, charid);
        ResultSet rs = ps.executeQuery();
        if (!rs.next()) {
            throw new RuntimeException("Loading the Char Failed (char not found)");
        }
        ret.inventory[MapleInventoryType.EQUIP.ordinal()] = new MapleInventory(MapleInventoryType.EQUIP, (byte) rs.getInt("equipSlots"));
        ret.inventory[MapleInventoryType.USE.ordinal()] = new MapleInventory(MapleInventoryType.USE, (byte) rs.getInt("useSlots"));
        ret.inventory[MapleInventoryType.SETUP.ordinal()] = new MapleInventory(MapleInventoryType.SETUP, (byte) rs.getInt("setupSlots"));
        ret.inventory[MapleInventoryType.ETC.ordinal()] = new MapleInventory(MapleInventoryType.ETC, (byte) rs.getInt("etcSlots"));
        ret.inventory[MapleInventoryType.CASH.ordinal()] = new MapleInventory(MapleInventoryType.CASH, (byte) rs.getInt("cashSlots"));
        ret.name = rs.getString("name");
        ret.level = rs.getInt("level");
        ret.fame = rs.getInt("fame");
        ret.str = rs.getInt("str");
        ret.dex = rs.getInt("dex");
        ret.int_ = rs.getInt("int");
        ret.luk = rs.getInt("luk");
        ret.exp.set(rs.getInt("exp"));
        ret.hp = rs.getInt("hp");
        ret.maxhp = rs.getInt("maxhp");
        ret.mp = rs.getInt("mp");
        ret.maxmp = rs.getInt("maxmp");
        ret.hpApUsed = rs.getInt("hpApUsed");
        ret.mpApUsed = rs.getInt("mpApUsed");
        ret.hasMerchant = rs.getInt("HasMerchant") == 1;
        ret.remainingSp = rs.getInt("sp");
        ret.remainingAp = rs.getInt("ap");
        ret.meso.set(rs.getInt("meso"));
        ret.GMLevel = rs.getInt("gm");
        ret.vip = rs.getInt("vip");
        ret.pvpkills = rs.getInt("pvpkills");
        ret.csb = rs.getInt("csb");
	ret.reborns = rs.getInt("reborns");
	ret.pvpdeaths = rs.getInt("pvpdeaths");
        int mountexp = rs.getInt("mountexp");
        int mountlevel = rs.getInt("mountlevel");
        int mounttiredness = rs.getInt("mounttiredness");
        ret.skinColor = MapleSkinColor.getById(rs.getInt("skincolor"));
        ret.gender = rs.getInt("gender");
        ret.job = MapleJob.getById(rs.getInt("job"));
        ret.canTalk = rs.getInt("cantalk"); //cantalk
        ret.married = rs.getInt("married"); //marriage
        ret.partnerid = rs.getInt("partnerid");
        ret.marriageQuestLevel = rs.getInt("marriagequest");
        ret.zakumLvl = rs.getInt("zakumLvl");
        ret.hair = rs.getInt("hair");
        ret.face = rs.getInt("face");
        ret.finishedDojoTutorial = rs.getInt("finishedDojoTutorial") == 1;
        ret.dojoPoints = rs.getInt("dojoPoints");
        ret.lastDojoStage = rs.getInt("lastDojoStage");
        ret.vanquisherKills = rs.getInt("vanquisherKills");
        ret.vanquisherStage = rs.getInt("vanquisherStage");            
        ret.accountid = rs.getInt("accountid");
        ret.mapid = rs.getInt("map");
        ret.initialSpawnPoint = rs.getInt("spawnpoint");
        ret.world = rs.getInt("world");
        ret.bookCover = rs.getInt("monsterbookcover");
        ret.monsterbook = new MonsterBook();
        ret.monsterbook.loadCards(charid);
        ret.rank = rs.getInt("rank");
        ret.rankMove = rs.getInt("rankMove");
        ret.jobRank = rs.getInt("jobRank");
        ret.jobRankMove = rs.getInt("jobRankMove");
        ret.familyId = rs.getInt("familyId");
        ret.guildid = rs.getInt("guildid");
        ret.guildrank = rs.getInt("guildrank");
        if (ret.guildid > 0) {
            ret.mgc = new MapleGuildCharacter(ret);
        }
        ret.allianceRank = rs.getInt("alliancerank");
        ret.Warning = rs.getInt("Warning");
        int buddyCapacity = rs.getInt("buddyCapacity");
        ret.buddylist = new BuddyList(buddyCapacity);
        ret.autoHpPot = rs.getInt("autoHpPot");
        ret.autoMpPot = rs.getInt("autoMpPot");
        ret.bossPoints = rs.getInt("bosspoints");
        ret.bossRepeats = rs.getInt("bossrepeats");
        ret.nextBQ = rs.getLong("nextBQ");
        ret.muted = rs.getInt("muted") == 1 ? true : false;
        ret.playerNPC = rs.getInt("playerNPC") > 0 ? true : false;
        Calendar c = Calendar.getInstance();
        c.setTime(new Date(rs.getLong("unmutetime")));
        ret.unmuteTime = c;
        if (channelserver) {
            MapleMapFactory mapFactory = ChannelServer.getInstance(client.getChannel()).getMapFactory();
            ret.map = mapFactory.getMap(ret.mapid);
            if (ret.map == null) { //char is on a map that doesn't exist warp it to henesys
                ret.map = mapFactory.getMap(100000000);
            } else if (ret.map.getForcedReturnId() != 999999999) {
                ret.map = mapFactory.getMap(ret.map.getForcedReturnId());
            }
            MaplePortal portal = ret.map.getPortal(ret.initialSpawnPoint);
            if (portal == null) {
                portal = ret.map.getPortal(0); // char is on a spawnpoint that doesn't exist - select the first spawnpoint instead
                ret.initialSpawnPoint = 0;
            }
            ret.setPosition(portal.getPosition());

            int partyid = rs.getInt("party");
            if (partyid >= 0) {
                try {
                    MapleParty party = client.getChannelServer().getWorldInterface().getParty(partyid);
                    if (party != null && party.getMemberById(ret.id) != null) {
                        ret.party = party;
                    }
                } catch (RemoteException e) {
                    client.getChannelServer().reconnectWorld();
                }
            }

            int messengerid = rs.getInt("messengerid");
            int position = rs.getInt("messengerposition");
            if (messengerid > 0 && position < 4 && position > -1) {
                try {
                    WorldChannelInterface wci = ChannelServer.getInstance(client.getChannel()).getWorldInterface();
                    MapleMessenger messenger = wci.getMessenger(messengerid);
                    if (messenger != null) {
                        ret.messenger = messenger;
                        ret.messengerposition = position;
                    }
                } catch (RemoteException e) {
                    client.getChannelServer().reconnectWorld();
                }
            }
        }

        rs.close();
        ps.close();

        ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
        ps.setInt(1, ret.accountid);
        rs = ps.executeQuery();
        while (rs.next()) {
            ret.getClient().setAccountName(rs.getString("name"));
            ret.paypalnx = rs.getInt("paypalNX");
            ret.maplepoints = rs.getInt("mPoints");
            ret.cardnx = rs.getInt("cardNX");

            ret.Present = rs.getInt("Present");
            //ret.donatorpoints = rs.getInt("donatorpoints");
        }
        rs.close();
        ps.close();

        String sql = "SELECT * FROM inventoryitems " + "LEFT JOIN inventoryequipment USING (inventoryitemid) " + "WHERE characterid = ?";
        if (!channelserver) {
            sql += " AND inventorytype = " + MapleInventoryType.EQUIPPED.getType();
        }
        ps = con.prepareStatement(sql);
        ps.setInt(1, charid);
        rs = ps.executeQuery();
        while (rs.next()) {
            MapleInventoryType type = MapleInventoryType.getByType((byte) rs.getInt("inventorytype"));
            Timestamp expiration = rs.getTimestamp("expiredate");
            Timestamp currenttime = new Timestamp(System.currentTimeMillis());
            if (type.equals(MapleInventoryType.EQUIP) || type.equals(MapleInventoryType.EQUIPPED)) {
                int itemid = rs.getInt("itemid");
                Equip equip = new Equip(itemid, (byte) rs.getInt("position"));
                if (rs.getBoolean("isRing")) {
                    equip = MapleRing.loadFromDb(itemid, (byte) rs.getInt("position"), rs.getInt("uniqueid"));
                    log.info("ring loaded");
                } else {
                    equip.setOwner(rs.getString("owner"));
                    equip.setQuantity((short) rs.getInt("quantity"));
                    equip.setAcc((short) rs.getInt("acc"));
                    equip.setAvoid((short) rs.getInt("avoid"));
                    equip.setDex((short) rs.getInt("dex"));
                    equip.setHands((short) rs.getInt("hands"));
                    equip.setHp((short) rs.getInt("hp"));
                    equip.setInt((short) rs.getInt("int"));
                    equip.setJump((short) rs.getInt("jump"));
                    equip.setLuk((short) rs.getInt("luk"));
                    equip.setMatk((short) rs.getInt("matk"));
                    equip.setMdef((short) rs.getInt("mdef"));
                    equip.setMp((short) rs.getInt("mp"));
                    equip.setSpeed((short) rs.getInt("speed"));
                    equip.setStr((short) rs.getInt("str"));
                    equip.setWatk((short) rs.getInt("watk"));
                    equip.setWdef((short) rs.getInt("wdef"));
                    equip.setUpgradeSlots((byte) rs.getInt("upgradeslots"));
                    equip.setLocked((byte) rs.getInt("locked"));
                    equip.setLevel((byte) rs.getInt("level"));
                    equip.setFlag((byte) rs.getInt("flag"));
                    equip.setVicious((short) rs.getInt("vicious"));
                    equip.setUniqueId(rs.getInt("uniqueid"));
                }
                if (expiration != null) {
                    if (!currenttime.after(expiration)) {
                        equip.setExpiration(expiration);
                        ret.getInventory(type).addFromDB(equip);
                    } else {
                        String name = MapleItemInformationProvider.getInstance().getName(itemid);
                        ret.mapletips.add("现金道具 [" + name + "] 已过期道具被清除了。");
                    }
                } else {
                    ret.getInventory(type).addFromDB(equip);
                }
            } else {
                Item item = new Item(rs.getInt("itemid"), (byte) rs.getInt("position"), (short) rs.getInt("quantity"));
                item.setOwner(rs.getString("owner"));
                item.setUniqueId(rs.getInt("uniqueid"));
                if (expiration != null) {
                    if (!currenttime.after(expiration)) {
                        item.setExpiration(expiration);
                        ret.getInventory(type).addFromDB(item);
                        if (rs.getInt("itemid") >= 5000000 && rs.getInt("itemid") <= 5000100) {
                            if (rs.getInt("petslot") > 0) {
                                int index = rs.getInt("petslot") - 1;
                                MaplePet pet = MaplePet.loadFromDb(item.getItemId(), item.getPosition(), item.getUniqueId());
                                Point pos = ret.getPosition();
                                pos.y -= 12;
                                pet.setPos(pos);
                                pet.setFh(ret.getMap().getFootholds().findBelow(pet.getPos()).getId());
                                pet.setStance(0);
                                int hunger = PetDataFactory.getHunger(pet.getItemId());
                                if (index > ret.getPets().size()) {
                                    ret.getPets().add(pet);
                                    ret.startFullnessSchedule(hunger, pet, ret.getPetSlot(pet));
                                } else {
                                    ret.getPets().add(index, pet);
                                    ret.startFullnessSchedule(hunger, pet, ret.getPetSlot(pet));
                                }
                            }
                        }
                    } else {
                        String name = MapleItemInformationProvider.getInstance().getName(rs.getInt("itemid"));
                        ret.mapletips.add("现金道具 [" + name + "] 已过期道具被清除了。");
                    }
                } else {
                    ret.getInventory(type).addFromDB(item);
                }
            }
        }
        rs.close();
        ps.close();

        if (channelserver) {
            ps = con.prepareStatement("SELECT * FROM queststatus WHERE characterid = ?");
            ps.setInt(1, charid);
            rs = ps.executeQuery();
            PreparedStatement pse = con.prepareStatement("SELECT * FROM queststatusmobs WHERE queststatusid = ?");
            while (rs.next()) {
                MapleQuest q = MapleQuest.getInstance(rs.getInt("quest"));
                MapleQuestStatus status = new MapleQuestStatus(q, MapleQuestStatus.Status.getById(rs.getInt("status")));
                long cTime = rs.getLong("time");
                if (cTime > -1) {
                    status.setCompletionTime(cTime * 1000);
                }
                status.setForfeited(rs.getInt("forfeited"));
                ret.quests.put(q, status);
                pse.setInt(1, rs.getInt("queststatusid"));
                ResultSet rsMobs = pse.executeQuery();
                while (rsMobs.next()) {
                    status.setMobKills(rsMobs.getInt("mob"), rsMobs.getInt("count"));
                }
                rsMobs.close();
            }
            rs.close();
            ps.close();
            pse.close();

            ps = con.prepareStatement("SELECT skillid,skilllevel,masterlevel FROM skills WHERE characterid = ?");
            ps.setInt(1, charid);
            rs = ps.executeQuery();
            while (rs.next()) {
                ret.skills.put(SkillFactory.getSkill(rs.getInt("skillid")), new SkillEntry(rs.getInt("skilllevel"), rs.getInt("masterlevel")));
            }
            rs.close();
            ps.close();

            ps = con.prepareStatement("SELECT * FROM skillmacros WHERE characterid = ?");
            ps.setInt(1, charid);
            rs = ps.executeQuery();
            while (rs.next()) {
                int skill1 = rs.getInt("skill1");
                int skill2 = rs.getInt("skill2");
                int skill3 = rs.getInt("skill3");
                String name = rs.getString("name");
                int shout = rs.getInt("shout");
                int position = rs.getInt("position");
                SkillMacro macro = new SkillMacro(skill1, skill2, skill3, name, shout, position);
                ret.skillMacros[position] = macro;
            }
            rs.close();
            ps.close();

            ps = con.prepareStatement("SELECT `key`,`type`,`action` FROM keymap WHERE characterid = ?");
            ps.setInt(1, charid);
            rs = ps.executeQuery();
            while (rs.next()) {
                int key = rs.getInt("key");
                int type = rs.getInt("type");
                int action = rs.getInt("action");
                ret.keymap.put(Integer.valueOf(key), new MapleKeyBinding(type, action));
            }
            rs.close();
            ps.close();

            ps = con.prepareStatement("SELECT `locationtype`,`map` FROM savedlocations WHERE characterid = ?");
            ps.setInt(1, charid);
            rs = ps.executeQuery();
            while (rs.next()) {
                String locationType = rs.getString("locationtype");
                int mapid = rs.getInt("map");
                ret.savedLocations[SavedLocationType.valueOf(locationType).ordinal()] = mapid;
            }
            rs.close();
            ps.close();

            ps = con.prepareStatement("SELECT `characterid_to`,`when` FROM famelog WHERE characterid = ? AND DATEDIFF(NOW(),`when`) < 30");
            ps.setInt(1, charid);
            rs = ps.executeQuery();
            ret.lastfametime = 0;
            ret.lastmonthfameids = new ArrayList<Integer>(31);
            while (rs.next()) {
                ret.lastfametime = Math.max(ret.lastfametime, rs.getTimestamp("when").getTime());
                ret.lastmonthfameids.add(Integer.valueOf(rs.getInt("characterid_to")));
            }
            rs.close();
            ps.close();

            ps = con.prepareStatement("SELECT ares_data FROM char_ares_info WHERE charid = ?");
            ps.setInt(1, charid);
            rs = ps.executeQuery();
            while (rs.next()) {
                ret.ares_data.add(rs.getString("ares_data"));
            }
            rs.close();
            ps.close();
            ret.buddylist.loadFromDb(charid);
            ret.storage = MapleStorage.loadOrCreateFromDB(ret.accountid);
        }

        String achsql = "SELECT * FROM achievements WHERE accountid = ?";
        ps = con.prepareStatement(achsql);
        ps.setInt(1, ret.accountid);
        rs = ps.executeQuery();
        while (rs.next()) {
            ret.finishedAchievements.add(rs.getInt("achievementid"));
        }
        rs.close();
        ps.close();
        int mountid = ret.getJobType() * 20000000 + 1004;
        if (ret.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -18) != null) {
            ret.maplemount = new MapleMount(ret, ret.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -18).getItemId(), mountid);
            ret.maplemount.setExp(mountexp);
            ret.maplemount.setLevel(mountlevel);
            ret.maplemount.setTiredness(mounttiredness);
            ret.maplemount.setActive(false);
        } else {
            ret.maplemount = new MapleMount(ret, 0, mountid);
            ret.maplemount.setExp(mountexp);
            ret.maplemount.setLevel(mountlevel);
            ret.maplemount.setTiredness(mounttiredness);
            ret.maplemount.setActive(false);
        }
        ret.recalcLocalStats();
        ret.silentEnforceMaxHpMp();
        ISkill ship = SkillFactory.getSkill(5221006);
        ret.battleshipHP = (ret.getSkillLevel(ship) * 4000) + ((ret.getLevel() - 120) * 2000);
        ret.loggedInTimer = System.currentTimeMillis();
        return ret;
    }

    public static MapleCharacter getDefault(MapleClient client, int chrid) {
        MapleCharacter ret = getDefault(client);
        ret.id = chrid;
        return ret;
    }

    public static MapleCharacter getDefault(MapleClient client) {
        MapleCharacter ret = new MapleCharacter();
        ret.client = client;
        ret.inventory[MapleInventoryType.EQUIP.ordinal()] = new MapleInventory(MapleInventoryType.EQUIP, (byte) 24);
        ret.inventory[MapleInventoryType.USE.ordinal()] = new MapleInventory(MapleInventoryType.USE, (byte) 24);
        ret.inventory[MapleInventoryType.SETUP.ordinal()] = new MapleInventory(MapleInventoryType.SETUP, (byte) 24);
        ret.inventory[MapleInventoryType.ETC.ordinal()] = new MapleInventory(MapleInventoryType.ETC, (byte) 24);
        ret.inventory[MapleInventoryType.CASH.ordinal()] = new MapleInventory(MapleInventoryType.CASH, (byte) 50);
        ret.hp = 50;
        ret.maxhp = 50;
        ret.mp = 50;
        ret.maxmp = 50;
        ret.map = null;
        ret.exp.set(0);
        ret.GMLevel = 0;
        ret.vip = 0;
        ret.reborns = 0;
        ret.pvpdeaths = 0;
        ret.pvpkills = 0;
        ret.job = MapleJob.BEGINNER;
        ret.meso.set(10000);
        ret.level = 1;
        ret.accountid = client.getAccID();
        ret.buddylist = new BuddyList(20);
        ret.bookCover = 0;
        ret.maplemount = null;
        ret.CP = 0;
        ret.totalCP = 0;
        ret.team = -1;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps;
            ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
            ps.setInt(1, ret.accountid);
            ResultSet rs = ps.executeQuery();
            rs = ps.executeQuery();
            while (rs.next()) {
                ret.getClient().setAccountName(rs.getString("name"));
                ret.paypalnx = rs.getInt("paypalNX");
                ret.maplepoints = rs.getInt("mPoints");
                ret.cardnx = rs.getInt("cardNX");              
                ret.Present = rs.getInt("Present");
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            log.error("ERROR", e);
        }
        ret.incs = false;
        ret.inmts = false;
        ret.APQScore = 0;
        ret.allianceRank = 5;
        ret.keymap.put(Integer.valueOf(2), new MapleKeyBinding(4, 10));
        ret.keymap.put(Integer.valueOf(3), new MapleKeyBinding(4, 12));
        ret.keymap.put(Integer.valueOf(4), new MapleKeyBinding(4, 13));
        ret.keymap.put(Integer.valueOf(5), new MapleKeyBinding(4, 18));
        ret.keymap.put(Integer.valueOf(6), new MapleKeyBinding(4, 24));
        ret.keymap.put(Integer.valueOf(7), new MapleKeyBinding(4, 21));
        ret.keymap.put(Integer.valueOf(16), new MapleKeyBinding(4, 8));
        ret.keymap.put(Integer.valueOf(17), new MapleKeyBinding(4, 5));
        ret.keymap.put(Integer.valueOf(18), new MapleKeyBinding(4, 0));
        ret.keymap.put(Integer.valueOf(19), new MapleKeyBinding(4, 4));
        ret.keymap.put(Integer.valueOf(23), new MapleKeyBinding(4, 1));
        ret.keymap.put(Integer.valueOf(25), new MapleKeyBinding(4, 19));
        ret.keymap.put(Integer.valueOf(26), new MapleKeyBinding(4, 14));
        ret.keymap.put(Integer.valueOf(27), new MapleKeyBinding(4, 15));
        ret.keymap.put(Integer.valueOf(29), new MapleKeyBinding(5, 52));
        ret.keymap.put(Integer.valueOf(31), new MapleKeyBinding(4, 2));
        ret.keymap.put(Integer.valueOf(34), new MapleKeyBinding(4, 17));
        ret.keymap.put(Integer.valueOf(35), new MapleKeyBinding(4, 11));
        ret.keymap.put(Integer.valueOf(37), new MapleKeyBinding(4, 3));
        ret.keymap.put(Integer.valueOf(38), new MapleKeyBinding(4, 20));
        ret.keymap.put(Integer.valueOf(40), new MapleKeyBinding(4, 16));
        ret.keymap.put(Integer.valueOf(41), new MapleKeyBinding(4, 23));
        ret.keymap.put(Integer.valueOf(43), new MapleKeyBinding(4, 9));
        ret.keymap.put(Integer.valueOf(44), new MapleKeyBinding(5, 50));
        ret.keymap.put(Integer.valueOf(45), new MapleKeyBinding(5, 51));
        ret.keymap.put(Integer.valueOf(46), new MapleKeyBinding(4, 6));
        ret.keymap.put(Integer.valueOf(48), new MapleKeyBinding(4, 22));
        ret.keymap.put(Integer.valueOf(50), new MapleKeyBinding(4, 7));
        ret.keymap.put(Integer.valueOf(56), new MapleKeyBinding(5, 53));
        ret.keymap.put(Integer.valueOf(57), new MapleKeyBinding(5, 54));
        ret.keymap.put(Integer.valueOf(59), new MapleKeyBinding(6, 100));
        ret.keymap.put(Integer.valueOf(60), new MapleKeyBinding(6, 101));
        ret.keymap.put(Integer.valueOf(61), new MapleKeyBinding(6, 102));
        ret.keymap.put(Integer.valueOf(62), new MapleKeyBinding(6, 103));
        ret.keymap.put(Integer.valueOf(63), new MapleKeyBinding(6, 104));
        ret.keymap.put(Integer.valueOf(64), new MapleKeyBinding(6, 105));
        ret.keymap.put(Integer.valueOf(65), new MapleKeyBinding(6, 106));

        ret.recalcLocalStats();

        return ret;
    }

    public void saveToDB(boolean update) {
        Connection con = DatabaseConnection.getConnection();
        try {
            con.setTransactionIsolation(Connection.TRANSACTION_READ_UNCOMMITTED);
            con.setAutoCommit(false);
            PreparedStatement ps;
            if (update) {
                ps = con.prepareStatement("UPDATE characters SET level = ?, fame = ?, str = ?, dex = ?, luk = ?, `int` = ?, exp = ?, hp = ?, mp = ?, maxhp = ?, maxmp = ?, sp = ?, ap = ?, gm = ?, skincolor = ?, gender = ?, job = ?, hair = ?, face = ?, map = ?, meso = ?, hpApUsed = ?, mpApUsed = ?, spawnpoint = ?, party = ?, buddyCapacity = ?, autoHpPot = ?, autoMpPot = ?, messengerid = ?, messengerposition = ?, married = ?, partnerid = ?, cantalk = ?, zakumlvl = ?, marriagequest = ?, bosspoints = ?, bossrepeats = ?, nextBQ = ?, playerNPC = ?, alliancerank = ?, muted = ?, unmutetime = ?, equipSlots = ?, useSlots = ?, setupSlots = ?, etcSlots = ?, cashSlots = ?, monsterbookcover = ?, mountlevel = ?, mountexp = ?, mounttiredness = ?, dojoPoints = ?, lastDojoStage = ?, finishedDojoTutorial = ?, vanquisherStage = ?, vanquisherKills = ?, vip = ?, reborns = ?, pvpkills = ?, pvpdeaths = ?, menpai = ?, csb = ?, rw13 = ?, rw15 = ?, Warning = ? WHERE id = ?");
            } else {
                ps = con.prepareStatement("INSERT INTO characters (level, fame, str, dex, luk, `int`, exp, hp, mp, maxhp, maxmp, sp, ap, gm, skincolor, gender, job, hair, face, map, meso, hpApUsed, mpApUsed, spawnpoint, party, buddyCapacity, autoHpPot, autoMpPot, messengerid, messengerposition, married, partnerid, cantalk, zakumlvl, marriagequest, bosspoints, bossrepeats, nextBQ, playerNPC, alliancerank, muted, unmutetime, equipSlots, useSlots, setupSlots, etcSlots, cashSlots, monsterbookcover, mountlevel, mountexp, mounttiredness, dojopoints, lastDojoStage, finishedDojoTutorial, vanquisherStage, vanquisherKills, Warning, vip, reborns, pvpkills, pvpdeaths, menpai, csb, rw13, rw15, accountid, name, world) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
             } 
            ps.setInt(1, level);
            ps.setInt(2, fame);
            ps.setInt(3, str);
            ps.setInt(4, dex);          
            ps.setInt(5, luk);
            ps.setInt(6, int_);
            ps.setInt(7, exp.get());
            ps.setInt(8, hp);
            ps.setInt(9, mp);
            ps.setInt(10, maxhp);
            ps.setInt(11, maxmp);
            ps.setInt(12, remainingSp);
            ps.setInt(13, remainingAp);
            ps.setInt(14, GMLevel);
            ps.setInt(15, skinColor.getId());
            ps.setInt(16, gender);
            ps.setInt(17, job.getId());
            ps.setInt(18, hair);
            ps.setInt(19, face);
     if (map == null) {
                if (!update && job.getId() == 1000) {
                    ps.setInt(20, 130030000); //骑士团出生地
                } else {
                    if (!update && job.getId() == 2000) {
                    ps.setInt(20, 914000000);   //战神出生地
                } else {
                    ps.setInt(20, 0);     //冒险家出生地
                }
                }
            } else {
                if (map.getForcedReturnId() != 999999999) {
                    ps.setInt(20, map.getForcedReturnId());
                } else {
                    ps.setInt(20, map.getId());
                }
            }
                 if (map == null) {
                ps.setInt(20, 0);
            } else {
                if (map.getId() == 677000013 || map.getId() == 677000012) { 
                    ps.setInt(20, 970030002);
                } else {
                    ps.setInt(20, map.getId());
                }
            }
            ps.setInt(21, meso.get());
            ps.setInt(22, hpApUsed);
            ps.setInt(23, mpApUsed);
            if (map == null || map.getId() == 610020000 || map.getId() == 610020001) {           //677000013 任务图1  //677000012 任务图2
                ps.setInt(24, 0);
            } else {
                MaplePortal closest = map.findClosestSpawnpoint(getPosition());
                if (closest != null) {
                    ps.setInt(24, closest.getId());
                } else {
                    ps.setInt(24, 0);
                }
            }
            if (party != null) {
                ps.setInt(25, party.getId());
            } else {
                ps.setInt(25, 0);
            }
            ps.setInt(26, buddylist.getCapacity());
            if (autoHpPot != 0 && getItemAmount(autoHpPot) >= 1) {
                ps.setInt(27, autoHpPot);
            } else {
                ps.setInt(27, 0);
            }
            if (autoMpPot != 0 && getItemAmount(autoMpPot) >= 1) {
                ps.setInt(28, autoMpPot);
            } else {
                ps.setInt(28, 0);
            }
            if (messenger != null) {
                ps.setInt(29, messenger.getId());
                ps.setInt(30, messengerposition);
            } else {
                ps.setInt(29, 0);
                ps.setInt(30, 4);
            }

            ps.setInt(31, married);
            ps.setInt(32, partnerid);
            ps.setInt(33, canTalk);
            if (zakumLvl <= 2) { // Don't let zakumLevel exceed three ;)
                ps.setInt(34, zakumLvl);
            } else {
                ps.setInt(34, 2);
            }
            ps.setInt(35, marriageQuestLevel);
            ps.setInt(36, bossPoints);
            ps.setInt(37, bossRepeats);
            ps.setLong(38, nextBQ);
            ps.setInt(39, playerNPC ? 1 : 0);
            ps.setInt(40, allianceRank);
            ps.setInt(41, muted ? 1 : 0);
            ps.setLong(42, unmuteTime == null ? 0 : unmuteTime.getTimeInMillis());
            ps.setInt(43, getInventory(MapleInventoryType.EQUIP).getSlots());
            ps.setInt(44, getInventory(MapleInventoryType.USE).getSlots());
            ps.setInt(45, getInventory(MapleInventoryType.SETUP).getSlots());
            ps.setInt(46, getInventory(MapleInventoryType.ETC).getSlots());
            ps.setInt(47, getInventory(MapleInventoryType.CASH).getSlots());
            ps.setInt(48, bookCover);

            if (maplemount != null) {
                ps.setInt(49, maplemount.getLevel());
                ps.setInt(50, maplemount.getExp());
                ps.setInt(51, maplemount.getTiredness());
            } else {
                ps.setInt(49, 1);
                ps.setInt(50, 0);
                ps.setInt(51, 0);
            }
            ps.setInt(52, dojoPoints);
            ps.setInt(53, lastDojoStage);
            ps.setInt(54, finishedDojoTutorial ? 1 : 0);
            ps.setInt(55, vanquisherStage);
            ps.setInt(56, vanquisherKills);
	    ps.setInt(57, vip);
	    ps.setInt(58, reborns);
	    ps.setInt(59, pvpkills);
	    ps.setInt(60, pvpdeaths);
            ps.setInt(61, menpai);
            ps.setInt(62, csb);
            ps.setInt(63, rw13);
            ps.setInt(64, rw15);
            ps.setInt(65, Warning);
		if (update)
		{
			ps.setInt(66, id);
		} else
		{
			ps.setInt(66, accountid);
			ps.setString(67, name);
			ps.setInt(68, world);

            }
            int updateRows = ps.executeUpdate();
            if (!update) {
                ResultSet rs = ps.getGeneratedKeys();
                if (rs.next()) {
                    this.id = rs.getInt(1);
                } else {
                    throw new DatabaseException("Inserting char failed.");
                }
            } else if (updateRows < 1) {
                throw new DatabaseException("Character not in database (" + id + ")");
            }
            ps.close();

	    for (MaplePet pettt : pets) {
		pettt.saveToDb();
	    }

            ps = con.prepareStatement("DELETE FROM skillmacros WHERE characterid = ?");
            ps.setInt(1, id);
            ps.executeUpdate();
            ps.close();

            for (int i = 0; i < 5; i++) {
                SkillMacro macro = skillMacros[i];
                if (macro != null) {
                    ps = con.prepareStatement("INSERT INTO skillmacros (characterid, skill1, skill2, skill3, name, shout, position) VALUES (?, ?, ?, ?, ?, ?, ?)");

                    ps.setInt(1, id);
                    ps.setInt(2, macro.getSkill1());
                    ps.setInt(3, macro.getSkill2());
                    ps.setInt(4, macro.getSkill3());
                    ps.setString(5, macro.getName());
                    ps.setInt(6, macro.getShout());
                    ps.setInt(7, i);

                    ps.executeUpdate();
                    ps.close();
                }
            }
            if (csinventory != null) {
                getCSInventory().saveToDB();
            }

            ps = con.prepareStatement("DELETE FROM inventoryitems WHERE characterid = ?");
            ps.setInt(1, id);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("INSERT INTO inventoryitems (characterid, itemid, inventorytype, position, quantity, owner, expiredate, uniqueid, petslot) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            PreparedStatement pse = con.prepareStatement("INSERT INTO inventoryequipment VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            for (MapleInventory iv : inventory) {
                ps.setInt(3, iv.getType().getType());
                for (IItem item : iv.list()) {
                    ps.setInt(1, id);
                    ps.setInt(2, item.getItemId());
                    ps.setInt(4, item.getPosition());
                    ps.setInt(5, item.getQuantity());
                    ps.setString(6, item.getOwner());
                    if (item.getExpiration() != null) {
                        ps.setTimestamp(7, item.getExpiration());
                    } else {
                        ps.setTimestamp(7, null);
                    }
                    ps.setInt(8, item.getUniqueId());
		    if (getPetByUniqueId(item.getUniqueId()) > -1) {
			ps.setInt(9, getPetByUniqueId(item.getUniqueId()) + 1);
		    } else {
			ps.setInt(9, 0);
		    }
                    ps.executeUpdate();
                    ResultSet rs = ps.getGeneratedKeys();
                    int itemid;
                    if (rs.next()) {
                        itemid = rs.getInt(1);
                    } else {
                        throw new DatabaseException("Inserting char failed.");
                    }

                    if (iv.getType().equals(MapleInventoryType.EQUIP) || iv.getType().equals(MapleInventoryType.EQUIPPED)) {
                        pse.setInt(1, itemid);
                        IEquip equip = (IEquip) item;
                        pse.setInt(2, equip.getUpgradeSlots());
                        pse.setInt(3, equip.getLevel());
                        pse.setInt(4, equip.getStr());
                        pse.setInt(5, equip.getDex());
                        pse.setInt(6, equip.getInt());
                        pse.setInt(7, equip.getLuk());
                        pse.setInt(8, equip.getHp());
                        pse.setInt(9, equip.getMp());
                        pse.setInt(10, equip.getWatk());
                        pse.setInt(11, equip.getMatk());
                        pse.setInt(12, equip.getWdef());
                        pse.setInt(13, equip.getMdef());
                        pse.setInt(14, equip.getAcc());
                        pse.setInt(15, equip.getAvoid());
                        pse.setInt(16, equip.getHands());
                        pse.setInt(17, equip.getSpeed());
                        pse.setInt(18, equip.getJump());
                        pse.setInt(19, equip.getLocked());
                        pse.setBoolean(20, equip.isRing());
                        pse.setInt(21, equip.getVicious());
                        pse.setInt(22, item.getFlag());
                        pse.executeUpdate();
                    }
                }
            }
            ps.close();
            pse.close();

            deleteWhereCharacterId(con, "DELETE FROM queststatus WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO queststatus (`queststatusid`, `characterid`, `quest`, `status`, `time`, `forfeited`) VALUES (DEFAULT, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            pse = con.prepareStatement("INSERT INTO queststatusmobs VALUES (DEFAULT, ?, ?, ?)");
            ps.setInt(1, id);
            for (MapleQuestStatus q : quests.values()) {
                ps.setInt(2, q.getQuest().getId());
                ps.setInt(3, q.getStatus().getId());
                ps.setInt(4, (int) (q.getCompletionTime() / 1000));
                ps.setInt(5, q.getForfeited());
                ps.executeUpdate();
                ResultSet rs = ps.getGeneratedKeys();
                rs.next();
                for (int mob : q.getMobKills().keySet()) {
                    pse.setInt(1, rs.getInt(1));
                    pse.setInt(2, mob);
                    pse.setInt(3, q.getMobKills(mob));
                    pse.executeUpdate();
                }
                rs.close();
            }
            ps.close();
            pse.close();

            deleteWhereCharacterId(con, "DELETE FROM skills WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO skills (characterid, skillid, skilllevel, masterlevel) VALUES (?, ?, ?, ?)");
            ps.setInt(1, id);
            for (Entry<ISkill, SkillEntry> skill : skills.entrySet()) {
                ps.setInt(2, skill.getKey().getId());
                ps.setInt(3, skill.getValue().skillevel);
                ps.setInt(4, skill.getValue().masterlevel);
                ps.executeUpdate();
            }
            ps.close();

            deleteWhereCharacterId(con, "DELETE FROM keymap WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO keymap (characterid, `key`, `type`, `action`) VALUES (?, ?, ?, ?)");
            ps.setInt(1, id);
            for (Entry<Integer, MapleKeyBinding> keybinding : keymap.entrySet()) {
                ps.setInt(2, keybinding.getKey().intValue());
                ps.setInt(3, keybinding.getValue().getType());
                ps.setInt(4, keybinding.getValue().getAction());
                ps.executeUpdate();
            }
            ps.close();

            deleteWhereCharacterId(con, "DELETE FROM savedlocations WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO savedlocations (characterid, `locationtype`, `map`) VALUES (?, ?, ?)");
            ps.setInt(1, id);
            for (SavedLocationType savedLocationType : SavedLocationType.values()) {
                if (savedLocations[savedLocationType.ordinal()] != -1) {
                    ps.setString(2, savedLocationType.name());
                    ps.setInt(3, savedLocations[savedLocationType.ordinal()]);
                    ps.executeUpdate();
                }
            }
            ps.close();

            deleteWhereCharacterId(con, "DELETE FROM buddies WHERE characterid = ? AND pending = 0");
            ps = con.prepareStatement("INSERT INTO buddies (characterid, `buddyid`, `group`, `pending`) VALUES (?, ?, ?, 0)");
            ps.setInt(1, id);
            for (BuddylistEntry entry : buddylist.getBuddies()) {
                if (entry.isVisible()) {
                    ps.setInt(2, entry.getCharacterId());
                    ps.setString(3, entry.getGroup());
                    ps.executeUpdate();
                }
            }
            ps.close();

            ps = con.prepareStatement("UPDATE accounts SET `paypalNX` = ?, `mPoints` = ?, `cardNX` = ?, `Present` = ?  WHERE id = ?");
            ps.setInt(1, paypalnx);
            ps.setInt(2, maplepoints);
            ps.setInt(3, cardnx);           
            ps.setInt(4, Present);
            ps.setInt(5, client.getAccID()); // ps.setInt(5, nld);
            
            ps.executeUpdate();
            ps.close();

            if (storage != null) {
                storage.saveToDB();
            }

            if (update) {
                ps = con.prepareStatement("DELETE FROM achievements WHERE accountid = ?");
                ps.setInt(1, accountid);
                ps.executeUpdate();
                ps.close();

                for (Integer achid : finishedAchievements) {
                    ps = con.prepareStatement("INSERT INTO achievements(charid, achievementid, accountid) VALUES(?, ?, ?)");
                    ps.setInt(1, id);
                    ps.setInt(2, achid);
                    ps.setInt(3, accountid);
                    ps.executeUpdate();
                    ps.close();
                }
            }

            con.commit();
        } catch (Exception e) {
            log.error(MapleClient.getLogMessage(this, "[charsave] Error saving character data"), e);       //1
            try {
                con.rollback();
            } catch (SQLException e1) {
            log.error(MapleClient.getLogMessage(this, "[charsave] Error Rolling Back"), e);         //2
            }
        } finally {
            try {
                con.setAutoCommit(true);
                con.setTransactionIsolation(Connection.TRANSACTION_REPEATABLE_READ);
            } catch (SQLException e) {
            log.error(MapleClient.getLogMessage(this, "[charsave] Error going back to autocommit mode"), e); //3
            }
        }
    }

    public IItem lockitem(int slot, boolean lock) {
        byte set = (byte) 0;
        byte eqslot = (byte) slot;
        Equip nEquip = (Equip) this.getInventory(MapleInventoryType.EQUIP).getItem(eqslot);
        if (nEquip != null) {
            if (lock) {
                set = (byte) 1;
                dropMessage("[系统信息] 物品位置 " + slot + " 锁定成功");
            } else {
                dropMessage("[系统信息] 物品位置 " + slot + " 解除锁定成功");
            }
            nEquip.setLocked(set);
            getClient().getSession().write(MaplePacketCreator.getCharInfo(this));
            getMap().removePlayer(this);
            getMap().addPlayer(this);
        } else {
            dropMessage("[系统信息] 物品位置 " + slot + " 装备为空.");
        }
        return nEquip;
    }

    private void deleteWhereCharacterId(Connection con, String sql) throws SQLException {
        PreparedStatement ps = con.prepareStatement(sql);
        ps.setInt(1, id);
        ps.executeUpdate();
        ps.close();
    }

    public MapleQuestStatus getQuest(MapleQuest quest) {
        if (!quests.containsKey(quest)) {
            return new MapleQuestStatus(quest, MapleQuestStatus.Status.NOT_STARTED);
        }
        return quests.get(quest);
    }

    public void updateQuest(MapleQuestStatus quest) {
        quests.put(quest.getQuest(), quest);
        if (quest.getQuest().getId() == 4760 || quest.getQuest().getId() == 4761 || quest.getQuest().getId() == 4762 || quest.getQuest().getId() == 4763 || quest.getQuest().getId() == 4764 || quest.getQuest().getId() == 4765 || quest.getQuest().getId() == 4766 || quest.getQuest().getId() == 4767 || quest.getQuest().getId() == 4768 || quest.getQuest().getId() == 4769 || quest.getQuest().getId() == 4770 || quest.getQuest().getId() == 4771) {
            client.getSession().write(MaplePacketCreator.completeQuest(this, (short) quest.getQuest().getId()));
            client.getSession().write(MaplePacketCreator.updateQuestInfo(this, (short) quest.getQuest().getId(), quest.getNpc(), (byte) 8));
        } else if (!(quest.getQuest() instanceof MapleCustomQuest)) {
            if (quest.getStatus().equals(MapleQuestStatus.Status.STARTED)) {
                client.getSession().write(MaplePacketCreator.startQuest(this, (short) quest.getQuest().getId()));
                client.getSession().write(MaplePacketCreator.updateQuestInfo(this, (short) quest.getQuest().getId(), quest.getNpc(), (byte) 8));
            } else if (quest.getStatus().equals(MapleQuestStatus.Status.COMPLETED)) {
                client.getSession().write(MaplePacketCreator.completeQuest(this, (short) quest.getQuest().getId()));
            } else if (quest.getStatus().equals(MapleQuestStatus.Status.NOT_STARTED)) {
                client.getSession().write(MaplePacketCreator.forfeitQuest(this, (short) quest.getQuest().getId()));
            }
        }
    }

    public static int getIdByName(String name, int world) {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps;
        try {
            ps = con.prepareStatement("SELECT id FROM characters WHERE name = ? AND world = ?");
            ps.setString(1, name);
            ps.setInt(2, world);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return -1;
            }
            int id = rs.getInt("id");
            rs.close();
            ps.close();
            return id;
        } catch (SQLException e) {
            log.error("ERROR", e); //4
        }
        return -1;
    }

    public boolean isActiveBuffedValue(int skillid) {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<MapleBuffStatValueHolder>(effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.isSkill() && mbsvh.effect.getSourceId() == skillid && !isGM()) {
                return true;
            }
        }
        return false;
    }

    public Integer getBuffedValue(MapleBuffStat effect) {
        MapleBuffStatValueHolder mbsvh = effects.get(effect);
        if (mbsvh == null) {
            return null;
        }
        return Integer.valueOf(mbsvh.value);
    }

    public boolean isBuffFrom(MapleBuffStat stat, ISkill skill) {
        MapleBuffStatValueHolder mbsvh = effects.get(stat);
        if (mbsvh == null) {
            return false;
        }
        return mbsvh.effect.isSkill() && mbsvh.effect.getSourceId() == skill.getId();
    }

    public int getBuffSource(MapleBuffStat stat) {
        MapleBuffStatValueHolder mbsvh = effects.get(stat);
        if (mbsvh == null) {
            return -1;
        }

        return mbsvh.effect.getSourceId();
    }

    public ArrayList<MapleStatEffect> getBuffEffects() {
        ArrayList<MapleStatEffect> almseret = new ArrayList<MapleStatEffect>();
        HashSet<Integer> hs = new HashSet<Integer>();
        for (MapleBuffStatValueHolder mbsvh : effects.values()) {
            if (mbsvh != null && mbsvh.effect != null) {
                Integer nid = Integer.valueOf(mbsvh.effect.isSkill() ? mbsvh.effect.getSourceId() : -mbsvh.effect.getSourceId());
                if (!hs.contains(nid)) {
                    almseret.add(mbsvh.effect);
                    hs.add(nid);
                }
            }
        }
        return almseret;
    }

    public int getItemQuantity(int itemid, boolean checkEquipped) {
        MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(itemid);
        MapleInventory iv = inventory[type.ordinal()];
        int possesed = iv.countById(itemid);
        if (checkEquipped) {
            possesed += inventory[MapleInventoryType.EQUIPPED.ordinal()].countById(itemid);
        }

        return possesed;
    }

    public void setBuffedValue(MapleBuffStat effect, int value) {
        MapleBuffStatValueHolder mbsvh = effects.get(effect);
        if (mbsvh == null) {
            return;
        }
        mbsvh.value = value;
    }

    public Long getBuffedStarttime(MapleBuffStat effect) {
        MapleBuffStatValueHolder mbsvh = effects.get(effect);
        if (mbsvh == null) {
            return null;
        }
        return Long.valueOf(mbsvh.startTime);
    }

    public MapleStatEffect getStatForBuff(MapleBuffStat effect) {
        MapleBuffStatValueHolder mbsvh = effects.get(effect);
        if (mbsvh == null) {
            return null;
        }
        return mbsvh.effect;
    }

    private void prepareDragonBlood(final MapleStatEffect bloodEffect) {
        if (dragonBloodSchedule != null) {
            dragonBloodSchedule.cancel(false);
        }

        dragonBloodSchedule = TimerManager.getInstance().register(new Runnable() {

            @Override
            public void run() {
                addHP(-bloodEffect.getX());
                getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(bloodEffect.getSourceId(), 5));
                getMap().broadcastMessage(MapleCharacter.this, MaplePacketCreator.showBuffeffect(getId(), bloodEffect.getSourceId(), 5, (byte) 3), false);
                checkBerserk();
            }
        }, 4000, 4000);
    }

    public void startFullnessSchedule(final int decrease, final MaplePet pet, int petSlot) {
        ScheduledFuture<?> schedule = TimerManager.getInstance().register(new Runnable() {

            @Override
            public void run() {
                int newFullness = pet.getFullness() - decrease;
                if (newFullness <= 5) {
                    pet.setFullness(15);
                    unequipPet(pet, true, true);
                } else {
                    pet.setFullness(newFullness);
                    getClient().getSession().write(MaplePacketCreator.updatePet(pet, true));
                }
            }
        }, 60000, 60000);
	switch (petSlot) {
	    case 0:
		fullnessSchedule = schedule;
	    case 1:
		fullnessSchedule_1 = schedule;
	    case 2:
		fullnessSchedule_2 = schedule;
	}
    }

    public void cancelFullnessSchedule(int petSlot) {
	switch (petSlot) {
	    case 0:
		fullnessSchedule.cancel(false);
	    case 1:
		fullnessSchedule_1.cancel(false);
	    case 2:
		fullnessSchedule_2.cancel(false);
	}
    }

    public MaplePet getPet(int index) {
	if (pets.size() > 0) {
	    if (pets.size() > index) {
		return pets.get(index);
	    }
	}
	return null;
    }

    public void addPet(MaplePet pet, boolean lead) {
	if (pets.size() < 3) {
	    if (lead) {
		List<MaplePet> newpets = new ArrayList<MaplePet>();
		newpets.add(pet);
		for (MaplePet oldpet : pets) {
		    newpets.add(oldpet);
		}
		pets = newpets;
		fullnessSchedule_2 = fullnessSchedule_1;
		fullnessSchedule_1 = fullnessSchedule;
	    } else {
		pets.add(pet);
	    }
	}
    }
    
    public void removePet(MaplePet pet, boolean shift_left) {
	int petslot = getPetSlot(pet);
	pets.remove(petslot);
	getClient().getSession().write(MaplePacketCreator.petStatUpdate(this));
    }

    public int getNoPets() {
	return pets.size();
    }

    public int getPetSlot(MaplePet pet) {
	if (pets.size() > 0) {
	    for (int i = 0; i < pets.size(); i++) {
		if (pets.get(i) != null) {
		    if (pets.get(i).getUniqueId() == pet.getUniqueId()) {
			return i;
		    }
		}
	    }
	}
	return -1;
    }

    public int getPetByUniqueId(int uniqueid) {
	for (int i = 0; i < pets.size(); i++) {
	    if (pets.get(i) != null) {
		if (pets.get(i).getUniqueId() == uniqueid) {
		    return i;
		}
	    }
	}
	return -1;
    }

    public List<MaplePet> getPets() {
	return pets;
    }

    public void unequipAllPets() {
	for (MaplePet pett : pets) {
	    unequipPet(pett, true);
	}
    }

    public void unequipPet(MaplePet pet, boolean shift_left) {
	unequipPet(pet, shift_left, false);
    }

    public void unequipPet(MaplePet pet, boolean shift_left, boolean hunger) {
	cancelFullnessSchedule(getPetSlot(pet));
	pet.saveToDb();
	getMap().broadcastMessage(this, MaplePacketCreator.showPet(this, pet, true, hunger), true);
	List<Pair<MapleStat, Integer>> stats = new ArrayList<Pair<MapleStat, Integer>>();
	stats.add(new Pair<MapleStat, Integer>(MapleStat.PET, Integer.valueOf(0)));
	getClient().getSession().write(MaplePacketCreator.petStatUpdate(this));
	getClient().getSession().write(MaplePacketCreator.enableActions());
	removePet(pet, shift_left);
    }

    public void startMapEffect(String msg, int itemId) {
        startMapEffect(msg, itemId, 30000);
    }

    public void startMapEffect(String msg, int itemId, int duration) {
        final MapleMapEffect mapEffect = new MapleMapEffect(msg, itemId);
        getClient().getSession().write(mapEffect.makeStartData());
        TimerManager.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                getClient().getSession().write(mapEffect.makeDestroyData());
            }
        }, duration);
    }

    public void startMapTimeLimitTask(final MapleMap from, final MapleMap to) {
        if (to.getTimeLimit() > 0 && from != null) {
            final MapleCharacter chr = this;
            mapTimeLimitTask = TimerManager.getInstance().register(new Runnable() {

                @Override
                public void run() {
                    MaplePortal pfrom = null;
                    if (MapleItemInformationProvider.getInstance().isMiniDungeonMap(from.getId())) {
                        pfrom = from.getPortal("MD00");
                    } else {
                        pfrom = from.getPortal(0);
                    }
                    if (pfrom != null) {
                        chr.changeMap(from, pfrom);
                    }
                }
            }, from.getTimeLimit() * 1000, from.getTimeLimit() * 1000);
        }
    }

    public void cancelMapTimeLimitTask() {
        if (mapTimeLimitTask != null) {
            mapTimeLimitTask.cancel(false);
        }
    }

    public void registerEffect(MapleStatEffect effect, long starttime, ScheduledFuture<?> schedule) {
        if (effect.isHide()) {
            this.hidden = true;
            getMap().broadcastMessage(this, MaplePacketCreator.removePlayerFromMap(getId()), false);
        } else if (effect.isDragonBlood()) {
            prepareDragonBlood(effect);
        } else if (effect.isBerserk()) {
            checkBerserk();
        } else if (effect.isBeholder()) {
            prepareBeholderEffect();
        }
        for (Pair<MapleBuffStat, Integer> statup : effect.getStatups()) {
            effects.put(statup.getLeft(), new MapleBuffStatValueHolder(effect, starttime, schedule, statup.getRight().intValue()));
        }
        recalcLocalStats();
    }

    public void removeAllCooldownsExcept(int id) {
        for (MapleCoolDownValueHolder mcvh : coolDowns.values())
            if (mcvh.skillId != id)
                coolDowns.remove(mcvh.skillId);
    }

    private List<MapleBuffStat> getBuffStats(MapleStatEffect effect, long startTime) {
        List<MapleBuffStat> stats = new ArrayList<MapleBuffStat>();
        try {
            for (Entry<MapleBuffStat, MapleBuffStatValueHolder> stateffect : effects.entrySet()) {
                MapleBuffStatValueHolder mbsvh = stateffect.getValue();
                if (mbsvh.effect.sameSource(effect) && (startTime == -1 || startTime == mbsvh.startTime)) {
                    stats.add(stateffect.getKey());
                }
            }
        } catch (ConcurrentModificationException e) {
        }

        return stats;
    }

    private void deregisterBuffStats(List<MapleBuffStat> stats) {
        List<MapleBuffStatValueHolder> effectsToCancel = new ArrayList<MapleBuffStatValueHolder>(stats.size());
        for (MapleBuffStat stat : stats) {
            MapleBuffStatValueHolder mbsvh = effects.get(stat);
            if (mbsvh != null) {
                effects.remove(stat);
                boolean addMbsvh = true;
                for (MapleBuffStatValueHolder contained : effectsToCancel) {
                    if (mbsvh.startTime == contained.startTime && contained.effect == mbsvh.effect) {
                        addMbsvh = false;
                    }
                }
                if (addMbsvh) {
                    effectsToCancel.add(mbsvh);
                }
                if (stat == MapleBuffStat.SUMMON || stat == MapleBuffStat.PUPPET) {
                    int summonId = mbsvh.effect.getSourceId();
                    MapleSummon summon = summons.get(summonId);
                    if (summon != null) {
                        getMap().broadcastMessage(MaplePacketCreator.removeSpecialMapObject(summon, true));
                        getMap().removeMapObject(summon);
                        removeVisibleMapObject(summon);
                        summons.remove(summonId);
                    }
                    if (summon.getSkill() == 1321007) {
                        if (beholderHealingSchedule != null) {
                            beholderHealingSchedule.cancel(false);
                            beholderHealingSchedule = null;
                        }
                        if (beholderBuffSchedule != null) {
                            beholderBuffSchedule.cancel(false);
                            beholderBuffSchedule = null;
                        }
                    }
                } else if (stat == MapleBuffStat.DRAGONBLOOD) {
                    dragonBloodSchedule.cancel(false);
                    dragonBloodSchedule = null;
                }
            }
        }
        for (MapleBuffStatValueHolder cancelEffectCancelTasks : effectsToCancel) {
            if (getBuffStats(cancelEffectCancelTasks.effect, cancelEffectCancelTasks.startTime).isEmpty()) {
                cancelEffectCancelTasks.schedule.cancel(false);
            }
        }
    }

    /**
     * @param effect
     * @param overwrite when overwrite is set no data is sent and all the Buffstats in the StatEffect are deregistered
     * @param startTime
     */
    public void cancelEffect(MapleStatEffect effect, boolean overwrite, long startTime) {
        List<MapleBuffStat> buffstats;
        if (!overwrite) {
            buffstats = getBuffStats(effect, startTime);
        } else {
            List<Pair<MapleBuffStat, Integer>> statups = effect.getStatups();
            buffstats = new ArrayList<MapleBuffStat>(statups.size());
            for (Pair<MapleBuffStat, Integer> statup : statups) {
                buffstats.add(statup.getLeft());
            }
        }
        deregisterBuffStats(buffstats);
        if (effect.isMagicDoor()) {
            // remove for all on maps
            if (!getDoors().isEmpty()) {
                MapleDoor door = getDoors().iterator().next();
                for (MapleCharacter chr : door.getTarget().getCharacters()) {
                    door.sendDestroyData(chr.getClient());
                }
                for (MapleCharacter chr : door.getTown().getCharacters()) {
                    door.sendDestroyData(chr.getClient());
                }
                for (MapleDoor destroyDoor : getDoors()) {
                    door.getTarget().removeMapObject(destroyDoor);
                    door.getTown().removeMapObject(destroyDoor);
                }
                clearDoors();
                silentPartyUpdate();
            }
        }
        if (!overwrite) {
            cancelPlayerBuffs(buffstats);
            if (effect.isHide() && (MapleCharacter) getMap().getMapObject(getObjectId()) != null) {
                this.hidden = false;
                getMap().broadcastMessage(this, MaplePacketCreator.spawnPlayerMapobject(this), false);
                for (MaplePet pett : pets) {
                    getMap().broadcastMessage(this, MaplePacketCreator.showPet(this, pett, false, false), false);
                }
            }
        }
    }

    public void cancelBuffStats(MapleBuffStat stat) {
        List<MapleBuffStat> buffStatList = Arrays.asList(stat);
        deregisterBuffStats(buffStatList);
        cancelPlayerBuffs(buffStatList);
    }

    public void cancelEffectFromBuffStat(MapleBuffStat stat) {
        if (effects.get(stat) != null) {
            cancelEffect(effects.get(stat).effect, false, -1);
        }
    }

    private void cancelPlayerBuffs(List<MapleBuffStat> buffstats) {
        if (getClient().getChannelServer().getPlayerStorage().getCharacterById(getId()) != null) { // are we still connected ?
            recalcLocalStats();
            enforceMaxHpMp();
            getClient().getSession().write(MaplePacketCreator.cancelBuff(buffstats));
            getMap().broadcastMessage(this, MaplePacketCreator.cancelForeignBuff(getId(), buffstats), false);
        }
    }

    public void dispel() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<MapleBuffStatValueHolder>(effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.isSkill()) {
                cancelEffect(mbsvh.effect, false, mbsvh.startTime);
            }
        }
    }

    public void cancelAllBuffs() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<MapleBuffStatValueHolder>(effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            cancelEffect(mbsvh.effect, false, mbsvh.startTime);
        }
    }

    public void cancelMorphs() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<MapleBuffStatValueHolder>(effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.isMorph() && mbsvh.effect.getSourceId() != 5111005 && mbsvh.effect.getSourceId() != 5121003) {
                cancelEffect(mbsvh.effect, false, mbsvh.startTime);
            }
        }
    }

    public void silentGiveBuffs(List<PlayerBuffValueHolder> buffs) {
        for (PlayerBuffValueHolder mbsvh : buffs) {
            mbsvh.effect.silentApplyBuff(this, mbsvh.startTime);
        }
    }

    public void giveItemBuff(int itemID) {
        MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
        MapleStatEffect statEffect = mii.getItemEffect(itemID);
        statEffect.applyTo(this);
    }

    public List<PlayerBuffValueHolder> getAllBuffs() {
        List<PlayerBuffValueHolder> ret = new ArrayList<PlayerBuffValueHolder>();
        for (MapleBuffStatValueHolder mbsvh : effects.values()) {
            ret.add(new PlayerBuffValueHolder(mbsvh.startTime, mbsvh.effect));
        }
        return ret;
    }

    public void cancelMagicDoor() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<MapleBuffStatValueHolder>(effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.isMagicDoor()) {
                cancelEffect(mbsvh.effect, false, mbsvh.startTime);
            }
        }
    }

    public void handleEnergyChargeGain() {
        ISkill energycharge = SkillFactory.getSkill(5110001);
        int energyChargeSkillLevel = getSkillLevel(energycharge);
        if (energyChargeSkillLevel <= 0) {
            energycharge = SkillFactory.getSkill(15100004);
            energyChargeSkillLevel = getSkillLevel(energycharge);
        }
        MapleStatEffect ceffect = null;
        ceffect = energycharge.getEffect(energyChargeSkillLevel);
        TimerManager tMan = TimerManager.getInstance();
        if (energyChargeSkillLevel > 0) {
            if (energybar < 10000) {
                energybar = (energybar + 102);
                if (energybar > 10000) {
                    energybar = 10000;
                }
                getClient().getSession().write(MaplePacketCreator.giveEnergyCharge(energybar));
                getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(energycharge.getId(), 2));
                getMap().broadcastMessage(this, MaplePacketCreator.showBuffeffect(id, energycharge.getId(), 2));
                if (energybar == 10000) {
                    getMap().broadcastMessage(this, MaplePacketCreator.giveForeignEnergyCharge(id, energybar));
                }
            }
            if (energybar >= 10000 && energybar < 11000) {
                energybar = 15000;
                final MapleCharacter chr = this;
                tMan.schedule(new Runnable() {

                    @Override
                    public void run() {
                        getClient().getSession().write(MaplePacketCreator.giveEnergyCharge(0));
                        getMap().broadcastMessage(chr, MaplePacketCreator.giveForeignEnergyCharge(id, energybar));
                        energybar = 0;
                    }
                }, ceffect.getDuration());
            }

        }
    }
    //获得斗气
    public void handleOrbgain() {
        MapleStatEffect ceffect = null;
        int advComboSkillLevel = getSkillLevel(SkillFactory.getSkill(1120003)); //冒险家进阶斗气

        if (advComboSkillLevel > 0) {
            ceffect = SkillFactory.getSkill(1120003).getEffect(advComboSkillLevel);
        } else if (getSkillLevel(SkillFactory.getSkill(11110005)) > 0) {       //骑士团进阶斗气
            advComboSkillLevel = getSkillLevel(SkillFactory.getSkill(11110005));
            ceffect = SkillFactory.getSkill(11110005).getEffect(getSkillLevel(SkillFactory.getSkill(11110005)));
        } else {
            int effectlevel = getSkillLevel(SkillFactory.getSkill(1111002));
            if (effectlevel == 0) {
                ceffect = SkillFactory.getSkill(11111001).getEffect(getSkillLevel(SkillFactory.getSkill(11111001)));
            } else {
                ceffect = SkillFactory.getSkill(1111002).getEffect(effectlevel);
            }
        }

        if (getBuffedValue(MapleBuffStat.COMBO) < ceffect.getX() + 1) {
            int neworbcount = getBuffedValue(MapleBuffStat.COMBO) + 1;
            if (advComboSkillLevel > 0 && ceffect.makeChanceResult()) {
                if (neworbcount < ceffect.getX() + 1) {
                    neworbcount++;
                }
            }

            List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.COMBO, neworbcount));
            setBuffedValue(MapleBuffStat.COMBO, neworbcount);
            int duration = ceffect.getDuration();
            duration += (int) ((getBuffedStarttime(MapleBuffStat.COMBO) - System.currentTimeMillis()));
            int effectlevel = getSkillLevel(SkillFactory.getSkill(1111002));
            if (effectlevel == 0) {
                getClient().getSession().write(MaplePacketCreator.giveBuff(this, 11111001, duration, stat));
            } else {
                getClient().getSession().write(MaplePacketCreator.giveBuff(this, 1111002, duration, stat));
            }
            getMap().broadcastMessage(this, MaplePacketCreator.giveForeignBuff(this, stat, ceffect), false);
        }
    }
    //消耗斗气 
    public void handleOrbconsume() {
        ISkill combo = SkillFactory.getSkill(1111002);
        if (getSkillLevel(combo) == 0) {
            combo = SkillFactory.getSkill(11111001);
        }
        MapleStatEffect ceffect = combo.getEffect(getSkillLevel(combo));
        List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.COMBO, 1));
        setBuffedValue(MapleBuffStat.COMBO, 1);
        int duration = ceffect.getDuration();
        duration += (int) (getBuffedStarttime(MapleBuffStat.COMBO) - System.currentTimeMillis());
        if (getSkillLevel(combo) == 0) {
            getClient().getSession().write(MaplePacketCreator.giveBuff(this, 11111001, duration, stat));
        } else {
            getClient().getSession().write(MaplePacketCreator.giveBuff(this, 1111002, duration, stat));
        }
        getMap().broadcastMessage(this, MaplePacketCreator.giveForeignBuff(this, stat, ceffect), false);
    }

    private void silentEnforceMaxHpMp() {
        setMp(getMp());
        setHp(getHp(), true);
    }

    private void enforceMaxHpMp() {
        List<Pair<MapleStat, Integer>> stats = new ArrayList<Pair<MapleStat, Integer>>(2);
        if (getMp() > getCurrentMaxMp()) {
            setMp(getMp());
            stats.add(new Pair<MapleStat, Integer>(MapleStat.MP, Integer.valueOf(getMp())));
        }
        if (getHp() > getCurrentMaxHp()) {
            setHp(getHp());
            stats.add(new Pair<MapleStat, Integer>(MapleStat.HP, Integer.valueOf(getHp())));
        }
        if (stats.size() > 0) {
            getClient().getSession().write(MaplePacketCreator.updatePlayerStats(stats));
        }
    }

    public MapleMap getMap() {
        return map;
    }

    /**
     * only for tests
     *
     * @param newmap
     */
    public void setMap(MapleMap newmap) {
        this.map = newmap;
    }

    public int getMapId() {
        if (map != null) {
            return map.getId();
        }
        return mapid;
    }

    public int getInitialSpawnpoint() {
        return initialSpawnPoint;
    }

    public List<LifeMovementFragment> getLastRes() {
        return this.lastres;
    }

    public void setLastRes(List<LifeMovementFragment> lastres) {
        this.lastres = lastres;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getLevel() {
        return level;
    }

    public int getDojoEnergy() {
        return dojoEnergy;
    }

    public int getDojoPoints() {
        return dojoPoints;
    }

    public int getDojoStage() {
        return lastDojoStage;
    }

    public int getRank() {
        return rank;
    }

    public int getRankMove() {
        return rankMove;
    }

    public int getJobRank() {
        return jobRank;
    }

    public int getJobRankMove() {
        return jobRankMove;
    }

    public int getJobType() {
        return job.getId() / 2000;
    }

    public int getAPQScore() {
        return APQScore;
    }

    public int getFame() {
        return fame;
    }

    public MapleFamilyEntry getFamily() {
        return MapleFamily.getMapleFamily(this);
    }

    public int getFamilyId() {
        return familyId;
    }

    public ArrayList<Integer> getExcluded() {
        return excluded;
    }
 
    public int getStr() {
        return str;
    }

    public int getDex() {
        return dex;
    }

    public int getLuk() {
        return luk;
    }

    public int getInt() {
        return int_;
    }

    public MapleClient getClient() {
        return client;
    }

    public int getExp() {
        return exp.get();
    }

    public int getHp() {
        return hp;
    }

    public int getMaxHp() {
        return maxhp;
    }

    public int getMp() {
        return mp;
    }

    public int getMaxMp() {
        return maxmp;
    }

    public int getRemainingAp() {
        return remainingAp;
    }

    public int getRemainingSp() {
        return remainingSp;
    }

    public int getMpApUsed() {
        return mpApUsed;
    }

    public void setMpApUsed(int mpApUsed) {
        this.mpApUsed = mpApUsed;
    }

    public int getHpApUsed() {
        return hpApUsed;
    }

    public boolean isHidden() {
        return hidden;
    }

    public void setDojoEnergy(int x) {
        this.dojoEnergy = x;
    }

    public void setDojoPoints(int x) {
        this.dojoPoints = x;
    }

    public void setDojoStage(int x) {
        this.lastDojoStage = x;
    }

    public void setDojoStart() {
        int stage = (map.getId() / 100) % 100;
        this.dojoFinish = System.currentTimeMillis() + ((stage > 36 ? 15 : stage / 6 + 5)) * 60000;
    }

    public void setFinishedDojoTutorial() {
        this.finishedDojoTutorial = true;
    }

    public void setHidden(boolean hidden) {
        this.hidden = hidden;
    }

    public void setHpApUsed(int hpApUsed) {
        this.hpApUsed = hpApUsed;
    }

    public MapleSkinColor getSkinColor() {
        return skinColor;
    }

    public MapleJob getJob() {
        return job;
    }

    public int getGender() {
        return gender;
    }

    public int getHair() {
        return hair;
    }

    public int getFace() {
        return face;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setFamilyId(int familyId) {
        this.familyId = familyId;
    }

    public void setStr(int str) {
        this.str = str;
        recalcLocalStats();
    }

    public void setDex(int dex) {
        this.dex = dex;
        recalcLocalStats();
    }

    public void setLuk(int luk) {
        this.luk = luk;
        recalcLocalStats();
    }

    public void setInt(int int_) {
        this.int_ = int_;
        recalcLocalStats();
    }

    public void setExp(int exp) {
        this.exp.set(exp);
    }

    public void setJob(int job) {
        this.job = MapleJob.getById(job);
    }

    public void setMaxHp(int hp) {
        this.maxhp = hp;
        recalcLocalStats();
    }

    public void setMaxMp(int mp) {
        this.maxmp = mp;
        recalcLocalStats();
    }

    public void setHair(int hair) {
        this.hair = hair;
    }

    public void setFace(int face) {
        this.face = face;
    }

    public void setFame(int fame) {
        this.fame = fame;
    }

    public void setAPQScore(int score) {
        this.APQScore = score;
    }

    public void setRemainingAp(int remainingAp) {
        this.remainingAp = remainingAp;
    }

    public void setRemainingSp(int remainingSp) {
        this.remainingSp = remainingSp;
    }

    public void setSkinColor(MapleSkinColor skinColor) {
        this.skinColor = skinColor;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public void setGM(int gmlevel) {
        this.GMLevel = gmlevel;
    }

    public CheatTracker getCheatTracker() {
        return anticheat;
    }

    public BuddyList getBuddylist() {
        return buddylist;
    }

    public int getAutoHpPot() {
        return autoHpPot;
    }

    public void setAutoHpPot(int itemId) {
        autoHpPot = itemId;
    }

    public int getAutoMpPot() {
        return autoMpPot;
    }

    public void setAutoMpPot(int itemId) {
        autoMpPot = itemId;
    }

    public void addFame(int famechange) {
        this.fame += famechange;
    }

    public Point getLastPortalPoint() {
        return lastPortalPoint;
    }

    public void resetLastPortalPoint() {
        this.lastPortalPoint = null;
    }

    public boolean hasEntered(String script, int mapId) {
        if (entered.containsKey(mapId)) {
            if (entered.get(mapId).equals(script)) {
                return true;
            }
        }
        return false;
    }

    public boolean hasEntered(String script) {
        for (int mapId : entered.keySet()) {
            if (entered.get(mapId).equals(script)) {
                return true;
            }
        }
        return false;
    }

    public void enteredScript(String script, int mapid) {
        if (!entered.containsKey(mapid)) {
            entered.put(mapid, script);
        }
    }

    public void resetEnteredScript() {
        if (entered.containsKey(map.getId())) {
            entered.remove(map.getId());
        }
    }

    public void resetEnteredScript(int mapId) {
        if (entered.containsKey(mapId)) {
            entered.remove(mapId);
        }
    }

    public void resetEnteredScript(String script) {
        for (int mapId : entered.keySet()) {
            if (entered.get(mapId).equals(script)) {
                entered.remove(mapId);
            }
        }
    }

    public boolean changeMapOffline(String victim, int mapId) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE characters SET map = ?, spawnpoint = ? WHERE name = ?");
            ps.setInt(1, mapId);
            ps.setInt(2, 0);
            ps.setString(3, victim);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            return false;
        }
        return true;
    }

    private void changeMapInternal(final MapleMap to, final Point pos, MaplePacket warpPacket) {
        warpPacket.setOnSend(new Runnable() {

            @Override
            public void run() {
                IPlayerInteractionManager interaction = MapleCharacter.this.getInteraction();
                if (interaction != null) {
                    if (interaction.isOwner(MapleCharacter.this)) {
                        if (interaction.getShopType() == 2) {
                            interaction.removeAllVisitors(3, 1);
                            interaction.closeShop(((MaplePlayerShop) interaction).returnItems(getClient()));
                        } else if (interaction.getShopType() == 1) {
                            getClient().getSession().write(MaplePacketCreator.shopVisitorLeave(0));
                            if (interaction.getItems().isEmpty()) {
                                interaction.removeAllVisitors(3, 1);
                                interaction.closeShop(((HiredMerchant) interaction).returnItems(getClient()));
                            }
                        } else if (interaction.getShopType() == 3 || interaction.getShopType() == 4) {
                            interaction.removeAllVisitors(3, 1);
                        }
                    } else {
                        interaction.removeVisitor(MapleCharacter.this);
                    }
                }
                MapleCharacter.this.setInteraction(null);
                map.removePlayer(MapleCharacter.this);
                if (getClient().getChannelServer().getPlayerStorage().getCharacterById(getId()) != null) {
                    map = to;
                    setPosition(pos);
                    to.addPlayer(MapleCharacter.this);
                    lastPortalPoint = getPosition();
                    if (party != null) {
                        silentPartyUpdate();
                        getClient().getSession().write(MaplePacketCreator.updateParty(getClient().getChannel(), party, PartyOperation.SILENT_UPDATE, null));
                        updatePartyMemberHP();
                    }
                    if (getMap().getHPDec() > 0) {
                        hpDecreaseTask = TimerManager.getInstance().schedule(new Runnable() {

                            @Override
                            public void run() {
                                doHurtHp();
                            }
                        }, 10000);
                    }
                    if (to.getId() == 980000301) { //todo: all CPq map id's
                        setTeam(MapleCharacter.rand(0, 1));
                        getClient().getSession().write(MaplePacketCreator.startMonsterCarnival(getTeam()));
                    }
                }
            }
        });
        getClient().getSession().write(warpPacket);
    }

    public void leaveMap() {
        controlled.clear();
        visibleMapObjects.clear();
        if (chair != 0) {
            chair = 0;
        }
        if (hpDecreaseTask != null) {
            hpDecreaseTask.cancel(false);
        }
    }

    public void doHurtHp() {
        if (this.getInventory(MapleInventoryType.EQUIPPED).findById(getMap().getHPDecProtect()) != null) {
            return;
        }
        addHP(-getMap().getHPDec());
        hpDecreaseTask = TimerManager.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                doHurtHp();
            }
        }, 10000);
    }

    public void changeJob(MapleJob newJob) {
        this.job = newJob;
        this.remainingSp++;
        if (newJob.getId() % 10 == 2) {
            this.remainingSp += 2;
        }
        updateSingleStat(MapleStat.AVAILABLESP, this.remainingSp);
        updateSingleStat(MapleStat.JOB, newJob.getId());
        switch (this.job.getId()) { //给4转技能上限
            case 100:
                maxhp += rand(200, 250);
                break;
            case 110:
            case 111:
            case 112:
                maxhp += rand(300, 350);
                break;
            case 120:
            case 121:
            case 122:
            case 130:
            case 131:
            case 132:
            case 200:
                maxmp += rand(100, 150);
                break;
            case 210:
            case 211:
            case 212:
            case 220:
            case 221:
            case 222:
            case 230:
            case 231:
            case 232:
                maxmp += rand(450, 500);
                break;
            case 300:
            case 400:
            case 500:
                maxhp += rand(100, 150);
                maxmp += rand(30, 50);
                break;
            case 310:
            case 311:
            case 312:
            case 320:
            case 321:
            case 322:
            case 410:
            case 411:
            case 412:
            case 420:
            case 421:
            case 422:
            case 510:
            case 511:
            case 512:
            case 520:
            case 521:
            case 522:
                maxhp += rand(300, 350);
                maxmp += rand(150, 200);
                break;
            default:
                break;
        }
        if (maxhp > 30000) {
            maxhp = 30000;
        }
        if (maxmp > 30000) {
            maxmp = 30000;
        }
        setHp(maxhp);
        setMp(maxmp);
        List<Pair<MapleStat, Integer>> statup = new ArrayList<Pair<MapleStat, Integer>>(2);
        statup.add(new Pair<MapleStat, Integer>(MapleStat.MAXHP, Integer.valueOf(maxhp)));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.MAXMP, Integer.valueOf(maxmp)));
        recalcLocalStats();
        getClient().getSession().write(MaplePacketCreator.updatePlayerStats(statup));
        getMap().broadcastMessage(this, MaplePacketCreator.showJobChange(getId()), false);
        silentPartyUpdate();
        guildUpdate();
    }

    public void gainAp(int ap) {
        this.remainingAp += ap;
        updateSingleStat(MapleStat.AVAILABLEAP, this.remainingAp);
    }

    public void apReset() {
        List<Pair<MapleStat, Integer>> statups = new ArrayList<Pair<MapleStat, Integer>>();
        int Str = 4, Dex = 4, Int = 4, Luk = 4;
        if (job.isA(MapleJob.WARRIOR)) {
            Str = 35;
        }
        if (job.isA(MapleJob.MAGICIAN)) {
            Int = 20;
        }
        if (job.isA(MapleJob.BOWMAN)) {
            Dex = 25;
        }
        if (job.isA(MapleJob.THIEF)) {
            Dex = 25;
        }
        if (job.isA(MapleJob.PIRATE)) {
            Dex = 20;
        }
        int ap = getStr() + getDex() + getInt() + getLuk() + getRemainingAp() - (Dex + Str + Int + Luk);
        setStr(Str);
        setDex(Dex);
        setInt(Int);
        setLuk(Luk);
        setRemainingAp(ap);
        statups.add(new Pair<MapleStat, Integer>(MapleStat.STR, getStr()));
        statups.add(new Pair<MapleStat, Integer>(MapleStat.DEX, getDex()));
        statups.add(new Pair<MapleStat, Integer>(MapleStat.INT, getInt()));
        statups.add(new Pair<MapleStat, Integer>(MapleStat.LUK, getLuk()));
        statups.add(new Pair<MapleStat, Integer>(MapleStat.AVAILABLEAP, getRemainingAp()));
        getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.updatePlayerStats(statups));
    }

    public void changeSkillLevel(ISkill skill, int newLevel, int newMasterlevel) {
        skills.put(skill, new SkillEntry(newLevel, newMasterlevel));
        this.getClient().getSession().write(MaplePacketCreator.updateSkill(skill.getId(), newLevel, newMasterlevel));
    }

    public void setHpPot(int itemid) {
        this.hppot = itemid;
    }

    public void setMpPot(int itemid) {
        this.mppot = itemid;
    }

    public int getHpPot() {
        return this.hppot;
    }

    public int getMpPot() {
        return this.mppot;
    }

    public void setHp(int newhp) {
        setHp(newhp, false);
    }

    public void setHp(int newhp, boolean silent) {
        int oldHp = hp;
        int thp = newhp;
        if (thp < 0) {
            thp = 0;
        }
        if (thp > localmaxhp) {
            thp = localmaxhp;
        }
        this.hp = thp;

        if (!silent) {
            updatePartyMemberHP();
        }
        if (oldHp > hp && !isAlive()) {
            playerDead();
        }
        this.checkBerserk();
    }

    private void playerDead() {
        if (getEventInstance() != null) {
            getEventInstance().playerKilled(this);
        }
        dispelSkill(0);
        cancelAllDebuffs();
        cancelMorphs();

        int[] charmID = {5130000, 5130002, 5131000, 4031283, 4140903};
        MapleCharacter player = getClient().getPlayer();
        int possesed = 0;
        int i;

        //Check for charms
        for (i = 0; i < charmID.length; i++) {
            int quantity = getItemQuantity(charmID[i], false);
            if (possesed == 0 && quantity > 0) {
                possesed = quantity;
                break;
            }
        }

        if (possesed > 0 && !getMap().hasEvent()) {
            possesed -= 1;
            getClient().getSession().write(MaplePacketCreator.serverNotice(5, "因使用了 [护身符] 死亡后您的经验不会减少！剩余 (" + possesed + " 个)"));
            MapleInventoryManipulator.removeById(getClient(), MapleItemInformationProvider.getInstance().getInventoryType(charmID[i]), charmID[i], 1, true, false);
        } else if (getMap().hasEvent()) {
            getClient().getSession().write(MaplePacketCreator.serverNotice(5, "在任务地图中死亡，您的经验值不会减少。"));
        } else {
            if (player.getJob() != MapleJob.BEGINNER || player.getJob() != MapleJob.KNIGHT || player.getJob() != MapleJob.Ares) {
                //Lose XP
                int XPdummy = ExpTable.getExpNeededForLevel(player.getLevel() + 1);
                if (player.getMap().isTown()) {
                    XPdummy *= 0.01;
                }
                if (XPdummy == ExpTable.getExpNeededForLevel(player.getLevel() + 1)) {
                    if (player.getLuk() <= 100 && player.getLuk() > 8) {
                        XPdummy *= 0.10 - (player.getLuk() * 0.0005);
                    } else if (player.getLuk() < 8) {
                        XPdummy *= 0.10; //Otherwise they lose about 9 percent
                    } else {
                        XPdummy *= 0.10 - (100 * 0.0005);
                    }
                }
                if ((player.getExp() - XPdummy) > 0) {
                    player.gainExp(-XPdummy, false, false);
                } else {
                    player.gainExp(-player.getExp(), false, false);
                }
            }
        }
        if (getBuffedValue(MapleBuffStat.MORPH) != null) {
            cancelEffectFromBuffStat(MapleBuffStat.MORPH);
        }
        if (getBuffedValue(MapleBuffStat.MONSTER_RIDING) != null) {
            cancelEffectFromBuffStat(MapleBuffStat.MONSTER_RIDING);
        }
 client.getSession().write(MaplePacketCreator.enableActions());
        } 

    public void updatePartyMemberHP() {
        if (party != null) {
            int channel = client.getChannel();
            for (MaplePartyCharacter partychar : party.getMembers()) {
                if (partychar.getMapid() == getMapId() && partychar.getChannel() == channel) {
                    MapleCharacter other = ChannelServer.getInstance(channel).getPlayerStorage().getCharacterByName(partychar.getName());
                    if (other != null) {
                        other.getClient().getSession().write(MaplePacketCreator.updatePartyMemberHP(getId(), this.hp, localmaxhp));
                    }
                }
            }
        }
    }

    public void receivePartyMemberHP() {
        if (party != null) {
            int channel = client.getChannel();
            for (MaplePartyCharacter partychar : party.getMembers()) {
                if (partychar.getMapid() == getMapId() && partychar.getChannel() == channel) {
                    MapleCharacter other = ChannelServer.getInstance(channel).getPlayerStorage().getCharacterByName(partychar.getName());
                    if (other != null) {
                        getClient().getSession().write(
                                MaplePacketCreator.updatePartyMemberHP(other.getId(), other.getHp(), other.getCurrentMaxHp()));
                    }
                }
            }
        }
    }

    public void setMp(int newmp) {
        int tmp = newmp;
        if (tmp < 0) {
            tmp = 0;
        }
        if (tmp > localmaxmp) {
            tmp = localmaxmp;
        }
        this.mp = tmp;
    }

    /**
     * Convenience function which adds the supplied parameter to the current hp then directly does a updateSingleStat.
     *
     * @see MapleCharacter#setHp(int)
     * @param delta
     */
    public void addHP(int delta) {
        setHp(hp + delta);
        updateSingleStat(MapleStat.HP, hp);
    }

    /**
     * Convenience function which adds the supplied parameter to the current mp then directly does a updateSingleStat.
     *
     * @see MapleCharacter#setMp(int)
     * @param delta
     */
    public void addMP(int delta) {
        setMp(mp + delta);
        updateSingleStat(MapleStat.MP, mp);
    }

    public void addMPHP(int hpDiff, int mpDiff) {
        setHp(hp + hpDiff);
        setMp(mp + mpDiff);
        List<Pair<MapleStat, Integer>> stats = new ArrayList<Pair<MapleStat, Integer>>();
        stats.add(new Pair<MapleStat, Integer>(MapleStat.HP, Integer.valueOf(hp)));
        stats.add(new Pair<MapleStat, Integer>(MapleStat.MP, Integer.valueOf(mp)));
        MaplePacket updatePacket = MaplePacketCreator.updatePlayerStats(stats);
        client.getSession().write(updatePacket);
    }

    /**
     * Updates a single stat of this MapleCharacter for the client. This method only creates and sends an update packet,
     * it does not update the stat stored in this MapleCharacter instance.
     *
     * @param stat
     * @param newval
     * @param itemReaction
     */
    public void updateSingleStat(MapleStat stat, int newval, boolean itemReaction) {
        Pair<MapleStat, Integer> statpair = new Pair<MapleStat, Integer>(stat, Integer.valueOf(newval));
        MaplePacket updatePacket = MaplePacketCreator.updatePlayerStats(Collections.singletonList(statpair), itemReaction);
        client.getSession().write(updatePacket);
    }

    public void updateSingleStat(MapleStat stat, int newval) {
        updateSingleStat(stat, newval, false);
    }

    public void gainExp(int gain, boolean show, boolean inChat, boolean white) {
        if ((getLevel() < 200 && (Math.floor(getJob().getId() / 100) < 10 || Math.floor(getJob().getId() / 1000) == 2)) || getLevel() < 180) {
            if (getExp() + gain >= ExpTable.getExpNeededForLevel(level + 1)) {
                setExp(exp.addAndGet(gain));
                levelUp();
                if (getExp() > ExpTable.getExpNeededForLevel(level + 1)) {
                    setExp(ExpTable.getExpNeededForLevel(level + 1));
                }
            } else {
                setExp(exp.addAndGet(gain));
            }
        } else {
            if (getExp() != 0) {
                setExp(0);
            }
        }
        
     /**
         *@112208 - 精灵吊坠
         *@112207 - 温暖的围脖
         *@1122038-觉醒的冒险之心
         *@以上装备打怪可以多获得2倍的经验
         */
        updateSingleStat(MapleStat.EXP, getExp());
        if (show && gain != 0) {
            int k1 = 0;
            IItem eqp = getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -17);
            if ((eqp != null && eqp.getItemId() == 1122018)||(eqp != null && eqp.getItemId() == 1122017)||(eqp != null && eqp.getItemId() == 1122038)) { //围脖吊坠
                /*if (getLevel() >= 1) {*/
                    //gain *= 2; //**经验倍数X2**\\
                    //exp *= 2;
                    //gain *= 2;
                    //gainExp *= 2;
                client.getSession().write(MaplePacketCreator.getShowExpGain(gain*2, inChat, white)); //游戏内显示语句
                setExp(exp.addAndGet(gain*2)); //获得经验倍数*2
            } else {
                client.getSession().write(MaplePacketCreator.getShowExpGain(gain, inChat, white));
            }   
        //client.getSession().write(MaplePacketCreator.getShowExpGain(gain, inChat, white));
       }}
    //client.getSession().write(MaplePacketCreator.getShowExpGain(gain, inChat, white,k1));
   // }

/*-----------------------------------结束-----------------------------------*/
    public void silentPartyUpdate() {
        if (party != null) {
            try {
                getClient().getChannelServer().getWorldInterface().updateParty(party.getId(), PartyOperation.SILENT_UPDATE, new MaplePartyCharacter(MapleCharacter.this));
            } catch (RemoteException e) {
                log.error("REMOTE THROW", e);  //9
                getClient().getChannelServer().reconnectWorld();
            }
        }
    }

    public void gainExp(int gain, boolean show, boolean inChat) {
        gainExp(gain, show, inChat, true);
    }

    public boolean isGM() {
        return GMLevel > 0;
    }
    
    public boolean isGuildPvPMap() {
    return getMapId() == 980010101;    //PK地图
    }

    public int getGMLevel() {
        return GMLevel;
    }

    public boolean hasGMLevel(int level) {
        return GMLevel >= level;
    }

    public int gmLevel() {
        return this.GMLevel;
    }

    public MapleInventory getInventory(MapleInventoryType type) {
        return inventory[type.ordinal()];
    }

    public MapleShop getShop() {
        return shop;
    }

    public void setShop(MapleShop shop) {
        this.shop = shop;
    }

    public int getMeso() {
        return meso.get();
    } 

    public int getSavedLocation(SavedLocationType type) {
        return savedLocations[type.ordinal()];
    }

    public void saveLocation(SavedLocationType type) {
        savedLocations[type.ordinal()] = getMapId();
    }

    public void clearSavedLocation(SavedLocationType type) {
        savedLocations[type.ordinal()] = -1;
    }

    public void gainMeso(int gain, boolean show) {
        gainMeso(gain, show, false, false);
    }

    public void gainMeso(int gain, boolean show, boolean enableActions) {
        gainMeso(gain, show, enableActions, false);
    }

    public void gainMeso(int gain, boolean show, boolean enableActions, boolean inChat) {
        if (meso.get() + gain < 0) {
            client.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int newVal = meso.addAndGet(gain);
        updateSingleStat(MapleStat.MESO, newVal, enableActions);
        if (show) {
            client.getSession().write(MaplePacketCreator.getShowMesoGain(gain, inChat));
        }
    }
 public long getCurrenttime()
  {
    return this.currenttime;
  }

  public void setCurrenttime(long currenttime) {
    this.currenttime = currenttime;
  }

  public long getDeadtime() {
    return this.deadtime;
  }

  public void setDeadtime(long deadtime) {
    this.deadtime = deadtime;
  }

  public long getLasttime() {
    return this.lasttime;
  }

  public void setLasttime(long lasttime) {
    this.lasttime = lasttime;
  }
    /**
     * Adds this monster to the controlled list. The monster must exist on the Map.
     *
     * @param monster
     */
    public void controlMonster(MapleMonster monster, boolean aggro) {
        monster.setController(this);
        controlled.add(monster);
        client.getSession().write(MaplePacketCreator.controlMonster(monster, false, aggro));
    }

    public void stopControllingMonster(MapleMonster monster) {
        controlled.remove(monster);
    }

    public void checkMonsterAggro(MapleMonster monster) {
        if (!monster.isControllerHasAggro()) {
            if (monster.getController() == this) {
                monster.setControllerHasAggro(true);
            } else {
                monster.switchController(this, true);
            }
        }
    }

    public Collection<MapleMonster> getControlledMonsters() {
        return Collections.unmodifiableCollection(controlled);
    }

    public int getNumControlledMonsters() {
        return controlled.size();
    }

    @Override
    public String toString() {
        return "玩家: " + this.name;
    }

    public int getAccountID() {
        return accountid;
    }

    public void mobKilled(int id) {
        for (MapleQuestStatus q : quests.values()) {
            if (MapleQuest.getInstance(q.getQuest().getId()).nullCompleteQuestData()) {
                reloadQuest(MapleQuest.getInstance(q.getQuest().getId()));
            }
            if (q.getStatus() == MapleQuestStatus.Status.COMPLETED || q.getQuest().canComplete(this, null)) {
                continue;
            }
            if (q.mobKilled(id) && !(q.getQuest() instanceof MapleCustomQuest)) {
                client.getSession().write(MaplePacketCreator.updateQuestMobKills(q));
                if (q.getQuest().canComplete(this, null)) {
                    client.getSession().write(MaplePacketCreator.getShowQuestCompletion(q.getQuest().getId()));
                }
            }
        }
    }

    public final List<MapleQuestStatus> getStartedQuests() {
        List<MapleQuestStatus> ret = new LinkedList<MapleQuestStatus>();
        for (MapleQuestStatus q : quests.values()) {
            if (q.getStatus() == MapleQuestStatus.Status.COMPLETED) {
                continue;
            } else {
                if (q.getStatus().equals(MapleQuestStatus.Status.STARTED) && !(q.getQuest() instanceof MapleCustomQuest)) {
                    ret.add(q);
                }
            }
        }
        return Collections.unmodifiableList(ret);
    }

    public final List<MapleQuestStatus> getCompletedQuests() {
        List<MapleQuestStatus> ret = new LinkedList<MapleQuestStatus>();
        for (MapleQuestStatus q : quests.values()) {
            if (q.getStatus().equals(MapleQuestStatus.Status.COMPLETED) && !(q.getQuest() instanceof MapleCustomQuest)) {
                ret.add(q);
            }
        }
        return Collections.unmodifiableList(ret);
    }

    public void reloadQuest(MapleQuest quest) {
        int questId = quest.getId();
        MapleQuestStatus qs = getQuest(quest);
        quests.remove(quest);
        MapleQuest.remove(questId);
        MapleQuest q = MapleQuest.getInstance(questId);
        quests.put(q, qs);
    }

    public Map<ISkill, SkillEntry> getSkills() {
        return Collections.unmodifiableMap(skills);
    }

    public void dispelSkill(int skillid) {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<MapleBuffStatValueHolder>(effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (skillid == 0) {
                if (mbsvh.effect.isSkill() && (mbsvh.effect.getSourceId() % 20000000 == 1004 || dispelSkills(mbsvh.effect.getSourceId()))) {
                    cancelEffect(mbsvh.effect, false, mbsvh.startTime);
                }
            } else if (mbsvh.effect.isSkill() && mbsvh.effect.getSourceId() == skillid) {
                cancelEffect(mbsvh.effect, false, mbsvh.startTime);
            }
        }
    }

    private boolean dispelSkills(int skillid) {
        switch (skillid) {
            case 1004:
            case 1321007:
            case 2121005:
            case 2221005:
            case 2311006:
            case 2321003:
            case 3111002:
            case 3111005:
            case 3211002:
            case 3211005:
            case 4111002:
            case 11001004:
            case 12001004:
            case 13001004:
            case 14001005:
            case 15001004:
            case 5211001:
            case 12111004:
            case 20001004:
                return true;
            default:
                return false;
        }
    }

    public int getSkillLevel(int skill) {
        SkillEntry ret = skills.get(SkillFactory.getSkill(skill));
        if (ret == null)
            return 0;
        return ret.skillevel;
    }

    public int getSkillLevel(ISkill skill) { 
        SkillEntry ret = skills.get(skill); 
        if (skill != null && (skill.getId() == 1009 || skill.getId() == 10001009 || skill.getId() == 1010 || skill.getId() == 1011 || skill.getId() == 10001010 || skill.getId() == 10001011)) 
            return 1; 
        else if (ret == null) 
            return 0; 
        return ret.skillevel; 
    }

    public int getMasterLevel(ISkill skill) {
        SkillEntry ret = skills.get(skill);
        if (ret == null) {
            return 0;
        }
        return ret.masterlevel;
    }

    // the equipped inventory only contains equip... I hope
    public int getTotalDex() {
        return localdex;
    }

    public int getTotalInt() {
        return localint_;
    }

    public int getTotalStr() {
        return localstr;
    }

    public int getTotalLuk() {
        return localluk;
    }

    public int getTotalMagic() {
        return magic;
    }

    public double getSpeedMod() {
        return speedMod;
    }

    public double getJumpMod() {
        return jumpMod;
    }

    public int getTotalWatk() {
        return watk;
    }

     public static int rand(int lbound, int ubound) {
        return (int) ((Math.random() * (ubound - lbound + 1)) + lbound);
    }

    public void levelUp() {
        ISkill improvingMaxHP = null;
        int improvingMaxHPLevel = 0;
        ISkill improvingMaxMP = null;
        int improvingMaxMPLevel = 0;
        if (job.getId() >= 1000 && job.getId() <= 1511 && getLevel() < 70) {
            remainingAp += 1;
        }
        remainingAp += 5;
        if (job == MapleJob.Ares || job == MapleJob.Ares_1 || job == MapleJob.Ares_2 || job == MapleJob.Ares_3 || job == MapleJob.Ares_4) {
            maxhp += rand(24, 28);
            maxmp += rand(4, 6);
        }
        //新手
        if (job == MapleJob.BEGINNER || job == MapleJob.KNIGHT) {
            maxhp += rand(12, 16);
            maxmp += rand(10, 12);
            //战士
        } else if (job.isA(MapleJob.WARRIOR) || job.isA(MapleJob.GHOST_KNIGHT) || job.isA(MapleJob.Ares_1)) {
            improvingMaxHP = SkillFactory.getSkill(1000001);
            improvingMaxHPLevel = getSkillLevel(improvingMaxHP);
            if (job.isA(MapleJob.GHOST_KNIGHT)) {
                improvingMaxHP = SkillFactory.getSkill(11000000);
                improvingMaxHPLevel = getSkillLevel(improvingMaxHP);
            }
            maxhp += rand(24, 28);
            maxmp += rand(4, 6);
            //法师
        } else if (job.isA(MapleJob.MAGICIAN) || job.isA(MapleJob.FIRE_KNIGHT)) {
            improvingMaxMP = SkillFactory.getSkill(2000001);
            improvingMaxMPLevel = getSkillLevel(improvingMaxMP);
            if (job.isA(MapleJob.FIRE_KNIGHT)) {
                improvingMaxMP = SkillFactory.getSkill(12000000);
                improvingMaxMPLevel = getSkillLevel(improvingMaxMP);
            }
            
            maxhp += rand(10, 14);
            maxmp += rand(22, 24);
            //弓 飞 
        } else if (job.isA(MapleJob.BOWMAN) || job.isA(MapleJob.THIEF) || job.isA(MapleJob.GM) || job.isA(MapleJob.WIND_KNIGHT) || job.isA(MapleJob.NIGHT_KNIGHT)) {
            maxhp += rand(20, 24);
            maxmp += rand(14, 16);
            //一转海盗 枪手
        } else if (job.isA(MapleJob.PIRATE) || job.isA(MapleJob.THIEF_KNIGHT)) {
            improvingMaxHP = SkillFactory.getSkill(5100000);
            improvingMaxHPLevel = getSkillLevel(improvingMaxHP);
            if (job.isA(MapleJob.GHOST_KNIGHT)) {
                improvingMaxHP = SkillFactory.getSkill(15100000);
                improvingMaxHPLevel = getSkillLevel(improvingMaxHP);
            }
            maxhp += rand(22, 26);
            maxmp += rand(18, 23);
        }
        if (improvingMaxHPLevel > 0) {
            maxhp += improvingMaxHP.getEffect(improvingMaxHPLevel).getX();
        }
        if (improvingMaxMPLevel > 0) {
            maxmp += improvingMaxMP.getEffect(improvingMaxMPLevel).getX();
        }
        maxmp += getTotalInt() / 10;  //所有职业适用的智力对于Mp的修正公式
        exp.addAndGet(-ExpTable.getExpNeededForLevel(level + 1));
        level += 1;
        saveToDB(true);
        if (exp.get() > 0) {
            exp.set(0);
        }
        if (level == 200) {
            exp.set(0);
            MaplePacket packet = MaplePacketCreator.serverNotice(0, "[祝贺] " + getName() + " 玩家历经苦难，终于到达200级。大家祝贺他吧！");
            try {
                getClient().getChannelServer().getWorldInterface().broadcastMessage(getName(), packet.getBytes());
            } catch (RemoteException e) {
                getClient().getChannelServer().reconnectWorld();
            }
        }
        if (hp == 30000) {
            MaplePacket packet = MaplePacketCreator.serverNotice(0, "[祝贺] " + getName() + " 一路艰苦奋斗！生命值终于达到3万！！");
            try {
                getClient().getChannelServer().getWorldInterface().broadcastMessage(getName(), packet.getBytes());
            } catch (RemoteException e) {
                getClient().getChannelServer().reconnectWorld();
              }
        }
        maxhp = Math.min(30000, maxhp); //079生命值上限3w
        maxmp = Math.min(30000, maxmp);

        List<Pair<MapleStat, Integer>> statup = new ArrayList<Pair<MapleStat, Integer>>(8);
        //List<Pair<MapleStat, Integer>> statup = new ArrayList<Pair<MapleStat, Integer>>();
        statup.add(new Pair<MapleStat, Integer>(MapleStat.AVAILABLEAP, Integer.valueOf(remainingAp)));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.MAXHP, Integer.valueOf(maxhp)));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.MAXMP, Integer.valueOf(maxmp)));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.HP, Integer.valueOf(maxhp)));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.MP, Integer.valueOf(maxmp)));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.EXP, Integer.valueOf(exp.get())));
        statup.add(new Pair<MapleStat, Integer>(MapleStat.LEVEL, Integer.valueOf(level)));

        if (job != MapleJob.BEGINNER) {
            remainingSp += 3;
            statup.add(new Pair<MapleStat, Integer>(MapleStat.AVAILABLESP, Integer.valueOf(remainingSp)));
        }

        setHp(maxhp);
        setMp(maxmp);
        if (getJob().isA(MapleJob.GHOST_KNIGHT) && level <= 10) {
        
        }
        
        getClient().getSession().write(MaplePacketCreator.updatePlayerStats(statup));
        getMap().broadcastMessage(this, MaplePacketCreator.showLevelup(getId()), false);
        recalcLocalStats();
        silentPartyUpdate();
        guildUpdate();
        }

    public void changeKeybinding(int key, MapleKeyBinding keybinding) {
        if (keybinding.getType() != 0) {
            keymap.put(Integer.valueOf(key), keybinding);
        } else {
            keymap.remove(Integer.valueOf(key));
        }
    }
      private int touzhuNum;
  private int touzhuType;
  private int touzhuNX;
public int getTouzhuNX() {
    return this.touzhuNX;
  }

  public void setTouzhuNX(int touzhuNX) {
    this.touzhuNX = touzhuNX;
  }

  public int getTouzhuNum() {
    return this.touzhuNum;
  }

  public void setTouzhuNum(int touzhuNum) {
    this.touzhuNum = touzhuNum;
  }

  public int getTouzhuType() {
    return this.touzhuType;
  }

  public void setTouzhuType(int touzhuType) {
    this.touzhuType = touzhuType;
  }
    public void sendKeymap() {
        getClient().getSession().write(MaplePacketCreator.getKeymap(keymap));
    }

    public void sendMacros() {
        boolean macros = false;
        for (int i = 0; i < 5; i++) {
            if (skillMacros[i] != null) {
                macros = true;
            }
        }
        if (macros) {
            getClient().getSession().write(MaplePacketCreator.getMacros(skillMacros));
        }
    }

    public void updateMacros(int position, SkillMacro updateMacro) {
        skillMacros[position] = updateMacro;
    }
    
    public int getWarning()
	{
		return Warning;
	}

	public void setWarning(int warning)
	{
		Warning += warning;
	}
   
  /*  public int setWarning(int warning) {         //修改
        return warning;
    }    */

    public void gainWarning(boolean warningEnabled, int gain) {
        int warnings = 3;
        setWarning(warnings + gain);
        MaplePacket packet = MaplePacketCreator.serverNotice(6, "截至目前  " + getName() + ":该用户的警告量是: " + Warning + " 次！");
        if (warningEnabled == true) {
            switch (warnings) {
                case 1: //Warning 1	
                    new ServernoticeMapleClientMessageCallback(5, getClient()).dropMessage("这是你的第一次警告！请注意在游戏中勿使用非法程序！");
                    break;
                case 2: //Warning 2
                    new ServernoticeMapleClientMessageCallback(5, getClient()).dropMessage("警告现在是第 " + Warning + " 次。如果你再得到一次警告就会封号封IP！");
                    break;
                case 3: //Warning 3
                    ban("由于警告次数超过: " + Warning + "此，现封号封IP处理！");
                    setWarning(0);
                    break;
            }

        }
    }
    
     public int TotalLoginTimeMin() {
     int ret = 0;
     long now = 0L;
     long t = 0L;
     try
     {
       Connection con = DatabaseConnection.getConnection();
       PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
       ps.setInt(1, getAccountID());
       ResultSet rs = ps.executeQuery();
       if (rs.next()) {
         Timestamp lastdate = rs.getTimestamp("lastlogin");
         t = lastdate.getTime();
         now = System.currentTimeMillis();
       }
       rs.close();
       ps.close();
 
       ret = (int)((now - t) / 60000L);
     } catch (SQLException ex) {
       log.error("错误转换在线分钟数:", ex);
     }
     return ret;
   }

    public void tempban(String reason, Calendar duration, int greason) {
        if (lastmonthfameids == null) {
            throw new RuntimeException("Trying to ban a non-loaded character (testhack)");
        }
        tempban(reason, duration, greason, client.getAccID());
        banned = true;
        client.disconnect();
        client.getSession().close();
    }

    public static boolean tempban(String reason, Calendar duration, int greason, int accountid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET tempban = ?, banreason = ?, greason = ? WHERE id = ?");
            Timestamp TS = new Timestamp(duration.getTimeInMillis());
            ps.setTimestamp(1, TS);
            ps.setString(2, reason);
            ps.setInt(3, greason);
            ps.setInt(4, accountid);
            ps.executeUpdate();
            ps.close();
            return true;
        } catch (SQLException ex) {
            log.error("Error while tempbanning", ex);     //10
        }
        return false;
    }

    public void ban(String reason) {
        if (lastmonthfameids == null) {
            throw new RuntimeException("Trying to ban a non-loaded character (testhack)");
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET banned = ?, banreason = ? WHERE id = ?");
            ps.setInt(1, 1);
            ps.setString(2, reason);
            ps.setInt(3, accountid);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error while banning", ex);
        }
        banned = true;
        client.disconnect();
        client.getSession().close();
    }

    public void Dci() {
        client.disconnect();
        client.getSession().close();
    }

    public static boolean ban(String id, String reason, boolean account) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps;
            if (id.matches("/[0-9]{1,3}\\..*")) {
                ps = con.prepareStatement("INSERT INTO ipbans VALUES (DEFAULT, ?)");
                ps.setString(1, id);
                ps.executeUpdate();
                ps.close();
                return true;
            }
            if (account) {
                ps = con.prepareStatement("SELECT id FROM accounts WHERE name = ?");
            } else {
                ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
            }
            boolean ret = false;
            ps.setString(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                int accountId = rs.getInt(1);
                PreparedStatement psb = con.prepareStatement("UPDATE accounts SET banned = 1, banreason = ? WHERE id = ?");
                psb.setString(1, reason);
                psb.setInt(2, accountId);
                psb.executeUpdate();
                psb.close();

                psb = con.prepareStatement("SELECT ip FROM iplog WHERE accountid = ? ORDER by login DESC LIMIT 1");
                psb.setInt(1, accountId);
                ResultSet rsb = psb.executeQuery();
                rsb.next();
                String to = "/" + rsb.getString("ip");
                rsb.close();
                psb.close();

                psb = con.prepareStatement("SELECT ip FROM ipbans WHERE ip = ?");
                psb.setString(1, to);
                rsb = psb.executeQuery();
                if (!rsb.next()) {
                    PreparedStatement psc = con.prepareStatement("INSERT INTO ipbans VALUES (DEFAULT, ?)");
                    psc.setString(1, to);
                    psc.executeUpdate();
                    psc.close();
                }
                rsb.close();
                psb.close();

                psb = con.prepareStatement("SELECT macs FROM accounts WHERE id = ?");
                psb.setInt(1, accountId);
                rsb = psb.executeQuery();
                rsb.next();
                String macAddress = rsb.getString("macs");
                if (!macAddress.matches("")) {
                    String macs[] = macAddress.split(", ");
                    for (int i = 0; i < macs.length; i++) {
                        PreparedStatement psc = con.prepareStatement("SELECT mac FROM macbans WHERE mac = ?");
                        psc.setString(1, macs[i]);
                        ResultSet rsc = psc.executeQuery();
                        if (!rsc.next()) {
                            PreparedStatement psd = con.prepareStatement("INSERT INTO macbans (mac) VALUES (?)");
                            psd.setString(1, macs[i]);
                            psd.executeUpdate();
                            psd.close();
                        }
                        rsc.close();
                        psc.close();
                    }
                }
                rsb.close();
                psb.close();
                ret = true;
            }
            rs.close();
            ps.close();
            return ret;
        } catch (SQLException ex) {
            log.error("Error while banning", ex); //11
        }
        return false;
    }

    public static int getAccIdFromCharName(String name) {
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
            ps.setString(1, name);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                ps.close();
                return -1;
            }
            int id_ = rs.getInt("accountid");
            ps.close();
            return id_;
        } catch (SQLException e) {
            log.error("ERROR", e); //12
        }
        return -1;
    }

    /**
     * Oid of players is always = the cid
     */
    @Override
    public int getObjectId() {
        return getId();
    }

    /**
     * Throws unsupported operation exception, oid of players is read only
     */
    @Override
    public void setObjectId(int id) {
        throw new UnsupportedOperationException();
    }

    public MapleStorage getStorage() {
        return storage;
    }

    public int getCurrentMaxHp() {
        return localmaxhp;
    }

    public int getCurrentMaxMp() {
        return localmaxmp;
    }

    public int getCurrentMaxBaseDamage() {
        return localmaxbasedamage;
    }

    public int calculateMaxBaseDamage(int watk) {
        int maxbasedamage;
        if (watk == 0) {
            maxbasedamage = 1;
        } else {
            IItem weapon_item = getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -11);
            boolean barefists = weapon_item == null && (getJob().isA(MapleJob.PIRATE) || getJob().isA(MapleJob.THIEF_KNIGHT));
            if (weapon_item != null || getJob().isA(MapleJob.PIRATE) || getJob().isA(MapleJob.THIEF_KNIGHT)) {
                MapleWeaponType weapon = barefists ? MapleWeaponType.KNUCKLE : MapleItemInformationProvider.getInstance().getWeaponType(weapon_item.getItemId());
                int mainstat;
                int secondarystat;
                if (weapon == MapleWeaponType.BOW || weapon == MapleWeaponType.CROSSBOW) {
                    mainstat = localdex;
                    secondarystat = localstr;
                } else if ((getJob().isA(MapleJob.THIEF) || getJob().isA(MapleJob.NIGHT_KNIGHT)) && (weapon == MapleWeaponType.CLAW || weapon == MapleWeaponType.DAGGER)) {
                    mainstat = localluk;
                    secondarystat = localdex + localstr;
                } else if ((getJob().isA(MapleJob.PIRATE) || getJob().isA(MapleJob.THIEF_KNIGHT)) && (weapon == MapleWeaponType.GUN)) {
                    mainstat = localdex;
                    secondarystat = localstr;
                } else if ((getJob().isA(MapleJob.PIRATE) || getJob().isA(MapleJob.THIEF_KNIGHT)) && (weapon == MapleWeaponType.KNUCKLE)) {
                    mainstat = localstr;
                    secondarystat = localdex;
                } else {
                    mainstat = localstr;
                    secondarystat = localdex;
                }
                maxbasedamage = (int) (((weapon.getMaxDamageMultiplier() * mainstat + secondarystat) / 100.0) * watk);
                maxbasedamage += 10;
            } else {
                maxbasedamage = 0;
            }
        }
        return maxbasedamage;
    }

    public void addVisibleMapObject(MapleMapObject mo) {
        visibleMapObjects.add(mo);
    }

    public void removeVisibleMapObject(MapleMapObject mo) {
        visibleMapObjects.remove(mo);
    }

    public boolean isMapObjectVisible(MapleMapObject mo) {
        return visibleMapObjects.contains(mo);
    }

    public Collection<MapleMapObject> getVisibleMapObjects() {
        return Collections.unmodifiableCollection(visibleMapObjects);
    }

    public boolean isAlive() {
        return this.hp > 0;
    }

    public void setSlot(int slotid) {
        slots = slotid;
    }

    public int getSlot() {
        return slots;
    }

    public int getCygnusLinkId() {
        return cygnusLinkId;
    }

    public boolean hasBattleShip() {
        try {
            LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList<MapleBuffStatValueHolder>(effects.values());
            for (MapleBuffStatValueHolder mbsvh : allBuffs) {
                if (mbsvh.effect.getSourceId() == 5221006) {
                    return true;
                }
            }
        } catch (Exception ex) {
            return false;
        }
        return false;
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        client.getSession().write(MaplePacketCreator.removePlayerFromMap(this.getObjectId()));
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        if ((this.isHidden() && client.getPlayer().gmLevel() > 0) || !this.isHidden()) {
            client.getSession().write(MaplePacketCreator.spawnPlayerMapobject(this));
	    for (MaplePet pett : pets) {
		getMap().broadcastMessage(this, MaplePacketCreator.showPet(this, pett, false, false), false);
	    }
        }
    }

    private void recalcLocalStats() {
        int oldmaxhp = localmaxhp;
        localmaxhp = getMaxHp();
        localmaxmp = getMaxMp();
        localdex = getDex();
        localint_ = getInt();
        localstr = getStr();
        localluk = getLuk();
        int speed = 100;
        int jump = 100;
        magic = localint_;
        watk = 0;
        for (IItem item : getInventory(MapleInventoryType.EQUIPPED)) {
            IEquip equip = (IEquip) item;
            localmaxhp += equip.getHp();
            localmaxmp += equip.getMp();
            localdex += equip.getDex();
            localint_ += equip.getInt();
            localstr += equip.getStr();
            localluk += equip.getLuk();
            magic += equip.getMatk() + equip.getInt();
            watk += equip.getWatk();
            speed += equip.getSpeed();
            jump += equip.getJump();
        }
        IItem weapon = getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -11);
        if (weapon == null && getJob().isA(MapleJob.PIRATE)) { // Barefists
            watk += 8;
        }
        magic = Math.min(magic, 2000);
        Integer hbhp = getBuffedValue(MapleBuffStat.HYPERBODYHP);
        if (hbhp != null) {
            localmaxhp += (hbhp.doubleValue() / 100) * localmaxhp;
        }
        Integer hbmp = getBuffedValue(MapleBuffStat.HYPERBODYMP);
        if (hbmp != null) {
            localmaxmp += (hbmp.doubleValue() / 100) * localmaxmp;
        }
        localmaxhp = Math.min(30000, localmaxhp);             //总血量
        localmaxmp = Math.min(30000, localmaxmp);
        Integer watkbuff = getBuffedValue(MapleBuffStat.WATK);
        if (watkbuff != null) {
            watk += watkbuff.intValue();
        }
        if (job.isA(MapleJob.BOWMAN)) {
            ISkill expert = null;
            if (job.isA(MapleJob.CROSSBOWMASTER)) {
                expert = SkillFactory.getSkill(3220004);
            } else if (job.isA(MapleJob.BOWMASTER)) {
                expert = SkillFactory.getSkill(3120005);
            }
            if (expert != null) {
                int boostLevel = getSkillLevel(expert);
                if (boostLevel > 0) {
                    watk += expert.getEffect(boostLevel).getX();
                }
            }
        }
        Integer matkbuff = getBuffedValue(MapleBuffStat.MATK);
        if (matkbuff != null) {
            magic += matkbuff.intValue();
        }
        Integer speedbuff = getBuffedValue(MapleBuffStat.SPEED);
        if (speedbuff != null) {
            speed += speedbuff.intValue();
        }
        Integer jumpbuff = getBuffedValue(MapleBuffStat.JUMP);
        if (jumpbuff != null) {
            jump += jumpbuff.intValue();
        }
        if (speed > 140) {
            speed = 140;
        }
        if (jump > 123) {
            jump = 123;
        }
        speedMod = speed / 100.0;
        jumpMod = jump / 100.0;
        Integer mount = getBuffedValue(MapleBuffStat.MONSTER_RIDING);
        if (mount != null) {
            jumpMod = 1.23;
            switch (mount.intValue()) {
                case 1:
                    speedMod = 1.5;
                    break;
                case 2:
                    speedMod = 1.7;
                    break;
                case 3:
                    speedMod = 1.8;
                    break;
                case 5:
                    speedMod = 1.0;
                    jumpMod = 1.0;
                    break;
                default:
                    speedMod = 2.0;
            }
        }
        Integer mWarrior = getBuffedValue(MapleBuffStat.MAPLE_WARRIOR);
        if (mWarrior != null) {
            localstr += (mWarrior.doubleValue() / 100) * localstr;
            localdex += (mWarrior.doubleValue() / 100) * localdex;
            localint_ += (mWarrior.doubleValue() / 100) * localint_;
            localluk += (mWarrior.doubleValue() / 100) * localluk;
        }
        localmaxbasedamage = calculateMaxBaseDamage(watk);
        if (oldmaxhp != 0 && oldmaxhp != localmaxhp) {
            updatePartyMemberHP();
        }
    }

    public void Mount(int id, int skillid) {
        maplemount = new MapleMount(this, id, skillid);
    }

    public MapleMount getMount() {
        return maplemount;
    }

    public void equipChanged() {
        getMap().broadcastMessage(this, MaplePacketCreator.updateCharLook(this), false);
        recalcLocalStats();
        enforceMaxHpMp();
        if (getClient().getPlayer().getMessenger() != null) {
            WorldChannelInterface wci = ChannelServer.getInstance(getClient().getChannel()).getWorldInterface();
            try {
                wci.updateMessenger(getClient().getPlayer().getMessenger().getId(), getClient().getPlayer().getName(), getClient().getChannel());
            } catch (RemoteException e) {
                getClient().getChannelServer().reconnectWorld();
            }
        }
    }

    public FameStatus canGiveFame(MapleCharacter from) {
        if (lastfametime >= System.currentTimeMillis() - 60 * 60 * 24 * 1000) {
            return FameStatus.NOT_TODAY;
        } else if (lastmonthfameids.contains(Integer.valueOf(from.getId()))) {
            return FameStatus.NOT_THIS_MONTH;
        } else {
            return FameStatus.OK;
        }
    }

    public void hasGivenFame(MapleCharacter to) {
        lastfametime = System.currentTimeMillis();
        lastmonthfameids.add(Integer.valueOf(to.getId()));
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("INSERT INTO famelog (characterid, characterid_to) VALUES (?, ?)");
            ps.setInt(1, getId());
            ps.setInt(2, to.getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            log.error("ERROR writing famelog for char " + getName() + " to " + to.getName(), e);    //13
        }
    }

    public MapleParty getParty() {
        return party;
    }

    public int getPartyId() {
        return (party != null ? party.getId() : -1);
    }

    public boolean getPartyInvited() {
        return partyInvite;
    }

    public void setPartyInvited(boolean invite) {
        this.partyInvite = invite;
    }

    public long getLastSave() {
        return lastSave;
    }

    public void setLastSave(long lastSave) {
        this.lastSave = lastSave;
    }

    public boolean isMuted() {
        if (Calendar.getInstance().after(unmuteTime)) {
            muted = false;
        }
        return muted;
    }

    public void setMuted(boolean mute) {
        this.muted = mute;
    }

    public void setUnmuteTime(Calendar time) {
        unmuteTime = time;
    }

    public Calendar getUnmuteTime() {
        return this.unmuteTime;
    }

    public int getWorld() {
        return world;
    }

    public void setWorld(int world) {
        this.world = world;
    }

    public void setParty(MapleParty party) {
        this.party = party;
    }

    public int getVanquisherKills() {
        return vanquisherKills;
    }

    public int getVanquisherStage() {
        return vanquisherStage;
    }
            
    public void setVanquisherKills(int x) {
        this.vanquisherKills = x;
    }

    public void setVanquisherStage(int x) {
        this.vanquisherStage = x;
    }

    public MapleTrade getTrade() {
        return trade;
    }

    public void setTrade(MapleTrade trade) {
        this.trade = trade;
    }

    public EventInstanceManager getEventInstance() {
        return eventInstance;
    }

    public void setEventInstance(EventInstanceManager eventInstance) {
        this.eventInstance = eventInstance;
    }

    public void addDoor(MapleDoor door) {
        doors.add(door);
    }

    public void clearDoors() {
        doors.clear();
    }

    public List<MapleDoor> getDoors() {
        return new ArrayList<MapleDoor>(doors);
    }

    public boolean canDoor() {
        return canDoor;
    }

    public void disableDoor() {
        canDoor = false;
        TimerManager.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                canDoor = true;
            }
        }, 5000);
    }

    public MapleInventory[] getAllInventories() {
        return inventory;
    }

    public Map<Integer, MapleSummon> getSummons() {
        return summons;
    }

    public int getChair() {
        return chair;
    }

    public int getItemEffect() {
        return itemEffect;
    }

    public void setChair(int chair) {
        this.chair = chair;
    }

    public void setItemEffect(int itemEffect) {
        this.itemEffect = itemEffect;
    }

    @Override
    public Collection<MapleInventory> allInventories() {
        return Arrays.asList(inventory);
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.PLAYER;
    }

    public MapleGuild getGuild() {
        try {
            return getClient().getChannelServer().getWorldInterface().getGuild(getGuildId(), mgc);
        } catch (Exception e) {
        }
        return null;
    }

    public int getGuildId() {
        return guildid;
    }

    public int getGuildRank() {
        return guildrank;
    }

    public void setGuildId(int _id) {
        guildid = _id;
        if (guildid > 0) {
            if (mgc == null) {
                mgc = new MapleGuildCharacter(this);
            } else {
                mgc.setGuildId(guildid);
            }
        } else {
            mgc = null;
        }
    }

    public void setGuildRank(int _rank) {
        guildrank = _rank;
        if (mgc != null) {
            mgc.setGuildRank(_rank);
        }
    }

    public MapleGuildCharacter getMGC() {
        return mgc;
    }

    public void guildUpdate() {
        if (this.guildid <= 0) {
            return;
        }

        mgc.setLevel(this.level);
        mgc.setJobId(this.job.getId());

        try {
            this.client.getChannelServer().getWorldInterface().memberLevelJobUpdate(this.mgc);
        } catch (RemoteException re) {
            log.error("RemoteExcept while trying to update level/job in guild.", re);    //14
        }
    }
    private NumberFormat nf = new DecimalFormat("#,###,###,###");

    public String guildCost() {
        return nf.format(MapleGuild.CREATE_GUILD_COST);
    }

    public String emblemCost() {
        return nf.format(MapleGuild.CHANGE_EMBLEM_COST);
    }

    public String capacityCost() {
        return nf.format(MapleGuild.INCREASE_CAPACITY_COST);
    }

    public void genericGuildMessage(int code) {
        this.client.getSession().write(MaplePacketCreator.genericGuildMessage((byte) code));
    }

    public void disbandGuild() {
        if (guildid <= 0 || guildrank != 1) {
            log.warn(this.name + " tried to disband and he/she is either not in a guild or not leader.");
            return;
        }

        try {
            client.getChannelServer().getWorldInterface().disbandGuild(this.guildid);
        } catch (Exception e) {
            log.error("Error while disbanding guild.", e);      //15
        }
    }

    public void increaseGuildCapacity() {
        if (this.getMeso() < MapleGuild.INCREASE_CAPACITY_COST) {
            client.getSession().write(MaplePacketCreator.serverNotice(1, "You do not have enough mesos."));
            return;
        }

        if (this.guildid <= 0) {
            log.info(this.name + " is trying to increase guild capacity without being in the guild.");
            return;
        }

        try {
            client.getChannelServer().getWorldInterface().increaseGuildCapacity(this.guildid);
        } catch (Exception e) {
            log.error("Error while increasing capacity.", e);     //16
            return;
        }

        this.gainMeso(-MapleGuild.INCREASE_CAPACITY_COST, true, false, true);
    }

    public void saveGuildStatus() {
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("UPDATE characters SET guildid = ?, guildrank = ? WHERE id = ?");
            ps.setInt(1, this.guildid);
            ps.setInt(2, this.guildrank);
            ps.setInt(3, this.id);
            ps.execute();
            ps.close();
        } catch (SQLException se) {
            log.error("SQL error: " + se.getLocalizedMessage(), se);        //17
        }
    }

    public void setAllianceRank(int rank) {
        allianceRank = rank;
        if (mgc != null) {
            mgc.setAllianceRank(rank);
        }
    }

    public int getAllianceRank() {
        return this.allianceRank;
    }

    /**
     * Allows you to change someone's NXCash, Maple Points, and Gift Tokens!
     *
     * Created by Acrylic/Penguins
     *
     * @param type: 0 = NX, 1 = MP, 2 = GT
     * @param quantity: how much to modify it by. Negatives subtract points, Positives add points.
     */
    public void modifyCSPoints(int type, int quantity) {
        switch (type) {
            case 0:
                this.paypalnx += quantity;
                break;
            case 1:
                this.maplepoints += quantity;
                break;
            case 4:
                this.cardnx += quantity;
                break;
        }
    }

    public int getCSPoints(int type) {
        switch (type) {
            case 0:
                return this.paypalnx;
            case 1:
                return this.maplepoints;
            case 4:
                return this.cardnx;
            default:
                return 0;
        }
    }

    public boolean haveItem(int itemid, int quantity, boolean checkEquipped, boolean exact) {
        // if exact is true, then possessed must be EXACTLY equal to quantity. else, possessed can be >= quantity
        MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(itemid);
        MapleInventory iv = inventory[type.ordinal()];
        int possessed = iv.countById(itemid);
        if (checkEquipped) {
            possessed += inventory[MapleInventoryType.EQUIPPED.ordinal()].countById(itemid);
        }
        if (exact) {
            return possessed == quantity;
        } else {
            return possessed >= quantity;
        }
    }

    public boolean haveItem(int[] itemids, int quantity, boolean exact) {
        for (int itemid : itemids) {
            MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(itemid);
            MapleInventory iv = inventory[type.ordinal()];
            int possessed = iv.countById(itemid);
            possessed += inventory[MapleInventoryType.EQUIPPED.ordinal()].countById(itemid);
            if (possessed >= quantity) {
                if (exact) {
                    if (possessed == quantity) {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        }
        return false;
    }

    public int getItemAmount(int itemid) {
        MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(itemid);
        MapleInventory iv = inventory[type.ordinal()];
        int possesed = iv.countById(itemid);
        return possesed;
    }

    public MapleCSInventory getCSInventory() {
        if (csinventory == null) {
            csinventory = new MapleCSInventory(this);
        }
        return csinventory;
    }
     
    public int getJobID() { //得到职业ID
        return job.getId();
    }
     
///////////////////////////高级任务函数包//////////////////////////////////////
    public int[] StringtoInt(String str) {
        int ret[] = new int[100]; //最大支持100个前置条件参数
        StringTokenizer toKenizer = new StringTokenizer(str, ",");
        String[] strx = new String[toKenizer.countTokens()];
        for (int i = 0; i < toKenizer.countTokens(); i++) {
            strx[i] = toKenizer.nextToken();
            ret[i] = Integer.valueOf(strx[i]);
        }
        return ret;
    }

    //高级任务系统 - 检查基础条件是否符合所有任务前置条件
    public boolean MissionCanMake(int missionid) {
        boolean ret = true;
        for (int i = 1; i < 5; i++) {
            if (!MissionCanMake(missionid, i)) { //检查每一个任务条件是否满足
                ret = false;
            }
        }
        return ret;
    }

    //高级任务系统 - 检查基础条件是否符合指定任务前置条件
    public boolean MissionCanMake(int missionid, int checktype) {
        //checktype
        //1 检查等级范围
        //2 检查职业
        //3 检查物品
        //4 检查前置任务
        boolean ret = false;
        int minlevel = -1, maxlevel = -1; //默认不限制接任务的等级范围
        String joblist = "all", itemlist = "none", prelist = "none"; //默认所有职业可以接，默认不需要任何前置物品和任务
        try {
            PreparedStatement ps;
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM missionlist WHERE missionid = ?");
            ps.setInt(1, missionid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                minlevel = rs.getInt("minlevel");
                maxlevel = rs.getInt("maxlevel");
                joblist = rs.getString("joblist");
                itemlist = rs.getString("itemlist");
                prelist = rs.getString("prelist");
            }
            rs.close();
            ps.close();
            //判断检查条件是否吻合
            switch (checktype) {
                case 1: //判断级别是否符合要求
                    if (minlevel > -1 && maxlevel > -1) { //双范围检查
                        if (getLevel() >= minlevel && getLevel() <= maxlevel) {
                            ret = true;
                        }
                    } else if (minlevel > -1 && maxlevel == -1) { //只有最小限制
                        if (getLevel() >= minlevel) {
                            ret = true;
                        }
                    } else if (minlevel == -1 && maxlevel > -1) { //只有最大限制
                        if (getLevel() <= maxlevel) {
                            ret = true;
                        }
                    } else if (minlevel == -1 && maxlevel == -1) { //如果是默认值-1，表示任何等级都可以接
                        ret = true;
                    }
                    break;
                case 2: //检查职业是否符合要求
                    if (joblist.equals("all")) { //所有职业多可以接
                        ret = true;
                    } else {
                        for (int i : StringtoInt(joblist)) {
                            if (getJobID() == i) { //只要自己的职业ID在这个清单里，就是符合要求，立即跳出检查
                                ret = true;
                                break;
                            }
                        }
                    }
                    break;
                case 3: //检查前置物品是否有
                    if (itemlist.equals("none")) { //没有前置物品要求
                        ret = true;
                    } else {
                        for (int i : StringtoInt(itemlist)) {
                            if (!haveItem(i)) { //如果没有清单里要求的物品，立即跳出检查
                                ret = false;
                                break;
                            }
                        }
                    }
                    break;
                case 4: //检查前置任务是否有完成
                    if (prelist.equals("none")) { //前置任务是否完成
                        ret = true;
                    } else {
                        for (int i : StringtoInt(prelist)) {
                            if (!MissionStatus(getId(), i, 0, 1)) { //如果要求的前置任务没完成或从来没接过，立即跳出检查
                                ret = false;
                                break;
                            }
                        }
                    }
                    break;
            }
        } catch (SQLException ex) {
            log.error("Error MissionCanMake:", ex);
        }
        return ret;
    }

    //高级任务函数 - 得到任务的等级数据
    public int MissionGetIntData(int missionid, int checktype) {
        //checktype
        //1 最小等级
        //2 最大等级
        int ret = -1;
        int minlevel = -1, maxlevel = -1;
        try {
            PreparedStatement ps;
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM missionlist WHERE missionid = ?");
            ps.setInt(1, missionid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                minlevel = rs.getInt("minlevel");
                maxlevel = rs.getInt("maxlevel");
            }
            rs.close();
            ps.close();
            //判断检查条件是否吻合
            switch (checktype) {
                case 1:
                    ret = minlevel;
                    break;
                case 2:
                    ret = maxlevel;
                    break;
            }
        } catch (SQLException ex) {
            log.error("Error MissionGetIntData:", ex);
        }
        return ret;
    }

    //高级任务函数 - 得到任务的的字符串型数据
    public String MissionGetStrData(int missionid, int checktype) {
        //checktype
        //1 任务名称
        //2 职业列表
        //3 物品列表
        //4 前置任务列表
        String ret = "";
        String missionname = "", joblist = "all", itemlist = "none", prelist = "none"; //默认所有职业可以接，默认不需要任何前置物品和任务
        try {
            PreparedStatement ps;
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM missionlist WHERE missionid = ?");
            ps.setInt(1, missionid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                missionname = rs.getString("missionname");
                joblist = rs.getString("joblist");
                itemlist = rs.getString("itemlist");
                prelist = rs.getString("prelist");
            }
            rs.close();
            ps.close();
            //判断检查条件是否吻合
            switch (checktype) {
                case 1:
                    ret = missionname;
                    break;
                case 2:
                    ret = joblist;
                    break;
                case 3:
                    ret = itemlist;
                    break;
                case 4:
                    ret = prelist;
                    break;
            }
        } catch (SQLException ex) {
            log.error("Error MissionCanMake:", ex);
        }
        return ret;
    }

    //高级任务函数 - 直接输出需要的职业列表串
    public String MissionGetJoblist(String joblist) {
        String ret = "", jobname = "";
        PreparedStatement ps;
        Connection con = DatabaseConnection.getConnection();
        try {
            for (int i : StringtoInt(joblist)) {
                ps = con.prepareStatement("SELECT * FROM joblist WHERE id = ?");
                ps.setInt(1, i);
                ResultSet rs = ps.executeQuery();
                if (rs.next()) {
                    jobname = jobname + "," + rs.getString("jobname");
                }
                rs.close();
                ps.close();
            }
        } catch (SQLException ex) {
            log.error("Error MissionGetJoblist:", ex);
        }
        return ret;
    }

    //高级任务系统 - 任务创建
    public void MissionMake(int charid, int missionid, int repeat, int repeattime, int lockmap, int mobid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO missionstatus VALUES (DEFAULT, ?, ?, ?, ?, ?, 0, DEFAULT, 0, 0, ?, 0, 0)");
            ps.setInt(1, missionid);
            ps.setInt(2, charid);
            ps.setInt(3, repeat);
            ps.setInt(4, repeattime);
            ps.setInt(5, lockmap);
            ps.setInt(6, mobid);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error MissionMake:", ex);
        }
    }

    //高级任务系统 - 重新做同一个任务
    public void MissionReMake(int charid, int missionid, int repeat, int repeattime, int lockmap) {
        int finish = 0;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE missionstatus SET `repeat` = ?, repeattime = ?, lockmap = ?, finish = ?, minnum = 0 WHERE missionid = ? and charid = ?");
            ps.setInt(1, repeat);
            ps.setInt(2, repeattime);
            ps.setInt(3, lockmap);
            ps.setInt(4, finish);
            ps.setInt(5, missionid);
            ps.setInt(6, charid);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error MissionFinish:", ex);
        }
    }

    //高级任务系统 - 任务完成
    public void MissionFinish(int charid, int missionid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE missionstatus SET finish = 1, lastdate = CURRENT_TIMESTAMP(), times = times+1, lockmap = 0 WHERE missionid = ? and charid = ?");
            ps.setInt(1, missionid);
            ps.setInt(2, charid);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error MissionFinish:", ex);
        }
    }

    //高级任务系统 - 放弃任务
    public void MissionDelete(int charid, int missionid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM missionstatus WHERE missionid = ? and charid = ?");
            ps.setInt(1, missionid);
            ps.setInt(2, charid);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error MissionDelete:", ex);
        }
    }

    //高级任务系统 - 增加指定任务的打怪数量
    public void MissionAddMinNum(int missionid, int addnum) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE missionstatus SET `minnum` = `minnum` + ? WHERE missionid = ? and charid = ?");
            ps.setInt(1, addnum);
            ps.setInt(2, missionid);
            ps.setInt(3, getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error MissionAddNum:", ex);
        }
    }

    //高级任务系统 - 指定任务的需要最大打怪数量
    public void MissionMaxNum(int missionid, int maxnum) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE missionstatus SET `maxnum` = ? WHERE missionid = ? and charid = ?");
            ps.setInt(1, maxnum);
            ps.setInt(2, missionid);
            ps.setInt(3, getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error MissionMaxNum:", ex);
        }
    }

    public void MissionMob(int mobid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM missionstatus WHERE charid = ? and mobid = ?");
            ps.setInt(1, getId());
            ps.setInt(2, mobid);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) { //所有属于相同怪的任务，都会自动加
                if (rs.getInt("minnum") < rs.getInt("maxnum")) { //打怪数小于需要的总数
                    MissionAddMinNum(rs.getInt("missionid"), 1); //给这个打怪数加1
                    dropMessage("高级任务 [" + MissionGetStrData(rs.getInt("missionid"), 1) + "-" + rs.getInt("missionid") + "]  完成条件 [" + rs.getInt("minnum") + "/" + rs.getInt("maxnum") + "]");
                } else {
                    MissionFinish(getId(), rs.getInt("missionid")); //自动完成任务
                    startMapEffect("高级任务 [" + MissionGetStrData(rs.getInt("missionid"), 1) + "-" + rs.getInt("missionid") + "]  任务完成！", 5120025); //任务完成有提示
                }
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error MissionMob:", ex);
        }
    }

    //高级任务系统 - 放弃所有未完成任务
    public void MissionDeleteNotFinish(int charid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM missionstatus WHERE finish = 0 and charid = ?");
            ps.setInt(1, charid);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error MissionDeleteNotFinish:", ex);
        }
    }

    public boolean haveItem(int itemid) {
        return haveItem(itemid, 1, false, true);
    }

    //高级任务系统 - 获得任务是否可以做
    public boolean MissionStatus(int charid, int missionid, int maxtimes, int checktype) {
        // checktype
        // 0 检查此任务是否被完成了
        // 1 检查此任务是否允许重复做
        // 2 检查此任务重复做的时间间隔是否到
        // 3 检查此任务是否到达最大的任务次数
        // 4 检查是否接过此任务，即是否第一次做这个任务
        // 5 检查是否接了锁地图传送的任务
        boolean ret = false; //默认是可以做
        int MissionMake = 0; //默认是没有接过此任务
        long now = 0;
        long t = 0;
        Timestamp lastdate;
        int repeat = 0;
        int repeattime = 0;
        int finish = 0;
        int times = 0;
        try {
            PreparedStatement ps;
            Connection con = DatabaseConnection.getConnection();
            if (checktype == 5) {
                ps = con.prepareStatement("SELECT * FROM missionstatus WHERE lockmap = 1 and charid = ?");
                ps.setInt(1, charid);
            } else {
                ps = con.prepareStatement("SELECT * FROM missionstatus WHERE missionid = ? and charid = ?");
                ps.setInt(1, missionid);
                ps.setInt(2, charid);
            }
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                lastdate = rs.getTimestamp("lastdate");
                repeat = rs.getInt("repeat");
                repeattime = rs.getInt("repeattime");
                finish = rs.getInt("finish");
                times = rs.getInt("times");
                t = lastdate.getTime();
                now = System.currentTimeMillis();
                MissionMake = 1; //标明这个任务已经接过了
            }
            rs.close();
            ps.close();
            //判断检查状态类型
            switch (checktype) {
                case 0:
                    if (finish == 1) {
                        ret = true;
                    }
                    break;
                case 1:
                    if (repeat == 1) {
                        ret = true;
                    }
                    break;
                case 2:
                    if (now - t > repeattime) { // 判断如果有没有到指定的重复做任务间隔时间
                        //已经到了间隔时间
                        ret = true;
                    }
                    break;
                case 3:
                    if (times >= maxtimes) {
                        //任务到达最大次数
                        ret = true;
                    }
                    break;
                case 4:
                    if (MissionMake == 1) {
                        //此任务已经接过了
                        ret = true;
                    }
                    break;
                case 5:
                    if (MissionMake == 1) {
                        //已经接了锁地图的任务
                        ret = true;
                    }
            }
        } catch (SQLException ex) {
            log.error("Error MissionStatus:", ex);
        }
        return ret;
    }
    //闯关任务 - 接任务
    public void TaskMake(int missionid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO missionstatus VALUES (DEFAULT, ?, ?, 0, 0, 0, 0, DEFAULT, 0, 0, 0, 0, 0)");
            ps.setInt(1, missionid);
            ps.setInt(2, getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("错误创建闯关任务:", ex);
        }
    }
    //闯关任务 - 检查是否接过任务
    public boolean TaskStatus(int missionid) {
        boolean ret = false; //默认是没有接过任务
        try {
            PreparedStatement ps;
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM missionstatus WHERE missionid = ? and charid = ?");
            ps.setInt(1, missionid);
            ps.setInt(2, getId());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ret = true; //标明这个任务已经接过了
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("错误读取闯关任务状态:", ex);
        }
        return ret;
    }
    //闯关任务 - 得到当前关卡积分
    public int TaskExp(int missionid) {
        int ret = 0; //默认是0积分
        try {
            PreparedStatement ps;
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM missionstatus WHERE missionid = ? and charid = ?");
            ps.setInt(1, missionid);
            ps.setInt(2, getId());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ret = rs.getInt("exp"); //得到积分
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("错误读取闯关任务积分:", ex);
        }
        return ret;
    }

    public void setzbLog(String fsbid) {
        java.sql.Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("insert into zblog (characterid, fsbtype,accountid,account,charactername) values (?,?,?,?,?)");
            ps.setInt(1, this.id);
            ps.setString(2, fsbid);
            ps.setInt(3, getClient().getAccID());
            ps.setString(4, getClient().getAccountName());
            ps.setString(5, getClient().getPlayer().getName());
            ps.executeUpdate();
            ps.close();
        } catch (Exception Ex) {
            log.error("插入语句错误，请确认你的SQL密码正确且没有关闭。", Ex);
        }
    }

    //闯关任务 - 得到闯关积分
    public void TaskAddExp(int missionid, int addexp) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE missionstatus SET `exp` = `exp` + ? WHERE missionid = ? and charid = ?");
            ps.setInt(1, addexp);
            ps.setInt(2, missionid);
            ps.setInt(3, getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("错误的更新闯关任务积分:", ex);
        }
    }
    
    private static class MapleBuffStatValueHolder {

        public MapleStatEffect effect;
        public long startTime;
        public int value;
        public ScheduledFuture<?> schedule;

        public MapleBuffStatValueHolder(MapleStatEffect effect, long startTime, ScheduledFuture<?> schedule, int value) {
            super();
            this.effect = effect;
            this.startTime = startTime;
            this.schedule = schedule;
            this.value = value;
        }
    }

    public static class MapleCoolDownValueHolder {

        public int skillId;
        public long startTime;
        public long length;
        public ScheduledFuture<?> timer;

        public MapleCoolDownValueHolder(int skillId, long startTime, long length, ScheduledFuture<?> timer) {
            super();
            this.skillId = skillId;
            this.startTime = startTime;
            this.length = length;
            this.timer = timer;
        }
    }

    public static class SkillEntry {

        public int skillevel;
        public int masterlevel;

        public SkillEntry(int skillevel, int masterlevel) {
            this.skillevel = skillevel;
            this.masterlevel = masterlevel;
        }

        @Override
        public String toString() {
            return skillevel + ":" + masterlevel;
        }
    }

    public void expirationTask() {
        Timestamp currenttime = new Timestamp(System.currentTimeMillis());
        List<IItem> toberemove = new ArrayList<IItem>();
        for (MapleInventory inv : inventory) {
            for (IItem item : inv.list()) {
                Timestamp expiration = item.getExpiration();
                if (expiration != null) {
                    if (!currenttime.after(expiration)) {
                        client.getSession().write(MaplePacketCreator.itemExpired(item.getItemId()));
                        toberemove.add(item);
                    }
                }
            }
            for (IItem item : toberemove) {
                MapleInventoryManipulator.removeFromSlot(client, inv.getType(), item.getPosition(), item.getQuantity(), true);
            }
            toberemove.clear();
        }
    }

    public enum FameStatus {

        OK, NOT_TODAY, NOT_THIS_MONTH
    }

    public void forceUpdateItem(MapleInventoryType type, IItem item) {
        client.getSession().write(MaplePacketCreator.clearInventoryItem(type, item.getPosition(), false));
        client.getSession().write(MaplePacketCreator.addInventorySlot(type, item, false));
    }

    public int getBuddyCapacity() {
        return buddylist.getCapacity();
    }

    public void setBuddyCapacity(int capacity) {
        buddylist.setCapacity(capacity);
        client.getSession().write(MaplePacketCreator.updateBuddyCapacity(capacity));
    }

    public MapleMessenger getMessenger() {
        return messenger;
    }

    public void setMessenger(MapleMessenger messenger) {
        this.messenger = messenger;
    }

    public void startCygnusIntro() {
        client.getSession().write(MaplePacketCreator.CygnusIntroDisableUI(true));
        client.getSession().write(MaplePacketCreator.CygnusIntroLock(true));
        saveLocation(SavedLocationType.CYGNUSINTRO);

        MapleMap introMap = client.getChannelServer().getMapFactory().getMap(913040000);
        changeMap(introMap, introMap.getPortal(0));

        TimerManager.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                client.getSession().write(MaplePacketCreator.CygnusIntroDisableUI(false));
                client.getSession().write(MaplePacketCreator.CygnusIntroLock(false));
            }
        }, 54 * 1000);
    }

    
    
    public void startCygnusIntro_3() {
        client.getSession().write(MaplePacketCreator.CygnusIntroDisableUI(true));
        client.getSession().write(MaplePacketCreator.CygnusIntroLock(true));
        saveLocation(SavedLocationType.CYGNUSINTRO);

        MapleMap introMap = client.getChannelServer().getMapFactory().getMap(0);
        changeMap(introMap, introMap.getPortal(0));

        TimerManager.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                client.getSession().write(MaplePacketCreator.CygnusIntroDisableUI(false));
                client.getSession().write(MaplePacketCreator.CygnusIntroLock(false));
            }
        }, 15 * 1000);
    }

    public void checkMessenger() {
        if (messenger != null && messengerposition < 4 && messengerposition > -1) {
            try {
                WorldChannelInterface wci = ChannelServer.getInstance(client.getChannel()).getWorldInterface();
                MapleMessengerCharacter messengerplayer = new MapleMessengerCharacter(client.getPlayer(), messengerposition);
                wci.silentJoinMessenger(messenger.getId(), messengerplayer, messengerposition);
                wci.updateMessenger(getClient().getPlayer().getMessenger().getId(), getClient().getPlayer().getName(), getClient().getChannel());
            } catch (RemoteException e) {
                client.getChannelServer().reconnectWorld();
            }
        }
    }

    public int getMessengerPosition() {
        return messengerposition;
    }

    public void setMessengerPosition(int position) {
        this.messengerposition = position;
    }

    public int hasEXPCard() {
        int[] expCards = {5210000, 5210001, 5210002, 5210003, 5210004, 5210005, 5211000, 5211001, 5211002, 5211047};
        MapleInventory iv = getInventory(MapleInventoryType.CASH);
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        for (Integer id : expCards) {
            if (iv.countById(id) > 0) {
                if (ii.isExpOrDropCardTime(id)) {
                    return 2;
                }
            }
        }
        return 1;
    }

    public int hasDropCard() {
        int[] dropCards = {5360000, 5360014, 5360015, 5360016};
        MapleInventory iv = getInventory(MapleInventoryType.CASH);
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        for (Integer id : dropCards) {
            if (iv.countById(id) > 0) {
                if (ii.isExpOrDropCardTime(id)) {
                    return 2;
                }
            }
        }
        return 1;
    }

    public boolean getNXCodeValid(String code, boolean validcode) throws SQLException {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("SELECT `valid` FROM nxcode WHERE code = ?");
        ps.setString(1, code);
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            validcode = rs.getInt("valid") == 0 ? false : true;
        }
        rs.close();
        ps.close();
        return validcode;
    }

    public int getNXCodeType(String code) throws SQLException {
        int type = -1;
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("SELECT `type` FROM nxcode WHERE code = ?");
        ps.setString(1, code);
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            type = rs.getInt("type");
        }
        rs.close();
        ps.close();
        return type;
    }

    public int getNXCodeItem(String code) throws SQLException {
        int item = -1;
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("SELECT `item` FROM nxcode WHERE code = ?");
        ps.setString(1, code);
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            item = rs.getInt("item");
        }
        rs.close();
        ps.close();
        return item;
    }

    public void setNXCodeUsed(String code) throws SQLException {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("UPDATE nxcode SET `valid` = 0 WHERE code = ?");
        ps.setString(1, code);
        ps.executeUpdate();
        ps = con.prepareStatement("UPDATE nxcode SET `user` = ? WHERE code = ?");
        ps.setString(1, this.getName());
        ps.setString(2, code);
        ps.executeUpdate();
        ps.close();
    }

    public void setInCS(boolean inCS) {
        this.incs = inCS;
    }

    public boolean inCS() {
        return this.incs;
    }

    public int getEnergy() {
        return energybar;
    }

    public void setInMTS(boolean inMTS) {
        this.inmts = inMTS;
    }

    public boolean inMTS() {
        return this.inmts;
    }

    public void addCooldown(int skillId, long startTime, long length, ScheduledFuture<?> timer) {
        if (!hasGMLevel(5)) {
            if (this.coolDowns.containsKey(Integer.valueOf(skillId))) {
                this.coolDowns.remove(skillId);
            }
            this.coolDowns.put(Integer.valueOf(skillId), new MapleCoolDownValueHolder(skillId, startTime, length, timer));
        } else {
            getClient().getSession().write(MaplePacketCreator.skillCooldown(skillId, 0));
        }
    }

    public void giveCoolDowns(final int skillid, long starttime, long length) {
        int time = (int) ((length + starttime) - System.currentTimeMillis());
        ScheduledFuture<?> timer = TimerManager.getInstance().schedule(new CancelCooldownAction(this, skillid), time);
        addCooldown(skillid, System.currentTimeMillis(), time, timer);
    }

    public void removeCooldown(int skillId) {
        if (this.coolDowns.containsKey(Integer.valueOf(skillId))) {
            this.coolDowns.remove(Integer.valueOf(skillId));
        }
        getClient().getSession().write(MaplePacketCreator.skillCooldown(skillId, 0));
    }

    public boolean skillisCooling(int skillId) {
        return this.coolDowns.containsKey(Integer.valueOf(skillId));
    }

    public List<PlayerCoolDownValueHolder> getAllCooldowns() {
        List<PlayerCoolDownValueHolder> ret = new ArrayList<PlayerCoolDownValueHolder>();
        for (MapleCoolDownValueHolder mcdvh : coolDowns.values()) {
            ret.add(new PlayerCoolDownValueHolder(mcdvh.skillId, mcdvh.startTime, mcdvh.length));
        }
        return ret;
    }

    public static class CancelCooldownAction implements Runnable {

        private int skillId;
        private WeakReference<MapleCharacter> target;

        public CancelCooldownAction(MapleCharacter target, int skillId) {
            this.target = new WeakReference<MapleCharacter>(target);
            this.skillId = skillId;
        }

        @Override
        public void run() {
            MapleCharacter realTarget = target.get();
            if (realTarget != null) {
                realTarget.removeCooldown(skillId);
            }
        }
    }

    public void giveDebuff(MapleDisease disease, MobSkill skill) {
        synchronized (diseases) {
            if (isAlive() && !isActiveBuffedValue(2321005) && !diseases.contains(disease) && diseases.size() < 2) {
                diseases.add(disease);
                List<Pair<MapleDisease, Integer>> debuff = Collections.singletonList(new Pair<MapleDisease, Integer>(disease, Integer.valueOf(skill.getX())));
                long mask = 0;
                for (Pair<MapleDisease, Integer> statup : debuff) {
                    mask |= statup.getLeft().getValue();
                }
                getClient().getSession().write(MaplePacketCreator.giveDebuff(mask, debuff, skill));
                getMap().broadcastMessage(this, MaplePacketCreator.giveForeignDebuff(id, mask, skill), false);

                if (isAlive() && diseases.contains(disease)) {
                    final MapleCharacter character = this;
                    final MapleDisease disease_ = disease;
                    TimerManager.getInstance().schedule(new Runnable() {

                        @Override
                        public void run() {
                            if (character.diseases.contains(disease_)) {
                                dispelDebuff(disease_);
                            }
                        }
                    }, skill.getDuration());
                }
            }
        }
    }

    public List<MapleDisease> getDiseases() {
        return diseases;
    }

    public void dispelDebuff(MapleDisease debuff) {
        if (diseases.contains(debuff)) {
            diseases.remove(debuff);
            long mask = debuff.getValue();
            getClient().getSession().write(MaplePacketCreator.cancelDebuff(mask));
            getMap().broadcastMessage(this, MaplePacketCreator.cancelForeignDebuff(id, mask), false);
        }
    }

    public void dispelDebuffs() {
        List<MapleDisease> ret = new LinkedList<MapleDisease>(diseases);
        for (MapleDisease disease : ret) {
            if (!disease.equals(MapleDisease.SEDUCE) && !disease.equals(MapleDisease.STUN)) {
                diseases.remove(disease);
                long mask = disease.getValue();
                getClient().getSession().write(MaplePacketCreator.cancelDebuff(mask));
                getMap().broadcastMessage(this, MaplePacketCreator.cancelForeignDebuff(id, mask), false);
            }
        }
    }

    public void dispelDebuffsi() {
        List<MapleDisease> ret = new LinkedList<MapleDisease>(diseases);
        for (MapleDisease disease : ret) {
            if (!disease.equals(MapleDisease.SEAL)) {
                diseases.remove(disease);
                long mask = disease.getValue();
                getClient().getSession().write(MaplePacketCreator.cancelDebuff(mask));
                getMap().broadcastMessage(this, MaplePacketCreator.cancelForeignDebuff(id, mask), false);
            }
        }
    }

    public void cancelAllDebuffs() {
        List<MapleDisease> ret = new LinkedList<MapleDisease>(diseases);
        for (MapleDisease disease : ret) {
            diseases.remove(disease);
            long mask = disease.getValue();
            getClient().getSession().write(MaplePacketCreator.cancelDebuff(mask));
            getMap().broadcastMessage(this, MaplePacketCreator.cancelForeignDebuff(id, mask), false);
        }
    }

    public void setLevel(int level) {
        this.level = level - 1;
    }

    public void setMap(int PmapId) {
        this.mapid = PmapId;
    }

    public void sendNote(String to, String msg) throws SQLException {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("INSERT INTO notes (`to`, `from`, `message`, `timestamp`) VALUES (?, ?, ?, ?)");
        ps.setString(1, to);
        ps.setString(2, this.getName());
        ps.setString(3, msg);
        ps.setLong(4, System.currentTimeMillis());
        ps.executeUpdate();
        ps.close();
    }

    public void sendNote(int recId, String msg) throws SQLException {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement p = con.prepareStatement("SELECT name FROM characters WHERE id = ?");
        p.setInt(1, recId);
        ResultSet rs = p.executeQuery();
        String to = rs.getString("name");
        rs.close();
        p.close();
        sendNote(to, msg);
    }

    public void showNote() throws SQLException {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("SELECT * FROM notes WHERE `to`=?", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
        ps.setString(1, this.getName());
        ResultSet rs = ps.executeQuery();

        rs.last();
        int count = rs.getRow();
        rs.first();
        client.getSession().write(MaplePacketCreator.showNotes(rs, count));
        ps.close();
    }

    public void deleteNote(int id) throws SQLException {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("DELETE FROM notes WHERE `id`=?");
        ps.setInt(1, id);
        ps.executeUpdate();
        ps.close();
    }

    public void showDojoClock() {
        int stage = (map.getId() / 100) % 100;
        long time;
        if (stage % 6 == 0) {
            time = ((stage > 36 ? 15 : stage / 6 + 5)) * 60;
        } else {
            time = (dojoFinish - System.currentTimeMillis()) / 1000;
        }
        client.getSession().write(MaplePacketCreator.getClock((int) time));
        TimerManager.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                client.getPlayer().changeMap(client.getChannelServer().getMapFactory().getMap(925020000));
            }
        }, time * 1000 + 3000); // let the TIMES UP display for 3 seconds, then warp

    }

    public void checkBerserk() {
        if (BerserkSchedule != null) {
            BerserkSchedule.cancel(false);
        }
        final MapleCharacter chr = this;
        ISkill BerserkX = SkillFactory.getSkill(1320006);
        final int skilllevel = getSkillLevel(BerserkX);
        if (chr.getJob().equals(MapleJob.DARKKNIGHT) && skilllevel >= 1) {
            MapleStatEffect ampStat = BerserkX.getEffect(skilllevel);
            int x = ampStat.getX();
            int HP = chr.getHp();
            int MHP = chr.getMaxHp();
            int ratio = HP * 100 / MHP;
            if (ratio > x) {
                Berserk = false;
            } else {
                Berserk = true;
            }
            BerserkSchedule = TimerManager.getInstance().register(new Runnable() {

                @Override
                public void run() {
                    //getClient().getSession().write(MaplePacketCreator.showOwnBerserk(skilllevel, Berserk));
                    //getMap().broadcastMessage(MapleCharacter.this, MaplePacketCreator.showBerserk(getId(), skilllevel, Berserk), false);
                }
            }, 5000, 3000);
        }
    }

    private void prepareBeholderEffect() {
        if (beholderHealingSchedule != null) {
            beholderHealingSchedule.cancel(false);
        }
        if (beholderBuffSchedule != null) {
            beholderBuffSchedule.cancel(false);
        }

        ISkill bHealing = SkillFactory.getSkill(1320008);
        if (getSkillLevel(bHealing) > 0) {
            final MapleStatEffect healEffect = bHealing.getEffect(getSkillLevel(bHealing));
            beholderHealingSchedule = TimerManager.getInstance().register(new Runnable() {

                @Override
                public void run() {
                    addHP(healEffect.getHp());
                    getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(1321007, 2));
                    getMap().broadcastMessage(MapleCharacter.this, MaplePacketCreator.summonSkill(getId(), 1321007, 5), true);
                    getMap().broadcastMessage(MapleCharacter.this, MaplePacketCreator.showBuffeffect(getId(), 1321007, 2, (byte) 3), false);
                }
            }, healEffect.getX() * 1000, healEffect.getX() * 1000);
        }
        ISkill bBuffing = SkillFactory.getSkill(1320009);
        if (getSkillLevel(bBuffing) > 0) {
            final MapleStatEffect buffEffect = bBuffing.getEffect(getSkillLevel(bBuffing));
            beholderBuffSchedule = TimerManager.getInstance().register(new Runnable() {

                @Override
                public void run() {
                    buffEffect.applyTo(MapleCharacter.this);
                    getClient().getSession().write(MaplePacketCreator.beholderAnimation(getId(), 1320009));
                    getMap().broadcastMessage(MapleCharacter.this, MaplePacketCreator.summonSkill(getId(), 1321007, (int) (Math.random() * 3) + 6), true);
                    getMap().broadcastMessage(MapleCharacter.this, MaplePacketCreator.showBuffeffect(getId(), 1321007, 2, (byte) 3), false);
                }
            }, buffEffect.getX() * 1000, buffEffect.getX() * 1000);
        }
    }

    public void setChalkboard(String text) {
        if (interaction != null) {
            return;
        }
        this.chalktext = text;
        if (chalktext == null) {
            getMap().broadcastMessage(MaplePacketCreator.useChalkboard(this, true));
        } else {
            getMap().broadcastMessage(MaplePacketCreator.useChalkboard(this, false));
        }
    }

    public String getChalkboard() {
        return this.chalktext;
    }

    public int getMarriageQuestLevel() {
        return marriageQuestLevel;
    }

    public void setMarriageQuestLevel(int nf) {
        marriageQuestLevel = nf;
    }

    public void addMarriageQuestLevel() {
        marriageQuestLevel += 1;
    }

    public void subtractMarriageQuestLevel() {
        marriageQuestLevel -= 1;
    }

    public void setCanTalk(int yesno) {
        this.canTalk = yesno;
    }

    public int getCanTalk() {
        return this.canTalk;
    }

    public void setZakumLevel(int level) {
        this.zakumLvl = level;
    }

    public int getZakumLevel() {
        return this.zakumLvl;
    }

    public void addZakumLevel() {
        this.zakumLvl += 1;
    }

    public void subtractZakumLevel() {
        this.zakumLvl -= 1;
    }

    public void setMarried(int mmm) {
        this.married = mmm;
    }

    public void setPartnerId(int pem) {
        this.partnerid = pem;
    }

    public int isMarried() {
        return married;
    }

  
    public MapleCharacter getPartner() {
        MapleCharacter test = this.getClient().getChannelServer().getPlayerStorage().getCharacterById(partnerid);
        if (test != null) {
            return test;
        }
        return null;
    }

    public int countItem(int itemid) {
        MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(itemid);
        MapleInventory iv = inventory[type.ordinal()];
        int possesed = iv.countById(itemid);
        return possesed;
    }

    public void changePage(int page) {
        this.currentPage = page;
    }

    public void changeTab(int tab) {
        this.currentTab = tab;
    }

    public void changeType(int type) {
        this.currentType = type;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public int getCurrentTab() {
        return currentTab;
    }

    public int getCurrentType() {
        return currentType;
    }

    public void unstick() {
        try {
            //saveToDB(true); // After some thought, maybe we shouldn't do this
            getClient().getSession().close();
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET loggedin = 0 WHERE id = ?");
            ps.setInt(1, accountid);
            ps.executeUpdate();
            ps.close();
            PreparedStatement ps2 = con.prepareStatement("UPDATE characters SET loggedin = 0 WHERE accountid = ?");
            ps2.setInt(1, id);
            ps2.executeUpdate();
            ps2.close();
        } catch (Exception e) {
        }
    }

    public boolean getSmegaEnabled() {
        return this.smegaEnabled;
    }

    public void setSmegaEnabled(boolean x) {
        this.smegaEnabled = x;
    }

    public void resetAfkTimer() {
        this.afkTimer = System.currentTimeMillis();
    }

    public long getAfkTimer() {
        return System.currentTimeMillis() - this.afkTimer;
    }

    public long getLoggedInTimer() {
        return System.currentTimeMillis() - this.loggedInTimer;
    }

    public boolean getEnteringPortal() {
        return this.isEnteringPortal;
    }

    public void setEnteringPortal(boolean e) {
        this.isEnteringPortal = e;
    }
    private boolean noEnergyChargeDec = false;

    public void toggleNoEnergyChargeDec() {
        noEnergyChargeDec = !noEnergyChargeDec;
    }

    public boolean isNoEnergyChargeDec() {
        return noEnergyChargeDec && isGM();
    }

    public void handleEnergyChargeGain(int amt, final boolean gm) {
        if (!gm && isNoEnergyChargeDec()) {
            return;
        }
        ISkill energycharge = SkillFactory.getSkill(5110001);
        int energyChargeSkillLevel = getSkillLevel(energycharge);
        MapleStatEffect ceffect = energycharge.getEffect(energyChargeSkillLevel);
        TimerManager tMan = TimerManager.getInstance();
        if (energyDecrease != null) {
            energyDecrease.cancel(false);
        }
        if (energyChargeSkillLevel > 0) {
            if (energybar < 10000) {

                energybar = (energybar + amt);
                if (energybar > 10000) {
                    energybar = 10000;
                }
                getClient().getSession().write(MaplePacketCreator.giveEnergyCharge(energybar));
                getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(5110001, 2));
                getMap().broadcastMessage(MaplePacketCreator.showBuffeffect(id, 5110001, 2, (byte) 3));
                if (energybar == 10000) {
                    getMap().broadcastMessage(MaplePacketCreator.giveForeignEnergyCharge(id, energybar));
                }
                if (!gm) {
                    energyDecrease = tMan.register(new Runnable() {

                        @Override
                        public void run() {

                            if (energybar < 10000 && !isNoEnergyChargeDec()) {
                                if ((energybar - 102) < 0) {
                                    energybar = 0;
                                    if (energyDecrease != null) {
                                        energyDecrease.cancel(false);
                                    }
                                } else {
                                    energybar = (energybar - 102);
                                }
                                getClient().getSession().write(MaplePacketCreator.giveEnergyCharge(energybar));
                            }

                        }
                    }, 10000, 10000);
                } else {
                    if (energyDecrease != null && !energyDecrease.isCancelled()) {
                        energyDecrease.cancel(false);
                    }
                    energyDecrease = null;
                }
            }
            if (energybar >= 10000 && energybar < 11000) {
                energybar = 15000;
                final MapleCharacter chr = this;
                if (!gm) {
                    tMan.schedule(new Runnable() {

                        @Override
                        public void run() {
                            getClient().getSession().write(MaplePacketCreator.giveEnergyCharge(0));
                            getMap().broadcastMessage(MaplePacketCreator.giveForeignEnergyCharge(id, energybar));
                            energybar = 0;
                        }
                    }, ceffect.getDuration());
                }
            }

        }
    }

    public void leaveParty() {
        WorldChannelInterface wci = ChannelServer.getInstance(getClient().getChannel()).getWorldInterface();
        MaplePartyCharacter partyplayer = new MaplePartyCharacter(this);
        if (party != null) {
            try {
                if (partyplayer.equals(party.getLeader())) { // disband
                    wci.updateParty(party.getId(), PartyOperation.DISBAND, partyplayer);
                    if (getEventInstance() != null) {
                        getEventInstance().disbandParty();
                    }
                } else {
                    wci.updateParty(party.getId(), PartyOperation.LEAVE, partyplayer);
                    if (getEventInstance() != null) {
                        getEventInstance().leftParty(this);
                    }
                }
            } catch (RemoteException e) {
                getClient().getChannelServer().reconnectWorld();
            }
            setParty(null);
        }
    }

    public int getBossQuestRepeats() {
        return bossRepeats;
    }

    public void setBossQuestRepeats(int repeats) {
        bossRepeats = repeats;
    }

    public void updateBossQuestRepeats() {
        if (Calendar.getInstance().getTimeInMillis() > nextBQ) {
            setBossQuestRepeats(0);
        }
    }

    public void updateNextBossQuest() {
        this.nextBQ = Calendar.getInstance().getTimeInMillis() + (1000 * 60 * 60 * 24);
    }

    public String getNextBossQuest() {
        return new Timestamp(this.nextBQ).toString();
    }

    public void setBossPoints(int points) {
        bossPoints = points;
    }

    public int getBossPoints() {
        return bossPoints;
    }

    public void setAchievementFinished(int id) {
        finishedAchievements.add(id);
    }

    public boolean achievementFinished(int achievementid) {
        return finishedAchievements.contains(achievementid);
    }

    public void finishAchievement(int id) {
        if (!achievementFinished(id) || MapleAchievements.getInstance().getById(id).isRepeatable()) {
            if (isAlive()) {
                MapleAchievement ma = MapleAchievements.getInstance().getById(id);
                if (ma != null) {
                    ma.finishAchievement(this);
                }
            }
        }
    }

    public List<Integer> getFinishedAchievements() {
        return finishedAchievements;
    }

    public boolean hasMerchant() {
        return hasMerchant;
    }

    public void setHasMerchant(boolean set) {
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE characters SET hasmerchant = ? WHERE id = ?");
            ps.setInt(1, set ? 1 : 0);
            ps.setInt(2, getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException se) {
            log.error("setHasmerchant sql", se); //17
        }
        hasMerchant = set;
    }

    public boolean tempHasItems() {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT ownerid FROM hiredmerchanttemp WHERE ownerid = ?");
            ps.setInt(1, getId());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                rs.close();
                ps.close();
                return true;
            }
            rs.close();
            ps.close();
        } catch (SQLException se) {
            log.error("tempHasItems sql", se); //18
        }
        return false;
    }

    public int getBossLog(String boss) {
        Connection con = DatabaseConnection.getConnection();
        try {
            int count = 0;
            PreparedStatement ps;
            ps = con.prepareStatement("SELECT COUNT(*) FROM bosslog WHERE characterid = ? AND bossid = ? AND lastattempt >= subtime(CURRENT_TIMESTAMP, '1 0:0:0.0')");
            ps.setInt(1, id);
            ps.setString(2, boss);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                count = rs.getInt(1);
            } else {
                count = -1;
            }
            rs.close();
            ps.close();
            return count;
        } catch (Exception Ex) {
            log.error("Error while read bosslog.", Ex);         //19
            return -1;
        }
    }

    public void setBossLog(String boss) {
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps;
            ps = con.prepareStatement("insert into bosslog (characterid, bossid) values (?,?)");
            ps.setInt(1, id);
            ps.setString(2, boss);
            ps.executeUpdate();
            ps.close();
        } catch (Exception Ex) {
            log.error("Error while insert bosslog.", Ex);  //20
        }
    }

    public void createPlayerNPC() {
        getPlayerNPC().createPlayerNPC(this, getPlayerNPCMapId());
    }

    public int getPlayerNPCMapId() {
        int jobId = getJob().getId();
        if (jobId >= 100 && jobId <= 132) {
            return 102000003;
        } else if (jobId >= 200 && jobId <= 232) {
            return 101000003;
        } else if (jobId >= 300 && jobId <= 322) {
            return 100000201;
        } else if (jobId >= 400 && jobId <= 422) {
            return 103000003;
        } else if (jobId >= 500 && jobId <= 522) {
            return 120000000;
        } else {
            return 104000000;
        }
    }

    public MaplePlayerNPC getPlayerNPC() {
        MaplePlayerNPC pnpc = new MaplePlayerNPC(this);
        return pnpc;
    }

    public void updateLater() {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO waiting_players (id, name, job, mapid) VALUES (?, ?, ?, ?)");
            ps.setInt(1, id);
            ps.setString(2, name);
            ps.setString(3, getJobName());
            ps.setInt(4, getPlayerNPCMapId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
        }
    }

    public String getJobName() {
        return job.getJobNameAsString();
    }

    public boolean hasPlayerNPC() {
        return playerNPC;
    }

    public void handleBattleShipHpLoss(int damage) {
        ISkill ship = SkillFactory.getSkill(5221006);
        int maxshipHP = (getSkillLevel(ship) * 4000) + ((getLevel() - 120) * 2000);
        MapleStatEffect effect = ship.getEffect(getSkillLevel(ship));
        battleshipHP -= damage;
        if (getBattleShipHP() <= 0) {
            dispelSkill(5221006);
            ScheduledFuture<?> timer = TimerManager.getInstance().schedule(new CancelCooldownAction(this, 5221006), effect.getCooldown() * 1000);
            addCooldown(5221006, System.currentTimeMillis(), effect.getCooldown() * 1000, timer);
            battleshipHP = maxshipHP;
            getClient().getSession().write(MaplePacketCreator.skillCooldown(5221006, effect.getCooldown()));
            try {
                dropMessage("Your Battle Ship has been destroyed by the monster with incredible force!");
            } catch (NullPointerException npe) {
            }
        }
        getClient().getSession().write(MaplePacketCreator.updateBattleShipHP(this.getId(), this.battleshipHP));
    }

    public int getBattleShipHP() {
        return battleshipHP;
    }

    public int setBattleShipHP(int set) {
        return battleshipHP = set;
    }

    public List<Integer> getTRockMaps(int type) {
        List<Integer> rockmaps = new LinkedList<Integer>();
        try {
            PreparedStatement ps;
            if (type == 1) {
                ps = DatabaseConnection.getConnection().prepareStatement("SELECT mapid FROM trocklocations WHERE characterid = ? AND type = ? LIMIT 10");
            } else {
                ps = DatabaseConnection.getConnection().prepareStatement("SELECT mapid FROM trocklocations WHERE characterid = ? AND type = ? LIMIT 5");
            }
            ps.setInt(1, id);
            ps.setInt(2, type);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                rockmaps.add(rs.getInt("mapid"));
            }
            rs.close();
            ps.close();
        } catch (SQLException se) {
            return null;
        }
        return rockmaps;
    }

    public void checkDuey() {
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM dueypackages WHERE receiverid = ? AND alerted = 0");
            ps.setInt(1, getId());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                PreparedStatement ps2 = con.prepareStatement("UPDATE dueypackages SET alerted = 1 WHERE receiverid = ?");
                ps2.setInt(1, getId());
                ps2.executeUpdate();
                ps2.close();
                getClient().getSession().write(MaplePacketCreator.sendDueyMessage(Actions.TOCLIENT_PACKAGE_MSG.getCode()));
            }
            rs.close();
            ps.close();
        } catch (SQLException SQLe) {
        }
    }

    public boolean isCPQChallenged() {
        return CPQChallenged;
    }

    public void setCPQChallenged(boolean CPQChallenged) {
        this.CPQChallenged = CPQChallenged;
    }

    public int getCP() {
        return CP;
    }

    public void gainCP(int gain) {
        if (gain > 0) {
            this.setTotalCP(this.getTotalCP() + gain);
        }
        this.setCP(this.getCP() + gain);
        if (this.getParty() != null) {
            this.getMonsterCarnival().setCP(this.getMonsterCarnival().getCP(team) + gain, team);
            if (gain > 0) {
                this.getMonsterCarnival().setTotalCP(this.getMonsterCarnival().getTotalCP(team) + gain, team);
            }
        }
        if (this.getCP() > this.getTotalCP()) {
            this.setTotalCP(this.getCP());
        }
        this.getClient().getSession().write(MaplePacketCreator.CPUpdate(false, this.getCP(), this.getTotalCP(), getTeam()));
        if (this.getParty() != null && getTeam() != -1) {
            this.getMap().broadcastMessage(MaplePacketCreator.CPUpdate(true, this.getMonsterCarnival().getCP(team), this.getMonsterCarnival().getTotalCP(team), getTeam()));
        } else {
            log.warn(getName() + " is either not in a party or .. team: " + getTeam());
        }
    }

    public void setTotalCP(int a) {
        this.totalCP = a;
    }

    public void setCP(int a) {
        this.CP = a;
    }

    public int getTotalCP() {
        return totalCP;
    }

    public void resetCP() {
        this.CP = 0;
        this.totalCP = 0;
        this.monsterCarnival = null;
    }

    public MapleMonsterCarnival getMonsterCarnival() {
        return monsterCarnival;
    }

    public void setMonsterCarnival(MapleMonsterCarnival monsterCarnival) {
        this.monsterCarnival = monsterCarnival;
    }

    public int getTeam() {
        return team;
    }

    public void setTeam(int team) {
        this.team = team;
    }

    public int getCPQRanking() {
        return CPQRanking;
    }

    public void setCPQRanking(int newCPQRanking) {
        this.CPQRanking = newCPQRanking;
    }

    public boolean isBanned() {
        return banned;
    }

    public boolean needsParty() {
        return needsParty;
    }

    public int getNeedsPartyMaxLevel() {
        return needsPartyMaxLevel;
    }

    public int getNeedsPartyMinLevel() {
        return needsPartyMinLevel;
    }

    public void setNeedsParty(boolean bool, int minlvl, int maxlvl) {
        needsParty = bool;
        needsPartyMinLevel = minlvl;
        needsPartyMaxLevel = maxlvl;
    }

    public boolean hasPlayerShopTicket() {
        int[] itemids = new int[6]; //list of playerstore coupons
        for (int Id = 0; Id <= 5; Id++) {
            itemids[Id] = (Id + 5140000);
        }
        return haveItem(itemids, 1, false);
    }

    public boolean hasHiredMerchantTicket() {
        int[] itemids = new int[13]; //list of hired merchant store coupons
        for (int Id = 0; Id <= 12; Id++) {
            itemids[Id] = (Id + 5030000);
        }
        return haveItem(itemids, 1, false);
    }

    public static int getIdByName(String name) {
	Connection con = DatabaseConnection.getConnection();
	PreparedStatement ps;
	try {
	    ps = con.prepareStatement("SELECT id FROM characters WHERE name = ?");
	    ps.setString(1, name);
	    ResultSet rs = ps.executeQuery();
	    if (!rs.next()) {
		ps.close();
		return -1;
	    }
	    int id = rs.getInt("id");
	    ps.close();
	    return id;
	} catch (SQLException e) {
	    log.error("ERROR", e); //20
	}
	return -1;
    }

    public static int getAccountIdByName(String name) {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps;
        try {
            ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
            ps.setString(1, name);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                ps.close();
                return -1;
            }
            int id = rs.getInt("accountid");
            ps.close();
            return id;
        } catch (SQLException e) {
            log.error("ERROR", e); //21
        }
        return -1;
    }

    public boolean hasGodmode() {
        return godmode;
    }

    public void setGodmode(boolean onoff) {
        this.godmode = onoff;
    }

    public void addToCancelBuffPackets(MapleStatEffect effect, long startTime) {
        buffsToCancel.put(startTime, effect);
    }

    public void cancelSavedBuffs() {
        Set keys = buffsToCancel.keySet();
        Object[] keysarray = keys.toArray();
        long key = 0;
        for (Object o : keysarray) {
            key = (Long) o;
            cancelEffect(buffsToCancel.get(key), false, key);
        }
        buffsToCancel.clear();
    }

    public boolean isQuestDebug() {
        return questDebug && isGM();
    }

    public void toggleQuestDebug() {
        questDebug = !questDebug;
    }

    public void UpdateCash() {
        getClient().getSession().write(MaplePacketCreator.showCharCash(this));
    }

    public final int getNumQuest() {
        int i = 0;
        for (MapleQuestStatus q : quests.values()) {
            if (q.getStatus() == MapleQuestStatus.Status.COMPLETED && !(q.getQuest() instanceof MapleCustomQuest)) {
                i++;
            }
        }
        return i;
    }

    public static int getNextUniqueId() {
        int nextid = 1;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT MAX(uniqueid) FROM inventoryitems");
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                nextid = rs.getInt(1) + 1;
            }
            rs.close();
            ps.close();

            ps = con.prepareStatement("SELECT MAX(uniqueid) FROM csinventory");
            rs = ps.executeQuery();
            if (rs.next()) {
                int nextcsid = rs.getInt(1) + 1;
                if (nextcsid > nextid) {
                    nextid = nextcsid;
                }
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            log.error("Error getting next unique id", e); //22
        }
        return nextid;
    }

    public boolean getInvincible() {
        return invincible;
    }

    public void setInvincible(boolean set) {
        this.invincible = set;
    }

    public void setMonsterBookCover(int bookCover) {
        this.bookCover = bookCover;
    }

    public void DoJoKill() {
        getClient().getSession().write(MaplePacketCreator.environmentChange("Dojang/clear", 4));
        getClient().getSession().write(MaplePacketCreator.environmentChange("dojang/end/clear" ,3));
    }

    public void saveLocation(String type) {
        MaplePortal closest = map.findClosestPortal(getPosition());
        //savedLocations[SavedLocationType.fromString(type).ordinal()] = new SavedLocation(getMapId(), closest != null ? closest.getId() : 0);
    }

    public boolean hasEnergyCharge() {
        int skillId = 0;
        if (getJob().isA(MapleJob.MARAUDER)) {
            skillId = 5110001;
        } else if (getJob().isA(MapleJob.THIEF_KNIGHT_2)) {
            skillId = 15100004;
        } else {
            return false;
        }
        ISkill skill = SkillFactory.getSkill(skillId);
        if (getSkillLevel(skill) > 0) {
            return true;
        }
        return false;
    }

    public int getEnergyCharge() {
        return energyChargeLevel;
    }

    public void increaseEnergyCharge(int numMonsters) { //增加能量 能量获得
        if (energyChargeLevel < 10000 && numMonsters > 0) {
            if (energyChargeSchedule != null) {
                this.energyChargeSchedule.cancel(false);
                this.energyChargeSchedule = null;
            }
            int skillId = 0;
            if (getJob().isA(MapleJob.MARAUDER)) {
                skillId = 5110001;
            } else if (getJob().isA(MapleJob.THIEF_KNIGHT_2)) {
                skillId = 15100004;
            } else {
                return;
            }
            ISkill skill = SkillFactory.getSkill(skillId);
            int skillLevel = getSkillLevel(skill);
            int x = 0;
            if (skillLevel > 0) {
                x = skill.getEffect(skillLevel).getX();
            }
            int toAdd = x * numMonsters;
            this.energyChargeLevel += toAdd;
            if (energyChargeLevel >= 10000) {
                this.energyChargeLevel = 10000;
                skill.getEffect(skillLevel).applyTo(this);
                return;
            } else {
                List<Pair<MapleBuffStat, Integer>> statups = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.ENERGY_CHARGE, energyChargeLevel));
                getClient().getSession().write(MaplePacketCreator.givePirateBuff(0, 200, statups));
                getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(skillId, 2,getSkillLevel(skillId)));
                //getClient().getSession().write(MaplePacketCreator.givePirateBuff(0, 0, statups));     //显示能量获得的效果(有光聚集过来
                //getMap().broadcastMessage(this, MaplePacketCreator.showPirateBuff(id, 0, 0, statups), false);
                getMap().broadcastMessage(this, MaplePacketCreator.综合技能状态(id, skillId, 2, getSkillLevel(skillId)), false);
            }
            
            
            //this.energyChargeSchedule = TimerManager.getInstance().register(new ReduceEnergyChargeAction(this), 10000, 10000);
              energyChargeSchedule = TimerManager.getInstance().register(new Runnable() {
                 @Override
                public void run() {
                    energyChargeLevel -= 200;
                    List<Pair<MapleBuffStat, Integer>> statups = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.ENERGY_CHARGE, energyChargeLevel));
                    getClient().getSession().write(MaplePacketCreator.givePirateBuff(0, 200, statups));
                    if (energyChargeLevel <= 0) {
                        energyChargeLevel = 0;
                        energyChargeSchedule.cancel(false);
                    }
                }
            }, 10000, 10000);
        }
        
    }

    public static class ReduceEnergyChargeAction implements Runnable {

        private WeakReference<MapleCharacter> target;

        public ReduceEnergyChargeAction(MapleCharacter target) {
            this.target = new WeakReference<MapleCharacter>(target);
        }

        @Override
        public void run() {
            MapleCharacter realTarget = target.get();
            realTarget.energyChargeLevel -= 200;
            if (realTarget != null) {    //解决NPC消失问题
            if (realTarget.energyChargeLevel <= 0) {
                realTarget.energyChargeLevel = 0;
                realTarget.energyChargeSchedule.cancel(false);
          }
       }
    }
    }    


    public Byte getHammerSlot() {
        return hammerSlot;
    }

    public void setHammerSlot(Byte hammerSlot) {
        this.hammerSlot = hammerSlot;
    }

    public boolean inIntro() {
        return tutorial;
    }

    public void blockPortal(String scriptName) {
        if (!blockedPortals.contains(scriptName) && scriptName != null) {
            blockedPortals.add(scriptName);
        }
        getClient().getSession().write(MaplePacketCreator.blockedPortal());
    }

    public void unblockPortal(String scriptName) {
        if (blockedPortals.contains(scriptName) && scriptName != null) {
            blockedPortals.remove(scriptName);
        }
    }

    public List getBlockedPortals() {
        return blockedPortals;
    }

    public boolean getAranIntroState(String mode) {
        if (ares_data.contains(mode)) {
            return true;
        }
        return false;
    }

    public int setLastAttack(int attackZ) {
        return lastAttack = attackZ;
    }

    public int getLastAttack() {
        return lastAttack;
    }

    public boolean inTutorialMap() {
        if (getMap().getId() >= 914000000 && getMapId() <= 914010200 || getMapId() >= 108000700 && getMapId() <= 140090500 || getMapId() >= 0 && getMapId() <= 2000001) {
            return true;
        }
        return false;
    }

    public void addAreaData(int quest, String data) {
        if (!this.ares_data.contains(data)) {
            this.ares_data.add(data);
            try {
                Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("INSERT INTO char_ares_info VALUES (DEFAULT, ?, ?, ?)");
                ps.setInt(1, getId());
                ps.setInt(2, quest);
                ps.setString(3, data);
                ps.executeUpdate();
                ps.close();
            } catch (SQLException ex) {
                log.error("Arsa date error", ex);  //22
            }
        }
    }

    public void removeAreaData() {
        this.ares_data.clear();
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM char_ares_info WHERE charid = ?");
            ps.setInt(1, getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Arsa date error", ex); //23
        }
    }
 /*   public void setPvpDeaths(int amount) {
        pvpdeaths = amount;
    }

    public void setPvpKills(int amount) {
        pvpkills = amount;
    }

    public void gainPvpDeath() {
        pvpdeaths += 1;
    }

    public void gainPvpKill() {
        pvpkills += 1;
    }
    public int getPvpKills() {
        return pvpkills;
    }

    public void gainReborns(int amt) {
        reborns += amt;
    }
    
    public void setReborns(int amt) {
        reborns = amt;
    }

    public int getReborns() {
        return reborns;
    }
    public int getPvpDeaths() {
        return pvpdeaths;
    } */
        public boolean isDead() {
        return this.hp <= 0;
    }
public int getlockitem(int slot)
	{
		byte eqslot = (byte)slot;
		Equip nEquip = (Equip)getInventory(MapleInventoryType.EQUIP).getItem(eqslot);
		int set = nEquip.getLocked();
		return set;
	}
    public void maxAllSkills() {
        MapleDataProvider dataProvider = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("net.sf.odinms.wzpath") + "/" + "String.wz"));
        MapleData skilldData = dataProvider.getData("Skill.img");
        for (MapleData skill_ : skilldData.getChildren()) {
            try {
                ISkill skill = SkillFactory.getSkill(Integer.parseInt(skill_.getName()));
                if (GMLevel > 0) {
                    changeSkillLevel(skill, skill.getMaxLevel(), skill.getMaxLevel());
                }
            } catch (NumberFormatException nfe) {
                break;
            } catch (NullPointerException npe) {
                continue;
            }
        }
    }
  public int getCombo() {
    return this.comboCounter;
  }

  public int setCombo(int combo) {
    return (this.comboCounter = combo);
  }

    public void handleComboGain() {
        TimerManager tMan = TimerManager.getInstance();
        if (combo <= 30000) {
            combo += 1;
            comboCounter += 1;
            if (combo > 30000) {
                combo = 30000;
            }
        }
        tMan.schedule(new Runnable() {

            @Override
            public void run() {
                comboCounter -= 1;
                if (comboCounter == 0) {
                    combo = 0;
                }
            }
        }, 2500);
        if (getJob().getId() >= 2000 || getJob().getId() == 900) {
            getClient().getSession().write(MaplePacketCreator.Combo_Effect(combo));
        }
    }
  /*  public void setClan(int num) {
            menpai = num;
        }
    public int getClan() {
        return menpai;
    }    */
    public int getsg2() {
        return sg2;
    }

       public void gainDY(int nxchange1) {
    this.maplepoints += nxchange1;
  }
   
   public int getDY() {
    return this.maplepoints;
  }
    public int Lianjie() {
		Connection con = DatabaseConnection.getConnection();
		int count = 0;
		try
		{
			PreparedStatement ps = con.prepareStatement("SELECT count(*) as cc FROM accounts WHERE loggedin = 2");
			for (ResultSet re = ps.executeQuery(); re.next();)
				count = re.getInt("cc");

		}
		catch (SQLException ex)
		{
                        java.util.logging.Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		}
		return count;
	}
}