import { useEffect, useState } from 'react';
import react from 'react';

const UserList=({user})=>{

    const [list,setList]=useState([]);
    useEffect(()=>{
        setList(prevState=>{
            let k=prevState.slice();
            if(prevState.length==0){
                user.forEach(dat => {
                    k.push(<div key={dat.name} className="username">{dat.name}</div>);
                });
            }else{
                k.push(<div key={user[user.length-1].name} className="username">{user[user.length-1].name}</div>);
            }
            return k;
        })
    },[user.length]);

    //for online & offline
    useEffect(()=>{
        //
    });
    return (
        <div className="Main--box--users--list">
            {(user.length>0)?list:<div className="username">No user added</div>}
        </div>
    );
}
export default UserList;