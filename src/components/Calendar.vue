/* eslint-disable vue/multi-word-component-names */
/* eslint-disable vue/require-v-for-key */
<template>
  <div class="scheduleContainer">
    
        <!-- TIMES TODO: Make this a damn loop for god's sake.-->
        <div id="700" class="time start-700">7:00</div>
        <div id="730" class="time start-730">7:30</div>
        <div id="800" class="time start-800">8:00</div>
        <div id="830" class="time start-830">8:30</div>
        <div id="900" class="time start-900">9:00</div>
        <div id="930" class="time start-930">9:30</div>
        <div id="1000" class="time start-1000">10:00</div>
        <div id="1030" class="time start-1030">10:30</div>
        <div id="1100" class="time start-1100">11:00</div>
        <div id="1130" class="time start-1130">11:30</div>
        <div id="1200" class="time start-1200">12:00</div>
        <div id="1230" class="time start-1230">12:30</div>
        <div id="1300" class="time start-1300">13:00</div>
        <div id="1330" class="time start-1330">13:30</div>
        <div id="1400" class="time start-1400">14:00</div>
        <div id="1430" class="time start-1430">14:30</div>
        <div id="1500" class="time start-1500">15:00</div>
        <div id="1530" class="time start-1530">15:30</div>
        <div id="1600" class="time start-1600">16:00</div>
        <div id="1630" class="time start-1630">16:30</div>
        <div id="1700" class="time start-1700">17:00</div>
        <div id="1730" class="time start-1730">17:30</div>
        <div id="1800" class="time start-1800">18:00</div>
        <div id="1830" class="time start-1830">18:30</div>
        <div id="1900" class="time start-1900">19:00</div>
        <div id="1930" class="time start-1930">19:30</div>
        <div id="2000" class="time start-2000">20:00</div>
        <div id="2030" class="time start-2030">20:30</div>
        <div id="2100" class="time start-2100">21:00</div>
        <div id="2130" class="time start-2130">21:30</div>
        
        <!-- EVENTS 
        <div class="event stage-earth start-1130 end-1330 length-4">Speaker Three <span>Earth Stage</span></div>
        -->
        
        <div v-for="event in events" :key="event" class="event " :class="event.startClass +' ' +event.endClass + ' ' + this.getColorClass(event) + ' length-1'" >
          {{ event.subject}} <span>{{getFormattedTime(event)}}</span>
        </div>
        
    </div>
    <div v-show="showErr" class="err" id="error">Error: {{lastError}}</div>
</template>

<script>
export default {
  name: 'EventCalendar',
  props: {
    msg: String,
    eventUrl: String,
  },
  data:function() {
    return {
      events:[],
      eventJson:'',
      timeSlots: Array(48).fill(0),
      timer: '',
      lastError: '',
      showErr: false
    };
  },
  created(){
    //this.events.push(this.event);
    this.getCalendarEvents(this.eventUrl);
    //this.timer=setInterval(this.getCalendarEvents(this.eventUrl), 5000); //See hack note below.
  },
  methods:{
    getCalendarEvents(url){
      fetch(url,
      {"method":"GET"})
      .then(response=> {
        if(response.ok){
          return response.json()
        }else{
          alert("Server Returned " + response.status +" : " + response.statusText);
        }
      })
      .then(response=> {
        //First pass, find and assign the time slots and fill an array for each slot with the number of events overlapping.
        if(response != null){
          response.value.forEach(element => {
            this.fillTimeBlocks(element);
            this.reserveSlots(element);
          });
          //Second pass, fill the total number of events that overlap for each event
          // response.value.forEach(element => {
          //  
          //});
          this.events = response.value;
          this.AlignView();
        }
      })
      .catch(err => {
        console.log(err);
        this.lastError=err;
        this.showErr=true;
      });
        //HACK: BIIIG HACK HERE! This should really be handled in the parent object with a call to setInterval.
        // However, even with Keep-alive, it seems to be throwing a reference error.  So need to come back and look at this.
        this.timer=setTimeout(() => {
          this.getCalendarEvents("http://dashpi:8080/calendar/api/v1.0/events");
        }, 30000);
    },
    AlignView(){
      var currentTime= new Date();
      var hour = currentTime.getHours();
      var minute = currentTime.getMinutes();
      if(hour<7) hour=7;
      if(hour>21) hour=21;

      var hourID = hour.toString() + ((minute<30)?'00':'30');
      var priorHourID = hour.toString();
      if(minute<30){
          priorHourID = (hour-1).toString() + "30";
      }else{
        priorHourID = hour.toString() + "00";
      }     
      var hourElem =  document.getElementById(hourID);
      var priorHourElem = document.getElementById(priorHourID);
      
      this.$nextTick(() => hourElem.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
      }));
      hourElem.style.backgroundColor="#FFA726";
      priorHourElem.style.backgroundColor="#FFFFFF";
    },
    cancelAutoUpdate () {
      clearInterval(this.timer);
    },
    getLocalTime(datetime,timezone){
      return new Date(datetime.replace("T"," ") +" " +timezone);
    },
    fillTimeBlocks(evt){
      var startTime = this.getLocalTime(evt.start.dateTime,evt.start.timeZone);
      var endTime = this.getLocalTime(evt.end.dateTime,evt.end.timeZone);
      var startHour = startTime.getHours();
      var endHour = endTime.getHours();
      var startMinute = startTime.getMinutes()+0;
      var endMinute = endTime.getMinutes()+0;
      
      //TODO: Multi-day events.
      evt.startSlot=startHour*2 + (startMinute>29);
      evt.endSlot=endHour*2 + (endMinute>29)-1;
      evt.startClass = "start-"+ Math.floor(evt.startSlot/2) + String((evt.startSlot%2)*30).padStart(2,'0');
      evt.endClass = "end-"+ Math.floor(evt.endSlot/2) + String((evt.endSlot%2)*30).padStart(2,'0');
    },
    reserveSlots(evt){
      for (let index = evt.startSlot; index < evt.endSlot; index++) {
        this.timeSlots[index]++;
      }      
    },
    getFormattedTime(evt){
       var startTime = this.getLocalTime(evt.start.dateTime,evt.start.timeZone);
      var endTime = this.getLocalTime(evt.end.dateTime,evt.end.timeZone);
      var startHour = startTime.getHours();
      var endHour = endTime.getHours();
      var startMinute = startTime.getMinutes();
      var endMinute = endTime.getMinutes();

      return `${startHour}:${String(startMinute).padStart(2,'0')} - ${endHour}:${String(endMinute).padStart(2,'0')}`;
    },
    getColorClass(evt){
      var currentTime = new Date();
      var eventStartTime = this.getLocalTime(evt.start.dateTime,evt.start.timeZone);
      var eventEndTime = this.getLocalTime(evt.end.dateTime,evt.end.timeZone);
      var returnClass = "stage-saturn";

      if (currentTime >= eventStartTime) {
        returnClass = "past";
      }
      if( currentTime >= eventStartTime && currentTime <= eventEndTime){
        returnClass="happening";
      }
      if ((evt.responseStatus.response != 'accepted') && (evt.responseStatus.response !='organizer')){
        returnClass += " tentative"; 
      }
      
      return returnClass;
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 4rem 0;
  font-family: -system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

.scheduleContainer {
  display: grid;
  grid-gap: 0.2rem;
  grid-template-columns: 5rem repeat(4, 1fr);
  grid-template-rows: repeat(30, 1fr);
  grid-template-areas: "time700 stage stage stage stage" "time730 stage stage stage stage" "time800 stage stage stage stage" "time830 stage stage stage stage" "time900 stage stage stage stage" "time930 stage stage stage stage" "time1000 stage stage stage stage" "time1030 stage stage stage stage" "time1100 stage stage stage stage" "time1130 stage stage stage stage" "time1200 stage stage stage stage" "time1230 stage stage stage stage" "time1300 stage stage stage stage" "time1330 stage stage stage stage" "time1400 stage stage stage stage" "time1430 stage stage stage stage" "time1500 stage stage stage stage" "time1530 stage stage stage stage" "time1600 stage stage stage stage" "time1630 stage stage stage stage" "time1700 stage stage stage stage" "time1730 stage stage stage stage" "time1800 stage stage stage stage" "time1830 stage stage stage stage" "time1900 stage stage stage stage" "time1930 stage stage stage stage" "time2000 stage stage stage stage" "time2030 stage stage stage stage" "time2100 stage stage stage stage" "time2130 stage stage stage stage";
}

div .err{
  position: fixed;
  bottom: 0;
  z-index: 999;
  width:100%;
  height:50px;
  background-color: white;
  justify-content: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* fraction*/
}
/**
 * Time
 */
.time {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: thin dotted #ccc;
  height: 100%;
  padding: 0 0.5rem;
}
.time.start-700 {
  grid-area: time700;
}
.time.start-730 {
  grid-area: time730;
}
.time.start-800 {
  grid-area: time800;
}
.time.start-830 {
  grid-area: time830;
}
.time.start-900 {
  grid-area: time900;
}
.time.start-930 {
  grid-area: time930;
}
.time.start-1000 {
  grid-area: time1000;
}
.time.start-1030 {
  grid-area: time1030;
}
.time.start-1100 {
  grid-area: time1100;
}
.time.start-1130 {
  grid-area: time1130;
}
.time.start-1200 {
  grid-area: time1200;
}
.time.start-1230 {
  grid-area: time1230;
}
.time.start-1300 {
  grid-area: time1300;
}
.time.start-1330 {
  grid-area: time1330;
}
.time.start-1400 {
  grid-area: time1400;
}
.time.start-1430 {
  grid-area: time1430;
}
.time.start-1500 {
  grid-area: time1500;
}
.time.start-1530 {
  grid-area: time1530;
}
.time.start-1600 {
  grid-area: time1600;
}
.time.start-1630 {
  grid-area: time1630;
}
.time.start-1700 {
  grid-area: time1700;
}
.time.start-1730 {
  grid-area: time1730;
}
.time.start-1800 {
  grid-area: time1800;
}
.time.start-1830 {
  grid-area: time1830;
}
.time.start-1900 {
  grid-area: time1900;
}
.time.start-1930 {
  grid-area: time1930;
}
.time.start-2000 {
  grid-area: time2000;
}
.time.start-2030 {
  grid-area: time2030;
}
.time.start-2100 {
  grid-area: time2100;
}
.time.start-2130 {
  grid-area: time2130;
}
.time[class*="30"]:not(.start-1300) {
  font-size: 0.8rem;
  color: #ccc;
}

/**
 * Event
 */
.event {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0.5rem 1rem;
  background-color: orange;
  border-radius: 0.2rem;
  font-size: 0.8rem;
  font-weight: bold;
  line-height: 1.4;
}
.event span {
  display: block;
  width: 100%;
  font-size: 0.8em;
  font-weight: normal;
}
.event.start-700 {
  grid-row-start: time700;
}
.event.start-730 {
  grid-row-start: time730;
}
.event.start-800 {
  grid-row-start: time800;
}
.event.start-830 {
  grid-row-start: time830;
}
.event.start-900 {
  grid-row-start: time900;
}
.event.start-930 {
  grid-row-start: time930;
}
.event.start-1000 {
  grid-row-start: time1000;
}
.event.start-1030 {
  grid-row-start: time1030;
}
.event.start-1100 {
  grid-row-start: time1100;
}
.event.start-1130 {
  grid-row-start: time1130;
}
.event.start-1200 {
  grid-row-start: time1200;
}
.event.start-1230 {
  grid-row-start: time1230;
}
.event.start-1300 {
  grid-row-start: time1300;
}
.event.start-1330 {
  grid-row-start: time1330;
}
.event.start-1400 {
  grid-row-start: time1400;
}
.event.start-1430 {
  grid-row-start: time1430;
}
.event.start-1500 {
  grid-row-start: time1500;
}
.event.start-1530 {
  grid-row-start: time1530;
}
.event.start-1600 {
  grid-row-start: time1600;
}
.event.start-1630 {
  grid-row-start: time1630;
}
.event.start-1700 {
  grid-row-start: time1700;
}
.event.start-1730 {
  grid-row-start: time1730;
}
.event.start-1800 {
  grid-row-start: time1800;
}
.event.start-1830 {
  grid-row-start: time1830;
}
.event.start-1900 {
  grid-row-start: time1900;
}
.event.start-1930 {
  grid-row-start: time1930;
}
.event.start-2000 {
  grid-row-start: time2000;
}
.event.start-2030 {
  grid-row-start: time2030;
}
.event.start-2100 {
  grid-row-start: time2100;
}
.event.start-2130 {
  grid-row-start: time2130;
}
.event.end-800 {
  grid-row-end: time800;
}
.event.end-830 {
  grid-row-end: time830;
}
.event.end-900 {
  grid-row-end: time900;
}
.event.end-930 {
  grid-row-end: time930;
}
.event.end-1000 {
  grid-row-end: time1000;
}
.event.end-1030 {
  grid-row-end: time1030;
}
.event.end-1100 {
  grid-row-end: time1100;
}
.event.end-1130 {
  grid-row-end: time1130;
}
.event.end-1200 {
  grid-row-end: time1200;
}
.event.end-1230 {
  grid-row-end: time1230;
}
.event.end-1300 {
  grid-row-end: time1300;
}
.event.end-1330 {
  grid-row-end: time1330;
}
.event.end-1400 {
  grid-row-end: time1400;
}
.event.end-1430 {
  grid-row-end: time1430;
}
.event.end-1500 {
  grid-row-end: time1500;
}
.event.end-1530 {
  grid-row-end: time1530;
}
.event.end-1600 {
  grid-row-end: time1600;
}
.event.end-1630 {
  grid-row-end: time1630;
}
.event.end-1700 {
  grid-row-end: time1700;
}
.event.end-1730 {
  grid-row-end: time1730;
}
.event.end-1800 {
  grid-row-end: time1800;
}
.event.end-1830 {
  grid-row-end: time1830;
}
.event.end-1900 {
  grid-row-end: time1900;
}
.event.end-1930 {
  grid-row-end: time1930;
}
.event.end-2000 {
  grid-row-end: time2000;
}
.event.end-2030 {
  grid-row-end: time2030;
}
.event.end-2100 {
  grid-row-end: time2100;
}
.event.end-2130 {
  grid-row-end: time2130;
}
.event.length-1 {
  grid-column-end: span 1;
}
.event.length-2 {
  grid-column-end: span 2;
}
.event.length-3 {
  grid-column-end: span 3;
}
.event.length-4 {
  grid-column-end: span 4;
}
.event.past {
  background-color: #a8abad !important;
}
.event.happening {
  background-color: #FFA726 !important;
}
.event.tentative {
  background: repeating-linear-gradient(
  45deg,
  rgba(0, 0, 0, 0.2),
  rgba(0, 0, 0, 0.2) 5px,
  rgba(0, 0, 0, 0.0) 5px,
  rgba(0, 0, 0, 0.0) 10px
); 
}
.event.stage-earth {
  background-color: #FFA726;
}
.event.stage-mercury {
  background-color: #9CCC65;
}
.event.stage-venus {
  background-color: #FF8A65;
}
.event.stage-mars {
  background-color: #B3E5FC;
}
.event.stage-jupiter {
  background-color: #81D4FA;
}
.event.stage-saturn {
  background-color: #26C6DA;
}

</style>
