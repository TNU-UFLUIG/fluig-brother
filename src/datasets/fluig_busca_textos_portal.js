let campos = [`portalDadosTexto`, `portalEvidenciasTexto`, `portalNDTexto`, `portalPagamentoTexto`];
let display = campos;
let dePara = campos;


function createDataset(fields, constraints, sortFields) {
  return buscaDataset(fields, constraints, sortFields);
}

function onMobileSync(user) {

}

function buscaDataset(fields, constraints, sortFields) {
  let params = getConstraints(constraints);

  let dsComposicalEmail = getDataset(`marketing_composicao_email`, null, [

  ]);

  return montaDataset(null, dsComposicalEmail, campos, display, dePara);
}

/*$$ partials/getConstraintsParams.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/
/*$$ partials/getDataset.js $$*/
