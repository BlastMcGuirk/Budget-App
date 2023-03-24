import React from 'react';
import Dialog from 'react-native-dialog';
import { DialogContext } from '../hooks/useDialogContext';
import { Budget } from '../interfaces/Budget';
import { deleteAndRemoveItem } from '../redux/features/actions/items';
import { useAppDispatch } from '../redux/store';

export interface DeleteBudgetDialogProps {
    context: DialogContext<Budget>;
}

export function DeleteBudgetDialog(props: DeleteBudgetDialogProps) {
    const { context, clearContext } = props.context;
    const dispatch = useAppDispatch();
    return (
        <Dialog.Container visible={context !== null}>
            <Dialog.Title>Delete Budget</Dialog.Title>
            <Dialog.Description>
                Are you sure you want to delete this budget?
            </Dialog.Description>
            <Dialog.Button label="Cancel" onPress={clearContext} />
            <Dialog.Button label="Delete" onPress={async () => {
                await dispatch(deleteAndRemoveItem(context!.id));
                clearContext();
            }} />
        </Dialog.Container>
    )
}