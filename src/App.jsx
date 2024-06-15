import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetch(`https://api.frontendeval.com/fake/food/${input}`)
      .then((res) => {
        return res.json();
      })
      .then((Rdata) => {
        setData(Rdata);
      });
  }, [input]);

  const handleInputs = (ele) => {
    let arr = [...todo];

    let obj = {
      content: ele,
      val: false,
    }
    arr.push(obj);

    setTodo(arr)
    setInput("")
    setData([])
 }

 const handleDelete = (ele) => {
  let arr = [...todo];
  console.log(ele, arr);

  arr = arr.filter((elemt) => elemt.content !== ele);

  setTodo(arr)
 }

 const handleToggle = (id) => {

  let arr = [...todo]
  arr[id].value = !arr[id].value

  console.log(arr)

  setTodo(arr)

 }
  return (
    <div className="max-w-[400px] m-auto ">
      <h1 className="text-3xl font-bold text-center">My Shopping List</h1>
      <input
        className="outline w-full py-2 my-6"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="">
        {
          <div className="max-h-[200px] overflow-y-scroll bg-slate-200">
            {data.map((ele, id) => {
              console.log(ele);
              return (
                <p
                  className="text-2xl p-2 cursor-pointer"
                  onClick={() => handleInputs(ele)}
                  key={id}
                >
                  {ele}
                </p>
              );
            })}
          </div>
        }
      </div>

      <div>
        {
          todo.map((ele, idx) => {
            return <div key={idx}>
              <div className="flex justify-between my-2">
              <button onClick={() => handleToggle(idx)}>done</button>

              {
                ele.val ? <p>{ele.content}</p> : <del>{ele.content}</del>
              }
                <button onClick={() => handleDelete(ele.content)}>delete</button>
              </div>
            </div>
          })
        }
      </div>
    </div>
  );
}
