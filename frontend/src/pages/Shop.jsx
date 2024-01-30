import { Container } from "@mui/material";
import ProductList from "../bigComponents/ProductList";
import "../styles.css";
import { Link } from "react-scroll";
import Header from "./Header";

export default function Shop() {
  return (
    <>
    {/* <Header /> */}
    <div className="App">
     
      <h1 style={{color:"black"}}>Shop your plastic-free routine.</h1>
      <header className="nav" style={{margin:"auto"}}>
        <nav className="nav__container__actions" >
          <ul>
            <li>
              <Link activeClass="active" smooth spy to="all">
               ALL
              </Link>
            </li>
            <li>
              <Link activeClass="active" smooth spy to="bestsellers">
               BEST SELLERS
              </Link>
            </li>
            <li>
              <Link activeClass="active" smooth spy to="sets">
                SETS
              </Link>
            </li>
            <li>
              <Link activeClass="active" smooth spy to="oralcare">
                ORAL CARE 
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Container id="all"   sx={{ m: 6 }} >
        <h3 style={{color:"black"}}>ALL</h3>
        <ProductList />
      </Container>
      <Container id="bestsellers"   sx={{ m: 6 }} >
      <h3 style={{color:"black"}}>BEST SELLERS</h3>
        <ProductList />
      </Container>
      <Container id="sets"   sx={{ m: 6 }} >
      <h3 style={{color:"black"}}>SETS</h3>
        <ProductList />
      </Container>
      <Container id="oralcare"   sx={{ m: 6}} style={{paddingBottom:"5%"}} >
      <h3 style={{color:"black"}}>ORAL CARE</h3>
        <ProductList />
      </Container>
      {/* <section id="bestsellers">BEST SELLERS</section> */}
      {/* <section id="sets">SETS</section>
      <section id="oralcare">ORAL CARE</section> */}
    </div>
    </>
  );
}