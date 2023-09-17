/**
 * 特定のデータを１件削除する
 * @function trash
 * @param   {string} targetId
 * @return  window.location.assign - 通信成功したらリスト画面へ遷移する
 */
function trash(targetId){
  //リクエストヘッダー
  const reqHeader =  {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  //API通信
  fetch(config.ApiGateWay + '/items/'+ targetId,
      {
          method: 'DELETE',
          headers: reqHeader,
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
