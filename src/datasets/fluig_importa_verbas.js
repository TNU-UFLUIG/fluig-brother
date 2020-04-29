const campos = ['numControle', 'fields', 'values'];
const display = ['numControle'];
const dePara = campos;



function createDataset(fields, constraints, sortFields) {
  let params = getConstraints(constraints);

  let Erros = [];
  let Solicitacoes = [];
  let i = 0;

  try {

    if (params.documentid) {

      log.info('params.documentid = ' + params.documentid);

      let camposCsv = [];
      let solicitacaoIndex;

      const documentService = fluigAPI.getDocumentService();

      downloadUrl = documentService.getDownloadURL(Number(params.documentid));

      let scanner = new java.util.Scanner(new java.net.URL(downloadUrl).openStream(), java.nio.charset.StandardCharsets.ISO_8859_1.toString())

      while (scanner.hasNextLine()) {
        i++;
        let nextLine = String(scanner.nextLine());
        // log.info(nextLine);
        let registro = nextLine.split(';');

        if (i == 1) {
          for (var col = 0; col < registro.length; col++) {
            camposCsv[col] = { tableField: String(registro[col]).trim() };
          }
        }

        if (i == 2) {
          for (var col = 0; col < registro.length; col++) {
            camposCsv[col].field = String(registro[col]).trim();
          }
        }

        if (i >= 3) {
          
          let solicitacao;

          for (var col = 0; col < registro.length; col++) {
            let value = String(registro[col]).trim();
            if (col == 0) {
              let numControle = value;
              solicitacao = Solicitacoes.filter(s => s.numControle == numControle)[0];
              if (!solicitacao) {
                solicitacao = { numControle: numControle, fieldsArr: [], valuesArr: [] };
                Solicitacoes.push(solicitacao);
                solicitacaoIndex = 0;
              }
              solicitacaoIndex++;
            }

            if (value != '') {
              if (camposCsv[col].tableField == 'S') {
                solicitacao.fieldsArr.push(`${camposCsv[col].field}___${solicitacaoIndex}`);
              } else {
                solicitacao.fieldsArr.push(`${camposCsv[col].field}`);
              }

              solicitacao.valuesArr.push(value)
            }
          }
        }
      }
      Solicitacoes.forEach(s => {
        
        s.fields = s.fieldsArr.join('||');
        s.values = s.valuesArr.join('||');

        log.info(s.numControle);
        log.info(s.fields);
        log.info(s.values);
      })
    } else {
      log.info('params.documentid null');
      throw 'Informe o documentid';
    }
  } catch (error) {
    log.info('catch error: ' + error);
    Erros.push({ mensagem: String(error) });
    return montaDataset(Erros);
  }

  return montaDataset(Erros, Solicitacoes, campos, display, dePara, true);
}

function onMobileSync(user) {

}


/*$$ partials/getConstraintsParams.js $$*/
/*$$ partials/callDatasul.js $$*/
/*$$ partials/montaDataset.js $$*/
/*$$ partials/getDataset.js $$*/
/*$$ partials/dateDDMMYYYY.js $$*/

function jsonLocal() {
  return {
    ttStatus: [
      { retorno: 'OK' }
    ]
  };
}