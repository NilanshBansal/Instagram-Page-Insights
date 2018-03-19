import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";

export const Pages=new Mongo.Collection('Pages');

Meteor.methods({
    "Pages.insert"(searchQuery,pageInsights){
        return Pages.insert({
            searchQuery,
            followers_count:pageInsights.business_discovery.followers_count,
            media_count:pageInsights.business_discovery.media_count,
            data:pageInsights.business_discovery.media.data
        });
    }   
})