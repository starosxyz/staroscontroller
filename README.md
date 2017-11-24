StarOS控制器
====================================

## StarOS开源控制器介绍

StarOS控制器是为快速开发软件定义网络应用程序而开发的一款高性能控制器. 采用面向对象的SDN编程语言编写。
想了解更多的StarOS控制器的信息请访问我们的官网
[StarOS网站](http://www.staros.xyz/)

### 控制器特点

* XML和javascript编写控制器APP.
* 支持集群.
*  XML/javascript和C++互补.
* 支持Restful-http/Restful-https/netconf协议.
* 支持OpenFlow1.3协议.
* 支持NETCONF over SSH ([RFC 4742](https://tools.ietf.org/html/rfc4742), [RFC 6242](https://tools.ietf.org/html/rfc6242)).
* 支持NETCONF Call Home ([RFC 8071](https://tools.ietf.org/html/rfc8071)).
* 支持YANG 1.0 ([RFC 6020](https://tools.ietf.org/html/rfc6020))和YANG 1.1 ([RFC 7950](https://tools.ietf.org/html/rfc7950))建模语言.

### SDN编程语言介绍
SDN编程语言是专门为软件定义网络开发的一种编程语言，具有面向对象编程能力。
* 支持面向对象的编程方式，类，数据封装，继承.
* 支持运算位运算<<,>>,+,-,*,%,/,~,^,&.
* 支持关键字for,while,if,function,openflow,netconf, restful等流程控制语法.
* 支持数据类型，uint8_t, uint16_t, uint32_t,uint64_t, void,string, class, object,param,long等基本数据类型.
* 支持自定义类类型
* 支持messageblock数据类型, 用于对流式报文数据做streamfrom, streamto操作处理.
* 支持container容器类型。 容器有list, hashmap, array等类型.

## 如何运行StarOS控制器
### 一，安装StarOS网络操作系统
```
# git clone https://github.com/starosxyz/staroscontroller
# cd staroscontroller/tools/installstaros
# chmod a+x staros-install.sh
# ./staros-install.sh install
# cd ../../projects/
# source ./env.sh
# make
# mv staroscontroller /opt/staros.xyz/
```
### 二，运行StarOS网络操作系统
```
[root@localhost projects]# dipc start
[11/24/2017 05:02:28.395]     
[11/24/2017 05:02:28.395] ******************************************************************************************
[11/24/2017 05:02:28.395] *
[11/24/2017 05:02:28.395] *  Copyright (C) 2016-2017, Nanjing StarOS Technology Co., Ltd
[11/24/2017 05:02:28.395] *  Welcome to StarOS Server
[11/24/2017 05:02:28.395] *
[11/24/2017 05:02:28.395] ******************************************************************************************
All Process is started. 

Start SYSTEM success!, pid=16482

Start STAROS success!, pid=16485

Start COREMAIN success!, pid=16479

Start STARGUI success!, pid=16476

Start SRPC success!, pid=16468

Start SYSDB success!, pid=16462

Start ALLCONF success!, pid=16472

Start OAM success!, pid=16457

Start SYSLOG success!, pid=16465

Start DIPCSERVICE success!, pid=16453


DIPC release version 1.5.0 Build Nov 23 2017 21:13:58
```
### 三，运行控制器应用程序
```
# starosctl startapp /opt/staros.xyz/staroscontroller/starlang/main/staros.xml
```
### 四，停止控制器应用程序
```
[root@localhost projects]# starosctl listapp
Total Size:1
appid:1000        apppath:/opt/staros.xyz/staroscontroller/starlang/main/staros.xml
[root@localhost projects]# starosctl stopapp 1000
,OK
[root@localhost projects]#
```

### 五，关闭StarOS网络操作系统
```
[root@localhost projects]# dipcctl stop
```

## StarOS控制器目前采用ONOS的管理界面

* 控制器登UI地址:
http://ip:9922/onos/ui/index.html

* 控制器开发手册文档地址:
 http://ip:9922/onos/v1/docs/index.html

* StarOS系统配置界面:
https://ip:8282/starcore/ui/index.html
