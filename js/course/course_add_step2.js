define(['jquery', 'common', 'header', 'aside', 'nprogress', 'loading', 'template', 'jqueryForm', 'uploadify'], 
	function($, common, undefined, undefined, nprogress, loading, template, undefined, undefined) {
	
	
	/**
	 * 1、获取url查询字符串中的cs_id
	 * 2、利用这个cs_id请求接口获取当前课程的基本信息，渲染页面进行数据回显
	 * 3、数据回显后，初始化图片上传插件
	 * */
	
	// 1、获取url查询字符串中的cs_id
	var csId = common.parseSearch('cs_id');
	
	// 2、利用这个cs_id请求接口获取当前课程的基本信息，渲染页面进行数据回显
	$.get('/v6/course/picture', { cs_id: csId }, function(data) {
		if(data.code == 200) {
			$('.steps').html(template('add-step2-tpl', data.result));
			
			// 页面渲染完毕后，初始化相关插件
			uploadFile();
		}
	});
	
	// 3、数据回显后，初始化图片上传插件
	function uploadFile() {
		$('#upfile').uploadify({
			swf: '/lib/uploadify/uploadify.swf',
			uploader: '/v6/uploader/cover',
			fileObjName: 'cs_cover_original',
			formData: {
				cs_id: csId
			},
			itemTemplate: '<i></i>',
			buttonText: '选择图片',
			height: '100%',
			width: '100%',
			buttonClass: 'btn btn-success btn-sm',
			onUploadSuccess: function(file, data, response) {

				// 获取到的data是一个字符串，需要手动解析，如果解析报错，那么赋值为一个空对象
				try {
					data = JSON.parse(data);
				}catch(e) {
					data = {};
				}
				
				if(data.code == 200) {
					$('.preview img').attr('src', data.result.path);
					location.href = '/html/course/course_add_step3.html?cs_id=' + csId;
				}
			}
		});
	}
	

	nprogress.done();
});
