angular.module('BrotherDocumentacaoMarketingMainApp', ['ngRoute', 'brother.directives', 'angular.fluig', 'ngAnimate', 'brother.services', 'ngFileUpload'])

  .controller('BrotherDocumentacaoMarketingMainController', ['$scope', '$route',
    function BrotherDocumentacaoMarketingMainController($scope, $route) {
      const vm = this;

      vm.Errors = [];

      vm.$route = $route;

      vm.done = true;
    }
  ])

  .config(['$routeProvider', '$locationProvider',
    function config($routeProvider, $locationProvider) {
      // $locationProvider.html5Mode(true);

      // routes
      $routeProvider
        .when('/:guid', {
          templateUrl: '../views/documentacao.html',
          controller: 'BrotherDocumentacaoMarketingController',
          controllerAs: 'vm',
          title: 'Documentação de Marketing'
        })

        .otherwise({
          redirectTo: '/'
        });

      // $httpProvider.interceptors.push('authInterceptor');
    }
  ])
  .service('Global', ['fluigService', 'erpService', 'globalService', '$http', function (fluigService, erpService, globalService, $http) {

    this.inicia = function inicia() {

    };
  }]);
