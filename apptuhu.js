/**************************************
作者:Zoo
日期:2023.07.18
cookie获取:打开途虎app登录点击我的页面，获取完记得关闭重写
来自张军的建议:如果出现，您暂时无法签到这个问题,就删除QX和途虎app.重新安装即可解决问题.原因未知.

[rewrite_local]
https://api.tuhu.cn/User/ValidLogin url script-request-header https://raw.githubusercontent.com/Crazy-Z7/Task/main/apptuhuCookie.js

[task_local]
40 8 * * * https://raw.githubusercontent.com/Crazy-Z7/Task/main/apptuhu.js, tag=途虎app积分签到,enabled=true
[MITM]
hostname = api.tuhu.cn
*****************************************/


const cookieName = '途虎app'
const signurlKey = 'photonmang_signurl_tuhuapp'
const signheaderKey = 'photonmang_signheader_tuhuapp'
const photonmang = init()
const signurlVal = photonmang.getdata(signurlKey)
const signheaderVal = photonmang.getdata(signheaderKey)
sign()
function sign() {
  const url = { url: `https://api.tuhu.cn/User/UserCheckInVersion1`, headers: JSON.parse(signheaderVal) }
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
