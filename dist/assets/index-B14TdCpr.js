import{r as Nm,g as Dm,a as Vm}from"./vendor-BtP0CW_r.js";function G0(t,e){for(var n=0;n<e.length;n++){const r=e[n];if(typeof r!="string"&&!Array.isArray(r)){for(const s in r)if(s!=="default"&&!(s in t)){const i=Object.getOwnPropertyDescriptor(r,s);i&&Object.defineProperty(t,s,i.get?i:{enumerable:!0,get:()=>r[s]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const Q0=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),sd=__DEFINES__;Object.keys(sd).forEach(t=>{const e=t.split(".");let n=Q0;for(let r=0;r<e.length;r++){const s=e[r];r===e.length-1?n[s]=sd[t]:n=n[s]||(n[s]={})}});class X0{constructor(e,n,r){this.logger=e,this.transport=n,this.importUpdatedModule=r,this.hotModulesMap=new Map,this.disposeMap=new Map,this.pruneMap=new Map,this.dataMap=new Map,this.customListenersMap=new Map,this.ctxToListenersMap=new Map,this.updateQueue=[],this.pendingUpdateQueue=!1}async notifyListeners(e,n){const r=this.customListenersMap.get(e);r&&await Promise.allSettled(r.map(s=>s(n)))}send(e){this.transport.send(e).catch(n=>{this.logger.error(n)})}clear(){this.hotModulesMap.clear(),this.disposeMap.clear(),this.pruneMap.clear(),this.dataMap.clear(),this.customListenersMap.clear(),this.ctxToListenersMap.clear()}async prunePaths(e){await Promise.all(e.map(n=>{const r=this.disposeMap.get(n);if(r)return r(this.dataMap.get(n))})),e.forEach(n=>{const r=this.pruneMap.get(n);r&&r(this.dataMap.get(n))})}warnFailedUpdate(e,n){(!(e instanceof Error)||!e.message.includes("fetch"))&&this.logger.error(e),this.logger.error(`Failed to reload ${n}. This could be due to syntax errors or importing non-existent modules. (see errors above)`)}async queueUpdate(e){if(this.updateQueue.push(this.fetchUpdate(e)),!this.pendingUpdateQueue){this.pendingUpdateQueue=!0,await Promise.resolve(),this.pendingUpdateQueue=!1;const n=[...this.updateQueue];this.updateQueue=[],(await Promise.all(n)).forEach(r=>r&&r())}}async fetchUpdate(e){const{path:n,acceptedPath:r,firstInvalidatedBy:s}=e,i=this.hotModulesMap.get(n);if(!i)return;let o;const l=n===r,c=i.callbacks.filter(({deps:u})=>u.includes(r));if(l||c.length>0){const u=this.disposeMap.get(r);u&&await u(this.dataMap.get(r));try{o=await this.importUpdatedModule(e)}catch(h){this.warnFailedUpdate(h,r)}}return()=>{try{this.currentFirstInvalidatedBy=s;for(const{deps:h,fn:f}of c)f(h.map(g=>g===r?o:void 0));const u=l?n:`${r} via ${n}`;this.logger.debug(`hot updated: ${u}`)}finally{this.currentFirstInvalidatedBy=void 0}}}}let Y0="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",J0=(t=21)=>{let e="",n=t|0;for(;n--;)e+=Y0[Math.random()*64|0];return e};typeof process<"u"&&process.platform;function Z0(){let t,e;return{promise:new Promise((r,s)=>{t=r,e=s}),resolve:t,reject:e}}function id(t){const e=new Error(t.message||"Unknown invoke error");return Object.assign(e,t,{runnerError:new Error("RunnerError")}),e}const ew=t=>{if(t.invoke)return{...t,async invoke(n,r){const s=await t.invoke({type:"custom",event:"vite:invoke",data:{id:"send",name:n,data:r}});if("error"in s)throw id(s.error);return s.result}};if(!t.send||!t.connect)throw new Error("transport must implement send and connect when invoke is not implemented");const e=new Map;return{...t,connect({onMessage:n,onDisconnection:r}){return t.connect({onMessage(s){if(s.type==="custom"&&s.event==="vite:invoke"){const i=s.data;if(i.id.startsWith("response:")){const o=i.id.slice(9),l=e.get(o);if(!l)return;l.timeoutId&&clearTimeout(l.timeoutId),e.delete(o);const{error:c,result:u}=i.data;c?l.reject(c):l.resolve(u);return}}n(s)},onDisconnection:r})},disconnect(){var n;return e.forEach(r=>{r.reject(new Error(`transport was disconnected, cannot call ${JSON.stringify(r.name)}`))}),e.clear(),(n=t.disconnect)==null?void 0:n.call(t)},send(n){return t.send(n)},async invoke(n,r){var g;const s=J0(),i={type:"custom",event:"vite:invoke",data:{name:n,id:`send:${s}`,data:r}},o=t.send(i),{promise:l,resolve:c,reject:u}=Z0(),h=t.timeout??6e4;let f;h>0&&(f=setTimeout(()=>{e.delete(s),u(new Error(`transport invoke timed out after ${h}ms (data: ${JSON.stringify(i)})`))},h),(g=f==null?void 0:f.unref)==null||g.call(f)),e.set(s,{resolve:c,reject:u,name:n,timeoutId:f}),o&&o.catch(_=>{clearTimeout(f),e.delete(s),u(_)});try{return await l}catch(_){throw id(_)}}}},tw=t=>{const e=ew(t);let n=!e.connect,r;return{...t,...e.connect?{async connect(s){if(n)return;if(r){await r;return}const i=e.connect({onMessage:s??(()=>{}),onDisconnection(){n=!1}});i&&(r=i,await r,r=void 0),n=!0}}:{},...e.disconnect?{async disconnect(){n&&(r&&await r,n=!1,await e.disconnect())}}:{},async send(s){if(e.send){if(!n)if(r)await r;else throw new Error("send was called before connect");await e.send(s)}},async invoke(s,i){if(!n)if(r)await r;else throw new Error("invoke was called before connect");return e.invoke(s,i)}}},od=t=>{const e=t.pingInterval??3e4;let n,r;return{async connect({onMessage:s,onDisconnection:i}){const o=t.createConnection();o.addEventListener("message",async({data:c})=>{s(JSON.parse(c))});let l=o.readyState===o.OPEN;l||await new Promise((c,u)=>{o.addEventListener("open",()=>{l=!0,c()},{once:!0}),o.addEventListener("close",async()=>{if(!l){u(new Error("WebSocket closed without opened."));return}s({type:"custom",event:"vite:ws:disconnect",data:{webSocket:o}}),i()})}),s({type:"custom",event:"vite:ws:connect",data:{webSocket:o}}),n=o,r=setInterval(()=>{o.readyState===o.OPEN&&o.send(JSON.stringify({type:"ping"}))},e)},disconnect(){clearInterval(r),n==null||n.close()},send(s){n.send(JSON.stringify(s))}}};function nw(t){const e=new rw;return n=>e.enqueue(()=>t(n))}class rw{constructor(){this.queue=[],this.pending=!1}enqueue(e){return new Promise((n,r)=>{this.queue.push({promise:e,resolve:n,reject:r}),this.dequeue()})}dequeue(){if(this.pending)return!1;const e=this.queue.shift();return e?(this.pending=!0,e.promise().then(e.resolve).catch(e.reject).finally(()=>{this.pending=!1,this.dequeue()}),!0):!1}}const sw=__HMR_CONFIG_NAME__,iw=__BASE__||"/";function it(t,e={},...n){const r=document.createElement(t);for(const[s,i]of Object.entries(e))r.setAttribute(s,i);return r.append(...n),r}const ow=`
:host {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  --monospace: 'SFMono-Regular', Consolas,
  'Liberation Mono', Menlo, Courier, monospace;
  --red: #ff5555;
  --yellow: #e2aa53;
  --purple: #cfa4ff;
  --cyan: #2dd9da;
  --dim: #c9c9c9;

  --window-background: #181818;
  --window-color: #d8d8d8;
}

.backdrop {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  margin: 0;
  background: rgba(0, 0, 0, 0.66);
}

.window {
  font-family: var(--monospace);
  line-height: 1.5;
  max-width: 80vw;
  color: var(--window-color);
  box-sizing: border-box;
  margin: 30px auto;
  padding: 2.5vh 4vw;
  position: relative;
  background: var(--window-background);
  border-radius: 6px 6px 8px 8px;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  overflow: hidden;
  border-top: 8px solid var(--red);
  direction: ltr;
  text-align: left;
}

pre {
  font-family: var(--monospace);
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 1em;
  overflow-x: scroll;
  scrollbar-width: none;
}

pre::-webkit-scrollbar {
  display: none;
}

pre.frame::-webkit-scrollbar {
  display: block;
  height: 5px;
}

pre.frame::-webkit-scrollbar-thumb {
  background: #999;
  border-radius: 5px;
}

pre.frame {
  scrollbar-width: thin;
}

.message {
  line-height: 1.3;
  font-weight: 600;
  white-space: pre-wrap;
}

.message-body {
  color: var(--red);
}

.plugin {
  color: var(--purple);
}

.file {
  color: var(--cyan);
  margin-bottom: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.frame {
  color: var(--yellow);
}

.stack {
  font-size: 13px;
  color: var(--dim);
}

.tip {
  font-size: 13px;
  color: #999;
  border-top: 1px dotted #999;
  padding-top: 13px;
  line-height: 1.8;
}

code {
  font-size: 13px;
  font-family: var(--monospace);
  color: var(--yellow);
}

.file-link {
  text-decoration: underline;
  cursor: pointer;
}

kbd {
  line-height: 1.5;
  font-family: ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.75rem;
  font-weight: 700;
  background-color: rgb(38, 40, 44);
  color: rgb(166, 167, 171);
  padding: 0.15rem 0.3rem;
  border-radius: 0.25rem;
  border-width: 0.0625rem 0.0625rem 0.1875rem;
  border-style: solid;
  border-color: rgb(54, 57, 64);
  border-image: initial;
}
`,aw=()=>it("div",{class:"backdrop",part:"backdrop"},it("div",{class:"window",part:"window"},it("pre",{class:"message",part:"message"},it("span",{class:"plugin",part:"plugin"}),it("span",{class:"message-body",part:"message-body"})),it("pre",{class:"file",part:"file"}),it("pre",{class:"frame",part:"frame"}),it("pre",{class:"stack",part:"stack"}),it("div",{class:"tip",part:"tip"},"Click outside, press ",it("kbd",{},"Esc")," key, or fix the code to dismiss.",it("br"),"You can also disable this overlay by setting ",it("code",{part:"config-option-name"},"server.hmr.overlay")," to ",it("code",{part:"config-option-value"},"false")," in ",it("code",{part:"config-file-name"},sw),".")),it("style",{},ow)),ad=/(?:[a-zA-Z]:\\|\/).*?:\d+:\d+/g,Za=/^(?:>?\s*\d+\s+\|.*|\s+\|\s*\^.*)\r?\n/gm,{HTMLElement:lw=class{}}=globalThis;class cw extends lw{constructor(e,n=!0){var o;super(),this.root=this.attachShadow({mode:"open"}),this.root.appendChild(aw()),Za.lastIndex=0;const r=e.frame&&Za.test(e.frame),s=r?e.message.replace(Za,""):e.message;e.plugin&&this.text(".plugin",`[plugin:${e.plugin}] `),this.text(".message-body",s.trim());const[i]=(((o=e.loc)==null?void 0:o.file)||e.id||"unknown file").split("?");e.loc?this.text(".file",`${i}:${e.loc.line}:${e.loc.column}`,n):e.id&&this.text(".file",i),r&&this.text(".frame",e.frame.trim()),this.text(".stack",e.stack,n),this.root.querySelector(".window").addEventListener("click",l=>{l.stopPropagation()}),this.addEventListener("click",()=>{this.close()}),this.closeOnEsc=l=>{(l.key==="Escape"||l.code==="Escape")&&this.close()},document.addEventListener("keydown",this.closeOnEsc)}text(e,n,r=!1){const s=this.root.querySelector(e);if(!r)s.textContent=n;else{let i=0,o;for(ad.lastIndex=0;o=ad.exec(n);){const{0:l,index:c}=o,u=n.slice(i,c);s.appendChild(document.createTextNode(u));const h=document.createElement("a");h.textContent=l,h.className="file-link",h.onclick=()=>{fetch(new URL(`${iw}__open-in-editor?file=${encodeURIComponent(l)}`,import.meta.url))},s.appendChild(h),i+=u.length+l.length}}}close(){var e;(e=this.parentNode)==null||e.removeChild(this),document.removeEventListener("keydown",this.closeOnEsc)}}const Gs="vite-error-overlay",{customElements:el}=globalThis;el&&!el.get(Gs)&&el.define(Gs,cw);console.debug("[vite] connecting...");const Rl=new URL(import.meta.url),uw=__SERVER_HOST__,ld=__HMR_PROTOCOL__||(Rl.protocol==="https:"?"wss":"ws"),Om=__HMR_PORT__,cd=`${__HMR_HOSTNAME__||Rl.hostname}:${Om||Rl.port}${__HMR_BASE__}`,ud=__HMR_DIRECT_TARGET__,Pl=__BASE__||"/",hd=__HMR_TIMEOUT__,dd=__WS_TOKEN__,Mm=tw((()=>{let t=od({createConnection:()=>new WebSocket(`${ld}://${cd}?token=${dd}`,"vite-hmr"),pingInterval:hd});return{async connect(e){try{await t.connect(e)}catch(n){if(!Om){t=od({createConnection:()=>new WebSocket(`${ld}://${ud}?token=${dd}`,"vite-hmr"),pingInterval:hd});try{await t.connect(e),console.info("[vite] Direct websocket connection fallback. Check out https://vite.dev/config/server-options.html#server-hmr to remove the previous connection error.")}catch(r){if(r instanceof Error&&r.message.includes("WebSocket closed without opened.")){const s=new URL(import.meta.url),i=s.host+s.pathname.replace(/@vite\/client$/,"");console.error(`[vite] failed to connect to websocket.
your current setup:
  (browser) ${i} <--[HTTP]--> ${uw} (server)
  (browser) ${cd} <--[WebSocket (failing)]--> ${ud} (server)
Check out your Vite / network configuration and https://vite.dev/config/server-options.html#server-hmr .`)}}return}throw console.error(`[vite] failed to connect to websocket (${n}). `),n}},async disconnect(){await t.disconnect()},send(e){t.send(e)}}})());let Lm=!1;typeof window<"u"&&window.addEventListener("beforeunload",()=>{Lm=!0});function fd(t){const e=new URL(t,"http://vite.dev");return e.searchParams.delete("direct"),e.pathname+e.search}let pd=!0;const md=new WeakSet,hw=t=>{let e;return()=>{e&&(clearTimeout(e),e=null),e=setTimeout(()=>{location.reload()},t)}},Cl=hw(50),mn=new X0({error:t=>console.error("[vite]",t),debug:(...t)=>console.debug("[vite]",...t)},Mm,async function({acceptedPath:e,timestamp:n,explicitImportRequired:r,isWithinCircularImport:s}){const[i,o]=e.split("?"),l=import(Pl+i.slice(1)+`?${r?"import&":""}t=${n}${o?`&${o}`:""}`);return s&&l.catch(()=>{console.info(`[hmr] ${e} failed to apply HMR as it's within a circular import. Reloading page to reset the execution order. To debug and break the circular import, you can run \`vite --debug hmr\` to log the circular dependency path if a file change triggered it.`),Cl()}),await l});Mm.connect(nw(dw));async function dw(t){switch(t.type){case"connected":console.debug("[vite] connected.");break;case"update":if(await mn.notifyListeners("vite:beforeUpdate",t),Ji)if(pd&&pw()){location.reload();return}else gd&&jm(),pd=!1;await Promise.all(t.updates.map(async e=>{if(e.type==="js-update")return mn.queueUpdate(e);const{path:n,timestamp:r}=e,s=fd(n),i=Array.from(document.querySelectorAll("link")).find(l=>!md.has(l)&&fd(l.href).includes(s));if(!i)return;const o=`${Pl}${s.slice(1)}${s.includes("?")?"&":"?"}t=${r}`;return new Promise(l=>{const c=i.cloneNode();c.href=new URL(o,i.href).href;const u=()=>{i.remove(),console.debug(`[vite] css hot updated: ${s}`),l()};c.addEventListener("load",u),c.addEventListener("error",u),md.add(i),i.after(c)})})),await mn.notifyListeners("vite:afterUpdate",t);break;case"custom":{if(await mn.notifyListeners(t.event,t.data),t.event==="vite:ws:disconnect"&&Ji&&!Lm){console.log("[vite] server connection lost. Polling for restart...");const e=t.data.webSocket,n=new URL(e.url);n.search="",await mw(n.href),location.reload()}break}case"full-reload":if(await mn.notifyListeners("vite:beforeFullReload",t),Ji)if(t.path&&t.path.endsWith(".html")){const e=decodeURI(location.pathname),n=Pl+t.path.slice(1);(e===n||t.path==="/index.html"||e.endsWith("/")&&e+"index.html"===n)&&Cl();return}else Cl();break;case"prune":await mn.notifyListeners("vite:beforePrune",t),await mn.prunePaths(t.paths);break;case"error":{if(await mn.notifyListeners("vite:error",t),Ji){const e=t.err;gd?fw(e):console.error(`[vite] Internal Server Error
${e.message}
${e.stack}`)}break}case"ping":break;default:return t}}const gd=__HMR_ENABLE_OVERLAY__,Ji="document"in globalThis;function fw(t){jm();const{customElements:e}=globalThis;if(e){const n=e.get(Gs);document.body.appendChild(new n(t))}}function jm(){document.querySelectorAll(Gs).forEach(t=>t.close())}function pw(){return document.querySelectorAll(Gs).length}async function mw(t,e=1e3){async function n(){const r=new WebSocket(t,"vite-ping");return new Promise(s=>{function i(){s(!0),l()}function o(){s(!1),l()}function l(){r.removeEventListener("open",i),r.removeEventListener("error",o),r.close()}r.addEventListener("open",i),r.addEventListener("error",o)})}if(!await n())for(await yd(e);;)if(document.visibilityState==="visible"){if(await n())break;await yd(e)}else await gw()}function yd(t){return new Promise(e=>setTimeout(e,t))}function gw(){return new Promise(t=>{const e=async()=>{document.visibilityState==="visible"&&(t(),document.removeEventListener("visibilitychange",e))};document.addEventListener("visibilitychange",e)})}const yw=new Map;"document"in globalThis&&document.querySelectorAll("style[data-vite-dev-id]").forEach(t=>{yw.set(t.getAttribute("data-vite-dev-id"),t)});var km;"document"in globalThis&&((km=document.querySelector("meta[property=csp-nonce]"))==null||km.nonce);var tl={exports:{}},Ss={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _d;function _w(){if(_d)return Ss;_d=1;var t=Nm(),e=Symbol.for("react.element"),n=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,s=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function o(l,c,u){var h,f={},g=null,_=null;u!==void 0&&(g=""+u),c.key!==void 0&&(g=""+c.key),c.ref!==void 0&&(_=c.ref);for(h in c)r.call(c,h)&&!i.hasOwnProperty(h)&&(f[h]=c[h]);if(l&&l.defaultProps)for(h in c=l.defaultProps,c)f[h]===void 0&&(f[h]=c[h]);return{$$typeof:e,type:l,key:g,ref:_,props:f,_owner:s.current}}return Ss.Fragment=n,Ss.jsx=o,Ss.jsxs=o,Ss}var vd;function vw(){return vd||(vd=1,tl.exports=_w()),tl.exports}var m=vw(),S=Nm();const Jt=Dm(S),ww=G0({__proto__:null,default:Jt},[S]);var Zi={},wd;function Tw(){if(wd)return Zi;wd=1;var t=Vm();return Zi.createRoot=t.createRoot,Zi.hydrateRoot=t.hydrateRoot,Zi}var Ew=Tw();const bw=Dm(Ew);Vm();/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Qs(){return Qs=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Qs.apply(this,arguments)}var In;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(In||(In={}));const Td="popstate";function Iw(t){t===void 0&&(t={});function e(r,s){let{pathname:i,search:o,hash:l}=r.location;return kl("",{pathname:i,search:o,hash:l},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function n(r,s){return typeof s=="string"?s:Ro(s)}return Aw(e,n,null,t)}function ke(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function Um(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function xw(){return Math.random().toString(36).substr(2,8)}function Ed(t,e){return{usr:t.state,key:t.key,idx:e}}function kl(t,e,n,r){return n===void 0&&(n=null),Qs({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?ns(e):e,{state:n,key:e&&e.key||r||xw()})}function Ro(t){let{pathname:e="/",search:n="",hash:r=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function ns(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let r=t.indexOf("?");r>=0&&(e.search=t.substr(r),t=t.substr(0,r)),t&&(e.pathname=t)}return e}function Aw(t,e,n,r){r===void 0&&(r={});let{window:s=document.defaultView,v5Compat:i=!1}=r,o=s.history,l=In.Pop,c=null,u=h();u==null&&(u=0,o.replaceState(Qs({},o.state,{idx:u}),""));function h(){return(o.state||{idx:null}).idx}function f(){l=In.Pop;let I=h(),C=I==null?null:I-u;u=I,c&&c({action:l,location:R.location,delta:C})}function g(I,C){l=In.Push;let V=kl(R.location,I,C);u=h()+1;let D=Ed(V,u),B=R.createHref(V);try{o.pushState(D,"",B)}catch(L){if(L instanceof DOMException&&L.name==="DataCloneError")throw L;s.location.assign(B)}i&&c&&c({action:l,location:R.location,delta:1})}function _(I,C){l=In.Replace;let V=kl(R.location,I,C);u=h();let D=Ed(V,u),B=R.createHref(V);o.replaceState(D,"",B),i&&c&&c({action:l,location:R.location,delta:0})}function T(I){let C=s.location.origin!=="null"?s.location.origin:s.location.href,V=typeof I=="string"?I:Ro(I);return V=V.replace(/ $/,"%20"),ke(C,"No window.location.(origin|href) available to create URL for href: "+V),new URL(V,C)}let R={get action(){return l},get location(){return t(s,o)},listen(I){if(c)throw new Error("A history only accepts one active listener");return s.addEventListener(Td,f),c=I,()=>{s.removeEventListener(Td,f),c=null}},createHref(I){return e(s,I)},createURL:T,encodeLocation(I){let C=T(I);return{pathname:C.pathname,search:C.search,hash:C.hash}},push:g,replace:_,go(I){return o.go(I)}};return R}var bd;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(bd||(bd={}));function Sw(t,e,n){return n===void 0&&(n="/"),Rw(t,e,n)}function Rw(t,e,n,r){let s=typeof e=="string"?ns(e):e,i=Rc(s.pathname||"/",n);if(i==null)return null;let o=Fm(t);Pw(o);let l=null;for(let c=0;l==null&&c<o.length;++c){let u=Bw(i);l=jw(o[c],u)}return l}function Fm(t,e,n,r){e===void 0&&(e=[]),n===void 0&&(n=[]),r===void 0&&(r="");let s=(i,o,l)=>{let c={relativePath:l===void 0?i.path||"":l,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};c.relativePath.startsWith("/")&&(ke(c.relativePath.startsWith(r),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(r.length));let u=Sn([r,c.relativePath]),h=n.concat(c);i.children&&i.children.length>0&&(ke(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),Fm(i.children,e,h,u)),!(i.path==null&&!i.index)&&e.push({path:u,score:Mw(u,i.index),routesMeta:h})};return t.forEach((i,o)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))s(i,o);else for(let c of Bm(i.path))s(i,o,c)}),e}function Bm(t){let e=t.split("/");if(e.length===0)return[];let[n,...r]=e,s=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return s?[i,""]:[i];let o=Bm(r.join("/")),l=[];return l.push(...o.map(c=>c===""?i:[i,c].join("/"))),s&&l.push(...o),l.map(c=>t.startsWith("/")&&c===""?"/":c)}function Pw(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:Lw(e.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const Cw=/^:[\w-]+$/,kw=3,Nw=2,Dw=1,Vw=10,Ow=-2,Id=t=>t==="*";function Mw(t,e){let n=t.split("/"),r=n.length;return n.some(Id)&&(r+=Ow),e&&(r+=Nw),n.filter(s=>!Id(s)).reduce((s,i)=>s+(Cw.test(i)?kw:i===""?Dw:Vw),r)}function Lw(t,e){return t.length===e.length&&t.slice(0,-1).every((r,s)=>r===e[s])?t[t.length-1]-e[e.length-1]:0}function jw(t,e,n){let{routesMeta:r}=t,s={},i="/",o=[];for(let l=0;l<r.length;++l){let c=r[l],u=l===r.length-1,h=i==="/"?e:e.slice(i.length)||"/",f=Uw({path:c.relativePath,caseSensitive:c.caseSensitive,end:u},h),g=c.route;if(!f)return null;Object.assign(s,f.params),o.push({params:s,pathname:Sn([i,f.pathname]),pathnameBase:zw(Sn([i,f.pathnameBase])),route:g}),f.pathnameBase!=="/"&&(i=Sn([i,f.pathnameBase]))}return o}function Uw(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,r]=Fw(t.path,t.caseSensitive,t.end),s=e.match(n);if(!s)return null;let i=s[0],o=i.replace(/(.)\/+$/,"$1"),l=s.slice(1);return{params:r.reduce((u,h,f)=>{let{paramName:g,isOptional:_}=h;if(g==="*"){let R=l[f]||"";o=i.slice(0,i.length-R.length).replace(/(.)\/+$/,"$1")}const T=l[f];return _&&!T?u[g]=void 0:u[g]=(T||"").replace(/%2F/g,"/"),u},{}),pathname:i,pathnameBase:o,pattern:t}}function Fw(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),Um(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let r=[],s="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,c)=>(r.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(r.push({paramName:"*"}),s+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?s+="\\/*$":t!==""&&t!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,e?void 0:"i"),r]}function Bw(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Um(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function Rc(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,r=t.charAt(n);return r&&r!=="/"?null:t.slice(n)||"/"}function $w(t,e){e===void 0&&(e="/");let{pathname:n,search:r="",hash:s=""}=typeof t=="string"?ns(t):t;return{pathname:n?n.startsWith("/")?n:qw(n,e):e,search:Hw(r),hash:Kw(s)}}function qw(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(s=>{s===".."?n.length>1&&n.pop():s!=="."&&n.push(s)}),n.length>1?n.join("/"):"/"}function nl(t,e,n,r){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Ww(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function $m(t,e){let n=Ww(t);return e?n.map((r,s)=>s===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function qm(t,e,n,r){r===void 0&&(r=!1);let s;typeof t=="string"?s=ns(t):(s=Qs({},t),ke(!s.pathname||!s.pathname.includes("?"),nl("?","pathname","search",s)),ke(!s.pathname||!s.pathname.includes("#"),nl("#","pathname","hash",s)),ke(!s.search||!s.search.includes("#"),nl("#","search","hash",s)));let i=t===""||s.pathname==="",o=i?"/":s.pathname,l;if(o==null)l=n;else{let f=e.length-1;if(!r&&o.startsWith("..")){let g=o.split("/");for(;g[0]==="..";)g.shift(),f-=1;s.pathname=g.join("/")}l=f>=0?e[f]:"/"}let c=$w(s,l),u=o&&o!=="/"&&o.endsWith("/"),h=(i||o===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(u||h)&&(c.pathname+="/"),c}const Sn=t=>t.join("/").replace(/\/\/+/g,"/"),zw=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),Hw=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,Kw=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function Gw(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const Wm=["post","put","patch","delete"];new Set(Wm);const Qw=["get",...Wm];new Set(Qw);/**
 * React Router v6.30.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Xs(){return Xs=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Xs.apply(this,arguments)}const Pc=S.createContext(null),Xw=S.createContext(null),mr=S.createContext(null),ra=S.createContext(null),gr=S.createContext({outlet:null,matches:[],isDataRoute:!1}),zm=S.createContext(null);function Yw(t,e){let{relative:n}=e===void 0?{}:e;_i()||ke(!1);let{basename:r,navigator:s}=S.useContext(mr),{hash:i,pathname:o,search:l}=Km(t,{relative:n}),c=o;return r!=="/"&&(c=o==="/"?r:Sn([r,o])),s.createHref({pathname:c,search:l,hash:i})}function _i(){return S.useContext(ra)!=null}function sa(){return _i()||ke(!1),S.useContext(ra).location}function Hm(t){S.useContext(mr).static||S.useLayoutEffect(t)}function ia(){let{isDataRoute:t}=S.useContext(gr);return t?uT():Jw()}function Jw(){_i()||ke(!1);let t=S.useContext(Pc),{basename:e,future:n,navigator:r}=S.useContext(mr),{matches:s}=S.useContext(gr),{pathname:i}=sa(),o=JSON.stringify($m(s,n.v7_relativeSplatPath)),l=S.useRef(!1);return Hm(()=>{l.current=!0}),S.useCallback(function(u,h){if(h===void 0&&(h={}),!l.current)return;if(typeof u=="number"){r.go(u);return}let f=qm(u,JSON.parse(o),i,h.relative==="path");t==null&&e!=="/"&&(f.pathname=f.pathname==="/"?e:Sn([e,f.pathname])),(h.replace?r.replace:r.push)(f,h.state,h)},[e,r,o,i,t])}function Km(t,e){let{relative:n}=e===void 0?{}:e,{future:r}=S.useContext(mr),{matches:s}=S.useContext(gr),{pathname:i}=sa(),o=JSON.stringify($m(s,r.v7_relativeSplatPath));return S.useMemo(()=>qm(t,JSON.parse(o),i,n==="path"),[t,o,i,n])}function Zw(t,e){return eT(t,e)}function eT(t,e,n,r){_i()||ke(!1);let{navigator:s,static:i}=S.useContext(mr),{matches:o}=S.useContext(gr),l=o[o.length-1],c=l?l.params:{};l&&l.pathname;let u=l?l.pathnameBase:"/";l&&l.route;let h=sa(),f;if(e){var g;let C=typeof e=="string"?ns(e):e;u==="/"||(g=C.pathname)!=null&&g.startsWith(u)||ke(!1),f=C}else f=h;let _=f.pathname||"/",T=_;if(u!=="/"){let C=u.replace(/^\//,"").split("/");T="/"+_.replace(/^\//,"").split("/").slice(C.length).join("/")}let R=Sw(t,{pathname:T}),I=iT(R&&R.map(C=>Object.assign({},C,{params:Object.assign({},c,C.params),pathname:Sn([u,s.encodeLocation?s.encodeLocation(C.pathname).pathname:C.pathname]),pathnameBase:C.pathnameBase==="/"?u:Sn([u,s.encodeLocation?s.encodeLocation(C.pathnameBase).pathname:C.pathnameBase])})),o,n,r);return e&&I?S.createElement(ra.Provider,{value:{location:Xs({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:In.Pop}},I):I}function tT(){let t=cT(),e=Gw(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return S.createElement(S.Fragment,null,S.createElement("h2",null,"Unexpected Application Error!"),S.createElement("h3",{style:{fontStyle:"italic"}},e),n?S.createElement("pre",{style:s},n):null,null)}const nT=S.createElement(tT,null);class rT extends S.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?S.createElement(gr.Provider,{value:this.props.routeContext},S.createElement(zm.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function sT(t){let{routeContext:e,match:n,children:r}=t,s=S.useContext(Pc);return s&&s.static&&s.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=n.route.id),S.createElement(gr.Provider,{value:e},r)}function iT(t,e,n,r){var s;if(e===void 0&&(e=[]),n===void 0&&(n=null),r===void 0&&(r=null),t==null){var i;if(!n)return null;if(n.errors)t=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let o=t,l=(s=n)==null?void 0:s.errors;if(l!=null){let h=o.findIndex(f=>f.route.id&&(l==null?void 0:l[f.route.id])!==void 0);h>=0||ke(!1),o=o.slice(0,Math.min(o.length,h+1))}let c=!1,u=-1;if(n&&r&&r.v7_partialHydration)for(let h=0;h<o.length;h++){let f=o[h];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(u=h),f.route.id){let{loaderData:g,errors:_}=n,T=f.route.loader&&g[f.route.id]===void 0&&(!_||_[f.route.id]===void 0);if(f.route.lazy||T){c=!0,u>=0?o=o.slice(0,u+1):o=[o[0]];break}}}return o.reduceRight((h,f,g)=>{let _,T=!1,R=null,I=null;n&&(_=l&&f.route.id?l[f.route.id]:void 0,R=f.route.errorElement||nT,c&&(u<0&&g===0?(hT("route-fallback"),T=!0,I=null):u===g&&(T=!0,I=f.route.hydrateFallbackElement||null)));let C=e.concat(o.slice(0,g+1)),V=()=>{let D;return _?D=R:T?D=I:f.route.Component?D=S.createElement(f.route.Component,null):f.route.element?D=f.route.element:D=h,S.createElement(sT,{match:f,routeContext:{outlet:h,matches:C,isDataRoute:n!=null},children:D})};return n&&(f.route.ErrorBoundary||f.route.errorElement||g===0)?S.createElement(rT,{location:n.location,revalidation:n.revalidation,component:R,error:_,children:V(),routeContext:{outlet:null,matches:C,isDataRoute:!0}}):V()},null)}var Gm=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(Gm||{}),Qm=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(Qm||{});function oT(t){let e=S.useContext(Pc);return e||ke(!1),e}function aT(t){let e=S.useContext(Xw);return e||ke(!1),e}function lT(t){let e=S.useContext(gr);return e||ke(!1),e}function Xm(t){let e=lT(),n=e.matches[e.matches.length-1];return n.route.id||ke(!1),n.route.id}function cT(){var t;let e=S.useContext(zm),n=aT(),r=Xm();return e!==void 0?e:(t=n.errors)==null?void 0:t[r]}function uT(){let{router:t}=oT(Gm.UseNavigateStable),e=Xm(Qm.UseNavigateStable),n=S.useRef(!1);return Hm(()=>{n.current=!0}),S.useCallback(function(s,i){i===void 0&&(i={}),n.current&&(typeof s=="number"?t.navigate(s):t.navigate(s,Xs({fromRouteId:e},i)))},[t,e])}const xd={};function hT(t,e,n){xd[t]||(xd[t]=!0)}function dT(t,e){t==null||t.v7_startTransition,t==null||t.v7_relativeSplatPath}function kr(t){ke(!1)}function fT(t){let{basename:e="/",children:n=null,location:r,navigationType:s=In.Pop,navigator:i,static:o=!1,future:l}=t;_i()&&ke(!1);let c=e.replace(/^\/*/,"/"),u=S.useMemo(()=>({basename:c,navigator:i,static:o,future:Xs({v7_relativeSplatPath:!1},l)}),[c,l,i,o]);typeof r=="string"&&(r=ns(r));let{pathname:h="/",search:f="",hash:g="",state:_=null,key:T="default"}=r,R=S.useMemo(()=>{let I=Rc(h,c);return I==null?null:{location:{pathname:I,search:f,hash:g,state:_,key:T},navigationType:s}},[c,h,f,g,_,T,s]);return R==null?null:S.createElement(mr.Provider,{value:u},S.createElement(ra.Provider,{children:n,value:R}))}function pT(t){let{children:e,location:n}=t;return Zw(Nl(e),n)}new Promise(()=>{});function Nl(t,e){e===void 0&&(e=[]);let n=[];return S.Children.forEach(t,(r,s)=>{if(!S.isValidElement(r))return;let i=[...e,s];if(r.type===S.Fragment){n.push.apply(n,Nl(r.props.children,i));return}r.type!==kr&&ke(!1),!r.props.index||!r.props.children||ke(!1);let o={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=Nl(r.props.children,i)),n.push(o)}),n}/**
 * React Router DOM v6.30.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Dl(){return Dl=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Dl.apply(this,arguments)}function mT(t,e){if(t==null)return{};var n={},r=Object.keys(t),s,i;for(i=0;i<r.length;i++)s=r[i],!(e.indexOf(s)>=0)&&(n[s]=t[s]);return n}function gT(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function yT(t,e){return t.button===0&&(!e||e==="_self")&&!gT(t)}const _T=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],vT="6";try{window.__reactRouterVersion=vT}catch{}const wT="startTransition",Ad=ww[wT];function TT(t){let{basename:e,children:n,future:r,window:s}=t,i=S.useRef();i.current==null&&(i.current=Iw({window:s,v5Compat:!0}));let o=i.current,[l,c]=S.useState({action:o.action,location:o.location}),{v7_startTransition:u}=r||{},h=S.useCallback(f=>{u&&Ad?Ad(()=>c(f)):c(f)},[c,u]);return S.useLayoutEffect(()=>o.listen(h),[o,h]),S.useEffect(()=>dT(r),[r]),S.createElement(fT,{basename:e,children:n,location:l.location,navigationType:l.action,navigator:o,future:r})}const ET=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",bT=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,IT=S.forwardRef(function(e,n){let{onClick:r,relative:s,reloadDocument:i,replace:o,state:l,target:c,to:u,preventScrollReset:h,viewTransition:f}=e,g=mT(e,_T),{basename:_}=S.useContext(mr),T,R=!1;if(typeof u=="string"&&bT.test(u)&&(T=u,ET))try{let D=new URL(window.location.href),B=u.startsWith("//")?new URL(D.protocol+u):new URL(u),L=Rc(B.pathname,_);B.origin===D.origin&&L!=null?u=L+B.search+B.hash:R=!0}catch{}let I=Yw(u,{relative:s}),C=xT(u,{replace:o,state:l,target:c,preventScrollReset:h,relative:s,viewTransition:f});function V(D){r&&r(D),D.defaultPrevented||C(D)}return S.createElement("a",Dl({},g,{href:T||I,onClick:R||i?r:V,ref:n,target:c}))});var Sd;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(Sd||(Sd={}));var Rd;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(Rd||(Rd={}));function xT(t,e){let{target:n,replace:r,state:s,preventScrollReset:i,relative:o,viewTransition:l}=e===void 0?{}:e,c=ia(),u=sa(),h=Km(t,{relative:o});return S.useCallback(f=>{if(yT(f,n)){f.preventDefault();let g=r!==void 0?r:Ro(u)===Ro(h);c(t,{replace:g,state:s,preventScrollReset:i,relative:o,viewTransition:l})}},[u,c,h,r,s,n,t,i,o,l])}const AT=()=>{};var Pd={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ym=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},ST=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],l=t[n++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Jm={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,l=o?t[s+1]:0,c=s+2<t.length,u=c?t[s+2]:0,h=i>>2,f=(i&3)<<4|l>>4;let g=(l&15)<<2|u>>6,_=u&63;c||(_=64,o||(g=64)),r.push(n[h],n[f],n[g],n[_])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Ym(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):ST(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const u=s<t.length?n[t.charAt(s)]:64;++s;const f=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||l==null||u==null||f==null)throw new RT;const g=i<<2|l>>4;if(r.push(g),u!==64){const _=l<<4&240|u>>2;if(r.push(_),f!==64){const T=u<<6&192|f;r.push(T)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class RT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const PT=function(t){const e=Ym(t);return Jm.encodeByteArray(e,!0)},Po=function(t){return PT(t).replace(/\./g,"")},Zm=function(t){try{return Jm.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CT(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kT=()=>CT().__FIREBASE_DEFAULTS__,NT=()=>{if(typeof process>"u"||typeof Pd>"u")return;const t=Pd.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},DT=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Zm(t[1]);return e&&JSON.parse(e)},oa=()=>{try{return AT()||kT()||NT()||DT()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},eg=t=>{var e,n;return(n=(e=oa())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},tg=t=>{const e=eg(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},ng=()=>{var t;return(t=oa())===null||t===void 0?void 0:t.config},rg=t=>{var e;return(e=oa())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VT{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sg(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Po(JSON.stringify(n)),Po(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function OT(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(rt())}function MT(){var t;const e=(t=oa())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function LT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function jT(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function UT(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function FT(){const t=rt();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function BT(){return!MT()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function $T(){try{return typeof indexedDB=="object"}catch{return!1}}function qT(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WT="FirebaseError";class zt extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=WT,Object.setPrototypeOf(this,zt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,vi.prototype.create)}}class vi{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?zT(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new zt(s,l,r)}}function zT(t,e){return t.replace(HT,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const HT=/\{\$([^}]+)}/g;function KT(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function lr(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(Cd(i)&&Cd(o)){if(!lr(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Cd(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wi(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Cs(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function ks(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function GT(t,e){const n=new QT(t,e);return n.subscribe.bind(n)}class QT{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");XT(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=rl),s.error===void 0&&(s.error=rl),s.complete===void 0&&(s.complete=rl);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function XT(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function rl(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ye(t){return t&&t._delegate?t._delegate:t}class Dn{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YT{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new VT;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ZT(e))try{this.getOrInitializeService({instanceIdentifier:tr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=tr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=tr){return this.instances.has(e)}getOptions(e=tr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:JT(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=tr){return this.component?this.component.multipleInstances?e:tr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function JT(t){return t===tr?void 0:t}function ZT(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new YT(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var re;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(re||(re={}));const tE={debug:re.DEBUG,verbose:re.VERBOSE,info:re.INFO,warn:re.WARN,error:re.ERROR,silent:re.SILENT},nE=re.INFO,rE={[re.DEBUG]:"log",[re.VERBOSE]:"log",[re.INFO]:"info",[re.WARN]:"warn",[re.ERROR]:"error"},sE=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=rE[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Cc{constructor(e){this.name=e,this._logLevel=nE,this._logHandler=sE,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in re))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?tE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,re.DEBUG,...e),this._logHandler(this,re.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,re.VERBOSE,...e),this._logHandler(this,re.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,re.INFO,...e),this._logHandler(this,re.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,re.WARN,...e),this._logHandler(this,re.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,re.ERROR,...e),this._logHandler(this,re.ERROR,...e)}}const iE=(t,e)=>e.some(n=>t instanceof n);let kd,Nd;function oE(){return kd||(kd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function aE(){return Nd||(Nd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ig=new WeakMap,Vl=new WeakMap,og=new WeakMap,sl=new WeakMap,kc=new WeakMap;function lE(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Rn(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&ig.set(n,t)}).catch(()=>{}),kc.set(e,t),e}function cE(t){if(Vl.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Vl.set(t,e)}let Ol={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Vl.get(t);if(e==="objectStoreNames")return t.objectStoreNames||og.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Rn(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function uE(t){Ol=t(Ol)}function hE(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(il(this),e,...n);return og.set(r,e.sort?e.sort():[e]),Rn(r)}:aE().includes(t)?function(...e){return t.apply(il(this),e),Rn(ig.get(this))}:function(...e){return Rn(t.apply(il(this),e))}}function dE(t){return typeof t=="function"?hE(t):(t instanceof IDBTransaction&&cE(t),iE(t,oE())?new Proxy(t,Ol):t)}function Rn(t){if(t instanceof IDBRequest)return lE(t);if(sl.has(t))return sl.get(t);const e=dE(t);return e!==t&&(sl.set(t,e),kc.set(e,t)),e}const il=t=>kc.get(t);function fE(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),l=Rn(o);return r&&o.addEventListener("upgradeneeded",c=>{r(Rn(o.result),c.oldVersion,c.newVersion,Rn(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),l.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),l}const pE=["get","getKey","getAll","getAllKeys","count"],mE=["put","add","delete","clear"],ol=new Map;function Dd(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ol.get(e))return ol.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=mE.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||pE.includes(n)))return;const i=async function(o,...l){const c=this.transaction(o,s?"readwrite":"readonly");let u=c.store;return r&&(u=u.index(l.shift())),(await Promise.all([u[n](...l),s&&c.done]))[0]};return ol.set(e,i),i}uE(t=>({...t,get:(e,n,r)=>Dd(e,n)||t.get(e,n,r),has:(e,n)=>!!Dd(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gE{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(yE(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function yE(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ml="@firebase/app",Vd="0.11.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tn=new Cc("@firebase/app"),_E="@firebase/app-compat",vE="@firebase/analytics-compat",wE="@firebase/analytics",TE="@firebase/app-check-compat",EE="@firebase/app-check",bE="@firebase/auth",IE="@firebase/auth-compat",xE="@firebase/database",AE="@firebase/data-connect",SE="@firebase/database-compat",RE="@firebase/functions",PE="@firebase/functions-compat",CE="@firebase/installations",kE="@firebase/installations-compat",NE="@firebase/messaging",DE="@firebase/messaging-compat",VE="@firebase/performance",OE="@firebase/performance-compat",ME="@firebase/remote-config",LE="@firebase/remote-config-compat",jE="@firebase/storage",UE="@firebase/storage-compat",FE="@firebase/firestore",BE="@firebase/vertexai",$E="@firebase/firestore-compat",qE="firebase",WE="11.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ll="[DEFAULT]",zE={[Ml]:"fire-core",[_E]:"fire-core-compat",[wE]:"fire-analytics",[vE]:"fire-analytics-compat",[EE]:"fire-app-check",[TE]:"fire-app-check-compat",[bE]:"fire-auth",[IE]:"fire-auth-compat",[xE]:"fire-rtdb",[AE]:"fire-data-connect",[SE]:"fire-rtdb-compat",[RE]:"fire-fn",[PE]:"fire-fn-compat",[CE]:"fire-iid",[kE]:"fire-iid-compat",[NE]:"fire-fcm",[DE]:"fire-fcm-compat",[VE]:"fire-perf",[OE]:"fire-perf-compat",[ME]:"fire-rc",[LE]:"fire-rc-compat",[jE]:"fire-gcs",[UE]:"fire-gcs-compat",[FE]:"fire-fst",[$E]:"fire-fst-compat",[BE]:"fire-vertex","fire-js":"fire-js",[qE]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Co=new Map,HE=new Map,jl=new Map;function Od(t,e){try{t.container.addComponent(e)}catch(n){tn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function cr(t){const e=t.name;if(jl.has(e))return tn.debug(`There were multiple attempts to register component ${e}.`),!1;jl.set(e,t);for(const n of Co.values())Od(n,t);for(const n of HE.values())Od(n,t);return!0}function aa(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function mt(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KE={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Pn=new vi("app","Firebase",KE);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GE{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Dn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Pn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yr=WE;function ag(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Ll,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Pn.create("bad-app-name",{appName:String(s)});if(n||(n=ng()),!n)throw Pn.create("no-options");const i=Co.get(s);if(i){if(lr(n,i.options)&&lr(r,i.config))return i;throw Pn.create("duplicate-app",{appName:s})}const o=new eE(s);for(const c of jl.values())o.addComponent(c);const l=new GE(n,r,o);return Co.set(s,l),l}function Nc(t=Ll){const e=Co.get(t);if(!e&&t===Ll&&ng())return ag();if(!e)throw Pn.create("no-app",{appName:t});return e}function Ot(t,e,n){var r;let s=(r=zE[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),tn.warn(l.join(" "));return}cr(new Dn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QE="firebase-heartbeat-database",XE=1,Ys="firebase-heartbeat-store";let al=null;function lg(){return al||(al=fE(QE,XE,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ys)}catch(n){console.warn(n)}}}}).catch(t=>{throw Pn.create("idb-open",{originalErrorMessage:t.message})})),al}async function YE(t){try{const n=(await lg()).transaction(Ys),r=await n.objectStore(Ys).get(cg(t));return await n.done,r}catch(e){if(e instanceof zt)tn.warn(e.message);else{const n=Pn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});tn.warn(n.message)}}}async function Md(t,e){try{const r=(await lg()).transaction(Ys,"readwrite");await r.objectStore(Ys).put(e,cg(t)),await r.done}catch(n){if(n instanceof zt)tn.warn(n.message);else{const r=Pn.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});tn.warn(r.message)}}}function cg(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JE=1024,ZE=30;class eb{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new nb(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ld();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>ZE){const o=rb(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){tn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Ld(),{heartbeatsToSend:r,unsentEntries:s}=tb(this._heartbeatsCache.heartbeats),i=Po(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return tn.warn(n),""}}}function Ld(){return new Date().toISOString().substring(0,10)}function tb(t,e=JE){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),jd(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),jd(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class nb{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return $T()?qT().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await YE(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Md(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Md(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function jd(t){return Po(JSON.stringify({version:2,heartbeats:t})).length}function rb(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sb(t){cr(new Dn("platform-logger",e=>new gE(e),"PRIVATE")),cr(new Dn("heartbeat",e=>new eb(e),"PRIVATE")),Ot(Ml,Vd,t),Ot(Ml,Vd,"esm2017"),Ot("fire-js","")}sb("");function Dc(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function ug(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ib=ug,hg=new vi("auth","Firebase",ug());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ko=new Cc("@firebase/auth");function ob(t,...e){ko.logLevel<=re.WARN&&ko.warn(`Auth (${yr}): ${t}`,...e)}function po(t,...e){ko.logLevel<=re.ERROR&&ko.error(`Auth (${yr}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(t,...e){throw Vc(t,...e)}function Mt(t,...e){return Vc(t,...e)}function dg(t,e,n){const r=Object.assign(Object.assign({},ib()),{[e]:n});return new vi("auth","Firebase",r).create(e,{appName:t.name})}function Zt(t){return dg(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Vc(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return hg.create(t,...e)}function Q(t,e,...n){if(!t)throw Vc(e,...n)}function Xt(t){const e="INTERNAL ASSERTION FAILED: "+t;throw po(e),new Error(e)}function nn(t,e){t||Xt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ul(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function ab(){return Ud()==="http:"||Ud()==="https:"}function Ud(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lb(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ab()||jT()||"connection"in navigator)?navigator.onLine:!0}function cb(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(e,n){this.shortDelay=e,this.longDelay=n,nn(n>e,"Short delay should be less than long delay!"),this.isMobile=OT()||UT()}get(){return lb()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oc(t,e){nn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Xt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Xt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Xt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ub={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hb=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],db=new Ti(3e4,6e4);function $n(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function qn(t,e,n,r,s={}){return pg(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=wi(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const u=Object.assign({method:e,headers:c},i);return LT()||(u.referrerPolicy="no-referrer"),fg.fetch()(await mg(t,t.config.apiHost,n,l),u)})}async function pg(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},ub),e);try{const s=new pb(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw eo(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[c,u]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw eo(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw eo(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw eo(t,"user-disabled",o);const h=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw dg(t,h,u);Pt(t,h)}}catch(s){if(s instanceof zt)throw s;Pt(t,"network-request-failed",{message:String(s)})}}async function Ei(t,e,n,r,s={}){const i=await qn(t,e,n,r,s);return"mfaPendingCredential"in i&&Pt(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function mg(t,e,n,r){const s=`${e}${n}?${r}`,i=t,o=i.config.emulator?Oc(t.config,s):`${t.config.apiScheme}://${s}`;return hb.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function fb(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class pb{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Mt(this.auth,"network-request-failed")),db.get())})}}function eo(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=Mt(t,e,r);return s.customData._tokenResponse=n,s}function Fd(t){return t!==void 0&&t.enterprise!==void 0}class mb{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return fb(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function gb(t,e){return qn(t,"GET","/v2/recaptchaConfig",$n(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yb(t,e){return qn(t,"POST","/v1/accounts:delete",e)}async function No(t,e){return qn(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function js(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function _b(t,e=!1){const n=ye(t),r=await n.getIdToken(e),s=Mc(r);Q(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:js(ll(s.auth_time)),issuedAtTime:js(ll(s.iat)),expirationTime:js(ll(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function ll(t){return Number(t)*1e3}function Mc(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return po("JWT malformed, contained fewer than 3 sections"),null;try{const s=Zm(n);return s?JSON.parse(s):(po("Failed to decode base64 JWT payload"),null)}catch(s){return po("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Bd(t){const e=Mc(t);return Q(e,"internal-error"),Q(typeof e.exp<"u","internal-error"),Q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Js(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof zt&&vb(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function vb({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wb{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fl{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=js(this.lastLoginAt),this.creationTime=js(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Do(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Js(t,No(n,{idToken:r}));Q(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?gg(i.providerUserInfo):[],l=Eb(t.providerData,o),c=t.isAnonymous,u=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),h=c?u:!1,f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new Fl(i.createdAt,i.lastLoginAt),isAnonymous:h};Object.assign(t,f)}async function Tb(t){const e=ye(t);await Do(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Eb(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function gg(t){return t.map(e=>{var{providerId:n}=e,r=Dc(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bb(t,e){const n=await pg(t,{},async()=>{const r=wi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=await mg(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",fg.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Ib(t,e){return qn(t,"POST","/v2/accounts:revokeToken",$n(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Q(e.idToken,"internal-error"),Q(typeof e.idToken<"u","internal-error"),Q(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Bd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){Q(e.length!==0,"internal-error");const n=Bd(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(Q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await bb(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new qr;return r&&(Q(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(Q(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(Q(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new qr,this.toJSON())}_performRefresh(){return Xt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(t,e){Q(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Rt{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=Dc(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new wb(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Fl(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Js(this,this.stsTokenManager.getToken(this.auth,e));return Q(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return _b(this,e)}reload(){return Tb(this)}_assign(e){this!==e&&(Q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Rt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){Q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Do(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(mt(this.auth.app))return Promise.reject(Zt(this.auth));const e=await this.getIdToken();return await Js(this,yb(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,l,c,u,h;const f=(r=n.displayName)!==null&&r!==void 0?r:void 0,g=(s=n.email)!==null&&s!==void 0?s:void 0,_=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,T=(o=n.photoURL)!==null&&o!==void 0?o:void 0,R=(l=n.tenantId)!==null&&l!==void 0?l:void 0,I=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,C=(u=n.createdAt)!==null&&u!==void 0?u:void 0,V=(h=n.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:D,emailVerified:B,isAnonymous:L,providerData:U,stsTokenManager:b}=n;Q(D&&b,e,"internal-error");const v=qr.fromJSON(this.name,b);Q(typeof D=="string",e,"internal-error"),gn(f,e.name),gn(g,e.name),Q(typeof B=="boolean",e,"internal-error"),Q(typeof L=="boolean",e,"internal-error"),gn(_,e.name),gn(T,e.name),gn(R,e.name),gn(I,e.name),gn(C,e.name),gn(V,e.name);const w=new Rt({uid:D,auth:e,email:g,emailVerified:B,displayName:f,isAnonymous:L,photoURL:T,phoneNumber:_,tenantId:R,stsTokenManager:v,createdAt:C,lastLoginAt:V});return U&&Array.isArray(U)&&(w.providerData=U.map(x=>Object.assign({},x))),I&&(w._redirectEventId=I),w}static async _fromIdTokenResponse(e,n,r=!1){const s=new qr;s.updateFromServerResponse(n);const i=new Rt({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Do(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];Q(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?gg(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new qr;l.updateFromIdToken(r);const c=new Rt({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Fl(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,u),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $d=new Map;function Yt(t){nn(t instanceof Function,"Expected a class definition");let e=$d.get(t);return e?(nn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,$d.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yg{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}yg.type="NONE";const qd=yg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mo(t,e,n){return`firebase:${t}:${e}:${n}`}class Wr{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=mo(this.userKey,s.apiKey,i),this.fullPersistenceKey=mo("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await No(this.auth,{idToken:e}).catch(()=>{});return n?Rt._fromGetAccountInfoResponse(this.auth,n,e):null}return Rt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Wr(Yt(qd),e,r);const s=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=s[0]||Yt(qd);const o=mo(r,e.config.apiKey,e.name);let l=null;for(const u of n)try{const h=await u._get(o);if(h){let f;if(typeof h=="string"){const g=await No(e,{idToken:h}).catch(()=>{});if(!g)break;f=await Rt._fromGetAccountInfoResponse(e,g,h)}else f=Rt._fromJSON(e,h);u!==i&&(l=f),i=u;break}}catch{}const c=s.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new Wr(i,e,r):(i=c[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new Wr(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wd(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Tg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(_g(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(bg(e))return"Blackberry";if(Ig(e))return"Webos";if(vg(e))return"Safari";if((e.includes("chrome/")||wg(e))&&!e.includes("edge/"))return"Chrome";if(Eg(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function _g(t=rt()){return/firefox\//i.test(t)}function vg(t=rt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function wg(t=rt()){return/crios\//i.test(t)}function Tg(t=rt()){return/iemobile/i.test(t)}function Eg(t=rt()){return/android/i.test(t)}function bg(t=rt()){return/blackberry/i.test(t)}function Ig(t=rt()){return/webos/i.test(t)}function Lc(t=rt()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function xb(t=rt()){var e;return Lc(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Ab(){return FT()&&document.documentMode===10}function xg(t=rt()){return Lc(t)||Eg(t)||Ig(t)||bg(t)||/windows phone/i.test(t)||Tg(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ag(t,e=[]){let n;switch(t){case"Browser":n=Wd(rt());break;case"Worker":n=`${Wd(rt())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${yr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sb{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,l)=>{try{const c=e(i);o(c)}catch(c){l(c)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rb(t,e={}){return qn(t,"GET","/v2/passwordPolicy",$n(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pb=6;class Cb{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:Pb,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,l;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(n=c.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(s=c.containsLowercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(i=c.containsUppercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(l=c.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),c}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kb{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new zd(this),this.idTokenSubscription=new zd(this),this.beforeStateQueue=new Sb(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=hg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Yt(n)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Wr.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await No(this,{idToken:e}),r=await Rt._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(mt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===l)&&(c!=null&&c.user)&&(s=c.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Do(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=cb()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(mt(this.app))return Promise.reject(Zt(this));const n=e?ye(e):null;return n&&Q(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&Q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return mt(this.app)?Promise.reject(Zt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return mt(this.app)?Promise.reject(Zt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Yt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Rb(this),n=new Cb(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new vi("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await Ib(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Yt(e)||this._popupRedirectResolver;Q(n,this,"argument-error"),this.redirectPersistenceManager=await Wr.create(this,[Yt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(Q(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,s);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ag(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;if(mt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&ob(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function _r(t){return ye(t)}class zd{constructor(e){this.auth=e,this.observer=null,this.addObserver=GT(n=>this.observer=n)}get next(){return Q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let la={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Nb(t){la=t}function Sg(t){return la.loadJS(t)}function Db(){return la.recaptchaEnterpriseScript}function Vb(){return la.gapiScript}function Ob(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class Mb{constructor(){this.enterprise=new Lb}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class Lb{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const jb="recaptcha-enterprise",Rg="NO_RECAPTCHA";class Ub{constructor(e){this.type=jb,this.auth=_r(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,l)=>{gb(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const u=new mb(c);return i.tenantId==null?i._agentRecaptchaConfig=u:i._tenantRecaptchaConfigs[i.tenantId]=u,o(u.siteKey)}}).catch(c=>{l(c)})})}function s(i,o,l){const c=window.grecaptcha;Fd(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(u=>{o(u)}).catch(()=>{o(Rg)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Mb().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(l=>{if(!n&&Fd(window.grecaptcha))s(l,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=Db();c.length!==0&&(c+=l),Sg(c).then(()=>{s(l,i,o)}).catch(u=>{o(u)})}}).catch(l=>{o(l)})})}}async function Hd(t,e,n,r=!1,s=!1){const i=new Ub(t);let o;if(s)o=Rg;else try{o=await i.verify(n)}catch{o=await i.verify(n,!0)}const l=Object.assign({},e);if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const c=l.phoneEnrollmentInfo.phoneNumber,u=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const c=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return r?Object.assign(l,{captchaResp:o}):Object.assign(l,{captchaResponse:o}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function Bl(t,e,n,r,s){var i;if(!((i=t._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Hd(t,e,n,n==="getOobCode");return r(t,o)}else return r(t,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await Hd(t,e,n,n==="getOobCode");return r(t,l)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fb(t,e){const n=aa(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(lr(i,e??{}))return s;Pt(s,"already-initialized")}return n.initialize({options:e})}function Bb(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Yt);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function $b(t,e,n){const r=_r(t);Q(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Pg(e),{host:o,port:l}=qb(e),c=l===null?"":`:${l}`,u={url:`${i}//${o}${c}/`},h=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){Q(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),Q(lr(u,r.config.emulator)&&lr(h,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=u,r.emulatorConfig=h,r.settings.appVerificationDisabledForTesting=!0,Wb()}function Pg(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function qb(t){const e=Pg(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Kd(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Kd(o)}}}function Kd(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Wb(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jc{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Xt("not implemented")}_getIdTokenResponse(e){return Xt("not implemented")}_linkToIdToken(e,n){return Xt("not implemented")}_getReauthenticationResolver(e){return Xt("not implemented")}}async function zb(t,e){return qn(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hb(t,e){return Ei(t,"POST","/v1/accounts:signInWithPassword",$n(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kb(t,e){return Ei(t,"POST","/v1/accounts:signInWithEmailLink",$n(t,e))}async function Gb(t,e){return Ei(t,"POST","/v1/accounts:signInWithEmailLink",$n(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zs extends jc{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new Zs(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Zs(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Bl(e,n,"signInWithPassword",Hb);case"emailLink":return Kb(e,{email:this._email,oobCode:this._password});default:Pt(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Bl(e,r,"signUpPassword",zb);case"emailLink":return Gb(e,{idToken:n,email:this._email,oobCode:this._password});default:Pt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zr(t,e){return Ei(t,"POST","/v1/accounts:signInWithIdp",$n(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qb="http://localhost";class ur extends jc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new ur(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Pt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=Dc(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new ur(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return zr(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,zr(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,zr(e,n)}buildRequest(){const e={requestUri:Qb,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=wi(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xb(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Yb(t){const e=Cs(ks(t)).link,n=e?Cs(ks(e)).deep_link_id:null,r=Cs(ks(t)).deep_link_id;return(r?Cs(ks(r)).link:null)||r||n||e||t}class Uc{constructor(e){var n,r,s,i,o,l;const c=Cs(ks(e)),u=(n=c.apiKey)!==null&&n!==void 0?n:null,h=(r=c.oobCode)!==null&&r!==void 0?r:null,f=Xb((s=c.mode)!==null&&s!==void 0?s:null);Q(u&&h&&f,"argument-error"),this.apiKey=u,this.operation=f,this.code=h,this.continueUrl=(i=c.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(l=c.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const n=Yb(e);try{return new Uc(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs{constructor(){this.providerId=rs.PROVIDER_ID}static credential(e,n){return Zs._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Uc.parseLink(n);return Q(r,"argument-error"),Zs._fromEmailAndCode(e,r.code,r.tenantId)}}rs.PROVIDER_ID="password";rs.EMAIL_PASSWORD_SIGN_IN_METHOD="password";rs.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cg{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi extends Cg{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n extends bi{constructor(){super("facebook.com")}static credential(e){return ur._fromParams({providerId:_n.PROVIDER_ID,signInMethod:_n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _n.credentialFromTaggedObject(e)}static credentialFromError(e){return _n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _n.credential(e.oauthAccessToken)}catch{return null}}}_n.FACEBOOK_SIGN_IN_METHOD="facebook.com";_n.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn extends bi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return ur._fromParams({providerId:vn.PROVIDER_ID,signInMethod:vn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return vn.credentialFromTaggedObject(e)}static credentialFromError(e){return vn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return vn.credential(n,r)}catch{return null}}}vn.GOOGLE_SIGN_IN_METHOD="google.com";vn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn extends bi{constructor(){super("github.com")}static credential(e){return ur._fromParams({providerId:wn.PROVIDER_ID,signInMethod:wn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return wn.credentialFromTaggedObject(e)}static credentialFromError(e){return wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return wn.credential(e.oauthAccessToken)}catch{return null}}}wn.GITHUB_SIGN_IN_METHOD="github.com";wn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn extends bi{constructor(){super("twitter.com")}static credential(e,n){return ur._fromParams({providerId:Tn.PROVIDER_ID,signInMethod:Tn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Tn.credentialFromTaggedObject(e)}static credentialFromError(e){return Tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Tn.credential(n,r)}catch{return null}}}Tn.TWITTER_SIGN_IN_METHOD="twitter.com";Tn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jb(t,e){return Ei(t,"POST","/v1/accounts:signUp",$n(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await Rt._fromIdTokenResponse(e,r,s),o=Gd(r);return new hr({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Gd(r);return new hr({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Gd(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo extends zt{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Vo.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Vo(e,n,r,s)}}function kg(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Vo._fromErrorAndOperation(t,i,e,r):i})}async function Zb(t,e,n=!1){const r=await Js(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return hr._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eI(t,e,n=!1){const{auth:r}=t;if(mt(r.app))return Promise.reject(Zt(r));const s="reauthenticate";try{const i=await Js(t,kg(r,s,e,t),n);Q(i.idToken,r,"internal-error");const o=Mc(i.idToken);Q(o,r,"internal-error");const{sub:l}=o;return Q(t.uid===l,r,"user-mismatch"),hr._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Pt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ng(t,e,n=!1){if(mt(t.app))return Promise.reject(Zt(t));const r="signIn",s=await kg(t,r,e),i=await hr._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function tI(t,e){return Ng(_r(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dg(t){const e=_r(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function nI(t,e,n){if(mt(t.app))return Promise.reject(Zt(t));const r=_r(t),o=await Bl(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Jb).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&Dg(t),c}),l=await hr._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(l.user),l}function rI(t,e,n){return mt(t.app)?Promise.reject(Zt(t)):tI(ye(t),rs.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Dg(t),r})}function sI(t,e,n,r){return ye(t).onIdTokenChanged(e,n,r)}function iI(t,e,n){return ye(t).beforeAuthStateChanged(e,n)}function Fc(t,e,n,r){return ye(t).onAuthStateChanged(e,n,r)}function Vg(t){return ye(t).signOut()}const Oo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Og{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Oo,"1"),this.storage.removeItem(Oo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oI=1e3,aI=10;class Mg extends Og{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=xg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,c)=>{this.notifyListeners(o,c)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);Ab()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,aI):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},oI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Mg.type="LOCAL";const lI=Mg;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lg extends Og{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Lg.type="SESSION";const jg=Lg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cI(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new ca(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async u=>u(n.origin,i)),c=await cI(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ca.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bc(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,c)=>{const u=Bc("",20);s.port1.start();const h=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(f){const g=f;if(g.data.eventId===u)switch(g.data.status){case"ack":clearTimeout(h),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(g.data.response);break;default:clearTimeout(h),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lt(){return window}function hI(t){Lt().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ug(){return typeof Lt().WorkerGlobalScope<"u"&&typeof Lt().importScripts=="function"}async function dI(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function fI(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function pI(){return Ug()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fg="firebaseLocalStorageDb",mI=1,Mo="firebaseLocalStorage",Bg="fbase_key";class Ii{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function ua(t,e){return t.transaction([Mo],e?"readwrite":"readonly").objectStore(Mo)}function gI(){const t=indexedDB.deleteDatabase(Fg);return new Ii(t).toPromise()}function $l(){const t=indexedDB.open(Fg,mI);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Mo,{keyPath:Bg})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Mo)?e(r):(r.close(),await gI(),e(await $l()))})})}async function Qd(t,e,n){const r=ua(t,!0).put({[Bg]:e,value:n});return new Ii(r).toPromise()}async function yI(t,e){const n=ua(t,!1).get(e),r=await new Ii(n).toPromise();return r===void 0?null:r.value}function Xd(t,e){const n=ua(t,!0).delete(e);return new Ii(n).toPromise()}const _I=800,vI=3;class $g{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await $l(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>vI)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ug()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ca._getInstance(pI()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await dI(),!this.activeServiceWorker)return;this.sender=new uI(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||fI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await $l();return await Qd(e,Oo,"1"),await Xd(e,Oo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Qd(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>yI(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Xd(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=ua(s,!1).getAll();return new Ii(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),_I)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}$g.type="LOCAL";const wI=$g;new Ti(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TI(t,e){return e?Yt(e):(Q(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c extends jc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return zr(e,this._buildIdpRequest())}_linkToIdToken(e,n){return zr(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return zr(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function EI(t){return Ng(t.auth,new $c(t),t.bypassAuthState)}function bI(t){const{auth:e,user:n}=t;return Q(n,e,"internal-error"),eI(n,new $c(t),t.bypassAuthState)}async function II(t){const{auth:e,user:n}=t;return Q(n,e,"internal-error"),Zb(n,new $c(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qg{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return EI;case"linkViaPopup":case"linkViaRedirect":return II;case"reauthViaPopup":case"reauthViaRedirect":return bI;default:Pt(this.auth,"internal-error")}}resolve(e){nn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){nn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xI=new Ti(2e3,1e4);class Mr extends qg{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Mr.currentPopupAction&&Mr.currentPopupAction.cancel(),Mr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Q(e,this.auth,"internal-error"),e}async onExecution(){nn(this.filter.length===1,"Popup operations only handle one event");const e=Bc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Mt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Mt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Mr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Mt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,xI.get())};e()}}Mr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AI="pendingRedirect",go=new Map;class SI extends qg{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=go.get(this.auth._key());if(!e){try{const r=await RI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}go.set(this.auth._key(),e)}return this.bypassAuthState||go.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function RI(t,e){const n=kI(e),r=CI(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function PI(t,e){go.set(t._key(),e)}function CI(t){return Yt(t._redirectPersistence)}function kI(t){return mo(AI,t.config.apiKey,t.name)}async function NI(t,e,n=!1){if(mt(t.app))return Promise.reject(Zt(t));const r=_r(t),s=TI(r,e),o=await new SI(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DI=10*60*1e3;class VI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!OI(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Wg(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(Mt(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=DI&&this.cachedEventUids.clear(),this.cachedEventUids.has(Yd(e))}saveEventToCache(e){this.cachedEventUids.add(Yd(e)),this.lastProcessedEventTime=Date.now()}}function Yd(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Wg({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function OI(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Wg(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function MI(t,e={}){return qn(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,jI=/^https?/;async function UI(t){if(t.config.emulator)return;const{authorizedDomains:e}=await MI(t);for(const n of e)try{if(FI(n))return}catch{}Pt(t,"unauthorized-domain")}function FI(t){const e=Ul(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!jI.test(n))return!1;if(LI.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BI=new Ti(3e4,6e4);function Jd(){const t=Lt().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function $I(t){return new Promise((e,n)=>{var r,s,i;function o(){Jd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Jd(),n(Mt(t,"network-request-failed"))},timeout:BI.get()})}if(!((s=(r=Lt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Lt().gapi)===null||i===void 0)&&i.load)o();else{const l=Ob("iframefcb");return Lt()[l]=()=>{gapi.load?o():n(Mt(t,"network-request-failed"))},Sg(`${Vb()}?onload=${l}`).catch(c=>n(c))}}).catch(e=>{throw yo=null,e})}let yo=null;function qI(t){return yo=yo||$I(t),yo}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WI=new Ti(5e3,15e3),zI="__/auth/iframe",HI="emulator/auth/iframe",KI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},GI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function QI(t){const e=t.config;Q(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Oc(e,HI):`https://${t.config.authDomain}/${zI}`,r={apiKey:e.apiKey,appName:t.name,v:yr},s=GI.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${wi(r).slice(1)}`}async function XI(t){const e=await qI(t),n=Lt().gapi;return Q(n,t,"internal-error"),e.open({where:document.body,url:QI(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:KI,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Mt(t,"network-request-failed"),l=Lt().setTimeout(()=>{i(o)},WI.get());function c(){Lt().clearTimeout(l),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},JI=500,ZI=600,ex="_blank",tx="http://localhost";class Zd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function nx(t,e,n,r=JI,s=ZI){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c=Object.assign(Object.assign({},YI),{width:r.toString(),height:s.toString(),top:i,left:o}),u=rt().toLowerCase();n&&(l=wg(u)?ex:n),_g(u)&&(e=e||tx,c.scrollbars="yes");const h=Object.entries(c).reduce((g,[_,T])=>`${g}${_}=${T},`,"");if(xb(u)&&l!=="_self")return rx(e||"",l),new Zd(null);const f=window.open(e||"",l,h);Q(f,t,"popup-blocked");try{f.focus()}catch{}return new Zd(f)}function rx(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sx="__/auth/handler",ix="emulator/auth/handler",ox=encodeURIComponent("fac");async function ef(t,e,n,r,s,i){Q(t.config.authDomain,t,"auth-domain-config-required"),Q(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:yr,eventId:s};if(e instanceof Cg){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",KT(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,f]of Object.entries({}))o[h]=f}if(e instanceof bi){const h=e.getScopes().filter(f=>f!=="");h.length>0&&(o.scopes=h.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const h of Object.keys(l))l[h]===void 0&&delete l[h];const c=await t._getAppCheckToken(),u=c?`#${ox}=${encodeURIComponent(c)}`:"";return`${ax(t)}?${wi(l).slice(1)}${u}`}function ax({config:t}){return t.emulator?Oc(t,ix):`https://${t.authDomain}/${sx}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cl="webStorageSupport";class lx{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=jg,this._completeRedirectFn=NI,this._overrideRedirectResult=PI}async _openPopup(e,n,r,s){var i;nn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await ef(e,n,r,Ul(),s);return nx(e,o,Bc())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await ef(e,n,r,Ul(),s);return hI(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(nn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await XI(e),r=new VI(e);return n.register("authEvent",s=>(Q(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(cl,{type:cl},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[cl];o!==void 0&&n(!!o),Pt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=UI(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return xg()||vg()||Lc()}}const cx=lx;var tf="@firebase/auth",nf="1.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ux{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){Q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hx(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function dx(t){cr(new Dn("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;Q(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ag(t)},u=new kb(r,s,i,c);return Bb(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),cr(new Dn("auth-internal",e=>{const n=_r(e.getProvider("auth").getImmediate());return(r=>new ux(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ot(tf,nf,hx(t)),Ot(tf,nf,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fx=5*60,px=rg("authIdTokenMaxAge")||fx;let rf=null;const mx=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>px)return;const s=n==null?void 0:n.token;rf!==s&&(rf=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function gx(t=Nc()){const e=aa(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Fb(t,{popupRedirectResolver:cx,persistence:[wI,lI,jg]}),r=rg("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=mx(i.toString());iI(n,o,()=>o(n.currentUser)),sI(n,l=>o(l))}}const s=eg("auth");return s&&$b(n,`http://${s}`),n}function yx(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}Nb({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=Mt("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",yx().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});dx("Browser");var _x="firebase",vx="11.6.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ot(_x,vx,"app");var sf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Cn,zg;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(b,v){function w(){}w.prototype=v.prototype,b.D=v.prototype,b.prototype=new w,b.prototype.constructor=b,b.C=function(x,A,P){for(var E=Array(arguments.length-2),Le=2;Le<arguments.length;Le++)E[Le-2]=arguments[Le];return v.prototype[A].apply(x,E)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(b,v,w){w||(w=0);var x=Array(16);if(typeof v=="string")for(var A=0;16>A;++A)x[A]=v.charCodeAt(w++)|v.charCodeAt(w++)<<8|v.charCodeAt(w++)<<16|v.charCodeAt(w++)<<24;else for(A=0;16>A;++A)x[A]=v[w++]|v[w++]<<8|v[w++]<<16|v[w++]<<24;v=b.g[0],w=b.g[1],A=b.g[2];var P=b.g[3],E=v+(P^w&(A^P))+x[0]+3614090360&4294967295;v=w+(E<<7&4294967295|E>>>25),E=P+(A^v&(w^A))+x[1]+3905402710&4294967295,P=v+(E<<12&4294967295|E>>>20),E=A+(w^P&(v^w))+x[2]+606105819&4294967295,A=P+(E<<17&4294967295|E>>>15),E=w+(v^A&(P^v))+x[3]+3250441966&4294967295,w=A+(E<<22&4294967295|E>>>10),E=v+(P^w&(A^P))+x[4]+4118548399&4294967295,v=w+(E<<7&4294967295|E>>>25),E=P+(A^v&(w^A))+x[5]+1200080426&4294967295,P=v+(E<<12&4294967295|E>>>20),E=A+(w^P&(v^w))+x[6]+2821735955&4294967295,A=P+(E<<17&4294967295|E>>>15),E=w+(v^A&(P^v))+x[7]+4249261313&4294967295,w=A+(E<<22&4294967295|E>>>10),E=v+(P^w&(A^P))+x[8]+1770035416&4294967295,v=w+(E<<7&4294967295|E>>>25),E=P+(A^v&(w^A))+x[9]+2336552879&4294967295,P=v+(E<<12&4294967295|E>>>20),E=A+(w^P&(v^w))+x[10]+4294925233&4294967295,A=P+(E<<17&4294967295|E>>>15),E=w+(v^A&(P^v))+x[11]+2304563134&4294967295,w=A+(E<<22&4294967295|E>>>10),E=v+(P^w&(A^P))+x[12]+1804603682&4294967295,v=w+(E<<7&4294967295|E>>>25),E=P+(A^v&(w^A))+x[13]+4254626195&4294967295,P=v+(E<<12&4294967295|E>>>20),E=A+(w^P&(v^w))+x[14]+2792965006&4294967295,A=P+(E<<17&4294967295|E>>>15),E=w+(v^A&(P^v))+x[15]+1236535329&4294967295,w=A+(E<<22&4294967295|E>>>10),E=v+(A^P&(w^A))+x[1]+4129170786&4294967295,v=w+(E<<5&4294967295|E>>>27),E=P+(w^A&(v^w))+x[6]+3225465664&4294967295,P=v+(E<<9&4294967295|E>>>23),E=A+(v^w&(P^v))+x[11]+643717713&4294967295,A=P+(E<<14&4294967295|E>>>18),E=w+(P^v&(A^P))+x[0]+3921069994&4294967295,w=A+(E<<20&4294967295|E>>>12),E=v+(A^P&(w^A))+x[5]+3593408605&4294967295,v=w+(E<<5&4294967295|E>>>27),E=P+(w^A&(v^w))+x[10]+38016083&4294967295,P=v+(E<<9&4294967295|E>>>23),E=A+(v^w&(P^v))+x[15]+3634488961&4294967295,A=P+(E<<14&4294967295|E>>>18),E=w+(P^v&(A^P))+x[4]+3889429448&4294967295,w=A+(E<<20&4294967295|E>>>12),E=v+(A^P&(w^A))+x[9]+568446438&4294967295,v=w+(E<<5&4294967295|E>>>27),E=P+(w^A&(v^w))+x[14]+3275163606&4294967295,P=v+(E<<9&4294967295|E>>>23),E=A+(v^w&(P^v))+x[3]+4107603335&4294967295,A=P+(E<<14&4294967295|E>>>18),E=w+(P^v&(A^P))+x[8]+1163531501&4294967295,w=A+(E<<20&4294967295|E>>>12),E=v+(A^P&(w^A))+x[13]+2850285829&4294967295,v=w+(E<<5&4294967295|E>>>27),E=P+(w^A&(v^w))+x[2]+4243563512&4294967295,P=v+(E<<9&4294967295|E>>>23),E=A+(v^w&(P^v))+x[7]+1735328473&4294967295,A=P+(E<<14&4294967295|E>>>18),E=w+(P^v&(A^P))+x[12]+2368359562&4294967295,w=A+(E<<20&4294967295|E>>>12),E=v+(w^A^P)+x[5]+4294588738&4294967295,v=w+(E<<4&4294967295|E>>>28),E=P+(v^w^A)+x[8]+2272392833&4294967295,P=v+(E<<11&4294967295|E>>>21),E=A+(P^v^w)+x[11]+1839030562&4294967295,A=P+(E<<16&4294967295|E>>>16),E=w+(A^P^v)+x[14]+4259657740&4294967295,w=A+(E<<23&4294967295|E>>>9),E=v+(w^A^P)+x[1]+2763975236&4294967295,v=w+(E<<4&4294967295|E>>>28),E=P+(v^w^A)+x[4]+1272893353&4294967295,P=v+(E<<11&4294967295|E>>>21),E=A+(P^v^w)+x[7]+4139469664&4294967295,A=P+(E<<16&4294967295|E>>>16),E=w+(A^P^v)+x[10]+3200236656&4294967295,w=A+(E<<23&4294967295|E>>>9),E=v+(w^A^P)+x[13]+681279174&4294967295,v=w+(E<<4&4294967295|E>>>28),E=P+(v^w^A)+x[0]+3936430074&4294967295,P=v+(E<<11&4294967295|E>>>21),E=A+(P^v^w)+x[3]+3572445317&4294967295,A=P+(E<<16&4294967295|E>>>16),E=w+(A^P^v)+x[6]+76029189&4294967295,w=A+(E<<23&4294967295|E>>>9),E=v+(w^A^P)+x[9]+3654602809&4294967295,v=w+(E<<4&4294967295|E>>>28),E=P+(v^w^A)+x[12]+3873151461&4294967295,P=v+(E<<11&4294967295|E>>>21),E=A+(P^v^w)+x[15]+530742520&4294967295,A=P+(E<<16&4294967295|E>>>16),E=w+(A^P^v)+x[2]+3299628645&4294967295,w=A+(E<<23&4294967295|E>>>9),E=v+(A^(w|~P))+x[0]+4096336452&4294967295,v=w+(E<<6&4294967295|E>>>26),E=P+(w^(v|~A))+x[7]+1126891415&4294967295,P=v+(E<<10&4294967295|E>>>22),E=A+(v^(P|~w))+x[14]+2878612391&4294967295,A=P+(E<<15&4294967295|E>>>17),E=w+(P^(A|~v))+x[5]+4237533241&4294967295,w=A+(E<<21&4294967295|E>>>11),E=v+(A^(w|~P))+x[12]+1700485571&4294967295,v=w+(E<<6&4294967295|E>>>26),E=P+(w^(v|~A))+x[3]+2399980690&4294967295,P=v+(E<<10&4294967295|E>>>22),E=A+(v^(P|~w))+x[10]+4293915773&4294967295,A=P+(E<<15&4294967295|E>>>17),E=w+(P^(A|~v))+x[1]+2240044497&4294967295,w=A+(E<<21&4294967295|E>>>11),E=v+(A^(w|~P))+x[8]+1873313359&4294967295,v=w+(E<<6&4294967295|E>>>26),E=P+(w^(v|~A))+x[15]+4264355552&4294967295,P=v+(E<<10&4294967295|E>>>22),E=A+(v^(P|~w))+x[6]+2734768916&4294967295,A=P+(E<<15&4294967295|E>>>17),E=w+(P^(A|~v))+x[13]+1309151649&4294967295,w=A+(E<<21&4294967295|E>>>11),E=v+(A^(w|~P))+x[4]+4149444226&4294967295,v=w+(E<<6&4294967295|E>>>26),E=P+(w^(v|~A))+x[11]+3174756917&4294967295,P=v+(E<<10&4294967295|E>>>22),E=A+(v^(P|~w))+x[2]+718787259&4294967295,A=P+(E<<15&4294967295|E>>>17),E=w+(P^(A|~v))+x[9]+3951481745&4294967295,b.g[0]=b.g[0]+v&4294967295,b.g[1]=b.g[1]+(A+(E<<21&4294967295|E>>>11))&4294967295,b.g[2]=b.g[2]+A&4294967295,b.g[3]=b.g[3]+P&4294967295}r.prototype.u=function(b,v){v===void 0&&(v=b.length);for(var w=v-this.blockSize,x=this.B,A=this.h,P=0;P<v;){if(A==0)for(;P<=w;)s(this,b,P),P+=this.blockSize;if(typeof b=="string"){for(;P<v;)if(x[A++]=b.charCodeAt(P++),A==this.blockSize){s(this,x),A=0;break}}else for(;P<v;)if(x[A++]=b[P++],A==this.blockSize){s(this,x),A=0;break}}this.h=A,this.o+=v},r.prototype.v=function(){var b=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);b[0]=128;for(var v=1;v<b.length-8;++v)b[v]=0;var w=8*this.o;for(v=b.length-8;v<b.length;++v)b[v]=w&255,w/=256;for(this.u(b),b=Array(16),v=w=0;4>v;++v)for(var x=0;32>x;x+=8)b[w++]=this.g[v]>>>x&255;return b};function i(b,v){var w=l;return Object.prototype.hasOwnProperty.call(w,b)?w[b]:w[b]=v(b)}function o(b,v){this.h=v;for(var w=[],x=!0,A=b.length-1;0<=A;A--){var P=b[A]|0;x&&P==v||(w[A]=P,x=!1)}this.g=w}var l={};function c(b){return-128<=b&&128>b?i(b,function(v){return new o([v|0],0>v?-1:0)}):new o([b|0],0>b?-1:0)}function u(b){if(isNaN(b)||!isFinite(b))return f;if(0>b)return I(u(-b));for(var v=[],w=1,x=0;b>=w;x++)v[x]=b/w|0,w*=4294967296;return new o(v,0)}function h(b,v){if(b.length==0)throw Error("number format error: empty string");if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(b.charAt(0)=="-")return I(h(b.substring(1),v));if(0<=b.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=u(Math.pow(v,8)),x=f,A=0;A<b.length;A+=8){var P=Math.min(8,b.length-A),E=parseInt(b.substring(A,A+P),v);8>P?(P=u(Math.pow(v,P)),x=x.j(P).add(u(E))):(x=x.j(w),x=x.add(u(E)))}return x}var f=c(0),g=c(1),_=c(16777216);t=o.prototype,t.m=function(){if(R(this))return-I(this).m();for(var b=0,v=1,w=0;w<this.g.length;w++){var x=this.i(w);b+=(0<=x?x:4294967296+x)*v,v*=4294967296}return b},t.toString=function(b){if(b=b||10,2>b||36<b)throw Error("radix out of range: "+b);if(T(this))return"0";if(R(this))return"-"+I(this).toString(b);for(var v=u(Math.pow(b,6)),w=this,x="";;){var A=B(w,v).g;w=C(w,A.j(v));var P=((0<w.g.length?w.g[0]:w.h)>>>0).toString(b);if(w=A,T(w))return P+x;for(;6>P.length;)P="0"+P;x=P+x}},t.i=function(b){return 0>b?0:b<this.g.length?this.g[b]:this.h};function T(b){if(b.h!=0)return!1;for(var v=0;v<b.g.length;v++)if(b.g[v]!=0)return!1;return!0}function R(b){return b.h==-1}t.l=function(b){return b=C(this,b),R(b)?-1:T(b)?0:1};function I(b){for(var v=b.g.length,w=[],x=0;x<v;x++)w[x]=~b.g[x];return new o(w,~b.h).add(g)}t.abs=function(){return R(this)?I(this):this},t.add=function(b){for(var v=Math.max(this.g.length,b.g.length),w=[],x=0,A=0;A<=v;A++){var P=x+(this.i(A)&65535)+(b.i(A)&65535),E=(P>>>16)+(this.i(A)>>>16)+(b.i(A)>>>16);x=E>>>16,P&=65535,E&=65535,w[A]=E<<16|P}return new o(w,w[w.length-1]&-2147483648?-1:0)};function C(b,v){return b.add(I(v))}t.j=function(b){if(T(this)||T(b))return f;if(R(this))return R(b)?I(this).j(I(b)):I(I(this).j(b));if(R(b))return I(this.j(I(b)));if(0>this.l(_)&&0>b.l(_))return u(this.m()*b.m());for(var v=this.g.length+b.g.length,w=[],x=0;x<2*v;x++)w[x]=0;for(x=0;x<this.g.length;x++)for(var A=0;A<b.g.length;A++){var P=this.i(x)>>>16,E=this.i(x)&65535,Le=b.i(A)>>>16,kt=b.i(A)&65535;w[2*x+2*A]+=E*kt,V(w,2*x+2*A),w[2*x+2*A+1]+=P*kt,V(w,2*x+2*A+1),w[2*x+2*A+1]+=E*Le,V(w,2*x+2*A+1),w[2*x+2*A+2]+=P*Le,V(w,2*x+2*A+2)}for(x=0;x<v;x++)w[x]=w[2*x+1]<<16|w[2*x];for(x=v;x<2*v;x++)w[x]=0;return new o(w,0)};function V(b,v){for(;(b[v]&65535)!=b[v];)b[v+1]+=b[v]>>>16,b[v]&=65535,v++}function D(b,v){this.g=b,this.h=v}function B(b,v){if(T(v))throw Error("division by zero");if(T(b))return new D(f,f);if(R(b))return v=B(I(b),v),new D(I(v.g),I(v.h));if(R(v))return v=B(b,I(v)),new D(I(v.g),v.h);if(30<b.g.length){if(R(b)||R(v))throw Error("slowDivide_ only works with positive integers.");for(var w=g,x=v;0>=x.l(b);)w=L(w),x=L(x);var A=U(w,1),P=U(x,1);for(x=U(x,2),w=U(w,2);!T(x);){var E=P.add(x);0>=E.l(b)&&(A=A.add(w),P=E),x=U(x,1),w=U(w,1)}return v=C(b,A.j(v)),new D(A,v)}for(A=f;0<=b.l(v);){for(w=Math.max(1,Math.floor(b.m()/v.m())),x=Math.ceil(Math.log(w)/Math.LN2),x=48>=x?1:Math.pow(2,x-48),P=u(w),E=P.j(v);R(E)||0<E.l(b);)w-=x,P=u(w),E=P.j(v);T(P)&&(P=g),A=A.add(P),b=C(b,E)}return new D(A,b)}t.A=function(b){return B(this,b).h},t.and=function(b){for(var v=Math.max(this.g.length,b.g.length),w=[],x=0;x<v;x++)w[x]=this.i(x)&b.i(x);return new o(w,this.h&b.h)},t.or=function(b){for(var v=Math.max(this.g.length,b.g.length),w=[],x=0;x<v;x++)w[x]=this.i(x)|b.i(x);return new o(w,this.h|b.h)},t.xor=function(b){for(var v=Math.max(this.g.length,b.g.length),w=[],x=0;x<v;x++)w[x]=this.i(x)^b.i(x);return new o(w,this.h^b.h)};function L(b){for(var v=b.g.length+1,w=[],x=0;x<v;x++)w[x]=b.i(x)<<1|b.i(x-1)>>>31;return new o(w,b.h)}function U(b,v){var w=v>>5;v%=32;for(var x=b.g.length-w,A=[],P=0;P<x;P++)A[P]=0<v?b.i(P+w)>>>v|b.i(P+w+1)<<32-v:b.i(P+w);return new o(A,b.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,zg=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=h,Cn=o}).apply(typeof sf<"u"?sf:typeof self<"u"?self:typeof window<"u"?window:{});var to=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Hg,Ns,Kg,_o,ql,Gg,Qg,Xg;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,d,p){return a==Array.prototype||a==Object.prototype||(a[d]=p.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof to=="object"&&to];for(var d=0;d<a.length;++d){var p=a[d];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var r=n(this);function s(a,d){if(d)e:{var p=r;a=a.split(".");for(var y=0;y<a.length-1;y++){var k=a[y];if(!(k in p))break e;p=p[k]}a=a[a.length-1],y=p[a],d=d(y),d!=y&&d!=null&&e(p,a,{configurable:!0,writable:!0,value:d})}}function i(a,d){a instanceof String&&(a+="");var p=0,y=!1,k={next:function(){if(!y&&p<a.length){var N=p++;return{value:d(N,a[N]),done:!1}}return y=!0,{done:!0,value:void 0}}};return k[Symbol.iterator]=function(){return k},k}s("Array.prototype.values",function(a){return a||function(){return i(this,function(d,p){return p})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function c(a){var d=typeof a;return d=d!="object"?d:a?Array.isArray(a)?"array":d:"null",d=="array"||d=="object"&&typeof a.length=="number"}function u(a){var d=typeof a;return d=="object"&&a!=null||d=="function"}function h(a,d,p){return a.call.apply(a.bind,arguments)}function f(a,d,p){if(!a)throw Error();if(2<arguments.length){var y=Array.prototype.slice.call(arguments,2);return function(){var k=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(k,y),a.apply(d,k)}}return function(){return a.apply(d,arguments)}}function g(a,d,p){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:f,g.apply(null,arguments)}function _(a,d){var p=Array.prototype.slice.call(arguments,1);return function(){var y=p.slice();return y.push.apply(y,arguments),a.apply(this,y)}}function T(a,d){function p(){}p.prototype=d.prototype,a.aa=d.prototype,a.prototype=new p,a.prototype.constructor=a,a.Qb=function(y,k,N){for(var $=Array(arguments.length-2),he=2;he<arguments.length;he++)$[he-2]=arguments[he];return d.prototype[k].apply(y,$)}}function R(a){const d=a.length;if(0<d){const p=Array(d);for(let y=0;y<d;y++)p[y]=a[y];return p}return[]}function I(a,d){for(let p=1;p<arguments.length;p++){const y=arguments[p];if(c(y)){const k=a.length||0,N=y.length||0;a.length=k+N;for(let $=0;$<N;$++)a[k+$]=y[$]}else a.push(y)}}class C{constructor(d,p){this.i=d,this.j=p,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function V(a){return/^[\s\xa0]*$/.test(a)}function D(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function B(a){return B[" "](a),a}B[" "]=function(){};var L=D().indexOf("Gecko")!=-1&&!(D().toLowerCase().indexOf("webkit")!=-1&&D().indexOf("Edge")==-1)&&!(D().indexOf("Trident")!=-1||D().indexOf("MSIE")!=-1)&&D().indexOf("Edge")==-1;function U(a,d,p){for(const y in a)d.call(p,a[y],y,a)}function b(a,d){for(const p in a)d.call(void 0,a[p],p,a)}function v(a){const d={};for(const p in a)d[p]=a[p];return d}const w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function x(a,d){let p,y;for(let k=1;k<arguments.length;k++){y=arguments[k];for(p in y)a[p]=y[p];for(let N=0;N<w.length;N++)p=w[N],Object.prototype.hasOwnProperty.call(y,p)&&(a[p]=y[p])}}function A(a){var d=1;a=a.split(":");const p=[];for(;0<d&&a.length;)p.push(a.shift()),d--;return a.length&&p.push(a.join(":")),p}function P(a){l.setTimeout(()=>{throw a},0)}function E(){var a=lt;let d=null;return a.g&&(d=a.g,a.g=a.g.next,a.g||(a.h=null),d.next=null),d}class Le{constructor(){this.h=this.g=null}add(d,p){const y=kt.get();y.set(d,p),this.h?this.h.next=y:this.g=y,this.h=y}}var kt=new C(()=>new Er,a=>a.reset());class Er{constructor(){this.next=this.g=this.h=null}set(d,p){this.h=d,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let ue,Re=!1,lt=new Le,ct=()=>{const a=l.Promise.resolve(void 0);ue=()=>{a.then(br)}};var br=()=>{for(var a;a=E();){try{a.h.call(a.g)}catch(p){P(p)}var d=kt;d.j(a),100>d.h&&(d.h++,a.next=d.g,d.g=a)}Re=!1};function He(){this.s=this.s,this.C=this.C}He.prototype.s=!1,He.prototype.ma=function(){this.s||(this.s=!0,this.N())},He.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ie(a,d){this.type=a,this.g=this.target=d,this.defaultPrevented=!1}Ie.prototype.h=function(){this.defaultPrevented=!0};var ln=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,d=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const p=()=>{};l.addEventListener("test",p,d),l.removeEventListener("test",p,d)}catch{}return a}();function _t(a,d){if(Ie.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var p=this.type=a.type,y=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=d,d=a.relatedTarget){if(L){e:{try{B(d.nodeName);var k=!0;break e}catch{}k=!1}k||(d=null)}}else p=="mouseover"?d=a.fromElement:p=="mouseout"&&(d=a.toElement);this.relatedTarget=d,y?(this.clientX=y.clientX!==void 0?y.clientX:y.pageX,this.clientY=y.clientY!==void 0?y.clientY:y.pageY,this.screenX=y.screenX||0,this.screenY=y.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Ir[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&_t.aa.h.call(this)}}T(_t,Ie);var Ir={2:"touch",3:"pen",4:"mouse"};_t.prototype.h=function(){_t.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var ft="closure_listenable_"+(1e6*Math.random()|0),F=0;function Y(a,d,p,y,k){this.listener=a,this.proxy=null,this.src=d,this.type=p,this.capture=!!y,this.ha=k,this.key=++F,this.da=this.fa=!1}function fe(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function le(a){this.src=a,this.g={},this.h=0}le.prototype.add=function(a,d,p,y,k){var N=a.toString();a=this.g[N],a||(a=this.g[N]=[],this.h++);var $=cn(a,d,y,k);return-1<$?(d=a[$],p||(d.fa=!1)):(d=new Y(d,this.src,N,!!y,k),d.fa=p,a.push(d)),d};function Ke(a,d){var p=d.type;if(p in a.g){var y=a.g[p],k=Array.prototype.indexOf.call(y,d,void 0),N;(N=0<=k)&&Array.prototype.splice.call(y,k,1),N&&(fe(d),a.g[p].length==0&&(delete a.g[p],a.h--))}}function cn(a,d,p,y){for(var k=0;k<a.length;++k){var N=a[k];if(!N.da&&N.listener==d&&N.capture==!!p&&N.ha==y)return k}return-1}var vt="closure_lm_"+(1e6*Math.random()|0),It={};function Gn(a,d,p,y,k){if(Array.isArray(d)){for(var N=0;N<d.length;N++)Gn(a,d[N],p,y,k);return null}return p=Oi(p),a&&a[ft]?a.K(d,p,u(y)?!!y.capture:!1,k):hs(a,d,p,!1,y,k)}function hs(a,d,p,y,k,N){if(!d)throw Error("Invalid event type");var $=u(k)?!!k.capture:!!k,he=fs(a);if(he||(a[vt]=he=new le(a)),p=he.add(d,p,y,$,N),p.proxy)return p;if(y=ds(),p.proxy=y,y.src=a,y.listener=p,a.addEventListener)ln||(k=$),k===void 0&&(k=!1),a.addEventListener(d.toString(),y,k);else if(a.attachEvent)a.attachEvent(Vi(d.toString()),y);else if(a.addListener&&a.removeListener)a.addListener(y);else throw Error("addEventListener and attachEvent are unavailable.");return p}function ds(){function a(p){return d.call(a.src,a.listener,p)}const d=ja;return a}function xr(a,d,p,y,k){if(Array.isArray(d))for(var N=0;N<d.length;N++)xr(a,d[N],p,y,k);else y=u(y)?!!y.capture:!!y,p=Oi(p),a&&a[ft]?(a=a.i,d=String(d).toString(),d in a.g&&(N=a.g[d],p=cn(N,p,y,k),-1<p&&(fe(N[p]),Array.prototype.splice.call(N,p,1),N.length==0&&(delete a.g[d],a.h--)))):a&&(a=fs(a))&&(d=a.g[d.toString()],a=-1,d&&(a=cn(d,p,y,k)),(p=-1<a?d[a]:null)&&un(p))}function un(a){if(typeof a!="number"&&a&&!a.da){var d=a.src;if(d&&d[ft])Ke(d.i,a);else{var p=a.type,y=a.proxy;d.removeEventListener?d.removeEventListener(p,y,a.capture):d.detachEvent?d.detachEvent(Vi(p),y):d.addListener&&d.removeListener&&d.removeListener(y),(p=fs(d))?(Ke(p,a),p.h==0&&(p.src=null,d[vt]=null)):fe(a)}}}function Vi(a){return a in It?It[a]:It[a]="on"+a}function ja(a,d){if(a.da)a=!0;else{d=new _t(d,this);var p=a.listener,y=a.ha||a.src;a.fa&&un(a),a=p.call(y,d)}return a}function fs(a){return a=a[vt],a instanceof le?a:null}var ps="__closure_events_fn_"+(1e9*Math.random()>>>0);function Oi(a){return typeof a=="function"?a:(a[ps]||(a[ps]=function(d){return a.handleEvent(d)}),a[ps])}function xe(){He.call(this),this.i=new le(this),this.M=this,this.F=null}T(xe,He),xe.prototype[ft]=!0,xe.prototype.removeEventListener=function(a,d,p,y){xr(this,a,d,p,y)};function je(a,d){var p,y=a.F;if(y)for(p=[];y;y=y.F)p.push(y);if(a=a.M,y=d.type||d,typeof d=="string")d=new Ie(d,a);else if(d instanceof Ie)d.target=d.target||a;else{var k=d;d=new Ie(y,a),x(d,k)}if(k=!0,p)for(var N=p.length-1;0<=N;N--){var $=d.g=p[N];k=Ar($,y,!0,d)&&k}if($=d.g=a,k=Ar($,y,!0,d)&&k,k=Ar($,y,!1,d)&&k,p)for(N=0;N<p.length;N++)$=d.g=p[N],k=Ar($,y,!1,d)&&k}xe.prototype.N=function(){if(xe.aa.N.call(this),this.i){var a=this.i,d;for(d in a.g){for(var p=a.g[d],y=0;y<p.length;y++)fe(p[y]);delete a.g[d],a.h--}}this.F=null},xe.prototype.K=function(a,d,p,y){return this.i.add(String(a),d,!1,p,y)},xe.prototype.L=function(a,d,p,y){return this.i.add(String(a),d,!0,p,y)};function Ar(a,d,p,y){if(d=a.i.g[String(d)],!d)return!0;d=d.concat();for(var k=!0,N=0;N<d.length;++N){var $=d[N];if($&&!$.da&&$.capture==p){var he=$.listener,Fe=$.ha||$.src;$.fa&&Ke(a.i,$),k=he.call(Fe,y)!==!1&&k}}return k&&!y.defaultPrevented}function j(a,d,p){if(typeof a=="function")p&&(a=g(a,p));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:l.setTimeout(a,d||0)}function q(a){a.g=j(()=>{a.g=null,a.i&&(a.i=!1,q(a))},a.l);const d=a.h;a.h=null,a.m.apply(null,d)}class ne extends He{constructor(d,p){super(),this.m=d,this.l=p,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:q(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function te(a){He.call(this),this.h=a,this.g={}}T(te,He);var Ve=[];function ae(a){U(a.g,function(d,p){this.g.hasOwnProperty(p)&&un(d)},a),a.g={}}te.prototype.N=function(){te.aa.N.call(this),ae(this)},te.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ge=l.JSON.stringify,Ue=l.JSON.parse,Ne=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function hn(){}hn.prototype.h=null;function Qn(a){return a.h||(a.h=a.i())}function Mi(){}var ms={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ua(){Ie.call(this,"d")}T(Ua,Ie);function Fa(){Ie.call(this,"c")}T(Fa,Ie);var Xn={},mh=null;function Li(){return mh=mh||new xe}Xn.La="serverreachability";function gh(a){Ie.call(this,Xn.La,a)}T(gh,Ie);function gs(a){const d=Li();je(d,new gh(d))}Xn.STAT_EVENT="statevent";function yh(a,d){Ie.call(this,Xn.STAT_EVENT,a),this.stat=d}T(yh,Ie);function st(a){const d=Li();je(d,new yh(d,a))}Xn.Ma="timingevent";function _h(a,d){Ie.call(this,Xn.Ma,a),this.size=d}T(_h,Ie);function ys(a,d){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},d)}function _s(){this.g=!0}_s.prototype.xa=function(){this.g=!1};function x0(a,d,p,y,k,N){a.info(function(){if(a.g)if(N)for(var $="",he=N.split("&"),Fe=0;Fe<he.length;Fe++){var oe=he[Fe].split("=");if(1<oe.length){var Qe=oe[0];oe=oe[1];var Xe=Qe.split("_");$=2<=Xe.length&&Xe[1]=="type"?$+(Qe+"="+oe+"&"):$+(Qe+"=redacted&")}}else $=null;else $=N;return"XMLHTTP REQ ("+y+") [attempt "+k+"]: "+d+`
`+p+`
`+$})}function A0(a,d,p,y,k,N,$){a.info(function(){return"XMLHTTP RESP ("+y+") [ attempt "+k+"]: "+d+`
`+p+`
`+N+" "+$})}function Sr(a,d,p,y){a.info(function(){return"XMLHTTP TEXT ("+d+"): "+R0(a,p)+(y?" "+y:"")})}function S0(a,d){a.info(function(){return"TIMEOUT: "+d})}_s.prototype.info=function(){};function R0(a,d){if(!a.g)return d;if(!d)return null;try{var p=JSON.parse(d);if(p){for(a=0;a<p.length;a++)if(Array.isArray(p[a])){var y=p[a];if(!(2>y.length)){var k=y[1];if(Array.isArray(k)&&!(1>k.length)){var N=k[0];if(N!="noop"&&N!="stop"&&N!="close")for(var $=1;$<k.length;$++)k[$]=""}}}}return Ge(p)}catch{return d}}var ji={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},vh={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ba;function Ui(){}T(Ui,hn),Ui.prototype.g=function(){return new XMLHttpRequest},Ui.prototype.i=function(){return{}},Ba=new Ui;function dn(a,d,p,y){this.j=a,this.i=d,this.l=p,this.R=y||1,this.U=new te(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new wh}function wh(){this.i=null,this.g="",this.h=!1}var Th={},$a={};function qa(a,d,p){a.L=1,a.v=qi(Ht(d)),a.m=p,a.P=!0,Eh(a,null)}function Eh(a,d){a.F=Date.now(),Fi(a),a.A=Ht(a.v);var p=a.A,y=a.R;Array.isArray(y)||(y=[String(y)]),Mh(p.i,"t",y),a.C=0,p=a.j.J,a.h=new wh,a.g=ed(a.j,p?d:null,!a.m),0<a.O&&(a.M=new ne(g(a.Y,a,a.g),a.O)),d=a.U,p=a.g,y=a.ca;var k="readystatechange";Array.isArray(k)||(k&&(Ve[0]=k.toString()),k=Ve);for(var N=0;N<k.length;N++){var $=Gn(p,k[N],y||d.handleEvent,!1,d.h||d);if(!$)break;d.g[$.key]=$}d=a.H?v(a.H):{},a.m?(a.u||(a.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,d)):(a.u="GET",a.g.ea(a.A,a.u,null,d)),gs(),x0(a.i,a.u,a.A,a.l,a.R,a.m)}dn.prototype.ca=function(a){a=a.target;const d=this.M;d&&Kt(a)==3?d.j():this.Y(a)},dn.prototype.Y=function(a){try{if(a==this.g)e:{const Xe=Kt(this.g);var d=this.g.Ba();const Cr=this.g.Z();if(!(3>Xe)&&(Xe!=3||this.g&&(this.h.h||this.g.oa()||qh(this.g)))){this.J||Xe!=4||d==7||(d==8||0>=Cr?gs(3):gs(2)),Wa(this);var p=this.g.Z();this.X=p;t:if(bh(this)){var y=qh(this.g);a="";var k=y.length,N=Kt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Yn(this),vs(this);var $="";break t}this.h.i=new l.TextDecoder}for(d=0;d<k;d++)this.h.h=!0,a+=this.h.i.decode(y[d],{stream:!(N&&d==k-1)});y.length=0,this.h.g+=a,this.C=0,$=this.h.g}else $=this.g.oa();if(this.o=p==200,A0(this.i,this.u,this.A,this.l,this.R,Xe,p),this.o){if(this.T&&!this.K){t:{if(this.g){var he,Fe=this.g;if((he=Fe.g?Fe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!V(he)){var oe=he;break t}}oe=null}if(p=oe)Sr(this.i,this.l,p,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,za(this,p);else{this.o=!1,this.s=3,st(12),Yn(this),vs(this);break e}}if(this.P){p=!0;let xt;for(;!this.J&&this.C<$.length;)if(xt=P0(this,$),xt==$a){Xe==4&&(this.s=4,st(14),p=!1),Sr(this.i,this.l,null,"[Incomplete Response]");break}else if(xt==Th){this.s=4,st(15),Sr(this.i,this.l,$,"[Invalid Chunk]"),p=!1;break}else Sr(this.i,this.l,xt,null),za(this,xt);if(bh(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Xe!=4||$.length!=0||this.h.h||(this.s=1,st(16),p=!1),this.o=this.o&&p,!p)Sr(this.i,this.l,$,"[Invalid Chunked Response]"),Yn(this),vs(this);else if(0<$.length&&!this.W){this.W=!0;var Qe=this.j;Qe.g==this&&Qe.ba&&!Qe.M&&(Qe.j.info("Great, no buffering proxy detected. Bytes received: "+$.length),Ya(Qe),Qe.M=!0,st(11))}}else Sr(this.i,this.l,$,null),za(this,$);Xe==4&&Yn(this),this.o&&!this.J&&(Xe==4?Xh(this.j,this):(this.o=!1,Fi(this)))}else H0(this.g),p==400&&0<$.indexOf("Unknown SID")?(this.s=3,st(12)):(this.s=0,st(13)),Yn(this),vs(this)}}}catch{}finally{}};function bh(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function P0(a,d){var p=a.C,y=d.indexOf(`
`,p);return y==-1?$a:(p=Number(d.substring(p,y)),isNaN(p)?Th:(y+=1,y+p>d.length?$a:(d=d.slice(y,y+p),a.C=y+p,d)))}dn.prototype.cancel=function(){this.J=!0,Yn(this)};function Fi(a){a.S=Date.now()+a.I,Ih(a,a.I)}function Ih(a,d){if(a.B!=null)throw Error("WatchDog timer not null");a.B=ys(g(a.ba,a),d)}function Wa(a){a.B&&(l.clearTimeout(a.B),a.B=null)}dn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(S0(this.i,this.A),this.L!=2&&(gs(),st(17)),Yn(this),this.s=2,vs(this)):Ih(this,this.S-a)};function vs(a){a.j.G==0||a.J||Xh(a.j,a)}function Yn(a){Wa(a);var d=a.M;d&&typeof d.ma=="function"&&d.ma(),a.M=null,ae(a.U),a.g&&(d=a.g,a.g=null,d.abort(),d.ma())}function za(a,d){try{var p=a.j;if(p.G!=0&&(p.g==a||Ha(p.h,a))){if(!a.K&&Ha(p.h,a)&&p.G==3){try{var y=p.Da.g.parse(d)}catch{y=null}if(Array.isArray(y)&&y.length==3){var k=y;if(k[0]==0){e:if(!p.u){if(p.g)if(p.g.F+3e3<a.F)Qi(p),Ki(p);else break e;Xa(p),st(18)}}else p.za=k[1],0<p.za-p.T&&37500>k[2]&&p.F&&p.v==0&&!p.C&&(p.C=ys(g(p.Za,p),6e3));if(1>=Sh(p.h)&&p.ca){try{p.ca()}catch{}p.ca=void 0}}else Zn(p,11)}else if((a.K||p.g==a)&&Qi(p),!V(d))for(k=p.Da.g.parse(d),d=0;d<k.length;d++){let oe=k[d];if(p.T=oe[0],oe=oe[1],p.G==2)if(oe[0]=="c"){p.K=oe[1],p.ia=oe[2];const Qe=oe[3];Qe!=null&&(p.la=Qe,p.j.info("VER="+p.la));const Xe=oe[4];Xe!=null&&(p.Aa=Xe,p.j.info("SVER="+p.Aa));const Cr=oe[5];Cr!=null&&typeof Cr=="number"&&0<Cr&&(y=1.5*Cr,p.L=y,p.j.info("backChannelRequestTimeoutMs_="+y)),y=p;const xt=a.g;if(xt){const Yi=xt.g?xt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Yi){var N=y.h;N.g||Yi.indexOf("spdy")==-1&&Yi.indexOf("quic")==-1&&Yi.indexOf("h2")==-1||(N.j=N.l,N.g=new Set,N.h&&(Ka(N,N.h),N.h=null))}if(y.D){const Ja=xt.g?xt.g.getResponseHeader("X-HTTP-Session-Id"):null;Ja&&(y.ya=Ja,pe(y.I,y.D,Ja))}}p.G=3,p.l&&p.l.ua(),p.ba&&(p.R=Date.now()-a.F,p.j.info("Handshake RTT: "+p.R+"ms")),y=p;var $=a;if(y.qa=Zh(y,y.J?y.ia:null,y.W),$.K){Rh(y.h,$);var he=$,Fe=y.L;Fe&&(he.I=Fe),he.B&&(Wa(he),Fi(he)),y.g=$}else Gh(y);0<p.i.length&&Gi(p)}else oe[0]!="stop"&&oe[0]!="close"||Zn(p,7);else p.G==3&&(oe[0]=="stop"||oe[0]=="close"?oe[0]=="stop"?Zn(p,7):Qa(p):oe[0]!="noop"&&p.l&&p.l.ta(oe),p.v=0)}}gs(4)}catch{}}var C0=class{constructor(a,d){this.g=a,this.map=d}};function xh(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ah(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Sh(a){return a.h?1:a.g?a.g.size:0}function Ha(a,d){return a.h?a.h==d:a.g?a.g.has(d):!1}function Ka(a,d){a.g?a.g.add(d):a.h=d}function Rh(a,d){a.h&&a.h==d?a.h=null:a.g&&a.g.has(d)&&a.g.delete(d)}xh.prototype.cancel=function(){if(this.i=Ph(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Ph(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let d=a.i;for(const p of a.g.values())d=d.concat(p.D);return d}return R(a.i)}function k0(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var d=[],p=a.length,y=0;y<p;y++)d.push(a[y]);return d}d=[],p=0;for(y in a)d[p++]=a[y];return d}function N0(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var d=[];a=a.length;for(var p=0;p<a;p++)d.push(p);return d}d=[],p=0;for(const y in a)d[p++]=y;return d}}}function Ch(a,d){if(a.forEach&&typeof a.forEach=="function")a.forEach(d,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,d,void 0);else for(var p=N0(a),y=k0(a),k=y.length,N=0;N<k;N++)d.call(void 0,y[N],p&&p[N],a)}var kh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function D0(a,d){if(a){a=a.split("&");for(var p=0;p<a.length;p++){var y=a[p].indexOf("="),k=null;if(0<=y){var N=a[p].substring(0,y);k=a[p].substring(y+1)}else N=a[p];d(N,k?decodeURIComponent(k.replace(/\+/g," ")):"")}}}function Jn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Jn){this.h=a.h,Bi(this,a.j),this.o=a.o,this.g=a.g,$i(this,a.s),this.l=a.l;var d=a.i,p=new Es;p.i=d.i,d.g&&(p.g=new Map(d.g),p.h=d.h),Nh(this,p),this.m=a.m}else a&&(d=String(a).match(kh))?(this.h=!1,Bi(this,d[1]||"",!0),this.o=ws(d[2]||""),this.g=ws(d[3]||"",!0),$i(this,d[4]),this.l=ws(d[5]||"",!0),Nh(this,d[6]||"",!0),this.m=ws(d[7]||"")):(this.h=!1,this.i=new Es(null,this.h))}Jn.prototype.toString=function(){var a=[],d=this.j;d&&a.push(Ts(d,Dh,!0),":");var p=this.g;return(p||d=="file")&&(a.push("//"),(d=this.o)&&a.push(Ts(d,Dh,!0),"@"),a.push(encodeURIComponent(String(p)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.s,p!=null&&a.push(":",String(p))),(p=this.l)&&(this.g&&p.charAt(0)!="/"&&a.push("/"),a.push(Ts(p,p.charAt(0)=="/"?M0:O0,!0))),(p=this.i.toString())&&a.push("?",p),(p=this.m)&&a.push("#",Ts(p,j0)),a.join("")};function Ht(a){return new Jn(a)}function Bi(a,d,p){a.j=p?ws(d,!0):d,a.j&&(a.j=a.j.replace(/:$/,""))}function $i(a,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);a.s=d}else a.s=null}function Nh(a,d,p){d instanceof Es?(a.i=d,U0(a.i,a.h)):(p||(d=Ts(d,L0)),a.i=new Es(d,a.h))}function pe(a,d,p){a.i.set(d,p)}function qi(a){return pe(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function ws(a,d){return a?d?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Ts(a,d,p){return typeof a=="string"?(a=encodeURI(a).replace(d,V0),p&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function V0(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Dh=/[#\/\?@]/g,O0=/[#\?:]/g,M0=/[#\?]/g,L0=/[#\?@]/g,j0=/#/g;function Es(a,d){this.h=this.g=null,this.i=a||null,this.j=!!d}function fn(a){a.g||(a.g=new Map,a.h=0,a.i&&D0(a.i,function(d,p){a.add(decodeURIComponent(d.replace(/\+/g," ")),p)}))}t=Es.prototype,t.add=function(a,d){fn(this),this.i=null,a=Rr(this,a);var p=this.g.get(a);return p||this.g.set(a,p=[]),p.push(d),this.h+=1,this};function Vh(a,d){fn(a),d=Rr(a,d),a.g.has(d)&&(a.i=null,a.h-=a.g.get(d).length,a.g.delete(d))}function Oh(a,d){return fn(a),d=Rr(a,d),a.g.has(d)}t.forEach=function(a,d){fn(this),this.g.forEach(function(p,y){p.forEach(function(k){a.call(d,k,y,this)},this)},this)},t.na=function(){fn(this);const a=Array.from(this.g.values()),d=Array.from(this.g.keys()),p=[];for(let y=0;y<d.length;y++){const k=a[y];for(let N=0;N<k.length;N++)p.push(d[y])}return p},t.V=function(a){fn(this);let d=[];if(typeof a=="string")Oh(this,a)&&(d=d.concat(this.g.get(Rr(this,a))));else{a=Array.from(this.g.values());for(let p=0;p<a.length;p++)d=d.concat(a[p])}return d},t.set=function(a,d){return fn(this),this.i=null,a=Rr(this,a),Oh(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[d]),this.h+=1,this},t.get=function(a,d){return a?(a=this.V(a),0<a.length?String(a[0]):d):d};function Mh(a,d,p){Vh(a,d),0<p.length&&(a.i=null,a.g.set(Rr(a,d),R(p)),a.h+=p.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],d=Array.from(this.g.keys());for(var p=0;p<d.length;p++){var y=d[p];const N=encodeURIComponent(String(y)),$=this.V(y);for(y=0;y<$.length;y++){var k=N;$[y]!==""&&(k+="="+encodeURIComponent(String($[y]))),a.push(k)}}return this.i=a.join("&")};function Rr(a,d){return d=String(d),a.j&&(d=d.toLowerCase()),d}function U0(a,d){d&&!a.j&&(fn(a),a.i=null,a.g.forEach(function(p,y){var k=y.toLowerCase();y!=k&&(Vh(this,y),Mh(this,k,p))},a)),a.j=d}function F0(a,d){const p=new _s;if(l.Image){const y=new Image;y.onload=_(pn,p,"TestLoadImage: loaded",!0,d,y),y.onerror=_(pn,p,"TestLoadImage: error",!1,d,y),y.onabort=_(pn,p,"TestLoadImage: abort",!1,d,y),y.ontimeout=_(pn,p,"TestLoadImage: timeout",!1,d,y),l.setTimeout(function(){y.ontimeout&&y.ontimeout()},1e4),y.src=a}else d(!1)}function B0(a,d){const p=new _s,y=new AbortController,k=setTimeout(()=>{y.abort(),pn(p,"TestPingServer: timeout",!1,d)},1e4);fetch(a,{signal:y.signal}).then(N=>{clearTimeout(k),N.ok?pn(p,"TestPingServer: ok",!0,d):pn(p,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(k),pn(p,"TestPingServer: error",!1,d)})}function pn(a,d,p,y,k){try{k&&(k.onload=null,k.onerror=null,k.onabort=null,k.ontimeout=null),y(p)}catch{}}function $0(){this.g=new Ne}function q0(a,d,p){const y=p||"";try{Ch(a,function(k,N){let $=k;u(k)&&($=Ge(k)),d.push(y+N+"="+encodeURIComponent($))})}catch(k){throw d.push(y+"type="+encodeURIComponent("_badmap")),k}}function Wi(a){this.l=a.Ub||null,this.j=a.eb||!1}T(Wi,hn),Wi.prototype.g=function(){return new zi(this.l,this.j)},Wi.prototype.i=function(a){return function(){return a}}({});function zi(a,d){xe.call(this),this.D=a,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}T(zi,xe),t=zi.prototype,t.open=function(a,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=d,this.readyState=1,Is(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(d.body=a),(this.D||l).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,bs(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Is(this)),this.g&&(this.readyState=3,Is(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Lh(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Lh(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var d=a.value?a.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!a.done}))&&(this.response=this.responseText+=d)}a.done?bs(this):Is(this),this.readyState==3&&Lh(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,bs(this))},t.Qa=function(a){this.g&&(this.response=a,bs(this))},t.ga=function(){this.g&&bs(this)};function bs(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Is(a)}t.setRequestHeader=function(a,d){this.u.append(a,d)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],d=this.h.entries();for(var p=d.next();!p.done;)p=p.value,a.push(p[0]+": "+p[1]),p=d.next();return a.join(`\r
`)};function Is(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(zi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function jh(a){let d="";return U(a,function(p,y){d+=y,d+=":",d+=p,d+=`\r
`}),d}function Ga(a,d,p){e:{for(y in p){var y=!1;break e}y=!0}y||(p=jh(p),typeof a=="string"?p!=null&&encodeURIComponent(String(p)):pe(a,d,p))}function ve(a){xe.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}T(ve,xe);var W0=/^https?$/i,z0=["POST","PUT"];t=ve.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,d,p,y){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);d=d?d.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ba.g(),this.v=this.o?Qn(this.o):Qn(Ba),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(d,String(a),!0),this.B=!1}catch(N){Uh(this,N);return}if(a=p||"",p=new Map(this.headers),y)if(Object.getPrototypeOf(y)===Object.prototype)for(var k in y)p.set(k,y[k]);else if(typeof y.keys=="function"&&typeof y.get=="function")for(const N of y.keys())p.set(N,y.get(N));else throw Error("Unknown input type for opt_headers: "+String(y));y=Array.from(p.keys()).find(N=>N.toLowerCase()=="content-type"),k=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(z0,d,void 0))||y||k||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[N,$]of p)this.g.setRequestHeader(N,$);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{$h(this),this.u=!0,this.g.send(a),this.u=!1}catch(N){Uh(this,N)}};function Uh(a,d){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=d,a.m=5,Fh(a),Hi(a)}function Fh(a){a.A||(a.A=!0,je(a,"complete"),je(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,je(this,"complete"),je(this,"abort"),Hi(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Hi(this,!0)),ve.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Bh(this):this.bb())},t.bb=function(){Bh(this)};function Bh(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Kt(a)!=4||a.Z()!=2)){if(a.u&&Kt(a)==4)j(a.Ea,0,a);else if(je(a,"readystatechange"),Kt(a)==4){a.h=!1;try{const $=a.Z();e:switch($){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var p;if(!(p=d)){var y;if(y=$===0){var k=String(a.D).match(kh)[1]||null;!k&&l.self&&l.self.location&&(k=l.self.location.protocol.slice(0,-1)),y=!W0.test(k?k.toLowerCase():"")}p=y}if(p)je(a,"complete"),je(a,"success");else{a.m=6;try{var N=2<Kt(a)?a.g.statusText:""}catch{N=""}a.l=N+" ["+a.Z()+"]",Fh(a)}}finally{Hi(a)}}}}function Hi(a,d){if(a.g){$h(a);const p=a.g,y=a.v[0]?()=>{}:null;a.g=null,a.v=null,d||je(a,"ready");try{p.onreadystatechange=y}catch{}}}function $h(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function Kt(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<Kt(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var d=this.g.responseText;return a&&d.indexOf(a)==0&&(d=d.substring(a.length)),Ue(d)}};function qh(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function H0(a){const d={};a=(a.g&&2<=Kt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let y=0;y<a.length;y++){if(V(a[y]))continue;var p=A(a[y]);const k=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const N=d[k]||[];d[k]=N,N.push(p)}b(d,function(y){return y.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function xs(a,d,p){return p&&p.internalChannelParams&&p.internalChannelParams[a]||d}function Wh(a){this.Aa=0,this.i=[],this.j=new _s,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=xs("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=xs("baseRetryDelayMs",5e3,a),this.cb=xs("retryDelaySeedMs",1e4,a),this.Wa=xs("forwardChannelMaxRetries",2,a),this.wa=xs("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new xh(a&&a.concurrentRequestLimit),this.Da=new $0,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Wh.prototype,t.la=8,t.G=1,t.connect=function(a,d,p,y){st(0),this.W=a,this.H=d||{},p&&y!==void 0&&(this.H.OSID=p,this.H.OAID=y),this.F=this.X,this.I=Zh(this,null,this.W),Gi(this)};function Qa(a){if(zh(a),a.G==3){var d=a.U++,p=Ht(a.I);if(pe(p,"SID",a.K),pe(p,"RID",d),pe(p,"TYPE","terminate"),As(a,p),d=new dn(a,a.j,d),d.L=2,d.v=qi(Ht(p)),p=!1,l.navigator&&l.navigator.sendBeacon)try{p=l.navigator.sendBeacon(d.v.toString(),"")}catch{}!p&&l.Image&&(new Image().src=d.v,p=!0),p||(d.g=ed(d.j,null),d.g.ea(d.v)),d.F=Date.now(),Fi(d)}Jh(a)}function Ki(a){a.g&&(Ya(a),a.g.cancel(),a.g=null)}function zh(a){Ki(a),a.u&&(l.clearTimeout(a.u),a.u=null),Qi(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function Gi(a){if(!Ah(a.h)&&!a.s){a.s=!0;var d=a.Ga;ue||ct(),Re||(ue(),Re=!0),lt.add(d,a),a.B=0}}function K0(a,d){return Sh(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=d.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=ys(g(a.Ga,a,d),Yh(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const k=new dn(this,this.j,a);let N=this.o;if(this.S&&(N?(N=v(N),x(N,this.S)):N=this.S),this.m!==null||this.O||(k.H=N,N=null),this.P)e:{for(var d=0,p=0;p<this.i.length;p++){t:{var y=this.i[p];if("__data__"in y.map&&(y=y.map.__data__,typeof y=="string")){y=y.length;break t}y=void 0}if(y===void 0)break;if(d+=y,4096<d){d=p;break e}if(d===4096||p===this.i.length-1){d=p+1;break e}}d=1e3}else d=1e3;d=Kh(this,k,d),p=Ht(this.I),pe(p,"RID",a),pe(p,"CVER",22),this.D&&pe(p,"X-HTTP-Session-Id",this.D),As(this,p),N&&(this.O?d="headers="+encodeURIComponent(String(jh(N)))+"&"+d:this.m&&Ga(p,this.m,N)),Ka(this.h,k),this.Ua&&pe(p,"TYPE","init"),this.P?(pe(p,"$req",d),pe(p,"SID","null"),k.T=!0,qa(k,p,null)):qa(k,p,d),this.G=2}}else this.G==3&&(a?Hh(this,a):this.i.length==0||Ah(this.h)||Hh(this))};function Hh(a,d){var p;d?p=d.l:p=a.U++;const y=Ht(a.I);pe(y,"SID",a.K),pe(y,"RID",p),pe(y,"AID",a.T),As(a,y),a.m&&a.o&&Ga(y,a.m,a.o),p=new dn(a,a.j,p,a.B+1),a.m===null&&(p.H=a.o),d&&(a.i=d.D.concat(a.i)),d=Kh(a,p,1e3),p.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Ka(a.h,p),qa(p,y,d)}function As(a,d){a.H&&U(a.H,function(p,y){pe(d,y,p)}),a.l&&Ch({},function(p,y){pe(d,y,p)})}function Kh(a,d,p){p=Math.min(a.i.length,p);var y=a.l?g(a.l.Na,a.l,a):null;e:{var k=a.i;let N=-1;for(;;){const $=["count="+p];N==-1?0<p?(N=k[0].g,$.push("ofs="+N)):N=0:$.push("ofs="+N);let he=!0;for(let Fe=0;Fe<p;Fe++){let oe=k[Fe].g;const Qe=k[Fe].map;if(oe-=N,0>oe)N=Math.max(0,k[Fe].g-100),he=!1;else try{q0(Qe,$,"req"+oe+"_")}catch{y&&y(Qe)}}if(he){y=$.join("&");break e}}}return a=a.i.splice(0,p),d.D=a,y}function Gh(a){if(!a.g&&!a.u){a.Y=1;var d=a.Fa;ue||ct(),Re||(ue(),Re=!0),lt.add(d,a),a.v=0}}function Xa(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=ys(g(a.Fa,a),Yh(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,Qh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=ys(g(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,st(10),Ki(this),Qh(this))};function Ya(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function Qh(a){a.g=new dn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var d=Ht(a.qa);pe(d,"RID","rpc"),pe(d,"SID",a.K),pe(d,"AID",a.T),pe(d,"CI",a.F?"0":"1"),!a.F&&a.ja&&pe(d,"TO",a.ja),pe(d,"TYPE","xmlhttp"),As(a,d),a.m&&a.o&&Ga(d,a.m,a.o),a.L&&(a.g.I=a.L);var p=a.g;a=a.ia,p.L=1,p.v=qi(Ht(d)),p.m=null,p.P=!0,Eh(p,a)}t.Za=function(){this.C!=null&&(this.C=null,Ki(this),Xa(this),st(19))};function Qi(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function Xh(a,d){var p=null;if(a.g==d){Qi(a),Ya(a),a.g=null;var y=2}else if(Ha(a.h,d))p=d.D,Rh(a.h,d),y=1;else return;if(a.G!=0){if(d.o)if(y==1){p=d.m?d.m.length:0,d=Date.now()-d.F;var k=a.B;y=Li(),je(y,new _h(y,p)),Gi(a)}else Gh(a);else if(k=d.s,k==3||k==0&&0<d.X||!(y==1&&K0(a,d)||y==2&&Xa(a)))switch(p&&0<p.length&&(d=a.h,d.i=d.i.concat(p)),k){case 1:Zn(a,5);break;case 4:Zn(a,10);break;case 3:Zn(a,6);break;default:Zn(a,2)}}}function Yh(a,d){let p=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(p*=2),p*d}function Zn(a,d){if(a.j.info("Error code "+d),d==2){var p=g(a.fb,a),y=a.Xa;const k=!y;y=new Jn(y||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Bi(y,"https"),qi(y),k?F0(y.toString(),p):B0(y.toString(),p)}else st(2);a.G=0,a.l&&a.l.sa(d),Jh(a),zh(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),st(2)):(this.j.info("Failed to ping google.com"),st(1))};function Jh(a){if(a.G=0,a.ka=[],a.l){const d=Ph(a.h);(d.length!=0||a.i.length!=0)&&(I(a.ka,d),I(a.ka,a.i),a.h.i.length=0,R(a.i),a.i.length=0),a.l.ra()}}function Zh(a,d,p){var y=p instanceof Jn?Ht(p):new Jn(p);if(y.g!="")d&&(y.g=d+"."+y.g),$i(y,y.s);else{var k=l.location;y=k.protocol,d=d?d+"."+k.hostname:k.hostname,k=+k.port;var N=new Jn(null);y&&Bi(N,y),d&&(N.g=d),k&&$i(N,k),p&&(N.l=p),y=N}return p=a.D,d=a.ya,p&&d&&pe(y,p,d),pe(y,"VER",a.la),As(a,y),y}function ed(a,d,p){if(d&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=a.Ca&&!a.pa?new ve(new Wi({eb:p})):new ve(a.pa),d.Ha(a.J),d}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function td(){}t=td.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Xi(){}Xi.prototype.g=function(a,d){return new pt(a,d)};function pt(a,d){xe.call(this),this.g=new Wh(d),this.l=a,this.h=d&&d.messageUrlParams||null,a=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(a?a["X-WebChannel-Content-Type"]=d.messageContentType:a={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(a?a["X-WebChannel-Client-Profile"]=d.va:a={"X-WebChannel-Client-Profile":d.va}),this.g.S=a,(a=d&&d.Sb)&&!V(a)&&(this.g.m=a),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!V(d)&&(this.g.D=d,a=this.h,a!==null&&d in a&&(a=this.h,d in a&&delete a[d])),this.j=new Pr(this)}T(pt,xe),pt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},pt.prototype.close=function(){Qa(this.g)},pt.prototype.o=function(a){var d=this.g;if(typeof a=="string"){var p={};p.__data__=a,a=p}else this.u&&(p={},p.__data__=Ge(a),a=p);d.i.push(new C0(d.Ya++,a)),d.G==3&&Gi(d)},pt.prototype.N=function(){this.g.l=null,delete this.j,Qa(this.g),delete this.g,pt.aa.N.call(this)};function nd(a){Ua.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var d=a.__sm__;if(d){e:{for(const p in d){a=p;break e}a=void 0}(this.i=a)&&(a=this.i,d=d!==null&&a in d?d[a]:void 0),this.data=d}else this.data=a}T(nd,Ua);function rd(){Fa.call(this),this.status=1}T(rd,Fa);function Pr(a){this.g=a}T(Pr,td),Pr.prototype.ua=function(){je(this.g,"a")},Pr.prototype.ta=function(a){je(this.g,new nd(a))},Pr.prototype.sa=function(a){je(this.g,new rd)},Pr.prototype.ra=function(){je(this.g,"b")},Xi.prototype.createWebChannel=Xi.prototype.g,pt.prototype.send=pt.prototype.o,pt.prototype.open=pt.prototype.m,pt.prototype.close=pt.prototype.close,Xg=function(){return new Xi},Qg=function(){return Li()},Gg=Xn,ql={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ji.NO_ERROR=0,ji.TIMEOUT=8,ji.HTTP_ERROR=6,_o=ji,vh.COMPLETE="complete",Kg=vh,Mi.EventType=ms,ms.OPEN="a",ms.CLOSE="b",ms.ERROR="c",ms.MESSAGE="d",xe.prototype.listen=xe.prototype.K,Ns=Mi,ve.prototype.listenOnce=ve.prototype.L,ve.prototype.getLastError=ve.prototype.Ka,ve.prototype.getLastErrorCode=ve.prototype.Ba,ve.prototype.getStatus=ve.prototype.Z,ve.prototype.getResponseJson=ve.prototype.Oa,ve.prototype.getResponseText=ve.prototype.oa,ve.prototype.send=ve.prototype.ea,ve.prototype.setWithCredentials=ve.prototype.Ha,Hg=ve}).apply(typeof to<"u"?to:typeof self<"u"?self:typeof window<"u"?window:{});const of="@firebase/firestore",af="4.7.10";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ze.UNAUTHENTICATED=new Ze(null),Ze.GOOGLE_CREDENTIALS=new Ze("google-credentials-uid"),Ze.FIRST_PARTY=new Ze("first-party-uid"),Ze.MOCK_USER=new Ze("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ss="11.5.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr=new Cc("@firebase/firestore");function Nr(){return dr.logLevel}function z(t,...e){if(dr.logLevel<=re.DEBUG){const n=e.map(qc);dr.debug(`Firestore (${ss}): ${t}`,...n)}}function rn(t,...e){if(dr.logLevel<=re.ERROR){const n=e.map(qc);dr.error(`Firestore (${ss}): ${t}`,...n)}}function Kr(t,...e){if(dr.logLevel<=re.WARN){const n=e.map(qc);dr.warn(`Firestore (${ss}): ${t}`,...n)}}function qc(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X(t="Unexpected state"){const e=`FIRESTORE (${ss}) INTERNAL ASSERTION FAILED: `+t;throw rn(e),new Error(e)}function ce(t,e){t||X()}function Z(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class H extends zt{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yg{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class wx{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(Ze.UNAUTHENTICATED))}shutdown(){}}class Tx{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class Ex{constructor(e){this.t=e,this.currentUser=Ze.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){ce(this.o===void 0);let r=this.i;const s=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let i=new en;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new en,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},l=c=>{z("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(z("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new en)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(z("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ce(typeof r.accessToken=="string"),new Yg(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ce(e===null||typeof e=="string"),new Ze(e)}}class bx{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=Ze.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class Ix{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new bx(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(Ze.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class lf{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class xx{constructor(e,n){this.A=n,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,mt(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,n){ce(this.o===void 0);const r=i=>{i.error!=null&&z("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,z("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{z("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):z("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new lf(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(ce(typeof n.token=="string"),this.R=n.token,new lf(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ax(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jg(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Ax(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%62))}return r}}function ee(t,e){return t<e?-1:t>e?1:0}function Wl(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=t.codePointAt(n),s=e.codePointAt(n);if(r!==s){if(r<128&&s<128)return ee(r,s);{const i=Jg(),o=Sx(i.encode(cf(t,n)),i.encode(cf(e,n)));return o!==0?o:ee(r,s)}}n+=r>65535?2:1}return ee(t.length,e.length)}function cf(t,e){return t.codePointAt(e)>65535?t.substring(e,e+2):t.substring(e,e+1)}function Sx(t,e){for(let n=0;n<t.length&&n<e.length;++n)if(t[n]!==e[n])return ee(t[n],e[n]);return ee(t.length,e.length)}function Gr(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uf=-62135596800,hf=1e6;class Te{static now(){return Te.fromMillis(Date.now())}static fromDate(e){return Te.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*hf);return new Te(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new H(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new H(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<uf)throw new H(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new H(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/hf}_compareTo(e){return this.seconds===e.seconds?ee(this.nanoseconds,e.nanoseconds):ee(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-uf;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{static fromTimestamp(e){return new J(e)}static min(){return new J(new Te(0,0))}static max(){return new J(new Te(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const df="__name__";class Nt{constructor(e,n,r){n===void 0?n=0:n>e.length&&X(),r===void 0?r=e.length-n:r>e.length-n&&X(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Nt.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Nt?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=Nt.compareSegments(e.get(s),n.get(s));if(i!==0)return i}return ee(e.length,n.length)}static compareSegments(e,n){const r=Nt.isNumericId(e),s=Nt.isNumericId(n);return r&&!s?-1:!r&&s?1:r&&s?Nt.extractNumericId(e).compare(Nt.extractNumericId(n)):Wl(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Cn.fromString(e.substring(4,e.length-2))}}class me extends Nt{construct(e,n,r){return new me(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new H(O.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new me(n)}static emptyPath(){return new me([])}}const Rx=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class qe extends Nt{construct(e,n,r){return new qe(e,n,r)}static isValidIdentifier(e){return Rx.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),qe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===df}static keyField(){return new qe([df])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new H(O.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new H(O.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new H(O.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(r+=l,s++):(i(),s++)}if(i(),o)throw new H(O.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new qe(n)}static emptyPath(){return new qe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(e){this.path=e}static fromPath(e){return new K(me.fromString(e))}static fromName(e){return new K(me.fromString(e).popFirst(5))}static empty(){return new K(me.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&me.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return me.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new K(new me(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ei=-1;function Px(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=J.fromTimestamp(r===1e9?new Te(n+1,0):new Te(n,r));return new Vn(s,K.empty(),e)}function Cx(t){return new Vn(t.readTime,t.key,ei)}class Vn{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Vn(J.min(),K.empty(),ei)}static max(){return new Vn(J.max(),K.empty(),ei)}}function kx(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=K.comparator(t.documentKey,e.documentKey),n!==0?n:ee(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nx="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Dx{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function is(t){if(t.code!==O.FAILED_PRECONDITION||t.message!==Nx)throw t;z("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&X(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new M((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof M?n:M.resolve(n)}catch(n){return M.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):M.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):M.reject(n)}static resolve(e){return new M((n,r)=>{n(e)})}static reject(e){return new M((n,r)=>{r(e)})}static waitFor(e){return new M((n,r)=>{let s=0,i=0,o=!1;e.forEach(l=>{++s,l.next(()=>{++i,o&&i===s&&n()},c=>r(c))}),o=!0,i===s&&n()})}static or(e){let n=M.resolve(!1);for(const r of e)n=n.next(s=>s?M.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new M((r,s)=>{const i=e.length,o=new Array(i);let l=0;for(let c=0;c<i;c++){const u=c;n(e[u]).next(h=>{o[u]=h,++l,l===i&&r(o)},h=>s(h))}})}static doWhile(e,n){return new M((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function Vx(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function os(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.oe(r),this._e=r=>n.writeSequenceNumber(r))}oe(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this._e&&this._e(e),e}}ha.ae=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wc=-1;function da(t){return t==null}function Lo(t){return t===0&&1/t==-1/0}function Ox(t){return typeof t=="number"&&Number.isInteger(t)&&!Lo(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ey="";function Mx(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=ff(e)),e=Lx(t.get(n),e);return ff(e)}function Lx(t,e){let n=e;const r=t.length;for(let s=0;s<r;s++){const i=t.charAt(s);switch(i){case"\0":n+="";break;case ey:n+="";break;default:n+=i}}return n}function ff(t){return t+ey+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pf(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Wn(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function ty(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e,n){this.comparator=e,this.root=n||$e.EMPTY}insert(e,n){return new _e(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,$e.BLACK,null,null))}remove(e){return new _e(this.comparator,this.root.remove(e,this.comparator).copy(null,null,$e.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new no(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new no(this.root,e,this.comparator,!1)}getReverseIterator(){return new no(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new no(this.root,e,this.comparator,!0)}}class no{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class $e{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??$e.RED,this.left=s??$e.EMPTY,this.right=i??$e.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new $e(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return $e.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return $e.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,$e.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,$e.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw X();const e=this.left.check();if(e!==this.right.check())throw X();return e+(this.isRed()?0:1)}}$e.EMPTY=null,$e.RED=!0,$e.BLACK=!1;$e.EMPTY=new class{constructor(){this.size=0}get key(){throw X()}get value(){throw X()}get color(){throw X()}get left(){throw X()}get right(){throw X()}copy(e,n,r,s,i){return this}insert(e,n,r){return new $e(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e){this.comparator=e,this.data=new _e(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new mf(this.data.getIterator())}getIteratorFrom(e){return new mf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof De)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new De(this.comparator);return n.data=e,n}}class mf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this.fields=e,e.sort(qe.comparator)}static empty(){return new gt([])}unionWith(e){let n=new De(qe.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new gt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Gr(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ny extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new ny("Invalid base64 string: "+i):i}}(e);return new We(n)}static fromUint8Array(e){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new We(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ee(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}We.EMPTY_BYTE_STRING=new We("");const jx=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function On(t){if(ce(!!t),typeof t=="string"){let e=0;const n=jx.exec(t);if(ce(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Se(t.seconds),nanos:Se(t.nanos)}}function Se(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Mn(t){return typeof t=="string"?We.fromBase64String(t):We.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ry="server_timestamp",sy="__type__",iy="__previous_value__",oy="__local_write_time__";function zc(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{})[sy])===null||n===void 0?void 0:n.stringValue)===ry}function fa(t){const e=t.mapValue.fields[iy];return zc(e)?fa(e):e}function ti(t){const e=On(t.mapValue.fields[oy].timestampValue);return new Te(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ux{constructor(e,n,r,s,i,o,l,c,u){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=u}}const jo="(default)";class ni{constructor(e,n){this.projectId=e,this.database=n||jo}static empty(){return new ni("","")}get isDefaultDatabase(){return this.database===jo}isEqual(e){return e instanceof ni&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ay="__type__",Fx="__max__",ro={mapValue:{}},ly="__vector__",Uo="value";function Ln(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?zc(t)?4:$x(t)?9007199254740991:Bx(t)?10:11:X()}function Wt(t,e){if(t===e)return!0;const n=Ln(t);if(n!==Ln(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return ti(t).isEqual(ti(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=On(s.timestampValue),l=On(i.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return Mn(s.bytesValue).isEqual(Mn(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return Se(s.geoPointValue.latitude)===Se(i.geoPointValue.latitude)&&Se(s.geoPointValue.longitude)===Se(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Se(s.integerValue)===Se(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Se(s.doubleValue),l=Se(i.doubleValue);return o===l?Lo(o)===Lo(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return Gr(t.arrayValue.values||[],e.arrayValue.values||[],Wt);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},l=i.mapValue.fields||{};if(pf(o)!==pf(l))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(l[c]===void 0||!Wt(o[c],l[c])))return!1;return!0}(t,e);default:return X()}}function ri(t,e){return(t.values||[]).find(n=>Wt(n,e))!==void 0}function Qr(t,e){if(t===e)return 0;const n=Ln(t),r=Ln(e);if(n!==r)return ee(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ee(t.booleanValue,e.booleanValue);case 2:return function(i,o){const l=Se(i.integerValue||i.doubleValue),c=Se(o.integerValue||o.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(t,e);case 3:return gf(t.timestampValue,e.timestampValue);case 4:return gf(ti(t),ti(e));case 5:return Wl(t.stringValue,e.stringValue);case 6:return function(i,o){const l=Mn(i),c=Mn(o);return l.compareTo(c)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const l=i.split("/"),c=o.split("/");for(let u=0;u<l.length&&u<c.length;u++){const h=ee(l[u],c[u]);if(h!==0)return h}return ee(l.length,c.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const l=ee(Se(i.latitude),Se(o.latitude));return l!==0?l:ee(Se(i.longitude),Se(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return yf(t.arrayValue,e.arrayValue);case 10:return function(i,o){var l,c,u,h;const f=i.fields||{},g=o.fields||{},_=(l=f[Uo])===null||l===void 0?void 0:l.arrayValue,T=(c=g[Uo])===null||c===void 0?void 0:c.arrayValue,R=ee(((u=_==null?void 0:_.values)===null||u===void 0?void 0:u.length)||0,((h=T==null?void 0:T.values)===null||h===void 0?void 0:h.length)||0);return R!==0?R:yf(_,T)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===ro.mapValue&&o===ro.mapValue)return 0;if(i===ro.mapValue)return 1;if(o===ro.mapValue)return-1;const l=i.fields||{},c=Object.keys(l),u=o.fields||{},h=Object.keys(u);c.sort(),h.sort();for(let f=0;f<c.length&&f<h.length;++f){const g=Wl(c[f],h[f]);if(g!==0)return g;const _=Qr(l[c[f]],u[h[f]]);if(_!==0)return _}return ee(c.length,h.length)}(t.mapValue,e.mapValue);default:throw X()}}function gf(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ee(t,e);const n=On(t),r=On(e),s=ee(n.seconds,r.seconds);return s!==0?s:ee(n.nanos,r.nanos)}function yf(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=Qr(n[s],r[s]);if(i)return i}return ee(n.length,r.length)}function Xr(t){return zl(t)}function zl(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=On(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return Mn(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return K.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=zl(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${zl(n.fields[o])}`;return s+"}"}(t.mapValue):X()}function vo(t){switch(Ln(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=fa(t);return e?16+vo(e):16;case 5:return 2*t.stringValue.length;case 6:return Mn(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+vo(i),0)}(t.arrayValue);case 10:case 11:return function(r){let s=0;return Wn(r.fields,(i,o)=>{s+=i.length+vo(o)}),s}(t.mapValue);default:throw X()}}function _f(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Hl(t){return!!t&&"integerValue"in t}function Hc(t){return!!t&&"arrayValue"in t}function vf(t){return!!t&&"nullValue"in t}function wf(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function wo(t){return!!t&&"mapValue"in t}function Bx(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{})[ay])===null||n===void 0?void 0:n.stringValue)===ly}function Us(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Wn(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=Us(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Us(t.arrayValue.values[n]);return e}return Object.assign({},t)}function $x(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===Fx}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e){this.value=e}static empty(){return new ht({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!wo(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Us(n)}setAll(e){let n=qe.emptyPath(),r={},s=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const c=this.getFieldsMap(n);this.applyChanges(c,r,s),r={},s=[],n=l.popLast()}o?r[l.lastSegment()]=Us(o):s.push(l.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());wo(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Wt(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];wo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){Wn(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new ht(Us(this.value))}}function cy(t){const e=[];return Wn(t.fields,(n,r)=>{const s=new qe([n]);if(wo(r)){const i=cy(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new gt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e,n,r,s,i,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=l}static newInvalidDocument(e){return new et(e,0,J.min(),J.min(),J.min(),ht.empty(),0)}static newFoundDocument(e,n,r,s){return new et(e,1,n,J.min(),r,s,0)}static newNoDocument(e,n){return new et(e,2,n,J.min(),J.min(),ht.empty(),0)}static newUnknownDocument(e,n){return new et(e,3,n,J.min(),J.min(),ht.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(J.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ht.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ht.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=J.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof et&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new et(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fo{constructor(e,n){this.position=e,this.inclusive=n}}function Tf(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=K.comparator(K.fromName(o.referenceValue),n.key):r=Qr(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Ef(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Wt(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(e,n="asc"){this.field=e,this.dir=n}}function qx(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uy{}class Ce extends uy{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new zx(e,n,r):n==="array-contains"?new Gx(e,r):n==="in"?new Qx(e,r):n==="not-in"?new Xx(e,r):n==="array-contains-any"?new Yx(e,r):new Ce(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new Hx(e,r):new Kx(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(Qr(n,this.value)):n!==null&&Ln(this.value)===Ln(n)&&this.matchesComparison(Qr(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return X()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ct extends uy{constructor(e,n){super(),this.filters=e,this.op=n,this.ce=null}static create(e,n){return new Ct(e,n)}matches(e){return hy(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function hy(t){return t.op==="and"}function dy(t){return Wx(t)&&hy(t)}function Wx(t){for(const e of t.filters)if(e instanceof Ct)return!1;return!0}function Kl(t){if(t instanceof Ce)return t.field.canonicalString()+t.op.toString()+Xr(t.value);if(dy(t))return t.filters.map(e=>Kl(e)).join(",");{const e=t.filters.map(n=>Kl(n)).join(",");return`${t.op}(${e})`}}function fy(t,e){return t instanceof Ce?function(r,s){return s instanceof Ce&&r.op===s.op&&r.field.isEqual(s.field)&&Wt(r.value,s.value)}(t,e):t instanceof Ct?function(r,s){return s instanceof Ct&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,l)=>i&&fy(o,s.filters[l]),!0):!1}(t,e):void X()}function py(t){return t instanceof Ce?function(n){return`${n.field.canonicalString()} ${n.op} ${Xr(n.value)}`}(t):t instanceof Ct?function(n){return n.op.toString()+" {"+n.getFilters().map(py).join(" ,")+"}"}(t):"Filter"}class zx extends Ce{constructor(e,n,r){super(e,n,r),this.key=K.fromName(r.referenceValue)}matches(e){const n=K.comparator(e.key,this.key);return this.matchesComparison(n)}}class Hx extends Ce{constructor(e,n){super(e,"in",n),this.keys=my("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class Kx extends Ce{constructor(e,n){super(e,"not-in",n),this.keys=my("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function my(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>K.fromName(r.referenceValue))}class Gx extends Ce{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Hc(n)&&ri(n.arrayValue,this.value)}}class Qx extends Ce{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&ri(this.value.arrayValue,n)}}class Xx extends Ce{constructor(e,n){super(e,"not-in",n)}matches(e){if(ri(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!ri(this.value.arrayValue,n)}}class Yx extends Ce{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Hc(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>ri(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jx{constructor(e,n=null,r=[],s=[],i=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=l,this.le=null}}function bf(t,e=null,n=[],r=[],s=null,i=null,o=null){return new Jx(t,e,n,r,s,i,o)}function Kc(t){const e=Z(t);if(e.le===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Kl(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),da(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>Xr(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>Xr(r)).join(",")),e.le=n}return e.le}function Gc(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!qx(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!fy(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Ef(t.startAt,e.startAt)&&Ef(t.endAt,e.endAt)}function Gl(t){return K.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as{constructor(e,n=null,r=[],s=[],i=null,o="F",l=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=l,this.endAt=c,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function Zx(t,e,n,r,s,i,o,l){return new as(t,e,n,r,s,i,o,l)}function pa(t){return new as(t)}function If(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function gy(t){return t.collectionGroup!==null}function Fs(t){const e=Z(t);if(e.he===null){e.he=[];const n=new Set;for(const i of e.explicitOrderBy)e.he.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new De(qe.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(u=>{u.isInequality()&&(l=l.add(u.field))})}),l})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.he.push(new si(i,r))}),n.has(qe.keyField().canonicalString())||e.he.push(new si(qe.keyField(),r))}return e.he}function jt(t){const e=Z(t);return e.Pe||(e.Pe=eA(e,Fs(t))),e.Pe}function eA(t,e){if(t.limitType==="F")return bf(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new si(s.field,i)});const n=t.endAt?new Fo(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Fo(t.startAt.position,t.startAt.inclusive):null;return bf(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Ql(t,e){const n=t.filters.concat([e]);return new as(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Xl(t,e,n){return new as(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function ma(t,e){return Gc(jt(t),jt(e))&&t.limitType===e.limitType}function yy(t){return`${Kc(jt(t))}|lt:${t.limitType}`}function Dr(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>py(s)).join(", ")}]`),da(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>Xr(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>Xr(s)).join(",")),`Target(${r})`}(jt(t))}; limitType=${t.limitType})`}function ga(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):K.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of Fs(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(o,l,c){const u=Tf(o,l,c);return o.inclusive?u<=0:u<0}(r.startAt,Fs(r),s)||r.endAt&&!function(o,l,c){const u=Tf(o,l,c);return o.inclusive?u>=0:u>0}(r.endAt,Fs(r),s))}(t,e)}function tA(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function _y(t){return(e,n)=>{let r=!1;for(const s of Fs(t)){const i=nA(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function nA(t,e,n){const r=t.field.isKeyField()?K.comparator(e.key,n.key):function(i,o,l){const c=o.data.field(i),u=l.data.field(i);return c!==null&&u!==null?Qr(c,u):X()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return X()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Wn(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return ty(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rA=new _e(K.comparator);function sn(){return rA}const vy=new _e(K.comparator);function Ds(...t){let e=vy;for(const n of t)e=e.insert(n.key,n);return e}function wy(t){let e=vy;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function rr(){return Bs()}function Ty(){return Bs()}function Bs(){return new vr(t=>t.toString(),(t,e)=>t.isEqual(e))}const sA=new _e(K.comparator),iA=new De(K.comparator);function se(...t){let e=iA;for(const n of t)e=e.add(n);return e}const oA=new De(ee);function aA(){return oA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qc(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Lo(e)?"-0":e}}function Ey(t){return{integerValue:""+t}}function lA(t,e){return Ox(e)?Ey(e):Qc(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ya{constructor(){this._=void 0}}function cA(t,e,n){return t instanceof ii?function(s,i){const o={fields:{[sy]:{stringValue:ry},[oy]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&zc(i)&&(i=fa(i)),i&&(o.fields[iy]=i),{mapValue:o}}(n,e):t instanceof oi?Iy(t,e):t instanceof ai?xy(t,e):function(s,i){const o=by(s,i),l=xf(o)+xf(s.Ie);return Hl(o)&&Hl(s.Ie)?Ey(l):Qc(s.serializer,l)}(t,e)}function uA(t,e,n){return t instanceof oi?Iy(t,e):t instanceof ai?xy(t,e):n}function by(t,e){return t instanceof Bo?function(r){return Hl(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class ii extends ya{}class oi extends ya{constructor(e){super(),this.elements=e}}function Iy(t,e){const n=Ay(e);for(const r of t.elements)n.some(s=>Wt(s,r))||n.push(r);return{arrayValue:{values:n}}}class ai extends ya{constructor(e){super(),this.elements=e}}function xy(t,e){let n=Ay(e);for(const r of t.elements)n=n.filter(s=>!Wt(s,r));return{arrayValue:{values:n}}}class Bo extends ya{constructor(e,n){super(),this.serializer=e,this.Ie=n}}function xf(t){return Se(t.integerValue||t.doubleValue)}function Ay(t){return Hc(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hA{constructor(e,n){this.field=e,this.transform=n}}function dA(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof oi&&s instanceof oi||r instanceof ai&&s instanceof ai?Gr(r.elements,s.elements,Wt):r instanceof Bo&&s instanceof Bo?Wt(r.Ie,s.Ie):r instanceof ii&&s instanceof ii}(t.transform,e.transform)}class fA{constructor(e,n){this.version=e,this.transformResults=n}}class Et{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Et}static exists(e){return new Et(void 0,e)}static updateTime(e){return new Et(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function To(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class _a{}function Sy(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Xc(t.key,Et.none()):new xi(t.key,t.data,Et.none());{const n=t.data,r=ht.empty();let s=new De(qe.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new zn(t.key,r,new gt(s.toArray()),Et.none())}}function pA(t,e,n){t instanceof xi?function(s,i,o){const l=s.value.clone(),c=Sf(s.fieldTransforms,i,o.transformResults);l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof zn?function(s,i,o){if(!To(s.precondition,i))return void i.convertToUnknownDocument(o.version);const l=Sf(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(Ry(s)),c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(t,e,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function $s(t,e,n,r){return t instanceof xi?function(i,o,l,c){if(!To(i.precondition,o))return l;const u=i.value.clone(),h=Rf(i.fieldTransforms,c,o);return u.setAll(h),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null}(t,e,n,r):t instanceof zn?function(i,o,l,c){if(!To(i.precondition,o))return l;const u=Rf(i.fieldTransforms,c,o),h=o.data;return h.setAll(Ry(i)),h.setAll(u),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(f=>f.field))}(t,e,n,r):function(i,o,l){return To(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function mA(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=by(r.transform,s||null);i!=null&&(n===null&&(n=ht.empty()),n.set(r.field,i))}return n||null}function Af(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Gr(r,s,(i,o)=>dA(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class xi extends _a{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class zn extends _a{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Ry(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Sf(t,e,n){const r=new Map;ce(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,l=e.data.field(i.field);r.set(i.field,uA(o,l,n[s]))}return r}function Rf(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,cA(i,o,e))}return r}class Xc extends _a{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class gA extends _a{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yA{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&pA(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=$s(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=$s(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=Ty();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let l=this.applyToLocalView(o,i.mutatedFields);l=n.has(s.key)?null:l;const c=Sy(o,l);c!==null&&r.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(J.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),se())}isEqual(e){return this.batchId===e.batchId&&Gr(this.mutations,e.mutations,(n,r)=>Af(n,r))&&Gr(this.baseMutations,e.baseMutations,(n,r)=>Af(n,r))}}class Yc{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){ce(e.mutations.length===r.length);let s=function(){return sA}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Yc(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _A{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vA{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Pe,ie;function wA(t){switch(t){case O.OK:return X();case O.CANCELLED:case O.UNKNOWN:case O.DEADLINE_EXCEEDED:case O.RESOURCE_EXHAUSTED:case O.INTERNAL:case O.UNAVAILABLE:case O.UNAUTHENTICATED:return!1;case O.INVALID_ARGUMENT:case O.NOT_FOUND:case O.ALREADY_EXISTS:case O.PERMISSION_DENIED:case O.FAILED_PRECONDITION:case O.ABORTED:case O.OUT_OF_RANGE:case O.UNIMPLEMENTED:case O.DATA_LOSS:return!0;default:return X()}}function Py(t){if(t===void 0)return rn("GRPC error has no .code"),O.UNKNOWN;switch(t){case Pe.OK:return O.OK;case Pe.CANCELLED:return O.CANCELLED;case Pe.UNKNOWN:return O.UNKNOWN;case Pe.DEADLINE_EXCEEDED:return O.DEADLINE_EXCEEDED;case Pe.RESOURCE_EXHAUSTED:return O.RESOURCE_EXHAUSTED;case Pe.INTERNAL:return O.INTERNAL;case Pe.UNAVAILABLE:return O.UNAVAILABLE;case Pe.UNAUTHENTICATED:return O.UNAUTHENTICATED;case Pe.INVALID_ARGUMENT:return O.INVALID_ARGUMENT;case Pe.NOT_FOUND:return O.NOT_FOUND;case Pe.ALREADY_EXISTS:return O.ALREADY_EXISTS;case Pe.PERMISSION_DENIED:return O.PERMISSION_DENIED;case Pe.FAILED_PRECONDITION:return O.FAILED_PRECONDITION;case Pe.ABORTED:return O.ABORTED;case Pe.OUT_OF_RANGE:return O.OUT_OF_RANGE;case Pe.UNIMPLEMENTED:return O.UNIMPLEMENTED;case Pe.DATA_LOSS:return O.DATA_LOSS;default:return X()}}(ie=Pe||(Pe={}))[ie.OK=0]="OK",ie[ie.CANCELLED=1]="CANCELLED",ie[ie.UNKNOWN=2]="UNKNOWN",ie[ie.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ie[ie.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ie[ie.NOT_FOUND=5]="NOT_FOUND",ie[ie.ALREADY_EXISTS=6]="ALREADY_EXISTS",ie[ie.PERMISSION_DENIED=7]="PERMISSION_DENIED",ie[ie.UNAUTHENTICATED=16]="UNAUTHENTICATED",ie[ie.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ie[ie.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ie[ie.ABORTED=10]="ABORTED",ie[ie.OUT_OF_RANGE=11]="OUT_OF_RANGE",ie[ie.UNIMPLEMENTED=12]="UNIMPLEMENTED",ie[ie.INTERNAL=13]="INTERNAL",ie[ie.UNAVAILABLE=14]="UNAVAILABLE",ie[ie.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TA=new Cn([4294967295,4294967295],0);function Pf(t){const e=Jg().encode(t),n=new zg;return n.update(e),new Uint8Array(n.digest())}function Cf(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Cn([n,r],0),new Cn([s,i],0)]}class Jc{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Vs(`Invalid padding: ${n}`);if(r<0)throw new Vs(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Vs(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Vs(`Invalid padding when bitmap length is 0: ${n}`);this.Ee=8*e.length-n,this.de=Cn.fromNumber(this.Ee)}Ae(e,n,r){let s=e.add(n.multiply(Cn.fromNumber(r)));return s.compare(TA)===1&&(s=new Cn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.de).toNumber()}Re(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Ee===0)return!1;const n=Pf(e),[r,s]=Cf(n);for(let i=0;i<this.hashCount;i++){const o=this.Ae(r,s,i);if(!this.Re(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Jc(i,s,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.Ee===0)return;const n=Pf(e),[r,s]=Cf(n);for(let i=0;i<this.hashCount;i++){const o=this.Ae(r,s,i);this.Ve(o)}}Ve(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Vs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,Ai.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new va(J.min(),s,new _e(ee),sn(),se())}}class Ai{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Ai(r,n,se(),se(),se())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e,n,r,s){this.me=e,this.removedTargetIds=n,this.key=r,this.fe=s}}class Cy{constructor(e,n){this.targetId=e,this.ge=n}}class ky{constructor(e,n,r=We.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class kf{constructor(){this.pe=0,this.ye=Nf(),this.we=We.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(e){e.approximateByteSize()>0&&(this.be=!0,this.we=e)}Fe(){let e=se(),n=se(),r=se();return this.ye.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:X()}}),new Ai(this.we,this.Se,e,n,r)}Me(){this.be=!1,this.ye=Nf()}xe(e,n){this.be=!0,this.ye=this.ye.insert(e,n)}Oe(e){this.be=!0,this.ye=this.ye.remove(e)}Ne(){this.pe+=1}Be(){this.pe-=1,ce(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class EA{constructor(e){this.ke=e,this.qe=new Map,this.Qe=sn(),this.$e=so(),this.Ue=so(),this.Ke=new _e(ee)}We(e){for(const n of e.me)e.fe&&e.fe.isFoundDocument()?this.Ge(n,e.fe):this.ze(n,e.key,e.fe);for(const n of e.removedTargetIds)this.ze(n,e.key,e.fe)}je(e){this.forEachTarget(e,n=>{const r=this.He(n);switch(e.state){case 0:this.Je(n)&&r.Ce(e.resumeToken);break;case 1:r.Be(),r.De||r.Me(),r.Ce(e.resumeToken);break;case 2:r.Be(),r.De||this.removeTarget(n);break;case 3:this.Je(n)&&(r.Le(),r.Ce(e.resumeToken));break;case 4:this.Je(n)&&(this.Ye(n),r.Ce(e.resumeToken));break;default:X()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.qe.forEach((r,s)=>{this.Je(s)&&n(s)})}Ze(e){const n=e.targetId,r=e.ge.count,s=this.Xe(n);if(s){const i=s.target;if(Gl(i))if(r===0){const o=new K(i.path);this.ze(n,o,et.newNoDocument(o,J.min()))}else ce(r===1);else{const o=this.et(n);if(o!==r){const l=this.tt(e),c=l?this.nt(l,e,o):1;if(c!==0){this.Ye(n);const u=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(n,u)}}}}}tt(e){const n=e.ge.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,l;try{o=Mn(r).toUint8Array()}catch(c){if(c instanceof ny)return Kr("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new Jc(o,s,i)}catch(c){return Kr(c instanceof Vs?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.Ee===0?null:l}nt(e,n,r){return n.ge.count===r-this.st(e,n.targetId)?0:2}st(e,n){const r=this.ke.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.ke.it(),l=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.ze(n,i,null),s++)}),s}ot(e){const n=new Map;this.qe.forEach((i,o)=>{const l=this.Xe(o);if(l){if(i.current&&Gl(l.target)){const c=new K(l.target.path);this._t(c).has(o)||this.ut(o,c)||this.ze(o,c,et.newNoDocument(c,e))}i.ve&&(n.set(o,i.Fe()),i.Me())}});let r=se();this.Ue.forEach((i,o)=>{let l=!0;o.forEachWhile(c=>{const u=this.Xe(c);return!u||u.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.Qe.forEach((i,o)=>o.setReadTime(e));const s=new va(e,n,this.Ke,this.Qe,r);return this.Qe=sn(),this.$e=so(),this.Ue=so(),this.Ke=new _e(ee),s}Ge(e,n){if(!this.Je(e))return;const r=this.ut(e,n.key)?2:0;this.He(e).xe(n.key,r),this.Qe=this.Qe.insert(n.key,n),this.$e=this.$e.insert(n.key,this._t(n.key).add(e)),this.Ue=this.Ue.insert(n.key,this.ct(n.key).add(e))}ze(e,n,r){if(!this.Je(e))return;const s=this.He(e);this.ut(e,n)?s.xe(n,1):s.Oe(n),this.Ue=this.Ue.insert(n,this.ct(n).delete(e)),this.Ue=this.Ue.insert(n,this.ct(n).add(e)),r&&(this.Qe=this.Qe.insert(n,r))}removeTarget(e){this.qe.delete(e)}et(e){const n=this.He(e).Fe();return this.ke.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}Ne(e){this.He(e).Ne()}He(e){let n=this.qe.get(e);return n||(n=new kf,this.qe.set(e,n)),n}ct(e){let n=this.Ue.get(e);return n||(n=new De(ee),this.Ue=this.Ue.insert(e,n)),n}_t(e){let n=this.$e.get(e);return n||(n=new De(ee),this.$e=this.$e.insert(e,n)),n}Je(e){const n=this.Xe(e)!==null;return n||z("WatchChangeAggregator","Detected inactive target",e),n}Xe(e){const n=this.qe.get(e);return n&&n.De?null:this.ke.lt(e)}Ye(e){this.qe.set(e,new kf),this.ke.getRemoteKeysForTarget(e).forEach(n=>{this.ze(e,n,null)})}ut(e,n){return this.ke.getRemoteKeysForTarget(e).has(n)}}function so(){return new _e(K.comparator)}function Nf(){return new _e(K.comparator)}const bA={asc:"ASCENDING",desc:"DESCENDING"},IA={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},xA={and:"AND",or:"OR"};class AA{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Yl(t,e){return t.useProto3Json||da(e)?e:{value:e}}function $o(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ny(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function SA(t,e){return $o(t,e.toTimestamp())}function Ut(t){return ce(!!t),J.fromTimestamp(function(n){const r=On(n);return new Te(r.seconds,r.nanos)}(t))}function Zc(t,e){return Jl(t,e).canonicalString()}function Jl(t,e){const n=function(s){return new me(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function Dy(t){const e=me.fromString(t);return ce(jy(e)),e}function Zl(t,e){return Zc(t.databaseId,e.path)}function ul(t,e){const n=Dy(e);if(n.get(1)!==t.databaseId.projectId)throw new H(O.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new H(O.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new K(Oy(n))}function Vy(t,e){return Zc(t.databaseId,e)}function RA(t){const e=Dy(t);return e.length===4?me.emptyPath():Oy(e)}function ec(t){return new me(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Oy(t){return ce(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Df(t,e,n){return{name:Zl(t,e),fields:n.value.mapValue.fields}}function PA(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:X()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(u,h){return u.useProto3Json?(ce(h===void 0||typeof h=="string"),We.fromBase64String(h||"")):(ce(h===void 0||h instanceof Buffer||h instanceof Uint8Array),We.fromUint8Array(h||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(u){const h=u.code===void 0?O.UNKNOWN:Py(u.code);return new H(h,u.message||"")}(o);n=new ky(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=ul(t,r.document.name),i=Ut(r.document.updateTime),o=r.document.createTime?Ut(r.document.createTime):J.min(),l=new ht({mapValue:{fields:r.document.fields}}),c=et.newFoundDocument(s,i,o,l),u=r.targetIds||[],h=r.removedTargetIds||[];n=new Eo(u,h,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=ul(t,r.document),i=r.readTime?Ut(r.readTime):J.min(),o=et.newNoDocument(s,i),l=r.removedTargetIds||[];n=new Eo([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=ul(t,r.document),i=r.removedTargetIds||[];n=new Eo([],i,s,null)}else{if(!("filter"in e))return X();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new vA(s,i),l=r.targetId;n=new Cy(l,o)}}return n}function CA(t,e){let n;if(e instanceof xi)n={update:Df(t,e.key,e.value)};else if(e instanceof Xc)n={delete:Zl(t,e.key)};else if(e instanceof zn)n={update:Df(t,e.key,e.data),updateMask:UA(e.fieldMask)};else{if(!(e instanceof gA))return X();n={verify:Zl(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const l=o.transform;if(l instanceof ii)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof oi)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof ai)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Bo)return{fieldPath:o.field.canonicalString(),increment:l.Ie};throw X()}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:SA(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:X()}(t,e.precondition)),n}function kA(t,e){return t&&t.length>0?(ce(e!==void 0),t.map(n=>function(s,i){let o=s.updateTime?Ut(s.updateTime):Ut(i);return o.isEqual(J.min())&&(o=Ut(i)),new fA(o,s.transformResults||[])}(n,e))):[]}function NA(t,e){return{documents:[Vy(t,e.path)]}}function DA(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Vy(t,s);const i=function(u){if(u.length!==0)return Ly(Ct.create(u,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(u){if(u.length!==0)return u.map(h=>function(g){return{field:Vr(g.field),direction:MA(g.dir)}}(h))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=Yl(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{ht:n,parent:s}}function VA(t){let e=RA(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){ce(r===1);const h=n.from[0];h.allDescendants?s=h.collectionId:e=e.child(h.collectionId)}let i=[];n.where&&(i=function(f){const g=My(f);return g instanceof Ct&&dy(g)?g.getFilters():[g]}(n.where));let o=[];n.orderBy&&(o=function(f){return f.map(g=>function(T){return new si(Or(T.field),function(I){switch(I){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(T.direction))}(g))}(n.orderBy));let l=null;n.limit&&(l=function(f){let g;return g=typeof f=="object"?f.value:f,da(g)?null:g}(n.limit));let c=null;n.startAt&&(c=function(f){const g=!!f.before,_=f.values||[];return new Fo(_,g)}(n.startAt));let u=null;return n.endAt&&(u=function(f){const g=!f.before,_=f.values||[];return new Fo(_,g)}(n.endAt)),Zx(e,s,o,i,l,"F",c,u)}function OA(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return X()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function My(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Or(n.unaryFilter.field);return Ce.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Or(n.unaryFilter.field);return Ce.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Or(n.unaryFilter.field);return Ce.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Or(n.unaryFilter.field);return Ce.create(o,"!=",{nullValue:"NULL_VALUE"});default:return X()}}(t):t.fieldFilter!==void 0?function(n){return Ce.create(Or(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return X()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return Ct.create(n.compositeFilter.filters.map(r=>My(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return X()}}(n.compositeFilter.op))}(t):X()}function MA(t){return bA[t]}function LA(t){return IA[t]}function jA(t){return xA[t]}function Vr(t){return{fieldPath:t.canonicalString()}}function Or(t){return qe.fromServerFormat(t.fieldPath)}function Ly(t){return t instanceof Ce?function(n){if(n.op==="=="){if(wf(n.value))return{unaryFilter:{field:Vr(n.field),op:"IS_NAN"}};if(vf(n.value))return{unaryFilter:{field:Vr(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(wf(n.value))return{unaryFilter:{field:Vr(n.field),op:"IS_NOT_NAN"}};if(vf(n.value))return{unaryFilter:{field:Vr(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Vr(n.field),op:LA(n.op),value:n.value}}}(t):t instanceof Ct?function(n){const r=n.getFilters().map(s=>Ly(s));return r.length===1?r[0]:{compositeFilter:{op:jA(n.op),filters:r}}}(t):X()}function UA(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function jy(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(e,n,r,s,i=J.min(),o=J.min(),l=We.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new xn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new xn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new xn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new xn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FA{constructor(e){this.Tt=e}}function BA(t){const e=VA({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Xl(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $A{constructor(){this.Tn=new qA}addToCollectionParentIndex(e,n){return this.Tn.add(n),M.resolve()}getCollectionParents(e,n){return M.resolve(this.Tn.getEntries(n))}addFieldIndex(e,n){return M.resolve()}deleteFieldIndex(e,n){return M.resolve()}deleteAllFieldIndexes(e){return M.resolve()}createTargetIndexes(e,n){return M.resolve()}getDocumentsMatchingTarget(e,n){return M.resolve(null)}getIndexType(e,n){return M.resolve(0)}getFieldIndexes(e,n){return M.resolve([])}getNextCollectionGroupToUpdate(e){return M.resolve(null)}getMinOffset(e,n){return M.resolve(Vn.min())}getMinOffsetFromCollectionGroup(e,n){return M.resolve(Vn.min())}updateCollectionGroup(e,n,r){return M.resolve()}updateIndexEntries(e,n){return M.resolve()}}class qA{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new De(me.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new De(me.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Uy=41943040;class ut{static withCacheSize(e){return new ut(e,ut.DEFAULT_COLLECTION_PERCENTILE,ut.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ut.DEFAULT_COLLECTION_PERCENTILE=10,ut.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ut.DEFAULT=new ut(Uy,ut.DEFAULT_COLLECTION_PERCENTILE,ut.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ut.DISABLED=new ut(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr{constructor(e){this.$n=e}next(){return this.$n+=2,this.$n}static Un(){return new Yr(0)}static Kn(){return new Yr(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Of="LruGarbageCollector",WA=1048576;function Mf([t,e],[n,r]){const s=ee(t,n);return s===0?ee(e,r):s}class zA{constructor(e){this.Hn=e,this.buffer=new De(Mf),this.Jn=0}Yn(){return++this.Jn}Zn(e){const n=[e,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();Mf(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class HA{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(e){z(Of,`Garbage collection scheduled in ${e}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){os(n)?z(Of,"Ignoring IndexedDB error during garbage collection: ",n):await is(n)}await this.er(3e5)})}}class KA{constructor(e,n){this.tr=e,this.params=n}calculateTargetCount(e,n){return this.tr.nr(e).next(r=>Math.floor(n/100*r))}nthSequenceNumber(e,n){if(n===0)return M.resolve(ha.ae);const r=new zA(n);return this.tr.forEachTarget(e,s=>r.Zn(s.sequenceNumber)).next(()=>this.tr.rr(e,s=>r.Zn(s))).next(()=>r.maxValue)}removeTargets(e,n,r){return this.tr.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.tr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(z("LruGarbageCollector","Garbage collection skipped; disabled"),M.resolve(Vf)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(z("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Vf):this.ir(e,n))}getCacheSize(e){return this.tr.getCacheSize(e)}ir(e,n){let r,s,i,o,l,c,u;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(f=>(f>this.params.maximumSequenceNumbersToCollect?(z("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),s=this.params.maximumSequenceNumbersToCollect):s=f,o=Date.now(),this.nthSequenceNumber(e,s))).next(f=>(r=f,l=Date.now(),this.removeTargets(e,r,n))).next(f=>(i=f,c=Date.now(),this.removeOrphanedDocuments(e,r))).next(f=>(u=Date.now(),Nr()<=re.DEBUG&&z("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-h}ms
	Determined least recently used ${s} in `+(l-o)+`ms
	Removed ${i} targets in `+(c-l)+`ms
	Removed ${f} documents in `+(u-c)+`ms
Total Duration: ${u-h}ms`),M.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:f})))}}function GA(t,e){return new KA(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QA{constructor(){this.changes=new vr(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,et.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?M.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XA{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YA{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&$s(r.mutation,s,gt.empty(),Te.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,se()).next(()=>r))}getLocalViewOfDocuments(e,n,r=se()){const s=rr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=Ds();return i.forEach((l,c)=>{o=o.insert(l,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=rr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,se()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,s){let i=sn();const o=Bs(),l=function(){return Bs()}();return n.forEach((c,u)=>{const h=r.get(u.key);s.has(u.key)&&(h===void 0||h.mutation instanceof zn)?i=i.insert(u.key,u):h!==void 0?(o.set(u.key,h.mutation.getFieldMask()),$s(h.mutation,u,h.mutation.getFieldMask(),Te.now())):o.set(u.key,gt.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((u,h)=>o.set(u,h)),n.forEach((u,h)=>{var f;return l.set(u,new XA(h,(f=o.get(u))!==null&&f!==void 0?f:null))}),l))}recalculateAndSaveOverlays(e,n){const r=Bs();let s=new _e((o,l)=>o-l),i=se();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(c=>{const u=n.get(c);if(u===null)return;let h=r.get(c)||gt.empty();h=l.applyToLocalView(u,h),r.set(c,h);const f=(s.get(l.batchId)||se()).add(c);s=s.insert(l.batchId,f)})}).next(()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),u=c.key,h=c.value,f=Ty();h.forEach(g=>{if(!i.has(g)){const _=Sy(n.get(g),r.get(g));_!==null&&f.set(g,_),i=i.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,f))}return M.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(o){return K.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):gy(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):M.resolve(rr());let l=ei,c=i;return o.next(u=>M.forEach(u,(h,f)=>(l<f.largestBatchId&&(l=f.largestBatchId),i.get(h)?M.resolve():this.remoteDocumentCache.getEntry(e,h).next(g=>{c=c.insert(h,g)}))).next(()=>this.populateOverlays(e,u,i)).next(()=>this.computeViews(e,c,u,se())).next(h=>({batchId:l,changes:wy(h)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new K(n)).next(r=>{let s=Ds();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=Ds();return this.indexManager.getCollectionParents(e,i).next(l=>M.forEach(l,c=>{const u=function(f,g){return new as(g,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)}(n,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,u,r,s).next(h=>{h.forEach((f,g)=>{o=o.insert(f,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(o=>{i.forEach((c,u)=>{const h=u.getKey();o.get(h)===null&&(o=o.insert(h,et.newInvalidDocument(h)))});let l=Ds();return o.forEach((c,u)=>{const h=i.get(c);h!==void 0&&$s(h.mutation,u,gt.empty(),Te.now()),ga(n,u)&&(l=l.insert(c,u))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JA{constructor(e){this.serializer=e,this.dr=new Map,this.Ar=new Map}getBundleMetadata(e,n){return M.resolve(this.dr.get(n))}saveBundleMetadata(e,n){return this.dr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:Ut(s.createTime)}}(n)),M.resolve()}getNamedQuery(e,n){return M.resolve(this.Ar.get(n))}saveNamedQuery(e,n){return this.Ar.set(n.name,function(s){return{name:s.name,query:BA(s.bundledQuery),readTime:Ut(s.readTime)}}(n)),M.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZA{constructor(){this.overlays=new _e(K.comparator),this.Rr=new Map}getOverlay(e,n){return M.resolve(this.overlays.get(n))}getOverlays(e,n){const r=rr();return M.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.Et(e,n,i)}),M.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.Rr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Rr.delete(r)),M.resolve()}getOverlaysForCollection(e,n,r){const s=rr(),i=n.length+1,o=new K(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const c=l.getNext().value,u=c.getKey();if(!n.isPrefixOf(u.path))break;u.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return M.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new _e((u,h)=>u-h);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===n&&u.largestBatchId>r){let h=i.get(u.largestBatchId);h===null&&(h=rr(),i=i.insert(u.largestBatchId,h)),h.set(u.getKey(),u)}}const l=rr(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((u,h)=>l.set(u,h)),!(l.size()>=s)););return M.resolve(l)}Et(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Rr.get(s.largestBatchId).delete(r.key);this.Rr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new _A(n,r));let i=this.Rr.get(n);i===void 0&&(i=se(),this.Rr.set(n,i)),this.Rr.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eS{constructor(){this.sessionToken=We.EMPTY_BYTE_STRING}getSessionToken(e){return M.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,M.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(){this.Vr=new De(Me.mr),this.gr=new De(Me.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(e,n){const r=new Me(e,n);this.Vr=this.Vr.add(r),this.gr=this.gr.add(r)}yr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.wr(new Me(e,n))}Sr(e,n){e.forEach(r=>this.removeReference(r,n))}br(e){const n=new K(new me([])),r=new Me(n,e),s=new Me(n,e+1),i=[];return this.gr.forEachInRange([r,s],o=>{this.wr(o),i.push(o.key)}),i}Dr(){this.Vr.forEach(e=>this.wr(e))}wr(e){this.Vr=this.Vr.delete(e),this.gr=this.gr.delete(e)}vr(e){const n=new K(new me([])),r=new Me(n,e),s=new Me(n,e+1);let i=se();return this.gr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new Me(e,0),r=this.Vr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Me{constructor(e,n){this.key=e,this.Cr=n}static mr(e,n){return K.comparator(e.key,n.key)||ee(e.Cr,n.Cr)}static pr(e,n){return ee(e.Cr,n.Cr)||K.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Fr=1,this.Mr=new De(Me.mr)}checkEmpty(e){return M.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new yA(i,n,r,s);this.mutationQueue.push(o);for(const l of s)this.Mr=this.Mr.add(new Me(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return M.resolve(o)}lookupMutationBatch(e,n){return M.resolve(this.Or(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.Nr(r),i=s<0?0:s;return M.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return M.resolve(this.mutationQueue.length===0?Wc:this.Fr-1)}getAllMutationBatches(e){return M.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Me(n,0),s=new Me(n,Number.POSITIVE_INFINITY),i=[];return this.Mr.forEachInRange([r,s],o=>{const l=this.Or(o.Cr);i.push(l)}),M.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new De(ee);return n.forEach(s=>{const i=new Me(s,0),o=new Me(s,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([i,o],l=>{r=r.add(l.Cr)})}),M.resolve(this.Br(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;K.isDocumentKey(i)||(i=i.child(""));const o=new Me(new K(i),0);let l=new De(ee);return this.Mr.forEachWhile(c=>{const u=c.key.path;return!!r.isPrefixOf(u)&&(u.length===s&&(l=l.add(c.Cr)),!0)},o),M.resolve(this.Br(l))}Br(e){const n=[];return e.forEach(r=>{const s=this.Or(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){ce(this.Lr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Mr;return M.forEach(n.mutations,s=>{const i=new Me(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Mr=r})}qn(e){}containsKey(e,n){const r=new Me(n,0),s=this.Mr.firstAfterOrEqual(r);return M.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,M.resolve()}Lr(e,n){return this.Nr(e)}Nr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Or(e){const n=this.Nr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nS{constructor(e){this.kr=e,this.docs=function(){return new _e(K.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.kr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return M.resolve(r?r.document.mutableCopy():et.newInvalidDocument(n))}getEntries(e,n){let r=sn();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():et.newInvalidDocument(s))}),M.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=sn();const o=n.path,l=new K(o.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:u,value:{document:h}}=c.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||kx(Cx(h),r)<=0||(s.has(h.key)||ga(n,h))&&(i=i.insert(h.key,h.mutableCopy()))}return M.resolve(i)}getAllFromCollectionGroup(e,n,r,s){X()}qr(e,n){return M.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new rS(this)}getSize(e){return M.resolve(this.size)}}class rS extends QA{constructor(e){super(),this.Ir=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.Ir.addEntry(e,s)):this.Ir.removeEntry(r)}),M.waitFor(n)}getFromCache(e,n){return this.Ir.getEntry(e,n)}getAllFromCache(e,n){return this.Ir.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sS{constructor(e){this.persistence=e,this.Qr=new vr(n=>Kc(n),Gc),this.lastRemoteSnapshotVersion=J.min(),this.highestTargetId=0,this.$r=0,this.Ur=new eu,this.targetCount=0,this.Kr=Yr.Un()}forEachTarget(e,n){return this.Qr.forEach((r,s)=>n(s)),M.resolve()}getLastRemoteSnapshotVersion(e){return M.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return M.resolve(this.$r)}allocateTargetId(e){return this.highestTargetId=this.Kr.next(),M.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.$r&&(this.$r=n),M.resolve()}zn(e){this.Qr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.Kr=new Yr(n),this.highestTargetId=n),e.sequenceNumber>this.$r&&(this.$r=e.sequenceNumber)}addTargetData(e,n){return this.zn(n),this.targetCount+=1,M.resolve()}updateTargetData(e,n){return this.zn(n),M.resolve()}removeTargetData(e,n){return this.Qr.delete(n.target),this.Ur.br(n.targetId),this.targetCount-=1,M.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.Qr.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Qr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),M.waitFor(i).next(()=>s)}getTargetCount(e){return M.resolve(this.targetCount)}getTargetData(e,n){const r=this.Qr.get(n)||null;return M.resolve(r)}addMatchingKeys(e,n,r){return this.Ur.yr(n,r),M.resolve()}removeMatchingKeys(e,n,r){this.Ur.Sr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),M.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Ur.br(n),M.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Ur.vr(n);return M.resolve(r)}containsKey(e,n){return M.resolve(this.Ur.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fy{constructor(e,n){this.Wr={},this.overlays={},this.Gr=new ha(0),this.zr=!1,this.zr=!0,this.jr=new eS,this.referenceDelegate=e(this),this.Hr=new sS(this),this.indexManager=new $A,this.remoteDocumentCache=function(s){return new nS(s)}(r=>this.referenceDelegate.Jr(r)),this.serializer=new FA(n),this.Yr=new JA(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new ZA,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.Wr[e.toKey()];return r||(r=new tS(n,this.referenceDelegate),this.Wr[e.toKey()]=r),r}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(e,n,r){z("MemoryPersistence","Starting transaction:",e);const s=new iS(this.Gr.next());return this.referenceDelegate.Zr(),r(s).next(i=>this.referenceDelegate.Xr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}ei(e,n){return M.or(Object.values(this.Wr).map(r=>()=>r.containsKey(e,n)))}}class iS extends Dx{constructor(e){super(),this.currentSequenceNumber=e}}class tu{constructor(e){this.persistence=e,this.ti=new eu,this.ni=null}static ri(e){return new tu(e)}get ii(){if(this.ni)return this.ni;throw X()}addReference(e,n,r){return this.ti.addReference(r,n),this.ii.delete(r.toString()),M.resolve()}removeReference(e,n,r){return this.ti.removeReference(r,n),this.ii.add(r.toString()),M.resolve()}markPotentiallyOrphaned(e,n){return this.ii.add(n.toString()),M.resolve()}removeTarget(e,n){this.ti.br(n.targetId).forEach(s=>this.ii.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.ii.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}Zr(){this.ni=new Set}Xr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return M.forEach(this.ii,r=>{const s=K.fromPath(r);return this.si(e,s).next(i=>{i||n.removeEntry(s,J.min())})}).next(()=>(this.ni=null,n.apply(e)))}updateLimboDocument(e,n){return this.si(e,n).next(r=>{r?this.ii.delete(n.toString()):this.ii.add(n.toString())})}Jr(e){return 0}si(e,n){return M.or([()=>M.resolve(this.ti.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.ei(e,n)])}}class qo{constructor(e,n){this.persistence=e,this.oi=new vr(r=>Mx(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=GA(this,n)}static ri(e,n){return new qo(e,n)}Zr(){}Xr(e){return M.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}nr(e){const n=this.sr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>n.next(s=>r+s))}sr(e){let n=0;return this.rr(e,r=>{n++}).next(()=>n)}rr(e,n){return M.forEach(this.oi,(r,s)=>this.ar(e,r,s).next(i=>i?M.resolve():n(s)))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.qr(e,o=>this.ar(e,o,n).next(l=>{l||(r++,i.removeEntry(o,J.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,n){return this.oi.set(n,e.currentSequenceNumber),M.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.oi.set(r,e.currentSequenceNumber),M.resolve()}removeReference(e,n,r){return this.oi.set(r,e.currentSequenceNumber),M.resolve()}updateLimboDocument(e,n){return this.oi.set(n,e.currentSequenceNumber),M.resolve()}Jr(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=vo(e.data.value)),n}ar(e,n,r){return M.or([()=>this.persistence.ei(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const s=this.oi.get(n);return M.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.Hi=r,this.Ji=s}static Yi(e,n){let r=se(),s=se();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new nu(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oS{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aS{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return BT()?8:Vx(rt())>0?6:4}()}initialize(e,n){this.ns=e,this.indexManager=n,this.Zi=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.rs(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ss(e,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new oS;return this._s(e,n,o).next(l=>{if(i.result=l,this.Xi)return this.us(e,n,o,l.size)})}).next(()=>i.result)}us(e,n,r,s){return r.documentReadCount<this.es?(Nr()<=re.DEBUG&&z("QueryEngine","SDK will not create cache indexes for query:",Dr(n),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),M.resolve()):(Nr()<=re.DEBUG&&z("QueryEngine","Query:",Dr(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ts*s?(Nr()<=re.DEBUG&&z("QueryEngine","The SDK decides to create cache indexes for query:",Dr(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,jt(n))):M.resolve())}rs(e,n){if(If(n))return M.resolve(null);let r=jt(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=Xl(n,null,"F"),r=jt(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=se(...i);return this.ns.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(c=>{const u=this.cs(n,l);return this.ls(n,u,o,c.readTime)?this.rs(e,Xl(n,null,"F")):this.hs(e,u,n,c)}))})))}ss(e,n,r,s){return If(n)||s.isEqual(J.min())?M.resolve(null):this.ns.getDocuments(e,r).next(i=>{const o=this.cs(n,i);return this.ls(n,o,r,s)?M.resolve(null):(Nr()<=re.DEBUG&&z("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Dr(n)),this.hs(e,o,n,Px(s,ei)).next(l=>l))})}cs(e,n){let r=new De(_y(e));return n.forEach((s,i)=>{ga(e,i)&&(r=r.add(i))}),r}ls(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}_s(e,n,r){return Nr()<=re.DEBUG&&z("QueryEngine","Using full collection scan to execute query:",Dr(n)),this.ns.getDocumentsMatchingQuery(e,n,Vn.min(),r)}hs(e,n,r,s){return this.ns.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ru="LocalStore",lS=3e8;class cS{constructor(e,n,r,s){this.persistence=e,this.Ps=n,this.serializer=s,this.Ts=new _e(ee),this.Is=new vr(i=>Kc(i),Gc),this.Es=new Map,this.ds=e.getRemoteDocumentCache(),this.Hr=e.getTargetCache(),this.Yr=e.getBundleCache(),this.As(r)}As(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new YA(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Ts))}}function uS(t,e,n,r){return new cS(t,e,n,r)}async function By(t,e){const n=Z(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.As(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],l=[];let c=se();for(const u of s){o.push(u.batchId);for(const h of u.mutations)c=c.add(h.key)}for(const u of i){l.push(u.batchId);for(const h of u.mutations)c=c.add(h.key)}return n.localDocuments.getDocuments(r,c).next(u=>({Rs:u,removedBatchIds:o,addedBatchIds:l}))})})}function hS(t,e){const n=Z(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.ds.newChangeBuffer({trackRemovals:!0});return function(l,c,u,h){const f=u.batch,g=f.keys();let _=M.resolve();return g.forEach(T=>{_=_.next(()=>h.getEntry(c,T)).next(R=>{const I=u.docVersions.get(T);ce(I!==null),R.version.compareTo(I)<0&&(f.applyToRemoteDocument(R,u),R.isValidDocument()&&(R.setReadTime(u.commitVersion),h.addEntry(R)))})}),_.next(()=>l.mutationQueue.removeMutationBatch(c,f))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let c=se();for(let u=0;u<l.mutationResults.length;++u)l.mutationResults[u].transformResults.length>0&&(c=c.add(l.batch.mutations[u].key));return c}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function $y(t){const e=Z(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Hr.getLastRemoteSnapshotVersion(n))}function dS(t,e){const n=Z(t),r=e.snapshotVersion;let s=n.Ts;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.ds.newChangeBuffer({trackRemovals:!0});s=n.Ts;const l=[];e.targetChanges.forEach((h,f)=>{const g=s.get(f);if(!g)return;l.push(n.Hr.removeMatchingKeys(i,h.removedDocuments,f).next(()=>n.Hr.addMatchingKeys(i,h.addedDocuments,f)));let _=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(f)!==null?_=_.withResumeToken(We.EMPTY_BYTE_STRING,J.min()).withLastLimboFreeSnapshotVersion(J.min()):h.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(h.resumeToken,r)),s=s.insert(f,_),function(R,I,C){return R.resumeToken.approximateByteSize()===0||I.snapshotVersion.toMicroseconds()-R.snapshotVersion.toMicroseconds()>=lS?!0:C.addedDocuments.size+C.modifiedDocuments.size+C.removedDocuments.size>0}(g,_,h)&&l.push(n.Hr.updateTargetData(i,_))});let c=sn(),u=se();if(e.documentUpdates.forEach(h=>{e.resolvedLimboDocuments.has(h)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,h))}),l.push(fS(i,o,e.documentUpdates).next(h=>{c=h.Vs,u=h.fs})),!r.isEqual(J.min())){const h=n.Hr.getLastRemoteSnapshotVersion(i).next(f=>n.Hr.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(h)}return M.waitFor(l).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,c,u)).next(()=>c)}).then(i=>(n.Ts=s,i))}function fS(t,e,n){let r=se(),s=se();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=sn();return n.forEach((l,c)=>{const u=i.get(l);c.isFoundDocument()!==u.isFoundDocument()&&(s=s.add(l)),c.isNoDocument()&&c.version.isEqual(J.min())?(e.removeEntry(l,c.readTime),o=o.insert(l,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),o=o.insert(l,c)):z(ru,"Ignoring outdated watch update for ",l,". Current version:",u.version," Watch version:",c.version)}),{Vs:o,fs:s}})}function pS(t,e){const n=Z(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Wc),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function mS(t,e){const n=Z(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Hr.getTargetData(r,e).next(i=>i?(s=i,M.resolve(s)):n.Hr.allocateTargetId(r).next(o=>(s=new xn(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Hr.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.Ts.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Ts=n.Ts.insert(r.targetId,r),n.Is.set(e,r.targetId)),r})}async function tc(t,e,n){const r=Z(t),s=r.Ts.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!os(o))throw o;z(ru,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ts=r.Ts.remove(e),r.Is.delete(s.target)}function Lf(t,e,n){const r=Z(t);let s=J.min(),i=se();return r.persistence.runTransaction("Execute query","readwrite",o=>function(c,u,h){const f=Z(c),g=f.Is.get(h);return g!==void 0?M.resolve(f.Ts.get(g)):f.Hr.getTargetData(u,h)}(r,o,jt(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Hr.getMatchingKeysForTargetId(o,l.targetId).next(c=>{i=c})}).next(()=>r.Ps.getDocumentsMatchingQuery(o,e,n?s:J.min(),n?i:se())).next(l=>(gS(r,tA(e),l),{documents:l,gs:i})))}function gS(t,e,n){let r=t.Es.get(e)||J.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.Es.set(e,r)}class jf{constructor(){this.activeTargetIds=aA()}Ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}bs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class yS{constructor(){this.ho=new jf,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.ho.Ds(e),this.Po[e]||"not-current"}updateQueryState(e,n,r){this.Po[e]=n}removeLocalQueryTarget(e){this.ho.vs(e)}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){delete this.Po[e]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(e){return this.ho.activeTargetIds.has(e)}start(){return this.ho=new jf,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _S{To(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uf="ConnectivityMonitor";class Ff{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(e){this.Vo.push(e)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){z(Uf,"Network connectivity changed: AVAILABLE");for(const e of this.Vo)e(0)}Ro(){z(Uf,"Network connectivity changed: UNAVAILABLE");for(const e of this.Vo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let io=null;function nc(){return io===null?io=function(){return 268435456+Math.round(2147483648*Math.random())}():io++,"0x"+io.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hl="RestConnection",vS={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class wS{get fo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.po=n+"://"+e.host,this.yo=`projects/${r}/databases/${s}`,this.wo=this.databaseId.database===jo?`project_id=${r}`:`project_id=${r}&database_id=${s}`}So(e,n,r,s,i){const o=nc(),l=this.bo(e,n.toUriEncodedString());z(hl,`Sending RPC '${e}' ${o}:`,l,r);const c={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(c,s,i),this.vo(e,l,c,r).then(u=>(z(hl,`Received RPC '${e}' ${o}: `,u),u),u=>{throw Kr(hl,`RPC '${e}' ${o} failed with error: `,u,"url: ",l,"request:",r),u})}Co(e,n,r,s,i,o){return this.So(e,n,r,s,i)}Do(e,n,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ss}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}bo(e,n){const r=vS[e];return`${this.po}/v1/${n}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TS{constructor(e){this.Fo=e.Fo,this.Mo=e.Mo}xo(e){this.Oo=e}No(e){this.Bo=e}Lo(e){this.ko=e}onMessage(e){this.qo=e}close(){this.Mo()}send(e){this.Fo(e)}Qo(){this.Oo()}$o(){this.Bo()}Uo(e){this.ko(e)}Ko(e){this.qo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ye="WebChannelConnection";class ES extends wS{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,n,r,s){const i=nc();return new Promise((o,l)=>{const c=new Hg;c.setWithCredentials(!0),c.listenOnce(Kg.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case _o.NO_ERROR:const h=c.getResponseJson();z(Ye,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(h)),o(h);break;case _o.TIMEOUT:z(Ye,`RPC '${e}' ${i} timed out`),l(new H(O.DEADLINE_EXCEEDED,"Request time out"));break;case _o.HTTP_ERROR:const f=c.getStatus();if(z(Ye,`RPC '${e}' ${i} failed with status:`,f,"response text:",c.getResponseText()),f>0){let g=c.getResponseJson();Array.isArray(g)&&(g=g[0]);const _=g==null?void 0:g.error;if(_&&_.status&&_.message){const T=function(I){const C=I.toLowerCase().replace(/_/g,"-");return Object.values(O).indexOf(C)>=0?C:O.UNKNOWN}(_.status);l(new H(T,_.message))}else l(new H(O.UNKNOWN,"Server responded with status "+c.getStatus()))}else l(new H(O.UNAVAILABLE,"Connection failed."));break;default:X()}}finally{z(Ye,`RPC '${e}' ${i} completed.`)}});const u=JSON.stringify(s);z(Ye,`RPC '${e}' ${i} sending request:`,s),c.send(n,"POST",u,r,15)})}Wo(e,n,r){const s=nc(),i=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Xg(),l=Qg(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Do(c.initMessageHeaders,n,r),c.encodeInitMessageHeaders=!0;const h=i.join("");z(Ye,`Creating RPC '${e}' stream ${s}: ${h}`,c);const f=o.createWebChannel(h,c);let g=!1,_=!1;const T=new TS({Fo:I=>{_?z(Ye,`Not sending because RPC '${e}' stream ${s} is closed:`,I):(g||(z(Ye,`Opening RPC '${e}' stream ${s} transport.`),f.open(),g=!0),z(Ye,`RPC '${e}' stream ${s} sending:`,I),f.send(I))},Mo:()=>f.close()}),R=(I,C,V)=>{I.listen(C,D=>{try{V(D)}catch(B){setTimeout(()=>{throw B},0)}})};return R(f,Ns.EventType.OPEN,()=>{_||(z(Ye,`RPC '${e}' stream ${s} transport opened.`),T.Qo())}),R(f,Ns.EventType.CLOSE,()=>{_||(_=!0,z(Ye,`RPC '${e}' stream ${s} transport closed`),T.Uo())}),R(f,Ns.EventType.ERROR,I=>{_||(_=!0,Kr(Ye,`RPC '${e}' stream ${s} transport errored:`,I),T.Uo(new H(O.UNAVAILABLE,"The operation could not be completed")))}),R(f,Ns.EventType.MESSAGE,I=>{var C;if(!_){const V=I.data[0];ce(!!V);const D=V,B=(D==null?void 0:D.error)||((C=D[0])===null||C===void 0?void 0:C.error);if(B){z(Ye,`RPC '${e}' stream ${s} received error:`,B);const L=B.status;let U=function(w){const x=Pe[w];if(x!==void 0)return Py(x)}(L),b=B.message;U===void 0&&(U=O.INTERNAL,b="Unknown error status: "+L+" with message "+B.message),_=!0,T.Uo(new H(U,b)),f.close()}else z(Ye,`RPC '${e}' stream ${s} received:`,V),T.Ko(V)}}),R(l,Gg.STAT_EVENT,I=>{I.stat===ql.PROXY?z(Ye,`RPC '${e}' stream ${s} detected buffering proxy`):I.stat===ql.NOPROXY&&z(Ye,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{T.$o()},0),T}}function dl(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wa(t){return new AA(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qy{constructor(e,n,r=1e3,s=1.5,i=6e4){this.Ti=e,this.timerId=n,this.Go=r,this.zo=s,this.jo=i,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const n=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),s=Math.max(0,n-r);s>0&&z("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ho} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,s,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bf="PersistentStream";class Wy{constructor(e,n,r,s,i,o,l,c){this.Ti=e,this.n_=r,this.r_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new qy(e,n)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(e){this.E_(),this.stream.send(e)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(e,n){this.E_(),this.d_(),this.a_.cancel(),this.i_++,e!==4?this.a_.reset():n&&n.code===O.RESOURCE_EXHAUSTED?(rn(n.toString()),rn("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):n&&n.code===O.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Lo(n)}A_(){}auth(){this.state=1;const e=this.R_(this.i_),n=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.i_===n&&this.V_(r,s)},r=>{e(()=>{const s=new H(O.UNKNOWN,"Fetching auth token failed: "+r.message);return this.m_(s)})})}V_(e,n){const r=this.R_(this.i_);this.stream=this.f_(e,n),this.stream.xo(()=>{r(()=>this.listener.xo())}),this.stream.No(()=>{r(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(s=>{r(()=>this.m_(s))}),this.stream.onMessage(s=>{r(()=>++this.__==1?this.g_(s):this.onNext(s))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(e){return z(Bf,`close with error: ${e}`),this.stream=null,this.close(4,e)}R_(e){return n=>{this.Ti.enqueueAndForget(()=>this.i_===e?n():(z(Bf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class bS extends Wy{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}f_(e,n){return this.connection.Wo("Listen",e,n)}g_(e){return this.onNext(e)}onNext(e){this.a_.reset();const n=PA(this.serializer,e),r=function(i){if(!("targetChange"in i))return J.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?J.min():o.readTime?Ut(o.readTime):J.min()}(e);return this.listener.p_(n,r)}y_(e){const n={};n.database=ec(this.serializer),n.addTarget=function(i,o){let l;const c=o.target;if(l=Gl(c)?{documents:NA(i,c)}:{query:DA(i,c).ht},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=Ny(i,o.resumeToken);const u=Yl(i,o.expectedCount);u!==null&&(l.expectedCount=u)}else if(o.snapshotVersion.compareTo(J.min())>0){l.readTime=$o(i,o.snapshotVersion.toTimestamp());const u=Yl(i,o.expectedCount);u!==null&&(l.expectedCount=u)}return l}(this.serializer,e);const r=OA(this.serializer,e);r&&(n.labels=r),this.I_(n)}w_(e){const n={};n.database=ec(this.serializer),n.removeTarget=e,this.I_(n)}}class IS extends Wy{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get S_(){return this.__>0}start(){this.lastStreamToken=void 0,super.start()}A_(){this.S_&&this.b_([])}f_(e,n){return this.connection.Wo("Write",e,n)}g_(e){return ce(!!e.streamToken),this.lastStreamToken=e.streamToken,ce(!e.writeResults||e.writeResults.length===0),this.listener.D_()}onNext(e){ce(!!e.streamToken),this.lastStreamToken=e.streamToken,this.a_.reset();const n=kA(e.writeResults,e.commitTime),r=Ut(e.commitTime);return this.listener.v_(r,n)}C_(){const e={};e.database=ec(this.serializer),this.I_(e)}b_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>CA(this.serializer,r))};this.I_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xS{}class AS extends xS{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.F_=!1}M_(){if(this.F_)throw new H(O.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,n,r,s){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.So(e,Jl(n,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new H(O.UNKNOWN,i.toString())})}Co(e,n,r,s,i){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Co(e,Jl(n,r),s,o,l,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new H(O.UNKNOWN,o.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class SS{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(e){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.L_("Offline")))}set(e){this.Q_(),this.x_=0,e==="Online"&&(this.N_=!1),this.L_(e)}L_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}k_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.N_?(rn(n),this.N_=!1):z("OnlineStateTracker",n)}Q_(){this.O_!==null&&(this.O_.cancel(),this.O_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr="RemoteStore";class RS{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.U_=[],this.K_=new Map,this.W_=new Set,this.G_=[],this.z_=i,this.z_.To(o=>{r.enqueueAndForget(async()=>{wr(this)&&(z(fr,"Restarting streams for network reachability change."),await async function(c){const u=Z(c);u.W_.add(4),await Si(u),u.j_.set("Unknown"),u.W_.delete(4),await Ta(u)}(this))})}),this.j_=new SS(r,s)}}async function Ta(t){if(wr(t))for(const e of t.G_)await e(!0)}async function Si(t){for(const e of t.G_)await e(!1)}function zy(t,e){const n=Z(t);n.K_.has(e.targetId)||(n.K_.set(e.targetId,e),au(n)?ou(n):ls(n).c_()&&iu(n,e))}function su(t,e){const n=Z(t),r=ls(n);n.K_.delete(e),r.c_()&&Hy(n,e),n.K_.size===0&&(r.c_()?r.P_():wr(n)&&n.j_.set("Unknown"))}function iu(t,e){if(t.H_.Ne(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(J.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}ls(t).y_(e)}function Hy(t,e){t.H_.Ne(e),ls(t).w_(e)}function ou(t){t.H_=new EA({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>t.K_.get(e)||null,it:()=>t.datastore.serializer.databaseId}),ls(t).start(),t.j_.B_()}function au(t){return wr(t)&&!ls(t).u_()&&t.K_.size>0}function wr(t){return Z(t).W_.size===0}function Ky(t){t.H_=void 0}async function PS(t){t.j_.set("Online")}async function CS(t){t.K_.forEach((e,n)=>{iu(t,e)})}async function kS(t,e){Ky(t),au(t)?(t.j_.q_(e),ou(t)):t.j_.set("Unknown")}async function NS(t,e,n){if(t.j_.set("Online"),e instanceof ky&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const l of i.targetIds)s.K_.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.K_.delete(l),s.H_.removeTarget(l))}(t,e)}catch(r){z(fr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Wo(t,r)}else if(e instanceof Eo?t.H_.We(e):e instanceof Cy?t.H_.Ze(e):t.H_.je(e),!n.isEqual(J.min()))try{const r=await $y(t.localStore);n.compareTo(r)>=0&&await function(i,o){const l=i.H_.ot(o);return l.targetChanges.forEach((c,u)=>{if(c.resumeToken.approximateByteSize()>0){const h=i.K_.get(u);h&&i.K_.set(u,h.withResumeToken(c.resumeToken,o))}}),l.targetMismatches.forEach((c,u)=>{const h=i.K_.get(c);if(!h)return;i.K_.set(c,h.withResumeToken(We.EMPTY_BYTE_STRING,h.snapshotVersion)),Hy(i,c);const f=new xn(h.target,c,u,h.sequenceNumber);iu(i,f)}),i.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){z(fr,"Failed to raise snapshot:",r),await Wo(t,r)}}async function Wo(t,e,n){if(!os(e))throw e;t.W_.add(1),await Si(t),t.j_.set("Offline"),n||(n=()=>$y(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{z(fr,"Retrying IndexedDB access"),await n(),t.W_.delete(1),await Ta(t)})}function Gy(t,e){return e().catch(n=>Wo(t,n,e))}async function Ea(t){const e=Z(t),n=jn(e);let r=e.U_.length>0?e.U_[e.U_.length-1].batchId:Wc;for(;DS(e);)try{const s=await pS(e.localStore,r);if(s===null){e.U_.length===0&&n.P_();break}r=s.batchId,VS(e,s)}catch(s){await Wo(e,s)}Qy(e)&&Xy(e)}function DS(t){return wr(t)&&t.U_.length<10}function VS(t,e){t.U_.push(e);const n=jn(t);n.c_()&&n.S_&&n.b_(e.mutations)}function Qy(t){return wr(t)&&!jn(t).u_()&&t.U_.length>0}function Xy(t){jn(t).start()}async function OS(t){jn(t).C_()}async function MS(t){const e=jn(t);for(const n of t.U_)e.b_(n.mutations)}async function LS(t,e,n){const r=t.U_.shift(),s=Yc.from(r,e,n);await Gy(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await Ea(t)}async function jS(t,e){e&&jn(t).S_&&await async function(r,s){if(function(o){return wA(o)&&o!==O.ABORTED}(s.code)){const i=r.U_.shift();jn(r).h_(),await Gy(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Ea(r)}}(t,e),Qy(t)&&Xy(t)}async function $f(t,e){const n=Z(t);n.asyncQueue.verifyOperationInProgress(),z(fr,"RemoteStore received new credentials");const r=wr(n);n.W_.add(3),await Si(n),r&&n.j_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.W_.delete(3),await Ta(n)}async function US(t,e){const n=Z(t);e?(n.W_.delete(2),await Ta(n)):e||(n.W_.add(2),await Si(n),n.j_.set("Unknown"))}function ls(t){return t.J_||(t.J_=function(n,r,s){const i=Z(n);return i.M_(),new bS(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{xo:PS.bind(null,t),No:CS.bind(null,t),Lo:kS.bind(null,t),p_:NS.bind(null,t)}),t.G_.push(async e=>{e?(t.J_.h_(),au(t)?ou(t):t.j_.set("Unknown")):(await t.J_.stop(),Ky(t))})),t.J_}function jn(t){return t.Y_||(t.Y_=function(n,r,s){const i=Z(n);return i.M_(),new IS(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{xo:()=>Promise.resolve(),No:OS.bind(null,t),Lo:jS.bind(null,t),D_:MS.bind(null,t),v_:LS.bind(null,t)}),t.G_.push(async e=>{e?(t.Y_.h_(),await Ea(t)):(await t.Y_.stop(),t.U_.length>0&&(z(fr,`Stopping write stream with ${t.U_.length} pending writes`),t.U_=[]))})),t.Y_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lu{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new en,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,l=new lu(e,n,o,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new H(O.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function cu(t,e){if(rn("AsyncQueue",`${e}: ${t}`),os(t))return new H(O.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{static emptySet(e){return new Hr(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||K.comparator(n.key,r.key):(n,r)=>K.comparator(n.key,r.key),this.keyedMap=Ds(),this.sortedSet=new _e(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Hr)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Hr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{constructor(){this.Z_=new _e(K.comparator)}track(e){const n=e.doc.key,r=this.Z_.get(n);r?e.type!==0&&r.type===3?this.Z_=this.Z_.insert(n,e):e.type===3&&r.type!==1?this.Z_=this.Z_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Z_=this.Z_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Z_=this.Z_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Z_=this.Z_.remove(n):e.type===1&&r.type===2?this.Z_=this.Z_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Z_=this.Z_.insert(n,{type:2,doc:e.doc}):X():this.Z_=this.Z_.insert(n,e)}X_(){const e=[];return this.Z_.inorderTraversal((n,r)=>{e.push(r)}),e}}class Jr{constructor(e,n,r,s,i,o,l,c,u){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new Jr(e,n,Hr.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ma(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FS{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(e=>e.ra())}}class BS{constructor(){this.queries=Wf(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(n,r){const s=Z(n),i=s.queries;s.queries=Wf(),i.forEach((o,l)=>{for(const c of l.ta)c.onError(r)})})(this,new H(O.ABORTED,"Firestore shutting down"))}}function Wf(){return new vr(t=>yy(t),ma)}async function uu(t,e){const n=Z(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.na()&&e.ra()&&(r=2):(i=new FS,r=e.ra()?0:1);try{switch(r){case 0:i.ea=await n.onListen(s,!0);break;case 1:i.ea=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const l=cu(o,`Initialization of query '${Dr(e.query)}' failed`);return void e.onError(l)}n.queries.set(s,i),i.ta.push(e),e.sa(n.onlineState),i.ea&&e.oa(i.ea)&&du(n)}async function hu(t,e){const n=Z(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.ta.indexOf(e);o>=0&&(i.ta.splice(o,1),i.ta.length===0?s=e.ra()?0:1:!i.na()&&e.ra()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function $S(t,e){const n=Z(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const l of o.ta)l.oa(s)&&(r=!0);o.ea=s}}r&&du(n)}function qS(t,e,n){const r=Z(t),s=r.queries.get(e);if(s)for(const i of s.ta)i.onError(n);r.queries.delete(e)}function du(t){t.ia.forEach(e=>{e.next()})}var rc,zf;(zf=rc||(rc={}))._a="default",zf.Cache="cache";class fu{constructor(e,n,r){this.query=e,this.aa=n,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=r||{}}oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Jr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.ua?this.la(e)&&(this.aa.next(e),n=!0):this.ha(e,this.onlineState)&&(this.Pa(e),n=!0),this.ca=e,n}onError(e){this.aa.error(e)}sa(e){this.onlineState=e;let n=!1;return this.ca&&!this.ua&&this.ha(this.ca,e)&&(this.Pa(this.ca),n=!0),n}ha(e,n){if(!e.fromCache||!this.ra())return!0;const r=n!=="Offline";return(!this.options.Ta||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}la(e){if(e.docChanges.length>0)return!0;const n=this.ca&&this.ca.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}Pa(e){e=Jr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ua=!0,this.aa.next(e)}ra(){return this.options.source!==rc.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yy{constructor(e){this.key=e}}class Jy{constructor(e){this.key=e}}class WS{constructor(e,n){this.query=e,this.fa=n,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=se(),this.mutatedKeys=se(),this.ya=_y(e),this.wa=new Hr(this.ya)}get Sa(){return this.fa}ba(e,n){const r=n?n.Da:new qf,s=n?n.wa:this.wa;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,l=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,u=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((h,f)=>{const g=s.get(h),_=ga(this.query,f)?f:null,T=!!g&&this.mutatedKeys.has(g.key),R=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let I=!1;g&&_?g.data.isEqual(_.data)?T!==R&&(r.track({type:3,doc:_}),I=!0):this.va(g,_)||(r.track({type:2,doc:_}),I=!0,(c&&this.ya(_,c)>0||u&&this.ya(_,u)<0)&&(l=!0)):!g&&_?(r.track({type:0,doc:_}),I=!0):g&&!_&&(r.track({type:1,doc:g}),I=!0,(c||u)&&(l=!0)),I&&(_?(o=o.add(_),i=R?i.add(h):i.delete(h)):(o=o.delete(h),i=i.delete(h)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),i=i.delete(h.key),r.track({type:1,doc:h})}return{wa:o,Da:r,ls:l,mutatedKeys:i}}va(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.wa;this.wa=e.wa,this.mutatedKeys=e.mutatedKeys;const o=e.Da.X_();o.sort((h,f)=>function(_,T){const R=I=>{switch(I){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return X()}};return R(_)-R(T)}(h.type,f.type)||this.ya(h.doc,f.doc)),this.Ca(r),s=s!=null&&s;const l=n&&!s?this.Fa():[],c=this.pa.size===0&&this.current&&!s?1:0,u=c!==this.ga;return this.ga=c,o.length!==0||u?{snapshot:new Jr(this.query,e.wa,i,o,e.mutatedKeys,c===0,u,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ma:l}:{Ma:l}}sa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new qf,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(e){return!this.fa.has(e)&&!!this.wa.has(e)&&!this.wa.get(e).hasLocalMutations}Ca(e){e&&(e.addedDocuments.forEach(n=>this.fa=this.fa.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.fa=this.fa.delete(n)),this.current=e.current)}Fa(){if(!this.current)return[];const e=this.pa;this.pa=se(),this.wa.forEach(r=>{this.xa(r.key)&&(this.pa=this.pa.add(r.key))});const n=[];return e.forEach(r=>{this.pa.has(r)||n.push(new Jy(r))}),this.pa.forEach(r=>{e.has(r)||n.push(new Yy(r))}),n}Oa(e){this.fa=e.gs,this.pa=se();const n=this.ba(e.documents);return this.applyChanges(n,!0)}Na(){return Jr.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const pu="SyncEngine";class zS{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class HS{constructor(e){this.key=e,this.Ba=!1}}class KS{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.La={},this.ka=new vr(l=>yy(l),ma),this.qa=new Map,this.Qa=new Set,this.$a=new _e(K.comparator),this.Ua=new Map,this.Ka=new eu,this.Wa={},this.Ga=new Map,this.za=Yr.Kn(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function GS(t,e,n=!0){const r=s_(t);let s;const i=r.ka.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Na()):s=await Zy(r,e,n,!0),s}async function QS(t,e){const n=s_(t);await Zy(n,e,!0,!1)}async function Zy(t,e,n,r){const s=await mS(t.localStore,jt(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let l;return r&&(l=await XS(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&zy(t.remoteStore,s),l}async function XS(t,e,n,r,s){t.Ha=(f,g,_)=>async function(R,I,C,V){let D=I.view.ba(C);D.ls&&(D=await Lf(R.localStore,I.query,!1).then(({documents:b})=>I.view.ba(b,D)));const B=V&&V.targetChanges.get(I.targetId),L=V&&V.targetMismatches.get(I.targetId)!=null,U=I.view.applyChanges(D,R.isPrimaryClient,B,L);return Kf(R,I.targetId,U.Ma),U.snapshot}(t,f,g,_);const i=await Lf(t.localStore,e,!0),o=new WS(e,i.gs),l=o.ba(i.documents),c=Ai.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),u=o.applyChanges(l,t.isPrimaryClient,c);Kf(t,n,u.Ma);const h=new zS(e,n,o);return t.ka.set(e,h),t.qa.has(n)?t.qa.get(n).push(e):t.qa.set(n,[e]),u.snapshot}async function YS(t,e,n){const r=Z(t),s=r.ka.get(e),i=r.qa.get(s.targetId);if(i.length>1)return r.qa.set(s.targetId,i.filter(o=>!ma(o,e))),void r.ka.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await tc(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&su(r.remoteStore,s.targetId),sc(r,s.targetId)}).catch(is)):(sc(r,s.targetId),await tc(r.localStore,s.targetId,!0))}async function JS(t,e){const n=Z(t),r=n.ka.get(e),s=n.qa.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),su(n.remoteStore,r.targetId))}async function ZS(t,e,n){const r=oR(t);try{const s=await function(o,l){const c=Z(o),u=Te.now(),h=l.reduce((_,T)=>_.add(T.key),se());let f,g;return c.persistence.runTransaction("Locally write mutations","readwrite",_=>{let T=sn(),R=se();return c.ds.getEntries(_,h).next(I=>{T=I,T.forEach((C,V)=>{V.isValidDocument()||(R=R.add(C))})}).next(()=>c.localDocuments.getOverlayedDocuments(_,T)).next(I=>{f=I;const C=[];for(const V of l){const D=mA(V,f.get(V.key).overlayedDocument);D!=null&&C.push(new zn(V.key,D,cy(D.value.mapValue),Et.exists(!0)))}return c.mutationQueue.addMutationBatch(_,u,C,l)}).next(I=>{g=I;const C=I.applyToLocalDocumentSet(f,R);return c.documentOverlayCache.saveOverlays(_,I.batchId,C)})}).then(()=>({batchId:g.batchId,changes:wy(f)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,l,c){let u=o.Wa[o.currentUser.toKey()];u||(u=new _e(ee)),u=u.insert(l,c),o.Wa[o.currentUser.toKey()]=u}(r,s.batchId,n),await Ri(r,s.changes),await Ea(r.remoteStore)}catch(s){const i=cu(s,"Failed to persist write");n.reject(i)}}async function e_(t,e){const n=Z(t);try{const r=await dS(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Ua.get(i);o&&(ce(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.Ba=!0:s.modifiedDocuments.size>0?ce(o.Ba):s.removedDocuments.size>0&&(ce(o.Ba),o.Ba=!1))}),await Ri(n,r,e)}catch(r){await is(r)}}function Hf(t,e,n){const r=Z(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.ka.forEach((i,o)=>{const l=o.view.sa(e);l.snapshot&&s.push(l.snapshot)}),function(o,l){const c=Z(o);c.onlineState=l;let u=!1;c.queries.forEach((h,f)=>{for(const g of f.ta)g.sa(l)&&(u=!0)}),u&&du(c)}(r.eventManager,e),s.length&&r.La.p_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function eR(t,e,n){const r=Z(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Ua.get(e),i=s&&s.key;if(i){let o=new _e(K.comparator);o=o.insert(i,et.newNoDocument(i,J.min()));const l=se().add(i),c=new va(J.min(),new Map,new _e(ee),o,l);await e_(r,c),r.$a=r.$a.remove(i),r.Ua.delete(e),mu(r)}else await tc(r.localStore,e,!1).then(()=>sc(r,e,n)).catch(is)}async function tR(t,e){const n=Z(t),r=e.batch.batchId;try{const s=await hS(n.localStore,e);n_(n,r,null),t_(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Ri(n,s)}catch(s){await is(s)}}async function nR(t,e,n){const r=Z(t);try{const s=await function(o,l){const c=Z(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let h;return c.mutationQueue.lookupMutationBatch(u,l).next(f=>(ce(f!==null),h=f.keys(),c.mutationQueue.removeMutationBatch(u,f))).next(()=>c.mutationQueue.performConsistencyCheck(u)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(u,h,l)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,h)).next(()=>c.localDocuments.getDocuments(u,h))})}(r.localStore,e);n_(r,e,n),t_(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Ri(r,s)}catch(s){await is(s)}}function t_(t,e){(t.Ga.get(e)||[]).forEach(n=>{n.resolve()}),t.Ga.delete(e)}function n_(t,e,n){const r=Z(t);let s=r.Wa[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Wa[r.currentUser.toKey()]=s}}function sc(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.qa.get(e))t.ka.delete(r),n&&t.La.Ja(r,n);t.qa.delete(e),t.isPrimaryClient&&t.Ka.br(e).forEach(r=>{t.Ka.containsKey(r)||r_(t,r)})}function r_(t,e){t.Qa.delete(e.path.canonicalString());const n=t.$a.get(e);n!==null&&(su(t.remoteStore,n),t.$a=t.$a.remove(e),t.Ua.delete(n),mu(t))}function Kf(t,e,n){for(const r of n)r instanceof Yy?(t.Ka.addReference(r.key,e),rR(t,r)):r instanceof Jy?(z(pu,"Document no longer in limbo: "+r.key),t.Ka.removeReference(r.key,e),t.Ka.containsKey(r.key)||r_(t,r.key)):X()}function rR(t,e){const n=e.key,r=n.path.canonicalString();t.$a.get(n)||t.Qa.has(r)||(z(pu,"New document in limbo: "+n),t.Qa.add(r),mu(t))}function mu(t){for(;t.Qa.size>0&&t.$a.size<t.maxConcurrentLimboResolutions;){const e=t.Qa.values().next().value;t.Qa.delete(e);const n=new K(me.fromString(e)),r=t.za.next();t.Ua.set(r,new HS(n)),t.$a=t.$a.insert(n,r),zy(t.remoteStore,new xn(jt(pa(n.path)),r,"TargetPurposeLimboResolution",ha.ae))}}async function Ri(t,e,n){const r=Z(t),s=[],i=[],o=[];r.ka.isEmpty()||(r.ka.forEach((l,c)=>{o.push(r.Ha(c,e,n).then(u=>{var h;if((u||n)&&r.isPrimaryClient){const f=u?!u.fromCache:(h=n==null?void 0:n.targetChanges.get(c.targetId))===null||h===void 0?void 0:h.current;r.sharedClientState.updateQueryState(c.targetId,f?"current":"not-current")}if(u){s.push(u);const f=nu.Yi(c.targetId,u);i.push(f)}}))}),await Promise.all(o),r.La.p_(s),await async function(c,u){const h=Z(c);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",f=>M.forEach(u,g=>M.forEach(g.Hi,_=>h.persistence.referenceDelegate.addReference(f,g.targetId,_)).next(()=>M.forEach(g.Ji,_=>h.persistence.referenceDelegate.removeReference(f,g.targetId,_)))))}catch(f){if(!os(f))throw f;z(ru,"Failed to update sequence numbers: "+f)}for(const f of u){const g=f.targetId;if(!f.fromCache){const _=h.Ts.get(g),T=_.snapshotVersion,R=_.withLastLimboFreeSnapshotVersion(T);h.Ts=h.Ts.insert(g,R)}}}(r.localStore,i))}async function sR(t,e){const n=Z(t);if(!n.currentUser.isEqual(e)){z(pu,"User change. New user:",e.toKey());const r=await By(n.localStore,e);n.currentUser=e,function(i,o){i.Ga.forEach(l=>{l.forEach(c=>{c.reject(new H(O.CANCELLED,o))})}),i.Ga.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Ri(n,r.Rs)}}function iR(t,e){const n=Z(t),r=n.Ua.get(e);if(r&&r.Ba)return se().add(r.key);{let s=se();const i=n.qa.get(e);if(!i)return s;for(const o of i){const l=n.ka.get(o);s=s.unionWith(l.view.Sa)}return s}}function s_(t){const e=Z(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=e_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=iR.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=eR.bind(null,e),e.La.p_=$S.bind(null,e.eventManager),e.La.Ja=qS.bind(null,e.eventManager),e}function oR(t){const e=Z(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=tR.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=nR.bind(null,e),e}class zo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=wa(e.databaseInfo.databaseId),this.sharedClientState=this.Za(e),this.persistence=this.Xa(e),await this.persistence.start(),this.localStore=this.eu(e),this.gcScheduler=this.tu(e,this.localStore),this.indexBackfillerScheduler=this.nu(e,this.localStore)}tu(e,n){return null}nu(e,n){return null}eu(e){return uS(this.persistence,new aS,e.initialUser,this.serializer)}Xa(e){return new Fy(tu.ri,this.serializer)}Za(e){return new yS}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}zo.provider={build:()=>new zo};class aR extends zo{constructor(e){super(),this.cacheSizeBytes=e}tu(e,n){ce(this.persistence.referenceDelegate instanceof qo);const r=this.persistence.referenceDelegate.garbageCollector;return new HA(r,e.asyncQueue,n)}Xa(e){const n=this.cacheSizeBytes!==void 0?ut.withCacheSize(this.cacheSizeBytes):ut.DEFAULT;return new Fy(r=>qo.ri(r,n),this.serializer)}}class ic{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Hf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=sR.bind(null,this.syncEngine),await US(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new BS}()}createDatastore(e){const n=wa(e.databaseInfo.databaseId),r=function(i){return new ES(i)}(e.databaseInfo);return function(i,o,l,c){return new AS(i,o,l,c)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,o,l){return new RS(r,s,i,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>Hf(this.syncEngine,n,0),function(){return Ff.D()?new Ff:new _S}())}createSyncEngine(e,n){return function(s,i,o,l,c,u,h){const f=new KS(s,i,o,l,c,u);return h&&(f.ja=!0),f}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){const i=Z(s);z(fr,"RemoteStore shutting down."),i.W_.add(5),await Si(i),i.z_.shutdown(),i.j_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}ic.provider={build:()=>new ic};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.iu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.iu(this.observer.error,e):rn("Uncaught Error in snapshot listener:",e.toString()))}su(){this.muted=!0}iu(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Un="FirestoreClient";class lR{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=Ze.UNAUTHENTICATED,this.clientId=Zg.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{z(Un,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(z(Un,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new en;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=cu(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function fl(t,e){t.asyncQueue.verifyOperationInProgress(),z(Un,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await By(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Gf(t,e){t.asyncQueue.verifyOperationInProgress();const n=await cR(t);z(Un,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>$f(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>$f(e.remoteStore,s)),t._onlineComponents=e}async function cR(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){z(Un,"Using user provided OfflineComponentProvider");try{await fl(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===O.FAILED_PRECONDITION||s.code===O.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;Kr("Error using user provided cache. Falling back to memory cache: "+n),await fl(t,new zo)}}else z(Un,"Using default OfflineComponentProvider"),await fl(t,new aR(void 0));return t._offlineComponents}async function i_(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(z(Un,"Using user provided OnlineComponentProvider"),await Gf(t,t._uninitializedComponentsProvider._online)):(z(Un,"Using default OnlineComponentProvider"),await Gf(t,new ic))),t._onlineComponents}function uR(t){return i_(t).then(e=>e.syncEngine)}async function Ho(t){const e=await i_(t),n=e.eventManager;return n.onListen=GS.bind(null,e.syncEngine),n.onUnlisten=YS.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=QS.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=JS.bind(null,e.syncEngine),n}function hR(t,e,n={}){const r=new en;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,c,u){const h=new gu({next:g=>{h.su(),o.enqueueAndForget(()=>hu(i,f));const _=g.docs.has(l);!_&&g.fromCache?u.reject(new H(O.UNAVAILABLE,"Failed to get document because the client is offline.")):_&&g.fromCache&&c&&c.source==="server"?u.reject(new H(O.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(g)},error:g=>u.reject(g)}),f=new fu(pa(l.path),h,{includeMetadataChanges:!0,Ta:!0});return uu(i,f)}(await Ho(t),t.asyncQueue,e,n,r)),r.promise}function dR(t,e,n={}){const r=new en;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,c,u){const h=new gu({next:g=>{h.su(),o.enqueueAndForget(()=>hu(i,f)),g.fromCache&&c.source==="server"?u.reject(new H(O.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(g)},error:g=>u.reject(g)}),f=new fu(l,h,{includeMetadataChanges:!0,Ta:!0});return uu(i,f)}(await Ho(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function o_(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qf=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function a_(t,e,n){if(!n)throw new H(O.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function fR(t,e,n,r){if(e===!0&&r===!0)throw new H(O.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Xf(t){if(!K.isDocumentKey(t))throw new H(O.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Yf(t){if(K.isDocumentKey(t))throw new H(O.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function ba(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":X()}function dt(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new H(O.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=ba(t);throw new H(O.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const l_="firestore.googleapis.com",Jf=!0;class Zf{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new H(O.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=l_,this.ssl=Jf}else this.host=e.host,this.ssl=(n=e.ssl)!==null&&n!==void 0?n:Jf;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Uy;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<WA)throw new H(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}fR("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=o_((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new H(O.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new H(O.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new H(O.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ia{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Zf({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new H(O.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new H(O.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Zf(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new wx;switch(r.type){case"firstParty":return new Ix(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new H(O.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Qf.get(n);r&&(z("ComponentProvider","Removing Datastore"),Qf.delete(n),r.terminate())}(this),Promise.resolve()}}function pR(t,e,n,r={}){var s;const i=(t=dt(t,Ia))._getSettings(),o=Object.assign(Object.assign({},i),{emulatorOptions:t._getEmulatorOptions()}),l=`${e}:${n}`;i.host!==l_&&i.host!==l&&Kr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c=Object.assign(Object.assign({},i),{host:l,ssl:!1,emulatorOptions:r});if(!lr(c,o)&&(t._setSettings(c),r.mockUserToken)){let u,h;if(typeof r.mockUserToken=="string")u=r.mockUserToken,h=Ze.MOCK_USER;else{u=sg(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const f=r.mockUserToken.sub||r.mockUserToken.user_id;if(!f)throw new H(O.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new Ze(f)}t._authCredentials=new Tx(new Yg(u,h))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Hn(this.firestore,e,this._query)}}class nt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new kn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new nt(this.firestore,e,this._key)}}class kn extends Hn{constructor(e,n,r){super(e,n,pa(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new nt(this.firestore,null,new K(e))}withConverter(e){return new kn(this.firestore,e,this._path)}}function Qt(t,e,...n){if(t=ye(t),a_("collection","path",e),t instanceof Ia){const r=me.fromString(e,...n);return Yf(r),new kn(t,null,r)}{if(!(t instanceof nt||t instanceof kn))throw new H(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(me.fromString(e,...n));return Yf(r),new kn(t.firestore,null,r)}}function Dt(t,e,...n){if(t=ye(t),arguments.length===1&&(e=Zg.newId()),a_("doc","path",e),t instanceof Ia){const r=me.fromString(e,...n);return Xf(r),new nt(t,null,new K(r))}{if(!(t instanceof nt||t instanceof kn))throw new H(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(me.fromString(e,...n));return Xf(r),new nt(t.firestore,t instanceof kn?t.converter:null,new K(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ep="AsyncQueue";class tp{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new qy(this,"async_queue_retry"),this.Su=()=>{const r=dl();r&&z(ep,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const n=dl();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const n=dl();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const n=new en;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!os(e))throw e;z(ep,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const n=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const s=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw rn("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.pu=!1,r))));return this.bu=n,n}enqueueAfterDelay(e,n,r){this.Du(),this.wu.indexOf(e)>-1&&(n=0);const s=lu.createAndSchedule(this,e,n,r,i=>this.Fu(i));return this.fu.push(s),s}Du(){this.gu&&X()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const n of this.fu)if(n.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.fu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const n=this.fu.indexOf(e);this.fu.splice(n,1)}}function np(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const s=n;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(t,["next","error","complete"])}class on extends Ia{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new tp,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new tp(e),this._firestoreClient=void 0,await e}}}function mR(t,e){const n=typeof t=="object"?t:Nc(),r=typeof t=="string"?t:jo,s=aa(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=tg("firestore");i&&pR(s,...i)}return s}function xa(t){if(t._terminated)throw new H(O.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||gR(t),t._firestoreClient}function gR(t){var e,n,r;const s=t._freezeSettings(),i=function(l,c,u,h){return new Ux(l,c,u,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,o_(h.experimentalLongPollingOptions),h.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new lR(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Zr(We.fromBase64String(e))}catch(n){throw new H(O.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Zr(We.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aa{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new H(O.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new qe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yu{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new H(O.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new H(O.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ee(this._lat,e._lat)||ee(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yR=/^__.*__$/;class _R{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new zn(e,this.data,this.fieldMask,n,this.fieldTransforms):new xi(e,this.data,n,this.fieldTransforms)}}class c_{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new zn(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function u_(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw X()}}class vu{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Bu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Lu(){return this.settings.Lu}ku(e){return new vu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}qu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.ku({path:r,Qu:!1});return s.$u(e),s}Uu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.ku({path:r,Qu:!1});return s.Bu(),s}Ku(e){return this.ku({path:void 0,Qu:!0})}Wu(e){return Ko(e,this.settings.methodName,this.settings.Gu||!1,this.path,this.settings.zu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Bu(){if(this.path)for(let e=0;e<this.path.length;e++)this.$u(this.path.get(e))}$u(e){if(e.length===0)throw this.Wu("Document fields must not be empty");if(u_(this.Lu)&&yR.test(e))throw this.Wu('Document fields cannot begin and end with "__"')}}class vR{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||wa(e)}ju(e,n,r,s=!1){return new vu({Lu:e,methodName:n,zu:r,path:qe.emptyPath(),Qu:!1,Gu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ra(t){const e=t._freezeSettings(),n=wa(t._databaseId);return new vR(t._databaseId,!!e.ignoreUndefinedProperties,n)}function h_(t,e,n,r,s,i={}){const o=t.ju(i.merge||i.mergeFields?2:0,e,n,s);Tu("Data must be an object, but it was:",o,r);const l=d_(r,o);let c,u;if(i.merge)c=new gt(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const h=[];for(const f of i.mergeFields){const g=oc(e,f,n);if(!o.contains(g))throw new H(O.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);p_(h,g)||h.push(g)}c=new gt(h),u=o.fieldTransforms.filter(f=>c.covers(f.field))}else c=null,u=o.fieldTransforms;return new _R(new ht(l),c,u)}class Pa extends Sa{_toFieldTransform(e){if(e.Lu!==2)throw e.Lu===1?e.Wu(`${this._methodName}() can only appear at the top level of your update data`):e.Wu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Pa}}class wu extends Sa{_toFieldTransform(e){return new hA(e.path,new ii)}isEqual(e){return e instanceof wu}}function wR(t,e,n,r){const s=t.ju(1,e,n);Tu("Data must be an object, but it was:",s,r);const i=[],o=ht.empty();Wn(r,(c,u)=>{const h=Eu(e,c,n);u=ye(u);const f=s.Uu(h);if(u instanceof Pa)i.push(h);else{const g=Pi(u,f);g!=null&&(i.push(h),o.set(h,g))}});const l=new gt(i);return new c_(o,l,s.fieldTransforms)}function TR(t,e,n,r,s,i){const o=t.ju(1,e,n),l=[oc(e,r,n)],c=[s];if(i.length%2!=0)throw new H(O.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)l.push(oc(e,i[g])),c.push(i[g+1]);const u=[],h=ht.empty();for(let g=l.length-1;g>=0;--g)if(!p_(u,l[g])){const _=l[g];let T=c[g];T=ye(T);const R=o.Uu(_);if(T instanceof Pa)u.push(_);else{const I=Pi(T,R);I!=null&&(u.push(_),h.set(_,I))}}const f=new gt(u);return new c_(h,f,o.fieldTransforms)}function ER(t,e,n,r=!1){return Pi(n,t.ju(r?4:3,e))}function Pi(t,e){if(f_(t=ye(t)))return Tu("Unsupported field value:",e,t),d_(t,e);if(t instanceof Sa)return function(r,s){if(!u_(s.Lu))throw s.Wu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Wu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.Qu&&e.Lu!==4)throw e.Wu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const l of r){let c=Pi(l,s.Ku(o));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),o++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=ye(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return lA(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Te.fromDate(r);return{timestampValue:$o(s.serializer,i)}}if(r instanceof Te){const i=new Te(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:$o(s.serializer,i)}}if(r instanceof yu)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Zr)return{bytesValue:Ny(s.serializer,r._byteString)};if(r instanceof nt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Wu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Zc(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof _u)return function(o,l){return{mapValue:{fields:{[ay]:{stringValue:ly},[Uo]:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw l.Wu("VectorValues must only contain numeric values.");return Qc(l.serializer,u)})}}}}}}(r,s);throw s.Wu(`Unsupported field value: ${ba(r)}`)}(t,e)}function d_(t,e){const n={};return ty(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Wn(t,(r,s)=>{const i=Pi(s,e.qu(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function f_(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Te||t instanceof yu||t instanceof Zr||t instanceof nt||t instanceof Sa||t instanceof _u)}function Tu(t,e,n){if(!f_(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const r=ba(n);throw r==="an object"?e.Wu(t+" a custom object"):e.Wu(t+" "+r)}}function oc(t,e,n){if((e=ye(e))instanceof Aa)return e._internalPath;if(typeof e=="string")return Eu(t,e);throw Ko("Field path arguments must be of type string or ",t,!1,void 0,n)}const bR=new RegExp("[~\\*/\\[\\]]");function Eu(t,e,n){if(e.search(bR)>=0)throw Ko(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Aa(...e.split("."))._internalPath}catch{throw Ko(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Ko(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new H(O.INVALID_ARGUMENT,l+t+c)}function p_(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m_{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new nt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new IR(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Ca("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class IR extends m_{data(){return super.data()}}function Ca(t,e){return typeof e=="string"?Eu(t,e):e instanceof Aa?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g_(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new H(O.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class bu{}class y_ extends bu{}function Lr(t,e,...n){let r=[];e instanceof bu&&r.push(e),r=r.concat(n),function(i){const o=i.filter(c=>c instanceof Iu).length,l=i.filter(c=>c instanceof ka).length;if(o>1||o>0&&l>0)throw new H(O.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class ka extends y_{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new ka(e,n,r)}_apply(e){const n=this._parse(e);return v_(e._query,n),new Hn(e.firestore,e.converter,Ql(e._query,n))}_parse(e){const n=Ra(e.firestore);return function(i,o,l,c,u,h,f){let g;if(u.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new H(O.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){sp(f,h);const T=[];for(const R of f)T.push(rp(c,i,R));g={arrayValue:{values:T}}}else g=rp(c,i,f)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||sp(f,h),g=ER(l,o,f,h==="in"||h==="not-in");return Ce.create(u,h,g)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function En(t,e,n){const r=e,s=Ca("where",t);return ka._create(s,r,n)}class Iu extends bu{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new Iu(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:Ct.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(s,i){let o=s;const l=i.getFlattenedFilters();for(const c of l)v_(o,c),o=Ql(o,c)}(e._query,n),new Hn(e.firestore,e.converter,Ql(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class xu extends y_{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new xu(e,n)}_apply(e){const n=function(s,i,o){if(s.startAt!==null)throw new H(O.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new H(O.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new si(i,o)}(e._query,this._field,this._direction);return new Hn(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new as(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,n))}}function __(t,e="asc"){const n=e,r=Ca("orderBy",t);return xu._create(r,n)}function rp(t,e,n){if(typeof(n=ye(n))=="string"){if(n==="")throw new H(O.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!gy(e)&&n.indexOf("/")!==-1)throw new H(O.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(me.fromString(n));if(!K.isDocumentKey(r))throw new H(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return _f(t,new K(r))}if(n instanceof nt)return _f(t,n._key);throw new H(O.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ba(n)}.`)}function sp(t,e){if(!Array.isArray(t)||t.length===0)throw new H(O.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function v_(t,e){const n=function(s,i){for(const o of s)for(const l of o.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new H(O.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new H(O.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class xR{convertValue(e,n="none"){switch(Ln(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Se(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Mn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw X()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Wn(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){var n,r,s;const i=(s=(r=(n=e.fields)===null||n===void 0?void 0:n[Uo].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>Se(o.doubleValue));return new _u(i)}convertGeoPoint(e){return new yu(Se(e.latitude),Se(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=fa(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(ti(e));default:return null}}convertTimestamp(e){const n=On(e);return new Te(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=me.fromString(e);ce(jy(r));const s=new ni(r.get(1),r.get(3)),i=new K(r.popFirst(5));return s.isEqual(n)||rn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function w_(t,e,n){let r;return r=t?t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class T_ extends m_{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new bo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Ca("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class bo extends T_{data(e={}){return super.data(e)}}class E_{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new Os(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new bo(this._firestore,this._userDataWriter,r.key,r,new Os(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new H(O.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(l=>{const c=new bo(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Os(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const c=new bo(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Os(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let u=-1,h=-1;return l.type!==0&&(u=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),h=o.indexOf(l.doc.key)),{type:AR(l.type),doc:c,oldIndex:u,newIndex:h}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function AR(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return X()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function li(t){t=dt(t,nt);const e=dt(t.firestore,on);return hR(xa(e),t._key).then(n=>x_(e,t,n))}class Au extends xR{constructor(e){super(),this.firestore=e}convertBytes(e){return new Zr(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new nt(this.firestore,null,n)}}function ac(t){t=dt(t,Hn);const e=dt(t.firestore,on),n=xa(e),r=new Au(e);return g_(t._query),dR(n,t._query).then(s=>new E_(e,r,t,s))}function SR(t,e,n){t=dt(t,nt);const r=dt(t.firestore,on),s=w_(t.converter,e);return Na(r,[h_(Ra(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,Et.none())])}function b_(t,e,n,...r){t=dt(t,nt);const s=dt(t.firestore,on),i=Ra(s);let o;return o=typeof(e=ye(e))=="string"||e instanceof Aa?TR(i,"updateDoc",t._key,e,n,r):wR(i,"updateDoc",t._key,e),Na(s,[o.toMutation(t._key,Et.exists(!0))])}function RR(t){return Na(dt(t.firestore,on),[new Xc(t._key,Et.none())])}function I_(t,e){const n=dt(t.firestore,on),r=Dt(t),s=w_(t.converter,e);return Na(n,[h_(Ra(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,Et.exists(!1))]).then(()=>r)}function oo(t,...e){var n,r,s;t=ye(t);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||np(e[o])||(i=e[o],o++);const l={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(np(e[o])){const f=e[o];e[o]=(n=f.next)===null||n===void 0?void 0:n.bind(f),e[o+1]=(r=f.error)===null||r===void 0?void 0:r.bind(f),e[o+2]=(s=f.complete)===null||s===void 0?void 0:s.bind(f)}let c,u,h;if(t instanceof nt)u=dt(t.firestore,on),h=pa(t._key.path),c={next:f=>{e[o]&&e[o](x_(u,t,f))},error:e[o+1],complete:e[o+2]};else{const f=dt(t,Hn);u=dt(f.firestore,on),h=f._query;const g=new Au(u);c={next:_=>{e[o]&&e[o](new E_(u,g,f,_))},error:e[o+1],complete:e[o+2]},g_(t._query)}return function(g,_,T,R){const I=new gu(R),C=new fu(_,I,T);return g.asyncQueue.enqueueAndForget(async()=>uu(await Ho(g),C)),()=>{I.su(),g.asyncQueue.enqueueAndForget(async()=>hu(await Ho(g),C))}}(xa(u),h,l,c)}function Na(t,e){return function(r,s){const i=new en;return r.asyncQueue.enqueueAndForget(async()=>ZS(await uR(r),s,i)),i.promise}(xa(t),e)}function x_(t,e,n){const r=n.docs.get(e._key),s=new Au(t);return new T_(t,s,e._key,r,new Os(n.hasPendingWrites,n.fromCache),e.converter)}function PR(){return new wu("serverTimestamp")}(function(e,n=!0){(function(s){ss=s})(yr),cr(new Dn("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),l=new on(new Ex(r.getProvider("auth-internal")),new xx(o,r.getProvider("app-check-internal")),function(u,h){if(!Object.prototype.hasOwnProperty.apply(u.options,["projectId"]))throw new H(O.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ni(u.options.projectId,h)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),Ot(of,af,e),Ot(of,af,"esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A_="firebasestorage.googleapis.com",S_="storageBucket",CR=2*60*1e3,kR=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be extends zt{constructor(e,n,r=0){super(pl(e),`Firebase Storage: ${n} (${pl(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,be.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return pl(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Ee;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Ee||(Ee={}));function pl(t){return"storage/"+t}function Su(){const t="An unknown error occurred, please check the error payload for server response.";return new be(Ee.UNKNOWN,t)}function NR(t){return new be(Ee.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function DR(t){return new be(Ee.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function VR(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new be(Ee.UNAUTHENTICATED,t)}function OR(){return new be(Ee.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function MR(t){return new be(Ee.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function LR(){return new be(Ee.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function jR(){return new be(Ee.CANCELED,"User canceled the upload/download.")}function UR(t){return new be(Ee.INVALID_URL,"Invalid URL '"+t+"'.")}function FR(t){return new be(Ee.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function BR(){return new be(Ee.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+S_+"' property when initializing the app?")}function $R(){return new be(Ee.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function qR(){return new be(Ee.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function WR(t){return new be(Ee.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function lc(t){return new be(Ee.INVALID_ARGUMENT,t)}function R_(){return new be(Ee.APP_DELETED,"The Firebase app was deleted.")}function zR(t){return new be(Ee.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function qs(t,e){return new be(Ee.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function Rs(t){throw new be(Ee.INTERNAL_ERROR,"Internal error: "+t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=yt.makeFromUrl(e,n)}catch{return new yt(e,"")}if(r.path==="")return r;throw FR(e)}static makeFromUrl(e,n){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(B){B.path.charAt(B.path.length-1)==="/"&&(B.path_=B.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+s+o,"i"),c={bucket:1,path:3};function u(B){B.path_=decodeURIComponent(B.path)}const h="v[A-Za-z0-9_]+",f=n.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",_=new RegExp(`^https?://${f}/${h}/b/${s}/o${g}`,"i"),T={bucket:1,path:3},R=n===A_?"(?:storage.googleapis.com|storage.cloud.google.com)":n,I="([^?#]*)",C=new RegExp(`^https?://${R}/${s}/${I}`,"i"),D=[{regex:l,indices:c,postModify:i},{regex:_,indices:T,postModify:u},{regex:C,indices:{bucket:1,path:2},postModify:u}];for(let B=0;B<D.length;B++){const L=D[B],U=L.regex.exec(e);if(U){const b=U[L.indices.bucket];let v=U[L.indices.path];v||(v=""),r=new yt(b,v),L.postModify(r);break}}if(r==null)throw UR(e);return r}}class HR{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KR(t,e,n){let r=1,s=null,i=null,o=!1,l=0;function c(){return l===2}let u=!1;function h(...I){u||(u=!0,e.apply(null,I))}function f(I){s=setTimeout(()=>{s=null,t(_,c())},I)}function g(){i&&clearTimeout(i)}function _(I,...C){if(u){g();return}if(I){g(),h.call(null,I,...C);return}if(c()||o){g(),h.call(null,I,...C);return}r<64&&(r*=2);let D;l===1?(l=2,D=0):D=(r+Math.random())*1e3,f(D)}let T=!1;function R(I){T||(T=!0,g(),!u&&(s!==null?(I||(l=2),clearTimeout(s),f(0)):I||(l=1)))}return f(0),i=setTimeout(()=>{o=!0,R(!0)},n),R}function GR(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QR(t){return t!==void 0}function XR(t){return typeof t=="object"&&!Array.isArray(t)}function Ru(t){return typeof t=="string"||t instanceof String}function ip(t){return Pu()&&t instanceof Blob}function Pu(){return typeof Blob<"u"}function op(t,e,n,r){if(r<e)throw lc(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw lc(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cu(t,e,n){let r=e;return n==null&&(r=`https://${e}`),`${n}://${r}/v0${t}`}function P_(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const s=e(r)+"="+e(t[r]);n=n+s+"&"}return n=n.slice(0,-1),n}var or;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(or||(or={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YR(t,e){const n=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,i=e.indexOf(t)!==-1;return n||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JR{constructor(e,n,r,s,i,o,l,c,u,h,f,g=!0){this.url_=e,this.method_=n,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=c,this.timeout_=u,this.progressCallback_=h,this.connectionFactory_=f,this.retry=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((_,T)=>{this.resolve_=_,this.reject_=T,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new ao(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=l=>{const c=l.loaded,u=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,u)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const l=i.getErrorCode()===or.NO_ERROR,c=i.getStatus();if(!l||YR(c,this.additionalRetryCodes_)&&this.retry){const h=i.getErrorCode()===or.ABORT;r(!1,new ao(!1,null,h));return}const u=this.successCodes_.indexOf(c)!==-1;r(!0,new ao(u,i))})},n=(r,s)=>{const i=this.resolve_,o=this.reject_,l=s.connection;if(s.wasSuccessCode)try{const c=this.callback_(l,l.getResponse());QR(c)?i(c):i()}catch(c){o(c)}else if(l!==null){const c=Su();c.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,c)):o(c)}else if(s.canceled){const c=this.appDelete_?R_():jR();o(c)}else{const c=LR();o(c)}};this.canceled_?n(!1,new ao(!1,null,!0)):this.backoffId_=KR(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&GR(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class ao{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function ZR(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function eP(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function tP(t,e){e&&(t["X-Firebase-GMPID"]=e)}function nP(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function rP(t,e,n,r,s,i,o=!0){const l=P_(t.urlParams),c=t.url+l,u=Object.assign({},t.headers);return tP(u,e),ZR(u,n),eP(u,i),nP(u,r),new JR(c,t.method,u,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sP(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function iP(...t){const e=sP();if(e!==void 0){const n=new e;for(let r=0;r<t.length;r++)n.append(t[r]);return n.getBlob()}else{if(Pu())return new Blob(t);throw new be(Ee.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function oP(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aP(t){if(typeof atob>"u")throw WR("base-64");return atob(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class ml{constructor(e,n){this.data=e,this.contentType=n||null}}function lP(t,e){switch(t){case Vt.RAW:return new ml(C_(e));case Vt.BASE64:case Vt.BASE64URL:return new ml(k_(t,e));case Vt.DATA_URL:return new ml(uP(e),hP(e))}throw Su()}function C_(t){const e=[];for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{const i=r,o=t.charCodeAt(++n);r=65536|(i&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function cP(t){let e;try{e=decodeURIComponent(t)}catch{throw qs(Vt.DATA_URL,"Malformed data URL.")}return C_(e)}function k_(t,e){switch(t){case Vt.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw qs(t,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Vt.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw qs(t,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=aP(e)}catch(s){throw s.message.includes("polyfill")?s:qs(t,"Invalid character found")}const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}class N_{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw qs(Vt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=n[1]||null;r!=null&&(this.base64=dP(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function uP(t){const e=new N_(t);return e.base64?k_(Vt.BASE64,e.rest):cP(e.rest)}function hP(t){return new N_(t).contentType}function dP(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e,n){let r=0,s="";ip(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,n){if(ip(this.data_)){const r=this.data_,s=oP(r,e,n);return s===null?null:new bn(s)}else{const r=new Uint8Array(this.data_.buffer,e,n-e);return new bn(r,!0)}}static getBlob(...e){if(Pu()){const n=e.map(r=>r instanceof bn?r.data_:r);return new bn(iP.apply(null,n))}else{const n=e.map(o=>Ru(o)?lP(Vt.RAW,o).data:o.data_);let r=0;n.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return n.forEach(o=>{for(let l=0;l<o.length;l++)s[i++]=o[l]}),new bn(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D_(t){let e;try{e=JSON.parse(t)}catch{return null}return XR(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fP(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function pP(t,e){const n=e.split("/").filter(r=>r.length>0).join("/");return t.length===0?n:t+"/"+n}function V_(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mP(t,e){return e}class ot{constructor(e,n,r,s){this.server=e,this.local=n||e,this.writable=!!r,this.xform=s||mP}}let lo=null;function gP(t){return!Ru(t)||t.length<2?t:V_(t)}function O_(){if(lo)return lo;const t=[];t.push(new ot("bucket")),t.push(new ot("generation")),t.push(new ot("metageneration")),t.push(new ot("name","fullPath",!0));function e(i,o){return gP(o)}const n=new ot("name");n.xform=e,t.push(n);function r(i,o){return o!==void 0?Number(o):o}const s=new ot("size");return s.xform=r,t.push(s),t.push(new ot("timeCreated")),t.push(new ot("updated")),t.push(new ot("md5Hash",null,!0)),t.push(new ot("cacheControl",null,!0)),t.push(new ot("contentDisposition",null,!0)),t.push(new ot("contentEncoding",null,!0)),t.push(new ot("contentLanguage",null,!0)),t.push(new ot("contentType",null,!0)),t.push(new ot("metadata","customMetadata",!0)),lo=t,lo}function yP(t,e){function n(){const r=t.bucket,s=t.fullPath,i=new yt(r,s);return e._makeStorageReference(i)}Object.defineProperty(t,"ref",{get:n})}function _P(t,e,n){const r={};r.type="file";const s=n.length;for(let i=0;i<s;i++){const o=n[i];r[o.local]=o.xform(r,e[o.server])}return yP(r,t),r}function M_(t,e,n){const r=D_(e);return r===null?null:_P(t,r,n)}function vP(t,e,n,r){const s=D_(e);if(s===null||!Ru(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(u=>{const h=t.bucket,f=t.fullPath,g="/b/"+o(h)+"/o/"+o(f),_=Cu(g,n,r),T=P_({alt:"media",token:u});return _+T})[0]}function wP(t,e){const n={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(n[i.server]=t[i.local])}return JSON.stringify(n)}class L_{constructor(e,n,r,s){this.url=e,this.method=n,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j_(t){if(!t)throw Su()}function TP(t,e){function n(r,s){const i=M_(t,s,e);return j_(i!==null),i}return n}function EP(t,e){function n(r,s){const i=M_(t,s,e);return j_(i!==null),vP(i,s,t.host,t._protocol)}return n}function U_(t){function e(n,r){let s;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?s=OR():s=VR():n.getStatus()===402?s=DR(t.bucket):n.getStatus()===403?s=MR(t.path):s=r,s.status=n.getStatus(),s.serverResponse=r.serverResponse,s}return e}function bP(t){const e=U_(t);function n(r,s){let i=e(r,s);return r.getStatus()===404&&(i=NR(t.path)),i.serverResponse=s.serverResponse,i}return n}function IP(t,e,n){const r=e.fullServerUrl(),s=Cu(r,t.host,t._protocol),i="GET",o=t.maxOperationRetryTime,l=new L_(s,i,EP(t,n),o);return l.errorHandler=bP(e),l}function xP(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function AP(t,e,n){const r=Object.assign({},n);return r.fullPath=t.path,r.size=e.size(),r.contentType||(r.contentType=xP(null,e)),r}function SP(t,e,n,r,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function l(){let D="";for(let B=0;B<2;B++)D=D+Math.random().toString().slice(2);return D}const c=l();o["Content-Type"]="multipart/related; boundary="+c;const u=AP(e,r,s),h=wP(u,n),f="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+h+`\r
--`+c+`\r
Content-Type: `+u.contentType+`\r
\r
`,g=`\r
--`+c+"--",_=bn.getBlob(f,r,g);if(_===null)throw $R();const T={name:u.fullPath},R=Cu(i,t.host,t._protocol),I="POST",C=t.maxUploadRetryTime,V=new L_(R,I,TP(t,n),C);return V.urlParams=T,V.headers=o,V.body=_.uploadData(),V.errorHandler=U_(e),V}class RP{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=or.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=or.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=or.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,r,s){if(this.sent_)throw Rs("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,e,!0),s!==void 0)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Rs("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Rs("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Rs("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Rs("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class PP extends RP{initXhr(){this.xhr_.responseType="text"}}function F_(){return new PP}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(e,n){this._service=e,n instanceof yt?this._location=n:this._location=yt.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new pr(e,n)}get root(){const e=new yt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return V_(this._location.path)}get storage(){return this._service}get parent(){const e=fP(this._location.path);if(e===null)return null;const n=new yt(this._location.bucket,e);return new pr(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw zR(e)}}function CP(t,e,n){t._throwIfRoot("uploadBytes");const r=SP(t.storage,t._location,O_(),new bn(e,!0),n);return t.storage.makeRequestWithTokens(r,F_).then(s=>({metadata:s,ref:t}))}function kP(t){t._throwIfRoot("getDownloadURL");const e=IP(t.storage,t._location,O_());return t.storage.makeRequestWithTokens(e,F_).then(n=>{if(n===null)throw qR();return n})}function NP(t,e){const n=pP(t._location.path,e),r=new yt(t._location.bucket,n);return new pr(t.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DP(t){return/^[A-Za-z]+:\/\//.test(t)}function VP(t,e){return new pr(t,e)}function B_(t,e){if(t instanceof ku){const n=t;if(n._bucket==null)throw BR();const r=new pr(n,n._bucket);return e!=null?B_(r,e):r}else return e!==void 0?NP(t,e):t}function OP(t,e){if(e&&DP(e)){if(t instanceof ku)return VP(t,e);throw lc("To use ref(service, url), the first argument must be a Storage instance.")}else return B_(t,e)}function ap(t,e){const n=e==null?void 0:e[S_];return n==null?null:yt.makeFromBucketSpec(n,t)}function MP(t,e,n,r={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:s}=r;s&&(t._overrideAuthToken=typeof s=="string"?s:sg(s,t.app.options.projectId))}class ku{constructor(e,n,r,s,i){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=A_,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=CR,this._maxUploadRetryTime=kR,this._requests=new Set,s!=null?this._bucket=yt.makeFromBucketSpec(s,this._host):this._bucket=ap(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=yt.makeFromBucketSpec(this._url,e):this._bucket=ap(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){op("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){op("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(mt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new pr(this,e)}_makeRequest(e,n,r,s,i=!0){if(this._deleted)return new HR(R_());{const o=rP(e,this._appId,r,s,n,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,s).getPromise()}}const lp="@firebase/storage",cp="0.13.7";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $_="storage";function LP(t,e,n){return t=ye(t),CP(t,e,n)}function jP(t){return t=ye(t),kP(t)}function UP(t,e){return t=ye(t),OP(t,e)}function FP(t=Nc(),e){t=ye(t);const r=aa(t,$_).getImmediate({identifier:e}),s=tg("storage");return s&&BP(r,...s),r}function BP(t,e,n,r={}){MP(t,e,n,r)}function $P(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new ku(n,r,s,e,yr)}function qP(){cr(new Dn($_,$P,"PUBLIC").setMultipleInstances(!0)),Ot(lp,cp,""),Ot(lp,cp,"esm2017")}qP();const WP={apiKey:"AIzaSyBMGrCi02KlEzkijxEf8fH6GEZfkKUDbpA",authDomain:"ikpps-cleanify.firebaseapp.com",databaseURL:"https://ikpps-cleanify-default-rtdb.firebaseio.com",projectId:"ikpps-cleanify",storageBucket:"ikpps-cleanify.firebasestorage.app",messagingSenderId:"436494863043",appId:"1:436494863043:web:e0745b0b1a1d6ea202b076",measurementId:"G-XHW7XN0JK3"},Nu=ag(WP),Nn=gx(Nu),Oe=mR(Nu),zP=FP(Nu),q_=S.createContext({currentUser:null}),Du=()=>S.useContext(q_),HP=({children:t})=>{const[e,n]=S.useState(null);return S.useEffect(()=>Fc(Nn,s=>{n(s)}),[]),m.jsx(q_.Provider,{value:{currentUser:e},children:t})},Vu=S.createContext({});function Ou(t){const e=S.useRef(null);return e.current===null&&(e.current=t()),e.current}const Mu=typeof window<"u",W_=Mu?S.useLayoutEffect:S.useEffect,Da=S.createContext(null),Lu=S.createContext({transformPagePoint:t=>t,isStatic:!1,reducedMotion:"never"});class KP extends S.Component{getSnapshotBeforeUpdate(e){const n=this.props.childRef.current;if(n&&e.isPresent&&!this.props.isPresent){const r=n.offsetParent,s=r instanceof HTMLElement&&r.offsetWidth||0,i=this.props.sizeRef.current;i.height=n.offsetHeight||0,i.width=n.offsetWidth||0,i.top=n.offsetTop,i.left=n.offsetLeft,i.right=s-i.width-i.left}return null}componentDidUpdate(){}render(){return this.props.children}}function GP({children:t,isPresent:e,anchorX:n}){const r=S.useId(),s=S.useRef(null),i=S.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:o}=S.useContext(Lu);return S.useInsertionEffect(()=>{const{width:l,height:c,top:u,left:h,right:f}=i.current;if(e||!s.current||!l||!c)return;const g=n==="left"?`left: ${h}`:`right: ${f}`;s.current.dataset.motionPopId=r;const _=document.createElement("style");return o&&(_.nonce=o),document.head.appendChild(_),_.sheet&&_.sheet.insertRule(`
          [data-motion-pop-id="${r}"] {
            position: absolute !important;
            width: ${l}px !important;
            height: ${c}px !important;
            ${g}px !important;
            top: ${u}px !important;
          }
        `),()=>{document.head.removeChild(_)}},[e]),m.jsx(KP,{isPresent:e,childRef:s,sizeRef:i,children:S.cloneElement(t,{ref:s})})}const QP=({children:t,initial:e,isPresent:n,onExitComplete:r,custom:s,presenceAffectsLayout:i,mode:o,anchorX:l})=>{const c=Ou(XP),u=S.useId();let h=!0,f=S.useMemo(()=>(h=!1,{id:u,initial:e,isPresent:n,custom:s,onExitComplete:g=>{c.set(g,!0);for(const _ of c.values())if(!_)return;r&&r()},register:g=>(c.set(g,!1),()=>c.delete(g))}),[n,c,r]);return i&&h&&(f={...f}),S.useMemo(()=>{c.forEach((g,_)=>c.set(_,!1))},[n]),S.useEffect(()=>{!n&&!c.size&&r&&r()},[n]),o==="popLayout"&&(t=m.jsx(GP,{isPresent:n,anchorX:l,children:t})),m.jsx(Da.Provider,{value:f,children:t})};function XP(){return new Map}function z_(t=!0){const e=S.useContext(Da);if(e===null)return[!0,null];const{isPresent:n,onExitComplete:r,register:s}=e,i=S.useId();S.useEffect(()=>{if(t)return s(i)},[t]);const o=S.useCallback(()=>t&&r&&r(i),[i,r,t]);return!n&&r?[!1,o]:[!0]}const co=t=>t.key||"";function up(t){const e=[];return S.Children.forEach(t,n=>{S.isValidElement(n)&&e.push(n)}),e}const Gt=({children:t,custom:e,initial:n=!0,onExitComplete:r,presenceAffectsLayout:s=!0,mode:i="sync",propagate:o=!1,anchorX:l="left"})=>{const[c,u]=z_(o),h=S.useMemo(()=>up(t),[t]),f=o&&!c?[]:h.map(co),g=S.useRef(!0),_=S.useRef(h),T=Ou(()=>new Map),[R,I]=S.useState(h),[C,V]=S.useState(h);W_(()=>{g.current=!1,_.current=h;for(let L=0;L<C.length;L++){const U=co(C[L]);f.includes(U)?T.delete(U):T.get(U)!==!0&&T.set(U,!1)}},[C,f.length,f.join("-")]);const D=[];if(h!==R){let L=[...h];for(let U=0;U<C.length;U++){const b=C[U],v=co(b);f.includes(v)||(L.splice(U,0,b),D.push(b))}return i==="wait"&&D.length&&(L=D),V(up(L)),I(h),null}const{forceRender:B}=S.useContext(Vu);return m.jsx(m.Fragment,{children:C.map(L=>{const U=co(L),b=o&&!c?!1:h===C||f.includes(U),v=()=>{if(T.has(U))T.set(U,!0);else return;let w=!0;T.forEach(x=>{x||(w=!1)}),w&&(B==null||B(),V(_.current),o&&(u==null||u()),r&&r())};return m.jsx(QP,{isPresent:b,initial:!g.current||n?void 0:!1,custom:e,presenceAffectsLayout:s,mode:i,onExitComplete:b?void 0:v,anchorX:l,children:L},U)})})};function ju(t,e){t.indexOf(e)===-1&&t.push(e)}function Uu(t,e){const n=t.indexOf(e);n>-1&&t.splice(n,1)}let H_=()=>{};const cc={useManualTiming:!1};function Fu(t){let e;return()=>(e===void 0&&(e=t()),e)}const bt=t=>t,ci=(t,e,n)=>{const r=e-t;return r===0?1:(n-t)/r};class Bu{constructor(){this.subscriptions=[]}add(e){return ju(this.subscriptions,e),()=>Uu(this.subscriptions,e)}notify(e,n,r){const s=this.subscriptions.length;if(s)if(s===1)this.subscriptions[0](e,n,r);else for(let i=0;i<s;i++){const o=this.subscriptions[i];o&&o(e,n,r)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const Ft=t=>t*1e3,Bt=t=>t/1e3;function K_(t,e){return e?t*(1e3/e):0}const YP=Fu(()=>window.ScrollTimeline!==void 0);class JP{constructor(e){this.stop=()=>this.runAll("stop"),this.animations=e.filter(Boolean)}get finished(){return Promise.all(this.animations.map(e=>e.finished))}getAll(e){return this.animations[0][e]}setAll(e,n){for(let r=0;r<this.animations.length;r++)this.animations[r][e]=n}attachTimeline(e,n){const r=this.animations.map(s=>{if(YP()&&s.attachTimeline)return s.attachTimeline(e);if(typeof n=="function")return n(s)});return()=>{r.forEach((s,i)=>{s&&s(),this.animations[i].stop()})}}get time(){return this.getAll("time")}set time(e){this.setAll("time",e)}get speed(){return this.getAll("speed")}set speed(e){this.setAll("speed",e)}get startTime(){return this.getAll("startTime")}get duration(){let e=0;for(let n=0;n<this.animations.length;n++)e=Math.max(e,this.animations[n].duration);return e}runAll(e){this.animations.forEach(n=>n[e]())}flatten(){this.runAll("flatten")}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}}class ZP extends JP{then(e,n){return this.finished.finally(e).then(()=>{})}}const hp={value:null},$u=t=>Array.isArray(t)&&typeof t[0]=="number",eC={};function tC(t,e){const n=Fu(t);return()=>eC[e]??n()}const ui=tC(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),G_=(t,e,n=10)=>{let r="";const s=Math.max(Math.round(e/n),2);for(let i=0;i<s;i++)r+=t(i/(s-1))+", ";return`linear(${r.substring(0,r.length-2)})`},Ms=([t,e,n,r])=>`cubic-bezier(${t}, ${e}, ${n}, ${r})`,uc={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Ms([0,.65,.55,1]),circOut:Ms([.55,0,1,.45]),backIn:Ms([.31,.01,.66,-.59]),backOut:Ms([.33,1.53,.69,.99])};function Q_(t,e){if(t)return typeof t=="function"&&ui()?G_(t,e):$u(t)?Ms(t):Array.isArray(t)?t.map(n=>Q_(n,e)||uc.easeOut):uc[t]}function nC(t,e,n,{delay:r=0,duration:s=300,repeat:i=0,repeatType:o="loop",ease:l="easeInOut",times:c}={},u=void 0){const h={[e]:n};c&&(h.offset=c);const f=Q_(l,s);return Array.isArray(f)&&(h.easing=f),t.animate(h,{delay:r,duration:s,easing:Array.isArray(f)?"linear":f,fill:"both",iterations:i+1,direction:o==="reverse"?"alternate":"normal",pseudoElement:u})}function qu(t){return typeof t=="function"&&"applyToOptions"in t}function Wu(t,e){return(t==null?void 0:t[e])??(t==null?void 0:t.default)??t}const Go=2e4;function zu(t){let e=0;const n=50;let r=t.next(e);for(;!r.done&&e<Go;)e+=n,r=t.next(e);return e>=Go?1/0:e}function rC(t,e=100,n){const r=n({...t,keyframes:[0,e]}),s=Math.min(zu(r),Go);return{type:"keyframes",ease:i=>r.next(s*i).value/e,duration:Bt(s)}}function X_(t){return!!(typeof t=="function"&&ui()||!t||typeof t=="string"&&(t in uc||ui())||$u(t)||Array.isArray(t)&&t.every(X_))}function dp(t,e){t.timeline=e,t.onfinish=null}const uo=["read","resolveKeyframes","update","preRender","render","postRender"];function sC(t,e){let n=new Set,r=new Set,s=!1,i=!1;const o=new WeakSet;let l={delta:0,timestamp:0,isProcessing:!1},c=0;function u(f){o.has(f)&&(h.schedule(f),t()),c++,f(l)}const h={schedule:(f,g=!1,_=!1)=>{const R=_&&s?n:r;return g&&o.add(f),R.has(f)||R.add(f),f},cancel:f=>{r.delete(f),o.delete(f)},process:f=>{if(l=f,s){i=!0;return}s=!0,[n,r]=[r,n],n.forEach(u),e&&hp.value&&hp.value.frameloop[e].push(c),c=0,n.clear(),s=!1,i&&(i=!1,h.process(f))}};return h}const iC=40;function Y_(t,e){let n=!1,r=!0;const s={delta:0,timestamp:0,isProcessing:!1},i=()=>n=!0,o=uo.reduce((C,V)=>(C[V]=sC(i,e?V:void 0),C),{}),{read:l,resolveKeyframes:c,update:u,preRender:h,render:f,postRender:g}=o,_=()=>{const C=performance.now();n=!1,s.delta=r?1e3/60:Math.max(Math.min(C-s.timestamp,iC),1),s.timestamp=C,s.isProcessing=!0,l.process(s),c.process(s),u.process(s),h.process(s),f.process(s),g.process(s),s.isProcessing=!1,n&&e&&(r=!1,t(_))},T=()=>{n=!0,r=!0,s.isProcessing||t(_)};return{schedule:uo.reduce((C,V)=>{const D=o[V];return C[V]=(B,L=!1,U=!1)=>(n||T(),D.schedule(B,L,U)),C},{}),cancel:C=>{for(let V=0;V<uo.length;V++)o[uo[V]].cancel(C)},state:s,steps:o}}const{schedule:Hu}=Y_(queueMicrotask,!1),{schedule:de,cancel:Fn,state:Be,steps:gl}=Y_(typeof requestAnimationFrame<"u"?requestAnimationFrame:bt,!0);let Io;function oC(){Io=void 0}const $t={now:()=>(Io===void 0&&$t.set(Be.isProcessing||cc.useManualTiming?Be.timestamp:performance.now()),Io),set:t=>{Io=t,queueMicrotask(oC)}},At={x:!1,y:!1};function J_(){return At.x||At.y}function aC(t){return t==="x"||t==="y"?At[t]?null:(At[t]=!0,()=>{At[t]=!1}):At.x||At.y?null:(At.x=At.y=!0,()=>{At.x=At.y=!1})}function lC(t,e,n){if(t instanceof EventTarget)return[t];if(typeof t=="string"){let r=document;const s=(n==null?void 0:n[t])??r.querySelectorAll(t);return s?Array.from(s):[]}return Array.from(t)}function Z_(t,e){const n=lC(t),r=new AbortController,s={passive:!0,...e,signal:r.signal};return[n,s,()=>r.abort()]}function fp(t){return!(t.pointerType==="touch"||J_())}function cC(t,e,n={}){const[r,s,i]=Z_(t,n),o=l=>{if(!fp(l))return;const{target:c}=l,u=e(c,l);if(typeof u!="function"||!c)return;const h=f=>{fp(f)&&(u(f),c.removeEventListener("pointerleave",h))};c.addEventListener("pointerleave",h,s)};return r.forEach(l=>{l.addEventListener("pointerenter",o,s)}),i}const ev=(t,e)=>e?t===e?!0:ev(t,e.parentElement):!1,Ku=t=>t.pointerType==="mouse"?typeof t.button!="number"||t.button<=0:t.isPrimary!==!1,uC=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function hC(t){return uC.has(t.tagName)||t.tabIndex!==-1}const Ls=new WeakSet;function pp(t){return e=>{e.key==="Enter"&&t(e)}}function yl(t,e){t.dispatchEvent(new PointerEvent("pointer"+e,{isPrimary:!0,bubbles:!0}))}const dC=(t,e)=>{const n=t.currentTarget;if(!n)return;const r=pp(()=>{if(Ls.has(n))return;yl(n,"down");const s=pp(()=>{yl(n,"up")}),i=()=>yl(n,"cancel");n.addEventListener("keyup",s,e),n.addEventListener("blur",i,e)});n.addEventListener("keydown",r,e),n.addEventListener("blur",()=>n.removeEventListener("keydown",r),e)};function mp(t){return Ku(t)&&!J_()}function fC(t,e,n={}){const[r,s,i]=Z_(t,n),o=l=>{const c=l.currentTarget;if(!mp(l)||Ls.has(c))return;Ls.add(c);const u=e(c,l),h=(_,T)=>{window.removeEventListener("pointerup",f),window.removeEventListener("pointercancel",g),!(!mp(_)||!Ls.has(c))&&(Ls.delete(c),typeof u=="function"&&u(_,{success:T}))},f=_=>{h(_,c===window||c===document||n.useGlobalTarget||ev(c,_.target))},g=_=>{h(_,!1)};window.addEventListener("pointerup",f,s),window.addEventListener("pointercancel",g,s)};return r.forEach(l=>{(n.useGlobalTarget?window:l).addEventListener("pointerdown",o,s),l instanceof HTMLElement&&(l.addEventListener("focus",u=>dC(u,s)),!hC(l)&&!l.hasAttribute("tabindex")&&(l.tabIndex=0))}),i}const gp=30,pC=t=>!isNaN(parseFloat(t));class mC{constructor(e,n={}){this.version="12.7.4",this.canTrackVelocity=null,this.events={},this.updateAndNotify=(r,s=!0)=>{const i=$t.now();this.updatedAt!==i&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(r),this.current!==this.prev&&this.events.change&&this.events.change.notify(this.current),s&&this.events.renderRequest&&this.events.renderRequest.notify(this.current)},this.hasAnimated=!1,this.setCurrent(e),this.owner=n.owner}setCurrent(e){this.current=e,this.updatedAt=$t.now(),this.canTrackVelocity===null&&e!==void 0&&(this.canTrackVelocity=pC(this.current))}setPrevFrameValue(e=this.current){this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt}onChange(e){return this.on("change",e)}on(e,n){this.events[e]||(this.events[e]=new Bu);const r=this.events[e].add(n);return e==="change"?()=>{r(),de.read(()=>{this.events.change.getSize()||this.stop()})}:r}clearListeners(){for(const e in this.events)this.events[e].clear()}attach(e,n){this.passiveEffect=e,this.stopPassiveEffect=n}set(e,n=!0){!n||!this.passiveEffect?this.updateAndNotify(e,n):this.passiveEffect(e,this.updateAndNotify)}setWithVelocity(e,n,r){this.set(n),this.prev=void 0,this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt-r}jump(e,n=!0){this.updateAndNotify(e),this.prev=e,this.prevUpdatedAt=this.prevFrameValue=void 0,n&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const e=$t.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||e-this.updatedAt>gp)return 0;const n=Math.min(this.updatedAt-this.prevUpdatedAt,gp);return K_(parseFloat(this.current)-parseFloat(this.prevFrameValue),n)}start(e){return this.stop(),new Promise(n=>{this.hasAnimated=!0,this.animation=e(n),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function hi(t,e){return new mC(t,e)}const tv=S.createContext({strict:!1}),yp={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},es={};for(const t in yp)es[t]={isEnabled:e=>yp[t].some(n=>!!e[n])};function gC(t){for(const e in t)es[e]={...es[e],...t[e]}}const yC=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function Qo(t){return t.startsWith("while")||t.startsWith("drag")&&t!=="draggable"||t.startsWith("layout")||t.startsWith("onTap")||t.startsWith("onPan")||t.startsWith("onLayout")||yC.has(t)}let nv=t=>!Qo(t);function _C(t){t&&(nv=e=>e.startsWith("on")?!Qo(e):t(e))}try{_C(require("@emotion/is-prop-valid").default)}catch{}function vC(t,e,n){const r={};for(const s in t)s==="values"&&typeof t.values=="object"||(nv(s)||n===!0&&Qo(s)||!e&&!Qo(s)||t.draggable&&s.startsWith("onDrag"))&&(r[s]=t[s]);return r}function wC(t){if(typeof Proxy>"u")return t;const e=new Map,n=(...r)=>t(...r);return new Proxy(n,{get:(r,s)=>s==="create"?t:(e.has(s)||e.set(s,t(s)),e.get(s))})}const Va=S.createContext({});function Oa(t){return t!==null&&typeof t=="object"&&typeof t.start=="function"}function di(t){return typeof t=="string"||Array.isArray(t)}const Gu=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Qu=["initial",...Gu];function Ma(t){return Oa(t.animate)||Qu.some(e=>di(t[e]))}function rv(t){return!!(Ma(t)||t.variants)}function TC(t,e){if(Ma(t)){const{initial:n,animate:r}=t;return{initial:n===!1||di(n)?n:void 0,animate:di(r)?r:void 0}}return t.inherit!==!1?e:{}}function EC(t){const{initial:e,animate:n}=TC(t,S.useContext(Va));return S.useMemo(()=>({initial:e,animate:n}),[_p(e),_p(n)])}function _p(t){return Array.isArray(t)?t.join(" "):t}const bC=Symbol.for("motionComponentSymbol");function jr(t){return t&&typeof t=="object"&&Object.prototype.hasOwnProperty.call(t,"current")}function IC(t,e,n){return S.useCallback(r=>{r&&t.onMount&&t.onMount(r),e&&(r?e.mount(r):e.unmount()),n&&(typeof n=="function"?n(r):jr(n)&&(n.current=r))},[e])}const Xu=t=>t.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase(),xC="framerAppearId",sv="data-"+Xu(xC),iv=S.createContext({});function AC(t,e,n,r,s){var R,I;const{visualElement:i}=S.useContext(Va),o=S.useContext(tv),l=S.useContext(Da),c=S.useContext(Lu).reducedMotion,u=S.useRef(null);r=r||o.renderer,!u.current&&r&&(u.current=r(t,{visualState:e,parent:i,props:n,presenceContext:l,blockInitialAnimation:l?l.initial===!1:!1,reducedMotionConfig:c}));const h=u.current,f=S.useContext(iv);h&&!h.projection&&s&&(h.type==="html"||h.type==="svg")&&SC(u.current,n,s,f);const g=S.useRef(!1);S.useInsertionEffect(()=>{h&&g.current&&h.update(n,l)});const _=n[sv],T=S.useRef(!!_&&!((R=window.MotionHandoffIsComplete)!=null&&R.call(window,_))&&((I=window.MotionHasOptimisedAnimation)==null?void 0:I.call(window,_)));return W_(()=>{h&&(g.current=!0,window.MotionIsMounted=!0,h.updateFeatures(),Hu.render(h.render),T.current&&h.animationState&&h.animationState.animateChanges())}),S.useEffect(()=>{h&&(!T.current&&h.animationState&&h.animationState.animateChanges(),T.current&&(queueMicrotask(()=>{var C;(C=window.MotionHandoffMarkAsComplete)==null||C.call(window,_)}),T.current=!1))}),h}function SC(t,e,n,r){const{layoutId:s,layout:i,drag:o,dragConstraints:l,layoutScroll:c,layoutRoot:u,layoutCrossfade:h}=e;t.projection=new n(t.latestValues,e["data-framer-portal-id"]?void 0:ov(t.parent)),t.projection.setOptions({layoutId:s,layout:i,alwaysMeasureLayout:!!o||l&&jr(l),visualElement:t,animationType:typeof i=="string"?i:"both",initialPromotionConfig:r,crossfade:h,layoutScroll:c,layoutRoot:u})}function ov(t){if(t)return t.options.allowProjection!==!1?t.projection:ov(t.parent)}function RC({preloadedFeatures:t,createVisualElement:e,useRender:n,useVisualState:r,Component:s}){t&&gC(t);function i(l,c){let u;const h={...S.useContext(Lu),...l,layoutId:PC(l)},{isStatic:f}=h,g=EC(l),_=r(l,f);if(!f&&Mu){CC();const T=kC(h);u=T.MeasureLayout,g.visualElement=AC(s,_,h,e,T.ProjectionNode)}return m.jsxs(Va.Provider,{value:g,children:[u&&g.visualElement?m.jsx(u,{visualElement:g.visualElement,...h}):null,n(s,l,IC(_,g.visualElement,c),_,f,g.visualElement)]})}i.displayName=`motion.${typeof s=="string"?s:`create(${s.displayName??s.name??""})`}`;const o=S.forwardRef(i);return o[bC]=s,o}function PC({layoutId:t}){const e=S.useContext(Vu).id;return e&&t!==void 0?e+"-"+t:t}function CC(t,e){S.useContext(tv).strict}function kC(t){const{drag:e,layout:n}=es;if(!e&&!n)return{};const r={...e,...n};return{MeasureLayout:e!=null&&e.isEnabled(t)||n!=null&&n.isEnabled(t)?r.MeasureLayout:void 0,ProjectionNode:r.ProjectionNode}}const av=t=>e=>typeof e=="string"&&e.startsWith(t),Yu=av("--"),NC=av("var(--"),Ju=t=>NC(t)?DC.test(t.split("/*")[0].trim()):!1,DC=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,fi={};function VC(t){for(const e in t)fi[e]=t[e],Yu(e)&&(fi[e].isCSSVariable=!0)}const cs=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Tr=new Set(cs);function lv(t,{layout:e,layoutId:n}){return Tr.has(t)||t.startsWith("origin")||(e||n!==void 0)&&(!!fi[t]||t==="opacity")}const tt=t=>!!(t&&t.getVelocity),cv=(t,e)=>e&&typeof t=="number"?e.transform(t):t,an=(t,e,n)=>n>e?e:n<t?t:n,us={test:t=>typeof t=="number",parse:parseFloat,transform:t=>t},pi={...us,transform:t=>an(0,1,t)},ho={...us,default:1},Ci=t=>({test:e=>typeof e=="string"&&e.endsWith(t)&&e.split(" ").length===1,parse:parseFloat,transform:e=>`${e}${t}`}),yn=Ci("deg"),qt=Ci("%"),G=Ci("px"),OC=Ci("vh"),MC=Ci("vw"),vp={...qt,parse:t=>qt.parse(t)/100,transform:t=>qt.transform(t*100)},LC={borderWidth:G,borderTopWidth:G,borderRightWidth:G,borderBottomWidth:G,borderLeftWidth:G,borderRadius:G,radius:G,borderTopLeftRadius:G,borderTopRightRadius:G,borderBottomRightRadius:G,borderBottomLeftRadius:G,width:G,maxWidth:G,height:G,maxHeight:G,top:G,right:G,bottom:G,left:G,padding:G,paddingTop:G,paddingRight:G,paddingBottom:G,paddingLeft:G,margin:G,marginTop:G,marginRight:G,marginBottom:G,marginLeft:G,backgroundPositionX:G,backgroundPositionY:G},jC={rotate:yn,rotateX:yn,rotateY:yn,rotateZ:yn,scale:ho,scaleX:ho,scaleY:ho,scaleZ:ho,skew:yn,skewX:yn,skewY:yn,distance:G,translateX:G,translateY:G,translateZ:G,x:G,y:G,z:G,perspective:G,transformPerspective:G,opacity:pi,originX:vp,originY:vp,originZ:G},wp={...us,transform:Math.round},Zu={...LC,...jC,zIndex:wp,size:G,fillOpacity:pi,strokeOpacity:pi,numOctaves:wp},UC={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},FC=cs.length;function BC(t,e,n){let r="",s=!0;for(let i=0;i<FC;i++){const o=cs[i],l=t[o];if(l===void 0)continue;let c=!0;if(typeof l=="number"?c=l===(o.startsWith("scale")?1:0):c=parseFloat(l)===0,!c||n){const u=cv(l,Zu[o]);if(!c){s=!1;const h=UC[o]||o;r+=`${h}(${u}) `}n&&(e[o]=u)}}return r=r.trim(),n?r=n(e,s?"":r):s&&(r="none"),r}function eh(t,e,n){const{style:r,vars:s,transformOrigin:i}=t;let o=!1,l=!1;for(const c in e){const u=e[c];if(Tr.has(c)){o=!0;continue}else if(Yu(c)){s[c]=u;continue}else{const h=cv(u,Zu[c]);c.startsWith("origin")?(l=!0,i[c]=h):r[c]=h}}if(e.transform||(o||n?r.transform=BC(e,t.transform,n):r.transform&&(r.transform="none")),l){const{originX:c="50%",originY:u="50%",originZ:h=0}=i;r.transformOrigin=`${c} ${u} ${h}`}}const th=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function uv(t,e,n){for(const r in e)!tt(e[r])&&!lv(r,n)&&(t[r]=e[r])}function $C({transformTemplate:t},e){return S.useMemo(()=>{const n=th();return eh(n,e,t),Object.assign({},n.vars,n.style)},[e])}function qC(t,e){const n=t.style||{},r={};return uv(r,n,t),Object.assign(r,$C(t,e)),r}function WC(t,e){const n={},r=qC(t,e);return t.drag&&t.dragListener!==!1&&(n.draggable=!1,r.userSelect=r.WebkitUserSelect=r.WebkitTouchCallout="none",r.touchAction=t.drag===!0?"none":`pan-${t.drag==="x"?"y":"x"}`),t.tabIndex===void 0&&(t.onTap||t.onTapStart||t.whileTap)&&(n.tabIndex=0),n.style=r,n}const zC=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function nh(t){return typeof t!="string"||t.includes("-")?!1:!!(zC.indexOf(t)>-1||/[A-Z]/u.test(t))}const HC={offset:"stroke-dashoffset",array:"stroke-dasharray"},KC={offset:"strokeDashoffset",array:"strokeDasharray"};function GC(t,e,n=1,r=0,s=!0){t.pathLength=1;const i=s?HC:KC;t[i.offset]=G.transform(-r);const o=G.transform(e),l=G.transform(n);t[i.array]=`${o} ${l}`}function Tp(t,e,n){return typeof t=="string"?t:G.transform(e+n*t)}function QC(t,e,n){const r=Tp(e,t.x,t.width),s=Tp(n,t.y,t.height);return`${r} ${s}`}function rh(t,{attrX:e,attrY:n,attrScale:r,originX:s,originY:i,pathLength:o,pathSpacing:l=1,pathOffset:c=0,...u},h,f){if(eh(t,u,f),h){t.style.viewBox&&(t.attrs.viewBox=t.style.viewBox);return}t.attrs=t.style,t.style={};const{attrs:g,style:_,dimensions:T}=t;g.transform&&(T&&(_.transform=g.transform),delete g.transform),T&&(s!==void 0||i!==void 0||_.transform)&&(_.transformOrigin=QC(T,s!==void 0?s:.5,i!==void 0?i:.5)),e!==void 0&&(g.x=e),n!==void 0&&(g.y=n),r!==void 0&&(g.scale=r),o!==void 0&&GC(g,o,l,c,!1)}const hv=()=>({...th(),attrs:{}}),sh=t=>typeof t=="string"&&t.toLowerCase()==="svg";function XC(t,e,n,r){const s=S.useMemo(()=>{const i=hv();return rh(i,e,sh(r),t.transformTemplate),{...i.attrs,style:{...i.style}}},[e]);if(t.style){const i={};uv(i,t.style,t),s.style={...i,...s.style}}return s}function YC(t=!1){return(n,r,s,{latestValues:i},o)=>{const c=(nh(n)?XC:WC)(r,i,o,n),u=vC(r,typeof n=="string",t),h=n!==S.Fragment?{...u,...c,ref:s}:{},{children:f}=r,g=S.useMemo(()=>tt(f)?f.get():f,[f]);return S.createElement(n,{...h,children:g})}}function Ep(t){const e=[{},{}];return t==null||t.values.forEach((n,r)=>{e[0][r]=n.get(),e[1][r]=n.getVelocity()}),e}function ih(t,e,n,r){if(typeof e=="function"){const[s,i]=Ep(r);e=e(n!==void 0?n:t.custom,s,i)}if(typeof e=="string"&&(e=t.variants&&t.variants[e]),typeof e=="function"){const[s,i]=Ep(r);e=e(n!==void 0?n:t.custom,s,i)}return e}const hc=t=>Array.isArray(t),JC=t=>!!(t&&typeof t=="object"&&t.mix&&t.toValue),ZC=t=>hc(t)?t[t.length-1]||0:t;function xo(t){const e=tt(t)?t.get():t;return JC(e)?e.toValue():e}function ek({scrapeMotionValuesFromProps:t,createRenderState:e,onUpdate:n},r,s,i){const o={latestValues:tk(r,s,i,t),renderState:e()};return n&&(o.onMount=l=>n({props:r,current:l,...o}),o.onUpdate=l=>n(l)),o}const dv=t=>(e,n)=>{const r=S.useContext(Va),s=S.useContext(Da),i=()=>ek(t,e,r,s);return n?i():Ou(i)};function tk(t,e,n,r){const s={},i=r(t,{});for(const g in i)s[g]=xo(i[g]);let{initial:o,animate:l}=t;const c=Ma(t),u=rv(t);e&&u&&!c&&t.inherit!==!1&&(o===void 0&&(o=e.initial),l===void 0&&(l=e.animate));let h=n?n.initial===!1:!1;h=h||o===!1;const f=h?l:o;if(f&&typeof f!="boolean"&&!Oa(f)){const g=Array.isArray(f)?f:[f];for(let _=0;_<g.length;_++){const T=ih(t,g[_]);if(T){const{transitionEnd:R,transition:I,...C}=T;for(const V in C){let D=C[V];if(Array.isArray(D)){const B=h?D.length-1:0;D=D[B]}D!==null&&(s[V]=D)}for(const V in R)s[V]=R[V]}}}return s}function oh(t,e,n){var i;const{style:r}=t,s={};for(const o in r)(tt(r[o])||e.style&&tt(e.style[o])||lv(o,t)||((i=n==null?void 0:n.getValue(o))==null?void 0:i.liveStyle)!==void 0)&&(s[o]=r[o]);return s}const nk={useVisualState:dv({scrapeMotionValuesFromProps:oh,createRenderState:th})};function fv(t,e){try{e.dimensions=typeof t.getBBox=="function"?t.getBBox():t.getBoundingClientRect()}catch{e.dimensions={x:0,y:0,width:0,height:0}}}function pv(t,{style:e,vars:n},r,s){Object.assign(t.style,e,s&&s.getProjectionStyles(r));for(const i in n)t.style.setProperty(i,n[i])}const mv=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);function gv(t,e,n,r){pv(t,e,void 0,r);for(const s in e.attrs)t.setAttribute(mv.has(s)?s:Xu(s),e.attrs[s])}function yv(t,e,n){const r=oh(t,e,n);for(const s in t)if(tt(t[s])||tt(e[s])){const i=cs.indexOf(s)!==-1?"attr"+s.charAt(0).toUpperCase()+s.substring(1):s;r[i]=t[s]}return r}const bp=["x","y","width","height","cx","cy","r"],rk={useVisualState:dv({scrapeMotionValuesFromProps:yv,createRenderState:hv,onUpdate:({props:t,prevProps:e,current:n,renderState:r,latestValues:s})=>{if(!n)return;let i=!!t.drag;if(!i){for(const l in s)if(Tr.has(l)){i=!0;break}}if(!i)return;let o=!e;if(e)for(let l=0;l<bp.length;l++){const c=bp[l];t[c]!==e[c]&&(o=!0)}o&&de.read(()=>{fv(n,r),de.render(()=>{rh(r,s,sh(n.tagName),t.transformTemplate),gv(n,r)})})}})};function sk(t,e){return function(r,{forwardMotionProps:s}={forwardMotionProps:!1}){const o={...nh(r)?rk:nk,preloadedFeatures:t,useRender:YC(s),createVisualElement:e,Component:r};return RC(o)}}function mi(t,e,n){const r=t.getProps();return ih(r,e,n!==void 0?n:r.custom,t)}const _v=new Set(["width","height","top","left","right","bottom",...cs]);function ik(t,e,n){t.hasValue(e)?t.getValue(e).set(n):t.addValue(e,hi(n))}function ok(t,e){const n=mi(t,e);let{transitionEnd:r={},transition:s={},...i}=n||{};i={...i,...r};for(const o in i){const l=ZC(i[o]);ik(t,o,l)}}function ak(t){return!!(tt(t)&&t.add)}function dc(t,e){const n=t.getValue("willChange");if(ak(n))return n.add(e);if(!n&&cc.WillChange){const r=new cc.WillChange("auto");t.addValue("willChange",r),r.add(e)}}function vv(t){return t.props[sv]}const wv=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t,lk=1e-7,ck=12;function uk(t,e,n,r,s){let i,o,l=0;do o=e+(n-e)/2,i=wv(o,r,s)-t,i>0?n=o:e=o;while(Math.abs(i)>lk&&++l<ck);return o}function ki(t,e,n,r){if(t===e&&n===r)return bt;const s=i=>uk(i,0,1,t,n);return i=>i===0||i===1?i:wv(s(i),e,r)}const Tv=t=>e=>e<=.5?t(2*e)/2:(2-t(2*(1-e)))/2,Ev=t=>e=>1-t(1-e),bv=ki(.33,1.53,.69,.99),ah=Ev(bv),Iv=Tv(ah),xv=t=>(t*=2)<1?.5*ah(t):.5*(2-Math.pow(2,-10*(t-1))),lh=t=>1-Math.sin(Math.acos(t)),Av=Ev(lh),Sv=Tv(lh),Rv=t=>/^0[^.\s]+$/u.test(t);function hk(t){return typeof t=="number"?t===0:t!==null?t==="none"||t==="0"||Rv(t):!0}const Ws=t=>Math.round(t*1e5)/1e5,ch=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function dk(t){return t==null}const fk=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,uh=(t,e)=>n=>!!(typeof n=="string"&&fk.test(n)&&n.startsWith(t)||e&&!dk(n)&&Object.prototype.hasOwnProperty.call(n,e)),Pv=(t,e,n)=>r=>{if(typeof r!="string")return r;const[s,i,o,l]=r.match(ch);return{[t]:parseFloat(s),[e]:parseFloat(i),[n]:parseFloat(o),alpha:l!==void 0?parseFloat(l):1}},pk=t=>an(0,255,t),_l={...us,transform:t=>Math.round(pk(t))},sr={test:uh("rgb","red"),parse:Pv("red","green","blue"),transform:({red:t,green:e,blue:n,alpha:r=1})=>"rgba("+_l.transform(t)+", "+_l.transform(e)+", "+_l.transform(n)+", "+Ws(pi.transform(r))+")"};function mk(t){let e="",n="",r="",s="";return t.length>5?(e=t.substring(1,3),n=t.substring(3,5),r=t.substring(5,7),s=t.substring(7,9)):(e=t.substring(1,2),n=t.substring(2,3),r=t.substring(3,4),s=t.substring(4,5),e+=e,n+=n,r+=r,s+=s),{red:parseInt(e,16),green:parseInt(n,16),blue:parseInt(r,16),alpha:s?parseInt(s,16)/255:1}}const fc={test:uh("#"),parse:mk,transform:sr.transform},Ur={test:uh("hsl","hue"),parse:Pv("hue","saturation","lightness"),transform:({hue:t,saturation:e,lightness:n,alpha:r=1})=>"hsla("+Math.round(t)+", "+qt.transform(Ws(e))+", "+qt.transform(Ws(n))+", "+Ws(pi.transform(r))+")"},Je={test:t=>sr.test(t)||fc.test(t)||Ur.test(t),parse:t=>sr.test(t)?sr.parse(t):Ur.test(t)?Ur.parse(t):fc.parse(t),transform:t=>typeof t=="string"?t:t.hasOwnProperty("red")?sr.transform(t):Ur.transform(t)},gk=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function yk(t){var e,n;return isNaN(t)&&typeof t=="string"&&(((e=t.match(ch))==null?void 0:e.length)||0)+(((n=t.match(gk))==null?void 0:n.length)||0)>0}const Cv="number",kv="color",_k="var",vk="var(",Ip="${}",wk=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function gi(t){const e=t.toString(),n=[],r={color:[],number:[],var:[]},s=[];let i=0;const l=e.replace(wk,c=>(Je.test(c)?(r.color.push(i),s.push(kv),n.push(Je.parse(c))):c.startsWith(vk)?(r.var.push(i),s.push(_k),n.push(c)):(r.number.push(i),s.push(Cv),n.push(parseFloat(c))),++i,Ip)).split(Ip);return{values:n,split:l,indexes:r,types:s}}function Nv(t){return gi(t).values}function Dv(t){const{split:e,types:n}=gi(t),r=e.length;return s=>{let i="";for(let o=0;o<r;o++)if(i+=e[o],s[o]!==void 0){const l=n[o];l===Cv?i+=Ws(s[o]):l===kv?i+=Je.transform(s[o]):i+=s[o]}return i}}const Tk=t=>typeof t=="number"?0:t;function Ek(t){const e=Nv(t);return Dv(t)(e.map(Tk))}const Bn={test:yk,parse:Nv,createTransformer:Dv,getAnimatableNone:Ek},bk=new Set(["brightness","contrast","saturate","opacity"]);function Ik(t){const[e,n]=t.slice(0,-1).split("(");if(e==="drop-shadow")return t;const[r]=n.match(ch)||[];if(!r)return t;const s=n.replace(r,"");let i=bk.has(e)?1:0;return r!==n&&(i*=100),e+"("+i+s+")"}const xk=/\b([a-z-]*)\(.*?\)/gu,pc={...Bn,getAnimatableNone:t=>{const e=t.match(xk);return e?e.map(Ik).join(" "):t}},Ak={...Zu,color:Je,backgroundColor:Je,outlineColor:Je,fill:Je,stroke:Je,borderColor:Je,borderTopColor:Je,borderRightColor:Je,borderBottomColor:Je,borderLeftColor:Je,filter:pc,WebkitFilter:pc},Vv=t=>Ak[t];function Ov(t,e){let n=Vv(t);return n!==pc&&(n=Bn),n.getAnimatableNone?n.getAnimatableNone(e):void 0}const Sk=new Set(["auto","none","0"]);function Rk(t,e,n){let r=0,s;for(;r<t.length&&!s;){const i=t[r];typeof i=="string"&&!Sk.has(i)&&gi(i).values.length&&(s=t[r]),r++}if(s&&n)for(const i of e)t[i]=Ov(n,s)}const ir=t=>t*180/Math.PI,mc=t=>{const e=ir(Math.atan2(t[1],t[0]));return gc(e)},Pk={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:t=>(Math.abs(t[0])+Math.abs(t[3]))/2,rotate:mc,rotateZ:mc,skewX:t=>ir(Math.atan(t[1])),skewY:t=>ir(Math.atan(t[2])),skew:t=>(Math.abs(t[1])+Math.abs(t[2]))/2},gc=t=>(t=t%360,t<0&&(t+=360),t),xp=mc,Ap=t=>Math.sqrt(t[0]*t[0]+t[1]*t[1]),Sp=t=>Math.sqrt(t[4]*t[4]+t[5]*t[5]),Ck={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:Ap,scaleY:Sp,scale:t=>(Ap(t)+Sp(t))/2,rotateX:t=>gc(ir(Math.atan2(t[6],t[5]))),rotateY:t=>gc(ir(Math.atan2(-t[2],t[0]))),rotateZ:xp,rotate:xp,skewX:t=>ir(Math.atan(t[4])),skewY:t=>ir(Math.atan(t[1])),skew:t=>(Math.abs(t[1])+Math.abs(t[4]))/2};function Rp(t){return t.includes("scale")?1:0}function yc(t,e){if(!t||t==="none")return Rp(e);const n=t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let r,s;if(n)r=Ck,s=n;else{const l=t.match(/^matrix\(([-\d.e\s,]+)\)$/u);r=Pk,s=l}if(!s)return Rp(e);const i=r[e],o=s[1].split(",").map(Nk);return typeof i=="function"?i(o):o[i]}const kk=(t,e)=>{const{transform:n="none"}=getComputedStyle(t);return yc(n,e)};function Nk(t){return parseFloat(t.trim())}const Pp=t=>t===us||t===G,Dk=new Set(["x","y","z"]),Vk=cs.filter(t=>!Dk.has(t));function Ok(t){const e=[];return Vk.forEach(n=>{const r=t.getValue(n);r!==void 0&&(e.push([n,r.get()]),r.set(n.startsWith("scale")?1:0))}),e}const ts={width:({x:t},{paddingLeft:e="0",paddingRight:n="0"})=>t.max-t.min-parseFloat(e)-parseFloat(n),height:({y:t},{paddingTop:e="0",paddingBottom:n="0"})=>t.max-t.min-parseFloat(e)-parseFloat(n),top:(t,{top:e})=>parseFloat(e),left:(t,{left:e})=>parseFloat(e),bottom:({y:t},{top:e})=>parseFloat(e)+(t.max-t.min),right:({x:t},{left:e})=>parseFloat(e)+(t.max-t.min),x:(t,{transform:e})=>yc(e,"x"),y:(t,{transform:e})=>yc(e,"y")};ts.translateX=ts.x;ts.translateY=ts.y;const ar=new Set;let _c=!1,vc=!1;function Mv(){if(vc){const t=Array.from(ar).filter(r=>r.needsMeasurement),e=new Set(t.map(r=>r.element)),n=new Map;e.forEach(r=>{const s=Ok(r);s.length&&(n.set(r,s),r.render())}),t.forEach(r=>r.measureInitialState()),e.forEach(r=>{r.render();const s=n.get(r);s&&s.forEach(([i,o])=>{var l;(l=r.getValue(i))==null||l.set(o)})}),t.forEach(r=>r.measureEndState()),t.forEach(r=>{r.suspendedScrollY!==void 0&&window.scrollTo(0,r.suspendedScrollY)})}vc=!1,_c=!1,ar.forEach(t=>t.complete()),ar.clear()}function Lv(){ar.forEach(t=>{t.readKeyframes(),t.needsMeasurement&&(vc=!0)})}function Mk(){Lv(),Mv()}class hh{constructor(e,n,r,s,i,o=!1){this.isComplete=!1,this.isAsync=!1,this.needsMeasurement=!1,this.isScheduled=!1,this.unresolvedKeyframes=[...e],this.onComplete=n,this.name=r,this.motionValue=s,this.element=i,this.isAsync=o}scheduleResolve(){this.isScheduled=!0,this.isAsync?(ar.add(this),_c||(_c=!0,de.read(Lv),de.resolveKeyframes(Mv))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:e,name:n,element:r,motionValue:s}=this;for(let i=0;i<e.length;i++)if(e[i]===null)if(i===0){const o=s==null?void 0:s.get(),l=e[e.length-1];if(o!==void 0)e[0]=o;else if(r&&n){const c=r.readValue(n,l);c!=null&&(e[0]=c)}e[0]===void 0&&(e[0]=l),s&&o===void 0&&s.set(e[0])}else e[i]=e[i-1]}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(){this.isComplete=!0,this.onComplete(this.unresolvedKeyframes,this.finalKeyframe),ar.delete(this)}cancel(){this.isComplete||(this.isScheduled=!1,ar.delete(this))}resume(){this.isComplete||this.scheduleResolve()}}const jv=t=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t),Lk=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function jk(t){const e=Lk.exec(t);if(!e)return[,];const[,n,r,s]=e;return[`--${n??r}`,s]}function Uv(t,e,n=1){const[r,s]=jk(t);if(!r)return;const i=window.getComputedStyle(e).getPropertyValue(r);if(i){const o=i.trim();return jv(o)?parseFloat(o):o}return Ju(s)?Uv(s,e,n+1):s}const Fv=t=>e=>e.test(t),Uk={test:t=>t==="auto",parse:t=>t},Bv=[us,G,qt,yn,MC,OC,Uk],Cp=t=>Bv.find(Fv(t));class $v extends hh{constructor(e,n,r,s,i){super(e,n,r,s,i,!0)}readKeyframes(){const{unresolvedKeyframes:e,element:n,name:r}=this;if(!n||!n.current)return;super.readKeyframes();for(let c=0;c<e.length;c++){let u=e[c];if(typeof u=="string"&&(u=u.trim(),Ju(u))){const h=Uv(u,n.current);h!==void 0&&(e[c]=h),c===e.length-1&&(this.finalKeyframe=u)}}if(this.resolveNoneKeyframes(),!_v.has(r)||e.length!==2)return;const[s,i]=e,o=Cp(s),l=Cp(i);if(o!==l)if(Pp(o)&&Pp(l))for(let c=0;c<e.length;c++){const u=e[c];typeof u=="string"&&(e[c]=parseFloat(u))}else this.needsMeasurement=!0}resolveNoneKeyframes(){const{unresolvedKeyframes:e,name:n}=this,r=[];for(let s=0;s<e.length;s++)hk(e[s])&&r.push(s);r.length&&Rk(e,r,n)}measureInitialState(){const{element:e,unresolvedKeyframes:n,name:r}=this;if(!e||!e.current)return;r==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=ts[r](e.measureViewportBox(),window.getComputedStyle(e.current)),n[0]=this.measuredOrigin;const s=n[n.length-1];s!==void 0&&e.getValue(r,s).jump(s,!1)}measureEndState(){var l;const{element:e,name:n,unresolvedKeyframes:r}=this;if(!e||!e.current)return;const s=e.getValue(n);s&&s.jump(this.measuredOrigin,!1);const i=r.length-1,o=r[i];r[i]=ts[n](e.measureViewportBox(),window.getComputedStyle(e.current)),o!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=o),(l=this.removedTransforms)!=null&&l.length&&this.removedTransforms.forEach(([c,u])=>{e.getValue(c).set(u)}),this.resolveNoneKeyframes()}}const kp=(t,e)=>e==="zIndex"?!1:!!(typeof t=="number"||Array.isArray(t)||typeof t=="string"&&(Bn.test(t)||t==="0")&&!t.startsWith("url("));function Fk(t){const e=t[0];if(t.length===1)return!0;for(let n=0;n<t.length;n++)if(t[n]!==e)return!0}function Bk(t,e,n,r){const s=t[0];if(s===null)return!1;if(e==="display"||e==="visibility")return!0;const i=t[t.length-1],o=kp(s,e),l=kp(i,e);return!o||!l?!1:Fk(t)||(n==="spring"||qu(n))&&r}const $k=t=>t!==null;function La(t,{repeat:e,repeatType:n="loop"},r){const s=t.filter($k),i=e&&n!=="loop"&&e%2===1?0:s.length-1;return!i||r===void 0?s[i]:r}const qk=40;class qv{constructor({autoplay:e=!0,delay:n=0,type:r="keyframes",repeat:s=0,repeatDelay:i=0,repeatType:o="loop",...l}){this.isStopped=!1,this.hasAttemptedResolve=!1,this.createdAt=$t.now(),this.options={autoplay:e,delay:n,type:r,repeat:s,repeatDelay:i,repeatType:o,...l},this.updateFinishedPromise()}calcStartTime(){return this.resolvedAt?this.resolvedAt-this.createdAt>qk?this.resolvedAt:this.createdAt:this.createdAt}get resolved(){return!this._resolved&&!this.hasAttemptedResolve&&Mk(),this._resolved}onKeyframesResolved(e,n){this.resolvedAt=$t.now(),this.hasAttemptedResolve=!0;const{name:r,type:s,velocity:i,delay:o,onComplete:l,onUpdate:c,isGenerator:u}=this.options;if(!u&&!Bk(e,r,s,i))if(o)this.options.duration=0;else{c&&c(La(e,this.options,n)),l&&l(),this.resolveFinishedPromise();return}const h=this.initPlayback(e,n);h!==!1&&(this._resolved={keyframes:e,finalKeyframe:n,...h},this.onPostResolved())}onPostResolved(){}then(e,n){return this.currentFinishedPromise.then(e,n)}flatten(){this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear")}updateFinishedPromise(){this.currentFinishedPromise=new Promise(e=>{this.resolveFinishedPromise=e})}}const ge=(t,e,n)=>t+(e-t)*n;function vl(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*(2/3-n)*6:t}function Wk({hue:t,saturation:e,lightness:n,alpha:r}){t/=360,e/=100,n/=100;let s=0,i=0,o=0;if(!e)s=i=o=n;else{const l=n<.5?n*(1+e):n+e-n*e,c=2*n-l;s=vl(c,l,t+1/3),i=vl(c,l,t),o=vl(c,l,t-1/3)}return{red:Math.round(s*255),green:Math.round(i*255),blue:Math.round(o*255),alpha:r}}function Xo(t,e){return n=>n>0?e:t}const wl=(t,e,n)=>{const r=t*t,s=n*(e*e-r)+r;return s<0?0:Math.sqrt(s)},zk=[fc,sr,Ur],Hk=t=>zk.find(e=>e.test(t));function Np(t){const e=Hk(t);if(!e)return!1;let n=e.parse(t);return e===Ur&&(n=Wk(n)),n}const Dp=(t,e)=>{const n=Np(t),r=Np(e);if(!n||!r)return Xo(t,e);const s={...n};return i=>(s.red=wl(n.red,r.red,i),s.green=wl(n.green,r.green,i),s.blue=wl(n.blue,r.blue,i),s.alpha=ge(n.alpha,r.alpha,i),sr.transform(s))},Kk=(t,e)=>n=>e(t(n)),Ni=(...t)=>t.reduce(Kk),wc=new Set(["none","hidden"]);function Gk(t,e){return wc.has(t)?n=>n<=0?t:e:n=>n>=1?e:t}function Qk(t,e){return n=>ge(t,e,n)}function dh(t){return typeof t=="number"?Qk:typeof t=="string"?Ju(t)?Xo:Je.test(t)?Dp:Jk:Array.isArray(t)?Wv:typeof t=="object"?Je.test(t)?Dp:Xk:Xo}function Wv(t,e){const n=[...t],r=n.length,s=t.map((i,o)=>dh(i)(i,e[o]));return i=>{for(let o=0;o<r;o++)n[o]=s[o](i);return n}}function Xk(t,e){const n={...t,...e},r={};for(const s in n)t[s]!==void 0&&e[s]!==void 0&&(r[s]=dh(t[s])(t[s],e[s]));return s=>{for(const i in r)n[i]=r[i](s);return n}}function Yk(t,e){const n=[],r={color:0,var:0,number:0};for(let s=0;s<e.values.length;s++){const i=e.types[s],o=t.indexes[i][r[i]],l=t.values[o]??0;n[s]=l,r[i]++}return n}const Jk=(t,e)=>{const n=Bn.createTransformer(e),r=gi(t),s=gi(e);return r.indexes.var.length===s.indexes.var.length&&r.indexes.color.length===s.indexes.color.length&&r.indexes.number.length>=s.indexes.number.length?wc.has(t)&&!s.values.length||wc.has(e)&&!r.values.length?Gk(t,e):Ni(Wv(Yk(r,s),s.values),n):Xo(t,e)};function zv(t,e,n){return typeof t=="number"&&typeof e=="number"&&typeof n=="number"?ge(t,e,n):dh(t)(t,e)}const Zk=5;function Hv(t,e,n){const r=Math.max(e-Zk,0);return K_(n-t(r),e-r)}const we={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1},Vp=.001;function eN({duration:t=we.duration,bounce:e=we.bounce,velocity:n=we.velocity,mass:r=we.mass}){let s,i,o=1-e;o=an(we.minDamping,we.maxDamping,o),t=an(we.minDuration,we.maxDuration,Bt(t)),o<1?(s=u=>{const h=u*o,f=h*t,g=h-n,_=Tc(u,o),T=Math.exp(-f);return Vp-g/_*T},i=u=>{const f=u*o*t,g=f*n+n,_=Math.pow(o,2)*Math.pow(u,2)*t,T=Math.exp(-f),R=Tc(Math.pow(u,2),o);return(-s(u)+Vp>0?-1:1)*((g-_)*T)/R}):(s=u=>{const h=Math.exp(-u*t),f=(u-n)*t+1;return-.001+h*f},i=u=>{const h=Math.exp(-u*t),f=(n-u)*(t*t);return h*f});const l=5/t,c=nN(s,i,l);if(t=Ft(t),isNaN(c))return{stiffness:we.stiffness,damping:we.damping,duration:t};{const u=Math.pow(c,2)*r;return{stiffness:u,damping:o*2*Math.sqrt(r*u),duration:t}}}const tN=12;function nN(t,e,n){let r=n;for(let s=1;s<tN;s++)r=r-t(r)/e(r);return r}function Tc(t,e){return t*Math.sqrt(1-e*e)}const rN=["duration","bounce"],sN=["stiffness","damping","mass"];function Op(t,e){return e.some(n=>t[n]!==void 0)}function iN(t){let e={velocity:we.velocity,stiffness:we.stiffness,damping:we.damping,mass:we.mass,isResolvedFromDuration:!1,...t};if(!Op(t,sN)&&Op(t,rN))if(t.visualDuration){const n=t.visualDuration,r=2*Math.PI/(n*1.2),s=r*r,i=2*an(.05,1,1-(t.bounce||0))*Math.sqrt(s);e={...e,mass:we.mass,stiffness:s,damping:i}}else{const n=eN(t);e={...e,...n,mass:we.mass},e.isResolvedFromDuration=!0}return e}function Yo(t=we.visualDuration,e=we.bounce){const n=typeof t!="object"?{visualDuration:t,keyframes:[0,1],bounce:e}:t;let{restSpeed:r,restDelta:s}=n;const i=n.keyframes[0],o=n.keyframes[n.keyframes.length-1],l={done:!1,value:i},{stiffness:c,damping:u,mass:h,duration:f,velocity:g,isResolvedFromDuration:_}=iN({...n,velocity:-Bt(n.velocity||0)}),T=g||0,R=u/(2*Math.sqrt(c*h)),I=o-i,C=Bt(Math.sqrt(c/h)),V=Math.abs(I)<5;r||(r=V?we.restSpeed.granular:we.restSpeed.default),s||(s=V?we.restDelta.granular:we.restDelta.default);let D;if(R<1){const L=Tc(C,R);D=U=>{const b=Math.exp(-R*C*U);return o-b*((T+R*C*I)/L*Math.sin(L*U)+I*Math.cos(L*U))}}else if(R===1)D=L=>o-Math.exp(-C*L)*(I+(T+C*I)*L);else{const L=C*Math.sqrt(R*R-1);D=U=>{const b=Math.exp(-R*C*U),v=Math.min(L*U,300);return o-b*((T+R*C*I)*Math.sinh(v)+L*I*Math.cosh(v))/L}}const B={calculatedDuration:_&&f||null,next:L=>{const U=D(L);if(_)l.done=L>=f;else{let b=0;R<1&&(b=L===0?Ft(T):Hv(D,L,U));const v=Math.abs(b)<=r,w=Math.abs(o-U)<=s;l.done=v&&w}return l.value=l.done?o:U,l},toString:()=>{const L=Math.min(zu(B),Go),U=G_(b=>B.next(L*b).value,L,30);return L+"ms "+U},toTransition:()=>{}};return B}Yo.applyToOptions=t=>{const e=rC(t,100,Yo);return t.ease=ui()?e.ease:"easeOut",t.duration=Ft(e.duration),t.type="keyframes",t};function Mp({keyframes:t,velocity:e=0,power:n=.8,timeConstant:r=325,bounceDamping:s=10,bounceStiffness:i=500,modifyTarget:o,min:l,max:c,restDelta:u=.5,restSpeed:h}){const f=t[0],g={done:!1,value:f},_=v=>l!==void 0&&v<l||c!==void 0&&v>c,T=v=>l===void 0?c:c===void 0||Math.abs(l-v)<Math.abs(c-v)?l:c;let R=n*e;const I=f+R,C=o===void 0?I:o(I);C!==I&&(R=C-f);const V=v=>-R*Math.exp(-v/r),D=v=>C+V(v),B=v=>{const w=V(v),x=D(v);g.done=Math.abs(w)<=u,g.value=g.done?C:x};let L,U;const b=v=>{_(g.value)&&(L=v,U=Yo({keyframes:[g.value,T(g.value)],velocity:Hv(D,v,g.value),damping:s,stiffness:i,restDelta:u,restSpeed:h}))};return b(0),{calculatedDuration:null,next:v=>{let w=!1;return!U&&L===void 0&&(w=!0,B(v),b(v)),L!==void 0&&v>=L?U.next(v-L):(!w&&B(v),g)}}}const oN=ki(.42,0,1,1),aN=ki(0,0,.58,1),Kv=ki(.42,0,.58,1),lN=t=>Array.isArray(t)&&typeof t[0]!="number",cN={linear:bt,easeIn:oN,easeInOut:Kv,easeOut:aN,circIn:lh,circInOut:Sv,circOut:Av,backIn:ah,backInOut:Iv,backOut:bv,anticipate:xv},Lp=t=>{if($u(t)){H_(t.length===4);const[e,n,r,s]=t;return ki(e,n,r,s)}else if(typeof t=="string")return cN[t];return t};function uN(t,e,n){const r=[],s=n||zv,i=t.length-1;for(let o=0;o<i;o++){let l=s(t[o],t[o+1]);if(e){const c=Array.isArray(e)?e[o]||bt:e;l=Ni(c,l)}r.push(l)}return r}function hN(t,e,{clamp:n=!0,ease:r,mixer:s}={}){const i=t.length;if(H_(i===e.length),i===1)return()=>e[0];if(i===2&&e[0]===e[1])return()=>e[1];const o=t[0]===t[1];t[0]>t[i-1]&&(t=[...t].reverse(),e=[...e].reverse());const l=uN(e,r,s),c=l.length,u=h=>{if(o&&h<t[0])return e[0];let f=0;if(c>1)for(;f<t.length-2&&!(h<t[f+1]);f++);const g=ci(t[f],t[f+1],h);return l[f](g)};return n?h=>u(an(t[0],t[i-1],h)):u}function dN(t,e){const n=t[t.length-1];for(let r=1;r<=e;r++){const s=ci(0,e,r);t.push(ge(n,1,s))}}function fN(t){const e=[0];return dN(e,t.length-1),e}function pN(t,e){return t.map(n=>n*e)}function mN(t,e){return t.map(()=>e||Kv).splice(0,t.length-1)}function Jo({duration:t=300,keyframes:e,times:n,ease:r="easeInOut"}){const s=lN(r)?r.map(Lp):Lp(r),i={done:!1,value:e[0]},o=pN(n&&n.length===e.length?n:fN(e),t),l=hN(o,e,{ease:Array.isArray(s)?s:mN(e,s)});return{calculatedDuration:t,next:c=>(i.value=l(c),i.done=c>=t,i)}}const gN=t=>{const e=({timestamp:n})=>t(n);return{start:()=>de.update(e,!0),stop:()=>Fn(e),now:()=>Be.isProcessing?Be.timestamp:$t.now()}},yN={decay:Mp,inertia:Mp,tween:Jo,keyframes:Jo,spring:Yo},_N=t=>t/100;class fh extends qv{constructor(e){super(e),this.holdTime=null,this.cancelTime=null,this.currentTime=0,this.playbackSpeed=1,this.pendingPlayState="running",this.startTime=null,this.state="idle",this.stop=()=>{if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.teardown();const{onStop:c}=this.options;c&&c()};const{name:n,motionValue:r,element:s,keyframes:i}=this.options,o=(s==null?void 0:s.KeyframeResolver)||hh,l=(c,u)=>this.onKeyframesResolved(c,u);this.resolver=new o(i,l,n,r,s),this.resolver.scheduleResolve()}flatten(){super.flatten(),this._resolved&&Object.assign(this._resolved,this.initPlayback(this._resolved.keyframes))}initPlayback(e){const{type:n="keyframes",repeat:r=0,repeatDelay:s=0,repeatType:i,velocity:o=0}=this.options,l=qu(n)?n:yN[n]||Jo;let c,u;l!==Jo&&typeof e[0]!="number"&&(c=Ni(_N,zv(e[0],e[1])),e=[0,100]);const h=l({...this.options,keyframes:e});i==="mirror"&&(u=l({...this.options,keyframes:[...e].reverse(),velocity:-o})),h.calculatedDuration===null&&(h.calculatedDuration=zu(h));const{calculatedDuration:f}=h,g=f+s,_=g*(r+1)-s;return{generator:h,mirroredGenerator:u,mapPercentToKeyframes:c,calculatedDuration:f,resolvedDuration:g,totalDuration:_}}onPostResolved(){const{autoplay:e=!0}=this.options;this.play(),this.pendingPlayState==="paused"||!e?this.pause():this.state=this.pendingPlayState}tick(e,n=!1){const{resolved:r}=this;if(!r){const{keyframes:v}=this.options;return{done:!0,value:v[v.length-1]}}const{finalKeyframe:s,generator:i,mirroredGenerator:o,mapPercentToKeyframes:l,keyframes:c,calculatedDuration:u,totalDuration:h,resolvedDuration:f}=r;if(this.startTime===null)return i.next(0);const{delay:g,repeat:_,repeatType:T,repeatDelay:R,onUpdate:I}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,e):this.speed<0&&(this.startTime=Math.min(e-h/this.speed,this.startTime)),n?this.currentTime=e:this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=Math.round(e-this.startTime)*this.speed;const C=this.currentTime-g*(this.speed>=0?1:-1),V=this.speed>=0?C<0:C>h;this.currentTime=Math.max(C,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=h);let D=this.currentTime,B=i;if(_){const v=Math.min(this.currentTime,h)/f;let w=Math.floor(v),x=v%1;!x&&v>=1&&(x=1),x===1&&w--,w=Math.min(w,_+1),!!(w%2)&&(T==="reverse"?(x=1-x,R&&(x-=R/f)):T==="mirror"&&(B=o)),D=an(0,1,x)*f}const L=V?{done:!1,value:c[0]}:B.next(D);l&&(L.value=l(L.value));let{done:U}=L;!V&&u!==null&&(U=this.speed>=0?this.currentTime>=h:this.currentTime<=0);const b=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&U);return b&&s!==void 0&&(L.value=La(c,this.options,s)),I&&I(L.value),b&&this.finish(),L}get duration(){const{resolved:e}=this;return e?Bt(e.calculatedDuration):0}get time(){return Bt(this.currentTime)}set time(e){e=Ft(e),this.currentTime=e,this.holdTime!==null||this.speed===0?this.holdTime=e:this.driver&&(this.startTime=this.driver.now()-e/this.speed)}get speed(){return this.playbackSpeed}set speed(e){const n=this.playbackSpeed!==e;this.playbackSpeed=e,n&&(this.time=Bt(this.currentTime))}play(){if(this.resolver.isScheduled||this.resolver.resume(),!this._resolved){this.pendingPlayState="running";return}if(this.isStopped)return;const{driver:e=gN,onPlay:n,startTime:r}=this.options;this.driver||(this.driver=e(i=>this.tick(i))),n&&n();const s=this.driver.now();this.holdTime!==null?this.startTime=s-this.holdTime:this.startTime?this.state==="finished"&&(this.startTime=s):this.startTime=r??this.calcStartTime(),this.state==="finished"&&this.updateFinishedPromise(),this.cancelTime=this.startTime,this.holdTime=null,this.state="running",this.driver.start()}pause(){if(!this._resolved){this.pendingPlayState="paused";return}this.state="paused",this.holdTime=this.currentTime??0}complete(){this.state!=="running"&&this.play(),this.pendingPlayState=this.state="finished",this.holdTime=null}finish(){this.teardown(),this.state="finished";const{onComplete:e}=this.options;e&&e()}cancel(){this.cancelTime!==null&&this.tick(this.cancelTime),this.teardown(),this.updateFinishedPromise()}teardown(){this.state="idle",this.stopDriver(),this.resolveFinishedPromise(),this.updateFinishedPromise(),this.startTime=this.cancelTime=null,this.resolver.cancel()}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(e){return this.startTime=0,this.tick(e,!0)}get finished(){return this.currentFinishedPromise}}const vN=new Set(["opacity","clipPath","filter","transform"]),wN=Fu(()=>Object.hasOwnProperty.call(Element.prototype,"animate")),Zo=10,TN=2e4;function EN(t){return qu(t.type)||t.type==="spring"||!X_(t.ease)}function bN(t,e){const n=new fh({...e,keyframes:t,repeat:0,delay:0,isGenerator:!0});let r={done:!1,value:t[0]};const s=[];let i=0;for(;!r.done&&i<TN;)r=n.sample(i),s.push(r.value),i+=Zo;return{times:void 0,keyframes:s,duration:i-Zo,ease:"linear"}}const Gv={anticipate:xv,backInOut:Iv,circInOut:Sv};function IN(t){return t in Gv}class jp extends qv{constructor(e){super(e);const{name:n,motionValue:r,element:s,keyframes:i}=this.options;this.resolver=new $v(i,(o,l)=>this.onKeyframesResolved(o,l),n,r,s),this.resolver.scheduleResolve()}initPlayback(e,n){let{duration:r=300,times:s,ease:i,type:o,motionValue:l,name:c,startTime:u}=this.options;if(!l.owner||!l.owner.current)return!1;if(typeof i=="string"&&ui()&&IN(i)&&(i=Gv[i]),EN(this.options)){const{onComplete:f,onUpdate:g,motionValue:_,element:T,...R}=this.options,I=bN(e,R);e=I.keyframes,e.length===1&&(e[1]=e[0]),r=I.duration,s=I.times,i=I.ease,o="keyframes"}const h=nC(l.owner.current,c,e,{...this.options,duration:r,times:s,ease:i});return h.startTime=u??this.calcStartTime(),this.pendingTimeline?(dp(h,this.pendingTimeline),this.pendingTimeline=void 0):h.onfinish=()=>{const{onComplete:f}=this.options;l.set(La(e,this.options,n)),f&&f(),this.cancel(),this.resolveFinishedPromise()},{animation:h,duration:r,times:s,type:o,ease:i,keyframes:e}}get duration(){const{resolved:e}=this;if(!e)return 0;const{duration:n}=e;return Bt(n)}get time(){const{resolved:e}=this;if(!e)return 0;const{animation:n}=e;return Bt(n.currentTime||0)}set time(e){const{resolved:n}=this;if(!n)return;const{animation:r}=n;r.currentTime=Ft(e)}get speed(){const{resolved:e}=this;if(!e)return 1;const{animation:n}=e;return n.playbackRate}get finished(){return this.resolved.animation.finished}set speed(e){const{resolved:n}=this;if(!n)return;const{animation:r}=n;r.playbackRate=e}get state(){const{resolved:e}=this;if(!e)return"idle";const{animation:n}=e;return n.playState}get startTime(){const{resolved:e}=this;if(!e)return null;const{animation:n}=e;return n.startTime}attachTimeline(e){if(!this._resolved)this.pendingTimeline=e;else{const{resolved:n}=this;if(!n)return bt;const{animation:r}=n;dp(r,e)}return bt}play(){if(this.isStopped)return;const{resolved:e}=this;if(!e)return;const{animation:n}=e;n.playState==="finished"&&this.updateFinishedPromise(),n.play()}pause(){const{resolved:e}=this;if(!e)return;const{animation:n}=e;n.pause()}stop(){if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.resolveFinishedPromise(),this.updateFinishedPromise();const{resolved:e}=this;if(!e)return;const{animation:n,keyframes:r,duration:s,type:i,ease:o,times:l}=e;if(n.playState==="idle"||n.playState==="finished")return;if(this.time){const{motionValue:u,onUpdate:h,onComplete:f,element:g,..._}=this.options,T=new fh({..._,keyframes:r,duration:s,type:i,ease:o,times:l,isGenerator:!0}),R=Ft(this.time);u.setWithVelocity(T.sample(R-Zo).value,T.sample(R).value,Zo)}const{onStop:c}=this.options;c&&c(),this.cancel()}complete(){const{resolved:e}=this;e&&e.animation.finish()}cancel(){const{resolved:e}=this;e&&e.animation.cancel()}static supports(e){const{motionValue:n,name:r,repeatDelay:s,repeatType:i,damping:o,type:l}=e;if(!n||!n.owner||!(n.owner.current instanceof HTMLElement))return!1;const{onUpdate:c,transformTemplate:u}=n.owner.getProps();return wN()&&r&&vN.has(r)&&(r!=="transform"||!u)&&!c&&!s&&i!=="mirror"&&o!==0&&l!=="inertia"}}const xN={type:"spring",stiffness:500,damping:25,restSpeed:10},AN=t=>({type:"spring",stiffness:550,damping:t===0?2*Math.sqrt(550):30,restSpeed:10}),SN={type:"keyframes",duration:.8},RN={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},PN=(t,{keyframes:e})=>e.length>2?SN:Tr.has(t)?t.startsWith("scale")?AN(e[1]):xN:RN;function CN({when:t,delay:e,delayChildren:n,staggerChildren:r,staggerDirection:s,repeat:i,repeatType:o,repeatDelay:l,from:c,elapsed:u,...h}){return!!Object.keys(h).length}const ph=(t,e,n,r={},s,i)=>o=>{const l=Wu(r,t)||{},c=l.delay||r.delay||0;let{elapsed:u=0}=r;u=u-Ft(c);let h={keyframes:Array.isArray(n)?n:[null,n],ease:"easeOut",velocity:e.getVelocity(),...l,delay:-u,onUpdate:g=>{e.set(g),l.onUpdate&&l.onUpdate(g)},onComplete:()=>{o(),l.onComplete&&l.onComplete()},name:t,motionValue:e,element:i?void 0:s};CN(l)||(h={...h,...PN(t,h)}),h.duration&&(h.duration=Ft(h.duration)),h.repeatDelay&&(h.repeatDelay=Ft(h.repeatDelay)),h.from!==void 0&&(h.keyframes[0]=h.from);let f=!1;if((h.type===!1||h.duration===0&&!h.repeatDelay)&&(h.duration=0,h.delay===0&&(f=!0)),h.allowFlatten=!l.type&&!l.ease,f&&!i&&e.get()!==void 0){const g=La(h.keyframes,l);if(g!==void 0)return de.update(()=>{h.onUpdate(g),h.onComplete()}),new ZP([])}return!i&&jp.supports(h)?new jp(h):new fh(h)};function kN({protectedKeys:t,needsAnimating:e},n){const r=t.hasOwnProperty(n)&&e[n]!==!0;return e[n]=!1,r}function Qv(t,e,{delay:n=0,transitionOverride:r,type:s}={}){let{transition:i=t.getDefaultTransition(),transitionEnd:o,...l}=e;r&&(i=r);const c=[],u=s&&t.animationState&&t.animationState.getState()[s];for(const h in l){const f=t.getValue(h,t.latestValues[h]??null),g=l[h];if(g===void 0||u&&kN(u,h))continue;const _={delay:n,...Wu(i||{},h)};let T=!1;if(window.MotionHandoffAnimation){const I=vv(t);if(I){const C=window.MotionHandoffAnimation(I,h,de);C!==null&&(_.startTime=C,T=!0)}}dc(t,h),f.start(ph(h,f,g,t.shouldReduceMotion&&_v.has(h)?{type:!1}:_,t,T));const R=f.animation;R&&c.push(R)}return o&&Promise.all(c).then(()=>{de.update(()=>{o&&ok(t,o)})}),c}function Ec(t,e,n={}){var c;const r=mi(t,e,n.type==="exit"?(c=t.presenceContext)==null?void 0:c.custom:void 0);let{transition:s=t.getDefaultTransition()||{}}=r||{};n.transitionOverride&&(s=n.transitionOverride);const i=r?()=>Promise.all(Qv(t,r,n)):()=>Promise.resolve(),o=t.variantChildren&&t.variantChildren.size?(u=0)=>{const{delayChildren:h=0,staggerChildren:f,staggerDirection:g}=s;return NN(t,e,h+u,f,g,n)}:()=>Promise.resolve(),{when:l}=s;if(l){const[u,h]=l==="beforeChildren"?[i,o]:[o,i];return u().then(()=>h())}else return Promise.all([i(),o(n.delay)])}function NN(t,e,n=0,r=0,s=1,i){const o=[],l=(t.variantChildren.size-1)*r,c=s===1?(u=0)=>u*r:(u=0)=>l-u*r;return Array.from(t.variantChildren).sort(DN).forEach((u,h)=>{u.notify("AnimationStart",e),o.push(Ec(u,e,{...i,delay:n+c(h)}).then(()=>u.notify("AnimationComplete",e)))}),Promise.all(o)}function DN(t,e){return t.sortNodePosition(e)}function VN(t,e,n={}){t.notify("AnimationStart",e);let r;if(Array.isArray(e)){const s=e.map(i=>Ec(t,i,n));r=Promise.all(s)}else if(typeof e=="string")r=Ec(t,e,n);else{const s=typeof e=="function"?mi(t,e,n.custom):e;r=Promise.all(Qv(t,s,n))}return r.then(()=>{t.notify("AnimationComplete",e)})}function Xv(t,e){if(!Array.isArray(e))return!1;const n=e.length;if(n!==t.length)return!1;for(let r=0;r<n;r++)if(e[r]!==t[r])return!1;return!0}const ON=Qu.length;function Yv(t){if(!t)return;if(!t.isControllingVariants){const n=t.parent?Yv(t.parent)||{}:{};return t.props.initial!==void 0&&(n.initial=t.props.initial),n}const e={};for(let n=0;n<ON;n++){const r=Qu[n],s=t.props[r];(di(s)||s===!1)&&(e[r]=s)}return e}const MN=[...Gu].reverse(),LN=Gu.length;function jN(t){return e=>Promise.all(e.map(({animation:n,options:r})=>VN(t,n,r)))}function UN(t){let e=jN(t),n=Up(),r=!0;const s=c=>(u,h)=>{var g;const f=mi(t,h,c==="exit"?(g=t.presenceContext)==null?void 0:g.custom:void 0);if(f){const{transition:_,transitionEnd:T,...R}=f;u={...u,...R,...T}}return u};function i(c){e=c(t)}function o(c){const{props:u}=t,h=Yv(t.parent)||{},f=[],g=new Set;let _={},T=1/0;for(let I=0;I<LN;I++){const C=MN[I],V=n[C],D=u[C]!==void 0?u[C]:h[C],B=di(D),L=C===c?V.isActive:null;L===!1&&(T=I);let U=D===h[C]&&D!==u[C]&&B;if(U&&r&&t.manuallyAnimateOnMount&&(U=!1),V.protectedKeys={..._},!V.isActive&&L===null||!D&&!V.prevProp||Oa(D)||typeof D=="boolean")continue;const b=FN(V.prevProp,D);let v=b||C===c&&V.isActive&&!U&&B||I>T&&B,w=!1;const x=Array.isArray(D)?D:[D];let A=x.reduce(s(C),{});L===!1&&(A={});const{prevResolvedValues:P={}}=V,E={...P,...A},Le=ue=>{v=!0,g.has(ue)&&(w=!0,g.delete(ue)),V.needsAnimating[ue]=!0;const Re=t.getValue(ue);Re&&(Re.liveStyle=!1)};for(const ue in E){const Re=A[ue],lt=P[ue];if(_.hasOwnProperty(ue))continue;let ct=!1;hc(Re)&&hc(lt)?ct=!Xv(Re,lt):ct=Re!==lt,ct?Re!=null?Le(ue):g.add(ue):Re!==void 0&&g.has(ue)?Le(ue):V.protectedKeys[ue]=!0}V.prevProp=D,V.prevResolvedValues=A,V.isActive&&(_={..._,...A}),r&&t.blockInitialAnimation&&(v=!1),v&&(!(U&&b)||w)&&f.push(...x.map(ue=>({animation:ue,options:{type:C}})))}if(g.size){const I={};if(typeof u.initial!="boolean"){const C=mi(t,Array.isArray(u.initial)?u.initial[0]:u.initial);C&&C.transition&&(I.transition=C.transition)}g.forEach(C=>{const V=t.getBaseTarget(C),D=t.getValue(C);D&&(D.liveStyle=!0),I[C]=V??null}),f.push({animation:I})}let R=!!f.length;return r&&(u.initial===!1||u.initial===u.animate)&&!t.manuallyAnimateOnMount&&(R=!1),r=!1,R?e(f):Promise.resolve()}function l(c,u){var f;if(n[c].isActive===u)return Promise.resolve();(f=t.variantChildren)==null||f.forEach(g=>{var _;return(_=g.animationState)==null?void 0:_.setActive(c,u)}),n[c].isActive=u;const h=o(c);for(const g in n)n[g].protectedKeys={};return h}return{animateChanges:o,setActive:l,setAnimateFunction:i,getState:()=>n,reset:()=>{n=Up(),r=!0}}}function FN(t,e){return typeof e=="string"?e!==t:Array.isArray(e)?!Xv(e,t):!1}function er(t=!1){return{isActive:t,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Up(){return{animate:er(!0),whileInView:er(),whileHover:er(),whileTap:er(),whileDrag:er(),whileFocus:er(),exit:er()}}class Kn{constructor(e){this.isMounted=!1,this.node=e}update(){}}class BN extends Kn{constructor(e){super(e),e.animationState||(e.animationState=UN(e))}updateAnimationControlsSubscription(){const{animate:e}=this.node.getProps();Oa(e)&&(this.unmountControls=e.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:e}=this.node.getProps(),{animate:n}=this.node.prevProps||{};e!==n&&this.updateAnimationControlsSubscription()}unmount(){var e;this.node.animationState.reset(),(e=this.unmountControls)==null||e.call(this)}}let $N=0;class qN extends Kn{constructor(){super(...arguments),this.id=$N++}update(){if(!this.node.presenceContext)return;const{isPresent:e,onExitComplete:n}=this.node.presenceContext,{isPresent:r}=this.node.prevPresenceContext||{};if(!this.node.animationState||e===r)return;const s=this.node.animationState.setActive("exit",!e);n&&!e&&s.then(()=>{n(this.id)})}mount(){const{register:e,onExitComplete:n}=this.node.presenceContext||{};n&&n(this.id),e&&(this.unmount=e(this.id))}unmount(){}}const WN={animation:{Feature:BN},exit:{Feature:qN}};function yi(t,e,n,r={passive:!0}){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n)}function Di(t){return{point:{x:t.pageX,y:t.pageY}}}const zN=t=>e=>Ku(e)&&t(e,Di(e));function zs(t,e,n,r){return yi(t,e,zN(n),r)}function Jv({top:t,left:e,right:n,bottom:r}){return{x:{min:e,max:n},y:{min:t,max:r}}}function HN({x:t,y:e}){return{top:e.min,right:t.max,bottom:e.max,left:t.min}}function KN(t,e){if(!e)return t;const n=e({x:t.left,y:t.top}),r=e({x:t.right,y:t.bottom});return{top:n.y,left:n.x,bottom:r.y,right:r.x}}const Zv=1e-4,GN=1-Zv,QN=1+Zv,e0=.01,XN=0-e0,YN=0+e0;function at(t){return t.max-t.min}function JN(t,e,n){return Math.abs(t-e)<=n}function Fp(t,e,n,r=.5){t.origin=r,t.originPoint=ge(e.min,e.max,t.origin),t.scale=at(n)/at(e),t.translate=ge(n.min,n.max,t.origin)-t.originPoint,(t.scale>=GN&&t.scale<=QN||isNaN(t.scale))&&(t.scale=1),(t.translate>=XN&&t.translate<=YN||isNaN(t.translate))&&(t.translate=0)}function Hs(t,e,n,r){Fp(t.x,e.x,n.x,r?r.originX:void 0),Fp(t.y,e.y,n.y,r?r.originY:void 0)}function Bp(t,e,n){t.min=n.min+e.min,t.max=t.min+at(e)}function ZN(t,e,n){Bp(t.x,e.x,n.x),Bp(t.y,e.y,n.y)}function $p(t,e,n){t.min=e.min-n.min,t.max=t.min+at(e)}function Ks(t,e,n){$p(t.x,e.x,n.x),$p(t.y,e.y,n.y)}const qp=()=>({translate:0,scale:1,origin:0,originPoint:0}),Fr=()=>({x:qp(),y:qp()}),Wp=()=>({min:0,max:0}),Ae=()=>({x:Wp(),y:Wp()});function Tt(t){return[t("x"),t("y")]}function Tl(t){return t===void 0||t===1}function bc({scale:t,scaleX:e,scaleY:n}){return!Tl(t)||!Tl(e)||!Tl(n)}function nr(t){return bc(t)||t0(t)||t.z||t.rotate||t.rotateX||t.rotateY||t.skewX||t.skewY}function t0(t){return zp(t.x)||zp(t.y)}function zp(t){return t&&t!=="0%"}function ea(t,e,n){const r=t-n,s=e*r;return n+s}function Hp(t,e,n,r,s){return s!==void 0&&(t=ea(t,s,r)),ea(t,n,r)+e}function Ic(t,e=0,n=1,r,s){t.min=Hp(t.min,e,n,r,s),t.max=Hp(t.max,e,n,r,s)}function n0(t,{x:e,y:n}){Ic(t.x,e.translate,e.scale,e.originPoint),Ic(t.y,n.translate,n.scale,n.originPoint)}const Kp=.999999999999,Gp=1.0000000000001;function e1(t,e,n,r=!1){const s=n.length;if(!s)return;e.x=e.y=1;let i,o;for(let l=0;l<s;l++){i=n[l],o=i.projectionDelta;const{visualElement:c}=i.options;c&&c.props.style&&c.props.style.display==="contents"||(r&&i.options.layoutScroll&&i.scroll&&i!==i.root&&$r(t,{x:-i.scroll.offset.x,y:-i.scroll.offset.y}),o&&(e.x*=o.x.scale,e.y*=o.y.scale,n0(t,o)),r&&nr(i.latestValues)&&$r(t,i.latestValues))}e.x<Gp&&e.x>Kp&&(e.x=1),e.y<Gp&&e.y>Kp&&(e.y=1)}function Br(t,e){t.min=t.min+e,t.max=t.max+e}function Qp(t,e,n,r,s=.5){const i=ge(t.min,t.max,s);Ic(t,e,n,i,r)}function $r(t,e){Qp(t.x,e.x,e.scaleX,e.scale,e.originX),Qp(t.y,e.y,e.scaleY,e.scale,e.originY)}function r0(t,e){return Jv(KN(t.getBoundingClientRect(),e))}function t1(t,e,n){const r=r0(t,n),{scroll:s}=e;return s&&(Br(r.x,s.offset.x),Br(r.y,s.offset.y)),r}const s0=({current:t})=>t?t.ownerDocument.defaultView:null,Xp=(t,e)=>Math.abs(t-e);function n1(t,e){const n=Xp(t.x,e.x),r=Xp(t.y,e.y);return Math.sqrt(n**2+r**2)}class i0{constructor(e,n,{transformPagePoint:r,contextWindow:s,dragSnapToOrigin:i=!1}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const f=bl(this.lastMoveEventInfo,this.history),g=this.startEvent!==null,_=n1(f.offset,{x:0,y:0})>=3;if(!g&&!_)return;const{point:T}=f,{timestamp:R}=Be;this.history.push({...T,timestamp:R});const{onStart:I,onMove:C}=this.handlers;g||(I&&I(this.lastMoveEvent,f),this.startEvent=this.lastMoveEvent),C&&C(this.lastMoveEvent,f)},this.handlePointerMove=(f,g)=>{this.lastMoveEvent=f,this.lastMoveEventInfo=El(g,this.transformPagePoint),de.update(this.updatePoint,!0)},this.handlePointerUp=(f,g)=>{this.end();const{onEnd:_,onSessionEnd:T,resumeAnimation:R}=this.handlers;if(this.dragSnapToOrigin&&R&&R(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const I=bl(f.type==="pointercancel"?this.lastMoveEventInfo:El(g,this.transformPagePoint),this.history);this.startEvent&&_&&_(f,I),T&&T(f,I)},!Ku(e))return;this.dragSnapToOrigin=i,this.handlers=n,this.transformPagePoint=r,this.contextWindow=s||window;const o=Di(e),l=El(o,this.transformPagePoint),{point:c}=l,{timestamp:u}=Be;this.history=[{...c,timestamp:u}];const{onSessionStart:h}=n;h&&h(e,bl(l,this.history)),this.removeListeners=Ni(zs(this.contextWindow,"pointermove",this.handlePointerMove),zs(this.contextWindow,"pointerup",this.handlePointerUp),zs(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(e){this.handlers=e}end(){this.removeListeners&&this.removeListeners(),Fn(this.updatePoint)}}function El(t,e){return e?{point:e(t.point)}:t}function Yp(t,e){return{x:t.x-e.x,y:t.y-e.y}}function bl({point:t},e){return{point:t,delta:Yp(t,o0(e)),offset:Yp(t,r1(e)),velocity:s1(e,.1)}}function r1(t){return t[0]}function o0(t){return t[t.length-1]}function s1(t,e){if(t.length<2)return{x:0,y:0};let n=t.length-1,r=null;const s=o0(t);for(;n>=0&&(r=t[n],!(s.timestamp-r.timestamp>Ft(e)));)n--;if(!r)return{x:0,y:0};const i=Bt(s.timestamp-r.timestamp);if(i===0)return{x:0,y:0};const o={x:(s.x-r.x)/i,y:(s.y-r.y)/i};return o.x===1/0&&(o.x=0),o.y===1/0&&(o.y=0),o}function i1(t,{min:e,max:n},r){return e!==void 0&&t<e?t=r?ge(e,t,r.min):Math.max(t,e):n!==void 0&&t>n&&(t=r?ge(n,t,r.max):Math.min(t,n)),t}function Jp(t,e,n){return{min:e!==void 0?t.min+e:void 0,max:n!==void 0?t.max+n-(t.max-t.min):void 0}}function o1(t,{top:e,left:n,bottom:r,right:s}){return{x:Jp(t.x,n,s),y:Jp(t.y,e,r)}}function Zp(t,e){let n=e.min-t.min,r=e.max-t.max;return e.max-e.min<t.max-t.min&&([n,r]=[r,n]),{min:n,max:r}}function a1(t,e){return{x:Zp(t.x,e.x),y:Zp(t.y,e.y)}}function l1(t,e){let n=.5;const r=at(t),s=at(e);return s>r?n=ci(e.min,e.max-r,t.min):r>s&&(n=ci(t.min,t.max-s,e.min)),an(0,1,n)}function c1(t,e){const n={};return e.min!==void 0&&(n.min=e.min-t.min),e.max!==void 0&&(n.max=e.max-t.min),n}const xc=.35;function u1(t=xc){return t===!1?t=0:t===!0&&(t=xc),{x:em(t,"left","right"),y:em(t,"top","bottom")}}function em(t,e,n){return{min:tm(t,e),max:tm(t,n)}}function tm(t,e){return typeof t=="number"?t:t[e]||0}const h1=new WeakMap;class d1{constructor(e){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=Ae(),this.visualElement=e}start(e,{snapToCursor:n=!1}={}){const{presenceContext:r}=this.visualElement;if(r&&r.isPresent===!1)return;const s=h=>{const{dragSnapToOrigin:f}=this.getProps();f?this.pauseAnimation():this.stopAnimation(),n&&this.snapToCursor(Di(h).point)},i=(h,f)=>{const{drag:g,dragPropagation:_,onDragStart:T}=this.getProps();if(g&&!_&&(this.openDragLock&&this.openDragLock(),this.openDragLock=aC(g),!this.openDragLock))return;this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),Tt(I=>{let C=this.getAxisMotionValue(I).get()||0;if(qt.test(C)){const{projection:V}=this.visualElement;if(V&&V.layout){const D=V.layout.layoutBox[I];D&&(C=at(D)*(parseFloat(C)/100))}}this.originPoint[I]=C}),T&&de.postRender(()=>T(h,f)),dc(this.visualElement,"transform");const{animationState:R}=this.visualElement;R&&R.setActive("whileDrag",!0)},o=(h,f)=>{const{dragPropagation:g,dragDirectionLock:_,onDirectionLock:T,onDrag:R}=this.getProps();if(!g&&!this.openDragLock)return;const{offset:I}=f;if(_&&this.currentDirection===null){this.currentDirection=f1(I),this.currentDirection!==null&&T&&T(this.currentDirection);return}this.updateAxis("x",f.point,I),this.updateAxis("y",f.point,I),this.visualElement.render(),R&&R(h,f)},l=(h,f)=>this.stop(h,f),c=()=>Tt(h=>{var f;return this.getAnimationState(h)==="paused"&&((f=this.getAxisMotionValue(h).animation)==null?void 0:f.play())}),{dragSnapToOrigin:u}=this.getProps();this.panSession=new i0(e,{onSessionStart:s,onStart:i,onMove:o,onSessionEnd:l,resumeAnimation:c},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:u,contextWindow:s0(this.visualElement)})}stop(e,n){const r=this.isDragging;if(this.cancel(),!r)return;const{velocity:s}=n;this.startAnimation(s);const{onDragEnd:i}=this.getProps();i&&de.postRender(()=>i(e,n))}cancel(){this.isDragging=!1;const{projection:e,animationState:n}=this.visualElement;e&&(e.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;const{dragPropagation:r}=this.getProps();!r&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),n&&n.setActive("whileDrag",!1)}updateAxis(e,n,r){const{drag:s}=this.getProps();if(!r||!fo(e,s,this.currentDirection))return;const i=this.getAxisMotionValue(e);let o=this.originPoint[e]+r[e];this.constraints&&this.constraints[e]&&(o=i1(o,this.constraints[e],this.elastic[e])),i.set(o)}resolveConstraints(){var i;const{dragConstraints:e,dragElastic:n}=this.getProps(),r=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(i=this.visualElement.projection)==null?void 0:i.layout,s=this.constraints;e&&jr(e)?this.constraints||(this.constraints=this.resolveRefConstraints()):e&&r?this.constraints=o1(r.layoutBox,e):this.constraints=!1,this.elastic=u1(n),s!==this.constraints&&r&&this.constraints&&!this.hasMutatedConstraints&&Tt(o=>{this.constraints!==!1&&this.getAxisMotionValue(o)&&(this.constraints[o]=c1(r.layoutBox[o],this.constraints[o]))})}resolveRefConstraints(){const{dragConstraints:e,onMeasureDragConstraints:n}=this.getProps();if(!e||!jr(e))return!1;const r=e.current,{projection:s}=this.visualElement;if(!s||!s.layout)return!1;const i=t1(r,s.root,this.visualElement.getTransformPagePoint());let o=a1(s.layout.layoutBox,i);if(n){const l=n(HN(o));this.hasMutatedConstraints=!!l,l&&(o=Jv(l))}return o}startAnimation(e){const{drag:n,dragMomentum:r,dragElastic:s,dragTransition:i,dragSnapToOrigin:o,onDragTransitionEnd:l}=this.getProps(),c=this.constraints||{},u=Tt(h=>{if(!fo(h,n,this.currentDirection))return;let f=c&&c[h]||{};o&&(f={min:0,max:0});const g=s?200:1e6,_=s?40:1e7,T={type:"inertia",velocity:r?e[h]:0,bounceStiffness:g,bounceDamping:_,timeConstant:750,restDelta:1,restSpeed:10,...i,...f};return this.startAxisValueAnimation(h,T)});return Promise.all(u).then(l)}startAxisValueAnimation(e,n){const r=this.getAxisMotionValue(e);return dc(this.visualElement,e),r.start(ph(e,r,0,n,this.visualElement,!1))}stopAnimation(){Tt(e=>this.getAxisMotionValue(e).stop())}pauseAnimation(){Tt(e=>{var n;return(n=this.getAxisMotionValue(e).animation)==null?void 0:n.pause()})}getAnimationState(e){var n;return(n=this.getAxisMotionValue(e).animation)==null?void 0:n.state}getAxisMotionValue(e){const n=`_drag${e.toUpperCase()}`,r=this.visualElement.getProps(),s=r[n];return s||this.visualElement.getValue(e,(r.initial?r.initial[e]:void 0)||0)}snapToCursor(e){Tt(n=>{const{drag:r}=this.getProps();if(!fo(n,r,this.currentDirection))return;const{projection:s}=this.visualElement,i=this.getAxisMotionValue(n);if(s&&s.layout){const{min:o,max:l}=s.layout.layoutBox[n];i.set(e[n]-ge(o,l,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:e,dragConstraints:n}=this.getProps(),{projection:r}=this.visualElement;if(!jr(n)||!r||!this.constraints)return;this.stopAnimation();const s={x:0,y:0};Tt(o=>{const l=this.getAxisMotionValue(o);if(l&&this.constraints!==!1){const c=l.get();s[o]=l1({min:c,max:c},this.constraints[o])}});const{transformTemplate:i}=this.visualElement.getProps();this.visualElement.current.style.transform=i?i({},""):"none",r.root&&r.root.updateScroll(),r.updateLayout(),this.resolveConstraints(),Tt(o=>{if(!fo(o,e,null))return;const l=this.getAxisMotionValue(o),{min:c,max:u}=this.constraints[o];l.set(ge(c,u,s[o]))})}addListeners(){if(!this.visualElement.current)return;h1.set(this.visualElement,this);const e=this.visualElement.current,n=zs(e,"pointerdown",c=>{const{drag:u,dragListener:h=!0}=this.getProps();u&&h&&this.start(c)}),r=()=>{const{dragConstraints:c}=this.getProps();jr(c)&&c.current&&(this.constraints=this.resolveRefConstraints())},{projection:s}=this.visualElement,i=s.addEventListener("measure",r);s&&!s.layout&&(s.root&&s.root.updateScroll(),s.updateLayout()),de.read(r);const o=yi(window,"resize",()=>this.scalePositionWithinConstraints()),l=s.addEventListener("didUpdate",({delta:c,hasLayoutChanged:u})=>{this.isDragging&&u&&(Tt(h=>{const f=this.getAxisMotionValue(h);f&&(this.originPoint[h]+=c[h].translate,f.set(f.get()+c[h].translate))}),this.visualElement.render())});return()=>{o(),n(),i(),l&&l()}}getProps(){const e=this.visualElement.getProps(),{drag:n=!1,dragDirectionLock:r=!1,dragPropagation:s=!1,dragConstraints:i=!1,dragElastic:o=xc,dragMomentum:l=!0}=e;return{...e,drag:n,dragDirectionLock:r,dragPropagation:s,dragConstraints:i,dragElastic:o,dragMomentum:l}}}function fo(t,e,n){return(e===!0||e===t)&&(n===null||n===t)}function f1(t,e=10){let n=null;return Math.abs(t.y)>e?n="y":Math.abs(t.x)>e&&(n="x"),n}class p1 extends Kn{constructor(e){super(e),this.removeGroupControls=bt,this.removeListeners=bt,this.controls=new d1(e)}mount(){const{dragControls:e}=this.node.getProps();e&&(this.removeGroupControls=e.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||bt}unmount(){this.removeGroupControls(),this.removeListeners()}}const nm=t=>(e,n)=>{t&&de.postRender(()=>t(e,n))};class m1 extends Kn{constructor(){super(...arguments),this.removePointerDownListener=bt}onPointerDown(e){this.session=new i0(e,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:s0(this.node)})}createPanHandlers(){const{onPanSessionStart:e,onPanStart:n,onPan:r,onPanEnd:s}=this.node.getProps();return{onSessionStart:nm(e),onStart:nm(n),onMove:r,onEnd:(i,o)=>{delete this.session,s&&de.postRender(()=>s(i,o))}}}mount(){this.removePointerDownListener=zs(this.node.current,"pointerdown",e=>this.onPointerDown(e))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}const Ao={hasAnimatedSinceResize:!0,hasEverUpdated:!1};function rm(t,e){return e.max===e.min?0:t/(e.max-e.min)*100}const Ps={correct:(t,e)=>{if(!e.target)return t;if(typeof t=="string")if(G.test(t))t=parseFloat(t);else return t;const n=rm(t,e.target.x),r=rm(t,e.target.y);return`${n}% ${r}%`}},g1={correct:(t,{treeScale:e,projectionDelta:n})=>{const r=t,s=Bn.parse(t);if(s.length>5)return r;const i=Bn.createTransformer(t),o=typeof s[0]!="number"?1:0,l=n.x.scale*e.x,c=n.y.scale*e.y;s[0+o]/=l,s[1+o]/=c;const u=ge(l,c,.5);return typeof s[2+o]=="number"&&(s[2+o]/=u),typeof s[3+o]=="number"&&(s[3+o]/=u),i(s)}};class y1 extends S.Component{componentDidMount(){const{visualElement:e,layoutGroup:n,switchLayoutGroup:r,layoutId:s}=this.props,{projection:i}=e;VC(_1),i&&(n.group&&n.group.add(i),r&&r.register&&s&&r.register(i),i.root.didUpdate(),i.addEventListener("animationComplete",()=>{this.safeToRemove()}),i.setOptions({...i.options,onExitComplete:()=>this.safeToRemove()})),Ao.hasEverUpdated=!0}getSnapshotBeforeUpdate(e){const{layoutDependency:n,visualElement:r,drag:s,isPresent:i}=this.props,o=r.projection;return o&&(o.isPresent=i,s||e.layoutDependency!==n||n===void 0||e.isPresent!==i?o.willUpdate():this.safeToRemove(),e.isPresent!==i&&(i?o.promote():o.relegate()||de.postRender(()=>{const l=o.getStack();(!l||!l.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{projection:e}=this.props.visualElement;e&&(e.root.didUpdate(),Hu.postRender(()=>{!e.currentAnimation&&e.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:e,layoutGroup:n,switchLayoutGroup:r}=this.props,{projection:s}=e;s&&(s.scheduleCheckAfterUnmount(),n&&n.group&&n.group.remove(s),r&&r.deregister&&r.deregister(s))}safeToRemove(){const{safeToRemove:e}=this.props;e&&e()}render(){return null}}function a0(t){const[e,n]=z_(),r=S.useContext(Vu);return m.jsx(y1,{...t,layoutGroup:r,switchLayoutGroup:S.useContext(iv),isPresent:e,safeToRemove:n})}const _1={borderRadius:{...Ps,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:Ps,borderTopRightRadius:Ps,borderBottomLeftRadius:Ps,borderBottomRightRadius:Ps,boxShadow:g1};function v1(t,e,n){const r=tt(t)?t:hi(t);return r.start(ph("",r,e,n)),r.animation}function w1(t){return t instanceof SVGElement&&t.tagName!=="svg"}const T1=(t,e)=>t.depth-e.depth;class E1{constructor(){this.children=[],this.isDirty=!1}add(e){ju(this.children,e),this.isDirty=!0}remove(e){Uu(this.children,e),this.isDirty=!0}forEach(e){this.isDirty&&this.children.sort(T1),this.isDirty=!1,this.children.forEach(e)}}function b1(t,e){const n=$t.now(),r=({timestamp:s})=>{const i=s-n;i>=e&&(Fn(r),t(i-e))};return de.read(r,!0),()=>Fn(r)}const l0=["TopLeft","TopRight","BottomLeft","BottomRight"],I1=l0.length,sm=t=>typeof t=="string"?parseFloat(t):t,im=t=>typeof t=="number"||G.test(t);function x1(t,e,n,r,s,i){s?(t.opacity=ge(0,n.opacity??1,A1(r)),t.opacityExit=ge(e.opacity??1,0,S1(r))):i&&(t.opacity=ge(e.opacity??1,n.opacity??1,r));for(let o=0;o<I1;o++){const l=`border${l0[o]}Radius`;let c=om(e,l),u=om(n,l);if(c===void 0&&u===void 0)continue;c||(c=0),u||(u=0),c===0||u===0||im(c)===im(u)?(t[l]=Math.max(ge(sm(c),sm(u),r),0),(qt.test(u)||qt.test(c))&&(t[l]+="%")):t[l]=u}(e.rotate||n.rotate)&&(t.rotate=ge(e.rotate||0,n.rotate||0,r))}function om(t,e){return t[e]!==void 0?t[e]:t.borderRadius}const A1=c0(0,.5,Av),S1=c0(.5,.95,bt);function c0(t,e,n){return r=>r<t?0:r>e?1:n(ci(t,e,r))}function am(t,e){t.min=e.min,t.max=e.max}function wt(t,e){am(t.x,e.x),am(t.y,e.y)}function lm(t,e){t.translate=e.translate,t.scale=e.scale,t.originPoint=e.originPoint,t.origin=e.origin}function cm(t,e,n,r,s){return t-=e,t=ea(t,1/n,r),s!==void 0&&(t=ea(t,1/s,r)),t}function R1(t,e=0,n=1,r=.5,s,i=t,o=t){if(qt.test(e)&&(e=parseFloat(e),e=ge(o.min,o.max,e/100)-o.min),typeof e!="number")return;let l=ge(i.min,i.max,r);t===i&&(l-=e),t.min=cm(t.min,e,n,l,s),t.max=cm(t.max,e,n,l,s)}function um(t,e,[n,r,s],i,o){R1(t,e[n],e[r],e[s],e.scale,i,o)}const P1=["x","scaleX","originX"],C1=["y","scaleY","originY"];function hm(t,e,n,r){um(t.x,e,P1,n?n.x:void 0,r?r.x:void 0),um(t.y,e,C1,n?n.y:void 0,r?r.y:void 0)}function dm(t){return t.translate===0&&t.scale===1}function u0(t){return dm(t.x)&&dm(t.y)}function fm(t,e){return t.min===e.min&&t.max===e.max}function k1(t,e){return fm(t.x,e.x)&&fm(t.y,e.y)}function pm(t,e){return Math.round(t.min)===Math.round(e.min)&&Math.round(t.max)===Math.round(e.max)}function h0(t,e){return pm(t.x,e.x)&&pm(t.y,e.y)}function mm(t){return at(t.x)/at(t.y)}function gm(t,e){return t.translate===e.translate&&t.scale===e.scale&&t.originPoint===e.originPoint}class N1{constructor(){this.members=[]}add(e){ju(this.members,e),e.scheduleRender()}remove(e){if(Uu(this.members,e),e===this.prevLead&&(this.prevLead=void 0),e===this.lead){const n=this.members[this.members.length-1];n&&this.promote(n)}}relegate(e){const n=this.members.findIndex(s=>e===s);if(n===0)return!1;let r;for(let s=n;s>=0;s--){const i=this.members[s];if(i.isPresent!==!1){r=i;break}}return r?(this.promote(r),!0):!1}promote(e,n){const r=this.lead;if(e!==r&&(this.prevLead=r,this.lead=e,e.show(),r)){r.instance&&r.scheduleRender(),e.scheduleRender(),e.resumeFrom=r,n&&(e.resumeFrom.preserveOpacity=!0),r.snapshot&&(e.snapshot=r.snapshot,e.snapshot.latestValues=r.animationValues||r.latestValues),e.root&&e.root.isUpdating&&(e.isLayoutDirty=!0);const{crossfade:s}=e.options;s===!1&&r.hide()}}exitAnimationComplete(){this.members.forEach(e=>{const{options:n,resumingFrom:r}=e;n.onExitComplete&&n.onExitComplete(),r&&r.options.onExitComplete&&r.options.onExitComplete()})}scheduleRender(){this.members.forEach(e=>{e.instance&&e.scheduleRender(!1)})}removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}function D1(t,e,n){let r="";const s=t.x.translate/e.x,i=t.y.translate/e.y,o=(n==null?void 0:n.z)||0;if((s||i||o)&&(r=`translate3d(${s}px, ${i}px, ${o}px) `),(e.x!==1||e.y!==1)&&(r+=`scale(${1/e.x}, ${1/e.y}) `),n){const{transformPerspective:u,rotate:h,rotateX:f,rotateY:g,skewX:_,skewY:T}=n;u&&(r=`perspective(${u}px) ${r}`),h&&(r+=`rotate(${h}deg) `),f&&(r+=`rotateX(${f}deg) `),g&&(r+=`rotateY(${g}deg) `),_&&(r+=`skewX(${_}deg) `),T&&(r+=`skewY(${T}deg) `)}const l=t.x.scale*e.x,c=t.y.scale*e.y;return(l!==1||c!==1)&&(r+=`scale(${l}, ${c})`),r||"none"}const Il=["","X","Y","Z"],V1={visibility:"hidden"},ym=1e3;let O1=0;function xl(t,e,n,r){const{latestValues:s}=e;s[t]&&(n[t]=s[t],e.setStaticValue(t,0),r&&(r[t]=0))}function d0(t){if(t.hasCheckedOptimisedAppear=!0,t.root===t)return;const{visualElement:e}=t.options;if(!e)return;const n=vv(e);if(window.MotionHasOptimisedAnimation(n,"transform")){const{layout:s,layoutId:i}=t.options;window.MotionCancelOptimisedAnimation(n,"transform",de,!(s||i))}const{parent:r}=t;r&&!r.hasCheckedOptimisedAppear&&d0(r)}function f0({attachResizeListener:t,defaultParent:e,measureScroll:n,checkIsScrollRoot:r,resetTransform:s}){return class{constructor(o={},l=e==null?void 0:e()){this.id=O1++,this.animationId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(j1),this.nodes.forEach(q1),this.nodes.forEach(W1),this.nodes.forEach(U1)},this.resolvedRelativeTargetAt=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=o,this.root=l?l.root||l:this,this.path=l?[...l.path,l]:[],this.parent=l,this.depth=l?l.depth+1:0;for(let c=0;c<this.path.length;c++)this.path[c].shouldResetTransform=!0;this.root===this&&(this.nodes=new E1)}addEventListener(o,l){return this.eventHandlers.has(o)||this.eventHandlers.set(o,new Bu),this.eventHandlers.get(o).add(l)}notifyListeners(o,...l){const c=this.eventHandlers.get(o);c&&c.notify(...l)}hasListeners(o){return this.eventHandlers.has(o)}mount(o,l=this.root.hasTreeAnimated){if(this.instance)return;this.isSVG=w1(o),this.instance=o;const{layoutId:c,layout:u,visualElement:h}=this.options;if(h&&!h.current&&h.mount(o),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),l&&(u||c)&&(this.isLayoutDirty=!0),t){let f;const g=()=>this.root.updateBlockedByResize=!1;t(o,()=>{this.root.updateBlockedByResize=!0,f&&f(),f=b1(g,250),Ao.hasAnimatedSinceResize&&(Ao.hasAnimatedSinceResize=!1,this.nodes.forEach(vm))})}c&&this.root.registerSharedNode(c,this),this.options.animate!==!1&&h&&(c||u)&&this.addEventListener("didUpdate",({delta:f,hasLayoutChanged:g,hasRelativeLayoutChanged:_,layout:T})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const R=this.options.transition||h.getDefaultTransition()||Q1,{onLayoutAnimationStart:I,onLayoutAnimationComplete:C}=h.getProps(),V=!this.targetLayout||!h0(this.targetLayout,T),D=!g&&_;if(this.options.layoutRoot||this.resumeFrom||D||g&&(V||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0),this.setAnimationOrigin(f,D);const B={...Wu(R,"layout"),onPlay:I,onComplete:C};(h.shouldReduceMotion||this.options.layoutRoot)&&(B.delay=0,B.type=!1),this.startAnimation(B)}else g||vm(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=T})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const o=this.getStack();o&&o.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,Fn(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(z1),this.animationId++)}getTransformTemplate(){const{visualElement:o}=this.options;return o&&o.getProps().transformTemplate}willUpdate(o=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&d0(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let h=0;h<this.path.length;h++){const f=this.path[h];f.shouldResetTransform=!0,f.updateScroll("snapshot"),f.options.layoutRoot&&f.willUpdate(!1)}const{layoutId:l,layout:c}=this.options;if(l===void 0&&!c)return;const u=this.getTransformTemplate();this.prevTransformTemplateValue=u?u(this.latestValues,""):void 0,this.updateSnapshot(),o&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){this.unblockUpdate(),this.clearAllSnapshots(),this.nodes.forEach(_m);return}this.isUpdating||this.nodes.forEach(B1),this.isUpdating=!1,this.nodes.forEach($1),this.nodes.forEach(M1),this.nodes.forEach(L1),this.clearAllSnapshots();const l=$t.now();Be.delta=an(0,1e3/60,l-Be.timestamp),Be.timestamp=l,Be.isProcessing=!0,gl.update.process(Be),gl.preRender.process(Be),gl.render.process(Be),Be.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Hu.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(F1),this.sharedNodes.forEach(H1)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,de.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){de.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!at(this.snapshot.measuredBox.x)&&!at(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let c=0;c<this.path.length;c++)this.path[c].updateScroll();const o=this.layout;this.layout=this.measure(!1),this.layoutCorrected=Ae(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:l}=this.options;l&&l.notify("LayoutMeasure",this.layout.layoutBox,o?o.layoutBox:void 0)}updateScroll(o="measure"){let l=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===o&&(l=!1),l){const c=r(this.instance);this.scroll={animationId:this.root.animationId,phase:o,isRoot:c,offset:n(this.instance),wasRoot:this.scroll?this.scroll.isRoot:c}}}resetTransform(){if(!s)return;const o=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,l=this.projectionDelta&&!u0(this.projectionDelta),c=this.getTransformTemplate(),u=c?c(this.latestValues,""):void 0,h=u!==this.prevTransformTemplateValue;o&&(l||nr(this.latestValues)||h)&&(s(this.instance,u),this.shouldResetTransform=!1,this.scheduleRender())}measure(o=!0){const l=this.measurePageBox();let c=this.removeElementScroll(l);return o&&(c=this.removeTransform(c)),X1(c),{animationId:this.root.animationId,measuredBox:l,layoutBox:c,latestValues:{},source:this.id}}measurePageBox(){var u;const{visualElement:o}=this.options;if(!o)return Ae();const l=o.measureViewportBox();if(!(((u=this.scroll)==null?void 0:u.wasRoot)||this.path.some(Y1))){const{scroll:h}=this.root;h&&(Br(l.x,h.offset.x),Br(l.y,h.offset.y))}return l}removeElementScroll(o){var c;const l=Ae();if(wt(l,o),(c=this.scroll)!=null&&c.wasRoot)return l;for(let u=0;u<this.path.length;u++){const h=this.path[u],{scroll:f,options:g}=h;h!==this.root&&f&&g.layoutScroll&&(f.wasRoot&&wt(l,o),Br(l.x,f.offset.x),Br(l.y,f.offset.y))}return l}applyTransform(o,l=!1){const c=Ae();wt(c,o);for(let u=0;u<this.path.length;u++){const h=this.path[u];!l&&h.options.layoutScroll&&h.scroll&&h!==h.root&&$r(c,{x:-h.scroll.offset.x,y:-h.scroll.offset.y}),nr(h.latestValues)&&$r(c,h.latestValues)}return nr(this.latestValues)&&$r(c,this.latestValues),c}removeTransform(o){const l=Ae();wt(l,o);for(let c=0;c<this.path.length;c++){const u=this.path[c];if(!u.instance||!nr(u.latestValues))continue;bc(u.latestValues)&&u.updateSnapshot();const h=Ae(),f=u.measurePageBox();wt(h,f),hm(l,u.latestValues,u.snapshot?u.snapshot.layoutBox:void 0,h)}return nr(this.latestValues)&&hm(l,this.latestValues),l}setTargetDelta(o){this.targetDelta=o,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(o){this.options={...this.options,...o,crossfade:o.crossfade!==void 0?o.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==Be.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(o=!1){var g;const l=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=l.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=l.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=l.isSharedProjectionDirty);const c=!!this.resumingFrom||this!==l;if(!(o||c&&this.isSharedProjectionDirty||this.isProjectionDirty||(g=this.parent)!=null&&g.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:h,layoutId:f}=this.options;if(!(!this.layout||!(h||f))){if(this.resolvedRelativeTargetAt=Be.timestamp,!this.targetDelta&&!this.relativeTarget){const _=this.getClosestProjectingParent();_&&_.layout&&this.animationProgress!==1?(this.relativeParent=_,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Ae(),this.relativeTargetOrigin=Ae(),Ks(this.relativeTargetOrigin,this.layout.layoutBox,_.layout.layoutBox),wt(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}if(!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=Ae(),this.targetWithTransforms=Ae()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),ZN(this.target,this.relativeTarget,this.relativeParent.target)):this.targetDelta?(this.resumingFrom?this.target=this.applyTransform(this.layout.layoutBox):wt(this.target,this.layout.layoutBox),n0(this.target,this.targetDelta)):wt(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget)){this.attemptToResolveRelativeTarget=!1;const _=this.getClosestProjectingParent();_&&!!_.resumingFrom==!!this.resumingFrom&&!_.options.layoutScroll&&_.target&&this.animationProgress!==1?(this.relativeParent=_,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Ae(),this.relativeTargetOrigin=Ae(),Ks(this.relativeTargetOrigin,this.target,_.target),wt(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}}}getClosestProjectingParent(){if(!(!this.parent||bc(this.parent.latestValues)||t0(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){var T;const o=this.getLead(),l=!!this.resumingFrom||this!==o;let c=!0;if((this.isProjectionDirty||(T=this.parent)!=null&&T.isProjectionDirty)&&(c=!1),l&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(c=!1),this.resolvedRelativeTargetAt===Be.timestamp&&(c=!1),c)return;const{layout:u,layoutId:h}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(u||h))return;wt(this.layoutCorrected,this.layout.layoutBox);const f=this.treeScale.x,g=this.treeScale.y;e1(this.layoutCorrected,this.treeScale,this.path,l),o.layout&&!o.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(o.target=o.layout.layoutBox,o.targetWithTransforms=Ae());const{target:_}=o;if(!_){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(lm(this.prevProjectionDelta.x,this.projectionDelta.x),lm(this.prevProjectionDelta.y,this.projectionDelta.y)),Hs(this.projectionDelta,this.layoutCorrected,_,this.latestValues),(this.treeScale.x!==f||this.treeScale.y!==g||!gm(this.projectionDelta.x,this.prevProjectionDelta.x)||!gm(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",_))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(o=!0){var l;if((l=this.options.visualElement)==null||l.scheduleRender(),o){const c=this.getStack();c&&c.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Fr(),this.projectionDelta=Fr(),this.projectionDeltaWithTransform=Fr()}setAnimationOrigin(o,l=!1){const c=this.snapshot,u=c?c.latestValues:{},h={...this.latestValues},f=Fr();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!l;const g=Ae(),_=c?c.source:void 0,T=this.layout?this.layout.source:void 0,R=_!==T,I=this.getStack(),C=!I||I.members.length<=1,V=!!(R&&!C&&this.options.crossfade===!0&&!this.path.some(G1));this.animationProgress=0;let D;this.mixTargetDelta=B=>{const L=B/1e3;wm(f.x,o.x,L),wm(f.y,o.y,L),this.setTargetDelta(f),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(Ks(g,this.layout.layoutBox,this.relativeParent.layout.layoutBox),K1(this.relativeTarget,this.relativeTargetOrigin,g,L),D&&k1(this.relativeTarget,D)&&(this.isProjectionDirty=!1),D||(D=Ae()),wt(D,this.relativeTarget)),R&&(this.animationValues=h,x1(h,u,this.latestValues,L,V,C)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=L},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(o){this.notifyListeners("animationStart"),this.currentAnimation&&this.currentAnimation.stop(),this.resumingFrom&&this.resumingFrom.currentAnimation&&this.resumingFrom.currentAnimation.stop(),this.pendingAnimation&&(Fn(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=de.update(()=>{Ao.hasAnimatedSinceResize=!0,this.currentAnimation=v1(0,ym,{...o,onUpdate:l=>{this.mixTargetDelta(l),o.onUpdate&&o.onUpdate(l)},onStop:()=>{},onComplete:()=>{o.onComplete&&o.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const o=this.getStack();o&&o.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(ym),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const o=this.getLead();let{targetWithTransforms:l,target:c,layout:u,latestValues:h}=o;if(!(!l||!c||!u)){if(this!==o&&this.layout&&u&&p0(this.options.animationType,this.layout.layoutBox,u.layoutBox)){c=this.target||Ae();const f=at(this.layout.layoutBox.x);c.x.min=o.target.x.min,c.x.max=c.x.min+f;const g=at(this.layout.layoutBox.y);c.y.min=o.target.y.min,c.y.max=c.y.min+g}wt(l,c),$r(l,h),Hs(this.projectionDeltaWithTransform,this.layoutCorrected,l,h)}}registerSharedNode(o,l){this.sharedNodes.has(o)||this.sharedNodes.set(o,new N1),this.sharedNodes.get(o).add(l);const u=l.options.initialPromotionConfig;l.promote({transition:u?u.transition:void 0,preserveFollowOpacity:u&&u.shouldPreserveFollowOpacity?u.shouldPreserveFollowOpacity(l):void 0})}isLead(){const o=this.getStack();return o?o.lead===this:!0}getLead(){var l;const{layoutId:o}=this.options;return o?((l=this.getStack())==null?void 0:l.lead)||this:this}getPrevLead(){var l;const{layoutId:o}=this.options;return o?(l=this.getStack())==null?void 0:l.prevLead:void 0}getStack(){const{layoutId:o}=this.options;if(o)return this.root.sharedNodes.get(o)}promote({needsReset:o,transition:l,preserveFollowOpacity:c}={}){const u=this.getStack();u&&u.promote(this,c),o&&(this.projectionDelta=void 0,this.needsReset=!0),l&&this.setOptions({transition:l})}relegate(){const o=this.getStack();return o?o.relegate(this):!1}resetSkewAndRotation(){const{visualElement:o}=this.options;if(!o)return;let l=!1;const{latestValues:c}=o;if((c.z||c.rotate||c.rotateX||c.rotateY||c.rotateZ||c.skewX||c.skewY)&&(l=!0),!l)return;const u={};c.z&&xl("z",o,u,this.animationValues);for(let h=0;h<Il.length;h++)xl(`rotate${Il[h]}`,o,u,this.animationValues),xl(`skew${Il[h]}`,o,u,this.animationValues);o.render();for(const h in u)o.setStaticValue(h,u[h]),this.animationValues&&(this.animationValues[h]=u[h]);o.scheduleRender()}getProjectionStyles(o){if(!this.instance||this.isSVG)return;if(!this.isVisible)return V1;const l={visibility:""},c=this.getTransformTemplate();if(this.needsReset)return this.needsReset=!1,l.opacity="",l.pointerEvents=xo(o==null?void 0:o.pointerEvents)||"",l.transform=c?c(this.latestValues,""):"none",l;const u=this.getLead();if(!this.projectionDelta||!this.layout||!u.target){const _={};return this.options.layoutId&&(_.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,_.pointerEvents=xo(o==null?void 0:o.pointerEvents)||""),this.hasProjected&&!nr(this.latestValues)&&(_.transform=c?c({},""):"none",this.hasProjected=!1),_}const h=u.animationValues||u.latestValues;this.applyTransformsToTarget(),l.transform=D1(this.projectionDeltaWithTransform,this.treeScale,h),c&&(l.transform=c(h,l.transform));const{x:f,y:g}=this.projectionDelta;l.transformOrigin=`${f.origin*100}% ${g.origin*100}% 0`,u.animationValues?l.opacity=u===this?h.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:h.opacityExit:l.opacity=u===this?h.opacity!==void 0?h.opacity:"":h.opacityExit!==void 0?h.opacityExit:0;for(const _ in fi){if(h[_]===void 0)continue;const{correct:T,applyTo:R,isCSSVariable:I}=fi[_],C=l.transform==="none"?h[_]:T(h[_],u);if(R){const V=R.length;for(let D=0;D<V;D++)l[R[D]]=C}else I?this.options.visualElement.renderState.vars[_]=C:l[_]=C}return this.options.layoutId&&(l.pointerEvents=u===this?xo(o==null?void 0:o.pointerEvents)||"":"none"),l}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(o=>{var l;return(l=o.currentAnimation)==null?void 0:l.stop()}),this.root.nodes.forEach(_m),this.root.sharedNodes.clear()}}}function M1(t){t.updateLayout()}function L1(t){var n;const e=((n=t.resumeFrom)==null?void 0:n.snapshot)||t.snapshot;if(t.isLead()&&t.layout&&e&&t.hasListeners("didUpdate")){const{layoutBox:r,measuredBox:s}=t.layout,{animationType:i}=t.options,o=e.source!==t.layout.source;i==="size"?Tt(f=>{const g=o?e.measuredBox[f]:e.layoutBox[f],_=at(g);g.min=r[f].min,g.max=g.min+_}):p0(i,e.layoutBox,r)&&Tt(f=>{const g=o?e.measuredBox[f]:e.layoutBox[f],_=at(r[f]);g.max=g.min+_,t.relativeTarget&&!t.currentAnimation&&(t.isProjectionDirty=!0,t.relativeTarget[f].max=t.relativeTarget[f].min+_)});const l=Fr();Hs(l,r,e.layoutBox);const c=Fr();o?Hs(c,t.applyTransform(s,!0),e.measuredBox):Hs(c,r,e.layoutBox);const u=!u0(l);let h=!1;if(!t.resumeFrom){const f=t.getClosestProjectingParent();if(f&&!f.resumeFrom){const{snapshot:g,layout:_}=f;if(g&&_){const T=Ae();Ks(T,e.layoutBox,g.layoutBox);const R=Ae();Ks(R,r,_.layoutBox),h0(T,R)||(h=!0),f.options.layoutRoot&&(t.relativeTarget=R,t.relativeTargetOrigin=T,t.relativeParent=f)}}}t.notifyListeners("didUpdate",{layout:r,snapshot:e,delta:c,layoutDelta:l,hasLayoutChanged:u,hasRelativeLayoutChanged:h})}else if(t.isLead()){const{onExitComplete:r}=t.options;r&&r()}t.options.transition=void 0}function j1(t){t.parent&&(t.isProjecting()||(t.isProjectionDirty=t.parent.isProjectionDirty),t.isSharedProjectionDirty||(t.isSharedProjectionDirty=!!(t.isProjectionDirty||t.parent.isProjectionDirty||t.parent.isSharedProjectionDirty)),t.isTransformDirty||(t.isTransformDirty=t.parent.isTransformDirty))}function U1(t){t.isProjectionDirty=t.isSharedProjectionDirty=t.isTransformDirty=!1}function F1(t){t.clearSnapshot()}function _m(t){t.clearMeasurements()}function B1(t){t.isLayoutDirty=!1}function $1(t){const{visualElement:e}=t.options;e&&e.getProps().onBeforeLayoutMeasure&&e.notify("BeforeLayoutMeasure"),t.resetTransform()}function vm(t){t.finishAnimation(),t.targetDelta=t.relativeTarget=t.target=void 0,t.isProjectionDirty=!0}function q1(t){t.resolveTargetDelta()}function W1(t){t.calcProjection()}function z1(t){t.resetSkewAndRotation()}function H1(t){t.removeLeadSnapshot()}function wm(t,e,n){t.translate=ge(e.translate,0,n),t.scale=ge(e.scale,1,n),t.origin=e.origin,t.originPoint=e.originPoint}function Tm(t,e,n,r){t.min=ge(e.min,n.min,r),t.max=ge(e.max,n.max,r)}function K1(t,e,n,r){Tm(t.x,e.x,n.x,r),Tm(t.y,e.y,n.y,r)}function G1(t){return t.animationValues&&t.animationValues.opacityExit!==void 0}const Q1={duration:.45,ease:[.4,0,.1,1]},Em=t=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(t),bm=Em("applewebkit/")&&!Em("chrome/")?Math.round:bt;function Im(t){t.min=bm(t.min),t.max=bm(t.max)}function X1(t){Im(t.x),Im(t.y)}function p0(t,e,n){return t==="position"||t==="preserve-aspect"&&!JN(mm(e),mm(n),.2)}function Y1(t){var e;return t!==t.root&&((e=t.scroll)==null?void 0:e.wasRoot)}const J1=f0({attachResizeListener:(t,e)=>yi(t,"resize",e),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),Al={current:void 0},m0=f0({measureScroll:t=>({x:t.scrollLeft,y:t.scrollTop}),defaultParent:()=>{if(!Al.current){const t=new J1({});t.mount(window),t.setOptions({layoutScroll:!0}),Al.current=t}return Al.current},resetTransform:(t,e)=>{t.style.transform=e!==void 0?e:"none"},checkIsScrollRoot:t=>window.getComputedStyle(t).position==="fixed"}),Z1={pan:{Feature:m1},drag:{Feature:p1,ProjectionNode:m0,MeasureLayout:a0}};function xm(t,e,n){const{props:r}=t;t.animationState&&r.whileHover&&t.animationState.setActive("whileHover",n==="Start");const s="onHover"+n,i=r[s];i&&de.postRender(()=>i(e,Di(e)))}class eD extends Kn{mount(){const{current:e}=this.node;e&&(this.unmount=cC(e,(n,r)=>(xm(this.node,r,"Start"),s=>xm(this.node,s,"End"))))}unmount(){}}class tD extends Kn{constructor(){super(...arguments),this.isActive=!1}onFocus(){let e=!1;try{e=this.node.current.matches(":focus-visible")}catch{e=!0}!e||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=Ni(yi(this.node.current,"focus",()=>this.onFocus()),yi(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function Am(t,e,n){const{props:r}=t;if(t.current instanceof HTMLButtonElement&&t.current.disabled)return;t.animationState&&r.whileTap&&t.animationState.setActive("whileTap",n==="Start");const s="onTap"+(n==="End"?"":n),i=r[s];i&&de.postRender(()=>i(e,Di(e)))}class nD extends Kn{mount(){const{current:e}=this.node;e&&(this.unmount=fC(e,(n,r)=>(Am(this.node,r,"Start"),(s,{success:i})=>Am(this.node,s,i?"End":"Cancel")),{useGlobalTarget:this.node.props.globalTapTarget}))}unmount(){}}const Ac=new WeakMap,Sl=new WeakMap,rD=t=>{const e=Ac.get(t.target);e&&e(t)},sD=t=>{t.forEach(rD)};function iD({root:t,...e}){const n=t||document;Sl.has(n)||Sl.set(n,{});const r=Sl.get(n),s=JSON.stringify(e);return r[s]||(r[s]=new IntersectionObserver(sD,{root:t,...e})),r[s]}function oD(t,e,n){const r=iD(e);return Ac.set(t,n),r.observe(t),()=>{Ac.delete(t),r.unobserve(t)}}const aD={some:0,all:1};class lD extends Kn{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();const{viewport:e={}}=this.node.getProps(),{root:n,margin:r,amount:s="some",once:i}=e,o={root:n?n.current:void 0,rootMargin:r,threshold:typeof s=="number"?s:aD[s]},l=c=>{const{isIntersecting:u}=c;if(this.isInView===u||(this.isInView=u,i&&!u&&this.hasEnteredView))return;u&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",u);const{onViewportEnter:h,onViewportLeave:f}=this.node.getProps(),g=u?h:f;g&&g(c)};return oD(this.node.current,o,l)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:e,prevProps:n}=this.node;["amount","margin","root"].some(cD(e,n))&&this.startObserver()}unmount(){}}function cD({viewport:t={}},{viewport:e={}}={}){return n=>t[n]!==e[n]}const uD={inView:{Feature:lD},tap:{Feature:nD},focus:{Feature:tD},hover:{Feature:eD}},hD={layout:{ProjectionNode:m0,MeasureLayout:a0}},Sc={current:null},g0={current:!1};function dD(){if(g0.current=!0,!!Mu)if(window.matchMedia){const t=window.matchMedia("(prefers-reduced-motion)"),e=()=>Sc.current=t.matches;t.addListener(e),e()}else Sc.current=!1}const fD=[...Bv,Je,Bn],pD=t=>fD.find(Fv(t)),mD=new WeakMap;function gD(t,e,n){for(const r in e){const s=e[r],i=n[r];if(tt(s))t.addValue(r,s);else if(tt(i))t.addValue(r,hi(s,{owner:t}));else if(i!==s)if(t.hasValue(r)){const o=t.getValue(r);o.liveStyle===!0?o.jump(s):o.hasAnimated||o.set(s)}else{const o=t.getStaticValue(r);t.addValue(r,hi(o!==void 0?o:s,{owner:t}))}}for(const r in n)e[r]===void 0&&t.removeValue(r);return e}const Sm=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];class yD{scrapeMotionValuesFromProps(e,n,r){return{}}constructor({parent:e,props:n,presenceContext:r,reducedMotionConfig:s,blockInitialAnimation:i,visualState:o},l={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=hh,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const _=$t.now();this.renderScheduledAt<_&&(this.renderScheduledAt=_,de.render(this.render,!1,!0))};const{latestValues:c,renderState:u,onUpdate:h}=o;this.onUpdate=h,this.latestValues=c,this.baseTarget={...c},this.initialValues=n.initial?{...c}:{},this.renderState=u,this.parent=e,this.props=n,this.presenceContext=r,this.depth=e?e.depth+1:0,this.reducedMotionConfig=s,this.options=l,this.blockInitialAnimation=!!i,this.isControllingVariants=Ma(n),this.isVariantNode=rv(n),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(e&&e.current);const{willChange:f,...g}=this.scrapeMotionValuesFromProps(n,{},this);for(const _ in g){const T=g[_];c[_]!==void 0&&tt(T)&&T.set(c[_],!1)}}mount(e){this.current=e,mD.set(e,this),this.projection&&!this.projection.instance&&this.projection.mount(e),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((n,r)=>this.bindToMotionValue(r,n)),g0.current||dD(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:Sc.current,this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){this.projection&&this.projection.unmount(),Fn(this.notifyUpdate),Fn(this.render),this.valueSubscriptions.forEach(e=>e()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(const e in this.events)this.events[e].clear();for(const e in this.features){const n=this.features[e];n&&(n.unmount(),n.isMounted=!1)}this.current=null}bindToMotionValue(e,n){this.valueSubscriptions.has(e)&&this.valueSubscriptions.get(e)();const r=Tr.has(e);r&&this.onBindTransform&&this.onBindTransform();const s=n.on("change",l=>{this.latestValues[e]=l,this.props.onUpdate&&de.preRender(this.notifyUpdate),r&&this.projection&&(this.projection.isTransformDirty=!0)}),i=n.on("renderRequest",this.scheduleRender);let o;window.MotionCheckAppearSync&&(o=window.MotionCheckAppearSync(this,e,n)),this.valueSubscriptions.set(e,()=>{s(),i(),o&&o(),n.owner&&n.stop()})}sortNodePosition(e){return!this.current||!this.sortInstanceNodePosition||this.type!==e.type?0:this.sortInstanceNodePosition(this.current,e.current)}updateFeatures(){let e="animation";for(e in es){const n=es[e];if(!n)continue;const{isEnabled:r,Feature:s}=n;if(!this.features[e]&&s&&r(this.props)&&(this.features[e]=new s(this)),this.features[e]){const i=this.features[e];i.isMounted?i.update():(i.mount(),i.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):Ae()}getStaticValue(e){return this.latestValues[e]}setStaticValue(e,n){this.latestValues[e]=n}update(e,n){(e.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=e,this.prevPresenceContext=this.presenceContext,this.presenceContext=n;for(let r=0;r<Sm.length;r++){const s=Sm[r];this.propEventSubscriptions[s]&&(this.propEventSubscriptions[s](),delete this.propEventSubscriptions[s]);const i="on"+s,o=e[i];o&&(this.propEventSubscriptions[s]=this.on(s,o))}this.prevMotionValues=gD(this,this.scrapeMotionValuesFromProps(e,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue(),this.onUpdate&&this.onUpdate(this)}getProps(){return this.props}getVariant(e){return this.props.variants?this.props.variants[e]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(e){const n=this.getClosestVariantNode();if(n)return n.variantChildren&&n.variantChildren.add(e),()=>n.variantChildren.delete(e)}addValue(e,n){const r=this.values.get(e);n!==r&&(r&&this.removeValue(e),this.bindToMotionValue(e,n),this.values.set(e,n),this.latestValues[e]=n.get())}removeValue(e){this.values.delete(e);const n=this.valueSubscriptions.get(e);n&&(n(),this.valueSubscriptions.delete(e)),delete this.latestValues[e],this.removeValueFromRenderState(e,this.renderState)}hasValue(e){return this.values.has(e)}getValue(e,n){if(this.props.values&&this.props.values[e])return this.props.values[e];let r=this.values.get(e);return r===void 0&&n!==void 0&&(r=hi(n===null?void 0:n,{owner:this}),this.addValue(e,r)),r}readValue(e,n){let r=this.latestValues[e]!==void 0||!this.current?this.latestValues[e]:this.getBaseTargetFromProps(this.props,e)??this.readValueFromInstance(this.current,e,this.options);return r!=null&&(typeof r=="string"&&(jv(r)||Rv(r))?r=parseFloat(r):!pD(r)&&Bn.test(n)&&(r=Ov(e,n)),this.setBaseTarget(e,tt(r)?r.get():r)),tt(r)?r.get():r}setBaseTarget(e,n){this.baseTarget[e]=n}getBaseTarget(e){var i;const{initial:n}=this.props;let r;if(typeof n=="string"||typeof n=="object"){const o=ih(this.props,n,(i=this.presenceContext)==null?void 0:i.custom);o&&(r=o[e])}if(n&&r!==void 0)return r;const s=this.getBaseTargetFromProps(this.props,e);return s!==void 0&&!tt(s)?s:this.initialValues[e]!==void 0&&r===void 0?void 0:this.baseTarget[e]}on(e,n){return this.events[e]||(this.events[e]=new Bu),this.events[e].add(n)}notify(e,...n){this.events[e]&&this.events[e].notify(...n)}}class y0 extends yD{constructor(){super(...arguments),this.KeyframeResolver=$v}sortInstanceNodePosition(e,n){return e.compareDocumentPosition(n)&2?1:-1}getBaseTargetFromProps(e,n){return e.style?e.style[n]:void 0}removeValueFromRenderState(e,{vars:n,style:r}){delete n[e],delete r[e]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:e}=this.props;tt(e)&&(this.childSubscription=e.on("change",n=>{this.current&&(this.current.textContent=`${n}`)}))}}function _D(t){return window.getComputedStyle(t)}class vD extends y0{constructor(){super(...arguments),this.type="html",this.renderInstance=pv}readValueFromInstance(e,n){if(Tr.has(n))return kk(e,n);{const r=_D(e),s=(Yu(n)?r.getPropertyValue(n):r[n])||0;return typeof s=="string"?s.trim():s}}measureInstanceViewportBox(e,{transformPagePoint:n}){return r0(e,n)}build(e,n,r){eh(e,n,r.transformTemplate)}scrapeMotionValuesFromProps(e,n,r){return oh(e,n,r)}}class wD extends y0{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=Ae,this.updateDimensions=()=>{this.current&&!this.renderState.dimensions&&fv(this.current,this.renderState)}}getBaseTargetFromProps(e,n){return e[n]}readValueFromInstance(e,n){if(Tr.has(n)){const r=Vv(n);return r&&r.default||0}return n=mv.has(n)?n:Xu(n),e.getAttribute(n)}scrapeMotionValuesFromProps(e,n,r){return yv(e,n,r)}onBindTransform(){this.current&&!this.renderState.dimensions&&de.postRender(this.updateDimensions)}build(e,n,r){rh(e,n,this.isSVGTag,r.transformTemplate)}renderInstance(e,n,r,s){gv(e,n,r,s)}mount(e){this.isSVGTag=sh(e.tagName),super.mount(e)}}const TD=(t,e)=>nh(t)?new wD(e):new vD(e,{allowProjection:t!==S.Fragment}),ED=sk({...WN,...uD,...Z1,...hD},TD),W=wC(ED);var _0={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},Rm=Jt.createContext&&Jt.createContext(_0),bD=["attr","size","title"];function ID(t,e){if(t==null)return{};var n=xD(t,e),r,s;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(s=0;s<i.length;s++)r=i[s],!(e.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}function xD(t,e){if(t==null)return{};var n={};for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r)){if(e.indexOf(r)>=0)continue;n[r]=t[r]}return n}function ta(){return ta=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},ta.apply(this,arguments)}function Pm(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),n.push.apply(n,r)}return n}function na(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Pm(Object(n),!0).forEach(function(r){AD(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Pm(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function AD(t,e,n){return e=SD(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function SD(t){var e=RD(t,"string");return typeof e=="symbol"?e:e+""}function RD(t,e){if(typeof t!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function v0(t){return t&&t.map((e,n)=>Jt.createElement(e.tag,na({key:n},e.attr),v0(e.child)))}function ze(t){return e=>Jt.createElement(PD,ta({attr:na({},t.attr)},e),v0(t.child))}function PD(t){var e=n=>{var{attr:r,size:s,title:i}=t,o=ID(t,bD),l=s||n.size||"1em",c;return n.className&&(c=n.className),t.className&&(c=(c?c+" ":"")+t.className),Jt.createElement("svg",ta({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},n.attr,r,o,{className:c,style:na(na({color:t.color||n.color},n.style),t.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),i&&Jt.createElement("title",null,i),t.children)};return Rm!==void 0?Jt.createElement(Rm.Consumer,null,n=>e(n)):e(_0)}function CD(t){return ze({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"line",attr:{x1:"12",y1:"8",x2:"12",y2:"12"},child:[]},{tag:"line",attr:{x1:"12",y1:"16",x2:"12.01",y2:"16"},child:[]}]})(t)}function w0(t){return ze({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"},child:[]},{tag:"line",attr:{x1:"16",y1:"2",x2:"16",y2:"6"},child:[]},{tag:"line",attr:{x1:"8",y1:"2",x2:"8",y2:"6"},child:[]},{tag:"line",attr:{x1:"3",y1:"10",x2:"21",y2:"10"},child:[]}]})(t)}function So(t){return ze({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"20 6 9 17 4 12"},child:[]}]})(t)}function T0(t){return ze({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"polyline",attr:{points:"12 6 12 12 16 14"},child:[]}]})(t)}function Cm(t){return ze({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"},child:[]},{tag:"circle",attr:{cx:"12",cy:"12",r:"3"},child:[]}]})(t)}function kD(t){return ze({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"},child:[]},{tag:"circle",attr:{cx:"8.5",cy:"8.5",r:"1.5"},child:[]},{tag:"polyline",attr:{points:"21 15 16 10 5 21"},child:[]}]})(t)}function ND(t){return ze({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"line",attr:{x1:"12",y1:"16",x2:"12",y2:"12"},child:[]},{tag:"line",attr:{x1:"12",y1:"8",x2:"12.01",y2:"8"},child:[]}]})(t)}function DD(t){return ze({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"8",y1:"6",x2:"21",y2:"6"},child:[]},{tag:"line",attr:{x1:"8",y1:"12",x2:"21",y2:"12"},child:[]},{tag:"line",attr:{x1:"8",y1:"18",x2:"21",y2:"18"},child:[]},{tag:"line",attr:{x1:"3",y1:"6",x2:"3.01",y2:"6"},child:[]},{tag:"line",attr:{x1:"3",y1:"12",x2:"3.01",y2:"12"},child:[]},{tag:"line",attr:{x1:"3",y1:"18",x2:"3.01",y2:"18"},child:[]}]})(t)}function E0(t){return ze({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"},child:[]},{tag:"polyline",attr:{points:"16 17 21 12 16 7"},child:[]},{tag:"line",attr:{x1:"21",y1:"12",x2:"9",y2:"12"},child:[]}]})(t)}function VD(t){return ze({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"3",y1:"12",x2:"21",y2:"12"},child:[]},{tag:"line",attr:{x1:"3",y1:"6",x2:"21",y2:"6"},child:[]},{tag:"line",attr:{x1:"3",y1:"18",x2:"21",y2:"18"},child:[]}]})(t)}function b0(t){return ze({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"},child:[]}]})(t)}function OD(t){return ze({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"line",attr:{x1:"12",y1:"8",x2:"12",y2:"16"},child:[]},{tag:"line",attr:{x1:"8",y1:"12",x2:"16",y2:"12"},child:[]}]})(t)}function An(t){return ze({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"5"},child:[]},{tag:"line",attr:{x1:"12",y1:"1",x2:"12",y2:"3"},child:[]},{tag:"line",attr:{x1:"12",y1:"21",x2:"12",y2:"23"},child:[]},{tag:"line",attr:{x1:"4.22",y1:"4.22",x2:"5.64",y2:"5.64"},child:[]},{tag:"line",attr:{x1:"18.36",y1:"18.36",x2:"19.78",y2:"19.78"},child:[]},{tag:"line",attr:{x1:"1",y1:"12",x2:"3",y2:"12"},child:[]},{tag:"line",attr:{x1:"21",y1:"12",x2:"23",y2:"12"},child:[]},{tag:"line",attr:{x1:"4.22",y1:"19.78",x2:"5.64",y2:"18.36"},child:[]},{tag:"line",attr:{x1:"18.36",y1:"5.64",x2:"19.78",y2:"4.22"},child:[]}]})(t)}function I0(t){return ze({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"3 6 5 6 21 6"},child:[]},{tag:"path",attr:{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"},child:[]}]})(t)}function MD(t){return ze({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"},child:[]},{tag:"polyline",attr:{points:"17 8 12 3 7 8"},child:[]},{tag:"line",attr:{x1:"12",y1:"3",x2:"12",y2:"15"},child:[]}]})(t)}function LD(t){return ze({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"},child:[]},{tag:"circle",attr:{cx:"8.5",cy:"7",r:"4"},child:[]},{tag:"line",attr:{x1:"20",y1:"8",x2:"20",y2:"14"},child:[]},{tag:"line",attr:{x1:"23",y1:"11",x2:"17",y2:"11"},child:[]}]})(t)}function St(t){return ze({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"18",y1:"6",x2:"6",y2:"18"},child:[]},{tag:"line",attr:{x1:"6",y1:"6",x2:"18",y2:"18"},child:[]}]})(t)}const jD=()=>{const t=ia(),{currentUser:e}=Du();S.useEffect(()=>{if(!e)t("/",{replace:!0});else{window.history.pushState(null,"",window.location.href);const j=()=>{window.history.pushState(null,"",window.location.href)};return window.addEventListener("popstate",j),()=>window.removeEventListener("popstate",j)}},[e,t]);const[n,r]=S.useState(""),[s,i]=S.useState(m.jsx(An,{})),[o,l]=S.useState(""),[c,u]=S.useState(""),[h,f]=S.useState(null),[g,_]=S.useState([]),[T,R]=S.useState(null),[I,C]=S.useState(null),[V,D]=S.useState(!1),[B,L]=S.useState(!1),[U,b]=S.useState(!1),[v,w]=S.useState(!1),[x,A]=S.useState(!1),[P,E]=S.useState([]),[Le,kt]=S.useState([]),[Er,ue]=S.useState(!0),[Re,lt]=S.useState({show:!1,taskId:""}),[ct,br]=S.useState({title:"",description:"",userId:"",deadline:""}),[He,Ie]=S.useState({email:"",password:"",nama:"",nik:"",role:"user"}),[ln,_t]=S.useState(null),[Ir,ft]=S.useState(null),[F,Y]=S.useState(null);S.useEffect(()=>{const j=()=>{const ne=new Date,te=ne.getHours();te<12?(r("Selamat Pagi"),i(m.jsx(An,{className:"text-yellow-400"}))):te<15?(r("Selamat Siang"),i(m.jsx(An,{className:"text-yellow-500"}))):te<18?(r("Selamat Sore"),i(m.jsx(An,{className:"text-orange-500"}))):(r("Selamat Malam"),i(m.jsx(b0,{className:"text-blue-300"})));const Ve={weekday:"long",day:"numeric",month:"long",year:"numeric"},ae=ne.toLocaleDateString("id-ID",Ve),Ge=ae.charAt(0).toUpperCase()+ae.slice(1);l(Ge);const Ue=String(ne.getHours()).padStart(2,"0"),Ne=String(ne.getMinutes()).padStart(2,"0");u(`${Ue}.${Ne}`)};j();const q=setInterval(j,6e4);return()=>clearInterval(q)},[]),S.useEffect(()=>{const j=Fc(Nn,async q=>{var ne;if(!q){t("/");return}try{const te=await li(Dt(Oe,"users",q.uid));((ne=te.data())==null?void 0:ne.role)!=="admin"?t("/user-dashboard"):f({...te.data(),uid:q.uid})}catch(te){console.error("Error checking user role:",te),t("/")}finally{ue(!1)}});return()=>j()},[t]),S.useEffect(()=>{(async()=>{try{const q=Lr(Qt(Oe,"users"),En("role","==","user")),ne=oo(q,te=>{const Ve=te.docs.map(ae=>({id:ae.id,...ae.data(),name:ae.data().nama||ae.data().name||"Unknown User"}));console.log("Users data:",Ve),kt(Ve)});return()=>ne()}catch(q){console.error("Error fetching users:",q)}})()},[]),S.useEffect(()=>{(async()=>{try{ue(!0);const q=oo(Lr(Qt(Oe,"users"),En("role","==","user")),async ne=>{console.log("Users snapshot size:",ne.size);const te={};ne.forEach(ae=>{const Ge=ae.data();te[ae.id]={id:ae.id,name:Ge.nama||Ge.name||"Unknown User",nik:Ge.nik||"N/A",progress:0,tasks:[]}});const Ve=oo(Qt(Oe,"tasks"),ae=>{console.log("Tasks snapshot size:",ae.size),Object.keys(te).forEach(Ue=>{te[Ue].tasks=[]}),ae.forEach(Ue=>{const Ne=Ue.data(),hn=Ne.assignedTo;if(te[hn]){let Qn="Unknown Date";Ne.timestamp&&(typeof Ne.timestamp.toDate=="function"?Qn=Ne.timestamp.toDate().toLocaleString():typeof Ne.timestamp=="string"&&(Qn=new Date(Ne.timestamp).toLocaleString())),te[hn].tasks.push({id:Ue.id,title:Ne.title,status:Ne.status,timestamp:Ne.timestamp,submissionId:Ne.submissionId})}});const Ge=Object.values(te).map(Ue=>{const Ne=Ue.tasks.length,hn=Ue.tasks.filter(Mi=>Mi.status==="selesai").length,Qn=Ne>0?Math.round(hn/Ne*100):0;return{...Ue,progress:Qn}});if(console.log("Performance data calculated:",Ge),_(Ge),T){const Ue=Ge.find(Ne=>Ne.id===T.id);Ue&&R(Ue)}ue(!1)});return()=>{Ve()}});return()=>{q()}}catch(q){console.error("Error setting up real-time data:",q),ue(!1)}})()},[T==null?void 0:T.id]),S.useEffect(()=>{x&&(async()=>{try{const q=Lr(Qt(Oe,"submissions"),En("status","==","reviewed"),__("submittedAt","desc")),ne=oo(q,te=>{const Ve=te.docs.map(ae=>({id:ae.id,...ae.data(),taskId:ae.data().taskId||"",taskTitle:ae.data().taskTitle||"Unknown Task",userId:ae.data().userId||"",userName:ae.data().userName||"Unknown User",images:ae.data().images||[],caption:ae.data().caption||"",submittedAt:ae.data().submittedAt||new Date().toISOString(),status:ae.data().status}));E(Ve)});return()=>ne()}catch(q){console.error("Error fetching completed submissions:",q)}})()},[x]);const fe=j=>{const{name:q,value:ne}=j.target;br(te=>({...te,[q]:ne}))},le=j=>{const{name:q,value:ne}=j.target;Ie(te=>({...te,[q]:ne}))},Ke=async j=>{j.preventDefault(),_t(null);try{const{title:q,description:ne,userId:te,deadline:Ve}=ct;if(!q||!te||!Ve){_t("Semua field harus diisi!");return}const ae=Lr(Qt(Oe,"tasks"),En("assignedTo","==",te),En("status","==","belum"));if((await ac(ae)).size>=10){_t("User ini sudah memiliki 10 tugas aktif. Harap tunggu hingga beberapa tugas selesai.");return}const Ue=new Date(Ve);await I_(Qt(Oe,"tasks"),{title:q,description:ne||"",assignedTo:te,status:"belum",timestamp:Te.fromDate(Ue),createdAt:Te.now()}),br({title:"",description:"",userId:"",deadline:""}),D(!1)}catch(q){console.error("Gagal menambahkan tugas:",q),_t("Terjadi kesalahan saat menambahkan tugas")}},cn=async j=>{j.preventDefault(),ft(null),Y(null);try{const{email:q,password:ne,nama:te,nik:Ve}=He;if(!q||!ne||!te||!Ve){ft("Semua field harus diisi!");return}const Ge=(await nI(Nn,q,ne)).user.uid;await SR(Dt(Oe,"users",Ge),{nama:te,nik:Ve,email:q,role:"user",createdAt:PR()}),Ie({email:"",password:"",nama:"",nik:"",role:"user"}),Y("Akun user berhasil dibuat!"),setTimeout(()=>{L(!1),Y(null)},3e3)}catch(q){console.error("Gagal membuat user:",q),q.code==="auth/email-already-in-use"?ft("Email sudah digunakan. Gunakan email lain."):q.code==="auth/invalid-email"?ft("Format email tidak valid."):q.code==="auth/weak-password"?ft("Password terlalu lemah. Gunakan minimal 6 karakter."):ft("Terjadi kesalahan saat membuat akun.")}},vt=async j=>{try{await RR(Dt(Oe,"tasks",j)),lt({show:!1,taskId:""}),T&&R({...T,tasks:T.tasks.filter(q=>q.id!==j)})}catch(q){console.error("Error deleting task:",q)}},It=async j=>{try{const q=await li(Dt(Oe,"submissions",j));if(q.exists()){const ne=q.data();C({id:q.id,taskId:ne.taskId||"",taskTitle:ne.taskTitle||"Tugas Kebersihan",userId:ne.userId||"",userName:ne.userName||"Unknown User",images:ne.images||[],caption:ne.caption||"",submittedAt:ne.submittedAt||new Date().toISOString(),status:ne.status||"submitted"}),w(!0)}else console.error("Submission not found")}catch(q){console.error("Error fetching submission:",q)}},Gn=async j=>{try{await b_(Dt(Oe,"submissions",j),{status:"reviewed",reviewedAt:new Date().toISOString()}),w(!1),C(null)}catch(q){console.error("Error updating submission status:",q)}},hs=async()=>{try{await Vg(Nn),t("/")}catch(j){console.error("Error signing out:",j)}},ds=j=>{if(!j)return"Tidak ada tanggal";try{let q;if(j!=null&&j.toDate&&typeof j.toDate=="function")q=j.toDate();else if(j instanceof Date)q=j;else if(typeof j=="string")q=new Date(j);else return"Format tanggal tidak valid";return q.toLocaleString("id-ID",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch(q){return console.error("Error formatting timestamp:",q),"Format tanggal tidak valid"}},xr=j=>j>=80?"bg-green-500":j>=50?"bg-yellow-400":"bg-red-500",un=()=>{b(!U),U||(D(!1),L(!1),A(!1))},Vi=()=>{D(!0),b(!1),L(!1),A(!1)},ja=()=>{L(!0),b(!1),D(!1),A(!1)},fs=()=>{A(!0),b(!1),D(!1),L(!1)},ps={hidden:{opacity:0},visible:{opacity:1,transition:{duration:.5}}},Oi={hidden:{y:50,opacity:0},visible:{y:0,opacity:1,transition:{duration:.5}}},xe={hidden:{height:0,opacity:0},visible:{height:"auto",opacity:1,transition:{duration:.3}}},je={hidden:{x:-300,opacity:0},visible:{x:0,opacity:1,transition:{duration:.3}}},Ar=()=>m.jsx("div",{className:"particles-container absolute inset-0 z-0 overflow-hidden",children:Array.from({length:20}).map((j,q)=>m.jsx(W.div,{className:"absolute bg-purple-500 opacity-10 rounded-full",style:{width:Math.floor(Math.random()*10)+5,height:Math.floor(Math.random()*10)+5,top:`${Math.random()*100}%`,left:`${Math.random()*100}%`},animate:{x:[0,Math.random()*100-50],y:[0,Math.random()*100-50],opacity:[.1,.3,.1]},transition:{duration:Math.random()*10+10,repeat:1/0,repeatType:"reverse"}},q))});return Er?m.jsx("div",{className:"min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 flex items-center justify-center",children:m.jsxs("div",{className:"text-center text-white",children:[m.jsx("div",{className:"w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-spin mx-auto mb-4"}),m.jsx("p",{className:"text-purple-300",children:"Loading..."})]})}):m.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white p-6 relative",children:[m.jsx(Ar,{}),m.jsxs(W.div,{className:"z-10 relative flex justify-between items-start",initial:"hidden",animate:"visible",variants:ps,children:[m.jsxs("div",{children:[m.jsxs("div",{className:"flex items-center space-x-3 mb-2",children:[m.jsx(W.span,{className:"text-4xl",animate:{rotate:[0,15,0]},transition:{duration:2,repeat:1/0,ease:"easeInOut"},children:s}),m.jsx("h1",{className:"text-2xl font-bold text-purple-300",children:n})]}),m.jsxs("h2",{className:"text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300",children:["Selamat Datang ",(h==null?void 0:h.nama)||"Admin"]})]}),m.jsxs("div",{className:"flex items-center space-x-3",children:[m.jsx(W.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:un,className:`bg-purple-600/80 hover:bg-purple-700 p-3 rounded-lg flex items-center space-x-2 relative ${U?"bg-purple-700":""}`,children:m.jsx(VD,{className:"text-white text-xl"})}),m.jsxs(W.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:hs,className:"bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center space-x-2 text-sm",children:[m.jsx(E0,{}),m.jsx("span",{children:"Logout"})]})]})]}),m.jsx(Gt,{children:U&&m.jsx(W.div,{className:"fixed top-0 left-0 h-full w-64 bg-gray-900/95 backdrop-blur-md z-50 shadow-xl border-r border-purple-500/20 p-6",initial:"hidden",animate:"visible",exit:"hidden",variants:je,children:m.jsxs("div",{className:"flex flex-col h-full",children:[m.jsxs("div",{className:"flex justify-between items-center mb-8",children:[m.jsx("h2",{className:"text-lg font-semibold text-purple-300",children:"Menu Admin"}),m.jsx(W.button,{whileTap:{scale:.9},onClick:un,className:"text-gray-400 hover:text-white",children:m.jsx(St,{size:20})})]}),m.jsxs("div",{className:"space-y-4",children:[m.jsxs(W.button,{whileHover:{x:5},onClick:Vi,className:"w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 transition-colors",children:[m.jsx(OD,{className:"text-purple-400"}),m.jsx("span",{children:"Tambah Tugas Baru"})]}),m.jsxs(W.button,{whileHover:{x:5},onClick:ja,className:"w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 transition-colors",children:[m.jsx(LD,{className:"text-purple-400"}),m.jsx("span",{children:"Tambah User Baru"})]}),m.jsxs(W.button,{whileHover:{x:5},onClick:fs,className:"w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 transition-colors",children:[m.jsx(DD,{className:"text-purple-400"}),m.jsx("span",{children:"Riwayat Tugas Selesai"})]})]}),m.jsx("div",{className:"mt-auto pt-4 border-t border-gray-700/50",children:m.jsxs("div",{className:"flex items-center space-x-3 text-sm text-gray-400",children:[m.jsx(ND,{}),m.jsx("span",{children:"IKPPs Cleanify"})]})})]})})}),m.jsxs(W.div,{className:"mt-8 relative z-10",initial:"hidden",animate:"visible",variants:Oi,children:[m.jsxs("div",{className:"flex justify-between items-center mb-4",children:[m.jsx("h2",{className:"text-xl font-semibold text-purple-200",children:"Performa & Data Karyawan"}),m.jsxs(W.div,{initial:{opacity:0},animate:{opacity:1},className:"bg-purple-900 px-4 py-2 rounded-lg flex flex-col items-start shadow-lg",children:[m.jsxs("div",{className:"flex items-center space-x-2",children:[m.jsx(w0,{className:"text-purple-300"}),m.jsx("span",{className:"text-white text-sm font-medium",children:o})]}),m.jsxs("div",{className:"flex items-center space-x-2",children:[m.jsx(T0,{className:"text-purple-300"}),m.jsx("span",{className:"text-white text-sm font-medium",children:c})]})]})]}),g.length===0?m.jsx("div",{className:"text-center py-8 px-6 bg-gray-800/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl",children:m.jsx("p",{className:"text-gray-400",children:"Belum ada data karyawan yang tersedia"})}):m.jsx("div",{className:"overflow-x-auto pb-4",children:m.jsx("div",{className:"flex gap-4 w-max py-2",children:g.map(j=>{var q;return m.jsxs(W.div,{whileHover:{y:-5,boxShadow:"0 10px 25px -5px rgba(168, 85, 247, 0.4)"},whileTap:{scale:.95},onClick:()=>R((T==null?void 0:T.id)===j.id?null:j),className:"min-w-[250px] bg-gray-800/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-5 cursor-pointer transition-all duration-200",children:[m.jsx("p",{className:"text-lg font-medium text-white truncate",children:j.name}),m.jsxs("p",{className:"text-sm text-gray-400",children:["NIK: ",j.nik||"N/A"]}),m.jsx("div",{className:"w-full h-4 mt-3 bg-gray-700 rounded-full overflow-hidden",children:m.jsx("div",{className:`h-full ${xr(j.progress)}`,style:{width:`${j.progress||0}%`}})}),m.jsxs("div",{className:"flex justify-between items-center mt-2",children:[m.jsxs("span",{className:`text-sm font-medium ${j.progress>=80?"text-green-400":j.progress>=50?"text-yellow-400":"text-red-400"}`,children:[j.progress||0,"%"]}),m.jsxs("span",{className:"text-xs text-gray-400",children:[((q=j.tasks)==null?void 0:q.length)||0," tugas"]})]})]},j.id)})})})]}),m.jsx(Gt,{children:V&&m.jsx(W.div,{className:"mt-6 relative z-10",initial:"hidden",animate:"visible",exit:"hidden",variants:xe,children:m.jsxs("div",{className:"p-6 bg-gray-800/80 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-lg",children:[m.jsxs("div",{className:"flex justify-between items-center mb-4",children:[m.jsx("h2",{className:"text-xl font-semibold text-purple-300",children:"Tambah Tugas Baru"}),m.jsx(W.button,{whileTap:{scale:.9},onClick:()=>D(!1),className:"text-gray-400 hover:text-white",children:m.jsx(St,{size:20})})]}),m.jsxs("form",{onSubmit:Ke,className:"space-y-5",children:[m.jsxs(W.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1},children:[m.jsx("label",{className:"block text-sm text-purple-300 mb-2",children:"Judul Tugas"}),m.jsx("input",{type:"text",name:"title",value:ct.title,onChange:fe,placeholder:"Contoh: Sapu Gudang 1",className:"w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white",required:!0})]}),m.jsxs(W.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},children:[m.jsx("label",{className:"block text-sm text-purple-300 mb-2",children:"Deskripsi Tugas (Opsional)"}),m.jsx("textarea",{name:"description",value:ct.description,onChange:fe,placeholder:"Detil instruksi tugas...",className:"w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white h-24 resize-none"})]}),m.jsxs(W.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.3},children:[m.jsx("label",{className:"block text-sm text-purple-300 mb-2",children:"Pilih Karyawan"}),m.jsxs("select",{name:"userId",value:ct.userId,onChange:fe,className:"w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white",required:!0,children:[m.jsx("option",{value:"",children:"-- Pilih Karyawan --"}),Le.map(j=>m.jsx("option",{value:j.id,children:j.nama||j.name||j.id},j.id))]})]}),m.jsxs(W.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.4},children:[m.jsx("label",{className:"block text-sm text-purple-300 mb-2",children:"Deadline"}),m.jsx("input",{type:"datetime-local",name:"deadline",value:ct.deadline,onChange:fe,className:"w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white",required:!0})]}),ln&&m.jsx(W.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"bg-red-900/30 border border-red-500/30 p-4 rounded-lg",children:m.jsxs("div",{className:"flex items-center",children:[m.jsx(St,{className:"text-red-400 mr-2"}),m.jsx("p",{className:"text-red-400 text-sm",children:ln})]})}),m.jsx(W.button,{type:"submit",whileHover:{scale:1.02,boxShadow:"0 5px 15px rgba(168, 85, 247, 0.4)"},whileTap:{scale:.98},className:"w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3 px-6 rounded-lg font-medium shadow-lg transition-all duration-200",children:"Tambahkan Tugas"})]})]})})}),m.jsx(Gt,{children:B&&m.jsx(W.div,{className:"mt-6 relative z-10",initial:"hidden",animate:"visible",exit:"hidden",variants:xe,children:m.jsxs("div",{className:"p-6 bg-gray-800/80 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-lg",children:[m.jsxs("div",{className:"flex justify-between items-center mb-4",children:[m.jsx("h2",{className:"text-xl font-semibold text-purple-300",children:"Tambah User Baru"}),m.jsx(W.button,{whileTap:{scale:.9},onClick:()=>L(!1),className:"text-gray-400 hover:text-white",children:m.jsx(St,{size:20})})]}),m.jsxs("form",{onSubmit:cn,className:"space-y-5",children:[m.jsxs(W.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1},children:[m.jsx("label",{className:"block text-sm text-purple-300 mb-2",children:"Nama Lengkap"}),m.jsx("input",{type:"text",name:"nama",value:He.nama,onChange:le,placeholder:"Nama lengkap karyawan",className:"w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white",required:!0})]}),m.jsxs(W.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},children:[m.jsx("label",{className:"block text-sm text-purple-300 mb-2",children:"NIK"}),m.jsx("input",{type:"text",name:"nik",value:He.nik,onChange:le,placeholder:"Nomor Induk Karyawan",className:"w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white",required:!0})]}),m.jsxs(W.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.3},children:[m.jsx("label",{className:"block text-sm text-purple-300 mb-2",children:"Email Gunakan @user.com"}),m.jsx("input",{type:"email",name:"email",value:He.email,onChange:le,placeholder:"Masukkan NIK, Contoh ( 011****@user.com )",className:"w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white",required:!0})]}),m.jsxs(W.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.4},children:[m.jsx("label",{className:"block text-sm text-purple-300 mb-2",children:"Password"}),m.jsx("input",{type:"password",name:"password",value:He.password,onChange:le,placeholder:"Minimal 6 karakter",className:"w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white",required:!0})]}),Ir&&m.jsx(W.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"bg-red-900/30 border border-red-500/30 p-4 rounded-lg",children:m.jsxs("div",{className:"flex items-center",children:[m.jsx(St,{className:"text-red-400 mr-2"}),m.jsx("p",{className:"text-red-400 text-sm",children:Ir})]})}),F&&m.jsx(W.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"bg-green-900/30 border border-green-500/30 p-4 rounded-lg",children:m.jsxs("div",{className:"flex items-center",children:[m.jsx(So,{className:"text-green-400 mr-2"}),m.jsx("p",{className:"text-green-400 text-sm",children:F})]})}),m.jsx(W.button,{type:"submit",whileHover:{scale:1.02,boxShadow:"0 5px 15px rgba(168, 85, 247, 0.4)"},whileTap:{scale:.98},className:"w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3 px-6 rounded-lg font-medium shadow-lg transition-all duration-200",children:"Buat Akun User"})]})]})})}),m.jsx(Gt,{children:x&&m.jsx(W.div,{className:"mt-6 relative z-10",initial:"hidden",animate:"visible",exit:"hidden",variants:xe,children:m.jsxs("div",{className:"p-6 bg-gray-800/80 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-lg",children:[m.jsxs("div",{className:"flex justify-between items-center mb-4",children:[m.jsx("h2",{className:"text-xl font-semibold text-purple-300",children:"Riwayat Tugas Selesai"}),m.jsx(W.button,{whileTap:{scale:.9},onClick:()=>A(!1),className:"text-gray-400 hover:text-white",children:m.jsx(St,{size:20})})]}),P.length===0?m.jsx("div",{className:"text-center py-12",children:m.jsx("p",{className:"text-gray-400",children:"Belum ada tugas yang diselesaikan"})}):m.jsx("div",{className:"space-y-4 max-h-[60vh] overflow-y-auto pr-2",children:P.map((j,q)=>m.jsx(W.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:q*.05},className:"p-4 bg-gray-700/30 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-colors",children:m.jsxs("div",{className:"flex justify-between items-start",children:[m.jsxs("div",{children:[m.jsx("h3",{className:"font-medium text-white",children:j.taskTitle}),m.jsxs("p",{className:"text-sm text-gray-400 mt-1",children:["Oleh: ",j.userName]}),m.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["Selesai pada: ",new Date(j.submittedAt).toLocaleString("id-ID")]})]}),m.jsxs(W.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>It(j.id),className:"px-3 py-2 bg-blue-600/40 hover:bg-blue-600/60 rounded-lg text-xs flex items-center space-x-1",children:[m.jsx(Cm,{}),m.jsx("span",{children:"Detail"})]})]})},j.id))})]})})}),m.jsx(Gt,{children:T&&m.jsx(W.div,{className:"mt-8 relative z-10",initial:"hidden",animate:"visible",exit:"hidden",variants:xe,children:m.jsxs("div",{className:"p-6 bg-gray-800/80 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-lg",children:[m.jsxs("div",{className:"flex justify-between items-center mb-4",children:[m.jsxs("h2",{className:"text-xl font-semibold text-purple-300",children:["Detail Tugas: ",T.name]}),m.jsx(W.button,{whileTap:{scale:.9},onClick:()=>R(null),className:"text-gray-400 hover:text-white",children:m.jsx(St,{size:20})})]}),T.tasks.length===0?m.jsx("p",{className:"text-gray-400 text-center py-4",children:"Belum ada tugas yang diberikan"}):m.jsx("div",{className:"space-y-3",children:T.tasks.map((j,q)=>m.jsx(W.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:q*.1},className:`p-4 rounded-lg border ${j.status==="selesai"?"bg-green-900/20 border-green-500/30":"bg-red-900/20 border-red-500/30"}`,children:m.jsxs("div",{className:"flex justify-between items-center",children:[m.jsxs("div",{className:"flex-grow",children:[m.jsxs("div",{className:"flex items-center space-x-3",children:[m.jsx(W.span,{animate:j.status==="selesai"?{scale:[1,1.2,1],rotate:[0,180,360]}:{rotate:[0,45,0]},transition:{duration:2,repeat:1/0,repeatType:"loop"},className:`flex items-center justify-center w-8 h-8 rounded-full ${j.status==="selesai"?"bg-green-500":"bg-red-500"}`,children:j.status==="selesai"?m.jsx(So,{}):m.jsx(St,{})}),m.jsx("span",{className:"font-medium",children:j.title})]}),m.jsxs("span",{className:"text-sm text-gray-400 ml-11 block mt-1",children:["Deadline: ",ds(j.timestamp)]})]}),m.jsxs("div",{className:"flex items-center space-x-2",children:[j.status==="selesai"&&j.submissionId&&m.jsxs(W.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>It(j.submissionId),className:"px-3 py-2 bg-blue-600/40 hover:bg-blue-600/60 rounded-lg text-xs flex items-center space-x-1",children:[m.jsx(Cm,{}),m.jsx("span",{children:"Lihat Bukti"})]}),m.jsx(W.button,{whileHover:{scale:1.05,color:"#ff4c4c"},whileTap:{scale:.95},onClick:()=>lt({show:!0,taskId:j.id}),className:"p-2 bg-red-600/30 hover:bg-red-600/50 rounded-lg text-white transition-all",children:m.jsx(I0,{size:16})})]})]})},j.id))})]})})}),m.jsx(Gt,{children:Re.show&&m.jsx(W.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70",children:m.jsxs(W.div,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},className:"bg-gray-800 rounded-2xl max-w-md w-full p-6",onClick:j=>j.stopPropagation(),children:[m.jsxs("div",{className:"text-center mb-6",children:[m.jsx("div",{className:"mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-red-900/30 text-red-500",children:m.jsx(CD,{size:30})}),m.jsx("h3",{className:"text-xl font-medium text-white mb-2",children:"Konfirmasi Hapus Tugas"}),m.jsx("p",{className:"text-gray-400",children:"Anda yakin ingin menghapus tugas ini? Tindakan ini tidak dapat dibatalkan."})]}),m.jsxs("div",{className:"flex space-x-3",children:[m.jsx(W.button,{whileHover:{scale:1.03},whileTap:{scale:.97},onClick:()=>lt({show:!1,taskId:""}),className:"flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium",children:"Batal"}),m.jsx(W.button,{whileHover:{scale:1.03},whileTap:{scale:.97},onClick:()=>vt(Re.taskId),className:"flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium",children:"Hapus"})]})]})})}),m.jsx(Gt,{children:v&&I&&m.jsx(W.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70",onClick:()=>{w(!1),C(null)},children:m.jsxs(W.div,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},className:"bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6",onClick:j=>j.stopPropagation(),children:[m.jsxs("div",{className:"flex justify-between items-start mb-6",children:[m.jsxs("div",{children:[m.jsx("h3",{className:"text-xl font-semibold text-purple-300",children:"Bukti Penyelesaian Tugas"}),m.jsx("p",{className:"text-gray-400",children:I.taskTitle})]}),m.jsx("button",{onClick:()=>{w(!1),C(null)},className:"text-gray-400 hover:text-white",children:m.jsx(St,{size:24})})]}),m.jsxs("div",{className:"space-y-6",children:[m.jsxs("div",{className:"bg-gray-700/30 p-4 rounded-lg",children:[m.jsx("p",{className:"text-sm text-gray-300 mb-1",children:"Diselesaikan oleh:"}),m.jsx("p",{className:"font-medium text-white",children:I.userName}),m.jsxs("p",{className:"text-sm text-gray-400 mt-2",children:["Tanggal: ",new Date(I.submittedAt).toLocaleString("id-ID")]})]}),I.caption&&m.jsxs("div",{className:"bg-gray-700/30 p-4 rounded-lg",children:[m.jsx("p",{className:"text-sm text-gray-300 mb-2",children:"Keterangan dari karyawan:"}),m.jsx("p",{className:"text-white",children:I.caption})]}),I.images&&I.images.length>0&&m.jsxs("div",{children:[m.jsxs("p",{className:"text-sm text-gray-300 mb-3",children:["Bukti Foto (",I.images.length,"):"]}),m.jsx("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-4",children:I.images.map((j,q)=>m.jsxs("a",{href:j.fileURL,target:"_blank",rel:"noopener noreferrer",className:"block rounded-lg overflow-hidden border border-purple-500/30 hover:border-purple-400 transition-colors",children:[m.jsx("div",{className:"aspect-square w-full relative",children:m.jsx("img",{src:j.fileURL,alt:`Bukti ${q+1}`,className:"absolute inset-0 w-full h-full object-cover",onError:ne=>{const te=ne.target;te.src="https://via.placeholder.com/150?text=Error"}})}),m.jsx("div",{className:"p-2 bg-gray-800",children:m.jsx("p",{className:"text-xs text-gray-400 truncate",children:j.fileName})})]},q))})]}),I.status==="submitted"&&m.jsx("div",{className:"flex justify-end mt-4",children:m.jsxs(W.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>Gn(I.id),className:"bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center space-x-2",children:[m.jsx(So,{}),m.jsx("span",{children:"Tandai Sudah Diperiksa"})]})})]})]})})})]})},UD=()=>m.jsx("div",{className:"bg-gray-100 min-h-screen",children:m.jsx(jD,{})}),FD=()=>{const t=ia(),{currentUser:e}=Du();S.useEffect(()=>{if(!e)t("/",{replace:!0});else{window.history.pushState(null,"",window.location.href);const F=()=>{window.history.pushState(null,"",window.location.href)};return window.addEventListener("popstate",F),()=>window.removeEventListener("popstate",F)}},[e,t]);const[n,r]=S.useState(""),[s,i]=S.useState(m.jsx(An,{})),[o,l]=S.useState(null),[c,u]=S.useState([]),[h,f]=S.useState([]),[g,_]=S.useState(!0),[T,R]=S.useState([]),[I,C]=S.useState(!1),[V,D]=S.useState(""),[B,L]=S.useState(""),[U,b]=S.useState(!1),[v,w]=S.useState(!1),[x,A]=S.useState(null),P=S.useRef(null);S.useEffect(()=>{const F=()=>{const le=new Date().getHours();le<12?(r("Selamat Pagi"),i(m.jsx(An,{className:"text-yellow-400"}))):le<15?(r("Selamat Siang"),i(m.jsx(An,{className:"text-yellow-500"}))):le<18?(r("Selamat Sore"),i(m.jsx(An,{className:"text-orange-500"}))):(r("Selamat Malam"),i(m.jsx(b0,{className:"text-blue-300"})))};F();const Y=setInterval(F,6e4);return()=>clearInterval(Y)},[]),S.useEffect(()=>{const F=Fc(Nn,async Y=>{if(!Y){t("/");return}try{const fe=await li(Dt(Oe,"users",Y.uid));if(fe.exists()){const le=fe.data();le.role==="user"?(l({...le,uid:Y.uid}),E(Y.uid),Le(Y.uid)):t("/admin-dashboard")}else t("/")}catch(fe){console.error("Error checking user data:",fe),t("/")}finally{_(!1)}});return()=>F()},[t]);const E=async F=>{try{const Y=Lr(Qt(Oe,"tasks"),En("assignedTo","==",F),En("status","==","belum")),le=(await ac(Y)).docs.map(Ke=>({id:Ke.id,...Ke.data()}));console.log("Fetched tasks:",le),u(le)}catch(Y){console.error("Error fetching tasks:",Y)}},Le=async F=>{try{const Y=Lr(Qt(Oe,"submissions"),En("userId","==",F),__("submittedAt","desc")),le=(await ac(Y)).docs.map(Ke=>({id:Ke.id,...Ke.data()}));console.log("Fetched completed tasks:",le),f(le)}catch(Y){console.error("Error fetching completed tasks:",Y)}},kt=F=>{if(F.target.files){const Y=Array.from(F.target.files).map(le=>({file:le,preview:URL.createObjectURL(le)})),fe=[...T,...Y].slice(0,5);R(fe)}},Er=F=>{const Y=[...T];URL.revokeObjectURL(Y[F].preview),Y.splice(F,1),R(Y)},ue=F=>{D(F.target.value)},Re=F=>{L(F.target.value)},lt=()=>{T.forEach(F=>URL.revokeObjectURL(F.preview)),R([]),D(""),L(""),P.current&&(P.current.value="")},ct=F=>F instanceof Error?F.message:F&&typeof F=="object"&&"message"in F?String(F.message):typeof F=="string"?F:"Terjadi kesalahan yang tidak diketahui",br=async()=>{if(T.length===0||!V||!o){A("Harap pilih minimal 1 gambar dan tugas yang akan diselesaikan");return}C(!0),A(null);try{const F=c.find(vt=>vt.id===V);if(!F)throw new Error("Task tidak ditemukan");const Y=T.map(async(vt,It)=>{const Gn=`${Date.now()}_${It}_${vt.file.name.replace(/[^a-zA-Z0-9.]/g,"_")}`,hs=UP(zP,`submissions/${o.uid}/${V}/${Gn}`),ds={contentType:vt.file.type};console.log(`Uploading image ${It+1}/${T.length}: ${Gn}`);const xr=await LP(hs,vt.file,ds);console.log(`Image ${It+1} uploaded successfully`);const un=await jP(xr.ref);return console.log(`Got download URL for image ${It+1}`),{fileName:vt.file.name,fileURL:un}});console.log("Starting all uploads...");const fe=await Promise.all(Y);console.log("All images uploaded successfully:",fe);const le=new Date,Ke=Te.fromDate(le);console.log("Creating submission document...");const cn=await I_(Qt(Oe,"submissions"),{userId:o.uid,userName:o.nama||"User",taskId:V,taskTitle:F.title||"Tugas Kebersihan",images:fe,caption:B.trim(),submittedAt:le.toISOString(),timestamp:Ke,status:"submitted"});console.log("Created submission:",cn.id),console.log("Updating task status..."),await b_(Dt(Oe,"tasks",V),{status:"selesai",completedAt:Ke,submissionId:cn.id}),console.log("Task marked as completed"),lt(),w(!0),setTimeout(()=>w(!1),3e3),E(o.uid),Le(o.uid),b(!1)}catch(F){console.error("Error uploading files:",F);const Y=ct(F);A(`Terjadi kesalahan saat mengunggah file: ${Y}`)}finally{C(!1)}},He=async()=>{try{await Vg(Nn),t("/")}catch(F){console.error("Error signing out:",F)}},Ie={hidden:{opacity:0},visible:{opacity:1,transition:{duration:.5}}},ln={hidden:{y:50,opacity:0},visible:{y:0,opacity:1,transition:{duration:.5}}},_t={hidden:{height:0,opacity:0},visible:{height:"auto",opacity:1,transition:{duration:.3}}},Ir=F=>{if(!F)return"Tidak ada tanggal";try{let Y;if(F!=null&&F.toDate&&typeof F.toDate=="function")Y=F.toDate();else if(F instanceof Date)Y=F;else if(typeof F=="string")Y=new Date(F);else return"Format tanggal tidak valid";return Y.toLocaleString("id-ID",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch(Y){return console.error("Error formatting timestamp:",Y),"Format tanggal tidak valid"}},ft=()=>m.jsx("div",{className:"particles-container absolute inset-0 z-0 overflow-hidden",children:Array.from({length:20}).map((F,Y)=>m.jsx(W.div,{className:"absolute bg-purple-500 opacity-10 rounded-full",style:{width:Math.floor(Math.random()*10)+5,height:Math.floor(Math.random()*10)+5,top:`${Math.random()*100}%`,left:`${Math.random()*100}%`},animate:{x:[0,Math.random()*100-50],y:[0,Math.random()*100-50],opacity:[.1,.3,.1]},transition:{duration:Math.random()*10+10,repeat:1/0,repeatType:"reverse"}},Y))});return g?m.jsx("div",{className:"min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 flex items-center justify-center",children:m.jsxs("div",{className:"text-center text-white",children:[m.jsx("div",{className:"w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-spin mx-auto mb-4"}),m.jsx("p",{className:"text-purple-300",children:"Loading..."})]})}):m.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white p-6 relative",children:[m.jsx(ft,{}),m.jsxs(W.div,{className:"z-10 relative flex justify-between items-start",initial:"hidden",animate:"visible",variants:Ie,children:[m.jsxs("div",{children:[m.jsxs("div",{className:"flex items-center space-x-3 mb-2",children:[m.jsx(W.span,{className:"text-4xl",animate:{rotate:[0,15,0]},transition:{duration:2,repeat:1/0,ease:"easeInOut"},children:s}),m.jsx("h1",{className:"text-2xl font-bold text-purple-300",children:n})]}),m.jsx("h2",{className:"text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300",children:(o==null?void 0:o.nama)||"Karyawan"})]}),m.jsxs("div",{className:"flex flex-col items-end",children:[m.jsxs("div",{className:"bg-gray-800/60 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 mb-2",children:[m.jsxs("div",{className:"flex items-center space-x-2",children:[m.jsx(w0,{className:"text-purple-400"}),m.jsx("span",{className:"text-sm text-gray-300",children:new Date().toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"})})]}),m.jsxs("div",{className:"flex items-center space-x-2 mt-1",children:[m.jsx(T0,{className:"text-purple-400"}),m.jsx("span",{className:"text-sm text-gray-300",children:new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})})]})]}),m.jsxs(W.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:He,className:"bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center space-x-2 text-sm",children:[m.jsx(E0,{}),m.jsx("span",{children:"Logout"})]})]})]}),m.jsx(W.div,{className:"mt-8 relative z-10",initial:"hidden",animate:"visible",variants:ln,children:m.jsxs("div",{className:"bg-gray-800/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-5 mb-6",children:[m.jsx("h2",{className:"text-xl font-semibold text-purple-300 mb-4",children:"Informasi Karyawan"}),m.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[m.jsxs("div",{children:[m.jsx("p",{className:"text-sm text-gray-400",children:"Nama Lengkap"}),m.jsx("p",{className:"font-medium text-white",children:o==null?void 0:o.nama})]}),m.jsxs("div",{children:[m.jsx("p",{className:"text-sm text-gray-400",children:"NIK"}),m.jsx("p",{className:"font-medium text-white",children:(o==null?void 0:o.nik)||"N/A"})]}),(o==null?void 0:o.email)&&m.jsxs("div",{children:[m.jsx("p",{className:"text-sm text-gray-400",children:"Email"}),m.jsx("p",{className:"font-medium text-white",children:o.email})]}),(o==null?void 0:o.phone)&&m.jsxs("div",{children:[m.jsx("p",{className:"text-sm text-gray-400",children:"Nomor Telepon"}),m.jsx("p",{className:"font-medium text-white",children:o.phone})]})]})]})}),m.jsxs(W.div,{className:"mt-6 relative z-10",initial:"hidden",animate:"visible",variants:ln,children:[m.jsxs("div",{className:"flex justify-between items-center mb-4",children:[m.jsx("h2",{className:"text-xl font-semibold text-purple-300",children:"Tugas Kebersihan"}),m.jsx(W.button,{whileHover:{scale:1.05},whileTap:{scale:.95},className:"bg-purple-600 hover:bg-purple-700 p-3 rounded-full shadow-lg flex items-center justify-center",onClick:()=>b(F=>!F),disabled:c.length===0,children:m.jsx(MD,{className:"text-white text-xl"})})]}),c.length===0?m.jsx("div",{className:"bg-gray-800/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 text-center",children:m.jsx("p",{className:"text-gray-400",children:"Tidak ada tugas yang perlu diselesaikan saat ini"})}):m.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:c.map(F=>m.jsxs(W.div,{whileHover:{y:-5,boxShadow:"0 10px 25px -5px rgba(168, 85, 247, 0.4)"},className:"bg-gray-800/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-5",children:[m.jsx("h3",{className:"font-medium text-lg text-white",children:F.title}),F.description&&m.jsx("p",{className:"text-sm text-gray-400 mt-1",children:F.description}),m.jsxs("div",{className:"flex justify-between items-center mt-3",children:[m.jsx("span",{className:"px-2 py-1 bg-red-900/30 border border-red-500/30 rounded-full text-xs text-red-400",children:"Belum Selesai"}),F.timestamp&&m.jsxs("span",{className:"text-xs text-gray-400",children:["Deadline: ",Ir(F.timestamp)]})]})]},F.id))})]}),m.jsx(Gt,{children:U&&m.jsx(W.div,{className:"mt-6 relative z-10",initial:"hidden",animate:"visible",exit:"hidden",variants:_t,children:m.jsxs("div",{className:"p-6 bg-gray-800/80 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-lg",children:[m.jsxs("div",{className:"flex justify-between items-center mb-4",children:[m.jsx("h2",{className:"text-xl font-semibold text-purple-300",children:"Unggah Bukti Penyelesaian Tugas"}),m.jsx(W.button,{whileTap:{scale:.9},onClick:()=>{b(!1),lt()},className:"text-gray-400 hover:text-white",children:m.jsx(St,{size:20})})]}),m.jsxs("div",{className:"space-y-5",children:[m.jsxs(W.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1},children:[m.jsx("label",{className:"block text-sm text-purple-300 mb-2",children:"Pilih Tugas"}),m.jsxs("select",{value:V,onChange:ue,className:"w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white",children:[m.jsx("option",{value:"",children:"-- Pilih Tugas --"}),c.map(F=>m.jsx("option",{value:F.id,children:F.title},F.id))]})]}),m.jsxs(W.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},children:[m.jsxs("div",{className:"flex justify-between items-center mb-2",children:[m.jsx("label",{className:"block text-sm text-purple-300",children:"Unggah Bukti Foto (Max 5)"}),m.jsxs("span",{className:"text-xs text-gray-400",children:[T.length,"/5 foto"]})]}),T.length>0&&m.jsx("div",{className:"grid grid-cols-3 gap-2 mb-3",children:T.map((F,Y)=>m.jsxs("div",{className:"relative h-24 rounded-lg overflow-hidden border border-purple-500/30",children:[m.jsx("img",{src:F.preview,alt:`Preview ${Y+1}`,className:"h-full w-full object-cover"}),m.jsx("button",{onClick:()=>Er(Y),className:"absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white text-xs",children:m.jsx(I0,{size:14})})]},Y))}),m.jsxs("div",{className:`border-2 border-dashed p-4 rounded-lg text-center 
                    ${T.length>=5?"border-gray-600 bg-gray-700/30":"border-purple-500/50 bg-purple-900/10"}`,children:[m.jsx("input",{type:"file",ref:P,onChange:kt,accept:"image/*",multiple:!0,disabled:T.length>=5,className:"hidden",id:"image-upload"}),m.jsxs("label",{htmlFor:"image-upload",className:`flex flex-col items-center justify-center cursor-pointer 
                        ${T.length>=5?"opacity-50 cursor-not-allowed":""}`,children:[m.jsx(kD,{className:"text-purple-400 mb-2",size:30}),m.jsx("span",{className:"text-sm font-medium text-purple-300",children:T.length>=5?"Batas maksimal 5 foto tercapai":"Klik untuk memilih foto"}),m.jsx("span",{className:"text-xs text-gray-400 mt-1",children:"Format: JPG, PNG, JPEG (Max: 5MB per file)"})]})]})]}),m.jsxs(W.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.3},children:[m.jsx("label",{className:"block text-sm text-purple-300 mb-2",children:"Keterangan / Komentar"}),m.jsx("textarea",{value:B,onChange:Re,placeholder:"Tambahkan keterangan tentang tugas yang telah diselesaikan...",className:"w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white min-h-[100px]"})]}),x&&m.jsx(W.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"bg-red-900/30 border border-red-500/30 p-4 rounded-lg",children:m.jsxs("div",{className:"flex items-center",children:[m.jsx(St,{className:"text-red-400 mr-2"}),m.jsx("p",{className:"text-red-400 text-sm",children:x})]})}),m.jsx(W.button,{onClick:br,disabled:T.length===0||!V||I,whileHover:{scale:T.length===0||!V||I?1:1.02,boxShadow:"0 5px 15px rgba(168, 85, 247, 0.4)"},whileTap:{scale:T.length===0||!V||I?1:.98},className:`w-full py-3 px-6 rounded-lg font-medium shadow-lg transition-all duration-200 ${T.length===0||!V||I?"bg-gray-600 cursor-not-allowed":"bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"}`,children:I?m.jsxs("div",{className:"flex items-center justify-center",children:[m.jsxs("svg",{className:"animate-spin -ml-1 mr-2 h-4 w-4 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[m.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),m.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Mengunggah..."]}):"Kirim Bukti Penyelesaian"}),v&&m.jsx(W.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"bg-green-900/30 border border-green-500/30 p-4 rounded-lg",children:m.jsxs("div",{className:"flex items-center",children:[m.jsx(So,{className:"text-green-400 mr-2"}),m.jsx("p",{className:"text-green-400 text-sm",children:"Bukti tugas berhasil diunggah!"})]})})]})]})})}),m.jsxs(W.div,{className:"mt-8 relative z-10 mb-6",initial:"hidden",animate:"visible",variants:ln,children:[m.jsx("h2",{className:"text-xl font-semibold text-purple-300 mb-4",children:"Riwayat Penyelesaian Tugas"}),h.length===0?m.jsx("div",{className:"bg-gray-800/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 text-center",children:m.jsx("p",{className:"text-gray-400",children:"Belum ada riwayat tugas yang diselesaikan"})}):m.jsx("div",{className:"space-y-4",children:h.map(F=>m.jsxs(W.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"bg-gray-800/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-5",children:[m.jsxs("div",{className:"flex justify-between items-start",children:[m.jsxs("div",{children:[m.jsx("h3",{className:"font-medium text-lg text-white",children:F.taskTitle||"Tugas Kebersihan"}),m.jsxs("p",{className:"text-sm text-gray-400 mt-1",children:["Diselesaikan pada: ",new Date(F.submittedAt).toLocaleString("id-ID")]}),F.caption&&m.jsx("div",{className:"mt-3 bg-gray-700/40 p-3 rounded-lg",children:m.jsx("p",{className:"text-sm text-gray-300",children:F.caption})})]}),m.jsx("span",{className:`px-2 py-1 h-fit inline-flex text-xs leading-5 font-semibold rounded-full ${F.status==="reviewed"?"bg-green-900/30 text-green-400 border border-green-500/30":"bg-blue-900/30 text-blue-400 border border-blue-500/30"}`,children:F.status==="reviewed"?"Diperiksa":"Terkirim"})]}),F.images&&F.images.length>0&&m.jsxs("div",{className:"mt-4",children:[m.jsx("p",{className:"text-xs text-gray-400 mb-2",children:"Bukti Foto:"}),m.jsx("div",{className:"grid grid-cols-3 gap-2",children:F.images.map((Y,fe)=>m.jsx("a",{href:Y.fileURL,target:"_blank",rel:"noopener noreferrer",className:"block h-20 rounded-lg overflow-hidden border border-purple-500/30 hover:border-purple-400 transition-colors",children:m.jsx("img",{src:Y.fileURL,alt:`Bukti ${fe+1}`,className:"h-full w-full object-cover",onError:le=>{const Ke=le.target;Ke.src="https://via.placeholder.com/80?text=Error"}})},fe))})]})]},F.id))})]})]})},BD=()=>m.jsx("div",{className:"bg-gray-100 min-h-screen",children:m.jsx(FD,{})}),$D=()=>{const[t,e]=S.useState(""),[n,r]=S.useState(""),[s,i]=S.useState(""),[o,l]=S.useState(!1),[c,u]=S.useState(!1),[h,f]=S.useState(!1),[g,_]=S.useState(!1),T=ia(),{currentUser:R}=Du();S.useEffect(()=>{R&&(async()=>{const U=await li(Dt(Oe,"users",R.uid));if(U.exists()){const b=U.data().role;b==="admin"?T("/dashboard/admin",{replace:!0}):b==="user"&&T("/dashboard/user",{replace:!0})}})(),window.history.pushState(null,"",window.location.href);const L=()=>{R?(Nn.signOut(),T("/",{replace:!0})):window.history.pushState(null,"",window.location.href)};return window.addEventListener("popstate",L),()=>window.removeEventListener("popstate",L)},[R,T]);const[I,C]=S.useState(!1);S.useEffect(()=>{C(!0)},[]);const V=async L=>{L.preventDefault(),i(""),f(!0);try{const b=(await rI(Nn,t,n)).user,v=await li(Dt(Oe,"users",b.uid));if(v.exists()){const w=v.data().role;w==="admin"?T("/dashboard/admin"):w==="user"?T("/dashboard/user"):i("Role tidak dikenal.")}else i("Akun belum terdaftar di database.")}catch(U){U.code==="auth/user-not-found"?i("Email tidak ditemukan."):U.code==="auth/wrong-password"?i("Password salah."):i("Gagal login. Coba lagi.")}finally{f(!1)}},D=()=>{_(!g)},B=()=>m.jsx("div",{className:"absolute top-0 left-0 w-full h-full overflow-hidden z-0",children:Array.from({length:20}).map((L,U)=>m.jsx(W.div,{className:"absolute bg-purple-500 opacity-10 rounded-full",style:{width:Math.floor(Math.random()*10)+5,height:Math.floor(Math.random()*10)+5,top:`${Math.random()*100}%`,left:`${Math.random()*100}%`},animate:{x:[0,Math.random()*100-50],y:[0,Math.random()*100-50],opacity:[.1,.3,.1]},transition:{duration:Math.random()*10+10,repeat:1/0,repeatType:"reverse"}},U))});return m.jsxs("div",{className:"flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 overflow-hidden relative px-4 py-6",children:[m.jsx("div",{className:"absolute w-1/3 h-1/3 max-w-md max-h-md rounded-full bg-purple-600 opacity-5 -top-10 -left-10 sm:-top-20 sm:-left-20 animate-pulse"}),m.jsx("div",{className:"absolute w-1/2 h-1/2 max-w-lg max-h-lg rounded-full bg-blue-500 opacity-5 -bottom-10 -right-10 sm:-bottom-20 sm:-right-20 animate-pulse",style:{animationDelay:"1.5s"}}),m.jsx("div",{className:"absolute w-1/4 h-1/4 max-w-sm max-h-sm rounded-full bg-indigo-400 opacity-5 top-1/4 left-1/4 animate-pulse",style:{animationDelay:"2.7s"}}),m.jsx(B,{}),m.jsxs(W.div,{className:`bg-gray-800 bg-opacity-40 p-4 sm:p-6 md:p-8 rounded-2xl backdrop-blur-lg w-full max-w-xs sm:max-w-sm md:max-w-md z-10 transform transition-all duration-700 ${I?"scale-100 opacity-100":"scale-95 opacity-0"}`,style:{boxShadow:"0 10px 25px rgba(0, 0, 0, 0.3)"},children:[m.jsxs("div",{className:"text-center mb-6 sm:mb-8 md:mb-10",children:[m.jsx("h1",{className:"text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent",children:"IKPPs Cleanify"}),m.jsx("p",{className:"text-gray-400 mt-2 text-sm sm:text-base",children:"Sign in to your account"})]}),m.jsxs("form",{onSubmit:V,className:"space-y-6 sm:space-y-8",children:[m.jsxs("div",{className:"relative group",children:[m.jsx("input",{type:"email",id:"email",value:t,onChange:L=>e(L.target.value),onFocus:()=>l(!0),onBlur:()=>l(t!==""),className:"peer w-full h-10 sm:h-12 bg-transparent text-gray-300 border-b-2 border-gray-600 focus:border-indigo-400 outline-none px-2 pt-2 transition-all duration-300 font-light text-sm sm:text-base",placeholder:" ",style:{fontFamily:"'Segoe UI', 'Inter', sans-serif"}}),m.jsx("label",{htmlFor:"email",className:`absolute left-2 transition-all duration-300 pointer-events-none text-sm sm:text-base
                ${o||t?"text-xs text-indigo-400 -translate-y-5":"text-base text-gray-400 translate-y-0"}
              `,children:"Email"}),m.jsx("span",{className:"absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-300 group-hover:w-full peer-focus:w-full"})]}),m.jsxs("div",{className:"relative group",children:[m.jsx("input",{type:g?"text":"password",id:"password",value:n,onChange:L=>r(L.target.value),onFocus:()=>u(!0),onBlur:()=>u(n!==""),className:"peer w-full h-10 sm:h-12 bg-transparent text-gray-300 border-b-2 border-gray-600 focus:border-indigo-400 outline-none px-2 pt-2 pr-10 transition-all duration-300 font-light text-sm sm:text-base",placeholder:" ",style:{fontFamily:"'Segoe UI', 'Inter', sans-serif"}}),m.jsx("label",{htmlFor:"password",className:`absolute left-2 transition-all duration-300 pointer-events-none text-sm sm:text-base
                ${c||n?"text-xs text-indigo-400 -translate-y-5":"text-base text-gray-400 translate-y-0"}
              `,children:"Password"}),m.jsx("button",{type:"button",onClick:D,className:"absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 bg-purple-600 px-2 py-1 rounded text-xs",children:g?"Sembunyikan":"Tampilkan"}),m.jsx("span",{className:"absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-300 group-hover:w-full peer-focus:w-full"})]}),m.jsx("button",{type:"submit",disabled:h,className:`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 sm:py-3 rounded-lg font-medium text-base sm:text-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg ${h?"opacity-70":""}`,children:h?m.jsxs("div",{className:"flex items-center justify-center",children:[m.jsx("div",{className:"w-4 h-4 sm:w-5 sm:h-5 border-3 sm:border-4 border-white border-t-transparent rounded-full animate-spin mr-2"}),"Processing..."]}):"Login"}),m.jsx(Gt,{children:s&&m.jsx(W.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},className:"bg-red-900 bg-opacity-20 border border-red-800 text-red-300 rounded-lg p-2 sm:p-3 text-xs sm:text-sm",children:s})})]}),m.jsx("div",{className:"mt-8 sm:mt-10 md:mt-12 text-center text-gray-500 text-xs opacity-60 font-light",children:m.jsx("p",{children:" Masukkan email & password anda untuk login"})})]})]})},qD=()=>m.jsx("div",{className:"flex items-center justify-center min-h-screen bg-gray-100",children:m.jsx($D,{})}),WD=()=>{const[t,e]=S.useState(""),[n,r]=S.useState(""),s=i=>{i.preventDefault(),console.log("Profile updated:",{name:t,nik:n})};return m.jsxs("form",{onSubmit:s,className:"bg-white p-6 rounded shadow-md",children:[m.jsx("h1",{className:"text-2xl font-bold mb-4",children:"Edit Profil"}),m.jsx("input",{type:"text",placeholder:"Nama Lengkap",className:"w-full p-2 border rounded mb-4",value:t,onChange:i=>e(i.target.value)}),m.jsx("input",{type:"text",placeholder:"NIK",className:"w-full p-2 border rounded mb-4",value:n,onChange:i=>r(i.target.value)}),m.jsx("button",{type:"submit",className:"w-full bg-blue-500 text-white p-2 rounded",children:"Simpan"})]})},zD=()=>m.jsx("div",{className:"bg-gray-100 min-h-screen flex items-center justify-center",children:m.jsx(WD,{})}),HD=()=>m.jsxs("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-100",children:[m.jsx("h1",{className:"text-4xl font-bold text-gray-800 mb-4",children:"SILAHKAN LOGIN ULANG"}),m.jsx("p",{className:"text-gray-600 mb-4",children:"Akun anda belum terdaftar."}),m.jsx(IT,{to:"/",className:"text-blue-500 underline",children:"Kembali ke login"})]}),KD=()=>m.jsx(TT,{children:m.jsxs(pT,{children:[m.jsx(kr,{path:"/",element:m.jsx(qD,{})}),m.jsx(kr,{path:"/dashboard/admin",element:m.jsx(UD,{})}),m.jsx(kr,{path:"/dashboard/user",element:m.jsx(BD,{})}),m.jsx(kr,{path:"/profile",element:m.jsx(zD,{})}),m.jsx(kr,{path:"*",element:m.jsx(HD,{})})]})}),GD=bw.createRoot(document.getElementById("root"));GD.render(m.jsx(Jt.StrictMode,{children:m.jsx(HP,{children:m.jsx(KD,{})})}));
