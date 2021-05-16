// Atualizar Status
function intermediateconditional132() {
  var pendenteTotvs = hAPI.getCardValue("pendenteTotvs");

  if (pendenteTotvs == "S") {
    return false;
  }

  var solicitacao = hAPI.getCardValue("solicitacao");
  var ultimo = false;

  log.info("@@@@@@@@@@@@ marketing_abertura_verba atualizaStatus() solicitacao: " + solicitacao);

  var csSolicitacao = DatasetFactory.createConstraint("solicitacao", solicitacao, solicitacao, ConstraintType.MUST);

  var dsAtualizaStatus = DatasetFactory.getDataset("totvs_retorna_status_marketing", null, [csSolicitacao], null);

  if (dsAtualizaStatus) {
    for (var i = 0; i < dsAtualizaStatus.rowsCount; i++) {

      log.info("@@@@@@@@@@@@ marketing_abertura_verba atualizaStatus() dsAtualizaStatus i: " + i);
      log.info("@@@@@@@@@@@@ marketing_abertura_verba atualizaStatus() dsAtualizaStatus solicitacao: " + dsAtualizaStatus.getValue(i, "solicitacao"));
      log.info("@@@@@@@@@@@@ marketing_abertura_verba atualizaStatus() dsAtualizaStatus descricao: " + dsAtualizaStatus.getValue(i, "descricao"));
      log.info("@@@@@@@@@@@@ marketing_abertura_verba atualizaStatus() dsAtualizaStatus data: " + dsAtualizaStatus.getValue(i, "data"));
      log.info("@@@@@@@@@@@@ marketing_abertura_verba atualizaStatus() dsAtualizaStatus ultimo: " + dsAtualizaStatus.getValue(i, "ultimo"));

      if (hAPI.getCardValue("statusErp_descricao___" + String(i + 1)) != null) {
        hAPI.setCardValue("statusErp_descricao___" + String(i + 1), String(dsAtualizaStatus.getValue(i, "descricao")));
        hAPI.setCardValue("statusErp_data___" + String(i + 1), String(dsAtualizaStatus.getValue(i, "data")));
        hAPI.setCardValue("statusErp_ultimo___" + String(i + 1), String(dsAtualizaStatus.getValue(i, "ultimo")));
      } else {
        var childData = new java.util.HashMap();
        childData.put("statusErp_descricao", String(dsAtualizaStatus.getValue(i, "descricao")));
        childData.put("statusErp_data", String(dsAtualizaStatus.getValue(i, "data")));
        childData.put("statusErp_ultimo", String(dsAtualizaStatus.getValue(i, "ultimo")));
        
        hAPI.addCardChild("statusErp", childData);
      }

      if (dsAtualizaStatus.getValue(i, "ultimo") == "S") {
        ultimo = true;
      }
    }
  }

  return ultimo;
}