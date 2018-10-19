
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
	// get
	 var v=$(".vue-checkbox").VueCheckbox();
	 alert(v)
 * */


(function() {
	
	// 单选 vue-checkbox
	$(document).on("click", ".vue-checkbox  .vue-checkbox-item", function() {
		
		$(this).toggleClass("active");
 		var bl=$(this).hasClass("active");
 		
		// 触发自定义的事件
		$(this).trigger("vue-checkbox", [this,bl]);
	});
	
	
	jQuery.fn.extend({

		VueCheckbox: function(v,fn) {
			if(typeof v!=="undefined") {
				v=!!v;
				
				if(v){
					$(this).find(".vue-checkbox-item").addClass("active");
					if(typeof fn==="function"){ 
						fn($(this).find(".vue-checkbox-item"),true);
						
					}
				}else{
					$(this).find(".vue-checkbox-item").removeClass("active");
					
					if(typeof fn==="function"){ 
						fn($(this).find(".vue-checkbox-item"),false);
						
					}
				}
				
			} else {

				return $(this).find(".vue-checkbox-item").hasClass("active");
			}
		}
	});
	
	
})();

