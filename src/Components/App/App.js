import React from 'react';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js'
import './App.css';



class App extends React.Component{
  constructor(props){
      super(props);
      this.state= {
        searchResults:[],
        playlistName:'New playlist name',
        playlistTracks: []
      };
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
  }
  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
        return;
    }else{
      //add the song to the end of the playlist
      let playlist = this.state.playlistTracks;
      playlist.push(track);
      this.setState({playlistTracks: playlist});

    }
  }

  removeTrack(track){
     let newlist = this.state.playlistTracks.filter(listtrack=>listtrack.id !==track.id);
     this.setState({playlistTracks: newlist});
  }

  updatePlaylistName(name){
    this.setState({playlistName:name});
  }

  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track=>track.uri);
    Spotify.savePlaylist(this.state.playlistName,trackURIs);
    this.setState({playlistName:'New Playlist',
                    playlistTracks:[]});
  }
  search(term){
      let savedTracks = this.state.playlistTracks;
      Spotify.search(term).then(tracks=>{
        //this.setState({searchResults:tracks});
        let results = [];
        if( savedTracks && savedTracks.length>=1){
           results = tracks.filter(track=>{
             if(savedTracks.some(savedTrack => savedTrack.id === track.id)) {
               return false;
             }else{
               return true;
             }
           })
        }else{
          results = tracks;
        }
        this.setState({searchResults:results});
      });

  }
  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">

            <SearchResults searchResults={this.state.searchResults} onAdd = {this.addTrack}/>

            <Playlist
              playlistName = {this.state.playlistName}
              playlist = {this.state.playlistTracks}
              removeTrack = {this.removeTrack}
              onNameChange = {this.updatePlaylistName}
              onSave = {this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
