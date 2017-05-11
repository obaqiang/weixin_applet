// pages/index_main_card_detail/index_main_card_detail.js
var app = getApp();
Page({
  data: {
    vip_id: '',
    store_id: '',
    balance: '',//余额
    cardtype_id: '',
    end_integral: '',//剩余积分
    vip_phone: '',
    tel: '',
    store_name: '',
    open_time: '',
    close_time: '',
    address: '',
    location_lng: '',
    location_lat: '',
    hotList: [
      {
        pic: '../../img/204px_102px_quanbg.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: '../../img/204px_102px_quanbg.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: '../../img/204px_102px_quanbg.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: '../../img/204px_102px_quanbg.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: '../../img/204px_102px_quanbg.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }
    ],
    Tickets: []

  },


  getVipinfo: function (vip_id, token) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/member/getvipinfo', //仅为示例，并非真实的接口地址
      data: {
        vip_id: vip_id,
        token: token
      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        // console.log(res.data);
        that.setData({
          balance: res.data.Data.Vip.end_money,
          cardtype_id: res.data.Data.Vip.cardtype_id,
          end_integral: res.data.Data.Vip.end_integral,
          vip_phone: res.data.Data.Vip.vip_phone,
          tel: res.data.Data.Vip.tel,
          store_name: res.data.Data.Store.store_name,
          open_time: res.data.Data.Store.open_time,
          close_time: res.data.Data.Store.close_time,
          address: res.data.Data.Store.address,
          location_lng: res.data.Data.Store.location_lng,
          location_lat: res.data.Data.Store.location_lat


        });


      }
    })
  },
  GetPickUpTickets: function (vip_id, store_id, token) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/ticket/GetPickUpTickets',
      data: {
        vip_id: vip_id,
        store_id: store_id

      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        // console.log(res.data);
        var Tickets = res.data.Data.Tickets;
        for (var i = 0; i < Tickets.length - 1; i++) {

          Tickets[i].num = i;
          Tickets[i].ishidden = false;
        }
        // console.log(Tickets);
        that.setData({
          Tickets: res.data.Data.Tickets

        });



      }
    })
  },
  PickupTicket: function (staff_id, store_id, ticket_id, token, num) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/ticket/PickupTicket',
      data: {
        staff_id: staff_id,
        store_id: store_id,
        ticket_id: ticket_id

      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        // console.log(res.data);
        if (res.data.Data.ErrorCode == 0) {
          for (var i = 0; i < that.data.Tickets.length - 1; i++) {

            if (num == that.data.Tickets[i].num) {
              //小程序奇怪的地方
              var param = {};
              var string = "Tickets[" + i + "].ishidden";
              param[string] = true;
              // console.log(param);
              that.setData(param);
            }
            wx.showToast({
              title: '优惠券领取成功',
              icon: 'success',
              duration: 1200
            })
          }
        } else {
          var ErrorMessage = res.data.Data.ErrorMessage
          wx.showToast({
            title: ErrorMessage,
            icon: 'success',
            duration: 1200
          })
        }

      }
    })
  },
  couPick: function (event) {//领取优惠券
    // 小程序的event.target.dataset有bug   

    this.PickupTicket(app.globalData.member_id, this.data.store_id, event.target.dataset.ticket_id, app.globalData.token, event.target.dataset.num);
  },

  proJump: function () {//全部商品跳转
    wx.navigateTo({
      url: '../index_main_card_products/index_main_card_products?vip_id=' + this.data.vip_id + '&store_id=' + this.data.store_id
    })
  },
  pacJump: function () {//套餐充值跳转
    wx.navigateTo({
      url: '../index_main_card_package/index_main_card_package?vip_id=' + this.data.vip_id + '&cardtype_id=' + this.data.cardtype_id
    })
  },
  accJump: function () {//余额页面跳转
    wx.navigateTo({
      url: '../index_account/index_account?vip_id=' + this.data.vip_id + '&store_id=' + this.data.store_id + '&balance=' + this.data.balance
    })
  },
  poJump: function () {//积分兑换跳转
    wx.navigateTo({
      url: '../index_main_card_detail_points/index_main_card_detail_points?vip_id=' + this.data.vip_id + '&store_id=' + this.data.store_id + '&balance=' + this.data.balance + '&end_integral=' + this.data.end_integral
    })
  },
  actJump: function () {//活动页面跳转
    wx.navigateTo({
      url: '../index_action/index_action?vip_id=' + this.data.vip_id + '&store_id=' + this.data.store_id + '&balance=' + this.data.balance + '&end_integral=' + this.data.end_integral
    })

  },
  couJump: function () {//优惠券页面跳转
    wx.navigateTo({
      url: '../index_coupon/index_coupon?vip_id=' + this.data.vip_id + '&store_id=' + this.data.store_id
    })
  },
  redJump: function () {//红包页面跳转
    wx.navigateTo({
      url: '../index_red_packets/index_red_packets?vip_id=' + this.data.vip_id
    })
  },
  priJump: function () {//奖品页面跳转
    wx.navigateTo({
      url: '../index_prize/index_prize?vip_id='+this.data.vip_id+'&store_id='+this.data.store_id
    })
  },
  recJump: function () {//充值记录跳转
    wx.navigateTo({
      url: '../index_recharge/index_recharge?vip_id='+this.data.vip_id+'&store_id='+this.data.store_id
    })
  },
  purJump: function () {//消费记录跳转
    wx.navigateTo({
      url: '../index_purchase_history/index_purchase_history?vip_id='+this.data.vip_id+'&store_id='+this.data.store_id
    })
  },
  billJump: function () {//账单页面跳转
    wx.navigateTo({
      url: '../index_bill/index_bill?vip_id='+this.data.vip_id+'&store_id='+this.data.store_id
    })
  },
  siJump: function () {//签单页面跳转
    wx.navigateTo({
      url: '../index_sign_statics/index_sign_statics?vip_id='+this.data.vip_id+'&store_id='+this.data.store_id
    })
  },
  depJump: function () {//托管页面跳转
    wx.navigateTo({
      url: '../index_deposit/index_deposit?store_id=' + this.data.store_id
    })
  },
  phoJump: function () {//交易拍照页面跳转
    wx.navigateTo({
      url: '../index_photo/index_photo?vip_id=' + this.data.vip_id + '&store_id=' + this.data.store_id
    })
  },

  shopIntro:function(){//商家简介页面跳转
    wx.navigateTo({
      url: '../index_main_card_detail_shop/index_main_card_detail_shop?vip_id=' + this.data.vip_id 
    })
  },



  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getVipinfo(options.vip_id, app.globalData.token);
    this.GetPickUpTickets(options.vip_id, options.store_id, app.globalData.token);
    this.setData({
      vip_id: options.vip_id,
      store_id: options.store_id
    });


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
  },



})