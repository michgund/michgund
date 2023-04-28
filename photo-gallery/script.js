const data = [
  {
    image: "https://picsum.photos/id/237/200/200",
    title: "Dog",
    creator: "Jim Beam",
    price: "$9.99",
  },
  {
    image: "https://picsum.photos/id/238/200/200",
    title: "City",
    creator: "Jack Daniels",
    price: "$6.50",
  },
  {
    image: "https://picsum.photos/id/239/200/200",
    title: "Dandelion",
    creator: "Johnnie Walker",
    price: "$19.00",
  },
  {
    image: "https://picsum.photos/id/244/200/200",
    title: "Pelicans",
    creator: "John Jameson",
    price: "$12.50",
  },
  {
    image: "https://picsum.photos/id/248/200/200",
    title: "Cactus",
    creator: "Jim Beam",
    price: "$15.99",
  },
  {
    image: "https://picsum.photos/id/249/200/200",
    title: "Bridge",
    creator: "William Grant",
    price: "$29.99",
  },
  {
    image: "https://picsum.photos/id/250/200/200",
    title: "Camera",
    creator: "George Smith",
    price: "$10.00",
  },
  {
    image: "https://picsum.photos/id/251/200/200",
    title: "Landscape",
    creator: "Johnnie Walker",
    price: "$29.00",
  },
  {
    image: "https://picsum.photos/id/255/200/200",
    title: "Private Drive",
    creator: "John Jameson",
    price: "$19.00",
  },
  {
    image: "https://picsum.photos/id/256/200/200",
    title: "Snowy Mountains",
    creator: "William Grant",
    price: "$19.99",
  },
  {
    image: "https://picsum.photos/id/257/200/200",
    title: "Canal",
    creator: "Jim Beam",
    price: "$19.99",
  },
  {
    image: "https://picsum.photos/id/258/200/200",
    title: "Birds",
    creator: "Johnnie Walker",
    price: "$24.00",
  },
  {
    image: "https://picsum.photos/id/259/200/200",
    title: "Waterfront",
    creator: "George Smith",
    price: "$15.00",
  },
  {
    image: "https://picsum.photos/id/261/200/200",
    title: "Dune",
    creator: "John Jameson",
    price: "$7.50",
  },
  {
    image: "https://picsum.photos/id/274/200/200",
    title: "City Night",
    creator: "Jim Beam",
    price: "$14.99",
  },
];

let count = 0;

function loadPage() {
  for (let i = count - 3; i < count; i++) {
    let div = document.createElement("div");
    div.classList.add("card");
    let img = document.createElement("img");
    img.setAttribute("src", data[i].image);
    div.appendChild(img);
    let p = document.createElement("p");
    p.textContent = data[i].title;
    div.appendChild(p);
    let span = document.createElement("span");
    div.appendChild(span);
    p = document.createElement("p");
    p.textContent = data[i].creator;
    span.appendChild(p);
    p = document.createElement("p");
    p.textContent = data[i].price;
    span.appendChild(p);
    document.body.appendChild(div);
  }
}

let more = document.createElement("div");
more.classList.add("load");
more.textContent = "Show more +";
document.body.appendChild(more);

let less = document.createElement("div");
less.classList.add("load");
less.textContent = "Show fewer -";

more.addEventListener("click", function () {
  count += 3;
  loadPage();
  if (count == data.length) {
    document.body.removeChild(more);
  } else {
    document.body.appendChild(more);
  }
  document.body.insertBefore(less, document.body.firstChild);
});

less.addEventListener("click", function () {
  count -= 3;
  for (let i = 0; i < 3; i++) {
    if (document.querySelectorAll(".card").length == data.length) {
      document.body.removeChild(document.body.lastElementChild);
      document.body.appendChild(more);
    } else {
      document.body.removeChild(document.body.lastElementChild.previousElementSibling);
    }
  }

  if (count != 0) {
    document.body.insertBefore(less, document.body.firstChild);
  } else {
    document.body.removeChild(less);
  }
});
