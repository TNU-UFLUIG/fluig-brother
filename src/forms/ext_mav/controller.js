angular.module('ExtMarketingAberturaVerbaApp', ['angular.fluig', 'ngAnimate', 'brother.services'])

  .controller('ExtMarketingAberturaVerbaController', ['$scope', '$window', '$http', '$compile', '$timeout', '$log', 'formService', 'brotherService', 'fluigService',
    function ExtMarketingAberturaVerbaController($scope, $window, $http, $compile, $timeout, $log, formService, brotherService, fluigService) {
      const vm = this;

      formService.atualizaFormulario($scope, vm)
        .then(() => {
          vm.loading = FLUIGC.loading('.collapse');

          if (!vm.Params.mobile && parent && parent.WCMAPI) {

            vm.WCMAPI = parent.WCMAPI;
          }

          vm.inicia();
        });

      vm.inicia = function inicia() {
      };
    }
  ]);
