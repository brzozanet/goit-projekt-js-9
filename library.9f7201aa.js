var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},r={},n=e.parcelRequire555a;null==n&&((n=function(e){if(e in i)return i[e].exports;if(e in r){var n=r[e];delete r[e];var d={id:e,exports:{}};return i[e]=d,n.call(d.exports,d,d.exports),d.exports}var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}).register=function(e,i){r[e]=i},e.parcelRequire555a=n);var d=n("3479m");n("b374K");var t=n("40lI0");n("7IoHk");let a=JSON.parse(localStorage.getItem("watched-movies")),l=JSON.parse(localStorage.getItem("queued-movies"));const s=document.querySelector("#library-watched"),c=document.querySelector("#library-queued");if(a&&Array.isArray(a)){(e=>{e.forEach((e=>{const i=document.createElement("div");i.className="card",i.innerHTML=`\n          <div id="card" class="card" >\n            <img class="card__poster" src="${d.IMG_URL}${e.poster_path}" alt="${e.original_title}" title="${e.original_title}" />\n          </div>\n          <div class="card__content">\n            <div class="card__info">\n              <div class="card__title">${e.original_title}</div>\n              <div class="card__genre">${e.genres.join(", ")} |</div>\n              <div class="card__release">${e.release_date.slice(0,4)}</div>\n            </div>\n          </div>`,i.addEventListener("click",(()=>{(0,t.modalBoxShow)(e)})),s.appendChild(i),s.classList.remove("hiddenColor")}))})(a)}else{const e=document.createElement("div");e.innerHTML='\n    <p class="library__title">\n        <strong>You have no watched movies.</strong><br /><a href="index.html">Select first movie</a> and click "Add to watched" button.\n    </p>',s.appendChild(e)}if(l&&Array.isArray(l)){(e=>{e.forEach((e=>{const i=document.createElement("div");i.className="card",i.innerHTML=`\n          <div id="card" class="card" >\n            <img class="card__poster" src="${d.IMG_URL}${e.poster_path}" alt="${e.original_title}" title="${e.original_title}" />\n          </div>\n          <div class="card__content">\n            <div class="card__info">\n              <div class="card__title">${e.original_title}</div>\n              <div class="card__genre">${e.genres.join(", ")} |</div>\n              <div class="card__release">${e.release_date.slice(0,4)}</div>\n            </div>\n          </div>`,i.addEventListener("click",(()=>{(0,t.modalBoxShow)(e)})),c.appendChild(i),c.classList.remove("hiddenColor")}))})(l)}else{const e=document.createElement("div");e.innerHTML='\n    <p class="library__title">\n        <strong>You have no queued movies.</strong><br /><a href="index.html">Select first movie</a> and click "Add to queue" button.\n    </p>',c.appendChild(e)}const o=document.querySelector("#button-watched"),v=document.querySelector("#button-queue"),u=document.querySelector("#library-watched"),_=document.querySelector("#library-queued"),m=document.querySelector("#library-info");o.addEventListener("click",(()=>{u.classList.remove("hidden-in-library"),_.classList.add("hidden-in-library"),m.classList.add("hidden-in-library")})),v.addEventListener("click",(()=>{u.classList.add("hidden-in-library"),_.classList.remove("hidden-in-library"),m.classList.add("hidden-in-library")}));
//# sourceMappingURL=library.9f7201aa.js.map
