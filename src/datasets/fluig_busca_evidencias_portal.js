let campos;
let display = [`arquivoEv_documentid`, `arquivoEv_nome`];
let dePara = [`documentid`, `nome`, `tipo`, `version`, `url`, `descricao`, `aceito`, `motivoRecusa`, `removed`];


function createDataset(fields, constraints, sortFields) {
  return buscaDataset(fields, constraints, sortFields);
}

function onMobileSync(user) {

}

function buscaDataset(fields, constraints, sortFields) {
  let params = getConstraints(constraints);

  let dsSolicitacao = getDataset(`marketing_abertura_verba`, null, [
    { field: `guid`, value: params.guid },
  ]);

  let dsItens = getDataset(`marketing_abertura_verba`, null, [
    { field: `documentid`, value: dsSolicitacao[0].documentid },
    { field: `tablename`, value: `arquivosEvidencias` }
  ]);

  campos = [
    `arquivoEv_documentid`, `arquivoEv_nome`, `arquivoEv_tipo`, `arquivoEv_version`,
    `arquivoEv_url`, `arquivoEv_descricao`, `arquivoEv_aceito`, `arquivoEv_motivoRecusa`,
    `arquivoEv_removed`];

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