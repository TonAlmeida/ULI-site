import { Cart } from '@/types/cart';
import { Product } from '@/types/product';
import {create} from 'zustand'

type States = {
    cart: Cart[];
}

type Actions = {
    upsertCartItem: (product: Product, amount: number) => void;
}

const initialState: States = {
    cart: []
}

export const useCartStore = create<States & Actions>()(set => ({
    ...initialState,
    upsertCartItem: (product, amount) => set(state => {
        let newCart = state.cart;

        let productIndex = newCart.findIndex(item => item.product.id === product.id);
 
        //if the product isn't in the car it will add it,
        // and now the productIndex exist
        if(productIndex < 0) {
            newCart.push({product, amount: 0});
            productIndex = newCart.findIndex(item => item.product.id === product.id);
        }

        newCart[productIndex].amount += amount;

        if(newCart[productIndex].amount <= 0) {
            state.cart = newCart.filter(item => item.product.id !== product.id);
        }

        return {...state, newCart};
    })
}))