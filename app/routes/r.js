/* web3 */
import Ember from 'ember';

// import Web3 from 'ember-web3/index.js';

export default Ember.Route.extend({  
    // web3: Ember.inject.service(),

    model: function(params){
        return Ember.$.getJSON(`https://www.reddit.com/r/${params.subreddit}.json`);
    },
     setupController: function(controller, model) {
         controller.set('model', model);
         var coinbase = web3.eth.coinbase;
         var originalBalance = web3.eth.getBalance(coinbase).toNumber();
         controller.set("coinbase",coinbase);
         controller.set("originalBalance",originalBalance);
         
         web3.eth.filter('latest').watch(function() {
             var currentBalance = web3.eth.getBalance(coinbase).toNumber();
             controller.set("currentBalance",currentBalance);
         });    
    },
    afterModel: function(r){
        r.subreddit = r.data.children[0].data.subreddit || '';
    }
});