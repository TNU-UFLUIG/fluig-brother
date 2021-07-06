angular.module('brother.services')
  .factory('brotherService', ['$q', '$http', '$log', 'fluigService',
    ($q, $http, $log, fluigService) => ({

      getMarketingTipoAcao: function getMarketingTipoAcao(tipoAcaoCodigo, fields) {
        return fluigService.getDatasetAsync('marketing_tipo_acao', {
          tipoAcaoCodigo
        }, fields);
      },
      getMarketingAberturaVerba: function getMarketingAberturaVerba(clienteCodigo, fields) {
        return fluigService.getDatasetAsync('marketing_abertura_verba', {
          clienteCodigo,
        }, fields);
      },
      getTitulosCliente: function getTitulosCliente(documentid, fields) {
        return fluigService.getDatasetAsync('marketing_abertura_verba', {
          tablename: 'duplicatas',
          documentid
        }, fields);
      },
      getMarketingParametros: function getMarketingParametros(fields) {
        return fluigService.getDatasetAsync('marketing_parametros', {
        }, fields);
      },
      getMarketingComposicaoEmail: function getMarketingComposicaoEmail(fields) {
        return fluigService.getDatasetAsync('marketing_composicao_email', {
        }, fields);
      },
      getMarketingCliente: function getMarketingCliente(clienteCodigo, fields) {
        return fluigService.getDatasetAsync('marketing_cliente', {
          clienteCodigo
        }, fields);
      },
      getContatosCliente: function getContatosCliente(documentid, fields) {
        return fluigService.getDatasetAsync('marketing_cliente', {
          documentid, tablename: 'contatos'
        }, fields);
      },
      getExtMav: (solicitacao, fields) => {
        return fluigService.getDatasetAsync('ext_mav', {
          solicitacao
        }, fields);
      },
      getUsuarioMarketing: function getUsuarioMarketing(email, fields) {
        return fluigService.getDatasetAsync('marketing_usuario', {
          email
        }, fields);
      },
      enviaResumoVerbas: (email, fields) =>
        fluigService.getDatasetAsync('fluig_envia_resumo_verbas', {
          email
        }, fields),
      notificaAcaoMarketing: (solicitacoes, tipo, enviaBrother, enviaCliente, enviaExecutivo, email, fields) =>
        fluigService.getDatasetAsync('fluig_notifica_acao_marketing', {
          solicitacoes, tipo, enviaBrother, enviaCliente, enviaExecutivo, email
        }, fields)
    })
  ]);
