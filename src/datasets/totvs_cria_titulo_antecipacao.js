const campos = ['codEstab', 'codEspec', 'codSerie', 'numTitulo', 'parcela', 'valorTotal'];
const display = ['codigo', 'descricao'];
const dePara = campos;


function defineStructure() {
  for (let i = 0; i < dePara.length; i++) {
    addColumn(dePara[i]);
  }
  addColumn('displaykey');

  setKey(['numTitulo']);

  addIndex(['numTitulo']);
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

  log.info("*** totvs_cria_titulo_antecipacao 1");

  let params = getConstraints(constraints);

  // log.info("*** totvs_cria_titulo_antecipacao 2");

  var properties = {};
  properties["receive.timeout"] = "30000";

  // log.info("*** totvs_cria_titulo_antecipacao 3");

  let solicitacao = getDataset('marketing_abertura_verba', null, [
    { field: 'solicitacao', value: params.solicitacao }
  ])[0];
  let titulos = getDataset('marketing_abertura_verba', null, [
    { field: 'documentid', value: solicitacao.documentid },
    { field: 'tablename', value: 'duplicatas' },
  ]);

  // log.info( "*** totvs_cria_titulo_antecipacao 3 = " + solicitacao.userFinanceiro)
  let userFinanceiro = JSON.parse(solicitacao.userFinanceiro);  

  let ttParam = [{ solicitacao: String(solicitacao.solicitacao), valorTotal: String(solicitacao.valorLiberado) }];
  let ttTitulos = [];

  // log.info("*** totvs_cria_titulo_antecipacao 4");

  titulos.forEach(titulo => {
    if (Number(titulo.titulo_valorAntecipa) > 0) {
      ttTitulos.push({
        codEstab: String(titulo.titulo_codEstab),
        codEspec: String(titulo.titulo_codEspec),
        codSerie: String(titulo.titulo_codSerie),
        numTitulo: String(titulo.titulo_numTitulo),
        parcela: String(titulo.titulo_parcela),
        valorAntecipado: String(titulo.titulo_valorAntecipa)
      })
    }
  })

  // log.info("*** totvs_cria_titulo_antecipacao ttParam: " + JSON.stringify(ttParam));
  // log.info("*** totvs_cria_titulo_antecipacao ttTitulos: " + JSON.stringify(ttTitulos));

  // const json = jsonLocal();
  let json;
  try {
    json = callDatasul("esp/criaAntecipacao.p", "piCria", { ttParam, ttTitulos }, null, properties, userFinanceiro.mail);
  } catch (error) {
    json = { ttErro: [{ mensagem: String(error) }] }
  }

  log.info("*** totvs_cria_titulo_antecipacao json: " + JSON.stringify(json));

  return montaDataset(json.ttErro, json.ttRetorno, campos, display);
}

/*$$ partials/getConstraintsParams.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/
/*$$ partials/getDataset.js $$*/

function jsonLocal() {
  return {
    ttItem: [
      {
        codigo: '10930',
        descricao: 'HLL2360DW',
        categoria: '2.2-MLL HW',
        netInicial: 1200,
        gpInicial: 10,
        netSugerido: 1300,
        gpSugerido: 14,
        rebateUnit: 100,
        rebateTotal: 100,
        dolar: 4.1

      }
    ]
  };
}