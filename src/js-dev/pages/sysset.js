/*sysset模块*/

// set scroll 
//import setScroll from "../component/setScroll";
//import vueList from "../vue-component/share/list";
//import vueEdit from "../vue-component/share/edit";
//import vueAdd from "../vue-component/share/add";

var sysset = {

	init: function() {

		//日历插件
		setDate();

		// swicth 自定事件
		$(".vue-swicth").on("vue-swicth", function(event, el) {

			//$.alert("选择为:"+$(el).hasClass("active"));
		});

		// 模式切换 
		modelset();

		// 基础设置
		basicset();

		// 上下班设置
		upDownSet();

		// 个性设置
		perset();

		// 附属模块设置
		attrset();

	}

}

//app-modelset 模式切换
function modelset() {

	// 单选 vue-slider 自定事件
	$(".app-modelset .vue-slider").on("vue-slider", function(event, el) {
		//$.alert("选择为:" + $(el).attr("data-val"));
	});
	
	
	// set
$(".vue-slider").VueSlider("90");
// get
//	var v=$(".vue-slider").VueSlider()
	//alert(v)
}

//app-modelset 基础设置
function basicset() {
	// 单选 vue-radio 自定事件
	$(".app-basicset .vue-radio").on("vue-radio", function(event, el) {

		$.alert("选择为:" + $(el).text());
	});

	//发音人
	$(".app-basicset .vue-radio._fayin").on("vue-radio", function(event, el) {

		$.alert("选择为:" + $(el).find("h5").text().trim());
	});

	// 数字框
	$(document).on("number_click", function(event, element) {
		//element 当前点击的元素	
		var p = $(element).parents(".number");
		$.alert("选择：" + $(p).find(".num").val());

	});

	// vue-slider音量滑动触发事件
	//		$(document).on("vue-slider",function(event,v){
	//			console.log("音量："+v);
	//		});

	//  vue-slider設置音量
	//$(".app-basicset .vue-slider").VueSlider(90);

	//  vue-slider獲取音量
	//var v=$(".app-basicset .vue-slider").VueSlider();
	//alert(v)

	// vue-range設置音量
	//set
	//$(".vue-range._yingling").VueRange(3);

	// vue-range獲取音量
	//get
	//var v=$(".app-basicset .vue-slider").VueRnge();
	//alert(v)

	// vue-range音量滑动触发事件
	$(document).on("vue-range", function(event, v) {
		console.log("音量：" + v);
	});
	
	// 单选 vue-radio
	//set
	//$(".base_semanticLibrary.vue-radio").VueRadio(1,"lingju");
	//get
	//var radio_v=$(".base_semanticLibrary.vue-radio").VueRadio();
	//alert(radio_v);
	
}

//app-modelset 上下班设置
function upDownSet() {

	// 设置自动上下班 swicth 组件
	//set
	//$(".app-upDownSet .vue-swicth").VueSwicth(false)

	//get
	// var bl=$(".app-upDownSet .vue-swicth").VueSwicth()
	//$.alert("选择："+bl)
	
	// set
//	$(".vue-number").VueNumber("8");
//	// get
//	var v=$(".vue-number").VueNumber();
//	alert(v);
}

//app-modelset 附属模块设置
function attrset() {

}


// 个性设置
function perset() {


	// 自定义事件
	$(".vue-check").on("vue-check", function(event, el,bl) {

		$.alert("选择的值为:"+bl);
	});
	
	// set 
	$(".vue-check.a1").VueCheck(true);
	// get
	 var v=$(".vue-check.a1").VueCheck();
//	 alert(v)
//	


// vue-check-group自定义事件
	$(".vue-check-group").on("vue-check-group", function(event, el,bl,arrs) {
		
		$.alert("选择的值为:"+arrs);
	});
	
	//set 
	$(".vue-check-group").VueCheckGroup([2,4]);
	
	// get
	var v=$(".vue-check-group").VueCheckGroup();
	//alert(v)

// 添加壁纸背景
$(".app-perset-cont ._btn-bg").on("click",function(){

	$(".pop-mask").addClass("active");
});

// 添加 logo
$(".app-perset-cont ._btn-logo").on("click",function(){

	$(".pop-mask").addClass("active");
});

// 添加更改欢迎页

$(".app-perset-cont ._btn-hy").on("click",function(){

	$(".pop-mask").addClass("active");
});

// 选择图片
$(".pop-mask ._imgs li").click(function(){
	
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
});





}

// 日历插件
var setDate = function() {

	// bs 日历插件
	$('.bs-date').datetimepicker({
		format: "hh:ii  ", //'yyyy-mm-dd hh:ii:ss'
		//showMeridian: true,
		autoclose: true,
		todayBtn: true,
		startView: "day",
		minView: 0, //选择日期

		//forceParse :true  //转换格式

	});

	//日期不准输入
	$('.bs-date').focus(function() {

		$(this).blur();
	});

}

export {

	sysset
}