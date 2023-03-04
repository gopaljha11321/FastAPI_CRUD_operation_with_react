import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { main } from './routes/main.routes';
const App = () => {
  function onUserNavigate() {
    let idleTime = getCurrentTime() - getPreviousNavTime();
    storeCurrentNavTime();
    console.log(idleTime)
    if (idleTime > 1)
        window.location.href = '/Signout';
}
  return (  
    <>
    <BrowserRouter>
      <Routes>
       {main.map((route,index)=>
       {
        const Component=route.component;
        return(
          <Route key={index} path={route.path} element={<Component/>} onEnter={onUserNavigate} onChange={onUserNavigate}>
        </Route>
        )
       })}
      <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
   </>
  );
}
export default App