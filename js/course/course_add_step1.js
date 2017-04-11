define(['jquery', 'common', 'header', 'aside', 'nprogress', 'loading', 'template', 'jqueryForm'], 
	function($, common, undefined, undefined, nprogress, loading, template, undefined) {
	
	/**
	 * 1、获取url查询字符串中的cs_id
	 * 2、利用这个cs_id请求接口获取当前课程的基本信息，渲染页面进行数据回显
	 * 2.1、页面中存在一个分类2级联动，当选择顶级分类时，需要获取这个顶级分类的id
	 * 2.2、然后通过这个id请求接口得到对应的子级分类数据
	 * 2.3、最后把子级分类的数据渲染成option供用户选择
	 * 3、初始化表单提交插件
	 * */
	
	// 1、获取url查询字符串中的cs_id
	var csId = common.parseSearch('cs_id');
	
	// 2、利用这个cs_id请求接口获取当前课程的基本信息，渲染页面进行数据回显
	$.get('/v6/course/basic', { cs_id: csId }, function(data) {
		if(data.code == 200) {
			$('.steps').html(template('add-step1-tpl', data.result));
		}
	});
	
	// 监听顶级分类选取的事件，选取后，动态设置子级分类下拉列表
	$(document).on('change', '#cgp-select', function() {
		
		// 获取顶级分类下拉列表中，选择的顶级ID
		var cgPid = $(this).val();
		
		// 请求子级分类数据，渲染到对应的子级分类下拉列表
		$.get('/v6/category/child', { cg_id: cgPid }, function(data) {
			var options = '';
			for(var i = 0, len = data.result.length; i < len; i++) {
				options += '<option value="' + data.result[i].cg_id + '">' + data.result[i].cg_name + '</option>'
			}
			$('#cg-select').html(options);
		});
	});
	
	// 3、初始化表单提交插件
	$('#add-step1-form').ajaxForm({
		delegation: true,
		success: function(data) {
			data.code == 200 && (location.href = '/html/course/course_add_step2.html?cs_id=' + csId);
		}
	});

	nprogress.done();
});
