import Layout from "@/components/Layout"
import Link from "next/link";

export default function Products() {
 return( 
 
 
 
 <Layout>
<Link href={'/Products/new'} className="bg-blue-800 rounded-md text-white py-1 px-2" > Add New Products </Link>
 </Layout>
 );
}
