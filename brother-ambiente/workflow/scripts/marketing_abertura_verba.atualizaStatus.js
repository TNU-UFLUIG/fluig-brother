function atualizaStatus() {
  var ttParams = {
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

  var solicitacaoCampos = [
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

  var objSolicitacao = {};

  solicitacaoCampos.forEach(function (c) {
    objSolicitacao[c.name] = String(hAPI.getCardValue(c.name) == "NaN" ? "" : c.type == 'date' ? String(dateDDMMYYY(Number(hAPI.getCardValue(c.name)), true), true) : String(hAPI.getCardValue(c.name)));
  });

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

  ].forEach(function (paramTable) {

    var indexes = hAPI.getChildrenIndexes(paramTable.tablename);

    for (var i = 0; i < indexes.length; i++) {
      var fieldValue = parseInt(hAPI.getCardValue("descricao___" + indexes[i]));
    }

    var obj = { solicitacao: String(hAPI.getCardValue(solicitacao)) };

    paramTable.campos.forEach(function (c) {

      var value = String(objTable[paramTable.fieldPref + "_" + c.name] || "");
      obj[c.name] = String(value) == "NaN" ? "" : c.type == 'date' ? String(dateDDMMYYY(Number(value), true)) : String(value);
    })
    ttParams[paramTable.tt].push(obj);


  });

}