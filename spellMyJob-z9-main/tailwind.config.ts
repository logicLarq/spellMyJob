import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
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
  			// Harry Potter House Colors
  			gryffindor: {
  				red: '#740001',
  				gold: '#d3a625',
  				light: '#ae0001'
  			},
  			slytherin: {
  				green: '#1a472a',
  				silver: '#5d5d5d',
  				light: '#2a623d'
  			},
  			ravenclaw: {
  				blue: '#0e1a40',
  				bronze: '#946b2d',
  				light: '#222f5b'
  			},
  			hufflepuff: {
  				yellow: '#ecb939',
  				black: '#726255',
  				light: '#f0c75e'
  			},
  			magical: {
  				blue: '#7877c6',
  				purple: '#6b46c1',
  				gold: '#fbbf24',
  				silver: '#9ca3af'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			'cinzel': ['Cinzel', 'serif'],
  			'crimson': ['Crimson Text', 'serif'],
  			'magical': ['Cinzel', 'serif']
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
  			'spell-glow': {
  				'0%, 100%': {
  					boxShadow: '0 0 10px rgba(120, 119, 198, 0.3)'
  				},
  				'50%': {
  					boxShadow: '0 0 20px rgba(120, 119, 198, 0.6), 0 0 30px rgba(120, 119, 198, 0.3)'
  				}
  			},
  			'wand-sparkle': {
  				'0%': {
  					transform: 'rotate(0deg) scale(1)',
  					opacity: '1'
  				},
  				'50%': {
  					transform: 'rotate(180deg) scale(1.2)',
  					opacity: '0.8'
  				},
  				'100%': {
  					transform: 'rotate(360deg) scale(1)',
  					opacity: '1'
  				}
  			},
  			'parchment-fade': {
  				'0%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				},
  				'100%': {
  					backgroundPosition: '0% 50%'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'spell-glow': 'spell-glow 2s ease-in-out infinite',
  			'wand-sparkle': 'wand-sparkle 3s ease-in-out infinite',
  			'parchment-fade': 'parchment-fade 4s ease infinite'
  		},
  		backgroundImage: {
  			'parchment': 'linear-gradient(135deg, #f4f1e8 0%, #e8dcc0 50%, #d4c4a8 100%)',
  			'magical-glow': 'radial-gradient(circle, rgba(120, 119, 198, 0.3) 0%, transparent 70%)',
  			'gryffindor': 'linear-gradient(135deg, #740001 0%, #ae0001 50%, #d3a625 100%)',
  			'slytherin': 'linear-gradient(135deg, #1a472a 0%, #2a623d 50%, #5d5d5d 100%)',
  			'ravenclaw': 'linear-gradient(135deg, #0e1a40 0%, #222f5b 50%, #946b2d 100%)',
  			'hufflepuff': 'linear-gradient(135deg, #ecb939 0%, #f0c75e 50%, #726255 100%)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
