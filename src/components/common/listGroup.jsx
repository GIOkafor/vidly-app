import React from 'react';

const ListGroup = ({ items, selectedItem, onItemSelect, textProperty, valueProperty }) => {
    return ( 
        <ul className="list-group">
            {items.map(item => (
                <li className={selectedItem === item ? "clickable list-group-item active" : "clickable list-group-item"} key={item[textProperty]} onClick={() => onItemSelect(item)}>
                    {item[textProperty]}
                </li>
            ))}
        </ul>
    );
}

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
}
 
export default ListGroup;