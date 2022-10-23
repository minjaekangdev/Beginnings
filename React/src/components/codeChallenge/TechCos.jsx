import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "rc-pagination";
import companiesService from "../../services/companiesService";
import Company from "./Company";
import toastr from "toastr";

function TechCos() {
  const [techCos, setTechCos] = useState({
    techCosArr: [],
    coComponents: [],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [defaultPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageIndex, setPageIndex] = useState();
  const [totalCards, setTotalCards] = useState();
  const [paginData, setPaginData] = useState();

  useEffect(() => {
    var onGetCoSuccess = (response) => {
      const responseArr = response.data.item.pagedItems;
      setTechCos((prevState) => {
        const pd = { ...prevState };
        pd.techCosArr = responseArr;
        pd.coComponents = responseArr.map(mapArr);

        setTotalCards(() => {
          return responseArr.length;
        });

        setPaginData(() => {
          return responseArr.slice(0, 6).map(mapArr);
        });
        return pd;
      });
    };
    var onGetCoError = (error) => {
      console.log(error);
    };
    companiesService
      .getCompanies(0, 100)
      .then(onGetCoSuccess)
      .catch(onGetCoError);
    //console.log(techCos);
  }, []);

  const onDeleteClick = (co, e) => {
    e.preventDefault();
    const idToBeDeleted = co.id;
    //console.log(co);

    const onDeleteSuccess = () => {
      toastr.success("Successfully deleted company.");
      setTechCos((prevState) => {
        const pd = { ...prevState };
        pd.techCosArr = [...pd.techCosArr];

        const idxOf = pd.techCosArr.findIndex((company) => {
          let result = false;
          if (company.id === idToBeDeleted) {
            result = true;
          }

          return result;
        });

        if (idxOf >= 0) {
          pd.techCosArr.splice(idxOf, 1);
          pd.coComponents = pd.techCosArr.map(mapArr);

          setPaginData(() => {
            return pd.techCosArr.slice(0, 6).map(mapArr);
          });
          setTotalCards(() => {
            return pd.techCosArr.length;
          });

          //console.log(pd);
        }

        return pd;
      });
      setPageIndex(0);
      setCurrentPage(1);
    };

    const onDeleteError = (error) => {
      toastr.error("An error occurred..");
      console.log(error);
    };

    companiesService
      .deleteCo(idToBeDeleted)
      .then(onDeleteSuccess)
      .catch(onDeleteError);
  };

  const mapArr = (company) => {
    return (
      <Company co={company} key={company.id} onDeleteClick={onDeleteClick} />
    );
  };

  const onSearchInput = (e) => {
    const target = e.target;
    //const name = e.target.name;
    const value = target.value;

    const searchValue = value;
    setSearchQuery(() => {
      return searchValue;
    });
  };
  const onSearchButtonClick = (e) => {
    e.preventDefault();
    const onSearchSuccess = (response) => {
      //console.log(response.data.item.pagedItems);
      const searchResults = response.data.item.pagedItems;
      setTechCos((prevState) => {
        const pd = { ...prevState };
        pd.techCosArr = searchResults;
        pd.coComponents = searchResults.map(mapArr);

        setTotalCards(() => {
          return searchResults.length;
        });
        setPaginData(() => {
          return pd.coComponents.slice(0, 6);
        });
        return pd;
      });
    };
    const onSearchError = (error) => {
      console.log(error);
    };
    companiesService
      .searchCompany(0, 100, searchQuery)
      .then(onSearchSuccess)
      .catch(onSearchError);
  };

  const onChange = (page) => {
    const currPageIndex = page - 1;
    const currPage = page;
    console.log(pageIndex);
    setCurrentPage(currPage);
    setPageIndex(currPageIndex);
    setPaginData(() => {
      return techCos.coComponents.slice(
        currPageIndex * defaultPageSize,
        currPage * defaultPageSize
      );
    });
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-dark navbar-expand-lg second-nav">
        <div className="container-fluid">
          <Link
            className="btn"
            to="/techcompanies/new"
            id="addJob"
            type="submit"
            style={{
              backgroundColor: "#7c648b",
              color: "white",
              marginLeft: "20px",
            }}
          >
            + Tech Company
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

export default TechCos;
