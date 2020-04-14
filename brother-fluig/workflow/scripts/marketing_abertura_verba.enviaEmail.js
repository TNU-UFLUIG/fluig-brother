function enviaEmail(tipo, enviaBrother, enviaCliente) {

  var solicitacao = hAPI.getCardValue("solicitacao");

  log.info("@@@@@@@@@@@@ marketing_abertura_verba enviaEmail() solicitacao: " + solicitacao);

  var csSolicitacao = DatasetFactory.createConstraint("solicitacoes", solicitacao, solicitacao, ConstraintType.MUST);
  var csTipo = DatasetFactory.createConstraint("tipo", tipo, tipo, ConstraintType.MUST);
  var csEnviaBrother = DatasetFactory.createConstraint("enviaBrother", enviaBrother, enviaBrother, ConstraintType.MUST);
  var csEnviaCliente = DatasetFactory.createConstraint("enviaCliente", enviaCliente, enviaCliente, ConstraintType.MUST);

  var dsEnviaEmail = DatasetFactory.getDataset("fluig_notifica_acao_marketing", null, [csSolicitacao, csTipo, csEnviaBrother, csEnviaCliente], null);

  if (dsEnviaEmail) {
    for (var i = 0; i < dsEnviaEmail.rowsCount; i++) {

      log.info("@@@@@@@@@@@@ marketing_abertura_verba enviaEmail() dsEnviaEmail i: " + i);
      log.info("@@@@@@@@@@@@ marketing_abertura_verba enviaEmail() dsEnviaEmail to: " + dsEnviaEmail.getValue(i, "to"));
      log.info("@@@@@@@@@@@@ marketing_abertura_verba enviaEmail() dsEnviaEmail subject: " + dsEnviaEmail.getValue(i, "subject"));
    }
  }
}