import { useState } from "react"
import "./ListProduct.css"
import { useEffect } from "react"
import cross_icon from '../../assets/cross_icon.png'
const ListProduct = () => {

    const [allproducts, setAllProducts] = useState([])

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
            .then((res) => res.json())
            .then((data) => { setAllProducts(data); });
    }
    
    useEffect(()=>{
        fetchInfo()
    }, [])

    // function for removing product from the product list 
    const remove_product = async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });
        // updated product list will be shown 
        await fetchInfo();
    }
    


  return (
    <div className='list-product'>
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
        </div>
        {/* here we will map our product data that we will fetch using the api   */}
        
        <div className="listproduct-allproducts">
            <hr />
            {allproducts.map((product, index)=>{
                return <><div key={index} className="listproduct-format-main listproduct-format">
                    <img src={product.image} alt="" className="listproduct-product-icon" />
                    <p>{product.name}</p>
                    <p>${product.old_price}</p>
                    <p>${product.new_price}</p>
                    <p>{product.category}</p>
                    <img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
                    
                </div>
                <hr />
                </>
            })}
        </div>
    </div>
   
  )
}

export default ListProduct