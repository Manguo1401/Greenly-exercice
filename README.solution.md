# Steps for the exercise 

## Intall Typescript for types

- Install typescript to ensure type security 

## Create all jest unit tests

- Check with Jest that all the cases given in the exercise are ok and secure code modification when the main method will be refactored

## Refactor method

- The store class is a if/else mess. It needs to be split into comprehensible small methods or functions (Keep It Simple Stupid)
- I kept in mind that client names directly hard coded isn't a good practice so I mapped them with offers that I created. This would able to push this mapping in a DB and dynamically update the client offers or add new clients with an existing offer. I also personalised the discount steps and more to be able to personalise a new offer depending on a numeric value. 

## Add new tests and comply to them by integrating the new code

- Add new tests to prepare for the evolutions asked by the exercise
- With the offerMapping we just need to add BackMarket as a client in the offerMapping and the job is done.

## Upgrades

- The offersMapping should be pushed in a DB and loaded async
- The testing suite should be adapted to the offers and not the clients
- The testing suite should be updated in for loops to be sure to catch all cases depending on a number of days