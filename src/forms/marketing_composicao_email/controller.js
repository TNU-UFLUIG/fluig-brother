angular.module('MarketingComposicaoEmailApp', ['angular.fluig', 'ngAnimate', 'brother.services', 'brother.directives', 'ngFileUpload'])

  .controller('MarketingComposicaoEmailController', ['$scope', '$window', '$http', '$timeout', '$compile', '$log', 'formService', 'brotherService', 'fluigService', 'erpService', 'Upload',
    function MarketingComposicaoEmailController($scope, $window, $http, $timeout, $compile, $log, formService, brotherService, fluigService, erpService, Upload) {
      const vm = this;

      if (window.location.hostname == 'localhost') {
        angular.forEach(angular.element('[tablename]'),
          (value) => {
            const table = angular.element(value);
            angular.forEach(table.find('tbody'), tbody => {
              angular.element(tbody)
                .attr('ng-non-bindable', null);
              $compile(table)($scope);
            })
          });
      }

      formService.atualizaFormulario($scope, vm)
        .then(() => {
          try {
            vm.inicia();
          } catch (error) {
            vm.Errors.push(error);
          }

        });

      vm.inicia = function inicia() {
        fluigService.getUsuarios(vm.Params.user).then(users => {
          vm.Usuario = users[0];
        });

        if (vm.Params.formMode == 'ADD') {
          brotherService.getMarketingComposicaoEmail().then(composicao => {
            if (composicao[0]) {
              vm.Errors.push('Composição já informada');
            }
          });
        };

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
          'version',
          'masterid',
          'wdk_sequence_id'
        ];

        vm.CamposSolicitacao = [];

        DatasetFactory.getDataset('marketing_abertura_verba').columns.forEach(column => {
          if ($.inArray(column, properties) < 0) {
            vm.CamposSolicitacao.push({ name: column });
          }
        });

        [
          { label: 'Duplicatas', name: 'duplicatas' },
          { label: 'SellinIt', name: 'itensSellinIt' },
          { label: 'SellinTg', name: 'itensSellinTg' },
          { label: 'SellinTgAc', name: 'itensSellinTgAc' },
          { label: 'Sellout', name: 'itensSellout' },
          { label: 'SpiffIt', name: 'itensSpiffIt' },
          { label: 'SpiffTg', name: 'itensSpiffTg' },
          { label: 'VpcEvt', name: 'itensVpcEvt' },
          { label: 'VpcOutros', name: 'itensVpcOutros' },
          { label: 'Evidencias', name: 'arquivosEvidencias' },
          { label: 'ND', name: 'arquivosND' }
        ].forEach(table => {
          vm[`Campos${table.label}`] = [];
          DatasetFactory.getDataset('marketing_abertura_verba', null, [
            DatasetFactory.createConstraint(
              'tablename', table.name, table.name, ConstraintType.MUST)
          ]).columns.forEach(column => {
            if ($.inArray(column, properties) < 0) {
              vm[`Campos${table.label}`].push({ name: column });
            }
          })
        });


        if (vm.Formulario.campos.length == 0) {
          vm.Formulario.campos = [{ iniAcao: true, fimAcao: true, evidencia: true, envioND: true, pagamento: true }];
        }
        if (vm.Formulario.destinatarios.length == 0) {
          vm.Formulario.destinatarios = [{ iniAcao: true, fimAcao: true, evidencia: true, envioND: true, pagamento: true }];
        }

        if (vm.Params.edit) {
          vm.Formulario.importado = false;
        }
      };

      vm.removeChild = function removeChild(Array, $index) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse registro?',
          title: 'Excluir'
        }, (result) => {
          if (result) {
            Array.splice($index, 1);
            $scope.$apply();
          }
        });
      };
    }
  ]);

Array.prototype.move = function (old_index, new_index) {
  if (new_index >= this.length) {
    let k = new_index - this.length;
    while ((k--) + 1) {
      this.push(undefined);
    }
  }
  this.splice(new_index, 0, this.splice(old_index, 1)[0]);
  return this; // for testing purposes
};
