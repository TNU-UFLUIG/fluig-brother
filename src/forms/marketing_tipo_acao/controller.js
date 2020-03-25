angular.module('MarketingTipoAcaoApp', ['angular.fluig', 'ngAnimate', 'brother.services', 'brother.directives', 'ngFileUpload'])

  .controller('MarketingTipoAcaoController', ['$scope', '$window', '$http', '$timeout', '$log', 'formService', 'brotherService', 'fluigService', 'erpService', 'Upload',
    function MarketingTipoAcaoController($scope, $window, $http, $timeout, $log, formService, brotherService, fluigService, erpService, Upload) {
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
        });

        if (vm.Params.edit) {
          vm.Formulario.importado = false;
        }
      };

      vm.changeContaContabil = function changeContaContabil() {

      }

      vm.changeTipoAcao = function changeTipoAcao() {

        vm.Errors = [];

        if (vm.Formulario.tipoAcao.codigo) {
          brotherService.getMarketingTipoAcao(vm.Formulario.tipoAcao.codigo).then(tipoAcao => {
            if (tipoAcao[0]) {
              vm.Errors.push('Tipo de ação já informado');
            }
          })
        }
      }

      vm.incluiItem = function incluiItem(obj) {
        obj.push({
          data: new Date().getTime(),
          usuario: vm.Usuario
        });
      };

      vm.removeChild = function removeChild(Array, $index) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse registro?',
          title: 'Excluir'
        }, (result) => {
          if (result) {
            Array.splice($index, 1);
            $scope.$apply();
          }
        });
      };

    }
  ]);
