@echo off
title 小小服务端

set JAVA_HOME="D:\Program Files\Java\jdk1.6.0_43"

ECHO 正在启动 世界服务器
start  /b 世界服务器.bat
ping localhost -w 20>nul
cls

ECHO 正在启动 登陆服务器
start /b 登陆服务器.bat
ping localhost -w 20>nul


 ECHO 正在启动 频道服务器
 start  /b 频道服务器.bat
 color b