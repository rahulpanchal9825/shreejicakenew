import React, { useState, useEffect } from 'react';
import cake1 from './cake1.jpg';
import cake2 from './cake2.jpg';
import { useMediaQuery } from "react-responsive";
const Home = () => {
  const [data, setData] = useState([]);
  const isMobile = useMediaQuery({ maxWidth:430 }); // Mobile breakpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://cakenewback1.vercel.app/api/all-p');
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

  console.log('dfdisuhfioh', transformedData);

  return (
    <div
      style={{
        width: '100%',
        // height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        background: '#000',
        overflowY:"auto"
      }}
    >
      <div style={{ width: '50%' }}>
        <img src={cake1} width="100%" alt="Cake 1" />
        <div className="container1">
          {transformedData?.sort((a,b)=>b-a)?.map((ele, index) => (
            <div key={index} className="item">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '16px',
                  marginBottom:"20px"
                }}
              >
                <div>{ele?.category}</div>
                <div>500mg</div>
              </div>

              {ele?.items?.map((data2, index2) => (
                <div
                  key={index2}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    marginBottom:"20px"
                  }}
                >
                  <img src={data2?.img} width="50%" style={{aspectRatio:"16/9"}}/>
                  <div style={{ fontWeight: '400', fontSize: `${isMobile ? "10px":"20px"}`}}>{data2?.title}</div>
                  <div style={{ fontWeight: '400', fontSize: `${isMobile ? "10px":"20px"}` }}>{data2?.price} /-</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <img src={cake2} width="100%" alt="Cake 2" />
      </div>
    </div>
  );
};

export default Home;
