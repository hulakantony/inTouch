/**
 * Created by kate on 22/02/17.
 */
module.exports.getRandomInt = (min, max)=> {
    return Math.floor(Math.random() * (max - min)) + min;
};