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
            etapa: "validarEvidencias",
            user: 'ckayama',
            formMode: 'MOD',
            companyId: 1
          };

          if (vm.Params.formMode != 'ADD') {
            vm.Formulario = {
              "rateioCategoria": [
                { "categoria": { "displaykey": "1 - P&S", "codigo": 1, "descricao": "P&S" }, "perc": 0.25, "$$hashKey": "object:7" }, { "categoria": { "displaykey": "2 - S&S", "codigo": 2, "descricao": "S&S" }, "perc": 0.15, "$$hashKey": "object:8" }, { "categoria": { "displaykey": "3 - L&M", "codigo": 3, "descricao": "L&M" }, "perc": 0.6, "$$hashKey": "object:9" }, { "categoria": { "displaykey": "4 - P&H", "codigo": 4, "descricao": "P&H" }, "perc": 0, "$$hashKey": "object:10" }],
              "itensSellout":
                [
                  {
                    $id: 1,
                    "data": 1582029871745, "$$hashKey": "object:27", "item":
                      { "netInicial": "1200", "displaykey": "10930 - HLL2360DW", "codigo": "10930", "gpInicial": "10", "gpSugerido": "14", "rebateTotal": "100", "categoria": "2.2-MLL HW", "dolar": "4.1", "rebateUnit": "100", "netSugerido": "1300", "descricao": "HLL2360DW" },
                    "srpInicial": 100, "srpSugerido": 100, "qtde": 1000, "rebateTotal": 100000
                  },
                  {
                    $id: 2,
                    "data": 1582029871745, "$$hashKey": "object:27", "item":
                      { "netInicial": "1200", "displaykey": "11000 - HLL2370DW", "codigo": "11000", "gpInicial": "5", "gpSugerido": "6", "rebateTotal": "1000", "categoria": "2.2-MLL HW", "dolar": "4.1", "rebateUnit": "1000", "netSugerido": "13000", "descricao": "HLL2370DW" },
                    "srpInicial": 100, "srpSugerido": 100, "qtde": 3000, "rebateTotal": 30000
                  }
                ],
              "itensSellinIt": [], "itensSellinTg": [], "itensSellinTgAc": [], "itensVpcEvt": [], "itensSpiffIt": [], "itensSpiffTg": [], "cliente": { "displaykey": "385 - REIS OFFICE - 00.00.000/0001-01", "codigo": "385", "nome": "REIS OFFICE", "cnpj": "00.00.000/0001-01", "canal": "DISTRIBUTOR", "executivo": "ckayama" }, "numControle": "2020.0056", "dataAbertura": 1582029841458, "status": "INÍCIO", "importado": false, "tipoAcao": { "displaykey": "sellout - SELL-OUT PROMOTIONS", "contaContabil": "03.01.01", "tipoAcaoCodigo": "sellout", "descricao": "SELL-OUT PROMOTIONS" }, "itensVpcOutros": [], "valorTotalVerba": 100000, "gpMedioSugerido": 14, "inicioAcao": 1580612399000, "terminoAcao": 1583031599000, "tipoQuantidade": "limitada", "descricaoDetalhada": "Praesent nec nisl a purus blandit viverra. Ut id nisl quis enim dignissim sagittis. Phasellus consectetuer vestibulum elit. Fusce fermentum odio nec arcu. Phasellus ullamcorper ipsum rutrum nunc.", "totalRateio": 1
            };

            vm.Formulario.valorResultado = 150000;
            // vm.Formulario.valorLiberado = 150000;
            vm.Formulario.arquivosEvidencias = [
              // { descricao: 'Notas Fiscais', nome: 'nf-vendas-brother.pdf' },
            ];
            vm.Formulario.duplicatas = [
              { seq: 1, emissao: new Date().getTime(), vencimento: new Date().getTime(), numero: 987849, parcela: 2, valorOriginal: 200000, saldo: 180000 },
              { seq: 2, emissao: new Date().getTime(), vencimento: new Date().getTime(), numero: 987849, parcela: 3, valorOriginal: 200000, saldo: 160000 },
              { seq: 3, emissao: new Date().getTime(), vencimento: new Date().getTime(), numero: 987849, parcela: 4, valorOriginal: 200000, saldo: 140000 },
            ]

            vm.Formulario.valorResultado = 150000;
            // vm.Formulario.valorLiberado = 150000;
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

          erpService.getBusinessSegment().then(categorias => {
            categorias.forEach(c => {
              vm.Formulario.rateioCategoria.push({ categoria: c, perc: 0 });
            })
          })
        }

        if (vm.Params.edit && !vm.Formulario.guid && vm.Params.formMode != 'ADD') {
          vm.Formulario.guid = vm.guid();
        }

        if (vm.Params.edit) {
          vm.Formulario.necEnvioNd = !vm.Formulario.userValidacaoEvid ? true : vm.Formulario.necEnvioNd;
        }

        fluigService.getUsuarios(vm.Params.user).then(resp => {
          vm.Usuario = resp[0];
          vm.checkEtapa();
        });

        fluigService.getPasta(vm.Params.companyId, 'Cadastros|Marketing|Anexos').then(pasta => {
          vm.PastaAnexos = pasta[0];
        });

        brotherService.getMarketingParametros().then(resp => {
          vm.MarketingParametros = resp[0];
        });

        // vm.Formulario.numControle = '2020.0056'

        if (vm.Params.edit) {
          vm.Formulario.importado = false;
        }

        vm.getItens()
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

          { regra: 'showObsInternas', def: true, etapas: vm.etapas },
          { regra: 'enableObsInternas', def: vm.Params.edit, etapas: vm.etapas },

          { regra: 'showEncerramentoAntecipado', def: true, etapas: ['aguardandoFimDaAcao'] },
          { regra: 'enableEncerramentoAntecipado', def: vm.Params.edit, etapas: ['aguardandoFimDaAcao'] },

          { regra: 'showValidacaoMarketing', def: true, etapas: ['consulta', 'revisarSolicitacao', 'aprovarGerMarketing', 'analisarErros', 'validarMarketing', 'aprovarPresidencia'] },
          { regra: 'enableValidacaoMarketing', def: vm.Params.edit, etapas: ['validarMarketing'] },
          { regra: 'showRateioCategoria', def: true, etapas: vm.etapas },
          { regra: 'showResumoVerbasCliente', def: true, etapas: vm.etapas },

          { regra: 'showAprovGerMarketing', def: true, etapas: ['consulta', 'revisarSolicitacao', 'analisarErros', 'aprovarGerMarketing', 'validarMarketing', 'aprovarPresidencia'] },
          { regra: 'enableAprovGerMarketing', def: true, etapas: ['aprovarGerMarketing'] },
          { regra: 'showAprovPresidenciaVp', def: true, etapas: ['consulta', 'revisarSolicitacao', 'analisarErros', 'aprovarPresidencia', 'aprovarGerMarketing', 'validarMarketing'] },
          { regra: 'enableAprovPresidenciaVp', def: true, etapas: ['aprovarPresidencia'] },

          { regra: 'showAprovVerbaMaior', def: true, etapas: ['consulta', 'aprovarVerbaMaior', 'aprovarGerMarketing', 'validarEvidencias', 'analisarErros'] },
          { regra: 'enableAprovVerbaMaior', def: true, etapas: ['aprovarVerbaMaior'] },

          { regra: 'showAprovVerbaMenor', def: true, etapas: ['consulta', 'aprovarVerbaMenor', 'aprovarGerMarketing', 'validarEvidencias', 'analisarErros'] },
          { regra: 'enableAprovVerbaMenor', def: true, etapas: ['aprovarVerbaMenor'] },

          { regra: 'showNotificacaoCliente', def: true, etapas: ['consulta', 'autorizarNotificacaoInicio', 'analisarErros', 'autorizarNotificacaoFim', 'autorizarNotificacaoPagamento', 'validarEvidencias', 'validarND'] },
          { regra: 'enableNotificacaoCliente', def: true, etapas: ['autorizarNotificacaoInicio', 'analisarErros', 'autorizarNotificacaoFim', 'autorizarNotificacaoPagamento', 'validarEvidencias', 'validarND'] },

          { regra: 'showEvidencias', def: true, etapas: ['consulta', 'enviarEvidencias', 'validarND', 'aprovarVerbaMaior', 'aprovarVerbaMenor', 'validarEvidencias', 'aprovarPagamento', 'analisarErros', 'conferirFinanceiro'] },
          { regra: 'enableEvidencias', def: true, etapas: ['enviarEvidencias', 'analisarErros'] },
          { regra: 'enableValidacaoEvidencias', def: true, etapas: ['validarEvidencias', 'analisarErros'] },

          { regra: 'showND', def: true, etapas: ['consulta', 'enviarND', 'validarND', 'analisarErros', 'conferirFinanceiro', 'validarEvidencias', 'aprovarPagamento'] },
          { regra: 'enableND', def: true, etapas: ['enviarND', 'analisarErros'] },
          { regra: 'enableValidacaoND', def: true, etapas: ['validarND', 'analisarErros'] },

          { regra: 'showSelecionarDuplicatas', def: true, etapas: ['consulta', 'conferirFinanceiro', 'aprovarPagamento', 'validarEvidencias', 'analisarErros', 'autorizarNotificacaoPagamento'] },
          { regra: 'enableSelecionarDuplicatas', def: true, etapas: ['conferirFinanceiro', 'analisarErros'] },

          { regra: 'showAprovPagamento', def: true, etapas: ['consulta', 'aprovarPagamento', 'conferirFinanceiro', 'validarEvidencias', 'analisarErros'] },
          { regra: 'enableAprovPagamento', def: true, etapas: ['aprovarPagamento'] },

          { regra: 'showStatusErp', def: true, etapas: vm.etapas },
          { regra: 'enableStatusErp', def: true, etapas: [] },


        ].forEach(o => {
          vm.regras[o.regra] = vm.Params.user == "adminx" && vm.Params.edit ? true : o.etapas.indexOf(vm.Params.etapa) >= 0 ? o.def : false;
        });
      }

      vm.checkEtapa = function checkEtapa() {

        switch (true) {
          case vm.Params.etapa == 'inicio':
            vm.Formulario.solicitante = vm.Usuario;
            vm.Formulario.dataAbertura = vm.dataAtual;
            // vm.Formulario.status = 'INÍCIO';
            break;

          case vm.Params.etapa == 'validarMarketing':
            vm.Formulario.userValMarketing = vm.Usuario;
            vm.Formulario.dataValidacaoMarketing = vm.dataAtual;
            vm.Formulario.statusValidacaoMarketing = 'PENDENTE';
            vm.Formulario.obsValidacaoMarketing = '';
            break;

          case vm.Params.etapa == 'aprovarGerMarketing':
            vm.Formulario.userAprovGerMarketing = vm.Usuario;
            vm.Formulario.dataAprovGerMarketing = vm.dataAtual;
            vm.Formulario.statusAprovGerMarketing = 'PENDENTE';
            vm.Formulario.obsAprovGerMarketing = '';
            vm.buscaResumoVerbas();
            break;

          case vm.Params.etapa == 'aprovarPresidencia':
            vm.Formulario.userAprovPresidenciaVp = vm.Usuario;
            vm.Formulario.dataAprovPresidenciaVp = vm.dataAtual;
            vm.Formulario.statusAprovPresidenciaVp = 'PENDENTE';
            vm.Formulario.obsAprovPresidenciaVp = '';
            vm.buscaResumoVerbas();
            break;

          case vm.Params.etapa == 'autorizarNotificacaoInicio':
            vm.Formulario.userAutorizNotifIni = vm.Usuario;
            vm.Formulario.dataAutorizNotifIni = vm.dataAtual;
            vm.Formulario.notificacaoEtapa = 'INÍCIO DA AÇÃO';
            vm.etapaNotificacao = 1;
            break;

          case vm.Params.etapa == 'aguardandoFimDaAcao':
            vm.Formulario.userEncerramentoAntecip = vm.Usuario;
            vm.Formulario.dataEncerramentoAntecip = vm.dataAtual;
            break;

          case vm.Params.etapa == 'autorizarNotificacaoFim':
            vm.Formulario.userAutorizNotifFim = vm.Usuario;
            vm.Formulario.dataAutorizNotifFim = vm.dataAtual;
            vm.Formulario.notificacaoEtapa = 'FIM DA AÇÃO';
            vm.etapaNotificacao = 2;
            break;

          case vm.Params.etapa == 'aprovarVerbaMaior':
            vm.Formulario.userAprovVerbaMaior = vm.Usuario;
            vm.Formulario.dataAprovVerbaMaior = vm.dataAtual;
            vm.Formulario.statusAprovVerbaMaior = 'PENDENTE';
            vm.Formulario.obsAprovVerbaMaior = '';
            vm.buscaResumoVerbas();
            break;

          case vm.Params.etapa == 'aprovarVerbaMenor':
            vm.Formulario.userAprovVerbaMenor = vm.Usuario;
            vm.Formulario.dataAprovVerbaMenor = vm.dataAtual;
            vm.Formulario.statusAprovVerbaMenor = 'PENDENTE';
            vm.Formulario.obsAprovVerbaMenor = '';
            vm.buscaResumoVerbas();
            break;

          case vm.Params.etapa == 'autorizarNotificacaoPagamento':
            vm.Formulario.userAutorizNotifPagto = vm.Usuario;
            vm.Formulario.dataAutorizNotifPagto = vm.dataAtual;
            vm.Formulario.notificacaoEtapa = 'PAGAMENTO';
            vm.etapaNotificacao = 5;
            break;

          case vm.Params.etapa == 'validarEvidencias' || vm.Params.etapa == 'enviarEvidencias':
            vm.Formulario.userValidacaoEvid = vm.Usuario;
            vm.Formulario.dataValidacaoEvid = vm.dataAtual;
            vm.Formulario.statusValidacaoEvid = 'PENDENTE';
            // vm.Formulario.valorLiberado = vm.Formulario.valorLiberado ? vm.Formulario.valorLiberado : vm.Formulario.valorResultado;
            vm.Formulario.obsValidacaoEvid = '';
            vm.checkEtapaNotificacao();
            break;

          case vm.Params.etapa == 'validarND' || vm.Params.etapa == 'enviarND':
            vm.Formulario.userValidacaoND = vm.Usuario;
            vm.Formulario.dataValidacaoND = vm.dataAtual;
            vm.Formulario.statusValidacaoND = 'PENDENTE';
            vm.Formulario.obsValidacaoND = '';
            vm.checkEtapaNotificacao();
            break;

          case vm.Params.etapa == 'aprovarPagamento':
            vm.Formulario.userAprovPagamento = vm.Usuario;
            vm.Formulario.dataAprovPagamento = vm.dataAtual;
            vm.Formulario.statusAprovPagamento = 'PENDENTE';
            vm.Formulario.obsAprovPagamento = '';
            vm.buscaResumoVerbas();
            break;

          case vm.Params.etapa == 'conferirFinanceiro':
            vm.Formulario.userFinanceiro = vm.Usuario;
            vm.Formulario.dataFinanceiro = vm.dataAtual;
            vm.Formulario.statusFinanceiro = 'PENDENTE';
            vm.Formulario.obsConferenciaFinanceiro = '';
            vm.buscaDuplicatas();
            vm.calculaTotalDuplicatas();
            break;
        }


        if (vm.regras.enableSolicitacao) {
          brotherService.getMarketingTipoAcao().then(resp => {
            vm.TiposAcao = resp;
            vm.TiposAcao.forEach(tipoAcao => {
              tipoAcao.tipoAcao = JSON.parse(tipoAcao.tipoAcao);
              tipoAcao.contaContabil = JSON.parse(tipoAcao.contaContabil);
            })
          });

        }
      }

      vm.checkEtapaNotificacao = function checkEtapaNotificacao() {
        if (vm.Params.etapa == 'validarEvidencias') {

          let arquivoRecusado = vm.Formulario.arquivosEvidencias.filter(arquivo => !arquivo.removed && !arquivo.aceito).length > 0;

          if (arquivoRecusado) {
            vm.Formulario.notificacaoEtapa = 'ENVIO DAS EVIDÊNCIAS';
            vm.etapaNotificacao = 3;
            vm.regras.showNotificacaoCliente = true;
          } else {
            if (vm.Formulario.necEnvioNd) {
              vm.Formulario.notificacaoEtapa = 'ENVIO DA ND';
              vm.etapaNotificacao = 4;
              vm.regras.showNotificacaoCliente = true;
            } else {
              vm.etapaNotificacao = 5;
              vm.regras.showNotificacaoCliente = false;
            }

          }

        } else {
          if (vm.Params.etapa == 'validarND') {
            let arquivoRecusado = vm.Formulario.arquivosND.filter(arquivo => !arquivo.removed && !arquivo.aceito).length > 0;

            if (arquivoRecusado) {
              vm.Formulario.notificacaoEtapa = 'ENVIO DA ND';
              vm.etapaNotificacao = 4;

              vm.regras.showNotificacaoCliente = true;
            } else {
              vm.regras.showNotificacaoCliente = false;
            }
          }
        }
      }

      vm.changeCliente = function changeCliente() {
        if (vm.Formulario.cliente && vm.Formulario.cliente.codigo) {
          if (vm.Formulario.cliente.executivo) {
            vm.Formulario.executivo = fluigService.getUsuarios(vm.Formulario.cliente.executivo)[0];
          }

          vm.Formulario.itensSellinIt.forEach(itemSellinIt => {
            vm.calculaItemErp(itemSellinIt)
          })

          vm.Formulario.itensSellout.forEach(itemSellout => {
            vm.calculaItemErp(itemSellout)
          })
        }
      }

      vm.buscaResumoVerbas = function buscaResumoVerbas() {
        // erpService.getResumoVerbas(vm.Formulario.cliente.codigo);
        // vm.Formulario.resumoVerbas = [
        //   { titulo: 'AGUARDANDO APROVAÇÃO', class: 'warning', rebateSellout: 9000, rebateSellin: 0, spiff: 300, vpc: 0, total: 9300 },
        //   { titulo: 'FY 2018', class: 'success', rebateSellout: 50000, rebateSellin: 0, spiff: 10000, vpc: 30000, total: 90000 },
        //   { titulo: 'FY 2019 - YTD', class: 'success', rebateSellout: 10000, rebateSellin: 0, spiff: 10000, vpc: 1500, total: 12500 },
        //   { titulo: 'PAGAMENTOS EFETUADOS - FY ATUAL (YTD)', class: 'active', rebateSellout: 55000, rebateSellin: 0, spiff: 5600, vpc: 7000, total: 67600 },
        //   { titulo: 'TOTAL', class: 'info', rebateSellout: 124000, rebateSellin: 0, spiff: 16900, vpc: 38500, total: 89400 },
        // ]
      }
      vm.changeItemSellout = function changeItemSellout(item, index) {
        if (item.item.codigo) {
          vm.calculaItemErp(item);
        }
      }

      vm.changeItemSellinIt = function changeItemSellinIt(item, index) {
        if (item.item.codigo) {
          vm.calculaItemErp(item);
        }
      }

      vm.calculaItemErp = function (item, loadContainer) {
        if (item.item.codigo && item.alterado) {
          if (item.srpInicial && item.srpSugerido) {

            item.loading = true;

            vm.Errors = [];

            erpService.calculaItemErp(item.item.codigo, vm.Formulario.cliente.codigo, item.srpInicial, item.srpSugerido).then(result => {

              item.alterado = false;
              item.loading = false;

              if (result[0].erro) {
                let msg = `Ocorreu um erro ao calcular o item. Não será possível iniciar a solicitação \n\n ${result[0].erro}`
                FLUIGC.message.error({
                  message: msg,
                  title: 'Oops'
                });
                vm.Errors.push(msg);
                return;
              }

              let valores = fluigService.fixDataset(result);

              if (valores.length == 0) {
                FLUIGC.message.error({
                  message: 'Não foi possível calcular o item no ERP',
                  title: 'Oops'
                }, (result) => {

                });
                return;
              }

              item.netInicial = parseFloat(valores[0].netInicial.toFixed(4));
              item.netSugerido = parseFloat(valores[0].netSugerido.toFixed(4));
              item.gpInicial = parseFloat(valores[0].gpInicial.toFixed(4));
              item.gpSugerido = parseFloat(valores[0].gpSugerido.toFixed(4));
              item.dolar = parseFloat(valores[0].dolar.toFixed(4));
              item.rebateUnit = parseFloat(Number(item.netInicial - item.netSugerido).toFixed(4));

              vm.calculaRebateTotal(item);
            }, (error) => {
              item.alterado = false;
              item.loading = false;
              FLUIGC.loading('.panel-heading').hide()
            })
          }
        }
      }

      vm.calculaRebateTotal = function calculaRebateTotal(item) {
        item.rebateTotal = item.rebateUnit * item.qtde;
        item.rebateTotal = parseFloat(item.rebateTotal.toFixed(4));
        vm.calculaTotais();
      }

      vm.calculaTotalRateio = function calculaTotalRateio() {
        vm.Formulario.totalRateio = 0;
        vm.Formulario.rateioCategoria.forEach(r => { vm.Formulario.totalRateio += r.perc });

        vm.Formulario.totalRateio = parseFloat(vm.Formulario.totalRateio.toFixed(4));
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

        if (vm.Formulario.tipoAcao && vm.Formulario.tipoAcao.tipoAcaoCodigo) {
          switch (vm.Formulario.tipoAcao.tipoAcaoCodigo) {
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
          if (!d.valorAntecipa) {
            d.valorAntecipa = 0;
          }
          total += Number(d.valorAntecipa);
          d.saldoAposAbatimento = Number(d.valorSaldo) - Number(d.valorAntecipa);
        });

        total = parseFloat(total.toFixed(4));

        vm.Formulario.difValorLiberado = vm.Formulario.valorLiberado - vm.Formulario.valorAntecipacao - total;
      }

      vm.incluiItem = function incluiItem(obj) {
        obj.push({
          data: new Date().getTime(),
          usuario: vm.Usuario,
          qtde: 0,
          vlTotal: 0,
          rebateTotal: 0,
          perc: 0,
          gpInicial: 0,
          gpSugerido: 0,
          srpInicial: 0,
          srpSugerido: 0,
          netInicial: 0,
          netSugerido: 0,
          rebateUnit: 0,
          dolar: 0

        });
      };

      vm.removeChild = function removeChild(Array, item) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse registro?',
          title: 'Excluir'
        }, (result) => {
          if (result) {
            Array.splice(Array.indexOf(item), 1);
            // Array.splice($index, 1);
            $scope.$apply();
          }
        });
      };

      vm.buscaDuplicatas = function buscaDuplicatas() {

        let loading = FLUIGC.loading(`#collapseSelecionarDuplicatas`);

        loading.show();

        vm.Formulario.saldoTitulos = 0;
        vm.Formulario.difValorLiberado = 0;
        vm.Formulario.valorAntecipacao = 0;

        erpService.getTitulosCliente(vm.Formulario.cliente.codigo).then(duplicatas => {

          loading.hide();

          if (duplicatas[0].erro) {
            let msg = `Ocorreu um erro ao buscar as duplicatas. Não será possível movimentar a solicitação \n\n ${duplicatas[0].erro}`;
            FLUIGC.message.error({
              message: msg,
              title: 'Oops'
            });

            vm.Errors.push(msg);
            return;
          }

          duplicatas.forEach(duplicata => {
            regDuplicata = vm.Formulario.duplicatas.filter(d => d.numTitulo == duplicata.numTitulo)[0];

            if (!regDuplicata) {
              vm.Formulario.duplicatas.push(duplicata);
            } else {
              regDuplicata.codCliente = duplicata.codCliente;
              regDuplicata.codEspec = duplicata.codEspec;
              regDuplicata.codEstab = duplicata.codEstab;
              regDuplicata.codSerie = duplicata.codSerie;
              regDuplicata.matriz = duplicata.matriz;
              regDuplicata.dataEmissao = duplicata.dataEmissao;
              regDuplicata.dataVencto = duplicata.dataVencto;
              regDuplicata.numTitulo = duplicata.numTitulo;
              regDuplicata.parcela = duplicata.parcela;
              regDuplicata.valorOriginal = duplicata.valorOriginal;
              regDuplicata.valorSaldo = duplicata.valorSaldo;
            }

            vm.Formulario.saldoTitulos += Number(duplicata.valorSaldo);
          })

          if (vm.Formulario.saldoTitulos < vm.Formulario.valorLiberado) {
            vm.Formulario.valorAntecipacao = vm.Formulario.valorLiberado - vm.Formulario.saldoTitulos;
            vm.Formulario.duplicatas.forEach(titulo => { titulo.valorAntecipa = titulo.valorSaldo });
          }

          vm.calculaTotalDuplicatas();
        })
      }

      vm.selecionaArquivosEvidencias = (item, files) => {
        // vm.selectFiles(vm.Formulario.arquivosEvidencias, null, $files);

        files.forEach(file => {
          file.uploading = true;
          file.descricao = file.name;
          file.nome = file.name;
          file.novo = true;
          file.item = item;

          vm.Formulario.arquivosEvidencias.push(file);

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
      }

      vm.getItens = () => {

        console.log('vm.getItens')

        vm.ItensEvidencia = [];

        console.log('vm.Formulario.tipoAcao = ', vm.Formulario.tipoAcao)

        if (vm.Formulario.tipoAcao && vm.Formulario.tipoAcao.tipoAcaoCodigo) {

          switch (vm.Formulario.tipoAcao.tipoAcaoCodigo) {
            case 'sellout':
              vm.Formulario.itensSellout.forEach((it, index) => {
                vm.ItensEvidencia.push({ tablename: 'itensSellout', index, descricao: it.item.displaykey, valorTotal: it.rebateTotal });
              })
              break

            case 'sellin':
              if (vm.Formulario.tipoSellin == 'item') {
                vm.Formulario.itensSellinIt.forEach((it, index) => {
                  vm.ItensEvidencia.push({ tablename: 'itensSellinIt', index, descricao: it.item.displaykey, valorTotal: it.rebateTotal });
                })
              }
              break

            case 'spiff':
              if (vm.Formulario.tipoSpiff == 'item') {
                vm.Formulario.itensSpiffIt.forEach((it, index) => {
                  vm.ItensEvidencia.push({ tablename: 'itensSpiffIt', index, descricao: it.item.displaykey, valorTotal: it.vlTotal });
                })
              }
              break
          }
        }
        
        vm.ItensEvidencia.forEach(item => {
          vm.calculaTotalItemEvidencia(item)
        })
      }

      vm.calculaTotalItemEvidencia = item => {

        vm.Formulario[item.tablename][item.index].valEvidencia = vm.Formulario[item.tablename][item.index].valEvidencia || 0
        vm.Formulario[item.tablename][item.index].qtdEvidencia = vm.Formulario[item.tablename][item.index].qtdEvidencia || 0

        vm.Formulario[item.tablename][item.index].totEvidencia = vm.Formulario[item.tablename][item.index].valEvidencia * vm.Formulario[item.tablename][item.index].qtdEvidencia
        vm.Formulario.valorResultado = 0;
        vm.ItensEvidencia.forEach(item => {
          vm.Formulario.valorResultado += vm.Formulario[item.tablename][item.index].totEvidencia || 0
        })

      }

      vm.calculaTotais = function calculaTotais() {
        vm.Formulario.valorTotalVerba = 0;
        vm.Formulario.gpMedioSugerido = 0;
        let qtdItem = 0;

        if (vm.Formulario.tipoAcao && vm.Formulario.tipoAcao.tipoAcaoCodigo) {
          switch (vm.Formulario.tipoAcao.tipoAcaoCodigo) {
            case 'sellout':
              vm.Formulario.itensSellout.forEach(it => {
                vm.Formulario.valorTotalVerba += it.rebateTotal || 0;
                vm.Formulario.gpMedioSugerido += it.gpSugerido || 0;
                qtdItem++;
              })
              vm.Formulario.gpMedioSugerido = vm.Formulario.gpMedioSugerido / qtdItem;
              break

            case 'sellin':
              if (vm.Formulario.tipoSellin == 'item') {
                vm.Formulario.itensSellinIt.forEach(it => {
                  vm.Formulario.valorTotalVerba += it.rebateTotal || 0;
                  vm.Formulario.gpMedioSugerido += it.gpSugerido || 0;
                  qtdItem++;
                })
                vm.Formulario.gpMedioSugerido = vm.Formulario.gpMedioSugerido / qtdItem;
              } else {
                vm.Formulario.itensSellinTg.forEach(it => {
                  vm.Formulario.valorTotalVerba += it.vlTotal || 0;
                })
                vm.Formulario.itensSellinTgAc.forEach(it => {
                  vm.Formulario.valorTotalVerba += it.vlTotal || 0;
                })
              }

              break

            case 'vpc':
              if (vm.Formulario.tipoVpc == 'eventos') {
                vm.Formulario.itensVpcEvt.forEach(it => {
                  vm.Formulario.valorTotalVerba += it.vlTotal || 0;
                })
              } else {
                vm.Formulario.itensVpcOutros.forEach(it => {
                  vm.Formulario.valorTotalVerba += it.vlTotal || 0;
                })
              }

              break

            case 'spiff':
              if (vm.Formulario.tipoSpiff == 'item') {
                vm.Formulario.itensSpiffIt.forEach(it => {
                  vm.Formulario.valorTotalVerba += it.vlTotal || 0;
                })
              } else {
                vm.Formulario.itensSpiffTg.forEach(it => {
                  vm.Formulario.valorTotalVerba += it.vlTotal || 0;
                })
              }

              break
          }
        }
      }

      vm.incluirEmailNotificacao = function incluirEmailNotificacao() {
        vm.Formulario.emailsCliente.push(
          {
            iniAcao: vm.etapaNotificacao < 2,
            fimAcao: vm.etapaNotificacao < 3,
            evidencia: vm.etapaNotificacao < 4,
            envioND: vm.etapaNotificacao < 5,
            pagamento: vm.etapaNotificacao < 6
          }
        )
      }

      vm.calculaTarget = function calculaTarget(item) {
        item.vlTotal = (item.vlTarget || item.vlUnit || 0) * (item.qtde || 0);
        item.vlTotal = parseFloat(item.vlTotal.toFixed(4));
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
          file.item = {}

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
            file.documentid = response.data.content.documentId;
            file.version = response.data.content.version;
            $http.get('/api/public/2.0/documents/getDownloadURL/' + response.data.content.documentId)
              .then((url) => {

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

        $http.post('/api/public/ecm/document/updateFile', {
          comments: "",
          fileName: uploadedFile.name,
          id: file.arquivo_documentId,
          version: file.arquivo_version,
          versionAction: "KEEP_VERSION",
        }).then((response) => {

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
      };

      vm.sendChatMessage = function sendChatMessage() {
        vm.Formulario.chat.push({
          texto: vm.chatMessage,
          time: new Date().getTime(),
          user: vm.Params.user,
          userName: vm.Usuario.colleagueName
        })

        vm.chatMessage = null;
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
  ])

  .directive('ngEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    };
  })
