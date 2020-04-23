const campos = ['documentid', 'name', 'value'];
const display = campos;
const dePara = campos;

function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {
  return buscaDataset(fields, constraints, sortFields);
}

function onMobileSync(user) {

}

function buscaDataset(fields, constraints, sortFields) {
  let params = getConstraints(constraints);

  let erros = [];

  if (params.fullParam) {
    params.campos = String(params.fullParam).split('@$')[0];
    params.valores = String(params.fullParam).split('@$')[1];
    params.documentid = String(params.fullParam).split('@$')[2];
  }

  if (!params.campos || params.campos == '') {
    erros.push({ mensagem: 'Informe os campos separados por |' });
  }

  if (!params.valores || params.valores == '') {
    erros.push({ mensagem: 'Informe os valores separados por |' });
  }

  if (!params.documentid || params.documentid == '') {
    erros.push({ mensagem: 'Informe o documentid' });
  }

  if (erros.length > 0) {
    return montaDataset(erros);
  }

  let csCampos = String(params.campos).split('|');
  let csValores = String(params.valores).split('|');
  let csDocumentid = String(params.documentid);

  let formCampos = [];
  csCampos.forEach((campo, index) => {
    if (campo && campo != '') {
      formCampos.push({
        name: campo,
        value: csValores[index],
        documentid: csDocumentid
      })
    }

  })

  let json = {
    formCampos
  }

  atualizaFormulario("1", "admin", "adm", csDocumentid, formCampos)

  return montaDataset(json.ttErro, json.formCampos, campos, display);
}

/*$$ partials/getConstraintsParams.js $$*/
/*$$ partials/getDataset.js $$*/
/*$$ partials/montaDataset.js $$*/
/*$$ partials/atualizaFormulario.js $$*/
