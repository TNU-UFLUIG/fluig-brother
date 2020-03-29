let display = ['arquivoND_documentid', 'arquivoND_nome'];
let dePara = ['nome', 'type', 'documentid', 'version', 'numero', 'url', 'descricao', 'aceito', 'motivoRecusa', 'removed'];
let campos = ['arquivoND_nome', 'arquivoND_type', 'arquivoND_documentid', 'arquivoND_version', 'arquivoND_numero', 'arquivoND_url', 'arquivoND_descricao', 'arquivoND_aceito', 'arquivoND_motivoRecusa', 'arquivoND_removed'];

function createDataset(fields, constraints, sortFields) {
  return buscaDataset(fields, constraints, sortFields);
}

function onMobileSync(user) {

}

function buscaDataset(fields, constraints, sortFields) {
  let params = getConstraints(constraints);

  let dsSolicitacao = getDataset('marketing_abertura_verba', null, [
    { field: 'guid', value: params.guid },
  ]);

  let dsItens = getDataset('marketing_abertura_verba', null, [
    { field: 'documentid', value: dsSolicitacao[0].documentid },
    { field: 'tablename', value: 'arquivosND' }
  ]);

  return montaDataset(null, dsItens, campos, display, dePara);
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