import React, { useEffect, useState } from "react";
import "./Content.css";
import upArrow from "../src/assets/up-arrow.svg";
import downArrow from "../src/assets/downward-arrow.svg";
const Content = () => {
  const [tableData, setTableData] = useState();

  const getTodos = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const resp = await response.json();
    let data = resp.map((todo, index) => {
      if (index % 2 == 0) {
        return { ...todo, date: "Today" };
      } else {
        return { ...todo, date: "24 Aug 2022" };
      }
    });
    setTableData(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleUpArrow = (index) => {
    console.log("Inside Handle Up Arrow   =>", index);
    let temp = tableData;
    let s1 = temp[index];
    temp[index] = temp[index - 1];
    temp[index - 1] = s1;
    setTableData([...temp]);
  };

  const handleDownArrow = (index) => {
    console.log("Inside Handle Down Arrow   =>", index);
    let temp = tableData;
    let s1 = temp[index];
    temp[index] = temp[index + 1];
    temp[index + 1] = s1;
    setTableData([...temp]);
  };

  const checkTodo = async (e, id) => {
    const cb = document.querySelector("#myCheck");
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "PUT",

        body: {
          completed: cb,
        },
      }
    );
  };

  return (
    <div className="main">
      <div className="head-row">
        <div className="checkbox-div"></div>
        <div className="header">Issue</div>
        <div className="header">Created</div>
        <div className="header">Actions</div>
      </div>
      {tableData &&
        tableData.map((todo, index) => {
          return (
            <div className="table-data-cont">
              <div className="checkbox-div">
                <input
                  id="myCheck"
                  onClick={(e) => checkTodo(e, todo.id)}
                  type="checkbox"
                  className="check"
                />
              </div>
              <div className="header">{todo.title}</div>
              <div className="header">{todo.date}</div>
              <div className="header">
                {index != 0 && (
                  <img
                    className="arw"
                    src={upArrow}
                    onClick={() => handleUpArrow(index)}
                  />
                )}
                {index != tableData.length - 1 && (
                  <img
                    style={{ marginLeft: "10px" }}
                    className="arw"
                    src={downArrow}
                    onClick={() => handleDownArrow(index)}
                  />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Content;
