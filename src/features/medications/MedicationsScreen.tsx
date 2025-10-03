import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { RootState, AppDispatch } from '@store/store'
import { loadFromStorage, openScanner, takeMedication } from '@store/slices/medicationsSlice'
import { MedicationStatus } from '../../types'
import AddMedicationScreen from './AddMedicationScreen'
import MedicationDetailScreen from './MedicationDetailScreen'
import BarcodeScanner from './components/BarcodeScanner'
import toast from 'react-hot-toast'

const Container = styled.div`
  padding-top: 80px; // Account for fixed header
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

const ActionButtons = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  
  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  
  ${props => props.$variant === 'primary' ? `
    background: var(--color-medication);
    color: white;
    border: 2px solid var(--color-medication);
    
    &:hover {
      background: #45a049;
      transform: translateY(-1px);
    }
  ` : `
    background: var(--color-surface);
    color: var(--color-medication);
    border: 2px solid var(--color-medication);
    
    &:hover {
      background: var(--color-medication);
      color: white;
    }
  `}
`

const TabContainer = styled.div`
  display: flex;
  background: var(--color-surface);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xs);
  margin-bottom: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
`

const Tab = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: var(--spacing-md);
  background: ${props => props.$isActive ? 'var(--color-medication)' : 'transparent'};
  color: ${props => props.$isActive ? 'white' : 'var(--color-text-secondary)'};
  border: none;
  border-radius: var(--border-radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background: ${props => props.$isActive ? 'var(--color-medication)' : 'rgba(76, 175, 80, 0.1)'};
    color: ${props => props.$isActive ? 'white' : 'var(--color-medication)'};
  }
`

const MedicationGrid = styled.div`
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`

const MedicationCard = styled(motion.div)<{ $status: MedicationStatus }>`
  background: var(--color-surface);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  border-left: 4px solid ${props => {
    switch (props.$status) {
      case MedicationStatus.ACTIVE: return 'var(--color-success)'
      case MedicationStatus.PAUSED: return 'var(--color-warning)'
      case MedicationStatus.EXPIRED: return 'var(--color-error)'
      default: return 'var(--color-text-disabled)'
    }
  }};
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`

const MedicationName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
`

const MedicationInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`

const Dosage = styled.span`
  color: var(--color-text-secondary);
  font-size: 0.9rem;
`

const Quantity = styled.span<{ $isLow: boolean }>`
  color: ${props => props.$isLow ? 'var(--color-error)' : 'var(--color-text-secondary)'};
  font-weight: ${props => props.$isLow ? '600' : '400'};
  font-size: 0.9rem;
`

const MedicationActions = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`

const ActionButton = styled.button`
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-medication);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition-fast);
  
  &:hover {
    background: #45a049;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-xxl);
  color: var(--color-text-secondary);
`

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: var(--spacing-lg);
`

type TabType = 'all' | 'active' | 'low-stock' | 'expired'

const MedicationsScreen: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { medications, scannerOpen } = useSelector((state: RootState) => state.medications)
  const [activeTab, setActiveTab] = useState<TabType>('all')

  useEffect(() => {
    dispatch(loadFromStorage())
  }, [dispatch])

  const handleTakeMedication = (medicationId: string) => {
    dispatch(takeMedication({
      medicationId,
      scheduledFor: new Date(),
    }))
    toast.success('Medicamento registrado como tomado!')
  }

  const filteredMedications = medications.filter(medication => {
    switch (activeTab) {
      case 'active':
        return medication.status === MedicationStatus.ACTIVE
      case 'low-stock':
        return medication.currentQuantity <= 5
      case 'expired':
        return medication.status === MedicationStatus.EXPIRED
      default:
        return true
    }
  })

  return (
    <Container>
      <Routes>
        <Route path="/add" element={<AddMedicationScreen />} />
        <Route path="/:id" element={<MedicationDetailScreen />} />
        <Route path="/" element={
          <>
            <Header>
              <Title>
                💊 Medicamentos
              </Title>
              <ActionButtons>
                <Button 
                  $variant="secondary"
                  onClick={() => dispatch(openScanner())}
                >
                  📷 Scanner
                </Button>
                <Button 
                  $variant="primary"
                  onClick={() => navigate('/medications/add')}
                >
                  ➕ Adicionar
                </Button>
              </ActionButtons>
            </Header>

            <TabContainer>
              <Tab 
                $isActive={activeTab === 'all'} 
                onClick={() => setActiveTab('all')}
              >
                Todos ({medications.length})
              </Tab>
              <Tab 
                $isActive={activeTab === 'active'} 
                onClick={() => setActiveTab('active')}
              >
                Ativos ({medications.filter(m => m.status === MedicationStatus.ACTIVE).length})
              </Tab>
              <Tab 
                $isActive={activeTab === 'low-stock'} 
                onClick={() => setActiveTab('low-stock')}
              >
                Estoque Baixo ({medications.filter(m => m.currentQuantity <= 5).length})
              </Tab>
              <Tab 
                $isActive={activeTab === 'expired'} 
                onClick={() => setActiveTab('expired')}
              >
                Vencidos ({medications.filter(m => m.status === MedicationStatus.EXPIRED).length})
              </Tab>
            </TabContainer>

            {filteredMedications.length === 0 ? (
              <EmptyState>
                <EmptyIcon>💊</EmptyIcon>
                <h3>Nenhum medicamento encontrado</h3>
                <p>Adicione seu primeiro medicamento para começar o controle.</p>
              </EmptyState>
            ) : (
              <MedicationGrid>
                {filteredMedications.map((medication) => (
                  <MedicationCard
                    key={medication.id}
                    $status={medication.status}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => navigate(`/medications/${medication.id}`)}
                  >
                    <MedicationName>{medication.name}</MedicationName>
                    <MedicationInfo>
                      <Dosage>{medication.dosage}</Dosage>
                      <Quantity $isLow={medication.currentQuantity <= 5}>
                        {medication.currentQuantity}/{medication.totalQuantity}
                      </Quantity>
                    </MedicationInfo>
                    <MedicationActions>
                      <ActionButton 
                        onClick={(e) => {
                          e.stopPropagation()
                          handleTakeMedication(medication.id)
                        }}
                      >
                        ✅ Tomar
                      </ActionButton>
                    </MedicationActions>
                  </MedicationCard>
                ))}
              </MedicationGrid>
            )}

            {scannerOpen && <BarcodeScanner />}
          </>
        } />
      </Routes>
    </Container>
  )
}

export default MedicationsScreen