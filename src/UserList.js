import { useEffect, useState } from 'react';
import react from 'react';

const UserList=({user,g,soc})=>{
      // let group_user=[];
      const [groupuserlist,setgroupuserlist]=useState([]);
      const [defaultlist,setdeafultlist]=useState([]);
      useEffect(()=>{
        console.log("useeffect userlist");
        console.log("user:",user);
        setdeafultlist(prevState=>{
            let k=prevState.slice();
            // if(k.length==0){
            user.map(dat=>{
              k.push(<div key={dat.name} onClick={addToGroup.bind(this,dat.name)} className={"grouplistname"}>{dat.name}</div>);
            });
          console.log("user k:",k);
          return k;
        })
      },[]);
      
    const addToGroup=(dat)=>{
        // e.preventDefault();
        console.log("[addToGroup]:",dat);
        setgroupuserlist(prevState=>{
          let k=prevState.slice();
          let flag=0;
          for(let l of k){
            if(l==dat){
              console.log("[addToGroup]: Already present");
              flag=1;
              break;
            } 
          }
          if(flag){
            k=k.filter(dt=>{
              if(dt!=dat){
                return dt;
              }
            });
            console.log("filtered list:",k);
          }else{
            console.log("[addToGroup]: New data");
            k.push(dat);
          }

          return k;
        })
    }
    const try1=(e)=>{
      e.preventDefault();
      let gp_name=e.target.group_name.value;
      console.log("called",gp_name);
      soc.emit('new-group-list',gp_name,groupuserlist);
      g(false);
    }
    const cancelGroup=(e)=>{
      e.preventDefault();
      // console.log("called");
      g(false);
    }
    if(groupuserlist){
      let h=groupuserlist.map(dt=>{
        return(<div className="grouplistname">{dt}</div>)
      });
    }
    return (
        <div className="group--main">
        <div className="group--main-box">
            {/* <form>
              <label htmlFor="user_name">User Name:</label>
              <input type="text" id="user_name"/>
              <button type="submit">Add</button>
          </form> */}
          <button className="cancel" onClick={cancelGroup}>☠️❌️Cancel🚫️☠️</button>
          <form  className="groupname-form" onSubmit={try1}>
              <label htmlFor="group_name">Group Name:</label>
              <input type="text" id="group_name" required/>
              <button type="submit">Create</button>
          </form>
          <div className="group--main-box--divider">
            <div className="group--default--list">
              <div className="title__mid">Select Users</div>
              {/* <div className="grouplistname">user</div> */}
              {/* {defaultlist} */}
              <div className="group--users--list">
                {defaultlist}
              </div>
            </div>
            <div className="group--selected--list">
            <div className="title__mid">Selected Users</div>
            <div className="group--users--list">
                {groupuserlist.map(e=>{
                  return (<div key={e} className="grouplistname">{e}</div>);
                })}
              </div>
            </div>
          </div>
          {/* <div className="group--users--list">
          {defaultlist}
          </div> */}
          

        </div>
      </div>
    );
}
export default UserList;