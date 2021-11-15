import React from 'react'
import { numberWithDot } from '../utils/formatNumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckSquare, faTimesCircle);

const MenusComponent = ({menu, addToBasket}) => {
    let readyIcon;
    if (menu.is_ready === true) {
      readyIcon = <FontAwesomeIcon icon={faCheckSquare} className="text-success" />;
    } else {
      readyIcon = <FontAwesomeIcon icon={faTimesCircle} className="text-muted" />;
    }

    return (
        <div className="content mx-2 my-3">
            <div className="top-div">
                <div className="image"> 
                    <img src={"assets/img/"+menu.image} alt={menu.image} /> 
                </div> 
                <span>Rp. {numberWithDot(menu.price)}</span>
            </div>
            <div className="bottom-div">
                <h3>{menu.name}</h3>
                {readyIcon}
            </div>
            <div className="last-section">
                <div className="buttons"> <button onClick={() => addToBasket(menu)}>+ keranjang</button> </div>
            </div>
        </div>
    )
}

export default MenusComponent
