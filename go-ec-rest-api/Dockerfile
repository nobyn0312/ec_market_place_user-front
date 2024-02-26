FROM golang:alpine3.18
WORKDIR /app 
COPY . .
RUN chmod +x startup.sh
RUN go mod tidy && go install github.com/cosmtrek/air@latest
ENTRYPOINT ["sh", "startup.sh"]
