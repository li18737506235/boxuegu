define(['bootstrap', 'aside', 'header', 'loading', 'nprogress', 'jquery', 'template'], function(undefined, undefined, undefined, undefined, nprogress, $, template) {
	
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
	
	// 渲染讲师详情
	(function() {
		$(document).on('click', '.teacher-view', function() {
			$.get('/v6/teacher/view', {
				tc_id: $(this).data('teacher-id')
			}, function(data) {
				if(data.code === 200) {
					$('#teacher-modal').html(template('teacher-view-tpl', data.result));
				}
			});
		});
	})();
	
	// 注销启动讲师
	(function() {
		$(document).on('click', '.teacher-handle', function() {
			var self = this;
			$.post('/v6/teacher/handle', {
				tc_id: $(this).data('teacher-id'),
				tc_status: $(this).data('teacher-status')
			}, function(data) {
				if(data.code == 200) {
					
					// 调用接口，会得到修改后的最新状态，
					// 这个最新状态如果为0，那么讲师当前是开启状态，那么更新按钮的自定义属性为当前状态，
					// 但是按钮显式相反的状态：注销，因为按钮表示的是点击后用户会成为什么状态。
					// 如果为1则相反。
					if(data.result.tc_status == 0) {
						$(self).data('teacher-status', 0);
						$(self).html('注销');
					}else {
						$(self).data('teacher-status', 1);
						$(self).html('启用');
					}
				}
			});
		});
	})();
	
	nprogress.done();
});
