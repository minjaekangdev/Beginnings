import React, { useEffect, useState } from "react";
import "./App.css";
import NavigationBar from "./components/codeChallenge/Navigation";
import Home from "./components/codeChallenge/Home";
import Register from "./components/codeChallenge/Register";
import { Routes, Route } from "react-router-dom";
import Login from "./components/codeChallenge/Login";
import Friends from "./components/codeChallenge/Friends";
import FriendForm from "./components/codeChallenge/FriendForm";
import Jobs from "./components/codeChallenge/Jobs";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import usersService from "./services/usersService";
import JobsForm from "./components/codeChallenge/JobsForm";
import TechCos from "./components/codeChallenge/TechCos";
import TechCosForm from "./components/codeChallenge/TechCosForm";
import Events from "./components/codeChallenge/Events";
import Upload from "./components/codeChallenge/Upload";
import Map from "./components/codeChallenge/Map";
import Error from "./components/codeChallenge/Error";
import Checkout from "./components/codeChallenge/Checkout";
import "@stripe/stripe-js";
import Success from "./components/codeChallenge/Success";
import Cancel from "./components/codeChallenge/Cancel";
//import stripeServices from "./services/stripeServices";
// import CheckoutForm from "./components/codeChallenge/CheckoutForm";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
//import Product from "./components/codeChallenge/Product";

// let stripePromise = loadStripe(
//   "pk_test_51LhJCtEEphuayzqjq36xsOeY0bnXXEeGDjpyo4j71wcqiQxT57xwkHT6yDYiDGNx3MJsckXYlUdpTSpian4FZnTE00VPwQll5O"
// );

function App() {
  const [currentUser, setCurrentUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    avatarUrl: "",
    loggedIn: false,
    roles: 2,
  });
  // const [clientSecret, setClientSecret] = useState("");

  // const appearance = {
  //   theme: "stripe",
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };

  const routeArr = [
    {
      path: "/",
      component: <Home user={currentUser} />,
      exact: false,
      roles: 1,
    },
    {
      path: "/register",
      component: <Register user={currentUser} />,
      exact: false,
      roles: 1,
    },
    {
      path: "login",
      component: <Login user={currentUser} />,
      exact: false,
      roles: 1,
    },
    {
      path: "/friends",
      component: <Friends user={currentUser} />,
      exact: true,
      roles: 1,
    },
    {
      path: "/friends/:friendId",
      component: <FriendForm user={currentUser} />,
      exact: false,
      roles: 2,
    },
    {
      path: "/friends/new",
      component: <FriendForm user={currentUser} />,
      exact: false,
      roles: 2,
    },
    {
      path: "/jobs",
      component: <Jobs user={currentUser} />,
      exact: true,
      roles: 1,
    },
    {
      path: "/jobs/:jobId",
      component: <JobsForm user={currentUser} />,
      exact: false,
      roles: 2,
    },
    {
      path: "/jobs/new",
      component: <JobsForm user={currentUser} />,
      exact: false,
      roles: 2,
    },
    {
      path: "/techcompanies",
      component: <TechCos user={currentUser} />,
      exact: true,
      roles: 1,
    },
    {
      path: "/techcompanies/:coId",
      component: <TechCosForm user={currentUser} />,
      exact: false,
      roles: 2,
    },
    {
      path: "/techcompanies/new",
      component: <TechCosForm user={currentUser} />,
      exact: false,
      roles: 2,
    },
    {
      path: "/events",
      component: <Events user={currentUser} />,
      exact: false,
      roles: 1,
    },
    {
      path: "/map",
      component: <Map user={currentUser} />,
      exact: false,
      roles: 1,
    },
    {
      path: "upload",
      component: <Upload user={currentUser} />,
      exact: false,
      roles: 3,
    },
    {
      path: "checkout",
      component: <Checkout user={currentUser} />,
      exact: false,
      roles: 1,
    },
    {
      path: "success",
      component: <Success />,
      exact: false,
      roles: 1,
    },
    {
      path: "cancel",
      component: <Cancel />,
      exact: false,
      roles: 1,
    },
    // {
    //   path: "checkoutform",
    //   component: (
    //     <Elements options={options} stripe={stripePromise}>
    //       <CheckoutForm clientSecret={clientSecret} />
    //     </Elements>
    //   ),
    //   exact: false,
    //   roles: 1,
    // },
  ];
  // const item = {
  //   price: "price_1LhLiwEEphuayzqjLQ6HOwbo",
  //   quantity: 1,
  // };

  useEffect(() => {
    var onGetCurrUserSucc = (response) => {
      const userId = response.data.item.id;

      var onGetUserSuccess = (response) => {
        //console.log(response);
        const userFirstName = response.data.item.firstName;
        const userLastName = response.data.item.lastName;
        const userAvatarUrl = response.data.item.avatarUrl;
        const userEmail = response.data.item.email;

        setCurrentUser((prevState) => {
          const currUserData = { ...prevState };
          currUserData.id = userId;
          currUserData.firstName = userFirstName;
          currUserData.lastName = userLastName;
          currUserData.email = userEmail;
          currUserData.avatarUrl = userAvatarUrl;
          currUserData.loggedIn = true;

          return currUserData;
        });
      };
      var onGetUserError = (error) => {
        console.log(error);
      };
      usersService
        .getUserById(userId)
        .then(onGetUserSuccess)
        .catch(onGetUserError);
    };
    var onGetCurrUserErr = (error) => {
      console.log(error);
    };

    usersService.currentUser().then(onGetCurrUserSucc).catch(onGetCurrUserErr);

    // Create PaymentIntent as soon as the page loads
    // stripeServices
    //   .createPaymentIntent(item)
    //   .then(
    //     (res) => setClientSecret(res.data.clientSecret) && console.log(res)
    //   );

    //console.log(clientSecret);
  }, []);

  return (
    <React.Fragment>
      <NavigationBar user={currentUser} setUser={setCurrentUser} />
      <main role="main">
        <Routes>
          {routeArr.map((route) => {
            if (route.roles <= currentUser.roles) {
              return (
                <Route
                  exact={route.exact}
                  path={route.path}
                  key={route.path}
                  element={route.component}
                />
              );
            } else {
              return (
                <Route path={route.path} key={route.path} element={<Error />} />
              );
            }
          })}
        </Routes>
      </main>

      <ToastContainer closeButton={true} position="top-right" />

      {/* need to make the footer stick to the bottom */}
      <footer className="container">
        <p>&copy; Sabio 2019-2020</p>
      </footer>
    </React.Fragment>
  );
}

export default App;
