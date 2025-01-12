# Assignment 0

## Notes

This assignment was coded using typescript, which the professor said was fine in lecture.

`asg0.js` => `asg0.ts`

`asg0.html` => `index.html`: This is to allow Vite an entrypoint.

## Vite Setup

`pnpm create vite as0 -- --template vanilla-ts`

choose vanilla, typescript options

## Tailwindcss setup

`pnpm add -D tailwindcss postcss autoprefixer`
`pnpm dlx tailwindcss init -p`

add content target specification for tailwind in `tailwind.config.js`

`"./index.html"`

and other sources.
