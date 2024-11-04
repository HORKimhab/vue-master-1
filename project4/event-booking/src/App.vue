<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <section class="grid grid-cols-2 gap-8">
      <EventCard
        v-for="row in 8"
        :key="row"
        title="Vue Conference 2024"
        when="2024-05-01"
        descrition="Conference about Vue and JavaScript"
        @register="console.log('It is registered in app.vue')"
      />
    </section>
    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols gap-4">
      <BookingItem v-for="row in 3" :key="row" />
    </section>
  </main>
</template>

<script setup>
  import BookingItem from './components/BookingItem.vue'
  import EventCard from './components/EventCard.vue'
</script>
