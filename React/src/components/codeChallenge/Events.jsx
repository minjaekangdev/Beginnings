import React, { useState, useEffect } from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import eventsService from "../../services/eventsService";
import EventCard from "./EventCard";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import EventForm from "./EventForm";
import Loki from "react-loki";
import EventForm2 from "./EventForm2";
import { Formik, Form } from "formik";
import toastr from "toastr";
import { IoInformationCircle, IoNavigateCircleOutline } from "react-icons/io5";
import "../../styling/loki.css";
import * as Yup from "yup";

function Events() {
  const [mainEvent, setMainEvent] = useState({
    headline: "",
    summary: "",
    description: "",
    metaData: {
      dateStart: "",
      dateEnd: "",
      location: {
        address: "",
        zipCode: "",
      },
    },
  });
  const [formData, setFormData] = useState({
    metaData: {
      dateStart: "",
      dateEnd: "",
      location: {
        latitude: "",
        longitude: "",
        zipCode: "",
        address: "",
      },
    },
    name: "",
    headline: "",
    description: "",
    summary: "",
    slug: "",
    statusId: "",
  });
  const [editId, setEditId] = useState(null);
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [eventsData, setEventsData] = useState({
    eventsArr: [],
    eventsComponents: [],
  });
  const [paginData, setPaginData] = useState();
  const [defaultPageSize] = useState(3);
  const [pageIndex, setPageIndex] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCards, setTotalCards] = useState();
  const [state, setState] = useState({
    isOpen: false,
  });
  const [geoData, setGeoData] = useState({
    latitude: "",
    longitude: "",
    radius: "",
  });
  const [finalStep, setFinalStep] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setFinalStep(false);
    setState((prevState) => {
      return {
        isOpen: !prevState.isOpen,
      };
    });
  };

  useEffect(() => {
    // console.log(props.user, "tests");
    const onGetEventsSuccess = (response) => {
      //console.log(response.data.item.pagedItems);
      const responseArr = response.data.item.pagedItems;

      setMainEvent((prevState) => {
        const pd = { ...prevState };

        pd.headline = responseArr[0].headline;
        pd.summary = responseArr[0].summary;
        pd.description = responseArr[0].description;
        pd.metaData.dateStart = responseArr[0].metaData[0].dateStart;
        pd.metaData.dateEnd = responseArr[0].metaData[0].dateEnd;
        pd.metaData.location.address =
          responseArr[0].metaData[0].location[0].address;
        pd.metaData.location.zipCode =
          responseArr[0].metaData[0].location[0].zipCode;
        pd.metaData.location.latittude =
          responseArr[0].metaData[0].location[0].latitude;
        pd.metaData.location.longitude =
          responseArr[0].metaData[0].location[0].longitude;

        return pd;
      });

      setTotalCards(() => {
        return responseArr.length;
      });

      setEventsData((prevState) => {
        const pd = { ...prevState };
        pd.eventsArr = responseArr;
        pd.eventsComponents = responseArr.map(mapArr);
        //console.log(eventsData);
        setPaginData(() => {
          return responseArr.slice(0, 3).map(mapArr);
        });

        return pd;
      });
    };
    const onGetEventsError = (error) => {
      console.log(error);
    };
    eventsService
      .getEvents(0, 100)
      .then(onGetEventsSuccess)
      .catch(onGetEventsError);
  }, [state]);

  const onViewMoreClick = (eventData, e) => {
    e.preventDefault();
    //console.log(eventData);
    setMainEvent((prevState) => {
      const pd = { ...prevState };

      pd.headline = eventData.headline;
      pd.summary = eventData.summary;
      pd.description = eventData.description;
      pd.metaData.dateStart = eventData.metaData[0].dateStart;
      pd.metaData.dateEnd = eventData.metaData[0].dateEnd;
      pd.metaData.location.address = eventData.metaData[0].location[0].address;
      pd.metaData.location.zipCode = eventData.metaData[0].location[0].zipCode;

      return pd;
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("[Required]"),
    headline: Yup.string().required("[Required]"),
    description: Yup.string().required("[Required]"),
    summary: Yup.string().required("[Required]"),
    slug: Yup.string().required("[Required]"),
    metaData: Yup.object().shape({
      dateStart: Yup.string().required("[Required]"),
      dateEnd: Yup.string().required("[Required]"),
      location: Yup.object().shape({
        address: Yup.string().required("[Required]"),
      }),
    }),
  });

  const onEditClick = (eventData, e) => {
    e.preventDefault();
    //console.log(eventData);
    setFormData((prevState) => {
      const pd = { ...prevState };
      pd.metaData.dateEnd = eventData.metaData[0].dateEnd.slice(0, 10);
      pd.metaData.dateStart = eventData.metaData[0].dateStart.slice(0, 10);

      pd.metaData.location.address = eventData.metaData[0].location[0].address;
      pd.metaData.location.zipCode = eventData.metaData[0].location[0].zipCode;
      pd.metaData.location.latitude =
        eventData.metaData[0].location[0].latitude;
      pd.metaData.location.longitude =
        eventData.metaData[0].location[0].longitude;
      pd.name = eventData.name;
      pd.headline = eventData.headline;
      pd.description = eventData.description;
      pd.summary = eventData.summary;
      pd.slug = eventData.slug;
      pd.statusId = eventData.statusId[0].id;
      return pd;
    });
    setEditId(() => {
      return eventData.id;
    });
    toggleModal();
  };

  const onSearchGeoChange = (e) => {
    const target = e.target;
    const name = e.target.name;
    const value = target.value;

    setGeoData((prevState) => {
      const pd = { ...prevState };

      pd[name] = value;

      return pd;
    });
  };

  const mapArr = (event) => {
    return (
      <EventCard
        event={event}
        onViewMoreClick={onViewMoreClick}
        onEditClick={onEditClick}
        key={event.id}
      ></EventCard>
    );
  };

  // const onStartDateInput = (e) => {
  //   const target = e.target;
  //   const value = target.value;

  //   setStartDate(() => {
  //     return value;
  //   });
  // };

  // const onEndDateInput = (e) => {
  //   const target = e.target;
  //   const value = target.value;

  //   setEndDate(() => {
  //     return value;
  //   });
  // };

  // const onSearchDateClick = (e) => {
  //   e.preventDefault();
  //   var onSearchEventSuccess = (response) => {
  //     const responseArr = response.data.item.pagedItems;
  //     setEventsData((prevState) => {
  //       const pd = { ...prevState };
  //       pd.eventsArr = responseArr;
  //       pd.eventsComponents = pd.eventsArr.map(mapArr);

  //       setPaginData(() => {
  //         return pd.eventsArr.slice(0, 3).map(mapArr);
  //       });
  //       setTotalCards(() => {
  //         return pd.eventsArr.length;
  //       });
  //       console.log(pageIndex);
  //       return pd;
  //     });
  //   };
  //   var onSearchEventError = (error) => {
  //     console.log(error);
  //   };
  //   eventsService
  //     .searchEvent(0, 100, startDate, endDate)
  //     .then(onSearchEventSuccess)
  //     .catch(onSearchEventError);
  // };

  const onChange = (page) => {
    const currentPage = page;
    const currentPageIndex = page - 1;

    //console.log(pageIndex);
    setCurrentPage(currentPage);
    setPageIndex(currentPageIndex);
    setPaginData(() => {
      return eventsData.eventsComponents.slice(
        currentPageIndex * defaultPageSize,
        currentPage * defaultPageSize
      );
    });
  };

  const onSearchGeoClick = (e) => {
    e.preventDefault();
    console.log(pageIndex);
    const onGeoSearchSucccess = (response) => {
      const responseArr = response.data.items;
      setEventsData((prevState) => {
        const pd = { ...prevState };
        pd.eventsArr = responseArr;
        pd.eventsComponents = pd.eventsArr.map(mapArr);

        setPaginData(() => {
          return pd.eventsArr.slice(0, 3).map(mapArr);
        });
        setTotalCards(() => {
          return pd.eventsArr.length;
        });
        //console.log(pageIndex);
        return pd;
      });
    };
    const onGeoSearchError = (error) => {
      console.log(error);
    };
    eventsService
      .searchGeo(geoData.latitude, geoData.longitude, geoData.radius)
      .then(onGeoSearchSucccess)
      .catch(onGeoSearchError);
  };

  const onViewMapClick = (e) => {
    e.preventDefault();
    const stateForTransport = {
      type: "EVENT_MAP_VIEW",
      payload: eventsData.eventsArr,
    };
    navigate("/map", { state: stateForTransport });
  };
  const onNewEventClick = () => {
    setEditId(null);
    setFormData({
      metaData: {
        dateStart: "",
        dateEnd: "",
        location: {
          latitude: 0,
          longitude: 0,
          zipCode: "",
          address: "",
        },
      },
      name: "",
      headline: "",
      description: "",
      summary: "",
      slug: "",
      statusId: 2,
    });
    toggleModal();
  };

  const mySteps = (values, errors) => {
    return [
      {
        label: "Event Information",
        icon: <IoInformationCircle />,
        component: <EventForm values={values} errors={errors} />,
      },
      {
        label: "Location Information",
        icon: <IoNavigateCircleOutline />,
        component: <EventForm2 values={values} errors={errors} />,
      },
    ];
  };

  const onFinishClick = (values) => {
    console.log(values);
    if (finalStep === true) {
      //console.log(values);
      if (!editId) {
        var onAddEventSucc = () => {
          toastr.success("Successfully created new event");
          toggleModal();
          setFinalStep(false);
          //console.log(response);
        };
        var onAddEventError = (error) => {
          toastr.error("An error occurred trying to create event");
          console.log(error);
        };
        eventsService
          .addEvent(values)
          .then(onAddEventSucc)
          .catch(onAddEventError);
      } else {
        var onUpdateSuccess = () => {
          toastr.success("Successfully updated event!");
          //console.log(values);
          toggleModal();
          setFormData({
            metaData: {
              dateStart: "",
              dateEnd: "",
              location: {
                latitude: 0,
                longitude: 0,
                zipCode: "",
                address: "",
              },
            },
            name: "",
            headline: "",
            description: "",
            summary: "",
            slug: "",
            statusId: 2,
          });
          setFinalStep(false);
          //console.log(response);
        };
        var onUpdateError = (error) => {
          toastr.error("An error occurred trying to update...");
          console.log(error);
        };

        eventsService
          .updateEvent(editId, values)
          .then(onUpdateSuccess)
          .catch(onUpdateError);
      }
    }
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-dark navbar-expand-lg second-nav">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <h1>Events</h1>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row d-flex align-content-center">
          <div className="col-8" style={{ height: "100%" }}>
            <div
              className="row"
              style={{
                border: "1px solid black",
                margin: "2% 0% 0 1%",
                height: "100%",
              }}
              id="mainContent"
            >
              <h2>{mainEvent.headline}</h2>
              <img
                id="imgUrl"
                src="https://media.istockphoto.com/vectors/placeholder-icon-vector-from-event-collection-thin-line-placeholder-vector-id1143602469"
                alt=""
                style={{ height: "auto", width: "50%" }}
              />
              <p className="summary" id="mainSummary">
                {mainEvent.summary}
              </p>
              <p className="desc" id="mainDesc">
                {mainEvent.description}
              </p>
              <div
                className="map-container row d-flex justify-content-between"
                style={{ height: "100%" }}
              >
                <div className="col-6">
                  <iframe
                    title="googleMaps"
                    id="googleMaps"
                    src={`https://www.google.com/maps/embed/v1/place?=${mainEvent.metaData.location.address} ${mainEvent.metaData.location.zipCode}`}
                    style={{ border: "0", width: "100%", height: "200px" }}
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="col-6">
                  <h6 style={{ fontSize: "20px" }}>Location</h6>
                  <p id="mainLocation">
                    {mainEvent.metaData.location.address}{" "}
                    {mainEvent.metaData.location.zipCode}
                  </p>
                  <p id="timeStart">{mainEvent.metaData.dateStart}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div
              className="container align-content-center"
              style={{
                border: "1px solid purple",
                margin: "4% 0 0 0",
                padding: "5%",
                width: "100%",
              }}
            >
              <h5>Search events from:</h5>
              <form action="">
                <div className="row">
                  <div className="col-6">
                    <input
                      className="col-12 form-control"
                      type="date"
                      name="startDate"
                      id="startDate"
                      // value={startDate}
                      //onChange={onStartDateInput}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      className="col-12 form-control"
                      type="date"
                      name="endDate"
                      id="endDate"
                      //value={endDate}
                      //onChange={onEndDateInput}
                    />
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col d-flex align-items-center justify-content-around"
                    style={{ marginTop: "5%" }}
                  >
                    <button
                      type="submit"
                      className="btn mb-2"
                      //onClick={onSearchDateClick}
                      id="searchEvents"
                      style={{ backgroundColor: "#7c648b", color: "white" }}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
              {/* second form for geo search */}
              <h5>Search in mile radius</h5>
              <form action="">
                <div className="row">
                  <div className="col-6">
                    <input
                      className="col-12 form-control"
                      type="text"
                      name="latitude"
                      id="latitude"
                      placeholder="latitude"
                      value={geoData.latitude}
                      onChange={onSearchGeoChange}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      className="col-12 form-control"
                      type="text"
                      name="longitude"
                      id="longitude"
                      placeholder="longitude"
                      value={geoData.longitude}
                      onChange={onSearchGeoChange}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      className="col-12 form-control"
                      type="text"
                      name="radius"
                      id="radius"
                      placeholder="Within X Miles"
                      value={geoData.radius}
                      onChange={onSearchGeoChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col d-flex align-items-center justify-content-around"
                    style={{ marginTop: "5%" }}
                  >
                    <button
                      type="submit"
                      className="btn mb-2"
                      onClick={onSearchGeoClick}
                      id="searchEvents"
                      style={{ backgroundColor: "#7c648b", color: "white" }}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div
              style={{
                border: "1px solid green",
                margin: "3% 0 0 0",
                height: "100%",
                width: "100%",
                padding: "5%",
              }}
            >
              <div className="row">
                <div className="col-8">
                  {/* pagination here */}
                  <Pagination
                    defaultPageSize={defaultPageSize}
                    current={currentPage}
                    onChange={onChange}
                    total={totalCards}
                  />
                </div>
                <div className="col-md-4">
                  <button
                    className="btn btn-light float-end"
                    style={{ marginBottom: "4%" }}
                    onClick={onNewEventClick}
                  >
                    New Event
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button
                    className="btn btn float-end"
                    id="viewAllOnMap"
                    style={{ backgroundColor: "#E6E9ED" }}
                    onClick={onViewMapClick}
                  >
                    View All On Map
                  </button>
                </div>
              </div>

              <div className="row">
                <h4 style={{ height: "fit-content", width: "100%" }}>
                  Upcoming Events
                </h4>
              </div>
              <div
                className="row feeds-container"
                style={{ height: "fit-content", width: "inherit" }}
              >
                {paginData}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal">
        <Modal
          isOpen={state.isOpen}
          size="xl"
          centered={true}
          contentClassName={"your-custom-class"}
        >
          <ModalHeader>
            Add an Event
            <button
              className="btn"
              style={{ float: "right" }}
              onClick={toggleModal}
            >
              X
            </button>
          </ModalHeader>
          <ModalBody>
            <Formik
              enableReinitialize={true}
              initialValues={formData}
              onSubmit={onFinishClick}
              validationSchema={validationSchema}
            >
              {({ values, errors }) => (
                <Form id="modalForm">
                  <Loki
                    steps={mySteps(values, errors)}
                    renderActions={({
                      isComplete,
                      cantBack,
                      isInFinalStep,
                      backHandler,
                      nextHandler,
                    }) => {
                      return (
                        <React.Fragment>
                          <ModalFooter>
                            <div className="button-group">
                              <button
                                type="button"
                                className="btn btn-secondary m-2"
                                onClick={backHandler}
                                disabled={cantBack || isComplete}
                              >
                                {`Go back`}
                              </button>
                              {isInFinalStep ? (
                                <button
                                  type="submit"
                                  className="btn btn-primary m-2"
                                  onClick={nextHandler}
                                >
                                  Finish
                                </button>
                              ) : (
                                <button
                                  type="submit"
                                  className="btn btn-primary m-2"
                                  onClick={
                                    !values.name ||
                                    !values.headline ||
                                    !values.description ||
                                    !values.summary ||
                                    !values.slug
                                      ? null
                                      : nextHandler
                                  }
                                  disabled={isComplete}
                                >
                                  Go Next
                                </button>
                              )}
                            </div>
                          </ModalFooter>
                        </React.Fragment>
                      );
                    }}
                    onFinish={() => {
                      setFinalStep(true);
                    }}
                  ></Loki>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
}

export default Events;
