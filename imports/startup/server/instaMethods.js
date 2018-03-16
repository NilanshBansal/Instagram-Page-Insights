import {Meteor} from "meteor/meteor";
import {HTTP} from "meteor/http";
let access_token='EAACEdEose0cBAAc9cU2YHpNE9MxRxAfVcQpiClUsS3tIywaK80LVF6T0qxwxeSXhdU63kJmkbmxgAZA4oAG38oIkym7V7NIG2UC7eq6BCxpabmzb4NzZAWMdahH6dcjaJj3Cavp4ZCMZCNfd6tzIrheKdnIM23SlxPAqTZBeRWSRbVDuNxXf8bJBVHRMi2JyjFEt0zhMg1gZDZD';
Meteor.methods({
    "get_insta_id"(){
        let baseURL = "https://graph.facebook.com/v2.12/";
        let path='me?fields=instagram_business_account';
        let url=`${baseURL}${path}&oauth_token=${access_token}`
        let res=HTTP.call("get",url);
        return res.instagram_business_account;
    },
    
    
    
    "get_page_details"(pageName,instaId){
        let baseURL = "https://graph.facebook.com/v2.12/";
        let apiURL = `${baseURL}${instaId}?fields=business_discovery.username(${pageName}){followers_count,media_count,media{comments_count,comment,like_count,timestamp,caption}}&oauth_token=${access_token}`;
        let res = HTTP.call("get", apiURL);
        console.log("res : ", res);
        return res;
    }
})