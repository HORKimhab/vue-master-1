import { ref } from 'vue'

const bookings = ref([])
const bookingsLoading = ref(false)

const fetchBookings = async (isLoading = true) => {
  bookingsLoading.value = isLoading ? isLoading : false
  try {
    if (isLoading) await new Promise(resolve => setTimeout(resolve, 500))
    const response = await fetch('http://localhost:8022/bookings')
    bookings.value = await response.json()
  } finally {
    bookingsLoading.value = false
  }
}

export default function useBookings() {
  return {
    bookings,
    bookingsLoading,
    fetchBookings
  }
}
