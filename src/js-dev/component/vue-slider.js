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
		_v = isNaN(_v)?0:Number(_v);
		var min = $(this).attr("data-min") || 0;
		var max = $(this).attr("data-max") || 100;
		if(_v < min) {
			_v = min;
		}
		if(_v > max) {
			_v = max;
		}

		var _w = $(this).find(".vue-slider-bar").width();
		var pv=_v / max;
		
		
		$(".vue-slider-percent", $(this)).html((pv*100).toFixed(0) + "%");
		
		var _handler = $(".vue-slider-handler", $(this));
		$(".vue-slider-bg", $(this)).width(_w * pv+_handler.width());
		
		var _handler_w = _w * (pv) ;//- _handler.width();
		_handler.css({
			left: _handler_w
		});

	});

	//vue-slider 
	jQuery.fn.extend({

		VueSlider: function(val) {
			if(typeof val!=="undefined") {
				var _v = isNaN(val)?0:Number(val);
				var min = $(this).attr("data-min") || 0;
				var max = $(this).attr("data-max") || 100;
				if(_v < min) {
					_v = min;
				}
				if(_v > max) {
					_v = max;
				}
				_v = parseFloat(_v);
				
				
				var _w = $(".vue-slider-bar",this).width();
				
				var pv=_v / max;
				$(".vue-slider-bg", $(this)).width(_w * pv);
				$(this).attr("data-val", (pv*100).toFixed(0));
				$(".vue-slider-percent", $(this)).html( (pv*100).toFixed(0) + "%");
				var _handler = $(".vue-slider-handler", $(this));
				var _handler_w = _w * (pv);
				_handler.css({
					left: _handler_w
				});
			} else {
				return parseFloat($(this).attr("data-val"));
			}
		}
	});

})();



