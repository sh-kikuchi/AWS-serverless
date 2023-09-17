/**
 * IDがあればデータ更新、無ければデータ作成を行う
 * @function put
 * @param   {void}
 * @return  window.location.assign - 通信成功したらリスト画面へ遷移する
 */
function put(){
  // idの存在チェック用変数
  const existId = document.getElementById('id');

  // データ取得
  const itemId    = existId !== null ?  existId.value : null;
  const itemName  = document.getElementById('name').value;
  const itemPrice = document.getElementById('price').value;

  //リクエストヘッダー
  const reqHeader =  {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  //リクエストボディー
  const reqData = JSON.stringify({
      id    : itemId === null || itemId ===undefined ||  itemId ==='' ? String(Math.floor(Math.random() * 10000)) : itemId, 
      name  : itemName,
      price : itemPrice
  });

  //API通信
  fetch(config.ApiGateWay + '/items',
      {
          method: 'PUT',
          headers: reqHeader,
          body: reqData
      })
      .then((res) => {
          if (!res.ok) {
              throw new Error(`${res.status} ${res.statusText}`);
          }
          return window.location.assign("list.html");
      })
      .catch((reason) => {
          console.log(reason);
      });
}