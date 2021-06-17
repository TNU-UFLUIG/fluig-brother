/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  const Errors = value(form, `Errors`) || [];
  const regras = value(form, `regras`) || [];
  const Params = getParams(form);

  if (Errors && Errors.length > 0) {
    throw Errors.join(`<br>`);
  }
}
