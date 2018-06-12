import React, {Component} from 'react';
import {FormControl} from 'react-bootstrap';

class SearchBar extends Component {
  
    handleFilterTextChange = (e) => {
        this.props.onFilterTextChange(e.target.value);
    }
  
    render() {
        return (
            <div className="div-container">
                <FormControl 
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
            </div>
        );
    }
}

export default SearchBar;