/*
 * vue-range滑块组件
 * <div class="vue-range _yingling">
		<input type="range" name="" step="1" min="1" max="10" value="8" />
		<span>5</span>
	</div>
	
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
	})

 * */

(function() {

	$(document).on("change", ".vue-range [type=range]", function() {
		var p = $(this).parents(".vue-range");
		$("span", p).html(this.value);

		// 触发事件
		$(this).trigger("vue-range", [this.value]);
	});

	$.fn.extend({

		VueRange: function(val) {
			var p = $(this);
			if(val) {

				var v = isNaN(val) ? 0 : val;
				$("[type=range]", p).val(v);
				$("span", p).text(v);
			} else {
				return parseFloat($("[type=range]", p).val());
			}
		}
	});

})();