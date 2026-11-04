import React, { useMemo, useState } from 'react';
import { Activity, Search, ShieldCheck, Clock3, ChartNoAxesCombined, History, Database, ChevronDown, CircleHelp, Menu, X, ArrowUpRight } from 'lucide-react';

const sampleMatches = [
  { home: 'Arsenal', away: 'Chelsea', league: 'Premier League', date: 'Sample match', score: '2–1', firstGoal: "18'", events: [{m:18,t:'Arsenal goal'},{m:42,t:'Chelsea goal'},{m:71,t:'Arsenal goal'}], note: 'Demonstration data only' },
  { home: 'Real Madrid', away: 'Barcelona', league: 'La Liga', date: 'Sample match', score: '2–2', firstGoal: "7'", events: [{m:7,t:'Barcelona goal'},{m:22,t:'Real Madrid goal'},{m:61,t:'Barcelona goal'},{m:82,t:'Real Madrid goal'}], note: 'Demonstration data only' },
  { home: 'Liverpool', away: 'Manchester City', league: 'Premier League', date: 'Sample match', score: '1–1', firstGoal: "23'", events: [{m:23,t:'Liverpool goal'},{m:68,t:'Manchester City goal'}], note: 'Demonstration data only' },
];

function App() {
  const [home, setHome] = useState('');
  const [away, setAway] = useState('');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState('');
  const [active, setActive] = useState('Overview');
  const filtered = useMemo(() => sampleMatches.filter(m => `${m.home} ${m.away} ${m.league}`.toLowerCase().includes(query.toLowerCase())), [query]);

  function analyse(e) {
    e.preventDefault();
    if (!home.trim() || !away.trim()) { setNotice('Enter both team names to continue.'); return; }
    if (home.trim().toLowerCase() === away.trim().toLowerCase()) { setNotice('Choose two different teams.'); return; }
    setNotice(`Match added: ${home.trim()} vs ${away.trim()}. Live historical analysis will appear after a football data API is connected.`);
    setSelected({home:home.trim(), away:away.trim(), league:'Not yet connected', date:'Awaiting data connection', score:'—', firstGoal:'—', events:[], note:'No live data is connected yet.'});
  }

  const nav = [{name:'Overview', icon:ChartNoAxesCombined},{name:'Match research',icon:Search},{name:'Data sources',icon:Database},{name:'Analysis history',icon:History}];

  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Activity size={21}/></div><div><strong>FIRST5</strong><span>ANALYTICS</span></div></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav>{nav.map(n=><button key={n.name} className={active===n.name?'nav-item active':'nav-item'} onClick={()=>setActive(n.name)}><n.icon size={17}/>{n.name}</button>)}</nav>
      <div className="side-bottom"><div className="status-dot"></div><div><b>Data connection</b><span>Not connected</span></div></div>
      <div className="side-foot">FOOTBALL DATA RESEARCH<br/>VERSION 1.0.0</div>
    </aside>
    <main className="main">
      <header className="topbar"><div className="mobile-brand">FIRST5 <span>ANALYTICS</span></div><div className="crumb">Workspace <span>/</span> {active}</div><div className="top-right"><span className="local-badge"><i></i> Demo mode</span><button className="help" title="About this app"><CircleHelp size={18}/></button></div></header>
      <div className="content">
        <section className="hero">
          <div><div className="eyebrow"><span className="eyebrow-line"></span> FOOTBALL STATISTICS WORKSPACE</div><h1>Understand the <em>opening minutes.</em></h1><p>Research match histories, goal timings and team performance in one place.</p></div>
          <div className="hero-icon"><Activity size={34}/><span>LIVE DATA<br/>NOT CONNECTED</span></div>
        </section>

        <section className="stats-grid">
          <div className="stat-card"><div className="stat-top"><span>Matches analysed</span><ChartNoAxesCombined size={17}/></div><strong>—</strong><small>Connect a data source to begin</small></div>
          <div className="stat-card"><div className="stat-top"><span>Historical events</span><Clock3 size={17}/></div><strong>—</strong><small>Goal-minute records</small></div>
          <div className="stat-card"><div className="stat-top"><span>Data coverage</span><Database size={17}/></div><strong>0%</strong><small>No provider connected</small></div>
        </section>

        <section className="panel search-panel">
          <div className="panel-heading"><div><div className="section-kicker">MATCH RESEARCH</div><h2>Explore a fixture</h2><p>Enter two teams to prepare a match research record.</p></div><span className="step-tag">01 / SEARCH</span></div>
          <form onSubmit={analyse} className="match-form">
            <label>HOME TEAM<input value={home} onChange={e=>setHome(e.target.value)} placeholder="e.g. Arsenal" /></label>
            <div className="versus">VS</div>
            <label>AWAY TEAM<input value={away} onChange={e=>setAway(e.target.value)} placeholder="e.g. Chelsea" /></label>
            <button className="primary-btn" type="submit"><Search size={17}/> Analyse match</button>
          </form>
          {notice && <div className="notice" role="status">{notice}</div>}
          <div className="fineprint"><ShieldCheck size={15}/> Statistical research only. No outcome is guaranteed.</div>
        </section>

        <div className="section-row"><div><div className="section-kicker">RECENT DATA</div><h2>Match research library</h2></div><div className="search-small"><Search size={15}/><input aria-label="Search sample matches" placeholder="Search teams..." value={query} onChange={e=>setQuery(e.target.value)}/></div></div>
        <section className="match-list">
          {filtered.map((m,i)=><button className={'match-row '+(selected===m?'chosen':'')} key={i} onClick={()=>setSelected(m)}>
            <div className="league-icon">{m.league==='La Liga'?'LL':'PL'}</div><div className="match-names"><b>{m.home}</b><span>vs</span><b>{m.away}</b><small>{m.league} · {m.date}</small></div><div className="match-result"><strong>{m.score}</strong><small>Full-time</small></div><div className="first-goal"><span>FIRST GOAL</span><b>{m.firstGoal}</b></div><ArrowUpRight size={17} className="row-arrow"/>
          </button>)}
          {filtered.length===0&&<div className="empty">No sample fixtures match that search.</div>}
        </section>

        {selected && <section className="panel detail-panel"><div className="panel-heading"><div><div className="section-kicker">FIXTURE DETAIL</div><h2>{selected.home} <span className="muted-vs">vs</span> {selected.away}</h2><p>{selected.note}</p></div><button className="close-btn" onClick={()=>setSelected(null)} aria-label="Close detail"><X size={18}/></button></div>
          <div className="detail-grid"><div><span>COMPETITION</span><b>{selected.league}</b></div><div><span>RESULT</span><b>{selected.score}</b></div><div><span>FIRST GOAL</span><b>{selected.firstGoal}</b></div></div>
          <h3 className="timeline-title">Goal event timeline</h3>
          {selected.events.length ? <div className="timeline">{selected.events.map((ev,i)=><div className="event" key={i}><b>{ev.m}'</b><span></span><small>{ev.t}</small></div>)}</div> : <p className="empty">No event data available. Connect a provider to load verified match events.</p>}
        </section>}

        <section className="bottom-grid">
          <div className="info-card"><div className="info-icon"><Database size={19}/></div><div><b>Verified data first</b><p>Live statistics will only be displayed when returned by a connected football data provider.</p></div></div>
          <div className="info-card"><div className="info-icon"><Clock3 size={19}/></div><div><b>Minute-by-minute research</b><p>Historical event timestamps can help describe how matches unfold over time.</p></div></div>
        </section>
        <footer>FIRST5 ANALYTICS <span>·</span> DEMO INTERFACE <span>·</span> NOT A LIVE PREDICTION SERVICE</footer>
      </div>
    </main>
  </div>;
}

export default App;
