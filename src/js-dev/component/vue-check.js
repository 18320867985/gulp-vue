/*
 * vue-check 组件
 * <div class="vue-check">
		<div class="vue-check-item " data-val="true">
			爱心
		</div>
	</div>
	
	 // 自定义事件
	$(".vue-check").on("vue-check", function(event, el,bl) {

		$.alert("选择的值为:"+bl);
	});
	
	// set 
	$(".vue-check.a1").VueCheck(true);
	// get
	 var v=$(".vue-check.a1").VueCheck();
	 alert(v)
	
 * */

(function() {
	
	// 单选
	$(document).on("click", ".vue-check .vue-check-item", function() {

		$(this).toggleClass("active");
 		var bl=$(this).hasClass("active");
 		
		// 触发自定义的事件
		$(this).trigger("vue-check", [this,bl]);
	});
	

	jQuery.fn.extend({

		VueCheck: function(v) {
			if(typeof v!=="undefined") {
				v=!!v;
				
				if(v){
					$(this).find(".vue-check-item").addClass("active");
				}else{
					$(this).find(".vue-check-item").removeClass("active");
				}
				
			} else {

				return $(this).find(".vue-check-item").hasClass("active");
			}
		}
	});
	
	
	// 多选
	
	/*
 	* vue-check-group 组件
	 <div class="vue-check-group">
			<div class="vue-check-item " data-val="js">js</div>
			<div class="vue-check-item " data-val="jquery">jquery</div>
			<div class="vue-check-item " data-val="java">java</div>
			<div class="vue-check-item " data-val="c#">c#</div>
			<div class="vue-check-item " data-val="nodejs">nodejs</div>
			</div>
	</div>
	
	// vue-check-group自定义事件
	$(".vue-check-group").on("vue-check-group", function(event, el,bl,arrs) {
		
		$.alert("选择的值为:"+arrs);
	});
	
	//set 
	$(".vue-check-group").VueCheckGroup([2,4]);
	
	// get
	var v=$(".vue-check-group").VueCheckGroup();
	alert(v)
 * */
	$(document).on("click", ".vue-check-group .vue-check-item", function() {

		$(this).toggleClass("active");
 		var bl=$(this).hasClass("active");
 		 var arrs=[];
 		 
 		 var p=$(this).parents(".vue-check-group");
 		 $(".vue-check-item",p).each(function(){
 		 	if($(this).hasClass("active")){
 		 		var v=$(this).attr("data-val")||"";
 		 		if(v.trim()!=""){
 		 			arrs.push(v);
 		 		}
 		 	}
 		 	
 		 });
 		 
		// 触发自定义的事件
		$(this).trigger("vue-check-group", [this,bl,arrs]);
	});
	
	
	jQuery.fn.extend({

		VueCheckGroup: function(args) {
			if( args instanceof Array){
				
				var items=$(this).find(".vue-check-item");
				for(var i=0;i<items.length;i++){
					 var item=items[i];
					for(var y=0;y<args.length;y++){
						if((i+1)==args[y]){
							$(item).addClass("active");	
							break;
						}
					}
					
				}
				
			}else{
				var arrs = [];
				$(".vue-check-item", this).each(function() {
					if($(this).hasClass("active")) {
						var v = $(this).attr("data-val") || "";
						if(v.trim() != "") {
							arrs.push(v);
						}
					}

				});
				
				return arrs;
			}
			
		}
	});
	
	
	

})();