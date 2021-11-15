import React from 'react';
import { numberWithDot } from '../utils/formatNumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faMinus, faTrash);

const BasketComponent = ({basket, addToBasket, subtractMenu, deleteBasket}) => {
    return (
        <div>
            <div className="middle-container pt-4 d-flex align-items-center">
                <div>
                    <img src={"assets/img/"+basket.menu.image} className="img-fluid" width="100" alt={basket.menu.image} />
                </div>
                <div className="d-flex flex-column"> 
                    <div className="d-flex align-items-center justify-content-between">
                    <span className="item-name pr-3">{basket.menu.name}</span> 
                    <FontAwesomeIcon icon={faTrash} className="text-danger cursor-pointer" size="xs" onClick={() => deleteBasket(basket.id)} />
                    </div>
                    <span className="item-quantity d-flex justify-content-between align-items-center mt-2">
                        <div className="round-total">
                            <FontAwesomeIcon icon={faMinus} className="plus-minus" onClick={() => subtractMenu(basket)} />
                        </div>
                        {basket.total}
                        <div className="round-total">
                            <FontAwesomeIcon icon={faPlus} className="plus-minus" onClick={() => addToBasket(basket.menu)} />
                        </div>
                    </span>
                    <div className="item-price-container mt-3">
                        <span className="item-price">
                        <span className="rupiah">Rp. </span>{numberWithDot(basket.total_price)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasketComponent
