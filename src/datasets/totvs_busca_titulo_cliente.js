const campos = ['codCliente', 'codEstab', 'codEspec', 'codSerie', 'numTitulo', 'dataEmissao', 'dataVencto', 'parcela', 'matriz', 'valorOriginal', 'valorSaldo'];
const display = ['codCliente', 'numTitulo'];
const dePara = campos;


function defineStructure() {
  for (let i = 0; i < dePara.length; i++) {
    addColumn(dePara[i]);
  }
  addColumn('displaykey');

  setKey(['codCliente', 'numTitulo']);

  addIndex(['codCliente', 'numTitulo']);
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
  // const json = callDatasul("buscaTitulos.p", "piBusca", params, null, properties);

  return montaDataset(json.ttErro, json.ttTitulos, campos, display);
}

/*$$ partials/getConstraints.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/

function jsonLocal() {
  return {
    ttTitulos: [
      {
        codCliente: '100',
        codEstab: '101',
        codEspec: '10',
        codSerie: '20',
        dataEmissao: new Date().getTime(),
        dataVencto: new Date().getTime(),
        parcela: 1,
        matriz: '100',
        valorOriginal: 100000,
        valorSaldo: 80000
        
      }
    ]
  };
}