@echo off
@title 小小冒险岛提醒: 世界服务器正在启动~
set CLASSPATH=.;dist\*
java -Dnet.sf.odinms.recvops=recvops.properties -Dnet.sf.odinms.sendops=sendops.properties -Dnet.sf.odinms.wzpath=wz\ -Djavax.net.ssl.keyStore=scripts\Keys\filename.keystore -Djavax.net.ssl.keyStorePassword=passwd -Djavax.net.ssl.trustStore=scripts\Keys\filename.keystore -Djavax.net.ssl.trustStorePassword=passwd net.sf.odinms.net.world.WorldServer
pause
