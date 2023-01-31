import React, { useEffect, useState } from 'react';
 function Todos() {
    const [todos, setTodos] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        fetch("https://dummyjson.com/todos")
            .then((data) => data.json())
            .then((final_todos) => setTodos(final_todos.todos))
    }, []);

    const totalPage = Math.ceil(todos.length / pageSize);
    const todosEndIndex=currentPageIndex*pageSize;
    const todosStartIndex=todosEndIndex-pageSize;

    const resultantTodos=todos.slice(todosStartIndex,todosEndIndex);    
    console.log("resultant",resultantTodos);
    

    const handlePrevClick=()=>{
            if(currentPageIndex>1)
                setCurrentPageIndex((prev)=>prev-1);
    }
    
    const handleNextClick=()=>{
        if(currentPageIndex<totalPage)
            setCurrentPageIndex((prev)=>prev+1);
}
    const handleSelectOnChange=(e)=>{
        setPageSize(e.target.value);
    }

    return (
        <>
        <div>
        <label htmlFor="page_selector">Page Size: </label>
        <select id="page_selector" onChange={(e)=>handleSelectOnChange(e)}>
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
        </select>
        <hr/>
        </div>
        <div>
            {resultantTodos.map((todo, index) => {
                return <div key={todo.id}>
                    <div>{todo.id}</div>
                    <div>{todo.todo}</div>
                    <hr />
                </div>

            })}
            <span style={{cursor:"pointer"}} onClick={()=>handlePrevClick()}>Prev |</span>
            {[...Array(totalPage + 1).keys()].slice(1).map((pageIndex) => {
                return <span style={{cursor:"pointer"}} onClick={()=>{setCurrentPageIndex(pageIndex)} } key={pageIndex}>{pageIndex} |</span>
            })}
            <span style={{cursor:"pointer"}}  onClick={()=>handleNextClick()}> Next</span>
        </div>
        </>
    )
}

export default Todos;