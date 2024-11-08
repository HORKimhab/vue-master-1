<template>
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
</template>

<script setup>
  import useBookings from '@/composables/useBookings'
  import LoadingBookingItem from './LoadingBookingItem.vue'
  import { onMounted } from 'vue'
  import BookingItem from './BookingItem.vue'

  const { bookings, bookingsLoading, cancelBooking, fetchBookings } = useBookings()

  onMounted(() => {
    // fetchEvents()
    fetchBookings()
  })
</script>
