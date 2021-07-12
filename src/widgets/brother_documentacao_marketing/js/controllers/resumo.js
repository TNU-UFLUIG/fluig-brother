angular
  .module('BrotherDocumentacaoMarketingMainApp')
  .controller('BrotherResumoVerbasController', ['$scope', '$log', '$http', '$routeParams',
    function BrotherResumoVerbasController($scope, $log, $http, $routeParams) {
      const vm = this;

      vm.Errors = [];

      vm.inicia = () => {
        vm.Param = {
          guid: $routeParams.guid
        };
        if (vm.Param.guid) {
          vm.buscaSolicitacoes();
        }
      };

      vm.buscaSolicitacoes = () => {
        vm.limitTo = 100;
        FLUIGC.loading('body').show();

        vm.Solicitacoes = null;

        $http.get(`/brother-api/v1/resumo/search/${vm.Param.guid}`)
        // $http.get('../../../resources/model.json')
        // brotherService.getMarketingAberturaVerba()
          .then((response) => {
            console.log(response);
            FLUIGC.loading('body').hide();
            vm.done = true;
            // vm.show = true;
            vm.Params = {};

            vm.Solicitacoes = response.data;
            vm.Solicitacoes.forEach(s => {
              s.prazoVencto = Math.floor(moment(new Date()).diff(moment(new Date(s.terminoAcao)), 'months', true));
            });
          }, (error) => {
            vm.done = true;
            $log.log(error);
          });
      };

      vm.inicia();
    }
  ]);
