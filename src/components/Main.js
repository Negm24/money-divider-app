// ........................................RULES..............................................

// All Id's MUST have first capitalized letter.
// All Classes MUST have first small letter, but Capitalized after each word.

// .....................................End of Rules..........................................
import React, { useState, useEffect } from 'react';
import { Button, Fade } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Main.css';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

function usePageViews() {
    const location = useLocation();
    useEffect(() => {
      ReactGA.pageview(location.pathname + location.search);
    }, [location]);
  }

export default function Main() {

    usePageViews();

    // const userScreenHeight = window.innerHeight;
    // const userScreenWidth = window.innerWidth;

    // .......................................................................................................

    const [notSubmitted, setSubmitted] = useState(false);

    const initialInputValues = []
    
    const [inputCount, setInputCount] = useState(0);
    const [inputValues, setInputValues] = useState(initialInputValues);
    const [VATValue, setVATinput] = useState(0);
    const [showPLaceholder, setShowPlaceholder] = useState(true);


    const handleNameInputChange = (index, stringValue) => {
        const newInputValues = [...inputValues];
        newInputValues[index].name = stringValue;
        setInputValues(newInputValues)
        
    }

    const handlemoneyValueInputChange = (index, numberValue) => {
        const newInputValues = [...inputValues];
        newInputValues[index].moneyValue = numberValue;
        setInputValues(newInputValues);
    }

    const handleVAT = (e) => {
        setVATinput(e.target.value);
    }

    const handleCheckboxChange = (index) => {
        const newInputValues = [...inputValues];
        newInputValues[index].checked = !newInputValues[index].checked;
        setInputValues(newInputValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setInputValues(Array.from({length: inputCount}, () => ({name: '', moneyValue: 0, checked: false})));
        setSubmitted(true);
        setShowPlaceholder(true);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter'){
            handleSubmit(e);
        }
    }

    const ResetButton = () => {
        // setInputCount(0);
        setVATinput(0);
        setInputValues(initialInputValues);
        setSubmitted(false);
        setShowPlaceholder(false);
    }

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        inputValues.forEach( (value) => {
        totalPrice += parseFloat(value.moneyValue) + parseFloat(VATValue / inputCount);
        } );
        return totalPrice.toFixed(2);
    };
    

  return (
    <>
    <div id='Grided'>
        <div id='titleContainer'>
            <div className='title'>
                SPLI
            </div>
            <div className='title'>
                TTER
            </div>
        </div>
        <div id='MainAppContainer'>
            <div id='SidesContainer'>
                <div id='LeftSided'>
                    <div id='inputNumberOfPeople'>
                        <legend>Number Of People</legend>
                        <input type='number' value={inputCount} onChange={(e) => setInputCount(parseInt(e.target.value))} onKeyPress={handleKeyPress} />
                        <Button type='Submit' onClick={handleSubmit}>Submit</Button>
                    </div>

                    <div id='InputsAdded'>
                        {inputValues.map((value, index) => (
                            <div className='individualInputs'>
                                <h3>Amigo {index + 1}</h3>

                                <div>
                                    <label>Name:</label>
                                    <input type='text' key={index} value={value.name} onChange={(e) => handleNameInputChange(index, e.target.value)} />
                                </div>
                                <div>
                                    <label>Value:</label>
                                    <input type='number' key={index} value={value.moneyValue} onChange={(e) => handlemoneyValueInputChange(index, parseFloat(e.target.value))} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div id='VATContainer'>
                        <legend>VAT Amount</legend>
                        <div className='input-wrapper'>
                            <input type='number' value={VATValue} onChange={handleVAT} />
                        </div>
                        <div className='placeholder' id='placeholder'>EGP</div>
                    </div>
                </div>

                <div id='RightSided'>
                    <div className='RightSidedResultsContainer'>
                        <div id='ResultText'>
                            Results
                        </div>

                        <div className='results'>
                            {inputValues.map((value, index) => (
                                <div className='individualResults'>          
                                    <div className='individualDetails'>
                                        <div class="checkbox-wrapper-15">
                                            <input className="inp-cbx" id={`cbx-${index}`} type="checkbox" style={{display: "none"}} onChange={(e) => handleCheckboxChange(index, e.target.value)} value={value.checked} />
                                            <label className="cbx" htmlFor={`cbx-${index}`}>
                                                <span>
                                                    <svg width="12px" height="10px" viewBox="0 0 24 18">
                                                        <polyline points="1 5 4 8 11 1"></polyline>
                                                    </svg>
                                                </span>
                                                <span>{value.name}'s Total:</span>
                                            </label>
                                        </div>


                                    </div>

                                    <div className= {value.checked ? 'individualDetails indDetAfterChecked': 'individualDetails'}>
                                        {parseFloat((value.moneyValue) + (VATValue / inputCount)).toFixed(2) } EGP
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='rightSidedTotalPrice'>
                        {!notSubmitted ? "" :
                        
                        <div>
                            <h1>Total Price:</h1>
                            <span>{calculateTotalPrice()}</span>
                        </div>
                        
                        }
                    </div>

                    <div className='RightSidedResultsContainer'>
                        <Button onClick={ResetButton}>Reset</Button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    </>
  )
}
