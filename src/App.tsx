import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery'
import BarChart from './components/BarChart'
function App() {
  let [sequence, setSequence] = useState([[0,0],[1,1],[2,2],[3,3]])
  // True if linear y scale, false if log y scale
  let [useLinear, setUseLinear] = useState(true)
  // let [sequence, setSequence] = useState([1,2,3,4,5])

  function toggleLinearLog() {
    if (useLinear) {
      setUseLinear(false);
      console.log("Linear is", useLinear)

    } else {
      setUseLinear(true);
      console.log("Linear is", useLinear)

    }
    return useLinear
  }

  // Parses and cleans the b-file .txt
  // Returns two lists xList and yList
  function parseData(text : string){
    let newSeq: number[][] = [];

    let arr = text.split('\n');
    for (let line of arr) {
      if (/^\d+$/.test(line[0])) {
        let pair = line.split(" ");
        // console.log("x", parseInt(pair[0]), "y", parseInt(pair[1]));
        
        let xVal : number = parseInt(pair[0]);
        let yVal : number = parseInt(pair[1]);
        // Check NaN 
        if (newSeq.length < 2000 && !(yVal === Infinity || yVal === -Infinity ||
                                      xVal === Infinity || xVal === -Infinity))
        {
          newSeq.push([xVal, yVal]);  
        }
        else {
          break;
        }
      }
    }
    setSequence(newSeq)

    return newSeq;
  }

  function fetchOEIS() {

  // Fetch a random OEIS sequence
  // Pad the beginning with zeros
  let seq : string = String(Math.floor(Math.random()*340000)).padStart(6, '0');
  console.log(`http://oeis.org/A${seq}/b${seq}.txt`);
  $.get( `http://oeis.org/A${seq}/b${seq}.txt`, function( data ) {
    let text : string = data;
    
    // Debugging: print data
    // console.log(text)
    // console.log(sequence)
    
    return parseData(text);
  });
  }

  return (
    <div className="App">
      {sequence && <BarChart width={1500} height={900} data={sequence} usingLinear = {useLinear}></BarChart>}
      <button onClick={fetchOEIS}> New sequence! </button>
      <button onClick={toggleLinearLog}> Linear/log scale </button>

    </div>
  );
}

export default App;
