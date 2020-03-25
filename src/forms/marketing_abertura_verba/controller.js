angular.module('MarketingAberturaVerbaApp', ['angular.fluig', 'ngAnimate', 'brother.services', 'brother.directives', 'ngFileUpload'])

  .controller('MarketingAberturaVerbaController', ['$scope', '$window', '$http', '$compile', '$timeout', '$log', 'formService', 'brotherService', 'fluigService', 'erpService', 'Upload',
    function MarketingAberturaVerbaController($scope, $window, $http, $compile, $timeout, $log, formService, brotherService, fluigService, erpService, Upload) {
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

            vm.loading = FLUIGC.loading('.collapse');

            vm.checkLocal();

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

            vm.inicia();
          } catch (error) {
            vm.Errors.push(error);
          }

        });

      vm.checkLocal = function checkLocal() {
        if (window.location.hostname == 'localhost') {
          vm.Params = {
            edit: true,
            etapa: "inicio",
            user: 'ckayama',
            formMode: 'ADD'
          };

          if (vm.Params.formMode != 'ADD') {
            vm.Formulario = { "rateioCategoria": [{ "categoria": { "displaykey": "1 - P&S", "codigo": 1, "descricao": "P&S" }, "perc": 0.25, "$$hashKey": "object:7" }, { "categoria": { "displaykey": "2 - S&S", "codigo": 2, "descricao": "S&S" }, "perc": 0.15, "$$hashKey": "object:8" }, { "categoria": { "displaykey": "3 - L&M", "codigo": 3, "descricao": "L&M" }, "perc": 0.6, "$$hashKey": "object:9" }, { "categoria": { "displaykey": "4 - P&H", "codigo": 4, "descricao": "P&H" }, "perc": 0, "$$hashKey": "object:10" }], "itensSellout": [{ "data": 1582029871745, "$$hashKey": "object:27", "item": { "netInicial": "1200", "displaykey": "10930 - HLL2360DW", "codigo": "10930", "gpInicial": "10", "gpSugerido": "14", "rebateTotal": "100", "categoria": "2.2-MLL HW", "dolar": "4.1", "rebateUnit": "100", "netSugerido": "1300", "descricao": "HLL2360DW" }, "srpInicial": 100, "srpSugerido": 100, "qtde": 1000, "rebateTotal": 100000 }], "itensSellinIt": [], "itensSellinTg": [], "itensSellinTgAc": [], "itensVpcEvt": [], "itensSpiffIt": [], "itensSpiffTg": [], "cliente": { "displaykey": "385 - REIS OFFICE - 00.00.000/0001-01", "codigo": "385", "nome": "REIS OFFICE", "cnpj": "00.00.000/0001-01", "canal": "DISTRIBUTOR", "executivo": "ckayama" }, "numControle": "2020.0056", "dataAbertura": 1582029841458, "status": "INÍCIO", "importado": false, "tipoAcao": { "displaykey": "sellout - SELL-OUT PROMOTIONS", "contaContabil": "03.01.01", "codigo": "sellout", "descricao": "SELL-OUT PROMOTIONS" }, "itensVpcOutros": [], "valorTotalVerba": 100000, "gpMedioSugerido": 14, "inicioAcao": 1580612399000, "terminoAcao": 1583031599000, "tipoQuantidade": "limitada", "descricaoDetalhada": "Praesent nec nisl a purus blandit viverra. Ut id nisl quis enim dignissim sagittis. Phasellus consectetuer vestibulum elit. Fusce fermentum odio nec arcu. Phasellus ullamcorper ipsum rutrum nunc.", "totalRateio": 1 };

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

            vm.Formulario.valorResultado = 150000;
            vm.Formulario.valorLiberado = 150000;
            vm.Formulario.diferencaResultado = 50000;
            vm.Formulario.valorTotalVerba = 100000;
            vm.Formulario.gpMedioSugerido = 10000;

          }

          // vm.Formulario.emailsCliente = [{}];

        }
      }
      vm.inicia = function inicia() {

        vm.desktop = !vm.Params.mobile;
        vm.dataAtual = new Date().getTime();

        vm.checkRegras();

        if (vm.Params.formMode == 'ADD') {

          vm.Formulario.userAprovGerMarketing = {};
          vm.Formulario.userAprovPresidenciaVp = {};
          vm.Formulario.userValMarketing = {};
          vm.Formulario.executivo = {};
          vm.Formulario.cliente = {};
          vm.Formulario.necAprovacaoGerMkt = true;

          erpService.getCategoria().then(categorias => {
            categorias.forEach(c => {
              vm.Formulario.rateioCategoria.push({ categoria: c, perc: 0 });
            })
          })
        }

        fluigService.getUsuarios(vm.Params.user).then(resp => {
          vm.Usuario = resp[0];
          vm.checkEtapa();
        });

        fluigService.getPasta(vm.Params.companyId, 'Cadastros|Marketing|Anexos').then(pasta => {
          vm.PastaAnexos = pasta[0];
        });

        vm.Formulario.numControle = '2020.0056'

        if (vm.Params.edit) {
          vm.Formulario.importado = false;
        }
      };

      vm.checkRegras = function checkRegras() {
        vm.etapas = ['consulta', 'inicio', 'validarMarketing', 'revisarSolicitacao', 'aprovarGerMarketing', 'aprovarPresidencia', 'analisarErros',
          'autorizarNotificacaoInicio', 'aguardandoFimDaAcao', 'autorizarNotificacaoFim', 'enviarEvidencias', 'validarEvidencias', 'aprovarVerbaMaior',
          'aprovarVerbaMenor', 'enviarND', 'validarND', 'conferirFinanceiro', 'aprovarPagamento', 'atualizarStatus', 'autorizarNotificacaoPagamento'];

        vm.regras = {};
        [
          { regra: 'showResumo', def: true, etapas: vm.etapas },
          { regra: 'showSolicitacao', def: true, etapas: ['inicio', 'consulta', 'revisarSolicitacao', 'analisarErros'] },
          { regra: 'enableSolicitacao', def: vm.Params.edit, etapas: ['inicio', 'revisarSolicitacao'] },
          { regra: 'showValidacaoMarketing', def: true, etapas: ['consulta', 'revisarSolicitacao', 'aprovarGerMarketing', 'analisarErros', 'validarMarketing', 'aprovarPresidencia'] },
          { regra: 'enableValidacaoMarketing', def: vm.Params.edit, etapas: ['validarMarketing'] },
          { regra: 'showRateioCategoria', def: true, etapas: vm.etapas },
          { regra: 'enableRateioCategoria', def: vm.Params.edit, etapas: ['inicio'] },
          { regra: 'showResumoVerbasCliente', def: true, etapas: vm.etapas },

          { regra: 'showAprovGerMarketing', def: true, etapas: ['consulta', 'revisarSolicitacao', 'analisarErros', 'aprovarGerMarketing', 'validarMarketing', 'aprovarPresidencia'] },
          { regra: 'enableAprovGerMarketing', def: true, etapas: ['aprovarGerMarketing'] },
          { regra: 'showAprovPresidenciaVp', def: true, etapas: ['consulta', 'revisarSolicitacao', 'analisarErros', 'aprovarPresidencia', 'aprovarGerMarketing', 'validarMarketing'] },
          { regra: 'enableAprovPresidenciaVp', def: true, etapas: ['aprovarPresidencia'] },

          { regra: 'showAprovVerbaMaior', def: true, etapas: ['consulta', 'aprovarVerbaMaior', 'aprovarGerMarketing', 'validarEvidencias', 'analisarErros'] },
          { regra: 'enableAprovVerbaMaior', def: true, etapas: ['aprovarVerbaMaior'] },

          { regra: 'showAprovVerbaMenor', def: true, etapas: ['consulta', 'aprovarVerbaMenor', 'aprovarGerMarketing', 'validarEvidencias', 'analisarErros'] },
          { regra: 'enableAprovVerbaMenor', def: true, etapas: ['aprovarVerbaMenor'] },

          { regra: 'showNotificacaoCliente', def: true, etapas: ['consulta', 'autorizarNotificacaoInicio', 'analisarErros', 'autorizarNotificacaoFim', 'autorizarNotificacaoPagamento'] },
          { regra: 'enableNotificacaoCliente', def: true, etapas: ['autorizarNotificacaoInicio', 'analisarErros', 'autorizarNotificacaoFim', 'autorizarNotificacaoPagamento'] },

          { regra: 'showEvidencias', def: true, etapas: ['consulta', 'enviarEvidencias', 'validarND', 'aprovarVerbaMaior', 'aprovarVerbaMenor', 'validarEvidencias', 'aprovarPagamento', 'analisarErros', 'conferirFinanceiro'] },
          { regra: 'enableEvidencias', def: true, etapas: ['enviarEvidencias', 'analisarErros'] },
          { regra: 'enableValidacaoEvidencias', def: true, etapas: ['validarEvidencias', 'analisarErros'] },

          { regra: 'showND', def: true, etapas: ['consulta', 'enviarND', 'validarND', 'analisarErros', 'conferirFinanceiro', 'aprovarPagamento'] },
          { regra: 'enableND', def: true, etapas: ['enviarND', 'analisarErros'] },
          { regra: 'enableValidacaoND', def: true, etapas: ['validarND', 'analisarErros'] },

          { regra: 'showSelecionarDuplicatas', def: true, etapas: ['consulta', 'conferirFinanceiro', 'aprovarPagamento', 'analisarErros'] },
          { regra: 'enableSelecionarDuplicatas', def: true, etapas: ['conferirFinanceiro', 'analisarErros'] },

          { regra: 'showAprovPagamento', def: true, etapas: ['consulta', 'aprovarPagamento', 'conferirFinanceiro', 'analisarErros'] },
          { regra: 'enableAprovPagamento', def: true, etapas: ['aprovarPagamento'] },


        ].forEach(o => {
          vm.regras[o.regra] = vm.Params.user == "adminx" && vm.Params.edit ? true : o.etapas.indexOf(vm.Params.etapa) >= 0 ? o.def : false;
        });
      }

      vm.checkEtapa = function checkEtapa() {
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

          case vm.Params.etapa == 'aprovarVerbaMaior':
            vm.Formulario.userAprovVerbaMaior = vm.Usuario;
            vm.Formulario.dataAprovVerbaMaior = vm.dataAtual;
            vm.Formulario.statusAprovVerbaMaior = 'PENDENTE';
            break;

          case vm.Params.etapa == 'aprovarVerbaMenor':
            vm.Formulario.userAprovVerbaMenor = vm.Usuario;
            vm.Formulario.dataAprovVerbaMenor = vm.dataAtual;
            vm.Formulario.statusAprovVerbaMenor = 'PENDENTE';
            break;

          case vm.Params.etapa == 'autorizarNotificacaoPagamento':
            vm.Formulario.userAutorizNotifPagto = vm.Usuario;
            vm.Formulario.dataAutorizNotifPagto = vm.dataAtual;
            vm.Formulario.notificacaoEtapa = 'PAGAMENTO';
            break;

          case vm.Params.etapa == 'validarEvidencias' || vm.Params.etapa == 'enviarEvidencias':
            vm.Formulario.userValidacaoEvid = vm.Usuario;
            vm.Formulario.dataValidacaoEvid = vm.dataAtual;
            vm.Formulario.statusValidacaoEvid = 'PENDENTE';
            break;

          case vm.Params.etapa == 'validarND' || vm.Params.etapa == 'enviarND':
            vm.Formulario.userValidacaoND = vm.Usuario;
            vm.Formulario.dataValidacaoND = vm.dataAtual;
            vm.Formulario.statusValidacaoND = 'PENDENTE';
            break;

          case vm.Params.etapa == 'aprovarPagamento':
            vm.Formulario.userAprovPagamento = vm.Usuario;
            vm.Formulario.dataAprovPagamento = vm.dataAtual;
            vm.Formulario.statusAprovPagamento = 'PENDENTE';
            break;

          case vm.Params.etapa == 'conferirFinanceiro':
            vm.Formulario.totalLiberado = vm.Formulario.valorResultado;
            vm.Formulario.userFinanceiro = vm.Usuario;
            vm.Formulario.dataFinanceiro = vm.dataAtual;
            vm.Formulario.statusFinanceiro = 'PENDENTE';
            vm.buscaDuplicatas();
            vm.calculaTotalDuplicatas();
            break;
        }
      }

      vm.changeCliente = function changeCliente() {
        vm.Formulario.executivo = {};
        if (vm.Formulario.cliente && vm.Formulario.cliente.codigo) {
          vm.Formulario.executivo = fluigService.getUsuarios(vm.Formulario.cliente.executivo)[0];
        }
      }

      vm.buscaResumoVerbas = function buscaResumoVerbas() {
        // erpService.getResumoVerbas(vm.Formulario.cliente.codigo);
        vm.Formulario.resumoVerbas = [
          { titulo: 'AGUARDANDO APROVAÇÃO', class: 'warning', rebateSellout: 9000, rebateSellin: 0, spiff: 300, vpc: 0, total: 9300 },
          { titulo: 'FY 2018', class: 'success', rebateSellout: 50000, rebateSellin: 0, spiff: 10000, vpc: 30000, total: 90000 },
          { titulo: 'FY 2019 - YTD', class: 'success', rebateSellout: 10000, rebateSellin: 0, spiff: 10000, vpc: 1500, total: 12500 },
          { titulo: 'PAGAMENTOS EFETUADOS - FY ATUAL (YTD)', class: 'active', rebateSellout: 55000, rebateSellin: 0, spiff: 5600, vpc: 7000, total: 67600 },
          { titulo: 'TOTAL', class: 'info', rebateSellout: 124000, rebateSellin: 0, spiff: 16900, vpc: 38500, total: 89400 },
        ]
      }
      vm.changeItemSellout = function changeItemSellout(item, index) {
        vm.calculaItemErp(item);
      }

      vm.calculaItemErp = function (item) {
        if (item.item) {
          if (item.srpInicial && item.srpSugerido) {
            // let valores = erpService.calculaItemErp(item.item.codigo, item.srpInicial, item.srpSugerido)[0];

            vm.loading.show();

            erpService.calculaItemErp(item.item.codigo, vm.Formulario.cliente.codigo, item.srpInicial, item.srpSugerido).then(result => {

              // })

              // $http.get(`/api/public/ecm/dataset/search?datasetId=totvs_calcula_item&filterFields=codCliente,${vm.Formulario.cliente.codigo},codItem,${item.item.codigo},srpInicial,${item.srpInicial},srpSugerido,${item.srpSugerido}`)
              // .then((result) => {

              vm.loading.hide();

              console.log(result);
              // console.log(valores);

              let valores = fluigService.fixDataset(result);

              item.netInicial = valores[0].netInicial;
              item.netSugerido = valores[0].netSugerido;
              item.gpInicial = valores[0].gpInicial;
              item.gpSugerido = valores[0].gpSugerido;
              item.dolar = valores[0].dolar;
              item.rebateUnit = item.netSugerido - item.netInicial;

              vm.calculaRebateTotal(item);
            }, (error) => {
              loading.hide();
            })
          }
        } else {
          item.netInicial = 0;
          item.netSugerido = 0;
          item.gpInicial = 0;
          item.gpSugerido = 0;
          item.rebateUnit = 0;

          vm.calculaRebateTotal(item);
        }
      }

      vm.calculaRebateTotal = function calculaRebateTotal(item) {
        item.rebateTotal = item.rebateUnit * item.qtde;
        vm.calculaTotais();
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

      vm.calculaTotalDuplicatas = function calculaTotalDuplicatas() {
        let total = 0;
        vm.Formulario.duplicatas.forEach(d => {
          total += d.valorAntecipa || 0;
        });
        vm.Formulario.difValorLiberado = vm.Formulario.totalLiberado - total;
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

      vm.buscaDuplicatas = function buscaDuplicatas() {
        erpService.getTitulosCliente(vm.Formulario.cliente.codigo).then(duplicatas => {
          vm.Formulario.duplicatas = duplicatas;
        })
      }

      vm.calculaTotais = function calculaTotais() {
        vm.Formulario.valorTotalVerba = 0;
        vm.Formulario.gpMedioSugerido = 0;
        let qtdItem = 0;

        if (vm.Formulario.tipoAcao && vm.Formulario.tipoAcao.codigo) {
          switch (vm.Formulario.tipoAcao.codigo) {
            case 'sellout':
              vm.Formulario.itensSellout.forEach(it => {
                vm.Formulario.valorTotalVerba += it.rebateTotal;
                vm.Formulario.gpMedioSugerido += it.gpSugerido;
                qtdItem++;
              })
              vm.Formulario.gpMedioSugerido = vm.Formulario.gpMedioSugerido / qtdItem;
              break

            case 'sellin':
              if (vm.Formulario.tipoSellin == 'item') {
                vm.Formulario.itensSellinIt.forEach(it => {
                  vm.Formulario.valorTotalVerba += it.rebateTotal;
                  vm.Formulario.gpMedioSugerido += it.gpSugerido;
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

      vm.uploadFiles = function uploadFiles(files) {
        if (files && files.length) {
          for (var i = 0; i < files.length; i++) {
            vm.upload(files[i]);
          }
        }
      };

      vm.removeFile = function removeFile(doc, index) {
        FLUIGC.message.confirm({ message: 'Deseja excluir esse arquivo?', title: 'Excluir arquivo' }, result => {
          if (result) {

            $oauth.post('/api/public/ecm/document/remove', {
              id: doc.doc_arquivos[index].id
            }).then((response) => {
              doc.doc_arquivos.splice(index, 1);
              // $scope.$apply();  
            });
          }
        });
      };

      vm.selectFiles = function selectFiles(array, object, files) {

        files.forEach(file => {
          file.uploading = true;
          file.descricao = file.name;
          file.nome = file.name;
          file.novo = true;

          if (array) {
            array.push(file);
          }
          if (object) {
            vm.Formulario[object] = file;
          }

          Upload.upload({
            url: '/ecm/upload',
            data: {
              "userId": vm.Params.user || 'fluigpost2',
              "uploadWithTimeStamp": true,
              file: file
            },
            // headers: $oauth.oauth.toHeader($oauth.oauth.authorize(reqUpload, $oauth.token))
          }).then(function (resp) {
            resp.data.files.forEach(uploadedFile => {
              vm.createDocument(file, uploadedFile);
            })
          }, function (resp) {
            console.log('Error status: ' + resp.status);
          }, function (evt) {
            file.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          });
        });
      };

      vm.createDocument = function createDocument(file, uploadedFile) {
        $http.post('/api/public/2.0/documents/createDocument', {
          parentDocumentId: vm.PastaAnexos.documentId,
          documentDescription: uploadedFile.name,
          inheritSecurity: true,
          internalVisualizer: true
        })
          .then((response) => {
            console.log(response)
            file.documentid = response.data.content.documentId;
            file.version = response.data.content.version;
            $http.get('/api/public/2.0/documents/getDownloadURL/' + response.data.content.documentId)
              .then((url) => {
                console.log(url)
                file.url = url.data.content;
                delete file.uploading;
                delete file.progressPercentage;
              }, (error) => {
                console.log(error);
              });
          }, (error) => {
            console.log(error);
          });
      }

      vm.updateArquivoContrato = function updateArquivoContrato(arquivo, files) {
        let file = files[0];

        arquivo.uploading = true;
        Upload.upload({
          url: '/ecm/upload',
          data: {
            "userId": parent.WCMAPI.userCode,
            "uploadWithTimeStamp": true,
            file: file
          },
          // headers: $oauth.oauth.toHeader($oauth.oauth.authorize(reqUpload, $oauth.token))
        }).then(function (resp) {
          resp.data.files.forEach(uploadedFile => {
            vm.updateFile(arquivo, uploadedFile);
          })
        }, function (resp) {
          console.log('Error status: ' + resp.status);
        }, function (evt) {
          arquivo.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        });
      }

      vm.updateFile = function updateFile(file, uploadedFile) {
        console.log(file, uploadedFile);
        $http.post('/api/public/ecm/document/updateFile', {
          comments: "",
          fileName: uploadedFile.name,
          id: file.arquivo_documentId,
          version: file.arquivo_version,
          versionAction: "KEEP_VERSION",
        }).then((response) => {
          console.log(response)
          file.arquivo_version = response.data.content.version;
          $http.get('/api/public/2.0/documents/getDownloadURL/' + file.arquivo_documentId)
            .then((url) => {
              file.url = url.content;
              delete file.uploading;
              delete file.progressPercentage;
            }, (error) => {
              console.log(error);
            });
        }, (error) => {
          console.log(error);
        });
      }

      vm.guid = function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return `${s4() + s4()}$${s4()}$${s4()}$${
          s4()}$${s4()}${s4()}${s4()}`;
      }

    }
  ]);
