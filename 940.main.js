"use strict";(self.webpackChunkfluence_faucet=self.webpackChunkfluence_faucet||[]).push([[940],{5761:(e,t,s)=>{s.d(t,{Ao:()=>r,D8:()=>_,IN:()=>u,dC:()=>J,jL:()=>i,lH:()=>K,mb:()=>h,pV:()=>B,vZ:()=>d});var o=s(9073),a=s(6763);const n=(0,o.BX)({history:["ConnectWallet"],view:"ConnectWallet",data:void 0}),i={state:n,subscribe:e=>(0,o.B1)(n,(()=>e(n))),push(e,t){e!==n.view&&(n.view=e,t&&(n.data=t),n.history.push(e))},reset(e){n.view=e,n.history=[e]},replace(e){n.history.length>1&&(n.history[n.history.length-1]=e,n.view=e)},goBack(){if(n.history.length>1){n.history.pop();const[e]=n.history.slice(-1);n.view=e}},setData(e){n.data=e}},r={WALLETCONNECT_DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",WCM_VERSION:"WCM_VERSION",RECOMMENDED_WALLET_AMOUNT:9,isMobile:()=>typeof window<"u"&&Boolean(window.matchMedia("(pointer:coarse)").matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)),isAndroid:()=>r.isMobile()&&navigator.userAgent.toLowerCase().includes("android"),isIos(){const e=navigator.userAgent.toLowerCase();return r.isMobile()&&(e.includes("iphone")||e.includes("ipad"))},isHttpUrl:e=>e.startsWith("http://")||e.startsWith("https://"),isArray:e=>Array.isArray(e)&&e.length>0,formatNativeUrl(e,t,s){if(r.isHttpUrl(e))return this.formatUniversalUrl(e,t,s);let o=e;return o.includes("://")||(o=e.replaceAll("/","").replaceAll(":",""),o=`${o}://`),o.endsWith("/")||(o=`${o}/`),this.setWalletConnectDeepLink(o,s),`${o}wc?uri=${encodeURIComponent(t)}`},formatUniversalUrl(e,t,s){if(!r.isHttpUrl(e))return this.formatNativeUrl(e,t,s);let o=e;return o.endsWith("/")||(o=`${o}/`),this.setWalletConnectDeepLink(o,s),`${o}wc?uri=${encodeURIComponent(t)}`},wait:async e=>new Promise((t=>{setTimeout(t,e)})),openHref(e,t){window.open(e,t,"noreferrer noopener")},setWalletConnectDeepLink(e,t){try{localStorage.setItem(r.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:e,name:t}))}catch{a.info("Unable to set WalletConnect deep link")}},setWalletConnectAndroidDeepLink(e){try{const[t]=e.split("?");localStorage.setItem(r.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:t,name:"Android"}))}catch{a.info("Unable to set WalletConnect android deep link")}},removeWalletConnectDeepLink(){try{localStorage.removeItem(r.WALLETCONNECT_DEEPLINK_CHOICE)}catch{a.info("Unable to remove WalletConnect deep link")}},setModalVersionInStorage(){try{typeof localStorage<"u"&&localStorage.setItem(r.WCM_VERSION,"2.6.2")}catch{a.info("Unable to set Web3Modal version in storage")}},getWalletRouterData(){var e;const t=null==(e=i.state.data)?void 0:e.Wallet;if(!t)throw new Error('Missing "Wallet" view data');return t}},l=typeof location<"u"&&(location.hostname.includes("localhost")||location.protocol.includes("https")),c=(0,o.BX)({enabled:l,userSessionId:"",events:[],connectedWalletId:void 0}),d={state:c,subscribe:e=>(0,o.B1)(c.events,(()=>e((0,o.P9)(c.events[c.events.length-1])))),initialize(){c.enabled&&typeof(null==crypto?void 0:crypto.randomUUID)<"u"&&(c.userSessionId=crypto.randomUUID())},setConnectedWalletId(e){c.connectedWalletId=e},click(e){if(c.enabled){const t={type:"CLICK",name:e.name,userSessionId:c.userSessionId,timestamp:Date.now(),data:e};c.events.push(t)}},track(e){if(c.enabled){const t={type:"TRACK",name:e.name,userSessionId:c.userSessionId,timestamp:Date.now(),data:e};c.events.push(t)}},view(e){if(c.enabled){const t={type:"VIEW",name:e.name,userSessionId:c.userSessionId,timestamp:Date.now(),data:e};c.events.push(t)}}},p=(0,o.BX)({chains:void 0,walletConnectUri:void 0,isAuth:!1,isCustomDesktop:!1,isCustomMobile:!1,isDataLoaded:!1,isUiLoaded:!1}),u={state:p,subscribe:e=>(0,o.B1)(p,(()=>e(p))),setChains(e){p.chains=e},setWalletConnectUri(e){p.walletConnectUri=e},setIsCustomDesktop(e){p.isCustomDesktop=e},setIsCustomMobile(e){p.isCustomMobile=e},setIsDataLoaded(e){p.isDataLoaded=e},setIsUiLoaded(e){p.isUiLoaded=e},setIsAuth(e){p.isAuth=e}},m=(0,o.BX)({projectId:"",mobileWallets:void 0,desktopWallets:void 0,walletImages:void 0,chains:void 0,enableAuthMode:!1,enableExplorer:!0,explorerExcludedWalletIds:void 0,explorerRecommendedWalletIds:void 0,termsOfServiceUrl:void 0,privacyPolicyUrl:void 0}),h={state:m,subscribe:e=>(0,o.B1)(m,(()=>e(m))),setConfig(e){var t,s;d.initialize(),u.setChains(e.chains),u.setIsAuth(Boolean(e.enableAuthMode)),u.setIsCustomMobile(Boolean(null==(t=e.mobileWallets)?void 0:t.length)),u.setIsCustomDesktop(Boolean(null==(s=e.desktopWallets)?void 0:s.length)),r.setModalVersionInStorage(),Object.assign(m,e)}};var b=Object.defineProperty,v=Object.getOwnPropertySymbols,I=Object.prototype.hasOwnProperty,g=Object.prototype.propertyIsEnumerable,y=(e,t,s)=>t in e?b(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;const f="https://explorer-api.walletconnect.com",C="wcm",w="js-2.6.2";async function W(e,t){const s=((e,t)=>{for(var s in t||(t={}))I.call(t,s)&&y(e,s,t[s]);if(v)for(var s of v(t))g.call(t,s)&&y(e,s,t[s]);return e})({sdkType:C,sdkVersion:w},t),o=new URL(e,f);return o.searchParams.append("projectId",h.state.projectId),Object.entries(s).forEach((([e,t])=>{t&&o.searchParams.append(e,String(t))})),(await fetch(o)).json()}const E=async e=>W("/w3m/v1/getDesktopListings",e),L=async e=>W("/w3m/v1/getMobileListings",e),O=async e=>W("/w3m/v1/getAllListings",e),A=e=>`${f}/w3m/v1/getWalletImage/${e}?projectId=${h.state.projectId}&sdkType=${C}&sdkVersion=${w}`,U=e=>`${f}/w3m/v1/getAssetImage/${e}?projectId=${h.state.projectId}&sdkType=${C}&sdkVersion=${w}`;var D=Object.defineProperty,M=Object.getOwnPropertySymbols,j=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable,N=(e,t,s)=>t in e?D(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;const S=r.isMobile(),T=(0,o.BX)({wallets:{listings:[],total:0,page:1},search:{listings:[],total:0,page:1},recomendedWallets:[]}),B={state:T,async getRecomendedWallets(){const{explorerRecommendedWalletIds:e,explorerExcludedWalletIds:t}=h.state;if("NONE"===e||"ALL"===t&&!e)return T.recomendedWallets;if(r.isArray(e)){const t={recommendedIds:e.join(",")},{listings:s}=await O(t),o=Object.values(s);o.sort(((t,s)=>e.indexOf(t.id)-e.indexOf(s.id))),T.recomendedWallets=o}else{const{chains:e,isAuth:s}=u.state,o=e?.join(","),a=r.isArray(t),n={page:1,sdks:s?"auth_v1":void 0,entries:r.RECOMMENDED_WALLET_AMOUNT,chains:o,version:2,excludedIds:a?t.join(","):void 0},{listings:i}=S?await L(n):await E(n);T.recomendedWallets=Object.values(i)}return T.recomendedWallets},async getWallets(e){const t=((e,t)=>{for(var s in t||(t={}))j.call(t,s)&&N(e,s,t[s]);if(M)for(var s of M(t))k.call(t,s)&&N(e,s,t[s]);return e})({},e),{explorerRecommendedWalletIds:s,explorerExcludedWalletIds:o}=h.state,{recomendedWallets:a}=T;if("ALL"===o)return T.wallets;a.length?t.excludedIds=a.map((e=>e.id)).join(","):r.isArray(s)&&(t.excludedIds=s.join(",")),r.isArray(o)&&(t.excludedIds=[t.excludedIds,o].filter(Boolean).join(",")),u.state.isAuth&&(t.sdks="auth_v1");const{page:n,search:i}=e,{listings:l,total:c}=S?await L(t):await E(t),d=Object.values(l),p=i?"search":"wallets";return T[p]={listings:[...T[p].listings,...d],total:c,page:n??1},{listings:d,total:c}},getWalletImageUrl:e=>A(e),getAssetImageUrl:e=>U(e),resetSearch(){T.search={listings:[],total:0,page:1}}},P=(0,o.BX)({open:!1}),_={state:P,subscribe:e=>(0,o.B1)(P,(()=>e(P))),open:async e=>new Promise((t=>{const{isUiLoaded:s,isDataLoaded:o}=u.state;if(r.removeWalletConnectDeepLink(),u.setWalletConnectUri(e?.uri),u.setChains(e?.chains),i.reset("ConnectWallet"),s&&o)P.open=!0,t();else{const e=setInterval((()=>{const s=u.state;s.isUiLoaded&&s.isDataLoaded&&(clearInterval(e),P.open=!0,t())}),200)}})),close(){P.open=!1}};var x=Object.defineProperty,$=Object.getOwnPropertySymbols,R=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable,V=(e,t,s)=>t in e?x(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;const X=(0,o.BX)({themeMode:typeof matchMedia<"u"&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}),K={state:X,subscribe:e=>(0,o.B1)(X,(()=>e(X))),setThemeConfig(e){const{themeMode:t,themeVariables:s}=e;t&&(X.themeMode=t),s&&(X.themeVariables=((e,t)=>{for(var s in t||(t={}))R.call(t,s)&&V(e,s,t[s]);if($)for(var s of $(t))H.call(t,s)&&V(e,s,t[s]);return e})({},s))}},z=(0,o.BX)({open:!1,message:"",variant:"success"}),J={state:z,subscribe:e=>(0,o.B1)(z,(()=>e(z))),openToast(e,t){z.open=!0,z.message=e,z.variant=t},closeToast(){z.open=!1}}},940:(e,t,s)=>{s.d(t,{WalletConnectModal:()=>a});var o=s(5761);class a{constructor(e){this.openModal=o.D8.open,this.closeModal=o.D8.close,this.subscribeModal=o.D8.subscribe,this.setTheme=o.lH.setThemeConfig,o.lH.setThemeConfig(e),o.mb.setConfig(e),this.initUi()}async initUi(){if(typeof window<"u"){await s.e(34).then(s.bind(s,9034));const e=document.createElement("wcm-modal");document.body.insertAdjacentElement("beforeend",e),o.IN.setIsUiLoaded(!0)}}}}}]);