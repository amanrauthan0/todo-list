import { useState} from "react";

export default function List() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  
  const [showAbout,setShowAbout]= useState(false);
  const [activeIndex,setActiveIndex]=useState(null);

 function handleAbout(index) {
  if (showAbout && activeIndex === index) {
    setShowAbout(false);
    setActiveIndex(null);
  } else {
    setActiveIndex(index);
    setShowAbout(true);
  }
}


  function handleSubmit(e) {
    e.preventDefault();

    if (!task.trim()) return;

    setTasks(prev => {
         const prevlist = [...prev,
          { todo:task, about: "" ,done:false}];
        
         return prevlist;
        })
    setTask("");
  }

  function deleteTask(index) {
    setTasks(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col p-4 max-w-xl ">
      <div>
      <form className="flex font-mono gap-2 mb-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border px-2 rounded-xl size-11 py-1 flex-1"
          placeholder="Enter task"
        />
        <button className="px-3 py-1 bg-orange-100 rounded-xl text-black ">
          Add
        </button>
      </form>

      <ul className="h-10 font-mono ">
        {
        tasks.map((task,index) => (
          <li
            key={index}
            className="flex justify-between items-center border rounded-xl border-r-2 px-2 py-1 m-3 "
          >
           <input 
            type="checkbox" 
            checked={task.done}
            onChange={(e)=>
              {setTasks(prev=>{
                const prevlist=[...prev];
                prevlist[index].done=e.target.checked
                return prevlist;
              }

           )}} />


            <span className={`text-xl ${task.done ? "line-through text-gray-500" : ""}`}>{task.todo}</span>

            <div className=" flex gap-2">
              <button
              onClick={() => deleteTask(index)}
              className="text-red-500"
            >
              <img className="h-5" src='../recycle-bin.png' alt="delete" />
            </button>
            <button
              className="text-red-500"
              onClick={()=>handleAbout(index)}
            >
              <img className="h-5" src='../arrow.png' alt="show" />
            </button>
            </div>
          </li>
          
        ))}
      </ul>
      {tasks.length === 0 && <img className="h-80 pl-26" src="./snorlex.png" alt="empty todo" />}
      </div>

        {showAbout && tasks[activeIndex] && activeIndex !== null && (
          <div className="fixed right-0 top-16 h-full w-200 bg-white shadow-lg p-4">
          <h2 className="text-lg font-semibold">
           Notes for : {tasks[activeIndex].todo}
          </h2>
      <textarea
      placeholder="Write notes, ideas, links, or reminders related to this todo…"
      spellCheck={false}
        className={
        `leading-relaxed 
        text-xl
        spellCheck={false} 
        w-full
        h-full
        p-4
        border-r
        outline-none
        resize-none
        font-mono
        ${tasks[activeIndex].done?"text-gray-400":""}`}
        
        
         value={tasks[activeIndex]?.about || ""}
         onChange={(e) => {
         setTasks(prev => {
         const prevlist = [...prev];
         prevlist[activeIndex] = { ...prevlist[activeIndex], about: e.target.value };
         return prevlist;
        });
       }}
      />
  </div>
)}
      </div>

  );
}
