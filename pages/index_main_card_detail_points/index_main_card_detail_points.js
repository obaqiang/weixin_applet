// pages/index_main_card_detail_points/index_main_card_detail_points.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    store_id: '',
    vip_id: '',
    type: 1,
    page_num: 1,
    page_size: 10,
    products: [],
    end_integral: ''
  },
  GetIntProducts: function (store_id, type, page_num, page_size, token) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/goods/GetIntProducts',
      data: {
        store_id: store_id,
        type: type,
        page_num: page_num,
        page_size: page_size,
      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          products: res.data.Data.Products
        })
      }
    })
  },
  leftJump: function () {
    wx.navigateTo({
      url: '../index_main_card_detail_points_more/index_main_card_detail_points_more?vip_id=' + this.data.vip_id
    })
  },
  rightJump: function () {
    wx.navigateTo({
      url: '../index_main_card_detail_points_record/index_main_card_detail_points_record?store_id=' + this.data.store_id + '&vip_id=' + this.data.vip_id
    })
  },


  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      store_id: options.store_id,
      end_integral: options.end_integral,
      vip_id: options.vip_id
    })
    that.GetIntProducts(options.store_id, that.data.type, that.data.page_num, that.data.page_size, app.globalData.token)
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