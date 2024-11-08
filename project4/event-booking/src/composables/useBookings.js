import { Status } from '@/components/Booking/booking.constant'
import { ref } from 'vue'

const bookings = ref([])
const bookingsLoading = ref(false)
const error = ref(null)

const fetchBookings = async (isLoading = true) => {
  bookingsLoading.value = isLoading ? isLoading : false
  error.value = null
  try {
    if (isLoading) await new Promise(resolve => setTimeout(resolve, 500))
    const response = await fetch('http://localhost:8022/bookings')
    bookings.value = await response.json()
  } catch (e) {
    error.value = e
  } finally {
    bookingsLoading.value = false
  }
}

const findBookingById = id => bookings.value.findIndex(book => book.id === id)

const handleRegistration = async event => {
  if (bookings.value.some(booking => booking.eventId === event.id && booking.userId === 1)) {
    alert('You are alreadmy registered for this event')
    return
  }

  const bookingPayload = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title,
    status: Status.PENDING
  }

  bookings.value.push(bookingPayload)

  try {
    const response = await fetch('http://localhost:8022/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...bookingPayload
        // status: Status.CONFIRMED
      })
    })

    if (response.ok) {
      const index = findBookingById(bookingPayload.id)
      bookings.value[index] = await response.json()
    } else {
      throw new Error('Failed to confirm booking')
    }
  } catch (e) {
    console.error('Failed to register for event:', e)
    bookings.value = bookings.value.filter(book => book.id !== bookingPayload.id)
  }
}

const cancelBooking = async bookingId => {
  const index = findBookingById(bookingId)
  const originalBooking = bookings.value[index]
  bookings.value.slice(index, 1)

  try {
    const response = await fetch(`http://localhost:8022/bookings/${bookingId}`, {
      method: 'DELETE'
    })

    await fetchBookings(false)

    if (!response.ok) {
      throw new Error('Booking could not be cancelled')
    }
  } catch (e) {
    console.error('Failed to cancel booking', e)
    bookings.value.splice(index, 0, originalBooking)
  }
}

export default function useBookings() {
  return {
    bookings,
    bookingsLoading,
    fetchBookings,
    handleRegistration,
    cancelBooking,
    error
  }
}
