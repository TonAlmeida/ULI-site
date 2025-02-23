"use client"

import { CheckoutSteps } from "@/types/checkout-steps"
import { Dispatch, SetStateAction } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCheckoutStore } from "@/stores/checkout-store"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
 
const formSchema = z.object({
  street: z.string().min(2, "Preencha o endereço"),
  number: z.string().min(2, "Preencha o número"),
  complement: z.string().optional(),
  district: z.string().min(2, "Preencha o bairro"),
  city: z.string().min(2, "Preencha a cidade"),
  state: z.string().min(2, "Preencha o estado"),
})

type Props = {
    setStep: Dispatch<SetStateAction<CheckoutSteps>>;
}
 
export function StepAddress({setStep}: Props) {

    const {address, setAddress} = useCheckoutStore(state => state);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          ...address
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setAddress(
            {
                street: values.street,
                number: values.number,
                complement: values.complement,
                district: values.district,
                city: values.city,
                state: values.state,
            }
        );
        setStep("finish");
    }
   
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Rua</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Digite o nome da rua..."
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Digite o número da casa..."
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="complement"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Complemento</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Digite o nome da rua..."
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bairro</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Digite o bairro..."
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Digite o nome da cidade..."
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="state"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Estado: </FormLabel>
                            <FormControl>
                                <Select defaultValue={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="selecione um estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ac">Acre</SelectItem>
                                        <SelectItem value="al">Alagoas</SelectItem>
                                        <SelectItem value="am">Amazonas</SelectItem>
                                        <SelectItem value="ba">Bahia</SelectItem>
                                        <SelectItem value="ce">Ceará</SelectItem>
                                        <SelectItem value="es">Espírito Santo</SelectItem>
                                        <SelectItem value="go">Goiás</SelectItem>
                                        <SelectItem value="ma">Maranhão</SelectItem>
                                        <SelectItem value="mt">Mato Grosso</SelectItem>
                                        <SelectItem value="ms">Mato Grosso do Sul</SelectItem>
                                        <SelectItem value="mg">Minas Gerais</SelectItem>
                                        <SelectItem value="pa">Pará</SelectItem>
                                        <SelectItem value="pb">Paraíba</SelectItem>
                                        <SelectItem value="pr">Paraná</SelectItem>
                                        <SelectItem value="pe">Pernambuco</SelectItem>
                                        <SelectItem value="pi">Piauí</SelectItem>
                                        <SelectItem value="rj">Rio de Janeiro</SelectItem>
                                        <SelectItem value="rn">Rio Grande do Norte</SelectItem>
                                        <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                                        <SelectItem value="ro">Rondônia</SelectItem>
                                        <SelectItem value="rr">Roraima</SelectItem>
                                        <SelectItem value="sc">Santa Catarina</SelectItem>
                                        <SelectItem value="sp">São Paulo</SelectItem>
                                        <SelectItem value="se">Sergipe</SelectItem>
                                        <SelectItem value="to">Tocantins</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </div>
            <div className="flex justify-between mt-4">
                <Button variant="link" onClick={() => setStep('user')}>Voltar</Button>
                <Button type="submit">Concluir</Button>
            </div>
        </form>
      </Form>
    )
  }