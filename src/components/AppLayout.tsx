import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Navigation from './Navigation'
import Header from './Header'

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-background);
`

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px; // Space for bottom navigation
  
  @media (min-width: 768px) {
    padding-bottom: 0;
    padding-left: 280px; // Space for side navigation
  }
`

const Content = styled.div`
  flex: 1;
  padding: var(--spacing-md);
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation()
  
  return (
    <LayoutContainer>
      <Header />
      <Main>
        <Content>
          {children}
        </Content>
      </Main>
      <Navigation currentPath={location.pathname} />
    </LayoutContainer>
  )
}

export default AppLayout