import React, { useEffect, useRef, useState } from "react";
import { data } from "./data";
import "./App.css";
import { Title } from "./Title";
import { FiMenu } from "react-icons/fi";
import { GoInfo } from "react-icons/go";
import { Switch } from "./Switch";

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

     const handleActive = (i) => {
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
          // duplicate items
          let _formItems = [...formItems];
          // remove and save the dragged item content
          const draggedItemContent = _formItems.splice(dragItem.current, 1)[0];
          // switch the position
          _formItems.splice(dragOverItem.current, 0, draggedItemContent);
          // reset our variables
          dragItem.current = null;
          dragOverItem.current = null;
          // update the state
          setFormItems(_formItems);

     };
     console.log(formItems);

     return (
          <form style={{ padding: "5rem" }} className='container'>
               {formItems.map((item, index) => (
                    <div
                         key={index}
                         aria-disabled={item.active}
                         draggable
                         className={
                              item.active ? "form-items" : "form-items disabled"
                         }
                         onDragStart={(e) => {
                              dragItem.current = index;
                         }}
                         onDragEnter={(e) => {
                              dragOverItem.current = index;
                         }}
                         onDragEnd={handleSort}
                         onDragOver={(e) => e.preventDefault()}>

                         <div className='item-left-section'>
                              <div>
                                   <FiMenu />
                              </div>

                              <div
                                   data-index={index}
                                   onClick={(e) => {
                                        handleShow(e);
                                   }}
                                   style={{ zIndex: "2", padding: "0.2rem" }}>
                                   <GoInfo />
                              </div>

                              <Title
                                   item={item}
                                   formItems={formItems}
                                   setFormItems={setFormItems}
                                   index={index}
                              />
                         </div>

                         {/* disabled switch */}
                         <div className='item-right-section'>
                              <Switch
                                   handleActive={handleActive}
                                   index={index}
                              />
                         </div>

                         {item.show && <input type='text' />}
                    </div>
               ))}
          </form>
     );
};
