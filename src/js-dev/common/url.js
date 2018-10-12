/* 页面路径 api*/

//window._url=window.url
//window.url= {
//			//采用正则表达式获取地址栏参数：（ 强烈推荐，既实用又方便！）
//			getQueryString: function(name) {
//				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//				var r = window.location.search.substr(1).match(reg);
//				if(r != null) return decodeURIComponent(r[2]);
//				return null;
//			},
//
//			//从WebAPI获取日期json数据 转换成日期时间戳
//			jsonToDate: function(apidate) {
//				var txts = apidate.replace("/Date(", "").replace(")/", "");
//				return parseInt(Common.trim(txts));
//
//			},
//
//			// 取当前页面名称(不带后缀名)
//			getPageName: function() {
//				var a = location.href;
//				var b = a.split("/");
//				var c = b.slice(b.length - 1, b.length).toString(String).split(".");
//				return c.slice(0, 1);
//			},
//
//			//取当前页面名称(带后缀名)
//			getPageNameExention: function() {
//				var strUrl = location.href;
//				var arrUrl = strUrl.split("/");
//				var strPage = arrUrl[arrUrl.length - 1];
//				return strPage;
//			}
//
//	};


 var url= {
			//采用正则表达式获取地址栏参数：（ 强烈推荐，既实用又方便！）
			getQueryString: function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return decodeURIComponent(r[2]);
				return null;
			},

			//从WebAPI获取日期json数据 转换成日期时间戳
			jsonToDate: function(apidate) {
				var txts = apidate.replace("/Date(", "").replace(")/", "");
				return parseInt(Common.trim(txts));

			},

			// 取当前页面名称(不带后缀名)
			getPageName: function() {
				var a = location.href;
				var b = a.split("/");
				var c = b.slice(b.length - 1, b.length).toString(String).split(".");
				return c.slice(0, 1);
			},

			//取当前页面名称(带后缀名)
			getPageNameExention: function() {
				var strUrl = location.href;
				var arrUrl = strUrl.split("/");
				var strPage = arrUrl[arrUrl.length - 1];
				return strPage;
			}

	};
	

export{
	url
}
