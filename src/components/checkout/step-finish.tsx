import { useCheckoutStore } from "@/stores/checkout-store"
import { Button } from "../ui/button"
import Link from "next/link"
import { GenerateMessage } from "@/lib/generate-message"
import { useCartStore } from "@/stores/cart-store"
import { ReplyIcon } from "lucide-react"


export const StepFinish = () => {

    const {name, setName, setAddress} = useCheckoutStore(state => state);
    const {cart, upsertCartItem} = useCartStore(state => state)

    const message = GenerateMessage();

    const linkZap = `https://wa.me//${process.env.NEXT_PUBLIC_ZAP}?text=${encodeURI(message)}`;

    const handleFinish = () => {
        window.location.reload();
    }

    return (
        <div className="text-center flex flex-col gap-5">
            <p>Perfeito, <strong>{name}</strong></p>
            <p>Agora envie seu pedido para o nosso WhatsApp para concluir.</p>
                <Link href={linkZap} onClick={handleFinish} target="_blank" className="p-0">
                    <Button className="m-0 w-full bg-green-400 hover:bg-green-300">Enviar para o <strong>WhatsApp</strong></Button>
                </Link>
                <Button onClick={handleFinish} variant={"link"}><ReplyIcon />Fazer novo pedido</Button>
        </div>
    )
}