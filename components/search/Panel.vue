<template>
  <div v-show="show" class="panel">
    <transition name="mask">
      <div v-show="show" class="mask" @click="close"></div>
    </transition>
    <transition name="body">
      <div v-show="show" class="body">
        <!-- 产地 -->
        <!-- <div :class="['location',isMoreLocat?'scale':'']">
          <section ref="area">
            <li
              v-for="(area,index) in list"
              :class="{actived:filter.areaId==area.id}"
              :key="index"
              @click="getAreas(area)"
            >{{area.name}}</li>
          </section>
        </div>
        <div v-if="isMoreBtn" class="more" @click="isMoreLocat = !isMoreLocat">
          <img :src="isMoreLocat?icon.Aimdown:icon.Aimup" width="19" height="15" alt />
        </div> -->

        <!-- 价格区间 -->
        <div class="price-area">
          <input v-model="filter.priceBegin" type="number" placeholder="最低价" @blur="valiPriceBegin" />
          <span :class="{'oppo': platform == '1' || platform == '5'}"></span>
          <input v-model="filter.priceEnd" type="number" placeholder="最高价" @blur="valiPriceEnd" />
        </div>
        <div class="weight"></div>
        <!-- 起批量 -->
        <div class="price-area">
          <input v-model="filter.startNumStart" type="number" placeholder="最低起批量" @blur="valiStartNumStart" />
          <span :class="{'oppo': platform == '1' || platform == '5'}"></span>
          <input v-model="filter.startNumEnd" type="number" placeholder="最高起批量" @blur="valiStartNumEnd" />
        </div>
        
        <div class="operator">
          <div class="reset" @click="reset">重置</div>
          <div class="confirm" @click="submit">确定</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Aimup from "@/static/img/icon-aimup.png";
import Aimdown from "@/static/img/icon-aimdown.png";
import { getArea } from "@/api/areaApi.js";
import T from '@/utils/tips.js'
export default {
  name: "panel",
  props: {
    show: {
      type: Boolean,
      default: false
    },
	platform: {
	  type: String || Number,
	  default: ''
	}
  },
  data() {
    return {
      list: [],
      isMoreLocat: false,
      isMoreBtn: false,
      icon: {
        Aimup,
        Aimdown
      },
      filter: {
        // areaLevel: 1,
        // areaId: '',
        priceBegin: "",
        priceEnd: "",
        startNumStart: '',
        startNumEnd: ''
      },
      isMinOk: true,
      isMaxOk: true,
      isStartOk: true,
      isEndOk: true
    };
  },
  mounted() {
	  // 设备样式兼容
    getArea().then(data => {
      let d = data.data;
      let res = [];
      d.forEach(item => {
        item !== null && res.push(item);
      });
      this.list = res;
    });
  },
  methods: {
	  getAreas(area){
      if(this.filter.areaId === area.id){
        this.filter.areaId = ''
      }else{
        this.filter.areaId = area.id
      }
		  
	  },
    close() {
      this.$emit("close", false);
    },
    valiPriceBegin() {
      let val = this.filter.priceBegin;
      if (this.filter.priceBegin !== "") {
        if (!val.match(/^(^[1-9]\d+|^[0-9])(\.(\d{1,2}$))?$/)) {
          this.isMinOk = false;
          return T.tips("请输入0-9999.99的数字");
        }
        this.isMinOk = true;
      }
    },
    valiPriceEnd() {
      let val = this.filter.priceEnd;

      if (this.filter.priceEnd !== "") {
        if (!val.match(/^(^[1-9]\d+|^[0-9])(\.(\d{1,2}$))?$/)) {
          this.isMaxOk = false;
          return T.tips("请输入0-9999.99的数字");
        }
        this.isMaxOk = true;
      }
    },
    valiStartNumStart(){
      let val = this.filter.priceBegin;
      if (this.filter.priceBegin !== "") {
        if (!val.match(/^(^[1-9]\d+|^[0-9])$/)) {
          this.isStartOk = false;
          return T.tips("请输入0-9999的数字");
        }
        this.isStartOk = true;
      }
    },
    valiStartNumEnd(){
      let val = this.filter.priceBegin;
      if (this.filter.priceBegin !== "") {
        if (!val.match(/^(^[1-9]\d+|^[0-9])$/)) {
          this.isEndOk = false;
          return T.tips("请输入0-9999的数字");
        }
        this.isEndOk = true;
      }
    },
    reset() {
      this.filter = {
        areaId: "",
        areaLevel: 1,
        priceBegin: "",
        priceEnd: ""
      };
    },
    submit() {
      if (this.isMinOk && this.isMaxOk) {
        this.$emit('filter',this.filter)
      } else {
        this.$tips("请确认输入数据无误");
      }
    }
  }
};

</script>

<style lang="scss" scoped>
.oppo{
    top: -28upx !important;
}
.panel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
    li{
      list-style: none;
    }
  .price-area {
    text-align: left;
    position: relative;
    padding-top: 80upx;
	padding-bottom: 60upx;
	left: 30upx;
    &::before {
      content: "价格区间";
      display: block;
      color: #000;
      font-size: 24upx;
      // margin-left: 31upx;
      font-weight: bold;
      text-align: left;
      margin-bottom: 20upx;
      position: absolute;
      // left: 15upx;
      top: 0;
    }
    input {
      border: none;
      outline: none;
      border-radius: 36upx;
      background-color: #f5f5f5;
      width: 230upx;
      display: inline-block;
      padding: 10upx 24upx;
      font-size: 24upx;
      text-align: center;
	  height: 36upx;
	  min-height:36upx;
	  font-size: 24upx;
	  padding: 14upx 0;
      &::placeholder {
        color: #cccccc;
      }
    }
    span {
      margin-left: 16upx;
      margin-right: 16upx;
	  position: relative;
	  top: -4upx;
	  display: inline-block;
	  width: 20upx;
	  height: 2upx;
	  background: #333;
	 /*  #ifdef  MP-WEIXIN  */
	  top: -28upx;
	 /*  #endif  */
    }

  }
  
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .more {
    text-align: center;
    padding: 20upx 0;
  }
  .body {
    background-color: #fff;
    padding: 0upx 24upx 20upx 0upx;
    position: fixed;
    z-index: 2;
    width: 580upx;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: scroll;
    padding-bottom: 120upx;
    -webkit-overflow-scrolling: touch;
    .operator {
      display: flex;
      justify-content: space-between;
      text-align: center;
      font-size: 30upx;
      line-height: 80upx;
      position: fixed;
      bottom: 0;
      width: 520upx;
      background-color: #fff;
      padding-bottom: 30upx;
	  left: 190upx;
    }
    .reset {
      width: 199upx;
      // box-shadow: 0 0 0 1upx #e6e6e6 inset;
      color: #000;
      border-radius: 40upx;
	  border: 1upx solid #e6e6e6;
	  height: 79upx;
	  line-height: 81upx;
    }
    .confirm {
      color: #fff;
      background-color: #FE3B0B;
      width: 280upx;
      border-radius: 40upx;
	  position: relative;
	  left: 0upx;
	  height: 80upx;
	  line-height: 82upx;
    }
    .location {
      margin: 40upx 0;
      overflow-y: auto;
      transition: height 0.5s;
      & > section {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
      }

      &.scale {
        overflow-y: auto;
        height: auto;
      }
      &::before {
        content: "产地";
        display: block;
        color: #000;
        font-size: 24upx;
        margin-left: 44upx;
        font-weight: bold;
      }
      
      li {
        // width: 42upx;
        padding: 6upx 30upx;
        line-height: 44upx;
        border-radius: 56upx;
        background-color: #f5f5f5;
        margin-top: 40upx;
        margin-left: 40upx;
        color: #666;
        font-size: 24upx;
        text-align: center;
        white-space: nowrap;
        transition: all 0.5s;
        &.actived {
          background-color: #fff5f5;
          color: #FE3B0B;
        }
      }
    }
  }
  .mask-enter-active,
  .mask-leave-active,
  .body-enter-active,
  .body-leave-active {
    transition: all 0.5s;
  }
  .mask-enter,
  .body-enter,
  .mask-leave-to,
  .body-leave-to {
    opacity: 0;
  }
  .body-enter,
  .body-leave-to {
    transform: translateX(100%);
  }
  .body-enter-to,
  .body-leave {
    transform: translateX(0%);
  }
  .mask-enter-to,
  .body-enter-to,
  .mask-leave,
  .body-leave {
    opacity: 1;
  }
}
</style>
