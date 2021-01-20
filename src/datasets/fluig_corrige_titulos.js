/* eslint-disable */

const campos = ['solicitacao', 'status'];
const display = campos;
const dePara = campos;

function defineStructure() {
  for (let i = 0; i < dePara.length; i++) {
    addColumn(dePara[i]);
  }
  addColumn('displaykey');

  setKey(['solicitacao']);

  addIndex(['solicitacao']);
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

  log.info('******** totvs_atualiza_fluxo_marketing INICIO ');

  let params = getConstraints(constraints);

  let solicitacoesRet = [];

  let dsSolicitacoes = getDataset('marketing_abertura_verba', null,
    [
      { field: 'status', value: 'CANCELADA', type: ConstraintType.SHOULD },
      { field: 'status', value: 'FINALIZADO SEM ANTECIPAÇÃO', type: ConstraintType.SHOULD },
      { field: 'status', value: 'APROVAÇÃO FINANCEIRA', type: ConstraintType.SHOULD },
    ], null);

  dsSolicitacoes.forEach(s => {
    let dsDuplicatas = getDataset('marketing_abertura_verba', null,
      [
        { field: 'documentid', value: s.documentid },
        { field: 'tablename', value: 'duplicatas' }
      ], null);

    let duplicatas = s.status == 'FINALIZADO SEM ANTECIPAÇÃO' || s.status == 'CANCELADA' ? dsDuplicatas : dsDuplicatas.filter(d => Number(d.titulo_valorAntecipa) > 0);

    log.info(`s.documentid: ${s.documentid} | s.solicitacao: ${s.solicitacao} | s.status: ${s.status} | duplicatas.length = ${duplicatas.length}`);

    if (duplicatas.length > 0) {
      let params = [];

      for (let o in s) {
        params.push({
          name: o,
          value: String(s[o])
        });
      }

      if (status == 'APROVAÇÃO FINANCEIRA') {
        duplicatas.forEach((dr, di) => {

          for (let dc in dr) {
            params.push({
              name: `${dc}___${(di + 1)}`,
              value: String(dr[dc])
            });
          }

          // dsDuplicatas.columns.forEach((dc) => {
          //   params.push({
          //     name: `${dc}___${(di + 1)}`,
          //     value: dr[dc]
          //   });
          // });
        });
      }

      [
        'emailsCliente', 'arquivosEvidencias', 'arquivosND', 'chat', 'rateioCategoria', 'itensSellinIt', 'itensSellinTgAc',
        'itensSellinTg', 'itensSellout', 'itensSpiffIt', 'itensSpiffTg', 'statusErp', 'itensVpcEvt', 'itensVpcOutros'
      ].forEach(table => {
        let dsTable = getDataset('marketing_abertura_verba', null,
          [
            { field: 'documentid', value: s.documentid },
            { field: 'tablename', value: table },
          ], null);

        if (dsTable.length > 0) {
          dsTable.forEach((tr, ti) => {

            for (let tc in tr) {
              params.push({
                name: `${tc}___${(ti + 1)}`,
                value: String(tr[tc])
              });
            }
          });
        }
      });

      log.info(params);

      var data = {
        companyId: getValue("WKCompany") + '',
        serviceCode: 'fluig-post',
        endpoint: `/ecm/api/rest/ecm/cardView/editCard/${s.documentid}/${s.version}`,
        method: 'post',
        timeoutService: '100',
        params,
      }

      var clientService = fluigAPI.getAuthorizeClientService();
      // var vo = clientService.invoke(JSON.stringify(data));
      var status = '';

      // if (vo.getResult() == null || vo.getResult().isEmpty()) {
      //   status = "Retorno vazio";
      // } else {
      //   status = vo.getResult();
      // }

      solicitacoesRet.push({ solicitacao: s.solicitacao, status });

      // $.ajax({
      //   url: `/ecm/api/rest/ecm/cardView/editCard/${s.documentid}/${s.version}`,
      //   type: "POST",
      //   dataType: "json",
      //   contentType: "application/json",
      //   data: JSON.stringify(params)
      // });

      // $.post(`/ecm/api/rest/ecm/cardView/editCard/${s.documentid}/${s.version}`, JSON.stringify(params));
    }
  });


  // log.info('*** totvs_atualiza_fluxo_marketing 4');

  // log.info(JSON.stringify(json))

  return montaDataset(null, solicitacoesRet, campos, display, dePara, true);
}

/*$$ partials/getConstraintsParams.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/
/*$$ partials/getDataset.js $$*/
/*$$ partials/dateDDMMYYYY.js $$*/
