export const convertUTCToLocal = (utcISOString: string, withTimezone: boolean = true, withHour: boolean = true): string => {
    const date = new Date(utcISOString)
    const day = String(withTimezone ? date.getDate() : date.getUTCDate()).padStart(2, '0')
    const month = withTimezone ? date.toLocaleString('en-US', { month: 'short' }) : date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
    const year = withTimezone ? date.getFullYear() : date.getUTCFullYear()
  
    if (withHour) {
        const hours = String(withTimezone ? date.getHours() : date.getUTCHours()).padStart(2, '0')
        const minutes = String(withTimezone ? date.getMinutes() : date.getUTCMinutes()).padStart(2, '0')
    
        return `${day} ${month} ${year} ${hours}:${minutes}`
    }
  
    return `${day} ${month} ${year}`
}  

export const convertAgeFromBornDate = (bornDate: string | Date): number => {
    const birth = new Date(bornDate)
    const today = new Date()
    
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    const dayDiff = today.getDate() - birth.getDate()
  
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--
  
    return age
}