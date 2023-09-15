import React, { useEffect, useRef, useState } from "react";
import "./Note_taking_page.css";
import send from ".././images/send.png";
import bringleColor from ".././images/Ellipse11.png";
import pink from ".././images/Ellipse18.png";
import skyBlue from ".././images/Ellipse19.png";
import orange from ".././images/Ellipse20.png";
import blue from ".././images/Ellipse21.png";
import liteblue from ".././images/Ellipse22.png";

const Note_taking_page = () => {
  const [popUP, setpopUP] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [groupData, setgroupData] = useState([]);
  const [text2, setText2] = useState("");
  const [output, setOutput] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [groupName, setgroupName] = useState();
  const [editIndex, seteditIndex] = useState(-1);

  var color = [
    {
      id: "#b38bfa",
      image: bringleColor,
    },
    {
      id: "#ff79f1",
      image: pink,
    },
    {
      id: "#43e6fc",
      image: skyBlue,
    },
    {
      id: "#f19576",
      image: orange,
    },
    {
      id: "#0147ff",
      image: blue,
    },
    {
      id: "#6691ff",
      image: liteblue,
    },
  ];

  function createNoteGroupHandle() {
    setpopUP(!popUP);
  }
  function closePopup() {
    setpopUP(false);
  }
  function createGroupHandler() {
    if (inputValue == "") {
      alert("Please Write Group Name");
    } else {
      if (groupName == undefined) {
        setgroupName(inputValue);
      }
      if (groupData === null) {
        const newgroupData = [{ inputValue, selectedColor }];
        localStorage.setItem("title", JSON.stringify(newgroupData));
        setgroupData(newgroupData);
      } else {
        const newgroupData = [...groupData, { inputValue, selectedColor }];
        localStorage.setItem("title", JSON.stringify(newgroupData));

        setgroupData(newgroupData);
      }
    }

    setInputValue("");
    setSelectedColor("");
    setpopUP(false);
  }

  const sendMsgHandler = async () => {
    const currentDate = new Date().toLocaleString();
    if (output === null) {
      const newMessage = [
        { indexx: activeIndex, groupName: groupName, text2, date: currentDate },
      ];
      localStorage.setItem("messages", JSON.stringify(newMessage));
      setOutput(newMessage);
    } else {
      if (editIndex >= 0) {
        const newState = output.map((obj, index) => {
          if (index === editIndex) {
            return { ...obj, text2: text2 };
          }
          return obj;
        });
        localStorage.setItem("messages", JSON.stringify(newState));
        setOutput(newState);
        seteditIndex(-1);
      } else {
        const newMessage = [
          ...output,
          {
            indexx: activeIndex,
            groupName: groupName,
            text2,
            date: currentDate,
          },
        ];
        localStorage.setItem("messages", JSON.stringify(newMessage));

        setOutput(newMessage);
      }
    }
    setText2("");
  };

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("messages"));
    const savedtitle = JSON.parse(localStorage.getItem("title"));
    setgroupData(savedtitle);
    setOutput(savedMessages);
  }, []);

  function notesDelete(index) {
    if (index === index) {
      setOutput(output.filter((i, inde) => inde !== index));
      localStorage.setItem(
        "messages",
        JSON.stringify(output.filter((i, inde) => inde !== index))
      );
    }
    setText2("");
  }

  function notesEdit(index) {
    seteditIndex(index);
    if (index === index) {
      output.filter((i, inde) => (inde == index ? setText2(i.text2) : ""));
    }
  }

  function deleteGroup(e, groupname) {
    setgroupData(groupData.filter((i, inde) => inde !== e));
    localStorage.setItem(
      "title",
      JSON.stringify(groupData.filter((i, inde) => inde !== e))
    );
    setOutput(output.filter((i) => i.groupName !== groupname));

    localStorage.setItem(
      "messages",
      JSON.stringify(output.filter((i) => i.groupName !== groupname))
    );
    setActiveIndex(0);

    if (groupData.length === 1 || groupData.length == 0) {
      setOutput("");
      setgroupData("");
      setText2("");
      localStorage.clear();
    }
  }

  function divHanler(index, groupname) {
    setActiveIndex(index);
    setgroupName(groupname);
  }

  return (
    <div className="Container">
      <div className="LeftDiv">
        <p>Pocket Notes</p>
        <div className="NotesDiv">
          <button onClick={createNoteGroupHandle}>+ Create Notes group</button>
          <div>
            {popUP ? (
              <div className="main">
                <div className="popup">
                  <div className="popup-header">
                    <h1 className="createNotes">Create New Notes</h1>
                    <h1 onClick={closePopup}>X</h1>
                  </div>
                  <div className="groupDetails">
                    <p>Group Name</p>
                    <input
                      name="getText"
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter Your Group Name"
                    ></input>
                  </div>
                  <div className="groupDetails">
                    <p>Choose Color</p>
                    <div>
                      {color.map((data) => (
                        <img
                          name={data.id}
                          onClick={(e) => setSelectedColor(e.target.name)}
                          src={data.image}
                        ></img>
                      ))}
                    </div>
                  </div>
                  <div className="createBtn">
                    <button name="click" onClick={createGroupHandler}>
                      Create
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {groupData ? (
          <div className="grpNotes">
            {groupData.map((value, index) => {
              const name = value.inputValue.split(" ");
              if (name.length >= 1) {
                return (
                  <div
                    style={{
                      backgroundColor: activeIndex === index ? "#F7ECDC" : "",
                    }}
                  >
                    <div
                      className="grpNotesDivHandler"
                      onClick={() => divHanler(index, value.inputValue)}
                    >
                      <div
                        className="profileName"
                        style={{
                          backgroundColor: value.selectedColor
                            ? value.selectedColor
                            : "",
                        }}
                      >
                        <p>
                          {name.length > 1
                            ? name[0][0] + name[1][0]
                            : name[0][0]}
                        </p>
                      </div>

                      <p>{value.inputValue}</p>
                    </div>
                    
                  </div>
                );
              }
            })}
          </div>
        ) : (
          ""
        )}
      </div>
      {groupData ? (
        <div className="RightDiv">
          {groupData.map((item, index) => {
            const name = item.inputValue.split(" ");
            if (activeIndex === index) {
              return (
                <div className="profile">
                  <div
                    style={{
                      backgroundColor: item.selectedColor
                        ? item.selectedColor
                        : "",
                    }}
                  >
                    <p>
                      {name.length > 1 ? name[0][0] + name[1][0] : name[0][0]}
                    </p>
                  </div>
                  <p>{item.inputValue}</p>
                </div>
              );
            }
          })}
          {output ? (
            <div className="UserTextDivMainContainer">
              <div className="UserTextDivContainer">
                {output.map((item, index) => {
                  if (activeIndex === item.indexx) {
                    return (
                      <div>
                        <div className="UserTextDiv">
                          <div className="timeAndDate">
                            <p>{item.date}</p> 
                          </div>
                          <div className="UserTextInnerDiv">
                            <p className="UserTex">{item.text2}</p>
                            <div className="UserTextInnerDiv">
                              <p onClick={() => notesEdit(index)}>Edit</p>
                              <p onClick={() => notesDelete(index)}>Delete</p>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ) : (
            <div className="UserTextDivMainContainer">
              <div className="UserTextDivContainer">
                <div>
                  <div className="UserTextDiv">
                    <div className="timeAndDate"></div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="textareaDiv">
            <div>
              <textarea
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                placeholder="Enter Your Text Here....."
              >
                {}
              </textarea>
              <div className="sendBtnDiv">
                <img onClick={sendMsgHandler} src={send}></img>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Note_taking_page;
