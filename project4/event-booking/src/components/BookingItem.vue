<template>
  <SectionCard>
    <div class="flex justify-between">
      <div class="flex space-x-2">
        <div>{{ title }}</div>
        <div><component :is="icon" :class="{ 'animate-spin': isPending }" /></div>
      </div>
      <RoundButton variant="danger" @click="$emit('cancel')">Cancel</RoundButton>
    </div>
  </SectionCard>
</template>

<script setup>
  import { computed } from 'vue'
  import { Status } from './Booking/booking.constant'
  import RoundButton from './RoundButton.vue'
  import SectionCard from './SectionCard.vue'
  import { LoaderCircle, Check } from 'lucide-vue-next'

  const props = defineProps({
    title: String,
    status: Status
  })

  const isPending = computed(() => props.status === Status.PENDING)
  const icon = computed(() => (isPending.value ? LoaderCircle : Check))

  defineEmits(['cancel'])
</script>
