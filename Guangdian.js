/**************************************
作者:Zoo
日期:2023.07.16
cookie获取:中国广电登录即可获取Cookie
[rewrite_local]
https://www.10099.com.cn/contact-web/api/busi/qryBalanceFee url script-request-header https://raw.githubusercontent.com/Crazy-Z7/Task/main/GuangdianCookie.js
[task_local]
30 7 * * * https://raw.githubusercontent.com/Crazy-Z7/Task/main/Guangdian.js, tag=中国广电套餐查询,enabled=true
[MITM]
hostname = app.10099.com.cn
*****************************************/
const cookieName = '中国广电'
const signurlKey = 'photonmang_signurl_gd'
const signheaderKey = 'photonmang_signheader_gd'
const photonmang = init()
const signurlVal = photonmang.getdata(signurlKey)
const signheaderVal = photonmang.getdata(signheaderKey)
sign()  
function sign() {
  const url = { url: `https://app.10099.com.cn/contact-web/api/busi/qryUserInfo`, headers: JSON.parse(signheaderVal) }
  url.body = ''
  photonmang.post(url, (error, response, data) => {
   const title = `${cookieName}`
    let subTitle = ''
    let detail = ''
    const result = JSON.parse(data)
    if (result.respCode == 000000) {
      subTitle = `查询成功🎉`
      detail += `套餐名称:${result.packName}`
      detail += `话费剩余:${result.fee}元`
      detail += `语音剩余:${result.voice}分钟`
      detail += `流量剩余:${result.flow}`
    } else  {
      subTitle = `查询失败：请重新获取Cookie`
    } 
    photonmang.msg(title, subTitle,detail)
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


