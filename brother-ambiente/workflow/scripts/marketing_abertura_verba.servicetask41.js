// Notificar Grupo Brother (Fim da Ação)
function servicetask41(attempt, message) {
  try {
    hAPI.setCardValue("notificaGrupoBrotherFimAcao", "S");
    enviaEmail('fimAcao', 'N', 'N', 'S');
  } catch(error) {
    throw error;
  }
}