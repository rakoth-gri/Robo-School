import { slidesCount, currSlideWidth, isSearched } from "../utils/util.js";

export default class Slider {
  constructor(list, selector, option = {}) {
    // DOM
    this.$container = document.querySelector(selector);
    this.$tracker = null;
    this.$slider = null;
    this.$coaches = null;
    // LOGIC
    this.imageMargin = 26.66;
    this.list = list;
    this.imagesPerSlide = option.imagesPerSlide || 3;
    this.count = 0;
    this.width = null;
    // METHODS -----
    this.builder(this.$container, this.list);
  }
  builder(container, list) {
    this.renderSlider(container, list);
    this.renderControls(container);
    this.style();
    this.addListenerToControls();
  }

  renderSlider(container, list) {
    const html = `
        <h2>Профессиональные тренеры</h2>
            <section class="coaches__slider">
                <div class="coaches__slider_tracker">
                ${list
                  .map(
                    ({ id, img, name, area }) => `
                    <article class="coaches__slider_coach">
                        <figure>
                            <img src="${img}" alt="${img}" loading='lazy'/>
                            <figcaption>${name}</figcaption>
                        </figure>
                        <span>${area}</span>
                        <a href="*" id='${id}'> Подробнее... </a>
                    </article>
                    `
                  )
                  .join("")}
                </div>
                </section>
        `;
    container.insertAdjacentHTML("beforeend", html);

    this.$tracker = container.querySelector(".coaches__slider_tracker");
    this.$slider = container.querySelector(".coaches__slider");
    this.$coaches = container.querySelectorAll(".coaches__slider_coach");
  }

  renderControls(container) {
    const html = `
        <div class="coaches__controls">
            <hr />
            <div class="coaches__controls_arrows">
                <img src="./icons/next.svg" alt="prev" id='prev'/>
                <img src="./icons/next.svg" alt="next" id='next'/>
            </div>
        </div>
        `;
    container.insertAdjacentHTML("beforeend", html);
  }

  style() {
    this.width = +this.$slider.offsetWidth;
    this.$tracker.style.width = `${slidesCount(this) * this.width}px`;
    this.$coaches.forEach((c) => (c.style.width = currSlideWidth(this)));
  }

  addListenerToControls() {
    this.$container.addEventListener("click", (e) => {
      if (!isSearched(["next", "prev"], (s) => s === e.target.id)) return;
      this.calcCount(e.target.id);
    });
  }

  calcCount(id) {
    if (id === "next") this.count++;
    else this.count--;

    this.checkCountRate(this.count);

    this.moveTracker(this.count);
  }

  checkCountRate(count) {
    if (count === slidesCount(this)) this.count = 0;
    if (count < 0) this.count = slidesCount(this) - 1;
  }

  moveTracker = (count) =>
    (this.$tracker.style.transform = `translateX(-${count * this.width}px)`);
}
