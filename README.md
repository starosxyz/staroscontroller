StarOS-Controller
====================================

### 基于StarLang的开源控制器, Restful API兼容onos， 采用ONOS界面。使用SDN编程语言重新编写.

### 控制器特点

* XML和javascript编写控制器APP.
* 支持集群.
*  XML/javascript和C++互补.
* 支持Restful-http/Restful-https/netconf协议.
* 支持OpenFlow1.3协议.
* 支持NETCONF over SSH ([RFC 4742](https://tools.ietf.org/html/rfc4742), [RFC 6242](https://tools.ietf.org/html/rfc6242)).
* 支持NETCONF Call Home ([RFC 8071](https://tools.ietf.org/html/rfc8071)).
* 支持YANG 1.0 ([RFC 6020](https://tools.ietf.org/html/rfc6020))和YANG 1.1 ([RFC 7950](https://tools.ietf.org/html/rfc7950))建模语言.

### StarLang SDN编程语言
* 支持面向对象的编程方式，类，数据封装，继承.
* 支持运算位运算<<,>>,+,-,*,%,/,~,^,&.
* 支持关键字for,while,if,function,openflow,netconf, restful等流程控制语法.
* 支持数据类型，uint8_t, uint16_t, uint32_t,uint64_t, void,string, class, object,param,long等基本数据类型.
* 支持自定义类类型
* 支持messageblock数据类型, 用于对流式报文数据做streamfrom, streamto操作处理.
* 支持container容器类型。 容器有list, hashmap, array等类型.

### 开始
```
# git clone https://github.com/starosxyz/staroscontroller
# cd staroscontroller/tools/installstaros
# chmod a+x staros-install.sh
# ./staros-install.sh install
# cd ../../projects/
# source ./env.sh
# make
# mv staroscontroller /opt/staros.xyz/
# dipc start
# starosctl startapp /opt/staros.xyz/staroscontroller/starlang/main/staros.xml
```
### 运行应用程序
```
# starosctl startapp [appfile]
# starosctl listapp 
# starosctl stopapp [appid] 
```
### GUI
* 控制器登UI地址:
http://ip:9922/onos/ui/index.html

* 控制器开发手册文档地址:
 http://ip:9922/onos/v1/docs/index.html

* StarOS系统配置界面:
https://ip:8282/starcore/ui/index.html
