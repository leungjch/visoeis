import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery'
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';



import Plot from './components/Plot'
function App() {
  let [sequence, setSequence] = useState([[0, 0]]) // Sequence Data
  let [inputSeqID, setinputSeqID] = useState("") // Sequence info (link, description, index)

  let [seqInfo, setSeqInfo] = useState({ index: "000000", description: "Loading...", link: "http://oeis.org" })
  // True if linear y scale, false if log y scale
  let [useLinear, setUseLinear] = useState(true)
  // let [sequence, setSequence] = useState([1,2,3,4,5])

  useEffect(() => {
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

  // Triggers on submit form
  function afterSubmit(event: React.FormEvent<EventTarget>) {
    event.preventDefault();
    fetchOEIS("search");
  }

  // Triggers on click on a dropdown item
  function handleDropdown(eventKey : string) {
    
    setinputSeqID(eventKey);

    fetchOEIS(eventKey);
    
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

  function fetchOEIS(specifySequence: string = "random") {


    // Fetch a random OEIS sequence
    // Pad the beginning with zeros
    var seq: string;
    if (specifySequence === "search") {
      seq = inputSeqID.padStart(6, '0');
    }
    else if (specifySequence === "random") {
      seq = String(Math.floor(Math.random() * 340000)).padStart(6, '0');
    }
    else {
      seq = specifySequence;
    }

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
      error: (function () {
        // If failed, keep searching for another random sequence
        fetchOEIS()

      }),
      // If successful, go to the info page and fetch its description
      // Set set sequence info state
      complete: (function () {
        $.ajax({
          dataType: "text",

          url: `https://desolate-refuge-92417.herokuapp.com/https://oeis.org/search?q=id:A${seq}&fmt=text`,
          success: (function (data) {
            let arr: string = data.split('\n')
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

  const radios = [
    { name: 'Linear', value: true },
    { name: 'Logarithmic', value: false },
  ];

  return (
    <div className="App">
      <h1><a href={seqInfo.link}>A{seqInfo.index}</a></h1>
      <p>{seqInfo.description}</p>
      {sequence && <Plot width={window.innerWidth / 2} height={window.innerHeight * 3 / 4} data={sequence} usingLinear={useLinear}></Plot>}




      <Container fluid style={{ width: "50%", paddingLeft: 0, paddingRight: 0, marginBottom:10}}>
        <Row style={{ paddingLeft: 0, paddingRight: 0, marginBottom:5 }}>
          <Col style={{paddingLeft:0, paddingRight:0}}>

            {/* Generate a new sequence */}
            <Button variant="success" className="btn-block" onClick={() => fetchOEIS()}> New sequence! </Button>
          </Col>
          <Col style={{paddingLeft:1, paddingRight:0}}>
            {/* Toggle logarithmic/linear scale */}
            <ButtonGroup toggle style={{display:"flex"}}>
              {radios.map((radio, idx) => (
                <ToggleButton
                  style={{flex:1, margin:0}}
                  key={idx}
                  type="radio"
                  variant="secondary"
                  name="radio"
                  value={radio.value}
                  checked={useLinear === radio.value}
                  onChange={(e) => setUseLinear(!useLinear)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
          <Col style={{paddingLeft:1, paddingRight:0}}>
                  <Dropdown>
              <Dropdown.Toggle variant="info" 
                                id="dropdown-basic"
                                >
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onSelect={() => handleDropdown("000012")}>1</Dropdown.Item>
                <Dropdown.Item onSelect={() => handleDropdown("005536")}>2</Dropdown.Item>
                <Dropdown.Item onSelect={() => handleDropdown("283979")}>3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col>
            <form onSubmit={afterSubmit}>
              <InputGroup className="mb-3">

                <FormControl
                  placeholder="Enter a sequence number"
                  aria-label="Enter a sequence number"
                  onChange={e => setinputSeqID(e.target.value)}
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary" type="submit">Search</Button>
                </InputGroup.Append>
              </InputGroup>

            </form>
          </Col>
        </Row>

      </Container>

    </div>
  );
}

export default App;
