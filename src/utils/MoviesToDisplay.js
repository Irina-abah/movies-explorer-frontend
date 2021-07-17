// import React from 'react';

// const displayMovieCards = () => {

//   const [width, setWidth] = React.useState(window.innerWidth);
//   const desktopBreakPoint = 1280;
//   const tabletBreakPoint = 768;
//   const mobileBreakPoint = 480;

 

//   React.useEffect(() => {
//    const handleWindowResize = () => setWidth(window.innerWidth);
//    window.addEventListener("resize", handleWindowResize);

    
//    return () => window.removeEventListener("resize", handleWindowResize);
//   },[]);

//   return (
//     <div>
//       {width > desktopBreakPoint? (
//         <div>I show on 1451px or higher</div>
//       ) : (
//         <div>I show on 1450px or lower</div>
//       )}
//     </div>
//   );
// };

// export default displayMovieCards;