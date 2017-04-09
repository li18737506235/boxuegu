define(['jquery', 'common', 'header', 'aside', 'nprogress', 'loading', 'template', 'jqueryForm', 'datepicker', 'datepickerCN', 'ckeditor', 'jqueryRegion', 'uploadify'], 
	function($, undefined, undefined, undefined, nprogress, loading, template, undefined, undefined, undefined, ckeditor, undefined, undefined) {
	
	// 用来存储将来实例化好的富文本编辑实例。
	var edit = null;
	
	// 数据回显
	$.get('/v6/teacher/profile', function(data) {
		if(data.code == 200) {
			$('.settings').html(template('settings-form-tpl', data.result));
			modify();   
			
			// 只有当表单渲染完毕后，才能调用插件
			$('.datepicker-input').datepicker({
				language: 'zh-CN',
				endDate: new Date(),
				format: 'yyyy-mm-dd'
			});
			
			// 初始化富文本编辑器
			edit = ckeditor.replace('ckeditor', {
				toolbarGroups: [
					{ name: 'styles' }
				]
			});
			
			// 初始化省市三级联动插件
			$('#region').region({
				url: '/lib/jquery-region/region.json'
			});
			
			// 初始化文件上传插件
			$('#upfile').uploadify({
				swf: '/lib/uploadify/uploadify.swf',
				uploader: '/v6/uploader/avatar',
				fileObjName: 'tc_avatar'
			});
		}
	});
	
	// 修改数据
	function modify() {
		$('#settings-form').on('submit', function() {
			
			// 在表单提交之前，更新富文本编辑器的内容到文本框
			edit.updateElement();
			
			// 使用ajax的方式发送表单数据
			$(this).ajaxSubmit({
				
				// 需要在表单数据的基础上，额外累加一个tc_hometown属性值
				data: {
					tc_hometown: $('#p').find('option:selected').text() + '|' + $('#c').find('option:selected').text() + '|' + $('#d').find('option:selected').text()
				},
				success: function(data) {
					if(data.code == 200) {
						location.reload();
					}
				}
			});
			
			return false;
		});
	}
	
	nprogress.done();
});
