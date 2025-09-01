import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { RootState, AppDispatch } from '@store/store'
import { loadFromStorage } from '@store/slices/assistantSlice'

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

const AssistantScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(loadFromStorage())
  }, [dispatch])

  return (
    <Container>
      <Title>🤖 Assistente IA</Title>
      
      <ComingSoon>
        <ComingSoonIcon>🚧</ComingSoonIcon>
        <ComingSoonTitle>Módulo em Desenvolvimento</ComingSoonTitle>
        <ComingSoonText>
          O assistente IA terá conversação inteligente, análise de dados de saúde,
          sugestões personalizadas e integração com todos os módulos. Em breve!
        </ComingSoonText>
      </ComingSoon>
    </Container>
  )
}

export default AssistantScreen