(function () {
    'use strict';
    var $log, $scope, $location, fs, tbs, ns, mast, ps, wss, is, ks;
	var Req = 'vgatewayCreateRequest';
	var Resp = 'vgatewayCreateResponse';
	// constants
	angular.module('ovVgatewaycreate', [])
		.controller('OvVgatewaycreateCtrl', 
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
			var mac;  
			var ip;
			var information;

			//添加行
			function addRow(){	
				
				//名称的判断
				mac = document.getElementById("mac").value;
				if(mac==null||mac==""){
					alert("MAC不能为空！");
					return;
				}
				ip = document.getElementById("ip").value;
				if(ip==null||ip==""){
					alert("IP不能为空！"); 
					return;
				}
				information = document.getElementById("information").value;
				var data = {};
				data.mac = mac;
				data.ip = ip;
				data.information = information;
				wss.sendEvent(Req,data);
				window.location.href="#/vgateway";
			}
			///////////////////////////////////////////////////////////////////////////////////////////////
                    
			$scope.addRow = addRow;
			$scope.$on('$destroy', function () {
				$log.log('OvVgatewaycreateCtrl has been destroyed');
			});

			
		}]);
}());