import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { updateComment } from './actions/PostActions';
import { connect } from 'react-redux';

class DialogExampleSimple extends React.Component {
  state = {
    open: false,
    body: this.props.body,
  };
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submit = () => {
    this.props.dispatch(updateComment(this.props.postId, this.props.commentId, { timestamp: this.state.timestamp, body: this.state.body }));
    this.setState({open: false});
  };

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <RaisedButton
        label="Done"
        primary={true}
        onClick={this.submit}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Update Comment" onClick={this.handleOpen} />
        <Dialog
          title="Update Comment"
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
        </Dialog>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    ...ownProps
  };
}
export default connect(mapStateToProps)(DialogExampleSimple);