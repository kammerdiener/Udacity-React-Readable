import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import randomString from 'randomstring';
import { createComment } from './actions/PostActions';
import { connect } from 'react-redux';

class CreateComment extends React.Component {
  state = {
    open: false,
    body: '',
    author: '',
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };

  submit = () => {
    const id = randomString.generate(21);

    this.props.dispatch(createComment({
      id,
      parentId: this.props.parentId,
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author,
    }));
    this.setState({open: false});
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
        <RaisedButton label="Add Comment" onClick={this.handleOpen} />
        <Dialog
          title="Create Post"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
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
        </Dialog>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    state,
    ownProps
  };
}
export default connect(mapStateToProps)(CreateComment);