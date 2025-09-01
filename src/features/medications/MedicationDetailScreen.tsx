import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { RootState, AppDispatch } from '@store/store'
import { deleteMedication, takeMedication } from '@store/slices/medicationsSlice'
import { MedicationStatus } from '@types/index'
import toast from 'react-hot-toast'

const Container = styled.div`
  padding-top: 80px;
  max-width: 800px;
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

const Card = styled(motion.div)`
  background: var(--color-surface);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-lg);
`

const MedicationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-lg);
  
  @media (max-width: 767px) {
    flex-direction: column;
    gap: var(--spacing-md);
  }
`

const MedicationInfo = styled.div`
  flex: 1;
`

const MedicationName = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
`

const StatusBadge = styled.span<{ $status: MedicationStatus }>`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--border-radius-lg);
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => {
    switch (props.$status) {
      case MedicationStatus.ACTIVE: return 'rgba(76, 175, 80, 0.2)'
      case MedicationStatus.PAUSED: return 'rgba(255, 152, 0, 0.2)'
      case MedicationStatus.EXPIRED: return 'rgba(244, 67, 54, 0.2)'
      default: return 'rgba(189, 189, 189, 0.2)'
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case MedicationStatus.ACTIVE: return 'var(--color-success)'
      case MedicationStatus.PAUSED: return 'var(--color-warning)'
      case MedicationStatus.EXPIRED: return 'var(--color-error)'
      default: return 'var(--color-text-disabled)'
    }
  }};
`

const ActionButtons = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  
  @media (max-width: 767px) {
    width: 100%;
    flex-direction: column;
  }
`

const Button = styled.button<{ $variant?: 'primary' | 'danger' }>`
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  
  ${props => props.$variant === 'danger' ? `
    background: var(--color-error);
    color: white;
    border: 2px solid var(--color-error);
    
    &:hover {
      background: #d32f2f;
    }
  ` : `
    background: var(--color-medication);
    color: white;
    border: 2px solid var(--color-medication);
    
    &:hover {
      background: #45a049;
    }
  `}
`

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
`

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`

const DetailLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const DetailValue = styled.span<{ $highlight?: boolean }>`
  font-size: 1.1rem;
  font-weight: ${props => props.$highlight ? '700' : '500'};
  color: ${props => props.$highlight ? 'var(--color-medication)' : 'var(--color-text-primary)'};
`

const InstructionsSection = styled.div`
  margin-top: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--color-background);
  border-radius: var(--border-radius-lg);
`

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
`

const MedicationDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const medication = useSelector((state: RootState) => 
    state.medications.medications.find(med => med.id === id)
  )

  if (!medication) {
    return (
      <Container>
        <Header>
          <BackButton onClick={() => navigate('/medications')}>
            ←
          </BackButton>
          <h1>Medicamento não encontrado</h1>
        </Header>
      </Container>
    )
  }

  const handleTakeMedication = () => {
    dispatch(takeMedication({
      medicationId: medication.id,
      scheduledFor: new Date(),
    }))
    toast.success('Medicamento registrado como tomado!')
  }

  const handleDeleteMedication = () => {
    if (window.confirm('Tem certeza que deseja excluir este medicamento?')) {
      dispatch(deleteMedication(medication.id))
      toast.success('Medicamento excluído com sucesso!')
      navigate('/medications')
    }
  }

  const getStatusText = (status: MedicationStatus) => {
    switch (status) {
      case MedicationStatus.ACTIVE: return '✅ Ativo'
      case MedicationStatus.PAUSED: return '⏸️ Pausado'
      case MedicationStatus.EXPIRED: return '❌ Vencido'
      default: return '❓ Desconhecido'
    }
  }

  const isLowStock = medication.currentQuantity <= 5
  const stockPercentage = (medication.currentQuantity / medication.totalQuantity) * 100

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/medications')}>
          ←
        </BackButton>
      </Header>

      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MedicationHeader>
          <MedicationInfo>
            <MedicationName>{medication.name}</MedicationName>
            <StatusBadge $status={medication.status}>
              {getStatusText(medication.status)}
            </StatusBadge>
          </MedicationInfo>
          
          <ActionButtons>
            <Button onClick={handleTakeMedication}>
              ✅ Tomar Agora
            </Button>
            <Button $variant="danger" onClick={handleDeleteMedication}>
              🗑️ Excluir
            </Button>
          </ActionButtons>
        </MedicationHeader>

        <DetailGrid>
          <DetailItem>
            <DetailLabel>Dosagem</DetailLabel>
            <DetailValue>{medication.dosage}</DetailValue>
          </DetailItem>

          <DetailItem>
            <DetailLabel>Estoque</DetailLabel>
            <DetailValue $highlight={isLowStock}>
              {medication.currentQuantity}/{medication.totalQuantity}
              {isLowStock && ' ⚠️'}
            </DetailValue>
          </DetailItem>

          {medication.price && (
            <DetailItem>
              <DetailLabel>Preço</DetailLabel>
              <DetailValue>R$ {medication.price.toFixed(2)}</DetailValue>
            </DetailItem>
          )}

          {medication.barcode && (
            <DetailItem>
              <DetailLabel>Código de Barras</DetailLabel>
              <DetailValue>{medication.barcode}</DetailValue>
            </DetailItem>
          )}

          <DetailItem>
            <DetailLabel>Criado em</DetailLabel>
            <DetailValue>
              {new Date(medication.createdAt).toLocaleDateString('pt-BR')}
            </DetailValue>
          </DetailItem>

          <DetailItem>
            <DetailLabel>Atualizado em</DetailLabel>
            <DetailValue>
              {new Date(medication.updatedAt).toLocaleDateString('pt-BR')}
            </DetailValue>
          </DetailItem>
        </DetailGrid>

        {medication.instructions && (
          <InstructionsSection>
            <SectionTitle>Instruções de Uso</SectionTitle>
            <p style={{ lineHeight: 1.6, color: 'var(--color-text-primary)' }}>
              {medication.instructions}
            </p>
          </InstructionsSection>
        )}
      </Card>
    </Container>
  )
}

export default MedicationDetailScreen