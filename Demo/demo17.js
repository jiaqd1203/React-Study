import React,{Component} from 'react';
// 目前暂时无法显示在网页，需要通过React host
class App extends React.Component{
    constructor(){
        super()
        this.state = {
            like:false
        }
    }
    handleClick(){
        this.setState(
            {
                like:!this.state.like
            }
        )
    }
    // ES6内容和JSX内容结合
    render(){
        return(
            <button type="button" style={this.state.like?{color:"red"}:{color:"black"}}
            onClick={()=>this.handleClick()}
            >
                {
                    this.state.like?"liked":"like"
                }
            </button>
        )
    }
}


