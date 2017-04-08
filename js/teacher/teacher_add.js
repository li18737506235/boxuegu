define(['aside', 'header', 'loading', 'nprogress', 'jquery', 'template', 'jqueryForm', 'datepicker', 'datepickerCN'], 
	function(undefined, undefined, undefined, nprogress, $, template, undefined, undefined, undefined) {
	
	/**
	 * 我们这里的js，作用与两个页面，一个是讲师添加，一个是讲师编辑。
	 * 1、获取页面的查询字符串，提取成一个对象
	 * 2、然后判断里面有没有tc_id参数，如果有则认为是编辑，没有认为是添加
	 * 3、根据判断结果，执行对应的代码
	 * */
	
	/**
	 * 提取查询字符串中指定的值：
	 * 1、先去掉查询字符串的?号
	 * 2、使用&符号劈开这个字符串，得到一个数组，里面存储着每一个单独的查询字符串
	 * 3、然后遍历这个数组，每一个单独字符串继续使用=号劈开，提取每一个查询字符串的key与value
	 * 4、把这些查询字符串的key与value存储到一个对象中，方便使用
	 * */
	var urlSearch = location.search.slice(1);
	var urlSeachArr = urlSearch.split('&');
	var urlSeachObj = {}, temp;
	for(var i = 0, len = urlSeachArr.length; i < len; i++) {
		temp = urlSeachArr[i].split('=');
		urlSeachObj[temp[0]] = temp[1];
	}
	
	
	// 判断参数中有没有tc_id，有则认为是编译，没有添加
	if(urlSeachObj.hasOwnProperty('tc_id')) {
		teacherEdit();
	}else {
		teacherAdd();
	}
	
	// 添加讲师，成功后跳转到讲师列表页
	function teacherAdd() {
		
		// 把模版渲染到页面中，因为是添加，所以不需要回显数据，那么传递一个空对象即可
		$('.teacher').html(template('teacher-add-edit-tpl', {}));
		
		// 页面渲染完毕，初始化日期插件
		initDatepicker();
		
		// 提交，因为表单是动态生成的，所以使用委托的方式监听事件
//		$(document).on('submit', '#teacher-add-edit-form', function() {
//			$.post('/v6/teacher/add', $(this).serialize(), function(data) {
//				location.href = '/html/teacher/teacher_list.html';
//			});
//			return false;
//		});
		
		// 利用form表单提交插件监听提交事件，发送ajax请求
		$('#teacher-add-edit-form').ajaxForm(function(data) {
			location.href = '/html/teacher/teacher_list.html';
		});
	};
	
	// 回显讲师数据，修改讲师数据
	function teacherEdit() {
		
		// 回显，根据url传入的tc_id属性获取对应讲师的详细信息，然后回显数据
		$.get('/v6/teacher/edit', { tc_id: urlSeachObj.tc_id }, function(data) {
			$('.teacher').html(template('teacher-add-edit-tpl', data.result));
			
			// 页面渲染完毕，初始化日期插件
			initDatepicker();
		});
		
		// 提交，因为表单是动态生成的，所以使用委托的方式监听事件
		$(document).on('submit', '#teacher-add-edit-form', function() {
			$.post('/v6/teacher/update', $(this).serialize(), function(data) {
				location.href = '/html/teacher/teacher_list.html';
			});
			return false;
		});
	};
	
	
	// 初始化日期插件
	function initDatepicker() {
		$('#datepicker-join').datepicker({
			language: 'zh-CN',
			endDate: new Date(),
			format: 'yyyy-mm-dd'
		});
	}
	
	nprogress.done();
});
