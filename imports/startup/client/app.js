import React from "react";
import ReactDOM from "react-dom";

export default App=(props)=>{


    return (<h1>Helllo</h1>);
}

Meteor.startup(()=>{
    ReactDOM.render(<App />,document.querySelector(".render-target"));
});