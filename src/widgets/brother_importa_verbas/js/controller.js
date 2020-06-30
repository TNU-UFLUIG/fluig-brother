angular.module('BrotherImportaVerbasApp', ['brother.directives', 'angular.fluig', 'ngAnimate', 'brother.services', 'chart.js', 'ngFileUpload'])

  .controller('BrotherImportaVerbasController', ['$scope', '$compile', '$http', '$filter', '$timeout', 'fluigService', 'brotherService', 'erpService', 'globalService', 'Upload',
    function BrotherImportaVerbasController($scope, $compile, $http, $filter, $timeout, fluigService, brotherService, erpService, globalService, Upload) {
      const vm = this;

      vm.Errors = [];
      vm.user = WCMAPI.userCode;

      vm.inicia = function inicia() {

        vm.Formulario = {};
        fluigService.getUsuarios().then(resp => { vm.Usuarios = resp; vm.readLocalFile() });
        erpService.getItem().then(resp => { vm.Itens = resp; vm.readLocalFile() });
        erpService.getExecutivo().then(resp => { vm.Executivos = resp; vm.readLocalFile() });
        brotherService.getMarketingTipoAcao().then(resp => {
          vm.TiposAcao = resp;
          vm.TiposAcao.forEach(t => {
            t.contaContabil = JSON.parse(t.contaContabil)
          })
          vm.readLocalFile()
        });
        erpService.getBusinessSegment().then(resp => { vm.BusinessSegment = resp; vm.readLocalFile() })
        erpService.getCliente().then(resp => { vm.Clientes = resp; vm.readLocalFile() })
      };

      vm.importar = function importar() {

        vm.loading = true;
        vm.Solicitacoes.forEach(solicitacao => {

          if (solicitacao.errors == '') {

            solicitacao.loading = true;

            $http.post('/ecm/api/rest/ecm/workflowView/send', {
              appointments: [],
              attachments: [],
              comments: "",
              completeTask: true,
              conditionAfterAutomatic: -1,
              currentMovto: 0,
              currentState: 1,
              digitalSignature: false,
              formData: solicitacao.formData,
              internalFields: [],
              isDigitalSigned: false,
              managerMode: false,
              newObservations: [],
              processId: "marketing_abertura_verba",
              processInstanceId: 0,
              selectedColleague: ["Pool:Group:AM-Marketing"],
              selectedDestinyAfterAutomatic: -1,
              selectedState: 43,
              taskUserId: "rugeda",
              transferTaskAfterSelection: false,
              version: 13,
              versionDoc: 0
            }).then(response => {
              solicitacao.loading = false;
              if (response.data.content && response.data.content.processInstanceId) {
                solicitacao.status = 'Solicitação criada com sucesso';
                solicitacao.solicitacao = response.data.content.processInstanceId;
              } else {
                solicitacao.status = response;
              }
            }, error => {
              console.log(error);
              solicitacao.loading = false;
              solicitacao.status = error.data.message.message;
            })
          }
        })


      }

      vm.CSVtoArray = (text) => {
        var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^;'"\s\\]*(?:\s+[^;'"\s\\]+)*)\s*(?:;\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^;'"\s\\]*(?:\s+[^;'"\s\\]+)*)\s*)*$/;
        var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^;'"\s\\]*(?:\s+[^;'"\s\\]+)*))\s*(?:;|$)/g;
        // Return NULL if input string is not well formed CSV string.
        if (!re_valid.test(text)) return null;
        var a = [];                     // Initialize array to receive values.
        text.replace(re_value, // "Walk" the string using replace with callback.
          function (m0, m1, m2, m3) {
            // Remove backslash from \' in single quoted values.
            if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
            // Remove backslash from \" in double quoted values.
            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined) a.push(m3);
            return ''; // Return empty string.
          });
        // Handle special case of empty last value.
        if (/,\s*$/.test(text)) a.push('');
        return a;
      };

      vm.readLocalFile = function readLocalFile() {

        if (!vm.Usuarios || !vm.Executivos || !vm.Itens || !vm.TiposAcao || !vm.BusinessSegment || !vm.Clientes) return;

        let camposCsv = [];
        let solicitacaoIndex;
        vm.Solicitacoes = [];

        // $.ajax({
        //   type: "GET",
        //   url: "../../../resources/verbas.csv",
        //   headers: {
        //     "Accept": "application/json;charset=iso-8859-1",
        //     "Accept-Charset": "charset=iso-8859-1"
        //   },
        //   dataType: "text"
        // }).success(function (result, status, headers) {

        // console.log(result)
        $http.get('../../../resources/verbas5.csv')
          .then((result) => {

            // let textDecoder = new TextDecoder('ISO-8859-15'); // your encoding may vary!
            // return JSON.parse(textDecoder.decode(data));

            // vm.fileContent = textDecoder.decode(result.data);
            // vm.fileContent = result.data;

            // result.setEncoding('utf8');
            vm.fileContent = result.data;

            let allTextLines = vm.fileContent.split(/\r\n|\n/);

            for (let i = 0; i < allTextLines.length; i++) {
              // let registro = allTextLines[i].split(';');
              let registro = vm.CSVtoArray(allTextLines[i])
              // let registro = allTextLines[i].split(/;(?=(?:(?:[^"]*"){2})*[^"]*$)/);
              // let registro = allTextLines[i].match(/(".*?"|[^";]+)(?=\s*;|\s*$)/g);
              console.log(registro)

              if (i == 0) {
                for (let col = 0; col < registro.length; col++) {
                  camposCsv[col] = { tableField: String(registro[col]).trim() };
                }
              }

              if (i == 1) {
                for (let col = 0; col < registro.length; col++) {
                  camposCsv[col].filter = String(registro[col]).trim();
                }
              }

              if (i == 2) {
                for (let col = 0; col < registro.length; col++) {
                  camposCsv[col].format = String(registro[col]).trim();
                }
              }

              if (i == 3) {
                for (let col = 0; col < registro.length; col++) {
                  camposCsv[col].field = String(registro[col]).trim();
                }
              }

              if (i >= 4) {

                let solicitacao;

                for (let col = 0; col < registro.length; col++) {
                  let value = String(registro[col]).trim();
                  if (col == 0) {
                    let numControle = value;
                    solicitacao = vm.Solicitacoes.filter(s => s.numControle == numControle)[0];
                    if (!solicitacao) {
                      solicitacao = { valorTotalVerba: 0, numControle: numControle, errors: '', formData: [{ name: 'importado', value: 'true' }, { name: 'totalRateio', value: 1 }] };
                      vm.Solicitacoes.push(solicitacao);
                      solicitacaoIndex = 0;
                    }
                    solicitacaoIndex++;
                  }

                  let field = {};
                  if (value != '' && solicitacao.formData.filter(d => d.name == camposCsv[col].field).length == 0) {

                    if (camposCsv[col].tableField == 'S') {
                      field.name = `${camposCsv[col].field}___${solicitacaoIndex}`;
                    } else {
                      field.name = `${camposCsv[col].field}`;
                    }

                    if (field.name.match('tipoAcaoCodigo') || field.name.match('tipoQuantidade')) {
                      value = value.toLowerCase();
                    }

                    switch (camposCsv[col].filter) {
                      case 'date':
                      case 'percentage':
                      case 'currency':
                      case 'number':

                        field.value = camposCsv[col].filter == 'date' ? new Date(value.split('/')[2], Number(value.split('/')[1]) - 1, value.split('/')[0]).getTime().toString() : value;
                        solicitacao.formData.push({
                          name: field.name.match('rateio_perc') ? field.name.replace('rateio_perc', 'rateio_perc_f') : field.name.replace(camposCsv[col].field, `${camposCsv[col].field}_f`),
                          value: $filter(camposCsv[col].filter)(field.value, camposCsv[col].format)
                        })
                        break;

                      case 'dataset':
                        field.value = value;
                        let reg = vm[camposCsv[col].format.split('|')[0]].filter(u => u[camposCsv[col].format.split('|')[1]] == value)[0];

                        if (reg) {
                          let additionalFields = camposCsv[col].format.split('|')[3].split(',');
                          solicitacao.formData.push({
                            name: field.name.replace(camposCsv[col].field, camposCsv[col].format.split('|')[2]),
                            value: JSON.stringify(reg)
                          });

                          additionalFields.forEach(f => {
                            solicitacao.formData.push({
                              name: field.name.replace(camposCsv[col].field, f.split('=')[0]),
                              value: reg[f.split('=')[1]]
                            });
                          })
                        } else {
                          solicitacao.errors += `Registro nao encontrado ${field.name} = ${field.value}\n`;
                        }

                        break;
                      default:
                        field.value = value;
                        break;
                    }


                    if (field.name.match('rateio_perc')) {
                      let categoria = vm.BusinessSegment.filter(bs => bs.codigo == field.name.split('___')[1])[0];
                      solicitacao.formData.push({
                        name: `rateio_categoria___${field.name.split('___')[1]}`,
                        value: JSON.stringify(categoria)
                      });
                      solicitacao.formData.push({
                        name: `rateio_categoriaCodigo___${field.name.split('___')[1]}`,
                        value: categoria.codigo
                      });
                      solicitacao.formData.push({
                        name: `rateio_categoriaDescricao___${field.name.split('___')[1]}`,
                        value: categoria.descricao
                      });
                    }

                    if (field.name.match('itemSellinIt_rebateTotal') ||
                      field.name.match('itemSellinTgAc_vlTotal') ||
                      field.name.match('itemSellinTg_vlTotal') ||
                      field.name.match('itemSellout_rebateTotal') ||
                      field.name.match('itemSpiffIt_vlTotal') ||
                      field.name.match('itemSpiffTg_vlTotal') ||
                      field.name.match('itemVpcEvt_vlTotal') ||
                      field.name.match('itemVpcOutros_vlTotal')) {
                      solicitacao.valorTotalVerba += parseFloat(field.value);
                    }

                    solicitacao.formData.push(field);
                  }
                }
              }
            }

            vm.Solicitacoes.forEach(solicitacao => {
              solicitacao.formData.push(
                {
                  name: 'valorTotalVerba',
                  value: solicitacao.valorTotalVerba
                }
              )
              solicitacao.formData.push(
                {
                  name: 'valorTotalVerba_f',
                  value: $filter('currency')(solicitacao.valorTotalVerba, 'R$')
                }
              )
            })
          })
      }

      vm.inicia();
    }
  ]);

try {
  angular.element(document)
    .ready(() => {
      angular.bootstrap(document.getElementById('BrotherImportaVerbas'), ['BrotherImportaVerbasApp']);
    });
} catch (err) {
  // err
}
