(function() {
	'use strict';
	var $log, $scope;
	// constants

	angular.module('ovServicechainupdate', [])
		.controller('OvServicechainupdateCtrl', ['$log', '$scope',
			function(_$log_, _$scope_) {
				$log = _$log_;
				$scope = _$scope_;

				var svcChainName; // 业务链名称
				var vnfChain;
				var policyId; //策略id
				var policyName; //策略名称
				var startTime; //激活时间
				var state; //审核状态      0代表为激活   1代表已激活
				var subscriber; //描述
				var vnfChain; //vnf功能
				var ipaddr = getUrl();
				var id = getUrlVars()["id"];
				//显示需要修改的数据 

				function show_loginDiv() {
					var submitArray = [];
					$.each($("div.submitChain img"), function(i, n) {
						submitArray.push($(n).attr("class").substr(0, 3));
					});
					alert(submitArray.join(","));
					/* 	$("#maskDiv").show();
						$("#login_dialogDiv").fadeIn("slow"); */
				}
				//关闭
				function close_loginDiv() {
					$("#login_dialogDiv").fadeOut("fast");
					$("#maskDiv").css({
						display: 'none'
					});
				}

				jQuery.support.cors = true;
				//发送请求
				$.ajax({
					async: false,
					type: "get",
					url: getProtocol() + ipaddr + "/serviceChains/" + id,
					dataType: 'JSON',
					timeout: 1000,
					success: function(responseText, textStatus, XMLHttpRequest) {
						var result = responseText.result;
						//console.log(responseText);
						if(XMLHttpRequest.status == 500) {
							alert("服务器无反应！");
							return;
						}
						if(result.code == "0") {
							var onos_list = responseText.serviceChain;
							console.log(onos_list);
							//策略名称
							$("#policyName_id").val(onos_list.policyName);
							//业务流名称
							$("#svcChainName").val(onos_list.svcChainName);
							//策略id
							policyId = onos_list.policyId;
						}
						if(result.code == "1") {
							alert("参数异常！");
							return;
						}
						if(result.code == "2") {
							alert("服务器处理异常！");
							return;
						}
					}, //s
					error: function(jqXHR, textStatus, errorMsg) {
						$("#table_update").empty();
						if(textStatus == "timeout") {
							alert("请求超时！");
						} else {
							alert("请求数据失败！");
						}
					}
				});
				//*******************************************************************************
				console.log("策略id:" + policyId);
				$.ajax({
					async: false,
					type: "get",
					url: getProtocol() + ipaddr + "/policies/" + policyId,
					dataType: 'JSON',
					timeout: 1000,
					success: function(responseText, textStatus, XMLHttpRequest) {
						var result = responseText.result;
						console.log(responseText);
						if(XMLHttpRequest.status == 500) {
							$("#maskDiv").show();
							$("#login_dialogDiv").fadeIn("slow");
							$("#text").append("<span style='color:red;padding:14px;'>服务器无响应！</span>");
							return;
						}
						if(result.code == "0") {
							var onos_list = responseText.policy;
							$("#out_port").val(onos_list.srcIp);
							$("#in_port").val(onos_list.dstIp);
						}
						if(result.code == "1") {
							$("#maskDiv").show();
							$("#login_dialogDiv").fadeIn("slow");
							$("#text").append("<span style='color:red;padding:14px;'>参数异常！</span>");
							return;
						}
						if(result.code == "2") {
							$("#maskDiv").show();
							$("#login_dialogDiv").fadeIn("slow");
							$("#text").append("<span style='color:red;padding:14px;'>数据库异常！</span>");
							return;
						}
					}, //s
					error: function(jqXHR, textStatus, errorMsg) {
						$("#text").empty();
						if(textStatus == "timeout") {
							$("#maskDiv").show();
							$("#login_dialogDiv").fadeIn("slow");
							$("#text").append("<span style='color:red;padding:14px;'>请求超时！</span>");
							return;
						} else {
							$("#maskDiv").show();
							$("#login_dialogDiv").fadeIn("slow");
							$("#text").append("<span style='color:red;padding:14px;'>请求数据失败！</span>");
						}
					}
				});
				//**************************************************************************************************
				//更新数据
				function update() {
					console.log("update");
					vnfChain = [];
					$.each($("div.submitChain img"), function(i, n) {
						vnfChain.push($(n).attr("class").substr(0, 3));
					});
					//策略名
					policyName = document.getElementById("policyName_id").value;
					//业务链名称
					svcChainName = document.getElementById("svcChainName").value;
					//var sData = "{\"serviceChain\": {\"svcChainName\": \"" + svcChainName + "\",\"vnfChain\": \"" + vnfChain + "\"}}";
					var sData = "{\"svcChainName\": \"" + svcChainName + "\",\"vnfChain\": \"" + vnfChain + "\"}";
					//var sDate = "{\"state\": \"1\"}";
					//var sData = {};
					//sData.svcChainName = svcChainName;
					//sData.vnfChain = vnfChain;
					if(svcChainName == null || svcChainName == "") {
						alert("请输入要修改的名称！");
						return;
					} else if(vnfChain == null || vnfChain == "") {
						alert("vnf功能不能为空！");
						return;
					} else if(vnfChain[0] == vnfChain[1]) {						
						alert("不能选择相同的VNF");
						return;
					} else {
						//alert(id);
						jQuery.support.cors = true;
						$.ajax({
							async: false,
							type: "put",
							data: sData,
							url: getProtocol() + ipaddr + "/serviceChains/" + id,
							dataType: 'JSON',
							timeout: 1000,
							jsonpCallback: 'data',
							contentType: "application/json; charset=utf-8",
							success: function(responseText, textStatus, XMLHttpRequest) {
								var result = responseText.result;
							
								//console.log(result);
								if(XMLHttpRequest.status == 500) {
									$("#tactics_table").empty();
									$("#tactics_table").append("<span style='color:red;padding:14px;'>服务器无反应！</span>");
									return;
								}
								if(result.code == "0") {
									console.log("成功");
									alert("修改成功！");
									window.location.href = "#/servicechain";
								}
								if(result.code == "1") {
									$("#tactics_table").empty();
									$("#tactics_table").append("<span style='color:red;padding:14px;'>数据库异常！</span>");
									return;
								}
								if(result.code == "2") {
									$("#tactics_table").empty();
									$("#tactics_table").append("<span style='color:red;padding:14px;'>服务器处理异常！</span>");
									return;
								}
							},
							error: function(jqXHR, textStatus, errorMsg) {
								$("#tactics_table").empty();
								if(textStatus == "timeout") {
									$("#tactics_table").append("<span style='color:red;padding:14px;'>请求超时！</span>");
								} else {
									$("#tactics_table").append("<span style='color:red;padding:14px;'>请求数据失败！</span>");
								}
							}
						});
					}
				}

function subChain() {
					$(this).prev().remove();
					$(this).remove();
					var img_length = $("div.con_pic img").length;
					getWidth(img_length);
				}

				function addChain(e) {
					var $img = $(this).clone(true);
					var img_length = $("div.con_pic img").length;
					$img.addClass("fw");
					var imgHtml = $img[0].outerHTML;
					var appendHtml = "";
					if(img_length == 0) {
						appendHtml = imgHtml;
						$("div.con_pic div.submitChain").append(appendHtml);
					} else if((img_length > 0) && (img_length < 2)) {
						appendHtml = "<em></em>" + imgHtml;
						if($(this).attr("class") == "vFW") {
							$("div.submitChain em").eq(0).before(appendHtml);
						} else {
							$("div.con_pic div.submitChain").append(appendHtml);
						}
					} else {
						var $delImg = $("div.con_pic img").eq(img_length - 1);
						$delImg.prev().remove();
						$delImg.remove();
						appendHtml = "<em></em>" + imgHtml;
						if($(this).attr("class") == "vFW") {
							$("div.submitChain em").eq(0).before(appendHtml);
						} else {
							$("div.con_pic div.submitChain").append(appendHtml);
						}
					}
					img_length = $("div.con_pic img").length;
					getWidth(img_length, $(this).attr("class"), true);
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
				$scope.getWidth = getWidth;
				$scope.addChain = addChain;
				$scope.show_loginDiv = show_loginDiv;
				$scope.close_loginDiv = close_loginDiv;
				$scope.subChain = subChain;
				$scope.update = update;

				$scope.$on('$destroy', function() {
					$log.log('OvServicechainupdateCtrl has been destroyed');
				});

			}
		]);
}());