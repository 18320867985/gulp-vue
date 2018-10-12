/*
 <slot> 
 	 <div class="pop-box-gp">
		<label for="">业务名称：</label>
		<input type="text" placeholder="业务名称" v-model="addObj.questionClass" :class="{active:addObj.questionClass.length>0} "/>
	</div>
<slot>
 */
var template = `
	<div class="pop-mask  pop-edit" :class="{'active':isShow}">
			<div class="pop-box">
				<h2 class="_ttl">{{ttl}}</h2>
				<slot></slot>
				<div class="pop-box-gp text-center submit-add" >
					<button  @click="cancel" class="btn btn-default" type="button">取消</button>
					<button  @click="ok()" class="btn btn-primary" type="button">添加</button>
				</div>
			</div>
	</div>

`;

export default {
	props: {
		ttl:{type:String,
			default:"标题"
		},
		isShow:{
			type:Boolean,
			default:false
		},
		ok:{
			type:Function
			
		},
		
	
	},
	data() {
		return {

		}
	},
	template,
	methods:{
		cancel(){
			this.$emit("cancel",false);
		}
	},

};



