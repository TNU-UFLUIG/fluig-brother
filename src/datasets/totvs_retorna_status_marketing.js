const campos = ['solicitacao', 'status', 'data', 'ultimo'];
const display = ['solicitacao', 'status'];
const dePara = campos;


function defineStructure() {
  for (let i = 0; i < dePara.length; i++) {
    addColumn(dePara[i]);
  }
  addColumn('displaykey');

  setKey(['solicitacao', 'data']);

  addIndex(['solicitacao', 'data']);
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
  properties["receive.timeout"] = "0";Uint16Array

  // const json = jsonLocal();
  const json = callDatasul("buscaStatusVerbaMarketing.p", "piBusca", params, null, properties);

  return montaDataset(json.ttErro, json.ttStatus, campos, display);
}

/*$$ partials/getConstraints.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/

function jsonLocal() {
  return {
    ttStatus: [
      { solicitacao: 'XXX', data: new Date(), status: 'ENVIADO AO BANCO', ultimo: 'N' }
    ]
  };
}