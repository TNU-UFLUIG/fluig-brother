function getParams(form) {
  const Params = {};
  Params.formMode = String(form.getFormMode());
  Params.edit = Params.formMode == 'ADD' || Params.formMode == 'MOD';
  Params.numState = String(parseInt(getValue('WKNumState')));
  Params.etapa = 'inicio';
  Params.user = String(getValue('WKUser'));
  Params.mobile = form.getMobile();
  Params.companyId = form.getCompanyId();
  Params.managerMode = getValue("WKManagerMode") == 'true';

  log.info(`getValue("WKManagerMode") = ${getValue("WKManagerMode")}`)

  Params.atividades = {
    inicio: [1],
    validarMarketing: [2],
    gtwAprovarGerMarketing: [176],
    revisarSolicitacao: [8],
    aprovarGerMarketing: [4],
    aprovarPresidencia: [6],
    analisarErros: [27, 36, 53, 54, 143, 125],
    aguardandoFimDaAcao: [129],
    notificarGrupoBrotherInicio: [23],
    notificarGrupoBrotherFim: [41],
    autorizarNotificacaoInicio: [32],
    autorizarNotificacaoFim: [43],
    enviarEvidencias: [180],
    validarEvidencias: [62],
    gtwAprovarVerbaMaior: [67],
    aprovarVerbaMaior: [151],
    aprovarVerbaMenor: [75],
    enviarND: [186],
    validarND: [103],
    conferirFinanceiro: [113],
    aprovarPagamento: [116],
    gerarAbatimentos: [121],
    atualizarStatus: [132],
    autorizarNotificacaoPagamento: [139],
    finalizadoSemAntecipacao: [173]

  };

  for (var atividade in Params.atividades) {
    if (Params.atividades[atividade].indexOf(parseInt(getValue('WKNumState'))) > -1) {
      Params.etapa = atividade;
    }
  }

  if (!Params.edit) {
    Params.etapa = 'consulta';
  }

  return Params;
}