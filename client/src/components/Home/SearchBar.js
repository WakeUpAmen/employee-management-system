import React, {Component} from 'react';
class SearchBar extends Component {
  
    handleFilterTextChange = (e) => {
        this.props.onFilterTextChange(e.target.value);
    }
  
    render() {
        return (
            <input 
                type="text"
                placeholder="Search..."
                value={this.props.filterText}
                onChange={this.handleFilterTextChange}
            />
        );
    }
}

export default SearchBar;