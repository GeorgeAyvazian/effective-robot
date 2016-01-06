angularApp.directive('contenteditable1', function () {
    return {
        scope: {
            ngModel: '='
        },
        link: function ($scope, elem, attrs) {
            elem.bind('blur', function () {
                $scope.ngModel = attrs.format == 'Number' ? parseInt(elem.html()) : elem.html();
                $scope.$apply();
            });

            elem.bind('keydown', function (event) {
                if (27 === event.which) {
                    event.target.blur();
                    event.preventDefault();
                }
            });
        }
    };
});
