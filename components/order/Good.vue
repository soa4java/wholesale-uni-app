<template>
	<view class="content cf" @click="goGoodsDetail">
		<view class="item cf">
			<view class="fll image">
				<image :src="item.imgUrl" mode="aspectFill" lazy-load></image>
			</view>
			<view class="fll info text-333 fs28">
				<view class="flr fs24 text-999 num">
					x{{item.num}}
				</view>
				<view class="name ellipsis-line2">
					{{item.goodsName || ''}}
				</view>
				<view class="tip fs24 text-999 ellipsis">
					{{item.skuDesc || ''}}
				</view>
				<view class="cf agent-fee" v-if="businessType == 2 && item.agentcyPrice">
					<view class="fll">
						代办费:¥{{item.agentcyPrice || '0'}} 元/<text v-if="item.goodsUnit"></text>{{item.goodsUnit || '斤'}}
					</view>
					<!-- <view class="flr fs24 text-999">
						x{{item.num}}
					</view> -->
				</view>
				<view class="price text-theme">
					<view class="fll">
						价格:¥{{item.price || '0'}}元/{{item.goodsUnit || '斤'}}
					</view>
					<view class="refund flr" v-if="isDeatail==1 && businessType == 2 &&item.isAfterSale == '0' && (status=='2'||status=='3')" @click.stop="applyRefund(item)">退款</view>
					<view class="refund flr" v-if="item.isAfterSale == 1 && item.statusStr" @click.stop="goRefundDetail(item)">{{item.statusStr}}</view>
					<!-- <view class="refund flr" v-if="isDeatail!=1 && item.statusStr">{{item.statusStr}}</view> -->
				</view>
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		name: 'goodx',
		props: {
			isDeatail:{
				type: String || Number,
				default: '0'
			},
			item: {
				type: Object,
				default: null
			},
			hasAgencyFee: {
				type: Boolean,
				default: true
			},
			roleId: {
				type: String,
				default: ''
			},
			businessType: {
				type: String || Number,
				default: ''
			},
			isAgentcy: {
				type: Boolean,
				default: true
			},
			goDetailNumber: {
				type: String,
				default: ''
			},
			status: {
				type: String | Number,
				default: ''
			}
		},
		data() {
			return {
				refundText: '退款'
			}
		},
		methods: {
			// 去退款详细
			goRefundDetail(item){
				if(this.isDeatail == 1){
					let businessType = uni.getStorageSync('businessType')
					uni.navigateTo({
						url:'/pages/refund/detail?businessType='+ businessType +'&id=' + item.afterSaleId + '&status=' + this.status
					})
				}
				
			},
			// 去申请退款页面
			applyRefund(item){
				uni.navigateTo({
				  url: '/pages/refund/apply?id=' + item.id +"&status=" + this.status
				})
			},
			// 去商品详细页面
			goGoodsDetail() {
				
				if (this.goDetailNumber == '1') {
					uni.navigateTo({
						url: '/pages/order/goodsDetail/goodsDetail?shopId=' + this.item.shopId + '&goodsId=' + this.item.goodsId
					})
				} else {
					uni.navigateTo({
						url: '/pages/user/order/detail?orderId=' + this.item.orderId + '&shopId=' + this.item.shopId + '&businessType=2'
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.refund{
			min-width: 100upx;
			padding: 0 6upx;
			height: 30upx;
			line-height: 28upx;
			border: 1upx solid #FE3B0B;
			border-radius: 30upx;
			color: #FE3B0B;
			text-align: center;
			font-size: 20upx;
			position: relative;
			top: 4upx;
		}
		.agent-fee {
			position: absolute;
			bottom: 40upx;
		}
		
		.item {
			.image {
				width: 200upx;
				height: 200upx;
				border-radius: 10upx;
				overflow: hidden;

				>image {
					width: 100%;
					height: 100%;
				}
			}

			.info {
				width: 470upx;
				margin-left: 20upx;
				position: relative;
				height: 204upx;

				.name {
					width: 470upx;
					height: 74upx;
				}

				.tip {
					padding: 4upx 0;
					width: 470upx;
				}

				.num {
					position: absolute;
					bottom: 40upx;
					right: 0;
				}

				.price {
					margin-top: 20upx;
					position: absolute;
					bottom: 0;
					width: 100%;
				}
			}
		}

	}
</style>
