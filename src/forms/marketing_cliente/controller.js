angular.module('MarketingClienteApp', ['angular.fluig', 'ngAnimate', 'brother.services', 'brother.directives', 'ngFileUpload'])

  .controller('MarketingClienteController', ['$scope', '$window', '$http', '$timeout', '$log', 'formService', 'brotherService', 'fluigService',
    function MarketingClienteController($scope, $window, $http, $timeout, $log, formService, brotherService, fluigService) {
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
        fluigService.getUsuarios(vm.Params.user).then((users) => {
          vm.Usuario = users[0];
        });
        $log.log(vm.Params.formMode)

        if (vm.Params.formMode !== 'ADD') {
          vm.Formulario.contatos.forEach(contato => {
            $log.log(contato);
            if (contato.usuario == '') {
              contato.usuario = {
                nome: contato.nome,
                email: contato.email
              };
            }
          });
        }
      };

      vm.changeCliente = function changeCliente() {
        vm.Errors = [];

        if (vm.Formulario.cliente && vm.Formulario.cliente.codigo) {
          brotherService.getMarketingCliente(vm.Formulario.cliente.codigo).then((cliente) => {
            if (cliente[0]) {
              vm.Errors.push('Cliente já informado');
            }
          });
        }
      };

      vm.incluiItem = function incluiItem(obj) {
        obj.push({
          date: new Date().getTime(),
          user: vm.Usuario
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
