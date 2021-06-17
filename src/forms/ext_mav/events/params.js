function getParams(form) {
  const Params = {};
  Params.formMode = String(form.getFormMode());
  Params.edit = Params.formMode == 'ADD' || Params.formMode == 'MOD';
  Params.numState = String(parseInt(getValue('WKNumState')));
  Params.etapa = 'inicio';
  Params.user = String(getValue('WKUser'));
  Params.mobile = form.getMobile();
  Params.companyId = form.getCompanyId();

  if (!Params.edit) {
    Params.etapa = 'consulta';
  }

  return Params;
}