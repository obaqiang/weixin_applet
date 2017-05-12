// pages/index_main_card_products/index_main_card_products.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    store_id: '',
    rdata: [],
    chohidden: true,
    inhidden: 'all'
  },

  GetAllGoodsClient: function (store_id, token) {//所有商品接口
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/goods/GetAllGoodsClient',
      data: {
        store_id: store_id

      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        console.log(res);
        that.setData({
          rdata: res.data.Data
        })

      }
    })
  },
  GetGoods: function (store_id, goods_name, token) {//搜索接口
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/goods/GetGoods',
      data: {
        store_id: store_id,
        goods_name: goods_name,

      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        console.log(res);
        that.setData({
          rdata: res.data.Data
        })

      }
    })
  },
  proJump: function (e) {
    var goods_name = e.target.dataset.goods_name;
    var goods_price = e.target.dataset.goods_price;
    var unit_name = e.target.dataset.unit_name;
    var thumb = e.target.dataset.thumb;
    var goods_desc = e.target.dataset.goods_desc;
    wx.navigateTo({
      url: '../index_main_card_products_detail/index_main_card_products_detail?goods_name=' + goods_name + '&goods_price=' + goods_price + '&unit_name=' + unit_name + '&thumb=' + thumb + '&goods_desc=' + goods_desc
    })
  },

  goodsSearch: function (e) {

    var that = this;
    var goods_name = e.detail.value;
    console.log(goods_name);
    that.GetGoods(that.data.store_id, goods_name, app.globalData.token)
  },

  clCho: function () {
    var that = this;
    var chohidden = that.data.chohidden;
    if (chohidden == false) {
      chohidden = true
    } else {
      chohidden = false
    }
    that.setData({
      chohidden: chohidden
    })
  },
  nameCho: function (e) {
    var that = this
    console.log(e)
    var index = e.target.dataset.index
    that.setData({
      inhidden: index,
      chohidden: true
    })



  },



  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    that.setData({
      store_id: options.store_id
    })
    that.GetAllGoodsClient(options.store_id, app.globalData.token)
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})