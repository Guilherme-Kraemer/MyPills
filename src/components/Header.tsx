import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '@store/store'

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-text-disabled);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-md);
  z-index: 1001;
  
  @media (min-width: 768px) {
    padding-left: 300px; // Account for side navigation
  }
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  color: var(--color-text-primary);
  font-weight: 700;
  font-size: 1.25rem;
`

const LogoIcon = styled.span`
  font-size: 1.5rem;
`

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  @media (max-width: 767px) {
    display: none;
  }
`

const UserName = styled.span`
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--color-text-primary);
`

const UserEmail = styled.span`
  font-size: 0.75rem;
  color: var(--color-text-secondary);
`

const SettingsButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-lg);
  background: var(--color-background);
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 1.25rem;
  transition: all var(--transition-fast);
  
  &:hover {
    background: var(--color-text-disabled);
    color: var(--color-text-primary);
  }
`

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <HeaderContainer>
      <Logo to="/dashboard">
        <LogoIcon>💊</LogoIcon>
        MyPills
      </Logo>
      
      <UserSection>
        {user && (
          <UserInfo>
            <UserName>{user.name}</UserName>
            {user.email && <UserEmail>{user.email}</UserEmail>}
          </UserInfo>
        )}
        
        <SettingsButton to="/settings" title="Configurações">
          ⚙️
        </SettingsButton>
      </UserSection>
    </HeaderContainer>
  )
}

export default Header