# EC-MARKET-PLACE

## 開発環境構築手順

### 各コンテナビルド・起動
go-ec-rest-api/.envを配置(.envの内容は別途共有)
```bash
docker compose up --build
```

### マイグレーション実行
```bash
docker compose exec -e GO_ENV=dev api go run /app/migrate/migrate.go
```
または
```bash
docker compose restart
```

## 動作確認
### API
CSRFトークンが取得できることを確認
```bash
curl http://localhost:9090/user/csrf  
```

### 管理画面
ブラウザで **http://localhost:4000/** にアクセス

### ユーザー画面
ブラウザで **http://localhost:4001/** にアクセス

### pgAdmin
ブラウザで **http://localhost:8080/** にアクセス  
go-ec-rest-api/.env記載のメールアドレス・パスワードを入力してログイン  
サーバー作成→接続情報を設定してDB接続