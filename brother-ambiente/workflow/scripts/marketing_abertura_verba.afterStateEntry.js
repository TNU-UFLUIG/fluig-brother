function afterStateEntry(sequenceId) {

  var Params = params();

  log.info('***** marketing_abertura_verba.afterStateEntry sequenceId = ' + sequenceId);

  if (Params.atividades.enviarEvidencias.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "ENVIO DE EVIDÊNCIAS");
    hAPI.setCardValue("currentStepPortal", "1");
    hAPI.setCardValue("envioEvidenciasConcluido", "false");
    enviaEmail("evidencia", "S", "S", "S");
  }

  if (Params.atividades.enviarND.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "ENVIO DE ND");
    hAPI.setCardValue("currentStepPortal", "3");
    hAPI.setCardValue("envioNDConcluido", "false");
    enviaEmail("envioND", "S", "S", "S");
  }

  if (Params.atividades.validarMarketing.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "VALIDAÇÃO MARKETING");
    hAPI.setCardValue("currentStepPortal", "0");
  }

  if (Params.atividades.revisarSolicitacao.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "REVISÃO PELO SOLICITANTE");
    hAPI.setCardValue("currentStepPortal", "0");
  }

  if (Params.atividades.aprovarGerMarketing.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "APROVAÇÃO DA GERÊNCIA DE MARKETING");
    hAPI.setCardValue("currentStepPortal", "0");
  }

  if (Params.atividades.aprovarPresidencia.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "APROVAÇÃO DA PRESIDÊNCIA");
    hAPI.setCardValue("currentStepPortal", "0");
  }

  if (Params.atividades.analisarErros.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "TI");
    hAPI.setCardValue("currentStepPortal", "0");
  }

  if (Params.atividades.aguardandoFimDaAcao.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "AGUARDANDO FIM DA AÇÃO");
    hAPI.setCardValue("currentStepPortal", "0");
  }

  if (Params.atividades.autorizarNotificacaoInicio.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "AGUARDANDO AUTORIZAÇÃO DE INÍCIO");
    hAPI.setCardValue("currentStepPortal", "0");
  }

  if (Params.atividades.autorizarNotificacaoFim.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "AGUARDANDO AUTORIZAÇÃO DE TÉRMINO");
    hAPI.setCardValue("currentStepPortal", "0");
  }

  if (Params.atividades.validarEvidencias.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "VALIDAÇÃO DAS EVIDÊNCIAS");
    hAPI.setCardValue("currentStepPortal", "2");
  }

  if (Params.atividades.aprovarVerbaMaior.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "APROVAÇÃO DA VERBA");
    hAPI.setCardValue("currentStepPortal", "2");
  }

  if (Params.atividades.aprovarVerbaMenor.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "APROVAÇÃO DA VERBA");
    hAPI.setCardValue("currentStepPortal", "2");
  }

  if (Params.atividades.enviarND.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "ENVIO DE ND");
    hAPI.setCardValue("currentStepPortal", "3");
  }

  if (Params.atividades.validarND.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "VALIDAÇÃO DE ND");
    hAPI.setCardValue("currentStepPortal", "4");
  }

  if (Params.atividades.conferirFinanceiro.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "ANÁLISE FINANCEIRA");
    hAPI.setCardValue("currentStepPortal", "4");
  }

  if (Params.atividades.aprovarPagamento.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "APROVAÇÃO FINANCEIRA");
    hAPI.setCardValue("currentStepPortal", "4");
  }

  if (Params.atividades.atualizarStatus.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "ENVIO BANCÁRIO");
    hAPI.setCardValue("currentStepPortal", "5");
  }

  if (Params.atividades.gerenciarVales.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "ENVIO DE VALES");
    hAPI.setCardValue("currentStepPortal", "5");
  }
  if (Params.atividades.gtwVales.indexOf(sequenceId) >= 0) {
    enviaEmail("vales", "S", "S", "S");
  }

  if (Params.atividades.finalizado.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "FINALIZADO");
    hAPI.setCardValue("currentStepPortal", "5");
  }

  if (Params.atividades.finalizadoSemAntecipacao.indexOf(sequenceId) >= 0) {
    hAPI.setCardValue("status", "FINALIZADO SEM ANTECIPAÇÃO");
    hAPI.setCardValue("currentStepPortal", "5");
  }

}