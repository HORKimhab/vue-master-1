<template>
  <SectionCard>
    <div class="flex justify-between">
      <div class="flex space-x-2">
        <div>{{ title }}</div>
        <div>{{ status }}</div>
      </div>
      <RoundButton variant="danger">Cancel</RoundButton>
    </div>
  </SectionCard>
</template>

<script setup>
  import { Status } from './Booking/booking.constant'
  import RoundButton from './RoundButton.vue'
  import SectionCard from './SectionCard.vue'

  defineProps({
    title: String,
    status: Status
  })
</script>
