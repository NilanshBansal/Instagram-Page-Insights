import React, { Component } from "react";

export default class Tagged extends Component {
    constructor(props) {
        super(props);
        this.getTaggedPosts = this.getTaggedPosts.bind(this);
    }
    getTaggedPosts() {
        let token = localStorage.getItem('token');
        if (token) {
            Meteor.call("get_tagged_posts", token, (err, res) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("response: ", res);
                }
            });
        }

        else {
            throw new Meteor.Error("User not logged in !")
        }
    }
    render() {
        return (<div><button className="btn btn-warning btn-lg" onClick={this.getTaggedPosts}>Show Tagged Posts</button></div>)
    }
}