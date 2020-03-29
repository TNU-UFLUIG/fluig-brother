const campos = ['retorno'];
const display = ['retorno'];
const dePara = ['retorno'];


function defineStructure() {
  for (let i = 0; i < dePara.length; i++) {
    addColumn(dePara[i]);
  }
  addColumn('displaykey');

  setKey(['retorno']);

  addIndex(['retorno']);
}

function onSync(lastSyncDate) {
  return buscaDataset();
}

function createDataset(fields, constraints, sortFields) {
  return buscaDataset(fields, constraints, sortFields);
}

function onMobileSync(user) {

}

function buscaDataset(fields, constraints, sortFields) {
  let params = getConstraints(constraints);

  let solicitacao = getDataset('marketing_abertura_verba', null, [
    { field: 'solicitacao', value: params.solicitacao }
  ])[0];

  // busca filhos e monta params 

  params = {
    ttParam: [],
    ttRateioCategoria: [],
    ttSellout: [],
    ttSellinItem: [],
    ttSellinTarget: [],
    ttSpiffItem: [],
    ttSpiffTarget: [],
    ttVpcEvt: [],
    ttVpcOutros: []
  }

  var properties = {};
  properties["receive.timeout"] = "0";

  // const json = jsonLocal();
  const json = callDatasul("atualizaFluxoMarketing.p", "piBusca", params, null, properties);

  return montaDataset(json.ttErro, json.ttStatus, campos, display);
}

/*$$ partials/getConstraintsParams.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/

function jsonLocal() {
  return {
    ttStatus: [
      { retorno: 'OK' }
    ]
  };
}