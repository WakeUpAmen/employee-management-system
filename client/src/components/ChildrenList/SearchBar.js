import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import {FormControl} from 'react-bootstrap';


class SearchBar extends Component {
  
    handleFilterTextChange = (e) => {
        this.props.setFilterText(e.target.value);
    }
  
    render() {
        return (
            <div className="div-container">
                <FormControl className="input-textboxes"
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        filterText: state.myEmployeeListR.filterText,
    }
};

function mapDispatchToProps(dispatch) {
    return({
        setFilterText:(text) =>{dispatch(actions.setFilterText(text))},
      })
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);