angular.module('unicorn.decorators').directive('ucInclude', function(){
    return {
        restrict: 'A',
        replace: true,
        templateUrl: function(element, attr){
            return attr.ucInclude;
        }
    };
});
