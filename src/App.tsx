import { useState } from "react";
import "./App.css";
import InputFeild from "./conponents/InputFeild";
import { Todo } from "./conponents/model";
import TodoList from "./conponents/TodoList";

import { DragDropContext,DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  //인터페이스베열만들기
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  console.log(todo);
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

 
   
  const onDragEnd =(result:DropResult ) =>{
    const {source, destination} = result;
   

   
    if(!destination) return;
    console.log(result)
    if(destination.droppableId === source.droppableId && destination.index ===source.index)
    return;
    let add, active =todos, complete = completedTodos;
    if(source.droppableId === "TodosList"){
      add = active[source.index];
      active.splice(source.index,1)
    } else {
      add = complete[source.index];
      complete.splice(source.index,1)
    }

    if(destination.droppableId === "TodosList"){
      
      active.splice(destination.index,0,add);
    } else {
     complete.splice(destination.index,0,add);
    }
    setCompletedTodos(complete);
    setTodos(active);

   
  
  
  }
 
  return (
    
    <DragDropContext onDragEnd={onDragEnd} >
      <div className="App">
      <span className="heading"><h1>ToDolist</h1></span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      {/* todolist */}
      <TodoList
        todos={todos}
        setTodos={setTodos}
        completedTodos={completedTodos}
        setCompletedTodos={setCompletedTodos}
      />
      
    </div>
    </DragDropContext>
    
  );
};

export default App;
