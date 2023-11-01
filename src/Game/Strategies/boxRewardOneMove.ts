import BoxCreationRewardStrategy from "./BoxCreationReward";

export default class boxRewardOneMove implements BoxCreationRewardStrategy{
    boxCreationReward(playersMove: number, numOfBoxes: number): number {
        return numOfBoxes>0? playersMove+1 : playersMove;
    }
}   