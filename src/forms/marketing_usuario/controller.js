angular.module('MarketingUsuarioApp', ['angular.fluig', 'ngAnimate', 'brother.services', 'brother.directives', 'ngFileUpload'])

  .controller('MarketingUsuarioController', ['$scope', '$window', '$http', '$timeout', '$log', 'formService', 'brotherService', 'fluigService', 'globalService',
    function MarketingUsuarioController($scope, $window, $http, $timeout, $log, formService, brotherService, fluigService, globalService) {
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
        brotherService.getUsuarioMarketing().then((users) => {
          vm.UsuariosMarketing = users;
        });

        if (vm.Params.formMode === 'ADD') {
          vm.Formulario.guid = globalService.guid();
        }
      };

      vm.changeEmail = function changeEmail() {
        vm.Errors = [];

        if (vm.Formulario.email) {
          if (vm.UsuariosMarketing.filter(u => u.email === vm.Formulario.email).length > 0) {
            vm.Errors.push('E-mail já informado');
          }
        }
      };

      vm.enviaEmail = () => {
        brotherService.enviaResumoVerbas(vm.Formulario.email).then((result) => {
          FLUIGC.toast({
            title: 'Feito! ',
            message: 'Notificação enviada',
            type: 'success'
          });
        });
      };
    }
  ]);
