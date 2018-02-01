
(function () {
    'use strict';
    var $log, $scope, $location, fs, tbs, ns, mast, ps, wss, is, ks;
	
	var req='vgatewayUpdaterequest';
	var resp='vgatewayUpdateresponse';	
	
	angular.module('ovVgatewayupdate', [])
		.controller('OvVgatewayupdateCtrl', 
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
			
			var ip;
			var mac;
			var information;
			
			function getUrlVars() {
				var vars = [],
					hash;
				var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
				for (var i = 0; i < hashes.length; i++) {
					hash = hashes[i].split('=');
					vars.push(hash[0]);
					vars[hash[0]] = hash[1];
				}
				return vars;
			}
			
			var handlers = {};					
			function get1user(){
				wss.sendEvent(req,{
					ip:getUrlVars()["id"],
					type:'get'
				});
			}
			
			function getUser(data) {	
				$scope.mac = data.mac;
				$scope.ip = data.ip;
				$scope.information = data.information;
				$scope.$apply();
			}
			handlers[resp] = getUser;
			wss.bindHandlers(handlers);
			
			function save(){
				//名称
				mac = document.getElementById("mac").value;
				ip = document.getElementById("ip").value;
				information = document.getElementById("information").value;
				
				if(mac == null || mac == "") {
					alert("请输入MAC！");
					return;
				}
				if(ip == null || ip == "") {
					alert("请输入IP！");
					return;
				}

				var data = {};
				data.mac = mac;
				data.ip = ip;
				data.information = information;
				data.type = 'update'
				wss.sendEvent(req,data);
				window.location.href="#/vgateway";
				
			}
			
            get1user();
            $scope.save = save;
			$scope.$on('$destroy', function () {
				$log.log('OvVgatewayupdateCtrl has been destroyed');
			});
			
		}]);
}());