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
      
    const addToGroup=(e,dat)=>{
        e.preventDefault();
        console.log(dat);
    }
    const try1=(e)=>{
      e.preventDefault();
      console.log("called");
      g(false);
    }
    return (
        <div className="group--main">
        <div className="group--main-box">
            {/* <form>
              <label htmlFor="user_name">User Name:</label>
              <input type="text" id="user_name"/>
              <button type="submit">Add</button>
          </form> */}
          
          <form  className="groupname-form" onSubmit={try1}>
              <label htmlFor="group_name">Group Name:</label>
              <input type="text" id="group_name" required/>
              <button type="submit">Create</button>
          </form>
          <div className="group--main-box--divider">
            <div className="group--default--list">dd</div>
            <div className="group--selected--list">rr</div>
          </div>
          {/* <div className="group--users--list">
          {defaultlist}
          </div> */}
          

        </div>
      </div>
    );
}
export default UserList;