import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent, 
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { getAllProducts } from "@/services/product"
import { Product } from "@/types/product";
import { ProductEmpty } from "@/components/products/empty";
import { ProductItem } from "@/components/products/Item";

type Tab = {
  title: string;
  value: string;
  products: Product[];
}

export async function ProductsTab() {
  const products = await getAllProducts();

  const tabs: Tab[] = [
    {
        title: 'Sushi',
        value: 'sushi',
        products: products.filter(item => item.category === 'sushi')
    },
    {
        title: 'Temaki',
        value: 'temaki',
        products: products.filter(item => item.category === 'temaki')
    },
    {
        title: 'Combinados',
        value: 'pack',
        products: products.filter(item => item.category === 'pack')
    },
    {
        title: 'Bebidas',
        value: 'beverage',
        products: products.filter(item => item.category === 'beverage')
    },
  ];

  return (
    <Tabs defaultValue="sushi" className="w-full">
        <TabsList className="flex justify-around">
        {tabs.map((item) => 
            <TabsTrigger
                key={item.value}
                value={item.value}
                className="flex-1"
            >
                {item.title}
            </TabsTrigger>
        )}
      </TabsList>

        {tabs.map(item => 
            <TabsContent value={item.value} key={item.value} className="mt-6">
                {item.products.length > 0 &&
                    <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                        {item.products.map(product => 
                            <ProductItem key={product.id} item={product} />
                        )}
                    </div>
                }
                {item.products.length === 0 && <ProductEmpty/>}
            </TabsContent>
        )}
    </Tabs>
    )
}
