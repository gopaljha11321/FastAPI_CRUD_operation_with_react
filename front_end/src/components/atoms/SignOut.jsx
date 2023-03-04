import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
const SignOut=()=>{
    const history = useNavigate();
    useEffect(()=>
    {
        localStorage.clear();
        history('/');

    })
    return("<></>"); 
}
export default SignOut;