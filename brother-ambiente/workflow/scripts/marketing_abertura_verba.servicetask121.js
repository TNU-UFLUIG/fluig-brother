// Gerar Abatimentos / Descontos
function servicetask121(attempt, message) {
  var solicitacao = hAPI.getCardValue("solicitacao");

  log.info("@@@@@@@@@@@@ marketing_abertura_verba servicetask121() solicitacao: " + solicitacao);

  var csSolicitacao = DatasetFactory.createConstraint("solicitacao", solicitacao, solicitacao, ConstraintType.MUST);

  var dsIntegraTitulo = DatasetFactory.getDataset("totvs_cria_titulo_antecipacao", null, [csSolicitacao], null);

  if (dsIntegraTitulo) {
    if (dsIntegraTitulo.rowsCount == 0) {

      log.info("@@@@@@@@@@@@ marketing_abertura_verba servicetask121() dsIntegraTitulo rowsCount 0 ");

      throw("Não foi possível gerar os títulos de pagamento no ERP");

    } else {
      for (var i = 0; i < dsIntegraTitulo.rowsCount; i++) {

        log.info("@@@@@@@@@@@@ marketing_abertura_verba servicetask121() dsIntegraTitulo i: " + i);
        log.info("@@@@@@@@@@@@ marketing_abertura_verba servicetask121() dsIntegraTitulo codEstab: " + dsIntegraTitulo.getValue(i, "codEstab"));
        log.info("@@@@@@@@@@@@ marketing_abertura_verba servicetask121() dsIntegraTitulo codEspec: " + dsIntegraTitulo.getValue(i, "codEspec"));
        log.info("@@@@@@@@@@@@ marketing_abertura_verba servicetask121() dsIntegraTitulo codSerie: " + dsIntegraTitulo.getValue(i, "codSerie"));
        log.info("@@@@@@@@@@@@ marketing_abertura_verba servicetask121() dsIntegraTitulo numTitulo: " + dsIntegraTitulo.getValue(i, "numTitulo"));
        log.info("@@@@@@@@@@@@ marketing_abertura_verba servicetask121() dsIntegraTitulo parcela: " + dsIntegraTitulo.getValue(i, "parcela"));
        log.info("@@@@@@@@@@@@ marketing_abertura_verba servicetask121() dsIntegraTitulo valorTotal: " + dsIntegraTitulo.getValue(i, "valorTotal"));
        log.info("@@@@@@@@@@@@ marketing_abertura_verba servicetask121() dsIntegraTitulo erro: " + dsIntegraTitulo.getValue(i, "erro"));

        if (dsIntegraTitulo.getValue(i, "erro")) {
          throw dsIntegraTitulo.getValue(i, "erro");
        }
      }
    }
  } else {
    log.info("@@@@@@@@@@@@ marketing_abertura_verba servicetask121() !dsIntegraTitulo");

    throw("Não foi possível gerar os títulos de pagamento no ERP");

  }
}