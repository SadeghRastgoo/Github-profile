"use strict";

const inputEl = document.getElementById("username-input");
const searchBtn = document.getElementById("search-btn");
const containerEl = document.querySelector(".container");
const dataEl = document.querySelector(".data");
const dataFollowEl = document.getElementById("data-follow-btn");
const errorEl = document.getElementById("error");

const dAvatarEl = document.getElementById("data-avatar");
const dHireableEl = document.getElementById("data-hireable");
const dNameEl = document.getElementById("data-name");
const dFollowerEl = document.getElementById("data-follower");
const dFollowingEl = document.getElementById("data-following");
const dIdEl = document.getElementById("data-id");
const dRepoEl = document.getElementById("data-repo");
const dBioEl = document.getElementById("data-bio");
const dLocationEl = document.getElementById("data-location");
const dUrlEl = document.getElementById("data-url");

function functionality() {
  let username = inputEl.value;

  let url = "https://api.github.com/users/" + username;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        containerEl.classList.remove("show-state");
        errorEl.classList.remove("d-none");
      } else {
        errorEl.classList.add("d-none");
        containerEl.classList.add("show-state");

        dAvatarEl.setAttribute("src", data.avatar_url);
        data.hireable ? containerEl.classList.add("hireable") : "";
        dNameEl.textContent = data.name;
        dFollowerEl.textContent = data.followers;
        dFollowingEl.textContent = data.following;
        dRepoEl.textContent = data.public_repos;
        dIdEl.textContent = `@${data.login}`;

        dBioEl.textContent = data.bio;
        data.bio
          ? dataEl.classList.remove("data-sm")
          : dataEl.classList.add("data-sm");

        dLocationEl.textContent = data.location;
        data.location
          ? dLocationEl.parentElement.classList.remove("d-none")
          : dLocationEl.parentElement.classList.add("d-none");

        dUrlEl.textContent = data.blog;
        dUrlEl.setAttribute("href", `https://${data.blog}`);
        dataFollowEl.setAttribute("href", `https://${data.blog}`);
        data.blog
          ? dUrlEl.parentElement.classList.remove("d-none")
          : dUrlEl.parentElement.classList.add("d-none");
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

document.addEventListener("keydown", function (e) {
  if (e.code === "Enter") functionality();
});
searchBtn.addEventListener("click", functionality);
