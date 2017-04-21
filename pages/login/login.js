// pages/login/login.js
var app = getApp();

Page({
  data: {
    tel: '',//手机号码
    pwd: '',//密码
    identify: '',//验证码
    ideHide: true,//判断验证码是否显示
    idestatus: true,//验证码状态
    identify_img_url: ''
  },
  telChange: function (e) {
    this.setData({
      tel: e.detail.value
    })
    console.log('需要的tel:' + this.data.tel);
  },
  pwdChange: function (e) {
    this.setData({
      pwd: e.detail.value
    })

  },
  ideChange: function (e) {
    this.setData({
      identify: e.detail.value,
      idestatus: true
    })
  },
  remPwd: function () {

  },

  logBtn: function (e) {
    var page = this;
    if (this.data.tel.length == 0 || this.data.pwd.length == 0) {
      wx.showToast({
        title: '温馨提示，手机号码和密码不能为空',
        icon: 'success',
        duration: 1200
      })
    } else {
      loginRequest();
    }
  },
  loginRequest: function (e) {
    var page = this;
    wx.request({
      url: app.globalData.test_url + '/api/member/LoginVerify', //仅为示例，并非真实的接口地址
      data: {
        account: this.data.tel,
        pwd: this.data.pwd,
        VerifyCode: this.data.identify
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        var rdata = res.data;
        if (rdata.Data.ErrorCode == 0) {
          console.log('正常跳转页面逻辑');

        } else if (rdata.Data.ErrorCode == 4) {
          console.log('需要填写验证码逻辑');
          var tel_url = app.globalData.test_url + '/api/member/verifycode?deviceToken=&phone=';
          page.setData({
            ideHide: false,
            idestatus: false,
            identify_img_url: tel_url + page.data.tel + '&t=' + new Date().getTime()
          })


        } else {
          var ErrorMessage = rdata.ErrorMessage;
          console.log(ErrorMessage);
          wx.showToast({
            title: ErrorMessage,
            icon: 'success',
            duration: 1200
          })
        }

      }
    })
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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