import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { RootState, AppDispatch } from '@store/store'
import { logout, updateUserPreferences } from '@store/slices/authSlice'
import toast from 'react-hot-toast'

const Container = styled.div`
  padding-top: 80px;
  max-width: 600px;
  margin: 0 auto;
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

const SettingsSection = styled.div`
  background: var(--color-surface);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-lg);
`

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
`

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--color-background);
  
  &:last-child {
    border-bottom: none;
  }
`

const SettingLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`

const SettingName = styled.span`
  font-weight: 500;
  color: var(--color-text-primary);
`

const SettingDescription = styled.span`
  font-size: 0.8rem;
  color: var(--color-text-secondary);
`

const Toggle = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

const Select = styled.select`
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--color-text-disabled);
  border-radius: var(--border-radius-md);
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`

const DangerButton = styled.button`
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-error);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition-fast);
  
  &:hover {
    background: #d32f2f;
  }
`

const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)

  const handleToggle = (setting: keyof NonNullable<typeof user>['preferences']) => {
    if (user) {
      dispatch(updateUserPreferences({
        [setting]: !user.preferences[setting]
      }))
      toast.success('Configuração atualizada!')
    }
  }

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    if (user) {
      dispatch(updateUserPreferences({ theme }))
      toast.success('Tema atualizado!')
    }
  }

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      localStorage.removeItem('mypills_user')
      dispatch(logout())
      toast.success('Logout realizado com sucesso!')
    }
  }

  const clearAllData = () => {
    if (window.confirm('ATENÇÃO: Isso irá apagar TODOS os seus dados. Esta ação não pode ser desfeita. Continuar?')) {
      localStorage.clear()
      dispatch(logout())
      toast.success('Todos os dados foram apagados.')
    }
  }

  if (!user) return null

  return (
    <Container>
      <Title>⚙️ Configurações</Title>

      <SettingsSection>
        <SectionTitle>Aparência</SectionTitle>
        
        <SettingItem>
          <SettingLabel>
            <SettingName>Tema</SettingName>
            <SettingDescription>Escolha o tema da aplicação</SettingDescription>
          </SettingLabel>
          <Select 
            value={user.preferences.theme}
            onChange={(e) => handleThemeChange(e.target.value as any)}
          >
            <option value="light">Claro</option>
            <option value="dark">Escuro</option>
            <option value="auto">Automático</option>
          </Select>
        </SettingItem>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>Notificações</SectionTitle>
        
        <SettingItem>
          <SettingLabel>
            <SettingName>Notificações Push</SettingName>
            <SettingDescription>Receber notificações de lembretes</SettingDescription>
          </SettingLabel>
          <Toggle
            checked={user.preferences.notifications}
            onChange={() => handleToggle('notifications')}
          />
        </SettingItem>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>Segurança</SectionTitle>
        
        <SettingItem>
          <SettingLabel>
            <SettingName>Autenticação Biométrica</SettingName>
            <SettingDescription>Usar impressão digital ou Face ID</SettingDescription>
          </SettingLabel>
          <Toggle
            checked={user.preferences.biometricAuth}
            onChange={() => handleToggle('biometricAuth')}
          />
        </SettingItem>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>Dados</SectionTitle>
        
        <SettingItem>
          <SettingLabel>
            <SettingName>Backup Automático</SettingName>
            <SettingDescription>Fazer backup dos dados localmente</SettingDescription>
          </SettingLabel>
          <Toggle
            checked={user.preferences.dataBackup}
            onChange={() => handleToggle('dataBackup')}
          />
        </SettingItem>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>Conta</SectionTitle>
        
        <SettingItem style={{ marginBottom: 'var(--spacing-md)' }}>
          <SettingLabel>
            <SettingName>Nome: {user.name}</SettingName>
            {user.email && <SettingDescription>Email: {user.email}</SettingDescription>}
          </SettingLabel>
        </SettingItem>
        
        <DangerButton onClick={handleLogout} style={{ marginBottom: 'var(--spacing-md)' }}>
          🚪 Sair da Conta
        </DangerButton>
        
        <DangerButton onClick={clearAllData}>
          🗑️ Apagar Todos os Dados
        </DangerButton>
      </SettingsSection>
    </Container>
  )
}

export default SettingsScreen