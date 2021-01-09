import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Screens/Home";
import SignInScreen from "./Screens/SignInScreen";
import GlobalStyle from "./globalStyles";
import MovieScreen from "./Screens/moviesScreen";
import RegisterScreen from "./Screens/registerScreen";
import PricingScreen from "./Screens/PricingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51I6ziWHut03REFrTHaVyJ1XVCwetlYme8KA708roOq8CoVmbfqkOgKRavH2tfvz2a519eX5EBKEeiOO206udFBxW0075kTl56j"
);

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Route path='/' component={Home} exact />
      <Route path='/signin' component={SignInScreen} exact />
      <Route path='/signup' component={RegisterScreen} exact />
      <Route path='/movies' component={MovieScreen} exact />
      <Route path='/pricing' component={PricingScreen} exact />
      <Route path='/payment/:id'>
        <Elements stripe={stripePromise}>
          <PaymentScreen />
        </Elements>
      </Route>
    </Router>
  );
}

export default App;
