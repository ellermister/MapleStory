package net.sf.odinms.scripting.event;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;

import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ScheduledFuture;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.script.Invocable;
import javax.script.ScriptException;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.net.world.MapleParty;
import net.sf.odinms.server.MapleSquad;
import net.sf.odinms.server.TimerManager;
import net.sf.odinms.server.maps.MapleMap;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.scripting.npc.NPCConversationManager;

public class EventManager
{
  private Invocable iv;
  private ChannelServer cserv;
  private Map<String, EventInstanceManager> instances = new HashMap();
  private Properties props = new Properties();
  private String name;

  public EventManager(ChannelServer cserv, Invocable iv, String name)
  {
    this.iv = iv;
    this.cserv = cserv;
    this.name = name;
  }

  public void cancel() {
    try {
      this.iv.invokeFunction("cancelSchedule", new Object[] { (Object)null });
    } catch (ScriptException ex) {
      Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
    } catch (NoSuchMethodException ex) {
      Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
    }
  }

  public void schedule(final String methodName, long delay) {
    TimerManager.getInstance().schedule(new Runnable() {
      public void run() {
        try {
          iv.invokeFunction(methodName, (Object)null );
        } catch (ScriptException ex) {
          Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
        } catch (NoSuchMethodException ex) {
          Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
        }
      }
    }
    , delay);
  }

  public ScheduledFuture<?> scheduleAtTimestamp(final String methodName, long timestamp)
  {
    return TimerManager.getInstance().scheduleAtTimestamp(new Runnable()
    {
      public void run() {
        try {
          iv.invokeFunction(methodName, (Object)null);
        } catch (ScriptException ex) {
          Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
        } catch (NoSuchMethodException ex) {
          Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
        }
      }
    }
    , timestamp);
  }

  public ChannelServer getChannelServer()
  {
    return this.cserv;
  }

  public EventInstanceManager getInstance(String name) {
    return ((EventInstanceManager)this.instances.get(name));
  }

  public Collection<EventInstanceManager> getInstances() {
    return Collections.unmodifiableCollection(this.instances.values());
  }

  public EventInstanceManager newInstance(String name) {
    EventInstanceManager ret = new EventInstanceManager(this, name);
    this.instances.put(name, ret);
    return ret;
  }

  public void disposeInstance(String name) {
    this.instances.remove(name);
  }

  public Invocable getIv() {
    return this.iv;
  }

  public void setProperty(String key, String value) {
    this.props.setProperty(key, value);
  }

  public String getProperty(String key) {
    return this.props.getProperty(key);
  }

  public String getName() {
    return this.name;
  }

  public void startInstance(MapleParty party, MapleMap map)
  {
    try {
      EventInstanceManager eim = (EventInstanceManager)(EventInstanceManager)this.iv.invokeFunction("setup", new Object[] { (Object)null });
      eim.registerParty(party, map);
    } catch (ScriptException ex) {
      Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
    } catch (NoSuchMethodException ex) {
      Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
    }
  }

  public void startInstance(MapleParty party, MapleMap map, boolean partyid)
  {
    try {
      EventInstanceManager eim;
      if (partyid)
        eim = (EventInstanceManager)(EventInstanceManager)this.iv.invokeFunction("setup", new Object[] { Integer.valueOf(party.getId()) });
      else
        eim = (EventInstanceManager)(EventInstanceManager)this.iv.invokeFunction("setup", new Object[] { (Object)null });

      eim.registerParty(party, map);
    } catch (ScriptException ex) {
      Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
    } catch (NoSuchMethodException ex) {
      Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
    }
  }

  public void startInstance(MapleSquad squad, MapleMap map) {
    try {
      EventInstanceManager eim = (EventInstanceManager)(EventInstanceManager)this.iv.invokeFunction("setup", new Object[] { Integer.valueOf(squad.getLeader().getId()) });
      eim.registerSquad(squad, map);
    } catch (ScriptException ex) {
      Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
    } catch (NoSuchMethodException ex) {
      Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
    }
  }

  public void startInstance(EventInstanceManager eim, String leader)
  {
    try {
      this.iv.invokeFunction("setup", new Object[] { eim });
      eim.setProperty("leader", leader);
    } catch (ScriptException ex) {
      Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
    } catch (NoSuchMethodException ex) {
      Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
    }
  }

  public EventInstanceManager startEventInstance(MapleParty party, MapleMap map, boolean partyid)
  {
    try
    {
      EventInstanceManager eim;
      if (partyid)
        eim = (EventInstanceManager)(EventInstanceManager)this.iv.invokeFunction("setup", new Object[] { Integer.valueOf(party.getId()) });
      else
        eim = (EventInstanceManager)(EventInstanceManager)this.iv.invokeFunction("setup", new Object[] { (Object)null });

      eim.registerParty(party, map);
      return eim;
    } catch (ScriptException ex) {
      Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
    } catch (NoSuchMethodException ex) {
      Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
    }
    return null;
    }
  
      public void autofish() {//聆听 独创钓鱼相关
       Collection<MapleCharacter> chrs = cserv.getPlayerStorage().getAllCharacters();
       for (MapleCharacter chr : chrs) {
     //int itemId = slea.readInt();
       int timeMin = chr.TotalLoginTimeMin();
       if (chr.getMapId() == 741000200 &&chr.getClient().getChannel() == 1) {
       chr.getClient().getSession().write(MaplePacketCreator.sendHint("你进入了钓鱼场", 300, 5));
       if (chr.getChair() == 3011000){
       chr.getClient().getSession().write(MaplePacketCreator.sendHint("#e欢乐钓鱼中...", 300, 5));
     //chr.openNpcs(7);
       chr.saveToDB(true);
       chr.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "[青春纪念册冒险岛]:在线时间" + timeMin + "分钟  钓鱼测试"));
       }else{
       chr.saveToDB(true);
        }
        }else{
        }  
       }
    }
}

