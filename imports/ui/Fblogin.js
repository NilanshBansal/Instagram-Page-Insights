import React, { Component } from "react";

export default class Fblogin extends Component {
    constructor(props) {
        super(props);
        
    }
    login() {

        window.FB.login(function (response) {

            console.log(response);
            if (response.authResponse) {
                this.setState({ userID: response.authResponse.userID});
                console.log('Welcome!  Fetching your information.... ');
                this.getLongToken(response.authResponse.accessToken);
                window.localStorage.setItem('userID',response.authResponse.userID);
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }.bind(this), {
                scope: 'manage_pages, read_insights,instagram_basic,instagram_manage_insights,instagram_manage_comments',
                return_scopes: true
            });
    }

    getLongToken(shortToken) {
        Meteor.call("get_fb_long_token", shortToken, (err, res) => {
            if (err) {
                console.log("err : ", err);
            }
            else {
                console.log("res : ", res);
                this.setState({token: res.data.access_token });
                window.localStorage.setItem('token',res.data.access_token);
                //  this.saveUserToken(res.data.access_token );
            }
        })
    }

    
    logout() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userID');
        this.setState({token:null,userID:null});
        window.FB.logout(function (response) {
            console.log("Successfully logged out!");
            
        }.bind(this));
    }

    render() {
        return (
            <div>
                <button className="btn btn-lg btn-primary" onClick={this.login.bind(this)}>FB Login</button>
                <button className="btn btn-lg btn-danger" onClick={this.logout.bind(this)}>FB Logout</button>
            </div>
        )
    };

}