define(['jquery', 'common', 'header', 'aside', 'nprogress', 'loading', 'template', 'jqueryForm'], 
	function($, common, undefined, undefined, nprogress, loading, template, undefined) {

	/**
	 * 1、通过search区分是添加还是编辑
	 * 2、不同页面功能采取不同的方式获取页面回显数据
	 * 2.1、添加页面直接给个空对象，但是仍然需要请求接口获取顶级分类，然后把结果添加到这个空对象中
	 * 2.2、编辑页面需要请求接口获取
	 * 3、通过模版引擎把数据渲染到页面中
	 * 4、通过表单提交插件初始化表单提交功能
	 * */

	// 如果查询字符串cg_id不等于null和undefined，那么就认为存在这个值
	var cg_id = common.parseSearch('cg_id');
	if(cg_id != null) {
		$.get('/v6/category/edit', { cg_id: cg_id }, function(data) {
			if(data.code == 200) {
				render(data.result);
			}
		});
	}else {
		$.get('/v6/category/top', function(data) {
			if(data.code == 200) {
				// 为了使用和编辑相同的模版，所以传入的对象，
				// 用于和编辑一样的数据结构，都有一个top属性存储所有的顶级分类。
				render({ top: data.result });
			}
		});
	}
	
	// 通过传入的数据，渲染页面
	function render(data) {
		$('.category-add').html(template('course-category-edit-tpl', data));
	}
	
	// 初始化表单提交功能
	(function initForm() {
		$('#course-category-edit-form').ajaxForm({
			delegation: true,   // 配置委托方式绑定事件，这样即使form不存在是动态创建的也没有关系
			success: function(data) {
				if(data.code == 200) {
					// 添加或者编辑课程分类成功后，跳转到课程分类列表页
					location.href = '/html/course/course_category.html';
				}
			}
		});
	}());

	nprogress.done();
});
