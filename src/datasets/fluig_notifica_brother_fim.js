const campos = ['solicitacao', 'email', 'subject'];
const display = campos;
const dePara = campos;


function defineStructure() {
  for (let i = 0; i < dePara.length; i++) {
    addColumn(dePara[i]);
  }
  addColumn('displaykey');

  setKey(['solicitacao', 'email']);

  addIndex(['solicitacao', 'email']);
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

  // log.info('******** fluig_notifica_brother_fim INICIO ');

  let params = getConstraints(constraints);

  let dsSolicitacoes = getDataset('marketing_abertura_verba', null, [
    { field: 'notificaGrupoBrotherFimAcao', value: 'S' }
  ]);

  let json = [];

  if (dsSolicitacoes.length > 0) {

    var solicitacoes = [];

    dsSolicitacoes.forEach(solicitacao => {
      solicitacoes.push(solicitacao.solicitacao);
    });

    let dsNotifica = getDataset('fluig_notifica_acao_marketing', null, [
      { field: 'solicitacoes', value: String(solicitacoes.join('|')) },
      { field: 'enviaBrother', value: 'S' },
      { field: 'enviaExecutivo', value: 'S' },
      { field: 'tipo', value: 'fimAcao' }
    ])

    dsSolicitacoes.forEach(solicitacao => {
      dsNotifica.forEach(notifica => {
        json.push({
          solicitacao: String(solicitacao.solicitacao),
          to: String(notifica.to),
          subject: String(notifica.subject)
        })
      });

      getDataset('fluig_atualiza_formulario', null, [
        { field: 'campos', value: 'notificaGrupoBrotherFimAcao' },
        { field: 'valores', value: 'N' },
        { field: 'documentid', value: String(solicitacao.documentid) }
      ])
    })
  }

  return montaDataset(json.ttErro, json, campos, display, dePara, true);
}

/*$$ partials/getConstraintsParams.js $$*/
/*$$ partials/montaDataset.js $$*/
/*$$ partials/getDataset.js $$*/

function jsonLocal() {
  return {
    ttStatus: [
      { retorno: 'OK' }
    ]
  };
}