// Independent implementation of the persistent audio / Media Session pattern.
const adapter145='musicifyAdapter145';
const oldResolve145=resolve140;
resolve140=async function(t){
 if(localStorage.getItem(adapter145)!=='adaptive')return oldResolve145(t);
 const base=endpoint140(localStorage.getItem(stream140Key)||'');
 if(!base)throw Error('Configure a permitted adaptive-format provider in Settings');
 if(!/^[\w-]{11}$/.test(t.id))throw Error('Invalid song ID');
 base.pathname=base.pathname.replace(/\/$/,'')+'/api/v1/videos/'+t.id;
 const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),120000);
 try{
 const r=await fetch(base,{signal:ctrl.signal,credentials:'omit',headers:{Accept:'application/json'}});
 if(!r.ok)throw Error('Provider HTTP '+r.status);
 const j=await r.json();
 const formats=(Array.isArray(j.adaptiveFormats)?j.adaptiveFormats:[]).map(f=>({url:f.url,mimeType:f.type,bitrate:Number(f.bitrate)||0}));
 const f=choose140(formats,quality141());if(!f)throw Error('No iPhone-compatible audio format');
 const track={id:'provider:'+t.id,providerId:t.id,title:t.title,artist:t.channel||'',kind:'Licensed audio',url:f.url,art:'https://i.ytimg.com/vi/'+t.id+'/hqdefault.jpg'};
 if(!song123(track))throw Error('Music validation failed');return track;
 }finally{clearTimeout(timer)}
};
const render145=render;render=function(){render145();if(!['More','Settings'].includes(tab))return;const p=$('panel'),s=document.createElement('section');s.innerHTML='<h3>14.5 · Playback adapter</h3><p>Use an audio provider you have permission to access. Adaptive mode accepts an Invidious-compatible API base URL in the existing provider field. No provider is bundled.</p><label>Provider format <select id="adapter145"><option value="licensed">Musicify authorised JSON</option><option value="adaptive">Adaptive formats API</option></select></label><p id="state145" role="status"></p>';p.append(s);$('adapter145').value=localStorage.getItem(adapter145)||'licensed';$('adapter145').onchange=()=>{localStorage.setItem(adapter145,$('adapter145').value);stop141();$('state145').textContent='Saved. Configure provider endpoint above.'};};
// Keep native media controls in sync with the actual audio element.
for(const event of ['playing','pause','loadedmetadata','seeked','ratechange','timeupdate'])audio.addEventListener(event,()=>{if(!ytCurrent)session132()});
audio.preload='auto';render();
