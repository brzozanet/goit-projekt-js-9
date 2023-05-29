export class UserMovies {
  #watched = [];
  #queued = [];

  constructor() {
    const watched = JSON.parse(localStorage.getItem("watched-movies"));
    const queued = JSON.parse(localStorage.getItem("queued-movies"));

    if (watched) {
      this.#watched = watched;
    } else {
      this.#watched = [];
    }

    if (queued) {
      this.#queued = queued;
    } else {
      this.#queued = [];
    }
  }

  get watched() {
    return this.#watched;
  }

  get queued() {
    return this.#queued;
  }

  isAdded(element, array) {
    for (let i = 0; i < array.length; i++) {
      if (+array[i].id === +element.id) {
        return false;
      }
    }
    return true;
  }

  addToWatch(element) {
    if (this.isAdded(element, this.#watched)) {
      this.#watched.push(element);
      localStorage.setItem("watched-movies", JSON.stringify(this.#watched));
    }
  }

  addToQueue(element) {
    if (this.isAdded(element, this.#queued)) {
      this.#queued.push(element);
      localStorage.setItem("queued-movies", JSON.stringify(this.#queued));
    }
  }
}
