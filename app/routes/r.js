/* globals web3 */
import Ember from 'ember';
// import GrainOfSaltContract from '../../build/contracts/GrainOfSalt.json';


// import Web3 from 'ember-web3/index.js';
const dataStore = window.localStorage;
// const clientID = '_rmWOCAnXKxWYg'; //IMPORTANT - THIS NEEDS TO BE YOUR CLIENT ID FROM YOUR APP
const clientID = '123iPsWHl3DFqw'; //IMPORTANT - THIS NEEDS TO BE YOUR CLIENT ID FROM YOUR APP


const subreddits = ['android'];

// let gosInstance;

function authenticateReddit(){

}


// const gosSourceCode = "../../contracts/GrainOfSalt.sol";

function init() {
 if (!dataStore.getItem('deviceID')) {
 dataStore.setItem('deviceID', getRandomID());
 console.log('Created new deivce ID');
 }
 //grabStories();

  /*const compiled = web3.eth.compile.solidity(gosSourceCode);
  const code = compiled.code;
  const abi = compiled.info.abiDefinition;*/

  // const abi = '[{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"bytes32"},{"indexed":false,"name":"post","type":"bytes32"}],"name":"AddedPost","type":"event"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"post","type":"bytes32"}],"name":"addPost","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"name","type":"bytes32"},{"indexed":false,"name":"score","type":"uint256"}],"name":"UpdatedScore","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"name","type":"bytes32"}],"name":"AddedUser","type":"event"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"}],"name":"addUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"score","type":"uint256"}],"name":"updateScore","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"name","type":"bytes32"}],"name":"getPosts","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"lastUpdated","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"scoreOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"users","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]';

  // let gosContract;

  // web3.eth.contract(abi).new({data: code}, function(err, contract) {
  // web3.eth.contract(abi).new(function(err, contract) {
  //   if(err) {
  //      console.log(err);
  //      return;
  //   } else if(contract.address) {
  //       gosContract = contract;
  //       console.log("address: "+gosContract.address);
  //       // controller.set("address",gosContract.address);
  //   }
  // });

  // const gosContract = new web3.eth.Contract(abi);
  // gosContract.deploy()
  //            .on('error', function(error) {console.log(error)})
  //            .then(function(instance) {console.log(instance.options.address)});

  // const contract = require('truffle-contract');
  // const gosContract = contract(GrainOfSaltContract);
  // gosContract.setProvider(web3.currentprovider);

  // gosContract.deployed().then(function(instance) {
  //   gosInstance = instance;
  // });
}

function getRandomID() {
 return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
 let r = Math.random() * 16 | 0,
 v = c == 'x' ? r : (r & 0x3 | 0x8);
 return v.toString(16);
 });
}

function grabStories() {
 if (!validToken()) {
 getAccessToken(function(){});
 } else {
 for (const i of subreddits) {
 query('r',i,'new', queryCallback);
 }
 }
}


function grabUser(username,callback) {
 if (!validToken()) {
 getAccessToken(function(
    ){
    grabUser(username,callback);
    });
 } else {
    query('user',username,'about', callback);
 
 }
}


function validToken() {
 if (!dataStore.getItem('accessToken')) {
 return false;
 }

 const currentDate = new Date();
 const expires = new Date(dataStore.getItem('expires'));
 const difference = (expires.getTime() - currentDate.getTime());
 const minutesDifference = Math.ceil(difference / (1000 * 60)); // minutes difference
 if (minutesDifference < 5) {
 return false;
 }

return true;
}


function getAccessToken(rerun) {
 $.ajax({
 type: 'post',
 url: 'https://www.reddit.com/api/v1/access_token',
 dataType: 'json',
 headers: {
 Authorization: `Basic ${btoa(`${clientID}:` + '')}`,
 },
 data: { grant_type: 'https://oauth.reddit.com/grants/installed_client', device_id: dataStore.getItem('deviceID') },
 success(data) {
     if (data.access_token) {
         dataStore.setItem('accessToken', data.access_token);
         dataStore.setItem('expires', new Date().addHours((data.expires_in) / 3600));
         rerun();
     }
 },
 error(err) {
 console.log(err);
 },
 });
}

Date.prototype.addHours = function (h) {

this.setTime(this.getTime() + (h*60*60*1000));

return this;

};

/**
 * Queries the reddit api for a specific subreddit
 * @param {* string - subrredit name} subreddit 
 * @param {*function - callback function} callback 
 */
function query(parm,val,subquery, callback) {
    if(Ember.isEmpty(subquery)){
        var url = `https://oauth.reddit.com/${parm}/${val}`;       
    }else{
        var url = `https://oauth.reddit.com/${parm}/${val}/${subquery}`;    
   }
 $.ajax({
 type: 'get',
 url,
 dataType: 'json',
 headers: {
 Authorization: `Bearer ${dataStore.getItem('accessToken')}`,
 },
 success(data) {
 callback(data);
 },
 error(err) {
 console.log(err);
 },
 });
}

/**
 * Write the data to page
 * @param {*} data - json object
 */
function queryCallback(data) {
 // const list = document.createElement('ul');
 // const posts = data.data.children;
 // posts.forEach((element) => {
 // const item = document.createElement('li');
 // item.innerHTML = element.data.title;
 // list.appendChild(item);
 // });
 // document.body.appendChild(list);
}

function redditPromise(parm,val){
    return  new Ember.RSVP.Promise(function(resolve, reject){
          // succeed
            $.getJSON('https://www.reddit.com/'+parm+'/'+val+'.json', function(fbResults) {
 
                 resolve(fbResults);
            });
          
          // or reject
        
        });

}
export default Ember.Route.extend({  
    // web3: Ember.inject.service(),

    model: function(params){
        init();
        

         
    },
     setupController: function(controller, model, obj) {
        redditPromise('r',obj.params.r.subreddit).then(function(r){
            controller.set("model",r);
            controller.initContract();
            r.subreddit = r.data.children[0].data.subreddit || '';
            var posts = controller.get("posts");
            var users = controller.get("users");
            var route = this;
            if(!Ember.isEmpty(r.data) && !Ember.isEmpty(r.data.children)){
                for(var i =0; i < r.data.children.length; i++){
                    if(!Ember.isEmpty(r.data.children[i].data)){
                        var post = r.data.children[i].data;

                        if(!Ember.isEmpty(post)){

                            var postObj = Ember.Object.create(post);

                            controller.addPost(postObj);
                            var username = post["author"];
                            
                            if(!Ember.isEmpty(username)){
                                var anonFunc = function(newPostObj){


                                    grabUser(username , function(res){
                                        if(!Ember.isEmpty(res.data)){
                                            var user = res.data;
                                            var userObj = Ember.Object.create(user);
                                             controller.addUser(userObj);
                                            newPostObj.set("user",userObj);
                                            // var controller = route.controller;
                                            // controller.get("users").addObject(user);
                                        }
                                    });
                                }
                                anonFunc(postObj);

                            }
                        } 
                    }
                    
                }    
            }

        });
  
    },

});
