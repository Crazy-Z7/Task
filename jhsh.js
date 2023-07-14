/**************************************
作者:Zoo
日期:2023.07.13
cookie获取:建行生活注册登录 获取完关掉Cookie脚本

[rewrite_local]
^https:\/\/yunbusiness\.ccb\.com\/clp_coupon\/txCtrl\?txcode\=A3341A040 url script-request-header https://raw.githubusercontent.com/Crazy-Z7/Task/main/jhshCookie.js

[task_local]
40 8 * * * https://raw.githubusercontent.com/Crazy-Z7/Task/main/jhsh.js, tag=建行生活积分签到,enabled=true
[MITM]
hostname = yunbusiness.ccb.com
*****************************************/


const cookieName = '建行生活'
const signurlKey = 'photonmang_signurl_jhsh'
const signheaderKey = 'photonmang_signheader_jhsh'
const photonmang = init()
const signurlVal = photonmang.getdata(signurlKey)
const signheaderVal = photonmang.getdata(signheaderKey)


sign()  //签到


function sign() {
  const url = { url: `https://yunbusiness.ccb.com/clp_coupon/txCtrl?txcode=A3341A040`, headers: JSON.parse(signheaderVal) }
  url.body = '{"ACT_ID":"20230628070000000001","MEB_ID":"YSM202307130878729","USR_TEL":"15705699953","REGION_CODE":"340200","chnlType":"1","regionCode":"340200"}'
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
