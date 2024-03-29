const NavBarFlexBootom = function () {
  return (
    <>
      <div className="container-fluid fixed-bottom bg-container pt-1">
        <div className="row h-100">
          <div className="col-lg-10 offset-lg-2">
            <div className="row h-100 flex-column justify-content-center align-items-center">
              <div className="col-6 col-md-4 playerControls">
                <div className="d-flex">
                  <a href="#stuffle">
                    <img src="assets/playerbuttons/shuffle.png" alt="shuffle" />
                  </a>
                  <a href="#prev">
                    <img src="assets/playerbuttons/prev.png" alt="prev" />
                  </a>
                  <a href="#play">
                    <img src="assets/playerbuttons/play.png" alt="play" />
                  </a>
                  <a href="#next">
                    <img src="assets/playerbuttons/next.png" alt="next" />
                  </a>
                  <a href="#repeat">
                    <img src="assets/playerbuttons/repeat.png" alt="repeat" />
                  </a>
                </div>
                <div className="progress mt-3">
                  <div role="progressbar"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBarFlexBootom;
