import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import {FormControl, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';



class SearchBar extends Component {
  
    handleFilterTextChange = (e) => {
        this.props.setFilterText(e.target.value);
    }
  
    render() {
        return (
            <div className="div-container">
                <FormControl 
                    style={{width: "50%", float: "left"}}
                    className="input-textboxes"
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
                <Button className="buttons" style={{width: "20%", float: "right"}} ><Link to={{ pathname: '/'  }}>Home</Link></Button>

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