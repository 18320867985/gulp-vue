/*swicth组件
 * <div class="vue-swicth ">
		<div class="vue-swicth-handler">
		</div>
	</div>
	
	 设置 swicth 组件
	//set
	//$(".app-upDownSet .vue-swicth").VueSwicth(false)

	//get
	// var bl=$(".app-upDownSet .vue-swicth").VueSwicth()
	//$.alert("选择："+bl)
	
	// swicth 自定事件
		$(".vue-swicth").on("vue-swicth", function(event, el) {

			//$.alert("选择为:"+$(el).hasClass("active"));
		});

 * */

(function() {
	
		$(document).on("click", ".vue-swicth", function(event) {
			event.preventDefault();
			var isHasClass = $(this).hasClass("active");
			if(isHasClass) {
				$(this).removeClass("active");
			} else {
				$(this).addClass("active");
			}

			// 触发自定义的事件
			$(this).trigger("vue-swicth", [this]);

		});
		//vue-switch 
	$.fn.extend({

			VueSwicth: function(bl) {
				if(typeof bl != "undefined") {
					if(bl == true) {
						$(this).addClass("active")
					} else {
						$(this).removeClass("active")
					}

				} else {
					var v = $(this).hasClass("active");

					return v;
				}
			}
		});

})();