import { sliderModel } from "./services/model.js";
import Slider from "./services/Slider.js";
import { isSearched } from "./utils/util.js";

new Slider(sliderModel, ".coaches");

const $TRIGGERS = document.querySelectorAll(".coaches__slider_coach a");
const $MODAL = document.body.querySelector(".modal");

// Код модального окна

$TRIGGERS.forEach((t) => t.addEventListener("click", tHandler));

let content = {};

function tHandler(e) {
  e.preventDefault();

  content = isSearched(sliderModel, (c) => c.id === e.target.id);

  $MODAL.classList.toggle("active");

  $MODAL.innerHTML = `<section class="modal__header">
      <div class="modal__header_img">
        <img src="${content.img}" alt="modal__header_img" />
      </div>
      <div class="modal__header_desc">
        <h4>${content.name}</h4>
        <span>${content.area}</span>
        <div>
          <a target="_blank" href="/"><img alt="Facebook" src="./icons/Facebook.svg" /></a>
          <a target="_blank" href="/"><img alt="Instagram" src="./icons/Instagram.svg" /></a>
        </div>
      </div>
      <div class="modal__header_exit"> Закрыть </div>
    </section>
    <section class="modal__tabs">
        <a class="modal__tabs_item active" data-tab='edu'> Образование </a>
        <a class="modal__tabs_item" data-tab='exp'> Опыт работы </a>
    </section>
    <section class="modal__content">        
        ${content.edu?.map((html) => html).join("") ?? ""}  
    </section>
    `;
}

$MODAL.addEventListener("click", modalHandler);

function modalHandler(e) {
  if (
    !isSearched(["modal__header_exit", "modal__tabs_item"], (s) =>
      e.target.classList.contains(s)
    )
  )
    return;

  switch (true) {
    case e.target.classList.contains("modal__header_exit"):
      return this.classList.toggle("active");
    default:
      this.querySelector(".modal__content").innerHTML =
        content[e.target.dataset.tab]?.map((html) => html).join("") ?? "";
      this.querySelectorAll(".modal__tabs_item").forEach((m) =>
        m.classList.remove("active")
      );
      return e.target.classList.toggle("active");
  }
}
