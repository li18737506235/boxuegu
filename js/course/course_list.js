define(['jquery', 'common', 'header', 'aside', 'nprogress', 'loading', 'template'], 
	function($, undefined, undefined, undefined, nprogress, loading, template) {
	
	// 定义一个helper函数，这个函数也叫过滤器
	// 使用helper，必须先传入一个过滤器名词，再传入这个过滤器对应的回调函数
	// 这个回调可以接收两个参数，第一个参数为模版中的数据，第二个参数为使用过滤器时传入的参数
	template.helper('random', function(source, param) {
		// param是一个字符串，里面包含两个信息：最小值和最大值，需要我们利用定好规则劈开得到不同的值
		var params = param.split(', ');
		return Math.ceil(Math.random() * (params[1] - params[0]) + params[0]);
	});
	
	// 渲染课程列表
	$.get('/v6/course', function(data) {
		if(data.code == 200) {
			$('.courses').append(template('course-list-tpl', data));
		}
	});

	nprogress.done();
});
