<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <!-- <section class="grid grid-cols-2 gap-8">
      <template v-if="!eventsLoading">
        <EventCard
          v-for="event in events"
          :key="event.id"
          :title="event.title"
          :when="event.date"
          :description="event.description"
          @register="handleRegistration(event)"
        />
      </template>
      <template v-else>
        <LoadingEventCard v-for="row in 4" :key="row" />
      </template>
    </section> -->
    <EventList />
    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <!-- <section class="grid grid-cols gap-4">
      <template v-if="!bookingsLoading">
        <BookingItem
          v-for="booking in bookings"
          :key="booking.id"
          :title="booking.eventTitle"
          :status="booking.status"
          @cancel="cancelBooking(booking.id)"
        />
      </template>
      <template v-else>
        <LoadingBookingItem v-for="row in 4" :key="row" />
      </template>
    </section> -->
    <BookingList />
  </main>
</template>

<script setup>
  import EventList from './components/EventList.vue'
  import BookingList from './components/BookingList.vue'
</script>
