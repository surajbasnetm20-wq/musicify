// Single-player fade transitions; no second stream or Web Audio routing.
let fade91=read('fade91',0), transition91=false, base91=1, fadeToken91=0;
function reset91(){fadeToken91++;transition91=false;try{audio.volume=base91}catch{}}
const play91=play;play=async function(t){reset91();return play91(t)};
audio.addEventListener('timeupdate',()=>{if(!fade91||audio.paused||repeat||!Number.isFinite(audio.duration)||audio.duration<fade91*3)return;const left=audio.duration-audio.currentTime;if(left>fade91){if(transition91)reset91();return;}if(!transition91){base91=audio.volume;transition91=true;}try{audio.volume=Math.max(0,Math.min(1,base91*left/fade91))}catch{}});
audio.addEventListener('ended',reset91);audio.addEventListener('seeking',reset91);audio.addEventListener('pause',()=>{if(!audio.ended)reset91()});
const render91=render;render=function(){render91();if(tab==='Settings'||tab==='More')$('panel').insertAdjacentHTML('beforeend',`<section><h2>Audio transitions</h2><label>Fade out before next song <select id="fade91">${[0,2,4,6,8].map(n=>`<option value="${n}" ${n===fade91?'selected':''}>${n?n+' seconds':'Off'}</option>`).join('')}</select></label><small>Single-stream fade, not overlapping crossfade. Some iPhones ignore web volume controls.</small><button data-tab="Studio">Equalizer & playback speed</button><p>Audio quality follows the original source. Local FLAC/ALAC playback depends on browser support.</p></section>`)};
document.addEventListener('change',e=>{if(e.target.id==='fade91'){reset91();fade91=Number(e.target.value);save('fade91',fade91)}});render();
