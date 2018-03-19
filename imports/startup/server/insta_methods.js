import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";

Meteor.methods({

    "get_insta_business_id"(token) {
        let baseURL = "https://graph.facebook.com/v2.12/";
        let pagePath = `me/accounts?fields=instagram_business_account`;
        let apiURL = `${baseURL}${pagePath}&access_token=${token}`;
        let res = HTTP.call("get", apiURL);

        return res;
    },

    "get_page_insights"(pageName, token) {
        let limitResults=25;
        let baseURL = "https://graph.facebook.com/v2.12/";
        let pagePath = `?fields=business_discovery.username(${pageName}){followers_count,media_count,media.limit(${limitResults}){comments_count,comment,like_count,timestamp,caption}}`
        let instaBusinessID;

        try {
            let response = Meteor.call("get_insta_business_id", token);

            if (response.data && response.data.data) {
                response.data.data.forEach(eachAccount => {
                    if (eachAccount.instagram_business_account) {
                        instaBusinessID = eachAccount.instagram_business_account.id;
                    }
                });
                try {
                    let apiURL = `${baseURL}${instaBusinessID}${pagePath}&access_token=${token}`;
                    let result = HTTP.call("get", apiURL);

                    return result;
                }
                catch (err) {
                    throw new Meteor.Error(error.response.data.error.message);
                }
            }
        }
        catch (error) {
            throw new Meteor.Error(error.response.data.error.message);

        }

    }


})
