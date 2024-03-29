import React from 'react';
import Dialog from 'react-native-dialog';
import { DialogContext } from '../hooks/useDialogContext';
import { Item } from '../interfaces/Item';
import { deleteAndRemoveItem } from '../redux/features/actions/items';
import { useAppDispatch } from '../redux/store';

export interface DeleteItemDialogProps {
    context: DialogContext<Item>;
}

export function DeleteItemDialog(props: DeleteItemDialogProps) {
    const { context, clearContext } = props.context;
    const dispatch = useAppDispatch();
    return (
        <Dialog.Container visible={context !== null}>
            <Dialog.Title>Delete Item</Dialog.Title>
            <Dialog.Description>
                Are you sure you want to delete this item?
            </Dialog.Description>
            <Dialog.Button label="Cancel" onPress={clearContext} />
            <Dialog.Button label="Delete" onPress={async () => {
                await dispatch(deleteAndRemoveItem(context!.id));
                clearContext();
            }} />
        </Dialog.Container>
    )
}