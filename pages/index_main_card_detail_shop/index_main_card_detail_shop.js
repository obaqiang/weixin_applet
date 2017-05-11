// pages/index_main_card_detail_shop/index_main_card_detail_shop.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {

    resdata:[],
    

  },


  getVipinfo: function (vip_id, token) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/member/getvipinfo',
      data: {
        vip_id: vip_id,

      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          resdata:res.data.Data
        })
      }
    })
  },



  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    that.getVipinfo(options.vip_id, app.globalData.token)
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