import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveItem_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
    
    @author McKilla Gorilla
 */
export default class MoveItem_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initOldValue, initNewValue) {
        super();
        this.store = initStore;
        this.index = initIndex;
        this.oldValue = initOldValue;
        this.newValue = initNewValue;
    }

    doTransaction() {
        this.store.changeItem(this.index, this.newValue);
    }
    
    undoTransaction() {
        this.store.changeItem(this.index, this.oldValue);
    }
}