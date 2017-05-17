// pages/index_feedbacks/index_feedbacks.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  imgUp: function () {
    console.log(1111);
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log('进来');
        var tempFilePaths = res.tempFilePaths;
          console.log(tempFilePaths);
      },
      fail:function(res){
          console.log('失败');
      },
      complete:function(res){
        console.log('干过');
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})