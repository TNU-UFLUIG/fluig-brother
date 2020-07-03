const campos = ['codigo', 'nome', 'email'];
const display = ['nome', 'email'];
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
  properties["receive.timeout"] = "60000";

  // const json = jsonLocal();
  let json;
  try {
    json = callDatasul("esp/buscaExecutivo.p", "piBusca", params, null, properties);
  } catch (error) {
    throw error;
  }

  return montaDataset(json.ttErro, json.ttGestor, campos, display, null, true);
}

/*$$ partials/getConstraints.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/

function jsonLocal() {
  return {
    ttCliente: [
      {
        codigo: '385',
        cnpj: '00.00.000/0001-01',
        nome: 'REIS OFFICE',
        canal: 'DISTRIBUTOR',
        executivo: 'ckayama'
      }
    ]
  };
}