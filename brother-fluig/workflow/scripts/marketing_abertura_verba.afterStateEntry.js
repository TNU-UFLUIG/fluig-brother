function afterStateEntry(sequenceId){
  var Params = params();

  if (sequenceId == 60) {
    enviaEmail('evidencia', 'N', 'S');
  }

  if (sequenceId == 74) {
    enviaEmail('envioND', 'N', 'S');
  }
  
}