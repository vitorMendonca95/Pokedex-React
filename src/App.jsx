import React, { Component } from 'react';
import Pokemon from './components/Pokemon'


import './style.css';



class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            pokemon : []
        }
    }

    componentDidMount(){
        let url = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0';
        fetch(url)
        .then((r) => r.json())
        .then((json) => {
            let state = this.state;
            state.pokemon = json.results;
            this.setState(state);
            
        });

    }

    render(){
        return(
            <div className = "container">
                {this.state.pokemon.map((item, index) => {
                    return(
                        <article key = {index}>                
                            <Pokemon id = {index} name = {item.name}/>                                                                                                                                    
                        </article>
                    )
                })

                }
            </div>         
        );
    }
}


export default App;