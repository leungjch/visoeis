import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery'
function App() {


  // Parses and cleans the b-file .txt
  // Returns two lists xList and yList
  function parseData(text : string){
    let xList : bigint[] = [];
    let yList : bigint[] = [];

    text.split('\n').forEach((line) => {
      if (/^\d+$/.test(line[0])) {
        let pair = line.split(" ");
        console.log("x", parseInt(pair[0]), "y", parseInt(pair[1]));
        xList.push(BigInt(pair[0]));
        yList.push(BigInt(pair[1]));
      }
    });
  


    // return {x: xList, y: yList};
  }
  function fetchOEIS() {
  // Request data from OEIS
  // Pad the beginning with zeros
  let seq : string = String(Math.floor(Math.random()*340000)).padStart(6, '0');
  $.get( `http://oeis.org/A${seq}/b${seq}.txt`, function( data ) {
    let text : string = data;
    console.log(text)
    
    return parseData(text);
  });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <button onClick={fetchOEIS}> New sequence! </button>
      </header>
    </div>
  );
}

export default App;
