import { useEffect, useState } from 'react';
import react from 'react';

const UserList=({isgroup,user,flag,soc,index,name,uname})=>{
      // let group_user=[];
      const [groupuserlist,setgroupuserlist]=useState([]);
      const [defaultlist,setdeafultlist]=useState([]);
      const [defaultlist1,setdeafultlist1]=useState([]);
      
      const [groupmod,setgroupmod]=useState({name:"",isSet:false});
      useEffect(()=>{
        let exi=user[index].groupMember.slice();
        console.log("[UseEffect]:");
        console.log("user:",user,"index:",index);
        setdeafultlist(prevState=>{
            let k=prevState.slice();
            user.map(dat=>{
              console.log(dat.name,dat.online);
              if((!dat.isGroup)&&(dat.online)&&(dat.name!=uname)&&(!isPresent(dat.name,exi))){
                k.push(<div key={dat.name} onClick={addToGroup.bind(this,dat.name)} className={"grouplistname"}>{dat.name}</div>);
              } 
            });
          // console.log("user k:",k);
          return k;
        })
        if(isgroup){
          setdeafultlist1(prevState=>{
            let k=prevState.slice();
            exi.map((element)=>{
                k.push(<div key={element} onClick={addToGroup.bind(this,element)} className={"grouplistname"}>{element}</div>);
            })
            return k;
          });
        }

      },[]);
      const isPresent=(dat,exi)=>{
        let flag=false;
        exi.forEach(element => {
          
          if(dat==element){
            console.log("@@:",dat,element)
            flag=true;
            return true;
          }
        });
        return flag;
      }
    const addToGroup=(dat)=>{
        // e.preventDefault();
        // console.log("[addToGroup]:",dat);
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
            // console.log("filtered list:",k);
          }else{
            // console.log("[addToGroup]: New data");
            k.push(dat);
          }

          return k;
        })
    }
    const try1=(e)=>{
      e.preventDefault();
      let gp_name=name;
      // console.log("User add to group list :",groupuserlist);
      if(groupmod.name=="add"){
        soc.emit('add-to-group',gp_name,groupuserlist,user[index].groupMember);
      }
      else{
      soc.emit('remove-from-group',gp_name,groupuserlist,user[index].groupMember);
      }
      flag(false);
    }
    const leave_delete=(dat,e)=>{
      e.preventDefault();
      soc.emit('leave-from-group',name,[uname],user[index].groupMember);
      flag(false);
    }
    const cancelGroup=(e)=>{
      e.preventDefault();
      // console.log("called");
      flag(false);
    }
    if(groupuserlist){
      let h=groupuserlist.map(dt=>{
        return(<div className="grouplistname">{dt}</div>)
      });
    }
    return (
        <div className="group--main">
        <div className="group--main-box">
          <button className="cancel" onClick={cancelGroup}>☠️❌️Back🚫️☠️</button>
          {groupmod.isSet?(
            <div>
            <div className="grouplistname" onClick={()=>{setgroupmod({name:"",isSet:false});setgroupuserlist([])}}>Back</div>
            <div className="grouplistname" onClick={try1}>Done</div>
            </div>
          ):(
            <div>
              <div className="grouplistname" onClick={()=>setgroupmod({name:"add",isSet:true})}>AddPeople</div>
              <div className="grouplistname"onClick={()=>setgroupmod({name:"remove",isSet:true})}>RemovePeople</div>
              <div className="grouplistname"onClick={leave_delete.bind(this,"leave")}>Leave</div>
            </div>
          )}
          {groupmod.isSet&&(groupmod.name=="add")?(<div className="group--main-box--divider">
            <div className="group--default--list">
              <div className="title__mid">Select Users</div>
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
          </div>):null}{groupmod.isSet&&(groupmod.name=="remove")?<div className="group--main-box--divider">
            <div className="group--default--list">
              <div className="title__mid">Select Users</div>
              <div className="group--users--list">
                {defaultlist1}
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
          </div>:null}
          {/* <div className="group--main-box--divider">
            <div className="group--default--list">
              <div className="title__mid">Select Users</div>
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
           */}
        </div>
      </div>
    );
}
export default UserList;