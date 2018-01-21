import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import {Link} from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render(){

    const {song} = this.props.data;

    if (!song) {
      return <div>Loading...</div>;
    }

    return (<div>
      <Link to="/">Back</Link>
      <h3>{song.title}</h3>
      <LyricList lyrics={song.lyrics}/>
      <LyricCreate songId={this.props.params.id}/>
    </div>);
  }
}

export default graphql(fetchSong, {
  options: (props) =>{ //take the props going to the designated component...
    return {
      variables: {id: props.params.id} //...then whatever object is returned will pass the id param to the query
    }
  }
})(SongDetail); //...finally graphQL will return the query data to the designated component