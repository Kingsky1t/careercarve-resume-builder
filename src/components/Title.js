import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import "./Title.css"

export const Title = ({ item, formItems, setFormItems, index }) => {

     const title = formItems[index].title
     const [editing, setEditing] = useState(false);
     const [form, setForm] = useState(title);

     useEffect(()=> {
          setForm(title)
     },[formItems])

     return (
          <div className="title-container">
               <div className="title-form">
                    {editing ? (
                         <input
                              type='text'
                              value={form}
                              onChange={(e) => {
                                   setForm(e.target.value);
                              }}
                         />
                    ) : (
                         <label>{title}</label>
                    )}
               </div>

               <div className="title-buttons">
                    {editing ? (
                         <button
                              
                              onClick={(e) => {
                                   e.preventDefault();
                                   setFormItems((prev) =>
                                        prev.map((item, i) => {
                                             if (index === i) {
                                                  return {
                                                       ...prev[i],
                                                       title: form,
                                                  };
                                             } else {
                                                  return item;
                                             }
                                        })
                                   );
                                   setEditing(false)
                              }}>
                              Save
                         </button>
                    ) : (
                         <button
                         style={{borderRadius:"50%"}}
                              onClick={(e) => {
                                   e.preventDefault();
                                   setEditing(!editing);
                              }}>
                              <BsPencil />
                         </button>
                    )}
               </div>
          </div>
     );
};
