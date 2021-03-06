<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{ seller.name }}</h1>
				<div class="desc border-1px">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{ seller.ratingCount }})</span>
					<span class="text">月售{{ seller.sellCount }}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{ seller.minPrice }}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{ seller.deliveryPrice }}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{ seller.deliveryTime }}</span>分钟
						</div>
					</li>
				</ul>
				<div v-on:click="toggleFavorite($event)" class="favorite">
					<span v-bind:class="{'active':favorite}" class="icon-favorite"></span>
					<span class="text">{{ favoriteText }}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper border-1px">
					<p class="content">{{ seller.bulletin }}</p>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li v-for="(item, index) in seller.supports" class="support-item border-1px">
						<span v-bind:class="classMap[seller.supports[index].type]" class="icon"></span>
						<span class="text">{{ seller.supports[index].description }}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h2 class="title">商家实景</h2>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li v-for="pic in seller.pics" class="pic-item">
							<img :src="pic" width="120" height="90"/>
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h2 class="title border-1px">商家信息</h2>
				<ul>
					<li v-for="info in seller.infos" class="info-item border-1px">{{ info }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import {saveToLocal, loadFromLocal} from 'common/js/store.js';
	import star from 'components/star/star.vue';
	import split from 'components/split/split.vue';
	
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				favorite: (() => {
					return loadFromLocal(this.seller.id, 'favorite', false);
				})()
			};
		},
		computed: {
			favoriteText () {
				return this.favorite ? '已收藏' : '收藏';
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		watch: {
			'seller' () {
				this.$nextTick(() => {
					this._initScroll();
					this._initPics();
				});
			}
		},
		mounted () {
			this.$nextTick(() => {
				this._initScroll();
				this._initPics();
			});
		},
		methods: {
			toggleFavorite (event) {
				if (!event._constructed) {
					return;
				}
				this.favorite = !this.favorite;
				saveToLocal(this.seller.id, 'favorite', this.favorite);
			},
			_initScroll () {
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.seller, {
						click: true
					});
				} else {
					this.scroll.refresh();
				}
			},
			_initPics () {
				if (this.seller.pics) {
					let picWidth = 120;
					let margin = 6;
					let width = (picWidth + margin) * this.seller.pics.length - margin;
					this.$refs.picList.style.width = width + 'px';
					this.$nextTick(() => {
						if (!this.picScroll) {
							this.picScroll = new BScroll(this.$refs.picWrapper, {
								scrollX: true,
								eventPassthrough: 'vertical'
							});
						} else {
							this.picScroll.refresh();
						}
					});
				}
			}
		},
		components: {
			star,
			split
		}
	};
</script>

<style>
	@import url("../../common/stylus/mixin.css");
	
	.seller {
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	.seller .overview {
		position: relative;
		padding: 18px;
	}
	.seller .overview .title {
		margin-bottom: 8px;
		line-height: 14px;
		color: rgb(7, 17, 27);
		font-size: 14px;
	}
	.seller .overview .desc {
		padding-bottom: 18px;
		font-size: 0;
	}
	.seller .overview .desc .star {
		display: inline-block;
		vertical-align: top;
		margin-right: 8px;
	}
	.seller .overview .desc .text {
		display: inline-block;
		vertical-align: top;
		margin-right: 12px;
		line-height: 18px;
		font-size: 10px;
		color: rgb(77, 85, 93);
	}
	.seller .overview .remark {
		display: flex;
		padding-top: 18px;
	}
	.seller .overview .remark .block {
		flex: 1;
		text-align: center;
		border-right: 1px solid rgba(7, 17, 27, 0.1);
	}
	.seller .overview .remark .block:last-child {
		border: none;
	}
	.seller .overview .remark .block h2 {
		margin-bottom: 4px;
		line-height: 10px;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.seller .overview .remark .block .content {
		line-height: 24px;
		font-size: 10px;
		color: rgb(7, 17, 27);
	}
	.seller .overview .remark .block .content .stress {
		font-size: 24px;
	}
	.seller .overview .favorite {
		position: absolute;
		top: 18px;
		right: 11px;
		width: 50px;
		text-align: center;
	}
	.seller .overview .favorite .icon-favorite {
		display: block;
		margin-bottom: 4px;
		line-height: 24px;
		font-size: 24px;
		color: #d4d6d9;
	}
	.seller .overview .favorite .icon-favorite.active {
		color: rgb(240, 20, 20);
	}
	.seller .overview .favorite .text {
		line-height: 10px;
		font-size: 10px;
		color: rgb(77, 85, 93);
	}
	.seller .bulletin {
		padding: 18px 18px 0 18px;
	}
	.seller .bulletin .title {
		margin-bottom: 8px;
		line-height: 14px;
		color: rgb(7, 17, 27);
		font-size: 14px;
	}
	.seller .bulletin .content-wrapper {
		padding: 0 12px 16px 12px;
	}
	.seller .bulletin .content-wrapper .content {
		line-height: 24px;
		font-size: 12px;
		color: rgb(240, 20, 20);
	}
	.seller .bulletin .supports .support-item {
		padding: 16px 12px;
		font-size: 0;
	}
	.seller .bulletin .supports .support-item:last-child.border-1px:after {
		border: none;
	}
	.support-item .icon {
		display: inline-block;
		width: 16px;
		height: 16px;
		margin-right: 6px;
		background-size: 16px 16px;
		background-repeat: no-repeat;
		vertical-align: top;
	}
	.support-item .icon.decrease {
		background-image: url(decrease_4@2x.png);
	}
	.support-item .icon.discount {
		background-image: url(discount_4@2x.png);
	}
	.support-item .icon.guarantee {
		background-image: url(guarantee_4@2x.png);
	}
	.support-item .icon.invoice {
		background-image: url(invoice_4@2x.png);
	}
	.support-item .icon.special {
		background-image: url(special_4@2x.png);
	}
	@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
		.support-item .icon.decrease {
			background-image: url(decrease_4@3x.png);
		}
		.support-item .icon.discount {
			background-image: url(discount_4@3x.png);
		}
		.support-item .icon.guarantee {
			background-image: url(guarantee_4@3x.png);
		}
		.support-item .icon.invoice {
			background-image: url(invoice_4@3x.png);
		}
		.support-item .icon.special {
			background-image: url(special_4@3x.png);
		}		
	}
	.seller .bulletin .supports .support-item .text {
		line-height: 16px;
		font-size: 12px;
		color: rgb(7, 17, 27);
	}
	.seller .pics {
		padding: 18px;
	}
	.seller .pics .title {
		margin-bottom: 12px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7, 17, 27);
	}
	.seller .pics .pic-wrapper {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}
	.seller .pics .pic-wrapper .pic-list {
		font-size: 0;
	}
	.seller .pics .pic-wrapper .pic-list .pic-item {
		display: inline-block;
		margin-right: 6px;
		width: 120px;
		height: 90px;
	}
	.seller .pics .pic-wrapper .pic-list .pic-item:last-child {
		margin-right: 0;
	}
	.seller .info {
		padding: 18px 18px 0 18px;
		color: rgb(7, 17, 27);
	}
	.seller .info .title {
		padding-bottom: 12px;
		line-height: 14px;
		font-size: 14px;
	}
	.seller .info .info-item {
		padding: 16px 12px;
		line-height: 16px;
		font-size: 12px;
	}
	.seller .info .info-item:last-child.border-1px:before {
		border: none;
	}
</style>
