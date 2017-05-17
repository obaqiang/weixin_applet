// pages/index_main_card_detail_points_more/index_main_card_detail_points_more.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    vip_id: '',
    page_num: 1,
    page_size: 10,
    rdata:[]
  },
  GetVipIntegralCA: function (vip_id, page_num, page_size, token) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/query/GetVipIntegralCA',
      data: {
        Vip_id: vip_id,
        page_num: page_num,
        page_size: page_size,
      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        console.log(res.data);
        for (var i = 0; i < res.data.Data.Items.length;i++){
          var add_time = res.data.Data.Items[i].add_time;
          add_time = util.getNowFormatDate(add_time);
          res.data.Data.Items[i].add_time = add_time;
        }
        that.setData({
          rdata:res.data
        })
      }
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      vip_id: options.vip_id,

    })
    that.GetVipIntegralCA(options.vip_id, that.data.page_num, that.data.page_size, app.globalData.token)
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