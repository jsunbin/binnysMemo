/**
 * 기능 리스트
 * 1. LocalStorage에 'savedMemo'에 해당하는 값 있는 지 확인 -> saveMemoList에 저장 -> O
 *  1-1. 있으면, 화면에 뿌려주고 
 *  1-2. 없으면, 진행 x
 * 2. 1에서 가져온 리스트 활용하여 메모 버튼을 클릭했을 때 메모를 저장한다. -> O
 *  2-1. 로컬 스토리지에 저장한다(==savedMemoList에 정보를 저장한다.)
 *  2-2. 화면에 뿌린다.
 * 3. 삭제버튼 클릭
 */

let savedMemoList = [];

function hideNoMemo() {
  const noMemo = document.querySelector('#emptyMemo');
  noMemo.setAttribute('style', 'display: none');
};

function checkLocalStorage() {
  const localSavedMemo = window.localStorage.getItem('savedMemo');
  
  if (localSavedMemo) {
    savedMemoList = JSON.parse(localSavedMemo);
    memoExist = true;
    showMemo(savedMemoList);
    hideNoMemo();
  };

}

function clearMemo() {
  document.querySelector('#editMemo').value = "";
}

function showMemo(savedMemoList) {
  const container = document.querySelector(".saved-paper");
  let memoList = [];
  savedMemoList.forEach(el => {
    const newMemo = `
      <div class="wrap-paper">
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
              <button class="edit-btn" type="button"><img src="./image/eraser.png"></button>
              <button class="delete-btn" type="button"><img src="./image/bin.png" alt="삭제하기"></button>
            </div>
          </div>
        </div>
      </div>
    `;
    memoList.push(newMemo);
  });

  container.innerHTML = memoList.reverse().join("")
};

function makeElForNew(memoInfo) {
  const container = document.querySelectorAll(".saved-paper");

  const newMemo = `
    <div class="wrap-paper">
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
          <textarea id="editMemo" cols="" rows="" placeholder="간단하게 메모를 작성해보세요">${memoInfo.memo}</textarea>
        </div>
        <div class="memo-footer">
          <p class="update-time">
            <span class="a11y-hidden">작성 시간 : </span>
            ${memoInfo.date}
          </p>
          <div class="edit-area">
            <button class="save-btn" type="button"><img src="./image/check.png">저장하기</button>
            <!-- <button class="delete-btn" type="button"><img src="./image/bin.png" alt="삭제하기"></button> -->
          </div>
        </div>
      </div>
    </div>
  `;

  newMemoList.push(newMemo);

  container.innerHTML = savedMemoList.join("");
}

function getMemoContent() {
  const memoContent = document.querySelector('#editMemo').value;

  return memoContent
}

function updateModifiedDate() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let date = now.getDate();
  let hour = now.getHours();
  let minutes = now.getMinutes();

  if (month.toString().length === 1) {
    month = '0' + month;
  }

  if (hour.toString().length === 1) {
    hour = '0' + hour;
  }

  if (minutes.toString().length === 1) {
    minutes = '0' + minutes;
  }

  let lastModifiedDate = `${year}/${month}/${date} ${hour}:${minutes}`;

  return lastModifiedDate
}

function makeMemoList() {
  const memoContent = getMemoContent();
  const lastModifiedDate = updateModifiedDate();
  memoExist = false;

  savedMemoList.push({id: savedMemoList.length, memo: memoContent, date: lastModifiedDate})

  // 로컬스토리지에 저장
  window.localStorage.setItem('savedMemo', JSON.stringify(savedMemoList))

  console.log(savedMemoList)
  // 보여주기
  showMemo(savedMemoList, memoExist);
  // return savedMemoList
};



window.onload = function () {
  checkLocalStorage();
}

function saveMemo() {
  makeMemoList();
  clearMemo();
}