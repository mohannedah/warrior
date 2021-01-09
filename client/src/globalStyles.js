import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #000; 
}

 html {
     font-size: 62.5%
     font-weight: 300;
     letter-spacing: 1px;

     @media only screen and (max-width: 75em) {
         font-size: 40%;
     }
      
 }



 h1,h2,h3,h4,h5,p {
     color: white;
 }


 .title {
    @media only screen and (max-width: 61.875em) {
        font-size: 5rem;
    }
 }
 .title-3 {
    @media only screen and (max-width: 61.875em) {
        font-size: 3rem;
    }
 }
 .col-45 {
    @media only screen and (max-width: 61.875em) {
        margin-top: -20rem;
    }
 }


 

`;

export default GlobalStyle;
