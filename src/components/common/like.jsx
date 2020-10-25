import React, { Component } from 'react';

const Like = (props) => {
    let classes = "fa fa-lg fa-heart";
    if(!props.liked) classes += "-o";

    return ( 
        <div>
            <i onClick={() => props.onClick()} className={classes} style={{ cursor: "pointer" }}></i>
        </div>
    );
}
 
export default Like;