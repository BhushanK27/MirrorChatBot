import './App.css';
import logo from "./images/chatbot.jpg"
import React, { useState,useEffect,useRef } from 'react'

function App() {
  const [usermsg, setuserMsg] = useState([]);
  const [msg, setMsg] = useState("");
  const displayref = useRef(null);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('user'))
    if (savedMessages !== null) {
      setuserMsg(savedMessages)
    }
  }, []);

  const scrollToBottom = () => {
    displayref.current.scrollIntoView({ behavior: "smooth", block: "end"});
  };
  useEffect(scrollToBottom, [msg]);

  const handleKeyPress=(event)=> {
    if(event.key==='Enter' || event.keyCode===13)
    {
      // console.log("Enter pressed")
      displayer();
    }
  }

  const displayer = () => {
    if ((msg !== "" && msg !== " ") || msg.length < 0)
    { 
      usermsg.push(msg)
    }
      // console.log(usermsg)
      setMsg("")
      localStorage.setItem('user', JSON.stringify(usermsg))
      
  }

  return (
    <div className="App">
      <div className="main">

        <div id="Header">
          <img src= {logo} alt="chatbot logo" />
          <p id={"headertxt"}>ChatBot
            <button id={'clear'} onClick={() => { localStorage.removeItem("user"); setuserMsg([]);}}>Reset</button>
          </p>
        </div>

        <div className='display'  >
          <div className='ul' ref={displayref}>
            {
              usermsg.length > 0 &&
              usermsg.map((item, i) => (
                <>

                  <div id={"user"} key={i}>
                    {item}
                  </div> <br/>
                  <div id={'bot'} >{item} </div>
                  <br />
                
                </>
              ))
            }
          </div>
        </div>

      </div>
      <div id='Footer'>
        <input id="msg" autoComplete='off' placeholder="Type here..." value={msg} onChange={(e) => setMsg(e.target.value)} onKeyPress={handleKeyPress}></input>{" "}
        <button id={'send'}
        onClick={displayer}>Send</button>
      </div>
    </div>
  );
}

export default App;