function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},r=t.parcelRequire555a;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},t.parcelRequire555a=r);var i=r("3479m");const a=()=>{const e=document.querySelector(".lds-ring");e&&e.classList.remove("is-hidden")},c=()=>{const e=document.querySelector(".lds-ring");e&&e.classList.add("is-hidden")};r("b374K");i=r("3479m");var s=r("b374K"),l=r("g9R5y");const d=new(0,s.UserMovies),u=e=>{const t=document.querySelector(".backdrop"),n=document.querySelector(".modal__btn-close"),o=document.querySelector(".modal__photo"),r=document.querySelector(".modal__title"),a=document.querySelector(".modal__stats-vote"),c=document.querySelector(".modal__stats-votes"),s=document.querySelector(".modal__popularity"),u=document.querySelector(".modal__film-title"),p=document.querySelector(".modal__genre"),m=document.querySelector(".modal__about-text");t.classList.remove("is-hidden");const f=e.poster_path?`${i.IMG_URL}${e.poster_path}`:"https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png",v=e.poster_path?e.original_title:"Poster Not Found";o.innerHTML=`<img class="posters__img" src="${f}" alt="${v}"/>`,r.innerHTML=`${e.original_title}`,a.innerHTML=`${e.vote_average}`,c.innerHTML=`${e.vote_count}`,s.innerHTML=`${e.popularity}`,u.innerHTML=`${e.original_title}`,m.innerHTML=`${e.overview}`;const{genre_ids:_}=e,y=_.map((e=>{const t=l.genres.find((t=>t.id===e));return t?t.name:""})).join(", ");p.innerHTML=y;const h=window.location.pathname;console.log(h),"/index.html"===h?document.querySelector(".modal__info-buttons").style.display="block":"/library.html"===h&&(document.querySelector(".modal__info-buttons").style.display="none");const w=document.querySelector("#modal__button-watched"),g=document.querySelector("#modal__button-queue");w.addEventListener("click",(()=>d.addToWatch(e))),g.addEventListener("click",(()=>d.addToQueue(e))),n.addEventListener("click",(()=>{t.classList.add("is-hidden");document.getElementById("modal__trailer-video").src=""})),window.addEventListener("keyup",(e=>{"Escape"===e.key&&t.classList.add("is-hidden")})),window.addEventListener("keyup",(e=>{"Escape"===e.key&&t.classList.add("is-hidden")})),window.addEventListener("click",(e=>{e.target.classList.contains("backdrop")&&t.classList.add("is-hidden")}))};i=r("3479m"),s=r("b374K"),l=r("g9R5y");var p,m=r("7IoHk"),f={};f=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)};var v,_={},y={};v="object"==typeof t&&t&&t.Object===Object&&t;var h="object"==typeof self&&self&&self.Object===Object&&self,w=v||h||Function("return this")();_=function(){return y.Date.now()};var g={},$={},b={},L=/\s/;b=function(e){for(var t=e.length;t--&&L.test(e.charAt(t)););return t};var E=/^\s+/;$=function(e){return e?e.slice(0,b(e)+1).replace(E,""):e};var T,S={},k={};T=(y=w).Symbol;var q={},j=Object.prototype,N=j.hasOwnProperty,M=j.toString,x=T?T.toStringTag:void 0;q=function(e){var t=N.call(e,x),n=e[x];try{e[x]=void 0;var o=!0}catch(e){}var r=M.call(e);return o&&(t?e[x]=n:delete e[x]),r};var O={},A=Object.prototype.toString;O=function(e){return A.call(e)};var H=T?T.toStringTag:void 0;k=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":H&&H in Object(e)?q(e):O(e)};var I={};I=function(e){return null!=e&&"object"==typeof e};S=function(e){return"symbol"==typeof e||I(e)&&"[object Symbol]"==k(e)};var U=/^[-+]0x[0-9a-f]+$/i,P=/^0b[01]+$/i,G=/^0o[0-7]+$/i,K=parseInt;g=function(e){if("number"==typeof e)return e;if(S(e))return NaN;if(f(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=f(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=$(e);var n=P.test(e);return n||G.test(e)?K(e.slice(2),n?2:8):U.test(e)?NaN:+e};var R=Math.max,Y=Math.min;p=function(e,t,n){var o,r,i,a,c,s,l=0,d=!1,u=!1,p=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function m(t){var n=o,i=r;return o=r=void 0,l=t,a=e.apply(i,n)}function v(e){var n=e-s;return void 0===s||n>=t||n<0||u&&e-l>=i}function y(){var e=_();if(v(e))return h(e);c=setTimeout(y,function(e){var n=t-(e-s);return u?Y(n,i-(e-l)):n}(e))}function h(e){return c=void 0,p&&o?m(e):(o=r=void 0,a)}function w(){var e=_(),n=v(e);if(o=arguments,r=this,s=e,n){if(void 0===c)return function(e){return l=e,c=setTimeout(y,t),d?m(e):a}(s);if(u)return clearTimeout(c),c=setTimeout(y,t),m(s)}return void 0===c&&(c=setTimeout(y,t)),a}return t=g(t)||0,f(n)&&(d=!!n.leading,i=(u="maxWait"in n)?R(g(n.maxWait)||0,t):i,p="trailing"in n?!!n.trailing:p),w.cancel=function(){void 0!==c&&clearTimeout(c),l=0,o=s=r=c=void 0},w.flush=function(){return void 0===c?a:h(_())},w};e(m).Notify.init({width:"280px",position:"center-top",timeout:4e3,closeButton:!1,distance:"25px",borderRadius:"10px",fontSize:"18px"});const F=new(0,s.UserMovies),D=`${i.URL}/search/movie?api_key=${i.API_KEY}&query=`,B=document.querySelector("#form"),z=document.querySelector("#search"),W=document.querySelector(".movies-container");async function C(t){try{const o=await fetch(t);if(!o.ok)throw new(e(m).Notify.warning)("Sorry, the server is not responding. Please try again later.");const r=await o.json();if(0===r.results.length)throw new(e(m).Notify.failure)("MOVIE  NOT  FOUND");n=r.results,W.innerHTML="",n.forEach((e=>{const{original_title:t,poster_path:n,vote_average:o,release_date:r,genre_ids:a}=e,c=document.createElement("div");c.classList.add("card"),c.id="card";const s=a.map((e=>{const t=l.genres.find((t=>t.id===e));return t?t.name:""})).join(", "),d=n?`${i.IMG_URL}${n}`:"https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png",p=n?t:"Poster Not Found";c.innerHTML=`\n        <img class="card__poster" src="${d}" alt="${p}" title="${t}" />\n        <div class="card__content">\n          <div class="card__info">\n            <div class="card__title">${t}</div>\n            <div class="card__genre">${s} |</div>\n            <div class="card__release">${r.slice(0,4)} </div>\n          </div>\n        </div>\n      </div>`,W.appendChild(c),c.addEventListener("click",(async()=>{u(e),await Q(e.id)}));const m=document.querySelector("#modal__button-watched"),f=document.querySelector("#modal__button-queue");m.addEventListener("click",(()=>F.addToWatch(e))),f.addEventListener("click",(()=>F.addToQueue(e)))}))}catch(e){console.log("MOVIE  NOT  FOUND")}var n}null!==B&&B.addEventListener("input",e(p)((e=>{e.preventDefault();const t=z.value;t&&""!==t?C(D+t):window.location.reload()}),1e3));const Q=async e=>{const t={method:"GET",headers:{accept:"application/json",Authorization:`Bearer ${i.API_KEY}`}};try{const n=await fetch(`https://api.themoviedb.org/3/movie/${e}/videos?language=${i.LANGUAGE}&api_key=${i.API_KEY}`,t);if(!n.ok)throw new Error("Network response was not ok");const o=await n.json(),{results:r}=o,a=`https://www.youtube.com/embed/${r[0].key}`;document.querySelector(".modal__trailer").innerHTML=`<iframe id="modal__trailer-video" width="373" height="210" src="${a}" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`}catch(e){console.error(e)}};m=r("7IoHk");(async()=>{let t=1,n=0;const o={method:"GET",headers:{accept:"application/json",Authorization:`Bearer ${i.API_KEY}`}},r=async t=>{try{a();const e=await fetch(`${i.URL}movie/popular?language=${i.LANGUAGE}&page=${t}&api_key=${i.API_KEY}`,o),n=await e.json();return c(),n}catch(t){e(m).Notify.failure("Sorry, the server is not responding. Please try again later.")}},s=async()=>{try{const e=await fetch(`${i.URL}genre/movie/list?api_key=${i.API_KEY}`,o);return(await e.json()).genres}catch(t){e(m).Notify.failure("Sorry, the server is not responding. Please try again later.")}},l=async()=>{c();const{scrollTop:e,clientHeight:o,scrollHeight:i}=document.documentElement;if(e+o>=i-10){window.removeEventListener("scroll",l),t++;const e=await s(),o=(await r(t)).results.map((t=>{const n=t.genre_ids,o=[];for(let t=0;t<n.length;t++)for(let r=0;r<e.length;r++)n[t]===e[r].id&&o.push(e[r].name);return t.genres=o,t}));d(o),t<n&&window.addEventListener("scroll",l)}},d=e=>{e.forEach((e=>{const t=document.createElement("div");t.className="card",t.id="card";const n=e.poster_path?`${i.IMG_URL}${e.poster_path}`:"https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png",o=e.poster_path?e.original_title:"Poster Not Found";t.innerHTML=`\n          <img class="card__poster" src="${n}" alt="${o}" title="${e.original_title}" />\n        </div>\n        <div class="card__content">\n          <div class="card__info">\n            <div class="card__title">${e.original_title}</div>\n            <div class="card__genre">${e.genres.join(", ")} |</div>\n            <div class="card__release">${e.release_date.slice(0,4)}</div>\n          </div>\n        </div>`;const r=document.querySelector("#gallery");r&&(r.appendChild(t),t.addEventListener("click",(async()=>{u(e),await V(e.id)})))}))};await(async()=>{const e=await s(),o=await r(t),i=o.results.map((t=>{const n=t.genre_ids,o=[];for(let t=0;t<n.length;t++)for(let r=0;r<e.length;r++)n[t]===e[r].id&&o.push(e[r].name);return t.genres=o,t}));d(i),n=o.total_pages,t<n&&window.addEventListener("scroll",l)})()})();const V=async e=>{const t={method:"GET",headers:{accept:"application/json",Authorization:`Bearer ${i.API_KEY}`}};try{const n=await fetch(`https://api.themoviedb.org/3/movie/${e}/videos?language=${i.LANGUAGE}&api_key=${i.API_KEY}`,t);if(!n.ok)throw new Error("Network response was not ok");const o=await n.json(),{results:r}=o,a=`https://www.youtube.com/embed/${r[0].key}`;document.querySelector(".modal__trailer").innerHTML=`<iframe id="modal__trailer-video" width="373" height="210" src="${a}" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`}catch(e){console.error(e)}};
//# sourceMappingURL=index.1310bd96.js.map
