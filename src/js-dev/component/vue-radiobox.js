
/*
 * vue-radiobox 组件
 	
 	<div class="vue-radiobox" >
		<span class="vue-radiobox-item iconfont"></span>
	</div>
	
	 // 自定义事件
	$(".vue-radiobox").on("vue-radiobox", function(event, el,bl) {

		$.alert("选择的值为:"+bl);
	});
	
	// set 
	$(".vue-radiobox").VueRadiobox(true,fn);
	fn回调执行的函数
	$(".vue-radiobox").Vueradiobox(true, (el) => {
		$(el).parents("li").addClass("active");
	});
	
	// get
	 var v=$(".vue-radiobox").VueRadiobox();
	 alert(v)
 * */


(function() {
	
	// 单选 vue-radiobox
	$(document).on("click", ".vue-radiobox  .vue-radiobox-item", function() {
		
		$(this).toggleClass("active");
 		var bl=$(this).hasClass("active");
 		
		// 触发自定义的事件
		$(this).trigger("vue-radiobox", [this,bl]);
	});
	
	
	jQuery.fn.extend({

		VueRadiobox: function(v,fn) {
			if(typeof v!=="undefined") {
				v=!!v;
				
				if(v){
					$(this).find(".vue-radiobox-item").addClass("active");
					if(typeof fn==="function"){ 
						fn($(this).find(".vue-radiobox-item"),true);
						
					}
				}else{
					$(this).find(".vue-radiobox-item").removeClass("active");
					
					if(typeof fn==="function"){ 
						fn($(this).find(".vue-radiobox-item"),false);
						
					}
				}
				
			} else {

				return $(this).find(".vue-radiobox-item").hasClass("active");
			}
		}
	});
	
	
})();

