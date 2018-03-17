import React,{Component} from "react";


export default class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state={search:""};
        this.onChange=this.onChange.bind(this);
        this.getPageDetails=this.getPageDetails.bind(this);
    }

    onChange(event){
        this.setState({search:event.target.value});
        console.log(this.state.search);
    }
    getPageDetails(){
        console.log(this.state.search);
        Meteor.call("get_insta_id",(err,res)=>{
            if(err){console.log(err);}
            else{
                let accountId=res.data.instagram_business_account.id;
                console.log(accountId);
                Meteor.call("get_page_details",this.state.search,accountId,(error,response)=>{
                    if(error){console.log(error);}
                    else{
                        console.log(response);
                    }
                })
            }
        })
    }
    render(){
        return ( 
        <div className="container"><br />
        <label>SEARCH</label>
        <input type="text" className="form-control" value={this.state.search} placeholder="search string" onChange={this.onChange}/>
        <button className="btn btn-primary btn-lg" onClick={this.getPageDetails}>Search</button>
        {/* <List data={this.state.data}/> */}
        </div>

        );
    }
}