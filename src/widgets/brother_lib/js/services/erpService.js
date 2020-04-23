angular.module('brother.services')
  .factory('erpService', ['$http', '$log', 'fluigService',
    ($http, $log, fluigService) => ({

      calculaItemErp: function calculaItemErp(codItem, codCliente, srpInicial, srpSugerido, fields) {
        return fluigService.getDatasetAsync('totvs_calcula_item', {
          codItem, codCliente, srpInicial, srpSugerido,
        }, fields);
      },

      getBusinessSegment: function getBusinessSegment(codigo, fields) {
        return fluigService.getDatasetAsync('totvs_busca_business_segment', {
          codigo
        }, fields);
      },

      getTitulosCliente: function getTitulosCliente(codCliente, fields) {
        return fluigService.getDatasetAsync('totvs_busca_titulo_cliente', {
          codCliente
        }, fields);
      }

    })
  ]);
