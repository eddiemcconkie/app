import { useEffect, useState } from 'react'

type Sizes = 'mobile' | 'tablet' | 'desktop'

const useBreakpoint = () => {
  const breakpointMedium = 384 // Should match breakpoint in _breakpoints.scss
  const breakpointLarge = 768 // Should match breakpoint in _breakpoints.scss
  const [screenSize, setScreenSize] = useState<Sizes>('mobile')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= breakpointLarge) {
        setScreenSize('desktop')
      } else if (window.innerWidth >= breakpointMedium) {
        setScreenSize('tablet')
      } else {
        setScreenSize('mobile')
      }
    }
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // return screenSize
  return {
    isMobile: screenSize === 'mobile',
    isTablet: screenSize === 'tablet',
    isDesktop: screenSize === 'desktop',
    isTabletAndUp: screenSize in ['tablet', 'desktop'],
    isTabletAndDown: screenSize in ['mobile', 'tablet'],
  }
}

export default useBreakpoint
