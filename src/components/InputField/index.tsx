import { FormEvent } from 'react';
import { Service } from '~/src/services';

import { Input } from '~/src/uikit';
import { todoType } from '../TodoList';

import styles from './styles.module.scss';

type FormType = {
    target: {
        todoTitle: HTMLInputElement;
    };
};

const InputField = ({ addTodo }: { addTodo: (todo: todoType) => void }) => {
    const onSubmitForm = async (
        event: FormEvent<HTMLFormElement> & FormType,
    ) => {
        event.preventDefault();

        const titleInput = event.target.todoTitle as HTMLInputElement;
        const titleValue = titleInput.value;

        titleInput.value = '';

        if (!titleValue) return;

        const {
            data: { ID, CreatedAt, DeletedAt, UpdatedAt, active, title },
        } = await Service.addItem(titleValue);

        addTodo({
            ID,
            CreatedAt,
            DeletedAt,
            UpdatedAt,
            active,
            title,
        });
    };

    return (
        <form className={styles.form} onSubmit={onSubmitForm}>
            <Input name="todoTitle" className={styles.input} />
        </form>
    );
};

export default InputField;
