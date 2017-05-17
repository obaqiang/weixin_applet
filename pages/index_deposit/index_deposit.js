// pages/index_deposit/index_deposit.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    Staffs: [],
    has_apply: ''
  },

  GetEntrustMans: function (store_id, member_id, token) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/entrust/GetEntrustMans',
      data: {
        store_id: store_id,
        member_id: member_id
      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        console.log(res.data);
        for (var i = 0; i < res.data.Data.Staffs.length; i++) {
          res.data.Data.Staffs[i].index = i;
        }
        that.setData({
          Staffs: res.data.Data.Staffs,
          has_apply: res.data.Data.has_apply
        })
      }
    })
  },

  reView: function (e) { 
    var that=this
    console.log(e);
    var index = e.target.dataset.index;
    console.log(index);
    for (var i = 0; i < that.data.Staffs.length; i++) {
      if (index == that.data.Staffs[i].index) {
        console.log('进来');
        var param = {};
        var string = "Staffs[" + i + "].is_selected";
        if (that.data.Staffs[i].is_selected == 0) {
          param[string] = 1;
        } else {
          param[string] = 0;
        }
        that.setData(param);

      }
    }

  },


  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.GetEntrustMans(options.store_id, app.globalData.member_id, app.globalData.token)
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