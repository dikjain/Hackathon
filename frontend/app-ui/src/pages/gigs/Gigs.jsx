import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { MyContext } from "../../context/Context";

function Gigs() {
  const { userInfo ,setUserInfo} = useContext(MyContext);
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const [gigs, setGigs] = useState([]);
  const minRef = useRef();
  const maxRef = useRef();

  useEffect(()=>{
    if(!userInfo){
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")))
    }
  },[userInfo])

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/gigs/`);
        console.log(response.data);
        setGigs(response.data);
      } catch (error) {
        console.error("Error fetching gigs:", error);
      }
    };

    fetchGigs();
  }, [sort]);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    console.log(minRef.current.value);
    console.log(maxRef.current.value);
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Liverr Graphics & Design </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>    
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="/img/down.png" alt="Sort Icon" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("popular")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {gigs.map((gig) => (
            <GigCard key={gig.id} item={gig} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
