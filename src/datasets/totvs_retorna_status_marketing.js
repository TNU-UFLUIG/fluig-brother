const campos = ['solicitacao', 'descricao', 'data', 'ultimo'];
const display = ['solicitacao', 'descricao'];
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

  // log.info("*** totvs_retorna_status_marketing 1");

  let params = getConstraints(constraints);

  // log.info("*** totvs_retorna_status_marketing 2");

  var properties = {};
  properties["receive.timeout"] = "0";

  // log.info("*** totvs_retorna_status_marketing 3");

  // const json = jsonLocal();
  let json;

  try {
    json = callDatasul("esp/buscaStatusVerbaMarketing.p", "piBusca", params, null, properties);
  } catch (error) {
    json = { ttErro: [{ mensagem: String(error) }] }
  }

  // log.info("*** totvs_retorna_status_marketing 4");

  // log.info(JSON.stringify(json));

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