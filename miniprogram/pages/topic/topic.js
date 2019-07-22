// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**maximg**/
    maximg:[],
    datainfo:{},

    /**小圆点默认index**/
    swiperCurrent: 0,
    /**详情图片toggle**/
    picdetailshow:false,
    /**listdata**/
    jptjlist:[],
    /**淘宝令taggle-data**/
    layuilayertaggle: false,
    tklval:"",
    buybtncopy:false,
  },

   /**
   *自定义maximg底部圆点样式
   */
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  /**
   *查看图文详情
   */
  picdetailbtn:function(){
    let that = this;
    that.setData({
      picdetailshow: !that.data.picdetailshow,
    })
  },

  /**
   *淘宝令taggle-click
  */
  layuilayershade:function(){
    let that = this;
    that.setData({
      layuilayertaggle:!that.data.layuilayertaggle,
    })
  },

  /**
   * 淘宝令copytext
   */
  copytext:function(e){
    let that = this;
    wx.setClipboardData({
      data:that.data.tklval,
      success: function (res) {
        that.setData({
          buybtncopy:true
        })
      }
    });
  },

  list_itemId_click: function (e) {
    var itemIdval = e.currentTarget.dataset.itemid;
    wx.redirectTo({ url: "/pages/topic/topic?itemIdval=" + itemIdval + "" })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    /**
     * 获取infotdata
     */
    wx.request({
      url: 'http://www.mapprouter.com/api/search/coupon_item?itemId='+options.itemIdval+'&pid=null',
      method: 'get',
      success: function (res) {
        if (res.data.data !== null && res.data.data!==""){
        /**
        * data title /clickUrl
        */
        var delHtmlTagval = res.data.data.title;
        var delHtmllinkval = res.data.data.shareUrl;
        var delHtmlidval = res.data.data.itemId;

        /**
         * 获取max大图数据
         */
        var maximgarr = new Array;
        maximgarr.push({ 'image': '' + res.data.data.pictUrl + '' });
        that.setData({
          maximg: maximgarr
        })

        /**
         * info数据
         */
        that.setData({
          datainfo: res.data
        })

        /*
        * 获取精品推荐getdata
        */
        wx.request({
          url: 'http://www.mapprouter.com/api/search/coupon_item_list?q=' + delHtmlTagval.substring(0, 4) + '&pid=null&pageNum=1&pageSize=15',
          method: 'get',
          success: function (res) {
            var resdatadata = res.data.data;
            resdatadata.shift();
            that.setData({
              jptjlist: resdatadata
            })
          }
        })

        /*
        * 淘口令api
        */
        wx.request({
          url: 'http://m.zhnjw.com/?g=m&m=item&a=tkl&id=null&iid='+delHtmlidval+'',
          method: 'get',
          success: function (res) {
            that.setData({
              tklval: res.data.tkl
            })
          }
        })

      }else{
        wx.showModal({
          title: '提示',
          content: '这个优惠券已经失效！确认返回上一层页面',
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack()
            } else {
              wx.navigateBack()
            }
          }
        })
      }
      }
    })


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