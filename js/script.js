// 抓取container的資料
const container = document.querySelector('.container');
// querySelctor: Returns the first element that is a descendant of node that matches selectors.

const seats = document.querySelectorAll('.row .seat:not(.occupied)');
// querySelectorAll: Returns all element descendants of node that match selectors.

const count = document.getElementById('count');
// getElementById: Returns a reference to the first object with the specified value of the ID attribute.

const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');

populateUI();

// const ticketPrice = parseInt(movieSelect.Value);
let ticketPrice = parseInt(movieSelect.value);

// Save Selected movie index and price
function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex',movieIndex);
  localStorage.setItem('selectMoviePrice',moviePrice);
}

//Update total and Count
function updateSelectedCount() {
  //注意: .row .seat.selected 不等於 .row.seat.selected
  // .row .seat.selected 代表<div>row下面的class "seat selected"
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // Copy selected seats into arr
    // Map through aray
    // Return a new array indexes
    // 使用...可以把多個目標內的內容依次選取完成
    // 使用map可以用來傳遞陣列
    // 被選取的座位會回傳以陣列所屬的index
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));



    console.log(seatsIndex);

  //使用Length回傳所選取的座位數量
  //Returns the number of nodes in the collection.
  const selectedSeatsCount = selectedSeats.length;
  
  // 把選取的座位數跟票價進行運算，反應回頁面數字
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI

function populateUI() {
  //把選取的位置紀錄儲存在本地端的記憶體
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')
  );
  // 條件一: 只要選取的seat不為null且選取的座位數量大於0
  // 條件二: index>-1下，把seat的classlist新增selected
  // indexOf下，如值為-1，則代表無回傳任何東西
  if(selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected');
      }
    });
  }
  // 把選取的電影紀錄儲存在本地端當中
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie Select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});



// Seat Click Event
// 使用addEventListener來追蹤每個點選動作
// 目標為container
container.addEventListener('click', e =>{
  // Target內有多個Class，所以使用e.target.classList.contains的方法來確認是否有相符的字串
  // 欲探討主題: e.target.classList與contains放在一起的用法
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    console.log(e.target);
  }{
    // 使用toggle把座位變成按鈕，把target property變成該id的class特性
    // 疑點: 為什麼這個會作用?
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
})

// Initial count and total set
// 讓一開始就顯示正確計算的票價
updateSelectedCount();