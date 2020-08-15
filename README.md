# Relay TypeScript Next SSG

A sample project where I try various thing in Relay with Next and SSG, with TypeScript
types checking whenever I can. Trying **Incremental Site Generation** with Relay,
to allow using dynamic content but still have the benefits of static websites.

Also testing relay store as a client store, with some internal directives in
relay like `@__clientField`, very useful to have client-side fields (similar to
[Type Policies](https://www.apollographql.com/docs/react/caching/cache-field-behavior/) in Apollo)

## Starter

This project uses my starter https://github.com/Liinkiing/next-ts-graphql-relay-starter, feel
free to use it!

## Useful links

- https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
- https://mrtnzlml.com/docs/relay
- https://medium.com/@matt.krick/replacing-redux-with-relay-47ed085bfafe
- https://babangsund.com/relay_local_state_management/
- https://relay.dev/docs/en/next/local-state-management
