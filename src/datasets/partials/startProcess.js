function startProcess(user, password, processCode, campos, values, atividadeDestino, obs, colleagueId) {
    const company = 1,
        workServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService"),
        workServiceLocator = workServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService"),
        workService = workServiceLocator.getWorkflowEngineServicePort(),
        processAttachmentDtoArray = workServiceProvider.instantiate('com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray'),
        processTaskAppointmentDtoArray = workServiceProvider.instantiate('com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray'),
        cardData = workServiceProvider.instantiate('net.java.dev.jaxb.array.StringArrayArray');

    user = user || 'adm';
    password = password || 'M&str@N@d@';

    campos.forEach(campo => {
        // log.info(campo);
        // log.info(values[campo]);
        var field = workServiceProvider.instantiate('net.java.dev.jaxb.array.StringArray');

        field.getItem().add(campo.toString());
        field.getItem().add(values[campo].toString());

        cardData.getItem().add(field);
    })

    // log.info('$$$ colleagueId: ' + colleagueId);

    var colleagueIds = workServiceProvider.instantiate('net.java.dev.jaxb.array.StringArray');
    // // colleagueIds.getItem().add(colleagueId);
    // colleagueIds.getItem().add("System:Auto");

    // colleagueIds.add("System:Auto");

    // var retorno = workServiceProvider.instantiate('net.java.dev.jaxb.array.StringArrayArray');
    var retorno = workService.startProcess(user, password, parseInt(company), processCode, atividadeDestino,
        colleagueIds, obs, user, true, processAttachmentDtoArray, cardData, processTaskAppointmentDtoArray, false);
    // var retorno = workService.simpleStartProcess(user, password, parseInt(company), processCode, obs, processAttachmentDtoArray, cardData);

    let solicitacao;

    for (var r = 0; r < retorno.getItem().size(); r++) {
        if (retorno.getItem().get(r).getItem().get(0) == "iProcess") {
            solicitacao = retorno.getItem().get(r).getItem().get(1);
        }
    }

    return solicitacao;
}