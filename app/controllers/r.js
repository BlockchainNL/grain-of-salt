// app/controllers/r.js
import Ember from 'ember';

export default Ember.Controller.extend({  
    pictures: function() {
        let model = this.get('model');
        let c = model.data.children.filterBy('data.domain','i.imgur.com');
        c.forEach(function(item){
            let newURL = item.data.url.replace(/^http:\/\//i, 'https://');
            let thumbURL = item.data.thumbnail.replace(/^http:\/\//i, 'https://');
            Ember.set(item,'data.url',newURL);
            Ember.set(item,'data.thumbnail',thumbURL);
            if(item.data.thumbnail === 'nsfw'){
                Ember.set(item,"data.thumbnail",'https://farm3.staticflickr.com/2571/3810679130_fbb7494d7b_t.jpg');
            }
        });
    return c;
    }.property('model.data.children.[]'),
    posts: function() {
        let model = this.get('model');
        let c = model.data.children;
        c.forEach(function(item){
            let newURL = item.data.url.replace(/^http:\/\//i, 'https://');
            let thumbURL = item.data.thumbnail.replace(/^http:\/\//i, 'https://');
            Ember.set(item,'data.url',newURL);
            Ember.set(item,'data.thumbnail',thumbURL);
            if(item.data.thumbnail === 'nsfw' || Ember.isEmpty(item.data.thumbnail)){
                Ember.set(item,"data.thumbnail",'https://farm3.staticflickr.com/2571/3810679130_fbb7494d7b_t.jpg');
            }
        });
    return c;
    }.property('model.data.children.[]')
});