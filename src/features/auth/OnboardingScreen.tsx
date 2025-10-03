import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { AppDispatch } from '@store/store'
import { completeOnboarding } from '@store/slices/authSlice'

const OnboardingContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  padding: var(--spacing-lg);
`

const SlideContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const SlideIcon = styled.div`
  font-size: 4rem;
  margin-bottom: var(--spacing-xl);
`

const SlideTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
`

const SlideDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 400px;
`

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-xl);
`

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  font-weight: 600;
  font-size: 1rem;
  transition: all var(--transition-fast);
  cursor: pointer;
  
  ${props => props.$variant === 'primary' ? `
    background: white;
    color: var(--color-primary);
    border: 2px solid white;
    
    &:hover {
      background: rgba(255, 255, 255, 0.9);
    }
  ` : `
    background: transparent;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.5);
    
    &:hover {
      border-color: white;
      background: rgba(255, 255, 255, 0.1);
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Indicators = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  margin: var(--spacing-lg) 0;
`

const Indicator = styled.div<{ $isActive: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$isActive ? 'white' : 'rgba(255, 255, 255, 0.3)'};
  transition: background var(--transition-fast);
`

const onboardingSlides = [
  {
    icon: '💊',
    title: 'Bem-vindo ao MyPills',
    description: 'Seu assistente pessoal de saúde e vida inteligente. Gerencie medicamentos, finanças e muito mais em um só lugar.'
  },
  {
    icon: '🏥',
    title: 'Controle de Medicamentos',
    description: 'Scanner de código de barras, lembretes inteligentes e controle de estoque. Nunca mais esqueça de tomar seus remédios.'
  },
  {
    icon: '🔒',
    title: 'Privacidade Total',
    description: 'Todos os dados ficam no seu dispositivo. Sem rastreamento, sem anúncios, sem compartilhamento.'
  }
]

const OnboardingScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      dispatch(completeOnboarding())
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const skipOnboarding = () => {
    dispatch(completeOnboarding())
  }

  const currentSlideData = onboardingSlides[currentSlide]
  const isLastSlide = currentSlide === onboardingSlides.length - 1

  return (
    <OnboardingContainer>
      <AnimatePresence mode="wait">
        <SlideContainer
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <SlideIcon>{currentSlideData.icon}</SlideIcon>
          <SlideTitle>{currentSlideData.title}</SlideTitle>
          <SlideDescription>{currentSlideData.description}</SlideDescription>
        </SlideContainer>
      </AnimatePresence>

      <Indicators>
        {onboardingSlides.map((_, index) => (
          <Indicator key={index} $isActive={index === currentSlide} />
        ))}
      </Indicators>

      <Navigation>
        <Button 
          type="button" 
          onClick={skipOnboarding}
          $variant="secondary"
        >
          Pular
        </Button>
        
        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
          {currentSlide > 0 && (
            <Button 
              type="button" 
              onClick={prevSlide}
              $variant="secondary"
            >
              Anterior
            </Button>
          )}
          
          <Button 
            type="button" 
            onClick={nextSlide}
            $variant="primary"
          >
            {isLastSlide ? 'Começar' : 'Próximo'}
          </Button>
        </div>
      </Navigation>
    </OnboardingContainer>
  )
}

export default OnboardingScreen