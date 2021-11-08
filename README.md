# Reef-Lambda-Payments
Unofficial Serverless Payment API for the Reef blockchain. This repo was set-up as part of the Gitcoin Defi Hackathon.

> ### AWS DynamoDB + Lambda codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) spec and API.

This codebase contains code written for the below hackathon bounty.
https://gitcoin.co/issue/reef-defi/reef-finance-bounties/1/100026837

### There are 3 repos that contain relevant code.
Storefront - https://github.com/rtre84/reef-payments-store  
Products service - https://github.com/rtre84/reef-products-service  
AWS Lambda Payment API - https://github.com/rtre84/reef-lambda-payments   

### To run the demo locally:  
Git clone ```https://github.com/rtre84/reef-payments-store```  
Run ```yarn install```  
Run ```yarn dev```  

**NOTE:**
The Polkadot / Reef finance specific code isn't completely functional in it's current
state. All code is deployable and accessible locally. Unresolved bugs in the product and 
lambda service blocked the service from working end to end correctly.

Storefront Demo: https://eager-jang-5dfc4d.netlify.app/  
Product Service: https://reef-frontend-product-service.herokuapp.com/health  
Lambda API Gateway Service: https://1qnnysgv5d.execute-api.us-east-1.amazonaws.com/dev/   

# Getting started

*Requires Node 8 or higher*

Clone this repo, and cd into it:
```
git clone https://github.com/rtre84/reef-lambda-payments
cd reef-lambda-payments
```

## Starting the local server

```
npm install
npm run start
```

This should start local DynamoDB emulator and Serverless offline. You can now make API calls against `http://localhost:3000/api` like this:

```
curl http://localhost:3000/api/articles

Serverless: GET /api/articles (λ: listArticles)
Serverless: The first request might take a few extra seconds
Serverless: [200] {"statusCode":200,"headers":{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":true},"body":"{\"articles\":[]}"}
```

## Running tests locally
```
npm test
```
See sample test run [log](https://travis-ci.org/anishkny/realworld-dynamodb-lambda) and [network traffic](https://anishkny.github.io/realworld-dynamodb-lambda/test-output/network.html).

## API
The API is described in the [`serverless.yml`](serverless.yml) file. 

## Storage
For storage, [AWS DynamoDB](https://aws.amazon.com/dynamodb/) a managed serverless NoSQL database is used. 

## Deployment
To deploy the code to AWS, simply execute:
```
npm run deploy
```
This will use `serverless` to deploy the API as described in `serverless.yml`.

Once deployed, you can test the deployed API by executing:
```
npm run test:deployed
```
