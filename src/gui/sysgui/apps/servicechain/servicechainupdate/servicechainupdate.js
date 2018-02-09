(function () {
    'use strict';
    var $log, $scope, $location, fs, tbs, ns, mast, ps, wss, is, ks;
	
	var req='servicechainUpdaterequest';
	var resp='servicechainUpdateresponse';	
	
	angular.module('ovServicechainupdate', [])
		.controller('OvServicechainupdateCtrl', 
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
					name:getUrlVars()["id"],
					type:'get'
				});
			}
			
			function getUser(data) {	
				$scope.data = data;
				data_list = data.data
				$scope.$apply();
			}
			handlers[resp] = getUser;
			wss.bindHandlers(handlers);
			
			function save(){
				//名称
				name = document.getElementById("name").value;
				policy = $("#policy").find("option:selected").text();						

				var data = {};
				data.name = name;
				data.policy = policy;
				data.type = 'update'
				wss.sendEvent(req,data);
				window.location.href="#/servicechain";
				
			}
			
            get1user();
            $scope.save = save;
			$scope.$on('$destroy', function () {
				$log.log('OvServicechainupdateCtrl has been destroyed');
			});
			
		}]);
}());