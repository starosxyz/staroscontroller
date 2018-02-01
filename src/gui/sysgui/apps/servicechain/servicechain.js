(function () {
    'use strict';
	var $log, $scope,$http;
	// constants

	angular.module('ovServicechain', [])
		.controller('OvServicechainCtrl', 
		[ '$log', '$scope','$http',
		function (_$log_, _$scope_, _$http_) { 
			$log = _$log_;
			$scope = _$scope_;
			$http = _$http_;
			
			
		function close_loginDiv(){
		$("#login_dialogDiv").fadeOut("fast");
		$("#maskDiv").css({ display: 'none' });
	}
	function close_loginDiv2(){
		$("#login_dialogDiv2").fadeOut("fast");
		$("#maskDiv").css({ display: 'none' });
	}
	
			
			
var svcChainName;			//业务链名称
var policyName; 			//策略名称
var startTime;				//通过审核的时间
var ipaddr = getUrl(); //接口地址

var username = GetUserName();


$(document).ready(function(){
	jQuery.support.cors = true;
	//ajax请求
	$.ajax({
		async		:false,
		type		: "get",
		url			: getProtocol()+ipaddr+"/serviceChains/"+username+"/"+getUrlVars()["id"],
		timeout		: 1000,
		success		: function(responseText, textStatus, XMLHttpRequest){
			var onos_list = responseText.serviceChains;
			//console.log(onos_list);
			var onos_policy = responseText.policies
			if(XMLHttpRequest.status == 500)
			{
				$("#table_list").empty();
				$("#table_list").append("<span style='color:red;padding:14px;'>服务器无反应！</span>");
					return;
			}
			if(responseText.resultCode == "0"){
				var a_len = onos_list.length;
				//*************************************拼接表格*************************************
				//表格标题
				$("#table_list").empty();
				$("#table_list").append("<tr><th>操作</th><th>业务流名称</th><th>服务链名称</th><th width='306'>拓扑视图</th><th>状态</th><th>创建时间</th></tr>");
				if(a_len>0){
					//拼接数据
					for(var i=0;i<a_len;i++)
					{
						if(onos_list[i].state=="0"){
							onos_list[i].state = "未审核";
						}else if(onos_list[i].state=="1"){
							onos_list[i].state = "审核成功";
						}else{
							onos_list[i].state = "审核不通过";
						}
						/*$("#table_list").append("<tr><td><input type='radio' id='checking' name='checking' class='select_btn1 fl' value='"+onos_list[i].policyId+"'/></td><td>"+onos_list[i].policyName+"</td><td >"+onos_list[i].svcChainName+"</td><td><div class='bus_box fl'><img src='../dist/img/icon06.png'  class='sm'/><em></em>"+onos_list[i].vnfChain+"<em></em><img src='../dist/img/icon07.png' class='sm'/></div></td><td>"+onos_list[i].state+"</td><td>"+onos_list[i].startTime+"</td></tr>");*/  
						$("#table_list").append("<tr><td><input type='radio' id='checking' name='checking' class='select_btn1 fl' value='"+onos_list[i].svcChainId+"'/></td><td>"+onos_list[i].policyName+"</td><td >"+onos_list[i].svcChainName+"</td><td><div class='bus_box fl' id='"+onos_list[i].svcChainId+"'></div></td><td>"+onos_list[i].state+"</td><td>"+onos_list[i].startTime+"</td></tr>");  
						var str = onos_list[i].vnfChain;
						//console.log(str);
						/*var strArry = str.split(",");
						for (var j=0;j<strArry.length;j++){
							 var temp=strArry[j];
							 console.log(strArry[j]);
						}*/
						//console.log(str);
						if(str=="vFW"){
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon06.png'  class='sm'/>");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon_fw.png' />");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon07.png'  class='sm'/>");
						}
						if(str=="vLB"){
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon06.png'  class='sm'/>");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon_lb.png' />");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon07.png'  class='sm'/>");
						}
						if(str=="vVO"){
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon06.png'  class='sm'/>");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon_vo.png' />");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon07.png'  class='sm'/>");
						}
						if(str=="vDP"){
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon06.png'  class='sm'/>");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon_dp.png' />");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon07.png'  class='sm'/>");
						}
						if(str=="vFW,vLB"){
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon06.png'  class='sm'/>");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon_fw.png' />");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon_lb.png' />");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon07.png'  class='sm'/>");
							
						}
						if(str=="vFW,vDP"){
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon06.png'  class='sm'/>");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon_fw.png' />");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon_dp.png' />");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon07.png'  class='sm'/>");
							
						}
						if(str=="vFW,vVO"){
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon06.png'  class='sm'/>");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon_fw.png' />");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon_vo.png' />");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon07.png'  class='sm'/>");			
						}
						
						
						if(str=="vLB,vVO"){
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon06.png'  class='sm'/>");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon_lb.png' />");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon_vo.png' />");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon07.png'  class='sm'/>");			
						}
						if(str=="vLB,vDP"){
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon06.png'  class='sm'/>");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon_lb.png' />");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon_dp.png' />");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon07.png'  class='sm'/>");			
						}
							if(str=="vVO,vDP"){
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon06.png'  class='sm'/>");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon_vo.png' />");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon_dp.png' />");
							$("#"+onos_list[i].svcChainId+"").append("<em></em>");
							$("#"+onos_list[i].svcChainId+"").append("<img src='dist/img/icon07.png'  class='sm'/>");			
						}
						
					} 
				}
			}
			if(responseText.resultCode == "1")
			{
				$("#table_list").empty();
				$("#table_list").append("<span style='color:red;padding:14px;'>服务器处理异常！</span>");
					return;
			}
		},//s
		error:function(jqXHR, textStatus, errorMsg){
			$("#table_list").empty();
			if(textStatus=="timeout"){
				$("#table_list").append("<span style='color:red;padding:14px;'>请求超时！</span>");	
			}else{
				$("#table_list").append("<span style='color:red;padding:14px;'>请求数据失败！</span>");
			}
		}//error 
		});//a
});
function update()
{	
	 	var id = $('input[name="checking"]:checked').val()
        if(id==""||id==null){
        		$("#text").empty();
        		$("#maskDiv").show();
        		$("#login_dialogDiv").fadeIn("slow");
        		$("#text").append("请选择需要修改的内容！");
        		return;
        }else{
        	//alert(id);
        	window.location.href="#/servicechainupdate?id="+id;
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
function delRow()
{	
	 	var id = $('input[name="checking"]:checked').val()
	 	jQuery.support.cors = true;
		$.ajax({
			async		:false,
			type		: "delete",
			url			: getProtocol()+ipaddr+"/serviceChains/"+id,
			dataType    :'JSON',
			timeout		: 1000,
		    success		: function(responseText, textStatus, XMLHttpRequest){
		    	var result = responseText.result;
		    	console.log(result);
		    	if(XMLHttpRequest.status == 500)
				{
					  $("#table_list").empty();
					  $("#table_list").append("<span style='color:red;padding:14px;'>服务器无反应！</span>");
					  return;
				}
		    	if(result.code == "1")
				{
					  $("#table_list").empty();
					  $("#table_list").append("<span style='color:red;padding:14px;'>数据库异常！</span>");
					  return;
				}
				if(result.code == "2")
				{
					  $("#table_list").empty();
					  $("#table_list").append("<span style='color:red;padding:14px;'>服务器处理异常！</span>");
					  return;
				}
		    },
		    error:function(jqXHR, textStatus, errorMsg){
				$("#table_list").empty();
				if(textStatus=="timeout"){
					$("#table_list").append("<span style='color:red;padding:14px;'>请求超时！</span>");	
				}else{
					$("#table_list").append("<span style='color:red;padding:14px;'>请求数据失败！</span>");
				}
		   }
		 });
		window.location.reload();
}
			
			
			
			
		$scope.delRow=delRow;
			$scope.showDialog=showDialog;
			$scope.update=update;
			$scope.close_loginDiv=close_loginDiv;
			$scope.close_loginDiv2=close_loginDiv2;
			
			
			
			
			
			
			
			
			// cleanup
			$scope.$on('$destroy', function () {
				$log.log('OvServicechainCtrl has been destroyed');
			});

			
		}]);
}());