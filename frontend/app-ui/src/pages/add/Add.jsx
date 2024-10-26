import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Add.scss";
import { useContext } from "react";
import { MyContext } from "../../context/Context";
import { Spinner } from "@chakra-ui/react"; // Import Chakra UI Spinner

const Add = () => {
  const { userInfo, navigate ,setUserInfo} = useContext(MyContext);
  useEffect (()=>{
    if(!userInfo){
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")))
    }
  },[userInfo])
  const [formData, setFormData] = useState({
    title: "",
    category: "design", // Set default value to "design"
    coverImage: null,
    uploadImages: [],
    description: "",
    serviceTitle: "",
    shortDescription: "",
    deliveryTime: "",
    features: ["", "", "", ""],
    price: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "ddtkuyiwb");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/ddtkuyiwb/image/upload", {
        method: "post",
        body: data,
      });
      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error("Error uploading to Cloudinary", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const coverImageUrl = await uploadToCloudinary(formData.coverImage[0]);
    const uploadImagesUrls = await Promise.all(
      Array.from(formData.uploadImages).map((file) => uploadToCloudinary(file))
    );

    const data = {
      title: formData.title,
      category: formData.category,
      coverImage: coverImageUrl,
      uploadImages: uploadImagesUrls,
      description: formData.description,
      serviceTitle: formData.serviceTitle,
      shortDescription: formData.shortDescription,
      deliveryTime: formData.deliveryTime,
      features: formData.features,
      price: formData.price,
      userId: userInfo._id,
    };

    try {
      const response = await axios.post("http://localhost:3000/api/gigs/post", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        navigate("/gigs");
      }
    } catch (error) {
      console.error("Error submitting form data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1 style={{ fontFamily: 'Arial, sans-serif' }}>Add New Gig</h1>
        <form onSubmit={handleSubmit} className="sections">
          <div className="info">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="category">Category</label>
            <select name="category" id="cats" onChange={handleChange} value={formData.category}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <label htmlFor="coverImage">Cover Image</label>
            <input type="file" name="coverImage" onChange={handleChange} />
            <label htmlFor="uploadImages">Upload Images</label>
            <input type="file" name="uploadImages" multiple onChange={handleChange} />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Create"}
            </button>
          </div>
          <div className="details">
            <label htmlFor="serviceTitle">Service Title</label>
            <input
              type="text"
              name="serviceTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="shortDescription">Short Description</label>
            <textarea
              name="shortDescription"
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="deliveryTime">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="features">Add Features</label>
            {formData.features.map((feature, index) => (
              <input
                key={index}
                type="text"
                placeholder={`e.g. feature ${index + 1}`}
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
              />
            ))}
            <label htmlFor="price">Price</label>
            <input type="number" name="price" onChange={handleChange} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
