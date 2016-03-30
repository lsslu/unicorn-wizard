angular.module('unicorn.decorators').directive('ucFormLocator', function(){
    return {
        restrict: 'A',
        link: function(scope){
            scope.$emit('uc:formLocator');
        }
    };
});
