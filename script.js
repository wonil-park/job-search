const jobs = [];

const addCard = (jobListing) => {
  const card = document.createElement("div");
  let className = "card";
  className = jobListing.type.toLowerCase().includes("full")
    ? className.concat(" full")
    : className.concat(" part");
  className = jobListing.location.toLowerCase().includes("remote")
    ? className.concat(" remote")
    : className.concat("");
  card.setAttribute("class", className);
  const logo = document.createElement("img");
  logo.setAttribute("class", "card-img-top");
  logo.src = jobListing["company_logo"];
  card.append(logo);

  const body = document.createElement("div");
  body.setAttribute("class", "card-body");
  const title = document.createElement("h5");
  title.setAttribute("class", "card-title");
  title.innerHTML = jobListing.title;
  const text = document.createElement("p");
  text.setAttribute("class", "card-text");
  // DONE: limit description to 100 char or less
  text.innerHTML = jobListing.description.slice(0, 100);

  const apply = document.createElement("p");
  apply.innerHTML = jobListing["how_to_apply"];
  body.append(title, text, apply);

  const detail = document.createElement("a");
  detail.className = "btn btn-primary";
  detail.innerText = "View Details";
  detail.href = jobListing.url;
  detail.target = "_blank";
  card.append(body, detail);

  const board = document.querySelector("#board");
  board.append(card);
};

const clickHandler = (e) => {
  e.preventDefault();

  const { id } = e.target;
  // clear the board before append results
  document.querySelector("#board").innerHTML = "";
  let description = document.getElementById("desc");
  let location = document.getElementById("loc");
  if (id === "all") {
    if (description.value === "" && location.value === "") {
      alert("Please fill out at least one option!");
    } else {
      fetch(
        `https://jobs.github.com/positions.json?description=${description.value}&location=${location.value}`
      )
        .then((response) => response.json())
        .then((data) =>
          data.forEach((job) => {
            jobs.push(job);
            addCard(job);
          })
        );
    }
  }

  if (id === "full") {
    jobs.forEach((job) => {
      if (job.type.toLowerCase().includes(id)) {
        addCard(job);
      }
    });
  } else if (id === "part") {
    jobs.forEach((job) => {
      if (job.type.toLowerCase().includes("contract")) {
        addCard(job);
      }
    });
  } else if (id === "remote") {
    jobs.forEach((job) => {
      if (job.location.toLowerCase().includes(id)) {
        addCard(job);
      }
    });
  }
  description.value = "";
  location.value = "";
};

const searchBtns = Array.from(document.querySelectorAll(".search")).forEach(
  (button) => {
    button.addEventListener("click", clickHandler);
  }
);

/*
## Deliverable

Use the [GitHub Jobs](https://jobs.github.com/api) api to create a job board.

The job board should have 2 search options:

- job description
- location

⇒ Make sure that the user uses at least one of the 2 options. They can also use both of the options

Below the search options, have 3 buttons that are used to filter the jobs by. Those filters are:

- full time
- part time
- remote

Display the jobs in responsive cards with the following information:

- Company logo picture
- Job Title
- Job description (at most 100 characters)
- How to apply information
- A button to view job in details
*/
