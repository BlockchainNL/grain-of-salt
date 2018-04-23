# Grain of Salt

This project is an attempt to combat the spread of fake news articles on social networks and encouraging people to take information with a grain of salt. The project is a clone of Reddit and uses the Reddit API to fetch post data. Scores are assigned to each post based on the credibility of the user. This score is then updated by a smart contract which also receives any new posts made by the user.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)
* [Ganache](http://truffleframework.com/ganache/)

## Installation

* Clone this repository
  * `git clone git@github.com:BlockchainNL/grain-of-salt.git` or
  * `git clone https://github.com/BlockchainNL/grain-of-salt.git`
* `cd grain-of-salt`
* `npm install`

## Running / Development

* `ganache-cli`
* Open a new terminal and in the project root run `truffle compile && truffle migrate --reset`
* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
