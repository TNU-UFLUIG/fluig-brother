angular
  .module('BrotherDocumentacaoMarketingMainApp')
  .controller('BrotherDocumentacaoMarketingController', ['$scope', '$log', '$http', '$routeParams', '$timeout', 'fluigService', '$window', 'Upload',
    function BrotherDocumentacaoMarketingController($scope, $log, $http, $routeParams, $timeout, fluigService, $window, Upload) {
      const vm = this;

      vm.Errors = [];

      vm.inicia = function inicia() {

        vm.Param = {
          guid: $routeParams.guid
        };
        if (vm.Param.guid) {
          vm.buscaSolicitacao();
        }

      };

      vm.logout = function logout() {
        $http.get('/portal/p/api/servlet/logout.do');
      }

      vm.buscaSolicitacao = function buscaSolicitacao() {

        FLUIGC.loading("body").show();

        vm.Formulario = null;

        $http.get(`/brother-api/v1/marketing/textos`).then((response) => {
          vm.Textos = response.data;
          // vm.showConfirmPage();
        }, (error) => {
          $log.log(error);
        });

        $http.get(`/brother-api/v1/marketing/search/${vm.Param.guid}`)
          .then((response) => {
            FLUIGC.loading("body").hide();
            vm.done = true;
            // vm.show = true;
            vm.Params = {};

            vm.Formulario = response.data;

            vm.setRegras();
            vm.getItens();

          }, (error) => {
            vm.done = true;
            $log.log(error);
          });
      };

      vm.showConfirmPage = function showConfirmPage() {
        var settings = {
          element: '#message-page',
          target: '#form',
          title: "Solicitação enviada",
          description: "Acesse esta página no futuro para acompanhar o status da solicitação",
          header: 'O que você deseja fazer?',
          transitionEffect: true,
          messageType: 'success',
          links: [{
            description: 'Acompanhar Status',
            bind: 'data-close-message-page',
            href: `#!/${vm.Param.guid}`
          }, {
            description: 'Encerrar',
            href: `https://www.brother.com.br/`
          }],
          actionClose: {
            label: "Voltar",
            bind: 'data-close-message-page',
            href: `#!/${vm.Param.guid}`
          }
        };

        messagePage = FLUIGC.messagePage(settings);
        messagePage.show();

        $(document).on('click', '[data-close-message-page]', function (ev) {
          messagePage.hide();
        });

      }
      vm.setRegras = function setRegras() {
        if (!vm.Formulario) {
          return;
        }

        switch (vm.Formulario.currentStepPortal) {
          case 0:
            vm.regras = {
              enableEnvioEvidencias: false, showEnvioEvidencias: false, enableND: false,
              showND: false, enablePagamento: false, showPagamento: false
            }
            break;
          case 1:
            vm.regras = {
              enableEnvioEvidencias: true, showEnvioEvidencias: true, enableND: false,
              showND: false, enablePagamento: false, showPagamento: false
            }
            break;
          case 2:
            vm.regras = {
              enableEnvioEvidencias: false, showEnvioEvidencias: true, enableND: false,
              showND: false, enablePagamento: false, showPagamento: false
            }
            break;
          case 3:
            vm.regras = {
              enableEnvioEvidencias: false, showEnvioEvidencias: true, enableND: true,
              showND: true, enablePagamento: false, showPagamento: false
            }
            break;
          case 4:
            vm.regras = {
              enableEnvioEvidencias: false, showEnvioEvidencias: true, enableND: false,
              showND: true, enablePagamento: false, showPagamento: false
            }
            break;
          case 5:
            vm.regras = {
              enableEnvioEvidencias: false, showEnvioEvidencias: true, enableND: false,
              showND: true, enablePagamento: false, showPagamento: true
            }
            break;
        }

        if (vm.Formulario.status == "CANCELADA") {
          vm.regras.enableEnvioEvidencias = false;
          vm.regras.enableND = false;
          vm.regras.enablePagamento = false;
        }

        vm.Params.edit = vm.regras.enableEnvioEvidencias || vm.regras.enableND || vm.regras.enablePagamento;
      }

      vm.salvar = function salvar(loading) {

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

        if (notUploaded) {
          return;
        }

        if (loading) FLUIGC.loading("body").show();

        vm.loading = loading;
        $http.post(`/brother-api/v1/marketing/update`, vm.Formulario, { headers: { 'guid': vm.Param.guid } })
          .then((response) => {
            console.log(response);
            if (loading) FLUIGC.loading("body").hide();
            // vm.Formulario = response.data;

            vm.setRegras();
            if (loading) {
              vm.showConfirmPage();
            }

            vm.loading = false;
          }, (error) => {
            vm.done = true;
            if (loading) FLUIGC.loading("body").hide();
            $log.log(error);

            vm.loading = false;
          });
      };

      vm.selectFiles = function selectFiles(tablename, files, item) {
        if (!vm.Formulario[tablename]) {
          vm.Formulario[tablename] = [];
        }

        console.log(vm.Formulario[tablename], files);

        files.forEach(file => {
          console.log(file);
          file.nome = file.name;
          // file.descricao = file.name;
          file.tipo = file.type;
          file.item = item || {};
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
          file.numero = "";
          file.descricao = "";
          file.filename = resp.data.filename;
          file.url = resp.data.url;
          file.description = resp.data.description;
          file.version = resp.data.version;
          file.uploaded = true;
          file.removed = false;

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

        let Errors = [];

        if (vm.regras.enableEnvioEvidencias) {
          vm.Formulario.evidencias.forEach(arquivo => {
            if (!arquivo.descricao && !arquivo.removed) {
              Errors.push(`<li>Informe a descrição no arquivo ${arquivo.nome}</li>`);
            }
          })
        }

        if (vm.regras.enableND) {
          vm.Formulario.nd.forEach(arquivo => {
            if (!arquivo.descricao && !arquivo.removed) {
              Errors.push(`<li>Informe a descrição no arquivo ${arquivo.nome}</li>`);
            }
            if (!arquivo.numero && !arquivo.removed) {
              Errors.push(`<li>Informe o número da ND no arquivo ${arquivo.nome}</li>`);
            }
          })
        }

        if (Errors.length > 0) {
          FLUIGC.toast({
            title: 'Oops.. ocorreram erros ao enviar seus dados:',
            message: `<ul>${Errors.join('')}</ul>`,
            type: 'danger'
          });
          return;
        }

        let message;
        if (vm.regras.enableEnvioEvidencias) {
          message = vm.Formulario.evidencias.filter(s => !s.removed).length > 0 ? 'Confirma o envio dos arquivos?' : 'ATENÇÃO. Não foram selecionados os arquivos de evidência. Confirma o envio da solicitação sem arquivos?';
        }
        
        if (vm.regras.enableND) {
          message = vm.Formulario.nd.filter(s => !s.removed).length > 0 ? 'Confirma o envio dos arquivos?' : 'ATENÇÃO. Não foram selecionados os arquivos de ND. Confirma o envio da solicitação sem arquivos?';
        }

        FLUIGC.message.confirm({ message: message, title: 'Enviar documentação' }, result => {
          if (result) {

            vm.Formulario.currentStepPortal++;

            if (vm.regras.enableEnvioEvidencias) {
              vm.Formulario.envioEvidenciasConcluido = true;
            }

            if (vm.regras.enableND) {
              vm.Formulario.envioNDConcluido = true;
            }

            vm.alterado = true;
            vm.setRegras();
            $scope.$apply();
            vm.salvar(true);
          }
        });
      }

      vm.getItens = () => {

        console.log('getItens', vm.Formulario)
        vm.ItensEvidencia = [];

        vm.Formulario.itensSellout.forEach((it, index) => {
          vm.ItensEvidencia.push({ tablename: 'itensSellout', index, descricao: `${it.item.codigo} - ${it.item.descricao}`, valorTotal: it.rebateTotal });
        })
        vm.Formulario.itensSellinIt.forEach((it, index) => {
          vm.ItensEvidencia.push({ tablename: 'itensSellinIt', index, descricao: `${it.item.codigo} - ${it.item.descricao}`, valorTotal: it.rebateTotal });
        })

        // vm.Formulario.itensSellinTg.forEach((it, index) => {
        //   vm.ItensEvidencia.push({ tablename: 'itensSellinTg', index, descricao: it.descricao, valorTotal: it.vlTotal });
        // })

        // vm.Formulario.itensSellinTgAc.forEach((it, index) => {
        //   vm.ItensEvidencia.push({ tablename: 'itensSellinTgAc', index, descricao: it.descricao, valorTotal: it.vlTotal });
        // })
        // vm.Formulario.itensVpcEvt.forEach((it, index) => {
        //   vm.ItensEvidencia.push({ tablename: 'itensVpcEvt', index, descricao: it.nomeEvento, valorTotal: it.vlTotal });
        // })
        // vm.Formulario.itensVpcOutros.forEach((it, index) => {
        //   vm.ItensEvidencia.push({ tablename: 'itensVpcOutros', index, descricao: `${it.tipo} - ${it.finalidade}`, valorTotal: it.vlTotal });
        // })
        vm.Formulario.itensSpiffIt.forEach((it, index) => {
          vm.ItensEvidencia.push({ tablename: 'itensSpiffIt', index, descricao: it.item.displaykey, valorTotal: it.vlTotal });
        })
        // vm.Formulario.itensSpiffTg.forEach((it, index) => {
        //   vm.ItensEvidencia.push({ tablename: 'itensSpiffTg', index, descricao: it.target, valorTotal: it.vlTotal });
        // })

        vm.ItensEvidencia.forEach(item => {
          vm.calculaTotalItemEvidencia(item)
        })

        console.log(vm.ItensEvidencia)
      }

      vm.calculaTotalItemEvidencia = item => {

        vm.Formulario[item.tablename][item.index].valEvidencia = vm.Formulario[item.tablename][item.index].valEvidencia || 0
        vm.Formulario[item.tablename][item.index].qtdEvidencia = vm.Formulario[item.tablename][item.index].qtdEvidencia || 0

        vm.Formulario[item.tablename][item.index].totEvidencia = vm.Formulario[item.tablename][item.index].valEvidencia * vm.Formulario[item.tablename][item.index].qtdEvidencia
        vm.Formulario.valorResultado = 0;
        vm.ItensEvidencia.forEach(item => {
          vm.Formulario.valorResultado += vm.Formulario[item.tablename][item.index].totEvidencia || 0
        })

        vm.alterado = true

      }

      // vm.selecionaArquivosEvidencias = (item, files) => {
      //   // vm.selectFiles(vm.Formulario.arquivosEvidencias, null, $files);

      //   vm.Formulario.evidencias = vm.Formulario.evidencias || []

      //   files.forEach(file => {
      //     file.uploading = true;
      //     file.descricao = file.name;
      //     file.nome = file.name;
      //     file.novo = true;
      //     file.item = item;

      //     vm.Formulario.evidencias.push(file);

      //     vm.upload(file);

      //     // Upload.upload({
      //     //   url: '/ecm/upload',
      //     //   data: {
      //     //     "userId": vm.Params.user || 'fluigpost2',
      //     //     "uploadWithTimeStamp": true,
      //     //     file: file
      //     //   },
      //     //   // headers: $oauth.oauth.toHeader($oauth.oauth.authorize(reqUpload, $oauth.token))
      //     // }).then(function (resp) {
      //     //   resp.data.files.forEach(uploadedFile => {
      //     //     vm.createDocument(file, uploadedFile);
      //     //   })
      //     // }, function (resp) {
      //     //   console.log('Error status: ' + resp.status);
      //     // }, function (evt) {
      //     //   file.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      //     // });
      //   });
      //   console.log(vm.Formulario.evidencias)
      // }

      vm.inicia();

    }
  ])
