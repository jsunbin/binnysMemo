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
let memoExist = false;

function hideNoMemo() {
  const noMemo = document.querySelector('.no-memo-text');
  noMemo.classList.add('none');
};

function checkLocalStorage() {
  const localSavedMemo = window.localStorage.getItem('savedMemo');
  
  if (localSavedMemo) {
    savedMemoList = JSON.parse(localSavedMemo);
    memoExist = true;
    showMemo(savedMemoList, memoExist);
    hideNoMemo();
  };

};

function showMemo(savedMemoList, memoExist) {
  console.log(savedMemoList);
  if (memoExist) {
    savedMemoList.forEach(el => {
      makeElementForMemo(el);
    });
  } else {
    const lastMemoInfo = savedMemoList[savedMemoList.length-1];
    makeElementForMemo(lastMemoInfo);
  };
};


function makeElementForMemo(memoInfo){
  const memoList = document.querySelector('.memo-list');

  let memoLiElement = document.createElement('li');
  let titleElement = document.createElement('h3');
  let contentElement = document.createElement('p');
  let dateElement = document.createElement('span');
  dateElement.classList.add('memo-modified-info');

  titleElement.textContent = memoInfo.title === '' ? '제목 없음' : getMemoTitle();
  contentElement.textContent = memoInfo.content === '' ? '내용없음' : memoInfo.content;
  console.log(memoInfo.content)
  dateElement.textContent = memoInfo.date;

  memoLiElement.append(titleElement, contentElement, dateElement);
  memoList.append(memoLiElement);
};


function getMemoTitle() {
  const memoTitle = document.querySelector('#title').value;

  return memoTitle
}

function getMemoContent() {
  const memoContent = document.querySelector('#content').value;

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
  console.log('make list')
  const memoTitle = getMemoTitle();
  const memoContent = getMemoContent();
  const lastModifiedDate = updateModifiedDate();
  memoExist = false;

  savedMemoList.push({id: savedMemoList.length, title: memoTitle, content: memoContent, date: lastModifiedDate})

  // 로컬스토리지에 저장
  window.localStorage.setItem('savedMemo', JSON.stringify(savedMemoList))

  // 보여주기
  showMemo(savedMemoList, memoExist)
  // return savedMemoList
};

window.onload = function () {
  checkLocalStorage();
}

function saveMemo() {
  console.log('clicked');
  hideNoMemo();
  makeMemoList();
}