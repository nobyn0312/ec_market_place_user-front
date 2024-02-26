# go-ec-rest-api

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
