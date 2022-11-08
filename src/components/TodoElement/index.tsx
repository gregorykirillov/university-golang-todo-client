import { useState } from 'react';
import cn from 'classnames';

import { todoType } from '../TodoList';
import { Input } from '~/src/uikit';
import { Service } from '~/src/services';

import editSvg from './edit.svg';
import deleteSvg from './delete.svg';

import styles from './styles.module.scss';

const TodoElement = ({
    todo,
    todos,
    setTodos,
}: {
    todo: todoType;
    todos: todoType[];
    setTodos: React.Dispatch<React.SetStateAction<todoType[]>>;
}) => {
    const [editing, setEditing] = useState({
        status: false,
        element: todo,
    });
    const [inputValue, setInputValue] = useState(todo.title);

    const handleDelete = (
        event: React.MouseEvent<HTMLImageElement, MouseEvent>,
        id: number,
    ) => {
        event.stopPropagation();
        Service.deleteItem(id);

        setTodos([...todos.filter((todo: todoType) => todo.ID !== id)]);
    };

    const handleEdit = (
        event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    ) => {
        event.stopPropagation();

        setEditing({ ...editing, status: true });
    };

    const handleRestItems = (ID: number) => {
        const restTodos = [] as todoType[];

        const targetTodo = todos.filter((todo) => {
            if (todo.ID === ID) return true;

            restTodos.push(todo);
        });
        targetTodo[0].title = inputValue;

        setTodos([...restTodos, targetTodo[0]]);

        return targetTodo;
    };

    const handleSubmit = () => {
        const { ID, active } = editing.element;

        Service.updateItem({ ID, title: inputValue, active });

        const editingTodo = handleRestItems(ID);
        editingTodo[0].title = inputValue;

        setEditing({ ...editing, status: false });
    };

    const toggleActive = (ID: number, title: string, active: boolean) => {
        Service.updateItem({ ID, title, active });

        const clickedTodo = handleRestItems(ID);
        clickedTodo[0].active = !clickedTodo[0].active;
    };

    if (editing.status)
        return (
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    className={styles.input}
                />
            </form>
        );

    return (
        <div
            className={cn(styles.todo, {
                [styles.done]: !todo.active,
            })}
            onClick={() => toggleActive(todo.ID, todo.title, !todo.active)}
        >
            {todo.title}
            <span className={styles.controlBlock}>
                <img
                    className={styles.editBtn}
                    onClick={(event) => handleEdit(event)}
                    src={editSvg}
                />
                <img
                    className={styles.deleteBtn}
                    onClick={(event) => handleDelete(event, todo.ID)}
                    src={deleteSvg}
                />
            </span>
        </div>
    );
};

export default TodoElement;
