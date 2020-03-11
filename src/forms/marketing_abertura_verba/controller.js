angular.module('MarketingAberturaVerbaApp', ['angular.fluig', 'ngAnimate', 'brother.services', 'brother.directives', 'ngFileUpload'])

  .controller('MarketingAberturaVerbaController', ['$scope', '$window', '$http', '$timeout', '$log', 'formService', 'brotherService', 'fluigService', 'erpService', 'Upload',
    function MarketingAberturaVerbaController($scope, $window, $http, $timeout, $log, formService, brotherService, fluigService, erpService, Upload) {
      const vm = this;
      formService.atualizaFormulario($scope, vm)
        .then(() => {
          try {
            vm.Params = { edit: true, etapa: "conferirFinanceiro", user: 'ricardo.silva', formMode: 'MOD' };
            vm.Formulario = { "rateioCategoria": [{ "categoria": { "displaykey": "1 - P&S", "codigo": 1, "descricao": "P&S" }, "perc": 0.25, "$$hashKey": "object:7" }, { "categoria": { "displaykey": "2 - S&S", "codigo": 2, "descricao": "S&S" }, "perc": 0.15, "$$hashKey": "object:8" }, { "categoria": { "displaykey": "3 - L&M", "codigo": 3, "descricao": "L&M" }, "perc": 0.6, "$$hashKey": "object:9" }, { "categoria": { "displaykey": "4 - P&H", "codigo": 4, "descricao": "P&H" }, "perc": 0, "$$hashKey": "object:10" }], "itensSellout": [{ "data": 1582029871745, "$$hashKey": "object:27", "item": { "netInicial": "1200", "displaykey": "10930 - HLL2360DW", "codigo": "10930", "gpInicial": "10", "gpSugerido": "14", "rebateTotal": "100", "categoria": "2.2-MLL HW", "dolar": "4.1", "rebateUnit": "100", "netSugerido": "1300", "descricao": "HLL2360DW" }, "srpInicial": 100, "srpSugerido": 100, "qtde": 1000, "rebateTotal": 100000 }], "itensSellinIt": [], "itensSellinTg": [], "itensSellinTgAc": [], "itensVpcEvt": [], "itensSpiffIt": [], "itensSpiffTg": [], "cliente": { "displaykey": "385 - REIS OFFICE - 00.00.000/0001-01", "codigo": "385", "nome": "REIS OFFICE", "cnpj": "00.00.000/0001-01", "canal": "DISTRIBUTOR", "executivo": "ckayama" }, "numControle": "2020.0056", "dataAbertura": 1582029841458, "status": "INÍCIO", "importado": false, "tipoAcao": { "displaykey": "sellout - SELL-OUT PROMOTIONS", "contaContabil": "03.01.01", "codigo": "sellout", "descricao": "SELL-OUT PROMOTIONS" }, "itensVpcOutros": [], "valorTotalVerba": 100000, "gpMedioSugerido": 14, "inicioAcao": 1580612399000, "terminoAcao": 1583031599000, "tipoQuantidade": "limitada", "descricaoDetalhada": "Praesent nec nisl a purus blandit viverra. Ut id nisl quis enim dignissim sagittis. Phasellus consectetuer vestibulum elit. Fusce fermentum odio nec arcu. Phasellus ullamcorper ipsum rutrum nunc.", "totalRateio": 1 };
            vm.Formulario.resumoVerbas = [
              { titulo: 'AGUARDANDO APROVAÇÃO', class: 'warning', rebateSellout: 9000, rebateSellin: 0, spiff: 300, vpc: 0, total: 9300 },
              { titulo: 'FY 2018', class: 'success', rebateSellout: 50000, rebateSellin: 0, spiff: 10000, vpc: 30000, total: 90000 },
              { titulo: 'FY 2019 - YTD', class: 'success', rebateSellout: 10000, rebateSellin: 0, spiff: 10000, vpc: 1500, total: 12500 },
              { titulo: 'PAGAMENTOS EFETUADOS - FY ATUAL (YTD)', class: 'active', rebateSellout: 55000, rebateSellin: 0, spiff: 5600, vpc: 7000, total: 67600 },
              { titulo: 'TOTAL', class: 'info', rebateSellout: 124000, rebateSellin: 0, spiff: 16900, vpc: 38500, total: 89400 },
            ]
            vm.Formulario.emailsCliente = [{}];
            vm.Formulario.valorResultado = 150000;
            vm.Formulario.valorLiberado = 150000;
            vm.Formulario.diferencaResultado = 50000;
            vm.Formulario.arquivosEvidencias = [
              { descricao: 'Notas Fiscais', nome: 'nf-vendas-brother.pdf' },
            ];
            vm.Formulario.duplicatas = [
              { seq: 1, emissao: new Date().getTime(), vencimento: new Date().getTime(), numero: 987849, parcela: 2, valorOriginal: 200000, saldo: 180000 },
              { seq: 2, emissao: new Date().getTime(), vencimento: new Date().getTime(), numero: 987849, parcela: 3, valorOriginal: 200000, saldo: 160000 },
              { seq: 3, emissao: new Date().getTime(), vencimento: new Date().getTime(), numero: 987849, parcela: 4, valorOriginal: 200000, saldo: 140000 },
            ]

            vm.inicia();
          } catch (error) {
            vm.Errors.push(error);
          }

        });

      vm.inicia = function inicia() {

        if (vm.Params.formMode == 'ADD') {

          vm.Categorias = erpService.getCategoria();
          vm.Formulario.rateioCategoria = [];
          vm.Formulario.emailsCliente = [];

          vm.Categorias.forEach(c => {
            vm.Formulario.rateioCategoria.push({ categoria: c, perc: 0 });
          })

          vm.Formulario.executivo = {};
          vm.Formulario.cliente = {};
        }

        vm.desktop = !vm.Params.mobile;

        if (!vm.Params.mobile && parent && parent.WCMAPI) {

          vm.WCMAPI = parent.WCMAPI;
          if (vm.WCMAPI.browserName != 'chrome') {
            vm.Errors.push("Favor acessar o Fluig pelo navegador Chrome");
            FLUIGC.message.error({
              message: 'Favor acessar o Fluig pelo navegador Chrome',
              title: 'Oops'
            }, (result) => {

            });
            return;
          }
        }

        vm.dataAtual = new Date().getTime();

        vm.etapas = ['consulta', 'inicio', 'validarMarketing', 'revisarSolicitacao', 'aprovarGerMarketing', 'aprovarPresidencia', 'analisarErros',
          'autorizarNotificacaoInicio', 'autorizarNotificacaoFim', 'enviarEvidencias', 'validarEvidencias', 'aprovarVerbaMaior30',
          'aprovarVerbaAte30', 'enviarND', 'validarND', 'conferirFinanceiro', 'aprovarPagamento', 'autorizarNotificacaoPagamento'];

        vm.regras = {};
        [
          { regra: 'showResumo', def: true, etapas: vm.etapas },
          { regra: 'showSolicitacao', def: true, etapas: ['inicio', 'revisarSolicitacao', 'analisarErros'] },
          { regra: 'enableSolicitacao', def: vm.Params.edit, etapas: ['inicio', 'revisarSolicitacao'] },
          { regra: 'showValidacaoMarketing', def: true, etapas: ['revisarSolicitacao', 'analisarErros', 'validarMarketing'] },
          { regra: 'enableValidacaoMarketing', def: vm.Params.edit, etapas: ['validarMarketing'] },
          { regra: 'showRateioCategoria', def: true, etapas: vm.etapas },
          { regra: 'enableRateioCategoria', def: vm.Params.edit, etapas: ['inicio'] },
          { regra: 'showResumoVerbasCliente', def: true, etapas: vm.etapas },

          { regra: 'showAprovGerMarketing', def: true, etapas: ['revisarSolicitacao', 'analisarErros', 'aprovarGerMarketing'] },
          { regra: 'enableAprovGerMarketing', def: true, etapas: ['aprovarGerMarketing'] },
          { regra: 'showAprovPresidenciaVp', def: true, etapas: ['revisarSolicitacao', 'analisarErros', 'aprovarPresidencia'] },
          { regra: 'enableAprovPresidenciaVp', def: true, etapas: ['aprovarPresidencia'] },

          { regra: 'showNotificacaoCliente', def: true, etapas: ['autorizarNotificacaoInicio', 'analisarErros', 'autorizarNotificacaoFim', 'autorizarNotificacaoPagamento'] },
          { regra: 'enableNotificacaoCliente', def: true, etapas: ['autorizarNotificacaoInicio', 'analisarErros', 'autorizarNotificacaoFim', 'autorizarNotificacaoPagamento'] },

          { regra: 'showValidacaoEvidencias', def: true, etapas: ['validarEvidencias', 'analisarErros'] },
          { regra: 'enableValidacaoEvidencias', def: true, etapas: ['validarEvidencias', 'analisarErros'] },

          { regra: 'showSelecionarDuplicatas', def: true, etapas: ['conferirFinanceiro', 'analisarErros'] },
          { regra: 'enableSelecionarDuplicatas', def: true, etapas: ['conferirFinanceiro', 'analisarErros'] },

        ].forEach(o => {
          vm.regras[o.regra] = vm.Params.user == "adminx" && vm.Params.edit ? true : o.etapas.indexOf(vm.Params.etapa) >= 0 ? o.def : false;
        });

        vm.Usuario = fluigService.getUsuarios(vm.Params.user)[0];
        vm.Formulario.numControle = '2020.0056'
        vm.PastaAnexos = fluigService.getPasta(vm.Params.companyId, 'Cadastros|Marketing|Anexos')[0];
        vm.Formulario.notificacaoEtapa = 'INÍCIO DA AÇÃO';

        switch (true) {
          case vm.Params.etapa == 'inicio':
            vm.Formulario.solicitante = vm.Usuario;
            vm.Formulario.dataAbertura = vm.dataAtual;
            vm.Formulario.status = 'INÍCIO';
            break;

          case vm.Params.etapa == 'validarMarketing':
            vm.Formulario.userValMarketing = vm.Usuario;
            vm.Formulario.dataValidacaoMarketing = vm.dataAtual;
            vm.Formulario.statusValidacaoMarketing = 'PENDENTE';
            break;

          case vm.Params.etapa == 'aprovarGerMarketing':
            vm.Formulario.userAprovGerMarketing = vm.Usuario;
            vm.Formulario.dataAprovGerMarketing = vm.dataAtual;
            vm.Formulario.statusAprovGerMarketing = 'PENDENTE';
            break;

          case vm.Params.etapa == 'aprovarPresidencia':
            vm.Formulario.userAprovPresidenciaVp = vm.Usuario;
            vm.Formulario.dataAprovPresidenciaVp = vm.dataAtual;
            vm.Formulario.statusAprovPresidenciaVp = 'PENDENTE';
            break;

          case vm.Params.etapa == 'autorizarNotificacaoInicio':
            vm.Formulario.userAutorizNotifIni = vm.Usuario;
            vm.Formulario.dataAutorizNotifIni = vm.dataAtual;
            vm.Formulario.notificacaoEtapa = 'INÍCIO DA AÇÃO';
            break;

          case vm.Params.etapa == 'autorizarNotificacaoFim':
            vm.Formulario.userAutorizNotifIni = vm.Usuario;
            vm.Formulario.dataAutorizNotifIni = vm.dataAtual;
            vm.Formulario.notificacaoEtapa = 'FIM DA AÇÃO';
            break;

          case vm.Params.etapa == 'autorizarNotificacaoPagamento':
            vm.Formulario.userAutorizNotifPagto = vm.Usuario;
            vm.Formulario.dataAutorizNotifPagto = vm.dataAtual;
            vm.Formulario.notificacaoEtapa = 'PAGAMENTO';
            break;

          case vm.Params.etapa == 'validarEvidencias':

            break;
        }

        if (vm.Params.edit) {
          vm.Formulario.importado = false;
        }
      };

      vm.changeCliente = function changeCliente() {
        vm.Formulario.executivo = {};
        if (vm.Formulario.cliente && vm.Formulario.cliente.codigo) {
          vm.Formulario.executivo = fluigService.getUsuarios(vm.Formulario.cliente.executivo)[0];
        }
      }

      vm.calculaTotalRateio = function calculaTotalRateio() {
        vm.Formulario.totalRateio = 0;
        vm.Formulario.rateioCategoria.forEach(r => { vm.Formulario.totalRateio += r.perc });
      }

      vm.changeTipoAcao = function changeTipoAcao() {
        vm.Formulario.itensSellout = [];
        vm.Formulario.itensSellinIt = [];
        vm.Formulario.itensSellinTg = [];
        vm.Formulario.itensSellinTgAc = [];
        vm.Formulario.itensVpcOutros = [];
        vm.Formulario.itensVpcEvt = [];
        vm.Formulario.itensSpiffIt = [];
        vm.Formulario.itensSpiffTg = [];
        vm.calculaTotais();

        if (vm.Formulario.tipoAcao && vm.Formulario.tipoAcao.codigo) {
          switch (vm.Formulario.tipoAcao.codigo) {
            case 'sellout':
              vm.incluiItem(vm.Formulario.itensSellout);
              break

            case 'sellin':
              if (vm.Formulario.tipoSellin == 'item') {
                vm.incluiItem(vm.Formulario.itensSellinIt);
              } else {
                vm.incluiItem(vm.Formulario.itensSellinTg);
                // vm.incluiItem(vm.Formulario.itensSellinTgAc);
              }

              break

            case 'vpc':
              if (vm.Formulario.tipoVpc == 'eventos') {
                vm.incluiItem(vm.Formulario.itensVpcEvt);
              } else {
                vm.incluiItem(vm.Formulario.itensVpcOutros);
              }

              break

            case 'spiff':
              if (vm.Formulario.tipoSpiff == 'item') {
                vm.incluiItem(vm.Formulario.itensSpiffIt);
              } else {
                vm.incluiItem(vm.Formulario.itensSpiffTg);
              }

              break
          }
        }


      }

      vm.incluiItem = function incluiItem(obj) {
        obj.push({
          data: new Date().getTime(),
          usuario: vm.Usuario
        });
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

      vm.calculaTotais = function calculaTotais() {
        vm.Formulario.valorTotalVerba = 0;
        vm.Formulario.gpMedioSugerido = 0;
        let qtdItem = 0;

        if (vm.Formulario.tipoAcao && vm.Formulario.tipoAcao.codigo) {
          switch (vm.Formulario.tipoAcao.codigo) {
            case 'sellout':
              vm.Formulario.itensSellout.forEach(it => {
                vm.Formulario.valorTotalVerba += it.rebateTotal;
                vm.Formulario.gpMedioSugerido += it.item.gpSugerido;
                qtdItem++;
              })
              vm.Formulario.gpMedioSugerido = vm.Formulario.gpMedioSugerido / qtdItem;
              break

            case 'sellin':
              if (vm.Formulario.tipoSellin == 'item') {
                vm.Formulario.itensSellinIt.forEach(it => {
                  vm.Formulario.valorTotalVerba += it.rebateTotal;
                  vm.Formulario.gpMedioSugerido += it.item.gpSugerido;
                  qtdItem++;
                })
                vm.Formulario.gpMedioSugerido = vm.Formulario.gpMedioSugerido / qtdItem;
              } else {
                vm.Formulario.itensSellinTg.forEach(it => {
                  vm.Formulario.valorTotalVerba += it.vlTotal;
                })
                vm.Formulario.itensSellinTgAc.forEach(it => {
                  vm.Formulario.valorTotalVerba += it.vlTotal;
                })
              }

              break

            case 'vpc':
              if (vm.Formulario.tipoVpc == 'eventos') {
                vm.Formulario.itensVpcEvt.forEach(it => {
                  vm.Formulario.valorTotalVerba += it.vlTotal;
                })
              } else {
                vm.Formulario.itensVpcOutros.forEach(it => {
                  vm.Formulario.valorTotalVerba += it.vlTotal;
                })
              }

              break

            case 'spiff':
              if (vm.Formulario.tipoSpiff == 'item') {
                vm.Formulario.itensSpiffIt.forEach(it => {
                  vm.Formulario.valorTotalVerba += it.vlTotal;
                })
              } else {
                vm.Formulario.itensSpiffTg.forEach(it => {
                  vm.Formulario.valorTotalVerba += it.vlTotal;
                })
              }

              break
          }
        }

      }

      vm.calculaTarget = function calculaTarget(item) {
        item.vlTotal = item.target * item.perc;
        vm.calculaTotais();
      }

      vm.excluirAnexo = function excluirAnexo(arquivo, $index) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse anexo?',
          title: 'Excluir anexo'
        }, (result) => {
          if (result) {
            let docsToDelete = [];

            docsToDelete.push({ docId: arquivo.anexo.documentId, isLink: false, parentId: vm.PastaAnexos.documentId });

            $http({
              method: 'DELETE',
              url: '/ecm/api/rest/ecm/navigation/removeDoc',
              data: {
                docsToDelete: docsToDelete,
                metadataFormsToDelete: []
              },
              headers: {
                'Content-type': 'application/json;charset=utf-8'
              }
            })
              .then(function (response) {
                console.log(result);
                arquivo.anexo = {};
              }, function (rejection) {
                console.log(rejection.data);
              });
          }
        });
      };

      vm.upload = function upload(arquivo, file) {

        console.log(arquivo, file)
        if (!file || !arquivo) {
          return;
        }

        if (!arquivo.anexo) {
          arquivo.anexo = {};
        }

        arquivo.anexo.uploading = true;
        arquivo.anexo.descricao = file.name;

        Upload.upload({
          url: '/ecm/upload',
          data: {
            "userId": vm.Params.user,
            "uploadWithTimeStamp": true,
            file: file
          }
        }).then(function (resp) {
          console.log(resp);
          resp.data.files.forEach(uploadedFile => {
            $http.post('/api/public/2.0/documents/createDocument', {
              parentDocumentId: vm.PastaAnexos.documentId,
              documentDescription: uploadedFile.name,
              inheritSecurity: true,
              internalVisualizer: true
            })
              .then((response) => {
                console.log(response);
                arquivo.anexo.documentId = response.data.content.documentId;
                $http.get('/api/public/2.0/documents/getDownloadURL/' + response.data.content.documentId)
                  .then((url) => {
                    console.log(url);
                    arquivo.anexo.url = url.data.content;
                    delete arquivo.anexo.uploading;
                    delete arquivo.anexo.progressPercentage;
                  }, (error) => {
                    console.log(error);
                  });
              }, (error) => {
                console.log(error);
              });
          })
        }, function (resp) {
          console.log('Error status: ' + resp.status);
        }, function (evt) {
          arquivo.anexo.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        });

      }

      vm.openRegModal = function openRegModal(reg) {

        FLUIGC.modal({
          title: '',
          content: `<iframe style="height:${window.innerHeight - 120}px;width:100%;border:0;top:0;left:0" src="/webdesk/streamcontrol//${reg.documentid}/${reg.version}/?edit=false"></iframe>`,
          size: 'large',
          id: 'fluig-modal',
          actions: [{
            'label': 'OK',
            'autoClose': true
          }]
        }, function (err, data) {
          if (err) {
            // do error handling
          } else {
            // do something with data
          }
        });
      }

    }
  ]);
