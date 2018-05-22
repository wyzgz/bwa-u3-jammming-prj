import React from 'react';
import Tracklist from '../Tracklist/Tracklist.js'
import './Playlist.css';

class Playlist extends React.Component{
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }


  render(){
    return(
      <div className="Playlist">
        <input value={'New Playlist'} onChange ={this.handleNameChange}/>

        <Tracklist
          tracks = {this.props.playlist}
          onRemove = {this.props.removeTrack}
          isRemoval = {true}
          />
        <a className="Playlist-save" onClick = {this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>

    );
  }
}

export default Playlist;
