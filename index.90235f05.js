(()=>{const e={method:"GET",headers:{accept:"application/json",Authorization:"Bearer b7287b7e99d21f8e33dbc27c867ef458"}},o=document.querySelector("#movies-container-index");(async()=>{const a=await(async()=>{try{const o=await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",e);return(await o.json()).results}catch(e){console.error(e)}})();console.log(a),a.forEach((e=>{o.innerHTML+=`<div class="movie-placeholder">${e.original_title}</div>`}))})()})();
//# sourceMappingURL=index.90235f05.js.map
