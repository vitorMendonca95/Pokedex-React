import React, { Component } from 'react';
import '../style.css';

class Pokemon extends Component {


    constructor(props) {
        super(props);
        this.state = {
            pokeName: this.props.name,
            pokeSprite : '',
            pokeWeight: null,
            pokeHeight: null,
            pokeType: [],
            pokeDetails: false
        }

        this.showDetailsAction = this.showDetailsAction.bind(this);
        this.converterDecToMetre = this.converterDecToMetre.bind(this);
        this.converterHgToKg = this.converterDecToMetre.bind(this);
    }

    componentDidMount(){
        let url = 'https://pokeapi.co/api/v2/pokemon/' + (this.props.id + 1);
        fetch(url)
        .then((r) => r.json())
        .then((json) => {
            let state = this.state;
            state.pokeSprite = json.sprites.front_default;
            state.pokeWeight = json.weight;
            state.pokeHeight = json.height;
            state.pokeType = json.types[0].type.name;

            this.setState(state);
        });
    }

    showDetailsAction(){
        
        if(this.state.pokeDetails == false){
            this.setState({pokeDetails: true});
        }
        else {
            this.setState({pokeDetails: false})
        }

        
        
    }

    converterDecToMetre(height){
        return height / 10;
    }

    converterHgToKg(weight){
        return weight / 10;
    }

    render(){
        return(
        <div className = "card">
            <h3> {this.state.pokeName.charAt(0).toUpperCase() + this.state.pokeName.slice(1)} </h3>
            <img src={this.state.pokeSprite} alt=""/>
            <a className = "botao" onClick = {this.showDetailsAction}>Details</a>  
            { this.state.pokeDetails === true &&
                <table>
                    <thead>
                        <th>Type</th>
                        <th>Height</th>
                        <th>Weight</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.pokeType}</td>
                            <td>{this.converterDecToMetre(this.state.pokeHeight)}m</td>
                            <td>{this.converterHgToKg(this.state.pokeWeight)}kg</td>              
                        </tr>
                    </tbody>
                </table>
            }    

            {/*Height: {this.state.pokeHeight} <br/>
            weight: {this.state.pokeWeight} <br/>
        Type: {this.state.pokeType}*/}

        </div>
        );
    }
}

export default Pokemon;