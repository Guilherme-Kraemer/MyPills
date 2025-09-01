import { format, parseISO, isToday, isTomorrow, isYesterday, addDays, startOfDay, endOfDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export class DateUtils {
  static formatDate(date: Date | string, formatStr: string = 'dd/MM/yyyy'): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, formatStr, { locale: ptBR })
  }

  static formatTime(date: Date | string, formatStr: string = 'HH:mm'): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, formatStr, { locale: ptBR })
  }

  static formatDateTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, 'dd/MM/yyyy HH:mm', { locale: ptBR })
  }

  static getRelativeDateText(date: Date | string): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    
    if (isToday(dateObj)) {
      return 'Hoje'
    } else if (isTomorrow(dateObj)) {
      return 'Amanhã'
    } else if (isYesterday(dateObj)) {
      return 'Ontem'
    }
    
    return this.formatDate(dateObj)
  }

  static isOverdue(date: Date | string): boolean {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return dateObj < new Date()
  }

  static isDueToday(date: Date | string): boolean {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return isToday(dateObj)
  }

  static isDueTomorrow(date: Date | string): boolean {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return isTomorrow(dateObj)
  }

  static getDateRange(days: number): { start: Date; end: Date } {
    const start = startOfDay(new Date())
    const end = endOfDay(addDays(start, days))
    return { start, end }
  }

  static formatTimeRemaining(targetDate: Date | string): string {
    const target = typeof targetDate === 'string' ? parseISO(targetDate) : targetDate
    const now = new Date()
    const diff = target.getTime() - now.getTime()

    if (diff <= 0) {
      return 'Vencido'
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) {
      return `${days} dia${days > 1 ? 's' : ''}`
    } else if (hours > 0) {
      return `${hours} hora${hours > 1 ? 's' : ''}`
    } else {
      return `${minutes} minuto${minutes > 1 ? 's' : ''}`
    }
  }

  static getWeekDays(): Array<{ key: string; label: string }> {
    return [
      { key: 'MONDAY', label: 'Segunda' },
      { key: 'TUESDAY', label: 'Terça' },
      { key: 'WEDNESDAY', label: 'Quarta' },
      { key: 'THURSDAY', label: 'Quinta' },
      { key: 'FRIDAY', label: 'Sexta' },
      { key: 'SATURDAY', label: 'Sábado' },
      { key: 'SUNDAY', label: 'Domingo' },
    ]
  }

  static createDateTimeString(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }
}

export default DateUtils