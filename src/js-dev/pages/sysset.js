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

		$(function() {

			$.ajax({
				type: "GET",
				url: config.api.root + "RobotManage/GetRobotSettingData",
				dataType: "json",
				success: function(data) {
					if(data != null && data != undefined) {
						if(data.robotOptions != null && data.robotOptions != undefined) {
							if(data.poinst != null && data.poinst != undefined && data.poinst.length > 0) {
								var htmlOption = "";
								var htmlOptionCd = "";
								for(var i = 0; i < data.poinst.length; i++) {
									if(data.poinst[i].ID == data.robotOptions.autowork_beginWorkPoint) {
										htmlOption += "<option value=\"" + data.poinst[i].ID + "\" selected=\"selected\">" + data.poinst[i].Name + "</option>";
									} else {
										htmlOption += "<option value=\"" + data.poinst[i].ID + "\">" + data.poinst[i].Name + "</option>";
									}

									if(data.poinst[i].ID == data.robotOptions.autowork_endWorkPoint) {
										htmlOptionCd += "<option value=\"" + data.poinst[i].ID + "\" selected=\"selected\">" + data.poinst[i].Name + "</option>";
									} else {
										htmlOptionCd += "<option value=\"" + data.poinst[i].ID + "\">" + data.poinst[i].Name + "</option>";
									}
								}

								$("#autowork_beginWorkPoint").after(htmlOption);
								$("#autowork_endWorkPoint").after(htmlOptionCd);

							}

							//模式切换
							$(".app-modelset .mode_" + data.robotOptions.mode).addClass("active");
							$(".app-modelset .mode_" + data.robotOptions.mode).siblings().addClass("active");

							//基础设置初始值

							$(".app-basicset .vue-slider").VueSlider(data.robotOptions.base_volume); //设置音量

							$(".base_speedOfSpeech ." + data.robotOptions.base_speedOfSpeech).addClass("active");
							$(".base_speedOfSpeech ." + data.robotOptions.base_speedOfSpeech).siblings().removeClass("active");

							$(".number .num").VueSlider(data.robotOptions.base_volumeThreshold); //识别音量门限

							$(".base_pronunciation ." + data.robotOptions.base_pronunciation).addClass("active"); //发音人
							$(".base_pronunciation ." + data.robotOptions.base_pronunciation).siblings().removeClass("active"); //发音人

							$(".base_walkingSpeed ." + data.robotOptions.base_walkingSpeed).addClass("active"); //导航行走速度
							$(".base_walkingSpeed ." + data.robotOptions.base_walkingSpeed).siblings().removeClass("active"); //导航行走速度

							$(".base_semanticLibrary ." + data.robotOptions.base_semanticLibrary).addClass("active"); //语义库选择
							$(".base_semanticLibrary ." + data.robotOptions.base_semanticLibrary).siblings().removeClass("active"); //语义库选择

							//上下班设置
							var appupDownSet = data.robotOptions.autowork_isAutomaticCommute == "true";
							$(".app-upDownSet .vue-swicth").VueSwicth(appupDownSet)
							$("#autowork_beginWorkTime").val(data.robotOptions.autowork_beginWorkTime); //上班时间
							$("#autowork_endWorkTime").val(data.robotOptions.autowork_endWorkTime); //下班时间

							//个性化设置

						}

					}

				},
				error: function(data) {
					//$.alert("获取地图数据失败");
				}
			});

		});

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

	// 单选 vue-radio 自定事件
	$(".app-modelset .vue-radio").on("vue-radio", function(event, el) {
		//$.alert("选择为:" + $(el).attr("data-val"));
	});
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

}

//app-modelset 附属模块设置
function attrset() {

}

// 个性设置
function perset() {

	//个性设置-选择速度
//	$(document).on("click", ".vue-check-big .btn", function() {
//		var p = $(this).parents(".vue-check-big");
//		p.find(".btn").removeClass("active");
//		$(this).addClass("active");
//		$(this).trigger("vue-check-big", [this]);
//
//	});
//	// 个性设置-选择速度的自定义事件
//	$(".vue-check-big").on("vue-check-big", function(event, el) {
//
//		//$.alert("选择的速度为:"+$(el).text());
//	});

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