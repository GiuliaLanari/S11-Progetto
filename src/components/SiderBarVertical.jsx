import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { FaHouse } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa6";

const SideBarVertical = function () {
  const albumCard = function (songInfo) {
    return `
        <div class="col text-center" id=${songInfo.id}>
            <img class="img-fluid" src=${songInfo.album.cover_medium} alt="track" />
          <p>
              Track: "${songInfo.title.length < 16 ? `${songInfo.title}` : `${songInfo.title.substring(0, 16)}...`}"<br>
              Artist: ${songInfo.artist.name}
          </p>
        </div>`;
  };

  const handleSection = async (artistName, querySelector) => {
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + artistName, {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          "X-RapidAPI-Key": "9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0",
        },
      });
      if (response.ok) {
        let { data } = await response.json();
        let musicSection = document.querySelector(querySelector);
        for (let i = 0; i < 4; i++) {
          musicSection.innerHTML += albumCard(data[i]);
        }
      } else {
        throw new Error("Error in fetching songs");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const search = async (event) => {
    event.preventDefault();
    let div = document.querySelector("#searchResults .row");
    div.innerHTML = "";
    let searchQuery = document.querySelector("#searchField").value;

    if (searchQuery.length > 2) {
      document.querySelector("#searchResults").style.display = "block";

      try {
        let response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + searchQuery, {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
            "X-RapidAPI-Key": "9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0",
          },
        });
        if (response.ok) {
          let result = await response.json();
          let { data } = result;
          for (let x = 0; x < data.length; x++) {
            div.innerHTML += albumCard(data[x]);
          }
        } else {
          throw new Error("error in search");
        }
      } catch (err) {
        console.log("error", err);
      }
    } else {
      document.querySelector("#searchResults").style.display = "none";
    }
  };

  useEffect(() => {
    handleSection("queen", "#rockSection");
    handleSection("katyperry", "#popSection");
    handleSection("eminem", "#hipHopSection");
  }, []);

  return (
    <Container fluid>
      <Row>
        <div className="col col-2">
          <nav className="navbar navbar-expand-md fixed-left justify-content-between" id="sidebar">
            <div className="container flex-column align-items-start">
              <a className="navbar-brand" href="index.html">
                <img src="assets/logo/logo.png" alt="Spotify Logo" width="131" height="40" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <ul>
                    <li>
                      <a className="nav-item nav-link d-flex align-items-center" href="#Home">
                        <FaHouse />
                        &nbsp; Home
                      </a>
                    </li>
                    <li>
                      <a className="nav-item nav-link d-flex align-items-center" href="#Your">
                        <FaBookOpen />
                        &nbsp; Your Library
                      </a>
                    </li>
                    <li>
                      <form className="input-group mt-3" onSubmit={search}>
                        <input
                          type="text"
                          className="form-control"
                          id="searchField"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="basic-addon2"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-outline-secondary btn-sm h-100" type="submit">
                            GO
                          </button>
                        </div>
                      </form>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="nav-btn">
              <button className="btn signup-btn" type="button">
                Sign Up
              </button>
              <button className="btn login-btn" type="button">
                Login
              </button>
              <div>
                <a href="#Cookie">Cookie Policy</a> |<a href="#Privacy"> Privacy</a>
              </div>
            </div>
          </nav>
        </div>
      </Row>
    </Container>
  );
};

export default SideBarVertical;
