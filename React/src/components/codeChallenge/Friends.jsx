import React, { useState, useEffect, useCallback } from "react";
import friendsService from "../../services/friendsService";
import Person from "../codeChallenge/Person";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styling/friends.css";
import { auto } from "@popperjs/core";
import debug from "sabio-debug";
import Pagination from "rc-pagination";
//import locale from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";

function Friends(props) {
  const [pageData, setPageData] = useState({
    friendsArr: [],
    peopleComponents: [],
  });
  const [state, setState] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [defaultPageSize] = useState(6);
  const [totalCards, setTotalCards] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginData, setPaginData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  //const [count, setCount] = useState(0)
  //console.log(pageIndex);
  const _logger = debug.extend("Friends");

  useEffect(() => {
    var onGetAllSuccess = (data) => {
      const newFriendsArr = data.item.pagedItems;
      //console.log(newFriendsArr);
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.friendsArr = newFriendsArr;
        pd.peopleComponents = newFriendsArr.map(mapArr);

        setTotalCards(() => {
          return pd.peopleComponents.length;
        });

        setPaginData(() => {
          return newFriendsArr.slice(0, 6).map(mapArr);
        });
        return pd;
      });
    };
    var onGetAllError = (error) => {
      console.log(error);
    };
    friendsService
      .getAllFriends(0, 100)
      .then(onGetAllSuccess)
      .catch(onGetAllError);
  }, []);

  const onDeleteRequested = useCallback((myPerson) => {
    const idToBeDeleted = myPerson.id;

    var onDeleteSuccess = () => {
      toast.success("Successfully deleted friend");
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.friendsArr = [...prevState.friendsArr];

        const idxOf = pd.friendsArr.findIndex((person) => {
          let result = false;
          if (person.id === idToBeDeleted) {
            result = true;
          }

          return result;
        });

        if (idxOf >= 0) {
          pd.friendsArr.splice(idxOf, 1);
          pd.peopleComponents = pd.friendsArr.map(mapArr);

          setPaginData(() => {
            return pd.friendsArr.slice(0, 6).map(mapArr);
          });
          setTotalCards(() => {
            return pd.friendsArr.length;
          });
        }

        return pd;
      });
    };
    var onDeleteError = (error) => {
      toast.error("Error occured");
      console.log(error);
    };

    friendsService
      .deleteById(idToBeDeleted)
      .then(onDeleteSuccess)
      .catch(onDeleteError);
  }, []);

  const mapArr = (friend) => {
    return (
      <Person
        person={friend}
        user={props.user}
        key={"ListA-" + friend.id}
        onPersonClicked={onDeleteRequested}
      />
    );
  };

  const onHideShowClick = (e) => {
    e.preventDefault();
    _logger("The hide show implementation in my friend display page");
    setState((prevState) => {
      return !prevState;
    });
  };

  const onSearchQueryChange = (e) => {
    const target = e.target;
    const value = target.value;

    const updatedSearchQuery = value;
    setSearchQuery(() => {
      return updatedSearchQuery;
    });
  };

  const onSearchClick = (e) => {
    e.preventDefault();
    console.log(pageIndex);
    var onSearchSuccess = (response) => {
      const searchData = response.data.item.pagedItems;
      setPageData(() => {
        const newData = {
          friendArr: searchData,
          peopleComponents: searchData.map(mapArr),
        };
        setTotalCards(() => {
          return newData.peopleComponents.length;
        });
        setPaginData(() => {
          return newData.friendArr.slice(0, 6).map(mapArr);
        });
        return newData;
      });
    };

    var onSearchError = (error) => {
      toast.error("No friend found");
      console.log(error);
    };

    friendsService
      .searchByQuery(0, 100, searchQuery)
      .then(onSearchSuccess)
      .catch(onSearchError);
  };

  const onChange = (page) => {
    const currPageIndex = page - 1;
    const currPage = page;
    setCurrentPage(page);
    setPageIndex(page - 1);
    setPaginData(() => {
      return pageData.peopleComponents.slice(
        currPageIndex * defaultPageSize,
        currPage * defaultPageSize
      );
    });
  };

  return (
    <React.Fragment>
      {/* conditional rendering */}
      <nav className="navbar navbar-dark navbar-expand-lg second-nav">
        <div className="container-fluid">
          <Link
            to="/friends/new"
            className="btn"
            id="addFriend"
            type="submit"
            style={{
              backgroundColor: "#7c648b",
              color: "white",
              paddingRight: "20px",
            }}
          >
            + Friend
          </Link>
          <button
            onClick={onHideShowClick}
            className="btn btn-secondary"
            style={{ margin: "1% 2% 1% 1%" }}
          >
            Hide/Show Friends
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <form
              className="d-flex align-items-start"
              role="search"
              style={{
                marginLeft: auto,
                marginRight: "40px",
              }}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="searchFriends"
                id="searchFriendsInput"
                value={searchQuery}
                onChange={onSearchQueryChange}
              />
              <button
                className="btn btn-outline-dark"
                style={{ marginRight: "5px" }}
                type="submit"
                id="searchFriends"
                onClick={onSearchClick}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="container m-5">
        <Pagination
          defaultPageSize={defaultPageSize}
          current={currentPage}
          onChange={onChange}
          total={totalCards}
        />
      </div>
      {/* <h3 onClick={onHeaderClick} style={{ 'margin': '0 5% 0 5%' }}>Rendering {count}</h3> */}
      <div className="container-fluid d-flex justify-content-center">
        <div className="row justify-content-around">{state && paginData}</div>
      </div>
      <div className="container m-5">
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

export default Friends;
