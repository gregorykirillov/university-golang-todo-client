import { useEffect, useState } from 'react';

import TodoElement from '../TodoElement';
import { Service } from '~/src/services';
import { Preloader } from '~/src/uikit';

import styles from './styles.module.scss';

export type todoType = {
    ID: number;
    CreatedAt: string;
    DeletedAt: null | string;
    UpdatedAt: string;
    active: boolean;
    title: string;
};

const TodoList = ({
    todos,
    setTodos,
}: {
    todos: todoType[] | [];
    setTodos: React.Dispatch<React.SetStateAction<todoType[]>>;
}) => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            const { data } = await Service.getItemsByLink();

            setLoading(false);
            setTodos(data);
        };
        getData();
    }, []);

    todos.sort((a, b) => {
        if (a.active && !b.active) {
            return -1;
        } else if (!a.active && b.active) {
            return 1;
        }

        return a.ID - b.ID;
    });

    if (isLoading) return <Preloader />;

    return (
        <div className={styles.todoList}>
            {todos?.map((todo: todoType) => (
                <TodoElement
                    key={todo.ID}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                />
            ))}
        </div>
    );
};

export default TodoList;
