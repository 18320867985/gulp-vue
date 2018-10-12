
/*登陆模块*/

var  login={
	init:function(){
		
		var vm=new Vue({
			el:".app",
			data:{
				user:"",
				pwd:"",
				ck:false,
				error:false,
				errorText:"用户名与密码不匹配！",
				firstLogin:true
			},
			methods:{
				input_1(){
					if(this.$refs.txt.value!==""){
						this.$refs.pwd.focus();
						return;
						
					}
				},
				
				input_2(){
					console.log("input_2"+this.$refs.txt)
					if(this.$refs.txt.value===""){
						console.log(this.$refs.txt)
						this.$refs.txt.focus();
						return;
						
					}
				},
				login:function(event){
					var o=event.target;
					this.error=false;
					if(this.user.length>0&&this.pwd.length>0&&this.firstLogin){
						this.firstLogin=false;
						this.$refs.btn.innerHTML="正在登录中...";
						$(this.$refs.btn).parents("form").find("input").attr("disabled","disabled"); // 阻住重复提交
						this.$http.post("Login/CheckLogin",{username:this.user,password:this.pwd}).then(response=>{
							var data=response.body;
							if(data.state==="success"){
								window.location.href="index.html";
								
							}else if(data.state==="error"){
								this.$refs.btn.innerHTML="登录";
								this.errorText=data.message;
								$(this.$refs.btn).parents("form").find("input").removeAttr("disabled");
								this.error=true;
							}
							this.firstLogin=true;
							
							
						},error=>{
							this.error=true;
							this.firstLogin=true;
							this.errorText="数据加载失败！";
						});
						
						
				
					}
				}
			},
			
			mounted(){
				this.$refs.txt.focus();
				
			}
			
			
			
			
		});		
		
		
	}
	
}

export{
	
	login
}
