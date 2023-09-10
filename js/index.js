let savedMemoList = [];
function checkLocalStorage() {
  const localSavedMemo = window.localStorage.getItem("savedMemo");

  if (localSavedMemo) {
    savedMemoList = JSON.parse(localSavedMemo);
    isMemo = true;
    showOldMemo(savedMemoList);
  }
}

function showOldMemo(savedMemoList) {
  const container = document.querySelector(".saved-paper");
  let memoList = [];
  
  savedMemoList.forEach((el) => {
    const starBtn = el.star ? '<button class="star-btn on" type="button"></button>' : '<button class="star-btn" type="button"></button>'
    const newMemo = `
      <div class="wrap-paper" data-id=${el.id}>
        <div class="paper-area">
          <div class="memo-head">
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
          </div>
          <div class="memo-area">
            <div class="memo-contents">${el.memo}</div>
          </div>
          <div class="memo-footer">
            <p class="update-time">
              <span class="a11y-hidden">작성 시간 : </span>
              ${el.date}
            </p>
            <div class="edit-area">
              ${starBtn}
              <button class="edit-btn" type="button"><span class="a11y-hidden">수정하기</<span></button>
              <button class="delete-btn" type="button"><span class="a11y-hidden">삭제하기</<span></button>
            </div>
          </div>
        </div>
      </div>
    `;
    memoList.push(newMemo);
  });
  container.innerHTML = memoList.reverse().join("");
  
}


function saveMemo(event) {
  const newContentEl = document.querySelector(".first-memo #editMemo");

  // 메모 리스트 생성하기
  makeMemoList(newContentEl);

  // 2. 새로운 메모 생성하기
  createNewMemo();

  // 3. 새 메모칸에는 내용 비우기
  clearMemo(newContentEl);
}

function makeMemoList(newContentEl) {
  // 1. 메모 내용 가져오기

  // 1-0. id:
  const memoId = getCurrentTimeInSeconds();

  // 1-1. 작성 시간
  const lastModifiedDate = formattingTime();

  // 1-2. 메모 내용
  const newMemoContent = newContentEl.value;

  // 1-3. 메모 리스트 만들기: savedMemoList
  savedMemoList.push({
    id: memoId,
    memo: newMemoContent,
    date: lastModifiedDate,
    star: false
  });

  // 1-4. 로컬스토리지에 메모리스트 저장하기: {"savedMemo": "${savedMemoList}"}
  window.localStorage.setItem("savedMemo", JSON.stringify(savedMemoList));
}

function getCurrentTimeInSeconds() {
  const currentTime = new Date();
  const seconds = Math.floor(currentTime.getTime() / 1000);
  return seconds.toString().padStart(10, "0");
}

function formattingTime() {
  let now = new Date();
  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  let hour = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hour}:${minutes}`;
}

function createNewMemo() {
  const container = document.querySelector(".saved-paper");
  let memoList = [];
  savedMemoList.forEach((el) => {
    const starBtn = el.star ? '<button class="star-btn on" type="button"></button>' : '<button class="star-btn" type="button"></button>'
    const newMemo = `
      <div class="wrap-paper" data-id=${el.id}>
        <div class="paper-area">
          <div class="memo-head">
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
          </div>
          <div class="memo-area">
            <div class="memo-contents">${el.memo}</div>
          </div>
          <div class="memo-footer">
            <p class="update-time">
              <span class="a11y-hidden">작성 시간 : </span>
              ${el.date}
            </p>
            <div class="edit-area">
              ${starBtn}
              <button class="edit-btn" type="button"><span class="a11y-hidden">수정하기</<span></button>
              <button class="delete-btn" type="button"><span class="a11y-hidden">삭제하기</<span></button>
            </div>
          </div>
        </div>
      </div>
    `;
    memoList.push(newMemo);
  });

  container.innerHTML = memoList.reverse().join("");
}

function clearMemo(newContent) {
  newContent.value = "";
}

// 삭제하기
function deleteMemo(event) {
  event.preventDefault();
  console.log("삭제")
  const deleteBtn = event.target.closest(".delete-btn");
  if (deleteBtn) {
    const memoId = deleteBtn.closest("div.wrap-paper").getAttribute("data-id");
    savedMemoList = savedMemoList.filter((memo) => memo.id !== memoId);
    window.localStorage.setItem("savedMemo", JSON.stringify(savedMemoList));
    showOldMemo(savedMemoList);
  }
}

// 수정하기
function editMemo(event) {
  event.preventDefault();

  // 수정하기 버튼을 누르면
  // 1. event에서 data-id 가져오기
  const editBtn = event.target.closest(".edit-btn");
  const memoId = editBtn.closest("div.wrap-paper").getAttribute("data-id");

  const targetMemo = savedMemoList.find((memo) => memo.id === memoId);
  // 2. edit-memo에 자식요소로 해당하는 메모 정보가 담겨 있는 textAREA가 있는 html return

  const container = document.querySelector(".edit-memo");

  container.classList.add("active");
  container.innerHTML = `
    <div class="wrap-paper" data-id="${memoId}">
    <div class="paper-area">
      <div class="memo-head">
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
      </div>
      <div class="memo-area">
        <textarea class="memo-contents">${targetMemo.memo}</textarea>
      </div>
      <div class="memo-footer">
        <p class="update-time">
          <span class="a11y-hidden">작성 시간 : </span>
          ${targetMemo.date}
        </p>
        <div class="edit-area">
          <button class="save-btn" type="button">
            <img src="./image/check.png" />저장하기
          </button>
        </div>
      </div>
    </div>
  </div>
  `;

  const saveBtn = document.querySelector(".edit-memo .save-btn");
  saveBtn.addEventListener("click", editSave);
}

// 수정 후, 저장하기 버튼 클릭 시
function editSave(event) {
  event.preventDefault();

  const saveBtn = event.target.closest(".save-btn");
  if (saveBtn) {
    const memoId = saveBtn.closest("div.wrap-paper").getAttribute("data-id");
    const targetMemo = savedMemoList.find((memo) => memo.id === memoId);
    if (targetMemo) {
      const editedMemoContent = document.querySelector(
        ".edit-memo .memo-contents"
      );
      targetMemo.memo = editedMemoContent.value;
    }
    const container = document.querySelector(".edit-memo");

    container.classList.remove("active");
    window.localStorage.setItem("savedMemo", JSON.stringify(savedMemoList));
    showOldMemo(savedMemoList);
  }
}

// 별표 클릭
function clickStar(event) {
  console.log("star");

  // 1. 클래스에 on 토글 이벤트
  // 2. on 여부에 따라 localStorage 정보에 추가

  const starBtn = event.target.closest(".star-btn");
  const memoId = starBtn.closest("div.wrap-paper").getAttribute("data-id");

  if (starBtn.classList.contains("on") ) {
    starBtn.classList.remove("on")
    changeStar(memoId, false)
  } else {
    starBtn.classList.add("on")
    changeStar(memoId, true)
  }
}

// 메모 id 찾아서 star 값 변경하기
function changeStar(targetId, isStar) {
// 객체 배열에서 해당 ID를 가진 객체 찾기
const changedMemoList = savedMemoList.find(item => item.id === targetId);

// 해당 객체가 존재하면 star 값을 prams isStar로 변경
if (changedMemoList) {
  changedMemoList.star = isStar;
} 

  window.localStorage.setItem("savedMemo", JSON.stringify(savedMemoList));
}

// ==========
window.addEventListener("load", checkLocalStorage);

const saveBtn = document.querySelector(".first-memo button");
saveBtn.addEventListener("click", saveMemo);

const container = document.querySelector(".saved-paper");
container.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    deleteMemo(event);
  } else if (event.target.classList.contains("edit-btn")) {
    editMemo(event);
  } else if (event.target.classList.contains("star-btn")) {
    clickStar(event);
  }
});
