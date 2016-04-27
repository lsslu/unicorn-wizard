# unicorn-wizard
Unicorn wizard is a component that will make it easy for you to create wizards in your page. It's no need for you to configure an opiton variable in controller or add submit button for each step by yourself.


# Dependencies
Unicorn wizard depends on Angular and unicorn-decorators. unicorn-decorators is supplied in source code, you can find it in dist folder.

# Starter Guide
## First Example
The first thing we need to do is add a dependency to the module you want to apply unicorn wizard.

We can do this simply by doing:
`
angular.module('app', ['unicorn.wizard', 'unicorn.decorators']);
`

Now, in the page, you can just add a wizard  as follow:

````html
<uc-wizard on-finish="finish" height="200">
	<uc-wz-step title="info">
		<div uc-include="step1.html"></div>
	</uc-wz-step>
	<uc-wz-step title="description">
		<ng-form name="step2" uc-form-locator>
			<div class="form-group">
				<label>备注:</label>
				<textarea class="form-control" name="desc" rows="6" ng-model="data.desc"></textarea>
			</div>
		</ng-form>
	</uc-wz-step>
	<uc-wz-step title="finish"></uc-wz-step>
</uc-wizard>
````
This will look like the following when you're in the second step:

Let's go step by step to see how this works:
1) You need to declare a master `uc-wizard` directive. This wizard directive has the following options as attributes:
* **on-finish**: Here you can put a function name that you're going to call it when the wizard is finished.
* **height**: The wizard's height. Default value is zero.

2) Inside the wizard, we can have as many steps as we want. Each step must has a title which is going to be used to identify it. Inside each step, we put whatever we want. Other directives,
