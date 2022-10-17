<template>
  <div class="toptime">
    <div class="led-box">
        <div v-bind:class="statusLed"></div>
    </div>
    <div class="timedisplay">{{currentDate}} - {{currentTime}}</div>
    <div class="led-box-r">
        <div class="led-blue"></div>
    </div>
  </div>
  
</template>

<script>
export default {
     name: 'CalClock',
  props: {
  },
  data:function() {
    return {
      currentTime:'',
      currentDate:'',
      timer: '',
      online: '',
      statusLed: ''
    };
  },
  created(){
    this.updateTime();
  },
  methods:{ 
    updateTime(){
      var datetime=new Date();

      var hour = datetime.getHours();
      var minute = String(datetime.getMinutes()).padStart(2,'0');
      var day = datetime.getDate();
      var month = datetime.getMonth()+1;
      var year = datetime.getFullYear();

      this.currentDate = month+"/"+day+"/"+year;
      this.currentTime = hour+":"+minute;
      if(navigator.onLine){
        this.statusLed="led-green";
      }else{
        this.statusLed="led-red";
      }

      this.timer=setTimeout(() => {
          this.updateTime();
        }, 5000);
    }
  }

}
</script>

<style>
.toptime{
  position:fixed;
  top:0;
  left: 0;
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
.toptime div{
  text-align: center;
  vertical-align: middle;
  font-size: x-large;
  font-weight: bold;
}
.timedisplay{
    height: 50px;
    padding-top: 20px;
    float: center;
}
.led-box div {
  font-size: 12px;
  text-align: center;
  margin: 1em;
  float: left;
  vertical-align: middle;
}

.led-box-r div {
  font-size: 12px;
  text-align: center;
  margin: 1em;
  float: right;
  vertical-align: middle;
}

.led-red {
  margin: 0 auto;
  width: 24px;
  height: 24px;
  background-color: #F00;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 12px;
  -webkit-animation: blinkRed 0.5s infinite;
  -moz-animation: blinkRed 0.5s infinite;
  -ms-animation: blinkRed 0.5s infinite;
  -o-animation: blinkRed 0.5s infinite;
  animation: blinkRed 0.5s infinite;
}
.led-green {
  margin: 0 auto;
  width: 24px;
  height: 24px;
  background-color: #ABFF00;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, #89FF00 0 2px 12px;
}
.led-blue {
  margin: 0 auto;
  width: 24px;
  height: 24px;
  background-color: #002fff;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #010847 0 -1px 9px, #0400ff 0 2px 12px;
}
</style>