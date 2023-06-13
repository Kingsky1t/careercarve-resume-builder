import React, { useEffect, useRef, useState } from "react";
import { data } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { Title } from "./Title";

export const App = () => {
     const [detectChange, setDetectChange] = useState(false);
     const [titleChange, setTitleChange] = useState("");
     const [formItems, setFormItems] = useState([]);
     useEffect(() => {
          setFormItems(
               data.map((item) => ({
                    title: item,
                    active: true,
                    show: false,
                    save: false,
               }))
          );
     }, []);

     const handleSave = () => {};

     const handleActive = (e) => {
          let i = Number(e.target.getAttribute("data-index"));
          setFormItems((prev) =>
               prev.map((item, index) => {
                    if (index === i) {
                         return {
                              ...prev[i],
                              active: !prev[i].active,
                         };
                    } else {
                         return item;
                    }
               })
          );
     };

     const handleShow = (e) => {
          let i = Number(e.target.getAttribute("data-index"));
          setFormItems((prev) =>
               prev.map((item, index) => {
                    if (index === i) {
                         return {
                              ...prev[i],
                              show: !prev[i].show,
                         };
                    } else {
                         return item;
                    }
               })
          );
     };

     const dragItem = useRef(null);
     const dragOverItem = useRef(null);
     const handleSort = () => {
          let _formItems = [...formItems];
          const draggedItemContent = _formItems.splice(dragItem.current, 1)[0];
          _formItems.splice(dragOverItem.current, 0, draggedItemContent);
          dragItem.current = null;
          dragOverItem.current = null;
          setFormItems(_formItems);
     };
     console.log(formItems);
     return (
          <form style={{ padding: "5rem" }}>
               {formItems.map((item, index) => (
                    <div
                         className={
                              item.active ? "form-items" : "form-items disabled"
                         }
                         key={index}>
                         <div
                              aria-disabled={formItems[index].active}
                              className='item-left-section'
                              draggable
                              onDragStart={(e) => {
                                   dragItem.current = index;
                              }}
                              onDragEnter={(e) => {
                                   dragOverItem.current = index;
                              }}
                              onDragEnd={handleSort}
                              onDragOver={(e) => e.preventDefault()}>
                              <FontAwesomeIcon
                                   icon={faBars}
                                   className='move-icon'
                              />

                              <div
                                   data-index={index}
                                   onClick={(e) => {
                                        handleShow(e);
                                   }}
                                   style={{ zIndex: "2", padding: "0.2rem" }}>
                                   i
                              </div>

                              <Title
                                   formItems={formItems}
                                   setFormItems={setFormItems}
                                   index={index}
                              />
                         </div>
                         <div className='item-right-section'>
                              <button
                                   className='abled'
                                   data-index={index}
                                   onClick={(e) => {
                                        e.preventDefault();
                                        handleActive(e);
                                   }}>
                                   Disable
                              </button>
                         </div>
                         {item.show && <input type='text' />}
                    </div>
               ))}
          </form>
     );
};
