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

	angular.module('ovPolicy', [])
		.controller('OvPolicyCtrl', 
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
			function close_loginDiv2(){
				$("#login_dialogDiv2").fadeOut("fast");
				$("#maskDiv").css({ display: 'none' });
			}
			var name;			//策略名
			var srcIp;			//源ip
			var srcPort;		//源port
			var dstIp;			//源iP
			var dstPort;		//源port
			var	portType;		//传输协议
			var ipaddr=getUrl(); //接口地址

			var username = GetUserName();
			
			function getPolicyList() {
				$http.get(getProtocol()+getUrl()+"/policies/"+username+"/"+getUrlVars()["id"]).success(function(data, status, headers, config){
					$scope.policy_list = data.policies;
				}).error(function(data, status, headers, config){
					alert("error");
				})
			}
			//修改
			function update(){
					   var id = $('input[name="checking"]:checked').val()
					   if(id==""||id==null){
						   $("#text").empty();
						   $("#maskDiv").show();
						   $("#login_dialogDiv").fadeIn("slow");
						   $("#text").append("请选择需要修改的内容！");
						   return;
					   }else{
						window.location.href="#/policyupdate?id="+id;
					   }
			}
			function showDialog()
			{	
					var id = $('input[name="checking"]:checked').val()
					if(id==""||id==null){
							$("#text").empty();
							$("#maskDiv").show();
							$("#login_dialogDiv").fadeIn("slow");
							$("#text").append("请选择需要删除的内容！");
							return;
					}else{
						$("#maskDiv").show();
						$("#login_dialogDiv2").fadeIn("slow");
					}
			}
			//删除
			function delRow(){
				var id = $('input[name="checking"]:checked').val();
				console.log(id);
				$http.delete(getProtocol()+getUrl()+"/policies/"+id).success(function(data, status, headers, config){
					//var result = data.result;
					window.location.reload();
				}).error(function(data, status, headers, config){
					alert("error");
				})
			}
			$scope.close_loginDiv = close_loginDiv;
			$scope.close_loginDiv2 = close_loginDiv2;
			$scope.update = update;
			$scope.showDialog = showDialog;
			$scope.delRow = delRow;
			getPolicyList();
			
			
			// cleanup
			$scope.$on('$destroy', function () {
				$log.log('OvPolicyCtrl has been destroyed');
			});

			
		}]);
}());