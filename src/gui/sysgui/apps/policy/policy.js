(function () {
    'use strict';
	var $log, $interval, $timeout, $scope, wss, ks;
	// constants
	var dataReq = 'policyDataRequest',
        dataResp = 'policyDataResponse';
    // constants
	angular.module('ovPolicy', [])
		.controller('OvPolicyCtrl', 
		[ '$log', '$interval', '$timeout', '$scope', 'WebSocketService', 'KeyService',
		function (_$log_, _$interval_, _$timeout_, _$scope_, _wss_, _ks_) { 
			$log = _$log_;
			$scope = _$scope_;
			$interval = _$interval_;
			$timeout = _$timeout_;
			wss = _wss_;
			ks = _ks_;

			//删除
			function showDialog(){
				console.log("已触发删除事件");
				var id = $('input[name="checking"]:checked').val();
				if(id==""||id==null){
					
					console.log("开始弹出alert");
					alert("请选择需要删除的内容!");
					return;
				}else{					
					wss.sendEvent(dataReq,{
						type: "remove",
						id:id
					});
					window.location.reload();
				}
			}

			//修改
			function update(){
				var id = $('input[name="checking"]:checked').val();
				if(id==""||id==null){
					alert("请选择需要修改的内容!");
					return;
				}else{
					window.location.href="#/policyupdate?id="+id;
				}
			}			
		
			function respDataCb(data) {			
				$scope.data = data;
				$scope.$apply();
			}
			function getData() {
				var reqdata={"type":"get"};
				wss.sendEvent(dataReq,reqdata);
			}
			var handlers = {};
			$scope.data = {};
			handlers[dataResp] = respDataCb;
			wss.bindHandlers(handlers);
			getData();		
			$scope.showDialog=showDialog;
			$scope.update=update;
			
			$scope.$on('$destroy', function () {
				wss.unbindHandlers(handlers);
				$log.log('OvPolicyCtrl has been destroyed');
			});
		}]);
}());