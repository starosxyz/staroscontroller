(function () {
    'use strict';
    var $log, $scope, $location, fs, tbs, ns, mast, ps, wss, is, ks;
	
	var req='policyUpdaterequest';
	var resp='policyUpdateresponse';	
	
	angular.module('ovPolicyupdate', [])
		.controller('OvPolicyupdateCtrl', 
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
			
			var id;
			var srcIp;
			var dstIp;
			var content;
			
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
					id:getUrlVars()["id"],
					type:'get'
				});
			}
			
			function getUser(data) {	
				$scope.id = data.policyid;
				$scope.srcip = data.srcIp;
				$scope.dstip = data.dstIp;
				$scope.content = data.content;
				$scope.$apply();
			}
			handlers[resp] = getUser;
			wss.bindHandlers(handlers);
			
			function save(){
				id = document.getElementById("id").value;
				srcIp = document.getElementById("srcip").value;
				dstIp = document.getElementById("dstip").value;
				content = $("#content").find("option:selected").text();
								
				var data = {};
				data.id = id;
				data.srcip = srcIp;
				data.dstip = dstIp;
				data.content = content
				data.type = 'update'
				wss.sendEvent(req,data);
				window.location.href="#/policy";
				
			}
			
            get1user();
            $scope.save = save;
			$scope.$on('$destroy', function () {
				$log.log('OvPolicyupdateCtrl has been destroyed');
			});
			
		}]);
}());