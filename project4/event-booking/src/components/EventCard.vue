<template>
  <SectionCard>
    <template #header>
      {{ title }}
    </template>
    {{ when }}
    <template #footer>
      <div class="space-y-4">
        <p>{{ descrition }}</p>
      </div>
      <div class="flex justify-end">
        <RoundButton @click="$emit('register')">Register</RoundButton>
      </div>
    </template>
  </SectionCard>
</template>

<script setup>
  import RoundButton from './RoundButton.vue'
  import SectionCard from './SectionCard.vue'

  defineProps({
    title: String,
    when: String,
    descrition: String
  })

  defineEmits(['register'])
</script>
