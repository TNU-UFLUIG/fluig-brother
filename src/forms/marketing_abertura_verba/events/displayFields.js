/*eslint-disable*/
/*jshint -W116 */
function displayFields(form, customHTML) {
  
  log.info('=x=x=x=x=x=x displayFields')
  const Params = getParams(form);

  form.setValue('Params', JSON.stringify(Params));

  form.setShowDisabledFields(true);
}
