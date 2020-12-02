import React, { Component } from "react";

class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: []
        };
    }
    
    render() {
        const tableRows = this.state.cars.map((car, index) =>
            <tr key={ index }>
                <td>{ car.brand }</td>
                <td>{ car.model }</td>
                <td>{ car.color }</td>
                <td>{ car.year }</td>
                <td>{ car.price }</td>
            </tr>
        );

        return (
            <div>
                <table>
                    <tbody>{ tableRows }</tbody>
                </table>
            </div>
        );
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/cars")
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    cars: responseData._embedded.cars
                });
            })
            .catch(err => console.error(err));
    }
}

export default CarList;