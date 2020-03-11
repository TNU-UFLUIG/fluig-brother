const campos = ['codEstab', 'codEspec', 'codSerie', 'numTitulo', 'parcela', 'valorTotal'];
const display = ['codigo', 'descricao'];
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

  const json = jsonLocal();
  // const json = callDatasul("criaAntecipacao.p", "piCria", params, null, properties);

  return montaDataset(json.ttErro, json.ttItem, campos, display);
}

/*$$ partials/getConstraints.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/

function jsonLocal() {
  return {
    ttItem: [
      {
        codigo: '10930',
        descricao: 'HLL2360DW',
        categoria: '2.2-MLL HW',
        netInicial: 1200,
        gpInicial: 10,
        netSugerido: 1300,
        gpSugerido: 14,
        rebateUnit: 100,
        rebateTotal: 100,
        dolar: 4.1
        
      }
    ]
  };
}