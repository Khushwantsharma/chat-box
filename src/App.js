import logo from './logo.svg';
import './App.css';

function App() {
  // if(true){
  //   return(
  //     <div className="App">
  //     <form className="username-area" onSubmit={userNameDone}>
  //                           <label for="em" >UserName(Email):</label> 
  //                           <input className="text--area" type="email" id="em" onChange={userNameupdate} name="mes" required/>
  //                           <button  classes="button--height text--bold">Enter</button>
  //     </form>  
  //   </div>
  // );
  // }

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
            UserList<br />
            UserList<br />
            UserList<br />
            UserList<br />
            UserList<br />
            UserList<br />
            UserList<br />
            UserList<br />
            UserList<br />
            UserList<br />
            UserList<br />
            UserList<br />
            UserList<br />
            UserList<br />
            UserList<br />
            
            as
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
