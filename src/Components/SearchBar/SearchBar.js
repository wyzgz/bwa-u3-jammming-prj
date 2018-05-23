import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  search(event){
    this.props.onSearch(this.state.term);
    event.preventDefault();
  }

  handleTermChange(event){
    this.setState({term:event.target.value});

  }
  handleKeyPress(event){
    if(event.key === 'Enter'){
      this.props.onSearch(this.state.term);
    }
  }
  render(){
    return(
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist"
                onChange = {this.handleTermChange}
                onKeyPress = {this.handleKeyPress}/>
        <a onClick={this.search}>SEARCH</a>
      </div>

    );
  }
}
export default SearchBar;
