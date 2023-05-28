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

  // removeFromWatch(element) {
  //   if (!this.isAdded(element, this.#watched)) {
  //     const index = this.#watched.findIndex(movie => movie.id === element.id);
  //     if (index !== -1) {
  //       this.#watched.splice(index, 1);
  //       localStorage.setItem("watched-movies", JSON.stringify(this.#watched));
  //     }
  //   }
  // }

  // removeFromWatch(element) {
  //   const index = this.#watched.findIndex(movie => movie.id === element.id);
  //   if (index !== -1) {
  //     this.#watched.splice(index, 1);
  //     localStorage.setItem("watched-movies", JSON.stringify(this.#watched));
  //   }
  // }

  removeFromWatch(element) {
    const updatedWatched = this.#watched.filter(
      movie => movie.id !== element.id
    );
    this.#watched = updatedWatched;
    localStorage.setItem("watched-movies", JSON.stringify(this.#watched));
  }
}
