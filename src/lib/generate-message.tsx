import { useCartStore } from "@/stores/cart-store";
import { useCheckoutStore } from "@/stores/checkout-store"

export const GenerateMessage = () => {
    const {name, address} = useCheckoutStore(store => store);
    const {cart} = useCartStore(state => state);

    let orderProducts = cart.map(item =>
        `${item.amount}x ${item.product.name}`)

    return `**Dados do cliente:**
Nome: ${name}
Endereço: ${address.street}, ${address.number}(${address.complement})
${address.district}, ${address.city}/${address.state}
------
**Pedido:**
${orderProducts.join("\n")}`
}