angular.module('MarketingParametrosApp', ['angular.fluig', 'ngAnimate', 'brother.services', 'brother.directives', 'ngFileUpload'])

  .controller('MarketingParametrosController', ['$scope', '$window', '$http', '$timeout', '$log', 'formService', 'brotherService', 'fluigService', 'erpService', 'Upload',
    function MarketingParametrosController($scope, $window, $http, $timeout, $log, formService, brotherService, fluigService, erpService, Upload) {
      const vm = this;
      formService.atualizaFormulario($scope, vm)
        .then(() => {
          try {
            vm.inicia();
          } catch (error) {
            vm.Errors.push(error);
          }

        });

      vm.inicia = function inicia() {
        fluigService.getUsuarios(vm.Params.user).then(users => {
          vm.Usuario = users[0];
        })

        if (vm.Params.formMode == 'ADD') {
          brotherService.getMarketingParametros().then(parametros => {
            if (parametros[0]) {
              vm.Errors.push('Parâmetros já informados');
            }
          })
        }

        if (vm.Params.edit) {
          vm.Formulario.importado = false;
        }
      };

    }
  ]);
