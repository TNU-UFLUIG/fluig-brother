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

  if (dsParams.length > 0) {

    let dsClientes = getDataset('marketing_cliente', null, dsParams);

    dsParams = dsClientes.map((c) => {
      return { field: 'clienteCodigo', value: c.clienteCodigo, type: ConstraintType.SHOULD };
    });

    if (dsParams.length > 0) {
      dsSolicitacoes = getDataset('marketing_abertura_verba', null, dsParams);

      dsSolicitacoes = dsSolicitacoes.filter(s => s.status == 'ENVIO DE ND' || s.status == 'ENVIO DE EVIDÊNCIAS' || s.status == 'AGUARDANDO FIM DA AÇÃO' || s.status == 'AGUARDANDO AUTORIZAÇÃO DE TÉRMINO');

      dsSolicitacoes.forEach(s => {
        s.produtosCodigos = '';
        if (s.tipoAcaoCodigo == 'sellout') {
          const dsItens = getDataset('marketing_abertura_verba', null, [
            { field: 'documentid', value: s.documentid },
            { field: 'tablename', value: 'itensSellout' }
          ]);
          if (s.tipoSellout == 'srp' || s.tipoSellout == 'net' || !s.tipoSellout || s.tipoSellout == '') {
            s.produtosCodigos = dsItens.map(i => i.itemSellout_itemCodigo).join(', ');
          } else {
            s.produtosCodigos = dsItens.map(i => i.itemSellout_target).join(', ');
          }        
        }

        if (s.tipoAcaoCodigo == 'sellin' && (s.tipoSellin == 'item')) {
          const dsItens = getDataset('marketing_abertura_verba', null, [
            { field: 'documentid', value: s.documentid },
            { field: 'tablename', value: 'itensSellinIt' }
          ]);
          s.produtosCodigos = dsItens.map(i => i.itemSellinIt_itemCodigo).join(', ');
        }

        if (s.tipoAcaoCodigo == 'sellin' && (s.tipoSellin == 'target')) {
          const dsItens = getDataset('marketing_abertura_verba', null, [
            { field: 'documentid', value: s.documentid },
            { field: 'tablename', value: 'itensSellinTg' }
          ]);
          s.produtosCodigos = dsItens.map(i => i.itemSellinTg_descricao).join(', ');
        }

        if (s.tipoAcaoCodigo == 'spiff' && (s.tipoSpiff == 'item')) {
          const dsItens = getDataset('marketing_abertura_verba', null, [
            { field: 'documentid', value: s.documentid },
            { field: 'tablename', value: 'itensSpiffIt' }
          ]);
          s.produtosCodigos = dsItens.map(i => i.itemSpiffIt_itemCodigo).join(', ');
        }

        if (s.tipoAcaoCodigo == 'spiff' && (s.tipoSpiff == 'target')) {
          const dsItens = getDataset('marketing_abertura_verba', null, [
            { field: 'documentid', value: s.documentid },
            { field: 'tablename', value: 'itensSpiffTg' }
          ]);
          s.produtosCodigos = dsItens.map(i => i.itemSpiffTg_foco).join(', ');
        }

        if (s.tipoAcaoCodigo == 'vpc' && (s.tipoVpc == 'eventos')) {
          const dsItens = getDataset('marketing_abertura_verba', null, [
            { field: 'documentid', value: s.documentid },
            { field: 'tablename', value: 'itensVpcEvt' }
          ]);
          s.produtosCodigos = dsItens.map(i => i.itemVpcEvt_nomeEvento).join(', ');
        }

        if (s.tipoAcaoCodigo == 'vpc' && (s.tipoVpc == 'outros')) {
          const dsItens = getDataset('marketing_abertura_verba', null, [
            { field: 'documentid', value: s.documentid },
            { field: 'tablename', value: 'itensVpcOutros' }
          ]);
          s.produtosCodigos = dsItens.map(i => i.itemVpcOutros_tipo).join(', ');
        }
      });
    }
  }

  return montaDataset(null, dsSolicitacoes, campos, display);
}

/*$$ partials/getConstraintsParams.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/
/*$$ partials/getDataset.js $$*/
