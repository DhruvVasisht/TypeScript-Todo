export const saveTodos =(todos:TodoListType[]):void =>{
    localStorage.setItem("mytodos",JSON.stringify(todos));
}

export const getTodos =():TodoListType[] => {
    const todos = localStorage.getItem("mytodos");
    return todos ? JSON.parse(todos) : [];
}