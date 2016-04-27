# unicorn-wizard
Unicorn wizard 是一个angular wizard组件。无须在controller中添加组件配置，也无须配置每一步的buttons，只需设置每一步step以及总的controller即完成wizard的设定。


# 依赖项（Dependencies）
Unicorn wizard 依赖以下模块：
* Angular
* unicorn-decorators （已在源码中提供，见dist目录）

# Starter Guide
## First Example
先行预览请访问index.html。
首先添加unicorn wizard的依赖注入，代码如下：
`
angular.module('app', ['unicorn.wizard', 'unicorn.decorators']);
`

然后在页面输入如下代码，你将会在页面上看到一个unicorn wizard的demo展示：

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
上述代码包含如下内容：
1) `uc-wizard` 指令。 该指令包含如下属性:
* **on-finish**: wizard完成时，触发的事件，可通过它来提交表单数据，该事件绑定的方法配置在当前view的controller中。
* **height**: 设定wizard的高度，如果未空或未设置，默认高度为0。

2) 在`uc-wizard`中，你可以设置任意多个`uc-wz-step`。 每个step必须有一个title属性，且title不可重复。在step中可以任意填写内容，如果在step内使用form或者ng-form，需要追加装饰指令`uc-form-locator`，该指令会将form对象传递给wizard指令，以便在切换step时自动验证表单。


