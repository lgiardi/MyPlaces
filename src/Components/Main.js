import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import MyPlacesList from './MyPlacesList'
import CreatePlace from './CreatePlace'
import * as AttractionsAPI from '../utils/AttractionsAPI'


class Main extends Component {
  state = {
    attractions : [],
    //screen:'list' //list, create
  }

  componentDidMount(){
      AttractionsAPI.getAll().then((attractions) => {
        this.setState({attractions})
      })
  }


  removePlace = (attraction) => {
    this.setState((state) => ({
        attractions: state.attractions.filter((attr) => attr.id !== attraction.id)
    }))
    AttractionsAPI.remove(attraction)

  }


  createPlace = (place) =>{
      AttractionsAPI.create(place).then(place =>{this.setState(state => ({
          attractions: state.attractions.concat([place])
          }))
          
        }
        
      )
  
    }





  /*navigateToCreate = () =>{
    this.setState({screen: 'create'})
  }*/


/*
removePlace = (attraction) => {
  console.log("Remove Place " + attraction.name);
}
*/


  render(){

    return <div>
              <Header
                  title ='MyPlaces'
                  //onNavigation = {this.navigateToCreate}
              />
              <Route exact path="/" render = {()=>(
                <MyPlacesList
                    myplaces={this.state.attractions}
                    onRemovePlace = {this.removePlace}
                />
              )}/>
              <Route path="/create" render = {() => (
                <CreatePlace
                    onCreatePlace={this.createPlace}
                />

              )}/>
              <Footer/>
           </div>
  }
}

export default Main
