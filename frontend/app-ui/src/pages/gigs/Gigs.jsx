import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { MyContext } from "../../context/Context";
import { Spinner } from "@chakra-ui/react"; // Import Chakra UI Spinner

function Gigs() {
  const { userInfo ,setUserInfo} = useContext(MyContext);
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const [gigs, setGigs] = useState([]);
  const [filteredGigs, setFilteredGigs] = useState([]); // Add filteredGigs state
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // Add loading state
  const gigsPerPage = 8;
  const minRef = useRef();
  const maxRef = useRef();

  useEffect(()=>{
    if(!userInfo){
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")))
    }
  },[userInfo])

  useEffect(() => {
    const fetchGigs = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get(`http://localhost:3000/api/gigs/`);
        console.log(response.data);
        setGigs(response.data);
        setFilteredGigs(response.data); // Set filteredGigs to the fetched data
      } catch (error) {
        console.error("Error fetching gigs:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchGigs();
  }, [sort]);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    const min = minRef.current.value;
    const max = maxRef.current.value;
    let newFilteredGigs = [...gigs]; // Make a copy of gigs
    if (min && !max) {
      newFilteredGigs = newFilteredGigs.filter(gig => gig.price >= min);
    } else if (!min && max) {
      newFilteredGigs = newFilteredGigs.filter(gig => gig.price <= max);
    } else if (min && max) {
      newFilteredGigs = newFilteredGigs.filter(gig => gig.price >= min && gig.price <= max);
    }
    setFilteredGigs(newFilteredGigs); // Set the filtered gigs
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(filteredGigs.length / gigsPerPage);
  const startIndex = (page - 1) * gigsPerPage;
  const endIndex = startIndex + gigsPerPage;
  const currentGigs = filteredGigs.slice(startIndex, endIndex);

  return (
    <div className="gigs">
      <div className="container">  
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
          {loading ? (
            <Spinner size="xl" />
          ) : (
            currentGigs.map((gig) => (
              <GigCard key={gig.id} item={gig} />
            ))
          )}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={page === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
