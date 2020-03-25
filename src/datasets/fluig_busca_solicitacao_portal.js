const campos = ['solicitacao', 'status', 'valorLiberado', 'valorTotalVerba', 'valorResultado', 'descricaoDetalhada', 'inicioAcao', 'terminoAcao'];
const display = ['solicitacao'];
const dePara = campos;

function createDataset(fields, constraints, sortFields) {
  return buscaDataset(fields, constraints, sortFields);
}

function onMobileSync(user) {

}

function buscaDataset(fields, constraints, sortFields) {
  let params = getConstraints(constraints);

  let dsSolicitacaoGuid = getDataset('marketing_abertura_verba', null, [
    { field: 'tablename', value: 'emailsCliente' },
    { field: 'email_guid', value: params.guid },
  ]);

  let dsSolicitacao = getDataset('marketing_abertura_verba', null, [
    { field: 'documentid', value: dsSolicitacaoGuid[0].documentid }
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