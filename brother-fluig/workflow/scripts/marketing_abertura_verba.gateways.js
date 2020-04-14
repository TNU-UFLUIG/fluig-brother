function checkValor30k() {

	var dsParametros = DatasetFactory.getDataset("marketing_parametros", null, [], null);
	var limiteResultado = 30000;

  if (dsParametros) {
		limiteResultado = Number(dsParametros.getValue(0, "limiteResultado"));
  }

	var diferencaResultado = Number(hAPI.getCardValue("diferencaResultado"));
	if (diferencaResultado >= limiteResultado) {
		return "maior";
	} else {
		if (diferencaResultado > 0 && diferencaResultado < limiteResultado) {
			return "ate";
		}
	}

	return "";
}
