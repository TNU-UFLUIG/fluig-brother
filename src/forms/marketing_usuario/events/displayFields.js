/*eslint-disable*/
/*jshint -W116 */
function displayFields(form, customHTML) {
  
  const Params = getParams(form);

  form.setValue('Params', JSON.stringify(Params));

  form.setShowDisabledFields(true);
}
