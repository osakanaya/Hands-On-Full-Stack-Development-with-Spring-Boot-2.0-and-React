import React, { Component } from "react";

import { SERVER_URL } from "../constants";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: []
        };
    }
    
    render() {
        const columns = [
            {
                Header: "Brand",
                accessor: "brand"
            },
            {
                Header: "Model",
                accessor: "model"
            },
            {
                Header: "Color",
                accessor: "color"
            },
            {
                Header: "Price",
                accessor: "price"
            },
            {
                id: "delbutton",
                sortable: false,
                filterable: false,
                width: 100,
                accessor: "_links.self.href",
                Cell: ({ value }) => (<button onClick={ () => { this.onDelClick(value) } }>Delete</button>)
            }
        ];

        return (
            <div className="App">
                <ReactTable data={ this.state.cars } columns={ columns } filterable={ true } />
            </div>
        );
    }

    onDelClick = (link) => {
        fetch(link, { method: "DELETE"})
            .then(res => this.fetchCars())
            .catch(err => console.error(err));
    }

    fetchCars = () => {
        fetch(SERVER_URL + "api/cars")
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    cars: responseData._embedded.cars
                });
            })
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.fetchCars();
    }
}

export default CarList;