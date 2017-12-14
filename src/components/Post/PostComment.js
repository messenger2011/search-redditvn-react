import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { operations } from '../../duck';
import { connect } from 'react-redux';
import deepEqual from 'deep-equal';
import LazyImage from '../LazyImage';

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
    return (
      <div className="card-body" id="comment">
        {this.state.show_comment === false ? (
          <button type="button" className="btn btn-primary" onClick={this.onClickShowComments}>
            Show comments
          </button>
        ) : (
          <div className="comment-content">
            {this.props.comments &&
              this.props.comments.map(comment => (
                <div key={comment._id}>
                  <div className="row comment mb-2">
                    <div className="col-auto pr-0">
                      <Link to={`/user/${comment.from.id}`}>
                        <LazyImage
                          className="rounded-circle fb-avatar"
                          src={`https://graph.facebook.com/${comment.from.id}/picture?width=32`}
                          alt={comment.from.name}
                          height="2rem"
                          width="2rem"
                        />
                      </Link>
                    </div>
                    <div className="col">
                      <span className="cmt-box brko">
                        <a className="mr-1" href={`https://www.facebook.com/${comment.from.id}`}>
                          <span className="font-weight-bold">{comment.from.name}</span>
                        </a>
                        <span>{comment.message}</span>
                      </span>
                    </div>
                  </div>
                  {/* for reply comment */}
                  {comment.replies &&
                    comment.replies.map(reply => (
                      <div className="reply-comment ml-3 ml-md-5" key={reply._id}>
                        <div className="row mb-2">
                          <div className="col-auto pr-0">
                            <Link to={`/user/${reply.from.id}`}>
                              <LazyImage
                                className="rounded-circle fb-avatar"
                                src={`https://graph.facebook.com/${reply.from.id}/picture?width=32`}
                                alt={reply.from.name}
                                height="1.25rem"
                                width="1.25rem"
                              />
                            </Link>
                          </div>
                          <div className="col">
                            <span className="cmt-box reply-box brko">
                              <a className="mr-1" href={`https://www.facebook.com/${reply.from.id}`}>
                                <span className="font-weight-bold">{reply.from.name}</span>
                              </a>
                              <span>{reply.message}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps, {
  fetchCommentByPostId: operations.fetchCommentByPostId
})(PostComment);
