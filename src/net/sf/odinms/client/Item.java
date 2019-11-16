/*

*/

package net.sf.odinms.client;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import net.sf.odinms.server.MapleItemInformationProvider;

public class Item implements IItem {

    private int id;
    private byte position;
    private short quantity;
    private int petid;
    private String owner = "";
    private int idfrom; //the character id that its from?
    private String sender = "";
    private String message = "";
    protected List<String> log;
    private byte flag;
    private Timestamp expiration;
    private int uniqueid;
    private List<Integer> petsCanConsume = new ArrayList<Integer>();
    private int sn;

    public Item(int id, byte position, short quantity) {
        super();
        this.id = id;
        this.position = position;
        this.quantity = quantity;
        this.flag = 0;
        this.petid = -1;
        this.log = new LinkedList<String>();
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if(ii.isCash(getItemId())==true){//检测是否是商城点装
        //if((ii.isCash(getItemId())==true) && (ii.ispachinko(getItemId())==true)){
   setUniqueId(MapleCharacter.getNextUniqueId());//为物品ID设置UNIQUEID
}
    if(ii.ispachinko(getItemId())==true){//检测是否是商城点装
  setUniqueId(MapleCharacter.getNextUniqueId());//为物品ID设置UNIQUEID
    }
    } 

    public Item(int id, byte position, short quantity, int petid) {
        super();
        this.id = id;
        this.position = position;
        this.quantity = quantity;
        this.flag = 0;
        this.petid = petid;
        this.log = new LinkedList<String>();
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
       if(ii.isCash(getItemId())==true){//检测是否是商城点装
      // if((ii.isCash(getItemId())==true) && (ii.ispachinko(getItemId())==true)){
    setUniqueId(MapleCharacter.getNextUniqueId());//为物品ID设置UNIQUEID
}
     if(ii.ispachinko(getItemId())==true){//检测是否是商城点装
    setUniqueId(MapleCharacter.getNextUniqueId());//为物品ID设置UNIQUEID
     }
    }



    public IItem copy() {
        Item ret = new Item(id, position, quantity, petid);
        ret.owner = owner;
        ret.log = new LinkedList<String>(log);
        return ret;
    }

    public void setPosition(byte position) {
        this.position = position;
    }

    public void setQuantity(short quantity) {
        this.quantity = quantity;
    }


    public int getItemId() {
        return id;
    }
  

    public byte getPosition() {
        return position;
    }


    public short getQuantity() {
        return quantity;
    }


    public byte getType() {
        return IItem.ITEM;
    }

 
    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public int getPetId() {
    return petid;
    }

    public byte getFlag() {
        return flag;
    }

    public void setFlag(byte b) {
        this.flag = b;
    }

    @Override
    public int compareTo(IItem other) {
        if (Math.abs(position) < Math.abs(other.getPosition())) {
            return -1;
        } else if (Math.abs(position) == Math.abs(other.getPosition())) {
            return 0;
        } else {
            return 1;
        }
    }

    @Override
    public String toString() {
        return "Item: " + id + " quantity: " + quantity;
    }

    // no op for now as it eats too much ram :( once we have persistent inventoryids we can reenable it in some form.
    public void log(String msg, boolean fromDB) {

    }

    public List<String> getLog() {
        return Collections.unmodifiableList(log);
    }

    @Override
    public Timestamp getExpiration() {
        return expiration;
    }

    public void setExpiration(Timestamp expire) {
        this.expiration = expire;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getSender() {
        return sender;
    }

    public int getSN() {
        return sn;
    }

    public void setSN(int sn) {
        this.sn = sn;
    }

    @Override
    public int getUniqueId() {
        return uniqueid;
    }

    @Override
    public void setUniqueId(int id) {
        this.uniqueid = id;
    }

    public void setMessage(String msg) {
        this.message = msg;
    }

    public String getMessage() {
        return message;
    }

    public void setPetsCanConsume(List<Integer> pets) {
        this.petsCanConsume = pets;
    }

    public List<Integer> getPetsCanConsume() {
        return Collections.unmodifiableList(petsCanConsume);
    }


    public boolean 友谊戒指(){
        switch(id){
            case 1112800: //四叶挚友戒指
            case 1112801: //雏菊挚友戒指
            case 1112802: //闪星挚友戒指
            case 1112803: //海滩聊天戒指
            case 1112804: //结婚戒指
            case 1112810: //圣诞夜响叮当
            case 1112811: //圣诞华丽派对
                return true;
        }
        return false;
    }
    
    public boolean 恋人戒指(){
        switch(id){
            case 1112000: //闪光戒指
            case 1112001: //恋人戒指
            case 1112002: //纯爱恋人戒指
            case 1112003: //丘比特戒指
            case 1112005: //维纳斯戒指
            case 1112006: //圣十字架戒指
            case 1112007: //许愿情侣戒指
            case 1112012: //红玫瑰戒指
                return true;
        }
        return false;
    }
    
    public boolean 结婚戒指(){
        return id == 1112804;
    }
}