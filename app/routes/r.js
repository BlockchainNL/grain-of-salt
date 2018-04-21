import Ember from 'ember';

export default Ember.Route.extend({  
    web3: Ember.inject.service(),

    model: function(params){
        return Ember.$.getJSON(`https://www.reddit.com/r/${params.subreddit}.json`);
    },
    setupController: function(controller, model) {
        // let provider = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
        // let web3Instance = this.get('web3').setup(provider);
        try {
            let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
            web3.eth.getAccounts(function(accounts) {
                console.log(accounts);
            });
        } catch(e) {
            console.log(e);
        }
    },
    afterModel: function(r){
        r.subreddit = r.data.children[0].data.subreddit || '';
    }
});