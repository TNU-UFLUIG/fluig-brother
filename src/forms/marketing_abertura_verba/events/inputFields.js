/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  const importado = value(form, 'importado');

  const Params = getParams(form);

  const currentState = getValue("WKNumState");
  const nextState = getValue("WKNextState");

  if (currentState == Params.atividades.validarMarketing[0]) {
    if (nextState == Params.atividades.gtwAprovarGerMarketing[0]) {
      form.setValue('statusValidacaoMarketing', 'APROVADO');
    }
    if (nextState == Params.atividades.revisarSolicitacao[0]) {
      form.setValue('statusValidacaoMarketing', 'REPROVADO');
    }
  }

  if (currentState == Params.atividades.aprovarGerMarketing[0]) {
    if (nextState == Params.atividades.aprovarPresidencia[0]) {
      form.setValue('statusAprovGerMarketing', 'APROVADO');
    }
    if (nextState == Params.atividades.validarMarketing[0]) {
      form.setValue('statusAprovGerMarketing', 'REPROVADO');
    }
  }

  if (currentState == Params.atividades.aprovarPresidencia[0]) {
    if (nextState == Params.atividades.notificarGrupoBrotherInicio[0]) {
      form.setValue('statusAprovPresidenciaVp', 'APROVADO');
    }
    if (nextState == Params.atividades.revisarSolicitacao[0]) {
      form.setValue('statusAprovPresidenciaVp', 'REPROVADO');
    }
  }

  if (currentState == Params.atividades.aprovarVerbaMaior[0]) {
    if (nextState == Params.atividades.enviarND[0]) {
      form.setValue('statusAprovVerbaMaior', 'APROVADO');
    }
    if (nextState == Params.atividades.validarEvidencias[0]) {
      form.setValue('statusAprovVerbaMaior', 'REPROVADO');
    }
  }

  if (currentState == Params.atividades.aprovarVerbaMenor[0]) {
    if (nextState == Params.atividades.enviarND[0]) {
      form.setValue('statusAprovVerbaMenor', 'APROVADO');
    }
    if (nextState == Params.atividades.validarEvidencias[0]) {
      form.setValue('statusAprovVerbaMenor', 'REPROVADO');
    }
  }

  if (currentState == Params.atividades.aprovarPagamento[0]) {
    if (nextState == Params.atividades.gerarAbatimentos[0]) {
      form.setValue('statusAprovPagamento', 'APROVADO');
    }
    if (nextState == Params.atividades.conferirFinanceiro[0]) {
      form.setValue('statusAprovPagamento', 'REPROVADO');
    }
  }
}

function atividade(num, name) {
  const Params = getParams(form);

  return Params.atividades[name].indexOf(num) > -1;

}