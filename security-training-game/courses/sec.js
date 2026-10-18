window.COURSE={
id:"sec-newhire",
player:"新進同仁",
c1:"red",
ranks:[[0,"報到新人"],[.2,"資安見習生"],[.45,"藍燈守門員"],[.7,"通報小隊長"],[.95,"資安達人"]],
titleScreen:{
  eyebrow:"新北營運處 資通科 新進同仁資訊安全規定宣導",
  l1:"資通安全",l2:"人人有責",
  lede:"新進同仁應遵守的資訊安全規定，共六章。每一關一個畫面，讀完、練習、打倒魔王。",
  playSub:"6 章 + 終章・約 15 分鐘",
  meta:["原簡報 2025/12/22","主講：資通科 徐偉展"],
  tape:["CAUTION","資安 人人有責","IRMAS 保持藍燈","先通報 再處理"],
  why:"<span class='tag g'>WHY</span><h3 class='g'>我們是駭客組織覬覦的重點目標。</h3>"+
    "<ul><li>公司屬於《資通安全管理法》中「關鍵基礎設施」的<b>通訊類</b>，行政院定期檢視。</li><li>公司能安然度過勒索軟體的攻擊，靠的是每位同仁落實資安政策並自律（例如：禁用網路芳鄰）。</li></ul>"+
    "<div class='hexes' aria-label='關鍵基礎設施八大類'><span>水資源</span><span class='on'>通訊傳播</span><span>交通</span><span>銀行與金融</span><span>緊急救援與醫院</span><span>高科技園區</span><span>重要政府機關</span><span>能源</span></div>"+
    "<p class='note'>遵守公司資安政策，既是保護公司的資產，也是保護國家的基礎設施。</p>"
},

chapters:[
/* ---------------- CH.01 ---------------- */
{id:"ch1",tag:"CH.01",title:"個人終端設備資安防護",ribbon:"終端防護",ink:"pink",icon:"shield",seed:3,mins:5,
 desc:"六項防護措施、IRMAS 藍燈、場域，以及公司嚴禁安裝的軟體。",
 stages:[
 {t:"六項防護措施（上）",sub:"每部個人終端設備均須落實",html:
  "<p class='lead'>謹慎處理陌生人的郵件、即時更新軟體、遵守公司資安政策、不瀏覽非公務網站、不安裝非業務所需軟體，並安裝 <b>IRMAS</b> 與防毒軟體。</p>"+
  "<div class='grid c3'>"+
   "<div class='card'><h4><span class='k'>01</span>安裝 IRMAS</h4><ul><li>確保符合安控規範</li><li>安全查核：<b>藍燈</b></li><li>弱點管理：<b>藍燈</b>（無須修補漏洞）</li></ul></div>"+
   "<div class='card'><h4><span class='k'>02</span>即時更新修補程式</h4><ul><li>安裝公司統一規定之作業系統（Windows 11）</li><li>IRMAS 自動查核修補程式</li><li>弱點管理亮紅燈 = 有未修補程式，請儘快更新</li></ul></div>"+
   "<div class='card'><h4><span class='k'>03</span>病毒防護</h4><ul><li>安裝防毒軟體並啟動自動更新病毒碼</li><li>定期完整掃瞄，至少每月一次</li><li>病毒碼未自動更新？點桌面右下角防毒圖示 →「立即更新」</li></ul></div>"+
  "</div>"},
 {t:"六項防護措施（下）",sub:"每部個人終端設備均須落實",html:
  "<div class='grid c3'>"+
   "<div class='card'><h4><span class='k'>04</span>帳密的防護</h4><ul><li>最小長度不小於 8 個字元</li><li>大小寫文字、數字、符號混合</li><li>取得設備後立即更改預設帳密</li><li>定期（3 個月）更改，三代不得重複</li></ul></div>"+
   "<div class='card'><h4><span class='k'>05</span>啟動防火牆</h4><ul><li>務必啟動本機防火牆</li><li>關閉網路芳鄰（TCP 445）</li><li>關閉遠端桌面</li><li>不啟用 VNC 軟體</li></ul></div>"+
   "<div class='card'><h4><span class='k'>06</span>不裝非必要的軟體、元件</h4><ul><li>不安裝非業務需要的軟體（如 Google Drive、LINE）</li><li>網站要求下載非業務需要的元件（如 WebATM Plug-in），請拒絕安裝</li></ul></div>"+
  "</div>"+
  "<div class='punch'><span class='g'>IRMAS 保持藍燈</span><small>六項都做到，兩個燈號才會是藍的。</small></div>"},
 {t:"IRMAS 介面與燈號",sub:"依 IRMAS 3.9.3 畫面重繪，可以操作",type:"irmas",html:
  "<p class='lead' style='font-size:.95em'>每部個人終端設備都要安裝 IRMAS，查核是否符合資安規範；違反規範會以 Email 通知管理者處理。左邊是重繪的介面，右邊模擬常見的違規情境。</p>"+
  "<div class='irw'><div id='irHost' style='min-height:0;display:flex'></div><div class='sim' id='irSim'></div></div>"+
  "<p class='src'>查核項目與修正方式：IRMAS 網站下載專區〈IRMAS_安全查核項目說明及修正文件〉 irmas.cht.com.tw</p>"},
 {t:"IRMAS 實際畫面",sub:"安裝後依序確認這六個畫面，點圖可放大",html:
  "<div class='md' data-md>"+
   "<div class='tabs' role='tablist' aria-label='六個畫面'>"+
    "<button class='tab' role='tab' type='button' data-t='1'><span class='n'>1</span>安全查核</button>"+
    "<button class='tab' role='tab' type='button' data-t='2'><span class='n'>2</span>弱點管理</button>"+
    "<button class='tab' role='tab' type='button' data-t='3'><span class='n'>3</span>系統資訊</button>"+
    "<button class='tab' role='tab' type='button' data-t='4'><span class='n'>4</span>IRMAS 網站</button>"+
    "<button class='tab' role='tab' type='button' data-t='5'><span class='n'>5</span>病毒碼過期</button>"+
    "<button class='tab' role='tab' type='button' data-t='6'><span class='n'>6</span>資料同步更新</button>"+
   "</div>"+
   "<div class='pane' data-p='1'><h4>安全查核：確認無需要修正項目</h4><p>開啟本機 IRMAS，點選「安全查核」，狀態須為藍燈並顯示「您目前沒有安全查核項目需要修正」。</p><figure class='fig'><div class='imgs'><button class='zoom' type='button'><img src='@@irmas-sec.png@@' alt='IRMAS 安全查核畫面'></button></div><figcaption>資料來源：IRMAS 安裝後即時檢查步驟</figcaption></figure></div>"+
   "<div class='pane' data-p='2'><h4>弱點管理：確認無需要更新項目</h4><p>點選「弱點管理」，須為藍燈並顯示「您目前沒有修補程式需要更新」。亮紅燈代表查核到未安裝的修補程式，請儘快執行 Windows Update。</p><figure class='fig'><div class='imgs'><button class='zoom' type='button'><img src='@@irmas-vul.png@@' alt='IRMAS 弱點管理畫面'></button></div><figcaption>資料來源：IRMAS 安裝後即時檢查步驟</figcaption></figure></div>"+
   "<div class='pane' data-p='3'><h4>系統資訊：記錄使用人與資產 ID</h4><p>點選「系統資訊」，記下「使用人」及「資產ID」。之後以該使用人帳號登入 IRMAS 網站，檢查此資產 ID 設備是否有違反查核項目。</p><figure class='fig'><div class='imgs'><button class='zoom' type='button'><img src='@@irmas-info.png@@' alt='IRMAS 系統資訊畫面'></button></div><figcaption>資料來源：IRMAS 安裝後即時檢查步驟</figcaption></figure></div>"+
   "<div class='pane' data-p='4'><h4>IRMAS 網站：逐一檢查安全查核項目</h4><p>在 IRMAS 網站點選該設備的 IP 位址進入，逐一檢查安全查核項目，欄位空白表示合規。違反項目會以紅色叉叉註記（例如未安裝防毒軟體），請依指引修正。</p><figure class='fig'><div class='imgs'><button class='zoom' type='button'><img src='@@irmas-web.png@@' alt='IRMAS 網站設備查核畫面'></button></div><figcaption>資料來源：IRMAS 安裝後即時檢查步驟</figcaption></figure></div>"+
   "<div class='pane' data-p='5'><h4>病毒碼版本己過期：立即更新</h4><p>安全查核出現「病毒碼版本己過期」時，開啟防毒軟體（OfficeScan），點選「更新」，以免終端未受最新版防毒軟體保護。</p><figure class='fig'><div class='imgs'><button class='zoom' type='button'><img src='@@officescan.png@@' alt='OfficeScan 更新畫面'></button></div><figcaption>資料來源：IRMAS_安全查核項目說明及修正文件 第 17 項</figcaption></figure></div>"+
   "<div class='pane' data-p='6'><h4>修正後：資料同步更新</h4><p>修正完成後點選「資料同步更新」（或重新開機），直到 IRMAS 網站上的更新時間晚於本機確認無弱點的時間，才表示已同步完成。</p><figure class='fig'><div class='imgs'><button class='zoom' type='button'><img src='@@irmas-sync.png@@' alt='IRMAS 資料同步更新畫面'></button></div><figcaption>資料來源：IRMAS 安裝後即時檢查步驟</figcaption></figure></div>"+
  "</div>"},
 {t:"安裝 IRMAS 與設定場域",sub:"選錯場域會派送錯誤的管控措施",html:
  "<div class='split'><div class='col'>"+
   "<ol class='steps compact'>"+
    "<li><span><b>前置條件</b><small>新設備已於 ICTINV 申請資產 ID 並設定預設場域；先完成 Windows Update 與安裝防毒軟體。</small></span></li>"+
    "<li><span><b>安裝讀卡機與 HiCOS_Client</b><small>以 HiCOS 卡片管理工具確認讀得到員工卡。</small></span></li>"+
    "<li><span><b>確認資產 ID 未重複</b><small>IRMAS 網站上已有此資產 ID，需先請管理者刪除或遠端移除 Agent，否則會出現「連線或認證失敗！」。</small></span></li>"+
    "<li><span><b>以系統管理者身分執行安裝檔</b><small>OA 環境選 OA Version 的「OA」；在家或國外選「Internet」。</small></span></li>"+
    "<li><span><b>靜置約 5 分鐘等待認證畫面</b><small>期間請勿重開機或自行開啟程式，否則會安裝失敗。</small></span></li>"+
    "<li><span><b>輸入 PIN 碼與資產 ID</b><small>資產 ID 可至 ictinv.cht.com.tw/irmas.html 查詢，英文字母需大寫。</small></span></li>"+
   "</ol>"+
   "<p class='callout'>場域選定後，<b>無法從 Agent 端再修改</b>；如需變更，請至 IRMAS 管理網站提出申請。</p>"+
  "</div><figure class='fig'><div class='imgs'><button class='zoom' type='button'><img src='@@irmas-auth.png@@' alt='IRMAS 安裝認證畫面'></button></div><figcaption>資料來源：IRMAS 安裝手冊</figcaption></figure></div>"},
 {t:"終端場域與保護目標",sub:"場域決定 IRMAS 派送哪些管控措施",html:
  "<div class='grid c4'>"+
   "<div class='card'><small style='color:var(--muted);font-weight:700'>確保機敏資料安全</small><h4>一般 OA 使用</h4><ul><li>一般辦公室終端</li><li>一般辦公室終端（非員工）</li><li>一般辦公室終端（允用 Line 傳訊軟體）</li></ul></div>"+
   "<div class='card'><small style='color:var(--muted);font-weight:700'>確保客戶個資安全</small><h4>門市 &amp; 服務中心</h4><ul><li>服務中心（一線櫃臺）</li><li>服務中心 SPEP 終端（取號機、電視牆等）</li></ul></div>"+
   "<div class='card'><small style='color:var(--muted);font-weight:700'>確保終端安全</small><h4>會議</h4><ul><li>會議室專用終端</li></ul></div>"+
   "<div class='card'><small style='color:var(--muted);font-weight:700'>確保維運／開發作業安全</small><h4>維運 &amp; 開發</h4><ul><li>維運終端、廠商維運終端</li><li>開發終端、專屬維運終端</li></ul></div>"+
  "</div>"+
  "<p class='callout info'>一般辦公室使用者，場域選「<b>一般辦公室終端</b>」。</p>"+
  "<div><button class='mini' type='button' data-modal='zones' data-title='完整場域清單'>看完整場域清單（31 個）</button></div>"+
  "<template data-mt='zones'><p style='color:var(--muted);font-size:.9rem'>依〈特定場域終端設備管控項目一覽表〉2026/1/22 版，數字為場域代碼。</p><div class='chipz mono' style='font-size:.95rem'>"+
   [["4","一般辦公室終端"],["40","一般辦公室終端（允用 Line 傳訊軟體）"],["41","一般辦公室終端（非員工）"],["2","服務中心（一線櫃臺）"],["43","服務中心 SPEP 終端（取號機、電視牆等）"],["1","客服（一線座席）"],["13","客服（二線座席）"],["50","客網（一線）"],["3","客網（承包商）"],["8","客網外線工作筆電"],["15","客網承商工作筆電"],["42","訓練教室終端"],["7","會議室專用終端"],["44","專標案案場專用終端"],["18","專屬維運終端-CHTNet(OA)"],["19","專屬維運終端-CHTNet(研究院)"],["49","專屬維運終端 DBA 及大批資料擷取"],["20","專屬維運終端-Internet 遠端維運"],["21","專屬維運終端-Internet 遠端維運"],["16","專屬維運終端-堡壘內（單一堡壘）"],["17","專屬維運終端-堡壘內（多個堡壘）"],["14","規設科 GIS 終端"],["5","開發終端"],["6","維運終端"],["45","廠商維運終端"],["22","僅可連接 Internet 終端"],["46","Internet 私人維運終端"]].map(z=>"<span><b>"+z[0]+"</b> "+z[1]+"</span>").join("")+
  "</div></template>"},
 {t:"公司嚴禁安裝的四大類軟體",sub:"實際禁用清單以公司公告為準",html:
  "<div class='grid c2'>"+
   "<div class='card no'><span class='x'>✕</span><h4>非法軟體</h4><p>破解軟體或未授權軟體、序號產生器、非法啟用工具（如 KMS 破解）</p></div>"+
   "<div class='card no'><span class='x'>✕</span><h4>P2P 軟體</h4><p>BitComet、eDonkey、eMule、qBittorrent、µTorrent</p></div>"+
   "<div class='card no'><span class='x'>✕</span><h4>風險軟體</h4><p>TeamViewer、QuickTime、Digital Video Repair、Zoom、AnyDesk、RustDesk、Chrome 遠端桌面、Tailscale、ZeroTier、ngrok</p></div>"+
   "<div class='card no'><span class='x'>✕</span><h4>雲端同步軟體</h4><p>Dropbox、Google Drive、OneDrive、百度網盤、iCloud for Windows、MEGA</p></div>"+
  "</div>"+
  "<p class='callout'>遠端連線、內網穿透類工具（如 Tailscale、ngrok）會<b>繞過公司防火牆</b>，風險等同遠端桌面。業務需要的軟體：<b>先申請、經主管同意，再從 EIP 下載通過安全檢核的版本</b>。</p>"},
 {t:"練習：可以裝嗎？",sub:"全部答對才能前進",type:"sorter",intro:"",hint:"這套軟體能不能裝在公司電腦上？",
  btns:[{v:"ok",l:"可以裝",cls:"ok"},{v:"no",l:"禁止安裝",cls:"no"}],
  items:[
   {n:"7-Zip",d:"從 EIP「免費軟體→工具程式→壓縮程式」下載",a:"ok",why:"EIP 上架的免費軟體已通過安全檢核，經權責主管同意即可安裝。"},
   {n:"BitComet",d:"同事說抓檔很快",a:"no",why:"P2P 軟體，屬公司嚴禁安裝類別。"},
   {n:"破解版繪圖軟體",d:"朋友給的序號產生器",a:"no",why:"非法軟體（破解或未授權），嚴禁安裝。"},
   {n:"AnyDesk",d:"想從家裡遠端連回公司電腦",a:"no",why:"遠端控制類風險軟體（同 TeamViewer），嚴禁安裝；遠端桌面也應關閉。"},
   {n:"Notepad++",d:"EIP 免費軟體區已上架",a:"ok",why:"EIP 已上架、經主管同意，可以安裝。"},
   {n:"Tailscale",d:"想把公司電腦和家裡電腦組成私人網路",a:"no",why:"內網穿透／VPN 工具會繞過公司防火牆，屬風險軟體，禁止安裝。"},
   {n:"Dropbox",d:"方便手機和電腦同步檔案",a:"no",why:"雲端同步軟體，公司禁用（Dropbox、Google Drive、百度網盤）。"},
   {n:"WebATM Plug-in 元件",d:"某網站跳窗要求下載",a:"no",why:"非業務需要的元件，網站要求下載時請拒絕安裝。"},
   {n:"Zoom",d:"客戶寄來會議連結",a:"no",why:"Zoom 列在風險軟體類別；公司會議請使用 Teams。"}
  ]}
 ]},

/* ---------------- CH.02 ---------------- */
{id:"ch2",tag:"CH.02",title:"使用業務所需免費軟體程序",ribbon:"免費軟體",ink:"yellow",icon:"download",seed:11,mins:2,
 desc:"先申請，再安裝。從 EIP 下載 7-Zip，以及 EIP 上沒有時怎麼申請上架。",
 stages:[
 {t:"使用原則",sub:"先申請，再安裝",html:
  "<p class='lead'>業務上需要安裝免費軟體，須經<b>權責主管同意</b>，再到公司 <b>EIP 網站</b>下載已通過安全檢核的軟體安裝。</p>"+
  "<div class='path' aria-label='EIP 路徑'><span>EIP 企業入口網站</span><i>▶</i><span>資源共享</span><i>▶</i><span>軟體下載</span><i>▶</i><span>免費軟體</span></div>"+
  "<div class='flow' style='margin-top:.6em'>"+
   "<div class='fn'><span class='no'>1</span><b>主管同意</b><small>業務確實需要</small></div><span class='ar'>▶</span>"+
   "<div class='fn'><span class='no'>2</span><b>EIP 下載</b><small>只裝通過安全檢核的版本</small></div><span class='ar'>▶</span>"+
   "<div class='fn'><span class='no'>3</span><b>安裝</b><small>不從官網或同事傳的檔案安裝</small></div>"+
  "</div>"+
  "<div class='punch'><span class='g'>先申請 再安裝</span><small>EIP 上沒有？最後一關教你申請上架。</small></div>"},
 {t:"實戰：在 EIP 找到 7-Zip",sub:"步驟 1–6",html:
  "<p class='lead'>登入 EIP 企業入口網站 <b>eip.cht.com.tw</b>，跟著點：</p>"+
  "<ol class='steps'>"+
   "<li><span>點選【資源共享】<small>於左側選單點選</small></span></li>"+
   "<li><span>點選【軟體下載】</span></li>"+
   "<li><span>點選【免費軟體】</span></li>"+
   "<li><span>點選【工具程式】<small>在左側分類樹中展開</small></span></li>"+
   "<li><span>點選【壓縮程式】</span></li>"+
   "<li><span>點選【下載】<small>Windows 64 位元請下載 7-zip_x64；32 位元請下載 7-zip_x86</small></span></li>"+
  "</ol>"},
 {t:"實戰：驗證身分並下載",sub:"步驟 7–14",html:
  "<div class='split'><ol class='steps' style='counter-reset:s 6'>"+
   "<li><span>點選【安裝客戶端元件】圖示<small>第一次下載檔案時才需要，以便驗證 PIN 碼</small></span></li>"+
   "<li><span>點選【執行】</span></li>"+
   "<li><span>點選【確定】<small>選擇安裝語言：繁體中文</small></span></li>"+
   "<li><span>點選【安裝】</span></li>"+
  "</ol><ol class='steps' style='counter-reset:s 10'>"+
   "<li><span>點選【完成】<small>看到「安裝完成」即已安裝客戶端元件</small></span></li>"+
   "<li><span>插入識別證，輸入 PIN 碼<small>員工插卡認證</small></span></li>"+
   "<li><span>點選【登入】</span></li>"+
   "<li><span>點選【儲存】<small>檔案會存到【我的最愛／下載】目錄，再點選安裝</small></span></li>"+
  "</ol></div>"},
 {t:"EIP 上沒有？申請上架",sub:"申請單在 EIP →資源共享→軟體下載",html:
  "<p class='lead'>填寫<b>軟體上架申請單</b>。審核通過、檢測確認無害後，就會上架到 EIP。</p>"+
  "<div class='flow'>"+
   "<div class='fn'><span class='no'>1</span><b>申請者</b><small>填軟體上架申請單</small></div><span class='ar'>▶</span>"+
   "<div class='fn'><span class='no'>2</span><b>權責主管</b><small>同意</small></div><span class='ar'>▶</span>"+
   "<div class='fn'><span class='no'>3</span><b>單位主管</b><small>同意</small></div><span class='ar'>▶</span>"+
   "<div class='fn'><span class='no'>4</span><b>軟體審查小組</b><small>同意</small></div><span class='ar'>▶</span>"+
   "<div class='fn'><span class='no'>5</span><b>EIP 維運小組</b><small>安全查核、確認無害</small></div><span class='ar'>▶</span>"+
   "<div class='fn' style='border-color:var(--c);background:color-mix(in srgb,var(--c) 14%,var(--surface))'><span class='no'>✓</span><b>上架 EIP</b><small>申請者即可下載</small></div>"+
  "</div>"}
 ]},

/* ---------------- CH.03 ---------------- */
{id:"ch3",tag:"CH.03",title:"資安事件通報及處理",ribbon:"事件通報",ink:"teal",icon:"siren",seed:5,mins:3,
 desc:"三種情境的通報流程、SOC 事件單等級，以及你單位的資訊負責人。",
 stages:[
 {t:"通報流程",sub:"選一個情境",html:
  "<div class='md' data-md>"+
   "<div class='tabs' role='tablist' aria-label='情境'>"+
    "<button class='tab' role='tab' type='button' data-t='a'><span class='n'>A</span>收到惡意郵件</button>"+
    "<button class='tab' role='tab' type='button' data-t='b'><span class='n'>B</span>電腦疑似受駭</button>"+
    "<button class='tab' role='tab' type='button' data-t='c'><span class='n'>C</span>接獲 SOC 通知</button>"+
   "</div>"+
   "<div class='pane' data-p='a'><h4>員工自行發現疑似資安事件（惡意郵件）</h4><div class='flow v'>"+
    "<div class='fn alert'><span class='no'>1</span><b>發現惡意郵件／簡訊</b></div><span class='ar'>▶</span>"+
    "<div class='fn'><span class='no'>2</span><b>通報單位資安幫手</b><small>協助確認</small></div><span class='ar'>▶</span>"+
    "<div class='fn'><span class='no'>3</span><b>機構資安專責窗口</b><small>研判是否為惡意郵件</small></div><span class='ar'>▶</span>"+
    "<div class='fn'><span class='no'>4</span><b>CHT SOC</b><small>判定為惡意郵件則通報</small></div></div>"+
    "<p class='callout bad'>先通報、請幫手確認，<b>不要自己點開連結或附件測試</b>。</p></div>"+
   "<div class='pane' data-p='b'><h4>員工自行發現疑似資安事件（疑似受駭）</h4><div class='flow v'>"+
    "<div class='fn alert'><span class='no'>1</span><b>疑似受駭或被攻擊的電腦</b></div><span class='ar'>▶</span>"+
    "<div class='fn'><span class='no'>2</span><b>拔除網路線並保留現場</b><small>勿自行刪除或重灌系統</small></div><span class='ar'>▶</span>"+
    "<div class='fn'><span class='no'>3</span><b>通報單位資安幫手</b><small>協助研判</small></div><span class='ar'>▶</span>"+
    "<div class='fn'><span class='no'>4</span><b>機構資安專責窗口</b><small>研判是否為資安事件</small></div><span class='ar'>▶</span>"+
    "<div class='fn'><span class='no'>5</span><b>CHT SOC</b><small>研判為資安事件則通報</small></div></div>"+
    "<p class='callout bad'>拔網路線、保留現場。<b>自行刪除檔案或重灌會毀掉鑑識證據。</b></p></div>"+
   "<div class='pane' data-p='c'><h4>接獲 CHT SOC 通知（Email 或簡訊）</h4><div class='flow v'>"+
    "<div class='fn alert'><span class='no'>!</span><b>CHT SOC</b><small>Email 或簡訊通知</small></div><span class='ar'>▶</span>"+
    "<div class='fn'><span class='no'>1</span><b>設備管理員</b><small>先拔除電腦網路線，保留現場</small></div><span class='ar'>▶</span>"+
    "<div class='fn'><span class='no'>2</span><b>通報單位資安幫手</b><small>協助處理</small></div><span class='ar'>▶</span>"+
    "<div class='fn'><span class='no'>3</span><b>事件管理平台 ISTMS</b><small>進行回報</small></div></div>"+
    "<p class='callout bad'>收到 CHTSOC 事件單請<b>立即處理回覆，切勿逾期</b>，逾期會升級通知主管。</p></div>"+
  "</div>"},
 {t:"SOC 事件單的三種等級",sub:"依通知單內容在 ISTMS 回報",html:
  "<table class='tbl'><thead><tr><th style='width:16%'>事件類型</th><th>說明</th><th style='width:38%'>ISTMS 回報處理</th></tr></thead><tbody>"+
   "<tr><td><b>資安警訊</b></td><td>極低威脅，設備／系統管理者無須回報，僅提醒提高警覺</td><td>須確認造成資安警訊的原因已消除，<b>不須回報</b></td></tr>"+
   "<tr><td><b>風險事件</b></td><td>透過監控、分析日誌發現之異常現象，須確認是否遭入侵或受駭</td><td>依通知單內容於期限內回報，<b>逾期將升級通知</b>設備／系統管理者之主管</td></tr>"+
   "<tr><td><b>資安事件</b></td><td>可能有違反資通安全政策、或遭偵測告警等情事，可能造成資安防護漏洞或威脅</td><td>依通知單內容於期限內回報，逾期將升級通知主管；<b>如需鑑識，請配合鑑識後續作業</b></td></tr>"+
  "</tbody></table>"+
  "<div class='punch'><span class='g'>先通報 再處理</span><small>事件單不論等級，都不要放著不管。</small></div>"},
 {t:"資訊負責人負責哪些事",sub:"通報流程裡的「單位資安幫手」",html:
  "<p class='lead'>每個單位都有一位資訊負責人，是同仁遇到電腦或資安問題時的第一個窗口。</p>"+
  "<div class='grid c2'>"+
   "<div class='card'><h4><span class='k'>01</span>電腦設備簡易障礙排除與報修</h4><p>電腦無法開機、連不上網路、印表機等周邊故障時，先找資訊負責人排除，必要時由他協助報修。</p></div>"+
   "<div class='card'><h4><span class='k'>02</span>IRMAS 查核與更新</h4><p>協助確認單位內每部電腦都已安裝 IRMAS、場域正確、燈號為藍燈，並處理查核不合規的項目。</p></div>"+
   "<div class='card'><h4><span class='k'>03</span>年度電腦及終端設備申請</h4><p>彙整單位年度的電腦與終端設備需求並提出申請，需要新設備請先告知他。</p></div>"+
   "<div class='card'><h4><span class='k'>04</span>電腦 IP 位址管控</h4><p>管理單位內電腦的 IP 位址（IPAM 平台）。新電腦需要 IP，或電腦要搬位置、換網段時，請先找他。</p></div>"+
  "</div>"},
 {t:"找到你的資訊負責人",sub:"搜尋單位、代碼或姓名",type:"dir",html:
  "<div class='dir-top'><input id='dirQ' type='search' placeholder='例如：資通科、CIH、8941' aria-label='搜尋單位、代碼或姓名'></div><div class='dir' id='dirOut' aria-live='polite'></div>"}
 ]},

/* ---------------- CH.04 ---------------- */
{id:"ch4",tag:"CH.04",title:"通行碼管理與雙因子認證",ribbon:"通行碼",ink:"blue",icon:"key",seed:13,mins:2,
 desc:"易猜通行碼長什麼樣、公司規定，親手試一組看看要多久被破解。",
 stages:[
 {t:"應避免的易猜通行碼",sub:"這些都撐不過幾秒",html:
  "<div class='chipz bad' style='font-size:1.25em'><span>11111111</span><span>12345678</span><span>password</span><span>qwertyui</span><span>1qaz2wsx</span><span>19950312</span><span>1qaz@WSX</span><span>!QAZ2wsx</span><span>admin</span></div>"+
  "<p class='lead'>避免<b>重複或順序數字、英文單字、鍵盤排列、生日、中文姓名拼音／注音</b>。</p>"+
  "<div class='grid c3'>"+
   "<div class='card no'><h4>預設帳號沒停用</h4><p>設備預設帳號未停用，或通行碼未修改。</p></div>"+
   "<div class='card no'><h4>帳密隨手寫</h4><p>帳密記錄隨意放置。</p></div>"+
   "<div class='card no'><h4>瀏覽器記住密碼</h4><p>讓瀏覽器自動儲存通行碼。</p></div>"+
  "</div>"},
 {t:"通行碼強度檢查",sub:"請勿輸入真實密碼",type:"pw",html:
  "<div class='split'><div class='col'><p class='lead' style='font-size:.95em'>試打一組，看看六項條件和暴力破解時間怎麼變。</p><div class='pw'></div></div>"+
  "<div class='grid c2' style='align-content:start'>"+
   "<div class='stat'><span class='v'>8+</span><span class='l'>最小長度不小於 8 個字元</span></div>"+
   "<div class='stat'><span class='v'>Aa1#</span><span class='l'>大小寫、數字、符號混合</span></div>"+
   "<div class='stat'><span class='v'>3 個月</span><span class='l'>養成定期更改的習慣</span></div>"+
   "<div class='stat'><span class='v'>3 代</span><span class='l'>通行碼設定三代不得重複</span></div>"+
  "</div></div>"},
 {t:"雙因子認證",sub:"再加一道不同類型的鎖",html:
  "<p class='lead'>用以強化使用者身分辨識，增加使用網路服務安全性的保護措施。密碼學身分認證有三個因素：</p>"+
  "<div class='grid c3'>"+
   "<div class='card'><small style='font-family:var(--f-game);color:var(--c)'>YOU KNOW</small><h4>所知之事</h4><p>通關密碼、帳號通行碼</p></div>"+
   "<div class='card'><small style='font-family:var(--f-game);color:var(--c)'>YOU HAVE</small><h4>所持之物</h4><p>智慧卡（晶片卡）、手機門號、OTP 一次性密碼</p></div>"+
   "<div class='card'><small style='font-family:var(--f-game);color:var(--c)'>YOU ARE</small><h4>所具之形</h4><p>生物特徵：指紋、臉型、聲紋、虹膜或視網膜</p></div>"+
  "</div>"+
  "<div class='punch'><span class='g'>雙因子 = 帳號通行碼 + OTP／晶片卡／生物因子</span></div>"}
 ]},

/* ---------------- CH.05 ---------------- */
{id:"ch5",tag:"CH.05",title:"資料安全管理原則",ribbon:"資料安全",ink:"violet",icon:"file",seed:21,mins:3,
 desc:"四個資料安全等級、三個使用原則，以及三星把會議紀錄貼進 ChatGPT 的教訓。",
 stages:[
 {t:"駭客想要的，就是資料",sub:"選出的 16 起外洩事件",html:
  "<div class='split'><div class='col' style='justify-content:center'>"+
   "<p style='font-weight:700'>16 起外洩事件，合計</p><div class='big' data-count='5788000000'>0</div><p style='font-weight:700'>筆資料。社群網站、住宿資料、微軟帳號、設計網站……</p>"+
   "<p class='callout bad'>本公司擁有<b>大量的客戶個人資料及營業秘密</b>，是駭客覬覦的目標。個資外洩輕則罰款，重則刑責。</p>"+
   "<p class='src'>資料來源：informationisbeautiful.net World's Biggest Data Breaches &amp; Hacks（2021/10 版）</p>"+
  "</div><div class='bars' aria-label='外洩筆數（百萬筆）'>"+
   [["Aadhaar",1100],["Spambot",711],["Facebook",533],["Facebook",420],["Marriott",383],["OxyData",380],["River City Media",340],["Twitter",330],["Indian citizens",275],["Microsoft",250],["Experian Brazil",220],["Chinese resume",202],["Apollo",200],["Dubsmash",162],["Equifax",143],["Canva",139]].map(b=>"<div class='b'><span>"+b[0]+"</span><i style='width:"+(b[1]/11)+"%'></i><span>"+b[1]+" M</span></div>").join("")+
  "</div></div>"},
 {t:"案例：三星員工用 ChatGPT",sub:"一次貼上，資料就離開公司了",html:
  "<div class='grid c3'>"+
   "<div class='card'><h4><span class='k'>1</span>發生了什麼</h4><p>員工使用 ChatGPT 總結會議記錄時，無意中洩露了敏感資訊。</p></div>"+
   "<div class='card'><h4><span class='k'>2</span>三星的反應</h4><p>禁止在內部網路和公司設備上使用 ChatGPT 等生成式 AI 工具。</p></div>"+
   "<div class='card'><h4><span class='k'>3</span>連鎖效應</h4><p>LG、SK 海力士限制員工使用；摩根大通、美國銀行、花旗等金融機構也禁止或限制。</p></div>"+
  "</div>"+
  "<p class='callout bad'>限閱級以上資料<b>不得透過 LINE、FB、ChatGPT 談論、傳輸或揭露公務</b>。</p>"},
 {t:"資料涵蓋範圍",sub:"紙本和電子檔都算",html:
  "<div class='grid c2'>"+
   "<div class='card'><h4>書面文件</h4><p>存在紙張、投影片、幻燈片等能直接讀取的資料。</p><div class='chipz'><span>檔案夾</span><span>簡報</span><span>底片</span><span>手稿</span><span>列印</span><span>傳真</span><span>影印</span></div></div>"+
   "<div class='card'><h4>電子檔案</h4><p>以電腦檔案、語音、視訊形式存在於電子儲存媒體上的資料。</p><div class='chipz'><span>文件檔</span><span>系統紀錄檔</span><span>組態設定檔</span><span>資料庫</span><span>原始程式碼</span><span>備份檔</span><span>虛擬主機映像檔</span></div></div>"+
  "</div>"},
 {t:"資料安全等級",sub:"依營業秘密、客戶隱私與對外介接程度評定",html:
  "<div class='tierlist'>"+
   "<div class='tier' style='--tc:var(--red)'><b>極機密</b><p>依「營業秘密項目」：1. 客戶之基本資料　2. IC 公用電話卡系統基碼</p></div>"+
   "<div class='tier' style='--tc:var(--pink)'><b>機密</b><p>1. 依「營業秘密項目」　2. 未列入營業秘密項目，但隱私衝擊值為中以上之資料</p></div>"+
   "<div class='tier' style='--tc:var(--yellow)'><b>限閱</b><p>內部使用、不對外公開之資料</p></div>"+
   "<div class='tier' style='--tc:var(--teal)'><b>公開</b><p>特定目的服務公眾（經公告程序提供公眾）之資料</p></div>"+
  "</div>"+
  "<p class='src'>依據：EIP →法律與規章→資通安全→資通安全管理規範與實施細則 V15（2023.08）</p>"},
 {t:"練習：判斷資料安全等級",sub:"全部答對才能前進",type:"sorter",hint:"這份資料屬於哪一級？",
  btns:[{v:"極機密",l:"極機密"},{v:"機密",l:"機密"},{v:"限閱",l:"限閱"},{v:"公開",l:"公開"}],
  items:[
   {n:"客戶基本資料",d:"姓名、地址、證號…",a:"極機密",why:"營業秘密項目明列：客戶之基本資料屬極機密。"},
   {n:"內部會議紀錄",d:"只在部門內部流通，不對外公開",a:"限閱",why:"內部使用不對外公開之資料屬限閱。"},
   {n:"IC 公用電話卡系統基碼",d:"",a:"極機密",why:"營業秘密項目明列為極機密。"},
   {n:"已公告的服務資費說明",d:"經公告程序提供給民眾",a:"公開",why:"特定目的服務公眾、經公告程序提供之資料屬公開。"},
   {n:"未列營業秘密、隱私衝擊值「中」的資料",d:"",a:"機密",why:"未列入營業秘密項目但隱私衝擊值為中以上，屬機密。"}
  ]},
 {t:"資料使用的三個一般原則",sub:"",html:
  "<div class='grid c3'>"+
   "<div class='card'><h4>儲存安全</h4><p>「網路存取不到的儲存空間」比「網路存取得到的儲存空間」更安全。</p></div>"+
   "<div class='card'><h4>傳遞機密</h4><p>機密等級以上的資料，傳輸、儲存時要加密。只有授權的人才能解密檢視，比明文傳遞或儲存安全得多。</p></div>"+
   "<div class='card'><h4>資安風險</h4><p>盡量使用公司內部通訊軟體（Teams），避免 LINE、WeChat、Messenger、WhatsApp 等外部通訊軟體。</p></div>"+
  "</div>"},
 {t:"資料安全注意事項",sub:"識別、儲存、傳遞、存取",html:
  "<table class='tbl'><thead><tr><th>規定</th><th style='width:24%'>面向</th></tr></thead><tbody>"+
   "<tr><td><b>極機密級</b>資料未經權責主管授權，不得使用電子郵件傳送。</td><td>傳遞及存取安全</td></tr>"+
   "<tr><td><b>機密級以上</b>資料，依存在形式與儲存媒體，於明顯處標示安全等級，標示應涵蓋完整資料內容。</td><td>識別安全</td></tr>"+
   "<tr><td><b>機密級以上</b>資料儲存時應加密；傳輸時應採用具加密機制之電子郵件服務。</td><td>儲存及傳遞安全</td></tr>"+
   "<tr><td>內部檔案應標註資料安全等級，<b>限閱級以上</b>不得任意散布或儲存至公司外部。</td><td>識別及存取安全</td></tr>"+
   "<tr><td><b>限閱級以上</b>資料不得存放於外部網路分享空間（如 Google Drive），不得透過 LINE、FB、ChatGPT 談論、傳輸或揭露公務。</td><td>傳遞、儲存及存取安全</td></tr>"+
   "<tr><td>因業務需要交換／存取限閱級以上資料時，如存放於 boxe 須將檔案加密，並於<b>兩周內刪除</b>不必要檔案。</td><td>儲存及存取安全</td></tr>"+
  "</tbody></table>"}
 ]},

/* ---------------- CH.06 ---------------- */
{id:"ch6",tag:"CH.06",title:"安全使用 Teams、雲端與 USB",ribbon:"Teams・雲端・USB",ink:"teal",icon:"cloud",seed:17,mins:2,
 desc:"團隊設私人、機密檔加密、公務 USB 只給公務設備用。",
 stages:[
 {t:"Microsoft Teams",sub:"",html:
  "<div class='grid c3'>"+
   "<div class='card'><h4><span class='k'>1</span>機敏檔案要上鎖</h4><p>含機敏資料的檔案上傳時，要<b>加密或以密碼鎖定</b>。</p></div>"+
   "<div class='card'><h4><span class='k'>2</span>團隊設為「私人」</h4><p>建立團隊時隱私權設為「私人」，確保雲端檔案僅供團隊成員瀏覽。</p></div>"+
   "<div class='card'><h4><span class='k'>3</span>外部人員不入團隊</h4><p>非必要（如一次性會議邀約）勿將外部人員加入團隊成員；外部人員以匿名身分、經邀約者同意後才可加入會議。</p></div>"+
  "</div>"+
  "<div class='punch'><span class='g'>團隊 = 私人</span><small>公開團隊的檔案，全公司都看得到。</small></div>"},
 {t:"雲端儲存：OneDrive 公務雲",sub:"公司 EA 採購 O365 授權給全區正職員工",html:
  "<div class='split rev'><div class='col'><ul class='ul'>"+
   "<li>機密資料存到 OneDrive 時，要<b>加密或以密碼鎖定</b>。</li>"+
   "<li>避免將限閱級以上資料放外部分享空間。若客戶要求或業務需要，須經<b>權責主管核准、檔案加密</b>，並：使用網頁版、配置適當權限、至少兩周檢查一次並刪除過期資料、<b>不得設定自動同步</b>。</li>"+
   "<li>程式碼、系統維運文件、系統設定資訊等，未經許可<b>勿放 GitHub</b> 等外部空間。</li>"+
  "</ul></div><div class='col' style='justify-content:center'>"+
   "<div class='chipz bad' style='font-size:1.2em'><span>Dropbox</span><span>Google Drive</span><span>百度網盤</span></div>"+
   "<p class='callout info'>少量機敏文件，請使用<b>安全電子郵件</b>。</p>"+
  "</div></div>"},
 {t:"USB 隨身碟",sub:"",html:
  "<div class='grid c2'>"+
   "<div class='card'><h4><span class='k'>1</span>公私分明</h4><p>單位控管之 USB 僅能用於公務資料及公務設備，不能用於私人設備。</p></div>"+
   "<div class='card'><h4><span class='k'>2</span>定期掃描</h4><p>以防毒軟體偵測、清除及隔離 USB 病毒。</p></div>"+
   "<div class='card'><h4><span class='k'>3</span>定期格式化</h4><p>避免未知病毒發作感染。</p></div>"+
   "<div class='card'><h4><span class='k'>4</span>專屬專用</h4><p>專屬維運終端的外接儲存媒體應專屬專用、由專人管理。</p></div>"+
  "</div>"+
  "<div class='punch'><span class='g'>公務 USB 只插公務電腦</span></div>"}
 ]},

/* ---------------- 終章 ---------------- */
{id:"end",tag:"終章",title:"結語與報到自檢",ribbon:"回顧與自檢",ink:"yellow",icon:"flag",seed:41,mins:3,
 desc:"四項重點、常見問答、常用網站，以及報到第一週要在自己電腦上確認的事。",
 stages:[
 {t:"四項重點回顧",sub:"",html:
  "<div class='grid c2'>"+
   "<div class='card'><h4>個資安全</h4><p>公司擁有大量客戶個資與營業秘密，是駭客覬覦的目標。個資外洩輕則罰款，重則刑責。</p></div>"+
   "<div class='card'><h4>資料安全</h4><p>特別注意識別（identify）、儲存（store）、傳遞（transfer）、存取（access）的安全。</p></div>"+
   "<div class='card'><h4>資訊安全規範</h4><p>詳見「資訊安全管理規範與實施細則第五章」：EIP →資源共享→法律與規章→資通安全→ S-0020。</p></div>"+
   "<div class='card'><h4>USB 安全</h4><p>專屬維運終端之 USB 應專屬專用、由專人管理，公務及私人用途不得混用。</p></div>"+
  "</div>"},
 {t:"常見問答",sub:"點左邊的問題",html:
  "<div class='md' data-md>"+
   "<div class='tabs' role='tablist' aria-label='問題'>"+
    "<button class='tab' role='tab' type='button' data-t='1'><span class='n'>1</span>7-Zip 選 x64 還是 x86？</button>"+
    "<button class='tab' role='tab' type='button' data-t='2'><span class='n'>2</span>第一次下載為什麼要裝東西？</button>"+
    "<button class='tab' role='tab' type='button' data-t='3'><span class='n'>3</span>電腦重灌後先裝什麼？</button>"+
    "<button class='tab' role='tab' type='button' data-t='4'><span class='n'>4</span>機敏文件能用 LINE 傳嗎？</button>"+
    "<button class='tab' role='tab' type='button' data-t='5'><span class='n'>5</span>收到 CHTSOC 事件單？</button>"+
    "<button class='tab' role='tab' type='button' data-t='6'><span class='n'>6</span>電腦有問題要找誰？</button>"+
   "</div>"+
   "<div class='pane' data-p='1'><h4>從 EIP 下載 7-Zip 時有 x64 和 x86 兩個檔案，該選哪個？</h4><p>看你的 Windows 位元數：64 位元請下載 7-zip_x64，32 位元請下載 7-zip_x86。EIP 上其他有分位元版本的免費軟體也是同樣原則。</p></div>"+
   "<div class='pane' data-p='2'><h4>第一次從 EIP 下載檔案，為什麼要裝東西？</h4><p>第一次下載需先安裝客戶端元件，才能驗證識別證 PIN 碼。依序點選執行→確定→安裝→完成，之後插入識別證輸入 PIN 碼登入即可。</p></div>"+
   "<div class='pane' data-p='3'><h4>電腦重灌後要先裝什麼？</h4><p>先裝<b>防毒軟體</b>，再裝 <b>IRMAS</b>。</p></div>"+
   "<div class='pane' data-p='4'><h4>要傳少量機敏文件給外部，可以用 LINE 或 Google Drive 嗎？</h4><p>不行。限閱級以上資料不得透過傳訊軟體或外部分享空間傳輸。少量機敏文件請使用安全電子郵件（EIP →資源共享→軟體下載→資安軟體→電子郵件簽章與加密）。</p></div>"+
   "<div class='pane' data-p='5'><h4>收到 CHTSOC 事件單怎麼辦？</h4><p>立即處理並回覆，切勿逾期。依事件等級於 ISTMS 回報，逾期會升級通知你的主管。</p></div>"+
   "<div class='pane' data-p='6'><h4>電腦有問題要找誰？</h4><p>先找你單位的資訊負責人（第三章可搜尋），負責設備簡易障礙排除與報修、IRMAS 查核與更新、年度設備申請與 IP 管控。</p></div>"+
  "</div>"},
 {t:"常用資訊網站",sub:"建議加入書籤",html:
  "<div class='grid c2'>"+
   "<a class='card' style='text-decoration:none;color:inherit' href='https://elearning.cht.com.tw' target='_blank' rel='noopener'><h4>中華電信自學網 eLearning</h4><p style='font-family:var(--f-mono)'>elearning.cht.com.tw</p></a>"+
   "<a class='card' style='text-decoration:none;color:inherit' href='https://eip.cht.com.tw' target='_blank' rel='noopener'><h4>企業入口網站 EIP</h4><p style='font-family:var(--f-mono)'>eip.cht.com.tw</p><p style='color:var(--muted)'>資源共享＼軟體下載＼資安軟體（電子郵件簽章與加密、全區防毒 TrendMicro）・免費軟體；法律與規章＼資通安全</p></a>"+
   "<a class='card' style='text-decoration:none;color:inherit' href='https://irmas.cht.com.tw' target='_blank' rel='noopener'><h4>資訊資源管理系統 IRMAS</h4><p style='font-family:var(--f-mono)'>irmas.cht.com.tw</p></a>"+
   "<a class='card' style='text-decoration:none;color:inherit' href='https://ipam.cht.com.tw' target='_blank' rel='noopener'><h4>CHT IP 管理平台 IPAM</h4><p style='font-family:var(--f-mono)'>ipam.cht.com.tw</p></a>"+
   "<a class='card' style='text-decoration:none;color:inherit;grid-column:1/-1' href='https://istms-w.cht.com.tw' target='_blank' rel='noopener'><h4>CHT SOC 事件管理平台 ISTMS</h4><p style='font-family:var(--f-mono)'>istms-w.cht.com.tw</p></a>"+
  "</div>"},
 {t:"報到第一週自我檢查",sub:"勾選紀錄只存在你的瀏覽器",html:
  "<div style='display:flex;justify-content:space-between;align-items:center;gap:1em'><p style='font-weight:700'>在自己的電腦上逐項確認後打勾。</p><span style='display:flex;gap:.6em;align-items:center'><b class='g' data-chkn='week1' style='color:var(--c)'></b><button class='mini' type='button' data-chkclear='week1'>清除勾選</button></span></div>"+
  "<ul class='chk' data-chk='week1'>"+
   [["確認 IRMAS 已安裝，安全查核與弱點管理皆為藍燈","IRMAS 工作列圖示 → 安全查核、弱點管理"],
    ["確認場域正確（一般辦公室使用者為「一般辦公室終端」）","IRMAS → 系統資訊 → 初次選擇的場域名稱"],
    ["記下使用人帳號與資產 ID，登入 IRMAS 網站確認無違反項目","irmas.cht.com.tw → MyIRMAS → 個人電腦列表"],
    ["確認防毒軟體已啟動、病毒碼為最新","OfficeScan → 更新"],
    ["執行 Windows Update，安裝所有修補程式","設定 → Windows Update"],
    ["確認防火牆已開啟，網路芳鄰、遠端桌面已關閉","控制台 → Windows Defender 防火牆"],
    ["更改預設密碼：8 碼以上，大小寫、數字、符號混合","每 3 個月更換，三代不得重複"],
    ["查好單位資訊負責人的姓名與分機","第三章可搜尋"],
    ["公務 USB 只用於公務設備，與私人隨身碟分開",""]].map(x=>"<li><label><input type='checkbox'><span>"+x[0]+(x[1]?"<small>"+x[1]+"</small>":"")+"</span></label></li>").join("")+
  "</ul>"}
 ]}
],

contacts:[["會計駐點","9A0","曾心怡","8941-5761"],["人資駐點","9H0","洪士群","8941-5768"],["行管科","A74","王凱立","8941-5736"],["供應科","B99","鍾亞霖","8941-5359"],["職安科","BBG","廖書賢","8941-5611"],["第一服務中心","51H","方嘉琳","8952-7966"],["第二服務中心","51I","盧亮","2991-1144"],["第一企客科","CEA","何郁芬","8952-7280"],["第二企客科","CEB","陳政隆","8977-1237"],["行銷科","CA6","蘇宇楨","8941-5379"],["帳務科","CD6","陳昱辰","8941-5915"],["規設科","CH1","廖健男","8941-5675"],["第一客網中心","D91","李東霖","8952-7705"],["第二客網中心","D92","吳其錫","8941-5471"],["第三客網中心","D93","陳玉梅","2998-7444"],["第四客網中心","D9A","李俊毅","8973-3009"],["第一網維中心","D61","陳弘益","2964-1644"],["第二網維中心","D62","鐘婉綺","2982-0244"],["電力中心","D94","溫斯菘","8941-5388"],["法務駐點","0100A19CCD","王奕勝","8941-0059"],["資通科","CIH","趙立仁","8941-5559"],["新北營運處資訊窗口","—","林靜敏","2279-2136"]],

irmas:{
  share:{l:"開啟網路芳鄰",pane:"sec",t:"有開啟網路芳鄰(修正)",auto:true,hint:"「有開啟網路芳鄰」可自動修正：在安全查核勾選該項，按「修正已選擇之安全查核項目」，再按「資料同步更新」。開啟網路芳鄰同時會被 CHT SOC 偵測並開立事件單。"},
  av:{l:"病毒碼版本己過期",pane:"sec",t:"病毒碼版本己過期",auto:false,fixLabel:"已在防毒軟體點選「更新」",hint:"「病毒碼版本己過期」需手動修正：開啟防毒軟體點選「更新」，完成後按「資料同步更新」。"},
  patch:{l:"有未安裝的修補程式",pane:"vul",rows:[["KB5065426","2026-09 Windows 11 累積更新 (x64)"],["KB5064401","2026-09 .NET Framework 累積更新"]],fixLabel:"已執行 Windows Update",hint:"弱點管理亮紅燈，代表查核到未安裝的修補程式：執行 Windows Update 後按「資料同步更新」，即轉回藍燈。"},
  rdp:{l:"啟用遠端桌面",pane:"sec",t:"有啟用遠端桌面",auto:false,fixLabel:"已關閉遠端桌面",hint:"「有啟用遠端桌面」需手動修正：至 Windows 設定關閉遠端桌面，完成後按「資料同步更新」。"}
},

boss:{
  name:"紅燈怪",
  desc:"12 題資安測驗。答對 10 題，把亮紅燈的終端打回藍燈。",
  win:"紅燈怪被打回藍燈了。你已完成新進同仁資安須知。",
  art:"<g stroke='#16152B' stroke-width='6' stroke-linejoin='round' stroke-linecap='round'>"+
   "<path d='M100 36V18' fill='none'/><circle cx='100' cy='14' r='10' fill='#FFC93C'/>"+
   "<path d='M58 158q-10 22 6 30q6-14 12-20M92 166q-4 22 10 24q6-12 6-22M128 160q8 22 24 18q-6-12-10-22' fill='#E0352B'/>"+
   "<path d='M36 116C36 66 68 34 100 34s64 32 64 82c0 34-18 54-64 54s-64-20-64-54z' fill='#E0352B'/>"+
   "<path d='M56 104q2-34 28-50' fill='none' stroke='#fff' stroke-opacity='.45' stroke-width='7'/>"+
   "<circle cx='100' cy='94' r='28' fill='#fff'/><circle cx='106' cy='98' r='12' fill='#16152B' stroke='none'/><circle cx='110' cy='93' r='4' fill='#fff' stroke='none'/>"+
   "<path d='M68 62l28 14M132 62l-28 14' fill='none' stroke-width='8'/>"+
   "<path d='M68 132q32 22 64 0z' fill='#16152B'/><path d='M82 136l5 9 5-9M108 136l5 9 5-9' fill='#fff' stroke-width='3'/>"+
  "</g>",
  Q:[
  {q:"公司在《資通安全管理法》中屬於哪一類？",o:["一般非公務機關","關鍵基礎設施的通訊類","金融類關鍵基礎設施","高科技園區"],a:1,e:"公司屬關鍵基礎設施的通訊類，是駭客組織覬覦的重點目標。"},
  {q:"IRMAS 的「安全查核」與「弱點管理」應該亮什麼燈？",o:["紅燈","黃燈","藍燈","綠燈"],a:2,e:"兩者都要亮藍燈；紅燈代表有違規項目或未修補程式。"},
  {q:"防毒軟體的定期完整掃瞄，至少多久執行一次？",o:["每天","每週","每月","每季"],a:2,e:"至少每月執行一次完整掃瞄，並啟動自動更新病毒碼。"},
  {q:"關於通行碼，下列哪一項不符合公司規定？",o:["長度至少 8 個字元","大小寫、數字、符號混合","每 3 個月更改一次","用生日當密碼，比較好記"],a:3,e:"生日、順序數字、鍵盤排列、姓名拼音都屬易猜通行碼，應避免。另外三代不得重複。"},
  {q:"業務需要一套免費軟體，正確做法是？",o:["上官網下載最新版","請同事用 LINE 傳安裝檔","經權責主管同意後，到 EIP 下載已通過安全檢核的版本","先裝了再補申請"],a:2,e:"路徑：EIP →資源共享→軟體下載→免費軟體。EIP 上沒有就提出上架申請。"},
  {q:"電腦疑似受駭，第一步應該？",o:["馬上重灌系統","刪除可疑檔案","拔除網路線並保留現場，通報單位資安幫手","關機等明天再說"],a:2,e:"拔網路線、保留現場，勿自行刪除或重灌，再通報資安幫手與機構資安專責窗口。"},
  {q:"雙因子認證是「帳號通行碼」再加上什麼？",o:["再一組密碼","OTP、晶片卡或生物因子","密碼提示問題","瀏覽器記住密碼"],a:1,e:"要結合不同因素：you know + you have（OTP、晶片卡、手機門號）或 you are（指紋、臉型等）。"},
  {q:"「客戶之基本資料」屬於哪一個資料安全等級？",o:["極機密","機密","限閱","公開"],a:0,e:"依營業秘密項目，客戶之基本資料與 IC 公用電話卡系統基碼屬極機密。"},
  {q:"極機密級資料，未經權責主管授權不得？",o:["列印","以電子郵件傳送","在公司電腦開啟","加密儲存"],a:1,e:"極機密級資料未經權責主管授權，不得使用電子郵件傳送。"},
  {q:"建立 Teams 團隊時，隱私權應設為？",o:["公開","組織全體","私人","不設定"],a:2,e:"設為「私人」，確保雲端檔案僅供團隊成員瀏覽。"},
  {q:"因業務需要把限閱級以上資料放到外部分享空間，下列何者錯誤？",o:["經權責主管核准並加密","使用網頁版","至少兩周檢查一次並刪除過期資料","設定自動同步比較方便"],a:3,e:"不得設定為自動同步資料。"},
  {q:"單位控管的 USB 隨身碟，下列做法何者正確？",o:["插在家裡電腦拷照片","公私分明，並定期掃描與格式化","借給廠商帶回去用","設為開機自動執行"],a:1,e:"公務 USB 僅用於公務資料及設備，並定期掃描、定期格式化。"}
  ]
}
};
