<template>
  <SectionCard>
    <div class="space-y-4 items-center flex flex-col">
      <div class="text-red-500">
        <slot />
      </div>
      <div>
        <RoundButton @click="retry" v-if="retry">Retry again</RoundButton>
      </div>
    </div>
  </SectionCard>
</template>

<script setup>
  import RoundButton from './RoundButton.vue'
  import SectionCard from './SectionCard.vue'

  defineProps({
    retry: {
      type: Function,
      required: false
    }
  })
</script>
