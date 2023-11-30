import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";

function App() {
  const [list, setList] = useState([]);
  const addUser = (user) => {
    setList([...list, user]);
  };

  useEffect(() => {
    console.log(list);
  }, [list]);
  return (
    <div className="App">
      <Form id="form" list={list} setlist={setList} adduser={addUser} />
      <div>
        {list.map((item) => {
          return <li>{item.fullname}</li>;
        })}
      </div>
    </div>
  );
}

export default App;
