function checkValor30k() {
	var diferencaResultado = Number(hAPI.getCardValue('diferencaResultado'));
	if (diferencaResultado >= 30000) {
		return 'maior';
	} else {
		if (diferencaResultado > 0 && diferencaResultado < 30000) {
			return 'ate';
		} else {
			return ''
		}
	}
}
