function beforeTaskSave(colleagueId, nextSequenceId, userList) {
  hAPI.setCardValue('executado', getValue("WKUserComment") || '')
  // if (getValue("WKUserComment") == null || getValue("WKUserComment") == "") {
  //     throw "A observação deve ser preenchida";
  // }  
}
