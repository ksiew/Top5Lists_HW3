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
        apis.createTop5List({
            "name" : "Untitled",
            "items": ["?", "?", "?", "?", "?"]
        }).then(store.loadIdNamePairs()).then(loadList());
    }

    function loadList(){
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
    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
                <input
                    type="button"
                    id="add-list-button"
                    className="top5-button"
                    value="+"
                    onClick= {addList} />
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