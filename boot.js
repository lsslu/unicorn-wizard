angular.module('app', ['unicorn.wizard', 'unicorn.decorators']);

angular.element(document).ready(function(){
    console.log('bootstrap');
    angular.bootstrap(document, ['app']);
});
