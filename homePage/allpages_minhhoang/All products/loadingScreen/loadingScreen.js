window.addEventListener("load", () => {
    const loader = document.querySelector("#preloader");
    loader.classList.add("loader--hidden");
    loader.addEventlistener("transitioned", () => {
      document.body.removeChild(loader);
    });
  });
  