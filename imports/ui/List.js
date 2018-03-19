import React from "react";
let moment=require('moment');

export default List=(props)=>{
    let data=props.data ;

    const renderListItems=(data)=>{
        if(data && data.data){
            return data.data.map((e,i)=>{
                return  <tr key={i}><td>{e.caption}</td><td>{e.comments_count}</td><td>{e.like_count}</td><td>{moment(e.timestamp).format('DD-MM-YYYY')}</td></tr>
            })
        }
    }


    return (
        <div className="container">
        <h1>Search Query: {data && data.searchQuery}</h1>
        <h1>Followers Count: {data && data.followers_count?data.followers_count:[]}</h1>
        <h1>Media Count: {data && data.media_count?data.media_count:[]}</h1>
        <table className="table table-bordered table-hover">
            <thead><tr><th>Caption</th><th>Comments Count</th><th>Likes Count</th><th>Created At</th></tr></thead>
            <tbody>{renderListItems(data)}</tbody>
        </table>    
        </div>
    );
}