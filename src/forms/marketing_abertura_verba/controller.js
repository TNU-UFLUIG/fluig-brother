angular.module('MarketingAberturaVerbaApp', ['angular.fluig', 'ngAnimate', 'brother.services', 'brother.directives', 'ngFileUpload'])

  .controller('MarketingAberturaVerbaController', ['$scope', '$window', '$http', '$compile', '$timeout', '$log', 'formService', 'brotherService', 'fluigService', 'erpService', 'globalService', 'Upload',
    function MarketingAberturaVerbaController($scope, $window, $http, $compile, $timeout, $log, formService, brotherService, fluigService, erpService, globalService, Upload) {
      const vm = this;

      if (window.location.hostname == 'localhost') {
        angular.forEach(angular.element('[tablename]'),
          (value) => {
            const table = angular.element(value);
            angular.forEach(table.find('tbody'), tbody => {
              angular.element(tbody)
                .attr('ng-non-bindable', null);
              $compile(table)($scope);
            });
          });
      }

      formService.atualizaFormulario($scope, vm)
        .then(() => {
          vm.loading = FLUIGC.loading('.collapse');

          vm.checkLocal();

          if (!vm.Params.mobile && parent && parent.WCMAPI) {

            vm.WCMAPI = parent.WCMAPI;
          }

          vm.inicia();
        });

      vm.checkLocal = function checkLocal() {
        if (window.location.hostname == 'localhost') {
          vm.Params = {
            edit: true,
            etapa: 'inicio', //"gerenciarVales",
            user: 'admin',
            formMode: 'ADD',
            companyId: 1,
            managerMode: false
          };

          if (vm.Params.formMode != 'ADD') {
            vm.Formulario = { "rateioCategoria": [{ "categoria": { "displaykey": "1 - P&S", "codigo": "1", "descricao": "P&S" }, "categoriaDescricao": "P&S", "categoriaCodigo": 1, "perc": 1, "$$hashKey": "object:18" }, { "categoria": { "displaykey": "2 - S&S", "codigo": "2", "descricao": "S&S" }, "categoriaDescricao": "S&S", "categoriaCodigo": 2, "perc": 0, "$$hashKey": "object:19" }, { "categoria": { "displaykey": "3 - L&M", "codigo": "3", "descricao": "L&M" }, "categoriaDescricao": "L&M", "categoriaCodigo": 3, "perc": 0, "$$hashKey": "object:20" }, { "categoria": { "displaykey": "4 - P&H", "codigo": "4", "descricao": "P&H" }, "categoriaDescricao": "P&H", "categoriaCodigo": 4, "perc": 0, "$$hashKey": "object:21" }], "itensSellout": [{ "item": { "ccusto": "P&S", "displaykey": "DCPT710W - MULTIFUNCIONAL JATO DE TINTA 27/23 PPM JATO DE TINTA 27/23 P", "codigo": "DCPT710W", "categoria": "1.1- INK A4", "descricao": "MULTIFUNCIONAL JATO DE TINTA 27/23 PPM JATO DE TINTA 27/23 P" }, "itemDescricao": "MULTIFUNCIONAL JATO DE TINTA 27/23 PPM JATO DE TINTA 27/23 P", "itemCodigo": "DCPT710W", "categoria": "", "srpInicial": 3000, "netInicial": 1327.1639, "gpInicial": 0.43, "srpSugerido": 2365, "netSugerido": 1046.2409, "gpSugerido": 0.28, "rebateUnit": 280.923, "qtde": 50, "rebateTotal": 14046.15, "dolar": 5.2, "ccusto": "", "usuario": { "colleagueName": "Rosi Ugeda", "mail": "rosi.ugeda@brother.com.br", "extensionNr": null, "maxPrivateSize": null, "groupId": "", "userTenantId": "17", "active": "true", "login": "rugeda", "currentProject": "", "especializationArea": "", "colleagueId": "rugeda", "companyId": "1", "defaultLanguage": "pt_BR", "adminUser": "false", "volumeId": null, "emailHtml": "true" }, "usuarioCodigo": "rugeda", "usuarioNome": "Rosi Ugeda", "data": 1605271682118, "qtdEvidencia": 30, "valEvidencia": 280.92, "totEvidencia": 8427.6 }], "itensSellinIt": [], "itensSellinTg": [], "itensSellinTgAc": [], "itensVpcEvt": [], "itensVpcOutros": [], "itensSpiffIt": [], "itensSpiffTg": [], "arquivosEvidencias": [{ "nome": "TEXTE ATINGIR META.xlsx", "tipo": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "documentid": 8465, "version": 1000, "url": "http://fluigteste.brother.com.br/volume/stream/Rmx1aWc=/P3Q9MSZ2b2w9RGVmYXVsdCZpZD04NDY1JnZlcj0xMDAwJmZpbGU9VEVYVEUrQVRJTkdJUitNRVRBLnhsc3gmY3JjPTQzMjE4MDkyOCZzaXplPTAuNjI2NTI1JnVJZD0xMCZmU0lkPTEmdVNJZD0xJmQ9ZmFsc2UmdGtuPSZwdWJsaWNVcmw9ZmFsc2U=.xlsx", "removed": false, "descricao": "FLUIG TESTE", "aceito": true, "motivoRecusa": "", "$$hashKey": "object:9" }], "arquivosND": [{ "nome": "TEXTE ATINGIR META.xlsx", "tipo": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "documentid": 8466, "version": 1000, "url": "http://fluigteste.brother.com.br/volume/stream/Rmx1aWc=/P3Q9MSZ2b2w9RGVmYXVsdCZpZD04NDY2JnZlcj0xMDAwJmZpbGU9VEVYVEUrQVRJTkdJUitNRVRBLnhsc3gmY3JjPTQzMjE4MDkyOCZzaXplPTAuNjI2NTI1JnVJZD0xMCZmU0lkPTEmdVNJZD0xJmQ9ZmFsc2UmdGtuPSZwdWJsaWNVcmw9ZmFsc2U=.xlsx", "removed": false, "descricao": "FLUIG", "numero": "00256", "aceito": true, "$$hashKey": "object:35" }], "duplicatas": [{ "seq": "", "numTitulo": "0003756", "parcela": "01", "tituloParcela": "0003756/01", "dataEmissao": "2019-12-30", "dataVencto": "2020-05-21", "codEspec": "DP", "nd": { "nome": "TEXTE ATINGIR META.xlsx", "tipo": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "documentid": 8466, "version": 1000, "url": "http://fluigteste.brother.com.br/volume/stream/Rmx1aWc=/P3Q9MSZ2b2w9RGVmYXVsdCZpZD04NDY2JnZlcj0xMDAwJmZpbGU9VEVYVEUrQVRJTkdJUitNRVRBLnhsc3gmY3JjPTQzMjE4MDkyOCZzaXplPTAuNjI2NTI1JnVJZD0xMCZmU0lkPTEmdVNJZD0xJmQ9ZmFsc2UmdGtuPSZwdWJsaWNVcmw9ZmFsc2U=.xlsx", "removed": false, "descricao": "FLUIG", "numero": "00256", "aceito": true }, "codCliente": 4426, "matriz": "NAO", "codEstab": 3, "valorOriginal": 386053.67, "codSerie": 2, "valorSaldo": 386053.67, "valorAntecipa": 4000, "saldoAposAbatimento": 382053.67, "$$hashKey": "object:11" }, { "seq": "", "numTitulo": "0121534", "parcela": "01", "tituloParcela": "0121534/01", "dataEmissao": "2020-02-26", "dataVencto": "2020-06-02", "codEspec": "DP", "nd": { "nome": "TEXTE ATINGIR META.xlsx", "tipo": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "documentid": 8466, "version": 1000, "url": "http://fluigteste.brother.com.br/volume/stream/Rmx1aWc=/P3Q9MSZ2b2w9RGVmYXVsdCZpZD04NDY2JnZlcj0xMDAwJmZpbGU9VEVYVEUrQVRJTkdJUitNRVRBLnhsc3gmY3JjPTQzMjE4MDkyOCZzaXplPTAuNjI2NTI1JnVJZD0xMCZmU0lkPTEmdVNJZD0xJmQ9ZmFsc2UmdGtuPSZwdWJsaWNVcmw9ZmFsc2U=.xlsx", "removed": false, "descricao": "FLUIG", "numero": "00256", "aceito": true }, "codCliente": 4426, "matriz": "NAO", "codEstab": 1, "valorOriginal": 369858.43, "codSerie": 2, "valorSaldo": 369858.43, "valorAntecipa": 4427.6, "saldoAposAbatimento": 365430.83, "$$hashKey": "object:12" }], "emailsCliente": [{ "email": "rosi.ugeda@brother.com.br", "iniAcao": true, "fimAcao": true, "evidencia": true, "envioND": true, "pagamento": true, "$$hashKey": "object:39" }], "chat": [], "statusErp": [{ "data": "", "descricao": null, "$$hashKey": "object:41" }], "Params": { "formMode": "MOD", "edit": true, "numState": "132", "etapa": "atualizarStatus", "user": "csilva", "mobile": false, "companyId": 1, "atividades": { "inicio": [1], "validarMarketing": [2], "gtwAprovarGerMarketing": [176], "revisarSolicitacao": [8], "aprovarGerMarketing": [4], "aprovarPresidencia": [6], "analisarErros": [27, 36, 53, 54, 143, 125], "aguardandoFimDaAcao": [129], "notificarGrupoBrotherInicio": [23], "notificarGrupoBrotherFim": [41], "autorizarNotificacaoInicio": [32], "autorizarNotificacaoFim": [43], "enviarEvidencias": [180], "validarEvidencias": [62], "gtwAprovarVerbaMaior": [67], "aprovarVerbaMaior": [151], "aprovarVerbaMenor": [75], "enviarND": [186], "validarND": [103], "conferirFinanceiro": [113], "aprovarPagamento": [116], "gerarAbatimentos": [121], "atualizarStatus": [132], "autorizarNotificacaoPagamento": [139], "finalizadoSemAntecipacao": [173] } }, "Errors": [], "regras": { "showResumo": true, "showSolicitacao": false, "enableSolicitacao": false, "showObsInternas": true, "enableObsInternas": true, "showEncerramentoAntecipado": false, "enableEncerramentoAntecipado": false, "showValidacaoMarketing": false, "enableValidacaoMarketing": false, "showRateioCategoria": true, "showResumoVerbasCliente": true, "showAprovGerMarketing": false, "enableAprovGerMarketing": false, "showAprovPresidenciaVp": false, "enableAprovPresidenciaVp": false, "showAprovVerbaMaior": false, "enableAprovVerbaMaior": false, "showAprovVerbaMenor": false, "enableAprovVerbaMenor": false, "showNotificacaoCliente": false, "enableNotificacaoCliente": false, "showEvidencias": true, "enableEvidencias": false, "enableValidacaoEvidencias": false, "showND": true, "enableND": false, "enableValidacaoND": false, "showSelecionarDuplicatas": true, "enableSelecionarDuplicatas": false, "showAprovPagamento": true, "enableAprovPagamento": true, "showStatusErp": true, "enableStatusErp": false }, "displaykey": "AGIS EQUIPAMENTOS E SERVICOS DE INF LTDA", "importado": false, "solicitacao": 6312, "atividade": "aprovarPagamento", "responsavel": "mcarvalho", "guid": "5a337f57$6f1f$dcf9$5519$d88ce651fe7d", "pendenteTotvs": "N", "statusIntegraTotvs": "OK", "dataIntegraTotvs": 1605637214510, "currentStepPortal": 5, "notificaGrupoBrotherFimAcao": "N", "revisao": false, "folderAttach": "2438", "cliente": { "displaykey": "4 - AGIS EQUIPAMENTOS E SERVICOS DE INF LTDA - 68993641000128", "codigo": "4", "ativo": "SIM", "nomeAbrev": "AGIS EQUIP", "subcanal": "100", "cnpj": "68993641000128", "executivo": "", "razaoSocial": "AGIS EQUIPAMENTOS E SERVICOS DE INF LTDA", "matriz": "SIM" }, "clienteNome": "AGIS EQUIPAMENTOS E SERVICOS DE INF LTDA", "clienteCodigo": 4, "nomeAcao": "TESTE FLUIG", "tipoAcao": { "metadata#parent_id": 2514, "descricaoTipoAcao": "Sed libero. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Phasellus gravida semper nisi. Quisque id odio. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.", "metadata#card_index_id": 2514, "companyid": 1, "metadata#version": 3000, "cardid": 2514, "tipoAcao_input": null, "metadata#active": true, "tableid": "principal", "contaContabil_input": "41301012 - DESCONTO FINANCEIRO - SELL OUT PROMOTION", "documentid": 2545, "id": 7, "tipoAcaoCodigo": "sellout", "metadata#id": 2545, "displaykey": "SELL-OUT PROMOTIONS", "contaContabil_i": null, "Params": "{\"formMode\":\"MOD\",\"edit\":true,\"user\":\"rugeda\",\"mobile\":false,\"companyId\":1}", "contaContabilCodigo": "41301012", "version": 3000, "Errors": "[]", "contaContabil": { "displaykey": "41301012 - DESCONTO FINANCEIRO - SELL OUT PROMOTION", "codigo": "41301012", "descricao": "DESCONTO FINANCEIRO - SELL OUT PROMOTION" }, "tipoAcao": { "displaykey": "sellout - SELL-OUT PROMOTIONS", "contaContabil": "03.01.01", "codigo": "sellout", "descricao": "SELL-OUT PROMOTIONS" }, "importado": "false", "tipoAcao_i": null, "metadata#card_index_version": 1000 }, "tipoAcaoDescricao": "SELL-OUT PROMOTIONS", "tipoAcaoCodigo": "sellout", "inicioAcao_f": "domingo, 1 de novembro de 2020", "inicioAcao": 1604285999000, "terminoAcao_f": "quinta-feira, 5 de novembro de 2020", "terminoAcao": 1604631599000, "tipoQuantidade": "estimada", "descricaoDetalhada": "TESTE FLUIG\n22222\nPPPP\nBLABLAPGPGPGPGPGPGPGP", "totalRateio": 1, "statusValidacaoMarketing": "APROVADO", "dataValidacaoMarketing_f": "SEXTA-FEIRA, 13 DE NOVEMBRO DE 2020", "dataValidacaoMarketing": 1605272152825, "userValMarketing": { "colleagueName": "Rosi Ugeda", "mail": "rosi.ugeda@brother.com.br", "extensionNr": null, "maxPrivateSize": null, "groupId": "", "userTenantId": "17", "active": "true", "login": "rugeda", "currentProject": "", "especializationArea": "", "colleagueId": "rugeda", "companyId": "1", "defaultLanguage": "pt_BR", "adminUser": "false", "volumeId": null, "emailHtml": "true" }, "userValMarketingNome": "Rosi Ugeda", "userValMarketingCodigo": "rugeda", "executivo": { "displaykey": "EDUARDO MEDEIROS - eduardo.medeiros@brother.com.br", "codigo": "3", "nome": "EDUARDO MEDEIROS", "email": "eduardo.medeiros@brother.com.br" }, "executivoCodigo": 3, "executivoNome": "EDUARDO MEDEIROS", "necAprovacaoGerMkt": true, "statusAprovGerMarketing": "APROVADO", "dataAprovGerMarketing_f": "SEXTA-FEIRA, 13 DE NOVEMBRO DE 2020", "dataAprovGerMarketing": 1605272180170, "userAprovGerMarketing": { "colleagueName": "Rosi Ugeda", "mail": "rosi.ugeda@brother.com.br", "extensionNr": null, "maxPrivateSize": null, "groupId": "", "userTenantId": "17", "active": "true", "login": "rugeda", "currentProject": "", "especializationArea": "", "colleagueId": "rugeda", "companyId": "1", "defaultLanguage": "pt_BR", "adminUser": "false", "volumeId": null, "emailHtml": "true" }, "userAprovGerMarketingNome": "Rosi Ugeda", "userAprovGerMarketingCodigo": "rugeda", "statusAprovPresidenciaVp": "APROVADO", "dataAprovPresidenciaVp_f": "SEXTA-FEIRA, 13 DE NOVEMBRO DE 2020", "dataAprovPresidenciaVp": 1605272199596, "userAprovPresidenciaVp": { "colleagueName": "Rosi Ugeda", "mail": "rosi.ugeda@brother.com.br", "extensionNr": null, "maxPrivateSize": null, "groupId": "", "userTenantId": "17", "active": "true", "login": "rugeda", "currentProject": "", "especializationArea": "", "colleagueId": "rugeda", "companyId": "1", "defaultLanguage": "pt_BR", "adminUser": "false", "volumeId": null, "emailHtml": "true" }, "userAprovPresidenciaVpNome": "Rosi Ugeda", "userAprovPresidenciaVpCodigo": "rugeda", "anteciparEncerramento": true, "dataEncerramentoAntecip_f": "SEXTA-FEIRA, 13 DE NOVEMBRO DE 2020", "dataEncerramentoAntecip": 1605272323005, "userEncerramentoAntecip": { "colleagueName": "Rosi Ugeda", "mail": "rosi.ugeda@brother.com.br", "extensionNr": null, "maxPrivateSize": null, "groupId": "", "userTenantId": "17", "active": "true", "login": "rugeda", "currentProject": "", "especializationArea": "", "colleagueId": "rugeda", "companyId": "1", "defaultLanguage": "pt_BR", "adminUser": "false", "volumeId": null, "emailHtml": "true" }, "userEncerramentoAntecipNome": "Rosi Ugeda", "userEncerramentoAntecipCodigo": "rugeda", "obsEncerramentoAntecip": "teste", "statusValidacaoEvid": "APROVADO", "dataValidacaoEvid": 1605272602737, "userValidacaoEvid": { "colleagueName": "Rosi Ugeda", "mail": "rosi.ugeda@brother.com.br", "extensionNr": null, "maxPrivateSize": null, "groupId": "", "userTenantId": "17", "active": "true", "login": "rugeda", "currentProject": "", "especializationArea": "", "colleagueId": "rugeda", "companyId": "1", "defaultLanguage": "pt_BR", "adminUser": "false", "volumeId": null, "emailHtml": "true" }, "userValidacaoEvidNome": "Rosi Ugeda", "userValidacaoEvidCodigo": "rugeda", "valorTotalVerba_f": "R$14.046,15", "valorTotalVerba": 14046.15, "valorResultado_f": "R$8.427,60", "valorResultado": 8427.6, "valorLiberado_f": "R$8.427,60", "valorLiberado": 8427.6, "necEnvioNd": true, "evRecusada": false, "envioEvidenciasConcluido": true, "statusValidacaoND": "APROVADO", "dataValidacaoND_f": "SEXTA-FEIRA, 13 DE NOVEMBRO DE 2020", "dataValidacaoND": 1605272758696, "userValidacaoND": { "colleagueName": "Rosi Ugeda", "mail": "rosi.ugeda@brother.com.br", "extensionNr": null, "maxPrivateSize": null, "groupId": "", "userTenantId": "17", "active": "true", "login": "rugeda", "currentProject": "", "especializationArea": "", "colleagueId": "rugeda", "companyId": "1", "defaultLanguage": "pt_BR", "adminUser": "false", "volumeId": null, "emailHtml": "true" }, "userValidacaoNDNome": "Rosi Ugeda", "userValidacaoNDCodigo": "rugeda", "envioNDConcluido": true, "ndRecusada": false, "statusFinanceiro": "APROVADO", "dataFinanceiro": 1605636805525, "userFinanceiro": { "colleagueName": "MANUELA CARVALHO", "mail": "manuela.carvalho@brother.com.br", "extensionNr": null, "maxPrivateSize": null, "groupId": "", "userTenantId": "10", "active": "true", "login": "mcarvalho", "currentProject": "", "especializationArea": "", "colleagueId": "mcarvalho", "companyId": "1", "defaultLanguage": "pt_BR", "adminUser": "false", "volumeId": null, "emailHtml": "true" }, "userFinanceiroNome": "MANUELA CARVALHO", "userFinanceiroCodigo": "mcarvalho", "difValorLiberado_f": "R$0,00", "difValorLiberado": 0, "saldoTitulos_f": "R$7.865.902,22", "saldoTitulos": 7865902.22, "valorAntecipacao_f": "R$0,00", "valorAntecipacao": 0, "statusAprovPagamento": "APROVADO", "dataAprovPagamento_f": "TERÇA-FEIRA, 17 DE NOVEMBRO DE 2020", "dataAprovPagamento": 1605636945318, "userAprovPagamento": { "colleagueName": "MANUELA CARVALHO", "mail": "manuela.carvalho@brother.com.br", "extensionNr": null, "maxPrivateSize": null, "groupId": "", "userTenantId": "10", "active": "true", "login": "mcarvalho", "currentProject": "", "especializationArea": "", "colleagueId": "mcarvalho", "companyId": "1", "defaultLanguage": "pt_BR", "adminUser": "false", "volumeId": null, "emailHtml": "true" }, "userAprovPagamentoNome": "MANUELA CARVALHO", "userAprovPagamentoCodigo": "mcarvalho", "notificacaoEtapa": "ENVIO DA ND", "gpMedioSugerido_f": "28,000%", "gpMedioSugerido": 0.28, "dataAbertura_f": "SEXTA-FEIRA, 13 DE NOVEMBRO DE 2020", "dataAbertura": 1605271667983, "solicitante": { "colleagueName": "Rosi Ugeda", "mail": "rosi.ugeda@brother.com.br", "extensionNr": null, "maxPrivateSize": null, "groupId": "", "userTenantId": "17", "active": "true", "login": "rugeda", "currentProject": "", "especializationArea": "", "colleagueId": "rugeda", "companyId": "1", "defaultLanguage": "pt_BR", "adminUser": "false", "volumeId": null, "emailHtml": "true" }, "solicitanteNome": "Rosi Ugeda", "solicitanteCodigo": "rugeda", "status": "ENVIO BANCÁRIO" };
          }
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

        if (vm.Params.edit && vm.Params.etapa == 'validarEvidencias') {
          vm.Formulario.necEnvioNd = vm.Formulario.userValidacaoEvid ? vm.Formulario.necEnvioNd : vm.Formulario.tipoAcao.tipoAcaoCodigo == 'spiff' ? false : true;
        }

        fluigService.getUsuarios(vm.Params.user).then(resp => {
          vm.Usuario = resp[0];
          vm.checkEtapa();
        });

        fluigService.getPasta(vm.Params.companyId || 1, 'Cadastros%7CMarketing%7CAnexos').then(pasta => {
          vm.Formulario.folderAttach = pasta[0].documentId;
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
          'aprovarVerbaMenor', 'enviarND', 'validarND', 'gerenciarVales', 'conferirFinanceiro', 'aprovarPagamento', 'atualizarStatus', 'autorizarNotificacaoPagamento'];

        vm.regras = {};
        [
          { regra: 'showResumo', def: true, etapas: vm.etapas },
          { regra: 'showSolicitacao', def: true, etapas: ['inicio', 'consulta', 'revisarSolicitacao', 'analisarErros'] },
          { regra: 'enableSolicitacao', def: vm.Params.edit, etapas: ['inicio', 'revisarSolicitacao'] },

          { regra: 'showCopiarAcao', def: true, etapas: ['inicio'] },
          { regra: 'enableCopiarAcao', def: vm.Params.edit, etapas: ['inicio'] },

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

          { regra: 'showSuspenderAcao', def: vm.Params.managerMode, etapas: vm.etapas.filter(e => e !== 'inicio') },
          { regra: 'enableSuspenderAcao', def: vm.Params.managerMode, etapas: vm.etapas.filter(e => e !== 'consulta') },

          { regra: 'showAprovVerbaMenor', def: true, etapas: ['consulta', 'aprovarVerbaMenor', 'aprovarGerMarketing', 'validarEvidencias', 'analisarErros'] },
          { regra: 'enableAprovVerbaMenor', def: true, etapas: ['aprovarVerbaMenor'] },

          { regra: 'showNotificacaoCliente', def: true, etapas: vm.etapas },
          { regra: 'enableNotificacaoCliente', def: true, etapas: vm.etapas },

          { regra: 'showEvidencias', def: true, etapas: ['consulta', 'enviarEvidencias', 'validarND', 'aprovarVerbaMaior', 'aprovarVerbaMenor', 'validarEvidencias', 'aprovarPagamento', 'analisarErros', 'conferirFinanceiro', 'gerenciarVales'] },
          { regra: 'enableEvidencias', def: true, etapas: ['enviarEvidencias', 'analisarErros'] },
          { regra: 'enableValidacaoEvidencias', def: true, etapas: ['validarEvidencias', 'analisarErros'] },

          { regra: 'showND', def: true, etapas: ['consulta', 'enviarND', 'validarND', 'analisarErros', 'conferirFinanceiro', 'validarEvidencias', 'aprovarPagamento'] },
          { regra: 'enableND', def: true, etapas: ['enviarND', 'analisarErros'] },
          { regra: 'enableValidacaoND', def: true, etapas: ['validarND', 'analisarErros'] },

          { regra: 'showSelecionarDuplicatas', def: true, etapas: ['consulta', 'conferirFinanceiro', 'aprovarPagamento', 'validarEvidencias', 'analisarErros', 'autorizarNotificacaoPagamento'] },
          { regra: 'enableSelecionarDuplicatas', def: true, etapas: ['conferirFinanceiro', 'analisarErros'] },

          { regra: 'showGerenciarVales', def: true, etapas: ['consulta', 'gerenciarVales', 'analisarErros'] },
          { regra: 'enableGerenciarVales', def: true, etapas: ['gerenciarVales', 'analisarErros'] },

          { regra: 'showAprovPagamento', def: true, etapas: ['consulta', 'aprovarPagamento', 'conferirFinanceiro', 'validarEvidencias', 'analisarErros'] },
          { regra: 'enableAprovPagamento', def: true, etapas: ['aprovarPagamento'] },

          { regra: 'showStatusErp', def: true, etapas: vm.etapas },
          { regra: 'enableStatusErp', def: true, etapas: [] },


        ].forEach(o => {
          vm.regras[o.regra] = vm.Params.user == "adminx" && vm.Params.edit ? true : o.etapas.indexOf(vm.Params.etapa) >= 0 ? o.def : false;
        });
      };

      vm.calculaPercCategoria = () => {
        console.log(vm.calculaPercCategoria)

        vm.Formulario.rateioCategoria.forEach(cat => cat.valor = 0);

        switch (vm.Formulario.tipoAcao.tipoAcaoCodigo) {
          case 'sellout':
            vm.Formulario.itensSellout.forEach((it, index) => {
              if (it.item) {
                let cat = vm.Formulario.rateioCategoria.filter(c => c.categoria.descricao == it.item.ccusto)[0];
                if (cat) {
                  cat.valor += it.rebateTotal;
                }
              }
            });
            break;
          case 'sellin':
            if (vm.Formulario.tipoSellin == 'item' || vm.Formulario.tipoSellin == 'net') {
              vm.Formulario.itensSellinIt.forEach((it, index) => {
                if (it.item) {
                  console.log(it.item.ccusto)
                  let cat = vm.Formulario.rateioCategoria.filter(c => c.categoria.descricao == it.item.ccusto)[0];
                  console.log(cat);
                  if (cat) {
                    cat.valor += it.rebateTotal;
                  }
                }
              });
            }
            break

          case 'spiff':
            if (vm.Formulario.tipoSpiff == 'item') {
              vm.Formulario.itensSpiffIt.forEach((it, index) => {
                if (it.item) {
                  console.log(it.item.ccusto)
                  let cat = vm.Formulario.rateioCategoria.filter(c => c.categoria.descricao == it.item.ccusto)[0];
                  console.log(cat);
                  if (cat) {
                    cat.valor += it.vlTotal;
                  }
                }
              });
            }
            break
        };

        vm.Formulario.rateioCategoria.forEach(cat => {
          cat.perc = cat.valor / vm.Formulario.valorTotalVerba;
        });

        vm.calculaTotalRateio();
      };

      vm.checkEtapa = function checkEtapa() {
        vm.etapaNotificacao = 0;
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
            vm.checkUrlArquivos()
            break;

          case vm.Params.etapa == 'validarND' || vm.Params.etapa == 'enviarND':
            vm.Formulario.userValidacaoND = vm.Usuario;
            vm.Formulario.dataValidacaoND = vm.dataAtual;
            vm.Formulario.statusValidacaoND = 'PENDENTE';
            vm.Formulario.obsValidacaoND = '';
            vm.checkEtapaNotificacao();
            vm.checkUrlArquivos()
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
            vm.checkUrlArquivos()
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

        if (vm.regras.enableCopiarAcao) {
          vm.Solicitacoes = [];
          brotherService.getMarketingAberturaVerba().then(solicitacoes => {
            solicitacoes.forEach(s => {
              s.displaykey = `${s.suspenderAcao == 'true' ? 'SUSPENSA - ' : ''} ${s.solicitacao} - ${s.tipoAcaoDescricao} - ${s.nomeAcao} - ${s.clienteNome}`;
              vm.Solicitacoes.push(s)
            });
          })
        }
      }

      vm.changeAcaoCopiada = () => {
        if (vm.Formulario.acaoCopiada && vm.Formulario.acaoCopiada.displaykey) {
          FLUIGC.message.confirm({
            message: `Deseja copiar os dados da solicitação ${vm.Formulario.acaoCopiada.displaykey}?`,
            title: 'Copiar ação'
          }, (result) => {
            if (result) {
              vm.copiaDadosAcao()

              // Array.splice($index, 1);
              $scope.$apply();
            }
          });
        }
      }

      vm.copiaDadosAcao = () => {
        [
          'cliente', 'nomeAcao', 'tipoAcao', 'inicioAcao', 'terminoAcao', 'tipoQuantidade',
          'tipoVpc', 'tipoSellin', 'tipoSellout', 'tipoSpiff', 'descricaoDetalhada'
        ]
          .forEach(field => {
            vm.Formulario[field] = globalService.isJson(vm.Formulario.acaoCopiada[field]) ? JSON.parse(vm.Formulario.acaoCopiada[field]) : vm.Formulario.acaoCopiada[field];
          });

        const tablesToCopy = [
          {
            tablename: 'itensSellout', fieldPrefix: 'itemSellout', fields:
              [
                'target', 'finalidade', 'item', 'srpInicial', 'srpSugerido',
                'netInicial', 'netSugerido', 'rebateUnit', 'qtde', 'rebateTotal', 'data',
                'qtdEvidencia', 'valEvidencia', 'totEvidencia'
              ]
          },
          {
            tablename: 'rateioCategoria', fieldPrefix: 'rateio', fields: [
              'perc', 'categoria'
            ]
          }
        ]

        tablesToCopy.forEach(t => {
          vm.Formulario[t.tablename] = [];
          fluigService.getDatasetAsync('marketing_abertura_verba', {
            documentid: vm.Formulario.acaoCopiada.documentid, tablename: t.tablename
          }).then(children => {
            children.forEach(i => {
              let item = {};
              t.fields.forEach(field => {
                item[field] = globalService.isJson(i[`${t.fieldPrefix}_${field}`]) ? JSON.parse(i[`${t.fieldPrefix}_${field}`]) : i[`${t.fieldPrefix}_${field}`]
              });
              vm.Formulario[t.tablename].push(item);
            })

            if (t.tablename === 'rateioCategoria') {
              vm.calculaTotalRateio();
            }
          })
        });
      }

      vm.checkUrlArquivos = () => {
        vm.Formulario.arquivosEvidencias.forEach(a => {
          $http.get(`/api/public/2.0/documents/getDownloadURL/${a.documentid}`).then(res => {
            console.log(res)
            a.url = res.data.content
          })
        })

        vm.Formulario.arquivosND.forEach(a => {
          $http.get(`/api/public/2.0/documents/getDownloadURL/${a.documentid}`).then(res => {
            console.log(res)
            a.url = res.data.content
          })
        })
      }
      vm.checkEtapaNotificacao = function checkEtapaNotificacao() {
        if (vm.Params.etapa === 'validarEvidencias') {
          vm.Formulario.evRecusada = vm.Formulario.arquivosEvidencias.filter(arquivo => !arquivo.removed && !arquivo.aceito).length > 0;
          vm.Formulario.revisao = vm.Formulario.evRecusada;
          if (vm.Formulario.evRecusada) {
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
            vm.Formulario.ndRecusada = vm.Formulario.arquivosND.filter(arquivo => !arquivo.removed && !arquivo.aceito).length > 0;
            vm.Formulario.revisao = vm.Formulario.ndRecusada;
            if (vm.Formulario.ndRecusada) {
              vm.Formulario.notificacaoEtapa = 'ENVIO DA ND';
              vm.etapaNotificacao = 4;

              vm.regras.showNotificacaoCliente = true;
            } else {
              vm.regras.showNotificacaoCliente = false;
            }
          }
        }
      };

      vm.changeCliente = function changeCliente() {
        vm.Formulario.emailsCliente = [];
        if (vm.Formulario.cliente && vm.Formulario.cliente.codigo) {
          if (vm.Formulario.cliente.executivo) {
            vm.Formulario.executivo = fluigService.getUsuarios(vm.Formulario.cliente.executivo)[0];
          }

          vm.Formulario.itensSellinIt.forEach((itemSellinIt) => {
            vm.calculaItemErp(itemSellinIt);
          });

          vm.Formulario.itensSellout.forEach(itemSellout => {
            vm.calculaItemErp(itemSellout)
          })

          brotherService.getMarketingCliente(vm.Formulario.cliente.codigo).then((cliente) => {
            if (cliente[0]) {
              brotherService.getContatosCliente(cliente[0].documentid).then((contatos) => {
                vm.Formulario.emailsCliente = [];
                contatos.forEach((contato) => {
                  vm.Formulario.emailsCliente.push({
                    email: contato.contato_email,
                    iniAcao: contato.contato_iniAcao,
                    evidencia: contato.contato_evidencia,
                    envioND: contato.contato_envioND,
                    pagamento: contato.contato_pagamento,
                    cancelamento: contato.contato_cancelamento,
                    vales: contato.contato_vales
                  });
                });
              });
            }
          });
        }
      };

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
        if (item.item && item.item.codigo) {
          vm.calculaItemErp(item);
        }
      }

      vm.changeItemSellinIt = function changeItemSellinIt(item, index) {
        if (item.item && item.item.codigo) {
          vm.calculaItemErp(item);
        }
      }

      vm.calculaItemErp = function (item, loadContainer) {
        if (item.item && item.item.codigo && item.alterado) {
          if ((vm.Formulario.tipoAcao.tipoAcaoCodigo == 'sellout' && vm.Formulario.tipoSellout == 'net') ||
            (vm.Formulario.tipoAcao.tipoAcaoCodigo == 'sellin' && vm.Formulario.tipoSellin == 'net')) {
            item.rebateUnit = parseFloat(Number(item.netInicial - item.netSugerido).toFixed(4));

            vm.calculaRebateTotal(item);

            item.alterado = false;

          } else if (vm.Formulario.tipoAcao.tipoAcaoCodigo == 'sellout' && vm.Formulario.tipoSellout == 'target') {
            vm.calculaRebateTotal(item);
          } else {
            if (item.srpInicial || item.srpSugerido) {

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
                // item.gpInicial = parseFloat(valores[0].gpInicial.toFixed(4));
                // item.gpSugerido = parseFloat(valores[0].gpSugerido.toFixed(4));
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
        vm.bloqRateio = false;
        vm.Formulario.rateioCategoria.forEach(r => r.perc = 0);

        if (vm.Formulario.tipoAcao && vm.Formulario.tipoAcao.tipoAcaoCodigo) {

          switch (vm.Formulario.tipoAcao.tipoAcaoCodigo) {
            case 'sellout':
              vm.incluiItem(vm.Formulario.itensSellout);
              if (vm.Formulario.tipoSellout == 'srp' || vm.Formulario.tipoSellout == 'net') {
                vm.bloqRateio = true;
              }
              break;
            case 'sellin':
              if (vm.Formulario.tipoSellin == 'item' || vm.Formulario.tipoSellin == 'net') {
                vm.incluiItem(vm.Formulario.itensSellinIt);
                vm.bloqRateio = true;
              } else {
                vm.incluiItem(vm.Formulario.itensSellinTg);
                // vm.incluiItem(vm.Formulario.itensSellinTgAc);
              }
              break;
            case 'vpc':
              if (vm.Formulario.tipoVpc == 'eventos') {
                vm.incluiItem(vm.Formulario.itensVpcEvt);
              } else {
                vm.incluiItem(vm.Formulario.itensVpcOutros);
              }
              break;
            case 'spiff':
              if (vm.Formulario.tipoSpiff == 'item') {
                vm.incluiItem(vm.Formulario.itensSpiffIt);
                vm.bloqRateio = true;
              } else {
                vm.incluiItem(vm.Formulario.itensSpiffTg);
              }
              break;
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
          item: {},
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

      vm.changeDataVales = () => {
        if (vm.Formulario.dataEntregaVales) {
          vm.Formulario.statusVales = 'ENTREGUE';
        } else {
          if (vm.Formulario.dataEnvioVales) {
            vm.Formulario.statusVales = 'ENVIADO';
          } else {
            if (vm.Formulario.dataCompraVales) {
              vm.Formulario.statusVales = 'COMPRADO';
            }
          }
        }
      };

      vm.buscaDuplicatas = function buscaDuplicatas() {

        let loading = FLUIGC.loading(`#collapseSelecionarDuplicatas`);

        loading.show();

        vm.Formulario.saldoTitulos = 0;
        vm.Formulario.difValorLiberado = 0;
        vm.Formulario.valorAntecipacao = 0;

        erpService.getTitulosCliente(vm.Formulario.cliente.codigo).then(duplicatas => {

          loading.hide();

          if (duplicatas[0] && duplicatas[0].erro) {
            let msg = `Ocorreu um erro ao buscar as duplicatas. Não será possível movimentar a solicitação \n\n ${duplicatas[0].erro}`;
            FLUIGC.message.error({
              message: msg,
              title: 'Oops'
            });

            vm.Errors.push(msg);
            return;
          }

          brotherService.getMarketingAberturaVerba(vm.Formulario.cliente.codigo).then(solicitacoes => {
            let solicitacoesEmAprovacao = solicitacoes.filter(s => s.status == 'APROVAÇÃO FINANCEIRA');
            let titulos = [];
            solicitacoesEmAprovacao.forEach(s => {
              titulos = titulos.concat(DatasetFactory.getDataset('marketing_abertura_verba', null, [
                DatasetFactory.createConstraint('documentid', s.documentid, s.documentid, ConstraintType.MUST),
                DatasetFactory.createConstraint('tablename', 'duplicatas', 'duplicatas', ConstraintType.MUST),
              ]).values);
            })

            vm.Formulario.duplicatas.forEach(d => {
              d.emAprovacao = titulos.filter(t => t.titulo_numTitulo == d.numTitulo).length > 0;
            })
          })

          duplicatas.forEach(duplicata => {
            regDuplicata = vm.Formulario.duplicatas.filter(d => d.numTitulo == duplicata.numTitulo && d.parcela == duplicata.parcela)[0];

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
        vm.ItensEvidencia = [];

        console.log('vm.Formulario.tipoAcao = ', vm.Formulario.tipoAcao)

        if (vm.Formulario.tipoAcao && vm.Formulario.tipoAcao.tipoAcaoCodigo && vm.Formulario.tipoSellout !== 'target') {

          switch (vm.Formulario.tipoAcao.tipoAcaoCodigo) {
            case 'sellout':
              vm.Formulario.itensSellout.forEach((it, index) => {
                vm.ItensEvidencia.push({ tablename: 'itensSellout', index, descricao: it.item.displaykey, valEvidencia: it.rebateUnit, valorTotal: it.rebateTotal });
              });
              break

            case 'sellin':
              if (vm.Formulario.tipoSellin == 'item' || vm.Formulario.tipoSellin == 'net') {
                vm.Formulario.itensSellinIt.forEach((it, index) => {
                  vm.ItensEvidencia.push({ tablename: 'itensSellinIt', index, descricao: it.item.displaykey, valEvidencia: it.rebateUnit, valorTotal: it.rebateTotal });
                })
              }
              break

            case 'spiff':
              if (vm.Formulario.tipoSpiff == 'item') {
                vm.Formulario.itensSpiffIt.forEach((it, index) => {
                  vm.ItensEvidencia.push({ tablename: 'itensSpiffIt', index, descricao: it.item.displaykey, valEvidencia: it.rebateUnit, valorTotal: it.vlTotal });
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
                // vm.Formulario.gpMedioSugerido += it.gpSugerido || 0;
                qtdItem++;
              })
              // vm.Formulario.gpMedioSugerido = vm.Formulario.gpMedioSugerido / qtdItem;
              vm.calculaPercCategoria();
              break
            case 'sellin':
              if (vm.Formulario.tipoSellin == 'item' || vm.Formulario.tipoSellin == 'net') {
                vm.Formulario.itensSellinIt.forEach(it => {
                  vm.Formulario.valorTotalVerba += it.rebateTotal || 0;
                  vm.Formulario.gpMedioSugerido += it.gpSugerido || 0;
                  qtdItem++;
                })
                vm.Formulario.gpMedioSugerido = vm.Formulario.gpMedioSugerido / qtdItem;
                vm.calculaPercCategoria();
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
                vm.calculaPercCategoria();
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

            docsToDelete.push({ docId: arquivo.anexo.documentId, isLink: false, parentId: vm.Formulario.folderAttach });

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
          parentDocumentId: vm.Formulario.folderAttach,
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
        return `${s4() + s4()}$${s4()}$${s4()}$${s4()}$${s4()}${s4()}${s4()}`;
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
