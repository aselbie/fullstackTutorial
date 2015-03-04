var React = require('react');

var posts = [
  { title: 'Hello', body: 'This little piggy went to market.' },
  { title: 'World', body: 'This little piggy stayed home.' }
]

var Index = React.createClass({
  render: function() {

    var list = [];

    for (var i = 0; i < posts.length; i++) {
      list.push(<li>{posts[i].title}</li>)
      posts[i]
    };

    return (
      <div className="index">
        <ul>{list}</ul>
      </div>
    );
    
  }

});

module.exports = Index;