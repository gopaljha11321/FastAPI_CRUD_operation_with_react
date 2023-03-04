import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../conf/axios";
import env from "../conf/env";
import './header.css';
const Header = (props) => {
  const history = useNavigate();
  const [profileImg,setProfileImg]=useState("");
  const[profileImgStatue,setProfileImgStatus]=useState(false);
  const [profile,setProfile]=useState(false);
  const signOut=()=>
  {
    history('/Signout')
  }
  useEffect(()=>
  {
    if(localStorage.getItem("save")!="enable")
    {
    window.onbeforeunload = function() {
      localStorage.clear();
   }
  }
    const user=localStorage.getItem("id");
    api.get("/profile_image?user="+user).then((res)=>
    {
      if(res!="error occure")
      {
        setProfileImg(env[process.env.NODE_ENV]?.appServer+"profile_image?user="+user+"&auth=false")
        setProfileImgStatus(true);
      }
    })
    if(props?.page)
    {
      const data=document.getElementById(props.page);
      data.style.fontWeight="700";
      data.style.cursor="auto";
      data.style.color="black"
    }
    if(profile===true)
    {
      setProfile(props.profile);
      const data=document.getElementById('state');
      data.style.opacity=1;
      props.changeProfile();
    }
  })
  const profile1=()=>{
    setProfile(true);
    const data=document.getElementById('state');
    data.style.opacity=1;
  }
  const fileChange= async(event)=>
  {
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
     }
     const user=localStorage.getItem("id");
    const data=new FormData();
    data.append('image',event.target.files[0]);
    data.append("id",user);
    await api.post("/upload_profile_image",data,config).then((res,err)=>
    {
      if(err)
      {
        return ;
      }
    })
    api.get("/profile_image?user="+user).then((res)=>
    {
      if(res!="error occure")
      {
        setProfileImgStatus(false);
        setProfileImg(env[process.env.NODE_ENV]?.appServer+"profile_image?user="+user+"&auth=false")
       
      }
    })
    
  }
  return ( 
    <>
    {profile?<>
    <div id="container1" >
      <div className="image" align="center"style={{fontFamily:"arial,sans-serif",width:"100%",height:"100%"}}>{profileImgStatue?<img src={profileImg} width="200px" height="200px" style={{clipPath:"circle(40%)"}} alt="user_image"/>:<img src="user_icon.webp" width="200px" height="200px"style={{clipPath:"circle(40%)"}} alt="user_image"/>}
      <div id ="edit_image" style={{overflow: "hidden",position:"relative",width:"100px"}}><input type="file" name="profile" id="inputWrapper" onChange={fileChange}  accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"/><img src="edit.png" style={{position:"relative",top:"-66px",zIndex:"350"}} width="42px"/></div>
      <div style={{fontWeight:"700",color:"black",position:"relative",top:"-70px",zIndex:"400"}}>{props.name}</div>
      <div style={{borderBottom:"1px  solid grey",position:"relative",top:"-70px", paddingBottom:"30px",fontWeight:"500",color:"grey"}}>{props.email}</div>
      <div className="button" style={{marginTop:"25px",position:"relative",top:"-75px"}}><button type="submit" style={{border:"1px grey solid", borderRadius:"10px", width:"100px", height:"40px",fontWeight:"500",cursor:"pointer"}} className="btn1" onClick={signOut}>Sign out</button></div>
      </div>
      
    </div>
    </>    
    :""}
    <div id="state" style={{
    zIndex:"1"
    }}>
     <nav  className="navbar navbar-expand-lg navbar-light" style={{backgroundImage:"linear-gradient(90deg,skyblue 80%,purple )",zIndex:"100"}}>
  <a className="navbar-brand " style={{color:"white"}} href="#">{props.name}</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/dashboard" id="Home_page" style={{cursor:"pointer",color:"White"}} >Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" id="Image_page" to="/image" style={{cursor:"pointer",color:"White"}} >Images <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/report" id="Report_page" style={{cursor:"pointer",color:"White"}} >Report <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/about" id="About_page" style={{cursor:"pointer",color:"White"}} >About <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/signOut" style={{cursor:"pointer",color:"White"}} >Sign Out <span className="sr-only">(current)</span></Link>
      </li>
    </ul>
    {profileImgStatue?<img src={profileImg} alt="user image" style={{clipPath:"circle(40%)", cursor:"pointer"}} onClick={profile1} width="50px" height="50px" />:<img src="user_icon.webp" alt="user image" style={{clipPath:"circle(40%)", cursor:"pointer"}} onClick={profile1} width="50px" height="50px" />}
  </div>
</nav>
</div>
</>
);
};
export default Header;
