import React from 'react';
import Track from '../Track/Track.js';
import './Tracklist.css';



class Tracklist extends React.Component{
  render(){
    return(
      <div className="TrackList">
       {this.props.tracks.map(track => {
         return <Track
         track = {track.name}
         key={track.id}
         onAdd = {this.props.onAdd}
         onRemove = {this.props.onRemove}
         isRemoval = {this.props.isRemoval}/>
       }

       )}
      </div>
    );
  }
}

export default Tracklist;
