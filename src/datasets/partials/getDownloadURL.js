function getDownloadURL(documentId) {
  
  // log.info('getDownloadURL inicio');

  // log.info('documentId ' + String(documentId));

  var clientService = fluigAPI.getAuthorizeClientService();
  var data = {
    companyId: getValue("WKCompany") + '',
    serviceCode: 'fluig-post',
    endpoint: '/api/public/2.0/documents/getDownloadURL/' + documentId,
    method: 'get',
    timeoutService: '100',
  }

  // log.info(JSON.stringify(data));

  var vo = clientService.invoke(JSON.stringify(data));

  // log.info(vo.getResult());
  // log.info(JSON.parse(vo.getResult()).content);

  // log.info('getDownloadURL fim');

  return JSON.parse(vo.getResult()).content;

}