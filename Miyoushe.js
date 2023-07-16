/**************************************
作者:Zoo
日期:2023.07.15
cookie获取:米游社登录手动签到一次即可获取Cookie
[rewrite_local]
https://bbs-api.miyoushe.com/apihub/app/api/signIn url script-request-header https://raw.githubusercontent.com/Crazy-Z7/Task/main/MiyousheCookie.js
[task_local]
40 9 * * * https://raw.githubusercontent.com/Crazy-Z7/Task/main/Miyoushe.js, tag=米游社米游币签到,enabled=true
[MITM]
hostname = bbs-api.miyoushe.com
*****************************************/


const cookieName = '米游社'
const signurlKey = 'photonmang_signurl_miyoushe'
const signheaderKey = 'photonmang_signheader_miyoushe'
const photonmang = init()
const signurlVal = photonmang.getdata(signurlKey)
const signheaderVal = photonmang.getdata(signheaderKey)
sign()  
function sign() {
  const url = { url: `https://bbs-api.miyoushe.com/apihub/app/api/signIn`, headers: JSON.parse(signheaderVal) }
  url.body = `{"gids":5}`
  photonmang.post(url, (error, response, data) => {
   const title = `${cookieName}`
    let subTitle = ''
    const result = JSON.parse(data)
    if (result.retcode == 0) {
      subTitle = `签到成功🎉: 获得${result.data.points}米游币`
    } else {
      subTitle = `签到失败❌:请检查`
    } 
    photonmang.msg(title, subTitle,)
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


