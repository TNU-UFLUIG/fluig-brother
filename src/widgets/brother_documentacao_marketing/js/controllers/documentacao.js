angular
  .module('BrotherDocumentacaoMarketingMainApp')
  .controller('BrotherDocumentacaoMarketingController', ['$scope', '$log', '$http', '$routeParams', '$timeout', 'fluigService', '$window', 'Upload',
    function BrotherDocumentacaoMarketingController($scope, $log, $http, $routeParams, $timeout, fluigService, $window, Upload) {
      const vm = this;

      vm.Errors = [];

      vm.inicia = () => {
        vm.Param = {
          guid: $routeParams.guid
        };
        if (vm.Param.guid) {
          vm.buscaSolicitacao();
        }
      };

      vm.logout = () => {
        $http.get('/portal/p/api/servlet/logout.do');
      };

      vm.buscaSolicitacao = function buscaSolicitacao() {
        FLUIGC.loading('body').show();

        vm.Formulario = null;

        $http.get('/brother-api/v1/marketing/textos').then((response) => {
          vm.Textos = response.data;
          // vm.showConfirmPage();
        }, (error) => {
          $log.log(error);
        });

        $http.get(`/brother-api/v1/marketing/search/${vm.Param.guid}`)
          .then((response) => {
            FLUIGC.loading('body').hide();
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
        const settings = {
          element: '#message-page',
          target: '#form',
          title: 'Solicitação enviada',
          description: 'Acesse esta página no futuro para acompanhar o status da solicitação',
          header: 'O que você deseja fazer?',
          transitionEffect: true,
          messageType: 'success',
          links: [{
            description: 'Acompanhar Status',
            bind: 'data-close-message-page',
            href: `#!/${vm.Param.guid}`
          }, {
            description: 'Encerrar',
            href: 'https://www.brother.com.br/'
          }],
          actionClose: {
            label: 'Voltar',
            bind: 'data-close-message-page',
            href: `#!/${vm.Param.guid}`
          }
        };

        const messagePage = FLUIGC.messagePage(settings);
        messagePage.show();

        $(document).on('click', '[data-close-message-page]', () => {
          messagePage.hide();
        });
      };

      vm.setRegras = function setRegras() {
        if (!vm.Formulario) {
          return;
        }

        switch (vm.Formulario.currentStepPortal) {
          case 0:
            vm.regras = {
              enableEnvioEvidencias: false,
              showEnvioEvidencias: false,
              enableND: false,
              showND: false,
              enablePagamento: false,
              showPagamento: false
            };
            break;
          case 1:
            vm.regras = {
              enableEnvioEvidencias: true,
              showEnvioEvidencias: true,
              enableND: false,
              showND: false,
              enablePagamento: false,
              showPagamento: false
            };
            break;
          case 2:
            vm.regras = {
              enableEnvioEvidencias: false,
              showEnvioEvidencias: true,
              enableND: false,
              showND: false,
              enablePagamento: false,
              showPagamento: false
            };
            break;
          case 3:
            vm.regras = {
              enableEnvioEvidencias: false,
              showEnvioEvidencias: true,
              enableND: true,
              showND: true,
              enablePagamento: false,
              showPagamento: false
            };
            break;
          case 4:
            vm.regras = {
              enableEnvioEvidencias: false,
              showEnvioEvidencias: true,
              enableND: false,
              showND: true,
              enablePagamento: false,
              showPagamento: false
            };
            break;
          case 5:
            vm.regras = {
              enableEnvioEvidencias: false,
              showEnvioEvidencias: true,
              enableND: false,
              showND: true,
              enablePagamento: false,
              showPagamento: true
            };
            break;
          default:
            break;
        }

        if (vm.Formulario.status === 'CANCELADA') {
          vm.regras.enableEnvioEvidencias = false;
          vm.regras.enableND = false;
          vm.regras.enablePagamento = false;
        }

        vm.Params.edit = vm.regras.enableEnvioEvidencias || vm.regras.enableND || vm.regras.enablePagamento;
      };

      vm.salvar = function salvar(loading) {
        if (!vm.alterado) {
          return;
        }

        vm.alterado = false;

        let notUploaded = false;
        vm.Formulario.evidencias.forEach((arquivo) => {
          if (!arquivo.url) {
            notUploaded = true;
          }
        });

        if (notUploaded) {
          return;
        }

        if (loading) FLUIGC.loading('body').show();

        vm.loading = loading;
        $http.post('/brother-api/v1/marketing/update', vm.Formulario, { headers: { guid: vm.Param.guid } })
          .then(() => {
            if (loading) FLUIGC.loading('body').hide();

            vm.setRegras();
            if (loading) {
              vm.showConfirmPage();
            }

            vm.loading = false;
          }, (error) => {
            vm.done = true;
            if (loading) FLUIGC.loading('body').hide();
            $log.log(error);

            vm.loading = false;
          });
      };

      vm.selectFiles = function selectFiles(tablename, files, item) {
        if (!vm.Formulario[tablename]) {
          vm.Formulario[tablename] = [];
        }

        files.forEach((file) => {
          file.nome = file.name;
          // file.descricao = file.name;
          file.tipo = file.type;
          file.item = item || {};
          vm.Formulario[tablename].push(file);
          vm.upload(file);
        });
      };

      vm.upload = function upload(file) {
        Upload.upload({
          url: '/brother-api/v1/file/upload',
          data: {
            file,
            parentDocumentId: vm.Formulario.folderAttach
          }
        }).then((resp) => {
          file.documentid = resp.data.documentid;
          file.numero = '';
          file.descricao = '';
          file.nome = resp.data.filename;
          file.filename = resp.data.filename;
          file.url = resp.data.url;
          file.description = resp.data.description;
          file.version = resp.data.version;
          file.uploaded = true;
          file.removed = false;

          $log.log(file);

          vm.alterado = true;
          vm.salvar();
        }, (resp) => {
          $log.log(`Error status: ${resp.status}`);
        }, (evt) => {
          file.progressPercentage = parseInt((100.0 * evt.loaded) / evt.total, 10);
        });
      };

      vm.removeArquivo = function removeArquivo(arquivo) {
        FLUIGC.message.confirm({ message: 'Deseja excluir esse arquivo?', title: 'Excluir arquivo' }, (result) => {
          if (result) {
            arquivo.removed = true;
            vm.alterado = true;
            $scope.$apply();
            vm.salvar();
          }
        });
      };

      vm.enviar = function enviar() {
        const Errors = [];

        if (vm.regras.enableEnvioEvidencias) {
          vm.Formulario.evidencias.forEach((arquivo) => {
            if (!arquivo.descricao && !arquivo.removed) {
              Errors.push(`<li>Informe a descrição no arquivo ${arquivo.nome}</li>`);
            }
          });

          vm.ItensEvidencia.forEach((item) => {
            if (vm.Formulario[item.tablename][item.index].valEvidencia === 0) {
              Errors.push(`<li>Informe o valor no item ${item.descricao}</li>`);
            }
            // if (vm.Formulario[item.tablename][item.index].qtdEvidencia === 0) {
            //   Errors.push(`<li>Informe a quantidade no item ${item.descricao}</li>`);
            // }

            vm.calculaTotalItemEvidencia(item);
          });
        }

        if (vm.regras.enableND) {
          vm.Formulario.nd.forEach((arquivo) => {
            if (!arquivo.removed) {
              if (!arquivo.descricao) {
                Errors.push(`<li>Informe a descrição no arquivo ${arquivo.nome}</li>`);
              }
              if (!arquivo.numero) {
                Errors.push(`<li>Informe o número da ND no arquivo ${arquivo.nome}</li>`);
              }
              if (!isNaN(Number(arquivo.numero)) && Number(arquivo.numero) === 0) {
                Errors.push(`<li>Número da ND no arquivo ${arquivo.nome} deve ser diferente de 0</li>`);
              }
            }
          });
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

        FLUIGC.message.confirm({ message, title: 'Enviar documentação' }, (result) => {
          if (result) {
            vm.Formulario.currentStepPortal += 1;

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
      };

      vm.getItens = () => {
        vm.ItensEvidencia = [];

        if (vm.Formulario.tipoSellout !== 'target') {
          vm.Formulario.itensSellout.forEach((it, index) => {
            if (!it.valEvidencia || it.valEvidencia === 0) it.valEvidencia = it.rebateUnit;
            vm.ItensEvidencia.push({ tablename: 'itensSellout', index, descricao: `${it.item.codigo} - ${it.item.descricao}`, valorTotal: it.rebateTotal });
          });
        }
        vm.Formulario.itensSellinIt.forEach((it, index) => {
          if (!it.valEvidencia || it.valEvidencia === 0) it.valEvidencia = it.rebateUnit;
          vm.ItensEvidencia.push({ tablename: 'itensSellinIt', index, descricao: `${it.item.codigo} - ${it.item.descricao}`, valorTotal: it.rebateTotal });
        });
        vm.Formulario.itensSpiffIt.forEach((it, index) => {
          if (!it.valEvidencia || it.valEvidencia === 0) it.valEvidencia = it.valorUnit;
          vm.ItensEvidencia.push({ tablename: 'itensSpiffIt', index, descricao: `${it.item.codigo} - ${it.item.descricao}`, valorTotal: it.valorTotal });
        });

        console.log(vm.Formulario.itensSpiffIt, vm.ItensEvidencia);

        vm.ItensEvidencia.forEach((item) => {
          // vm.Formulario[item.tablename][item.index].valEvidencia = vm.Formulario[item.tablename][item.index].valorUnit || vm.Formulario[item.tablename][item.index].rebateUnit || 0;
          // vm.Formulario[item.tablename][item.index].qtdEvidencia = vm.Formulario[item.tablename][item.index].qtde || 0;

          vm.calculaTotalItemEvidencia(item);
        });
      };

      vm.calculaTotalItemEvidencia = (item) => {
        // vm.Formulario[item.tablename][item.index].valEvidencia = vm.Formulario[item.tablename][item.index].valEvidencia || 0;
        // vm.Formulario[item.tablename][item.index].qtdEvidencia = vm.Formulario[item.tablename][item.index].qtdEvidencia || 0;

        vm.Formulario[item.tablename][item.index].totEvidencia = vm.Formulario[item.tablename][item.index].valEvidencia * vm.Formulario[item.tablename][item.index].qtdEvidencia;
        vm.Formulario.valorResultado = 0;
        vm.ItensEvidencia.forEach((itemEv) => {
          vm.Formulario.valorResultado += vm.Formulario[itemEv.tablename][itemEv.index].totEvidencia || 0;
        });

        vm.alterado = true;
      };

      vm.inicia();
    }
  ]);
