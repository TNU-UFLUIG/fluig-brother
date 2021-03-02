angular.module('brother.services')
  .factory('brotherService', ['$q', '$http', '$log', 'fluigService',
    ($q, $http, $log, fluigService) => ({

      getMarketingTipoAcao: function getMarketingTipoAcao(tipoAcaoCodigo, fields) {
        return fluigService.getDatasetAsync('marketing_tipo_acao', {
          tipoAcaoCodigo
        }, fields);
      },
      getMarketingAberturaVerba: function getMarketingAberturaVerba(solicitacao, fields) {
        return fluigService.getDatasetAsync('marketing_abertura_verba', {
          solicitacao,
        }, fields);
      },
      getMarketingParametros: function getMarketingParametros(fields) {
        return fluigService.getDatasetAsync('marketing_parametros', {
        }, fields);
      },
      getMarketingComposicaoEmail: function getMarketingComposicaoEmail(fields) {
        return fluigService.getDatasetAsync('marketing_composicao_email', {
        }, fields);
      },
      getMarketingCliente: function getMarketingCliente(clienteCodigo, fields) {
        return fluigService.getDatasetAsync('marketing_cliente', {
          clienteCodigo
        }, fields);
      },
      getContatosCliente: function getContatosCliente(documentid, fields) {
        return fluigService.getDatasetAsync('marketing_cliente', {
          documentid, tablename: 'contatos'
        }, fields);
      }
    })
  ]);
