import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class LyricCreate extends Component {
  constructor(props){
    super(props);

    this.state = {content: ''};
  }

  onSubmit(e){
    event.preventDefault();
    this.props.mutate({
      variables: {
        content: this.state.content, songId: this.props.songId
      }
    })
      .then(() => this.setState({content: ''}));
  }

  render(){
    return (<form onSubmit={this.onSubmit.bind(this)}>
      <label>Add a Lyric</label>
      <input value={this.state.content} onChange={event => this.setState({content: event.target.value})}/>
    </form>)
  }
}

const mutation = gql`
mutation AddLyricToSong($songId: ID!, $content: String) {
  addLyricToSong(songId: $songId, content: $content) {
    id
    lyrics {
      id
      content
      likes
    }
  }
}
`;

export default graphql(mutation)(LyricCreate);