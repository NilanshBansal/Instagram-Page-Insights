import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";

Meteor.methods({
    "get_page_id"(longToken) {
        let baseURL = "https://graph.facebook.com/v2.12/";
        let pagePath = "me/accounts?";
        let apiURL = `${baseURL}${pagePath}access_token=${longToken}`;
        let res = HTTP.call("get", apiURL);
        return res;
    },
    "get_insta_business_id"(fbPageId,token){
        let baseURL = "https://graph.facebook.com/v2.12/";
        let pagePath=`?fields=instagram_business_account`;
        let apiURL=`${baseURL}${fbPageId}${pagePath}&access_token=${token}`;
        let res=HTTP.call("get",apiURL);
        return res;
    },

    "get_page_insights"(pageName, token) {
        let baseURL = "https://graph.facebook.com/v2.12/";
        let pagePath=`?fields=business_discovery.username(${pageName}){followers_count,media_count,media{comments_count,comment,like_count,timestamp,caption}}`
        let instaBusinessID;
        try {
            let res = Meteor.call("get_page_id", token);
            if(res.data && res.data.data && res.data.data[0] ){
            let fbPageId=res.data.data[0].id;
            try{
                let response=Meteor.call("get_insta_business_id",fbPageId,token);
                if(response && response.data && response.data.instagram_business_account)
                    instaBusinessID=response.data.instagram_business_account.id;
            } 
            catch(error){
                throw new Meteor.Error("error");
            
            }
            let apiURL=`${baseURL}${instaBusinessID}${pagePath}&access_token=${token}`;
                let result= HTTP.call("get",apiURL);

                return result;
            }
            
        }
        catch (err) {
             throw new Meteor.Error(err.response.data.error.error_user_msg);
        }
    }
})