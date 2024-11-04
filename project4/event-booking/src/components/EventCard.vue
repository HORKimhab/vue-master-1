<template>
  <RoundedCard>
    <h3 class="p-4 font-medium text-xl border-b border-gray-200">{{ title }}</h3>
    <p class="p-4 border-b border-gray-200">{{ when }}</p>
    <p class="p-4">{{ descrition }}</p>
    <section class="flex justify-end p-4">
      <RoundButton @click="$emit('register')">Register</RoundButton>
    </section>
  </RoundedCard>
</template>

<script setup>
  import RoundButton from './RoundButton.vue'
  import RoundedCard from './RoundedCard.vue'

  defineProps({
    title: String,
    when: String,
    descrition: String
  })

  defineEmits(['register'])
</script>
