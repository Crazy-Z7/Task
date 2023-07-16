
/**************************************
作者:Zoo
日期:2023.07.12
cookie获取:公众号搜索途虎小程序登录

[rewrite_local]
https://api.tuhu.cn/User/GetInternalCenterInfo url script-request-header https://raw.githubusercontent.com/Crazy-Z7/Task/main/VxtuhuCookie.js

[task_local]
40 8 * * * https://raw.githubusercontent.com/Crazy-Z7/Task/main/Vxtuhu.js, tag=途虎小程序积分签到,enabled=true
[MITM]
hostname = api.tuhu.cn
*****************************************/


const cookieName = '途虎vx'
const signurlKey = 'photonmang_signurl_tuhuvx'
const signheaderKey = 'photonmang_signheader_tuhuvx'
const photonmang = init()
const signurlVal = photonmang.getdata(signurlKey)
const signheaderVal = photonmang.getdata(signheaderKey)
sign() 
function sign() {
  const url = { url: `https://api.tuhu.cn/user/UserCheckInVersion1?channel=wxapp`, headers: JSON.parse(signheaderVal) }
  url.body = `{}`
  photonmang.post(url, (error, response, data) => {
    photonmang.log(`${cookieName}, data: ${data}`)
    const title = `${cookieName}`
    let subTitle = ''
    let detail = ''
    const result = JSON.parse(data)
    if (result.Code == 1) {
      subTitle = `签到结果: 签到成功`
      detail += `积分增加:${result.AddIntegral}`+`\n`
      detail += `已连续签到:${result.NeedDays}`+`/7天`
    } else if (result.Code == 0) {
      subTitle = `签到结果: ${result.Message}`
    } 
    photonmang.msg(title, subTitle, detail)
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

