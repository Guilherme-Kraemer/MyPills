// Core types for MyPills application

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'pt-BR' | 'en-US';
  notifications: boolean;
  biometricAuth: boolean;
  dataBackup: boolean;
}

// Medication types
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  currentQuantity: number;
  totalQuantity: number;
  expirationDate?: Date;
  price?: number;
  barcode?: string;
  instructions?: string;
  status: MedicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum MedicationStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED', 
  FINISHED = 'FINISHED',
  EXPIRED = 'EXPIRED'
}

export interface MedicationSchedule {
  id: string;
  medicationId: string;
  timeOfDay: string; // HH:mm format
  daysOfWeek: DayOfWeek[];
  isActive: boolean;
}

export interface MedicationLog {
  id: string;
  medicationId: string;
  takenAt: Date;
  scheduledFor: Date;
  status: 'taken' | 'missed' | 'skipped';
  notes?: string;
}

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY', 
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

// Reminder types
export interface Reminder {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  type: ReminderType;
  priority: ReminderPriority;
  isCompleted: boolean;
  isRecurring: boolean;
  recurrencePattern?: RecurrencePattern;
  createdAt: Date;
}

export enum ReminderType {
  MEDICATION = 'MEDICATION',
  APPOINTMENT = 'APPOINTMENT',
  REFILL = 'REFILL',
  EXERCISE = 'EXERCISE',
  GENERAL = 'GENERAL'
}

export enum ReminderPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export interface RecurrencePattern {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number;
  daysOfWeek?: DayOfWeek[];
  endDate?: Date;
}

// Common types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}