(function(){"use strict";var t={3015:function(t,e,a){var i=a(9242),s=a(3396);const r={style:{float:"left"}};function n(t,e,a,i,n,d){const o=(0,s.up)("CalClock"),l=(0,s.up)("EventCalendar");return(0,s.wg)(),(0,s.iD)("div",r,[((0,s.wg)(),(0,s.j4)(s.Ob,{include:"CalClock"},[(0,s.Wm)(o,{is:t.current},null,8,["is"])],1024)),((0,s.wg)(),(0,s.j4)(s.Ob,null,[(0,s.Wm)(l,{msg:"",eventUrl:"http://dashpi:8080/calendar/api/v1.0/events"})],1024))])}var d=a(7139);const o={class:"scheduleContainer"},l=(0,s.uE)('<div id="700" class="time start-700" data-v-b9b38e2e>7:00</div><div id="730" class="time start-730" data-v-b9b38e2e>7:30</div><div id="800" class="time start-800" data-v-b9b38e2e>8:00</div><div id="830" class="time start-830" data-v-b9b38e2e>8:30</div><div id="900" class="time start-900" data-v-b9b38e2e>9:00</div><div id="930" class="time start-930" data-v-b9b38e2e>9:30</div><div id="1000" class="time start-1000" data-v-b9b38e2e>10:00</div><div id="1030" class="time start-1030" data-v-b9b38e2e>10:30</div><div id="1100" class="time start-1100" data-v-b9b38e2e>11:00</div><div id="1130" class="time start-1130" data-v-b9b38e2e>11:30</div><div id="1200" class="time start-1200" data-v-b9b38e2e>12:00</div><div id="1230" class="time start-1230" data-v-b9b38e2e>12:30</div><div id="1300" class="time start-1300" data-v-b9b38e2e>13:00</div><div id="1330" class="time start-1330" data-v-b9b38e2e>13:30</div><div id="1400" class="time start-1400" data-v-b9b38e2e>14:00</div><div id="1430" class="time start-1430" data-v-b9b38e2e>14:30</div><div id="1500" class="time start-1500" data-v-b9b38e2e>15:00</div><div id="1530" class="time start-1530" data-v-b9b38e2e>15:30</div><div id="1600" class="time start-1600" data-v-b9b38e2e>16:00</div><div id="1630" class="time start-1630" data-v-b9b38e2e>16:30</div><div id="1700" class="time start-1700" data-v-b9b38e2e>17:00</div><div id="1730" class="time start-1730" data-v-b9b38e2e>17:30</div><div id="1800" class="time start-1800" data-v-b9b38e2e>18:00</div><div id="1830" class="time start-1830" data-v-b9b38e2e>18:30</div><div id="1900" class="time start-1900" data-v-b9b38e2e>19:00</div><div id="1930" class="time start-1930" data-v-b9b38e2e>19:30</div><div id="2000" class="time start-2000" data-v-b9b38e2e>20:00</div><div id="2030" class="time start-2030" data-v-b9b38e2e>20:30</div><div id="2100" class="time start-2100" data-v-b9b38e2e>21:00</div><div id="2130" class="time start-2130" data-v-b9b38e2e>21:30</div>',30);function v(t,e,a,i,r,n){return(0,s.wg)(),(0,s.iD)("div",o,[l,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(t.events,(t=>((0,s.wg)(),(0,s.iD)("div",{key:t,class:(0,d.C_)(["event",t.startClass+" "+t.endClass+" "+this.getColorClass(t)+" length-1"])},[(0,s.Uk)((0,d.zw)(t.subject)+" ",1),(0,s._)("span",null,(0,d.zw)(n.getFormattedTime(t)),1)],2)))),128))])}var c={name:"EventCalendar",props:{msg:String,eventUrl:String},data:function(){return{events:[],eventJson:"",timeSlots:Array(48).fill(0),timer:""}},created(){this.getCalendarEvents(this.eventUrl)},methods:{getCalendarEvents(t){fetch(t,{method:"GET"}).then((t=>{if(t.ok)return t.json();alert("Server Returned "+t.status+" : "+t.statusText)})).then((t=>{null!=t&&(t.value.forEach((t=>{this.fillTimeBlocks(t),this.reserveSlots(t)})),this.events=t.value,this.AlignView())})).catch((t=>{console.log(t)})),this.timer=setTimeout((()=>{this.getCalendarEvents("http://dashpi:8080/calendar/api/v1.0/events")}),3e4)},AlignView(){var t=new Date,e=t.getHours(),a=t.getMinutes();e<7&&(e=7),e>21&&(e=21);var i=e.toString()+(a<30?"00":"30"),s=e.toString();s=a<30?(e-1).toString()+"30":e.toString()+"00";var r=document.getElementById(i),n=document.getElementById(s);this.$nextTick((()=>r.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}))),r.style.backgroundColor="#FFA726",n.style.backgroundColor="#FFFFFF"},cancelAutoUpdate(){clearInterval(this.timer)},getLocalTime(t,e){return new Date(t.replace("T"," ")+" "+e)},fillTimeBlocks(t){var e=this.getLocalTime(t.start.dateTime,t.start.timeZone),a=this.getLocalTime(t.end.dateTime,t.end.timeZone),i=e.getHours(),s=a.getHours(),r=e.getMinutes()+0,n=a.getMinutes()+0;t.startSlot=2*i+(r>29),t.endSlot=2*s+(n>29)-1,t.startClass="start-"+Math.floor(t.startSlot/2)+String(t.startSlot%2*30).padStart(2,"0"),t.endClass="end-"+Math.floor(t.endSlot/2)+String(t.endSlot%2*30).padStart(2,"0")},reserveSlots(t){for(let e=t.startSlot;e<t.endSlot;e++)this.timeSlots[e]++},getFormattedTime(t){var e=this.getLocalTime(t.start.dateTime,t.start.timeZone),a=this.getLocalTime(t.end.dateTime,t.end.timeZone),i=e.getHours(),s=a.getHours(),r=e.getMinutes(),n=a.getMinutes();return`${i}:${String(r).padStart(2,"0")} - ${s}:${String(n).padStart(2,"0")}`},getColorClass(t){var e=new Date,a=this.getLocalTime(t.start.dateTime,t.start.timeZone),i=this.getLocalTime(t.end.dateTime,t.end.timeZone),s="stage-saturn";return e>=a&&(s="past"),e>=a&&e<=i&&(s="happening"),"accepted"!=t.responseStatus.response&&"organizer"!=t.responseStatus.response&&(s+=" tentative"),s}}},u=a(89);const m=(0,u.Z)(c,[["render",v],["__scopeId","data-v-b9b38e2e"]]);var b=m;const g={class:"toptime"},h={class:"led-box"},p={class:"timedisplay"},f=(0,s._)("div",{class:"led-box-r"},[(0,s._)("div",{class:"led-blue"})],-1);function S(t,e,a,i,r,n){return(0,s.wg)(),(0,s.iD)("div",g,[(0,s._)("div",h,[(0,s._)("div",{class:(0,d.C_)(t.statusLed)},null,2)]),(0,s._)("div",p,(0,d.zw)(t.currentDate)+" - "+(0,d.zw)(t.currentTime),1),f])}var T={name:"CalClock",props:{},data:function(){return{currentTime:"",currentDate:"",timer:"",online:"",statusLed:""}},created(){this.updateTime()},methods:{updateTime(){var t=new Date,e=t.getHours(),a=String(t.getMinutes()).padStart(2,"0"),i=t.getDate(),s=t.getMonth()+1,r=t.getFullYear();this.currentDate=s+"/"+i+"/"+r,this.currentTime=e+":"+a,navigator.onLine?this.statusLed="led-green":this.statusLed="led-red",this.timer=setTimeout((()=>{this.updateTime()}),3e4)}}};const C=(0,u.Z)(T,[["render",S]]);var w=C,k={name:"App",components:{CalClock:w,EventCalendar:b}};const y=(0,u.Z)(k,[["render",n]]);var _=y;(0,i.ri)(_).mount("#app")}},e={};function a(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i](r,r.exports,a),r.exports}a.m=t,function(){var t=[];a.O=function(e,i,s,r){if(!i){var n=1/0;for(v=0;v<t.length;v++){i=t[v][0],s=t[v][1],r=t[v][2];for(var d=!0,o=0;o<i.length;o++)(!1&r||n>=r)&&Object.keys(a.O).every((function(t){return a.O[t](i[o])}))?i.splice(o--,1):(d=!1,r<n&&(n=r));if(d){t.splice(v--,1);var l=s();void 0!==l&&(e=l)}}return e}r=r||0;for(var v=t.length;v>0&&t[v-1][2]>r;v--)t[v]=t[v-1];t[v]=[i,s,r]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var i in e)a.o(e,i)&&!a.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};a.O.j=function(e){return 0===t[e]};var e=function(e,i){var s,r,n=i[0],d=i[1],o=i[2],l=0;if(n.some((function(e){return 0!==t[e]}))){for(s in d)a.o(d,s)&&(a.m[s]=d[s]);if(o)var v=o(a)}for(e&&e(i);l<n.length;l++)r=n[l],a.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return a.O(v)},i=self["webpackChunkmy_app"]=self["webpackChunkmy_app"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=a.O(void 0,[998],(function(){return a(3015)}));i=a.O(i)})();
//# sourceMappingURL=app.f68ea70c.js.map