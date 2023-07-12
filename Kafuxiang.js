/**************************************
作者:Zoo
日期:2023.07.12
cookie获取:公众号搜索卡夫享氏新厨艺，右下角 参谋福利，点击会员中心注册，获取成功即可注释cookie获取脚本 积分可兑换爱奇艺 腾讯视频会员 手机话费

注意!!!:Cookie有效期7天，7天之后需要重新获取Cookie

[rewrite_local]
https://fscrm.kraftheinz.net.cn/crm/public/index.php/api/v1/getUserInfo url script-request-header https://raw.githubusercontent.com/Crazy-Z7/Task/main/KafuxiangCookie.js

[task_local]
30 8 * * * https://raw.githubusercontent.com/Crazy-Z7/Task/main/Kafuxiang.js, tag=卡夫享积分签到,enabled=true
[MITM]
hostname = fscrm.kraftheinz.net.cn
*****************************************/










const cookieName='卡夫享'const signurlKey='photonmang_signurl_kfx'const signheaderKey='photonmang_signheader_kfx'const photonmang=init()const signurlVal=photonmang.getdata(signurlKey)const signheaderVal=photonmang.getdata(signheaderKey)function sign(){const url={url:`https:url.body='{}'photonmang.post(url,(error,response,data)=>{photonmang.log(`${cookieName},data:${data}`)const title=`${cookieName}`let subTitle=''const result=JSON.parse(data)if(result.Code==1){subTitle=`签到结果:签到成功`}else if(result.Code==0){subTitle=`签到结果:${result.Message}`}photonmang.msg(title,subTitle)photonmang.done()})}function init(){isSurge=()=>{return undefined===this.$httpClient?false:true}isQuanX=()=>{return undefined===this.$task?false:true}getdata=(key)=>{if(isSurge())return $persistentStore.read(key)if(isQuanX())return $prefs.valueForKey(key)}setdata=(key,val)=>{if(isSurge())return $persistentStore.write(key,val)if(isQuanX())return $prefs.setValueForKey(key,val)}msg=(title,subtitle,body)=>{if(isSurge())$notification.post(title,subtitle,body)if(isQuanX())$notify(title,subtitle,body)}log=(message)=>console.log(message)get=(url,cb)=>{if(isSurge()){$httpClient.get(url,cb)}if(isQuanX()){url.method='GET'$task.fetch(url).then((resp)=>cb(null,{},resp.body))}}post=(url,cb)=>{if(isSurge()){$httpClient.post(url,cb)}if(isQuanX()){url.method='POST'$task.fetch(url).then((resp)=>cb(null,{},resp.body))}}done=(value={})=>{$done(value)}return{isSurge,isQuanX,msg,log,getdata,setdata,get,post,done}}



