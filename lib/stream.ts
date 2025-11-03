export type StreamLink = { hd:number; link:string };
export type EventItem = { id?: number|string; league?: string; title?: string; when_et?: string; ts_et?: number; status?: string; hds?: number[]; streams?: StreamLink[]; };
export type ApiDay = { items: EventItem[] };
export type ApiResponse = { days: ApiDay[] };
export const isLive = (e: EventItem) => (e.status||'').toUpperCase()==='LIVE' || (e.status||'').toUpperCase().includes('HALF') || (e.status||'').toUpperCase().includes('QUARTER');
export const isExpired = (e: EventItem) => { const now = Date.now()/1000; const end = (e.ts_et||0) + 3*3600; return !!e.ts_et && end < now; };
