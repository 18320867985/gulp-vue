
import   "./config.js";
import   "./common/autoRun.js";
import   "./libs/browser-moz.js";

// vue 
import   './libs/vue/vue.js'
import   './libs/vue/vue-resource.js'
Vue.http.options.root=config.api.root;
Vue.http.options.emulateJSON=true;
import   './vue-component/vue-filter.js'   // 全局过滤

// vue组件引用
//import {vue_select} from "./vue-component/vue-select.js";


// jquery
import   "./libs/jquery-1.11.0.js";
import   "./libs/bootstrap.js";


// common

import   './component/jq-ui.js'  ; 





// 页面js模块

export  {login} from  './pages/login.js' ;  	// login页面;

export  {index} from  './pages/index.js' ; 		 // index页面;

export  {status} from  './pages/status.js' ;  //status 页面;


export  {pattern_list} from  './pages/pattern_list.js' ;  //pattern_list页面;

export  {pattern_consult} from  './pages/pattern_consult.js' ;  // pattern_consult页面;

export  {pattern_edit} from  './pages/pattern_edit.js' ;  // pattern_scene页面;

export { pattern_company } from './pages/pattern_company.js';  //  企业介绍页面;

export { pattern_company_edit } from './pages/pattern_company_edit.js';  //  企业介绍编辑;

export  {pattern_publicIty} from  './pages/pattern_publicIty.js' ;  //  企业介绍页面;

export  {scene_map} from  './pages/scene_map.js' ;  //  导航地图;

export  {scene_create} from  './pages/scene_create.js' ;  //  创建场景;

export  {sysset} from  './pages/sysset.js' ;  //  系统设置;

export  {control} from  './pages/control.js' ;  //  控制页面

export  {scene_point} from  './pages/scene_point.js' ;  //  编辑场景点坐标










export  {test} from  './pages/test.js' ;  // 测试页面;

// iframe 加载完成的loading动画   必须放在最后
import   "./common/end.js";


