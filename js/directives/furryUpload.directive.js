furryModule.directive('upload', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeFunc = scope.$eval(attrs.upload);
            element.bind('change', onChangeFunc);
        }
        };
    }]);