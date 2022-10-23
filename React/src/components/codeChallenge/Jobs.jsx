import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styling/friends.css";
import jobsService from "../../services/jobsService";
import Job from "./Job";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { toast } from "react-toastify";

function Jobs() {
  const [jobData, setJobData] = useState({
    jobsArr: [],
    jobsComponent: [],
  });
  const [defaultPageSize] = useState(6);
  const [pageIndex, setPageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCards, setTotalCards] = useState();
  const [paginData, setPaginData] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    var onGetJobsSuccess = (response) => {
      const responseData = response.data.item.pagedItems;
      setJobData((prevState) => {
        const pd = { ...prevState };
        pd.jobsArr = responseData;
        pd.jobsComponent = responseData.map(mapArr);

        setTotalCards(() => {
          return responseData.length;
        });
        setPaginData(() => {
          return responseData.slice(0, 6).map(mapArr);
        });
        return pd;
      });
    };
    var onGetJobsError = (error) => {
      console.log(error);
    };
    jobsService.getJobs(0, 100).then(onGetJobsSuccess).catch(onGetJobsError);
  }, []);

  const onDeleteClicked = (job, e) => {
    e.preventDefault();
    console.log(job);

    const onDeleteSuccess = () => {
      toast.success("Successfully deleted job posting.");
      setJobData((prevState) => {
        const pd = { ...prevState };
        pd.jobsArr = [...pd.jobsArr];

        const idxOf = pd.jobsArr.findIndex((ajob) => {
          let result = false;
          if (ajob.id === job.id) {
            result = true;
          }

          return result;
        });

        if (idxOf >= 0) {
          pd.jobsArr.splice(idxOf, 1);
          pd.jobsComponent = pd.jobsArr.map(mapArr);

          setPaginData(() => {
            return pd.jobsArr.slice(0, 6).map(mapArr);
          });
          setTotalCards(() => {
            return pd.jobsArr.length;
          });

          console.log(pd);
        }

        return pd;
      });
    };

    const onDeleteError = (error) => {
      toast.error("An error occurred...");
      console.log(error);
    };

    jobsService.deleteJob(job.id).then(onDeleteSuccess).catch(onDeleteError);
  };

  const mapArr = (job) => {
    return (
      <Job currJob={job} onDeleteJobClick={onDeleteClicked} key={job.id} />
    );
  };

  const onChange = (page) => {
    const currPageIndex = page - 1;
    const currPage = page;
    setCurrentPage(currPage);
    setPageIndex(currPageIndex);
    setPaginData(() => {
      return jobData.jobsComponent.slice(
        currPageIndex * defaultPageSize,
        currPage * defaultPageSize
      );
    });
  };

  const onSearchInput = (e) => {
    const target = e.target;
    const value = target.value;
    console.log(pageIndex);
    const updatedSearchQuery = value;
    setSearchQuery(() => {
      return updatedSearchQuery;
    });
  };
  const onSearchButtonClick = (e) => {
    e.preventDefault();
    var onSearchSuccess = (response) => {
      const searchResults = response.data.item.pagedItems;
      setJobData((prevState) => {
        const newJobData = { ...prevState };
        newJobData.jobsArr = searchResults;
        newJobData.jobsComponent = searchResults.map(mapArr);

        setTotalCards(() => {
          return newJobData.jobsArr.length;
        });
        setPaginData(() => {
          return newJobData.jobsArr.slice(0, 6).map(mapArr);
        });
        return newJobData;
      });
    };
    var onSearchError = (error) => {
      console.log(error);
    };
    jobsService
      .searchJob(0, 100, searchQuery)
      .then(onSearchSuccess)
      .catch(onSearchError);
  };
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark navbar-expand-lg second-nav">
        <div className="container-fluid">
          <Link
            className="btn"
            to="/jobs/new"
            id="addJob"
            type="submit"
            style={{
              backgroundColor: "#7c648b",
              color: "white",
              marginLeft: "20px",
            }}
          >
            + Job
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <form
              className="d-flex align-items-start"
              role="search"
              style={{ marginLeft: "auto", marginRight: "40px" }}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="searchFriends"
                id="searchFriendsInput"
                onChange={onSearchInput}
                value={searchQuery}
              />
              <button
                className="btn btn-outline-dark"
                style={{ marginRight: "5px" }}
                type="submit"
                id="searchFriends"
                onClick={onSearchButtonClick}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="container m-3">
        <Pagination
          defaultPageSize={defaultPageSize}
          current={currentPage}
          onChange={onChange}
          total={totalCards}
        />
      </div>
      <div className="container-fluid d-flex justify-content-center">
        <div className="row justify-content-around">{paginData}</div>
      </div>
      <div className="container m-3">
        <Pagination
          defaultPageSize={defaultPageSize}
          current={currentPage}
          onChange={onChange}
          total={totalCards}
        />
      </div>
    </React.Fragment>
  );
}

export default Jobs;
