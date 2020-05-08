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
      },

      getItem: function getTitulosCliente(codigo, fields) {
        return fluigService.getDatasetAsync('totvs_busca_item', {
          codigo
        }, fields);
      },

      getExecutivo: function getTitulosCliente(codigo, fields) {
        return fluigService.getDatasetAsync('totvs_busca_executivo', {
          codigo
        }, fields);
      },

      getCliente: function getCliente(codigo, fields) {
        return fluigService.getDatasetAsync('totvs_busca_cliente', {
          codigo
        }, fields);
      }

    })
  ]);
