var cardModule = angular.module("cardModule", ['purplefox.numeric', 'ngMap', 'textAngular']);
cardModule.service("cardWebService", ["genericWebConnectionService",
    "globalVariableFactory",
    cardWebService]);
cardModule.config(['$provide', function ($provide) {
        $provide.decorator('taOptions', ['$delegate', function (taOptions) {
                // Change the icon for "Insert Image"
                taOptions.toolbar[1] = taOptions.toolbar[1].map(function (button) {
                    return button === 'insertImage' ? 'customInsertImage' : button;
                });
                return taOptions;
            }]);
        // Define the custom tool
        $provide.decorator('taTools', ['$delegate', function (taTools) {
                taTools.customInsertImage = angular.copy(taTools.insertImage);
                taTools.customInsertImage.iconclass = 'far fa-image'; // <- new icon class
                return taTools;
            }]);
    }]);
cardModule.directive('dragEvents', function () {
    return {
        restrict: 'A',
        scope: {
            dragStart: '&',
            dragOver: '&',
            drop: '&',
            dragEnd: '&'
        },
        link: function (scope, element) {
            element.attr('draggable', true);
            element[0].addEventListener('dragstart', function (e) {
                element.addClass('dragging');
                scope.dragStart({ $event: e });
            });
            element[0].addEventListener('dragover', function (e) {
                e.preventDefault();
                element.addClass('drag-over');
                scope.dragOver({ $event: e });
            });
            element[0].addEventListener('dragleave', function () {
                element.removeClass('drag-over');
            });
            element[0].addEventListener('drop', function (e) {
                e.preventDefault();
                element.removeClass('drag-over');
                scope.drop({ $event: e });
            });
            element[0].addEventListener('dragend', function (e) {
                element.removeClass('dragging');
                element.removeClass('drag-over');
                scope.dragEnd({ $event: e });
            });
        }
    };
});
baseModule.requires.push("cardModule");
