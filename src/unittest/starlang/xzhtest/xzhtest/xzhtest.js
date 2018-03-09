
(function () {
    'use strict';
    var $log, $scope, $location, fs, tbs, ns, mast, ps, wss, is, ks;

	 var Req = 'xzhtestDataRequest',
        Resp = 'xzhtestDataResponse';
        
	angular.module('ovTestRegister', [])
		.controller('OvTestRegisterCtrl', 
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
				
				///////////////////////////////
				var handlers = {};
				function getAllFaultStatistics(){
					var reqdata={};
					wss.sendEvent(Req,reqdata);
				}
				
				function getFaultStatistics(data){
					console.log("enter getFaultStatistics 12.11");
					
					$scope.statistics_list = data.faultStatistics;
					$log.log("::"+data);
					$scope.$apply();
					
					$('#example81').DataTable({
								  "paging":true,
								  "lengthChange": true,
								  "searching": true,
								  "ordering": true,
								  "info": true,
								  "autoWidth": true
								});
				}
				handlers[Resp] = getFaultStatistics;
				wss.bindHandlers(handlers);
				///////////////////////////////

				
				getAllFaultStatistics();
				$scope.$on('$destroy', function () {
					$log.log('OvTestRegisterCtrl has been destroyed');
				});

				
			}
		]);
}());