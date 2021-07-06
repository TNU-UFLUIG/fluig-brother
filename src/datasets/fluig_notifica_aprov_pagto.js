function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {

  let logSeq = 0;

  const dataset = DatasetBuilder.newDataset();

  const campos = ['to', 'subject'];
  const sdk = new javax.naming.InitialContext().lookup('java:global/fluig/wcm-core/service/SDK');

  campos.forEach(campo => dataset.addColumn(campo));

  const params = getConstraints(constraints);
  // constraints:
  // solicitacoes = 3245|3247|3250
  // tipo = iniAcao / fimAcao / evidencia / envioND / pagamento / cancelamento / vales
  // email = se necessário enviar apenas para um e-mail
  // enviaBrother / enviaExecutivo / enviaCliente

  if (!params.solicitacao) {
    throw 'Informe o código da solicitação';
  }

  const dsSolicitacao = getDataset('marketing_abertura_verba', null, [
    { field: 'solicitacao', value: String(params.solicitacao) }
  ])[0];

  if (dsSolicitacao) {
    const tplParams = new java.util.HashMap();
    const arrDestinatarios = new java.util.ArrayList();
    const texto = `O pagamento da ação ${dsSolicitacao.solicitacao} do cliente ${dsSolicitacao.clienteNome} foi aprovado. Clique abaixo para acessa-la`;
    const titulo = `Pagamento da ação ${dsSolicitacao.solicitacao} aprovado`;

    tplParams.put('subject', titulo);
    tplParams.put('titulo', titulo);
    tplParams.put('textoPadrao', texto);
    tplParams.put('link', `${sdk.getServerURL()}/portal/p/BROTHER/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=${dsSolicitacao.solicitacao}`);
    
    log.info(`dsSolicitacao.userFinanceiro = ${dsSolicitacao.userFinanceiro}`);

    dsSolicitacao.userFinanceiro = JSON.parse(String(dsSolicitacao.userFinanceiro));

    log.info(`dsSolicitacao.userFinanceiro.mail = ${dsSolicitacao.userFinanceiro.mail}`);

    arrDestinatarios.add(dsSolicitacao.userFinanceiro.mail);
    arrDestinatarios.add('alexson.ferreira@totvspartners.com.br');

    log.info(`fluig_notifica_acao_marketing ${logSeq += 1}`);

    if (arrDestinatarios.size() > 0) {
      for (let i = 0; i < arrDestinatarios.size(); i += 1) {
        dataset.addRow([String(arrDestinatarios.get(i)), titulo]);
      }

      notifier.notify('admin', 'brother_notificacao_marketing', tplParams, arrDestinatarios, 'text/html');
    }
  } else {
    throw 'Solicitação não encontrada';
  }

  return dataset;
}

function onMobileSync(user) {

}

/*$$ partials/getDataset.js $$*/
/*$$ partials/getConstraintsParams.js $$*/
