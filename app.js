const prologueSlides = [
  {
    image: "images/prologue/sunset-1.jpg",
    alt: "One Last Delivery",
    text: "You have one last delivery to make. Who even needs a delivery this late at night? " +
        "You glance at the instructions again: A gratuity awaits you. —The Butler",
  },
  {
    image: "images/prologue/NighttimeRoad-2.jpg",
    alt: "Headlights cutting through dense trees in the dark.",
    text: "The road gets darker and foggier. You must be there soon",
  },
  {
    image: "images/prologue/NighttimeRoad-3.jpg",
    alt: "An old sign marking the entrance to a private estate.",
    text: "You grow tired and can barely see through the fog in front of you.",
  },
  {
    image: "images/prologue/NighttimeRoad-4.jpg",
    alt: "Longing for life",
    text: "Surely, there will be sign of life soon. Maybe they can offer you a place to sleep for the night.",
  },
  {
    image: "images/prologue/Roadturnoff-5.jpg",
    alt: "Finally there's hope.",
    text: "You turn off on a path that appears to have once been a driveway.",
  },
    {
    image: "images/prologue/mistygate-6.jpg",
    alt: "A Gate Appears",
    text: "A gate appears. ",
  },
];

const prologueDuration = 5000;
let prologueIndex = 0;
let prologueTimer;

function showPrologueSlide() {
  const slide = prologueSlides[prologueIndex];
  const prologue = document.querySelector("#opening-prologue");

  prologue.style.setProperty("--slide-image", `url("${slide.image}")`);
  prologue.setAttribute("aria-label", slide.alt);

  document.querySelector("#prologue-step").textContent =
    `${prologueIndex + 1} / ${prologueSlides.length}`;
  document.querySelector("#prologue-text").textContent = slide.text;

  prologue.classList.remove("slide-enter");
  void prologue.offsetWidth;
  prologue.classList.add("slide-enter");

  prologueTimer = window.setTimeout(advancePrologue, prologueDuration);
}

function advancePrologue() {
  prologueIndex += 1;

  if (prologueIndex === prologueSlides.length) {
    finishPrologue();
    return;
  }

  showPrologueSlide();
}

function finishPrologue() {
  window.clearTimeout(prologueTimer);
  document.querySelector("#opening-prologue").classList.add("hidden");
  document.querySelector("#title-screen").focus();
}

function startPrologue() {
  window.clearTimeout(prologueTimer);

  prologueIndex = 0;
  $("#opening-prologue").classList.remove("hidden");

  showPrologueSlide();
}

const clues = {
  ledger: {
    title: "Porter's ledger",
    text: "A midnight service entry has been torn out. The remaining page carries a smear of sea salt.",
  },
  tarot: {
    title: "The Moon card",
    text: "Madame Orla's card bears Edmund Vale's handwriting: 'He knows what happened at Blackwater.'",
  },
  silk: {
    title: "Black silk thread",
    text: "A thread from a stage cape caught beneath the Blue Room's locked window.",
  },
  cufflink: {
    title: "Pelican cufflink",
    text: "An owner’s cufflink lies by the cellar drain. Its clasp is newly broken.",
  },
  tide: {
    title: "Tide chart",
    text: "At 11:15, a maintenance passage from the cellar to the sea wall stood above water for twelve minutes.",
  },
};

const rooms = {
  lobby: {
    kicker: "01 · Ground floor",
    title: "Grand Lobby",
    description: "Wind claws at the revolving doors. The desk lamp burns beside a bell that will not stop trembling.",
    actions: [{ label: "Examine the desk ledger", clue: "ledger" }],
  },
  salon: {
    kicker: "02 · Ground floor",
    title: "Velvet Salon",
    description: "A séance table is still laid beneath a cracked chandelier. The medium's perfume hangs thick in the damp air.",
    actions: [{ label: "Inspect the scattered tarot cards", clue: "tarot" }],
  },
  stage: {
    kicker: "03 · Theatre wing",
    title: "Seaside Theatre",
    description: "Red curtains breathe in the draft. A vanished audience faces an empty stage, save for a magician's discarded cape.",
    actions: [{ label: "Search the stage window", clue: "silk" }],
  },
  blue: {
    kicker: "04 · East corridor",
    title: "The Blue Room",
    description: "Edmund Vale's room is orderly except for a saltwater pool under the window. There is no body, only a locked door.",
    actions: [{ label: "Examine the broken cufflink", clue: "cufflink" }],
  },
  cellar: {
    kicker: "05 · Below sea level",
    title: "Wine Cellar",
    description: "The cellar shudders with each wave. Behind stacked claret, a narrow service passage waits behind a rusted gate.",
    actions: [{ label: "Read the tide chart", clue: "tide" }],
  },
};

const suspects = {
  porter: {
    name: "Silas Wren",
    role: "Night porter",
    portrait: "♜",
    intro: "Mr. Wren worries a ring of keys in his palm. “I saw no one leave, detective. The storm saw to that.”",
    questions: [
      { text: "Why is a service entry missing from your ledger?", need: ["ledger"], reply: "“Because Mr. Vale paid me to forget it. Someone used the cellar passage at 11:15. I assumed it was the owner.”" },
      { text: "Who had a reason to fear Edmund Vale?", need: [], reply: "“All of them, perhaps. But Mr. Vale was blackmailing the mansion. He kept records of every old sin.”" },
    ],
  },
  medium: {
    name: "Madame Orla Vey",
    role: "Medium",
    portrait: "☽",
    intro: "Madame Vey smiles without warmth. “The dead are far more candid than the living.”",
    questions: [
      { text: "What did Edmund write on this card?", need: ["tarot"], reply: "“Blackwater. A drowning, years ago. The owner’s brother was blamed, but Vale knew the truth. He meant to sell it at dawn.”" },
      { text: "Did you see Vale after the séance?", need: [], reply: "“I saw him meet a man in a black cape. Or so I thought. The storm makes masks of us all.”" },
    ],
  },
  magician: {
    name: "Lucien March",
    role: "Disgraced stage magician",
    portrait: "♠",
    intro: "Lucien March's hands are immaculate. “A trick is only a lie with proper timing.”",
    questions: [
      { text: "Your cape was at the Blue Room window.", need: ["silk"], reply: "“Stolen. The owner borrowed it after supper—he said he needed to avoid being recognized in the rain.”" },
      { text: "Could someone vanish from the Blue Room?", need: ["tide"], reply: "“Through the cellar passage, yes. It opens beyond the sea wall when the tide permits. But it is no stage exit.”" },
    ],
  },
  owner: {
    name: "Alistair Vale",
    role: "Owner of the Saltwater Mansion",
    portrait: "♛",
    intro: "Alistair Vale stands perfectly still beneath the portrait of his drowned brother. “This mansion is my family’s grave. Do not make it yours.”",
    questions: [
      { text: "How did your cufflink reach the cellar?", need: ["cufflink"], reply: "“I lost it days ago.” His hand closes over its matching twin. “You have no proof I went below tonight.”" },
      { text: "What happened at Blackwater?", need: ["tarot", "cufflink"], reply: "“Edmund was going to expose me. My brother did not drown by accident. I held him under the water, and Edmund saw.”" },
    ],
  },
};

const state = { collected: new Set(), currentRoom: "lobby", currentSuspect: null, asked: new Set() };
const $ = (selector) => document.querySelector(selector);

function hasClues(required) {
  return required.every((clue) => state.collected.has(clue));
}

function renderRoom(roomKey) {
  state.currentRoom = roomKey;
  const room = rooms[roomKey];
  $("#room-kicker").textContent = room.kicker;
  $("#room-title").textContent = room.title;
  $("#room-description").textContent = room.description;
  document.querySelectorAll(".room").forEach((button) => button.classList.toggle("active", button.dataset.room === roomKey));
  $("#room-actions").innerHTML = room.actions.map((action) => {
    const found = state.collected.has(action.clue);
    return `<button class="action-button ${found ? "collected" : ""}" data-clue="${action.clue}" ${found ? "disabled" : ""}>${found ? "Evidence collected: " : ""}${action.label}</button>`;
  }).join("");
  document.querySelectorAll("[data-clue]").forEach((button) => button.addEventListener("click", () => collectClue(button.dataset.clue)));
}

function collectClue(clueKey) {
  state.collected.add(clueKey);
  renderRoom(state.currentRoom);
  renderBoard();
  renderSuspects();
  const count = state.collected.size;
  $("#clue-count").textContent = `${count}/5`;
  $("#objective").textContent = count === 5
    ? "The pattern is complete. Confront the guests and make your accusation."
    : `Evidence recovered: ${clues[clueKey].title}. Find the rest of the killer's path.`;
}

function renderBoard() {
  $("#clue-list").innerHTML = Object.entries(clues).map(([key, clue]) => state.collected.has(key)
    ? `<article class="clue-card"><strong>${clue.title}</strong><p>${clue.text}</p></article>`
    : `<article class="clue-card empty">An unrecovered piece of evidence.</article>`).join("");
  const found = state.collected.size;
  $("#progress-fill").style.width = `${found * 20}%`;
  $("#progress-text").textContent = `${found} of 5 key clues recovered`;
  $("#theory-text").textContent = found < 3
    ? "The storm has scattered the truth across the mansion."
    : found < 5
      ? "Someone used the sea-wall passage. The owner’s story is coming apart."
      : "Vale borrowed March's cape, used the passage at low tide, and tried to erase the proof of Blackwater.";
}

function renderSuspects() {
  $("#suspect-list").innerHTML = Object.entries(suspects).map(([key, person]) => {
    const ready = person.questions.some((question) => hasClues(question.need));
    return `<button class="suspect-button ${ready ? "ready" : ""}" data-suspect="${key}">${person.name}</button>`;
  }).join("") + (state.collected.size === 5 ? `<button class="suspect-button ready" data-open-accusation>Make accusation</button>` : "");
  document.querySelectorAll("[data-suspect]").forEach((button) => button.addEventListener("click", () => openInterrogation(button.dataset.suspect)));
  const accusation = document.querySelector("[data-open-accusation]");
  if (accusation) accusation.addEventListener("click", () => openOverlay("accusation"));
}

function openInterrogation(key) {
  state.currentSuspect = key;
  const person = suspects[key];
  $("#interrogation-role").textContent = person.role;
  $("#interrogation-name").textContent = person.name;
  $("#interrogation-portrait").textContent = person.portrait;
  $("#dialogue").textContent = person.intro;
  renderQuestions();
  openOverlay("interrogation");
}

function renderQuestions() {
  const person = suspects[state.currentSuspect];
  $("#question-list").innerHTML = person.questions.map((question, index) => {
    const id = `${state.currentSuspect}-${index}`;
    const available = hasClues(question.need);
    const asked = state.asked.has(id);
    const label = asked ? "Asked" : question.text;
    const lock = available ? "" : `Requires: ${question.need.map((clue) => clues[clue].title).join(", ")}`;
    return `<button class="question-button" data-question="${index}" ${!available || asked ? "disabled" : ""}>${label}${lock ? `<br /><small>${lock}</small>` : ""}</button>`;
  }).join("");
  document.querySelectorAll("[data-question]").forEach((button) => button.addEventListener("click", () => askQuestion(Number(button.dataset.question))));
}

function askQuestion(index) {
  const id = `${state.currentSuspect}-${index}`;
  const question = suspects[state.currentSuspect].questions[index];
  state.asked.add(id);
  $("#dialogue").textContent = question.reply;
  renderQuestions();
  if (state.currentSuspect === "owner" && index === 1) {
    $("#objective").textContent = "Alistair Vale has confessed his motive. The case is ready for judgment.";
  }
}

function openOverlay(id) {
  $(`#${id}`).classList.remove("hidden");
}
function closeOverlay(id) {
  $(`#${id}`).classList.add("hidden");
}

function renderAccusations() {
  $("#accusation-options").innerHTML = Object.entries(suspects).map(([key, suspect]) =>
    `<button class="accuse-button" data-accuse="${key}"><strong>${suspect.name}</strong>${suspect.role}</button>`).join("");
  document.querySelectorAll("[data-accuse]").forEach((button) => button.addEventListener("click", () => resolveAccusation(button.dataset.accuse)));
}

function resolveAccusation(key) {
  closeOverlay("accusation");
  if (key === "owner") {
    $("#ending-title").textContent = "The sea gives up its dead";
    $("#ending-copy").textContent = "Alistair Vale used Lucien's cape to cross the mansion unseen, lured Edmund through the cellar at low tide, and sent him into the black water beyond the sea wall. By dawn, the storm has broken. So has the last lie in the Saltwater Mansion.";
  } else {
    $("#ending-title").textContent = "A shadow, not the truth";
    $("#ending-copy").textContent = "The accusation does not hold. In the roar of the storm, Alistair Vale watches you leave with the quiet relief of a man who has survived another night. The Blue Room remains locked.";
  }
  openOverlay("ending");
}

function restart() {
  state.collected.clear(); state.asked.clear(); state.currentRoom = "lobby";
  closeOverlay("ending");
  $("#game-screen").classList.add("hidden");
  $("#title-screen").classList.remove("hidden");
}

function showCurrentScreen() {
  const isInMansion = window.location.hash === "#mansion";

  $("#title-screen").classList.toggle("hidden", isInMansion);
  $("#game-screen").classList.toggle("hidden", !isInMansion);

  if (isInMansion) {
    renderRoom("lobby");
    renderBoard();
    renderSuspects();
    renderAccusations();
  }
}

$("#start-game").addEventListener("click", () => {
  window.location.hash = "mansion";
});

window.addEventListener("hashchange", showCurrentScreen);
showCurrentScreen();
$("#case-board-button").addEventListener("click", () => openOverlay("case-board"));
document.querySelectorAll(".room").forEach((button) => button.addEventListener("click", () => renderRoom(button.dataset.room)));
document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => closeOverlay(button.dataset.close)));
$("#restart-game").addEventListener("click", restart);
document.querySelector("#skip-prologue").addEventListener("click", finishPrologue);
$("#replay-prologue").addEventListener("click", startPrologue);
startPrologue();