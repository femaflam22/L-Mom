import React, { Component } from 'react';
import { API_URL } from "../utils/constants";
import axios from 'axios';
import LoadingComponent from './LoadingComponent';

export default class SidebarComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            categories: [],
            menus: [],
            nameCategory: "",
            loading: null,
        }
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            axios.get(API_URL + "/categories")
            .then(res => {
                const categories = res.data;
                this.setState({ categories });
                this.setState({ loading: false });
            })
            .catch(error => {
                console.log(error);
            });
        })
    }

    render() {
        const { categories, loading } = this.state;
        const { changeCategory } = this.props;
        let loadingComp;
        if (loading) {
            loadingComp = <LoadingComponent />;
        }
        return (
            <div id="sidebar" className="bg-purple">
                {loadingComp}
                <div className="h4 text-white mb-3">Daftar Menu</div>
                <ul>
                    {categories.map((category) => (
                        <li key={category.id} onClick={() => changeCategory(category.name)}>
                            <div className="d-flex align-items-start">
                                <div className="d-flex flex-column">
                                    <div className="link">{category.name}</div>
                                    <div className="link-desc">{category.desc}</div>
                                </div>
                            </div> 
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}


