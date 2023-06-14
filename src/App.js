import React, { useEffect, useRef, useState } from "react";
import { data } from "./data";
import "./App.css";
import { Title } from "./components/Title";
import { FiMenu } from "react-icons/fi";
import { GoInfo } from "react-icons/go";
import { Switch } from "./components/Switch";
import { Details } from "./components/Details";

export const App = () => {
     const [formItems, setFormItems] = useState([]);
     useEffect(() => {
          setFormItems(
               data.map((item) => ({
                    title: item,
                    active: true,
                    show: false,
                    save: false,
                    description: "",
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

     const handleShow = (i) => {
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

     return (
          <form className='container'>
               <h2 style={{ textAlign: "center" }}>Select your sections</h2>
               {formItems.map((item, index) => (
                    <div className='form-container'>
                         <div
                              key={index}
                              aria-disabled={item.active}
                              draggable
                              className={
                                   item.active
                                        ? "form-items"
                                        : "form-items disabled"
                              }
                            
                              onDragStart={(e) => {
                                   dragItem.current = index;
                              }}
                              onDragEnter={(e) => {
                                   dragOverItem.current = index;
                              }}
                              onDragEnd={handleSort}
                              // onDragOver={(e) => e.preventDefault()}
                         >
                              <div className='item-left-section'>
                                   <div>
                                        <div className='move-icon'>
                                             <FiMenu />
                                        </div>
                                        <div
                                             onClick={() => {
                                                  handleShow(index);
                                             }}>
                                             <GoInfo />
                                        </div>
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
                         </div>
                         {item.show && (
                              <Details
                                   item={item}
                                   formItems={formItems}
                                   setFormItems={setFormItems}
                                   index={index}
                                   handleShow={handleShow}
                              />
                         )}
                    </div>
               ))}

               <button
                    onClick={(e) => {
                         e.preventDefault();
                         console.log(formItems);
                    }}
                    className="form-submit"
                    >
                    Save and Next
               </button>
          </form>
     );
};
