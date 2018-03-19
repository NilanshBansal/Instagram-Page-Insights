import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import List from "./List";

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { search: "" };
        this.onChange = this.onChange.bind(this);
        this.getPageDetails = this.getPageDetails.bind(this);
    }

    onChange(event) {
        this.setState({ search: event.target.value });
        console.log(this.state.search);
    }
    getPageDetails() {
        let token = localStorage.getItem('token');
        if (token) {
            Meteor.call("Pages.find", this.state.search, (errorFound, result) => {
                if (errorFound) {
                    console.log(errorFound);
                }
                if (result) {
                    console.log("result from db: ", result);
                    this.setState({data:result});
                }
                else {
                    Meteor.call("get_page_insights", this.state.search, token, (err, res) => {
                        if (err) {
                            console.log("err: ", err);
                        }
                        else {
                            console.log("res: ", res);
                            Meteor.call("Pages.insert", this.state.search, res.data, (error, response) => {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    console.log(response);
                                    this.setState({data:response});
                                }
                            })
                        }
                    })
                }
            })
        }
        else {
            throw new Meteor.Error("User not logged in !")
        }

    }

    render() {
        return (
            <div className="container"><br />
                <label>SEARCH</label>
                <input type="text" className="form-control" value={this.state.search} placeholder="search string" onChange={this.onChange} />
                <button className="btn btn-primary btn-lg" onClick={this.getPageDetails}>Search</button>
                <List data={this.state.data}/>
            </div>

        );
    }
}