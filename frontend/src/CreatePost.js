import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import randomString from 'randomstring';
import { getPosts } from './actions/post_actions';
import { addPost } from './api';
import { connect } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class CreatePost extends React.Component {
  state = {
    open: false,
    title: '',
    body: '',
    author: '',
    category: 'react'
  };

  categories = [
    {
      name: 'react',
    },
    {
      name: 'redux',
    },
    {
      name: 'udacity',
    }
  ];

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (event, index, value) => {
    if (value) {
      this.setState({ category: value });
    } else {
      this.setState({ [event.target.name]: event.target.value })
    }
  };

  submit = () => {
    const id = randomString.generate(21);
    addPost({
      id,
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    }).then(() => {
      this.props.dispatch(getPosts());
      this.setState({open: false});
    });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.submit}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Create Post" onClick={this.handleOpen} />
        <Dialog
          title="Create Post"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>

          <TextField
            hintText="Title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          /><br />
          <TextField
            hintText="Body"
            name="body"
            value={this.state.body}
            onChange={this.handleChange}
          /><br />
          <TextField
            hintText="Author"
            name="author"
            value={this.state.author}
            onChange={this.handleChange}
          /><br />

          <DropDownMenu value={this.state.category} onChange={this.handleChange}>
            {this.categories.map((category) =>
              (<MenuItem value={category.name}  primaryText={category.name} />))
            }
          </DropDownMenu><br />
        </Dialog>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(CreatePost);

