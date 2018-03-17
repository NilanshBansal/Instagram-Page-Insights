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
        let token=localStorage.getItem('token');
        Meteor.call("get_page_insights",this.state.search,token,(err,res)=>{
            if(err){
                console.log("err: ",err);
            }
            else{
                console.log("res: ",res);
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