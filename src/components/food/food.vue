<template>
	<div v-show="showFlag" class="food" ref="food" transition="move">
		<div class="food-content">
			<div class="image-header">
				<img :src="food.image" />
				<div v-on:click="hide" class="back">
					<i class="icon-arrow_lift"></i>
				</div>
			</div>
			<div class="content">
				<h1 class="title">{{ food.name }}</h1>
				<div class="detail">
					<span class="sell-count">月售{{ food.sellCount }}份</span>
					<span class="rating">好评率{{ food.rating }}%</span>
				</div>
				<div class="price">
					<span class="now">&yen;{{ food.price }}</span><span v-show="food.oldPrice" class="old">&yen;{{ food.oldPrice }}</span>
				</div>
				<div class="cartcontrol-wrapper">
					<cartcontrol @add="addFood" :food="food"></cartcontrol>
				</div>
				<div v-on:click.stop.prevent="addFirst" v-show="!food.count || food.count === 0" class="buy" transition="fade">加入购物车</div>
			</div>
			<split v-show="food.info"></split>
			<div v-show="food.info" class="info">
				<h2 class="title">商品介绍</h2>
				<p class="text">{{ food.info }}</p>
			</div>
			<split></split>
			<div class="rating">
				<h2 class="title">商品评价</h2>
				<ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
				<div class="rating-wrapper">
					<ul v-show="food.ratings && food.ratings.length">
						<li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
							<div class="user">
								<span class="name">{{ rating.username }}</span>
								<img :src="rating.avatar" width="12" height="12" alt="" class="avatar" />
							</div>
							<div class="time">{{ rating.rateTime | formatDate }}</div>
							<p class="text"><span v-bind:class="{'icon-thumb_up':rating.rateType === 0, 'icon-thumb_down':rating.rateType === 1}" ></span>{{ rating.text }}</p>
						</li>
					</ul>
					<div v-show="!food.ratings || !food.ratings.length" class="no-rating">暂无评价</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import Vue from 'vue';
	import {formatDate} from 'common/js/date.js';
	import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
	import split from 'components/split/split.vue';
	import ratingselect from 'components/ratingselect/ratingselect.vue';
	
	const ALL = 2;
	
	export default {
		props: {
			food: {
				type: Object
			}
		},
		data () {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			};
		},
		methods: {
			show () {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = false;
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.food, {
							click: true
						});
					} else {
						this.scroll.refresh();
					}
				});
			},
			hide () {
				this.showFlag = false;
			},
			addFirst (event) {
				if (!event._constructed) {
					return;
				}
				this.$emit('add', event.target);
				Vue.set(this.food, 'count', 1);
			},
			addFood (target) {
				this.$emit('add', target);
			},
			needShow (type, text) {
				if (this.onlyContent && !text) {
					return false;
				}
				if (this.selectType === ALL) {
					return true;
				} else {
					return type === this.selectType;
				}
			},
			selectRating (type) {
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			},
			toggleContent () {
				this.onlyContent = !this.onlyContent;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			}
		},
		filters: {
			formatDate (time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		components: {
			cartcontrol,
			split,
			ratingselect
		}
	};
</script>

<style>
	@import url("../../common/stylus/mixin.css"); 
	
	.food {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 48px;
		z-index: 30;
		width: 100%;
		background-color: #fff;
	}
	.food.move-transition {
		transition: all 0.2s linear;
		transform: translate3d(0, 0, 0);
	}
	.food.move-enter,
	.food.move-leave {
		transform: translate3d(100%, 0, 0);
	}
	.food-content .image-header {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
	}
	.food-content .image-header img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.food-content .image-header .back {
		position: absolute;
		top: 10px;
		left: 0;
	}
	.image-header .back .icon-arrow_lift {
		display: block;
		padding: 10px;
		font-size: 20px;
		color: #fff;
		text-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
	}
	.food-content .content {
		position: relative;
		padding: 18px;
	}
	.food-content .content .title {
		line-height: 14px;
		margin-bottom: 8px;
		font-size: 14px;
		font-weight: 700;
		color: rgb(7, 17, 27);
	}
	.food-content .content .detail {
		margin-bottom: 18px;
		line-height: 10px;
		height: 10px;
		font-size: 0;
	}
	.food-content .content .detail .sell-count,
	.food-content .content .detail .rating {
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.food-content .content .detail .sell-count {
		margin-right: 12px;
	}
	.food-content .content .price {
		font-weight: 700;
		line-height: 24px;
	}
	.food-content .content .price .now {
		margin-right: 8px;
		font-size: 14px;
		color: rgb(240, 20, 20);
	}
	.food-content .content .price .old {
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.food-content .content .cartcontrol-wrapper {
		position: absolute;
		right: 12px;
		bottom: 12px;
	}
	.food-content .content .buy {
		position: absolute;
		right: 18px;
		bottom: 18px;
		z-index: 10;
		line-height: 24px;
		height: 24px;
		padding: 0 12px;
		box-sizing: border-box;
		border-radius: 12px;
		font-size: 10px;
		color: #fff;
		background-color: rgb(0, 160, 220);
		transition: all 0.3s;
	}
	.food-content .buy.fade-transition {
		opacity: 1;
	}
	.food-content .buy.fade-enter,
	.food-content .buy.fade-leave {
		opacity: 0;
	}
	.food-content .info {
		padding: 18px;
	}
	.food-content .info .title {
		line-height: 14px;
		margin-bottom: 6px;
		font-size: 14px;
		color: rgb(7, 17, 27);
	}
	.food-content .info .text {
		line-height: 24px;
		padding: 0 8px;
		font-size: 12px;
		color: rgb(77, 85, 93);
	}
	.food-content .rating {
		padding-top: 18px;
	}
	.food-content .rating .title {
		line-height: 14px;
		margin-left: 18px;
		font-size: 14px;
		color: rgb(7, 17, 27);
	}
	.food-content .rating .rating-wrapper {
		padding: 0 18px;
	}
	.rating-wrapper .rating-item {
		position: relative;
		padding: 16px 0;
		
	}
	.rating-wrapper .rating-item .user {
		position: absolute;
		right: 0;
		top: 16px;
		line-height: 12px;
		font-size: 0;
	}
	.rating-wrapper .rating-item .user .name {
		display: inline-block;
		vertical-align: top;
		margin-right: 6px;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.rating-wrapper .rating-item .user .avatar {
		border-radius: 50%;
	}
	.rating-wrapper .rating-item .time {
		margin-bottom: 6px;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.rating-wrapper .rating-item .text {
		line-height: 16px;
		font-size: 12px;
		color: rgb(7, 17, 27);
	}
	.rating-wrapper .rating-item .text .icon-thumb_up,
	.rating-wrapper .rating-item .text .icon-thumb_down {
		margin-right: 4px;
		line-height: 16px;
		font-size: 12px;
	}
	.rating-wrapper .rating-item .text .icon-thumb_up {
		color: rgb(0, 160, 220);
	}
	.rating-wrapper .rating-item .text .icon-thumb_down {
		color: rgb(147, 153, 159);
	}
	.rating-wrapper .no-rating {
		padding: 16px 0;
		font-size: 12px;
		color: rgb(147, 153, 159);
	}
</style>
