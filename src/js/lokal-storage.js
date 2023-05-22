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

const updateArray = evt => {
  const watchedArray = load(keyName.WATCHED) || [];
  const queueArray = load(keyName.QUEUE) || [];

  if (evt.target.innerText === "Add to watched") {
    saveToLocalStorage(watchedArray, keysName.WATCHED, "WATCHED", evt);
  } else if (evt.target === "Add to queue") {
    saveToLocalStorage(queueArray, keysName.QUEUE, "QUEUE", evt);
  }
};

function saveToLocalStorage(key, array, evt, keyIndex) {
  array.push(state.activeFilm);
  save(key, array);
  evt.target.innerText = `Add to ${keyIndex}`;
}
