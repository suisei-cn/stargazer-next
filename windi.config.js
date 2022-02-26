import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
    extend: {
      fontFamily: {}
    }
  },
  extract: {
    include: ['./src/**/*.{html,jsx,tsx,js,ts}'],
    exclude: ['node_modules', '.git', '.next']
  },
  plugins: [
    require('windicss/plugin/filters'),
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/line-clamp')
  ]
})
