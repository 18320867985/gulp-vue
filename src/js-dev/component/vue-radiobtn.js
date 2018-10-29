/*
 * vue-radiobtn 组件
 * <div class="vue-radiobtn">
		<div class="vue-radiobtn-item" data-val="lingju">灵聚</div>
		<div class="vue-radiobtn-item" data-val="tengxun">腾讯</div>
		<div class="vue-radiobtn-item" data-val="xunfei">科大讯飞</div>
	</div>
	
	set
	$(".base_semanticLibrary.vue-radiobtn").VueRadiobtn(1,"lingju");
	get
	var radiobtn_v=$(".base_semanticLibrary.vue-radiobtn").VueRadiobtn();
	
	 单选 vue-radiobtn 自定事件
	$(".app-modelset .vue-radiobtn").on("vue-radiobtn", function(event, el) {
		$.alert("选择为:" + $(el).attr("data-val"));
	});
	
 * */

(function() {
	$(document).on("click", ".vue-radiobtn-item", function() {

		var p = $(this).parents(".vue-radiobtn");
		p.find(".vue-radiobtn-item").removeClass("active");
		$(this).addClass("active");

		// 触发自定义的事件
		$(this).trigger("vue-radiobtn", [this]);
	});

$.fn.extend({

		VueRadiobtn: function(index, v) {
			v=v||"";
			if(arguments.length>=1) {
				if(!isNaN(index)) {
					index=Number(index);
					index = index - 1;
					$(this).find(".vue-radiobtn-item").removeClass("active");
					$(this).find(".vue-radiobtn-item").eq(index).attr("data-val", v);
					$(this).find(".vue-radiobtn-item").eq(index).addClass("active");
				}
			} else {

				return $(this).find(".vue-radiobtn-item.active").attr("data-val");
			}
		}
	});

})();