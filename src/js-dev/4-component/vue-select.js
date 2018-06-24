
let temolate=`
				<ul class="vue-test">
					<li>{{name}}:{{name}}</li>
					<li>{{name}}</li>
					<li>{{name}}</li>
					<li>{{age}}</li>
				</ul>`;
				
Vue.component("vue-select", {
	template: temolate,
	data: {},
	methods: {

	},
	
	props:["name","age"],

	
});

