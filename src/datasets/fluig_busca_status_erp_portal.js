let campos;
let display = [`statusErp_data`, `statusErp_descricao`];
let dePara = [`data`, `descricao`];


function createDataset(fields, constraints, sortFields) {
  return buscaDataset(fields, constraints, sortFields);
}

function onMobileSync(user) {

}

function buscaDataset(fields, constraints, sortFields) {
  let params = getConstraints(constraints);

  let dsSolicitacao = getDataset(`marketing_abertura_verba`, null, [
    { field: `guid`, value: params.guid },
  ]);

  let dsItens = getDataset(`marketing_abertura_verba`, null, [
    { field: `documentid`, value: dsSolicitacao[0].documentid },
    { field: `tablename`, value: `statusErp` }
  ]);

  campos = [`statusErp_data`, `statusErp_descricao`];

  return montaDataset(null, dsItens, campos, display, dePara);
}

/*$$ partials/getConstraintsParams.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/
/*$$ partials/getDataset.js $$*/
