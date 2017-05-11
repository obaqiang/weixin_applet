// pages/login/login.js
var app = getApp();

Page({
  data: {
    tel: '',//手机号码
    pwd: '',//密码
    identify: '',//验证码
    ideHide: true,//判断验证码是否显示
    identify_img_url: '',
    remimg: '../../img/34px_34px_nohook.png',
    remstatus: false
  },
  telChange: function (e) {
    this.setData({
      tel: e.detail.value
    })

  },
  pwdChange: function (e) {
    this.setData({
      pwd: e.detail.value
    })

  },
  ideChange: function (e) {
    this.setData({
      identify: e.detail.value,

    })
  },
  remPwd: function (e) {//记住密码

    var page = this;
    if (page.data.remimg == '../../img/34px_34px_nohook.png') {

      page.setData({
        remimg: '../../img/34px_34px_hook.png',
        remstatus: true
      })

    } else {
      page.setData({
        remimg: '../../img/34px_34px_nohook.png',
        remstatus: false

      })
    }
  },
  reGis: function () {//注册账号
    wx.navigateTo({
      url: '../login_register/login_register'
    })
  },


  /**
  * 异步取信息
  */
  listenerStorageGet: function () {
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'tel',
      success: function (res) {

        that.setData({
          //
          tel: res.data,
          remimg: '../../img/34px_34px_hook.png'
        })
      },
      /**
       * 失败会调用
       */
      fail: function (res) {

        // console.log('号码获取失败');
      }
    })
    wx.getStorage({
      //获取数据的key
      key: 'pwd',
      success: function (res) {

        that.setData({
          //
          pwd: res.data
        })
      },
      /**
       * 失败会调用
       */
      fail: function (res) {

        // console.log('密码获取失败');
      }
    })
  },


  LoginVerify: function (e) {
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
        console.log(res);
        var rdata = res.data;

        if (rdata.Data.ErrorCode == 0) {
          // console.log('正常跳转页面逻辑');
          if (page.data.remstatus == true) {//记住密码
            wx.setStorage({
              key: 'tel',
              data: page.data.tel,
              success: function (res) {
                // console.log(res);
                // console.log('手机号码存储成功');
              }
            })
            wx.setStorage({
              key: 'pwd',
              data: page.data.pwd,
              success: function (res) {
                // console.log(res);
                // console.log('密码存储成功');
              }
            })

          } else {
            wx.clearStorage({
              success: function (res) {
                page.setData({
                  tel: '',
                  pwd: ''
                })
              }
            })
            // console.log(22);
          }
          var token = rdata.Data.Token;
          var birthday = rdata.Data.Member.birthday;
          birthday = birthday.slice(0,10)
          // console.log(token);
          app.globalData.token = token;
          app.globalData.phone = rdata.Data.Member.phone;
          app.globalData.birthday = birthday;
          app.globalData.thumb = rdata.Data.Member.thumb;
          app.globalData.member_name = rdata.Data.Member.member_name
          wx.switchTab({

            url: '../index_main_card/index_main_card'
          })

        } else if (rdata.Data.ErrorCode == 4) {
          // console.log('需要填写验证码逻辑');
          var ErrorMessage = rdata.ErrorMessage;

          wx.showToast({
            title: ErrorMessage,
            icon: 'success',
            duration: 1200
          })
          var tel_url = app.globalData.test_url + '/api/member/verifycode?deviceToken=&phone=';
          page.setData({
            ideHide: false,
            idestatus: false,
            identify_img_url: tel_url + page.data.tel + '&t=' + new Date().getTime()
          })


        } else {
          var ErrorMessage = rdata.ErrorMessage;

          wx.showToast({
            title: ErrorMessage,
            icon: 'success',
            duration: 1200
          })
        }

      }
    })
  },

  logBtn: function (e) {//登录
    var page = this;
    if (this.data.tel.length == 0 || this.data.pwd.length == 0) {
      wx.showToast({
        title: '温馨提示，手机号码和密码不能为空',
        icon: 'success',
        duration: 1200
      })
    } else {
      if (this.data.ideHide == true) {//如果不需要验证码
        page.LoginVerify();
      } else if (this.data.identify.length == 0) {
        wx.showToast({
          title: '温馨提示，验证码不能为空',
          icon: 'success',
          duration: 1200
        })
      }
    }
  },
  forGetpwd: function (e) {//忘记密码
    wx.showToast({
      title: '请联系发卡商家',
      icon: 'success',
      duration: 1200
    })
  },



  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.listenerStorageGet();
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