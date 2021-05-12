function checkValor30k() {

	var dsParametros = DatasetFactory.getDataset("marketing_parametros", null, [], null);
	var limiteResultado = 30000;

  if (dsParametros) {
		limiteResultado = Number(dsParametros.getValue(0, "limiteResultado"));
  }

	var valorLiberado = Number(hAPI.getCardValue("valorLiberado"));
	var valorTotalVerba = Number(hAPI.getCardValue("valorTotalVerba"));
	var diferencaResultado = valorLiberado - valorTotalVerba;

	if (diferencaResultado >= limiteResultado) {
		return "maior";
	} else {
		if (diferencaResultado > 0 && diferencaResultado < limiteResultado) {
			return "ate";
		}
	}

	return "";
}
