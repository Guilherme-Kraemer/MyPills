// Validation utilities for MyPills

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export class Validator {
  static validateMedication(data: {
    name: string
    dosage: string
    currentQuantity: number
    totalQuantity: number
    price?: number
  }): ValidationResult {
    const errors: string[] = []

    if (!data.name || data.name.trim().length < 2) {
      errors.push('Nome deve ter pelo menos 2 caracteres')
    }

    if (!data.dosage || data.dosage.trim().length === 0) {
      errors.push('Dosagem é obrigatória')
    }

    if (data.currentQuantity < 0) {
      errors.push('Quantidade atual não pode ser negativa')
    }

    if (data.totalQuantity <= 0) {
      errors.push('Quantidade total deve ser maior que zero')
    }

    if (data.currentQuantity > data.totalQuantity) {
      errors.push('Quantidade atual não pode ser maior que a total')
    }

    if (data.price !== undefined && data.price < 0) {
      errors.push('Preço não pode ser negativo')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  static validateReminder(data: {
    title: string
    dueDate: Date
  }): ValidationResult {
    const errors: string[] = []

    if (!data.title || data.title.trim().length < 3) {
      errors.push('Título deve ter pelo menos 3 caracteres')
    }

    if (!data.dueDate || isNaN(data.dueDate.getTime())) {
      errors.push('Data é obrigatória e deve ser válida')
    }

    if (data.dueDate && data.dueDate < new Date()) {
      errors.push('Data não pode ser no passado')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  static validateFinancialTransaction(data: {
    amount: number
    description: string
    category: string
  }): ValidationResult {
    const errors: string[] = []

    if (data.amount <= 0) {
      errors.push('Valor deve ser maior que zero')
    }

    if (!data.description || data.description.trim().length < 3) {
      errors.push('Descrição deve ter pelo menos 3 caracteres')
    }

    if (!data.category || data.category.trim().length === 0) {
      errors.push('Categoria é obrigatória')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static validatePrice(price: string): boolean {
    const priceNumber = parseFloat(price)
    return !isNaN(priceNumber) && priceNumber >= 0 && priceNumber <= 999999
  }

  static validateQuantity(quantity: string): boolean {
    const quantityNumber = parseInt(quantity)
    return !isNaN(quantityNumber) && quantityNumber >= 0
  }
}

export default Validator