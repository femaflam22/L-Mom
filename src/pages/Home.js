import React, { Component } from 'react';
import { SidebarComponent, MenusComponent, BasketComponent } from '../components';
import { Row, Col, Form } from 'react-bootstrap';
import { API_URL } from "../utils/constants";
import { numberWithDot } from '../utils/formatNumber';
import axios from 'axios';
import swal from 'sweetalert';
import LoadingComponent from '../components/LoadingComponent'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

library.add(faShoppingCart);

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      baskets: [],
      nameCategory: "",
      loading: null,
      noteValue: "",
      total_payment: null,
    }
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      axios.get(API_URL + "/menus")
        .then(res => {
          const menus = res.data;
          this.setState({ menus });
          this.setState({ loading: false });
        })
        .catch(error => {
          console.log(error);
        });
    });

    this.getBasket();
  }

  getBasket = () => {
    this.setState({ loading: true }, () => {
      axios.get(API_URL + "/baskets")
        .then(res => {
          const baskets = res.data;
          this.setState({ baskets });
          this.setState({ loading: false });
        })
        .catch(error => {
          console.log(error);
        });
    })
  }
  
  changeCategory = (newCategory) => {
    this.setState({
      nameCategory: newCategory,
      menus: [],
    });

    this.setState({ loading: true }, () => {
      axios.get(API_URL + "/menus?category.name=" + newCategory)
        .then(res => {
          const menus = res.data;
          this.setState({ menus });
          this.setState({ loading: false });
        })
        .catch(error => {
          console.log(error);
        });
    })
  }

  addToBasket = (menu) => {
    this.setState({ loading: true }, () => {
      axios.get(API_URL + "/baskets?menu.id=" + menu.id)
        .then(res => {
          if(res.data.length === 0){
            const basket = {
              total: 1,
              total_price: menu.price,
              menu: menu
            }

            axios.post(API_URL + "/baskets", basket)
              .then(res => {
                this.setState({ loading: false });
                swal({
                  title: "Berhasil!",
                  text: "menu " + menu.name + " telah ditambahkan ke keranjang anda!",
                  icon: "success",
                  button: {
                    text: "Close",
                    value: true,
                    visible: true,
                    className: "bg-purple",
                    closeModal: true,
                    timer: 1500,
                  }
                });
                this.getBasket();
              })
              .catch(error => {
                console.log(error);
              });
          }else {
            const basket = {
              total: res.data[0].total+1,
              total_price: res.data[0].total_price + menu.price,
              menu: menu
            }

            axios.patch(API_URL + "/baskets/" + res.data[0].id, basket)
              .then(res => {
                this.setState({ loading: false });
                swal({
                  title: "Berhasil!",
                  text: "jumlah menu " + menu.name + " telah ditambahkan di keranjang anda!",
                  icon: "success",
                  button: {
                    text: "Close",
                    value: true,
                    visible: true,
                    className: "bg-purple",
                    closeModal: true,
                    timer: 1500,
                  }
                });
                this.getBasket();
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  subtractMenu = (basket) => {
    if(basket.total <= 1){
      this.deleteBasket(basket.id);
    }
    else{
      const newBasket = {
        total: basket.total - 1,
        total_price: basket.total_price - basket.menu.price,
        menu: basket.menu
      }
      axios.patch(API_URL + "/baskets/" + basket.id, newBasket)
        .then(res => {
          this.setState({ loading: false });
          swal({
            title: "Berhasil!",
            text: "jumlah menu " + basket.menu.name + " telah dikurangi di keranjang anda!",
            icon: "warning",
            button: {
              text: "Close",
              value: true,
              visible: true,
              className: "bg-purple",
              closeModal: true,
              timer: 1500,
            }
          });
          this.getBasket();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  deleteBasket = (id) => {
    axios.delete(API_URL + "/baskets/" + id)
      .then(res => {
        this.setState({ loading: false });
        swal({
          title: "Berhasil!",
          text: "menu dihapus dari keranjang",
          icon: "warning",
          button: {
            text: "Close",
            value: true,
            visible: true,
            className: "bg-purple",
            closeModal: true,
            timer: 1500,
          }
        });
        this.getBasket();
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateNoteValue = (e) => {
    this.setState({
      noteValue: e.target.value
    });
  }

  orderMenu = () => {
    this.getBasket();
    let total = 0;
    let array = [];
    let basketId = [];
    for (let i = 0; i < this.state.baskets.length; i++) {
      array.push(this.state.baskets[i]);
      basketId.push(this.state.baskets[i].id);
      total += this.state.baskets[i].total_price;
    }

    const order = {
      total_payment: total,
      total_menu: this.state.baskets.length,
      notes: this.state.noteValue,
      menus: array
    }

    axios.post(API_URL + "/orders", order)
      .then(res => {
        for (let i = 0; i < basketId.length; i++) {
          this.deleteBasket(basketId[i]);
        }
        window.location = "/order";
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { menus, baskets, loading } = this.state;
    let loadingComp;
    let button;
    if (loading) {
      loadingComp = <LoadingComponent />;
    }
    if (baskets.length > 0){
      button = <button className="btn buy-button" onClick={() => this.orderMenu()}>Beli</button>;
    }
    const totalPayment = baskets.reduce(function (result, item){
      return result + item.total_price;
    }, 0);

    return (
        <div className="container my-4">
          <Row>
            <Col className="my-lg-0 my-md-1" lg="4">
            <SidebarComponent changeCategory={this.changeCategory} />
            <div className="d-flex justify-content-center my-3">
            <div className="card p-4">
                <div className="top-container d-flex justify-content-start align-items-center">
                    <div className="round-div">
                        <FontAwesomeIcon icon={faShoppingCart} className="box-icon" />
                    </div> 
                    <span className="basket pl-2">Keranjang</span>
                </div>
                  {loadingComp}
                  {baskets.map((basket) => (
                    <BasketComponent
                      key={basket.id}
                      basket={basket}
                      addToBasket={this.addToBasket}
                      subtractMenu={this.subtractMenu}
                      deleteBasket={this.deleteBasket}
                    />
                  ))}
                  <Form.Group className="my-4">
                    <Form.Label>Catatan</Form.Label>
                    <Form.Control value={this.state.noteValue} onChange={this.updateNoteValue} as="textarea" rows={3} className="border border-dark" />
                  </Form.Group>
                <div className="d-flex justify-content-between align-items-center pt-2 pb-2">
                  <div className="fs-6">
                    <b>Total Bayar: Rp. {numberWithDot(totalPayment)}</b>
                  </div>
                  {button}
                </div>
            </div>
            </div>
            </Col>
            <Col className="my-lg-0 my-1" lg="8">
              <div id="main-content" className="border">
                <div className="d-flex my-4 flex-wrap justify-content-center">
                  {loadingComp}
                  {menus.map((menu) => (
                    <MenusComponent
                      key={menu.id}
                      menu={menu}
                      addToBasket={this.addToBasket}
                    />
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </div>
    );
  }
}
