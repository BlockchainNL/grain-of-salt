// app/controllers/r.js
import Ember from 'ember';
var denominator = 100;

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

export default Ember.Controller.extend({  
    users:Ember.A(),
    posts:Ember.A(),
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

    },
    getBlockScore:function(username){
        var score= Math.floor((Math.random() * 100) + 1);
        var postscount = Math.floor((Math.random() * 10) + 1);
        var datetime = Date.now();
        return Ember.Object.create({
            score:score,
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

        }
    },
    addPost:function(obj){
        if(!Ember.isEmpty(obj)){
            var existingPost = this.getPost(obj.get("id"));
            if(Ember.isEmpty(existingPost)){
                this.get("posts").addObject(obj);
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
        return this.getObj(id,"user");
    },
    getPost:function(id){
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