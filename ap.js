// chroma.random() - сгенерировать цвет
// chroma(color).luminance() - color: цвет, который надо проверить, а вся конструкция возвращает значение от 0 до 1, при этом если больше 0.5 - черный шрифт, меньше - белый, = 0.5 - хз

const list = document.querySelector(".list");
const lis = document.querySelectorAll(".col");
const body = document.querySelector("body");
const buttons = document.querySelectorAll("button");
const tips = document.querySelector("#tips");
const tipsText = document.querySelector(".tips_text");
const tipsButton = document.querySelector(".tips_question-button");

function giveColor() {
  return `rgba(${chroma.random()._rgb.join(",")})`;
  //   return chroma.random();
}

function onLoad() {
  if (document.location.hash.length > 1) {
    const colors = document.location.hash.substring(1).split("-");
    lis.forEach((el, i) => {
      let color = colors[i];
      el.style.background = color;
      el.firstElementChild.textContent = color;
      // el.style.color = chroma(color).luminance() > 0.5 ? "black" : "white";
      el.style.color =
        chroma(color).luminance() > 0.5
          ? "rgba(0,0,0,0.5)"
          : "rgba(255,255,255,0.7)";
    });
  } else {
    lis.forEach(change);
  }
}

onLoad();

function change(el) {
  if (el.querySelector("i").classList.contains("fa-lock")) {
    return el.innerText;
  }
  let color = giveColor();
  el.style.background = color;
  el.firstElementChild.textContent = color;
  // el.style.color = chroma(color).luminance() > 0.5 ? "black" : "white";
  el.style.color =
    chroma(color).luminance() > 0.5
      ? "rgba(0,0,0,0.5)"
      : "rgba(255,255,255,0.7)";

  return color;
}

document.addEventListener("keydown", changeColors);

function changeColors(e) {
  const colors = [];
  e.preventDefault();
  if (e.code.toLowerCase() !== "space") {
    return;
  }

  lis.forEach((e) => {
    colors.push(change(e));
  });

  updateColorsHash(colors);
}

document.addEventListener("click", onLock);

function onLock(e) {
  if (e.target.dataset.action === "lock") {
    const nodeI =
      e.target.nodeName.toLowerCase() === "i"
        ? e.target
        : e.target.firstElementChild;
    nodeI.classList.toggle("fa-lock-open");
    nodeI.classList.toggle("fa-lock");
  } else if (e.target.dataset.action === "text") {
    copyText(e.target.textContent);
  }
}

function copyText(text) {
  return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors = []) {
  document.location.hash = colors.toString().split("),r").join(")-r");
}

tips.addEventListener("click", onClickFn);

function onClickFn(e) {
  if (e.target.dataset.action === "close") {
    tipsText.classList.add("visually-hidden");
    tipsButton.classList.remove("visually-hidden");
    tips.classList.toggle("tips");
    tips.classList.toggle("q");
    const color =
      chroma(lis[lis.length - 1].innerText).luminance() > 0.5
        ? "rgba(0,0,0,0.5)"
        : "rgba(255,255,255,0.7)";
    tipsButton.style.color = color;
    tips.style.borderColor = color;
  } else if (e.currentTarget.classList.contains("q")) {
    tipsButton.classList.add("visually-hidden");
    tipsText.classList.remove("visually-hidden");
    tips.classList.toggle("q");
    tips.classList.toggle("tips");
    if (tips.hasAttribute("style")) {
      tips.removeAttribute("style");
    }
  }
}
