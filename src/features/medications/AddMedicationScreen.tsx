import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { AppDispatch } from '@store/store'
import { addMedication } from '@store/slices/medicationsSlice'
import toast from 'react-hot-toast'
import type { Medication } from '../../types'
import { MedicationStatus } from '../../types'

const Container = styled.div`
  padding-top: 80px;
  max-width: 600px;
  margin: 0 auto;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-lg);
  background: var(--color-surface);
  border: 2px solid var(--color-text-disabled);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    border-color: var(--color-medication);
    color: var(--color-medication);
  }
`

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-primary);
`

const Form = styled.form`
  background: var(--color-surface);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
`

const FormGroup = styled.div`
  margin-bottom: var(--spacing-lg);
`

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: 0.9rem;
`

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid ${props => props.$hasError ? 'var(--color-error)' : 'var(--color-text-disabled)'};
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  transition: border-color var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--color-medication);
  }
  
  &::placeholder {
    color: var(--color-text-disabled);
  }
`

const TextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid ${props => props.$hasError ? 'var(--color-error)' : 'var(--color-text-disabled)'};
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: border-color var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--color-medication);
  }
`

const ErrorMessage = styled.span`
  color: var(--color-error);
  font-size: 0.8rem;
  margin-top: var(--spacing-xs);
  display: block;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-medication);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-top: var(--spacing-lg);
  
  &:hover:not(:disabled) {
    background: #45a049;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

interface MedicationFormData {
  name: string
  dosage: string
  currentQuantity: number
  totalQuantity: number
  price?: number
  instructions?: string
  barcode?: string
}

const AddMedicationScreen: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<MedicationFormData>()

  const watchedQuantity = watch('currentQuantity')
  const watchedTotal = watch('totalQuantity')

  const onSubmit = async (data: MedicationFormData) => {
    setIsSubmitting(true)

    try {
      const medication: Medication = {
        id: crypto.randomUUID(),
        name: data.name,
        dosage: data.dosage,
        currentQuantity: data.currentQuantity,
        totalQuantity: data.totalQuantity,
        price: data.price,
        instructions: data.instructions,
        barcode: data.barcode,
        status: MedicationStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      dispatch(addMedication(medication))
      toast.success('Medicamento adicionado com sucesso!')
      navigate('/medications')
    } catch (error) {
      toast.error('Erro ao adicionar medicamento')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/medications')}>
          ←
        </BackButton>
        <Title>Adicionar Medicamento</Title>
      </Header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="name">Nome do Medicamento *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Ex: Paracetamol 500mg"
              $hasError={!!errors.name}
              {...register('name', { 
                required: 'Nome é obrigatório',
                minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' }
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="dosage">Dosagem *</Label>
            <Input
              id="dosage"
              type="text"
              placeholder="Ex: 500mg, 1 comprimido"
              $hasError={!!errors.dosage}
              {...register('dosage', { 
                required: 'Dosagem é obrigatória' 
              })}
            />
            {errors.dosage && <ErrorMessage>{errors.dosage.message}</ErrorMessage>}
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label htmlFor="currentQuantity">Quantidade Atual *</Label>
              <Input
                id="currentQuantity"
                type="number"
                min="0"
                placeholder="Ex: 30"
                $hasError={!!errors.currentQuantity}
                {...register('currentQuantity', { 
                  required: 'Quantidade atual é obrigatória',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Quantidade não pode ser negativa' }
                })}
              />
              {errors.currentQuantity && <ErrorMessage>{errors.currentQuantity.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="totalQuantity">Quantidade Total *</Label>
              <Input
                id="totalQuantity"
                type="number"
                min="1"
                placeholder="Ex: 30"
                $hasError={!!errors.totalQuantity}
                {...register('totalQuantity', { 
                  required: 'Quantidade total é obrigatória',
                  valueAsNumber: true,
                  min: { value: 1, message: 'Quantidade total deve ser maior que 0' },
                  validate: (value) => {
                    if (watchedQuantity && value < watchedQuantity) {
                      return 'Quantidade total deve ser maior ou igual à atual'
                    }
                    return true
                  }
                })}
              />
              {errors.totalQuantity && <ErrorMessage>{errors.totalQuantity.message}</ErrorMessage>}
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label htmlFor="price">Preço (opcional)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="Ex: 15.90"
                {...register('price', { 
                  valueAsNumber: true,
                  min: { value: 0, message: 'Preço não pode ser negativo' }
                })}
              />
              {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="barcode">Código de Barras (opcional)</Label>
              <Input
                id="barcode"
                type="text"
                placeholder="Ex: 7891234567890"
                {...register('barcode')}
              />
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="instructions">Instruções (opcional)</Label>
            <TextArea
              id="instructions"
              placeholder="Ex: Tomar com água, após as refeições..."
              {...register('instructions')}
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar Medicamento'}
          </SubmitButton>
        </Form>
      </motion.div>
    </Container>
  )
}

export default AddMedicationScreen