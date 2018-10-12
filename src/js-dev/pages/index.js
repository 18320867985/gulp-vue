/*index模块*/
// set scroll 
import setScroll from "../component/setScroll_index.js";
var index = {
	init: function() {

		// 添加菜单
		addMenu();

		// 刷新子页面
		$(".index-refrech").click(function() {
			
			try {
				$(".iframe-box")[0].contentWindow.location.reload();

			} catch(e) {
				//TODO handle the exception
			}

			$(this).blur();
		});

		// 菜单height
		resetWindowHeight();
		$(window).resize(function() {
			resetWindowHeight();
		})

		function resetWindowHeight() {

			var window_h = $(window).height();
			var logo = $(".index-aside-logo").outerHeight();
			var nemu = $(".index-aside-nemu,.index-aside-nemu ._nemu-2 ").outerHeight(window_h - logo);
			//console.log(window_h);

			var con_top = $(".index-cont-top").outerHeight();
			var cont_nav = $(".index-nav").outerHeight();
			var iframe_h = window_h - (con_top + cont_nav);
			$(".index-cont-iframe").height(iframe_h);
			//console.log(con_top+cont_nav);

		}

		// 一级菜单点击
		$(document).on("click", ".index-aside-nemu ._nemu-1 ._nemu-item", function(event) {

			event.preventDefault();
			$(this).siblings().removeClass("active").find("img").attr("src", "images/nemu-1-df.png");
			$(this).addClass("active").find("img").attr("src", "images/nemu-1-1.png");

		});

		$(".index-aside-nemu ._nemu-1 ._nemu-item").on('shown.bs.tab', function(e) {
			setScroll(true);
		})

		// 二级菜单点击
		$(document).on("click", ".index-aside-nemu ._nemu-2  ._nemu-item", function(event) {

			event.preventDefault();
			if($(this).hasClass("active")) {
				$(this).siblings().removeClass("active");
				$(this).removeClass("active");
			} else {
				$(this).siblings().removeClass("active");
				$(this).addClass("active");
			}

			//			var src = $(this).find(" dt a").attr("href");
			//			if(src && src != "javascript:;") {
			//				$(".iframe-box").attr("src", src);
			//				$(this).parents("._nemu-2").find("dd").removeClass("active");
			//
			//			}
			setScroll(true);

		});

		// 三级菜单点击
		$(document).on("click", ".index-aside-nemu ._nemu-2 dd", function(event) {
			event.preventDefault();
			event.stopPropagation();

			$(this).parents("._nemu-2").find("dd").removeClass("active");
			$(this).addClass("active");
			var src = $(this).find("a").attr("href") || "javascript:";
			var iframeSrc = $(".iframe-box").attr("src");
			//console.log(iframeSrc)
//			if(src != iframeSrc) {
//				document.getElementById("loading-box").style.display = "block";
//				$(".iframe-box").attr("src", src);
//			}
			
			document.getElementById("loading-box").style.display = "block";
			$(".iframe-box").attr("src", src);

		});

		// 退出登录
		$(".logout").on("click", function() {
			window.location.href = "login.html";

		});

		/*滚动条*/
		setScroll();
		$(window).resize(function() {
			setScroll(true);
		});

		// 添加菜单
		function addMenu() {
			$("#select1").html('<span  class="_menu-lading"><span class="iconfont icon-loading spin"></span>loading...</span>');
			$.get(config.api.root + "Site/SiteNavigation", function(data) {
				//console.log(data);
				var _html = "";
				for(var i = 0; i < data.length; i++) {
					var item = data[i];
					var _item = `
					<!--二级菜单-->
					<div class="_nemu-item clearfix ">
							<dl>
							
							<dt>
								<a href="javascript:;">${item.Name}</a>
											
							</dt>

					`;
					_html += _item;

					var _html2 = "";
					item.Items.forEach(function(item2) {
						var _item2 = `
						<!--三级菜单-->
								<dd class="">
									<a href="${item2.Url}" title="${item2.Name}">${item2.Name}</a>
								</dd>`;
						_html += _item2;
					});

					_html += '</dl></div>';

				}

				$("#select1").html(_html);
				setScroll(true);

			})

		}
	}
}

export {

	index
}