/*
 * vue-radio 组件
 * <div class="vue-radio">
		<div class="vue-radio-item" data-val="lingju">灵聚</div>
		<div class="vue-radio-item" data-val="tengxun">腾讯</div>
		<div class="vue-radio-item" data-val="xunfei">科大讯飞</div>
	</div>
	
	set
	$(".base_semanticLibrary.vue-radio").VueRadio(1,"lingju");
	get
	var radio_v=$(".base_semanticLibrary.vue-radio").VueRadio();
	
	 单选 vue-radio 自定事件
	$(".app-modelset .vue-radio").on("vue-radio", function(event, el) {
		$.alert("选择为:" + $(el).attr("data-val"));
	});
	
 * */

(function() {
	$(document).on("click", ".vue-radio-item", function() {

		var p = $(this).parents(".vue-radio");
		p.find(".vue-radio-item").removeClass("active");
		$(this).addClass("active");

		// 触发自定义的事件
		$(this).trigger("vue-radio", [this]);
	});

	jQuery.fn.extend({

		VueRadio: function(index, v) {
			if(arguments.length === 2) {
				if(typeof index === "number") {
					index = index - 1;
					$(this).find(".vue-radio-item").removeClass("active");
					$(this).find(".vue-radio-item").eq(index).attr("data-val", v);
					$(this).find(".vue-radio-item").eq(index).addClass("active");
				}
			} else {

				return $(this).find(".vue-radio-item.active").attr("data-val");
			}
		}
	});

})();