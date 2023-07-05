
let savedMemoList = []
function checkLocalStorage() {
  const localSavedMemo = window.localStorage.getItem('savedMemo');

  if(localSavedMemo) {
    savedMemoList = JSON.parse(localSavedMemo);
    isMemo = true;
    showOldMemo(savedMemoList)
    
  }
}

function showOldMemo(savedMemoList) {
  const container = document.querySelector(".saved-paper");
  let memoList = [];
  savedMemoList.forEach(el => {
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
            <textarea id="editMemo" cols="" rows="" placeholder="간단하게 메모를 작성해보세요">${el.memo}</textarea>
          </div>
          <div class="memo-footer">
            <p class="update-time">
              <span class="a11y-hidden">작성 시간 : </span>
              ${el.date}
            </p>
            <div class="edit-area">
              <button class="delete-btn" type="button"><img src="./image/bin.png" alt="삭제하기"></button>
            </div>
          </div>
        </div>
      </div>
    `;
    memoList.push(newMemo);
  });
  container.innerHTML = memoList.reverse().join("")
  
}

function saveMemo(event) {
  const newContentEl= document.querySelector('.first-memo #editMemo');

  console.log(event);

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
  const memoId = getCurrentTimeInSeconds()
  
  // 1-1. 작성 시간
  const lastModifiedDate = formattingTime();

  // 1-2. 메모 내용
  const newMemoContent = newContentEl.value;

  // 1-3. 메모 리스트 만들기: savedMemoList
  savedMemoList.push({id: memoId, memo: newMemoContent, date: lastModifiedDate});

  // 1-4. 로컬스토리지에 메모리스트 저장하기: {"savedMemo": "${savedMemoList}"}
  window.localStorage.setItem('savedMemo', JSON.stringify(savedMemoList));
}

function getCurrentTimeInSeconds() {
  const currentTime = new Date();
  const seconds = Math.floor(currentTime.getTime() / 1000);
  return seconds.toString().padStart(10, '0');
}

function formattingTime() {
  let now = new Date();
  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  let hour = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hour}:${minutes}`
}

function createNewMemo() {
  const container = document.querySelector(".saved-paper");
  let memoList = [];
  savedMemoList.forEach(el => {
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
            <textarea id="editMemo" cols="" rows="" placeholder="간단하게 메모를 작성해보세요">${el.memo}</textarea>
          </div>
          <div class="memo-footer">
            <p class="update-time">
              <span class="a11y-hidden">작성 시간 : </span>
              ${el.date}
            </p>
            <div class="edit-area">
              <button class="delete-btn" type="button"><img src="./image/bin.png" alt="삭제하기"></button>
            </div>
          </div>
        </div>
      </div>
    `;
    memoList.push(newMemo);
  });

  container.innerHTML = memoList.reverse().join("")
}

function clearMemo(newContent) {
  newContent.value = "";
}

// 삭제하기
function deleteMemo(event) {
  event.preventDefault();
  const deleteBtn = event.target.closest('.delete-btn');
  if (deleteBtn) {
    const memoId = deleteBtn.closest('div.wrap-paper').getAttribute('data-id');
    savedMemoList = savedMemoList.filter((memo) => memo.id !== memoId);
    window.localStorage.setItem('savedMemo', JSON.stringify(savedMemoList));
    showOldMemo(savedMemoList);
  }
}


window.addEventListener('load', checkLocalStorage);

const saveBtn = document.querySelector(".first-memo button");
saveBtn.addEventListener('click', saveMemo)

const container = document.querySelector(".saved-paper");
container.addEventListener('click', deleteMemo);