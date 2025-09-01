import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { RootState, AppDispatch } from '@store/store'
import { loadFromStorage } from '@store/slices/financesSlice'

const Container = styled.div`
  padding-top: 80px;
`

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`

const ComingSoon = styled.div`
  text-align: center;
  padding: var(--spacing-xxl);
  background: var(--color-surface);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
`

const ComingSoonIcon = styled.div`
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
`

const ComingSoonTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
`

const ComingSoonText = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto;
`

const FinancesScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(loadFromStorage())
  }, [dispatch])

  return (
    <Container>
      <Title>💰 Finanças</Title>
      
      <ComingSoon>
        <ComingSoonIcon>🚧</ComingSoonIcon>
        <ComingSoonTitle>Módulo em Desenvolvimento</ComingSoonTitle>
        <ComingSoonText>
          O módulo de finanças está sendo desenvolvido e incluirá controle de contas, 
          orçamentos, transações e calculadoras financeiras. Em breve estará disponível!
        </ComingSoonText>
      </ComingSoon>
    </Container>
  )
}

export default FinancesScreen