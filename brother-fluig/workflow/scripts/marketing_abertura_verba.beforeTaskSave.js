function beforeTaskSave(colleagueId, nextSequenceId, userList) {

  var Params = params();

  var sequenceId = getValue("WKNumState");
  var comments = getValue("WKUserComment");

  if (comments && comments != '') {
    if (Params.atividades.aprovarGerMarketing.indexOf(Number(sequenceId)) >= 0) {
      if (Params.atividades.validarMarketing.indexOf(Number(nextSequenceId)) >= 0) {
        hAPI.setCardValue("obsAprovGerMarketing", getValue("WKUserComment"));
      }
    }

    if (Params.atividades.aprovarPresidencia.indexOf(Number(sequenceId)) >= 0) {
      if (Params.atividades.revisarSolicitacao.indexOf(Number(nextSequenceId)) >= 0) {
        hAPI.setCardValue("obsAprovPresidenciaVp", getValue("WKUserComment"));
      }
    }

    if (Params.atividades.aprovarVerbaMaior.indexOf(Number(sequenceId)) >= 0) {
      if (Params.atividades.validarEvidencias.indexOf(Number(nextSequenceId)) >= 0) {
        hAPI.setCardValue("obsAprovVerbaMaior", getValue("WKUserComment"));
      }
    }

    if (Params.atividades.aprovarVerbaMenor.indexOf(Number(sequenceId)) >= 0) {
      if (Params.atividades.validarEvidencias.indexOf(Number(nextSequenceId)) >= 0) {
        hAPI.setCardValue("obsAprovVerbaMenor", getValue("WKUserComment"));
      }
    }

    if (Params.atividades.aprovarPagamento.indexOf(Number(sequenceId)) >= 0) {
      if (Params.atividades.conferirFinanceiro.indexOf(Number(nextSequenceId)) >= 0) {
        hAPI.setCardValue("obsAprovPagamento", getValue("WKUserComment"));
      }
    }

    if (Params.atividades.gerarAbatimentos.indexOf(Number(nextSequenceId)) >= 0) {
      notificaAprovacaoPagamento();
    }
  }
}
