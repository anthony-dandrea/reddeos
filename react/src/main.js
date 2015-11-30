import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from 'store/store';
import {Router, Route} from 'react-router';
import history from 'helpers/history';
import HomeContainer from 'components/Home/HomeContainer';
import VideoContainer from 'components/Video/VideoContainer';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={HomeContainer} />
      <Route path="/:id" component={VideoContainer} />
    </Router>
  </Provider>,
  document.getElementById('App')
);
