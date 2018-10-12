/*滑块组件
 * <div class="vue-slider" data-val="70">
	        <div class="vue-slider-bar">
	            <div class="vue-slider-bg">
	                <div class="vue-slider-handler">
	                </div>
	            </div>
	            <div class="vue-slider-percent">0%</div>
	        </div>
	    </div>
	    
	// vue-slider音量滑动触发事件
	//		$(document).on("vue-slider",function(event,v){
	//			console.log("音量："+v);
	//		});

	//  vue-slider設置音量
	//$(".app-basicset .vue-slider").VueSlider(90);

	//  vue-slider獲取音量
	//var v=$(".app-basicset .vue-slider").VueSlider();
	//alert(v)
	    
 * */

(function() {
	
		$(document).on("mousedown", ".vue-slider-handler", function(e) {
			e.preventDefault();
			var p = $(this).parents(".vue-slider");
			var src_x = e.clientX;
			var obj = $(this);
			var _left = obj.css("left");
			var _w = obj.width();
			var _slider_w = $(".vue-slider-bar", p).width();
			$(".vue-slider-bg", p).width(_left);
			var _move_w = _slider_w - _w;
			$(document).mousemove(function(event) {
				event.preventDefault();
				var new_x = event.clientX - src_x;
				new_x = parseFloat(_left) + parseFloat(new_x);

				if(new_x >= _move_w) {
					new_x = _move_w;
				}
				if(new_x <= 0) {
					new_x = 0;
				}

				obj.css({
					left: new_x
				});
				$(".vue-slider-bg", p).width(new_x + _w);
				var _per = ((new_x / _move_w) * 100).toFixed(0);
				$(".vue-slider-percent", p).html(_per + "%");
				p.attr("data-val", _per);

				// 触发自定义的事件
				$(this).trigger("vue-slider", [_per]);
			});
			$(document).on("mouseup", function() {
				$(document).off("mousemove");
				$(document).off("mouseup");

			});

		});

		$(".vue-slider").each(function() {
			var _v = $(this).attr("data-val");
			var _w = $(this).find(".vue-slider-bar").width();
			$(".vue-slider-bg", $(this)).width(_w * (_v / 100));
			var _per = (_w * (_v / 100)).toFixed(0);
			$(".vue-slider-percent", $(this)).html(_per + "%");
			var _handler = $(".vue-slider-handler", $(this));
			var _handler_w = _w * (_v / 100) - _handler.width();
			_handler.css({
				left: _handler_w
			});

		});

		//vue-slider 
		jQuery.fn.extend({

			VueSlider: function(val) {
				if(val) {
					var _v = typeof val === "number" ? val : 0; //$(this).attr("data-val");
					var _w = $(this).find(".vue-slider-bar").width();
					$(".vue-slider-bg", $(this)).width(_w * (_v / 100));
					var _per = (_w * (_v / 100)).toFixed(0);
					$(this).attr("data-val", _per);
					$(".vue-slider-percent", $(this)).html(_per + "%");
					var _handler = $(".vue-slider-handler", $(this));
					var _handler_w = _w * (_v / 100) - _handler.width();
					_handler.css({
						left: _handler_w
					});
				} else {
					return parseFloat($(this).attr("data-val"));
				}
			}
		});

})();