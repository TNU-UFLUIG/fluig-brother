let campos;
let display;
let dePara;

function createDataset(fields, constraints, sortFields) {
  return buscaDataset(fields, constraints, sortFields);
}

function onMobileSync(user) {

}

function buscaDataset(fields, constraints, sortFields) {
  let params = getConstraints(constraints);

  let dsSolicitacao = getDataset(`marketing_abertura_verba`, null, [
    { field: `guid`, value: params.guid },
  ])[0];

  let dsItens;

  switch (dsSolicitacao.tipoAcaoCodigo) {
    case `sellout`:
      dsItens = getDataset(`marketing_abertura_verba`, null, [
        { field: `documentid`, value: dsSolicitacao.documentid },
        { field: `tablename`, value: `itensSellout` }
      ]);

      campos = [`itemSellout_item`, `itemSellout_qtde`, `itemSellout_rebateTotal`];
      dePara = [`item`, `qtde`, `rebateTotal`];
      display = [`item`];
      break;

    case `sellin`:

      if (dsSolicitacao.tipoSellin == `item`) {
        dsItens = getDataset(`marketing_abertura_verba`, null, [
          { field: `documentid`, value: dsSolicitacao.documentid },
          { field: `tablename`, value: `itensSellin` }
        ]);

        campos = [`itemSellin_item`, `itemSellin_qtde`, `itemSellin_rebateTotal`];
        dePara = [`item`, `qtde`, `rebateTotal`];
        display = [`item`];
      } else {

      }
      break;

    case `vpc`:

      break;

    case `spiff`:

      break;
  }

  if (dsSolicitacao.tipoAcaoCodigo == `sellout`) {

  } else {

  }

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