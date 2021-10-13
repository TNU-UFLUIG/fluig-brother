function defineStructure() {
}

function onSync(lastSyncDate) {
  createDataset();
}

function createDataset(fields, constraints, sortFields) {
  let logSeq = 0;

  const dataset = DatasetBuilder.newDataset();

  const campos = ['to', 'subject'];
  const sdk = new javax.naming.InitialContext().lookup('java:global/fluig/wcm-core/service/SDK');

  campos.forEach(campo => dataset.addColumn(campo));

  const params = getConstraints(constraints);
  // constraints:
  // email = se necessário enviar apenas para um e-mail. Se enviar em branco, será enviado para todos.

  const dsUsuarios = getDataset('marketing_usuario');
  const dsComposicao = getDataset('marketing_composicao_email')[0];

  let usuarios = [];

  if (params.email) {
    let usuario = dsUsuarios.filter(u => String(u.email) === String(params.email))[0];
    if (usuario) {
      usuarios.push(usuario);
    }
  } else {
  }

  usuarios.forEach((usuario) => {
    const tplParams = new java.util.HashMap();
    tplParams.put('link', `${sdk.getServerURL()}/acao-marketing-cliente#!/resumo/${usuario.guid}`);
    tplParams.put('subject', dsComposicao.resumoVerbasTitulo);
    tplParams.put('titulo', dsComposicao.resumoVerbasTitulo);
    tplParams.put('textoPadrao', dsComposicao.resumoVerbasTexto);
    // tplParams.put('solicitacao', tplArrSolicitacoes);


    dataset.addRow([usuario.email, 'Ações de Marketing Brother']);

    const arrDestinatarios = new java.util.ArrayList();
    arrDestinatarios.add(usuario.email);

    notifier.notify('admin', 'brother_notificacao_marketing', tplParams, arrDestinatarios, 'text/html');
  });

  return dataset;
}

function onMobileSync(user) {

}

/*$$ partials/getDataset.js $$*/
/*$$ partials/getConstraintsParams.js $$*/
