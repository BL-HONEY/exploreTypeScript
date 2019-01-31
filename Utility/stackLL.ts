var show = require('util');
/**
 * @description class node
 * 
 * @class node
 * @purpose Creates a new node with two blocks , data & item
 */
class node {
    /**
     * @description constructor initializes data and next
     * @param {Number} data 
     */
    data : any;
    next : any;
    constructor(data : any) {
        this.data = data;
        this.next = null;
    }
}
/**
 * @description class StackedLink
 * 
 * @class StackLink
 * @purpose Creates a new Stack using LInkedlist contains various manipulation functions
 */
class StackedLink {
/**
     * @description constructor initializes top
     */
    top : any;
    constructor() {
        this.top = null;
    }
    /**
     * @description stores items to stack
     * @param {item(value to be stored in stack)} 
     */
    push(item:any) {
        var temp = new node(item);
        temp.data = item;
        temp.next = this.top;
        this.top = temp;
    }
    /**
     * @description pops out items from the stack 
     */
    pop() : any {

        if (this.top == null) {
            console.log("Stack Underflowed");
            return;
        }
        this.top = this.top.next;

    }
    /**
     * @description checks if stack is empty
     */
    isEmpty() : any {
        return this.top == null;
    }
    /**
     * @description to check top most item in the stack
     * @returns {Number} returns item at the top
     */
    peek() : any{
        if (!this.isEmpty()) {
            return this.top.data;
        } else {
            console.log("stack is empty");
            return -1;
        }
    }

    /**
     * @description Display the stack
     */
    display(){
        if (this.top == null) {
            console.log("Stack Underflowed");
            return;
        }
        else {
            var temp = this.top;
            var show = "";
            while (temp != null) {

                show = show + temp.data;
                if (temp.next != null) {
                    show = show + " --> "
                }
                temp = temp.next;
            }
            console.log(show);
        }
    }
 
    /**
     * @description get the top most item of the stack
     * @returns top most item
     */
    getHead() {
        return this.top;
    }
}

export = StackedLink;
