/*! For license information please see main.js.LICENSE.txt */
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation-duration: 0.2s;
    animation-name: zoom-in;
    animation-fill-mode: backwards;
    animation-timing-function: var(--wui-ease-out-power-2);
    outline: none;
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: none;
      animation-name: slide-in;
    }
  }
`;var c=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};const l="scroll-lock";let u=class extends s.WF{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.open=n.W3.state.open,this.caipAddress=n.AccountController.state.caipAddress,this.isSiweEnabled=n.OptionsController.state.isSiweEnabled,this.connected=n.AccountController.state.isConnected,this.loading=n.W3.state.loading,this.initializeTheming(),n.ApiController.prefetch(),this.unsubscribe.push(n.W3.subscribeKey("open",(e=>e?this.onOpen():this.onClose())),n.W3.subscribeKey("loading",(e=>{this.loading=e,this.onNewAddress(n.AccountController.state.caipAddress)})),n.AccountController.subscribeKey("isConnected",(e=>this.connected=e)),n.AccountController.subscribeKey("caipAddress",(e=>this.onNewAddress(e))),n.OptionsController.subscribeKey("isSiweEnabled",(e=>this.isSiweEnabled=e))),n.En.sendEvent({type:"track",event:"MODAL_LOADED"})}disconnectedCallback(){this.unsubscribe.forEach((e=>e())),this.onRemoveKeyboardListener()}render(){return this.open?s.qy`
          <wui-flex @click=${this.onOverlayClick.bind(this)}>
            <wui-card role="alertdialog" aria-modal="true" tabindex="0">
              <w3m-header></w3m-header>
              <w3m-router></w3m-router>
              <w3m-snackbar></w3m-snackbar>
            </wui-card>
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){if(this.isSiweEnabled){const{SIWEController:e}=await Promise.resolve().then(r.bind(r,8251));"success"!==e.state.status&&await n.ConnectionController.disconnect()}n.W3.close()}initializeTheming(){const{themeVariables:e,themeMode:t}=n.ThemeController.state,r=i.UiHelperUtil.getColorTheme(t);(0,i.initializeTheming)(e,r)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),n.SnackController.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const e=document.createElement("style");e.dataset.w3m=l,e.textContent="\n      html, body {\n        touch-action: none;\n        overflow: hidden;\n        overscroll-behavior: contain;\n      }\n      w3m-modal {\n        pointer-events: auto;\n      }\n    ",document.head.appendChild(e)}onScrollUnlock(){const e=document.head.querySelector(`style[data-w3m="${l}"]`);e&&e.remove()}onAddKeyboardListener(){this.abortController=new AbortController;const e=this.shadowRoot?.querySelector("wui-card");e?.focus(),window.addEventListener("keydown",(t=>{if("Escape"===t.key)this.handleClose();else if("Tab"===t.key){const{tagName:r}=t.target;!r||r.includes("W3M-")||r.includes("WUI-")||e?.focus()}}),this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}async onNewAddress(e){if(!this.connected||this.loading)return;const t=n.wE.getPlainAddress(this.caipAddress),i=n.wE.getPlainAddress(e),s=n.wE.getNetworkId(this.caipAddress),o=n.wE.getNetworkId(e);if(this.caipAddress=e,this.isSiweEnabled){const{SIWEController:e}=await Promise.resolve().then(r.bind(r,8251)),n=await e.getSession();if(n&&t&&i&&t!==i)return void(e.state._client?.options.signOutOnAccountChange&&(await e.signOut(),this.onSiweNavigation()));if(n&&s&&o&&s!==o)return void(e.state._client?.options.signOutOnNetworkChange&&(await e.signOut(),this.onSiweNavigation()));this.onSiweNavigation()}}onSiweNavigation(){this.open?n.RouterController.push("ConnectingSiwe"):n.W3.open({view:"ConnectingSiwe"})}};u.styles=a,c([(0,o.wk)()],u.prototype,"open",void 0),c([(0,o.wk)()],u.prototype,"caipAddress",void 0),c([(0,o.wk)()],u.prototype,"isSiweEnabled",void 0),c([(0,o.wk)()],u.prototype,"connected",void 0),c([(0,o.wk)()],u.prototype,"loading",void 0),u=c([(0,i.customElement)("w3m-modal")],u)},8251:(e,t,r)=>{"use strict";r.d(t,{SIWEController:()=>pn,nW:()=>xn,hw:()=>ln,getDidAddress:()=>cn,getDidChainId:()=>an});var n=r(2088),i=r(8917);const s={FIVE_MINUTES_IN_MS:3e5};class o{constructor(e){const{enabled:t=!0,nonceRefetchIntervalMs:r=s.FIVE_MINUTES_IN_MS,sessionRefetchIntervalMs:n=s.FIVE_MINUTES_IN_MS,signOutOnAccountChange:i=!0,signOutOnDisconnect:o=!0,signOutOnNetworkChange:a=!0,...c}=e;this.options={enabled:t,nonceRefetchIntervalMs:r,sessionRefetchIntervalMs:n,signOutOnDisconnect:o,signOutOnAccountChange:i,signOutOnNetworkChange:a},this.methods=c}async getNonce(e){const t=await this.methods.getNonce(e);if(!t)throw new Error("siweControllerClient:getNonce - nonce is undefined");return t}async getMessageParams(){return await this.methods.getMessageParams()||{}}createMessage(e){const t=this.methods.createMessage(e);if(!t)throw new Error("siweControllerClient:createMessage - message is undefined");return t}async verifyMessage(e){return await this.methods.verifyMessage(e)}async getSession(){const e=await this.methods.getSession();if(!e)throw new Error("siweControllerClient:getSession - session is undefined");return e}async signIn(){const{address:e}=n.AccountController.state,t=await this.methods.getNonce(e);if(!e)throw new Error("An address is required to create a SIWE message.");const r=i.LX.caipNetworkIdToNumber(n.NetworkController.state.caipNetwork?.id);if(!r)throw new Error("A chainId is required to create a SIWE message.");const s=await this.getMessageParams(),o=this.methods.createMessage({address:`eip155:${r}:${e}`,chainId:r,nonce:t,version:"1",iat:s.iat||(new Date).toISOString(),...s});"AUTH"===n.iT.getConnectedConnector()&&n.RouterController.pushTransactionStack({view:null,goBack:!1,replace:!0,onCancel(){n.RouterController.replace("ConnectingSiwe")}});const a=await n.ConnectionController.signMessage(o);if(!await this.methods.verifyMessage({message:o,signature:a}))throw new Error("Error verifying SIWE signature");const c=await this.methods.getSession();if(!c)throw new Error("Error verifying SIWE signature");return this.methods.onSignIn&&this.methods.onSignIn(c),n.aS.navigateAfterNetworkSwitch(),c}async signOut(){return this.methods.onSignOut?.(),this.methods.signOut()}}r(8900),r(8196),r(2063),r(6663),r(1612),r(6804),r(7052),r(204),r(774),r(4117),r(7302),r(3228);var a=r(5606),c=r(6763),l=r(8287).Buffer;Object.defineProperty,Object.getOwnPropertySymbols,Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable;var u,h=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof r.g<"u"?r.g:typeof self<"u"?self:{};u={exports:{}},function(){var e="input is invalid type",t="object"==typeof window,r=t?window:{};r.JS_SHA3_NO_WINDOW&&(t=!1);var n=!t&&"object"==typeof self;!r.JS_SHA3_NO_NODE_JS&&"object"==typeof a&&a.versions&&a.versions.node?r=h:n&&(r=self);var i=!r.JS_SHA3_NO_COMMON_JS&&u.exports,s=!r.JS_SHA3_NO_ARRAY_BUFFER&&typeof ArrayBuffer<"u",o="0123456789abcdef".split(""),c=[4,1024,262144,67108864],l=[0,8,16,24],d=[1,0,32898,0,32906,2147483648,2147516416,2147483648,32907,0,2147483649,0,2147516545,2147483648,32777,2147483648,138,0,136,0,2147516425,0,2147483658,0,2147516555,0,139,2147483648,32905,2147483648,32771,2147483648,32770,2147483648,128,2147483648,32778,0,2147483658,2147483648,2147516545,2147483648,32896,2147483648,2147483649,0,2147516424,2147483648],f=[224,256,384,512],p=[128,256],g=["hex","buffer","arrayBuffer","array","digest"],m={128:168,256:136};(r.JS_SHA3_NO_NODE_JS||!Array.isArray)&&(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),s&&(r.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW||!ArrayBuffer.isView)&&(ArrayBuffer.isView=function(e){return"object"==typeof e&&e.buffer&&e.buffer.constructor===ArrayBuffer});for(var y=function(e,t,r){return function(n){return new O(e,t,e).update(n)[r]()}},w=function(e,t,r){return function(n,i){return new O(e,t,i).update(n)[r]()}},b=function(e,t,r){return function(t,n,i,s){return C["cshake"+e].update(t,n,i,s)[r]()}},v=function(e,t,r){return function(t,n,i,s){return C["kmac"+e].update(t,n,i,s)[r]()}},A=function(e,t,r,n){for(var i=0;i<g.length;++i){var s=g[i];e[s]=t(r,n,s)}return e},E=function(e,t){var r=y(e,t,"hex");return r.create=function(){return new O(e,t,e)},r.update=function(e){return r.create().update(e)},A(r,y,e,t)},x=[{name:"keccak",padding:[1,256,65536,16777216],bits:f,createMethod:E},{name:"sha3",padding:[6,1536,393216,100663296],bits:f,createMethod:E},{name:"shake",padding:[31,7936,2031616,520093696],bits:p,createMethod:function(e,t){var r=w(e,t,"hex");return r.create=function(r){return new O(e,t,r)},r.update=function(e,t){return r.create(t).update(e)},A(r,w,e,t)}},{name:"cshake",padding:c,bits:p,createMethod:function(e,t){var r=m[e],n=b(e,0,"hex");return n.create=function(n,i,s){return i||s?new O(e,t,n).bytepad([i,s],r):C["shake"+e].create(n)},n.update=function(e,t,r,i){return n.create(t,r,i).update(e)},A(n,b,e,t)}},{name:"kmac",padding:c,bits:p,createMethod:function(e,t){var r=m[e],n=v(e,0,"hex");return n.create=function(n,i,s){return new R(e,t,i).bytepad(["KMAC",s],r).bytepad([n],r)},n.update=function(e,t,r,i){return n.create(e,r,i).update(t)},A(n,v,e,t)}}],C={},S=[],k=0;k<x.length;++k)for(var _=x[k],I=_.bits,M=0;M<I.length;++M){var T=_.name+"_"+I[M];if(S.push(T),C[T]=_.createMethod(I[M],_.padding),"sha3"!==_.name){var P=_.name+I[M];S.push(P),C[P]=C[T]}}function O(e,t,r){this.blocks=[],this.s=[],this.padding=t,this.outputBits=r,this.reset=!0,this.finalized=!1,this.block=0,this.start=0,this.blockCount=1600-(e<<1)>>5,this.byteCount=this.blockCount<<2,this.outputBlocks=r>>5,this.extraBytes=(31&r)>>3;for(var n=0;n<50;++n)this.s[n]=0}function R(e,t,r){O.call(this,e,t,r)}O.prototype.update=function(t){if(this.finalized)throw new Error("finalize already called");var r,n=typeof t;if("string"!==n){if("object"!==n)throw new Error(e);if(null===t)throw new Error(e);if(s&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||s&&ArrayBuffer.isView(t)))throw new Error(e);r=!0}for(var i,o,a=this.blocks,c=this.byteCount,u=t.length,h=this.blockCount,d=0,f=this.s;d<u;){if(this.reset)for(this.reset=!1,a[0]=this.block,i=1;i<h+1;++i)a[i]=0;if(r)for(i=this.start;d<u&&i<c;++d)a[i>>2]|=t[d]<<l[3&i++];else for(i=this.start;d<u&&i<c;++d)(o=t.charCodeAt(d))<128?a[i>>2]|=o<<l[3&i++]:o<2048?(a[i>>2]|=(192|o>>6)<<l[3&i++],a[i>>2]|=(128|63&o)<<l[3&i++]):o<55296||o>=57344?(a[i>>2]|=(224|o>>12)<<l[3&i++],a[i>>2]|=(128|o>>6&63)<<l[3&i++],a[i>>2]|=(128|63&o)<<l[3&i++]):(o=65536+((1023&o)<<10|1023&t.charCodeAt(++d)),a[i>>2]|=(240|o>>18)<<l[3&i++],a[i>>2]|=(128|o>>12&63)<<l[3&i++],a[i>>2]|=(128|o>>6&63)<<l[3&i++],a[i>>2]|=(128|63&o)<<l[3&i++]);if(this.lastByteIndex=i,i>=c){for(this.start=i-c,this.block=a[h],i=0;i<h;++i)f[i]^=a[i];N(f),this.reset=!0}else this.start=i}return this},O.prototype.encode=function(e,t){var r=255&e,n=1,i=[r];for(r=255&(e>>=8);r>0;)i.unshift(r),r=255&(e>>=8),++n;return t?i.push(n):i.unshift(n),this.update(i),i.length},O.prototype.encodeString=function(t){var r,n=typeof t;if("string"!==n){if("object"!==n)throw new Error(e);if(null===t)throw new Error(e);if(s&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||s&&ArrayBuffer.isView(t)))throw new Error(e);r=!0}var i=0,o=t.length;if(r)i=o;else for(var a=0;a<t.length;++a){var c=t.charCodeAt(a);c<128?i+=1:c<2048?i+=2:c<55296||c>=57344?i+=3:(c=65536+((1023&c)<<10|1023&t.charCodeAt(++a)),i+=4)}return i+=this.encode(8*i),this.update(t),i},O.prototype.bytepad=function(e,t){for(var r=this.encode(t),n=0;n<e.length;++n)r+=this.encodeString(e[n]);var i=t-r%t,s=[];return s.length=i,this.update(s),this},O.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var e=this.blocks,t=this.lastByteIndex,r=this.blockCount,n=this.s;if(e[t>>2]|=this.padding[3&t],this.lastByteIndex===this.byteCount)for(e[0]=e[r],t=1;t<r+1;++t)e[t]=0;for(e[r-1]|=2147483648,t=0;t<r;++t)n[t]^=e[t];N(n)}},O.prototype.toString=O.prototype.hex=function(){this.finalize();for(var e,t=this.blockCount,r=this.s,n=this.outputBlocks,i=this.extraBytes,s=0,a=0,c="";a<n;){for(s=0;s<t&&a<n;++s,++a)e=r[s],c+=o[e>>4&15]+o[15&e]+o[e>>12&15]+o[e>>8&15]+o[e>>20&15]+o[e>>16&15]+o[e>>28&15]+o[e>>24&15];a%t==0&&(N(r),s=0)}return i&&(e=r[s],c+=o[e>>4&15]+o[15&e],i>1&&(c+=o[e>>12&15]+o[e>>8&15]),i>2&&(c+=o[e>>20&15]+o[e>>16&15])),c},O.prototype.arrayBuffer=function(){this.finalize();var e,t=this.blockCount,r=this.s,n=this.outputBlocks,i=this.extraBytes,s=0,o=0,a=this.outputBits>>3;e=i?new ArrayBuffer(n+1<<2):new ArrayBuffer(a);for(var c=new Uint32Array(e);o<n;){for(s=0;s<t&&o<n;++s,++o)c[o]=r[s];o%t==0&&N(r)}return i&&(c[s]=r[s],e=e.slice(0,a)),e},O.prototype.buffer=O.prototype.arrayBuffer,O.prototype.digest=O.prototype.array=function(){this.finalize();for(var e,t,r=this.blockCount,n=this.s,i=this.outputBlocks,s=this.extraBytes,o=0,a=0,c=[];a<i;){for(o=0;o<r&&a<i;++o,++a)e=a<<2,t=n[o],c[e]=255&t,c[e+1]=t>>8&255,c[e+2]=t>>16&255,c[e+3]=t>>24&255;a%r==0&&N(n)}return s&&(e=a<<2,t=n[o],c[e]=255&t,s>1&&(c[e+1]=t>>8&255),s>2&&(c[e+2]=t>>16&255)),c},R.prototype=new O,R.prototype.finalize=function(){return this.encode(this.outputBits,!0),O.prototype.finalize.call(this)};var N=function(e){var t,r,n,i,s,o,a,c,l,u,h,f,p,g,m,y,w,b,v,A,E,x,C,S,k,_,I,M,T,P,O,R,N,B,U,D,L,F,j,H,z,q,$,W,G,V,K,Z,Q,J,Y,X,ee,te,re,ne,ie,se,oe,ae,ce,le,ue;for(n=0;n<48;n+=2)i=e[0]^e[10]^e[20]^e[30]^e[40],s=e[1]^e[11]^e[21]^e[31]^e[41],o=e[2]^e[12]^e[22]^e[32]^e[42],a=e[3]^e[13]^e[23]^e[33]^e[43],c=e[4]^e[14]^e[24]^e[34]^e[44],l=e[5]^e[15]^e[25]^e[35]^e[45],u=e[6]^e[16]^e[26]^e[36]^e[46],h=e[7]^e[17]^e[27]^e[37]^e[47],t=(f=e[8]^e[18]^e[28]^e[38]^e[48])^(o<<1|a>>>31),r=(p=e[9]^e[19]^e[29]^e[39]^e[49])^(a<<1|o>>>31),e[0]^=t,e[1]^=r,e[10]^=t,e[11]^=r,e[20]^=t,e[21]^=r,e[30]^=t,e[31]^=r,e[40]^=t,e[41]^=r,t=i^(c<<1|l>>>31),r=s^(l<<1|c>>>31),e[2]^=t,e[3]^=r,e[12]^=t,e[13]^=r,e[22]^=t,e[23]^=r,e[32]^=t,e[33]^=r,e[42]^=t,e[43]^=r,t=o^(u<<1|h>>>31),r=a^(h<<1|u>>>31),e[4]^=t,e[5]^=r,e[14]^=t,e[15]^=r,e[24]^=t,e[25]^=r,e[34]^=t,e[35]^=r,e[44]^=t,e[45]^=r,t=c^(f<<1|p>>>31),r=l^(p<<1|f>>>31),e[6]^=t,e[7]^=r,e[16]^=t,e[17]^=r,e[26]^=t,e[27]^=r,e[36]^=t,e[37]^=r,e[46]^=t,e[47]^=r,t=u^(i<<1|s>>>31),r=h^(s<<1|i>>>31),e[8]^=t,e[9]^=r,e[18]^=t,e[19]^=r,e[28]^=t,e[29]^=r,e[38]^=t,e[39]^=r,e[48]^=t,e[49]^=r,g=e[0],m=e[1],V=e[11]<<4|e[10]>>>28,K=e[10]<<4|e[11]>>>28,M=e[20]<<3|e[21]>>>29,T=e[21]<<3|e[20]>>>29,ae=e[31]<<9|e[30]>>>23,ce=e[30]<<9|e[31]>>>23,q=e[40]<<18|e[41]>>>14,$=e[41]<<18|e[40]>>>14,B=e[2]<<1|e[3]>>>31,U=e[3]<<1|e[2]>>>31,y=e[13]<<12|e[12]>>>20,w=e[12]<<12|e[13]>>>20,Z=e[22]<<10|e[23]>>>22,Q=e[23]<<10|e[22]>>>22,P=e[33]<<13|e[32]>>>19,O=e[32]<<13|e[33]>>>19,le=e[42]<<2|e[43]>>>30,ue=e[43]<<2|e[42]>>>30,te=e[5]<<30|e[4]>>>2,re=e[4]<<30|e[5]>>>2,D=e[14]<<6|e[15]>>>26,L=e[15]<<6|e[14]>>>26,b=e[25]<<11|e[24]>>>21,v=e[24]<<11|e[25]>>>21,J=e[34]<<15|e[35]>>>17,Y=e[35]<<15|e[34]>>>17,R=e[45]<<29|e[44]>>>3,N=e[44]<<29|e[45]>>>3,S=e[6]<<28|e[7]>>>4,k=e[7]<<28|e[6]>>>4,ne=e[17]<<23|e[16]>>>9,ie=e[16]<<23|e[17]>>>9,F=e[26]<<25|e[27]>>>7,j=e[27]<<25|e[26]>>>7,A=e[36]<<21|e[37]>>>11,E=e[37]<<21|e[36]>>>11,X=e[47]<<24|e[46]>>>8,ee=e[46]<<24|e[47]>>>8,W=e[8]<<27|e[9]>>>5,G=e[9]<<27|e[8]>>>5,_=e[18]<<20|e[19]>>>12,I=e[19]<<20|e[18]>>>12,se=e[29]<<7|e[28]>>>25,oe=e[28]<<7|e[29]>>>25,H=e[38]<<8|e[39]>>>24,z=e[39]<<8|e[38]>>>24,x=e[48]<<14|e[49]>>>18,C=e[49]<<14|e[48]>>>18,e[0]=g^~y&b,e[1]=m^~w&v,e[10]=S^~_&M,e[11]=k^~I&T,e[20]=B^~D&F,e[21]=U^~L&j,e[30]=W^~V&Z,e[31]=G^~K&Q,e[40]=te^~ne&se,e[41]=re^~ie&oe,e[2]=y^~b&A,e[3]=w^~v&E,e[12]=_^~M&P,e[13]=I^~T&O,e[22]=D^~F&H,e[23]=L^~j&z,e[32]=V^~Z&J,e[33]=K^~Q&Y,e[42]=ne^~se&ae,e[43]=ie^~oe&ce,e[4]=b^~A&x,e[5]=v^~E&C,e[14]=M^~P&R,e[15]=T^~O&N,e[24]=F^~H&q,e[25]=j^~z&$,e[34]=Z^~J&X,e[35]=Q^~Y&ee,e[44]=se^~ae&le,e[45]=oe^~ce&ue,e[6]=A^~x&g,e[7]=E^~C&m,e[16]=P^~R&S,e[17]=O^~N&k,e[26]=H^~q&B,e[27]=z^~$&U,e[36]=J^~X&W,e[37]=Y^~ee&G,e[46]=ae^~le&te,e[47]=ce^~ue&re,e[8]=x^~g&y,e[9]=C^~m&w,e[18]=R^~S&_,e[19]=N^~k&I,e[28]=q^~B&D,e[29]=$^~U&L,e[38]=X^~W&V,e[39]=ee^~G&K,e[48]=le^~te&ne,e[49]=ue^~re&ie,e[0]^=d[n],e[1]^=d[n+1]};if(i)u.exports=C;else for(k=0;k<S.length;++k)r[S[k]]=C[S[k]]}();let d=!1,f=!1;const p={debug:1,default:2,info:2,warning:3,error:4,off:5};let g=p.default,m=null;const y=function(){try{const e=[];if(["NFD","NFC","NFKD","NFKC"].forEach((t=>{try{if("test"!=="test".normalize(t))throw new Error("bad normalize")}catch{e.push(t)}})),e.length)throw new Error("missing "+e.join(", "));if(String.fromCharCode(233).normalize("NFD")!==String.fromCharCode(101,769))throw new Error("broken implementation")}catch(e){return e.message}return null}();var w,b;!function(e){e.DEBUG="DEBUG",e.INFO="INFO",e.WARNING="WARNING",e.ERROR="ERROR",e.OFF="OFF"}(w||(w={})),function(e){e.UNKNOWN_ERROR="UNKNOWN_ERROR",e.NOT_IMPLEMENTED="NOT_IMPLEMENTED",e.UNSUPPORTED_OPERATION="UNSUPPORTED_OPERATION",e.NETWORK_ERROR="NETWORK_ERROR",e.SERVER_ERROR="SERVER_ERROR",e.TIMEOUT="TIMEOUT",e.BUFFER_OVERRUN="BUFFER_OVERRUN",e.NUMERIC_FAULT="NUMERIC_FAULT",e.MISSING_NEW="MISSING_NEW",e.INVALID_ARGUMENT="INVALID_ARGUMENT",e.MISSING_ARGUMENT="MISSING_ARGUMENT",e.UNEXPECTED_ARGUMENT="UNEXPECTED_ARGUMENT",e.CALL_EXCEPTION="CALL_EXCEPTION",e.INSUFFICIENT_FUNDS="INSUFFICIENT_FUNDS",e.NONCE_EXPIRED="NONCE_EXPIRED",e.REPLACEMENT_UNDERPRICED="REPLACEMENT_UNDERPRICED",e.UNPREDICTABLE_GAS_LIMIT="UNPREDICTABLE_GAS_LIMIT",e.TRANSACTION_REPLACED="TRANSACTION_REPLACED",e.ACTION_REJECTED="ACTION_REJECTED"}(b||(b={}));const v="0123456789abcdef";class A{constructor(e){Object.defineProperty(this,"version",{enumerable:!0,value:e,writable:!1})}_log(e,t){const r=e.toLowerCase();null==p[r]&&this.throwArgumentError("invalid log level name","logLevel",e),!(g>p[r])&&c.log.apply(c,t)}debug(...e){this._log(A.levels.DEBUG,e)}info(...e){this._log(A.levels.INFO,e)}warn(...e){this._log(A.levels.WARNING,e)}makeError(e,t,r){if(f)return this.makeError("censored error",t,{});t||(t=A.errors.UNKNOWN_ERROR),r||(r={});const n=[];Object.keys(r).forEach((e=>{const t=r[e];try{if(t instanceof Uint8Array){let r="";for(let e=0;e<t.length;e++)r+=v[t[e]>>4],r+=v[15&t[e]];n.push(e+"=Uint8Array(0x"+r+")")}else n.push(e+"="+JSON.stringify(t))}catch{n.push(e+"="+JSON.stringify(r[e].toString()))}})),n.push(`code=${t}`),n.push(`version=${this.version}`);const i=e;let s="";switch(t){case b.NUMERIC_FAULT:{s="NUMERIC_FAULT";const t=e;switch(t){case"overflow":case"underflow":case"division-by-zero":s+="-"+t;break;case"negative-power":case"negative-width":s+="-unsupported";break;case"unbound-bitwise-result":s+="-unbound-result"}break}case b.CALL_EXCEPTION:case b.INSUFFICIENT_FUNDS:case b.MISSING_NEW:case b.NONCE_EXPIRED:case b.REPLACEMENT_UNDERPRICED:case b.TRANSACTION_REPLACED:case b.UNPREDICTABLE_GAS_LIMIT:s=t}s&&(e+=" [ See: https://links.ethers.org/v5-errors-"+s+" ]"),n.length&&(e+=" ("+n.join(", ")+")");const o=new Error(e);return o.reason=i,o.code=t,Object.keys(r).forEach((function(e){o[e]=r[e]})),o}throwError(e,t,r){throw this.makeError(e,t,r)}throwArgumentError(e,t,r){return this.throwError(e,A.errors.INVALID_ARGUMENT,{argument:t,value:r})}assert(e,t,r,n){e||this.throwError(t,r,n)}assertArgument(e,t,r,n){e||this.throwArgumentError(t,r,n)}checkNormalize(e){y&&this.throwError("platform missing String.prototype.normalize",A.errors.UNSUPPORTED_OPERATION,{operation:"String.prototype.normalize",form:y})}checkSafeUint53(e,t){"number"==typeof e&&(null==t&&(t="value not safe"),(e<0||e>=9007199254740991)&&this.throwError(t,A.errors.NUMERIC_FAULT,{operation:"checkSafeInteger",fault:"out-of-safe-range",value:e}),e%1&&this.throwError(t,A.errors.NUMERIC_FAULT,{operation:"checkSafeInteger",fault:"non-integer",value:e}))}checkArgumentCount(e,t,r){r=r?": "+r:"",e<t&&this.throwError("missing argument"+r,A.errors.MISSING_ARGUMENT,{count:e,expectedCount:t}),e>t&&this.throwError("too many arguments"+r,A.errors.UNEXPECTED_ARGUMENT,{count:e,expectedCount:t})}checkNew(e,t){(e===Object||null==e)&&this.throwError("missing new",A.errors.MISSING_NEW,{name:t.name})}checkAbstract(e,t){e===t?this.throwError("cannot instantiate abstract class "+JSON.stringify(t.name)+" directly; use a sub-class",A.errors.UNSUPPORTED_OPERATION,{name:e.name,operation:"new"}):(e===Object||null==e)&&this.throwError("missing new",A.errors.MISSING_NEW,{name:t.name})}static globalLogger(){return m||(m=new A("logger/5.7.0")),m}static setCensorship(e,t){if(!e&&t&&this.globalLogger().throwError("cannot permanently disable censorship",A.errors.UNSUPPORTED_OPERATION,{operation:"setCensorship"}),d){if(!e)return;this.globalLogger().throwError("error censorship permanent",A.errors.UNSUPPORTED_OPERATION,{operation:"setCensorship"})}f=!!e,d=!!t}static setLogLevel(e){const t=p[e.toLowerCase()];null!=t?g=t:A.globalLogger().warn("invalid log level - "+e)}static from(e){return new A(e)}}A.errors=b,A.levels=w;const E=new A("bytes/5.7.0");function x(e){return!!e.toHexString}function C(e){return e.slice||(e.slice=function(){const t=Array.prototype.slice.call(arguments);return C(new Uint8Array(Array.prototype.slice.apply(e,t)))}),e}function S(e){return"number"==typeof e&&e==e&&e%1==0}function k(e){if(null==e)return!1;if(e.constructor===Uint8Array)return!0;if("string"==typeof e||!S(e.length)||e.length<0)return!1;for(let t=0;t<e.length;t++){const r=e[t];if(!S(r)||r<0||r>=256)return!1}return!0}function _(e,t){if(t||(t={}),"number"==typeof e){E.checkSafeUint53(e,"invalid arrayify value");const t=[];for(;e;)t.unshift(255&e),e=parseInt(String(e/256));return 0===t.length&&t.push(0),C(new Uint8Array(t))}if(t.allowMissingPrefix&&"string"==typeof e&&"0x"!==e.substring(0,2)&&(e="0x"+e),x(e)&&(e=e.toHexString()),I(e)){let r=e.substring(2);r.length%2&&("left"===t.hexPad?r="0"+r:"right"===t.hexPad?r+="0":E.throwArgumentError("hex data is odd-length","value",e));const n=[];for(let e=0;e<r.length;e+=2)n.push(parseInt(r.substring(e,e+2),16));return C(new Uint8Array(n))}return k(e)?C(new Uint8Array(e)):E.throwArgumentError("invalid arrayify value","value",e)}function I(e,t){return!("string"!=typeof e||!e.match(/^0x[0-9A-Fa-f]*$/)||t&&e.length!==2+2*t)}const M="0123456789abcdef";function T(e,t){if(t||(t={}),"number"==typeof e){E.checkSafeUint53(e,"invalid hexlify value");let t="";for(;e;)t=M[15&e]+t,e=Math.floor(e/16);return t.length?(t.length%2&&(t="0"+t),"0x"+t):"0x00"}if("bigint"==typeof e)return(e=e.toString(16)).length%2?"0x0"+e:"0x"+e;if(t.allowMissingPrefix&&"string"==typeof e&&"0x"!==e.substring(0,2)&&(e="0x"+e),x(e))return e.toHexString();if(I(e))return e.length%2&&("left"===t.hexPad?e="0x0"+e.substring(2):"right"===t.hexPad?e+="0":E.throwArgumentError("hex data is odd-length","value",e)),e.toLowerCase();if(k(e)){let t="0x";for(let r=0;r<e.length;r++){let n=e[r];t+=M[(240&n)>>4]+M[15&n]}return t}return E.throwArgumentError("invalid hexlify value","value",e)}function P(e,t){for("string"!=typeof e?e=T(e):I(e)||E.throwArgumentError("invalid hex string","value",e),e.length>2*t+2&&E.throwArgumentError("value out of range","value",arguments[1]);e.length<2*t+2;)e="0x0"+e.substring(2);return e}var O={exports:{}},R=function(e){var t=e.default;if("function"==typeof t){var r=function(){return t.apply(this,arguments)};r.prototype=t.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(e).forEach((function(t){var n=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,n.get?n:{enumerable:!0,get:function(){return e[t]}})})),r}(Object.freeze({__proto__:null,default:{}}));!function(e){!function(e,t){function r(e,t){if(!e)throw new Error(t||"Assertion failed")}function n(e,t){e.super_=t;var r=function(){};r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}function i(e,t,r){if(i.isBN(e))return e;this.negative=0,this.words=null,this.length=0,this.red=null,null!==e&&(("le"===t||"be"===t)&&(r=t,t=10),this._init(e||0,t||10,r||"be"))}var s;"object"==typeof e?e.exports=i:t.BN=i,i.BN=i,i.wordSize=26;try{s=typeof window<"u"&&typeof window.Buffer<"u"?window.Buffer:R.Buffer}catch{}function o(e,t){var n=e.charCodeAt(t);return n>=48&&n<=57?n-48:n>=65&&n<=70?n-55:n>=97&&n<=102?n-87:void r(!1,"Invalid character in "+e)}function a(e,t,r){var n=o(e,r);return r-1>=t&&(n|=o(e,r-1)<<4),n}function c(e,t,n,i){for(var s=0,o=0,a=Math.min(e.length,n),c=t;c<a;c++){var l=e.charCodeAt(c)-48;s*=i,o=l>=49?l-49+10:l>=17?l-17+10:l,r(l>=0&&o<i,"Invalid character"),s+=o}return s}function l(e,t){e.words=t.words,e.length=t.length,e.negative=t.negative,e.red=t.red}if(i.isBN=function(e){return e instanceof i||null!==e&&"object"==typeof e&&e.constructor.wordSize===i.wordSize&&Array.isArray(e.words)},i.max=function(e,t){return e.cmp(t)>0?e:t},i.min=function(e,t){return e.cmp(t)<0?e:t},i.prototype._init=function(e,t,n){if("number"==typeof e)return this._initNumber(e,t,n);if("object"==typeof e)return this._initArray(e,t,n);"hex"===t&&(t=16),r(t===(0|t)&&t>=2&&t<=36);var i=0;"-"===(e=e.toString().replace(/\s+/g,""))[0]&&(i++,this.negative=1),i<e.length&&(16===t?this._parseHex(e,i,n):(this._parseBase(e,t,i),"le"===n&&this._initArray(this.toArray(),t,n)))},i.prototype._initNumber=function(e,t,n){e<0&&(this.negative=1,e=-e),e<67108864?(this.words=[67108863&e],this.length=1):e<4503599627370496?(this.words=[67108863&e,e/67108864&67108863],this.length=2):(r(e<9007199254740992),this.words=[67108863&e,e/67108864&67108863,1],this.length=3),"le"===n&&this._initArray(this.toArray(),t,n)},i.prototype._initArray=function(e,t,n){if(r("number"==typeof e.length),e.length<=0)return this.words=[0],this.length=1,this;this.length=Math.ceil(e.length/3),this.words=new Array(this.length);for(var i=0;i<this.length;i++)this.words[i]=0;var s,o,a=0;if("be"===n)for(i=e.length-1,s=0;i>=0;i-=3)o=e[i]|e[i-1]<<8|e[i-2]<<16,this.words[s]|=o<<a&67108863,this.words[s+1]=o>>>26-a&67108863,(a+=24)>=26&&(a-=26,s++);else if("le"===n)for(i=0,s=0;i<e.length;i+=3)o=e[i]|e[i+1]<<8|e[i+2]<<16,this.words[s]|=o<<a&67108863,this.words[s+1]=o>>>26-a&67108863,(a+=24)>=26&&(a-=26,s++);return this._strip()},i.prototype._parseHex=function(e,t,r){this.length=Math.ceil((e.length-t)/6),this.words=new Array(this.length);for(var n=0;n<this.length;n++)this.words[n]=0;var i,s=0,o=0;if("be"===r)for(n=e.length-1;n>=t;n-=2)i=a(e,t,n)<<s,this.words[o]|=67108863&i,s>=18?(s-=18,o+=1,this.words[o]|=i>>>26):s+=8;else for(n=(e.length-t)%2==0?t+1:t;n<e.length;n+=2)i=a(e,t,n)<<s,this.words[o]|=67108863&i,s>=18?(s-=18,o+=1,this.words[o]|=i>>>26):s+=8;this._strip()},i.prototype._parseBase=function(e,t,r){this.words=[0],this.length=1;for(var n=0,i=1;i<=67108863;i*=t)n++;n--,i=i/t|0;for(var s=e.length-r,o=s%n,a=Math.min(s,s-o)+r,l=0,u=r;u<a;u+=n)l=c(e,u,u+n,t),this.imuln(i),this.words[0]+l<67108864?this.words[0]+=l:this._iaddn(l);if(0!==o){var h=1;for(l=c(e,u,e.length,t),u=0;u<o;u++)h*=t;this.imuln(h),this.words[0]+l<67108864?this.words[0]+=l:this._iaddn(l)}this._strip()},i.prototype.copy=function(e){e.words=new Array(this.length);for(var t=0;t<this.length;t++)e.words[t]=this.words[t];e.length=this.length,e.negative=this.negative,e.red=this.red},i.prototype._move=function(e){l(e,this)},i.prototype.clone=function(){var e=new i(null);return this.copy(e),e},i.prototype._expand=function(e){for(;this.length<e;)this.words[this.length++]=0;return this},i.prototype._strip=function(){for(;this.length>1&&0===this.words[this.length-1];)this.length--;return this._normSign()},i.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.negative=0),this},typeof Symbol<"u"&&"function"==typeof Symbol.for)try{i.prototype[Symbol.for("nodejs.util.inspect.custom")]=u}catch{i.prototype.inspect=u}else i.prototype.inspect=u;function u(){return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"}var h=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],d=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],f=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];function p(e,t,r){r.negative=t.negative^e.negative;var n=e.length+t.length|0;r.length=n,n=n-1|0;var i=0|e.words[0],s=0|t.words[0],o=i*s,a=67108863&o,c=o/67108864|0;r.words[0]=a;for(var l=1;l<n;l++){for(var u=c>>>26,h=67108863&c,d=Math.min(l,t.length-1),f=Math.max(0,l-e.length+1);f<=d;f++){var p=l-f|0;u+=(o=(i=0|e.words[p])*(s=0|t.words[f])+h)/67108864|0,h=67108863&o}r.words[l]=0|h,c=0|u}return 0!==c?r.words[l]=0|c:r.length--,r._strip()}i.prototype.toString=function(e,t){var n;if(t=0|t||1,16===(e=e||10)||"hex"===e){n="";for(var i=0,s=0,o=0;o<this.length;o++){var a=this.words[o],c=(16777215&(a<<i|s)).toString(16);s=a>>>24-i&16777215,(i+=2)>=26&&(i-=26,o--),n=0!==s||o!==this.length-1?h[6-c.length]+c+n:c+n}for(0!==s&&(n=s.toString(16)+n);n.length%t!=0;)n="0"+n;return 0!==this.negative&&(n="-"+n),n}if(e===(0|e)&&e>=2&&e<=36){var l=d[e],u=f[e];n="";var p=this.clone();for(p.negative=0;!p.isZero();){var g=p.modrn(u).toString(e);n=(p=p.idivn(u)).isZero()?g+n:h[l-g.length]+g+n}for(this.isZero()&&(n="0"+n);n.length%t!=0;)n="0"+n;return 0!==this.negative&&(n="-"+n),n}r(!1,"Base should be between 2 and 36")},i.prototype.toNumber=function(){var e=this.words[0];return 2===this.length?e+=67108864*this.words[1]:3===this.length&&1===this.words[2]?e+=4503599627370496+67108864*this.words[1]:this.length>2&&r(!1,"Number can only safely store up to 53 bits"),0!==this.negative?-e:e},i.prototype.toJSON=function(){return this.toString(16,2)},s&&(i.prototype.toBuffer=function(e,t){return this.toArrayLike(s,e,t)}),i.prototype.toArray=function(e,t){return this.toArrayLike(Array,e,t)},i.prototype.toArrayLike=function(e,t,n){this._strip();var i=this.byteLength(),s=n||Math.max(1,i);r(i<=s,"byte array longer than desired length"),r(s>0,"Requested array length <= 0");var o=function(e,t){return e.allocUnsafe?e.allocUnsafe(t):new e(t)}(e,s);return this["_toArrayLike"+("le"===t?"LE":"BE")](o,i),o},i.prototype._toArrayLikeLE=function(e,t){for(var r=0,n=0,i=0,s=0;i<this.length;i++){var o=this.words[i]<<s|n;e[r++]=255&o,r<e.length&&(e[r++]=o>>8&255),r<e.length&&(e[r++]=o>>16&255),6===s?(r<e.length&&(e[r++]=o>>24&255),n=0,s=0):(n=o>>>24,s+=2)}if(r<e.length)for(e[r++]=n;r<e.length;)e[r++]=0},i.prototype._toArrayLikeBE=function(e,t){for(var r=e.length-1,n=0,i=0,s=0;i<this.length;i++){var o=this.words[i]<<s|n;e[r--]=255&o,r>=0&&(e[r--]=o>>8&255),r>=0&&(e[r--]=o>>16&255),6===s?(r>=0&&(e[r--]=o>>24&255),n=0,s=0):(n=o>>>24,s+=2)}if(r>=0)for(e[r--]=n;r>=0;)e[r--]=0},Math.clz32?i.prototype._countBits=function(e){return 32-Math.clz32(e)}:i.prototype._countBits=function(e){var t=e,r=0;return t>=4096&&(r+=13,t>>>=13),t>=64&&(r+=7,t>>>=7),t>=8&&(r+=4,t>>>=4),t>=2&&(r+=2,t>>>=2),r+t},i.prototype._zeroBits=function(e){if(0===e)return 26;var t=e,r=0;return 8191&t||(r+=13,t>>>=13),127&t||(r+=7,t>>>=7),15&t||(r+=4,t>>>=4),3&t||(r+=2,t>>>=2),1&t||r++,r},i.prototype.bitLength=function(){var e=this.words[this.length-1],t=this._countBits(e);return 26*(this.length-1)+t},i.prototype.zeroBits=function(){if(this.isZero())return 0;for(var e=0,t=0;t<this.length;t++){var r=this._zeroBits(this.words[t]);if(e+=r,26!==r)break}return e},i.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},i.prototype.toTwos=function(e){return 0!==this.negative?this.abs().inotn(e).iaddn(1):this.clone()},i.prototype.fromTwos=function(e){return this.testn(e-1)?this.notn(e).iaddn(1).ineg():this.clone()},i.prototype.isNeg=function(){return 0!==this.negative},i.prototype.neg=function(){return this.clone().ineg()},i.prototype.ineg=function(){return this.isZero()||(this.negative^=1),this},i.prototype.iuor=function(e){for(;this.length<e.length;)this.words[this.length++]=0;for(var t=0;t<e.length;t++)this.words[t]=this.words[t]|e.words[t];return this._strip()},i.prototype.ior=function(e){return r(!(this.negative|e.negative)),this.iuor(e)},i.prototype.or=function(e){return this.length>e.length?this.clone().ior(e):e.clone().ior(this)},i.prototype.uor=function(e){return this.length>e.length?this.clone().iuor(e):e.clone().iuor(this)},i.prototype.iuand=function(e){var t;t=this.length>e.length?e:this;for(var r=0;r<t.length;r++)this.words[r]=this.words[r]&e.words[r];return this.length=t.length,this._strip()},i.prototype.iand=function(e){return r(!(this.negative|e.negative)),this.iuand(e)},i.prototype.and=function(e){return this.length>e.length?this.clone().iand(e):e.clone().iand(this)},i.prototype.uand=function(e){return this.length>e.length?this.clone().iuand(e):e.clone().iuand(this)},i.prototype.iuxor=function(e){var t,r;this.length>e.length?(t=this,r=e):(t=e,r=this);for(var n=0;n<r.length;n++)this.words[n]=t.words[n]^r.words[n];if(this!==t)for(;n<t.length;n++)this.words[n]=t.words[n];return this.length=t.length,this._strip()},i.prototype.ixor=function(e){return r(!(this.negative|e.negative)),this.iuxor(e)},i.prototype.xor=function(e){return this.length>e.length?this.clone().ixor(e):e.clone().ixor(this)},i.prototype.uxor=function(e){return this.length>e.length?this.clone().iuxor(e):e.clone().iuxor(this)},i.prototype.inotn=function(e){r("number"==typeof e&&e>=0);var t=0|Math.ceil(e/26),n=e%26;this._expand(t),n>0&&t--;for(var i=0;i<t;i++)this.words[i]=67108863&~this.words[i];return n>0&&(this.words[i]=~this.words[i]&67108863>>26-n),this._strip()},i.prototype.notn=function(e){return this.clone().inotn(e)},i.prototype.setn=function(e,t){r("number"==typeof e&&e>=0);var n=e/26|0,i=e%26;return this._expand(n+1),this.words[n]=t?this.words[n]|1<<i:this.words[n]&~(1<<i),this._strip()},i.prototype.iadd=function(e){var t,r,n;if(0!==this.negative&&0===e.negative)return this.negative=0,t=this.isub(e),this.negative^=1,this._normSign();if(0===this.negative&&0!==e.negative)return e.negative=0,t=this.isub(e),e.negative=1,t._normSign();this.length>e.length?(r=this,n=e):(r=e,n=this);for(var i=0,s=0;s<n.length;s++)t=(0|r.words[s])+(0|n.words[s])+i,this.words[s]=67108863&t,i=t>>>26;for(;0!==i&&s<r.length;s++)t=(0|r.words[s])+i,this.words[s]=67108863&t,i=t>>>26;if(this.length=r.length,0!==i)this.words[this.length]=i,this.length++;else if(r!==this)for(;s<r.length;s++)this.words[s]=r.words[s];return this},i.prototype.add=function(e){var t;return 0!==e.negative&&0===this.negative?(e.negative=0,t=this.sub(e),e.negative^=1,t):0===e.negative&&0!==this.negative?(this.negative=0,t=e.sub(this),this.negative=1,t):this.length>e.length?this.clone().iadd(e):e.clone().iadd(this)},i.prototype.isub=function(e){if(0!==e.negative){e.negative=0;var t=this.iadd(e);return e.negative=1,t._normSign()}if(0!==this.negative)return this.negative=0,this.iadd(e),this.negative=1,this._normSign();var r,n,i=this.cmp(e);if(0===i)return this.negative=0,this.length=1,this.words[0]=0,this;i>0?(r=this,n=e):(r=e,n=this);for(var s=0,o=0;o<n.length;o++)s=(t=(0|r.words[o])-(0|n.words[o])+s)>>26,this.words[o]=67108863&t;for(;0!==s&&o<r.length;o++)s=(t=(0|r.words[o])+s)>>26,this.words[o]=67108863&t;if(0===s&&o<r.length&&r!==this)for(;o<r.length;o++)this.words[o]=r.words[o];return this.length=Math.max(this.length,o),r!==this&&(this.negative=1),this._strip()},i.prototype.sub=function(e){return this.clone().isub(e)};var g=function(e,t,r){var n,i,s,o=e.words,a=t.words,c=r.words,l=0,u=0|o[0],h=8191&u,d=u>>>13,f=0|o[1],p=8191&f,g=f>>>13,m=0|o[2],y=8191&m,w=m>>>13,b=0|o[3],v=8191&b,A=b>>>13,E=0|o[4],x=8191&E,C=E>>>13,S=0|o[5],k=8191&S,_=S>>>13,I=0|o[6],M=8191&I,T=I>>>13,P=0|o[7],O=8191&P,R=P>>>13,N=0|o[8],B=8191&N,U=N>>>13,D=0|o[9],L=8191&D,F=D>>>13,j=0|a[0],H=8191&j,z=j>>>13,q=0|a[1],$=8191&q,W=q>>>13,G=0|a[2],V=8191&G,K=G>>>13,Z=0|a[3],Q=8191&Z,J=Z>>>13,Y=0|a[4],X=8191&Y,ee=Y>>>13,te=0|a[5],re=8191&te,ne=te>>>13,ie=0|a[6],se=8191&ie,oe=ie>>>13,ae=0|a[7],ce=8191&ae,le=ae>>>13,ue=0|a[8],he=8191&ue,de=ue>>>13,fe=0|a[9],pe=8191&fe,ge=fe>>>13;r.negative=e.negative^t.negative,r.length=19;var me=(l+(n=Math.imul(h,H))|0)+((8191&(i=(i=Math.imul(h,z))+Math.imul(d,H)|0))<<13)|0;l=((s=Math.imul(d,z))+(i>>>13)|0)+(me>>>26)|0,me&=67108863,n=Math.imul(p,H),i=(i=Math.imul(p,z))+Math.imul(g,H)|0,s=Math.imul(g,z);var ye=(l+(n=n+Math.imul(h,$)|0)|0)+((8191&(i=(i=i+Math.imul(h,W)|0)+Math.imul(d,$)|0))<<13)|0;l=((s=s+Math.imul(d,W)|0)+(i>>>13)|0)+(ye>>>26)|0,ye&=67108863,n=Math.imul(y,H),i=(i=Math.imul(y,z))+Math.imul(w,H)|0,s=Math.imul(w,z),n=n+Math.imul(p,$)|0,i=(i=i+Math.imul(p,W)|0)+Math.imul(g,$)|0,s=s+Math.imul(g,W)|0;var we=(l+(n=n+Math.imul(h,V)|0)|0)+((8191&(i=(i=i+Math.imul(h,K)|0)+Math.imul(d,V)|0))<<13)|0;l=((s=s+Math.imul(d,K)|0)+(i>>>13)|0)+(we>>>26)|0,we&=67108863,n=Math.imul(v,H),i=(i=Math.imul(v,z))+Math.imul(A,H)|0,s=Math.imul(A,z),n=n+Math.imul(y,$)|0,i=(i=i+Math.imul(y,W)|0)+Math.imul(w,$)|0,s=s+Math.imul(w,W)|0,n=n+Math.imul(p,V)|0,i=(i=i+Math.imul(p,K)|0)+Math.imul(g,V)|0,s=s+Math.imul(g,K)|0;var be=(l+(n=n+Math.imul(h,Q)|0)|0)+((8191&(i=(i=i+Math.imul(h,J)|0)+Math.imul(d,Q)|0))<<13)|0;l=((s=s+Math.imul(d,J)|0)+(i>>>13)|0)+(be>>>26)|0,be&=67108863,n=Math.imul(x,H),i=(i=Math.imul(x,z))+Math.imul(C,H)|0,s=Math.imul(C,z),n=n+Math.imul(v,$)|0,i=(i=i+Math.imul(v,W)|0)+Math.imul(A,$)|0,s=s+Math.imul(A,W)|0,n=n+Math.imul(y,V)|0,i=(i=i+Math.imul(y,K)|0)+Math.imul(w,V)|0,s=s+Math.imul(w,K)|0,n=n+Math.imul(p,Q)|0,i=(i=i+Math.imul(p,J)|0)+Math.imul(g,Q)|0,s=s+Math.imul(g,J)|0;var ve=(l+(n=n+Math.imul(h,X)|0)|0)+((8191&(i=(i=i+Math.imul(h,ee)|0)+Math.imul(d,X)|0))<<13)|0;l=((s=s+Math.imul(d,ee)|0)+(i>>>13)|0)+(ve>>>26)|0,ve&=67108863,n=Math.imul(k,H),i=(i=Math.imul(k,z))+Math.imul(_,H)|0,s=Math.imul(_,z),n=n+Math.imul(x,$)|0,i=(i=i+Math.imul(x,W)|0)+Math.imul(C,$)|0,s=s+Math.imul(C,W)|0,n=n+Math.imul(v,V)|0,i=(i=i+Math.imul(v,K)|0)+Math.imul(A,V)|0,s=s+Math.imul(A,K)|0,n=n+Math.imul(y,Q)|0,i=(i=i+Math.imul(y,J)|0)+Math.imul(w,Q)|0,s=s+Math.imul(w,J)|0,n=n+Math.imul(p,X)|0,i=(i=i+Math.imul(p,ee)|0)+Math.imul(g,X)|0,s=s+Math.imul(g,ee)|0;var Ae=(l+(n=n+Math.imul(h,re)|0)|0)+((8191&(i=(i=i+Math.imul(h,ne)|0)+Math.imul(d,re)|0))<<13)|0;l=((s=s+Math.imul(d,ne)|0)+(i>>>13)|0)+(Ae>>>26)|0,Ae&=67108863,n=Math.imul(M,H),i=(i=Math.imul(M,z))+Math.imul(T,H)|0,s=Math.imul(T,z),n=n+Math.imul(k,$)|0,i=(i=i+Math.imul(k,W)|0)+Math.imul(_,$)|0,s=s+Math.imul(_,W)|0,n=n+Math.imul(x,V)|0,i=(i=i+Math.imul(x,K)|0)+Math.imul(C,V)|0,s=s+Math.imul(C,K)|0,n=n+Math.imul(v,Q)|0,i=(i=i+Math.imul(v,J)|0)+Math.imul(A,Q)|0,s=s+Math.imul(A,J)|0,n=n+Math.imul(y,X)|0,i=(i=i+Math.imul(y,ee)|0)+Math.imul(w,X)|0,s=s+Math.imul(w,ee)|0,n=n+Math.imul(p,re)|0,i=(i=i+Math.imul(p,ne)|0)+Math.imul(g,re)|0,s=s+Math.imul(g,ne)|0;var Ee=(l+(n=n+Math.imul(h,se)|0)|0)+((8191&(i=(i=i+Math.imul(h,oe)|0)+Math.imul(d,se)|0))<<13)|0;l=((s=s+Math.imul(d,oe)|0)+(i>>>13)|0)+(Ee>>>26)|0,Ee&=67108863,n=Math.imul(O,H),i=(i=Math.imul(O,z))+Math.imul(R,H)|0,s=Math.imul(R,z),n=n+Math.imul(M,$)|0,i=(i=i+Math.imul(M,W)|0)+Math.imul(T,$)|0,s=s+Math.imul(T,W)|0,n=n+Math.imul(k,V)|0,i=(i=i+Math.imul(k,K)|0)+Math.imul(_,V)|0,s=s+Math.imul(_,K)|0,n=n+Math.imul(x,Q)|0,i=(i=i+Math.imul(x,J)|0)+Math.imul(C,Q)|0,s=s+Math.imul(C,J)|0,n=n+Math.imul(v,X)|0,i=(i=i+Math.imul(v,ee)|0)+Math.imul(A,X)|0,s=s+Math.imul(A,ee)|0,n=n+Math.imul(y,re)|0,i=(i=i+Math.imul(y,ne)|0)+Math.imul(w,re)|0,s=s+Math.imul(w,ne)|0,n=n+Math.imul(p,se)|0,i=(i=i+Math.imul(p,oe)|0)+Math.imul(g,se)|0,s=s+Math.imul(g,oe)|0;var xe=(l+(n=n+Math.imul(h,ce)|0)|0)+((8191&(i=(i=i+Math.imul(h,le)|0)+Math.imul(d,ce)|0))<<13)|0;l=((s=s+Math.imul(d,le)|0)+(i>>>13)|0)+(xe>>>26)|0,xe&=67108863,n=Math.imul(B,H),i=(i=Math.imul(B,z))+Math.imul(U,H)|0,s=Math.imul(U,z),n=n+Math.imul(O,$)|0,i=(i=i+Math.imul(O,W)|0)+Math.imul(R,$)|0,s=s+Math.imul(R,W)|0,n=n+Math.imul(M,V)|0,i=(i=i+Math.imul(M,K)|0)+Math.imul(T,V)|0,s=s+Math.imul(T,K)|0,n=n+Math.imul(k,Q)|0,i=(i=i+Math.imul(k,J)|0)+Math.imul(_,Q)|0,s=s+Math.imul(_,J)|0,n=n+Math.imul(x,X)|0,i=(i=i+Math.imul(x,ee)|0)+Math.imul(C,X)|0,s=s+Math.imul(C,ee)|0,n=n+Math.imul(v,re)|0,i=(i=i+Math.imul(v,ne)|0)+Math.imul(A,re)|0,s=s+Math.imul(A,ne)|0,n=n+Math.imul(y,se)|0,i=(i=i+Math.imul(y,oe)|0)+Math.imul(w,se)|0,s=s+Math.imul(w,oe)|0,n=n+Math.imul(p,ce)|0,i=(i=i+Math.imul(p,le)|0)+Math.imul(g,ce)|0,s=s+Math.imul(g,le)|0;var Ce=(l+(n=n+Math.imul(h,he)|0)|0)+((8191&(i=(i=i+Math.imul(h,de)|0)+Math.imul(d,he)|0))<<13)|0;l=((s=s+Math.imul(d,de)|0)+(i>>>13)|0)+(Ce>>>26)|0,Ce&=67108863,n=Math.imul(L,H),i=(i=Math.imul(L,z))+Math.imul(F,H)|0,s=Math.imul(F,z),n=n+Math.imul(B,$)|0,i=(i=i+Math.imul(B,W)|0)+Math.imul(U,$)|0,s=s+Math.imul(U,W)|0,n=n+Math.imul(O,V)|0,i=(i=i+Math.imul(O,K)|0)+Math.imul(R,V)|0,s=s+Math.imul(R,K)|0,n=n+Math.imul(M,Q)|0,i=(i=i+Math.imul(M,J)|0)+Math.imul(T,Q)|0,s=s+Math.imul(T,J)|0,n=n+Math.imul(k,X)|0,i=(i=i+Math.imul(k,ee)|0)+Math.imul(_,X)|0,s=s+Math.imul(_,ee)|0,n=n+Math.imul(x,re)|0,i=(i=i+Math.imul(x,ne)|0)+Math.imul(C,re)|0,s=s+Math.imul(C,ne)|0,n=n+Math.imul(v,se)|0,i=(i=i+Math.imul(v,oe)|0)+Math.imul(A,se)|0,s=s+Math.imul(A,oe)|0,n=n+Math.imul(y,ce)|0,i=(i=i+Math.imul(y,le)|0)+Math.imul(w,ce)|0,s=s+Math.imul(w,le)|0,n=n+Math.imul(p,he)|0,i=(i=i+Math.imul(p,de)|0)+Math.imul(g,he)|0,s=s+Math.imul(g,de)|0;var Se=(l+(n=n+Math.imul(h,pe)|0)|0)+((8191&(i=(i=i+Math.imul(h,ge)|0)+Math.imul(d,pe)|0))<<13)|0;l=((s=s+Math.imul(d,ge)|0)+(i>>>13)|0)+(Se>>>26)|0,Se&=67108863,n=Math.imul(L,$),i=(i=Math.imul(L,W))+Math.imul(F,$)|0,s=Math.imul(F,W),n=n+Math.imul(B,V)|0,i=(i=i+Math.imul(B,K)|0)+Math.imul(U,V)|0,s=s+Math.imul(U,K)|0,n=n+Math.imul(O,Q)|0,i=(i=i+Math.imul(O,J)|0)+Math.imul(R,Q)|0,s=s+Math.imul(R,J)|0,n=n+Math.imul(M,X)|0,i=(i=i+Math.imul(M,ee)|0)+Math.imul(T,X)|0,s=s+Math.imul(T,ee)|0,n=n+Math.imul(k,re)|0,i=(i=i+Math.imul(k,ne)|0)+Math.imul(_,re)|0,s=s+Math.imul(_,ne)|0,n=n+Math.imul(x,se)|0,i=(i=i+Math.imul(x,oe)|0)+Math.imul(C,se)|0,s=s+Math.imul(C,oe)|0,n=n+Math.imul(v,ce)|0,i=(i=i+Math.imul(v,le)|0)+Math.imul(A,ce)|0,s=s+Math.imul(A,le)|0,n=n+Math.imul(y,he)|0,i=(i=i+Math.imul(y,de)|0)+Math.imul(w,he)|0,s=s+Math.imul(w,de)|0;var ke=(l+(n=n+Math.imul(p,pe)|0)|0)+((8191&(i=(i=i+Math.imul(p,ge)|0)+Math.imul(g,pe)|0))<<13)|0;l=((s=s+Math.imul(g,ge)|0)+(i>>>13)|0)+(ke>>>26)|0,ke&=67108863,n=Math.imul(L,V),i=(i=Math.imul(L,K))+Math.imul(F,V)|0,s=Math.imul(F,K),n=n+Math.imul(B,Q)|0,i=(i=i+Math.imul(B,J)|0)+Math.imul(U,Q)|0,s=s+Math.imul(U,J)|0,n=n+Math.imul(O,X)|0,i=(i=i+Math.imul(O,ee)|0)+Math.imul(R,X)|0,s=s+Math.imul(R,ee)|0,n=n+Math.imul(M,re)|0,i=(i=i+Math.imul(M,ne)|0)+Math.imul(T,re)|0,s=s+Math.imul(T,ne)|0,n=n+Math.imul(k,se)|0,i=(i=i+Math.imul(k,oe)|0)+Math.imul(_,se)|0,s=s+Math.imul(_,oe)|0,n=n+Math.imul(x,ce)|0,i=(i=i+Math.imul(x,le)|0)+Math.imul(C,ce)|0,s=s+Math.imul(C,le)|0,n=n+Math.imul(v,he)|0,i=(i=i+Math.imul(v,de)|0)+Math.imul(A,he)|0,s=s+Math.imul(A,de)|0;var _e=(l+(n=n+Math.imul(y,pe)|0)|0)+((8191&(i=(i=i+Math.imul(y,ge)|0)+Math.imul(w,pe)|0))<<13)|0;l=((s=s+Math.imul(w,ge)|0)+(i>>>13)|0)+(_e>>>26)|0,_e&=67108863,n=Math.imul(L,Q),i=(i=Math.imul(L,J))+Math.imul(F,Q)|0,s=Math.imul(F,J),n=n+Math.imul(B,X)|0,i=(i=i+Math.imul(B,ee)|0)+Math.imul(U,X)|0,s=s+Math.imul(U,ee)|0,n=n+Math.imul(O,re)|0,i=(i=i+Math.imul(O,ne)|0)+Math.imul(R,re)|0,s=s+Math.imul(R,ne)|0,n=n+Math.imul(M,se)|0,i=(i=i+Math.imul(M,oe)|0)+Math.imul(T,se)|0,s=s+Math.imul(T,oe)|0,n=n+Math.imul(k,ce)|0,i=(i=i+Math.imul(k,le)|0)+Math.imul(_,ce)|0,s=s+Math.imul(_,le)|0,n=n+Math.imul(x,he)|0,i=(i=i+Math.imul(x,de)|0)+Math.imul(C,he)|0,s=s+Math.imul(C,de)|0;var Ie=(l+(n=n+Math.imul(v,pe)|0)|0)+((8191&(i=(i=i+Math.imul(v,ge)|0)+Math.imul(A,pe)|0))<<13)|0;l=((s=s+Math.imul(A,ge)|0)+(i>>>13)|0)+(Ie>>>26)|0,Ie&=67108863,n=Math.imul(L,X),i=(i=Math.imul(L,ee))+Math.imul(F,X)|0,s=Math.imul(F,ee),n=n+Math.imul(B,re)|0,i=(i=i+Math.imul(B,ne)|0)+Math.imul(U,re)|0,s=s+Math.imul(U,ne)|0,n=n+Math.imul(O,se)|0,i=(i=i+Math.imul(O,oe)|0)+Math.imul(R,se)|0,s=s+Math.imul(R,oe)|0,n=n+Math.imul(M,ce)|0,i=(i=i+Math.imul(M,le)|0)+Math.imul(T,ce)|0,s=s+Math.imul(T,le)|0,n=n+Math.imul(k,he)|0,i=(i=i+Math.imul(k,de)|0)+Math.imul(_,he)|0,s=s+Math.imul(_,de)|0;var Me=(l+(n=n+Math.imul(x,pe)|0)|0)+((8191&(i=(i=i+Math.imul(x,ge)|0)+Math.imul(C,pe)|0))<<13)|0;l=((s=s+Math.imul(C,ge)|0)+(i>>>13)|0)+(Me>>>26)|0,Me&=67108863,n=Math.imul(L,re),i=(i=Math.imul(L,ne))+Math.imul(F,re)|0,s=Math.imul(F,ne),n=n+Math.imul(B,se)|0,i=(i=i+Math.imul(B,oe)|0)+Math.imul(U,se)|0,s=s+Math.imul(U,oe)|0,n=n+Math.imul(O,ce)|0,i=(i=i+Math.imul(O,le)|0)+Math.imul(R,ce)|0,s=s+Math.imul(R,le)|0,n=n+Math.imul(M,he)|0,i=(i=i+Math.imul(M,de)|0)+Math.imul(T,he)|0,s=s+Math.imul(T,de)|0;var Te=(l+(n=n+Math.imul(k,pe)|0)|0)+((8191&(i=(i=i+Math.imul(k,ge)|0)+Math.imul(_,pe)|0))<<13)|0;l=((s=s+Math.imul(_,ge)|0)+(i>>>13)|0)+(Te>>>26)|0,Te&=67108863,n=Math.imul(L,se),i=(i=Math.imul(L,oe))+Math.imul(F,se)|0,s=Math.imul(F,oe),n=n+Math.imul(B,ce)|0,i=(i=i+Math.imul(B,le)|0)+Math.imul(U,ce)|0,s=s+Math.imul(U,le)|0,n=n+Math.imul(O,he)|0,i=(i=i+Math.imul(O,de)|0)+Math.imul(R,he)|0,s=s+Math.imul(R,de)|0;var Pe=(l+(n=n+Math.imul(M,pe)|0)|0)+((8191&(i=(i=i+Math.imul(M,ge)|0)+Math.imul(T,pe)|0))<<13)|0;l=((s=s+Math.imul(T,ge)|0)+(i>>>13)|0)+(Pe>>>26)|0,Pe&=67108863,n=Math.imul(L,ce),i=(i=Math.imul(L,le))+Math.imul(F,ce)|0,s=Math.imul(F,le),n=n+Math.imul(B,he)|0,i=(i=i+Math.imul(B,de)|0)+Math.imul(U,he)|0,s=s+Math.imul(U,de)|0;var Oe=(l+(n=n+Math.imul(O,pe)|0)|0)+((8191&(i=(i=i+Math.imul(O,ge)|0)+Math.imul(R,pe)|0))<<13)|0;l=((s=s+Math.imul(R,ge)|0)+(i>>>13)|0)+(Oe>>>26)|0,Oe&=67108863,n=Math.imul(L,he),i=(i=Math.imul(L,de))+Math.imul(F,he)|0,s=Math.imul(F,de);var Re=(l+(n=n+Math.imul(B,pe)|0)|0)+((8191&(i=(i=i+Math.imul(B,ge)|0)+Math.imul(U,pe)|0))<<13)|0;l=((s=s+Math.imul(U,ge)|0)+(i>>>13)|0)+(Re>>>26)|0,Re&=67108863;var Ne=(l+(n=Math.imul(L,pe))|0)+((8191&(i=(i=Math.imul(L,ge))+Math.imul(F,pe)|0))<<13)|0;return l=((s=Math.imul(F,ge))+(i>>>13)|0)+(Ne>>>26)|0,Ne&=67108863,c[0]=me,c[1]=ye,c[2]=we,c[3]=be,c[4]=ve,c[5]=Ae,c[6]=Ee,c[7]=xe,c[8]=Ce,c[9]=Se,c[10]=ke,c[11]=_e,c[12]=Ie,c[13]=Me,c[14]=Te,c[15]=Pe,c[16]=Oe,c[17]=Re,c[18]=Ne,0!==l&&(c[19]=l,r.length++),r};function m(e,t,r){r.negative=t.negative^e.negative,r.length=e.length+t.length;for(var n=0,i=0,s=0;s<r.length-1;s++){var o=i;i=0;for(var a=67108863&n,c=Math.min(s,t.length-1),l=Math.max(0,s-e.length+1);l<=c;l++){var u=s-l,h=(0|e.words[u])*(0|t.words[l]),d=67108863&h;a=67108863&(d=d+a|0),i+=(o=(o=o+(h/67108864|0)|0)+(d>>>26)|0)>>>26,o&=67108863}r.words[s]=a,n=o,o=i}return 0!==n?r.words[s]=n:r.length--,r._strip()}function y(e,t,r){return m(e,t,r)}Math.imul||(g=p),i.prototype.mulTo=function(e,t){var r=this.length+e.length;return 10===this.length&&10===e.length?g(this,e,t):r<63?p(this,e,t):r<1024?m(this,e,t):y(this,e,t)},i.prototype.mul=function(e){var t=new i(null);return t.words=new Array(this.length+e.length),this.mulTo(e,t)},i.prototype.mulf=function(e){var t=new i(null);return t.words=new Array(this.length+e.length),y(this,e,t)},i.prototype.imul=function(e){return this.clone().mulTo(e,this)},i.prototype.imuln=function(e){var t=e<0;t&&(e=-e),r("number"==typeof e),r(e<67108864);for(var n=0,i=0;i<this.length;i++){var s=(0|this.words[i])*e,o=(67108863&s)+(67108863&n);n>>=26,n+=s/67108864|0,n+=o>>>26,this.words[i]=67108863&o}return 0!==n&&(this.words[i]=n,this.length++),t?this.ineg():this},i.prototype.muln=function(e){return this.clone().imuln(e)},i.prototype.sqr=function(){return this.mul(this)},i.prototype.isqr=function(){return this.imul(this.clone())},i.prototype.pow=function(e){var t=function(e){for(var t=new Array(e.bitLength()),r=0;r<t.length;r++){var n=r/26|0,i=r%26;t[r]=e.words[n]>>>i&1}return t}(e);if(0===t.length)return new i(1);for(var r=this,n=0;n<t.length&&0===t[n];n++,r=r.sqr());if(++n<t.length)for(var s=r.sqr();n<t.length;n++,s=s.sqr())0!==t[n]&&(r=r.mul(s));return r},i.prototype.iushln=function(e){r("number"==typeof e&&e>=0);var t,n=e%26,i=(e-n)/26,s=67108863>>>26-n<<26-n;if(0!==n){var o=0;for(t=0;t<this.length;t++){var a=this.words[t]&s,c=(0|this.words[t])-a<<n;this.words[t]=c|o,o=a>>>26-n}o&&(this.words[t]=o,this.length++)}if(0!==i){for(t=this.length-1;t>=0;t--)this.words[t+i]=this.words[t];for(t=0;t<i;t++)this.words[t]=0;this.length+=i}return this._strip()},i.prototype.ishln=function(e){return r(0===this.negative),this.iushln(e)},i.prototype.iushrn=function(e,t,n){var i;r("number"==typeof e&&e>=0),i=t?(t-t%26)/26:0;var s=e%26,o=Math.min((e-s)/26,this.length),a=67108863^67108863>>>s<<s,c=n;if(i-=o,i=Math.max(0,i),c){for(var l=0;l<o;l++)c.words[l]=this.words[l];c.length=o}if(0!==o)if(this.length>o)for(this.length-=o,l=0;l<this.length;l++)this.words[l]=this.words[l+o];else this.words[0]=0,this.length=1;var u=0;for(l=this.length-1;l>=0&&(0!==u||l>=i);l--){var h=0|this.words[l];this.words[l]=u<<26-s|h>>>s,u=h&a}return c&&0!==u&&(c.words[c.length++]=u),0===this.length&&(this.words[0]=0,this.length=1),this._strip()},i.prototype.ishrn=function(e,t,n){return r(0===this.negative),this.iushrn(e,t,n)},i.prototype.shln=function(e){return this.clone().ishln(e)},i.prototype.ushln=function(e){return this.clone().iushln(e)},i.prototype.shrn=function(e){return this.clone().ishrn(e)},i.prototype.ushrn=function(e){return this.clone().iushrn(e)},i.prototype.testn=function(e){r("number"==typeof e&&e>=0);var t=e%26,n=(e-t)/26,i=1<<t;return!(this.length<=n||!(this.words[n]&i))},i.prototype.imaskn=function(e){r("number"==typeof e&&e>=0);var t=e%26,n=(e-t)/26;if(r(0===this.negative,"imaskn works only with positive numbers"),this.length<=n)return this;if(0!==t&&n++,this.length=Math.min(n,this.length),0!==t){var i=67108863^67108863>>>t<<t;this.words[this.length-1]&=i}return this._strip()},i.prototype.maskn=function(e){return this.clone().imaskn(e)},i.prototype.iaddn=function(e){return r("number"==typeof e),r(e<67108864),e<0?this.isubn(-e):0!==this.negative?1===this.length&&(0|this.words[0])<=e?(this.words[0]=e-(0|this.words[0]),this.negative=0,this):(this.negative=0,this.isubn(e),this.negative=1,this):this._iaddn(e)},i.prototype._iaddn=function(e){this.words[0]+=e;for(var t=0;t<this.length&&this.words[t]>=67108864;t++)this.words[t]-=67108864,t===this.length-1?this.words[t+1]=1:this.words[t+1]++;return this.length=Math.max(this.length,t+1),this},i.prototype.isubn=function(e){if(r("number"==typeof e),r(e<67108864),e<0)return this.iaddn(-e);if(0!==this.negative)return this.negative=0,this.iaddn(e),this.negative=1,this;if(this.words[0]-=e,1===this.length&&this.words[0]<0)this.words[0]=-this.words[0],this.negative=1;else for(var t=0;t<this.length&&this.words[t]<0;t++)this.words[t]+=67108864,this.words[t+1]-=1;return this._strip()},i.prototype.addn=function(e){return this.clone().iaddn(e)},i.prototype.subn=function(e){return this.clone().isubn(e)},i.prototype.iabs=function(){return this.negative=0,this},i.prototype.abs=function(){return this.clone().iabs()},i.prototype._ishlnsubmul=function(e,t,n){var i,s=e.length+n;this._expand(s);var o,a=0;for(i=0;i<e.length;i++){o=(0|this.words[i+n])+a;var c=(0|e.words[i])*t;a=((o-=67108863&c)>>26)-(c/67108864|0),this.words[i+n]=67108863&o}for(;i<this.length-n;i++)a=(o=(0|this.words[i+n])+a)>>26,this.words[i+n]=67108863&o;if(0===a)return this._strip();for(r(-1===a),a=0,i=0;i<this.length;i++)a=(o=-(0|this.words[i])+a)>>26,this.words[i]=67108863&o;return this.negative=1,this._strip()},i.prototype._wordDiv=function(e,t){var r=(this.length,e.length),n=this.clone(),s=e,o=0|s.words[s.length-1];0!=(r=26-this._countBits(o))&&(s=s.ushln(r),n.iushln(r),o=0|s.words[s.length-1]);var a,c=n.length-s.length;if("mod"!==t){(a=new i(null)).length=c+1,a.words=new Array(a.length);for(var l=0;l<a.length;l++)a.words[l]=0}var u=n.clone()._ishlnsubmul(s,1,c);0===u.negative&&(n=u,a&&(a.words[c]=1));for(var h=c-1;h>=0;h--){var d=67108864*(0|n.words[s.length+h])+(0|n.words[s.length+h-1]);for(d=Math.min(d/o|0,67108863),n._ishlnsubmul(s,d,h);0!==n.negative;)d--,n.negative=0,n._ishlnsubmul(s,1,h),n.isZero()||(n.negative^=1);a&&(a.words[h]=d)}return a&&a._strip(),n._strip(),"div"!==t&&0!==r&&n.iushrn(r),{div:a||null,mod:n}},i.prototype.divmod=function(e,t,n){return r(!e.isZero()),this.isZero()?{div:new i(0),mod:new i(0)}:0!==this.negative&&0===e.negative?(a=this.neg().divmod(e,t),"mod"!==t&&(s=a.div.neg()),"div"!==t&&(o=a.mod.neg(),n&&0!==o.negative&&o.iadd(e)),{div:s,mod:o}):0===this.negative&&0!==e.negative?(a=this.divmod(e.neg(),t),"mod"!==t&&(s=a.div.neg()),{div:s,mod:a.mod}):this.negative&e.negative?(a=this.neg().divmod(e.neg(),t),"div"!==t&&(o=a.mod.neg(),n&&0!==o.negative&&o.isub(e)),{div:a.div,mod:o}):e.length>this.length||this.cmp(e)<0?{div:new i(0),mod:this}:1===e.length?"div"===t?{div:this.divn(e.words[0]),mod:null}:"mod"===t?{div:null,mod:new i(this.modrn(e.words[0]))}:{div:this.divn(e.words[0]),mod:new i(this.modrn(e.words[0]))}:this._wordDiv(e,t);var s,o,a},i.prototype.div=function(e){return this.divmod(e,"div",!1).div},i.prototype.mod=function(e){return this.divmod(e,"mod",!1).mod},i.prototype.umod=function(e){return this.divmod(e,"mod",!0).mod},i.prototype.divRound=function(e){var t=this.divmod(e);if(t.mod.isZero())return t.div;var r=0!==t.div.negative?t.mod.isub(e):t.mod,n=e.ushrn(1),i=e.andln(1),s=r.cmp(n);return s<0||1===i&&0===s?t.div:0!==t.div.negative?t.div.isubn(1):t.div.iaddn(1)},i.prototype.modrn=function(e){var t=e<0;t&&(e=-e),r(e<=67108863);for(var n=(1<<26)%e,i=0,s=this.length-1;s>=0;s--)i=(n*i+(0|this.words[s]))%e;return t?-i:i},i.prototype.modn=function(e){return this.modrn(e)},i.prototype.idivn=function(e){var t=e<0;t&&(e=-e),r(e<=67108863);for(var n=0,i=this.length-1;i>=0;i--){var s=(0|this.words[i])+67108864*n;this.words[i]=s/e|0,n=s%e}return this._strip(),t?this.ineg():this},i.prototype.divn=function(e){return this.clone().idivn(e)},i.prototype.egcd=function(e){r(0===e.negative),r(!e.isZero());var t=this,n=e.clone();t=0!==t.negative?t.umod(e):t.clone();for(var s=new i(1),o=new i(0),a=new i(0),c=new i(1),l=0;t.isEven()&&n.isEven();)t.iushrn(1),n.iushrn(1),++l;for(var u=n.clone(),h=t.clone();!t.isZero();){for(var d=0,f=1;!(t.words[0]&f)&&d<26;++d,f<<=1);if(d>0)for(t.iushrn(d);d-- >0;)(s.isOdd()||o.isOdd())&&(s.iadd(u),o.isub(h)),s.iushrn(1),o.iushrn(1);for(var p=0,g=1;!(n.words[0]&g)&&p<26;++p,g<<=1);if(p>0)for(n.iushrn(p);p-- >0;)(a.isOdd()||c.isOdd())&&(a.iadd(u),c.isub(h)),a.iushrn(1),c.iushrn(1);t.cmp(n)>=0?(t.isub(n),s.isub(a),o.isub(c)):(n.isub(t),a.isub(s),c.isub(o))}return{a,b:c,gcd:n.iushln(l)}},i.prototype._invmp=function(e){r(0===e.negative),r(!e.isZero());var t,n=this,s=e.clone();n=0!==n.negative?n.umod(e):n.clone();for(var o=new i(1),a=new i(0),c=s.clone();n.cmpn(1)>0&&s.cmpn(1)>0;){for(var l=0,u=1;!(n.words[0]&u)&&l<26;++l,u<<=1);if(l>0)for(n.iushrn(l);l-- >0;)o.isOdd()&&o.iadd(c),o.iushrn(1);for(var h=0,d=1;!(s.words[0]&d)&&h<26;++h,d<<=1);if(h>0)for(s.iushrn(h);h-- >0;)a.isOdd()&&a.iadd(c),a.iushrn(1);n.cmp(s)>=0?(n.isub(s),o.isub(a)):(s.isub(n),a.isub(o))}return(t=0===n.cmpn(1)?o:a).cmpn(0)<0&&t.iadd(e),t},i.prototype.gcd=function(e){if(this.isZero())return e.abs();if(e.isZero())return this.abs();var t=this.clone(),r=e.clone();t.negative=0,r.negative=0;for(var n=0;t.isEven()&&r.isEven();n++)t.iushrn(1),r.iushrn(1);for(;;){for(;t.isEven();)t.iushrn(1);for(;r.isEven();)r.iushrn(1);var i=t.cmp(r);if(i<0){var s=t;t=r,r=s}else if(0===i||0===r.cmpn(1))break;t.isub(r)}return r.iushln(n)},i.prototype.invm=function(e){return this.egcd(e).a.umod(e)},i.prototype.isEven=function(){return!(1&this.words[0])},i.prototype.isOdd=function(){return!(1&~this.words[0])},i.prototype.andln=function(e){return this.words[0]&e},i.prototype.bincn=function(e){r("number"==typeof e);var t=e%26,n=(e-t)/26,i=1<<t;if(this.length<=n)return this._expand(n+1),this.words[n]|=i,this;for(var s=i,o=n;0!==s&&o<this.length;o++){var a=0|this.words[o];s=(a+=s)>>>26,a&=67108863,this.words[o]=a}return 0!==s&&(this.words[o]=s,this.length++),this},i.prototype.isZero=function(){return 1===this.length&&0===this.words[0]},i.prototype.cmpn=function(e){var t,n=e<0;if(0!==this.negative&&!n)return-1;if(0===this.negative&&n)return 1;if(this._strip(),this.length>1)t=1;else{n&&(e=-e),r(e<=67108863,"Number is too big");var i=0|this.words[0];t=i===e?0:i<e?-1:1}return 0!==this.negative?0|-t:t},i.prototype.cmp=function(e){if(0!==this.negative&&0===e.negative)return-1;if(0===this.negative&&0!==e.negative)return 1;var t=this.ucmp(e);return 0!==this.negative?0|-t:t},i.prototype.ucmp=function(e){if(this.length>e.length)return 1;if(this.length<e.length)return-1;for(var t=0,r=this.length-1;r>=0;r--){var n=0|this.words[r],i=0|e.words[r];if(n!==i){n<i?t=-1:n>i&&(t=1);break}}return t},i.prototype.gtn=function(e){return 1===this.cmpn(e)},i.prototype.gt=function(e){return 1===this.cmp(e)},i.prototype.gten=function(e){return this.cmpn(e)>=0},i.prototype.gte=function(e){return this.cmp(e)>=0},i.prototype.ltn=function(e){return-1===this.cmpn(e)},i.prototype.lt=function(e){return-1===this.cmp(e)},i.prototype.lten=function(e){return this.cmpn(e)<=0},i.prototype.lte=function(e){return this.cmp(e)<=0},i.prototype.eqn=function(e){return 0===this.cmpn(e)},i.prototype.eq=function(e){return 0===this.cmp(e)},i.red=function(e){return new C(e)},i.prototype.toRed=function(e){return r(!this.red,"Already a number in reduction context"),r(0===this.negative,"red works only with positives"),e.convertTo(this)._forceRed(e)},i.prototype.fromRed=function(){return r(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},i.prototype._forceRed=function(e){return this.red=e,this},i.prototype.forceRed=function(e){return r(!this.red,"Already a number in reduction context"),this._forceRed(e)},i.prototype.redAdd=function(e){return r(this.red,"redAdd works only with red numbers"),this.red.add(this,e)},i.prototype.redIAdd=function(e){return r(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,e)},i.prototype.redSub=function(e){return r(this.red,"redSub works only with red numbers"),this.red.sub(this,e)},i.prototype.redISub=function(e){return r(this.red,"redISub works only with red numbers"),this.red.isub(this,e)},i.prototype.redShl=function(e){return r(this.red,"redShl works only with red numbers"),this.red.shl(this,e)},i.prototype.redMul=function(e){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,e),this.red.mul(this,e)},i.prototype.redIMul=function(e){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,e),this.red.imul(this,e)},i.prototype.redSqr=function(){return r(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},i.prototype.redISqr=function(){return r(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},i.prototype.redSqrt=function(){return r(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},i.prototype.redInvm=function(){return r(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},i.prototype.redNeg=function(){return r(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},i.prototype.redPow=function(e){return r(this.red&&!e.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,e)};var w={k256:null,p224:null,p192:null,p25519:null};function b(e,t){this.name=e,this.p=new i(t,16),this.n=this.p.bitLength(),this.k=new i(1).iushln(this.n).isub(this.p),this.tmp=this._tmp()}function v(){b.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")}function A(){b.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")}function E(){b.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")}function x(){b.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")}function C(e){if("string"==typeof e){var t=i._prime(e);this.m=t.p,this.prime=t}else r(e.gtn(1),"modulus must be greater than 1"),this.m=e,this.prime=null}function S(e){C.call(this,e),this.shift=this.m.bitLength(),this.shift%26!=0&&(this.shift+=26-this.shift%26),this.r=new i(1).iushln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r._invmp(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv=this.minv.umod(this.r),this.minv=this.r.sub(this.minv)}b.prototype._tmp=function(){var e=new i(null);return e.words=new Array(Math.ceil(this.n/13)),e},b.prototype.ireduce=function(e){var t,r=e;do{this.split(r,this.tmp),t=(r=(r=this.imulK(r)).iadd(this.tmp)).bitLength()}while(t>this.n);var n=t<this.n?-1:r.ucmp(this.p);return 0===n?(r.words[0]=0,r.length=1):n>0?r.isub(this.p):void 0!==r.strip?r.strip():r._strip(),r},b.prototype.split=function(e,t){e.iushrn(this.n,0,t)},b.prototype.imulK=function(e){return e.imul(this.k)},n(v,b),v.prototype.split=function(e,t){for(var r=4194303,n=Math.min(e.length,9),i=0;i<n;i++)t.words[i]=e.words[i];if(t.length=n,e.length<=9)return e.words[0]=0,void(e.length=1);var s=e.words[9];for(t.words[t.length++]=s&r,i=10;i<e.length;i++){var o=0|e.words[i];e.words[i-10]=(o&r)<<4|s>>>22,s=o}s>>>=22,e.words[i-10]=s,0===s&&e.length>10?e.length-=10:e.length-=9},v.prototype.imulK=function(e){e.words[e.length]=0,e.words[e.length+1]=0,e.length+=2;for(var t=0,r=0;r<e.length;r++){var n=0|e.words[r];t+=977*n,e.words[r]=67108863&t,t=64*n+(t/67108864|0)}return 0===e.words[e.length-1]&&(e.length--,0===e.words[e.length-1]&&e.length--),e},n(A,b),n(E,b),n(x,b),x.prototype.imulK=function(e){for(var t=0,r=0;r<e.length;r++){var n=19*(0|e.words[r])+t,i=67108863&n;n>>>=26,e.words[r]=i,t=n}return 0!==t&&(e.words[e.length++]=t),e},i._prime=function(e){if(w[e])return w[e];var t;if("k256"===e)t=new v;else if("p224"===e)t=new A;else if("p192"===e)t=new E;else{if("p25519"!==e)throw new Error("Unknown prime "+e);t=new x}return w[e]=t,t},C.prototype._verify1=function(e){r(0===e.negative,"red works only with positives"),r(e.red,"red works only with red numbers")},C.prototype._verify2=function(e,t){r(!(e.negative|t.negative),"red works only with positives"),r(e.red&&e.red===t.red,"red works only with red numbers")},C.prototype.imod=function(e){return this.prime?this.prime.ireduce(e)._forceRed(this):(l(e,e.umod(this.m)._forceRed(this)),e)},C.prototype.neg=function(e){return e.isZero()?e.clone():this.m.sub(e)._forceRed(this)},C.prototype.add=function(e,t){this._verify2(e,t);var r=e.add(t);return r.cmp(this.m)>=0&&r.isub(this.m),r._forceRed(this)},C.prototype.iadd=function(e,t){this._verify2(e,t);var r=e.iadd(t);return r.cmp(this.m)>=0&&r.isub(this.m),r},C.prototype.sub=function(e,t){this._verify2(e,t);var r=e.sub(t);return r.cmpn(0)<0&&r.iadd(this.m),r._forceRed(this)},C.prototype.isub=function(e,t){this._verify2(e,t);var r=e.isub(t);return r.cmpn(0)<0&&r.iadd(this.m),r},C.prototype.shl=function(e,t){return this._verify1(e),this.imod(e.ushln(t))},C.prototype.imul=function(e,t){return this._verify2(e,t),this.imod(e.imul(t))},C.prototype.mul=function(e,t){return this._verify2(e,t),this.imod(e.mul(t))},C.prototype.isqr=function(e){return this.imul(e,e.clone())},C.prototype.sqr=function(e){return this.mul(e,e)},C.prototype.sqrt=function(e){if(e.isZero())return e.clone();var t=this.m.andln(3);if(r(t%2==1),3===t){var n=this.m.add(new i(1)).iushrn(2);return this.pow(e,n)}for(var s=this.m.subn(1),o=0;!s.isZero()&&0===s.andln(1);)o++,s.iushrn(1);r(!s.isZero());var a=new i(1).toRed(this),c=a.redNeg(),l=this.m.subn(1).iushrn(1),u=this.m.bitLength();for(u=new i(2*u*u).toRed(this);0!==this.pow(u,l).cmp(c);)u.redIAdd(c);for(var h=this.pow(u,s),d=this.pow(e,s.addn(1).iushrn(1)),f=this.pow(e,s),p=o;0!==f.cmp(a);){for(var g=f,m=0;0!==g.cmp(a);m++)g=g.redSqr();r(m<p);var y=this.pow(h,new i(1).iushln(p-m-1));d=d.redMul(y),h=y.redSqr(),f=f.redMul(h),p=m}return d},C.prototype.invm=function(e){var t=e._invmp(this.m);return 0!==t.negative?(t.negative=0,this.imod(t).redNeg()):this.imod(t)},C.prototype.pow=function(e,t){if(t.isZero())return new i(1).toRed(this);if(0===t.cmpn(1))return e.clone();var r=new Array(16);r[0]=new i(1).toRed(this),r[1]=e;for(var n=2;n<r.length;n++)r[n]=this.mul(r[n-1],e);var s=r[0],o=0,a=0,c=t.bitLength()%26;for(0===c&&(c=26),n=t.length-1;n>=0;n--){for(var l=t.words[n],u=c-1;u>=0;u--){var h=l>>u&1;s!==r[0]&&(s=this.sqr(s)),0!==h||0!==o?(o<<=1,o|=h,(4==++a||0===n&&0===u)&&(s=this.mul(s,r[o]),a=0,o=0)):a=0}c=26}return s},C.prototype.convertTo=function(e){var t=e.umod(this.m);return t===e?t.clone():t},C.prototype.convertFrom=function(e){var t=e.clone();return t.red=null,t},i.mont=function(e){return new S(e)},n(S,C),S.prototype.convertTo=function(e){return this.imod(e.ushln(this.shift))},S.prototype.convertFrom=function(e){var t=this.imod(e.mul(this.rinv));return t.red=null,t},S.prototype.imul=function(e,t){if(e.isZero()||t.isZero())return e.words[0]=0,e.length=1,e;var r=e.imul(t),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),i=r.isub(n).iushrn(this.shift),s=i;return i.cmp(this.m)>=0?s=i.isub(this.m):i.cmpn(0)<0&&(s=i.iadd(this.m)),s._forceRed(this)},S.prototype.mul=function(e,t){if(e.isZero()||t.isZero())return new i(0)._forceRed(this);var r=e.mul(t),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),s=r.isub(n).iushrn(this.shift),o=s;return s.cmp(this.m)>=0?o=s.isub(this.m):s.cmpn(0)<0&&(o=s.iadd(this.m)),o._forceRed(this)},S.prototype.invm=function(e){return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this)}}(e,h)}(O);var N=O.exports;const B="bignumber/5.7.0";var U=N.BN;const D=new A(B),L={},F=9007199254740991;let j=!1;class H{constructor(e,t){e!==L&&D.throwError("cannot call constructor directly; use BigNumber.from",A.errors.UNSUPPORTED_OPERATION,{operation:"new (BigNumber)"}),this._hex=t,this._isBigNumber=!0,Object.freeze(this)}fromTwos(e){return q($(this).fromTwos(e))}toTwos(e){return q($(this).toTwos(e))}abs(){return"-"===this._hex[0]?H.from(this._hex.substring(1)):this}add(e){return q($(this).add($(e)))}sub(e){return q($(this).sub($(e)))}div(e){return H.from(e).isZero()&&W("division-by-zero","div"),q($(this).div($(e)))}mul(e){return q($(this).mul($(e)))}mod(e){const t=$(e);return t.isNeg()&&W("division-by-zero","mod"),q($(this).umod(t))}pow(e){const t=$(e);return t.isNeg()&&W("negative-power","pow"),q($(this).pow(t))}and(e){const t=$(e);return(this.isNegative()||t.isNeg())&&W("unbound-bitwise-result","and"),q($(this).and(t))}or(e){const t=$(e);return(this.isNegative()||t.isNeg())&&W("unbound-bitwise-result","or"),q($(this).or(t))}xor(e){const t=$(e);return(this.isNegative()||t.isNeg())&&W("unbound-bitwise-result","xor"),q($(this).xor(t))}mask(e){return(this.isNegative()||e<0)&&W("negative-width","mask"),q($(this).maskn(e))}shl(e){return(this.isNegative()||e<0)&&W("negative-width","shl"),q($(this).shln(e))}shr(e){return(this.isNegative()||e<0)&&W("negative-width","shr"),q($(this).shrn(e))}eq(e){return $(this).eq($(e))}lt(e){return $(this).lt($(e))}lte(e){return $(this).lte($(e))}gt(e){return $(this).gt($(e))}gte(e){return $(this).gte($(e))}isNegative(){return"-"===this._hex[0]}isZero(){return $(this).isZero()}toNumber(){try{return $(this).toNumber()}catch{W("overflow","toNumber",this.toString())}return null}toBigInt(){try{return BigInt(this.toString())}catch{}return D.throwError("this platform does not support BigInt",A.errors.UNSUPPORTED_OPERATION,{value:this.toString()})}toString(){return arguments.length>0&&(10===arguments[0]?j||(j=!0,D.warn("BigNumber.toString does not accept any parameters; base-10 is assumed")):16===arguments[0]?D.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()",A.errors.UNEXPECTED_ARGUMENT,{}):D.throwError("BigNumber.toString does not accept parameters",A.errors.UNEXPECTED_ARGUMENT,{})),$(this).toString(10)}toHexString(){return this._hex}toJSON(e){return{type:"BigNumber",hex:this.toHexString()}}static from(e){if(e instanceof H)return e;if("string"==typeof e)return e.match(/^-?0x[0-9a-f]+$/i)?new H(L,z(e)):e.match(/^-?[0-9]+$/)?new H(L,z(new U(e))):D.throwArgumentError("invalid BigNumber string","value",e);if("number"==typeof e)return e%1&&W("underflow","BigNumber.from",e),(e>=F||e<=-F)&&W("overflow","BigNumber.from",e),H.from(String(e));const t=e;if("bigint"==typeof t)return H.from(t.toString());if(k(t))return H.from(T(t));if(t)if(t.toHexString){const e=t.toHexString();if("string"==typeof e)return H.from(e)}else{let e=t._hex;if(null==e&&"BigNumber"===t.type&&(e=t.hex),"string"==typeof e&&(I(e)||"-"===e[0]&&I(e.substring(1))))return H.from(e)}return D.throwArgumentError("invalid BigNumber value","value",e)}static isBigNumber(e){return!(!e||!e._isBigNumber)}}function z(e){if("string"!=typeof e)return z(e.toString(16));if("-"===e[0])return"-"===(e=e.substring(1))[0]&&D.throwArgumentError("invalid hex","value",e),"0x00"===(e=z(e))?e:"-"+e;if("0x"!==e.substring(0,2)&&(e="0x"+e),"0x"===e)return"0x00";for(e.length%2&&(e="0x0"+e.substring(2));e.length>4&&"0x00"===e.substring(0,4);)e="0x"+e.substring(4);return e}function q(e){return H.from(z(e))}function $(e){const t=H.from(e).toHexString();return"-"===t[0]?new U("-"+t.substring(3),16):new U(t.substring(2),16)}function W(e,t,r){const n={fault:e,operation:t};return null!=r&&(n.value=r),D.throwError(e,A.errors.NUMERIC_FAULT,n)}const G=new A(B),V={},K=H.from(0),Z=H.from(-1);function Q(e,t,r,n){const i={fault:t,operation:r};return void 0!==n&&(i.value=n),G.throwError(e,A.errors.NUMERIC_FAULT,i)}let J="0";for(;J.length<256;)J+=J;function Y(e){if("number"!=typeof e)try{e=H.from(e).toNumber()}catch{}return"number"==typeof e&&e>=0&&e<=256&&!(e%1)?"1"+J.substring(0,e):G.throwArgumentError("invalid decimal size","decimals",e)}function X(e,t){null==t&&(t=0);const r=Y(t),n=(e=H.from(e)).lt(K);n&&(e=e.mul(Z));let i=e.mod(r).toString();for(;i.length<r.length-1;)i="0"+i;i=i.match(/^([0-9]*[1-9]|0)(0*)/)[1];const s=e.div(r).toString();return e=1===r.length?s:s+"."+i,n&&(e="-"+e),e}function ee(e,t){null==t&&(t=0);const r=Y(t);("string"!=typeof e||!e.match(/^-?[0-9.]+$/))&&G.throwArgumentError("invalid decimal value","value",e);const n="-"===e.substring(0,1);n&&(e=e.substring(1)),"."===e&&G.throwArgumentError("missing value","value",e);const i=e.split(".");i.length>2&&G.throwArgumentError("too many decimal points","value",e);let s=i[0],o=i[1];for(s||(s="0"),o||(o="0");"0"===o[o.length-1];)o=o.substring(0,o.length-1);for(o.length>r.length-1&&Q("fractional component exceeds decimals","underflow","parseFixed"),""===o&&(o="0");o.length<r.length-1;)o+="0";const a=H.from(s),c=H.from(o);let l=a.mul(r).add(c);return n&&(l=l.mul(Z)),l}class te{constructor(e,t,r,n){e!==V&&G.throwError("cannot use FixedFormat constructor; use FixedFormat.from",A.errors.UNSUPPORTED_OPERATION,{operation:"new FixedFormat"}),this.signed=t,this.width=r,this.decimals=n,this.name=(t?"":"u")+"fixed"+String(r)+"x"+String(n),this._multiplier=Y(n),Object.freeze(this)}static from(e){if(e instanceof te)return e;"number"==typeof e&&(e=`fixed128x${e}`);let t=!0,r=128,n=18;if("string"==typeof e){if("fixed"!==e)if("ufixed"===e)t=!1;else{const i=e.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);i||G.throwArgumentError("invalid fixed format","format",e),t="u"!==i[1],r=parseInt(i[2]),n=parseInt(i[3])}}else if(e){const i=(t,r,n)=>null==e[t]?n:(typeof e[t]!==r&&G.throwArgumentError("invalid fixed format ("+t+" not "+r+")","format."+t,e[t]),e[t]);t=i("signed","boolean",t),r=i("width","number",r),n=i("decimals","number",n)}return r%8&&G.throwArgumentError("invalid fixed format width (not byte aligned)","format.width",r),n>80&&G.throwArgumentError("invalid fixed format (decimals too large)","format.decimals",n),new te(V,t,r,n)}}class re{constructor(e,t,r,n){e!==V&&G.throwError("cannot use FixedNumber constructor; use FixedNumber.from",A.errors.UNSUPPORTED_OPERATION,{operation:"new FixedFormat"}),this.format=n,this._hex=t,this._value=r,this._isFixedNumber=!0,Object.freeze(this)}_checkFormat(e){this.format.name!==e.format.name&&G.throwArgumentError("incompatible format; use fixedNumber.toFormat","other",e)}addUnsafe(e){this._checkFormat(e);const t=ee(this._value,this.format.decimals),r=ee(e._value,e.format.decimals);return re.fromValue(t.add(r),this.format.decimals,this.format)}subUnsafe(e){this._checkFormat(e);const t=ee(this._value,this.format.decimals),r=ee(e._value,e.format.decimals);return re.fromValue(t.sub(r),this.format.decimals,this.format)}mulUnsafe(e){this._checkFormat(e);const t=ee(this._value,this.format.decimals),r=ee(e._value,e.format.decimals);return re.fromValue(t.mul(r).div(this.format._multiplier),this.format.decimals,this.format)}divUnsafe(e){this._checkFormat(e);const t=ee(this._value,this.format.decimals),r=ee(e._value,e.format.decimals);return re.fromValue(t.mul(this.format._multiplier).div(r),this.format.decimals,this.format)}floor(){const e=this.toString().split(".");1===e.length&&e.push("0");let t=re.from(e[0],this.format);const r=!e[1].match(/^(0*)$/);return this.isNegative()&&r&&(t=t.subUnsafe(ne.toFormat(t.format))),t}ceiling(){const e=this.toString().split(".");1===e.length&&e.push("0");let t=re.from(e[0],this.format);const r=!e[1].match(/^(0*)$/);return!this.isNegative()&&r&&(t=t.addUnsafe(ne.toFormat(t.format))),t}round(e){null==e&&(e=0);const t=this.toString().split(".");if(1===t.length&&t.push("0"),(e<0||e>80||e%1)&&G.throwArgumentError("invalid decimal count","decimals",e),t[1].length<=e)return this;const r=re.from("1"+J.substring(0,e),this.format),n=ie.toFormat(this.format);return this.mulUnsafe(r).addUnsafe(n).floor().divUnsafe(r)}isZero(){return"0.0"===this._value||"0"===this._value}isNegative(){return"-"===this._value[0]}toString(){return this._value}toHexString(e){return null==e?this._hex:(e%8&&G.throwArgumentError("invalid byte width","width",e),P(H.from(this._hex).fromTwos(this.format.width).toTwos(e).toHexString(),e/8))}toUnsafeFloat(){return parseFloat(this.toString())}toFormat(e){return re.fromString(this._value,e)}static fromValue(e,t,r){return null==r&&null!=t&&!function(e){return null!=e&&(H.isBigNumber(e)||"number"==typeof e&&e%1==0||"string"==typeof e&&!!e.match(/^-?[0-9]+$/)||I(e)||"bigint"==typeof e||k(e))}(t)&&(r=t,t=null),null==t&&(t=0),null==r&&(r="fixed"),re.fromString(X(e,t),te.from(r))}static fromString(e,t){null==t&&(t="fixed");const r=te.from(t),n=ee(e,r.decimals);!r.signed&&n.lt(K)&&Q("unsigned value cannot be negative","overflow","value",e);let i=null;r.signed?i=n.toTwos(r.width).toHexString():(i=n.toHexString(),i=P(i,r.width/8));const s=X(n,r.decimals);return new re(V,i,s,r)}static fromBytes(e,t){null==t&&(t="fixed");const r=te.from(t);if(_(e).length>r.width/8)throw new Error("overflow");let n=H.from(e);r.signed&&(n=n.fromTwos(r.width));const i=n.toTwos((r.signed?0:1)+r.width).toHexString(),s=X(n,r.decimals);return new re(V,i,s,r)}static from(e,t){if("string"==typeof e)return re.fromString(e,t);if(k(e))return re.fromBytes(e,t);try{return re.fromValue(e,0,t)}catch(e){if(e.code!==A.errors.INVALID_ARGUMENT)throw e}return G.throwArgumentError("invalid FixedNumber value","value",e)}static isFixedNumber(e){return!(!e||!e._isFixedNumber)}}const ne=re.from(1),ie=re.from("0.5"),se=new A("strings/5.7.0");var oe,ae;function ce(e,t,r,n,i){if(e===ae.BAD_PREFIX||e===ae.UNEXPECTED_CONTINUE){let e=0;for(let n=t+1;n<r.length&&r[n]>>6==2;n++)e++;return e}return e===ae.OVERRUN?r.length-t-1:0}function le(e,t){t||(t=function(e){return[parseInt(e,16)]});let r=0,n={};return e.split(",").forEach((e=>{let i=e.split(":");r+=parseInt(i[0],16),n[r]=t(i[1])})),n}function ue(e){let t=0;return e.split(",").map((e=>{let r=e.split("-");1===r.length?r[1]="0":""===r[1]&&(r[1]="1");let n=t+parseInt(r[0],16);return t=parseInt(r[1],16),{l:n,h:t}}))}!function(e){e.current="",e.NFC="NFC",e.NFD="NFD",e.NFKC="NFKC",e.NFKD="NFKD"}(oe||(oe={})),function(e){e.UNEXPECTED_CONTINUE="unexpected continuation byte",e.BAD_PREFIX="bad codepoint prefix",e.OVERRUN="string overrun",e.MISSING_CONTINUE="missing continuation byte",e.OUT_OF_RANGE="out of UTF-8 range",e.UTF16_SURROGATE="UTF-16 surrogate",e.OVERLONG="overlong representation"}(ae||(ae={})),Object.freeze({error:function(e,t,r,n,i){return se.throwArgumentError(`invalid codepoint at offset ${t}; ${e}`,"bytes",r)},ignore:ce,replace:function(e,t,r,n,i){return e===ae.OVERLONG?(n.push(i),0):(n.push(65533),ce(e,t,r))}}),ue("221,13-1b,5f-,40-10,51-f,11-3,3-3,2-2,2-4,8,2,15,2d,28-8,88,48,27-,3-5,11-20,27-,8,28,3-5,12,18,b-a,1c-4,6-16,2-d,2-2,2,1b-4,17-9,8f-,10,f,1f-2,1c-34,33-14e,4,36-,13-,6-2,1a-f,4,9-,3-,17,8,2-2,5-,2,8-,3-,4-8,2-3,3,6-,16-6,2-,7-3,3-,17,8,3,3,3-,2,6-3,3-,4-a,5,2-6,10-b,4,8,2,4,17,8,3,6-,b,4,4-,2-e,2-4,b-10,4,9-,3-,17,8,3-,5-,9-2,3-,4-7,3-3,3,4-3,c-10,3,7-2,4,5-2,3,2,3-2,3-2,4-2,9,4-3,6-2,4,5-8,2-e,d-d,4,9,4,18,b,6-3,8,4,5-6,3-8,3-3,b-11,3,9,4,18,b,6-3,8,4,5-6,3-6,2,3-3,b-11,3,9,4,18,11-3,7-,4,5-8,2-7,3-3,b-11,3,13-2,19,a,2-,8-2,2-3,7,2,9-11,4-b,3b-3,1e-24,3,2-,3,2-,2-5,5,8,4,2,2-,3,e,4-,6,2,7-,b-,3-21,49,23-5,1c-3,9,25,10-,2-2f,23,6,3,8-2,5-5,1b-45,27-9,2a-,2-3,5b-4,45-4,53-5,8,40,2,5-,8,2,5-,28,2,5-,20,2,5-,8,2,5-,8,8,18,20,2,5-,8,28,14-5,1d-22,56-b,277-8,1e-2,52-e,e,8-a,18-8,15-b,e,4,3-b,5e-2,b-15,10,b-5,59-7,2b-555,9d-3,5b-5,17-,7-,27-,7-,9,2,2,2,20-,36,10,f-,7,14-,4,a,54-3,2-6,6-5,9-,1c-10,13-1d,1c-14,3c-,10-6,32-b,240-30,28-18,c-14,a0,115-,3,66-,b-76,5,5-,1d,24,2,5-2,2,8-,35-2,19,f-10,1d-3,311-37f,1b,5a-b,d7-19,d-3,41,57-,68-4,29-3,5f,29-37,2e-2,25-c,2c-2,4e-3,30,78-3,64-,20,19b7-49,51a7-59,48e-2,38-738,2ba5-5b,222f-,3c-94,8-b,6-4,1b,6,2,3,3,6d-20,16e-f,41-,37-7,2e-2,11-f,5-b,18-,b,14,5-3,6,88-,2,bf-2,7-,7-,7-,4-2,8,8-9,8-2ff,20,5-b,1c-b4,27-,27-cbb1,f7-9,28-2,b5-221,56,48,3-,2-,3-,5,d,2,5,3,42,5-,9,8,1d,5,6,2-2,8,153-3,123-3,33-27fd,a6da-5128,21f-5df,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3,2-1d,61-ff7d"),"ad,34f,1806,180b,180c,180d,200b,200c,200d,2060,feff".split(",").map((e=>parseInt(e,16))),le("b5:3bc,c3:ff,7:73,2:253,5:254,3:256,1:257,5:259,1:25b,3:260,1:263,2:269,1:268,5:26f,1:272,2:275,7:280,3:283,5:288,3:28a,1:28b,5:292,3f:195,1:1bf,29:19e,125:3b9,8b:3b2,1:3b8,1:3c5,3:3c6,1:3c0,1a:3ba,1:3c1,1:3c3,2:3b8,1:3b5,1bc9:3b9,1c:1f76,1:1f77,f:1f7a,1:1f7b,d:1f78,1:1f79,1:1f7c,1:1f7d,107:63,5:25b,4:68,1:68,1:68,3:69,1:69,1:6c,3:6e,4:70,1:71,1:72,1:72,1:72,7:7a,2:3c9,2:7a,2:6b,1:e5,1:62,1:63,3:65,1:66,2:6d,b:3b3,1:3c0,6:64,1b574:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3"),le("179:1,2:1,2:1,5:1,2:1,a:4f,a:1,8:1,2:1,2:1,3:1,5:1,3:1,4:1,2:1,3:1,4:1,8:2,1:1,2:2,1:1,2:2,27:2,195:26,2:25,1:25,1:25,2:40,2:3f,1:3f,33:1,11:-6,1:-9,1ac7:-3a,6d:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,b:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,c:-8,2:-8,2:-8,2:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,49:-8,1:-8,1:-4a,1:-4a,d:-56,1:-56,1:-56,1:-56,d:-8,1:-8,f:-8,1:-8,3:-7"),le("df:00730073,51:00690307,19:02BC006E,a7:006A030C,18a:002003B9,16:03B903080301,20:03C503080301,1d7:05650582,190f:00680331,1:00740308,1:0077030A,1:0079030A,1:006102BE,b6:03C50313,2:03C503130300,2:03C503130301,2:03C503130342,2a:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,3:1F7003B9,1:03B103B9,1:03AC03B9,2:03B10342,1:03B1034203B9,5:03B103B9,6:1F7403B9,1:03B703B9,1:03AE03B9,2:03B70342,1:03B7034203B9,5:03B703B9,6:03B903080300,1:03B903080301,3:03B90342,1:03B903080342,b:03C503080300,1:03C503080301,1:03C10313,2:03C50342,1:03C503080342,b:1F7C03B9,1:03C903B9,1:03CE03B9,2:03C90342,1:03C9034203B9,5:03C903B9,ac:00720073,5b:00B00063,6:00B00066,d:006E006F,a:0073006D,1:00740065006C,1:0074006D,124f:006800700061,2:00610075,2:006F0076,b:00700061,1:006E0061,1:03BC0061,1:006D0061,1:006B0061,1:006B0062,1:006D0062,1:00670062,3:00700066,1:006E0066,1:03BC0066,4:0068007A,1:006B0068007A,1:006D0068007A,1:00670068007A,1:00740068007A,15:00700061,1:006B00700061,1:006D00700061,1:006700700061,8:00700076,1:006E0076,1:03BC0076,1:006D0076,1:006B0076,1:006D0076,1:00700077,1:006E0077,1:03BC0077,1:006D0077,1:006B0077,1:006D0077,1:006B03C9,1:006D03C9,2:00620071,3:00632215006B0067,1:0063006F002E,1:00640062,1:00670079,2:00680070,2:006B006B,1:006B006D,9:00700068,2:00700070006D,1:00700072,2:00730076,1:00770062,c723:00660066,1:00660069,1:0066006C,1:006600660069,1:00660066006C,1:00730074,1:00730074,d:05740576,1:05740565,1:0574056B,1:057E0576,1:0574056D",(function(e){if(e.length%4!=0)throw new Error("bad data");let t=[];for(let r=0;r<e.length;r+=4)t.push(parseInt(e.substring(r,r+4),16));return t})),ue("80-20,2a0-,39c,32,f71,18e,7f2-f,19-7,30-4,7-5,f81-b,5,a800-20ff,4d1-1f,110,fa-6,d174-7,2e84-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,2,1f-5f,ff7f-20001");const he="hash/5.7.0";function de(e,t){null==t&&(t=1);const r=[],n=r.forEach,i=function(e,t){n.call(e,(function(e){t>0&&Array.isArray(e)?i(e,t-1):r.push(e)}))};return i(e,t),r}function fe(e){return 1&e?~e>>1:e>>1}function pe(e,t){let r=Array(e);for(let n=0,i=-1;n<e;n++)r[n]=i+=1+t();return r}function ge(e,t){let r=Array(e);for(let n=0,i=0;n<e;n++)r[n]=i+=fe(t());return r}function me(e,t){let r=pe(e(),e),n=e(),i=pe(n,e),s=function(e,t){let r=Array(e);for(let n=0;n<e;n++)r[n]=1+t();return r}(n,e);for(let e=0;e<n;e++)for(let t=0;t<s[e];t++)r.push(i[e]+t);return t?r.map((e=>t[e])):r}function ye(e,t,r){let n=Array(e).fill(void 0).map((()=>[]));for(let i=0;i<t;i++)ge(e,r).forEach(((e,t)=>n[t].push(e)));return n}function we(e,t){let r=1+t(),n=t(),i=function(e){let t=[];for(;;){let r=e();if(0==r)break;t.push(r)}return t}(t);return de(ye(i.length,1+e,t).map(((e,t)=>{const s=e[0],o=e.slice(1);return Array(i[t]).fill(void 0).map(((e,t)=>{let i=t*n;return[s+t*r,o.map((e=>e+i))]}))})))}function be(e,t){return ye(1+t(),1+e,t).map((e=>[e[0],e.slice(1)]))}const ve=function(e){return function(e){let t=0;return()=>e[t++]}(function(e){let t=0;function r(){return e[t++]<<8|e[t++]}let n=r(),i=1,s=[0,1];for(let e=1;e<n;e++)s.push(i+=r());let o=r(),a=t;t+=o;let c=0,l=0;function u(){return 0==c&&(l=l<<8|e[t++],c=8),l>>--c&1}const h=Math.pow(2,31),d=h>>>1,f=d>>1,p=h-1;let g=0;for(let e=0;e<31;e++)g=g<<1|u();let m=[],y=0,w=h;for(;;){let e=Math.floor(((g-y+1)*i-1)/w),t=0,r=n;for(;r-t>1;){let n=t+r>>>1;e<s[n]?r=n:t=n}if(0==t)break;m.push(t);let o=y+Math.floor(w*s[t]/i),a=y+Math.floor(w*s[t+1]/i)-1;for(;!((o^a)&d);)g=g<<1&p|u(),o=o<<1&p,a=a<<1&p|1;for(;o&~a&f;)g=g&d|g<<1&p>>>1|u(),o=o<<1^d,a=(a^d)<<1|d|1;y=o,w=1+a-o}let b=n-4;return m.map((t=>{switch(t-b){case 3:return b+65792+(e[a++]<<16|e[a++]<<8|e[a++]);case 2:return b+256+(e[a++]<<8|e[a++]);case 1:return b+e[a++];default:return t-1}}))}(e))}(function(e){e=atob(e);const t=[];for(let r=0;r<e.length;r++)t.push(e.charCodeAt(r));return _(t)}("AEQF2AO2DEsA2wIrAGsBRABxAN8AZwCcAEwAqgA0AGwAUgByADcATAAVAFYAIQAyACEAKAAYAFgAGwAjABQAMAAmADIAFAAfABQAKwATACoADgAbAA8AHQAYABoAGQAxADgALAAoADwAEwA9ABMAGgARAA4ADwAWABMAFgAIAA8AHgQXBYMA5BHJAS8JtAYoAe4AExozi0UAH21tAaMnBT8CrnIyhrMDhRgDygIBUAEHcoFHUPe8AXBjAewCjgDQR8IICIcEcQLwATXCDgzvHwBmBoHNAqsBdBcUAykgDhAMShskMgo8AY8jqAQfAUAfHw8BDw87MioGlCIPBwZCa4ELatMAAMspJVgsDl8AIhckSg8XAHdvTwBcIQEiDT4OPhUqbyECAEoAS34Aej8Ybx83JgT/Xw8gHxZ/7w8RICxPHA9vBw+Pfw8PHwAPFv+fAsAvCc8vEr8ivwD/EQ8Bol8OEBa/A78hrwAPCU8vESNvvwWfHwNfAVoDHr+ZAAED34YaAdJPAK7PLwSEgDLHAGo1Pz8Pvx9fUwMrpb8O/58VTzAPIBoXIyQJNF8hpwIVAT8YGAUADDNBaX3RAMomJCg9EhUeA29MABsZBTMNJipjOhc19gcIDR8bBwQHEggCWi6DIgLuAQYA+BAFCha3A5XiAEsqM7UFFgFLhAMjFTMYE1Klnw74nRVBG/ASCm0BYRN/BrsU3VoWy+S0vV8LQx+vN8gF2AC2AK5EAWwApgYDKmAAroQ0NDQ0AT+OCg7wAAIHRAbpNgVcBV0APTA5BfbPFgMLzcYL/QqqA82eBALKCjQCjqYCht0/k2+OAsXQAoP3ASTKDgDw6ACKAUYCMpIKJpRaAE4A5womABzZvs0REEKiACIQAd5QdAECAj4Ywg/wGqY2AVgAYADYvAoCGAEubA0gvAY2ALAAbpbvqpyEAGAEpgQAJgAG7gAgAEACmghUFwCqAMpAINQIwC4DthRAAPcycKgApoIdABwBfCisABoATwBqASIAvhnSBP8aH/ECeAKXAq40NjgDBTwFYQU6AXs3oABgAD4XNgmcCY1eCl5tIFZeUqGgyoNHABgAEQAaABNwWQAmABMATPMa3T34ADldyprmM1M2XociUQgLzvwAXT3xABgAEQAaABNwIGFAnADD8AAgAD4BBJWzaCcIAIEBFMAWwKoAAdq9BWAF5wLQpALEtQAKUSGkahR4GnJM+gsAwCgeFAiUAECQ0BQuL8AAIAAAADKeIheclvFqQAAETr4iAMxIARMgAMIoHhQIAn0E0pDQFC4HhznoAAAAIAI2C0/4lvFqQAAETgBJJwYCAy4ABgYAFAA8MBKYEH4eRhTkAjYeFcgACAYAeABsOqyQ5gRwDayqugEgaIIAtgoACgDmEABmBAWGme5OBJJA2m4cDeoAmITWAXwrMgOgAGwBCh6CBXYF1Tzg1wKAAFdiuABRAFwAXQBsAG8AdgBrAHYAbwCEAHEwfxQBVE5TEQADVFhTBwBDANILAqcCzgLTApQCrQL6vAAMAL8APLhNBKkE6glGKTAU4Dr4N2EYEwBCkABKk8rHAbYBmwIoAiU4Ajf/Aq4CowCAANIChzgaNBsCsTgeODcFXrgClQKdAqQBiQGYAqsCsjTsNHsfNPA0ixsAWTWiOAMFPDQSNCk2BDZHNow2TTZUNhk28Jk9VzI3QkEoAoICoQKwAqcAQAAxBV4FXbS9BW47YkIXP1ciUqs05DS/FwABUwJW11e6nHuYZmSh/RAYA8oMKvZ8KASoUAJYWAJ6ILAsAZSoqjpgA0ocBIhmDgDWAAawRDQoAAcuAj5iAHABZiR2AIgiHgCaAU68ACxuHAG0ygM8MiZIAlgBdF4GagJqAPZOHAMuBgoATkYAsABiAHgAMLoGDPj0HpKEBAAOJgAuALggTAHWAeAMEDbd20Uege0ADwAWADkAQgA9OHd+2MUQZBBhBgNNDkxxPxUQArEPqwvqERoM1irQ090ANK4H8ANYB/ADWANYB/AH8ANYB/ADWANYA1gDWBwP8B/YxRBkD00EcgWTBZAE2wiIJk4RhgctCNdUEnQjHEwDSgEBIypJITuYMxAlR0wRTQgIATZHbKx9PQNMMbBU+pCnA9AyVDlxBgMedhKlAC8PeCE1uk6DekxxpQpQT7NX9wBFBgASqwAS5gBJDSgAUCwGPQBI4zTYABNGAE2bAE3KAExdGABKaAbgAFBXAFCOAFBJABI2SWdObALDOq0//QomCZhvwHdTBkIQHCemEPgMNAG2ATwN7kvZBPIGPATKH34ZGg/OlZ0Ipi3eDO4m5C6igFsj9iqEBe5L9TzeC05RaQ9aC2YJ5DpkgU8DIgEOIowK3g06CG4Q9ArKbA3mEUYHOgPWSZsApgcCCxIdNhW2JhFirQsKOXgG/Br3C5AmsBMqev0F1BoiBk4BKhsAANAu6IWxWjJcHU9gBgQLJiPIFKlQIQ0mQLh4SRocBxYlqgKSQ3FKiFE3HpQh9zw+DWcuFFF9B/Y8BhlQC4I8n0asRQ8R0z6OPUkiSkwtBDaALDAnjAnQD4YMunxzAVoJIgmyDHITMhEYN8YIOgcaLpclJxYIIkaWYJsE+KAD9BPSAwwFQAlCBxQDthwuEy8VKgUOgSXYAvQ21i60ApBWgQEYBcwPJh/gEFFH4Q7qCJwCZgOEJewALhUiABginAhEZABgj9lTBi7MCMhqbSN1A2gU6GIRdAeSDlgHqBw0FcAc4nDJXgyGCSiksAlcAXYJmgFgBOQICjVcjKEgQmdUi1kYnCBiQUBd/QIyDGYVoES+h3kCjA9sEhwBNgF0BzoNAgJ4Ee4RbBCWCOyGBTW2M/k6JgRQIYQgEgooA1BszwsoJvoM+WoBpBJjAw00PnfvZ6xgtyUX/gcaMsZBYSHyC5NPzgydGsIYQ1QvGeUHwAP0GvQn60FYBgADpAQUOk4z7wS+C2oIjAlAAEoOpBgH2BhrCnKM0QEyjAG4mgNYkoQCcJAGOAcMAGgMiAV65gAeAqgIpAAGANADWAA6Aq4HngAaAIZCAT4DKDABIuYCkAOUCDLMAZYwAfQqBBzEDBYA+DhuSwLDsgKAa2ajBd5ZAo8CSjYBTiYEBk9IUgOwcuIA3ABMBhTgSAEWrEvMG+REAeBwLADIAPwABjYHBkIBzgH0bgC4AWALMgmjtLYBTuoqAIQAFmwB2AKKAN4ANgCA8gFUAE4FWvoF1AJQSgESMhksWGIBvAMgATQBDgB6BsyOpsoIIARuB9QCEBwV4gLvLwe2AgMi4BPOQsYCvd9WADIXUu5eZwqoCqdeaAC0YTQHMnM9UQAPH6k+yAdy/BZIiQImSwBQ5gBQQzSaNTFWSTYBpwGqKQK38AFtqwBI/wK37gK3rQK3sAK6280C0gK33AK3zxAAUEIAUD9SklKDArekArw5AEQAzAHCO147WTteO1k7XjtZO147WTteO1kDmChYI03AVU0oJqkKbV9GYewMpw3VRMk6ShPcYFJgMxPJLbgUwhXPJVcZPhq9JwYl5VUKDwUt1GYxCC00dhe9AEApaYNCY4ceMQpMHOhTklT5LRwAskujM7ANrRsWREEFSHXuYisWDwojAmSCAmJDXE6wXDchAqH4AmiZAmYKAp+FOBwMAmY8AmYnBG8EgAN/FAN+kzkHOXgYOYM6JCQCbB4CMjc4CwJtyAJtr/CLADRoRiwBaADfAOIASwYHmQyOAP8MwwAOtgJ3MAJ2o0ACeUxEAni7Hl3cRa9G9AJ8QAJ6yQJ9CgJ88UgBSH5kJQAsFklZSlwWGErNAtECAtDNSygDiFADh+dExpEzAvKiXQQDA69Lz0wuJgTQTU1NsAKLQAKK2cIcCB5EaAa4Ao44Ao5dQZiCAo7aAo5deVG1UzYLUtVUhgKT/AKTDQDqAB1VH1WwVdEHLBwplocy4nhnRTw6ApegAu+zWCKpAFomApaQApZ9nQCqWa1aCoJOADwClrYClk9cRVzSApnMApllXMtdCBoCnJw5wzqeApwXAp+cAp65iwAeEDIrEAKd8gKekwC2PmE1YfACntQCoG8BqgKeoCACnk+mY8lkKCYsAiewAiZ/AqD8AqBN2AKmMAKlzwKoAAB+AqfzaH1osgAESmodatICrOQCrK8CrWgCrQMCVx4CVd0CseLYAx9PbJgCsr4OArLpGGzhbWRtSWADJc4Ctl08QG6RAylGArhfArlIFgK5K3hwN3DiAr0aAy2zAzISAr6JcgMDM3ICvhtzI3NQAsPMAsMFc4N0TDZGdOEDPKgDPJsDPcACxX0CxkgCxhGKAshqUgLIRQLJUALJLwJkngLd03h6YniveSZL0QMYpGcDAmH1GfSVJXsMXpNevBICz2wCz20wTFTT9BSgAMeuAs90ASrrA04TfkwGAtwoAtuLAtJQA1JdA1NgAQIDVY2AikABzBfuYUZ2AILPg44C2sgC2d+EEYRKpz0DhqYAMANkD4ZyWvoAVgLfZgLeuXR4AuIw7RUB8zEoAfScAfLTiALr9ALpcXoAAur6AurlAPpIAboC7ooC652Wq5cEAu5AA4XhmHpw4XGiAvMEAGoDjheZlAL3FAORbwOSiAL3mQL52gL4Z5odmqy8OJsfA52EAv77ARwAOp8dn7QDBY4DpmsDptoA0sYDBmuhiaIGCgMMSgFgASACtgNGAJwEgLpoBgC8BGzAEowcggCEDC6kdjoAJAM0C5IKRoABZCgiAIzw3AYBLACkfng9ogigkgNmWAN6AEQCvrkEVqTGAwCsBRbAA+4iQkMCHR072jI2PTbUNsk2RjY5NvA23TZKNiU3EDcZN5I+RTxDRTBCJkK5VBYKFhZfwQCWygU3AJBRHpu+OytgNxa61A40GMsYjsn7BVwFXQVcBV0FaAVdBVwFXQVcBV0FXAVdBVwFXUsaCNyKAK4AAQUHBwKU7oICoW1e7jAEzgPxA+YDwgCkBFDAwADABKzAAOxFLhitA1UFTDeyPkM+bj51QkRCuwTQWWQ8X+0AWBYzsACNA8xwzAGm7EZ/QisoCTAbLDs6fnLfb8H2GccsbgFw13M1HAVkBW/Jxsm9CNRO8E8FDD0FBQw9FkcClOYCoMFegpDfADgcMiA2AJQACB8AsigKAIzIEAJKeBIApY5yPZQIAKQiHb4fvj5BKSRPQrZCOz0oXyxgOywfKAnGbgMClQaCAkILXgdeCD9IIGUgQj5fPoY+dT52Ao5CM0dAX9BTVG9SDzFwWTQAbxBzJF/lOEIQQglCCkKJIAls5AcClQICoKPMODEFxhi6KSAbiyfIRrMjtCgdWCAkPlFBIitCsEJRzAbMAV/OEyQzDg0OAQQEJ36i328/Mk9AybDJsQlq3tDRApUKAkFzXf1d/j9uALYP6hCoFgCTGD8kPsFKQiobrm0+zj0KSD8kPnVCRBwMDyJRTHFgMTJa5rwXQiQ2YfI/JD7BMEJEHGINTw4TOFlIRzwJO0icMQpyPyQ+wzJCRBv6DVgnKB01NgUKj2bwYzMqCoBkznBgEF+zYDIocwRIX+NgHj4HICNfh2C4CwdwFWpTG/lgUhYGAwRfv2Ts8mAaXzVgml/XYIJfuWC4HI1gUF9pYJZgMR6ilQHMAOwLAlDRefC0in4AXAEJA6PjCwc0IamOANMMCAECRQDFNRTZBgd+CwQlRA+r6+gLBDEFBnwUBXgKATIArwAGRAAHA3cDdAN2A3kDdwN9A3oDdQN7A30DfAN4A3oDfQAYEAAlAtYASwMAUAFsAHcKAHcAmgB3AHUAdQB2AHVu8UgAygDAAHcAdQB1AHYAdQALCgB3AAsAmgB3AAsCOwB3AAtu8UgAygDAAHgKAJoAdwB3AHUAdQB2AHUAeAB1AHUAdgB1bvFIAMoAwAALCgCaAHcACwB3AAsCOwB3AAtu8UgAygDAAH4ACwGgALcBpwC6AahdAu0COwLtbvFIAMoAwAALCgCaAu0ACwLtAAsCOwLtAAtu8UgAygDAA24ACwNvAAu0VsQAAzsAABCkjUIpAAsAUIusOggWcgMeBxVsGwL67U/2HlzmWOEeOgALASvuAAseAfpKUpnpGgYJDCIZM6YyARUE9ThqAD5iXQgnAJYJPnOzw0ZAEZxEKsIAkA4DhAHnTAIDxxUDK0lxCQlPYgIvIQVYJQBVqE1GakUAKGYiDToSBA1EtAYAXQJYAIF8GgMHRyAAIAjOe9YncekRAA0KACUrjwE7Ayc6AAYWAqaiKG4McEcqANoN3+Mg9TwCBhIkuCny+JwUQ29L008JluRxu3K+oAdqiHOqFH0AG5SUIfUJ5SxCGfxdipRzqTmT4V5Zb+r1Uo4Vm+NqSSEl2mNvR2JhIa8SpYO6ntdwFXHCWTCK8f2+Hxo7uiG3drDycAuKIMP5bhi06ACnqArH1rz4Rqg//lm6SgJGEVbF9xJHISaR6HxqxSnkw6shDnelHKNEfGUXSJRJ1GcsmtJw25xrZMDK9gXSm1/YMkdX4/6NKYOdtk/NQ3/NnDASjTc3fPjIjW/5sVfVObX2oTDWkr1dF9f3kxBsD3/3aQO8hPfRz+e0uEiJqt1161griu7gz8hDDwtpy+F+BWtefnKHZPAxcZoWbnznhJpy0e842j36bcNzGnIEusgGX0a8ZxsnjcSsPDZ09yZ36fCQbriHeQ72JRMILNl6ePPf2HWoVwgWAm1fb3V2sAY0+B6rAXqSwPBgseVmoqsBTSrm91+XasMYYySI8eeRxH3ZvHkMz3BQ5aJ3iUVbYPNM3/7emRtjlsMgv/9VyTsyt/mK+8fgWeT6SoFaclXqn42dAIsvAarF5vNNWHzKSkKQ/8Hfk5ZWK7r9yliOsooyBjRhfkHP4Q2DkWXQi6FG/9r/IwbmkV5T7JSopHKn1pJwm9tb5Ot0oyN1Z2mPpKXHTxx2nlK08fKk1hEYA8WgVVWL5lgx0iTv+KdojJeU23ZDjmiubXOxVXJKKi2Wjuh2HLZOFLiSC7Tls5SMh4f+Pj6xUSrNjFqLGehRNB8lC0QSLNmkJJx/wSG3MnjE9T1CkPwJI0wH2lfzwETIiVqUxg0dfu5q39Gt+hwdcxkhhNvQ4TyrBceof3Mhs/IxFci1HmHr4FMZgXEEczPiGCx0HRwzAqDq2j9AVm1kwN0mRVLWLylgtoPNapF5cY4Y1wJh/e0BBwZj44YgZrDNqvD/9Hv7GFYdUQeDJuQ3EWI4HaKqavU1XjC/n41kT4L79kqGq0kLhdTZvgP3TA3fS0ozVz+5piZsoOtIvBUFoMKbNcmBL6YxxaUAusHB38XrS8dQMnQwJfUUkpRoGr5AUeWicvBTzyK9g77+yCkf5PAysL7r/JjcZgrbvRpMW9iyaxZvKO6ceZN2EwIxKwVFPuvFuiEPGCoagbMo+SpydLrXqBzNCDGFCrO/rkcwa2xhokQZ5CdZ0AsU3JfSqJ6n5I14YA+P/uAgfhPU84Tlw7cEFfp7AEE8ey4sP12PTt4Cods1GRgDOB5xvyiR5m+Bx8O5nBCNctU8BevfV5A08x6RHd5jcwPTMDSZJOedIZ1cGQ704lxbAzqZOP05ZxaOghzSdvFBHYqomATARyAADK4elP8Ly3IrUZKfWh23Xy20uBUmLS4Pfagu9+oyVa2iPgqRP3F2CTUsvJ7+RYnN8fFZbU/HVvxvcFFDKkiTqV5UBZ3Gz54JAKByi9hkKMZJvuGgcSYXFmw08UyoQyVdfTD1/dMkCHXcTGAKeROgArsvmRrQTLUOXioOHGK2QkjHuoYFgXciZoTJd6Fs5q1QX1G+p/e26hYsEf7QZD1nnIyl/SFkNtYYmmBhpBrxl9WbY0YpHWRuw2Ll/tj9mD8P4snVzJl4F9J+1arVeTb9E5r2ILH04qStjxQNwn3m4YNqxmaNbLAqW2TN6LidwuJRqS+NXbtqxoeDXpxeGWmxzSkWxjkyCkX4NQRme6q5SAcC+M7+9ETfA/EwrzQajKakCwYyeunP6ZFlxU2oMEn1Pz31zeStW74G406ZJFCl1wAXIoUKkWotYEpOuXB1uVNxJ63dpJEqfxBeptwIHNrPz8BllZoIcBoXwgfJ+8VAUnVPvRvexnw0Ma/WiGYuJO5y8QTvEYBigFmhUxY5RqzE8OcywN/8m4UYrlaniJO75XQ6KSo9+tWHlu+hMi0UVdiKQp7NelnoZUzNaIyBPVeOwK6GNp+FfHuPOoyhaWuNvTYFkvxscMQWDh+zeFCFkgwbXftiV23ywJ4+uwRqmg9k3KzwIQpzppt8DBBOMbrqwQM5Gb05sEwdKzMiAqOloaA/lr0KA+1pr0/+HiWoiIjHA/wir2nIuS3PeU/ji3O6ZwoxcR1SZ9FhtLC5S0FIzFhbBWcGVP/KpxOPSiUoAdWUpqKH++6Scz507iCcxYI6rdMBICPJZea7OcmeFw5mObJSiqpjg2UoWNIs+cFhyDSt6geV5qgi3FunmwwDoGSMgerFOZGX1m0dMCYo5XOruxO063dwENK9DbnVM9wYFREzh4vyU1WYYJ/LRRp6oxgjqP/X5a8/4Af6p6NWkQferzBmXme0zY/4nwMJm/wd1tIqSwGz+E3xPEAOoZlJit3XddD7/BT1pllzOx+8bmQtANQ/S6fZexc6qi3W+Q2xcmXTUhuS5mpHQRvcxZUN0S5+PL9lXWUAaRZhEH8hTdAcuNMMCuVNKTEGtSUKNi3O6KhSaTzck8csZ2vWRZ+d7mW8c4IKwXIYd25S/zIftPkwPzufjEvOHWVD1m+FjpDVUTV0DGDuHj6QnaEwLu/dEgdLQOg9E1Sro9XHJ8ykLAwtPu+pxqKDuFexqON1sKQm7rwbE1E68UCfA/erovrTCG+DBSNg0l4goDQvZN6uNlbyLpcZAwj2UclycvLpIZMgv4yRlpb3YuMftozorbcGVHt/VeDV3+Fdf1TP0iuaCsPi2G4XeGhsyF1ubVDxkoJhmniQ0/jSg/eYML9KLfnCFgISWkp91eauR3IQvED0nAPXK+6hPCYs+n3+hCZbiskmVMG2da+0EsZPonUeIY8EbfusQXjsK/eFDaosbPjEfQS0RKG7yj5GG69M7MeO1HmiUYocgygJHL6M1qzUDDwUSmr99V7Sdr2F3JjQAJY+F0yH33Iv3+C9M38eML7gTgmNu/r2bUMiPvpYbZ6v1/IaESirBHNa7mPKn4dEmYg7v/+HQgPN1G79jBQ1+soydfDC2r+h2Bl/KIc5KjMK7OH6nb1jLsNf0EHVe2KBiE51ox636uyG6Lho0t3J34L5QY/ilE3mikaF4HKXG1mG1rCevT1Vv6GavltxoQe/bMrpZvRggnBxSEPEeEzkEdOxTnPXHVjUYdw8JYvjB/o7Eegc3Ma+NUxLLnsK0kJlinPmUHzHGtrk5+CAbVzFOBqpyy3QVUnzTDfC/0XD94/okH+OB+i7g9lolhWIjSnfIb+Eq43ZXOWmwvjyV/qqD+t0e+7mTEM74qP/Ozt8nmC7mRpyu63OB4KnUzFc074SqoyPUAgM+/TJGFo6T44EHnQU4X4z6qannVqgw/U7zCpwcmXV1AubIrvOmkKHazJAR55ePjp5tLBsN8vAqs3NAHdcEHOR2xQ0lsNAFzSUuxFQCFYvXLZJdOj9p4fNq6p0HBGUik2YzaI4xySy91KzhQ0+q1hjxvImRwPRf76tChlRkhRCi74NXZ9qUNeIwP+s5p+3m5nwPdNOHgSLD79n7O9m1n1uDHiMntq4nkYwV5OZ1ENbXxFd4PgrlvavZsyUO4MqYlqqn1O8W/I1dEZq5dXhrbETLaZIbC2Kj/Aa/QM+fqUOHdf0tXAQ1huZ3cmWECWSXy/43j35+Mvq9xws7JKseriZ1pEWKc8qlzNrGPUGcVgOa9cPJYIJsGnJTAUsEcDOEVULO5x0rXBijc1lgXEzQQKhROf8zIV82w8eswc78YX11KYLWQRcgHNJElBxfXr72lS2RBSl07qTKorO2uUDZr3sFhYsvnhLZn0A94KRzJ/7DEGIAhW5ZWFpL8gEwu1aLA9MuWZzNwl8Oze9Y+bX+v9gywRVnoB5I/8kXTXU3141yRLYrIOOz6SOnyHNy4SieqzkBXharjfjqq1q6tklaEbA8Qfm2DaIPs7OTq/nvJBjKfO2H9bH2cCMh1+5gspfycu8f/cuuRmtDjyqZ7uCIMyjdV3a+p3fqmXsRx4C8lujezIFHnQiVTXLXuI1XrwN3+siYYj2HHTvESUx8DlOTXpak9qFRK+L3mgJ1WsD7F4cu1aJoFoYQnu+wGDMOjJM3kiBQWHCcvhJ/HRdxodOQp45YZaOTA22Nb4XKCVxqkbwMYFhzYQYIAnCW8FW14uf98jhUG2zrKhQQ0q0CEq0t5nXyvUyvR8DvD69LU+g3i+HFWQMQ8PqZuHD+sNKAV0+M6EJC0szq7rEr7B5bQ8BcNHzvDMc9eqB5ZCQdTf80Obn4uzjwpYU7SISdtV0QGa9D3Wrh2BDQtpBKxaNFV+/Cy2P/Sv+8s7Ud0Fd74X4+o/TNztWgETUapy+majNQ68Lq3ee0ZO48VEbTZYiH1Co4OlfWef82RWeyUXo7woM03PyapGfikTnQinoNq5z5veLpeMV3HCAMTaZmA1oGLAn7XS3XYsz+XK7VMQsc4XKrmDXOLU/pSXVNUq8dIqTba///3x6LiLS6xs1xuCAYSfcQ3+rQgmu7uvf3THKt5Ooo97TqcbRqxx7EASizaQCBQllG/rYxVapMLgtLbZS64w1MDBMXX+PQpBKNwqUKOf2DDRDUXQf9EhOS0Qj4nTmlA8dzSLz/G1d+Ud8MTy/6ghhdiLpeerGY/UlDOfiuqFsMUU5/UYlP+BAmgRLuNpvrUaLlVkrqDievNVEAwF+4CoM1MZTmjxjJMsKJq+u8Zd7tNCUFy6LiyYXRJQ4VyvEQFFaCGKsxIwQkk7EzZ6LTJq2hUuPhvAW+gQnSG6J+MszC+7QCRHcnqDdyNRJ6T9xyS87A6MDutbzKGvGktpbXqtzWtXb9HsfK2cBMomjN9a4y+TaJLnXxAeX/HWzmf4cR4vALt/P4w4qgKY04ml4ZdLOinFYS6cup3G/1ie4+t1eOnpBNlqGqs75ilzkT4+DsZQxNvaSKJ//6zIbbk/M7LOhFmRc/1R+kBtz7JFGdZm/COotIdvQoXpTqP/1uqEUmCb/QWoGLMwO5ANcHzxdY48IGP5+J+zKOTBFZ4Pid+GTM+Wq12MV/H86xEJptBa6T+p3kgpwLedManBHC2GgNrFpoN2xnrMz9WFWX/8/ygSBkavq2Uv7FdCsLEYLu9LLIvAU0bNRDtzYl+/vXmjpIvuJFYjmI0im6QEYqnIeMsNjXG4vIutIGHijeAG/9EDBozKV5cldkHbLxHh25vT+ZEzbhXlqvpzKJwcEgfNwLAKFeo0/pvEE10XDB+EXRTXtSzJozQKFFAJhMxYkVaCW+E9AL7tMeU8acxidHqzb6lX4691UsDpy/LLRmT+epgW56+5Cw8tB4kMUv6s9lh3eRKbyGs+H/4mQMaYzPTf2OOdokEn+zzgvoD3FqNKk8QqGAXVsqcGdXrT62fSPkR2vROFi68A6se86UxRUk4cajfPyCC4G5wDhD+zNq4jodQ4u4n/m37Lr36n4LIAAsVr02dFi9AiwA81MYs2rm4eDlDNmdMRvEKRHfBwW5DdMNp0jPFZMeARqF/wL4XBfd+EMLBfMzpH5GH6NaW+1vrvMdg+VxDzatk3MXgO3ro3P/DpcC6+Mo4MySJhKJhSR01SGGGp5hPWmrrUgrv3lDnP+HhcI3nt3YqBoVAVTBAQT5iuhTg8nvPtd8ZeYj6w1x6RqGUBrSku7+N1+BaasZvjTk64RoIDlL8brpEcJx3OmY7jLoZsswdtmhfC/G21llXhITOwmvRDDeTTPbyASOa16cF5/A1fZAidJpqju3wYAy9avPR1ya6eNp9K8XYrrtuxlqi+bDKwlfrYdR0RRiKRVTLOH85+ZY7XSmzRpfZBJjaTa81VDcJHpZnZnSQLASGYW9l51ZV/h7eVzTi3Hv6hUsgc/51AqJRTkpbFVLXXszoBL8nBX0u/0jBLT8nH+fJePbrwURT58OY+UieRjd1vs04w0VG5VN2U6MoGZkQzKN/ptz0Q366dxoTGmj7i1NQGHi9GgnquXFYdrCfZBmeb7s0T6yrdlZH5cZuwHFyIJ/kAtGsTg0xH5taAAq44BAk1CPk9KVVbqQzrCUiFdF/6gtlPQ8bHHc1G1W92MXGZ5HEHftyLYs8mbD/9xYRUWkHmlM0zC2ilJlnNgV4bfALpQghxOUoZL7VTqtCHIaQSXm+YUMnpkXybnV+A6xlm2CVy8fn0Xlm2XRa0+zzOa21JWWmixfiPMSCZ7qA4rS93VN3pkpF1s5TonQjisHf7iU9ZGvUPOAKZcR1pbeVf/Ul7OhepGCaId9wOtqo7pJ7yLcBZ0pFkOF28y4zEI/kcUNmutBHaQpBdNM8vjCS6HZRokkeo88TBAjGyG7SR+6vUgTcyK9Imalj0kuxz0wmK+byQU11AiJFk/ya5dNduRClcnU64yGu/ieWSeOos1t3ep+RPIWQ2pyTYVbZltTbsb7NiwSi3AV+8KLWk7LxCnfZUetEM8ThnsSoGH38/nyAwFguJp8FjvlHtcWZuU4hPva0rHfr0UhOOJ/F6vS62FW7KzkmRll2HEc7oUq4fyi5T70Vl7YVIfsPHUCdHesf9Lk7WNVWO75JDkYbMI8TOW8JKVtLY9d6UJRITO8oKo0xS+o99Yy04iniGHAaGj88kEWgwv0OrHdY/nr76DOGNS59hXCGXzTKUvDl9iKpLSWYN1lxIeyywdNpTkhay74w2jFT6NS8qkjo5CxA1yfSYwp6AJIZNKIeEK5PJAW7ORgWgwp0VgzYpqovMrWxbu+DGZ6Lhie1RAqpzm8VUzKJOH3mCzWuTOLsN3VT/dv2eeYe9UjbR8YTBsLz7q60VN1sU51k+um1f8JxD5pPhbhSC8rRaB454tmh6YUWrJI3+GWY0qeWioj/tbkYITOkJaeuGt4JrJvHA+l0Gu7kY7XOaa05alMnRWVCXqFgLIwSY4uF59Ue5SU4QKuc/HamDxbr0x6csCetXGoP7Qn1Bk/J9DsynO/UD6iZ1Hyrz+jit0hDCwi/E9OjgKTbB3ZQKQ/0ZOvevfNHG0NK4Aj3Cp7NpRk07RT1i/S0EL93Ag8GRgKI9CfpajKyK6+Jj/PI1KO5/85VAwz2AwzP8FTBb075IxCXv6T9RVvWT2tUaqxDS92zrGUbWzUYk9mSs82pECH+fkqsDt93VW++4YsR/dHCYcQSYTO/KaBMDj9LSD/J/+z20Kq8XvZUAIHtm9hRPP3ItbuAu2Hm5lkPs92pd7kCxgRs0xOVBnZ13ccdA0aunrwv9SdqElJRC3g+oCu+nXyCgmXUs9yMjTMAIHfxZV+aPKcZeUBWt057Xo85Ks1Ir5gzEHCWqZEhrLZMuF11ziGtFQUds/EESajhagzcKsxamcSZxGth4UII+adPhQkUnx2WyN+4YWR+r3f8MnkyGFuR4zjzxJS8WsQYR5PTyRaD9ixa6Mh741nBHbzfjXHskGDq179xaRNrCIB1z1xRfWfjqw2pHc1zk9xlPpL8sQWAIuETZZhbnmL54rceXVNRvUiKrrqIkeogsl0XXb17ylNb0f4GA9Wd44vffEG8FSZGHEL2fbaTGRcSiCeA8PmA/f6Hz8HCS76fXUHwgwkzSwlI71ekZ7Fapmlk/KC+Hs8hUcw3N2LN5LhkVYyizYFl/uPeVP5lsoJHhhfWvvSWruCUW1ZcJOeuTbrDgywJ/qG07gZJplnTvLcYdNaH0KMYOYMGX+rB4NGPFmQsNaIwlWrfCezxre8zXBrsMT+edVLbLqN1BqB76JH4BvZTqUIMfGwPGEn+EnmTV86fPBaYbFL3DFEhjB45CewkXEAtJxk4/Ms2pPXnaRqdky0HOYdcUcE2zcXq4vaIvW2/v0nHFJH2XXe22ueDmq/18XGtELSq85j9X8q0tcNSSKJIX8FTuJF/Pf8j5PhqG2u+osvsLxYrvvfeVJL+4tkcXcr9JV7v0ERmj/X6fM3NC4j6dS1+9Umr2oPavqiAydTZPLMNRGY23LO9zAVDly7jD+70G5TPPLdhRIl4WxcYjLnM+SNcJ26FOrkrISUtPObIz5Zb3AG612krnpy15RMW+1cQjlnWFI6538qky9axd2oJmHIHP08KyP0ubGO+TQNOYuv2uh17yCIvR8VcStw7o1g0NM60sk+8Tq7YfIBJrtp53GkvzXH7OA0p8/n/u1satf/VJhtR1l8Wa6Gmaug7haSpaCaYQax6ta0mkutlb+eAOSG1aobM81D9A4iS1RRlzBBoVX6tU1S6WE2N9ORY6DfeLRC4l9Rvr5h95XDWB2mR1d4WFudpsgVYwiTwT31ljskD8ZyDOlm5DkGh9N/UB/0AI5Xvb8ZBmai2hQ4BWMqFwYnzxwB26YHSOv9WgY3JXnvoN+2R4rqGVh/LLDMtpFP+SpMGJNWvbIl5SOodbCczW2RKleksPoUeGEzrjtKHVdtZA+kfqO+rVx/iclCqwoopepvJpSTDjT+b9GWylGRF8EDbGlw6eUzmJM95Ovoz+kwLX3c2fTjFeYEsE7vUZm3mqdGJuKh2w9/QGSaqRHs99aScGOdDqkFcACoqdbBoQqqjamhH6Q9ng39JCg3lrGJwd50Qk9ovnqBTr8MME7Ps2wiVfygUmPoUBJJfJWX5Nda0nuncbFkA=="));new Set(me(ve)),new Set(me(ve)),function(e){let t=[];for(;;){let r=e();if(0==r)break;t.push(we(r,e))}for(;;){let r=e()-1;if(r<0)break;t.push(be(r,e))}!function(e){const t={};for(let r=0;r<e.length;r++){const n=e[r];t[n[0]]=n[1]}}(de(t))}(ve),function(e){let t=me(e).sort(((e,t)=>e-t));!function r(){let n=[];for(;;){let i=me(e,t);if(0==i.length)break;n.push({set:new Set(i),node:r()})}n.sort(((e,t)=>t.set.size-e.set.size));let i=e(),s=i%3;i=i/3|0;let o=!!(1&i);return i>>=1,{branches:n,valid:s,fe0f:o,save:1==i,check:2==i}}()}(ve),new A(he),new Uint8Array(32).fill(0),new A("rlp/5.7.0"),new A("address/5.7.0");const Ae={};for(let e=0;e<10;e++)Ae[String(e)]=String(e);for(let e=0;e<26;e++)Ae[String.fromCharCode(65+e)]=String(10+e);Math.floor(function(e){return Math.log10?Math.log10(e):Math.log(e)/Math.LN10}(9007199254740991)),new A("properties/5.7.0"),new A(he),new Uint8Array(32).fill(0),H.from(-1);const Ee=H.from(0),xe=H.from(1);H.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),P(xe.toHexString(),32),P(Ee.toHexString(),32);var Ce={},Se={},ke=_e;function _e(e,t){if(!e)throw new Error(t||"Assertion failed")}_e.equal=function(e,t,r){if(e!=t)throw new Error(r||"Assertion failed: "+e+" != "+t)};var Ie={exports:{}};"function"==typeof Object.create?Ie.exports=function(e,t){t&&(e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}))}:Ie.exports=function(e,t){if(t){e.super_=t;var r=function(){};r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}};var Me=ke,Te=Ie.exports;function Pe(e,t){return!(55296!=(64512&e.charCodeAt(t))||t<0||t+1>=e.length)&&56320==(64512&e.charCodeAt(t+1))}function Oe(e){return(e>>>24|e>>>8&65280|e<<8&16711680|(255&e)<<24)>>>0}function Re(e){return 1===e.length?"0"+e:e}function Ne(e){return 7===e.length?"0"+e:6===e.length?"00"+e:5===e.length?"000"+e:4===e.length?"0000"+e:3===e.length?"00000"+e:2===e.length?"000000"+e:1===e.length?"0000000"+e:e}Se.inherits=Te,Se.toArray=function(e,t){if(Array.isArray(e))return e.slice();if(!e)return[];var r=[];if("string"==typeof e)if(t){if("hex"===t)for((e=e.replace(/[^a-z0-9]+/gi,"")).length%2!=0&&(e="0"+e),i=0;i<e.length;i+=2)r.push(parseInt(e[i]+e[i+1],16))}else for(var n=0,i=0;i<e.length;i++){var s=e.charCodeAt(i);s<128?r[n++]=s:s<2048?(r[n++]=s>>6|192,r[n++]=63&s|128):Pe(e,i)?(s=65536+((1023&s)<<10)+(1023&e.charCodeAt(++i)),r[n++]=s>>18|240,r[n++]=s>>12&63|128,r[n++]=s>>6&63|128,r[n++]=63&s|128):(r[n++]=s>>12|224,r[n++]=s>>6&63|128,r[n++]=63&s|128)}else for(i=0;i<e.length;i++)r[i]=0|e[i];return r},Se.toHex=function(e){for(var t="",r=0;r<e.length;r++)t+=Re(e[r].toString(16));return t},Se.htonl=Oe,Se.toHex32=function(e,t){for(var r="",n=0;n<e.length;n++){var i=e[n];"little"===t&&(i=Oe(i)),r+=Ne(i.toString(16))}return r},Se.zero2=Re,Se.zero8=Ne,Se.join32=function(e,t,r,n){var i=r-t;Me(i%4==0);for(var s=new Array(i/4),o=0,a=t;o<s.length;o++,a+=4){var c;c="big"===n?e[a]<<24|e[a+1]<<16|e[a+2]<<8|e[a+3]:e[a+3]<<24|e[a+2]<<16|e[a+1]<<8|e[a],s[o]=c>>>0}return s},Se.split32=function(e,t){for(var r=new Array(4*e.length),n=0,i=0;n<e.length;n++,i+=4){var s=e[n];"big"===t?(r[i]=s>>>24,r[i+1]=s>>>16&255,r[i+2]=s>>>8&255,r[i+3]=255&s):(r[i+3]=s>>>24,r[i+2]=s>>>16&255,r[i+1]=s>>>8&255,r[i]=255&s)}return r},Se.rotr32=function(e,t){return e>>>t|e<<32-t},Se.rotl32=function(e,t){return e<<t|e>>>32-t},Se.sum32=function(e,t){return e+t>>>0},Se.sum32_3=function(e,t,r){return e+t+r>>>0},Se.sum32_4=function(e,t,r,n){return e+t+r+n>>>0},Se.sum32_5=function(e,t,r,n,i){return e+t+r+n+i>>>0},Se.sum64=function(e,t,r,n){var i=e[t],s=n+e[t+1]>>>0,o=(s<n?1:0)+r+i;e[t]=o>>>0,e[t+1]=s},Se.sum64_hi=function(e,t,r,n){return(t+n>>>0<t?1:0)+e+r>>>0},Se.sum64_lo=function(e,t,r,n){return t+n>>>0},Se.sum64_4_hi=function(e,t,r,n,i,s,o,a){var c=0,l=t;return c+=(l=l+n>>>0)<t?1:0,c+=(l=l+s>>>0)<s?1:0,e+r+i+o+(c+=(l=l+a>>>0)<a?1:0)>>>0},Se.sum64_4_lo=function(e,t,r,n,i,s,o,a){return t+n+s+a>>>0},Se.sum64_5_hi=function(e,t,r,n,i,s,o,a,c,l){var u=0,h=t;return u+=(h=h+n>>>0)<t?1:0,u+=(h=h+s>>>0)<s?1:0,u+=(h=h+a>>>0)<a?1:0,e+r+i+o+c+(u+=(h=h+l>>>0)<l?1:0)>>>0},Se.sum64_5_lo=function(e,t,r,n,i,s,o,a,c,l){return t+n+s+a+l>>>0},Se.rotr64_hi=function(e,t,r){return(t<<32-r|e>>>r)>>>0},Se.rotr64_lo=function(e,t,r){return(e<<32-r|t>>>r)>>>0},Se.shr64_hi=function(e,t,r){return e>>>r},Se.shr64_lo=function(e,t,r){return(e<<32-r|t>>>r)>>>0};var Be={},Ue=Se,De=ke;function Le(){this.pending=null,this.pendingTotal=0,this.blockSize=this.constructor.blockSize,this.outSize=this.constructor.outSize,this.hmacStrength=this.constructor.hmacStrength,this.padLength=this.constructor.padLength/8,this.endian="big",this._delta8=this.blockSize/8,this._delta32=this.blockSize/32}Be.BlockHash=Le,Le.prototype.update=function(e,t){if(e=Ue.toArray(e,t),this.pending?this.pending=this.pending.concat(e):this.pending=e,this.pendingTotal+=e.length,this.pending.length>=this._delta8){var r=(e=this.pending).length%this._delta8;this.pending=e.slice(e.length-r,e.length),0===this.pending.length&&(this.pending=null),e=Ue.join32(e,0,e.length-r,this.endian);for(var n=0;n<e.length;n+=this._delta32)this._update(e,n,n+this._delta32)}return this},Le.prototype.digest=function(e){return this.update(this._pad()),De(null===this.pending),this._digest(e)},Le.prototype._pad=function(){var e=this.pendingTotal,t=this._delta8,r=t-(e+this.padLength)%t,n=new Array(r+this.padLength);n[0]=128;for(var i=1;i<r;i++)n[i]=0;if(e<<=3,"big"===this.endian){for(var s=8;s<this.padLength;s++)n[i++]=0;n[i++]=0,n[i++]=0,n[i++]=0,n[i++]=0,n[i++]=e>>>24&255,n[i++]=e>>>16&255,n[i++]=e>>>8&255,n[i++]=255&e}else for(n[i++]=255&e,n[i++]=e>>>8&255,n[i++]=e>>>16&255,n[i++]=e>>>24&255,n[i++]=0,n[i++]=0,n[i++]=0,n[i++]=0,s=8;s<this.padLength;s++)n[i++]=0;return n};var Fe={},je={},He=Se.rotr32;function ze(e,t,r){return e&t^~e&r}function qe(e,t,r){return e&t^e&r^t&r}function $e(e,t,r){return e^t^r}je.ft_1=function(e,t,r,n){return 0===e?ze(t,r,n):1===e||3===e?$e(t,r,n):2===e?qe(t,r,n):void 0},je.ch32=ze,je.maj32=qe,je.p32=$e,je.s0_256=function(e){return He(e,2)^He(e,13)^He(e,22)},je.s1_256=function(e){return He(e,6)^He(e,11)^He(e,25)},je.g0_256=function(e){return He(e,7)^He(e,18)^e>>>3},je.g1_256=function(e){return He(e,17)^He(e,19)^e>>>10};var We=Se,Ge=Be,Ve=je,Ke=We.rotl32,Ze=We.sum32,Qe=We.sum32_5,Je=Ve.ft_1,Ye=Ge.BlockHash,Xe=[1518500249,1859775393,2400959708,3395469782];function et(){if(!(this instanceof et))return new et;Ye.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],this.W=new Array(80)}We.inherits(et,Ye);var tt=et;et.blockSize=512,et.outSize=160,et.hmacStrength=80,et.padLength=64,et.prototype._update=function(e,t){for(var r=this.W,n=0;n<16;n++)r[n]=e[t+n];for(;n<r.length;n++)r[n]=Ke(r[n-3]^r[n-8]^r[n-14]^r[n-16],1);var i=this.h[0],s=this.h[1],o=this.h[2],a=this.h[3],c=this.h[4];for(n=0;n<r.length;n++){var l=~~(n/20),u=Qe(Ke(i,5),Je(l,s,o,a),c,r[n],Xe[l]);c=a,a=o,o=Ke(s,30),s=i,i=u}this.h[0]=Ze(this.h[0],i),this.h[1]=Ze(this.h[1],s),this.h[2]=Ze(this.h[2],o),this.h[3]=Ze(this.h[3],a),this.h[4]=Ze(this.h[4],c)},et.prototype._digest=function(e){return"hex"===e?We.toHex32(this.h,"big"):We.split32(this.h,"big")};var rt=Se,nt=Be,it=je,st=ke,ot=rt.sum32,at=rt.sum32_4,ct=rt.sum32_5,lt=it.ch32,ut=it.maj32,ht=it.s0_256,dt=it.s1_256,ft=it.g0_256,pt=it.g1_256,gt=nt.BlockHash,mt=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];function yt(){if(!(this instanceof yt))return new yt;gt.call(this),this.h=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],this.k=mt,this.W=new Array(64)}rt.inherits(yt,gt);var wt=yt;yt.blockSize=512,yt.outSize=256,yt.hmacStrength=192,yt.padLength=64,yt.prototype._update=function(e,t){for(var r=this.W,n=0;n<16;n++)r[n]=e[t+n];for(;n<r.length;n++)r[n]=at(pt(r[n-2]),r[n-7],ft(r[n-15]),r[n-16]);var i=this.h[0],s=this.h[1],o=this.h[2],a=this.h[3],c=this.h[4],l=this.h[5],u=this.h[6],h=this.h[7];for(st(this.k.length===r.length),n=0;n<r.length;n++){var d=ct(h,dt(c),lt(c,l,u),this.k[n],r[n]),f=ot(ht(i),ut(i,s,o));h=u,u=l,l=c,c=ot(a,d),a=o,o=s,s=i,i=ot(d,f)}this.h[0]=ot(this.h[0],i),this.h[1]=ot(this.h[1],s),this.h[2]=ot(this.h[2],o),this.h[3]=ot(this.h[3],a),this.h[4]=ot(this.h[4],c),this.h[5]=ot(this.h[5],l),this.h[6]=ot(this.h[6],u),this.h[7]=ot(this.h[7],h)},yt.prototype._digest=function(e){return"hex"===e?rt.toHex32(this.h,"big"):rt.split32(this.h,"big")};var bt=Se,vt=wt;function At(){if(!(this instanceof At))return new At;vt.call(this),this.h=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]}bt.inherits(At,vt);var Et=At;At.blockSize=512,At.outSize=224,At.hmacStrength=192,At.padLength=64,At.prototype._digest=function(e){return"hex"===e?bt.toHex32(this.h.slice(0,7),"big"):bt.split32(this.h.slice(0,7),"big")};var xt=Se,Ct=Be,St=ke,kt=xt.rotr64_hi,_t=xt.rotr64_lo,It=xt.shr64_hi,Mt=xt.shr64_lo,Tt=xt.sum64,Pt=xt.sum64_hi,Ot=xt.sum64_lo,Rt=xt.sum64_4_hi,Nt=xt.sum64_4_lo,Bt=xt.sum64_5_hi,Ut=xt.sum64_5_lo,Dt=Ct.BlockHash,Lt=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function Ft(){if(!(this instanceof Ft))return new Ft;Dt.call(this),this.h=[1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209],this.k=Lt,this.W=new Array(160)}xt.inherits(Ft,Dt);var jt=Ft;function Ht(e,t,r,n,i){var s=e&r^~e&i;return s<0&&(s+=4294967296),s}function zt(e,t,r,n,i,s){var o=t&n^~t&s;return o<0&&(o+=4294967296),o}function qt(e,t,r,n,i){var s=e&r^e&i^r&i;return s<0&&(s+=4294967296),s}function $t(e,t,r,n,i,s){var o=t&n^t&s^n&s;return o<0&&(o+=4294967296),o}function Wt(e,t){var r=kt(e,t,28)^kt(t,e,2)^kt(t,e,7);return r<0&&(r+=4294967296),r}function Gt(e,t){var r=_t(e,t,28)^_t(t,e,2)^_t(t,e,7);return r<0&&(r+=4294967296),r}function Vt(e,t){var r=kt(e,t,14)^kt(e,t,18)^kt(t,e,9);return r<0&&(r+=4294967296),r}function Kt(e,t){var r=_t(e,t,14)^_t(e,t,18)^_t(t,e,9);return r<0&&(r+=4294967296),r}function Zt(e,t){var r=kt(e,t,1)^kt(e,t,8)^It(e,t,7);return r<0&&(r+=4294967296),r}function Qt(e,t){var r=_t(e,t,1)^_t(e,t,8)^Mt(e,t,7);return r<0&&(r+=4294967296),r}function Jt(e,t){var r=kt(e,t,19)^kt(t,e,29)^It(e,t,6);return r<0&&(r+=4294967296),r}function Yt(e,t){var r=_t(e,t,19)^_t(t,e,29)^Mt(e,t,6);return r<0&&(r+=4294967296),r}Ft.blockSize=1024,Ft.outSize=512,Ft.hmacStrength=192,Ft.padLength=128,Ft.prototype._prepareBlock=function(e,t){for(var r=this.W,n=0;n<32;n++)r[n]=e[t+n];for(;n<r.length;n+=2){var i=Jt(r[n-4],r[n-3]),s=Yt(r[n-4],r[n-3]),o=r[n-14],a=r[n-13],c=Zt(r[n-30],r[n-29]),l=Qt(r[n-30],r[n-29]),u=r[n-32],h=r[n-31];r[n]=Rt(i,s,o,a,c,l,u,h),r[n+1]=Nt(i,s,o,a,c,l,u,h)}},Ft.prototype._update=function(e,t){this._prepareBlock(e,t);var r=this.W,n=this.h[0],i=this.h[1],s=this.h[2],o=this.h[3],a=this.h[4],c=this.h[5],l=this.h[6],u=this.h[7],h=this.h[8],d=this.h[9],f=this.h[10],p=this.h[11],g=this.h[12],m=this.h[13],y=this.h[14],w=this.h[15];St(this.k.length===r.length);for(var b=0;b<r.length;b+=2){var v=y,A=w,E=Vt(h,d),x=Kt(h,d),C=Ht(h,0,f,0,g),S=zt(0,d,0,p,0,m),k=this.k[b],_=this.k[b+1],I=r[b],M=r[b+1],T=Bt(v,A,E,x,C,S,k,_,I,M),P=Ut(v,A,E,x,C,S,k,_,I,M);v=Wt(n,i),A=Gt(n,i),E=qt(n,0,s,0,a),x=$t(0,i,0,o,0,c);var O=Pt(v,A,E,x),R=Ot(v,A,E,x);y=g,w=m,g=f,m=p,f=h,p=d,h=Pt(l,u,T,P),d=Ot(u,u,T,P),l=a,u=c,a=s,c=o,s=n,o=i,n=Pt(T,P,O,R),i=Ot(T,P,O,R)}Tt(this.h,0,n,i),Tt(this.h,2,s,o),Tt(this.h,4,a,c),Tt(this.h,6,l,u),Tt(this.h,8,h,d),Tt(this.h,10,f,p),Tt(this.h,12,g,m),Tt(this.h,14,y,w)},Ft.prototype._digest=function(e){return"hex"===e?xt.toHex32(this.h,"big"):xt.split32(this.h,"big")};var Xt=Se,er=jt;function tr(){if(!(this instanceof tr))return new tr;er.call(this),this.h=[3418070365,3238371032,1654270250,914150663,2438529370,812702999,355462360,4144912697,1731405415,4290775857,2394180231,1750603025,3675008525,1694076839,1203062813,3204075428]}Xt.inherits(tr,er);var rr=tr;tr.blockSize=1024,tr.outSize=384,tr.hmacStrength=192,tr.padLength=128,tr.prototype._digest=function(e){return"hex"===e?Xt.toHex32(this.h.slice(0,12),"big"):Xt.split32(this.h.slice(0,12),"big")},Fe.sha1=tt,Fe.sha224=Et,Fe.sha256=wt,Fe.sha384=rr,Fe.sha512=jt;var nr={},ir=Se,sr=Be,or=ir.rotl32,ar=ir.sum32,cr=ir.sum32_3,lr=ir.sum32_4,ur=sr.BlockHash;function hr(){if(!(this instanceof hr))return new hr;ur.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],this.endian="little"}function dr(e,t,r,n){return e<=15?t^r^n:e<=31?t&r|~t&n:e<=47?(t|~r)^n:e<=63?t&n|r&~n:t^(r|~n)}function fr(e){return e<=15?0:e<=31?1518500249:e<=47?1859775393:e<=63?2400959708:2840853838}function pr(e){return e<=15?1352829926:e<=31?1548603684:e<=47?1836072691:e<=63?2053994217:0}ir.inherits(hr,ur),nr.ripemd160=hr,hr.blockSize=512,hr.outSize=160,hr.hmacStrength=192,hr.padLength=64,hr.prototype._update=function(e,t){for(var r=this.h[0],n=this.h[1],i=this.h[2],s=this.h[3],o=this.h[4],a=r,c=n,l=i,u=s,h=o,d=0;d<80;d++){var f=ar(or(lr(r,dr(d,n,i,s),e[gr[d]+t],fr(d)),yr[d]),o);r=o,o=s,s=or(i,10),i=n,n=f,f=ar(or(lr(a,dr(79-d,c,l,u),e[mr[d]+t],pr(d)),wr[d]),h),a=h,h=u,u=or(l,10),l=c,c=f}f=cr(this.h[1],i,u),this.h[1]=cr(this.h[2],s,h),this.h[2]=cr(this.h[3],o,a),this.h[3]=cr(this.h[4],r,c),this.h[4]=cr(this.h[0],n,l),this.h[0]=f},hr.prototype._digest=function(e){return"hex"===e?ir.toHex32(this.h,"little"):ir.split32(this.h,"little")};var gr=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],mr=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],yr=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],wr=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11],br=Se,vr=ke;function Ar(e,t,r){if(!(this instanceof Ar))return new Ar(e,t,r);this.Hash=e,this.blockSize=e.blockSize/8,this.outSize=e.outSize/8,this.inner=null,this.outer=null,this._init(br.toArray(t,r))}var Er=Ar;function xr(e,t,r){return e(r={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(t??r.path)}},r.exports),r.exports}Ar.prototype._init=function(e){e.length>this.blockSize&&(e=(new this.Hash).update(e).digest()),vr(e.length<=this.blockSize);for(var t=e.length;t<this.blockSize;t++)e.push(0);for(t=0;t<e.length;t++)e[t]^=54;for(this.inner=(new this.Hash).update(e),t=0;t<e.length;t++)e[t]^=106;this.outer=(new this.Hash).update(e)},Ar.prototype.update=function(e,t){return this.inner.update(e,t),this},Ar.prototype.digest=function(e){return this.outer.update(this.inner.digest()),this.outer.digest(e)},function(e){var t=e;t.utils=Se,t.common=Be,t.sha=Fe,t.ripemd=nr,t.hmac=Er,t.sha1=t.sha.sha1,t.sha256=t.sha.sha256,t.sha224=t.sha.sha224,t.sha384=t.sha.sha384,t.sha512=t.sha.sha512,t.ripemd160=t.ripemd.ripemd160}(Ce);var Cr=Sr;function Sr(e,t){if(!e)throw new Error(t||"Assertion failed")}Sr.equal=function(e,t,r){if(e!=t)throw new Error(r||"Assertion failed: "+e+" != "+t)};var kr=xr((function(e,t){var r=t;function n(e){return 1===e.length?"0"+e:e}function i(e){for(var t="",r=0;r<e.length;r++)t+=n(e[r].toString(16));return t}r.toArray=function(e,t){if(Array.isArray(e))return e.slice();if(!e)return[];var r=[];if("string"!=typeof e){for(var n=0;n<e.length;n++)r[n]=0|e[n];return r}if("hex"===t)for((e=e.replace(/[^a-z0-9]+/gi,"")).length%2!=0&&(e="0"+e),n=0;n<e.length;n+=2)r.push(parseInt(e[n]+e[n+1],16));else for(n=0;n<e.length;n++){var i=e.charCodeAt(n),s=i>>8,o=255&i;s?r.push(s,o):r.push(o)}return r},r.zero2=n,r.toHex=i,r.encode=function(e,t){return"hex"===t?i(e):e}})),_r=xr((function(e,t){var r=t;r.assert=Cr,r.toArray=kr.toArray,r.zero2=kr.zero2,r.toHex=kr.toHex,r.encode=kr.encode,r.getNAF=function(e,t,r){var n=new Array(Math.max(e.bitLength(),r)+1);n.fill(0);for(var i=1<<t+1,s=e.clone(),o=0;o<n.length;o++){var a,c=s.andln(i-1);s.isOdd()?(a=c>(i>>1)-1?(i>>1)-c:c,s.isubn(a)):a=0,n[o]=a,s.iushrn(1)}return n},r.getJSF=function(e,t){var r=[[],[]];e=e.clone(),t=t.clone();for(var n,i=0,s=0;e.cmpn(-i)>0||t.cmpn(-s)>0;){var o,a,c=e.andln(3)+i&3,l=t.andln(3)+s&3;3===c&&(c=-1),3===l&&(l=-1),o=1&c?3!=(n=e.andln(7)+i&7)&&5!==n||2!==l?c:-c:0,r[0].push(o),a=1&l?3!=(n=t.andln(7)+s&7)&&5!==n||2!==c?l:-l:0,r[1].push(a),2*i===o+1&&(i=1-i),2*s===a+1&&(s=1-s),e.iushrn(1),t.iushrn(1)}return r},r.cachedProperty=function(e,t,r){var n="_"+t;e.prototype[t]=function(){return void 0!==this[n]?this[n]:this[n]=r.call(this)}},r.parseBytes=function(e){return"string"==typeof e?r.toArray(e,"hex"):e},r.intFromLE=function(e){return new N(e,"hex","le")}})),Ir=_r.getNAF,Mr=_r.getJSF,Tr=_r.assert;function Pr(e,t){this.type=e,this.p=new N(t.p,16),this.red=t.prime?N.red(t.prime):N.mont(this.p),this.zero=new N(0).toRed(this.red),this.one=new N(1).toRed(this.red),this.two=new N(2).toRed(this.red),this.n=t.n&&new N(t.n,16),this.g=t.g&&this.pointFromJSON(t.g,t.gRed),this._wnafT1=new Array(4),this._wnafT2=new Array(4),this._wnafT3=new Array(4),this._wnafT4=new Array(4),this._bitLength=this.n?this.n.bitLength():0;var r=this.n&&this.p.div(this.n);!r||r.cmpn(100)>0?this.redN=null:(this._maxwellTrick=!0,this.redN=this.n.toRed(this.red))}var Or=Pr;function Rr(e,t){this.curve=e,this.type=t,this.precomputed=null}Pr.prototype.point=function(){throw new Error("Not implemented")},Pr.prototype.validate=function(){throw new Error("Not implemented")},Pr.prototype._fixedNafMul=function(e,t){Tr(e.precomputed);var r=e._getDoubles(),n=Ir(t,1,this._bitLength),i=(1<<r.step+1)-(r.step%2==0?2:1);i/=3;var s,o,a=[];for(s=0;s<n.length;s+=r.step){o=0;for(var c=s+r.step-1;c>=s;c--)o=(o<<1)+n[c];a.push(o)}for(var l=this.jpoint(null,null,null),u=this.jpoint(null,null,null),h=i;h>0;h--){for(s=0;s<a.length;s++)(o=a[s])===h?u=u.mixedAdd(r.points[s]):o===-h&&(u=u.mixedAdd(r.points[s].neg()));l=l.add(u)}return l.toP()},Pr.prototype._wnafMul=function(e,t){var r=4,n=e._getNAFPoints(r);r=n.wnd;for(var i=n.points,s=Ir(t,r,this._bitLength),o=this.jpoint(null,null,null),a=s.length-1;a>=0;a--){for(var c=0;a>=0&&0===s[a];a--)c++;if(a>=0&&c++,o=o.dblp(c),a<0)break;var l=s[a];Tr(0!==l),o="affine"===e.type?l>0?o.mixedAdd(i[l-1>>1]):o.mixedAdd(i[-l-1>>1].neg()):l>0?o.add(i[l-1>>1]):o.add(i[-l-1>>1].neg())}return"affine"===e.type?o.toP():o},Pr.prototype._wnafMulAdd=function(e,t,r,n,i){var s,o,a,c=this._wnafT1,l=this._wnafT2,u=this._wnafT3,h=0;for(s=0;s<n;s++){var d=(a=t[s])._getNAFPoints(e);c[s]=d.wnd,l[s]=d.points}for(s=n-1;s>=1;s-=2){var f=s-1,p=s;if(1===c[f]&&1===c[p]){var g=[t[f],null,null,t[p]];0===t[f].y.cmp(t[p].y)?(g[1]=t[f].add(t[p]),g[2]=t[f].toJ().mixedAdd(t[p].neg())):0===t[f].y.cmp(t[p].y.redNeg())?(g[1]=t[f].toJ().mixedAdd(t[p]),g[2]=t[f].add(t[p].neg())):(g[1]=t[f].toJ().mixedAdd(t[p]),g[2]=t[f].toJ().mixedAdd(t[p].neg()));var m=[-3,-1,-5,-7,0,7,5,1,3],y=Mr(r[f],r[p]);for(h=Math.max(y[0].length,h),u[f]=new Array(h),u[p]=new Array(h),o=0;o<h;o++){var w=0|y[0][o],b=0|y[1][o];u[f][o]=m[3*(w+1)+(b+1)],u[p][o]=0,l[f]=g}}else u[f]=Ir(r[f],c[f],this._bitLength),u[p]=Ir(r[p],c[p],this._bitLength),h=Math.max(u[f].length,h),h=Math.max(u[p].length,h)}var v=this.jpoint(null,null,null),A=this._wnafT4;for(s=h;s>=0;s--){for(var E=0;s>=0;){var x=!0;for(o=0;o<n;o++)A[o]=0|u[o][s],0!==A[o]&&(x=!1);if(!x)break;E++,s--}if(s>=0&&E++,v=v.dblp(E),s<0)break;for(o=0;o<n;o++){var C=A[o];0!==C&&(C>0?a=l[o][C-1>>1]:C<0&&(a=l[o][-C-1>>1].neg()),v="affine"===a.type?v.mixedAdd(a):v.add(a))}}for(s=0;s<n;s++)l[s]=null;return i?v:v.toP()},Pr.BasePoint=Rr,Rr.prototype.eq=function(){throw new Error("Not implemented")},Rr.prototype.validate=function(){return this.curve.validate(this)},Pr.prototype.decodePoint=function(e,t){e=_r.toArray(e,t);var r=this.p.byteLength();if((4===e[0]||6===e[0]||7===e[0])&&e.length-1==2*r)return 6===e[0]?Tr(e[e.length-1]%2==0):7===e[0]&&Tr(e[e.length-1]%2==1),this.point(e.slice(1,1+r),e.slice(1+r,1+2*r));if((2===e[0]||3===e[0])&&e.length-1===r)return this.pointFromX(e.slice(1,1+r),3===e[0]);throw new Error("Unknown point format")},Rr.prototype.encodeCompressed=function(e){return this.encode(e,!0)},Rr.prototype._encode=function(e){var t=this.curve.p.byteLength(),r=this.getX().toArray("be",t);return e?[this.getY().isEven()?2:3].concat(r):[4].concat(r,this.getY().toArray("be",t))},Rr.prototype.encode=function(e,t){return _r.encode(this._encode(t),e)},Rr.prototype.precompute=function(e){if(this.precomputed)return this;var t={doubles:null,naf:null,beta:null};return t.naf=this._getNAFPoints(8),t.doubles=this._getDoubles(4,e),t.beta=this._getBeta(),this.precomputed=t,this},Rr.prototype._hasDoubles=function(e){if(!this.precomputed)return!1;var t=this.precomputed.doubles;return!!t&&t.points.length>=Math.ceil((e.bitLength()+1)/t.step)},Rr.prototype._getDoubles=function(e,t){if(this.precomputed&&this.precomputed.doubles)return this.precomputed.doubles;for(var r=[this],n=this,i=0;i<t;i+=e){for(var s=0;s<e;s++)n=n.dbl();r.push(n)}return{step:e,points:r}},Rr.prototype._getNAFPoints=function(e){if(this.precomputed&&this.precomputed.naf)return this.precomputed.naf;for(var t=[this],r=(1<<e)-1,n=1===r?null:this.dbl(),i=1;i<r;i++)t[i]=t[i-1].add(n);return{wnd:e,points:t}},Rr.prototype._getBeta=function(){return null},Rr.prototype.dblp=function(e){for(var t=this,r=0;r<e;r++)t=t.dbl();return t};var Nr=xr((function(e){"function"==typeof Object.create?e.exports=function(e,t){t&&(e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}))}:e.exports=function(e,t){if(t){e.super_=t;var r=function(){};r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}}})),Br=_r.assert;function Ur(e){Or.call(this,"short",e),this.a=new N(e.a,16).toRed(this.red),this.b=new N(e.b,16).toRed(this.red),this.tinv=this.two.redInvm(),this.zeroA=0===this.a.fromRed().cmpn(0),this.threeA=0===this.a.fromRed().sub(this.p).cmpn(-3),this.endo=this._getEndomorphism(e),this._endoWnafT1=new Array(4),this._endoWnafT2=new Array(4)}Nr(Ur,Or);var Dr=Ur;function Lr(e,t,r,n){Or.BasePoint.call(this,e,"affine"),null===t&&null===r?(this.x=null,this.y=null,this.inf=!0):(this.x=new N(t,16),this.y=new N(r,16),n&&(this.x.forceRed(this.curve.red),this.y.forceRed(this.curve.red)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.inf=!1)}function Fr(e,t,r,n){Or.BasePoint.call(this,e,"jacobian"),null===t&&null===r&&null===n?(this.x=this.curve.one,this.y=this.curve.one,this.z=new N(0)):(this.x=new N(t,16),this.y=new N(r,16),this.z=new N(n,16)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.zOne=this.z===this.curve.one}Ur.prototype._getEndomorphism=function(e){if(this.zeroA&&this.g&&this.n&&1===this.p.modn(3)){var t,r;if(e.beta)t=new N(e.beta,16).toRed(this.red);else{var n=this._getEndoRoots(this.p);t=(t=n[0].cmp(n[1])<0?n[0]:n[1]).toRed(this.red)}if(e.lambda)r=new N(e.lambda,16);else{var i=this._getEndoRoots(this.n);0===this.g.mul(i[0]).x.cmp(this.g.x.redMul(t))?r=i[0]:(r=i[1],Br(0===this.g.mul(r).x.cmp(this.g.x.redMul(t))))}return{beta:t,lambda:r,basis:e.basis?e.basis.map((function(e){return{a:new N(e.a,16),b:new N(e.b,16)}})):this._getEndoBasis(r)}}},Ur.prototype._getEndoRoots=function(e){var t=e===this.p?this.red:N.mont(e),r=new N(2).toRed(t).redInvm(),n=r.redNeg(),i=new N(3).toRed(t).redNeg().redSqrt().redMul(r);return[n.redAdd(i).fromRed(),n.redSub(i).fromRed()]},Ur.prototype._getEndoBasis=function(e){for(var t,r,n,i,s,o,a,c,l,u=this.n.ushrn(Math.floor(this.n.bitLength()/2)),h=e,d=this.n.clone(),f=new N(1),p=new N(0),g=new N(0),m=new N(1),y=0;0!==h.cmpn(0);){var w=d.div(h);c=d.sub(w.mul(h)),l=g.sub(w.mul(f));var b=m.sub(w.mul(p));if(!n&&c.cmp(u)<0)t=a.neg(),r=f,n=c.neg(),i=l;else if(n&&2==++y)break;a=c,d=h,h=c,g=f,f=l,m=p,p=b}s=c.neg(),o=l;var v=n.sqr().add(i.sqr());return s.sqr().add(o.sqr()).cmp(v)>=0&&(s=t,o=r),n.negative&&(n=n.neg(),i=i.neg()),s.negative&&(s=s.neg(),o=o.neg()),[{a:n,b:i},{a:s,b:o}]},Ur.prototype._endoSplit=function(e){var t=this.endo.basis,r=t[0],n=t[1],i=n.b.mul(e).divRound(this.n),s=r.b.neg().mul(e).divRound(this.n),o=i.mul(r.a),a=s.mul(n.a),c=i.mul(r.b),l=s.mul(n.b);return{k1:e.sub(o).sub(a),k2:c.add(l).neg()}},Ur.prototype.pointFromX=function(e,t){(e=new N(e,16)).red||(e=e.toRed(this.red));var r=e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b),n=r.redSqrt();if(0!==n.redSqr().redSub(r).cmp(this.zero))throw new Error("invalid point");var i=n.fromRed().isOdd();return(t&&!i||!t&&i)&&(n=n.redNeg()),this.point(e,n)},Ur.prototype.validate=function(e){if(e.inf)return!0;var t=e.x,r=e.y,n=this.a.redMul(t),i=t.redSqr().redMul(t).redIAdd(n).redIAdd(this.b);return 0===r.redSqr().redISub(i).cmpn(0)},Ur.prototype._endoWnafMulAdd=function(e,t,r){for(var n=this._endoWnafT1,i=this._endoWnafT2,s=0;s<e.length;s++){var o=this._endoSplit(t[s]),a=e[s],c=a._getBeta();o.k1.negative&&(o.k1.ineg(),a=a.neg(!0)),o.k2.negative&&(o.k2.ineg(),c=c.neg(!0)),n[2*s]=a,n[2*s+1]=c,i[2*s]=o.k1,i[2*s+1]=o.k2}for(var l=this._wnafMulAdd(1,n,i,2*s,r),u=0;u<2*s;u++)n[u]=null,i[u]=null;return l},Nr(Lr,Or.BasePoint),Ur.prototype.point=function(e,t,r){return new Lr(this,e,t,r)},Ur.prototype.pointFromJSON=function(e,t){return Lr.fromJSON(this,e,t)},Lr.prototype._getBeta=function(){if(this.curve.endo){var e=this.precomputed;if(e&&e.beta)return e.beta;var t=this.curve.point(this.x.redMul(this.curve.endo.beta),this.y);if(e){var r=this.curve,n=function(e){return r.point(e.x.redMul(r.endo.beta),e.y)};e.beta=t,t.precomputed={beta:null,naf:e.naf&&{wnd:e.naf.wnd,points:e.naf.points.map(n)},doubles:e.doubles&&{step:e.doubles.step,points:e.doubles.points.map(n)}}}return t}},Lr.prototype.toJSON=function(){return this.precomputed?[this.x,this.y,this.precomputed&&{doubles:this.precomputed.doubles&&{step:this.precomputed.doubles.step,points:this.precomputed.doubles.points.slice(1)},naf:this.precomputed.naf&&{wnd:this.precomputed.naf.wnd,points:this.precomputed.naf.points.slice(1)}}]:[this.x,this.y]},Lr.fromJSON=function(e,t,r){"string"==typeof t&&(t=JSON.parse(t));var n=e.point(t[0],t[1],r);if(!t[2])return n;function i(t){return e.point(t[0],t[1],r)}var s=t[2];return n.precomputed={beta:null,doubles:s.doubles&&{step:s.doubles.step,points:[n].concat(s.doubles.points.map(i))},naf:s.naf&&{wnd:s.naf.wnd,points:[n].concat(s.naf.points.map(i))}},n},Lr.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+">"},Lr.prototype.isInfinity=function(){return this.inf},Lr.prototype.add=function(e){if(this.inf)return e;if(e.inf)return this;if(this.eq(e))return this.dbl();if(this.neg().eq(e))return this.curve.point(null,null);if(0===this.x.cmp(e.x))return this.curve.point(null,null);var t=this.y.redSub(e.y);0!==t.cmpn(0)&&(t=t.redMul(this.x.redSub(e.x).redInvm()));var r=t.redSqr().redISub(this.x).redISub(e.x),n=t.redMul(this.x.redSub(r)).redISub(this.y);return this.curve.point(r,n)},Lr.prototype.dbl=function(){if(this.inf)return this;var e=this.y.redAdd(this.y);if(0===e.cmpn(0))return this.curve.point(null,null);var t=this.curve.a,r=this.x.redSqr(),n=e.redInvm(),i=r.redAdd(r).redIAdd(r).redIAdd(t).redMul(n),s=i.redSqr().redISub(this.x.redAdd(this.x)),o=i.redMul(this.x.redSub(s)).redISub(this.y);return this.curve.point(s,o)},Lr.prototype.getX=function(){return this.x.fromRed()},Lr.prototype.getY=function(){return this.y.fromRed()},Lr.prototype.mul=function(e){return e=new N(e,16),this.isInfinity()?this:this._hasDoubles(e)?this.curve._fixedNafMul(this,e):this.curve.endo?this.curve._endoWnafMulAdd([this],[e]):this.curve._wnafMul(this,e)},Lr.prototype.mulAdd=function(e,t,r){var n=[this,t],i=[e,r];return this.curve.endo?this.curve._endoWnafMulAdd(n,i):this.curve._wnafMulAdd(1,n,i,2)},Lr.prototype.jmulAdd=function(e,t,r){var n=[this,t],i=[e,r];return this.curve.endo?this.curve._endoWnafMulAdd(n,i,!0):this.curve._wnafMulAdd(1,n,i,2,!0)},Lr.prototype.eq=function(e){return this===e||this.inf===e.inf&&(this.inf||0===this.x.cmp(e.x)&&0===this.y.cmp(e.y))},Lr.prototype.neg=function(e){if(this.inf)return this;var t=this.curve.point(this.x,this.y.redNeg());if(e&&this.precomputed){var r=this.precomputed,n=function(e){return e.neg()};t.precomputed={naf:r.naf&&{wnd:r.naf.wnd,points:r.naf.points.map(n)},doubles:r.doubles&&{step:r.doubles.step,points:r.doubles.points.map(n)}}}return t},Lr.prototype.toJ=function(){return this.inf?this.curve.jpoint(null,null,null):this.curve.jpoint(this.x,this.y,this.curve.one)},Nr(Fr,Or.BasePoint),Ur.prototype.jpoint=function(e,t,r){return new Fr(this,e,t,r)},Fr.prototype.toP=function(){if(this.isInfinity())return this.curve.point(null,null);var e=this.z.redInvm(),t=e.redSqr(),r=this.x.redMul(t),n=this.y.redMul(t).redMul(e);return this.curve.point(r,n)},Fr.prototype.neg=function(){return this.curve.jpoint(this.x,this.y.redNeg(),this.z)},Fr.prototype.add=function(e){if(this.isInfinity())return e;if(e.isInfinity())return this;var t=e.z.redSqr(),r=this.z.redSqr(),n=this.x.redMul(t),i=e.x.redMul(r),s=this.y.redMul(t.redMul(e.z)),o=e.y.redMul(r.redMul(this.z)),a=n.redSub(i),c=s.redSub(o);if(0===a.cmpn(0))return 0!==c.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var l=a.redSqr(),u=l.redMul(a),h=n.redMul(l),d=c.redSqr().redIAdd(u).redISub(h).redISub(h),f=c.redMul(h.redISub(d)).redISub(s.redMul(u)),p=this.z.redMul(e.z).redMul(a);return this.curve.jpoint(d,f,p)},Fr.prototype.mixedAdd=function(e){if(this.isInfinity())return e.toJ();if(e.isInfinity())return this;var t=this.z.redSqr(),r=this.x,n=e.x.redMul(t),i=this.y,s=e.y.redMul(t).redMul(this.z),o=r.redSub(n),a=i.redSub(s);if(0===o.cmpn(0))return 0!==a.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var c=o.redSqr(),l=c.redMul(o),u=r.redMul(c),h=a.redSqr().redIAdd(l).redISub(u).redISub(u),d=a.redMul(u.redISub(h)).redISub(i.redMul(l)),f=this.z.redMul(o);return this.curve.jpoint(h,d,f)},Fr.prototype.dblp=function(e){if(0===e)return this;if(this.isInfinity())return this;if(!e)return this.dbl();var t;if(this.curve.zeroA||this.curve.threeA){var r=this;for(t=0;t<e;t++)r=r.dbl();return r}var n=this.curve.a,i=this.curve.tinv,s=this.x,o=this.y,a=this.z,c=a.redSqr().redSqr(),l=o.redAdd(o);for(t=0;t<e;t++){var u=s.redSqr(),h=l.redSqr(),d=h.redSqr(),f=u.redAdd(u).redIAdd(u).redIAdd(n.redMul(c)),p=s.redMul(h),g=f.redSqr().redISub(p.redAdd(p)),m=p.redISub(g),y=f.redMul(m);y=y.redIAdd(y).redISub(d);var w=l.redMul(a);t+1<e&&(c=c.redMul(d)),s=g,a=w,l=y}return this.curve.jpoint(s,l.redMul(i),a)},Fr.prototype.dbl=function(){return this.isInfinity()?this:this.curve.zeroA?this._zeroDbl():this.curve.threeA?this._threeDbl():this._dbl()},Fr.prototype._zeroDbl=function(){var e,t,r;if(this.zOne){var n=this.x.redSqr(),i=this.y.redSqr(),s=i.redSqr(),o=this.x.redAdd(i).redSqr().redISub(n).redISub(s);o=o.redIAdd(o);var a=n.redAdd(n).redIAdd(n),c=a.redSqr().redISub(o).redISub(o),l=s.redIAdd(s);l=(l=l.redIAdd(l)).redIAdd(l),e=c,t=a.redMul(o.redISub(c)).redISub(l),r=this.y.redAdd(this.y)}else{var u=this.x.redSqr(),h=this.y.redSqr(),d=h.redSqr(),f=this.x.redAdd(h).redSqr().redISub(u).redISub(d);f=f.redIAdd(f);var p=u.redAdd(u).redIAdd(u),g=p.redSqr(),m=d.redIAdd(d);m=(m=m.redIAdd(m)).redIAdd(m),e=g.redISub(f).redISub(f),t=p.redMul(f.redISub(e)).redISub(m),r=(r=this.y.redMul(this.z)).redIAdd(r)}return this.curve.jpoint(e,t,r)},Fr.prototype._threeDbl=function(){var e,t,r;if(this.zOne){var n=this.x.redSqr(),i=this.y.redSqr(),s=i.redSqr(),o=this.x.redAdd(i).redSqr().redISub(n).redISub(s);o=o.redIAdd(o);var a=n.redAdd(n).redIAdd(n).redIAdd(this.curve.a),c=a.redSqr().redISub(o).redISub(o);e=c;var l=s.redIAdd(s);l=(l=l.redIAdd(l)).redIAdd(l),t=a.redMul(o.redISub(c)).redISub(l),r=this.y.redAdd(this.y)}else{var u=this.z.redSqr(),h=this.y.redSqr(),d=this.x.redMul(h),f=this.x.redSub(u).redMul(this.x.redAdd(u));f=f.redAdd(f).redIAdd(f);var p=d.redIAdd(d),g=(p=p.redIAdd(p)).redAdd(p);e=f.redSqr().redISub(g),r=this.y.redAdd(this.z).redSqr().redISub(h).redISub(u);var m=h.redSqr();m=(m=(m=m.redIAdd(m)).redIAdd(m)).redIAdd(m),t=f.redMul(p.redISub(e)).redISub(m)}return this.curve.jpoint(e,t,r)},Fr.prototype._dbl=function(){var e=this.curve.a,t=this.x,r=this.y,n=this.z,i=n.redSqr().redSqr(),s=t.redSqr(),o=r.redSqr(),a=s.redAdd(s).redIAdd(s).redIAdd(e.redMul(i)),c=t.redAdd(t),l=(c=c.redIAdd(c)).redMul(o),u=a.redSqr().redISub(l.redAdd(l)),h=l.redISub(u),d=o.redSqr();d=(d=(d=d.redIAdd(d)).redIAdd(d)).redIAdd(d);var f=a.redMul(h).redISub(d),p=r.redAdd(r).redMul(n);return this.curve.jpoint(u,f,p)},Fr.prototype.trpl=function(){if(!this.curve.zeroA)return this.dbl().add(this);var e=this.x.redSqr(),t=this.y.redSqr(),r=this.z.redSqr(),n=t.redSqr(),i=e.redAdd(e).redIAdd(e),s=i.redSqr(),o=this.x.redAdd(t).redSqr().redISub(e).redISub(n),a=(o=(o=(o=o.redIAdd(o)).redAdd(o).redIAdd(o)).redISub(s)).redSqr(),c=n.redIAdd(n);c=(c=(c=c.redIAdd(c)).redIAdd(c)).redIAdd(c);var l=i.redIAdd(o).redSqr().redISub(s).redISub(a).redISub(c),u=t.redMul(l);u=(u=u.redIAdd(u)).redIAdd(u);var h=this.x.redMul(a).redISub(u);h=(h=h.redIAdd(h)).redIAdd(h);var d=this.y.redMul(l.redMul(c.redISub(l)).redISub(o.redMul(a)));d=(d=(d=d.redIAdd(d)).redIAdd(d)).redIAdd(d);var f=this.z.redAdd(o).redSqr().redISub(r).redISub(a);return this.curve.jpoint(h,d,f)},Fr.prototype.mul=function(e,t){return e=new N(e,t),this.curve._wnafMul(this,e)},Fr.prototype.eq=function(e){if("affine"===e.type)return this.eq(e.toJ());if(this===e)return!0;var t=this.z.redSqr(),r=e.z.redSqr();if(0!==this.x.redMul(r).redISub(e.x.redMul(t)).cmpn(0))return!1;var n=t.redMul(this.z),i=r.redMul(e.z);return 0===this.y.redMul(i).redISub(e.y.redMul(n)).cmpn(0)},Fr.prototype.eqXToP=function(e){var t=this.z.redSqr(),r=e.toRed(this.curve.red).redMul(t);if(0===this.x.cmp(r))return!0;for(var n=e.clone(),i=this.curve.redN.redMul(t);;){if(n.iadd(this.curve.n),n.cmp(this.curve.p)>=0)return!1;if(r.redIAdd(i),0===this.x.cmp(r))return!0}},Fr.prototype.inspect=function(){return this.isInfinity()?"<EC JPoint Infinity>":"<EC JPoint x: "+this.x.toString(16,2)+" y: "+this.y.toString(16,2)+" z: "+this.z.toString(16,2)+">"},Fr.prototype.isInfinity=function(){return 0===this.z.cmpn(0)};var jr=xr((function(e,t){var r=t;r.base=Or,r.short=Dr,r.mont=null,r.edwards=null})),Hr=xr((function(e,t){var r,n=t,i=_r.assert;function s(e){"short"===e.type?this.curve=new jr.short(e):"edwards"===e.type?this.curve=new jr.edwards(e):this.curve=new jr.mont(e),this.g=this.curve.g,this.n=this.curve.n,this.hash=e.hash,i(this.g.validate(),"Invalid curve"),i(this.g.mul(this.n).isInfinity(),"Invalid curve, G*N != O")}function o(e,t){Object.defineProperty(n,e,{configurable:!0,enumerable:!0,get:function(){var r=new s(t);return Object.defineProperty(n,e,{configurable:!0,enumerable:!0,value:r}),r}})}n.PresetCurve=s,o("p192",{type:"short",prime:"p192",p:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",a:"ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",b:"64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",n:"ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",hash:Ce.sha256,gRed:!1,g:["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012","07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]}),o("p224",{type:"short",prime:"p224",p:"ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",a:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",b:"b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",n:"ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",hash:Ce.sha256,gRed:!1,g:["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21","bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]}),o("p256",{type:"short",prime:null,p:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",a:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",b:"5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",n:"ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",hash:Ce.sha256,gRed:!1,g:["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296","4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]}),o("p384",{type:"short",prime:null,p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",a:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",b:"b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",n:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",hash:Ce.sha384,gRed:!1,g:["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7","3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]}),o("p521",{type:"short",prime:null,p:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",a:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",b:"00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",n:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",hash:Ce.sha512,gRed:!1,g:["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66","00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]}),o("curve25519",{type:"mont",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"76d06",b:"1",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:Ce.sha256,gRed:!1,g:["9"]}),o("ed25519",{type:"edwards",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"-1",c:"1",d:"52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:Ce.sha256,gRed:!1,g:["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a","6666666666666666666666666666666666666666666666666666666666666658"]});try{r=null.crash()}catch{r=void 0}o("secp256k1",{type:"short",prime:"k256",p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",a:"0",b:"7",n:"ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",h:"1",hash:Ce.sha256,beta:"7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",lambda:"5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",basis:[{a:"3086d221a7d46bcde86c90e49284eb15",b:"-e4437ed6010e88286f547fa90abfe4c3"},{a:"114ca50f7a8e2f3f657c1108d9d44cfd8",b:"3086d221a7d46bcde86c90e49284eb15"}],gRed:!1,g:["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",r]})}));function zr(e){if(!(this instanceof zr))return new zr(e);this.hash=e.hash,this.predResist=!!e.predResist,this.outLen=this.hash.outSize,this.minEntropy=e.minEntropy||this.hash.hmacStrength,this._reseed=null,this.reseedInterval=null,this.K=null,this.V=null;var t=kr.toArray(e.entropy,e.entropyEnc||"hex"),r=kr.toArray(e.nonce,e.nonceEnc||"hex"),n=kr.toArray(e.pers,e.persEnc||"hex");Cr(t.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._init(t,r,n)}var qr=zr;zr.prototype._init=function(e,t,r){var n=e.concat(t).concat(r);this.K=new Array(this.outLen/8),this.V=new Array(this.outLen/8);for(var i=0;i<this.V.length;i++)this.K[i]=0,this.V[i]=1;this._update(n),this._reseed=1,this.reseedInterval=281474976710656},zr.prototype._hmac=function(){return new Ce.hmac(this.hash,this.K)},zr.prototype._update=function(e){var t=this._hmac().update(this.V).update([0]);e&&(t=t.update(e)),this.K=t.digest(),this.V=this._hmac().update(this.V).digest(),e&&(this.K=this._hmac().update(this.V).update([1]).update(e).digest(),this.V=this._hmac().update(this.V).digest())},zr.prototype.reseed=function(e,t,r,n){"string"!=typeof t&&(n=r,r=t,t=null),e=kr.toArray(e,t),r=kr.toArray(r,n),Cr(e.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._update(e.concat(r||[])),this._reseed=1},zr.prototype.generate=function(e,t,r,n){if(this._reseed>this.reseedInterval)throw new Error("Reseed is required");"string"!=typeof t&&(n=r,r=t,t=null),r&&(r=kr.toArray(r,n||"hex"),this._update(r));for(var i=[];i.length<e;)this.V=this._hmac().update(this.V).digest(),i=i.concat(this.V);var s=i.slice(0,e);return this._update(r),this._reseed++,kr.encode(s,t)};var $r=_r.assert;function Wr(e,t){this.ec=e,this.priv=null,this.pub=null,t.priv&&this._importPrivate(t.priv,t.privEnc),t.pub&&this._importPublic(t.pub,t.pubEnc)}var Gr=Wr;Wr.fromPublic=function(e,t,r){return t instanceof Wr?t:new Wr(e,{pub:t,pubEnc:r})},Wr.fromPrivate=function(e,t,r){return t instanceof Wr?t:new Wr(e,{priv:t,privEnc:r})},Wr.prototype.validate=function(){var e=this.getPublic();return e.isInfinity()?{result:!1,reason:"Invalid public key"}:e.validate()?e.mul(this.ec.curve.n).isInfinity()?{result:!0,reason:null}:{result:!1,reason:"Public key * N != O"}:{result:!1,reason:"Public key is not a point"}},Wr.prototype.getPublic=function(e,t){return"string"==typeof e&&(t=e,e=null),this.pub||(this.pub=this.ec.g.mul(this.priv)),t?this.pub.encode(t,e):this.pub},Wr.prototype.getPrivate=function(e){return"hex"===e?this.priv.toString(16,2):this.priv},Wr.prototype._importPrivate=function(e,t){this.priv=new N(e,t||16),this.priv=this.priv.umod(this.ec.curve.n)},Wr.prototype._importPublic=function(e,t){if(e.x||e.y)return"mont"===this.ec.curve.type?$r(e.x,"Need x coordinate"):("short"===this.ec.curve.type||"edwards"===this.ec.curve.type)&&$r(e.x&&e.y,"Need both x and y coordinate"),void(this.pub=this.ec.curve.point(e.x,e.y));this.pub=this.ec.curve.decodePoint(e,t)},Wr.prototype.derive=function(e){return e.validate()||$r(e.validate(),"public point not validated"),e.mul(this.priv).getX()},Wr.prototype.sign=function(e,t,r){return this.ec.sign(e,this,t,r)},Wr.prototype.verify=function(e,t){return this.ec.verify(e,t,this)},Wr.prototype.inspect=function(){return"<Key priv: "+(this.priv&&this.priv.toString(16,2))+" pub: "+(this.pub&&this.pub.inspect())+" >"};var Vr=_r.assert;function Kr(e,t){if(e instanceof Kr)return e;this._importDER(e,t)||(Vr(e.r&&e.s,"Signature without r or s"),this.r=new N(e.r,16),this.s=new N(e.s,16),void 0===e.recoveryParam?this.recoveryParam=null:this.recoveryParam=e.recoveryParam)}var Zr=Kr;function Qr(){this.place=0}function Jr(e,t){var r=e[t.place++];if(!(128&r))return r;var n=15&r;if(0===n||n>4)return!1;for(var i=0,s=0,o=t.place;s<n;s++,o++)i<<=8,i|=e[o],i>>>=0;return!(i<=127)&&(t.place=o,i)}function Yr(e){for(var t=0,r=e.length-1;!e[t]&&!(128&e[t+1])&&t<r;)t++;return 0===t?e:e.slice(t)}function Xr(e,t){if(t<128)e.push(t);else{var r=1+(Math.log(t)/Math.LN2>>>3);for(e.push(128|r);--r;)e.push(t>>>(r<<3)&255);e.push(t)}}Kr.prototype._importDER=function(e,t){e=_r.toArray(e,t);var r=new Qr;if(48!==e[r.place++])return!1;var n=Jr(e,r);if(!1===n||n+r.place!==e.length||2!==e[r.place++])return!1;var i=Jr(e,r);if(!1===i)return!1;var s=e.slice(r.place,i+r.place);if(r.place+=i,2!==e[r.place++])return!1;var o=Jr(e,r);if(!1===o||e.length!==o+r.place)return!1;var a=e.slice(r.place,o+r.place);if(0===s[0]){if(!(128&s[1]))return!1;s=s.slice(1)}if(0===a[0]){if(!(128&a[1]))return!1;a=a.slice(1)}return this.r=new N(s),this.s=new N(a),this.recoveryParam=null,!0},Kr.prototype.toDER=function(e){var t=this.r.toArray(),r=this.s.toArray();for(128&t[0]&&(t=[0].concat(t)),128&r[0]&&(r=[0].concat(r)),t=Yr(t),r=Yr(r);!(r[0]||128&r[1]);)r=r.slice(1);var n=[2];Xr(n,t.length),(n=n.concat(t)).push(2),Xr(n,r.length);var i=n.concat(r),s=[48];return Xr(s,i.length),s=s.concat(i),_r.encode(s,e)};var en=function(){throw new Error("unsupported")},tn=_r.assert;function rn(e){if(!(this instanceof rn))return new rn(e);"string"==typeof e&&(tn(Object.prototype.hasOwnProperty.call(Hr,e),"Unknown curve "+e),e=Hr[e]),e instanceof Hr.PresetCurve&&(e={curve:e}),this.curve=e.curve.curve,this.n=this.curve.n,this.nh=this.n.ushrn(1),this.g=this.curve.g,this.g=e.curve.g,this.g.precompute(e.curve.n.bitLength()+1),this.hash=e.hash||e.curve.hash}var nn,sn=rn;rn.prototype.keyPair=function(e){return new Gr(this,e)},rn.prototype.keyFromPrivate=function(e,t){return Gr.fromPrivate(this,e,t)},rn.prototype.keyFromPublic=function(e,t){return Gr.fromPublic(this,e,t)},rn.prototype.genKeyPair=function(e){e||(e={});for(var t=new qr({hash:this.hash,pers:e.pers,persEnc:e.persEnc||"utf8",entropy:e.entropy||en(this.hash.hmacStrength),entropyEnc:e.entropy&&e.entropyEnc||"utf8",nonce:this.n.toArray()}),r=this.n.byteLength(),n=this.n.sub(new N(2));;){var i=new N(t.generate(r));if(!(i.cmp(n)>0))return i.iaddn(1),this.keyFromPrivate(i)}},rn.prototype._truncateToN=function(e,t){var r=8*e.byteLength()-this.n.bitLength();return r>0&&(e=e.ushrn(r)),!t&&e.cmp(this.n)>=0?e.sub(this.n):e},rn.prototype.sign=function(e,t,r,n){"object"==typeof r&&(n=r,r=null),n||(n={}),t=this.keyFromPrivate(t,r),e=this._truncateToN(new N(e,16));for(var i=this.n.byteLength(),s=t.getPrivate().toArray("be",i),o=e.toArray("be",i),a=new qr({hash:this.hash,entropy:s,nonce:o,pers:n.pers,persEnc:n.persEnc||"utf8"}),c=this.n.sub(new N(1)),l=0;;l++){var u=n.k?n.k(l):new N(a.generate(this.n.byteLength()));if(!((u=this._truncateToN(u,!0)).cmpn(1)<=0||u.cmp(c)>=0)){var h=this.g.mul(u);if(!h.isInfinity()){var d=h.getX(),f=d.umod(this.n);if(0!==f.cmpn(0)){var p=u.invm(this.n).mul(f.mul(t.getPrivate()).iadd(e));if(0!==(p=p.umod(this.n)).cmpn(0)){var g=(h.getY().isOdd()?1:0)|(0!==d.cmp(f)?2:0);return n.canonical&&p.cmp(this.nh)>0&&(p=this.n.sub(p),g^=1),new Zr({r:f,s:p,recoveryParam:g})}}}}}},rn.prototype.verify=function(e,t,r,n){e=this._truncateToN(new N(e,16)),r=this.keyFromPublic(r,n);var i=(t=new Zr(t,"hex")).r,s=t.s;if(i.cmpn(1)<0||i.cmp(this.n)>=0||s.cmpn(1)<0||s.cmp(this.n)>=0)return!1;var o,a=s.invm(this.n),c=a.mul(e).umod(this.n),l=a.mul(i).umod(this.n);return this.curve._maxwellTrick?!(o=this.g.jmulAdd(c,r.getPublic(),l)).isInfinity()&&o.eqXToP(i):!(o=this.g.mulAdd(c,r.getPublic(),l)).isInfinity()&&0===o.getX().umod(this.n).cmp(i)},rn.prototype.recoverPubKey=function(e,t,r,n){tn((3&r)===r,"The recovery param is more than two bits"),t=new Zr(t,n);var i=this.n,s=new N(e),o=t.r,a=t.s,c=1&r,l=r>>1;if(o.cmp(this.curve.p.umod(this.curve.n))>=0&&l)throw new Error("Unable to find sencond key candinate");o=l?this.curve.pointFromX(o.add(this.curve.n),c):this.curve.pointFromX(o,c);var u=t.r.invm(i),h=i.sub(s).mul(u).umod(i),d=a.mul(u).umod(i);return this.g.mulAdd(h,o,d)},rn.prototype.getKeyRecoveryParam=function(e,t,r,n){if(null!==(t=new Zr(t,n)).recoveryParam)return t.recoveryParam;for(var i=0;i<4;i++){var s;try{s=this.recoverPubKey(e,t,i)}catch{continue}if(s.eq(r))return i}throw new Error("Unable to find valid recovery factor")},xr((function(e,t){var r=t;r.version="6.5.4",r.utils=_r,r.rand=function(){throw new Error("unsupported")},r.curve=jr,r.curves=Hr,r.ec=sn,r.eddsa=null})).ec,new A("signing-key/5.7.0"),new A("transactions/5.7.0"),function(e){e[e.legacy=0]="legacy",e[e.eip2930=1]="eip2930",e[e.eip1559=2]="eip1559"}(nn||(nn={})),Object.defineProperty,Object.defineProperties,Object.getOwnPropertyDescriptors,Object.getOwnPropertySymbols,Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable;const on=e=>e?.split(":"),an=e=>{const t=e&&on(e);if(t)return e.includes("did:pkh:")?t[3]:t[1]},cn=e=>{const t=e&&on(e);if(t)return t.pop()},ln=(e,t)=>{const r=`${e.domain} wants you to sign in with your Ethereum account:`,n=cn(t);if(!e.aud&&!e.uri)throw new Error("Either `aud` or `uri` is required to construct the message");let i=e.statement||void 0;const s=`URI: ${e.aud||e.uri}`,o=`Version: ${e.version}`,a=`Chain ID: ${an(t)}`,c=`Nonce: ${e.nonce}`,u=`Issued At: ${e.iat}`,h=e.resources?`Resources:${e.resources.map((e=>`\n- ${e}`)).join("")}`:void 0,d=function(e){if(!e)return;const t=e?.[e.length-1];return function(e){return e&&e.includes("urn:recap:")}(t)?t:void 0}(e.resources);return d&&(i=function(e="",t){un(t);const r="I further authorize the stated URI to perform the following actions on my behalf: ";if(e.includes(r))return e;const n=[];let i=0;return Object.keys(t.att).forEach((e=>{const r=Object.keys(t.att[e]).map((e=>({ability:e.split("/")[0],action:e.split("/")[1]})));r.sort(((e,t)=>e.action.localeCompare(t.action)));const s={};r.forEach((e=>{s[e.ability]||(s[e.ability]=[]),s[e.ability].push(e.action)}));const o=Object.keys(s).map((t=>(i++,`(${i}) '${t}': '${s[t].join("', '")}' for '${e}'.`)));n.push(o.join(", ").replace(".,","."))})),`${e?e+" ":""}${r}${n.join(" ")}`}(i,function(e){const t=function(e){return JSON.parse(l.from(e,"base64").toString("utf-8"))}(e.replace("urn:recap:",""));return un(t),t}(d))),[r,n,"",i,"",s,o,a,c,u,h].filter((e=>null!=e)).join("\n")};function un(e){if(!e)throw new Error("No recap provided, value is undefined");if(!e.att)throw new Error("No `att` property found");const t=Object.keys(e.att);if(null==t||!t.length)throw new Error("No resources found in `att` property");t.forEach((t=>{const r=e.att[t];if(Array.isArray(r))throw new Error(`Resource must be an object: ${t}`);if("object"!=typeof r)throw new Error(`Resource must be an object: ${t}`);if(!Object.keys(r).length)throw new Error(`Resource object is empty: ${t}`);Object.keys(r).forEach((e=>{const t=r[e];if(!Array.isArray(t))throw new Error(`Ability limits ${e} must be an array of objects, found: ${t}`);if(!t.length)throw new Error(`Value of ${e} is empty array, must be an array with objects`);t.forEach((t=>{if("object"!=typeof t)throw new Error(`Ability limits (${e}) must be an array of objects, found: ${t}`)}))}))}))}Object.defineProperty,Object.defineProperties,Object.getOwnPropertyDescriptors,Object.getOwnPropertySymbols,Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable,Object.defineProperty,Object.defineProperties,Object.getOwnPropertyDescriptors,Object.getOwnPropertySymbols,Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable;var hn=r(4707),dn=r(9073);const fn=(0,dn.BX)({status:"uninitialized"}),pn={state:fn,subscribeKey:(e,t)=>(0,hn.u$)(fn,e,t),subscribe:e=>(0,dn.B1)(fn,(()=>e(fn))),_getClient(){if(!fn._client)throw new Error("SIWEController client not set");return fn._client},async getNonce(e){const t=this._getClient(),r=await t.getNonce(e);return this.setNonce(r),r},async getSession(){try{const e=this._getClient(),t=await e.getSession();return t&&(this.setSession(t),this.setStatus("success")),t}catch{return}},createMessage(e){const t=this._getClient().createMessage(e);return this.setMessage(t),t},async verifyMessage(e){const t=this._getClient();return await t.verifyMessage(e)},async signIn(){const e=this._getClient();return await e.signIn()},async signOut(){const e=this._getClient();await e.signOut(),this.setStatus("ready"),this.setSession(void 0),e.onSignOut?.()},onSignIn(e){const t=this._getClient();t.onSignIn?.(e)},onSignOut(){const e=this._getClient();e.onSignOut?.()},setSIWEClient(e){fn._client=(0,dn.KR)(e),fn.status="ready",n.OptionsController.setIsSiweEnabled(e.options.enabled)},setNonce(e){fn.nonce=e},setStatus(e){fn.status=e},setMessage(e){fn.message=e},setSession(e){fn.session=e,fn.status=e?"success":"ready"}};var gn=r(6021),mn=r(2618);const yn=mn.AH`
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;let wn=class extends mn.WF{constructor(){super(...arguments),this.dappImageUrl=n.OptionsController.state.metadata?.icons,this.walletImageUrl=n.iT.getConnectedWalletImageUrl()}firstUpdated(){const e=this.shadowRoot?.querySelectorAll("wui-visual-thumbnail");e?.[0]&&this.createAnimation(e[0],"translate(18px)"),e?.[1]&&this.createAnimation(e[1],"translate(-18px)")}render(){return mn.qy`
      <wui-visual-thumbnail
        ?borderRadiusFull=${!0}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `}createAnimation(e,t){e.animate([{transform:"translateX(0px)"},{transform:t}],{duration:1600,easing:"cubic-bezier(0.56, 0, 0.48, 1)",direction:"alternate",iterations:1/0})}};wn.styles=yn,wn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,gn.customElement)("w3m-connecting-siwe")],wn);var bn=r(5707),vn=r(2667),An=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let En=class extends mn.WF{constructor(){super(...arguments),this.dappName=n.OptionsController.state.metadata?.name,this.isSigning=!1}render(){return this.onRender(),mn.qy`
      <wui-flex justifyContent="center" .padding=${["2xl","0","xxl","0"]}>
        <w3m-connecting-siwe></w3m-connecting-siwe>
      </wui-flex>
      <wui-flex
        .padding=${["0","4xl","l","4xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName??"Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex
        .padding=${["0","3xl","l","3xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["l","xl","xl","xl"]} gap="s" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral"
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          Cancel
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="main"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning?"Signing...":"Sign"}
        </wui-button>
      </wui-flex>
    `}onRender(){pn.state.session&&n.W3.close()}async onSign(){this.isSigning=!0,n.En.sendEvent({event:"CLICK_SIGN_SIWE_MESSAGE",type:"track"});try{pn.setStatus("loading");const e=await pn.signIn();return pn.setStatus("success"),n.En.sendEvent({event:"SIWE_AUTH_SUCCESS",type:"track"}),e}catch(e){return n.AccountController.state.preferredAccountType===vn.Vl.ACCOUNT_TYPES.SMART_ACCOUNT?n.SnackController.showError("This application might not support Smart Accounts"):n.SnackController.showError("Signature declined"),pn.setStatus("error"),n.En.sendEvent({event:"SIWE_AUTH_ERROR",type:"track"})}finally{this.isSigning=!1}}async onCancel(){const{isConnected:e}=n.AccountController.state;e?(await n.ConnectionController.disconnect(),n.W3.close()):n.RouterController.push("Connect"),n.En.sendEvent({event:"CLICK_CANCEL_SIWE",type:"track"})}};function xn(e){return new o(e)}An([(0,bn.wk)()],En.prototype,"isSigning",void 0),En=An([(0,gn.customElement)("w3m-connecting-siwe-view")],En)},6021:(e,t,r)=>{"use strict";r.r(t),r.d(t,{MathUtil:()=>fs,TransactionUtil:()=>ms,UiHelperUtil:()=>Tt,WuiAccountButton:()=>zt,WuiAllWalletsImage:()=>Kt,WuiAvatar:()=>Ut,WuiBalance:()=>Si,WuiBanner:()=>Di,WuiButton:()=>er,WuiCard:()=>b,WuiCardSelect:()=>dr,WuiCardSelectLoader:()=>ir,WuiChip:()=>gr,WuiChipButton:()=>Pi,WuiCompatibleNetwork:()=>Ni,WuiConnectButton:()=>wr,WuiCtaButton:()=>Ar,WuiDetailsGroup:()=>xr,WuiDetailsGroupItem:()=>kr,WuiEmailInput:()=>Rr,WuiEnsInput:()=>Ur,WuiFlex:()=>Rt,WuiGrid:()=>ls,WuiIcon:()=>De,WuiIconBox:()=>Ft,WuiIconButton:()=>es,WuiIconLink:()=>Fr,WuiImage:()=>je,WuiInputAmount:()=>Ki,WuiInputElement:()=>zr,WuiInputNumeric:()=>Wr,WuiInputText:()=>Tr,WuiLink:()=>Kr,WuiListAccordion:()=>ni,WuiListButton:()=>ns,WuiListContent:()=>oi,WuiListDescription:()=>qi,WuiListItem:()=>Jr,WuiListNetwork:()=>li,WuiListSocial:()=>os,WuiListToken:()=>ji,WuiListWallet:()=>fn,WuiListWalletTransaction:()=>di,WuiLoadingHexagon:()=>ze,WuiLoadingSpinner:()=>We,WuiLoadingThumbnail:()=>Ke,WuiLogo:()=>mn,WuiLogoSelect:()=>bn,WuiNetworkButton:()=>En,WuiNetworkImage:()=>lr,WuiNoticeCard:()=>ei,WuiOnRampActivityItem:()=>mi,WuiOnRampProviderItem:()=>bi,WuiOtp:()=>Sn,WuiPreviewItem:()=>Ji,WuiProfileButton:()=>Ii,WuiPromo:()=>Ei,WuiQrCode:()=>Pn,WuiSearchBar:()=>Rn,WuiSeparator:()=>ds,WuiShimmer:()=>Je,WuiSnackbar:()=>Un,WuiTabs:()=>Fn,WuiTag:()=>un,WuiText:()=>nt,WuiTokenButton:()=>zn,WuiTokenListItem:()=>Kn,WuiTooltip:()=>Wn,WuiTransactionListItem:()=>sn,WuiTransactionListItemLoader:()=>an,WuiTransactionVisual:()=>tn,WuiVisual:()=>It,WuiVisualThumbnail:()=>Jn,WuiWalletImage:()=>Wt,customElement:()=>y,initializeTheming:()=>u,setColorTheme:()=>h,setThemeVariables:()=>d,swapInputMaskBottomSvg:()=>i,swapInputMaskTopSvg:()=>s});var n=r(2618);const i=n.JW`<svg class="input_mask" width="328" height="100" viewBox="0 0 328 100" fill="none">
  <mask id="path-1-inside-1_18299_4189">
    <path
      class="input_mask__border"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M138.008 0H40C21.1438 0 11.7157 0 5.85786 5.85786C0 11.7157 0 21.1438 0 40V60C0 78.8562 0 88.2843 5.85786 94.1421C11.7157 100 21.1438 100 40 100H288C306.856 100 316.284 100 322.142 94.1421C328 88.2843 328 78.8562 328 60V40C328 21.1438 328 11.7157 322.142 5.85786C316.284 0 306.856 0 288 0H189.992C189.958 4.89122 189.786 7.76279 188.914 10.1564C187.095 15.1562 183.156 19.0947 178.156 20.9145C175.174 22 171.449 22 164 22C156.551 22 152.826 22 149.844 20.9145C144.844 19.0947 140.905 15.1562 139.086 10.1564C138.214 7.76279 138.042 4.89122 138.008 0Z"
    />
  </mask>
  <path
    class="input_mask__background"
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M138.008 0H40C21.1438 0 11.7157 0 5.85786 5.85786C0 11.7157 0 21.1438 0 40V60C0 78.8562 0 88.2843 5.85786 94.1421C11.7157 100 21.1438 100 40 100H288C306.856 100 316.284 100 322.142 94.1421C328 88.2843 328 78.8562 328 60V40C328 21.1438 328 11.7157 322.142 5.85786C316.284 0 306.856 0 288 0H189.992C189.958 4.89122 189.786 7.76279 188.914 10.1564C187.095 15.1562 183.156 19.0947 178.156 20.9145C175.174 22 171.449 22 164 22C156.551 22 152.826 22 149.844 20.9145C144.844 19.0947 140.905 15.1562 139.086 10.1564C138.214 7.76279 138.042 4.89122 138.008 0Z"
  />
  <path
    class="input_mask__border"
    d="M138.008 0L139.008 -0.00694413L139.001 -1H138.008V0ZM322.142 94.1421L322.849 94.8492H322.849L322.142 94.1421ZM322.142 5.85786L322.849 5.15076L322.849 5.15076L322.142 5.85786ZM189.992 0V-1H188.999L188.992 -0.00694413L189.992 0ZM188.914 10.1564L189.854 10.4984V10.4984L188.914 10.1564ZM178.156 20.9145L177.814 19.9748V19.9748L178.156 20.9145ZM149.844 20.9145L150.186 19.9748V19.9748L149.844 20.9145ZM139.086 10.1564L138.146 10.4984V10.4984L139.086 10.1564ZM40 1H138.008V-1H40V1ZM6.56497 6.56497C9.27713 3.85281 12.8524 2.44064 18.1878 1.72332C23.552 1.00212 30.5436 1 40 1V-1C30.6002 -1 23.4497 -1.00212 17.9213 -0.25885C12.3641 0.488292 8.29646 2.00506 5.15076 5.15076L6.56497 6.56497ZM1 40C1 30.5436 1.00212 23.552 1.72332 18.1878C2.44064 12.8524 3.85281 9.27713 6.56497 6.56497L5.15076 5.15076C2.00506 8.29646 0.488292 12.3641 -0.25885 17.9213C-1.00212 23.4497 -1 30.6002 -1 40H1ZM1 60V40H-1V60H1ZM6.56497 93.435C3.85281 90.7229 2.44064 87.1476 1.72332 81.8122C1.00212 76.448 1 69.4564 1 60H-1C-1 69.3998 -1.00212 76.5503 -0.25885 82.0787C0.488292 87.6358 2.00506 91.7035 5.15076 94.8492L6.56497 93.435ZM40 99C30.5436 99 23.552 98.9979 18.1878 98.2767C12.8524 97.5594 9.27713 96.1472 6.56497 93.435L5.15076 94.8492C8.29646 97.9949 12.3641 99.5117 17.9213 100.259C23.4497 101.002 30.6002 101 40 101V99ZM288 99H40V101H288V99ZM321.435 93.435C318.723 96.1472 315.148 97.5594 309.812 98.2767C304.448 98.9979 297.456 99 288 99V101C297.4 101 304.55 101.002 310.079 100.259C315.636 99.5117 319.704 97.9949 322.849 94.8492L321.435 93.435ZM327 60C327 69.4564 326.998 76.448 326.277 81.8122C325.559 87.1476 324.147 90.7229 321.435 93.435L322.849 94.8492C325.995 91.7035 327.512 87.6358 328.259 82.0787C329.002 76.5503 329 69.3998 329 60H327ZM327 40V60H329V40H327ZM321.435 6.56497C324.147 9.27713 325.559 12.8524 326.277 18.1878C326.998 23.552 327 30.5436 327 40H329C329 30.6002 329.002 23.4497 328.259 17.9213C327.512 12.3642 325.995 8.29646 322.849 5.15076L321.435 6.56497ZM288 1C297.456 1 304.448 1.00212 309.812 1.72332C315.148 2.44064 318.723 3.85281 321.435 6.56497L322.849 5.15076C319.704 2.00506 315.636 0.488292 310.079 -0.25885C304.55 -1.00212 297.4 -1 288 -1V1ZM189.992 1H288V-1H189.992V1ZM188.992 -0.00694413C188.958 4.90792 188.778 7.60788 187.975 9.81434L189.854 10.4984C190.793 7.9177 190.958 4.87452 190.992 0.00694413L188.992 -0.00694413ZM187.975 9.81434C186.256 14.5364 182.536 18.2561 177.814 19.9748L178.498 21.8542C183.776 19.9333 187.933 15.7759 189.854 10.4984L187.975 9.81434ZM177.814 19.9748C175.039 20.9848 171.536 21 164 21V23C171.362 23 175.308 23.0152 178.498 21.8542L177.814 19.9748ZM164 21C156.464 21 152.961 20.9848 150.186 19.9748L149.502 21.8542C152.692 23.0152 156.638 23 164 23V21ZM150.186 19.9748C145.464 18.2561 141.744 14.5364 140.025 9.81434L138.146 10.4984C140.067 15.7759 144.224 19.9333 149.502 21.8542L150.186 19.9748ZM140.025 9.81434C139.222 7.60788 139.042 4.90792 139.008 -0.00694413L137.008 0.00694413C137.042 4.87452 137.207 7.9177 138.146 10.4984L140.025 9.81434Z"
    mask="url(#path-1-inside-1_18299_4189)"
  />
</svg>`,s=n.JW`<svg class="input_mask" width="328" height="100" viewBox="0 0 328 100" fill="none">
  <mask id="path-1-inside-1_18299_4168">
    <path
      class="input_mask__border"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.85786 5.85786C0 11.7157 0 21.1438 0 40V60C0 78.8562 0 88.2843 5.85786 94.1421C11.7157 100 21.1438 100 40 100H138.008C138.042 95.1088 138.214 92.2372 139.086 89.8436C140.905 84.8438 144.844 80.9053 149.844 79.0855C152.826 78 156.551 78 164 78C171.449 78 175.174 78 178.156 79.0855C183.156 80.9053 187.095 84.8438 188.914 89.8436C189.786 92.2372 189.958 95.1088 189.992 100H288C306.856 100 316.284 100 322.142 94.1421C328 88.2843 328 78.8562 328 60V40C328 21.1438 328 11.7157 322.142 5.85786C316.284 0 306.856 0 288 0H40C21.1438 0 11.7157 0 5.85786 5.85786Z"
    />
  </mask>
  <path
    class="input_mask__background"
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M5.85786 5.85786C0 11.7157 0 21.1438 0 40V60C0 78.8562 0 88.2843 5.85786 94.1421C11.7157 100 21.1438 100 40 100H138.008C138.042 95.1088 138.214 92.2372 139.086 89.8436C140.905 84.8438 144.844 80.9053 149.844 79.0855C152.826 78 156.551 78 164 78C171.449 78 175.174 78 178.156 79.0855C183.156 80.9053 187.095 84.8438 188.914 89.8436C189.786 92.2372 189.958 95.1088 189.992 100H288C306.856 100 316.284 100 322.142 94.1421C328 88.2843 328 78.8562 328 60V40C328 21.1438 328 11.7157 322.142 5.85786C316.284 0 306.856 0 288 0H40C21.1438 0 11.7157 0 5.85786 5.85786Z"
  />
  <path
    class="input_mask__border"
    d="M138.008 100V101H139.001L139.008 100.007L138.008 100ZM139.086 89.8436L138.146 89.5016L139.086 89.8436ZM149.844 79.0855L150.186 80.0252L149.844 79.0855ZM178.156 79.0855L177.814 80.0252L178.156 79.0855ZM188.914 89.8436L189.854 89.5016L188.914 89.8436ZM189.992 100L188.992 100.007L188.999 101H189.992V100ZM322.142 94.1421L322.849 94.8492H322.849L322.142 94.1421ZM322.142 5.85786L322.849 5.15076L322.849 5.15076L322.142 5.85786ZM1 40C1 30.5436 1.00212 23.552 1.72332 18.1878C2.44064 12.8524 3.85281 9.27713 6.56497 6.56497L5.15076 5.15076C2.00506 8.29646 0.488292 12.3641 -0.25885 17.9213C-1.00212 23.4497 -1 30.6002 -1 40H1ZM1 60V40H-1V60H1ZM6.56497 93.435C3.85281 90.7229 2.44064 87.1476 1.72332 81.8122C1.00212 76.448 1 69.4564 1 60H-1C-1 69.3998 -1.00212 76.5503 -0.25885 82.0787C0.488292 87.6358 2.00506 91.7035 5.15076 94.8492L6.56497 93.435ZM40 99C30.5436 99 23.552 98.9979 18.1878 98.2767C12.8524 97.5594 9.27713 96.1472 6.56497 93.435L5.15076 94.8492C8.29646 97.9949 12.3641 99.5117 17.9213 100.259C23.4497 101.002 30.6002 101 40 101V99ZM138.008 99H40V101H138.008V99ZM139.008 100.007C139.042 95.0921 139.222 92.3921 140.025 90.1857L138.146 89.5016C137.207 92.0823 137.042 95.1255 137.008 99.9931L139.008 100.007ZM140.025 90.1857C141.744 85.4636 145.464 81.7439 150.186 80.0252L149.502 78.1458C144.224 80.0667 140.067 84.2241 138.146 89.5016L140.025 90.1857ZM150.186 80.0252C152.961 79.0152 156.464 79 164 79V77C156.638 77 152.692 76.9848 149.502 78.1458L150.186 80.0252ZM164 79C171.536 79 175.039 79.0152 177.814 80.0252L178.498 78.1458C175.308 76.9848 171.362 77 164 77V79ZM177.814 80.0252C182.536 81.7439 186.256 85.4636 187.975 90.1857L189.854 89.5016C187.933 84.2241 183.776 80.0667 178.498 78.1458L177.814 80.0252ZM187.975 90.1857C188.778 92.3921 188.958 95.0921 188.992 100.007L190.992 99.9931C190.958 95.1255 190.793 92.0823 189.854 89.5016L187.975 90.1857ZM288 99H189.992V101H288V99ZM321.435 93.435C318.723 96.1472 315.148 97.5594 309.812 98.2767C304.448 98.9979 297.456 99 288 99V101C297.4 101 304.55 101.002 310.079 100.259C315.636 99.5117 319.704 97.9949 322.849 94.8492L321.435 93.435ZM327 60C327 69.4564 326.998 76.448 326.277 81.8122C325.559 87.1476 324.147 90.7229 321.435 93.435L322.849 94.8492C325.995 91.7035 327.512 87.6358 328.259 82.0787C329.002 76.5503 329 69.3998 329 60H327ZM327 40V60H329V40H327ZM321.435 6.56497C324.147 9.27713 325.559 12.8524 326.277 18.1878C326.998 23.552 327 30.5436 327 40H329C329 30.6002 329.002 23.4497 328.259 17.9213C327.512 12.3642 325.995 8.29646 322.849 5.15076L321.435 6.56497ZM288 1C297.456 1 304.448 1.00212 309.812 1.72332C315.148 2.44064 318.723 3.85281 321.435 6.56497L322.849 5.15076C319.704 2.00506 315.636 0.488292 310.079 -0.25885C304.55 -1.00212 297.4 -1 288 -1V1ZM40 1H288V-1H40V1ZM6.56497 6.56497C9.27713 3.85281 12.8524 2.44064 18.1878 1.72332C23.552 1.00212 30.5436 1 40 1V-1C30.6002 -1 23.4497 -1.00212 17.9213 -0.25885C12.3641 0.488292 8.29646 2.00506 5.15076 5.15076L6.56497 6.56497Z"
    mask="url(#path-1-inside-1_18299_4168)"
  />
</svg>`;var o=r(8917);let a,c,l;function u(e,t){a=document.createElement("style"),c=document.createElement("style"),l=document.createElement("style"),a.textContent=f(e).core.cssText,c.textContent=f(e).dark.cssText,l.textContent=f(e).light.cssText,document.head.appendChild(a),document.head.appendChild(c),document.head.appendChild(l),h(t)}function h(e){c&&l&&("light"===e?(c.removeAttribute("media"),l.media="enabled"):(l.removeAttribute("media"),c.media="enabled"))}function d(e){a&&c&&l&&(a.textContent=f(e).core.cssText,c.textContent=f(e).dark.cssText,l.textContent=f(e).light.cssText)}function f(e){return{core:n.AH`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      :root {
        --w3m-modal-width: 360px;
        --w3m-color-mix-strength: ${(0,n.iz)(e?.["--w3m-color-mix-strength"]?`${e["--w3m-color-mix-strength"]}%`:"0%")};
        --w3m-font-family: ${(0,n.iz)(e?.["--w3m-font-family"]||"Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;")};
        --w3m-font-size-master: ${(0,n.iz)(e?.["--w3m-font-size-master"]||"10px")};
        --w3m-border-radius-master: ${(0,n.iz)(e?.["--w3m-border-radius-master"]||"4px")};
        --w3m-z-index: ${(0,n.iz)(e?.["--w3m-z-index"]||999)};

        --wui-font-family: var(--w3m-font-family);

        --wui-font-size-mini: calc(var(--w3m-font-size-master) * 0.8);
        --wui-font-size-micro: var(--w3m-font-size-master);
        --wui-font-size-tiny: calc(var(--w3m-font-size-master) * 1.2);
        --wui-font-size-small: calc(var(--w3m-font-size-master) * 1.4);
        --wui-font-size-paragraph: calc(var(--w3m-font-size-master) * 1.6);
        --wui-font-size-medium: calc(var(--w3m-font-size-master) * 1.8);
        --wui-font-size-large: calc(var(--w3m-font-size-master) * 2);
        --wui-font-size-medium-title: calc(var(--w3m-font-size-master) * 2.4);
        --wui-font-size-2xl: calc(var(--w3m-font-size-master) * 4);

        --wui-border-radius-5xs: var(--w3m-border-radius-master);
        --wui-border-radius-4xs: calc(var(--w3m-border-radius-master) * 1.5);
        --wui-border-radius-3xs: calc(var(--w3m-border-radius-master) * 2);
        --wui-border-radius-xxs: calc(var(--w3m-border-radius-master) * 3);
        --wui-border-radius-xs: calc(var(--w3m-border-radius-master) * 4);
        --wui-border-radius-s: calc(var(--w3m-border-radius-master) * 5);
        --wui-border-radius-m: calc(var(--w3m-border-radius-master) * 7);
        --wui-border-radius-l: calc(var(--w3m-border-radius-master) * 9);
        --wui-border-radius-3xl: calc(var(--w3m-border-radius-master) * 20);

        --wui-font-weight-light: 400;
        --wui-font-weight-regular: 500;
        --wui-font-weight-medium: 600;
        --wui-font-weight-bold: 700;

        --wui-letter-spacing-2xl: -1.6px;
        --wui-letter-spacing-medium-title: -0.96px;
        --wui-letter-spacing-large: -0.8px;
        --wui-letter-spacing-medium: -0.72px;
        --wui-letter-spacing-paragraph: -0.64px;
        --wui-letter-spacing-small: -0.56px;
        --wui-letter-spacing-tiny: -0.48px;
        --wui-letter-spacing-micro: -0.2px;
        --wui-letter-spacing-mini: -0.16px;

        --wui-spacing-0: 0px;
        --wui-spacing-4xs: 2px;
        --wui-spacing-3xs: 4px;
        --wui-spacing-xxs: 6px;
        --wui-spacing-2xs: 7px;
        --wui-spacing-xs: 8px;
        --wui-spacing-1xs: 10px;
        --wui-spacing-s: 12px;
        --wui-spacing-m: 14px;
        --wui-spacing-l: 16px;
        --wui-spacing-2l: 18px;
        --wui-spacing-xl: 20px;
        --wui-spacing-xxl: 24px;
        --wui-spacing-2xl: 32px;
        --wui-spacing-3xl: 40px;
        --wui-spacing-4xl: 90px;
        --wui-spacing-5xl: 95px;

        --wui-icon-box-size-xxs: 14px;
        --wui-icon-box-size-xs: 20px;
        --wui-icon-box-size-sm: 24px;
        --wui-icon-box-size-md: 32px;
        --wui-icon-box-size-lg: 40px;
        --wui-icon-box-size-xl: 64px;

        --wui-icon-size-inherit: inherit;
        --wui-icon-size-xxs: 10px;
        --wui-icon-size-xs: 12px;
        --wui-icon-size-sm: 14px;
        --wui-icon-size-md: 16px;
        --wui-icon-size-mdl: 18px;
        --wui-icon-size-lg: 20px;
        --wui-icon-size-xl: 24px;
        --wui-icon-size-xxl: 28px;

        --wui-wallet-image-size-inherit: inherit;
        --wui-wallet-image-size-sm: 40px;
        --wui-wallet-image-size-md: 56px;
        --wui-wallet-image-size-lg: 80px;

        --wui-visual-size-size-inherit: inherit;
        --wui-visual-size-sm: 40px;
        --wui-visual-size-md: 55px;
        --wui-visual-size-lg: 80px;

        --wui-box-size-md: 100px;
        --wui-box-size-lg: 120px;

        --wui-ease-out-power-2: cubic-bezier(0, 0, 0.22, 1);
        --wui-ease-out-power-1: cubic-bezier(0, 0, 0.55, 1);

        --wui-ease-in-power-3: cubic-bezier(0.66, 0, 1, 1);
        --wui-ease-in-power-2: cubic-bezier(0.45, 0, 1, 1);
        --wui-ease-in-power-1: cubic-bezier(0.3, 0, 1, 1);

        --wui-ease-inout-power-1: cubic-bezier(0.45, 0, 0.55, 1);

        --wui-duration-lg: 200ms;
        --wui-duration-md: 125ms;
        --wui-duration-sm: 75ms;

        --wui-path-network-sm: path(
          'M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z'
        );

        --wui-path-network-md: path(
          'M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z'
        );

        --wui-path-network-lg: path(
          'M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z'
        );

        --wui-width-network-sm: 36px;
        --wui-width-network-md: 48px;
        --wui-width-network-lg: 86px;

        --wui-height-network-sm: 40px;
        --wui-height-network-md: 54px;
        --wui-height-network-lg: 96px;

        --wui-icon-size-network-xs: 12px;
        --wui-icon-size-network-sm: 16px;
        --wui-icon-size-network-md: 24px;
        --wui-icon-size-network-lg: 42px;

        --wui-color-inherit: inherit;

        --wui-color-inverse-100: #fff;
        --wui-color-inverse-000: #000;

        --wui-cover: rgba(20, 20, 20, 0.8);

        --wui-color-modal-bg: var(--wui-color-modal-bg-base);

        --wui-color-accent-100: var(--wui-color-accent-base-100);
        --wui-color-accent-090: var(--wui-color-accent-base-090);
        --wui-color-accent-080: var(--wui-color-accent-base-080);

        --wui-color-success-100: var(--wui-color-success-base-100);

        --wui-color-error-100: var(--wui-color-error-base-100);

        --wui-icon-box-bg-error-100: var(--wui-icon-box-bg-error-base-100);
        --wui-icon-box-bg-blue-100: var(--wui-icon-box-bg-blue-base-100);
        --wui-icon-box-bg-success-100: var(--wui-icon-box-bg-success-base-100);
        --wui-icon-box-bg-inverse-100: var(--wui-icon-box-bg-inverse-base-100);

        --wui-all-wallets-bg-100: var(--wui-all-wallets-bg-100);

        --wui-avatar-border: var(--wui-avatar-border-base);

        --wui-thumbnail-border: var(--wui-thumbnail-border-base);

        --wui-box-shadow-blue: var(--wui-color-accent-glass-020);
      }

      @supports (background: color-mix(in srgb, white 50%, black)) {
        :root {
          --wui-color-modal-bg: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-modal-bg-base)
          );

          --wui-box-shadow-blue: color-mix(in srgb, var(--wui-color-accent-100) 20%, transparent);

          --wui-color-accent-100: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 100%,
            transparent
          );
          --wui-color-accent-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-color-accent-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );
          --wui-color-accent-glass-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-color-accent-glass-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );
          --wui-color-accent-glass-020: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 20%,
            transparent
          );
          --wui-color-accent-glass-015: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 15%,
            transparent
          );
          --wui-color-accent-glass-010: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 10%,
            transparent
          );
          --wui-color-accent-glass-005: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 5%,
            transparent
          );
          --wui-color-accent-002: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 2%,
            transparent
          );

          --wui-color-fg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-100)
          );
          --wui-color-fg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-125)
          );
          --wui-color-fg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-150)
          );
          --wui-color-fg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-175)
          );
          --wui-color-fg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-200)
          );
          --wui-color-fg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-225)
          );
          --wui-color-fg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-250)
          );
          --wui-color-fg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-275)
          );
          --wui-color-fg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-300)
          );

          --wui-color-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-100)
          );
          --wui-color-bg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-125)
          );
          --wui-color-bg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-150)
          );
          --wui-color-bg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-175)
          );
          --wui-color-bg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-200)
          );
          --wui-color-bg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-225)
          );
          --wui-color-bg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-250)
          );
          --wui-color-bg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-275)
          );
          --wui-color-bg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-300)
          );

          --wui-color-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-success-base-100)
          );
          --wui-color-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-error-base-100)
          );

          --wui-icon-box-bg-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-error-base-100)
          );
          --wui-icon-box-bg-accent-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-blue-base-100)
          );
          --wui-icon-box-bg-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-success-base-100)
          );
          --wui-icon-box-bg-inverse-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-inverse-base-100)
          );

          --wui-all-wallets-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-all-wallets-bg-100)
          );

          --wui-avatar-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-avatar-border-base)
          );

          --wui-thumbnail-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-thumbnail-border-base)
          );
        }
      }
    `,light:n.AH`
      :root {
        --w3m-color-mix: ${(0,n.iz)(e?.["--w3m-color-mix"]||"#fff")};
        --w3m-accent: ${(0,n.iz)((0,o.o_)(e,"dark")["--w3m-accent"])};
        --w3m-default: #fff;

        --wui-color-modal-bg-base: ${(0,n.iz)((0,o.o_)(e,"dark")["--w3m-background"])};
        --wui-color-accent-base-100: var(--w3m-accent);

        --wui-color-blueberry-100: hsla(230, 100%, 67%, 1);
        --wui-color-blueberry-090: hsla(231, 76%, 61%, 1);
        --wui-color-blueberry-080: hsla(230, 59%, 55%, 1);

        --wui-color-fg-100: #e4e7e7;
        --wui-color-fg-125: #d0d5d5;
        --wui-color-fg-150: #a8b1b1;
        --wui-color-fg-175: #a8b0b0;
        --wui-color-fg-200: #949e9e;
        --wui-color-fg-225: #868f8f;
        --wui-color-fg-250: #788080;
        --wui-color-fg-275: #788181;
        --wui-color-fg-300: #6e7777;

        --wui-color-bg-100: #141414;
        --wui-color-bg-125: #191a1a;
        --wui-color-bg-150: #1e1f1f;
        --wui-color-bg-175: #222525;
        --wui-color-bg-200: #272a2a;
        --wui-color-bg-225: #2c3030;
        --wui-color-bg-250: #313535;
        --wui-color-bg-275: #363b3b;
        --wui-color-bg-300: #3b4040;

        --wui-color-success-base-100: #26d962;
        --wui-color-error-base-100: #f25a67;

        --wui-color-success-glass-001: rgba(38, 217, 98, 0.01);
        --wui-color-success-glass-002: rgba(38, 217, 98, 0.02);
        --wui-color-success-glass-005: rgba(38, 217, 98, 0.05);
        --wui-color-success-glass-010: rgba(38, 217, 98, 0.1);
        --wui-color-success-glass-015: rgba(38, 217, 98, 0.15);
        --wui-color-success-glass-020: rgba(38, 217, 98, 0.2);
        --wui-color-success-glass-025: rgba(38, 217, 98, 0.25);
        --wui-color-success-glass-030: rgba(38, 217, 98, 0.3);
        --wui-color-success-glass-060: rgba(38, 217, 98, 0.6);
        --wui-color-success-glass-080: rgba(38, 217, 98, 0.8);

        --wui-color-error-glass-001: rgba(242, 90, 103, 0.01);
        --wui-color-error-glass-002: rgba(242, 90, 103, 0.02);
        --wui-color-error-glass-005: rgba(242, 90, 103, 0.05);
        --wui-color-error-glass-010: rgba(242, 90, 103, 0.1);
        --wui-color-error-glass-015: rgba(242, 90, 103, 0.15);
        --wui-color-error-glass-020: rgba(242, 90, 103, 0.2);
        --wui-color-error-glass-025: rgba(242, 90, 103, 0.25);
        --wui-color-error-glass-030: rgba(242, 90, 103, 0.3);
        --wui-color-error-glass-060: rgba(242, 90, 103, 0.6);
        --wui-color-error-glass-080: rgba(242, 90, 103, 0.8);

        --wui-color-gray-glass-001: rgba(255, 255, 255, 0.01);
        --wui-color-gray-glass-002: rgba(255, 255, 255, 0.02);
        --wui-color-gray-glass-005: rgba(255, 255, 255, 0.05);
        --wui-color-gray-glass-010: rgba(255, 255, 255, 0.1);
        --wui-color-gray-glass-015: rgba(255, 255, 255, 0.15);
        --wui-color-gray-glass-020: rgba(255, 255, 255, 0.2);
        --wui-color-gray-glass-025: rgba(255, 255, 255, 0.25);
        --wui-color-gray-glass-030: rgba(255, 255, 255, 0.3);
        --wui-color-gray-glass-060: rgba(255, 255, 255, 0.6);
        --wui-color-gray-glass-080: rgba(255, 255, 255, 0.8);
        --wui-color-gray-glass-090: rgba(255, 255, 255, 0.9);

        --wui-icon-box-bg-error-base-100: #3c2426;
        --wui-icon-box-bg-blue-base-100: #20303f;
        --wui-icon-box-bg-success-base-100: #1f3a28;
        --wui-icon-box-bg-inverse-base-100: #243240;

        --wui-all-wallets-bg-100: #222b35;

        --wui-avatar-border-base: #252525;

        --wui-thumbnail-border-base: #252525;
      }
    `,dark:n.AH`
      :root {
        --w3m-color-mix: ${(0,n.iz)(e?.["--w3m-color-mix"]||"#000")};
        --w3m-accent: ${(0,n.iz)((0,o.o_)(e,"light")["--w3m-accent"])};
        --w3m-default: #000;

        --wui-color-modal-bg-base: ${(0,n.iz)((0,o.o_)(e,"light")["--w3m-background"])};
        --wui-color-accent-base-100: var(--w3m-accent);

        --wui-color-blueberry-100: hsla(231, 100%, 70%, 1);
        --wui-color-blueberry-090: hsla(231, 97%, 72%, 1);
        --wui-color-blueberry-080: hsla(231, 92%, 74%, 1);

        --wui-color-fg-100: #141414;
        --wui-color-fg-125: #2d3131;
        --wui-color-fg-150: #474d4d;
        --wui-color-fg-175: #636d6d;
        --wui-color-fg-200: #798686;
        --wui-color-fg-225: #828f8f;
        --wui-color-fg-250: #8b9797;
        --wui-color-fg-275: #95a0a0;
        --wui-color-fg-300: #9ea9a9;

        --wui-color-bg-100: #ffffff;
        --wui-color-bg-125: #f5fafa;
        --wui-color-bg-150: #f3f8f8;
        --wui-color-bg-175: #eef4f4;
        --wui-color-bg-200: #eaf1f1;
        --wui-color-bg-225: #e5eded;
        --wui-color-bg-250: #e1e9e9;
        --wui-color-bg-275: #dce7e7;
        --wui-color-bg-300: #d8e3e3;

        --wui-color-success-base-100: #26b562;
        --wui-color-error-base-100: #f05142;

        --wui-color-success-glass-001: rgba(38, 181, 98, 0.01);
        --wui-color-success-glass-002: rgba(38, 181, 98, 0.02);
        --wui-color-success-glass-005: rgba(38, 181, 98, 0.05);
        --wui-color-success-glass-010: rgba(38, 181, 98, 0.1);
        --wui-color-success-glass-015: rgba(38, 181, 98, 0.15);
        --wui-color-success-glass-020: rgba(38, 181, 98, 0.2);
        --wui-color-success-glass-025: rgba(38, 181, 98, 0.25);
        --wui-color-success-glass-030: rgba(38, 181, 98, 0.3);
        --wui-color-success-glass-060: rgba(38, 181, 98, 0.6);
        --wui-color-success-glass-080: rgba(38, 181, 98, 0.8);

        --wui-color-error-glass-001: rgba(240, 81, 66, 0.01);
        --wui-color-error-glass-002: rgba(240, 81, 66, 0.02);
        --wui-color-error-glass-005: rgba(240, 81, 66, 0.05);
        --wui-color-error-glass-010: rgba(240, 81, 66, 0.1);
        --wui-color-error-glass-015: rgba(240, 81, 66, 0.15);
        --wui-color-error-glass-020: rgba(240, 81, 66, 0.2);
        --wui-color-error-glass-025: rgba(240, 81, 66, 0.25);
        --wui-color-error-glass-030: rgba(240, 81, 66, 0.3);
        --wui-color-error-glass-060: rgba(240, 81, 66, 0.6);
        --wui-color-error-glass-080: rgba(240, 81, 66, 0.8);

        --wui-icon-box-bg-error-base-100: #f4dfdd;
        --wui-icon-box-bg-blue-base-100: #d9ecfb;
        --wui-icon-box-bg-success-base-100: #daf0e4;
        --wui-icon-box-bg-inverse-base-100: #dcecfc;

        --wui-all-wallets-bg-100: #e8f1fa;

        --wui-avatar-border-base: #f3f4f4;

        --wui-thumbnail-border-base: #eaefef;

        --wui-color-gray-glass-001: rgba(0, 0, 0, 0.01);
        --wui-color-gray-glass-002: rgba(0, 0, 0, 0.02);
        --wui-color-gray-glass-005: rgba(0, 0, 0, 0.05);
        --wui-color-gray-glass-010: rgba(0, 0, 0, 0.1);
        --wui-color-gray-glass-015: rgba(0, 0, 0, 0.15);
        --wui-color-gray-glass-020: rgba(0, 0, 0, 0.2);
        --wui-color-gray-glass-025: rgba(0, 0, 0, 0.25);
        --wui-color-gray-glass-030: rgba(0, 0, 0, 0.3);
        --wui-color-gray-glass-060: rgba(0, 0, 0, 0.6);
        --wui-color-gray-glass-080: rgba(0, 0, 0, 0.8);
        --wui-color-gray-glass-090: rgba(0, 0, 0, 0.9);
      }
    `}}const p=n.AH`
  *,
  *::after,
  *::before,
  :host {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-style: normal;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    font-family: var(--wui-font-family);
    backface-visibility: hidden;
  }
`,g=n.AH`
  button,
  a {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, color;
    outline: none;
    border: none;
    column-gap: var(--wui-spacing-3xs);
    background-color: transparent;
    text-decoration: none;
  }

  button:disabled > wui-wallet-image,
  button:disabled > wui-all-wallets-image,
  button:disabled > wui-network-image,
  button:disabled > wui-image,
  button:disabled > wui-icon-box,
  button:disabled > wui-transaction-visual,
  button:disabled > wui-logo {
    filter: grayscale(1);
  }

  input {
    border: none;
    outline: none;
    appearance: none;
  }
`,m=n.AH`
  .wui-color-inherit {
    color: var(--wui-color-inherit);
  }

  .wui-color-accent-100 {
    color: var(--wui-color-accent-100);
  }

  .wui-color-error-100 {
    color: var(--wui-color-error-100);
  }

  .wui-color-success-100 {
    color: var(--wui-color-success-100);
  }

  .wui-color-inverse-100 {
    color: var(--wui-color-inverse-100);
  }

  .wui-color-inverse-000 {
    color: var(--wui-color-inverse-000);
  }

  .wui-color-fg-100 {
    color: var(--wui-color-fg-100);
  }

  .wui-color-fg-200 {
    color: var(--wui-color-fg-200);
  }

  .wui-color-fg-300 {
    color: var(--wui-color-fg-300);
  }

  .wui-bg-color-inherit {
    background-color: var(--wui-color-inherit);
  }

  .wui-bg-color-blue-100 {
    background-color: var(--wui-color-accent-100);
  }

  .wui-bg-color-error-100 {
    background-color: var(--wui-color-error-100);
  }

  .wui-bg-color-success-100 {
    background-color: var(--wui-color-success-100);
  }

  .wui-bg-color-inverse-100 {
    background-color: var(--wui-color-inverse-100);
  }

  .wui-bg-color-inverse-000 {
    background-color: var(--wui-color-inverse-000);
  }

  .wui-bg-color-fg-100 {
    background-color: var(--wui-color-fg-100);
  }

  .wui-bg-color-fg-200 {
    background-color: var(--wui-color-fg-200);
  }

  .wui-bg-color-fg-300 {
    background-color: var(--wui-color-fg-300);
  }
`;function y(e){return function(t){return"function"==typeof t?function(e,t){return customElements.get(e)||customElements.define(e,t),t}(e,t):function(e,t){const{kind:r,elements:n}=t;return{kind:r,elements:n,finisher(t){customElements.get(e)||customElements.define(e,t)}}}(e,t)}}const w=n.AH`
  :host {
    display: block;
    border-radius: clamp(0px, var(--wui-border-radius-l), 44px);
    box-shadow: 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-modal-bg);
    overflow: hidden;
  }
`;let b=class extends n.WF{render(){return n.qy`<slot></slot>`}};b.styles=[p,w],b=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([y("wui-card")],b);var v=r(5707);const A=n.AH`
  :host {
    display: flex;
    aspect-ratio: 1 / 1;
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }
`,E=n.JW`<svg
  width="14"
  height="14"
  viewBox="0 0 14 14"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill="currentColor"
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M7.0023 0.875C7.48571 0.875 7.8776 1.26675 7.8776 1.75V6.125H12.2541C12.7375 6.125 13.1294 6.51675 13.1294 7C13.1294 7.48325 12.7375 7.875 12.2541 7.875H7.8776V12.25C7.8776 12.7332 7.48571 13.125 7.0023 13.125C6.51889 13.125 6.12701 12.7332 6.12701 12.25V7.875H1.75054C1.26713 7.875 0.875244 7.48325 0.875244 7C0.875244 6.51675 1.26713 6.125 1.75054 6.125H6.12701V1.75C6.12701 1.26675 6.51889 0.875 7.0023 0.875Z"
    fill="#667dff"
  /></svg
>`,x=n.JW`<svg fill="none" viewBox="0 0 24 24">
  <path
    style="fill: var(--wui-color-accent-100);"
    d="M10.2 6.6a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0ZM21 6.6a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0ZM10.2 17.4a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0ZM21 17.4a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0Z"
  />
</svg>`,C=n.JW`<svg
  fill="none"
  viewBox="0 0 21 20"
>
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M10.5 2.42908C6.31875 2.42908 2.92859 5.81989 2.92859 10.0034C2.92859 14.1869 6.31875 17.5777 10.5 17.5777C14.6813 17.5777 18.0714 14.1869 18.0714 10.0034C18.0714 5.81989 14.6813 2.42908 10.5 2.42908ZM0.928589 10.0034C0.928589 4.71596 5.21355 0.429077 10.5 0.429077C15.7865 0.429077 20.0714 4.71596 20.0714 10.0034C20.0714 15.2908 15.7865 19.5777 10.5 19.5777C5.21355 19.5777 0.928589 15.2908 0.928589 10.0034ZM10.5 5.75003C11.0523 5.75003 11.5 6.19774 11.5 6.75003L11.5 10.8343L12.7929 9.54137C13.1834 9.15085 13.8166 9.15085 14.2071 9.54137C14.5976 9.9319 14.5976 10.5651 14.2071 10.9556L11.2071 13.9556C10.8166 14.3461 10.1834 14.3461 9.79291 13.9556L6.79291 10.9556C6.40239 10.5651 6.40239 9.9319 6.79291 9.54137C7.18343 9.15085 7.8166 9.15085 8.20712 9.54137L9.50002 10.8343L9.50002 6.75003C9.50002 6.19774 9.94773 5.75003 10.5 5.75003Z"
    clip-rule="evenodd"
  /></svg
>`,S=n.JW`
<svg width="36" height="36">
  <path
    d="M28.724 0H7.271A7.269 7.269 0 0 0 0 7.272v21.46A7.268 7.268 0 0 0 7.271 36H28.73A7.272 7.272 0 0 0 36 28.728V7.272A7.275 7.275 0 0 0 28.724 0Z"
    fill="url(#a)"
  />
  <path
    d="m17.845 8.271.729-1.26a1.64 1.64 0 1 1 2.843 1.638l-7.023 12.159h5.08c1.646 0 2.569 1.935 1.853 3.276H6.434a1.632 1.632 0 0 1-1.638-1.638c0-.909.73-1.638 1.638-1.638h4.176l5.345-9.265-1.67-2.898a1.642 1.642 0 0 1 2.844-1.638l.716 1.264Zm-6.317 17.5-1.575 2.732a1.64 1.64 0 1 1-2.844-1.638l1.17-2.025c1.323-.41 2.398-.095 3.249.931Zm13.56-4.954h4.262c.909 0 1.638.729 1.638 1.638 0 .909-.73 1.638-1.638 1.638h-2.367l1.597 2.772c.45.788.185 1.782-.602 2.241a1.642 1.642 0 0 1-2.241-.603c-2.69-4.666-4.711-8.159-6.052-10.485-1.372-2.367-.391-4.743.576-5.549 1.075 1.846 2.682 4.631 4.828 8.348Z"
    fill="#fff"
  />
  <defs>
    <linearGradient id="a" x1="18" y1="0" x2="18" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#18BFFB" />
      <stop offset="1" stop-color="#2072F3" />
    </linearGradient>
  </defs>
</svg>`,k=n.JW`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#000" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M28.77 23.3c-.69 1.99-2.75 5.52-4.87 5.56-1.4.03-1.86-.84-3.46-.84-1.61 0-2.12.81-3.45.86-2.25.1-5.72-5.1-5.72-9.62 0-4.15 2.9-6.2 5.42-6.25 1.36-.02 2.64.92 3.47.92.83 0 2.38-1.13 4.02-.97.68.03 2.6.28 3.84 2.08-3.27 2.14-2.76 6.61.75 8.25ZM24.2 7.88c-2.47.1-4.49 2.69-4.2 4.84 2.28.17 4.47-2.39 4.2-4.84Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`,_=n.JW`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M7 1.99a1 1 0 0 1 1 1v7.58l2.46-2.46a1 1 0 0 1 1.41 1.42L7.7 13.69a1 1 0 0 1-1.41 0L2.12 9.53A1 1 0 0 1 3.54 8.1L6 10.57V3a1 1 0 0 1 1-1Z"
    clip-rule="evenodd"
  />
</svg>`,I=n.JW`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M13 7.99a1 1 0 0 1-1 1H4.4l2.46 2.46a1 1 0 1 1-1.41 1.41L1.29 8.7a1 1 0 0 1 0-1.41L5.46 3.1a1 1 0 0 1 1.41 1.42L4.41 6.99H12a1 1 0 0 1 1 1Z"
    clip-rule="evenodd"
  />
</svg>`,M=n.JW`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M1 7.99a1 1 0 0 1 1-1h7.58L7.12 4.53A1 1 0 1 1 8.54 3.1l4.16 4.17a1 1 0 0 1 0 1.41l-4.16 4.17a1 1 0 1 1-1.42-1.41l2.46-2.46H2a1 1 0 0 1-1-1Z"
    clip-rule="evenodd"
  />
</svg>`,T=n.JW`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M7 13.99a1 1 0 0 1-1-1V5.4L3.54 7.86a1 1 0 0 1-1.42-1.41L6.3 2.28a1 1 0 0 1 1.41 0l4.17 4.17a1 1 0 1 1-1.41 1.41L8 5.4v7.59a1 1 0 0 1-1 1Z"
    clip-rule="evenodd"
  />
</svg>`,P=n.JW`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="12"
  height="13"
  viewBox="0 0 12 13"
  fill="none"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M5.61391 1.57124C5.85142 1.42873 6.14813 1.42873 6.38564 1.57124L11.0793 4.38749C11.9179 4.89067 11.5612 6.17864 10.5832 6.17864H9.96398V10.0358H10.2854C10.6996 10.0358 11.0354 10.3716 11.0354 10.7858C11.0354 11.2 10.6996 11.5358 10.2854 11.5358H1.71416C1.29995 11.5358 0.964172 11.2 0.964172 10.7858C0.964172 10.3716 1.29995 10.0358 1.71416 10.0358H2.03558L2.03558 6.17864H1.41637C0.438389 6.17864 0.0816547 4.89066 0.920263 4.38749L5.61391 1.57124ZM3.53554 6.17864V10.0358H5.24979V6.17864H3.53554ZM6.74976 6.17864V10.0358H8.46401V6.17864H6.74976ZM8.64913 4.67864H3.35043L5.99978 3.089L8.64913 4.67864Z"
    fill="currentColor"
  /></svg
>`,O=n.JW`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M4 6.4a1 1 0 0 1-.46.89 6.98 6.98 0 0 0 .38 6.18A7 7 0 0 0 16.46 7.3a1 1 0 0 1-.47-.92 7 7 0 0 0-12 .03Zm-2.02-.5a9 9 0 1 1 16.03 8.2A9 9 0 0 1 1.98 5.9Z"
    clip-rule="evenodd"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M6.03 8.63c-1.46-.3-2.72-.75-3.6-1.35l-.02-.01-.14-.11a1 1 0 0 1 1.2-1.6l.1.08c.6.4 1.52.74 2.69 1 .16-.99.39-1.88.67-2.65.3-.79.68-1.5 1.15-2.02A2.58 2.58 0 0 1 9.99 1c.8 0 1.45.44 1.92.97.47.52.84 1.23 1.14 2.02.29.77.52 1.66.68 2.64a8 8 0 0 0 2.7-1l.26-.18h.48a1 1 0 0 1 .12 2c-.86.51-2.01.91-3.34 1.18a22.24 22.24 0 0 1-.03 3.19c1.45.29 2.7.73 3.58 1.31a1 1 0 0 1-1.1 1.68c-.6-.4-1.56-.76-2.75-1-.15.8-.36 1.55-.6 2.2-.3.79-.67 1.5-1.14 2.02-.47.53-1.12.97-1.92.97-.8 0-1.45-.44-1.91-.97a6.51 6.51 0 0 1-1.15-2.02c-.24-.65-.44-1.4-.6-2.2-1.18.24-2.13.6-2.73.99a1 1 0 1 1-1.1-1.67c.88-.58 2.12-1.03 3.57-1.31a22.03 22.03 0 0 1-.04-3.2Zm2.2-1.7c.15-.86.34-1.61.58-2.24.24-.65.51-1.12.76-1.4.25-.28.4-.29.42-.29.03 0 .17.01.42.3.25.27.52.74.77 1.4.23.62.43 1.37.57 2.22a19.96 19.96 0 0 1-3.52 0Zm-.18 4.6a20.1 20.1 0 0 1-.03-2.62 21.95 21.95 0 0 0 3.94 0 20.4 20.4 0 0 1-.03 2.63 21.97 21.97 0 0 0-3.88 0Zm.27 2c.13.66.3 1.26.49 1.78.24.65.51 1.12.76 1.4.25.28.4.29.42.29.03 0 .17-.01.42-.3.25-.27.52-.74.77-1.4.19-.5.36-1.1.49-1.78a20.03 20.03 0 0 0-3.35 0Z"
    clip-rule="evenodd"
  />
</svg>`,R=n.JW`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="12"
  height="13"
  viewBox="0 0 12 13"
  fill="none"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M4.16072 2C4.17367 2 4.18665 2 4.19968 2L7.83857 2C8.36772 1.99998 8.82398 1.99996 9.19518 2.04018C9.5895 2.0829 9.97577 2.17811 10.3221 2.42971C10.5131 2.56849 10.6811 2.73647 10.8198 2.92749C11.0714 3.27379 11.1666 3.66007 11.2094 4.0544C11.2496 4.42561 11.2496 4.88188 11.2495 5.41105V7.58896C11.2496 8.11812 11.2496 8.57439 11.2094 8.94561C11.1666 9.33994 11.0714 9.72621 10.8198 10.0725C10.6811 10.2635 10.5131 10.4315 10.3221 10.5703C9.97577 10.8219 9.5895 10.9171 9.19518 10.9598C8.82398 11 8.36772 11 7.83856 11H4.16073C3.63157 11 3.17531 11 2.80411 10.9598C2.40979 10.9171 2.02352 10.8219 1.67722 10.5703C1.48621 10.4315 1.31824 10.2635 1.17946 10.0725C0.927858 9.72621 0.832652 9.33994 0.78993 8.94561C0.749713 8.5744 0.749733 8.11813 0.749757 7.58896L0.749758 5.45C0.749758 5.43697 0.749758 5.42399 0.749757 5.41104C0.749733 4.88188 0.749713 4.42561 0.78993 4.0544C0.832652 3.66007 0.927858 3.27379 1.17946 2.92749C1.31824 2.73647 1.48621 2.56849 1.67722 2.42971C2.02352 2.17811 2.40979 2.0829 2.80411 2.04018C3.17531 1.99996 3.63157 1.99998 4.16072 2ZM2.96567 3.53145C2.69897 3.56034 2.60687 3.60837 2.55888 3.64324C2.49521 3.6895 2.43922 3.74549 2.39296 3.80916C2.35809 3.85715 2.31007 3.94926 2.28117 4.21597C2.26629 4.35335 2.25844 4.51311 2.25431 4.70832H9.74498C9.74085 4.51311 9.733 4.35335 9.71812 4.21597C9.68922 3.94926 9.6412 3.85715 9.60633 3.80916C9.56007 3.74549 9.50408 3.6895 9.44041 3.64324C9.39242 3.60837 9.30031 3.56034 9.03362 3.53145C8.75288 3.50103 8.37876 3.5 7.79961 3.5H4.19968C3.62053 3.5 3.24641 3.50103 2.96567 3.53145ZM9.74956 6.20832H2.24973V7.55C2.24973 8.12917 2.25076 8.5033 2.28117 8.78404C2.31007 9.05074 2.35809 9.14285 2.39296 9.19084C2.43922 9.25451 2.49521 9.31051 2.55888 9.35677C2.60687 9.39163 2.69897 9.43966 2.96567 9.46856C3.24641 9.49897 3.62053 9.5 4.19968 9.5H7.79961C8.37876 9.5 8.75288 9.49897 9.03362 9.46856C9.30032 9.43966 9.39242 9.39163 9.44041 9.35677C9.50408 9.31051 9.56007 9.25451 9.60633 9.19084C9.6412 9.14285 9.68922 9.05075 9.71812 8.78404C9.74854 8.5033 9.74956 8.12917 9.74956 7.55V6.20832ZM6.74963 8C6.74963 7.58579 7.08541 7.25 7.49961 7.25H8.2496C8.6638 7.25 8.99958 7.58579 8.99958 8C8.99958 8.41422 8.6638 8.75 8.2496 8.75H7.49961C7.08541 8.75 6.74963 8.41422 6.74963 8Z"
    fill="currentColor"
  /></svg
>`,N=n.JW`<svg fill="none" viewBox="0 0 14 14">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M12.9576 2.23383C13.3807 2.58873 13.4361 3.21947 13.0812 3.64263L6.37159 11.6426C6.19161 11.8572 5.92989 11.9865 5.65009 11.999C5.3703 12.0115 5.09808 11.9062 4.89965 11.7085L0.979321 7.80331C0.588042 7.41354 0.586817 6.78038 0.976585 6.3891C1.36635 5.99782 1.99952 5.99659 2.3908 6.38636L5.53928 9.52268L11.5488 2.35742C11.9037 1.93426 12.5344 1.87893 12.9576 2.23383Z"
    clip-rule="evenodd"
  />
</svg>`,B=n.JW`<svg
  width="28"
  height="28"
  viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M25.5297 4.92733C26.1221 5.4242 26.1996 6.30724 25.7027 6.89966L12.2836 22.8997C12.0316 23.2001 11.6652 23.3811 11.2735 23.3986C10.8817 23.4161 10.5006 23.2686 10.2228 22.9919L2.38218 15.1815C1.83439 14.6358 1.83268 13.7494 2.37835 13.2016C2.92403 12.6538 3.81046 12.6521 4.35825 13.1978L11.1183 19.9317L23.5573 5.10036C24.0542 4.50794 24.9372 4.43047 25.5297 4.92733Z"
    fill="#26D962"/>
</svg>
`,U=n.JW`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M1.46 4.96a1 1 0 0 1 1.41 0L8 10.09l5.13-5.13a1 1 0 1 1 1.41 1.41l-5.83 5.84a1 1 0 0 1-1.42 0L1.46 6.37a1 1 0 0 1 0-1.41Z"
    clip-rule="evenodd"
  />
</svg>`,D=n.JW`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M11.04 1.46a1 1 0 0 1 0 1.41L5.91 8l5.13 5.13a1 1 0 1 1-1.41 1.41L3.79 8.71a1 1 0 0 1 0-1.42l5.84-5.83a1 1 0 0 1 1.41 0Z"
    clip-rule="evenodd"
  />
</svg>`,L=n.JW`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M4.96 14.54a1 1 0 0 1 0-1.41L10.09 8 4.96 2.87a1 1 0 0 1 1.41-1.41l5.84 5.83a1 1 0 0 1 0 1.42l-5.84 5.83a1 1 0 0 1-1.41 0Z"
    clip-rule="evenodd"
  />
</svg>`,F=n.JW`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M14.54 11.04a1 1 0 0 1-1.41 0L8 5.92l-5.13 5.12a1 1 0 1 1-1.41-1.41l5.83-5.84a1 1 0 0 1 1.42 0l5.83 5.84a1 1 0 0 1 0 1.41Z"
    clip-rule="evenodd"
  />
</svg>`,j=n.JW`<svg width="36" height="36" fill="none">
  <path
    fill="#fff"
    fill-opacity=".05"
    d="M0 14.94c0-5.55 0-8.326 1.182-10.4a9 9 0 0 1 3.359-3.358C6.614 0 9.389 0 14.94 0h6.12c5.55 0 8.326 0 10.4 1.182a9 9 0 0 1 3.358 3.359C36 6.614 36 9.389 36 14.94v6.12c0 5.55 0 8.326-1.182 10.4a9 9 0 0 1-3.359 3.358C29.386 36 26.611 36 21.06 36h-6.12c-5.55 0-8.326 0-10.4-1.182a9 9 0 0 1-3.358-3.359C0 29.386 0 26.611 0 21.06v-6.12Z"
  />
  <path
    stroke="#fff"
    stroke-opacity=".05"
    d="M14.94.5h6.12c2.785 0 4.84 0 6.46.146 1.612.144 2.743.43 3.691.97a8.5 8.5 0 0 1 3.172 3.173c.541.948.826 2.08.971 3.692.145 1.62.146 3.675.146 6.459v6.12c0 2.785 0 4.84-.146 6.46-.145 1.612-.43 2.743-.97 3.691a8.5 8.5 0 0 1-3.173 3.172c-.948.541-2.08.826-3.692.971-1.62.145-3.674.146-6.459.146h-6.12c-2.784 0-4.84 0-6.46-.146-1.612-.145-2.743-.43-3.691-.97a8.5 8.5 0 0 1-3.172-3.173c-.541-.948-.827-2.08-.971-3.692C.5 25.9.5 23.845.5 21.06v-6.12c0-2.784 0-4.84.146-6.46.144-1.612.43-2.743.97-3.691A8.5 8.5 0 0 1 4.79 1.617C5.737 1.076 6.869.79 8.48.646 10.1.5 12.156.5 14.94.5Z"
  />
  <path
    fill="url(#a)"
    d="M17.998 10.8h12.469a14.397 14.397 0 0 0-24.938.001l6.234 10.798.006-.001a7.19 7.19 0 0 1 6.23-10.799Z"
  />
  <path
    fill="url(#b)"
    d="m24.237 21.598-6.234 10.798A14.397 14.397 0 0 0 30.47 10.798H18.002l-.002.006a7.191 7.191 0 0 1 6.237 10.794Z"
  />
  <path
    fill="url(#c)"
    d="M11.765 21.601 5.531 10.803A14.396 14.396 0 0 0 18.001 32.4l6.235-10.798-.004-.004a7.19 7.19 0 0 1-12.466.004Z"
  />
  <path fill="#fff" d="M18 25.2a7.2 7.2 0 1 0 0-14.4 7.2 7.2 0 0 0 0 14.4Z" />
  <path fill="#1A73E8" d="M18 23.7a5.7 5.7 0 1 0 0-11.4 5.7 5.7 0 0 0 0 11.4Z" />
  <defs>
    <linearGradient
      id="a"
      x1="6.294"
      x2="41.1"
      y1="5.995"
      y2="5.995"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#D93025" />
      <stop offset="1" stop-color="#EA4335" />
    </linearGradient>
    <linearGradient
      id="b"
      x1="20.953"
      x2="37.194"
      y1="32.143"
      y2="2.701"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FCC934" />
      <stop offset="1" stop-color="#FBBC04" />
    </linearGradient>
    <linearGradient
      id="c"
      x1="25.873"
      x2="9.632"
      y1="31.2"
      y2="1.759"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#1E8E3E" />
      <stop offset="1" stop-color="#34A853" />
    </linearGradient>
  </defs>
</svg>`,H=n.JW`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M7 2.99a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-7 5a7 7 0 1 1 14 0 7 7 0 0 1-14 0Zm7-4a1 1 0 0 1 1 1v2.58l1.85 1.85a1 1 0 0 1-1.41 1.42L6.29 8.69A1 1 0 0 1 6 8v-3a1 1 0 0 1 1-1Z"
    clip-rule="evenodd"
  />
</svg>`,z=n.JW`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M2.54 2.54a1 1 0 0 1 1.42 0L8 6.6l4.04-4.05a1 1 0 1 1 1.42 1.42L9.4 8l4.05 4.04a1 1 0 0 1-1.42 1.42L8 9.4l-4.04 4.05a1 1 0 0 1-1.42-1.42L6.6 8 2.54 3.96a1 1 0 0 1 0-1.42Z"
    clip-rule="evenodd"
  />
</svg>`,q=n.JW`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M10 3a7 7 0 0 0-6.85 8.44l8.29-8.3C10.97 3.06 10.49 3 10 3Zm3.49.93-9.56 9.56c.32.55.71 1.06 1.16 1.5L15 5.1a7.03 7.03 0 0 0-1.5-1.16Zm2.7 2.8-9.46 9.46a7 7 0 0 0 9.46-9.46ZM1.99 5.9A9 9 0 1 1 18 14.09 9 9 0 0 1 1.98 5.91Z"
    clip-rule="evenodd"
  />
</svg>`,$=n.JW`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm10.66-2.65a1 1 0 0 1 .23 1.06L9.83 9.24a1 1 0 0 1-.59.58l-2.83 1.06A1 1 0 0 1 5.13 9.6l1.06-2.82a1 1 0 0 1 .58-.59L9.6 5.12a1 1 0 0 1 1.06.23ZM7.9 7.89l-.13.35.35-.13.12-.35-.34.13Z"
    clip-rule="evenodd"
  />
</svg>`,W=n.JW`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
>
  <path
    fill="currentColor"
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M9.21498 1.28565H10.5944C11.1458 1.28562 11.6246 1.2856 12.0182 1.32093C12.4353 1.35836 12.853 1.44155 13.2486 1.66724C13.7005 1.92498 14.0749 2.29935 14.3326 2.75122C14.5583 3.14689 14.6415 3.56456 14.6789 3.9817C14.7143 4.37531 14.7142 4.85403 14.7142 5.40545V6.78489C14.7142 7.33631 14.7143 7.81503 14.6789 8.20865C14.6415 8.62578 14.5583 9.04345 14.3326 9.43912C14.0749 9.89099 13.7005 10.2654 13.2486 10.5231C12.853 10.7488 12.4353 10.832 12.0182 10.8694C11.7003 10.8979 11.3269 10.9034 10.9045 10.9045C10.9034 11.3269 10.8979 11.7003 10.8694 12.0182C10.832 12.4353 10.7488 12.853 10.5231 13.2486C10.2654 13.7005 9.89099 14.0749 9.43912 14.3326C9.04345 14.5583 8.62578 14.6415 8.20865 14.6789C7.81503 14.7143 7.33631 14.7142 6.78489 14.7142H5.40545C4.85403 14.7142 4.37531 14.7143 3.9817 14.6789C3.56456 14.6415 3.14689 14.5583 2.75122 14.3326C2.29935 14.0749 1.92498 13.7005 1.66724 13.2486C1.44155 12.853 1.35836 12.4353 1.32093 12.0182C1.2856 11.6246 1.28562 11.1458 1.28565 10.5944V9.21498C1.28562 8.66356 1.2856 8.18484 1.32093 7.79122C1.35836 7.37409 1.44155 6.95642 1.66724 6.56074C1.92498 6.10887 2.29935 5.73451 2.75122 5.47677C3.14689 5.25108 3.56456 5.16789 3.9817 5.13045C4.2996 5.10192 4.67301 5.09645 5.09541 5.09541C5.09645 4.67302 5.10192 4.2996 5.13045 3.9817C5.16789 3.56456 5.25108 3.14689 5.47676 2.75122C5.73451 2.29935 6.10887 1.92498 6.56074 1.66724C6.95642 1.44155 7.37409 1.35836 7.79122 1.32093C8.18484 1.2856 8.66356 1.28562 9.21498 1.28565ZM5.09541 7.09552C4.68397 7.09667 4.39263 7.10161 4.16046 7.12245C3.88053 7.14757 3.78516 7.18949 3.74214 7.21403C3.60139 7.29431 3.48478 7.41091 3.4045 7.55166C3.37997 7.59468 3.33804 7.69005 3.31292 7.96999C3.28659 8.26345 3.28565 8.65147 3.28565 9.25708V10.5523C3.28565 11.1579 3.28659 11.5459 3.31292 11.8394C3.33804 12.1193 3.37997 12.2147 3.4045 12.2577C3.48478 12.3985 3.60139 12.5151 3.74214 12.5954C3.78516 12.6199 3.88053 12.6618 4.16046 12.6869C4.45393 12.7133 4.84195 12.7142 5.44755 12.7142H6.74279C7.3484 12.7142 7.73641 12.7133 8.02988 12.6869C8.30981 12.6618 8.40518 12.6199 8.44821 12.5954C8.58895 12.5151 8.70556 12.3985 8.78584 12.2577C8.81038 12.2147 8.8523 12.1193 8.87742 11.8394C8.89825 11.6072 8.90319 11.3159 8.90435 10.9045C8.48219 10.9034 8.10898 10.8979 7.79122 10.8694C7.37409 10.832 6.95641 10.7488 6.56074 10.5231C6.10887 10.2654 5.73451 9.89099 5.47676 9.43912C5.25108 9.04345 5.16789 8.62578 5.13045 8.20865C5.10194 7.89089 5.09645 7.51767 5.09541 7.09552ZM7.96999 3.31292C7.69005 3.33804 7.59468 3.37997 7.55166 3.4045C7.41091 3.48478 7.29431 3.60139 7.21403 3.74214C7.18949 3.78516 7.14757 3.88053 7.12245 4.16046C7.09611 4.45393 7.09517 4.84195 7.09517 5.44755V6.74279C7.09517 7.3484 7.09611 7.73641 7.12245 8.02988C7.14757 8.30981 7.18949 8.40518 7.21403 8.4482C7.29431 8.58895 7.41091 8.70556 7.55166 8.78584C7.59468 8.81038 7.69005 8.8523 7.96999 8.87742C8.26345 8.90376 8.65147 8.9047 9.25708 8.9047H10.5523C11.1579 8.9047 11.5459 8.90376 11.8394 8.87742C12.1193 8.8523 12.2147 8.81038 12.2577 8.78584C12.3985 8.70556 12.5151 8.58895 12.5954 8.4482C12.6199 8.40518 12.6618 8.30981 12.6869 8.02988C12.7133 7.73641 12.7142 7.3484 12.7142 6.74279V5.44755C12.7142 4.84195 12.7133 4.45393 12.6869 4.16046C12.6618 3.88053 12.6199 3.78516 12.5954 3.74214C12.5151 3.60139 12.3985 3.48478 12.2577 3.4045C12.2147 3.37997 12.1193 3.33804 11.8394 3.31292C11.5459 3.28659 11.1579 3.28565 10.5523 3.28565H9.25708C8.65147 3.28565 8.26345 3.28659 7.96999 3.31292Z"
    fill="#788181"
  /></svg
>`,G=n.JW` <svg fill="none" viewBox="0 0 13 4">
  <path fill="currentColor" d="M.5 0h12L8.9 3.13a3.76 3.76 0 0 1-4.8 0L.5 0Z" />
</svg>`,V=n.JW`<svg fill="none" viewBox="0 0 14 6">
  <path style="fill: var(--wui-color-bg-150);" d="M0 1h14L9.21 5.12a3.31 3.31 0 0 1-4.49 0L0 1Z" />
  <path
    style="stroke: var(--wui-color-inverse-100);"
    stroke-opacity=".05"
    d="M1.33 1.5h11.32L8.88 4.75l-.01.01a2.81 2.81 0 0 1-3.8 0l-.02-.01L1.33 1.5Z"
  />
  <path
    style="fill: var(--wui-color-bg-150);"
    d="M1.25.71h11.5L9.21 3.88a3.31 3.31 0 0 1-4.49 0L1.25.71Z"
  />
</svg> `,K=n.JW`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M13.66 2H6.34c-1.07 0-1.96 0-2.68.08-.74.08-1.42.25-2.01.68a4 4 0 0 0-.89.89c-.43.6-.6 1.27-.68 2.01C0 6.38 0 7.26 0 8.34v.89c0 1.07 0 1.96.08 2.68.08.74.25 1.42.68 2.01a4 4 0 0 0 .89.89c.6.43 1.27.6 2.01.68a27 27 0 0 0 2.68.08h7.32a27 27 0 0 0 2.68-.08 4.03 4.03 0 0 0 2.01-.68 4 4 0 0 0 .89-.89c.43-.6.6-1.27.68-2.01.08-.72.08-1.6.08-2.68v-.89c0-1.07 0-1.96-.08-2.68a4.04 4.04 0 0 0-.68-2.01 4 4 0 0 0-.89-.89c-.6-.43-1.27-.6-2.01-.68C15.62 2 14.74 2 13.66 2ZM2.82 4.38c.2-.14.48-.25 1.06-.31C4.48 4 5.25 4 6.4 4h7.2c1.15 0 1.93 0 2.52.07.58.06.86.17 1.06.31a2 2 0 0 1 .44.44c.14.2.25.48.31 1.06.07.6.07 1.37.07 2.52v.77c0 1.15 0 1.93-.07 2.52-.06.58-.17.86-.31 1.06a2 2 0 0 1-.44.44c-.2.14-.48.25-1.06.32-.6.06-1.37.06-2.52.06H6.4c-1.15 0-1.93 0-2.52-.06-.58-.07-.86-.18-1.06-.32a2 2 0 0 1-.44-.44c-.14-.2-.25-.48-.31-1.06C2 11.1 2 10.32 2 9.17V8.4c0-1.15 0-1.93.07-2.52.06-.58.17-.86.31-1.06a2 2 0 0 1 .44-.44Z"
    clip-rule="evenodd"
  />
  <path fill="currentColor" d="M6.14 17.57a1 1 0 1 0 0 2h7.72a1 1 0 1 0 0-2H6.14Z" />
</svg>`,Z=n.JW`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M6.07 1h.57a1 1 0 0 1 0 2h-.52c-.98 0-1.64 0-2.14.06-.48.05-.7.14-.84.24-.13.1-.25.22-.34.35-.1.14-.2.35-.25.83-.05.5-.05 1.16-.05 2.15v2.74c0 .99 0 1.65.05 2.15.05.48.14.7.25.83.1.14.2.25.34.35.14.1.36.2.84.25.5.05 1.16.05 2.14.05h.52a1 1 0 0 1 0 2h-.57c-.92 0-1.69 0-2.3-.07a3.6 3.6 0 0 1-1.8-.61c-.3-.22-.57-.49-.8-.8a3.6 3.6 0 0 1-.6-1.79C.5 11.11.5 10.35.5 9.43V6.58c0-.92 0-1.7.06-2.31a3.6 3.6 0 0 1 .62-1.8c.22-.3.48-.57.79-.79a3.6 3.6 0 0 1 1.8-.61C4.37 1 5.14 1 6.06 1ZM9.5 3a1 1 0 0 1 1.42 0l4.28 4.3a1 1 0 0 1 0 1.4L10.93 13a1 1 0 0 1-1.42-1.42L12.1 9H6.8a1 1 0 1 1 0-2h5.3L9.51 4.42a1 1 0 0 1 0-1.41Z"
    clip-rule="evenodd"
  />
</svg>`,Q=n.JW`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#5865F2" />
      <path
        fill="#fff"
        fill-rule="evenodd"
        d="M25.71 28.15C30.25 28 32 25.02 32 25.02c0-6.61-2.96-11.98-2.96-11.98-2.96-2.22-5.77-2.15-5.77-2.15l-.29.32c3.5 1.07 5.12 2.61 5.12 2.61a16.75 16.75 0 0 0-10.34-1.93l-.35.04a15.43 15.43 0 0 0-5.88 1.9s1.71-1.63 5.4-2.7l-.2-.24s-2.81-.07-5.77 2.15c0 0-2.96 5.37-2.96 11.98 0 0 1.73 2.98 6.27 3.13l1.37-1.7c-2.6-.79-3.6-2.43-3.6-2.43l.58.35.09.06.08.04.02.01.08.05a17.25 17.25 0 0 0 4.52 1.58 14.4 14.4 0 0 0 8.3-.86c.72-.27 1.52-.66 2.37-1.21 0 0-1.03 1.68-3.72 2.44.61.78 1.35 1.67 1.35 1.67Zm-9.55-9.6c-1.17 0-2.1 1.03-2.1 2.28 0 1.25.95 2.28 2.1 2.28 1.17 0 2.1-1.03 2.1-2.28.01-1.25-.93-2.28-2.1-2.28Zm7.5 0c-1.17 0-2.1 1.03-2.1 2.28 0 1.25.95 2.28 2.1 2.28 1.17 0 2.1-1.03 2.1-2.28 0-1.25-.93-2.28-2.1-2.28Z"
        clip-rule="evenodd"
      />
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
  </defs>
</svg>`,J=n.JW`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    d="M4.25 7a.63.63 0 0 0-.63.63v3.97c0 .28-.2.51-.47.54l-.75.07a.93.93 0 0 1-.9-.47A7.51 7.51 0 0 1 5.54.92a7.5 7.5 0 0 1 9.54 4.62c.12.35.06.72-.16 1-.74.97-1.68 1.78-2.6 2.44V4.44a.64.64 0 0 0-.63-.64h-1.06c-.35 0-.63.3-.63.64v5.5c0 .23-.12.42-.32.5l-.52.23V6.05c0-.36-.3-.64-.64-.64H7.45c-.35 0-.64.3-.64.64v4.97c0 .25-.17.46-.4.52a5.8 5.8 0 0 0-.45.11v-4c0-.36-.3-.65-.64-.65H4.25ZM14.07 12.4A7.49 7.49 0 0 1 3.6 14.08c4.09-.58 9.14-2.5 11.87-6.6v.03a7.56 7.56 0 0 1-1.41 4.91Z"
  />
</svg>`,Y=n.JW`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M6.71 2.99a.57.57 0 0 0-.57.57 1 1 0 0 1-1 1c-.58 0-.96 0-1.24.03-.27.03-.37.07-.42.1a.97.97 0 0 0-.36.35c-.04.08-.09.21-.11.67a2.57 2.57 0 0 1 0 5.13c.02.45.07.6.11.66.09.15.21.28.36.36.07.04.21.1.67.12a2.57 2.57 0 0 1 5.12 0c.46-.03.6-.08.67-.12a.97.97 0 0 0 .36-.36c.03-.04.07-.14.1-.41.02-.29.03-.66.03-1.24a1 1 0 0 1 1-1 .57.57 0 0 0 0-1.15 1 1 0 0 1-1-1c0-.58 0-.95-.03-1.24a1.04 1.04 0 0 0-.1-.42.97.97 0 0 0-.36-.36 1.04 1.04 0 0 0-.42-.1c-.28-.02-.65-.02-1.24-.02a1 1 0 0 1-1-1 .57.57 0 0 0-.57-.57ZM5.15 13.98a1 1 0 0 0 .99-1v-.78a.57.57 0 0 1 1.14 0v.78a1 1 0 0 0 .99 1H8.36a66.26 66.26 0 0 0 .73 0 3.78 3.78 0 0 0 1.84-.38c.46-.26.85-.64 1.1-1.1.23-.4.32-.8.36-1.22.02-.2.03-.4.03-.63a2.57 2.57 0 0 0 0-4.75c0-.23-.01-.44-.03-.63a2.96 2.96 0 0 0-.35-1.22 2.97 2.97 0 0 0-1.1-1.1c-.4-.22-.8-.31-1.22-.35a8.7 8.7 0 0 0-.64-.04 2.57 2.57 0 0 0-4.74 0c-.23 0-.44.02-.63.04-.42.04-.83.13-1.22.35-.46.26-.84.64-1.1 1.1-.33.57-.37 1.2-.39 1.84a21.39 21.39 0 0 0 0 .72v.1a1 1 0 0 0 1 .99h.78a.57.57 0 0 1 0 1.15h-.77a1 1 0 0 0-1 .98v.1a63.87 63.87 0 0 0 0 .73c0 .64.05 1.27.38 1.83.26.47.64.85 1.1 1.11.56.32 1.2.37 1.84.38a20.93 20.93 0 0 0 .72 0h.1Z"
    clip-rule="evenodd"
  />
</svg>`,X=n.JW`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3.74 3.99a1 1 0 0 1 1-1H11a1 1 0 0 1 1 1v6.26a1 1 0 0 1-2 0V6.4l-6.3 6.3a1 1 0 0 1-1.4-1.42l6.29-6.3H4.74a1 1 0 0 1-1-1Z"
    clip-rule="evenodd"
  />
</svg>`,ee=n.JW`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#1877F2" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M26 12.38h-2.89c-.92 0-1.61.38-1.61 1.34v1.66H26l-.36 4.5H21.5v12H17v-12h-3v-4.5h3V12.5c0-3.03 1.6-4.62 5.2-4.62H26v4.5Z"
        />
      </g>
    </g>
    <path
      fill="#1877F2"
      d="M40 20a20 20 0 1 0-23.13 19.76V25.78H11.8V20h5.07v-4.4c0-5.02 3-7.79 7.56-7.79 2.19 0 4.48.4 4.48.4v4.91h-2.53c-2.48 0-3.25 1.55-3.25 3.13V20h5.54l-.88 5.78h-4.66v13.98A20 20 0 0 0 40 20Z"
    />
    <path
      fill="#fff"
      d="m27.79 25.78.88-5.78h-5.55v-3.75c0-1.58.78-3.13 3.26-3.13h2.53V8.2s-2.3-.39-4.48-.39c-4.57 0-7.55 2.77-7.55 7.78V20H11.8v5.78h5.07v13.98a20.15 20.15 0 0 0 6.25 0V25.78h4.67Z"
    />
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`,te=n.JW`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M0 3a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1Zm2.63 5.25a1 1 0 0 1 1-1h8.75a1 1 0 1 1 0 2H3.63a1 1 0 0 1-1-1Zm2.62 5.25a1 1 0 0 1 1-1h3.5a1 1 0 0 1 0 2h-3.5a1 1 0 0 1-1-1Z"
    clip-rule="evenodd"
  />
</svg>`,re=n.JW`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#1B1F23" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M8 19.89a12 12 0 1 1 15.8 11.38c-.6.12-.8-.26-.8-.57v-3.3c0-1.12-.4-1.85-.82-2.22 2.67-.3 5.48-1.31 5.48-5.92 0-1.31-.47-2.38-1.24-3.22.13-.3.54-1.52-.12-3.18 0 0-1-.32-3.3 1.23a11.54 11.54 0 0 0-6 0c-2.3-1.55-3.3-1.23-3.3-1.23a4.32 4.32 0 0 0-.12 3.18 4.64 4.64 0 0 0-1.24 3.22c0 4.6 2.8 5.63 5.47 5.93-.34.3-.65.83-.76 1.6-.69.31-2.42.84-3.5-1 0 0-.63-1.15-1.83-1.23 0 0-1.18-.02-.09.73 0 0 .8.37 1.34 1.76 0 0 .7 2.14 4.03 1.41v2.24c0 .31-.2.68-.8.57A12 12 0 0 1 8 19.9Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`,ne=n.JW`<svg fill="none" viewBox="0 0 40 40">
  <path
    fill="#4285F4"
    d="M32.74 20.3c0-.93-.08-1.81-.24-2.66H20.26v5.03h7a6 6 0 0 1-2.62 3.91v3.28h4.22c2.46-2.27 3.88-5.6 3.88-9.56Z"
  />
  <path
    fill="#34A853"
    d="M20.26 33a12.4 12.4 0 0 0 8.6-3.14l-4.22-3.28a7.74 7.74 0 0 1-4.38 1.26 7.76 7.76 0 0 1-7.28-5.36H8.65v3.36A12.99 12.99 0 0 0 20.26 33Z"
  />
  <path
    fill="#FBBC05"
    d="M12.98 22.47a7.79 7.79 0 0 1 0-4.94v-3.36H8.65a12.84 12.84 0 0 0 0 11.66l3.37-2.63.96-.73Z"
  />
  <path
    fill="#EA4335"
    d="M20.26 12.18a7.1 7.1 0 0 1 4.98 1.93l3.72-3.72A12.47 12.47 0 0 0 20.26 7c-5.08 0-9.47 2.92-11.6 7.17l4.32 3.36a7.76 7.76 0 0 1 7.28-5.35Z"
  />
</svg>`,ie=n.JW`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    d="M8.51 5.66a.83.83 0 0 0-.57-.2.83.83 0 0 0-.52.28.8.8 0 0 0-.25.52 1 1 0 0 1-2 0c0-.75.34-1.43.81-1.91a2.75 2.75 0 0 1 4.78 1.92c0 1.24-.8 1.86-1.25 2.2l-.04.03c-.47.36-.5.43-.5.65a1 1 0 1 1-2 0c0-1.25.8-1.86 1.24-2.2l.04-.04c.47-.36.5-.43.5-.65 0-.3-.1-.49-.24-.6ZM9.12 11.87a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0Z"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6a6 6 0 1 0 0 12A6 6 0 0 0 8 2Z"
    clip-rule="evenodd"
  />
</svg>`,se=n.JW`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    d="M6 10.49a1 1 0 1 0 2 0v-2a1 1 0 0 0-2 0v2ZM7 4.49a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M7 14.99a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-7a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
    clip-rule="evenodd"
  />
</svg>`,oe=n.JW`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M4.83 1.34h6.34c.68 0 1.26 0 1.73.04.5.05.97.15 1.42.4.52.3.95.72 1.24 1.24.26.45.35.92.4 1.42.04.47.04 1.05.04 1.73v3.71c0 .69 0 1.26-.04 1.74-.05.5-.14.97-.4 1.41-.3.52-.72.95-1.24 1.25-.45.25-.92.35-1.42.4-.47.03-1.05.03-1.73.03H4.83c-.68 0-1.26 0-1.73-.04-.5-.04-.97-.14-1.42-.4-.52-.29-.95-.72-1.24-1.24a3.39 3.39 0 0 1-.4-1.41A20.9 20.9 0 0 1 0 9.88v-3.7c0-.7 0-1.27.04-1.74.05-.5.14-.97.4-1.42.3-.52.72-.95 1.24-1.24.45-.25.92-.35 1.42-.4.47-.04 1.05-.04 1.73-.04ZM3.28 3.38c-.36.03-.51.08-.6.14-.21.11-.39.29-.5.5a.8.8 0 0 0-.08.19l5.16 3.44c.45.3 1.03.3 1.48 0L13.9 4.2a.79.79 0 0 0-.08-.2c-.11-.2-.29-.38-.5-.5-.09-.05-.24-.1-.6-.13-.37-.04-.86-.04-1.6-.04H4.88c-.73 0-1.22 0-1.6.04ZM14 6.54 9.85 9.31a3.33 3.33 0 0 1-3.7 0L2 6.54v3.3c0 .74 0 1.22.03 1.6.04.36.1.5.15.6.11.2.29.38.5.5.09.05.24.1.6.14.37.03.86.03 1.6.03h6.25c.73 0 1.22 0 1.6-.03.35-.03.5-.09.6-.14.2-.12.38-.3.5-.5.05-.1.1-.24.14-.6.03-.38.03-.86.03-1.6v-3.3Z"
    clip-rule="evenodd"
  />
</svg>`,ae=n.JW`<svg fill="none" viewBox="0 0 20 20">
  <path fill="currentColor" d="M10.81 5.81a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3 4.75A4.75 4.75 0 0 1 7.75 0h4.5A4.75 4.75 0 0 1 17 4.75v10.5A4.75 4.75 0 0 1 12.25 20h-4.5A4.75 4.75 0 0 1 3 15.25V4.75ZM7.75 2A2.75 2.75 0 0 0 5 4.75v10.5A2.75 2.75 0 0 0 7.75 18h4.5A2.75 2.75 0 0 0 15 15.25V4.75A2.75 2.75 0 0 0 12.25 2h-4.5Z"
    clip-rule="evenodd"
  />
</svg>`,ce=n.JW`<svg fill="none" viewBox="0 0 41 40">
  <path
    style="fill: var(--wui-color-fg-100);"
    fill-opacity=".05"
    d="M.6 20a20 20 0 1 1 40 0 20 20 0 0 1-40 0Z"
  />
  <path
    fill="#949E9E"
    d="M15.6 20.31a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM23.1 20.31a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM28.1 22.81a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
  />
</svg>`,le=n.JW`<svg fill="none" viewBox="0 0 22 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M16.32 13.62a3.14 3.14 0 1 1-.99 1.72l-1.6-.93a3.83 3.83 0 0 1-3.71 1 3.66 3.66 0 0 1-1.74-1l-1.6.94a3.14 3.14 0 1 1-1-1.73l1.6-.94a3.7 3.7 0 0 1 0-2 3.81 3.81 0 0 1 1.8-2.33c.29-.17.6-.3.92-.38V6.1a3.14 3.14 0 1 1 2 0l-.01.02v1.85H12a3.82 3.82 0 0 1 2.33 1.8 3.7 3.7 0 0 1 .39 2.91l1.6.93ZM2.6 16.54a1.14 1.14 0 0 0 1.98-1.14 1.14 1.14 0 0 0-1.98 1.14ZM11 2.01a1.14 1.14 0 1 0 0 2.28 1.14 1.14 0 0 0 0-2.28Zm1.68 10.45c.08-.19.14-.38.16-.58v-.05l.02-.13v-.13a1.92 1.92 0 0 0-.24-.8l-.11-.15a1.89 1.89 0 0 0-.74-.6 1.86 1.86 0 0 0-.77-.17h-.19a1.97 1.97 0 0 0-.89.34 1.98 1.98 0 0 0-.61.74 1.99 1.99 0 0 0-.16.9v.05a1.87 1.87 0 0 0 .24.74l.1.15c.12.16.26.3.42.42l.16.1.13.07.04.02a1.84 1.84 0 0 0 .76.17h.17a2 2 0 0 0 .91-.35 1.78 1.78 0 0 0 .52-.58l.03-.05a.84.84 0 0 0 .05-.11Zm5.15 4.5a1.14 1.14 0 0 0 1.14-1.97 1.13 1.13 0 0 0-1.55.41c-.32.55-.13 1.25.41 1.56Z"
    clip-rule="evenodd"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M4.63 9.43a1.5 1.5 0 1 0 1.5-2.6 1.5 1.5 0 0 0-1.5 2.6Zm.32-1.55a.5.5 0 0 1 .68-.19.5.5 0 0 1 .18.68.5.5 0 0 1-.68.19.5.5 0 0 1-.18-.68ZM17.94 8.88a1.5 1.5 0 1 1-2.6-1.5 1.5 1.5 0 1 1 2.6 1.5ZM16.9 7.69a.5.5 0 0 0-.68.19.5.5 0 0 0 .18.68.5.5 0 0 0 .68-.19.5.5 0 0 0-.18-.68ZM9.75 17.75a1.5 1.5 0 1 1 2.6 1.5 1.5 1.5 0 1 1-2.6-1.5Zm1.05 1.18a.5.5 0 0 0 .68-.18.5.5 0 0 0-.18-.68.5.5 0 0 0-.68.18.5.5 0 0 0 .18.68Z"
    clip-rule="evenodd"
  />
</svg>`,ue=n.JW`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M9.13 1h1.71c1.46 0 2.63 0 3.56.1.97.1 1.8.33 2.53.85a5 5 0 0 1 1.1 1.11c.53.73.75 1.56.86 2.53.1.93.1 2.1.1 3.55v1.72c0 1.45 0 2.62-.1 3.55-.1.97-.33 1.8-.86 2.53a5 5 0 0 1-1.1 1.1c-.73.53-1.56.75-2.53.86-.93.1-2.1.1-3.55.1H9.13c-1.45 0-2.62 0-3.56-.1-.96-.1-1.8-.33-2.52-.85a5 5 0 0 1-1.1-1.11 5.05 5.05 0 0 1-.86-2.53c-.1-.93-.1-2.1-.1-3.55V9.14c0-1.45 0-2.62.1-3.55.1-.97.33-1.8.85-2.53a5 5 0 0 1 1.1-1.1 5.05 5.05 0 0 1 2.53-.86C6.51 1 7.67 1 9.13 1ZM5.79 3.09a3.1 3.1 0 0 0-1.57.48 3 3 0 0 0-.66.67c-.24.32-.4.77-.48 1.56-.1.82-.1 1.88-.1 3.4v1.6c0 1.15 0 2.04.05 2.76l.41-.42c.5-.5.93-.92 1.32-1.24.41-.33.86-.6 1.43-.7a3 3 0 0 1 .94 0c.35.06.66.2.95.37a17.11 17.11 0 0 0 .8.45c.1-.08.2-.2.41-.4l.04-.03a27 27 0 0 1 1.95-1.84 4.03 4.03 0 0 1 1.91-.94 4 4 0 0 1 1.25 0c.73.11 1.33.46 1.91.94l.64.55V9.2c0-1.52 0-2.58-.1-3.4a3.1 3.1 0 0 0-.48-1.56 3 3 0 0 0-.66-.67 3.1 3.1 0 0 0-1.56-.48C13.37 3 12.3 3 10.79 3h-1.6c-1.52 0-2.59 0-3.4.09Zm11.18 10-.04-.05a26.24 26.24 0 0 0-1.83-1.74c-.45-.36-.73-.48-.97-.52a2 2 0 0 0-.63 0c-.24.04-.51.16-.97.52-.46.38-1.01.93-1.83 1.74l-.02.02c-.17.18-.34.34-.49.47a2.04 2.04 0 0 1-1.08.5 1.97 1.97 0 0 1-1.25-.27l-.79-.46-.02-.02a.65.65 0 0 0-.24-.1 1 1 0 0 0-.31 0c-.08.02-.21.06-.49.28-.3.24-.65.59-1.2 1.14l-.56.56-.65.66a3 3 0 0 0 .62.6c.33.24.77.4 1.57.49.81.09 1.88.09 3.4.09h1.6c1.52 0 2.58 0 3.4-.09a3.1 3.1 0 0 0 1.56-.48 3 3 0 0 0 .66-.67c.24-.32.4-.77.49-1.56l.07-1.12Zm-8.02-1.03ZM4.99 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
    clip-rule="evenodd"
  />
</svg>`,he=n.JW`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M8 0a1 1 0 0 1 1 1v5.38a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1ZM5.26 2.6a1 1 0 0 1-.28 1.39 5.46 5.46 0 1 0 6.04 0 1 1 0 1 1 1.1-1.67 7.46 7.46 0 1 1-8.25 0 1 1 0 0 1 1.4.28Z"
    clip-rule="evenodd"
  />
</svg>`,de=n.JW` <svg
  width="36"
  height="36"
  fill="none"
>
  <path
    d="M0 8a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8Z"
    fill="#fff"
    fill-opacity=".05"
  />
  <path
    d="m18.262 17.513-8.944 9.49v.01a2.417 2.417 0 0 0 3.56 1.452l.026-.017 10.061-5.803-4.703-5.132Z"
    fill="#EA4335"
  />
  <path
    d="m27.307 15.9-.008-.008-4.342-2.52-4.896 4.36 4.913 4.912 4.325-2.494a2.42 2.42 0 0 0 .008-4.25Z"
    fill="#FBBC04"
  />
  <path
    d="M9.318 8.997c-.05.202-.084.403-.084.622V26.39c0 .218.025.42.084.621l9.246-9.247-9.246-8.768Z"
    fill="#4285F4"
  />
  <path
    d="m18.33 18 4.627-4.628-10.053-5.828a2.427 2.427 0 0 0-3.586 1.444L18.329 18Z"
    fill="#34A853"
  />
  <path
    d="M8 .5h20A7.5 7.5 0 0 1 35.5 8v20a7.5 7.5 0 0 1-7.5 7.5H8A7.5 7.5 0 0 1 .5 28V8A7.5 7.5 0 0 1 8 .5Z"
    stroke="#fff"
    stroke-opacity=".05"
  />
</svg>`,fe=n.JW`<svg
  width="13"
  height="12"
  viewBox="0 0 13 12"
  fill="none"
>
  <path
    fill="currentColor"
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M0.794373 5.99982C0.794373 5.52643 1.17812 5.14268 1.6515 5.14268H5.643V1.15109C5.643 0.677701 6.02675 0.293946 6.50012 0.293945C6.9735 0.293946 7.35725 0.677701 7.35725 1.15109V5.14268H11.3488C11.8221 5.14268 12.2059 5.52643 12.2059 5.99982C12.2059 6.47321 11.8221 6.85696 11.3488 6.85696H7.35725V10.8486C7.35725 11.3219 6.9735 11.7057 6.50012 11.7057C6.02675 11.7057 5.643 11.3219 5.643 10.8486V6.85696H1.6515C1.17812 6.85696 0.794373 6.47321 0.794373 5.99982Z"
  /></svg
>`,pe=n.JW`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    d="M3 6a3 3 0 0 1 3-3h1a1 1 0 1 0 0-2H6a5 5 0 0 0-5 5v1a1 1 0 0 0 2 0V6ZM13 1a1 1 0 1 0 0 2h1a3 3 0 0 1 3 3v1a1 1 0 1 0 2 0V6a5 5 0 0 0-5-5h-1ZM3 13a1 1 0 1 0-2 0v1a5 5 0 0 0 5 5h1a1 1 0 1 0 0-2H6a3 3 0 0 1-3-3v-1ZM19 13a1 1 0 1 0-2 0v1a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1.01a5 5 0 0 0 5-5v-1ZM5.3 6.36c-.04.2-.04.43-.04.89s0 .7.05.89c.14.52.54.92 1.06 1.06.19.05.42.05.89.05.46 0 .7 0 .88-.05A1.5 1.5 0 0 0 9.2 8.14c.06-.2.06-.43.06-.89s0-.7-.06-.89A1.5 1.5 0 0 0 8.14 5.3c-.19-.05-.42-.05-.88-.05-.47 0-.7 0-.9.05a1.5 1.5 0 0 0-1.05 1.06ZM10.8 6.36c-.04.2-.04.43-.04.89s0 .7.05.89c.14.52.54.92 1.06 1.06.19.05.42.05.89.05.46 0 .7 0 .88-.05a1.5 1.5 0 0 0 1.06-1.06c.06-.2.06-.43.06-.89s0-.7-.06-.89a1.5 1.5 0 0 0-1.06-1.06c-.19-.05-.42-.05-.88-.05-.47 0-.7 0-.9.05a1.5 1.5 0 0 0-1.05 1.06ZM5.26 12.75c0-.46 0-.7.05-.89a1.5 1.5 0 0 1 1.06-1.06c.19-.05.42-.05.89-.05.46 0 .7 0 .88.05.52.14.93.54 1.06 1.06.06.2.06.43.06.89s0 .7-.06.89a1.5 1.5 0 0 1-1.06 1.06c-.19.05-.42.05-.88.05-.47 0-.7 0-.9-.05a1.5 1.5 0 0 1-1.05-1.06c-.05-.2-.05-.43-.05-.89ZM10.8 11.86c-.04.2-.04.43-.04.89s0 .7.05.89c.14.52.54.92 1.06 1.06.19.05.42.05.89.05.46 0 .7 0 .88-.05a1.5 1.5 0 0 0 1.06-1.06c.06-.2.06-.43.06-.89s0-.7-.06-.89a1.5 1.5 0 0 0-1.06-1.06c-.19-.05-.42-.05-.88-.05-.47 0-.7 0-.9.05a1.5 1.5 0 0 0-1.05 1.06Z"
  />
</svg>`,ge=n.JW`<svg
  fill="none"
  viewBox="0 0 21 20"
>
  <path
    fill="currentColor"
    d="M8.8071 0.292893C9.19763 0.683417 9.19763 1.31658 8.8071 1.70711L6.91421 3.6H11.8404C14.3368 3.6 16.5533 5.1975 17.3427 7.56588L17.4487 7.88377C17.6233 8.40772 17.3402 8.97404 16.8162 9.14868C16.2923 9.32333 15.726 9.04017 15.5513 8.51623L15.4453 8.19834C14.9281 6.64664 13.476 5.6 11.8404 5.6H6.91421L8.8071 7.49289C9.19763 7.88342 9.19763 8.51658 8.8071 8.90711C8.41658 9.29763 7.78341 9.29763 7.39289 8.90711L3.79289 5.30711C3.40236 4.91658 3.40236 4.28342 3.79289 3.89289L7.39289 0.292893C7.78341 -0.0976311 8.41658 -0.0976311 8.8071 0.292893ZM4.18377 10.8513C4.70771 10.6767 5.27403 10.9598 5.44868 11.4838L5.55464 11.8017C6.07188 13.3534 7.52401 14.4 9.15964 14.4L14.0858 14.4L12.1929 12.5071C11.8024 12.1166 11.8024 11.4834 12.1929 11.0929C12.5834 10.7024 13.2166 10.7024 13.6071 11.0929L17.2071 14.6929C17.5976 15.0834 17.5976 15.7166 17.2071 16.1071L13.6071 19.7071C13.2166 20.0976 12.5834 20.0976 12.1929 19.7071C11.8024 19.3166 11.8024 18.6834 12.1929 18.2929L14.0858 16.4L9.15964 16.4C6.66314 16.4 4.44674 14.8025 3.65728 12.4341L3.55131 12.1162C3.37667 11.5923 3.65983 11.026 4.18377 10.8513Z"
  /></svg
>`,me=n.JW`<svg fill="none" viewBox="0 0 14 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3.94 1.04a1 1 0 0 1 .7 1.23l-.48 1.68a5.85 5.85 0 0 1 8.53 4.32 5.86 5.86 0 0 1-11.4 2.56 1 1 0 0 1 1.9-.57 3.86 3.86 0 1 0 1.83-4.5l1.87.53a1 1 0 0 1-.55 1.92l-4.1-1.15a1 1 0 0 1-.69-1.23l1.16-4.1a1 1 0 0 1 1.23-.7Z"
    clip-rule="evenodd"
  />
</svg>`,ye=n.JW`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M9.36 4.21a5.14 5.14 0 1 0 0 10.29 5.14 5.14 0 0 0 0-10.29ZM1.64 9.36a7.71 7.71 0 1 1 14 4.47l2.52 2.5a1.29 1.29 0 1 1-1.82 1.83l-2.51-2.51A7.71 7.71 0 0 1 1.65 9.36Z"
    clip-rule="evenodd"
  />
</svg>`,we=n.JW`<svg fill="none" viewBox="0 0 21 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M14.3808 4.34812C13.72 4.47798 12.8501 4.7587 11.5748 5.17296L9.00869 6.00646C6.90631 6.68935 5.40679 7.17779 4.38121 7.63178C3.87166 7.85734 3.5351 8.05091 3.32022 8.22035C3.11183 8.38466 3.07011 8.48486 3.05969 8.51817C2.98058 8.77103 2.98009 9.04195 3.05831 9.29509C3.06861 9.32844 3.10998 9.42878 3.31777 9.59384C3.53205 9.76404 3.86792 9.95881 4.37667 10.1862C5.29287 10.5957 6.58844 11.0341 8.35529 11.6164L10.8876 8.59854C11.2426 8.17547 11.8733 8.12028 12.2964 8.47528C12.7195 8.83029 12.7746 9.46104 12.4196 9.88412L9.88738 12.9019C10.7676 14.5408 11.4244 15.7406 11.9867 16.5718C12.299 17.0333 12.5491 17.3303 12.7539 17.5117C12.9526 17.6877 13.0586 17.711 13.0932 17.7154C13.3561 17.7484 13.6228 17.7009 13.8581 17.5791C13.8891 17.563 13.9805 17.5046 14.1061 17.2708C14.2357 17.0298 14.3679 16.6647 14.5015 16.1237C14.7705 15.0349 14.9912 13.4733 15.2986 11.2843L15.6738 8.61249C15.8603 7.28456 15.9857 6.37917 15.9989 5.7059C16.012 5.03702 15.9047 4.8056 15.8145 4.69183C15.7044 4.55297 15.5673 4.43792 15.4114 4.35365C15.2837 4.28459 15.0372 4.2191 14.3808 4.34812ZM7.99373 13.603C6.11919 12.9864 4.6304 12.4902 3.5606 12.0121C2.98683 11.7557 2.4778 11.4808 2.07383 11.1599C1.66337 10.8339 1.31312 10.4217 1.14744 9.88551C0.949667 9.24541 0.950886 8.56035 1.15094 7.92096C1.31852 7.38534 1.67024 6.97442 2.08185 6.64985C2.48697 6.33041 2.99697 6.05734 3.57166 5.80295C4.70309 5.3021 6.30179 4.78283 8.32903 4.12437L11.0196 3.25042C12.2166 2.86159 13.2017 2.54158 13.9951 2.38566C14.8065 2.22618 15.6202 2.19289 16.3627 2.59437C16.7568 2.80747 17.1035 3.09839 17.3818 3.4495C17.9062 4.111 18.0147 4.91815 17.9985 5.74496C17.9827 6.55332 17.8386 7.57903 17.6636 8.82534L17.2701 11.6268C16.9737 13.7376 16.7399 15.4022 16.4432 16.6034C16.2924 17.2135 16.1121 17.7632 15.8678 18.2176C15.6197 18.6794 15.2761 19.0971 14.7777 19.3551C14.1827 19.6632 13.5083 19.7833 12.8436 19.6997C12.2867 19.6297 11.82 19.3563 11.4277 19.0087C11.0415 18.6666 10.6824 18.213 10.3302 17.6925C9.67361 16.722 8.92648 15.342 7.99373 13.603Z"
    clip-rule="evenodd"
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
  ></svg></svg
>`,be=n.JW`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M6.76.3a1 1 0 0 1 0 1.4L4.07 4.4h9a1 1 0 1 1 0 2h-9l2.69 2.68a1 1 0 1 1-1.42 1.42L.95 6.09a1 1 0 0 1 0-1.4l4.4-4.4a1 1 0 0 1 1.4 0Zm6.49 9.21a1 1 0 0 1 1.41 0l4.39 4.4a1 1 0 0 1 0 1.4l-4.39 4.4a1 1 0 0 1-1.41-1.42l2.68-2.68h-9a1 1 0 0 1 0-2h9l-2.68-2.68a1 1 0 0 1 0-1.42Z"
    clip-rule="evenodd"
  />
</svg>`,ve=n.JW`<svg width="10" height="10" viewBox="0 0 10 10">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3.77986 0.566631C4.0589 0.845577 4.0589 1.29784 3.77986 1.57678L3.08261 2.2738H6.34184C6.73647 2.2738 7.05637 2.5936 7.05637 2.98808C7.05637 3.38257 6.73647 3.70237 6.34184 3.70237H3.08261L3.77986 4.39938C4.0589 4.67833 4.0589 5.13059 3.77986 5.40954C3.50082 5.68848 3.04841 5.68848 2.76937 5.40954L0.852346 3.49316C0.573306 3.21421 0.573306 2.76195 0.852346 2.48301L2.76937 0.566631C3.04841 0.287685 3.50082 0.287685 3.77986 0.566631ZM6.22 4.59102C6.49904 4.31208 6.95145 4.31208 7.23049 4.59102L9.14751 6.5074C9.42655 6.78634 9.42655 7.23861 9.14751 7.51755L7.23049 9.43393C6.95145 9.71287 6.49904 9.71287 6.22 9.43393C5.94096 9.15498 5.94096 8.70272 6.22 8.42377L6.91725 7.72676L3.65802 7.72676C3.26339 7.72676 2.94349 7.40696 2.94349 7.01247C2.94349 6.61798 3.26339 6.29819 3.65802 6.29819L6.91725 6.29819L6.22 5.60117C5.94096 5.32223 5.94096 4.86997 6.22 4.59102Z"
    clip-rule="evenodd"
  />
</svg>`,Ae=n.JW`<svg
  width="14"
  height="14"
  viewBox="0 0 14 14"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M13.7306 3.24213C14.0725 3.58384 14.0725 4.13786 13.7306 4.47957L10.7418 7.46737C10.4 7.80908 9.84581 7.80908 9.50399 7.46737C9.16216 7.12567 9.16216 6.57165 9.50399 6.22994L10.9986 4.73585H5.34082C4.85741 4.73585 4.46553 4.3441 4.46553 3.86085C4.46553 3.3776 4.85741 2.98585 5.34082 2.98585L10.9986 2.98585L9.50399 1.49177C9.16216 1.15006 9.16216 0.596037 9.50399 0.254328C9.84581 -0.0873803 10.4 -0.0873803 10.7418 0.254328L13.7306 3.24213ZM9.52515 10.1352C9.52515 10.6185 9.13327 11.0102 8.64986 11.0102L2.9921 11.0102L4.48669 12.5043C4.82852 12.846 4.82852 13.4001 4.48669 13.7418C4.14487 14.0835 3.59066 14.0835 3.24884 13.7418L0.26003 10.754C0.0958806 10.5899 0.0036621 10.3673 0.00366211 10.1352C0.00366212 9.90318 0.0958806 9.68062 0.26003 9.51652L3.24884 6.52872C3.59066 6.18701 4.14487 6.18701 4.48669 6.52872C4.82851 6.87043 4.82851 7.42445 4.48669 7.76616L2.9921 9.26024L8.64986 9.26024C9.13327 9.26024 9.52515 9.65199 9.52515 10.1352Z"
    fill="currentColor"
  />
</svg>

`,Ee=n.JW`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path 
    fill="currentColor"
    fill-rule="evenodd" 
    clip-rule="evenodd" 
    d="M8.3071 0.292893C8.69763 0.683417 8.69763 1.31658 8.3071 1.70711L6.41421 3.6H11.3404C13.8368 3.6 16.0533 5.1975 16.8427 7.56588L16.9487 7.88377C17.1233 8.40772 16.8402 8.97404 16.3162 9.14868C15.7923 9.32333 15.226 9.04017 15.0513 8.51623L14.9453 8.19834C14.4281 6.64664 12.976 5.6 11.3404 5.6H6.41421L8.3071 7.49289C8.69763 7.88342 8.69763 8.51658 8.3071 8.90711C7.91658 9.29763 7.28341 9.29763 6.89289 8.90711L3.29289 5.30711C2.90236 4.91658 2.90236 4.28342 3.29289 3.89289L6.89289 0.292893C7.28341 -0.0976311 7.91658 -0.0976311 8.3071 0.292893ZM3.68377 10.8513C4.20771 10.6767 4.77403 10.9598 4.94868 11.4838L5.05464 11.8017C5.57188 13.3534 7.024 14.4 8.65964 14.4L13.5858 14.4L11.6929 12.5071C11.3024 12.1166 11.3024 11.4834 11.6929 11.0929C12.0834 10.7024 12.7166 10.7024 13.1071 11.0929L16.7071 14.6929C17.0976 15.0834 17.0976 15.7166 16.7071 16.1071L13.1071 19.7071C12.7166 20.0976 12.0834 20.0976 11.6929 19.7071C11.3024 19.3166 11.3024 18.6834 11.6929 18.2929L13.5858 16.4L8.65964 16.4C6.16314 16.4 3.94674 14.8025 3.15728 12.4341L3.05131 12.1162C2.87667 11.5923 3.15983 11.026 3.68377 10.8513Z" 
  />
</svg>`,xe=n.JW`<svg fill="none" viewBox="0 0 14 14">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3.48 2.18a1 1 0 0 1 1.41 0l2.68 2.68a1 1 0 1 1-1.41 1.42l-.98-.98v4.56a1 1 0 0 1-2 0V5.3l-.97.98A1 1 0 0 1 .79 4.86l2.69-2.68Zm6.34 2.93a1 1 0 0 1 1 1v4.56l.97-.98a1 1 0 1 1 1.42 1.42l-2.69 2.68a1 1 0 0 1-1.41 0l-2.68-2.68a1 1 0 0 1 1.41-1.42l.98.98V6.1a1 1 0 0 1 1-1Z"
    clip-rule="evenodd"
  />
</svg>`,Ce=n.JW`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#5865F2" />
      <path
        fill="#fff"
        fill-rule="evenodd"
        d="M25.71 28.15C30.25 28 32 25.02 32 25.02c0-6.61-2.96-11.98-2.96-11.98-2.96-2.22-5.77-2.15-5.77-2.15l-.29.32c3.5 1.07 5.12 2.61 5.12 2.61a16.75 16.75 0 0 0-10.34-1.93l-.35.04a15.43 15.43 0 0 0-5.88 1.9s1.71-1.63 5.4-2.7l-.2-.24s-2.81-.07-5.77 2.15c0 0-2.96 5.37-2.96 11.98 0 0 1.73 2.98 6.27 3.13l1.37-1.7c-2.6-.79-3.6-2.43-3.6-2.43l.58.35.09.06.08.04.02.01.08.05a17.25 17.25 0 0 0 4.52 1.58 14.4 14.4 0 0 0 8.3-.86c.72-.27 1.52-.66 2.37-1.21 0 0-1.03 1.68-3.72 2.44.61.78 1.35 1.67 1.35 1.67Zm-9.55-9.6c-1.17 0-2.1 1.03-2.1 2.28 0 1.25.95 2.28 2.1 2.28 1.17 0 2.1-1.03 2.1-2.28.01-1.25-.93-2.28-2.1-2.28Zm7.5 0c-1.17 0-2.1 1.03-2.1 2.28 0 1.25.95 2.28 2.1 2.28 1.17 0 2.1-1.03 2.1-2.28 0-1.25-.93-2.28-2.1-2.28Z"
        clip-rule="evenodd"
      />
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
  </defs>
</svg> `,Se=n.JW`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#5A3E85" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M18.22 25.7 20 23.91h3.34l2.1-2.1v-6.68H15.4v8.78h2.82v1.77Zm3.87-8.16h1.25v3.66H22.1v-3.66Zm-3.34 0H20v3.66h-1.25v-3.66ZM20 7.9a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm6.69 14.56-3.66 3.66h-2.72l-1.77 1.78h-1.88V26.1H13.3v-9.82l.94-2.4H26.7v8.56Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`,ke=n.JW`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    d="m14.36 4.74.01.42c0 4.34-3.3 9.34-9.34 9.34A9.3 9.3 0 0 1 0 13.03a6.6 6.6 0 0 0 4.86-1.36 3.29 3.29 0 0 1-3.07-2.28c.5.1 1 .07 1.48-.06A3.28 3.28 0 0 1 .64 6.11v-.04c.46.26.97.4 1.49.41A3.29 3.29 0 0 1 1.11 2.1a9.32 9.32 0 0 0 6.77 3.43 3.28 3.28 0 0 1 5.6-3 6.59 6.59 0 0 0 2.08-.8 3.3 3.3 0 0 1-1.45 1.82A6.53 6.53 0 0 0 16 3.04c-.44.66-1 1.23-1.64 1.7Z"
  />
</svg>`,_e=n.JW`<svg fill="none" viewBox="0 0 28 28">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M18.1 4.76c-.42-.73-1.33-1.01-2.09-.66l-1.42.66c-.37.18-.8.18-1.18 0l-1.4-.65a1.63 1.63 0 0 0-2.1.66l-.84 1.45c-.2.34-.53.59-.92.67l-1.7.35c-.83.17-1.39.94-1.3 1.78l.19 1.56c.04.39-.08.78-.33 1.07l-1.12 1.3c-.52.6-.52 1.5 0 2.11L5 16.38c.25.3.37.68.33 1.06l-.18 1.57c-.1.83.46 1.6 1.28 1.78l1.7.35c.4.08.73.32.93.66l.84 1.43a1.63 1.63 0 0 0 2.09.66l1.41-.66c.37-.17.8-.17 1.18 0l1.43.67c.76.35 1.66.07 2.08-.65l.86-1.45c.2-.34.54-.58.92-.66l1.68-.35A1.63 1.63 0 0 0 22.84 19l-.18-1.57a1.4 1.4 0 0 1 .33-1.06l1.12-1.32c.52-.6.52-1.5 0-2.11l-1.12-1.3a1.4 1.4 0 0 1-.33-1.07l.18-1.57c.1-.83-.46-1.6-1.28-1.77l-1.68-.35a1.4 1.4 0 0 1-.92-.66l-.86-1.47Zm-3.27-3.2a4.43 4.43 0 0 1 5.69 1.78l.54.93 1.07.22a4.43 4.43 0 0 1 3.5 4.84l-.11.96.7.83a4.43 4.43 0 0 1 .02 5.76l-.72.85.1.96a4.43 4.43 0 0 1-3.5 4.84l-1.06.22-.54.92a4.43 4.43 0 0 1-5.68 1.77l-.84-.4-.82.39a4.43 4.43 0 0 1-5.7-1.79l-.51-.89-1.09-.22a4.43 4.43 0 0 1-3.5-4.84l.1-.96-.72-.85a4.43 4.43 0 0 1 .01-5.76l.71-.83-.1-.95a4.43 4.43 0 0 1 3.5-4.84l1.08-.23.53-.9a4.43 4.43 0 0 1 5.7-1.8l.81.38.83-.39ZM18.2 9.4c.65.42.84 1.28.42 1.93l-4.4 6.87a1.4 1.4 0 0 1-2.26.14L9.5 15.39a1.4 1.4 0 0 1 2.15-1.8l1.23 1.48 3.38-5.26a1.4 1.4 0 0 1 1.93-.42Z"
    clip-rule="evenodd"
  />
</svg>`,Ie=n.JW`<svg fill="none" viewBox="0 0 14 14">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="m4.1 12.43-.45-.78-.93-.2a1.65 1.65 0 0 1-1.31-1.8l.1-.86-.61-.71a1.65 1.65 0 0 1 0-2.16l.6-.7-.09-.85c-.1-.86.47-1.64 1.3-1.81l.94-.2.45-.78A1.65 1.65 0 0 1 6.23.9l.77.36.78-.36c.77-.36 1.69-.07 2.12.66l.47.8.91.2c.84.17 1.4.95 1.31 1.8l-.1.86.6.7c.54.62.54 1.54.01 2.16l-.6.71.09.86c.1.85-.47 1.63-1.3 1.8l-.92.2-.47.79a1.65 1.65 0 0 1-2.12.66L7 12.74l-.77.36c-.78.35-1.7.07-2.13-.67Zm5.74-6.9a1 1 0 1 0-1.68-1.07L6.32 7.3l-.55-.66a1 1 0 0 0-1.54 1.28l1.43 1.71a1 1 0 0 0 1.61-.1l2.57-4Z"
    clip-rule="evenodd"
  />
</svg>`,Me=n.JW`
  <svg fill="none" viewBox="0 0 48 44">
    <path
      style="fill: var(--wui-color-bg-300);"
      d="M4.56 8.64c-1.23 1.68-1.23 4.08-1.23 8.88v8.96c0 4.8 0 7.2 1.23 8.88.39.55.87 1.02 1.41 1.42C7.65 38 10.05 38 14.85 38h14.3c4.8 0 7.2 0 8.88-1.22a6.4 6.4 0 0 0 1.41-1.42c.83-1.14 1.1-2.6 1.19-4.92a6.4 6.4 0 0 0 5.16-4.65c.21-.81.21-1.8.21-3.79 0-1.98 0-2.98-.22-3.79a6.4 6.4 0 0 0-5.15-4.65c-.1-2.32-.36-3.78-1.19-4.92a6.4 6.4 0 0 0-1.41-1.42C36.35 6 33.95 6 29.15 6h-14.3c-4.8 0-7.2 0-8.88 1.22a6.4 6.4 0 0 0-1.41 1.42Z"
    />
    <path
      style="fill: var(--wui-color-fg-200);"
      fill-rule="evenodd"
      d="M2.27 11.33a6.4 6.4 0 0 1 6.4-6.4h26.66a6.4 6.4 0 0 1 6.4 6.4v1.7a6.4 6.4 0 0 1 5.34 6.3v5.34a6.4 6.4 0 0 1-5.34 6.3v1.7a6.4 6.4 0 0 1-6.4 6.4H8.67a6.4 6.4 0 0 1-6.4-6.4V11.33ZM39.6 31.07h-6.93a9.07 9.07 0 1 1 0-18.14h6.93v-1.6a4.27 4.27 0 0 0-4.27-4.26H8.67a4.27 4.27 0 0 0-4.27 4.26v21.34a4.27 4.27 0 0 0 4.27 4.26h26.66a4.27 4.27 0 0 0 4.27-4.26v-1.6Zm-6.93-16a6.93 6.93 0 0 0 0 13.86h8a4.27 4.27 0 0 0 4.26-4.26v-5.34a4.27 4.27 0 0 0-4.26-4.26h-8Z"
      clip-rule="evenodd"
    />
  </svg>
`,Te=n.JW`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M0 5.5c0-1.8 1.46-3.25 3.25-3.25H14.5c1.8 0 3.25 1.46 3.25 3.25v.28A3.25 3.25 0 0 1 20 8.88v2.24c0 1.45-.94 2.68-2.25 3.1v.28c0 1.8-1.46 3.25-3.25 3.25H3.25A3.25 3.25 0 0 1 0 14.5v-9Zm15.75 8.88h-2.38a4.38 4.38 0 0 1 0-8.76h2.38V5.5c0-.69-.56-1.25-1.25-1.25H3.25C2.56 4.25 2 4.81 2 5.5v9c0 .69.56 1.25 1.25 1.25H14.5c.69 0 1.25-.56 1.25-1.25v-.13Zm-2.38-6.76a2.37 2.37 0 1 0 0 4.75h3.38c.69 0 1.25-.55 1.25-1.24V8.87c0-.69-.56-1.24-1.25-1.24h-3.38Z"
    clip-rule="evenodd"
  />
</svg>`,Pe=n.JW`<svg fill="none" viewBox="0 0 96 67">
  <path
    fill="currentColor"
    d="M25.32 18.8a32.56 32.56 0 0 1 45.36 0l1.5 1.47c.63.62.63 1.61 0 2.22l-5.15 5.05c-.31.3-.82.3-1.14 0l-2.07-2.03a22.71 22.71 0 0 0-31.64 0l-2.22 2.18c-.31.3-.82.3-1.14 0l-5.15-5.05a1.55 1.55 0 0 1 0-2.22l1.65-1.62Zm56.02 10.44 4.59 4.5c.63.6.63 1.6 0 2.21l-20.7 20.26c-.62.61-1.63.61-2.26 0L48.28 41.83a.4.4 0 0 0-.56 0L33.03 56.21c-.63.61-1.64.61-2.27 0L10.07 35.95a1.55 1.55 0 0 1 0-2.22l4.59-4.5a1.63 1.63 0 0 1 2.27 0L31.6 43.63a.4.4 0 0 0 .57 0l14.69-14.38a1.63 1.63 0 0 1 2.26 0l14.69 14.38a.4.4 0 0 0 .57 0l14.68-14.38a1.63 1.63 0 0 1 2.27 0Z"
  />
  <path
    stroke="#000"
    stroke-opacity=".1"
    d="M25.67 19.15a32.06 32.06 0 0 1 44.66 0l1.5 1.48c.43.42.43 1.09 0 1.5l-5.15 5.05a.31.31 0 0 1-.44 0l-2.07-2.03a23.21 23.21 0 0 0-32.34 0l-2.22 2.18a.31.31 0 0 1-.44 0l-5.15-5.05a1.05 1.05 0 0 1 0-1.5l1.65-1.63ZM81 29.6l4.6 4.5c.42.41.42 1.09 0 1.5l-20.7 20.26c-.43.43-1.14.43-1.57 0L48.63 41.47a.9.9 0 0 0-1.26 0L32.68 55.85c-.43.43-1.14.43-1.57 0L10.42 35.6a1.05 1.05 0 0 1 0-1.5l4.59-4.5a1.13 1.13 0 0 1 1.57 0l14.68 14.38a.9.9 0 0 0 1.27 0l-.35-.35.35.35L47.22 29.6a1.13 1.13 0 0 1 1.56 0l14.7 14.38a.9.9 0 0 0 1.26 0L79.42 29.6a1.13 1.13 0 0 1 1.57 0Z"
  />
</svg>`,Oe=n.JW`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    d="M11 6.67a1 1 0 1 0-2 0v2.66a1 1 0 0 0 2 0V6.67ZM10 14.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-7 9a7 7 0 1 1 14 0 7 7 0 0 1-14 0Z"
    clip-rule="evenodd"
  />
</svg>`,Re=n.JW`<svg
 xmlns="http://www.w3.org/2000/svg"
 width="28"
 height="28"
 viewBox="0 0 28 28"
 fill="none">
  <path
    fill="#949E9E"
    fill-rule="evenodd"
    d="M7.974 2.975h12.052c1.248 0 2.296 0 3.143.092.89.096 1.723.307 2.461.844a4.9 4.9 0 0 1 1.084 1.084c.537.738.748 1.57.844 2.461.092.847.092 1.895.092 3.143v6.802c0 1.248 0 2.296-.092 3.143-.096.89-.307 1.723-.844 2.461a4.9 4.9 0 0 1-1.084 1.084c-.738.537-1.57.748-2.461.844-.847.092-1.895.092-3.143.092H7.974c-1.247 0-2.296 0-3.143-.092-.89-.096-1.723-.307-2.461-.844a4.901 4.901 0 0 1-1.084-1.084c-.537-.738-.748-1.571-.844-2.461C.35 19.697.35 18.649.35 17.4v-6.802c0-1.248 0-2.296.092-3.143.096-.89.307-1.723.844-2.461A4.9 4.9 0 0 1 2.37 3.91c.738-.537 1.571-.748 2.461-.844.847-.092 1.895-.092 3.143-.092ZM5.133 5.85c-.652.071-.936.194-1.117.326a2.1 2.1 0 0 0-.465.465c-.132.181-.255.465-.325 1.117-.074.678-.076 1.573-.076 2.917v6.65c0 1.344.002 2.239.076 2.917.07.652.193.936.325 1.117a2.1 2.1 0 0 0 .465.465c.181.132.465.255 1.117.326.678.073 1.574.075 2.917.075h11.9c1.344 0 2.239-.002 2.917-.075.652-.071.936-.194 1.117-.326.179-.13.335-.286.465-.465.132-.181.255-.465.326-1.117.073-.678.075-1.573.075-2.917v-6.65c0-1.344-.002-2.239-.075-2.917-.071-.652-.194-.936-.326-1.117a2.1 2.1 0 0 0-.465-.465c-.181-.132-.465-.255-1.117-.326-.678-.073-1.573-.075-2.917-.075H8.05c-1.343 0-2.239.002-2.917.075Zm.467 7.275a3.15 3.15 0 1 1 6.3 0 3.15 3.15 0 0 1-6.3 0Zm8.75-1.75a1.4 1.4 0 0 1 1.4-1.4h3.5a1.4 1.4 0 0 1 0 2.8h-3.5a1.4 1.4 0 0 1-1.4-1.4Zm0 5.25a1.4 1.4 0 0 1 1.4-1.4H21a1.4 1.4 0 1 1 0 2.8h-5.25a1.4 1.4 0 0 1-1.4-1.4Z"
    clip-rule="evenodd"/>
</svg>`,Ne=n.JW`<svg fill="none" viewBox="0 0 41 40">
  <g clip-path="url(#a)">
    <path fill="#000" d="M.8 0h40v40H.8z" />
    <path
      fill="#fff"
      d="m22.63 18.46 7.14-8.3h-1.69l-6.2 7.2-4.96-7.2H11.2l7.5 10.9-7.5 8.71h1.7l6.55-7.61 5.23 7.61h5.72l-7.77-11.31Zm-9.13-7.03h2.6l11.98 17.13h-2.6L13.5 11.43Z"
    />
  </g>
  <defs>
    <clipPath id="a"><path fill="#fff" d="M.8 20a20 20 0 1 1 40 0 20 20 0 0 1-40 0Z" /></clipPath>
  </defs>
</svg>`;var Be=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};const Ue={add:E,allWallets:x,arrowBottomCircle:C,appStore:S,apple:k,arrowBottom:_,arrowLeft:I,arrowRight:M,arrowTop:T,bank:P,browser:O,card:R,checkmark:B,checkmarkBold:N,chevronBottom:U,chevronLeft:D,chevronRight:L,chevronTop:F,chromeStore:j,clock:H,close:z,compass:$,coinPlaceholder:q,copy:W,cursor:G,cursorTransparent:V,desktop:K,disconnect:Z,discord:Q,etherscan:J,extension:Y,externalLink:X,facebook:ee,filters:te,github:re,google:ne,helpCircle:ie,id:Re,infoCircle:se,mail:oe,mobile:ae,more:ce,networkPlaceholder:le,nftPlaceholder:ue,off:he,playStore:de,plus:fe,qrCode:pe,recycleHorizontal:ge,refresh:me,search:ye,send:we,swapHorizontal:be,swapHorizontalMedium:Ae,swapHorizontalBold:ve,swapHorizontalRoundedBold:Ee,swapVertical:xe,telegram:Ce,twitch:Se,twitter:Ne,twitterIcon:ke,verify:_e,verifyFilled:Ie,wallet:Te,walletConnect:Pe,walletPlaceholder:Me,warningCircle:Oe,x:Ne};let De=class extends n.WF{constructor(){super(...arguments),this.size="md",this.name="copy",this.color="fg-300"}render(){return this.style.cssText=`\n      --local-color: var(--wui-color-${this.color});\n      --local-width: var(--wui-icon-size-${this.size});\n    `,n.qy`${Ue[this.name]}`}};De.styles=[p,m,A],Be([(0,v.MZ)()],De.prototype,"size",void 0),Be([(0,v.MZ)()],De.prototype,"name",void 0),Be([(0,v.MZ)()],De.prototype,"color",void 0),De=Be([y("wui-icon")],De);const Le=n.AH`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
  }
`;var Fe=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let je=class extends n.WF{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`\n      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};\n      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};\n      `,n.qy`<img src=${this.src} alt=${this.alt} />`}};je.styles=[p,m,Le],Fe([(0,v.MZ)()],je.prototype,"src",void 0),Fe([(0,v.MZ)()],je.prototype,"alt",void 0),Fe([(0,v.MZ)()],je.prototype,"size",void 0),je=Fe([y("wui-image")],je);const He=n.AH`
  :host {
    display: block;
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
  }

  svg {
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
    fill: none;
    stroke: transparent;
    stroke-linecap: round;
  }

  use {
    stroke: var(--wui-color-accent-100);
    stroke-width: 2px;
    stroke-dasharray: 54, 118;
    stroke-dashoffset: 172;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;let ze=class extends n.WF{render(){return n.qy`
      <svg viewBox="0 0 54 59">
        <path
          id="wui-loader-path"
          d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"
        />
        <use xlink:href="#wui-loader-path"></use>
      </svg>
    `}};ze.styles=[p,He],ze=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([y("wui-loading-hexagon")],ze);const qe=n.AH`
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: var(--local-color);
    stroke-width: 4px;
    stroke-dasharray: 1, 124;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 124;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 124;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dashoffset: -125;
    }
  }
`;var $e=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let We=class extends n.WF{constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText="--local-color: "+("inherit"===this.color?"inherit":`var(--wui-color-${this.color})`),this.dataset.size=this.size,n.qy`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};We.styles=[p,qe],$e([(0,v.MZ)()],We.prototype,"color",void 0),$e([(0,v.MZ)()],We.prototype,"size",void 0),We=$e([y("wui-loading-spinner")],We);const Ge=n.AH`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var Ve=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Ke=class extends n.WF{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){const e=this.radius>50?50:this.radius,t=36-e,r=116+t,i=245+t,s=360+1.75*t;return n.qy`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${e}
          stroke-dasharray="${r} ${i}"
          stroke-dashoffset=${s}
        />
      </svg>
    `}};Ke.styles=[p,Ge],Ve([(0,v.MZ)({type:Number})],Ke.prototype,"radius",void 0),Ke=Ve([y("wui-loading-thumbnail")],Ke);const Ze=n.AH`
  :host {
    display: block;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-200) 5%,
      var(--wui-color-bg-200) 48%,
      var(--wui-color-bg-300) 55%,
      var(--wui-color-bg-300) 60%,
      var(--wui-color-bg-300) calc(60% + 10px),
      var(--wui-color-bg-200) calc(60% + 12px),
      var(--wui-color-bg-200) 100%
    );
    background-size: 250%;
    animation: shimmer 3s linear infinite reverse;
  }

  :host([variant='light']) {
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-150) 5%,
      var(--wui-color-bg-150) 48%,
      var(--wui-color-bg-200) 55%,
      var(--wui-color-bg-200) 60%,
      var(--wui-color-bg-200) calc(60% + 10px),
      var(--wui-color-bg-150) calc(60% + 12px),
      var(--wui-color-bg-150) 100%
    );
    background-size: 250%;
  }

  @keyframes shimmer {
    from {
      background-position: -250% 0;
    }
    to {
      background-position: 250% 0;
    }
  }
`;var Qe=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Je=class extends n.WF{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`\n      width: ${this.width};\n      height: ${this.height};\n      border-radius: clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px);\n    `,n.qy`<slot></slot>`}};Je.styles=[Ze],Qe([(0,v.MZ)()],Je.prototype,"width",void 0),Qe([(0,v.MZ)()],Je.prototype,"height",void 0),Qe([(0,v.MZ)()],Je.prototype,"borderRadius",void 0),Qe([(0,v.MZ)()],Je.prototype,"variant",void 0),Je=Qe([y("wui-shimmer")],Je);var Ye=r(6752),Xe=r(7804);const et=(0,Xe.u$)(class extends Xe.WL{constructor(e){if(super(e),e.type!==Xe.OA.ATTRIBUTE||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){if(void 0===this.st){this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((e=>""!==e))));for(const e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}const r=e.element.classList;for(const e of this.st)e in t||(r.remove(e),this.st.delete(e));for(const e in t){const n=!!t[e];n===this.st.has(e)||this.nt?.has(e)||(n?(r.add(e),this.st.add(e)):(r.remove(e),this.st.delete(e)))}return Ye.c0}}),tt=n.AH`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-title-600 {
    font-size: var(--wui-font-size-medium-title);
    letter-spacing: var(--wui-letter-spacing-medium-title);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }
`;var rt=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let nt=class extends n.WF{constructor(){super(...arguments),this.variant="paragraph-500",this.color="fg-300",this.align="left"}render(){const e={[`wui-font-${this.variant}`]:!0,[`wui-color-${this.color}`]:!0};return this.style.cssText=`\n      --local-align: ${this.align};\n      --local-color: var(--wui-color-${this.color});\n    `,n.qy`<slot class=${et(e)}></slot>`}};nt.styles=[p,tt],rt([(0,v.MZ)()],nt.prototype,"variant",void 0),rt([(0,v.MZ)()],nt.prototype,"color",void 0),rt([(0,v.MZ)()],nt.prototype,"align",void 0),nt=rt([y("wui-text")],nt);const it=n.JW`<svg fill="none" viewBox="0 0 60 60">
  <rect width="60" height="60" fill="#1DC956" rx="30" />
  <circle cx="30" cy="30" r="3" fill="#fff" />
  <path
    fill="#2BEE6C"
    stroke="#fff"
    stroke-width="2"
    d="m45.32 17.9-.88-.42.88.42.02-.05c.1-.2.21-.44.26-.7l-.82-.15.82.16a2 2 0 0 0-.24-1.4c-.13-.23-.32-.42-.47-.57a8.42 8.42 0 0 1-.04-.04l-.04-.04a2.9 2.9 0 0 0-.56-.47l-.51.86.5-.86a2 2 0 0 0-1.4-.24c-.26.05-.5.16-.69.26l-.05.02-15.05 7.25-.1.05c-1.14.55-1.85.89-2.46 1.37a7 7 0 0 0-1.13 1.14c-.5.6-.83 1.32-1.38 2.45l-.05.11-7.25 15.05-.02.05c-.1.2-.21.43-.26.69a2 2 0 0 0 .24 1.4l.85-.5-.85.5c.13.23.32.42.47.57l.04.04.04.04c.15.15.34.34.56.47a2 2 0 0 0 1.41.24l-.2-.98.2.98c.25-.05.5-.17.69-.26l.05-.02-.42-.87.42.87 15.05-7.25.1-.05c1.14-.55 1.85-.89 2.46-1.38a7 7 0 0 0 1.13-1.13 12.87 12.87 0 0 0 1.43-2.56l7.25-15.05Z"
  />
  <path
    fill="#1DC956"
    d="M33.38 32.72 30.7 29.3 15.86 44.14l.2.2a1 1 0 0 0 1.14.2l15.1-7.27a3 3 0 0 0 1.08-4.55Z"
  />
  <path
    fill="#86F999"
    d="m26.62 27.28 2.67 3.43 14.85-14.85-.2-.2a1 1 0 0 0-1.14-.2l-15.1 7.27a3 3 0 0 0-1.08 4.55Z"
  />
  <circle cx="30" cy="30" r="3" fill="#fff" transform="rotate(45 30 30)" />
  <rect width="59" height="59" x=".5" y=".5" stroke="#062B2B" stroke-opacity=".1" rx="29.5" />
</svg> `,st=n.JW`<svg viewBox="0 0 60 60" fill="none">
  <g clip-path="url(#clip0_7734_50402)">
    <path
      d="M0 24.9C0 15.6485 0 11.0228 1.97053 7.56812C3.3015 5.23468 5.23468 3.3015 7.56812 1.97053C11.0228 0 15.6485 0 24.9 0H35.1C44.3514 0 48.9772 0 52.4319 1.97053C54.7653 3.3015 56.6985 5.23468 58.0295 7.56812C60 11.0228 60 15.6485 60 24.9V35.1C60 44.3514 60 48.9772 58.0295 52.4319C56.6985 54.7653 54.7653 56.6985 52.4319 58.0295C48.9772 60 44.3514 60 35.1 60H24.9C15.6485 60 11.0228 60 7.56812 58.0295C5.23468 56.6985 3.3015 54.7653 1.97053 52.4319C0 48.9772 0 44.3514 0 35.1V24.9Z"
      fill="#EB8B47"
    />
    <path
      d="M0.5 24.9C0.5 20.2652 0.50047 16.8221 0.744315 14.105C0.987552 11.3946 1.46987 9.45504 2.40484 7.81585C3.69145 5.56019 5.56019 3.69145 7.81585 2.40484C9.45504 1.46987 11.3946 0.987552 14.105 0.744315C16.8221 0.50047 20.2652 0.5 24.9 0.5H35.1C39.7348 0.5 43.1779 0.50047 45.895 0.744315C48.6054 0.987552 50.545 1.46987 52.1841 2.40484C54.4398 3.69145 56.3086 5.56019 57.5952 7.81585C58.5301 9.45504 59.0124 11.3946 59.2557 14.105C59.4995 16.8221 59.5 20.2652 59.5 24.9V35.1C59.5 39.7348 59.4995 43.1779 59.2557 45.895C59.0124 48.6054 58.5301 50.545 57.5952 52.1841C56.3086 54.4398 54.4398 56.3086 52.1841 57.5952C50.545 58.5301 48.6054 59.0124 45.895 59.2557C43.1779 59.4995 39.7348 59.5 35.1 59.5H24.9C20.2652 59.5 16.8221 59.4995 14.105 59.2557C11.3946 59.0124 9.45504 58.5301 7.81585 57.5952C5.56019 56.3086 3.69145 54.4398 2.40484 52.1841C1.46987 50.545 0.987552 48.6054 0.744315 45.895C0.50047 43.1779 0.5 39.7348 0.5 35.1V24.9Z"
      stroke="#062B2B"
      stroke-opacity="0.1"
    />
    <path
      d="M19 52C24.5228 52 29 47.5228 29 42C29 36.4772 24.5228 32 19 32C13.4772 32 9 36.4772 9 42C9 47.5228 13.4772 52 19 52Z"
      fill="#FF974C"
      stroke="white"
      stroke-width="2"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M42.8437 8.3264C42.4507 7.70891 41.5493 7.70891 41.1564 8.32641L28.978 27.4638C28.5544 28.1295 29.0326 29.0007 29.8217 29.0007H54.1783C54.9674 29.0007 55.4456 28.1295 55.022 27.4638L42.8437 8.3264Z"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M42.3348 11.6456C42.659 11.7608 42.9061 12.1492 43.4005 12.926L50.7332 24.4488C51.2952 25.332 51.5763 25.7737 51.5254 26.1382C51.4915 26.3808 51.3698 26.6026 51.1833 26.7614C50.9031 27 50.3796 27 49.3327 27H34.6673C33.6204 27 33.0969 27 32.8167 26.7614C32.6302 26.6026 32.5085 26.3808 32.4746 26.1382C32.4237 25.7737 32.7048 25.332 33.2669 24.4488L40.5995 12.926C41.0939 12.1492 41.341 11.7608 41.6652 11.6456C41.8818 11.5687 42.1182 11.5687 42.3348 11.6456ZM35.0001 26.999C38.8661 26.999 42.0001 23.865 42.0001 19.999C42.0001 23.865 45.1341 26.999 49.0001 26.999H35.0001Z"
      fill="#FF974C"
    />
    <path
      d="M10.1061 9.35712C9.9973 9.67775 9.99867 10.0388 9.99978 10.3323C9.99989 10.3611 10 10.3893 10 10.4167V25.5833C10 25.6107 9.99989 25.6389 9.99978 25.6677C9.99867 25.9612 9.9973 26.3222 10.1061 26.6429C10.306 27.2317 10.7683 27.694 11.3571 27.8939C11.6777 28.0027 12.0388 28.0013 12.3323 28.0002C12.3611 28.0001 12.3893 28 12.4167 28H19C24.5228 28 29 23.5228 29 18C29 12.4772 24.5228 8 19 8H12.4167C12.3893 8 12.3611 7.99989 12.3323 7.99978C12.0388 7.99867 11.6778 7.9973 11.3571 8.10614C10.7683 8.306 10.306 8.76834 10.1061 9.35712Z"
      fill="#FF974C"
      stroke="white"
      stroke-width="2"
    />
    <circle cx="19" cy="18" r="4" fill="#EB8B47" stroke="white" stroke-width="2" />
    <circle cx="19" cy="42" r="4" fill="#EB8B47" stroke="white" stroke-width="2" />
  </g>
  <defs>
    <clipPath id="clip0_7734_50402">
      <rect width="60" height="60" fill="white" />
    </clipPath>
  </defs>
</svg> `,ot=n.JW`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <path
      fill="#1DC956"
      d="M0 25.01c0-9.25 0-13.88 1.97-17.33a15 15 0 0 1 5.6-5.6C11.02.11 15.65.11 24.9.11h10.2c9.25 0 13.88 0 17.33 1.97a15 15 0 0 1 5.6 5.6C60 11.13 60 15.76 60 25v10.2c0 9.25 0 13.88-1.97 17.33a15 15 0 0 1-5.6 5.6c-3.45 1.97-8.08 1.97-17.33 1.97H24.9c-9.25 0-13.88 0-17.33-1.97a15 15 0 0 1-5.6-5.6C0 49.1 0 44.46 0 35.21v-10.2Z"
    />
    <path
      fill="#2BEE6C"
      d="M16.1 60c-3.82-.18-6.4-.64-8.53-1.86a15 15 0 0 1-5.6-5.6C.55 50.06.16 46.97.04 41.98L4.2 40.6a4 4 0 0 0 2.48-2.39l4.65-12.4a2 2 0 0 1 2.5-1.2l2.53.84a2 2 0 0 0 2.43-1l2.96-5.94a2 2 0 0 1 3.7.32l3.78 12.58a2 2 0 0 0 3.03 1.09l3.34-2.23a2 2 0 0 0 .65-.7l5.3-9.72a2 2 0 0 1 1.42-1.01l4.14-.69a2 2 0 0 1 1.6.44l3.9 3.24a2 2 0 0 0 2.7-.12l4.62-4.63c.08 2.2.08 4.8.08 7.93v10.2c0 9.25 0 13.88-1.97 17.33a15 15 0 0 1-5.6 5.6c-2.13 1.22-4.7 1.68-8.54 1.86H16.11Z"
    />
    <path
      fill="#fff"
      d="m.07 43.03-.05-2.1 3.85-1.28a3 3 0 0 0 1.86-1.79l4.66-12.4a3 3 0 0 1 3.75-1.8l2.53.84a1 1 0 0 0 1.21-.5l2.97-5.94a3 3 0 0 1 5.56.48l3.77 12.58a1 1 0 0 0 1.51.55l3.34-2.23a1 1 0 0 0 .33-.35l5.3-9.71a3 3 0 0 1 2.14-1.53l4.13-.69a3 3 0 0 1 2.41.66l3.9 3.24a1 1 0 0 0 1.34-.06l5.28-5.28c.05.85.08 1.75.1 2.73L56 22.41a3 3 0 0 1-4.04.19l-3.9-3.25a1 1 0 0 0-.8-.21l-4.13.69a1 1 0 0 0-.72.5l-5.3 9.72a3 3 0 0 1-.97 1.05l-3.34 2.23a3 3 0 0 1-4.53-1.63l-3.78-12.58a1 1 0 0 0-1.85-.16l-2.97 5.94a3 3 0 0 1-3.63 1.5l-2.53-.84a1 1 0 0 0-1.25.6l-4.65 12.4a5 5 0 0 1-3.1 3L.07 43.02Z"
    />
    <path
      fill="#fff"
      fill-rule="evenodd"
      d="M49.5 19a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
      clip-rule="evenodd"
    />
    <path fill="#fff" d="M45 .28v59.66l-2 .1V.19c.7.02 1.37.05 2 .1Z" />
    <path fill="#2BEE6C" d="M47.5 19a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
    <path
      stroke="#fff"
      stroke-opacity=".1"
      d="M.5 25.01c0-4.63 0-8.08.24-10.8.25-2.7.73-4.64 1.66-6.28a14.5 14.5 0 0 1 5.42-5.41C9.46 1.58 11.39 1.1 14.1.85A133 133 0 0 1 24.9.61h10.2c4.63 0 8.08 0 10.8.24 2.7.25 4.65.73 6.28 1.67a14.5 14.5 0 0 1 5.42 5.4c.93 1.65 1.41 3.58 1.66 6.3.24 2.71.24 6.16.24 10.79v10.2c0 4.64 0 8.08-.24 10.8-.25 2.7-.73 4.65-1.66 6.28a14.5 14.5 0 0 1-5.42 5.42c-1.63.93-3.57 1.41-6.28 1.66-2.72.24-6.17.24-10.8.24H24.9c-4.63 0-8.08 0-10.8-.24-2.7-.25-4.64-.73-6.28-1.66a14.5 14.5 0 0 1-5.42-5.42C1.47 50.66 1 48.72.74 46.01A133 133 0 0 1 .5 35.2v-10.2Z"
    />
  </g>
  <defs>
    <clipPath id="a"><path fill="#fff" d="M0 0h60v60H0z" /></clipPath>
  </defs>
</svg>`,at=n.JW`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <rect width="60" height="60" fill="#C653C6" rx="30" />
    <path
      fill="#E87DE8"
      d="M57.98.01v19.5a4.09 4.09 0 0 0-2.63 2.29L50.7 34.2a2 2 0 0 1-2.5 1.2l-2.53-.84a2 2 0 0 0-2.42 1l-2.97 5.94a2 2 0 0 1-3.7-.32L32.8 28.6a2 2 0 0 0-3.02-1.09l-3.35 2.23a2 2 0 0 0-.64.7l-5.3 9.72a2 2 0 0 1-1.43 1.01l-4.13.69a2 2 0 0 1-1.61-.44l-3.9-3.24a2 2 0 0 0-2.69.12L2.1 42.93.02 43V.01h57.96Z"
    />
    <path
      fill="#fff"
      d="m61.95 16.94.05 2.1-3.85 1.28a3 3 0 0 0-1.86 1.79l-4.65 12.4a3 3 0 0 1-3.76 1.8l-2.53-.84a1 1 0 0 0-1.2.5l-2.98 5.94a3 3 0 0 1-5.55-.48l-3.78-12.58a1 1 0 0 0-1.5-.55l-3.35 2.23a1 1 0 0 0-.32.35l-5.3 9.72a3 3 0 0 1-2.14 1.52l-4.14.69a3 3 0 0 1-2.41-.66l-3.9-3.24a1 1 0 0 0-1.34.06l-5.28 5.28c-.05-.84-.08-1.75-.1-2.73l3.97-3.96a3 3 0 0 1 4.04-.19l3.89 3.25a1 1 0 0 0 .8.21l4.14-.68a1 1 0 0 0 .71-.51l5.3-9.71a3 3 0 0 1 .97-1.06l3.34-2.23a3 3 0 0 1 4.54 1.63l3.77 12.58a1 1 0 0 0 1.86.16l2.96-5.93a3 3 0 0 1 3.64-1.5l2.52.83a1 1 0 0 0 1.25-.6l4.66-12.4a5 5 0 0 1 3.1-2.99l4.43-1.48Z"
    />
    <path
      fill="#fff"
      fill-rule="evenodd"
      d="M35.5 27a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
      clip-rule="evenodd"
    />
    <path fill="#fff" d="M31 0v60h-2V0h2Z" />
    <path fill="#E87DE8" d="M33.5 27a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
  </g>
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="29.5" />
  <defs>
    <clipPath id="a"><rect width="60" height="60" fill="#fff" rx="30" /></clipPath>
  </defs>
</svg> `,ct=n.JW`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <rect width="60" height="60" fill="#987DE8" rx="30" />
    <path
      fill="#fff"
      fill-rule="evenodd"
      d="m15.48 28.37 11.97-19.3a3 3 0 0 1 5.1 0l11.97 19.3a6 6 0 0 1 .9 3.14v.03a6 6 0 0 1-1.16 3.56L33.23 50.2a4 4 0 0 1-6.46 0L15.73 35.1a6 6 0 0 1-1.15-3.54v-.03a6 6 0 0 1 .9-3.16Z"
      clip-rule="evenodd"
    />
    <path
      fill="#643CDD"
      d="M30.84 10.11a1 1 0 0 0-.84-.46V24.5l12.6 5.53a2 2 0 0 0-.28-1.4L30.84 10.11Z"
    />
    <path
      fill="#BDADEB"
      d="M30 9.65a1 1 0 0 0-.85.46L17.66 28.64a2 2 0 0 0-.26 1.39L30 24.5V9.65Z"
    />
    <path
      fill="#643CDD"
      d="M30 50.54a1 1 0 0 0 .8-.4l11.24-15.38c.3-.44-.2-1-.66-.73l-9.89 5.68a3 3 0 0 1-1.5.4v10.43Z"
    />
    <path
      fill="#BDADEB"
      d="m17.97 34.76 11.22 15.37c.2.28.5.41.8.41V40.11a3 3 0 0 1-1.49-.4l-9.88-5.68c-.47-.27-.97.3-.65.73Z"
    />
    <path
      fill="#401AB3"
      d="M42.6 30.03 30 24.5v13.14a3 3 0 0 0 1.5-.4l10.14-5.83a2 2 0 0 0 .95-1.38Z"
    />
    <path
      fill="#7C5AE2"
      d="M30 37.64V24.46l-12.6 5.57a2 2 0 0 0 .97 1.39l10.13 5.82a3 3 0 0 0 1.5.4Z"
    />
  </g>
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="29.5" />
  <defs>
    <clipPath id="a"><rect width="60" height="60" fill="#fff" rx="30" /></clipPath>
  </defs>
</svg> `,lt=n.JW`<svg fill="none" viewBox="0 0 60 60">
  <rect width="60" height="60" fill="#1DC956" rx="3" />
  <path
    fill="#1FAD7E"
    stroke="#fff"
    stroke-width="2"
    d="m30.49 29.13-.49-.27-.49.27-12.77 7.1-.05.02c-.86.48-1.58.88-2.1 1.24-.54.37-1.04.81-1.28 1.45a3 3 0 0 0 0 2.12c.24.63.74 1.08 1.27 1.45.53.36 1.25.76 2.11 1.24l.05.03 6.33 3.51.17.1c2.33 1.3 3.72 2.06 5.22 2.32a9 9 0 0 0 3.08 0c1.5-.26 2.9-1.03 5.22-2.32l.18-.1 6.32-3.51.05-.03a26.9 26.9 0 0 0 2.1-1.24 3.21 3.21 0 0 0 1.28-1.45l-.94-.35.94.35a3 3 0 0 0 0-2.12l-.94.35.94-.35a3.21 3.21 0 0 0-1.27-1.45c-.53-.36-1.25-.76-2.11-1.24l-.05-.03-12.77-7.1Z"
  />
  <path
    fill="#2BEE6C"
    stroke="#fff"
    stroke-width="2"
    d="m30.49 19.13-.49-.27-.49.27-12.77 7.1-.05.02c-.86.48-1.58.88-2.1 1.24-.54.37-1.04.81-1.28 1.45a3 3 0 0 0 0 2.12c.24.63.74 1.08 1.27 1.45.53.36 1.25.76 2.11 1.24l.05.03 6.33 3.51.17.1c2.33 1.3 3.72 2.06 5.22 2.32a9 9 0 0 0 3.08 0c1.5-.26 2.9-1.03 5.22-2.32l.18-.1 6.32-3.51.05-.03a26.9 26.9 0 0 0 2.1-1.24 3.21 3.21 0 0 0 1.28-1.45l-.94-.35.94.35a3 3 0 0 0 0-2.12l-.94.35.94-.35a3.21 3.21 0 0 0-1.27-1.45c-.53-.36-1.25-.76-2.11-1.24l-.05-.03-12.77-7.1Z"
  />
  <path
    fill="#86F999"
    stroke="#fff"
    stroke-width="2"
    d="m46.69 21.06-.94-.35.94.35a3 3 0 0 0 0-2.12l-.94.35.94-.35a3.21 3.21 0 0 0-1.27-1.45c-.53-.36-1.25-.76-2.11-1.24l-.05-.03-6.32-3.51-.18-.1c-2.33-1.3-3.72-2.06-5.22-2.33a9 9 0 0 0-3.08 0c-1.5.27-2.9 1.04-5.22 2.33l-.17.1-6.33 3.51-.05.03c-.86.48-1.58.88-2.1 1.24-.54.37-1.04.81-1.28 1.45a3 3 0 0 0 0 2.12c.24.63.74 1.08 1.27 1.45.53.36 1.25.76 2.11 1.24l.05.03 6.33 3.51.17.1c2.33 1.3 3.72 2.06 5.22 2.32a9 9 0 0 0 3.08 0c1.5-.26 2.9-1.03 5.22-2.32l.18-.1 6.32-3.51.05-.03a26.9 26.9 0 0 0 2.1-1.24 3.21 3.21 0 0 0 1.28-1.45Z"
  />
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="2.5" />
</svg>`,ut=n.JW`<svg fill="none" viewBox="0 0 60 60">
  <rect width="60" height="60" fill="#C653C6" rx="3" />
  <path
    fill="#fff"
    d="M20.03 15.22C20 15.6 20 16.07 20 17v2.8c0 1.14 0 1.7-.2 2.12-.15.31-.3.5-.58.71-.37.28-1.06.42-2.43.7-.59.12-1.11.29-1.6.51a9 9 0 0 0-4.35 4.36C10 30 10 32.34 10 37c0 4.66 0 7 .84 8.8a9 9 0 0 0 4.36 4.36C17 51 19.34 51 24 51h12c4.66 0 7 0 8.8-.84a9 9 0 0 0 4.36-4.36C50 44 50 41.66 50 37c0-4.66 0-7-.84-8.8a9 9 0 0 0-4.36-4.36c-.48-.22-1-.39-1.6-.5-1.36-.29-2.05-.43-2.42-.7-.27-.22-.43-.4-.58-.72-.2-.42-.2-.98-.2-2.11V17c0-.93 0-1.4-.03-1.78a9 9 0 0 0-8.19-8.19C31.4 7 30.93 7 30 7s-1.4 0-1.78.03a9 9 0 0 0-8.19 8.19Z"
  />
  <path
    fill="#E87DE8"
    d="M22 17c0-.93 0-1.4.04-1.78a7 7 0 0 1 6.18-6.18C28.6 9 29.07 9 30 9s1.4 0 1.78.04a7 7 0 0 1 6.18 6.18c.04.39.04.85.04 1.78v4.5a1.5 1.5 0 0 1-3 0V17c0-.93 0-1.4-.08-1.78a4 4 0 0 0-3.14-3.14C31.39 12 30.93 12 30 12s-1.4 0-1.78.08a4 4 0 0 0-3.14 3.14c-.08.39-.08.85-.08 1.78v4.5a1.5 1.5 0 0 1-3 0V17Z"
  />
  <path
    fill="#E87DE8"
    fill-rule="evenodd"
    d="M12 36.62c0-4.32 0-6.48.92-8.09a7 7 0 0 1 2.61-2.61C17.14 25 19.3 25 23.62 25h6.86c.46 0 .7 0 .9.02 2.73.22 4.37 2.43 4.62 4.98.27-2.7 2.11-5 5.02-5A6.98 6.98 0 0 1 48 31.98v5.4c0 4.32 0 6.48-.92 8.09a7 7 0 0 1-2.61 2.61c-1.61.92-3.77.92-8.09.92h-5.86c-.46 0-.7 0-.9-.02-2.73-.22-4.37-2.43-4.62-4.98-.26 2.58-1.94 4.82-4.71 4.99l-.7.01c-.55 0-.82 0-1.05-.02a7 7 0 0 1-6.52-6.52c-.02-.23-.02-.5-.02-1.05v-4.79Zm21.24-.27a4 4 0 1 0-6.48 0 31.28 31.28 0 0 1 1.57 2.23c.17.4.17.81.17 1.24V42.5a1.5 1.5 0 0 0 3 0V39.82c0-.43 0-.85.17-1.24.09-.2.58-.87 1.57-2.23Z"
    clip-rule="evenodd"
  />
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="2.5" />
</svg>`,ht=n.JW`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <path
      fill="#EB8B47"
      d="M0 24.9c0-9.25 0-13.88 1.97-17.33a15 15 0 0 1 5.6-5.6C11.02 0 15.65 0 24.9 0h10.2c9.25 0 13.88 0 17.33 1.97a15 15 0 0 1 5.6 5.6C60 11.02 60 15.65 60 24.9v10.2c0 9.25 0 13.88-1.97 17.33a15 15 0 0 1-5.6 5.6C48.98 60 44.35 60 35.1 60H24.9c-9.25 0-13.88 0-17.33-1.97a15 15 0 0 1-5.6-5.6C0 48.98 0 44.35 0 35.1V24.9Z"
    />
    <path
      stroke="#062B2B"
      stroke-opacity=".1"
      d="M.5 24.9c0-4.64 0-8.08.24-10.8.25-2.7.73-4.65 1.66-6.28A14.5 14.5 0 0 1 7.82 2.4C9.46 1.47 11.39 1 14.1.74A133 133 0 0 1 24.9.5h10.2c4.63 0 8.08 0 10.8.24 2.7.25 4.65.73 6.28 1.66a14.5 14.5 0 0 1 5.42 5.42c.93 1.63 1.41 3.57 1.66 6.28.24 2.72.24 6.16.24 10.8v10.2c0 4.63 0 8.08-.24 10.8-.25 2.7-.73 4.64-1.66 6.28a14.5 14.5 0 0 1-5.42 5.41c-1.63.94-3.57 1.42-6.28 1.67-2.72.24-6.17.24-10.8.24H24.9c-4.63 0-8.08 0-10.8-.24-2.7-.25-4.64-.73-6.28-1.67a14.5 14.5 0 0 1-5.42-5.4C1.47 50.53 1 48.6.74 45.88A133 133 0 0 1 .5 35.1V24.9Z"
    />
    <path
      fill="#FF974C"
      stroke="#fff"
      stroke-width="2"
      d="M39.2 29.2a13 13 0 1 0-18.4 0l1.3 1.28a12.82 12.82 0 0 1 2.1 2.39 6 6 0 0 1 .6 1.47c.2.76.2 1.56.2 3.17v11.24c0 1.08 0 1.61.13 2.12a4 4 0 0 0 .41.98c.26.45.64.83 1.4 1.6l.3.29c.65.65.98.98 1.36 1.09.26.07.54.07.8 0 .38-.11.7-.44 1.36-1.1l3.48-3.47c.65-.65.98-.98 1.09-1.36a1.5 1.5 0 0 0 0-.8c-.1-.38-.44-.7-1.1-1.36l-.47-.48c-.65-.65-.98-.98-1.09-1.36a1.5 1.5 0 0 1 0-.8c.1-.38.44-.7 1.1-1.36l.47-.48c.65-.65.98-.98 1.09-1.36a1.5 1.5 0 0 0 0-.8c-.1-.38-.44-.7-1.1-1.36l-.48-.5c-.65-.64-.98-.97-1.08-1.35a1.5 1.5 0 0 1 0-.79c.1-.38.42-.7 1.06-1.36l5.46-5.55Z"
    />
    <circle cx="30" cy="17" r="4" fill="#EB8B47" stroke="#fff" stroke-width="2" />
  </g>
  <defs>
    <clipPath id="a"><path fill="#fff" d="M0 0h60v60H0z" /></clipPath>
  </defs>
</svg> `,dt=n.JW`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <rect width="60" height="60" fill="#00ACE6" rx="30" />
    <circle cx="64" cy="39" r="50" fill="#1AC6FF" stroke="#fff" stroke-width="2" />
    <circle cx="78" cy="30" r="50" fill="#4DD2FF" stroke="#fff" stroke-width="2" />
    <circle cx="72" cy="15" r="35" fill="#80DFFF" stroke="#fff" stroke-width="2" />
    <circle cx="34" cy="-17" r="45" stroke="#fff" stroke-width="2" />
    <circle cx="34" cy="-5" r="50" stroke="#fff" stroke-width="2" />
    <circle cx="30" cy="45" r="4" fill="#4DD2FF" stroke="#fff" stroke-width="2" />
    <circle cx="39.5" cy="27.5" r="4" fill="#80DFFF" stroke="#fff" stroke-width="2" />
    <circle cx="16" cy="24" r="4" fill="#19C6FF" stroke="#fff" stroke-width="2" />
  </g>
  <rect width="59" height="59" x=".5" y=".5" stroke="#062B2B" stroke-opacity=".1" rx="29.5" />
  <defs>
    <clipPath id="a"><rect width="60" height="60" fill="#fff" rx="30" /></clipPath>
  </defs>
</svg>`,ft=n.JW`<svg fill="none" viewBox="0 0 60 60">
  <g clip-path="url(#a)">
    <rect width="60" height="60" fill="#C653C6" rx="3" />
    <path
      fill="#E87DE8"
      stroke="#fff"
      stroke-width="2"
      d="M52.1 47.34c0-4.24-1.44-9.55-5.9-12.4a2.86 2.86 0 0 0-1.6-3.89v-.82c0-1.19-.52-2.26-1.35-3a4.74 4.74 0 0 0-2.4-6.26v-5.5a11.31 11.31 0 1 0-22.63 0v2.15a3.34 3.34 0 0 0-1.18 5.05 4.74 4.74 0 0 0-.68 6.44A5.22 5.22 0 0 0 14 35.92c-3.06 4.13-6.1 8.3-6.1 15.64 0 2.67.37 4.86.74 6.39a20.3 20.3 0 0 0 .73 2.39l.02.04v.01l.92-.39-.92.4.26.6h38.26l.3-.49-.87-.51.86.5.02-.01.03-.07a16.32 16.32 0 0 0 .57-1.05c.36-.72.85-1.74 1.33-2.96a25.51 25.51 0 0 0 1.94-9.07Z"
    />
    <path
      fill="#fff"
      fill-rule="evenodd"
      d="M26.5 29.5c-3-.5-5.5-3-5.5-7v-7c0-.47 0-.7.03-.9a3 3 0 0 1 2.58-2.57c.2-.03.42-.03.89-.03 2 0 2.5-2.5 2.5-2.5s0 2.5 2.5 2.5c1.4 0 2.1 0 2.65.23a3 3 0 0 1 1.62 1.62c.23.55.23 1.25.23 2.65v6c0 4-3 7-6.5 7 1.35.23 4 0 6.5-2v9.53C34 38.5 31.5 40 28 40s-6-1.5-6-2.97L24 34l2.5 1.5v-6ZM26 47h4.5c2.5 0 3 4 3 5.5h-3l-1-1.5H26v-4Zm-6.25 5.5H24V57h-8c0-1 1-4.5 3.75-4.5Z"
      clip-rule="evenodd"
    />
  </g>
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="2.5" />
  <defs>
    <clipPath id="a"><rect width="60" height="60" fill="#fff" rx="3" /></clipPath>
  </defs>
</svg> `,pt=n.JW`<svg fill="none" viewBox="0 0 60 60">
  <rect width="60" height="60" fill="#794CFF" rx="3" />
  <path
    fill="#987DE8"
    stroke="#fff"
    stroke-width="2"
    d="M33 22.5v-1H16v5H8.5V36H13v-5h3v7.5h17V31h1v7.5h17v-17H34v5h-1v-4Z"
  />
  <path fill="#fff" d="M37.5 25h10v10h-10z" />
  <path fill="#4019B2" d="M42.5 25h5v10h-5z" />
  <path fill="#fff" d="M19.5 25h10v10h-10z" />
  <path fill="#4019B2" d="M24.5 25h5v10h-5z" />
  <path fill="#fff" d="M12 30.5h4V37h-4v-6.5Z" />
  <rect width="59" height="59" x=".5" y=".5" stroke="#fff" stroke-opacity=".1" rx="2.5" />
</svg>`,gt=n.JW`<svg
  viewBox="0 0 60 60"
  fill="none"
>
  <g clip-path="url(#1)">
    <rect width="60" height="60" rx="30" fill="#00ACE6" />
    <path
      d="M59 73C59 89.0163 46.0163 102 30 102C13.9837 102 1 89.0163 1 73C1 56.9837 12 44 30 44C48 44 59 56.9837 59 73Z"
      fill="#1AC6FF"
      stroke="white"
      stroke-width="2"
    />
    <path
      d="M18.6904 19.9015C19.6264 15.3286 23.3466 11.8445 27.9708 11.2096C29.3231 11.024 30.6751 11.0238 32.0289 11.2096C36.6532 11.8445 40.3733 15.3286 41.3094 19.9015C41.4868 20.7681 41.6309 21.6509 41.7492 22.5271C41.8811 23.5041 41.8811 24.4944 41.7492 25.4715C41.6309 26.3476 41.4868 27.2304 41.3094 28.097C40.3733 32.6699 36.6532 36.154 32.0289 36.7889C30.6772 36.9744 29.3216 36.9743 27.9708 36.7889C23.3466 36.154 19.6264 32.6699 18.6904 28.097C18.513 27.2304 18.3689 26.3476 18.2506 25.4715C18.1186 24.4944 18.1186 23.5041 18.2506 22.5271C18.3689 21.6509 18.513 20.7681 18.6904 19.9015Z"
      fill="#1AC6FF"
      stroke="white"
      stroke-width="2"
    />
    <circle cx="24.5" cy="23.5" r="1.5" fill="white" />
    <circle cx="35.5" cy="23.5" r="1.5" fill="white" />
    <path
      d="M31 20L28 28H32"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </g>
  <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" stroke="white" stroke-opacity="0.1" />
  <defs>
    <clipPath id="1">
      <rect width="60" height="60" rx="30" fill="white" />
    </clipPath>
  </defs>
</svg> `,mt=n.JW`<svg viewBox="0 0 60 60" fill="none">
  <g clip-path="url(#1)">
    <path
      d="M0 24.9C0 15.6485 0 11.0228 1.97053 7.56812C3.3015 5.23468 5.23468 3.3015 7.56812 1.97053C11.0228 0 15.6485 0 24.9 0H35.1C44.3514 0 48.9772 0 52.4319 1.97053C54.7653 3.3015 56.6985 5.23468 58.0295 7.56812C60 11.0228 60 15.6485 60 24.9V35.1C60 44.3514 60 48.9772 58.0295 52.4319C56.6985 54.7653 54.7653 56.6985 52.4319 58.0295C48.9772 60 44.3514 60 35.1 60H24.9C15.6485 60 11.0228 60 7.56812 58.0295C5.23468 56.6985 3.3015 54.7653 1.97053 52.4319C0 48.9772 0 44.3514 0 35.1V24.9Z"
      fill="#794CFF"
    />
    <path
      d="M0.5 24.9C0.5 20.2652 0.50047 16.8221 0.744315 14.105C0.987552 11.3946 1.46987 9.45504 2.40484 7.81585C3.69145 5.56019 5.56019 3.69145 7.81585 2.40484C9.45504 1.46987 11.3946 0.987552 14.105 0.744315C16.8221 0.50047 20.2652 0.5 24.9 0.5H35.1C39.7348 0.5 43.1779 0.50047 45.895 0.744315C48.6054 0.987552 50.545 1.46987 52.1841 2.40484C54.4398 3.69145 56.3086 5.56019 57.5952 7.81585C58.5301 9.45504 59.0124 11.3946 59.2557 14.105C59.4995 16.8221 59.5 20.2652 59.5 24.9V35.1C59.5 39.7348 59.4995 43.1779 59.2557 45.895C59.0124 48.6054 58.5301 50.545 57.5952 52.1841C56.3086 54.4398 54.4398 56.3086 52.1841 57.5952C50.545 58.5301 48.6054 59.0124 45.895 59.2557C43.1779 59.4995 39.7348 59.5 35.1 59.5H24.9C20.2652 59.5 16.8221 59.4995 14.105 59.2557C11.3946 59.0124 9.45504 58.5301 7.81585 57.5952C5.56019 56.3086 3.69145 54.4398 2.40484 52.1841C1.46987 50.545 0.987552 48.6054 0.744315 45.895C0.50047 43.1779 0.5 39.7348 0.5 35.1V24.9Z"
      stroke="#062B2B"
      stroke-opacity="0.1"
    />
    <path
      d="M35.1403 31.5016C35.1193 30.9637 35.388 30.4558 35.8446 30.1707C36.1207 29.9982 36.4761 29.8473 36.7921 29.7685C37.3143 29.6382 37.8664 29.7977 38.2386 30.1864C38.8507 30.8257 39.3004 31.6836 39.8033 32.408C40.2796 33.0942 41.4695 33.2512 41.9687 32.5047C42.4839 31.7341 42.9405 30.8229 43.572 30.1399C43.9375 29.7447 44.4866 29.5756 45.0111 29.6967C45.3283 29.7701 45.6863 29.9147 45.9655 30.0823C46.4269 30.3595 46.7045 30.8626 46.6928 31.4008C46.6731 32.3083 46.3764 33.2571 46.2158 34.1473C46.061 35.0048 46.9045 35.8337 47.7592 35.664C48.6464 35.4878 49.5899 35.1747 50.497 35.1391C51.0348 35.1181 51.5427 35.3868 51.8279 35.8433C52.0004 36.1195 52.1513 36.4749 52.2301 36.7908C52.3604 37.3131 52.2009 37.8651 51.8121 38.2374C51.1729 38.8495 50.3151 39.2991 49.5908 39.8019C48.9046 40.2782 48.7473 41.4683 49.4939 41.9675C50.2644 42.4827 51.1757 42.9393 51.8587 43.5708C52.2539 43.9362 52.423 44.4854 52.3018 45.0099C52.2285 45.3271 52.0839 45.6851 51.9162 45.9642C51.6391 46.4257 51.1359 46.7032 50.5978 46.6916C49.6903 46.6719 48.7417 46.3753 47.8516 46.2146C46.9939 46.0598 46.1648 46.9035 46.3346 47.7583C46.5108 48.6454 46.8239 49.5888 46.8594 50.4958C46.8805 51.0336 46.6117 51.5415 46.1552 51.8267C45.879 51.9992 45.5236 52.15 45.2077 52.2289C44.6854 52.3592 44.1334 52.1997 43.7611 51.8109C43.1491 51.1718 42.6996 50.314 42.1968 49.5897C41.7203 48.9034 40.5301 48.7463 40.0309 49.493C39.5157 50.2634 39.0592 51.1746 38.4278 51.8574C38.0623 52.2527 37.5132 52.4218 36.9887 52.3006C36.6715 52.2273 36.3135 52.0826 36.0343 51.915C35.5729 51.6379 35.2953 51.1347 35.307 50.5966C35.3267 49.6891 35.6233 48.7405 35.7839 47.8505C35.9388 46.9928 35.0951 46.1636 34.2402 46.3334C33.3531 46.5096 32.4098 46.8227 31.5028 46.8582C30.9649 46.8793 30.457 46.6105 30.1719 46.154C29.9994 45.8778 29.8485 45.5224 29.7697 45.2065C29.6394 44.6842 29.7989 44.1322 30.1877 43.7599C30.8269 43.1479 31.6847 42.6982 32.4091 42.1954C33.0954 41.7189 33.2522 40.5289 32.5056 40.0297C31.7351 39.5145 30.824 39.058 30.1411 38.4265C29.7459 38.0611 29.5768 37.5119 29.698 36.9875C29.7713 36.6702 29.9159 36.3122 30.0836 36.0331C30.3607 35.5717 30.8638 35.2941 31.402 35.3058C32.3095 35.3255 33.2583 35.6221 34.1485 35.7828C35.006 35.9376 35.8349 35.094 35.6652 34.2393C35.489 33.3521 35.1759 32.4087 35.1403 31.5016Z"
      fill="#906EF7"
      stroke="white"
      stroke-width="2"
    />
    <path
      d="M20.7706 8.22357C20.9036 7.51411 21.5231 7 22.2449 7H23.7551C24.4769 7 25.0964 7.51411 25.2294 8.22357C25.5051 9.69403 25.4829 11.6321 27.1202 12.2606C27.3092 12.3331 27.4958 12.4105 27.6798 12.4926C29.2818 13.2072 30.6374 11.8199 31.8721 10.9752C32.4678 10.5676 33.2694 10.6421 33.7798 11.1525L34.8477 12.2204C35.3581 12.7308 35.4326 13.5323 35.025 14.128C34.1802 15.3627 32.7931 16.7183 33.5077 18.3202C33.5898 18.5043 33.6672 18.6909 33.7398 18.88C34.3683 20.5171 36.3061 20.4949 37.7764 20.7706C38.4859 20.9036 39 21.5231 39 22.2449V23.7551C39 24.4769 38.4859 25.0964 37.7764 25.2294C36.3061 25.5051 34.3685 25.483 33.7401 27.1201C33.6675 27.3093 33.59 27.4961 33.5079 27.6803C32.7934 29.282 34.1803 30.6374 35.025 31.8719C35.4326 32.4677 35.3581 33.2692 34.8477 33.7796L33.7798 34.8475C33.2694 35.3579 32.4678 35.4324 31.8721 35.0248C30.6376 34.1801 29.2823 32.7934 27.6806 33.508C27.4962 33.5903 27.3093 33.6678 27.12 33.7405C25.483 34.3688 25.5051 36.3062 25.2294 37.7764C25.0964 38.4859 24.4769 39 23.7551 39H22.2449C21.5231 39 20.9036 38.4859 20.7706 37.7764C20.4949 36.3062 20.517 34.3688 18.88 33.7405C18.6908 33.6678 18.5039 33.5903 18.3196 33.5081C16.7179 32.7936 15.3625 34.1804 14.1279 35.0251C13.5322 35.4327 12.7307 35.3582 12.2203 34.8478L11.1524 33.7799C10.642 33.2695 10.5675 32.4679 10.9751 31.8722C11.8198 30.6376 13.2067 29.2822 12.4922 27.6804C12.41 27.4962 12.3325 27.3093 12.2599 27.1201C11.6315 25.483 9.69392 25.5051 8.22357 25.2294C7.51411 25.0964 7 24.4769 7 23.7551V22.2449C7 21.5231 7.51411 20.9036 8.22357 20.7706C9.69394 20.4949 11.6317 20.5171 12.2602 18.88C12.3328 18.6909 12.4103 18.5042 12.4924 18.3201C13.207 16.7181 11.8198 15.3625 10.975 14.1278C10.5674 13.5321 10.6419 12.7305 11.1523 12.2201L12.2202 11.1522C12.7306 10.6418 13.5322 10.5673 14.1279 10.9749C15.3626 11.8197 16.7184 13.2071 18.3204 12.4925C18.5044 12.4105 18.6909 12.3331 18.8799 12.2606C20.5171 11.6321 20.4949 9.69403 20.7706 8.22357Z"
      fill="#906EF7"
      stroke="white"
      stroke-width="2"
    />
    <circle cx="23" cy="23" r="6" fill="#794CFF" stroke="white" stroke-width="2" />
    <circle cx="41" cy="41" r="4" fill="#794CFF" stroke="white" stroke-width="2" />
  </g>
  <defs>
    <clipPath id="1">
      <rect width="60" height="60" fill="white" />
    </clipPath>
  </defs>
</svg> `,yt=n.JW`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <g clip-path="url(#clip0_187_29)">
    <path d="M1.18187e-05 15.8055C1.18187e-05 9.8015 -5.19442e-07 6.91338 1.69991e-08 0C4.5 3.72236e-05 9.62249 0 16.5 0L23.5 4.31399e-05C29.9349 4.31399e-05 35.5 0.000206332 40 3.73468e-05C40 2.77754 40 9.36708 40 15.8055V22.8364C40 29.2647 40 33.7962 40 40C31.5 40 29.8337 40 23.4 40H16.6C10.5092 40 6.50004 40 4.04289e-05 40C3.05176e-05 32.2453 1.18187e-05 29.6382 1.18187e-05 22.8364V15.8055Z" fill="#0052FF"/>
    <path d="M20.0236 26.5C16.4342 26.5 13.5236 23.5931 13.5236 20C13.5236 16.4069 16.4342 13.5 20.0236 13.5C23.2411 13.5 25.9134 15.8472 26.4261 18.9167H32.9731C32.4206 12.2433 26.8342 7 20.02 7C12.8411 7 7.02002 12.8211 7.02002 20C7.02002 27.1789 12.8411 33 20.02 33C26.8342 33 32.4206 27.7567 32.9731 21.0833H26.4225C25.9061 24.1528 23.2411 26.5 20.0236 26.5Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_187_29">
      <rect width="40" height="40" fill="white"/>
    </clipPath>
  </defs>
</svg>`,wt=n.JW`
  <svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#a)">
      <path
        d="M0 16.6c0-6.168 0-9.251 1.314-11.555a10 10 0 0 1 3.731-3.731C7.35 0 10.432 0 16.6 0h6.8c6.168 0 9.252 0 11.555 1.314a10 10 0 0 1 3.731 3.731C40 7.35 40 10.432 40 16.6v6.8c0 6.168 0 9.252-1.314 11.555a10 10 0 0 1-3.731 3.731C32.652 40 29.568 40 23.4 40h-6.8c-6.168 0-9.251 0-11.555-1.314a10 10 0 0 1-3.731-3.731C0 32.652 0 29.568 0 23.4v-6.8Z"
        fill="#7D00FF"
      />
      <path
        d="M.5 16.6c0-3.093 0-5.38.162-7.182.161-1.795.48-3.061 1.086-4.125a9.5 9.5 0 0 1 3.545-3.545C6.357 1.141 7.623.823 9.418.662 11.221.5 13.508.5 16.6.5h6.8c3.093 0 5.38 0 7.182.162 1.795.161 3.062.48 4.125 1.086a9.5 9.5 0 0 1 3.545 3.545c.607 1.064.925 2.33 1.086 4.125.161 1.803.162 4.09.162 7.182v6.8c0 3.093 0 5.38-.162 7.182-.161 1.795-.48 3.062-1.086 4.125a9.5 9.5 0 0 1-3.545 3.545c-1.063.607-2.33.925-4.125 1.086-1.803.161-4.09.162-7.182.162h-6.8c-3.093 0-5.38 0-7.182-.162-1.795-.161-3.061-.48-4.125-1.086a9.5 9.5 0 0 1-3.545-3.545c-.607-1.063-.925-2.33-1.086-4.125C.5 28.779.5 26.492.5 23.4v-6.8Z"
        stroke="#fff"
        stroke-opacity=".05"
      />
      <path
        d="M28.306 15.381a3.69 3.69 0 1 0 0-7.381 3.69 3.69 0 0 0 0 7.381ZM16.987 32a8.991 8.991 0 1 1 .016-17.983A8.991 8.991 0 0 1 16.988 32Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="a"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    </defs>
  </svg>
`,bt=n.JW`
  <svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#a)">
      <path
        d="M0 16.6c0-6.168 0-9.251 1.314-11.555a10 10 0 0 1 3.731-3.731C7.35 0 10.432 0 16.6 0h6.8c6.168 0 9.252 0 11.555 1.314a10 10 0 0 1 3.731 3.731C40 7.35 40 10.432 40 16.6v6.8c0 6.168 0 9.252-1.314 11.555a10 10 0 0 1-3.731 3.731C32.652 40 29.568 40 23.4 40h-6.8c-6.168 0-9.251 0-11.555-1.314a10 10 0 0 1-3.731-3.731C0 32.652 0 29.568 0 23.4v-6.8Z"
        fill="#635BFF"
      />
      <path
        d="M.5 16.6c0-3.093 0-5.38.162-7.182.161-1.795.48-3.061 1.086-4.125a9.5 9.5 0 0 1 3.545-3.545C6.357 1.141 7.623.823 9.418.662 11.221.5 13.508.5 16.6.5h6.8c3.093 0 5.38 0 7.182.162 1.795.161 3.062.48 4.125 1.086a9.5 9.5 0 0 1 3.545 3.545c.607 1.064.925 2.33 1.086 4.125.161 1.803.162 4.09.162 7.182v6.8c0 3.093 0 5.38-.162 7.182-.161 1.795-.48 3.062-1.086 4.125a9.5 9.5 0 0 1-3.545 3.545c-1.063.607-2.33.925-4.125 1.086-1.803.161-4.09.162-7.182.162h-6.8c-3.093 0-5.38 0-7.182-.162-1.795-.161-3.061-.48-4.125-1.086a9.5 9.5 0 0 1-3.545-3.545c-.607-1.063-.925-2.33-1.086-4.125C.5 28.779.5 26.492.5 23.4v-6.8Z"
        stroke="#fff"
        stroke-opacity=".05"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.299 15.147c0-1.028.844-1.424 2.242-1.424 2.004 0 4.536.607 6.54 1.688V9.213C24.892 8.343 22.73 8 20.541 8c-5.354 0-8.915 2.796-8.915 7.464 0 7.279 10.022 6.118 10.022 9.257 0 1.213-1.055 1.609-2.531 1.609-2.19 0-4.985-.897-7.2-2.11v6.277a18.283 18.283 0 0 0 7.2 1.503c5.485 0 9.257-2.716 9.257-7.437-.027-7.86-10.075-6.462-10.075-9.416Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="a"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    </defs>
  </svg>
`,vt=n.JW`
  <svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#a)">
      <path
        d="M0 16.6c0-6.168 0-9.251 1.314-11.555a10 10 0 0 1 3.731-3.731C7.35 0 10.432 0 16.6 0h6.8c6.168 0 9.252 0 11.555 1.314a10 10 0 0 1 3.731 3.731C40 7.35 40 10.432 40 16.6v6.8c0 6.168 0 9.252-1.314 11.555a10 10 0 0 1-3.731 3.731C32.652 40 29.568 40 23.4 40h-6.8c-6.168 0-9.251 0-11.555-1.314a10 10 0 0 1-3.731-3.731C0 32.652 0 29.568 0 23.4v-6.8Z"
        fill="#fff"
      />
      <path
        d="M.5 16.6c0-3.093 0-5.38.162-7.182.161-1.795.48-3.061 1.086-4.125a9.5 9.5 0 0 1 3.545-3.545C6.357 1.141 7.623.823 9.418.662 11.221.5 13.508.5 16.6.5h6.8c3.093 0 5.38 0 7.182.162 1.795.161 3.062.48 4.125 1.086a9.5 9.5 0 0 1 3.545 3.545c.607 1.064.925 2.33 1.086 4.125.161 1.803.162 4.09.162 7.182v6.8c0 3.093 0 5.38-.162 7.182-.161 1.795-.48 3.062-1.086 4.125a9.5 9.5 0 0 1-3.545 3.545c-1.063.607-2.33.925-4.125 1.086-1.803.161-4.09.162-7.182.162h-6.8c-3.093 0-5.38 0-7.182-.162-1.795-.161-3.061-.48-4.125-1.086a9.5 9.5 0 0 1-3.545-3.545c-.607-1.063-.925-2.33-1.086-4.125C.5 28.779.5 26.492.5 23.4v-6.8Z"
        stroke="#fff"
        stroke-opacity=".05"
      />
      <path
        d="M18.606 12.642a.781.781 0 0 0-.771.66l-1.281 8.125a.78.78 0 0 1 .77-.66h3.755a7.668 7.668 0 0 0 7.57-6.49 6.26 6.26 0 0 0 .075-.843c-.96-.504-2.089-.792-3.325-.792h-6.793Z"
        fill="#001C64"
      />
      <path
        d="M28.724 13.434c-.006.282-.03.564-.075.843a7.668 7.668 0 0 1-7.57 6.491h-3.754a.78.78 0 0 0-.771.66l-1.916 12.15a.634.634 0 0 0 .626.734h4.075a.781.781 0 0 0 .77-.66l1.074-6.807a.781.781 0 0 1 .772-.66h2.4a7.668 7.668 0 0 0 7.57-6.491c.415-2.651-.92-5.064-3.201-6.26Z"
        fill="#0070E0"
      />
      <path
        d="M13.977 7.226a.78.78 0 0 0-.771.658l-3.198 20.277a.634.634 0 0 0 .626.733h4.742l1.178-7.467 1.281-8.125a.782.782 0 0 1 .771-.66H25.4c1.237 0 2.364.289 3.325.792.065-3.4-2.74-6.208-6.599-6.208h-8.148Z"
        fill="#003087"
      />
    </g>
    <defs>
      <clipPath id="a"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    </defs>
  </svg>
`,At=n.JW`<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
<g clip-path="url(#clip0_13859_31161)">
  <path d="M0 24.8995C0 15.6481 0 11.0223 1.97053 7.56763C3.3015 5.2342 5.23468 3.30101 7.56812 1.97004C11.0228 -0.000488281 15.6485 -0.000488281 24.9 -0.000488281H35.1C44.3514 -0.000488281 48.9772 -0.000488281 52.4319 1.97004C54.7653 3.30101 56.6985 5.2342 58.0295 7.56763C60 11.0223 60 15.6481 60 24.8995V35.0995C60 44.351 60 48.9767 58.0295 52.4314C56.6985 54.7648 54.7653 56.698 52.4319 58.029C48.9772 59.9995 44.3514 59.9995 35.1 59.9995H24.9C15.6485 59.9995 11.0228 59.9995 7.56812 58.029C5.23468 56.698 3.3015 54.7648 1.97053 52.4314C0 48.9767 0 44.351 0 35.0995V24.8995Z" fill="#EB8B47"/>
  <path d="M0.5 24.8995C0.5 20.2647 0.50047 16.8216 0.744315 14.1045C0.987552 11.3941 1.46987 9.45455 2.40484 7.81536C3.69145 5.55971 5.56019 3.69096 7.81585 2.40435C9.45504 1.46938 11.3946 0.987064 14.105 0.743826C16.8221 0.499981 20.2652 0.499512 24.9 0.499512H35.1C39.7348 0.499512 43.1779 0.499981 45.895 0.743826C48.6054 0.987064 50.545 1.46938 52.1841 2.40435C54.4398 3.69096 56.3086 5.55971 57.5952 7.81536C58.5301 9.45455 59.0124 11.3941 59.2557 14.1045C59.4995 16.8216 59.5 20.2647 59.5 24.8995V35.0995C59.5 39.7343 59.4995 43.1774 59.2557 45.8945C59.0124 48.6049 58.5301 50.5445 57.5952 52.1837C56.3086 54.4393 54.4398 56.3081 52.1841 57.5947C50.545 58.5296 48.6054 59.012 45.895 59.2552C43.1779 59.499 39.7348 59.4995 35.1 59.4995H24.9C20.2652 59.4995 16.8221 59.499 14.105 59.2552C11.3946 59.012 9.45504 58.5296 7.81585 57.5947C5.56019 56.3081 3.69145 54.4393 2.40484 52.1837C1.46987 50.5445 0.987552 48.6049 0.744315 45.8945C0.50047 43.1774 0.5 39.7343 0.5 35.0995V24.8995Z" stroke="#141414" stroke-opacity="0.1"/>
  <path d="M13 26.0335C13 21.7838 13 19.659 14.0822 18.1694C14.4318 17.6883 14.8548 17.2653 15.3359 16.9157C16.8255 15.8335 18.9503 15.8335 23.2 15.8335H36.8C41.0497 15.8335 43.1745 15.8335 44.6641 16.9157C45.1452 17.2653 45.5682 17.6883 45.9178 18.1694C47 19.659 47 21.7838 47 26.0335V33.9668C47 38.2165 47 40.3414 45.9178 41.831C45.5682 42.312 45.1452 42.7351 44.6641 43.0846C43.1745 44.1668 41.0497 44.1668 36.8 44.1668H23.2C18.9503 44.1668 16.8255 44.1668 15.3359 43.0846C14.8548 42.7351 14.4318 42.312 14.0822 41.831C13 40.3414 13 38.2165 13 33.9668V26.0335Z" fill="#FF974C" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M39.5 36.667H36.6666" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M45.2 23.0645H14.8C14.0501 23.0645 13.6751 23.0645 13.4122 23.2554C13.3273 23.3171 13.2527 23.3918 13.191 23.4767C13 23.7395 13 24.1145 13 24.8645V27.2645C13 28.0144 13 28.3894 13.191 28.6522C13.2527 28.7371 13.3273 28.8118 13.4122 28.8735C13.6751 29.0645 14.0501 29.0645 14.8 29.0645H45.2C45.9499 29.0645 46.3249 29.0645 46.5878 28.8735C46.6727 28.8118 46.7473 28.7371 46.809 28.6522C47 28.3894 47 28.0144 47 27.2645V24.8645C47 24.1145 47 23.7395 46.809 23.4767C46.7473 23.3918 46.6727 23.3171 46.5878 23.2554C46.3249 23.0645 45.9499 23.0645 45.2 23.0645Z" fill="white" fill-opacity="0.4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
  <clipPath id="clip0_13859_31161">
    <rect width="60" height="60" fill="white"/>
  </clipPath>
</defs>
</svg>`,Et=n.JW`<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="30" fill="#1DC956"/>
  <rect x="0.5" y="0.5" width="63" height="63" rx="29.5" stroke="#141414" stroke-opacity="0.1"/>
  <path d="M32.4053 19.8031C35.3901 19.8031 38.0431 20.8349 40.1619 22.8247L45.9656 17.0211C42.4465 13.7416 37.8773 11.7333 32.4053 11.7333C24.4829 11.7333 17.6475 16.2841 14.3127 22.9168L21.056 28.1493C22.6589 23.359 27.136 19.8031 32.4053 19.8031Z" fill="#1DC956" stroke="white" stroke-width="2" stroke-linejoin="round"/>
  <path d="M32.4053 52.2667C37.8773 52.2667 42.465 50.4611 45.8182 47.3658L39.2407 42.2623C37.4351 43.4783 35.1321 44.2153 32.4053 44.2153C27.136 44.2153 22.6589 40.6594 21.056 35.8691L14.3127 41.1016C17.6475 47.7159 24.4829 52.2667 32.4053 52.2667Z" fill="#2BEE6C"/>
  <path d="M21.056 35.8507L19.5636 36.993L14.3127 41.0832M39.2407 42.2623L45.8182 47.3658C42.465 50.4611 37.8773 52.2667 32.4053 52.2667C24.4829 52.2667 17.6475 47.7159 14.3127 41.1016L21.056 35.8691C22.6589 40.6594 27.136 44.2153 32.4053 44.2153C35.1321 44.2153 37.4351 43.4783 39.2407 42.2623Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
  <path d="M51.8613 32.4606C51.8613 31.0235 51.7323 29.6417 51.4928 28.3151H32.4053V36.1638H43.3124C42.8334 38.688 41.3963 40.8252 39.2407 42.2623L45.8181 47.3658C49.6503 43.8283 51.8613 38.6327 51.8613 32.4606Z" fill="#1FAD7E" stroke="white" stroke-width="2" stroke-linejoin="round"/>
  <path d="M21.056 35.8507C20.6507 34.6347 20.4111 33.345 20.4111 32C20.4111 30.655 20.6507 29.3653 21.056 28.1493L14.3127 22.9169C12.9309 25.6437 12.1387 28.7205 12.1387 32C12.1387 35.2795 12.9309 38.3564 14.3127 41.0831L19.5636 36.993L21.056 35.8507Z" fill="#86F999"/>
  <path d="M21.056 35.8691L14.3127 41.1016M21.056 35.8507C20.6507 34.6347 20.4111 33.345 20.4111 32C20.4111 30.655 20.6507 29.3653 21.056 28.1493L14.3127 22.9169C12.9309 25.6437 12.1387 28.7205 12.1387 32C12.1387 35.2795 12.9309 38.3564 14.3127 41.0831L19.5636 36.993L21.056 35.8507Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
</svg>
`,xt=n.JW`<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_241_31635)">
    <path d="M0 26.5595C0 16.6913 0 11.7572 2.1019 8.07217C3.5216 5.58317 5.58366 3.52111 8.07266 2.10141C11.7577 -0.000488281 16.6918 -0.000488281 26.56 -0.000488281H37.44C47.3082 -0.000488281 52.2423 -0.000488281 55.9273 2.10141C58.4163 3.52111 60.4784 5.58317 61.8981 8.07217C64 11.7572 64 16.6913 64 26.5595V37.4395C64 47.3077 64 52.2418 61.8981 55.9268C60.4784 58.4158 58.4163 60.4779 55.9273 61.8976C52.2423 63.9995 47.3082 63.9995 37.44 63.9995H26.56C16.6918 63.9995 11.7577 63.9995 8.07266 61.8976C5.58366 60.4779 3.5216 58.4158 2.1019 55.9268C0 52.2418 0 47.3077 0 37.4395V26.5595Z" fill="#EB8B47"/>
    <path d="M0.5 26.5595C0.5 21.6163 0.50047 17.942 0.760736 15.0418C1.02039 12.1485 1.53555 10.0742 2.53621 8.3199C3.91155 5.90869 5.90917 3.91106 8.32039 2.53572C10.0747 1.53506 12.1489 1.01991 15.0423 0.760247C17.9425 0.499981 21.6168 0.499512 26.56 0.499512H37.44C42.3832 0.499512 46.0575 0.499981 48.9577 0.760247C51.8511 1.01991 53.9253 1.53506 55.6796 2.53572C58.0908 3.91106 60.0885 5.90869 61.4638 8.3199C62.4645 10.0742 62.9796 12.1485 63.2393 15.0418C63.4995 17.942 63.5 21.6163 63.5 26.5595V37.4395C63.5 42.3827 63.4995 46.057 63.2393 48.9572C62.9796 51.8506 62.4645 53.9248 61.4638 55.6791C60.0885 58.0903 58.0908 60.088 55.6796 61.4633C53.9253 62.464 51.8511 62.9791 48.9577 63.2388C46.0575 63.499 42.3832 63.4995 37.44 63.4995H26.56C21.6168 63.4995 17.9425 63.499 15.0423 63.2388C12.1489 62.9791 10.0747 62.464 8.32039 61.4633C5.90917 60.088 3.91155 58.0903 2.53621 55.6791C1.53555 53.9248 1.02039 51.8506 0.760736 48.9572C0.50047 46.057 0.5 42.3827 0.5 37.4395V26.5595Z" stroke="#141414" stroke-opacity="0.1"/>
    <path d="M28.1042 49.2329L13.1024 51.2077L15.0772 36.2059L37.1015 14.1815C39.2441 12.039 40.3154 10.9677 41.5718 10.624C42.4205 10.3918 43.3159 10.3918 44.1645 10.624C45.421 10.9677 46.4922 12.039 48.6348 14.1815L50.1286 15.6753C52.2711 17.8179 53.3424 18.8891 53.6861 20.1456C53.9183 20.9942 53.9183 21.8896 53.6861 22.7383C53.3424 23.9947 52.2711 25.066 50.1286 27.2086L28.1042 49.2329Z" fill="#FF974C" stroke="#E4E7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M38.5962 20.5376L22.4199 36.7139" stroke="#E4E7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M43.7727 25.714L27.5964 41.8903" stroke="#E4E7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22.3703 36.7635C19.3258 39.808 16.0198 36.6395 16.2616 35.0324" stroke="#E4E7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M27.5466 41.9399C24.5034 44.9831 28.155 48.7098 29.2738 48.0475" stroke="#E4E7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M27.5468 41.9398C23.428 46.0586 18.2516 40.8822 22.3704 36.7634" stroke="#E4E7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.8191 50.5214C15.4711 49.5823 14.728 48.8392 13.7889 48.4912" stroke="#E4E7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M49.2862 29.5805L34.7275 15.0219" stroke="#E4E7E7" stroke-width="2" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_241_31635">
      <rect width="64" height="64" fill="white"/>
    </clipPath>
  </defs>
</svg>
`,Ct=n.JW`<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_241_31636)">
    <path d="M0 26.5595C0 16.6913 0 11.7572 2.1019 8.07217C3.5216 5.58318 5.58366 3.52111 8.07266 2.10141C11.7577 -0.000488281 16.6918 -0.000488281 26.56 -0.000488281H37.44C47.3082 -0.000488281 52.2423 -0.000488281 55.9273 2.10141C58.4163 3.52111 60.4784 5.58318 61.8981 8.07217C64 11.7572 64 16.6913 64 26.5595V37.4395C64 47.3077 64 52.2418 61.8981 55.9269C60.4784 58.4159 58.4163 60.4779 55.9273 61.8976C52.2423 63.9995 47.3082 63.9995 37.44 63.9995H26.56C16.6918 63.9995 11.7577 63.9995 8.07266 61.8976C5.58366 60.4779 3.5216 58.4159 2.1019 55.9269C0 52.2418 0 47.3077 0 37.4395V26.5595Z" fill="#794CFF"/>
    <path d="M0.5 26.5595C0.5 21.6163 0.50047 17.942 0.760736 15.0418C1.02039 12.1485 1.53555 10.0742 2.53621 8.3199C3.91155 5.90869 5.90917 3.91106 8.32039 2.53572C10.0747 1.53506 12.1489 1.01991 15.0423 0.760247C17.9425 0.499981 21.6168 0.499512 26.56 0.499512H37.44C42.3832 0.499512 46.0575 0.499981 48.9577 0.760247C51.8511 1.01991 53.9253 1.53506 55.6796 2.53572C58.0908 3.91106 60.0885 5.90869 61.4638 8.3199C62.4645 10.0742 62.9796 12.1485 63.2393 15.0418C63.4995 17.942 63.5 21.6163 63.5 26.5595V37.4395C63.5 42.3827 63.4995 46.057 63.2393 48.9572C62.9796 51.8506 62.4645 53.9248 61.4638 55.6791C60.0885 58.0903 58.0908 60.088 55.6796 61.4633C53.9253 62.464 51.8511 62.9791 48.9577 63.2388C46.0575 63.499 42.3832 63.4995 37.44 63.4995H26.56C21.6168 63.4995 17.9425 63.499 15.0423 63.2388C12.1489 62.9791 10.0747 62.464 8.32039 61.4633C5.90917 60.088 3.91155 58.0903 2.53621 55.6791C1.53555 53.9248 1.02039 51.8506 0.760736 48.9572C0.50047 46.057 0.5 42.3827 0.5 37.4395V26.5595Z" stroke="#141414" stroke-opacity="0.1"/>
    <path d="M40 39.4595C44.7824 36.693 48 31.5222 48 25.6C48 16.7634 40.8366 9.59998 32 9.59998C23.1634 9.59998 16 16.7634 16 25.6C16 31.5222 19.2176 36.693 24 39.4595V45.8144H40V39.4595Z" fill="#906EF7"/>
    <path d="M24 49.9689C24 51.8192 24 52.7444 24.3941 53.4353C24.6603 53.902 25.0469 54.2886 25.5136 54.5548C26.2046 54.9489 27.1297 54.9489 28.98 54.9489H35.02C36.8703 54.9489 37.7954 54.9489 38.4864 54.5548C38.9531 54.2886 39.3397 53.902 39.6059 53.4353C40 52.7444 40 51.8192 40 49.9689V45.8144H24V49.9689Z" fill="#906EF7"/>
    <path d="M24 45.8144V39.4595C19.2176 36.693 16 31.5222 16 25.6C16 16.7634 23.1634 9.59998 32 9.59998C40.8366 9.59998 48 16.7634 48 25.6C48 31.5222 44.7824 36.693 40 39.4595V45.8144M24 45.8144H40M24 45.8144V49.9689C24 51.8192 24 52.7444 24.3941 53.4353C24.6603 53.902 25.0469 54.2886 25.5136 54.5548C26.2046 54.9489 27.1297 54.9489 28.98 54.9489H35.02C36.8703 54.9489 37.7954 54.9489 38.4864 54.5548C38.9531 54.2886 39.3397 53.902 39.6059 53.4353C40 52.7444 40 51.8192 40 49.9689V45.8144" stroke="white" stroke-width="2" stroke-linejoin="round"/>
    <path d="M24 49.9689C24 51.8192 24 52.7444 24.3941 53.4353C24.6603 53.902 25.0469 54.2886 25.5136 54.5548C26.2046 54.9489 27.1297 54.9489 28.98 54.9489H35.02C36.8703 54.9489 37.7954 54.9489 38.4864 54.5548C38.9531 54.2886 39.3397 53.902 39.6059 53.4353C40 52.7444 40 51.8192 40 49.9689V45.8144H24V49.9689Z" fill="#643CDD" stroke="white" stroke-width="2" stroke-linejoin="round"/>
    <path d="M29.6735 26.9101V29.1109H34.0753V26.9101C34.0753 25.6945 35.0607 24.7092 36.2762 24.7092C37.4917 24.7092 38.4771 25.6945 38.4771 26.9101C38.4771 28.1256 37.4917 29.1109 36.2762 29.1109H34.0753H29.6735H27.4726C26.2571 29.1109 25.2717 28.1256 25.2717 26.9101C25.2717 25.6945 26.2571 24.7092 27.4726 24.7092C28.6881 24.7092 29.6735 25.6945 29.6735 26.9101Z" fill="#906EF7"/>
    <path d="M29.6735 45.3183V26.9101C29.6735 25.6945 28.6881 24.7092 27.4726 24.7092V24.7092C26.2571 24.7092 25.2717 25.6945 25.2717 26.9101V26.9101C25.2717 28.1256 26.2571 29.1109 27.4726 29.1109H36.2762C37.4917 29.1109 38.4771 28.1256 38.4771 26.9101V26.9101C38.4771 25.6945 37.4917 24.7092 36.2762 24.7092V24.7092C35.0607 24.7092 34.0753 25.6945 34.0753 26.9101V45.3183" stroke="white" stroke-width="2" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_241_31636">
      <rect width="64" height="64" fill="white"/>
    </clipPath>
  </defs>
</svg>
`,St=n.AH`
  :host {
    display: block;
    width: var(--local-size);
    height: var(--local-size);
  }

  :host svg {
    width: 100%;
    height: 100%;
  }
`;var kt=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};const _t={browser:it,dao:st,defi:ot,defiAlt:at,eth:ct,layers:lt,lock:ut,login:ht,network:dt,nft:ft,noun:pt,profile:gt,system:mt,coinbase:yt,onrampCard:At,moonpay:wt,stripe:bt,paypal:vt,google:Et,pencil:xt,lightbulb:Ct};let It=class extends n.WF{constructor(){super(...arguments),this.name="browser",this.size="md"}render(){return this.style.cssText=`\n       --local-size: var(--wui-visual-size-${this.size});\n   `,n.qy`${_t[this.name]}`}};It.styles=[p,St],kt([(0,v.MZ)()],It.prototype,"name",void 0),kt([(0,v.MZ)()],It.prototype,"size",void 0),It=kt([y("wui-visual")],It);var Mt=r(31);const Tt={getSpacingStyles:(e,t)=>Array.isArray(e)?e[t]?`var(--wui-spacing-${e[t]})`:void 0:"string"==typeof e?`var(--wui-spacing-${e})`:void 0,getFormattedDate:e=>new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(e),getHostName(e){try{return new URL(e).hostname}catch(e){return""}},getTruncateString:({string:e,charsStart:t,charsEnd:r,truncate:n})=>e.length<=t+r?e:"end"===n?`${e.substring(0,t)}...`:"start"===n?`...${e.substring(e.length-r)}`:`${e.substring(0,Math.floor(t))}...${e.substring(e.length-Math.floor(r))}`,generateAvatarColors(e){const t=e.toLowerCase().replace(/^0x/iu,"").substring(0,6),r=this.hexToRgb(t),n=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),i=100-3*Number(n?.replace("px","")),s=`${i}% ${i}% at 65% 40%`,o=[];for(let e=0;e<5;e+=1){const t=this.tintColor(r,.15*e);o.push(`rgb(${t[0]}, ${t[1]}, ${t[2]})`)}return`\n    --local-color-1: ${o[0]};\n    --local-color-2: ${o[1]};\n    --local-color-3: ${o[2]};\n    --local-color-4: ${o[3]};\n    --local-color-5: ${o[4]};\n    --local-radial-circle: ${s}\n   `},hexToRgb(e){const t=parseInt(e,16);return[t>>16&255,t>>8&255,255&t]},tintColor(e,t){const[r,n,i]=e;return[Math.round(r+(255-r)*t),Math.round(n+(255-n)*t),Math.round(i+(255-i)*t)]},isNumber:e=>/^[0-9]+$/u.test(e),getColorTheme:e=>e||("undefined"!=typeof window&&window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":"dark"),splitBalance(e){const t=e.split(".");return 2===t.length?[t[0],t[1]]:["0","00"]},roundNumber:(e,t,r)=>e.toString().length>=t?Number(e).toFixed(r):e,formatNumberToLocalString:(e,t=2)=>void 0===e?"0.00":"number"==typeof e?e.toLocaleString("en-US",{maximumFractionDigits:t,minimumFractionDigits:t}):parseFloat(e).toLocaleString("en-US",{maximumFractionDigits:t,minimumFractionDigits:t})},Pt=n.AH`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;var Ot=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Rt=class extends n.WF{render(){return this.style.cssText=`\n      flex-direction: ${this.flexDirection};\n      flex-wrap: ${this.flexWrap};\n      flex-basis: ${this.flexBasis};\n      flex-grow: ${this.flexGrow};\n      flex-shrink: ${this.flexShrink};\n      align-items: ${this.alignItems};\n      justify-content: ${this.justifyContent};\n      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};\n      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};\n      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};\n      padding-top: ${this.padding&&Tt.getSpacingStyles(this.padding,0)};\n      padding-right: ${this.padding&&Tt.getSpacingStyles(this.padding,1)};\n      padding-bottom: ${this.padding&&Tt.getSpacingStyles(this.padding,2)};\n      padding-left: ${this.padding&&Tt.getSpacingStyles(this.padding,3)};\n      margin-top: ${this.margin&&Tt.getSpacingStyles(this.margin,0)};\n      margin-right: ${this.margin&&Tt.getSpacingStyles(this.margin,1)};\n      margin-bottom: ${this.margin&&Tt.getSpacingStyles(this.margin,2)};\n      margin-left: ${this.margin&&Tt.getSpacingStyles(this.margin,3)};\n    `,n.qy`<slot></slot>`}};Rt.styles=[p,Pt],Ot([(0,v.MZ)()],Rt.prototype,"flexDirection",void 0),Ot([(0,v.MZ)()],Rt.prototype,"flexWrap",void 0),Ot([(0,v.MZ)()],Rt.prototype,"flexBasis",void 0),Ot([(0,v.MZ)()],Rt.prototype,"flexGrow",void 0),Ot([(0,v.MZ)()],Rt.prototype,"flexShrink",void 0),Ot([(0,v.MZ)()],Rt.prototype,"alignItems",void 0),Ot([(0,v.MZ)()],Rt.prototype,"justifyContent",void 0),Ot([(0,v.MZ)()],Rt.prototype,"columnGap",void 0),Ot([(0,v.MZ)()],Rt.prototype,"rowGap",void 0),Ot([(0,v.MZ)()],Rt.prototype,"gap",void 0),Ot([(0,v.MZ)()],Rt.prototype,"padding",void 0),Ot([(0,v.MZ)()],Rt.prototype,"margin",void 0),Rt=Ot([y("wui-flex")],Rt);const Nt=n.AH`
  :host {
    display: block;
    width: var(--wui-icon-box-size-xl);
    height: var(--wui-icon-box-size-xl);
    border-radius: var(--wui-border-radius-3xl);
    box-shadow: 0 0 0 8px var(--wui-color-gray-glass-005);
    overflow: hidden;
    position: relative;
  }

  :host([data-variant='generated']) {
    --mixed-local-color-1: var(--local-color-1);
    --mixed-local-color-2: var(--local-color-2);
    --mixed-local-color-3: var(--local-color-3);
    --mixed-local-color-4: var(--local-color-4);
    --mixed-local-color-5: var(--local-color-5);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host([data-variant='generated']) {
      --mixed-local-color-1: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-1)
      );
      --mixed-local-color-2: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-2)
      );
      --mixed-local-color-3: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-3)
      );
      --mixed-local-color-4: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-4)
      );
      --mixed-local-color-5: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-5)
      );
    }
  }

  :host([data-variant='generated']) {
    box-shadow: 0 0 0 8px var(--wui-color-gray-glass-005);
    background: radial-gradient(
      var(--local-radial-circle),
      #fff 0.52%,
      var(--mixed-local-color-5) 31.25%,
      var(--mixed-local-color-3) 51.56%,
      var(--mixed-local-color-2) 65.63%,
      var(--mixed-local-color-1) 82.29%,
      var(--mixed-local-color-4) 100%
    );
  }

  :host([data-variant='default']) {
    box-shadow: 0 0 0 8px var(--wui-color-gray-glass-005);
    background: radial-gradient(
      75.29% 75.29% at 64.96% 24.36%,
      #fff 0.52%,
      #f5ccfc 31.25%,
      #dba4f5 51.56%,
      #9a8ee8 65.63%,
      #6493da 82.29%,
      #6ebdea 100%
    );
  }
`;var Bt=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Ut=class extends n.WF{constructor(){super(...arguments),this.imageSrc=void 0,this.alt=void 0,this.address=void 0}render(){return n.qy`${this.visualTemplate()}`}visualTemplate(){if(this.imageSrc)return this.dataset.variant="image",n.qy`<wui-image src=${this.imageSrc} alt=${this.alt??"avatar"}></wui-image>`;if(this.address){this.dataset.variant="generated";const e=Tt.generateAvatarColors(this.address);return this.style.cssText=e,null}return this.dataset.variant="default",null}};Ut.styles=[p,Nt],Bt([(0,v.MZ)()],Ut.prototype,"imageSrc",void 0),Bt([(0,v.MZ)()],Ut.prototype,"alt",void 0),Bt([(0,v.MZ)()],Ut.prototype,"address",void 0),Ut=Bt([y("wui-avatar")],Ut);const Dt=n.AH`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: var(--wui-color-gray-glass-020);
    border-radius: var(--local-border-radius);
    border: var(--local-border);
    box-sizing: content-box;
    width: var(--local-size);
    height: var(--local-size);
    min-height: var(--local-size);
    min-width: var(--local-size);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host {
      background-color: color-mix(in srgb, var(--local-bg-value) var(--local-bg-mix), transparent);
    }
  }
`;var Lt=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Ft=class extends n.WF{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){const e=this.iconSize||this.size,t="lg"===this.size,r="xl"===this.size,i=t?"12%":"16%",s=t?"xxs":r?"s":"3xl",o="gray"===this.background,a="opaque"===this.background,c="accent-100"===this.backgroundColor&&a||"success-100"===this.backgroundColor&&a||"error-100"===this.backgroundColor&&a||"inverse-100"===this.backgroundColor&&a;let l=`var(--wui-color-${this.backgroundColor})`;return c?l=`var(--wui-icon-box-bg-${this.backgroundColor})`:o&&(l=`var(--wui-gray-${this.backgroundColor})`),this.style.cssText=`\n       --local-bg-value: ${l};\n       --local-bg-mix: ${c||o?"100%":i};\n       --local-border-radius: var(--wui-border-radius-${s});\n       --local-size: var(--wui-icon-box-size-${this.size});\n       --local-border: ${"wui-color-bg-125"===this.borderColor?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}\n   `,n.qy` <wui-icon color=${this.iconColor} size=${e} name=${this.icon}></wui-icon> `}};Ft.styles=[p,g,Dt],Lt([(0,v.MZ)()],Ft.prototype,"size",void 0),Lt([(0,v.MZ)()],Ft.prototype,"backgroundColor",void 0),Lt([(0,v.MZ)()],Ft.prototype,"iconColor",void 0),Lt([(0,v.MZ)()],Ft.prototype,"iconSize",void 0),Lt([(0,v.MZ)()],Ft.prototype,"background",void 0),Lt([(0,v.MZ)({type:Boolean})],Ft.prototype,"border",void 0),Lt([(0,v.MZ)()],Ft.prototype,"borderColor",void 0),Lt([(0,v.MZ)()],Ft.prototype,"icon",void 0),Ft=Lt([y("wui-icon-box")],Ft);const jt=n.AH`
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    background: var(--wui-color-gray-glass-002);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  button:disabled {
    background: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-image,
  button:disabled > wui-icon-box,
  button:disabled > wui-flex > wui-avatar {
    filter: grayscale(1);
  }

  button:has(wui-image) {
    padding: var(--wui-spacing-3xs) var(--wui-spacing-3xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
  }

  wui-text {
    color: var(--wui-color-fg-100);
  }

  wui-flex > wui-text {
    color: var(--wui-color-fg-200);
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  wui-flex {
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    background: var(--wui-color-gray-glass-005);
    padding: 4px var(--wui-spacing-m) 4px var(--wui-spacing-xxs);
  }

  button.local-no-balance {
    border-radius: 0px;
    border: none;
    background: transparent;
  }

  wui-avatar {
    width: 20px;
    height: 20px;
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-010);
  }

  @media (max-width: 500px) {
    button {
      gap: 0px;
      padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) !important;
      height: 32px;
    }
    wui-image,
    wui-icon-box,
    button > wui-text {
      visibility: hidden;
      width: 0px;
      height: 0px;
    }
    button {
      border-radius: 0px;
      border: none;
      background: transparent;
      padding: 0px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }

    button:active:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }
  }
`;var Ht=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let zt=class extends n.WF{constructor(){super(...arguments),this.networkSrc=void 0,this.avatarSrc=void 0,this.balance=void 0,this.isUnsupportedChain=void 0,this.disabled=!1,this.address="",this.profileName="",this.charsStart=4,this.charsEnd=6}render(){return n.qy`
      <button
        ?disabled=${this.disabled}
        class=${(0,Mt.J)(this.balance?void 0:"local-no-balance")}
      >
        ${this.balanceTemplate()}
        <wui-flex gap="xxs" alignItems="center">
          <wui-avatar
            .imageSrc=${this.avatarSrc}
            alt=${this.address}
            address=${this.address}
          ></wui-avatar>
          <wui-text variant="paragraph-600" color="inherit">
            ${this.address?Tt.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?18:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"}):null}
          </wui-text>
        </wui-flex>
      </button>
    `}balanceTemplate(){if(this.isUnsupportedChain)return n.qy` <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
        ></wui-icon-box>
        <wui-text variant="paragraph-600" color="inherit"> Switch Network</wui-text>`;if(this.balance){const e=this.networkSrc?n.qy`<wui-image src=${this.networkSrc}></wui-image>`:n.qy`
            <wui-icon-box
              size="sm"
              iconColor="fg-200"
              backgroundColor="fg-300"
              icon="networkPlaceholder"
            ></wui-icon-box>
          `;return n.qy`
        ${e}
        <wui-text variant="paragraph-600" color="inherit"> ${this.balance}</wui-text>
      `}return null}};zt.styles=[p,g,jt],Ht([(0,v.MZ)()],zt.prototype,"networkSrc",void 0),Ht([(0,v.MZ)()],zt.prototype,"avatarSrc",void 0),Ht([(0,v.MZ)()],zt.prototype,"balance",void 0),Ht([(0,v.MZ)({type:Boolean})],zt.prototype,"isUnsupportedChain",void 0),Ht([(0,v.MZ)({type:Boolean})],zt.prototype,"disabled",void 0),Ht([(0,v.MZ)()],zt.prototype,"address",void 0),Ht([(0,v.MZ)()],zt.prototype,"profileName",void 0),Ht([(0,v.MZ)()],zt.prototype,"charsStart",void 0),Ht([(0,v.MZ)()],zt.prototype,"charsEnd",void 0),zt=Ht([y("wui-account-button")],zt);const qt=n.AH`
  :host {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-150, #1e1f1f);
    padding: 1px;
  }
`;var $t=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Wt=class extends n.WF{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let e="xxs";return e="lg"===this.size?"m":"md"===this.size?"xs":"xxs",this.style.cssText=`\n       --local-border-radius: var(--wui-border-radius-${e});\n       --local-size: var(--wui-wallet-image-size-${this.size});\n   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),n.qy`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?n.qy`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?n.qy`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:n.qy`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};Wt.styles=[p,qt],$t([(0,v.MZ)()],Wt.prototype,"size",void 0),$t([(0,v.MZ)()],Wt.prototype,"name",void 0),$t([(0,v.MZ)()],Wt.prototype,"imageSrc",void 0),$t([(0,v.MZ)()],Wt.prototype,"walletIcon",void 0),$t([(0,v.MZ)({type:Boolean})],Wt.prototype,"installed",void 0),$t([(0,v.MZ)()],Wt.prototype,"badgeSize",void 0),Wt=$t([y("wui-wallet-image")],Wt);const Gt=n.AH`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`;var Vt=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Kt=class extends n.WF{constructor(){super(...arguments),this.walletImages=[]}render(){const e=this.walletImages.length<4;return n.qy`${this.walletImages.slice(0,4).map((({src:e,walletName:t})=>n.qy`
            <wui-wallet-image
              size="inherit"
              imageSrc=${e}
              name=${(0,Mt.J)(t)}
            ></wui-wallet-image>
          `))}
      ${e?[...Array(4-this.walletImages.length)].map((()=>n.qy` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`)):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};Kt.styles=[p,Gt],Vt([(0,v.MZ)({type:Array})],Kt.prototype,"walletImages",void 0),Kt=Vt([y("wui-all-wallets-image")],Kt);const Zt=n.AH`
  :host {
    width: var(--local-width);
    position: relative;
  }

  button {
    border: none;
    border-radius: var(--local-border-radius);
    width: var(--local-width);
    white-space: nowrap;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='md'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-l);
    height: 36px;
  }

  button[data-size='md'][data-icon-left='true'][data-icon-right='false'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-s);
  }

  button[data-size='md'][data-icon-right='true'][data-icon-left='false'] {
    padding: 8.2px var(--wui-spacing-s) 9px var(--wui-spacing-l);
  }

  button[data-size='lg'] {
    padding: var(--wui-spacing-m) var(--wui-spacing-2l);
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='inverse'] {
    background-color: var(--wui-color-inverse-100);
    color: var(--wui-color-inverse-000);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='accent-error'] {
    background: var(--wui-color-error-glass-015);
    color: var(--wui-color-error-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-error-glass-010);
  }

  button[data-variant='accent-success'] {
    background: var(--wui-color-success-glass-015);
    color: var(--wui-color-success-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-success-glass-010);
  }

  button[data-variant='neutral'] {
    background: transparent;
    color: var(--wui-color-fg-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-variant='main']:focus-visible:enabled {
    background-color: var(--wui-color-accent-090);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='inverse']:focus-visible:enabled {
    background-color: var(--wui-color-inverse-100);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent']:focus-visible:enabled {
    background-color: var(--wui-color-accent-glass-010);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent-error']:focus-visible:enabled {
    background: var(--wui-color-error-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-error-100),
      0 0 0 4px var(--wui-color-error-glass-020);
  }
  button[data-variant='accent-success']:focus-visible:enabled {
    background: var(--wui-color-success-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-success-100),
      0 0 0 4px var(--wui-color-success-glass-020);
  }
  button[data-variant='neutral']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button[data-variant='main']:hover:enabled {
    background-color: var(--wui-color-accent-090);
  }

  button[data-variant='main']:active:enabled {
    background-color: var(--wui-color-accent-080);
  }

  button[data-variant='inverse']:hover:enabled {
    background-color: var(--wui-color-inverse-100);
  }

  button[data-variant='accent']:hover:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  button[data-variant='accent-error']:hover:enabled {
    background: var(--wui-color-error-glass-015);
    color: var(--wui-color-error-100);
  }

  button[data-variant='accent-success']:hover:enabled {
    background: var(--wui-color-success-glass-015);
    color: var(--wui-color-success-100);
  }

  button[data-variant='neutral']:hover:enabled {
    background: var(--wui-color-gray-glass-005);
  }

  button[data-size='lg'][data-icon-left='true'][data-icon-right='false'] {
    padding-left: var(--wui-spacing-m);
  }

  button[data-size='lg'][data-icon-right='true'][data-icon-left='false'] {
    padding-right: var(--wui-spacing-m);
  }

  /* -- Disabled state --------------------------------------------------- */
  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    color: var(--wui-color-gray-glass-020);
    cursor: not-allowed;
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  wui-loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: var(--local-opacity-000);
  }
`;var Qt=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};const Jt={main:"inverse-100",inverse:"inverse-000",accent:"accent-100","accent-error":"error-100","accent-success":"success-100",neutral:"fg-100",disabled:"gray-glass-020"},Yt={lg:"paragraph-600",md:"small-600"},Xt={lg:"md",md:"md"};let er=class extends n.WF{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="main",this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius="m"}render(){this.style.cssText=`\n    --local-width: ${this.fullWidth?"100%":"auto"};\n    --local-opacity-100: ${this.loading?0:1};\n    --local-opacity-000: ${this.loading?1:0};\n    --local-border-radius: var(--wui-border-radius-${this.borderRadius});\n    `;const e=this.textVariant??Yt[this.size];return n.qy`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
        ontouchstart
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${()=>this.handleSlotLeftChange()}></slot>
        <wui-text variant=${e} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${()=>this.handleSlotRightChange()}></slot>
      </button>
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){const e=Xt[this.size],t=this.disabled?Jt.disabled:Jt[this.variant];return n.qy`<wui-loading-spinner color=${t} size=${e}></wui-loading-spinner>`}return n.qy``}};er.styles=[p,g,Zt],Qt([(0,v.MZ)()],er.prototype,"size",void 0),Qt([(0,v.MZ)({type:Boolean})],er.prototype,"disabled",void 0),Qt([(0,v.MZ)({type:Boolean})],er.prototype,"fullWidth",void 0),Qt([(0,v.MZ)({type:Boolean})],er.prototype,"loading",void 0),Qt([(0,v.MZ)()],er.prototype,"variant",void 0),Qt([(0,v.MZ)({type:Boolean})],er.prototype,"hasIconLeft",void 0),Qt([(0,v.MZ)({type:Boolean})],er.prototype,"hasIconRight",void 0),Qt([(0,v.MZ)()],er.prototype,"borderRadius",void 0),Qt([(0,v.MZ)()],er.prototype,"textVariant",void 0),er=Qt([y("wui-button")],er);const tr=n.JW`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`,rr=n.AH`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 76px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }
`;var nr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let ir=class extends n.WF{constructor(){super(...arguments),this.type="wallet"}render(){return n.qy`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return"network"===this.type?n.qy` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${tr}`:n.qy`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};ir.styles=[p,g,rr],nr([(0,v.MZ)()],ir.prototype,"type",void 0),ir=nr([y("wui-card-select-loader")],ir);const sr=n.JW`
  <svg fill="none" viewBox="0 0 36 40">
    <path
      d="M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z"
    />
  </svg>
`,or=n.JW`<svg width="86" height="96" fill="none">
  <path
    d="M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z"
  />
</svg>`,ar=n.AH`
  :host {
    position: relative;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-width);
    height: var(--local-height);
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    fill: var(--wui-color-gray-glass-002);
  }

  svg > path {
    stroke: var(--local-stroke);
  }

  wui-image {
    width: 100%;
    height: 100%;
    -webkit-clip-path: var(--local-path);
    clip-path: var(--local-path);
    background: var(--wui-color-gray-glass-002);
  }

  wui-icon {
    transform: translateY(-5%);
    width: var(--local-icon-size);
    height: var(--local-icon-size);
  }
`;var cr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let lr=class extends n.WF{constructor(){super(...arguments),this.size="md",this.name="uknown",this.selected=!1}render(){const e={sm:sr,md:tr,lg:or};return this.style.cssText=`\n      --local-stroke: ${this.selected?"var(--wui-color-accent-100)":"var(--wui-color-gray-glass-010)"};\n      --local-path: var(--wui-path-network-${this.size});\n      --local-width:  var(--wui-width-network-${this.size});\n      --local-height:  var(--wui-height-network-${this.size});\n      --local-icon-size:  var(--wui-icon-size-network-${this.size});\n    `,n.qy`${this.templateVisual()} ${e[this.size]}`}templateVisual(){return this.imageSrc?n.qy`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:n.qy`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`}};lr.styles=[p,ar],cr([(0,v.MZ)()],lr.prototype,"size",void 0),cr([(0,v.MZ)()],lr.prototype,"name",void 0),cr([(0,v.MZ)()],lr.prototype,"imageSrc",void 0),cr([(0,v.MZ)({type:Boolean})],lr.prototype,"selected",void 0),lr=cr([y("wui-network-image")],lr);const ur=n.AH`
  button {
    flex-direction: column;
    width: 76px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
  }

  button > wui-text {
    color: var(--wui-color-fg-100);
    max-width: var(--wui-icon-box-size-xl);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }
`;var hr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let dr=class extends n.WF{constructor(){super(...arguments),this.name="Unknown",this.type="wallet",this.imageSrc=void 0,this.disabled=!1,this.selected=!1,this.installed=!1}render(){return n.qy`
      <button data-selected=${(0,Mt.J)(this.selected)} ?disabled=${this.disabled} ontouchstart>
        ${this.imageTemplate()}
        <wui-text variant="tiny-500" color=${this.selected?"accent-100":"inherit"}>
          ${this.name}
        </wui-text>
      </button>
    `}imageTemplate(){return"network"===this.type?n.qy`
        <wui-network-image
          .selected=${this.selected}
          imageSrc=${(0,Mt.J)(this.imageSrc)}
          name=${this.name}
        >
        </wui-network-image>
      `:n.qy`
      <wui-wallet-image
        size="md"
        imageSrc=${(0,Mt.J)(this.imageSrc)}
        name=${this.name}
        .installed=${this.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}};dr.styles=[p,g,ur],hr([(0,v.MZ)()],dr.prototype,"name",void 0),hr([(0,v.MZ)()],dr.prototype,"type",void 0),hr([(0,v.MZ)()],dr.prototype,"imageSrc",void 0),hr([(0,v.MZ)({type:Boolean})],dr.prototype,"disabled",void 0),hr([(0,v.MZ)({type:Boolean})],dr.prototype,"selected",void 0),hr([(0,v.MZ)({type:Boolean})],dr.prototype,"installed",void 0),dr=hr([y("wui-card-select")],dr);const fr=n.AH`
  a {
    border: 1px solid var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  a.disabled > wui-icon,
  a.disabled > wui-image {
    filter: grayscale(1);
  }

  a[data-variant='fill'] {
    color: var(--wui-color-inverse-100);
    background-color: var(--wui-color-accent-100);
  }

  a[data-variant='shade'],
  a[data-variant='shadeSmall'] {
    background-color: transparent;
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  a[data-variant='success'] {
    column-gap: var(--wui-spacing-xxs);
    border: 1px solid var(--wui-color-success-glass-010);
    background-color: var(--wui-color-success-glass-010);
    color: var(--wui-color-success-100);
  }

  a[data-variant='error'] {
    column-gap: var(--wui-spacing-xxs);
    border: 1px solid var(--wui-color-error-glass-010);
    background-color: var(--wui-color-error-glass-010);
    color: var(--wui-color-error-100);
  }

  a[data-variant='transparent'] {
    column-gap: var(--wui-spacing-xxs);
    background-color: transparent;
    color: var(--wui-color-fg-150);
  }

  a[data-variant='transparent'],
  a[data-variant='success'],
  a[data-variant='shadeSmall'],
  a[data-variant='error'] {
    padding: 7px var(--wui-spacing-s) 7px 10px;
  }

  a[data-variant='transparent']:has(wui-text:first-child),
  a[data-variant='success']:has(wui-text:first-child),
  a[data-variant='shadeSmall']:has(wui-text:first-child),
  a[data-variant='error']:has(wui-text:first-child) {
    padding: 7px var(--wui-spacing-s);
  }

  a[data-variant='fill'],
  a[data-variant='shade'] {
    column-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-xxs)
      var(--wui-spacing-xs);
  }

  a[data-variant='fill']:has(wui-text:first-child),
  a[data-variant='shade']:has(wui-text:first-child) {
    padding: 9px var(--wui-spacing-m) 9px var(--wui-spacing-m);
  }

  a[data-variant='fill'] > wui-image,
  a[data-variant='shade'] > wui-image {
    width: 24px;
    height: 24px;
  }

  a[data-variant='fill'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  a[data-variant='shade'] > wui-image,
  a[data-variant='shadeSmall'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  a[data-variant='fill'] > wui-icon,
  a[data-variant='shade'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  a[data-variant='transparent'] > wui-image,
  a[data-variant='success'] > wui-image,
  a[data-variant='shadeSmall'] > wui-image,
  a[data-variant='error'] > wui-image {
    width: 14px;
    height: 14px;
  }

  a[data-variant='transparent'] > wui-icon,
  a[data-variant='success'] > wui-icon,
  a[data-variant='shadeSmall'] > wui-icon,
  a[data-variant='error'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  a[data-variant='fill']:focus-visible {
    background-color: var(--wui-color-accent-090);
  }

  a[data-variant='shade']:focus-visible,
  a[data-variant='shadeSmall']:focus-visible {
    background-color: var(--wui-color-gray-glass-015);
  }

  a[data-variant='transparent']:focus-visible {
    background-color: var(--wui-color-gray-glass-005);
  }

  a[data-variant='success']:focus-visible {
    background-color: var(--wui-color-success-glass-015);
  }

  a[data-variant='error']:focus-visible {
    background-color: var(--wui-color-error-glass-015);
  }

  a.disabled {
    color: var(--wui-color-gray-glass-015);
    background-color: var(--wui-color-gray-glass-015);
    pointer-events: none;
  }

  @media (hover: hover) and (pointer: fine) {
    a[data-variant='fill']:hover {
      background-color: var(--wui-color-accent-090);
    }

    a[data-variant='shade']:hover,
    a[data-variant='shadeSmall']:hover {
      background-color: var(--wui-color-gray-glass-015);
    }

    a[data-variant='transparent']:hover {
      background-color: var(--wui-color-gray-glass-005);
    }

    a[data-variant='success']:hover {
      background-color: var(--wui-color-success-glass-015);
    }

    a[data-variant='error']:hover {
      background-color: var(--wui-color-error-glass-015);
    }
  }

  a[data-variant='fill']:active {
    background-color: var(--wui-color-accent-080);
  }

  a[data-variant='shade']:active,
  a[data-variant='shadeSmall']:active {
    background-color: var(--wui-color-gray-glass-020);
  }

  a[data-variant='transparent']:active {
    background-color: var(--wui-color-gray-glass-010);
  }

  a[data-variant='success']:active {
    background-color: var(--wui-color-success-glass-020);
  }

  a[data-variant='error']:active {
    background-color: var(--wui-color-error-glass-020);
  }
`;var pr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let gr=class extends n.WF{constructor(){super(...arguments),this.variant="fill",this.imageSrc=void 0,this.disabled=!1,this.icon="externalLink",this.href="",this.text=void 0}render(){const e="success"===this.variant||"transparent"===this.variant||"shadeSmall"===this.variant?"small-600":"paragraph-600";return n.qy`
      <a
        rel="noreferrer"
        target="_blank"
        href=${this.href}
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
      >
        ${this.imageTemplate()}
        <wui-text variant=${e} color="inherit">
          ${this.title?this.title:Tt.getHostName(this.href)}
        </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </a>
    `}imageTemplate(){return this.imageSrc?n.qy`<wui-image src=${this.imageSrc}></wui-image>`:null}};gr.styles=[p,g,fr],pr([(0,v.MZ)()],gr.prototype,"variant",void 0),pr([(0,v.MZ)()],gr.prototype,"imageSrc",void 0),pr([(0,v.MZ)({type:Boolean})],gr.prototype,"disabled",void 0),pr([(0,v.MZ)()],gr.prototype,"icon",void 0),pr([(0,v.MZ)()],gr.prototype,"href",void 0),pr([(0,v.MZ)()],gr.prototype,"text",void 0),gr=pr([y("wui-chip")],gr);const mr=n.AH`
  :host {
    position: relative;
    display: block;
  }

  button {
    background: var(--wui-color-accent-100);
    border: 1px solid var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-m);
    gap: var(--wui-spacing-xs);
  }

  button.loading {
    background: var(--wui-color-gray-glass-010);
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  button:disabled > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button:active:enabled {
      background-color: var(--wui-color-accent-080);
    }
  }

  button:focus-visible {
    border: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-accent-090);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  button[data-size='sm'] {
    padding: 6.75px 10px 7.25px;
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
    color: var(--wui-color-inverse-100);
  }

  button[data-size='md'] {
    padding: 9px var(--wui-spacing-l) 9px var(--wui-spacing-l);
  }

  button[data-size='md'] + wui-text {
    padding-left: var(--wui-spacing-3xs);
  }

  @media (max-width: 500px) {
    button[data-size='md'] {
      height: 32px;
      padding: 5px 12px;
    }

    button[data-size='md'] > wui-text > slot {
      font-size: 14px !important;
    }
  }

  wui-loading-spinner {
    width: 14px;
    height: 14px;
  }

  wui-loading-spinner::slotted(svg) {
    width: 10px !important;
    height: 10px !important;
  }

  button[data-size='sm'] > wui-loading-spinner {
    width: 12px;
    height: 12px;
  }
`;var yr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let wr=class extends n.WF{constructor(){super(...arguments),this.size="md",this.loading=!1}render(){const e="md"===this.size?"paragraph-600":"small-600";return n.qy`
      <button data-size=${this.size} ?disabled=${this.loading} ontouchstart>
        ${this.loadingTemplate()}
        <wui-text variant=${e} color=${this.loading?"accent-100":"inherit"}>
          <slot></slot>
        </wui-text>
      </button>
    `}loadingTemplate(){return this.loading?n.qy`<wui-loading-spinner size=${this.size} color="accent-100"></wui-loading-spinner>`:null}};wr.styles=[p,g,mr],yr([(0,v.MZ)()],wr.prototype,"size",void 0),yr([(0,v.MZ)({type:Boolean})],wr.prototype,"loading",void 0),wr=yr([y("wui-connect-button")],wr);const br=n.AH`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var vr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Ar=class extends n.WF{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return n.qy`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};Ar.styles=[p,g,br],vr([(0,v.MZ)({type:Boolean})],Ar.prototype,"disabled",void 0),vr([(0,v.MZ)()],Ar.prototype,"label",void 0),vr([(0,v.MZ)()],Ar.prototype,"buttonLabel",void 0),Ar=vr([y("wui-cta-button")],Ar);const Er=n.AH`
  :host {
    display: block;
    padding: var(--wui-spacing-l) var(--wui-spacing-m);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    width: 100%;
  }
`;let xr=class extends n.WF{render(){return n.qy`
      <wui-flex gap="xl" flexDirection="column" justifyContent="space-between" alignItems="center">
        <slot></slot>
      </wui-flex>
    `}};xr.styles=[p,g,Er],xr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([y("wui-details-group")],xr);const Cr=n.AH`
  :host {
    display: flex;
    flex-direction: row;
    gap: var(--wui-spacing-l);
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
  }
`;var Sr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let kr=class extends n.WF{constructor(){super(...arguments),this.name=""}render(){return n.qy`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="paragraph-500" color="fg-200">${this.name}</wui-text>
        <wui-flex gap="xs" alignItems="center">
          <slot></slot>
        </wui-flex>
      </wui-flex>
    `}};kr.styles=[p,g,Cr],Sr([(0,v.MZ)()],kr.prototype,"name",void 0),kr=Sr([y("wui-details-group-item")],kr);var _r=r(8342);const Ir=n.AH`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  input {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
    color: var(--wui-color-fg-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    caret-color: var(--wui-color-accent-100);
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  input:disabled::placeholder,
  input:disabled + wui-icon {
    color: var(--wui-color-fg-300);
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  input:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px var(--wui-spacing-s);
  }

  wui-icon + .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px 36px;
  }

  wui-icon[data-input='sm'] {
    left: var(--wui-spacing-s);
  }

  .wui-size-md {
    padding: 15px var(--wui-spacing-m) var(--wui-spacing-l) var(--wui-spacing-m);
  }

  wui-icon + .wui-size-md,
  wui-loading-spinner + .wui-size-md {
    padding: 10.5px var(--wui-spacing-3xl) 10.5px var(--wui-spacing-3xl);
  }

  wui-icon[data-input='md'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-lg {
    padding: var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-l);
    letter-spacing: var(--wui-letter-spacing-medium-title);
    font-size: var(--wui-font-size-medium-title);
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    color: var(--wui-color-fg-100);
    height: 64px;
  }

  .wui-padding-right-xs {
    padding-right: var(--wui-spacing-xs);
  }

  .wui-padding-right-s {
    padding-right: var(--wui-spacing-s);
  }

  .wui-padding-right-m {
    padding-right: var(--wui-spacing-m);
  }

  .wui-padding-right-l {
    padding-right: var(--wui-spacing-l);
  }

  .wui-padding-right-xl {
    padding-right: var(--wui-spacing-xl);
  }

  .wui-padding-right-2xl {
    padding-right: var(--wui-spacing-2xl);
  }

  .wui-padding-right-3xl {
    padding-right: var(--wui-spacing-3xl);
  }

  .wui-padding-right-4xl {
    padding-right: var(--wui-spacing-4xl);
  }

  .wui-padding-right-5xl {
    padding-right: var(--wui-spacing-5xl);
  }

  wui-icon + .wui-size-lg,
  wui-loading-spinner + .wui-size-lg {
    padding-left: 50px;
  }

  wui-icon[data-input='lg'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-m) 17.25px var(--wui-spacing-m);
  }
  wui-icon + .wui-size-mdl,
  wui-loading-spinner + .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-3xl) 17.25px 40px;
  }
  wui-icon[data-input='mdl'] {
    left: var(--wui-spacing-m);
  }

  input:placeholder-shown ~ ::slotted(wui-input-element),
  input:placeholder-shown ~ ::slotted(wui-icon) {
    opacity: 0;
    pointer-events: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  ::slotted(wui-input-element),
  ::slotted(wui-icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  ::slotted(wui-input-element) {
    right: var(--wui-spacing-m);
  }

  ::slotted(wui-icon) {
    right: 0px;
  }
`;var Mr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Tr=class extends n.WF{constructor(){super(...arguments),this.inputElementRef=(0,_r._)(),this.size="md",this.disabled=!1,this.placeholder="",this.type="text",this.value=""}render(){const e=`wui-padding-right-${this.inputRightPadding}`,t=`wui-size-${this.size}`,r={[t]:!0,[e]:Boolean(this.inputRightPadding)};return n.qy`${this.templateIcon()}
      <input
        ${(0,_r.K)(this.inputElementRef)}
        class=${et(r)}
        type=${this.type}
        enterkeyhint=${(0,Mt.J)(this.enterKeyHint)}
        ?disabled=${this.disabled}
        placeholder=${this.placeholder}
        @input=${this.dispatchInputChangeEvent.bind(this)}
        .value=${this.value||""}
      />
      <slot></slot>`}templateIcon(){return this.icon?n.qy`<wui-icon
        data-input=${this.size}
        size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};Tr.styles=[p,g,Ir],Mr([(0,v.MZ)()],Tr.prototype,"size",void 0),Mr([(0,v.MZ)()],Tr.prototype,"icon",void 0),Mr([(0,v.MZ)({type:Boolean})],Tr.prototype,"disabled",void 0),Mr([(0,v.MZ)()],Tr.prototype,"placeholder",void 0),Mr([(0,v.MZ)()],Tr.prototype,"type",void 0),Mr([(0,v.MZ)()],Tr.prototype,"keyHint",void 0),Mr([(0,v.MZ)()],Tr.prototype,"value",void 0),Mr([(0,v.MZ)()],Tr.prototype,"inputRightPadding",void 0),Tr=Mr([y("wui-input-text")],Tr);const Pr=n.AH`
  :host {
    position: relative;
    display: inline-block;
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`;var Or=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Rr=class extends n.WF{constructor(){super(...arguments),this.disabled=!1}render(){return n.qy`
      <wui-input-text
        placeholder="Email"
        icon="mail"
        size="mdl"
        .disabled=${this.disabled}
        .value=${this.value}
        data-testid="wui-email-input"
      ></wui-input-text>
      ${this.templateError()}
    `}templateError(){return this.errorMessage?n.qy`<wui-text variant="tiny-500" color="error-100">${this.errorMessage}</wui-text>`:null}};Rr.styles=[p,Pr],Or([(0,v.MZ)()],Rr.prototype,"errorMessage",void 0),Or([(0,v.MZ)({type:Boolean})],Rr.prototype,"disabled",void 0),Or([(0,v.MZ)()],Rr.prototype,"value",void 0),Rr=Or([y("wui-email-input")],Rr);const Nr=n.AH`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  .error {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }

  .base-name {
    position: absolute;
    right: 45px;
    top: 15px;
    text-align: right;
  }
`;var Br=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Ur=class extends n.WF{constructor(){super(...arguments),this.disabled=!1,this.loading=!1}render(){return n.qy`
      <wui-input-text
        value=${(0,Mt.J)(this.value)}
        ?disabled=${this.disabled}
        .value=${this.value||""}
        data-testId="wui-ens-input"
        inputRightPadding="5xl"
      >
        ${this.baseNameTemplate()} ${this.errorTemplate()}${this.loadingTemplate()}
      </wui-input-text>
    `}baseNameTemplate(){return n.qy`<wui-text variant="paragraph-400" color="fg-200" class="base-name">
      ${o.oU.WC_NAME_SUFFIX}
    </wui-text>`}loadingTemplate(){return this.loading?n.qy`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:null}errorTemplate(){return this.errorMessage?n.qy`<wui-text variant="tiny-500" color="error-100" class="error"
        >${this.errorMessage}</wui-text
      >`:null}};Ur.styles=[p,Nr],Br([(0,v.MZ)()],Ur.prototype,"errorMessage",void 0),Br([(0,v.MZ)({type:Boolean})],Ur.prototype,"disabled",void 0),Br([(0,v.MZ)()],Ur.prototype,"value",void 0),Br([(0,v.MZ)({type:Boolean})],Ur.prototype,"loading",void 0),Ur=Br([y("wui-ens-input")],Ur);const Dr=n.AH`
  button {
    border-radius: var(--local-border-radius);
    color: var(--wui-color-fg-100);
    padding: var(--local-padding);
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  @media (max-width: 700px) {
    button {
      padding: var(--wui-spacing-s);
    }
  }

  button > wui-icon {
    pointer-events: none;
  }

  button:disabled > wui-icon {
    color: var(--wui-color-bg-300) !important;
  }

  button:disabled {
    background-color: transparent;
  }
`;var Lr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Fr=class extends n.WF{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.icon="copy",this.iconColor="inherit"}render(){const e="lg"===this.size?"--wui-border-radius-xs":"--wui-border-radius-xxs",t="lg"===this.size?"--wui-spacing-1xs":"--wui-spacing-2xs";return this.style.cssText=`\n    --local-border-radius: var(${e});\n    --local-padding: var(${t});\n`,n.qy`
      <button ?disabled=${this.disabled} ontouchstart>
        <wui-icon color=${this.iconColor} size=${this.size} name=${this.icon}></wui-icon>
      </button>
    `}};Fr.styles=[p,g,m,Dr],Lr([(0,v.MZ)()],Fr.prototype,"size",void 0),Lr([(0,v.MZ)({type:Boolean})],Fr.prototype,"disabled",void 0),Lr([(0,v.MZ)()],Fr.prototype,"icon",void 0),Lr([(0,v.MZ)()],Fr.prototype,"iconColor",void 0),Fr=Lr([y("wui-icon-link")],Fr);const jr=n.AH`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  button:active:enabled {
    background-color: var(--wui-color-fg-225);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }
  }
`;var Hr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let zr=class extends n.WF{constructor(){super(...arguments),this.icon="copy"}render(){return n.qy`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};zr.styles=[p,g,jr],Hr([(0,v.MZ)()],zr.prototype,"icon",void 0),zr=Hr([y("wui-input-element")],zr);const qr=n.AH`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    width: 50px;
    height: 50px;
    background: var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-xs);
    border: 1px solid var(--wui-color-gray-glass-005);
    font-family: var(--wui-font-family);
    font-size: var(--wui-font-size-large);
    font-weight: var(--wui-font-weight-regular);
    letter-spacing: var(--wui-letter-spacing-large);
    text-align: center;
    color: var(--wui-color-fg-100);
    caret-color: var(--wui-color-accent-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
    background: var(--wui-color-gray-glass-005);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-015);
    border: 1px solid var(--wui-color-accent-100);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      background-color: var(--wui-color-gray-glass-015);
    }
  }
`;var $r=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Wr=class extends n.WF{constructor(){super(...arguments),this.disabled=!1,this.value=""}render(){return n.qy`<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `}};Wr.styles=[p,g,qr],$r([(0,v.MZ)({type:Boolean})],Wr.prototype,"disabled",void 0),$r([(0,v.MZ)({type:String})],Wr.prototype,"value",void 0),Wr=$r([y("wui-input-numeric")],Wr);const Gr=n.AH`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`;var Vr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Kr=class extends n.WF{constructor(){super(...arguments),this.disabled=!1,this.color="inherit"}render(){return n.qy`
      <button ?disabled=${this.disabled} ontouchstart>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};Kr.styles=[p,g,Gr],Vr([(0,v.MZ)({type:Boolean})],Kr.prototype,"disabled",void 0),Vr([(0,v.MZ)()],Kr.prototype,"color",void 0),Kr=Vr([y("wui-link")],Kr);const Zr=n.AH`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;var Qr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Jr=class extends n.WF{constructor(){super(...arguments),this.variant="icon",this.disabled=!1,this.imageSrc=void 0,this.alt=void 0,this.chevron=!1,this.loading=!1}render(){return n.qy`
      <button
        ?disabled=${!!this.loading||Boolean(this.disabled)}
        data-loading=${this.loading}
        data-iconvariant=${(0,Mt.J)(this.iconVariant)}
        ontouchstart
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `}visualTemplate(){if("image"===this.variant&&this.imageSrc)return n.qy`<wui-image src=${this.imageSrc} alt=${this.alt??"list item"}></wui-image>`;if("square"===this.iconVariant&&this.icon&&"icon"===this.variant)return n.qy`<wui-icon name=${this.icon}></wui-icon>`;if("icon"===this.variant&&this.icon&&this.iconVariant){const e=["blue","square-blue"].includes(this.iconVariant)?"accent-100":"fg-200",t="square-blue"===this.iconVariant?"mdl":"md",r=this.iconSize?this.iconSize:t;return n.qy`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${r}
          background="transparent"
          iconColor=${e}
          backgroundColor=${e}
          size=${t}
        ></wui-icon-box>
      `}return null}loadingTemplate(){return this.loading?n.qy`<wui-loading-spinner color="fg-300"></wui-loading-spinner>`:n.qy``}chevronTemplate(){return this.chevron?n.qy`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`:null}};var Yr;Jr.styles=[p,g,Zr],Qr([(0,v.MZ)()],Jr.prototype,"icon",void 0),Qr([(0,v.MZ)()],Jr.prototype,"iconSize",void 0),Qr([(0,v.MZ)()],Jr.prototype,"variant",void 0),Qr([(0,v.MZ)()],Jr.prototype,"iconVariant",void 0),Qr([(0,v.MZ)({type:Boolean})],Jr.prototype,"disabled",void 0),Qr([(0,v.MZ)()],Jr.prototype,"imageSrc",void 0),Qr([(0,v.MZ)()],Jr.prototype,"alt",void 0),Qr([(0,v.MZ)({type:Boolean})],Jr.prototype,"chevron",void 0),Qr([(0,v.MZ)({type:Boolean})],Jr.prototype,"loading",void 0),Jr=Qr([y("wui-list-item")],Jr),function(e){e.approve="approved",e.bought="bought",e.borrow="borrowed",e.burn="burnt",e.cancel="canceled",e.claim="claimed",e.deploy="deployed",e.deposit="deposited",e.execute="executed",e.mint="minted",e.receive="received",e.repay="repaid",e.send="sent",e.sell="sold",e.stake="staked",e.trade="swapped",e.unstake="unstaked",e.withdraw="withdrawn"}(Yr||(Yr={}));const Xr=n.AH`
  :host > wui-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 40px;
    height: 40px;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-gray-glass-005);
  }

  :host > wui-flex wui-image {
    display: block;
  }

  :host > wui-flex,
  :host > wui-flex wui-image,
  .swap-images-container,
  .swap-images-container.nft,
  wui-image.nft {
    border-top-left-radius: var(--local-left-border-radius);
    border-top-right-radius: var(--local-right-border-radius);
    border-bottom-left-radius: var(--local-left-border-radius);
    border-bottom-right-radius: var(--local-right-border-radius);
  }

  wui-icon {
    width: 20px;
    height: 20px;
  }

  wui-icon-box {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(20%, 20%);
  }

  .swap-images-container {
    position: relative;
    width: 40px;
    height: 40px;
    overflow: hidden;
  }

  .swap-images-container wui-image:first-child {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    left: 0%;
    clip-path: inset(0px calc(50% + 2px) 0px 0%);
  }

  .swap-images-container wui-image:last-child {
    clip-path: inset(0px 0px 0px calc(50% + 2px));
  }
`;var en=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let tn=class extends n.WF{constructor(){super(...arguments),this.images=[],this.secondImage={type:void 0,url:""}}render(){const[e,t]=this.images,r="NFT"===e?.type,i=r?"var(--wui-border-radius-xxs)":"var(--wui-border-radius-s)",s=(t?.url?"NFT"===t.type:r)?"var(--wui-border-radius-xxs)":"var(--wui-border-radius-s)";return this.style.cssText=`\n    --local-left-border-radius: ${i};\n    --local-right-border-radius: ${s};\n    `,n.qy`<wui-flex> ${this.templateVisual()} ${this.templateIcon()} </wui-flex>`}templateVisual(){const[e,t]=this.images,r=e?.type;return 2===this.images.length&&(e?.url||t?.url)?n.qy`<div class="swap-images-container">
        ${e?.url?n.qy`<wui-image src=${e.url} alt="Transaction image"></wui-image>`:null}
        ${t?.url?n.qy`<wui-image src=${t.url} alt="Transaction image"></wui-image>`:null}
      </div>`:e?.url?n.qy`<wui-image src=${e.url} alt="Transaction image"></wui-image>`:"NFT"===r?n.qy`<wui-icon size="inherit" color="fg-200" name="nftPlaceholder"></wui-icon>`:n.qy`<wui-icon size="inherit" color="fg-200" name="coinPlaceholder"></wui-icon>`}templateIcon(){let e,t="accent-100";return e=this.getIcon(),this.status&&(t=this.getStatusColor()),e?n.qy`
      <wui-icon-box
        size="xxs"
        iconColor=${t}
        backgroundColor=${t}
        background="opaque"
        icon=${e}
        ?border=${!0}
        borderColor="wui-color-bg-125"
      ></wui-icon-box>
    `:null}getDirectionIcon(){switch(this.direction){case"in":return"arrowBottom";case"out":return"arrowTop";default:return}}getIcon(){return this.onlyDirectionIcon?this.getDirectionIcon():"trade"===this.type?"swapHorizontalBold":"approve"===this.type?"checkmark":"cancel"===this.type?"close":this.getDirectionIcon()}getStatusColor(){switch(this.status){case"confirmed":return"success-100";case"failed":return"error-100";case"pending":return"inverse-100";default:return"accent-100"}}};tn.styles=[Xr],en([(0,v.MZ)()],tn.prototype,"type",void 0),en([(0,v.MZ)()],tn.prototype,"status",void 0),en([(0,v.MZ)()],tn.prototype,"direction",void 0),en([(0,v.MZ)({type:Boolean})],tn.prototype,"onlyDirectionIcon",void 0),en([(0,v.MZ)({type:Array})],tn.prototype,"images",void 0),en([(0,v.MZ)({type:Object})],tn.prototype,"secondImage",void 0),tn=en([y("wui-transaction-visual")],tn);const rn=n.AH`
  :host > wui-flex:first-child {
    align-items: center;
    column-gap: var(--wui-spacing-s);
    padding: 6.5px var(--wui-spacing-xs) 6.5px var(--wui-spacing-xs);
    width: 100%;
  }

  :host > wui-flex:first-child wui-text:nth-child(1) {
    text-transform: capitalize;
  }

  wui-transaction-visual {
    width: 40px;
    height: 40px;
  }

  wui-flex {
    flex: 1;
  }

  :host wui-flex wui-flex {
    overflow: hidden;
  }

  :host .description-container wui-text span {
    word-break: break-all;
  }

  :host .description-container wui-text {
    overflow: hidden;
  }

  :host .description-separator-icon {
    margin: 0px 6px;
  }

  :host wui-text > span {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
`;var nn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let sn=class extends n.WF{constructor(){super(...arguments),this.type="approve",this.onlyDirectionIcon=!1,this.images=[],this.price=[],this.amount=[],this.symbol=[]}render(){return n.qy`
      <wui-flex>
        <wui-transaction-visual
          .status=${this.status}
          direction=${(0,Mt.J)(this.direction)}
          type=${this.type}
          onlyDirectionIcon=${(0,Mt.J)(this.onlyDirectionIcon)}
          .images=${this.images}
        ></wui-transaction-visual>
        <wui-flex flexDirection="column" gap="3xs">
          <wui-text variant="paragraph-600" color="fg-100">
            ${Yr[this.type]||this.type}
          </wui-text>
          <wui-flex class="description-container">
            ${this.templateDescription()} ${this.templateSecondDescription()}
          </wui-flex>
        </wui-flex>
        <wui-text variant="micro-700" color="fg-300"><span>${this.date}</span></wui-text>
      </wui-flex>
    `}templateDescription(){const e=this.descriptions?.[0];return e?n.qy`
          <wui-text variant="small-500" color="fg-200">
            <span>${e}</span>
          </wui-text>
        `:null}templateSecondDescription(){const e=this.descriptions?.[1];return e?n.qy`
          <wui-icon class="description-separator-icon" size="xxs" name="arrowRight"></wui-icon>
          <wui-text variant="small-400" color="fg-200">
            <span>${e}</span>
          </wui-text>
        `:null}};sn.styles=[p,rn],nn([(0,v.MZ)()],sn.prototype,"type",void 0),nn([(0,v.MZ)({type:Array})],sn.prototype,"descriptions",void 0),nn([(0,v.MZ)()],sn.prototype,"date",void 0),nn([(0,v.MZ)({type:Boolean})],sn.prototype,"onlyDirectionIcon",void 0),nn([(0,v.MZ)()],sn.prototype,"status",void 0),nn([(0,v.MZ)()],sn.prototype,"direction",void 0),nn([(0,v.MZ)({type:Array})],sn.prototype,"images",void 0),nn([(0,v.MZ)({type:Array})],sn.prototype,"price",void 0),nn([(0,v.MZ)({type:Array})],sn.prototype,"amount",void 0),nn([(0,v.MZ)({type:Array})],sn.prototype,"symbol",void 0),sn=nn([y("wui-transaction-list-item")],sn);const on=n.AH`
  :host > wui-flex:first-child {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`;let an=class extends n.WF{render(){return n.qy`
      <wui-flex alignItems="center">
        <wui-shimmer width="40px" height="40px"></wui-shimmer>
        <wui-flex flexDirection="column" gap="2xs">
          <wui-shimmer width="72px" height="16px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="148px" height="14px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
        <wui-shimmer width="24px" height="12px" borderRadius="5xs"></wui-shimmer>
      </wui-flex>
    `}};an.styles=[p,on],an=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([y("wui-transaction-list-item-loader")],an);const cn=n.AH`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--wui-spacing-m);
    padding: 0 var(--wui-spacing-3xs) !important;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-text {
    transform: translateY(5%);
  }

  :host([data-variant='main']) {
    background-color: var(--wui-color-accent-glass-015);
    color: var(--wui-color-accent-100);
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  :host([data-variant='success']) {
    background-color: var(--wui-icon-box-bg-success-100);
    color: var(--wui-color-success-100);
  }

  :host([data-variant='error']) {
    background-color: var(--wui-icon-box-bg-error-100);
    color: var(--wui-color-error-100);
  }

  :host([data-size='lg']) {
    padding: 11px 5px !important;
  }

  :host([data-size='lg']) > wui-text {
    transform: translateY(2%);
  }
`;var ln=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let un=class extends n.WF{constructor(){super(...arguments),this.variant="main",this.size="lg"}render(){this.dataset.variant=this.variant,this.dataset.size=this.size;const e="md"===this.size?"mini-700":"micro-700";return n.qy`
      <wui-text data-variant=${this.variant} variant=${e} color="inherit">
        <slot></slot>
      </wui-text>
    `}};un.styles=[p,cn],ln([(0,v.MZ)()],un.prototype,"variant",void 0),ln([(0,v.MZ)()],un.prototype,"size",void 0),un=ln([y("wui-tag")],un);const hn=n.AH`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`;var dn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let fn=class extends n.WF{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.installed=!1,this.disabled=!1,this.showAllWallets=!1}render(){return n.qy`
      <button ?disabled=${this.disabled} ontouchstart>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?n.qy` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?n.qy` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?n.qy`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:this.showAllWallets||this.imageSrc?null:n.qy`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`}templateStatus(){return this.tagLabel&&this.tagVariant?n.qy`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?n.qy`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};fn.styles=[p,g,hn],dn([(0,v.MZ)({type:Array})],fn.prototype,"walletImages",void 0),dn([(0,v.MZ)()],fn.prototype,"imageSrc",void 0),dn([(0,v.MZ)()],fn.prototype,"name",void 0),dn([(0,v.MZ)()],fn.prototype,"tagLabel",void 0),dn([(0,v.MZ)()],fn.prototype,"tagVariant",void 0),dn([(0,v.MZ)()],fn.prototype,"icon",void 0),dn([(0,v.MZ)()],fn.prototype,"walletIcon",void 0),dn([(0,v.MZ)({type:Boolean})],fn.prototype,"installed",void 0),dn([(0,v.MZ)({type:Boolean})],fn.prototype,"disabled",void 0),dn([(0,v.MZ)({type:Boolean})],fn.prototype,"showAllWallets",void 0),fn=dn([y("wui-list-wallet")],fn);const pn=n.AH`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    overflow: hidden;
  }

  wui-icon {
    width: 100%;
    height: 100%;
  }
`;var gn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let mn=class extends n.WF{constructor(){super(...arguments),this.logo="google"}render(){return n.qy`<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `}};mn.styles=[p,pn],gn([(0,v.MZ)()],mn.prototype,"logo",void 0),mn=gn([y("wui-logo")],mn);const yn=n.AH`
  :host {
    display: block;
    width: 100%;
  }

  button {
    width: 100%;
    height: 56px;
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var wn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let bn=class extends n.WF{constructor(){super(...arguments),this.logo="google",this.disabled=!1}render(){return n.qy`
      <button ?disabled=${this.disabled} ontouchstart>
        <wui-logo logo=${this.logo}></wui-logo>
      </button>
    `}};bn.styles=[p,g,yn],wn([(0,v.MZ)()],bn.prototype,"logo",void 0),wn([(0,v.MZ)({type:Boolean})],bn.prototype,"disabled",void 0),bn=wn([y("wui-logo-select")],bn);const vn=n.AH`
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-2xs) var(--wui-spacing-s) var(--wui-spacing-2xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-gray-glass-005);
    color: var(--wui-color-fg-100);
  }

  button:disabled {
    border: 1px solid var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-gray-glass-010);
    }

    button:active:enabled {
      background-color: var(--wui-color-gray-glass-015);
    }
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }
`;var An=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let En=class extends n.WF{constructor(){super(...arguments),this.imageSrc=void 0,this.isUnsupportedChain=void 0,this.disabled=!1}render(){return n.qy`
      <button ?disabled=${this.disabled}>
        ${this.visualTemplate()}
        <wui-text variant="paragraph-600" color="inherit">
          <slot></slot>
        </wui-text>
      </button>
    `}visualTemplate(){return this.isUnsupportedChain?n.qy`
        <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
        ></wui-icon-box>
      `:this.imageSrc?n.qy`<wui-image src=${this.imageSrc}></wui-image>`:n.qy`
      <wui-icon-box
        size="sm"
        iconColor="inverse-100"
        backgroundColor="fg-100"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `}};En.styles=[p,g,vn],An([(0,v.MZ)()],En.prototype,"imageSrc",void 0),An([(0,v.MZ)({type:Boolean})],En.prototype,"isUnsupportedChain",void 0),An([(0,v.MZ)({type:Boolean})],En.prototype,"disabled",void 0),En=An([y("wui-network-button")],En);const xn=n.AH`
  :host {
    position: relative;
    display: block;
  }
`;var Cn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Sn=class extends n.WF{constructor(){super(...arguments),this.length=6,this.otp="",this.values=Array.from({length:this.length}).map((()=>"")),this.numerics=[],this.shouldInputBeEnabled=e=>this.values.slice(0,e).every((e=>""!==e)),this.handleKeyDown=(e,t)=>{const r=e.target,n=this.getInputElement(r);if(!n)return;["ArrowLeft","ArrowRight","Shift","Delete"].includes(e.key)&&e.preventDefault();const i=n.selectionStart;switch(e.key){case"ArrowLeft":i&&n.setSelectionRange(i+1,i+1),this.focusInputField("prev",t);break;case"ArrowRight":case"Shift":this.focusInputField("next",t);break;case"Delete":case"Backspace":""===n.value?this.focusInputField("prev",t):this.updateInput(n,t,"")}},this.focusInputField=(e,t)=>{if("next"===e){const e=t+1;if(!this.shouldInputBeEnabled(e))return;const r=this.numerics[e<this.length?e:t],n=r?this.getInputElement(r):void 0;n&&(n.disabled=!1,n.focus())}if("prev"===e){const e=t-1,r=this.numerics[e>-1?e:t],n=r?this.getInputElement(r):void 0;n&&n.focus()}}}firstUpdated(){this.otp&&(this.values=this.otp.split(""));const e=this.shadowRoot?.querySelectorAll("wui-input-numeric");e&&(this.numerics=Array.from(e)),this.numerics[0]?.focus()}render(){return n.qy`
      <wui-flex gap="xxs" data-testid="wui-otp-input">
        ${Array.from({length:this.length}).map(((e,t)=>n.qy`
            <wui-input-numeric
              @input=${e=>this.handleInput(e,t)}
              @click=${e=>this.selectInput(e)}
              @keydown=${e=>this.handleKeyDown(e,t)}
              .disabled=${!this.shouldInputBeEnabled(t)}
              .value=${this.values[t]||""}
            >
            </wui-input-numeric>
          `))}
      </wui-flex>
    `}updateInput(e,t,r){const n=this.numerics[t],i=e||(n?this.getInputElement(n):void 0);i&&(i.value=r,this.values=this.values.map(((e,n)=>n===t?r:e)))}selectInput(e){const t=e.target;if(t){const e=this.getInputElement(t);e?.select()}}handleInput(e,t){const r=e.target,n=this.getInputElement(r);if(n){const r=n.value;"insertFromPaste"===e.inputType?this.handlePaste(n,r,t):Tt.isNumber(r)&&e.data?(this.updateInput(n,t,e.data),this.focusInputField("next",t)):this.updateInput(n,t,"")}this.dispatchInputChangeEvent()}handlePaste(e,t,r){const n=t[0];if(n&&Tt.isNumber(n)){this.updateInput(e,r,n);const i=t.substring(1);if(r+1<this.length&&i.length){const e=this.numerics[r+1],t=e?this.getInputElement(e):void 0;t&&this.handlePaste(t,i,r+1)}else this.focusInputField("next",r)}else this.updateInput(e,r,"")}getInputElement(e){return e.shadowRoot?.querySelector("input")?e.shadowRoot.querySelector("input"):null}dispatchInputChangeEvent(){const e=this.values.join("");this.dispatchEvent(new CustomEvent("inputChange",{detail:e,bubbles:!0,composed:!0}))}};Sn.styles=[p,xn],Cn([(0,v.MZ)({type:Number})],Sn.prototype,"length",void 0),Cn([(0,v.MZ)({type:String})],Sn.prototype,"otp",void 0),Cn([(0,v.wk)()],Sn.prototype,"values",void 0),Sn=Cn([y("wui-otp")],Sn);var kn=r(7583);function _n(e,t,r){return e!==t&&(e-t<0?t-e:e-t)<=r+.1}const In={generate(e,t,r){const i="#141414",s=[],o=function(e,t){const r=Array.prototype.slice.call(kn.create(e,{errorCorrectionLevel:"Q"}).modules.data,0),n=Math.sqrt(r.length);return r.reduce(((e,t,r)=>(r%n==0?e.push([t]):e[e.length-1].push(t))&&e),[])}(e),a=t/o.length,c=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];c.forEach((({x:e,y:t})=>{const r=(o.length-7)*a*e,l=(o.length-7)*a*t,u=.45;for(let e=0;e<c.length;e+=1){const t=a*(7-2*e);s.push(n.JW`
            <rect
              fill=${2===e?i:"transparent"}
              width=${0===e?t-5:t}
              rx= ${0===e?(t-5)*u:t*u}
              ry= ${0===e?(t-5)*u:t*u}
              stroke=${i}
              stroke-width=${0===e?5:0}
              height=${0===e?t-5:t}
              x= ${0===e?l+a*e+2.5:l+a*e}
              y= ${0===e?r+a*e+2.5:r+a*e}
            />
          `)}}));const l=Math.floor((r+25)/a),u=o.length/2-l/2,h=o.length/2+l/2-1,d=[];o.forEach(((e,t)=>{e.forEach(((e,r)=>{if(o[t][r]&&!(t<7&&r<7||t>o.length-8&&r<7||t<7&&r>o.length-8||t>u&&t<h&&r>u&&r<h)){const e=t*a+a/2,n=r*a+a/2;d.push([e,n])}}))}));const f={};return d.forEach((([e,t])=>{f[e]?f[e]?.push(t):f[e]=[t]})),Object.entries(f).map((([e,t])=>{const r=t.filter((e=>t.every((t=>!_n(e,t,a)))));return[Number(e),r]})).forEach((([e,t])=>{t.forEach((t=>{s.push(n.JW`<circle cx=${e} cy=${t} fill=${i} r=${a/2.5} />`)}))})),Object.entries(f).filter((([e,t])=>t.length>1)).map((([e,t])=>{const r=t.filter((e=>t.some((t=>_n(e,t,a)))));return[Number(e),r]})).map((([e,t])=>{t.sort(((e,t)=>e<t?-1:1));const r=[];for(const e of t){const t=r.find((t=>t.some((t=>_n(e,t,a)))));t?t.push(e):r.push([e])}return[e,r.map((e=>[e[0],e[e.length-1]]))]})).forEach((([e,t])=>{t.forEach((([t,r])=>{s.push(n.JW`
              <line
                x1=${e}
                x2=${e}
                y1=${t}
                y2=${r}
                stroke=${i}
                stroke-width=${a/1.25}
                stroke-linecap="round"
              />
            `)}))})),s}},Mn=n.AH`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: var(--local-size);
  }

  :host([data-theme='dark']) {
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px);
    background-color: var(--wui-color-inverse-100);
    padding: var(--wui-spacing-l);
  }

  :host([data-theme='light']) {
    box-shadow: 0 0 0 1px var(--wui-color-bg-125);
    background-color: var(--wui-color-bg-125);
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: #3396ff !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }
`;var Tn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Pn=class extends n.WF{constructor(){super(...arguments),this.uri="",this.size=0,this.theme="dark",this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),this.style.cssText=`--local-size: ${this.size}px`,n.qy`${this.templateVisual()} ${this.templateSvg()}`}templateSvg(){const e="light"===this.theme?this.size:this.size-32;return n.JW`
      <svg height=${e} width=${e}>
        ${In.generate(this.uri,e,this.arenaClear?0:e/4)}
      </svg>
    `}templateVisual(){return this.imageSrc?n.qy`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:n.qy`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};Pn.styles=[p,Mn],Tn([(0,v.MZ)()],Pn.prototype,"uri",void 0),Tn([(0,v.MZ)({type:Number})],Pn.prototype,"size",void 0),Tn([(0,v.MZ)()],Pn.prototype,"theme",void 0),Tn([(0,v.MZ)()],Pn.prototype,"imageSrc",void 0),Tn([(0,v.MZ)()],Pn.prototype,"alt",void 0),Tn([(0,v.MZ)({type:Boolean})],Pn.prototype,"arenaClear",void 0),Pn=Tn([y("wui-qr-code")],Pn);const On=n.AH`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;let Rn=class extends n.WF{constructor(){super(...arguments),this.inputComponentRef=(0,_r._)()}render(){return n.qy`
      <wui-input-text
        ${(0,_r.K)(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){const e=this.inputComponentRef.value,t=e?.inputElementRef.value;t&&(t.value="",t.focus(),t.dispatchEvent(new Event("input")))}};Rn.styles=[p,On],Rn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([y("wui-search-bar")],Rn);const Nn=n.AH`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-xs);
    align-items: center;
    padding: var(--wui-spacing-xs) var(--wui-spacing-m) var(--wui-spacing-xs) var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    box-sizing: border-box;
    max-height: 40px;
    background-color: var(--wui-color-bg-175);
    box-shadow:
      0px 14px 64px -4px rgba(0, 0, 0, 0.15),
      0px 8px 22px -6px rgba(0, 0, 0, 0.15);
  }
`;var Bn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Un=class extends n.WF{constructor(){super(...arguments),this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="checkmark",this.message=""}render(){return n.qy`
      <wui-icon-box
        size="sm"
        iconSize="xs"
        iconColor=${this.iconColor}
        backgroundColor=${this.backgroundColor}
        icon=${this.icon}
        background="opaque"
      ></wui-icon-box>
      <wui-text variant="paragraph-500" color="fg-100">${this.message}</wui-text>
    `}};Un.styles=[p,Nn],Bn([(0,v.MZ)()],Un.prototype,"backgroundColor",void 0),Bn([(0,v.MZ)()],Un.prototype,"iconColor",void 0),Bn([(0,v.MZ)()],Un.prototype,"icon",void 0),Bn([(0,v.MZ)()],Un.prototype,"message",void 0),Un=Bn([y("wui-snackbar")],Un);const Dn=n.AH`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`;var Ln=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Fn=class extends n.WF{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth="100px",this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`\n      --local-tab: ${this.activeTab};\n      --local-tab-width: ${this.localTabWidth};\n    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map(((e,t)=>{const r=t===this.activeTab;return n.qy`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(t)}
          data-active=${r}
          data-testid="tab-${e.label?.toLowerCase()}"
        >
          ${this.iconTemplate(e)}
          <wui-text variant="small-600" color="inherit"> ${e.label} </wui-text>
        </button>
      `}))}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout((()=>{this.animateTabs(0,!0)}),0))}iconTemplate(e){return e.icon?n.qy`<wui-icon size="xs" color="inherit" name=${e.icon}></wui-icon>`:null}onTabClick(e){this.buttons&&this.animateTabs(e,!1),this.activeTab=e,this.onTabChange(e)}animateTabs(e,t){const r=this.buttons[this.activeTab],n=this.buttons[e],i=r?.querySelector("wui-text"),s=n?.querySelector("wui-text"),o=n?.getBoundingClientRect(),a=s?.getBoundingClientRect();r&&i&&!t&&e!==this.activeTab&&(i.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),r.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),n&&o&&a&&s&&(e!==this.activeTab||t)&&(this.localTabWidth=`${Math.round(o.width+a.width)+6}px`,n.animate([{width:`${o.width+a.width}px`}],{duration:t?0:500,fill:"forwards",easing:"ease"}),s.animate([{opacity:1}],{duration:t?0:125,delay:t?0:200,fill:"forwards",easing:"ease"}))}};Fn.styles=[p,g,Dn],Ln([(0,v.MZ)({type:Array})],Fn.prototype,"tabs",void 0),Ln([(0,v.MZ)()],Fn.prototype,"onTabChange",void 0),Ln([(0,v.MZ)({type:Array})],Fn.prototype,"buttons",void 0),Ln([(0,v.MZ)({type:Boolean})],Fn.prototype,"disabled",void 0),Ln([(0,v.MZ)()],Fn.prototype,"localTabWidth",void 0),Ln([(0,v.wk)()],Fn.prototype,"activeTab",void 0),Ln([(0,v.wk)()],Fn.prototype,"isDense",void 0),Fn=Ln([y("wui-tabs")],Fn);const jn=n.AH`
  :host {
    display: block;
  }

  :host > button {
    gap: var(--wui-spacing-xxs);
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-1xs);
    height: 40px;
    border-radius: var(--wui-border-radius-l);
    background: var(--wui-color-gray-glass-002);
    border-width: 0px;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
  }

  :host > button wui-image {
    width: 24px;
    height: 24px;
    border-radius: var(--wui-border-radius-s);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }
`;var Hn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let zn=class extends n.WF{constructor(){super(...arguments),this.text=""}render(){return n.qy`
      <button ontouchstart>
        ${this.tokenTemplate()}
        <wui-text variant="paragraph-600" color="fg-100">${this.text}</wui-text>
      </button>
    `}tokenTemplate(){return this.imageSrc?n.qy`<wui-image src=${this.imageSrc}></wui-image>`:n.qy`
      <wui-icon-box
        size="sm"
        iconColor="fg-200"
        backgroundColor="fg-300"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `}};zn.styles=[p,g,jn],Hn([(0,v.MZ)()],zn.prototype,"imageSrc",void 0),Hn([(0,v.MZ)()],zn.prototype,"text",void 0),zn=Hn([y("wui-token-button")],zn);const qn=n.AH`
  :host {
    display: block;
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);

    color: var(--wui-color-bg-100);
    position: relative;
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`;var $n=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Wn=class extends n.WF{constructor(){super(...arguments),this.placement="top",this.variant="fill",this.message=""}render(){return this.dataset.variant=this.variant,n.qy`<wui-icon
        data-placement=${this.placement}
        color="fg-100"
        size="inherit"
        name=${"fill"===this.variant?"cursor":"cursorTransparent"}
      ></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>`}};Wn.styles=[p,g,qn],$n([(0,v.MZ)()],Wn.prototype,"placement",void 0),$n([(0,v.MZ)()],Wn.prototype,"variant",void 0),$n([(0,v.MZ)()],Wn.prototype,"message",void 0),Wn=$n([y("wui-tooltip")],Wn);const Gn=n.AH`
  :host > wui-flex {
    cursor: pointer;
    display: flex;
    column-gap: var(--wui-spacing-s);
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-l);
    width: 100%;
    background-color: transparent;
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition: background-color 0.2s linear;
  }

  :host > wui-flex:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  :host([disabled]) > wui-flex {
    opacity: 0.6;
  }

  :host([disabled]) > wui-flex:hover {
    background-color: transparent;
  }

  :host > wui-flex > wui-flex {
    flex: 1;
  }

  :host > wui-flex > wui-image {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-3xl);
    position: relative;
  }

  :host > wui-flex > wui-image::after {
    position: absolute;
    content: '';
    inset: 0;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-l);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }
`;var Vn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Kn=class extends n.WF{constructor(){super(...arguments),this.imageSrc=void 0,this.name=void 0,this.symbol=void 0,this.price=void 0,this.amount=void 0}render(){const e=this.amount&&this.price?o.Se.multiply(this.price,this.amount)?.toFixed(3):null;return n.qy`
      <wui-flex alignItems="center">
        ${this.visualTemplate()}
        <wui-flex flexDirection="column" gap="3xs">
          <wui-flex justifyContent="space-between">
            <wui-text variant="paragraph-500" color="fg-100">${this.name}</wui-text>
            ${e?n.qy`
                  <wui-text variant="paragraph-500" color="fg-100">
                    $${Tt.formatNumberToLocalString(e,3)}
                  </wui-text>
                `:null}
          </wui-flex>
          <wui-flex justifyContent="space-between">
            <wui-text variant="small-400" color="fg-200">${this.symbol}</wui-text>
            ${this.amount?n.qy`<wui-text variant="small-400" color="fg-200">
                  ${Tt.formatNumberToLocalString(this.amount,4)}
                </wui-text>`:null}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}visualTemplate(){return this.imageSrc?n.qy`<wui-image width="40" height="40" src=${this.imageSrc}></wui-image>`:null}};Kn.styles=[p,g,Gn],Vn([(0,v.MZ)()],Kn.prototype,"imageSrc",void 0),Vn([(0,v.MZ)()],Kn.prototype,"name",void 0),Vn([(0,v.MZ)()],Kn.prototype,"symbol",void 0),Vn([(0,v.MZ)()],Kn.prototype,"price",void 0),Vn([(0,v.MZ)()],Kn.prototype,"amount",void 0),Kn=Vn([y("wui-token-list-item")],Kn);const Zn=n.AH`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--wui-icon-box-size-xl);
    height: var(--wui-icon-box-size-xl);
    box-shadow: 0 0 0 8px var(--wui-thumbnail-border);
    border-radius: var(--local-border-radius);
    overflow: hidden;
  }

  wui-icon {
    width: 32px;
    height: 32px;
  }
`;var Qn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Jn=class extends n.WF{render(){return this.style.cssText=`--local-border-radius: ${this.borderRadiusFull?"1000px":"20px"};`,n.qy`${this.templateVisual()}`}templateVisual(){return this.imageSrc?n.qy`<wui-image src=${this.imageSrc} alt=${this.alt??""}></wui-image>`:n.qy`<wui-icon
      data-parent-size="md"
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};Jn.styles=[p,Zn],Qn([(0,v.MZ)()],Jn.prototype,"imageSrc",void 0),Qn([(0,v.MZ)()],Jn.prototype,"alt",void 0),Qn([(0,v.MZ)({type:Boolean})],Jn.prototype,"borderRadiusFull",void 0),Jn=Qn([y("wui-visual-thumbnail")],Jn);const Yn=n.AH`
  :host {
    display: block;
  }

  button {
    width: 100%;
    display: block;
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    padding-left: var(--wui-spacing-s);
    padding-right: var(--wui-spacing-2l);
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-accent-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-accent-glass-010) !important;
  }

  button:active {
    background-color: var(--wui-color-accent-glass-020) !important;
  }
`;var Xn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let ei=class extends n.WF{constructor(){super(...arguments),this.label="",this.description="",this.icon="wallet"}render(){return n.qy`
      <button>
        <wui-flex gap="m" alignItems="center" justifyContent="space-between">
          <wui-icon-box
            size="lg"
            iconcolor="accent-100"
            backgroundcolor="accent-100"
            icon=${this.icon}
            background="transparent"
          ></wui-icon-box>

          <wui-flex flexDirection="column" gap="3xs">
            <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
            <wui-text variant="small-400" color="fg-200">${this.description}</wui-text>
          </wui-flex>

          <wui-icon size="md" color="fg-200" name="chevronRight"></wui-icon>
        </wui-flex>
      </button>
    `}};ei.styles=[p,g,Yn],Xn([(0,v.MZ)()],ei.prototype,"label",void 0),Xn([(0,v.MZ)()],ei.prototype,"description",void 0),Xn([(0,v.MZ)()],ei.prototype,"icon",void 0),ei=Xn([y("wui-notice-card")],ei);const ti=n.AH`
  button {
    height: auto;
    position: relative;
    flex-direction: column;
    gap: var(--wui-spacing-s);
    padding: 17px 18px 17px var(--wui-spacing-m);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
  }

  .overflowedContent {
    width: 100%;
    overflow: hidden;
  }

  .overflowedContent[data-active='false']:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, var(--wui-color-bg-200), transparent);
    border-bottom-left-radius: var(--wui-border-radius-xs);
    border-bottom-right-radius: var(--wui-border-radius-xs);
  }

  .heightContent {
    max-height: 100px;
  }

  pre {
    text-align: left;
    white-space: pre-wrap;
    height: auto;
    overflow-x: auto;
    overflow-wrap: anywhere;
  }
`;var ri=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let ni=class extends n.WF{constructor(){super(...arguments),this.textTitle="",this.overflowedContent="",this.toggled=!1,this.enableAccordion=!1,this.scrollElement=void 0,this.scrollHeightElement=0}updated(e){super.updated(e),(e.has("textTitle")||e.has("overflowedContent"))&&setTimeout((()=>{this.checkHeight()}),1)}checkHeight(){this.updateComplete.then((()=>{const e=this.shadowRoot?.querySelector(".heightContent"),t=this.shadowRoot?.querySelector(".textContent");if(e&&t){this.scrollElement=e;const r=t?.scrollHeight;r&&r>100&&(this.enableAccordion=!0,this.scrollHeightElement=r,this.requestUpdate())}}))}render(){return n.qy`
      <button ontouchstart @click=${()=>this.onClick()}>
        <wui-flex justifyContent="space-between" alignItems="center">
          <wui-text variant="paragraph-500" color="fg-100">${this.textTitle}</wui-text>
          ${this.chevronTemplate()}
        </wui-flex>
        <div
          data-active=${!this.enableAccordion||Boolean(this.toggled)}
          class="overflowedContent"
        >
          <div class="heightContent">
            <wui-text class="textContent" variant="paragraph-400" color="fg-200">
              <pre>${this.overflowedContent}</pre>
            </wui-text>
          </div>
        </div>
      </button>
    `}onClick(){const e=this.shadowRoot?.querySelector("wui-icon");this.enableAccordion&&(this.toggled=!this.toggled,this.requestUpdate(),this.scrollElement&&this.scrollElement.animate([{maxHeight:this.toggled?"100px":`${this.scrollHeightElement}px`},{maxHeight:this.toggled?`${this.scrollHeightElement}px`:"100px"}],{duration:300,fill:"forwards",easing:"ease"}),e&&e.animate([{transform:this.toggled?"rotate(0deg)":"rotate(180deg)"},{transform:this.toggled?"rotate(180deg)":"rotate(0deg)"}],{duration:300,fill:"forwards",easing:"ease"}))}chevronTemplate(){return this.enableAccordion?n.qy` <wui-icon color="fg-100" size="sm" name="chevronBottom"></wui-icon>`:null}};ni.styles=[p,g,ti],ri([(0,v.MZ)()],ni.prototype,"textTitle",void 0),ri([(0,v.MZ)()],ni.prototype,"overflowedContent",void 0),ni=ri([y("wui-list-accordion")],ni);const ii=n.AH`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    padding: 17px 18px 17px var(--wui-spacing-m);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
  }

  wui-image {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-icon {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
  }
`;var si=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let oi=class extends n.WF{constructor(){super(...arguments),this.imageSrc=void 0,this.textTitle="",this.textValue=void 0}render(){return n.qy`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="paragraph-500" color=${this.textValue?"fg-200":"fg-100"}>
          ${this.textTitle}
        </wui-text>
        ${this.templateContent()}
      </wui-flex>
    `}templateContent(){return this.imageSrc?n.qy`<wui-image src=${this.imageSrc} alt=${this.textTitle}></wui-image>`:this.textValue?n.qy` <wui-text variant="paragraph-400" color="fg-100"> ${this.textValue} </wui-text>`:n.qy`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`}};oi.styles=[p,g,ii],si([(0,v.MZ)()],oi.prototype,"imageSrc",void 0),si([(0,v.MZ)()],oi.prototype,"textTitle",void 0),si([(0,v.MZ)()],oi.prototype,"textValue",void 0),oi=si([y("wui-list-content")],oi);const ai=n.AH`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button[data-transparent='true'] {
    pointer-events: none;
    background-color: transparent;
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }
`;var ci=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let li=class extends n.WF{constructor(){super(...arguments),this.imageSrc="",this.name="",this.disabled=!1,this.transparent=!1}render(){return n.qy`
      <button data-transparent=${this.transparent} ?disabled=${this.disabled} ontouchstart>
        ${this.templateNetworkImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
      </button>
    `}templateNetworkImage(){return this.imageSrc?n.qy`<wui-network-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
      ></wui-network-image>`:this.imageSrc?null:n.qy`<wui-network-image size="sm" name=${this.name}></wui-network-image>`}};li.styles=[p,g,ai],ci([(0,v.MZ)()],li.prototype,"imageSrc",void 0),ci([(0,v.MZ)()],li.prototype,"name",void 0),ci([(0,v.MZ)({type:Boolean})],li.prototype,"disabled",void 0),ci([(0,v.MZ)({type:Boolean})],li.prototype,"transparent",void 0),li=ci([y("wui-list-network")],li);const ui=n.AH`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--wui-spacing-l);
    padding: 17px 18px 17px var(--wui-spacing-m);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
  }

  wui-image {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-icon {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
  }
`;var hi=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let di=class extends n.WF{constructor(){super(...arguments),this.amount="",this.networkCurreny="",this.networkImageUrl="",this.receiverAddress="",this.addressExplorerUrl=""}render(){return n.qy`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="paragraph-500" color="fg-200">Sending</wui-text>
        <wui-flex gap="xs" alignItems="center">
          <wui-text variant="paragraph-400" color="fg-100">
            ${this.amount} ${this.networkCurreny}
          </wui-text>
          ${this.templateNetworkVisual()}
        </wui-flex>
      </wui-flex>
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="paragraph-500" color="fg-200">To</wui-text>
        <wui-chip
          icon="externalLink"
          variant="shadeSmall"
          href=${this.addressExplorerUrl}
          title=${this.receiverAddress}
        ></wui-chip>
      </wui-flex>
    `}templateNetworkVisual(){return this.networkImageUrl?n.qy`<wui-image src=${this.networkImageUrl} alt="Network Image"></wui-image>`:n.qy`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`}};di.styles=[p,g,ui],hi([(0,v.MZ)()],di.prototype,"amount",void 0),hi([(0,v.MZ)()],di.prototype,"networkCurreny",void 0),hi([(0,v.MZ)()],di.prototype,"networkImageUrl",void 0),hi([(0,v.MZ)()],di.prototype,"receiverAddress",void 0),hi([(0,v.MZ)()],di.prototype,"addressExplorerUrl",void 0),di=hi([y("wui-list-wallet-transaction")],di);const fi=n.AH`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    width: 100%;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xs);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--wui-spacing-s);
  }

  :host > wui-flex:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  .purchase-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: var(--wui-icon-box-size-lg);
    height: var(--wui-icon-box-size-lg);
  }

  .purchase-image-container wui-image {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: calc(var(--wui-icon-box-size-lg) / 2);
  }

  .purchase-image-container wui-image::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-icon-box-size-lg) / 2);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  .purchase-image-container wui-icon-box {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(20%, 20%);
  }
`;var pi=r(2088),gi=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let mi=class extends n.WF{constructor(){super(...arguments),this.disabled=!1,this.color="inherit",this.label="Bought",this.purchaseValue="",this.purchaseCurrency="",this.date="",this.completed=!1,this.inProgress=!1,this.failed=!1,this.onClick=null,this.symbol=""}firstUpdated(){this.icon||this.fetchTokenImage()}render(){return n.qy`
      <wui-flex>
        ${this.imageTemplate()}
        <wui-flex flexDirection="column" gap="4xs" flexGrow="1">
          <wui-flex gap="xxs" alignItems="center" justifyContent="flex-start">
            ${this.statusIconTemplate()}
            <wui-text variant="paragraph-500" color="fg-100"> ${this.label}</wui-text>
          </wui-flex>
          <wui-text variant="small-400" color="fg-200">
            + ${this.purchaseValue} ${this.purchaseCurrency}
          </wui-text>
        </wui-flex>
        ${this.inProgress?n.qy`<wui-loading-spinner color="fg-200" size="md"></wui-loading-spinner>`:n.qy`<wui-text variant="micro-700" color="fg-300"><span>${this.date}</span></wui-text>`}
      </wui-flex>
    `}async fetchTokenImage(){await pi.ApiController._fetchTokenImage(this.purchaseCurrency)}statusIconTemplate(){return this.inProgress?null:this.completed?this.boughtIconTemplate():this.errorIconTemplate()}errorIconTemplate(){return n.qy`<wui-icon-box
      size="xxs"
      iconColor="error-100"
      backgroundColor="error-100"
      background="opaque"
      icon="close"
      borderColor="wui-color-bg-125"
    ></wui-icon-box>`}imageTemplate(){const e=this.icon||`https://avatar.vercel.sh/andrew.svg?size=50&text=${this.symbol}`;return n.qy`<wui-flex class="purchase-image-container">
      <wui-image src=${e}></wui-image>
    </wui-flex>`}boughtIconTemplate(){return n.qy`<wui-icon-box
      size="xxs"
      iconColor="success-100"
      backgroundColor="success-100"
      background="opaque"
      icon="arrowBottom"
      borderColor="wui-color-bg-125"
    ></wui-icon-box>`}};mi.styles=[p,g,fi],gi([(0,v.MZ)({type:Boolean})],mi.prototype,"disabled",void 0),gi([(0,v.MZ)()],mi.prototype,"color",void 0),gi([(0,v.MZ)()],mi.prototype,"label",void 0),gi([(0,v.MZ)()],mi.prototype,"purchaseValue",void 0),gi([(0,v.MZ)()],mi.prototype,"purchaseCurrency",void 0),gi([(0,v.MZ)()],mi.prototype,"date",void 0),gi([(0,v.MZ)({type:Boolean})],mi.prototype,"completed",void 0),gi([(0,v.MZ)({type:Boolean})],mi.prototype,"inProgress",void 0),gi([(0,v.MZ)({type:Boolean})],mi.prototype,"failed",void 0),gi([(0,v.MZ)()],mi.prototype,"onClick",void 0),gi([(0,v.MZ)()],mi.prototype,"symbol",void 0),gi([(0,v.MZ)()],mi.prototype,"icon",void 0),mi=gi([y("wui-onramp-activity-item")],mi);const yi=n.AH`
  button {
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xs);
    background-color: var(--wui-color-gray-glass-002);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--wui-spacing-s);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .provider-image {
    width: var(--wui-spacing-3xl);
    min-width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    border-radius: calc(var(--wui-border-radius-xs) - calc(var(--wui-spacing-s) / 2));
    position: relative;
    overflow: hidden;
  }

  .provider-image::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-border-radius-xs) - calc(var(--wui-spacing-s) / 2));
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  .network-icon {
    width: var(--wui-spacing-m);
    height: var(--wui-spacing-m);
    border-radius: calc(var(--wui-spacing-m) / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-002),
      0 0 0 3px var(--wui-color-modal-bg);
    transition: box-shadow var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: box-shadow;
  }

  button:hover .network-icon {
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-005),
      0 0 0 3px var(--wui-color-modal-bg);
  }
`;var wi=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let bi=class extends n.WF{constructor(){super(...arguments),this.disabled=!1,this.color="inherit",this.label="",this.feeRange="",this.loading=!1,this.onClick=null}render(){return n.qy`
      <button ?disabled=${this.disabled} ontouchstart>
        <wui-visual name=${(0,Mt.J)(this.name)} class="provider-image"></wui-visual>
        <wui-flex flexDirection="column" gap="4xs">
          <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
          <wui-flex alignItems="center" justifyContent="flex-start" gap="l">
            <wui-text variant="tiny-500" color="fg-100">
              <wui-text variant="tiny-400" color="fg-200">Fees</wui-text>
              ${this.feeRange}
            </wui-text>
            <wui-flex gap="xxs">
              <wui-icon name="bank" size="xs" color="fg-150"></wui-icon>
              <wui-icon name="card" size="xs" color="fg-150"></wui-icon>
            </wui-flex>
            ${this.networksTemplate()}
          </wui-flex>
        </wui-flex>
        ${this.loading?n.qy`<wui-loading-spinner color="fg-200" size="md"></wui-loading-spinner>`:n.qy`<wui-icon name="chevronRight" color="fg-200" size="sm"></wui-icon>`}
      </button>
    `}networksTemplate(){const e=pi.NetworkController.getRequestedCaipNetworks(),t=e?.filter((e=>e?.imageId))?.slice(0,5);return n.qy`
      <wui-flex class="networks">
        ${t?.map((e=>n.qy`
            <wui-flex class="network-icon">
              <wui-image src=${(0,Mt.J)(pi.$m.getNetworkImage(e))}></wui-image>
            </wui-flex>
          `))}
      </wui-flex>
    `}};bi.styles=[p,g,yi],wi([(0,v.MZ)({type:Boolean})],bi.prototype,"disabled",void 0),wi([(0,v.MZ)()],bi.prototype,"color",void 0),wi([(0,v.MZ)()],bi.prototype,"name",void 0),wi([(0,v.MZ)()],bi.prototype,"label",void 0),wi([(0,v.MZ)()],bi.prototype,"feeRange",void 0),wi([(0,v.MZ)({type:Boolean})],bi.prototype,"loading",void 0),wi([(0,v.MZ)()],bi.prototype,"onClick",void 0),bi=wi([y("wui-onramp-provider-item")],bi);const vi=n.AH`
  button {
    display: flex;
    gap: var(--wui-spacing-3xs);
    align-items: center;
    padding: 6.25px var(--wui-spacing-xs) 7.25px var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-090);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-060);
    transition: background-color var(--wui-duration-md) var(--wui-ease-inout-power-1);
    will-change: background-color;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-gray-glass-080);
    }

    button:active:enabled {
      background-color: var(--wui-color-gray-glass-060);
    }
  }
`;var Ai=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Ei=class extends n.WF{constructor(){super(...arguments),this.text=""}render(){return n.qy`<button ontouchstart>
      <wui-text variant="small-600" color="bg-100">${this.text}</wui-text>
      <wui-icon color="bg-100" size="xs" name="arrowRight"></wui-icon>
    </button>`}};Ei.styles=[p,g,vi],Ai([(0,v.MZ)()],Ei.prototype,"text",void 0),Ei=Ai([y("wui-promo")],Ei);const xi=n.AH`
  span {
    font-weight: 500;
    font-size: 40px;
    color: var(--wui-color-fg-100);
    line-height: 130%; /* 52px */
    letter-spacing: -1.6px;
    text-align: center;
  }

  .pennies {
    color: var(--wui-color-fg-200);
  }
`;var Ci=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Si=class extends n.WF{constructor(){super(...arguments),this.dollars="0",this.pennies="00"}render(){return n.qy`<span>$${this.dollars}<span class="pennies">.${this.pennies}</span></span>`}};Si.styles=[p,xi],Ci([(0,v.MZ)()],Si.prototype,"dollars",void 0),Ci([(0,v.MZ)()],Si.prototype,"pennies",void 0),Si=Ci([y("wui-balance")],Si);const ki=n.AH`
  button {
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s) var(--wui-spacing-xs) var(--wui-spacing-xs);
    position: relative;
  }

  wui-avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 0;
    outline: 3px solid var(--wui-color-gray-glass-005);
  }

  wui-icon-box,
  wui-image {
    width: 16px;
    height: 16px;
    border-radius: var(--wui-border-radius-3xl);
    position: absolute;
    left: 26px;
    top: 24px;
  }

  wui-image {
    outline: 2px solid var(--wui-color-bg-125);
  }

  wui-icon-box {
    outline: 2px solid var(--wui-color-bg-200);
    background-color: var(--wui-color-bg-250);
  }
`;var _i=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Ii=class extends n.WF{constructor(){super(...arguments),this.networkSrc=void 0,this.avatarSrc=void 0,this.profileName="",this.address="",this.icon="chevronBottom"}render(){return n.qy`<button ontouchstart data-testid="wui-profile-button">
      <wui-flex gap="xs" alignItems="center">
        <wui-avatar
          .imageSrc=${this.avatarSrc}
          alt=${this.address}
          address=${this.address}
        ></wui-avatar>
        ${this.networkImageTemplate()}
        <wui-flex gap="xs" alignItems="center">
          <wui-text variant="large-600" color="fg-100">
            ${Tt.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
          </wui-text>
          <wui-icon size="sm" color="fg-200" name=${this.icon}></wui-icon>
        </wui-flex>
      </wui-flex>
    </button>`}networkImageTemplate(){return this.networkSrc?n.qy`<wui-image src=${this.networkSrc}></wui-image>`:n.qy`
      <wui-icon-box
        size="xxs"
        iconColor="fg-200"
        backgroundColor="bg-100"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `}};Ii.styles=[p,g,ki],_i([(0,v.MZ)()],Ii.prototype,"networkSrc",void 0),_i([(0,v.MZ)()],Ii.prototype,"avatarSrc",void 0),_i([(0,v.MZ)()],Ii.prototype,"profileName",void 0),_i([(0,v.MZ)()],Ii.prototype,"address",void 0),_i([(0,v.MZ)()],Ii.prototype,"icon",void 0),Ii=_i([y("wui-profile-button")],Ii);const Mi=n.AH`
  button {
    border: none;
    border-radius: var(--wui-border-radius-3xl);
  }

  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='gray'] {
    background-color: transparent;
    color: var(--wui-color-fg-200);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='shade'] {
    background-color: transparent;
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-size='sm'] {
    height: 32px;
    padding: 0 var(--wui-spacing-s);
  }

  button[data-size='md'] {
    height: 40px;
    padding: 0 var(--wui-spacing-l);
  }

  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  button.disabled > wui-icon,
  button.disabled > wui-image {
    filter: grayscale(1);
  }

  button[data-variant='main'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  button[data-variant='shade'] > wui-image,
  button[data-variant='gray'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:focus-visible {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='shade']:focus-visible,
    button[data-variant='gray']:focus-visible,
    button[data-variant='shade']:hover,
    button[data-variant='gray']:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    button[data-variant='gray']:active,
    button[data-variant='shade']:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  button.disabled {
    color: var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    pointer-events: none;
  }
`;var Ti=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Pi=class extends n.WF{constructor(){super(...arguments),this.variant="accent",this.imageSrc="",this.disabled=!1,this.icon="externalLink",this.size="md",this.text=""}render(){const e="sm"===this.size?"small-600":"paragraph-600";return n.qy`
      <button
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?n.qy`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${e} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};Pi.styles=[p,g,Mi],Ti([(0,v.MZ)()],Pi.prototype,"variant",void 0),Ti([(0,v.MZ)()],Pi.prototype,"imageSrc",void 0),Ti([(0,v.MZ)({type:Boolean})],Pi.prototype,"disabled",void 0),Ti([(0,v.MZ)()],Pi.prototype,"icon",void 0),Ti([(0,v.MZ)()],Pi.prototype,"size",void 0),Ti([(0,v.MZ)()],Pi.prototype,"text",void 0),Pi=Ti([y("wui-chip-button")],Pi);const Oi=n.AH`
  button {
    display: flex;
    gap: var(--wui-spacing-xl);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    padding: var(--wui-spacing-m) var(--wui-spacing-s);
  }

  wui-text {
    width: 100%;
  }

  wui-flex {
    width: auto;
  }

  .network-icon {
    width: var(--wui-spacing-2l);
    height: var(--wui-spacing-2l);
    border-radius: calc(var(--wui-spacing-2l) / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-002),
      0 0 0 3px var(--wui-color-modal-bg);
  }
`;var Ri=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Ni=class extends n.WF{constructor(){super(...arguments),this.networkImages=[""],this.text=""}render(){return n.qy`
      <button ontouchstart>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
        <wui-flex gap="3xs" alignItems="center">
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="fg-200"></wui-icon>
        </wui-flex>
      </button>
    `}networksTemplate(){const e=this.networkImages.slice(0,5);return n.qy` <wui-flex class="networks">
      ${e?.map((e=>n.qy` <wui-flex class="network-icon"> <wui-image src=${e}></wui-image> </wui-flex>`))}
    </wui-flex>`}};Ni.styles=[p,g,Oi],Ri([(0,v.MZ)({type:Array})],Ni.prototype,"networkImages",void 0),Ri([(0,v.MZ)()],Ni.prototype,"text",void 0),Ni=Ri([y("wui-compatible-network")],Ni);const Bi=n.AH`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-s);
    padding: var(--wui-spacing-1xs) var(--wui-spacing-s) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }
`;var Ui=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Di=class extends n.WF{constructor(){super(...arguments),this.icon="externalLink",this.text=""}render(){return n.qy`
      <wui-flex gap="1xs" alignItems="center">
        <wui-icon-box
          size="sm"
          iconcolor="fg-200"
          backgroundcolor="fg-200"
          icon=${this.icon}
          background="transparent"
        ></wui-icon-box>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
      </wui-flex>
    `}};Di.styles=[p,g,Bi],Ui([(0,v.MZ)()],Di.prototype,"icon",void 0),Ui([(0,v.MZ)()],Di.prototype,"text",void 0),Di=Ui([y("wui-banner")],Di);const Li=n.AH`
  button {
    padding: 6.5px var(--wui-spacing-l) 6.5px var(--wui-spacing-xs);
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    background-color: var(--wui-color-gray-glass-002);
  }

  button[data-clickable='false'] {
    pointer-events: none;
    background-color: transparent;
  }

  wui-image,
  wui-icon {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
  }
`;var Fi=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let ji=class extends n.WF{constructor(){super(...arguments),this.tokenName="",this.tokenImageUrl="",this.tokenValue=0,this.tokenAmount="0.0",this.tokenCurrency="",this.clickable=!1}render(){return n.qy`
      <button data-clickable=${String(this.clickable)} ontouchstart>
        <wui-flex gap="s" alignItems="center">
          ${this.visualTemplate()}
          <wui-flex flexDirection="column" justifyContent="spaceBetween">
            <wui-text variant="paragraph-500" color="fg-100">${this.tokenName}</wui-text>
            <wui-text variant="small-400" color="fg-200">
              ${Tt.formatNumberToLocalString(this.tokenAmount,4)} ${this.tokenCurrency}
            </wui-text>
          </wui-flex>
        </wui-flex>
        <wui-text variant="paragraph-500" color="fg-100">$${this.tokenValue.toFixed(2)}</wui-text>
      </button>
    `}visualTemplate(){return this.tokenName&&this.tokenImageUrl?n.qy`<wui-image alt=${this.tokenName} src=${this.tokenImageUrl}></wui-image>`:n.qy`<wui-icon name="coinPlaceholder" color="fg-100"></wui-icon>`}};ji.styles=[p,g,Li],Fi([(0,v.MZ)()],ji.prototype,"tokenName",void 0),Fi([(0,v.MZ)()],ji.prototype,"tokenImageUrl",void 0),Fi([(0,v.MZ)({type:Number})],ji.prototype,"tokenValue",void 0),Fi([(0,v.MZ)()],ji.prototype,"tokenAmount",void 0),Fi([(0,v.MZ)()],ji.prototype,"tokenCurrency",void 0),Fi([(0,v.MZ)({type:Boolean})],ji.prototype,"clickable",void 0),ji=Fi([y("wui-list-token")],ji);const Hi=n.AH`
  button {
    width: 100%;
    display: flex;
    gap: var(--wui-spacing-s);
    align-items: center;
    justify-content: flex-start;
    padding: var(--wui-spacing-s) var(--wui-spacing-m) var(--wui-spacing-s) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
  }

  wui-flex {
    width: auto;
  }
`;var zi=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let qi=class extends n.WF{constructor(){super(...arguments),this.icon="card",this.text="",this.description="",this.tag=void 0,this.iconBackgroundColor="accent-100",this.iconColor="accent-100",this.disabled=!1}render(){return n.qy`
      <button ontouchstart ?disabled=${this.disabled}>
        <wui-icon-box
          iconColor=${this.iconColor}
          backgroundColor=${this.iconBackgroundColor}
          size="inherit"
          icon=${this.icon}
          iconSize="md"
        ></wui-icon-box>
        <wui-flex flexDirection="column" justifyContent="spaceBetween">
          ${this.titleTemplate()}
          <wui-text variant="small-400" color="fg-200"> ${this.description}</wui-text></wui-flex
        >
      </button>
    `}titleTemplate(){return this.tag?n.qy` <wui-flex alignItems="center" gap="xxs"
        ><wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text
        ><wui-tag tagType="main" size="md">${this.tag}</wui-tag>
      </wui-flex>`:n.qy`<wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>`}};qi.styles=[p,g,Hi],zi([(0,v.MZ)()],qi.prototype,"icon",void 0),zi([(0,v.MZ)()],qi.prototype,"text",void 0),zi([(0,v.MZ)()],qi.prototype,"description",void 0),zi([(0,v.MZ)()],qi.prototype,"tag",void 0),zi([(0,v.MZ)()],qi.prototype,"iconBackgroundColor",void 0),zi([(0,v.MZ)()],qi.prototype,"iconColor",void 0),zi([(0,v.MZ)({type:Boolean})],qi.prototype,"disabled",void 0),qi=zi([y("wui-list-description")],qi);const $i=n.AH`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    background: transparent;
    width: 100%;
    height: auto;
    font-family: var(--wui-font-family);
    color: var(--wui-color-fg-100);

    font-feature-settings: 'case' on;
    font-size: 32px;
    font-weight: var(--wui-font-weight-light);
    caret-color: var(--wui-color-accent-100);
    line-height: 130%;
    letter-spacing: -1.28px;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }
`,Wi=/[.*+?^${}()|[\]\\]/gu,Gi=/[0-9,.]/u;var Vi=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Ki=class extends n.WF{constructor(){super(...arguments),this.inputElementRef=(0,_r._)(),this.disabled=!1,this.value="",this.placeholder="0"}render(){return this.inputElementRef?.value&&this.value&&(this.inputElementRef.value.value=this.value),n.qy`<input
      ${(0,_r.K)(this.inputElementRef)}
      type="text"
      inputmode="decimal"
      pattern="[0-9,.]*"
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      autofocus
      value=${this.value??""}
      @input=${this.dispatchInputChangeEvent.bind(this)}
    /> `}dispatchInputChangeEvent(e){const t=e.data;if(t&&this.inputElementRef?.value)if(","===t){const e=this.inputElementRef.value.value.replace(",",".");this.inputElementRef.value.value=e,this.value=`${this.value}${e}`}else Gi.test(t)||(this.inputElementRef.value.value=this.value.replace(new RegExp(t.replace(Wi,"\\$&"),"gu"),""));this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};Ki.styles=[p,g,$i],Vi([(0,v.MZ)({type:Boolean})],Ki.prototype,"disabled",void 0),Vi([(0,v.MZ)({type:String})],Ki.prototype,"value",void 0),Vi([(0,v.MZ)({type:String})],Ki.prototype,"placeholder",void 0),Ki=Vi([y("wui-input-amount")],Ki);const Zi=n.AH`
  :host {
    display: flex;
    gap: var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-2xs) var(--wui-spacing-xs) var(--wui-spacing-2xs)
      var(--wui-spacing-s);
    align-items: center;
  }

  wui-avatar,
  wui-icon,
  wui-image {
    width: 32px;
    height: 32px;
    border: 1px solid var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-002);
  }
`;var Qi=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Ji=class extends n.WF{constructor(){super(...arguments),this.text="",this.address="",this.isAddress=!1}render(){return n.qy`<wui-text variant="large-500" color="fg-100">${this.text}</wui-text>
      ${this.imageTemplate()}`}imageTemplate(){return this.isAddress?n.qy`<wui-avatar address=${this.address} .imageSrc=${this.imageSrc}></wui-avatar>`:this.imageSrc?n.qy`<wui-image src=${this.imageSrc}></wui-image>`:n.qy`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`}};Ji.styles=[p,g,Zi],Qi([(0,v.MZ)()],Ji.prototype,"text",void 0),Qi([(0,v.MZ)()],Ji.prototype,"address",void 0),Qi([(0,v.MZ)()],Ji.prototype,"imageSrc",void 0),Qi([(0,v.MZ)({type:Boolean})],Ji.prototype,"isAddress",void 0),Ji=Qi([y("wui-preview-item")],Ji);const Yi=n.AH`
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 100%;
    background-color: var(--wui-color-accent-glass-010);
    border-radius: var(--wui-border-radius-xs);
    border: 1px solid var(--wui-color-accent-glass-010);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  wui-tooltip {
    padding: 7px var(--wui-spacing-s) 8px var(--wui-spacing-s);
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translate(-50%, -100%);
    opacity: 0;
    display: none;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }
  }
`;var Xi=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let es=class extends n.WF{constructor(){super(...arguments),this.text="",this.icon="card"}render(){return n.qy`<button>
      <wui-icon color="accent-100" name=${this.icon} size="lg"></wui-icon>
    </button>`}};es.styles=[p,g,Yi],Xi([(0,v.MZ)()],es.prototype,"text",void 0),Xi([(0,v.MZ)()],es.prototype,"icon",void 0),es=Xi([y("wui-icon-button")],es);const ts=n.AH`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 16.5px var(--wui-spacing-l) 16.5px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
    justify-content: center;
    align-items: center;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }
`;var rs=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let ns=class extends n.WF{constructor(){super(...arguments),this.text="",this.disabled=!1}render(){return n.qy`
      <button ?disabled=${this.disabled} ontouchstart>
        <wui-text align="center" variant="paragraph-500" color="inherit">${this.text}</wui-text>
      </button>
    `}};ns.styles=[p,g,ts],rs([(0,v.MZ)()],ns.prototype,"text",void 0),rs([(0,v.MZ)({type:Boolean})],ns.prototype,"disabled",void 0),ns=rs([y("wui-list-button")],ns);const is=n.AH`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    justify-content: flex-start;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-text[data-align='left'] {
    display: flex;
    flex: 1;
  }

  wui-text[data-align='center'] {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .invisible {
    opacity: 0;
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }
`;var ss=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let os=class extends n.WF{constructor(){super(...arguments),this.logo="google",this.name="Continue with google",this.align="left",this.disabled=!1}render(){return n.qy`
      <button ?disabled=${this.disabled} ontouchstart>
        <wui-logo logo=${this.logo}></wui-logo>
        <wui-text
          data-align=${this.align}
          variant="paragraph-500"
          color="inherit"
          align=${this.align}
          >${this.name}</wui-text
        >
        ${this.templatePlacement()}
      </button>
    `}templatePlacement(){return"center"===this.align?n.qy` <wui-logo class="invisible" logo=${this.logo}></wui-logo>`:null}};os.styles=[p,g,is],ss([(0,v.MZ)()],os.prototype,"logo",void 0),ss([(0,v.MZ)()],os.prototype,"name",void 0),ss([(0,v.MZ)()],os.prototype,"align",void 0),ss([(0,v.MZ)({type:Boolean})],os.prototype,"disabled",void 0),os=ss([y("wui-list-social")],os);const as=n.AH`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var cs=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let ls=class extends n.WF{render(){return this.style.cssText=`\n      grid-template-rows: ${this.gridTemplateRows};\n      grid-template-columns: ${this.gridTemplateColumns};\n      justify-items: ${this.justifyItems};\n      align-items: ${this.alignItems};\n      justify-content: ${this.justifyContent};\n      align-content: ${this.alignContent};\n      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};\n      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};\n      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};\n      padding-top: ${this.padding&&Tt.getSpacingStyles(this.padding,0)};\n      padding-right: ${this.padding&&Tt.getSpacingStyles(this.padding,1)};\n      padding-bottom: ${this.padding&&Tt.getSpacingStyles(this.padding,2)};\n      padding-left: ${this.padding&&Tt.getSpacingStyles(this.padding,3)};\n      margin-top: ${this.margin&&Tt.getSpacingStyles(this.margin,0)};\n      margin-right: ${this.margin&&Tt.getSpacingStyles(this.margin,1)};\n      margin-bottom: ${this.margin&&Tt.getSpacingStyles(this.margin,2)};\n      margin-left: ${this.margin&&Tt.getSpacingStyles(this.margin,3)};\n    `,n.qy`<slot></slot>`}};ls.styles=[p,as],cs([(0,v.MZ)()],ls.prototype,"gridTemplateRows",void 0),cs([(0,v.MZ)()],ls.prototype,"gridTemplateColumns",void 0),cs([(0,v.MZ)()],ls.prototype,"justifyItems",void 0),cs([(0,v.MZ)()],ls.prototype,"alignItems",void 0),cs([(0,v.MZ)()],ls.prototype,"justifyContent",void 0),cs([(0,v.MZ)()],ls.prototype,"alignContent",void 0),cs([(0,v.MZ)()],ls.prototype,"columnGap",void 0),cs([(0,v.MZ)()],ls.prototype,"rowGap",void 0),cs([(0,v.MZ)()],ls.prototype,"gap",void 0),cs([(0,v.MZ)()],ls.prototype,"padding",void 0),cs([(0,v.MZ)()],ls.prototype,"margin",void 0),ls=cs([y("wui-grid")],ls);const us=n.AH`
  :host {
    position: relative;
    display: flex;
    width: 100%;
    height: 1px;
    background-color: var(--wui-color-gray-glass-005);
    justify-content: center;
    align-items: center;
  }

  :host > wui-text {
    position: absolute;
    padding: 0px 10px;
    background-color: var(--wui-color-modal-bg);
  }
`;var hs=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let ds=class extends n.WF{constructor(){super(...arguments),this.text=""}render(){return n.qy`${this.template()}`}template(){return this.text?n.qy`<wui-text variant="small-500" color="fg-200">${this.text}</wui-text>`:null}};ds.styles=[p,us],hs([(0,v.MZ)()],ds.prototype,"text",void 0),ds=hs([y("wui-separator")],ds);const fs={interpolate(e,t,r){if(2!==e.length||2!==t.length)throw new Error("inputRange and outputRange must be an array of length 2");const n=e[0]||0,i=e[1]||0,s=t[0]||0,o=t[1]||0;return r<n?s:r>i?o:(o-s)/(i-n)*(r-n)+s}},ps=["receive","deposit","borrow","claim"],gs=["withdraw","repay","burn"],ms={getMonthName(e){const t=new Date;return t.setMonth(e),t.toLocaleString("en-US",{month:"long"})},getTransactionGroupTitle(e,t){const r=o.rL.getYear(),n=this.getMonthName(t);return e===r?n:`${n} ${e}`},getTransactionImages(e){const[t,r]=e,n=Boolean(t)&&e?.every((e=>Boolean(e.nft_info))),i=e?.length>1;return 2!==e?.length||n?i?e.map((e=>this.getTransactionImage(e))):[this.getTransactionImage(t)]:[this.getTransactionImage(t),this.getTransactionImage(r)]},getTransactionImage:e=>({type:ms.getTransactionTransferTokenType(e),url:ms.getTransactionImageURL(e)}),getTransactionImageURL(e){let t;const r=Boolean(e?.nft_info),n=Boolean(e?.fungible_info);return e&&r?t=e?.nft_info?.content?.preview?.url:e&&n&&(t=e?.fungible_info?.icon?.url),t},getTransactionTransferTokenType:e=>e?.fungible_info?"FUNGIBLE":e?.nft_info?"NFT":void 0,getTransactionDescriptions(e){const t=e?.metadata?.operationType,r=e?.transfers,n=e?.transfers?.length>0,i=e?.transfers?.length>1,s=n&&r?.every((e=>Boolean(e?.fungible_info))),[o,a]=r;let c=this.getTransferDescription(o),l=this.getTransferDescription(a);if(!n)return"send"!==t&&"receive"!==t||!s?[e.metadata.status]:(c=Tt.getTruncateString({string:e?.metadata.sentFrom,charsStart:4,charsEnd:6,truncate:"middle"}),l=Tt.getTruncateString({string:e?.metadata.sentTo,charsStart:4,charsEnd:6,truncate:"middle"}),[c,l]);if(i)return r.map((e=>this.getTransferDescription(e)));let u="";return ps.includes(t)?u="+":gs.includes(t)&&(u="-"),c=u.concat(c),[c]},getTransferDescription(e){let t="";return e?(e?.nft_info?t=e?.nft_info?.name||"-":e?.fungible_info&&(t=this.getFungibleTransferDescription(e)||"-"),t):t},getFungibleTransferDescription(e){return e?[this.getQuantityFixedValue(e?.quantity.numeric),e?.fungible_info?.symbol].join(" ").trim():null},getQuantityFixedValue:e=>e?parseFloat(e).toFixed(3):null}},2667:(e,t,r)=>{"use strict";r.d(t,{s1:()=>i,QH:()=>Ir,YW:()=>Pr,Vl:()=>s}),r(1948);const n="MISSING_ENV_VAR".NEXT_PUBLIC_SECURE_SITE_SDK_URL||"https://secure.walletconnect.com/sdk",i={APP_EVENT_KEY:"@w3m-app/",FRAME_EVENT_KEY:"@w3m-frame/",RPC_METHOD_KEY:"RPC_",STORAGE_KEY:"@w3m-storage/",SESSION_TOKEN_KEY:"SESSION_TOKEN_KEY",EMAIL_LOGIN_USED_KEY:"EMAIL_LOGIN_USED_KEY",LAST_USED_CHAIN_KEY:"LAST_USED_CHAIN_KEY",LAST_EMAIL_LOGIN_TIME:"LAST_EMAIL_LOGIN_TIME",EMAIL:"EMAIL",PREFERRED_ACCOUNT_TYPE:"PREFERRED_ACCOUNT_TYPE",SMART_ACCOUNT_ENABLED:"SMART_ACCOUNT_ENABLED",SMART_ACCOUNT_ENABLED_NETWORKS:"SMART_ACCOUNT_ENABLED_NETWORKS",SOCIAL_USERNAME:"SOCIAL_USERNAME",SOCIAL:"@w3m/connected_social",APP_SWITCH_NETWORK:"@w3m-app/SWITCH_NETWORK",APP_CONNECT_EMAIL:"@w3m-app/CONNECT_EMAIL",APP_CONNECT_DEVICE:"@w3m-app/CONNECT_DEVICE",APP_CONNECT_OTP:"@w3m-app/CONNECT_OTP",APP_CONNECT_SOCIAL:"@w3m-app/CONNECT_SOCIAL",APP_GET_SOCIAL_REDIRECT_URI:"@w3m-app/GET_SOCIAL_REDIRECT_URI",APP_GET_USER:"@w3m-app/GET_USER",APP_SIGN_OUT:"@w3m-app/SIGN_OUT",APP_IS_CONNECTED:"@w3m-app/IS_CONNECTED",APP_GET_CHAIN_ID:"@w3m-app/GET_CHAIN_ID",APP_RPC_REQUEST:"@w3m-app/RPC_REQUEST",APP_UPDATE_EMAIL:"@w3m-app/UPDATE_EMAIL",APP_UPDATE_EMAIL_PRIMARY_OTP:"@w3m-app/UPDATE_EMAIL_PRIMARY_OTP",APP_UPDATE_EMAIL_SECONDARY_OTP:"@w3m-app/UPDATE_EMAIL_SECONDARY_OTP",APP_AWAIT_UPDATE_EMAIL:"@w3m-app/AWAIT_UPDATE_EMAIL",APP_SYNC_THEME:"@w3m-app/SYNC_THEME",APP_SYNC_DAPP_DATA:"@w3m-app/SYNC_DAPP_DATA",APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS:"@w3m-app/GET_SMART_ACCOUNT_ENABLED_NETWORKS",APP_INIT_SMART_ACCOUNT:"@w3m-app/INIT_SMART_ACCOUNT",APP_SET_PREFERRED_ACCOUNT:"@w3m-app/SET_PREFERRED_ACCOUNT",FRAME_SWITCH_NETWORK_ERROR:"@w3m-frame/SWITCH_NETWORK_ERROR",FRAME_SWITCH_NETWORK_SUCCESS:"@w3m-frame/SWITCH_NETWORK_SUCCESS",FRAME_CONNECT_EMAIL_ERROR:"@w3m-frame/CONNECT_EMAIL_ERROR",FRAME_CONNECT_EMAIL_SUCCESS:"@w3m-frame/CONNECT_EMAIL_SUCCESS",FRAME_CONNECT_DEVICE_ERROR:"@w3m-frame/CONNECT_DEVICE_ERROR",FRAME_CONNECT_DEVICE_SUCCESS:"@w3m-frame/CONNECT_DEVICE_SUCCESS",FRAME_CONNECT_OTP_SUCCESS:"@w3m-frame/CONNECT_OTP_SUCCESS",FRAME_CONNECT_OTP_ERROR:"@w3m-frame/CONNECT_OTP_ERROR",FRAME_CONNECT_SOCIAL_SUCCESS:"@w3m-frame/CONNECT_SOCIAL_SUCCESS",FRAME_CONNECT_SOCIAL_ERROR:"@w3m-frame/CONNECT_SOCIAL_ERROR",FRAME_GET_SOCIAL_REDIRECT_URI_SUCCESS:"@w3m-frame/GET_SOCIAL_REDIRECT_URI_SUCCESS",FRAME_GET_SOCIAL_REDIRECT_URI_ERROR:"@w3m-frame/GET_SOCIAL_REDIRECT_URI_ERROR",FRAME_GET_USER_SUCCESS:"@w3m-frame/GET_USER_SUCCESS",FRAME_GET_USER_ERROR:"@w3m-frame/GET_USER_ERROR",FRAME_SIGN_OUT_SUCCESS:"@w3m-frame/SIGN_OUT_SUCCESS",FRAME_SIGN_OUT_ERROR:"@w3m-frame/SIGN_OUT_ERROR",FRAME_IS_CONNECTED_SUCCESS:"@w3m-frame/IS_CONNECTED_SUCCESS",FRAME_IS_CONNECTED_ERROR:"@w3m-frame/IS_CONNECTED_ERROR",FRAME_GET_CHAIN_ID_SUCCESS:"@w3m-frame/GET_CHAIN_ID_SUCCESS",FRAME_GET_CHAIN_ID_ERROR:"@w3m-frame/GET_CHAIN_ID_ERROR",FRAME_RPC_REQUEST_SUCCESS:"@w3m-frame/RPC_REQUEST_SUCCESS",FRAME_RPC_REQUEST_ERROR:"@w3m-frame/RPC_REQUEST_ERROR",FRAME_SESSION_UPDATE:"@w3m-frame/SESSION_UPDATE",FRAME_UPDATE_EMAIL_SUCCESS:"@w3m-frame/UPDATE_EMAIL_SUCCESS",FRAME_UPDATE_EMAIL_ERROR:"@w3m-frame/UPDATE_EMAIL_ERROR",FRAME_UPDATE_EMAIL_PRIMARY_OTP_SUCCESS:"@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_SUCCESS",FRAME_UPDATE_EMAIL_PRIMARY_OTP_ERROR:"@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_ERROR",FRAME_UPDATE_EMAIL_SECONDARY_OTP_SUCCESS:"@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_SUCCESS",FRAME_UPDATE_EMAIL_SECONDARY_OTP_ERROR:"@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_ERROR",FRAME_SYNC_THEME_SUCCESS:"@w3m-frame/SYNC_THEME_SUCCESS",FRAME_SYNC_THEME_ERROR:"@w3m-frame/SYNC_THEME_ERROR",FRAME_SYNC_DAPP_DATA_SUCCESS:"@w3m-frame/SYNC_DAPP_DATA_SUCCESS",FRAME_SYNC_DAPP_DATA_ERROR:"@w3m-frame/SYNC_DAPP_DATA_ERROR",FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS:"@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS",FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR:"@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR",FRAME_INIT_SMART_ACCOUNT_SUCCESS:"@w3m-frame/INIT_SMART_ACCOUNT_SUCCESS",FRAME_INIT_SMART_ACCOUNT_ERROR:"@w3m-frame/INIT_SMART_ACCOUNT_ERROR",FRAME_SET_PREFERRED_ACCOUNT_SUCCESS:"@w3m-frame/SET_PREFERRED_ACCOUNT_SUCCESS",FRAME_SET_PREFERRED_ACCOUNT_ERROR:"@w3m-frame/SET_PREFERRED_ACCOUNT_ERROR",RPC_RESPONSE_TYPE_ERROR:"RPC_RESPONSE_ERROR",RPC_RESPONSE_TYPE_TX:"RPC_RESPONSE_TRANSACTION_HASH",RPC_RESPONSE_TYPE_OBJECT:"RPC_RESPONSE_OBJECT"},s={SAFE_RPC_METHODS:["eth_accounts","eth_blockNumber","eth_call","eth_chainId","eth_estimateGas","eth_feeHistory","eth_gasPrice","eth_getAccount","eth_getBalance","eth_getBlockByHash","eth_getBlockByNumber","eth_getBlockReceipts","eth_getBlockTransactionCountByHash","eth_getBlockTransactionCountByNumber","eth_getCode","eth_getFilterChanges","eth_getFilterLogs","eth_getLogs","eth_getProof","eth_getStorageAt","eth_getTransactionByBlockHashAndIndex","eth_getTransactionByBlockNumberAndIndex","eth_getTransactionByHash","eth_getTransactionCount","eth_getTransactionReceipt","eth_getUncleCountByBlockHash","eth_getUncleCountByBlockNumber","eth_maxPriorityFeePerGas","eth_newBlockFilter","eth_newFilter","eth_newPendingTransactionFilter","eth_sendRawTransaction","eth_syncing","eth_uninstallFilter"],NOT_SAFE_RPC_METHODS:["personal_sign","eth_signTypedData_v4","eth_sendTransaction"],GET_CHAIN_ID:"eth_chainId",RPC_METHOD_NOT_ALLOWED_MESSAGE:"Requested RPC call is not allowed",RPC_METHOD_NOT_ALLOWED_UI_MESSAGE:"Action not allowed",ACCOUNT_TYPES:{EOA:"eoa",SMART_ACCOUNT:"smartAccount"}};var o,a;!function(e){e.assertEqual=e=>e,e.assertIs=function(e){},e.assertNever=function(e){throw new Error},e.arrayToEnum=e=>{const t={};for(const r of e)t[r]=r;return t},e.getValidEnumValues=t=>{const r=e.objectKeys(t).filter((e=>"number"!=typeof t[t[e]])),n={};for(const e of r)n[e]=t[e];return e.objectValues(n)},e.objectValues=t=>e.objectKeys(t).map((function(e){return t[e]})),e.objectKeys="function"==typeof Object.keys?e=>Object.keys(e):e=>{const t=[];for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.push(r);return t},e.find=(e,t)=>{for(const r of e)if(t(r))return r},e.isInteger="function"==typeof Number.isInteger?e=>Number.isInteger(e):e=>"number"==typeof e&&isFinite(e)&&Math.floor(e)===e,e.joinValues=function(e,t=" | "){return e.map((e=>"string"==typeof e?`'${e}'`:e)).join(t)},e.jsonStringifyReplacer=(e,t)=>"bigint"==typeof t?t.toString():t}(o||(o={})),function(e){e.mergeShapes=(e,t)=>({...e,...t})}(a||(a={}));const c=o.arrayToEnum(["string","nan","number","integer","float","boolean","date","bigint","symbol","function","undefined","null","array","object","unknown","promise","void","never","map","set"]),l=e=>{switch(typeof e){case"undefined":return c.undefined;case"string":return c.string;case"number":return isNaN(e)?c.nan:c.number;case"boolean":return c.boolean;case"function":return c.function;case"bigint":return c.bigint;case"symbol":return c.symbol;case"object":return Array.isArray(e)?c.array:null===e?c.null:e.then&&"function"==typeof e.then&&e.catch&&"function"==typeof e.catch?c.promise:"undefined"!=typeof Map&&e instanceof Map?c.map:"undefined"!=typeof Set&&e instanceof Set?c.set:"undefined"!=typeof Date&&e instanceof Date?c.date:c.object;default:return c.unknown}},u=o.arrayToEnum(["invalid_type","invalid_literal","custom","invalid_union","invalid_union_discriminator","invalid_enum_value","unrecognized_keys","invalid_arguments","invalid_return_type","invalid_date","invalid_string","too_small","too_big","invalid_intersection_types","not_multiple_of","not_finite"]);class h extends Error{constructor(e){super(),this.issues=[],this.addIssue=e=>{this.issues=[...this.issues,e]},this.addIssues=(e=[])=>{this.issues=[...this.issues,...e]};const t=new.target.prototype;Object.setPrototypeOf?Object.setPrototypeOf(this,t):this.__proto__=t,this.name="ZodError",this.issues=e}get errors(){return this.issues}format(e){const t=e||function(e){return e.message},r={_errors:[]},n=e=>{for(const i of e.issues)if("invalid_union"===i.code)i.unionErrors.map(n);else if("invalid_return_type"===i.code)n(i.returnTypeError);else if("invalid_arguments"===i.code)n(i.argumentsError);else if(0===i.path.length)r._errors.push(t(i));else{let e=r,n=0;for(;n<i.path.length;){const r=i.path[n];n===i.path.length-1?(e[r]=e[r]||{_errors:[]},e[r]._errors.push(t(i))):e[r]=e[r]||{_errors:[]},e=e[r],n++}}};return n(this),r}toString(){return this.message}get message(){return JSON.stringify(this.issues,o.jsonStringifyReplacer,2)}get isEmpty(){return 0===this.issues.length}flatten(e=(e=>e.message)){const t={},r=[];for(const n of this.issues)n.path.length>0?(t[n.path[0]]=t[n.path[0]]||[],t[n.path[0]].push(e(n))):r.push(e(n));return{formErrors:r,fieldErrors:t}}get formErrors(){return this.flatten()}}h.create=e=>new h(e);const d=(e,t)=>{let r;switch(e.code){case u.invalid_type:r=e.received===c.undefined?"Required":`Expected ${e.expected}, received ${e.received}`;break;case u.invalid_literal:r=`Invalid literal value, expected ${JSON.stringify(e.expected,o.jsonStringifyReplacer)}`;break;case u.unrecognized_keys:r=`Unrecognized key(s) in object: ${o.joinValues(e.keys,", ")}`;break;case u.invalid_union:r="Invalid input";break;case u.invalid_union_discriminator:r=`Invalid discriminator value. Expected ${o.joinValues(e.options)}`;break;case u.invalid_enum_value:r=`Invalid enum value. Expected ${o.joinValues(e.options)}, received '${e.received}'`;break;case u.invalid_arguments:r="Invalid function arguments";break;case u.invalid_return_type:r="Invalid function return type";break;case u.invalid_date:r="Invalid date";break;case u.invalid_string:"object"==typeof e.validation?"includes"in e.validation?(r=`Invalid input: must include "${e.validation.includes}"`,"number"==typeof e.validation.position&&(r=`${r} at one or more positions greater than or equal to ${e.validation.position}`)):"startsWith"in e.validation?r=`Invalid input: must start with "${e.validation.startsWith}"`:"endsWith"in e.validation?r=`Invalid input: must end with "${e.validation.endsWith}"`:o.assertNever(e.validation):r="regex"!==e.validation?`Invalid ${e.validation}`:"Invalid";break;case u.too_small:r="array"===e.type?`Array must contain ${e.exact?"exactly":e.inclusive?"at least":"more than"} ${e.minimum} element(s)`:"string"===e.type?`String must contain ${e.exact?"exactly":e.inclusive?"at least":"over"} ${e.minimum} character(s)`:"number"===e.type?`Number must be ${e.exact?"exactly equal to ":e.inclusive?"greater than or equal to ":"greater than "}${e.minimum}`:"date"===e.type?`Date must be ${e.exact?"exactly equal to ":e.inclusive?"greater than or equal to ":"greater than "}${new Date(Number(e.minimum))}`:"Invalid input";break;case u.too_big:r="array"===e.type?`Array must contain ${e.exact?"exactly":e.inclusive?"at most":"less than"} ${e.maximum} element(s)`:"string"===e.type?`String must contain ${e.exact?"exactly":e.inclusive?"at most":"under"} ${e.maximum} character(s)`:"number"===e.type?`Number must be ${e.exact?"exactly":e.inclusive?"less than or equal to":"less than"} ${e.maximum}`:"bigint"===e.type?`BigInt must be ${e.exact?"exactly":e.inclusive?"less than or equal to":"less than"} ${e.maximum}`:"date"===e.type?`Date must be ${e.exact?"exactly":e.inclusive?"smaller than or equal to":"smaller than"} ${new Date(Number(e.maximum))}`:"Invalid input";break;case u.custom:r="Invalid input";break;case u.invalid_intersection_types:r="Intersection results could not be merged";break;case u.not_multiple_of:r=`Number must be a multiple of ${e.multipleOf}`;break;case u.not_finite:r="Number must be finite";break;default:r=t.defaultError,o.assertNever(e)}return{message:r}};let f=d;function p(){return f}const g=e=>{const{data:t,path:r,errorMaps:n,issueData:i}=e,s=[...r,...i.path||[]],o={...i,path:s};let a="";const c=n.filter((e=>!!e)).slice().reverse();for(const e of c)a=e(o,{data:t,defaultError:a}).message;return{...i,path:s,message:i.message||a}};function m(e,t){const r=g({issueData:t,data:e.data,path:e.path,errorMaps:[e.common.contextualErrorMap,e.schemaErrorMap,p(),d].filter((e=>!!e))});e.common.issues.push(r)}class y{constructor(){this.value="valid"}dirty(){"valid"===this.value&&(this.value="dirty")}abort(){"aborted"!==this.value&&(this.value="aborted")}static mergeArray(e,t){const r=[];for(const n of t){if("aborted"===n.status)return w;"dirty"===n.status&&e.dirty(),r.push(n.value)}return{status:e.value,value:r}}static async mergeObjectAsync(e,t){const r=[];for(const e of t)r.push({key:await e.key,value:await e.value});return y.mergeObjectSync(e,r)}static mergeObjectSync(e,t){const r={};for(const n of t){const{key:t,value:i}=n;if("aborted"===t.status)return w;if("aborted"===i.status)return w;"dirty"===t.status&&e.dirty(),"dirty"===i.status&&e.dirty(),"__proto__"===t.value||void 0===i.value&&!n.alwaysSet||(r[t.value]=i.value)}return{status:e.value,value:r}}}const w=Object.freeze({status:"aborted"}),b=e=>({status:"dirty",value:e}),v=e=>({status:"valid",value:e}),A=e=>"aborted"===e.status,E=e=>"dirty"===e.status,x=e=>"valid"===e.status,C=e=>"undefined"!=typeof Promise&&e instanceof Promise;var S;!function(e){e.errToObj=e=>"string"==typeof e?{message:e}:e||{},e.toString=e=>"string"==typeof e?e:null==e?void 0:e.message}(S||(S={}));class k{constructor(e,t,r,n){this._cachedPath=[],this.parent=e,this.data=t,this._path=r,this._key=n}get path(){return this._cachedPath.length||(this._key instanceof Array?this._cachedPath.push(...this._path,...this._key):this._cachedPath.push(...this._path,this._key)),this._cachedPath}}const _=(e,t)=>{if(x(t))return{success:!0,data:t.value};if(!e.common.issues.length)throw new Error("Validation failed but no issues detected.");return{success:!1,get error(){if(this._error)return this._error;const t=new h(e.common.issues);return this._error=t,this._error}}};function I(e){if(!e)return{};const{errorMap:t,invalid_type_error:r,required_error:n,description:i}=e;if(t&&(r||n))throw new Error('Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.');return t?{errorMap:t,description:i}:{errorMap:(e,t)=>"invalid_type"!==e.code?{message:t.defaultError}:void 0===t.data?{message:null!=n?n:t.defaultError}:{message:null!=r?r:t.defaultError},description:i}}class M{constructor(e){this.spa=this.safeParseAsync,this._def=e,this.parse=this.parse.bind(this),this.safeParse=this.safeParse.bind(this),this.parseAsync=this.parseAsync.bind(this),this.safeParseAsync=this.safeParseAsync.bind(this),this.spa=this.spa.bind(this),this.refine=this.refine.bind(this),this.refinement=this.refinement.bind(this),this.superRefine=this.superRefine.bind(this),this.optional=this.optional.bind(this),this.nullable=this.nullable.bind(this),this.nullish=this.nullish.bind(this),this.array=this.array.bind(this),this.promise=this.promise.bind(this),this.or=this.or.bind(this),this.and=this.and.bind(this),this.transform=this.transform.bind(this),this.brand=this.brand.bind(this),this.default=this.default.bind(this),this.catch=this.catch.bind(this),this.describe=this.describe.bind(this),this.pipe=this.pipe.bind(this),this.readonly=this.readonly.bind(this),this.isNullable=this.isNullable.bind(this),this.isOptional=this.isOptional.bind(this)}get description(){return this._def.description}_getType(e){return l(e.data)}_getOrReturnCtx(e,t){return t||{common:e.parent.common,data:e.data,parsedType:l(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}_processInputParams(e){return{status:new y,ctx:{common:e.parent.common,data:e.data,parsedType:l(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}}_parseSync(e){const t=this._parse(e);if(C(t))throw new Error("Synchronous parse encountered promise.");return t}_parseAsync(e){const t=this._parse(e);return Promise.resolve(t)}parse(e,t){const r=this.safeParse(e,t);if(r.success)return r.data;throw r.error}safeParse(e,t){var r;const n={common:{issues:[],async:null!==(r=null==t?void 0:t.async)&&void 0!==r&&r,contextualErrorMap:null==t?void 0:t.errorMap},path:(null==t?void 0:t.path)||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:l(e)},i=this._parseSync({data:e,path:n.path,parent:n});return _(n,i)}async parseAsync(e,t){const r=await this.safeParseAsync(e,t);if(r.success)return r.data;throw r.error}async safeParseAsync(e,t){const r={common:{issues:[],contextualErrorMap:null==t?void 0:t.errorMap,async:!0},path:(null==t?void 0:t.path)||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:l(e)},n=this._parse({data:e,path:r.path,parent:r}),i=await(C(n)?n:Promise.resolve(n));return _(r,i)}refine(e,t){const r=e=>"string"==typeof t||void 0===t?{message:t}:"function"==typeof t?t(e):t;return this._refinement(((t,n)=>{const i=e(t),s=()=>n.addIssue({code:u.custom,...r(t)});return"undefined"!=typeof Promise&&i instanceof Promise?i.then((e=>!!e||(s(),!1))):!!i||(s(),!1)}))}refinement(e,t){return this._refinement(((r,n)=>!!e(r)||(n.addIssue("function"==typeof t?t(r,n):t),!1)))}_refinement(e){return new me({schema:this,typeName:Ie.ZodEffects,effect:{type:"refinement",refinement:e}})}superRefine(e){return this._refinement(e)}optional(){return ye.create(this,this._def)}nullable(){return we.create(this,this._def)}nullish(){return this.nullable().optional()}array(){return J.create(this,this._def)}promise(){return ge.create(this,this._def)}or(e){return ee.create([this,e],this._def)}and(e){return ie.create(this,e,this._def)}transform(e){return new me({...I(this._def),schema:this,typeName:Ie.ZodEffects,effect:{type:"transform",transform:e}})}default(e){const t="function"==typeof e?e:()=>e;return new be({...I(this._def),innerType:this,defaultValue:t,typeName:Ie.ZodDefault})}brand(){return new xe({typeName:Ie.ZodBranded,type:this,...I(this._def)})}catch(e){const t="function"==typeof e?e:()=>e;return new ve({...I(this._def),innerType:this,catchValue:t,typeName:Ie.ZodCatch})}describe(e){return new(0,this.constructor)({...this._def,description:e})}pipe(e){return Ce.create(this,e)}readonly(){return Se.create(this)}isOptional(){return this.safeParse(void 0).success}isNullable(){return this.safeParse(null).success}}const T=/^c[^\s-]{8,}$/i,P=/^[a-z][a-z0-9]*$/,O=/^[0-9A-HJKMNP-TV-Z]{26}$/,R=/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,N=/^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;let B;const U=/^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/,D=/^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;class L extends M{_parse(e){if(this._def.coerce&&(e.data=String(e.data)),this._getType(e)!==c.string){const t=this._getOrReturnCtx(e);return m(t,{code:u.invalid_type,expected:c.string,received:t.parsedType}),w}const t=new y;let r;for(const a of this._def.checks)if("min"===a.kind)e.data.length<a.value&&(r=this._getOrReturnCtx(e,r),m(r,{code:u.too_small,minimum:a.value,type:"string",inclusive:!0,exact:!1,message:a.message}),t.dirty());else if("max"===a.kind)e.data.length>a.value&&(r=this._getOrReturnCtx(e,r),m(r,{code:u.too_big,maximum:a.value,type:"string",inclusive:!0,exact:!1,message:a.message}),t.dirty());else if("length"===a.kind){const n=e.data.length>a.value,i=e.data.length<a.value;(n||i)&&(r=this._getOrReturnCtx(e,r),n?m(r,{code:u.too_big,maximum:a.value,type:"string",inclusive:!0,exact:!0,message:a.message}):i&&m(r,{code:u.too_small,minimum:a.value,type:"string",inclusive:!0,exact:!0,message:a.message}),t.dirty())}else if("email"===a.kind)N.test(e.data)||(r=this._getOrReturnCtx(e,r),m(r,{validation:"email",code:u.invalid_string,message:a.message}),t.dirty());else if("emoji"===a.kind)B||(B=new RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$","u")),B.test(e.data)||(r=this._getOrReturnCtx(e,r),m(r,{validation:"emoji",code:u.invalid_string,message:a.message}),t.dirty());else if("uuid"===a.kind)R.test(e.data)||(r=this._getOrReturnCtx(e,r),m(r,{validation:"uuid",code:u.invalid_string,message:a.message}),t.dirty());else if("cuid"===a.kind)T.test(e.data)||(r=this._getOrReturnCtx(e,r),m(r,{validation:"cuid",code:u.invalid_string,message:a.message}),t.dirty());else if("cuid2"===a.kind)P.test(e.data)||(r=this._getOrReturnCtx(e,r),m(r,{validation:"cuid2",code:u.invalid_string,message:a.message}),t.dirty());else if("ulid"===a.kind)O.test(e.data)||(r=this._getOrReturnCtx(e,r),m(r,{validation:"ulid",code:u.invalid_string,message:a.message}),t.dirty());else if("url"===a.kind)try{new URL(e.data)}catch(n){r=this._getOrReturnCtx(e,r),m(r,{validation:"url",code:u.invalid_string,message:a.message}),t.dirty()}else"regex"===a.kind?(a.regex.lastIndex=0,a.regex.test(e.data)||(r=this._getOrReturnCtx(e,r),m(r,{validation:"regex",code:u.invalid_string,message:a.message}),t.dirty())):"trim"===a.kind?e.data=e.data.trim():"includes"===a.kind?e.data.includes(a.value,a.position)||(r=this._getOrReturnCtx(e,r),m(r,{code:u.invalid_string,validation:{includes:a.value,position:a.position},message:a.message}),t.dirty()):"toLowerCase"===a.kind?e.data=e.data.toLowerCase():"toUpperCase"===a.kind?e.data=e.data.toUpperCase():"startsWith"===a.kind?e.data.startsWith(a.value)||(r=this._getOrReturnCtx(e,r),m(r,{code:u.invalid_string,validation:{startsWith:a.value},message:a.message}),t.dirty()):"endsWith"===a.kind?e.data.endsWith(a.value)||(r=this._getOrReturnCtx(e,r),m(r,{code:u.invalid_string,validation:{endsWith:a.value},message:a.message}),t.dirty()):"datetime"===a.kind?((s=a).precision?s.offset?new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${s.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`):new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${s.precision}}Z$`):0===s.precision?s.offset?new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$"):new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$"):s.offset?new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$"):new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$")).test(e.data)||(r=this._getOrReturnCtx(e,r),m(r,{code:u.invalid_string,validation:"datetime",message:a.message}),t.dirty()):"ip"===a.kind?(n=e.data,("v4"!==(i=a.version)&&i||!U.test(n))&&("v6"!==i&&i||!D.test(n))&&(r=this._getOrReturnCtx(e,r),m(r,{validation:"ip",code:u.invalid_string,message:a.message}),t.dirty())):o.assertNever(a);var n,i,s;return{status:t.value,value:e.data}}_regex(e,t,r){return this.refinement((t=>e.test(t)),{validation:t,code:u.invalid_string,...S.errToObj(r)})}_addCheck(e){return new L({...this._def,checks:[...this._def.checks,e]})}email(e){return this._addCheck({kind:"email",...S.errToObj(e)})}url(e){return this._addCheck({kind:"url",...S.errToObj(e)})}emoji(e){return this._addCheck({kind:"emoji",...S.errToObj(e)})}uuid(e){return this._addCheck({kind:"uuid",...S.errToObj(e)})}cuid(e){return this._addCheck({kind:"cuid",...S.errToObj(e)})}cuid2(e){return this._addCheck({kind:"cuid2",...S.errToObj(e)})}ulid(e){return this._addCheck({kind:"ulid",...S.errToObj(e)})}ip(e){return this._addCheck({kind:"ip",...S.errToObj(e)})}datetime(e){var t;return"string"==typeof e?this._addCheck({kind:"datetime",precision:null,offset:!1,message:e}):this._addCheck({kind:"datetime",precision:void 0===(null==e?void 0:e.precision)?null:null==e?void 0:e.precision,offset:null!==(t=null==e?void 0:e.offset)&&void 0!==t&&t,...S.errToObj(null==e?void 0:e.message)})}regex(e,t){return this._addCheck({kind:"regex",regex:e,...S.errToObj(t)})}includes(e,t){return this._addCheck({kind:"includes",value:e,position:null==t?void 0:t.position,...S.errToObj(null==t?void 0:t.message)})}startsWith(e,t){return this._addCheck({kind:"startsWith",value:e,...S.errToObj(t)})}endsWith(e,t){return this._addCheck({kind:"endsWith",value:e,...S.errToObj(t)})}min(e,t){return this._addCheck({kind:"min",value:e,...S.errToObj(t)})}max(e,t){return this._addCheck({kind:"max",value:e,...S.errToObj(t)})}length(e,t){return this._addCheck({kind:"length",value:e,...S.errToObj(t)})}nonempty(e){return this.min(1,S.errToObj(e))}trim(){return new L({...this._def,checks:[...this._def.checks,{kind:"trim"}]})}toLowerCase(){return new L({...this._def,checks:[...this._def.checks,{kind:"toLowerCase"}]})}toUpperCase(){return new L({...this._def,checks:[...this._def.checks,{kind:"toUpperCase"}]})}get isDatetime(){return!!this._def.checks.find((e=>"datetime"===e.kind))}get isEmail(){return!!this._def.checks.find((e=>"email"===e.kind))}get isURL(){return!!this._def.checks.find((e=>"url"===e.kind))}get isEmoji(){return!!this._def.checks.find((e=>"emoji"===e.kind))}get isUUID(){return!!this._def.checks.find((e=>"uuid"===e.kind))}get isCUID(){return!!this._def.checks.find((e=>"cuid"===e.kind))}get isCUID2(){return!!this._def.checks.find((e=>"cuid2"===e.kind))}get isULID(){return!!this._def.checks.find((e=>"ulid"===e.kind))}get isIP(){return!!this._def.checks.find((e=>"ip"===e.kind))}get minLength(){let e=null;for(const t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return e}get maxLength(){let e=null;for(const t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return e}}function F(e,t){const r=(e.toString().split(".")[1]||"").length,n=(t.toString().split(".")[1]||"").length,i=r>n?r:n;return parseInt(e.toFixed(i).replace(".",""))%parseInt(t.toFixed(i).replace(".",""))/Math.pow(10,i)}L.create=e=>{var t;return new L({checks:[],typeName:Ie.ZodString,coerce:null!==(t=null==e?void 0:e.coerce)&&void 0!==t&&t,...I(e)})};class j extends M{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte,this.step=this.multipleOf}_parse(e){if(this._def.coerce&&(e.data=Number(e.data)),this._getType(e)!==c.number){const t=this._getOrReturnCtx(e);return m(t,{code:u.invalid_type,expected:c.number,received:t.parsedType}),w}let t;const r=new y;for(const n of this._def.checks)"int"===n.kind?o.isInteger(e.data)||(t=this._getOrReturnCtx(e,t),m(t,{code:u.invalid_type,expected:"integer",received:"float",message:n.message}),r.dirty()):"min"===n.kind?(n.inclusive?e.data<n.value:e.data<=n.value)&&(t=this._getOrReturnCtx(e,t),m(t,{code:u.too_small,minimum:n.value,type:"number",inclusive:n.inclusive,exact:!1,message:n.message}),r.dirty()):"max"===n.kind?(n.inclusive?e.data>n.value:e.data>=n.value)&&(t=this._getOrReturnCtx(e,t),m(t,{code:u.too_big,maximum:n.value,type:"number",inclusive:n.inclusive,exact:!1,message:n.message}),r.dirty()):"multipleOf"===n.kind?0!==F(e.data,n.value)&&(t=this._getOrReturnCtx(e,t),m(t,{code:u.not_multiple_of,multipleOf:n.value,message:n.message}),r.dirty()):"finite"===n.kind?Number.isFinite(e.data)||(t=this._getOrReturnCtx(e,t),m(t,{code:u.not_finite,message:n.message}),r.dirty()):o.assertNever(n);return{status:r.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,S.toString(t))}gt(e,t){return this.setLimit("min",e,!1,S.toString(t))}lte(e,t){return this.setLimit("max",e,!0,S.toString(t))}lt(e,t){return this.setLimit("max",e,!1,S.toString(t))}setLimit(e,t,r,n){return new j({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:r,message:S.toString(n)}]})}_addCheck(e){return new j({...this._def,checks:[...this._def.checks,e]})}int(e){return this._addCheck({kind:"int",message:S.toString(e)})}positive(e){return this._addCheck({kind:"min",value:0,inclusive:!1,message:S.toString(e)})}negative(e){return this._addCheck({kind:"max",value:0,inclusive:!1,message:S.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:0,inclusive:!0,message:S.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:0,inclusive:!0,message:S.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:S.toString(t)})}finite(e){return this._addCheck({kind:"finite",message:S.toString(e)})}safe(e){return this._addCheck({kind:"min",inclusive:!0,value:Number.MIN_SAFE_INTEGER,message:S.toString(e)})._addCheck({kind:"max",inclusive:!0,value:Number.MAX_SAFE_INTEGER,message:S.toString(e)})}get minValue(){let e=null;for(const t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(const t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return e}get isInt(){return!!this._def.checks.find((e=>"int"===e.kind||"multipleOf"===e.kind&&o.isInteger(e.value)))}get isFinite(){let e=null,t=null;for(const r of this._def.checks){if("finite"===r.kind||"int"===r.kind||"multipleOf"===r.kind)return!0;"min"===r.kind?(null===t||r.value>t)&&(t=r.value):"max"===r.kind&&(null===e||r.value<e)&&(e=r.value)}return Number.isFinite(t)&&Number.isFinite(e)}}j.create=e=>new j({checks:[],typeName:Ie.ZodNumber,coerce:(null==e?void 0:e.coerce)||!1,...I(e)});class H extends M{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte}_parse(e){if(this._def.coerce&&(e.data=BigInt(e.data)),this._getType(e)!==c.bigint){const t=this._getOrReturnCtx(e);return m(t,{code:u.invalid_type,expected:c.bigint,received:t.parsedType}),w}let t;const r=new y;for(const n of this._def.checks)"min"===n.kind?(n.inclusive?e.data<n.value:e.data<=n.value)&&(t=this._getOrReturnCtx(e,t),m(t,{code:u.too_small,type:"bigint",minimum:n.value,inclusive:n.inclusive,message:n.message}),r.dirty()):"max"===n.kind?(n.inclusive?e.data>n.value:e.data>=n.value)&&(t=this._getOrReturnCtx(e,t),m(t,{code:u.too_big,type:"bigint",maximum:n.value,inclusive:n.inclusive,message:n.message}),r.dirty()):"multipleOf"===n.kind?e.data%n.value!==BigInt(0)&&(t=this._getOrReturnCtx(e,t),m(t,{code:u.not_multiple_of,multipleOf:n.value,message:n.message}),r.dirty()):o.assertNever(n);return{status:r.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,S.toString(t))}gt(e,t){return this.setLimit("min",e,!1,S.toString(t))}lte(e,t){return this.setLimit("max",e,!0,S.toString(t))}lt(e,t){return this.setLimit("max",e,!1,S.toString(t))}setLimit(e,t,r,n){return new H({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:r,message:S.toString(n)}]})}_addCheck(e){return new H({...this._def,checks:[...this._def.checks,e]})}positive(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!1,message:S.toString(e)})}negative(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!1,message:S.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!0,message:S.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!0,message:S.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:S.toString(t)})}get minValue(){let e=null;for(const t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(const t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return e}}H.create=e=>{var t;return new H({checks:[],typeName:Ie.ZodBigInt,coerce:null!==(t=null==e?void 0:e.coerce)&&void 0!==t&&t,...I(e)})};class z extends M{_parse(e){if(this._def.coerce&&(e.data=Boolean(e.data)),this._getType(e)!==c.boolean){const t=this._getOrReturnCtx(e);return m(t,{code:u.invalid_type,expected:c.boolean,received:t.parsedType}),w}return v(e.data)}}z.create=e=>new z({typeName:Ie.ZodBoolean,coerce:(null==e?void 0:e.coerce)||!1,...I(e)});class q extends M{_parse(e){if(this._def.coerce&&(e.data=new Date(e.data)),this._getType(e)!==c.date){const t=this._getOrReturnCtx(e);return m(t,{code:u.invalid_type,expected:c.date,received:t.parsedType}),w}if(isNaN(e.data.getTime()))return m(this._getOrReturnCtx(e),{code:u.invalid_date}),w;const t=new y;let r;for(const n of this._def.checks)"min"===n.kind?e.data.getTime()<n.value&&(r=this._getOrReturnCtx(e,r),m(r,{code:u.too_small,message:n.message,inclusive:!0,exact:!1,minimum:n.value,type:"date"}),t.dirty()):"max"===n.kind?e.data.getTime()>n.value&&(r=this._getOrReturnCtx(e,r),m(r,{code:u.too_big,message:n.message,inclusive:!0,exact:!1,maximum:n.value,type:"date"}),t.dirty()):o.assertNever(n);return{status:t.value,value:new Date(e.data.getTime())}}_addCheck(e){return new q({...this._def,checks:[...this._def.checks,e]})}min(e,t){return this._addCheck({kind:"min",value:e.getTime(),message:S.toString(t)})}max(e,t){return this._addCheck({kind:"max",value:e.getTime(),message:S.toString(t)})}get minDate(){let e=null;for(const t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return null!=e?new Date(e):null}get maxDate(){let e=null;for(const t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return null!=e?new Date(e):null}}q.create=e=>new q({checks:[],coerce:(null==e?void 0:e.coerce)||!1,typeName:Ie.ZodDate,...I(e)});class $ extends M{_parse(e){if(this._getType(e)!==c.symbol){const t=this._getOrReturnCtx(e);return m(t,{code:u.invalid_type,expected:c.symbol,received:t.parsedType}),w}return v(e.data)}}$.create=e=>new $({typeName:Ie.ZodSymbol,...I(e)});class W extends M{_parse(e){if(this._getType(e)!==c.undefined){const t=this._getOrReturnCtx(e);return m(t,{code:u.invalid_type,expected:c.undefined,received:t.parsedType}),w}return v(e.data)}}W.create=e=>new W({typeName:Ie.ZodUndefined,...I(e)});class G extends M{_parse(e){if(this._getType(e)!==c.null){const t=this._getOrReturnCtx(e);return m(t,{code:u.invalid_type,expected:c.null,received:t.parsedType}),w}return v(e.data)}}G.create=e=>new G({typeName:Ie.ZodNull,...I(e)});class V extends M{constructor(){super(...arguments),this._any=!0}_parse(e){return v(e.data)}}V.create=e=>new V({typeName:Ie.ZodAny,...I(e)});class K extends M{constructor(){super(...arguments),this._unknown=!0}_parse(e){return v(e.data)}}K.create=e=>new K({typeName:Ie.ZodUnknown,...I(e)});class Z extends M{_parse(e){const t=this._getOrReturnCtx(e);return m(t,{code:u.invalid_type,expected:c.never,received:t.parsedType}),w}}Z.create=e=>new Z({typeName:Ie.ZodNever,...I(e)});class Q extends M{_parse(e){if(this._getType(e)!==c.undefined){const t=this._getOrReturnCtx(e);return m(t,{code:u.invalid_type,expected:c.void,received:t.parsedType}),w}return v(e.data)}}Q.create=e=>new Q({typeName:Ie.ZodVoid,...I(e)});class J extends M{_parse(e){const{ctx:t,status:r}=this._processInputParams(e),n=this._def;if(t.parsedType!==c.array)return m(t,{code:u.invalid_type,expected:c.array,received:t.parsedType}),w;if(null!==n.exactLength){const e=t.data.length>n.exactLength.value,i=t.data.length<n.exactLength.value;(e||i)&&(m(t,{code:e?u.too_big:u.too_small,minimum:i?n.exactLength.value:void 0,maximum:e?n.exactLength.value:void 0,type:"array",inclusive:!0,exact:!0,message:n.exactLength.message}),r.dirty())}if(null!==n.minLength&&t.data.length<n.minLength.value&&(m(t,{code:u.too_small,minimum:n.minLength.value,type:"array",inclusive:!0,exact:!1,message:n.minLength.message}),r.dirty()),null!==n.maxLength&&t.data.length>n.maxLength.value&&(m(t,{code:u.too_big,maximum:n.maxLength.value,type:"array",inclusive:!0,exact:!1,message:n.maxLength.message}),r.dirty()),t.common.async)return Promise.all([...t.data].map(((e,r)=>n.type._parseAsync(new k(t,e,t.path,r))))).then((e=>y.mergeArray(r,e)));const i=[...t.data].map(((e,r)=>n.type._parseSync(new k(t,e,t.path,r))));return y.mergeArray(r,i)}get element(){return this._def.type}min(e,t){return new J({...this._def,minLength:{value:e,message:S.toString(t)}})}max(e,t){return new J({...this._def,maxLength:{value:e,message:S.toString(t)}})}length(e,t){return new J({...this._def,exactLength:{value:e,message:S.toString(t)}})}nonempty(e){return this.min(1,e)}}function Y(e){if(e instanceof X){const t={};for(const r in e.shape){const n=e.shape[r];t[r]=ye.create(Y(n))}return new X({...e._def,shape:()=>t})}return e instanceof J?new J({...e._def,type:Y(e.element)}):e instanceof ye?ye.create(Y(e.unwrap())):e instanceof we?we.create(Y(e.unwrap())):e instanceof se?se.create(e.items.map((e=>Y(e)))):e}J.create=(e,t)=>new J({type:e,minLength:null,maxLength:null,exactLength:null,typeName:Ie.ZodArray,...I(t)});class X extends M{constructor(){super(...arguments),this._cached=null,this.nonstrict=this.passthrough,this.augment=this.extend}_getCached(){if(null!==this._cached)return this._cached;const e=this._def.shape(),t=o.objectKeys(e);return this._cached={shape:e,keys:t}}_parse(e){if(this._getType(e)!==c.object){const t=this._getOrReturnCtx(e);return m(t,{code:u.invalid_type,expected:c.object,received:t.parsedType}),w}const{status:t,ctx:r}=this._processInputParams(e),{shape:n,keys:i}=this._getCached(),s=[];if(!(this._def.catchall instanceof Z&&"strip"===this._def.unknownKeys))for(const e in r.data)i.includes(e)||s.push(e);const o=[];for(const e of i){const t=n[e],i=r.data[e];o.push({key:{status:"valid",value:e},value:t._parse(new k(r,i,r.path,e)),alwaysSet:e in r.data})}if(this._def.catchall instanceof Z){const e=this._def.unknownKeys;if("passthrough"===e)for(const e of s)o.push({key:{status:"valid",value:e},value:{status:"valid",value:r.data[e]}});else if("strict"===e)s.length>0&&(m(r,{code:u.unrecognized_keys,keys:s}),t.dirty());else if("strip"!==e)throw new Error("Internal ZodObject error: invalid unknownKeys value.")}else{const e=this._def.catchall;for(const t of s){const n=r.data[t];o.push({key:{status:"valid",value:t},value:e._parse(new k(r,n,r.path,t)),alwaysSet:t in r.data})}}return r.common.async?Promise.resolve().then((async()=>{const e=[];for(const t of o){const r=await t.key;e.push({key:r,value:await t.value,alwaysSet:t.alwaysSet})}return e})).then((e=>y.mergeObjectSync(t,e))):y.mergeObjectSync(t,o)}get shape(){return this._def.shape()}strict(e){return S.errToObj,new X({...this._def,unknownKeys:"strict",...void 0!==e?{errorMap:(t,r)=>{var n,i,s,o;const a=null!==(s=null===(i=(n=this._def).errorMap)||void 0===i?void 0:i.call(n,t,r).message)&&void 0!==s?s:r.defaultError;return"unrecognized_keys"===t.code?{message:null!==(o=S.errToObj(e).message)&&void 0!==o?o:a}:{message:a}}}:{}})}strip(){return new X({...this._def,unknownKeys:"strip"})}passthrough(){return new X({...this._def,unknownKeys:"passthrough"})}extend(e){return new X({...this._def,shape:()=>({...this._def.shape(),...e})})}merge(e){return new X({unknownKeys:e._def.unknownKeys,catchall:e._def.catchall,shape:()=>({...this._def.shape(),...e._def.shape()}),typeName:Ie.ZodObject})}setKey(e,t){return this.augment({[e]:t})}catchall(e){return new X({...this._def,catchall:e})}pick(e){const t={};return o.objectKeys(e).forEach((r=>{e[r]&&this.shape[r]&&(t[r]=this.shape[r])})),new X({...this._def,shape:()=>t})}omit(e){const t={};return o.objectKeys(this.shape).forEach((r=>{e[r]||(t[r]=this.shape[r])})),new X({...this._def,shape:()=>t})}deepPartial(){return Y(this)}partial(e){const t={};return o.objectKeys(this.shape).forEach((r=>{const n=this.shape[r];e&&!e[r]?t[r]=n:t[r]=n.optional()})),new X({...this._def,shape:()=>t})}required(e){const t={};return o.objectKeys(this.shape).forEach((r=>{if(e&&!e[r])t[r]=this.shape[r];else{let e=this.shape[r];for(;e instanceof ye;)e=e._def.innerType;t[r]=e}})),new X({...this._def,shape:()=>t})}keyof(){return de(o.objectKeys(this.shape))}}X.create=(e,t)=>new X({shape:()=>e,unknownKeys:"strip",catchall:Z.create(),typeName:Ie.ZodObject,...I(t)}),X.strictCreate=(e,t)=>new X({shape:()=>e,unknownKeys:"strict",catchall:Z.create(),typeName:Ie.ZodObject,...I(t)}),X.lazycreate=(e,t)=>new X({shape:e,unknownKeys:"strip",catchall:Z.create(),typeName:Ie.ZodObject,...I(t)});class ee extends M{_parse(e){const{ctx:t}=this._processInputParams(e),r=this._def.options;if(t.common.async)return Promise.all(r.map((async e=>{const r={...t,common:{...t.common,issues:[]},parent:null};return{result:await e._parseAsync({data:t.data,path:t.path,parent:r}),ctx:r}}))).then((function(e){for(const t of e)if("valid"===t.result.status)return t.result;for(const r of e)if("dirty"===r.result.status)return t.common.issues.push(...r.ctx.common.issues),r.result;const r=e.map((e=>new h(e.ctx.common.issues)));return m(t,{code:u.invalid_union,unionErrors:r}),w}));{let e;const n=[];for(const i of r){const r={...t,common:{...t.common,issues:[]},parent:null},s=i._parseSync({data:t.data,path:t.path,parent:r});if("valid"===s.status)return s;"dirty"!==s.status||e||(e={result:s,ctx:r}),r.common.issues.length&&n.push(r.common.issues)}if(e)return t.common.issues.push(...e.ctx.common.issues),e.result;const i=n.map((e=>new h(e)));return m(t,{code:u.invalid_union,unionErrors:i}),w}}get options(){return this._def.options}}ee.create=(e,t)=>new ee({options:e,typeName:Ie.ZodUnion,...I(t)});const te=e=>e instanceof ue?te(e.schema):e instanceof me?te(e.innerType()):e instanceof he?[e.value]:e instanceof fe?e.options:e instanceof pe?Object.keys(e.enum):e instanceof be?te(e._def.innerType):e instanceof W?[void 0]:e instanceof G?[null]:null;class re extends M{_parse(e){const{ctx:t}=this._processInputParams(e);if(t.parsedType!==c.object)return m(t,{code:u.invalid_type,expected:c.object,received:t.parsedType}),w;const r=this.discriminator,n=t.data[r],i=this.optionsMap.get(n);return i?t.common.async?i._parseAsync({data:t.data,path:t.path,parent:t}):i._parseSync({data:t.data,path:t.path,parent:t}):(m(t,{code:u.invalid_union_discriminator,options:Array.from(this.optionsMap.keys()),path:[r]}),w)}get discriminator(){return this._def.discriminator}get options(){return this._def.options}get optionsMap(){return this._def.optionsMap}static create(e,t,r){const n=new Map;for(const r of t){const t=te(r.shape[e]);if(!t)throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);for(const i of t){if(n.has(i))throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(i)}`);n.set(i,r)}}return new re({typeName:Ie.ZodDiscriminatedUnion,discriminator:e,options:t,optionsMap:n,...I(r)})}}function ne(e,t){const r=l(e),n=l(t);if(e===t)return{valid:!0,data:e};if(r===c.object&&n===c.object){const r=o.objectKeys(t),n=o.objectKeys(e).filter((e=>-1!==r.indexOf(e))),i={...e,...t};for(const r of n){const n=ne(e[r],t[r]);if(!n.valid)return{valid:!1};i[r]=n.data}return{valid:!0,data:i}}if(r===c.array&&n===c.array){if(e.length!==t.length)return{valid:!1};const r=[];for(let n=0;n<e.length;n++){const i=ne(e[n],t[n]);if(!i.valid)return{valid:!1};r.push(i.data)}return{valid:!0,data:r}}return r===c.date&&n===c.date&&+e==+t?{valid:!0,data:e}:{valid:!1}}class ie extends M{_parse(e){const{status:t,ctx:r}=this._processInputParams(e),n=(e,n)=>{if(A(e)||A(n))return w;const i=ne(e.value,n.value);return i.valid?((E(e)||E(n))&&t.dirty(),{status:t.value,value:i.data}):(m(r,{code:u.invalid_intersection_types}),w)};return r.common.async?Promise.all([this._def.left._parseAsync({data:r.data,path:r.path,parent:r}),this._def.right._parseAsync({data:r.data,path:r.path,parent:r})]).then((([e,t])=>n(e,t))):n(this._def.left._parseSync({data:r.data,path:r.path,parent:r}),this._def.right._parseSync({data:r.data,path:r.path,parent:r}))}}ie.create=(e,t,r)=>new ie({left:e,right:t,typeName:Ie.ZodIntersection,...I(r)});class se extends M{_parse(e){const{status:t,ctx:r}=this._processInputParams(e);if(r.parsedType!==c.array)return m(r,{code:u.invalid_type,expected:c.array,received:r.parsedType}),w;if(r.data.length<this._def.items.length)return m(r,{code:u.too_small,minimum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),w;!this._def.rest&&r.data.length>this._def.items.length&&(m(r,{code:u.too_big,maximum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),t.dirty());const n=[...r.data].map(((e,t)=>{const n=this._def.items[t]||this._def.rest;return n?n._parse(new k(r,e,r.path,t)):null})).filter((e=>!!e));return r.common.async?Promise.all(n).then((e=>y.mergeArray(t,e))):y.mergeArray(t,n)}get items(){return this._def.items}rest(e){return new se({...this._def,rest:e})}}se.create=(e,t)=>{if(!Array.isArray(e))throw new Error("You must pass an array of schemas to z.tuple([ ... ])");return new se({items:e,typeName:Ie.ZodTuple,rest:null,...I(t)})};class oe extends M{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){const{status:t,ctx:r}=this._processInputParams(e);if(r.parsedType!==c.object)return m(r,{code:u.invalid_type,expected:c.object,received:r.parsedType}),w;const n=[],i=this._def.keyType,s=this._def.valueType;for(const e in r.data)n.push({key:i._parse(new k(r,e,r.path,e)),value:s._parse(new k(r,r.data[e],r.path,e))});return r.common.async?y.mergeObjectAsync(t,n):y.mergeObjectSync(t,n)}get element(){return this._def.valueType}static create(e,t,r){return new oe(t instanceof M?{keyType:e,valueType:t,typeName:Ie.ZodRecord,...I(r)}:{keyType:L.create(),valueType:e,typeName:Ie.ZodRecord,...I(t)})}}class ae extends M{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){const{status:t,ctx:r}=this._processInputParams(e);if(r.parsedType!==c.map)return m(r,{code:u.invalid_type,expected:c.map,received:r.parsedType}),w;const n=this._def.keyType,i=this._def.valueType,s=[...r.data.entries()].map((([e,t],s)=>({key:n._parse(new k(r,e,r.path,[s,"key"])),value:i._parse(new k(r,t,r.path,[s,"value"]))})));if(r.common.async){const e=new Map;return Promise.resolve().then((async()=>{for(const r of s){const n=await r.key,i=await r.value;if("aborted"===n.status||"aborted"===i.status)return w;"dirty"!==n.status&&"dirty"!==i.status||t.dirty(),e.set(n.value,i.value)}return{status:t.value,value:e}}))}{const e=new Map;for(const r of s){const n=r.key,i=r.value;if("aborted"===n.status||"aborted"===i.status)return w;"dirty"!==n.status&&"dirty"!==i.status||t.dirty(),e.set(n.value,i.value)}return{status:t.value,value:e}}}}ae.create=(e,t,r)=>new ae({valueType:t,keyType:e,typeName:Ie.ZodMap,...I(r)});class ce extends M{_parse(e){const{status:t,ctx:r}=this._processInputParams(e);if(r.parsedType!==c.set)return m(r,{code:u.invalid_type,expected:c.set,received:r.parsedType}),w;const n=this._def;null!==n.minSize&&r.data.size<n.minSize.value&&(m(r,{code:u.too_small,minimum:n.minSize.value,type:"set",inclusive:!0,exact:!1,message:n.minSize.message}),t.dirty()),null!==n.maxSize&&r.data.size>n.maxSize.value&&(m(r,{code:u.too_big,maximum:n.maxSize.value,type:"set",inclusive:!0,exact:!1,message:n.maxSize.message}),t.dirty());const i=this._def.valueType;function s(e){const r=new Set;for(const n of e){if("aborted"===n.status)return w;"dirty"===n.status&&t.dirty(),r.add(n.value)}return{status:t.value,value:r}}const o=[...r.data.values()].map(((e,t)=>i._parse(new k(r,e,r.path,t))));return r.common.async?Promise.all(o).then((e=>s(e))):s(o)}min(e,t){return new ce({...this._def,minSize:{value:e,message:S.toString(t)}})}max(e,t){return new ce({...this._def,maxSize:{value:e,message:S.toString(t)}})}size(e,t){return this.min(e,t).max(e,t)}nonempty(e){return this.min(1,e)}}ce.create=(e,t)=>new ce({valueType:e,minSize:null,maxSize:null,typeName:Ie.ZodSet,...I(t)});class le extends M{constructor(){super(...arguments),this.validate=this.implement}_parse(e){const{ctx:t}=this._processInputParams(e);if(t.parsedType!==c.function)return m(t,{code:u.invalid_type,expected:c.function,received:t.parsedType}),w;function r(e,r){return g({data:e,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,p(),d].filter((e=>!!e)),issueData:{code:u.invalid_arguments,argumentsError:r}})}function n(e,r){return g({data:e,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,p(),d].filter((e=>!!e)),issueData:{code:u.invalid_return_type,returnTypeError:r}})}const i={errorMap:t.common.contextualErrorMap},s=t.data;if(this._def.returns instanceof ge){const e=this;return v((async function(...t){const o=new h([]),a=await e._def.args.parseAsync(t,i).catch((e=>{throw o.addIssue(r(t,e)),o})),c=await Reflect.apply(s,this,a);return await e._def.returns._def.type.parseAsync(c,i).catch((e=>{throw o.addIssue(n(c,e)),o}))}))}{const e=this;return v((function(...t){const o=e._def.args.safeParse(t,i);if(!o.success)throw new h([r(t,o.error)]);const a=Reflect.apply(s,this,o.data),c=e._def.returns.safeParse(a,i);if(!c.success)throw new h([n(a,c.error)]);return c.data}))}}parameters(){return this._def.args}returnType(){return this._def.returns}args(...e){return new le({...this._def,args:se.create(e).rest(K.create())})}returns(e){return new le({...this._def,returns:e})}implement(e){return this.parse(e)}strictImplement(e){return this.parse(e)}static create(e,t,r){return new le({args:e||se.create([]).rest(K.create()),returns:t||K.create(),typeName:Ie.ZodFunction,...I(r)})}}class ue extends M{get schema(){return this._def.getter()}_parse(e){const{ctx:t}=this._processInputParams(e);return this._def.getter()._parse({data:t.data,path:t.path,parent:t})}}ue.create=(e,t)=>new ue({getter:e,typeName:Ie.ZodLazy,...I(t)});class he extends M{_parse(e){if(e.data!==this._def.value){const t=this._getOrReturnCtx(e);return m(t,{received:t.data,code:u.invalid_literal,expected:this._def.value}),w}return{status:"valid",value:e.data}}get value(){return this._def.value}}function de(e,t){return new fe({values:e,typeName:Ie.ZodEnum,...I(t)})}he.create=(e,t)=>new he({value:e,typeName:Ie.ZodLiteral,...I(t)});class fe extends M{_parse(e){if("string"!=typeof e.data){const t=this._getOrReturnCtx(e),r=this._def.values;return m(t,{expected:o.joinValues(r),received:t.parsedType,code:u.invalid_type}),w}if(-1===this._def.values.indexOf(e.data)){const t=this._getOrReturnCtx(e),r=this._def.values;return m(t,{received:t.data,code:u.invalid_enum_value,options:r}),w}return v(e.data)}get options(){return this._def.values}get enum(){const e={};for(const t of this._def.values)e[t]=t;return e}get Values(){const e={};for(const t of this._def.values)e[t]=t;return e}get Enum(){const e={};for(const t of this._def.values)e[t]=t;return e}extract(e){return fe.create(e)}exclude(e){return fe.create(this.options.filter((t=>!e.includes(t))))}}fe.create=de;class pe extends M{_parse(e){const t=o.getValidEnumValues(this._def.values),r=this._getOrReturnCtx(e);if(r.parsedType!==c.string&&r.parsedType!==c.number){const e=o.objectValues(t);return m(r,{expected:o.joinValues(e),received:r.parsedType,code:u.invalid_type}),w}if(-1===t.indexOf(e.data)){const e=o.objectValues(t);return m(r,{received:r.data,code:u.invalid_enum_value,options:e}),w}return v(e.data)}get enum(){return this._def.values}}pe.create=(e,t)=>new pe({values:e,typeName:Ie.ZodNativeEnum,...I(t)});class ge extends M{unwrap(){return this._def.type}_parse(e){const{ctx:t}=this._processInputParams(e);if(t.parsedType!==c.promise&&!1===t.common.async)return m(t,{code:u.invalid_type,expected:c.promise,received:t.parsedType}),w;const r=t.parsedType===c.promise?t.data:Promise.resolve(t.data);return v(r.then((e=>this._def.type.parseAsync(e,{path:t.path,errorMap:t.common.contextualErrorMap}))))}}ge.create=(e,t)=>new ge({type:e,typeName:Ie.ZodPromise,...I(t)});class me extends M{innerType(){return this._def.schema}sourceType(){return this._def.schema._def.typeName===Ie.ZodEffects?this._def.schema.sourceType():this._def.schema}_parse(e){const{status:t,ctx:r}=this._processInputParams(e),n=this._def.effect||null,i={addIssue:e=>{m(r,e),e.fatal?t.abort():t.dirty()},get path(){return r.path}};if(i.addIssue=i.addIssue.bind(i),"preprocess"===n.type){const e=n.transform(r.data,i);return r.common.issues.length?{status:"dirty",value:r.data}:r.common.async?Promise.resolve(e).then((e=>this._def.schema._parseAsync({data:e,path:r.path,parent:r}))):this._def.schema._parseSync({data:e,path:r.path,parent:r})}if("refinement"===n.type){const e=e=>{const t=n.refinement(e,i);if(r.common.async)return Promise.resolve(t);if(t instanceof Promise)throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");return e};if(!1===r.common.async){const n=this._def.schema._parseSync({data:r.data,path:r.path,parent:r});return"aborted"===n.status?w:("dirty"===n.status&&t.dirty(),e(n.value),{status:t.value,value:n.value})}return this._def.schema._parseAsync({data:r.data,path:r.path,parent:r}).then((r=>"aborted"===r.status?w:("dirty"===r.status&&t.dirty(),e(r.value).then((()=>({status:t.value,value:r.value}))))))}if("transform"===n.type){if(!1===r.common.async){const e=this._def.schema._parseSync({data:r.data,path:r.path,parent:r});if(!x(e))return e;const s=n.transform(e.value,i);if(s instanceof Promise)throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");return{status:t.value,value:s}}return this._def.schema._parseAsync({data:r.data,path:r.path,parent:r}).then((e=>x(e)?Promise.resolve(n.transform(e.value,i)).then((e=>({status:t.value,value:e}))):e))}o.assertNever(n)}}me.create=(e,t,r)=>new me({schema:e,typeName:Ie.ZodEffects,effect:t,...I(r)}),me.createWithPreprocess=(e,t,r)=>new me({schema:t,effect:{type:"preprocess",transform:e},typeName:Ie.ZodEffects,...I(r)});class ye extends M{_parse(e){return this._getType(e)===c.undefined?v(void 0):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}}ye.create=(e,t)=>new ye({innerType:e,typeName:Ie.ZodOptional,...I(t)});class we extends M{_parse(e){return this._getType(e)===c.null?v(null):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}}we.create=(e,t)=>new we({innerType:e,typeName:Ie.ZodNullable,...I(t)});class be extends M{_parse(e){const{ctx:t}=this._processInputParams(e);let r=t.data;return t.parsedType===c.undefined&&(r=this._def.defaultValue()),this._def.innerType._parse({data:r,path:t.path,parent:t})}removeDefault(){return this._def.innerType}}be.create=(e,t)=>new be({innerType:e,typeName:Ie.ZodDefault,defaultValue:"function"==typeof t.default?t.default:()=>t.default,...I(t)});class ve extends M{_parse(e){const{ctx:t}=this._processInputParams(e),r={...t,common:{...t.common,issues:[]}},n=this._def.innerType._parse({data:r.data,path:r.path,parent:{...r}});return C(n)?n.then((e=>({status:"valid",value:"valid"===e.status?e.value:this._def.catchValue({get error(){return new h(r.common.issues)},input:r.data})}))):{status:"valid",value:"valid"===n.status?n.value:this._def.catchValue({get error(){return new h(r.common.issues)},input:r.data})}}removeCatch(){return this._def.innerType}}ve.create=(e,t)=>new ve({innerType:e,typeName:Ie.ZodCatch,catchValue:"function"==typeof t.catch?t.catch:()=>t.catch,...I(t)});class Ae extends M{_parse(e){if(this._getType(e)!==c.nan){const t=this._getOrReturnCtx(e);return m(t,{code:u.invalid_type,expected:c.nan,received:t.parsedType}),w}return{status:"valid",value:e.data}}}Ae.create=e=>new Ae({typeName:Ie.ZodNaN,...I(e)});const Ee=Symbol("zod_brand");class xe extends M{_parse(e){const{ctx:t}=this._processInputParams(e),r=t.data;return this._def.type._parse({data:r,path:t.path,parent:t})}unwrap(){return this._def.type}}class Ce extends M{_parse(e){const{status:t,ctx:r}=this._processInputParams(e);if(r.common.async)return(async()=>{const e=await this._def.in._parseAsync({data:r.data,path:r.path,parent:r});return"aborted"===e.status?w:"dirty"===e.status?(t.dirty(),b(e.value)):this._def.out._parseAsync({data:e.value,path:r.path,parent:r})})();{const e=this._def.in._parseSync({data:r.data,path:r.path,parent:r});return"aborted"===e.status?w:"dirty"===e.status?(t.dirty(),{status:"dirty",value:e.value}):this._def.out._parseSync({data:e.value,path:r.path,parent:r})}}static create(e,t){return new Ce({in:e,out:t,typeName:Ie.ZodPipeline})}}class Se extends M{_parse(e){const t=this._def.innerType._parse(e);return x(t)&&(t.value=Object.freeze(t.value)),t}}Se.create=(e,t)=>new Se({innerType:e,typeName:Ie.ZodReadonly,...I(t)});const ke=(e,t={},r)=>e?V.create().superRefine(((n,i)=>{var s,o;if(!e(n)){const e="function"==typeof t?t(n):"string"==typeof t?{message:t}:t,a=null===(o=null!==(s=e.fatal)&&void 0!==s?s:r)||void 0===o||o,c="string"==typeof e?{message:e}:e;i.addIssue({code:"custom",...c,fatal:a})}})):V.create(),_e={object:X.lazycreate};var Ie;!function(e){e.ZodString="ZodString",e.ZodNumber="ZodNumber",e.ZodNaN="ZodNaN",e.ZodBigInt="ZodBigInt",e.ZodBoolean="ZodBoolean",e.ZodDate="ZodDate",e.ZodSymbol="ZodSymbol",e.ZodUndefined="ZodUndefined",e.ZodNull="ZodNull",e.ZodAny="ZodAny",e.ZodUnknown="ZodUnknown",e.ZodNever="ZodNever",e.ZodVoid="ZodVoid",e.ZodArray="ZodArray",e.ZodObject="ZodObject",e.ZodUnion="ZodUnion",e.ZodDiscriminatedUnion="ZodDiscriminatedUnion",e.ZodIntersection="ZodIntersection",e.ZodTuple="ZodTuple",e.ZodRecord="ZodRecord",e.ZodMap="ZodMap",e.ZodSet="ZodSet",e.ZodFunction="ZodFunction",e.ZodLazy="ZodLazy",e.ZodLiteral="ZodLiteral",e.ZodEnum="ZodEnum",e.ZodEffects="ZodEffects",e.ZodNativeEnum="ZodNativeEnum",e.ZodOptional="ZodOptional",e.ZodNullable="ZodNullable",e.ZodDefault="ZodDefault",e.ZodCatch="ZodCatch",e.ZodPromise="ZodPromise",e.ZodBranded="ZodBranded",e.ZodPipeline="ZodPipeline",e.ZodReadonly="ZodReadonly"}(Ie||(Ie={}));const Me=L.create,Te=j.create,Pe=Ae.create,Oe=H.create,Re=z.create,Ne=q.create,Be=$.create,Ue=W.create,De=G.create,Le=V.create,Fe=K.create,je=Z.create,He=Q.create,ze=J.create,qe=X.create,$e=X.strictCreate,We=ee.create,Ge=re.create,Ve=ie.create,Ke=se.create,Ze=oe.create,Qe=ae.create,Je=ce.create,Ye=le.create,Xe=ue.create,et=he.create,tt=fe.create,rt=pe.create,nt=ge.create,it=me.create,st=ye.create,ot=we.create,at=me.createWithPreprocess,ct=Ce.create,lt={string:e=>L.create({...e,coerce:!0}),number:e=>j.create({...e,coerce:!0}),boolean:e=>z.create({...e,coerce:!0}),bigint:e=>H.create({...e,coerce:!0}),date:e=>q.create({...e,coerce:!0})},ut=w;var ht=Object.freeze({__proto__:null,defaultErrorMap:d,setErrorMap:function(e){f=e},getErrorMap:p,makeIssue:g,EMPTY_PATH:[],addIssueToContext:m,ParseStatus:y,INVALID:w,DIRTY:b,OK:v,isAborted:A,isDirty:E,isValid:x,isAsync:C,get util(){return o},get objectUtil(){return a},ZodParsedType:c,getParsedType:l,ZodType:M,ZodString:L,ZodNumber:j,ZodBigInt:H,ZodBoolean:z,ZodDate:q,ZodSymbol:$,ZodUndefined:W,ZodNull:G,ZodAny:V,ZodUnknown:K,ZodNever:Z,ZodVoid:Q,ZodArray:J,ZodObject:X,ZodUnion:ee,ZodDiscriminatedUnion:re,ZodIntersection:ie,ZodTuple:se,ZodRecord:oe,ZodMap:ae,ZodSet:ce,ZodFunction:le,ZodLazy:ue,ZodLiteral:he,ZodEnum:fe,ZodNativeEnum:pe,ZodPromise:ge,ZodEffects:me,ZodTransformer:me,ZodOptional:ye,ZodNullable:we,ZodDefault:be,ZodCatch:ve,ZodNaN:Ae,BRAND:Ee,ZodBranded:xe,ZodPipeline:Ce,ZodReadonly:Se,custom:ke,Schema:M,ZodSchema:M,late:_e,get ZodFirstPartyTypeKind(){return Ie},coerce:lt,any:Le,array:ze,bigint:Oe,boolean:Re,date:Ne,discriminatedUnion:Ge,effect:it,enum:tt,function:Ye,instanceof:(e,t={message:`Input not instance of ${e.name}`})=>ke((t=>t instanceof e),t),intersection:Ve,lazy:Xe,literal:et,map:Qe,nan:Pe,nativeEnum:rt,never:je,null:De,nullable:ot,number:Te,object:qe,oboolean:()=>Re().optional(),onumber:()=>Te().optional(),optional:st,ostring:()=>Me().optional(),pipeline:ct,preprocess:at,promise:nt,record:Ze,set:Je,strictObject:$e,string:Me,symbol:Be,transformer:it,tuple:Ke,undefined:Ue,union:We,unknown:Fe,void:He,NEVER:ut,ZodIssueCode:u,quotelessJson:e=>JSON.stringify(e,null,2).replace(/"([^"]+)":/g,"$1:"),ZodError:h});const dt=ht.object({message:ht.string()});function ft(e){return ht.literal(i[e])}ht.object({accessList:ht.array(ht.string()),blockHash:ht.string().nullable(),blockNumber:ht.string().nullable(),chainId:ht.string(),from:ht.string(),gas:ht.string(),hash:ht.string(),input:ht.string().nullable(),maxFeePerGas:ht.string(),maxPriorityFeePerGas:ht.string(),nonce:ht.string(),r:ht.string(),s:ht.string(),to:ht.string(),transactionIndex:ht.string().nullable(),type:ht.string(),v:ht.string(),value:ht.string()});const pt=ht.object({chainId:ht.number()}),gt=ht.object({email:ht.string().email()}),mt=ht.object({otp:ht.string()}),yt=ht.object({uri:ht.string()}),wt=ht.object({chainId:ht.optional(ht.number()),preferredAccountType:ht.optional(ht.string())}),bt=ht.object({provider:ht.enum(["google","github","apple","facebook","x","discord"])}),vt=ht.object({email:ht.string().email()}),At=ht.object({otp:ht.string()}),Et=ht.object({otp:ht.string()}),xt=ht.object({themeMode:ht.optional(ht.enum(["light","dark"])),themeVariables:ht.optional(ht.record(ht.string(),ht.string().or(ht.number()))),w3mThemeVariables:ht.optional(ht.record(ht.string(),ht.string()))}),Ct=ht.object({metadata:ht.object({name:ht.string(),description:ht.string(),url:ht.string(),icons:ht.array(ht.string())}).optional(),sdkVersion:ht.string(),projectId:ht.string()}),St=ht.object({type:ht.string()}),kt=ht.object({action:ht.enum(["VERIFY_DEVICE","VERIFY_OTP"])}),_t=ht.object({email:ht.string(),address:ht.string(),chainId:ht.number(),userName:ht.string().optional()}),It=ht.object({action:ht.enum(["VERIFY_PRIMARY_OTP","VERIFY_SECONDARY_OTP"])}),Mt=ht.object({email:ht.string().email(),address:ht.string(),chainId:ht.number(),smartAccountDeployed:ht.optional(ht.boolean()),preferredAccountType:ht.optional(ht.string())}),Tt=ht.object({uri:ht.string()}),Pt=ht.object({isConnected:ht.boolean()}),Ot=ht.object({chainId:ht.number()}),Rt=ht.object({chainId:ht.number()}),Nt=ht.object({newEmail:ht.string().email()}),Bt=ht.object({smartAccountEnabledNetworks:ht.array(ht.number())}),Ut=(ht.object({address:ht.string(),isDeployed:ht.boolean()}),ht.object({type:ht.string(),address:ht.string()})),Dt=ht.any(),Lt=ht.object({method:ht.literal("eth_accounts")}),Ft=ht.object({method:ht.literal("eth_blockNumber")}),jt=ht.object({method:ht.literal("eth_call"),params:ht.array(ht.any())}),Ht=ht.object({method:ht.literal("eth_chainId")}),zt=ht.object({method:ht.literal("eth_estimateGas"),params:ht.array(ht.any())}),qt=ht.object({method:ht.literal("eth_feeHistory"),params:ht.array(ht.any())}),$t=ht.object({method:ht.literal("eth_gasPrice")}),Wt=ht.object({method:ht.literal("eth_getAccount"),params:ht.array(ht.any())}),Gt=ht.object({method:ht.literal("eth_getBalance"),params:ht.array(ht.any())}),Vt=ht.object({method:ht.literal("eth_getBlockByHash"),params:ht.array(ht.any())}),Kt=ht.object({method:ht.literal("eth_getBlockByNumber"),params:ht.array(ht.any())}),Zt=ht.object({method:ht.literal("eth_getBlockReceipts"),params:ht.array(ht.any())}),Qt=ht.object({method:ht.literal("eth_getBlockTransactionCountByHash"),params:ht.array(ht.any())}),Jt=ht.object({method:ht.literal("eth_getBlockTransactionCountByNumber"),params:ht.array(ht.any())}),Yt=ht.object({method:ht.literal("eth_getCode"),params:ht.array(ht.any())}),Xt=ht.object({method:ht.literal("eth_getFilterChanges"),params:ht.array(ht.any())}),er=ht.object({method:ht.literal("eth_getFilterLogs"),params:ht.array(ht.any())}),tr=ht.object({method:ht.literal("eth_getLogs"),params:ht.array(ht.any())}),rr=ht.object({method:ht.literal("eth_getProof"),params:ht.array(ht.any())}),nr=ht.object({method:ht.literal("eth_getStorageAt"),params:ht.array(ht.any())}),ir=ht.object({method:ht.literal("eth_getTransactionByBlockHashAndIndex"),params:ht.array(ht.any())}),sr=ht.object({method:ht.literal("eth_getTransactionByBlockNumberAndIndex"),params:ht.array(ht.any())}),or=ht.object({method:ht.literal("eth_getTransactionByHash"),params:ht.array(ht.any())}),ar=ht.object({method:ht.literal("eth_getTransactionCount"),params:ht.array(ht.any())}),cr=ht.object({method:ht.literal("eth_getTransactionReceipt"),params:ht.array(ht.any())}),lr=ht.object({method:ht.literal("eth_getUncleCountByBlockHash"),params:ht.array(ht.any())}),ur=ht.object({method:ht.literal("eth_getUncleCountByBlockNumber"),params:ht.array(ht.any())}),hr=ht.object({method:ht.literal("eth_maxPriorityFeePerGas")}),dr=ht.object({method:ht.literal("eth_newBlockFilter")}),fr=ht.object({method:ht.literal("eth_newFilter"),params:ht.array(ht.any())}),pr=ht.object({method:ht.literal("eth_newPendingTransactionFilter")}),gr=ht.object({method:ht.literal("eth_sendRawTransaction"),params:ht.array(ht.any())}),mr=ht.object({method:ht.literal("eth_syncing"),params:ht.array(ht.any())}),yr=ht.object({method:ht.literal("eth_uninstallFilter"),params:ht.array(ht.any())}),wr=ht.object({method:ht.literal("personal_sign"),params:ht.array(ht.any())}),br=ht.object({method:ht.literal("eth_signTypedData_v4"),params:ht.array(ht.any())}),vr=ht.object({method:ht.literal("eth_sendTransaction"),params:ht.array(ht.any())}),Ar=ht.object({token:ht.string()}),Er={appEvent:ht.object({type:ft("APP_SWITCH_NETWORK"),payload:pt}).or(ht.object({type:ft("APP_CONNECT_EMAIL"),payload:gt})).or(ht.object({type:ft("APP_CONNECT_DEVICE")})).or(ht.object({type:ft("APP_CONNECT_OTP"),payload:mt})).or(ht.object({type:ft("APP_CONNECT_SOCIAL"),payload:yt})).or(ht.object({type:ft("APP_GET_USER"),payload:ht.optional(wt)})).or(ht.object({type:ft("APP_GET_SOCIAL_REDIRECT_URI"),payload:bt})).or(ht.object({type:ft("APP_SIGN_OUT")})).or(ht.object({type:ft("APP_IS_CONNECTED"),payload:ht.optional(Ar)})).or(ht.object({type:ft("APP_GET_CHAIN_ID")})).or(ht.object({type:ft("APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS")})).or(ht.object({type:ft("APP_INIT_SMART_ACCOUNT")})).or(ht.object({type:ft("APP_SET_PREFERRED_ACCOUNT"),payload:St})).or(ht.object({type:ft("APP_RPC_REQUEST"),payload:wr.or(vr).or(Lt).or(Ft).or(jt).or(Ht).or(zt).or(qt).or($t).or(Wt).or(Gt).or(Vt).or(Kt).or(Zt).or(Qt).or(Jt).or(Yt).or(Xt).or(er).or(tr).or(rr).or(nr).or(ir).or(sr).or(or).or(ar).or(cr).or(lr).or(ur).or(hr).or(dr).or(fr).or(pr).or(gr).or(mr).or(yr).or(wr).or(br).or(vr)})).or(ht.object({type:ft("APP_UPDATE_EMAIL"),payload:vt})).or(ht.object({type:ft("APP_UPDATE_EMAIL_PRIMARY_OTP"),payload:At})).or(ht.object({type:ft("APP_UPDATE_EMAIL_SECONDARY_OTP"),payload:Et})).or(ht.object({type:ft("APP_SYNC_THEME"),payload:xt})).or(ht.object({type:ft("APP_SYNC_DAPP_DATA"),payload:Ct})),frameEvent:ht.object({type:ft("FRAME_SWITCH_NETWORK_ERROR"),payload:dt}).or(ht.object({type:ft("FRAME_SWITCH_NETWORK_SUCCESS"),payload:Rt})).or(ht.object({type:ft("FRAME_CONNECT_EMAIL_ERROR"),payload:dt})).or(ht.object({type:ft("FRAME_CONNECT_EMAIL_SUCCESS"),payload:kt})).or(ht.object({type:ft("FRAME_CONNECT_OTP_ERROR"),payload:dt})).or(ht.object({type:ft("FRAME_CONNECT_OTP_SUCCESS")})).or(ht.object({type:ft("FRAME_CONNECT_DEVICE_ERROR"),payload:dt})).or(ht.object({type:ft("FRAME_CONNECT_DEVICE_SUCCESS")})).or(ht.object({type:ft("FRAME_CONNECT_SOCIAL_SUCCESS"),payload:_t})).or(ht.object({type:ft("FRAME_CONNECT_SOCIAL_ERROR"),payload:dt})).or(ht.object({type:ft("FRAME_GET_USER_ERROR"),payload:dt})).or(ht.object({type:ft("FRAME_GET_USER_SUCCESS"),payload:Mt})).or(ht.object({type:ft("FRAME_GET_SOCIAL_REDIRECT_URI_ERROR"),payload:dt})).or(ht.object({type:ft("FRAME_GET_SOCIAL_REDIRECT_URI_SUCCESS"),payload:Tt})).or(ht.object({type:ft("FRAME_SIGN_OUT_ERROR"),payload:dt})).or(ht.object({type:ft("FRAME_SIGN_OUT_SUCCESS")})).or(ht.object({type:ft("FRAME_IS_CONNECTED_ERROR"),payload:dt})).or(ht.object({type:ft("FRAME_IS_CONNECTED_SUCCESS"),payload:Pt})).or(ht.object({type:ft("FRAME_GET_CHAIN_ID_ERROR"),payload:dt})).or(ht.object({type:ft("FRAME_GET_CHAIN_ID_SUCCESS"),payload:Ot})).or(ht.object({type:ft("FRAME_RPC_REQUEST_ERROR"),payload:dt})).or(ht.object({type:ft("FRAME_RPC_REQUEST_SUCCESS"),payload:Dt})).or(ht.object({type:ft("FRAME_SESSION_UPDATE"),payload:Ar})).or(ht.object({type:ft("FRAME_UPDATE_EMAIL_ERROR"),payload:dt})).or(ht.object({type:ft("FRAME_UPDATE_EMAIL_SUCCESS"),payload:It})).or(ht.object({type:ft("FRAME_UPDATE_EMAIL_PRIMARY_OTP_ERROR"),payload:dt})).or(ht.object({type:ft("FRAME_UPDATE_EMAIL_PRIMARY_OTP_SUCCESS")})).or(ht.object({type:ft("FRAME_UPDATE_EMAIL_SECONDARY_OTP_ERROR"),payload:dt})).or(ht.object({type:ft("FRAME_UPDATE_EMAIL_SECONDARY_OTP_SUCCESS"),payload:Nt})).or(ht.object({type:ft("FRAME_SYNC_THEME_ERROR"),payload:dt})).or(ht.object({type:ft("FRAME_SYNC_THEME_SUCCESS")})).or(ht.object({type:ft("FRAME_SYNC_DAPP_DATA_ERROR"),payload:dt})).or(ht.object({type:ft("FRAME_SYNC_DAPP_DATA_SUCCESS")})).or(ht.object({type:ft("FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS"),payload:Bt})).or(ht.object({type:ft("FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR"),payload:dt})).or(ht.object({type:ft("FRAME_INIT_SMART_ACCOUNT_ERROR"),payload:dt})).or(ht.object({type:ft("FRAME_SET_PREFERRED_ACCOUNT_SUCCESS"),payload:Ut})).or(ht.object({type:ft("FRAME_SET_PREFERRED_ACCOUNT_ERROR"),payload:dt}))},xr={set(e,t){Ir.isClient&&localStorage.setItem(`${i.STORAGE_KEY}${e}`,t)},get:e=>Ir.isClient?localStorage.getItem(`${i.STORAGE_KEY}${e}`):null,delete(e,t){Ir.isClient&&(t?localStorage.removeItem(e):localStorage.removeItem(`${i.STORAGE_KEY}${e}`))}},Cr=/^0x(?:[A-Fa-f0-9]{64})$/u,Sr=/^0x(?:[a-fA-F0-9]{62,})$/u,kr=["ASIA/SHANGHAI","ASIA/URUMQI","ASIA/CHONGQING","ASIA/HARBIN","ASIA/KASHGAR","ASIA/MACAU","ASIA/HONG_KONG","ASIA/MACAO","ASIA/BEIJING","ASIA/HARBIN"],_r=3e4,Ir={getBlockchainApiUrl(){try{const{timeZone:e}=(new Intl.DateTimeFormat).resolvedOptions(),t=e.toUpperCase();return kr.includes(t)?"https://rpc.walletconnect.org":"https://rpc.walletconnect.com"}catch{return!1}},checkIfAllowedToTriggerEmail(){const e=xr.get(i.LAST_EMAIL_LOGIN_TIME);if(e){const t=Date.now()-Number(e);if(t<_r){const e=Math.ceil((_r-t)/1e3);throw new Error(`Please try again after ${e} seconds`)}}},getTimeToNextEmailLogin(){const e=xr.get(i.LAST_EMAIL_LOGIN_TIME);if(e){const t=Date.now()-Number(e);if(t<_r)return Math.ceil((_r-t)/1e3)}return 0},checkIfRequestExists(e){const t=this.getRequestMethod(e);return s.NOT_SAFE_RPC_METHODS.includes(t)||s.SAFE_RPC_METHODS.includes(t)},getRequestMethod:e=>e?.payload?.method,getResponseType(e){const{type:t,payload:r}=e;return t===i.FRAME_RPC_REQUEST_ERROR?i.RPC_RESPONSE_TYPE_ERROR:"string"==typeof r&&(r.match(Cr)||r.match(Sr))?i.RPC_RESPONSE_TYPE_TX:i.RPC_RESPONSE_TYPE_OBJECT},checkIfRequestIsAllowed(e){const t=this.getRequestMethod(e);return s.SAFE_RPC_METHODS.includes(t)},isClient:"undefined"!=typeof window};class Mr{constructor(e,t=!1){if(this.iframe=null,this.rpcUrl=Ir.getBlockchainApiUrl(),this.events={onFrameEvent:e=>{Ir.isClient&&window.addEventListener("message",(({data:t})=>{if(!t.type?.includes(i.FRAME_EVENT_KEY))return;const r=Er.frameEvent.parse(t);e(r)}))},onAppEvent:e=>{Ir.isClient&&window.addEventListener("message",(({data:t})=>{if(!t.type?.includes(i.APP_EVENT_KEY))return;const r=Er.appEvent.parse(t);e(r)}))},postAppEvent:e=>{if(Ir.isClient){if(!this.iframe?.contentWindow)throw new Error("W3mFrame: iframe is not set");Er.appEvent.parse(e),window.postMessage(e),this.iframe.contentWindow.postMessage(e,"*")}},postFrameEvent:e=>{if(Ir.isClient){if(!parent)throw new Error("W3mFrame: parent is not set");Er.frameEvent.parse(e),parent.postMessage(e,"*")}}},this.projectId=e,this.frameLoadPromise=new Promise(((e,t)=>{this.frameLoadPromiseResolver={resolve:e,reject:t}})),t&&(this.frameLoadPromise=new Promise(((e,t)=>{this.frameLoadPromiseResolver={resolve:e,reject:t}})),Ir.isClient)){const t=document.createElement("iframe");t.id="w3m-iframe",t.src=`${n}?projectId=${e}`,t.style.position="fixed",t.style.zIndex="999999",t.style.display="none",t.style.opacity="0",t.style.borderBottomLeftRadius="clamp(0px, var(--wui-border-radius-l), 44px)",t.style.borderBottomRightRadius="clamp(0px, var(--wui-border-radius-l), 44px)",document.body.appendChild(t),this.iframe=t,this.iframe.onload=()=>{this.frameLoadPromiseResolver?.resolve(void 0)},this.iframe.onerror=()=>{this.frameLoadPromiseResolver?.reject("Unable to load email login dependency")}}}get networks(){const e=[1,5,11155111,10,420,42161,421613,137,80001,42220,1313161554,1313161555,56,97,43114,43113,324,280,100,8453,84531,7777777,999].map((e=>({[e]:{rpcUrl:`${this.rpcUrl}/v1/?chainId=eip155:${e}&projectId=${this.projectId}`,chainId:e}})));return Object.assign({},...e)}}var Tr=r(6763);class Pr{constructor(e){this.connectEmailResolver=void 0,this.connectDeviceResolver=void 0,this.connectOtpResolver=void 0,this.connectResolver=void 0,this.connectSocialResolver=void 0,this.disconnectResolver=void 0,this.isConnectedResolver=void 0,this.getChainIdResolver=void 0,this.getSocialRedirectUriResolver=void 0,this.switchChainResolver=void 0,this.rpcRequestResolver=void 0,this.updateEmailResolver=void 0,this.updateEmailPrimaryOtpResolver=void 0,this.updateEmailSecondaryOtpResolver=void 0,this.syncThemeResolver=void 0,this.syncDappDataResolver=void 0,this.smartAccountEnabledNetworksResolver=void 0,this.setPreferredAccountResolver=void 0,this.w3mFrame=new Mr(e,!0),this.w3mFrame.events.onFrameEvent((e=>{switch(Tr.log("💻 received",e),e.type){case i.FRAME_CONNECT_EMAIL_SUCCESS:return this.onConnectEmailSuccess(e);case i.FRAME_CONNECT_EMAIL_ERROR:return this.onConnectEmailError(e);case i.FRAME_CONNECT_DEVICE_SUCCESS:return this.onConnectDeviceSuccess();case i.FRAME_CONNECT_DEVICE_ERROR:return this.onConnectDeviceError(e);case i.FRAME_CONNECT_OTP_SUCCESS:return this.onConnectOtpSuccess();case i.FRAME_CONNECT_OTP_ERROR:return this.onConnectOtpError(e);case i.FRAME_CONNECT_SOCIAL_SUCCESS:return this.onConnectSocialSuccess(e);case i.FRAME_CONNECT_SOCIAL_ERROR:return this.onConnectSocialError(e);case i.FRAME_GET_SOCIAL_REDIRECT_URI_SUCCESS:return this.onGetSocialRedirectUriSuccess(e);case i.FRAME_GET_SOCIAL_REDIRECT_URI_ERROR:return this.onGetSocialRedirectUriError(e);case i.FRAME_GET_USER_SUCCESS:return this.onConnectSuccess(e);case i.FRAME_GET_USER_ERROR:return this.onConnectError(e);case i.FRAME_IS_CONNECTED_SUCCESS:return this.onIsConnectedSuccess(e);case i.FRAME_IS_CONNECTED_ERROR:return this.onIsConnectedError(e);case i.FRAME_GET_CHAIN_ID_SUCCESS:return this.onGetChainIdSuccess(e);case i.FRAME_GET_CHAIN_ID_ERROR:return this.onGetChainIdError(e);case i.FRAME_SIGN_OUT_SUCCESS:return this.onSignOutSuccess();case i.FRAME_SIGN_OUT_ERROR:return this.onSignOutError(e);case i.FRAME_SWITCH_NETWORK_SUCCESS:return this.onSwitchChainSuccess(e);case i.FRAME_SWITCH_NETWORK_ERROR:return this.onSwitchChainError(e);case i.FRAME_RPC_REQUEST_SUCCESS:return this.onRpcRequestSuccess(e);case i.FRAME_RPC_REQUEST_ERROR:return this.onRpcRequestError(e);case i.FRAME_SESSION_UPDATE:return this.onSessionUpdate(e);case i.FRAME_UPDATE_EMAIL_SUCCESS:return this.onUpdateEmailSuccess(e);case i.FRAME_UPDATE_EMAIL_ERROR:return this.onUpdateEmailError(e);case i.FRAME_UPDATE_EMAIL_PRIMARY_OTP_SUCCESS:return this.onUpdateEmailPrimaryOtpSuccess();case i.FRAME_UPDATE_EMAIL_PRIMARY_OTP_ERROR:return this.onUpdateEmailPrimaryOtpError(e);case i.FRAME_UPDATE_EMAIL_SECONDARY_OTP_SUCCESS:return this.onUpdateEmailSecondaryOtpSuccess(e);case i.FRAME_UPDATE_EMAIL_SECONDARY_OTP_ERROR:return this.onUpdateEmailSecondaryOtpError(e);case i.FRAME_SYNC_THEME_SUCCESS:return this.onSyncThemeSuccess();case i.FRAME_SYNC_THEME_ERROR:return this.onSyncThemeError(e);case i.FRAME_SYNC_DAPP_DATA_SUCCESS:return this.onSyncDappDataSuccess();case i.FRAME_SYNC_DAPP_DATA_ERROR:return this.onSyncDappDataError(e);case i.FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS:return this.onSmartAccountEnabledNetworksSuccess(e);case i.FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR:return this.onSmartAccountEnabledNetworksError(e);case i.FRAME_SET_PREFERRED_ACCOUNT_SUCCESS:return this.onSetPreferredAccountSuccess();case i.FRAME_SET_PREFERRED_ACCOUNT_ERROR:return this.onSetPreferredAccountError();default:return null}}))}getLoginEmailUsed(){return Boolean(xr.get(i.EMAIL_LOGIN_USED_KEY))}getEmail(){return xr.get(i.EMAIL)}rejectRpcRequest(){this.rpcRequestResolver?.reject()}async connectEmail(e){return await this.w3mFrame.frameLoadPromise,Ir.checkIfAllowedToTriggerEmail(),this.w3mFrame.events.postAppEvent({type:i.APP_CONNECT_EMAIL,payload:e}),new Promise(((e,t)=>{this.connectEmailResolver={resolve:e,reject:t}}))}async connectDevice(){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:i.APP_CONNECT_DEVICE}),new Promise(((e,t)=>{this.connectDeviceResolver={resolve:e,reject:t}}))}async connectOtp(e){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:i.APP_CONNECT_OTP,payload:e}),new Promise(((e,t)=>{this.connectOtpResolver={resolve:e,reject:t}}))}async isConnected(){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:i.APP_IS_CONNECTED,payload:void 0}),new Promise(((e,t)=>{this.isConnectedResolver={resolve:e,reject:t}}))}async getChainId(){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:i.APP_GET_CHAIN_ID}),new Promise(((e,t)=>{this.getChainIdResolver={resolve:e,reject:t}}))}async getSocialRedirectUri(e){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:i.APP_GET_SOCIAL_REDIRECT_URI,payload:e}),new Promise(((e,t)=>{this.getSocialRedirectUriResolver={resolve:e,reject:t}}))}async updateEmail(e){return await this.w3mFrame.frameLoadPromise,Ir.checkIfAllowedToTriggerEmail(),this.w3mFrame.events.postAppEvent({type:i.APP_UPDATE_EMAIL,payload:e}),new Promise(((e,t)=>{this.updateEmailResolver={resolve:e,reject:t}}))}async updateEmailPrimaryOtp(e){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:i.APP_UPDATE_EMAIL_PRIMARY_OTP,payload:e}),new Promise(((e,t)=>{this.updateEmailPrimaryOtpResolver={resolve:e,reject:t}}))}async updateEmailSecondaryOtp(e){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:i.APP_UPDATE_EMAIL_SECONDARY_OTP,payload:e}),new Promise(((e,t)=>{this.updateEmailSecondaryOtpResolver={resolve:e,reject:t}}))}async syncTheme(e){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:i.APP_SYNC_THEME,payload:e}),new Promise(((e,t)=>{this.syncThemeResolver={resolve:e,reject:t}}))}async syncDappData(e){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:i.APP_SYNC_DAPP_DATA,payload:e}),new Promise(((e,t)=>{this.syncDappDataResolver={resolve:e,reject:t}}))}async getSmartAccountEnabledNetworks(){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:i.APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS}),new Promise(((e,t)=>{this.smartAccountEnabledNetworksResolver={resolve:e,reject:t}}))}async setPreferredAccount(e){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:i.APP_SET_PREFERRED_ACCOUNT,payload:{type:e}}),new Promise(((e,t)=>{this.setPreferredAccountResolver={resolve:e,reject:t}}))}async connect(e){const t=e?.chainId??this.getLastUsedChainId()??1;return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:i.APP_GET_USER,payload:{chainId:t}}),new Promise(((e,t)=>{this.connectResolver={resolve:e,reject:t}}))}async connectSocial(e){return this.w3mFrame.events.postAppEvent({type:i.APP_CONNECT_SOCIAL,payload:{uri:e}}),new Promise(((e,t)=>{this.connectSocialResolver={resolve:e,reject:t}}))}async switchNetwork(e){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:i.APP_SWITCH_NETWORK,payload:{chainId:e}}),new Promise(((e,t)=>{this.switchChainResolver={resolve:e,reject:t}}))}async disconnect(){return await this.w3mFrame.frameLoadPromise,this.w3mFrame.events.postAppEvent({type:i.APP_SIGN_OUT}),new Promise(((e,t)=>{this.disconnectResolver={resolve:e,reject:t}}))}async request(e){return await this.w3mFrame.frameLoadPromise,s.GET_CHAIN_ID===e.method?this.getLastUsedChainId():(this.w3mFrame.events.postAppEvent({type:i.APP_RPC_REQUEST,payload:e}),new Promise(((e,t)=>{this.rpcRequestResolver={resolve:e,reject:t}})))}onRpcRequest(e){this.w3mFrame.events.onAppEvent((t=>{t.type.includes(i.RPC_METHOD_KEY)&&e(t)}))}onRpcResponse(e){this.w3mFrame.events.onFrameEvent((t=>{t.type.includes(i.RPC_METHOD_KEY)&&e(t)}))}onIsConnected(e){this.w3mFrame.events.onFrameEvent((t=>{t.type===i.FRAME_GET_USER_SUCCESS&&e(t.payload)}))}onNotConnected(e){this.w3mFrame.events.onFrameEvent((t=>{t.type===i.FRAME_IS_CONNECTED_ERROR&&e(),t.type!==i.FRAME_IS_CONNECTED_SUCCESS||t.payload.isConnected||e()}))}onSetPreferredAccount(e){this.w3mFrame.events.onFrameEvent((t=>{t.type===i.FRAME_SET_PREFERRED_ACCOUNT_SUCCESS?e(t.payload):t.type===i.FRAME_SET_PREFERRED_ACCOUNT_ERROR&&e({type:s.ACCOUNT_TYPES.EOA})}))}onGetSmartAccountEnabledNetworks(e){this.w3mFrame.events.onFrameEvent((t=>{t.type===i.FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS?e(t.payload.smartAccountEnabledNetworks):t.type===i.FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR&&e([])}))}onConnectEmailSuccess(e){this.connectEmailResolver?.resolve(e.payload),this.setNewLastEmailLoginTime()}onConnectEmailError(e){this.connectEmailResolver?.reject(e.payload.message)}onConnectDeviceSuccess(){this.connectDeviceResolver?.resolve(void 0)}onConnectDeviceError(e){this.connectDeviceResolver?.reject(e.payload.message)}onConnectOtpSuccess(){this.connectOtpResolver?.resolve(void 0)}onConnectOtpError(e){this.connectOtpResolver?.reject(e.payload.message)}onConnectSuccess(e){this.setEmailLoginSuccess(e.payload.email),this.setLastUsedChainId(e.payload.chainId),this.connectResolver?.resolve(e.payload)}onConnectError(e){this.connectResolver?.reject(e.payload.message)}onConnectSocialSuccess(e){e.payload.userName&&this.setSocialLoginSuccess(e.payload.userName),this.connectSocialResolver?.resolve(e.payload)}onConnectSocialError(e){this.connectSocialResolver?.reject(e.payload.message)}onIsConnectedSuccess(e){e.payload.isConnected||this.deleteAuthLoginCache(),this.isConnectedResolver?.resolve(e.payload)}onIsConnectedError(e){this.isConnectedResolver?.reject(e.payload.message)}onGetChainIdSuccess(e){this.setLastUsedChainId(e.payload.chainId),this.getChainIdResolver?.resolve(e.payload)}onGetChainIdError(e){this.getChainIdResolver?.reject(e.payload.message)}onGetSocialRedirectUriSuccess(e){this.getSocialRedirectUriResolver?.resolve(e.payload)}onGetSocialRedirectUriError(e){this.getSocialRedirectUriResolver?.reject(e.payload.message)}onSignOutSuccess(){this.disconnectResolver?.resolve(void 0),this.deleteAuthLoginCache()}onSignOutError(e){this.disconnectResolver?.reject(e.payload.message)}onSwitchChainSuccess(e){this.setLastUsedChainId(e.payload.chainId),this.switchChainResolver?.resolve(e.payload)}onSwitchChainError(e){this.switchChainResolver?.reject(e.payload.message)}onRpcRequestSuccess(e){this.rpcRequestResolver?.resolve(e.payload)}onRpcRequestError(e){this.rpcRequestResolver?.reject(e.payload.message)}onSessionUpdate(e){const{payload:t}=e}onUpdateEmailSuccess(e){this.updateEmailResolver?.resolve(e.payload),this.setNewLastEmailLoginTime()}onUpdateEmailError(e){this.updateEmailResolver?.reject(e.payload.message)}onUpdateEmailPrimaryOtpSuccess(){this.updateEmailPrimaryOtpResolver?.resolve(void 0)}onUpdateEmailPrimaryOtpError(e){this.updateEmailPrimaryOtpResolver?.reject(e.payload.message)}onUpdateEmailSecondaryOtpSuccess(e){const{newEmail:t}=e.payload;this.setEmailLoginSuccess(t),this.updateEmailSecondaryOtpResolver?.resolve({newEmail:t})}onUpdateEmailSecondaryOtpError(e){this.updateEmailSecondaryOtpResolver?.reject(e.payload.message)}onSyncThemeSuccess(){this.syncThemeResolver?.resolve(void 0)}onSyncThemeError(e){this.syncThemeResolver?.reject(e.payload.message)}onSyncDappDataSuccess(){this.syncDappDataResolver?.resolve(void 0)}onSyncDappDataError(e){this.syncDappDataResolver?.reject(e.payload.message)}onSmartAccountEnabledNetworksSuccess(e){this.persistSmartAccountEnabledNetworks(e.payload.smartAccountEnabledNetworks),this.smartAccountEnabledNetworksResolver?.resolve(e.payload)}onSmartAccountEnabledNetworksError(e){this.persistSmartAccountEnabledNetworks([]),this.smartAccountEnabledNetworksResolver?.reject(e.payload.message)}onSetPreferredAccountSuccess(){this.setPreferredAccountResolver?.resolve(void 0)}onSetPreferredAccountError(){this.setPreferredAccountResolver?.reject()}setNewLastEmailLoginTime(){xr.set(i.LAST_EMAIL_LOGIN_TIME,Date.now().toString())}setSocialLoginSuccess(e){xr.set(i.SOCIAL_USERNAME,e)}setEmailLoginSuccess(e){xr.set(i.EMAIL,e),xr.set(i.EMAIL_LOGIN_USED_KEY,"true"),xr.delete(i.LAST_EMAIL_LOGIN_TIME)}deleteAuthLoginCache(){xr.delete(i.EMAIL_LOGIN_USED_KEY),xr.delete(i.EMAIL),xr.delete(i.LAST_USED_CHAIN_KEY),xr.delete(i.SOCIAL_USERNAME),xr.delete(i.SOCIAL,!0)}setLastUsedChainId(e){xr.set(i.LAST_USED_CHAIN_KEY,String(e))}getLastUsedChainId(){return Number(xr.get(i.LAST_USED_CHAIN_KEY))}persistSmartAccountEnabledNetworks(e){xr.set(i.SMART_ACCOUNT_ENABLED_NETWORKS,e.join(","))}}},7804:(e,t,r)=>{"use strict";r.d(t,{OA:()=>n,WL:()=>s,u$:()=>i});const n={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},i=e=>(...t)=>({_$litDirective$:e,values:t});class s{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}},6752:(e,t,r)=>{"use strict";r.d(t,{JW:()=>S,XX:()=>q,c0:()=>k,ge:()=>H,qy:()=>C,s6:()=>_});const n=globalThis,i=n.trustedTypes,s=i?i.createPolicy("lit-html",{createHTML:e=>e}):void 0,o="$lit$",a=`lit$${Math.random().toFixed(9).slice(2)}$`,c="?"+a,l=`<${c}>`,u=document,h=()=>u.createComment(""),d=e=>null===e||"object"!=typeof e&&"function"!=typeof e,f=Array.isArray,p=e=>f(e)||"function"==typeof e?.[Symbol.iterator],g="[ \t\n\f\r]",m=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,y=/-->/g,w=/>/g,b=RegExp(`>|${g}(?:([^\\s"'>=/]+)(${g}*=${g}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),v=/'/g,A=/"/g,E=/^(?:script|style|textarea|title)$/i,x=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),C=x(1),S=x(2),k=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),I=new WeakMap,M=u.createTreeWalker(u,129);function T(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s?s.createHTML(t):t}const P=(e,t)=>{const r=e.length-1,n=[];let i,s=2===t?"<svg>":"",c=m;for(let t=0;t<r;t++){const r=e[t];let u,h,d=-1,f=0;for(;f<r.length&&(c.lastIndex=f,h=c.exec(r),null!==h);)f=c.lastIndex,c===m?"!--"===h[1]?c=y:void 0!==h[1]?c=w:void 0!==h[2]?(E.test(h[2])&&(i=RegExp("</"+h[2],"g")),c=b):void 0!==h[3]&&(c=b):c===b?">"===h[0]?(c=i??m,d=-1):void 0===h[1]?d=-2:(d=c.lastIndex-h[2].length,u=h[1],c=void 0===h[3]?b:'"'===h[3]?A:v):c===A||c===v?c=b:c===y||c===w?c=m:(c=b,i=void 0);const p=c===b&&e[t+1].startsWith("/>")?" ":"";s+=c===m?r+l:d>=0?(n.push(u),r.slice(0,d)+o+r.slice(d)+a+p):r+a+(-2===d?t:p)}return[T(e,s+(e[r]||"<?>")+(2===t?"</svg>":"")),n]};class O{constructor({strings:e,_$litType$:t},r){let n;this.parts=[];let s=0,l=0;const u=e.length-1,d=this.parts,[f,p]=P(e,t);if(this.el=O.createElement(f,r),M.currentNode=this.el.content,2===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=M.nextNode())&&d.length<u;){if(1===n.nodeType){if(n.hasAttributes())for(const e of n.getAttributeNames())if(e.endsWith(o)){const t=p[l++],r=n.getAttribute(e).split(a),i=/([.?@])?(.*)/.exec(t);d.push({type:1,index:s,name:i[2],strings:r,ctor:"."===i[1]?D:"?"===i[1]?L:"@"===i[1]?F:U}),n.removeAttribute(e)}else e.startsWith(a)&&(d.push({type:6,index:s}),n.removeAttribute(e));if(E.test(n.tagName)){const e=n.textContent.split(a),t=e.length-1;if(t>0){n.textContent=i?i.emptyScript:"";for(let r=0;r<t;r++)n.append(e[r],h()),M.nextNode(),d.push({type:2,index:++s});n.append(e[t],h())}}}else if(8===n.nodeType)if(n.data===c)d.push({type:2,index:s});else{let e=-1;for(;-1!==(e=n.data.indexOf(a,e+1));)d.push({type:7,index:s}),e+=a.length-1}s++}}static createElement(e,t){const r=u.createElement("template");return r.innerHTML=e,r}}function R(e,t,r=e,n){if(t===k)return t;let i=void 0!==n?r._$Co?.[n]:r._$Cl;const s=d(t)?void 0:t._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),void 0===s?i=void 0:(i=new s(e),i._$AT(e,r,n)),void 0!==n?(r._$Co??=[])[n]=i:r._$Cl=i),void 0!==i&&(t=R(e,i._$AS(e,t.values),i,n)),t}class N{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,n=(e?.creationScope??u).importNode(t,!0);M.currentNode=n;let i=M.nextNode(),s=0,o=0,a=r[0];for(;void 0!==a;){if(s===a.index){let t;2===a.type?t=new B(i,i.nextSibling,this,e):1===a.type?t=new a.ctor(i,a.name,a.strings,this,e):6===a.type&&(t=new j(i,this,e)),this._$AV.push(t),a=r[++o]}s!==a?.index&&(i=M.nextNode(),s++)}return M.currentNode=u,n}p(e){let t=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class B{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,n){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=R(this,e,t),d(e)?e===_||null==e||""===e?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==k&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):p(e)?this.k(e):this._(e)}S(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}_(e){this._$AH!==_&&d(this._$AH)?this._$AA.nextSibling.data=e:this.T(u.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:r}=e,n="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=O.createElement(T(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===n)this._$AH.p(t);else{const e=new N(n,this),r=e.u(this.options);e.p(t),this.T(r),this._$AH=e}}_$AC(e){let t=I.get(e.strings);return void 0===t&&I.set(e.strings,t=new O(e)),t}k(e){f(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,n=0;for(const i of e)n===t.length?t.push(r=new B(this.S(h()),this.S(h()),this,this.options)):r=t[n],r._$AI(i),n++;n<t.length&&(this._$AR(r&&r._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class U{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,n,i){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=i,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=_}_$AI(e,t=this,r,n){const i=this.strings;let s=!1;if(void 0===i)e=R(this,e,t,0),s=!d(e)||e!==this._$AH&&e!==k,s&&(this._$AH=e);else{const n=e;let o,a;for(e=i[0],o=0;o<i.length-1;o++)a=R(this,n[r+o],t,o),a===k&&(a=this._$AH[o]),s||=!d(a)||a!==this._$AH[o],a===_?e=_:e!==_&&(e+=(a??"")+i[o+1]),this._$AH[o]=a}s&&!n&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class D extends U{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}}class L extends U{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==_)}}class F extends U{constructor(e,t,r,n,i){super(e,t,r,n,i),this.type=5}_$AI(e,t=this){if((e=R(this,e,t,0)??_)===k)return;const r=this._$AH,n=e===_&&r!==_||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==_&&(r===_||n);n&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class j{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){R(this,e)}}const H={P:o,A:a,C:c,M:1,L:P,R:N,D:p,V:R,I:B,H:U,N:L,U:F,B:D,F:j},z=n.litHtmlPolyfillSupport;z?.(O,B),(n.litHtmlVersions??=[]).push("3.1.3");const q=(e,t,r)=>{const n=r?.renderBefore??t;let i=n._$litPart$;if(void 0===i){const e=r?.renderBefore??null;n._$litPart$=i=new B(t.insertBefore(h(),e),e,void 0,r??{})}return i._$AI(e),i}},5707:(e,t,r)=>{"use strict";r.d(t,{MZ:()=>n.M,wk:()=>i.w});var n=r(5694),i=r(4290)},31:(e,t,r)=>{"use strict";r.d(t,{J:()=>i});var n=r(6752);const i=e=>e??n.s6},8342:(e,t,r)=>{"use strict";r.d(t,{_:()=>f,K:()=>m});var n=r(6752);const{I:i}=n.ge;var s=r(7804);const o=(e,t)=>{const r=e._$AN;if(void 0===r)return!1;for(const e of r)e._$AO?.(t,!1),o(e,t);return!0},a=e=>{let t,r;do{if(void 0===(t=e._$AM))break;r=t._$AN,r.delete(e),e=t}while(0===r?.size)},c=e=>{for(let t;t=e._$AM;e=t){let r=t._$AN;if(void 0===r)t._$AN=r=new Set;else if(r.has(e))break;r.add(e),h(t)}};function l(e){void 0!==this._$AN?(a(this),this._$AM=e,c(this)):this._$AM=e}function u(e,t=!1,r=0){const n=this._$AH,i=this._$AN;if(void 0!==i&&0!==i.size)if(t)if(Array.isArray(n))for(let e=r;e<n.length;e++)o(n[e],!1),a(n[e]);else null!=n&&(o(n,!1),a(n));else o(this,e)}const h=e=>{e.type==s.OA.CHILD&&(e._$AP??=u,e._$AQ??=l)};class d extends s.WL{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,r){super._$AT(e,t,r),c(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(o(this,e),a(this))}setValue(e){if((e=>void 0===this._$Ct.strings)())this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}const f=()=>new p;class p{}const g=new WeakMap,m=(0,s.u$)(class extends d{render(e){return n.s6}update(e,[t]){const r=t!==this.Y;return r&&void 0!==this.Y&&this.rt(void 0),(r||this.lt!==this.ct)&&(this.Y=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),n.s6}rt(e){if("function"==typeof this.Y){const t=this.ht??globalThis;let r=g.get(t);void 0===r&&(r=new WeakMap,g.set(t,r)),void 0!==r.get(this.Y)&&this.Y.call(this.ht,void 0),r.set(this.Y,e),void 0!==e&&this.Y.call(this.ht,e)}else this.Y.value=e}get lt(){return"function"==typeof this.Y?g.get(this.ht??globalThis)?.get(this.Y):this.Y?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}})},2618:(e,t,r)=>{"use strict";r.d(t,{WF:()=>s,AH:()=>n.AH,qy:()=>i.qy,JW:()=>i.JW,iz:()=>n.iz});var n=r(842),i=r(6752);class s extends n.mN{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=(0,i.XX)(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return i.c0}}s._$litElement$=!0,s.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:s});const o=globalThis.litElementPolyfillSupport;o?.({LitElement:s}),(globalThis.litElementVersions??=[]).push("4.0.5")},3360:(e,t,r)=>{"use strict";r.d(t,{Fo:()=>Ne});var n={};r.r(n),r.d(n,{identity:()=>k});var i={};r.r(i),r.d(i,{base2:()=>_});var s={};r.r(s),r.d(s,{base8:()=>I});var o={};r.r(o),r.d(o,{base10:()=>M});var a={};r.r(a),r.d(a,{base16:()=>T,base16upper:()=>P});var c={};r.r(c),r.d(c,{base32:()=>O,base32hex:()=>U,base32hexpad:()=>L,base32hexpadupper:()=>F,base32hexupper:()=>D,base32pad:()=>N,base32padupper:()=>B,base32upper:()=>R,base32z:()=>j});var l={};r.r(l),r.d(l,{base36:()=>H,base36upper:()=>z});var u={};r.r(u),r.d(u,{base58btc:()=>q,base58flickr:()=>$});var h={};r.r(h),r.d(h,{base64:()=>W,base64pad:()=>G,base64url:()=>V,base64urlpad:()=>K});var d={};r.r(d),r.d(d,{base256emoji:()=>Y});var f={};r.r(f),r.d(f,{sha256:()=>ve,sha512:()=>Ae});var p={};r.r(p),r.d(p,{identity:()=>xe});var g={};r.r(g),r.d(g,{code:()=>Se,decode:()=>_e,encode:()=>ke,name:()=>Ce});var m={};r.r(m),r.d(m,{code:()=>Pe,decode:()=>Re,encode:()=>Oe,name:()=>Te});const y=(new Uint8Array(0),e=>{if(e instanceof Uint8Array&&"Uint8Array"===e.constructor.name)return e;if(e instanceof ArrayBuffer)return new Uint8Array(e);if(ArrayBuffer.isView(e))return new Uint8Array(e.buffer,e.byteOffset,e.byteLength);throw new Error("Unknown type, must be binary type")});class w{constructor(e,t,r){this.name=e,this.prefix=t,this.baseEncode=r}encode(e){if(e instanceof Uint8Array)return`${this.prefix}${this.baseEncode(e)}`;throw Error("Unknown type, must be binary type")}}class b{constructor(e,t,r){if(this.name=e,this.prefix=t,void 0===t.codePointAt(0))throw new Error("Invalid prefix character");this.prefixCodePoint=t.codePointAt(0),this.baseDecode=r}decode(e){if("string"==typeof e){if(e.codePointAt(0)!==this.prefixCodePoint)throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);return this.baseDecode(e.slice(this.prefix.length))}throw Error("Can only multibase decode strings")}or(e){return A(this,e)}}class v{constructor(e){this.decoders=e}or(e){return A(this,e)}decode(e){const t=e[0],r=this.decoders[t];if(r)return r.decode(e);throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`)}}const A=(e,t)=>new v({...e.decoders||{[e.prefix]:e},...t.decoders||{[t.prefix]:t}});class E{constructor(e,t,r,n){this.name=e,this.prefix=t,this.baseEncode=r,this.baseDecode=n,this.encoder=new w(e,t,r),this.decoder=new b(e,t,n)}encode(e){return this.encoder.encode(e)}decode(e){return this.decoder.decode(e)}}const x=({name:e,prefix:t,encode:r,decode:n})=>new E(e,t,r,n),C=({prefix:e,name:t,alphabet:r})=>{const{encode:n,decode:i}=function(e,t){if(e.length>=255)throw new TypeError("Alphabet too long");for(var r=new Uint8Array(256),n=0;n<r.length;n++)r[n]=255;for(var i=0;i<e.length;i++){var s=e.charAt(i),o=s.charCodeAt(0);if(255!==r[o])throw new TypeError(s+" is ambiguous");r[o]=i}var a=e.length,c=e.charAt(0),l=Math.log(a)/Math.log(256),u=Math.log(256)/Math.log(a);function h(e){if("string"!=typeof e)throw new TypeError("Expected String");if(0===e.length)return new Uint8Array;var t=0;if(" "!==e[t]){for(var n=0,i=0;e[t]===c;)n++,t++;for(var s=(e.length-t)*l+1>>>0,o=new Uint8Array(s);e[t];){var u=r[e.charCodeAt(t)];if(255===u)return;for(var h=0,d=s-1;(0!==u||h<i)&&-1!==d;d--,h++)u+=a*o[d]>>>0,o[d]=u%256>>>0,u=u/256>>>0;if(0!==u)throw new Error("Non-zero carry");i=h,t++}if(" "!==e[t]){for(var f=s-i;f!==s&&0===o[f];)f++;for(var p=new Uint8Array(n+(s-f)),g=n;f!==s;)p[g++]=o[f++];return p}}}return{encode:function(t){if(t instanceof Uint8Array||(ArrayBuffer.isView(t)?t=new Uint8Array(t.buffer,t.byteOffset,t.byteLength):Array.isArray(t)&&(t=Uint8Array.from(t))),!(t instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(0===t.length)return"";for(var r=0,n=0,i=0,s=t.length;i!==s&&0===t[i];)i++,r++;for(var o=(s-i)*u+1>>>0,l=new Uint8Array(o);i!==s;){for(var h=t[i],d=0,f=o-1;(0!==h||d<n)&&-1!==f;f--,d++)h+=256*l[f]>>>0,l[f]=h%a>>>0,h=h/a>>>0;if(0!==h)throw new Error("Non-zero carry");n=d,i++}for(var p=o-n;p!==o&&0===l[p];)p++;for(var g=c.repeat(r);p<o;++p)g+=e.charAt(l[p]);return g},decodeUnsafe:h,decode:function(e){var r=h(e);if(r)return r;throw new Error(`Non-${t} character`)}}}(r,t);return x({prefix:e,name:t,encode:n,decode:e=>y(i(e))})},S=({name:e,prefix:t,bitsPerChar:r,alphabet:n})=>x({prefix:t,name:e,encode:e=>((e,t,r)=>{const n="="===t[t.length-1],i=(1<<r)-1;let s="",o=0,a=0;for(let n=0;n<e.length;++n)for(a=a<<8|e[n],o+=8;o>r;)o-=r,s+=t[i&a>>o];if(o&&(s+=t[i&a<<r-o]),n)for(;s.length*r&7;)s+="=";return s})(e,n,r),decode:t=>((e,t,r,n)=>{const i={};for(let e=0;e<t.length;++e)i[t[e]]=e;let s=e.length;for(;"="===e[s-1];)--s;const o=new Uint8Array(s*r/8|0);let a=0,c=0,l=0;for(let t=0;t<s;++t){const s=i[e[t]];if(void 0===s)throw new SyntaxError(`Non-${n} character`);c=c<<r|s,a+=r,a>=8&&(a-=8,o[l++]=255&c>>a)}if(a>=r||255&c<<8-a)throw new SyntaxError("Unexpected end of data");return o})(t,n,r,e)}),k=x({prefix:"\0",name:"identity",encode:e=>{return t=e,(new TextDecoder).decode(t);var t},decode:e=>(e=>(new TextEncoder).encode(e))(e)}),_=S({prefix:"0",name:"base2",alphabet:"01",bitsPerChar:1}),I=S({prefix:"7",name:"base8",alphabet:"01234567",bitsPerChar:3}),M=C({prefix:"9",name:"base10",alphabet:"0123456789"}),T=S({prefix:"f",name:"base16",alphabet:"0123456789abcdef",bitsPerChar:4}),P=S({prefix:"F",name:"base16upper",alphabet:"0123456789ABCDEF",bitsPerChar:4}),O=S({prefix:"b",name:"base32",alphabet:"abcdefghijklmnopqrstuvwxyz234567",bitsPerChar:5}),R=S({prefix:"B",name:"base32upper",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",bitsPerChar:5}),N=S({prefix:"c",name:"base32pad",alphabet:"abcdefghijklmnopqrstuvwxyz234567=",bitsPerChar:5}),B=S({prefix:"C",name:"base32padupper",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",bitsPerChar:5}),U=S({prefix:"v",name:"base32hex",alphabet:"0123456789abcdefghijklmnopqrstuv",bitsPerChar:5}),D=S({prefix:"V",name:"base32hexupper",alphabet:"0123456789ABCDEFGHIJKLMNOPQRSTUV",bitsPerChar:5}),L=S({prefix:"t",name:"base32hexpad",alphabet:"0123456789abcdefghijklmnopqrstuv=",bitsPerChar:5}),F=S({prefix:"T",name:"base32hexpadupper",alphabet:"0123456789ABCDEFGHIJKLMNOPQRSTUV=",bitsPerChar:5}),j=S({prefix:"h",name:"base32z",alphabet:"ybndrfg8ejkmcpqxot1uwisza345h769",bitsPerChar:5}),H=C({prefix:"k",name:"base36",alphabet:"0123456789abcdefghijklmnopqrstuvwxyz"}),z=C({prefix:"K",name:"base36upper",alphabet:"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"}),q=C({name:"base58btc",prefix:"z",alphabet:"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"}),$=C({name:"base58flickr",prefix:"Z",alphabet:"123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"}),W=S({prefix:"m",name:"base64",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",bitsPerChar:6}),G=S({prefix:"M",name:"base64pad",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",bitsPerChar:6}),V=S({prefix:"u",name:"base64url",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",bitsPerChar:6}),K=S({prefix:"U",name:"base64urlpad",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",bitsPerChar:6}),Z=Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"),Q=Z.reduce(((e,t,r)=>(e[r]=t,e)),[]),J=Z.reduce(((e,t,r)=>(e[t.codePointAt(0)]=r,e)),[]),Y=x({prefix:"🚀",name:"base256emoji",encode:function(e){return e.reduce(((e,t)=>e+Q[t]),"")},decode:function(e){const t=[];for(const r of e){const e=J[r.codePointAt(0)];if(void 0===e)throw new Error(`Non-base256emoji character: ${r}`);t.push(e)}return new Uint8Array(t)}});var X=128,ee=-128,te=Math.pow(2,31),re=Math.pow(2,7),ne=Math.pow(2,14),ie=Math.pow(2,21),se=Math.pow(2,28),oe=Math.pow(2,35),ae=Math.pow(2,42),ce=Math.pow(2,49),le=Math.pow(2,56),ue=Math.pow(2,63);const he=function e(t,r,n){r=r||[];for(var i=n=n||0;t>=te;)r[n++]=255&t|X,t/=128;for(;t&ee;)r[n++]=255&t|X,t>>>=7;return r[n]=0|t,e.bytes=n-i+1,r},de=function(e){return e<re?1:e<ne?2:e<ie?3:e<se?4:e<oe?5:e<ae?6:e<ce?7:e<le?8:e<ue?9:10},fe=(e,t,r=0)=>(he(e,t,r),t),pe=e=>de(e),ge=(e,t)=>{const r=t.byteLength,n=pe(e),i=n+pe(r),s=new Uint8Array(i+r);return fe(e,s,0),fe(r,s,n),s.set(t,i),new me(e,r,t,s)};class me{constructor(e,t,r,n){this.code=e,this.size=t,this.digest=r,this.bytes=n}}const ye=({name:e,code:t,encode:r})=>new we(e,t,r);class we{constructor(e,t,r){this.name=e,this.code=t,this.encode=r}digest(e){if(e instanceof Uint8Array){const t=this.encode(e);return t instanceof Uint8Array?ge(this.code,t):t.then((e=>ge(this.code,e)))}throw Error("Unknown type, must be binary type")}}const be=e=>async t=>new Uint8Array(await crypto.subtle.digest(e,t)),ve=ye({name:"sha2-256",code:18,encode:be("SHA-256")}),Ae=ye({name:"sha2-512",code:19,encode:be("SHA-512")}),Ee=y,xe={code:0,name:"identity",encode:Ee,digest:e=>ge(0,Ee(e))},Ce="raw",Se=85,ke=e=>y(e),_e=e=>y(e),Ie=new TextEncoder,Me=new TextDecoder,Te="json",Pe=512,Oe=e=>Ie.encode(JSON.stringify(e)),Re=e=>JSON.parse(Me.decode(e));r(6763),Symbol.toStringTag,Symbol.for("nodejs.util.inspect.custom"),Symbol.for("@ipld/js-cid/CID");const Ne={...n,...i,...s,...o,...a,...c,...l,...u,...h,...d}},5238:(e,t,r)=>{"use strict";r.d(t,{K:()=>i});var n=r(5930);function i(e=0){return null!=globalThis.Buffer&&null!=globalThis.Buffer.allocUnsafe?(0,n.o)(globalThis.Buffer.allocUnsafe(e)):new Uint8Array(e)}},4117:(e,t,r)=>{"use strict";r.d(t,{s:()=>s});var n=r(1630),i=r(5930);function s(e,t="utf8"){const r=n.A[t];if(!r)throw new Error(`Unsupported encoding "${t}"`);return"utf8"!==t&&"utf-8"!==t||null==globalThis.Buffer||null==globalThis.Buffer.from?r.decoder.decode(`${r.prefix}${e}`):(0,i.o)(globalThis.Buffer.from(e,"utf-8"))}},7302:(e,t,r)=>{"use strict";r.d(t,{d:()=>i});var n=r(1630);function i(e,t="utf8"){const r=n.A[t];if(!r)throw new Error(`Unsupported encoding "${t}"`);return"utf8"!==t&&"utf-8"!==t||null==globalThis.Buffer||null==globalThis.Buffer.from?r.encoder.encode(e).substring(1):globalThis.Buffer.from(e.buffer,e.byteOffset,e.byteLength).toString("utf8")}},5930:(e,t,r)=>{"use strict";function n(e){return null!=globalThis.Buffer?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):e}r.d(t,{o:()=>n})},1630:(e,t,r)=>{"use strict";r.d(t,{A:()=>c});var n=r(3360),i=r(5238);function s(e,t,r,n){return{name:e,prefix:t,encoder:{name:e,prefix:t,encode:r},decoder:{decode:n}}}const o=s("utf8","u",(e=>"u"+new TextDecoder("utf8").decode(e)),(e=>(new TextEncoder).encode(e.substring(1)))),a=s("ascii","a",(e=>{let t="a";for(let r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t}),(e=>{e=e.substring(1);const t=(0,i.K)(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t})),c={utf8:o,"utf-8":o,hex:n.Fo.base16,latin1:a,ascii:a,binary:a,...n.Fo}},9073:(e,t,r)=>{"use strict";r.d(t,{BX:()=>d,KR:()=>g,P9:()=>p,B1:()=>f}),Symbol();const n=Symbol(),i=Object.getPrototypeOf,s=new WeakMap,o=(e,t=!0)=>{s.set(e,t)};var a=r(6763);const c=e=>"object"==typeof e&&null!==e,l=new WeakMap,u=new WeakSet,[h]=((e=Object.is,t=((e,t)=>new Proxy(e,t)),r=(e=>c(e)&&!u.has(e)&&(Array.isArray(e)||!(Symbol.iterator in e))&&!(e instanceof WeakMap)&&!(e instanceof WeakSet)&&!(e instanceof Error)&&!(e instanceof Number)&&!(e instanceof Date)&&!(e instanceof String)&&!(e instanceof RegExp)&&!(e instanceof ArrayBuffer)),a=(e=>{switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:throw e}}),h=new WeakMap,d=((e,t,r=a)=>{const n=h.get(e);if((null==n?void 0:n[0])===t)return n[1];const i=Array.isArray(e)?[]:Object.create(Object.getPrototypeOf(e));return o(i,!0),h.set(e,[t,i]),Reflect.ownKeys(e).forEach((t=>{if(Object.getOwnPropertyDescriptor(i,t))return;const n=Reflect.get(e,t),s={value:n,enumerable:!0,configurable:!0};if(u.has(n))o(n,!1);else if(n instanceof Promise)delete s.value,s.get=()=>r(n);else if(l.has(n)){const[e,t]=l.get(n);s.value=d(e,t(),r)}Object.defineProperty(i,t,s)})),Object.preventExtensions(i)}),f=new WeakMap,p=[1,1],g=(o=>{if(!c(o))throw new Error("object required");const a=f.get(o);if(a)return a;let h=p[0];const m=new Set,y=(e,t=++p[0])=>{h!==t&&(h=t,m.forEach((r=>r(e,t))))};let w=p[1];const b=e=>(t,r)=>{const n=[...t];n[1]=[e,...n[1]],y(n,r)},v=new Map,A=e=>{var t;const r=v.get(e);r&&(v.delete(e),null==(t=r[1])||t.call(r))},E=Array.isArray(o)?[]:Object.create(Object.getPrototypeOf(o)),x=t(E,{deleteProperty(e,t){const r=Reflect.get(e,t);A(t);const n=Reflect.deleteProperty(e,t);return n&&y(["delete",[t],r]),n},set(t,o,a,h){const d=Reflect.has(t,o),p=Reflect.get(t,o,h);if(d&&(e(p,a)||f.has(a)&&e(p,f.get(a))))return!0;var w;A(o),c(a)&&(a=(e=>e&&(s.has(e)?s.get(e):i(e)===Object.prototype||i(e)===Array.prototype))(w=a)&&w[n]||null||a);let E=a;if(a instanceof Promise)a.then((e=>{a.status="fulfilled",a.value=e,y(["resolve",[o],e])})).catch((e=>{a.status="rejected",a.reason=e,y(["reject",[o],e])}));else{!l.has(a)&&r(a)&&(E=g(a));const e=!u.has(E)&&l.get(E);e&&((e,t)=>{if(v.has(e))throw new Error("prop listener already exists");if(m.size){const r=t[3](b(e));v.set(e,[t,r])}else v.set(e,[t])})(o,e)}return Reflect.set(t,o,E,h),y(["set",[o],a,p]),!0}});f.set(o,x);const C=[E,(e=++p[1])=>(w===e||m.size||(w=e,v.forEach((([t])=>{const r=t[1](e);r>h&&(h=r)}))),h),d,e=>(m.add(e),1===m.size&&v.forEach((([e,t],r)=>{if(t)throw new Error("remove already exists");const n=e[3](b(r));v.set(r,[e,n])})),()=>{m.delete(e),0===m.size&&v.forEach((([e,t],r)=>{t&&(t(),v.set(r,[e]))}))})];return l.set(x,C),Reflect.ownKeys(o).forEach((e=>{const t=Object.getOwnPropertyDescriptor(o,e);"value"in t&&(x[e]=o[e],delete t.value,delete t.writable),Object.defineProperty(E,e,t)})),x}))=>[g,l,u,e,t,r,a,h,d,f,p])();function d(e={}){return h(e)}function f(e,t,r){const n=l.get(e);let i;n||a.warn("Please use proxy object");const s=[],o=n[3];let c=!1;const u=o((e=>{s.push(e),r?t(s.splice(0)):i||(i=Promise.resolve().then((()=>{i=void 0,c&&t(s.splice(0))})))}));return c=!0,()=>{c=!1,u()}}function p(e,t){const r=l.get(e);r||a.warn("Please use proxy object");const[n,i,s]=r;return s(n,i(),t)}function g(e){return u.add(e),e}},4707:(e,t,r)=>{"use strict";r.d(t,{u$:()=>i});var n=r(9073);function i(e,t,r,i){let s=e[t];return(0,n.B1)(e,(()=>{const n=e[t];Object.is(s,n)||r(s=n)}),i)}r(6763),Symbol()}},n={};function i(e){var t=n[e];if(void 0!==t)return t.exports;var s=n[e]={id:e,loaded:!1,exports:{}};return r[e].call(s.exports,s,s.exports,i),s.loaded=!0,s.exports}i.m=r,i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((t,r)=>(i.f[r](e,t),t)),[])),i.u=e=>e+".main.js",i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="fluence-faucet:",i.l=(r,n,s,o)=>{if(e[r])e[r].push(n);else{var a,c;if(void 0!==s)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var h=l[u];if(h.getAttribute("src")==r||h.getAttribute("data-webpack")==t+s){a=h;break}}a||(c=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,i.nc&&a.setAttribute("nonce",i.nc),a.setAttribute("data-webpack",t+s),a.src=r),e[r]=[n];var d=(t,n)=>{a.onerror=a.onload=null,clearTimeout(f);var i=e[r];if(delete e[r],a.parentNode&&a.parentNode.removeChild(a),i&&i.forEach((e=>e(n))),t)return t(n)},f=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),c&&document.head.appendChild(a)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;i.g.importScripts&&(e=i.g.location+"");var t=i.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var n=r.length-1;n>-1&&(!e||!/^http(s?):/.test(e));)e=r[n--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e})(),(()=>{var e={792:0};i.f.j=(t,r)=>{var n=i.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var s=new Promise(((r,i)=>n=e[t]=[r,i]));r.push(n[2]=s);var o=i.p+i.u(t),a=new Error;i.l(o,(r=>{if(i.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var s=r&&("load"===r.type?"missing":r.type),o=r&&r.target&&r.target.src;a.message="Loading chunk "+t+" failed.\n("+s+": "+o+")",a.name="ChunkLoadError",a.type=s,a.request=o,n[1](a)}}),"chunk-"+t,t)}};var t=(t,r)=>{var n,s,[o,a,c]=r,l=0;if(o.some((t=>0!==e[t]))){for(n in a)i.o(a,n)&&(i.m[n]=a[n]);c&&c(i)}for(t&&t(r);l<o.length;l++)s=o[l],i.o(e,s)&&e[s]&&e[s][0](),e[s]=0},r=self.webpackChunkfluence_faucet=self.webpackChunkfluence_faucet||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),(()=>{"use strict";var e={};i.r(e),i.d(e,{OG:()=>xD,My:()=>pD,bytesToNumberBE:()=>yD,lX:()=>wD,Id:()=>ED,fg:()=>kD,qj:()=>AD,hexToBytes:()=>mD,lq:()=>bD,z:()=>vD,Q5:()=>ID});const t=0x8613d62c79827,r=window.location.host,n=window.location.origin;var s=i(3500),o=i(8251),a=i(2088),c=i(6021),l=i(2618),u=i(5707),h=i(31),d=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let f=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.balance="show",this.charsStart=4,this.charsEnd=6,this.address=a.AccountController.state.address,this.balanceVal=a.AccountController.state.balance,this.balanceSymbol=a.AccountController.state.balanceSymbol,this.profileName=a.AccountController.state.profileName,this.profileImage=a.AccountController.state.profileImage,this.network=a.NetworkController.state.caipNetwork,this.isUnsupportedChain=a.NetworkController.state.isUnsupportedChain,this.unsubscribe.push(a.AccountController.subscribe((e=>{e.isConnected?(this.address=e.address,this.balanceVal=e.balance,this.profileName=e.profileName,this.profileImage=e.profileImage,this.balanceSymbol=e.balanceSymbol):(this.address="",this.balanceVal="",this.profileName="",this.profileImage="",this.balanceSymbol="")})),a.NetworkController.subscribeKey("caipNetwork",(e=>this.network=e)),a.NetworkController.subscribeKey("isUnsupportedChain",(e=>this.isUnsupportedChain=e)))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){const e=a.$m.getNetworkImage(this.network),t="show"===this.balance;return l.qy`
      <wui-account-button
        .disabled=${Boolean(this.disabled)}
        .isUnsupportedChain=${this.isUnsupportedChain}
        address=${(0,h.J)(this.address)}
        profileName=${(0,h.J)(this.profileName)}
        networkSrc=${(0,h.J)(e)}
        avatarSrc=${(0,h.J)(this.profileImage)}
        balance=${t?a.wE.formatBalance(this.balanceVal,this.balanceSymbol):""}
        @click=${this.onClick.bind(this)}
        data-testid="account-button"
        .charsStart=${this.charsStart}
        .charsEnd=${this.charsEnd}
      >
      </wui-account-button>
    `}onClick(){this.isUnsupportedChain?a.W3.open({view:"UnsupportedChain"}):a.W3.open()}};d([(0,u.MZ)({type:Boolean})],f.prototype,"disabled",void 0),d([(0,u.MZ)()],f.prototype,"balance",void 0),d([(0,u.MZ)()],f.prototype,"charsStart",void 0),d([(0,u.MZ)()],f.prototype,"charsEnd",void 0),d([(0,u.wk)()],f.prototype,"address",void 0),d([(0,u.wk)()],f.prototype,"balanceVal",void 0),d([(0,u.wk)()],f.prototype,"balanceSymbol",void 0),d([(0,u.wk)()],f.prototype,"profileName",void 0),d([(0,u.wk)()],f.prototype,"profileImage",void 0),d([(0,u.wk)()],f.prototype,"network",void 0),d([(0,u.wk)()],f.prototype,"isUnsupportedChain",void 0),f=d([(0,c.customElement)("w3m-account-button")],f);const p=l.AH`
  :host {
    display: block;
    width: max-content;
  }
`;var g=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let m=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.balance=void 0,this.size=void 0,this.label=void 0,this.loadingLabel=void 0,this.charsStart=4,this.charsEnd=6,this.isAccount=a.AccountController.state.isConnected,this.isLoading=a.W3.state.loading,this.unsubscribe.push(a.AccountController.subscribeKey("isConnected",(e=>{this.isAccount=e})),a.W3.subscribeKey("loading",(e=>{this.isLoading=e})))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){return this.isAccount&&!this.isLoading?l.qy`
          <w3m-account-button
            .disabled=${Boolean(this.disabled)}
            balance=${(0,h.J)(this.balance)}
            .charsStart=${(0,h.J)(this.charsStart)}
            .charsEnd=${(0,h.J)(this.charsEnd)}
          >
          </w3m-account-button>
        `:l.qy`
          <w3m-connect-button
            size=${(0,h.J)(this.size)}
            label=${(0,h.J)(this.label)}
            loadingLabel=${(0,h.J)(this.loadingLabel)}
          ></w3m-connect-button>
        `}};m.styles=p,g([(0,u.MZ)({type:Boolean})],m.prototype,"disabled",void 0),g([(0,u.MZ)()],m.prototype,"balance",void 0),g([(0,u.MZ)()],m.prototype,"size",void 0),g([(0,u.MZ)()],m.prototype,"label",void 0),g([(0,u.MZ)()],m.prototype,"loadingLabel",void 0),g([(0,u.MZ)()],m.prototype,"charsStart",void 0),g([(0,u.MZ)()],m.prototype,"charsEnd",void 0),g([(0,u.wk)()],m.prototype,"isAccount",void 0),g([(0,u.wk)()],m.prototype,"isLoading",void 0),m=g([(0,c.customElement)("w3m-button")],m);var y=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let w=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.size="md",this.label="Connect Wallet",this.loadingLabel="Connecting...",this.open=a.W3.state.open,this.loading=a.W3.state.loading,this.unsubscribe.push(a.W3.subscribe((e=>{this.open=e.open,this.loading=e.loading})))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){const e=this.loading||this.open;return l.qy`
      <wui-connect-button
        size=${(0,h.J)(this.size)}
        .loading=${e}
        @click=${this.onClick.bind(this)}
        data-testid="connect-button"
      >
        ${e?this.loadingLabel:this.label}
      </wui-connect-button>
    `}onClick(){this.open?a.W3.close():this.loading||a.W3.open()}};y([(0,u.MZ)()],w.prototype,"size",void 0),y([(0,u.MZ)()],w.prototype,"label",void 0),y([(0,u.MZ)()],w.prototype,"loadingLabel",void 0),y([(0,u.wk)()],w.prototype,"open",void 0),y([(0,u.wk)()],w.prototype,"loading",void 0),w=y([(0,c.customElement)("w3m-connect-button")],w),i(505);const b=l.AH`
  :host {
    display: block;
    width: max-content;
  }
`;var v=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let A=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.network=a.NetworkController.state.caipNetwork,this.connected=a.AccountController.state.isConnected,this.loading=a.W3.state.loading,this.isUnsupportedChain=a.NetworkController.state.isUnsupportedChain,this.unsubscribe.push(a.NetworkController.subscribeKey("caipNetwork",(e=>this.network=e)),a.AccountController.subscribeKey("isConnected",(e=>this.connected=e)),a.W3.subscribeKey("loading",(e=>this.loading=e)),a.NetworkController.subscribeKey("isUnsupportedChain",(e=>this.isUnsupportedChain=e)))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){return l.qy`
      <wui-network-button
        .disabled=${Boolean(this.disabled||this.loading)}
        .isUnsupportedChain=${this.isUnsupportedChain}
        imageSrc=${(0,h.J)(a.$m.getNetworkImage(this.network))}
        @click=${this.onClick.bind(this)}
      >
        ${this.isUnsupportedChain?"Switch Network":this.network?.name??(this.connected?"Unknown Network":"Select Network")}
      </wui-network-button>
    `}onClick(){this.loading||(a.En.sendEvent({type:"track",event:"CLICK_NETWORKS"}),a.W3.open({view:"Networks"}))}};A.styles=b,v([(0,u.MZ)({type:Boolean})],A.prototype,"disabled",void 0),v([(0,u.wk)()],A.prototype,"network",void 0),v([(0,u.wk)()],A.prototype,"connected",void 0),v([(0,u.wk)()],A.prototype,"loading",void 0),v([(0,u.wk)()],A.prototype,"isUnsupportedChain",void 0),A=v([(0,c.customElement)("w3m-network-button")],A);const E=l.AH`
  :host {
    display: block;
    will-change: transform, opacity;
  }
`;var x=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let C=class extends l.WF{constructor(){super(),this.resizeObserver=void 0,this.prevHeight="0px",this.prevHistoryLength=1,this.unsubscribe=[],this.view=a.RouterController.state.view,this.unsubscribe.push(a.RouterController.subscribeKey("view",(e=>this.onViewChange(e))))}firstUpdated(){this.resizeObserver=new ResizeObserver((async([e])=>{const t=`${e?.contentRect.height}px`;"0px"!==this.prevHeight&&(await this.animate([{height:this.prevHeight},{height:t}],{duration:150,easing:"ease",fill:"forwards"}).finished,this.style.height="auto"),this.prevHeight=t})),this.resizeObserver.observe(this.getWrapper())}disconnectedCallback(){this.resizeObserver?.unobserve(this.getWrapper()),this.unsubscribe.forEach((e=>e()))}render(){return l.qy`<div>${this.viewTemplate()}</div>`}viewTemplate(){switch(this.view){case"Account":return l.qy`<w3m-account-view></w3m-account-view>`;case"AccountSettings":return l.qy`<w3m-account-settings-view></w3m-account-settings-view>`;case"AllWallets":return l.qy`<w3m-all-wallets-view></w3m-all-wallets-view>`;case"ApproveTransaction":return l.qy`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;case"BuyInProgress":return l.qy`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;case"ChooseAccountName":return l.qy`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;case"Connect":default:return l.qy`<w3m-connect-view></w3m-connect-view>`;case"ConnectingWalletConnect":return l.qy`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;case"ConnectingExternal":return l.qy`<w3m-connecting-external-view></w3m-connecting-external-view>`;case"ConnectingSiwe":return l.qy`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;case"ConnectWallets":return l.qy`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;case"ConnectSocials":return l.qy`<w3m-connect-socials-view></w3m-connect-socials-view>`;case"ConnectingSocial":return l.qy`<w3m-connecting-social-view></w3m-connecting-social-view>`;case"Downloads":return l.qy`<w3m-downloads-view></w3m-downloads-view>`;case"EmailVerifyOtp":return l.qy`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;case"EmailVerifyDevice":return l.qy`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;case"Networks":return l.qy`<w3m-networks-view></w3m-networks-view>`;case"RegisterAccountName":return l.qy`<w3m-register-account-name-view></w3m-register-account-name-view>`;case"RegisterAccountNameSuccess":return l.qy`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;case"SwitchNetwork":return l.qy`<w3m-network-switch-view></w3m-network-switch-view>`;case"GetWallet":return l.qy`<w3m-get-wallet-view></w3m-get-wallet-view>`;case"Transactions":return l.qy`<w3m-transactions-view></w3m-transactions-view>`;case"OnRampProviders":return l.qy`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;case"OnRampActivity":return l.qy`<w3m-onramp-activity-view></w3m-onramp-activity-view>`;case"OnRampTokenSelect":return l.qy`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;case"OnRampFiatSelect":return l.qy`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;case"UpgradeEmailWallet":return l.qy`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;case"UpgradeToSmartAccount":return l.qy`<w3m-upgrade-to-smart-account-view></w3m-upgrade-to-smart-account-view>`;case"UpdateEmailWallet":return l.qy`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;case"UpdateEmailPrimaryOtp":return l.qy`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;case"UpdateEmailSecondaryOtp":return l.qy`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;case"UnsupportedChain":return l.qy`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;case"WalletReceive":return l.qy`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;case"WalletCompatibleNetworks":return l.qy`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;case"Swap":return l.qy`<w3m-swap-view></w3m-swap-view>`;case"SwapSelectToken":return l.qy`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;case"SwapPreview":return l.qy`<w3m-swap-preview-view></w3m-swap-preview-view>`;case"WalletSend":return l.qy`<w3m-wallet-send-view></w3m-wallet-send-view>`;case"WalletSendSelectToken":return l.qy`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;case"WalletSendPreview":return l.qy`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;case"WhatIsABuy":return l.qy`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;case"WhatIsANetwork":return l.qy`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;case"WhatIsAWallet":return l.qy`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`}}async onViewChange(e){a.Ib.hide();const{history:t}=a.RouterController.state;let r=-10,n=10;t.length<this.prevHistoryLength&&(r=10,n=-10),this.prevHistoryLength=t.length,await this.animate([{opacity:1,transform:"translateX(0px)"},{opacity:0,transform:`translateX(${r}px)`}],{duration:150,easing:"ease",fill:"forwards"}).finished,this.view=e,await this.animate([{opacity:0,transform:`translateX(${n}px)`},{opacity:1,transform:"translateX(0px)"}],{duration:150,easing:"ease",fill:"forwards",delay:50}).finished}getWrapper(){return this.shadowRoot?.querySelector("div")}};C.styles=E,x([(0,u.wk)()],C.prototype,"view",void 0),C=x([(0,c.customElement)("w3m-router")],C);const S=l.AH`
  :host > wui-flex {
    width: 100%;
    max-width: 360px;
  }

  :host > wui-flex > wui-flex {
    border-radius: var(--wui-border-radius-l);
    width: 100%;
  }

  .amounts-container {
    width: 100%;
  }
`;var k=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};const _={USD:"$",EUR:"€",GBP:"£"},I=[100,250,500,1e3];let M=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.connected=a.AccountController.state.isConnected,this.loading=a.W3.state.loading,this.paymentCurrency=a.aG.state.paymentCurrency,this.paymentAmount=a.aG.state.paymentAmount,this.purchaseAmount=a.aG.state.purchaseAmount,this.quoteLoading=a.aG.state.quotesLoading,this.unsubscribe.push(a.AccountController.subscribeKey("isConnected",(e=>{this.connected=e})),a.W3.subscribeKey("loading",(e=>{this.loading=e})),a.aG.subscribe((e=>{this.paymentCurrency=e.paymentCurrency,this.paymentAmount=e.paymentAmount,this.purchaseAmount=e.purchaseAmount,this.quoteLoading=e.quotesLoading})))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){return l.qy`
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center">
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <w3m-onramp-input
            type="Fiat"
            @inputChange=${this.onPaymentAmountChange.bind(this)}
            .value=${this.paymentAmount||0}
          ></w3m-onramp-input>
          <w3m-onramp-input
            type="Token"
            .value=${this.purchaseAmount||0}
            .loading=${this.quoteLoading}
          ></w3m-onramp-input>
          <wui-flex justifyContent="space-evenly" class="amounts-container" gap="xs">
            ${I.map((e=>l.qy`<wui-button
                  variant=${this.paymentAmount===e?"accent":"neutral"}
                  size="md"
                  textVariant="paragraph-600"
                  fullWidth
                  @click=${()=>this.selectPresetAmount(e)}
                  >${`${_[this.paymentCurrency?.id||"USD"]} ${e}`}</wui-button
                >`))}
          </wui-flex>
          ${this.templateButton()}
        </wui-flex>
      </wui-flex>
    `}templateButton(){return this.connected?l.qy`<wui-button
          @click=${this.getQuotes.bind(this)}
          variant="main"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Get quotes
        </wui-button>`:l.qy`<wui-button
          @click=${this.openModal.bind(this)}
          variant="accent"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Connect wallet
        </wui-button>`}getQuotes(){this.loading||a.W3.open({view:"OnRampProviders"})}openModal(){a.W3.open({view:"Connect"})}async onPaymentAmountChange(e){a.aG.setPaymentAmount(Number(e.detail)),await a.aG.getQuote()}async selectPresetAmount(e){a.aG.setPaymentAmount(e),await a.aG.getQuote()}};M.styles=S,k([(0,u.MZ)({type:Boolean})],M.prototype,"disabled",void 0),k([(0,u.wk)()],M.prototype,"connected",void 0),k([(0,u.wk)()],M.prototype,"loading",void 0),k([(0,u.wk)()],M.prototype,"paymentCurrency",void 0),k([(0,u.wk)()],M.prototype,"paymentAmount",void 0),k([(0,u.wk)()],M.prototype,"purchaseAmount",void 0),k([(0,u.wk)()],M.prototype,"quoteLoading",void 0),M=k([(0,c.customElement)("w3m-onramp-widget")],M);const T=l.AH`
  wui-flex {
    width: 100%;
  }

  wui-icon-link {
    margin-right: calc(var(--wui-icon-box-size-md) * -1);
  }

  .account-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .account-links wui-flex {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background: red;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 10px;
    flex: 1 0 0;

    border-radius: var(--XS, 16px);
    border: 1px solid var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    background: var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  .account-links wui-flex:hover {
    background: var(--dark-accent-glass-015, rgba(71, 161, 255, 0.15));
  }

  .account-links wui-flex wui-icon {
    width: var(--S, 20px);
    height: var(--S, 20px);
  }

  .account-links wui-flex wui-icon svg path {
    stroke: #47a1ff;
  }
`;var P=i(2667),O=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let R=class extends l.WF{constructor(){super(),this.usubscribe=[],this.networkImages=a.jQ.state.networkImages,this.address=a.AccountController.state.address,this.profileImage=a.AccountController.state.profileImage,this.profileName=a.AccountController.state.profileName,this.network=a.NetworkController.state.caipNetwork,this.preferredAccountType=a.AccountController.state.preferredAccountType,this.disconnecting=!1,this.loading=!1,this.switched=!1,this.text="",this.usubscribe.push(a.AccountController.subscribe((e=>{e.address?(this.address=e.address,this.profileImage=e.profileImage,this.profileName=e.profileName,this.preferredAccountType=e.preferredAccountType):a.W3.close()})),a.NetworkController.subscribeKey("caipNetwork",(e=>{e?.id&&(this.network=e)})))}disconnectedCallback(){this.usubscribe.forEach((e=>e()))}render(){if(!this.address)throw new Error("w3m-account-settings-view: No account provided");const e=this.networkImages[this.network?.imageId??""];return l.qy`
      <wui-flex
        flexDirection="column"
        .padding=${["0","xl","m","xl"]}
        alignItems="center"
        gap="l"
      >
        <wui-avatar
          alt=${this.address}
          address=${this.address}
          .imageSrc=${this.profileImage||""}
        ></wui-avatar>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-flex gap="3xs" alignItems="center" justifyContent="center">
            <wui-text variant="large-600" color="fg-100" data-testid="account-settings-address">
              ${c.UiHelperUtil.getTruncateString({string:this.address,charsStart:4,charsEnd:6,truncate:"middle"})}
            </wui-text>
            <wui-icon-link
              size="md"
              icon="copy"
              iconColor="fg-200"
              @click=${this.onCopyAddress}
            ></wui-icon-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>

      <wui-flex flexDirection="column" gap="m">
        <wui-flex flexDirection="column" gap="xs" .padding=${["0","xl","m","xl"]}>
          <w3m-account-auth-button></w3m-account-auth-button>
          <wui-list-item
            .variant=${e?"image":"icon"}
            iconVariant="overlay"
            icon="networkPlaceholder"
            imageSrc=${(0,h.J)(e)}
            ?chevron=${this.isAllowedNetworkSwitch()}
            @click=${this.onNetworks.bind(this)}
            data-testid="account-switch-network-button"
          >
            <wui-text variant="paragraph-500" color="fg-100">
              ${this.network?.name??"Unknown"}
            </wui-text>
          </wui-list-item>
          ${this.togglePreferredAccountBtnTemplate()} ${this.chooseNameButtonTemplate()}
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="disconnect"
            ?chevron=${!1}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `}chooseNameButtonTemplate(){const e=a.iT.getConnectedConnector(),t=a.ConnectorController.getAuthConnector(),r=a.f.isAllowedToRegisterName();return t&&"AUTH"===e&&!this.profileName&&r?l.qy`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="id"
        iconSize="sm"
        ?chevron=${!0}
        @click=${this.onChooseName.bind(this)}
        data-testid="account-choose-name-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Choose account name </wui-text>
      </wui-list-item>
    `:null}isAllowedNetworkSwitch(){const{requestedCaipNetworks:e}=a.NetworkController.state,t=!!e&&e.length>1,r=e?.find((({id:e})=>e===this.network?.id));return t||!r}onCopyAddress(){try{this.address&&(a.wE.copyToClopboard(this.address),a.SnackController.showSuccess("Address copied"))}catch{a.SnackController.showError("Failed to copy")}}togglePreferredAccountBtnTemplate(){const e=a.NetworkController.checkIfSmartAccountEnabled(),t=a.iT.getConnectedConnector();return a.ConnectorController.getAuthConnector()&&"AUTH"===t&&e?(this.switched||(this.text=this.preferredAccountType===P.Vl.ACCOUNT_TYPES.SMART_ACCOUNT?"Switch to your EOA":"Switch to your smart account"),l.qy`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="swapHorizontalBold"
        iconSize="sm"
        ?chevron=${!0}
        ?loading=${this.loading}
        @click=${this.changePreferredAccountType.bind(this)}
        data-testid="account-toggle-preferred-account-type"
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>
      </wui-list-item>
    `):null}onChooseName(){a.RouterController.push("ChooseAccountName")}async changePreferredAccountType(){const e=a.NetworkController.checkIfSmartAccountEnabled(),t=this.preferredAccountType!==P.Vl.ACCOUNT_TYPES.SMART_ACCOUNT&&e?P.Vl.ACCOUNT_TYPES.SMART_ACCOUNT:P.Vl.ACCOUNT_TYPES.EOA,r=a.ConnectorController.getAuthConnector();r&&(this.loading=!0,a.W3.setLoading(!0),await(r?.provider.setPreferredAccount(t)),await a.ConnectionController.reconnectExternal(r),a.W3.setLoading(!1),this.text=t===P.Vl.ACCOUNT_TYPES.SMART_ACCOUNT?"Switch to your EOA":"Switch to your smart account",this.switched=!0,a.Rv.resetSend(),this.loading=!1,this.requestUpdate())}onNetworks(){this.isAllowedNetworkSwitch()&&a.RouterController.push("Networks")}async onDisconnect(){try{this.disconnecting=!0,await a.ConnectionController.disconnect(),a.En.sendEvent({type:"track",event:"DISCONNECT_SUCCESS"}),a.W3.close()}catch{a.En.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),a.SnackController.showError("Failed to disconnect")}finally{this.disconnecting=!1}}};R.styles=T,O([(0,u.wk)()],R.prototype,"address",void 0),O([(0,u.wk)()],R.prototype,"profileImage",void 0),O([(0,u.wk)()],R.prototype,"profileName",void 0),O([(0,u.wk)()],R.prototype,"network",void 0),O([(0,u.wk)()],R.prototype,"preferredAccountType",void 0),O([(0,u.wk)()],R.prototype,"disconnecting",void 0),O([(0,u.wk)()],R.prototype,"loading",void 0),O([(0,u.wk)()],R.prototype,"switched",void 0),O([(0,u.wk)()],R.prototype,"text",void 0),R=O([(0,c.customElement)("w3m-account-settings-view")],R);let N=class extends l.WF{render(){const e=a.iT.getConnectedConnector();return l.qy`
      ${a.OptionsController.state.enableWalletFeatures&&"AUTH"===e?this.walletFeaturesTemplate():this.defaultTemplate()}
    `}walletFeaturesTemplate(){return l.qy`<w3m-account-wallet-features-widget></w3m-account-wallet-features-widget>`}defaultTemplate(){return l.qy`<w3m-account-default-widget></w3m-account-default-widget>`}};N=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-account-view")],N);var B=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let U=class extends l.WF{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=a.wE.debounce((e=>{this.search=e}))}render(){const e=this.search.length>=2;return l.qy`
      <wui-flex .padding=${["0","s","s","s"]} gap="s">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e?l.qy`<w3m-all-wallets-search query=${this.search}></w3m-all-wallets-search>`:l.qy`<w3m-all-wallets-list></w3m-all-wallets-list>`}
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}qrButtonTemplate(){return a.wE.isMobile()?l.qy`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){a.RouterController.push("ConnectingWalletConnect")}};B([(0,u.wk)()],U.prototype,"search",void 0),U=B([(0,c.customElement)("w3m-all-wallets-view")],U);const D=l.AH`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-visual {
    width: var(--wui-wallet-image-size-lg);
    height: var(--wui-wallet-image-size-lg);
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    position: relative;
    overflow: hidden;
  }

  wui-visual::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity var(--wui-ease-out-power-2) var(--wui-duration-lg),
      transform var(--wui-ease-out-power-2) var(--wui-duration-lg);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  wui-link {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
  }
`;var L=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let F=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.selectedOnRampProvider=a.aG.state.selectedProvider,this.uri=a.ConnectionController.state.wcUri,this.ready=!1,this.showRetry=!1,this.buffering=!1,this.error=!1,this.startTime=null,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(a.aG.subscribeKey("selectedProvider",(e=>{this.selectedOnRampProvider=e}))),this.watchTransactions()}disconnectedCallback(){this.intervalId&&clearInterval(this.intervalId)}render(){let e="Continue in external window";this.error?e="Buy failed":this.selectedOnRampProvider&&(e=`Buy in ${this.selectedOnRampProvider?.label}`);const t=this.error?"Buy can be declined from your side or due to and error on the provider app":"We’ll notify you once your Buy is processed";return l.qy`
      <wui-flex
        data-error=${(0,h.J)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-visual
            name=${(0,h.J)(this.selectedOnRampProvider?.name)}
            size="lg"
            class="provider-image"
          >
          </wui-visual>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error?"error-100":"fg-100"}>
            ${e}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${t}</wui-text>
        </wui-flex>

        ${this.error?this.tryAgainTemplate():null}
      </wui-flex>

      <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
        <wui-link @click=${this.onCopyUri} color="fg-200">
          <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
          Copy link
        </wui-link>
      </wui-flex>
    `}watchTransactions(){this.selectedOnRampProvider&&"coinbase"===this.selectedOnRampProvider.name&&(this.startTime=Date.now(),this.initializeCoinbaseTransactions())}async initializeCoinbaseTransactions(){await this.watchCoinbaseTransactions(),this.intervalId=setInterval((()=>this.watchCoinbaseTransactions()),4e3)}async watchCoinbaseTransactions(){try{const e=a.AccountController.state.address,t=a.OptionsController.state.projectId;if(!e)throw new Error("No address found");(await a.TP.fetchTransactions({account:e,onramp:"coinbase",projectId:t})).data.filter((e=>new Date(e.metadata.minedAt)>new Date(this.startTime)||"ONRAMP_TRANSACTION_STATUS_IN_PROGRESS"===e.metadata.status)).length?(clearInterval(this.intervalId),a.RouterController.replace("OnRampActivity")):this.startTime&&Date.now()-this.startTime>=18e4&&(clearInterval(this.intervalId),this.error=!0)}catch(e){a.SnackController.showError(e)}}onTryAgain(){this.selectedOnRampProvider&&(this.error=!1,a.wE.openHref(this.selectedOnRampProvider.url,"popupWindow","width=600,height=800,scrollbars=yes"))}tryAgainTemplate(){return this.selectedOnRampProvider?.url?l.qy`<wui-button size="md" variant="accent" @click=${this.onTryAgain.bind(this)}>
      <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
      Try again
    </wui-button>`:null}loaderTemplate(){const e=a.ThemeController.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return l.qy`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}onCopyUri(){if(!this.selectedOnRampProvider?.url)return a.SnackController.showError("No link found"),void a.RouterController.goBack();try{a.wE.copyToClopboard(this.selectedOnRampProvider.url),a.SnackController.showSuccess("Link copied")}catch{a.SnackController.showError("Failed to copy")}}};F.styles=D,L([(0,u.wk)()],F.prototype,"intervalId",void 0),L([(0,u.wk)()],F.prototype,"selectedOnRampProvider",void 0),L([(0,u.wk)()],F.prototype,"uri",void 0),L([(0,u.wk)()],F.prototype,"ready",void 0),L([(0,u.wk)()],F.prototype,"showRetry",void 0),L([(0,u.wk)()],F.prototype,"buffering",void 0),L([(0,u.wk)()],F.prototype,"error",void 0),L([(0,u.wk)()],F.prototype,"startTime",void 0),L([(0,u.MZ)({type:Boolean})],F.prototype,"isMobile",void 0),L([(0,u.MZ)()],F.prototype,"onRetry",void 0),F=L([(0,c.customElement)("w3m-buy-in-progress-view")],F);const j=l.AH`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }

  .all-wallets {
    flex-flow: column;
  }
`;var H=i(4290),z=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let q=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.connectors=a.ConnectorController.state.connectors,this.unsubscribe.push(a.ConnectorController.subscribeKey("connectors",(e=>this.connectors=e)))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){return l.qy`
      <wui-flex flexDirection="column" .padding=${["3xs","s","s","s"]}>
        <w3m-email-login-widget></w3m-email-login-widget>
        <w3m-social-login-widget></w3m-social-login-widget>
        ${this.walletListTemplate()}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}walletListTemplate(){const e=this.connectors.find((e=>"AUTH"===e.type));return e?.socials?e?.showWallets?l.qy`
          <wui-flex flexDirection="column" gap="xs" .margin=${["xs","0","0","0"]}>
            <w3m-connect-walletconnect-widget></w3m-connect-walletconnect-widget>
            <w3m-connect-recent-widget></w3m-connect-recent-widget>
            <w3m-connect-announced-widget></w3m-connect-announced-widget>
            <w3m-connect-injected-widget></w3m-connect-injected-widget>
            <w3m-connect-coinbase-widget></w3m-connect-coinbase-widget>
            <w3m-connect-custom-widget></w3m-connect-custom-widget>
            <w3m-connect-recommended-widget></w3m-connect-recommended-widget>
            <wui-flex class="all-wallets" .margin=${["xs","0","0","0"]}>
              <w3m-all-wallets-widget></w3m-all-wallets-widget>
            </wui-flex>
          </wui-flex>
        `:l.qy` <wui-list-button
        @click=${this.onContinueWalletClick.bind(this)}
        text="Continue with a wallet"
      ></wui-list-button>`:l.qy`<w3m-wallet-login-list></w3m-wallet-login-list>`}onContinueWalletClick(){a.RouterController.push("ConnectWallets")}};q.styles=j,z([(0,H.w)()],q.prototype,"connectors",void 0),q=z([(0,c.customElement)("w3m-connect-view")],q);const $=l.AH`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`;var W=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};class G extends l.WF{constructor(){super(),this.wallet=a.RouterController.state.data?.wallet,this.connector=a.RouterController.state.data?.connector,this.timeout=void 0,this.secondaryBtnLabel="Try again",this.secondaryBtnIcon="refresh",this.secondaryLabel="Accept connection request in the wallet",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=a.$m.getWalletImage(this.wallet)??a.$m.getConnectorImage(this.connector),this.name=this.wallet?.name??this.connector?.name??"Wallet",this.isRetrying=!1,this.uri=a.ConnectionController.state.wcUri,this.error=a.ConnectionController.state.wcError,this.ready=!1,this.showRetry=!1,this.buffering=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(a.ConnectionController.subscribeKey("wcUri",(e=>{this.uri=e,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())})),a.ConnectionController.subscribeKey("wcError",(e=>this.error=e)),a.ConnectionController.subscribeKey("buffering",(e=>this.buffering=e)))}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach((e=>e())),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();const e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel;let t=`Continue in ${this.name}`;return this.buffering&&(t="Connecting..."),this.error&&(t="Connection declined"),l.qy`
      <wui-flex
        data-error=${(0,h.J)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${(0,h.J)(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error?"error-100":"fg-100"}>
            ${t}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${e}</wui-text>
        </wui-flex>

        <wui-button
          variant="accent"
          size="md"
          ?disabled=${!this.error&&this.buffering}
          @click=${this.onTryAgain.bind(this)}
        >
          <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
          ${this.secondaryBtnLabel}
        </wui-button>
      </wui-flex>

      ${this.isWalletConnect?l.qy`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){if(this.error&&!this.showRetry){this.showRetry=!0;const e=this.shadowRoot?.querySelector("wui-button");e?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onTryAgain(){this.buffering||(a.ConnectionController.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.())}loaderTemplate(){const e=a.ThemeController.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return l.qy`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(a.wE.copyToClopboard(this.uri),a.SnackController.showSuccess("Link copied"))}catch{a.SnackController.showError("Failed to copy")}}}G.styles=$,W([(0,u.wk)()],G.prototype,"uri",void 0),W([(0,u.wk)()],G.prototype,"error",void 0),W([(0,u.wk)()],G.prototype,"ready",void 0),W([(0,u.wk)()],G.prototype,"showRetry",void 0),W([(0,u.wk)()],G.prototype,"buffering",void 0),W([(0,u.MZ)({type:Boolean})],G.prototype,"isMobile",void 0),W([(0,u.MZ)()],G.prototype,"onRetry",void 0);let V=class extends G{constructor(){if(super(),!this.connector)throw new Error("w3m-connecting-view: No connector provided");a.En.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.connector.name??"Unknown",platform:"browser"}}),this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),this.isWalletConnect=!1}async onConnectProxy(){try{this.error=!1,this.connector&&(this.connector.imageUrl&&a.iT.setConnectedWalletImageUrl(this.connector.imageUrl),await a.ConnectionController.connectExternal(this.connector),a.OptionsController.state.isSiweEnabled?a.RouterController.push("ConnectingSiwe"):a.W3.close(),a.En.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.connector.name||"Unknown"}}))}catch(e){a.En.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),this.error=!0}}};V=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-connecting-external-view")],V);var K=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Z=class extends l.WF{constructor(){super(),this.interval=void 0,this.lastRetry=Date.now(),this.wallet=a.RouterController.state.data?.wallet,this.platform=void 0,this.platforms=[],this.initializeConnection(),this.interval=setInterval(this.initializeConnection.bind(this),a.oU.TEN_SEC_MS)}disconnectedCallback(){clearTimeout(this.interval)}render(){return this.wallet?(this.determinePlatforms(),l.qy`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
    `):l.qy`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`}async initializeConnection(e=!1){try{const{wcPairingExpiry:t}=a.ConnectionController.state;if(e||a.wE.isPairingExpired(t)){if(a.ConnectionController.connectWalletConnect(),this.wallet){const e=a.$m.getWalletImage(this.wallet);e&&a.iT.setConnectedWalletImageUrl(e)}else{const e=a.ConnectorController.state.connectors.find((e=>"WALLET_CONNECT"===e.type)),t=a.$m.getConnectorImage(e);t&&a.iT.setConnectedWalletImageUrl(t)}if(await a.ConnectionController.state.wcPromise,this.finalizeConnection(),a.OptionsController.state.isSiweEnabled){const{SIWEController:e}=await Promise.resolve().then(i.bind(i,8251));"success"===e.state.status?a.W3.close():a.RouterController.push("ConnectingSiwe")}else a.W3.close()}}catch(e){a.En.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),a.ConnectionController.setWcError(!0),a.wE.isAllowedRetry(this.lastRetry)&&(a.SnackController.showError("Declined"),this.lastRetry=Date.now(),this.initializeConnection(!0))}}finalizeConnection(){const{wcLinking:e,recentWallet:t}=a.ConnectionController.state;e&&a.iT.setWalletConnectDeepLink(e),t&&a.iT.setWeb3ModalRecent(t),a.En.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:e?"mobile":"qrcode",name:this.wallet?.name||"Unknown"}})}determinePlatforms(){if(!this.wallet)throw new Error("w3m-connecting-wc-view:determinePlatforms No wallet");if(this.platform)return;const{mobile_link:e,desktop_link:t,webapp_link:r,injected:n,rdns:i}=this.wallet,s=n?.map((({injected_id:e})=>e)).filter(Boolean),o=i?[i]:s??[],c=o.length,l=e,u=r,h=a.ConnectionController.checkInstalled(o),d=c&&h,f=t&&!a.wE.isMobile();d&&this.platforms.push("browser"),l&&this.platforms.push(a.wE.isMobile()?"mobile":"qrcode"),u&&this.platforms.push("web"),f&&this.platforms.push("desktop"),!d&&c&&this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return l.qy`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"desktop":return l.qy`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"web":return l.qy`
          <w3m-connecting-wc-web .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-web>
        `;case"mobile":return l.qy`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return l.qy`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return l.qy`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?l.qy`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){const t=this.shadowRoot?.querySelector("div");t&&(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=e,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};K([(0,u.wk)()],Z.prototype,"platform",void 0),K([(0,u.wk)()],Z.prototype,"platforms",void 0),Z=K([(0,c.customElement)("w3m-connecting-wc-view")],Z);const Q=l.AH`
  .continue-button-container {
    width: 100%;
  }
`;var J=i(8917),Y=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let X=class extends l.WF{constructor(){super(...arguments),this.loading=!1}render(){return l.qy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${["0","0","l","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{a.wE.openHref(J.TC.URLS.FAQ,"_blank")}}
        >
          Learn more about names
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `}onboardingTemplate(){return l.qy` <wui-flex
      flexDirection="column"
      gap="xxl"
      alignItems="center"
      .padding=${["0","xxl","0","xxl"]}
    >
      <wui-flex gap="s" alignItems="center" justifyContent="center">
        <wui-icon-box
          icon="id"
          size="xl"
          iconSize="xxl"
          iconColor="fg-200"
          backgroundColor="fg-200"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Choose your account name
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          Finally say goodbye to 0x addresses, name your account to make it easier to exchange
          assets
        </wui-text>
      </wui-flex>
    </wui-flex>`}buttonsTemplate(){return l.qy`<wui-flex
      .padding=${["0","2l","0","2l"]}
      gap="s"
      class="continue-button-container"
    >
      <wui-button
        fullWidth
        .loading=${this.loading}
        size="lg"
        borderRadius="xs"
        @click=${()=>a.RouterController.push("RegisterAccountName")}
        >Choose name
      </wui-button>
    </wui-flex>`}};X.styles=Q,Y([(0,u.wk)()],X.prototype,"loading",void 0),X=Y([(0,c.customElement)("w3m-choose-account-name-view")],X);let ee=class extends l.WF{constructor(){super(...arguments),this.wallet=a.RouterController.state.data?.wallet}render(){if(!this.wallet)throw new Error("w3m-downloads-view");return l.qy`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?l.qy`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?l.qy`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?l.qy`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?l.qy`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){this.wallet?.chrome_store&&a.wE.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){this.wallet?.app_store&&a.wE.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&a.wE.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&a.wE.openHref(this.wallet.homepage,"_blank")}};ee=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-downloads-view")],ee);let te=class extends l.WF{render(){return l.qy`
      <wui-flex flexDirection="column" .padding=${["0","s","s","s"]} gap="xs">
        ${this.recommendedWalletsTemplate()}
        <wui-list-wallet
          name="Explore all"
          showAllWallets
          walletIcon="allWallets"
          icon="externalLink"
          @click=${()=>{a.wE.openHref("https://walletconnect.com/explorer?type=wallet","_blank")}}
        ></wui-list-wallet>
      </wui-flex>
    `}recommendedWalletsTemplate(){const{recommended:e,featured:t}=a.ApiController.state,{customWallets:r}=a.OptionsController.state;return[...t,...r??[],...e].slice(0,4).map((e=>l.qy`
        <wui-list-wallet
          name=${e.name??"Unknown"}
          tagVariant="main"
          imageSrc=${(0,h.J)(a.$m.getWalletImage(e))}
          @click=${()=>{a.wE.openHref(e.homepage??"https://walletconnect.com/explorer","_blank")}}
        ></wui-list-wallet>
      `))}};te=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-get-wallet-view")],te);const re=l.AH`
  wui-flex {
    width: 100%;
  }

  .suggestion {
    background: var(--wui-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  .suggestion:hover {
    background-color: var(--wui-gray-glass-005);
    cursor: pointer;
  }

  .suggested-name {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  form {
    width: 100%;
  }

  wui-icon-link {
    position: absolute;
    right: 20px;
    transform: translateY(11px);
  }
`;var ne=i(8342),ie=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let se=class extends l.WF{constructor(){super(),this.formRef=(0,ne._)(),this.usubscribe=[],this.name="",this.error="",this.loading=a.f.state.loading,this.suggestions=a.f.state.suggestions,this.registered=!1,this.onDebouncedNameInputChange=a.wE.debounce((e=>{a.f.validateName(e)?(this.error="",this.name=e,a.f.getSuggestions(e),a.f.isNameRegistered(e).then((e=>{this.registered=e}))):e.length<4?this.error="Name must be at least 4 characters long":this.error="Can only contain letters, numbers and - characters"})),this.usubscribe.push(a.f.subscribe((e=>{this.suggestions=e.suggestions,this.loading=e.loading})))}firstUpdated(){this.formRef.value?.addEventListener("keydown",this.onEnterKey.bind(this))}disconnectedCallback(){super.disconnectedCallback(),this.usubscribe.forEach((e=>e())),this.formRef.value?.removeEventListener("keydown",this.onEnterKey.bind(this))}render(){return l.qy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="m"
        .padding=${["0","s","m","s"]}
      >
        <form ${(0,ne.K)(this.formRef)} @submit=${this.onSubmitName.bind(this)}>
          <wui-ens-input
            @inputChange=${this.onNameInputChange.bind(this)}
            .errorMessage=${this.error}
            .value=${this.name}
          >
          </wui-ens-input>
          ${this.submitButtonTemplate()}
          <input type="submit" hidden />
        </form>
        ${this.templateSuggestions()}
      </wui-flex>
    `}submitButtonTemplate(){return this.isAllowedToSubmit()?l.qy`
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitName.bind(this)}
          >
          </wui-icon-link>
        `:null}onSelectSuggestion(e){return()=>{this.name=e,this.registered=!1,this.requestUpdate()}}onNameInputChange(e){this.onDebouncedNameInputChange(e.detail)}nameSuggestionTagTemplate(){return this.loading?l.qy`<wui-loading-spinner size="lg" color="fg-100"></wui-loading-spinner>`:this.registered?l.qy`<wui-tag variant="shade" size="lg">Registered</wui-tag>`:l.qy`<wui-tag variant="success" size="lg">Available</wui-tag>`}templateSuggestions(){if(!this.name||this.name.length<4||this.error)return null;const e=this.registered?this.suggestions.filter((e=>e.name!==this.name)):[];return l.qy`<wui-flex flexDirection="column" gap="xxs" alignItems="center">
      <wui-flex
        .padding=${["m","m","m","m"]}
        justifyContent="space-between"
        class="suggestion"
      >
        <wui-text color="fg-100" variant="paragraph-400" class="suggested-name">
          ${this.name}</wui-text
        >${this.nameSuggestionTagTemplate()}
      </wui-flex>
      ${e.map((e=>this.availableNameTemplate(e.name)))}
    </wui-flex>`}availableNameTemplate(e){return l.qy` <wui-flex
      .padding=${["m","m","m","m"]}
      justifyContent="space-between"
      class="suggestion"
      @click=${this.onSelectSuggestion(e)}
    >
      <wui-text color="fg-100" variant="paragraph-400" class="suggested-name">
        ${e}
      </wui-text>
      <wui-tag variant="success" size="lg">Available</wui-tag>
    </wui-flex>`}isAllowedToSubmit(){return!this.loading&&!this.registered&&!this.error&&a.f.validateName(this.name)}async onSubmitName(){try{if(!this.isAllowedToSubmit())return;await a.f.registerName(this.name)}catch(e){a.SnackController.showError(e.message)}}onEnterKey(e){"Enter"===e.key&&this.isAllowedToSubmit()&&this.onSubmitName()}};se.styles=re,ie([(0,u.MZ)()],se.prototype,"errorMessage",void 0),ie([(0,u.wk)()],se.prototype,"name",void 0),ie([(0,u.wk)()],se.prototype,"error",void 0),ie([(0,u.wk)()],se.prototype,"loading",void 0),ie([(0,u.wk)()],se.prototype,"suggestions",void 0),ie([(0,u.wk)()],se.prototype,"registered",void 0),se=ie([(0,c.customElement)("w3m-register-account-name-view")],se);const oe=l.AH`
  .continue-button-container {
    width: 100%;
  }
`;let ae=class extends l.WF{render(){return l.qy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${["0","0","l","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{a.wE.openHref(J.TC.URLS.FAQ,"_blank")}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `}onboardingTemplate(){return l.qy` <wui-flex
      flexDirection="column"
      gap="xxl"
      alignItems="center"
      .padding=${["0","xxl","0","xxl"]}
    >
      <wui-flex gap="s" alignItems="center" justifyContent="center">
        <wui-icon-box
          size="xl"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Account name chosen successfully
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          You can now fund your account and trade crypto
        </wui-text>
      </wui-flex>
    </wui-flex>`}buttonsTemplate(){return l.qy`<wui-flex
      .padding=${["0","2l","0","2l"]}
      gap="s"
      class="continue-button-container"
    >
      <wui-button fullWidth size="lg" borderRadius="xs" @click=${this.redirectToAccount.bind(this)}
        >Let's Go!
      </wui-button>
    </wui-flex>`}redirectToAccount(){a.RouterController.replace("Account")}};ae.styles=oe,ae=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-register-account-name-success-view")],ae);const ce=l.AH`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: 4px;
    bottom: 0;
    opacity: 0;
    transform: scale(0.5);
    z-index: 1;
  }

  wui-button {
    display: none;
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  wui-button[data-retry='true'] {
    display: block;
    opacity: 1;
  }
`;var le=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let ue=class extends l.WF{constructor(){super(),this.network=a.RouterController.state.data?.network,this.unsubscribe=[],this.showRetry=!1,this.error=!1}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}firstUpdated(){this.onSwitchNetwork()}render(){if(!this.network)throw new Error("w3m-network-switch-view: No network provided");this.onShowRetry();const e=this.getLabel(),t=this.getSubLabel();return l.qy`
      <wui-flex
        data-error=${this.error}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","3xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-network-image
            size="lg"
            imageSrc=${(0,h.J)(a.$m.getNetworkImage(this.network))}
          ></wui-network-image>

          ${this.error?null:l.qy`<wui-loading-hexagon></wui-loading-hexagon>`}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            ?border=${!0}
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">${e}</wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${t}</wui-text>
        </wui-flex>

        <wui-button
          data-retry=${this.showRetry}
          variant="accent"
          size="md"
          .disabled=${!this.error}
          @click=${this.onSwitchNetwork.bind(this)}
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try again
        </wui-button>
      </wui-flex>
    `}getSubLabel(){const e=a.iT.getConnectedConnector();return a.ConnectorController.getAuthConnector()&&"AUTH"===e?"":this.error?"Switch can be declined if chain is not supported by a wallet or previous request is still active":"Accept connection request in your wallet"}getLabel(){const e=a.iT.getConnectedConnector();return a.ConnectorController.getAuthConnector()&&"AUTH"===e?`Switching to ${this.network?.name??"Unknown"} network...`:this.error?"Switch declined":"Approve in wallet"}onShowRetry(){if(this.error&&!this.showRetry){this.showRetry=!0;const e=this.shadowRoot?.querySelector("wui-button");e?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}async onSwitchNetwork(){try{this.error=!1,this.network&&(await a.NetworkController.switchActiveNetwork(this.network),a.OptionsController.state.isSiweEnabled||a.aS.navigateAfterNetworkSwitch())}catch{this.error=!0}}};ue.styles=ce,le([(0,u.wk)()],ue.prototype,"showRetry",void 0),le([(0,u.wk)()],ue.prototype,"error",void 0),ue=le([(0,c.customElement)("w3m-network-switch-view")],ue);const he=l.AH`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }
`;var de=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let fe=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.caipNetwork=a.NetworkController.state.caipNetwork,this.unsubscribe.push(a.NetworkController.subscribeKey("caipNetwork",(e=>this.caipNetwork=e)))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){return l.qy`
      <wui-grid padding="s" gridTemplateColumns="repeat(4, 1fr)" rowGap="l" columnGap="xs">
        ${this.networksTemplate()}
      </wui-grid>

      <wui-separator></wui-separator>

      <wui-flex padding="s" flexDirection="column" gap="m" alignItems="center">
        <wui-text variant="small-400" color="fg-300" align="center">
          Your connected wallet may not support some of the networks available for this dApp
        </wui-text>
        <wui-link @click=${this.onNetworkHelp.bind(this)}>
          <wui-icon size="xs" color="accent-100" slot="iconLeft" name="helpCircle"></wui-icon>
          What is a network
        </wui-link>
      </wui-flex>
    `}onNetworkHelp(){a.En.sendEvent({type:"track",event:"CLICK_NETWORK_HELP"}),a.RouterController.push("WhatIsANetwork")}networksTemplate(){const{approvedCaipNetworkIds:e,requestedCaipNetworks:t,supportsAllNetworks:r}=a.NetworkController.state,n=a.wE.sortRequestedNetworks(e,t);return n?.map((t=>l.qy`
        <wui-card-select
          .selected=${this.caipNetwork?.id===t.id}
          imageSrc=${(0,h.J)(a.$m.getNetworkImage(t))}
          type="network"
          name=${t.name??t.id}
          @click=${()=>this.onSwitchNetwork(t)}
          .disabled=${!r&&!e?.includes(t.id)}
          data-testid=${`w3m-network-switch-${t.name??t.id}`}
        ></wui-card-select>
      `))}async onSwitchNetwork(e){const{isConnected:t}=a.AccountController.state,{approvedCaipNetworkIds:r,supportsAllNetworks:n,caipNetwork:i}=a.NetworkController.state,{data:s}=a.RouterController.state;t&&i?.id!==e.id?r?.includes(e.id)?(await a.NetworkController.switchActiveNetwork(e),a.aS.navigateAfterNetworkSwitch()):n&&a.RouterController.push("SwitchNetwork",{...s,network:e}):t||(a.NetworkController.setCaipNetwork(e),a.RouterController.push("Connect"))}};fe.styles=he,de([(0,u.wk)()],fe.prototype,"caipNetwork",void 0),fe=de([(0,c.customElement)("w3m-networks-view")],fe);const pe=l.AH`
  :host > wui-flex {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    padding: var(--wui-spacing-m);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }

  :host > wui-flex > wui-flex {
    width: 100%;
  }

  wui-transaction-list-item-loader {
    width: 100%;
  }
`;var ge=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let me=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.selectedOnRampProvider=a.aG.state.selectedProvider,this.loading=!1,this.coinbaseTransactions=a.WC.state.coinbaseTransactions,this.tokenImages=a.jQ.state.tokenImages,this.unsubscribe.push(a.aG.subscribeKey("selectedProvider",(e=>{this.selectedOnRampProvider=e})),a.jQ.subscribeKey("tokenImages",(e=>this.tokenImages=e)),(()=>{clearTimeout(this.refetchTimeout)}),a.WC.subscribe((e=>{this.coinbaseTransactions={...e.coinbaseTransactions}}))),a.WC.clearCursor(),this.fetchTransactions()}render(){return l.qy`
      <wui-flex flexDirection="column" .padding=${["0","s","s","s"]} gap="xs">
        ${this.loading?this.templateLoading():this.templateTransactionsByYear()}
      </wui-flex>
    `}templateTransactions(e){return e?.map((e=>{const t=J.rL.formatDate(e?.metadata?.minedAt),r=e.transfers[0],n=r?.fungible_info;if(!n)return null;const i=n?.icon?.url||this.tokenImages?.[n.symbol||""];return l.qy`
        <wui-onramp-activity-item
          label="Bought"
          .completed=${"ONRAMP_TRANSACTION_STATUS_SUCCESS"===e.metadata.status}
          .inProgress=${"ONRAMP_TRANSACTION_STATUS_IN_PROGRESS"===e.metadata.status}
          .failed=${"ONRAMP_TRANSACTION_STATUS_FAILED"===e.metadata.status}
          purchaseCurrency=${(0,h.J)(n.symbol)}
          purchaseValue=${r.quantity.numeric}
          date=${t}
          icon=${(0,h.J)(i)}
          symbol=${(0,h.J)(n.symbol)}
        ></wui-onramp-activity-item>
      `}))}templateTransactionsByYear(){return Object.keys(this.coinbaseTransactions).sort().reverse().map((e=>{const t=parseInt(e,10);return new Array(12).fill(null).map(((e,t)=>t)).reverse().map((e=>{const r=c.TransactionUtil.getTransactionGroupTitle(t,e),n=this.coinbaseTransactions[t]?.[e];return n?l.qy`
          <wui-flex flexDirection="column">
            <wui-flex
              alignItems="center"
              flexDirection="row"
              .padding=${["xs","s","s","s"]}
            >
              <wui-text variant="paragraph-500" color="fg-200">${r}</wui-text>
            </wui-flex>
            <wui-flex flexDirection="column" gap="xs">
              ${this.templateTransactions(n)}
            </wui-flex>
          </wui-flex>
        `:null}))}))}async fetchTransactions(){await this.fetchCoinbaseTransactions()}async fetchCoinbaseTransactions(){const e=a.AccountController.state.address,t=a.OptionsController.state.projectId;if(!e)throw new Error("No address found");if(!t)throw new Error("No projectId found");this.loading=!0,await a.WC.fetchTransactions(e,"coinbase"),this.loading=!1,this.refetchLoadingTransactions()}refetchLoadingTransactions(){const e=new Date;0!==(this.coinbaseTransactions[e.getFullYear()]?.[e.getMonth()]||[]).filter((e=>"ONRAMP_TRANSACTION_STATUS_IN_PROGRESS"===e.metadata.status)).length?this.refetchTimeout=setTimeout((async()=>{const e=a.AccountController.state.address;await a.WC.fetchTransactions(e,"coinbase"),this.refetchLoadingTransactions()}),3e3):clearTimeout(this.refetchTimeout)}templateLoading(){return Array(7).fill(l.qy` <wui-transaction-list-item-loader></wui-transaction-list-item-loader> `).map((e=>e))}};me.styles=pe,ge([(0,u.wk)()],me.prototype,"selectedOnRampProvider",void 0),ge([(0,u.wk)()],me.prototype,"loading",void 0),ge([(0,u.wk)()],me.prototype,"coinbaseTransactions",void 0),ge([(0,u.wk)()],me.prototype,"tokenImages",void 0),me=ge([(0,c.customElement)("w3m-onramp-activity-view")],me);const ye=l.AH`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }
`;var we=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let be=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.selectedCurrency=a.aG.state.paymentCurrency,this.currencies=a.aG.state.paymentCurrencies,this.currencyImages=a.jQ.state.currencyImages,this.unsubscribe.push(a.aG.subscribe((e=>{this.selectedCurrency=e.paymentCurrency,this.currencies=e.paymentCurrencies})),a.jQ.subscribeKey("currencyImages",(e=>this.currencyImages=e)))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){return l.qy`
      <wui-flex flexDirection="column" .padding=${["0","s","s","s"]} gap="xs">
        ${this.currenciesTemplate()}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}currenciesTemplate(){return this.currencies.map((e=>l.qy`
        <wui-list-item
          imageSrc=${(0,h.J)(this.currencyImages?.[e.id])}
          @click=${()=>this.selectCurrency(e)}
          variant="image"
        >
          <wui-text variant="paragraph-500" color="fg-100">${e.id}</wui-text>
        </wui-list-item>
      `))}selectCurrency(e){e&&(a.aG.setPaymentCurrency(e),a.W3.close())}};be.styles=ye,we([(0,u.wk)()],be.prototype,"selectedCurrency",void 0),we([(0,u.wk)()],be.prototype,"currencies",void 0),we([(0,u.wk)()],be.prototype,"currencyImages",void 0),be=we([(0,c.customElement)("w3m-onramp-fiat-select-view")],be);var ve=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Ae=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.providers=a.aG.state.providers,this.unsubscribe.push(a.aG.subscribeKey("providers",(e=>{this.providers=e})))}firstUpdated(){const e=this.providers.map((async e=>"coinbase"===e.name?await this.getCoinbaseOnRampURL():Promise.resolve(e?.url)));Promise.all(e).then((e=>{this.providers=this.providers.map(((t,r)=>({...t,url:e[r]||""})))}))}render(){return l.qy`
      <wui-flex flexDirection="column" .padding=${["0","s","s","s"]} gap="xs">
        ${this.onRampProvidersTemplate()}
      </wui-flex>
      <w3m-onramp-providers-footer></w3m-onramp-providers-footer>
    `}onRampProvidersTemplate(){return this.providers.map((e=>l.qy`
        <wui-onramp-provider-item
          label=${e.label}
          name=${e.name}
          feeRange=${e.feeRange}
          @click=${()=>{this.onClickProvider(e)}}
          ?disabled=${!e.url}
        ></wui-onramp-provider-item>
      `))}onClickProvider(e){a.aG.setSelectedProvider(e),a.RouterController.push("BuyInProgress"),a.wE.openHref(e.url,"popupWindow","width=600,height=800,scrollbars=yes")}async getCoinbaseOnRampURL(){const e=a.AccountController.state.address,t=a.NetworkController.state.caipNetwork;if(!e)throw new Error("No address found");if(!t?.name)throw new Error("No network found");const r=a.oU.WC_COINBASE_PAY_SDK_CHAIN_NAME_MAP[t.name]??a.oU.WC_COINBASE_PAY_SDK_FALLBACK_CHAIN,n=a.aG.state.purchaseCurrency,i=n?[n.symbol]:a.aG.state.purchaseCurrencies.map((e=>e.symbol));return await a.TP.generateOnRampURL({defaultNetwork:r,destinationWallets:[{address:e,blockchains:a.oU.WC_COINBASE_PAY_SDK_CHAINS,assets:i}],partnerUserId:e,purchaseAmount:a.aG.state.purchaseAmount})}};ve([(0,u.wk)()],Ae.prototype,"providers",void 0),Ae=ve([(0,c.customElement)("w3m-onramp-providers-view")],Ae);const Ee=l.AH`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }
`;var xe=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Ce=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.selectedCurrency=a.aG.state.purchaseCurrencies,this.tokens=a.aG.state.purchaseCurrencies,this.tokenImages=a.jQ.state.tokenImages,this.unsubscribe.push(a.aG.subscribe((e=>{this.selectedCurrency=e.purchaseCurrencies,this.tokens=e.purchaseCurrencies})),a.jQ.subscribeKey("tokenImages",(e=>this.tokenImages=e)))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){return l.qy`
      <wui-flex flexDirection="column" .padding=${["0","s","s","s"]} gap="xs">
        ${this.currenciesTemplate()}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}currenciesTemplate(){return this.tokens.map((e=>l.qy`
        <wui-list-item
          imageSrc=${(0,h.J)(this.tokenImages?.[e.symbol])}
          @click=${()=>this.selectToken(e)}
          variant="image"
        >
          <wui-flex gap="3xs" alignItems="center">
            <wui-text variant="paragraph-500" color="fg-100">${e.name}</wui-text>
            <wui-text variant="small-400" color="fg-200">${e.symbol}</wui-text>
          </wui-flex>
        </wui-list-item>
      `))}selectToken(e){e&&(a.aG.setPurchaseCurrency(e),a.W3.close())}};Ce.styles=Ee,xe([(0,u.wk)()],Ce.prototype,"selectedCurrency",void 0),xe([(0,u.wk)()],Ce.prototype,"tokens",void 0),xe([(0,u.wk)()],Ce.prototype,"tokenImages",void 0),Ce=xe([(0,c.customElement)("w3m-onramp-token-select-view")],Ce);const Se=l.AH`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .action-button {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
  }

  .action-button:disabled {
    border-color: 1px solid var(--wui-color-gray-glass-005);
  }

  .swap-inputs-container {
    position: relative;
  }

  .replace-tokens-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: var(--wui-spacing-1xs);
    border-radius: var(--wui-border-radius-xs);
    background-color: var(--wui-color-modal-bg-base);
    padding: var(--wui-spacing-xxs);
  }

  .replace-tokens-button-container > button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    padding: var(--wui-spacing-xs);
    border: none;
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-duration-md) var(--wui-ease-out-power-1);
    will-change: background-color;
    z-index: 20;
  }

  .replace-tokens-button-container > button:hover {
    background: var(--wui-color-gray-glass-005);
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    transition: background 0.2s linear;
  }

  .details-container > wui-flex > button:hover {
    background: var(--wui-color-gray-glass-002);
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }
`;var ke=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let _e=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.detailsOpen=!1,this.caipNetworkId=a.NetworkController.state.caipNetwork?.id,this.initialized=a.GN.state.initialized,this.loading=a.GN.state.loading,this.loadingPrices=a.GN.state.loadingPrices,this.sourceToken=a.GN.state.sourceToken,this.sourceTokenAmount=a.GN.state.sourceTokenAmount,this.sourceTokenPriceInUSD=a.GN.state.sourceTokenPriceInUSD,this.toToken=a.GN.state.toToken,this.toTokenAmount=a.GN.state.toTokenAmount,this.toTokenPriceInUSD=a.GN.state.toTokenPriceInUSD,this.inputError=a.GN.state.inputError,this.gasPriceInUSD=a.GN.state.gasPriceInUSD,this.transactionLoading=a.GN.state.transactionLoading,this.fetchError=a.GN.state.fetchError,this.onDebouncedGetSwapCalldata=a.wE.debounce((async()=>{await a.GN.swapTokens()}),200),a.NetworkController.subscribeKey("caipNetwork",(e=>{this.caipNetworkId!==e?.id&&(this.caipNetworkId=e?.id,a.GN.resetState(),a.GN.initializeState())})),this.unsubscribe.push(a.W3.subscribeKey("open",(e=>{e||a.GN.resetState()})),a.RouterController.subscribeKey("view",(e=>{e.includes("Swap")||a.GN.resetValues()})),a.GN.subscribe((e=>{this.initialized=e.initialized,this.loading=e.loading,this.loadingPrices=e.loadingPrices,this.transactionLoading=e.transactionLoading,this.sourceToken=e.sourceToken,this.sourceTokenAmount=e.sourceTokenAmount,this.sourceTokenPriceInUSD=e.sourceTokenPriceInUSD,this.toToken=e.toToken,this.toTokenAmount=e.toTokenAmount,this.toTokenPriceInUSD=e.toTokenPriceInUSD,this.inputError=e.inputError,this.gasPriceInUSD=e.gasPriceInUSD,this.fetchError=e.fetchError})))}firstUpdated(){a.GN.initializeState(),this.watchTokensAndValues()}disconnectedCallback(){this.unsubscribe.forEach((e=>e?.())),clearInterval(this.interval)}render(){return l.qy`
      <wui-flex flexDirection="column" .padding=${["0","l","l","l"]} gap="s">
        ${this.initialized?this.templateSwap():this.templateLoading()}
      </wui-flex>
    `}watchTokensAndValues(){this.interval=setInterval((()=>{a.GN.getNetworkTokenPrice(),a.GN.getMyTokensWithBalance(),a.GN.swapTokens()}),1e4)}templateSwap(){return l.qy`
      <wui-flex flexDirection="column" gap="s">
        <wui-flex flexDirection="column" alignItems="center" gap="xs" class="swap-inputs-container">
          ${this.templateTokenInput("sourceToken",this.sourceToken)}
          ${this.templateTokenInput("toToken",this.toToken)} ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateDetails()} ${this.templateActionButton()}
      </wui-flex>
    `}actionButtonLabel(){return this.fetchError?"Swap":this.sourceToken&&this.toToken?this.sourceTokenAmount?this.initialized?this.inputError?this.inputError:"Review swap":"Swap":"Enter amount":"Select token"}templateReplaceTokensButton(){return l.qy`
      <wui-flex class="replace-tokens-button-container">
        <button @click=${this.onSwitchTokens.bind(this)}>
          <wui-icon name="recycleHorizontal" color="fg-250" size="lg"></wui-icon>
        </button>
      </wui-flex>
    `}templateLoading(){return l.qy`
      <wui-flex flexDirection="column" gap="l">
        <wui-flex flexDirection="column" alignItems="center" gap="xs" class="swap-inputs-container">
          <w3m-swap-input-skeleton target="sourceToken"></w3m-swap-input-skeleton>
          <w3m-swap-input-skeleton target="toToken"></w3m-swap-input-skeleton>
          ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateActionButton()}
      </wui-flex>
    `}templateTokenInput(e,t){const r=a.GN.state.myTokensWithBalance?.find((e=>e?.address===t?.address)),n="toToken"===e?this.toTokenAmount:this.sourceTokenAmount,i="toToken"===e?this.toTokenPriceInUSD:this.sourceTokenPriceInUSD;let s=parseFloat(n)*i;return"toToken"===e&&(s-=this.gasPriceInUSD||0),l.qy`<w3m-swap-input
      .value=${"toToken"===e?this.toTokenAmount:this.sourceTokenAmount}
      ?disabled=${this.loading&&"toToken"===e}
      .onSetAmount=${this.handleChangeAmount.bind(this)}
      target=${e}
      .token=${t}
      .balance=${r?.quantity?.numeric}
      .price=${r?.price}
      .marketValue=${s}
      .onSetMaxValue=${this.onSetMaxValue.bind(this)}
    ></w3m-swap-input>`}onSetMaxValue(e,t){const r="sourceToken"===e?this.sourceToken:this.toToken,n=r?.address===a.oU.NATIVE_TOKEN_ADDRESS;let i="0";if(!t)return i="0",void this.handleChangeAmount(e,i);if(!this.gasPriceInUSD)return i=t,void this.handleChangeAmount(e,i);const s=J.Se.bigNumber(this.gasPriceInUSD.toFixed(5)).dividedBy(this.sourceTokenPriceInUSD),o=n?J.Se.bigNumber(t).minus(s):J.Se.bigNumber(t);this.handleChangeAmount(e,o.isGreaterThan(0)?o.toFixed(20):"0")}templateDetails(){return this.sourceToken&&this.toToken&&!this.inputError?l.qy`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`:null}handleChangeAmount(e,t){a.GN.clearError(),"sourceToken"===e?a.GN.setSourceTokenAmount(t):a.GN.setToTokenAmount(t),this.onDebouncedGetSwapCalldata()}templateActionButton(){const e=!this.toToken||!this.sourceToken,t=!this.sourceTokenAmount,r=this.loading||this.loadingPrices||this.transactionLoading,n=r||e||t||this.inputError;return l.qy` <wui-flex gap="xs">
      <wui-button
        class="action-button"
        fullWidth
        size="lg"
        borderRadius="xs"
        variant=${e?"neutral":"main"}
        .loading=${r}
        .disabled=${n}
        @click=${this.onSwapPreview}
      >
        ${this.actionButtonLabel()}
      </wui-button>
    </wui-flex>`}onSwitchTokens(){a.GN.switchTokens()}onSwapPreview(){this.fetchError?a.GN.swapTokens():a.RouterController.push("SwapPreview")}};_e.styles=Se,ke([(0,u.wk)()],_e.prototype,"interval",void 0),ke([(0,u.wk)()],_e.prototype,"detailsOpen",void 0),ke([(0,u.wk)()],_e.prototype,"caipNetworkId",void 0),ke([(0,u.wk)()],_e.prototype,"initialized",void 0),ke([(0,u.wk)()],_e.prototype,"loading",void 0),ke([(0,u.wk)()],_e.prototype,"loadingPrices",void 0),ke([(0,u.wk)()],_e.prototype,"sourceToken",void 0),ke([(0,u.wk)()],_e.prototype,"sourceTokenAmount",void 0),ke([(0,u.wk)()],_e.prototype,"sourceTokenPriceInUSD",void 0),ke([(0,u.wk)()],_e.prototype,"toToken",void 0),ke([(0,u.wk)()],_e.prototype,"toTokenAmount",void 0),ke([(0,u.wk)()],_e.prototype,"toTokenPriceInUSD",void 0),ke([(0,u.wk)()],_e.prototype,"inputError",void 0),ke([(0,u.wk)()],_e.prototype,"gasPriceInUSD",void 0),ke([(0,u.wk)()],_e.prototype,"transactionLoading",void 0),ke([(0,u.wk)()],_e.prototype,"fetchError",void 0),_e=ke([(0,c.customElement)("w3m-swap-view")],_e);const Ie=l.AH`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  .preview-container,
  .details-container {
    width: 100%;
  }

  .token-image {
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: 12px;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .token-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-xxs);
    padding: var(--wui-spacing-xs);
    height: 40px;
    border: none;
    border-radius: 80px;
    background: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    cursor: pointer;
    transition: background 0.2s linear;
  }

  .token-item:hover {
    background: var(--wui-color-gray-glass-005);
  }

  .preview-token-details-container {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }

  .action-buttons-container {
    width: 100%;
    gap: var(--wui-spacing-xs);
  }

  .action-buttons-container > button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    height: 48px;
    border-radius: var(--wui-border-radius-xs);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  .action-buttons-container > button:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  .cancel-button:hover,
  .action-button:hover {
    cursor: pointer;
  }

  .action-buttons-container > wui-button.cancel-button {
    flex: 2;
  }

  .action-buttons-container > wui-button.action-button {
    flex: 4;
  }

  .action-buttons-container > button.action-button > wui-text {
    color: white;
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    transition: background 0.2s linear;
  }

  .details-container > wui-flex > button:hover {
    background: var(--wui-color-gray-glass-002);
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }
`;var Me=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Te=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.detailsOpen=!0,this.approvalTransaction=a.GN.state.approvalTransaction,this.swapTransaction=a.GN.state.swapTransaction,this.sourceToken=a.GN.state.sourceToken,this.sourceTokenAmount=a.GN.state.sourceTokenAmount??"",this.sourceTokenPriceInUSD=a.GN.state.sourceTokenPriceInUSD,this.toToken=a.GN.state.toToken,this.toTokenAmount=a.GN.state.toTokenAmount??"",this.toTokenPriceInUSD=a.GN.state.toTokenPriceInUSD,this.caipNetwork=a.NetworkController.state.caipNetwork,this.transactionLoading=a.GN.state.transactionLoading,this.balanceSymbol=a.AccountController.state.balanceSymbol,this.gasPriceInUSD=a.GN.state.gasPriceInUSD,this.inputError=a.GN.state.inputError,this.loading=a.GN.state.loading,this.unsubscribe.push(a.AccountController.subscribeKey("balanceSymbol",(e=>{this.balanceSymbol!==e&&a.RouterController.goBack()})),a.NetworkController.subscribeKey("caipNetwork",(e=>{this.caipNetwork!==e&&(this.caipNetwork=e)})),a.GN.subscribe((e=>{this.approvalTransaction=e.approvalTransaction,this.swapTransaction=e.swapTransaction,this.sourceToken=e.sourceToken,this.gasPriceInUSD=e.gasPriceInUSD,this.toToken=e.toToken,this.transactionLoading=e.transactionLoading,this.gasPriceInUSD=e.gasPriceInUSD,this.toTokenPriceInUSD=e.toTokenPriceInUSD,this.sourceTokenAmount=e.sourceTokenAmount??"",this.toTokenAmount=e.toTokenAmount??"",this.inputError=e.inputError,this.loading=e.loading})))}firstUpdated(){a.GN.getTransaction(),this.refreshTransaction()}disconnectedCallback(){this.unsubscribe.forEach((e=>e?.())),clearInterval(this.interval)}render(){return l.qy`
      <wui-flex flexDirection="column" .padding=${["0","l","l","l"]} gap="s">
        ${this.templateSwap()}
      </wui-flex>
    `}refreshTransaction(){this.interval=setInterval((()=>{a.GN.getTransaction()}),1e4)}templateSwap(){const e=`${c.UiHelperUtil.formatNumberToLocalString(parseFloat(this.sourceTokenAmount))} ${this.sourceToken?.symbol}`,t=`${c.UiHelperUtil.formatNumberToLocalString(parseFloat(this.toTokenAmount))} ${this.toToken?.symbol}`,r=parseFloat(this.sourceTokenAmount)*this.sourceTokenPriceInUSD,n=parseFloat(this.toTokenAmount)*this.toTokenPriceInUSD-(this.gasPriceInUSD||0),i=c.UiHelperUtil.formatNumberToLocalString(r),s=c.UiHelperUtil.formatNumberToLocalString(n);return l.qy`
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        <wui-flex class="preview-container" flexDirection="column" alignItems="flex-start" gap="l">
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="l"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="4xs">
              <wui-text variant="small-400" color="fg-150">Send</wui-text>
              <wui-text variant="paragraph-400" color="fg-100">$${i}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${e}
              imageSrc=${this.sourceToken?.logoUri}
            >
            </wui-token-button>
          </wui-flex>
          <wui-icon name="recycleHorizontal" color="fg-200" size="md"></wui-icon>
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="l"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="4xs">
              <wui-text variant="small-400" color="fg-150">Receive</wui-text>
              <wui-text variant="paragraph-400" color="fg-100">$${s}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${t}
              imageSrc=${this.toToken?.logoUri}
            >
            </wui-token-button>
          </wui-flex>
        </wui-flex>

        ${this.templateDetails()}

        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="xs">
          <wui-icon size="sm" color="fg-200" name="infoCircle"></wui-icon>
          <wui-text variant="small-400" color="fg-200">Review transaction carefully</wui-text>
        </wui-flex>

        <wui-flex
          class="action-buttons-container"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="xs"
        >
          <wui-button
            class="cancel-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="neutral"
            @click=${this.onCancelTransaction.bind(this)}
          >
            <wui-text variant="paragraph-600" color="fg-200">Cancel</wui-text>
          </wui-button>
          <wui-button
            class="action-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="main"
            ?loading=${this.loading}
            ?disabled=${this.transactionLoading}
            @click=${this.onSendTransaction.bind(this)}
          >
            ${this.transactionLoading?l.qy`<wui-loading-spinner color="inverse-100"></wui-loading-spinner>`:l.qy`<wui-text variant="paragraph-600" color="inverse-100">
                  ${this.actionButtonLabel()}
                </wui-text>`}
          </wui-button>
        </wui-flex>
      </wui-flex>
    `}templateDetails(){return this.sourceToken&&this.toToken&&!this.inputError?l.qy`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`:null}actionButtonLabel(){return this.approvalTransaction?"Approve":"Swap"}onCancelTransaction(){a.RouterController.goBack()}onSendTransaction(){this.approvalTransaction?a.GN.sendTransactionForApproval(this.approvalTransaction):a.GN.sendTransactionForSwap(this.swapTransaction)}};Te.styles=Ie,Me([(0,u.wk)()],Te.prototype,"interval",void 0),Me([(0,u.wk)()],Te.prototype,"detailsOpen",void 0),Me([(0,u.wk)()],Te.prototype,"approvalTransaction",void 0),Me([(0,u.wk)()],Te.prototype,"swapTransaction",void 0),Me([(0,u.wk)()],Te.prototype,"sourceToken",void 0),Me([(0,u.wk)()],Te.prototype,"sourceTokenAmount",void 0),Me([(0,u.wk)()],Te.prototype,"sourceTokenPriceInUSD",void 0),Me([(0,u.wk)()],Te.prototype,"toToken",void 0),Me([(0,u.wk)()],Te.prototype,"toTokenAmount",void 0),Me([(0,u.wk)()],Te.prototype,"toTokenPriceInUSD",void 0),Me([(0,u.wk)()],Te.prototype,"caipNetwork",void 0),Me([(0,u.wk)()],Te.prototype,"transactionLoading",void 0),Me([(0,u.wk)()],Te.prototype,"balanceSymbol",void 0),Me([(0,u.wk)()],Te.prototype,"gasPriceInUSD",void 0),Me([(0,u.wk)()],Te.prototype,"inputError",void 0),Me([(0,u.wk)()],Te.prototype,"loading",void 0),Te=Me([(0,c.customElement)("w3m-swap-preview-view")],Te);const Pe=l.AH`
  :host {
    --tokens-scroll--top-opacity: 0;
    --tokens-scroll--bottom-opacity: 1;
    --suggested-tokens-scroll--left-opacity: 0;
    --suggested-tokens-scroll--right-opacity: 1;
  }

  :host > wui-flex:first-child {
    overflow-y: hidden;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-height: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .suggested-tokens-container {
    overflow-x: auto;
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--suggested-tokens-scroll--right-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--right-opacity))) 100%
    );
  }

  .suggested-tokens-container::-webkit-scrollbar {
    display: none;
  }

  .tokens-container {
    border-top: 1px solid var(--wui-color-gray-glass-005);
    height: 100%;
    max-height: 390px;
  }

  .tokens {
    width: 100%;
    overflow-y: auto;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--tokens-scroll--top-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--tokens-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--bottom-opacity))) 100%
    );
  }

  .network-search-input,
  .select-network-button {
    height: 40px;
  }

  .select-network-button {
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: transparent;
    border-radius: var(--wui-border-radius-xxs);
    padding: var(--wui-spacing-xs);
    align-items: center;
    transition: background-color 0.2s linear;
  }

  .select-network-button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  .select-network-button > wui-image {
    width: 26px;
    height: 26px;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }
`;var Oe=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Re=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.targetToken=a.RouterController.state.data?.target,this.sourceToken=a.GN.state.sourceToken,this.sourceTokenAmount=a.GN.state.sourceTokenAmount,this.toToken=a.GN.state.toToken,this.myTokensWithBalance=a.GN.state.myTokensWithBalance,this.popularTokens=a.GN.state.popularTokens,this.searchValue="",this.unsubscribe.push(a.GN.subscribe((e=>{this.sourceToken=e.sourceToken,this.toToken=e.toToken,this.myTokensWithBalance=e.myTokensWithBalance})))}updated(){const e=this.renderRoot?.querySelector(".suggested-tokens-container");e?.addEventListener("scroll",this.handleSuggestedTokensScroll.bind(this));const t=this.renderRoot?.querySelector(".tokens");t?.addEventListener("scroll",this.handleTokenListScroll.bind(this))}disconnectedCallback(){super.disconnectedCallback();const e=this.renderRoot?.querySelector(".suggested-tokens-container"),t=this.renderRoot?.querySelector(".tokens");e?.removeEventListener("scroll",this.handleSuggestedTokensScroll.bind(this)),t?.removeEventListener("scroll",this.handleTokenListScroll.bind(this)),clearInterval(this.interval)}render(){return l.qy`
      <wui-flex flexDirection="column" gap="s">
        ${this.templateSearchInput()} ${this.templateSuggestedTokens()} ${this.templateTokens()}
      </wui-flex>
    `}onSelectToken(e){"sourceToken"===this.targetToken?a.GN.setSourceToken(e):(a.GN.setToToken(e),this.sourceToken&&this.sourceTokenAmount&&a.GN.swapTokens()),a.RouterController.goBack()}templateSearchInput(){return l.qy`
      <wui-flex .padding=${["0","s","0","s"]} gap="xs">
        <wui-input-text
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
          .value=${this.searchValue}
          @inputChange=${this.onSearchInputChange.bind(this)}
        ></wui-input-text>
      </wui-flex>
    `}templateTokens(){const e=this.myTokensWithBalance?Object.values(this.myTokensWithBalance):[],t=this.popularTokens?this.popularTokens:[],r=this.filterTokensWithText(e,this.searchValue),n=this.filterTokensWithText(t,this.searchValue);return l.qy`
      <wui-flex class="tokens-container">
        <wui-flex class="tokens" .padding=${["0","s","s","s"]} flexDirection="column">
          ${r?.length>0?l.qy`
                <wui-flex justifyContent="flex-start" padding="s">
                  <wui-text variant="paragraph-500" color="fg-200">Your tokens</wui-text>
                </wui-flex>
                ${r.map((e=>{const t=e.symbol===this.sourceToken?.symbol||e.symbol===this.toToken?.symbol;return l.qy`
                    <wui-token-list-item
                      name=${e.name}
                      ?disabled=${t}
                      symbol=${e.symbol}
                      price=${e?.price}
                      amount=${e?.quantity?.numeric}
                      imageSrc=${e.logoUri}
                      @click=${()=>{t||this.onSelectToken(e)}}
                    >
                    </wui-token-list-item>
                  `}))}
              `:null}

          <wui-flex justifyContent="flex-start" padding="s">
            <wui-text variant="paragraph-500" color="fg-200">Popular tokens</wui-text>
          </wui-flex>
          ${n?.length>0?n.map((e=>l.qy`
                  <wui-token-list-item
                    name=${e.name}
                    symbol=${e.symbol}
                    imageSrc=${e.logoUri}
                    @click=${()=>this.onSelectToken(e)}
                  >
                  </wui-token-list-item>
                `)):null}
        </wui-flex>
      </wui-flex>
    `}templateSuggestedTokens(){const e=a.GN.state.suggestedTokens?a.GN.state.suggestedTokens.slice(0,8):null;return e?l.qy`
      <wui-flex class="suggested-tokens-container" .padding=${["0","s","0","s"]} gap="xs">
        ${e.map((e=>l.qy`
            <wui-token-button
              text=${e.symbol}
              imageSrc=${e.logoUri}
              @click=${()=>this.onSelectToken(e)}
            >
            </wui-token-button>
          `))}
      </wui-flex>
    `:null}onSearchInputChange(e){this.searchValue=e.detail}handleSuggestedTokensScroll(){const e=this.renderRoot?.querySelector(".suggested-tokens-container");e&&(e.style.setProperty("--suggested-tokens-scroll--left-opacity",c.MathUtil.interpolate([0,100],[0,1],e.scrollLeft).toString()),e.style.setProperty("--suggested-tokens-scroll--right-opacity",c.MathUtil.interpolate([0,100],[0,1],e.scrollWidth-e.scrollLeft-e.offsetWidth).toString()))}handleTokenListScroll(){const e=this.renderRoot?.querySelector(".tokens");e&&(e.style.setProperty("--tokens-scroll--top-opacity",c.MathUtil.interpolate([0,100],[0,1],e.scrollTop).toString()),e.style.setProperty("--tokens-scroll--bottom-opacity",c.MathUtil.interpolate([0,100],[0,1],e.scrollHeight-e.scrollTop-e.offsetHeight).toString()))}filterTokensWithText(e,t){return e.filter((e=>`${e.symbol} ${e.name} ${e.address}`.toLowerCase().includes(t.toLowerCase())))}};Re.styles=Pe,Oe([(0,u.wk)()],Re.prototype,"interval",void 0),Oe([(0,u.wk)()],Re.prototype,"targetToken",void 0),Oe([(0,u.wk)()],Re.prototype,"sourceToken",void 0),Oe([(0,u.wk)()],Re.prototype,"sourceTokenAmount",void 0),Oe([(0,u.wk)()],Re.prototype,"toToken",void 0),Oe([(0,u.wk)()],Re.prototype,"myTokensWithBalance",void 0),Oe([(0,u.wk)()],Re.prototype,"popularTokens",void 0),Oe([(0,u.wk)()],Re.prototype,"searchValue",void 0),Re=Oe([(0,c.customElement)("w3m-swap-select-token-view")],Re);const Ne=l.AH`
  :host > wui-flex:first-child {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }
`;let Be=class extends l.WF{render(){return l.qy`
      <wui-flex flexDirection="column" .padding=${["0","m","m","m"]} gap="s">
        <w3m-activity-list page="activity"></w3m-activity-list>
      </wui-flex>
    `}};Be.styles=Ne,Be=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-transactions-view")],Be);const Ue=[{images:["network","layers","system"],title:"The system’s nuts and bolts",text:"A network is what brings the blockchain to life, as this technical infrastructure allows apps to access the ledger and smart contract services."},{images:["noun","defiAlt","dao"],title:"Designed for different uses",text:"Each network is designed differently, and may therefore suit certain apps and experiences."}];let De=class extends l.WF{render(){return l.qy`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","xl","xl","xl"]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${Ue}></w3m-help-widget>
        <wui-button
          variant="main"
          size="md"
          @click=${()=>{a.wE.openHref("https://ethereum.org/en/developers/docs/networks/","_blank")}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};De=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-what-is-a-network-view")],De);const Le=[{images:["login","profile","lock"],title:"One login for all of web3",text:"Log in to any app by connecting your wallet. Say goodbye to countless passwords!"},{images:["defi","nft","eth"],title:"A home for your digital assets",text:"A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs."},{images:["browser","noun","dao"],title:"Your gateway to a new web",text:"With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more."}];let Fe=class extends l.WF{render(){return l.qy`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","xl","xl","xl"]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${Le}></w3m-help-widget>
        <wui-button variant="main" size="md" @click=${this.onGetWallet.bind(this)}>
          <wui-icon color="inherit" slot="iconLeft" name="wallet"></wui-icon>
          Get a wallet
        </wui-button>
      </wui-flex>
    `}onGetWallet(){a.En.sendEvent({type:"track",event:"CLICK_GET_WALLET"}),a.RouterController.push("GetWallet")}};Fe=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-what-is-a-wallet-view")],Fe);let je=class extends l.WF{render(){return l.qy`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","3xl","xl","3xl"]}
        alignItems="center"
        gap="xl"
      >
        <wui-visual name="onrampCard"></wui-visual>
        <wui-flex flexDirection="column" gap="xs" alignItems="center">
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            Quickly and easily buy digital assets!
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            Simply select your preferred onramp provider and add digital assets to your account
            using your credit card or bank transfer
          </wui-text>
        </wui-flex>
        <wui-button @click=${a.RouterController.goBack}>
          <wui-icon size="sm" color="inherit" name="add" slot="iconLeft"></wui-icon>
          Buy
        </wui-button>
      </wui-flex>
    `}};je=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-what-is-a-buy-view")],je);const He=l.AH`
  wui-loading-spinner {
    margin: 9px auto;
  }
`;var ze=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let qe=class extends l.WF{firstUpdated(){this.startOTPTimeout()}disconnectedCallback(){clearTimeout(this.OTPTimeout)}constructor(){super(),this.loading=!1,this.timeoutTimeLeft=P.QH.getTimeToNextEmailLogin(),this.error="",this.otp="",this.email=a.RouterController.state.data?.email,this.authConnector=a.ConnectorController.getAuthConnector()}render(){if(!this.email)throw new Error("w3m-email-otp-widget: No email provided");const e=Boolean(this.timeoutTimeLeft),t=this.getFooterLabels(e);return l.qy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["l","0","l","0"]}
        gap="l"
      >
        <wui-flex flexDirection="column" alignItems="center">
          <wui-text variant="paragraph-400" color="fg-100">Enter the code we sent to</wui-text>
          <wui-text variant="paragraph-500" color="fg-100">${this.email}</wui-text>
        </wui-flex>

        <wui-text variant="small-400" color="fg-200">The code expires in 20 minutes</wui-text>

        ${this.loading?l.qy`<wui-loading-spinner size="xl" color="accent-100"></wui-loading-spinner>`:l.qy` <wui-flex flexDirection="column" alignItems="center" gap="xs">
              <wui-otp
                dissabled
                length="6"
                @inputChange=${this.onOtpInputChange.bind(this)}
                .otp=${this.otp}
              ></wui-otp>
              ${this.error?l.qy`
                    <wui-text variant="small-400" align="center" color="error-100">
                      ${this.error}. Try Again
                    </wui-text>
                  `:null}
            </wui-flex>`}

        <wui-flex alignItems="center" gap="xs">
          <wui-text variant="small-400" color="fg-200">${t.title}</wui-text>
          <wui-link @click=${this.onResendCode.bind(this)} .disabled=${e}>
            ${t.action}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `}startOTPTimeout(){this.timeoutTimeLeft=P.QH.getTimeToNextEmailLogin(),this.OTPTimeout=setInterval((()=>{this.timeoutTimeLeft>0?this.timeoutTimeLeft=P.QH.getTimeToNextEmailLogin():clearInterval(this.OTPTimeout)}),1e3)}async onOtpInputChange(e){try{this.loading||(this.otp=e.detail,this.authConnector&&6===this.otp.length&&(this.loading=!0,await(this.onOtpSubmit?.(this.otp))))}catch(e){this.error=a.wE.parseError(e),this.loading=!1}}async onResendCode(){try{if(this.onOtpResend){if(!this.loading&&!this.timeoutTimeLeft){if(this.error="",this.otp="",!a.ConnectorController.getAuthConnector()||!this.email)throw new Error("w3m-email-otp-widget: Unable to resend email");this.loading=!0,await this.onOtpResend(this.email),this.startOTPTimeout(),a.SnackController.showSuccess("Code email resent")}}else this.onStartOver&&this.onStartOver()}catch(e){a.SnackController.showError(e)}finally{this.loading=!1}}getFooterLabels(e){return this.onStartOver?{title:"Something wrong?",action:"Try again "+(e?`in ${this.timeoutTimeLeft}s`:"")}:{title:"Didn't receive it?",action:"Resend "+(e?`in ${this.timeoutTimeLeft}s`:"Code")}}};qe.styles=He,ze([(0,u.wk)()],qe.prototype,"loading",void 0),ze([(0,u.wk)()],qe.prototype,"timeoutTimeLeft",void 0),ze([(0,u.wk)()],qe.prototype,"error",void 0),qe=ze([(0,c.customElement)("w3m-email-otp-widget")],qe);var $e=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let We=class extends qe{constructor(){super(),this.unsubscribe=[],this.smartAccountDeployed=a.AccountController.state.smartAccountDeployed,this.onOtpSubmit=async e=>{try{if(this.authConnector){const t=a.NetworkController.checkIfSmartAccountEnabled();await this.authConnector.provider.connectOtp({otp:e}),a.En.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),await a.ConnectionController.connectExternal(this.authConnector),a.En.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"email",name:this.authConnector.name||"Unknown"}}),t&&!this.smartAccountDeployed?a.RouterController.push("UpgradeToSmartAccount"):a.W3.close()}}catch(e){throw a.En.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL"}),e}},this.onOtpResend=async e=>{this.authConnector&&(await this.authConnector.provider.connectEmail({email:e}),a.En.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}))},this.unsubscribe.push(a.AccountController.subscribeKey("smartAccountDeployed",(e=>{this.smartAccountDeployed=e})))}};$e([(0,u.wk)()],We.prototype,"smartAccountDeployed",void 0),We=$e([(0,c.customElement)("w3m-email-verify-otp-view")],We);const Ge=l.AH`
  wui-icon-box {
    height: var(--wui-icon-box-size-xl);
    width: var(--wui-icon-box-size-xl);
  }
`;var Ve=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Ke=class extends l.WF{constructor(){super(),this.email=a.RouterController.state.data?.email,this.authConnector=a.ConnectorController.getAuthConnector(),this.loading=!1,this.listenForDeviceApproval()}render(){if(!this.email)throw new Error("w3m-email-verify-device-view: No email provided");if(!this.authConnector)throw new Error("w3m-email-verify-device-view: No auth connector provided");return l.qy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["xxl","s","xxl","s"]}
        gap="l"
      >
        <wui-icon-box
          size="xl"
          iconcolor="accent-100"
          backgroundcolor="accent-100"
          icon="verify"
          background="opaque"
        ></wui-icon-box>

        <wui-flex flexDirection="column" alignItems="center" gap="s">
          <wui-flex flexDirection="column" alignItems="center">
            <wui-text variant="paragraph-400" color="fg-100">
              Approve the login link we sent to
            </wui-text>
            <wui-text variant="paragraph-400" color="fg-100"><b>${this.email}</b></wui-text>
          </wui-flex>

          <wui-text variant="small-400" color="fg-200" align="center">
            The code expires in 20 minutes
          </wui-text>

          <wui-flex alignItems="center" id="w3m-resend-section" gap="xs">
            <wui-text variant="small-400" color="fg-100" align="center">
              Didn't receive it?
            </wui-text>
            <wui-link @click=${this.onResendCode.bind(this)} .disabled=${this.loading}>
              Resend email
            </wui-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}async listenForDeviceApproval(){if(this.authConnector)try{await this.authConnector.provider.connectDevice(),a.En.sendEvent({type:"track",event:"DEVICE_REGISTERED_FOR_EMAIL"}),a.En.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),a.RouterController.replace("EmailVerifyOtp",{email:this.email})}catch(e){a.RouterController.goBack()}}async onResendCode(){try{if(!this.loading){if(!this.authConnector||!this.email)throw new Error("w3m-email-login-widget: Unable to resend email");this.loading=!0,await this.authConnector.provider.connectEmail({email:this.email}),this.listenForDeviceApproval(),a.SnackController.showSuccess("Code email resent")}}catch(e){a.SnackController.showError(e)}finally{this.loading=!1}}};Ke.styles=Ge,Ve([(0,u.wk)()],Ke.prototype,"loading",void 0),Ke=Ve([(0,c.customElement)("w3m-email-verify-device-view")],Ke);const Ze=l.AH`
  div {
    width: 100%;
    height: 400px;
  }

  [data-ready='false'] {
    transform: scale(1.05);
  }

  @media (max-width: 430px) {
    [data-ready='false'] {
      transform: translateY(-50px);
    }
  }
`;var Qe=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Je=class extends l.WF{constructor(){super(),this.bodyObserver=void 0,this.unsubscribe=[],this.iframe=document.getElementById("w3m-iframe"),this.ready=!1,this.unsubscribe.push(a.W3.subscribeKey("open",(e=>{e||(this.onHideIframe(),a.RouterController.popTransactionStack())})))}disconnectedCallback(){this.onHideIframe(),this.unsubscribe.forEach((e=>e())),this.bodyObserver?.unobserve(window.document.body)}async firstUpdated(){await this.syncTheme(),this.iframe.style.display="block",this.bodyObserver=new ResizeObserver((e=>{const t=e?.[0]?.contentBoxSize,r=t?.[0]?.inlineSize;this.iframe.style.height="400px",r&&r<=430?(this.iframe.style.width="100%",this.iframe.style.left="0px",this.iframe.style.bottom="0px",this.iframe.style.top="unset"):(this.iframe.style.width="360px",this.iframe.style.left="calc(50% - 180px)",this.iframe.style.top="calc(50% - 200px + 32px)",this.iframe.style.bottom="unset"),this.ready=!0})),this.bodyObserver.observe(window.document.body)}render(){return this.ready&&this.onShowIframe(),l.qy`<div data-ready=${this.ready}></div>`}onShowIframe(){const e=window.innerWidth<=430;this.iframe.animate([{opacity:0,transform:e?"translateY(50px)":"scale(.95)"},{opacity:1,transform:e?"translateY(0)":"scale(1)"}],{duration:200,easing:"ease",fill:"forwards"})}async onHideIframe(){this.iframe.style.display="none",await this.iframe.animate([{opacity:1},{opacity:0}],{duration:200,easing:"ease",fill:"forwards"}).finished}async syncTheme(){const e=a.ConnectorController.getAuthConnector();if(e){const t=a.ThemeController.getSnapshot().themeMode,r=a.ThemeController.getSnapshot().themeVariables;await e.provider.syncTheme({themeVariables:r,w3mThemeVariables:(0,J.o_)(r,t)})}}};Je.styles=Ze,Qe([(0,u.wk)()],Je.prototype,"ready",void 0),Je=Qe([(0,c.customElement)("w3m-approve-transaction-view")],Je);let Ye=class extends l.WF{render(){return l.qy`
      <wui-flex flexDirection="column" alignItems="center" gap="xl" padding="xl">
        <wui-text variant="paragraph-400" color="fg-100">Follow the instructions on</wui-text>
        <wui-chip
          icon="externalLink"
          variant="fill"
          href=${a.oU.SECURE_SITE_DASHBOARD}
          imageSrc=${a.oU.SECURE_SITE_FAVICON}
          data-testid="w3m-secure-website-button"
        >
        </wui-chip>
        <wui-text variant="small-400" color="fg-200">
          You will have to reconnect for security reasons
        </wui-text>
      </wui-flex>
    `}};Ye=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-upgrade-wallet-view")],Ye);var Xe=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let et=class extends l.WF{constructor(){super(...arguments),this.authConnector=a.ConnectorController.getAuthConnector(),this.loading=!1,this.setPreferSmartAccount=async()=>{if(this.authConnector)try{this.loading=!0,a.W3.setLoading(!0),await this.authConnector.provider.setPreferredAccount(P.Vl.ACCOUNT_TYPES.SMART_ACCOUNT),await a.ConnectionController.reconnectExternal(this.authConnector),a.W3.setLoading(!1),this.loading=!1,a.aS.navigateAfterPreferredAccountTypeSelect()}catch(e){a.SnackController.showError("Error upgrading to smart account")}}}render(){return l.qy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${["0","0","l","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{a.wE.openHref(J.TC.URLS.FAQ,"_blank")}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `}onboardingTemplate(){return l.qy` <wui-flex
      flexDirection="column"
      gap="xxl"
      alignItems="center"
      .padding=${["0","xxl","0","xxl"]}
    >
      <wui-flex gap="s" alignItems="center" justifyContent="center">
        <wui-visual name="google"></wui-visual>
        <wui-visual name="pencil"></wui-visual>
        <wui-visual name="lightbulb"></wui-visual>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Discover Smart Accounts
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          Access advanced features such as username, social login, improved security and a smoother
          user experience!
        </wui-text>
      </wui-flex>
    </wui-flex>`}buttonsTemplate(){return l.qy`<wui-flex .padding=${["0","2l","0","2l"]} gap="s">
      <wui-button
        variant="accent"
        @click=${this.redirectToAccount.bind(this)}
        size="lg"
        borderRadius="xs"
      >
        Do it later
      </wui-button>
      <wui-button
        .loading=${this.loading}
        size="lg"
        borderRadius="xs"
        @click=${this.setPreferSmartAccount.bind(this)}
        >Continue
      </wui-button>
    </wui-flex>`}redirectToAccount(){a.RouterController.push("Account")}};Xe([(0,u.wk)()],et.prototype,"authConnector",void 0),Xe([(0,u.wk)()],et.prototype,"loading",void 0),et=Xe([(0,c.customElement)("w3m-upgrade-to-smart-account-view")],et);const tt=l.AH`
  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }
`;var rt=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let nt=class extends l.WF{constructor(){super(...arguments),this.formRef=(0,ne._)(),this.initialEmail=a.RouterController.state.data?.email??"",this.email="",this.loading=!1}firstUpdated(){this.formRef.value?.addEventListener("keydown",(e=>{"Enter"===e.key&&this.onSubmitEmail(e)}))}render(){const e=!this.loading&&this.email.length>3&&this.email!==this.initialEmail;return l.qy`
      <wui-flex flexDirection="column" padding="m" gap="m">
        <form ${(0,ne.K)(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
          <wui-email-input
            value=${this.initialEmail}
            .disabled=${this.loading}
            @inputChange=${this.onEmailInputChange.bind(this)}
          >
          </wui-email-input>
          <input type="submit" hidden />
        </form>

        <wui-flex gap="s">
          <wui-button size="md" variant="neutral" fullWidth @click=${a.RouterController.goBack}>
            Cancel
          </wui-button>

          <wui-button
            size="md"
            variant="main"
            fullWidth
            @click=${this.onSubmitEmail.bind(this)}
            .disabled=${!e}
            .loading=${this.loading}
          >
            Save
          </wui-button>
        </wui-flex>
      </wui-flex>
    `}onEmailInputChange(e){this.email=e.detail}async onSubmitEmail(e){try{if(this.loading)return;this.loading=!0,e.preventDefault();const t=a.ConnectorController.getAuthConnector();if(!t)throw new Error("w3m-update-email-wallet: Auth connector not found");const r=await t.provider.updateEmail({email:this.email});a.En.sendEvent({type:"track",event:"EMAIL_EDIT"}),"VERIFY_SECONDARY_OTP"===r.action?a.RouterController.push("UpdateEmailSecondaryOtp",{email:this.initialEmail,newEmail:this.email}):a.RouterController.push("UpdateEmailPrimaryOtp",{email:this.initialEmail,newEmail:this.email})}catch(e){a.SnackController.showError(e),this.loading=!1}}};nt.styles=tt,rt([(0,u.wk)()],nt.prototype,"email",void 0),rt([(0,u.wk)()],nt.prototype,"loading",void 0),nt=rt([(0,c.customElement)("w3m-update-email-wallet-view")],nt);let it=class extends qe{constructor(){super(),this.email=a.RouterController.state.data?.email,this.onOtpSubmit=async e=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailPrimaryOtp({otp:e}),a.En.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),a.RouterController.replace("UpdateEmailSecondaryOtp",a.RouterController.state.data))}catch(e){throw a.En.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL"}),e}},this.onStartOver=()=>{a.RouterController.replace("UpdateEmailWallet",a.RouterController.state.data)}}};it=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-update-email-primary-otp-view")],it);let st=class extends qe{constructor(){super(),this.email=a.RouterController.state.data?.newEmail,this.onOtpSubmit=async e=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailSecondaryOtp({otp:e}),a.En.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),a.RouterController.reset("Account"))}catch(e){throw a.En.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL"}),e}},this.onStartOver=()=>{a.RouterController.replace("UpdateEmailWallet",a.RouterController.state.data)}}};st=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-update-email-secondary-otp-view")],st);const ot=l.AH`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`;var at=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let ct=class extends l.WF{constructor(){super(...arguments),this.swapUnsupportedChain=a.RouterController.state.data?.swapUnsupportedChain,this.disconecting=!1}render(){return l.qy`
      <wui-flex class="container" flexDirection="column" gap="0">
        <wui-flex
          class="container"
          flexDirection="column"
          .padding=${["m","xl","xs","xl"]}
          alignItems="center"
          gap="xl"
        >
          ${this.descriptionTemplate()}
        </wui-flex>

        <wui-flex flexDirection="column" padding="s" gap="xs">
          ${this.networksTemplate()}
        </wui-flex>

        <wui-separator text="or"></wui-separator>
        <wui-flex flexDirection="column" padding="s" gap="xs">
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="disconnect"
            ?chevron=${!1}
            .loading=${this.disconecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `}descriptionTemplate(){return this.swapUnsupportedChain?l.qy`
        <wui-text variant="small-400" color="fg-200" align="center">
          The swap feature doesn’t support your current network. Switch to an available option to
          continue.
        </wui-text>
      `:l.qy`
      <wui-text variant="small-400" color="fg-200" align="center">
        This app doesn’t support your current network. Switch to an available option to continue.
      </wui-text>
    `}networksTemplate(){const{approvedCaipNetworkIds:e,requestedCaipNetworks:t}=a.NetworkController.state,r=a.wE.sortRequestedNetworks(e,t);return(this.swapUnsupportedChain?r.filter((e=>a.oU.SWAP_SUPPORTED_NETWORKS.includes(e.id))):r).map((e=>l.qy`
        <wui-list-network
          imageSrc=${(0,h.J)(a.$m.getNetworkImage(e))}
          name=${e.name??"Unknown"}
          @click=${()=>this.onSwitchNetwork(e)}
        >
        </wui-list-network>
      `))}async onDisconnect(){try{this.disconecting=!0,await a.ConnectionController.disconnect(),a.En.sendEvent({type:"track",event:"DISCONNECT_SUCCESS"}),a.W3.close()}catch{a.En.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),a.SnackController.showError("Failed to disconnect")}finally{this.disconecting=!1}}async onSwitchNetwork(e){const{isConnected:t}=a.AccountController.state,{approvedCaipNetworkIds:r,supportsAllNetworks:n,caipNetwork:i}=a.NetworkController.state,{data:s}=a.RouterController.state;t&&i?.id!==e.id?r?.includes(e.id)?(await a.NetworkController.switchActiveNetwork(e),a.aS.navigateAfterNetworkSwitch()):n&&a.RouterController.push("SwitchNetwork",{...s,network:e}):t||(a.NetworkController.setCaipNetwork(e),a.RouterController.push("Connect"))}};ct.styles=ot,at([(0,u.wk)()],ct.prototype,"disconecting",void 0),ct=at([(0,c.customElement)("w3m-unsupported-chain-view")],ct);const lt=l.AH`
  wui-compatible-network {
    margin-top: var(--wui-spacing-l);
  }
`;var ut=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let ht=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.address=a.AccountController.state.address,this.profileName=a.AccountController.state.profileName,this.network=a.NetworkController.state.caipNetwork,this.preferredAccountType=a.AccountController.state.preferredAccountType,this.unsubscribe.push(a.AccountController.subscribe((e=>{e.address?(this.address=e.address,this.profileName=e.profileName,this.preferredAccountType=e.preferredAccountType):a.SnackController.showError("Account not found")})),a.NetworkController.subscribeKey("caipNetwork",(e=>{e?.id&&(this.network=e)})))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){if(!this.address)throw new Error("w3m-wallet-receive-view: No account provided");const e=a.$m.getNetworkImage(this.network);return l.qy` <wui-flex
      flexDirection="column"
      .padding=${["0","l","l","l"]}
      alignItems="center"
    >
      <wui-chip-button
        @click=${this.onCopyClick.bind(this)}
        text=${c.UiHelperUtil.getTruncateString({string:this.profileName||this.address||"",charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
        icon="copy"
        size="sm"
        imageSrc=${e||""}
        variant="gray"
      ></wui-chip-button>
      <wui-flex
        flexDirection="column"
        .padding=${["l","0","0","0"]}
        alignItems="center"
        gap="s"
      >
        <wui-qr-code
          size=${232}
          theme=${a.ThemeController.state.themeMode}
          uri=${this.address}
          ?arenaClear=${!0}
          data-testid="wui-qr-code"
        ></wui-qr-code>
        <wui-text variant="paragraph-500" color="fg-100" align="center">
          Copy your address or scan this QR code
        </wui-text>
      </wui-flex>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){const e=a.NetworkController.getRequestedCaipNetworks(),t=a.NetworkController.checkIfSmartAccountEnabled(),r=a.NetworkController.state.caipNetwork;if(this.preferredAccountType===P.Vl.ACCOUNT_TYPES.SMART_ACCOUNT&&t)return r?l.qy`<wui-compatible-network
        @click=${this.onReceiveClick.bind(this)}
        text="Only receive assets on this network"
        .networkImages=${[a.$m.getNetworkImage(r)??""]}
      ></wui-compatible-network>`:null;const n=e?.filter((e=>e?.imageId))?.slice(0,5),i=n.map(a.$m.getNetworkImage).filter(Boolean);return l.qy`<wui-compatible-network
      @click=${this.onReceiveClick.bind(this)}
      text="Only receive assets on these networks"
      .networkImages=${i}
    ></wui-compatible-network>`}onReceiveClick(){a.RouterController.push("WalletCompatibleNetworks")}onCopyClick(){try{this.address&&(a.wE.copyToClopboard(this.address),a.SnackController.showSuccess("Address copied"))}catch{a.SnackController.showError("Failed to copy")}}};ht.styles=lt,ut([(0,u.wk)()],ht.prototype,"address",void 0),ut([(0,u.wk)()],ht.prototype,"profileName",void 0),ut([(0,u.wk)()],ht.prototype,"network",void 0),ut([(0,u.wk)()],ht.prototype,"preferredAccountType",void 0),ht=ut([(0,c.customElement)("w3m-wallet-receive-view")],ht);const dt=l.AH`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`;var ft=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let pt=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.preferredAccountType=a.AccountController.state.preferredAccountType,this.unsubscribe.push(a.AccountController.subscribeKey("preferredAccountType",(e=>{this.preferredAccountType=e})))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){return l.qy` <wui-flex
      flexDirection="column"
      .padding=${["xs","s","m","s"]}
      gap="xs"
    >
      <wui-banner
        icon="warningCircle"
        text="You can only receive assets on these networks"
      ></wui-banner>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){const{approvedCaipNetworkIds:e,requestedCaipNetworks:t,caipNetwork:r}=a.NetworkController.state,n=a.NetworkController.checkIfSmartAccountEnabled();let i=a.wE.sortRequestedNetworks(e,t);if(n&&this.preferredAccountType===P.Vl.ACCOUNT_TYPES.SMART_ACCOUNT){if(!r)return null;i=[r]}return i.map((e=>l.qy`
        <wui-list-network
          imageSrc=${(0,h.J)(a.$m.getNetworkImage(e))}
          name=${e.name??"Unknown"}
          ?transparent=${!0}
        >
        </wui-list-network>
      `))}};pt.styles=dt,ft([(0,u.wk)()],pt.prototype,"preferredAccountType",void 0),pt=ft([(0,c.customElement)("w3m-wallet-compatible-networks-view")],pt);const gt=l.AH`
  :host {
    display: block;
  }

  wui-flex {
    position: relative;
  }

  wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xs) !important;
    border: 5px solid var(--wui-color-bg-125);
    background: var(--wui-color-bg-175);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  wui-button {
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }

  .inputContainer {
    height: fit-content;
  }
`;var mt=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let yt=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.token=a.Rv.state.token,this.sendTokenAmount=a.Rv.state.sendTokenAmount,this.receiverAddress=a.Rv.state.receiverAddress,this.receiverProfileName=a.Rv.state.receiverProfileName,this.loading=a.Rv.state.loading,this.gasPriceInUSD=a.Rv.state.gasPriceInUSD,this.message="Preview Send",this.fetchNetworkPrice(),this.unsubscribe.push(a.Rv.subscribe((e=>{this.token=e.token,this.sendTokenAmount=e.sendTokenAmount,this.receiverAddress=e.receiverAddress,this.gasPriceInUSD=e.gasPriceInUSD,this.receiverProfileName=e.receiverProfileName,this.loading=e.loading})))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){return this.getMessage(),l.qy` <wui-flex flexDirection="column" .padding=${["0","l","l","l"]}>
      <wui-flex class="inputContainer" gap="xs" flexDirection="column">
        <w3m-input-token
          .token=${this.token}
          .sendTokenAmount=${this.sendTokenAmount}
          .gasPriceInUSD=${this.gasPriceInUSD}
        ></w3m-input-token>
        <wui-icon-box
          size="inherit"
          backgroundColor="fg-300"
          iconSize="lg"
          iconColor="fg-250"
          background="opaque"
          icon="arrowBottom"
        ></wui-icon-box>
        <w3m-input-address
          .value=${this.receiverProfileName?this.receiverProfileName:this.receiverAddress}
        ></w3m-input-address>
      </wui-flex>
      <wui-flex .margin=${["l","0","0","0"]}>
        <wui-button
          @click=${this.onButtonClick.bind(this)}
          ?disabled=${!this.message.startsWith("Preview Send")}
          size="lg"
          variant="main"
          ?loading=${this.loading}
          fullWidth
        >
          ${this.message}
        </wui-button>
      </wui-flex>
    </wui-flex>`}async fetchNetworkPrice(){await a.GN.getNetworkTokenPrice();const e=await a.GN.getInitialGasPrice();e?.gasPrice&&e?.gasPriceInUSD&&(a.Rv.setGasPrice(e.gasPrice),a.Rv.setGasPriceInUsd(e.gasPriceInUSD))}onButtonClick(){a.RouterController.push("WalletSendPreview")}getMessage(){this.message="Preview Send",this.receiverAddress&&!a.wE.isAddress(this.receiverAddress)&&(this.message="Invalid Address"),this.receiverAddress||(this.message="Add Address"),this.sendTokenAmount&&this.token&&this.sendTokenAmount>Number(this.token.quantity.numeric)&&(this.message="Insufficient Funds"),this.sendTokenAmount||(this.message="Add Amount"),this.sendTokenAmount&&this.token?.price&&(this.sendTokenAmount*this.token.price||(this.message="Incorrect Value")),this.token||(this.message="Select Token")}};yt.styles=gt,mt([(0,u.wk)()],yt.prototype,"token",void 0),mt([(0,u.wk)()],yt.prototype,"sendTokenAmount",void 0),mt([(0,u.wk)()],yt.prototype,"receiverAddress",void 0),mt([(0,u.wk)()],yt.prototype,"receiverProfileName",void 0),mt([(0,u.wk)()],yt.prototype,"loading",void 0),mt([(0,u.wk)()],yt.prototype,"gasPriceInUSD",void 0),mt([(0,u.wk)()],yt.prototype,"message",void 0),yt=mt([(0,c.customElement)("w3m-wallet-send-view")],yt);const wt=l.AH`
  .contentContainer {
    height: 440px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }

  wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }
`;var bt=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let vt=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.tokenBalance=a.AccountController.state.tokenBalance,this.search="",this.onDebouncedSearch=a.wE.debounce((e=>{this.search=e})),this.unsubscribe.push(a.AccountController.subscribe((e=>{this.tokenBalance=e.tokenBalance})))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){return l.qy`
      <wui-flex flexDirection="column">
        ${this.templateSearchInput()} <wui-separator></wui-separator> ${this.templateTokens()}
      </wui-flex>
    `}templateSearchInput(){return l.qy`
      <wui-flex gap="xs" padding="s">
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `}templateTokens(){return this.tokens=this.tokenBalance?.filter((e=>e.chainId===a.NetworkController.state.caipNetwork?.id)),this.search?this.filteredTokens=this.tokenBalance?.filter((e=>e.name.toLowerCase().includes(this.search.toLowerCase()))):this.filteredTokens=this.tokens,l.qy`
      <wui-flex
        class="contentContainer"
        flexDirection="column"
        .padding=${["0","s","0","s"]}
      >
        <wui-flex justifyContent="flex-start" .padding=${["m","s","s","s"]}>
          <wui-text variant="paragraph-500" color="fg-200">Your tokens</wui-text>
        </wui-flex>
        <wui-flex flexDirection="column" gap="xs">
          ${this.filteredTokens&&this.filteredTokens.length>0?this.filteredTokens.map((e=>l.qy`<wui-list-token
                    @click=${this.handleTokenClick.bind(this,e)}
                    ?clickable=${!0}
                    tokenName=${e.name}
                    tokenImageUrl=${e.iconUrl}
                    tokenAmount=${e.quantity.numeric}
                    tokenValue=${e.value}
                    tokenCurrency=${e.symbol}
                  ></wui-list-token>`)):l.qy`<wui-flex
                .padding=${["4xl","0","0","0"]}
                alignItems="center"
                flexDirection="column"
                gap="l"
              >
                <wui-icon-box
                  icon="coinPlaceholder"
                  size="inherit"
                  iconColor="fg-200"
                  backgroundColor="fg-200"
                  iconSize="lg"
                ></wui-icon-box>
                <wui-flex
                  class="textContent"
                  gap="xs"
                  flexDirection="column"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <wui-text variant="paragraph-500" align="center" color="fg-100"
                    >No tokens found</wui-text
                  >
                  <wui-text variant="small-400" align="center" color="fg-200"
                    >Your tokens will appear here</wui-text
                  >
                </wui-flex>
                <wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>
              </wui-flex>`}
        </wui-flex>
      </wui-flex>
    `}onBuyClick(){a.RouterController.push("OnRampProviders")}onInputChange(e){this.onDebouncedSearch(e.detail)}handleTokenClick(e){a.Rv.setToken(e),a.Rv.setTokenAmount(void 0),a.RouterController.goBack()}};vt.styles=wt,bt([(0,u.wk)()],vt.prototype,"tokenBalance",void 0),bt([(0,u.wk)()],vt.prototype,"tokens",void 0),bt([(0,u.wk)()],vt.prototype,"filteredTokens",void 0),bt([(0,u.wk)()],vt.prototype,"search",void 0),vt=bt([(0,c.customElement)("w3m-wallet-send-select-token-view")],vt);const At=l.AH`
  wui-avatar,
  wui-image {
    display: ruby;
    width: 32px;
    height: 32px;
    border-radius: var(--wui-border-radius-3xl);
  }

  .sendButton {
    width: 70%;
    --local-width: 100% !important;
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }

  .cancelButton {
    width: 30%;
    --local-width: 100% !important;
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }
`;var Et=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let xt=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.token=a.Rv.state.token,this.sendTokenAmount=a.Rv.state.sendTokenAmount,this.receiverAddress=a.Rv.state.receiverAddress,this.receiverProfileName=a.Rv.state.receiverProfileName,this.receiverProfileImageUrl=a.Rv.state.receiverProfileImageUrl,this.gasPriceInUSD=a.Rv.state.gasPriceInUSD,this.caipNetwork=a.NetworkController.state.caipNetwork,this.unsubscribe.push(a.Rv.subscribe((e=>{this.token=e.token,this.sendTokenAmount=e.sendTokenAmount,this.receiverAddress=e.receiverAddress,this.gasPriceInUSD=e.gasPriceInUSD,this.receiverProfileName=e.receiverProfileName,this.receiverProfileImageUrl=e.receiverProfileImageUrl})),a.NetworkController.subscribeKey("caipNetwork",(e=>this.caipNetwork=e)))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){return l.qy` <wui-flex flexDirection="column" .padding=${["0","l","l","l"]}>
      <wui-flex gap="xs" flexDirection="column" .padding=${["0","xs","0","xs"]}>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-flex flexDirection="column" gap="4xs">
            <wui-text variant="small-400" color="fg-150">Send</wui-text>
            ${this.sendValueTemplate()}
          </wui-flex>
          <wui-preview-item
            text="${this.sendTokenAmount?c.UiHelperUtil.roundNumber(this.sendTokenAmount,6,5):"unknown"} ${this.token?.symbol}"
            .imageSrc=${this.token?.iconUrl}
          ></wui-preview-item>
        </wui-flex>
        <wui-flex>
          <wui-icon color="fg-200" size="md" name="arrowBottom"></wui-icon>
        </wui-flex>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="small-400" color="fg-150">To</wui-text>
          <wui-preview-item
            text="${this.receiverProfileName?c.UiHelperUtil.getTruncateString({string:this.receiverProfileName,charsStart:20,charsEnd:0,truncate:"end"}):c.UiHelperUtil.getTruncateString({string:this.receiverAddress?this.receiverAddress:"",charsStart:4,charsEnd:4,truncate:"middle"})}"
            address=${this.receiverAddress??""}
            .imageSrc=${this.receiverProfileImageUrl??void 0}
            .isAddress=${!0}
          ></wui-preview-item>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" .padding=${["xxl","0","0","0"]}>
        <w3m-wallet-send-details
          .caipNetwork=${this.caipNetwork}
          .receiverAddress=${this.receiverAddress}
          .networkFee=${this.gasPriceInUSD}
        ></w3m-wallet-send-details>
        <wui-flex justifyContent="center" gap="xxs" .padding=${["s","0","0","0"]}>
          <wui-icon size="sm" color="fg-200" name="warningCircle"></wui-icon>
          <wui-text variant="small-400" color="fg-200">Review transaction carefully</wui-text>
        </wui-flex>
        <wui-flex justifyContent="center" gap="s" .padding=${["l","0","0","0"]}>
          <wui-button
            class="cancelButton"
            @click=${this.onCancelClick.bind(this)}
            size="lg"
            variant="neutral"
          >
            Cancel
          </wui-button>
          <wui-button
            class="sendButton"
            @click=${this.onSendClick.bind(this)}
            size="lg"
            variant="main"
          >
            Send
          </wui-button>
        </wui-flex>
      </wui-flex></wui-flex
    >`}sendValueTemplate(){if(this.token&&this.sendTokenAmount){const e=this.token.price*this.sendTokenAmount;return l.qy`<wui-text variant="paragraph-400" color="fg-100"
        >$${e.toFixed(2)}</wui-text
      >`}return null}onSendClick(){a.Rv.sendToken()}onCancelClick(){a.RouterController.goBack()}};xt.styles=At,Et([(0,u.wk)()],xt.prototype,"token",void 0),Et([(0,u.wk)()],xt.prototype,"sendTokenAmount",void 0),Et([(0,u.wk)()],xt.prototype,"receiverAddress",void 0),Et([(0,u.wk)()],xt.prototype,"receiverProfileName",void 0),Et([(0,u.wk)()],xt.prototype,"receiverProfileImageUrl",void 0),Et([(0,u.wk)()],xt.prototype,"gasPriceInUSD",void 0),Et([(0,u.wk)()],xt.prototype,"caipNetwork",void 0),xt=Et([(0,c.customElement)("w3m-wallet-send-preview-view")],xt);const Ct=l.AH`
  wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }
  wui-flex::-webkit-scrollbar {
    display: none;
  }
`;let St=class extends l.WF{render(){return l.qy`
      <wui-flex flexDirection="column" padding="s" gap="xs">
        <w3m-wallet-login-list></w3m-wallet-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}};St.styles=Ct,St=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-connect-wallets-view")],St);const kt=l.AH`
  wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }
  wui-flex::-webkit-scrollbar {
    display: none;
  }
`;let _t=class extends l.WF{render(){return l.qy`
      <wui-flex flexDirection="column" padding="s" gap="xs">
        <w3m-social-login-list></w3m-social-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}};_t.styles=kt,_t=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-connect-socials-view")],_t);const It=l.AH`
  wui-logo {
    width: 80px;
    height: 80px;
    border-radius: var(--wui-border-radius-m);
  }
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }
  wui-flex:first-child:not(:only-child) {
    position: relative;
  }
  wui-loading-thumbnail {
    position: absolute;
  }
  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-lg);
  }
  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }
  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }
  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
  .capitalize {
    text-transform: capitalize;
  }
`,Mt=[{label:"Tokens"},{label:"NFTs"},{label:"Activity"}],Tt="MISSING_ENV_VAR".NEXT_PUBLIC_SECURE_SITE_ORIGIN||"https://secure.walletconnect.com";var Pt=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Ot=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.socialProvider=a.AccountController.state.socialProvider,this.socialWindow=a.AccountController.state.socialWindow,this.error=!1,this.connecting=!1,this.message="Connect in the provider window",this.authConnector=a.ConnectorController.getAuthConnector(),this.handleSocialConnection=async e=>{if(e.data?.resultUri)if(e.origin===Tt){window.removeEventListener("message",this.handleSocialConnection,!1);try{if(this.authConnector&&!this.connecting){this.socialWindow&&(this.socialWindow.close(),a.AccountController.setSocialWindow(void 0)),this.connecting=!0,this.updateMessage();const t=e.data.resultUri;await this.authConnector.provider.connectSocial(t),this.socialProvider&&a.iT.setConnectedSocialProvider(this.socialProvider),await a.ConnectionController.connectExternal(this.authConnector)}}catch(e){this.error=!0,this.updateMessage()}}else a.RouterController.goBack(),a.SnackController.showError("Untrusted Origin")},this.unsubscribe.push(a.AccountController.subscribe((e=>{e.socialProvider&&(this.socialProvider=e.socialProvider),e.socialWindow&&(this.socialWindow=e.socialWindow),e.address&&a.W3.state.open&&a.W3.close()}))),this.authConnector&&this.connectSocial()}disconnectedCallback(){this.unsubscribe.forEach((e=>e())),window.removeEventListener("message",this.handleSocialConnection,!1)}render(){return l.qy`
      <wui-flex
        data-error=${(0,h.J)(this.error)}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo=${(0,h.J)(this.socialProvider)}></wui-logo>
          ${this.error?null:this.loaderTemplate()}
          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100"
            >Log in with
            <span class="capitalize">${this.socialProvider??"Social"}</span></wui-text
          >
          <wui-text align="center" variant="small-400" color=${this.error?"error-100":"fg-200"}
            >${this.message}</wui-text
          ></wui-flex
        >
      </wui-flex>
    `}loaderTemplate(){const e=a.ThemeController.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return l.qy`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}connectSocial(){window.addEventListener("message",this.handleSocialConnection,!1)}updateMessage(){this.error?this.message="Something went wrong":this.connecting?this.message="Retrieving user data":this.message="Connect in the provider window"}};Ot.styles=It,Pt([(0,u.wk)()],Ot.prototype,"socialProvider",void 0),Pt([(0,u.wk)()],Ot.prototype,"socialWindow",void 0),Pt([(0,u.wk)()],Ot.prototype,"error",void 0),Pt([(0,u.wk)()],Ot.prototype,"connecting",void 0),Pt([(0,u.wk)()],Ot.prototype,"message",void 0),Ot=Pt([(0,c.customElement)("w3m-connecting-social-view")],Ot);const Rt=l.AH`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 76px);
  }

  @media (max-width: 435px) {
    wui-grid {
      grid-template-columns: repeat(auto-fill, 77px);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;function Nt(e){const{connectors:t}=a.ConnectorController.state,r=t.filter((e=>"ANNOUNCED"===e.type)).reduce(((e,t)=>t.info?.rdns?(e[t.info.rdns]=!0,e):e),{}),n=e.map((e=>({...e,installed:Boolean(e.rdns)&&Boolean(r[e.rdns??""])}))).sort(((e,t)=>Number(t.installed)-Number(e.installed)));return n}var Bt=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};const Ut="local-paginator";let Dt=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.initial=!a.ApiController.state.wallets.length,this.wallets=a.ApiController.state.wallets,this.recommended=a.ApiController.state.recommended,this.featured=a.ApiController.state.featured,this.unsubscribe.push(a.ApiController.subscribeKey("wallets",(e=>this.wallets=e)),a.ApiController.subscribeKey("recommended",(e=>this.recommended=e)),a.ApiController.subscribeKey("featured",(e=>this.featured=e)))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach((e=>e())),this.paginationObserver?.disconnect()}render(){return l.qy`
      <wui-grid
        data-scroll=${!this.initial}
        .padding=${["0","s","s","s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.initial?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){const e=this.shadowRoot?.querySelector("wui-grid");this.initial&&e&&(await a.ApiController.fetchWallets({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.initial=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(e,t){return[...Array(e)].map((()=>l.qy`
        <wui-card-select-loader type="wallet" id=${(0,h.J)(t)}></wui-card-select-loader>
      `))}walletsTemplate(){return Nt([...this.featured,...this.recommended,...this.wallets]).map((e=>l.qy`
        <wui-card-select
          imageSrc=${(0,h.J)(a.$m.getWalletImage(e))}
          type="wallet"
          name=${e.name}
          @click=${()=>this.onConnectWallet(e)}
          .installed=${e.installed}
        ></wui-card-select>
      `))}paginationLoaderTemplate(){const{wallets:e,recommended:t,featured:r,count:n}=a.ApiController.state,i=window.innerWidth<352?3:4,s=e.length+t.length;let o=Math.ceil(s/i)*i-s+i;return o-=e.length?r.length%i:0,0===n&&r.length>0?null:0===n||[...r,...e,...t].length<n?this.shimmerTemplate(o,Ut):null}createPaginationObserver(){const e=this.shadowRoot?.querySelector(`#${Ut}`);e&&(this.paginationObserver=new IntersectionObserver((([e])=>{if(e?.isIntersecting&&!this.initial){const{page:e,count:t,wallets:r}=a.ApiController.state;r.length<t&&a.ApiController.fetchWallets({page:e+1})}})),this.paginationObserver.observe(e))}onConnectWallet(e){const t=a.ConnectorController.getConnector(e.id,e.rdns);t?a.RouterController.push("ConnectingExternal",{connector:t}):a.RouterController.push("ConnectingWalletConnect",{wallet:e})}};Dt.styles=Rt,Bt([(0,u.wk)()],Dt.prototype,"initial",void 0),Bt([(0,u.wk)()],Dt.prototype,"wallets",void 0),Bt([(0,u.wk)()],Dt.prototype,"recommended",void 0),Bt([(0,u.wk)()],Dt.prototype,"featured",void 0),Dt=Bt([(0,c.customElement)("w3m-all-wallets-list")],Dt);const Lt=l.AH`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }
`;var Ft=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let jt=class extends l.WF{constructor(){super(...arguments),this.prevQuery="",this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?l.qy`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){this.query.trim()!==this.prevQuery.trim()&&(this.prevQuery=this.query,this.loading=!0,await a.ApiController.searchWallet({search:this.query}),this.loading=!1)}walletsTemplate(){const{search:e}=a.ApiController.state,t=Nt(e);return e.length?l.qy`
      <wui-grid
        .padding=${["0","s","s","s"]}
        gridTemplateColumns="repeat(4, 1fr)"
        rowGap="l"
        columnGap="xs"
      >
        ${t.map((e=>l.qy`
            <wui-card-select
              imageSrc=${(0,h.J)(a.$m.getWalletImage(e))}
              type="wallet"
              name=${e.name}
              @click=${()=>this.onConnectWallet(e)}
              .installed=${e.installed}
            ></wui-card-select>
          `))}
      </wui-grid>
    `:l.qy`
        <wui-flex justifyContent="center" alignItems="center" gap="s" flexDirection="column">
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text color="fg-200" variant="paragraph-500">No Wallet found</wui-text>
        </wui-flex>
      `}onConnectWallet(e){const t=a.ConnectorController.getConnector(e.id,e.rdns);t?a.RouterController.push("ConnectingExternal",{connector:t}):a.RouterController.push("ConnectingWalletConnect",{wallet:e})}};jt.styles=Lt,Ft([(0,u.wk)()],jt.prototype,"loading",void 0),Ft([(0,u.MZ)()],jt.prototype,"query",void 0),jt=Ft([(0,c.customElement)("w3m-all-wallets-search")],jt);var Ht=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let zt=class extends l.WF{constructor(){super(),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0,this.buffering=!1,this.unsubscribe.push(a.ConnectionController.subscribeKey("buffering",(e=>this.buffering=e)))}disconnectCallback(){this.unsubscribe.forEach((e=>e()))}render(){const e=this.generateTabs();return l.qy`
      <wui-flex justifyContent="center" .padding=${["0","0","l","0"]}>
        <wui-tabs
          ?disabled=${this.buffering}
          .tabs=${e}
          .onTabChange=${this.onTabChange.bind(this)}
        ></wui-tabs>
      </wui-flex>
    `}generateTabs(){const e=this.platforms.map((e=>"browser"===e?{label:"Browser",icon:"extension",platform:"browser"}:"mobile"===e?{label:"Mobile",icon:"mobile",platform:"mobile"}:"qrcode"===e?{label:"Mobile",icon:"mobile",platform:"qrcode"}:"web"===e?{label:"Webapp",icon:"browser",platform:"web"}:"desktop"===e?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"}));return this.platformTabs=e.map((({platform:e})=>e)),e}onTabChange(e){const t=this.platformTabs[e];t&&this.onSelectPlatfrom?.(t)}};Ht([(0,u.MZ)({type:Array})],zt.prototype,"platforms",void 0),Ht([(0,u.MZ)()],zt.prototype,"onSelectPlatfrom",void 0),Ht([(0,u.wk)()],zt.prototype,"buffering",void 0),zt=Ht([(0,c.customElement)("w3m-connecting-header")],zt);let qt=class extends G{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),a.En.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}async onConnectProxy(){try{this.error=!1;const{connectors:e}=a.ConnectorController.state,t=e.find((e=>"ANNOUNCED"===e.type&&e.info?.rdns===this.wallet?.rdns)),r=e.find((e=>"INJECTED"===e.type));t?await a.ConnectionController.connectExternal(t):r&&await a.ConnectionController.connectExternal(r),a.W3.close(),a.En.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.wallet?.name||"Unknown"}})}catch(e){a.En.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),this.error=!0}}};qt=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-connecting-wc-browser")],qt);let $t=class extends G{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),a.En.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop"}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.timeout=setTimeout((()=>{this.onConnect?.()}),200))}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;const{desktop_link:e,name:t}=this.wallet,{redirect:r,href:n}=a.wE.formatNativeUrl(e,this.uri);a.ConnectionController.setWcLinking({name:t,href:n}),a.ConnectionController.setRecentWallet(this.wallet),a.wE.openHref(r,"_blank")}catch{this.error=!0}}};$t=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-connecting-wc-desktop")],$t);let Wt=class extends G{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-mobile: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),document.addEventListener("visibilitychange",this.onBuffering.bind(this)),a.En.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile"}})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this.onBuffering.bind(this))}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.mobile_link&&this.uri)try{this.error=!1;const{mobile_link:e,name:t}=this.wallet,{redirect:r,href:n}=a.wE.formatNativeUrl(e,this.uri);a.ConnectionController.setWcLinking({name:t,href:n}),a.ConnectionController.setRecentWallet(this.wallet),a.wE.openHref(r,"_self")}catch{this.error=!0}}onBuffering(){const e=a.wE.isIos();"visible"===document?.visibilityState&&!this.error&&e&&(a.ConnectionController.setBuffering(!0),setTimeout((()=>{a.ConnectionController.setBuffering(!1)}),5e3))}};Wt=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-connecting-wc-mobile")],Wt);const Gt=l.AH`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`;let Vt=class extends G{constructor(){super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),a.En.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet?.name??"WalletConnect",platform:"qrcode"}})}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),l.qy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","xl","xl","xl"]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout((()=>{this.ready=!0}),200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const e=this.getBoundingClientRect().width-40,t=this.wallet?this.wallet.name:void 0;return a.ConnectionController.setWcLinking(void 0),a.ConnectionController.setRecentWallet(this.wallet),l.qy` <wui-qr-code
      size=${e}
      theme=${a.ThemeController.state.themeMode}
      uri=${this.uri}
      imageSrc=${(0,h.J)(a.$m.getWalletImage(this.wallet))}
      alt=${(0,h.J)(t)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){const e=!this.uri||!this.ready;return l.qy`<wui-link
      .disabled=${e}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};Vt.styles=Gt,Vt=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-connecting-wc-qrcode")],Vt);let Kt=class extends l.WF{constructor(){if(super(),this.wallet=a.RouterController.state.data?.wallet,!this.wallet)throw new Error("w3m-connecting-wc-unsupported: No wallet provided");a.En.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}render(){return l.qy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${(0,h.J)(a.$m.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};Kt=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-connecting-wc-unsupported")],Kt);let Zt=class extends G{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel="Open and continue in a new browser tab",this.secondaryBtnIcon="externalLink",a.En.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web"}})}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;const{webapp_link:e,name:t}=this.wallet,{redirect:r,href:n}=a.wE.formatUniversalUrl(e,this.uri);a.ConnectionController.setWcLinking({name:t,href:n}),a.ConnectionController.setRecentWallet(this.wallet),a.wE.openHref(r,"_blank")}catch{this.error=!0}}};Zt=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-connecting-wc-web")],Zt);const Qt=l.AH`
  :host {
    width: 100%;
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    cursor: pointer;
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    padding-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s);
    padding-left: var(--wui-spacing-s);
    padding-right: var(--wui-spacing-1xs);
    border-radius: calc(var(--wui-border-radius-5xs) + var(--wui-border-radius-4xs));
    background: var(--wui-color-gray-glass-002);
  }

  .details-row-title {
    white-space: nowrap;
  }

  .details-row.provider-free-row {
    padding-right: var(--wui-spacing-xs);
  }
`;var Jt=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};const Yt=a.oU.CONVERT_SLIPPAGE_TOLERANCE;let Xt=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.networkName=a.NetworkController.state.caipNetwork?.name,this.detailsOpen=!1,this.sourceToken=a.GN.state.sourceToken,this.toToken=a.GN.state.toToken,this.toTokenAmount=a.GN.state.toTokenAmount,this.sourceTokenPriceInUSD=a.GN.state.sourceTokenPriceInUSD,this.toTokenPriceInUSD=a.GN.state.toTokenPriceInUSD,this.gasPriceInUSD=a.GN.state.gasPriceInUSD,this.priceImpact=a.GN.state.priceImpact,this.maxSlippage=a.GN.state.maxSlippage,this.networkTokenSymbol=a.GN.state.networkTokenSymbol,this.inputError=a.GN.state.inputError,this.unsubscribe.push(a.GN.subscribe((e=>{this.sourceToken=e.sourceToken,this.toToken=e.toToken,this.toTokenAmount=e.toTokenAmount,this.gasPriceInUSD=e.gasPriceInUSD,this.priceImpact=e.priceImpact,this.maxSlippage=e.maxSlippage,this.sourceTokenPriceInUSD=e.sourceTokenPriceInUSD,this.toTokenPriceInUSD=e.toTokenPriceInUSD,this.inputError=e.inputError})))}render(){const e=this.toTokenAmount&&this.maxSlippage?J.Se.bigNumber(this.toTokenAmount).minus(this.maxSlippage).toString():null;if(!this.sourceToken||!this.toToken||this.inputError)return null;const t=this.sourceTokenPriceInUSD&&this.toTokenPriceInUSD?1/this.toTokenPriceInUSD*this.sourceTokenPriceInUSD:0;return l.qy`
      <wui-flex flexDirection="column" alignItems="center" gap="1xs" class="details-container">
        <wui-flex flexDirection="column">
          <button @click=${this.toggleDetails.bind(this)}>
            <wui-flex justifyContent="space-between" .padding=${["0","xs","0","xs"]}>
              <wui-flex justifyContent="flex-start" flexGrow="1" gap="xs">
                <wui-text variant="small-400" color="fg-100">
                  1 ${this.sourceToken.symbol} =
                  ${c.UiHelperUtil.formatNumberToLocalString(t,3)}
                  ${this.toToken.symbol}
                </wui-text>
                <wui-text variant="small-400" color="fg-200">
                  $${c.UiHelperUtil.formatNumberToLocalString(this.sourceTokenPriceInUSD)}
                </wui-text>
              </wui-flex>
              <wui-icon name="chevronBottom"></wui-icon>
            </wui-flex>
          </button>
          ${this.detailsOpen?l.qy`
                <wui-flex flexDirection="column" gap="xs" class="details-content-container">
                  <wui-flex flexDirection="column" gap="xs">
                    <wui-flex
                      justifyContent="space-between"
                      alignItems="center"
                      class="details-row"
                    >
                      <wui-flex alignItems="center" gap="xs">
                        <wui-text class="details-row-title" variant="small-400" color="fg-150">
                          Network cost
                        </wui-text>
                        <w3m-tooltip-trigger
                          text=${`Network cost is paid in ${this.networkTokenSymbol} on the ${this.networkName} network in order to execute transaction.`}
                        >
                          <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                        </w3m-tooltip-trigger>
                      </wui-flex>
                      <wui-text variant="small-400" color="fg-100">
                        $${c.UiHelperUtil.formatNumberToLocalString(this.gasPriceInUSD,3)}
                      </wui-text>
                    </wui-flex>
                  </wui-flex>
                  ${this.priceImpact?l.qy` <wui-flex flexDirection="column" gap="xs">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="xs">
                            <wui-text class="details-row-title" variant="small-400" color="fg-150">
                              Price impact
                            </wui-text>
                            <w3m-tooltip-trigger
                              text="Price impact reflects the change in market price due to your trade"
                            >
                              <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="small-400" color="fg-200">
                              ${c.UiHelperUtil.formatNumberToLocalString(this.priceImpact,3)}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>`:null}
                  ${this.maxSlippage&&this.sourceToken.symbol?l.qy`<wui-flex flexDirection="column" gap="xs">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="xs">
                            <wui-text class="details-row-title" variant="small-400" color="fg-150">
                              Max. slippage
                            </wui-text>
                            <w3m-tooltip-trigger
                              text=${"Max slippage sets the minimum amount you must receive for the transaction to proceed. "+(e?`Transaction will be reversed if you receive less than ${c.UiHelperUtil.formatNumberToLocalString(e,6)} ${this.toToken.symbol} due to price changes.`:"")}
                            >
                              <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="small-400" color="fg-200">
                              ${c.UiHelperUtil.formatNumberToLocalString(this.maxSlippage,6)}
                              ${this.toToken.symbol} ${Yt}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>`:null}
                  <wui-flex flexDirection="column" gap="xs">
                    <wui-flex
                      justifyContent="space-between"
                      alignItems="center"
                      class="details-row provider-free-row"
                    >
                      <wui-flex alignItems="center" gap="xs">
                        <wui-text class="details-row-title" variant="small-400" color="fg-150">
                          Provider fee
                        </wui-text>
                      </wui-flex>
                      <wui-flex>
                        <wui-text variant="small-400" color="fg-200">0.85%</wui-text>
                      </wui-flex>
                    </wui-flex>
                  </wui-flex>
                </wui-flex>
              `:null}
        </wui-flex>
      </wui-flex>
    `}toggleDetails(){this.detailsOpen=!this.detailsOpen}};Xt.styles=[Qt],Jt([(0,u.wk)()],Xt.prototype,"networkName",void 0),Jt([(0,u.MZ)()],Xt.prototype,"detailsOpen",void 0),Jt([(0,u.wk)()],Xt.prototype,"sourceToken",void 0),Jt([(0,u.wk)()],Xt.prototype,"toToken",void 0),Jt([(0,u.wk)()],Xt.prototype,"toTokenAmount",void 0),Jt([(0,u.wk)()],Xt.prototype,"sourceTokenPriceInUSD",void 0),Jt([(0,u.wk)()],Xt.prototype,"toTokenPriceInUSD",void 0),Jt([(0,u.wk)()],Xt.prototype,"gasPriceInUSD",void 0),Jt([(0,u.wk)()],Xt.prototype,"priceImpact",void 0),Jt([(0,u.wk)()],Xt.prototype,"maxSlippage",void 0),Jt([(0,u.wk)()],Xt.prototype,"networkTokenSymbol",void 0),Jt([(0,u.wk)()],Xt.prototype,"inputError",void 0),Xt=Jt([(0,c.customElement)("w3m-swap-details")],Xt);const er=l.AH`
  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-xl);
    padding-right: var(--wui-spacing-s);
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-002);
    position: relative;
    transition: box-shadow var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  :host wui-flex.focus {
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-005);
  }

  :host > wui-flex .swap-input,
  :host > wui-flex .swap-token-button {
    z-index: 10;
  }

  :host > wui-flex .swap-input {
    -webkit-mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
    mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
  }

  :host > wui-flex .swap-input input {
    background: none;
    border: none;
    height: 42px;
    width: 100%;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: -1.28px;
    outline: none;
    caret-color: var(--wui-color-accent-100);
    color: var(--wui-color-fg-100);
    padding: 0px;
  }

  :host > wui-flex .swap-input input:focus-visible {
    outline: none;
  }

  :host > wui-flex .swap-input input::-webkit-outer-spin-button,
  :host > wui-flex .swap-input input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .max-value-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: var(--wui-color-gray-glass-020);
    padding-left: 0px;
  }

  .market-value {
    min-height: 18px;
  }
`;var tr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let rr=class extends l.WF{constructor(){super(...arguments),this.focused=!1,this.price=0,this.target="sourceToken",this.onSetAmount=null,this.onSetMaxValue=null}render(){const e=this.marketValue||"0",t=J.Se.bigNumber(e).isGreaterThan("0");return l.qy`
      <wui-flex class="${this.focused?"focus":""}" justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
        >
          <input
            @focusin=${()=>this.onFocusChange(!0)}
            @focusout=${()=>this.onFocusChange(!1)}
            ?disabled=${this.disabled}
            .value=${this.value}
            @input=${this.dispatchInputChangeEvent}
            @keydown=${this.handleKeydown}
            placeholder="0"
            type="text"
            inputmode="decimal"
          />
          <wui-text class="market-value" variant="small-400" color="fg-200">
            ${t?`$${c.UiHelperUtil.formatNumberToLocalString(this.marketValue,3)}`:null}
          </wui-text>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `}handleKeydown(e){return J.t$.numericInputKeyDown(e,this.value,(e=>this.onSetAmount?.(this.target,e)))}dispatchInputChangeEvent(e){if(!this.onSetAmount)return;const t=e.target.value.replace(/[^0-9.]/gu,"");","===t||"."===t?this.onSetAmount(this.target,"0."):t.endsWith(",")?this.onSetAmount(this.target,t.replace(",",".")):this.onSetAmount(this.target,t)}setMaxValueToInput(){this.onSetMaxValue?.(this.target,this.balance)}templateTokenSelectButton(){return this.token?l.qy`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="xxs"
      >
        <wui-token-button
          text=${this.token.symbol}
          imageSrc=${this.token.logoUri}
          @click=${this.onSelectToken.bind(this)}
        >
        </wui-token-button>
        <wui-flex alignItems="center" gap="xxs"> ${this.tokenBalanceTemplate()} </wui-flex>
      </wui-flex>
    `:l.qy` <wui-button
        class="swap-token-button"
        size="md"
        variant="accent"
        @click=${this.onSelectToken.bind(this)}
      >
        Select token
      </wui-button>`}tokenBalanceTemplate(){const e=J.Se.multiply(this.balance,this.price),t=!!e&&e?.isGreaterThan(5e-5);return l.qy`
      ${t?l.qy`<wui-text variant="small-400" color="fg-200">
            ${c.UiHelperUtil.formatNumberToLocalString(this.balance,3)}
          </wui-text>`:null}
      ${"sourceToken"===this.target?this.tokenActionButtonTemplate(t):null}
    `}tokenActionButtonTemplate(e){return e?l.qy` <button class="max-value-button" @click=${this.setMaxValueToInput.bind(this)}>
        <wui-text color="accent-100" variant="small-600">Max</wui-text>
      </button>`:l.qy` <button class="max-value-button" @click=${this.onBuyToken.bind(this)}>
      <wui-text color="accent-100" variant="small-600">Buy</wui-text>
    </button>`}onFocusChange(e){this.focused=e}onSelectToken(){a.En.sendEvent({type:"track",event:"CLICK_SELECT_TOKEN_TO_SWAP"}),a.RouterController.push("SwapSelectToken",{target:this.target})}onBuyToken(){a.RouterController.push("OnRampProviders")}};rr.styles=[er],tr([(0,u.MZ)()],rr.prototype,"focused",void 0),tr([(0,u.MZ)()],rr.prototype,"balance",void 0),tr([(0,u.MZ)()],rr.prototype,"value",void 0),tr([(0,u.MZ)()],rr.prototype,"price",void 0),tr([(0,u.MZ)()],rr.prototype,"marketValue",void 0),tr([(0,u.MZ)()],rr.prototype,"disabled",void 0),tr([(0,u.MZ)()],rr.prototype,"target",void 0),tr([(0,u.MZ)()],rr.prototype,"token",void 0),tr([(0,u.MZ)()],rr.prototype,"onSetAmount",void 0),tr([(0,u.MZ)()],rr.prototype,"onSetMaxValue",void 0),rr=tr([(0,c.customElement)("w3m-swap-input")],rr);const nr=l.AH`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--wui-border-radius-s);
    padding: var(--wui-spacing-xl);
    padding-right: var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-002);
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    position: relative;
  }

  wui-shimmer.market-value {
    opacity: 0;
  }

  :host > wui-flex > svg.input_mask {
    position: absolute;
    inset: 0;
    z-index: 5;
  }

  :host wui-flex .input_mask__border,
  :host wui-flex .input_mask__background {
    transition: fill var(--wui-duration-md) var(--wui-ease-out-power-1);
    will-change: fill;
  }

  :host wui-flex .input_mask__border {
    fill: var(--wui-color-gray-glass-020);
  }

  :host wui-flex .input_mask__background {
    fill: var(--wui-color-gray-glass-002);
  }
`;var ir=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let sr=class extends l.WF{constructor(){super(...arguments),this.target="sourceToken"}render(){return l.qy`
      <wui-flex class justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
          gap="xxs"
        >
          <wui-shimmer width="80px" height="40px" borderRadius="xxs" variant="light"></wui-shimmer>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `}templateTokenSelectButton(){return l.qy`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="xxs"
      >
        <wui-shimmer width="80px" height="40px" borderRadius="3xl" variant="light"></wui-shimmer>
      </wui-flex>
    `}};sr.styles=[nr],ir([(0,u.MZ)()],sr.prototype,"target",void 0),sr=ir([(0,c.customElement)("w3m-swap-input-skeleton")],sr);const or=l.AH`
  :host {
    height: 64px;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-icon-link[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }
`;var ar=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};const cr=["Swap","SwapSelectToken","SwapPreview"];function lr(){const e=a.RouterController.state.data?.connector?.name,t=a.RouterController.state.data?.wallet?.name,r=a.RouterController.state.data?.network?.name,n=t??e,i=a.ConnectorController.getConnectors();return{Connect:`Connect ${1===i.length&&"w3m-email"===i[0]?.id?"Email":""} Wallet`,ChooseAccountName:void 0,Account:void 0,AccountSettings:void 0,ConnectingExternal:n??"Connect Wallet",ConnectingWalletConnect:n??"WalletConnect",ConnectingSiwe:"Sign In",Networks:"Choose Network",SwitchNetwork:r??"Switch Network",AllWallets:"All Wallets",WhatIsANetwork:"What is a network?",WhatIsAWallet:"What is a wallet?",GetWallet:"Get a wallet",Downloads:n?`Get ${n}`:"Downloads",EmailVerifyOtp:"Confirm Email",EmailVerifyDevice:"Register Device",ApproveTransaction:"Approve Transaction",Transactions:"Activity",UpgradeEmailWallet:"Upgrade your Wallet",UpgradeToSmartAccount:void 0,UpdateEmailWallet:"Edit Email",UpdateEmailPrimaryOtp:"Confirm Current Email",UpdateEmailSecondaryOtp:"Confirm New Email",UnsupportedChain:"Switch Network",OnRampProviders:"Choose Provider",OnRampActivity:"Activity",WhatIsABuy:"What is Buy?",BuyInProgress:"Buy",OnRampTokenSelect:"Select Token",OnRampFiatSelect:"Select Currency",RegisterAccountName:"Choose name",RegisterAccountNameSuccess:"",WalletReceive:"Receive",WalletCompatibleNetworks:"Compatible Networks",Swap:"Swap",SwapSelectToken:"Select token",SwapPreview:"Preview swap",WalletSend:"Send",WalletSendPreview:"Review send",WalletSendSelectToken:"Select Token",ConnectWallets:"Connect wallet",ConnectSocials:"All socials",ConnectingSocial:a.AccountController.state.socialProvider?a.AccountController.state.socialProvider:"Connect Social"}}let ur=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.heading=lr()[a.RouterController.state.view],this.buffering=!1,this.showBack=!1,this.unsubscribe.push(a.RouterController.subscribeKey("view",(e=>{this.onViewChange(e),this.onHistoryChange()})),a.ConnectionController.subscribeKey("buffering",(e=>this.buffering=e)))}disconnectCallback(){this.unsubscribe.forEach((e=>e()))}render(){return l.qy`
      <wui-flex .padding=${this.getPadding()} justifyContent="space-between" alignItems="center">
        ${this.dynamicButtonTemplate()} ${this.titleTemplate()}
        <wui-icon-link
          ?disabled=${this.buffering}
          icon="close"
          @click=${this.onClose.bind(this)}
          data-testid="w3m-header-close"
        ></wui-icon-link>
      </wui-flex>
    `}onWalletHelp(){a.En.sendEvent({type:"track",event:"CLICK_WALLET_HELP"}),a.RouterController.push("WhatIsAWallet")}async onClose(){if(a.OptionsController.state.isSiweEnabled){const{SIWEController:e}=await Promise.resolve().then(i.bind(i,8251));"success"!==e.state.status&&await a.ConnectionController.disconnect()}a.W3.close()}titleTemplate(){const e=cr.includes(a.RouterController.state.view);return l.qy`
      <wui-flex class="w3m-header-title" alignItems="center" gap="xs">
        <wui-text variant="paragraph-700" color="fg-100">${this.heading}</wui-text>
        ${e?l.qy`<wui-tag variant="main">Beta</wui-tag>`:null}
      </wui-flex>
    `}dynamicButtonTemplate(){const{view:e}=a.RouterController.state,t="Connect"===e,r="ApproveTransaction"===e||"UpgradeToSmartAccount"===e||"ConnectingSiwe"===e;return this.showBack&&!r?l.qy`<wui-icon-link
        id="dynamic"
        icon="chevronLeft"
        ?disabled=${this.buffering}
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-link>`:l.qy`<wui-icon-link
      data-hidden=${!t}
      id="dynamic"
      icon="helpCircle"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-link>`}getPadding(){return this.heading?["l","2l","l","2l"]:["l","2l","0","2l"]}async onViewChange(e){const t=this.shadowRoot?.querySelector("wui-flex.w3m-header-title");if(t){const r=lr()[e];await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.heading=r,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})}}async onHistoryChange(){const{history:e}=a.RouterController.state,t=this.shadowRoot?.querySelector("#dynamic");e.length>1&&!this.showBack&&t?(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!0,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})):e.length<=1&&this.showBack&&t&&(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!1,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}onGoBack(){a.RouterController.goBack()}};ur.styles=[or],ar([(0,u.wk)()],ur.prototype,"heading",void 0),ar([(0,u.wk)()],ur.prototype,"buffering",void 0),ar([(0,u.wk)()],ur.prototype,"showBack",void 0),ur=ar([(0,c.customElement)("w3m-header")],ur);var hr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let dr=class extends l.WF{constructor(){super(...arguments),this.data=[]}render(){return l.qy`
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        ${this.data.map((e=>l.qy`
            <wui-flex flexDirection="column" alignItems="center" gap="xl">
              <wui-flex flexDirection="row" justifyContent="center" gap="1xs">
                ${e.images.map((e=>l.qy`<wui-visual name=${e}></wui-visual>`))}
              </wui-flex>
            </wui-flex>
            <wui-flex flexDirection="column" alignItems="center" gap="xxs">
              <wui-text variant="paragraph-500" color="fg-100" align="center">
                ${e.title}
              </wui-text>
              <wui-text variant="small-500" color="fg-200" align="center">${e.text}</wui-text>
            </wui-flex>
          `))}
      </wui-flex>
    `}};hr([(0,u.MZ)({type:Array})],dr.prototype,"data",void 0),dr=hr([(0,c.customElement)("w3m-help-widget")],dr);const fr=l.AH`
  :host {
    width: 100%;
  }

  wui-loading-spinner {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }

  .currency-container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: var(--wui-spacing-1xs);
    height: 40px;
    padding: var(--wui-spacing-xs) var(--wui-spacing-1xs) var(--wui-spacing-xs)
      var(--wui-spacing-xs);
    min-width: 95px;
    border-radius: var(--FULL, 1000px);
    border: 1px solid var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    cursor: pointer;
  }

  .currency-container > wui-image {
    height: 24px;
    width: 24px;
    border-radius: 50%;
  }
`;var pr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let gr=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.type="Token",this.value=0,this.currencies=[],this.selectedCurrency=this.currencies?.[0],this.currencyImages=a.jQ.state.currencyImages,this.tokenImages=a.jQ.state.tokenImages,this.unsubscribe.push(a.aG.subscribeKey("purchaseCurrency",(e=>{e&&"Fiat"!==this.type&&(this.selectedCurrency=this.formatPurchaseCurrency(e))})),a.aG.subscribeKey("paymentCurrency",(e=>{e&&"Token"!==this.type&&(this.selectedCurrency=this.formatPaymentCurrency(e))})),a.aG.subscribe((e=>{"Fiat"===this.type?this.currencies=e.purchaseCurrencies.map(this.formatPurchaseCurrency):this.currencies=e.paymentCurrencies.map(this.formatPaymentCurrency)})),a.jQ.subscribe((e=>{this.currencyImages={...e.currencyImages},this.tokenImages={...e.tokenImages}})))}firstUpdated(){a.aG.getAvailableCurrencies()}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){const e=this.selectedCurrency?.symbol||"",t=this.currencyImages[e]||this.tokenImages[e];return l.qy`<wui-input-text type="number" size="lg" value=${this.value}>
      ${this.selectedCurrency?l.qy` <wui-flex
            class="currency-container"
            justifyContent="space-between"
            alignItems="center"
            gap="xxs"
            @click=${()=>a.W3.open({view:`OnRamp${this.type}Select`})}
          >
            <wui-image src=${(0,h.J)(t)}></wui-image>
            <wui-text color="fg-100">${this.selectedCurrency.symbol}</wui-text>
          </wui-flex>`:l.qy`<wui-loading-spinner></wui-loading-spinner>`}
    </wui-input-text>`}formatPaymentCurrency(e){return{name:e.id,symbol:e.id}}formatPurchaseCurrency(e){return{name:e.name,symbol:e.symbol}}};gr.styles=fr,pr([(0,u.MZ)({type:String})],gr.prototype,"type",void 0),pr([(0,u.MZ)({type:Number})],gr.prototype,"value",void 0),pr([(0,u.wk)()],gr.prototype,"currencies",void 0),pr([(0,u.wk)()],gr.prototype,"selectedCurrency",void 0),pr([(0,u.wk)()],gr.prototype,"currencyImages",void 0),pr([(0,u.wk)()],gr.prototype,"tokenImages",void 0),gr=pr([(0,c.customElement)("w3m-onramp-input")],gr);const mr=l.AH`
  wui-flex {
    background-color: var(--wui-color-gray-glass-005);
  }

  a {
    text-decoration: none;
    color: var(--wui-color-fg-175);
    font-weight: 500;
  }
`;let yr=class extends l.WF{render(){const{termsConditionsUrl:e,privacyPolicyUrl:t}=a.OptionsController.state;return e||t?l.qy`
      <wui-flex .padding=${["m","s","s","s"]} justifyContent="center">
        <wui-text color="fg-250" variant="small-400" align="center">
          By connecting your wallet, you agree to our <br />
          ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
        </wui-text>
      </wui-flex>
    `:null}andTemplate(){const{termsConditionsUrl:e,privacyPolicyUrl:t}=a.OptionsController.state;return e&&t?"and":""}termsTemplate(){const{termsConditionsUrl:e}=a.OptionsController.state;return e?l.qy`<a href=${e}>Terms of Service</a>`:null}privacyTemplate(){const{privacyPolicyUrl:e}=a.OptionsController.state;return e?l.qy`<a href=${e}>Privacy Policy</a>`:null}};yr.styles=[mr],yr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-legal-footer")],yr);const wr=l.AH`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`;var br=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let vr=class extends l.WF{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;const{name:e,app_store:t,play_store:r,chrome_store:n,homepage:i}=this.wallet,s=a.wE.isMobile(),o=a.wE.isIos(),u=a.wE.isAndroid(),h=[t,r,i,n].filter(Boolean).length>1,d=c.UiHelperUtil.getTruncateString({string:e,charsStart:12,charsEnd:0,truncate:"end"});return h&&!s?l.qy`
        <wui-cta-button
          label=${`Don't have ${d}?`}
          buttonLabel="Get"
          @click=${()=>a.RouterController.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!h&&i?l.qy`
        <wui-cta-button
          label=${`Don't have ${d}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:t&&o?l.qy`
        <wui-cta-button
          label=${`Don't have ${d}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:r&&u?l.qy`
        <wui-cta-button
          label=${`Don't have ${d}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){this.wallet?.app_store&&a.wE.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&a.wE.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&a.wE.openHref(this.wallet.homepage,"_blank")}};vr.styles=[wr],br([(0,u.MZ)({type:Object})],vr.prototype,"wallet",void 0),vr=br([(0,c.customElement)("w3m-mobile-download-links")],vr);const Ar=l.AH`
  wui-flex {
    border-top: 1px solid var(--wui-color-gray-glass-005);
  }

  a {
    text-decoration: none;
    color: var(--wui-color-fg-175);
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-3xs);
  }
`;let Er=class extends l.WF{render(){const{termsConditionsUrl:e,privacyPolicyUrl:t}=a.OptionsController.state;return e||t?l.qy`
      <wui-flex
        .padding=${["m","s","s","s"]}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="s"
      >
        <wui-text color="fg-250" variant="small-400" align="center">
          We work with the best providers to give you the lowest fees and best support. More options
          coming soon!
        </wui-text>

        ${this.howDoesItWorkTemplate()}
      </wui-flex>
    `:null}howDoesItWorkTemplate(){return l.qy` <wui-link @click=${this.onWhatIsBuy.bind(this)}>
      <wui-icon size="xs" color="accent-100" slot="iconLeft" name="helpCircle"></wui-icon>
      How does it work?
    </wui-link>`}onWhatIsBuy(){a.RouterController.push("WhatIsABuy")}};Er.styles=[Ar],Er=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-onramp-providers-footer")],Er);const xr=l.AH`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;var Cr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};const Sr={success:{backgroundColor:"success-100",iconColor:"success-100",icon:"checkmark"},error:{backgroundColor:"error-100",iconColor:"error-100",icon:"close"}};let kr=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=a.SnackController.state.open,this.unsubscribe.push(a.SnackController.subscribeKey("open",(e=>{this.open=e,this.onOpen()})))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach((e=>e()))}render(){const{message:e,variant:t}=a.SnackController.state,r=Sr[t];return l.qy`
      <wui-snackbar
        message=${e}
        backgroundColor=${r.backgroundColor}
        iconColor=${r.iconColor}
        icon=${r.icon}
      ></wui-snackbar>
    `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:"translateX(-50%) scale(0.85)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.timeout=setTimeout((()=>a.SnackController.hide()),2500)):this.animate([{opacity:1,transform:"translateX(-50%) scale(1)"},{opacity:0,transform:"translateX(-50%) scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"})}};kr.styles=xr,Cr([(0,u.wk)()],kr.prototype,"open",void 0),kr=Cr([(0,c.customElement)("w3m-snackbar")],kr);const _r=l.AH`
  wui-separator {
    margin: var(--wui-spacing-s) calc(var(--wui-spacing-s) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }

  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }

  wui-icon-link,
  wui-loading-spinner {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  wui-icon-link {
    right: var(--wui-spacing-xs);
  }

  wui-loading-spinner {
    right: var(--wui-spacing-m);
  }
`;var Ir=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Mr=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.formRef=(0,ne._)(),this.connectors=a.ConnectorController.state.connectors,this.email="",this.loading=!1,this.error="",this.unsubscribe.push(a.ConnectorController.subscribeKey("connectors",(e=>this.connectors=e)))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}firstUpdated(){this.formRef.value?.addEventListener("keydown",(e=>{"Enter"===e.key&&this.onSubmitEmail(e)}))}render(){const e=this.connectors.find((e=>"AUTH"===e.type)),t=this.connectors.length>1;return e?.email?l.qy`
      <form ${(0,ne.K)(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
        <wui-email-input
          @focus=${this.onFocusEvent.bind(this)}
          .disabled=${this.loading}
          @inputChange=${this.onEmailInputChange.bind(this)}
          .errorMessage=${this.error}
        >
        </wui-email-input>

        ${this.submitButtonTemplate()}${this.loadingTemplate()}
        <input type="submit" hidden />
      </form>

      ${e.socials||!t?null:l.qy`<wui-flex .padding=${["xxs","0","0","0"]}>
            <wui-separator text="or"></wui-separator>
          </wui-flex>`}
    `:null}submitButtonTemplate(){return!this.loading&&this.email.length>3?l.qy`
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitEmail.bind(this)}
          >
          </wui-icon-link>
        `:null}loadingTemplate(){return this.loading?l.qy`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:null}onEmailInputChange(e){this.email=e.detail.trim(),this.error=""}async onSubmitEmail(e){try{if(this.loading)return;this.loading=!0,e.preventDefault();const t=a.ConnectorController.getAuthConnector();if(!t)throw new Error("w3m-email-login-widget: Auth connector not found");const{action:r}=await t.provider.connectEmail({email:this.email});a.En.sendEvent({type:"track",event:"EMAIL_SUBMITTED"}),"VERIFY_OTP"===r?(a.En.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),a.RouterController.push("EmailVerifyOtp",{email:this.email})):"VERIFY_DEVICE"===r&&a.RouterController.push("EmailVerifyDevice",{email:this.email})}catch(e){const t=a.wE.parseError(e);t?.includes("Invalid email")?this.error="Invalid email. Try again.":a.SnackController.showError(e)}finally{this.loading=!1}}onFocusEvent(){a.En.sendEvent({type:"track",event:"EMAIL_LOGIN_SELECTED"})}};Mr.styles=_r,Ir([(0,u.wk)()],Mr.prototype,"connectors",void 0),Ir([(0,u.wk)()],Mr.prototype,"email",void 0),Ir([(0,u.wk)()],Mr.prototype,"loading",void 0),Ir([(0,u.wk)()],Mr.prototype,"error",void 0),Mr=Ir([(0,c.customElement)("w3m-email-login-widget")],Mr);const Tr=l.AH`
  wui-flex {
    width: 100%;
  }

  :host > wui-flex:first-child {
    transform: translateY(calc(var(--wui-spacing-xxs) * -1));
  }

  wui-icon-link {
    margin-right: calc(var(--wui-icon-box-size-md) * -1);
  }

  wui-notice-card {
    margin-bottom: var(--wui-spacing-3xs);
  }

  w3m-transactions-view {
    max-height: 200px;
  }

  .tab-content-container {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .tab-content-container::-webkit-scrollbar {
    display: none;
  }

  .account-button {
    width: auto;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-s);
    height: 48px;
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-s);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: 24px;
    transaction: background-color 0.2s linear;
  }

  .account-button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .avatar-container {
    position: relative;
  }

  wui-avatar.avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  wui-avatar.network-avatar {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 100%;
    top: 100%;
    transform: translate(-75%, -75%);
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  .account-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .account-links wui-flex {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background: red;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 10px;
    flex: 1 0 0;
    border-radius: var(--XS, 16px);
    border: 1px solid var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    background: var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  .account-links wui-flex:hover {
    background: var(--dark-accent-glass-015, rgba(71, 161, 255, 0.15));
  }

  .account-links wui-flex wui-icon {
    width: var(--S, 20px);
    height: var(--S, 20px);
  }

  .account-links wui-flex wui-icon svg path {
    stroke: #667dff;
  }
`;var Pr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Or=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.address=a.AccountController.state.address,this.profileImage=a.AccountController.state.profileImage,this.profileName=a.AccountController.state.profileName,this.network=a.NetworkController.state.caipNetwork,this.disconnecting=!1,this.balance=a.AccountController.state.balance,this.balanceSymbol=a.AccountController.state.balanceSymbol,this.unsubscribe.push(a.AccountController.subscribe((e=>{e.address?(this.address=e.address,this.profileImage=e.profileImage,this.profileName=e.profileName,this.balance=e.balance,this.balanceSymbol=e.balanceSymbol):this.disconnecting||a.SnackController.showError("Account not found")})),a.NetworkController.subscribeKey("caipNetwork",(e=>{e?.id&&(this.network=e)})))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){if(!this.address)throw new Error("w3m-account-view: No account provided");const e=a.$m.getNetworkImage(this.network);return l.qy`<wui-flex
        flexDirection="column"
        .padding=${["0","xl","m","xl"]}
        alignItems="center"
        gap="l"
      >
        <wui-avatar
          alt=${(0,h.J)(this.address)}
          address=${(0,h.J)(this.address)}
          imageSrc=${(0,h.J)(null===this.profileImage?void 0:this.profileImage)}
        ></wui-avatar>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-flex gap="3xs" alignItems="center" justifyContent="center">
            <wui-text variant="medium-title-600" color="fg-100">
              ${this.profileName?c.UiHelperUtil.getTruncateString({string:this.profileName,charsStart:20,charsEnd:0,truncate:"end"}):c.UiHelperUtil.getTruncateString({string:this.address?this.address:"",charsStart:4,charsEnd:4,truncate:"middle"})}
            </wui-text>
            <wui-icon-link
              size="md"
              icon="copy"
              iconColor="fg-200"
              @click=${this.onCopyAddress}
            ></wui-icon-link>
          </wui-flex>
          <wui-text variant="paragraph-500" color="fg-200"
            >${a.wE.formatBalance(this.balance,this.balanceSymbol)}</wui-text
          >
        </wui-flex>
        ${this.explorerBtnTemplate()}
      </wui-flex>

      <wui-flex flexDirection="column" gap="xs" .padding=${["0","s","s","s"]}>
        ${this.emailCardTemplate()} <w3m-account-auth-button></w3m-account-auth-button>

        <wui-list-item
          .variant=${e?"image":"icon"}
          iconVariant="overlay"
          icon="networkPlaceholder"
          imageSrc=${(0,h.J)(e)}
          ?chevron=${this.isAllowedNetworkSwitch()}
          @click=${this.onNetworks.bind(this)}
          data-testid="w3m-account-select-network"
        >
          <wui-text variant="paragraph-500" color="fg-100">
            ${this.network?.name??"Unknown"}
          </wui-text>
        </wui-list-item>
        ${this.onrampTemplate()}
        <wui-list-item
          iconVariant="blue"
          icon="swapHorizontalMedium"
          iconSize="sm"
          ?chevron=${!0}
          @click=${this.onTransactions.bind(this)}
        >
          <wui-text variant="paragraph-500" color="fg-100">Activity</wui-text>
        </wui-list-item>
        <wui-list-item
          variant="icon"
          iconVariant="overlay"
          icon="disconnect"
          ?chevron=${!1}
          .loading=${this.disconnecting}
          @click=${this.onDisconnect.bind(this)}
          data-testid="disconnect-button"
        >
          <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>`}onrampTemplate(){const{enableOnramp:e}=a.OptionsController.state;return e?l.qy`
      <wui-list-item
        iconVariant="blue"
        icon="card"
        ?chevron=${!0}
        @click=${this.handleClickPay.bind(this)}
      >
        <wui-text variant="paragraph-500" color="fg-100">Buy crypto</wui-text>
      </wui-list-item>
    `:null}emailCardTemplate(){const e=a.iT.getConnectedConnector(),t=a.ConnectorController.getAuthConnector(),{origin:r}=location;return!t||"AUTH"!==e||r.includes(a.oU.SECURE_SITE)?null:l.qy`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `}handleClickPay(){a.RouterController.push("OnRampProviders")}explorerBtnTemplate(){const{addressExplorerUrl:e}=a.AccountController.state;return e?l.qy`
      <wui-button size="md" variant="neutral" @click=${this.onExplorer.bind(this)}>
        <wui-icon size="sm" color="inherit" slot="iconLeft" name="compass"></wui-icon>
        Block Explorer
        <wui-icon size="sm" color="inherit" slot="iconRight" name="externalLink"></wui-icon>
      </wui-button>
    `:null}isAllowedNetworkSwitch(){const{requestedCaipNetworks:e}=a.NetworkController.state,t=!!e&&e.length>1,r=e?.find((({id:e})=>e===this.network?.id));return t||!r}onCopyAddress(){try{this.address&&(a.wE.copyToClopboard(this.address),a.SnackController.showSuccess("Address copied"))}catch{a.SnackController.showError("Failed to copy")}}onNetworks(){this.isAllowedNetworkSwitch()&&(a.En.sendEvent({type:"track",event:"CLICK_NETWORKS"}),a.RouterController.push("Networks"))}onTransactions(){a.En.sendEvent({type:"track",event:"CLICK_TRANSACTIONS"}),a.RouterController.push("Transactions")}async onDisconnect(){try{this.disconnecting=!0,await a.ConnectionController.disconnect(),a.En.sendEvent({type:"track",event:"DISCONNECT_SUCCESS"}),a.W3.close()}catch{a.En.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),a.SnackController.showError("Failed to disconnect")}finally{this.disconnecting=!1}}onExplorer(){const{addressExplorerUrl:e}=a.AccountController.state;e&&a.wE.openHref(e,"_blank")}onGoToUpgradeView(){a.En.sendEvent({type:"track",event:"EMAIL_UPGRADE_FROM_MODAL"}),a.RouterController.push("UpgradeEmailWallet")}};Or.styles=Tr,Pr([(0,u.wk)()],Or.prototype,"address",void 0),Pr([(0,u.wk)()],Or.prototype,"profileImage",void 0),Pr([(0,u.wk)()],Or.prototype,"profileName",void 0),Pr([(0,u.wk)()],Or.prototype,"network",void 0),Pr([(0,u.wk)()],Or.prototype,"disconnecting",void 0),Pr([(0,u.wk)()],Or.prototype,"balance",void 0),Pr([(0,u.wk)()],Or.prototype,"balanceSymbol",void 0),Or=Pr([(0,c.customElement)("w3m-account-default-widget")],Or);const Rr=l.AH`
  wui-flex {
    width: 100%;
  }

  wui-promo {
    position: absolute;
    top: -32px;
  }

  wui-profile-button {
    margin-top: calc(-1 * var(--wui-spacing-2l));
  }

  wui-promo + wui-profile-button {
    margin-top: var(--wui-spacing-2l);
  }

  wui-tabs {
    width: 100%;
  }

  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }
`;var Nr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Br=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.address=a.AccountController.state.address,this.profileImage=a.AccountController.state.profileImage,this.profileName=a.AccountController.state.profileName,this.smartAccountDeployed=a.AccountController.state.smartAccountDeployed,this.network=a.NetworkController.state.caipNetwork,this.currentTab=a.AccountController.state.currentTab,this.tokenBalance=a.AccountController.state.tokenBalance,this.preferredAccountType=a.AccountController.state.preferredAccountType,this.unsubscribe.push(a.AccountController.subscribe((e=>{e.address?(this.address=e.address,this.profileImage=e.profileImage,this.profileName=e.profileName,this.currentTab=e.currentTab,this.tokenBalance=e.tokenBalance,this.smartAccountDeployed=e.smartAccountDeployed,this.preferredAccountType=e.preferredAccountType):a.W3.close()})),a.NetworkController.subscribe((e=>{this.network=e.caipNetwork}))),this.watchSwapValues()}disconnectedCallback(){this.unsubscribe.forEach((e=>e())),clearInterval(this.watchTokenBalance)}firstUpdated(){a.AccountController.fetchTokenBalance()}render(){if(!this.address)throw new Error("w3m-account-view: No account provided");const e=a.$m.getNetworkImage(this.network);return l.qy`<wui-flex
      flexDirection="column"
      .padding=${["0","xl","m","xl"]}
      alignItems="center"
      gap="m"
    >
      ${this.activateAccountTemplate()}
      <wui-profile-button
        @click=${this.onProfileButtonClick.bind(this)}
        address=${(0,h.J)(this.address)}
        networkSrc=${(0,h.J)(e)}
        icon="chevronBottom"
        avatarSrc=${(0,h.J)(this.profileImage?this.profileImage:void 0)}
        profileName=${this.profileName}
      ></wui-profile-button>
      ${this.tokenBalanceTemplate()}
      <wui-flex gap="s">
        <w3m-tooltip-trigger text="Buy">
          <wui-icon-button @click=${this.onBuyClick.bind(this)} icon="card"></wui-icon-button>
        </w3m-tooltip-trigger>
        <w3m-tooltip-trigger text="Swap">
          <wui-icon-button @click=${this.onSwapClick.bind(this)} icon="recycleHorizontal">
          </wui-icon-button>
        </w3m-tooltip-trigger>
        <w3m-tooltip-trigger text="Receive">
          <wui-icon-button @click=${this.onReceiveClick.bind(this)} icon="arrowBottomCircle">
          </wui-icon-button>
        </w3m-tooltip-trigger>
        <w3m-tooltip-trigger text="Send">
          <wui-icon-button @click=${this.onSendClick.bind(this)} icon="send"></wui-icon-button>
        </w3m-tooltip-trigger>
      </wui-flex>

      <wui-tabs
        .onTabChange=${this.onTabChange.bind(this)}
        .activeTab=${this.currentTab}
        localTabWidth=${a.wE.isMobile()&&window.innerWidth<430?(window.innerWidth-48)/3+"px":"104px"}
        .tabs=${Mt}
      ></wui-tabs>
      ${this.listContentTemplate()}
    </wui-flex>`}watchSwapValues(){this.watchTokenBalance=setInterval((()=>a.AccountController.fetchTokenBalance()),1e4)}listContentTemplate(){return 0===this.currentTab?l.qy`<w3m-account-tokens-widget></w3m-account-tokens-widget>`:1===this.currentTab?l.qy`<w3m-account-nfts-widget></w3m-account-nfts-widget>`:2===this.currentTab?l.qy`<w3m-account-activity-widget></w3m-account-activity-widget>`:l.qy`<w3m-account-tokens-widget></w3m-account-tokens-widget>`}tokenBalanceTemplate(){if(this.tokenBalance&&this.tokenBalance?.length>=0){const e=a.wE.calculateBalance(this.tokenBalance),{dollars:t="0",pennies:r="00"}=a.wE.formatTokenBalance(e);return l.qy`<wui-balance dollars=${t} pennies=${r}></wui-balance>`}return l.qy`<wui-balance dollars="0" pennies="00"></wui-balance>`}activateAccountTemplate(){return!a.NetworkController.checkIfSmartAccountEnabled()||this.preferredAccountType!==P.Vl.ACCOUNT_TYPES.EOA||this.smartAccountDeployed?null:l.qy` <wui-promo
      text=${"Activate your account"}
      @click=${this.onUpdateToSmartAccount.bind(this)}
      data-testid="activate-smart-account-promo"
    ></wui-promo>`}onTabChange(e){a.AccountController.setCurrentTab(e)}onProfileButtonClick(){a.RouterController.push("AccountSettings")}onBuyClick(){a.RouterController.push("OnRampProviders")}onSwapClick(){this.network?.id&&!a.oU.SWAP_SUPPORTED_NETWORKS.includes(this.network?.id)?a.RouterController.push("UnsupportedChain",{swapUnsupportedChain:!0}):a.RouterController.push("Swap")}onReceiveClick(){a.RouterController.push("WalletReceive")}onSendClick(){a.RouterController.push("WalletSend")}onUpdateToSmartAccount(){a.RouterController.push("UpgradeToSmartAccount")}};Br.styles=Rr,Nr([(0,u.wk)()],Br.prototype,"watchTokenBalance",void 0),Nr([(0,u.wk)()],Br.prototype,"address",void 0),Nr([(0,u.wk)()],Br.prototype,"profileImage",void 0),Nr([(0,u.wk)()],Br.prototype,"profileName",void 0),Nr([(0,u.wk)()],Br.prototype,"smartAccountDeployed",void 0),Nr([(0,u.wk)()],Br.prototype,"network",void 0),Nr([(0,u.wk)()],Br.prototype,"currentTab",void 0),Nr([(0,u.wk)()],Br.prototype,"tokenBalance",void 0),Nr([(0,u.wk)()],Br.prototype,"preferredAccountType",void 0),Br=Nr([(0,c.customElement)("w3m-account-wallet-features-widget")],Br);const Ur=l.AH`
  :host {
    width: 100%;
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  :host::-webkit-scrollbar {
    display: none;
  }
`;let Dr=class extends l.WF{render(){return l.qy`<w3m-activity-list page="account"></w3m-activity-list>`}};Dr.styles=Ur,Dr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-account-activity-widget")],Dr);const Lr=l.AH`
  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }
`;let Fr=class extends l.WF{render(){return l.qy`${this.nftTemplate()}`}nftTemplate(){return l.qy` <wui-flex
      class="contentContainer"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="l"
    >
      <wui-icon-box
        icon="wallet"
        size="inherit"
        iconColor="fg-200"
        backgroundColor="fg-200"
        iconSize="lg"
      ></wui-icon-box>
      <wui-flex
        class="textContent"
        gap="xs"
        flexDirection="column"
        justifyContent="center"
        flexDirection="column"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100">No NFTs yet</wui-text>
        <wui-text variant="small-400" align="center" color="fg-200"
          >Transfer from another wallets to get started</wui-text
        >
      </wui-flex>
      <wui-link @click=${this.onReceiveClick.bind(this)}>Receive NFTs</wui-link>
    </wui-flex>`}onReceiveClick(){a.RouterController.push("WalletReceive")}};Fr.styles=Lr,Fr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-account-nfts-widget")],Fr);const jr=l.AH`
  :host {
    width: 100%;
  }

  wui-flex {
    width: 100%;
  }

  .contentContainer {
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }
`;var Hr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let zr=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.tokenBalance=a.AccountController.state.tokenBalance,this.unsubscribe.push(a.AccountController.subscribe((e=>{this.tokenBalance=e.tokenBalance})))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){return l.qy`${this.tokenTemplate()}`}tokenTemplate(){return this.tokenBalance&&this.tokenBalance?.length>0?l.qy`<wui-flex class="contentContainer" flexDirection="column" gap="xs">
        ${this.tokenItemTemplate()}
      </wui-flex>`:l.qy` <wui-flex flexDirection="column" gap="xs"
      ><wui-list-description
        @click=${this.onBuyClick.bind(this)}
        text="Buy Crypto"
        description="Easy with card or bank account"
        icon="card"
        iconColor="success-100"
        iconBackgroundColor="success-100"
        tag="popular"
      ></wui-list-description
      ><wui-list-description
        @click=${this.onReceiveClick.bind(this)}
        text="Receive funds"
        description="Transfer tokens on your wallet"
        icon="arrowBottomCircle"
        iconColor="fg-200"
        iconBackgroundColor="fg-200"
      ></wui-list-description
    ></wui-flex>`}tokenItemTemplate(){return this.tokenBalance?.map((e=>l.qy`<wui-list-token
          tokenName=${e.name}
          tokenImageUrl=${e.iconUrl}
          tokenAmount=${e.quantity.numeric}
          tokenValue=${e.value}
          tokenCurrency=${e.symbol}
        ></wui-list-token>`))}onReceiveClick(){a.RouterController.push("WalletReceive")}onBuyClick(){a.RouterController.push("OnRampProviders")}};zr.styles=jr,Hr([(0,u.wk)()],zr.prototype,"tokenBalance",void 0),zr=Hr([(0,c.customElement)("w3m-account-tokens-widget")],zr);const qr=l.AH`
  :host {
    min-height: 100%;
  }

  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }

  .emptyContainer {
    height: 100%;
  }
`;var $r=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};const Wr="last-transaction";let Gr=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.page="activity",this.address=a.AccountController.state.address,this.transactionsByYear=a.WC.state.transactionsByYear,this.loading=a.WC.state.loading,this.empty=a.WC.state.empty,this.next=a.WC.state.next,a.WC.clearCursor(),this.unsubscribe.push(a.AccountController.subscribe((e=>{e.isConnected&&this.address!==e.address&&(this.address=e.address,a.WC.resetTransactions(),a.WC.fetchTransactions(e.address))})),a.WC.subscribe((e=>{this.transactionsByYear=e.transactionsByYear,this.loading=e.loading,this.empty=e.empty,this.next=e.next})))}firstUpdated(){a.WC.fetchTransactions(this.address),this.createPaginationObserver()}updated(){this.setPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){return l.qy` ${this.empty?null:this.templateTransactionsByYear()}
    ${this.loading?this.templateLoading():null}
    ${!this.loading&&this.empty?this.templateEmpty():null}`}templateTransactionsByYear(){const e=Object.keys(this.transactionsByYear).sort().reverse();return e.map(((t,r)=>{const n=r===e.length-1,i=parseInt(t,10);return new Array(12).fill(null).map(((e,t)=>t)).reverse().map((e=>{const t=c.TransactionUtil.getTransactionGroupTitle(i,e),r=this.transactionsByYear[i]?.[e];return r?l.qy`
          <wui-flex flexDirection="column">
            <wui-flex
              alignItems="center"
              flexDirection="row"
              .padding=${["xs","s","s","s"]}
            >
              <wui-text variant="paragraph-500" color="fg-200">${t}</wui-text>
            </wui-flex>
            <wui-flex flexDirection="column" gap="xs">
              ${this.templateTransactions(r,n)}
            </wui-flex>
          </wui-flex>
        `:null}))}))}templateRenderTransaction(e,t){const{date:r,descriptions:n,direction:i,isAllNFT:s,images:o,status:a,transfers:u,type:h}=this.getTransactionListItemProps(e),d=u?.length>1;return 2!==u?.length||s?d?u.map(((e,n)=>{const i=c.TransactionUtil.getTransferDescription(e),s=t&&n===u.length-1;return l.qy` <wui-transaction-list-item
          date=${r}
          direction=${e.direction}
          id=${s&&this.next?Wr:""}
          status=${a}
          type=${h}
          .onlyDirectionIcon=${!0}
          .images=${[o[n]]}
          .descriptions=${[i]}
        ></wui-transaction-list-item>`})):l.qy`
      <wui-transaction-list-item
        date=${r}
        .direction=${i}
        id=${t&&this.next?Wr:""}
        status=${a}
        type=${h}
        .images=${o}
        .descriptions=${n}
      ></wui-transaction-list-item>
    `:l.qy`
        <wui-transaction-list-item
          date=${r}
          .direction=${i}
          id=${t&&this.next?Wr:""}
          status=${a}
          type=${h}
          .images=${o}
          .descriptions=${n}
        ></wui-transaction-list-item>
      `}templateTransactions(e,t){return e.map(((r,n)=>{const i=t&&n===e.length-1;return l.qy`${this.templateRenderTransaction(r,i)}`}))}emptyStateActivity(){return l.qy`<wui-flex
      class="emptyContainer"
      flexGrow="1"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      .padding=${["3xl","xl","3xl","xl"]}
      gap="xl"
    >
      <wui-icon-box
        backgroundColor="gray-glass-005"
        background="gray"
        iconColor="fg-200"
        icon="wallet"
        size="lg"
        ?border=${!0}
        borderColor="wui-color-bg-125"
      ></wui-icon-box>
      <wui-flex flexDirection="column" alignItems="center" gap="xs">
        <wui-text align="center" variant="paragraph-500" color="fg-100"
          >No Transactions yet</wui-text
        >
        <wui-text align="center" variant="small-500" color="fg-200"
          >Start trading on dApps <br />
          to grow your wallet!</wui-text
        >
      </wui-flex>
    </wui-flex>`}emptyStateAccount(){return l.qy`<wui-flex
      class="contentContainer"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="l"
    >
      <wui-icon-box
        icon="swapHorizontal"
        size="inherit"
        iconColor="fg-200"
        backgroundColor="fg-200"
        iconSize="lg"
      ></wui-icon-box>
      <wui-flex
        class="textContent"
        gap="xs"
        flexDirection="column"
        justifyContent="center"
        flexDirection="column"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100">No activity yet</wui-text>
        <wui-text variant="small-400" align="center" color="fg-200"
          >Your next transactions will appear here</wui-text
        >
      </wui-flex>
      <wui-link @click=${this.onReceiveClick.bind(this)}>Trade</wui-link>
    </wui-flex>`}templateEmpty(){return"account"===this.page?l.qy`${this.emptyStateAccount()}`:l.qy`${this.emptyStateActivity()}`}templateLoading(){return"activity"===this.page?Array(7).fill(l.qy` <wui-transaction-list-item-loader></wui-transaction-list-item-loader> `).map((e=>e)):null}onReceiveClick(){a.RouterController.push("WalletReceive")}createPaginationObserver(){const{projectId:e}=a.OptionsController.state;this.paginationObserver=new IntersectionObserver((([t])=>{t?.isIntersecting&&!this.loading&&(a.WC.fetchTransactions(this.address),a.En.sendEvent({type:"track",event:"LOAD_MORE_TRANSACTIONS",properties:{address:this.address,projectId:e,cursor:this.next}}))}),{}),this.setPaginationObserver()}setPaginationObserver(){this.paginationObserver?.disconnect();const e=this.shadowRoot?.querySelector(`#${Wr}`);e&&this.paginationObserver?.observe(e)}getTransactionListItemProps(e){const t=J.rL.formatDate(e?.metadata?.minedAt),r=c.TransactionUtil.getTransactionDescriptions(e),n=e?.transfers,i=e?.transfers?.[0],s=Boolean(i)&&e?.transfers?.every((e=>Boolean(e.nft_info))),o=c.TransactionUtil.getTransactionImages(n);return{date:t,direction:i?.direction,descriptions:r,isAllNFT:s,images:o,status:e.metadata?.status,transfers:n,type:e.metadata?.operationType}}};Gr.styles=qr,$r([(0,u.MZ)()],Gr.prototype,"page",void 0),$r([(0,u.wk)()],Gr.prototype,"address",void 0),$r([(0,u.wk)()],Gr.prototype,"transactionsByYear",void 0),$r([(0,u.wk)()],Gr.prototype,"loading",void 0),$r([(0,u.wk)()],Gr.prototype,"empty",void 0),$r([(0,u.wk)()],Gr.prototype,"next",void 0),Gr=$r([(0,c.customElement)("w3m-activity-list")],Gr);const Vr=l.AH`
  :host {
    width: 100%;
    height: 100px;
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  :host(:hover) {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  wui-input-amount {
    mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
  }

  .totalValue {
    width: 100%;
  }
`;var Kr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Zr=class extends l.WF{render(){return l.qy` <wui-flex
      flexDirection="column"
      gap="4xs"
      .padding=${["xl","s","l","l"]}
    >
      <wui-flex alignItems="center">
        <wui-input-amount
          @inputChange=${this.onInputChange.bind(this)}
          ?disabled=${!this.token&&!0}
          .value=${this.sendTokenAmount?String(this.sendTokenAmount):""}
        ></wui-input-amount>
        ${this.buttonTemplate()}
      </wui-flex>
      <wui-flex alignItems="center" justifyContent="space-between">
        ${this.sendValueTemplate()}
        <wui-flex alignItems="center" gap="4xs" justifyContent="flex-end">
          ${this.maxAmountTemplate()} ${this.actionTemplate()}
        </wui-flex>
      </wui-flex>
    </wui-flex>`}buttonTemplate(){return this.token?l.qy`<wui-token-button
        text=${this.token.symbol}
        imageSrc=${this.token.iconUrl}
        @click=${this.handleSelectButtonClick.bind(this)}
      >
      </wui-token-button>`:l.qy`<wui-button
      size="md"
      variant="accent"
      @click=${this.handleSelectButtonClick.bind(this)}
      >Select token</wui-button
    >`}handleSelectButtonClick(){a.RouterController.push("WalletSendSelectToken")}sendValueTemplate(){if(this.token&&this.sendTokenAmount){const e=this.token.price*this.sendTokenAmount;return l.qy`<wui-text class="totalValue" variant="small-400" color="fg-200"
        >${e?`$${c.UiHelperUtil.formatNumberToLocalString(e,2)}`:"Incorrect value"}</wui-text
      >`}return null}maxAmountTemplate(){return this.token?this.sendTokenAmount&&this.sendTokenAmount>Number(this.token.quantity.numeric)?l.qy` <wui-text variant="small-400" color="error-100">
          ${c.UiHelperUtil.roundNumber(Number(this.token.quantity.numeric),6,5)}
        </wui-text>`:l.qy` <wui-text variant="small-400" color="fg-200">
        ${c.UiHelperUtil.roundNumber(Number(this.token.quantity.numeric),6,5)}
      </wui-text>`:null}actionTemplate(){return this.token?this.sendTokenAmount&&this.sendTokenAmount>Number(this.token.quantity.numeric)?l.qy`<wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>`:l.qy`<wui-link @click=${this.onMaxClick.bind(this)}>Max</wui-link>`:null}onInputChange(e){a.Rv.setTokenAmount(e.detail)}onMaxClick(){if(this.token&&this.gasPriceInUSD){const e=J.Se.bigNumber(this.gasPriceInUSD.toFixed(5)).dividedBy(this.token.price),t=void 0===this.token.address?J.Se.bigNumber(this.token.quantity.numeric).minus(e):J.Se.bigNumber(this.token.quantity.numeric);a.Rv.setTokenAmount(Number(t.toFixed(20)))}}onBuyClick(){a.RouterController.push("OnRampProviders")}};Zr.styles=Vr,Kr([(0,u.MZ)({type:Object})],Zr.prototype,"token",void 0),Kr([(0,u.MZ)({type:Number})],Zr.prototype,"sendTokenAmount",void 0),Kr([(0,u.MZ)({type:Number})],Zr.prototype,"gasPriceInUSD",void 0),Zr=Kr([(0,c.customElement)("w3m-input-token")],Zr);const Qr=l.AH`
  :host {
    width: 100%;
    height: 100px;
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
    position: relative;
  }

  :host(:hover) {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    display: ruby;
    color: var(--wui-color-fg-100);
    margin: 0 var(--wui-spacing-xs);
  }

  .instruction {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .paste {
    display: inline-flex;
  }

  textarea {
    background: transparent;
    width: 100%;
    font-family: var(--w3m-font-family);
    font-size: var(--wui-font-size-medium);
    font-style: normal;
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    letter-spacing: var(--wui-letter-spacing-medium);
    color: var(--wui-color-fg-100);
    caret-color: var(--wui-color-accent-100);
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
    border: none;
    outline: none;
    appearance: none;
    resize: none;
    overflow: hidden;
  }
`;var Jr=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Yr=class extends l.WF{constructor(){super(...arguments),this.inputElementRef=(0,ne._)(),this.instructionElementRef=(0,ne._)(),this.instructionHidden=Boolean(this.value),this.pasting=!1,this.onDebouncedSearch=a.wE.debounce((async e=>{const t=await a.ConnectionController.getEnsAddress(e);if(a.Rv.setLoading(!1),t){a.Rv.setReceiverProfileName(e),a.Rv.setReceiverAddress(t);const r=await a.ConnectionController.getEnsAvatar(e);r&&a.Rv.setReceiverProfileImageUrl(r)}else a.Rv.setReceiverAddress(e),a.Rv.setReceiverProfileName(void 0),a.Rv.setReceiverProfileImageUrl(void 0)}))}firstUpdated(){this.value&&(this.instructionHidden=!0),this.checkHidden()}render(){return l.qy` <wui-flex
      @click=${this.onBoxClick.bind(this)}
      flexDirection="column"
      justifyContent="center"
      gap="4xs"
      .padding=${["2xl","l","xl","l"]}
    >
      <wui-text
        ${(0,ne.K)(this.instructionElementRef)}
        class="instruction"
        color="fg-300"
        variant="medium-400"
      >
        Type or
        <wui-button
          class="paste"
          size="md"
          variant="neutral"
          iconLeft="copy"
          @click=${this.onPasteClick.bind(this)}
        >
          <wui-icon size="sm" color="inherit" slot="iconLeft" name="copy"></wui-icon>
          Paste
        </wui-button>
        address
      </wui-text>
      <textarea
        spellcheck="false"
        ?disabled=${!this.instructionHidden}
        ${(0,ne.K)(this.inputElementRef)}
        @input=${this.onInputChange.bind(this)}
        @blur=${this.onBlur.bind(this)}
        .value=${this.value??""}
        autocomplete="off"
      >
${this.value??""}</textarea
      >
    </wui-flex>`}async focusInput(){this.instructionElementRef.value&&(this.instructionHidden=!0,await this.toggleInstructionFocus(!1),this.instructionElementRef.value.style.pointerEvents="none",this.inputElementRef.value?.focus(),this.inputElementRef.value&&(this.inputElementRef.value.selectionStart=this.inputElementRef.value.selectionEnd=this.inputElementRef.value.value.length))}async focusInstruction(){this.instructionElementRef.value&&(this.instructionHidden=!1,await this.toggleInstructionFocus(!0),this.instructionElementRef.value.style.pointerEvents="auto",this.inputElementRef.value?.blur())}async toggleInstructionFocus(e){this.instructionElementRef.value&&await this.instructionElementRef.value.animate([{opacity:e?0:1},{opacity:e?1:0}],{duration:100,easing:"ease",fill:"forwards"}).finished}onBoxClick(){this.value||this.instructionHidden||this.focusInput()}onBlur(){this.value||!this.instructionHidden||this.pasting||this.focusInstruction()}checkHidden(){this.instructionHidden&&this.focusInput()}async onPasteClick(){this.pasting=!0;const e=await navigator.clipboard.readText();a.Rv.setReceiverAddress(e),this.focusInput()}onInputChange(e){this.pasting=!1;const t=e.target;t.value&&!this.instructionHidden&&this.focusInput(),a.Rv.setLoading(!0),this.onDebouncedSearch(t.value)}};Yr.styles=Qr,Jr([(0,u.MZ)()],Yr.prototype,"value",void 0),Jr([(0,u.wk)()],Yr.prototype,"instructionHidden",void 0),Jr([(0,u.wk)()],Yr.prototype,"pasting",void 0),Yr=Jr([(0,c.customElement)("w3m-input-address")],Yr);const Xr=l.AH`
  :host {
    display: flex;
    width: auto;
    flex-direction: column;
    gap: var(--wui-border-radius-1xs);
    border-radius: var(--wui-border-radius-s);
    background: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-s) var(--wui-spacing-1xs) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }

  wui-text {
    padding: 0 var(--wui-spacing-1xs);
  }

  wui-flex {
    margin-top: var(--wui-spacing-1xs);
  }

  .network {
    cursor: pointer;
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  .network:focus-visible {
    border: 1px solid var(--wui-color-accent-100);
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  .network:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .network:active {
    background-color: var(--wui-color-gray-glass-010);
  }
`;var en=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let tn=class extends l.WF{render(){return l.qy` <wui-text variant="small-400" color="fg-200">Details</wui-text>
      <wui-flex flexDirection="column" gap="xxs">
        <wui-list-content textTitle="Network cost" textValue="$${(0,h.J)(c.UiHelperUtil.formatNumberToLocalString(this.networkFee,2))}"></wui-list-content></wui-list-content>
        <wui-list-content
          textTitle="Address"
          textValue=${c.UiHelperUtil.getTruncateString({string:this.receiverAddress??"",charsStart:4,charsEnd:4,truncate:"middle"})}
        >
        </wui-list-content>
        ${this.networkTemplate()}
      </wui-flex>`}networkTemplate(){return this.caipNetwork?.name?l.qy` <wui-list-content
        @click=${()=>this.onNetworkClick(this.caipNetwork)}
        class="network"
        textTitle="Network"
        imageSrc=${(0,h.J)(a.$m.getNetworkImage(this.caipNetwork))}
      ></wui-list-content>`:null}onNetworkClick(e){e&&a.RouterController.push("Networks",{network:e})}};tn.styles=Xr,en([(0,u.MZ)()],tn.prototype,"receiverAddress",void 0),en([(0,u.MZ)({type:Object})],tn.prototype,"caipNetwork",void 0),en([(0,u.MZ)({type:Number})],tn.prototype,"networkFee",void 0),tn=en([(0,c.customElement)("w3m-wallet-send-details")],tn);const rn=l.AH`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    color: var(--wui-color-bg-100);
    position: fixed;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--w3m-modal-width) - var(--wui-spacing-xl));
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: var(--wui-color-bg-150);
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`;var nn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let sn=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.open=a.Ib.state.open,this.message=a.Ib.state.message,this.triggerRect=a.Ib.state.triggerRect,this.variant=a.Ib.state.variant,this.unsubscribe.push(a.Ib.subscribe((e=>{this.open=e.open,this.message=e.message,this.triggerRect=e.triggerRect,this.variant=e.variant})))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){this.dataset.variant=this.variant;const e=this.triggerRect.top,t=this.triggerRect.left;return this.style.cssText=`\n    --w3m-tooltip-top: ${e}px;\n    --w3m-tooltip-left: ${t}px;\n    --w3m-tooltip-parent-width: ${this.triggerRect.width/2}px;\n    --w3m-tooltip-display: ${this.open?"flex":"none"};\n    --w3m-tooltip-opacity: ${this.open?1:0};\n    `,l.qy`<wui-flex>
      <wui-icon data-placement="top" color="fg-100" size="inherit" name="cursor"></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>
    </wui-flex>`}};sn.styles=[rn],nn([(0,u.wk)()],sn.prototype,"open",void 0),nn([(0,u.wk)()],sn.prototype,"message",void 0),nn([(0,u.wk)()],sn.prototype,"triggerRect",void 0),nn([(0,u.wk)()],sn.prototype,"variant",void 0),sn=nn([(0,c.customElement)("w3m-tooltip")],sn);const on=l.AH`
  :host {
    width: 100%;
    display: block;
  }
`;var an=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let cn=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.text="",this.open=a.Ib.state.open,this.unsubscribe.push(a.RouterController.subscribeKey("view",(()=>{a.Ib.hide()})),a.W3.subscribeKey("open",(e=>{e||a.Ib.hide()})),a.Ib.subscribeKey("open",(e=>{this.open=e})))}disconnectedCallback(){this.unsubscribe.forEach((e=>e())),a.Ib.hide()}render(){return l.qy`
      <div
        @pointermove=${this.onMouseEnter.bind(this)}
        @pointerleave=${this.onMouseLeave.bind(this)}
      >
        ${this.renderChildren()}
      </div>
    `}renderChildren(){return l.qy`<slot></slot> `}onMouseEnter(){const e=this.getBoundingClientRect();this.open||a.Ib.showTooltip({message:this.text,triggerRect:{width:e.width,height:e.height,left:e.left,top:e.top},variant:"shade"})}onMouseLeave(e){this.contains(e.relatedTarget)||a.Ib.hide()}};cn.styles=[on],an([(0,u.MZ)()],cn.prototype,"text",void 0),an([(0,u.wk)()],cn.prototype,"open",void 0),cn=an([(0,c.customElement)("w3m-tooltip-trigger")],cn);const ln=l.AH`
  wui-flex:first-child {
    margin-top: var(--wui-spacing-s);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-m)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var un=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let hn=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.connectors=a.ConnectorController.state.connectors,this.connector=this.connectors.find((e=>"AUTH"===e.type)),this.unsubscribe.push(a.ConnectorController.subscribeKey("connectors",(e=>{this.connectors=e,this.connector=this.connectors.find((e=>"AUTH"===e.type))})))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){return this.connector?.socials?l.qy`
      <wui-flex flexDirection="column" gap="xs" .padding=${["0","0","xs","0"]}>
        ${this.topViewTemplate()}${this.bottomViewTemplate()}
      </wui-flex>
      ${this.separatorTemplate()}
    `:null}topViewTemplate(){return this.connector?.socials?2===this.connector.socials.length?l.qy` <wui-flex gap="xs">
        ${this.connector.socials.slice(0,2).map((e=>l.qy`<wui-logo-select
              data-testid=${`social-selector-${e}`}
              @click=${()=>{this.onSocialClick(e)}}
              logo=${e}
            ></wui-logo-select>`))}
      </wui-flex>`:l.qy` <wui-list-social
      data-testid=${`social-selector-${this.connector?.socials?.[0]}`}
      @click=${()=>{this.onSocialClick(this.connector?.socials?.[0])}}
      logo=${(0,h.J)(this.connector.socials[0])}
      align="center"
      name=${`Continue with ${this.connector.socials[0]}`}
    ></wui-list-social>`:null}bottomViewTemplate(){return this.connector?.socials?this.connector?.socials.length<=2?null:this.connector?.socials.length>6?l.qy`<wui-flex gap="xs">
        ${this.connector.socials.slice(1,5).map((e=>l.qy`<wui-logo-select
              data-testid=${`social-selector-${e}`}
              @click=${()=>{this.onSocialClick(e)}}
              logo=${e}
            ></wui-logo-select>`))}
        <wui-logo-select logo="more" @click=${this.onMoreSocialsClick.bind(this)}></wui-logo-select>
      </wui-flex>`:l.qy`<wui-flex gap="xs">
      ${this.connector.socials.slice(1,this.connector.socials.length).map((e=>l.qy`<wui-logo-select
            data-testid=${`social-selector-${e}`}
            @click=${()=>{this.onSocialClick(e)}}
            logo=${e}
          ></wui-logo-select>`))}
    </wui-flex>`:null}separatorTemplate(){const e=this.connectors.find((e=>"WALLET_CONNECT"===e.type));return e?l.qy`<wui-separator text="or"></wui-separator>`:null}onMoreSocialsClick(){a.RouterController.push("ConnectSocials")}async onSocialClick(e){const t=a.ConnectorController.getAuthConnector();try{if(t&&e){const{uri:r}=await t.provider.getSocialRedirectUri({provider:e});a.AccountController.setSocialProvider(e),setTimeout((()=>{const e=a.wE.returnOpenHref(r,"popupWindow","width=600,height=800,scrollbars=yes");e&&a.AccountController.setSocialWindow(e)})),a.RouterController.push("ConnectingSocial")}}catch(e){a.SnackController.showError("Something went wrong")}}};hn.styles=ln,un([(0,u.wk)()],hn.prototype,"connectors",void 0),hn=un([(0,c.customElement)("w3m-social-login-widget")],hn);const dn=l.AH`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;let fn=class extends l.WF{render(){return l.qy`
      <wui-flex flexDirection="column" gap="xs">
        <w3m-connect-walletconnect-widget></w3m-connect-walletconnect-widget>
        <w3m-connect-recent-widget></w3m-connect-recent-widget>
        <w3m-connect-announced-widget></w3m-connect-announced-widget>
        <w3m-connect-injected-widget></w3m-connect-injected-widget>
        <w3m-connect-custom-widget></w3m-connect-custom-widget>
        <w3m-connect-recommended-widget></w3m-connect-recommended-widget>
        <w3m-connect-external-widget></w3m-connect-external-widget>
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>
    `}};fn.styles=dn,fn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-wallet-login-list")],fn);const pn=l.AH`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var gn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let mn=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.connectors=a.ConnectorController.state.connectors,this.connector=this.connectors.find((e=>"AUTH"===e.type)),this.unsubscribe.push(a.ConnectorController.subscribeKey("connectors",(e=>{this.connectors=e,this.connector=this.connectors.find((e=>"AUTH"===e.type))})))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){return this.connector?.socials?l.qy` <wui-flex flexDirection="column" gap="xs">
      ${this.connector.socials.map((e=>l.qy`<wui-list-social name=${e} logo=${e}></wui-list-social>`))}
    </wui-flex>`:null}};mn.styles=pn,gn([(0,u.wk)()],mn.prototype,"connectors",void 0),mn=gn([(0,c.customElement)("w3m-social-login-list")],mn);var yn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let wn=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.connectors=a.ConnectorController.state.connectors,this.unsubscribe.push(a.ConnectorController.subscribeKey("connectors",(e=>this.connectors=e)))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){const e=this.connectors.filter((e=>"ANNOUNCED"===e.type));return e?.length?l.qy`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map((e=>l.qy`
            <wui-list-wallet
              imageSrc=${(0,h.J)(a.$m.getConnectorImage(e))}
              name=${e.name??"Unknown"}
              @click=${()=>this.onConnector(e)}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${e.id}`}
              .installed=${!0}
            >
            </wui-list-wallet>
          `))}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){"WALLET_CONNECT"===e.type?a.wE.isMobile()?a.RouterController.push("AllWallets"):a.RouterController.push("ConnectingWalletConnect"):a.RouterController.push("ConnectingExternal",{connector:e})}};yn([(0,u.wk)()],wn.prototype,"connectors",void 0),wn=yn([(0,c.customElement)("w3m-connect-announced-widget")],wn);var bn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let vn=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.connectors=a.ConnectorController.state.connectors,this.unsubscribe.push(a.ConnectorController.subscribeKey("connectors",(e=>this.connectors=e)))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){const{customWallets:e}=a.OptionsController.state;if(!e?.length)return this.style.cssText="display: none",null;const t=this.filterOutDuplicateWallets(e);return l.qy`<wui-flex flexDirection="column" gap="xs">
      ${t.map((e=>l.qy`
          <wui-list-wallet
            imageSrc=${(0,h.J)(a.$m.getWalletImage(e))}
            name=${e.name??"Unknown"}
            @click=${()=>this.onConnectWallet(e)}
            data-testid=${`wallet-selector-${e.id}`}
          >
          </wui-list-wallet>
        `))}
    </wui-flex>`}filterOutDuplicateWallets(e){const t=a.iT.getRecentWallets(),r=this.connectors.map((e=>e.info?.rdns)).filter(Boolean),n=t.map((e=>e.rdns)).filter(Boolean),i=r.concat(n);if(i.includes("io.metamask.mobile")&&a.wE.isMobile()){const e=i.indexOf("io.metamask.mobile");i[e]="io.metamask"}return e.filter((e=>!i.includes(String(e?.rdns))))}onConnectWallet(e){a.RouterController.push("ConnectingWalletConnect",{wallet:e})}};bn([(0,u.wk)()],vn.prototype,"connectors",void 0),vn=bn([(0,c.customElement)("w3m-connect-custom-widget")],vn);var An=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let En=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.connectors=a.ConnectorController.state.connectors,this.unsubscribe.push(a.ConnectorController.subscribeKey("connectors",(e=>this.connectors=e)))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){const e=this.connectors.filter((e=>!["WALLET_CONNECT","INJECTED","ANNOUNCED","AUTH"].includes(e.type)));return e?.length?l.qy`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map((e=>l.qy`
            <wui-list-wallet
              imageSrc=${(0,h.J)(a.$m.getConnectorImage(e))}
              name=${e.name??"Unknown"}
              @click=${()=>this.onConnector(e)}
            >
            </wui-list-wallet>
          `))}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){a.RouterController.push("ConnectingExternal",{connector:e})}};An([(0,u.wk)()],En.prototype,"connectors",void 0),En=An([(0,c.customElement)("w3m-connect-external-widget")],En);var xn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Cn=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.connectors=a.ConnectorController.state.connectors,this.unsubscribe.push(a.ConnectorController.subscribeKey("connectors",(e=>this.connectors=e)))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){const{featured:e}=a.ApiController.state;if(!e.length)return this.style.cssText="display: none",null;const t=this.filterOutDuplicateWallets(e);return l.qy`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map((e=>l.qy`
            <wui-list-wallet
              imageSrc=${(0,h.J)(a.$m.getWalletImage(e))}
              name=${e.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
            >
            </wui-list-wallet>
          `))}
      </wui-flex>
    `}filterOutDuplicateWallets(e){const t=a.iT.getRecentWallets(),r=this.connectors.map((e=>e.info?.rdns)).filter(Boolean),n=t.map((e=>e.rdns)).filter(Boolean),i=r.concat(n);if(i.includes("io.metamask.mobile")&&a.wE.isMobile()){const e=i.indexOf("io.metamask.mobile");i[e]="io.metamask"}return e.filter((e=>!i.includes(String(e?.rdns))))}onConnectWallet(e){a.RouterController.push("ConnectingWalletConnect",{wallet:e})}};xn([(0,u.wk)()],Cn.prototype,"connectors",void 0),Cn=xn([(0,c.customElement)("w3m-connect-featured-widget")],Cn);var Sn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let kn=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.connectors=a.ConnectorController.state.connectors,this.unsubscribe.push(a.ConnectorController.subscribeKey("connectors",(e=>this.connectors=e)))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){const e=this.connectors.filter((e=>"INJECTED"===e.type));return!e?.length||1===e.length&&"Browser Wallet"===e[0]?.name&&!a.wE.isMobile()?(this.style.cssText="display: none",null):l.qy`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map((e=>(a.wE.isMobile()||"Browser Wallet"!==e.name)&&a.ConnectionController.checkInstalled()?l.qy`
            <wui-list-wallet
              imageSrc=${(0,h.J)(a.$m.getConnectorImage(e))}
              .installed=${!0}
              name=${e.name??"Unknown"}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${e.id}`}
              @click=${()=>this.onConnector(e)}
            >
            </wui-list-wallet>
          `:null))}
      </wui-flex>
    `}onConnector(e){a.RouterController.push("ConnectingExternal",{connector:e})}};Sn([(0,u.wk)()],kn.prototype,"connectors",void 0),kn=Sn([(0,c.customElement)("w3m-connect-injected-widget")],kn);var _n=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let In=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.connectors=a.ConnectorController.state.connectors,this.unsubscribe.push(a.ConnectorController.subscribeKey("connectors",(e=>this.connectors=e)))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){const e=this.connectors.find((e=>"coinbaseWalletSDK"===e.id));return e?l.qy`
      <wui-flex flexDirection="column" gap="xs">
        <wui-list-wallet
          imageSrc=${(0,h.J)(a.$m.getConnectorImage(e))}
          .installed=${!0}
          name=${(0,h.J)(e.name)}
          data-testid=${`wallet-selector-${e.id}`}
          @click=${()=>this.onConnector(e)}
        >
        </wui-list-wallet>
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){a.RouterController.push("ConnectingExternal",{connector:e})}};_n([(0,u.wk)()],In.prototype,"connectors",void 0),In=_n([(0,c.customElement)("w3m-connect-coinbase-widget")],In);let Mn=class extends l.WF{render(){const e=a.iT.getRecentWallets();return e?.length?l.qy`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map((e=>l.qy`
            <wui-list-wallet
              imageSrc=${(0,h.J)(a.$m.getWalletImage(e))}
              name=${e.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
              tagLabel="recent"
              tagVariant="shade"
            >
            </wui-list-wallet>
          `))}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){a.RouterController.push("ConnectingWalletConnect",{wallet:e})}};Mn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o}([(0,c.customElement)("w3m-connect-recent-widget")],Mn);var Tn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Pn=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.connectors=a.ConnectorController.state.connectors,this.unsubscribe.push(a.ConnectorController.subscribeKey("connectors",(e=>this.connectors=e)))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){const e=this.connectors.find((e=>"WALLET_CONNECT"===e.type));if(!e)return null;const{recommended:t}=a.ApiController.state,{customWallets:r,featuredWalletIds:n}=a.OptionsController.state,{connectors:i}=a.ConnectorController.state,s=a.iT.getRecentWallets(),o=i.filter((e=>"INJECTED"===e.type||"ANNOUNCED"===e.type)),c=o.filter((e=>"Browser Wallet"!==e.name));if(n||r||!t.length)return this.style.cssText="display: none",null;const u=c.length+s.length,d=Math.max(0,2-u),f=this.filterOutDuplicateWallets(t).slice(0,d);return f.length?l.qy`
      <wui-flex flexDirection="column" gap="xs">
        ${f.map((e=>l.qy`
            <wui-list-wallet
              imageSrc=${(0,h.J)(a.$m.getWalletImage(e))}
              name=${e?.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
            >
            </wui-list-wallet>
          `))}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}filterOutDuplicateWallets(e){const t=a.iT.getRecentWallets(),r=this.connectors.map((e=>e.info?.rdns)).filter(Boolean),n=t.map((e=>e.rdns)).filter(Boolean),i=r.concat(n);if(i.includes("io.metamask.mobile")&&a.wE.isMobile()){const e=i.indexOf("io.metamask.mobile");i[e]="io.metamask"}return e.filter((e=>!i.includes(String(e?.rdns))))}onConnectWallet(e){a.RouterController.push("ConnectingWalletConnect",{wallet:e})}};Tn([(0,u.wk)()],Pn.prototype,"connectors",void 0),Pn=Tn([(0,c.customElement)("w3m-connect-recommended-widget")],Pn);var On=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Rn=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.connectors=a.ConnectorController.state.connectors,this.unsubscribe.push(a.ConnectorController.subscribeKey("connectors",(e=>this.connectors=e)))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){if(a.wE.isMobile())return this.style.cssText="display: none",null;const e=this.connectors.find((e=>"WALLET_CONNECT"===e.type));return e?l.qy`
      <wui-list-wallet
        imageSrc=${(0,h.J)(a.$m.getConnectorImage(e))}
        name=${e.name??"Unknown"}
        @click=${()=>this.onConnector(e)}
        tagLabel="qr code"
        tagVariant="main"
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `:(this.style.cssText="display: none",null)}onConnector(e){"WALLET_CONNECT"===e.type?a.wE.isMobile()?a.RouterController.push("AllWallets"):a.RouterController.push("ConnectingWalletConnect"):a.RouterController.push("ConnectingExternal",{connector:e})}};On([(0,u.wk)()],Rn.prototype,"connectors",void 0),Rn=On([(0,c.customElement)("w3m-connect-walletconnect-widget")],Rn);var Nn=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let Bn=class extends l.WF{constructor(){super(),this.unsubscribe=[],this.connectors=a.ConnectorController.state.connectors,this.count=a.ApiController.state.count,this.unsubscribe.push(a.ConnectorController.subscribeKey("connectors",(e=>this.connectors=e)),a.ApiController.subscribeKey("count",(e=>this.count=e)))}disconnectedCallback(){this.unsubscribe.forEach((e=>e()))}render(){const e=this.connectors.find((e=>"WALLET_CONNECT"===e.type)),{allWallets:t}=a.OptionsController.state;if(!e||"HIDE"===t)return null;if("ONLY_MOBILE"===t&&!a.wE.isMobile())return null;const r=a.ApiController.state.featured.length,n=this.count+r,i=n<10?n:10*Math.floor(n/10),s=i<n?`${i}+`:`${i}`;return l.qy`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${s}
        tagVariant="shade"
        data-testid="all-wallets"
      ></wui-list-wallet>
    `}onAllWallets(){a.En.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),a.RouterController.push("AllWallets")}};Nn([(0,u.wk)()],Bn.prototype,"connectors",void 0),Nn([(0,u.wk)()],Bn.prototype,"count",void 0),Bn=Nn([(0,c.customElement)("w3m-all-wallets-widget")],Bn);let Un=class extends l.WF{render(){const e=a.iT.getConnectedConnector(),t=a.ConnectorController.getAuthConnector();if(!t||"AUTH"!==e)return this.style.cssText="display: none",null;const r=t.provider.getEmail()??"",n=a.iT.getConnectedSocialProvider(),i=a.iT.getConnectedSocialUsername();return l.qy`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon=${n??"mail"}
        iconSize=${n?"xxl":"sm"}
        data-testid="w3m-account-email-update"
        ?chevron=${!n}
        @click=${()=>{this.onGoToUpdateEmail(r,n)}}
      >
        <wui-text variant="paragraph-500" color="fg-100">${i??r}</wui-text>
      </wui-list-item>