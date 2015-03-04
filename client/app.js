var React = require('react');
var Router = require('react-router');

var Home = require('./components/Home.react');
var Book = require('./components/Book.react');
var Chapter = require('./components/Chapter.react');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function () {
    return (
      <div className="wrap">
        <header>
          <h1>The Little Fullstack App Book</h1>
          <ul>
            <li><Link to="app">Home</Link></li>
            <li><Link to="chapter" params={{ chapterId: "1" }}>Book</Link></li>
          </ul>
        </header>
        <RouteHandler/>
        <footer>Footer</footer>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    {/* <Route name="book" path="/book/:chapterId" handler={Book} />*/}
    <Route name="book" handler={Book}>
      <Route name="chapter" path=":chapterId" handler={Chapter}/>
    </Route>
    <DefaultRoute handler={Home}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});