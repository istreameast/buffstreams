import { Suspense } from 'react';
export default function WatchPage({ params, searchParams }:{ params:{hd:string}, searchParams:{u?:string,t?:string,lg?:string,yt?:string} }){
  const src = decodeURIComponent(searchParams.u||''); const title = decodeURIComponent(searchParams.t||'Live Stream'); const league = decodeURIComponent(searchParams.lg||'');
  return (<div style={{display:'grid',gap:12}}>
    <section className='section'><div style={{padding:'10px 14px',display:'flex',alignItems:'center',justifyContent:'space-between'}}><div><div className='time'>{league||'Live'}</div><div style={{fontSize:20,fontWeight:800}}>{title}</div></div><div className='badge live'>Live Streams</div></div></section>
    <section className='section'><div style={{display:'grid',placeItems:'center',padding:10}}>
      <div style={{width:'100%',maxWidth:980,aspectRatio:'16/9',background:'#000',borderRadius:12,overflow:'hidden',border:'1px solid var(--border)'}}>
        <Suspense fallback={<div style={{color:'#cfd7e1',padding:10}}>Loading player…</div>}><iframe src={src} allowFullScreen style={{width:'100%',height:'100%',border:0}} /></Suspense>
      </div></div>
    </section></div>);
}