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

package net.sf.odinms.net.login;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import javax.rmi.ssl.SslRMIClientSocketFactory;
import javax.rmi.ssl.SslRMIServerSocketFactory;
import net.sf.odinms.net.login.remote.LoginWorldInterface;

/**
 *
 * @author Matze
 */
public class LoginWorldInterfaceImpl extends UnicastRemoteObject implements LoginWorldInterface {

    private static final long serialVersionUID = -3405666366539470037L;

    public LoginWorldInterfaceImpl() throws RemoteException {
        super(0, new SslRMIClientSocketFactory(), new SslRMIServerSocketFactory());
    }

    public void channelOnline(int channel, String ip) throws RemoteException {
        LoginServer.getInstance().addChannel(channel, ip);
    }

    public void channelOffline(int channel) throws RemoteException {
        LoginServer.getInstance().removeChannel(channel);
    }

    public void shutdown() throws RemoteException {
        LoginServer.getInstance().shutdown();
    }

    public boolean isAvailable() throws RemoteException {
        return true;
    }

    public double getPossibleLoginAverage() throws RemoteException {
        return LoginWorker.getInstance().getPossibleLoginAverage();
    }

    public int getWaitingUsers() throws RemoteException {
        return LoginWorker.getInstance().getWaitingUsers();
    }
}