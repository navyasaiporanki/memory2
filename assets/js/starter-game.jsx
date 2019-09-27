import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      numberOfClicks: 0,
      previousSaved: {},
      count: 0,
      name: "",
      value: "",
      parent: "",
      totalTilesSolved: 0,
      inputArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      titlesSolvedClass: [],
      matchedTilesClass: []
    };

    this.state = this.initialState;

  }




  /** This Method is called from the child class on each click. */
  hideName(name, value, parent) {

    if (name.className == "labelText") {
      name.className = "visibleProperty";
      //parent.className = "visibleProperty";

      this.state.numberOfClicks += 1;
      this.state.count += 1;
      this.state.name = name;
      this.state.value = value;
      this.state.parent = parent;

      if (this.state.count == 2) {
        this.state.notClicked = false;
        setTimeout(() => {
          this.executeGameLogic()
        }, 1000);


      }
      else if (this.state.count == 1) {
        this.state.previousSaved = { nameObtained: name, valueObtained: value, parentObtained: parent };
      }

    }
  }

  preventDefault(event) {
    event.preventDefault();
  }

  /* This is the main function of the game. This checks the current value and previous stored value.*/
  executeGameLogic() {

    if (this.state.previousSaved.nameObtained.className == this.state.name.className &&
      this.state.previousSaved.valueObtained == this.state.value) {

      this.state.previousSaved.nameObtained.className = "removeFromDOM";
      this.state.name.className = "removeFromDOM";
      this.state.previousSaved.parentObtained.className = "matchedTiles";
      this.state.parent.className = "matchedTiles";

      this.state.totalTilesSolved += 2;
      console.log(this.state.totalTilesSolved);

      this.state.titlesSolvedClass.push(this.state.previousSaved.nameObtained);
      this.state.titlesSolvedClass.push(this.state.name);

      this.state.matchedTilesClass.push(this.state.previousSaved.parentObtained);
      this.state.matchedTilesClass.push(this.state.parent);

      if (this.state.totalTilesSolved == 16) {
        alert("Congratulations, you have won the game in " + this.state.numberOfClicks + " Guesses :)");
        this.startNewGame();
      }

    }
    else {
      this.state.previousSaved.nameObtained.className = "labelText";
      this.state.name.className = "labelText";

    }
    this.state.previousSaved = {};
    this.state.count = 0;
  }


  /* A Method that shuffles the Array Contents Randomly.*/
  shuffleArray() {
    let length = 16;
    for (var i = 15; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.state.inputArray[i], this.state.inputArray[j]] = [this.state.inputArray[j], this.state.inputArray[i]];
    }
  }

  /* A Method that starts the new game and clears all saved state values.*/
  startNewGame() {


    console.log("total tile solved " + this.state.titlesSolvedClass);
    this.state.titlesSolvedClass.map((item) => item.className = "labelText");

    this.state.titlesSolvedClass = [];

    this.state.matchedTilesClass.map((item) => item.className = "gameLetters");

    console.log("matched  tile solved " + this.state.matchedTilesClass);
    this.state.matchedTilesClass = [];

    var listOfChangedClassVisible = document.getElementsByClassName("visibleProperty");

    for (let i = 0; i < listOfChangedClassVisible.length; i++) {
      listOfChangedClassVisible[i].className = "labelText";
    }
    this.setState(this.initialState);

  }
  /*This method resets the game variables.*/
  resetState() {
    this.state.totalTilesSolved = 0;
    this.state.numberOfClicks = 0;
    this.state.count = 0;
    this.state.titlesSolvedClass = [];
    this.state.matchedTilesClass = [];

  }

  /*This method generates a 4 X 4 display to play the game.*/
  createDisplayGrid() {

    var htmlDiv = [];
    var htmlDiv1 = [];

    for (var i = 0; i < 4; i++) {
      htmlDiv1.push(
        <Words value={this.state.inputArray[i]} key={i} handleShow={this.hideName.bind(this)} />
      )
    }
    htmlDiv.push(
      <div className="floatLeft">
        {htmlDiv1}
      </div>
    );
    htmlDiv1 = [];
    for (var i = 4; i < 8; i++) {
      htmlDiv1.push(
        <Words value={this.state.inputArray[i]} key={i} handleShow={this.hideName.bind(this)} />
      )
    }
    htmlDiv.push(
      <div className="floatLeft">
        {htmlDiv1}
      </div>
    );
    htmlDiv1 = [];
    for (var i = 8; i < 12; i++) {
      htmlDiv1.push(
        <Words value={this.state.inputArray[i]} key={i} handleShow={this.hideName.bind(this)} />
      )
    }
    htmlDiv.push(
      <div className="floatLeft">
        {htmlDiv1}
      </div>
    );
    htmlDiv1 = [];
    for (var i = 12; i < 16; i++) {
      htmlDiv1.push(
        <Words value={this.state.inputArray[i]} key={i} handleShow={this.hideName.bind(this)} />
      )
    }
    htmlDiv.push(
      <div className="floatLeft">
        {htmlDiv1}
      </div>
    );

    return (<div>{htmlDiv}</div>);


  }


  render() {
    this.shuffleArray();
    this.resetState();
    return (
      <div>
        <div id="gameBody" className="gameBody">
          {this.createDisplayGrid()}
        </div>
        <div className="startNewButton">
          <button onClick={this.startNewGame.bind(this)}> Start New Game</button>
        </div>
      </div>
    )
  }




}

class Words extends React.Component {

  /* This function shows and hides the Letter. This method called is propagated to the parent class.*/
  hide() {
    this.props.handleShow(this.refs.paragraphClass, this.props.value, this.refs.divParent);
  }


  render() {
    return (
      <div className="gameLetters" onClick={this.hide.bind(this)} ref="divParent">
        <h1 className="labelText" value={this.props.value} ref="paragraphClass">

          {this.props.value}

        </h1>
      </div>
    );
  }
}


