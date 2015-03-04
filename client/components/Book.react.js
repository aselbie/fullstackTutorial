var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Book = React.createClass({
  render: function() {
    return (
      <div className="main">
        <div className="chapters">
          <ul>
            <li><Link to="chapter" params={{chapterId: "1"}}>First Post</Link></li>
            <li><Link to="chapter" params={{chapterId: "2"}}>Second post</Link></li>
          </ul>
        </div>
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = Book;