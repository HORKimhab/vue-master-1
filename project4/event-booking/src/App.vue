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
    <EventList @register="handleRegistration($event)" />
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
  import { onMounted, ref } from 'vue'
  import BookingItem from './components/BookingItem.vue'

  import LoadingBookingItem from './components/LoadingBookingItem.vue'
  import { Status } from './components/Booking/booking.constant'
  import EventList from './components/EventList.vue'

  // const events = ref([])
  // const eventsLoading = ref(false)
  const bookings = ref([])
  const bookingsLoading = ref(false)

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

  const fetchBookings = async (isLoading = true) => {
    bookingsLoading.value = isLoading ? isLoading : false
    try {
      if (isLoading) await new Promise(resolve => setTimeout(resolve, 500))
      const response = await fetch('http://localhost:8022/bookings')
      bookings.value = await response.json()
    } finally {
      bookingsLoading.value = false
    }
  }

  const findBookingById = id => bookings.value.findIndex(book => book.id === id)

  const handleRegistration = async event => {
    if (bookings.value.some(booking => booking.eventId === event.id && booking.userId === 1)) {
      alert('You are alreadmy registered for this event')
      return
    }

    const bookingPayload = {
      id: Date.now().toString(),
      userId: 1,
      eventId: event.id,
      eventTitle: event.title,
      status: Status.PENDING
    }

    bookings.value.push(bookingPayload)

    try {
      const response = await fetch('http://localhost:8022/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingPayload
          // status: Status.CONFIRMED
        })
      })

      if (response.ok) {
        const index = findBookingById(bookingPayload.id)
        bookings.value[index] = await response.json()
      } else {
        throw new Error('Failed to confirm booking')
      }
    } catch (e) {
      console.error('Failed to register for event:', e)
      bookings.value = bookings.value.filter(book => book.id !== bookingPayload.id)
    }
  }

  const cancelBooking = async bookingId => {
    const index = findBookingById(bookingId)
    const originalBooking = bookings.value[index]
    bookings.value.slice(index, 1)

    try {
      const response = await fetch(`http://localhost:8022/bookings/${bookingId}`, {
        method: 'DELETE'
      })

      await fetchBookings(false)

      if (!response.ok) {
        throw new Error('Booking could not be cancelled')
      }
    } catch (e) {
      console.error('Failed to cancel booking', e)
      bookings.value.splice(index, 0, originalBooking)
    }
  }

  onMounted(() => {
    // fetchEvents()
    fetchBookings()
  })
</script>
