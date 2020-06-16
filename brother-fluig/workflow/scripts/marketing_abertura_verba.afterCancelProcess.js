function afterCancelProcess(colleagueId, processId) {
  hAPI.setCardValue("status", "CANCELADA");
  hAPI.setCardValue("motivoCancelamento", getValue("WKUserComment"));
  hAPI.setCardValue("pendenteTotvs", "S");
}