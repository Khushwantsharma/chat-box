import { useEffect, useState } from 'react';
import './App.css';
import soc from './socket';

const App=()=>{
  soc.connect();
  const [username,setUsername]=useState({name:"",isSet:false});
  useEffect(()=>{
    soc.onAny((event, ...args) => {
      console.log(event, args);
    });
    soc.on("connect_error",(err)=>{
      if(err==="already exist"){
        setUsername({name:"",isSet:false});
        alert("already exist");
      }
    })
  }
    ,[]);
  const userNameDone=(e)=>{
    console.log("[userNameDone]: Called");
    e.preventDefault();
    setUsername({name:username.name,isSet:true});
    soc.auth = {'username': username.name };
    soc.connect();
  }
  const userNameSetter=(e)=>{
    setUsername({name:e.target.value,isSet:false});
  }

  if(!username.isSet){
    return (
      <div className="Username--main">
        <form className="Username--form" onSubmit={userNameDone}>
          <label for="em" >UserName(Email):</label>
          <input className="text--area" type="email" id="em" onChange={userNameSetter} name="mes" required />
          <button classes="button--height text--bold">Enter</button>
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="title">
        Chat-System
      </div>
      <div className="Main--box">
        <div className="Main--box--users">
          <div className="title">Users</div>
          <div className="Main--box--users--list">
            <div className="username">UserLdsdssssasadddddddddist</div>
            <div className="username">UserLdsdssssasadddddddddist</div>
            UserList<br />
            UserList<br />
          </div>
        </div>
        <div className="Main--box--chat">
          <div className="title">
            Chat Messages
          </div>
          <div className="Main--box--chat--messagearea">
          
          <div  className={"Message--main "}>
                <div className="Message--main--content">
                    Hey</div>
                <div className="Message--main--time">12:44 pm</div>
          </div>

          <div  className={"Message--main Message--oth"}>
                <div className="Message--main--content">
                    Hey</div>
                <div className="Message--main--time">12:44 pm</div>
          </div>

          <div  className={"Message--main Message--oth"}>
                <div className="Message--main--content">
                    Heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
                    </div>
                <div className="Message--main--time">12:44 pm</div>
          </div>
              <div>hey</div>
              <div>hey</div>
              <div>hey</div>
              <div>hey</div>
              <div>hey</div>
              <div>hey</div>
              <div>hey</div>
              <div>hey</div>
              <div>hey</div>
              <div>hey</div>
              <div>hey</div>
              <div>hey</div>
              <div>hey</div>
              <div>hey</div>
              <div>hey</div>
            {/* <div className="c">
          <form className="cb--bind" onSubmit={messageSub}>
                          <input className="text--area" type="text" id="mes" onChange={datupdate} name="mes" />
                          <input className="text--area" type="text" id="mes" name="mes" />
                          <button classes="button--height text--bold">Enter</button>
          </form>
          </div> */}
          </div>
          
          <div className="c">
          <form className="cb--bind" >
                          <input className="text--area" type="text" id="mes" name="mes" />
                          <button classes="button--height text--bold">Enter</button>
          </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
