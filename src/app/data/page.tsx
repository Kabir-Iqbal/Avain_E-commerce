"use client"
import { client } from '@/sanity/lib/client'
import { useAppDispatch } from '../lib/store/hooks'
import { setProducts } from '../lib/store/feature/sanityData/SanitySlice'
import React, { useEffect, useState } from 'react'

const Data = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const [products, setProductsState] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        
   
      const data = await client.fetch(`*[_type == "product"] {
        category,
        name,
        slug,
        "image": image.asset->url,
        price,
        quantity,
        tags,
        description,
        features,
        dimensions,
      }`)
      
      dispatch(setProducts(data))  // Dispatch the data to Redux store
      setProductsState(data)  // Update local state for rendering
      setLoading(false)  // Stop loading after data is fetched
       // Log the fetched data
    console.log('Data fetched from Sanity:', data);
    } 
     catch (error) {
        console.log(error);
        
    }
  }

    fetchData()
  }, [dispatch])

  if (loading) {
    return <p>Loading...........</p>
  }

  return (
    <div>
    
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.slug.current}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            {/* Display other product details here */}
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  )
}

export default Data
