// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"未登录",
    avatarUrl:"../../images/timg.png",
    taggle:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {            
              //用户已经授权过      
              that.setData({
                //检测授权后隐藏授权按钮
                taggle: false,
                //增加用户头像name
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl,
              })
              //设置页面title
              wx.setNavigationBarTitle({
                title: res.userInfo.nickName,
              })
            }
          });
        }
      },    
    })
  },

  /**
   * 登录函数
   */
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮后需要处理的逻辑方法体
      var that = this;

      //检测授权后隐藏授权按钮
      that.setData({
        taggle: false,
        //增加用户头像name
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl, 
      })
      //设置页面title
      wx.setNavigationBarTitle({
        title: e.detail.userInfo.nickName,
      })

      /*wx.login({
        success: function (res) {
          //获取openId
          wx.cloud.callFunction({
            name: 'login',
            data: {
              appid: "wx7a0f41b316960969",
              secret: "test value 2",
              code: res.code
            },
            success: res => {
              console.log(res)
            }
          })     
        }
      })*/

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，部分功能将无法使用！',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击了“返回授权”')
            
          }
        }
      })
    }
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

  }
})