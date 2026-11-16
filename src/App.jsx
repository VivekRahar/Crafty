import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Check, CircleHelp, Flower2, ImagePlus, MapPin, RotateCcw, Search, ShieldCheck, Sparkles, X, UserRound, Moon, Sun, Heart, Clock3, Trash2 } from 'lucide-react';
import craftRecords from './data/crafts.json';
import { useCraftScan } from './hooks/useCraftScan';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './contexts/ThemeContext';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

const ODOP_CRAFTS = craftRecords.map((record) => ({ ...record, category: record.type, registeredYear: record.giYear, heroImage: record.imageUrl, keyIndicators: record.keyFeatures }));
const featured = ['pashmina-kashmir', 'banarasi-brocade', 'jaipur-blue-pottery', 'madhubani-painting'];
const samples = featured.map((id) => ODOP_CRAFTS.find((craft) => craft.id === id)).filter(Boolean);

function CraftyPage({ page }) {
  const routerNavigate = useNavigate();
  const { id: routeCraftId } = useParams();
  const [craftId, setCraftId] = useLocalStorage('crafty-selected-craft', samples[0]?.id ?? ODOP_CRAFTS[0].id);
  const [image, setImage] = useState(null);
  const { scan, setScan, error: uploadError, setError: setUploadError, loading, analyze } = useCraftScan();
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [stateFilter, setStateFilter] = useState('All states');
  const [districtFilter, setDistrictFilter] = useState('All districts');
  const [typeFilter, setTypeFilter] = useState('All types');
  const [giOnly, setGiOnly] = useState(false);
  const [favorites, setFavorites] = useLocalStorage('crafty-favorites', []);
  const [history, setHistory] = useLocalStorage('crafty-scan-history', []);
  const [showHistory, setShowHistory] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [openTip, setOpenTip] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const [authMode, setAuthMode] = useState('login');
  const [account, setAccount] = useState(() => JSON.parse(localStorage.getItem('crafty-account') || 'null'));
  const [authMessage, setAuthMessage] = useState('');
  const inputRef = useRef(null);
  const craft = ODOP_CRAFTS.find(({ id }) => id === (page === 'detail' ? routeCraftId : craftId)) ?? ODOP_CRAFTS[0];
  const states = [...new Set(ODOP_CRAFTS.map((item) => item.state))].sort();
  const districts = [...new Set(ODOP_CRAFTS.filter((item) => stateFilter === 'All states' || item.state === stateFilter).map((item) => item.district))].sort();
  const categories = [...new Set(ODOP_CRAFTS.map((item) => item.category))].sort();
  const filtered = ODOP_CRAFTS.filter((item) => `${item.name} ${item.state} ${item.district}`.toLowerCase().includes(query.toLowerCase()) && (stateFilter === 'All states' || item.state === stateFilter) && (districtFilter === 'All districts' || item.district === districtFilter) && (typeFilter === 'All types' || item.category === typeFilter) && (!giOnly || Boolean(item.giNumber)));

  const navigate = (nextPage) => { const paths = { home: '/', library: '/library', about: '/about', tips: '/tips', auth: '/account' }; routerNavigate(paths[nextPage] || '/'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleAuth = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '').trim().toLowerCase();
    const password = String(form.get('password') || '');
    if (authMode === 'register') {
      const user = { name: String(form.get('name') || '').trim(), email, password };
      localStorage.setItem('crafty-account', JSON.stringify(user)); setAccount(user); setAuthMessage(''); navigate('home');
    } else {
      const saved = JSON.parse(localStorage.getItem('crafty-account') || 'null');
      if (saved && saved.email === email && saved.password === password) { setAccount(saved); setAuthMessage(''); navigate('home'); }
      else setAuthMessage('We couldn’t find a matching local demo account. Register first or check your details.');
    }
  };

  useEffect(() => {
    if (!image?.url) return undefined;
    const objectUrl = image.url;
    return () => URL.revokeObjectURL(objectUrl);
  }, [image?.url]);

  const chooseImage = (file) => {
    if (!file) return;
    setImage((current) => {
      return { name: file.name, url: URL.createObjectURL(file), file };
    });
    setScan(null); setUploadError('');
  };

  const reset = () => {
    setImage(null);
    setScan(null); setUploadError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div style={theme === 'dark' ? { backgroundColor: '#202722', color: '#edf1e9' } : undefined} className={`student-shell min-h-screen bg-[#f7f5ef] text-[#282f2a] transition-colors ${theme === 'dark' ? 'dark' : ''}`}>
      <header className="mx-auto flex max-w-[1380px] items-center justify-between px-5 py-5 md:px-10">
        <button onClick={() => navigate('home')} className="flex items-center gap-3" aria-label="Crafty home">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#164e45] text-[#f4c77a]"><Flower2 size={21} /></span>
          <span className="font-serif text-[26px] font-semibold tracking-tight">Crafty<span className="text-[#e87957]">.</span></span>
          <span className="hidden border-l border-[#d7d4ca] pl-3 text-[11px] text-[#777d73] sm:block">ODOP crafts · a small project</span>
        </button>
        <nav className="flex items-center gap-3 text-xs font-medium sm:gap-6 sm:text-sm" aria-label="Main navigation">
          <button onClick={() => navigate('home')} className="hidden transition hover:text-[#e87957] sm:block">Home</button>
          <button onClick={() => { setShowAll(true); navigate('library'); }} className="transition hover:text-[#e87957]">Craft library</button>
          <button onClick={() => navigate('about')} className="hidden transition hover:text-[#e87957] sm:block">About</button>
          <button onClick={() => navigate('tips')} className="hidden transition hover:text-[#e87957] lg:block">Craft tips</button>
          <button onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} className="grid h-9 w-9 place-items-center rounded-full border border-[#d7d4ca] text-[#164e45] transition hover:bg-[#edf3ed] dark:border-[#44544e] dark:text-[#f4c77a] dark:hover:bg-[#263632]">{theme === 'light' ? <Moon size={16}/> : <Sun size={16}/>}</button>
          {account ? <button onClick={() => { localStorage.removeItem('crafty-account'); setAccount(null); }} className="inline-flex items-center gap-1.5 rounded-full border border-[#d7d4ca] px-3 py-2 text-[#31594f]"><UserRound size={15} /> {account.name.split(' ')[0]} · Sign out</button> : <button onClick={() => { setAuthMode('login'); setAuthMessage(''); navigate('auth'); }} className="inline-flex items-center gap-1.5 rounded-full border border-[#164e45] px-3 py-2 text-[#164e45] transition hover:bg-[#edf3ed]"><UserRound size={15} /> Sign in</button>}
          <button onClick={() => { navigate('home'); setTimeout(() => document.querySelector('#verify')?.scrollIntoView({ behavior: 'smooth' }), 80); }} className="hidden rounded-full bg-[#164e45] px-4 py-2.5 text-white transition hover:bg-[#22685c] sm:block">Check a craft <span className="ml-1">↗</span></button>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-[1380px] px-5 pb-20 md:px-10">
        {page === 'home' && <>
        <section className="student-hero relative mt-3 overflow-hidden rounded-[18px] border-2 border-[#243b35] bg-[#f2cc63] px-6 py-9 text-[#243b35] sm:px-10 md:mt-6 md:px-12 md:py-12">
          <div className="relative grid items-center gap-9 md:grid-cols-[1.1fr_.9fr] md:gap-5">
            <div className="max-w-[630px]">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#243b35]/40 px-3 py-1.5 text-xs text-[#40584d]"><span className="h-2 w-2 rounded-full bg-[#d56f51]" /> My ODOP project</div>
              <h1 className="font-serif text-[40px] font-medium leading-[1.08] sm:text-5xl lg:text-[58px]">India makes some<br />really lovely <em className="font-normal text-[#b2523a]">things.</em></h1>
              <p className="mt-5 max-w-[460px] text-sm leading-6 text-[#40584d] sm:text-base">I put together a small guide to crafts from different parts of India. Look around, find a craft you like, or try the photo colour check.</p>
              <a href="#verify" className="mt-7 inline-flex items-center gap-3 rounded-lg border-2 border-[#243b35] bg-[#fffaf0] px-5 py-3 text-sm font-semibold text-[#243b35] transition hover:bg-white">Try the photo check <ArrowDown size={16} /></a>
            </div>
            <div className="relative mx-auto w-full max-w-[440px] md:justify-self-end">
              <div className="absolute -left-2 top-3 z-10 rotate-[-3deg] border border-[#75652f] bg-[#fffaf0] px-3 py-2 text-[#41534a] shadow-sm sm:-left-5"><span className="block text-[10px]">Found in my notes</span><span className="font-serif text-base">Pashmina · Kashmir</span></div>
              <div className="student-photo h-[250px] overflow-hidden border-[5px] border-[#fffaf0] bg-[#fffaf0] shadow-[5px_6px_0_#b2523a] sm:h-[310px]"><img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=85" alt="Richly woven Indian textile" /></div>
              <div className="absolute -bottom-3 right-2 rotate-[2deg] border border-[#75652f] bg-[#fffaf0] px-3 py-2 text-xs text-[#164e45]"><MapPin size={13} className="mr-1 inline" /> Kashmir</div>
            </div>
          </div>
          <div className="relative mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#243b35]/25 pt-4 text-xs text-[#40584d]"><span><b className="mr-2 text-[#b2523a]">01</b>Browse crafts</span><span><b className="mr-2 text-[#b2523a]">02</b>Check the details</span><span><b className="mr-2 text-[#b2523a]">03</b>Learn the place</span></div>
        </section>

        <section id="verify" className="scroll-mt-6 py-16 md:py-24">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><p className="mb-2 text-xs font-semibold text-[#b2523a]">Photo check</p><h2 className="font-serif text-3xl tracking-tight sm:text-[42px]">Want to look at a craft?</h2></div>
            <p className="max-w-[350px] text-sm leading-6 text-[#6e7770]">Upload a photo, pick a craft, and compare its average colour with a simple reference palette.</p>
          </div>
          <div className="grid overflow-hidden rounded-[26px] border border-[#e3e0d6] bg-white md:grid-cols-[1.05fr_.95fr]">
            <div className="p-5 sm:p-8">
              <div className="mb-5 flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-[.14em] text-[#758079]">01 / Your photo</span>{image && <button onClick={reset} className="inline-flex items-center gap-1 text-xs text-[#737d76] hover:text-[#bf5f48]"><RotateCcw size={13} /> Remove</button>}</div>
              <button type="button" onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); chooseImage(e.dataTransfer.files?.[0]); }} className={`group relative flex min-h-[220px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164e45] ${image ? 'border-[#9ab4a8]' : 'border-[#c9cec4] bg-[#f8f8f4] hover:border-[#e87957] hover:bg-[#fdf8f3]'}`} aria-label="Upload a JPG or PNG image, up to 5 MB">
              {image ? <><img src={image.url} alt="Selected craft for review" className="absolute inset-0 h-full w-full object-contain bg-[#f8f8f4]" /><span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-xs text-[#354640]">{image.name}</span><span className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-[#354640] opacity-0 transition group-hover:opacity-100"><ImagePlus size={16} /></span></> : <><span className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-[#f3e8d8] text-[#c66b4e]"><ImagePlus size={21} /></span><span className="text-sm font-semibold">Drop a photo here or <span className="text-[#c66b4e]">browse</span></span><span className="mt-1 text-xs text-[#8b928a]">JPG or PNG · up to 5 MB</span></>}
              </button>
              <input ref={inputRef} className="hidden" type="file" accept="image/jpeg,image/png" aria-label="Craft photo, JPG or PNG, up to 5 megabytes" onChange={(e) => chooseImage(e.target.files?.[0])} />
              <div className="mt-7 flex items-center justify-between"><label htmlFor="scan-craft" className="text-xs font-semibold uppercase tracking-[.14em] text-[#758079]">02 / Pick a craft</label><span className="text-xs text-[#8b928a]">Choose the closest match</span></div>
              <select id="scan-craft" value={craftId} onChange={(event) => {setCraftId(event.target.value);setScan(null);}} className="mt-3 w-full rounded-xl border border-[#dcded6] bg-white px-3 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#164e45]">{ODOP_CRAFTS.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.state}</option>)}</select>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">{samples.map((item, index) => <button key={item.id} onClick={() => { setCraftId(item.id); setScan(null); }} className={`rounded-xl border px-3 py-3 text-left transition ${craftId === item.id ? 'border-[#164e45] bg-[#edf3ed] text-[#164e45]' : 'border-[#e6e4dd] hover:border-[#b8c4bb]'}`}><span className={`mb-2 block h-1 w-7 rounded-full ${['bg-[#dc8663]','bg-[#bf9ab9]','bg-[#719bb2]','bg-[#d6ad55]'][index]}`} /><span className="block text-xs font-semibold leading-4">{item.name}</span><span className="mt-1 block truncate text-[10px] text-[#879089]">{item.state}</span></button>)}</div>
              <button disabled={!image || loading} onClick={async () => { const next = await analyze(image?.file, craft); if (next) setHistory((previous) => [next, ...previous].slice(0, 10)); }} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#164e45] py-3.5 text-sm font-semibold text-white transition hover:bg-[#22685c] disabled:cursor-not-allowed disabled:bg-[#aebbb3]">{loading ? 'Reading image colours…' : <><Sparkles size={16} /> Compare visual colour cues <ArrowRight size={15} /></>}</button>
              {uploadError && <p role="alert" className="mt-3 rounded-xl bg-[#fff0e9] px-3 py-2 text-xs text-[#a44936]">{uploadError}</p>}
              <p className="mt-3 text-center text-[11px] text-[#8b928a]">Educational colour comparison only. Indicators are not an official certificate; verify with the GI Registry.</p>
            </div>
            <div className="relative min-h-[330px] border-t border-[#e3e0d6] bg-[#f4f2ea] p-5 sm:p-8 md:border-l md:border-t-0">
              <div className="mb-6 flex items-center justify-between"><span className="text-xs font-semibold text-[#758079]">Selected craft</span><span className="rounded-md bg-[#e5eee4] px-2.5 py-1 text-[10px] font-semibold text-[#316557]">GI record</span></div>
              <div className="flex gap-4"><img src={craft.heroImage} alt="" className="h-[92px] w-[92px] rounded-2xl object-cover" /><div className="pt-1"><h3 className="font-serif text-2xl leading-7">{craft.name}</h3><p className="mt-2 flex items-center gap-1 text-xs text-[#737d76]"><MapPin size={13} /> {craft.district}, {craft.state}</p><p className="mt-1 text-[11px] text-[#8b928a]">GI registration no. {craft.giNumber} · {craft.registeredYear}</p></div></div>
              {scan ? <div className="mt-6 rounded-2xl border border-[#dce5db] bg-white p-4"><div className="flex items-center justify-between gap-3"><div><span className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#818a82]">Colour cue indicator</span><h4 className={`mt-1 text-lg font-semibold ${scan.confidence >= 75 ? 'text-[#316557]' : scan.confidence >= 50 ? 'text-[#a16c28]' : 'text-[#a44936]'}`}>{scan.verdict}</h4></div><span className="rounded-full bg-[#edf3ed] px-3 py-2 text-sm font-bold text-[#164e45]">{scan.confidence}%</span></div><p className="mt-2 text-xs leading-5 text-[#747d75]">Approximate average image colour compared with a broad {scan.palette} reference. This simple screen does not inspect weave, material, maker or origin.</p><div className="mt-3 grid gap-2 text-xs"><p className={`rounded-lg p-2 ${scan.confidence >= 50 ? 'bg-[#eef5ec] text-[#316557]' : 'bg-[#fff0e9] text-[#a44936]'}`}>{scan.confidence >= 50 ? <><Check size={13} className="mr-1 inline"/> Matched cue: overall colour is within the broad palette range.</> : 'Mismatch cue: overall colour falls outside the broad palette range.'}</p><p className="rounded-lg bg-[#f5f1e9] p-2 text-[#76623c]">Not checked: fibre, weave, motifs, workmanship, seller authorisation and provenance.</p></div><button onClick={() => setScan(null)} className="mt-3 text-xs font-semibold text-[#b86149] hover:underline">Clear result</button></div> : <div className="mt-7 rounded-2xl bg-[#eae8de] p-4"><div className="flex gap-3"><CircleHelp className="mt-0.5 shrink-0 text-[#bd7658]" size={17} /><div><p className="text-sm font-semibold">What should I look for?</p><p className="mt-1 text-xs leading-5 text-[#747d75]">{craft.description}</p></div></div></div>}
              <a href="#registry" className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#316557] hover:underline">Explore the craft library <ArrowRight size={13} /></a>
            </div>
          </div>
        </section>

        <section id="how" className="mb-16 grid gap-8 rounded-xl border border-[#d2c9b5] bg-[#eee9df] p-6 sm:p-9 md:grid-cols-[.8fr_1.2fr] md:items-center">
          <div><p className="mb-2 text-xs font-semibold text-[#c66b4e]">How to use this page</p><h2 className="font-serif text-3xl">Three small steps</h2></div>
          <div className="grid gap-4 sm:grid-cols-3">{[['01','Share a clear photo','A close, well-lit view helps you notice the details.'],['02','Choose a reference','Select a craft to see its recorded visual features.'],['03','Learn its origin','Find district, state and GI registration information.']].map(([n,title,body]) => <article key={n} className="border-t border-[#d4cec0] pt-3"><span className="font-serif text-2xl text-[#d07556]">{n}</span><h3 className="mt-2 text-sm font-semibold">{title}</h3><p className="mt-1 text-xs leading-5 text-[#737970]">{body}</p></article>)}</div>
        </section>
        </>}

        {(page === 'home' || page === 'library') && <section id="registry" className="scroll-mt-6 py-8">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-xs font-semibold text-[#b2523a]">Craft list · 23 entries</p><h2 className="font-serif text-3xl tracking-tight sm:text-[40px]">Things I found in the GI register</h2></div><button onClick={() => setShowAll(!showAll)} className="inline-flex items-center gap-2 text-sm font-semibold text-[#316557] hover:underline">{showAll ? 'Show featured' : 'Browse all crafts'} <ArrowRight size={15} /></button></div>
          <div className="mb-4 flex max-w-sm items-center gap-2 rounded-full border border-[#deddd4] bg-white px-4 py-2.5"><Search size={16} className="text-[#818a82]" /><input aria-label="Search craft library" value={query} onChange={(e) => { setQuery(e.target.value); setShowAll(true); }} placeholder="Search craft, district or state" className="w-full bg-transparent text-sm outline-none placeholder:text-[#9aa098]" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}</div>
          <div className="mb-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto_auto]"><label className="sr-only" htmlFor="state-filter">Filter by state</label><select id="state-filter" value={stateFilter} onChange={(e) => {setStateFilter(e.target.value);setDistrictFilter('All districts');setShowAll(true);}} className="rounded-xl border border-[#deddd4] bg-white px-3 py-2.5 text-sm"><option>All states</option>{states.map((s) => <option key={s}>{s}</option>)}</select><label className="sr-only" htmlFor="district-filter">Filter by district</label><select id="district-filter" value={districtFilter} onChange={(e) => {setDistrictFilter(e.target.value);setShowAll(true);}} className="rounded-xl border border-[#deddd4] bg-white px-3 py-2.5 text-sm"><option>All districts</option>{districts.map((d) => <option key={d}>{d}</option>)}</select><label className="sr-only" htmlFor="type-filter">Filter by craft type</label><select id="type-filter" value={typeFilter} onChange={(e) => {setTypeFilter(e.target.value);setShowAll(true);}} className="rounded-xl border border-[#deddd4] bg-white px-3 py-2.5 text-sm"><option>All types</option>{categories.map((c) => <option key={c}>{c}</option>)}</select><button onClick={() => setGiOnly(!giOnly)} aria-pressed={giOnly} className={`rounded-xl border px-3 py-2.5 text-sm font-medium ${giOnly ? 'border-[#164e45] bg-[#edf3ed] text-[#164e45]' : 'border-[#deddd4] bg-white'}`}>GI tagged only</button><button onClick={() => setShowAll(true)} className="rounded-xl border border-[#deddd4] bg-white px-3 py-2.5 text-sm font-medium">{filtered.length} crafts</button></div>
          <div className="mb-5 flex flex-wrap gap-2"><button onClick={() => setShowHistory(!showHistory)} className="inline-flex items-center gap-1.5 rounded-full bg-[#e9eee8] px-3 py-2 text-xs font-semibold text-[#316557]"><Clock3 size={14}/> Recent scans ({history.length})</button><button onClick={() => setShowFavorites(!showFavorites)} aria-pressed={showFavorites} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold ${showFavorites ? 'bg-[#a4563e] text-white' : 'bg-[#f4e7df] text-[#a4563e]'}`}><Heart size={14}/> {showFavorites ? 'Showing saved' : 'Saved crafts'} ({favorites.length})</button>{showHistory && <button onClick={() => setHistory([])} className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-medium text-[#8c6255]"><Trash2 size={13}/> Clear history</button>}</div>
          {showHistory && history.length > 0 && <div className="mb-5 grid gap-2 sm:grid-cols-2">{history.map((item) => <div key={item.id} className="flex items-center justify-between rounded-xl border border-[#e5e2d9] bg-white p-3 text-xs"><span><b>{item.craftName}</b> · {item.verdict}</span><span className="text-[#818a82]">{item.confidence}% · {item.createdAt}</span></div>)}</div>}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{(showAll || query || page === 'library' ? filtered : samples).filter((item) => !showFavorites || favorites.includes(item.id)).map((item, index) => <article key={item.id} className="student-card group overflow-hidden rounded-xl border border-[#8f9287] bg-[#fffdf7] transition"><div className="relative h-40 overflow-hidden"><img src={item.heroImage} alt={item.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" /><span className={`absolute left-3 top-3 rounded-md px-2 py-1 text-[10px] font-semibold ${['bg-[#f3d8c9]','bg-[#e6d7e8]','bg-[#d5e4eb]','bg-[#eee0b8]'][index % 4]} text-[#34443c]`}>{item.category}</span><span className="absolute right-3 top-3 rounded-md border border-[#8f9287] bg-[#fffdf7] px-2 py-1 text-[10px] font-semibold text-[#316557]">GI tag</span></div><div className="p-4"><h3 className="font-serif text-xl">{item.name}</h3><p className="mt-1 flex items-center gap-1 text-xs text-[#626c64]"><MapPin size={12} /> {item.district}, {item.state}</p><div className="mt-4 flex items-center justify-between border-t border-[#dedbce] pt-3 text-[10px] text-[#626c64]"><span>GI {item.giNumber} · {item.registeredYear}</span><button onClick={() => setFavorites((previous) => previous.includes(item.id) ? previous.filter((id) => id !== item.id) : [...previous, item.id])} aria-label={`${favorites.includes(item.id) ? 'Remove' : 'Save'} ${item.name}`} className="inline-flex items-center gap-1 text-[#a4563e]"><Heart size={14} fill={favorites.includes(item.id) ? 'currentColor' : 'none'}/></button></div><button onClick={() => routerNavigate(`/craft/${item.id}`)} className="mt-3 w-full rounded-md border border-[#8c9d8b] bg-[#eef2e9] py-2 text-xs font-semibold text-[#385748] hover:bg-[#e0e8dc]">More about this craft →</button></div></article>)}</div>
          {filtered.length === 0 && <p className="rounded-2xl border border-dashed border-[#c9cec4] p-8 text-center text-sm text-[#737d76]">No crafts match “{query}”. Try a state, district or craft name.</p>}
        </section>}
        {page === 'about' && <section className="student-about mx-auto max-w-4xl rounded-2xl border border-[#b8a6bf] px-6 py-12 md:my-12 md:px-12"><p className="mb-3 text-xs font-semibold text-[#75518d]">About this project</p><h1 className="font-serif text-5xl leading-tight">Why I made Crafty</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#59685f]">I wanted a simple way to browse Indian handicrafts and see where they come from. This project brings a small ODOP and GI reference list together with a photo colour comparison.</p><div className="mt-9 grid gap-4 sm:grid-cols-3">{[['The catalogue','Craft names, places, registration numbers and years are stored in a small JSON file.'],['The photo check','It reads average image colour in the browser. It does not use a trained AI model.'],['What it cannot do','It cannot confirm an artisan, material, weave or authenticity. Please use the official GI Registry for verification.']].map(([title,body]) => <article key={title} className="rounded-lg border border-[#ded6e2] bg-[#fffdfa] p-5"><h2 className="font-serif text-xl">{title}</h2><p className="mt-2 text-sm leading-6 text-[#737d76]">{body}</p></article>)}</div><button onClick={() => { setShowAll(true); navigate('library'); }} className="mt-8 inline-flex items-center gap-2 rounded-md border border-[#4c655a] bg-[#f5efdc] px-5 py-3 text-sm font-semibold text-[#344d43]">Open the craft list <ArrowRight size={15}/></button></section>}
        {page === 'detail' && <section className="mx-auto max-w-5xl py-12 md:py-20"><button onClick={() => navigate('library')} className="mb-6 text-sm font-semibold text-[#a4563e]">← Back to craft library</button><div className="grid overflow-hidden rounded-[28px] bg-white shadow-sm md:grid-cols-2"><img src={craft.heroImage} alt={craft.name} className="h-72 w-full object-cover md:h-full"/><div className="p-6 sm:p-10"><span className="rounded-full bg-[#e5eee4] px-3 py-1.5 text-xs font-semibold text-[#316557]">GI registration no. {craft.giNumber}</span><h1 className="mt-5 font-serif text-4xl">{craft.name}</h1><p className="mt-2 flex items-center gap-1 text-sm text-[#737d76]"><MapPin size={15}/>{craft.district}, {craft.state}</p><p className="mt-6 text-sm leading-7 text-[#59685f]">{craft.description}</p><div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl bg-[#f5f2eb] p-4"><span className="block text-[10px] uppercase tracking-widest text-[#818a82]">GI registration</span><b className="mt-1 block text-lg">{craft.registeredYear}</b></div><div className="rounded-xl bg-[#f5f2eb] p-4"><span className="block text-[10px] uppercase tracking-widest text-[#818a82]">Craft type</span><b className="mt-1 block text-lg">{craft.category}</b></div></div><h2 className="mt-7 font-serif text-xl">What to look for</h2><ul className="mt-3 space-y-3">{craft.keyIndicators.map((feature) => <li key={feature.name} className="flex gap-2 text-sm leading-6 text-[#59685f]"><Check className="mt-1 shrink-0 text-[#51826c]" size={16}/><span><b>{feature.name}:</b> {feature.expected}</span></li>)}</ul><button onClick={() => {setCraftId(craft.id);navigate('home');setTimeout(()=>document.querySelector('#verify')?.scrollIntoView({behavior:'smooth'}),80);}} className="mt-7 rounded-full bg-[#164e45] px-5 py-3 text-sm font-semibold text-white">Check a photo <ArrowRight className="ml-1 inline" size={15}/></button></div></div><p className="mt-4 text-xs text-[#7b827a]">GI details are included as reference information. Confirm current registration and authorised users with the <a className="underline" href={craft.registrySource} target="_blank" rel="noreferrer">official IP India GI Registry</a>.</p></section>}
        {page === 'tips' && <section className="mx-auto max-w-4xl py-14 md:py-20"><div className="rounded-[28px] bg-[#e9e2f0] p-7 sm:p-12"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#75518d]">A field guide</p><h1 className="mt-3 font-serif text-4xl sm:text-5xl">Look closer, ask better.</h1><p className="mt-4 max-w-xl text-sm leading-6 text-[#655b6c]">A few simple prompts to help you learn about craft. These observations can guide questions; they cannot certify an item.</p></div><div className="mt-7 space-y-3">{[['Pashmina','Ask about fibre origin, hand-spinning and the weave. A very fine appearance alone does not establish fibre composition.'],['Block prints','Look for repeat alignment and slight block-to-block variation. Ask about the printing process, dyes and place of production.'],['Handloom textiles','Check both sides, selvedges and weave structure. Request the artisan or cooperative details and any GI authorisation information.'],['Pottery and metalwork','Look closely at surface finish, tool marks and repeated pattern details. Ask how and where the piece was made.']].map(([title,body],index)=><article key={title} className="overflow-hidden rounded-2xl border border-[#e4dfea] bg-white"><button aria-expanded={openTip===index} onClick={()=>setOpenTip(openTip===index?null:index)} className="flex w-full items-center justify-between p-5 text-left font-serif text-xl"><span>{title}</span><span className="text-[#875ea1]">{openTip===index?'−':'+'}</span></button>{openTip===index&&<p className="border-t border-[#eeeaf1] px-5 py-4 text-sm leading-6 text-[#66736b]">{body}</p>}</article>)}</div><p className="mt-6 text-xs leading-5 text-[#737d76]">Crafty’s photo tool compares broad average colour only. For authenticity concerns, contact the GI Registry or a qualified craft specialist.</p></section>}
        {page === 'auth' && <section className="student-auth mx-auto grid max-w-4xl overflow-hidden rounded-xl border-2 border-[#39483e] bg-[#fffdf7] md:my-12 md:grid-cols-[.9fr_1.1fr]"><div className="bg-[#b7d4c2] p-8 text-[#273f34] sm:p-10"><Flower2 className="text-[#b2523a]" size={26}/><p className="mt-12 text-xs">Optional demo account</p><h1 className="mt-3 font-serif text-4xl">Hello there.</h1><p className="mt-4 text-sm leading-6">You can make an account in this browser to try the sign-in form. It doesn’t connect to a server.</p></div><div className="p-6 sm:p-10"><div className="mb-7 flex gap-2 border-b border-[#d9d4c7]"><button onClick={() => {setAuthMode('login');setAuthMessage('');}} className={`flex-1 border-b-2 py-2.5 text-sm font-semibold ${authMode === 'login' ? 'border-[#b2523a] text-[#344d43]' : 'border-transparent text-[#737d76]'}`}>Sign in</button><button onClick={() => {setAuthMode('register');setAuthMessage('');}} className={`flex-1 border-b-2 py-2.5 text-sm font-semibold ${authMode === 'register' ? 'border-[#b2523a] text-[#344d43]' : 'border-transparent text-[#737d76]'}`}>Register</button></div><h2 className="font-serif text-3xl">{authMode === 'login' ? 'Sign in to Crafty' : 'Make an account'}</h2><p className="mt-2 text-sm text-[#737d76]">{authMode === 'login' ? 'Use the details you registered with.' : 'This is just for the local demo.'}</p><form onSubmit={handleAuth} className="mt-6 space-y-4">{authMode === 'register' && <label className="block text-xs font-semibold text-[#4d5c54]">Your name<input required name="name" autoComplete="name" className="mt-1.5 w-full rounded-md border border-[#dcded6] px-4 py-3 text-sm outline-none focus:border-[#5b8a76]" placeholder="e.g. Aanya Sharma"/></label>}<label className="block text-xs font-semibold text-[#4d5c54]">Email address<input required type="email" name="email" autoComplete="email" className="mt-1.5 w-full rounded-md border border-[#dcded6] px-4 py-3 text-sm outline-none focus:border-[#5b8a76]" placeholder="you@example.com"/></label><label className="block text-xs font-semibold text-[#4d5c54]">Password<input required minLength="6" type="password" name="password" autoComplete={authMode === 'login' ? 'current-password' : 'new-password'} className="mt-1.5 w-full rounded-md border border-[#dcded6] px-4 py-3 text-sm outline-none focus:border-[#5b8a76]" placeholder="At least 6 characters"/></label>{authMessage && <p role="alert" className="rounded-md bg-[#fff0e9] p-3 text-xs leading-5 text-[#a44936]">{authMessage}</p>}<button className="w-full rounded-md border border-[#273f34] bg-[#d9e7db] py-3.5 text-sm font-semibold text-[#273f34] transition hover:bg-[#c6ddcd]">{authMode === 'login' ? 'Sign in' : 'Create account'} <ArrowRight size={15} className="ml-1 inline"/></button></form><p className="mt-4 text-[11px] leading-5 text-[#8b928a]">Demo only: account details are stored in this browser. This is not a secure production authentication service.</p></div></section>}
      </main>
      <footer className="border-t border-[#e3e0d6] bg-[#f0eee7]"><div className="mx-auto flex max-w-[1380px] flex-col gap-2 px-5 py-7 text-xs text-[#737d76] sm:flex-row sm:items-center sm:justify-between md:px-10"><button onClick={() => navigate('home')} className="text-left font-serif text-xl font-semibold text-[#164e45]">Crafty<span className="text-[#e87957]">.</span></button><p>Made to help good craft find its way home. &nbsp; · &nbsp; Visual cues are educational, not an authenticity certificate.</p><button onClick={() => { navigate('home'); setTimeout(() => document.querySelector('#verify')?.scrollIntoView({ behavior: 'smooth' }), 80); }} className="text-left font-semibold text-[#316557]">Check a craft ↑</button></div></footer>
    </div>
  );
}

function App() {
  return <Routes>
    <Route path="/" element={<CraftyPage page="home" />} />
    <Route path="/library" element={<CraftyPage page="library" />} />
    <Route path="/about" element={<CraftyPage page="about" />} />
    <Route path="/tips" element={<CraftyPage page="tips" />} />
    <Route path="/account" element={<CraftyPage page="auth" />} />
    <Route path="/craft/:id" element={<CraftyPage page="detail" />} />
    <Route path="*" element={<CraftyPage page="home" />} />
  </Routes>;
}

export default App;
