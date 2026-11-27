// Music-only discovery and queue guard. External YouTube Music never enters audio queue.
const nonMusic123=/\b(podcast|audiobook|audio book|interview|fact[ -]?checking|news bulletin|news report|episode|sermon|lecture|spoken word|talk show|sound effects|field recording|documentary|press conference|speech)\b/i;
function song123(t){if(!t||!t.title||nonMusic123.test([t.title,t.genre,t.artist].join(' ')))return false;if(t.blob)return true;return ['Audius','Jamendo'].includes(t.kind)&&!!safeURL(t.url);}
const provider123=providers87;providers87=async function(q,page=0){const r=await provider123(q,page);return {...r,items:r.items.filter(song123)};};
const rows123=rows;rows=function(items){return rows123(items.filter(song123));};
const play123=play;play=async function(t){if(!song123(t)){internal86=false;status('Music only: unsupported or non-music recording skipped.');return;}queue=queue.filter(song123);audioQueue=audioQueue.filter(song123);await play123(t);audioQueue=audioQueue.filter(song123);};
const step123=step;step=async function(d){audioQueue=audioQueue.filter(song123);queue=queue.filter(song123);if(!audioQueue.length&&!queue.length){status('No eligible songs in queue');return;}return step123(d);};
const next123=next94;next94=function(){const t=next123();return song123(t)?t:null;};
// Disable unclassified Archive results and use filtered artist extension.
save('archive95',false);
extend86=function(t,token){if(pending86)return pending86;pending86=(async()=>{try{const r=await providers87(t.artist||t.title);if(token!==epoch86||!auto86)return;const artist=norm105(t.artist);const related=r.items.filter(x=>artist&&norm105(x.artist)===artist);audioQueue=unique87([...audioQueue.filter(song123),...related]).slice(0,100);}catch{}finally{if(token===epoch86)pending86=null;}})();return pending86;};
const render123=render;render=function(){render123();if(tab==='Discover'){const p=$('panel');p.insertAdjacentHTML('beforeend','<section><h3>YouTube Music</h3><small>Search the official music service. Playback opens externally.</small><button id="ytmusic123">Search in YouTube Music ↗</button><p><small>Music-only mode is active. Unclassified sources and spoken-word matches are excluded.</small></p></section>');}if(tab==='More'||tab==='Settings'){const a=$('archive95');if(a){a.checked=false;a.disabled=true;} $('panel').insertAdjacentHTML('beforeend','<section><h3>Music-only playback</h3><p>Music catalogue tracks and imported files only. Radio and unclassified Archive recordings are excluded.</p></section>');}};
document.addEventListener('click',e=>{if(e.target.closest('#ytmusic123')){const q=$('query')?.value.trim()||'';window.open('https://music.youtube.com/'+(q?'search?q='+encodeURIComponent(q):''),'_blank','noopener');}});
render();
