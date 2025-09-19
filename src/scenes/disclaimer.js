import k from "../kaplayCtx";
//disclaimer declaration
export default function disclaimer() {
  k.add([
    k.text(
      `
        Та самая игра с обложки журнала.
        Украдено с гита для учебных целей.
        Все права защищены.
      `,
      { font: "mania", size: 32 }
    ),
  ]);

  k.add([
    k.text("Нажмите пробел/кликните/коснитесь, чтобы начать игру", {
      font: "mania",
      size: 64,
    }),
    k.anchor("center"),
    k.pos(k.center()),
  ]);

  k.onButtonPress("jump", () => k.go("main-menu"));
}
