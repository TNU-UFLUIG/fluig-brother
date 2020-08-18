const campos = ['documentid', 'perc', 'percNovo'];
const display = campos;
const dePara = campos;


function defineStructure() {

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

  // log.info('******** totvs_atualiza_fluxo_marketing INICIO ');

  let params = getConstraints(constraints);

  let solicitacoes = getDataset('marketing_abertura_verba', null, [
    { field: 'rateio_perc', value: '0.2434' },
    { field: 'tablename', value: 'rateioCategoria' }
  ]);

  let json = []
  solicitacoes.forEach(s => {
    json.push({
      documentid: s.documentid,
      perc: s.rateio_perc,
      percNovo: "0.2030"
    })

    // getDataset('fluig_atualiza_formulario', null, [
    //   { field: 'campos', value: 'pendenteTotvs|rateio_perc___4' },
    //   { field: 'valores', value: `S|0.2030` },
    //   { field: 'documentid', value: String(s.documentid) }
    // ])
  })



  log.info(`solicitacoes.length = ${solicitacoes.length}`)
  log.info(`json.length = ${json.length}`)



  return montaDataset(null, json, campos, display, dePara);
}

/*$$ partials/getConstraintsParams.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/
/*$$ partials/getDataset.js $$*/
/*$$ partials/dateDDMMYYYY.js $$*/

function jsonLocal() {
  return {
    ttStatus: [
      { retorno: 'OK' }
    ]
  };
}