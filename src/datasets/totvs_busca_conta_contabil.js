const campos = ['codigo', 'descricao'];
const display = ['codigo', 'descricao'];
const dePara = ['codigo', 'descricao'];


function defineStructure() {
  for (let i = 0; i < dePara.length; i++) {
    addColumn(dePara[i]);
  }
  addColumn('displaykey');

  setKey(['codigo']);

  addIndex(['codigo']);
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
  const json = callDatasul("esp/buscaContaContabil.p", "piBusca", params, null, properties);

  return montaDataset(json.ttErro, json.ttContaContabil, campos, display, null, true);
}

/*$$ partials/getConstraints.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/

function jsonLocal() {
  return {
    ttContaContabil: [
      { codigo: '100.100.100', descricao: 'CONTA TESTE' }
    ]
  };
}