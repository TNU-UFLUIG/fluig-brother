angular.module('BrotherResumoVerbasApp', ['brother.directives', 'angular.fluig', 'ngAnimate', 'brother.services', 'chart.js', 'ngFileUpload'])
  .controller('BrotherResumoVerbasController', ['$scope', '$log', 'brotherService',
    function BrotherResumoVerbasController($scope, $log, brotherService) {
      const vm = this;

      vm.Errors = [];

      vm.inicia = () => {
        vm.buscaSolicitacoes();
      };

      vm.buscaSolicitacoes = () => {
        FLUIGC.loading('body').show();

        vm.limitTo = 20;

        vm.Solicitacoes = null;

        // $http.get(`/brother-api/v1/marketing/resumo-cliente/${vm.Param.guid}`)
        // $http.get('../../../resources/model.json')
        brotherService.getMarketingAberturaVerba(null, ['solicitacao', 'nomeAcao', 'clienteCodigo', 'clienteNome', 'tipoAcaoDescricao', 'inicioAcao', 'terminoAcao', 'valorTotalVerba', 'valorResultado', 'valorLiberado', 'status'])
          .then((response) => {
            console.log(response);
            FLUIGC.loading('body').hide();
            vm.done = true;
            // vm.show = true;
            vm.Params = {};

            vm.Solicitacoes = response;
          }, (error) => {
            vm.done = true;
            $log.log(error);
          });
      };

      vm.inicia();
    }
  ]);

try {
  angular.element(document)
    .ready(() => {
      angular.bootstrap(document.getElementById('BrotherResumoVerbas'), ['BrotherResumoVerbasApp']);
    });
} catch (err) {
  // err
}
