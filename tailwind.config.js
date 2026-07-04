// tailwind.config.js
// Consumes CSS variables from styles/design-tokens.css.
// Breakpoints are defined here as canonical source (also declared as CSS vars).
// Do NOT use arbitrary values – use only tokens defined in design-tokens.css.

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './design-system/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // Theme switching via [data-theme] attribute (no class-based dark mode)
  darkMode: ['selector', '[data-theme="dark"]'],

  theme: {
    // ── Breakpoints (canonical definition – also mirrored as CSS vars) ──────
    screens: {
      xs:  '480px',
      sm:  '640px',
      md:  '768px',
      lg:  '1024px',
      xl:  '1280px',
      '2xl': '1536px',
    },

    extend: {
      // ── Colours ────────────────────────────────────────────────────────────
      colors: {
        // Brand primitives (use semantic aliases in components)
        brand: {
          navy:       'var(--brand-navy)',
          'navy-dark': 'var(--brand-navy-dark)',
          'navy-soft': 'var(--brand-navy-soft)',
          'navy-hero': 'var(--brand-navy-hero)',
          blue:        'var(--brand-blue)',
          'blue-light':'var(--brand-blue-light)',
          graphite:    'var(--brand-graphite)',
          mist:        'var(--brand-mist)',
          white:       'var(--brand-white)',
          green:       'var(--brand-green)',
          border:      'var(--brand-border)',
        },

        // Semantic interactive colours
        primary:        'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-active':'var(--color-primary-active)',
        accent:         'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'accent-active':'var(--color-accent-active)',

        // Semantic backgrounds
        'bg-page':     'var(--color-bg-page)',
        'bg-subtle':   'var(--color-bg-subtle)',
        'bg-surface':  'var(--color-bg-surface)',
        'bg-elevated': 'var(--color-bg-elevated)',
        'bg-overlay':  'var(--color-bg-overlay)',
        'bg-inverted': 'var(--color-bg-inverted)',

        // Semantic text
        'text-primary':     'var(--color-text-primary)',
        'text-secondary':   'var(--color-text-secondary)',
        'text-tertiary':    'var(--color-text-tertiary)',
        'text-inverted':    'var(--color-text-inverted)',
        'text-link':        'var(--color-text-link)',
        'text-link-hover':  'var(--color-text-link-hover)',
        'text-placeholder': 'var(--color-text-placeholder)',
        'text-disabled':    'var(--color-text-disabled)',
        'text-heading':     'var(--color-text-heading)',
        'text-on-accent':   'var(--color-text-on-accent)',

        // Semantic borders
        border:           'var(--color-border)',
        'border-strong':  'var(--color-border-strong)',
        'border-subtle':  'var(--color-border-subtle)',
        'border-focus':   'var(--color-border-focus)',
        'border-error':   'var(--color-border-error)',
        'border-inverted':'var(--color-border-inverted)',

        // Status
        success:     'var(--color-success)',
        'success-bg':'var(--color-success-bg)',
        warning:     'var(--color-warning)',
        'warning-bg':'var(--color-warning-bg)',
        danger:      'var(--color-danger)',
        'danger-bg': 'var(--color-danger-bg)',
        info:        'var(--color-info)',
        'info-bg':   'var(--color-info-bg)',

        // Chart
        chart: {
          blue:   'var(--chart-blue)',
          green:  'var(--chart-green)',
          orange: 'var(--chart-orange)',
          red:    'var(--chart-red)',
          purple: 'var(--chart-purple)',
          teal:   'var(--chart-teal)',
        },

        // Neutral scale (for fine-grained control)
        neutral: {
          0:   'var(--neutral-0)',
          50:  'var(--neutral-50)',
          100: 'var(--neutral-100)',
          200: 'var(--neutral-200)',
          300: 'var(--neutral-300)',
          400: 'var(--neutral-400)',
          500: 'var(--neutral-500)',
          600: 'var(--neutral-600)',
          700: 'var(--neutral-700)',
          800: 'var(--neutral-800)',
          900: 'var(--neutral-900)',
          950: 'var(--neutral-950)',
        },
      },

      // ── Typography ─────────────────────────────────────────────────────────
      fontFamily: {
        sans:    'var(--font-family-sans)',
        display: 'var(--font-family-display)',
        mono:    'var(--font-family-mono)',
      },
      fontSize: {
        xs:   ['var(--font-size-xs)',   { lineHeight: 'var(--line-height-snug)' }],
        sm:   ['var(--font-size-sm)',   { lineHeight: 'var(--line-height-normal)' }],
        base: ['var(--font-size-base)', { lineHeight: 'var(--line-height-normal)' }],
        md:   ['var(--font-size-md)',   { lineHeight: 'var(--line-height-relaxed)' }],
        lg:   ['var(--font-size-lg)',   { lineHeight: 'var(--line-height-relaxed)' }],
        xl:   ['var(--font-size-xl)',   { lineHeight: 'var(--line-height-snug)' }],
        '2xl':['var(--font-size-2xl)', { lineHeight: 'var(--line-height-tight)' }],
        '3xl':['var(--font-size-3xl)', { lineHeight: 'var(--line-height-tight)' }],
        '4xl':['var(--font-size-4xl)', { lineHeight: 'var(--line-height-none)' }],
        '5xl':['var(--font-size-5xl)', { lineHeight: 'var(--line-height-none)' }],
        '6xl':['var(--font-size-6xl)', { lineHeight: 'var(--line-height-none)' }],
      },
      fontWeight: {
        thin:      'var(--font-weight-thin)',
        light:     'var(--font-weight-light)',
        normal:    'var(--font-weight-regular)',
        medium:    'var(--font-weight-medium)',
        semibold:  'var(--font-weight-semibold)',
        bold:      'var(--font-weight-bold)',
        extrabold: 'var(--font-weight-extrabold)',
        black:     'var(--font-weight-black)',
      },
      lineHeight: {
        none:    'var(--line-height-none)',
        tight:   'var(--line-height-tight)',
        snug:    'var(--line-height-snug)',
        normal:  'var(--line-height-normal)',
        relaxed: 'var(--line-height-relaxed)',
        loose:   'var(--line-height-loose)',
      },
      letterSpacing: {
        tighter: 'var(--tracking-tighter)',
        tight:   'var(--tracking-tight)',
        normal:  'var(--tracking-normal)',
        wide:    'var(--tracking-wide)',
        wider:   'var(--tracking-wider)',
        widest:  'var(--tracking-widest)',
      },

      // ── Spacing ────────────────────────────────────────────────────────────
      spacing: {
        px:    'var(--space-px)',
        '0.5': 'var(--space-0-5)',
        1:     'var(--space-1)',
        '1.5': 'var(--space-1-5)',
        2:     'var(--space-2)',
        '2.5': 'var(--space-2-5)',
        3:     'var(--space-3)',
        4:     'var(--space-4)',
        5:     'var(--space-5)',
        6:     'var(--space-6)',
        7:     'var(--space-7)',
        8:     'var(--space-8)',
        10:    'var(--space-10)',
        12:    'var(--space-12)',
        14:    'var(--space-14)',
        16:    'var(--space-16)',
        20:    'var(--space-20)',
        24:    'var(--space-24)',
        32:    'var(--space-32)',
        40:    'var(--space-40)',
        48:    'var(--space-48)',
        64:    'var(--space-64)',
      },

      // ── Border Radius ──────────────────────────────────────────────────────
      borderRadius: {
        none: 'var(--radius-none)',
        xs:   'var(--radius-xs)',
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        '2xl':'var(--radius-2xl)',
        '3xl':'var(--radius-3xl)',
        full: 'var(--radius-full)',
      },

      // ── Border Width ───────────────────────────────────────────────────────
      borderWidth: {
        0: 'var(--border-0)',
        1: 'var(--border-1)',
        2: 'var(--border-2)',
        4: 'var(--border-4)',
        8: 'var(--border-8)',
      },

      // ── Box Shadow ─────────────────────────────────────────────────────────
      boxShadow: {
        none:  'var(--shadow-none)',
        xs:    'var(--shadow-xs)',
        sm:    'var(--shadow-sm)',
        md:    'var(--shadow-md)',
        lg:    'var(--shadow-lg)',
        xl:    'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
        card:     'var(--shadow-card)',
        dropdown: 'var(--shadow-dropdown)',
        modal:    'var(--shadow-modal)',
        toast:    'var(--shadow-toast)',
        button:   'var(--shadow-button)',
      },

      // ── Opacity ────────────────────────────────────────────────────────────
      opacity: {
        disabled: 'var(--opacity-disabled)',
      },

      // ── Transition Duration ────────────────────────────────────────────────
      transitionDuration: {
        75:   'var(--duration-75)',
        100:  'var(--duration-100)',
        150:  'var(--duration-150)',
        200:  'var(--duration-200)',
        250:  'var(--duration-250)',
        300:  'var(--duration-300)',
        350:  'var(--duration-350)',
        400:  'var(--duration-400)',
        500:  'var(--duration-500)',
        700:  'var(--duration-700)',
        1000: 'var(--duration-1000)',
      },

      // ── Transition Timing Function ─────────────────────────────────────────
      transitionTimingFunction: {
        standard: 'var(--easing-standard)',
        entrance: 'var(--easing-entrance)',
        exit:     'var(--easing-exit)',
        bounce:   'var(--easing-bounce)',
        spring:   'var(--easing-spring)',
      },

      // ── Blur ───────────────────────────────────────────────────────────────
      blur: {
        sm:   'var(--blur-sm)',
        md:   'var(--blur-md)',
        lg:   'var(--blur-lg)',
        xl:   'var(--blur-xl)',
        '2xl':'var(--blur-2xl)',
        '3xl':'var(--blur-3xl)',
      },

      // ── Z-Index ────────────────────────────────────────────────────────────
      zIndex: {
        below:    'var(--z-below)',
        base:     'var(--z-base)',
        raised:   'var(--z-raised)',
        dropdown: 'var(--z-dropdown)',
        sticky:   'var(--z-sticky)',
        overlay:  'var(--z-overlay)',
        modal:    'var(--z-modal)',
        toast:    'var(--z-toast)',
        tooltip:  'var(--z-tooltip)',
        max:      'var(--z-max)',
      },

      // ── Max Width / Containers ─────────────────────────────────────────────
      maxWidth: {
        'container-xs':  'var(--container-xs)',
        'container-sm':  'var(--container-sm)',
        'container-md':  'var(--container-md)',
        'container-lg':  'var(--container-lg)',
        'container-xl':  'var(--container-xl)',
        'container-2xl': 'var(--container-2xl)',
      },

      // ── Height: Navigation / UI Chrome ────────────────────────────────────
      height: {
        'nav':             'var(--nav-height)',
        'header':          'var(--header-height)',
        'header-compact':  'var(--header-height-compact)',
        'sidebar':         'var(--sidebar-width)',
        'input-sm':        'var(--input-height-sm)',
        'input-md':        'var(--input-height-md)',
        'input-lg':        'var(--input-height-lg)',
        'button-sm':       'var(--button-height-sm)',
        'button-md':       'var(--button-height-md)',
        'button-lg':       'var(--button-height-lg)',
      },

      // ── Width ──────────────────────────────────────────────────────────────
      width: {
        'sidebar':           'var(--sidebar-width)',
        'sidebar-collapsed': 'var(--sidebar-collapsed-width)',
      },
    },
  },

  plugins: [],
};
