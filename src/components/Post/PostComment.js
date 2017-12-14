import React, { Component } from 'react';
import { operations } from '../../duck';
import { connect } from 'react-redux';
import deepEqual from 'deep-equal';
import PostCommentDetail from './PostCommentDetail'

class PostComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_comment: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.postId !== nextProps.postId) {
      this.setState({ show_comment: false });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (deepEqual(this.props, nextProps) === false || deepEqual(this.state, nextState) === false) {
      return true;
    }
    return false;
  }

  onClickShowComments = () => {
    this.setState({ show_comment: true });
    this.props.fetchCommentByPostId(this.props.postId);
  };

  render() {
    const { opId, comments } = this.props;

    return (
      <div className="card-body" id="comment">
        {this.state.show_comment === false ? (
          <button type="button" className="btn btn-primary" onClick={this.onClickShowComments}>
            Show comments
          </button>
        ) : (
          <PostCommentDetail opId={opId} comments={comments} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps, {
  fetchCommentByPostId: operations.fetchCommentByPostId
})(PostComment);
