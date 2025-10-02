// src/types/quagga2.d.ts
declare module "@ericblade/quagga2" {
  export interface QuaggaConfig {
    inputStream: {
      name?: string
      type: "LiveStream" | "ImageStream"
      target: HTMLElement | string
      constraints?: MediaTrackConstraints
    }
    decoder: {
      readers: string[]
    }
    locate?: boolean
    locator?: {
      halfSample?: boolean
      patchSize?: "x-small" | "small" | "medium" | "large" | "x-large"
    }
  }

  export interface QuaggaResult {
    codeResult: {
      code: string
      format: string
    }
  }

  const Quagga: {
    init(config: QuaggaConfig, cb: (err?: any) => void): void
    start(): void
    stop(): void
    onDetected(cb: (result: QuaggaResult) => void): void
    offDetected(cb: (result: QuaggaResult) => void): void
  }

  export default Quagga
}
