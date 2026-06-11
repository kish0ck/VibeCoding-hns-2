/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Nike Design System
        'ink': '#111111',
        'canvas': '#ffffff',
        'soft-cloud': '#f5f5f5',
        'charcoal': '#39393b',
        'mute': '#707072',
        'hairline': '#cacacb',
        'hairline-soft': '#e5e5e5',
        'sale': '#d30005',
        'success': '#007d48',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '18px',
        'xl': '24px',
        'section': '48px',
      },
      borderRadius: {
        'pill': '30px',
      },
      fontSize: {
        'display': ['96px', { lineHeight: '0.9', fontWeight: '500' }],
        'heading-xl': ['32px', { lineHeight: '1.2', fontWeight: '500' }],
        'heading-lg': ['24px', { lineHeight: '1.2', fontWeight: '500' }],
        'heading-md': ['16px', { lineHeight: '1.75', fontWeight: '500' }],
        'body-md': ['16px', { lineHeight: '1.5' }],
        'body-strong': ['16px', { lineHeight: '1.5', fontWeight: '500' }],
        'button-md': ['16px', { lineHeight: '1.5', fontWeight: '500' }],
        'caption-md': ['14px', { lineHeight: '1.5', fontWeight: '500' }],
        'caption-sm': ['12px', { lineHeight: '1.5', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
}
