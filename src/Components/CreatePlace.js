import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ImageIn from '../utils/ImageIn'
import serializeForm from 'form-serialize'

class CreatePlace extends Component {
  onSubmit=(e) =>{
    e.preventDefault()
    const data = serializeForm(e.target, {hash:true})
    //console.log(data)
    this.props.onCreatePlace(data)
  }


  render(){
    return(
      <div>
        <Link
          className="back-create-place"
           to="/"
          ></Link>
          <form onSubmit={this.onSubmit} className="place-form">
            <ImageIn
                className="create-place-image"
                name="img"
                maxHeight={100}
            />
            <div className="create-place-details">
              <input type='text' name='name' placeholder='Name'/>
              <input type='text' name='type' placeholder='Type'/>
              <button>Add Place</button>
            </div>
          </form>

      </div>
    )
  }
}
export default CreatePlace
