var N=Object.defineProperty;var $=(s,t,e)=>t in s?N(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var f=(s,t,e)=>($(s,typeof t!="symbol"?t+"":t,e),e),R=(s,t,e)=>{if(!t.has(s))throw TypeError("Cannot "+e)};var i=(s,t,e)=>(R(s,t,"read from private field"),e?e.call(s):t.get(s)),h=(s,t,e)=>{if(t.has(s))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(s):t.set(s,e)},c=(s,t,e,r)=>(R(s,t,"write to private field"),r?r.call(s,e):t.set(s,e),e);var l=(s,t,e)=>(R(s,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const g of n.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&r(g)}).observe(document,{childList:!0,subtree:!0});function e(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=e(o);fetch(o.href,n)}})();var d,b,F;class K{constructor(t=500,e=500){h(this,b);f(this,"width");f(this,"height");h(this,d,void 0);const r=document.createElement("canvas");this.width=t,this.height=e,c(this,d,r),l(this,b,F).call(this)}render(t=document.body){t.append(i(this,d))}destroy(){i(this,d).remove()}clear(){this.getContext().clearRect(0,0,this.width,this.height)}getCanvas(){return i(this,d)}getContext(){const t=i(this,d).getContext("2d");if(!t)throw new Error("Context doesn't exist");return t}setSize(t,e){this.width=t,this.height=e,l(this,b,F).call(this)}}d=new WeakMap,b=new WeakSet,F=function(){i(this,d).width=this.width,i(this,d).height=this.height};class B{constructor({x:t=0,y:e=0,size:r=1,lineWidth:o=1,color:n="black"}={}){f(this,"x");f(this,"y");f(this,"size");f(this,"lineWidth");f(this,"color");this.x=t,this.y=e,this.size=r,this.lineWidth=o,this.color=n}render(t){const e=Math.ceil(this.lineWidth/2);t.beginPath(),t.lineWidth=this.lineWidth,t.strokeStyle=this.color,t.rect(this.x+e,this.y+e,this.size,this.size),t.stroke()}update({x:t,y:e}){this.x=t,this.y=e}move({x:t,y:e}){this.x+=t,this.y+=e}getVisibility(t){return!(this.x<-this.size||t.width+this.size<this.x||this.y<-this.size||t.height+this.size<this.y)}checkCollision(t){return this.x+this.size>=t.x&&this.x<=t.x+t.size&&this.y+this.size>=t.y&&this.y<=t.y+t.size}}var S,L;class V extends B{constructor(e={}){super(e);h(this,S,void 0);h(this,L,void 0);c(this,S,e.xAcceleration||1),c(this,L,e.yAcceleration||1)}move(){super.move({x:i(this,S),y:i(this,L)})}}S=new WeakMap,L=new WeakMap;var y,v,x;class G extends B{constructor({canvasSize:e,velocity:r}){super({x:e/2-8/2,y:e/2-8/2,size:8,color:"red"});h(this,y,void 0);h(this,v,void 0);h(this,x,void 0);c(this,y,r);const n=["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"];c(this,v,{ArrowUp:!1,ArrowRight:!1,ArrowDown:!1,ArrowLeft:!1}),c(this,x,n)}move(){const{ArrowUp:e,ArrowRight:r,ArrowDown:o,ArrowLeft:n}=i(this,v);e&&this.moveUp(),r&&this.moveRight(),o&&this.moveDown(),n&&this.moveLeft()}moveUp(){super.move({x:0,y:Math.min(-i(this,y))})}moveRight(){super.move({x:i(this,y),y:0})}moveDown(){super.move({x:0,y:i(this,y)})}moveLeft(){super.move({x:-i(this,y),y:0})}bindEvents(){document.addEventListener("keydown",({key:e})=>{i(this,x).includes(e)&&(i(this,v)[e]=!0)}),document.addEventListener("keyup",({key:e})=>{i(this,x).includes(e)&&(i(this,v)[e]=!1)})}}y=new WeakMap,v=new WeakMap,x=new WeakMap;function D(s=0,t=1){const e=Math.ceil(s),r=Math.floor(t);return Math.floor(Math.random()*(r-e+1)+e)}function W(){return Math.random()<.5}const m=500;var C,A,a,p,u,w,E,k,M,I,z,P,O,U;class H{constructor(){h(this,E);h(this,M);h(this,z);h(this,O);h(this,C,void 0);h(this,A,void 0);h(this,a,void 0);h(this,p,void 0);h(this,u,void 0);h(this,w,void 0);const t=new K(m,m);c(this,C,document.getElementById("app")),c(this,w,!1),c(this,A,t),c(this,a,t.getContext()),t.render(i(this,C)),c(this,p,new G({canvasSize:m,velocity:2.5})),i(this,p).bindEvents(),l(this,O,U).call(this,"DODGE","Press any key to start"),document.addEventListener("keydown",l(this,E,k).bind(this),{once:!0}),c(this,u,[])}}C=new WeakMap,A=new WeakMap,a=new WeakMap,p=new WeakMap,u=new WeakMap,w=new WeakMap,E=new WeakSet,k=function(){c(this,w,!1),c(this,u,[...Array(m/20)].map(l(this,M,I))),l(this,z,P).call(this,0)},M=new WeakSet,I=function(){const t=W(),e=5,r=D(0,500),o=t?m+e:-e,n=W();return new V({x:n?r:o,y:n?o:r,size:e,xAcceleration:D(1,3)*(t?-1:1),yAcceleration:D(1,3)*(t?-1:1),color:"white"})},z=new WeakSet,P=function(t){if(i(this,w)){l(this,O,U).call(this,"Game Over","Press any key to retry"),document.addEventListener("keydown",l(this,E,k).bind(this),{once:!0});return}if(t===0){window.requestAnimationFrame(l(this,z,P).bind(this));return}window.requestAnimationFrame(l(this,z,P).bind(this)),i(this,A).clear(),i(this,p).move(),i(this,p).render(i(this,a));for(let e=i(this,u).length-1;0<=e;--e){const r=i(this,u)[e],o=r.checkCollision(i(this,p));r.move(),r.render(i(this,a)),o&&c(this,w,!0),r.getVisibility(i(this,A))||(i(this,u).splice(e,1),i(this,u).push(l(this,M,I).call(this)))}},O=new WeakSet,U=function(t,e){const r="Helvetica, Arial, sans-serif";i(this,a).textAlign="center",i(this,a).fillStyle="white";const o=32,n=1.5,g=m/2-o*n;i(this,a).font=`${o}px ${r}`,i(this,a).fillText(t,m/2,g),e&&(i(this,a).font=`16px ${r}`,i(this,a).fillText(e,m/2,g+o*n))};new H;