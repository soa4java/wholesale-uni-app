(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/common/StrictlyGoods"],{"16a0":function(t,o,n){"use strict";n.r(o);var e=n("f473"),a=n.n(e);for(var u in e)"default"!==u&&function(t){n.d(o,t,function(){return e[t]})}(u);o["default"]=a.a},"37c0":function(t,o,n){},"61d0":function(t,o,n){"use strict";n.r(o);var e=n("7a8d"),a=n("16a0");for(var u in a)"default"!==u&&function(t){n.d(o,t,function(){return a[t]})}(u);n("dc6d");var i=n("2877"),r=Object(i["a"])(a["default"],e["a"],e["b"],!1,null,"65d99670",null);o["default"]=r.exports},"7a8d":function(t,o,n){"use strict";var e=function(){var t=this,o=t.$createElement;t._self._c},a=[];n.d(o,"a",function(){return e}),n.d(o,"b",function(){return a})},dc6d:function(t,o,n){"use strict";var e=n("37c0"),a=n.n(e);a.a},f473:function(t,o,n){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var e=n("7384"),a={name:"StrictlyGoods",props:{},data:function(){return{goodsObj:"",list:[]}},mounted:function(){this.getPageLayoutList()},methods:{goGoodsDetail:function(o){1==o.type?t.navigateTo({url:"/pages/common/webview/webview?url="+o.url}):t.navigateTo({url:"/pages/order/goodsDetail/goodsDetail?shopId="+o.shopId+"&goodsId="+o.id})},getPageLayoutList:function(){var t=this,o={parentId:"1-5"};(0,e.getPageLayout)(o).then(function(o){if("1000"===o.code){var n=o.data.list;t.list=o.data.list,n.forEach(function(o){5===o.componentType&&(t.goodsObj=o)})}})},toForeach:function(t){var o=[];return t.list&&t.list.forEach(function(t){o.push(t)}),o}}};o.default=a}).call(this,n("6e42")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/common/StrictlyGoods-create-component',
    {
        'components/common/StrictlyGoods-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("61d0"))
        })
    },
    [['components/common/StrictlyGoods-create-component']]
]);                
