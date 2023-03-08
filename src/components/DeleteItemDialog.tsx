import React from 'react';
import Dialog from 'react-native-dialog';
import { Item } from '../interfaces/Item';
import { deleteAndRemoveItem } from '../redux/features/budget-slice';
import { useAppDispatch } from '../redux/store';

export interface DeleteItemDialogProps {
    item: Item | null;
    clearItem: () => void;
}

export function DeleteItemDialog(props: DeleteItemDialogProps) {
    const dispatch = useAppDispatch();
    return (
        <Dialog.Container visible={props.item !== null}>
            <Dialog.Title>Delete Item</Dialog.Title>
            <Dialog.Description>
                Are you sure you want to delete this item?
            </Dialog.Description>
            <Dialog.Button label="Cancel" onPress={props.clearItem} />
            <Dialog.Button label="Delete" onPress={async () => {
                await dispatch(deleteAndRemoveItem(props.item!.id));
                props.clearItem();
            }} />
        </Dialog.Container>
    )
}