import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getBooksQuery, getAuthorsQuery, addBookMutation } from '../queries/queries';



class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorid: ''
    }
  }
  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    if(data.loading) {
      return(<option disabled>Loading authors....</option>);
    } else {
      return data.authors.map( author => {
        return(<option key={author.id} value={author.id} >{author.name}</option>);
      });
    }
  }
  submitForm(e) {
    e.preventDefault();
    if(this.state.name 
      && this.state.genre 
      && this.state.authorid){
      this.props.addBookMutation({
        variables: {
          name: this.state.name,
          genre: this.state.genre,
          authorid: this.state.authorid
        },
        refetchQueries: [{query: getBooksQuery}]
      });
      this.refs.form.reset();
      this.setState({
        name: '',
        genre: '',
        authorid: ''
      });
      
      console.log(this.state.name);
    }
  }
  render() {
    return (
      <form id="add-book" ref="form" onSubmit={ this.submitForm.bind(this) }>

        <div className="field">
          <label>Book name:</label>
          <input type="text" required="required" onChange={(e) => this.setState({ name: e.target.value })}/>
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" required="required" onChange={(e) => this.setState({ genre: e.target.value })}/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select  onChange={(e) => this.setState({ authorid: e.target.value })}>
          <option key="" >Select an author</option>
            {this.displayAuthors()}
          </select>
        </div>        
        <button>+</button>
      </form>
      );
  }
}


export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);