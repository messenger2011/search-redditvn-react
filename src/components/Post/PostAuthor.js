import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage';

class PostAuthor extends PureComponent {
  render() {
    return (
      <header className="card-header card-header-post">
        <div className="row">
          <div className="col-auto align-self-center pr-0">
            <Link to={`/user/${this.props.user.id}`} className="d-inline-block">
              <LazyImage
                className="rounded-circle fb-avatar"
                src={`https://graph.facebook.com/${this.props.user.id}/picture?width=40`}
                alt={this.props.user.name}
                height="2.5rem"
                width="2.5rem"
              />
            </Link>
          </div>
          <div className="col">
            <div className="user-name">
              <a href={`https://www.facebook.com/${this.props.user.id}`}>
                <b>{this.props.user.name}</b>
              </a>
            </div>
            <div>
              <small>
                <time>{new Date(this.props.createdTime).toLocaleString()}</time>
              </small>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default PostAuthor;
