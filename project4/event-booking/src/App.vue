<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <section class="grid grid-cols-2 gap-8">
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
    </section>
    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols gap-4">
      <BookingItem v-for="row in 3" :key="row" />
    </section>
  </main>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import BookingItem from './components/BookingItem.vue'
  import EventCard from './components/EventCard.vue'
  import LoadingEventCard from './components/LoadingEventCard.vue'

  const events = ref([])
  const eventsLoading = ref(false)

  const fetchEvents = async () => {
    eventsLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const response = await fetch('http://localhost:8022/events')
      events.value = await response.json()
    } finally {
      eventsLoading.value = false
    }
  }

  const handleRegistration = async event => {
    const bookingPayload = {
      id: Date.now().toString(),
      userId: 1,
      eventId: event.id,
      eventTitle: event.title
    }

    await fetch('http://localhost:8022/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...bookingPayload,
        status: 'confirmed'
      })
    })
  }

  onMounted(() => fetchEvents())
</script>
