<template>
  <div>
  	<v-header v-bind:seller="seller"></v-header>
  	<div class="tab border-1px">
  		<div class="tab-item"><a v-link="{path:'/goods'}">商品</a></div>
  		<div class="tab-item"><a v-link="{path:'/ratings'}">评论</a></div>
  		<div class="tab-item"><a v-link="{path:'/seller'}">商家</a></div>
  	</div>
  	<router-view :seller="seller" keep-alive></router-view>
  </div>
</template>

<script>
	import {urlParse} from 'common/js/util.js';
	import header from 'components/header/header.vue';
	
	const ERR_OK = 0;
	
	export default {
		data () {
			return {
				seller: {
					id: (() => {
						let queryParam = urlParse();
						return queryParam.id;
					})()
				}
			};
		},
		created () {
			this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
				response = response.body;
				if (response.errno === ERR_OK) {
					// this.seller = response.data;
					this.seller = Object.assign({}, this.seller, response.data);
				}
			});
		},
		components: {
			'v-header': header
		}
	};
</script>

<style>
	@import url("common/stylus/index.css");
	
	.tab {
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
	}
	.tab .tab-item {
		flex: 1;
		text-align: center;
	}
	.tab-item a {
		display: block;
		font-size: 14px;
		color: rgb(77, 85, 93);
	}
	.tab-item a.active {
		color: rgb(240, 20, 20);
	}
</style>