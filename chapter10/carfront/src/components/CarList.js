import React, { Component } from "react";
import { SERVER_URL } from "../constants";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import { CSVLink } from "react-csv";
import Grid from "@material-ui/core/Grid";

class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: []
        };
    }
    
    componentDidMount() {
        this.fetchCars();
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

    updateCar(car, link) {
        fetch(link, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(car)
        })
        .then(res => {
            toast.success("Changes saved", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            this.fetchCars();
        })
        .catch(err => {
            toast.error("Error when saving", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            console.error(err);
        });
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
                sortable: false,
                filterable: false,
                width: 100,
                accessor: "_links.self.href",
                Cell: ({ value, row }) => (<EditCar car={ row } link={ value } updateCar={ this.updateCar }  fetchCars={ this.fetchCars } />)
            },
            {
                sortable: false,
                filterable: false,
                width: 100,
                accessor: "_links.self.href",
                Cell: ({ value }) => (<button onClick={ () => { this.onDelClick(value) } }>Delete</button>)
            }
        ];

        const csvHeaders = [
            { label: "Brand", key: "brand" },
            { label: "Model", key: "model" },
            { label: "Color", key: "color" },
            { label: "Price", key: "price" }
        ];

        return (
            <div className="App">
                <Grid container>
                    <Grid item>
                        <AddCar addCar={ this.addCar } fetchCars={ this.fetchCars } />
                    </Grid>
                    <Grid item style={ { padding: 15 } }>
                        <CSVLink data={ this.state.cars } separator=";" headers={ csvHeaders }>Export CSV</CSVLink>
                    </Grid>
                </Grid>
                <ReactTable data={ this.state.cars } columns={ columns } filterable={ true } />
                <ToastContainer autoClose={ 1500 } />
            </div>
        );
    }

}

export default CarList;