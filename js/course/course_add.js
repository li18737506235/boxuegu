define(['jquery', 'common', 'header', 'aside', 'nprogress', 'loading', 'jqueryForm'], 
	function($, common, undefined, undefined, nprogress, loading, undefined) {
	
	// 创建课程，成功后跳转到完善课程信息的第一步页面
	$('#course-create-form').ajaxForm(function(data) {
		(data.code == 200) && (location.href = '/html/course/course_add_step1.html?cs_id=' + data.result.cs_id);
	});
	
	nprogress.done();
});
