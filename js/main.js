define([], function () {
	
	// 这里配置模块的路径与依赖
  require.config({
    baseUrl: '/',
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
      index: 'js/home/index',
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
      //bootstrap是非define依赖于jquery
      bootstrap: {
        deps: ['jquery']
      }
    }
  });
  
  // 这里根据页面的路径进行不同页面的区分进而加载不同的js
  var pathname = location.pathname;
  
  switch(pathname) {
  	case '/':
  		require(['index']);
  		break;
	  case '/html/home/login.html':
	  	require(['login']);
  		break;
	  case '/html/home/repass.html':
	  	require(['repass']);
  		break;
		case '/html/home/settings.html':
	  	require(['settings']);
  		break;
  	case '/html/advert/advert_add.html':
  	  require(['advertAdd']);
  		break;
  	case '/html/advert/advert_list.html':
  	  require(['advertList']);
  		break;
	  case '/html/course/course_add_step1.html':
  	  require(['courseAdd1']);
  		break;
  	case '/html/course/course_add_step2.html':
  	  require(['courseAdd2']);
  		break;
  	case '/html/course/course_add_step3.html':
  	  require(['courseAdd3']);
  		break;
  	case '/html/course/course_add.html':
  	  require(['courseAdd']);
  		break;
  	case '/html/course/course_category_add.html':
  	  require(['courseCategoryAdd']);
  		break;
  	case '/html/course/course_category.html':
  	  require(['courseCategory']);
  		break;
  	case '/html/course/course_list.html':
  	  require(['courseList']);
  		break;
  	case '/html/course/course_topic.html':
  	  require(['courseTopic']);
  		break;
  	case '/html/teacher/teacher_add.html':
  	  require(['teacherAdd']);
  		break;
  	case '/html/teacher/teacher_list.html':
  	  require(['teacherList']);
  		break;
  	case '/html/user/user_profile.html':
  	  require(['userProfile']);
  		break;
  	case '/html/user/user_list.html':
  	  require(['userList']);
  		break;
  }
});
