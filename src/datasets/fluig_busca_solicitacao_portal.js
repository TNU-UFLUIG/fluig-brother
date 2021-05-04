const campos = ['documentid', 'solicitacao', 'folderAttach', 'status', 'valorLiberado', 'valorTotalVerba', 'valorResultado', 'descricaoDetalhada', 'inicioAcao', 'terminoAcao', 'envioEvidenciasConcluido', 'ndRecusada', 'obsEnvioEvidencias', 'envioNDConcluido', 'evRecusada', 'obsEnvioND', 'currentStepPortal', 'motivoCancelamento', 'motivoRecusaND', 'motivoRecusaEv', 'tipoSellout'];
const display = ['solicitacao'];
const dePara = campos;

function createDataset(fields, constraints, sortFields) {
  return buscaDataset(fields, constraints, sortFields);
}

function onMobileSync(user) {

}

function buscaDataset(fields, constraints, sortFields) {
  let params = getConstraints(constraints);

  let dsSolicitacao = getDataset('marketing_abertura_verba', null, [
    { field: 'guid', value: params.guid }
  ]);


  return montaDataset(null, dsSolicitacao, campos, display);
}

/*$$ partials/getConstraintsParams.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/
/*$$ partials/getDataset.js $$*/

function jsonLocal() {
  return {
    ttValores: [
      { netInicial: 100, netSugerido: 120, gpInicial: 130, gpSugerido: 140, dolar: 5 }
    ]
  };
}