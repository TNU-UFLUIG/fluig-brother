const campos = ['netInicial', 'netSugerido', 'gpInicial', 'gpSugerido', 'dolar'];
const display = campos;
const dePara = campos;


function defineStructure() {
  for (let i = 0; i < dePara.length; i++) {
    addColumn(dePara[i]);
  }
  addColumn('displaykey');

  setKey(['displaykey']);

  addIndex(['displaykey']);
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

  var properties = {};
  properties["receive.timeout"] = "0";

  // const json = jsonLocal();
  let json;
  try {
    json = callDatasul("esp/calculaItemMarketing.p", "piCalcula", params, null, properties);
  } catch (error) {
    json = { ttErro: [{ mensagem: String(error) }] }
  }


  return montaDataset(json.ttErro, json.ttValores, campos, display);
}

/*$$ partials/getConstraints.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/

function jsonLocal() {
  return {
    ttValores: [
      { netInicial: 1000, netSugerido: 1200, gpInicial: 0.2, gpSugerido: 0.2, dolar: 5 }
    ]
  };
}