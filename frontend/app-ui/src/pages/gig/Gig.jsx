import React, { useContext, useEffect } from "react";
import "./Gig.scss";
import { MyContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";

function Gig() {
  const { currgig } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currgig) {
      navigate("/gigs");
    }
  }, [currgig, navigate]);

  if (!currgig) {
    return null; // Return null or a loading spinner if currgig is not available
  }

  console.log(currgig);

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">Liverr  {currgig.cat} </span>
          <h1>{currgig.title}</h1>
          <div className="user">
            <img
              className="pp"
              src={currgig.userId.img || "https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"}
              alt=""
            />
            <span>{currgig.userId.name}</span>
            <div className="stars">
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <span>{currgig.totalStars}</span>
            </div>
          </div>
          <div className="slider">
            {currgig.images.map((image, index) => (
              <img key={index} src={image} alt="" className="slider-image" />
            ))}
          </div>
          <h2>About This Gig</h2>
          <p>{currgig.desc}</p>
          <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img
                src={currgig.userId.img || "https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                alt=""
              />
              <div className="info">
                <span>{currgig.userId.name}</span>
                <div className="stars">
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <span>{currgig.totalStars}</span>
                </div>
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{currgig.userId.country || "USA"}</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">{new Date(currgig.userId.createdAt).toLocaleDateString() || "Aug 2022"}</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">{currgig.userId.responseTime || "4 hours"}</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">{currgig.userId.lastDelivery || "1 day"}</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">{currgig.userId.languages || "English"}</span>
                </div>  
              </div>
              <hr />
              <p>{currgig.userId.bio || "My name is Anna, I enjoy creating AI generated art in my spare time. I have a lot of experience using the AI program and that means I know what to prompt the AI with to get a great and incredibly detailed result."}</p>
            </div>
          </div>
          <div className="reviews">
            <h2>Reviews</h2>
            {/* Reviews would be dynamically loaded here */}
          </div>
        </div>
        <div className="right">
          <div className="price">
            <h3>{currgig.shortTitle}</h3>
            <h2>₹ {currgig.price}</h2>
          </div>
          <p>{currgig.shortDesc}</p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>{currgig.deliveryTime} Days Delivery</span>
            </div>
          </div>
          <div className="features">
            {currgig.features.map((feature, index) => (
              <div className="item" key={index}>
                <img src="/img/greencheck.png" alt="" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Gig;
