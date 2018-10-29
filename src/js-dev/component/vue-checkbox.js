
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


(function() {
	
	// 单选 vue-checkbox
	$(document).on("click", ".vue-checkbox  .vue-checkbox-item", function() {
		
		$(this).toggleClass("active");
 		var bl=$(this).hasClass("active");
 		
		// 触发自定义的事件
		$(this).trigger("vue-checkbox", [this,bl]);
	});
	
	// 单选 vue-checkbox
	$(document).on("click", ".vue-checkbox  .vue-checkbox-text", function() {
		
		var p=$(this).parents(".vue-checkbox");
		$(".vue-checkbox-item",p).toggleClass("active");
		var bl=$(".vue-checkbox-item",p).hasClass("active");
		
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
   
   
   (function() {
   	
   	// 单选组 vue-checkbox-group
   	$(document).on("click", ".vue-checkbox-group  .vue-checkbox-item", function() {
   		
   		$(this).toggleClass("active");
    	var p=$(this).parents(".vue-checkbox-group");
		var vals=[];
		$(".vue-checkbox-item.active",p).each(function(){
			var v=$(this).attr("data-val");
			vals.push(v);
			
		});
    		
   		// 触发自定义的事件
   		$(this).trigger("vue-checkbox-group", [this,vals]);
   	});
   	
   	// 单选 vue-checkbox
   	$(document).on("click", ".vue-checkbox-group  .vue-checkbox-text", function() {
   		
   		var p=$(this).parents(".vue-checkbox-group-item");
   		$(".vue-checkbox-item",p).toggleClass("active");
   		var p2=$(this).parents(".vue-checkbox-group");
   		var vals=[];
   		$(".vue-checkbox-item.active",p2).each(function(){
   			var v=$(this).attr("data-val");
   			vals.push(v);
   			
   		});
   		
   		// 触发自定义的事件
   		$(this).trigger("vue-checkbox-group", [this,vals]);
   	});
   	
   	
   	jQuery.fn.extend({
   
   		VueCheckboxGroup: function(args) {
   			
   						if(typeof args==="function"){
   							var items=$(this).find(".vue-checkbox-item");
   							for(var i=0;i<items.length;i++){
   								 var item=items[i];
   								 var val=$(item).attr("data-val")||"";
   								 var bl=args(val);
   								if(bl){
   									$(item).addClass("active");	
   								}else{
   									$(item).removeClass("active");	
   								}
   							}
   							
   							return;
   						}
   						
   						if( args instanceof Array){
   							
   							var items=$(this).find(".vue-checkbox-item");
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
   							$(".vue-checkbox-item", this).each(function() {
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
   