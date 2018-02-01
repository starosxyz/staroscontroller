(function() {
	'use strict';
	var $log, $scope, $http;
	// constants

	angular.module('ovServicechaincreate', [])
		.controller('OvServicechaincreateCtrl', ['$log', '$scope', '$http',
			function(_$log_, _$scope_, _$http_) {
				$log = _$log_;
				$scope = _$scope_;
				$http = _$http_;

				function close_loginDiv() {
					$("#login_dialogDiv").fadeOut("fast");
					$("#maskDiv").css({
						display: 'none'
					});
				}
				var svcChainName; // 业务链名称
				var policyName; //策略名称
				var startTime; //激活时间
				var state; //审核状态      0代表为激活   1代表已激活
				var subscriber; //
				var vnfChain; //vnf功能
				var policyId; //策略id
				var ipaddr = getUrl();
				
				var username = GetUserName();
				
				//获取策略名称
				$(document).ready(function() {
					jQuery.support.cors = true;
					//ajax请求
					$.ajax({
						async: false,
						type: "get",
						url: getProtocol() + ipaddr + "/serviceChains/"+username+"/"+getUrlVars()["id"],
						dataType: 'JSON',
						timeout: 1000,
						success: function(responseText, textStatus, XMLHttpRequest) {
							console.log(responseText);
							var onos_list = responseText.policies;
							console.log(onos_list);
							if(XMLHttpRequest.status == 500) {
								alert("服务器无反应！");
								return;
							}
							if(responseText.resultCode == "0") {
								var a_len = onos_list.length;
								//*************************************拼接表格*************************************
								//console.log(a_len);
								//表格标题
								$("#policyId").empty();
								$("#policyId").append("<option value=''>--请选择--</option>");
								if(a_len > 0) {
									//拼接数据
									for(var i = 0; i < a_len; i++) {
										var outPort = onos_list[i].srcIp;
										var inPort = onos_list[i].dstIp;
										$("#policyId").append("<option value='" + onos_list[i].id + "'>" + onos_list[i].name + "</option>");
									}
									$("#policyId").change(function() {
										$.each(onos_list, function(i, n) {
											if($("#policyId").val() == n.id) {
												$("#in_port").val(n.dstIp);
												$("#out_port").val(n.srcIp);
											}
										});
									});
								}
							}
							if(responseText.resultCode == "1") {
								$("#table_chain").empty();
								$("#table_chain").append("服务器处理异常！");
								return;
							}
						},
						error: function(jqXHR, textStatus, errorMsg) {
								if(textStatus == "timeout") {
									alert("请求超时！");
								} else {
									alert("请求数据失败！");
								}
							} //error 
					});
				});

				//*****************************************增加业务链**************************************
				function addRow() {
					vnfChain = [];
					$.each($("div.submitChain img"), function(i, n) {
						vnfChain.push($(n).attr("class").substr(0, 3));
					});
					//console.log(vnfChain);
					//策略名称
					policyId = $("#policyId").find("option:selected").val();
					//业务链名
					svcChainName = document.getElementById("svcChainName").value;
					//vnf功能
					//vnfChain = document.getElementById("vnf_id").value;
					//**************当前时间***************
					var myDate = new Date();
					myDate.getYear(); //获取当前年份(2位)
					myDate.getMonth(); //获取当前月份(0-11,0代表1月)
					myDate.getDate(); //获取当前日(1-31)
					myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
					myDate.getHours(); //获取当前小时数(0-23)
					myDate.getMinutes(); //获取当前分钟数(0-59)
					myDate.getSeconds(); //获取当前秒数(0-59)
					myDate.toLocaleDateString(); //获取当前日期
					//var startTime=myDate.toLocaleTimeString();     //获取当前时间
					var startTime = myDate.toLocaleString(); //获取日期与时间
					//用户
					subscriber = "admin";
					//状态
					state = "0";
					if(policyId == "") {
						alert("请选择您要绑定的策略！");
						return;
					} else if(svcChainName == "0" || svcChainName == "") {
						alert("业务链名不能为空！");
						return;
					} else if(vnfChain == "0" || vnfChain == "") {
						alert("vnf功能不能为空！");
						return;
					} else if(vnfChain[0] == vnfChain[1]) {						
						alert("不能选择相同的VNF");
						return;
					} else {
						//传递数据
						var sData = "{\"serviceChain\": {\"svcChainName\": \"" + svcChainName + "\",\"policyId\": \"" + policyId + "\",\"vnfChain\": \"" + vnfChain + "\",\"startTime\": \"" + startTime + "\",\"subscriber\": \"" + subscriber + "\",\"state\": \"" + state + "\",\"username\": \"" + username + "\"}}";
						console.log(sData);
						//var vnfchain_array = new Array();
						//vnfchain_array = vnfChain.split(",");						
						jQuery.support.cors = true;
						$http.post(getProtocol() + getUrl() + "/serviceChains/", sData).success(function(data, status, headers, config) {
							window.location.href = "#/servicechain";
						}).error(function(data, status, headers, config) {
							alert("error");
						})

					}
				}

		function subChain(){
		$(this).prev().remove();
		$(this).remove();
		var img_length=$("div.con_pic img").length;
		getWidth(img_length);
	}
	function addChain(e){
		var $img=$(this).clone(true);
		var img_length=$("div.con_pic img").length;
		$img.addClass("fw");
		var imgHtml=$img[0].outerHTML;
		var appendHtml="";
		if(img_length==0){
			appendHtml=imgHtml;
			$("div.con_pic div.submitChain").append(appendHtml);
		}else if((img_length>0)&&(img_length<2)){
			appendHtml="<em></em>"+imgHtml;
			if($(this).attr("class")=="vFW"){
				$("div.submitChain em").eq(0).before(appendHtml);
			}else{
				$("div.con_pic div.submitChain").append(appendHtml);
			}
		}else{
			var $delImg=$("div.con_pic img").eq(img_length-1);
			$delImg.prev().remove();
			$delImg.remove();
			appendHtml="<em></em>"+imgHtml;
			if($(this).attr("class")=="vFW"){
				$("div.submitChain em").eq(0).before(appendHtml);
			}else{
				$("div.con_pic div.submitChain").append(appendHtml);
			}
		}
		img_length=$("div.con_pic img").length;
		getWidth(img_length,$(this).attr("class"),true);
	}
	function getWidth(img_length, _class, isAdd) {
					if(img_length == 3) {
						$("div.con_pic em").css("width", "207px");
						if(isAdd) {
							if(_class != "vFW") {
								$("div.con_pic img").eq("2").css({
									"left": getLeft(_class),
									"top": 500
								});
							} else {
								$("div.con_pic img").eq("0").css({
									"left": getLeft(_class),
									"top": 500
								});
							}
						}
						$("div.con_pic img").eq("0").animate({
							'left': 350,
							'top': 213
						}, 200);
						$("div.con_pic img").eq("1").animate({
							'left': 500,
							'top': 213
						}, 200);
						$("div.con_pic img").eq("2").animate({
							'left': 650,
							'top': 213
						}, 200);
					} else if(img_length == 2) {
						$("div.con_pic em").css("width", "310px");
						if(isAdd) {
							if(_class != "vFW") {
								$("div.con_pic img").eq("1").css({
									"left": getLeft(_class),
									"top": 500
								});
							} else {
								$("div.con_pic img").eq("0").css({
									"left": getLeft(_class),
									"top": 500
								});
							}
						}
						$("div.con_pic img").eq("0").animate({
							'left': 400,
							'top': 213
						}, 200);
						$("div.con_pic img").eq("1").animate({
							'left': 510,
							'top': 213
						}, 200);
					} else if(img_length == 1) {
						$("div.con_pic em").css("width", "620px");
						if(isAdd) {
							$("div.con_pic img").eq("0").css({
								"left": getLeft(_class),
								"top": 500
							});
						}
						$("div.con_pic img").eq("0").animate({
							'left': 510,
							'top': 213
						}, 200);
					} else if(img_length == 0) {
						$("div.con_pic div.submitChain").html("<em></em>");
						$("div.con_pic em").css("width", "620px");
					} else {
						$("div.con_pic em").css("width", "620px");
					}
				}
	function getLeft(_class) {
					var _left = 0;
					if(_class == 'vFW') {
						_left = 265;
					} else if(_class == "vLB") {
						_left = 425;
					} else if(_class == "vVO") {
						_left = 585;
					} else if(_class == "vDP") {
						_left = 745;
					}
					return _left;
				}
				$(function() {
					$('#backid').click(function() {
						window.location.href = "#/serviceChain";
					});
					$(document).on("click", "div.con_bottom img", addChain);
					$(document).on("click", "div.submitChain img", subChain);
				});

				$scope.getLeft = getLeft;

				$scope.addRow = addRow;
				$scope.subChain = subChain;
				$scope.addChain = addChain;
				$scope.getWidth = getWidth;
				$scope.close_loginDiv = close_loginDiv;

				// cleanup
				$scope.$on('$destroy', function() {
					$log.log('OvServicechaincreateCtrl has been destroyed');
				});

			}
		]);
}());