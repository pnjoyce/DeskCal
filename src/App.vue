<template>
  <div style="float:left">
    <KeepAlive include="CalClock">
        <CalClock :is="current"/>
    </KeepAlive>
    <keep-alive>
      <EventCalendar msg="" eventUrl="http://dashpi:8080/calendar/api/v1.0/events" />
    </keep-alive>
  </div>
</template>

<script>
import EventCalendar from './components/Calendar.vue'
import CalClock from './components/CalClock.vue'

export default {
  name: 'App',
  components: {
    CalClock,
    EventCalendar
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 4rem 0;
  font-family: -system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

</style>
