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
	angular.module('ovPolicycreate', [])
		.controller('OvPolicycreateCtrl', 
		[ '$log', '$scope', '$http',
		function (_$log_, _$scope_, _$http_) {
			$log = _$log_;
			$scope = _$scope_;
			$http=_$http_;
			
				var id ;	//策略id
				var name;	//策略名
				var srcIp;	//源iP
				var srcPort;//源port
				var dstIp;	//目的ip
				var dstPort;//目的port
				var protType; //传输类型
				var vgateway;
				var ipaddr = getUrl(); //接口地址
				//var description;//描述信息
				
				
				var username = GetUserName();
				
				
				
	function getPolicycreate(){
		//判断ip地址
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
		$.ajax({
			type 		:"GET",
			url 		:getProtocol()+ipaddr+"/vgateway",
			success 	:function(responseText, textStatus, XMLHttpRequest){
				if(XMLHttpRequest.status == 500)
				{
					  $("#table_list").empty();
					  $("#table_list").append("<span style='color:red;padding:14px;'>服务器无反应！</span>");
					  return;
				}
				if(responseText.resultCode == "1")
				{
					  $("#table_list").empty();
					  $("#table_list").append("<span style='color:red;padding:14px;'>参数异常！</span>");
					  return;
				}
				if(responseText.result_code == "2")
				{
					  $("#table_list").empty();
					  $("#table_list").append("<span style='color:red;padding:14px;'>数据库异常！</span>");
					  return;
				}
				var onos_list = responseText.vgateways;
				var a_len = onos_list.length;
				//*************************************拼接表格*************************************
				//console.log(a_len);
				//表格标题
				$("#vgateway").empty();
				$("#vgateway").append("<option value=''>--请选择--</option>");
				if(a_len>0){
					//拼接数据
					for(var i=0;i<a_len;i++){
						$("#vgateway").append("<option value='"+onos_list[i].id+"'>"+onos_list[i].ip+"</option>");  
					}
				}
			},//s
			error:function(jqXHR, textStatus, errorMsg){
				$("#table_list").empty();
				if(textStatus=="timeout"){
					$("#table_list").append("<span style='color:red;padding:14px;'>请求超时！</span>");	
				}else{
					$("#table_list").append("<span style='color:red;padding:14px;'>请求数据失败！</span>");
				}
		   }
		 });
}
	//点击添加
	function addRow(){
		//名字非空
		name = $("#name").val();
		if(name==null||name==""){
			alert("名称不能为空！");	
			return;
		} 
		//srcIp不为空
		var ip = $("#src_ip").val();
		if(ip==null||ip==""){
			alert("源IP地址不能为空！");	
			return;
		}

		//dstIp不为空
		ip = $("#dst_ip").val();
		if(ip==null||ip==""){
			alert("目的IP地址不能为空！");	
			return;
		}

		vgateway = $("#vgateway").val();
		if(vgateway==null||vgateway==""){
			alert("虚拟网关不能为空！");	
			return;
		}
		//获取输入的内容
		name = document.getElementById("name").value;
		srcIp = document.getElementById("src_ip").value;
		srcPort = "0";
		dstIp = document.getElementById("dst_ip").value;
		dstPort = "0";
		protType = $("#content").find("option:selected").text();
		vgateway = $("#vgateway").find("option:selected").text();
		var sData = "{\"policy\": {\"name\": \""+name+"\",\"srcIp\": \""+srcIp+"\",\"srcPort\": \""+srcPort+"\",\"dstIp\": \""+dstIp+"\",\"dstPort\": \""+dstPort+"\",\"protType\": \""+protType+"\",\"vgateway\": \""+vgateway+"\",\"username\": \""+username+"\"}}";
		console.log(sData);
		jQuery.support.cors = true;
		$.ajax({
			async		:false,
			type		: "post",
			data        : sData,
			url			: getProtocol()+ipaddr+"/policies",
			dataType    :'JSON',
			timeout		: 1000,
			jsonpCallback: 'data',
			contentType : "application/json; charset=utf-8",
		    success		: function(responseText, textStatus, XMLHttpRequest){
		    	var onos_list = responseText.result;
		    	var resultCode = onos_list.code;
		    	console.log(onos_list);
		    	if(XMLHttpRequest.status == 500)
				{
					  $("#tactics_table").empty();
					  $("#tactics_table").append("<span style='color:red;padding:14px;'>服务器无反应！</span>");
					  return;
				}
		    	if(resultCode == "0"){
					window.location.href="#/policy";
		    	}
		    	if(resultCode == "1")
				{
					  $("#tactics_table").empty();
					  $("#tactics_table").append("<span style='color:red;padding:14px;'>参数异常！</span>");
					  return;
				}
				if(resultCode == "2")
				{
					  $("#tactics_table").empty();
					  $("#tactics_table").append("<span style='color:red;padding:14px;'>服务器处理异常！</span>");
					  return;
				}
		    },
		    error:function(jqXHR, textStatus, errorMsg){
				$("#tactics_table").empty();
				if(textStatus=="timeout"){
					$("#tactics_table").append("<span style='color:red;padding:14px;'>请求超时！</span>");	
				}else{
					$("#tactics_table").append("<span style='color:red;padding:14px;'>请求数据失败！</span>");
				}
		   }
		 });
	}	
			$scope.addRow = addRow;
			getPolicycreate();
			
			// cleanup
			$scope.$on('$destroy', function () {
				$log.log('OvPolicycreateCtrl has been destroyed');
			});

			
		}]);
}());