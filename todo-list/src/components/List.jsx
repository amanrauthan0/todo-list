import { useState} from "react";

export default function List() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([
  { title: "Buy milk", about: "From the nearby store" },
  { title: "Study React", about: "Focus on useState & props" }
]);
  
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
         const copy = [...prev,
          { title:task, about: "" }];
        
         return copy;
        })
    setTask("");
  }

  function deleteTask(index) {
    setTasks(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col  p-4 max-w-md ">
      <div>
      <form className="flex  gap-2 mb-4" onSubmit={handleSubmit}>
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

      <ul className="h-10">
        {tasks.map((tasks, index) => (
          <li
            key={index}
            className="flex justify-between items-center border px-2 py-1 m-3 "
          >
            <span className="text-xl">{tasks.title}</span>
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
      </div>
      
        {showAbout && tasks[activeIndex] && activeIndex !== null && (
          <div className="fixed right-0 top-16 h-full w-200 bg-white shadow-lg p-4">
      <h2 className="text-lg font-semibold">
  Notes for: {tasks[activeIndex].title}
</h2>
      <textarea
      placeholder="Write notes, ideas, links, or reminders related to this todo…"
      spellCheck={false}
        className="
        leading-relaxed 
        text-xl
        spellCheck={false} 
        w-full
        h-full
        p-4
        border-r
        outline-none
        resize-none
        font-mono
        "
         value={tasks[activeIndex]?.about || ""}
         onChange={(e) => {
         setTasks(prev => {
         const copy = [...prev];
         copy[activeIndex] = { ...copy[activeIndex], about: e.target.value };
         return copy;
        });
       }}
      />
  </div>
)}
      </div>

  );
}
