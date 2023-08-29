const url = `https://huashuimoyu.com/mobile/detail/2`;
const method = `GET`;
const headers = {
'Accept' : `text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8`,
'Sec-Fetch-Mode' : `navigate`,
'Connection' : `keep-alive`,
'Accept-Encoding' : `gzip, deflate, br`,
'Host' : `huashuimoyu.com`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1`,
'Sec-Fetch-Site' : `none`,
'Accept-Language' : `zh-CN,zh-Hans;q=0.9`,
'Sec-Fetch-Dest' : `document`
};
const body = ``;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    $notify('摸鱼开始','微博热搜榜','点击此处查看',{"open-url": url});
    $done();
}, reason => {
    console.log(reason.error);
    $done();
});
