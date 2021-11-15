import React, { Component } from 'react';
import { API_URL } from "../utils/constants";
import { numberWithDot } from '../utils/formatNumber';
import axios from 'axios';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

library.add(faThumbtack);

export default class Order extends Component {
    constructor(props){
        super(props);

        this.state = {
            orders: [],
            loading: null,
        }
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            axios.get(API_URL + "/orders")
            .then(res => {
                const index = res.data.length - 1;
                const orders = res.data[index];
                this.setState({ orders });
                this.setState({ loading: false });
            })
            .catch(error => {
                console.log(error);
            });
        })
    }

    render() {
        const menus = [];
        for (let i = 0; i < this.state.orders.total_menu; i++) {
            menus.push(this.state.orders.menus[i]);
        };
        const { orders } = this.state;
        return (
            <div className="card-order mt-50 mb-50 border">
                <div className="col d-flex">
                    <span className="text-muted" id="order-no">order #{orders.id}</span>
                </div>
                <div className="gap">
                    <div className="col-2 d-flex mx-auto">
                        <FontAwesomeIcon icon={faThumbtack} size="xs" />
                    </div>
                </div>
                <div className="order-title mx-auto"> Terimakasih telah memesan! </div>
                <div className="main"> 
                    <span id="sub-title">
                        <p>tunjukkan bukti pemesanan berikut apabila pesanan telah sampai, dan segera lakukan pembayaran. apabila telah selesai, klik "selesai".</p>
                    </span>
                {menus.map((mn) => (
                    <div className="row row-main" key={mn.id}>
                        <div className="col-3"> 
                            <img className="img-fluid" src={"assets/img/"+mn.menu.image} alt={mn.menu.image} /> 
                        </div>
                        <div className="col-6">
                            <div className="row d-flex">
                                <p><b>{mn.menu.name}</b></p>
                            </div>
                            <div className="row d-flex">
                                <p className="text-muted">X {mn.total}</p>
                            </div>
                        </div>
                        <div className="col-3 d-flex justify-content-end">
                            <p><b>Rp. {numberWithDot(mn.total_price)}</b></p>
                        </div>
                    </div>
                ))}
                    <div className="total-payment">
                        <div className="row mb-2">
                            <div className="col-4"> Notes: </div>
                            <div className="col-8 d-flex justify-content-end notes">{orders.notes}</div>
                        </div> 
                        <div className="row">
                            <div className="col-2"> <b> Total:</b> </div>
                            <div className="col-8 d-flex justify-content-end"> <b>Rp. {numberWithDot(parseInt(orders.total_payment))}</b> </div>
                        </div> 
                        <button className="btn-order d-flex mx-auto"> Selesai </button>
                    </div>
                </div>
            </div>
        )
    }
}
