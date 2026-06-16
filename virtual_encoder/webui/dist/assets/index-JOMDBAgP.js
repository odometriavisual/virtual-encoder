(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();var ys,jt,Ic,An,il,Nc,Fc,Us,Gr,Zi,Oc,To,ga,va,Bc,rs={},ss=[],lf=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Es=Array.isArray;function dn(n,t){for(var e in t)n[e]=t[e];return n}function bo(n){n&&n.parentNode&&n.parentNode.removeChild(n)}function cf(n,t,e){var i,r,s,a={};for(s in t)s=="key"?i=t[s]:s=="ref"?r=t[s]:a[s]=t[s];if(arguments.length>2&&(a.children=arguments.length>3?ys.call(arguments,2):e),typeof n=="function"&&n.defaultProps!=null)for(s in n.defaultProps)a[s]===void 0&&(a[s]=n.defaultProps[s]);return Wr(n,a,i,r,null)}function Wr(n,t,e,i,r){var s={type:n,props:t,key:e,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:r??++Ic,__i:-1,__u:0};return r==null&&jt.vnode!=null&&jt.vnode(s),s}function Ts(n){return n.children}function Xr(n,t){this.props=n,this.context=t}function wi(n,t){if(t==null)return n.__?wi(n.__,n.__i+1):null;for(var e;t<n.__k.length;t++)if((e=n.__k[t])!=null&&e.__e!=null)return e.__e;return typeof n.type=="function"?wi(n):null}function uf(n){if(n.__P&&n.__d){var t=n.__v,e=t.__e,i=[],r=[],s=dn({},t);s.__v=t.__v+1,jt.vnode&&jt.vnode(s),wo(n.__P,s,t,n.__n,n.__P.namespaceURI,32&t.__u?[e]:null,i,e??wi(t),!!(32&t.__u),r),s.__v=t.__v,s.__.__k[s.__i]=s,Vc(i,s,r),t.__e=t.__=null,s.__e!=e&&zc(s)}}function zc(n){if((n=n.__)!=null&&n.__c!=null)return n.__e=n.__c.base=null,n.__k.some(function(t){if(t!=null&&t.__e!=null)return n.__e=n.__c.base=t.__e}),zc(n)}function xa(n){(!n.__d&&(n.__d=!0)&&An.push(n)&&!as.__r++||il!=jt.debounceRendering)&&((il=jt.debounceRendering)||Nc)(as)}function as(){try{for(var n,t=1;An.length;)An.length>t&&An.sort(Fc),n=An.shift(),t=An.length,uf(n)}finally{An.length=as.__r=0}}function kc(n,t,e,i,r,s,a,o,l,c,f){var u,h,p,_,v,m,d,E=i&&i.__k||ss,b=t.length;for(l=ff(e,t,E,l,b),u=0;u<b;u++)(p=e.__k[u])!=null&&(h=p.__i!=-1&&E[p.__i]||rs,p.__i=u,m=wo(n,p,h,r,s,a,o,l,c,f),_=p.__e,p.ref&&h.ref!=p.ref&&(h.ref&&Ao(h.ref,null,p),f.push(p.ref,p.__c||_,p)),v==null&&_!=null&&(v=_),(d=!!(4&p.__u))||h.__k===p.__k?(l=Hc(p,l,n,d),d&&h.__e&&(h.__e=null)):typeof p.type=="function"&&m!==void 0?l=m:_&&(l=_.nextSibling),p.__u&=-7);return e.__e=v,l}function ff(n,t,e,i,r){var s,a,o,l,c,f=e.length,u=f,h=0;for(n.__k=new Array(r),s=0;s<r;s++)(a=t[s])!=null&&typeof a!="boolean"&&typeof a!="function"?(typeof a=="string"||typeof a=="number"||typeof a=="bigint"||a.constructor==String?a=n.__k[s]=Wr(null,a,null,null,null):Es(a)?a=n.__k[s]=Wr(Ts,{children:a},null,null,null):a.constructor===void 0&&a.__b>0?a=n.__k[s]=Wr(a.type,a.props,a.key,a.ref?a.ref:null,a.__v):n.__k[s]=a,l=s+h,a.__=n,a.__b=n.__b+1,o=null,(c=a.__i=hf(a,e,l,u))!=-1&&(u--,(o=e[c])&&(o.__u|=2)),o==null||o.__v==null?(c==-1&&(r>f?h--:r<f&&h++),typeof a.type!="function"&&(a.__u|=4)):c!=l&&(c==l-1?h--:c==l+1?h++:(c>l?h--:h++,a.__u|=4))):n.__k[s]=null;if(u)for(s=0;s<f;s++)(o=e[s])!=null&&(2&o.__u)==0&&(o.__e==i&&(i=wi(o)),Wc(o,o));return i}function Hc(n,t,e,i){var r,s;if(typeof n.type=="function"){for(r=n.__k,s=0;r&&s<r.length;s++)r[s]&&(r[s].__=n,t=Hc(r[s],t,e,i));return t}n.__e!=t&&(i&&(t&&n.type&&!t.parentNode&&(t=wi(n)),e.insertBefore(n.__e,t||null)),t=n.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function hf(n,t,e,i){var r,s,a,o=n.key,l=n.type,c=t[e],f=c!=null&&(2&c.__u)==0;if(c===null&&o==null||f&&o==c.key&&l==c.type)return e;if(i>(f?1:0)){for(r=e-1,s=e+1;r>=0||s<t.length;)if((c=t[a=r>=0?r--:s++])!=null&&(2&c.__u)==0&&o==c.key&&l==c.type)return a}return-1}function rl(n,t,e){t[0]=="-"?n.setProperty(t,e??""):n[t]=e==null?"":typeof e!="number"||lf.test(t)?e:e+"px"}function _r(n,t,e,i,r){var s,a;t:if(t=="style")if(typeof e=="string")n.style.cssText=e;else{if(typeof i=="string"&&(n.style.cssText=i=""),i)for(t in i)e&&t in e||rl(n.style,t,"");if(e)for(t in e)i&&e[t]==i[t]||rl(n.style,t,e[t])}else if(t[0]=="o"&&t[1]=="n")s=t!=(t=t.replace(Oc,"$1")),a=t.toLowerCase(),t=a in n||t=="onFocusOut"||t=="onFocusIn"?a.slice(2):t.slice(2),n.l||(n.l={}),n.l[t+s]=e,e?i?e[Zi]=i[Zi]:(e[Zi]=To,n.addEventListener(t,s?va:ga,s)):n.removeEventListener(t,s?va:ga,s);else{if(r=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in n)try{n[t]=e??"";break t}catch{}typeof e=="function"||(e==null||e===!1&&t[4]!="-"?n.removeAttribute(t):n.setAttribute(t,t=="popover"&&e==1?"":e))}}function sl(n){return function(t){if(this.l){var e=this.l[t.type+n];if(t[Gr]==null)t[Gr]=To++;else if(t[Gr]<e[Zi])return;return e(jt.event?jt.event(t):t)}}}function wo(n,t,e,i,r,s,a,o,l,c){var f,u,h,p,_,v,m,d,E,b,S,U,C,A,O,y=t.type;if(t.constructor!==void 0)return null;128&e.__u&&(l=!!(32&e.__u),s=[o=t.__e=e.__e]),(f=jt.__b)&&f(t);t:if(typeof y=="function")try{if(d=t.props,E=y.prototype&&y.prototype.render,b=(f=y.contextType)&&i[f.__c],S=f?b?b.props.value:f.__:i,e.__c?m=(u=t.__c=e.__c).__=u.__E:(E?t.__c=u=new y(d,S):(t.__c=u=new Xr(d,S),u.constructor=y,u.render=pf),b&&b.sub(u),u.state||(u.state={}),u.__n=i,h=u.__d=!0,u.__h=[],u._sb=[]),E&&u.__s==null&&(u.__s=u.state),E&&y.getDerivedStateFromProps!=null&&(u.__s==u.state&&(u.__s=dn({},u.__s)),dn(u.__s,y.getDerivedStateFromProps(d,u.__s))),p=u.props,_=u.state,u.__v=t,h)E&&y.getDerivedStateFromProps==null&&u.componentWillMount!=null&&u.componentWillMount(),E&&u.componentDidMount!=null&&u.__h.push(u.componentDidMount);else{if(E&&y.getDerivedStateFromProps==null&&d!==p&&u.componentWillReceiveProps!=null&&u.componentWillReceiveProps(d,S),t.__v==e.__v||!u.__e&&u.shouldComponentUpdate!=null&&u.shouldComponentUpdate(d,u.__s,S)===!1){t.__v!=e.__v&&(u.props=d,u.state=u.__s,u.__d=!1),t.__e=e.__e,t.__k=e.__k,t.__k.some(function(M){M&&(M.__=t)}),ss.push.apply(u.__h,u._sb),u._sb=[],u.__h.length&&a.push(u);break t}u.componentWillUpdate!=null&&u.componentWillUpdate(d,u.__s,S),E&&u.componentDidUpdate!=null&&u.__h.push(function(){u.componentDidUpdate(p,_,v)})}if(u.context=S,u.props=d,u.__P=n,u.__e=!1,U=jt.__r,C=0,E)u.state=u.__s,u.__d=!1,U&&U(t),f=u.render(u.props,u.state,u.context),ss.push.apply(u.__h,u._sb),u._sb=[];else do u.__d=!1,U&&U(t),f=u.render(u.props,u.state,u.context),u.state=u.__s;while(u.__d&&++C<25);u.state=u.__s,u.getChildContext!=null&&(i=dn(dn({},i),u.getChildContext())),E&&!h&&u.getSnapshotBeforeUpdate!=null&&(v=u.getSnapshotBeforeUpdate(p,_)),A=f!=null&&f.type===Ts&&f.key==null?Gc(f.props.children):f,o=kc(n,Es(A)?A:[A],t,e,i,r,s,a,o,l,c),u.base=t.__e,t.__u&=-161,u.__h.length&&a.push(u),m&&(u.__E=u.__=null)}catch(M){if(t.__v=null,l||s!=null)if(M.then){for(t.__u|=l?160:128;o&&o.nodeType==8&&o.nextSibling;)o=o.nextSibling;s[s.indexOf(o)]=null,t.__e=o}else{for(O=s.length;O--;)bo(s[O]);Ma(t)}else t.__e=e.__e,t.__k=e.__k,M.then||Ma(t);jt.__e(M,t,e)}else s==null&&t.__v==e.__v?(t.__k=e.__k,t.__e=e.__e):o=t.__e=df(e.__e,t,e,i,r,s,a,l,c);return(f=jt.diffed)&&f(t),128&t.__u?void 0:o}function Ma(n){n&&(n.__c&&(n.__c.__e=!0),n.__k&&n.__k.some(Ma))}function Vc(n,t,e){for(var i=0;i<e.length;i++)Ao(e[i],e[++i],e[++i]);jt.__c&&jt.__c(t,n),n.some(function(r){try{n=r.__h,r.__h=[],n.some(function(s){s.call(r)})}catch(s){jt.__e(s,r.__v)}})}function Gc(n){return typeof n!="object"||n==null||n.__b>0?n:Es(n)?n.map(Gc):n.constructor!==void 0?null:dn({},n)}function df(n,t,e,i,r,s,a,o,l){var c,f,u,h,p,_,v,m=e.props||rs,d=t.props,E=t.type;if(E=="svg"?r="http://www.w3.org/2000/svg":E=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),s!=null){for(c=0;c<s.length;c++)if((p=s[c])&&"setAttribute"in p==!!E&&(E?p.localName==E:p.nodeType==3)){n=p,s[c]=null;break}}if(n==null){if(E==null)return document.createTextNode(d);n=document.createElementNS(r,E,d.is&&d),o&&(jt.__m&&jt.__m(t,s),o=!1),s=null}if(E==null)m===d||o&&n.data==d||(n.data=d);else{if(s=E=="textarea"&&d.defaultValue!=null?null:s&&ys.call(n.childNodes),!o&&s!=null)for(m={},c=0;c<n.attributes.length;c++)m[(p=n.attributes[c]).name]=p.value;for(c in m)p=m[c],c=="dangerouslySetInnerHTML"?u=p:c=="children"||c in d||c=="value"&&"defaultValue"in d||c=="checked"&&"defaultChecked"in d||_r(n,c,null,p,r);for(c in d)p=d[c],c=="children"?h=p:c=="dangerouslySetInnerHTML"?f=p:c=="value"?_=p:c=="checked"?v=p:o&&typeof p!="function"||m[c]===p||_r(n,c,p,m[c],r);if(f)o||u&&(f.__html==u.__html||f.__html==n.innerHTML)||(n.innerHTML=f.__html),t.__k=[];else if(u&&(n.innerHTML=""),kc(t.type=="template"?n.content:n,Es(h)?h:[h],t,e,i,E=="foreignObject"?"http://www.w3.org/1999/xhtml":r,s,a,s?s[0]:e.__k&&wi(e,0),o,l),s!=null)for(c=s.length;c--;)bo(s[c]);o&&E!="textarea"||(c="value",E=="progress"&&_==null?n.removeAttribute("value"):_!=null&&(_!==n[c]||E=="progress"&&!_||E=="option"&&_!=m[c])&&_r(n,c,_,m[c],r),c="checked",v!=null&&v!=n[c]&&_r(n,c,v,m[c],r))}return n}function Ao(n,t,e){try{if(typeof n=="function"){var i=typeof n.__u=="function";i&&n.__u(),i&&t==null||(n.__u=n(t))}else n.current=t}catch(r){jt.__e(r,e)}}function Wc(n,t,e){var i,r;if(jt.unmount&&jt.unmount(n),(i=n.ref)&&(i.current&&i.current!=n.__e||Ao(i,null,t)),(i=n.__c)!=null){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(s){jt.__e(s,t)}i.base=i.__P=null}if(i=n.__k)for(r=0;r<i.length;r++)i[r]&&Wc(i[r],t,e||typeof n.type!="function");e||bo(n.__e),n.__c=n.__=n.__e=void 0}function pf(n,t,e){return this.constructor(n,e)}function mf(n,t,e){var i,r,s,a;t==document&&(t=document.documentElement),jt.__&&jt.__(n,t),r=(i=!1)?null:t.__k,s=[],a=[],wo(t,n=t.__k=cf(Ts,null,[n]),r||rs,rs,t.namespaceURI,r?null:t.firstChild?ys.call(t.childNodes):null,s,r?r.__e:t.firstChild,i,a),Vc(s,n,a)}function _f(n){function t(e){var i,r;return this.getChildContext||(i=new Set,(r={})[t.__c]=this,this.getChildContext=function(){return r},this.componentWillUnmount=function(){i=null},this.shouldComponentUpdate=function(s){this.props.value!=s.value&&i.forEach(function(a){a.__e=!0,xa(a)})},this.sub=function(s){i.add(s);var a=s.componentWillUnmount;s.componentWillUnmount=function(){i&&i.delete(s),a&&a.call(s)}}),e.children}return t.__c="__cC"+Bc++,t.__=n,t.Provider=t.__l=(t.Consumer=function(e,i){return e.children(i)}).contextType=t,t}ys=ss.slice,jt={__e:function(n,t,e,i){for(var r,s,a;t=t.__;)if((r=t.__c)&&!r.__)try{if((s=r.constructor)&&s.getDerivedStateFromError!=null&&(r.setState(s.getDerivedStateFromError(n)),a=r.__d),r.componentDidCatch!=null&&(r.componentDidCatch(n,i||{}),a=r.__d),a)return r.__E=r}catch(o){n=o}throw n}},Ic=0,Xr.prototype.setState=function(n,t){var e;e=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=dn({},this.state),typeof n=="function"&&(n=n(dn({},e),this.props)),n&&dn(e,n),n!=null&&this.__v&&(t&&this._sb.push(t),xa(this))},Xr.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),xa(this))},Xr.prototype.render=Ts,An=[],Nc=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Fc=function(n,t){return n.__v.__b-t.__v.__b},as.__r=0,Us=Math.random().toString(8),Gr="__d"+Us,Zi="__a"+Us,Oc=/(PointerCapture)$|Capture$/i,To=0,ga=sl(!1),va=sl(!0),Bc=0;var gf=0;function j(n,t,e,i,r,s){t||(t={});var a,o,l=t;if("ref"in l)for(o in l={},t)o=="ref"?a=t[o]:l[o]=t[o];var c={type:n,props:l,key:e,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--gf,__i:-1,__u:0,__source:r,__self:s};if(typeof n=="function"&&(a=n.defaultProps))for(o in a)l[o]===void 0&&(l[o]=a[o]);return jt.vnode&&jt.vnode(c),c}var Ai,ae,Is,al,os=0,Xc=[],ue=jt,ol=ue.__b,ll=ue.__r,cl=ue.diffed,ul=ue.__c,fl=ue.unmount,hl=ue.__;function bs(n,t){ue.__h&&ue.__h(ae,n,os||t),os=0;var e=ae.__H||(ae.__H={__:[],__h:[]});return n>=e.__.length&&e.__.push({}),e.__[n]}function Je(n){return os=1,vf(qc,n)}function vf(n,t,e){var i=bs(Ai++,2);if(i.t=n,!i.__c&&(i.__=[qc(void 0,t),function(o){var l=i.__N?i.__N[0]:i.__[0],c=i.t(l,o);l!==c&&(i.__N=[c,i.__[1]],i.__c.setState({}))}],i.__c=ae,!ae.__f)){var r=function(o,l,c){if(!i.__c.__H)return!0;var f=i.__c.__H.__.filter(function(h){return h.__c});if(f.every(function(h){return!h.__N}))return!s||s.call(this,o,l,c);var u=i.__c.props!==o;return f.some(function(h){if(h.__N){var p=h.__[0];h.__=h.__N,h.__N=void 0,p!==h.__[0]&&(u=!0)}}),s&&s.call(this,o,l,c)||u};ae.__f=!0;var s=ae.shouldComponentUpdate,a=ae.componentWillUpdate;ae.componentWillUpdate=function(o,l,c){if(this.__e){var f=s;s=void 0,r(o,l,c),s=f}a&&a.call(this,o,l,c)},ae.shouldComponentUpdate=r}return i.__N||i.__}function gn(n,t){var e=bs(Ai++,3);!ue.__s&&$c(e.__H,t)&&(e.__=n,e.u=t,ae.__H.__h.push(e))}function Ji(n){return os=5,xf(function(){return{current:n}},[])}function xf(n,t){var e=bs(Ai++,7);return $c(e.__H,t)&&(e.__=n(),e.__H=t,e.__h=n),e.__}function Mf(n){var t=ae.context[n.__c],e=bs(Ai++,9);return e.c=n,t?(e.__==null&&(e.__=!0,t.sub(ae)),t.props.value):n.__}function Sf(){for(var n;n=Xc.shift();){var t=n.__H;if(n.__P&&t)try{t.__h.some($r),t.__h.some(Sa),t.__h=[]}catch(e){t.__h=[],ue.__e(e,n.__v)}}}ue.__b=function(n){ae=null,ol&&ol(n)},ue.__=function(n,t){n&&t.__k&&t.__k.__m&&(n.__m=t.__k.__m),hl&&hl(n,t)},ue.__r=function(n){ll&&ll(n),Ai=0;var t=(ae=n.__c).__H;t&&(Is===ae?(t.__h=[],ae.__h=[],t.__.some(function(e){e.__N&&(e.__=e.__N),e.u=e.__N=void 0})):(t.__h.some($r),t.__h.some(Sa),t.__h=[],Ai=0)),Is=ae},ue.diffed=function(n){cl&&cl(n);var t=n.__c;t&&t.__H&&(t.__H.__h.length&&(Xc.push(t)!==1&&al===ue.requestAnimationFrame||((al=ue.requestAnimationFrame)||yf)(Sf)),t.__H.__.some(function(e){e.u&&(e.__H=e.u),e.u=void 0})),Is=ae=null},ue.__c=function(n,t){t.some(function(e){try{e.__h.some($r),e.__h=e.__h.filter(function(i){return!i.__||Sa(i)})}catch(i){t.some(function(r){r.__h&&(r.__h=[])}),t=[],ue.__e(i,e.__v)}}),ul&&ul(n,t)},ue.unmount=function(n){fl&&fl(n);var t,e=n.__c;e&&e.__H&&(e.__H.__.some(function(i){try{$r(i)}catch(r){t=r}}),e.__H=void 0,t&&ue.__e(t,e.__v))};var dl=typeof requestAnimationFrame=="function";function yf(n){var t,e=function(){clearTimeout(i),dl&&cancelAnimationFrame(t),setTimeout(n)},i=setTimeout(e,35);dl&&(t=requestAnimationFrame(e))}function $r(n){var t=ae,e=n.__c;typeof e=="function"&&(n.__c=void 0,e()),ae=t}function Sa(n){var t=ae;n.__c=n.__(),ae=t}function $c(n,t){return!n||n.length!==t.length||t.some(function(e,i){return e!==n[i]})}function qc(n,t){return typeof t=="function"?t(n):t}const Yc=_f();function ze(){return Mf(Yc)}function qr(n,t){return n==null||t==null?NaN:n<t?-1:n>t?1:n>=t?0:NaN}function Ef(n,t){return n==null||t==null?NaN:t<n?-1:t>n?1:t>=n?0:NaN}function Kc(n){let t,e,i;n.length!==2?(t=qr,e=(o,l)=>qr(n(o),l),i=(o,l)=>n(o)-l):(t=n===qr||n===Ef?n:Tf,e=n,i=n);function r(o,l,c=0,f=o.length){if(c<f){if(t(l,l)!==0)return f;do{const u=c+f>>>1;e(o[u],l)<0?c=u+1:f=u}while(c<f)}return c}function s(o,l,c=0,f=o.length){if(c<f){if(t(l,l)!==0)return f;do{const u=c+f>>>1;e(o[u],l)<=0?c=u+1:f=u}while(c<f)}return c}function a(o,l,c=0,f=o.length){const u=r(o,l,c,f-1);return u>c&&i(o[u-1],l)>-i(o[u],l)?u-1:u}return{left:r,center:a,right:s}}function Tf(){return 0}function bf(n){return n===null?NaN:+n}const wf=Kc(qr),Af=wf.right;Kc(bf).center;const Rf=Math.sqrt(50),Cf=Math.sqrt(10),Pf=Math.sqrt(2);function ls(n,t,e){const i=(t-n)/Math.max(0,e),r=Math.floor(Math.log10(i)),s=i/Math.pow(10,r),a=s>=Rf?10:s>=Cf?5:s>=Pf?2:1;let o,l,c;return r<0?(c=Math.pow(10,-r)/a,o=Math.round(n*c),l=Math.round(t*c),o/c<n&&++o,l/c>t&&--l,c=-c):(c=Math.pow(10,r)*a,o=Math.round(n/c),l=Math.round(t/c),o*c<n&&++o,l*c>t&&--l),l<o&&.5<=e&&e<2?ls(n,t,e*2):[o,l,c]}function Df(n,t,e){if(t=+t,n=+n,e=+e,!(e>0))return[];if(n===t)return[n];const i=t<n,[r,s,a]=i?ls(t,n,e):ls(n,t,e);if(!(s>=r))return[];const o=s-r+1,l=new Array(o);if(i)if(a<0)for(let c=0;c<o;++c)l[c]=(s-c)/-a;else for(let c=0;c<o;++c)l[c]=(s-c)*a;else if(a<0)for(let c=0;c<o;++c)l[c]=(r+c)/-a;else for(let c=0;c<o;++c)l[c]=(r+c)*a;return l}function ya(n,t,e){return t=+t,n=+n,e=+e,ls(n,t,e)[2]}function Lf(n,t,e){t=+t,n=+n,e=+e;const i=t<n,r=i?ya(t,n,e):ya(n,t,e);return(i?-1:1)*(r<0?1/-r:r)}var Uf={value:()=>{}};function Ro(){for(var n=0,t=arguments.length,e={},i;n<t;++n){if(!(i=arguments[n]+"")||i in e||/[\s.]/.test(i))throw new Error("illegal type: "+i);e[i]=[]}return new Yr(e)}function Yr(n){this._=n}function If(n,t){return n.trim().split(/^|\s+/).map(function(e){var i="",r=e.indexOf(".");if(r>=0&&(i=e.slice(r+1),e=e.slice(0,r)),e&&!t.hasOwnProperty(e))throw new Error("unknown type: "+e);return{type:e,name:i}})}Yr.prototype=Ro.prototype={constructor:Yr,on:function(n,t){var e=this._,i=If(n+"",e),r,s=-1,a=i.length;if(arguments.length<2){for(;++s<a;)if((r=(n=i[s]).type)&&(r=Nf(e[r],n.name)))return r;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++s<a;)if(r=(n=i[s]).type)e[r]=pl(e[r],n.name,t);else if(t==null)for(r in e)e[r]=pl(e[r],n.name,null);return this},copy:function(){var n={},t=this._;for(var e in t)n[e]=t[e].slice();return new Yr(n)},call:function(n,t){if((r=arguments.length-2)>0)for(var e=new Array(r),i=0,r,s;i<r;++i)e[i]=arguments[i+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(s=this._[n],i=0,r=s.length;i<r;++i)s[i].value.apply(t,e)},apply:function(n,t,e){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var i=this._[n],r=0,s=i.length;r<s;++r)i[r].value.apply(t,e)}};function Nf(n,t){for(var e=0,i=n.length,r;e<i;++e)if((r=n[e]).name===t)return r.value}function pl(n,t,e){for(var i=0,r=n.length;i<r;++i)if(n[i].name===t){n[i]=Uf,n=n.slice(0,i).concat(n.slice(i+1));break}return e!=null&&n.push({name:t,value:e}),n}var Ea="http://www.w3.org/1999/xhtml";const ml={svg:"http://www.w3.org/2000/svg",xhtml:Ea,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function ws(n){var t=n+="",e=t.indexOf(":");return e>=0&&(t=n.slice(0,e))!=="xmlns"&&(n=n.slice(e+1)),ml.hasOwnProperty(t)?{space:ml[t],local:n}:n}function Ff(n){return function(){var t=this.ownerDocument,e=this.namespaceURI;return e===Ea&&t.documentElement.namespaceURI===Ea?t.createElement(n):t.createElementNS(e,n)}}function Of(n){return function(){return this.ownerDocument.createElementNS(n.space,n.local)}}function Zc(n){var t=ws(n);return(t.local?Of:Ff)(t)}function Bf(){}function Co(n){return n==null?Bf:function(){return this.querySelector(n)}}function zf(n){typeof n!="function"&&(n=Co(n));for(var t=this._groups,e=t.length,i=new Array(e),r=0;r<e;++r)for(var s=t[r],a=s.length,o=i[r]=new Array(a),l,c,f=0;f<a;++f)(l=s[f])&&(c=n.call(l,l.__data__,f,s))&&("__data__"in l&&(c.__data__=l.__data__),o[f]=c);return new Ue(i,this._parents)}function kf(n){return n==null?[]:Array.isArray(n)?n:Array.from(n)}function Hf(){return[]}function Jc(n){return n==null?Hf:function(){return this.querySelectorAll(n)}}function Vf(n){return function(){return kf(n.apply(this,arguments))}}function Gf(n){typeof n=="function"?n=Vf(n):n=Jc(n);for(var t=this._groups,e=t.length,i=[],r=[],s=0;s<e;++s)for(var a=t[s],o=a.length,l,c=0;c<o;++c)(l=a[c])&&(i.push(n.call(l,l.__data__,c,a)),r.push(l));return new Ue(i,r)}function jc(n){return function(){return this.matches(n)}}function Qc(n){return function(t){return t.matches(n)}}var Wf=Array.prototype.find;function Xf(n){return function(){return Wf.call(this.children,n)}}function $f(){return this.firstElementChild}function qf(n){return this.select(n==null?$f:Xf(typeof n=="function"?n:Qc(n)))}var Yf=Array.prototype.filter;function Kf(){return Array.from(this.children)}function Zf(n){return function(){return Yf.call(this.children,n)}}function Jf(n){return this.selectAll(n==null?Kf:Zf(typeof n=="function"?n:Qc(n)))}function jf(n){typeof n!="function"&&(n=jc(n));for(var t=this._groups,e=t.length,i=new Array(e),r=0;r<e;++r)for(var s=t[r],a=s.length,o=i[r]=[],l,c=0;c<a;++c)(l=s[c])&&n.call(l,l.__data__,c,s)&&o.push(l);return new Ue(i,this._parents)}function tu(n){return new Array(n.length)}function Qf(){return new Ue(this._enter||this._groups.map(tu),this._parents)}function cs(n,t){this.ownerDocument=n.ownerDocument,this.namespaceURI=n.namespaceURI,this._next=null,this._parent=n,this.__data__=t}cs.prototype={constructor:cs,appendChild:function(n){return this._parent.insertBefore(n,this._next)},insertBefore:function(n,t){return this._parent.insertBefore(n,t)},querySelector:function(n){return this._parent.querySelector(n)},querySelectorAll:function(n){return this._parent.querySelectorAll(n)}};function th(n){return function(){return n}}function eh(n,t,e,i,r,s){for(var a=0,o,l=t.length,c=s.length;a<c;++a)(o=t[a])?(o.__data__=s[a],i[a]=o):e[a]=new cs(n,s[a]);for(;a<l;++a)(o=t[a])&&(r[a]=o)}function nh(n,t,e,i,r,s,a){var o,l,c=new Map,f=t.length,u=s.length,h=new Array(f),p;for(o=0;o<f;++o)(l=t[o])&&(h[o]=p=a.call(l,l.__data__,o,t)+"",c.has(p)?r[o]=l:c.set(p,l));for(o=0;o<u;++o)p=a.call(n,s[o],o,s)+"",(l=c.get(p))?(i[o]=l,l.__data__=s[o],c.delete(p)):e[o]=new cs(n,s[o]);for(o=0;o<f;++o)(l=t[o])&&c.get(h[o])===l&&(r[o]=l)}function ih(n){return n.__data__}function rh(n,t){if(!arguments.length)return Array.from(this,ih);var e=t?nh:eh,i=this._parents,r=this._groups;typeof n!="function"&&(n=th(n));for(var s=r.length,a=new Array(s),o=new Array(s),l=new Array(s),c=0;c<s;++c){var f=i[c],u=r[c],h=u.length,p=sh(n.call(f,f&&f.__data__,c,i)),_=p.length,v=o[c]=new Array(_),m=a[c]=new Array(_),d=l[c]=new Array(h);e(f,u,v,m,d,p,t);for(var E=0,b=0,S,U;E<_;++E)if(S=v[E]){for(E>=b&&(b=E+1);!(U=m[b])&&++b<_;);S._next=U||null}}return a=new Ue(a,i),a._enter=o,a._exit=l,a}function sh(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function ah(){return new Ue(this._exit||this._groups.map(tu),this._parents)}function oh(n,t,e){var i=this.enter(),r=this,s=this.exit();return typeof n=="function"?(i=n(i),i&&(i=i.selection())):i=i.append(n+""),t!=null&&(r=t(r),r&&(r=r.selection())),e==null?s.remove():e(s),i&&r?i.merge(r).order():r}function lh(n){for(var t=n.selection?n.selection():n,e=this._groups,i=t._groups,r=e.length,s=i.length,a=Math.min(r,s),o=new Array(r),l=0;l<a;++l)for(var c=e[l],f=i[l],u=c.length,h=o[l]=new Array(u),p,_=0;_<u;++_)(p=c[_]||f[_])&&(h[_]=p);for(;l<r;++l)o[l]=e[l];return new Ue(o,this._parents)}function ch(){for(var n=this._groups,t=-1,e=n.length;++t<e;)for(var i=n[t],r=i.length-1,s=i[r],a;--r>=0;)(a=i[r])&&(s&&a.compareDocumentPosition(s)^4&&s.parentNode.insertBefore(a,s),s=a);return this}function uh(n){n||(n=fh);function t(u,h){return u&&h?n(u.__data__,h.__data__):!u-!h}for(var e=this._groups,i=e.length,r=new Array(i),s=0;s<i;++s){for(var a=e[s],o=a.length,l=r[s]=new Array(o),c,f=0;f<o;++f)(c=a[f])&&(l[f]=c);l.sort(t)}return new Ue(r,this._parents).order()}function fh(n,t){return n<t?-1:n>t?1:n>=t?0:NaN}function hh(){var n=arguments[0];return arguments[0]=this,n.apply(null,arguments),this}function dh(){return Array.from(this)}function ph(){for(var n=this._groups,t=0,e=n.length;t<e;++t)for(var i=n[t],r=0,s=i.length;r<s;++r){var a=i[r];if(a)return a}return null}function mh(){let n=0;for(const t of this)++n;return n}function _h(){return!this.node()}function gh(n){for(var t=this._groups,e=0,i=t.length;e<i;++e)for(var r=t[e],s=0,a=r.length,o;s<a;++s)(o=r[s])&&n.call(o,o.__data__,s,r);return this}function vh(n){return function(){this.removeAttribute(n)}}function xh(n){return function(){this.removeAttributeNS(n.space,n.local)}}function Mh(n,t){return function(){this.setAttribute(n,t)}}function Sh(n,t){return function(){this.setAttributeNS(n.space,n.local,t)}}function yh(n,t){return function(){var e=t.apply(this,arguments);e==null?this.removeAttribute(n):this.setAttribute(n,e)}}function Eh(n,t){return function(){var e=t.apply(this,arguments);e==null?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}}function Th(n,t){var e=ws(n);if(arguments.length<2){var i=this.node();return e.local?i.getAttributeNS(e.space,e.local):i.getAttribute(e)}return this.each((t==null?e.local?xh:vh:typeof t=="function"?e.local?Eh:yh:e.local?Sh:Mh)(e,t))}function eu(n){return n.ownerDocument&&n.ownerDocument.defaultView||n.document&&n||n.defaultView}function bh(n){return function(){this.style.removeProperty(n)}}function wh(n,t,e){return function(){this.style.setProperty(n,t,e)}}function Ah(n,t,e){return function(){var i=t.apply(this,arguments);i==null?this.style.removeProperty(n):this.style.setProperty(n,i,e)}}function Rh(n,t,e){return arguments.length>1?this.each((t==null?bh:typeof t=="function"?Ah:wh)(n,t,e??"")):Ri(this.node(),n)}function Ri(n,t){return n.style.getPropertyValue(t)||eu(n).getComputedStyle(n,null).getPropertyValue(t)}function Ch(n){return function(){delete this[n]}}function Ph(n,t){return function(){this[n]=t}}function Dh(n,t){return function(){var e=t.apply(this,arguments);e==null?delete this[n]:this[n]=e}}function Lh(n,t){return arguments.length>1?this.each((t==null?Ch:typeof t=="function"?Dh:Ph)(n,t)):this.node()[n]}function nu(n){return n.trim().split(/^|\s+/)}function Po(n){return n.classList||new iu(n)}function iu(n){this._node=n,this._names=nu(n.getAttribute("class")||"")}iu.prototype={add:function(n){var t=this._names.indexOf(n);t<0&&(this._names.push(n),this._node.setAttribute("class",this._names.join(" ")))},remove:function(n){var t=this._names.indexOf(n);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(n){return this._names.indexOf(n)>=0}};function ru(n,t){for(var e=Po(n),i=-1,r=t.length;++i<r;)e.add(t[i])}function su(n,t){for(var e=Po(n),i=-1,r=t.length;++i<r;)e.remove(t[i])}function Uh(n){return function(){ru(this,n)}}function Ih(n){return function(){su(this,n)}}function Nh(n,t){return function(){(t.apply(this,arguments)?ru:su)(this,n)}}function Fh(n,t){var e=nu(n+"");if(arguments.length<2){for(var i=Po(this.node()),r=-1,s=e.length;++r<s;)if(!i.contains(e[r]))return!1;return!0}return this.each((typeof t=="function"?Nh:t?Uh:Ih)(e,t))}function Oh(){this.textContent=""}function Bh(n){return function(){this.textContent=n}}function zh(n){return function(){var t=n.apply(this,arguments);this.textContent=t??""}}function kh(n){return arguments.length?this.each(n==null?Oh:(typeof n=="function"?zh:Bh)(n)):this.node().textContent}function Hh(){this.innerHTML=""}function Vh(n){return function(){this.innerHTML=n}}function Gh(n){return function(){var t=n.apply(this,arguments);this.innerHTML=t??""}}function Wh(n){return arguments.length?this.each(n==null?Hh:(typeof n=="function"?Gh:Vh)(n)):this.node().innerHTML}function Xh(){this.nextSibling&&this.parentNode.appendChild(this)}function $h(){return this.each(Xh)}function qh(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Yh(){return this.each(qh)}function Kh(n){var t=typeof n=="function"?n:Zc(n);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function Zh(){return null}function Jh(n,t){var e=typeof n=="function"?n:Zc(n),i=t==null?Zh:typeof t=="function"?t:Co(t);return this.select(function(){return this.insertBefore(e.apply(this,arguments),i.apply(this,arguments)||null)})}function jh(){var n=this.parentNode;n&&n.removeChild(this)}function Qh(){return this.each(jh)}function td(){var n=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}function ed(){var n=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}function nd(n){return this.select(n?ed:td)}function id(n){return arguments.length?this.property("__data__",n):this.node().__data__}function rd(n){return function(t){n.call(this,t,this.__data__)}}function sd(n){return n.trim().split(/^|\s+/).map(function(t){var e="",i=t.indexOf(".");return i>=0&&(e=t.slice(i+1),t=t.slice(0,i)),{type:t,name:e}})}function ad(n){return function(){var t=this.__on;if(t){for(var e=0,i=-1,r=t.length,s;e<r;++e)s=t[e],(!n.type||s.type===n.type)&&s.name===n.name?this.removeEventListener(s.type,s.listener,s.options):t[++i]=s;++i?t.length=i:delete this.__on}}}function od(n,t,e){return function(){var i=this.__on,r,s=rd(t);if(i){for(var a=0,o=i.length;a<o;++a)if((r=i[a]).type===n.type&&r.name===n.name){this.removeEventListener(r.type,r.listener,r.options),this.addEventListener(r.type,r.listener=s,r.options=e),r.value=t;return}}this.addEventListener(n.type,s,e),r={type:n.type,name:n.name,value:t,listener:s,options:e},i?i.push(r):this.__on=[r]}}function ld(n,t,e){var i=sd(n+""),r,s=i.length,a;if(arguments.length<2){var o=this.node().__on;if(o){for(var l=0,c=o.length,f;l<c;++l)for(r=0,f=o[l];r<s;++r)if((a=i[r]).type===f.type&&a.name===f.name)return f.value}return}for(o=t?od:ad,r=0;r<s;++r)this.each(o(i[r],t,e));return this}function au(n,t,e){var i=eu(n),r=i.CustomEvent;typeof r=="function"?r=new r(t,e):(r=i.document.createEvent("Event"),e?(r.initEvent(t,e.bubbles,e.cancelable),r.detail=e.detail):r.initEvent(t,!1,!1)),n.dispatchEvent(r)}function cd(n,t){return function(){return au(this,n,t)}}function ud(n,t){return function(){return au(this,n,t.apply(this,arguments))}}function fd(n,t){return this.each((typeof t=="function"?ud:cd)(n,t))}function*hd(){for(var n=this._groups,t=0,e=n.length;t<e;++t)for(var i=n[t],r=0,s=i.length,a;r<s;++r)(a=i[r])&&(yield a)}var ou=[null];function Ue(n,t){this._groups=n,this._parents=t}function sr(){return new Ue([[document.documentElement]],ou)}function dd(){return this}Ue.prototype=sr.prototype={constructor:Ue,select:zf,selectAll:Gf,selectChild:qf,selectChildren:Jf,filter:jf,data:rh,enter:Qf,exit:ah,join:oh,merge:lh,selection:dd,order:ch,sort:uh,call:hh,nodes:dh,node:ph,size:mh,empty:_h,each:gh,attr:Th,style:Rh,property:Lh,classed:Fh,text:kh,html:Wh,raise:$h,lower:Yh,append:Kh,insert:Jh,remove:Qh,clone:nd,datum:id,on:ld,dispatch:fd,[Symbol.iterator]:hd};function Rn(n){return typeof n=="string"?new Ue([[document.querySelector(n)]],[document.documentElement]):new Ue([[n]],ou)}function pd(n){let t;for(;t=n.sourceEvent;)n=t;return n}function Fn(n,t){if(n=pd(n),t===void 0&&(t=n.currentTarget),t){var e=t.ownerSVGElement||t;if(e.createSVGPoint){var i=e.createSVGPoint();return i.x=n.clientX,i.y=n.clientY,i=i.matrixTransform(t.getScreenCTM().inverse()),[i.x,i.y]}if(t.getBoundingClientRect){var r=t.getBoundingClientRect();return[n.clientX-r.left-t.clientLeft,n.clientY-r.top-t.clientTop]}}return[n.pageX,n.pageY]}const Ta={capture:!0,passive:!1};function ba(n){n.preventDefault(),n.stopImmediatePropagation()}function md(n){var t=n.document.documentElement,e=Rn(n).on("dragstart.drag",ba,Ta);"onselectstart"in t?e.on("selectstart.drag",ba,Ta):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function _d(n,t){var e=n.document.documentElement,i=Rn(n).on("dragstart.drag",null);t&&(i.on("click.drag",ba,Ta),setTimeout(function(){i.on("click.drag",null)},0)),"onselectstart"in e?i.on("selectstart.drag",null):(e.style.MozUserSelect=e.__noselect,delete e.__noselect)}function Do(n,t,e){n.prototype=t.prototype=e,e.constructor=n}function lu(n,t){var e=Object.create(n.prototype);for(var i in t)e[i]=t[i];return e}function ar(){}var ji=.7,us=1/ji,yi="\\s*([+-]?\\d+)\\s*",Qi="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Qe="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",gd=/^#([0-9a-f]{3,8})$/,vd=new RegExp(`^rgb\\(${yi},${yi},${yi}\\)$`),xd=new RegExp(`^rgb\\(${Qe},${Qe},${Qe}\\)$`),Md=new RegExp(`^rgba\\(${yi},${yi},${yi},${Qi}\\)$`),Sd=new RegExp(`^rgba\\(${Qe},${Qe},${Qe},${Qi}\\)$`),yd=new RegExp(`^hsl\\(${Qi},${Qe},${Qe}\\)$`),Ed=new RegExp(`^hsla\\(${Qi},${Qe},${Qe},${Qi}\\)$`),_l={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Do(ar,Qn,{copy(n){return Object.assign(new this.constructor,this,n)},displayable(){return this.rgb().displayable()},hex:gl,formatHex:gl,formatHex8:Td,formatHsl:bd,formatRgb:vl,toString:vl});function gl(){return this.rgb().formatHex()}function Td(){return this.rgb().formatHex8()}function bd(){return cu(this).formatHsl()}function vl(){return this.rgb().formatRgb()}function Qn(n){var t,e;return n=(n+"").trim().toLowerCase(),(t=gd.exec(n))?(e=t[1].length,t=parseInt(t[1],16),e===6?xl(t):e===3?new be(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):e===8?gr(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):e===4?gr(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=vd.exec(n))?new be(t[1],t[2],t[3],1):(t=xd.exec(n))?new be(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=Md.exec(n))?gr(t[1],t[2],t[3],t[4]):(t=Sd.exec(n))?gr(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=yd.exec(n))?yl(t[1],t[2]/100,t[3]/100,1):(t=Ed.exec(n))?yl(t[1],t[2]/100,t[3]/100,t[4]):_l.hasOwnProperty(n)?xl(_l[n]):n==="transparent"?new be(NaN,NaN,NaN,0):null}function xl(n){return new be(n>>16&255,n>>8&255,n&255,1)}function gr(n,t,e,i){return i<=0&&(n=t=e=NaN),new be(n,t,e,i)}function wd(n){return n instanceof ar||(n=Qn(n)),n?(n=n.rgb(),new be(n.r,n.g,n.b,n.opacity)):new be}function wa(n,t,e,i){return arguments.length===1?wd(n):new be(n,t,e,i??1)}function be(n,t,e,i){this.r=+n,this.g=+t,this.b=+e,this.opacity=+i}Do(be,wa,lu(ar,{brighter(n){return n=n==null?us:Math.pow(us,n),new be(this.r*n,this.g*n,this.b*n,this.opacity)},darker(n){return n=n==null?ji:Math.pow(ji,n),new be(this.r*n,this.g*n,this.b*n,this.opacity)},rgb(){return this},clamp(){return new be(Jn(this.r),Jn(this.g),Jn(this.b),fs(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Ml,formatHex:Ml,formatHex8:Ad,formatRgb:Sl,toString:Sl}));function Ml(){return`#${Yn(this.r)}${Yn(this.g)}${Yn(this.b)}`}function Ad(){return`#${Yn(this.r)}${Yn(this.g)}${Yn(this.b)}${Yn((isNaN(this.opacity)?1:this.opacity)*255)}`}function Sl(){const n=fs(this.opacity);return`${n===1?"rgb(":"rgba("}${Jn(this.r)}, ${Jn(this.g)}, ${Jn(this.b)}${n===1?")":`, ${n})`}`}function fs(n){return isNaN(n)?1:Math.max(0,Math.min(1,n))}function Jn(n){return Math.max(0,Math.min(255,Math.round(n)||0))}function Yn(n){return n=Jn(n),(n<16?"0":"")+n.toString(16)}function yl(n,t,e,i){return i<=0?n=t=e=NaN:e<=0||e>=1?n=t=NaN:t<=0&&(n=NaN),new Xe(n,t,e,i)}function cu(n){if(n instanceof Xe)return new Xe(n.h,n.s,n.l,n.opacity);if(n instanceof ar||(n=Qn(n)),!n)return new Xe;if(n instanceof Xe)return n;n=n.rgb();var t=n.r/255,e=n.g/255,i=n.b/255,r=Math.min(t,e,i),s=Math.max(t,e,i),a=NaN,o=s-r,l=(s+r)/2;return o?(t===s?a=(e-i)/o+(e<i)*6:e===s?a=(i-t)/o+2:a=(t-e)/o+4,o/=l<.5?s+r:2-s-r,a*=60):o=l>0&&l<1?0:a,new Xe(a,o,l,n.opacity)}function Rd(n,t,e,i){return arguments.length===1?cu(n):new Xe(n,t,e,i??1)}function Xe(n,t,e,i){this.h=+n,this.s=+t,this.l=+e,this.opacity=+i}Do(Xe,Rd,lu(ar,{brighter(n){return n=n==null?us:Math.pow(us,n),new Xe(this.h,this.s,this.l*n,this.opacity)},darker(n){return n=n==null?ji:Math.pow(ji,n),new Xe(this.h,this.s,this.l*n,this.opacity)},rgb(){var n=this.h%360+(this.h<0)*360,t=isNaN(n)||isNaN(this.s)?0:this.s,e=this.l,i=e+(e<.5?e:1-e)*t,r=2*e-i;return new be(Ns(n>=240?n-240:n+120,r,i),Ns(n,r,i),Ns(n<120?n+240:n-120,r,i),this.opacity)},clamp(){return new Xe(El(this.h),vr(this.s),vr(this.l),fs(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const n=fs(this.opacity);return`${n===1?"hsl(":"hsla("}${El(this.h)}, ${vr(this.s)*100}%, ${vr(this.l)*100}%${n===1?")":`, ${n})`}`}}));function El(n){return n=(n||0)%360,n<0?n+360:n}function vr(n){return Math.max(0,Math.min(1,n||0))}function Ns(n,t,e){return(n<60?t+(e-t)*n/60:n<180?e:n<240?t+(e-t)*(240-n)/60:t)*255}const Lo=n=>()=>n;function Cd(n,t){return function(e){return n+e*t}}function Pd(n,t,e){return n=Math.pow(n,e),t=Math.pow(t,e)-n,e=1/e,function(i){return Math.pow(n+i*t,e)}}function Dd(n){return(n=+n)==1?uu:function(t,e){return e-t?Pd(t,e,n):Lo(isNaN(t)?e:t)}}function uu(n,t){var e=t-n;return e?Cd(n,e):Lo(isNaN(n)?t:n)}const hs=function n(t){var e=Dd(t);function i(r,s){var a=e((r=wa(r)).r,(s=wa(s)).r),o=e(r.g,s.g),l=e(r.b,s.b),c=uu(r.opacity,s.opacity);return function(f){return r.r=a(f),r.g=o(f),r.b=l(f),r.opacity=c(f),r+""}}return i.gamma=n,i}(1);function Ld(n,t){t||(t=[]);var e=n?Math.min(t.length,n.length):0,i=t.slice(),r;return function(s){for(r=0;r<e;++r)i[r]=n[r]*(1-s)+t[r]*s;return i}}function Ud(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Id(n,t){var e=t?t.length:0,i=n?Math.min(e,n.length):0,r=new Array(i),s=new Array(e),a;for(a=0;a<i;++a)r[a]=Uo(n[a],t[a]);for(;a<e;++a)s[a]=t[a];return function(o){for(a=0;a<i;++a)s[a]=r[a](o);return s}}function Nd(n,t){var e=new Date;return n=+n,t=+t,function(i){return e.setTime(n*(1-i)+t*i),e}}function We(n,t){return n=+n,t=+t,function(e){return n*(1-e)+t*e}}function Fd(n,t){var e={},i={},r;(n===null||typeof n!="object")&&(n={}),(t===null||typeof t!="object")&&(t={});for(r in t)r in n?e[r]=Uo(n[r],t[r]):i[r]=t[r];return function(s){for(r in e)i[r]=e[r](s);return i}}var Aa=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Fs=new RegExp(Aa.source,"g");function Od(n){return function(){return n}}function Bd(n){return function(t){return n(t)+""}}function fu(n,t){var e=Aa.lastIndex=Fs.lastIndex=0,i,r,s,a=-1,o=[],l=[];for(n=n+"",t=t+"";(i=Aa.exec(n))&&(r=Fs.exec(t));)(s=r.index)>e&&(s=t.slice(e,s),o[a]?o[a]+=s:o[++a]=s),(i=i[0])===(r=r[0])?o[a]?o[a]+=r:o[++a]=r:(o[++a]=null,l.push({i:a,x:We(i,r)})),e=Fs.lastIndex;return e<t.length&&(s=t.slice(e),o[a]?o[a]+=s:o[++a]=s),o.length<2?l[0]?Bd(l[0].x):Od(t):(t=l.length,function(c){for(var f=0,u;f<t;++f)o[(u=l[f]).i]=u.x(c);return o.join("")})}function Uo(n,t){var e=typeof t,i;return t==null||e==="boolean"?Lo(t):(e==="number"?We:e==="string"?(i=Qn(t))?(t=i,hs):fu:t instanceof Qn?hs:t instanceof Date?Nd:Ud(t)?Ld:Array.isArray(t)?Id:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?Fd:We)(n,t)}function zd(n,t){return n=+n,t=+t,function(e){return Math.round(n*(1-e)+t*e)}}var Tl=180/Math.PI,Ra={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function hu(n,t,e,i,r,s){var a,o,l;return(a=Math.sqrt(n*n+t*t))&&(n/=a,t/=a),(l=n*e+t*i)&&(e-=n*l,i-=t*l),(o=Math.sqrt(e*e+i*i))&&(e/=o,i/=o,l/=o),n*i<t*e&&(n=-n,t=-t,l=-l,a=-a),{translateX:r,translateY:s,rotate:Math.atan2(t,n)*Tl,skewX:Math.atan(l)*Tl,scaleX:a,scaleY:o}}var xr;function kd(n){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(n+"");return t.isIdentity?Ra:hu(t.a,t.b,t.c,t.d,t.e,t.f)}function Hd(n){return n==null||(xr||(xr=document.createElementNS("http://www.w3.org/2000/svg","g")),xr.setAttribute("transform",n),!(n=xr.transform.baseVal.consolidate()))?Ra:(n=n.matrix,hu(n.a,n.b,n.c,n.d,n.e,n.f))}function du(n,t,e,i){function r(c){return c.length?c.pop()+" ":""}function s(c,f,u,h,p,_){if(c!==u||f!==h){var v=p.push("translate(",null,t,null,e);_.push({i:v-4,x:We(c,u)},{i:v-2,x:We(f,h)})}else(u||h)&&p.push("translate("+u+t+h+e)}function a(c,f,u,h){c!==f?(c-f>180?f+=360:f-c>180&&(c+=360),h.push({i:u.push(r(u)+"rotate(",null,i)-2,x:We(c,f)})):f&&u.push(r(u)+"rotate("+f+i)}function o(c,f,u,h){c!==f?h.push({i:u.push(r(u)+"skewX(",null,i)-2,x:We(c,f)}):f&&u.push(r(u)+"skewX("+f+i)}function l(c,f,u,h,p,_){if(c!==u||f!==h){var v=p.push(r(p)+"scale(",null,",",null,")");_.push({i:v-4,x:We(c,u)},{i:v-2,x:We(f,h)})}else(u!==1||h!==1)&&p.push(r(p)+"scale("+u+","+h+")")}return function(c,f){var u=[],h=[];return c=n(c),f=n(f),s(c.translateX,c.translateY,f.translateX,f.translateY,u,h),a(c.rotate,f.rotate,u,h),o(c.skewX,f.skewX,u,h),l(c.scaleX,c.scaleY,f.scaleX,f.scaleY,u,h),c=f=null,function(p){for(var _=-1,v=h.length,m;++_<v;)u[(m=h[_]).i]=m.x(p);return u.join("")}}}var Vd=du(kd,"px, ","px)","deg)"),Gd=du(Hd,", ",")",")"),Wd=1e-12;function bl(n){return((n=Math.exp(n))+1/n)/2}function Xd(n){return((n=Math.exp(n))-1/n)/2}function $d(n){return((n=Math.exp(2*n))-1)/(n+1)}const qd=function n(t,e,i){function r(s,a){var o=s[0],l=s[1],c=s[2],f=a[0],u=a[1],h=a[2],p=f-o,_=u-l,v=p*p+_*_,m,d;if(v<Wd)d=Math.log(h/c)/t,m=function(A){return[o+A*p,l+A*_,c*Math.exp(t*A*d)]};else{var E=Math.sqrt(v),b=(h*h-c*c+i*v)/(2*c*e*E),S=(h*h-c*c-i*v)/(2*h*e*E),U=Math.log(Math.sqrt(b*b+1)-b),C=Math.log(Math.sqrt(S*S+1)-S);d=(C-U)/t,m=function(A){var O=A*d,y=bl(U),M=c/(e*E)*(y*$d(t*O+U)-Xd(U));return[o+M*p,l+M*_,c*y/bl(t*O+U)]}}return m.duration=d*1e3*t/Math.SQRT2,m}return r.rho=function(s){var a=Math.max(.001,+s),o=a*a,l=o*o;return n(a,o,l)},r}(Math.SQRT2,2,4);var Ci=0,$i=0,zi=0,pu=1e3,ds,qi,ps=0,ti=0,As=0,tr=typeof performance=="object"&&performance.now?performance:Date,mu=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(n){setTimeout(n,17)};function Io(){return ti||(mu(Yd),ti=tr.now()+As)}function Yd(){ti=0}function ms(){this._call=this._time=this._next=null}ms.prototype=_u.prototype={constructor:ms,restart:function(n,t,e){if(typeof n!="function")throw new TypeError("callback is not a function");e=(e==null?Io():+e)+(t==null?0:+t),!this._next&&qi!==this&&(qi?qi._next=this:ds=this,qi=this),this._call=n,this._time=e,Ca()},stop:function(){this._call&&(this._call=null,this._time=1/0,Ca())}};function _u(n,t,e){var i=new ms;return i.restart(n,t,e),i}function Kd(){Io(),++Ci;for(var n=ds,t;n;)(t=ti-n._time)>=0&&n._call.call(void 0,t),n=n._next;--Ci}function wl(){ti=(ps=tr.now())+As,Ci=$i=0;try{Kd()}finally{Ci=0,Jd(),ti=0}}function Zd(){var n=tr.now(),t=n-ps;t>pu&&(As-=t,ps=n)}function Jd(){for(var n,t=ds,e,i=1/0;t;)t._call?(i>t._time&&(i=t._time),n=t,t=t._next):(e=t._next,t._next=null,t=n?n._next=e:ds=e);qi=n,Ca(i)}function Ca(n){if(!Ci){$i&&($i=clearTimeout($i));var t=n-ti;t>24?(n<1/0&&($i=setTimeout(wl,n-tr.now()-As)),zi&&(zi=clearInterval(zi))):(zi||(ps=tr.now(),zi=setInterval(Zd,pu)),Ci=1,mu(wl))}}function Al(n,t,e){var i=new ms;return t=t==null?0:+t,i.restart(r=>{i.stop(),n(r+t)},t,e),i}var jd=Ro("start","end","cancel","interrupt"),Qd=[],gu=0,Rl=1,Pa=2,Kr=3,Cl=4,Da=5,Zr=6;function Rs(n,t,e,i,r,s){var a=n.__transition;if(!a)n.__transition={};else if(e in a)return;tp(n,e,{name:t,index:i,group:r,on:jd,tween:Qd,time:s.time,delay:s.delay,duration:s.duration,ease:s.ease,timer:null,state:gu})}function No(n,t){var e=Ke(n,t);if(e.state>gu)throw new Error("too late; already scheduled");return e}function nn(n,t){var e=Ke(n,t);if(e.state>Kr)throw new Error("too late; already running");return e}function Ke(n,t){var e=n.__transition;if(!e||!(e=e[t]))throw new Error("transition not found");return e}function tp(n,t,e){var i=n.__transition,r;i[t]=e,e.timer=_u(s,0,e.time);function s(c){e.state=Rl,e.timer.restart(a,e.delay,e.time),e.delay<=c&&a(c-e.delay)}function a(c){var f,u,h,p;if(e.state!==Rl)return l();for(f in i)if(p=i[f],p.name===e.name){if(p.state===Kr)return Al(a);p.state===Cl?(p.state=Zr,p.timer.stop(),p.on.call("interrupt",n,n.__data__,p.index,p.group),delete i[f]):+f<t&&(p.state=Zr,p.timer.stop(),p.on.call("cancel",n,n.__data__,p.index,p.group),delete i[f])}if(Al(function(){e.state===Kr&&(e.state=Cl,e.timer.restart(o,e.delay,e.time),o(c))}),e.state=Pa,e.on.call("start",n,n.__data__,e.index,e.group),e.state===Pa){for(e.state=Kr,r=new Array(h=e.tween.length),f=0,u=-1;f<h;++f)(p=e.tween[f].value.call(n,n.__data__,e.index,e.group))&&(r[++u]=p);r.length=u+1}}function o(c){for(var f=c<e.duration?e.ease.call(null,c/e.duration):(e.timer.restart(l),e.state=Da,1),u=-1,h=r.length;++u<h;)r[u].call(n,f);e.state===Da&&(e.on.call("end",n,n.__data__,e.index,e.group),l())}function l(){e.state=Zr,e.timer.stop(),delete i[t];for(var c in i)return;delete n.__transition}}function Jr(n,t){var e=n.__transition,i,r,s=!0,a;if(e){t=t==null?null:t+"";for(a in e){if((i=e[a]).name!==t){s=!1;continue}r=i.state>Pa&&i.state<Da,i.state=Zr,i.timer.stop(),i.on.call(r?"interrupt":"cancel",n,n.__data__,i.index,i.group),delete e[a]}s&&delete n.__transition}}function ep(n){return this.each(function(){Jr(this,n)})}function np(n,t){var e,i;return function(){var r=nn(this,n),s=r.tween;if(s!==e){i=e=s;for(var a=0,o=i.length;a<o;++a)if(i[a].name===t){i=i.slice(),i.splice(a,1);break}}r.tween=i}}function ip(n,t,e){var i,r;if(typeof e!="function")throw new Error;return function(){var s=nn(this,n),a=s.tween;if(a!==i){r=(i=a).slice();for(var o={name:t,value:e},l=0,c=r.length;l<c;++l)if(r[l].name===t){r[l]=o;break}l===c&&r.push(o)}s.tween=r}}function rp(n,t){var e=this._id;if(n+="",arguments.length<2){for(var i=Ke(this.node(),e).tween,r=0,s=i.length,a;r<s;++r)if((a=i[r]).name===n)return a.value;return null}return this.each((t==null?np:ip)(e,n,t))}function Fo(n,t,e){var i=n._id;return n.each(function(){var r=nn(this,i);(r.value||(r.value={}))[t]=e.apply(this,arguments)}),function(r){return Ke(r,i).value[t]}}function vu(n,t){var e;return(typeof t=="number"?We:t instanceof Qn?hs:(e=Qn(t))?(t=e,hs):fu)(n,t)}function sp(n){return function(){this.removeAttribute(n)}}function ap(n){return function(){this.removeAttributeNS(n.space,n.local)}}function op(n,t,e){var i,r=e+"",s;return function(){var a=this.getAttribute(n);return a===r?null:a===i?s:s=t(i=a,e)}}function lp(n,t,e){var i,r=e+"",s;return function(){var a=this.getAttributeNS(n.space,n.local);return a===r?null:a===i?s:s=t(i=a,e)}}function cp(n,t,e){var i,r,s;return function(){var a,o=e(this),l;return o==null?void this.removeAttribute(n):(a=this.getAttribute(n),l=o+"",a===l?null:a===i&&l===r?s:(r=l,s=t(i=a,o)))}}function up(n,t,e){var i,r,s;return function(){var a,o=e(this),l;return o==null?void this.removeAttributeNS(n.space,n.local):(a=this.getAttributeNS(n.space,n.local),l=o+"",a===l?null:a===i&&l===r?s:(r=l,s=t(i=a,o)))}}function fp(n,t){var e=ws(n),i=e==="transform"?Gd:vu;return this.attrTween(n,typeof t=="function"?(e.local?up:cp)(e,i,Fo(this,"attr."+n,t)):t==null?(e.local?ap:sp)(e):(e.local?lp:op)(e,i,t))}function hp(n,t){return function(e){this.setAttribute(n,t.call(this,e))}}function dp(n,t){return function(e){this.setAttributeNS(n.space,n.local,t.call(this,e))}}function pp(n,t){var e,i;function r(){var s=t.apply(this,arguments);return s!==i&&(e=(i=s)&&dp(n,s)),e}return r._value=t,r}function mp(n,t){var e,i;function r(){var s=t.apply(this,arguments);return s!==i&&(e=(i=s)&&hp(n,s)),e}return r._value=t,r}function _p(n,t){var e="attr."+n;if(arguments.length<2)return(e=this.tween(e))&&e._value;if(t==null)return this.tween(e,null);if(typeof t!="function")throw new Error;var i=ws(n);return this.tween(e,(i.local?pp:mp)(i,t))}function gp(n,t){return function(){No(this,n).delay=+t.apply(this,arguments)}}function vp(n,t){return t=+t,function(){No(this,n).delay=t}}function xp(n){var t=this._id;return arguments.length?this.each((typeof n=="function"?gp:vp)(t,n)):Ke(this.node(),t).delay}function Mp(n,t){return function(){nn(this,n).duration=+t.apply(this,arguments)}}function Sp(n,t){return t=+t,function(){nn(this,n).duration=t}}function yp(n){var t=this._id;return arguments.length?this.each((typeof n=="function"?Mp:Sp)(t,n)):Ke(this.node(),t).duration}function Ep(n,t){if(typeof t!="function")throw new Error;return function(){nn(this,n).ease=t}}function Tp(n){var t=this._id;return arguments.length?this.each(Ep(t,n)):Ke(this.node(),t).ease}function bp(n,t){return function(){var e=t.apply(this,arguments);if(typeof e!="function")throw new Error;nn(this,n).ease=e}}function wp(n){if(typeof n!="function")throw new Error;return this.each(bp(this._id,n))}function Ap(n){typeof n!="function"&&(n=jc(n));for(var t=this._groups,e=t.length,i=new Array(e),r=0;r<e;++r)for(var s=t[r],a=s.length,o=i[r]=[],l,c=0;c<a;++c)(l=s[c])&&n.call(l,l.__data__,c,s)&&o.push(l);return new xn(i,this._parents,this._name,this._id)}function Rp(n){if(n._id!==this._id)throw new Error;for(var t=this._groups,e=n._groups,i=t.length,r=e.length,s=Math.min(i,r),a=new Array(i),o=0;o<s;++o)for(var l=t[o],c=e[o],f=l.length,u=a[o]=new Array(f),h,p=0;p<f;++p)(h=l[p]||c[p])&&(u[p]=h);for(;o<i;++o)a[o]=t[o];return new xn(a,this._parents,this._name,this._id)}function Cp(n){return(n+"").trim().split(/^|\s+/).every(function(t){var e=t.indexOf(".");return e>=0&&(t=t.slice(0,e)),!t||t==="start"})}function Pp(n,t,e){var i,r,s=Cp(t)?No:nn;return function(){var a=s(this,n),o=a.on;o!==i&&(r=(i=o).copy()).on(t,e),a.on=r}}function Dp(n,t){var e=this._id;return arguments.length<2?Ke(this.node(),e).on.on(n):this.each(Pp(e,n,t))}function Lp(n){return function(){var t=this.parentNode;for(var e in this.__transition)if(+e!==n)return;t&&t.removeChild(this)}}function Up(){return this.on("end.remove",Lp(this._id))}function Ip(n){var t=this._name,e=this._id;typeof n!="function"&&(n=Co(n));for(var i=this._groups,r=i.length,s=new Array(r),a=0;a<r;++a)for(var o=i[a],l=o.length,c=s[a]=new Array(l),f,u,h=0;h<l;++h)(f=o[h])&&(u=n.call(f,f.__data__,h,o))&&("__data__"in f&&(u.__data__=f.__data__),c[h]=u,Rs(c[h],t,e,h,c,Ke(f,e)));return new xn(s,this._parents,t,e)}function Np(n){var t=this._name,e=this._id;typeof n!="function"&&(n=Jc(n));for(var i=this._groups,r=i.length,s=[],a=[],o=0;o<r;++o)for(var l=i[o],c=l.length,f,u=0;u<c;++u)if(f=l[u]){for(var h=n.call(f,f.__data__,u,l),p,_=Ke(f,e),v=0,m=h.length;v<m;++v)(p=h[v])&&Rs(p,t,e,v,h,_);s.push(h),a.push(f)}return new xn(s,a,t,e)}var Fp=sr.prototype.constructor;function Op(){return new Fp(this._groups,this._parents)}function Bp(n,t){var e,i,r;return function(){var s=Ri(this,n),a=(this.style.removeProperty(n),Ri(this,n));return s===a?null:s===e&&a===i?r:r=t(e=s,i=a)}}function xu(n){return function(){this.style.removeProperty(n)}}function zp(n,t,e){var i,r=e+"",s;return function(){var a=Ri(this,n);return a===r?null:a===i?s:s=t(i=a,e)}}function kp(n,t,e){var i,r,s;return function(){var a=Ri(this,n),o=e(this),l=o+"";return o==null&&(l=o=(this.style.removeProperty(n),Ri(this,n))),a===l?null:a===i&&l===r?s:(r=l,s=t(i=a,o))}}function Hp(n,t){var e,i,r,s="style."+t,a="end."+s,o;return function(){var l=nn(this,n),c=l.on,f=l.value[s]==null?o||(o=xu(t)):void 0;(c!==e||r!==f)&&(i=(e=c).copy()).on(a,r=f),l.on=i}}function Vp(n,t,e){var i=(n+="")=="transform"?Vd:vu;return t==null?this.styleTween(n,Bp(n,i)).on("end.style."+n,xu(n)):typeof t=="function"?this.styleTween(n,kp(n,i,Fo(this,"style."+n,t))).each(Hp(this._id,n)):this.styleTween(n,zp(n,i,t),e).on("end.style."+n,null)}function Gp(n,t,e){return function(i){this.style.setProperty(n,t.call(this,i),e)}}function Wp(n,t,e){var i,r;function s(){var a=t.apply(this,arguments);return a!==r&&(i=(r=a)&&Gp(n,a,e)),i}return s._value=t,s}function Xp(n,t,e){var i="style."+(n+="");if(arguments.length<2)return(i=this.tween(i))&&i._value;if(t==null)return this.tween(i,null);if(typeof t!="function")throw new Error;return this.tween(i,Wp(n,t,e??""))}function $p(n){return function(){this.textContent=n}}function qp(n){return function(){var t=n(this);this.textContent=t??""}}function Yp(n){return this.tween("text",typeof n=="function"?qp(Fo(this,"text",n)):$p(n==null?"":n+""))}function Kp(n){return function(t){this.textContent=n.call(this,t)}}function Zp(n){var t,e;function i(){var r=n.apply(this,arguments);return r!==e&&(t=(e=r)&&Kp(r)),t}return i._value=n,i}function Jp(n){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(n==null)return this.tween(t,null);if(typeof n!="function")throw new Error;return this.tween(t,Zp(n))}function jp(){for(var n=this._name,t=this._id,e=Mu(),i=this._groups,r=i.length,s=0;s<r;++s)for(var a=i[s],o=a.length,l,c=0;c<o;++c)if(l=a[c]){var f=Ke(l,t);Rs(l,n,e,c,a,{time:f.time+f.delay+f.duration,delay:0,duration:f.duration,ease:f.ease})}return new xn(i,this._parents,n,e)}function Qp(){var n,t,e=this,i=e._id,r=e.size();return new Promise(function(s,a){var o={value:a},l={value:function(){--r===0&&s()}};e.each(function(){var c=nn(this,i),f=c.on;f!==n&&(t=(n=f).copy(),t._.cancel.push(o),t._.interrupt.push(o),t._.end.push(l)),c.on=t}),r===0&&s()})}var tm=0;function xn(n,t,e,i){this._groups=n,this._parents=t,this._name=e,this._id=i}function Mu(){return++tm}var sn=sr.prototype;xn.prototype={constructor:xn,select:Ip,selectAll:Np,selectChild:sn.selectChild,selectChildren:sn.selectChildren,filter:Ap,merge:Rp,selection:Op,transition:jp,call:sn.call,nodes:sn.nodes,node:sn.node,size:sn.size,empty:sn.empty,each:sn.each,on:Dp,attr:fp,attrTween:_p,style:Vp,styleTween:Xp,text:Yp,textTween:Jp,remove:Up,tween:rp,delay:xp,duration:yp,ease:Tp,easeVarying:wp,end:Qp,[Symbol.iterator]:sn[Symbol.iterator]};function em(n){return((n*=2)<=1?n*n*n:(n-=2)*n*n+2)/2}var nm={time:null,delay:0,duration:250,ease:em};function im(n,t){for(var e;!(e=n.__transition)||!(e=e[t]);)if(!(n=n.parentNode))throw new Error(`transition ${t} not found`);return e}function rm(n){var t,e;n instanceof xn?(t=n._id,n=n._name):(t=Mu(),(e=nm).time=Io(),n=n==null?null:n+"");for(var i=this._groups,r=i.length,s=0;s<r;++s)for(var a=i[s],o=a.length,l,c=0;c<o;++c)(l=a[c])&&Rs(l,n,t,c,a,e||im(l,t));return new xn(i,this._parents,n,t)}sr.prototype.interrupt=ep;sr.prototype.transition=rm;const La=Math.PI,Ua=2*La,Gn=1e-6,sm=Ua-Gn;function Su(n){this._+=n[0];for(let t=1,e=n.length;t<e;++t)this._+=arguments[t]+n[t]}function am(n){let t=Math.floor(n);if(!(t>=0))throw new Error(`invalid digits: ${n}`);if(t>15)return Su;const e=10**t;return function(i){this._+=i[0];for(let r=1,s=i.length;r<s;++r)this._+=Math.round(arguments[r]*e)/e+i[r]}}class om{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=t==null?Su:am(t)}moveTo(t,e){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,e){this._append`L${this._x1=+t},${this._y1=+e}`}quadraticCurveTo(t,e,i,r){this._append`Q${+t},${+e},${this._x1=+i},${this._y1=+r}`}bezierCurveTo(t,e,i,r,s,a){this._append`C${+t},${+e},${+i},${+r},${this._x1=+s},${this._y1=+a}`}arcTo(t,e,i,r,s){if(t=+t,e=+e,i=+i,r=+r,s=+s,s<0)throw new Error(`negative radius: ${s}`);let a=this._x1,o=this._y1,l=i-t,c=r-e,f=a-t,u=o-e,h=f*f+u*u;if(this._x1===null)this._append`M${this._x1=t},${this._y1=e}`;else if(h>Gn)if(!(Math.abs(u*l-c*f)>Gn)||!s)this._append`L${this._x1=t},${this._y1=e}`;else{let p=i-a,_=r-o,v=l*l+c*c,m=p*p+_*_,d=Math.sqrt(v),E=Math.sqrt(h),b=s*Math.tan((La-Math.acos((v+h-m)/(2*d*E)))/2),S=b/E,U=b/d;Math.abs(S-1)>Gn&&this._append`L${t+S*f},${e+S*u}`,this._append`A${s},${s},0,0,${+(u*p>f*_)},${this._x1=t+U*l},${this._y1=e+U*c}`}}arc(t,e,i,r,s,a){if(t=+t,e=+e,i=+i,a=!!a,i<0)throw new Error(`negative radius: ${i}`);let o=i*Math.cos(r),l=i*Math.sin(r),c=t+o,f=e+l,u=1^a,h=a?r-s:s-r;this._x1===null?this._append`M${c},${f}`:(Math.abs(this._x1-c)>Gn||Math.abs(this._y1-f)>Gn)&&this._append`L${c},${f}`,i&&(h<0&&(h=h%Ua+Ua),h>sm?this._append`A${i},${i},0,1,${u},${t-o},${e-l}A${i},${i},0,1,${u},${this._x1=c},${this._y1=f}`:h>Gn&&this._append`A${i},${i},0,${+(h>=La)},${u},${this._x1=t+i*Math.cos(s)},${this._y1=e+i*Math.sin(s)}`)}rect(t,e,i,r){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${i=+i}v${+r}h${-i}Z`}toString(){return this._}}function lm(n){return Math.abs(n=Math.round(n))>=1e21?n.toLocaleString("en").replace(/,/g,""):n.toString(10)}function _s(n,t){if(!isFinite(n)||n===0)return null;var e=(n=t?n.toExponential(t-1):n.toExponential()).indexOf("e"),i=n.slice(0,e);return[i.length>1?i[0]+i.slice(2):i,+n.slice(e+1)]}function Pi(n){return n=_s(Math.abs(n)),n?n[1]:NaN}function cm(n,t){return function(e,i){for(var r=e.length,s=[],a=0,o=n[0],l=0;r>0&&o>0&&(l+o+1>i&&(o=Math.max(1,i-l)),s.push(e.substring(r-=o,r+o)),!((l+=o+1)>i));)o=n[a=(a+1)%n.length];return s.reverse().join(t)}}function um(n){return function(t){return t.replace(/[0-9]/g,function(e){return n[+e]})}}var fm=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function gs(n){if(!(t=fm.exec(n)))throw new Error("invalid format: "+n);var t;return new Oo({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}gs.prototype=Oo.prototype;function Oo(n){this.fill=n.fill===void 0?" ":n.fill+"",this.align=n.align===void 0?">":n.align+"",this.sign=n.sign===void 0?"-":n.sign+"",this.symbol=n.symbol===void 0?"":n.symbol+"",this.zero=!!n.zero,this.width=n.width===void 0?void 0:+n.width,this.comma=!!n.comma,this.precision=n.precision===void 0?void 0:+n.precision,this.trim=!!n.trim,this.type=n.type===void 0?"":n.type+""}Oo.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function hm(n){t:for(var t=n.length,e=1,i=-1,r;e<t;++e)switch(n[e]){case".":i=r=e;break;case"0":i===0&&(i=e),r=e;break;default:if(!+n[e])break t;i>0&&(i=0);break}return i>0?n.slice(0,i)+n.slice(r+1):n}var vs;function dm(n,t){var e=_s(n,t);if(!e)return vs=void 0,n.toPrecision(t);var i=e[0],r=e[1],s=r-(vs=Math.max(-8,Math.min(8,Math.floor(r/3)))*3)+1,a=i.length;return s===a?i:s>a?i+new Array(s-a+1).join("0"):s>0?i.slice(0,s)+"."+i.slice(s):"0."+new Array(1-s).join("0")+_s(n,Math.max(0,t+s-1))[0]}function Pl(n,t){var e=_s(n,t);if(!e)return n+"";var i=e[0],r=e[1];return r<0?"0."+new Array(-r).join("0")+i:i.length>r+1?i.slice(0,r+1)+"."+i.slice(r+1):i+new Array(r-i.length+2).join("0")}const Dl={"%":(n,t)=>(n*100).toFixed(t),b:n=>Math.round(n).toString(2),c:n=>n+"",d:lm,e:(n,t)=>n.toExponential(t),f:(n,t)=>n.toFixed(t),g:(n,t)=>n.toPrecision(t),o:n=>Math.round(n).toString(8),p:(n,t)=>Pl(n*100,t),r:Pl,s:dm,X:n=>Math.round(n).toString(16).toUpperCase(),x:n=>Math.round(n).toString(16)};function Ll(n){return n}var Ul=Array.prototype.map,Il=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function pm(n){var t=n.grouping===void 0||n.thousands===void 0?Ll:cm(Ul.call(n.grouping,Number),n.thousands+""),e=n.currency===void 0?"":n.currency[0]+"",i=n.currency===void 0?"":n.currency[1]+"",r=n.decimal===void 0?".":n.decimal+"",s=n.numerals===void 0?Ll:um(Ul.call(n.numerals,String)),a=n.percent===void 0?"%":n.percent+"",o=n.minus===void 0?"−":n.minus+"",l=n.nan===void 0?"NaN":n.nan+"";function c(u,h){u=gs(u);var p=u.fill,_=u.align,v=u.sign,m=u.symbol,d=u.zero,E=u.width,b=u.comma,S=u.precision,U=u.trim,C=u.type;C==="n"?(b=!0,C="g"):Dl[C]||(S===void 0&&(S=12),U=!0,C="g"),(d||p==="0"&&_==="=")&&(d=!0,p="0",_="=");var A=(h&&h.prefix!==void 0?h.prefix:"")+(m==="$"?e:m==="#"&&/[boxX]/.test(C)?"0"+C.toLowerCase():""),O=(m==="$"?i:/[%p]/.test(C)?a:"")+(h&&h.suffix!==void 0?h.suffix:""),y=Dl[C],M=/[defgprs%]/.test(C);S=S===void 0?6:/[gprs]/.test(C)?Math.max(1,Math.min(21,S)):Math.max(0,Math.min(20,S));function L(H){var X=A,w=O,B,P,z;if(C==="c")w=y(H)+w,H="";else{H=+H;var F=H<0||1/H<0;if(H=isNaN(H)?l:y(Math.abs(H),S),U&&(H=hm(H)),F&&+H==0&&v!=="+"&&(F=!1),X=(F?v==="("?v:o:v==="-"||v==="("?"":v)+X,w=(C==="s"&&!isNaN(H)&&vs!==void 0?Il[8+vs/3]:"")+w+(F&&v==="("?")":""),M){for(B=-1,P=H.length;++B<P;)if(z=H.charCodeAt(B),48>z||z>57){w=(z===46?r+H.slice(B+1):H.slice(B))+w,H=H.slice(0,B);break}}}b&&!d&&(H=t(H,1/0));var Y=X.length+H.length+w.length,Z=Y<E?new Array(E-Y+1).join(p):"";switch(b&&d&&(H=t(Z+H,Z.length?E-w.length:1/0),Z=""),_){case"<":H=X+H+w+Z;break;case"=":H=X+Z+H+w;break;case"^":H=Z.slice(0,Y=Z.length>>1)+X+H+w+Z.slice(Y);break;default:H=Z+X+H+w;break}return s(H)}return L.toString=function(){return u+""},L}function f(u,h){var p=Math.max(-8,Math.min(8,Math.floor(Pi(h)/3)))*3,_=Math.pow(10,-p),v=c((u=gs(u),u.type="f",u),{suffix:Il[8+p/3]});return function(m){return v(_*m)}}return{format:c,formatPrefix:f}}var Mr,yu,Eu;mm({thousands:",",grouping:[3],currency:["$",""]});function mm(n){return Mr=pm(n),yu=Mr.format,Eu=Mr.formatPrefix,Mr}function _m(n){return Math.max(0,-Pi(Math.abs(n)))}function gm(n,t){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(Pi(t)/3)))*3-Pi(Math.abs(n)))}function vm(n,t){return n=Math.abs(n),t=Math.abs(t)-n,Math.max(0,Pi(t)-Pi(n))+1}function xm(n,t){switch(arguments.length){case 0:break;case 1:this.range(n);break;default:this.range(t).domain(n);break}return this}function Mm(n){return function(){return n}}function Sm(n){return+n}var Nl=[0,1];function Mi(n){return n}function Ia(n,t){return(t-=n=+n)?function(e){return(e-n)/t}:Mm(isNaN(t)?NaN:.5)}function ym(n,t){var e;return n>t&&(e=n,n=t,t=e),function(i){return Math.max(n,Math.min(t,i))}}function Em(n,t,e){var i=n[0],r=n[1],s=t[0],a=t[1];return r<i?(i=Ia(r,i),s=e(a,s)):(i=Ia(i,r),s=e(s,a)),function(o){return s(i(o))}}function Tm(n,t,e){var i=Math.min(n.length,t.length)-1,r=new Array(i),s=new Array(i),a=-1;for(n[i]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++a<i;)r[a]=Ia(n[a],n[a+1]),s[a]=e(t[a],t[a+1]);return function(o){var l=Af(n,o,1,i)-1;return s[l](r[l](o))}}function bm(n,t){return t.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function wm(){var n=Nl,t=Nl,e=Uo,i,r,s,a=Mi,o,l,c;function f(){var h=Math.min(n.length,t.length);return a!==Mi&&(a=ym(n[0],n[h-1])),o=h>2?Tm:Em,l=c=null,u}function u(h){return h==null||isNaN(h=+h)?s:(l||(l=o(n.map(i),t,e)))(i(a(h)))}return u.invert=function(h){return a(r((c||(c=o(t,n.map(i),We)))(h)))},u.domain=function(h){return arguments.length?(n=Array.from(h,Sm),f()):n.slice()},u.range=function(h){return arguments.length?(t=Array.from(h),f()):t.slice()},u.rangeRound=function(h){return t=Array.from(h),e=zd,f()},u.clamp=function(h){return arguments.length?(a=h?!0:Mi,f()):a!==Mi},u.interpolate=function(h){return arguments.length?(e=h,f()):e},u.unknown=function(h){return arguments.length?(s=h,u):s},function(h,p){return i=h,r=p,f()}}function Am(){return wm()(Mi,Mi)}function Rm(n,t,e,i){var r=Lf(n,t,e),s;switch(i=gs(i??",f"),i.type){case"s":{var a=Math.max(Math.abs(n),Math.abs(t));return i.precision==null&&!isNaN(s=gm(r,a))&&(i.precision=s),Eu(i,a)}case"":case"e":case"g":case"p":case"r":{i.precision==null&&!isNaN(s=vm(r,Math.max(Math.abs(n),Math.abs(t))))&&(i.precision=s-(i.type==="e"));break}case"f":case"%":{i.precision==null&&!isNaN(s=_m(r))&&(i.precision=s-(i.type==="%")*2);break}}return yu(i)}function Cm(n){var t=n.domain;return n.ticks=function(e){var i=t();return Df(i[0],i[i.length-1],e??10)},n.tickFormat=function(e,i){var r=t();return Rm(r[0],r[r.length-1],e??10,i)},n.nice=function(e){e==null&&(e=10);var i=t(),r=0,s=i.length-1,a=i[r],o=i[s],l,c,f=10;for(o<a&&(c=a,a=o,o=c,c=r,r=s,s=c);f-- >0;){if(c=ya(a,o,e),c===l)return i[r]=a,i[s]=o,t(i);if(c>0)a=Math.floor(a/c)*c,o=Math.ceil(o/c)*c;else if(c<0)a=Math.ceil(a*c)/c,o=Math.floor(o*c)/c;else break;l=c}return n},n}function Na(){var n=Am();return n.copy=function(){return bm(n,Na())},xm.apply(n,arguments),Cm(n)}function si(n){return function(){return n}}function Pm(n){let t=3;return n.digits=function(e){if(!arguments.length)return t;if(e==null)t=null;else{const i=Math.floor(e);if(!(i>=0))throw new RangeError(`invalid digits: ${e}`);t=i}return n},()=>new om(t)}function Dm(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function Tu(n){this._context=n}Tu.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(n,t){switch(n=+n,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(n,t):this._context.moveTo(n,t);break;case 1:this._point=2;default:this._context.lineTo(n,t);break}}};function Lm(n){return new Tu(n)}function Um(n){return n[0]}function Im(n){return n[1]}function Nm(n,t){var e=si(!0),i=null,r=Lm,s=null,a=Pm(o);n=typeof n=="function"?n:n===void 0?Um:si(n),t=typeof t=="function"?t:t===void 0?Im:si(t);function o(l){var c,f=(l=Dm(l)).length,u,h=!1,p;for(i==null&&(s=r(p=a())),c=0;c<=f;++c)!(c<f&&e(u=l[c],c,l))===h&&((h=!h)?s.lineStart():s.lineEnd()),h&&s.point(+n(u,c,l),+t(u,c,l));if(p)return s=null,p+""||null}return o.x=function(l){return arguments.length?(n=typeof l=="function"?l:si(+l),o):n},o.y=function(l){return arguments.length?(t=typeof l=="function"?l:si(+l),o):t},o.defined=function(l){return arguments.length?(e=typeof l=="function"?l:si(!!l),o):e},o.curve=function(l){return arguments.length?(r=l,i!=null&&(s=r(i)),o):r},o.context=function(l){return arguments.length?(l==null?i=s=null:s=r(i=l),o):i},o}const Sr=n=>()=>n;function Fm(n,{sourceEvent:t,target:e,transform:i,dispatch:r}){Object.defineProperties(this,{type:{value:n,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},target:{value:e,enumerable:!0,configurable:!0},transform:{value:i,enumerable:!0,configurable:!0},_:{value:r}})}function pn(n,t,e){this.k=n,this.x=t,this.y=e}pn.prototype={constructor:pn,scale:function(n){return n===1?this:new pn(this.k*n,this.x,this.y)},translate:function(n,t){return n===0&t===0?this:new pn(this.k,this.x+this.k*n,this.y+this.k*t)},apply:function(n){return[n[0]*this.k+this.x,n[1]*this.k+this.y]},applyX:function(n){return n*this.k+this.x},applyY:function(n){return n*this.k+this.y},invert:function(n){return[(n[0]-this.x)/this.k,(n[1]-this.y)/this.k]},invertX:function(n){return(n-this.x)/this.k},invertY:function(n){return(n-this.y)/this.k},rescaleX:function(n){return n.copy().domain(n.range().map(this.invertX,this).map(n.invert,n))},rescaleY:function(n){return n.copy().domain(n.range().map(this.invertY,this).map(n.invert,n))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var Bo=new pn(1,0,0);pn.prototype;function Os(n){n.stopImmediatePropagation()}function ki(n){n.preventDefault(),n.stopImmediatePropagation()}function Om(n){return(!n.ctrlKey||n.type==="wheel")&&!n.button}function Bm(){var n=this;return n instanceof SVGElement?(n=n.ownerSVGElement||n,n.hasAttribute("viewBox")?(n=n.viewBox.baseVal,[[n.x,n.y],[n.x+n.width,n.y+n.height]]):[[0,0],[n.width.baseVal.value,n.height.baseVal.value]]):[[0,0],[n.clientWidth,n.clientHeight]]}function Fl(){return this.__zoom||Bo}function zm(n){return-n.deltaY*(n.deltaMode===1?.05:n.deltaMode?1:.002)*(n.ctrlKey?10:1)}function km(){return navigator.maxTouchPoints||"ontouchstart"in this}function Hm(n,t,e){var i=n.invertX(t[0][0])-e[0][0],r=n.invertX(t[1][0])-e[1][0],s=n.invertY(t[0][1])-e[0][1],a=n.invertY(t[1][1])-e[1][1];return n.translate(r>i?(i+r)/2:Math.min(0,i)||Math.max(0,r),a>s?(s+a)/2:Math.min(0,s)||Math.max(0,a))}function Vm(){var n=Om,t=Bm,e=Hm,i=zm,r=km,s=[0,1/0],a=[[-1/0,-1/0],[1/0,1/0]],o=250,l=qd,c=Ro("start","zoom","end"),f,u,h,p=500,_=150,v=0,m=10;function d(w){w.property("__zoom",Fl).on("wheel.zoom",O,{passive:!1}).on("mousedown.zoom",y).on("dblclick.zoom",M).filter(r).on("touchstart.zoom",L).on("touchmove.zoom",H).on("touchend.zoom touchcancel.zoom",X).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}d.transform=function(w,B,P,z){var F=w.selection?w.selection():w;F.property("__zoom",Fl),w!==F?U(w,B,P,z):F.interrupt().each(function(){C(this,arguments).event(z).start().zoom(null,typeof B=="function"?B.apply(this,arguments):B).end()})},d.scaleBy=function(w,B,P,z){d.scaleTo(w,function(){var F=this.__zoom.k,Y=typeof B=="function"?B.apply(this,arguments):B;return F*Y},P,z)},d.scaleTo=function(w,B,P,z){d.transform(w,function(){var F=t.apply(this,arguments),Y=this.__zoom,Z=P==null?S(F):typeof P=="function"?P.apply(this,arguments):P,at=Y.invert(Z),xt=typeof B=="function"?B.apply(this,arguments):B;return e(b(E(Y,xt),Z,at),F,a)},P,z)},d.translateBy=function(w,B,P,z){d.transform(w,function(){return e(this.__zoom.translate(typeof B=="function"?B.apply(this,arguments):B,typeof P=="function"?P.apply(this,arguments):P),t.apply(this,arguments),a)},null,z)},d.translateTo=function(w,B,P,z,F){d.transform(w,function(){var Y=t.apply(this,arguments),Z=this.__zoom,at=z==null?S(Y):typeof z=="function"?z.apply(this,arguments):z;return e(Bo.translate(at[0],at[1]).scale(Z.k).translate(typeof B=="function"?-B.apply(this,arguments):-B,typeof P=="function"?-P.apply(this,arguments):-P),Y,a)},z,F)};function E(w,B){return B=Math.max(s[0],Math.min(s[1],B)),B===w.k?w:new pn(B,w.x,w.y)}function b(w,B,P){var z=B[0]-P[0]*w.k,F=B[1]-P[1]*w.k;return z===w.x&&F===w.y?w:new pn(w.k,z,F)}function S(w){return[(+w[0][0]+ +w[1][0])/2,(+w[0][1]+ +w[1][1])/2]}function U(w,B,P,z){w.on("start.zoom",function(){C(this,arguments).event(z).start()}).on("interrupt.zoom end.zoom",function(){C(this,arguments).event(z).end()}).tween("zoom",function(){var F=this,Y=arguments,Z=C(F,Y).event(z),at=t.apply(F,Y),xt=P==null?S(at):typeof P=="function"?P.apply(F,Y):P,Ot=Math.max(at[1][0]-at[0][0],at[1][1]-at[0][1]),$=F.__zoom,nt=typeof B=="function"?B.apply(F,Y):B,ht=l($.invert(xt).concat(Ot/$.k),nt.invert(xt).concat(Ot/nt.k));return function(st){if(st===1)st=nt;else{var mt=ht(st),zt=Ot/mt[2];st=new pn(zt,xt[0]-mt[0]*zt,xt[1]-mt[1]*zt)}Z.zoom(null,st)}})}function C(w,B,P){return!P&&w.__zooming||new A(w,B)}function A(w,B){this.that=w,this.args=B,this.active=0,this.sourceEvent=null,this.extent=t.apply(w,B),this.taps=0}A.prototype={event:function(w){return w&&(this.sourceEvent=w),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(w,B){return this.mouse&&w!=="mouse"&&(this.mouse[1]=B.invert(this.mouse[0])),this.touch0&&w!=="touch"&&(this.touch0[1]=B.invert(this.touch0[0])),this.touch1&&w!=="touch"&&(this.touch1[1]=B.invert(this.touch1[0])),this.that.__zoom=B,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(w){var B=Rn(this.that).datum();c.call(w,this.that,new Fm(w,{sourceEvent:this.sourceEvent,target:d,transform:this.that.__zoom,dispatch:c}),B)}};function O(w,...B){if(!n.apply(this,arguments))return;var P=C(this,B).event(w),z=this.__zoom,F=Math.max(s[0],Math.min(s[1],z.k*Math.pow(2,i.apply(this,arguments)))),Y=Fn(w);if(P.wheel)(P.mouse[0][0]!==Y[0]||P.mouse[0][1]!==Y[1])&&(P.mouse[1]=z.invert(P.mouse[0]=Y)),clearTimeout(P.wheel);else{if(z.k===F)return;P.mouse=[Y,z.invert(Y)],Jr(this),P.start()}ki(w),P.wheel=setTimeout(Z,_),P.zoom("mouse",e(b(E(z,F),P.mouse[0],P.mouse[1]),P.extent,a));function Z(){P.wheel=null,P.end()}}function y(w,...B){if(h||!n.apply(this,arguments))return;var P=w.currentTarget,z=C(this,B,!0).event(w),F=Rn(w.view).on("mousemove.zoom",xt,!0).on("mouseup.zoom",Ot,!0),Y=Fn(w,P),Z=w.clientX,at=w.clientY;md(w.view),Os(w),z.mouse=[Y,this.__zoom.invert(Y)],Jr(this),z.start();function xt($){if(ki($),!z.moved){var nt=$.clientX-Z,ht=$.clientY-at;z.moved=nt*nt+ht*ht>v}z.event($).zoom("mouse",e(b(z.that.__zoom,z.mouse[0]=Fn($,P),z.mouse[1]),z.extent,a))}function Ot($){F.on("mousemove.zoom mouseup.zoom",null),_d($.view,z.moved),ki($),z.event($).end()}}function M(w,...B){if(n.apply(this,arguments)){var P=this.__zoom,z=Fn(w.changedTouches?w.changedTouches[0]:w,this),F=P.invert(z),Y=P.k*(w.shiftKey?.5:2),Z=e(b(E(P,Y),z,F),t.apply(this,B),a);ki(w),o>0?Rn(this).transition().duration(o).call(U,Z,z,w):Rn(this).call(d.transform,Z,z,w)}}function L(w,...B){if(n.apply(this,arguments)){var P=w.touches,z=P.length,F=C(this,B,w.changedTouches.length===z).event(w),Y,Z,at,xt;for(Os(w),Z=0;Z<z;++Z)at=P[Z],xt=Fn(at,this),xt=[xt,this.__zoom.invert(xt),at.identifier],F.touch0?!F.touch1&&F.touch0[2]!==xt[2]&&(F.touch1=xt,F.taps=0):(F.touch0=xt,Y=!0,F.taps=1+!!f);f&&(f=clearTimeout(f)),Y&&(F.taps<2&&(u=xt[0],f=setTimeout(function(){f=null},p)),Jr(this),F.start())}}function H(w,...B){if(this.__zooming){var P=C(this,B).event(w),z=w.changedTouches,F=z.length,Y,Z,at,xt;for(ki(w),Y=0;Y<F;++Y)Z=z[Y],at=Fn(Z,this),P.touch0&&P.touch0[2]===Z.identifier?P.touch0[0]=at:P.touch1&&P.touch1[2]===Z.identifier&&(P.touch1[0]=at);if(Z=P.that.__zoom,P.touch1){var Ot=P.touch0[0],$=P.touch0[1],nt=P.touch1[0],ht=P.touch1[1],st=(st=nt[0]-Ot[0])*st+(st=nt[1]-Ot[1])*st,mt=(mt=ht[0]-$[0])*mt+(mt=ht[1]-$[1])*mt;Z=E(Z,Math.sqrt(st/mt)),at=[(Ot[0]+nt[0])/2,(Ot[1]+nt[1])/2],xt=[($[0]+ht[0])/2,($[1]+ht[1])/2]}else if(P.touch0)at=P.touch0[0],xt=P.touch0[1];else return;P.zoom("touch",e(b(Z,at,xt),P.extent,a))}}function X(w,...B){if(this.__zooming){var P=C(this,B).event(w),z=w.changedTouches,F=z.length,Y,Z;for(Os(w),h&&clearTimeout(h),h=setTimeout(function(){h=null},p),Y=0;Y<F;++Y)Z=z[Y],P.touch0&&P.touch0[2]===Z.identifier?delete P.touch0:P.touch1&&P.touch1[2]===Z.identifier&&delete P.touch1;if(P.touch1&&!P.touch0&&(P.touch0=P.touch1,delete P.touch1),P.touch0)P.touch0[1]=this.__zoom.invert(P.touch0[0]);else if(P.end(),P.taps===2&&(Z=Fn(Z,this),Math.hypot(u[0]-Z[0],u[1]-Z[1])<m)){var at=Rn(this).on("dblclick.zoom");at&&at.apply(this,arguments)}}}return d.wheelDelta=function(w){return arguments.length?(i=typeof w=="function"?w:Sr(+w),d):i},d.filter=function(w){return arguments.length?(n=typeof w=="function"?w:Sr(!!w),d):n},d.touchable=function(w){return arguments.length?(r=typeof w=="function"?w:Sr(!!w),d):r},d.extent=function(w){return arguments.length?(t=typeof w=="function"?w:Sr([[+w[0][0],+w[0][1]],[+w[1][0],+w[1][1]]]),d):t},d.scaleExtent=function(w){return arguments.length?(s[0]=+w[0],s[1]=+w[1],d):[s[0],s[1]]},d.translateExtent=function(w){return arguments.length?(a[0][0]=+w[0][0],a[1][0]=+w[1][0],a[0][1]=+w[0][1],a[1][1]=+w[1][1],d):[[a[0][0],a[0][1]],[a[1][0],a[1][1]]]},d.constrain=function(w){return arguments.length?(e=w,d):e},d.duration=function(w){return arguments.length?(o=+w,d):o},d.interpolate=function(w){return arguments.length?(l=w,d):l},d.on=function(){var w=c.on.apply(c,arguments);return w===c?d:w},d.clickDistance=function(w){return arguments.length?(v=(w=+w)*w,d):Math.sqrt(v)},d.tapDistance=function(w){return arguments.length?(m=+w,d):m},d}function Gm({parent_ref:n}){const{status:t,points:e,set_points:i}=ze(),r=Ji(),s=Ji();return gn(()=>{i(a=>{const o=t.pos.x*t.pos.sr,l=t.pos.y*t.pos.sr,c=t.pos.sr;return[...a,{x:o,y:l,sr:c}]})},[t.pos.x,t.pos.y,t.pos.sr]),gn(()=>{const a=Rn(r.current),o=Na(),l=Na(),c=Nm().x(v=>o(v.x)).y(v=>l(v.y)),f=a.append("g"),u=f.append("path").attr("fill","none").attr("stroke","steelblue").attr("stroke-width",2).attr("d",c(e)),h=Vm().on("zoom",({transform:v})=>{u.attr("stroke-width",2/v.k);const m=n.current.clientWidth/2,d=n.current.clientHeight/2;f.attr("transform",v.translate(m,d))}),p=n.current.clientWidth/2,_=n.current.clientHeight/2;return a.call(h).call(h.transform,Bo.translate(p,_).scale(.05)),s.current=v=>{u.attr("d",c(v))},()=>{r.current.innerHTML=""}},[]),gn(()=>{s.current&&s.current(e)},[e]),j("svg",{width:"100%",height:"100%",display:t.modo==="Odometro"?"block":"none",ref:r})}function Wm(){const{log:n,set_log:t,status:e}=ze();gn(()=>{e.msg.length>0&&t(r=>{let s=[...r];for(const a of e.msg.trim().split(`
`))s.push(a);return s})},[e.msg]);const i=Ji();return j("div",{class:"log",children:[e.modo=="Odometro"?j("div",{class:"trajectory-container",ref:i,children:j(Gm,{parent_ref:i})}):null,j("div",{class:"log-window",children:n.map(r=>j("div",{class:"log-line",dangerouslySetInnerHTML:{__html:r}}))}),j("button",{onClick:()=>t([]),children:" Apagar log "})]})}const ye="";async function Xm(n,t){await fetch(`${ye}/start_acquisition/${n}/${t}`,{method:"POST"})}async function $m(){await fetch(`${ye}/stop_acquisition`,{method:"POST"})}async function Ol(){await fetch(`${ye}/reset_position`,{method:"POST"})}async function qm(){await fetch(`${ye}/start_stream`,{method:"POST"})}async function Ym(){await fetch(`${ye}/stop_stream`,{method:"POST"})}async function Km(n){await fetch(`${ye}/set_modo/${n}`,{method:"POST"})}async function Zm(){await fetch(`${ye}/calibrate_exposure`,{method:"POST"})}async function Bl(n,t){await fetch(`${ye}/calibrate_resolution/${n}/${t}`,{method:"POST"})}async function Jm(n){await fetch(`${ye}/shutdown/${n}`,{method:"POST"})}async function bu(n){await fetch(`${ye}/reboot/${n}`,{method:"POST"})}async function jm(n,t){let e;const i=()=>{e&&e.close(),e=new EventSource(`${ye}/status`),e.onmessage=r=>n(JSON.parse(r.data)),e.onerror=async()=>{n(t),await new Promise(r=>setTimeout(r,3e3)),i()}};i()}async function Qm(){return(await fetch(`${ye}/ensaios`,{method:"GET"})).json()}async function t_(n){await fetch(`${ye}/remove_ensaio/${n}`,{method:"POST"})}async function e_(n){await fetch(`${ye}/restore_ensaio/${n}`,{method:"POST"})}async function n_(n){let t=new FormData;return t.append("file",n),await(await fetch(`${ye}/upgrade`,{method:"POST",body:t})).text()}function i_(){const{set_modal:n}=ze(),t=e=>()=>{Jm(e),n(null)};return j("div",{class:"modal-content",children:[j("span",{class:"modal-titulo",children:"Confirme qual componente você deseja desligar:"}),j("span",{class:"modal-close",onClick:()=>n(null),children:"×"}),j("button",{class:"encoder",onClick:t("all"),children:"Desligar encoder e câmera subsea"}),j("button",{class:"led",onClick:t("led"),children:"Desligar LED"})]})}function r_(){const{set_modal:n}=ze(),t=e=>()=>{bu(e),n(null)};return j("div",{class:"modal-content",children:[j("span",{class:"modal-titulo",children:"Confirme qual componente você deseja reiniciar:"}),j("span",{class:"modal-close",onClick:()=>n(null),children:"×"}),j("button",{class:"encoder",onClick:t("all"),children:" Reiniciar encoder e câmera subsea "}),j("button",{class:"led",onClick:t("led"),children:" Reiniciar LED "})]})}function s_(){const{set_modal:n}=ze(),t=e=>()=>{Km(e),n(null)};return j("div",{class:"modal-content modal-modos",children:[j("span",{class:"modal-titulo",children:"Selecione o modo:"}),j("span",{class:"modal-close",onClick:()=>n(null),children:"×"}),j("button",{class:"modo-tempo",onClick:t("Tempo"),children:"Modo Tempo"}),j("button",{class:"modo-odometro",onClick:t("Odometro"),children:"Modo Estimativa em Tempo Real"})]})}function a_(){const{set_modal:n}=ze(),[t,e]=Je([]),i=()=>{Qm().then(a=>e(a.map(o=>({name:o,deleted:!1}))))};gn(()=>i(),[]);const r=a=>async()=>{confirm(`Deseja realmente deletar ${a.name}?`)&&(await t_(a.name),e(o=>{let l=[...o];for(const c in l)l[c].name==a.name&&(l[c].deleted=!0);return l}))},s=a=>async()=>{await e_(a.name),e(o=>{let l=[...o];for(const c in l)l[c].name==a.name&&(l[c].deleted=!1);return l})};return j("div",{class:"modal-content modal-download",children:[j("span",{class:"modal-titulo",children:"Download de ensaios:"}),j("span",{class:"modal-close",onClick:()=>n(null),children:" × "}),j("div",{class:"modal-list",children:t.map(a=>j("div",{className:`modal-row ${a.deleted?"deleted":""}`,children:[j("a",{href:`ensaios/${a.name}`,children:[" ",a.name," "]}),a.deleted?j("button",{onClick:s(a),children:" Restaurar "}):j("button",{onClick:r(a),children:" Deletar "})]},a.name))}),j("button",{class:"modal-update",onClick:i,children:" Atualizar lista "})]})}function o_(){const{set_modal:n}=ze(),[t,e]=Je({submit_enable:!0,text:"Envie o arquivo para iniciar atualização:"}),i=async r=>{e({submit_enable:!1,text:"<h2>Instalando atualização...</h2>"});const s=await n_(r.target.files[0]);e({submit_enable:!1,text:s}),text.indexOf("sucesso")>0&&(await bu("all"),setTimeout(()=>{window.location.reload()},40*1e3))};return j("div",{class:"modal-content modal-upgrade",children:[j("span",{class:"modal-titulo",children:" Atualização de software: "}),j("span",{class:"modal-close",onClick:()=>n(null),children:" × "}),j("span",{class:"modal-info",dangerouslySetInnerHTML:{__html:t.text}}),j("input",{type:"file",accept:".zip",onChange:i,disabled:!t.submit_enable})]})}function l_(){const{set_modal:n,status:t}=ze(),[e,i]=Je(1),r=Math.sqrt(t.pos.x*t.pos.x+t.pos.y*t.pos.y).toFixed(2),s=abs(r/e),a=()=>{Bl("photo",8),n(null)},o=()=>{Bl("displacement",s),n(null)};return j("div",{class:"modal-content modal-calibracao",children:[j("span",{class:"modal-titulo",children:"Calibrar resolução espacial"}),j("span",{class:"modal-close",onClick:()=>n(null),children:"×"}),j("section",{class:"calib-foto",children:[j("header",{children:[j("span",{children:"Método 1:"}),j("span",{children:"Aponte a câmera para o padrão de calibração e aperte o botão abaixo:"})]}),j("button",{class:"btn-foto",onClick:a,children:"Calibrar por foto"})]}),j("section",{class:"calib-movimento",children:[j("header",{children:[j("span",{children:"Método 2:"}),j("span",{children:"Mova a câmera uma distância conhecida, preencha a tabela e aperte o botão abaixo:"})]}),j("label",{children:[j("span",{children:" Distância percorrida (mm): "}),j("input",{class:"dist-mm",type:"number",min:"0",value:e,onInput:l=>i(l.target.value)})]}),j("div",{children:[j("span",{children:" Distância percorrida (px):"}),j("span",{class:"dist-px",children:[r," px"]})]}),j("div",{children:[j("span",{children:" Resolução espacial:"}),j("span",{class:"spatial-res",children:[s.toFixed(2)," px/mm"]})]}),j("button",{class:"btn-movimento",disabled:!isFinite(s),onClick:o,children:"Calibrar por movimento"})]})]})}function c_({modal:n}){switch(n){case"desligar":return j(i_,{});case"reiniciar":return j(r_,{});case"modo":return j(s_,{});case"download":return j(a_,{});case"upgrade":return j(o_,{});case"calibracao":return j(l_,{});default:return null}}function u_(){const{modal:n,set_modal:t}=ze(),e=i=>{i.target.classList.contains("modal")&&t(null)};return n===null?null:j("div",{onClick:e,class:"modal",children:j(c_,{modal:n})})}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const zo="178",f_=0,zl=1,h_=2,wu=1,d_=2,fn=3,Ln=0,we=1,hn=2,Pn=0,Ei=1,kl=2,Hl=3,Vl=4,p_=5,$n=100,m_=101,__=102,g_=103,v_=104,x_=200,M_=201,S_=202,y_=203,Fa=204,Oa=205,E_=206,T_=207,b_=208,w_=209,A_=210,R_=211,C_=212,P_=213,D_=214,Ba=0,za=1,ka=2,Di=3,Ha=4,Va=5,Ga=6,Wa=7,ko=0,L_=1,U_=2,Dn=0,I_=1,N_=2,F_=3,O_=4,B_=5,z_=6,k_=7,Au=300,Li=301,Ui=302,Xa=303,$a=304,Cs=306,qa=1e3,Kn=1001,Ya=1002,Ye=1003,H_=1004,yr=1005,je=1006,Bs=1007,Zn=1008,Mn=1009,Ru=1010,Cu=1011,er=1012,Ho=1013,ei=1014,mn=1015,or=1016,Vo=1017,Go=1018,nr=1020,Pu=35902,Du=1021,Lu=1022,qe=1023,ir=1026,rr=1027,Uu=1028,Wo=1029,Iu=1030,Xo=1031,$o=1033,jr=33776,Qr=33777,ts=33778,es=33779,Ka=35840,Za=35841,Ja=35842,ja=35843,Qa=36196,to=37492,eo=37496,no=37808,io=37809,ro=37810,so=37811,ao=37812,oo=37813,lo=37814,co=37815,uo=37816,fo=37817,ho=37818,po=37819,mo=37820,_o=37821,ns=36492,go=36494,vo=36495,Nu=36283,xo=36284,Mo=36285,So=36286,V_=3200,G_=3201,Fu=0,W_=1,Cn="",Oe="srgb",Ii="srgb-linear",xs="linear",Zt="srgb",ai=7680,Gl=519,X_=512,$_=513,q_=514,Ou=515,Y_=516,K_=517,Z_=518,J_=519,Wl=35044,Xl="300 es",_n=2e3,Ms=2001;class Fi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const r=i[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const _e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zs=Math.PI/180,yo=180/Math.PI;function lr(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(_e[n&255]+_e[n>>8&255]+_e[n>>16&255]+_e[n>>24&255]+"-"+_e[t&255]+_e[t>>8&255]+"-"+_e[t>>16&15|64]+_e[t>>24&255]+"-"+_e[e&63|128]+_e[e>>8&255]+"-"+_e[e>>16&255]+_e[e>>24&255]+_e[i&255]+_e[i>>8&255]+_e[i>>16&255]+_e[i>>24&255]).toLowerCase()}function kt(n,t,e){return Math.max(t,Math.min(e,n))}function j_(n,t){return(n%t+t)%t}function ks(n,t,e){return(1-e)*n+e*t}function Hi(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Te(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Yt{constructor(t=0,e=0){Yt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(kt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*i-a*r+t.x,this.y=s*r+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class cr{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,a,o){let l=i[r+0],c=i[r+1],f=i[r+2],u=i[r+3];const h=s[a+0],p=s[a+1],_=s[a+2],v=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=f,t[e+3]=u;return}if(o===1){t[e+0]=h,t[e+1]=p,t[e+2]=_,t[e+3]=v;return}if(u!==v||l!==h||c!==p||f!==_){let m=1-o;const d=l*h+c*p+f*_+u*v,E=d>=0?1:-1,b=1-d*d;if(b>Number.EPSILON){const U=Math.sqrt(b),C=Math.atan2(U,d*E);m=Math.sin(m*C)/U,o=Math.sin(o*C)/U}const S=o*E;if(l=l*m+h*S,c=c*m+p*S,f=f*m+_*S,u=u*m+v*S,m===1-o){const U=1/Math.sqrt(l*l+c*c+f*f+u*u);l*=U,c*=U,f*=U,u*=U}}t[e]=l,t[e+1]=c,t[e+2]=f,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],f=i[r+3],u=s[a],h=s[a+1],p=s[a+2],_=s[a+3];return t[e]=o*_+f*u+l*p-c*h,t[e+1]=l*_+f*h+c*u-o*p,t[e+2]=c*_+f*p+o*h-l*u,t[e+3]=f*_-o*u-l*h-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),f=o(r/2),u=o(s/2),h=l(i/2),p=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=h*f*u+c*p*_,this._y=c*p*u-h*f*_,this._z=c*f*_+h*p*u,this._w=c*f*u-h*p*_;break;case"YXZ":this._x=h*f*u+c*p*_,this._y=c*p*u-h*f*_,this._z=c*f*_-h*p*u,this._w=c*f*u+h*p*_;break;case"ZXY":this._x=h*f*u-c*p*_,this._y=c*p*u+h*f*_,this._z=c*f*_+h*p*u,this._w=c*f*u-h*p*_;break;case"ZYX":this._x=h*f*u-c*p*_,this._y=c*p*u+h*f*_,this._z=c*f*_-h*p*u,this._w=c*f*u+h*p*_;break;case"YZX":this._x=h*f*u+c*p*_,this._y=c*p*u+h*f*_,this._z=c*f*_-h*p*u,this._w=c*f*u-h*p*_;break;case"XZY":this._x=h*f*u-c*p*_,this._y=c*p*u-h*f*_,this._z=c*f*_+h*p*u,this._w=c*f*u+h*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],f=e[6],u=e[10],h=i+o+u;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(f-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>u){const p=2*Math.sqrt(1+i-o-u);this._w=(f-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-i-u);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+f)/p}else{const p=2*Math.sqrt(1+u-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(kt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,f=e._w;return this._x=i*f+a*o+r*c-s*l,this._y=r*f+a*l+s*o-i*c,this._z=s*f+a*c+i*l-r*o,this._w=a*f-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*t._w+i*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*i+e*this._x,this._y=p*r+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),f=Math.atan2(c,o),u=Math.sin((1-e)*f)/c,h=Math.sin(e*f)/c;return this._w=a*u+this._w*h,this._x=i*u+this._x*h,this._y=r*u+this._y*h,this._z=s*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{constructor(t=0,e=0,i=0){W.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion($l.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion($l.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*r-o*i),f=2*(o*e-s*r),u=2*(s*i-a*e);return this.x=e+l*c+a*u-o*f,this.y=i+l*f+o*c-s*u,this.z=r+l*u+s*f-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Hs.copy(this).projectOnVector(t),this.sub(Hs)}reflect(t){return this.sub(Hs.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(kt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Hs=new W,$l=new cr;class It{constructor(t,e,i,r,s,a,o,l,c){It.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,o,l,c)}set(t,e,i,r,s,a,o,l,c){const f=this.elements;return f[0]=t,f[1]=r,f[2]=o,f[3]=e,f[4]=s,f[5]=l,f[6]=i,f[7]=a,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],f=i[4],u=i[7],h=i[2],p=i[5],_=i[8],v=r[0],m=r[3],d=r[6],E=r[1],b=r[4],S=r[7],U=r[2],C=r[5],A=r[8];return s[0]=a*v+o*E+l*U,s[3]=a*m+o*b+l*C,s[6]=a*d+o*S+l*A,s[1]=c*v+f*E+u*U,s[4]=c*m+f*b+u*C,s[7]=c*d+f*S+u*A,s[2]=h*v+p*E+_*U,s[5]=h*m+p*b+_*C,s[8]=h*d+p*S+_*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],f=t[8];return e*a*f-e*o*c-i*s*f+i*o*l+r*s*c-r*a*l}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],f=t[8],u=f*a-o*c,h=o*l-f*s,p=c*s-a*l,_=e*u+i*h+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return t[0]=u*v,t[1]=(r*c-f*i)*v,t[2]=(o*i-r*a)*v,t[3]=h*v,t[4]=(f*e-r*l)*v,t[5]=(r*s-o*e)*v,t[6]=p*v,t[7]=(i*l-c*e)*v,t[8]=(a*e-i*s)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-r*c,r*l,-r*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Vs.makeScale(t,e)),this}rotate(t){return this.premultiply(Vs.makeRotation(-t)),this}translate(t,e){return this.premultiply(Vs.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Vs=new It;function Bu(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Ss(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Q_(){const n=Ss("canvas");return n.style.display="block",n}const ql={};function Ti(n){n in ql||(ql[n]=!0,console.warn(n))}function tg(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}function eg(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function ng(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Yl=new It().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Kl=new It().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ig(){const n={enabled:!0,workingColorSpace:Ii,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Zt&&(r.r=vn(r.r),r.g=vn(r.g),r.b=vn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Zt&&(r.r=bi(r.r),r.g=bi(r.g),r.b=bi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Cn?xs:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ti("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ti("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ii]:{primaries:t,whitePoint:i,transfer:xs,toXYZ:Yl,fromXYZ:Kl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Oe},outputColorSpaceConfig:{drawingBufferColorSpace:Oe}},[Oe]:{primaries:t,whitePoint:i,transfer:Zt,toXYZ:Yl,fromXYZ:Kl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Oe}}}),n}const Gt=ig();function vn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function bi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let oi;class rg{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{oi===void 0&&(oi=Ss("canvas")),oi.width=t.width,oi.height=t.height;const r=oi.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=oi}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ss("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=vn(s[a]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(vn(e[i]/255)*255):e[i]=vn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let sg=0;class qo{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sg++}),this.uuid=lr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Gs(r[a].image)):s.push(Gs(r[a]))}else s=Gs(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function Gs(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?rg.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ag=0;const Ws=new W;class Ae extends Fi{constructor(t=Ae.DEFAULT_IMAGE,e=Ae.DEFAULT_MAPPING,i=Kn,r=Kn,s=je,a=Zn,o=qe,l=Mn,c=Ae.DEFAULT_ANISOTROPY,f=Cn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ag++}),this.uuid=lr(),this.name="",this.source=new qo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Yt(0,0),this.repeat=new Yt(1,1),this.center=new Yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new It,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ws).x}get height(){return this.source.getSize(Ws).y}get depth(){return this.source.getSize(Ws).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Au)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case qa:t.x=t.x-Math.floor(t.x);break;case Kn:t.x=t.x<0?0:1;break;case Ya:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case qa:t.y=t.y-Math.floor(t.y);break;case Kn:t.y=t.y<0?0:1;break;case Ya:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ae.DEFAULT_IMAGE=null;Ae.DEFAULT_MAPPING=Au;Ae.DEFAULT_ANISOTROPY=1;class le{constructor(t=0,e=0,i=0,r=1){le.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*i+a[11]*r+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const l=t.elements,c=l[0],f=l[4],u=l[8],h=l[1],p=l[5],_=l[9],v=l[2],m=l[6],d=l[10];if(Math.abs(f-h)<.01&&Math.abs(u-v)<.01&&Math.abs(_-m)<.01){if(Math.abs(f+h)<.1&&Math.abs(u+v)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(c+1)/2,S=(p+1)/2,U=(d+1)/2,C=(f+h)/4,A=(u+v)/4,O=(_+m)/4;return b>S&&b>U?b<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(b),r=C/i,s=A/i):S>U?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=C/r,s=O/r):U<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(U),i=A/s,r=O/s),this.set(i,r,s,e),this}let E=Math.sqrt((m-_)*(m-_)+(u-v)*(u-v)+(h-f)*(h-f));return Math.abs(E)<.001&&(E=1),this.x=(m-_)/E,this.y=(u-v)/E,this.z=(h-f)/E,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this.w=kt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this.w=kt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class og extends Fi{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new le(0,0,t,e),this.scissorTest=!1,this.viewport=new le(0,0,t,e);const r={width:t,height:e,depth:i.depth},s=new Ae(r);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:je,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new qo(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ni extends og{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class zu extends Ae{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class lg extends Ae{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ur{constructor(t=new W(1/0,1/0,1/0),e=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(He.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(He.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=He.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,He):He.fromBufferAttribute(s,a),He.applyMatrix4(t.matrixWorld),this.expandByPoint(He);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Er.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Er.copy(i.boundingBox)),Er.applyMatrix4(t.matrixWorld),this.union(Er)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,He),He.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Vi),Tr.subVectors(this.max,Vi),li.subVectors(t.a,Vi),ci.subVectors(t.b,Vi),ui.subVectors(t.c,Vi),Sn.subVectors(ci,li),yn.subVectors(ui,ci),On.subVectors(li,ui);let e=[0,-Sn.z,Sn.y,0,-yn.z,yn.y,0,-On.z,On.y,Sn.z,0,-Sn.x,yn.z,0,-yn.x,On.z,0,-On.x,-Sn.y,Sn.x,0,-yn.y,yn.x,0,-On.y,On.x,0];return!Xs(e,li,ci,ui,Tr)||(e=[1,0,0,0,1,0,0,0,1],!Xs(e,li,ci,ui,Tr))?!1:(br.crossVectors(Sn,yn),e=[br.x,br.y,br.z],Xs(e,li,ci,ui,Tr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,He).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(He).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(an[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),an[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),an[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),an[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),an[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),an[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),an[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),an[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(an),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const an=[new W,new W,new W,new W,new W,new W,new W,new W],He=new W,Er=new ur,li=new W,ci=new W,ui=new W,Sn=new W,yn=new W,On=new W,Vi=new W,Tr=new W,br=new W,Bn=new W;function Xs(n,t,e,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Bn.fromArray(n,s);const o=r.x*Math.abs(Bn.x)+r.y*Math.abs(Bn.y)+r.z*Math.abs(Bn.z),l=t.dot(Bn),c=e.dot(Bn),f=i.dot(Bn);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>o)return!1}return!0}const cg=new ur,Gi=new W,$s=new W;class Yo{constructor(t=new W,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):cg.setFromPoints(t).getCenter(i);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Gi.subVectors(t,this.center);const e=Gi.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(Gi,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):($s.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Gi.copy(t.center).add($s)),this.expandByPoint(Gi.copy(t.center).sub($s))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const on=new W,qs=new W,wr=new W,En=new W,Ys=new W,Ar=new W,Ks=new W;class ug{constructor(t=new W,e=new W(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,on)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=on.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(on.copy(this.origin).addScaledVector(this.direction,e),on.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){qs.copy(t).add(e).multiplyScalar(.5),wr.copy(e).sub(t).normalize(),En.copy(this.origin).sub(qs);const s=t.distanceTo(e)*.5,a=-this.direction.dot(wr),o=En.dot(this.direction),l=-En.dot(wr),c=En.lengthSq(),f=Math.abs(1-a*a);let u,h,p,_;if(f>0)if(u=a*l-o,h=a*o-l,_=s*f,u>=0)if(h>=-_)if(h<=_){const v=1/f;u*=v,h*=v,p=u*(u+a*h+2*o)+h*(a*u+h+2*l)+c}else h=s,u=Math.max(0,-(a*h+o)),p=-u*u+h*(h+2*l)+c;else h=-s,u=Math.max(0,-(a*h+o)),p=-u*u+h*(h+2*l)+c;else h<=-_?(u=Math.max(0,-(-a*s+o)),h=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+h*(h+2*l)+c):h<=_?(u=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(u=Math.max(0,-(a*s+o)),h=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+h*(h+2*l)+c);else h=a>0?-s:s,u=Math.max(0,-(a*h+o)),p=-u*u+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(qs).addScaledVector(wr,h),p}intersectSphere(t,e){on.subVectors(t.center,this.origin);const i=on.dot(this.direction),r=on.dot(on)-i*i,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,a,o,l;const c=1/this.direction.x,f=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,r=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,r=(t.min.x-h.x)*c),f>=0?(s=(t.min.y-h.y)*f,a=(t.max.y-h.y)*f):(s=(t.max.y-h.y)*f,a=(t.min.y-h.y)*f),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(t.min.z-h.z)*u,l=(t.max.z-h.z)*u):(o=(t.max.z-h.z)*u,l=(t.min.z-h.z)*u),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,on)!==null}intersectTriangle(t,e,i,r,s){Ys.subVectors(e,t),Ar.subVectors(i,t),Ks.crossVectors(Ys,Ar);let a=this.direction.dot(Ks),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;En.subVectors(this.origin,t);const l=o*this.direction.dot(Ar.crossVectors(En,Ar));if(l<0)return null;const c=o*this.direction.dot(Ys.cross(En));if(c<0||l+c>a)return null;const f=-o*En.dot(Ks);return f<0?null:this.at(f/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class fe{constructor(t,e,i,r,s,a,o,l,c,f,u,h,p,_,v,m){fe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,o,l,c,f,u,h,p,_,v,m)}set(t,e,i,r,s,a,o,l,c,f,u,h,p,_,v,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=f,d[10]=u,d[14]=h,d[3]=p,d[7]=_,d[11]=v,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new fe().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/fi.setFromMatrixColumn(t,0).length(),s=1/fi.setFromMatrixColumn(t,1).length(),a=1/fi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),f=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const h=a*f,p=a*u,_=o*f,v=o*u;e[0]=l*f,e[4]=-l*u,e[8]=c,e[1]=p+_*c,e[5]=h-v*c,e[9]=-o*l,e[2]=v-h*c,e[6]=_+p*c,e[10]=a*l}else if(t.order==="YXZ"){const h=l*f,p=l*u,_=c*f,v=c*u;e[0]=h+v*o,e[4]=_*o-p,e[8]=a*c,e[1]=a*u,e[5]=a*f,e[9]=-o,e[2]=p*o-_,e[6]=v+h*o,e[10]=a*l}else if(t.order==="ZXY"){const h=l*f,p=l*u,_=c*f,v=c*u;e[0]=h-v*o,e[4]=-a*u,e[8]=_+p*o,e[1]=p+_*o,e[5]=a*f,e[9]=v-h*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const h=a*f,p=a*u,_=o*f,v=o*u;e[0]=l*f,e[4]=_*c-p,e[8]=h*c+v,e[1]=l*u,e[5]=v*c+h,e[9]=p*c-_,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const h=a*l,p=a*c,_=o*l,v=o*c;e[0]=l*f,e[4]=v-h*u,e[8]=_*u+p,e[1]=u,e[5]=a*f,e[9]=-o*f,e[2]=-c*f,e[6]=p*u+_,e[10]=h-v*u}else if(t.order==="XZY"){const h=a*l,p=a*c,_=o*l,v=o*c;e[0]=l*f,e[4]=-u,e[8]=c*f,e[1]=h*u+v,e[5]=a*f,e[9]=p*u-_,e[2]=_*u-p,e[6]=o*f,e[10]=v*u+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(fg,t,hg)}lookAt(t,e,i){const r=this.elements;return De.subVectors(t,e),De.lengthSq()===0&&(De.z=1),De.normalize(),Tn.crossVectors(i,De),Tn.lengthSq()===0&&(Math.abs(i.z)===1?De.x+=1e-4:De.z+=1e-4,De.normalize(),Tn.crossVectors(i,De)),Tn.normalize(),Rr.crossVectors(De,Tn),r[0]=Tn.x,r[4]=Rr.x,r[8]=De.x,r[1]=Tn.y,r[5]=Rr.y,r[9]=De.y,r[2]=Tn.z,r[6]=Rr.z,r[10]=De.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],f=i[1],u=i[5],h=i[9],p=i[13],_=i[2],v=i[6],m=i[10],d=i[14],E=i[3],b=i[7],S=i[11],U=i[15],C=r[0],A=r[4],O=r[8],y=r[12],M=r[1],L=r[5],H=r[9],X=r[13],w=r[2],B=r[6],P=r[10],z=r[14],F=r[3],Y=r[7],Z=r[11],at=r[15];return s[0]=a*C+o*M+l*w+c*F,s[4]=a*A+o*L+l*B+c*Y,s[8]=a*O+o*H+l*P+c*Z,s[12]=a*y+o*X+l*z+c*at,s[1]=f*C+u*M+h*w+p*F,s[5]=f*A+u*L+h*B+p*Y,s[9]=f*O+u*H+h*P+p*Z,s[13]=f*y+u*X+h*z+p*at,s[2]=_*C+v*M+m*w+d*F,s[6]=_*A+v*L+m*B+d*Y,s[10]=_*O+v*H+m*P+d*Z,s[14]=_*y+v*X+m*z+d*at,s[3]=E*C+b*M+S*w+U*F,s[7]=E*A+b*L+S*B+U*Y,s[11]=E*O+b*H+S*P+U*Z,s[15]=E*y+b*X+S*z+U*at,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],f=t[2],u=t[6],h=t[10],p=t[14],_=t[3],v=t[7],m=t[11],d=t[15];return _*(+s*l*u-r*c*u-s*o*h+i*c*h+r*o*p-i*l*p)+v*(+e*l*p-e*c*h+s*a*h-r*a*p+r*c*f-s*l*f)+m*(+e*c*u-e*o*p-s*a*u+i*a*p+s*o*f-i*c*f)+d*(-r*o*f-e*l*u+e*o*h+r*a*u-i*a*h+i*l*f)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],f=t[8],u=t[9],h=t[10],p=t[11],_=t[12],v=t[13],m=t[14],d=t[15],E=u*m*c-v*h*c+v*l*p-o*m*p-u*l*d+o*h*d,b=_*h*c-f*m*c-_*l*p+a*m*p+f*l*d-a*h*d,S=f*v*c-_*u*c+_*o*p-a*v*p-f*o*d+a*u*d,U=_*u*l-f*v*l-_*o*h+a*v*h+f*o*m-a*u*m,C=e*E+i*b+r*S+s*U;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return t[0]=E*A,t[1]=(v*h*s-u*m*s-v*r*p+i*m*p+u*r*d-i*h*d)*A,t[2]=(o*m*s-v*l*s+v*r*c-i*m*c-o*r*d+i*l*d)*A,t[3]=(u*l*s-o*h*s-u*r*c+i*h*c+o*r*p-i*l*p)*A,t[4]=b*A,t[5]=(f*m*s-_*h*s+_*r*p-e*m*p-f*r*d+e*h*d)*A,t[6]=(_*l*s-a*m*s-_*r*c+e*m*c+a*r*d-e*l*d)*A,t[7]=(a*h*s-f*l*s+f*r*c-e*h*c-a*r*p+e*l*p)*A,t[8]=S*A,t[9]=(_*u*s-f*v*s-_*i*p+e*v*p+f*i*d-e*u*d)*A,t[10]=(a*v*s-_*o*s+_*i*c-e*v*c-a*i*d+e*o*d)*A,t[11]=(f*o*s-a*u*s-f*i*c+e*u*c+a*i*p-e*o*p)*A,t[12]=U*A,t[13]=(f*v*r-_*u*r+_*i*h-e*v*h-f*i*m+e*u*m)*A,t[14]=(_*o*r-a*v*r-_*i*l+e*v*l+a*i*m-e*o*m)*A,t[15]=(a*u*r-f*o*r+f*i*l-e*u*l-a*i*h+e*o*h)*A,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,a=t.x,o=t.y,l=t.z,c=s*a,f=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,f*o+i,f*l-r*a,0,c*l-r*o,f*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,a){return this.set(1,i,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,f=a+a,u=o+o,h=s*c,p=s*f,_=s*u,v=a*f,m=a*u,d=o*u,E=l*c,b=l*f,S=l*u,U=i.x,C=i.y,A=i.z;return r[0]=(1-(v+d))*U,r[1]=(p+S)*U,r[2]=(_-b)*U,r[3]=0,r[4]=(p-S)*C,r[5]=(1-(h+d))*C,r[6]=(m+E)*C,r[7]=0,r[8]=(_+b)*A,r[9]=(m-E)*A,r[10]=(1-(h+v))*A,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=fi.set(r[0],r[1],r[2]).length();const a=fi.set(r[4],r[5],r[6]).length(),o=fi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Ve.copy(this);const c=1/s,f=1/a,u=1/o;return Ve.elements[0]*=c,Ve.elements[1]*=c,Ve.elements[2]*=c,Ve.elements[4]*=f,Ve.elements[5]*=f,Ve.elements[6]*=f,Ve.elements[8]*=u,Ve.elements[9]*=u,Ve.elements[10]*=u,e.setFromRotationMatrix(Ve),i.x=s,i.y=a,i.z=o,this}makePerspective(t,e,i,r,s,a,o=_n){const l=this.elements,c=2*s/(e-t),f=2*s/(i-r),u=(e+t)/(e-t),h=(i+r)/(i-r);let p,_;if(o===_n)p=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===Ms)p=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,r,s,a,o=_n){const l=this.elements,c=1/(e-t),f=1/(i-r),u=1/(a-s),h=(e+t)*c,p=(i+r)*f;let _,v;if(o===_n)_=(a+s)*u,v=-2*u;else if(o===Ms)_=s*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*f,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const fi=new W,Ve=new fe,fg=new W(0,0,0),hg=new W(1,1,1),Tn=new W,Rr=new W,De=new W,Zl=new fe,Jl=new cr;class en{constructor(t=0,e=0,i=0,r=en.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],f=r[9],u=r[2],h=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-kt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(kt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Zl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Zl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Jl.setFromEuler(this),this.setFromQuaternion(Jl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}en.DEFAULT_ORDER="XYZ";class ku{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let dg=0;const jl=new W,hi=new cr,ln=new fe,Cr=new W,Wi=new W,pg=new W,mg=new cr,Ql=new W(1,0,0),tc=new W(0,1,0),ec=new W(0,0,1),nc={type:"added"},_g={type:"removed"},di={type:"childadded",child:null},Zs={type:"childremoved",child:null};class Re extends Fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dg++}),this.uuid=lr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Re.DEFAULT_UP.clone();const t=new W,e=new en,i=new cr,r=new W(1,1,1);function s(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new fe},normalMatrix:{value:new It}}),this.matrix=new fe,this.matrixWorld=new fe,this.matrixAutoUpdate=Re.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ku,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return hi.setFromAxisAngle(t,e),this.quaternion.multiply(hi),this}rotateOnWorldAxis(t,e){return hi.setFromAxisAngle(t,e),this.quaternion.premultiply(hi),this}rotateX(t){return this.rotateOnAxis(Ql,t)}rotateY(t){return this.rotateOnAxis(tc,t)}rotateZ(t){return this.rotateOnAxis(ec,t)}translateOnAxis(t,e){return jl.copy(t).applyQuaternion(this.quaternion),this.position.add(jl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ql,t)}translateY(t){return this.translateOnAxis(tc,t)}translateZ(t){return this.translateOnAxis(ec,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ln.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Cr.copy(t):Cr.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Wi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ln.lookAt(Wi,Cr,this.up):ln.lookAt(Cr,Wi,this.up),this.quaternion.setFromRotationMatrix(ln),r&&(ln.extractRotation(r.matrixWorld),hi.setFromRotationMatrix(ln),this.quaternion.premultiply(hi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(nc),di.child=t,this.dispatchEvent(di),di.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(_g),Zs.child=t,this.dispatchEvent(Zs),Zs.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(nc),di.child=t,this.dispatchEvent(di),di.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,t,pg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,mg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),f=a(t.images),u=a(t.shapes),h=a(t.skeletons),p=a(t.animations),_=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),u.length>0&&(i.shapes=u),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const l=[];for(const c in o){const f=o[c];delete f.metadata,l.push(f)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}Re.DEFAULT_UP=new W(0,1,0);Re.DEFAULT_MATRIX_AUTO_UPDATE=!0;Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ge=new W,cn=new W,Js=new W,un=new W,pi=new W,mi=new W,ic=new W,js=new W,Qs=new W,ta=new W,ea=new le,na=new le,ia=new le;class $e{constructor(t=new W,e=new W,i=new W){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),Ge.subVectors(t,e),r.cross(Ge);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){Ge.subVectors(r,e),cn.subVectors(i,e),Js.subVectors(t,e);const a=Ge.dot(Ge),o=Ge.dot(cn),l=Ge.dot(Js),c=cn.dot(cn),f=cn.dot(Js),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const h=1/u,p=(c*l-o*f)*h,_=(a*f-o*l)*h;return s.set(1-p-_,_,p)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,un)===null?!1:un.x>=0&&un.y>=0&&un.x+un.y<=1}static getInterpolation(t,e,i,r,s,a,o,l){return this.getBarycoord(t,e,i,r,un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,un.x),l.addScaledVector(a,un.y),l.addScaledVector(o,un.z),l)}static getInterpolatedAttribute(t,e,i,r,s,a){return ea.setScalar(0),na.setScalar(0),ia.setScalar(0),ea.fromBufferAttribute(t,e),na.fromBufferAttribute(t,i),ia.fromBufferAttribute(t,r),a.setScalar(0),a.addScaledVector(ea,s.x),a.addScaledVector(na,s.y),a.addScaledVector(ia,s.z),a}static isFrontFacing(t,e,i,r){return Ge.subVectors(i,e),cn.subVectors(t,e),Ge.cross(cn).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ge.subVectors(this.c,this.b),cn.subVectors(this.a,this.b),Ge.cross(cn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return $e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return $e.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return $e.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return $e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return $e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let a,o;pi.subVectors(r,i),mi.subVectors(s,i),js.subVectors(t,i);const l=pi.dot(js),c=mi.dot(js);if(l<=0&&c<=0)return e.copy(i);Qs.subVectors(t,r);const f=pi.dot(Qs),u=mi.dot(Qs);if(f>=0&&u<=f)return e.copy(r);const h=l*u-f*c;if(h<=0&&l>=0&&f<=0)return a=l/(l-f),e.copy(i).addScaledVector(pi,a);ta.subVectors(t,s);const p=pi.dot(ta),_=mi.dot(ta);if(_>=0&&p<=_)return e.copy(s);const v=p*c-l*_;if(v<=0&&c>=0&&_<=0)return o=c/(c-_),e.copy(i).addScaledVector(mi,o);const m=f*_-p*u;if(m<=0&&u-f>=0&&p-_>=0)return ic.subVectors(s,r),o=(u-f)/(u-f+(p-_)),e.copy(r).addScaledVector(ic,o);const d=1/(m+v+h);return a=v*d,o=h*d,e.copy(i).addScaledVector(pi,a).addScaledVector(mi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Hu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bn={h:0,s:0,l:0},Pr={h:0,s:0,l:0};function ra(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class $t{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Oe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Gt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,r=Gt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Gt.colorSpaceToWorking(this,r),this}setHSL(t,e,i,r=Gt.workingColorSpace){if(t=j_(t,1),e=kt(e,0,1),i=kt(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,a=2*i-s;this.r=ra(a,s,t+1/3),this.g=ra(a,s,t),this.b=ra(a,s,t-1/3)}return Gt.colorSpaceToWorking(this,r),this}setStyle(t,e=Oe){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Oe){const i=Hu[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=vn(t.r),this.g=vn(t.g),this.b=vn(t.b),this}copyLinearToSRGB(t){return this.r=bi(t.r),this.g=bi(t.g),this.b=bi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Oe){return Gt.workingToColorSpace(ge.copy(this),t),Math.round(kt(ge.r*255,0,255))*65536+Math.round(kt(ge.g*255,0,255))*256+Math.round(kt(ge.b*255,0,255))}getHexString(t=Oe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Gt.workingColorSpace){Gt.workingToColorSpace(ge.copy(this),e);const i=ge.r,r=ge.g,s=ge.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const f=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=f<=.5?u/(a+o):u/(2-a-o),a){case i:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-i)/u+2;break;case s:l=(i-r)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=f,t}getRGB(t,e=Gt.workingColorSpace){return Gt.workingToColorSpace(ge.copy(this),e),t.r=ge.r,t.g=ge.g,t.b=ge.b,t}getStyle(t=Oe){Gt.workingToColorSpace(ge.copy(this),t);const e=ge.r,i=ge.g,r=ge.b;return t!==Oe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(bn),this.setHSL(bn.h+t,bn.s+e,bn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(bn),t.getHSL(Pr);const i=ks(bn.h,Pr.h,e),r=ks(bn.s,Pr.s,e),s=ks(bn.l,Pr.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ge=new $t;$t.NAMES=Hu;let gg=0;class fr extends Fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gg++}),this.uuid=lr(),this.name="",this.type="Material",this.blending=Ei,this.side=Ln,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fa,this.blendDst=Oa,this.blendEquation=$n,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $t(0,0,0),this.blendAlpha=0,this.depthFunc=Di,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ai,this.stencilZFail=ai,this.stencilZPass=ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ei&&(i.blending=this.blending),this.side!==Ln&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Fa&&(i.blendSrc=this.blendSrc),this.blendDst!==Oa&&(i.blendDst=this.blendDst),this.blendEquation!==$n&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Di&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ai&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ai&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ai&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=r(t.textures),a=r(t.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Vu extends fr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=ko,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ce=new W,Dr=new Yt;let vg=0;class tn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vg++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Wl,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Dr.fromBufferAttribute(this,e),Dr.applyMatrix3(t),this.setXY(e,Dr.x,Dr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ce.fromBufferAttribute(this,e),ce.applyMatrix3(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ce.fromBufferAttribute(this,e),ce.applyMatrix4(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ce.fromBufferAttribute(this,e),ce.applyNormalMatrix(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ce.fromBufferAttribute(this,e),ce.transformDirection(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Hi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Te(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Hi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Hi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Hi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Hi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),i=Te(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),i=Te(i,this.array),r=Te(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),i=Te(i,this.array),r=Te(r,this.array),s=Te(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Wl&&(t.usage=this.usage),t}}class Gu extends tn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Wu extends tn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class jn extends tn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let xg=0;const Fe=new fe,sa=new Re,_i=new W,Le=new ur,Xi=new ur,me=new W;class ii extends Fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xg++}),this.uuid=lr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Bu(t)?Wu:Gu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new It().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Fe.makeRotationFromQuaternion(t),this.applyMatrix4(Fe),this}rotateX(t){return Fe.makeRotationX(t),this.applyMatrix4(Fe),this}rotateY(t){return Fe.makeRotationY(t),this.applyMatrix4(Fe),this}rotateZ(t){return Fe.makeRotationZ(t),this.applyMatrix4(Fe),this}translate(t,e,i){return Fe.makeTranslation(t,e,i),this.applyMatrix4(Fe),this}scale(t,e,i){return Fe.makeScale(t,e,i),this.applyMatrix4(Fe),this}lookAt(t){return sa.lookAt(t),sa.updateMatrix(),this.applyMatrix4(sa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_i).negate(),this.translate(_i.x,_i.y,_i.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const a=t[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new jn(i,3))}else{const i=Math.min(t.length,e.count);for(let r=0;r<i;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ur);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];Le.setFromBufferAttribute(s),this.morphTargetsRelative?(me.addVectors(this.boundingBox.min,Le.min),this.boundingBox.expandByPoint(me),me.addVectors(this.boundingBox.max,Le.max),this.boundingBox.expandByPoint(me)):(this.boundingBox.expandByPoint(Le.min),this.boundingBox.expandByPoint(Le.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(t){const i=this.boundingSphere.center;if(Le.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];Xi.setFromBufferAttribute(o),this.morphTargetsRelative?(me.addVectors(Le.min,Xi.min),Le.expandByPoint(me),me.addVectors(Le.max,Xi.max),Le.expandByPoint(me)):(Le.expandByPoint(Xi.min),Le.expandByPoint(Xi.max))}Le.getCenter(i);let r=0;for(let s=0,a=t.count;s<a;s++)me.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(me));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)me.fromBufferAttribute(o,c),l&&(_i.fromBufferAttribute(t,c),me.add(_i)),r=Math.max(r,i.distanceToSquared(me))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new tn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let O=0;O<i.count;O++)o[O]=new W,l[O]=new W;const c=new W,f=new W,u=new W,h=new Yt,p=new Yt,_=new Yt,v=new W,m=new W;function d(O,y,M){c.fromBufferAttribute(i,O),f.fromBufferAttribute(i,y),u.fromBufferAttribute(i,M),h.fromBufferAttribute(s,O),p.fromBufferAttribute(s,y),_.fromBufferAttribute(s,M),f.sub(c),u.sub(c),p.sub(h),_.sub(h);const L=1/(p.x*_.y-_.x*p.y);isFinite(L)&&(v.copy(f).multiplyScalar(_.y).addScaledVector(u,-p.y).multiplyScalar(L),m.copy(u).multiplyScalar(p.x).addScaledVector(f,-_.x).multiplyScalar(L),o[O].add(v),o[y].add(v),o[M].add(v),l[O].add(m),l[y].add(m),l[M].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let O=0,y=E.length;O<y;++O){const M=E[O],L=M.start,H=M.count;for(let X=L,w=L+H;X<w;X+=3)d(t.getX(X+0),t.getX(X+1),t.getX(X+2))}const b=new W,S=new W,U=new W,C=new W;function A(O){U.fromBufferAttribute(r,O),C.copy(U);const y=o[O];b.copy(y),b.sub(U.multiplyScalar(U.dot(y))).normalize(),S.crossVectors(C,y);const L=S.dot(l[O])<0?-1:1;a.setXYZW(O,b.x,b.y,b.z,L)}for(let O=0,y=E.length;O<y;++O){const M=E[O],L=M.start,H=M.count;for(let X=L,w=L+H;X<w;X+=3)A(t.getX(X+0)),A(t.getX(X+1)),A(t.getX(X+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new tn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new W,s=new W,a=new W,o=new W,l=new W,c=new W,f=new W,u=new W;if(t)for(let h=0,p=t.count;h<p;h+=3){const _=t.getX(h+0),v=t.getX(h+1),m=t.getX(h+2);r.fromBufferAttribute(e,_),s.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),f.subVectors(a,s),u.subVectors(r,s),f.cross(u),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),o.add(f),l.add(f),c.add(f),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=e.count;h<p;h+=3)r.fromBufferAttribute(e,h+0),s.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),f.subVectors(a,s),u.subVectors(r,s),f.cross(u),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)me.fromBufferAttribute(t,e),me.normalize(),t.setXYZ(e,me.x,me.y,me.z)}toNonIndexed(){function t(o,l){const c=o.array,f=o.itemSize,u=o.normalized,h=new c.constructor(l.length*f);let p=0,_=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*f;for(let d=0;d<f;d++)h[_++]=c[p++]}return new tn(h,f,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ii,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=t(l,i);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let f=0,u=c.length;f<u;f++){const h=c[f],p=t(h,i);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let u=0,h=c.length;u<h;u++){const p=c[u];f.push(p.toJSON(t.data))}f.length>0&&(r[l]=f,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const r=t.attributes;for(const c in r){const f=r[c];this.setAttribute(c,f.clone(e))}const s=t.morphAttributes;for(const c in s){const f=[],u=s[c];for(let h=0,p=u.length;h<p;h++)f.push(u[h].clone(e));this.morphAttributes[c]=f}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,f=a.length;c<f;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rc=new fe,zn=new ug,Lr=new Yo,sc=new W,Ur=new W,Ir=new W,Nr=new W,aa=new W,Fr=new W,ac=new W,Or=new W;class Se extends Re{constructor(t=new ii,e=new Vu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){Fr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const f=o[l],u=s[l];f!==0&&(aa.fromBufferAttribute(u,t),a?Fr.addScaledVector(aa,f):Fr.addScaledVector(aa.sub(e),f))}e.add(Fr)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Lr.copy(i.boundingSphere),Lr.applyMatrix4(s),zn.copy(t.ray).recast(t.near),!(Lr.containsPoint(zn.origin)===!1&&(zn.intersectSphere(Lr,sc)===null||zn.origin.distanceToSquared(sc)>(t.far-t.near)**2))&&(rc.copy(s).invert(),zn.copy(t.ray).applyMatrix4(rc),!(i.boundingBox!==null&&zn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,zn)))}_computeIntersections(t,e,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,u=s.attributes.normal,h=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,v=h.length;_<v;_++){const m=h[_],d=a[m.materialIndex],E=Math.max(m.start,p.start),b=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let S=E,U=b;S<U;S+=3){const C=o.getX(S),A=o.getX(S+1),O=o.getX(S+2);r=Br(this,d,t,i,c,f,u,C,A,O),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const _=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=_,d=v;m<d;m+=3){const E=o.getX(m),b=o.getX(m+1),S=o.getX(m+2);r=Br(this,a,t,i,c,f,u,E,b,S),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,v=h.length;_<v;_++){const m=h[_],d=a[m.materialIndex],E=Math.max(m.start,p.start),b=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=E,U=b;S<U;S+=3){const C=S,A=S+1,O=S+2;r=Br(this,d,t,i,c,f,u,C,A,O),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const _=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=_,d=v;m<d;m+=3){const E=m,b=m+1,S=m+2;r=Br(this,a,t,i,c,f,u,E,b,S),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function Mg(n,t,e,i,r,s,a,o){let l;if(t.side===we?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,t.side===Ln,o),l===null)return null;Or.copy(o),Or.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Or);return c<e.near||c>e.far?null:{distance:c,point:Or.clone(),object:n}}function Br(n,t,e,i,r,s,a,o,l,c){n.getVertexPosition(o,Ur),n.getVertexPosition(l,Ir),n.getVertexPosition(c,Nr);const f=Mg(n,t,e,i,Ur,Ir,Nr,ac);if(f){const u=new W;$e.getBarycoord(ac,Ur,Ir,Nr,u),r&&(f.uv=$e.getInterpolatedAttribute(r,o,l,c,u,new Yt)),s&&(f.uv1=$e.getInterpolatedAttribute(s,o,l,c,u,new Yt)),a&&(f.normal=$e.getInterpolatedAttribute(a,o,l,c,u,new W),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new W,materialIndex:0};$e.getNormal(Ur,Ir,Nr,h.normal),f.face=h,f.barycoord=u}return f}class hr extends ii{constructor(t=1,e=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],f=[],u=[];let h=0,p=0;_("z","y","x",-1,-1,i,e,t,a,s,0),_("z","y","x",1,-1,i,e,-t,a,s,1),_("x","z","y",1,1,t,i,e,r,a,2),_("x","z","y",1,-1,t,i,-e,r,a,3),_("x","y","z",1,-1,t,e,i,r,s,4),_("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new jn(c,3)),this.setAttribute("normal",new jn(f,3)),this.setAttribute("uv",new jn(u,2));function _(v,m,d,E,b,S,U,C,A,O,y){const M=S/A,L=U/O,H=S/2,X=U/2,w=C/2,B=A+1,P=O+1;let z=0,F=0;const Y=new W;for(let Z=0;Z<P;Z++){const at=Z*L-X;for(let xt=0;xt<B;xt++){const Ot=xt*M-H;Y[v]=Ot*E,Y[m]=at*b,Y[d]=w,c.push(Y.x,Y.y,Y.z),Y[v]=0,Y[m]=0,Y[d]=C>0?1:-1,f.push(Y.x,Y.y,Y.z),u.push(xt/A),u.push(1-Z/O),z+=1}}for(let Z=0;Z<O;Z++)for(let at=0;at<A;at++){const xt=h+at+B*Z,Ot=h+at+B*(Z+1),$=h+(at+1)+B*(Z+1),nt=h+(at+1)+B*Z;l.push(xt,Ot,nt),l.push(Ot,$,nt),F+=6}o.addGroup(p,F,y),p+=F,h+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ni(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function Me(n){const t={};for(let e=0;e<n.length;e++){const i=Ni(n[e]);for(const r in i)t[r]=i[r]}return t}function Sg(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Xu(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Gt.workingColorSpace}const yg={clone:Ni,merge:Me};var Eg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Tg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Un extends fr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Eg,this.fragmentShader=Tg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ni(t.uniforms),this.uniformsGroups=Sg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class $u extends Re{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fe,this.projectionMatrix=new fe,this.projectionMatrixInverse=new fe,this.coordinateSystem=_n}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const wn=new W,oc=new Yt,lc=new Yt;class Be extends $u{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=yo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(zs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return yo*2*Math.atan(Math.tan(zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){wn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(wn.x,wn.y).multiplyScalar(-t/wn.z),wn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(wn.x,wn.y).multiplyScalar(-t/wn.z)}getViewSize(t,e){return this.getViewBounds(t,oc,lc),e.subVectors(lc,oc)}setViewOffset(t,e,i,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(zs*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,e-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const gi=-90,vi=1;class bg extends Re{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Be(gi,vi,t,e);r.layers=this.layers,this.add(r);const s=new Be(gi,vi,t,e);s.layers=this.layers,this.add(s);const a=new Be(gi,vi,t,e);a.layers=this.layers,this.add(a);const o=new Be(gi,vi,t,e);o.layers=this.layers,this.add(o);const l=new Be(gi,vi,t,e);l.layers=this.layers,this.add(l);const c=new Be(gi,vi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,a,o,l]=e;for(const c of e)this.remove(c);if(t===_n)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ms)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,f]=this.children,u=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,a),t.setRenderTarget(i,2,r),t.render(e,o),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,r),t.render(e,f),t.setRenderTarget(u,h,p),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class qu extends Ae{constructor(t=[],e=Li,i,r,s,a,o,l,c,f){super(t,e,i,r,s,a,o,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class wg extends ni{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new qu(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new hr(5,5,5),s=new Un({name:"CubemapFromEquirect",uniforms:Ni(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:we,blending:Pn});s.uniforms.tEquirect.value=e;const a=new Se(r,s),o=e.minFilter;return e.minFilter===Zn&&(e.minFilter=je),new bg(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,r=!0){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,r);t.setRenderTarget(s)}}class Yi extends Re{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ag={type:"move"};class oa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,i),d=this._getHandJoint(c,v);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const f=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=f.position.distanceTo(u.position),p=.02,_=.005;c.inputState.pinching&&h>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ag)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Yi;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class Rg extends Re{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new en,this.environmentIntensity=1,this.environmentRotation=new en,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const la=new W,Cg=new W,Pg=new It;class Wn{constructor(t=new W(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=la.subVectors(i,e).cross(Cg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(la),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Pg.getNormalMatrix(t),r=this.coplanarPoint(la).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const kn=new Yo,Dg=new Yt(.5,.5),zr=new W;class Yu{constructor(t=new Wn,e=new Wn,i=new Wn,r=new Wn,s=new Wn,a=new Wn){this.planes=[t,e,i,r,s,a]}set(t,e,i,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=_n){const i=this.planes,r=t.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],f=r[5],u=r[6],h=r[7],p=r[8],_=r[9],v=r[10],m=r[11],d=r[12],E=r[13],b=r[14],S=r[15];if(i[0].setComponents(l-s,h-c,m-p,S-d).normalize(),i[1].setComponents(l+s,h+c,m+p,S+d).normalize(),i[2].setComponents(l+a,h+f,m+_,S+E).normalize(),i[3].setComponents(l-a,h-f,m-_,S-E).normalize(),i[4].setComponents(l-o,h-u,m-v,S-b).normalize(),e===_n)i[5].setComponents(l+o,h+u,m+v,S+b).normalize();else if(e===Ms)i[5].setComponents(o,u,v,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),kn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),kn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(kn)}intersectsSprite(t){kn.center.set(0,0,0);const e=Dg.distanceTo(t.center);return kn.radius=.7071067811865476+e,kn.applyMatrix4(t.matrixWorld),this.intersectsSphere(kn)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(zr.x=r.normal.x>0?t.max.x:t.min.x,zr.y=r.normal.y>0?t.max.y:t.min.y,zr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(zr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ku extends Ae{constructor(t,e,i=ei,r,s,a,o=Ye,l=Ye,c,f=ir,u=1){if(f!==ir&&f!==rr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:e,depth:u};super(h,r,s,a,o,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new qo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class dr extends ii{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,a=e/2,o=Math.floor(i),l=Math.floor(r),c=o+1,f=l+1,u=t/o,h=e/l,p=[],_=[],v=[],m=[];for(let d=0;d<f;d++){const E=d*h-a;for(let b=0;b<c;b++){const S=b*u-s;_.push(S,-E,0),v.push(0,0,1),m.push(b/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let E=0;E<o;E++){const b=E+c*d,S=E+c*(d+1),U=E+1+c*(d+1),C=E+1+c*d;p.push(b,S,C),p.push(S,U,C)}this.setIndex(p),this.setAttribute("position",new jn(_,3)),this.setAttribute("normal",new jn(v,3)),this.setAttribute("uv",new jn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dr(t.width,t.height,t.widthSegments,t.heightSegments)}}class ca extends fr{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fu,this.normalScale=new Yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=ko,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Lg extends fr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=V_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ug extends fr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ig extends Re{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new $t(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Ng extends $u{constructor(t=-1,e=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,a=i+t,o=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Fg extends Ig{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Og extends Be{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function cc(n,t,e,i){const r=Bg(i);switch(e){case Du:return n*t;case Uu:return n*t/r.components*r.byteLength;case Wo:return n*t/r.components*r.byteLength;case Iu:return n*t*2/r.components*r.byteLength;case Xo:return n*t*2/r.components*r.byteLength;case Lu:return n*t*3/r.components*r.byteLength;case qe:return n*t*4/r.components*r.byteLength;case $o:return n*t*4/r.components*r.byteLength;case jr:case Qr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ts:case es:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Za:case ja:return Math.max(n,16)*Math.max(t,8)/4;case Ka:case Ja:return Math.max(n,8)*Math.max(t,8)/2;case Qa:case to:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case eo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case no:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case io:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case ro:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case so:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case ao:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case oo:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case lo:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case co:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case uo:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case fo:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ho:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case po:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case mo:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case _o:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case ns:case go:case vo:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Nu:case xo:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Mo:case So:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Bg(n){switch(n){case Mn:case Ru:return{byteLength:1,components:1};case er:case Cu:case or:return{byteLength:2,components:1};case Vo:case Go:return{byteLength:2,components:4};case ei:case Ho:case mn:return{byteLength:4,components:1};case Pu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Zu(){let n=null,t=!1,e=null,i=null;function r(s,a){e(s,a),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function zg(n){const t=new WeakMap;function e(o,l){const c=o.array,f=o.usage,u=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,f),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const f=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,f);else{u.sort((p,_)=>p.start-_.start);let h=0;for(let p=1;p<u.length;p++){const _=u[h],v=u[p];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++h,u[h]=v)}u.length=h+1;for(let p=0,_=u.length;p<_;p++){const v=u[p];n.bufferSubData(c,v.start*f.BYTES_PER_ELEMENT,f,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=t.get(o);(!f||f.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var kg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Vg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$g=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,qg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Kg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Qg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,t0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,e0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,n0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,i0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,r0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,s0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,a0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,o0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,l0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,c0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,u0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,f0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,h0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,d0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,p0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,m0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_0="gl_FragColor = linearToOutputTexel( gl_FragColor );",g0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,v0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,x0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,M0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,S0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,y0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,E0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,T0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,b0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,w0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,A0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,R0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,C0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,P0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,D0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,L0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,U0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,I0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,N0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,F0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,O0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,B0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,z0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,k0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,H0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,V0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,G0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,W0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,X0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,q0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Y0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,K0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Z0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,J0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,j0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Q0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ev=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,nv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,iv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,rv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,av=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ov=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,cv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,uv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,mv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_v=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,yv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ev=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Tv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,bv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Av=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Pv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Lv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Uv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Iv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Nv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Fv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ov=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Bv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$v=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,qv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Yv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Kv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,tx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ex=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ix=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,rx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ax=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ox=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ux=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,px=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_x=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,gx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ft={alphahash_fragment:kg,alphahash_pars_fragment:Hg,alphamap_fragment:Vg,alphamap_pars_fragment:Gg,alphatest_fragment:Wg,alphatest_pars_fragment:Xg,aomap_fragment:$g,aomap_pars_fragment:qg,batching_pars_vertex:Yg,batching_vertex:Kg,begin_vertex:Zg,beginnormal_vertex:Jg,bsdfs:jg,iridescence_fragment:Qg,bumpmap_pars_fragment:t0,clipping_planes_fragment:e0,clipping_planes_pars_fragment:n0,clipping_planes_pars_vertex:i0,clipping_planes_vertex:r0,color_fragment:s0,color_pars_fragment:a0,color_pars_vertex:o0,color_vertex:l0,common:c0,cube_uv_reflection_fragment:u0,defaultnormal_vertex:f0,displacementmap_pars_vertex:h0,displacementmap_vertex:d0,emissivemap_fragment:p0,emissivemap_pars_fragment:m0,colorspace_fragment:_0,colorspace_pars_fragment:g0,envmap_fragment:v0,envmap_common_pars_fragment:x0,envmap_pars_fragment:M0,envmap_pars_vertex:S0,envmap_physical_pars_fragment:L0,envmap_vertex:y0,fog_vertex:E0,fog_pars_vertex:T0,fog_fragment:b0,fog_pars_fragment:w0,gradientmap_pars_fragment:A0,lightmap_pars_fragment:R0,lights_lambert_fragment:C0,lights_lambert_pars_fragment:P0,lights_pars_begin:D0,lights_toon_fragment:U0,lights_toon_pars_fragment:I0,lights_phong_fragment:N0,lights_phong_pars_fragment:F0,lights_physical_fragment:O0,lights_physical_pars_fragment:B0,lights_fragment_begin:z0,lights_fragment_maps:k0,lights_fragment_end:H0,logdepthbuf_fragment:V0,logdepthbuf_pars_fragment:G0,logdepthbuf_pars_vertex:W0,logdepthbuf_vertex:X0,map_fragment:$0,map_pars_fragment:q0,map_particle_fragment:Y0,map_particle_pars_fragment:K0,metalnessmap_fragment:Z0,metalnessmap_pars_fragment:J0,morphinstance_vertex:j0,morphcolor_vertex:Q0,morphnormal_vertex:tv,morphtarget_pars_vertex:ev,morphtarget_vertex:nv,normal_fragment_begin:iv,normal_fragment_maps:rv,normal_pars_fragment:sv,normal_pars_vertex:av,normal_vertex:ov,normalmap_pars_fragment:lv,clearcoat_normal_fragment_begin:cv,clearcoat_normal_fragment_maps:uv,clearcoat_pars_fragment:fv,iridescence_pars_fragment:hv,opaque_fragment:dv,packing:pv,premultiplied_alpha_fragment:mv,project_vertex:_v,dithering_fragment:gv,dithering_pars_fragment:vv,roughnessmap_fragment:xv,roughnessmap_pars_fragment:Mv,shadowmap_pars_fragment:Sv,shadowmap_pars_vertex:yv,shadowmap_vertex:Ev,shadowmask_pars_fragment:Tv,skinbase_vertex:bv,skinning_pars_vertex:wv,skinning_vertex:Av,skinnormal_vertex:Rv,specularmap_fragment:Cv,specularmap_pars_fragment:Pv,tonemapping_fragment:Dv,tonemapping_pars_fragment:Lv,transmission_fragment:Uv,transmission_pars_fragment:Iv,uv_pars_fragment:Nv,uv_pars_vertex:Fv,uv_vertex:Ov,worldpos_vertex:Bv,background_vert:zv,background_frag:kv,backgroundCube_vert:Hv,backgroundCube_frag:Vv,cube_vert:Gv,cube_frag:Wv,depth_vert:Xv,depth_frag:$v,distanceRGBA_vert:qv,distanceRGBA_frag:Yv,equirect_vert:Kv,equirect_frag:Zv,linedashed_vert:Jv,linedashed_frag:jv,meshbasic_vert:Qv,meshbasic_frag:tx,meshlambert_vert:ex,meshlambert_frag:nx,meshmatcap_vert:ix,meshmatcap_frag:rx,meshnormal_vert:sx,meshnormal_frag:ax,meshphong_vert:ox,meshphong_frag:lx,meshphysical_vert:cx,meshphysical_frag:ux,meshtoon_vert:fx,meshtoon_frag:hx,points_vert:dx,points_frag:px,shadow_vert:mx,shadow_frag:_x,sprite_vert:gx,sprite_frag:vx},lt={common:{diffuse:{value:new $t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new It}},envmap:{envMap:{value:null},envMapRotation:{value:new It},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new It}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new It}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new It},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new It},normalScale:{value:new Yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new It},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new It}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new It}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new It}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0},uvTransform:{value:new It}},sprite:{diffuse:{value:new $t(16777215)},opacity:{value:1},center:{value:new Yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}}},Ze={basic:{uniforms:Me([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:Me([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new $t(0)}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:Me([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new $t(0)},specular:{value:new $t(1118481)},shininess:{value:30}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:Me([lt.common,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.roughnessmap,lt.metalnessmap,lt.fog,lt.lights,{emissive:{value:new $t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:Me([lt.common,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.gradientmap,lt.fog,lt.lights,{emissive:{value:new $t(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:Me([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:Me([lt.points,lt.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:Me([lt.common,lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:Me([lt.common,lt.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:Me([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:Me([lt.sprite,lt.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new It},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new It}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distanceRGBA:{uniforms:Me([lt.common,lt.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distanceRGBA_vert,fragmentShader:Ft.distanceRGBA_frag},shadow:{uniforms:Me([lt.lights,lt.fog,{color:{value:new $t(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};Ze.physical={uniforms:Me([Ze.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new It},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new It},clearcoatNormalScale:{value:new Yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new It},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new It},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new It},sheen:{value:0},sheenColor:{value:new $t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new It},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new It},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new It},transmissionSamplerSize:{value:new Yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new It},attenuationDistance:{value:0},attenuationColor:{value:new $t(0)},specularColor:{value:new $t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new It},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new It},anisotropyVector:{value:new Yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new It}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};const kr={r:0,b:0,g:0},Hn=new en,xx=new fe;function Mx(n,t,e,i,r,s,a){const o=new $t(0);let l=s===!0?0:1,c,f,u=null,h=0,p=null;function _(b){let S=b.isScene===!0?b.background:null;return S&&S.isTexture&&(S=(b.backgroundBlurriness>0?e:t).get(S)),S}function v(b){let S=!1;const U=_(b);U===null?d(o,l):U&&U.isColor&&(d(U,1),S=!0);const C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(b,S){const U=_(S);U&&(U.isCubeTexture||U.mapping===Cs)?(f===void 0&&(f=new Se(new hr(1,1,1),new Un({name:"BackgroundCubeMaterial",uniforms:Ni(Ze.backgroundCube.uniforms),vertexShader:Ze.backgroundCube.vertexShader,fragmentShader:Ze.backgroundCube.fragmentShader,side:we,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(C,A,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),Hn.copy(S.backgroundRotation),Hn.x*=-1,Hn.y*=-1,Hn.z*=-1,U.isCubeTexture&&U.isRenderTargetTexture===!1&&(Hn.y*=-1,Hn.z*=-1),f.material.uniforms.envMap.value=U,f.material.uniforms.flipEnvMap.value=U.isCubeTexture&&U.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(xx.makeRotationFromEuler(Hn)),f.material.toneMapped=Gt.getTransfer(U.colorSpace)!==Zt,(u!==U||h!==U.version||p!==n.toneMapping)&&(f.material.needsUpdate=!0,u=U,h=U.version,p=n.toneMapping),f.layers.enableAll(),b.unshift(f,f.geometry,f.material,0,0,null)):U&&U.isTexture&&(c===void 0&&(c=new Se(new dr(2,2),new Un({name:"BackgroundMaterial",uniforms:Ni(Ze.background.uniforms),vertexShader:Ze.background.vertexShader,fragmentShader:Ze.background.fragmentShader,side:Ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=U,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=Gt.getTransfer(U.colorSpace)!==Zt,U.matrixAutoUpdate===!0&&U.updateMatrix(),c.material.uniforms.uvTransform.value.copy(U.matrix),(u!==U||h!==U.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=U,h=U.version,p=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function d(b,S){b.getRGB(kr,Xu(n)),i.buffers.color.setClear(kr.r,kr.g,kr.b,S,a)}function E(){f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,S=1){o.set(b),l=S,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,d(o,l)},render:v,addToRenderList:m,dispose:E}}function Sx(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(M,L,H,X,w){let B=!1;const P=u(X,H,L);s!==P&&(s=P,c(s.object)),B=p(M,X,H,w),B&&_(M,X,H,w),w!==null&&t.update(w,n.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,S(M,L,H,X),w!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(w).buffer))}function l(){return n.createVertexArray()}function c(M){return n.bindVertexArray(M)}function f(M){return n.deleteVertexArray(M)}function u(M,L,H){const X=H.wireframe===!0;let w=i[M.id];w===void 0&&(w={},i[M.id]=w);let B=w[L.id];B===void 0&&(B={},w[L.id]=B);let P=B[X];return P===void 0&&(P=h(l()),B[X]=P),P}function h(M){const L=[],H=[],X=[];for(let w=0;w<e;w++)L[w]=0,H[w]=0,X[w]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:H,attributeDivisors:X,object:M,attributes:{},index:null}}function p(M,L,H,X){const w=s.attributes,B=L.attributes;let P=0;const z=H.getAttributes();for(const F in z)if(z[F].location>=0){const Z=w[F];let at=B[F];if(at===void 0&&(F==="instanceMatrix"&&M.instanceMatrix&&(at=M.instanceMatrix),F==="instanceColor"&&M.instanceColor&&(at=M.instanceColor)),Z===void 0||Z.attribute!==at||at&&Z.data!==at.data)return!0;P++}return s.attributesNum!==P||s.index!==X}function _(M,L,H,X){const w={},B=L.attributes;let P=0;const z=H.getAttributes();for(const F in z)if(z[F].location>=0){let Z=B[F];Z===void 0&&(F==="instanceMatrix"&&M.instanceMatrix&&(Z=M.instanceMatrix),F==="instanceColor"&&M.instanceColor&&(Z=M.instanceColor));const at={};at.attribute=Z,Z&&Z.data&&(at.data=Z.data),w[F]=at,P++}s.attributes=w,s.attributesNum=P,s.index=X}function v(){const M=s.newAttributes;for(let L=0,H=M.length;L<H;L++)M[L]=0}function m(M){d(M,0)}function d(M,L){const H=s.newAttributes,X=s.enabledAttributes,w=s.attributeDivisors;H[M]=1,X[M]===0&&(n.enableVertexAttribArray(M),X[M]=1),w[M]!==L&&(n.vertexAttribDivisor(M,L),w[M]=L)}function E(){const M=s.newAttributes,L=s.enabledAttributes;for(let H=0,X=L.length;H<X;H++)L[H]!==M[H]&&(n.disableVertexAttribArray(H),L[H]=0)}function b(M,L,H,X,w,B,P){P===!0?n.vertexAttribIPointer(M,L,H,w,B):n.vertexAttribPointer(M,L,H,X,w,B)}function S(M,L,H,X){v();const w=X.attributes,B=H.getAttributes(),P=L.defaultAttributeValues;for(const z in B){const F=B[z];if(F.location>=0){let Y=w[z];if(Y===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(Y=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(Y=M.instanceColor)),Y!==void 0){const Z=Y.normalized,at=Y.itemSize,xt=t.get(Y);if(xt===void 0)continue;const Ot=xt.buffer,$=xt.type,nt=xt.bytesPerElement,ht=$===n.INT||$===n.UNSIGNED_INT||Y.gpuType===Ho;if(Y.isInterleavedBufferAttribute){const st=Y.data,mt=st.stride,zt=Y.offset;if(st.isInstancedInterleavedBuffer){for(let Ct=0;Ct<F.locationSize;Ct++)d(F.location+Ct,st.meshPerAttribute);M.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let Ct=0;Ct<F.locationSize;Ct++)m(F.location+Ct);n.bindBuffer(n.ARRAY_BUFFER,Ot);for(let Ct=0;Ct<F.locationSize;Ct++)b(F.location+Ct,at/F.locationSize,$,Z,mt*nt,(zt+at/F.locationSize*Ct)*nt,ht)}else{if(Y.isInstancedBufferAttribute){for(let st=0;st<F.locationSize;st++)d(F.location+st,Y.meshPerAttribute);M.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let st=0;st<F.locationSize;st++)m(F.location+st);n.bindBuffer(n.ARRAY_BUFFER,Ot);for(let st=0;st<F.locationSize;st++)b(F.location+st,at/F.locationSize,$,Z,at*nt,at/F.locationSize*st*nt,ht)}}else if(P!==void 0){const Z=P[z];if(Z!==void 0)switch(Z.length){case 2:n.vertexAttrib2fv(F.location,Z);break;case 3:n.vertexAttrib3fv(F.location,Z);break;case 4:n.vertexAttrib4fv(F.location,Z);break;default:n.vertexAttrib1fv(F.location,Z)}}}}E()}function U(){O();for(const M in i){const L=i[M];for(const H in L){const X=L[H];for(const w in X)f(X[w].object),delete X[w];delete L[H]}delete i[M]}}function C(M){if(i[M.id]===void 0)return;const L=i[M.id];for(const H in L){const X=L[H];for(const w in X)f(X[w].object),delete X[w];delete L[H]}delete i[M.id]}function A(M){for(const L in i){const H=i[L];if(H[M.id]===void 0)continue;const X=H[M.id];for(const w in X)f(X[w].object),delete X[w];delete H[M.id]}}function O(){y(),a=!0,s!==r&&(s=r,c(s.object))}function y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:O,resetDefaultState:y,dispose:U,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:m,disableUnusedAttributes:E}}function yx(n,t,e){let i;function r(c){i=c}function s(c,f){n.drawArrays(i,c,f),e.update(f,i,1)}function a(c,f,u){u!==0&&(n.drawArraysInstanced(i,c,f,u),e.update(f,i,u))}function o(c,f,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,f,0,u);let p=0;for(let _=0;_<u;_++)p+=f[_];e.update(p,i,1)}function l(c,f,u,h){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<c.length;_++)a(c[_],f[_],h[_]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,f,0,h,0,u);let _=0;for(let v=0;v<u;v++)_+=f[v]*h[v];e.update(_,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Ex(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==qe&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const O=A===or&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Mn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==mn&&!O)}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const f=l(c);f!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const u=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),U=_>0,C=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:E,maxVaryings:b,maxFragmentUniforms:S,vertexTextures:U,maxSamples:C}}function Tx(n){const t=this;let e=null,i=0,r=!1,s=!1;const a=new Wn,o=new It,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const p=u.length!==0||h||i!==0||r;return r=h,i=u.length,p},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,h){e=f(u,h,0)},this.setState=function(u,h,p){const _=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,d=n.get(u);if(!r||_===null||_.length===0||s&&!m)s?f(null):c();else{const E=s?0:i,b=E*4;let S=d.clippingState||null;l.value=S,S=f(_,h,b,p);for(let U=0;U!==b;++U)S[U]=e[U];d.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function f(u,h,p,_){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,_!==!0||m===null){const d=p+v*4,E=h.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<d)&&(m=new Float32Array(d));for(let b=0,S=p;b!==v;++b,S+=4)a.copy(u[b]).applyMatrix4(E,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function bx(n){let t=new WeakMap;function e(a,o){return o===Xa?a.mapping=Li:o===$a&&(a.mapping=Ui),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Xa||o===$a)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new wg(l.height);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",r),e(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const Si=4,uc=[.125,.215,.35,.446,.526,.582],qn=20,ua=new Ng,fc=new $t;let fa=null,ha=0,da=0,pa=!1;const Xn=(1+Math.sqrt(5))/2,xi=1/Xn,hc=[new W(-Xn,xi,0),new W(Xn,xi,0),new W(-xi,0,Xn),new W(xi,0,Xn),new W(0,Xn,-xi),new W(0,Xn,xi),new W(-1,1,-1),new W(1,1,-1),new W(-1,1,1),new W(1,1,1)],wx=new W;class dc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100,s={}){const{size:a=256,position:o=wx}=s;fa=this._renderer.getRenderTarget(),ha=this._renderer.getActiveCubeFace(),da=this._renderer.getActiveMipmapLevel(),pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,r,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_c(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(fa,ha,da),this._renderer.xr.enabled=pa,t.scissorTest=!1,Hr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Li||t.mapping===Ui?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),fa=this._renderer.getRenderTarget(),ha=this._renderer.getActiveCubeFace(),da=this._renderer.getActiveMipmapLevel(),pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:je,minFilter:je,generateMipmaps:!1,type:or,format:qe,colorSpace:Ii,depthBuffer:!1},r=pc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pc(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ax(s)),this._blurMaterial=Rx(s,t,e)}return r}_compileMaterial(t){const e=new Se(this._lodPlanes[0],t);this._renderer.compile(e,ua)}_sceneToCubeUV(t,e,i,r,s){const l=new Be(90,1,e,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,p=u.toneMapping;u.getClearColor(fc),u.toneMapping=Dn,u.autoClear=!1;const _=new Vu({name:"PMREM.Background",side:we,depthWrite:!1,depthTest:!1}),v=new Se(new hr,_);let m=!1;const d=t.background;d?d.isColor&&(_.color.copy(d),t.background=null,m=!0):(_.color.copy(fc),m=!0);for(let E=0;E<6;E++){const b=E%3;b===0?(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[E],s.y,s.z)):b===1?(l.up.set(0,0,c[E]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[E],s.z)):(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[E]));const S=this._cubeSize;Hr(r,b*S,E>2?S:0,S,S),u.setRenderTarget(r),m&&u.render(v,l),u.render(t,l)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=p,u.autoClear=h,t.background=d}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===Li||t.mapping===Ui;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=_c()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=mc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Se(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;Hr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,ua)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=hc[(r-s-1)%hc.length];this._blur(t,s-1,s,a,o)}e.autoClear=i}_blur(t,e,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,r,"latitudinal",s),this._halfBlur(a,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,u=new Se(this._lodPlanes[r],c),h=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*qn-1),v=s/_,m=isFinite(s)?1+Math.floor(f*v):qn;m>qn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${qn}`);const d=[];let E=0;for(let A=0;A<qn;++A){const O=A/v,y=Math.exp(-O*O/2);d.push(y),A===0?E+=y:A<m&&(E+=2*y)}for(let A=0;A<d.length;A++)d[A]=d[A]/E;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=d,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:b}=this;h.dTheta.value=_,h.mipInt.value=b-i;const S=this._sizeLods[r],U=3*S*(r>b-Si?r-b+Si:0),C=4*(this._cubeSize-S);Hr(e,U,C,3*S,2*S),l.setRenderTarget(e),l.render(u,ua)}}function Ax(n){const t=[],e=[],i=[];let r=n;const s=n-Si+1+uc.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-Si?l=uc[a-n+Si-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),f=-c,u=1+c,h=[f,f,u,f,u,u,f,f,u,u,f,u],p=6,_=6,v=3,m=2,d=1,E=new Float32Array(v*_*p),b=new Float32Array(m*_*p),S=new Float32Array(d*_*p);for(let C=0;C<p;C++){const A=C%3*2/3-1,O=C>2?0:-1,y=[A,O,0,A+2/3,O,0,A+2/3,O+1,0,A,O,0,A+2/3,O+1,0,A,O+1,0];E.set(y,v*_*C),b.set(h,m*_*C);const M=[C,C,C,C,C,C];S.set(M,d*_*C)}const U=new ii;U.setAttribute("position",new tn(E,v)),U.setAttribute("uv",new tn(b,m)),U.setAttribute("faceIndex",new tn(S,d)),t.push(U),r>Si&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function pc(n,t,e){const i=new ni(n,t,e);return i.texture.mapping=Cs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Hr(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function Rx(n,t,e){const i=new Float32Array(qn),r=new W(0,1,0);return new Un({name:"SphericalGaussianBlur",defines:{n:qn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function mc(){return new Un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function _c(){return new Un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function Ko(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Cx(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Xa||l===$a,f=l===Li||l===Ui;if(c||f){let u=t.get(o);const h=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return e===null&&(e=new dc(n)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return c&&p&&p.height>0||f&&p&&r(p)?(e===null&&(e=new dc(n)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function r(o){let l=0;const c=6;for(let f=0;f<c;f++)o[f]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function Px(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&Ti("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Dx(n,t,e,i){const r={},s=new WeakMap;function a(u){const h=u.target;h.index!==null&&t.remove(h.index);for(const _ in h.attributes)t.remove(h.attributes[_]);h.removeEventListener("dispose",a),delete r[h.id];const p=s.get(h);p&&(t.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(u,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,e.memory.geometries++),h}function l(u){const h=u.attributes;for(const p in h)t.update(h[p],n.ARRAY_BUFFER)}function c(u){const h=[],p=u.index,_=u.attributes.position;let v=0;if(p!==null){const E=p.array;v=p.version;for(let b=0,S=E.length;b<S;b+=3){const U=E[b+0],C=E[b+1],A=E[b+2];h.push(U,C,C,A,A,U)}}else if(_!==void 0){const E=_.array;v=_.version;for(let b=0,S=E.length/3-1;b<S;b+=3){const U=b+0,C=b+1,A=b+2;h.push(U,C,C,A,A,U)}}else return;const m=new(Bu(h)?Wu:Gu)(h,1);m.version=v;const d=s.get(u);d&&t.remove(d),s.set(u,m)}function f(u){const h=s.get(u);if(h){const p=u.index;p!==null&&h.version<p.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:f}}function Lx(n,t,e){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,p){n.drawElements(i,p,s,h*a),e.update(p,i,1)}function c(h,p,_){_!==0&&(n.drawElementsInstanced(i,p,s,h*a,_),e.update(p,i,_))}function f(h,p,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,h,0,_);let m=0;for(let d=0;d<_;d++)m+=p[d];e.update(m,i,1)}function u(h,p,_,v){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<h.length;d++)c(h[d]/a,p[d],v[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,h,0,v,0,_);let d=0;for(let E=0;E<_;E++)d+=p[E]*v[E];e.update(d,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=f,this.renderMultiDrawInstances=u}function Ux(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(s/3);break;case n.LINES:e.lines+=o*(s/2);break;case n.LINE_STRIP:e.lines+=o*(s-1);break;case n.LINE_LOOP:e.lines+=o*s;break;case n.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function Ix(n,t,e){const i=new WeakMap,r=new le;function s(a,o,l){const c=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=f!==void 0?f.length:0;let h=i.get(o);if(h===void 0||h.count!==u){let M=function(){O.dispose(),i.delete(o),o.removeEventListener("dispose",M)};var p=M;h!==void 0&&h.texture.dispose();const _=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let S=0;_===!0&&(S=1),v===!0&&(S=2),m===!0&&(S=3);let U=o.attributes.position.count*S,C=1;U>t.maxTextureSize&&(C=Math.ceil(U/t.maxTextureSize),U=t.maxTextureSize);const A=new Float32Array(U*C*4*u),O=new zu(A,U,C,u);O.type=mn,O.needsUpdate=!0;const y=S*4;for(let L=0;L<u;L++){const H=d[L],X=E[L],w=b[L],B=U*C*4*L;for(let P=0;P<H.count;P++){const z=P*y;_===!0&&(r.fromBufferAttribute(H,P),A[B+z+0]=r.x,A[B+z+1]=r.y,A[B+z+2]=r.z,A[B+z+3]=0),v===!0&&(r.fromBufferAttribute(X,P),A[B+z+4]=r.x,A[B+z+5]=r.y,A[B+z+6]=r.z,A[B+z+7]=0),m===!0&&(r.fromBufferAttribute(w,P),A[B+z+8]=r.x,A[B+z+9]=r.y,A[B+z+10]=r.z,A[B+z+11]=w.itemSize===4?r.w:1)}}h={count:u,texture:O,size:new Yt(U,C)},i.set(o,h),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const v=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function Nx(n,t,e,i){let r=new WeakMap;function s(l){const c=i.render.frame,f=l.geometry,u=t.get(l,f);if(r.get(u)!==c&&(t.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return u}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}const Ju=new Ae,gc=new Ku(1,1),ju=new zu,Qu=new lg,tf=new qu,vc=[],xc=[],Mc=new Float32Array(16),Sc=new Float32Array(9),yc=new Float32Array(4);function Oi(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=vc[r];if(s===void 0&&(s=new Float32Array(r),vc[r]=s),t!==0){i.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(s,o)}return s}function de(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function pe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ps(n,t){let e=xc[t];e===void 0&&(e=new Int32Array(t),xc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Fx(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Ox(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(de(e,t))return;n.uniform2fv(this.addr,t),pe(e,t)}}function Bx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(de(e,t))return;n.uniform3fv(this.addr,t),pe(e,t)}}function zx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(de(e,t))return;n.uniform4fv(this.addr,t),pe(e,t)}}function kx(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(de(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),pe(e,t)}else{if(de(e,i))return;yc.set(i),n.uniformMatrix2fv(this.addr,!1,yc),pe(e,i)}}function Hx(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(de(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),pe(e,t)}else{if(de(e,i))return;Sc.set(i),n.uniformMatrix3fv(this.addr,!1,Sc),pe(e,i)}}function Vx(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(de(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),pe(e,t)}else{if(de(e,i))return;Mc.set(i),n.uniformMatrix4fv(this.addr,!1,Mc),pe(e,i)}}function Gx(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Wx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(de(e,t))return;n.uniform2iv(this.addr,t),pe(e,t)}}function Xx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(de(e,t))return;n.uniform3iv(this.addr,t),pe(e,t)}}function $x(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(de(e,t))return;n.uniform4iv(this.addr,t),pe(e,t)}}function qx(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Yx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(de(e,t))return;n.uniform2uiv(this.addr,t),pe(e,t)}}function Kx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(de(e,t))return;n.uniform3uiv(this.addr,t),pe(e,t)}}function Zx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(de(e,t))return;n.uniform4uiv(this.addr,t),pe(e,t)}}function Jx(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(gc.compareFunction=Ou,s=gc):s=Ju,e.setTexture2D(t||s,r)}function jx(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Qu,r)}function Qx(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||tf,r)}function tM(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||ju,r)}function eM(n){switch(n){case 5126:return Fx;case 35664:return Ox;case 35665:return Bx;case 35666:return zx;case 35674:return kx;case 35675:return Hx;case 35676:return Vx;case 5124:case 35670:return Gx;case 35667:case 35671:return Wx;case 35668:case 35672:return Xx;case 35669:case 35673:return $x;case 5125:return qx;case 36294:return Yx;case 36295:return Kx;case 36296:return Zx;case 35678:case 36198:case 36298:case 36306:case 35682:return Jx;case 35679:case 36299:case 36307:return jx;case 35680:case 36300:case 36308:case 36293:return Qx;case 36289:case 36303:case 36311:case 36292:return tM}}function nM(n,t){n.uniform1fv(this.addr,t)}function iM(n,t){const e=Oi(t,this.size,2);n.uniform2fv(this.addr,e)}function rM(n,t){const e=Oi(t,this.size,3);n.uniform3fv(this.addr,e)}function sM(n,t){const e=Oi(t,this.size,4);n.uniform4fv(this.addr,e)}function aM(n,t){const e=Oi(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function oM(n,t){const e=Oi(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function lM(n,t){const e=Oi(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function cM(n,t){n.uniform1iv(this.addr,t)}function uM(n,t){n.uniform2iv(this.addr,t)}function fM(n,t){n.uniform3iv(this.addr,t)}function hM(n,t){n.uniform4iv(this.addr,t)}function dM(n,t){n.uniform1uiv(this.addr,t)}function pM(n,t){n.uniform2uiv(this.addr,t)}function mM(n,t){n.uniform3uiv(this.addr,t)}function _M(n,t){n.uniform4uiv(this.addr,t)}function gM(n,t,e){const i=this.cache,r=t.length,s=Ps(e,r);de(i,s)||(n.uniform1iv(this.addr,s),pe(i,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||Ju,s[a])}function vM(n,t,e){const i=this.cache,r=t.length,s=Ps(e,r);de(i,s)||(n.uniform1iv(this.addr,s),pe(i,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||Qu,s[a])}function xM(n,t,e){const i=this.cache,r=t.length,s=Ps(e,r);de(i,s)||(n.uniform1iv(this.addr,s),pe(i,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||tf,s[a])}function MM(n,t,e){const i=this.cache,r=t.length,s=Ps(e,r);de(i,s)||(n.uniform1iv(this.addr,s),pe(i,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||ju,s[a])}function SM(n){switch(n){case 5126:return nM;case 35664:return iM;case 35665:return rM;case 35666:return sM;case 35674:return aM;case 35675:return oM;case 35676:return lM;case 5124:case 35670:return cM;case 35667:case 35671:return uM;case 35668:case 35672:return fM;case 35669:case 35673:return hM;case 5125:return dM;case 36294:return pM;case 36295:return mM;case 36296:return _M;case 35678:case 36198:case 36298:case 36306:case 35682:return gM;case 35679:case 36299:case 36307:return vM;case 35680:case 36300:case 36308:case 36293:return xM;case 36289:case 36303:case 36311:case 36292:return MM}}class yM{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=eM(e.type)}}class EM{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=SM(e.type)}}class TM{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,e[o.id],i)}}}const ma=/(\w+)(\])?(\[|\.)?/g;function Ec(n,t){n.seq.push(t),n.map[t.id]=t}function bM(n,t,e){const i=n.name,r=i.length;for(ma.lastIndex=0;;){const s=ma.exec(i),a=ma.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Ec(e,c===void 0?new yM(o,n,t):new EM(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new TM(o),Ec(e,u)),e=u}}}class is{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);bM(s,a,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in e&&i.push(a)}return i}}function Tc(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const wM=37297;let AM=0;function RM(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const bc=new It;function CM(n){Gt._getMatrix(bc,Gt.workingColorSpace,n);const t=`mat3( ${bc.elements.map(e=>e.toFixed(4))} )`;switch(Gt.getTransfer(n)){case xs:return[t,"LinearTransferOETF"];case Zt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function wc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+RM(n.getShaderSource(t),a)}else return r}function PM(n,t){const e=CM(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function DM(n,t){let e;switch(t){case I_:e="Linear";break;case N_:e="Reinhard";break;case F_:e="Cineon";break;case O_:e="ACESFilmic";break;case z_:e="AgX";break;case k_:e="Neutral";break;case B_:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Vr=new W;function LM(){Gt.getLuminanceCoefficients(Vr);const n=Vr.x.toFixed(4),t=Vr.y.toFixed(4),e=Vr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function UM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ki).join(`
`)}function IM(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function NM(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Ki(n){return n!==""}function Ac(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Rc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const FM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Eo(n){return n.replace(FM,BM)}const OM=new Map;function BM(n,t){let e=Ft[t];if(e===void 0){const i=OM.get(t);if(i!==void 0)e=Ft[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Eo(e)}const zM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cc(n){return n.replace(zM,kM)}function kM(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Pc(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function HM(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===wu?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===d_?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===fn&&(t="SHADOWMAP_TYPE_VSM"),t}function VM(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Li:case Ui:t="ENVMAP_TYPE_CUBE";break;case Cs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function GM(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ui:t="ENVMAP_MODE_REFRACTION";break}return t}function WM(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ko:t="ENVMAP_BLENDING_MULTIPLY";break;case L_:t="ENVMAP_BLENDING_MIX";break;case U_:t="ENVMAP_BLENDING_ADD";break}return t}function XM(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function $M(n,t,e,i){const r=n.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=HM(e),c=VM(e),f=GM(e),u=WM(e),h=XM(e),p=UM(e),_=IM(s),v=r.createProgram();let m,d,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Ki).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Ki).join(`
`),d.length>0&&(d+=`
`)):(m=[Pc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+f:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ki).join(`
`),d=[Pc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+f:"",e.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Dn?"#define TONE_MAPPING":"",e.toneMapping!==Dn?Ft.tonemapping_pars_fragment:"",e.toneMapping!==Dn?DM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,PM("linearToOutputTexel",e.outputColorSpace),LM(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ki).join(`
`)),a=Eo(a),a=Ac(a,e),a=Rc(a,e),o=Eo(o),o=Ac(o,e),o=Rc(o,e),a=Cc(a),o=Cc(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===Xl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Xl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const b=E+m+a,S=E+d+o,U=Tc(r,r.VERTEX_SHADER,b),C=Tc(r,r.FRAGMENT_SHADER,S);r.attachShader(v,U),r.attachShader(v,C),e.index0AttributeName!==void 0?r.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function A(L){if(n.debug.checkShaderErrors){const H=r.getProgramInfoLog(v).trim(),X=r.getShaderInfoLog(U).trim(),w=r.getShaderInfoLog(C).trim();let B=!0,P=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(B=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,U,C);else{const z=wc(r,U,"vertex"),F=wc(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+H+`
`+z+`
`+F)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(X===""||w==="")&&(P=!1);P&&(L.diagnostics={runnable:B,programLog:H,vertexShader:{log:X,prefix:m},fragmentShader:{log:w,prefix:d}})}r.deleteShader(U),r.deleteShader(C),O=new is(r,v),y=NM(r,v)}let O;this.getUniforms=function(){return O===void 0&&A(this),O};let y;this.getAttributes=function(){return y===void 0&&A(this),y};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(v,wM)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=AM++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=U,this.fragmentShader=C,this}let qM=0;class YM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new KM(t),e.set(t,i)),i}}class KM{constructor(t){this.id=qM++,this.code=t,this.usedTimes=0}}function ZM(n,t,e,i,r,s,a){const o=new ku,l=new YM,c=new Set,f=[],u=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,M,L,H,X){const w=H.fog,B=X.geometry,P=y.isMeshStandardMaterial?H.environment:null,z=(y.isMeshStandardMaterial?e:t).get(y.envMap||P),F=z&&z.mapping===Cs?z.image.height:null,Y=_[y.type];y.precision!==null&&(p=r.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const Z=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,at=Z!==void 0?Z.length:0;let xt=0;B.morphAttributes.position!==void 0&&(xt=1),B.morphAttributes.normal!==void 0&&(xt=2),B.morphAttributes.color!==void 0&&(xt=3);let Ot,$,nt,ht;if(Y){const qt=Ze[Y];Ot=qt.vertexShader,$=qt.fragmentShader}else Ot=y.vertexShader,$=y.fragmentShader,l.update(y),nt=l.getVertexShaderID(y),ht=l.getFragmentShaderID(y);const st=n.getRenderTarget(),mt=n.state.buffers.depth.getReversed(),zt=X.isInstancedMesh===!0,Ct=X.isBatchedMesh===!0,ie=!!y.map,re=!!y.matcap,Wt=!!z,R=!!y.aoMap,ve=!!y.lightMap,Xt=!!y.bumpMap,Qt=!!y.normalMap,St=!!y.displacementMap,Ht=!!y.emissiveMap,bt=!!y.metalnessMap,Nt=!!y.roughnessMap,he=y.anisotropy>0,T=y.clearcoat>0,g=y.dispersion>0,k=y.iridescence>0,K=y.sheen>0,Q=y.transmission>0,q=he&&!!y.anisotropyMap,yt=T&&!!y.clearcoatMap,ct=T&&!!y.clearcoatNormalMap,Mt=T&&!!y.clearcoatRoughnessMap,Et=k&&!!y.iridescenceMap,tt=k&&!!y.iridescenceThicknessMap,dt=K&&!!y.sheenColorMap,Rt=K&&!!y.sheenRoughnessMap,At=!!y.specularMap,ot=!!y.specularColorMap,Lt=!!y.specularIntensityMap,D=Q&&!!y.transmissionMap,ut=Q&&!!y.thicknessMap,et=!!y.gradientMap,_t=!!y.alphaMap,it=y.alphaTest>0,J=!!y.alphaHash,gt=!!y.extensions;let Ut=Dn;y.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(Ut=n.toneMapping);const te={shaderID:Y,shaderType:y.type,shaderName:y.name,vertexShader:Ot,fragmentShader:$,defines:y.defines,customVertexShaderID:nt,customFragmentShaderID:ht,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Ct,batchingColor:Ct&&X._colorsTexture!==null,instancing:zt,instancingColor:zt&&X.instanceColor!==null,instancingMorph:zt&&X.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:st===null?n.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:Ii,alphaToCoverage:!!y.alphaToCoverage,map:ie,matcap:re,envMap:Wt,envMapMode:Wt&&z.mapping,envMapCubeUVHeight:F,aoMap:R,lightMap:ve,bumpMap:Xt,normalMap:Qt,displacementMap:h&&St,emissiveMap:Ht,normalMapObjectSpace:Qt&&y.normalMapType===W_,normalMapTangentSpace:Qt&&y.normalMapType===Fu,metalnessMap:bt,roughnessMap:Nt,anisotropy:he,anisotropyMap:q,clearcoat:T,clearcoatMap:yt,clearcoatNormalMap:ct,clearcoatRoughnessMap:Mt,dispersion:g,iridescence:k,iridescenceMap:Et,iridescenceThicknessMap:tt,sheen:K,sheenColorMap:dt,sheenRoughnessMap:Rt,specularMap:At,specularColorMap:ot,specularIntensityMap:Lt,transmission:Q,transmissionMap:D,thicknessMap:ut,gradientMap:et,opaque:y.transparent===!1&&y.blending===Ei&&y.alphaToCoverage===!1,alphaMap:_t,alphaTest:it,alphaHash:J,combine:y.combine,mapUv:ie&&v(y.map.channel),aoMapUv:R&&v(y.aoMap.channel),lightMapUv:ve&&v(y.lightMap.channel),bumpMapUv:Xt&&v(y.bumpMap.channel),normalMapUv:Qt&&v(y.normalMap.channel),displacementMapUv:St&&v(y.displacementMap.channel),emissiveMapUv:Ht&&v(y.emissiveMap.channel),metalnessMapUv:bt&&v(y.metalnessMap.channel),roughnessMapUv:Nt&&v(y.roughnessMap.channel),anisotropyMapUv:q&&v(y.anisotropyMap.channel),clearcoatMapUv:yt&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:ct&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Mt&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Et&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&v(y.sheenRoughnessMap.channel),specularMapUv:At&&v(y.specularMap.channel),specularColorMapUv:ot&&v(y.specularColorMap.channel),specularIntensityMapUv:Lt&&v(y.specularIntensityMap.channel),transmissionMapUv:D&&v(y.transmissionMap.channel),thicknessMapUv:ut&&v(y.thicknessMap.channel),alphaMapUv:_t&&v(y.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Qt||he),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!B.attributes.uv&&(ie||_t),fog:!!w,useFog:y.fog===!0,fogExp2:!!w&&w.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:mt,skinning:X.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:at,morphTextureStride:xt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ut,decodeVideoTexture:ie&&y.map.isVideoTexture===!0&&Gt.getTransfer(y.map.colorSpace)===Zt,decodeVideoTextureEmissive:Ht&&y.emissiveMap.isVideoTexture===!0&&Gt.getTransfer(y.emissiveMap.colorSpace)===Zt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===hn,flipSided:y.side===we,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:gt&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&y.extensions.multiDraw===!0||Ct)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return te.vertexUv1s=c.has(1),te.vertexUv2s=c.has(2),te.vertexUv3s=c.has(3),c.clear(),te}function d(y){const M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(const L in y.defines)M.push(L),M.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(E(M,y),b(M,y),M.push(n.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function E(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function b(y,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),y.push(o.mask)}function S(y){const M=_[y.type];let L;if(M){const H=Ze[M];L=yg.clone(H.uniforms)}else L=y.uniforms;return L}function U(y,M){let L;for(let H=0,X=f.length;H<X;H++){const w=f[H];if(w.cacheKey===M){L=w,++L.usedTimes;break}}return L===void 0&&(L=new $M(n,M,y,s),f.push(L)),L}function C(y){if(--y.usedTimes===0){const M=f.indexOf(y);f[M]=f[f.length-1],f.pop(),y.destroy()}}function A(y){l.remove(y)}function O(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:S,acquireProgram:U,releaseProgram:C,releaseShaderCache:A,programs:f,dispose:O}}function JM(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function jM(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Dc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Lc(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function a(u,h,p,_,v,m){let d=n[t];return d===void 0?(d={id:u.id,object:u,geometry:h,material:p,groupOrder:_,renderOrder:u.renderOrder,z:v,group:m},n[t]=d):(d.id=u.id,d.object=u,d.geometry=h,d.material=p,d.groupOrder=_,d.renderOrder=u.renderOrder,d.z=v,d.group=m),t++,d}function o(u,h,p,_,v,m){const d=a(u,h,p,_,v,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):e.push(d)}function l(u,h,p,_,v,m){const d=a(u,h,p,_,v,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):e.unshift(d)}function c(u,h){e.length>1&&e.sort(u||jM),i.length>1&&i.sort(h||Dc),r.length>1&&r.sort(h||Dc)}function f(){for(let u=t,h=n.length;u<h;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:f,sort:c}}function QM(){let n=new WeakMap;function t(i,r){const s=n.get(i);let a;return s===void 0?(a=new Lc,n.set(i,[a])):r>=s.length?(a=new Lc,s.push(a)):a=s[r],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function tS(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new W,color:new $t};break;case"SpotLight":e={position:new W,direction:new W,color:new $t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new W,color:new $t,distance:0,decay:0};break;case"HemisphereLight":e={direction:new W,skyColor:new $t,groundColor:new $t};break;case"RectAreaLight":e={color:new $t,position:new W,halfWidth:new W,halfHeight:new W};break}return n[t.id]=e,e}}}function eS(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let nS=0;function iS(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function rS(n){const t=new tS,e=eS(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new W);const r=new W,s=new fe,a=new fe;function o(c){let f=0,u=0,h=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let p=0,_=0,v=0,m=0,d=0,E=0,b=0,S=0,U=0,C=0,A=0;c.sort(iS);for(let y=0,M=c.length;y<M;y++){const L=c[y],H=L.color,X=L.intensity,w=L.distance,B=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=H.r*X,u+=H.g*X,h+=H.b*X;else if(L.isLightProbe){for(let P=0;P<9;P++)i.probe[P].addScaledVector(L.sh.coefficients[P],X);A++}else if(L.isDirectionalLight){const P=t.get(L);if(P.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const z=L.shadow,F=e.get(L);F.shadowIntensity=z.intensity,F.shadowBias=z.bias,F.shadowNormalBias=z.normalBias,F.shadowRadius=z.radius,F.shadowMapSize=z.mapSize,i.directionalShadow[p]=F,i.directionalShadowMap[p]=B,i.directionalShadowMatrix[p]=L.shadow.matrix,E++}i.directional[p]=P,p++}else if(L.isSpotLight){const P=t.get(L);P.position.setFromMatrixPosition(L.matrixWorld),P.color.copy(H).multiplyScalar(X),P.distance=w,P.coneCos=Math.cos(L.angle),P.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),P.decay=L.decay,i.spot[v]=P;const z=L.shadow;if(L.map&&(i.spotLightMap[U]=L.map,U++,z.updateMatrices(L),L.castShadow&&C++),i.spotLightMatrix[v]=z.matrix,L.castShadow){const F=e.get(L);F.shadowIntensity=z.intensity,F.shadowBias=z.bias,F.shadowNormalBias=z.normalBias,F.shadowRadius=z.radius,F.shadowMapSize=z.mapSize,i.spotShadow[v]=F,i.spotShadowMap[v]=B,S++}v++}else if(L.isRectAreaLight){const P=t.get(L);P.color.copy(H).multiplyScalar(X),P.halfWidth.set(L.width*.5,0,0),P.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=P,m++}else if(L.isPointLight){const P=t.get(L);if(P.color.copy(L.color).multiplyScalar(L.intensity),P.distance=L.distance,P.decay=L.decay,L.castShadow){const z=L.shadow,F=e.get(L);F.shadowIntensity=z.intensity,F.shadowBias=z.bias,F.shadowNormalBias=z.normalBias,F.shadowRadius=z.radius,F.shadowMapSize=z.mapSize,F.shadowCameraNear=z.camera.near,F.shadowCameraFar=z.camera.far,i.pointShadow[_]=F,i.pointShadowMap[_]=B,i.pointShadowMatrix[_]=L.shadow.matrix,b++}i.point[_]=P,_++}else if(L.isHemisphereLight){const P=t.get(L);P.skyColor.copy(L.color).multiplyScalar(X),P.groundColor.copy(L.groundColor).multiplyScalar(X),i.hemi[d]=P,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=lt.LTC_FLOAT_1,i.rectAreaLTC2=lt.LTC_FLOAT_2):(i.rectAreaLTC1=lt.LTC_HALF_1,i.rectAreaLTC2=lt.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=u,i.ambient[2]=h;const O=i.hash;(O.directionalLength!==p||O.pointLength!==_||O.spotLength!==v||O.rectAreaLength!==m||O.hemiLength!==d||O.numDirectionalShadows!==E||O.numPointShadows!==b||O.numSpotShadows!==S||O.numSpotMaps!==U||O.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=v,i.rectArea.length=m,i.point.length=_,i.hemi.length=d,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=S+U-C,i.spotLightMap.length=U,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=A,O.directionalLength=p,O.pointLength=_,O.spotLength=v,O.rectAreaLength=m,O.hemiLength=d,O.numDirectionalShadows=E,O.numPointShadows=b,O.numSpotShadows=S,O.numSpotMaps=U,O.numLightProbes=A,i.version=nS++)}function l(c,f){let u=0,h=0,p=0,_=0,v=0;const m=f.matrixWorldInverse;for(let d=0,E=c.length;d<E;d++){const b=c[d];if(b.isDirectionalLight){const S=i.directional[u];S.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),u++}else if(b.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const S=i.rectArea[_];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(m),a.identity(),s.copy(b.matrixWorld),s.premultiply(m),a.extractRotation(s),S.halfWidth.set(b.width*.5,0,0),S.halfHeight.set(0,b.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),_++}else if(b.isPointLight){const S=i.point[h];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(m),h++}else if(b.isHemisphereLight){const S=i.hemi[v];S.direction.setFromMatrixPosition(b.matrixWorld),S.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:i}}function Uc(n){const t=new rS(n),e=[],i=[];function r(f){c.camera=f,e.length=0,i.length=0}function s(f){e.push(f)}function a(f){i.push(f)}function o(){t.setup(e)}function l(f){t.setupView(e,f)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function sS(n){let t=new WeakMap;function e(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new Uc(n),t.set(r,[o])):s>=a.length?(o=new Uc(n),a.push(o)):o=a[s],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const aS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,oS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function lS(n,t,e){let i=new Yu;const r=new Yt,s=new Yt,a=new le,o=new Lg({depthPacking:G_}),l=new Ug,c={},f=e.maxTextureSize,u={[Ln]:we,[we]:Ln,[hn]:hn},h=new Un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Yt},radius:{value:4}},vertexShader:aS,fragmentShader:oS}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const _=new ii;_.setAttribute("position",new tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Se(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wu;let d=this.type;this.render=function(C,A,O){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const y=n.getRenderTarget(),M=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),H=n.state;H.setBlending(Pn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const X=d!==fn&&this.type===fn,w=d===fn&&this.type!==fn;for(let B=0,P=C.length;B<P;B++){const z=C[B],F=z.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;r.copy(F.mapSize);const Y=F.getFrameExtents();if(r.multiply(Y),s.copy(F.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/Y.x),r.x=s.x*Y.x,F.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/Y.y),r.y=s.y*Y.y,F.mapSize.y=s.y)),F.map===null||X===!0||w===!0){const at=this.type!==fn?{minFilter:Ye,magFilter:Ye}:{};F.map!==null&&F.map.dispose(),F.map=new ni(r.x,r.y,at),F.map.texture.name=z.name+".shadowMap",F.camera.updateProjectionMatrix()}n.setRenderTarget(F.map),n.clear();const Z=F.getViewportCount();for(let at=0;at<Z;at++){const xt=F.getViewport(at);a.set(s.x*xt.x,s.y*xt.y,s.x*xt.z,s.y*xt.w),H.viewport(a),F.updateMatrices(z,at),i=F.getFrustum(),S(A,O,F.camera,z,this.type)}F.isPointLightShadow!==!0&&this.type===fn&&E(F,O),F.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(y,M,L)};function E(C,A){const O=t.update(v);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new ni(r.x,r.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(A,null,O,h,v,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(A,null,O,p,v,null)}function b(C,A,O,y){let M=null;const L=O.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(L!==void 0)M=L;else if(M=O.isPointLight===!0?l:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const H=M.uuid,X=A.uuid;let w=c[H];w===void 0&&(w={},c[H]=w);let B=w[X];B===void 0&&(B=M.clone(),w[X]=B,A.addEventListener("dispose",U)),M=B}if(M.visible=A.visible,M.wireframe=A.wireframe,y===fn?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,O.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const H=n.properties.get(M);H.light=O}return M}function S(C,A,O,y,M){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===fn)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,C.matrixWorld);const X=t.update(C),w=C.material;if(Array.isArray(w)){const B=X.groups;for(let P=0,z=B.length;P<z;P++){const F=B[P],Y=w[F.materialIndex];if(Y&&Y.visible){const Z=b(C,Y,y,M);C.onBeforeShadow(n,C,A,O,X,Z,F),n.renderBufferDirect(O,null,X,Z,C,F),C.onAfterShadow(n,C,A,O,X,Z,F)}}}else if(w.visible){const B=b(C,w,y,M);C.onBeforeShadow(n,C,A,O,X,B,null),n.renderBufferDirect(O,null,X,B,C,null),C.onAfterShadow(n,C,A,O,X,B,null)}}const H=C.children;for(let X=0,w=H.length;X<w;X++)S(H[X],A,O,y,M)}function U(C){C.target.removeEventListener("dispose",U);for(const O in c){const y=c[O],M=C.target.uuid;M in y&&(y[M].dispose(),delete y[M])}}}const cS={[Ba]:za,[ka]:Ga,[Ha]:Wa,[Di]:Va,[za]:Ba,[Ga]:ka,[Wa]:Ha,[Va]:Di};function uS(n,t){function e(){let D=!1;const ut=new le;let et=null;const _t=new le(0,0,0,0);return{setMask:function(it){et!==it&&!D&&(n.colorMask(it,it,it,it),et=it)},setLocked:function(it){D=it},setClear:function(it,J,gt,Ut,te){te===!0&&(it*=Ut,J*=Ut,gt*=Ut),ut.set(it,J,gt,Ut),_t.equals(ut)===!1&&(n.clearColor(it,J,gt,Ut),_t.copy(ut))},reset:function(){D=!1,et=null,_t.set(-1,0,0,0)}}}function i(){let D=!1,ut=!1,et=null,_t=null,it=null;return{setReversed:function(J){if(ut!==J){const gt=t.get("EXT_clip_control");J?gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.ZERO_TO_ONE_EXT):gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.NEGATIVE_ONE_TO_ONE_EXT),ut=J;const Ut=it;it=null,this.setClear(Ut)}},getReversed:function(){return ut},setTest:function(J){J?st(n.DEPTH_TEST):mt(n.DEPTH_TEST)},setMask:function(J){et!==J&&!D&&(n.depthMask(J),et=J)},setFunc:function(J){if(ut&&(J=cS[J]),_t!==J){switch(J){case Ba:n.depthFunc(n.NEVER);break;case za:n.depthFunc(n.ALWAYS);break;case ka:n.depthFunc(n.LESS);break;case Di:n.depthFunc(n.LEQUAL);break;case Ha:n.depthFunc(n.EQUAL);break;case Va:n.depthFunc(n.GEQUAL);break;case Ga:n.depthFunc(n.GREATER);break;case Wa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_t=J}},setLocked:function(J){D=J},setClear:function(J){it!==J&&(ut&&(J=1-J),n.clearDepth(J),it=J)},reset:function(){D=!1,et=null,_t=null,it=null,ut=!1}}}function r(){let D=!1,ut=null,et=null,_t=null,it=null,J=null,gt=null,Ut=null,te=null;return{setTest:function(qt){D||(qt?st(n.STENCIL_TEST):mt(n.STENCIL_TEST))},setMask:function(qt){ut!==qt&&!D&&(n.stencilMask(qt),ut=qt)},setFunc:function(qt,ke,rn){(et!==qt||_t!==ke||it!==rn)&&(n.stencilFunc(qt,ke,rn),et=qt,_t=ke,it=rn)},setOp:function(qt,ke,rn){(J!==qt||gt!==ke||Ut!==rn)&&(n.stencilOp(qt,ke,rn),J=qt,gt=ke,Ut=rn)},setLocked:function(qt){D=qt},setClear:function(qt){te!==qt&&(n.clearStencil(qt),te=qt)},reset:function(){D=!1,ut=null,et=null,_t=null,it=null,J=null,gt=null,Ut=null,te=null}}}const s=new e,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let f={},u={},h=new WeakMap,p=[],_=null,v=!1,m=null,d=null,E=null,b=null,S=null,U=null,C=null,A=new $t(0,0,0),O=0,y=!1,M=null,L=null,H=null,X=null,w=null;const B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,z=0;const F=n.getParameter(n.VERSION);F.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(F)[1]),P=z>=1):F.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),P=z>=2);let Y=null,Z={};const at=n.getParameter(n.SCISSOR_BOX),xt=n.getParameter(n.VIEWPORT),Ot=new le().fromArray(at),$=new le().fromArray(xt);function nt(D,ut,et,_t){const it=new Uint8Array(4),J=n.createTexture();n.bindTexture(D,J),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let gt=0;gt<et;gt++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(ut,0,n.RGBA,1,1,_t,0,n.RGBA,n.UNSIGNED_BYTE,it):n.texImage2D(ut+gt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,it);return J}const ht={};ht[n.TEXTURE_2D]=nt(n.TEXTURE_2D,n.TEXTURE_2D,1),ht[n.TEXTURE_CUBE_MAP]=nt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ht[n.TEXTURE_2D_ARRAY]=nt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ht[n.TEXTURE_3D]=nt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),st(n.DEPTH_TEST),a.setFunc(Di),Xt(!1),Qt(zl),st(n.CULL_FACE),R(Pn);function st(D){f[D]!==!0&&(n.enable(D),f[D]=!0)}function mt(D){f[D]!==!1&&(n.disable(D),f[D]=!1)}function zt(D,ut){return u[D]!==ut?(n.bindFramebuffer(D,ut),u[D]=ut,D===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ut),D===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ut),!0):!1}function Ct(D,ut){let et=p,_t=!1;if(D){et=h.get(ut),et===void 0&&(et=[],h.set(ut,et));const it=D.textures;if(et.length!==it.length||et[0]!==n.COLOR_ATTACHMENT0){for(let J=0,gt=it.length;J<gt;J++)et[J]=n.COLOR_ATTACHMENT0+J;et.length=it.length,_t=!0}}else et[0]!==n.BACK&&(et[0]=n.BACK,_t=!0);_t&&n.drawBuffers(et)}function ie(D){return _!==D?(n.useProgram(D),_=D,!0):!1}const re={[$n]:n.FUNC_ADD,[m_]:n.FUNC_SUBTRACT,[__]:n.FUNC_REVERSE_SUBTRACT};re[g_]=n.MIN,re[v_]=n.MAX;const Wt={[x_]:n.ZERO,[M_]:n.ONE,[S_]:n.SRC_COLOR,[Fa]:n.SRC_ALPHA,[A_]:n.SRC_ALPHA_SATURATE,[b_]:n.DST_COLOR,[E_]:n.DST_ALPHA,[y_]:n.ONE_MINUS_SRC_COLOR,[Oa]:n.ONE_MINUS_SRC_ALPHA,[w_]:n.ONE_MINUS_DST_COLOR,[T_]:n.ONE_MINUS_DST_ALPHA,[R_]:n.CONSTANT_COLOR,[C_]:n.ONE_MINUS_CONSTANT_COLOR,[P_]:n.CONSTANT_ALPHA,[D_]:n.ONE_MINUS_CONSTANT_ALPHA};function R(D,ut,et,_t,it,J,gt,Ut,te,qt){if(D===Pn){v===!0&&(mt(n.BLEND),v=!1);return}if(v===!1&&(st(n.BLEND),v=!0),D!==p_){if(D!==m||qt!==y){if((d!==$n||S!==$n)&&(n.blendEquation(n.FUNC_ADD),d=$n,S=$n),qt)switch(D){case Ei:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case kl:n.blendFunc(n.ONE,n.ONE);break;case Hl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Vl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ei:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case kl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Hl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Vl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}E=null,b=null,U=null,C=null,A.set(0,0,0),O=0,m=D,y=qt}return}it=it||ut,J=J||et,gt=gt||_t,(ut!==d||it!==S)&&(n.blendEquationSeparate(re[ut],re[it]),d=ut,S=it),(et!==E||_t!==b||J!==U||gt!==C)&&(n.blendFuncSeparate(Wt[et],Wt[_t],Wt[J],Wt[gt]),E=et,b=_t,U=J,C=gt),(Ut.equals(A)===!1||te!==O)&&(n.blendColor(Ut.r,Ut.g,Ut.b,te),A.copy(Ut),O=te),m=D,y=!1}function ve(D,ut){D.side===hn?mt(n.CULL_FACE):st(n.CULL_FACE);let et=D.side===we;ut&&(et=!et),Xt(et),D.blending===Ei&&D.transparent===!1?R(Pn):R(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),s.setMask(D.colorWrite);const _t=D.stencilWrite;o.setTest(_t),_t&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Ht(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?st(n.SAMPLE_ALPHA_TO_COVERAGE):mt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Xt(D){M!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),M=D)}function Qt(D){D!==f_?(st(n.CULL_FACE),D!==L&&(D===zl?n.cullFace(n.BACK):D===h_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):mt(n.CULL_FACE),L=D}function St(D){D!==H&&(P&&n.lineWidth(D),H=D)}function Ht(D,ut,et){D?(st(n.POLYGON_OFFSET_FILL),(X!==ut||w!==et)&&(n.polygonOffset(ut,et),X=ut,w=et)):mt(n.POLYGON_OFFSET_FILL)}function bt(D){D?st(n.SCISSOR_TEST):mt(n.SCISSOR_TEST)}function Nt(D){D===void 0&&(D=n.TEXTURE0+B-1),Y!==D&&(n.activeTexture(D),Y=D)}function he(D,ut,et){et===void 0&&(Y===null?et=n.TEXTURE0+B-1:et=Y);let _t=Z[et];_t===void 0&&(_t={type:void 0,texture:void 0},Z[et]=_t),(_t.type!==D||_t.texture!==ut)&&(Y!==et&&(n.activeTexture(et),Y=et),n.bindTexture(D,ut||ht[D]),_t.type=D,_t.texture=ut)}function T(){const D=Z[Y];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function g(){try{n.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function k(){try{n.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{n.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{n.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{n.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function yt(){try{n.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ct(){try{n.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Mt(){try{n.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Et(){try{n.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function tt(){try{n.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function dt(D){Ot.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),Ot.copy(D))}function Rt(D){$.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),$.copy(D))}function At(D,ut){let et=c.get(ut);et===void 0&&(et=new WeakMap,c.set(ut,et));let _t=et.get(D);_t===void 0&&(_t=n.getUniformBlockIndex(ut,D.name),et.set(D,_t))}function ot(D,ut){const _t=c.get(ut).get(D);l.get(ut)!==_t&&(n.uniformBlockBinding(ut,_t,D.__bindingPointIndex),l.set(ut,_t))}function Lt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},Y=null,Z={},u={},h=new WeakMap,p=[],_=null,v=!1,m=null,d=null,E=null,b=null,S=null,U=null,C=null,A=new $t(0,0,0),O=0,y=!1,M=null,L=null,H=null,X=null,w=null,Ot.set(0,0,n.canvas.width,n.canvas.height),$.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:st,disable:mt,bindFramebuffer:zt,drawBuffers:Ct,useProgram:ie,setBlending:R,setMaterial:ve,setFlipSided:Xt,setCullFace:Qt,setLineWidth:St,setPolygonOffset:Ht,setScissorTest:bt,activeTexture:Nt,bindTexture:he,unbindTexture:T,compressedTexImage2D:g,compressedTexImage3D:k,texImage2D:Et,texImage3D:tt,updateUBOMapping:At,uniformBlockBinding:ot,texStorage2D:ct,texStorage3D:Mt,texSubImage2D:K,texSubImage3D:Q,compressedTexSubImage2D:q,compressedTexSubImage3D:yt,scissor:dt,viewport:Rt,reset:Lt}}function fS(n,t,e,i,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Yt,f=new WeakMap;let u;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,g){return p?new OffscreenCanvas(T,g):Ss("canvas")}function v(T,g,k){let K=1;const Q=he(T);if((Q.width>k||Q.height>k)&&(K=k/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const q=Math.floor(K*Q.width),yt=Math.floor(K*Q.height);u===void 0&&(u=_(q,yt));const ct=g?_(q,yt):u;return ct.width=q,ct.height=yt,ct.getContext("2d").drawImage(T,0,0,q,yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+q+"x"+yt+")."),ct}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function m(T){return T.generateMipmaps}function d(T){n.generateMipmap(T)}function E(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(T,g,k,K,Q=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let q=g;if(g===n.RED&&(k===n.FLOAT&&(q=n.R32F),k===n.HALF_FLOAT&&(q=n.R16F),k===n.UNSIGNED_BYTE&&(q=n.R8)),g===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(q=n.R8UI),k===n.UNSIGNED_SHORT&&(q=n.R16UI),k===n.UNSIGNED_INT&&(q=n.R32UI),k===n.BYTE&&(q=n.R8I),k===n.SHORT&&(q=n.R16I),k===n.INT&&(q=n.R32I)),g===n.RG&&(k===n.FLOAT&&(q=n.RG32F),k===n.HALF_FLOAT&&(q=n.RG16F),k===n.UNSIGNED_BYTE&&(q=n.RG8)),g===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(q=n.RG8UI),k===n.UNSIGNED_SHORT&&(q=n.RG16UI),k===n.UNSIGNED_INT&&(q=n.RG32UI),k===n.BYTE&&(q=n.RG8I),k===n.SHORT&&(q=n.RG16I),k===n.INT&&(q=n.RG32I)),g===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(q=n.RGB8UI),k===n.UNSIGNED_SHORT&&(q=n.RGB16UI),k===n.UNSIGNED_INT&&(q=n.RGB32UI),k===n.BYTE&&(q=n.RGB8I),k===n.SHORT&&(q=n.RGB16I),k===n.INT&&(q=n.RGB32I)),g===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),k===n.UNSIGNED_INT&&(q=n.RGBA32UI),k===n.BYTE&&(q=n.RGBA8I),k===n.SHORT&&(q=n.RGBA16I),k===n.INT&&(q=n.RGBA32I)),g===n.RGB&&k===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),g===n.RGBA){const yt=Q?xs:Gt.getTransfer(K);k===n.FLOAT&&(q=n.RGBA32F),k===n.HALF_FLOAT&&(q=n.RGBA16F),k===n.UNSIGNED_BYTE&&(q=yt===Zt?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function S(T,g){let k;return T?g===null||g===ei||g===nr?k=n.DEPTH24_STENCIL8:g===mn?k=n.DEPTH32F_STENCIL8:g===er&&(k=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===ei||g===nr?k=n.DEPTH_COMPONENT24:g===mn?k=n.DEPTH_COMPONENT32F:g===er&&(k=n.DEPTH_COMPONENT16),k}function U(T,g){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ye&&T.minFilter!==je?Math.log2(Math.max(g.width,g.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?g.mipmaps.length:1}function C(T){const g=T.target;g.removeEventListener("dispose",C),O(g),g.isVideoTexture&&f.delete(g)}function A(T){const g=T.target;g.removeEventListener("dispose",A),M(g)}function O(T){const g=i.get(T);if(g.__webglInit===void 0)return;const k=T.source,K=h.get(k);if(K){const Q=K[g.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&y(T),Object.keys(K).length===0&&h.delete(k)}i.remove(T)}function y(T){const g=i.get(T);n.deleteTexture(g.__webglTexture);const k=T.source,K=h.get(k);delete K[g.__cacheKey],a.memory.textures--}function M(T){const g=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(g.__webglFramebuffer[K]))for(let Q=0;Q<g.__webglFramebuffer[K].length;Q++)n.deleteFramebuffer(g.__webglFramebuffer[K][Q]);else n.deleteFramebuffer(g.__webglFramebuffer[K]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[K])}else{if(Array.isArray(g.__webglFramebuffer))for(let K=0;K<g.__webglFramebuffer.length;K++)n.deleteFramebuffer(g.__webglFramebuffer[K]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let K=0;K<g.__webglColorRenderbuffer.length;K++)g.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[K]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const k=T.textures;for(let K=0,Q=k.length;K<Q;K++){const q=i.get(k[K]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),a.memory.textures--),i.remove(k[K])}i.remove(T)}let L=0;function H(){L=0}function X(){const T=L;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),L+=1,T}function w(T){const g=[];return g.push(T.wrapS),g.push(T.wrapT),g.push(T.wrapR||0),g.push(T.magFilter),g.push(T.minFilter),g.push(T.anisotropy),g.push(T.internalFormat),g.push(T.format),g.push(T.type),g.push(T.generateMipmaps),g.push(T.premultiplyAlpha),g.push(T.flipY),g.push(T.unpackAlignment),g.push(T.colorSpace),g.join()}function B(T,g){const k=i.get(T);if(T.isVideoTexture&&bt(T),T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){const K=T.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ht(k,T,g);return}}e.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+g)}function P(T,g){const k=i.get(T);if(T.version>0&&k.__version!==T.version){ht(k,T,g);return}e.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+g)}function z(T,g){const k=i.get(T);if(T.version>0&&k.__version!==T.version){ht(k,T,g);return}e.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+g)}function F(T,g){const k=i.get(T);if(T.version>0&&k.__version!==T.version){st(k,T,g);return}e.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+g)}const Y={[qa]:n.REPEAT,[Kn]:n.CLAMP_TO_EDGE,[Ya]:n.MIRRORED_REPEAT},Z={[Ye]:n.NEAREST,[H_]:n.NEAREST_MIPMAP_NEAREST,[yr]:n.NEAREST_MIPMAP_LINEAR,[je]:n.LINEAR,[Bs]:n.LINEAR_MIPMAP_NEAREST,[Zn]:n.LINEAR_MIPMAP_LINEAR},at={[X_]:n.NEVER,[J_]:n.ALWAYS,[$_]:n.LESS,[Ou]:n.LEQUAL,[q_]:n.EQUAL,[Z_]:n.GEQUAL,[Y_]:n.GREATER,[K_]:n.NOTEQUAL};function xt(T,g){if(g.type===mn&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===je||g.magFilter===Bs||g.magFilter===yr||g.magFilter===Zn||g.minFilter===je||g.minFilter===Bs||g.minFilter===yr||g.minFilter===Zn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,Y[g.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,Y[g.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,Y[g.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,Z[g.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,Z[g.minFilter]),g.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,at[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Ye||g.minFilter!==yr&&g.minFilter!==Zn||g.type===mn&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");n.texParameterf(T,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function Ot(T,g){let k=!1;T.__webglInit===void 0&&(T.__webglInit=!0,g.addEventListener("dispose",C));const K=g.source;let Q=h.get(K);Q===void 0&&(Q={},h.set(K,Q));const q=w(g);if(q!==T.__cacheKey){Q[q]===void 0&&(Q[q]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,k=!0),Q[q].usedTimes++;const yt=Q[T.__cacheKey];yt!==void 0&&(Q[T.__cacheKey].usedTimes--,yt.usedTimes===0&&y(g)),T.__cacheKey=q,T.__webglTexture=Q[q].texture}return k}function $(T,g,k){return Math.floor(Math.floor(T/k)/g)}function nt(T,g,k,K){const q=T.updateRanges;if(q.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,g.width,g.height,k,K,g.data);else{q.sort((tt,dt)=>tt.start-dt.start);let yt=0;for(let tt=1;tt<q.length;tt++){const dt=q[yt],Rt=q[tt],At=dt.start+dt.count,ot=$(Rt.start,g.width,4),Lt=$(dt.start,g.width,4);Rt.start<=At+1&&ot===Lt&&$(Rt.start+Rt.count-1,g.width,4)===ot?dt.count=Math.max(dt.count,Rt.start+Rt.count-dt.start):(++yt,q[yt]=Rt)}q.length=yt+1;const ct=n.getParameter(n.UNPACK_ROW_LENGTH),Mt=n.getParameter(n.UNPACK_SKIP_PIXELS),Et=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,g.width);for(let tt=0,dt=q.length;tt<dt;tt++){const Rt=q[tt],At=Math.floor(Rt.start/4),ot=Math.ceil(Rt.count/4),Lt=At%g.width,D=Math.floor(At/g.width),ut=ot,et=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Lt),n.pixelStorei(n.UNPACK_SKIP_ROWS,D),e.texSubImage2D(n.TEXTURE_2D,0,Lt,D,ut,et,k,K,g.data)}T.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ct),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Mt),n.pixelStorei(n.UNPACK_SKIP_ROWS,Et)}}function ht(T,g,k){let K=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(K=n.TEXTURE_3D);const Q=Ot(T,g),q=g.source;e.bindTexture(K,T.__webglTexture,n.TEXTURE0+k);const yt=i.get(q);if(q.version!==yt.__version||Q===!0){e.activeTexture(n.TEXTURE0+k);const ct=Gt.getPrimaries(Gt.workingColorSpace),Mt=g.colorSpace===Cn?null:Gt.getPrimaries(g.colorSpace),Et=g.colorSpace===Cn||ct===Mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);let tt=v(g.image,!1,r.maxTextureSize);tt=Nt(g,tt);const dt=s.convert(g.format,g.colorSpace),Rt=s.convert(g.type);let At=b(g.internalFormat,dt,Rt,g.colorSpace,g.isVideoTexture);xt(K,g);let ot;const Lt=g.mipmaps,D=g.isVideoTexture!==!0,ut=yt.__version===void 0||Q===!0,et=q.dataReady,_t=U(g,tt);if(g.isDepthTexture)At=S(g.format===rr,g.type),ut&&(D?e.texStorage2D(n.TEXTURE_2D,1,At,tt.width,tt.height):e.texImage2D(n.TEXTURE_2D,0,At,tt.width,tt.height,0,dt,Rt,null));else if(g.isDataTexture)if(Lt.length>0){D&&ut&&e.texStorage2D(n.TEXTURE_2D,_t,At,Lt[0].width,Lt[0].height);for(let it=0,J=Lt.length;it<J;it++)ot=Lt[it],D?et&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,ot.width,ot.height,dt,Rt,ot.data):e.texImage2D(n.TEXTURE_2D,it,At,ot.width,ot.height,0,dt,Rt,ot.data);g.generateMipmaps=!1}else D?(ut&&e.texStorage2D(n.TEXTURE_2D,_t,At,tt.width,tt.height),et&&nt(g,tt,dt,Rt)):e.texImage2D(n.TEXTURE_2D,0,At,tt.width,tt.height,0,dt,Rt,tt.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){D&&ut&&e.texStorage3D(n.TEXTURE_2D_ARRAY,_t,At,Lt[0].width,Lt[0].height,tt.depth);for(let it=0,J=Lt.length;it<J;it++)if(ot=Lt[it],g.format!==qe)if(dt!==null)if(D){if(et)if(g.layerUpdates.size>0){const gt=cc(ot.width,ot.height,g.format,g.type);for(const Ut of g.layerUpdates){const te=ot.data.subarray(Ut*gt/ot.data.BYTES_PER_ELEMENT,(Ut+1)*gt/ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,Ut,ot.width,ot.height,1,dt,te)}g.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,0,ot.width,ot.height,tt.depth,dt,ot.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,it,At,ot.width,ot.height,tt.depth,0,ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?et&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,0,ot.width,ot.height,tt.depth,dt,Rt,ot.data):e.texImage3D(n.TEXTURE_2D_ARRAY,it,At,ot.width,ot.height,tt.depth,0,dt,Rt,ot.data)}else{D&&ut&&e.texStorage2D(n.TEXTURE_2D,_t,At,Lt[0].width,Lt[0].height);for(let it=0,J=Lt.length;it<J;it++)ot=Lt[it],g.format!==qe?dt!==null?D?et&&e.compressedTexSubImage2D(n.TEXTURE_2D,it,0,0,ot.width,ot.height,dt,ot.data):e.compressedTexImage2D(n.TEXTURE_2D,it,At,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?et&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,ot.width,ot.height,dt,Rt,ot.data):e.texImage2D(n.TEXTURE_2D,it,At,ot.width,ot.height,0,dt,Rt,ot.data)}else if(g.isDataArrayTexture)if(D){if(ut&&e.texStorage3D(n.TEXTURE_2D_ARRAY,_t,At,tt.width,tt.height,tt.depth),et)if(g.layerUpdates.size>0){const it=cc(tt.width,tt.height,g.format,g.type);for(const J of g.layerUpdates){const gt=tt.data.subarray(J*it/tt.data.BYTES_PER_ELEMENT,(J+1)*it/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,J,tt.width,tt.height,1,dt,Rt,gt)}g.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,dt,Rt,tt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,At,tt.width,tt.height,tt.depth,0,dt,Rt,tt.data);else if(g.isData3DTexture)D?(ut&&e.texStorage3D(n.TEXTURE_3D,_t,At,tt.width,tt.height,tt.depth),et&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,dt,Rt,tt.data)):e.texImage3D(n.TEXTURE_3D,0,At,tt.width,tt.height,tt.depth,0,dt,Rt,tt.data);else if(g.isFramebufferTexture){if(ut)if(D)e.texStorage2D(n.TEXTURE_2D,_t,At,tt.width,tt.height);else{let it=tt.width,J=tt.height;for(let gt=0;gt<_t;gt++)e.texImage2D(n.TEXTURE_2D,gt,At,it,J,0,dt,Rt,null),it>>=1,J>>=1}}else if(Lt.length>0){if(D&&ut){const it=he(Lt[0]);e.texStorage2D(n.TEXTURE_2D,_t,At,it.width,it.height)}for(let it=0,J=Lt.length;it<J;it++)ot=Lt[it],D?et&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,dt,Rt,ot):e.texImage2D(n.TEXTURE_2D,it,At,dt,Rt,ot);g.generateMipmaps=!1}else if(D){if(ut){const it=he(tt);e.texStorage2D(n.TEXTURE_2D,_t,At,it.width,it.height)}et&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,dt,Rt,tt)}else e.texImage2D(n.TEXTURE_2D,0,At,dt,Rt,tt);m(g)&&d(K),yt.__version=q.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function st(T,g,k){if(g.image.length!==6)return;const K=Ot(T,g),Q=g.source;e.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+k);const q=i.get(Q);if(Q.version!==q.__version||K===!0){e.activeTexture(n.TEXTURE0+k);const yt=Gt.getPrimaries(Gt.workingColorSpace),ct=g.colorSpace===Cn?null:Gt.getPrimaries(g.colorSpace),Mt=g.colorSpace===Cn||yt===ct?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const Et=g.isCompressedTexture||g.image[0].isCompressedTexture,tt=g.image[0]&&g.image[0].isDataTexture,dt=[];for(let J=0;J<6;J++)!Et&&!tt?dt[J]=v(g.image[J],!0,r.maxCubemapSize):dt[J]=tt?g.image[J].image:g.image[J],dt[J]=Nt(g,dt[J]);const Rt=dt[0],At=s.convert(g.format,g.colorSpace),ot=s.convert(g.type),Lt=b(g.internalFormat,At,ot,g.colorSpace),D=g.isVideoTexture!==!0,ut=q.__version===void 0||K===!0,et=Q.dataReady;let _t=U(g,Rt);xt(n.TEXTURE_CUBE_MAP,g);let it;if(Et){D&&ut&&e.texStorage2D(n.TEXTURE_CUBE_MAP,_t,Lt,Rt.width,Rt.height);for(let J=0;J<6;J++){it=dt[J].mipmaps;for(let gt=0;gt<it.length;gt++){const Ut=it[gt];g.format!==qe?At!==null?D?et&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt,0,0,Ut.width,Ut.height,At,Ut.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt,Lt,Ut.width,Ut.height,0,Ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt,0,0,Ut.width,Ut.height,At,ot,Ut.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt,Lt,Ut.width,Ut.height,0,At,ot,Ut.data)}}}else{if(it=g.mipmaps,D&&ut){it.length>0&&_t++;const J=he(dt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,_t,Lt,J.width,J.height)}for(let J=0;J<6;J++)if(tt){D?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,dt[J].width,dt[J].height,At,ot,dt[J].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Lt,dt[J].width,dt[J].height,0,At,ot,dt[J].data);for(let gt=0;gt<it.length;gt++){const te=it[gt].image[J].image;D?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt+1,0,0,te.width,te.height,At,ot,te.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt+1,Lt,te.width,te.height,0,At,ot,te.data)}}else{D?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,At,ot,dt[J]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Lt,At,ot,dt[J]);for(let gt=0;gt<it.length;gt++){const Ut=it[gt];D?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt+1,0,0,At,ot,Ut.image[J]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt+1,Lt,At,ot,Ut.image[J])}}}m(g)&&d(n.TEXTURE_CUBE_MAP),q.__version=Q.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function mt(T,g,k,K,Q,q){const yt=s.convert(k.format,k.colorSpace),ct=s.convert(k.type),Mt=b(k.internalFormat,yt,ct,k.colorSpace),Et=i.get(g),tt=i.get(k);if(tt.__renderTarget=g,!Et.__hasExternalTextures){const dt=Math.max(1,g.width>>q),Rt=Math.max(1,g.height>>q);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?e.texImage3D(Q,q,Mt,dt,Rt,g.depth,0,yt,ct,null):e.texImage2D(Q,q,Mt,dt,Rt,0,yt,ct,null)}e.bindFramebuffer(n.FRAMEBUFFER,T),Ht(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,Q,tt.__webglTexture,0,St(g)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,Q,tt.__webglTexture,q),e.bindFramebuffer(n.FRAMEBUFFER,null)}function zt(T,g,k){if(n.bindRenderbuffer(n.RENDERBUFFER,T),g.depthBuffer){const K=g.depthTexture,Q=K&&K.isDepthTexture?K.type:null,q=S(g.stencilBuffer,Q),yt=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=St(g);Ht(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct,q,g.width,g.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct,q,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,q,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,yt,n.RENDERBUFFER,T)}else{const K=g.textures;for(let Q=0;Q<K.length;Q++){const q=K[Q],yt=s.convert(q.format,q.colorSpace),ct=s.convert(q.type),Mt=b(q.internalFormat,yt,ct,q.colorSpace),Et=St(g);k&&Ht(g)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Et,Mt,g.width,g.height):Ht(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Et,Mt,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,Mt,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ct(T,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,T),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=i.get(g.depthTexture);K.__renderTarget=g,(!K.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),B(g.depthTexture,0);const Q=K.__webglTexture,q=St(g);if(g.depthTexture.format===ir)Ht(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0);else if(g.depthTexture.format===rr)Ht(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function ie(T){const g=i.get(T),k=T.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==T.depthTexture){const K=T.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),K){const Q=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),g.__depthDisposeCallback=Q}g.__boundDepthTexture=K}if(T.depthTexture&&!g.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const K=T.texture.mipmaps;K&&K.length>0?Ct(g.__webglFramebuffer[0],T):Ct(g.__webglFramebuffer,T)}else if(k){g.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[K]),g.__webglDepthbuffer[K]===void 0)g.__webglDepthbuffer[K]=n.createRenderbuffer(),zt(g.__webglDepthbuffer[K],T,!1);else{const Q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=g.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,q)}}else{const K=T.texture.mipmaps;if(K&&K.length>0?e.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=n.createRenderbuffer(),zt(g.__webglDepthbuffer,T,!1);else{const Q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=g.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,q)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function re(T,g,k){const K=i.get(T);g!==void 0&&mt(K.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&ie(T)}function Wt(T){const g=T.texture,k=i.get(T),K=i.get(g);T.addEventListener("dispose",A);const Q=T.textures,q=T.isWebGLCubeRenderTarget===!0,yt=Q.length>1;if(yt||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=g.version,a.memory.textures++),q){k.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(g.mipmaps&&g.mipmaps.length>0){k.__webglFramebuffer[ct]=[];for(let Mt=0;Mt<g.mipmaps.length;Mt++)k.__webglFramebuffer[ct][Mt]=n.createFramebuffer()}else k.__webglFramebuffer[ct]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){k.__webglFramebuffer=[];for(let ct=0;ct<g.mipmaps.length;ct++)k.__webglFramebuffer[ct]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(yt)for(let ct=0,Mt=Q.length;ct<Mt;ct++){const Et=i.get(Q[ct]);Et.__webglTexture===void 0&&(Et.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&Ht(T)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ct=0;ct<Q.length;ct++){const Mt=Q[ct];k.__webglColorRenderbuffer[ct]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[ct]);const Et=s.convert(Mt.format,Mt.colorSpace),tt=s.convert(Mt.type),dt=b(Mt.internalFormat,Et,tt,Mt.colorSpace,T.isXRRenderTarget===!0),Rt=St(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Rt,dt,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.RENDERBUFFER,k.__webglColorRenderbuffer[ct])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),zt(k.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){e.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),xt(n.TEXTURE_CUBE_MAP,g);for(let ct=0;ct<6;ct++)if(g.mipmaps&&g.mipmaps.length>0)for(let Mt=0;Mt<g.mipmaps.length;Mt++)mt(k.__webglFramebuffer[ct][Mt],T,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Mt);else mt(k.__webglFramebuffer[ct],T,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(g)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(yt){for(let ct=0,Mt=Q.length;ct<Mt;ct++){const Et=Q[ct],tt=i.get(Et);e.bindTexture(n.TEXTURE_2D,tt.__webglTexture),xt(n.TEXTURE_2D,Et),mt(k.__webglFramebuffer,T,Et,n.COLOR_ATTACHMENT0+ct,n.TEXTURE_2D,0),m(Et)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let ct=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ct=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ct,K.__webglTexture),xt(ct,g),g.mipmaps&&g.mipmaps.length>0)for(let Mt=0;Mt<g.mipmaps.length;Mt++)mt(k.__webglFramebuffer[Mt],T,g,n.COLOR_ATTACHMENT0,ct,Mt);else mt(k.__webglFramebuffer,T,g,n.COLOR_ATTACHMENT0,ct,0);m(g)&&d(ct),e.unbindTexture()}T.depthBuffer&&ie(T)}function R(T){const g=T.textures;for(let k=0,K=g.length;k<K;k++){const Q=g[k];if(m(Q)){const q=E(T),yt=i.get(Q).__webglTexture;e.bindTexture(q,yt),d(q),e.unbindTexture()}}}const ve=[],Xt=[];function Qt(T){if(T.samples>0){if(Ht(T)===!1){const g=T.textures,k=T.width,K=T.height;let Q=n.COLOR_BUFFER_BIT;const q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,yt=i.get(T),ct=g.length>1;if(ct)for(let Et=0;Et<g.length;Et++)e.bindFramebuffer(n.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Et,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,yt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Et,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer);const Mt=T.texture.mipmaps;Mt&&Mt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,yt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let Et=0;Et<g.length;Et++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),ct){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,yt.__webglColorRenderbuffer[Et]);const tt=i.get(g[Et]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,tt,0)}n.blitFramebuffer(0,0,k,K,0,0,k,K,Q,n.NEAREST),l===!0&&(ve.length=0,Xt.length=0,ve.push(n.COLOR_ATTACHMENT0+Et),T.depthBuffer&&T.resolveDepthBuffer===!1&&(ve.push(q),Xt.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Xt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ve))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ct)for(let Et=0;Et<g.length;Et++){e.bindFramebuffer(n.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Et,n.RENDERBUFFER,yt.__webglColorRenderbuffer[Et]);const tt=i.get(g[Et]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,yt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Et,n.TEXTURE_2D,tt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const g=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function St(T){return Math.min(r.maxSamples,T.samples)}function Ht(T){const g=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function bt(T){const g=a.render.frame;f.get(T)!==g&&(f.set(T,g),T.update())}function Nt(T,g){const k=T.colorSpace,K=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||k!==Ii&&k!==Cn&&(Gt.getTransfer(k)===Zt?(K!==qe||Q!==Mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),g}function he(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=H,this.setTexture2D=B,this.setTexture2DArray=P,this.setTexture3D=z,this.setTextureCube=F,this.rebindTextures=re,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=R,this.updateMultisampleRenderTarget=Qt,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=Ht}function hS(n,t){function e(i,r=Cn){let s;const a=Gt.getTransfer(r);if(i===Mn)return n.UNSIGNED_BYTE;if(i===Vo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Go)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Pu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Ru)return n.BYTE;if(i===Cu)return n.SHORT;if(i===er)return n.UNSIGNED_SHORT;if(i===Ho)return n.INT;if(i===ei)return n.UNSIGNED_INT;if(i===mn)return n.FLOAT;if(i===or)return n.HALF_FLOAT;if(i===Du)return n.ALPHA;if(i===Lu)return n.RGB;if(i===qe)return n.RGBA;if(i===ir)return n.DEPTH_COMPONENT;if(i===rr)return n.DEPTH_STENCIL;if(i===Uu)return n.RED;if(i===Wo)return n.RED_INTEGER;if(i===Iu)return n.RG;if(i===Xo)return n.RG_INTEGER;if(i===$o)return n.RGBA_INTEGER;if(i===jr||i===Qr||i===ts||i===es)if(a===Zt)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===jr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Qr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ts)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===es)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===jr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Qr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ts)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===es)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ka||i===Za||i===Ja||i===ja)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ka)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Za)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ja)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ja)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Qa||i===to||i===eo)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Qa||i===to)return a===Zt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===eo)return a===Zt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===no||i===io||i===ro||i===so||i===ao||i===oo||i===lo||i===co||i===uo||i===fo||i===ho||i===po||i===mo||i===_o)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===no)return a===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===io)return a===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ro)return a===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===so)return a===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ao)return a===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===oo)return a===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===lo)return a===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===co)return a===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===uo)return a===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===fo)return a===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ho)return a===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===po)return a===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===mo)return a===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===_o)return a===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ns||i===go||i===vo)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===ns)return a===Zt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===go)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===vo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Nu||i===xo||i===Mo||i===So)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===ns)return s.COMPRESSED_RED_RGTC1_EXT;if(i===xo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Mo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===So)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===nr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const dS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,pS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class mS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new Ae,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Un({vertexShader:dS,fragmentShader:pS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Se(new dr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class _S extends Fi{constructor(t,e){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,f=null,u=null,h=null,p=null,_=null;const v=new mS,m=e.getContextAttributes();let d=null,E=null;const b=[],S=[],U=new Yt;let C=null;const A=new Be;A.viewport=new le;const O=new Be;O.viewport=new le;const y=[A,O],M=new Og;let L=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let nt=b[$];return nt===void 0&&(nt=new oa,b[$]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function($){let nt=b[$];return nt===void 0&&(nt=new oa,b[$]=nt),nt.getGripSpace()},this.getHand=function($){let nt=b[$];return nt===void 0&&(nt=new oa,b[$]=nt),nt.getHandSpace()};function X($){const nt=S.indexOf($.inputSource);if(nt===-1)return;const ht=b[nt];ht!==void 0&&(ht.update($.inputSource,$.frame,c||a),ht.dispatchEvent({type:$.type,data:$.inputSource}))}function w(){r.removeEventListener("select",X),r.removeEventListener("selectstart",X),r.removeEventListener("selectend",X),r.removeEventListener("squeeze",X),r.removeEventListener("squeezestart",X),r.removeEventListener("squeezeend",X),r.removeEventListener("end",w),r.removeEventListener("inputsourceschange",B);for(let $=0;$<b.length;$++){const nt=S[$];nt!==null&&(S[$]=null,b[$].disconnect(nt))}L=null,H=null,v.reset(),t.setRenderTarget(d),p=null,h=null,u=null,r=null,E=null,Ot.stop(),i.isPresenting=!1,t.setPixelRatio(C),t.setSize(U.width,U.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(d=t.getRenderTarget(),r.addEventListener("select",X),r.addEventListener("selectstart",X),r.addEventListener("selectend",X),r.addEventListener("squeeze",X),r.addEventListener("squeezestart",X),r.addEventListener("squeezeend",X),r.addEventListener("end",w),r.addEventListener("inputsourceschange",B),m.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(U),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let ht=null,st=null,mt=null;m.depth&&(mt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ht=m.stencil?rr:ir,st=m.stencil?nr:ei);const zt={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:s};u=new XRWebGLBinding(r,e),h=u.createProjectionLayer(zt),r.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),E=new ni(h.textureWidth,h.textureHeight,{format:qe,type:Mn,depthTexture:new Ku(h.textureWidth,h.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ht={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,e,ht),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new ni(p.framebufferWidth,p.framebufferHeight,{format:qe,type:Mn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ot.setContext(r),Ot.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function B($){for(let nt=0;nt<$.removed.length;nt++){const ht=$.removed[nt],st=S.indexOf(ht);st>=0&&(S[st]=null,b[st].disconnect(ht))}for(let nt=0;nt<$.added.length;nt++){const ht=$.added[nt];let st=S.indexOf(ht);if(st===-1){for(let zt=0;zt<b.length;zt++)if(zt>=S.length){S.push(ht),st=zt;break}else if(S[zt]===null){S[zt]=ht,st=zt;break}if(st===-1)break}const mt=b[st];mt&&mt.connect(ht)}}const P=new W,z=new W;function F($,nt,ht){P.setFromMatrixPosition(nt.matrixWorld),z.setFromMatrixPosition(ht.matrixWorld);const st=P.distanceTo(z),mt=nt.projectionMatrix.elements,zt=ht.projectionMatrix.elements,Ct=mt[14]/(mt[10]-1),ie=mt[14]/(mt[10]+1),re=(mt[9]+1)/mt[5],Wt=(mt[9]-1)/mt[5],R=(mt[8]-1)/mt[0],ve=(zt[8]+1)/zt[0],Xt=Ct*R,Qt=Ct*ve,St=st/(-R+ve),Ht=St*-R;if(nt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Ht),$.translateZ(St),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),mt[10]===-1)$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const bt=Ct+St,Nt=ie+St,he=Xt-Ht,T=Qt+(st-Ht),g=re*ie/Nt*bt,k=Wt*ie/Nt*bt;$.projectionMatrix.makePerspective(he,T,g,k,bt,Nt),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Y($,nt){nt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(nt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let nt=$.near,ht=$.far;v.texture!==null&&(v.depthNear>0&&(nt=v.depthNear),v.depthFar>0&&(ht=v.depthFar)),M.near=O.near=A.near=nt,M.far=O.far=A.far=ht,(L!==M.near||H!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),L=M.near,H=M.far),A.layers.mask=$.layers.mask|2,O.layers.mask=$.layers.mask|4,M.layers.mask=A.layers.mask|O.layers.mask;const st=$.parent,mt=M.cameras;Y(M,st);for(let zt=0;zt<mt.length;zt++)Y(mt[zt],st);mt.length===2?F(M,A,O):M.projectionMatrix.copy(A.projectionMatrix),Z($,M,st)};function Z($,nt,ht){ht===null?$.matrix.copy(nt.matrixWorld):($.matrix.copy(ht.matrixWorld),$.matrix.invert(),$.matrix.multiply(nt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=yo*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function($){l=$,h!==null&&(h.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let at=null;function xt($,nt){if(f=nt.getViewerPose(c||a),_=nt,f!==null){const ht=f.views;p!==null&&(t.setRenderTargetFramebuffer(E,p.framebuffer),t.setRenderTarget(E));let st=!1;ht.length!==M.cameras.length&&(M.cameras.length=0,st=!0);for(let Ct=0;Ct<ht.length;Ct++){const ie=ht[Ct];let re=null;if(p!==null)re=p.getViewport(ie);else{const R=u.getViewSubImage(h,ie);re=R.viewport,Ct===0&&(t.setRenderTargetTextures(E,R.colorTexture,R.depthStencilTexture),t.setRenderTarget(E))}let Wt=y[Ct];Wt===void 0&&(Wt=new Be,Wt.layers.enable(Ct),Wt.viewport=new le,y[Ct]=Wt),Wt.matrix.fromArray(ie.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(ie.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(re.x,re.y,re.width,re.height),Ct===0&&(M.matrix.copy(Wt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),st===!0&&M.cameras.push(Wt)}const mt=r.enabledFeatures;if(mt&&mt.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&u){const Ct=u.getDepthInformation(ht[0]);Ct&&Ct.isValid&&Ct.texture&&v.init(t,Ct,r.renderState)}}for(let ht=0;ht<b.length;ht++){const st=S[ht],mt=b[ht];st!==null&&mt!==void 0&&mt.update(st,nt,c||a)}at&&at($,nt),nt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:nt}),_=null}const Ot=new Zu;Ot.setAnimationLoop(xt),this.setAnimationLoop=function($){at=$},this.dispose=function(){}}}const Vn=new en,gS=new fe;function vS(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Xu(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,E,b,S){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),u(m,d)):d.isMeshPhongMaterial?(s(m,d),f(m,d)):d.isMeshStandardMaterial?(s(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,S)):d.isMeshMatcapMaterial?(s(m,d),_(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),v(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,E,b):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===we&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===we&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const E=t.get(d),b=E.envMap,S=E.envMapRotation;b&&(m.envMap.value=b,Vn.copy(S),Vn.x*=-1,Vn.y*=-1,Vn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Vn.y*=-1,Vn.z*=-1),m.envMapRotation.value.setFromMatrix4(gS.makeRotationFromEuler(Vn)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,E,b){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*E,m.scale.value=b*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function f(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,E){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===we&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,d){d.matcap&&(m.matcap.value=d.matcap)}function v(m,d){const E=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function xS(n,t,e,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,b){const S=b.program;i.uniformBlockBinding(E,S)}function c(E,b){let S=r[E.id];S===void 0&&(_(E),S=f(E),r[E.id]=S,E.addEventListener("dispose",m));const U=b.program;i.updateUBOMapping(E,U);const C=t.render.frame;s[E.id]!==C&&(h(E),s[E.id]=C)}function f(E){const b=u();E.__bindingPointIndex=b;const S=n.createBuffer(),U=E.__size,C=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,U,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,S),S}function u(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(E){const b=r[E.id],S=E.uniforms,U=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let C=0,A=S.length;C<A;C++){const O=Array.isArray(S[C])?S[C]:[S[C]];for(let y=0,M=O.length;y<M;y++){const L=O[y];if(p(L,C,y,U)===!0){const H=L.__offset,X=Array.isArray(L.value)?L.value:[L.value];let w=0;for(let B=0;B<X.length;B++){const P=X[B],z=v(P);typeof P=="number"||typeof P=="boolean"?(L.__data[0]=P,n.bufferSubData(n.UNIFORM_BUFFER,H+w,L.__data)):P.isMatrix3?(L.__data[0]=P.elements[0],L.__data[1]=P.elements[1],L.__data[2]=P.elements[2],L.__data[3]=0,L.__data[4]=P.elements[3],L.__data[5]=P.elements[4],L.__data[6]=P.elements[5],L.__data[7]=0,L.__data[8]=P.elements[6],L.__data[9]=P.elements[7],L.__data[10]=P.elements[8],L.__data[11]=0):(P.toArray(L.__data,w),w+=z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,H,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(E,b,S,U){const C=E.value,A=b+"_"+S;if(U[A]===void 0)return typeof C=="number"||typeof C=="boolean"?U[A]=C:U[A]=C.clone(),!0;{const O=U[A];if(typeof C=="number"||typeof C=="boolean"){if(O!==C)return U[A]=C,!0}else if(O.equals(C)===!1)return O.copy(C),!0}return!1}function _(E){const b=E.uniforms;let S=0;const U=16;for(let A=0,O=b.length;A<O;A++){const y=Array.isArray(b[A])?b[A]:[b[A]];for(let M=0,L=y.length;M<L;M++){const H=y[M],X=Array.isArray(H.value)?H.value:[H.value];for(let w=0,B=X.length;w<B;w++){const P=X[w],z=v(P),F=S%U,Y=F%z.boundary,Z=F+Y;S+=Y,Z!==0&&U-Z<z.storage&&(S+=U-Z),H.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=S,S+=z.storage}}}const C=S%U;return C>0&&(S+=U-C),E.__size=S,E.__cache={},this}function v(E){const b={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(b.boundary=4,b.storage=4):E.isVector2?(b.boundary=8,b.storage=8):E.isVector3||E.isColor?(b.boundary=16,b.storage=12):E.isVector4?(b.boundary=16,b.storage=16):E.isMatrix3?(b.boundary=48,b.storage=48):E.isMatrix4?(b.boundary=64,b.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),b}function m(E){const b=E.target;b.removeEventListener("dispose",m);const S=a.indexOf(b.__bindingPointIndex);a.splice(S,1),n.deleteBuffer(r[b.id]),delete r[b.id],delete s[b.id]}function d(){for(const E in r)n.deleteBuffer(r[E]);a=[],r={},s={}}return{bind:l,update:c,dispose:d}}class MS{constructor(t={}){const{canvas:e=Q_(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const _=new Uint32Array(4),v=new Int32Array(4);let m=null,d=null;const E=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Dn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let U=!1;this._outputColorSpace=Oe;let C=0,A=0,O=null,y=-1,M=null;const L=new le,H=new le;let X=null;const w=new $t(0);let B=0,P=e.width,z=e.height,F=1,Y=null,Z=null;const at=new le(0,0,P,z),xt=new le(0,0,P,z);let Ot=!1;const $=new Yu;let nt=!1,ht=!1;const st=new fe,mt=new fe,zt=new W,Ct=new le,ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let re=!1;function Wt(){return O===null?F:1}let R=i;function ve(x,I){return e.getContext(x,I)}try{const x={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${zo}`),e.addEventListener("webglcontextlost",_t,!1),e.addEventListener("webglcontextrestored",it,!1),e.addEventListener("webglcontextcreationerror",J,!1),R===null){const I="webgl2";if(R=ve(I,x),R===null)throw ve(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Xt,Qt,St,Ht,bt,Nt,he,T,g,k,K,Q,q,yt,ct,Mt,Et,tt,dt,Rt,At,ot,Lt,D;function ut(){Xt=new Px(R),Xt.init(),ot=new hS(R,Xt),Qt=new Ex(R,Xt,t,ot),St=new uS(R,Xt),Qt.reverseDepthBuffer&&h&&St.buffers.depth.setReversed(!0),Ht=new Ux(R),bt=new JM,Nt=new fS(R,Xt,St,bt,Qt,ot,Ht),he=new bx(S),T=new Cx(S),g=new zg(R),Lt=new Sx(R,g),k=new Dx(R,g,Ht,Lt),K=new Nx(R,k,g,Ht),dt=new Ix(R,Qt,Nt),Mt=new Tx(bt),Q=new ZM(S,he,T,Xt,Qt,Lt,Mt),q=new vS(S,bt),yt=new QM,ct=new sS(Xt),tt=new Mx(S,he,T,St,K,p,l),Et=new lS(S,K,Qt),D=new xS(R,Ht,Qt,St),Rt=new yx(R,Xt,Ht),At=new Lx(R,Xt,Ht),Ht.programs=Q.programs,S.capabilities=Qt,S.extensions=Xt,S.properties=bt,S.renderLists=yt,S.shadowMap=Et,S.state=St,S.info=Ht}ut();const et=new _S(S,R);this.xr=et,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const x=Xt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Xt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(x){x!==void 0&&(F=x,this.setSize(P,z,!1))},this.getSize=function(x){return x.set(P,z)},this.setSize=function(x,I,V=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}P=x,z=I,e.width=Math.floor(x*F),e.height=Math.floor(I*F),V===!0&&(e.style.width=x+"px",e.style.height=I+"px"),this.setViewport(0,0,x,I)},this.getDrawingBufferSize=function(x){return x.set(P*F,z*F).floor()},this.setDrawingBufferSize=function(x,I,V){P=x,z=I,F=V,e.width=Math.floor(x*V),e.height=Math.floor(I*V),this.setViewport(0,0,x,I)},this.getCurrentViewport=function(x){return x.copy(L)},this.getViewport=function(x){return x.copy(at)},this.setViewport=function(x,I,V,G){x.isVector4?at.set(x.x,x.y,x.z,x.w):at.set(x,I,V,G),St.viewport(L.copy(at).multiplyScalar(F).round())},this.getScissor=function(x){return x.copy(xt)},this.setScissor=function(x,I,V,G){x.isVector4?xt.set(x.x,x.y,x.z,x.w):xt.set(x,I,V,G),St.scissor(H.copy(xt).multiplyScalar(F).round())},this.getScissorTest=function(){return Ot},this.setScissorTest=function(x){St.setScissorTest(Ot=x)},this.setOpaqueSort=function(x){Y=x},this.setTransparentSort=function(x){Z=x},this.getClearColor=function(x){return x.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor(...arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha(...arguments)},this.clear=function(x=!0,I=!0,V=!0){let G=0;if(x){let N=!1;if(O!==null){const rt=O.texture.format;N=rt===$o||rt===Xo||rt===Wo}if(N){const rt=O.texture.type,ft=rt===Mn||rt===ei||rt===er||rt===nr||rt===Vo||rt===Go,vt=tt.getClearColor(),pt=tt.getClearAlpha(),Pt=vt.r,Dt=vt.g,Tt=vt.b;ft?(_[0]=Pt,_[1]=Dt,_[2]=Tt,_[3]=pt,R.clearBufferuiv(R.COLOR,0,_)):(v[0]=Pt,v[1]=Dt,v[2]=Tt,v[3]=pt,R.clearBufferiv(R.COLOR,0,v))}else G|=R.COLOR_BUFFER_BIT}I&&(G|=R.DEPTH_BUFFER_BIT),V&&(G|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",_t,!1),e.removeEventListener("webglcontextrestored",it,!1),e.removeEventListener("webglcontextcreationerror",J,!1),tt.dispose(),yt.dispose(),ct.dispose(),bt.dispose(),he.dispose(),T.dispose(),K.dispose(),Lt.dispose(),D.dispose(),Q.dispose(),et.dispose(),et.removeEventListener("sessionstart",Zo),et.removeEventListener("sessionend",Jo),In.stop()};function _t(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),U=!0}function it(){console.log("THREE.WebGLRenderer: Context Restored."),U=!1;const x=Ht.autoReset,I=Et.enabled,V=Et.autoUpdate,G=Et.needsUpdate,N=Et.type;ut(),Ht.autoReset=x,Et.enabled=I,Et.autoUpdate=V,Et.needsUpdate=G,Et.type=N}function J(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function gt(x){const I=x.target;I.removeEventListener("dispose",gt),Ut(I)}function Ut(x){te(x),bt.remove(x)}function te(x){const I=bt.get(x).programs;I!==void 0&&(I.forEach(function(V){Q.releaseProgram(V)}),x.isShaderMaterial&&Q.releaseShaderCache(x))}this.renderBufferDirect=function(x,I,V,G,N,rt){I===null&&(I=ie);const ft=N.isMesh&&N.matrixWorld.determinant()<0,vt=ef(x,I,V,G,N);St.setMaterial(G,ft);let pt=V.index,Pt=1;if(G.wireframe===!0){if(pt=k.getWireframeAttribute(V),pt===void 0)return;Pt=2}const Dt=V.drawRange,Tt=V.attributes.position;let Bt=Dt.start*Pt,Kt=(Dt.start+Dt.count)*Pt;rt!==null&&(Bt=Math.max(Bt,rt.start*Pt),Kt=Math.min(Kt,(rt.start+rt.count)*Pt)),pt!==null?(Bt=Math.max(Bt,0),Kt=Math.min(Kt,pt.count)):Tt!=null&&(Bt=Math.max(Bt,0),Kt=Math.min(Kt,Tt.count));const oe=Kt-Bt;if(oe<0||oe===1/0)return;Lt.setup(N,G,vt,V,pt);let ee,Jt=Rt;if(pt!==null&&(ee=g.get(pt),Jt=At,Jt.setIndex(ee)),N.isMesh)G.wireframe===!0?(St.setLineWidth(G.wireframeLinewidth*Wt()),Jt.setMode(R.LINES)):Jt.setMode(R.TRIANGLES);else if(N.isLine){let wt=G.linewidth;wt===void 0&&(wt=1),St.setLineWidth(wt*Wt()),N.isLineSegments?Jt.setMode(R.LINES):N.isLineLoop?Jt.setMode(R.LINE_LOOP):Jt.setMode(R.LINE_STRIP)}else N.isPoints?Jt.setMode(R.POINTS):N.isSprite&&Jt.setMode(R.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Ti("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Jt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Xt.get("WEBGL_multi_draw"))Jt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const wt=N._multiDrawStarts,se=N._multiDrawCounts,Vt=N._multiDrawCount,Ce=pt?g.get(pt).bytesPerElement:1,ri=bt.get(G).currentProgram.getUniforms();for(let Pe=0;Pe<Vt;Pe++)ri.setValue(R,"_gl_DrawID",Pe),Jt.render(wt[Pe]/Ce,se[Pe])}else if(N.isInstancedMesh)Jt.renderInstances(Bt,oe,N.count);else if(V.isInstancedBufferGeometry){const wt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,se=Math.min(V.instanceCount,wt);Jt.renderInstances(Bt,oe,se)}else Jt.render(Bt,oe)};function qt(x,I,V){x.transparent===!0&&x.side===hn&&x.forceSinglePass===!1?(x.side=we,x.needsUpdate=!0,mr(x,I,V),x.side=Ln,x.needsUpdate=!0,mr(x,I,V),x.side=hn):mr(x,I,V)}this.compile=function(x,I,V=null){V===null&&(V=x),d=ct.get(V),d.init(I),b.push(d),V.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(d.pushLight(N),N.castShadow&&d.pushShadow(N))}),x!==V&&x.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(d.pushLight(N),N.castShadow&&d.pushShadow(N))}),d.setupLights();const G=new Set;return x.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const rt=N.material;if(rt)if(Array.isArray(rt))for(let ft=0;ft<rt.length;ft++){const vt=rt[ft];qt(vt,V,N),G.add(vt)}else qt(rt,V,N),G.add(rt)}),d=b.pop(),G},this.compileAsync=function(x,I,V=null){const G=this.compile(x,I,V);return new Promise(N=>{function rt(){if(G.forEach(function(ft){bt.get(ft).currentProgram.isReady()&&G.delete(ft)}),G.size===0){N(x);return}setTimeout(rt,10)}Xt.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let ke=null;function rn(x){ke&&ke(x)}function Zo(){In.stop()}function Jo(){In.start()}const In=new Zu;In.setAnimationLoop(rn),typeof self<"u"&&In.setContext(self),this.setAnimationLoop=function(x){ke=x,et.setAnimationLoop(x),x===null?In.stop():In.start()},et.addEventListener("sessionstart",Zo),et.addEventListener("sessionend",Jo),this.render=function(x,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(I),I=et.getCamera()),x.isScene===!0&&x.onBeforeRender(S,x,I,O),d=ct.get(x,b.length),d.init(I),b.push(d),mt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),$.setFromProjectionMatrix(mt),ht=this.localClippingEnabled,nt=Mt.init(this.clippingPlanes,ht),m=yt.get(x,E.length),m.init(),E.push(m),et.enabled===!0&&et.isPresenting===!0){const rt=S.xr.getDepthSensingMesh();rt!==null&&Ds(rt,I,-1/0,S.sortObjects)}Ds(x,I,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(Y,Z),re=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,re&&tt.addToRenderList(m,x),this.info.render.frame++,nt===!0&&Mt.beginShadows();const V=d.state.shadowsArray;Et.render(V,x,I),nt===!0&&Mt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,N=m.transmissive;if(d.setupLights(),I.isArrayCamera){const rt=I.cameras;if(N.length>0)for(let ft=0,vt=rt.length;ft<vt;ft++){const pt=rt[ft];Qo(G,N,x,pt)}re&&tt.render(x);for(let ft=0,vt=rt.length;ft<vt;ft++){const pt=rt[ft];jo(m,x,pt,pt.viewport)}}else N.length>0&&Qo(G,N,x,I),re&&tt.render(x),jo(m,x,I);O!==null&&A===0&&(Nt.updateMultisampleRenderTarget(O),Nt.updateRenderTargetMipmap(O)),x.isScene===!0&&x.onAfterRender(S,x,I),Lt.resetDefaultState(),y=-1,M=null,b.pop(),b.length>0?(d=b[b.length-1],nt===!0&&Mt.setGlobalState(S.clippingPlanes,d.state.camera)):d=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function Ds(x,I,V,G){if(x.visible===!1)return;if(x.layers.test(I.layers)){if(x.isGroup)V=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(I);else if(x.isLight)d.pushLight(x),x.castShadow&&d.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||$.intersectsSprite(x)){G&&Ct.setFromMatrixPosition(x.matrixWorld).applyMatrix4(mt);const ft=K.update(x),vt=x.material;vt.visible&&m.push(x,ft,vt,V,Ct.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||$.intersectsObject(x))){const ft=K.update(x),vt=x.material;if(G&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Ct.copy(x.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Ct.copy(ft.boundingSphere.center)),Ct.applyMatrix4(x.matrixWorld).applyMatrix4(mt)),Array.isArray(vt)){const pt=ft.groups;for(let Pt=0,Dt=pt.length;Pt<Dt;Pt++){const Tt=pt[Pt],Bt=vt[Tt.materialIndex];Bt&&Bt.visible&&m.push(x,ft,Bt,V,Ct.z,Tt)}}else vt.visible&&m.push(x,ft,vt,V,Ct.z,null)}}const rt=x.children;for(let ft=0,vt=rt.length;ft<vt;ft++)Ds(rt[ft],I,V,G)}function jo(x,I,V,G){const N=x.opaque,rt=x.transmissive,ft=x.transparent;d.setupLightsView(V),nt===!0&&Mt.setGlobalState(S.clippingPlanes,V),G&&St.viewport(L.copy(G)),N.length>0&&pr(N,I,V),rt.length>0&&pr(rt,I,V),ft.length>0&&pr(ft,I,V),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function Qo(x,I,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[G.id]===void 0&&(d.state.transmissionRenderTarget[G.id]=new ni(1,1,{generateMipmaps:!0,type:Xt.has("EXT_color_buffer_half_float")||Xt.has("EXT_color_buffer_float")?or:Mn,minFilter:Zn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Gt.workingColorSpace}));const rt=d.state.transmissionRenderTarget[G.id],ft=G.viewport||L;rt.setSize(ft.z*S.transmissionResolutionScale,ft.w*S.transmissionResolutionScale);const vt=S.getRenderTarget(),pt=S.getActiveCubeFace(),Pt=S.getActiveMipmapLevel();S.setRenderTarget(rt),S.getClearColor(w),B=S.getClearAlpha(),B<1&&S.setClearColor(16777215,.5),S.clear(),re&&tt.render(V);const Dt=S.toneMapping;S.toneMapping=Dn;const Tt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),d.setupLightsView(G),nt===!0&&Mt.setGlobalState(S.clippingPlanes,G),pr(x,V,G),Nt.updateMultisampleRenderTarget(rt),Nt.updateRenderTargetMipmap(rt),Xt.has("WEBGL_multisampled_render_to_texture")===!1){let Bt=!1;for(let Kt=0,oe=I.length;Kt<oe;Kt++){const ee=I[Kt],Jt=ee.object,wt=ee.geometry,se=ee.material,Vt=ee.group;if(se.side===hn&&Jt.layers.test(G.layers)){const Ce=se.side;se.side=we,se.needsUpdate=!0,tl(Jt,V,G,wt,se,Vt),se.side=Ce,se.needsUpdate=!0,Bt=!0}}Bt===!0&&(Nt.updateMultisampleRenderTarget(rt),Nt.updateRenderTargetMipmap(rt))}S.setRenderTarget(vt,pt,Pt),S.setClearColor(w,B),Tt!==void 0&&(G.viewport=Tt),S.toneMapping=Dt}function pr(x,I,V){const G=I.isScene===!0?I.overrideMaterial:null;for(let N=0,rt=x.length;N<rt;N++){const ft=x[N],vt=ft.object,pt=ft.geometry,Pt=ft.group;let Dt=ft.material;Dt.allowOverride===!0&&G!==null&&(Dt=G),vt.layers.test(V.layers)&&tl(vt,I,V,pt,Dt,Pt)}}function tl(x,I,V,G,N,rt){x.onBeforeRender(S,I,V,G,N,rt),x.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),N.onBeforeRender(S,I,V,G,x,rt),N.transparent===!0&&N.side===hn&&N.forceSinglePass===!1?(N.side=we,N.needsUpdate=!0,S.renderBufferDirect(V,I,G,N,x,rt),N.side=Ln,N.needsUpdate=!0,S.renderBufferDirect(V,I,G,N,x,rt),N.side=hn):S.renderBufferDirect(V,I,G,N,x,rt),x.onAfterRender(S,I,V,G,N,rt)}function mr(x,I,V){I.isScene!==!0&&(I=ie);const G=bt.get(x),N=d.state.lights,rt=d.state.shadowsArray,ft=N.state.version,vt=Q.getParameters(x,N.state,rt,I,V),pt=Q.getProgramCacheKey(vt);let Pt=G.programs;G.environment=x.isMeshStandardMaterial?I.environment:null,G.fog=I.fog,G.envMap=(x.isMeshStandardMaterial?T:he).get(x.envMap||G.environment),G.envMapRotation=G.environment!==null&&x.envMap===null?I.environmentRotation:x.envMapRotation,Pt===void 0&&(x.addEventListener("dispose",gt),Pt=new Map,G.programs=Pt);let Dt=Pt.get(pt);if(Dt!==void 0){if(G.currentProgram===Dt&&G.lightsStateVersion===ft)return nl(x,vt),Dt}else vt.uniforms=Q.getUniforms(x),x.onBeforeCompile(vt,S),Dt=Q.acquireProgram(vt,pt),Pt.set(pt,Dt),G.uniforms=vt.uniforms;const Tt=G.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Tt.clippingPlanes=Mt.uniform),nl(x,vt),G.needsLights=rf(x),G.lightsStateVersion=ft,G.needsLights&&(Tt.ambientLightColor.value=N.state.ambient,Tt.lightProbe.value=N.state.probe,Tt.directionalLights.value=N.state.directional,Tt.directionalLightShadows.value=N.state.directionalShadow,Tt.spotLights.value=N.state.spot,Tt.spotLightShadows.value=N.state.spotShadow,Tt.rectAreaLights.value=N.state.rectArea,Tt.ltc_1.value=N.state.rectAreaLTC1,Tt.ltc_2.value=N.state.rectAreaLTC2,Tt.pointLights.value=N.state.point,Tt.pointLightShadows.value=N.state.pointShadow,Tt.hemisphereLights.value=N.state.hemi,Tt.directionalShadowMap.value=N.state.directionalShadowMap,Tt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Tt.spotShadowMap.value=N.state.spotShadowMap,Tt.spotLightMatrix.value=N.state.spotLightMatrix,Tt.spotLightMap.value=N.state.spotLightMap,Tt.pointShadowMap.value=N.state.pointShadowMap,Tt.pointShadowMatrix.value=N.state.pointShadowMatrix),G.currentProgram=Dt,G.uniformsList=null,Dt}function el(x){if(x.uniformsList===null){const I=x.currentProgram.getUniforms();x.uniformsList=is.seqWithValue(I.seq,x.uniforms)}return x.uniformsList}function nl(x,I){const V=bt.get(x);V.outputColorSpace=I.outputColorSpace,V.batching=I.batching,V.batchingColor=I.batchingColor,V.instancing=I.instancing,V.instancingColor=I.instancingColor,V.instancingMorph=I.instancingMorph,V.skinning=I.skinning,V.morphTargets=I.morphTargets,V.morphNormals=I.morphNormals,V.morphColors=I.morphColors,V.morphTargetsCount=I.morphTargetsCount,V.numClippingPlanes=I.numClippingPlanes,V.numIntersection=I.numClipIntersection,V.vertexAlphas=I.vertexAlphas,V.vertexTangents=I.vertexTangents,V.toneMapping=I.toneMapping}function ef(x,I,V,G,N){I.isScene!==!0&&(I=ie),Nt.resetTextureUnits();const rt=I.fog,ft=G.isMeshStandardMaterial?I.environment:null,vt=O===null?S.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Ii,pt=(G.isMeshStandardMaterial?T:he).get(G.envMap||ft),Pt=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Dt=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Tt=!!V.morphAttributes.position,Bt=!!V.morphAttributes.normal,Kt=!!V.morphAttributes.color;let oe=Dn;G.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(oe=S.toneMapping);const ee=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Jt=ee!==void 0?ee.length:0,wt=bt.get(G),se=d.state.lights;if(nt===!0&&(ht===!0||x!==M)){const xe=x===M&&G.id===y;Mt.setState(G,x,xe)}let Vt=!1;G.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==se.state.version||wt.outputColorSpace!==vt||N.isBatchedMesh&&wt.batching===!1||!N.isBatchedMesh&&wt.batching===!0||N.isBatchedMesh&&wt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&wt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&wt.instancing===!1||!N.isInstancedMesh&&wt.instancing===!0||N.isSkinnedMesh&&wt.skinning===!1||!N.isSkinnedMesh&&wt.skinning===!0||N.isInstancedMesh&&wt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&wt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&wt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&wt.instancingMorph===!1&&N.morphTexture!==null||wt.envMap!==pt||G.fog===!0&&wt.fog!==rt||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==Mt.numPlanes||wt.numIntersection!==Mt.numIntersection)||wt.vertexAlphas!==Pt||wt.vertexTangents!==Dt||wt.morphTargets!==Tt||wt.morphNormals!==Bt||wt.morphColors!==Kt||wt.toneMapping!==oe||wt.morphTargetsCount!==Jt)&&(Vt=!0):(Vt=!0,wt.__version=G.version);let Ce=wt.currentProgram;Vt===!0&&(Ce=mr(G,I,N));let ri=!1,Pe=!1,Bi=!1;const ne=Ce.getUniforms(),Ie=wt.uniforms;if(St.useProgram(Ce.program)&&(ri=!0,Pe=!0,Bi=!0),G.id!==y&&(y=G.id,Pe=!0),ri||M!==x){St.buffers.depth.getReversed()?(st.copy(x.projectionMatrix),eg(st),ng(st),ne.setValue(R,"projectionMatrix",st)):ne.setValue(R,"projectionMatrix",x.projectionMatrix),ne.setValue(R,"viewMatrix",x.matrixWorldInverse);const Ee=ne.map.cameraPosition;Ee!==void 0&&Ee.setValue(R,zt.setFromMatrixPosition(x.matrixWorld)),Qt.logarithmicDepthBuffer&&ne.setValue(R,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ne.setValue(R,"isOrthographic",x.isOrthographicCamera===!0),M!==x&&(M=x,Pe=!0,Bi=!0)}if(N.isSkinnedMesh){ne.setOptional(R,N,"bindMatrix"),ne.setOptional(R,N,"bindMatrixInverse");const xe=N.skeleton;xe&&(xe.boneTexture===null&&xe.computeBoneTexture(),ne.setValue(R,"boneTexture",xe.boneTexture,Nt))}N.isBatchedMesh&&(ne.setOptional(R,N,"batchingTexture"),ne.setValue(R,"batchingTexture",N._matricesTexture,Nt),ne.setOptional(R,N,"batchingIdTexture"),ne.setValue(R,"batchingIdTexture",N._indirectTexture,Nt),ne.setOptional(R,N,"batchingColorTexture"),N._colorsTexture!==null&&ne.setValue(R,"batchingColorTexture",N._colorsTexture,Nt));const Ne=V.morphAttributes;if((Ne.position!==void 0||Ne.normal!==void 0||Ne.color!==void 0)&&dt.update(N,V,Ce),(Pe||wt.receiveShadow!==N.receiveShadow)&&(wt.receiveShadow=N.receiveShadow,ne.setValue(R,"receiveShadow",N.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Ie.envMap.value=pt,Ie.flipEnvMap.value=pt.isCubeTexture&&pt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&I.environment!==null&&(Ie.envMapIntensity.value=I.environmentIntensity),Pe&&(ne.setValue(R,"toneMappingExposure",S.toneMappingExposure),wt.needsLights&&nf(Ie,Bi),rt&&G.fog===!0&&q.refreshFogUniforms(Ie,rt),q.refreshMaterialUniforms(Ie,G,F,z,d.state.transmissionRenderTarget[x.id]),is.upload(R,el(wt),Ie,Nt)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(is.upload(R,el(wt),Ie,Nt),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ne.setValue(R,"center",N.center),ne.setValue(R,"modelViewMatrix",N.modelViewMatrix),ne.setValue(R,"normalMatrix",N.normalMatrix),ne.setValue(R,"modelMatrix",N.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const xe=G.uniformsGroups;for(let Ee=0,Ls=xe.length;Ee<Ls;Ee++){const Nn=xe[Ee];D.update(Nn,Ce),D.bind(Nn,Ce)}}return Ce}function nf(x,I){x.ambientLightColor.needsUpdate=I,x.lightProbe.needsUpdate=I,x.directionalLights.needsUpdate=I,x.directionalLightShadows.needsUpdate=I,x.pointLights.needsUpdate=I,x.pointLightShadows.needsUpdate=I,x.spotLights.needsUpdate=I,x.spotLightShadows.needsUpdate=I,x.rectAreaLights.needsUpdate=I,x.hemisphereLights.needsUpdate=I}function rf(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(x,I,V){const G=bt.get(x);G.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),bt.get(x.texture).__webglTexture=I,bt.get(x.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:V,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,I){const V=bt.get(x);V.__webglFramebuffer=I,V.__useDefaultFramebuffer=I===void 0};const sf=R.createFramebuffer();this.setRenderTarget=function(x,I=0,V=0){O=x,C=I,A=V;let G=!0,N=null,rt=!1,ft=!1;if(x){const pt=bt.get(x);if(pt.__useDefaultFramebuffer!==void 0)St.bindFramebuffer(R.FRAMEBUFFER,null),G=!1;else if(pt.__webglFramebuffer===void 0)Nt.setupRenderTarget(x);else if(pt.__hasExternalTextures)Nt.rebindTextures(x,bt.get(x.texture).__webglTexture,bt.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Tt=x.depthTexture;if(pt.__boundDepthTexture!==Tt){if(Tt!==null&&bt.has(Tt)&&(x.width!==Tt.image.width||x.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Nt.setupDepthRenderbuffer(x)}}const Pt=x.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(ft=!0);const Dt=bt.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Dt[I])?N=Dt[I][V]:N=Dt[I],rt=!0):x.samples>0&&Nt.useMultisampledRTT(x)===!1?N=bt.get(x).__webglMultisampledFramebuffer:Array.isArray(Dt)?N=Dt[V]:N=Dt,L.copy(x.viewport),H.copy(x.scissor),X=x.scissorTest}else L.copy(at).multiplyScalar(F).floor(),H.copy(xt).multiplyScalar(F).floor(),X=Ot;if(V!==0&&(N=sf),St.bindFramebuffer(R.FRAMEBUFFER,N)&&G&&St.drawBuffers(x,N),St.viewport(L),St.scissor(H),St.setScissorTest(X),rt){const pt=bt.get(x.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+I,pt.__webglTexture,V)}else if(ft){const pt=bt.get(x.texture),Pt=I;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,pt.__webglTexture,V,Pt)}else if(x!==null&&V!==0){const pt=bt.get(x.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,pt.__webglTexture,V)}y=-1},this.readRenderTargetPixels=function(x,I,V,G,N,rt,ft,vt=0){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pt=bt.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ft!==void 0&&(pt=pt[ft]),pt){St.bindFramebuffer(R.FRAMEBUFFER,pt);try{const Pt=x.textures[vt],Dt=Pt.format,Tt=Pt.type;if(!Qt.textureFormatReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Qt.textureTypeReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=x.width-G&&V>=0&&V<=x.height-N&&(x.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+vt),R.readPixels(I,V,G,N,ot.convert(Dt),ot.convert(Tt),rt))}finally{const Pt=O!==null?bt.get(O).__webglFramebuffer:null;St.bindFramebuffer(R.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(x,I,V,G,N,rt,ft,vt=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pt=bt.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ft!==void 0&&(pt=pt[ft]),pt)if(I>=0&&I<=x.width-G&&V>=0&&V<=x.height-N){St.bindFramebuffer(R.FRAMEBUFFER,pt);const Pt=x.textures[vt],Dt=Pt.format,Tt=Pt.type;if(!Qt.textureFormatReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Qt.textureTypeReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Bt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Bt),R.bufferData(R.PIXEL_PACK_BUFFER,rt.byteLength,R.STREAM_READ),x.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+vt),R.readPixels(I,V,G,N,ot.convert(Dt),ot.convert(Tt),0);const Kt=O!==null?bt.get(O).__webglFramebuffer:null;St.bindFramebuffer(R.FRAMEBUFFER,Kt);const oe=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await tg(R,oe,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Bt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,rt),R.deleteBuffer(Bt),R.deleteSync(oe),rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,I=null,V=0){const G=Math.pow(2,-V),N=Math.floor(x.image.width*G),rt=Math.floor(x.image.height*G),ft=I!==null?I.x:0,vt=I!==null?I.y:0;Nt.setTexture2D(x,0),R.copyTexSubImage2D(R.TEXTURE_2D,V,0,0,ft,vt,N,rt),St.unbindTexture()};const af=R.createFramebuffer(),of=R.createFramebuffer();this.copyTextureToTexture=function(x,I,V=null,G=null,N=0,rt=null){rt===null&&(N!==0?(Ti("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),rt=N,N=0):rt=0);let ft,vt,pt,Pt,Dt,Tt,Bt,Kt,oe;const ee=x.isCompressedTexture?x.mipmaps[rt]:x.image;if(V!==null)ft=V.max.x-V.min.x,vt=V.max.y-V.min.y,pt=V.isBox3?V.max.z-V.min.z:1,Pt=V.min.x,Dt=V.min.y,Tt=V.isBox3?V.min.z:0;else{const Ne=Math.pow(2,-N);ft=Math.floor(ee.width*Ne),vt=Math.floor(ee.height*Ne),x.isDataArrayTexture?pt=ee.depth:x.isData3DTexture?pt=Math.floor(ee.depth*Ne):pt=1,Pt=0,Dt=0,Tt=0}G!==null?(Bt=G.x,Kt=G.y,oe=G.z):(Bt=0,Kt=0,oe=0);const Jt=ot.convert(I.format),wt=ot.convert(I.type);let se;I.isData3DTexture?(Nt.setTexture3D(I,0),se=R.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(Nt.setTexture2DArray(I,0),se=R.TEXTURE_2D_ARRAY):(Nt.setTexture2D(I,0),se=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,I.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,I.unpackAlignment);const Vt=R.getParameter(R.UNPACK_ROW_LENGTH),Ce=R.getParameter(R.UNPACK_IMAGE_HEIGHT),ri=R.getParameter(R.UNPACK_SKIP_PIXELS),Pe=R.getParameter(R.UNPACK_SKIP_ROWS),Bi=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,ee.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ee.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Pt),R.pixelStorei(R.UNPACK_SKIP_ROWS,Dt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Tt);const ne=x.isDataArrayTexture||x.isData3DTexture,Ie=I.isDataArrayTexture||I.isData3DTexture;if(x.isDepthTexture){const Ne=bt.get(x),xe=bt.get(I),Ee=bt.get(Ne.__renderTarget),Ls=bt.get(xe.__renderTarget);St.bindFramebuffer(R.READ_FRAMEBUFFER,Ee.__webglFramebuffer),St.bindFramebuffer(R.DRAW_FRAMEBUFFER,Ls.__webglFramebuffer);for(let Nn=0;Nn<pt;Nn++)ne&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,bt.get(x).__webglTexture,N,Tt+Nn),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,bt.get(I).__webglTexture,rt,oe+Nn)),R.blitFramebuffer(Pt,Dt,ft,vt,Bt,Kt,ft,vt,R.DEPTH_BUFFER_BIT,R.NEAREST);St.bindFramebuffer(R.READ_FRAMEBUFFER,null),St.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(N!==0||x.isRenderTargetTexture||bt.has(x)){const Ne=bt.get(x),xe=bt.get(I);St.bindFramebuffer(R.READ_FRAMEBUFFER,af),St.bindFramebuffer(R.DRAW_FRAMEBUFFER,of);for(let Ee=0;Ee<pt;Ee++)ne?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ne.__webglTexture,N,Tt+Ee):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Ne.__webglTexture,N),Ie?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,xe.__webglTexture,rt,oe+Ee):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,xe.__webglTexture,rt),N!==0?R.blitFramebuffer(Pt,Dt,ft,vt,Bt,Kt,ft,vt,R.COLOR_BUFFER_BIT,R.NEAREST):Ie?R.copyTexSubImage3D(se,rt,Bt,Kt,oe+Ee,Pt,Dt,ft,vt):R.copyTexSubImage2D(se,rt,Bt,Kt,Pt,Dt,ft,vt);St.bindFramebuffer(R.READ_FRAMEBUFFER,null),St.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else Ie?x.isDataTexture||x.isData3DTexture?R.texSubImage3D(se,rt,Bt,Kt,oe,ft,vt,pt,Jt,wt,ee.data):I.isCompressedArrayTexture?R.compressedTexSubImage3D(se,rt,Bt,Kt,oe,ft,vt,pt,Jt,ee.data):R.texSubImage3D(se,rt,Bt,Kt,oe,ft,vt,pt,Jt,wt,ee):x.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,rt,Bt,Kt,ft,vt,Jt,wt,ee.data):x.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,rt,Bt,Kt,ee.width,ee.height,Jt,ee.data):R.texSubImage2D(R.TEXTURE_2D,rt,Bt,Kt,ft,vt,Jt,wt,ee);R.pixelStorei(R.UNPACK_ROW_LENGTH,Vt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Ce),R.pixelStorei(R.UNPACK_SKIP_PIXELS,ri),R.pixelStorei(R.UNPACK_SKIP_ROWS,Pe),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Bi),rt===0&&I.generateMipmaps&&R.generateMipmap(se),St.unbindTexture()},this.copyTextureToTexture3D=function(x,I,V=null,G=null,N=0){return Ti('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(x,I,V,G,N)},this.initRenderTarget=function(x){bt.get(x).__webglFramebuffer===void 0&&Nt.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?Nt.setTextureCube(x,0):x.isData3DTexture?Nt.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?Nt.setTexture2DArray(x,0):Nt.setTexture2D(x,0),St.unbindTexture()},this.resetState=function(){C=0,A=0,O=null,St.reset(),Lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Gt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Gt._getUnpackColorSpace()}}const SS="/video_feed";function yS(){const{status:n,brightness:t}=ze(),e=Ji(),i=Ji();return gn(()=>{if(n.imu){const[r,s,a,o]=n.imu;box_parent.quaternion.set(s,a,o,r),box_parent.rotateOnWorldAxis(new W(0,0,1),Math.PI/2)}},[n.imu]),gn(()=>{ES(i)},[]),gn(()=>{const r=()=>e.current.src=SS+"?t="+Date.now();setInterval(r,3*1e3),r()},[]),j("div",{ref:i,class:"visualization",children:[j("img",{ref:e,style:`filter: brightness(${t})`,src:"",alt:"",class:"video-frame"}),j("div",{class:"crosshair hidden vertical"}),j("div",{class:"crosshair hidden horizontal"})]})}function ES(n){const t=new MS({alpha:!0,antialias:!0});t.setSize(150,150),n.current.appendChild(t.domElement);const e=new Rg,i=new Be(75,t.domElement.width/t.domElement.height,.1,1e3);i.position.set(0,-2,0),i.lookAt(0,0,0);let r=new Yi,s=new dr;const a=new ca({color:65280}),o=new ca({color:16711680}),l=new ca({color:255}),c=new Se(s,a);c.rotateX(-Math.PI/2),c.position.y=.5,r.add(c);const f=new Se(s,a);f.rotateX(Math.PI/2),f.position.y=-.5,r.add(f);const u=new Se(s,l);u.rotateY(Math.PI),u.position.z=-.5,r.add(u);const h=new Se(s,l);h.position.z=.5,r.add(h);const p=new Se(s,o);p.rotateY(Math.PI/2),p.position.x=.5,r.add(p);const _=new Se(s,o);_.rotateY(-Math.PI/2),_.position.x=-.5,r.add(_),e.add(r);const v=new Fg(13421772);e.add(v);function m(){requestAnimationFrame(m),t.render(e,i)}m()}function _a(n){return n?"ok":"err"}function TS(n){return n?"warn":""}function bS(){const{status:n}=ze(),t=n?.pos?.sr||0,e=n?.pos?.x*t||0,i=n?.pos?.y*t||0,r=Math.sqrt(e*e+i*i);let s="Módulo Offline";return n.rpi5&&(s=`Módulo Online
`,s+=`Versão ${n.version}
`,s+=`${n.modo==="Download"?n.estado:"Estado "+n.estado}
`,s+=n.modo==="Odometro"?"Pos: ("+e.toFixed(1)+", "+i.toFixed(1)+`)
`:"",s+=n.modo==="Odometro"?"Dist: "+r.toFixed(2)+`
`:"",s+=`IP: ${n.rpi5.ip}
`,s+=`Temp: ${n.rpi5.temp?.toFixed(2)} ℃
`,s+=n.display?"":"Display não encontrado"),j("div",{class:"monitoramento",children:[j("div",{children:"Monitoramento"}),j("div",{className:`status rpi5 ${_a(n.rpi5)} ${TS(n.rpi5.temp>75)}`,children:s}),j("div",{className:`status camera ${_a(n.camera)}`,children:"Picam"}),j("div",{className:`status imu ${_a(n.imu)}`,children:"IMU"})]})}function wS(){const{brightness:n,set_brightness:t,set_points:e,set_modal:i,status:r}=ze(),[s,a]=Je(10),[o,l]=Je(""),c=async m=>{await Ol(),e([])},f=()=>{document.querySelectorAll(".crosshair").forEach(m=>m.classList.toggle("hidden"))},u=m=>{r.camera?Ym():qm()},h=async()=>{await Ol(),e([]);const m=parseInt(s);Xm(m,o)},p=()=>{$m()},_=r.estado==="Ready",v=r.estado?.startsWith("Aquisicao");return j("div",{class:"controles",children:[j("label",{class:"brilho",children:[j("div",{children:"Brilho:"}),j("input",{type:"button",value:"Reset",onClick:()=>t(1)}),j("input",{type:"range",min:"0",max:"10",step:"0.05",value:n,onInput:m=>t(m.target.value)})]}),j("button",{class:"row-3 col-1 span-2",onClick:m=>Zm(),disabled:!_,children:"Calibrar Exposição"}),j("button",{class:"row-4 col-1 span-2",onClick:()=>i("calibracao"),disabled:!_,children:"Calibrar Resolução"}),r.modo==="Tempo"?j("label",{class:"row-3 col-3 span-2 text-label",children:[j("div",{children:"Pulsos/s:"}),j("input",{type:"number",value:s,onInput:m=>a(m.target.value),disabled:!_})]}):j("button",{class:"row-3 col-3 span-2",onClick:c,children:" Zerar deslocamento "}),j("label",{class:"row-3 col-5 span-5 text-label",children:[j("div",{children:"Nome da aquisição:"}),j("input",{type:"text",value:o,onInput:m=>l(m.target.value),placeholder:"Opcional",disabled:!_})]}),j("button",{class:"row-5 col-1 span-2",onClick:h,disabled:!_,children:" Iniciar Aquisição "}),j("button",{class:"row-5 span-2",onClick:p,disabled:!v,children:" Parar Aquisição "}),j("button",{class:"row-3 col-11 span-2",onClick:()=>i("download"),disabled:!_,children:" Baixar Ensaios Gravados "}),j("button",{class:"row-4 col-11 span-2",onClick:u,disabled:!_,children:" Toggle Streaming "}),j("button",{class:"row-5 col-11 span-2",onClick:f,children:" Toggle Alinhamento "}),j("button",{class:"row-5 col-8 span-2",onClick:()=>i("modo"),disabled:!_,children:" Mudar modo "}),j("button",{class:"row-3 col-13 span-2",onClick:()=>i("upgrade"),disabled:!_,children:" Atualizar Software "}),j("button",{class:"row-5 col-13 span-2",onClick:()=>i("reiniciar"),disabled:!_,children:" Reiniciar "}),j("button",{class:"row-4 col-13 span-2",onClick:()=>i("desligar"),disabled:!_,children:" Desligar "})]})}function AS(){const n={version:"",rpi5:!1,display:!1,camera:!1,imu:!1,pos:{x:0,y:0,sr:1},modo:"Desligado",estado:"",msg:""},[t,e]=Je(n),[i,r]=Je(1),[s,a]=Je([]),[o,l]=Je([]),[c,f]=Je(null),u={status:t,set_status:e,brightness:i,set_brightness:r,log:s,set_log:a,points:o,set_points:l,modal:c,set_modal:f};return gn(()=>jm(e,n),[]),j("div",{class:"wrapper",children:j(Yc.Provider,{value:u,children:[j(yS,{}),j(bS,{}),j(Wm,{}),j(wS,{}),j(u_,{})]})})}mf(j(AS,{}),document.getElementById("app"));
