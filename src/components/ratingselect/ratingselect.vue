<template>
	<div class="ratingselect">
		<div class="rating-type border-1px">
			<span v-on:click="select(2, $event)" v-bind:class="{'active': selectType === 2}" class="block positive">{{ desc.all }}<span class="count">{{ ratings.length }}</span></span>
			<span v-on:click="select(0, $event)" v-bind:class="{'active': selectType === 0}" class="block positive">{{ desc.positive }}<span class="count">{{ positives.length }}</span></span>
			<span v-on:click="select(1, $event)" v-bind:class="{'active': selectType === 1}" class="block negative">{{ desc.negative }}<span class="count">{{ negatives.length }}</span></span>
		</div>
		<div v-on:click="toggleContent" class="switch" v-bind:class="{'on':onlyContent}">
			<i class="icon-check_circle"></i>
			<span class="text">只看内容的评价</span>
		</div>
	</div>
</template>

<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;

	export default {
		props: {
			ratings: {
				type: Array,
				default () {
					return [];
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			},
			desc: {
				type: Object,
				default () {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					};
				}
			}
		},
		computed: {
			positives () {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE;
				});
			},
			negatives () {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE;
				});
			}
		},
		methods: {
			select (type, event) {
				if (!event._constructed) {
					return;
				}
				this.selectType = type;
				this.$dispatch('ratingtype.select', type);
			},
			toggleContent (event) {
				if (!event._constructed) {
					return;
				}
				this.onlyContent = !this.onlyContent;
				this.$dispatch('content.toggle', this.onlyContent);
			}
		}
	};
</script>
<style>
	@import url("../../common/stylus/mixin.css");
	
	.ratingselect .rating-type {
		padding: 18px 0;
		margin: 0 18px;
		font-size: 0;
	}
	.ratingselect .rating-type .block {
		display: inline-block;
		padding: 8px 12px;
		margin-right: 8px;
		line-height: 16px;
		border-radius: 1px;
		font-size: 12px;
		color: rgb(77, 85, 93);
	}
	.ratingselect .rating-type .block.active {
		color: #fff;
	}
	.ratingselect .rating-type .block.positive {
		background-color: rgba(0, 160, 220, 0.2);
	}
	.ratingselect .rating-type .block.positive.active {
		background-color: rgb(0, 160, 220);
	}
	.ratingselect .rating-type .block.negative {
		background-color: rgba(77, 85, 93, 0.2);
	}
	.ratingselect .rating-type .block.negative.active {
		background-color: rgb(77, 85, 93);
	}
	.ratingselect .rating-type .block .count {
		margin-left: 2px;
		font-size: 8px;
	}
	.ratingselect .switch {
		padding: 12px 18px;
		line-height: 24px;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		color: rgb(147, 153, 159);
		font-size: 0;
	}
	.ratingselect .switch.on .icon-check_circle {
		color: #00c850;
	}
	.ratingselect .switch .icon-check_circle {
		display: inline-block;
		vertical-align: top;
		margin-right: 4px;
		font-size: 24px;
	}
	.ratingselect .switch .text {
		display: inline-block;
		vertical-align: top;
		font-size: 12px;
	}
</style>