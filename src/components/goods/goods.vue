<template>
	<div>
		<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item, index) in goods" v-bind:class="{'current':currentIndex===index}" v-on:click="selectMenu(index, $event)" class="menu-item">
					<span class="text border-1px">
						<span v-show="item.type>0" v-bind:class="classMap[item.type]" class="icon"></span>{{ item.name }}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="food-list js-food-list">
					<h2 class="title">{{ item.name }}</h2>
					<ul>
						<li v-on:click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
							<div class="icon">
								<img width="57" height="57" v-bind:src="food.icon"/>
							</div>
							<div class="content">
								<h3 class="name">{{ food.name }}</h3>
								<p class="desc">{{ food.description }}</p>
								<div class="extra">
									<span class="count">月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
								</div>
								<div class="price">
									<span class="now">&yen;{{ food.price }}</span><span v-show="food.oldPrice" class="old">&yen;{{ food.oldPrice }}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol v-on:add="addFood" :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
	</div>
	<food v-on:add="addFood" :food="selectedFood" ref="food"></food>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import shopcart from 'components/shopcart/shopcart.vue';
	import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
	import food from 'components/food/food.vue';
	
	const ERR_OK = 0;
	
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood: {}
			};
		},
		computed: {
			currentIndex () {
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					if (!height2 || (this.scrollY > height1 && this.scrollY < height2)) {
						return i;
					}
				}
				return 0;
			},
			selectFoods () {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			this.$http.get('/api/goods').then((response) => {
				response = response.body;
				if (response.errno === ERR_OK) {
					this.goods = response.data;
					this.$nextTick(() => {
						this._initScroll();
						this._calculateHeight();
					});
				}
			});
		},
		methods: {
			selectMenu (index, event) {
				if (!event._constructed) {
					return;
				}
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('js-food-list');
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el, 300);
			},
			selectFood (food, event) {
				if (!event._constructed) {
					return;
				}
				this.selectedFood = food;
				this.$refs.food.show();
			},
			addFood (target) {
				this._drop(target);
			},
			_drop (target) {
				// 体验优化，异步执行下落动画
				this.$nextTick(() => {
					this.$refs.shopcart.drop(target);
				});
			},
			_initScroll () {
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				});
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
					click: true,
					probeType: 3
				});
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				});
			},
			_calculateHeight () {
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('js-food-list');
				let height = 0;
				this.listHeight.push(height);
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			}
		},
		components: {
			shopcart,
			cartcontrol,
			food
		}
	};
</script>

<style>
	@import url("../../common/stylus/index.css");
	
	.goods {
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
	}
	.goods .menu-wrapper {
		flex: 0 0 80px;
		width: 80px;
		background-color: #f3f5f7;
	}
	.menu-wrapper .menu-item {
		display: table;
		width: 56px;
		height: 54px;
		padding: 0 12px;
		line-height: 14px;	
	}
	.menu-wrapper .menu-item.current {
		position: relative;
		margin-top: -1px;
		z-index: 10;
		font-weight: 700;
		background-color: #fff;
	}
	.menu-wrapper .menu-item.current .text {
		border: 0;
	}
	.menu-wrapper .menu-item .icon {
		display: inline-block;
		width: 12px;
		height: 12px;
		margin-right: 2px;
		background-size: 12px 12px;
		background-repeat: no-repeat;
		vertical-align: top;
	}
	.menu-item .icon.decrease {
		background-image: url(decrease_3@2x.png);
	}
	.menu-item .icon.discount {
		background-image: url(discount_3@2x.png);
	}
	.menu-item .icon.guarantee {
		background-image: url(guarantee_3@2x.png);
	}
	.menu-item .icon.invoice {
		background-image: url(invoice_3@2x.png);
	}
	.menu-item .icon.special {
		background-image: url(special_3@2x.png);
	}
	@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
		.menu-item .icon.decrease {
			background-image: url(decrease_3@3x.png);
		}
		.menu-item .icon.discount {
			background-image: url(discount_3@3x.png);
		}
		.menu-item .icon.guarantee {
			background-image: url(guarantee_3@3x.png);
		}
		.menu-item .icon.invoice {
			background-image: url(invoice_3@3x.png);
		}
		.menu-item .icon.special {
			background-image: url(special_3@3x.png);
		}		
	}
	.menu-wrapper .menu-item .text {
		display: table-cell;
		width: 56px;
		vertical-align: middle;
		font-size: 12px;
		
	}
	.goods .foods-wrapper {
		flex: 1;
	}	
	.foods-wrapper .title {
		padding-left: 14px;
		height: 26px;
		line-height: 26px;
		border-left: 2px solid #d9dde1;
		font-size: 12px;
		color: rgb(143, 153, 159);
		background-color: #f3f5f7;
	}
	.food-item {
		display: flex;
		margin: 18px;
		padding-bottom: 18px;
	}
	.food-item:last-child.border-1px:after {
		display: none;
		margin-bottom: 0;
	}
	.food-item .icon {
		flex: 0 0 57px;
		margin-right: 10px;
	}
	.food-item .content {
		flex: 1;
	} 
	.food-item .content .name {
		margin: 2px 0 8px 0;
		height: 14px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7, 17, 27);
	}
	.food-item .content .desc {
		margin-bottom: 8px;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.food-item .content .extra {
		line-height: 10px;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.extra .count {
		margin-right: 12px;
	}
	.food-item .content .price {
		font-weight: 700;
		line-height: 24px;
	}
	.price .now {
		margin-right: 8px;
		font-size: 14px;
		color: rgb(240, 20, 20);
	}
	.price .old {
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.food-item .content .cartcontrol-wrapper {
		position: absolute;
		right: 0;
		bottom: 12px;
	}
</style>
