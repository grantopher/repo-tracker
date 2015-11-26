(function () {
    'use strict';
    angular
        .module('gitTrackerApp', ['ngMaterial'])
        .config(config);

    config.$inject = ['$mdThemingProvider'];

    function config($mdThemingProvider) {
        $mdThemingProvider
            .theme('default');
    }

})();