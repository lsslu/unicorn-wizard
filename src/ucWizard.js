"use strict";


angular.module('unicorn.wizard', []);

angular.module('unicorn.wizard')
.service('$ucWizard', function(){
    this.next = function(scope, idx){
        if(scope.options.idx === idx){
            scope.options.completed = scope.form.$valid;
            scope.$emit('wizard:next');
        }
    };

    this.validate = function(scope, data){
        scope.$emit('wizard:finish', data);
    };
})
.directive('ucWizard', function($compile){
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            onFinish: '=',
            onCancel: '='
        },
        templateUrl: 'wizard.tpl.html',
        controller: function ucBaseWizardCtrl($scope){
            $scope.steps = this.steps = [];

            $scope.currentStepIdx = 0;
            $scope.validCount = 0; //the count of valid steps
            $scope.validatedCount = 0; //the count of validated steps

            $scope.buttons = {
                prev: false,
                next: true,
                finish: false,
                cancel: typeof($scope.onCancel) === 'function'
            };

            this.addStep = function _add_step(step){
                step.idx = $scope.steps.length;
                ($scope.steps.length === 0) && (step.actived = true);

                $scope.steps.push(step);
            };

            function _unselect_all(){
                angular.forEach($scope.steps, function(step){
                    step.actived = false;
                })
            }

            $scope.goTo = function(step){
                if(!step){
                    throw '"step" is undefined. \
                    Perhaps the currentStepIdx is out of range. \
                    May be you should check the "idx" of steps.';
                    return;
                }
                _unselect_all();
                step.actived = true;
                $scope.currentStepIdx = step.idx;

                $scope.buttons.prev = $scope.currentStepIdx > 0;
                $scope.buttons.next = $scope.currentStepIdx < $scope.steps.length - 1;
                $scope.buttons.finish = $scope.currentStepIdx == $scope.steps.length - 1;
            };

            $scope.next = function(){
                $scope.$broadcast('wizard-step:canleave', $scope.currentStepIdx);
            };

            $scope.prev = function(){
                $scope.goTo($scope.steps[--$scope.currentStepIdx])
            };

            $scope.finish = function(){
                $scope.validCount = 0;
                $scope.validatedCount = 0;
                $scope.$broadcast('wizard-step:validate');
            };

            $scope.cancel = function(){
                if(typeof($scope.onCancel) === 'function'){
                    $scope.onCancel();
                }
            }


            $scope.$on('wizard:next', function(event, data){
                $scope.goTo($scope.steps[++$scope.currentStepIdx]);
            });

            $scope.$on('wizard:finish', function(event, data){
                $scope.validatedCount += 1;
                $scope.steps[data.idx].completed = data.valid;

                if(data.valid){
                    $scope.validCount += 1;
                }

                if($scope.validatedCount < $scope.steps.length){
                    return;
                }

                if($scope.validCount < $scope.steps.length){
                    for(var i=0; i<$scope.steps.length; i++){
                        if(!$scope.steps[i].completed){
                            $scope.goTo($scope.steps[i]);
                            break;
                        }
                    }

                    return;
                }

                if(typeof($scope.onFinish) === 'function'){
                    $scope.onFinish();
                }
            });
        },
        link: function(scope, element, attrs){
            element.find('.content').height(attrs.height);

            scope.stepWidth = (100 / scope.steps.length).toFixed(2)+'%';
        }
    };
})
.directive('ucWzStep', function(){
    return {
        restrict: 'E',
        scope: true,
        replace: true,
        transclude: true,
        require: '^ucWizard',
        template: '<div ng-transclude class="uc-wz-step" ng-show="options.actived"></div>',
        controller: function ucWxStepCtrl($scope, $ucWizard){
            $scope.$on('uc:formLocator', function(event){
                $scope._formCtrlScope = event.targetScope;

                if($scope._element){
                    var formName = $scope._element.find('ng-form,form').attr('name');
                    if(formName && $scope._formCtrlScope){
                        $scope.form = $scope._formCtrlScope[formName];
                        delete $scope._formCtrlScope;
                        delete $scope._element;
                    }
                }
            });

            $scope.$on('wizard-step:canleave', function(event, idx){
                if (!$scope.form) { return; }
                if ($scope.form.$invalid) {
                    $scope.options.completed = false;
                    return;
                }

                $ucWizard.next($scope, idx);
            });

            $scope.$on('wizard-step:validate', function(event){
                $ucWizard.validate($scope, {
                    idx: $scope.options.idx,
                    valid: $scope.form ? $scope.form.$valid : true
                });
            });
        },
        link: function(scope, element, attrs, wizard){
            scope.options = {
                title: element.attr('title'),
                actived: false,
                completed: false
            }

            var formName = element.find('ng-form,form').attr('name');
            if(formName && scope._formCtrlScope){
                scope.form = scope._formCtrlScope[formName];
                delete scope._formCtrlScope;
            }
            else {
                scope._element = element;
            }

            wizard.addStep(scope.options);
        }
    };
});
