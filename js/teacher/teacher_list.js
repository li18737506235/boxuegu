define(['aside', 'header', 'loading', 'nprogress', 'jquery', 'template'], function(undefined, undefined, undefined, nprogress, $, template) {
	
	// 渲染讲师列表
	(function() {
		/**
		 * 1、发送请求获取讲师列表
		 * 2、请求成功后调用template方法得到讲师列表html
		 * 3、把html添加到页面中即可
		 * */
		$.get('/v6/teacher', function(data) {
			if(data.code === 200) {
				$('.table-teacher-list').append(template('teacher-list-tpl', data));
			}
		});
	})();
	
	nprogress.done();
});
