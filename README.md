# add graphql

yarn add @apollo/client graphql

# make apolloClient available to the REST

yarn add graphql-anywhere apollo-link-rest

`import { RestLink } from "apollo-link-rest";`
`import { HttpLink } from "apollo-link-http";`
HttpLink handles requests to your graphQL endpoint
RestLink handles requests to one or more REST endpoints
# react-graphql
