import React, {Component} from 'react';
class Pages extends Component{
    render(){
        let items = [];
        for (let i = 1; i <= this.props.pages; i++) {
            items.push(<button disabled ={this.props.page === i} className="buttons" onClick ={()=>this.props.getPageEmployees(i)} >{i}</button>);
        }
        console.log("page:"+ this.props.page+"pages:"+ this.props.pages)
        return(
            <div className="div-container">
                <button disabled ={this.props.page === 1} className="buttons" onClick ={this.props.minusOnepage} >pre</button>
                {items}
                <button disabled ={this.props.page === this.props.pages} className="buttons" onClick ={this.props.addOnePage} >older</button>
            </div>
        )
  }
}

export default Pages;