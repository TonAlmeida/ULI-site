import { useCheckoutStore } from "@/stores/checkout-store"
import { Button } from "../ui/button"
import Link from "next/link"
import { GenerateMessage } from "@/lib/generate-message"
import { useCartStore } from "@/stores/cart-store"


export const StepFinish = () => {

    const {name, setName, setAddress} = useCheckoutStore(state => state);
    const {cart, upsertCartItem} = useCartStore(state => state)

    const message = GenerateMessage();

    const linkZap = `http://wa.me//${process.env.NEXT_PUBLIC_ZAP}?text=${encodeURI(message)}`;


    return (
        <div className="text-center flex flex-col gap-5">
            <p>Perfeito, <strong>{name}</strong></p>
            <p>Agora envie seu pedido para o nosso WhatsApp para concluir.</p>
                <Link href={linkZap} className="p-0">
                <Button className="m-0 w-full bg-green-400 hover:bg-green-300">Enviar para o <strong>WhatsApp</strong></Button>
                </Link>
        </div>
    )
}