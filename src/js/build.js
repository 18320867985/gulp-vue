(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.umd = {})));
}(this, (function (exports) {

/*
 * 消息框
  
 	1.confirm 确认框
  <div class="message">
			<div class="message-mask"></div>
			<div class="confirm-box">
				<h4 class="ttl">
				是否要确认删除数据?
			</h4>
				<button class="ok confirm-btn" type="button">确认</button>
				<button class="cancel confirm-btn" type="button">取消</button>
			</div>
	</div>
	
	// js
	$(function() {
		$("#btn").click(function() {
			$(this).confirm("", function() {
			console.log(this)
			},function(){})
		});

	});
	
	
	2.alert 
 	<div class="message">
			<div class="message-mask"></div>
			<div class="alertt-box">
				<h4 class="ttl alert">
				没有选择数据!
			</h4>
				<button class="ok message-box-btn alert" type="button">确认</button>
				
			</div>
	</div>
	
	// js
	$(function() {
		$("#btn").click(function() {
			$(this).alert("没有选择数据!");

	});
 * */

(function () {

	//  confirm
	$.fn.extend({

		confirm: function confirm(mess, okfun, cancelfun, obj) {
			if (!arguments.length >= 2) {

				throw new Error("property is must two");
			}
			obj = obj || {};
			var _okText = obj.ok || "确认";
			var _cancelText = obj.cancel || "取消";
			var _maskbg = obj.maskbg || "";

			this.each(function (i, v) {

				mess = mess || "是否确认删除数据?";
				$(".message").remove();

				// 创建message
				var message = document.createElement("div");
				message.setAttribute("class", "message");
				var message_mask = document.createElement("div");
				message_mask.setAttribute("class", "message-mask");

				var message_box = document.createElement("div");
				message_box.setAttribute("class", "confirm-box");
				if (_maskbg) {
					message_mask.setAttribute("class", "message-mask " + _maskbg);
					message_box.setAttribute("class", "confirm-box " + _maskbg);
				}
				var ttl = document.createElement("h4");
				ttl.setAttribute("class", "ttl");
				ttl.innerText = mess;

				var ok_btn = document.createElement("button");
				ok_btn.setAttribute("type", "button");
				ok_btn.setAttribute("class", "ok confirm-btn");
				ok_btn.innerText = _okText;

				var cancel_btn = document.createElement("button");
				cancel_btn.setAttribute("type", "button");
				cancel_btn.setAttribute("class", "cancel confirm-btn");
				cancel_btn.innerText = _cancelText;

				message_box.appendChild(ttl);
				message_box.appendChild(ok_btn);
				message_box.appendChild(cancel_btn);
				message.appendChild(message_mask);
				message.appendChild(message_box);

				var elm = document.body || document.documentElement;
				elm.appendChild(message);

				$(".message").fadeIn();
				$(".message").on("click", ".confirm-btn.ok", function (e) {

					if (typeof okfun === "function") {
						$(".message").remove();
						okfun.call(v);
					}
				});

				$(".message").on("click", ".confirm-btn.cancel", function (e) {

					if (typeof cancelfun === "function") {

						cancelfun.call(v);
					}
					$(".message").remove();
				});
			});
		}

	});

	//  confirm
	$.extend({
		confirm: function confirm(mess, okfun, cancelfun, obj) {
			if (!arguments.length >= 2) {

				throw new Error("property is must two");
			}
			obj = obj || {};
			var _okText = obj.ok || "确认";
			var _cancelText = obj.cancel || "取消";

			mess = mess || "是否确认删除数据?";
			$(".message").remove();

			// 创建message
			var message = document.createElement("div");
			message.setAttribute("class", "message");
			var message_mask = document.createElement("div");
			message_mask.setAttribute("class", "message-mask");

			var message_box = document.createElement("div");
			message_box.setAttribute("class", "confirm-box");

			var ttl = document.createElement("h4");
			ttl.setAttribute("class", "ttl");
			ttl.innerText = mess;

			var ok_btn = document.createElement("button");
			ok_btn.setAttribute("type", "button");
			ok_btn.setAttribute("class", "ok confirm-btn");
			ok_btn.innerText = _okText;

			var cancel_btn = document.createElement("button");
			cancel_btn.setAttribute("type", "button");
			cancel_btn.setAttribute("class", "cancel confirm-btn");
			cancel_btn.innerText = _cancelText;

			message_box.appendChild(ttl);
			message_box.appendChild(ok_btn);
			message_box.appendChild(cancel_btn);
			message.appendChild(message_mask);
			message.appendChild(message_box);

			var elm = document.body || document.documentElement;
			elm.appendChild(message);

			$(".message").fadeIn();
			$(".message").on("click", ".confirm-btn.ok", function (e) {

				if (typeof okfun === "function") {
					$(".message").remove();
					okfun();
				}
			});

			$(".message").on("click", ".confirm-btn.cancel", function (e) {

				if (typeof cancelfun === "function") {
					cancelfun();
				}
				$(".message").remove();
			});
		}

	});

	//  alert
	$.fn.extend({

		alert: _alert
	});

	//  alert
	$.extend({

		alert: _alert
	});

	function _alert(mess, obj) {

		obj = obj || {};
		var _okText = obj.ok || "确定";

		mess = mess || "没有选择数据！";
		$(".message").remove();

		// 创建message
		var message = document.createElement("div");
		message.setAttribute("class", "message");
		var message_mask = document.createElement("div");
		message_mask.setAttribute("class", "message-mask");

		var message_box = document.createElement("div");
		message_box.setAttribute("class", "alert-box");

		var ttl = document.createElement("h4");
		ttl.setAttribute("class", "ttl");
		ttl.innerText = mess;

		var ok_btn = document.createElement("button");
		ok_btn.setAttribute("type", "button");
		ok_btn.setAttribute("class", "ok alert-btn");
		ok_btn.innerText = _okText;

		message_box.appendChild(ttl);
		message_box.appendChild(ok_btn);
		message.appendChild(message_mask);
		message.appendChild(message_box);

		var elm = document.body || document.documentElement;
		elm.appendChild(message);

		$(".message").fadeIn();
		$(".message").on("click", ".alert-btn.ok", function (e) {
			$(".message").remove();
		});
	}

	//  info
	$.fn.extend({
		info: _info
	});

	//  info
	$.extend({
		info: _info
	});

	function _info(mess, type) {

		mess = mess || "信息提示框";
		$(".messageinfo").remove();
		var _class = "default";
		if (typeof type === "number") {
			switch (type) {
				case 0:
					_class = "default";
					break;
				case 1:
					_class = "success";
					break;
				case 2:
					_class = "warning";
					break;
				case 3:
					_class = "danger";
					break;
				default:
					_class = "default";
			}
		} else if (typeof type === "string") {
			switch (type) {
				case "default":
					_class = "default";
					break;
				case "success":
					_class = "success";
					break;
				case "warning":
					_class = "warning";
					break;
				case "danger":
					_class = "danger";
					break;
				default:
					_class = "default";
			}
		}

		// 创建message
		var message = document.createElement("div");
		message.setAttribute("class", "messageinfo");

		var message_box = document.createElement("div");
		message_box.setAttribute("class", "info-box");

		var ttl = document.createElement("h4");
		ttl.setAttribute("class", "ttl " + _class);
		ttl.innerText = mess;

		message_box.appendChild(ttl);
		message.appendChild(message_box);

		var elm = document.body || document.documentElement;
		elm.appendChild(message);

		$(".messageinfo").fadeIn(600);
		var setTimeoutId = setTimeout(function () {
			$(".messageinfo").fadeOut().queue(function () {
				$(".messageinfo").remove();
				clearTimeout(setTimeoutId);
			});

			//alert()
		}, 1500);
	}

	// loading 加载动画
	$.extend({
		loadingAdd: function loadingAdd(el, loadingText) {
			var _loadingText = "正在加载数据...";
			if (loadingText) {
				_loadingText = loadingText;
			}
			var text = "\n\t\t\t<div class=\"loading-box\">\n               <div class=\"loading-content\">\n                    <span  class=\"iconfont icon-loading spin\"></span>\n                    <span class=\"loading-text\">" + _loadingText + "</span>\n                </div>                         \n    \t\t</div>";

			$(el).append(text);
		},

		loadingRemove: function loadingRemove(el) {

			$(".loading-box", el).remove();
		}

	});
})();

/*弹框模块
 * 
 * <!--选择图片库   加上data-mask=不許点击pop-mask隐藏-->
	<div class="pop-mask">

		<div class="pop-box">
			<h5 class="pop-ttl">选择图片</h5>
			<div class="pop-content">
				
			</div>
			<div class="pop-footer text-center">
					<button class="btn btn-warning cancel" type="button">取消</button>
					<button class="btn btn-primary" type="button">确认</button>
			</div>

		</div>

	</div>
 
 * */

(function () {

	$(".pop-mask").click(function () {

		if (!$(this)[0].hasAttribute("data-mask")) {
			$(this).removeClass("active");
		}
	});
	$(".pop-mask .pop-box").click(function (event) {

		event.stopPropagation();
	});
	// cancel
	$(".pop-mask .cancel").on("click", function (event) {
		event.stopPropagation();
		$(this).parents(".pop-mask").removeClass("active");
	});
})();

/*
 * vue-radiobox 组件
 	
 	<div class="vue-radiobox" >
		<span class="vue-radiobox-item iconfont">慢</span>
		<span class="vue-radiobox-item iconfont">中</span>
		<span class="vue-radiobox-item iconfont">快</span>
	</div>
	
	 // 自定义事件
	$(".vue-radiobox").on("vue-radiobox", function(event, el,bl) {

		$.alert("选择的值为:"+bl);
	});
	
	//set 1
	$(".vue-radiobox").VueRadiobox(1);
	
	//set2
	var v="快";
	$(".vue-radiobox").VueRadiobox((val)=>{
		return	val==v;
			
	});
	
	//get
	var v=$(".vue-radiobox").VueRadiobox();
	alert(v);

	
	
 * */

(function () {

	// 单选 vue-radiobox
	$(document).on("click", ".vue-radiobox  .vue-radiobox-item", function () {

		var p = $(this).parents(".vue-radiobox");
		$(".vue-radiobox-item", p).removeClass("active");
		$(this).addClass("active");
		var bl = $(this).hasClass("active");

		// 触发自定义的事件
		$(this).trigger("vue-radiobox", [this, bl]);
	});

	$.fn.extend({

		VueRadiobox: function VueRadiobox(args) {
			if (typeof args === "undefined") {
				return $(this).find(".vue-radiobox-item.active").attr("data-val");
			}
			if (typeof args === "number") {
				var items = items.removeClass("active");
				if (args > 0) {
					args = args >= 1 ? args - 1 : 0;
					items.eq(args).addClass("active");
				}

				return;
			}

			if (typeof args === "function") {
				var items = $(this).find(".vue-radiobox-item");
				items.removeClass("active");
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var val = $(item).attr("data-val") || "";
					var bl = args(val);
					if (bl) {
						$(item).addClass("active");
						break;
					} else {
						$(item).removeClass("active");
					}
				}

				return;
			}
		}
	});
})();

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

(function () {
	$(document).on("click", ".vue-radiobtn-item", function () {

		var p = $(this).parents(".vue-radiobtn");
		p.find(".vue-radiobtn-item").removeClass("active");
		$(this).addClass("active");

		// 触发自定义的事件
		$(this).trigger("vue-radiobtn", [this]);
	});

	$.fn.extend({

		VueRadiobtn: function VueRadiobtn(index, v) {
			v = v || "";
			if (arguments.length >= 1) {
				if (!isNaN(index)) {
					index = Number(index);
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

(function () {

	$(document).on("change", ".vue-range [type=range]", function () {
		var p = $(this).parents(".vue-range");
		$("span", p).html(this.value);

		// 触发事件
		$(this).trigger("vue-range", [this.value]);
	});

	$.fn.extend({

		VueRange: function VueRange(val) {
			var p = $(this);
			if (val) {

				var v = isNaN(val) ? 0 : val;
				$("[type=range]", p).val(v);
				$("span", p).text(v);
			} else {
				return parseFloat($("[type=range]", p).val());
			}
		}
	});
})();

/*滑块组件
 * <div class="vue-slider" data-val="70">
	        <div class="vue-slider-bar">
	            <div class="vue-slider-bg">
	                <div class="vue-slider-handler">
	                </div>
	            </div>
	            <div class="vue-slider-percent">0</div>
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

(function () {

	$(document).on("mousedown", ".vue-slider-handler", function (e) {
		e.preventDefault();
		var p = $(this).parents(".vue-slider");
		var src_x = e.clientX;
		var obj = $(this);
		var _left = obj.css("left");
		var _w = obj.width();
		var _slider_w = $(".vue-slider-bar", p).width();
		$(".vue-slider-bg", p).width(_left);
		var _move_w = _slider_w - _w;

		$(document).mousemove(function (event) {
			event.preventDefault();
			var new_x = event.clientX - src_x;
			new_x = parseFloat(_left) + parseFloat(new_x);

			if (new_x >= _move_w) {
				new_x = _move_w;
			}
			if (new_x <= 0) {
				new_x = 0;
			}

			obj.css({
				left: new_x
			});
			$(".vue-slider-bg", p).width(new_x + _w);
			var _per = (new_x / _move_w * 100).toFixed(0);
			$(".vue-slider-percent", p).html(_per);
			p.attr("data-val", _per);

			// 触发自定义的事件
			$(this).trigger("vue-slider", [_per]);
		});
		$(document).on("mouseup", function () {
			$(document).off("mousemove");
			$(document).off("mouseup");
		});
	});

	$(".vue-slider").each(function () {
		var _v = $(this).attr("data-val");
		_v = isNaN(_v) ? 0 : Number(_v);
		var min = $(this).attr("data-min") || 0;
		var max = $(this).attr("data-max") || 100;
		if (_v < min) {
			_v = min;
		}
		if (_v > max) {
			_v = max;
		}

		var _w = $(this).width();
		var pv = _v / max;

		$(".vue-slider-percent", $(this)).html((pv * 100).toFixed(0));

		var _handler = $(".vue-slider-handler", $(this));
		$(".vue-slider-bg", $(this)).width(_w * pv + _handler.width());

		var _handler_w = _w * pv; //- _handler.width();
		_handler.css({
			left: _handler_w
		});
	});

	//vue-slider 
	$.fn.extend({

		VueSlider: function VueSlider(val) {
			if (typeof val !== "undefined") {
				var _v = isNaN(val) ? 0 : Number(val);
				var min = $(this).attr("data-min") || 0;
				var max = $(this).attr("data-max") || 100;
				if (_v < min) {
					_v = min;
				}
				if (_v > max) {
					_v = max;
				}
				_v = parseFloat(_v);

				var _w = $(this).width();

				var pv = _v / max;
				var _handler = $(".vue-slider-handler", $(this));
				$(".vue-slider-bg", $(this)).width(_w * pv + _handler.width());
				$(this).attr("data-val", (pv * 100).toFixed(0));
				$(".vue-slider-percent", $(this)).html((pv * 100).toFixed(0));
				var _handler = $(".vue-slider-handler", $(this));
				var _handler_w = _w * pv;
				_handler.css({
					left: _handler_w
				});
			} else {
				return parseFloat($(this).attr("data-val"));
			}
		}
	});
})();

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

(function () {

	$(document).on("click", ".vue-swicth", function (event) {
		event.preventDefault();
		var isHasClass = $(this).hasClass("active");
		if (isHasClass) {
			$(this).removeClass("active");
		} else {
			$(this).addClass("active");
		}

		// 触发自定义的事件
		$(this).trigger("vue-swicth", [this]);
	});
	//vue-switch 
	$.fn.extend({

		VueSwicth: function VueSwicth(bl) {
			if (typeof bl != "undefined") {
				if (bl == true) {
					$(this).addClass("active");
				} else {
					$(this).removeClass("active");
				}
			} else {
				var v = $(this).hasClass("active");

				return v;
			}
		}
	});
})();

/*
	  
 <div class="vue-number" >
    <button class="minus btn" type="button">-</button>
	<input class="num" type="number" value="1" data-min="0" data-max="9999" data-step="1" />
	<button class="plus btn" type="button">+</button>
	  
</div>
 
	 * 数字框组件start
	 * 事件：vue-number
	 *
	 * 点击事件
		$(document).on("vue-number",function(event,element){			
			//element 当前点击的元素	
			var p=$(element).parents(".vue-number");
			alert($(p).find(".num").val());
								
		});
		
		//	$(".vue-number").VueNumber("8");
		// get
		//var v=$(".vue-number").VueNumber();
	 * */

(function () {

			//minus
			$(document).on("click", ".minus", function (e) {

						e.stopPropagation();
						e.preventDefault();

						var p = $(this).parents(".vue-number");

						//步长
						var step = Number($(".num", p).attr("data-step"));
						step = window.isNaN(step) ? 1 : step;

						//最大值
						//			var max=Number($(".num",p).attr("data-max"));
						//				max=window.isNaN(max)?9999:max;
						//最小值
						var min = Number($(".num", p).attr("data-min"));
						min = window.isNaN(min) ? 0 : min;

						var v = Number($(".num", p).val());
						v = window.isNaN(v) ? min : v;

						//计算
						v = v > min ? v - step : min;

						if (v <= min) {
									v = min;
						}

						$(".num", p).val(v);

						//点击触发自定义事件
						$(this).trigger("vue-number", [this]);
			});

			//plus
			$(document).on("click", ".plus", function (e) {
						e.stopPropagation();
						e.preventDefault();
						var p = $(this).parents(".vue-number");

						//步长
						var step = Number($(".num", p).attr("data-step"));
						step = window.isNaN(step) ? 1 : step;

						//最大值
						var max = Number($(".num", p).attr("data-max"));
						max = window.isNaN(max) ? 9999 : max;
						//最小值
						var min = Number($(".num", p).attr("data-min"));
						min = window.isNaN(min) ? 0 : min;

						var v = Number($(".num", p).val());
						v = window.isNaN(v) ? min : v;

						//计算
						v = v < max ? v + step : max;

						if (v >= max) {
									v = max;
						}

						$(".num", p).val(v);
						//点击触发自定义事件
						$(this).trigger("vue-number", [this]);
			});

			// value
			$(document).on("blur", ".num", function (e) {
						var p = $(this).parents(".vue-number");
						//最大值
						var max = Number($(".num", p).attr("data-max"));
						max = window.isNaN(max) ? 9999 : max;
						//最小值
						var min = Number($(".num", p).attr("data-min"));
						min = window.isNaN(min) ? 0 : min;

						var v = Number($(".num", p).val());
						v = window.isNaN(v) ? min : v;

						if (v > max) {
									v = max;
						}

						if (v < min) {
									v = min;
						}

						$(".num", p).val(v);
						//点击触发自定义事件
						$(this).trigger("vue-number", [this]);
			});

			$.fn.extend({

						VueNumber: function VueNumber(v) {

									if (typeof v !== "undefined") {
												var def = $(this).attr("data-min") || 0;
												v = isNaN(v) ? def : v;
												$(".num", $(this)).val(v);
									} else {
												return $(".num", $(this)).val();
									}
						}

			});
})();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

/*
	 * h5文件上传插件
	 * $(".vue-file").VueFile({
			url:"./index.html", //上传网址
			outTime: 30000,
			size: 300000 ,    // 大小 m
			contentType: false,
			seccess: function(data,el) {
				$.info("文件上转成功！", "success");
				//console.log(el);
			}, 
			error: function(err,el) {
				$.alert("文件上转失败！");
				//console.log(el);
			} 
		});

		<div class="vue-file">
				<a class="vue-file-btn btn  btn-warning" name="up" href="javascript:">
					<span class="glyphicon glyphicon-file"></span>上传图片
				</a>
				<input class=" fileUp v-hide-text-index" type="file" name="" id="fileUp" value="" />
				<!--进度条-->
				<div class="progress-all v-hide">
					<div class="progress-now"></div>
					<div class="progress-num">0%</div>
				</div>
		</div>
	 * 
	 * 
	 * */

(function () {
	var upload = function upload(option) {
		var p = $(option.el).parents(".vue-file");
		if ((typeof option === "undefined" ? "undefined" : _typeof(option)) !== 'object') {
			$(".vue-file-btn").show();
			$.alert("参数有误！");
			return;
		}

		if (option.size) {
			if (option.data.size > option.size) {
				$.alert("文件大于" + option.size / 1000000 + "M");
				$(".vue-file-btn").show();
				return;
			}
		} else {
			$.alert("参数没有设置文件大小值[size]");
			$(".vue-file-btn", p).show();
			return;
		}

		var data = new FormData();

		data.append('file-' + new Date().getTime().toString(), option.data);

		$.ajax({
			url: option.url,
			data: data,
			type: "post",
			timeout: option.outTime,
			cache: false,
			processData: false,
			contentType: option.contentType || false,
			xhrFields: {
				withCredentials: true
			},
			xhr: function xhr() {
				//获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数
				var myXhr = $.ajaxSettings.xhr();
				if (myXhr.upload) {
					//检查upload属性是否存在
					//绑定progress事件的回调函数
					myXhr.upload.onprogress = progressFunction;
				}
				return myXhr; //xhr对象返回给jQuery或zepto使用
			},
			success: option.seccess,
			error: option.error
		});

		//progress事件的回调函数
		function progressFunction(evt) {

			//var p = $(option.el).parents(".vue-file");
			var widthAll = $(".progress-all", p).width();
			var progressBar = $(".progress-all", p);
			var percentageDiv = $(".progress-now", p);
			var percentageNum = $(".progress-num", p);

			if (evt.lengthComputable) {
				progressBar.max = evt.total;
				progressBar.value = evt.loaded;
				$(percentageDiv).css("width", Math.round(evt.loaded / evt.total * widthAll) + "px");
				$(percentageNum).text(Math.ceil(evt.loaded / evt.total * 100) + "%");
				//          if (evt.loaded == evt.total) {
				//            //  console.log("上传完成100%");
				//          }
			}
		}
	};

	$.fn.extend({

		VueFile: function VueFile(option) {

			$(document).on("click", ".vue-file-btn", function (e) {
				e.stopPropagation();
				e.preventDefault();

				var p = $(this).parents(".vue-file");
				// 点击文件上传框
				$(".fileUp", p).click();
			});

			// 文件上传框值变化
			$(document).on("change", ".fileUp", function () {
				fileupff(this);
			});

			var fileupff = function fileupff(obj) {
				var p = $(obj).parents(".vue-file");
				$(".vue-file-btn", p).hide();
				var $img = $(obj).closest(".vue-file").find(".img");
				var $propress = $(obj).closest(".vue-file").find(".progress-all");
				$propress.show();

				// 是否支持html5 文件上传
				if (typeof obj.files === "undefined") {
					$(".vue-file-btn", p).show();
					alert("不支持html5 文件上传,请升级你的浏览器  \n not support html5 ");
					return;
				}

				var file = obj.files[0];

				upload({
					data: file, //选择的文件
					url: option.url, //"./index.html", //上传网址
					outTime: 30000,
					el: $(obj), //当前element
					size: option.size * 1000000, //1m=1000000
					contentType: option.contentType, //false,
					seccess: function seccess(data) {
						option.seccess(data, p);
						$propress.hide();
						obj.value = null;
						$(".vue-file-btn", p).show();
					}, //成功回调
					error: function error(data) {
						option.error(data, p);
						$propress.hide();
						obj.value = null;
						$(".vue-file-btn", p).show();
					} //错误回调

				}); //调用上传接口
			};
		}
	});
})();

/*
 * vue-checkbtn 组件
 * <div class="vue-checkbtn">
		<div class="vue-checkbtn-item " data-val="true">
			爱心
		</div>
	</div>
	
	 // 自定义事件
	$(".vue-checkbtn").on("vue-checkbtn", function(event, el,bl) {

		$.alert("选择的值为:"+bl);
	});
	
	// set 
	$(".vue-checkbtn.a1").VuecheCkbtn(true);
	// get
	 var v=$(".vue-checkbtn.a1").VueCheckbtn();
	 alert(v)
	
 * */

(function () {

	// 单选
	$(document).on("click", ".vue-checkbtn .vue-checkbtn-item", function () {

		$(this).toggleClass("active");
		var bl = $(this).hasClass("active");

		// 触发自定义的事件
		$(this).trigger("vue-checkbtn", [this, bl]);
	});

	$.fn.extend({

		VueCheckbtn: function VueCheckbtn(v) {
			if (typeof v !== "undefined") {
				v = !!v;

				if (v) {
					$(this).find(".vue-checkbtn-item").addClass("active");
				} else {
					$(this).find(".vue-checkbtn-item").removeClass("active");
				}
			} else {

				return $(this).find(".vue-checkbtn-item").hasClass("active");
			}
		}
	});

	// 多选

	/*
 	* vue-checkbtn-group 组件
  <div class="vue-checkbtn-group">
 		<div class="vue-checkbtn-item " data-val="js">js</div>
 		<div class="vue-checkbtn-item " data-val="jquery">jquery</div>
 		<div class="vue-checkbtn-item " data-val="java">java</div>
 		<div class="vue-checkbtn-item " data-val="c#">c#</div>
 		<div class="vue-checkbtn-item " data-val="nodejs">nodejs</div>
 		</div>
 </div>
 
 // vue-checkbtn-group自定义事件
 $(".vue-checkbtn-group").on("vue-checkbtn-group", function(event, el,bl,arrs) {
 	
 	$.alert("选择的值为:"+arrs);
 });
 
 //set 
 $(".vue-checkbtn-group").VueCheckbtnGroup([2,4]);
 
 // get
 var v=$(".vue-checkbtn-group").VueCheckbtnGroup();
 alert(v)
 
 //set 
 //var dst = ["视频监控", "音视频通话", "查看机器人状态","设置机器人"];
 //$(" ._select-module .vue-checkbtn-group").VueCheckbtnGroup(item=>dst.some(o => o == item));
 // get
 //var v=$("._select-module .vue-checkbtn-group").VueCheckbtnGroup();
 * */
	$(document).on("click", ".vue-checkbtn-group .vue-checkbtn-item", function () {

		$(this).toggleClass("active");
		var bl = $(this).hasClass("active");
		var arrs = [];

		var p = $(this).parents(".vue-checkbtn-group");
		$(".vue-checkbtn-item", p).each(function () {
			if ($(this).hasClass("active")) {
				var v = $(this).attr("data-val") || "";
				if (v.trim() != "") {
					arrs.push(v);
				}
			}
		});

		// 触发自定义的事件
		$(this).trigger("vue-checkbtn-group", [this, bl, arrs]);
	});

	$.fn.extend({

		VueCheckbtnGroup: function VueCheckbtnGroup(args) {

			if (typeof args === "function") {
				var items = $(this).find(".vue-checkbtn-item");
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var val = $(item).attr("data-val") || "";
					var bl = args(val);
					if (bl) {
						$(item).addClass("active");
					} else {
						$(item).removeClass("active");
					}
				}

				return;
			}

			if (args instanceof Array) {

				var items = $(this).find(".vue-checkbtn-item");
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					for (var y = 0; y < args.length; y++) {
						if (i + 1 == args[y]) {
							$(item).addClass("active");
							break;
						}
					}
				}
			} else {
				var arrs = [];
				$(".vue-checkbtn-item", this).each(function () {
					if ($(this).hasClass("active")) {
						var v = $(this).attr("data-val") || "";
						if (v.trim() != "") {
							arrs.push(v);
						}
					}
				});

				return arrs;
			}
		}
	});
})();

/*
 * vue-checkbox 组件
 	
 	<div class="vue-checkbox" >
		<span class="vue-checkbox-item iconfont"></span>
	</div>
	
	 // 自定义事件
	$(".vue-checkbox").on("vue-checkbox", function(event, el,bl) {

		$.alert("选择的值为:"+bl);
	});
	
	// set 
	$(".vue-checkbox").VueCheckbox(true,fn);
	fn回调执行的函数
	$(".vue-checkbox").VueCheckbox(true, (el) => {
		$(el).parents("li").addClass("active");
	});
	
	// get
	 var v=$(".vue-checkbox").VueCheckbox();
	 alert(v)
 * */

(function () {

	// 单选 vue-checkbox
	$(document).on("click", ".vue-checkbox  .vue-checkbox-item", function () {

		$(this).toggleClass("active");
		var bl = $(this).hasClass("active");

		// 触发自定义的事件
		$(this).trigger("vue-checkbox", [this, bl]);
	});

	// 单选 vue-checkbox
	$(document).on("click", ".vue-checkbox  .vue-checkbox-text", function () {

		var p = $(this).parents(".vue-checkbox");
		$(".vue-checkbox-item", p).toggleClass("active");
		var bl = $(".vue-checkbox-item", p).hasClass("active");

		// 触发自定义的事件
		$(this).trigger("vue-checkbox", [this, bl]);
	});

	$.fn.extend({

		VueCheckbox: function VueCheckbox(v, fn) {
			if (typeof v !== "undefined") {
				v = !!v;

				if (v) {
					$(this).find(".vue-checkbox-item").addClass("active");
					if (typeof fn === "function") {
						fn($(this).find(".vue-checkbox-item"), true);
					}
				} else {
					$(this).find(".vue-checkbox-item").removeClass("active");

					if (typeof fn === "function") {
						fn($(this).find(".vue-checkbox-item"), false);
					}
				}
			} else {

				return $(this).find(".vue-checkbox-item").hasClass("active");
			}
		}
	});
})();

/* vue-checkbox-group 组件
	<div class="vue-checkbox-group">
		<div class="vue-checkbox-group-item">
			<span class="vue-checkbox-item iconfont" data-val="js"></span>
			<span class="vue-checkbox-text">js</span>
		</div>
		<div class="vue-checkbox-group-item">
			<span class="vue-checkbox-item iconfont" data-val="jquery"></span>
			<span class="vue-checkbox-text">jquery</span>
		</div>
		<div class="vue-checkbox-group-item">
			<span class="vue-checkbox-item iconfont" data-val="c#"></span>
			<span class="vue-checkbox-text">c#</span>
		</div>

	</div>
	
	 // 自定义事件
		$(".vue-checkbox-group").on("vue-checkbox-group", function(event, el,bl) {
	
			$.alert("选择的值为:"+bl);
		});
		
		//set 
		$(".vue-checkbox-group").VueCheckboxGroup([2,4]);
		
		// get
		var v=$(".vue-checkbox-group").VueCheckboxGroup();
		alert(v)
		
		//set 
		//var dst = ["js", "c#"];
		//$(".vue-checkbox-group").VueCheckboxGroup(item=>dst.some(o => o == item));
		// get
		//var v=$(".vue-checkbox-group").VueCheckboxGroup();
	*/

(function () {

	// 单选组 vue-checkbox-group
	$(document).on("click", ".vue-checkbox-group  .vue-checkbox-item", function () {

		$(this).toggleClass("active");
		var p = $(this).parents(".vue-checkbox-group");
		var vals = [];
		$(".vue-checkbox-item.active", p).each(function () {
			var v = $(this).attr("data-val");
			vals.push(v);
		});

		// 触发自定义的事件
		$(this).trigger("vue-checkbox-group", [this, vals]);
	});

	// 单选 vue-checkbox
	$(document).on("click", ".vue-checkbox-group  .vue-checkbox-text", function () {

		var p = $(this).parents(".vue-checkbox-group-item");
		$(".vue-checkbox-item", p).toggleClass("active");
		var p2 = $(this).parents(".vue-checkbox-group");
		var vals = [];
		$(".vue-checkbox-item.active", p2).each(function () {
			var v = $(this).attr("data-val");
			vals.push(v);
		});

		// 触发自定义的事件
		$(this).trigger("vue-checkbox-group", [this, vals]);
	});

	$.fn.extend({

		VueCheckboxGroup: function VueCheckboxGroup(args) {

			if (typeof args === "function") {
				var items = $(this).find(".vue-checkbox-item");
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var val = $(item).attr("data-val") || "";
					var bl = args(val);
					if (bl) {
						$(item).addClass("active");
					} else {
						$(item).removeClass("active");
					}
				}

				return;
			}

			if (args instanceof Array) {

				var items = $(this).find(".vue-checkbox-item");
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					for (var y = 0; y < args.length; y++) {
						if (i + 1 == args[y]) {
							$(item).addClass("active");
							break;
						}
					}
				}
			} else {
				var arrs = [];
				$(".vue-checkbox-item", this).each(function () {
					if ($(this).hasClass("active")) {
						var v = $(this).attr("data-val") || "";
						if (v.trim() != "") {
							arrs.push(v);
						}
					}
				});

				return arrs;
			}
		}
	});
})();

/*sysset模块*/

// set scroll 
//import setScroll from "../component/setScroll";
//import vueList from "../vue-component/share/list";
//import vueEdit from "../vue-component/share/edit";
//import vueAdd from "../vue-component/share/add";

var sysset = {

	init: function init() {
		// 
		// 		$(".vue-checkbox-group").on("vue-checkbox-group", function(event, el,bl) {
		// 	
		// 			$.alert("选择的值为:"+bl);
		// 		});
		// 
		// 			
		// 	 //$(".vue-checkbox-group").VueCheckboxGroup([2,1,3]);
		// 	 
		// 	 //set 
		// 	 var dst = ["js","c#"];
		// 	 $(".vue-checkbox-group").VueCheckboxGroup(item=>dst.some(o => o == item));
		// 	 // get
		// 	 var v=$(".vue-checkbox-group").VueCheckboxGroup();
		// 	 alert(v)
		// 


	}

};

/*test模块*/

var test = {

	// 主界面
	init: function init() {}

};

/*iframe 页面加载完成 的loading 动画*/

$(function () {
	var p = window.parent.document.getElementById("loading-box");
	if (p) {
		p.style.display = "none";
	}
});

// import   "./config.js";
// import   "./common/autoRun.js";
// import   "./libs/browser-moz.js";
// 
// // vue 
// import   './libs/vue/vue.js'
// import   './libs/vue/vue-resource.js'
// Vue.http.options.root=config.api.root;
// Vue.http.options.emulateJSON=true;


// jquery
//import   "./libs/jquery-1.11.0.js";
// mobile
//import   "./libs/mobile-1.0.0.js";

//import   "./libs/bootstrap.js";


// iframe 加载完成的loading动画   必须放在最后

exports.sysset = sysset;
exports.test = test;

Object.defineProperty(exports, '__esModule', { value: true });

})));
