export default interface BoxCreationRewardStrategy{
    boxCreationReward(playersMove: number, numOfBoxes: number): number;
}