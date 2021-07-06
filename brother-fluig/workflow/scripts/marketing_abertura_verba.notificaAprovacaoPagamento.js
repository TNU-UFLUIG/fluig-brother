function notificaAprovacaoPagamento() {

  var solicitacao = hAPI.getCardValue("solicitacao");

  log.info("@@@@@@@@@@@@ marketing_abertura_verba notificaAprovacaoPagamento() solicitacao: " + solicitacao);

  var csSolicitacao = DatasetFactory.createConstraint("solicitacao", solicitacao, solicitacao, ConstraintType.MUST);

  var dsEnviaEmail = DatasetFactory.getDataset("fluig_notifica_aprov_pagto", null, [csSolicitacao], null);

  // if (dsEnviaEmail) {
  //   for (var i = 0; i < dsEnviaEmail.rowsCount; i++) {

  //     log.info("@@@@@@@@@@@@ marketing_abertura_verba enviaEmail() dsEnviaEmail i: " + i);
  //     log.info("@@@@@@@@@@@@ marketing_abertura_verba enviaEmail() dsEnviaEmail to: " + dsEnviaEmail.getValue(i, "to"));
  //     log.info("@@@@@@@@@@@@ marketing_abertura_verba enviaEmail() dsEnviaEmail subject: " + dsEnviaEmail.getValue(i, "subject"));
  //   }
  // }
}