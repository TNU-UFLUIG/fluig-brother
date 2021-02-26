angular.module('BrotherConsultaVerbasApp', ['brother.directives', 'angular.fluig', 'ngAnimate', 'brother.services', 'chart.js', 'ngFileUpload'])

  .controller('BrotherConsultaVerbasController', ['$scope', '$compile', '$http', '$filter', '$timeout', 'fluigService', 'brotherService', 'erpService', 'globalService', 'Upload',
    function BrotherConsultaVerbasController($scope, $compile, $http, $filter, $timeout, fluigService, brotherService, erpService, globalService, Upload) {
      const vm = this;

      vm.Errors = [];

      vm.inicia = function inicia() {

        const WCMAPI = {
          userCode: 'admin',
          tenantCode: 1
        };

        brotherService.getMarketingAberturaVerba().then((verbas) => {
          vm.Solicitacoes = verbas;
          vm.Status = [];

          [...new Set(verbas.map(item => item.status))].forEach(s => vm.Status.push({ name: s, selected: true }));

          console.log(vm.Status)
        });

        fluigService.getUsuarios().then((users) => {
          vm.Users = users;
          vm.User = vm.Users.filter(u => u.colleagueId === WCMAPI.userCode)[0];
        });
      };

      vm.inicia();
    }
  ]);

try {
  angular.element(document)
    .ready(() => {
      angular.bootstrap(document.getElementById('BrotherConsultaVerbas'), ['BrotherConsultaVerbasApp']);
    });
} catch (err) {
  // err
}
