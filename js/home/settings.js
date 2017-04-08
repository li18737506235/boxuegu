define(['jquery', 'common', 'header', 'aside', 'nprogress', 'loading', 'template', 'jqueryForm', 'datepicker', 'datepickerCN'], 
	function($, undefined, undefined, undefined, nprogress, loading, template, undefined, undefined, undefined) {
	
	
	// 数据回显
	$.get('/v6/teacher/profile', function(data) {
		if(data.code == 200) {
			$('.settings').html(template('settings-form-tpl', data.result));
			modify();   // 只有当表单渲染完毕后，才能调用插件
			$('.datepicker-input').datepicker({
				language: 'zh-CN',
				endDate: new Date(),
				format: 'yyyy-mm-dd'
			});
		}
	});
	
	
	// 修改数据
	function modify() {
		$('#settings-form').ajaxForm(function(data) {
			if(data.code == 200) {
				location.reload();
			}
		});
	}
	
	
	nprogress.done();
});
