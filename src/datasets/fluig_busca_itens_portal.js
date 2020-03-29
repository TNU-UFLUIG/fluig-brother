let campos;
let display = ['item'];
let dePara = ['item', 'qtde', 'rebateTotal'];

function createDataset(fields, constraints, sortFields) {
  return buscaDataset(fields, constraints, sortFields);
}

function onMobileSync(user) {

}

function buscaDataset(fields, constraints, sortFields) {
  let params = getConstraints(constraints);

  let dsSolicitacao = getDataset('marketing_abertura_verba', null, [
    { field: 'guid', value: params.guid },
  ]);

  let dsItens = getDataset('marketing_abertura_verba', null, [
    { field: 'documentid', value: dsSolicitacao[0].documentid },
    { field: 'tablename', value: 'itensSellout' }
  ]);

  campos = ['itemSellout_item', 'itemSellout_qtde', 'itemSellout_rebateTotal'];

  return montaDataset(null, dsItens, campos, display, dePara);
}

/*$$ partials/getConstraintsParams.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/
/*$$ partials/getDataset.js $$*/

function jsonLocal() {
  return {
    ttValores: [
      { netInicial: 100, netSugerido: 120, gpInicial: 130, gpSugerido: 140, dolar: 5 }
    ]
  };
}