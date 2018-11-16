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

(function() {
	var upload = function(option) {
		var p = $(option.el).parents(".vue-file");
		if(typeof option !== 'object') {
			$(".vue-file-btn").show();
			$.alert("参数有误！");
			return;
		}

		if(option.size) {
			if(option.data.size > option.size) {
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
			xhr: function() {
				//获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数
				var myXhr = $.ajaxSettings.xhr();
				if(myXhr.upload) { //检查upload属性是否存在
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

			if(evt.lengthComputable) {
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

		VueFile: function(option) {
			
			$(document).on("click",".vue-file-btn", function(e) {
				e.stopPropagation();
				e.preventDefault();
				
				var p = $(this).parents(".vue-file");
				// 点击文件上传框
				$(".fileUp", p).click();

			});

			// 文件上传框值变化
			$(document).on("change",".fileUp",function() {
				fileupff(this);

			});

			var fileupff = function(obj) {
				var p = $(obj).parents(".vue-file");
				$(".vue-file-btn", p).hide();
				var $img = $(obj).closest(".vue-file").find(".img");
				var $propress = $(obj).closest(".vue-file").find(".progress-all");
				$propress.show();

				// 是否支持html5 文件上传
				if(typeof obj.files === "undefined") {
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
					seccess: function(data) {
						option.seccess(data,p);
						$propress.hide();
						obj.value=null;
						$(".vue-file-btn", p).show();

					}, //成功回调
					error: function(data) {
						option.error(data,p);
						$propress.hide();
						obj.value=null;
						$(".vue-file-btn", p).show();

					} //错误回调

				}); //调用上传接口

			};

		}
	});


})();