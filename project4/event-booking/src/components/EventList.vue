<template>
  <section class="grid grid-cols-2 gap-8">
    <template v-if="!eventsLoading">
      <template v-if="events.length">
        <EventCard
          v-for="event in events"
          :key="event.id"
          :title="event.title"
          :when="event.date"
          :description="event.description"
          @register="$emit('register', event)"
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

<script setup>
  import { onMounted, ref } from 'vue'
  import EventCard from './EventCard.vue'
  import LoadingEventCard from './LoadingEventCard.vue'

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

  defineEmits(['register'])

  onMounted(() => {
    fetchEvents()
  })
</script>
