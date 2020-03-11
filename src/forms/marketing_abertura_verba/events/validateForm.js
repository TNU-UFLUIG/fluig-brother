/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  const Errors = value(form, 'Errors') || [];
  const Params = getParams(form);

  const ChecklistPlanejamento = getChildren(form, 'ChecklistPlanejamento', ['checklistPla_questao', 'checklistPla_tipo', 'checklistPla_respostaObj', 'checklistPla_respostaSub']);
  const importado = value(form, "importado");

  const currentState = getValue("WKNumState");
  const nextState = getValue("WKNextState");

  if (currentState == nextState || importado) {
    return;
  }


  if (Errors && Errors.length > 0) {
    throw Errors.join('<br>');
  }
}
