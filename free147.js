// Free provider diagnostics and explicit audio availability.
const free147Render=render;
render=function(){free147Render();if(tab==='Discover'){
 const hint=$('ytHint143');if(hint)hint.textContent='YouTube Music discovery only. Use Audius, Jamendo or your library for free audio playback.';
 }if(!['More','Settings'].includes(tab))return;
 const s=document.createElement('section');s.innerHTML='<h3>14.7 · Free audio sources</h3><p>Audius and Jamendo use their public catalogue APIs. No subscription required for eligible tracks.</p><input id="query147" placeholder="Test artist or song" value="acoustic"><button id="test147">Test both sources</button><div id="report147" role="status"></div><p>For your own Navidrome library, import audio files or use authorised HTTPS audio links in Background audio settings. Direct Navidrome account integration is not included.</p>';$('panel').append(s);
 $('test147').onclick=async()=>{const out=$('report147'),q=$('query147').value.trim();if(!q)return;out.textContent='Testing catalogue connections…';try{const r=await providers87(q);if(out!==$('report147'))return;out.textContent='';for(const name of ['Audius','Jamendo']){const found=r.items.filter(t=>t.kind===name);const p=document.createElement('p');p.textContent=name+': '+(r.errors.includes(name)?'API unavailable':found.length+' eligible results');out.append(p);if(found.length){const b=document.createElement('button');b.textContent='Play test: '+found[0].title;b.onclick=()=>{queue=found.slice();audioQueue=found.slice();play(found[0]);};out.append(b);}}}catch(e){out.textContent=e.message}};
};
const free147Show=showYT130;showYT130=function(items){free147Show(items);if(!providers146().length){document.querySelectorAll('[data-ytopen130],[data-audio140]').forEach(b=>{b.disabled=true;b.title='No authorised matching audio provider configured';});}};
render();
