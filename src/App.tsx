import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery'
import BarChart from './components/BarChart'
function App() {
  let [sequence, setSequence] = useState({x: [1,2,3], y:[1,2,3]})
  // let [sequence, setSequence] = useState([1,2,3,4,5])


  // Parses and cleans the b-file .txt
  // Returns two lists xList and yList
  function parseData(text : string){
    let xList : number[] = [];
    let yList : number[] = [];

    let arr = text.split('\n');
    for (let line of arr) {
      if (/^\d+$/.test(line[0])) {
        let pair = line.split(" ");
        // console.log("x", parseInt(pair[0]), "y", parseInt(pair[1]));
        
        let xVal : number = parseInt(pair[0]);
        let yVal : number = parseInt(pair[1]);
        if (xList.length < 1000 && !(yVal === Infinity || xVal === Infinity))
        {
          xList.push(xVal);
          yList.push(yVal);  
        }
        else {
          break;
        }
      }
    }
    setSequence({x:xList, y:yList})


    return {x: xList, y: yList};
  }

  function fetchOEIS() {
  // Request data from OEIS
  // Pad the beginning with zeros
  let seq : string = String(Math.floor(Math.random()*340000)).padStart(6, '0');
  $.get( `http://oeis.org/A${seq}/b${seq}.txt`, function( data ) {
    let text : string = data;
    
    // Debugging: print data
    // console.log(text)
    console.log(sequence)
    
    return parseData(text);
  });
  }

  return (
    <div className="App">
      {sequence && <BarChart width={1500} height={500} data={sequence.y}></BarChart>}
      <button onClick={fetchOEIS}> New sequence! </button>

    </div>
  );
}

export default App;
