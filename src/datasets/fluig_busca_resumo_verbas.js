const campos = ['documentid', 'solicitacao', 'nomeAcao', 'prazoVencto', 'tipoAcaoDescricao', 'produtosCodigos', 'clienteCodigo', 'clienteNome', 'inicioAcao', 'terminoAcao', 'status', 'guid'];
const display = ['solicitacao'];
const dePara = campos;

function createDataset(fields, constraints, sortFields) {
  return buscaDataset(fields, constraints, sortFields);
}

function onMobileSync(user) {

}

function buscaDataset(fields, constraints, sortFields) {
  let params = getConstraints(constraints);

  let dsSolicitacoes = [];
  let dsParams;

  let dsUsuario = getDataset('marketing_usuario', null, [
    { field: 'guid', value: params.guid }
  ])[0];

  let dsUsuarioCliente = getDataset('marketing_cliente', null, [
    { field: 'contato_email', value: dsUsuario.email },
    { field: 'contato_resumo', value: 'true' },
    { field: 'tablename', value: 'contatos' }
  ]);

  dsParams = dsUsuarioCliente.map((c) => {
    return { field: 'documentid', value: c.documentid, type: ConstraintType.SHOULD };
  });

  let dsClientes = getDataset('marketing_cliente', null, dsParams);

  dsParams = dsClientes.map((c) => {
    return { field: 'clienteCodigo', value: c.clienteCodigo, type: ConstraintType.SHOULD };
  });

  if (dsParams.length > 0) {
    dsSolicitacoes = getDataset('marketing_abertura_verba', null, dsParams);

    dsSolicitacoes = dsSolicitacoes.filter(s => s.status == 'ENVIO DE ND' || s.status == 'ENVIO DE EVIDÊNCIAS');

    dsSolicitacoes.forEach(s => {
      s.produtosCodigos = '';
      if (s.tipoAcaoCodigo == 'sellout' && (s.tipoSellout == 'srp' || !s.tipoSellout || s.tipoSellout == '')) {
        const dsItens = getDataset('marketing_abertura_verba', null, [
          { field: 'documentid', value: s.documentid },
          { field: 'tablename', value: 'itensSellout' }
        ]);
        s.produtosCodigos = dsItens.map(i => i.itemSellout_itemCodigo).join(', ');
      }

      if (s.tipoAcaoCodigo == 'sellin' && (s.tipoSellin == 'item')) {
        const dsItens = getDataset('marketing_abertura_verba', null, [
          { field: 'documentid', value: s.documentid },
          { field: 'tablename', value: 'itensSellinIt' }
        ]);
        s.produtosCodigos = dsItens.map(i => i.itemSellinIt_itemCodigo).join(', ');
      }

      if (s.tipoAcaoCodigo == 'spiff' && (s.tipoSpiff == 'item')) {
        const dsItens = getDataset('marketing_abertura_verba', null, [
          { field: 'documentid', value: s.documentid },
          { field: 'tablename', value: 'itensSpiffIt' }
        ]);
        s.produtosCodigos = dsItens.map(i => i.itemSpiffIt_itemCodigo).join(', ');
      }
    });
  }

  return montaDataset(null, dsSolicitacoes, campos, display);
}

/*$$ partials/getConstraintsParams.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/
/*$$ partials/getDataset.js $$*/
