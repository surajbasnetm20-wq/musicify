import os,re
from flask import Flask,request,jsonify
from ytmusicapi import YTMusic
app=Flask(__name__)
ORIGIN=os.getenv('MUSICIFY_ORIGIN','https://musicify.surajbasnetm20.workers.dev')
@app.after_request
def cors(r):
    if request.headers.get('Origin')==ORIGIN:r.headers['Access-Control-Allow-Origin']=ORIGIN
    r.headers['Vary']='Origin';return r

def client():return YTMusic()
def tracks(rows):
    out=[];seen=set()
    for t in rows:
        v=t.get('videoId') or ''
        if not re.fullmatch(r'[\w-]{11}',v) or v in seen or not t.get('title'):continue
        seen.add(v);out.append(dict(id=v,title=t['title'],channel=', '.join(a.get('name','') for a in (t.get('artists') or [])),duration=t.get('duration') or ''))
    return out
@app.get('/health')
def health():return jsonify(service='musicify-discovery',version='14.4.0')
@app.get('/search')
def search():
    q=request.args.get('q','').strip()
    if not 1<=len(q)<=200:return jsonify(error='Invalid query'),400
    return jsonify(items=tracks(client().search(q,filter='songs',limit=25)))
@app.get('/charts')
def charts():
    c=request.args.get('country','ZZ')
    if not re.fullmatch('[A-Z]{2}',c):return jsonify(error='Invalid country'),400
    data=client().get_charts(c)
    return jsonify(country=data.get('countries',{}).get('selected'),playlists=[{'title':p.get('title'),'id':p.get('playlistId')} for k in ('videos','daily','weekly','genres','languages') for p in (data.get(k) or []) if isinstance(p,dict) and p.get('playlistId')])
@app.errorhandler(Exception)
def error(e):
    return jsonify(error='Discovery service unavailable'),502
if __name__=='__main__':app.run(host='127.0.0.1',port=8000)
