import React, { Component, PropTypes } from 'react';
import 'whatwg-fetch';
import { Spinner , Card , CardTitle, CardText, CardActions , Button , CardMenu , IconButton , Snackbar } from 'react-mdl';

const spinnerStyle = {
  margin: 'auto',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: 'fixed',
};

const cardStyle = {
  width: 'auto',
  margin: 'auto',
};

const pageContainerStyle = {
  padding: '20px',
};

const propTypes = {
  posts: PropTypes.array,
  isLoaded: PropTypes.bool,
  isOffline: PropTypes.bool,
};

const defaultProps = {
  posts: [],
  isLoaded: false,
  isOffline: false,
};

class TechProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: props.posts,
      isLoaded: props.isLoaded,
      isOffline: props.isOffline,
    };
    this.hideIndicator = this.hideIndicator.bind(this);
    this.showIndicator = this.showIndicator.bind(this);
  }

  componentDidMount() {
    window.addEventListener('offline', this.showIndicator);
    window.addEventListener('online', this.hideIndicator);

    fetch('https://api.producthunt.com/v1/categories/tech/posts', {
      method: 'get',
      headers: {
      'Authorization': 'Bearer 4bf782db360dd58f4411996195a4c3173e058cd5f14e169dfb31387c4701fe48'
      }
    }).then((response) => {

			return response.json();

		}).then((data) => {

			this.setState({
				posts : data.posts,
				isLoaded : true,
			});
      // Set data in localStorage in case of network issue
			localStorage.setItem("techposts",JSON.stringify(data.posts));

		}).catch((err) => {
      // Get data from localStorage
			this.setState({
				posts : JSON.parse(localStorage.getItem("techposts")),
				isLoaded : true
			});

		})
  }

  hideIndicator() {
    this.setState({ isOffline: false, });
  }
  showIndicator() {
    console.log('showIndicator!!!!');
    this.setState({ isOffline: true, });
  }

  render() {
    return(
      <div style={ pageContainerStyle }>
        {
          !this.state.isLoaded &&
          <Spinner style={ spinnerStyle } />
        }
        {
          this.state.posts.map( (post, index) => {
            return (
              <div key={ index }>
	              <Card shadow={ 0 } style={ cardStyle }>
	                <CardTitle style={ {color: '#fff', height: '176px', background: `url(${post.thumbnail.image_url}) center / cover`} }>
	                  { post.tagline }
	                </CardTitle>
	                <CardText>
	                    Posted by { post.user.username }
	                </CardText>
	                <CardActions border>
	                    <Button colored>Show { post.comments_count } comments</Button>
	                </CardActions>
	              </Card>
	              <br />
	              <br />
	            </div>
            );
          })
        }

        <Snackbar active={ this.state.isOffline } action="Undo">
				  Now you are offline, but still your application works!
			  </Snackbar>
      </div>
    );
  }
}

TechProducts.propTypes = propTypes;
TechProducts.defaultProps = defaultProps;

export default TechProducts;
