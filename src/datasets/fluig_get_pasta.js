const campos = ['documentId'];
const display = campos;

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
  let params = getParams(constraints);

  let folders = String(params.folders).split('|');

  let pasta;

  folders.forEach((folder, index) => {
    pasta = getDataset('document', null, [
      { field: 'documentDescription', value: folder }, 
      { field: 'parentDocumentId', value: pasta ? pasta['documentPK.documentId'] : '0' }
    ], true)[0];
  });

  const json = {
    pasta: [
      { documentId: pasta['documentPK.documentId'] }
    ]
  }
  //const json = jsonLocal(params);

  return montaDataset(json.ttErro, json.pasta, campos, display);
}

/*$$ partials/getParams.js $$*/
/*$$ partials/montaDataset.js $$*/
/*$$ partials/getDataset.js $$*/

