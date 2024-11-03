<template>
  <div class="border border-gray-200 bg-withe rounded-md">
    <h3 class="p-4 font-medium text-xl border-b border-gray-200">{{ title }}</h3>
    <p class="p-4 border-b border-gray-200">{{ when }}</p>
    <p class="p-4">{{ descrition }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  when: String,
  descrition: String
})
</script>
