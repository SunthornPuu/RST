import React from "react";
import search from "./searchEngine.js" 

const Main = ({ dataHandle ,database }) => {

  console.log("database in engine: ",database);

  const [form, formHandle] = React.useState({
    name: "",
    seller: "",
    xI: "",
    yI: "",
    zI: "",
    xCm: "",
    yCm: "",
    zCm: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    formHandle(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function proceed(e) {
    e.preventDefault();

    const cleanForm = {
      name: form.name.trim() || "none",
      seller: form.seller.trim() || "none",
      xI: form.xI === "" ? -1 : parseFloat(form.xI),
      yI: form.yI === "" ? -1 : parseFloat(form.yI),
      zI: form.zI === "" ? -1 : parseFloat(form.zI),
      xCm: form.xCm === "" ? -1 : parseFloat(form.xCm),
      yCm: form.yCm === "" ? -1 : parseFloat(form.yCm),
      zCm: form.zCm === "" ? -1 : parseFloat(form.zCm),
    };
    //console.log(cleanForm);
//     await search(cleanForm);
    dataHandle(await search(cleanForm,database));
    //console.log(await search(cleanForm));
  }

  return (
    <div className="h-1/5 w-full flex items-center justify-center">
      <form onSubmit={proceed} className="flex flex-row h-full w-11/12">
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <div className="flex flex-row items-center gap-2">
            <p className="header1">Name:</p>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form1"
              type="text"
            />
            <p className="header1">Supplier:</p>
            <input
              name="seller"
              value={form.seller}
              onChange={handleChange}
              className="form1"
              type="text"
            />
          </div>

          <div className="flex flex-row items-center gap-10 mx-auto">
            <p className="header1">Width (in):</p>
            <input name="xI" value={form.xI} onChange={handleChange} className="form2" type="number" />
            <p className="header1">Height (in):</p>
            <input name="yI" value={form.yI} onChange={handleChange} className="form2" type="number" />
            <p className="header1">Depth (in):</p>
            <input name="zI" value={form.zI} onChange={handleChange} className="form2" type="number" />
          </div>

          <div className="flex flex-row items-center gap-10 mx-auto">
            <p className="header1">Width (cm):</p>
            <input name="xCm" value={form.xCm} onChange={handleChange} className="form2" type="number" />
            <p className="header1">Height (cm):</p>
            <input name="yCm" value={form.yCm} onChange={handleChange} className="form2" type="number" />
            <p className="header1">Depth (cm):</p>
            <input name="zCm" value={form.zCm} onChange={handleChange} className="form2" type="number" />
          </div>
        </div>
        <button type="submit" className="h-2/3 my-auto bg-stone-100 border-2 border-stone-600 font-bold font-mono rounded">Search</button>
      </form>
    </div>
  );
};

export default Main;
