# @gramio/keyboards

Framework-agnostic Telegram bot keyboard (and inline query result) builder with many cool features!

<div align="center">

[![npm](https://img.shields.io/npm/v/@gramio/keyboards?logo=npm&style=flat&labelColor=000&color=3b82f6)](https://www.npmjs.org/package/@gramio/keyboards)
[![npm downloads](https://img.shields.io/npm/dw/@gramio/keyboards?logo=npm&style=flat&labelColor=000&color=3b82f6)](https://www.npmjs.org/package/@gramio/keyboards)
[![JSR](https://jsr.io/badges/@gramio/keyboards)](https://jsr.io/@gramio/keyboards)
[![JSR Score](https://jsr.io/badges/@gramio/keyboards/score)](https://jsr.io/@gramio/keyboards)

</div>

### Installation (if you don't use GramIO)

```bash
npm i @gramio/keyboards
```

# See more in [Documentation](https://gramio.dev/keyboards/overview.html)

## Usage ([with frameworks](#usage-with-frameworks))

### Simple Keyboard

```ts
import { Keyboard } from "@gramio/keyboards";

const keyboard = new Keyboard()
    .text("first row")
    .row()
    .text("second row")
    .build(); // NOTE: In GramIO, you don't have to use the ".build" method
```

## Usage with Frameworks

### Send via [GramIO](https://gramio.dev/)

```ts
import { Bot, Keyboard } from "gramio"; // import from GramIO package!!

const bot = new Bot(process.env.TOKEN as string);

const data = ["Apple", "Realme", "Tesla", "Xiaomi"];

bot.on("message", (ctx) => {
    return ctx.send("test", {
        reply_markup: new Keyboard()
            .columns(1)
            .text("simple keyboard")
            .add(...data.map((x) => Keyboard.text(x)))
            .filter(({ button }) => button.text !== "Tesla"),
    });
});

bot.start();
```

### Send via [Grammy](https://grammy.dev/)

```ts
import { Keyboard } from "@gramio/keyboards";
import { Bot } from "grammy";

const bot = new Bot(process.env.TOKEN as string);

const data = ["Apple", "Realme", "Tesla", "Xiaomi"];

bot.on("message", (ctx) => {
    return ctx.reply("test", {
        reply_markup: new Keyboard()
            .columns(1)
            .text("simple keyboard")
            .add(...data.map((x) => Keyboard.text(x)))
            .filter(({ button }) => button.text !== "Tesla")
            .build(),
    });
});

bot.start();
```

### Send via [Telegraf](https://github.com/telegraf/telegraf)

> [!WARNING]
> The `Telegraf` does not support the latest version of Bot API

```ts
import { Keyboard } from "@gramio/keyboards";
import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.TOKEN as string);

const data = ["Apple", "Realme", "Tesla", "Xiaomi"];

bot.on("message", (ctx) => {
    return ctx.reply("test", {
        reply_markup: new Keyboard()
            .columns(1)
            .text("simple keyboard")
            .add(...data.map((x) => Keyboard.text(x)))
            .filter(({ button }) => button.text !== "Tesla")
            .build(),
    });
});

bot.launch();
```

### Send via [node-telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api)

> [!WARNING]
> The `node-telegram-bot-api` does not support the latest version of Bot API and the types are badly written, so the types may not match

```ts
import { Keyboard } from "@gramio/keyboards";
import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.TOKEN as string, { polling: true });

const data = ["Apple", "Realme", "Tesla", "Xiaomi"];

bot.on("message", (msg) => {
    return bot.sendMessage(msg.chat.id, "test", {
        reply_markup: new Keyboard()
            .columns(1)
            .text("simple keyboard")
            .add(...data.map((x) => Keyboard.text(x)))
            .filter(({ button }) => button.text !== "Tesla")
            .build(),
    });
});
```

### Send via [puregram](https://puregram.cool/)

> [!WARNING]
> The `puregram` does not support the latest version of Bot API

```ts
import { Telegram } from "puregram";
import { Keyboard } from "@gramio/keyboards";

const bot = new Telegram({
    token: process.env.TOKEN as string,
});

const data = ["Apple", "Realme", "Tesla", "Xiaomi"];

bot.on("message", (ctx) => {
    return ctx.send("test", {
        reply_markup: new Keyboard()
            .columns(1)
            .text("simple keyboard")
            .add(...data.map((x) => Keyboard.text(x)))
            .filter(({ button }) => button.text !== "Tesla")
            .build(),
    });
});

bot.updates.startPolling();
```

#### Result

```json
{
    "keyboard": [
        [
            {
                "text": "simple keyboard"
            }
        ],
        [
            {
                "text": "Apple"
            }
        ],
        [
            {
                "text": "Realme"
            }
        ],
        [
            {
                "text": "Xiaomi"
            }
        ]
    ],
    "one_time_keyboard": false,
    "is_persistent": false,
    "selective": false,
    "resize_keyboard": true
}
```

![image](https://github.com/gramiojs/keyboards/assets/57632712/e65e2b0a-40f0-43ae-9887-04360e6dbeab)
