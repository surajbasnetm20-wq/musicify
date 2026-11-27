// Expose existing feature implementations without replacing playback or storage.
const render171=render;
render=function(){render171();const p=$('panel');if(!p)return;
if(tab==='Home'){
 u170Heading(p,'Your music tools');
 u170Grid(p,[['AI DJ','✦','#345e50',()=>{u170Go('Smart');$('dj93prompt')?.closest('section')?.scrollIntoView({block:'start'})}],['Jam & Connect','◎','#51438c',()=>u170Go('Jam')],['Driving mode','➜','#38556f',()=>u170Go('Drive')],['Your playlists','♫','#80503d',()=>u170Go('Playlists')]]).classList.add('u170quick');
}
if(tab==='Library'){
 const list=p.querySelector('.u170library');if(list){const b=u170Button('＋ Create or manage playlists',()=>u170Go('Playlists'),'feature171manage');list.append(b);}
}
if(tab==='Smart'){$('dj93prompt')?.closest('section')?.querySelector('h2')?.replaceChildren('AI DJ');}
if(tab==='Jam'){const section=[...p.querySelectorAll('section')].find(s=>s.querySelector('h2')?.textContent==='Musicify Connect');if(section){for(let d=section.parentElement;d&&d!==p;d=d.parentElement)if(d.tagName==='DETAILS')d.open=true;}}
};
const main171=full.querySelector('.uactions');
if(main171){const bar=document.createElement('div');bar.className='feature171bar';
 const add=(label,fn)=>bar.append(u170Button(label,fn));
 add('Lyrics',()=>full.querySelector('.ulyric')?.scrollIntoView({block:'start',behavior:'smooth'}));
 add('Save offline',()=>$('saveOffline110')?.click());
 add('Jam & Connect',()=>{full.hidden=true;u170Go('Jam')});
 add('Driving mode',()=>{full.hidden=true;u170Go('Drive')});
 main171.after(bar);
}
render();
