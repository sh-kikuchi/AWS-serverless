# the serverless
- フロントエンド（FE）：HTML, JavaScript
- バックエンド（BE）：Node.js（AWS Lambda）, DynamoDB（AWS）
- 認証: Cognito（AWS）
- ルート（URL）：API Gateway

<br>

# 1. 概要
本アプリはJavaScriptとAWSを用いたサーバレスアプリのデモ版である。AWSが提供している[チュートリアル: Lambda と DynamoDB を使用した CRUD API の構築](https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/http-api-dynamo-db.html)をもとに画面付で実装してみるのが主要目的である。学習目標としては下記のものを想定する
- Cognitoを通じて、認証トークンの扱いになれる（各種トークンの使い分けについて学ぶ）
- JSとAWSのLambdaとのAPI連携
- Dynamoを例としたNoSQLに対する理解度を高める。


### 【目次】
- [the serverless](#the-serverless)
- [1. 概要](#1-概要)
    - [【目次】](#目次)
- [2. アプリでの準備](#2-アプリでの準備)
    - [■ common.jsを用意する。](#-commonjsを用意する)
- [3. AWSコンソールでの準備](#3-awsコンソールでの準備)
    - [■ DynamoDB テーブルを作成](#-dynamodb-テーブルを作成)
    - [■  Lambda 関数を作成する](#--lambda-関数を作成する)
    - [■  API Gateway](#--api-gateway)
      - [【HTTP API を作成する】](#http-api-を作成する)
      - [【ルートを作成する】](#ルートを作成する)
      - [【統合】](#統合)
      - [※ CORS対策](#-cors対策)


<br>

# 2. アプリでの準備
### ■ common.jsを用意する。
設定ファイルで主にAWSの情報を管理するためのものになる。現時点に以下のものを設定する必要がある。common.jsはGit管理外のため、common_example.jsをコピーして「common.js」にリネームして使うこと。
- UserPoolId: AWSのCognitoのユーザープールID
- ClientId: AWSのCognitoのクライアントID
- IdentityPoolId:  ID プール,
- ApiGateWay: APIGatewayで作成したルート
- Region: AWSのリージョン
- LoginProvider: AWSのCognitoで使うログインプロバイダ
※common_example.jsに例あり。

<br>

# 3. AWSコンソールでの準備
- ログイン実装の参照：
  - [【Amazon Cognito】JavaScriptでログイン処理を実装する方法](https://medium-company.com/amazon-cognito-javascript-%e3%83%ad%e3%82%b0%e3%82%a4%e3%83%b3/)
  - [Amazon Cognitoを使ったサインイン画面をつくってみる](https://www.tdi.co.jp/miso/amazon-cognito-sign-up)


- サーバレス構築の参照：
  - [チュートリアル: Lambda と DynamoDB を使用した CRUD API の構築](https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/http-api-dynamo-db.html)


▼下記内容はAWSのチュートリアルから簡単に項目を抽出したもの。
### ■ DynamoDB テーブルを作成
- [DynamoDB コンソール](https://console.aws.amazon.com/dynamodb/)
- テーブル作成
- テーブル名を入力
- パーティションキーは「id」（データ型は数値）とする

<br>

### ■  Lambda 関数を作成する
- [Lambda コンソール](https://console.aws.amazon.com/dynamodb/)
- 関数の作成
- 関数名を入力
- アクセス権限の編集
  - AWSポリシーテンプレートから新しいロールを作成
  - ロール名をにゅるよく
  - ポリシーテンプレート - オプション:「シンプルなマイクロサービスのアクセス権限 DynamoDB」
- index.mjsにコードを記述

<br>

### ■  API Gateway 
#### 【HTTP API を作成する】
- [API Gateway コンソール](https://console.aws.amazon.com/apigateway)
- [API を作成] を選択
- [HTTP API] で [構築] を選択
- API 名を入力
- 「次へ」を何度か押し進めて、「作成」

#### 【ルートを作成する】
- [API Gateway コンソール](https://console.aws.amazon.com/apigateway)
- 「ルート」 を選択し、「作成」
  - GET /items/{id}
  - GET /items
  - PUT /items
  - DELETE /items/{id}

#### 【統合】
- 「統合を管理」タブの「作成」ボタンを押下
- 統合ターゲットの統合タイプでLambdaを選択
- 「統合ルートにアタッチする」ですべてのルートで下記のことを行う。
  - 「既存の統合を選択する」で作成した関数名を選択
  - 統合をアタッチする

#### ※ CORS対策
> ウェブページが異なるドメインからのリソース（ここではAWSの各種サービスにあたる）にアクセスする制約を管理する仕組み
- APIを選択
- サイドバーのDevelopの中の「CORS」を選択
- デモアプリのため、アプリ作成者は以下のように設定（厳しめに設定していない）。
  - Access-Control-Allow-Origin：「＊」
  - Access-Control-Allow-Headers：「＊」
  - Access-Control-Allow-Methods：「GET」「POST」「PUT」「DELETE」「OPTIONS」
    （「POST」「OPTIONS」は使っていないけど気持ち程度に）


