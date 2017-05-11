// pages/index_prize/index_prize.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    vip_id: '',
    store_id: '',
    Items: []

  },


  GetVipDrawLotteryItems: function (vip_id, token) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/lottery/GetVipDrawLotteryItems',
      data: {
        vip_id: vip_id

      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        console.log(res.data);
        var Items = res.data.Data.Items;
        for (var i = 0; i < Items.length; i++) {
          var award_endtime = Items[i].award_endtime;
          award_endtime = util.getNowFormatDate(award_endtime);
          Items[i].award_endtime = award_endtime;
        }
        that.setData({
          Items:Items
        })
      }
    })
  },




  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      vip_id: options.vip_id,
      store_id: options.store_id
    })
    that.GetVipDrawLotteryItems(options.vip_id, app.globalData.token);

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