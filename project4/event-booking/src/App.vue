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
    <section class="grid grid-cols gap-4">
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
    </section>
  </main>
</template>

<script setup>
  import { onMounted } from 'vue'
  import BookingItem from './components/BookingItem.vue'
  import LoadingBookingItem from './components/LoadingBookingItem.vue'
  import useBookings from './composables/useBookings'
  import EventList from './components/EventList.vue'

  // const events = ref([])
  // const eventsLoading = ref(false)
  // const bookings = ref([])
  // const bookingsLoading = ref(false)

  // const fetchEvents = async () => {
  //   eventsLoading.value = true
  //   try {
  //     await new Promise(resolve => setTimeout(resolve, 500))
  //     const response = await fetch('http://localhost:8022/events')
  //     events.value = await response.json()
  //   } finally {
  //     eventsLoading.value = false
  //   }
  // }

  // const fetchBookings = async (isLoading = true) => {
  //   bookingsLoading.value = isLoading ? isLoading : false
  //   try {
  //     if (isLoading) await new Promise(resolve => setTimeout(resolve, 500))
  //     const response = await fetch('http://localhost:8022/bookings')
  //     bookings.value = await response.json()
  //   } finally {
  //     bookingsLoading.value = false
  //   }
  // }

  const { bookings, bookingsLoading, fetchBookings, cancelBooking } = useBookings()

  onMounted(() => {
    // fetchEvents()
    fetchBookings()
  })
</script>
