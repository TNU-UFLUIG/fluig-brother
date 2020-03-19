function getParams(form) {
  const Params = {};
  Params.formMode = String(form.getFormMode());
  Params.edit = Params.formMode == 'ADD' || Params.formMode == 'MOD';
  Params.numState = String(parseInt(getValue('WKNumState')));
  Params.etapa = 'inicio';
  Params.user = String(getValue('WKUser'));
  Params.mobile = form.getMobile();
  Params.companyId = form.getCompanyId();

  Params.atividades = {
    inicio: [1],
    validarMarketing: [2],
    revisarSolicitacao: [8],
    aprovarGerMarketing: [4],
    aprovarPresidencia: [6],
    analisarErros: [27, 36, 53, 54, 143, 125],
    aguardandoFimDaAcao: [129],
    autorizarNotificacaoInicio: [32],
    autorizarNotificacaoFim: [43],
    enviarEvidencias: [60],
    validarEvidencias: [62],
    aprovarVerbaMaior: [151],
    aprovarVerbaMenor: [75],
    enviarND: [74],
    validarND: [103],
    conferirFinanceiro: [113],
    aprovarPagamento: [116],
    atualizarStatus: [132],
    autorizarNotificacaoPagamento: [139]

  };

  for (var atividade in Params.atividades) {
    if (Params.atividades[atividade].indexOf(parseInt(getValue('WKNumState'))) > -1 ) {
      Params.etapa = atividade;
    }
  }

  if (!Params.edit) {
    Params.etapa = 'consulta';
  }

  return Params;
}