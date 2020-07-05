import React, {Component} from 'react';


const URL = 'ws://localhost:3030'

export default class Chat extends Component
{
    constructor(props){
        super(props)  
        this.state=({
            message:'',
            messages:[]
        })   
    }
    ws = new WebSocket(URL)
    componentDidMount()
    {
        this.ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('connected')
        }

        this.ws.onmessage=(ev)=>{
        const message = ev.data;            
        this.setState({message:message});
        }
    }



render()
{
    return (
        <div>
            <h1>{this.state.message}</h1>

        </div>
    )
}



}