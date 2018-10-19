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

(function() {
	
	// 单选
	$(document).on("click", ".vue-checkbtn .vue-checkbtn-item", function() {

		$(this).toggleClass("active");
 		var bl=$(this).hasClass("active");
 		
		// 触发自定义的事件
		$(this).trigger("vue-checkbtn", [this,bl]);
	});
	

	jQuery.fn.extend({

		VueCheckbtn: function(v) {
			if(typeof v!=="undefined") {
				v=!!v;
				
				if(v){
					$(this).find(".vue-checkbtn-item").addClass("active");
				}else{
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
	$(document).on("click", ".vue-checkbtn-group .vue-checkbtn-item", function() {

		$(this).toggleClass("active");
 		var bl=$(this).hasClass("active");
 		 var arrs=[];
 		 
 		 var p=$(this).parents(".vue-checkbtn-group");
 		 $(".vue-checkbtn-item",p).each(function(){
 		 	if($(this).hasClass("active")){
 		 		var v=$(this).attr("data-val")||"";
 		 		if(v.trim()!=""){
 		 			arrs.push(v);
 		 		}
 		 	}
 		 	
 		 });
 		 
		// 触发自定义的事件
		$(this).trigger("vue-checkbtn-group", [this,bl,arrs]);
	});
	
	
	jQuery.fn.extend({

		VueCheckbtnGroup: function(args) {
			
			if(typeof args==="function"){
				var items=$(this).find(".vue-checkbtn-item");
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
				
				var items=$(this).find(".vue-checkbtn-item");
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
				$(".vue-checkbtn-item", this).each(function() {
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


