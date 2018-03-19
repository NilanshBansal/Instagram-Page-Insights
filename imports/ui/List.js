import React from "react";
let moment=require('moment');

export default List=(props)=>{
    let data=props.data ;

    const renderListItems=(data)=>{
        if(data && data.data){
            return data.data.map((e,i)=>{
                return  <tr key={i}><td>{i+1}</td><td>{e.caption}</td><td>{e.comments_count}</td><td>{e.like_count}</td><td>{moment(e.timestamp).fromNow()}</td></tr>
            })
        }
    }


    return (
        <div className="container">
        <h1>{data && data.searchQuery}</h1>
        <h1>Followers Count: {data && data.followers_count?data.followers_count:[]}</h1>
        <h1>Media Count: {data && data.media_count?data.media_count:[]}</h1>
        <table className="table table-bordered table-hover">
            <thead><tr><th>S.No</th><th>Caption</th><th>Comments</th><th>Likes</th><th>Created At</th></tr></thead>
            <tbody>{renderListItems(data)}</tbody>
        </table>    
        </div>
    );
}