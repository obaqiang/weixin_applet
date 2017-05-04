// pages/index_red_packets/index_red_packets.js

var app = getApp();
var util = require('../../utils/util.js');
Page({

  data: {
    vip_id: '',
    begin_time: '',
    end_time: '',
    page_num: 1,
    page_size: 10,
    Items:[],
    mon_status:'',
    hotList: [
      {
        month: '1月',

        index:0

      }, {
        month: '2月',

        index:1

      }, {
        month: '3月',

        index:2

      }, {
        month: '4月',

        index:3

      }, {
        month: '5月',

        index:4

      }, {
        month: '6月',

        index:5

      }, {
        month: '7月',

        index:6

      }, {
        month: '8月',

        index:7

      }, {
        month: '9月',

        index:8

      }, {
        month: '10月',

        index:9

      }, {
        month: '11月',

        index:10

      }, {
        month: '12月',

        index:11

      }, {
        month: '全部',

        index:12

      }
    ],
    tableList: [
      {
        name: '10元',
        num: '医用',
        time: '2017-04-20'
      }, {
        name: '10元',
        num: '医用',
        time: '2017-04-20'
      }, {
        name: '10元',
        num: '医用',
        time: '2017-04-20'
      },
    ]



  },

  GetRedpacketItemsOfVip: function (vip_id, begin_time, end_time, page_num, page_size, token) {
    var that = this;
    wx.request({
      url: app.globalData.test_url + '/api/redpacket/GetRedpacketItemsOfVip',
      data: {
        vip_id: vip_id,
        begin_time: begin_time,
        end_time: end_time,
        page_num: page_num,
        page_size: page_size,
      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: function (res) {
        console.log(res.data);




      }
    })
  },

  monCho:function(event){
    // console.log(event);
    var that = this;
    var index = event.currentTarget.dataset.index;
    this.setData({
      mon_status:index
    })
  },



  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var myDate = new Date();
    var time_time = myDate.getTime();
    var month_time = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
    this.setData({
      mon_status:month_time
    })
    
    var year_time = myDate.getFullYear();
    month_time += 1;
    // monthShow(month_time);
    console.log('需要的时间：' + month_time);
    var sec_time = time_time / 1000;
    sec_time = parseInt(sec_time);
    if (month_time < 10) {
      month_time = '0' + month_time;
    }
    var begin_time = year_time + '-' + month_time + '-' + '01' + ' ' + '00:00:00';
    begin_time = util.datetime_to_unix(begin_time);
    var end_time = sec_time;

    this.GetRedpacketItemsOfVip(options.vip_id, begin_time, end_time, this.data.page_num, this.data.page_size, app.globalData.token);
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