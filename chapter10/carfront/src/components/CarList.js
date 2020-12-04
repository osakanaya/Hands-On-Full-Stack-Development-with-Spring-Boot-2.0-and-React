import React, { Component } from "react";

import { SERVER_URL } from "../constants";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddCar from "./AddCar";

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
                <AddCar addCar={ this.addCar } fetchCars={ this.fetchCars } />
                <ReactTable data={ this.state.cars } columns={ columns } filterable={ true } />
                <ToastContainer autoClose={ 1500 } />
            </div>
        );
    }

    addCar(car) {
        fetch(SERVER_URL + "api/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(car)
        })
        .then(res => this.fetchCars())
        .catch(err => console.error(err));
    }

    onDelClick = (link) => {
        if (window.confirm("Are you sure to delete?")) {
            fetch(link, { method: "DELETE"})
            .then(res => {
                toast.success("Car deleted", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                this.fetchCars();
            })
            .catch(err => {
                toast.success("Car deleted", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                console.error(err);
            });
        }
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