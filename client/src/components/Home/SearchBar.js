import React, {Component} from 'react';
class SearchBar extends Component {
  
    handleFilterTextChange = (e) => {
        this.props.onFilterTextChange(e.target.value);
    }
  
    render() {
        return (
            <div className="div-container">
            <input className="input-textboxes"
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