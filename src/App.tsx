import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery'
import BarChart from './components/BarChart'
function App() {
  let [sequence, setSequence] = useState([[0,0],[1,1],[2,2],[3,3]])
  let [seqInfo, setSeqInfo] = useState({index:"0001", description:"Hillo", link:"http://oeis.org"})
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
  console.log(`https://oeis.org/A${seq}/b${seq}.txt`);
  $.get( `https://oeis.org/A${seq}/b${seq}.txt`, function( data ) {
    let text : string = data;

    // Debugging: print data
    // console.log(text)
    // console.log(sequence)
    
    return parseData(text);
  })
  // If successful, go to the info page and fetch its description
  // Set set sequence info state
  .done(function() {
    $.get( `https://oeis.org/search?q=id:A${seq}&fmt=text`, function( data ) {
      let arr = data.split('\n')
      for (let line of arr) {
        // Get only the "%N" tag which is the description
        if (line.substring(0,2) === "%N")
        {
          setSeqInfo({index:seq, link:`https://oeis.org/A${seq}`, description: line.substring(11)})
          console.log("desc", line)
          break;
        }
      }
      
  })})
  // If failed, keep searching for another random sequence
  .fail(function() {
    fetchOEIS()
  })
  }

  return (
    <div className="App">
      <h1><a href={seqInfo.link}>A{seqInfo.index}</a></h1> 
      <p>{seqInfo.description}</p>
      {sequence && <BarChart width={1500} height={900} data={sequence} usingLinear = {useLinear}></BarChart>}
      <button onClick={fetchOEIS}> New sequence! </button>
      <button onClick={toggleLinearLog}> Linear/log scale </button>

    </div>
  );
}

export default App;
