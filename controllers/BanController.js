const moment = require("moment");

const banModel = require('../models/ban')
const userModel = require('../models/User')

const logger = require('../utils/log.utlis')
const { sendError} = require("../utils/send.utils");

let ban = {
    /**
     * Methode pour renvoyer l'user dans une promise
     * @param item -> Username / mail / ip a l'origne qui à besoin d'être tester
     * @returns {Promise<*>}
     */
    async getItem(item) {
        return await banModel.findOne({origin: item}).exec()
    },

    async unban(item) {
        console.log('unban ' + item)
        await banModel
            .findOneAndUpdate({origin: item},
                {
                    isBan: false,
                    banUntill: null,
                    tentativeCount: 0,
                    duration: 0,
                    banUntil: null
                },
                {new: true, useFindAndModify: false})
            .exec(function (err) {
                if (err) {
                    throw Error(err)
                }
            })
    },

    async banUser(item) {
        let user = item ? await banModel.findOne({origin: item}) : null

        if (user) {
            return new Promise((resolve, reject) => {
                banModel
                    .findOneAndUpdate({origin: item},
                        {
                            isBan: true,
                            // Ici on ban via une puissance pour augmenter rapidement le temps de ban
                            banUntil: moment(new Date()).add((Math.exp(user.banCount)), 'minutes'),
                            duration: Math.round(Math.exp(user.banCount) * 60),
                            $inc: {banCount: 1},
                            tentativeCount: 0
                        },
                        {useFindAndModify: false})
                    .exec()
                    .catch((e) => {
                        reject(e)
                    })
            })
        }
    },

    async incTentativeCount(req, res, item) {
        console.log('Inc ' + item)
        let user = await banModel.findOne({origin: item})

        if (user) {
            if (checkIp(item)) {
                if (user.tentativeCount + 1 < 10) {
                    await banModel
                        .findOneAndUpdate({origin: item}, {$inc: {tentativeCount: 1}}, {useFindAndModify: false})
                        .exec()
                } else {
                    this.banUser(item)
                        .then((e) => {
                            console.log(e)
                            logger.info('User ' + item + ' has been ban')
                        })
                }
            } else {
                if (user.tentativeCount + 1 < 5) {
                    await banModel
                        .findOneAndUpdate({origin: item}, {$inc: {tentativeCount: 1}}, {useFindAndModify: false})
                        .exec()
                } else {
                    this.banUser(item)
                        .then((e) => {
                            console.log(e)
                            logger.info('User ' + item + ' has been ban')
                        })
                }
            }
        } else {
            const new_ban = new banModel({
                origin: item,
                tentativeCount: 1,
                banCount: 0,
                type: checkIp(item) ? 0 : 1
            })

            new_ban
                .save()
                .then(logger.info('User ' + item + ' has been added to ban list '))
                .catch((e) => {
                    console.log(e)
                })
        }
    },

    async resetTentativeCount(item) {
        console.log('Reset ' + item)
        await banModel
            .findOne({oriign: item},
                {tentativeCount: 0},
                {useFindAndModify: false})
            .exec(function (err) {
                if (err) {
                    throw new Error(err)
                }
            })
    }
}

module.exports = ban

function checkIp(ip) {
    if (ip) {
        // On check si l'ip est bien au format de l'ipv4
        if (ip.match(/(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/)) {
            return true
            // On check si l'ip est au format de l'ipv6
        } else if (ip.match(/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/)) {
            return true
        }
    }
    // Sinon c'est pas une ip
    return false
}
