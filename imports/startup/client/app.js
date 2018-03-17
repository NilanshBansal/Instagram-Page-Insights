import React from "react";
import ReactDOM from "react-dom";
import SearchBar from "../../ui/SearchBar";

export default App=(props)=>{


    return (<div><SearchBar /></div>);
}

Meteor.startup(()=>{
    ReactDOM.render(<App />,document.querySelector(".render-target"));
});