var ut=Object.defineProperty;var ft=(r,e,t)=>e in r?ut(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var w=(r,e,t)=>(ft(r,typeof e!="symbol"?e+"":e,t),t),j=(r,e,t)=>{if(!e.has(r))throw TypeError("Cannot "+t)};var i=(r,e,t)=>(j(r,e,"read from private field"),t?t.call(r):e.get(r)),n=(r,e,t)=>{if(e.has(r))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(r):e.set(r,t)},h=(r,e,t,o)=>(j(r,e,"write to private field"),o?o.call(r,t):e.set(r,t),t);var d=(r,e,t)=>(j(r,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(s){if(s.ep)return;s.ep=!0;const c=t(s);fetch(s.href,c)}})();var x,$,J;class yt{constructor(e=500,t=500){n(this,$);w(this,"width");w(this,"height");n(this,x,void 0);const o=document.createElement("canvas");this.width=e,this.height=t,h(this,x,o),d(this,$,J).call(this)}render(e=document.body){e.append(i(this,x))}destroy(){i(this,x).remove()}clear(){this.getContext().clearRect(0,0,this.width,this.height)}getCanvas(){return i(this,x)}getContext(){const e=i(this,x).getContext("2d");if(!e)throw new Error("Context doesn't exist");return e}setSize(e,t){this.width=e,this.height=t,d(this,$,J).call(this)}}x=new WeakMap,$=new WeakSet,J=function(){i(this,x).width=this.width,i(this,x).height=this.height};class ht{constructor({x:e=0,y:t=0,size:o=1,lineWidth:s=1,color:c="black"}={}){w(this,"x");w(this,"y");w(this,"size");w(this,"lineWidth");w(this,"color");this.x=e,this.y=t,this.size=o,this.lineWidth=s,this.color=c}render(e){throw new Error("Implement render method")}update({x:e,y:t}){this.x=e,this.y=t}move({x:e,y:t},o){if(o){this.x=Math.min(Math.max(0,this.x+e),o.x-this.size),this.y=Math.min(Math.max(0,this.y+t),o.y-this.size);return}this.x+=e,this.y+=t}getVisibility(e){return!(this.x<-this.size||e.width+this.size<this.x||this.y<-this.size||e.height+this.size<this.y)}checkCollision(e){return this.x+this.size>=e.x&&this.x<=e.x+e.size&&this.y+this.size>=e.y&&this.y<=e.y+e.size}}class mt extends ht{constructor(e){super(e)}render(e){const t=Math.ceil(this.lineWidth/2);e.beginPath(),e.lineWidth=this.lineWidth,e.strokeStyle=this.color,e.arc(this.x+t,this.y+t,this.size/2,0,2*Math.PI),e.stroke()}}var B,N;class ot extends mt{constructor(t={}){super(t);n(this,B,void 0);n(this,N,void 0);h(this,B,t.xAcceleration||1),h(this,N,t.yAcceleration||1)}moveTo(t){super.move({x:i(this,B)*t,y:i(this,N)*t})}}B=new WeakMap,N=new WeakMap;const pt="/dodge/assets/star-82675554.svg";var F,g,S,P,O,A,v,D,Y,nt;class xt extends ht{constructor({canvasSize:t,velocity:o,boundary:s}){super({x:t/2-8/2,y:t/2-8/2,size:8,color:"red"});n(this,Y);n(this,F,void 0);n(this,g,void 0);n(this,S,void 0);n(this,P,void 0);n(this,O,void 0);n(this,A,void 0);n(this,v,void 0);n(this,D,void 0);w(this,"useKeyboard");h(this,O,t),h(this,v,8),h(this,g,o),h(this,A,s);const l=["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"];h(this,S,{ArrowUp:!1,ArrowRight:!1,ArrowDown:!1,ArrowLeft:!1}),h(this,P,l),h(this,D,{x:0,y:0}),h(this,F,new Image(8,8)),i(this,F).src=pt,this.useKeyboard=!1}resetPosition(){super.update({x:i(this,O)/2-i(this,v)/2,y:i(this,O)/2-i(this,v)/2})}render(t){t.drawImage(i(this,F),this.x-i(this,v)/2,this.y-i(this,v)/2,i(this,v)*2,i(this,v)*2)}moveTo(t){this.useKeyboard||this.moveDirections(t);const{ArrowUp:o,ArrowRight:s,ArrowDown:c,ArrowLeft:l}=i(this,S);o&&this.moveUp(t),s&&this.moveRight(t),c&&this.moveDown(t),l&&this.moveLeft(t)}moveUp(t){super.move({x:0,y:Math.min(-i(this,g))*t},i(this,A))}moveRight(t){super.move({x:i(this,g)*t,y:0},i(this,A))}moveDown(t){super.move({x:0,y:i(this,g)*t},i(this,A))}moveLeft(t){super.move({x:-i(this,g)*t,y:0},i(this,A))}moveDirections(t){const{x:o,y:s}=i(this,D);super.move({x:o*i(this,g)*t,y:s*i(this,g)*t},i(this,A))}bindEvents(){document.addEventListener("keydown",({key:t})=>{i(this,P).includes(t)&&(i(this,S)[t]=!0)}),document.addEventListener("keyup",({key:t})=>{i(this,P).includes(t)&&(i(this,S)[t]=!1)}),window.addEventListener("deviceorientation",d(this,Y,nt).bind(this),{passive:!0})}}F=new WeakMap,g=new WeakMap,S=new WeakMap,P=new WeakMap,O=new WeakMap,A=new WeakMap,v=new WeakMap,D=new WeakMap,Y=new WeakSet,nt=function({beta:t,gamma:o}){if(t==null||o==null)return;const s=3,c=50,l=Math.min(1,Math.max(o/90,-1))*s,a=Math.min(1,Math.max((t-c)/180,-1))*s;h(this,D,{x:l,y:a})};function R(r=0,e=1){const t=Math.ceil(r),o=Math.floor(e);return Math.floor(Math.random()*(o-t+1)+t)}function q(){return Math.random()<.5}const f=500;var U,C,u,y,p,z,b,L,M,E,W,_,rt,X,ct,k,Q,I,G,Z,lt,T,tt,K,H,V,et;class gt{constructor(){n(this,_);n(this,X);n(this,k);n(this,I);n(this,Z);n(this,T);n(this,K);n(this,V);n(this,U,void 0);n(this,C,void 0);n(this,u,void 0);n(this,y,void 0);n(this,p,void 0);n(this,z,void 0);n(this,b,void 0);n(this,L,void 0);n(this,M,void 0);n(this,E,void 0);n(this,W,void 0);const e=new yt(f,f);h(this,U,document.getElementById("app")),h(this,b,!0),h(this,W,!1),h(this,C,e),h(this,u,e.getContext()),e.render(i(this,U)),h(this,y,new xt({canvasSize:f,velocity:250,boundary:{x:f,y:f}})),i(this,y).bindEvents(),d(this,V,et).call(this,"DODGE","Press space or click to start"),document.addEventListener("keydown",d(this,_,rt).bind(this)),document.addEventListener("click",d(this,X,ct).bind(this)),h(this,p,[]),h(this,z,[]),h(this,L,0),h(this,M,0),h(this,E,0)}}U=new WeakMap,C=new WeakMap,u=new WeakMap,y=new WeakMap,p=new WeakMap,z=new WeakMap,b=new WeakMap,L=new WeakMap,M=new WeakMap,E=new WeakMap,W=new WeakMap,_=new WeakSet,rt=function({key:e}){e!==" "||!i(this,b)||(i(this,y).useKeyboard=!0,d(this,k,Q).call(this))},X=new WeakSet,ct=function(){i(this,b)&&(i(this,y).useKeyboard=!1,d(this,k,Q).call(this))},k=new WeakSet,Q=function(){i(this,y).resetPosition(),h(this,b,!1),h(this,E,0),h(this,L,0),h(this,M,0),h(this,p,[...Array(f/10)].map(d(this,I,G))),h(this,z,[]),d(this,K,H).call(this,0)},I=new WeakSet,G=function(){const e=q(),t=2,o=R(0,500),s=e?f+t:-t,c=q(),l=c?o:s,a=c?s:o,m=f/2;return new ot({x:l,y:a,size:t,xAcceleration:R(1e3,2e3)/10*(l<m?1:-1),yAcceleration:R(1e3,2e3)/10*(a<m?1:-1),color:"#FF8551"})},Z=new WeakSet,lt=function(){const e=q(),t=2,o=R(0,500),s=e?f+t:-t,c=q(),l=i(this,y).x,a=i(this,y).y,m=c?o:s,it=c?s:o,st=R(80,120)/100,at=(l-m)/st,dt=(a-it)/st;return new ot({x:m,y:it,size:t,xAcceleration:at,yAcceleration:dt,color:"#9AC5F4"})},T=new WeakSet,tt=function(e,t){const o=e.checkCollision(i(this,y));e.moveTo(t),e.render(i(this,u)),o&&!i(this,W)&&h(this,b,!0)},K=new WeakSet,H=function(e,t=!1){if(i(this,b)){d(this,V,et).call(this,"Game Over","Press space or click to retry");return}const o=(t?0:e-i(this,M))/1e3;if(h(this,M,e),e===0||i(this,M)===0){window.requestAnimationFrame(a=>d(this,K,H).call(this,a,!0));return}t&&h(this,L,e),window.requestAnimationFrame(d(this,K,H).bind(this)),i(this,C).clear();const s=(e-i(this,L))/1e3,c=12,l="Helvetica, Arial, sans-serif";i(this,u).font=`${c}px ${l}`,i(this,u).fillStyle="white",i(this,u).textAlign="left",i(this,u).fillText(`${i(this,p).length} bullets`,10,f-10,f),i(this,u).textAlign="right",i(this,u).fillText(`${s.toFixed(2)}s`,f-10,f-10),i(this,y).moveTo(o),i(this,y).render(i(this,u)),2<=s-i(this,E)&&(h(this,E,s),i(this,p).push(d(this,I,G).call(this)),i(this,z).push(d(this,Z,lt).call(this)));for(let a=i(this,p).length-1;0<=a;--a){const m=i(this,p)[a];d(this,T,tt).call(this,m,o),m.getVisibility(i(this,C))||(i(this,p).splice(a,1),i(this,p).push(d(this,I,G).call(this)))}for(let a=i(this,z).length-1;0<=a;--a){const m=i(this,z)[a];d(this,T,tt).call(this,m,o),m.getVisibility(i(this,C))||i(this,z).splice(a,1)}},V=new WeakSet,et=function(e,t){const o="Helvetica, Arial, sans-serif";i(this,u).textAlign="center",i(this,u).fillStyle="white";const s=32,c=1.5,l=f/2-s*c;i(this,u).font=`${s}px ${o}`,i(this,u).fillText(e,f/2,l),t&&(i(this,u).font=`16px ${o}`,i(this,u).fillText(t,f/2,l+s*c))};new gt;
