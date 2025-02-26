export const baseTokens = {
  colors: {
    white: '#ffffff',
    black: '#000000',

    // grays
    gray100: '#F0F0F4',
    gray200: '#ededf0',
    gray300: '#58585D',
    gray400: '#161617',

    // blues
    blue100: '#0060df',
    blue500: '#003eaa',
    blue700: '#1D4ED8',

    // feedback colors
    green: '#22C55E',
    red: '#EF4444',
    orange: '#F59E0B',
  },
  // Spacing
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    xxl: '3rem', // 48px
  },

  // Typography
  fontSizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    md: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    xxl: '1.5rem', // 24px
  },

  // Border radiuses
  radius: {
    sm: '0.25rem', // 4px
    md: '0.5rem', // 8px
    lg: '1rem', // 16px
    full: '9999px', // Fully rounded
  },
};

export type BaseTokens = typeof baseTokens;
