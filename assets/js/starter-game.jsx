import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';

export default function game_init(root, channel) {
  ReactDOM.render(<Starter channel = {channel}/>, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    
    this.state = {
      valuesToBeDisplayed : [],
      totalNumberOFClicks: 0,
      currentState: [],
      matchedTiles: [],
    };

    this.channel.join().receive("ok", this.onJoin.bind(this))
    .receive("error", resp => {console.log("Not able to join")})


  }

  onJoin({game}){
  console.log("joined game");
  this.setState(game);
  }

  onClickSetState({game}){
   console.log("compare value " + this.state.compareValues);
   console.log("State " + this.state.currentState);
    this.setState(game);
  }

  hideName(value) {
    
    if(this.state.valuesToBeDisplayed[value] == " "){
      
    
    
    if (this.state.totalNumberOFClicks % 2 == 0 ){
     // alert("click1 - " +this.state.totalNumberOFClicks );
      this.channel.push("dataFromReact",{index: value}).receive("ok", this.onClickSetState.bind(this))
    }
    else {
      //alert("click2 - " +this.state.totalNumberOFClicks );
      this.channel.push("dataFromReact_SecondClick",{index: value}).receive("ok", this.onClickSetState.bind(this))
      this.channel.push("compareValues_Clicks",{index: value}).receive("ok", this.onClickSetState.bind(this))
      //this.channel.push("compareValues_Clicks",{index: value}).receive("ok", console.log("going inside click 3"))
    }
      

    }
    }

    restartGame(event){
     //alert("hellp");
      this.channel.push("refresh",{index: "hello"}).receive("ok", this.onClickSetState.bind(this));
    }


checkGameCompletion(){
  if(this.state.matchedTiles.length == 7){
    let gameOver = true;
    for (let i = 0; i < 15; i++ ){
      if(this.state.valuesToBeDisplayed[i] == " "){
        gameOver = false;
      }
    }
    if(gameOver){
    alert("Congratulations, you have completed the game in  - " + this.state.totalNumberOFClicks);
    this.restartGame(null);
  }
  
  }
}

  render() {
    
    this.checkGameCompletion();
    return (
      <div>
        <div id="gameBody" className="gameBody">
          <GenerateGameBoard allItems = {this.state.valuesToBeDisplayed} hideArray ={this.hideName.bind(this)}/>
        </div>
        <div className="startNewButton">
          <button onClick={this.restartGame.bind(this)}> Start New Game</button>
        </div>
      </div>
    )
  }




}



function GenerateGameBoard(props){

  var generatedList = props.allItems;
 
  var htmlDiv = [];

  for (let i =0; i < generatedList.length; i++ ){
  

    htmlDiv.push(<button id = {i} className ="localButtons" onClick = {() => {props.hideArray(i)}}>{generatedList[i]}</button>);
    if(i % 4 == 3){
      htmlDiv.push(<br/>);
    }
  }

  return htmlDiv;
}


