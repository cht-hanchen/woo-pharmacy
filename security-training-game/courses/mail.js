(function(){
const fig=(imgs,cap)=>"<figure class='fig'><div class='imgs'>"+imgs.map(([s,a])=>"<button class='zoom' type='button'><img src='"+s+"' alt='"+a+"'></button>").join("")+"</div>"+(cap?"<figcaption>"+cap+"</figcaption>":"")+"</figure>";
const pathx=a=>"<div class='path'>"+a.map(x=>"<span>"+x+"</span>").join("<i>▶</i>")+"</div>";
const sc=(n,title,form,desc,steps,imgs)=>"<div class='pane' data-p='"+n+"'><div class='split' style='grid-template-columns:minmax(0,.8fr) minmax(0,1.35fr)'><div class='col'><h4>"+title+"</h4><p style='font-size:.85em;color:var(--muted);font-weight:700'>自檢表名稱："+form+"</p><p>"+desc+"</p>"+steps+"</div>"+fig(imgs,"點圖可放大")+"</div></div>";

window.COURSE={
id:"mail-se",
player:"新進同仁",
c1:"pink",
ranks:[[0,"收件匣新手"],[.2,"會看網域的人"],[.45,"外部郵件偵探"],[.7,"通報小隊長"],[.95,"釣魚剋星"]],
titleScreen:{
  eyebrow:"新北營運處 資通科",
  l1:"電子郵件",l2:"社交工程",
  lede:"在看起來不起眼的動作之下，一個不小心，你的電腦已經被植入了木馬程式、受到駭客監控，對公司產生很大的損失，商業機密即將被公開。",
  playSub:"9 章・約 20 分鐘",
  meta:["新北營運處 資通科","電子郵件社交工程說明"],
  tape:["CAUTION","不明附檔不開啟","不明連結不點選","先確認寄件者"],
  why:"<span class='tag g'>3 不</span><h3 class='g'>社交工程 3 不心法</h3>"+
    "<div class='grid' style='gap:.5rem'>"+
     "<div style='display:flex;gap:.8rem;align-items:center;font-size:1.15rem;font-weight:900'><span class='g' style='background:var(--pink);color:#fff;border-radius:8px;padding:0 .6rem;-webkit-text-stroke:.2em var(--on-ink);paint-order:stroke fill'>不開</span>無關信件</div>"+
     "<div style='display:flex;gap:.8rem;align-items:center;font-size:1.15rem;font-weight:900'><span class='g' style='background:var(--yellow);color:#fff;border-radius:8px;padding:0 .6rem;-webkit-text-stroke:.2em var(--on-ink);paint-order:stroke fill'>不點</span>不明連結及附檔</div>"+
     "<div style='display:flex;gap:.8rem;align-items:center;font-size:1.15rem;font-weight:900'><span class='g' style='background:var(--teal);color:#fff;border-radius:8px;padding:0 .6rem;-webkit-text-stroke:.2em var(--on-ink);paint-order:stroke fill'>不轉</span>不要轉寄</div>"+
    "</div>"+
    "<p class='note'>總公司每年無預警測試 2 次，誤點擊率目標 0%。簡訊、通訊軟體也要小心。</p>"
},

chapters:[
{id:"m1",tag:"01",title:"什麼是電子郵件社交工程",ribbon:"社交工程",ink:"pink",icon:"hook",seed:3,mins:3,
 desc:"拆解一封真實的測試信：假冒寄件者、引人好奇的主旨、惡意附檔與偽裝連結。",
 stages:[
 {t:"目的：引誘你開附檔、點連結",sub:"",html:
  "<p class='lead'>社交工程的主要目的，就是<b>引誘收信人使用郵件的附檔，或點選惡意連結</b>，以便竊取資料。</p>"+
  "<div class='grid c2'>"+
   "<div class='card'><h4>附檔</h4><p>除了執行檔可能是木馬程式，連 <b>Office、圖片相片、音樂檔</b>都可能內含惡意程式。</p><div class='chipz mono'><span>.exe</span><span>.doc</span><span>.xls</span><span>.jpg</span><span>.mp3</span></div></div>"+
   "<div class='card'><h4>連結</h4><p>郵件中的網頁連結，可能連到藏有惡意程式的網頁。使用者在<b>瀏覽網頁的同時就被植入惡意程式</b>，進而被竊取個人資料，或被當成跳板機。</p></div>"+
  "</div>"+
  "<div class='punch'><span class='g'>不明附檔不開啟 不明連結不點選</span></div>"},
 {t:"拆解一封社交工程郵件",sub:"點信上的號碼",html:
  "<div class='split rev' data-md>"+
   "<div class='mail'>"+
    "<div class='row'><span>寄件者</span><span style='display:flex;gap:.5em;align-items:center'><button class='pin' type='button' data-t='1' aria-label='看第 1 點' style='position:static'>1</button>麥當勞優惠 &lt;mcdonalds@gmail.com&gt;</span></div>"+
    "<div class='row'><span>主旨</span><span style='display:flex;gap:.5em;align-items:center'><button class='pin' type='button' data-t='2' aria-label='看第 2 點' style='position:static'>2</button><span><span class='tagx'>[外部郵件]</span>歡慶亞運小戴奪金 麥當勞買一送一</span></span></div>"+
    "<div class='row'><span>附檔</span><span style='display:flex;gap:.5em;align-items:center'><button class='pin' type='button' data-t='3' aria-label='看第 3 點' style='position:static'>3</button>📎 買一送一.doc（2k）</span></div>"+
    "<div class='body'>【歡慶世界球后亞運奪金　麥當勞主餐買一送一】為感謝消費者對戴資穎及活動的支持，消費者凡於麥當勞櫃台出示優惠券，即可享有主餐買一送一的優惠。<br><br><span style='display:inline-flex;gap:.5em;align-items:center'><button class='pin' type='button' data-t='4' aria-label='看第 4 點' style='position:static'>4</button>快來下載優惠券　<span class='lnk'>https://udn.com/</span></span></div>"+
   "</div>"+
   "<div class='col'>"+
    "<div class='pane' data-p='1'><h4>① 假冒寄件者</h4><p>駭客會假造寄件人名字和地址，利用你熟悉的人或品牌，讓你放鬆警覺。這封信掛著「麥當勞」，地址卻是 <b>gmail</b>。</p></div>"+
    "<div class='pane' data-p='2'><h4>② 引人好奇的主旨</h4><p>木馬程式會透過讓人感興趣的主旨與內文傳遞，例如假冒正式公文、親友問候、優惠、健康新知。</p></div>"+
    "<div class='pane' data-p='3'><h4>③ 夾帶惡意附檔</h4><p>附檔不一定是執行檔，<b>Word、Excel、圖片、音樂檔</b>都可能藏有惡意程式。</p></div>"+
    "<div class='pane' data-p='4'><h4>④ 偽裝的連結</h4><p>顯示的網址和實際連到的網址可以不同。點下去，惡意程式就在瀏覽網頁時被植入。</p></div>"+
    "<p class='callout' style='margin-top:auto'>四個號碼都點過一遍。真正的陷阱在<b>附檔與連結</b>。</p>"+
   "</div>"+
  "</div>"},
 {t:"打開之後會發生什麼",sub:"",html:
  "<div class='punch' style='margin-top:0'><span class='g'>開啟惡意附檔或連結，就是幫駭客打開大門</span></div>"+
  "<div class='grid c3'>"+
   "<div class='card'><h4><span class='k'>1</span>竊取機密</h4><p>在使用者完全不知情的狀況下，駭客取得機密資料，傳遞電腦裡面所有的資訊。</p></div>"+
   "<div class='card'><h4><span class='k'>2</span>盜用帳密</h4><p>駭客取得帳號密碼，使用者損失慘重，公司系統也跟著暴露。</p></div>"+
   "<div class='card'><h4><span class='k'>3</span>成為跳板</h4><p>中毒的電腦被當成跳板主機，繼續攻擊公司內部其他電腦。</p></div>"+
  "</div>"}
 ]},

{id:"m2",tag:"02",title:"電子郵件社交工程測試與考核",ribbon:"測試與考核",ink:"yellow",icon:"clipboard",seed:11,mins:1,
 desc:"總公司上、下半年各測一次，誤點擊率目標 0%，納入 BSC 與個人考核。",
 stages:[
 {t:"每年兩次，目標 0%",sub:"測試信會混在平常的信件裡",html:
  "<p class='lead'>為提升資安防護強度，總公司於<b>上、下半年各舉行一次</b>電子郵件社交工程測試。測試信會混在平常的信件裡，看起來就像一般的外部郵件。</p>"+
  "<div class='grid c3'>"+
   "<div class='stat'><span class='v'>2 次</span><span class='l'>每年測試</span><small>總公司上、下半年各舉辦一次</small></div>"+
   "<div class='stat'><span class='v'>0%</span><span class='l'>誤點擊率目標</span><small>一封都不要點</small></div>"+
   "<div class='stat'><span class='v'>BSC</span><span class='l'>納入考核</span><small>營運處 BSC 考評與個人年度考核項目</small></div>"+
  "</div>"+
  "<table class='tbl'><thead><tr><th>電子郵件社交工程演練</th><th>測試頻率</th><th class='c'>營運處 BSC 考評</th><th class='c'>個人年度考核項目</th></tr></thead><tbody><tr><td>總公司</td><td>上、下半年各舉辦一次</td><td class='c'>是</td><td class='c'>是</td></tr></tbody></table>"}
 ]},

{id:"m3",tag:"03",title:"公私分明",ribbon:"公私分明",ink:"teal",icon:"scale",seed:5,mins:2,
 desc:"一個病毒讓台積電停工數天。公務信箱只處理公務。",
 stages:[
 {t:"案例：台積公司電腦病毒感染",sub:"2018 年 8 月",html:
  "<div class='flow v'>"+
   "<div class='fn alert'><span class='no'>!</span><span><b>2018/08/03 傍晚</b><small>台積公司受到電腦病毒感染，影響台灣廠區部分電腦系統及廠房機台，受感染程度因工廠而異。</small></span></div><span class='ar'>▶</span>"+
   "<div class='fn'><span class='no'>2</span><span><b>2018/08/05 下午兩點</b><small>已控制感染範圍並找到解決方案，約 80% 受影響的機台恢復正常。</small></span></div><span class='ar'>▶</span>"+
   "<div class='fn'><span class='no'>3</span><span><b>預計 2018/08/06 前</b><small>所有受影響機台恢復正常。</small></span></div>"+
  "</div>"+
  "<p class='callout bad'>一個病毒就能讓全球最大的晶圓代工廠停工數天。公司內網的每一部電腦都連在一起，<b>任何一部中毒，都可能擴散到整個廠區</b>。</p>"+
  "<p class='src'>資料來源：台灣積體電路製造股份有限公司 2018/08/05 公告〈台積公司公布電腦病毒感染事件影響〉</p>"},
 {t:"公務信箱只處理公務",sub:"",html:
  "<div class='grid c2'>"+
   "<div class='card ok'><h4 style='color:var(--good)'>✓ 應該這樣做</h4><ul><li>公務信箱只用於公務往來</li><li>私人訂閱、購物、抽獎使用私人信箱</li><li>私人郵件不在公務電腦上開啟</li></ul></div>"+
   "<div class='card no'><h4 style='color:var(--bad)'>✕ 不要這樣做</h4><ul><li>用公務信箱註冊購物網站、訂閱電子報</li><li>開啟與業務無關的優惠、健康、旅遊信件</li><li>把公務信件轉寄到私人信箱處理</li></ul></div>"+
  "</div>"+
  "<div class='punch'><span class='g'>主旨與公務無關、寄件者陌生：不開啟，直接刪除</span></div>"}
 ]},

{id:"m4",tag:"04",title:"分辨內部與外部郵件",ribbon:"內外部郵件",ink:"blue",icon:"at",seed:13,mins:3,
 desc:"看 @ 後面的網域和 [外部郵件] 標記，再看歷年測試信長什麼樣子。",
 stages:[
 {t:"看寄件者網域與 [外部郵件] 標記",sub:"顯示名稱可以隨意假造",html:
  "<div class='grid c2'>"+
   "<div class='card ok'><h4>內部郵件</h4><p style='font-family:var(--f-mono);font-size:1.15em;font-weight:600'>someone@<b style='color:var(--good)'>cht.com.tw</b></p><p>公司同仁的信箱網域為 <b>@cht.com.tw</b>。</p></div>"+
   "<div class='card no'><h4>外部郵件</h4><p style='font-size:1.15em;font-weight:700'><span class='tagx'>[外部郵件]</span> 主旨……</p><p>從公司外部寄來的信，主旨前會加上 <b>[外部郵件]</b>。看到這個標記，就要多一分警覺。</p></div>"+
  "</div>"+
  "<p class='callout bad'><b>@msa.hinet.net</b> 雖然有 HiNet 字樣，不是公司同仁信箱；<b>@gmail.com</b> 掛著「麥當勞」「Google」的名字也一樣。<b>請看 @ 後面的網域。</b></p>"},
 {t:"過去測試用過的社交工程郵件",sub:"",html:
  "<div class='inbox'>"+
   [["MedPartner","MedPartner@msa.hinet.net","[外部郵件]","中暑或熱衰竭怎麼辦？降溫處理 8 步驟你一定要學起來","📎 降溫處理_8_步驟.doc"],
    ["華人康健網","Instagram@msa.hinet.net","[外部郵件]","老化真的會變慢？你想不到這「3 種香料」能讓皺紋少了、皮膚更透亮！",""],
    ["麥當勞優惠","mcdonalds@gmail.com","[外部郵件]","歡慶亞運小戴奪金 麥當勞買一送一","📎 買一送一.doc"],
    ["易遊生活網","easylife8787@gmail.com","[外部郵件]","跟大自然星空一起入眠 日本八大人氣旅店報你知",""],
    ["優惠好康","likeswin328@gmail.com","","恭喜 Google 用戶 免費獲得 iPhone X","📎 確認文件.doc"],
    ["輕鬆小品","GoPlay@gmail.com","","親愛的同事！放鬆一下",""]].map(m=>"<div class='it'><span class='f'>"+m[0]+"<small>"+m[1]+"</small></span><span>"+(m[2]?"<span class='tagx'>"+m[2]+"</span>":"")+m[3]+"</span><span class='a'>"+m[4]+"</span></div>").join("")+
  "</div>"+
  "<div class='punch'><span class='g'>共同點：主旨與公務無關、寄件者陌生</span></div>"},
 {t:"總公司 114 年下半年測試信",sub:"越像新聞、越切身，越要小心",html:
  "<div class='inbox'>"+
   [["銀行工會","4 銀行用戶注意！久未往來「額度恐變零」要解除得跑分行"],["台灣頭痛協會","偏頭痛「止痛藥吃到沒效」醫籲每月發作逾 4 天應就醫檢查"],["早安健康報","實測！超慢跑 30 天真實效果揭曉！血糖、睡眠、身體年齡都改變"],["1G5反詐騙平台","【APP 詐騙】下載「一鍵量血壓 APP」，沒料到手機竟中毒"],["全球地理頻道","全球首見！科學家發現「橘色鯊魚」罕見基因突變如錦鯉魚"],["Alsmartmusic","下載限時免費 App「竟遭扣款 6990 元」消保官籲：刪掉還不夠"],["機票比價網","在 Google 怎麼找便宜機票？專家透露「這資料」一定要留白"],["Xinghui","跑進山海美景！杏輝馬拉松開放報名，首推「尊榮禮遇」方案"]].map(m=>"<div class='it' style='grid-template-columns:minmax(0,9em) minmax(0,1fr)'><span class='f'>"+m[0]+"</span><span><span class='tagx'>[外部郵件]</span>"+m[1]+"</span></div>").join("")+
  "</div>"+
  "<p class='callout'>這些信看起來都是生活資訊，甚至是「反詐騙」提醒。測試信刻意模仿你會想點開的內容。<b>看到 [外部郵件]，先確認寄件者，再決定要不要開。</b></p>"}
 ]},

{id:"m5",tag:"05",title:"處理郵件與防護設定",ribbon:"防護設定",ink:"violet",icon:"gear",seed:21,mins:2,
 desc:"收到信的四個判斷步驟，以及郵件軟體該先做好的四項安全設定。",
 stages:[
 {t:"收到信之後",sub:"四個步驟",html:
  "<ol class='steps'>"+
   "<li><span><b>先看寄件者</b><small>確認 @ 後面的網域，主旨有沒有 [外部郵件] 標記。</small></span></li>"+
   "<li><span><b>再看主旨</b><small>是否和你的業務有關？若無相關，建議刪除，不要開啟。</small></span></li>"+
   "<li><span><b>不點非公務網址、不開非公務附檔</b><small>即使內文看起來無害，附檔與連結才是真正的陷阱。</small></span></li>"+
   "<li><span><b>不確定就通報</b><small>交給單位資安幫手確認，不要自己點開測試。</small></span></li>"+
  "</ol>"},
 {t:"電子郵件軟體安全防護措施",sub:"Office 365 Exchange Online：網頁及 Outlook",html:
  "<div class='grid c4'>"+
   "<div class='card'><h4>純文字</h4><p>以純文字模式開啟信件，惡意的 HTML 內容與指令碼不會被執行。</p></div>"+
   "<div class='card'><h4>關預覽</h4><p>取消信件預覽功能，避免「點一下標題」就等於開信。</p></div>"+
   "<div class='card'><h4>擋圖片</h4><p>封鎖外部圖片，避免信件透過圖片回報「你已開信」。</p></div>"+
   "<div class='card'><h4>分流</h4><p>設定過濾郵件機制，外部郵件分流到獨立位置。</p></div>"+
  "</div>"+
  "<table class='tbl'><thead><tr><th>外部郵件分流位置</th><th>手機收外部郵件</th></tr></thead><tbody><tr><td>電子郵件網頁及辦公室電腦</td><td>網頁收信有分流</td></tr></tbody></table>"+
  "<div class='punch'><span class='g'>使用任何電子郵件軟體前，先完成安全設定</span><small>第 09 章教你逐項自檢。</small></div>"}
 ]},

{id:"m6",tag:"06",title:"練習：這封信該怎麼處理？",ribbon:"收件匣練習",ink:"pink",icon:"inbox",seed:9,mins:3,
 desc:"八封信，依寄件者網域、主旨與附檔判斷。全部答對才算過關。",
 stages:[
 {t:"判斷要領",sub:"開始前先記住這三件事",html:
  "<div class='grid c3'>"+
   "<div class='card'><h4><span class='k'>1</span>網域</h4><p>公司同仁是 <b>@cht.com.tw</b>。<b>cht-com-tw.net</b> 這種長得像的，是仿冒網域。</p></div>"+
   "<div class='card'><h4><span class='k'>2</span>主旨</h4><p>和你的業務有關嗎？健康、優惠、中獎、旅遊，甚至「反詐騙」，都不是公務。</p></div>"+
   "<div class='card'><h4><span class='k'>3</span>對象</h4><p>[外部郵件] 不一定可疑：寄件者是你的業務往來對象、主旨對得上，就可以處理。</p></div>"+
  "</div>"+
  "<p class='callout info'>題目中的公司內部郵件為示意範例。</p>"},
 {t:"收件匣練習",sub:"全部答對才能前進",type:"sorter",hint:"這封信可以處理，還是不要開？",
  btns:[{v:"ok",l:"與公務相關，可處理",cls:"ok"},{v:"no",l:"可疑，不開啟",cls:"no"}],
  items:[
   {f:"資通科 <it-notice@cht.com.tw>",n:"本週六凌晨 IRMAS 伺服器例行維護通知",d:"無附檔",a:"ok",why:"寄件者為公司 @cht.com.tw 網域、沒有 [外部郵件] 標記，主旨與公務相關。"},
   {f:"銀行工會 <service@bank-union-tw.com>",n:"[外部郵件] 4 銀行用戶注意！久未往來「額度恐變零」要解除得跑分行",d:"內含連結",a:"no",why:"這是總公司 114 年下半年的測試信。外部郵件、主旨與公務無關。"},
   {f:"優惠好康 <likeswin328@gmail.com>",n:"恭喜 Google 用戶 免費獲得 iPhone X",d:"附檔：確認文件.doc",a:"no",why:"寄件者陌生、以中獎引誘開啟附檔，典型社交工程郵件。"},
   {f:"系統管理員 <mail-admin@cht-com-tw.net>",n:"您的信箱容量已滿，請於 24 小時內點選連結驗證帳號",d:"內含連結",a:"no",why:"網域是 cht-com-tw.net，不是 @cht.com.tw。假冒管理員、製造急迫感、要求點連結，都是常見手法。"},
   {f:"王經理 <wang@abc-tech.com.tw>",n:"[外部郵件] 關於上週報價單第 3 項的修改",d:"你負責的客戶，上週才通過信",a:"ok",why:"外部郵件不一定可疑：寄件者是你的業務往來對象、主旨與業務相關，可以處理。附檔仍要留意是否與往來內容一致。"},
   {f:"早安健康報 <news@morninghealth.com.tw>",n:"[外部郵件] 實測！超慢跑 30 天真實效果揭曉！血糖、睡眠、身體年齡都改變",d:"內含連結",a:"no",why:"總公司測試信之一。健康資訊與公務無關，不開啟、直接刪除。"},
   {f:"人資駐點 <hr-notice@cht.com.tw>",n:"年度教育訓練時數提醒",d:"無附檔",a:"ok",why:"公司內部網域、主旨與工作相關，可以處理。"},
   {f:"1G5反詐騙平台 <alert@1g5-antifraud.com>",n:"[外部郵件]【APP 詐騙】下載「一鍵量血壓 APP」，沒料到手機竟中毒",d:"內含連結",a:"no",why:"就算主題是「反詐騙」，外部寄來、與公務無關的信一樣不要開。這也是總公司的測試信。"}
  ]}
 ]},

{id:"m7",tag:"07",title:"可疑郵件通報方式",ribbon:"通報",ink:"red",icon:"mega",seed:17,mins:1,
 desc:"四步驟通報；已經點了就拔網路線、保留現場。",
 stages:[
 {t:"發現可疑郵件",sub:"不確定就通報，不要自己點開測試",html:
  "<div class='flow'>"+
   "<div class='fn alert'><span class='no'>1</span><b>發現可疑郵件／簡訊</b><small>不點連結、不開附檔、不轉寄給同事</small></div><span class='ar'>▶</span>"+
   "<div class='fn'><span class='no'>2</span><b>通報單位資安幫手</b><small>以電話或 Email 通報，協助確認</small></div><span class='ar'>▶</span>"+
   "<div class='fn'><span class='no'>3</span><b>機構資安專責窗口</b><small>研判是否為惡意郵件</small></div><span class='ar'>▶</span>"+
   "<div class='fn'><span class='no'>4</span><b>CHT SOC</b><small>判定為惡意郵件則通報</small></div>"+
  "</div>"+
  "<p class='callout bad'><b>已經點了連結或開了附檔？</b>立即拔除網路線、保留現場，勿自行刪除或重灌，並通報單位資安幫手。</p>"+
  "<p class='callout info'>單位資安幫手即各單位資訊負責人，名單請見〈新進同仁資安須知〉第三章。</p>"+
  "<div class='punch'><span class='g'>不確定就通報</span></div>"}
 ]},

{id:"m8",tag:"08",title:"建立加密郵件",ribbon:"加密郵件",ink:"teal",icon:"lock",seed:23,mins:1,
 desc:"機密級以上要加密；極機密未經授權不得用郵件寄。",
 stages:[
 {t:"什麼時候要加密",sub:"",html:
  "<div class='grid c3'>"+
   "<div class='card'><h4>機密級以上</h4><p>機密級以上資料傳輸時，應採行<b>具加密機制之電子郵件服務</b>。</p></div>"+
   "<div class='card no'><h4>極機密級</h4><p>未經權責主管授權，<b>不得使用電子郵件傳送</b>。</p></div>"+
   "<div class='card'><h4>寄給外部</h4><p>少量機敏文件需提供給外部時，請使用安全電子郵件，不使用 LINE、Google Drive 等外部服務。</p></div>"+
  "</div>"+
  "<div class='punch'><span class='g'>機密資料要寄，一定加密</span></div>"},
 {t:"取得電子郵件簽章與加密軟體",sub:"",html:
  pathx(["EIP 企業入口網站","資源共享","軟體下載","資安軟體","電子郵件簽章與加密"])+
  "<p class='lead'>安裝後即可在撰寫郵件時加上<b>數位簽章與加密</b>。</p>"+
  "<div class='grid c2'>"+
   "<div class='card'><h4>數位簽章</h4><p>收件人可以確認信件確實由你寄出。</p></div>"+
   "<div class='card'><h4>加密</h4><p>內容在傳送途中不會被他人讀取。</p></div>"+
  "</div>"}
 ]},

{id:"m9",tag:"09",title:"電子郵件社交工程自檢",ribbon:"定期自檢",ink:"yellow",icon:"check",seed:41,mins:7,
 desc:"誤點擊的面談層級、Outlook 的 7 個自檢項目、自檢表怎麼填，以及常見問答。",
 stages:[
 {t:"為什麼要定期自檢",sub:"",html:
  "<div class='grid c3'>"+
   "<div class='stat'><span class='v'>每年 2 次</span><span class='l'>無預警測試</span><small>中華電信資通安全處每年執行 2 次無預警電子郵件警覺性測試。</small></div>"+
   "<div class='stat'><span class='v'>&lt; 1%</span><span class='l'>全區目標</span><small>測試信的點閱率與開啟連結率都要低於 1%。</small></div>"+
   "<div class='stat'><span class='v'>累計面談</span><span class='l'>違規管理</span><small>依〈新北營運處個人終端違規管理辦法〉，社交工程誤點擊依年度累計次數面談。</small></div>"+
  "</div>"+
  "<p class='lead'>測試信混在一般信件裡，靠眼睛判斷難免失手。先把 Outlook 設定好：外部郵件分開放、點標題不會自動開信、圖片不會自動下載、內容以純文字顯示。就算不小心點到，也比較不會中招。<b>自檢就是確認這些設定都還在。</b></p>"},
 {t:"誤點擊的面談層級",sub:"累積次數依年度分開計算",html:
  "<div class='flow'>"+
   "<div class='fn'><span class='no'>1</span><b>第 1 次違反</b><small>科長（主任）面談</small></div><span class='ar'>▶</span>"+
   "<div class='fn'><span class='no'>2</span><b>第 2 次違反</b><small>副總經理面談</small></div><span class='ar'>▶</span>"+
   "<div class='fn alert'><span class='no'>3</span><b>第 3 次違反</b><small>總經理面談</small></div>"+
  "</div>"+
  "<p class='callout'>權責主管接獲事件單通知或社交工程誤點擊名單後，需通知當事人進行面談並填寫面談紀錄表，轉送資通科製作月報表追蹤。</p>"},
 {t:"開啟 Outlook 的 3 種方式",sub:"",html:
  "<table class='tbl'><thead><tr><th style='width:20%'>方式</th><th>優點</th><th>缺點</th></tr></thead><tbody>"+
   "<tr><td><b>桌面版 Outlook</b></td><td>傳統模式能以純文字格式檢視，<b>較安全</b></td><td>新版模式相當於使用網頁版 Outlook，不安全</td></tr>"+
   "<tr><td><b>手機版 Outlook App</b></td><td>在手機安裝 App，登入後即可隨時隨地檢閱郵件</td><td>不能以純文字格式檢視；點選信件就會開啟（沒辦法改掉）；開啟 [外部郵件] 時不建議使用</td></tr>"+
   "<tr><td><b>網頁版 Outlook</b></td><td>在瀏覽器登入後即可隨時隨地檢閱郵件</td><td>不能以純文字格式檢視；左鍵點選信件 1 下就會開啟（沒辦法改掉）；開啟 [外部郵件] 時不建議使用</td></tr>"+
  "</tbody></table>"+
  "<div class='punch'><span class='g'>開啟 [外部郵件]，請用桌面版 Outlook 傳統模式</span></div>"},
 {t:"7 個自檢項目",sub:"點左邊的項次，圖片可放大",html:
  "<div class='md' data-md style='grid-template-columns:minmax(9em,.3fr) minmax(0,1fr)'>"+
   "<div class='tabs' role='tablist' aria-label='自檢項目'>"+
    "<button class='tab' role='tab' type='button' data-t='1'><span class='n'>1</span>桌面：[外部郵件] 分流</button>"+
    "<button class='tab' role='tab' type='button' data-t='2'><span class='n'>2</span>桌面：關閉訊息預覽</button>"+
    "<button class='tab' role='tab' type='button' data-t='3'><span class='n'>3</span>桌面：封鎖外部圖片</button>"+
    "<button class='tab' role='tab' type='button' data-t='4'><span class='n'>4</span>桌面：純文字檢視</button>"+
    "<button class='tab' role='tab' type='button' data-t='5'><span class='n'>5</span>手機：封鎖外部影像</button>"+
    "<button class='tab' role='tab' type='button' data-t='6'><span class='n'>6</span>網頁：[外部郵件] 分流</button>"+
    "<button class='tab' role='tab' type='button' data-t='7'><span class='n'>7</span>網頁：讀取窗格</button>"+
   "</div>"+
   sc(1,"[外部郵件] 分流","非 CHT 郵件分流","用 Outlook 的規則，把所有非中華郵件集中放在 [外部郵件] 資料夾。",
     "<ol class='steps compact'><li>常用 → 規則 → 建立規則</li><li>勾選「主旨包含」，輸入「外部郵件」</li><li>勾選「移動項目至資料夾」→ 選取資料夾</li><li>在收件匣下新增 [外部郵件] 資料夾 → 確定</li><li>再檢查一次規則內容 → 確定</li></ol>",
     [["@@ol-08.jpg@@","Outlook 建立規則"],["@@ol-09.jpg@@","設定主旨包含外部郵件"],["@@ol-10.jpg@@","移動到外部郵件資料夾"]])+
   sc(2,"關閉訊息預覽","關閉郵件預覽（讀取窗格反白）","關閉後，在郵件清單上點一下標題不會直接把信打開。",pathx(["檢視","目前檢視","訊息預覽","關閉"]),[["@@ol-11.jpg@@","關閉訊息預覽"]])+
   sc(3,"封鎖外部圖片","封鎖外部圖片","信件中的圖片可以回報「你已開信」，也可能被用來確認你的信箱有效。不自動下載就不會被追蹤。",pathx(["檔案","選項","信任中心","信任中心設定","自動下載"])+"<p style='font-weight:700'>勾選「不要自動下載圖片」</p>",[["@@ol-12.jpg@@","信任中心設定"],["@@ol-13.jpg@@","不要自動下載圖片"]])+
   sc(4,"以純文字格式檢視","以純文字格式檢視","以純文字開信，HTML 內容與惡意指令碼不會被執行，連結也會顯示成真正的網址。",pathx(["檔案","選項","信任中心","信任中心設定","電子郵件安全性"])+"<p style='font-weight:700'>勾選「以純文字讀取所有標準郵件」</p>",[["@@ol-14.jpg@@","電子郵件安全性"],["@@ol-15.jpg@@","以純文字讀取所有標準郵件"]])+
   sc(5,"封鎖外部影像","封鎖外部影像","請至 Google Play 或 App Store 下載微軟官方「Microsoft Outlook」App，公司已強制使用（手機內建郵件 App 會無法登入）。登入後再開啟封鎖外部影像。",pathx(["Outlook App","帳號圖像","設定","帳戶","封鎖外部影像"]),[["@@ol-18.jpg@@","Outlook App 設定"],["@@ol-17.jpg@@","封鎖外部影像"]])+
   sc(6,"[外部郵件] 分流（網頁版）","[外部郵件] 分流","桌面版設定好的 [外部郵件] 規則會同步到網頁版，只要確認規則有啟用（開關反藍）。",pathx(["設定（齒輪）","郵件","規則"]),[["@@ol-20.jpg@@","網頁版規則已啟用"]])+
   sc(7,"隱藏讀取窗格，移動或刪除後返回清單","(1) 讀取窗格設為「填滿螢幕」(2) 移動或刪除正在檢視的項目時，會返回郵件清單","網頁版預設在移動或刪除信件後，會直接開啟下一封。如果下一封剛好是測試信，就會被算入點閱率。",
     "<ol class='steps compact'><li>檢視 → 調整檢視設定 → 版面配置 → 讀取窗格：勾選「填滿螢幕」</li><li>版面配置 → 移動或刪除正在檢視的項目時：勾選「返回郵件清單」</li></ol>",[["@@ol-21.jpg@@","讀取窗格填滿螢幕"],["@@ol-22.jpg@@","返回郵件清單"]])+
  "</div>"},
 {t:"填寫電子郵件社交工程自檢表",sub:"依單位通知時程繳交",html:
  "<div class='split'><ol class='steps'>"+
   "<li><span><b>填寫基本資料</b><small>員工姓名、檢查日期、LDAP 帳號、單位。</small></span></li>"+
   "<li><span><b>逐項確認設定</b><small>7 個項次依序檢查，在自檢結果勾選「有」或「無」。</small></span></li>"+
   "<li><span><b>每個項次附一張截圖</b><small>設定畫面與必含資訊必須在同一張截圖內，不能分開截。</small></span></li>"+
   "<li><span><b>依單位通知時程繳交</b><small>檔名依通知格式填寫（例如：電子郵件社交工程自檢表＿單位－姓名）。</small></span></li>"+
  "</ol>"+fig([["@@selfcheck-sample.jpg@@","項次 1 截圖範例"]],"項次 1 截圖範例：綠框為 Outlook 帳號與 IRMAS 視窗（含版本號），紅框為設定狀態")+"</div>"},
 {t:"截圖必須出現的資訊",sub:"依〈電子郵件社交工程自檢表〉範例整理",html:
  "<table class='tbl'><thead><tr><th>項次</th><th>自檢項目</th><th class='c'>IRMAS 視窗<br>（含最新版本號）</th><th class='c'>Outlook<br>郵件帳號</th><th class='c'>郵件<br>顯示日期</th><th class='c'>設定狀態</th></tr></thead><tbody>"+
   [["1","桌面版：非 CHT 郵件分流",1,1,0,1],["2","桌面版：關閉郵件預覽",1,1,1,1],["3","桌面版：封鎖外部圖片",1,1,1,1],["4","桌面版：以純文字格式檢視",1,1,1,1],["5","手機版：封鎖外部影像",0,1,0,1],["6","網頁版：[外部郵件] 分流",0,1,0,1],["7","網頁版：讀取窗格、返回郵件清單",0,1,0,1]].map(r=>"<tr><td class='c'><b>"+r[0]+"</b></td><td>"+r[1]+"</td>"+r.slice(2).map(v=>"<td class='c'><span class='dot'>"+(v?"●":"")+"</span></td>").join("")+"</tr>").join("")+
  "</tbody></table>"+
  "<p class='src'>● 為該項次截圖必須出現的資訊。</p>"},
 {t:"我的自檢清單",sub:"勾選紀錄只存在你的瀏覽器",html:
  "<div style='display:flex;justify-content:space-between;align-items:center;gap:1em'><p style='font-weight:700'>在自己的電腦與手機上逐項確認後打勾。</p><span style='display:flex;gap:.6em;align-items:center'><b class='g' data-chkn='mailself' style='color:var(--c)'></b><button class='mini' type='button' data-chkclear='mailself'>清除勾選，準備下次自檢</button></span></div>"+
  "<ul class='chk' data-chk='mailself'>"+
   [["桌面版：[外部郵件] 分流規則已建立","常用 → 規則 → 管理規則及通知"],["桌面版：訊息預覽已關閉","檢視 → 目前檢視 → 訊息預覽"],["桌面版：不自動下載圖片","信任中心 → 自動下載"],["桌面版：以純文字讀取所有標準郵件","信任中心 → 電子郵件安全性"],["手機版：封鎖外部影像已開啟","Outlook App → 設定 → 帳戶"],["網頁版：[外部郵件] 規則已啟用","設定 → 郵件 → 規則"],["網頁版：讀取窗格填滿螢幕、移動或刪除後返回郵件清單","檢視 → 調整檢視設定 → 版面配置"]].map((x,i)=>"<li><label><input type='checkbox'><span>"+(i+1)+". "+x[0]+"<small>"+x[1]+"</small></span></label></li>").join("")+
  "</ul>"+
  "<div class='punch'><span class='g'>不開・不點・不轉</span><small>社交工程 3 不心法。簡訊、通訊軟體也要小心。</small></div>"},
 {t:"常見問答",sub:"點左邊的問題",html:
  "<div class='md' data-md>"+
   "<div class='tabs' role='tablist' aria-label='問題'>"+
    "<button class='tab' role='tab' type='button' data-t='1'><span class='n'>1</span>[外部郵件] 都不能開嗎？</button>"+
    "<button class='tab' role='tab' type='button' data-t='2'><span class='n'>2</span>顯示長官名字就安全？</button>"+
    "<button class='tab' role='tab' type='button' data-t='3'><span class='n'>3</span>只點開信件會有事嗎？</button>"+
    "<button class='tab' role='tab' type='button' data-t='4'><span class='n'>4</span>不小心點了測試信？</button>"+
    "<button class='tab' role='tab' type='button' data-t='5'><span class='n'>5</span>可以轉寄給同事問嗎？</button>"+
   "</div>"+
   "<div class='pane' data-p='1'><h4>主旨有 [外部郵件] 的信都不能開嗎？</h4><p>不是。客戶、廠商寄來的公務信也會標示 [外部郵件]。重點是確認寄件者是否為你認識的業務往來對象、主旨是否和你的業務有關；兩者都對得上才處理，否則刪除或通報。</p></div>"+
   "<div class='pane' data-p='2'><h4>寄件者顯示公司同仁或長官的名字，就安全嗎？</h4><p>不一定。顯示名稱可以隨意假造，請看 @ 後面的網域是否為 @cht.com.tw。內容不尋常（例如要求緊急匯款、提供密碼、點連結驗證帳號）時，請另外以電話向本人確認。</p></div>"+
   "<div class='pane' data-p='3'><h4>只是點開信件、沒點附檔，會有事嗎？</h4><p>有開啟郵件預覽或顯示外部圖片時，開信本身就可能被追蹤。請依第五章完成關閉預覽、封鎖外部圖片、以純文字檢視等設定。若已點了連結或附檔，請立即拔除網路線並通報。</p></div>"+
   "<div class='pane' data-p='4'><h4>不小心點了社交工程測試信怎麼辦？</h4><p>誤點擊會被計入營運處 BSC 考評與個人考核。點了之後不要自行處理，請通報單位資安幫手，並檢查電腦是否有異常。</p></div>"+
   "<div class='pane' data-p='5'><h4>可疑郵件可以轉寄給同事問問看嗎？</h4><p>不要。轉寄會讓更多人收到惡意附檔或連結。請直接通報單位資安幫手，由他協助確認。</p></div>"+
  "</div>"}
 ]}
],

boss:{
  name:"釣魚王",
  desc:"15 題社交工程測驗。答對 12 題，讓釣魚王空手而回。",
  win:"釣魚王釣不到你了。你已完成電子郵件社交工程說明。",
  art:"<g stroke='#16152B' stroke-width='6' stroke-linejoin='round' stroke-linecap='round'>"+
   "<path d='M96 54C98 22 138 8 160 30' fill='none'/>"+
   "<rect x='144' y='28' width='42' height='30' rx='4' fill='#FFC93C'/><path d='M146 31l19 14 19-14' fill='none' stroke-width='4'/>"+
   "<path d='M34 112L8 82l4 60z' fill='#6C5CFF'/>"+
   "<path d='M88 160q-10 22 14 26q4-14 10-22' fill='#6C5CFF'/>"+
   "<path d='M32 110C36 62 82 44 118 52c42 10 66 44 62 74-4 34-44 50-84 46-40-4-66-22-64-62z' fill='#6C5CFF'/>"+
   "<path d='M50 104q6-26 32-38' fill='none' stroke='#fff' stroke-opacity='.4' stroke-width='7'/>"+
   "<path d='M120 112c20 4 48 6 60 8-4 26-30 40-56 30-8-10-8-26-4-38z' fill='#16152B'/>"+
   "<path d='M130 116l6 10 6-9 6 9 6-9 6 9 6-8M134 150l5-9 6 8 6-9 6 8' fill='#fff' stroke-width='3'/>"+
   "<circle cx='102' cy='86' r='17' fill='#fff'/><circle cx='106' cy='88' r='7' fill='#16152B' stroke='none'/>"+
   "<path d='M86 66l30 10' fill='none' stroke-width='7'/>"+
  "</g>",
  Q:[
  {q:"電子郵件社交工程的主要目的是什麼？",o:["推銷商品","引誘收信人開啟附檔或點選惡意連結，以竊取資料","測試信箱容量","寄送電子報"],a:1,e:"社交工程就是引誘收信人使用郵件附檔或點選惡意連結，以便竊取資料。"},
  {q:"下列哪一種附檔可能內含惡意程式？",o:["只有 .exe 執行檔","只有壓縮檔","Office 文件、圖片相片、音樂檔也都有可能","純文字信件不會有附檔，所以都安全"],a:2,e:"除了執行檔，連 Office、圖片相片、音樂檔都可能內含惡意程式。"},
  {q:"總公司的電子郵件社交工程測試多久舉辦一次？",o:["每月一次","每季一次","上、下半年各一次","不定期，無固定頻率"],a:2,e:"總公司於上、下半年各舉行一次電子郵件社交工程測試。"},
  {q:"電子郵件社交工程演練的誤點擊率目標是多少？",o:["0%","5%","10%","低於去年即可"],a:0,e:"誤點擊率目標為 0%。"},
  {q:"社交工程演練結果會納入哪些考核？",o:["不列入任何考核","只列入營運處 BSC 考評","營運處 BSC 考評與個人年度考核項目","只列入個人考核"],a:2,e:"兩者都有：營運處 BSC 考評與個人年度考核項目。"},
  {q:"下列哪一個寄件者網域是公司同仁的信箱？",o:["@msa.hinet.net","@cht.com.tw","@gmail.com","@cht-com-tw.net"],a:1,e:"公司同仁信箱網域為 @cht.com.tw。msa.hinet.net 雖有 HiNet 字樣也不是公司信箱；cht-com-tw.net 是仿冒網域。"},
  {q:"主旨前出現 [外部郵件]，代表什麼？",o:["這封信一定是病毒","這封信來自公司外部，要多一分警覺","這是總公司的公告","這封信已經過掃毒，可以放心開"],a:1,e:"[外部郵件] 代表信件從公司外部寄來。不一定是惡意郵件，但要先確認寄件者與主旨。"},
  {q:"收到主旨與業務無關、寄件者陌生的信，應該怎麼做？",o:["點開看看內容再決定","轉寄給同事問問看","刪除，不要開啟","回信詢問對方是誰"],a:2,e:"確認信的主旨是否和你的業務相關，若無相關，建議刪除，不要開啟。"},
  {q:"下列哪一項「不是」建議的電子郵件安全設定？",o:["以純文字格式檢視","封鎖外部圖片","開啟郵件自動預覽","設定外部郵件分流規則"],a:2,e:"應該「關閉」郵件預覽，避免點一下標題就等於開信。"},
  {q:"不小心開了可疑附檔，第一步應該？",o:["馬上重灌電腦","刪除附檔就好","拔除網路線、保留現場，通報單位資安幫手","當作沒發生"],a:2,e:"拔除網路線並保留現場，勿自行刪除或重灌，再通報單位資安幫手。"},
  {q:"極機密級資料可以用電子郵件寄送嗎？",o:["可以，只要加密","未經權責主管授權，不得使用電子郵件傳送","可以，寄給同事就沒關係","可以，用私人信箱寄"],a:1,e:"極機密級資料未經權責主管授權，不得使用電子郵件傳送；機密級以上傳輸時應使用具加密機制之電子郵件。"},
  {q:"開啟 [外部郵件] 時，建議使用哪一種方式？",o:["手機版 Outlook App","網頁版 Outlook","桌面版 Outlook 傳統模式","桌面版 Outlook 新版模式"],a:2,e:"桌面版 Outlook 傳統模式能以純文字格式檢視，較安全；新版模式相當於網頁版，手機版與網頁版點選信件就會開啟。"},
  {q:"網頁版 Outlook 為什麼要設定「移動或刪除正在檢視的項目時，返回郵件清單」？",o:["讓信箱比較整齊","預設會直接開啟下一封，若是測試信就會算入點閱率","可以節省網路流量","刪除的信才能救回"],a:1,e:"預設會直接開啟下一個項目，若下一封是社交工程郵件，就會直接算入點閱率。"},
  {q:"填寫自檢表時，桌面版項次的截圖要包含什麼？",o:["只要設定畫面即可","設定畫面與 IRMAS 視窗（含最新版本號）、Outlook 郵件帳號在同一張截圖內","IRMAS 和 Outlook 分開截兩張圖","只要拍照手機畫面"],a:1,e:"IRMAS 視窗、Outlook 郵件帳號與設定狀態均須在同一截圖內；項次 2–4 還要包含郵件顯示的日期。"},
  {q:"懷疑收到社交工程郵件，可以轉寄給同事確認嗎？",o:["可以，多一個人判斷比較準","不要，直接通報單位資安幫手","可以，但要先刪除附檔","轉寄到私人信箱再開"],a:1,e:"轉寄會讓更多人收到惡意附檔或連結，請直接通報單位資安幫手。"}
  ]
}
};
})();
