// Type declarations for image imports
// This allows importing any image file from @assets/images with any extension
// Using StaticImageData to match Next.js Image component expectations
import { StaticImageData } from 'next/image'

// Declare module for @assets/images path alias with all common image extensions
declare module '@assets/images/*.png' {
  const value: StaticImageData | string
  export default value
}

declare module '@assets/images/*.jpg' {
  const value: StaticImageData | string
  export default value
}

declare module '@assets/images/*.jpeg' {
  const value: StaticImageData | string
  export default value
}

declare module '@assets/images/*.svg' {
  const value: StaticImageData | string
  export default value
}

declare module '@assets/images/*.gif' {
  const value: StaticImageData | string
  export default value
}

declare module '@assets/images/*.webp' {
  const value: StaticImageData | string
  export default value
}

// Fallback for any other extensions
declare module '@assets/images/*' {
  const value: StaticImageData | string
  export default value
}

// Support for relative paths - TypeScript requires exact path matching
// These cover common relative path patterns used in the codebase
declare module '../../../assets/images/*.png' {
  const value: StaticImageData | string
  export default value
}

declare module '../../../assets/images/*.jpg' {
  const value: StaticImageData | string
  export default value
}

declare module '../../../assets/images/*.jpeg' {
  const value: StaticImageData | string
  export default value
}

declare module '../../../assets/images/*.svg' {
  const value: StaticImageData | string
  export default value
}

declare module '../../../assets/images/*' {
  const value: StaticImageData | string
  export default value
}

// Additional relative path patterns
declare module '../../assets/images/*' {
  const value: StaticImageData | string
  export default value
}

declare module '../assets/images/*' {
  const value: StaticImageData | string
  export default value
}

declare module './assets/images/*' {
  const value: StaticImageData | string
  export default value
}

