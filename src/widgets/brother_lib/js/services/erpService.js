angular.module('brother.services')
  .factory('erpService', ['$http', '$log', 'fluigService',
    ($http, $log, fluigService) => ({

      calculaItemErp: function calculaItemErp(codItem, codCliente, srpInicial, srpSugerido, fields) {
        return fluigService.getDatasetAsync('totvs_calcula_item', {
          codItem, codCliente, srpInicial, srpSugerido,
        }, fields);
      },

      getCategoria: function getCategoria(codigo, fields) {
        return fluigService.getDatasetAsync('totvs_busca_categoria', {
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
