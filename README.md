# Instatele
Telegram bot to send random Instagram post

You may use this program to run a Telegram bot that sends a random post from a public Instagram account (e.g. your favorite meme or cat accounts) to you or a group chat at scheduled time (e.g. every minute or every hour).

## Usage
The Docker image [kitce/instatele](https://hub.docker.com/r/kitce/instatele) is available in Docker hub.

The list of joined chat IDs will be stored in `/bot/data/chats.json` in the container, you may want to map it to your host.

Alternatively, you may clone this repository, run it with Yarn and Node.js.

### Note

Automatic posting will be activated automatically when the bot starts or is being added to a group chat.

Automatic posting will work only when `SCHEDULE` is defined. See [Environment Variables](#environment-variables).

## Comands
| Command | Description |
|--|--|
| /start | Start the bot and activate automatic posting at scheduled time |
| /hi | Trigger the bot to send a random Instagram post |
| /stop | Stop automatic posting |


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
| Variable  | Description |
|--|--|
| `DEBUG` | See [debug](https://github.com/visionmedia/debug) |
| `BOT_TOKEN`* | Telegram bot token ([@BotFather](https://t.me/BotFather)) |
| `INSTAGRAM_USERNAME`* | Instagram username |
| `SCHEDULE` | [Cron](https://en.wikipedia.org/wiki/Cron) job schedule |
*Required

## License
MIT License
