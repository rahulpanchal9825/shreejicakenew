import React, { useState, useEffect } from "react";
import cake1 from "./cake1.jpg";
import cake2 from "./cake2.jpg";
import { useMediaQuery } from "react-responsive";
import "aos/dist/aos.css";
import AOS from "aos";
const Home = () => {
  const [data, setData] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 430 }); // Mobile breakpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://cakenewback1.vercel.app/api/all-p"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

  const data3 = data?.categoryProducts || [];
  const transformedData = Object.entries(data3).map(([category, items]) => ({
    category,
    items,
  }));

  useEffect(() => {
    AOS.init({ duration: 1000, once: false }); // Allows animation to repeat on scroll
  }, []);
  return (
    <>
      {!transformedData?.length > 0 ? (
        <img
          src={decodeURIComponent("https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXB4amYxaWEwazNzd3pkaXgxdjl4dnlobmwxbWhua2NpZTFyeHF5YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uIJBFZoOaifHf52MER/giphy.gif")}
          alt="loading"
          width="100%"
          onError={(e) => console.log("Image failed to load:", e.target.src)}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            background: "#000",
            overflowY: "auto",
          }}
          data-aos="fade-up"
        >
          <div style={{ width: "70%", height: "100%" }}>
            <img src={cake1} width="100%" alt="Cake 1" />
            <div className="container1">
              {transformedData
                ?.sort((a, b) => b - a)
                ?.map((ele, index) => (
                  <div key={index} className="item">
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      {" "}
                      <div>{ele?.category}</div> <div>{`   500mg`}</div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "start",
                        // justifyContent: 'space-between',
                        fontSize: "16px",
                        marginBottom: "30px",
                        flexWrap: "wrap",
                      }}
                    >
                      {ele?.items?.map((data2, index2) => (
                        <div
                          key={index2}
                          style={{
                            display: "flex",
                            alignItems: "start",
                            justifyContent: "space-between",
                            fontSize: "14px",
                            marginBottom: "10px",
                            marginRight: "20px",
                            flexDirection: "column",
                            // width:"100%",
                            flexWrap: "wrap",
                          }}
                        >
                          <img
                            src={decodeURIComponent(data2?.img)}
                            width={isMobile?'100%':`200px`}
                            style={{ aspectRatio: "16/9" }}
                            alt="cake-new"
                            // data-aos="fade-down"
                          />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                fontWeight: "400",
                                width: "70%",
                                fontWeight: "600",
                                fontSize: `${isMobile ? "10px" : "16px"}`,
                              }}
                            >
                              {data2?.title}
                            </div>
                            <div
                              style={{
                                fontWeight: "400",
                                fontSize: `${isMobile ? "10px" : "16px"}`,
                              }}
                            >
                              {data2?.price} /-
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
            <img src={cake2} width="100%" alt="Cake 2" />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
