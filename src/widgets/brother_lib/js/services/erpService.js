angular.module('brother.services')
  .factory('erpService', ['$http', '$log', 'fluigService',
    ($http, $log, fluigService) => ({

      calculaItemErp: function calculaItemErp(codItem, srpInicial, srpSugerido, fields) {
        return fluigService.getDataset('totvs_calcula_item', {
          codItem, srpInicial, srpSugerido,
        }, fields);
      },

      getCategoria: function getCategoria(codigo, fields) {
        return fluigService.getDataset('totvs_busca_categoria', {
          codigo
        }, fields);
      },

      getTitulosCliente: function getTitulosCliente(codCliente, fields) {
        return fluigService.getDataset('totvs_busca_titulo_cliente', {
          codCliente
        }, fields);
      }

    })
  ]);
