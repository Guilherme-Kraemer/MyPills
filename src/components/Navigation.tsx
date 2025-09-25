import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-surface);
  border-top: 1px solid var(--color-text-disabled);
  padding: var(--spacing-sm) 0;
  z-index: 1000;
  
  @media (min-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 280px;
    border-top: none;
    border-right: 1px solid var(--color-text-disabled);
    padding: var(--spacing-lg) 0;
    overflow-y: auto;
  }
`

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (min-width: 768px) {
    flex-direction: column;
    gap: var(--spacing-sm);
    padding: 0 var(--spacing-md);
  }
`

const NavItem = styled.li<{ $isActive: boolean }>`
  flex: 1;
  
  @media (min-width: 768px) {
    flex: none;
  }
`

const NavLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  text-decoration: none;
  color: ${props => props.$isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
  font-size: 0.75rem;
  font-weight: ${props => props.$isActive ? '600' : '400'};
  transition: color var(--transition-fast);
  border-radius: var(--border-radius-md);
  
  &:hover {
    color: var(--color-primary);
    background: rgba(76, 175, 80, 0.1);
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    font-size: 0.9rem;
    background: ${props => props.$isActive ? 'rgba(76, 175, 80, 0.1)' : 'transparent'};
  }
`

const NavIcon = styled.span`
  font-size: 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`

const NavText = styled.span`
  @media (max-width: 767px) {
    font-size: 0.7rem;
  }
`

interface NavigationProps {
  currentPath: string
}

const Navigation: React.FC<NavigationProps> = ({ currentPath }) => {
  const navItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/medications', icon: '💊', label: 'Medicamentos' },
    { path: '/reminders', icon: '⏰', label: 'Lembretes' },
  ]

  return (
    <NavContainer>
      <NavList>
        {navItems.map((item) => (
          <NavItem key={item.path} $isActive={currentPath.startsWith(item.path)}>
            <NavLink 
              to={item.path} 
              $isActive={currentPath.startsWith(item.path)}
            >
              <NavIcon>{item.icon}</NavIcon>
              <NavText>{item.label}</NavText>
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </NavContainer>
  )
}

export default Navigation