// Presentation only: keep the tested audio engine and storage intact.
function fold148(title,nodes,parent){nodes=nodes.filter(Boolean);if(!nodes.length)return;const d=document.createElement('details');d.className='fold148';const s=document.createElement('summary');s.textContent=title;d.append(s,...nodes);parent.append(d);return d;}
function heading148(text){const h=document.createElement('h2');h.textContent=text;return h;}
const render148=render;
render=function(){render148();const p=$('panel');if(!p)return;
if(tab==='Home'){
 const head=p.querySelector('.home85head'), art=p.querySelector('.art100'), quick=p.querySelector('.quick'), genres=p.querySelector('.genres'), hero=p.querySelector('.feature100'), mixes=p.querySelector('.hub142');
 const resume=$('resume130')?.closest('section');if(resume&&/\b(collection|compilation|non.?stop|full album|super hit songs)\b/i.test(resume130?.track?.title||''))resume.remove();
 if(head)p.prepend(head);if(quick&&head)head.after(quick);if(art&&quick){quick.after(heading148('Recently played & saved'),art);const old=[...p.querySelectorAll(':scope > h2')].filter(h=>/Recently saved|Recently played & saved/.test(h.textContent));old.filter(h=>h.nextElementSibling!==art).forEach(h=>h.remove());}
 if(mixes){mixes.querySelector('h2').textContent='Made for you';mixes.classList.add('mix148');if(art)art.after(mixes);}
 if(hero)p.append(hero);const extra=[...p.children].filter(n=>n.matches('.hub120')||n.querySelector('#mix105'));fold148('More discovery',extra,p);
}
if(tab==='Discover'){
 const q=$('query'),out=$('results'),yt=$('ytOut130');if(q&&out&&yt){const s=q.closest('section');s.classList.add('search148');const title=[...s.querySelectorAll('h3')].find(h=>h.textContent==='YouTube Music');title?.remove();$('ytHint143')?.remove();s.querySelector('[data-tab="More"]')?.remove();const label=document.createElement('h3');label.id='audioLabel148';label.textContent='Playable songs';out.before(label);const yl=document.createElement('h3');yl.id='ytLabel148';yl.textContent='YouTube Music · discovery';yt.before(yl);label.hidden=yl.hidden=true;out.hidden=false;yt.hidden=false;const settings=document.createElement('button');settings.dataset.tab='More';settings.className='sub148';settings.textContent='Music settings';s.append(settings);q.addEventListener('input',()=>{m84seq++;searchToken143++;});}
}
if(tab==='Library'){
 const tools=$('cleanup142')?.closest('section'), history=$('history120')?.closest('section'), offline=$('offlineSummary109')?.closest('section'), backup=$('backup130')?.closest('section'), add=p.querySelector('.librarytools100');
 const top=heading148('Your Library');[...p.querySelectorAll(':scope > h2')].filter(h=>h.textContent==='Your Library').forEach(h=>h.remove());p.prepend(top);
 const shortcuts=document.createElement('div');shortcuts.className='lib148';shortcuts.innerHTML='<button data-tab="Playlists">♥ Favourites & playlists</button><button id="downloads148">↓ Downloads</button><button id="recent148">◷ Recently played</button><button data-tab="More">⚙ Settings</button>';top.after(shortcuts);
 fold148('Downloads & offline storage',[offline],p);fold148('Add music',[add],p);fold148('Library management',[tools,history,backup],p);
 $('downloads148').onclick=()=>{const d=offline?.closest('details');if(d){d.open=true;d.scrollIntoView({block:'start'});}};$('recent148').onclick=()=>historyView120();
}
if(tab==='Charts'){
 const list=$('worldresults122'),s=list?.closest('section');if(s){const links=[...s.querySelectorAll(':scope > p')];fold148('Official regional charts',links,s);s.querySelector('h2').textContent='Charts';s.querySelector('h3').textContent='Trending this week';}
}
if(['More','Settings'].includes(tab)){
 const nodes=[...p.children].filter(n=>n.tagName==='SECTION'||(n.tagName==='DETAILS'&&!n.classList.contains('group100')));const groups={};for(const n of nodes){if(n.querySelector('#about142'))continue;const title=n.querySelector('h2,h3,summary')?.textContent||'Advanced';const key=/provider|source|discovery backend|youtube|streaming|free audio/i.test(title)?'Music services':/audio|playback|quality/i.test(title)?'Playback':/backup|library/i.test(title)?'Library & backup':'Advanced tools';(groups[key]??=[]).push(n);}for(const [name,items] of Object.entries(groups))fold148(name,items,p);
}
};
// Keep search text/results through incidental renders (e.g. IndexedDB startup refresh).
let searchState148=null, serial148=0;
const baseSearch148=search;
search=async function(q,more=false){const token=++serial148;const input=$('query');if(!input||tab!=='Discover')return;const value=String(q||'').trim();searchState148={q:value,source:$('source105')?.value||'All'};const a=$('audioLabel148'),y=$('ytLabel148');if(a)a.hidden=!value||searchState148.source==='YouTube Music';if(y)y.hidden=!value||!['All','YouTube Music'].includes(searchState148.source);await baseSearch148(q,more);if(token!==serial148||input!==$('query'))return;const out=$('results');if(out&&!out.hidden&&value){const count=out.querySelectorAll('.track').length;status(count+' playable results');}if(!value)status('');};
const layout148=render;render=function(){const old=$('query'),keep=tab==='Discover'&&old&&document.body.dataset.screen==='Discover'?{q:old.value,source:$('source105')?.value}:null;layout148();if(keep&&$('query')){$('query').value=keep.q;if(keep.source)$('source105').value=keep.source;if(keep.q.trim())search(keep.q);}};
render();
