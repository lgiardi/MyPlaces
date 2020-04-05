import React, {Component} from 'react';


class ContactList extends Component {
  render(){


    return <ol>
        {this.props.contatti.map((contatto,index) =>(
          <li key={index}>{contatto.name}</li>
        )
        )}
      </ol>
  }

}

export default ContactList
