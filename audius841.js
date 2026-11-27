// Audius weekly trending, integrated with the existing search and track actions.
const m841Render = render;
render = function () {
  m841Render();
  if (tab === 'Discover') {
    const out = $('results');
    if (out) out.insertAdjacentHTML('beforebegin', '<button id="trending" class="primary">Trending this week</button>');
  }
};
document.addEventListener('click', async e => {
  const button = e.target.closest('#trending');
  if (!button || tab !== 'Discover') return;
  clearTimeout(m84timer);
  const seq = ++m84seq, out = $('results');
  const active = () => seq === m84seq && tab === 'Discover' && out === $('results');
  button.disabled = true;
  out.textContent = 'Loading weekly trending tracks…';
  status('Loading…');
  try {
    const r = await fetch('https://api.audius.co/v1/tracks/trending?time=week&app_name=Musicify');
    if (!r.ok) throw Error('HTTP ' + r.status);
    const { data = [] } = await r.json();
    if (!Array.isArray(data)) throw Error('Unexpected provider response');
    const found = data.filter(t => t.id && t.is_streamable !== false && !t.stream_conditions).map(t => ({
      id: 'audius-' + t.id, title: t.title, artist: t.user?.name,
      art: t.artwork?.['150x150'] || t.artwork?.['480x480'],
      url: `https://api.audius.co/v1/tracks/${encodeURIComponent(t.id)}/stream?app_name=Musicify`,
      kind: 'Audius', genre: t.genre, mood: t.mood, bpm: Number(t.bpm)||null, musicalKey: t.musical_key||null
    }));
    if (!active()) return;
    out.innerHTML = rows(found);
    status(found.length + ' trending tracks');
  } catch (err) {
    if (active()) { out.textContent = 'Trending unavailable. Please try again.'; status('Trending unavailable: ' + err.message); }
  } finally { button.disabled = false; }
});
render();
