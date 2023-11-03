<h3>TAGS</h3>

<ul>
<li>Strategy Design Pattern for extensible Winning Strategies and Strategy for the Reward after a player owns/creates a box.</li>

</ul>


<h3>PROJECT STRUCTURE</h3>

📦src
 ┣ 📂Board
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜board.model.ts
 ┃ ┃ ┣ 📜box.model.ts
 ┃ ┃ ┣ 📜direction.model.ts
 ┃ ┃ ┣ 📜direction2d.model.ts
 ┃ ┃ ┣ 📜dot.model.ts
 ┃ ┃ ┗ 📜line.model.ts
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📜board.service.ts
 ┃ ┃ ┣ 📜box.service.ts
 ┃ ┃ ┣ 📜dot.service.ts
 ┃ ┃ ┗ 📜line.service.ts
 ┃ ┣ 📜consumer.ts
 ┃ ┗ 📜producer.ts
 ┣ 📂Game
 ┃ ┣ 📂controllers
 ┃ ┃ ┗ 📜game.controller.ts
 ┃ ┣ 📂Errors
 ┃ ┃ ┗ 📜IllegalMoveError.ts
 ┃ ┣ 📂models
 ┃ ┣ 📂services
 ┃ ┃ ┗ 📜game.service.ts
 ┃ ┣ 📂Strategies
 ┃ ┃ ┣ 📜BoxCreationReward.ts
 ┃ ┃ ┣ 📜boxRewardOneMove.ts
 ┃ ┃ ┣ 📜WinStrategy.ts
 ┃ ┃ ┗ 📜winStrategyMaxBox.ts
 ┃ ┣ 📜consumer.ts
 ┃ ┗ 📜producer.ts
 ┣ 📂Player
 ┃ ┣ 📜controller.player.ts
 ┃ ┣ 📜model.player.ts
 ┃ ┣ 📜producer.ts
 ┃ ┗ 📜service.player.ts
 ┗ 📜index.ts