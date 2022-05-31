# fruit-cart-api

## About

This api was built using Node.js, Express, and TypeScript. There is one endpoint through which you can post data (the amount of each fruit you wish to add to your cart) and it returns the total costs, taxes, and discounts.

The logic for the cost calculations can be found in src > services > CartService.ts
I created a decorator for the CartController. Right now, there is only a `POST` decorator but if I were to expand the api I'd adjust the decorator to work for all methods.

There's also a `Dockerfile` and `docker-compose.yml` to get the api running in a container.

I used Jest (for TypeScript) to write a few tests. `npm run test` to run through the tests.

## How to use the api

This api has been deployed to heroku: https://enigmatic-hollows-14194.herokuapp.com/

To run locally, use `npm run start:dev`
To start it in a container, use `docker-compose up`

To test it out, once it's running locally, run the following command - try out different amounts of each fruit!:

```
curl --location --request POST 'http://localhost:3000/cart' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'apple=2' \
--data-urlencode 'pineapple=1' \
--data-urlencode 'strawberry=1' \
--data-urlencode 'orange=1'
```

Or use Postman, HTTPie, etc. :)

## Frontend

You can also test the api out through a simple little frontend I created:

https://main--mellifluous-cucurucho-d51433.netlify.app/

https://github.com/bishoprm/fruit-cart-frontend
