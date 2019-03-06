import Item1 from '../../images/item1.jpg'
import Item2 from '../../images/item2.jpg'
import Item3 from '../../images/item3.jpg'
import Item4 from '../../images/item4.jpg'
import Item5 from '../../images/item5.jpg'
import Item6 from '../../images/item6.jpg'
import {
    ADD_TO_CART,
    REMOVE_ITEM,
    SUB_QUANTITY,
    ADD_QUANTITY,
    ADD_SHIPPING
} from '../actions/action-types/cart-actions'


const initState = {
    items: [{
            id: 1,
            title: 'Winter body',
            desc: "Get trending shoes at Topshop. From this season's essential glove shoe to strappy sandals ",
            price: 110,
            img: Item1
        },
        {
            id: 2,
            title: 'Adidas',
            desc: "Find your adidas Men - Shoes at adidas.com. All styles and colors available in the official adidas online store.",
            price: 80,
            img: Item2
        },
        {
            id: 3,
            title: 'Vans',
            desc: "Shop at Vans.com for Shoes, Clothing & Accessories. Browse Men's, Women's, Kids & Infant Styles. Get Free Shipping & Free",
            price: 120,
            img: Item3
        },
        {
            id: 4,
            title: 'White',
            desc: "A White-shoe firm is a leading professional services firm in the United States, particularly firms that ...",
            price: 260,
            img: Item4
        },
        {
            id: 5,
            title: 'Cropped-sho',
            desc: "How to dress: cropped trousers and mary-jane shoes At last: an easy fashion-forward daytime look.",
            price: 160,
            img: Item5
        },
        {
            id: 6,
            title: 'Blues',
            desc: "One Shoe Blues [Sandra Boynton, B.B. King] on Amazon.com. *FREE* shipping on qualifying offers. ",
            price: 90,
            img: Item6
        }
    ],
    addedItems: [],
    total: 0,
    pc: 0

}
const cartReducer = (state = initState, action) => {

    //INSIDE HOME COMPONENT
    if (action.type === ADD_TO_CART) {
        let addedItem = state.items.find(item => item.id === action.id)
        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item => action.id === item.id)
        if (existed_item) {
            addedItem.quantity += 1
            return {
                ...state,
                total: state.total + addedItem.price,
                pc: state.pc + 1
            }
        } else {
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price
            let newPc = state.pc + 1
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal,
                pc: newPc
            }

        }
    }
    if (action.type === REMOVE_ITEM) {
        let itemToRemove = state.addedItems.find(item => action.id === item.id)
        let new_items = state.addedItems.filter(item => action.id !== item.id)

        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
        let newPc = state.pc - itemToRemove.quantity
        console.log(itemToRemove)
        return {
            ...state,
            addedItems: new_items,
            total: newTotal,
            pc: newPc
        }
    }
    //INSIDE CART COMPONENT
    if (action.type === ADD_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        addedItem.quantity += 1
        let newTotal = state.total + addedItem.price
        let newPc = state.pc + 1
        return {
            ...state,
            total: newTotal,
            pc: newPc
        }
    }
    if (action.type === SUB_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        //if the qt == 0 then it should be removed
        if (addedItem.quantity === 1) {
            let new_items = state.addedItems.filter(item => item.id !== action.id)
            let newTotal = state.total - addedItem.price
            let newPc = state.pc - 1
            return {
                ...state,
                addedItems: new_items,
                total: newTotal,
                pc: newPc
            }
        } else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            let newPc = state.pc - 1
            return {
                ...state,
                total: newTotal,
                pc: newPc
            }
        }

    }

    if (action.type === ADD_SHIPPING) {
        return {
            ...state,
            total: state.total + 6,
            pc: state.pc
        }
    }

    if (action.type === 'SUB_SHIPPING') {
        return {
            ...state,
            total: state.total - 6,
            pc: state.pc
        }
    }

    return state
}

export default cartReducer