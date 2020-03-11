angular.module('brother.services')
  .factory('erpService', ['$http', '$log', 'fluigService',
    ($http, $log, fluigService) => ({

      /**
       * Retorna os estabelecimentos cadastrados no ERP
       *
       * @param {string} cod_empresa
       * @returns
       */
      getEstabelecimento: function getEstabelecimento(codigo) {
        const constraints = [];
        let dataset;

        if (codigo) {
          constraints.push(DatasetFactory.createConstraint('codigo', codigo, codigo, ConstraintType.MUST));
        }

        try {
          dataset = DatasetFactory.getDataset('brother_erp_consulta_estabelecimento', null, constraints)
            .values;
        } catch (error) {
          $log.error(error);
        }

        return fluigService.fixDataset(dataset, null, true);
      },

      /**
       * Retorna as categorias cadastradas no ERP
       *
       * @param {string} codigo
       * @returns
       */
      getCategoria: function getCategoria(codigo) {
        const constraints = [];
        let dataset;

        if (codigo) {
          constraints.push(DatasetFactory.createConstraint('codigo', codigo, codigo, ConstraintType.MUST));
        }

        try {
          dataset = DatasetFactory.getDataset('totvs_busca_categoria', null, constraints)
            .values;
        } catch (error) {
          $log.error(error);
        }

        return fluigService.fixDataset(dataset, null, true);
      },

    })
  ]);
