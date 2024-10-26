import React, { useState , useContext } from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { MyContext } from "../../context/Context";

const GigCard = ({ item , gigs }) => {
  const [loading, setLoading] = useState(false);
  console.log(item);
  const {setcurrgig ,navigate} = useContext(MyContext)

  const fetchGigData = async (gigId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/gigs/${gigId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const gigData = await response.json();
      setcurrgig(gigData)
      if(gigData){
        navigate(`/gig/${gigId}`)
      }
      return gigData;
    } catch (error) {
      console.error("Error fetching gig data:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link onClick={() => fetchGigData(item._id)} className="link">
      <div className="gigCard">
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <>
            <img src={item.cover} alt="" />
            <div className="info">
              <div className="user">
                <img src={item.userId.img} alt="" />
                <span>{item.userId.name}</span>
              </div>
              <p>{item.desc}</p>
              <div className="star">
                <img src="/img/star.png" alt="" />
                <span>{item.totalStars}</span>
              </div>
            </div>
            <hr />
            <div className="detail">
              <img src="/img/heart.png" alt="" />
              <div className="price">
                <span>Expected Price</span>
                <h2>
                ₹ {item.price}
                </h2>
              </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default GigCard;
