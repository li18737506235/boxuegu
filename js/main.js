define([], function() {
	
	// 配置
	require.config({
		
		baseUrl: './',
		
		paths: {
			
			// 配置自己写的js模块别名
			advertAdd: 'js/advert/advert_add',
			advertList: 'js/advert/advert_list',
			courseAdd1: 'js/course/course_add_step1',
			courseAdd2: 'js/course/course_add_step2',
			courseAdd3: 'js/course/course_add_step3',
			courseAdd: 'js/course/course_add',
			courseCategoryAdd: 'js/course/course_category_add',
			courseCategory: 'js/course/course_category',
			courseList: 'js/course/course_list',
			courseTopic: 'js/course/course_topic',
			login: 'js/home/login',
			repass: 'js/home/repass',
			settings: 'js/home/settings',
			teacherAdd: 'js/teacher/teacher_add',
			teacherList: 'js/teacher/teacher_list',
			userProfile: 'js/user/user_profile',
			userList: 'js/user/user_list',
			
			// 配置第三方js模块别名
			template: 'lib/artTemplate/template-debug',
			bootstrap: 'lib/bootstrap/js/bootstrap',
			datepicker: 'lib/bootstrap-datepicker/js/bootstrap-datepicker',
			ckeditor: 'lib/ckeditor/ckeditor',
			ckeditorLand: 'lib/ckeditor/lang/zh-cn',
			echarts: 'lib/echarts/echarts.min',
			jquery: 'lib/jquery/jquery.min',
			jqueryCookie: 'lib/jquery-cookie/jquery.cookie',
			jqueryForm: 'lib/jquery-form/jquery.form',
			jqueryRegion: 'lib/jquery-region/jquery.region',
			nprogress: 'lib/nprogress/nprogress',
		},
		
		shim: {
			
			// bootstrap是非define定义的模块，又依赖与jquery，所以需要配置
			bootstrap: {
				deps: ['jquery']
			}
		}
		
	});
	
	
	// 根据页面加载对应的js模块
	
});
