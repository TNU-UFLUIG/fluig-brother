// Notificar Grupo Brother (Início da Ação)
function servicetask23(attempt, message) {
  try {
    enviaEmail('iniAcao', 'S', 'N', 'S');
  } catch(error) {
    throw error;
  }
  
}