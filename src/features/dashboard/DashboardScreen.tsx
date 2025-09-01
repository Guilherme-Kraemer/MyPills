import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { RootState, AppDispatch } from '@store/store'
import { loadFromStorage as loadMedications } from '@store/slices/medicationsSlice'
import { loadFromStorage as loadReminders } from '@store/slices/remindersSlice'
import { MedicationStatus, ReminderType } from '@types/index'

const Container = styled.div`
  padding-top: 80px;
`

const WelcomeSection = styled.div`
  margin-bottom: var(--spacing-xl);
`

const WelcomeTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
`

const WelcomeSubtitle = styled.p`
  color: var(--color-text-secondary);
  font-size: 1rem;
`

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
`

const QuickActionCard = styled(motion.div)<{ $color: string }>`
  background: var(--color-surface);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  border-left: 4px solid ${props => props.$color};
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  color: inherit;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
`

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
`

const CardDescription = styled.p`
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: var(--spacing-md);
`

const CardStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StatValue = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-primary);
`

const StatLabel = styled.span`
  font-size: 0.8rem;
  color: var(--color-text-secondary);
`

const OverviewSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
`

const OverviewCard = styled.div`
  background: var(--color-surface);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
`

const OverviewTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-background);
  
  &:last-child {
    border-bottom: none;
  }
`

const ItemName = styled.span`
  color: var(--color-text-primary);
  font-weight: 500;
`

const ItemInfo = styled.span`
  color: var(--color-text-secondary);
  font-size: 0.9rem;
`

const EmptyState = styled.div`
  text-align: center;
  color: var(--color-text-secondary);
  padding: var(--spacing-lg);
  font-style: italic;
`

const DashboardScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { medications } = useSelector((state: RootState) => state.medications)
  const { reminders } = useSelector((state: RootState) => state.reminders)

  useEffect(() => {
    dispatch(loadMedications())
    dispatch(loadReminders())
  }, [dispatch])

  const activeMedications = medications.filter(m => m.status === MedicationStatus.ACTIVE)
  const lowStockMedications = medications.filter(m => m.currentQuantity <= 5)
  const activeReminders = reminders.filter(r => !r.isCompleted)
  const todayReminders = activeReminders.filter(r => {
    const today = new Date().toDateString()
    return new Date(r.dueDate).toDateString() === today
  })

  const quickActions = [
    {
      icon: '💊',
      title: 'Medicamentos',
      description: 'Gerencie seus medicamentos e horários',
      link: '/medications',
      color: 'var(--color-medication)',
      stats: { value: activeMedications.length, label: 'ativos' }
    },
    {
      icon: '⏰',
      title: 'Lembretes',
      description: 'Lembretes e notificações importantes',
      link: '/reminders',
      color: 'var(--color-reminder)',
      stats: { value: todayReminders.length, label: 'hoje' }
    },
    {
      icon: '💰',
      title: 'Finanças',
      description: 'Controle financeiro e orçamentos',
      link: '/finances',
      color: 'var(--color-finance)',
      stats: { value: 0, label: 'contas' }
    },
    {
      icon: '🚌',
      title: 'Transporte',
      description: 'Horários e rotas de transporte',
      link: '/transport',
      color: 'var(--color-transport)',
      stats: { value: 0, label: 'favoritas' }
    },
    {
      icon: '🛒',
      title: 'Compras',
      description: 'Listas de compras inteligentes',
      link: '/shopping',
      color: 'var(--color-shopping)',
      stats: { value: 0, label: 'listas' }
    },
    {
      icon: '🤖',
      title: 'Assistente',
      description: 'IA pessoal para ajudar no dia a dia',
      link: '/assistant',
      color: 'var(--color-assistant)',
      stats: { value: 0, label: 'conversas' }
    },
  ]

  return (
    <Container>
      <WelcomeSection>
        <WelcomeTitle>
          Olá, {user?.name || 'Usuário'}! 👋
        </WelcomeTitle>
        <WelcomeSubtitle>
          Aqui está um resumo do seu dia
        </WelcomeSubtitle>
      </WelcomeSection>

      <QuickActionsGrid>
        {quickActions.map((action, index) => (
          <QuickActionCard
            as={Link}
            to={action.link}
            key={action.title}
            $color={action.color}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <CardIcon>{action.icon}</CardIcon>
            <CardTitle>{action.title}</CardTitle>
            <CardDescription>{action.description}</CardDescription>
            <CardStats>
              <StatValue>{action.stats.value}</StatValue>
              <StatLabel>{action.stats.label}</StatLabel>
            </CardStats>
          </QuickActionCard>
        ))}
      </QuickActionsGrid>

      <OverviewSection>
        <OverviewCard>
          <OverviewTitle>
            💊 Medicamentos Hoje
          </OverviewTitle>
          {activeMedications.length === 0 ? (
            <EmptyState>Nenhum medicamento ativo</EmptyState>
          ) : (
            activeMedications.slice(0, 5).map((medication) => (
              <ListItem key={medication.id}>
                <ItemName>{medication.name}</ItemName>
                <ItemInfo>{medication.dosage}</ItemInfo>
              </ListItem>
            ))
          )}
        </OverviewCard>

        <OverviewCard>
          <OverviewTitle>
            ⏰ Lembretes Pendentes
          </OverviewTitle>
          {activeReminders.length === 0 ? (
            <EmptyState>Nenhum lembrete pendente</EmptyState>
          ) : (
            activeReminders.slice(0, 5).map((reminder) => (
              <ListItem key={reminder.id}>
                <ItemName>{reminder.title}</ItemName>
                <ItemInfo>
                  {new Date(reminder.dueDate).toLocaleDateString('pt-BR')}
                </ItemInfo>
              </ListItem>
            ))
          )}
        </OverviewCard>

        {lowStockMedications.length > 0 && (
          <OverviewCard>
            <OverviewTitle>
              ⚠️ Estoque Baixo
            </OverviewTitle>
            {lowStockMedications.map((medication) => (
              <ListItem key={medication.id}>
                <ItemName>{medication.name}</ItemName>
                <ItemInfo style={{ color: 'var(--color-error)', fontWeight: 600 }}>
                  {medication.currentQuantity} restantes
                </ItemInfo>
              </ListItem>
            ))}
          </OverviewCard>
        )}
      </OverviewSection>
    </Container>
  )
}

export default DashboardScreen