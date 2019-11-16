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

package net.sf.odinms.net;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public enum RecvPacketOpcode implements WritableIntValueHolder {
    // GENERIC
    PONG,
    CLIENT_ERROR,
    STRANGE_DATA,
    // LOGIN
    LOGIN_PASSWORD,
    GUEST_LOGIN,
    LICENSE_REQUEST,
    SERVERLIST_REREQUEST,
    CHARLIST_REQUEST,
    SERVERSTATUS_REQUEST,
    SET_GENDER,
    AFTER_LOGIN,
    REGISTER_PIN,
    SERVERLIST_REQUEST,
    TO_WORLDLIST,
    VIEW_ALL_CHAR_REQUEST,
    VIEW_ALL_CHAR_CONNECT,
    VIEW_ALL_CHAR,
    CHAR_SELECT,
    CHECK_CHAR_NAME,
    CREATE_CHAR,
    ERROR_LOG,
    RELOG,
    // CHANNEL
    PLAYER_LOGGEDIN,
    CHANGE_MAP,
    CHANGE_CHANNEL,
    ENTER_CASH_SHOP,
    MOVE_PLAYER,
    CANCEL_CHAIR,
    USE_CHAIR,
    CLOSE_RANGE_ATTACK,
    RANGED_ATTACK,
    MAGIC_ATTACK,
    PASSIVE_ENERGY,
    ENERGY_CHARGE_ATTACK,
    TAKE_DAMAGE,
    GENERAL_CHAT,
    CLOSE_CHALKBOARD,
    FACE_EXPRESSION,
    USE_ITEMEFFECT,
    NPC_TALK,
    NPC_TALK_MORE,
    NPC_SHOP,
    STORAGE,
    HIRED_MERCHANT_REQUEST,
    DUEY_ACTION,
    ITEM_SORT,
    ITEM_MOVE,
    USE_ITEM,
    CANCEL_ITEM_EFFECT,
    USE_FISHING_ITEM,
    USE_SUMMON_BAG,
    PET_FOOD,
    USE_MOUNT_FOOD,
    USE_CASH_ITEM,
    USE_CATCH_ITEM,
    USE_SKILL_BOOK,
    USE_RETURN_SCROLL,
    MAKER_SKILL,
    USE_UPGRADE_SCROLL,
    DISTRIBUTE_AP,
    DISTRIBUTE_AUTO_AP,
    HEAL_OVER_TIME,
    DISTRIBUTE_SP,
    SPECIAL_MOVE,
    CANCEL_BUFF,
    SKILL_EFFECT,
    MESO_DROP,
    GIVE_FAME,
    CHAR_INFO_REQUEST,
    MOB_DAMAGED,
    SPAWN_PET,
    CANCEL_DEBUFF,
    CHANGE_MAP_SPECIAL,
    USE_INNER_PORTAL,
    TROCK_ADD_MAP,
    QUEST_ACTION,
    EFFECT_ON_OFF,
    THROW_BOMB,
    SKILL_MACRO,
    REPORT_PLAYER,
    TREASUER_CHEST,
    MULTI_CHAT,
    WHISPER,
    SPOUSE_CHAT,
    MESSENGER,
    PLAYER_INTERACTION,
    PARTY_OPERATION,
    DENY_PARTY_REQUEST,
    GUILD_OPERATION,
    DENY_GUILD_REQUEST,
    BUDDYLIST_MODIFY,
    NOTE_ACTION,
    USE_DOOR,
    CHANGE_KEYMAP,
    RING_ACTION,
    OPEN_FAMILY,
    ADD_FAMILY,
    ACCEPT_FAMILY,
    USE_FAMILY,
    ALLIANCE_OPERATION,
    BBS_OPERATION,
    ENTER_MTS,
    SOLOMON,
    MOVE_PET,
    PET_CHAT,
    PET_COMMAND,
    PET_LOOT,
    PET_AUTO_POT,
    MOVE_SUMMON,
    SUMMON_ATTACK,
    DAMAGE_SUMMON,
    MOVE_LIFE,
    AUTO_AGGRO,
    MOB_DAMAGE_MOB,
    MONSTER_BOMB,
    NPC_ACTION,
    ITEM_PICKUP,
    HYPNOTIZE,
    DAMAGE_REACTOR,
    TOUCH_REACTOR,
    MONSTER_CARNIVAL,
    OBJECT_REQUEST,
    PARTY_SEARCH_REGISTER,
    PARTY_SEARCH_START,
    PLAYER_UPDATE,
    TOUCHING_CS,
    CASH_SHOP,
    COUPON_CODE,
    MAPLETV,
    MTS_OP,
    SCRIPTED_ITEM,
    REVIVE_ITEM,
    SUMMON_TALK,
    MONSTER_BOOK_COVER,
    VICIOUS_HAMMER,
    ChatRoom_SYSTEM;
    private int code = -2;

    public void setValue(int code) {
        this.code = code;
    }

    @Override
    public int getValue() {
        return code;
    }

    public static Properties getDefaultProperties() throws FileNotFoundException, IOException {
        Properties props = new Properties();
        FileInputStream fis = new FileInputStream(System.getProperty("net.sf.odinms.recvops"));
        props.load(fis);
        fis.close();
        return props;
    }
    

    static {
        try {
            ExternalCodeTableGetter.populateValues(getDefaultProperties(), values());
        } catch (IOException e) {
            throw new RuntimeException("Failed to load recvops", e);
        }
    }
}