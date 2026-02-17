var baseModule = angular.module("baseModule", [
    , 'ngAnimate'
    , 'toaster'
    , 'oitozero.ngSweetAlert'
    , 'ngCookies'
    , 'ngStorage'
    , 'ngSanitize'
    , 'ngTouch'
    , 'ui.bootstrap'
    , 'ngFileUpload'
    , 'ngMap'
    , 'ui.select'
    , 'dndLists'
]);

baseModule.service(
    "globalVariableFactory"
    , [
        '$rootScope'
        , '$window'
        , globalVariableFactory
    ]);

baseModule.service("genericWebConnectionService"
    , ["$http"
        , "$window"
        , "$q"
        , "globalVariableFactory"
        , genericWebConnectionService
    ]);

baseModule.controller("baseController"
    , ["$scope"
        , "$rootScope"
        , "$location"
        , "$anchorScroll"
        , "$localStorage"
        , "$window"
        , "$timeout"
        , "$uibModal"
        , "$q"
        , "$document"
        , "$parse"
        , "SweetAlert"
        , "toaster"
        , "globalVariableFactory"
        , "Upload"
        , baseController
    ]);

baseModule.directive('resize', ['$rootScope', '$window', function ($rootScope, $window) {
    return {
        link: function (scope, element, attrs) {
            function onResize(e) {
                $rootScope.$broadcast('resize::resize');
            }
            function cleanUp() {
                angular.element($window).off('resize', onResize);
            }
            angular.element($window).on('resize', onResize);
            scope.$on('$destroy', cleanUp);
        }
    };
}]);

baseModule.directive("disableAnimate", ['$animate', function ($animate) {
    return function (scope, element) {
        $animate.enabled(false, element);
    };
}]);


baseModule.directive('refreshOnUpload', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            scope.$watch(attrs['ngModel'], function (v) {
                if (elem.width() > 0) {
                    elem.css('width', elem.width() + 'px');
                }
            });
        }
    };
}]);


baseModule.run(['$rootScope',
    function ($rootScope) {
        //FastClick.attach(document.body);

        // GLOBAL APP SCOPE
        // set below basic information
        $rootScope.app = {
            name: 'The Hub', // name of your project
            author: 'The Hub Business Solutions Ltd', // author's name or company name
            description: '', // brief description
            version: '2.0', // current version
            year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
            isMobile: (function () {// true if the browser is a mobile device
                var check = false;
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    check = true;
                };
                return check;
            })()
        };
    }]);

baseModule.constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});

baseModule.filter("trustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
}]);

baseModule.filter('minLength', function () {
    return function (input, len, pad) {
        input = input.toString();
        if (input.length >= len) return input;
        else {
            pad = (pad || 0).toString();
            return new Array(1 + len - input.length).join(pad) + input;
        }
    };
});

baseModule.factory("authInterceptor", ["$rootScope", "$q", "$window", ($rootScope, $q, $window) => new authInterceptorFactory($rootScope, $q, $window)]);

baseModule.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);

baseModule.config(['$sceProvider', function ($sceProvider) {
    $sceProvider.enabled(false);
}])

//baseModule.config(function ($interpolateProvider) {
//    $interpolateProvider.startSymbol('[[').endSymbol(']]');
//});




baseModule.directive('multiselectDropdown', function () {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            options: '=',
            placeholder: '=',
            clickId: '='
        },
        template:
            "<div class='advanced-search-select-container dropdown'>" +
            "<button class='form-control bg-white-blue-color black-color dropdown-toggle' data-bs-toggle='dropdown'>{{placeholder}}</button>" +
            "<ul class='dropdown-menu max-height-menu' aria-labelledby='dropdownMenu' style='position: relative;'>" +
            "<li style='cursor:pointer;' data-ng-repeat='option in options' class='list-item-text'><a data-ng-click='toggleSelectItem(option,$event)'><span data-ng-class='getClassName(option)' class='top-align' aria-hidden='true'></span> <span class='list-item-text'>{{option.name}}</span> </a></li>" +
            "</ul>" +
            "</div>",


        controller: function ($scope) {

            $scope.openDropdown = function () {

                $scope.open = !$scope.open;

            };

            $scope.selectAll = function () {

                $scope.model = [];

                angular.forEach($scope.options, function (item, index) {

                    $scope.model.push(item);

                });

            };

            $scope.deselectAll = function () {

                $scope.model = [];

            };

            $scope.toggleSelectItem = function (option, event) {
                event.stopPropagation()
                var intIndex = -1;

                angular.forEach($scope.model, function (item, index) {

                    if (item.id == option.id) {

                        intIndex = index;

                    }

                });

                if (intIndex >= 0) {

                    $scope.model.splice(intIndex, 1);

                } else {

                    $scope.model.push(option);

                }
                $scope.$emit("filterSelectClicked", $scope.clickId);

                if ($scope.clickId != null && $scope != undefined) {
               
                }
            };

            $scope.getClassName = function (option) {

                var varClassName = 'bi bi-square';//not selected

                angular.forEach($scope.model, function (item, index) {

                    if (item.id == option.id) {

                        varClassName = 'bi bi-square-fill';

                    }

                });

                return (varClassName);

            };

        }
    }

});


// Add capitalize filter
baseModule.filter('capitalize', function () {
    return function (input) {
        if (!input) return '';
        return input.charAt(0).toUpperCase() + input.slice(1);
    };
});


baseModule.filter('min', function () {
    return function (a, b) {
        return Math.min(a, b);
    };
});