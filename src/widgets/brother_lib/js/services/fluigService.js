angular.module('brother.services')
  .factory('fluigService', ['$q', '$http', '$log', '$document', 'globalService',
    ($q, $http, $log, $document, globalService) => ({

      active: DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST),

      /**
       * Retorna os usuários do Fluig
       *
       * @returns
       */
      getUsuarios: function getUsuarios(colleagueId, fields) {
        console.log('getUsuarios', colleagueId, fields)
        return this.getDatasetAsync('colleague', {
          colleagueId
        }, fields);
      },

      /**
       * Retorna dados de um dataset
       *
       * @param {any} name
       * @param {any} params
       * @param {any} fields
       * @returns
       */
      getDataset: function getDataset(name, params, fields, children) {
        const that = this;
        let dataset;

        const constraints = new Array(this.active);
        if (params) {
          Object.keys(params)
            .forEach((prop) => {
              if (params[prop]) {
                constraints.push(
                  DatasetFactory.createConstraint(prop, params[prop], params[prop], ConstraintType.MUST)
                );
              }
            });
        }

        try {
          dataset = DatasetFactory.getDataset(name, null, constraints)
            .values;

          if (children) {
            angular.forEach(dataset, (value) => {
              angular.forEach(children, (child) => {
                const c1 = DatasetFactory.createConstraint(
                  'tablename', child.name, child.name, ConstraintType.MUST
                );
                const c2 = DatasetFactory.createConstraint(
                  'metadata#id', value['metadata#id'], value['metadata#id'], ConstraintType.MUST
                );
                const c3 = DatasetFactory.createConstraint(
                  'metadata#version', value['metadata#version'], value['metadata#version'], ConstraintType.MUST
                );
                const constraintsFilhos = [c1, c2, c3];

                const datasetFilhos = DatasetFactory.getDataset(name, null, constraintsFilhos, null)
                  .values;

                value[child.name] = angular.toJson(that.fixDataset(datasetFilhos, child.fields));
                if (fields) {
                  fields.push(child.name);
                }
              });
            });
          }
        } catch (error) {
          $log.error(error);
        }

        return this.fixDataset(dataset, fields);
      },

      /**
       * Retorna dados de um dataset
       *
       * @param {any} name
       * @param {any} params
       * @param {any} fields
       * @returns
       */
      getDatasetAsync: function getDatasetAsync(name, params, fields) {

        console.log(name, params, fields)

        const defer = $q.defer();

        let strParams = params ? Object.keys(params).map((k) => params[k] ? `${k},${params[k]}` : '').join(",") : '';
        let strFields = fields ? fields.join() : '';
        let urlDataset = `/api/public/ecm/dataset/search?datasetId=${name}&filterFields=${strParams}&resultFields=${strFields}&limit=999999`;

        try {
          $http.get(urlDataset).then((response) => {
            defer.resolve(response.data.content);
          }, (error) => {
            $log.error('getDatasetAsync Failed: ', error);
            defer.reject(error);
          });
        } catch (error) {
          $log.error(error);
        }

        return defer.promise;
      },

      createCard: (documentDescription, parentDocumentId, formData) => {
        const defer = $q.defer();
        const form = {
          documentDescription,
          parentDocumentId,
          version: 1000,
          inheritSecurity: true,
          formData
        };

        $http.post('/api/public/2.0/cards/create', form)
          .then((data) => {
            defer.resolve(data);
          }, (error) => {
            $log.error('fluigService Error: ', error);
            defer.reject(error);
          });

        return defer.promise;
      },

      /**
       * Gera um id
       *
       * @returns
       */
      guid: function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return `${s4() + s4()}$${s4()}$${s4()}$${s4()}$${s4()}${s4()}${s4()}`;
      },

      /**
       * Remover propriedades não utilizadas do dataset
       *
       * @param {any} dataset - O dataset
       * @param {any} fields - Os campos do dataset
       * @returns
       */
      fixDataset: function fixDataset(_dataset, _fields, _lower) {
        const properties = [
          'Params',
          'Errors',
          'metadata#id',
          'metadata#parent_id',
          'metadata#version',
          'metadata#card_index_id',
          'metadata#card_index_version',
          'metadata#active',
          'cardid',
          'companyid',
          'documentid',
          'id',
          'tableid',
          'version'
        ];
        const dataset = _dataset;

        angular.forEach(dataset, (value) => {
          Object.keys(value)
            .forEach((key) => {
              if ($.inArray(key, properties) >= 0) { delete value[key]; }
              if (_fields && $.inArray(key, _fields) < 0) { delete value[key]; }

              if (value[key]) {
                value[key] = globalService.isJson(value[key]) ? angular.fromJson(value[key]) : value[key];
                if (_lower) {
                  value[key.toLowerCase()] = value[key];
                  if (key !== key.toLowerCase()) { delete value[key]; }
                }
              }
            });
        });

        return dataset;
      },
      getPasta: function getPasta(companyId, folders, fields) {
        return this.getDatasetAsync('fluig_get_pasta', {
          companyId, folders
        }, fields);
      },
    })

  ]);
