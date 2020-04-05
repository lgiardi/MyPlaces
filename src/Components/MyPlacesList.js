import React, {Fragment,Component} from 'react';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: 20,
    marginRight: 20,
    //width: 200,
    display:'flex'
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});


class MyPlacesList extends Component {

  state = {
    query:''
  }

  handleQuery = (query) => {
    this.setState({
      query:query
    })
  }

  render(){
    const { classes, onRemovePlace } = this.props;
    let filteredPlaces
    if(this.state.query){
      const searchMatch = new RegExp(escapeRegExp(this.state.query),'i')
      filteredPlaces = this.props.myplaces.filter((place) => searchMatch.test(place.name))
    }else{
      filteredPlaces = this.props.myplaces
    }

    filteredPlaces.sort(sortBy('name'))
    return (
      <Fragment>
        <TextField
            id="standard-search"
            label="Search Place"
            type="search"
            className={classes.textField}
            margin="normal"
            value = {this.state.query}
            onChange = {(event) => this.handleQuery(event.target.value)}
          />

          <ol className ='place-list'>
          {
            filteredPlaces.map((myplace,index) => (
              <li key={index} className ='place-list-item'>

              <div className = 'place-avatar' style = {{
                backgroundImage:`url(${myplace.img})`
              }}/>
              <div className='place-details'>
                <p className='place-title'>{myplace.name}</p>
                <p>{myplace.type}</p>
              </div>
              <button onClick = {() => onRemovePlace(myplace)} className='place-remove'>
                Remove
              </button>

              </li>
            ))
          }
        </ol>
      </Fragment>
    )


}
}

export default withStyles(styles)(MyPlacesList)
