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


(function() {

	// 单选 vue-radiobox
	$(document).on("click", ".vue-radiobox  .vue-radiobox-item", function() {

		var p = $(this).parents(".vue-radiobox");
		$(".vue-radiobox-item", p).removeClass("active");
		$(this).addClass("active");
		var bl = $(this).hasClass("active");

		// 触发自定义的事件
		$(this).trigger("vue-radiobox", [this, bl]);
	});


	$.fn.extend({

		VueRadiobox: function(args) {
			if(typeof args ==="undefined"){
				return  $(this).find(".vue-radiobox-item.active").attr("data-val");
			}
			if(typeof args==="number"){
				var items =
				items.removeClass("active");
				if(args>0){
					args=args>=1?args-1:0;
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
