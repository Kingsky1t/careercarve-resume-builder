import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";

export const Title = ({ item, formItems, setFormItems, index }) => {

     const title = formItems[index].title
     const [editing, setEditing] = useState(false);
     const [form, setForm] = useState(title);

     useEffect(()=> {
          setForm(title)
     },[formItems])

     return (
          <div>
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
                         onClick={(e) => {
                              e.preventDefault();
                              setEditing(!editing);
                         }}>
                         <BsPencil />
                    </button>
               )}
          </div>
     );
};
