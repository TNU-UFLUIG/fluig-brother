// Notificar Grupo Brother (Fim da Ação)
function servicetask41(attempt, message) {
  try {
    hAPI.setCardValue("notificaGrupoBrotherFimAcao", "S");
    // enviaEmail('fimAcao', 'S', 'N');
  } catch(error) {
    throw error;
  }
}