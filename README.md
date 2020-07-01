# Instatele
Telegram bot to send random Instagram post

You may use this program to run a Telegram bot that sends a random post from a public Instagram account (e.g. your favorite meme or cat accounts) to you or a group.

## Usage
The Docker image [kitce/instatele](https://hub.docker.com/r/kitce/instatele) is available in Docker hub.

Alternatively, you may clone this repository, run it with Yarn and Node.js.

Send `/random` to trigger the bot to send a random post.

## Development
```bash
$ yarn dev
```

## Build
```bash
$ yarn build
```
Files will be available in `build/`

## Start
```bash
$ yarn start
```

## Environment variables
| Variable | Default | Description |
|--|--|--|
| `DEBUG` | | See [debug](https://github.com/visionmedia/debug) |
| `PORT` | 8443 | Webhook port |
| `BOT_TOKEN`* | | Telegram bot token ([@BotFather](https://t.me/BotFather)) |
| `WEBHOOK_URL` | | Webhook URL |
| `USERNAME`* | | Instagram username |

*Required

## License
MIT License
