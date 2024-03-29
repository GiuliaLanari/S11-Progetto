import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useEffect } from "react";
import { useState } from "react";
import CardAlbum from "./CardAlbum";

const Main = function () {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [search1, setSearch1] = useState([]);

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
        querySelector(data);
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
    handleSection("queen", setData);
    handleSection("katyperry", setData2);
    handleSection("eminem", setData3);
    handleSection("search1", setSearch1);
  }, []);

  return (
    <Container fluid>
      <Row>
        <div className="col-12 col-md-9 offset-md-3 mainPage">
          <div className="row">
            <div className="col-9 col-lg-11 mainLinks d-none d-md-flex">
              <a href="#Trending">TRENDING</a>
              <a href="#Podcast">PODCAST</a>
              <a href="#Moods">MOODS AND GENRES</a>
              <a href="#New">NEW RELEASES</a>
              <a href="#Discover">DISCOVER</a>
            </div>
          </div>

          <Row className="mt-5">
            <h2 className="text-white">Search Results</h2>
            <div className="row" id="searchResults"></div>
            {search1 && search1.length > 0 && search1.slice(0, 4).map((e, index) => <CardAlbum info={e} key={index} />)}
          </Row>

          <Row className="mt-5">
            <h2 className="text-white">Rock Classsics</h2>
            <div className="row" id="rockSection"></div>
            {data && data.length > 0 && data.slice(0, 4).map((e, index) => <CardAlbum info={e} key={index} />)}
          </Row>
          <Row className="mt-5">
            <h2 className="text-white">Pop Culture</h2>
            <div className="row" id="popSection"></div>
            {data2 && data2.length > 0 && data2.slice(0, 4).map((e, index) => <CardAlbum info={e} key={index} />)}
          </Row>
          <Row className="my-5">
            <h2 className="text-white">#HipHop</h2>
            <div className="row" id="hipHopSection"></div>
            {data3 && data3.length > 0 && data3.slice(0, 4).map((e, index) => <CardAlbum info={e} key={index} />)}
          </Row>
        </div>
      </Row>
    </Container>
  );
};

export default Main;
