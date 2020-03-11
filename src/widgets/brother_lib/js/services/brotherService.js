angular.module('brother.services')
  .factory('brotherService', ['$q', '$http', '$log', 'fluigService',
    ($q, $http, $log, fluigService) => ({

      getMarketingTipoAcao: function getMarketingTipoAcao(codigo, fields) {
        return fluigService.getDataset('marketing_tipo_acao', {
          displaykey,
        }, fields);
      },
      getMarketingAberturaVerba: function getMarketingAberturaVerba(solicitacao, fields) {
        return fluigService.getDataset('marketing_abertura_verba', {
          displaykey,
        }, fields);
      }

    })
  ]);
