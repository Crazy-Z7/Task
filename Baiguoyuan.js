/**************************************
作者:Zoo
日期:2023.07.17
cookie获取:百果园登录即可获取Cookie
[rewrite_local]
https://eshop-api-customer.eshop.prod.pagoda.com.cn/api/v1/customer/info/.+ url script-request-header https://raw.githubusercontent.com/Crazy-Z7/Task/main/BaiguoyuanCookie.js
[task_local]
45 9 * * * https://raw.githubusercontent.com/Crazy-Z7/Task/main/Baiguoyuan.js, tag=百果园积分签到,enabled=true
[MITM]
hostname = eshop-api-customer.eshop.prod.pagoda.com.cn
*****************************************/
const cookieName = '百果园'
const signurlKey = 'photonmang_signurl_baiguoyuan'
const signheaderKey = 'photonmang_signheader_baiguoyuan'
const photonmang = init()
const signurlVal = photonmang.getdata(signurlKey)
const signheaderVal = photonmang.getdata(signheaderKey)
sign()  
function sign() {
  const url = { url: `https://h5-api.pagoda.com.cn/api/signIn/sign`, headers: JSON.parse(signheaderVal) }
  url.body = `{}`
  photonmang.post(url, (error, response, data) => {
   const title = `${cookieName}`
    let subTitle = ''
    const result = JSON.parse(data)
    if (result.code == 0) {
      subTitle = `签到成功🎉: 获得${result.data.integral}积分`
    } else  {
      subTitle = `签到失败❌: ${result.mag}`
    } 
    photonmang.msg(title, subTitle)
    photonmang.done()
  })
}
function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}


