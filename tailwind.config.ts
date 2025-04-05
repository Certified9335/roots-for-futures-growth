
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom nature-inspired colors
				forest: {
					50: '#e7f0e8',
					100: '#c5dbc8',
					200: '#a0c4a5',
					300: '#7aae82',
					400: '#5d9e67',
					500: '#488f4a', // Primary forest green
					600: '#3d7c41',
					700: '#316435',
					800: '#254d29',
					900: '#143a16',
				},
				earth: {
					50: '#f7f4ed',
					100: '#e8e2d3',
					200: '#d7ccb4',
					300: '#c6b695',
					400: '#b7a57a',
					500: '#a89260', // Primary earth tone
					600: '#8c7950',
					700: '#6f613f',
					800: '#53482f',
					900: '#37301f',
				},
				sky: {
					50: '#e6f2f7',
					100: '#c3dfea',
					200: '#9cccdd',
					300: '#75b9cf',
					400: '#54aac5',
					500: '#3c9bba', // Primary sky blue
					600: '#347f9a',
					700: '#2a6478',
					800: '#1f4a57',
					900: '#132f38',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'grow': {
					'0%': {
						transform: 'scale(0.95) translateY(10px)',
						opacity: '0.5',
					},
					'100%': {
						transform: 'scale(1) translateY(0)',
						opacity: '1',
					},
				},
				'leaf-sway': {
					'0%, 100%': {
						transform: 'rotate(-3deg)'
					},
					'50%': {
						transform: 'rotate(3deg)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'grow': 'grow 0.6s ease-out',
				'leaf-sway': 'leaf-sway 5s ease-in-out infinite'
			},
			backgroundImage: {
				'leaf-pattern': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyMHYyMEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMCA0QzcuNzkgNCA2IDUuNzkgNiA4YzAgMi4zOCAxLjE5IDQuNDcgMyA1Ljc0VjE1YTEgMSAwIDEgMCAyIDB2LTEuMjZjMS44MS0xLjI3IDMtMy4zNiAzLTUuNzQgMC0yLjIxLTEuNzktNC00LTR6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

