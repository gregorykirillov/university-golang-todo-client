import { useState } from 'react';

import { TodoList } from '~/src/components';
import InputField from '~/src/components/InputField';
import { todoType } from '~/src/components/TodoList';

import styles from './styles.module.scss';

const MainPage = () => {
    const [todos, setTodos] = useState<todoType[] | []>([]);

    const addTodo = (todo: todoType) => setTodos([...todos, todo]);

    return (
        <div className={styles.content}>
            <h1>Todo App</h1>

            <InputField addTodo={addTodo} />

            <TodoList todos={todos} setTodos={setTodos} />
        </div>
    );
};

export default MainPage;
