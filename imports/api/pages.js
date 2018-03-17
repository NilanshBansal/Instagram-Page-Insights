import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";

export const Pages=new Mongo.Collection('Pages');

Meteor.methods({
    "Pages.insert"(searchQuery,pagesList){
        return Pages.insert({
            searchQuery,
            data:pagesList
        });
    }   
})