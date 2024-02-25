# @gramio/keyboards

Framework-agnostic Telegram bot keyboard builder with many cool features!

### Installation

```bash
npm i @gramio/keyboards
```

# See more in [Documentation](https://gramio.netlify.app/keyboards/overview.html)

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

### Send via GramIO

```ts
import { Bot, Keyboard } from "gramio"; // import from GramIO package!!

const bot = new Bot(process.env.TOKEN);

const data = ["Apple", "Realme", "Tesla", "Xiaomi"];

bot.on("message", (ctx) => {
    return ctx.reply("test", {
        reply_markup: new Keyboard()
            .columns(1)
            .text("simple keyboard")
            .add(...data.map((x) => Keyboard.text(x)))
            .filter(({ button }) => button.text !== "Tesla"),
    });
});
```

### Send via [Grammy](https://grammy.dev/)

```ts
import { Keyboard } from "@gramio/keyboards";
import { Bot } from "grammy";

const bot = new Bot(process.env.TOKEN);

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
