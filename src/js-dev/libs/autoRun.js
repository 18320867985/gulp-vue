	/*自动执行 rollup打包umd格式js模块
	 
	 * <script   data-parent="umd" data-umd="test" src="./js/all.js" type="text/javascript" charset="utf-8"></script>
	 * */
	
	(function() {
		window.onload = function() {
			var el_umds = document.querySelectorAll("script[data-umd]");
			for(var i = 0; i < el_umds.length; i++) {

				var parent = "umd";
				var el_umd = el_umds[i];
				if(el_umd) {

					var umd_str = el_umd.getAttribute("data-umd") || "";
					parent = el_umd.getAttribute("data-parent") || "umd";
					var arrs = umd_str.split(".");
					var prop1 = "";
					var prop2 = "";
					if(arrs.length >= 0) {
						prop1 = arrs[0];
					}

					if(arrs.length === 1) {
						prop2 = "init";
					} else if(arrs.length === 2) {
						prop2 = arrs[1];

					}

					var obj = window[parent];
					if(!obj){
						 return;
					}
					if(!obj[prop1]){
						 return;
					}
					var fn = obj[prop1][prop2];

					if(typeof fn === "function") {
						fn();
					}

				}
			}

		}

	})();