// Notificar Cliente (Início da Ação)
function servicetask31(attempt, message) {
  try {
    enviaEmail('iniAcao', 'N', 'S');
  } catch(error) {
    throw error;
  }
  
}