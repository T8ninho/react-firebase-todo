
import React, { useState, useEffect } from 'react';
import {db} from './firebase/firebase';
import { Input, Button, Switch } from 'antd';

const useFirestoreCollection = (collection) => {
  const [data, setData] = useState([]);

	useEffect(() => {
		const unsubscribe = db.collection(collection)
		.onSnapshot(snapshot => {
			const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			setData(newData);
		});

		return () => unsubscribe();
	}, [collection]);

	return data;
};

const TodoList = () => {
	const todos = useFirestoreCollection('todos');
	const [newTodo, setNewTodo] = useState('');
	const [editableTask, setEditableTask] = useState(null);
	const [editedText, setEditedText] = useState('');

	const addTodo = async () => {
		if(newTodo === '') {
			return;
		}
		await db.collection('todos').add({ text: newTodo, completed: false });
			setNewTodo('');
	};

  	const toggleTodo = async (id, completed) => {
		await db.collection('todos').doc(id).update({ completed: !completed });
	};
	const startEditing = todo => {
		setEditableTask(todo.id);
		setEditedText(todo.text);
	  };

	const deleteTodo = async id => {
		await db.collection('todos').doc(id).delete();
	};

return (
	<div style={{
		backgroundColor: '#ffffff2c', 
		display: 'flex', 
		flexDirection: 'column', 
		alignItems: 'center',
		margin: '10px', 
		borderTopLeftRadius: '30px',
		borderTopRightRadius: '30px', 
		padding: '10px'
	}}>
      <h1>Lista de Tarefas</h1>
	  	<div style={{display: 'flex', gap: '10px'}}>
			<Input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} />
			<Button onClick={addTodo}>Adicionar</Button>
		</div>
      	<ul style={{
		width: '100%',
		padding: '10px'
	}}>
        	{todos.map(todo => (
          		<li key={todo.id} style={{
						backgroundColor: '#ffffff2c', 
						display: 'flex', 
						flexDirection: 'column', 
						margin: '10px', 
						borderTopLeftRadius: '30px',
						borderTopRightRadius: '30px', 
						padding: '10px'
					}}>
            		<span
              			style={{
							backgroundColor: '#ffffff2c',
							borderTopLeftRadius: '30px',
							borderTopRightRadius: '30px',
							padding: '10px',
                			textDecoration: todo.completed ? 'line-through' : 'none',
                			color: todo.completed ? '#ff0000' : '#fff',
              			}}
            		>
              		{todo.text}
            		</span>
					<div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '10px'}}>
						<Switch
							checkedChildren="✔" 
							unCheckedChildren="✖"
							onChange={() => toggleTodo(todo.id, todo.completed)}
							checked={todo.completed}
						/>
						<Button  onClick={() => startEditing(todo)}>Editar</Button>
						<Button onClick={() => deleteTodo(todo.id)}>Excluir</Button>
					</div>
             	</li>
        	))}
      	</ul>
    </div>
  );
};

export default TodoList;

    // <div>
    //   <ul>
    //     {todos.map(todo => (
    //       <li key={todo.id}>
    //         <input
    //           type="checkbox"
    //           checked={todo.completed}
    //           onChange={() => toggleTodo(todo.id, todo.completed)}
    //         />
    //         <p style={todo.completed ? "color: '#fff'" : ""}>{todo.text +'oi'}</p>
    //         <button onClick={() => deleteTodo(todo.id)}>Excluir</button>
    //       </li>
    //     ))}
    //   </ul>
    //   <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} />
    //   <button onClick={addTodo}>Adicionar Tarefa</button>
    // </div>