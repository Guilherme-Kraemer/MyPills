import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { RootState, AppDispatch } from '@store/store'
import { loadFromStorage, completeReminder, addReminder } from '@store/slices/remindersSlice'
import { Reminder, ReminderType, ReminderPriority } from '@types/index'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const Container = styled.div`
  padding-top: 80px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
`

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`

const AddButton = styled.button`
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-reminder);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background: #c2185b;
    transform: translateY(-1px);
  }
`

const RemindersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`

const ReminderCard = styled(motion.div)<{ $priority: ReminderPriority; $isCompleted: boolean }>`
  background: var(--color-surface);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  border-left: 4px solid ${props => {
    if (props.$isCompleted) return 'var(--color-success)'
    switch (props.$priority) {
      case ReminderPriority.URGENT: return 'var(--color-error)'
      case ReminderPriority.HIGH: return 'var(--color-warning)'
      case ReminderPriority.MEDIUM: return 'var(--color-reminder)'
      default: return 'var(--color-text-disabled)'
    }
  }};
  opacity: ${props => props.$isCompleted ? 0.7 : 1};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-lg);
  }
`

const ReminderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
`

const ReminderTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  text-decoration: ${props => props.style?.textDecoration || 'none'};
`

const ReminderDate = styled.span`
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  font-weight: 500;
`

const ReminderDescription = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: var(--spacing-md);
`

const ReminderMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TypeBadge = styled.span<{ $type: ReminderType }>`
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => {
    switch (props.$type) {
      case ReminderType.MEDICATION: return 'rgba(76, 175, 80, 0.2)'
      case ReminderType.APPOINTMENT: return 'rgba(33, 150, 243, 0.2)'
      case ReminderType.REFILL: return 'rgba(255, 152, 0, 0.2)'
      default: return 'rgba(96, 125, 139, 0.2)'
    }
  }};
  color: ${props => {
    switch (props.$type) {
      case ReminderType.MEDICATION: return 'var(--color-success)'
      case ReminderType.APPOINTMENT: return 'var(--color-info)'
      case ReminderType.REFILL: return 'var(--color-warning)'
      default: return 'var(--color-text-secondary)'
    }
  }};
`

const CompleteButton = styled.button`
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-success);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition-fast);
  
  &:hover {
    background: #45a049;
  }
`

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: var(--spacing-md);
`

const ModalContent = styled.div`
  background: var(--color-surface);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-xl);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
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

const Input = styled.input`
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--color-text-disabled);
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  transition: border-color var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--color-reminder);
  }
`

const Select = styled.select`
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--color-text-disabled);
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  background: white;
  transition: border-color var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--color-reminder);
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--color-text-disabled);
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: border-color var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--color-reminder);
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  margin-top: var(--spacing-xl);
`

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  
  ${props => props.$variant === 'primary' ? `
    background: var(--color-reminder);
    color: white;
    border: 2px solid var(--color-reminder);
    
    &:hover {
      background: #c2185b;
    }
  ` : `
    background: transparent;
    color: var(--color-text-secondary);
    border: 2px solid var(--color-text-disabled);
    
    &:hover {
      border-color: var(--color-reminder);
      color: var(--color-reminder);
    }
  `}
`

interface ReminderFormData {
  title: string
  description: string
  dueDate: string
  type: ReminderType
  priority: ReminderPriority
}

const RemindersScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { reminders } = useSelector((state: RootState) => state.reminders)
  const [showAddModal, setShowAddModal] = useState(false)
  
  const { register, handleSubmit, reset } = useForm<ReminderFormData>()

  useEffect(() => {
    dispatch(loadFromStorage())
  }, [dispatch])

  const handleCompleteReminder = (id: string) => {
    dispatch(completeReminder(id))
    toast.success('Lembrete concluído!')
  }

  const onSubmit = (data: ReminderFormData) => {
    const reminder: Reminder = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description || undefined,
      dueDate: new Date(data.dueDate),
      type: data.type,
      priority: data.priority,
      isCompleted: false,
      isRecurring: false,
      createdAt: new Date(),
    }

    dispatch(addReminder(reminder))
    toast.success('Lembrete criado com sucesso!')
    setShowAddModal(false)
    reset()
  }

  const activeReminders = reminders.filter(r => !r.isCompleted)
  const completedReminders = reminders.filter(r => r.isCompleted)

  return (
    <Container>
      <Header>
        <Title>⏰ Lembretes</Title>
        <AddButton onClick={() => setShowAddModal(true)}>
          ➕ Novo Lembrete
        </AddButton>
      </Header>

      <RemindersList>
        {activeReminders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)', color: 'var(--color-text-secondary)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-lg)' }}>⏰</div>
            <h3>Nenhum lembrete ativo</h3>
            <p>Crie seu primeiro lembrete para começar.</p>
          </div>
        ) : (
          activeReminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              $priority={reminder.priority}
              $isCompleted={reminder.isCompleted}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ReminderHeader>
                <ReminderTitle style={{ textDecoration: reminder.isCompleted ? 'line-through' : 'none' }}>
                  {reminder.title}
                </ReminderTitle>
                <ReminderDate>
                  {new Date(reminder.dueDate).toLocaleDateString('pt-BR')}
                </ReminderDate>
              </ReminderHeader>
              
              {reminder.description && (
                <ReminderDescription>{reminder.description}</ReminderDescription>
              )}
              
              <ReminderMeta>
                <TypeBadge $type={reminder.type}>
                  {reminder.type}
                </TypeBadge>
                
                {!reminder.isCompleted && (
                  <CompleteButton onClick={() => handleCompleteReminder(reminder.id)}>
                    ✅ Concluir
                  </CompleteButton>
                )}
              </ReminderMeta>
            </ReminderCard>
          ))
        )}
      </RemindersList>

      {showAddModal && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowAddModal(false)}
        >
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Novo Lembrete</h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Ex: Consulta médica"
                  {...register('title', { required: true })}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="description">Descrição</Label>
                <TextArea
                  id="description"
                  placeholder="Detalhes do lembrete..."
                  {...register('description')}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="dueDate">Data *</Label>
                <Input
                  id="dueDate"
                  type="datetime-local"
                  {...register('dueDate', { required: true })}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="type">Tipo *</Label>
                <Select {...register('type', { required: true })}>
                  <option value={ReminderType.GENERAL}>Geral</option>
                  <option value={ReminderType.MEDICATION}>Medicamento</option>
                  <option value={ReminderType.APPOINTMENT}>Consulta</option>
                  <option value={ReminderType.REFILL}>Renovar Receita</option>
                  <option value={ReminderType.EXERCISE}>Exercício</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="priority">Prioridade *</Label>
                <Select {...register('priority', { required: true })}>
                  <option value={ReminderPriority.LOW}>Baixa</option>
                  <option value={ReminderPriority.MEDIUM}>Média</option>
                  <option value={ReminderPriority.HIGH}>Alta</option>
                  <option value={ReminderPriority.URGENT}>Urgente</option>
                </Select>
              </FormGroup>

              <ButtonGroup>
                <Button type="button" onClick={() => setShowAddModal(false)}>
                  Cancelar
                </Button>
                <Button type="submit" $variant="primary">
                  Criar Lembrete
                </Button>
              </ButtonGroup>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  )
}

export default RemindersScreen