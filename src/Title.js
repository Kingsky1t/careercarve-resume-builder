import React from "react";

export const Title = ({ formItems, setFormItems, index }) => {
     const [editActive, setEditActive] = React.useState(true);
     const [saveActive, setSaveActive] = React.useState(true);
     const [form, setForm] = React.useState(formItems[index].title);

     const handleSave = (e) => {
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
          setEditActive(true);
          setSaveActive(true);
     };

     return (
          <div
               onChange={() => {
                    setEditActive(true);
               }}>
               <input
                    name='title'
                    type='text'
                    value={form}
                    onChange={(e) => {
                         setForm(e.target.value);
                    }}
                    disabled={editActive && saveActive}
               />
               {editActive && saveActive ? (
                    <button
                         onClick={(e) => {
                              e.preventDefault();
                              setEditActive(false);
                              setSaveActive(false);
                         }}>
                         edit
                    </button>
               ) : (
                    <button
                         onClick={(e) => handleSave(e)}
                         >
                         save
                    </button>
               )}
          </div>
     );
};
