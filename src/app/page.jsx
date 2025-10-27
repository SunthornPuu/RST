"use client"

import React from "react";
import Create from './components/create.jsx'
import Search from './components/search.jsx'
import {fetchData} from './server.js'


const Main=()=>{


  const [c,cHandle]=React.useState(false);
  const [s,sHandle]=React.useState(false);
  const [data,dataHandle]=React.useState([]);
  const [database,databaseHandle]=React.useState([]);

  React.useEffect(()=>{
    fetchData(databaseHandle);
    fetchData(dataHandle);
  },[]);


  function cToggle(){
    cHandle(!c);
  }
  function sToggle(){
    sHandle(!s);
  }
  return(<div>
    <div className="bg-white h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-row items-center gap-8">
        <p className="text-4xl font-serif">RST admin</p>
        <img src='/logo.jpeg' className="h-15 aspect-square" />
      </div>
      <br/>
      <div className="bg-stone-300 w-60 h-40 flex flex-col items-center justify-center gap-6">
        <button className="button1"onClick={cToggle}>Create</button>
        <button className="button1"onClick={sToggle}>Search</button>
      </div>
    </div>
    <Create isOpen={c} onClose={cToggle} olddata={database} dataHandle={databaseHandle}/>
    <Search isOpen={s} onClose={sToggle} data={data} dataHandle={dataHandle} database={database}/>
  </div>)
  

}
export default Main;