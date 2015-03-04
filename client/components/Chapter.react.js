var React = require('react');
var Router = require('react-router');

var posts = {
  1: '<h1>Hey let\'s put some content in a string</h1>',
  2: '<h1>Hey let\'s put some other content in a string</h1>'
}

var Chapter = React.createClass({
  mixins: [Router.State],
  render: function() {
    return (
      <div
        className="chapter"
        dangerouslySetInnerHTML={{__html: posts[this.getParams().chapterId]}}
      />
    );
  }

});

module.exports = Chapter;