import React, { useEffect, useState } from "react";
 import { useParams } from "react-router-dom";
 import { Box, Typography, Container, CardMedia, CircularProgress } from "@mui/material";
 
 const Single = () => {
   const { id } = useParams();
   const [cake, setCake] = useState(null);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     const fetchCake = async () => {
       try {
         const response = await fetch(
            // `https://cakenewback1.vercel.app/api/cake?id=${id}`
            `http://localhost:5000/api/cake?id=${id}`
        );
         const data = await response.json();
         console.log("12312312312",data?.product)
         setCake(data?.product);
       } catch (err) {
         console.error("Error fetching cake:", err);
       } finally {
         setLoading(false);
       }
     };
 
     fetchCake();
   }, []);
 
   if (loading) return <CircularProgress sx={{ display: 'block', margin: '2rem auto' }} />;
 
   if (!cake) return <Typography variant="h6">Cake not found</Typography>;

   return (
     <Container sx={{ marginTop: 4 }}>
       <Typography variant="h4" gutterBottom>{cake.title}</Typography>
       <CardMedia
         component="img"
         height="300"
         image={cake?.img || "https://via.placeholder.com/400"}
         alt={cake?.title}
         sx={{ borderRadius: 2 }}
       />
       <Box mt={2}>
         <Typography variant="body1">{cake?.description || "No description available."}</Typography>
         <Typography variant="h6" mt={2}>Price: ₹{cake?.price}</Typography>
       </Box>
     </Container>
   );
 };
 
 export default Single;
