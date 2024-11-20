# Demystifying React Server Components

The presentation and demos for my talk discussing React Server Components. First given at [Connect Tech 2024](https://2024.connect.tech/).

- [Presentation](https://www.canva.com/design/DAGWbKc28Ow/gkHLrNOpB_CR04hhYOna3Q/view?utm_content=DAGWbKc28Ow&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h42473eb976)
- [PHP SSR Demo](https://codesandbox.io/p/devbox/php-ssr-demo-z8mxry)
- [React SPA Demo](https://codesandbox.io/p/sandbox/spa-demo-9vmvh2)
- [Next.js SSR Pages Demo](https://codesandbox.io/p/devbox/next-js-pages-example-mtxk5v)

## Getting Started

1. Clone the repo
2. `pnpm install`
3. `pnpm run dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Paginated Products Page

This uses pure server components to demonstrate pagination.

## Infinite Scroll Products Page

This uses RSC for the main loading but we have a simple client component to handle the intersection observer.

## Contact Us Page

This demonstrates server actions and form validation.

## Database

There is no database. All the data is statically generated and I'm simulating the database using delays. This does not demonstrate how to use the Fetch API cache but that's intentional!
