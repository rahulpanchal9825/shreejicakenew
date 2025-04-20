import React, { useState, useEffect } from "react";
import cake1 from "./cake1.jpg";
import cake2 from "./cake2.jpg";
import { useMediaQuery } from "react-responsive";
import "aos/dist/aos.css";
import AOS from "aos";
import { AppBar, Box, Card, CardContent, CardMedia, Container, Grid, Link, TextField, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate()
  console.log("transformedData",transformedData)
  const handleClick = (id) => {
    navigate(`cake/${id}`);
  };
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
        <Box>
        {/* Header */}
        <AppBar position="static" sx={{ background: "#fff", color: "#000" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Shreeji Baker's</Typography>
            {/* <TextField variant="outlined" size="small" placeholder="Search" sx={{ marginRight: 2 }} /> */}
          </Toolbar>
        </AppBar>
  
        {/* Banner */}
        <Box sx={{ textAlign: "center", padding: 4, backgroundColor: "#eaf6f6" }}>
          <Typography variant="h4">CAKES BY CATEGORY</Typography>
          <Typography variant="body1" maxWidth={600} margin="auto">
                    Explore our delicious range of cakes categorized by flavors. Whether you love chocolate, fruit-based, or classic vanilla, we have something for every taste bud.
                    Homemade cake is the best way to make any occasion extra-special.
          </Typography>
        </Box>
  
        <Container>
          <Grid container spacing={4} sx={{ marginTop: 4 }}>
  
            {/* Cake Grid */}
            <Grid item xs={12} md={9}>
              {transformedData?.map((category,index) => (
                <Box key={index} sx={{ marginBottom: 4 }} 
                
                >
                  <Typography variant="h5" sx={{ marginBottom: 2 }}>{category?.category}</Typography>
                  <Grid container spacing={3}>
                    {category?.items?.map((cake,index2) => (
                      <Grid item xs={12} sm={6} md={4} key={cake.id} sx={{cursor:"pointer"}}
                      onClick={()=>handleClick(cake?._id)}
                       >
                            <Card>
                            <Link to={`/cake/${cake?.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                          <CardMedia component="img" height="200" image={cake?.img} alt={cake?.title} />
                          <CardContent>
                            <Typography variant="h6">{cake?.title}</Typography>
                                    </CardContent>
                                    </Link>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
      )}
    </>
  );
};

export default Home;
