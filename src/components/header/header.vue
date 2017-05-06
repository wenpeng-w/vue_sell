<template>
  <div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" v-bind:src="seller.avatar"/>
			</div>
			<div class="content">
				<div class="title">
					<span class="brand bg-img"></span>
					<span class="name">{{ seller.name }}</span>
				</div>
				<div class="description">
					{{ seller.description }}/{{ seller.deliveryTime }}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" v-bind:class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{ seller.supports[0].description }}</span>
				</div>
			</div>
			<div v-if="seller.supports" v-on:click="showDetail" class="support-count">
				<span class="count">{{ seller.supports.length }}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" v-on:click="showDetail">
			<span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img v-bind:src="seller.avatar" width="100%" height="100%"/>
		</div>
		<transition name="fade">
			<div v-show="detailShow" class="detail">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{ seller.name }}</h1>
						<div class="star-wrapper">
							<star v-bind:size="48" v-bind:score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li v-for="(item, index) in seller.supports" class="support-item">
								<span v-bind:class="classMap[seller.supports[index].type]" class="icon"></span>
								<span class="text">{{ seller.supports[index].description }}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{ seller.bulletin }}</p>
						</div>
					</div>
				</div>
				<div class="detail-close" v-on:click="hideDetail">
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>
  </div>
</template>

<script>
	import star from 'components/star/star.vue';
	
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				detailShow: false
			};
		},
		methods: {
			showDetail () {
				this.detailShow = true;
			},
			hideDetail () {
				this.detailShow = false;
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		components: {
			star
		}
	};
</script>

<style>
	.header {
		position: relative;
		background-color: rgba(7, 17, 27, 0.5);
		overflow: hidden;
		color: #fff;
	}
	.header .content-wrapper {
		position: relative;
		padding: 24px 12px 18px 24px;
		font-size: 0;
	}
	.header .content-wrapper .avatar {
		display: inline-block;
		vertical-align: top;
	}
	.avatar img {
		border-radius: 2px;
	}
	.header .content-wrapper .content {
		display: inline-block;
		margin-left: 16px;
	}
	.header .content-wrapper .content .title {
		margin: 2px 0 8px 0;
	}
	.content .title .brand {
		display: inline-block;
		width: 30px;
		height: 18px;
		background-size: 30px 18px;
		background-repeat: no-repeat;
		vertical-align: top;
	}
	.content .title .bg-img{
		background-image: url(brand@2x.png);
	}
	@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
		.content .title .bg-img{
			background-image: url(brand@3x.png);
		}		
	}
	.content .title .name {
		margin-left: 6px;
		font-size: 16px;
		line-height: 18px;
		font-weight: bold;
	}
	.content .description {
		margin-bottom: 10px;
		line-height: 12px;
		font-size: 12px;
	}
	.support .icon {
		display: inline-block;
		width: 12px;
		height: 12px;
		margin-right: 4px;
		background-size: 12px 12px;
		background-repeat: no-repeat;
		vertical-align: top;
	}
	.support .icon.decrease {
		background-image: url(decrease_1@2x.png);
	}
	.support .icon.discount {
		background-image: url(discount_1@2x.png);
	}
	.support .icon.guarantee {
		background-image: url(guarantee_1@2x.png);
	}
	.support .icon.invoice {
		background-image: url(invoice_1@2x.png);
	}
	.support .icon.special {
		background-image: url(special_1@2x.png);
	}
	@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
		.support .icon.decrease {
			background-image: url(decrease_1@3x.png);
		}
		.support .icon.discount {
			background-image: url(discount_1@3x.png);
		}
		.support .icon.guarantee {
			background-image: url(guarantee_1@3x.png);
		}
		.support .icon.invoice {
			background-image: url(invoice_1@3x.png);
		}
		.support .icon.special {
			background-image: url(special_1@3x.png);
		}		
	}
	.support .text {
		line-height: 12px;
		font-size: 10px;
	}
	.content-wrapper .support-count {
		position: absolute;
		right: 12px;
		bottom: 14px;
		padding: 0 8px;
		height: 24px;
		line-height: 24px;
		border-radius: 14px;
		background-color: rgba(0, 0, 0, 0.2);
		text-align: center;
	}
	.support-count .count {
		vertical-align: top;
		font-size: 10px;
	}
	.support-count .icon-keyboard_arrow_right {
		margin-left: 2px;
		line-height: 24px;
		font-size: 10px;
	}
	.header .bulletin-wrapper {
		position: relative;
		height: 28px;
		line-height: 28px;
		padding: 0 22px 0 12px;
		background-color: rgba(7, 17, 27, 0.2);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.bulletin-wrapper .bulletin-title {
		display: inline-block;
		width: 22px;
		height: 12px;
		margin-top: 8px;
		background-image: url(bulletin@2x.png);
		background-size: 22px 12px;
		background-repeat: no-repeat;
		vertical-align: top;
	}
	@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
		.bulletin-title {
			background-image: url(bulletin@3x.png);
		}		
	}
	.bulletin-wrapper .bulletin-text {
		margin: 0 4px;
		vertical-align: top;
		font-size: 10px;
	}
	.bulletin-wrapper .icon-keyboard_arrow_right {
		position: absolute;
		top: 8px;
		right: 12px;
		font-size: 10px;
	}
	.header .background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		filter: blur(10px);
	}
	.header .detail {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 100;
		overflow: auto;
		transition: all 0.4s;
		backdrop-filter: blur(10px); 
		background-color: rgba(7, 17, 27, 0.8);
	}
	.detail.fade-enter-active, .detail.fade-leave-active {
		opacity: 1;
	}
	.detail.fade-enter, .detail.fade-leave-active {
		opacity: 0;
	}
	.header .detail .detail-wrapper {
		width: 100%;
		min-height: 100%;
	}
	.header .detail .detail-wrapper .detail-main {
		margin-top: 64px;
		padding-bottom: 64px;
	}
	.detail-main .name {
		line-height: 16px;
		font-size: 16px;
		font-weight: 700;
		text-align: center;
	}
	.detail-main .star-wrapper {
		margin-top: 16px;
		text-align: center;
	}
	.detail-main .title {
		display: flex;
		width: 80%;
		margin: 28px auto 24px auto;
	}
	.detail-main .title .line {
		flex: 1;
		position: relative;
		top: -6px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2); 
	}
	.detail-main .title .text {
		padding: 0 12px;
		line-height: 14px;
		font-size: 14px;
		font-weight: 700;
	}
	.detail-main .supports {
		width: 80%;
		margin: 0 auto;
	}
	.detail-main .supports .support-item {
		padding: 0 12px;
		margin-bottom: 12px;
		font-size: 0;
	}
	.detail-main .supports .support-item:last-child {
		margin-bottom: 0;
	}
	.detail-main .supports .support-item .icon {
		display: inline-block;
		width: 16px;
		height: 16px;
		vertical-align: top;
		margin-right: 6px;
		background-size: 16px 16px;
		background-repeat: no-repeat;
	}
	.detail-main .supports .support-item .icon.decrease {
		background-image: url(decrease_2@2x.png);
	}
	.detail-main .supports .support-item .icon.discount {
		background-image: url(discount_2@2x.png);
	}
	.detail-main .supports .support-item .icon.guarantee {
		background-image: url(guarantee_2@2x.png);
	}
	.detail-main .supports .support-item .icon.invoice {
		background-image: url(invoice_2@2x.png);
	}
	.detail-main .supports .support-item .icon.special {
		background-image: url(special_2@2x.png);
	}
	@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
		.detail-main .supports .support-item .icon.decrease {
			background-image: url(decrease_2@3x.png);
		}
		.detail-main .supports .support-item .icon.discount {
			background-image: url(discount_2@3x.png);
		}
		.detail-main .supports .support-item .icon.guarantee {
			background-image: url(guarantee_2@3x.png);
		}
		.detail-main .supports .support-item .icon.invoice {
			background-image: url(invoice_2@3x.png);
		}
		.detail-main .supports .support-item .icon.special {
			background-image: url(special_2@3x.png);
		}		
	}
	.detail-main .supports .support-item .text {
		line-height: 16px;
		font-size: 12px;
		font-weight: 200;
	}
	.detail-main .bulletin {
		width: 80%;
		margin: 0 auto;
	}
	.detail-main .bulletin .content {
		padding: 0 12px;
		line-height: 24px;
		font-size: 12px;
		font-weight: 200;
		text-align: justify;
	}
	.detail-close {
		position: relative;
		width: 26px;
		height: 26px;
		margin: -64px auto 0 auto;
		clear: both;
		font-size: 26px;
	}
</style>
