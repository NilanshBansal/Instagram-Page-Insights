import {Meteor} from "meteor/meteor";
import {HTTP} from "meteor/http";
let access_token='EAACEdEose0cBANE7DRBYDoC6MCcPi2Yt5G5st0GRJWF5KLwqpMZA5HrzpWkrNClLMPY139wt5PlZCrLz764Ys4tKAo6eViyhWMgZCMocg7BBrJatwWwoqy5LAAZAVYfn6LKYbZBnunpWaFZBiT6zqVGfKVh4s9OOZAop1Aqqa16gJVEEP6DqsSR6AMQYMm6btIcyZAh03Q7tZAgZDZD';
Meteor.methods({
    "get_insta_id"(){
        let baseURL = "https://graph.facebook.com/v2.12/";
        let path='me?fields=instagram_business_account';
        let url=`${baseURL}${path}&oauth_token=${access_token}`
        console.log(url);
        let res=HTTP.call("get",url);
        return res;
    },
    
    
    
    "get_page_details"(pageName,instaId){
        let limitResults=100;
        let baseURL = "https://graph.facebook.com/v2.12/";
        let apiURL = `${baseURL}${instaId}?fields=business_discovery.username(${pageName}){followers_count,media_count,media.limit(${limitResults}){comments_count,comment,like_count,timestamp,caption}}&oauth_token=${access_token}`;
        let res = HTTP.call("get", apiURL);
        console.log("res : ", res);
        return res;
    }
})