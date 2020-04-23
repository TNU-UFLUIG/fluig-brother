// Notificar Cliente (Início da Ação)
function servicetask31(attempt, message) {
  try {
    enviaEmail('iniAcao', 'N', 'S', 'S');
  } catch(error) {
    throw error;
  }
  
}