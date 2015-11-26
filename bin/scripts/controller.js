(function () {
    'use strict';

    angular
        .module('gitTrackerApp')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$http'];

    function AppCtrl($http) {
        var vm = this;
        vm.lines_added = 0;
        vm.lines_removed = 0;
        vm.num_of_commits = 0;
        vm.git = {
            user: 'angular',
            repo_name: 'angular'
        };
        vm.updateGitData = updateGitData;


        var ADDED = 1;
        var REMOVED = 2;
        var LATEST = 0;

        updateGitData();

        function updateGitData() {
            var api_string = 'https://api.github.com/repos/' +
                        vm.git.user +'/' + vm.git.repo_name;
            return $http
                .get(api_string + '/stats/code_frequency')
                .then(function (response) {
                    vm.lines_added = 0;
                    vm.lines_removed = 0;
                    response.data.forEach(function (commit) {
                        vm.lines_added += commit[ADDED];
                        vm.lines_removed += commit[REMOVED];
                    });
                })
                .then(function () {
                    $http
                        .get(api_string + '/commits', {
                            params: {
                                author: vm.git.user
                            }
                        })
                        .then(function (response) {
                            vm.latest_commit_message = response.data[LATEST].commit.message;
                        });
                });
        }
    }

})();
