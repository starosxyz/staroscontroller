(function () {
    'use strict';
    var $log, $scope, $location, fs, tbs, ns, mast, ps, wss, is, ks;
	var Req = 'servicechainCreateRequest';
	var Resp = 'servicechainCreateResponse';
	// constants
	angular.module('ovServicechaincreate', [])
		.controller('OvServicechaincreateCtrl', 
        ['$log', '$scope', '$location',
            'FnService', 'TableBuilderService', 'NavService',
            'MastService', 'PanelService', 'KeyService', 'IconService',
            'WebSocketService',

        function (_$log_, _$scope_, _$location_, _fs_, _tbs_, _ns_,
                    _mast_, _ps_, _ks_, _is_, _wss_) {
            $log = _$log_;
            $scope = _$scope_;
            $location = _$location_;
            fs = _fs_;
            tbs = _tbs_;
            ns = _ns_;
            is = _is_;
            wss = _wss_;
            mast = _mast_;
            ps = _ps_;

			///////////////////////////////////////////////////////////////////////////////////////////////
			var name;  
			var policy;
			var data_list;
			$("#policy").change(function() {
				$.each(data_list, function(i, n) {
					if($("#policy").val() == n.policyid) {
						$("#inport").val(n.dstIp)
						$("#outport").val(n.srcIp)
					}   
				})  
			})
			//添加行
			function addRow(){	
				
				//名称的判断
				name = document.getElementById("name").value;
				policy = $("#policy").find("option:selected").text();
				
				var data = {};
				data.name = name;
				data.policy = policy;
				data.type = "create"
				wss.sendEvent(Req,data);
				window.location.href="#/servicechain";
			}
			///////////////////////////////////////////////////////////////////////////////////////////////
			function respDataCb(data) {
				$scope.data = data;
				data_list = data.data
				$scope.$apply();
			}
			function getData() {
				var reqdata={"type":"get"};
				wss.sendEvent(Req,reqdata);
			}
			var handlers = {};
			handlers[Resp] = respDataCb;
			wss.bindHandlers(handlers);
			getData()
			$scope.addRow = addRow;
			$scope.$on('$destroy', function () {
				$log.log('OvServicechaincreateCtrl has been destroyed');
			});

			
		}]);
}());