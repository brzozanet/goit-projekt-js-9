export class UserMoviesWatched {
  #watched = [];

  // constructor() {
  //   const watched = JSON.parse(localStorage.getItem("watched-movies"));

  //   if (watched) {
  //     this.#watched = watched;
  //   } else {
  //     this.#watched = [];
  //   }
  // }

  // get watched() {
  //   return this.#watched;
  // }

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
}

export class UserMoviesQueued {
  #queued = [];

  // constructor() {
  //   const queued = JSON.parse(localStorage.getItem("queued-movies"));

  //   if (queued) {
  //     this.#queued = queued;
  //   } else {
  //     this.#queued = [];
  //   }
  // }

  // get queued() {
  //   return this.#queued;
  // }

  isAdded(element, array) {
    for (let i = 0; i < array.length; i++) {
      if (+array[i].id === +element.id) {
        return false;
      }
    }
    return true;
  }

  addToQueue(element) {
    if (this.isAdded(element, this.#queued)) {
      this.#queued.push(element);
      localStorage.setItem("queued-movies", JSON.stringify(this.#queued));
    }
  }
}
