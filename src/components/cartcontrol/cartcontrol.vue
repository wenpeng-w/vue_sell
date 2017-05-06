<template>
	<div class="cartcontrol">
		<transition name="move">
			<div v-show="food.count>0" v-on:click.stop.prevent="decreaseCart" class="cart-decrease">
				<div class="inner icon-remove_circle_outline"></div>
			</div>
		</transition>
		<div v-show="food.count>0" class="cart-count">{{ food.count }}</div>
		<div v-on:click.stop.prevent="addCart" class="cart-add icon-add_circle"></div>
	</div>	
</template>

<script>
	import Vue from 'vue';
	
	export default {
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCart (event) {
				if (!event._constructed) {
					return;
				}
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1);
				} else {
					this.food.count++;
				}
				this.$emit('add', event.target);
			},
			decreaseCart (event) {
				if (!event._constructed) {
					return;
				}
				if (this.food.count) {
					this.food.count--;
				}
			}
		}
	};
</script>

<style>
	.cartcontrol {
		font-size: 0;
	}
	.cartcontrol .cart-decrease {
		display: inline-block;
		padding: 6px;
		transition: all 0.3s linear;
	}
	.cart-decrease.move-enter-active,
	.cart-decrease.move-leave-active {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}
	.cart-decrease.move-enter,
	.cart-decrease.move-leave-active {
		opacity: 0;
		transform: translate3d(24px, 0, 0);
	}
	.cart-decrease .inner {
		display: inline-block;
		font-size: 24px;
		line-height: 24px;
		color: rgb(0, 160, 220);
		transition: all 0.3s linear;
		transform: rotate(0);
	}
	.cart-decrease.move-enter .inner,
	.cart-decrease.move-leave-active .inner {
		transform: rotate(180deg);
	}
	.cartcontrol .cart-count {
		display: inline-block;
		vertical-align: top;
		width: 12px;
		padding-top: 6px;
		line-height: 24px;
		font-size: 10px;
		text-align: center;
		color: rgb(147, 152, 159);
	}
	.cartcontrol .cart-add {
		display: inline-block;
		padding: 6px;
		font-size: 24px;
		line-height: 24px;
		color: rgb(0, 160, 220);
	}
</style>
