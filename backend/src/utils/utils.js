export const tomorrow = (today) => {
  const tomorrow = new Date(today)

  tomorrow.setDate(today.getDate() + 1)
  return tomorrow
}

export const subtractDays = (today, days) => {
  const past = new Date(today)

  past.setDate(today.getDate() - days)
  return past
}
