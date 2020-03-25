// Notificar Grupo Brother (Início da Ação)
function servicetask23(attempt, message) {
  try {
    enviaEmail('iniAcao', 'S', 'N');
  } catch(error) {
    throw error;
  }
  
}