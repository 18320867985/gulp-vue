 /*
   <slot>
 	 <div class="pop-box-gp">
		<div class="pop-box-gp">
			<input :class="{'active':editObj.ShowName}" type="text" name="" id="" value=""  v-model="editObj.ShowName" placeholder="输入新模块名称" />
		</div>
	</div>
<slot>
*/
var template = `
	<div class="pop-mask  pop-edit  "  :class="{'active':isShow}">
		<div class="pop-box">
			<h2 class="_ttl">{{ttl}}</h2>
			<slot></slot>
			<div class="pop-box-gp _submit">
				<button  @click="cancel" class="btn btn-default" type="button">取消</button>
				<button  @click="ok()" class="btn btn-primary" type="button">确认</button>
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
	}

};