angular
  .module('BrotherDocumentacaoMarketingMainApp')
  .controller('BrotherDocumentacaoMarketingController', ['$scope', '$log', '$http', '$routeParams', '$timeout', 'fluigService', '$window', 'Upload',
    function BrotherDocumentacaoMarketingController($scope, $log, $http, $routeParams, $timeout, fluigService, $window, Upload) {
      const vm = this;

      vm.Errors = [];

      vm.inicia = function inicia() {

        vm.loading = FLUIGC.loading('body');

        if ($window.location.href.indexOf("/p/") > 0) {
          $http.get('/portal/p/api/servlet/logout.do')
            .then(response => {
              $window.location.href = $window.location.href.replace("/p/", "/");
            });
        }
        vm.Param = {
          guid: $routeParams.guid || '47a2a3ef$d59e$e76f$c05f$efb1f5a0bc98'
        };
        console.log(vm.Param);
        if (vm.Param.guid) {
          vm.buscaSolicitacao();
        }

      };

      vm.logout = function logout() {
        $http.get('/portal/p/api/servlet/logout.do');
      }

      vm.buscaSolicitacao = function buscaSolicitacao() {

        vm.loading.show();

        $http.get(`/brother-api/v1/marketing/search/${vm.Param.guid}`)
          .then((response) => {
            vm.loading.hide();
            vm.done = true;
            vm.step = 1;
            vm.currentStep = 2;

            vm.Formulario = response.data;

            console.log(vm.Formulario);

            if (!vm.Formulario) {
              return;
            }
          }, (error) => {
            vm.done = true;
            $log.log(error);
          });
      };

      vm.salvar = function salvar() {

        console.log("vm.salvar", vm.alterado);

        if (!vm.alterado) {
          return;
        }

        vm.alterado = false;

        var notUploaded = false;
        vm.Formulario.evidencias.forEach(arquivo => {
          console.log(arquivo);
          if (!arquivo.url) {
            notUploaded = true;
          }
        });

        console.log(notUploaded);

        if (notUploaded) {
          return;
        }

        vm.loading.show();

        $http.post(`/brother-api/v1/marketing/update`, vm.Formulario, { headers: { 'guid': vm.Param.guid } })
          .then((response) => {
            console.log(response);
            vm.loading.hide();
            // vm.Formulario = response.data;
          }, (error) => {
            vm.done = true;
            $log.log(error);
          });
      };

      vm.selectFiles = function selectFiles(tablename, files) {
        if (!vm.Formulario[tablename]) {
          vm.Formulario[tablename] = [];
        }

        console.log(vm.Formulario[tablename], files);

        files.forEach(file => {
          console.log(file);
          file.nome = file.name;
          file.descricao = file.name;
          vm.Formulario[tablename].push(file);
          vm.upload(file);
        });

        console.log(vm.Formulario[tablename], files);
      };

      vm.upload = function upload(file) {

        console.log(file);

        Upload.upload({
          url: '/brother-api/v1/file/upload',
          data: {
            file: file,
            parentDocumentId: 2438
          }
        }).then(function (resp) {
          file.documentid = resp.data.documentid;
          file.filename = resp.data.filename;
          file.url = resp.data.url;
          file.description = resp.data.description;
          file.uploaded = true;

          console.log(file);

          vm.alterado = true;
          vm.salvar();

        }, function (resp) {
          console.log('Error status: ' + resp.status);
        }, function (evt) {
          file.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        });
      }

      vm.removeArquivo = function removeArquivo(arquivo) {
        FLUIGC.message.confirm({ message: 'Deseja excluir esse arquivo?', title: 'Excluir arquivo' }, result => {
          if (result) {
            arquivo.removed = true;
            vm.alterado = true;
            $scope.$apply();
            vm.salvar();
          }
        });
      };

      vm.enviar = function enviar() {
        FLUIGC.message.confirm({ message: 'Confirma o envio dos arquivos?', title: 'Enviar documentação' }, result => {
          if (result) {
            vm.Formulario.envioEvidenciasConcluido = true;
            vm.alterado = true;
            $scope.$apply();
            vm.salvar();
          }
        });
      }

      vm.inicia();

    }
  ])
