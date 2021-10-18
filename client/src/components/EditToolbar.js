import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let closeButton = "top5-button";
    let redoButton = "top5-button";
    let undoButton = "top5-button";
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }


    let closeStatus = false;
    let redoStatus = false;
    let undoStatus = false;
    if (store.isEditActive) {
        closeStatus = true;
        redoStatus = true;
        undoStatus = true;
        if(!store.isUndoActive) undoStatus = false;
        if(!store.isRedoActive) redoStatus = false;
    }
    if(closeStatus == false) closeButton = "top5-button-disabled";
    if(redoStatus == false) redoButton = "top5-button-disabled";
    if(undoStatus == false) undoButton = "top5-button-disabled";
    return (
        <div id="edit-toolbar">
            <div
                disabled={undoStatus}
                id='undo-button'
                onClick={undoStatus ? handleUndo : undefined}
                className={undoButton}>
                &#x21B6;
            </div>
            <div
                disabled={redoStatus}
                id='redo-button'
                onClick={redoStatus ? handleRedo : undefined}
                className={redoButton}>
                &#x21B7;
            </div>
            <div
                disabled={closeStatus}
                id='close-button'
                onClick={closeStatus ? handleClose : undefined}
                className={closeButton}>
                &#x24E7;
            </div>
        </div>
    )
}

export default EditToolbar;