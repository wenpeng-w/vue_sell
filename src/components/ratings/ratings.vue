<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{ seller.score }}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{ seller.rankRate }}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star v-bind:size="36" v-bind:score="seller.serviceScore"></star>
						<span class="score">{{ seller.serviceScore }}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star v-bind:size="36" v-bind:score="seller.foodScore"></star>
						<span class="score">{{ seller.foodScore }}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{ seller.deliveryTime }}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item border-1px">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar"/>
						</div>
						<div class="content">
							<h1 class="name">{{ rating.username }}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span v-show="rating.deliveryTime" class="delivery">{{ rating.deliveryTime }}</span>
							</div>
							<p class="text">{{ rating.text }}</p>
							<div v-show="rating.recommend && rating.recommend.length" class="recommend">
								<span class="icon-thumb_up"></span>
								<span v-for="item in rating.recommend" class="item">{{ item }}</span>
							</div>
							<div class="time">{{ rating.rateTime | formatDate }}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import {formatDate} from 'common/js/date.js';
	import BScroll from 'better-scroll';
	import star from 'components/star/star.vue';
	import split from 'components/split/split.vue';
	import ratingselect from 'components/ratingselect/ratingselect.vue';
	
	const ALL = 2;
//	const ERR_OK = 0;
	
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				ratings: [],
				selectType: ALL,
				onlyContent: true
			};
		},
		created () {
//			this.$http.get('/api/ratings').then((response) => {
//				response = response.body;
//				if (response.errno === ERR_OK) {
//					this.ratings = response.data;
//					this.$nextTick(() => {
//						this.scroll = new BScroll(this.$refs.ratings, {
//							click: true
//						});
//					});
//				}
//			});
			this.$http.get('static/data.json').then((response) => {
				this.ratings = response.data.ratings;
				this.$nextTick(() => {
					this.scroll = new BScroll(this.$refs.ratings, {
						click: true
					});
				});
			});
		},
		methods: {
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
			star,
			split,
			ratingselect
		}
	};
</script>

<style>
	@import url("../../common/stylus/mixin.css");
	
	.ratings {
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	.ratings .ratings-content .overview {
		display: flex;
		padding: 18px 0;
	}
	.ratings .ratings-content .overview .overview-left {
		flex: 0 0 137px;
		width: 137px;
		padding: 6px 0;
		border-right: 1px solid rgba(7, 17, 27, 0.1);
		text-align: center;
	}
@media only screen and (max-width: 320px) {
	.ratings .ratings-content .overview .overview-left {
		flex: 0 0 120px;
		width: 120px;
	}
}
	.overview .overview-left .score {
		margin-bottom: 6px;
		line-height: 28px;
		font-size: 24px;
		color: rgb(255, 153, 0);
	}
	.overview .overview-left .title {
		margin-bottom: 8px;
		line-height: 12px;
		font-size: 12px;
		color: rgb(7, 17, 27);
	}
	.overview .overview-left .rank {
		line-height: 10px;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.overview .overview-right {
		flex: 1;
		padding: 6px 0 6px 24px;
	}
@media only screen and (max-width: 320px) {
	.ratings .ratings-content .overview .overview-right {
		padding-left: 12px;
	}
}
	.overview .overview-right .score-wrapper {
		margin-bottom: 8px;
		font-size: 0;
	}
	.overview .overview-right .score-wrapper .title {
		display: inline-block;
		vertical-align: top;
		line-height: 18px;
		font-size: 12px;
		color: rgb(7, 17, 27);
	}
	.overview .overview-right .score-wrapper .star {
		display: inline-block;
		vertical-align: top;
		margin: 0 12px;
	}
@media only screen and (max-width: 320px) {
	.overview .overview-right .score-wrapper .star {
		margin-left: 6px;
		margin-right: 6px;
	}
}
	.overview .overview-right .score-wrapper .score {
		display: inline-block;
		vertical-align: top;
		line-height: 18px;
		font-size: 12px;
		color: rgb(255, 153, 0);
	}
	.overview .overview-right .delivery-wrapper {
		font-size: 0;
	}
	.overview .overview-right .delivery-wrapper .title {
		line-height: 18px;
		font-size: 12px;
		color: rgb(7, 17, 27);
	}
	.overview .overview-right .delivery-wrapper .delivery {
		margin-left: 12px;
		font-size: 12px;
		color: rgb(147, 153, 159);
	}
	.ratings .ratings-content .rating-wrapper {
		padding: 0 18px;
	}
	.ratings .ratings-content .rating-wrapper .rating-item {
		display: flex;
		padding: 18px 0;
	}
	.ratings .ratings-content .rating-wrapper .rating-item .avatar {
		flex: 0 0 28px;
		width: 28px;
		margin-right: 12px;
	}
	.ratings .ratings-content .rating-wrapper .rating-item .avatar img {
		border-radius: 50%;
	}
	.ratings .ratings-content .rating-wrapper .rating-item .content {
		position: relative;
		flex: 1;
	}
	.ratings .ratings-content .rating-wrapper .rating-item .content .name {
		margin-bottom: 4px;
		line-height: 12px;
		font-size: 10px;
		color: rgb(7, 17, 27);
	}
	.ratings .ratings-content .rating-wrapper .rating-item .content .star-wrapper {
		margin-bottom: 6px;
		font-size: 0;
	}
	.ratings .ratings-content .rating-wrapper .rating-item .content .star-wrapper .star {
		display: inline-block;
		margin-right: 6px;
		vertical-align: top;
	}
	.ratings .ratings-content .rating-wrapper .rating-item .content .star-wrapper .delivery {
		display: inline-block;
		vertical-align: top;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.ratings .ratings-content .rating-wrapper .rating-item .content .text {
		margin-bottom: 8px;
		line-height: 18px;
		font-size: 12px;
		color: rgb(7, 17, 27);
	}
	.ratings .ratings-content .rating-wrapper .rating-item .content .recommend {
		line-height: 16px;
		font-size: 0;
	}
	.ratings .ratings-content .rating-wrapper .rating-item .content .recommend .icon-thumb_up,
	.ratings .ratings-content .rating-wrapper .rating-item .content .recommend .item {
		display: inline-block;
		margin: 0 8px 4px 0;
		font-size: 9px;
	}
	.ratings .ratings-content .rating-wrapper .rating-item .content .recommend .icon-thumb_up {
		color: rgb(0, 160, 220);
	}
	.ratings .ratings-content .rating-wrapper .rating-item .content .recommend .item {
		padding: 0 6px;
		border: 1px solid rgba(7, 17, 27, 0.1);
		border-radius: 2px;
		color: rgb(147, 153, 159);
		background-color: #fff;
	}
	.ratings .ratings-content .rating-wrapper .rating-item .content .time {
		position: absolute;
		top: 0;
		right: 0;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
</style>
