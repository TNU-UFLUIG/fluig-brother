function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {
  var dataset = DatasetBuilder.newDataset();

  var campos = ['num_proces', 'nr_documento', 'nr_versao'];

  campos.forEach(function (campo) {
    dataset.addColumn(campo);
  });
  // dataset.addColumn('new_version');

  var Documentos = executaSql("SELECT a.nr_documento, a.num_proces, a.nr_versao  FROM anexo_proces as a, documento as d where d.cod_empresa = a.cod_empresa and d.nr_documento = a.nr_documento and d.versao_ativa = 1 and a.nr_versao != d.nr_versao", 'query', campos, '/jdbc/FluigDS');

  Documentos.forEach(function (documento) {

    var row = new Array();
    campos.forEach(function (campo) {
      row.push(String(documento[campo]));
    });
    // row.push(String(versaoAtiva));

    dataset.addRow(row);

    // if (altera) {

    //   executaSql("UPDATE documento SET num_vers_propried = " + versaoAtiva + " WHERE cod_empresa = " + documento.cod_empresa + " and nr_documento = " + documento.nr_documento + " and nr_versao = " + documento.nr_versao, 'update', null, '/jdbc/FluigDS');

    // }
  });

  return dataset;

}

function onMobileSync(user) {

}

/*$$ partials/executaSql.js $$*/
