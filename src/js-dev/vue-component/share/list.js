/*
   	<slot>
 	 <template slot="list">
		<tr v-for=" item in list">
			<td class="table-2 text-center">
				<span v-html="item.Id"></span>
			</td>
			<td class=" table-2 text-center">
				<span v-html="item.ModuleName"></span>
			</td>
			<td class=" table-2 text-center">
				<span v-html="item.ShowName"></span>
			</td>
			<td class="table-4 text-center">
				<a href="javascript:;" class="btn btn-sm  btn-default rd" v-on:click="editBtn(item)">模块重命名</a>
				<a href="javascript:;" class="btn btn-sm  rd"  :class="{'btn-primary':item.LookSate,'btn-default':!item.LookSate}" v-text="item.LookSate?'启用':'禁用'"></a>
			</td>
		</tr>
		</template>
	<slot>
*/
var template=`
	<table class="pattern-table table  table-bordered  table-fixed table-hover ">
		<tbody>
			<slot name="list" ></slot>
		</tbody>
	</table>
`;

 export default {
 	props:["list"],
	data(){
		return {
		
		}
	},
	template:template
	
};

