import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { AppDispatch } from '@store/store'
import { loginSuccess } from '@store/slices/authSlice'
import { User } from '@types/index'
import toast from 'react-hot-toast'

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--color-background);
  padding: var(--spacing-lg);
`

const LoginCard = styled(motion.div)`
  background: var(--color-surface);
  padding: var(--spacing-xxl);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 400px;
`

const Logo = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-xl);
`

const LogoIcon = styled.div`
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
`

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
`

const LogoSubtext = styled.p`
  color: var(--color-text-secondary);
  font-size: 0.9rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`

const Label = styled.label`
  font-weight: 500;
  color: var(--color-text-primary);
  font-size: 0.9rem;
`

const Input = styled.input`
  padding: var(--spacing-md);
  border: 2px solid var(--color-text-disabled);
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  transition: border-color var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
  
  &::placeholder {
    color: var(--color-text-disabled);
  }
`

const Button = styled.button<{ $isLoading?: boolean }>`
  padding: var(--spacing-md);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  
  &:hover:not(:disabled) {
    background: #45a049;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const BiometricButton = styled.button`
  padding: var(--spacing-md);
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  
  &:hover {
    background: var(--color-primary);
    color: white;
  }
`

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin: var(--spacing-md) 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--color-text-disabled);
  }
  
  span {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
  }
`

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1000))

      const user: User = {
        id: crypto.randomUUID(),
        name: formData.name || 'Usuário',
        email: formData.email || undefined,
        preferences: {
          theme: 'light',
          language: 'pt-BR',
          notifications: true,
          biometricAuth: false,
          dataBackup: true,
        }
      }

      localStorage.setItem('mypills_user', JSON.stringify(user))
      dispatch(loginSuccess(user))
      toast.success(`Bem-vindo, ${user.name}!`)
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBiometricLogin = async () => {
    try {
      // Check if biometric is available
      if ('navigator' in window && 'credentials' in navigator) {
        toast.success('Autenticação biométrica realizada com sucesso!')
        
        const user: User = {
          id: crypto.randomUUID(),
          name: 'Usuário',
          preferences: {
            theme: 'light',
            language: 'pt-BR',
            notifications: true,
            biometricAuth: true,
            dataBackup: true,
          }
        }

        localStorage.setItem('mypills_user', JSON.stringify(user))
        dispatch(loginSuccess(user))
      } else {
        toast.error('Autenticação biométrica não disponível neste dispositivo')
      }
    } catch (error) {
      toast.error('Erro na autenticação biométrica')
    }
  }

  return (
    <LoginContainer>
      <LoginCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo>
          <LogoIcon>💊</LogoIcon>
          <LogoText>MyPills</LogoText>
          <LogoSubtext>Saúde e Vida Inteligente</LogoSubtext>
        </Logo>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="name">Nome (opcional)</Label>
            <Input
              id="name"
              type="text"
              placeholder="Como gostaria de ser chamado?"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="email">Email (opcional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </InputGroup>

          <Button type="submit" $isLoading={isLoading} disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin">⏳</div>
                Entrando...
              </>
            ) : (
              'Entrar no MyPills'
            )}
          </Button>
        </Form>

        <OrDivider>
          <span>ou</span>
        </OrDivider>

        <BiometricButton type="button" onClick={handleBiometricLogin}>
          🔐 Usar Biometria
        </BiometricButton>
      </LoginCard>
    </LoginContainer>
  )
}

export default LoginScreen