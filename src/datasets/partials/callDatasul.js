function callDatasul(programa, metodo, json, tenantId, properties, usuario) {

  properties = properties || {};
  usuario = usuario || 'super';

  // log.info(`callDatasul usuario: ${usuario}`)

  const serviceProvider = ServiceManager.getServiceInstance('WSEXECBO');
  const serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
  const service = serviceLocator.getWebServiceExecBOPort();
  const client = serviceProvider.getCustomClient(service, "com.totvs.framework.ws.execbo.service.ExecBOServiceEndpoint", properties);

  if (!json.ttParam) {
    json.ttParam = [{}];
  }
  json.ttParam[0].tmpField = '';

  const input = {
    dsInput: json
  };

  const params = [{
    dataType: 'longchar',
    name: 'wsInput',
    value: JSON.stringify(input),
    type: 'input'
  }, {
    dataType: 'longchar',
    name: 'wsOutput',
    value: '',
    type: 'output'
  }];

  const jsonParams = JSON.stringify(params);

  // log.info('*** callDatasul');
  // log.info(jsonParams)

  const token = client.userLogin(usuario);

  let resp;

  if (tenantId) {
    resp = client.callProcedureWithTokenAndCompany(token, tenantId, programa, metodo, jsonParams);
  } else {
    resp = client.callProcedureWithToken(token, programa, metodo, jsonParams);
  }

  // Converte o resultado para um objeto
  const respObj = JSON.parse(resp);
  const value = respObj[0].value != '' ? JSON.parse(respObj[0].value) : '';

  let ret = client.logoutSession(token);

  log.info('Ret logoutSession = ' + ret)

  return value.dsOutput || value;
}
