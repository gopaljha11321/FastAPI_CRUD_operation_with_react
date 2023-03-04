import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import api from "../components/conf/axios";
import "./style.css";
const initialValues = {
  login_email: "",
  login_password: "",
  register_password: "",
  register_name: "",
  register_email: "",
  save: false,
  condition: false,
};
const override = {
  display: "flex",
  margin: "auto auto",
  height: "750px",
  borderColor: "red",
};

const pass=()=>
{
  const class_icon=document.getElementsByTagName('i');
  const login_password=document.getElementById('login_password');
  if(class_icon[0].className==="fa fa-eye-slash")
  {
    login_password.type="password";
    class_icon[0].className="fa fa-eye"
  }
  else{
    login_password.type="text";
    class_icon[0].className="fa fa-eye-slash"
  }
}
const pass1=()=>
{
  const class_icon=document.getElementsByTagName('i');
  const login_password=document.getElementById('register_password');
  if(class_icon[1].className==="fa fa-eye-slash")
  {
    login_password.type="password";
    class_icon[1].className="fa fa-eye"
  }
  else{
    login_password.type="text";
    class_icon[1].className="fa fa-eye-slash"
  }
}
const Term=()=>
{
  return (<h1 className="Reminder" style={{marginTop:"27px"}}>I agree to the terms and condition</h1>)
}
const Home = () => {
  
  const history = useNavigate();
  const { values, setValues, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
  });

  const [x, setX] = useState(document.getElementById("login"));
  const [y, setY] = useState(document.getElementById("register"));
  const [z, setZ] = useState(document.getElementById("btn"));
  const [error,setError]=useState("")
  const [loading, setLoading] = useState(true);
  const [registerPage, setregisterPage] = useState(false);

  useEffect(() => {
    document.title="Welcome";
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setLoading(true);
  }, []);
  function register() {
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
  }
  function login() {
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
  }
  useEffect(() => {
    if(localStorage.getItem("id")!=null&& localStorage.getItem("save")==="enable")
    {
      history('/dashboard');
    }
    setX(document.getElementById("login"));
    setY(document.getElementById("register"));
    setZ(document.getElementById("btn"));
    if((x||y||z) &&(registerPage))
    {
      register();
    }
  });
  const loginCheck = async() => {
    
    const data={
    email:values.login_email,
    password:values.login_password
    }
    if(data.email==="")
   {
    setError("Please Enter Email")
   }
   else if(data.password==="")
   {
    setError("Please Enter Password")
   }
  else{
  if(values.save===false)
  {
    localStorage.setItem("save","disable");
  }
  else
  {
  localStorage.setItem("save","enable");
  }
  api.post("/login",data).then((res)=>
    {
      setLoading(false)
      if(res.data?.res_code)
      {
        localStorage.setItem("id",res.data.id)
        localStorage.setItem("auth",res.data.auth)
        api.defaults.headers.common['Authorization']=res.data.auth;
        history('/dashboard');
      }
      else{
        setError(res.data.error)
      } 
    })
    await setTimeout(() => {
      setLoading(false);
    }, 10000);
    setLoading(true);
    setError("Server Down")
  }
   
  };
  const registerCheck = async() => {
   const data={
      email:values.register_email,
      password:values.register_password,
      name:values.register_name
   }
   if(data.name==="")
   {
    setError("Please Enter Name")
   }
   else if(data.email==="")
   {
    setError("Please Enter Email")
   }
   else if(data.password==="")
   {
    setError("Please Enter Password")
   }
   
  else if(values.condition)
    {
      api.post("/register",data).then((res)=>
      {
        if(res.data.res_code!=1)
        {
          setError(res.data.err)
        }
        else{
          alert("We will contect you soon!!")
          setValues({...values,login_email: "",
  login_password: "",
  register_password: "",
  register_name: "",
  register_email: "",
  save: false,
  condition: false})
          setError("");
        }
      });
      await setTimeout(() => {
        setLoading(false);
      }, 1000);
      setLoading(true);
      setregisterPage(true);
      setError("Server Down")
    }
    else if(!values.condition){
      setError("Please Accept Condition")
    }
    
  };
  return (
    <>
    <div className="test">
      {loading ? (
        <HashLoader
          color={"#F37A24"}
          loading={loading}
          size={50}
          cssOverride={override}
        />
      ) : (
        <div>
          <div className="form-box">
            <div className="button-box">
              <div id="btn"></div>
              <button type="button" className="toggle-btn" onClick={login}>
                Login
              </button>
              <button type="button" className="toggle-btn" onClick={register}>
                Register
              </button>
            </div>
            <div id="login" className="input-group">
            <div style={{textAlign:"center",color:"red", width:"100%"}}>{error}</div>
              <input
                type="text"
                id="login_email"
                className="input-field"
                placeholder="Email"
                required
                onChange={handleChange}
                value={values.login_email}
              />
              <i className="fa fa-eye" id="eye" onClick={pass}></i> 
              <input
                type="password"
                id="login_password"
                className="input-field1"
                placeholder="Password"
                onChange={handleChange}
                value={values.login_password}
                required
              />
              
              <input
                type="checkbox"
                id="save"
                className="check-box"
                onChange={handleChange}
                value={values.save}
              />
              <div className="Reminder" style={{marginTop:"27px"}}>Remember Password</div>
              <button type="submit" className="sb" onClick={loginCheck}>
                <div className="bg">Login</div>
              </button>
            </div>
            <div className="icons">
              <img src="download (3).png" />
              <img src="download (2).png" />
              <img src="download (1).png" />
            </div>

            <div id="register" className="input-group">
            <div style={{textAlign:"center",color:"red", width:"100%"}}>{error}</div>
              
              <input
                type="text"
                className="input-field"
                placeholder="Full Name"
                required
                id="register_name"
                onChange={handleChange}
                value={values.register_name}
              />
              <input
                type="text"
                className="input-field"
                placeholder="Email"
                required
                id="register_email"
                onChange={handleChange}
                value={values.register_email}
              />
              <i className="fa fa-eye" id="eye" onClick={pass1}></i>
              <input
                type="text"
                className="input-field1"
                placeholder="Password"
                id="register_password"
                required
                onChange={handleChange}
                value={values.register_password}
              />
              <input
                type="checkbox"
                id="condition"
                className="check-box"
                onChange={handleChange}
                value={values.condition}
              />
              <Term></Term>
              <button type="submit"onClick={registerCheck}>
              <div className="bg">Register</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};
export default Home;
