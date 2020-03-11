const campos = ['codigo', 'descricao', 'contaContabil'];
const display = ['codigo', 'descricao'];
const dePara = ['codigo', 'descricao', 'contaContabil'];


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

  const json = jsonLocal();
  // const json = callDatasul("buscaTecnicos.p", "piBusca", params, null, properties);

  return montaDataset(json.ttErro, json.tipoAcao, campos, display);
}

/*$$ partials/getConstraints.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/

function jsonLocal() {
  return {
    tipoAcao: [
      {
        codigo: 'sellout',
        descricao: 'SELL-OUT PROMOTIONS',
        contaContabil: '03.01.01'
      },
      {
        codigo: 'sellin',
        descricao: 'SELL-IN PROMOTIONS',
        contaContabil: '03.01.02'
      },
      {
        codigo: 'vpc',
        descricao: 'VPC/COOP',
        contaContabil: '03.01.03'
      },
      {
        codigo: 'spiff',
        descricao: 'SPIFF',
        contaContabil: '03.01.04'
      }

    ]
  };
}