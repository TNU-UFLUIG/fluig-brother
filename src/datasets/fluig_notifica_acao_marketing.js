function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {

  const dataset = DatasetBuilder.newDataset();

  const campos = ['to', 'subject'];
  const sdk = new javax.naming.InitialContext().lookup('java:global/fluig/wcm-core/service/SDK');

  campos.forEach(campo => dataset.addColumn(campo));

  const params = getConstraints(constraints);
  // constraints:
  // solicitacoes = 3245|3247|3250
  // tipo = iniAcao / fimAcao / evidencia / envioND / pagamento / cancelamento

  if (!params.solicitacoes) {
    throw 'Informe o código da solicitação';
  }

  if (!params.tipo) {
    throw "Informe o tipo do e-mail";
  }

  const filtros = [];

  params.solicitacoes = String(params.solicitacoes).split('|');

  params.solicitacoes.forEach((solicitacao) => {
    filtros.push({ field: 'solicitacao', value: String(solicitacao), type: ConstraintType.SHOULD })
  })

  const tables = [
    { name: 'itensSellout', title: 'Sellout', tableCampos: 'camposSellout', campoName: 'campoSellout' },
    { name: 'arquivosND', title: 'Nota de Débito', tableCampos: 'camposND', campoName: 'campoND' },
    { name: 'arquivosEvidencias', title: 'Evidências', tableCampos: 'camposEvidencias', campoName: 'campoEvidencia' },
    { name: 'duplicatas', title: 'Duplicatas', tableCampos: 'camposDuplicatas', campoName: 'campoDuplicata' },
    { name: 'itensSellinIt', title: 'Sellin (Itens)', tableCampos: 'camposSellinIt', campoName: 'campoSellinIt' },
    { name: 'itensSellinTg', title: 'Sellin (Target)', tableCampos: 'camposSellinTg', campoName: 'campoSellinTg' },
    { name: 'itensSellinTgAc', title: 'Sellin (Aceleradores)', tableCampos: 'camposSellinTgAc', campoName: 'campoSellinTgAc' },
    { name: 'itensSpiffIt', title: 'Spiff (Itens)', tableCampos: 'camposSpiffIt', campoName: 'campoSpiffIt' },
    { name: 'itensSpiffTg', title: 'Spiff (Target)', tableCampos: 'camposSpiffTg', campoName: 'campoSpiffTg' },
    { name: 'itensVpcEvt', title: 'VPC (Eventos)', tableCampos: 'camposVpcEvt', campoName: 'campoVpcEvt' },
    { name: 'itensVpcOutros', title: 'VPC (Outros)', tableCampos: 'camposVpcOutros', campoName: 'campoVpcOutros' }];

  const dsSolicitacoes = getDataset('marketing_abertura_verba', null, filtros);
  const dsComposicao = getDataset('marketing_composicao_email')[0];
  const dsCamposSolicitacao = getDataset('marketing_composicao_email', null, [{ field: 'tablename', value: 'campos' }]);
  const dsCampos = {};

  tables.forEach((table) => {
    dsCampos[table.name] = getDataset('marketing_composicao_email', null, [
      { field: 'tablename', value: table.tableCampos },
      { field: `${table.campoName}_${params.tipo}`, value: 'true' }
    ]);
  });

  const tplParams = new java.util.HashMap();
  const tplArrSolicitacoes = new java.util.ArrayList();
  const arrDestinatarios = new java.util.ArrayList();

  dsSolicitacoes.forEach((solicitacao) => {
    tables.forEach((table) => {
      solicitacao[table.name] = getDataset('marketing_abertura_verba', null, [
        { field: 'documentid', value: solicitacao.documentid },
        { field: 'tablename', value: table.name },
      ]);
    });

    const tplParamsSolicitacao = new java.util.HashMap();
    const tplArrCamposSolicitacao = new java.util.ArrayList();
    const tplArrTables = new java.util.ArrayList();

    dsCamposSolicitacao.forEach((c) => {
      if (String(c[`campo_${params.tipo}`]) == 'true') {
        const campo = new java.util.HashMap();

        campo.put('label', c.campo_label);
        campo.put('valor', String(solicitacao[c.campo_name]).replace(/(?:\r\n|\r|\n)/g, '<br>'));

        tplArrCamposSolicitacao.add(campo);
      }
    });

    tables.forEach((table) => {
      if (solicitacao[table.name].length > 0 && dsCampos[table.name].length > 0) {

        const tplTable = new java.util.HashMap();
        tplTable.put('title', table.title);

        const tplArrLabelsItens = new java.util.ArrayList();
        const tplArrItens = new java.util.ArrayList();

        solicitacao[table.name].forEach((item) => {
          const tplArrItem = new java.util.ArrayList();
          const tplItem = new java.util.HashMap();

          dsCampos[table.name].forEach(c => {
            if (tplArrItens.size() == 0) {
              var campo = new java.util.HashMap();
              campo.put('label', c[`${table.campoName}_label`]);
              tplArrLabelsItens.add(campo);
            }

            var campo = new java.util.HashMap();
            campo.put('valor', '<b>' + c[`${table.campoName}_label`] + ': </b> ' + String(item[c[`${table.campoName}_name`]]).replace(/(?:\r\n|\r|\n)/g, '<br>'));
            tplArrItem.add(campo);

          })

          tplItem.put('content', tplArrItem)
          tplArrItens.add(tplItem);

        })

        tplTable.put('labels', tplArrLabelsItens);
        tplTable.put('itens', tplArrItens);

        tplArrTables.add(tplTable);
      }
    });

    const linkPortalCliente = `${sdk.getServerURL()}/portal/BROTHER/acao-marketing-cliente#!/${solicitacao.guid}`;

    tplParamsSolicitacao.put('linkPortalCliente', linkPortalCliente);
    tplParamsSolicitacao.put('observacoes', String(solicitacao.obsNotificacaoCliente).replace(/(?:\r\n|\r|\n)/g, '<br>'));
    tplParamsSolicitacao.put('solicitacao', solicitacao.solicitacao);
    tplParamsSolicitacao.put('camposSolicitacao', tplArrCamposSolicitacao);
    tplParamsSolicitacao.put('tables', tplArrTables);

    tplArrSolicitacoes.add(tplParamsSolicitacao);

    dsDestinatariosCliente = [];

    arrDestinatarios.add('alexson_ferreira@hotmail.com');

    if (params.enviaExecutivo == 'S') {

      solicitacao.executivo = JSON.parse(solicitacao.executivo);

      if (solicitacao.executivo && solicitacao.executivo.email) {
        // arrDestinatarios.add(solicitacao.executivo.email);
      }
    }

    if (params.enviaCliente == 'S') {
      dsDestinatariosCliente = getDataset('marketing_abertura_verba', null, [
        { field: 'tablename', value: 'emailsCliente' },
        { field: 'documentid', value: solicitacao.documentid },
      ]);

      // log.info('dsDestinatariosCliente.length = ' + dsDestinatariosCliente.length);

      dsDestinatariosCliente.forEach(destinatario => {
        // log.info(`email_${params.tipo} => ` + destinatario[`email_${params.tipo}`]);

        if (String(destinatario[`email_${params.tipo}`]) == 'true') {
          // arrDestinatarios.add(destinatario.email_email);
        }
      })
    }
  })

  // log.info('tplArrSolicitacoes.size = ' + tplArrSolicitacoes.size());

  let txtSolicitacao = ' BROTHER | ';
  dsSolicitacoes.forEach((s) => {
    txtSolicitacao += `${s.solicitacao} | ${s.clienteNome} | ${s.nomeAcao} ${String(s.revisao) == 'true' ? ' | REVISÃO' : ''} | `;
  });

  tplParams.put('subject', dsComposicao[`${params.tipo}Titulo`] + txtSolicitacao);
  tplParams.put('titulo', dsComposicao[`${params.tipo}Titulo`]);
  tplParams.put('textoPadrao', dsComposicao[`${params.tipo}Texto`]);
  tplParams.put('solicitacoes', tplArrSolicitacoes);

  dsDestinatariosGrupoBrother = []

  if (params.enviaBrother == 'S') {
    dsDestinatariosGrupoBrother = getDataset('marketing_composicao_email', null, [
      { field: 'tablename', value: 'destinatarios' }
    ]);
  }

  dsDestinatariosGrupoBrother.forEach(destinatario => {
    if (String(destinatario[`email_${params.tipo}`]) == 'true') {
      // arrDestinatarios.add(destinatario.email_email);
    }
  });

  if (arrDestinatarios.size() > 0) {
    for (var i = 0; i < arrDestinatarios.size(); i++) {
      dataset.addRow([String(arrDestinatarios.get(i)), dsComposicao[`${params.tipo}Titulo`]]);
    }

    notifier.notify('admin', 'brother_notificacao_marketing', tplParams, arrDestinatarios, 'text/html');
  }

  return dataset;

}

function onMobileSync(user) {

}

/*$$ partials/getDataset.js $$*/
/*$$ partials/getConstraintsParams.js $$*/
