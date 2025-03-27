"use client";
import { client } from "@/sanity/lib/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";


const Page = () => {
  const searchParams = useSearchParams();    // used for getting data from query
  const query = searchParams.get("query")?.toLowerCase() || "";     
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(`*[_type == "product"] {
          "category": category->name, // ✅ Resolve reference to get actual category name
          name,
          slug,
          "image" : image.asset->url,
          price,
          quantity,
          tags,
          description,
          features,
          dimensions,
        }`);

        if (query) {
          const results = data.filter((product: any) =>
            product.name.toLowerCase().includes(query)
          );
          setData(results);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Search Results for: <span className="text-indigo-600">"{query}"</span>
      </h1>

      {Data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Data.map((product: any) => 
          (
            <Link key={product.slug?.current} href={`/${product.slug.current}`}>
              <div className="relative bg-white shadow-lg rounded-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
                {/* Product Image */}
                <div className="w-full h-60 bg-gray-200">
                  <Image
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                  />
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                     {`$${product.price} `}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-indigo-600">
                    $   {typeof product.category === "string" ? product.category : "No category"}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg mt-6">No products found.</p>
      )}
    </div>
  );
};

export default Page;
