import { useEffect, useRef, useState } from 'react';
import './App.css';
import UserList from './UserList';
import soc from './socket';
import { Socket } from 'socket.io-client';

const App=()=>{
  const [creategroup,setcreategroup]=useState(false);
  const lastmessageref=useRef();
  const [list,setList]=useState([]);
  const [Activeuser,setActiveuser]=useState({name:"",index:-1,isGroup:false,isSet:false});
  const [au,setau]=useState("");
  const [username,setUsername]=useState({name:"",isSet:false});
  //syntax[name:,message:[],online:,isGroup:]    
  //syntax message:{mes:mes,ismine:true}
  //syntax g-message:{mes:mes,ismine:true,owner:""}
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    soc.onAny((event, ...args) => {
      console.log(event, args);
    });
    soc.on("connect_error",(er)=>{
      console.log("err:",er);
      setUsername({name:"",isSet:false});
    });
    soc.on('users',(data)=>{
    // setUsername(prevState=>return({name:prevState.name,isSet:true}));
      if(data.length==0){
      }else{
        setUsers((prevState)=>{
          let k=prevState.slice();
          data.forEach(dat => {
            k.push({name:dat.name,message:[],online:dat.online,isGroup:false})
          });
          console.log(k);
          return k;
        });
        setList(prevState=>{
          let k=prevState.slice();
              data.forEach(dat => {
                  k.push(<div key={dat.name} onClick={activeusersetter.bind(this,dat.name)} className={dat.online?"username--active":"username"}>{dat.name}</div>);
              });
          return k;
      })
      }
    });

    soc.on('new-user',dat=>{
      setUsers((prevState)=>{
        let k;
        console.log("prevstate:",prevState);
        if(!prevState){
          // console.log("PrevStatE:",prevState);
          k=[]
        }
        else{k=prevState.slice();}
        k.push({name:dat.name,message:[],online:dat.online,isGroup:false});
        return k;
      });
      setList(prevState=>{
        let k=prevState.slice();
            k.push(<div key={dat.name} onClick={activeusersetter.bind(this,dat.name)} className={dat.online?"username--active":"username"}>{dat.name}</div>);
        return k;
    });
    });

    //for online /offline
    soc.on('offline',(dat)=>{
      setList(prevState=>{
        let k=prevState.slice();
        for(let i=0;i<k.length;i++){
          if(k[i].key==dat){
            k[i]=(<div key={dat} onClick={activeusersetter.bind(this,dat)} className="username">{dat}</div>)
            console.log(k[i]);
          }
        }
        return k;
      })
    })

    //for online
    soc.on('online',(dat)=>{
      setList(prevState=>{
        let k=prevState.slice();
        for(let i=0;i<k.length;i++){
          if(k[i].key==dat){
            k[i]=(<div key={dat} onClick={activeusersetter.bind(this,dat)} className="username--active">{dat}</div>)
            console.log(k[i]);
          }
        }
        return k;
      })
    })

    //recevice user message.
    soc.on('private-message',(dat,from)=>{
      setUsers(prevState=>{
        let k=prevState.slice();
        let i;
        for(let y=0;y<k.length;y++){
          if(from==k[y].name){
            i=y;
          }
        }
        let p=k[i].message;
        p.push({mes:dat,ismine:false});
        k[i].message=p;
        return k;
      });
    });
    soc.on("error",(er)=>{
      alert(er);
    })
    soc.on('new-group-req',a=>{
      // console.log("new user request",a);
      soc.emit('new-group',a);
    });
    soc.on('room-joined',dat=>{
      console.log("room joined");
      //under progress
      setUsers((prevState)=>{
        let k;
        console.log("prevstate:",prevState);
        if(!prevState){
          // console.log("PrevStatE:",prevState);
          k=[];
        }
        else{k=prevState.slice();}
        k.push({name:dat,message:[],online:false,isGroup:true});
        return k;
      });
      setList(prevState=>{
        let k=prevState.slice();
            k.push(<div key={dat} onClick={activeusersetter.bind(this,dat)} className="group--user">{dat}</div>);
        return k;
    });
    });
    //To get message for group
    soc.on('group-message',(dat,group,sender)=>{
      setUsers(prevState=>{
        let k=prevState.slice();
        let i;
        for(let y=0;y<k.length;y++){
          if(group==k[y].name){
            i=y;
          }
        }
        let p=k[i].message;
        p.push({mes:dat,ismine:false,owner:sender});
        k[i].message=p;
        return k;
      });
    });


    // soc.on("connect_error",(err)=>{
    //   console.log("err:",err);
    //   if(err==="already exist"){
    //     setUsername({name:"",isSet:false});
    //     alert("already exist");
    //   }
    //   else{
    //     alert("something wrong:",err);
    //   }
    // })
  }
  ,[]);
  useEffect(()=>{
    if(au!=""){
      setActiveuser(propState=>{
        let k={...propState};
        
        if(users){
        k.name=au;
        k.isSet=true;
        for(let i=0;i<users.length;i++){
          if(au==users[i].name){
            if(users[i].isGroup){
              k.isGroup=true;
              k.index=i;
              break;
            }else{
              k.index=i;
              k.isGroup=false;
              break;
            }
          }
        }}
        console.log("k:",k);
        return k;
      })
    }
  },[au]);
  useEffect(()=>{
    if(lastmessageref.current){
      lastmessageref.current.scrollIntoView({smooth:true});
    }
  },[lastmessageref.current]);
//  make connecntion with server.
  const userNameDone=(e)=>{
    console.log("[userNameDone]: Called");
    e.preventDefault(); 
    setUsername({name:username.name,isSet:true});
    soc.auth = {'username': username.name };
    soc.connect();
  }
  //taking user input on for username

  const userNameSetter=(e)=>{
    setUsername({name:e.target.value,isSet:false});
  }

  //active user setter .
  const activeusersetter=(dat)=>{
    console.log("[Activeusersetter]",dat);
    setau(dat);  
  }
  const mesSend=(e)=>{
    e.preventDefault();
    let mes=e.target.mes.value;
    console.log(mes,Activeuser.isGroup);
    if(Activeuser.isGroup){
      soc.emit('group-message',mes,Activeuser.name);
      console.log("username@@@:",username.name);
      setUsers(prevState=>{
        let k=prevState.slice();
        let p=k[Activeuser.index].message.slice();
        p.push({mes:mes,ismine:true,owner:""});
        k[Activeuser.index].message=p;
        return k;
      });

    }else{
      soc.emit('private-message',mes,Activeuser.name);
      setUsers(prevState=>{
        let k=prevState.slice();
        let p=k[Activeuser.index].message.slice();
        p.push({mes:mes,ismine:true});
        k[Activeuser.index].message=p;
        return k;
      });
    }
    
  }
  // //Functions to create group:
  const creategroup_signal=(e)=>{
    e.preventDefault();
    setcreategroup(true);
  }
  

  if(!username.isSet){
    return (
      <div className="Username--main">
        <form className="Username--form" onSubmit={userNameDone}>
          <label htmlFor="em" >UserName(Email):</label>
          <input className="text--area" type="email" id="em" onChange={userNameSetter} name="mes" required />
          <button classes="button--height text--bold">Enter</button>
        </form>
      </div>
    );
  }
  let meslist;
  if(Activeuser.isSet&&users){
    if(Activeuser.isGroup){
      meslist=users[Activeuser.index].message.map((dat,index)=>{
        let last= (index==(users[Activeuser.index].message.length-1))
        return(
          <div ref={last?lastmessageref:null} className={dat.ismine?"GMessage--main": "GMessage--oth"}>
                    {dat.ismine?null:(<div className="flex--active">
          <div className="GMessage--main--author">{dat.owner}</div>
          </div>)}
                    <div className="Message--main--content">
                        {dat.mes}</div>
                    <div className="Message--main--time">12:00 pm</div>
              </div>
        )
      })
    }else{
      meslist=users[Activeuser.index].message.map((dat,index)=>{
        let last= (index==(users[Activeuser.index].message.length-1))
        return(
          <div ref={last?lastmessageref:null} className={dat.ismine?"Message--main": "Message--oth"}>
                    <div className="Message--main--content">
                        {dat.mes}</div>
                    <div className="Message--main--time">12:00 pm</div>
              </div>
        )
      })
    }
     
  }
  if(creategroup){
      return (<UserList user={users} g={setcreategroup} soc={soc}/>)
  }
  return (
    <div className="App">
      <div className="title">
        Chat-System{"("+username.name+")"}
      </div>
      <div className="Main--box">
        <div className="Main--box--users">
          <div className="title">Users</div>
          
          {/* <div> New Group </div> */}
          {/* {list?<UserList user={users}/>:<div>not found</div>} */}
          <div className="Main--box--users--list"> 
            {list}
          </div>
          <div className="username" onClick={creategroup_signal}>New group+</div>
        </div>
        <div className="Main--box--chat">
          <div className="title">
            Chat Messages {Activeuser.isSet?Activeuser.name:null}
          </div>
          {/* {Activeuser.isGroup?(
            <div className="flex--active flex--center">
              <div onClick={}>Add</div>
              <div onClick={}>Remove</div>
              <div onClick={}>Delete</div>
            </div>
          ):null} */}
          <div className="Main--box--chat--messagearea">
          {Activeuser.isSet?meslist:
          <div  className="Message--main ">
            <div className="Message--main--content">
                      START TALKING</div>
                  <div className="Message--main--time">12:00 am</div>
            </div>}
          
          {/*<div  className="GMessage--main GMessage--oth">
          <div className="flex--active">
          <div className="GMessage--main--author">Sam</div>
          </div>
          <div className="GMessage--main--content">
                    START TALKING</div>
                <div className="GMessage--main--time">12:00 am</div>
          </div>
          <div  className="Message--main">
          <div className="Message--main--content">
                    START TALKING</div>
                <div className="Message--main--time">12:00 am</div>
          </div>

              <div  className="Message--main Message--oth">
                   <div className="Message--main--content">
                       Talking</div>
                   <div className="Message--main--time">12:00 pm</div>
            </div> */}
          
          </div>
          {Activeuser.isSet?
          <div className="c">
          <form className="cb--bind" onSubmit={mesSend}>
                          <input className="text--area" type="text" id="mes" name="mes" required/>
                          <button classes="button--height text--bold">Enter</button>
          </form>
          
          </div>
          :null}
          

        </div>
      </div>
    </div>
  );
}

export default App;
