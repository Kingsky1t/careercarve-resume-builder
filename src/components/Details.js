import React, { useEffect, useState } from "react";
import "./Details.css";

export const Details = ({ item, formItems, setFormItems, index, handleShow }) => {
     const description = item.description;
     const [form, setForm] = useState(description);

     useEffect(() => {
          setForm(description);
     }, [formItems]);



     return (
          <div className="details">
               <input type='text' placeholder={`Add ${item.title}`} value={form} onChange={(e)=> {setForm(e.target.value)}} />

               <button onClick={(e) => {
                                   e.preventDefault();
                                   setFormItems((prev) =>
                                        prev.map((item, i) => {
                                             if (index === i) {
                                                  return {
                                                       ...prev[i],
                                                       description: form,
                                                  };
                                             } else {
                                                  return item;
                                             }
                                        })
                                   );
                                   handleShow(index)
                              }}>Save</button>
          </div>
     );
};
