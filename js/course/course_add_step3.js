define(['bootstrap', 'jquery', 'common', 'header', 'aside', 'nprogress', 'loading', 'template', 'jqueryForm'], 
	function(undefined, $, common, undefined, undefined, nprogress, loading, template, undefined) {

	/**
	 * // 课程信息页面
	 * 1、获取url查询字符串中的cs_id
	 * 2、利用这个cs_id请求接口获取当前课程的基本信息，渲染页面进行数据回显
	 * 3、数据回显后，实现课时的添加与编辑
	 * 
	 * // 课时添加与编辑
	 * 3.1、区分添加与编辑获取不同的数据，回显模态框页面数据
	 * 3.2、初始化模态框的表单提交
	 * */
	
	// 1、获取url查询字符串中的cs_id
	var csId = common.parseSearch('cs_id');
	
	// 2、利用这个cs_id请求接口获取当前课程的基本信息，渲染页面进行数据回显
	$.get('/v6/course/lesson', { cs_id: csId }, function(data) {
		if(data.code == 200) {
			$('.steps').html(template('add-step3-tpl', data.result));
		}
	});
	
	// 3.1、区分添加与编辑获取不同的数据，回显模态框页面数据
	// 点击编辑课时的按钮，获取对应的课时id，请求接口获取该课时数据进行回显
	$(document).on('click', '.ct-edit-btn', function() {
		var ctId = $(this).data('ct-id');
		$.get('/v6/course/chapter/edit', { ct_id: ctId }, function(data) {
			$('.modal-content').html(template('modal-content-tpl', data.result));
		});
	});
	// 点击添加课时的按钮，渲染一个空对象上去
	$(document).on('click', '#ct-add-btn', function() {
		$('.modal-content').html(template('modal-content-tpl', {}));
	});

	// 3.2、初始化模态框的表单提交
	// 点击模态框右下角的提交按钮，手动触发表单的ajax发送
	$(document).on('click', '#add-edit-submit-btn', function() {
		
		// 以ajax的方式提交表单数据
		$('#add-edit-form').ajaxSubmit({
			// 模态框模版中没有课程ID表单，所以在这里额外进行补充
			data: {
				ct_cs_id: csId
			},
			success: function(data) {
				data.code == 200 && location.reload();
			}
		});
	});
	
	nprogress.done();
});
