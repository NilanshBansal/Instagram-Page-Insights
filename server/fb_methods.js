import {Meteor} from "meteor/meteor";
import {HTTP} from "meteor/http";

Meteor.methods({
    "get_fb_long_token"(shortToken){
        let baseURL = "https://graph.facebook.com/v2.12/";
        let path = "oauth/access_token?grant_type=fb_exchange_token";
        let clientId = "412393089214942";
        let clientSecret = "0f14b1daee416bb81d5c82a4b003007d";
        let apiURL = `${baseURL}${path}&client_id=${clientId}&client_secret=${clientSecret}&fb_exchange_token=${shortToken}`;
        let res = HTTP.call("get", apiURL);
        console.log("res : ", res);
        return res;
    },
   /*  "get_pages"(pageName,longToken){
        let baseURL = "https://graph.facebook.com/v2.12/search?";
        let type="page";
        let clientId = "412393089214942";
        let fields="cover,name,picture,fan_count,rating_count,overall_star_rating";
        let clientSecret = "0f14b1daee416bb81d5c82a4b003007d";
        let apiURL = `${baseURL}type=${type}&q=${pageName}&client_id=${clientId}&client_secret=${clientSecret}&oauth_token=${longToken}&fields=${fields}`;
        let res = HTTP.call("get", apiURL);
        console.log("res : ", res);
        return res;
    } */
})