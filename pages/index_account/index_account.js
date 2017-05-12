// pages/index_account/index_account.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    store_id: '',
    vip_id: '',
    rdata: [],
    balance: '',
    onedata: [],
    twodata: [],
    threedata: [],
    Recharges:[]
  },

  GetPackages: function (store_id, vip_id, token) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/order/GetPackages',
      data: {
        store_id: store_id,
        vip_id: vip_id,

      },
      method: 'get',
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        console.log(res);
        var onedata = [];
        var twodata = [];
        var threedata = [];
        var Recharges = res.data.Data.Recharges;
        for (var i = 0; i < Recharges.length; i++) {
          Recharges[i].ithide = true;
          Recharges[i].index = i;
          if (res.data.Data.Recharges[i].type == '001') {
            onedata.push(res.data.Data.Recharges[i]);
          } else if (res.data.Data.Recharges[i].type == '002') {
            twodata.push(res.data.Data.Recharges[i]);
          } else if (res.data.Data.Recharges[i].type == '003') {
            threedata.push(res.data.Data.Recharges[i]);
          }



        }
        console.log(onedata);
        console.log(twodata);
        console.log(threedata);
        that.setData({
          Recharges: Recharges,
          onedata: onedata,
          twodata: twodata,
          threedata: threedata,
        })
      }
    })
  },
  itShow: function (e) {
    var that = this
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var onedata = that.data.onedata;
    for (var i = 0; i < onedata.length;i++){
      if (index == onedata[i].index){

        if (onedata[i].ithide==true){
          console.log('one上')
          onedata[i].ithide = false
     
        }else{
          console.log('one下')
          onedata[i].ithide = true
        }
      }
    }
    var twodata = that.data.twodata;
    for (var i = 0; i < twodata.length; i++) {
      if (index == twodata[i].index) {

        if (twodata[i].ithide == true) {
          console.log('two上')
          twodata[i].ithide = false
        } else {
          console.log('two下')
          twodata[i].ithide = true
        }
      }
    }
    var threedata = that.data.threedata;
    for (var i = 0; i < threedata.length; i++) {
      if (index == threedata[i].index) {

        if (threedata[i].ithide == true) {
          console.log('three上')
          threedata[i].ithide = false
        } else {
          console.log('three下')
          threedata[i].ithide = true
        }
      }
    }
    that.setData({
      onedata: onedata,
      twodata: twodata,
      threedata: threedata,
    })


  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      store_id: options.store_id,
      vip_id: options.vip_id,
      balance: options.balance
    })
    that.GetPackages(options.store_id, options.vip_id, app.globalData.token)



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