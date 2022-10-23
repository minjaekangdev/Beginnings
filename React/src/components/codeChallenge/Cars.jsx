import React, { useEffect, useState } from "react";
import SingleCar from "./SingleCar";

function Cars() {
  const [cars] = useState([
    {
      make: "Kia",
      model: "Sorento",
      year: 2020,
    },
    {
      make: "Kia",
      model: "Optima",
      year: 2019,
    },
    {
      make: "Tesla",
      model: "Model 3",
      year: 2021,
    },
    {
      make: "Honda",
      model: "Civic",
      year: 2019,
    },
    {
      make: "Honda",
      model: "Accord",
      year: 2018,
    },
    {
      make: "Volkswagen",
      model: "Jetta",
      year: 2021,
    },
    {
      make: "Toyota",
      model: "Camry",
      year: 2021,
    },
    {
      make: "Ford",
      model: "Mustang",
      year: 2019,
    },
    {
      make: "Ford",
      model: "F-150",
      year: 2019,
    },
    {
      make: "Toyota",
      model: "Camry",
      year: 2020,
    },
    {
      make: "Ford",
      model: "F-150",
      year: 2021,
    },
  ]);

  const [displayCars, setDisplayCars] = useState({
    cars: [],
    carComponents: [],
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    setDisplayCars((prevState) => {
      const pd = { ...prevState };
      pd.cars = cars;
      pd.carComponents = cars.map(mapCars);

      return pd;
    });
  }, []);

  const mapCars = (car) => {
    return <SingleCar car={car} key={car.year + car.model}></SingleCar>;
  };

  const onShowClick = (e) => {
    e.preventDefault();
    setShow(() => {
      return !show;
    });
  };

  const on2018Click = (e) => {
    e.preventDefault();

    setDisplayCars((prevState) => {
      const pd = { ...prevState };

      pd.cars = cars.filter((car) => {
        return car.year === 2018;
      });
      pd.carComponents = pd.cars.map(mapCars);

      return pd;
    });
  };

  const on2019Click = (e) => {
    e.preventDefault();
    setDisplayCars((prevState) => {
      const pd = { ...prevState };

      pd.cars = cars.filter((car) => {
        return car.year === 2019;
      });
      pd.carComponents = pd.cars.map(mapCars);

      return pd;
    });
  };

  const on2020Click = (e) => {
    e.preventDefault();
    setDisplayCars((prevState) => {
      const pd = { ...prevState };

      pd.cars = cars.filter((car) => {
        return car.year === 2020;
      });
      pd.carComponents = pd.cars.map(mapCars);

      return pd;
    });
  };

  const on2021Click = (e) => {
    e.preventDefault();

    setDisplayCars((prevState) => {
      const pd = { ...prevState };

      pd.cars = cars.filter((car) => {
        return car.year === 2021;
      });
      pd.carComponents = pd.cars.map(mapCars);

      return pd;
    });
  };

  const onAllClick = (e) => {
    e.preventDefault();

    setDisplayCars((prevState) => {
      const pd = { ...prevState };

      pd.cars = cars;
      pd.carComponents = cars.map(mapCars);

      return pd;
    });
  };

  return (
    <React.Fragment>
      <div className="container m-5 p-5">
        <button className="btn btn-primary m-2" onClick={onShowClick}>
          Show Cars
        </button>
        <div className="row">
          <div className="col">
            <button
              className="btn btn-info m-2"
              id="show-all-cars"
              onClick={onAllClick}
            >
              All Cars
            </button>
            <button
              className="btn btn-secondary m-2"
              id="show-2018-cars"
              onClick={on2018Click}
            >
              2018 Cars
            </button>
            <button
              className="btn btn-success m-2"
              id="show-2019-cars"
              onClick={on2019Click}
            >
              2019 Cars
            </button>
            <button
              className="btn btn-danger m-2"
              id="show-2020-cars"
              onClick={on2020Click}
            >
              2020 Cars
            </button>
            <button
              className="btn btn-warning m-2"
              id="show-2021-cars"
              onClick={on2021Click}
            >
              2021 Cars
            </button>
          </div>
        </div>
        <div className="container m-2 p-2">
          <div className="row">{show && displayCars.carComponents}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Cars;
