function atualizaFormulario(empresa, usuario, senha, documentid, campos) {
  const cardServiceProvider = ServiceManager.getServiceInstance('ECMCardService');
  const cardServiceLocator = cardServiceProvider.instantiate('com.totvs.technology.ecm.dm.ws.ECMCardServiceService');
  const cardService = cardServiceLocator.getCardServicePort();
  const cardFieldDtoArray = cardServiceProvider.instantiate('com.totvs.technology.ecm.dm.ws.CardFieldDtoArray');

  let sequence = 0;

  campos.forEach((campo) => {
    const cardField = cardServiceProvider.instantiate('com.totvs.technology.ecm.dm.ws.CardFieldDto');

    cardField.setField(String(campo.name));
    cardField.setValue(String(campo.value || ''));
    cardFieldDtoArray.getItem()
      .add(sequence, cardField);

    sequence++;
  });

  cardService.updateCardData(empresa, usuario, senha, documentid, cardFieldDtoArray);
}
