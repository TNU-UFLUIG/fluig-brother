const campos = ['retorno', 'solicitacao', 'dtAtual'];
const display = campos;
const dePara = campos;


function defineStructure() {
  for (let i = 0; i < dePara.length; i++) {
    addColumn(dePara[i]);
  }
  addColumn('displaykey');

  setKey(['retorno']);

  addIndex(['retorno']);
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
    { field: 'pendenteTotvs', value: 'S' }
  ]);

  // busca filhos e monta params 
  ttParams = {
    ttParam: [],
    ttRateioCategoria: [],
    ttSellout: [],
    ttSellinItem: [],
    ttSellinTarget: [],
    ttSellinTargetAc: [],
    ttSpiffItem: [],
    ttSpiffTarget: [],
    ttVpcEvt: [],
    ttVpcOutros: []
  }

  let solicitacaoCampos = [
    { name: 'solicitacao' }, { name: 'clienteCodigo' }, { name: 'tipoAcaoDescricao' }, { name: 'tipoAcaoCodigo' },
    { name: 'inicioAcao', type: 'date' }, { name: 'terminoAcao', type: 'date' }, { name: 'tipoQuantidade' },
    { name: 'tipoSellin' }, { name: 'tipoVpc' }, { name: 'tipoSpiff' }, { name: 'descricaoDetalhada' },
    { name: 'valorTotalVerba', type: 'decimal' }, { name: 'gpMedioSugerido', type: 'perc' }, { name: 'numControle' },
    { name: 'dataAbertura', type: 'date' }, { name: 'solicitanteNome' }, { name: 'solicitanteCodigo' }, { name: 'atividade' },
    { name: 'responsavel' }, { name: 'statusAprovGerMarketing' }, { name: 'dataAprovGerMarketing', type: 'date' },
    { name: 'userAprovGerMarketingNome' }, { name: 'userAprovGerMarketingCodigo' }, { name: 'obsAprovGerMarketing' },
    { name: 'statusAprovPresidenciaVp' }, { name: 'dataAprovPresidenciaVp', type: 'date' }, { name: 'userAprovPresidenciaVpNome' },
    { name: 'userAprovPresidenciaVpCodigo' }, { name: 'obsAprovPresidenciaVp' }
  ]

  // log.info(`solicitacoes.length = ${solicitacoes.length}`);

  solicitacoes.forEach(solicitacao => {

    let objSolicitacao = {};
    solicitacaoCampos.forEach(c => { objSolicitacao[c.name] = String(solicitacao[c.name]) == "NaN" ? "" : c.type == 'date' ? String(dateDDMMYYY(Number(solicitacao[c.name]), true), true) : String(solicitacao[c.name]) });

    ttParams.ttParam.push(objSolicitacao);

    [
      {
        tablename: 'rateioCategoria', tt: 'ttRateioCategoria', fieldPref: 'rateio',
        campos: [
          { name: 'categoriaCodigo' }, { name: 'categoriaDescricao' }, { name: 'perc', type: 'perc' }
        ]
      },
      {
        tablename: 'itensSellout', tt: 'ttSellout', fieldPref: 'itemSellout',
        campos: [
          { name: 'itemCodigo' }, { name: 'srpInicial', type: 'decimal' }, { name: 'netInicial', type: 'decimal' },
          { name: 'gpInicial', type: 'perc' }, { name: 'srpSugerido', type: 'decimal' }, { name: 'netSugerido', type: 'decimal' },
          { name: 'gpSugerido', type: 'perc' }, { name: 'rebateUnit', type: 'decimal' }, { name: 'qtde', type: 'decimal' },
          { name: 'rebateTotal', type: 'decimal' }
        ]
      },
      {
        tablename: 'itensSellinIt', tt: 'ttSellinItem', fieldPref: 'itemSellinIt',
        campos: [
          { name: 'itemCodigo' }, { name: 'srpInicial', type: 'decimal' }, { name: 'netInicial', type: 'decimal' },
          { name: 'gpInicial', type: 'perc' }, { name: 'srpSugerido', type: 'decimal' }, { name: 'netSugerido', type: 'decimal' },
          { name: 'gpSugerido', type: 'perc' }, { name: 'rebateUnit', type: 'decimal' }, { name: 'qtde', type: 'decimal' },
          { name: 'rebateTotal', type: 'decimal' }
        ]
      },
      {
        tablename: 'itensSellinTg', tt: 'ttSellinTarget', fieldPref: 'itemSellinTg',
        campos: [
          { name: 'descricao' }, { name: 'target' }, { name: 'qtde', type: 'decimal' }, { name: 'perc', type: 'perc' },
          { name: 'vlTarget', type: 'decimal' }, { name: 'vlTotal', type: 'decimal' }
        ]
      },
      {
        tablename: 'itensSellinTgAc', tt: 'ttSellinTargetAc', fieldPref: 'itemSellinTgAc',
        campos: [
          { name: 'descricao' }, { name: 'target' }, { name: 'qtde', type: 'decimal' }, { name: 'perc', type: 'perc' },
          { name: 'vlTarget', type: 'decimal' }, { name: 'vlTotal', type: 'decimal' }
        ]
      },
      {
        tablename: 'itensSpiffIt', tt: 'ttSpiffItem', fieldPref: 'itemSpiffIt',
        campos: [
          { name: 'itemCodigo' }, { name: 'spiffUnit', type: 'decimal' }, { name: 'qtde', type: 'decimal' },
          { name: 'vlTotal', type: 'decimal' }
        ]
      },
      {
        tablename: 'itensSpiffTg', tt: 'ttSpiffTarget', fieldPref: 'itemSpiffTg',
        campos: [
          { name: 'foco' }, { name: 'target', type: 'perc' }, { name: 'qtde', type: 'decimal' },
          { name: 'vlUnit', type: 'decimal' }, { name: 'vlTotal', type: 'decimal' }
        ]
      },
      {
        tablename: 'itensVpcEvt', tt: 'ttVpcEvt', fieldPref: 'itemVpcEvt',
        campos: [
          { name: 'nomeEvento' }, { name: 'finalidade' }, { name: 'inicio', type: 'date' }, { name: 'termino', type: 'date' },
          { name: 'perc', type: 'perc' }, { name: 'vlTotal', type: 'decimal' }
        ]
      },
      {
        tablename: 'itensVpcOutros', tt: 'ttVpcOutros', fieldPref: 'itemVpcOutros',
        campos: [
          { name: 'tipo' }, { name: 'finalidade' }, { name: 'qtde', type: 'decimal' },
          { name: 'perc', type: 'perc' }, { name: 'vlTotal', type: 'decimal' }
        ]
      },
      {
        tablename: 'arquivosND', tt: 'ttArquivosND', fieldPref: 'arquivoND',
        campos: [
          { name: 'numero' }, { name: 'aceito' }, { name: 'removed' },
        ]
      },

    ].forEach(paramTable => {

      getDataset('marketing_abertura_verba', null, [
        { field: 'tablename', value: paramTable.tablename },
        { field: 'documentid', value: solicitacao.documentid }
      ]).forEach(objTable => {
        let obj = { solicitacao: String(solicitacao.solicitacao) };

        paramTable.campos.forEach(c => {

          let value = String(objTable[`${paramTable.fieldPref}_${c.name}`] || '');
          obj[c.name] = String(value) == "NaN" ? "" : c.type == 'date' ? String(dateDDMMYYY(Number(value), true)) : String(value);
        })

        if (!ttParams[paramTable.tt]) {
          ttParams[paramTable.tt] = [];
        }
        ttParams[paramTable.tt].push(obj);
      })
    })
  })

  let json = {};

  if (ttParams.ttParam.length > 0) {

    var properties = {};
    properties["receive.timeout"] = "0";

    // log.info('*** totvs_atualiza_fluxo_marketing 1');

    // const json = jsonLocal();
    try {
      json = callDatasul("esp/atualizaFluxoMarketing.p", "piCria", ttParams, null, properties);
    } catch (error) {
      solicitacoes.forEach(solicitacao => {
        if (solicitacao.statusIntegraTotvs != error) {
          getDataset('fluig_atualiza_formulario', null, [
            { field: 'campos', value: 'pendenteTotvs|statusIntegraTotvs|dataIntegraTotvs' },
            { field: 'valores', value: `S|${String(error) || 'N/D'}|${String(new Date().getTime())}` },
            { field: 'documentid', value: String(solicitacao.documentid) }
          ])
        }
        
      })
    }

    // log.info('*** totvs_atualiza_fluxo_marketing 2');

    if (json && json.ttStatus) {
      // log.info('*** totvs_atualiza_fluxo_marketing entrou na json.ttStatus')
      json.ttStatus.forEach(status => {

        // log.info('*** totvs_atualiza_fluxo_marketing solicitacao: ' + status.solicitacao);

        let solicitacao = solicitacoes.filter(s => s.solicitacao == status.solicitacao)[0];

        // log.info('*** totvs_atualiza_fluxo_marketing solicitacao.documentid: ' + solicitacao.documentid);
        // log.info('*** totvs_atualiza_fluxo_marketing status.retorno: ' + status.retorno);

        if (solicitacao) {
          getDataset('fluig_atualiza_formulario', null, [
            { field: 'campos', value: 'pendenteTotvs|statusIntegraTotvs|dataIntegraTotvs' },
            { field: 'valores', value: `N|${status.retorno || 'N/D'}|${String(new Date().getTime())}` },
            { field: 'documentid', value: String(solicitacao.documentid) }
          ])
        }
      })
    }

    // log.info('*** totvs_atualiza_fluxo_marketing 3');

  }

  // log.info('*** totvs_atualiza_fluxo_marketing 4');

  // log.info(JSON.stringify(json))

  return montaDataset(json.ttErro, json.ttStatus, campos, display, dePara, true);
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