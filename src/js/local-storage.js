const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const load = key => {
  try {
    const serializedState = JSON.stringify(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

const keysName = {
  WATCHED: "watched",
  QUEUE: "queue",
};

const updateArray = event => {
  const watchedArray = load(keyName.WATCHED) || [];
  const queueArray = load(keyName.QUEUE) || [];

  if (event.target.innerText === "Add to watched") {
    saveToLocalStorage(watchedArray, keysName.WATCHED, "WATCHED", event);
  } else if (event.target === "Add to queue") {
    saveToLocalStorage(queueArray, keysName.QUEUE, "QUEUE", event);
  }
};

function saveToLocalStorage(key, array, event, keyIndex) {
  array.push(state.activeFilm);
  save(key, array);
  event.target.innerText = `Add to ${keyIndex}`;
}
