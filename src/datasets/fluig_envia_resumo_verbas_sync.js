function defineStructure() {
  addColumn('to');
  addColumn('subject');

  setKey(['to']);

  addIndex(['to']);
}

function onSync(lastSyncDate) {
  createDataset();
}

function createDataset(fields, constraints, sortFields) {
  let logSeq = 0;

  const dataset = DatasetBuilder.newDataset();

  const campos = ['to', 'subject'];
  const sdk = new javax.naming.InitialContext().lookup('java:global/fluig/wcm-core/service/SDK');

  campos.forEach(campo => dataset.addColumn(campo));

  const dsUsuarios = getDataset('marketing_usuario');

  dsUsuarios.forEach((usuario) => {
    const dsResumo = getDataset('fluig_busca_resumo_verbas', null, [
      { field: 'guid', value: usuario.guid }
    ]);

    if (dsResumo.length > 0) {
      getDataset('fluig_envia_resumo_verbas', null, [
        { field: 'email', value: usuario.email }
      ]);
    }
  });

  return dataset;
}

function onMobileSync(user) {

}

/*$$ partials/getDataset.js $$*/
/*$$ partials/getConstraintsParams.js $$*/
