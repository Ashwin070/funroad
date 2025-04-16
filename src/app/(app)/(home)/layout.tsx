import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";
import { Category } from '@/payload-types';

interface Props {
    children: React.ReactNode
}
const Layout = async({children}: Props) => {
    const payload = await getPayload({
          config: configPromise,
        })
        const data = await payload.find({
            collection: 'categories',
            depth: 1,
            pagination: false,
            where: {
              parent: {
                exists: false
              }
            }
          });

          const formattedData = data.docs.map((doc) => ({
            ...doc,
            subCategories: (doc.subCategories?.docs ?? []).map((doc) => ({
                ...(doc as Category),
                subCategories: undefined
            })) 
          }));

    return ( 
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <SearchFilters data={formattedData} />
            <div className="flex-1 bg-[#F4F4F0]">
                {children}
            </div>
            <Footer />
        </div>
     );
}
 
export default Layout;