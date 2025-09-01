import React from 'react'
import styled from 'styled-components'

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--color-background);
`

const Logo = styled.div`
  font-size: 3rem;
  margin-bottom: var(--spacing-lg);
`

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-text-disabled);
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-md);
`

const LoadingText = styled.p`
  color: var(--color-text-secondary);
  font-size: 1rem;
`

const LoadingScreen: React.FC = () => {
  return (
    <LoadingContainer>
      <Logo>💊</Logo>
      <LoadingSpinner />
      <LoadingText>Carregando MyPills...</LoadingText>
    </LoadingContainer>
  )
}

export default LoadingScreen