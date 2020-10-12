import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery'
import Plot from './components/Plot'
function App() {
  let [sequence, setSequence] = useState([[0, 0]])
  let [seqInfo, setSeqInfo] = useState({ index: "000000", description: "Loading...", link: "http://oeis.org" })
  // True if linear y scale, false if log y scale
  let [useLinear, setUseLinear] = useState(true)
  // let [sequence, setSequence] = useState([1,2,3,4,5])

  useEffect( () => {
    fetchOEIS();
  }, [])

  function toggleLinearLog() {
    if (useLinear) {
      setUseLinear(false);
    } else {
      setUseLinear(true);
    }
    return useLinear
  }

  // Parses and cleans the b-file .txt
  // Returns two lists xList and yList
  function parseData(text: string) {
    let newSeq: number[][] = [];

    let arr = text.split('\n');
    for (let line of arr) {
      if (/^\d+$/.test(line[0])) {
        let pair = line.split(" ");
        // console.log("x", parseInt(pair[0]), "y", parseInt(pair[1]));

        let xVal: number = parseInt(pair[0]);
        let yVal: number = parseInt(pair[1]);
        // Check NaN 
        if (newSeq.length < 2000 && !(yVal === Infinity || yVal === -Infinity ||
          xVal === Infinity || xVal === -Infinity)) {
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
    let seq: string = String(Math.floor(Math.random() * 340000)).padStart(6, '0');
    $.ajax({
      url: `https://desolate-refuge-92417.herokuapp.com/https://oeis.org/A${seq}/b${seq}.txt`,

      dataType: "text",
      success: (function (data) {
        let text: string = data;

        // Debugging: print data
        // console.log(text)
        // console.log(sequence)

        return parseData(text);
      }),
      // error: (function () {
        // If failed, keep searching for another random sequence
        // fetchOEIS()

      // }),
      // If successful, go to the info page and fetch its description
      // Set set sequence info state
      complete: (function () {
        $.ajax({
          dataType: "text",

          url: `https://desolate-refuge-92417.herokuapp.com/https://oeis.org/search?q=id:A${seq}&fmt=text`,
          success: (function (data) {
          let arr : string = data.split('\n')
          for (let line of arr) {
            // Get only the "%N" tag which is the description
            if (line.substring(0, 2) === "%N") {
              setSeqInfo({ index: seq, link: `https://oeis.org/A${seq}`, description: line.substring(11) })
              console.log("desc", line)
              break;
            }
          }

        })
      })

    })
  })

  }

  return (
    <div className="App">
      <h1><a href={seqInfo.link}>A{seqInfo.index}</a></h1>
      <p>{seqInfo.description}</p>
      {sequence && <Plot width={window.innerWidth/2} height={window.innerHeight*3/4} data={sequence} usingLinear={useLinear}></Plot>}
      <button onClick={fetchOEIS}> New sequence! </button>
      <button onClick={toggleLinearLog}> Linear/log scale </button>

    </div>
  );
}

export default App;
