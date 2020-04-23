const campos = ['codigo', 'descricao'];
const display = campos;
const dePara = campos;


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

  let json;

  try {
    // json = callDatasul("esp/buscaBusinessSegment.p", "piBusca", params, null, properties);
    json = jsonLocal();
  } catch (error) {
    throw error;
  }

  return montaDataset(json.ttErro, json.ttBusinessSegment, campos, display, null, true);
}

/*$$ partials/getConstraints.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/

function jsonLocal() {
  return {
    ttBusinessSegment: [
      { codigo: '1', descricao: 'P&S' },
      { codigo: '2', descricao: 'S&S' },
      { codigo: '3', descricao: 'L&M' },
      { codigo: '4', descricao: 'P&H' }
    ]
  };
}