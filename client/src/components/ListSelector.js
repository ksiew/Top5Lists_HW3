import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
import DeleteModal from './DeleteModal'
import apis from '../api/index.js'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    function addList() {
        store.createList();
        /*
       let response = await apis.createTop5List({
            "name" : "Untitled",
            "items": ["?", "?", "?", "?", "?"]
        });
        if (response.data.success) {
            loadList();
        }
        */
    }

    function loadList(){
        store.loadIdNamePairs();
        console.log(store.idNamePairs);
        let _id = store.idNamePairs.at(-1)._id;
        if (_id.indexOf('list-card-text-') >= 0)
        _id = ("" + _id).substring("list-card-text-".length);
        store.setCurrentList(_id);
    }

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    let listCard = "";
    if (store) {
        listCard = store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ))
    }

    let addListStatus = false;
    let addListClass = "top5-button";
    if(store.isListNameEditActive){
        addListStatus = true;
        addListClass = "top5-button-disabled"
    } 
    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
                <input
                    disabled={addListStatus}
                    type="button"
                    id="add-list-button"
                    className={addListClass}
                    value="+"
                    onClick= {addListStatus ? undefined : addList} />
                Your Lists
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <DeleteModal />
            </div>
        </div>)
}

export default ListSelector;