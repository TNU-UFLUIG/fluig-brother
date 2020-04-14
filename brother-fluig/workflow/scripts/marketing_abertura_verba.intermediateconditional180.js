// Enviar Evidências via Portal
function intermediateconditional180() {
	log.info("******** intermediateconditional180");
	log.info(hAPI.getCardValue("envioEvidenciasConcluido"));
	return hAPI.getCardValue("envioEvidenciasConcluido") == "true";
}