// app/controllers/r.js
import Ember from 'ember';
var denominator = 100;

let gosInstance;

function perc2color(perc) {
    var r, g, b = 0;
    if(perc < 50) {
        r = 255;
        g = Math.round(5.1 * perc);
    }
    else {
        g = 255;
        r = Math.round(510 - 5.10 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
}

function contractArtifactPromise(){
    return  new Ember.RSVP.Promise(function(resolve, reject){
          // succeed
            $.getJSON('/assets/GrainOfSalt.json', function(artifact) {
                 resolve(artifact);
            });
          
          // or reject
        
        });

}

export default Ember.Controller.extend({  
    users:Ember.A(),
    posts:Ember.A(),
    initContract:function(){

        // const GrainOfSaltContract = Ember.$.getJSON('GrainOfSalt.json');
        // $.getJSON('GrainOfSalt.json');
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

        // const contract = require('npm:truffle-contract');
        // const GrainOfSaltContract = 
        // $.getJSON('/assets/GrainOfSalt.json', function(data) {
        //     console.log(data);
        //     return data;
        // });

        contractArtifactPromise().then(function(data) {
            console.log(data);
            const gosContract = contract(data);
            gosContract.setProvider(web3.currentprovider);
            // console.log(gosContract);
            gosContract.deployed().then(function(instance) {
                // console.log("got here")
                gosInstance = instance;
                // console.log(gosInstance);
            }); 
        });
    },
    getUserScore:function(user){
        var blockscore = this.getBlockScore(user.get("name"));
        var expire = 1*60*60*1000; // 1 hour;
        if(blockscore.postscount < user.get("postscount") || blockscore.datetime < (Date.now()-expire) ){
            var score = this.calculateUserScore(user);
            this.writeToBlock(score);
            return score;
        }else{
            return blockscore;
        }
    },
    calculateUserScore:function(user){
        var score= user.get("karma");
        var postscount = Math.floor((Math.random() * 10) + 1);
        var datetime = Date.now();
        return Ember.Object.create({
            score:score,
            postscount:postscount,
            datetime
        })
    },
    writeToBlock(score){
        // gosInstance.updateScore(score);
    },
    getBlockScore:function(username){
        var score= Math.floor((Math.random() * 100) + 1);
        var postscount = Math.floor((Math.random() * 10) + 1);
        var datetime = Date.now();

        // var _score = gosInstance.scoreOf(username);
        return Ember.Object.create({
            score:score,
            // score:_score,
            postscount:postscount,
            datetime
        });
    },
    addUser:function(obj){
        var existingUser = this.getUser(obj.get("id"));
        if(Ember.isEmpty(existingUser)){
            obj.set("blockscore", this.getUserScore(obj));
            var score = obj.get("blockscore.score");
            var percent = 1 - (score/denominator)
            percent= percent*100;
            var color=perc2color(percent);
            obj.set("color", color)
            this.get("users").addObject(obj);
            // gosInstance.addUser(existingUser);
        }
    },
    addPost:function(obj){
        if(!Ember.isEmpty(obj)){
            var existingPost = this.getPost(obj.get("id"));
            if(Ember.isEmpty(existingPost)){
                this.get("posts").addObject(obj);
                // gosInstance.addPost(existingPost);
            }    
        }else{
            var x = 3;
        }
        
    },
    // addUserToPost:function(post){
    //     var users = this.get("users");
    //     for(var i = 0; i < users; i++){
    //         var user = users[i];
    //         if(user.name === post.name){
    //             post.user=user;
    //             return;
    //         }
    //     }
    //     return null;
    // },
    getUser:function(id){
        // gosInstance.users(this.getObj(id,"user"));
        return this.getObj(id,"user");
    },
    getPost:function(id){
        // gosInstance.getPosts(this.getObj(id,"post"));
        return this.getObj(id,"post");
    },
    getObj:function(id,type){
        var objs = this.get(type+"s");
        for(var i = 0; i < objs.length; i++){
            var obj = objs[i];
            if(obj.get("id") === id){
                return obj;
            }
        }
        return null;
    },

    // postsRows: function() {
    //     let model = this.get('model');

    //     if(!Ember.isEmpty(model)){
    //         let c = model.data.children;
    //         c.forEach(function(item){
    //             if(!Ember.isEmpty(item.data)){


    //                 let newURL = item.data.url.replace(/^http:\/\//i, 'https://');
    //                 let thumbURL = item.data.thumbnail.replace(/^http:\/\//i, 'https://');
    //                 Ember.set(item,'data.url',newURL);
    //                 Ember.set(item,'data.thumbnail',thumbURL);
    //                 if(item.data.thumbnail === 'nsfw' || Ember.isEmpty(item.data.thumbnail)){
    //                     Ember.set(item,"data.thumbnail",'https://farm3.staticflickr.com/2571/3810679130_fbb7494d7b_t.jpg');
    //                 }
    //             }
    //         });
        
    //     return c;
    //     }
    // }.property('posts.[],posts.@each.user.name')
});