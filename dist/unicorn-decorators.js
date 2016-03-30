angular.module("unicorn.decorators",[]);
angular.module("unicorn.decorators").directive("ucFormLocator",function(){return{restrict:"A",link:function(r){r.$emit("uc:formLocator")}}});
angular.module("unicorn.decorators").directive("ucInclude",function(){return{restrict:"A",replace:!0,templateUrl:function(e,r){return r.ucInclude}}});