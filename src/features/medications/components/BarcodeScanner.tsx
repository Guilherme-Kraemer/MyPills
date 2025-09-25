import React, { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { AppDispatch } from '@store/store'
import { closeScanner } from '@store/slices/medicationsSlice'
import toast from 'react-hot-toast'


const ScannerOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ScannerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1;
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  background: black;
`

const ScannerViewport = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
`

const ScannerFrame = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 100px;
  border: 2px solid var(--color-success);
  border-radius: var(--border-radius-md);
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 3px solid var(--color-success);
  }
  
  &::before {
    top: -3px;
    left: -3px;
    border-right: none;
    border-bottom: none;
  }
  
  &::after {
    bottom: -3px;
    right: -3px;
    border-left: none;
    border-top: none;
  }
`

const ScannerControls = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
`

const ControlButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  
  ${props => props.$variant === 'primary' ? `
    background: var(--color-success);
    color: white;
    border: 2px solid var(--color-success);
    
    &:hover {
      background: #45a049;
    }
  ` : `
    background: transparent;
    color: white;
    border: 2px solid white;
    
    &:hover {
      background: white;
      color: black;
    }
  `}
`

const Instructions = styled.div`
  text-align: center;
  color: white;
  margin-bottom: var(--spacing-lg);
`

const InstructionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
`

const InstructionText = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  line-height: 1.5;
`

const BarcodeScanner: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const scannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!scannerRef.current) return

    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: scannerRef.current,
        constraints: {
          width: 400,
          height: 400,
          facingMode: "environment"
        }
      },
      decoder: {
        readers: [
          "ean_reader",
          "ean_8_reader",
          "code_128_reader",
          "code_39_reader"
        ]
      },
      locate: true,
      locator: {
        halfSample: true,
        patchSize: "medium"
      }
    }, (err) => {
      if (err) {
        console.error('Error initializing Quagga:', err)
        toast.error('Erro ao inicializar o scanner')
        handleClose()
        return
      }
      Quagga.start()
    })

    const handleDetected = (result: any) => {
      const code = result.codeResult.code
      console.log('Barcode detected:', code)

      Quagga.stop()
      toast.success(`Código detectado: ${code}`)

      // Here you would typically search for the product by barcode
      // For now, we'll just show the code and close the scanner
      handleClose()
    }

    Quagga.onDetected(handleDetected)

    return () => {
      Quagga.stop()
    }
  }, [])

  const handleClose = () => {
    Quagga.stop()
    dispatch(closeScanner())
  }

  const handleManualInput = () => {
    const code = prompt('Digite o código de barras manualmente:')
    if (code) {
      toast.success(`Código inserido: ${code}`)
      handleClose()
    }
  }

  return (
    <ScannerOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Instructions>
        <InstructionTitle>Scanner de Código de Barras</InstructionTitle>
        <InstructionText>
          Posicione o código de barras dentro do quadro para escanear
        </InstructionText>
      </Instructions>

      <ScannerContainer>
        <ScannerViewport ref={scannerRef} />
        <ScannerFrame />
      </ScannerContainer>

      <ScannerControls>
        <ControlButton onClick={handleManualInput}>
          ⌨️ Digitar Código
        </ControlButton>
        <ControlButton $variant="secondary" onClick={handleClose}>
          ❌ Fechar
        </ControlButton>
      </ScannerControls>
    </ScannerOverlay>
  )
}

export default BarcodeScanner