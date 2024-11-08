<template>
  <template v-if="error">
    <!-- <SectionCard>
      <div class="space-y-4 items-center flex flex-col">
        <div class="text-red-500">Could not load events at the moment. Please try again.</div>
        <div>
          <RoundButton @click="fetchEvents">Retry again</RoundButton>
        </div>
      </div>
    </SectionCard> -->
    <ErrorCard :retry="fetchEvents">Could not load events at the moment. Please try again.</ErrorCard>
  </template>
  <template v-else>
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <template v-if="!eventsLoading">
        <template v-if="events.length">
          <EventCard
            v-for="event in events"
            :key="event.id"
            :title="event.title"
            :when="event.date"
            :description="event.description"
            @register="handleRegistration(event)"
        /></template>
        <template v-else>
          <div class="col-span-2 text-center">No events yet...</div>
        </template>
      </template>
      <template v-else>
        <LoadingEventCard v-for="row in 4" :key="row" />
      </template>
    </section>
  </template>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import EventCard from './EventCard.vue'
  import LoadingEventCard from './LoadingEventCard.vue'
  import useBookings from '@/composables/useBookings'
  import ErrorCard from './ErrorCard.vue'

  const events = ref([])
  const eventsLoading = ref(false)
  const error = ref(null)

  const fetchEvents = async () => {
    eventsLoading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const response = await fetch('http://localhost:8022/events')
      events.value = await response.json()
    } catch (e) {
      error.value = e
    } finally {
      eventsLoading.value = false
    }
  }

  const { handleRegistration } = useBookings()

  onMounted(() => {
    fetchEvents()
  })
</script>
