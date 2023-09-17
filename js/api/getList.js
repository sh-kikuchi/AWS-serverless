/**
 * 非同期通信(Read)
 * @function getList
 * @param   {void}
 * @return  {void} --成功したらcreateDOMを呼び出す
 * common.jsを先に読み込むこと(ApiGatewayのURLを利用)
 */
function getList(){
  fetch(config.ApiGateWay + '/items')
    .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
    })
    .then((resData)=>{
      createDOM(resData);
    })
    .catch((err) => {
      console.log(err);
    });
}
/**
 * DOM生成（リスト表示）
 * @function createDOM
 * @param   {json}apiData
 * @return  {void}
 */
function createDOM(apiData) {
  console.log(apiData);
  for (let i = 0; i < apiData.length; i++) {
    //リスト
    const li = document.createElement('li');
    const setId = 'list-id-' + i;
    li.setAttribute('id', setId);
    li.classList.add('lists');

    //リストに入れるテキスト
    const span = document.createElement("span");
    span.innerText = apiData[i].name +' '+ apiData[i].price;

    //編集画面のリンク
    const edit = document.createElement("a");
    edit.href      = "update.html?id=" +  apiData[i].id;
    edit.innerText = "編集";
    edit.target    = "_blank";

    //削除ボタン
    const trash = document.createElement("button");
    trash.setAttribute('onclick', `trash(${apiData[i].id})`);
    trash.innerText = "削除";

    //描画
    document.getElementById('list').appendChild(li);
    document.getElementById(setId).appendChild(span);
    document.getElementById(setId).appendChild(edit);
    document.getElementById(setId).appendChild(trash);
  }
}

//関数実行
getList();