/***********************************************************************
 * Copyright (C) 2016-2017, Nanjing StarOS Technology Co., Ltd 
 * Description: 
 * Author:           Yang Yang
 * Date:             2017-01-13
**********************************************************************/
(function () {
    'use strict';
	var $log, $scope, $http;
	// constants

	angular.module('ovPolicyupdate', [])
		.controller('OvPolicyupdateCtrl', 
		[ '$log', '$scope', '$http',
		function (_$log_, _$scope_, _$http_) { 
			$log = _$log_;
			$scope = _$scope_;
			$http=_$http_;
			
			//弹出层
			function close_loginDiv(){
				$("#login_dialogDiv").fadeOut("fast");
				$("#maskDiv").css({ display: 'none' });
			}
			var name;			//策略名
			var srcIp;			//源ip
			var srcPort;		//源port
			var dstIp;			//源iP
			var dstPort;		//源port
			var	protType;		//传输协议
			var vgateway;
			var ipaddr = getUrl() ;
			var id = getUrlVars()["id"];
			function getPolicy()
			{
				
				//对ip进行判定
				 $("#src_ip").blur(function(){
					var obj=$("#src_ip").val();
					var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
					var reg = obj.match(exp);
					if(reg==null)
					{
					   alert("请输入正确的IP地址");
					   $("#src_ip").val('');
					   return;
					}
				});	
				//对ip进行判定
				 $("#dst_ip").blur(function(){
					var obj=$("#dst_ip").val();
					var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
					var reg = obj.match(exp);
					if(reg==null)
					{
					   alert("请输入正确的IP地址");
					   $("#dst_ip").val('');
					   return;
					}
				});	
				//显示需要修改的数据 
				jQuery.support.cors = true;
				//发送请求
				$.ajax({
					async		:false,
					type		: "get",
					url			: getProtocol()+ipaddr+"/policies/"+id,
					dataType    :'JSON',
					timeout		: 1000,
					success		: function(responseText, textStatus, XMLHttpRequest){
						var result = responseText.result;
						$("#text").empty();
						if(XMLHttpRequest.status == 500)
						{
							$("#maskDiv").show();
							$("#login_dialogDiv").fadeIn("slow");
							$("#text").append("<span style='color:red;padding:14px;'>服务器无响应！</span>");
							return;
						}
						if(result.code == "0")
						{
							var onos_list = responseText.policy;						
							$("#name").val(onos_list.name);
							$("#src_ip").val(onos_list.srcIp);
							$("#dst_ip").val(onos_list.dstIp);
							$("#content").val(onos_list.protType);
							$("#vgateway").val(onos_list.vgateway);
							$log.log(onos_list);
						}
						if(result.code == "1")
						{
							$("#maskDiv").show();
							$("#login_dialogDiv").fadeIn("slow");
							$("#text").append("<span style='color:red;padding:14px;'>参数异常！</span>");
							return;
						}
						if(result.code == "2")
						{
							$("#maskDiv").show();
							$("#login_dialogDiv").fadeIn("slow");
							$("#text").append("<span style='color:red;padding:14px;'>数据库异常！</span>");
							return;
						}
					},//s
					error:function(jqXHR, textStatus, errorMsg){
						$("#text").empty();
						if(textStatus=="timeout"){
							$("#maskDiv").show();
							$("#login_dialogDiv").fadeIn("slow");
							$("#text").append("<span style='color:red;padding:14px;'>请求超时！</span>");
							return;	
						}else{
							$("#maskDiv").show();
							$("#login_dialogDiv").fadeIn("slow");
							$("#text").append("<span style='color:red;padding:14px;'>请求数据失败！</span>");
						}
					}
				});
			}
				//**************************************************************************************************
				//更新数据
				function update(){
					//名称
					name = document.getElementById("name").value;
					//源ip
					srcIp = document.getElementById("src_ip").value;
					//源port
					srcPort =  "0";
					//目的ip
					dstIp = document.getElementById("dst_ip").value;
					//目的port
					dstPort = "0";
					//传输协议
					//protType = $("#content").find("option:selected").text();
					//vgateway = $("#vgateway").find("option:selected").text();
					
					protType = document.getElementById("content").value;
					vgateway = document.getElementById("vgateway").value;
					
					var sData = "{\"policy\": {\"name\": \""+name+"\",\"srcIp\": \""+srcIp+"\",\"srcPort\": \""+srcPort+"\",\"dstIp\": \""+dstIp+"\",\"dstPort\": \""+dstPort+"\",\"protType\": \""+protType+"\",\"vgateway\": \""+vgateway+"\"}}";
					console.log(sData);
					if(name==null||name=="")
					{
						alert("请输入名称！");
						return;
					}
					if(srcIp==null||srcIp=="")
					{
						alert("源IP地址不能为空！");
						return;
					}
					if(srcPort==null||srcPort=="")
					{
						alert("源Port不能为空！");
						return;
					}
					if(dstIp==null||dstIp=="")
					{
						alert("目的IP地址不能为空！");
						return;
					}
					if(dstPort==null||dstPort=="")
					{
						alert("目的Port不能为空！");
						return;
					}
					if(protType==null||protType=="")
					{
						alert("请输入您要修改的传输协议！");
						return;
					}
					else
					{
						jQuery.support.cors = true;
						$.ajax({
							async		:false,
							type		: "put",
							data        : sData,
							url			: getProtocol()+ipaddr+"/policies/"+id,
							dataType    :'JSON',
							timeout		: 1000,
							jsonpCallback: 'data',
							contentType : "application/json; charset=utf-8",
							success		: function(responseText, textStatus, XMLHttpRequest){
								var result = responseText.result;
								console.log("返回的数值："+result.code);
								$("#text").empty();
								if(XMLHttpRequest.status == 500)
								{
									$("#maskDiv").show();
									$("#login_dialogDiv").fadeIn("slow");
									$("#text").append("<span style='color:red;padding:14px;'>服务器无反应！</span>");
									return;
								}
								if(result.code == "0"){
									window.location.href="#/policy";
								}
								if(result.code == "1")
								{
									$("#maskDiv").show();
									$("#login_dialogDiv").fadeIn("slow");
									$("#text").append("<span style='color:red;padding:14px;'>参数异常！</span>");
									return;
								}
								if(result.code == "2")
								{
									$("#maskDiv").show();
									$("#login_dialogDiv").fadeIn("slow");
									$("#text").append("<span style='color:red;padding:14px;'>数据库异常！</span>");
									return;
								}
							},
							error:function(jqXHR, textStatus, errorMsg){
								$("#text").empty();
								if(textStatus=="timeout"){
									$("#maskDiv").show();
									$("#login_dialogDiv").fadeIn("slow");
									$("#text").append("<span style='color:red;padding:14px;'>请求超时！</span>");	
								}else{
									$("#maskDiv").show();
									$("#login_dialogDiv").fadeIn("slow");
									$("#text").append("<span style='color:red;padding:14px;'>请求数据失败！</span>");
								}
						   }
						 });
					}
				}
				$scope.close_loginDiv=close_loginDiv;
				$scope.update = update;
				getPolicy();
				
			// cleanup
			$scope.$on('$destroy', function () {
				$log.log('OvPolicyupdateCtrl has been destroyed');
			});

			
		}]);
}());