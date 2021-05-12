//Aguardando Fim da Ação
function intermediateconditional129() {

	var anteciparEncerramento = String(hAPI.getCardValue("anteciparEncerramento"));

	if (anteciparEncerramento == "true") {
		return true;
	}

	var terminoAcao = new Date(Number(hAPI.getCardValue("terminoAcao")));

	var hoje = new Date();

	log.info("intermediateconditional129 getDate() = " + String(terminoAcao.getDate()) + " | " + String(hoje.getDate()));
	log.info("intermediateconditional129 getMonth() = " + String(terminoAcao.getMonth()) + " | " + String(hoje.getMonth()));
	log.info("intermediateconditional129 getFullYear() = " + String(terminoAcao.getFullYear()) + " | " + String(hoje.getFullYear()));

	if ((terminoAcao.getDate() <= hoje.getDate() && terminoAcao.getMonth() == hoje.getMonth() && terminoAcao.getFullYear() == hoje.getFullYear()) ||
		(terminoAcao.getFullYear() < hoje.getFullYear()) ||
		(terminoAcao.getFullYear() == hoje.getFullYear() && terminoAcao.getMonth() < hoje.getMonth())) {
		return true;
	}

	return false;
}