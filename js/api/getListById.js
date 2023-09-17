/**
 * 特定のIDのリストデータを取得する
 * @function getListById
 * @param   {void}
 * @return  {void} --成功したらcreateDOMを呼び出す
 * common.jsを先に読み込むこと(ApiGatewayのURLを利用)
 */
function getListById(){
  const url     = new URL(window.location.href);
  const params  = url.searchParams;
  const idParam = params.get('id');
  fetch(config.ApiGateWay + '/items/'+ idParam)
  .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      console.log(res);
      return res.json();
  })
  .then((resData)=>{
    document.getElementById('id').value    = resData.id;
    document.getElementById('name').value  = resData.name;
    document.getElementById('price').value = resData.price;
  })
  .catch((err) => {
    console.log(err);
  });
}

//関数実行
getListById();


