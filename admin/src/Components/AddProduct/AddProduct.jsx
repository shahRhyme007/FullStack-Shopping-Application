
import './AddProduct.css'
import upload_area from "../../assets/upload_area.svg"
import { useState } from 'react'

const AddProduct = () => {
    // Adding a state variable for the upload image option so that the image is 
    // displayed once uploaded
    const [image, setImage] = useState(false)
    
    //gathering product details 
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    });
    



    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }

    // function for getting the information put in the input fiels by the user
    const changeHandler = (e) =>{
        setProductDetails({
            ...productDetails, [e.target.name]: e.target.value
        })
    }

    // function for add product button
    // TODO: ADD THE PRODUCT DETAILS TO THE DATABASE(BACKEND)
    const Add_Product = async ()=>{
        // console.log(productDetails);

        let responseData; 
        // creating a copy of productDetails object
        let product = productDetails; 

        let formData = new FormData()
        // we will append the img in the form data
        formData.append("product", image)

        // now we have to send the form data to the api(fetchapi) to send to backend
        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((resp) => resp.json()).then((data) => {responseData = data});
        
        // is success then image is stored in the multer image storage and will get the image url
        if (responseData.success)
        {
            product.image = responseData.image_url
            console.log(product);
            // we received the image url now we can send it to the app product endpoint
            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((resp) => resp.json()).then((data) => {
                data.success ? alert("Product Added Successfully") :
                               alert("Failed to Add Product to Database");
            });
            
        }


    }


  return (
    <div className="add-product">
        {/* product name */}
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type here" />
        </div>

        {/* product Price */}
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type here" />
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Type here" />
            </div>
        </div>
        {/* product cattegory */}
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>

        {/* image upload of the product */}
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                {/* if image seleced show the selected image otherwise show the upload area image */}
                <img src={image ? URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />
            </label>
            {/* hidden is used to hide the input field . so the img is just shown */}
            <input onChange={imageHandler} type="file" name='image' id ="file-input"  hidden/>  
        </div>

        {/* add button */}
        <button onClick={()=>Add_Product()} className="addproduct-btn">ADD</button>
    </div>
  )
}

export default AddProduct