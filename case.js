
process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);
const { 
    BufferJSON, 
    WA_DEFAULT_EPHEMERAL, 
    generateWAMessageFromContent, 
    proto, 
    generateWAMessageContent, 
    generateWAMessage, 
    prepareWAMessageMedia, 
    downloadContentFromMessage, 
    areJidsSameUser, 
    getContentType, 
    delay 
} = require('@adiwajshing/baileys')
const fs = require('fs')
const fetch = require('node-fetch')
const translate = require('@vitalets/google-translate-api')
const util = require('util')
const chalk = require('chalk')
const { exec, spawn, execSync } = require('child_process')
const axios = require('axios')
const cheerio = require('cheerio')
const path = require('path')
const os = require('os')
const toMS = require('ms')
const ms = require('parse-ms')
const nou = require('node-os-utils')
const gtts = require('node-gtts')
const yts = require ('yt-search')
const FormData = require('form-data')
const moment = require('moment-timezone')
const { JSDOM } = require('jsdom')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const { sizeFormatter } = require('human-readable')
const similarity = require('similarity')
const threshold = 0.72

let format = sizeFormatter({
    std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

const { addAfkUser, checkAfkUser, getAfkReason, getAfkTime, getAfkId, getAfkPosition } = require('./lib/afk')
const { addPremiumUser, getPremiumExpired, getPremiumPosition, expiredCheck, checkPremiumUser, getAllPremiumUser } = require('./lib/premium')
const { addSewaGroup, getSewaExpired, getSewaPosition, checkSewaGroup } = require('./lib/sewa')
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./lib/respon-list')
const { addRespons, checkRespons, deleteRespons } = require('./lib/respon')
const { CatBox, pomfCDN, TelegraPh, UploadFileUgu, webp2mp4File, fileIO } = require('./lib/uploader')
const { getLimit, isLimit, limitAdd, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require('./lib/limit')
const { generateProfilePicture, removeEmojis, smsg, tanggal, formatp, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, parseMention, getRandom, getGroupAdmins } = require('./lib/myfunc')
const { getTextSetWelcome } = require('./lib/setwelcome')
const { getTextSetLeft } = require('./lib/setleft')
const { isSetWelcome, addSetWelcome, changeSetWelcome, removeSetWelcome } = require('./lib/setwelcome')
const { isSetLeft, addSetLeft, removeSetLeft, changeSetLeft } = require('./lib/setleft')
const { isSetProses, addSetProses, removeSetProses, changeSetProses, getTextSetProses } = require('./lib/setproses')
const { isSetDone, addSetDone, removeSetDone, changeSetDone, getTextSetDone } = require('./lib/setdone')
const { isSetOpen, addSetOpen, removeSetOpen, changeSetOpen, getTextSetOpen } = require('./lib/setopen')
const { isSetClose, addSetClose, removeSetClose, changeSetClose, getTextSetClose } = require('./lib/setclose')
const { jadibot, stopjadibot, listjadibot } = require('./handler')
const { remini } = require('./lib/remini');
const { tools, downloader, imageAi, ai, internet } = require('./lib/scraper');

let setiker = JSON.parse(fs.readFileSync('./database/stik.json'))
let audionye = JSON.parse(fs.readFileSync('./database/vn.json'))
let imagenye = JSON.parse(fs.readFileSync('./database/image.json'))
let videonye = JSON.parse(fs.readFileSync('./database/video.json'))
let contacts = JSON.parse(fs.readFileSync('./contacts.json'))

let set_welcome_db = JSON.parse(fs.readFileSync('./database/set_welcome.json'))
let set_left_db = JSON.parse(fs.readFileSync('./database/set_left.json'))
let set_proses = JSON.parse(fs.readFileSync('./database/set_proses.json'))
let set_done = JSON.parse(fs.readFileSync('./database/set_done.json'))
let set_open = JSON.parse(fs.readFileSync('./database/set_open.json'))
let set_close = JSON.parse(fs.readFileSync('./database/set_close.json'))

let afknye = JSON.parse(fs.readFileSync('./database/afk.json'))
let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'))
let nsfw = JSON.parse(fs.readFileSync('./database/nsfw.json'))
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let mess = JSON.parse(fs.readFileSync('./mess.json'))
let premium = JSON.parse(fs.readFileSync('./database/premium.json'))
let sewa = JSON.parse(fs.readFileSync('./database/sewa.json'))
let balance = JSON.parse(fs.readFileSync('./database/balance.json'))
let limit = JSON.parse(fs.readFileSync('./database/limit.json'))
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'))
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))
let antiwame = JSON.parse(fs.readFileSync('./database/antiwame.json'))
let listCmd = JSON.parse(fs.readFileSync('./database/listcmd.json'))
let _cmd = JSON.parse(fs.readFileSync('./database/command.json'))
let _cmdUser = JSON.parse(fs.readFileSync('./database/commandUser.json'))
let openaipc = JSON.parse(fs.readFileSync('./database/openaipc.json'))
let openaigc = JSON.parse(fs.readFileSync('./database/openaigc.json'))
let _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
let _buruan = JSON.parse(fs.readFileSync('./database/user/hasil_buruan.json'))
let _darahOrg = JSON.parse(fs.readFileSync('./database/user/darah.json'))
const _petualang = JSON.parse(fs.readFileSync('./database/user/inventory.json'))
const { cekInventoryAdaAtauGak } = require('./database/user/alat_tukar')
const { addInventoriDarah, cekDuluJoinAdaApaKagaDiJson, addDarah, kurangDarah, getDarah } = require('./database/user/darah')
const { addInventoriMonay, cekDuluJoinAdaApaKagaMonaynyaDiJson, addMonay, kurangMonay, getMonay } = require('./database/user/monay')
const { addInventoriLimit, cekDuluJoinAdaApaKagaLimitnyaDiJson, addLimit, kurangLimit } = require('./database/user/limit')
const { cekDuluHasilBuruanNya, addInventoriBuruan, addAyam, addKelinci, addDomba, addSapi, addGajah, kurangIkan, kurangAyam, kurangKelinci, kurangDomba, kurangSapi,kurangGajah, getIkan, getAyam, getKelinci, getDomba,getSapi,getGajah} = require('./database/user/buruan')
const { getLevelingXp, getLevelingLevel, getLevelingId, addLevelingXp, addLevelingLevel, addLevelingId, addATM, addKoinUser, checkATMuser, addIkan, getMancingIkan, getMancingId, addMancingId, jualIkan, addPlanet, getBertualangPlanet, getPlaneId, addPlaneId, jualbahankimia, addCoal, getMiningcoal, getMiningId, addMiningId, jualcoal, addStone, getMiningstone, getBatuId, addBatuId, jualstone, addOre, getMiningore, getOreId, addOreId, jualore, addIngot, getMiningingot, getIngotId, addIngotId, jualingot, addKayu, getNebangKayu, getNebangId, addNebangId, jualKayu, checkPetualangUser, addInventori, sellBesi, addDm, sellDm, getDm, sellEmas, addFish, sellFish, getFish, addBesi, addEmas, addEmerald, addUmpan, addPotion, kurangBesi, kurangEmas, kurangEmerald, kurangUmpan, kurangPotion, getBesi, getEmas, getEmerald, getUmpan, getPotion } = require('./database/user/rpg')

let DarahAwal = 100;
const ikan = ['🐟','🐠','🐡']
const enter = '\n'

setInterval(function() { 
    let jamna = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Jakarta' })
    let hasilnes = jamna.split(':')[0] < 10 ? '0' + jamna : jamna
    if (hasilnes === '12:00:00 AM') {
        limit = []
        fs.writeFileSync('./database/limit.json', JSON.stringify(limit))
        glimit = []
        fs.writeFileSync('./database/glimit.json', JSON.stringify(glimit))
        console.log('Limit Sudah Di Reset!')
    }
}, 1000)

async function checkBandwidth() {
    let ind = 0;
    let out = 0;
    for (let i of await require('node-os-utils').netstat.stats()) {
        ind += parseInt(i.inputBytes)
        out += parseInt(i.outputBytes)
    }
    return {
        download: format(ind),
        upload: format(out),
    }
}

moment.tz.setDefault('Asia/Jakarta').locale('id')
module.exports = haruka = async (haruka, m, chatUpdate, mek, store, setting, isSetWelcome, getTextSetWelcome, set_welcome_db, set_left_db, isSetLeft, getTextSetLeft, _welcome, _left, antidelete, antionce) => {
try {
    const { 
        ownerNumber, 
        ownerName, 
        instagram, 
        gcwa, 
        botName, 
        footer, 
        sessionName, 
        fotoDonasi, 
        pathimg, 
        BotKey, 
        XznKey, 
        audioMenu, 
        auto_ai_japri, 
        auto_ai_grup, 
        auto_welcomeMsg, 
        auto_leaveMsg, 
        antiViewOnce, 
        grupOnly, 
        japriOnly, 
        antiDelete, 
        autobio, 
        anticall, 
        autorespond, 
        autoblok212, 
        autoread, 
        gamewaktu, 
        limitCount
    } = setting
    const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""
    const budy = (typeof m.text == 'string' ? m.text : '')
    const content = JSON.stringify(mek.message)
    const type = Object.keys(mek.message)[0];
    if (m && type == "protocolMessage") haruka.ev.emit("message.delete", m.message.protocolMessage.key);
    const botNumber = await haruka.decodeJid(haruka.user.id)
    const isCreator = [botNumber, ...ownerNumber].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '.'
    const isCmd = body.startsWith(prefix)
    const isCommand = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ""
    const command = isCreator ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : isCommand
    const args = body.trim().split(/ +/).slice(1)
    const pushname = m.pushName || 'No Name'
    const itsMe = m.sender == botNumber ? true : false
    const text = q = args.join(' ')
    const quoted = m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || ''
    const isMedia = /image|video|sticker|audio/.test(mime)
    const { allMenu, donate } = require('./menu') 
    let footxt = `${footer}`

    const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')
    const jam = moment().format('HH:mm:ss z')
    let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
    let fildt = dt == 'pagi' ? dt + '🌝' : dt == 'siang' ? dt + '🌞' : dt == 'sore' ? dt + '🌝' : dt + '🌚'
    const ucapanWaktu = fildt.charAt(0).toUpperCase() + fildt.slice(1)

    const groupMetadata = m.isGroup ? await haruka.groupMetadata(m.chat).catch(e => {}) : ''
    const groupName = m.isGroup ? groupMetadata.subject : ''
    const groupMembers = m.isGroup ? groupMetadata.participants : ''
    const participants = m.isGroup ? await groupMetadata.participants : ''
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const isUser = pendaftar.includes(m.sender)
    const isAdventure = checkPetualangUser(m.sender)
    const isPremium = isCreator ? true : checkPremiumUser(m.sender, premium)
    const isSewa = checkSewaGroup(m.chat, sewa)

    const isAntiLink = antilink.includes(m.chat) ? true : false
    const isAntidelete = antidelete.includes(m.chat) ? true : false
    const isAntionce = antionce.includes(m.chat) ? true : false
    const isAutoAiGc = openaigc.includes(m.chat) ? true : false
    const isAutoAiPc = openaipc.includes(botNumber) ? true : false
    const isWelcome = _welcome.includes(m.chat) ? true : false
    const isLeft = _left.includes(m.chat) ? true : false
    const isAfkOn = checkAfkUser(m.sender, afknye)
    const isNsfw = nsfw.includes(m.chat) ? true : false
    const isAntiWame = antiwame.includes(m.chat) ? true : false

    const gcounti = setting.gcount
    const gcount = isPremium ? gcounti.prem : gcounti.user
    const fkontak = { 
        key: {
            participant: `0@s.whatsapp.net`, 
            ...(m.chat ? { 
                remoteJid: `6285600793871-1614953337@g.us` 
            } : {}) 
        }, message: { 
            'contactMessage': { 
                'displayName': `${pushname}`, 
                'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 
                'jpegThumbnail': pathimg, 
                thumbnail: pathimg, 
                sendEphemeral: true
            }
        }
    }
    const fkontaku = { 
        key: { 
            participant: `0@s.whatsapp.net`, 
            ...(m.chat ? { 
                remoteJid: `status@broadcast` 
            } : {}) 
        }, message: { 
            'contactMessage': { 
                'displayName': `${pushname}`, 
                'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 
                'jpegThumbnail': pathimg, 
                thumbnail: pathimg, 
                sendEphemeral: true
            }
        }
    }
    const fbot = { 
        key: { 
            participant: `0@s.whatsapp.net`, 
            ...(m.chat ? { 
                remoteJid: `status@broadcast` 
            } : {}) 
        }, message: { 
            'contactMessage': { 
                'displayName': botName, 
                'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 
                'jpegThumbnail': pathimg, 
                thumbnail: pathimg, 
                sendEphemeral: true
            }
        }
    }
    const { download, upload } = await checkBandwidth()
    let timestamp = speed()
    let latensi = speed() - timestamp

    const isDarah = await cekDuluJoinAdaApaKagaDiJson(m.senpder)
    const isCekDarah = await getDarah(m.sender)
    const isUmpan = await getUmpan(m.sender)
    const isPotion = await getPotion(m.sender)
    const isIkan = await getIkan(m.sender)
    const isAyam = await getAyam(m.sender)
    const isKelinci = await getKelinci(m.sender)
    const isDomba = await getDomba(m.sender)
    const isSapi = await getSapi(m.sender)
    const isGajah = await getGajah(m.sender)
    const isMonay = await getMonay(m.sender)
    const isBesi = await getBesi(m.sender)
    const isEmas = await getEmas(m.sender)
    const isEmerald = await getEmerald(m.sender)
    const isInventory = await cekInventoryAdaAtauGak(m.sender)
    const isInventoriBuruan = await cekDuluHasilBuruanNya(m.sender)
    const isInventoryLimit = await cekDuluJoinAdaApaKagaLimitnyaDiJson(m.sender)
    const isInventoryMonay = await cekDuluJoinAdaApaKagaMonaynyaDiJson(m.sender)

    const nebal = (angka) => {
        return Math.floor(angka)
    }

    if (!isAdventure) {
        reqXp = 5000 * (Math.pow(2, getLevelingLevel(m.sender)) - 1)
        await _petualang.push(m.sender)
        await addInventoriDarah(m.sender, DarahAwal)
        await addInventori(m.sender)
        await addInventoriBuruan(m.sender)
        await fs.writeFileSync('./database/user/inventory.json', JSON.stringify(_petualang))
        await addLevelingId(m.sender)
    }

    function hitungmundur(tanggal, bulan, tahun){
        let from = new Date(`${bulan} ${tanggal}, ${tahun} 00:00:00`).getTime()
        let now = Date.now()
        let distance = from - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24))
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        return `${days} days, ${hours} hours, ${minutes} minute`
    }

    const isEmoji = (emo) => {
        let emoji_ranges = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
        let regexEmoji = new RegExp(emoji_ranges, 'gi')
        return emo.match(regexEmoji)
    }

    async function pickRandom(list) {
        return list[Math.floor(Math.random() * list.length)]
    }

    async function getGcName(groupID) {
        try {
            let data_name = await haruka.groupMetadata(groupID)
            return data_name.subject
        } catch (err) {
            return 'N/A'
        }
    }

    function randomNomor(min, max = null) {
        if (max !== null) {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min + 1)) + min;
        } else {
            return Math.floor(Math.random() * min) + 1
        }
    }

    try {
        let chats = db.data.chats[m.chat]
        if (typeof chats !== 'object') db.data.chats[m.chat] = {}
        if (chats) {
            if (!('goodbye' in chats)) chats.goodbye = setting.auto_leaveMsg
            if (!('welcome' in chats)) chats.welcome = setting.auto_welcomeMsg
        } else db.data.chats[m.chat] = {
            goodbye: setting.auto_leaveMsg, 
            welcome: setting.auto_welcomeMsg, 
        }
    } catch (e) {
        console.log(e)
    }

    const banUser = await haruka.fetchBlocklist()

    if (!haruka.public) {
        if (!m.key.fromMe && !isCreator) return
    }


    if (m.isGroup) {
        const Fisha = await getMancingIkan(m.sender)
        const FishId = await getMancingId(m.sender)
        if (Fisha === undefined && FishId === undefined) await addMancingId(m.sender)
    }

    if (m.isGroup) {
        const Hapea = await getBertualangPlanet(m.sender)
        const HapeId = await getPlaneId(m.sender)
        if (Hapea === undefined && HapeId === undefined) await addPlaneId(m.sender)
    }

    if (m.isGroup) {
        const Coala = await getMiningcoal(m.sender)
        const CoalId = await getMiningId(m.sender)
        if (Coala === undefined && CoalId === undefined) await addMiningId(m.sender)
    }

    if (m.isGroup) {
        const Stonea = await getMiningstone(m.sender)
        const StoneId = await getBatuId(m.sender)
        if (Stonea === undefined && StoneId === undefined) await addBatuId(m.sender)
    }

    if (m.isGroup) {
        const Orea = await getMiningore(m.sender)
        const OreId = await getOreId(m.sender)
        if (Orea === undefined && OreId === undefined) await addOreId(m.sender)
    }

    if (m.isGroup) {
        const Ingota = await getMiningingot(m.sender)
        const IngotId = await getIngotId(m.sender)
        if (Ingota === undefined && IngotId === undefined) await addIngotId(m.sender)
    }

    if (m.isGroup) {
        const Kayua = await getNebangKayu(m.sender)
        const KayuId = await getNebangId(m.sender)
        if (Kayua === undefined && KayuId === undefined) await addNebangId(m.sender)
    }

    if (m.isGroup ) {
        const checkATM = await checkATMuser(m.sender)
        try {
            if (checkATM === undefined) await addATM(m.sender)
            const uangsaku = Math.floor(Math.random() * 10) + 90
            addKoinUser(m.sender, uangsaku)
        } catch (err) {
            console.error(err)
        }
    }

    const levelRole = await getLevelingLevel(m.sender)
    let role = 'Bronze 1'
    if (levelRole <= 2) {
        role = 'Bronze 1'
    } else if (levelRole <= 10) {
        role = 'Bronze 2'
    } else if (levelRole <= 20) {
        role = 'Bronze 3'
    } else if (levelRole <= 30) {
        role = 'Bronze 4'
    } else if (levelRole <= 40) {
        role = 'Bronze 5'
    } else if (levelRole <= 70) {
        role = 'Silver 1'
    } else if (levelRole <= 85) {
        role = 'Silver 2'
    } else if (levelRole <= 95) {
        role = 'Silver 3'
    } else if (levelRole <= 105) {
        role = 'Silver 4'
    } else if (levelRole <= 125) {
        role = 'Silver 5'
    } else if (levelRole <= 150) {
        role = 'Gold 1'
    } else if (levelRole <= 170) {
        role = 'Gold 2'
    } else if (levelRole <= 190) {
        role = 'Gold 3'
    } else if (levelRole <= 210) {
        role = 'Gold 4'
    } else if (levelRole <= 230) {
        role = 'Gold 5'
    } else if (levelRole <= 260) {
        role = 'Platinum 1'
    } else if (levelRole <= 290) {
        role = 'Platinum 2'
    } else if (levelRole <= 320) {
        role = 'Platinum 3'
    } else if (levelRole <= 350) {
        role = 'Platinum 4'
    } else if (levelRole <= 380) {
        role = 'Platinum 5'
    } else if (levelRole <= 410) {
        role = 'Diamond 1'
    } else if (levelRole <= 450) {
        role = 'Diamond 2'
    } else if (levelRole <= 500) {
        role = 'Diamond 3'
    } else if (levelRole <= 550) {
        role = 'Diamond 4'
    } else if (levelRole <= 600) {
        role = 'Diamond 5'
    } else if (levelRole <= 700) {
        role = 'Master'
    } else if (levelRole <= 800) {
        role = 'Master ✩'
    } else if (levelRole <= 900) {
        role = 'Master ✩✩'
    } else if (levelRole <= 1000) {
        role = 'Master ✩✩✩'
    } else if (levelRole <= 1100) {
        role = 'Master ✯'
    } else if (levelRole <= 1225) {
        role = 'Master ✯✯'
    } else if (levelRole <= 1340) {
        role = 'Master ✯✯✯'
    } else if (levelRole <= 1400) {
        role = 'GrandMaster'
    } else if (levelRole <= 1555) {
        role = 'GrandMaster ✩'
    } else if (levelRole <= 1660) {
        role = 'GrandMaster ✩✩'
    } else if (levelRole <= 1710) {
        role = 'GrandMaster ✩✩✩'
    } else if (levelRole <= 1825) {
        role = 'GrandMaster ✯'
    } else if (levelRole <= 1950) {
        role = 'GrandMaster ✯✯'
    } else if (levelRole <= 2000) {
        role = 'GrandMaster ✯✯✯'
    } else if (levelRole <= 2220) {
        role = 'Legends'
    } else if (levelRole <= 2500) {
        role = 'Legends 2'
    } else if (levelRole <= 2700) {
        role = 'Legends 3'
    } else if (levelRole <= 2900) {
        role = 'Legends 4'
    } else if (levelRole <= 3100) {
        role = 'Legends 5'
    } else if (levelRole <= 3300) {
        role = 'Legends 6'
    } else if (levelRole <= 3600) {
        role = 'Legends 7'
    } else if (levelRole <= 3900) {
        role = 'Legends 8'
    } else if (levelRole <= 4200) {
        role = 'Legends 9'
    } else if (levelRole <= 4450) {
        role = 'Legends 10'
    } else if (levelRole <= 4700) {
        role = 'Legends 忍'
    } else if (levelRole <= 4900) {
        role = 'Legends 忍¹'
    } else if (levelRole <= 5100) {
        role = 'Legends 忍²'
    } else if (levelRole <= 5600) {
        role = 'Legends 忍³'
    } else if (levelRole <= 6100) {
        role = 'Legends 忍⁴'
    } else if (levelRole <= 7000) {
        role = 'GrandLegends'
    } else if (levelRole <= 10000) {
        role = 'GrandLegends 1'
    } else if (levelRole <= 20000) {
        role = 'GrandLegends 2'
    } else if (levelRole <= 30000) {
        role = 'GrandLegends 3'
    } else if (levelRole <= 40000) {
        role = 'GrandLegends 4'
    } else if (levelRole <= 50000) {
        role = 'GrandLegends 忍¹'
    } else if (levelRole <= 60000) {
        role = 'GrandLegends 忍²'
    } else if (levelRole <= 70000) {
        role = 'GrandLegends 忍³'
    } else if (levelRole <= 80000) {
        role = 'GrandLegends 忍⁴'
    } else if (levelRole <= 90000) {
        role = 'Pro 숒'
    } else if (levelRole <= 100000) {
        role = 'Pro × GrandLegends 숒'
    }

    if (m.message && !m.key.fromMe) {
        console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m Haruka-Md \x1b[1;37m]', time, chalk.green(budy.slice(0, 100) || m.mtype), 'from', chalk.green(pushname), 'in', chalk.green(groupName ? groupName : 'Private Chat' ), 'args :', chalk.green(text.length))
    }

    if (setting.autobio){
        if (setting.autobio === false) return
        let settingstatus = 0;
        if (new Date() * 1 - settingstatus > 1000) {
            await haruka.setStatus(`I'm ${haruka.user.name} 🤖 | ${runtime(process.uptime())} ⏰ | Status : ${haruka.mode ? 'Public Mode' : 'Self Mode'} | ${pendaftar.length} Users`)
            settingstatus = new Date() * 1
        }
    }

    if (!isCreator && setting.grupOnly && !m.isGroup){
        return
    }

    if (!isCreator && setting.japriOnly && m.isGroup){
        return
    }

    const buddy = (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""
    for (let zeeone of setiker){
        if (!buddy && budy === zeeone){
            result = fs.readFileSync(`./database/${zeeone}.webp`)
            await await haruka.sendImageAsSticker(m.chat, result, m, { packname: `Created By ${setting.botName}\n${tanggal(new Date())}` , author: `Owner ${setting.ownerName}\nTime ${time}` })
        }
    }

    for (let zeeonee of audionye){
        if (!buddy && budy === zeeonee){
            result = fs.readFileSync(`./database/${zeeonee}.mp3`)
            haruka.sendAudio(m.chat, result, m, true)
        }
    }

    for (let zeeoneee of imagenye){
        if (!buddy && budy === zeeoneee){
            result = fs.readFileSync(`./database/${zeeoneee}.jpg`)
            haruka.sendImage(m.chat, result, '', m)
        }
    }

    for (let zeeonew of videonye){
        if (!buddy && budy === zeeonew){
            result = fs.readFileSync(`./database/${zeeonew}.mp4`)
            haruka.sendVideo(m.chat, result, false, "",m)
        }
    }

    async function addCountCmdUser(nama, sender, u) {
        let posi = null
        let pos = null
        Object.keys(u).forEach((i) => {
            if (u[i].jid === sender) {
                posi = i
            }
        })
        if (posi === null) {
            u.push({jid: m.sender, db: [{nama: nama, count: 0}]})
            fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2))
            Object.keys(u).forEach((i) => {
                if (u[i].jid === m.sender) {
                    posi = i
                }
            })
        }
        if (posi !== null) {
            Object.keys(u[posi].db).forEach((i) => {
                if (u[posi].db[i].nama === nama) {
                    pos = i
                }
            })
            if (pos === null) {
                u[posi].db.push({nama: nama, count: 1})
                fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2))
            } else {
                u[posi].db[pos].count += 1
                fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2))
            }
        }
    }

    async function getPosiCmdUser(sender, _db) {
        let posi = null
        Object.keys(_db).forEach((i) => {
            if (_db[i].jid === sender) {
                posi = i
            }
        })
        return posi
    }

    async function addCountCmd(nama, sender, _db) {
        addCountCmdUser(nama, m.sender, _cmdUser)
        let posi = null
        Object.keys(_db).forEach((i) => {
            if (_db[i].nama === nama) {
                posi = i
            }
        })
        if (posi === null) {
            _db.push({nama: nama, count: 1})
            fs.writeFileSync('./database/command.json',JSON.stringify(_db, null, 2))
        } else {
            _db[posi].count += 1
            fs.writeFileSync('./database/command.json',JSON.stringify(_db, null, 2))
        }
    }

    if (m.isGroup && isAlreadyResponList(m.chat, body.toLowerCase(), db_respon_list)) {
        let get_data_respon = getDataResponList(m.chat, body.toLowerCase(), db_respon_list)
        if (get_data_respon.isImage === false) {
            haruka.sendMessage(m.chat, { text: sendResponList(m.chat, body.toLowerCase(), db_respon_list) }, {
                quoted: m
            })
        } else {
            haruka.sendMessage(m.chat, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
                quoted: m
            })
        }
    }

    if (!m.key.fromMe && setting.autoread){
        const readkey = {
            remoteJid: m.chat,
            id: m.key.id, 
            participant: m.isGroup ? m.key.participant : undefined 
        }
        await haruka.readMessages([readkey])
    }

    haruka.sendPresenceUpdate('available', m.chat)

    if (isCmd && !isUser) {
        pendaftar.push(m.sender)
        fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
    }

    if (m.sender.startsWith('212') && setting.autoblok212 === true) {
        return haruka.updateBlockStatus(m.sender, 'block')
    }

    if (!m.isGroup && !m.key.fromMe && setting.autorespond && !isCmd) {
        simi = await fetchJson(`https://api.simsimi.net/v2/?lc=id&cf=false&text=${command}`)
        newReply(simi.success) 
    }

    if (!m.isGroup && !m.key.fromMe && (isAutoAiPc || setting.auto_ai_japri) && !isCmd) {
        try {
            let messages = [{ role: 'system', content: `ubah gaya bicara mu agar lebih karateristik dan lebih terbuka dan namamu adalah notfound Bot yang diciptakan oleh 404 tugasmu membantu user notfound Bot untuk mendownload lagu video foto membuat stiker dan lainnya ekspresi kan sifat mu dengan emoji dan bicara yang lebih tidak Formal dan panggilanmu adalah gw dan lu layaknya seorang manusia.` }, { role: 'user', content: text }]
            let ini = (await axios.post(`https://skizo.asia/api/openai?apikey=${setting.XznKey}`, { messages })).data
            let hasil = `${ini.result}`
            newReply(hasil)
        } catch (err) {
            console.log(err)
        }
    }

    if (m.isGroup && !m.key.fromMe && (isAutoAiGc || setting.auto_ai_grup) && !isCmd) {
        try {
            let messages = [{ role: 'system', content: `ubah gaya bicara mu agar lebih karateristik dan lebih terbuka dan namamu adalah Haruka Bot yang diciptakan oleh haruka Selebew tugasmu membantu user haruka Bot untuk mendownload lagu video foto membuat stiker dan lainnya ekspresi kan sifat mu dengan emoji dan bicara yang lebih tidak Formal dan panggilanmu adalah gw dan lu layaknya seorang manusia.` }, { role: 'user', content: text }]
            let ini = (await axios.post(`https://skizo.asia/api/openai?apikey=${setting.XznKey}`, { messages })).data
            let hasil = `${ini.result}`
            newReply(hasil)
        } catch (err) {
            console.log(err)
            newReply('Upss error silahkan hubungi owner agar di fix')
        }
    }

    if (isAntiLink) {
        if (budy.match(`chat.whatsapp.com`)) {
            if (!isBotAdmins) return
            let gclink = (`https://chat.whatsapp.com/` + await haruka.groupInviteCode(m.chat))
            await haruka.sendMessage(m.chat, { delete: m.key })
            let isLinkThisGc = new RegExp(gclink, 'i')
            let isgclink = isLinkThisGc.test(m.text)
            if (isgclink) return
            if (isAdmins) return
            if (isCreator) return
            await haruka.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            })
            haruka.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        }
    }

    if (isAntiWame) {
        if (budy.match(`wa.me`)) {
            if (!isBotAdmins) return
            await haruka.sendMessage(m.chat, { delete: m.key })
            if (isAdmins) return
            if (isCreator) return
            await haruka.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            })
            haruka.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        }
    }

    if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in db.data.sticker)) {
        let hash = db.data.sticker[m.msg.fileSha256.toString('base64')]
        let { text, mentionedJid } = hash
        let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
            userJid: haruka.user.id,
            quoted: m.quoted && m.quoted.fakeObj
        })
        messages.key.fromMe = areJidsSameUser(m.sender, haruka.user.id)
        messages.key.id = m.key.id
        messages.pushName = m.pushName
        if (m.isGroup) messages.participant = m.sender
        let msg = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'
        }
        haruka.ev.emit('messages.upsert', msg)
    }

    async function newReply(teks) {
        const nedd = {      
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: setting.saluranName,
                    newsletterJid: setting.saluran,
                },
                externalAdReply: {  
                    showAdAttribution: true,
                    title: ucapanWaktu,
                    body: pushname,
                    thumbnailUrl: pathimg,
                    sourceUrl: instagram
                },
            },
            text: teks,
        }
        return haruka.sendMessage(m.chat, nedd, {
            quoted: m,
        })
    }

    if (m.isGroup && !m.key.fromMe) {
        let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
        for (let ment of mentionUser) {
            if (checkAfkUser(ment, afknye)) {
                let getId2 = getAfkId(ment, afknye)
                let getReason2 = getAfkReason(getId2, afknye)
                let getTimee = Date.now() - getAfkTime(getId2, afknye)
                let heheh2 = ms(getTimee)
                newReply(`Jangan tag, dia sedang afk\n\n*Reason :* ${getReason2}\n*Sejak :* ${heheh2.hours} jam, ${heheh2.minutes} menit, ${heheh2.seconds} detik yg lalu\n`)
            }
        }

        if (checkAfkUser(m.sender, afknye)) {
            let getId = getAfkId(m.sender, afknye)
            let getReason = getAfkReason(getId, afknye)
            let getTime = Date.now() - getAfkTime(getId, afknye)
            let heheh = ms(getTime)
            afknye.splice(getAfkPosition(m.sender, afknye), 1)
            fs.writeFileSync('./database/afk.json', JSON.stringify(afknye))
            haruka.sendTextWithMentions(m.chat, `@${m.sender.split('@')[0]} telah kembali dari afk\n\n*Reason :* ${getReason}\n*Selama :* ${heheh.hours} jam ${heheh.minutes} menit ${heheh.seconds} detik\n`, m)
        }
    }

    haruka.autoanimegc = haruka.autoanimegc ? haruka.autoanimegc : {}
    let jadwalAnime = {
        subuh: '00:00',
        pagi: '08:00',
        siang: '12:00',
        sore: '16:00',
        magrib: '18:00',
        malam: '20:00',
        tengah_malam: '23:00',
    }
    const date = new Date((new Date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    let check = await internet.otakudesu.ongoing()
    let response = `「 *JADWAL ANIME* 」\n\n`
    for (let i of check) {
        response += `*💬 Judul :* ${i.title}\n`
        response += `*📺 Eps :* ${i.episode}\n`
        response += `*🔗 URL :* ${i.link}\n\n`
    }
    for (let [anime, waktu] of Object.entries(jadwalAnime)) {
        if (timeNow === waktu) {
            haruka.autoanimegc["6285655548594@s.whatsapp.net"] = [
                haruka.sendMessage(m.chat, {
                    text: response,
                    contextInfo: {
                        isForwarded: true,
                        forwardingScore: 1,
                        externalAdReply: {
                            showAdAttribution: true,
                            title: 'Ini pemberitahuan Anime terbaru!',
                            mediaType: 1,
                            previewType: 1,
                            body: 'Made with ❤️ by Khalid.',
                            thumbnailUrl: pathimg,
                            renderLargerThumbnail: false,
                            mediaUrl: 'https://otakudesu.cloud',
                            sourceUrl: 'https://otakudesu.cloud'
                        }
                    }
                })
            ]
        }
    }

    haruka.autoAnime = haruka.autoAnime ? haruka.autoAnime : {}
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? haruka.user.jid : m.sender
    //let id = m.chat
    let id = '6285655548594@s.whatsapp.net';
    if (!(id in haruka.autoAnime)) {
        let jadwalAnime = {
            pagi: "06:00",
            siang: "12:00",
            sore: "18:15",
            malam: "19:00",
            tengah_malam: "23:00",
        }
        const date = new Date((new Date).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta"
        }));
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

        let check = await internet.otakudesu.ongoing();
        let response = `「 *JADWAL ANIME* 」\n\n`
        for (let i of check) {
            response += `*💬 Judul :* ${i.title}\n`
            response += `*📺 Eps :* ${i.episode}\n`
            response += `*🔗 URL :* ${i.link}\n\n`
        }        

        for (const [anime, waktu] of Object.entries(jadwalAnime)) {
            if (timeNow === waktu) {
                haruka.autoAnime[id] = [
                    haruka.sendMessage(id, {
                        text: response,
                        contextInfo: {
                            isForwarded: true,
                            forwardingScore: 1,
                            externalAdReply: {
                                showAdAttribution: true,
                                title: 'Halo Kak 👋',
                                mediaType: 1,
                                previewType: 1,
                                body: 'Ini pemberitahuan Anime terbaru!',
                                thumbnailUrl: pathimg,
                                renderLargerThumbnail: false,
                                mediaUrl: 'https://otakudesu.cloud',
                                sourceUrl: 'https://otakudesu.cloud'
                            }
                        }
                    }),
                    setTimeout(() => {
                        delete haruka.autoAnime[id]
                    }, 60000)
                ]
            }
        }
    }

    switch(command) {
    case 'allmenu':
    case 'menu':{
        let mundur = hitungmundur(1, 1, 2025)
        const repf = await haruka.sendMessage(m.chat, {image: {url: pathimg}, caption: allMenu(role, ucapanWaktu, pushname, mundur, upload, download, ownerName, botName, jam, tanggal, runtime, isCreator, isPremium, m.sender, limitCount, limit, gcount, glimit, balance, prefix)}, {quoted: m})
        haruka.sendMessage(m.chat, { audio: fs.readFileSync(setting.audioMenu), mimetype: 'audio/mpeg', ptt: true, viewOnce: true }, {quoted: repf})
    }
    break

    case 'infobot': 
    case 'info': 
    case 'botinfo':{
        let capt = `
*Name:* ${haruka.user.name}
*Number:* ${botNumber.split('@')[0]}
*Owner:* ${prefix}owner
*User:* ${pendaftar.length}
`.trim();
        await haruka.sendMessage(m.chat, {
            text: capt,
            contextInfo: {
                externalAdReply: {
                    title: botName,
                    body: ownerName,
                    thumbnailUrl: pathimg,
                    sourceUrl: gcwa,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { 
            quoted: m 
        })
    }
    break

    case 'runtime': 
    case 'r':{
        newReply(`*🚀 Online :* ${runtime(process.uptime())}`)
    }
    break

    case 'donate': 
    case 'donasi':
        let cp = `Hai Kak, Ingin Donasi?, Silahkan Donasi Ke Payment Yang Ada Di Bawah, Dengan Kamu Berdonasi Berarti Kamu Berkontribusi Dalam Perkembangan Bot Ini..\n❏──「 *Payment* 」\n│ • *Trakteer:* N/A\n│ • *Saweria:* N/A\n❏──────────────๑\n\nTerima Kasih Yang Sudah Donasi, Berapapun Donasi Kamu Akan Sangat Saya Hargain >,<`
        await haruka.sendMessage(m.chat, { image: fs.readFileSync(setting.fotoDonasi), caption: cp}, {quoted:m})
    break;

    case 'dashboard':
        let posi = await getPosiCmdUser(m.sender, _cmdUser)
        _cmdUser[posi].db.sort((a, b) => (a.count < b.count) ? 1 : -1)
        _cmd.sort((a, b) => (a.count < b.count) ? 1 : -1)
        let jumlahCmd = _cmd.length
        if (jumlahCmd > 10) jumlahCmd = 10
        let jumlah = _cmdUser[posi].db.length
        if (jumlah > 5) jumlah = 5
        let totalUser = 0
        for (let x of _cmdUser[posi].db) {
            totalUser = totalUser + x.count
        }
        let total = 0
        for (let o of _cmd) {
            total = total + o.count
        }
        let teks = `*DASHBOARD*\n\n*HIT*\n• GLOBAL : ${total}\n• USER : ${totalUser}\n\n`
        teks += `*Most Command Global*\n`
        for (let u = 0; u < jumlahCmd; u ++) {
            teks += `• ${_cmd[u].nama} : ${_cmd[u].count}\n`
        }
        teks += `\n*Most Command User*\n`
        for (let i = 0; i < jumlah; i ++) {
            teks += `• ${_cmdUser[posi].db[i].nama} : ${_cmdUser[posi].db[i].count}\n`
        }
        newReply(teks)
    break

    case 'owner': {
        await haruka.sendMessage(
            m.chat, 
            {
                contacts: {
                    displayName: "Owner",
                    contacts: contacts
                }
            }, {
                quoted: m
            }
        );
    }
    break;

    case 'cekdrive': 
    case 'drive':
        let result = await nou.drive.info();
        newReply(`*Drive Server Info*\n\n *• Total :* ${result.totalGb} GB\n *• Used :* ${result.usedGb} GB (${result.usedPercentage}%)\n *• Free :* ${result.freeGb} GB (${result.freePercentage}%)`)
    break

    case 'cekbandwidth': 
    case 'bandwidth':
        newReply(`*Bandwidth Server*\n\n*>* Upload : ${upload}\n*>* Download : ${download}`)
    break

    case 'cekprem': 
    case 'cekpremium':
        if (!isPremium) return newReply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
        if (isCreator) return newReply(`Khusus user aja bkn untuk owner`)
        if (getPremiumExpired(m.sender, premium) == 'PERMANENT') return newReply(`PERMANENT`)
        let cekvip = ms(getPremiumExpired(m.sender, premium) - Date.now())
        let premiumnya = `*Expire :* ${cekvip.days} hari, ${cekvip.hours} jam, ${cekvip.minutes} menit`
        newReply(premiumnya)
    break

    case 'listpremium': 
    case 'listprem':
        let txt = `*List Premium User*\nJumlah : ${premium.length}\n\n`
        let men = [];
        for (let i of premium) {
            men.push(i.id)
            txt += `*ID :* @${i.id.split('@')[0]}\n`
            if (i.expired === 'PERMANENT') {
                let cekvip = 'PERMANENT'
                txt += `*Expire :* PERMANENT\n\n`
            } else {
                let cekvip = ms(i.expired - Date.now())
                txt += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
            }
        }
        haruka.sendTextWithMentions(m.chat, txt, m)
    break

    case 'listsewa':
        let list_sewa_list = `*LIST-SEWA-GROUP*\n\n*Total:* ${sewa.length}\n\n`
        let data_array = [];
        for (let x of sewa) {
            list_sewa_list += `*Name:* ${await getGcName(x.id)}\n*ID :* ${x.id}\n`
            if (x.expired === 'PERMANENT') {
                let ceksewa = 'PERMANENT'
                list_sewa_list += `*Expire :* PERMANENT\n\n`
            } else {
                let ceksewa = ms(x.expired - Date.now())
                list_sewa_list += `*Expire :* ${ceksewa.days} day(s) ${ceksewa.hours} hour(s) ${ceksewa.minutes} minute(s) ${ceksewa.seconds} second(s)\n\n`
            }
        }
        haruka.sendMessage(m.chat, { text: list_sewa_list }, { quoted: m })
    break

    case 'speed': 
    case 'ping':{
        const used = process.memoryUsage();
        let timestamp = speed();
        let latensi = speed() - timestamp;
        let neww = performance.now();
        let oldd = performance.now();
        let respon = `Kecepatan Respon ${latensi.toFixed(4)} _Second_ 

_Info Server_
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usage_
${Object.keys(used).map((key, _, arr) => `- ${key.padEnd(Math.max(...arr.map((v) => v.length)), '')}: ${formatp(used[key])}`).join('\n')}
`.trim();
        await haruka.sendMessage(m.chat, {
            text: respon, 
            contextInfo: {
                externalAdReply: {
                    title: botName,
                    body: ownerName,
                    thumbnailUrl: pathimg,
                    sourceUrl: gcwa,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { 
            quoted: m 
        })
    }
    break

    case 'listbahasa':{
        let clear = ['auto', 'isSupported', 'getCode']
        let teks = `List Bahasa Yang Tersedia\n\n`
        for (let i in translate.languages) {
            if (!clear.includes(i)) {
                teks += `*${i}* untuk ${translate.languages[i]}\n`
            }
        }
        newReply(teks)
    }
    break

    // Converter Menu
    case 'brat': {
        if (!text) return newReply('Input teksnya!')
        const buffer = await getBuffer(`https://api.khaliddesu.my.id/api/brat?q=${text}`)
        haruka.sendImageAsSticker(m.chat, buffer, m, { packname: `Created By ${setting.botName}\n${tanggal(new Date())}` , author: `Owner ${setting.ownerName}\nTime ${time}` })
    }
    break

    case 'qc':{
        let teks = m.quoted && m.quoted.q ? m.quoted.text : q ? q : "";
        if (!teks) return newReply('Input teksnya!')
        const text = `${teks}`;
        const sender = m.sender
        const username = await haruka.getName(m.quoted ? m.quoted.sender : sender)
        const avatar = await haruka.profilePictureUrl(m.quoted ? m.quoted.sender : sender, "image").catch(() => './media/avatar_contact.png')
        const json = {
            type: "quote",
            format: "png",
            backgroundColor: "#FFFFFF",
            width: 512,
            height: 512,
            scale: 2,
            "messages": [
                {
                    "entities": [],
                    "avatar": true,
                    "from": {
                        "id": 1,
                        "name": username,
                        "photo": {
                            "url": avatar
                        }
                    },
                    "text": text,
                    "replyMessage": {}
                }
            ],
        };
        axios.post("https://bot.lyo.su/quote/generate", json, {
            headers: {"Content-Type": "application/json"},
        })
        .then(async (res) => {
            const buffer = Buffer.from(res.data.result.image, "base64");
            let encmedia = await haruka.sendImageAsSticker(m.chat, buffer, m, { packname: `Created By ${setting.botName}\n${tanggal(new Date())}` , author: `Owner ${setting.ownerName}\nTime ${time}`, categories: ['🤩', '🎉'], id: '12345', quality: 100, background: 'transparent'})
            await fs.unlinkSync(encmedia)
        })
    }
    break

    case 's': case 'sticker': case 'stiker': {
        if (!quoted) return newReply(`Send/Reply Images/Videos/Gifs With Captions ${prefix+command}\nVideo Duration 1-9 Seconds`)
        if (/image/.test(mime)) {
            let media = await quoted.download()
            await haruka.sendImageAsSticker(m.chat, media, m, { packname: `Created By ${setting.botName}\n${tanggal(new Date())}` , author: `Owner ${setting.ownerName}\nTime ${time}` })
        } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11) return newReply('Send/Reply Images/Videos/Gifs With Captions ${prefix+command}\nVideo Duration 1-9 Seconds')
            let media = await quoted.download()
            await haruka.sendVideoAsSticker(m.chat, media, m, { packname: `Created By ${setting.botName}\n${tanggal(new Date())}` , author: `Owner ${setting.ownerName}\nTime ${time}` })
        } else {
            newReply(`Send/Reply Images/Videos/Gifs With Captions ${prefix+command}\nVideo Duration 1-9 Seconds`)
        }
    }
    break

    case 'swm': case 'steal': case 'stickerwm': case 'take':{
        if (!args.join(" ")) return newReply(`Where is the text?`)
        const swn = args.join(" ")
        const pcknm = swn.split("|")[0]
        const atnm = swn.split("|")[1]
        if (m.quoted.isAnimated === true) {
            haruka.downloadAndSaveMediaMessage(quoted, "gifee")
            haruka.sendMessage(m.chat, {sticker:fs.readFileSync("gifee.webp")}, m, { packname: pcknm, author: atnm })
        } else if (/image/.test(mime)) {
            let media = await quoted.download()
            await haruka.sendImageAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
        } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11) return newReply('Maximum 10 Seconds!')
            let media = await quoted.download()
            await haruka.sendVideoAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
        } else {
            newReply(`Photo/Video?`)
        }
    }
    break

    case 'smeme': 
    case 'stickmeme': 
    case 'stikmeme': 
    case 'stickermeme': 
    case 'stikermeme': {
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return
        if (!/webp/.test(mime) && /image/.test(mime)) {
            await newReply(mess.wait)
            atas = text.split('|')[0] ? text.split('|')[0] : '-'
            bawah = text.split('|')[1] ? text.split('|')[1] : '-'
            mee = await haruka.downloadAndSaveMediaMessage(quoted)
            mem = await fileIO(mee)
            let smeme = await getBuffer(`https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${mem}`)
            await haruka.sendImageAsSticker(m.chat, smeme, m, {packname: `Created By ${setting.botName}\n${tanggal(new Date())}` , author: `Owner ${setting.ownerName}\nTime ${time}`})
        } else {
            newReply(`Kirim/reply image dengan caption ${prefix + command} text1|text2`)
        }
    }
    limitAdd(m.sender, limit)
    break

    case 'tourl':{
        if (!mime) return newReply(`Kirim/Balas Video/Gambar Dengan Caption ${prefix + command}`)
        try {
            let media = await haruka.downloadAndSaveMediaMessage(quoted);
            if (/image|video/.test(mime)) {
                let response = await CatBox(media); // Image Uploader Server
                newReply(response);
            } else if (!/image/.test(mime)) {
                let response = await pomfCDN(media); // Image + Video Uploader Server
                newReply(response);
            } else {
                newReply(`Jenis media tidak didukung!`)
            }
            await fs.unlinkSync(media);
        } catch (err) {
            console.log(err);
        }
    }
    break

    case 'toimage': 
    case 'toimg': {
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!quoted) return newReply('Reply Image')
        if (!/webp/.test(mime)) return newReply (`Balas sticker dengan caption *${prefix + command}*`)
        let media = await haruka.downloadAndSaveMediaMessage(quoted)
        let ran = await getRandom('.png')
        exec(`ffmpeg -i ${media} ${ran}`, (err) => {
            fs.unlinkSync(media)
            if (err) throw err
            let buffer = fs.readFileSync(ran)
            haruka.sendMessage(m.chat, { image: buffer }, { quoted: m })
            fs.unlinkSync(ran)
        })
    }
    limitAdd(m.sender, limit)
    break

    case 'remini':
    case 'hdr':
    case 'hd':{
        haruka.enhancer = haruka.enhancer ? haruka.enhancer : {};
        if (sender in haruka.enhancer) return newReply(`Masih ada proses yang belum diselesaikan, mohon tunggu sampai proses selesai.`)
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime) return newReply(`Kirim/Balas Gambar Dengan Caption ${prefix + command}`)
        if (!/image\/(jpe?g|png)/.test(mime)) return newReply(`Media tidak support!`)
        haruka.enhancer[sender] = true;
        try {
            await newReply(mess.wait);
            let media = await quoted.download();
            let proses = await remini(media, "enhance");
            await newReply('Gambar berhasil ditingkatkan kualitasnya! ✅');
            haruka.sendMessage(m.chat, {image: proses, caption: mess.done}, {quoted: m})
        } catch (err) {
            console.log(err);
            newReply('Terjadi kesalahan pada server.');
        }
        delete haruka.enhancer[sender];
    }
    limitAdd(m.sender, limit)
    break

    case 'toaudio': 
    case 'tomp3':{
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!/video/.test(mime) && !/audio/.test(mime)) return newReply (`Reply Video/Vn Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)
        if (!quoted) return newReply (`Reply Video/Vn Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)
        let media = await quoted.download()
        let audio = await toAudio(media, 'mp4')
        haruka.sendMessage(m.chat, {audio, mimetype: 'audio/mpeg'}, { quoted : m })
    }
    limitAdd(m.sender, limit)
    break

    case 'ttp': 
    case 'attp':{
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) return newReply(`Example : ${prefix + command} halo`)
        if (text.length > 20) return newReply('Maksimal 20 karakter')
        let heheha = await getBuffer(`https://api.zeeoneofc.my.id/api/canvas/${command}?text=${q}&apikey=${setting.BotKey}`)
        await haruka.sendImageAsSticker(m.chat, heheha, m, { packname: `Created By ${setting.botName}\n${tanggal(new Date())}` , author: `Owner ${setting.ownerName}\nTime ${time}` })
    }
    limitAdd(m.sender, limit)
    break

    case 'emojimix': {
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        let [emoji1, emoji2] = text.split `+`
        if (!emoji1) return newReply(`Example : ${prefix + command} 😅+💩`)
        if (!emoji2) return newReply(`Example : ${prefix + command} 😅+💩`)
        let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
        for (let res of anu.results) {
            let heheha = await getBuffer(res.url)
            let encmedia = await haruka.sendImageAsSticker(m.chat, heheha, m, { packname: `Created By ${setting.botName}\n${tanggal(new Date())}` , author: `Owner ${setting.ownerName}\nTime ${time}`, categories: res.tags })
            await fs.unlinkSync(encmedia)
        }
    }
    limitAdd(m.sender, limit)
    break

    case 'ai':{
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) return newReply(`Kirim perintah:\n${prefix+command} query\n\nContoh penggunaan:\n${prefix+command} apa itu openai`)
        await newReply(mess.wait)
        try {
            const configuration = new Configuration({
                apiKey: setting.OpenAIKey,
            });
            const openai = new OpenAIApi(configuration);
            const response = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{role: 'user', content: text}],
            });
            newReply(`${response.data.choices[0].message.content}\n\n`);
        } catch (err) {
            console.log(err);
            newReply(JSON.stringify(err));
        }
    }
    limitAdd(m.sender, limit)
    break

    case 'aidraw': 
    case 'aidrawing': 
    case 'image': 
    case 'img': 
    case 'chatgptimg': 
    case 'openaiimg': 
    case 'aiimg':{
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) return newReply(`Kirim perintah:\n${prefix+command} query\n\nContoh penggunaan:\n${prefix+command} kabbah`)
        await newReply(mess.wait)
        try {
            const configuration = new Configuration({
                apiKey: setting.OpenAIKey,
            });
            const openai = new OpenAIApi(configuration);
            const response = await openai.createImage({
                prompt: text,
                n: 1,
                size: '512x512',
            });
            haruka.sendMessage(m.chat, {image:{url: response.data.data[0].url},caption: ''}, {quoted:m});
        } catch (error) {
            newReply(error.message);
        }
        limitAdd(m.sender, limit)
    }
    break

    case 'nuliskiri': {
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} text\n\nContoh : ${prefix+command} haruka`)
        await newReply(mess.wait)
        const tulisan = body.slice(11)
        haruka.sendMessage(m.chat, {image:{url:`https:\/\/api.zeeoneofc.my.id/api/canvas/${command}?text=${q}&apikey=${setting.BotKey}`}, caption: 'Nih kak'}, {quoted: m}).catch(async _ => await newReply('apikey sedang eror'))
        limitAdd(m.sender, limit)
    }
    limitAdd(m.sender, limit)
    break

    case 'nuliskanan': {
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} text\n\nContoh : ${prefix+command} haruka`)
        await newReply(mess.wait)
        const tulisan = body.slice(12)
        haruka.sendMessage(m.chat, {image:{url:`https:\/\/api.zeeoneofc.my.id/api/canvas/${command}?text=${q}&apikey=${setting.BotKey}`}, caption: 'Nih kak'}, {quoted: m}).catch(async _ => await newReply('apikey sedang eror'))
        limitAdd(m.sender, limit)
    }
    limitAdd(m.sender, limit)
    break

    case 'foliokiri': {
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} text\n\nContoh : ${prefix+command} haruka`)
        await newReply(mess.wait)
        const tulisan = body.slice(11)
        haruka.sendMessage(m.chat, {image:{url:`https:\/\/api.zeeoneofc.my.id/api/canvas/${command}?text=${q}&apikey=${setting.BotKey}`}, caption: 'Nih kak'}, {quoted: m}).catch(async _ => await newReply('apikey sedang eror'))
        limitAdd(m.sender, limit)
    }
    limitAdd(m.sender, limit)
    break

    case 'foliokanan': {
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} text\n\nContoh : ${prefix+command} haruka`)
        await newReply(mess.wait)
        const tulisan = body.slice(12)
        haruka.sendMessage(m.chat, {image:{url:`https:\/\/api.zeeoneofc.my.id/api/canvas/${command}?text=${q}&apikey=${setting.BotKey}`}, caption: 'Nih kak'}, {quoted: m}).catch(async _ => await newReply('apikey sedang eror'))
        limitAdd(m.sender, limit)
    }
    limitAdd(m.sender, limit)
    break

    case 'say':{
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} text\n\nContoh : ${prefix+command} haruka`)
        let lang = text.split('--')[1]
        if (!lang) lang = 'id'
        long = 'id'
        function tts(text, long = 'id') {
            //console.log(lang, text)
            return new Promise((resolve, reject) => {
                try {
                    let tts = gtts(long)
                    let filePath = path.join(__dirname, './lib', (1 * new Date) + '.wav')
                    tts.save(filePath, text, () => {
                        resolve(fs.readFileSync(filePath))
                        fs.unlinkSync(filePath)
                    })
                } catch (e) { reject(e) }
            })
        }

        let res
        try { res = await tts(text, long) }
        catch (e) {
            newReply(e + '')
            res = await tts(text)
        } finally {
            haruka.sendMessage(m.chat, {audio: res, mimetype: 'audio/mpeg', ptt: true}, {})
        }
    }
    limitAdd(m.sender, limit)
    break

    case 'translate': 
    case 'tr': {
        if (!text) return newReply(`Contoh :

1. Kirim perintah ${prefix + command} *kode bahasa* *teks*
• Contoh : ${prefix + command} id halo
2. Reply chat dengan caption ${prefix + command} *kode bahasa*
• Contoh : ${prefix + command} id halo
Daftar bahasa yang di dukung : https://cloud.google.com/translate/docs/languages`)
let teks = m.quoted ? quoted.text : quoted.text.split(args[0])[1]
        translate(teks, { 
            to: args[0] 
        }).then((res) => {
            haruka.sendText(m.chat, `${res.text}`, m)
        })
    }
    limitAdd(m.sender, limit)
    break

    // Anonymous Menu
    case 'confess': 
    case 'menfes': 
    case 'menfess':{
        this.menfes = this.menfes ? this.menfes : {}
        roof = Object.values(this.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender))
        if (roof) return newReply('Kamu masih berada dalam sesi menfess')
        if (m.isGroup) return newReply(mess.OnlyPM)
        if (!text) return newReply(`Kirim Perintah ${prefix + command} nama|nomor|pesan\n\nContoh :\n${prefix + command} ${pushname}|628xxx|Menfes nih\n`)
        if (!text.includes('|')) return newReply(`Kirim Perintah ${prefix + command} nama|nomor|pesan\n\nContoh :\n${prefix + command} ${pushname}|6292818802718|Menfes nih\n`)
        let [namaNya, nomorNya, pesanNya] = text.split`|`
        if (nomorNya.startsWith('0')) return newReply(`Kirim Perintah ${prefix + command} nama|nomor|pesan\n\nContoh :\n${prefix + command} ${pushname}|628xxx|Menfes nih\n`)
        if(isNaN(nomorNya)) return newReply(`Kirim Perintah ${prefix + command} nama|nomor|pesan\n\nContoh :\n${prefix + command} ${pushname}|628xxx|Menfes nih\n`)
        let yoi = `Hi ada menfess nih buat kamu\n\nDari : ${namaNya}\nPesan : ${pesanNya}\n\nSilahkan ketik ${prefix}balasmenfess -- Untuk menerima menfess/confess\nSilahkan ketik ${prefix}tolakmenfess -- Untuk menolak menfess/confess\n\n_Pesan ini di tulis oleh seseorang pengguna bot, bot hanya menyampaikan saja_`
        let tod = await getBuffer('https://telegra.ph/file/c8fdfc8426f5f60b48cca.jpg') 
        let id = m.sender
        this.menfes[id] = {
            id,
            a: m.sender,
            b: nomorNya + '@s.whatsapp.net',
            state: 'WAITING'
        }
        await haruka.sendMessage(nomorNya + '@s.whatsapp.net', {image: tod, caption:yoi }, {})
        newReply('Pesan berhasil dikirim ke nomor tujuan. Moga aja dibales coy')
    }
    break

    case 'balasmenfess': 
    case 'balasmenfes': {
        roof = Object.values(this.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender))
        if (!roof) return newReply('Belum ada sesi menfess')
        find = Object.values(this.menfes).find(menpes => menpes.state == 'WAITING')
        let room = Object.values(this.menfes).find(room => [room.a, room.b].includes(m.sender) && room.state === 'WAITING')
        let other = [room.a, room.b].find(user => user !== m.sender)
        find.b = m.sender
        find.state = 'CHATTING'
        this.menfes[find.id] = {...find}
        await haruka.sendMessage(other, {text: `_@${m.sender.split('@')[0]} telah menerima menfess kamu, sekarang kamu bisa chat lewat bot ini_\n\n*NOTE :*\nJika ingin berhenti dari menfess, silahkan ketik .stopmenfess`, mentions: [m.sender]})
        haruka.sendMessage(m.chat, {text: `_Menfess telah diterima, sekarang kamu bisa chatan lewat bot ini_\n\n*NOTE :*\nJika ingin berhenti dari menfess, silahkan ketik .stopmenfess`})
    }
    break
 
    case 'tolakmenfess': 
    case 'tolakmenfes': {
        roof = Object.values(this.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender))
        if (!roof) return newReply('Belum ada sesi menfess')
        let room = Object.values(this.menfes).find(room => [room.a, room.b].includes(m.sender) && room.state === 'WAITING')
        let other = [room.a, room.b].find(user => user !== m.sender)
        find = Object.values(this.menfes).find(menpes => menpes.state == 'WAITING')
        haruka.sendMessage(other, {text: `_Uppsss... @${m.sender.split('@')[0]} Menolak menfess kamu_`, mentions: [m.sender]})
        newReply('Menfess berhasil di tolak 🤚')
        delete this.menfes[roof.id]
    }
    break
 
    case 'stopconfess': 
    case 'stopmenfess': {
        find = Object.values(this.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender))
        if (!find) return newReply('Belum ada sesi menfess')
        const to = find.a == m.sender ? find.b : find.a
        haruka.sendMessage(to, {text: `_Teman chat telah menghentikan menfess ini_`, mentions:[m.sender]})
        await newReply('ok')
        delete this.menfes[find.id]
    }
    break

    case 'anonymouschat': {
        if (m.isGroup) return newReply('Fitur Tidak Dapat Digunakan Untuk Group!')
        newReply(`Hi ${pushname} Welcome To Anonymous Chat\n\n${prefix}start -- _mencari partner_`)
    }
    break

    case 'keluar': 
    case 'leave': {
        if (m.isGroup) return newReply('Fitur Tidak Dapat Digunakan Untuk Group!')
        this.anonymous = this.anonymous ? this.anonymous : {}
        let room = Object.values(this.anonymous).find(room => room.check(m.sender))
        if (!room) {
            newReply(`Kamu Sedang Tidak Berada Di Sesi Anonymous\n\n${prefix}start -- _mencari partner_`)
            throw false
        }
        newReply('Berhasil keluar dari anonymous chat')
        let other = room.other(m.sender)
        if (other) await haruka.sendText(other, `Partner Telah Meninggalkan Sesi Anonymous`, m)
        delete this.anonymous[room.id]
        if (command === 'leave') 
    break
    }

    case 'mulai': 
    case 'start': {
        if (m.isGroup) return newReply('Fitur Tidak Dapat Digunakan Untuk Group!')
        this.anonymous = this.anonymous ? this.anonymous : {}
        if (Object.values(this.anonymous).find(room => room.check(m.sender))) {
            newReply(`Kamu Masih Berada Di dalam Sesi Anonymous\n\n${prefix}keluar -- _keluar dari sesi chat_`)
            throw false
        }
        let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
        if (room) {
            haruka.sendMessage(room.a, {text: `Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan\n\n${prefix}skip -- _mencari partner lain_\n${prefix}stop -- _menghentikan sesi chat_`})
            room.b = m.sender
            room.state = 'CHATTING'
            newReply(`Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan\n\n${prefix}skip -- _mencari partner lain_\n${prefix}stop -- _menghentikan sesi chat_`)
        } else {
            let id = + new Date
            this.anonymous[id] = {
                id,
                a: m.sender,
                b: '',
                state: 'WAITING',
                check: function (who = '') {
                    return [this.a, this.b].includes(who)
                },
                other: function (who = '') {
                    return who === this.a ? this.b : who === this.b ? this.a : ''
                },
            }
            newReply(`Mohon Tunggu Sedang Mencari Partner`)
        }
    }
    break

    case 'next': 
    case 'lanjut': {
        if (m.isGroup) return newReply('Fitur Tidak Dapat Digunakan Untuk Group!')
        this.anonymous = this.anonymous ? this.anonymous : {}
        let romeo = Object.values(this.anonymous).find(room => room.check(m.sender))
        if (!romeo) {
            newReply(`Kamu Sedang Tidak Berada Di Sesi Anonymous\n\n${prefix}start -- _mencari partner_`)
            throw false
        }
        let other = romeo.other(m.sender)
        if (other) await haruka.sendText(other, `Partner Telah Meninggalkan Sesi Anonymous`, m)
        delete this.anonymous[romeo.id]
        let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
        if (room) {
            haruka.sendMessage(room.a, {text: `Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan\n\n${prefix}skip -- _mencari partner lain_\n${prefix}stop -- _menghentikan sesi chat_`})
            room.b = m.sender
            room.state = 'CHATTING'
            newReply(`Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan\n\n${prefix}skip -- _mencari partner lain_\n${prefix}stop -- _menghentikan sesi chat_`)
        } else {
            let id = + new Date
            this.anonymous[id] = {
                id,
                a: m.sender,
                b: '',
                state: 'WAITING',
                check: function (who = '') {
                    return [this.a, this.b].includes(who)
                },
                other: function (who = '') {
                    return who === this.a ? this.b : who === this.b ? this.a : ''
                },
            }
            newReply(`Mohon Tunggu Sedang Mencari Partner`)
        }
    }
    break

    case 'sendprofile': 
    case 'sendprofil':
        if (m.isGroup) return newReply('Fitur Tidak Dapat Digunakan Untuk Group!')
        this.anonymous = this.anonymous ? this.anonymous : {}
        let romoe = Object.values(this.anonymous).find(room => room.check(m.sender))
        if (!romoe) {
            newReply(`⚠️ Kamu belum pernah memulai chat!\n\n${prefix}start -- _Mencari partner_`)
            throw false
        } else {
            let rms = Object.values(this.anonymous).find(room => [room.a, room.b].includes(m.sender) && room.state == 'CHATTING')
            let partnerJID = rms.other(m.sender)
            let res = await haruka.sendContact(partnerJID, [m.sender.split('@')[0]])
            haruka.sendMessage(m.chat, { text: '✅ Berhasil mengirim profil ke teman chat anda!' }, { quoted: m })
            haruka.sendMessage(partnerJID, { text: '👨👩 Teman chat kamu memberikan kontak profil nya!' }, { quoted: res })
        }
    break

    // Store Menu
    case 'list': 
    case 'store':{
        if (db_respon_list.length === 0) return newReply(`Belum ada list message di database`)
        if (!isAlreadyResponListGroup(m.chat, db_respon_list)) return newReply(`Belum ada list message yang terdaftar di group ini`)
        let teks = `Halo @${m.sender.split('@')[0]} berikut beberapa list yang tersedia saat ini.\n\n`
        for (let i of db_respon_list) {
            if (i.id === m.chat) {
                teks += `- ${i.key.toUppercase()}\n`
            }
        }
        teks += `\n\nUntuk melihat detail produk, silahkan kirim nama produk yang ada pada list di atas. Misalnya kamu ingin melihat detail produk dari ${db_respon_list[0].key.toUppercase()}, maka kirim pesan ${db_respon_list[0].key.toUppercase()} kepada bot`
        haruka.sendMessage(m.chat, {text: teks, mentions: [m.sender]}, {quoted:m}) 
    }
    break

    case 'dellist':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins) return newReply(mess.GrupAdmin)
        if (db_respon_list.length === 0) return newReply(`Belum ada list message di database`)
        if (!text) return newReply(`Gunakan dengan cara ${prefix + command} *key*\n\n_Contoh_\n\n${prefix + command} hello`)
        if (!isAlreadyResponList(m.chat, q.toLowercase(), db_respon_list)) return newReply(`List respon dengan key *${q}* tidak ada di database!`)
        delResponList(m.chat, q.toLowercase(), db_respon_list)
        newReply(`Sukses delete list message dengan key *${q}*`)
    break

    case 'addlist':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins) return newReply(mess.GrupAdmin)
        let args1 = q.split('|')[0].toLowercase()
        let args2 = q.split('|')[1]
        if (!q.includes('|')) return newReply(`Gunakan dengan cara ${prefix+command} *key|response*\n\n_Contoh_\n\n${prefix+command} tes|apa`)
        if (isAlreadyResponList(m.chat, args1, db_respon_list)) return newReply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
        if (/image/.test(mime)) {
        let media = await haruka.downloadAndSaveMediaMessage(quoted)
        const fd = new FormData();
        fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
        fetch('https://telegra.ph/upload', {
            method: 'POST',
            body: fd
        }).then(res => res.json())
        .then((json) => {
            addResponList(m.chat, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
            newReply(`Sukses set list message dengan key : *${args1}*`)
            if (fs.existsSync(media)) fs.unlinkSync(media)
        })
    } else {
        addResponList(m.chat, args1, args2, false, '-', db_respon_list)
        newReply(`Sukses set list message dengan key : *${args1}*`)
    }
    break

    case 'updatelist': 
    case 'update':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins) return newReply(mess.GrupAdmin)
        let args1 = q.split('|')[0].toLowercase()
        let args2 = q.split('|')[1]
        if (!q.includes('|')) return newReply(`Gunakan dengan cara ${prefix+command} *key|response*\n\n_Contoh_\n\n${prefix+command} tes|apa`)
        if (!isAlreadyResponListGroup(m.chat, db_respon_list)) return newReply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
        if (/image/.test(mime)) {
            let media = await haruka.downloadAndSaveMediaMessage(quoted)
            const fd = new FormData();
            fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
            fetch('https://telegra.ph/upload', {
                method: 'POST',
                body: fd
            }).then(res => res.json())
            .then((json) => {
                updateResponList(m.chat, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                newReply(`Sukses update respon list dengan key *${args1}*`)
                if (fs.existsSync(media)) fs.unlinkSync(media)
            })
        } else {
            updateResponList(m.chat, args1, args2, false, '-', db_respon_list)
            newReply(`Sukses update respon list dengan key *${args1}*`)
        }
    }
    break

    case 'tambah':{
        if (!text.includes('+')) return newReply(`Gunakan dengan cara ${prefix+command} *angka* + *angka*\n\n_Contoh_\n\n${prefix+command} 1+2`)
        arg = args.join(' ')
        atas = arg.split('+')[0]
        bawah = arg.split('+')[1]
        let nilai_one = Number(atas)
        let nilai_two = Number(bawah)
        newReply(`${nilai_one + nilai_two}`)
    }
    break

    case 'kurang':{
        if (!text.includes('-')) return newReply(`Gunakan dengan cara ${prefix+command} *angka* - *angka*\n\n_Contoh_\n\n${prefix+command} 1-2`)
        arg = args.join(' ')
        atas = arg.split('-')[0]
        bawah = arg.split('-')[1]
        let nilai_one = Number(atas)
        let nilai_two = Number(bawah)
        newReply(`${nilai_one - nilai_two}`)
    }
    break

    case 'kali':{
        if (!text.includes('*')) return newReply(`Gunakan dengan cara ${prefix+command} *angka* * *angka*\n\n_Contoh_\n\n${prefix+command} 1*2`)
        arg = args.join(' ')
        atas = arg.split('*')[0]
        bawah = arg.split('*')[1]
        let nilai_one = Number(atas)
        let nilai_two = Number(bawah)
        newReply(`${nilai_one * nilai_two}`)
    }
    break

    case 'bagi':{
        if (!text.includes('/')) return newReply(`Gunakan dengan cara ${prefix+command} *angka* / *angka*\n\n_Contoh_\n\n${prefix+command} 1/2`)
        arg = args.join(' ')
        atas = arg.split('/')[0]
        bawah = arg.split('/')[1]
        let nilai_one = Number(atas)
        let nilai_two = Number(bawah)
        newReply(`${nilai_one / nilai_two}`)
    }
    break

    case 'setproses': 
    case 'setp':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins) return newReply(mess.GrupAdmin)
        if (!text) return newReply(`Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${prefix + command} Pesanan sedang di proses ya @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `)
        if (isSetProses(m.chat, set_proses)) return newReply(`Set proses already active`)
        addSetProses(text, m.chat, set_proses)
        newReply(`✅ Done set proses!`)
    break

    case 'changeproses': 
    case 'changep':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins) return newReply(mess.GrupAdmin)
        if (!text) return newReply(`Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${prefix + command} Pesanan sedang di proses ya @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `)
        if (isSetProses(m.chat, set_proses)) {
            changeSetProses(text, m.chat, set_proses)
            newReply(`Sukses ubah set proses!`)
        } else {
            addSetProses(text, m.chat, set_proses)
            newReply(`Sukses ubah set proses!`)
        }
    break

    case 'delsetproses': 
    case 'delsetp':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins) return newReply(mess.GrupAdmin)
        if (!isSetProses(m.chat, set_proses)) return newReply(`Belum ada set proses di gc ini`)
        removeSetProses(m.chat, set_proses)
        newReply(`Sukses delete set proses`)
    break

    case 'setdone':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins) return newReply(mess.GrupAdmin)
        if (!text) return newReply(`Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${prefix + command} Done @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `)
        if (isSetDone(m.chat, set_done)) return newReply(`Udh set done sebelumnya`)
        addSetDone(text, m.chat, set_done)
        newReply(`Sukses set done!`)
    }
    break

    case 'changedone': 
    case 'changed':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins) return newReply(mess.GrupAdmin)
        if (!text) return newReply(`Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${prefix + command} Done @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `)
        if (isSetDone(m.chat, set_done)) {
            changeSetDone(text, m.chat, set_done)
            newReply(`Sukses ubah set done!`)
        } else {
            addSetDone(text, m.chat, set_done)
            newReply(`Sukses ubah set done!`)
        }
    break

    case 'delsetdone': 
    case 'delsetd':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins) return newReply(mess.GrupAdmin)
        if (!isSetDone(m.chat, set_done)) return newReply(`Belum ada set done di gc ini`)
        removeSetDone(m.chat, set_done)
        newReply(`Sukses delete set done`)
    break

    // RPG Menu
    case 'inv': 
    case 'me': 
    case 'inventori': 
    case 'inventory': 
    case 'profile':{
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        let teksehmazeh = `*INFO USER*\n\n`
        teksehmazeh += `*❤️ Blood* : ${getDarah(m.sender) ? getDarah(m.sender) : 0}\n`
        teksehmazeh += `*◻️️ Iron* : ${getBesi(m.sender) ? getBesi(m.sender) : 0}\n`
        teksehmazeh += `*🌟 Gold* : ${getEmas(m.sender) ? getEmas(m.sender) : 0}\n`
        teksehmazeh += `*🐲 Emerald* : ${getEmerald(m.sender) ? getEmerald(m.sender) : 0}\n`
        teksehmazeh += `*💎 Diamond* : ${getDm(m.sender) ? getDm(m.sender) : 0}\n`
        teksehmazeh += `*⏺️ Limit* : ${isCreator ? 'Unlimited' : isPremium ? 'Unlimited' : getLimit(m.sender, limitCount, limit)}\n`
        teksehmazeh += `*💰 Money* : $${getBalance(m.sender, balance) ? getBalance(m.sender, balance) : 0}\n`
        teksehmazeh += `*🧪 Potion* : ${getPotion(m.sender) ? getPotion(m.sender) : 0}\n\n`
        teksehmazeh += `*HUNT RESULT*\n`
        teksehmazeh += `*🐟 Fish* :` + util.format(getIkan(m.sender) ? getIkan(m.sender) : 0 + getMancingIkan(m.sender) ? getMancingIkan(m.sender) :0) + `\n`
        teksehmazeh += `*🐔 Chicken* : ${getAyam(m.sender) ? getAyam(m.sender) : 0}\n`
        teksehmazeh += `*🐇 Rabbit* : ${getKelinci(m.sender) ? getKelinci(m.sender) : 0}\n`
        teksehmazeh += `*🐑 Sheep* : ${getDomba(m.sender) ? getDomba(m.sender) : 0}\n`
        teksehmazeh += `*🐄 Cow* : ${getSapi(m.sender) ? getSapi(m.sender) : 0}\n`
        teksehmazeh += `*🐘 Elephant* : ${getGajah(m.sender) ? getGajah(m.sender) : 0}\n`
        teksehmazeh += `🎢 *Coal* : ${getMiningcoal(m.sender) ? getMiningcoal(m.sender) : 0}\n`
        teksehmazeh += `🛑 *Stone* : ${getMiningstone(m.sender) ? getMiningstone(m.sender) : 0}\n`
        teksehmazeh += `❄️ *Copper Ore* : ${getMiningore(m.sender) ? getMiningore(m.sender) : 0}\n`
        teksehmazeh += `🛠️ *Ingot Ore* : ${getMiningingot(m.sender) ? getMiningingot(m.sender) : 0}\n`
        teksehmazeh += `🪵 *Wood* : ${getNebangKayu(m.sender) ? getNebangKayu(m.sender) : 0}\n`
        await haruka.sendMessage(m.chat, {
            text: teksehmazeh,
            contextInfo: {
                externalAdReply: {
                    title: botName, 
                    body: ownerName,
                    thumbnailUrl: `https://telegra.ph/file/eb026b67d45e17632a131.jpg`,
                    sourceUrl: gcwa,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { 
            quoted: m 
        })
    }
    break

    case 'mining': 
    case 'mine':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        if (isCekDarah < 1) return newReply(`Kamu Lelah!, Coba Sembuhkan Menggunakan Ramuan`) 
        let besi = [1,2,5,0,3,0,1,1,4,1,5,0,0]
        let emas = [0,1,2,3,0,0,0,1,1,0,0,2]
        let emerald = [0,0,1,0,0,1,0,2,1,0,0,1]
        let besinya = besi[Math.floor(Math.random() * besi.length)]
        let emasnya = emas[Math.floor(Math.random() * emas.length)]
        let emeraldnya = emerald[Math.floor(Math.random() * emerald.length)]
        setTimeout( async () => {
            let caption = `_MINING RESULT_\n\n*Iron* : ${besinya}\n*Gold* : ${emasnya}\n*Emerald* : ${emeraldnya}`
            await haruka.sendMessage(m.chat, {image:{ url : 'https://telegra.ph/file/d17479f0a56cc52826101.jpg'}, caption: caption}, {quoted: m})
        }, 7000)
        setTimeout( async () => {
            await haruka.sendTextWithMentions(m.chat, `@${m.sender.split('@')[0]} Otw Mining`, m) 
        }, 1500)
        kurangDarah(m.sender, 10)
        addBesi(m.sender, besinya)
        addEmas(m.sender, emasnya)
        addEmerald(m.sender, emeraldnya) 
    }
    break

    case 'beli': 
    case 'buy':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        if (!text) return newReply(`Mau buy apa lu?\n\n1.potion\n2.baitfood\n3.limit\n\nExample: ${prefix + command} baitfood`)
        let anu = args[1]
        if (args[0] === 'potion') {
            let noh = 100000 * anu
            if (!args[1]) return newReply(`Example : ${prefix + command} potion 2\n 1 Potion = 100000 Money`)
            if (isMonay < noh) return newReply('Sisa Uang Anda Tidak Cukup Untuk Pembelian Ini')
            kurangMonay(m.sender, noh)
            let apalu = anu * 1
            addPotion(m.sender, apalu)
            setTimeout( async () => {
                newReply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Potion* : ${getPotion(m.sender)}`)
            }, 2000) 
        } else if (args[0] === 'baitfood') {
            let noh = 5000 * anu
            if (!args[1]) return newReply(`Example : ${prefix + command} baitfood 2\n 1 Bait Food = 2500 Money`)
            if (isMonay < noh) return newReply('Sisa Uang Anda Tidak Cukup Untuk Pembelian Ini')
            kurangMonay(m.sender, noh)
            let apalu = anu * 1
            addUmpan(m.sender, apalu)
            setTimeout( async () => {
                newReply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Bait Food* : ${getUmpan(m.sender)}`)
            }, 2000) 
        } else if (args[0] === 'limit') {
            let noh = 35000 * anu
            if (!args[1]) return newReply(`Example : ${prefix + command} limit 2\n 1 Limit = 35000 Money`)
            if (isMonay < noh) return newReply('Sisa Uang Anda Tidak Cukup Untuk Pembelian Ini')
            kurangMonay(m.sender, noh)
            let apalu = anu * 1
            addLimit(m.sender, apalu)
            setTimeout( async() => {
                newReply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Limit* : ${getLimit(m.sender)}`)
            }, 2000) 
        } else {
            newReply(`Mau buy apa lu?\n\n1.potion\n2.baitfood\n3.limit\n\nExample: ${prefix + command} baitfood`)
        }
    }
    break

    case 'sell': 
    case 'sel': 
    case 'jual':{
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        if (!text) return newReply(`Mau jual apa?\n- fish\n- chicken\n- rabbit\n- sheep\n- cow\n- elephant\n- iron\n- gold\n- emerald\n\nExample : ${prefix + command} fish 2`)
        let anu = args[1]
        if (args[0] === 'fish') {
            if (isIkan < anu) return newReply(`Anda Tidak Memiliki Cukup Ikan Untuk Transaksi Ini`)
            if (!args[1]) return newReply(`Example : ${prefix + command} fish 2\n 1 Fish = 1500 Money`)
            kurangIkan(m.sender, anu)
            let monaynya = 1500 * anu
            addMonay(m.sender, monaynya)
            setTimeout( async () => {
                newReply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa Ikan Fish : ${getIkan(m.sender)}`)
            }, 2000) 
        } else if (args[0] === 'chicken') {
            if (isAyam < anu) return newReply(`Anda Tidak Memiliki Cukup Ayam Untuk Transaksi Ini`)
            if (!args[1]) return newReply(`Example : ${prefix + command} chicken 2\n 1 Chicken = 2500 Money`)
            kurangAyam(m.sender, anu)
            let monaynya = 2500 * anu
            addMonay(m.sender, monaynya)
            setTimeout( async () => {
                newReply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa Ayam* : ${getAyam(m.sender)}`)
            }, 2000) 
        } else if (args[0] === 'rabbit') {
            if (isKelinci < anu) return newReply(`Anda Tidak Memiliki Cukup Kelinci Untuk Transaksi Ini`)
            if (!args[1]) return newReply(`Example : ${prefix + command} rabbit 2\n 1 Rabbit = 3000 Money`)
            kurangKelinci(m.sender, anu)
            let monaynya = 3000 * anu
            addMonay(m.sender, monaynya)
            setTimeout( async () => {
                newReply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa kelinci* : ${getKelinci(m.sender)}`)
            }, 2000) 
        } else if (args[0] === 'sheep') {
            if (isDomba < anu) return newReply(`Anda Tidak Memiliki Cukup Domba Untuk Transaksi Ini`)
            if (!args[1]) return newReply(`Example : ${prefix + command} domba 2\n 1 Sheep = 5000 money`)
            kurangDomba(m.sender, anu)
            let monaynya = 5000 * anu
            addMonay(m.sender, monaynya)
            setTimeout( async () => {
                newReply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa domba* : ${getDomba(m.sender)}`)
            }, 2000) 
        } else if (args[0] === 'cow') {
            if (isSapi < anu) return newReply(`Anda Tidak Memiliki Cukup Sapi Untuk Transaksi Ini`)
            if (!args[1]) return newReply(`Example : ${prefix + command} cow 2\n 1 Cow = 10000 Money`)
            kurangSapi(m.sender, anu)
            let monaynya = 10000 * anu
            addMonay(m.sender, monaynya)
            setTimeout( async () => {
                newReply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa sapi* : ${getSapi(m.sender)}`)
            }, 2000) 
        } else if (args[0] === 'elephant') {
            if (isGajah < anu) return newReply(`Anda Tidak Memiliki Cukup Gajah Untuk Transaksi Ini`)
            if (!args[1]) return newReply(`Example : ${prefix + command} elephant 2\n 1 Elephant = 15000 Money`)
            kurangGajah(m.sender, anu)
            let monaynya = 15000 * anu
            addMonay(m.sender, monaynya)
            setTimeout( async () => {
                newReply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa gajah* : ${getGajah(m.sender)}`)
            }, 2000) 
        } else if (args[0] === 'iron') {
            if (isBesi < anu) return newReply(`Anda Tidak Memiliki Cukup Besi Untuk Transaksi Ini`)
            if (!args[1]) return newReply(`Example : ${prefix + command} iron 2\n 1 Iron = 15000 Money`)
            kurangBesi(m.sender, anu)
            let monaynya = 16000 * anu
            addMonay(m.sender, monaynya)
            setTimeout( async () => {
                newReply(`Transaksi berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa besi* : ${getBesi(m.sender)}`)
            }, 2000) 
        } else if (args[0] === 'gold') {
            if (isEmas < anu) return newReply(`Anda Tidak Memiliki Cukup Emas Untuk Transaksi Ini`)
            if (!args[1]) return newReply(`Example : ${prefix + command} gold 2\n 1 Gold = 50000 Money`)
            kurangEmas(m.sender, anu)
            let monaynya = 50000 * anu
            addMonay(m.sender, monaynya)
            setTimeout( async () => {
                newReply(`Transaksi berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa emas* : ${getEmas(m.sender)}`)
            }, 2000) 
        } else
            if (args[0] === 'emerald') {
            if (isEmerald < anu) return newReply(`Anda Tidak Memiliki Cukup Zamrud Untuk Transaksi Ini`)
            if (!args[1]) return newReply(`Example : ${prefix + command} emerald 2\n 1 Emerald = 100000 Money`)
            kurangEmerald(m.sender, anu)
            let monaynya = 100000 * anu
            addMonay(m.sender, monaynya)
            setTimeout( async () => {
                newReply(`Transaksi berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa zamrud* : ${getEmerald(m.sender)}`)
            }, 2000) 
        } else { 
            newReply(`Mau jual apa?\n- fish\n- chicken\n- rabbit\n- sheep\n- cow\n- elephant\n- iron\n- gold\n- emerald\n\nExample : ${prefix + command} fish 2`)
        }
    }
    break

    case 'heal':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        if (!isCekDarah < 1) return newReply('Anda Hanya Dapat Menyembuhkan Saat Darah Anda 0')
        if (isCekDarah > 100) return newReply('Darahmu Penuh')
        if (isPotion < 1) return newReply(`Anda Tidak Punya Ramuan, Coba Beli Dengan Cara #buypotion _amount_`) 
        addDarah(m.sender, 100)
        kurangPotion(m.sender, 1)
        newReply('Done! Darah mu dah full')
    }
    break

    case 'hunt': 
    case 'hunting': {
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        if (isCekDarah < 1) return newReply('Darahmu Habis, Coba Sembuhkan Menggunakan Ramuan') 
        let luka = ['Pierced by a thorn while hunting','Slipped into the abyss while hunting','Scratched by a wild animal','Not careful','Entangled in roots','Fall while hunting']
        let location = ['Jungle','Amazon forest','Tropical forest','Meadow','African forest','Mountains']
        let ikanmu = Math.ceil(Math.random() * 10)
        let ayam = Math.ceil(Math.random() * 8)
        let kelinci = Math.ceil(Math.random() * 7)
        let dombanya = [3,0,4,0,5,4,6,0,1,0,2,3,0,3,0,1]
        let sapinya = [2,0,3,0,4,0,5,0,1,0,2,0,3,0,1]
        let gajahnya = [1,0,4,0,2,0,1,0,2,1,3,0,1]
        let domba = dombanya[Math.floor(Math.random() * dombanya.length)] 
        let sapi = sapinya[Math.floor(Math.random() * sapinya.length)] 
        let gajah = gajahnya[Math.floor(Math.random() * gajahnya.length)]
        let lukanya = luka[Math.floor(Math.random() * luka.length)]
        let lokasinya = location[Math.floor(Math.random() * location.length)]
        if (lokasinya === 'Jungle') {
            let image = 'https://telegra.ph/file/92967f55b1f437fdd55fe.jpg'
        } else if (lokasinya === 'Amazon forest') {
            let image = 'https://telegra.ph/file/2b9b53837d9f109862224.jpg'
        } else if (lokasinya === 'Tropical forest') {
            let image = 'https://telegra.ph/file/bd662563855328a1832e6.jpg'
        } else if (lokasinya === 'Meadow') {
            let image = 'https://telegra.ph/file/66435cf783e308b19927e.jpg'
        } else if (lokasinya === 'African forest') {
            let image = 'https://telegra.ph/file/c5996d581846f70ed1514.jpg'
        } else if (lokasinya === 'Mountains') {
            let image = 'https://telegra.ph/file/ca8f84d91ca3e1d5efa59.jpg'
        }
        setTimeout( async () => {
            let teksehmazeh = `_HUNT RESULT_\n\n`
            teksehmazeh += `*🐟Fish* : ${ikanmu}\n`
            teksehmazeh += `*🐔Chicken* : ${ayam}\n`
            teksehmazeh += `*🐇Rabbit* : ${kelinci}\n`
            teksehmazeh += `*🐑Sheep* : ${domba}\n`
            teksehmazeh += `*🐄Cow* : ${sapi}\n`
            teksehmazeh += `*🐘Elephant* : ${gajah}\n\n`
            teksehmazeh += `_INFO_\n`
            teksehmazeh += `*Location* : ${lokasinya}\n`
            teksehmazeh += `*Wounded* : ${lukanya}, blood - 10\n`
            teksehmazeh += `*Remaining blood* : ${getDarah(m.sender)}\n`
            await haruka.sendMessage(m.chat, {image:{ url: image }, caption: teksehmazeh}, {quoted: m})
        }, 5000)
        setTimeout( () => {
            haruka.sendTextWithMentions(m.chat, `@${m.sender.split('@')[0]} Started Hunting In ${lokasinya}`, m) 
        }, 1000) 
        addIkan(m.sender, ikanmu) 
        addAyam(m.sender, ayam) 
        addKelinci(m.sender, kelinci)
        addDomba(m.sender, domba)
        addSapi(m.sender, sapi)
        addGajah(m.sender, gajah)
        kurangDarah(m.sender, 10)
    }
    break

    case 'adventure':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        ngab = ['Avalanche','Volcanic Eruption','Tsunami','Earthquake','Meteor','Demon']
        let sesuatu = ngab[Math.floor(Math.random() * ngab.length)]
        let dungeon =['Whetstone','Willow Field','Rodeo','Verdant Blufs','Bull Holland','Fallen Tree','Dellnort','Verona Lush','Leafy Hollow','Chilliad Dome','Garcia','Pine Valley','Santa Florals','Guvero East','Cranbarry','Junever','Aldea Malvada','Green Palms','Green Oasis','Fort Carson','Prickel Pine','Pilson Meadow','Boca Roca','Rocksore East','Camel Toe','Hanky Panky','Fern Ridge','Montgomerry','Flint Yankton','Vespucci','fortress city', 'ravines valley', 'horizon valley', 'cyber city', 'end city', 'templar city', 'pochinki', 'peak','Vertical Zone','Sentainel Country','Night City','Flush City','Royals Canyon','Blackburn','Peterborough','Tarnstead','Jarren’s','Outpost','Landow','Nearon','Kincardine','Aysgarth','Veritas','Openshaw','Bredwardine','Berkton','Wolford','Norwich','Kald','Solaris','Kilead','Pitmerden','Acomb','Eldham','Warcester','Lingmell','Kilead','Cromerth','Wingston','Garmsby','Kingcardine','Perthlochry','Frostford','Hillford','Hardersfield','Tarrin','Holmfirth','Caerleon','Elisyum','Ballaeter','Penshaw','Bradford','Wigston','Accreton','Kameeraska','Ferncombe','Kilerth','Erostey','Carran','Jongvale','Larnwick','Queenstown','Whaelrdrake','Baerney','Wingston','Arkney','Strongfair','Lowestoft','Beggar’s Hole','Shepshed','Perthlochry','Ironforge','Tywardreath','Pontheugh','Foolshope','Hull','Dalmerlington','Aucteraden','Woodpine','Millstone','Windermere','Lancaster','Kirkwall','Rotherhithe','Astrakhan','Watford','Ritherhithe','Krosstoen','Pella’s','Wish','Grimsby','Ayrith','Ampleforth','Skystead','Eanverness','Penshaw','Peatsland','Astrakane','Pontybridge','Caershire','Snowbush','Sutton','Northwich','Hogsfeet','Claethorpes','Sudbury','Cherrytown','Blue Field','Orrinshire','Aempleforth','Garrigill','Jedburgh','Eastbourne','Taedmorden','Venzor','Grasmere','Ubbin','Falls','Violl’s Garden','Glanchester','Bailymena','Arkkukari','Skargness','Cardend','Llanybydder','Faversham','Yellowseed','Carlisle','Cirencester','Aramoor','Furness','Kincardine','Rotherham','Emelle','Boroughton','Carran','Ffestiniog','Mansfield','Huthwaite','Marclesfield','Pavv','Squall’s End','Glenarm','Dragontail','Moressley','Hardersfield','Gilramore','Aria','Ecrin','Clare View Point','Blackburn','Oakheart','Doonatel','Broughton','Carlisle','Murlayfield','Nuxvar']
        let sesuatuu = dungeon[Math.floor(Math.random() * dungeon.length)]
        hasm = 'https://telegra.ph/file/ff94536d69e0f4f3e7b54.jpg'
        let adven = Math.ceil(Math.random() * 1000)
        let money = Math.ceil(Math.random() * 300)
        setTimeout( () => {
            let hg = `「 DEATH 」\n\n *┊ Place* ${sesuatuu}\n ┊ *MONEY :* $${money}\n ┊ *EXP :* ${adven}Xp`
            haruka.sendMessage(m.chat, {image:{url:hasm}, caption: hg},{quoted:m})
        }, 7000)
        setTimeout( () => {
            newReply(`Awass`)
        }, 5000)
        setTimeout( () => {
            newReply(`Tiba-tiba Ada ${sesuatu}`)
        }, 3000)
        setTimeout( () => {
            newReply(`${pushname} On an Adventure`)
        }, 0)
        addLevelingXp(m.sender, adven)
        addBalance(m.sender, money, balance)
    }
    break

    case 'ojek': 
    case 'ngojek':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        let adven = Math.ceil(Math.random() * 1000)
        let money = Math.ceil(Math.random() * 300)
        let loadd = [
            '🔍 Mencari Pelanggan....',
            '😋 Mendapatkan Orderan....',
            '🛵 Mengantar Ke Tujuan....',
            '👤✅ Sampai Di Tujuan....',
            '🤝 Menerima Gaji....',
            `😋 Hasil Ngojek *${pushname}*\n\n*💰 Money :* ${money}\n*✨ Exp :* ${adven}\n*😍 Order Selesai* : +1`
        ]
        const key = await haruka.sendMessage(m.chat, {text: '⏱️ Menunggu Orderan....'}, {quoted: m})
        for (let i = 0; i < loadd.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 900));
            await haruka.sendMessage(m.chat, {text: loadd[i], edit: key })
        }

        addLevelingXp(m.sender, adven)
        addBalance(m.sender, money, balance)
    }
    break

    case 'luckyday':
    case 'luckytime':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        if (!isCreator) { // Reward Buat User
            ez = Math.ceil(Math.random() * 450) // Jumlah XP
            a = randomNomor(99) // Jumlah Gold
            b = randomNomor(500) // Jumlah Money
            c = randomNomor(150) // Jumlah Iron
            addBalance(m.sender, b, balance) // Tambah Balance Ke DB
            addLevelingXp(m.sender, ez) // Tambah XP Ke DB
            addEmas(m.sender, a) // Tambah Gold Ke DB
            addBesi(m.sender, c) // Tambah Iron Ke DB
            newReply(`🎰 *Lucky*\n┊ *Money:* $${b}\n┊ *Gold :* ${a}\n┊ *Iron :* ${c}\n┊ *XP :* ${ez}`)
        } else if (isCreator) { // Reward Buat Owner
            ez = 1000 // Jumlah XP
            a = 1000 // Jumlah Gold
            b = 1000 // Jumlah Money
            c = 1000 // Jumlah Iron
            addBalance(m.sender, b, balance) // Tambah Balance Ke DB
            addLevelingXp(m.sender, ez) // Tambah XP Ke DB
            addEmas(m.sender, a) // Tambah Gold Ke DB
            addBesi(m.sender, c) // Tambah Iron Ke DB
            newReply(`🎰 *Lucky*\n┊ *Money:* $${b}\n┊ *Gold :* ${a}\n┊ *Iron :* ${c}\n┊ *XP :* ${ez}`)
        }
    }
    break

    case 'slime':
    case 'killslime':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        ez = Math.ceil(Math.random() * 400)
        addLevelingXp(m.sender, ez)
        a = randomNomor(55)
        b = randomNomor(400)
        c = randomNomor(80)
        d = randomNomor(3)
        addLevelingXp(m.sender, ez)
        addBalance(m.sender, b, balance)
        addEmas(m.sender, a)
        addBesi(m.sender, c)
        addDm(m.sender, d)
        bufutI = 'https://telegra.ph/file/c34a444fa8824d8bb6e18.jpg'
        let hg = `*Misi kill Slime*\n\n🎁 *Hadiah untuk killing Slime*\n ┊ *Money:* $${b}\n ┊ *Iron:* ${c}\n ┊ *Gold:* ${a}\n ┊ *Diamond:* ${d}\n\n*Terima kasih telah menjalankan misi ini*`
        haruka.sendMessage(m.chat, {image:{url:bufutI},caption: hg} , {quoted:m}) 
    }
    break

    case 'goblin':
    case 'killgoblin':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        ez = Math.ceil(Math.random() * 500)
        addLevelingXp(m.sender, ez)
        a = randomNomor(65)
        b = randomNomor(500)
        c = randomNomor(90)
        d = randomNomor(5)
        addLevelingXp(m.sender, ez)
        addBalance(m.sender, b, balance)
        addEmas(m.sender, a)
        addBesi(m.sender, c)
        addDm(m.sender, d)
        bufo = 'https://telegra.ph/file/19bdc38aaafda29f7afe1.jpg'
        let hg = `*Misi kill Goblin*\n\n🎁 *Hadiah untuk killing Goblin*\n ┊ *Money:* $${b}\n ┊ *Iron:* ${c}\n ┊ *Gold:* ${a}\n ┊ *Diamond:* ${d}\n\n*Terima kasih telah menjalankan misi ini*`
        haruka.sendMessage(m.chat, {image:{url:bufo}, caption: hg }, {quoted:m})
    }
    break

    case 'devil':
    case 'killdevil':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        ez = Math.ceil(Math.random() * 600)
        addLevelingXp(m.sender, ez)
        a = randomNomor(70)
        b = randomNomor(600)
        c = randomNomor(95)
        d = randomNomor(6)
        addLevelingXp(m.sender, ez)
        addBalance(m.sender, b, balance)
        addEmas(m.sender, a)
        addBesi(m.sender, c)
        addDm(m.sender, d)
        bufas = 'https://telegra.ph/file/dbecd2f871988f52bf555.jpg'
        let hg = `*Misi kill Devil*\n\n🎁 *Hadiah untuk killing Devil*\n ┊ *Money:* $${b}\n ┊ *Iron:* ${c}\n ┊ *Gold:* ${a}\n ┊ *Diamond:* ${d}\n\n*Terima kasih telah menjalankan misi ini*`
        haruka.sendMessage(m.chat, {image:{url: bufas}, caption: hg }, {quoted:m})
    }
    break

    case 'behemoth':
    case 'killbehemoth':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        ez = Math.ceil(Math.random() * 700)
        addLevelingXp(m.sender, ez)
        a = randomNomor(75)
        b = randomNomor(600)
        c = randomNomor(100)
        d = randomNomor(7)
        addLevelingXp(m.sender, ez)
        addBalance(m.sender, b, balance)
        addEmas(m.sender, a)
        addBesi(m.sender, c)
        addDm(m.sender, d)
        batai = 'https://telegra.ph/file/43259a7d8accff8b627c0.jpg'
        let hg = `*Misi kill Behemoth*\n\n🎁 *Hadiah untuk kiling Behemoth*\n ┊ *Money:* $${b}\n ┊ *Iron:* ${c}\n ┊ *Gold:* ${a}\n ┊ *Diamond:* ${d}\n\n*Terima kasih telah menjalankan misi ini*`
        haruka.sendMessage(m.chat, {image:{url: batai}, caption: hg }, {quoted:m})
    }
    break

    case 'demon':
    case 'killdemon':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        ez = Math.ceil(Math.random() * 850)
        addLevelingXp(m.sender, ez)
        a = randomNomor(90)
        b = randomNomor(900)
        c = randomNomor(120)
        d = randomNomor(10)
        addLevelingXp(m.sender, ez)
        addBalance(m.sender, b, balance)
        addEmas(m.sender, a)
        addBesi(m.sender, c)
        addDm(m.sender, d)
        bhuu = 'https://telegra.ph/file/4a264a10ea2e5f18314f1.jpg'
        let hg = `*Misi kill Demon*\n🎁 *Demon Kill Reward*\n ┊ *Money:* $${b}\n ┊ *Iron:* ${c}\n ┊ *Gold*: ${a}\n ┊ *Diamond:* ${d}\n\n*Terima Kasih Telah Melaksanakan Misi Ini*`
        haruka.sendMessage(m.chat, {image: {url: bhuu}, caption: hg }, {quoted:m})
    }
    break

    case 'demonking':
    case 'killdemonking':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        ez = Math.ceil(Math.random() * 1000)
        addLevelingXp(m.sender, ez)
        addBalance(m.sender, 1999, balance)
        addEmas(m.sender, 99)
        addBesi(m.sender, 99)
        addDm(m.sender, 99)
        bhuud = 'https://telegra.ph/file/cdf482a8de192189057d8.jpg'
        let hg = `*Misi kill DemonKing*\n\n🎁 *DemonKing Kill Reward*\n ┊ *Money* : $${b}\n ┊ *Iron :* ${c}\n ┊ *Gold :* ${a}\n ┊ *Diamond :* ${d}\n\n*Terima Kasih Telah Melaksanakan Misi Ini*`
        haruka.sendMessage(m.chat, {image:{url: bhuud}, caption: hg }, {quoted:m})
    }
    break

    case 'joinrpg':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (isAdventure) return newReply(' *Kamu Telah join sebelumnya*')
        reqXp = 5000 * (Math.pow(2, getLevelingLevel(m.sender)) - 1)
        _petualang.push(m.sender)
        addInventoriDarah(m.sender, DarahAwal)
        addInventori(m.sender)
        addInventoriBuruan(m.sender)
        fs.writeFileSync('./database/user/inventory.json', JSON.stringify(_petualang))
        addLevelingId(m.sender) 
        let itu = 'https://telegra.ph/file/a4ec01498e764ae42c8c4.jpg'
        haruka.sendMessage(m.chat, {image:{url: itu}, caption: 'Sukses join Rpg games' }, {quoted:m})
    }
    break

    case 'sellikan':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        if (args.length < 1) return newReply(`Kirim perintah *${prefix + command}* jumlah untuk dijual\n\nContoh *${prefix + command}* 10`)
        jmlh = text
        rp = 5 * jmlh
        if (getFish(m.sender) < jmlh) return newReply(`*Ikan Anda Tidak Cukup*`)
        sellFish(m.sender, jmlh, balance)
        addBalance(m.sender, rp, balance) 
        newReply(`🛍️ *MARKET*\n ┊ Seller : ${pushname}\n ┊ Buyer : Admin\n ┊ Price/Fish : 5\n ┊ Status : Success\n ┊ Left FishPrice/Fish : ${await getFish(m.sender)}\n ┊ Sales Results : $${rp}`)
    }
    break

    case 'sellbesi':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        if (args.length < 1) return newReply(`Kirim perintah *${prefix + command}* jumlah untuk dijual\n\nContoh *${prefix + command}* 10`)
        jmlh = text
        rp = 10 * jmlh
        if (getBesi(m.sender) < jmlh) return newReply(`Besi Tidak Cukup`)
        sellBesi(m.sender, jmlh, balance)
        addBalance(m.sender, rp, balance) 
        newReply(`🛍️ MARKET\n ┊ Seller : ${pushname}\n ┊ Buyer : Admin\n ┊ Harga/Besi : 10\n ┊ Status : Sukses\n ┊ Sisa Besi : ${await getBesi(m.sender)}\n ┊ Sales Results : $${rp}`)
    }
    break

    case 'sellemas':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        if (args.length < 1) return newReply(`Kirim perintah *${prefix + command}* jumlah untuk dijual\n\nContoh *${prefix + command}* 10`)
        jmlh = text
        rp = 25 * jmlh
        if (getEmas(m.sender) < jmlh) return newReply(`Emas Anda Tidak Cukup`)
        sellEmas(m.sender, jmlh, balance)
        addBalance(m.sender, rp, balance) 
        newReply(`🛍️ MARKET\n ┊ Seller : ${pushname}\n ┊ Buyer : Admin\n ┊ Harga/Emas : 25\n ┊ Status : Sukses\n ┊ Sisa Emas : ${getEmas(m.sender)}\n ┊ Sales Results : $${rp}`)
    }
    break 

    case 'jelajah': {
        let tempsa = args.join(' ')
        if (tempsa == 'corbiens river') {
            let asu = `https://telegra.ph/file/00018dab77a6cea81523e.jpg`
            setTimeout( async () => {
                const vio = Math.ceil(Math.random() * 70) 
                const pikan = Math.ceil(Math.random() * 15)
                addStone(m.sender, vio)
                addIkan(m.sender, pikan)
                haruka.sendMessage(m.chat, {image:{url: asu}, caption: `*Congratulation 🎊*${enter}${enter}Kamu mendapatkan *${vio}* batu dan *${pikan}* ikan${enter}${enter}Cek inventory anda dengan cara ketik ${prefix}inventory`}, {quoted:m})
            }, 2000);
            setTimeout( () => {
                newReply('Sedang berpetualang, silahkan tunggu...')
            }, 0) 

        } else if (tempsa === 'chiltawa woods') {
            let gos = `https://telegra.ph/file/77c3badc9f97d6589a30f.jpg`
            setTimeout( async () => {
                const tesaaq = Math.ceil(Math.random() * 110) 
                const ise = Math.ceil(Math.random() * 20)
                addStone(m.sender, tesaaq)
                addKayu(m.sender, ise)
                haruka.sendMessage(m.chat, {image:{url:gos},caption: `*Congratulation 🎊*${enter}${enter}Kamu mendapatkan *${tesaaq}* batu dan *${ise}* kayu${enter}${enter}Cek inventory anda dengan cara ketik ${prefix}inventory`}, {quoted:m})
            }, 2000);
            setTimeout( () => {
                newReply('Sedang berpetualang, silahkan tunggu...')
            }, 0)

        } else if (tempsa === 'cochher sea') { 
            let seae = `https://telegra.ph/file/eabfc907cfc447386b0c0.jpg`
            setTimeout( async () => {
                const feds = Math.ceil(Math.random() * 65)
                addIkan(m.sender, feds)
                haruka.sendMessage(m.chat, {image:{url: seae},caption: `*Congratulation 🎊*${enter}${enter}Kamu mendapatkan *${feds}* ikan${enter}${enter}Cek inventory anda dengan cara ketik ${prefix}inventory`}, {quoted:m})
            }, 2000);
            setTimeout( () => {
                newReply('Sedang berpetualang, silahkan tunggu...')
            }, 0)

        } else if (tempsa === 'limingstall mountains') {
            let seoe = `https://telegra.ph/file/19a10ff95c31af10267e4.jpg`
            setTimeout(() => {
                const fads = Math.ceil(Math.random() * 50)
                const fids = Math.ceil(Math.random() * 80)
                addOre(m.sender, fads)
                addStone(m.sender, fids)
                haruka.sendMessage(m.chat, {image:{url:seoe}, caption: `*Congratulation 🎊*${enter}${enter}Kamu mendapatkan *${fads}* copper ore dan ${fids} batu${enter}${enter}Cek inventory anda dengan cara ketik ${prefix}inventory`},{quoted:m})
            }, 2000);
            setTimeout( () => {
                newReply('Sedang berpetualang, silahkan tunggu...')
            }, 0)

        } else if (tempsa === 'chade mountain') {
            let seye = `https://telegra.ph/file/efdcd7d07dd22294695a8.jpg`
            setTimeout( () => {
                const pore = Math.ceil(Math.random() * 40)
                const pone = Math.ceil(Math.random() * 60)
                addOre(m.sender, pore)
                addStone(m.sender, pone)
                haruka.sendMessage(m.chat, {image:{url:seye}, caption: `*Congratulation 🎊*${enter}${enter}Kamu mendapatkan *${pore}* copper ore dan ${pone} batu${enter}${enter}Cek inventory anda dengan cara ketik ${prefix}inventory`},{quoted:m})
            }, 3000);
            setTimeout( () => {
                newReply('Sedang berpetualang, silahkan tunggu...')
            }, 0)

        } else if (tempsa === 'gerbil woods') {
            let siae = `https://telegra.ph/file/44fc684be9865c0fcb5fa.jpg`
            setTimeout( async () => {
                const tzys = Math.ceil(Math.random() * 90) 
                const isue = Math.ceil(Math.random() * 45)
                addStone(m.sender, tzys)
                addKayu(m.sender, isue)
                haruka.sendMessage(m.chat, {image:{url:siae}, caption: `*Congratulation 🎊*${enter}${enter}Kamu mendapatkan *${tzys}* batu dan *${isue}* kayu${enter}${enter}Cek inventory anda dengan cara ketik ${prefix}inventory`},{quoted:m})
            }, 2000);
            setTimeout( () => {
                newReply('Sedang berpetualang, silahkan tunggu...')
            }, 0)

        } else if (tempsa === 'moobiens grassland') {
            let bbbb = `https://telegra.ph/file/0c3fa86f57a4f6d9c4c0e.jpg`
            setTimeout( () => {
                const awqu = Math.ceil(Math.random() * 200) 
                const usui = Math.ceil(Math.random() * 20)
                addStone(m.sender, awqu)
                addKayu(m.sender, usui)
                haruka.sendMessage(m.chat, {image:{url:bbbb}, caption: `*Congratulation 🎊*${enter}${enter}Kamu mendapatkan *${awqu}* batu dan ${usui} kayu${enter}${enter}Cek inventory anda dengan cara ketik ${prefix}inventory`} ,{quoted:m})
            }, 2000);
            setTimeout( () => {
                newReply('Sedang berpetualang, silahkan tunggu...')
            }, 0)
        } else {
            let seae = await getBuffer(`https://telegra.ph/file/16857796fab2ccb6cffc2.jpg`)
            tesk = `*PILIH WILAYAH YANG INGIN KAMU JELAJAHI*


⚪ Corbiens River
🔵 Cochher Sea
⚫ Moobiens Grassland
🟣 Gerbil Woods
🟢 Chiltawa Woods
🟠 Limingstall Mountains
🔴 Chade Mountain

Example :
- ${prefix}jelajah corbiens river
`
            haruka.sendMessage(m.chat, { image: seae, caption: tesk}, {quoted: m}) 
        }
    }
    break

    case 'mancing':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        setTimeout( () => {
            const fishing = Math.ceil(Math.random() * 10)
            addIkan(m.sender, fishing)
            newReply(`*Congratulation 🎊*\n\n kamu mendapatkan *${fishing}* Ikan selama 2 menit`)
        }, 6000);
        setTimeout( () => {
            newReply('Berhasil Mendapatkan Ikan . . .' )
        }, 4000)
        setTimeout( () => {
            newReply('🎣 Menarik Kail. . .' )
        }, 3000)
        setTimeout( () => {
            newReply('🎣 Mulai Memancing . . .')
        }, 0)
    }
    break

    case 'jualikan':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        if(!text) return newReply(`Kirim perintah ${prefix + command} jumlah yg ingin di jual\n\nContoh ${prefix + command} 10`)
        bayar = args.join(' ')
        const hargaIkan = 10000
        const hasil1 = bayar * hargaIkan
        if ( getMancingIkan(m.sender) <= 1 ) return newReply(`Maaf ${pushname} ikan kamu belum cukup, minimal 2 ikan`)
        if ( getMancingIkan(m.sender) >= 1 ) {
            jualIkan(m.sender, bayar)
            addKoinUser(m.sender, hasil1)
            await newReply(`*「 PENJUALAN BERHASIL 」*${enter}${enter}*Jumlah ikan dijual:* ${bayar}${enter}*Uang didapat:* ${hasil1}${enter}${enter}*Sisa ikan:* ${getMancingIkan(m.sender)}${enter}*Sisa uang:* ${checkATMuser(m.sender)}`)
        }
    }
    break


    case 'jualcoal':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        if(!text) return newReply(`Kirim perintah ${prefix + command} jumlah yg ingin di jual\n\nContoh ${prefix + command} 10`)
        bayar = args.join(' ')
        const hargaCoal = 15000
        const hasil2 = bayar * hargaCoal
        if ( getMiningcoal(m.sender) <= 1 ) return newReply(`Maaf ${pushname} kamu tidak punya coal`)
        if ( getMiningcoal(m.sender) >= 1 ) {
            jualcoal(m.sender, bayar)
            addKoinUser(m.sender, hasil2)
            await newReply(`*「 PENJUALAN BERHASIL 」*${enter}${enter}*Jumlah Coal dijual:* ${bayar}${enter}*Uang didapat:* ${hasil2}${enter}${enter}*Sisa coal:* ${getMiningcoal(m.sender)}${enter}*Sisa uang:* ${checkATMuser(m.sender)}`)
        }
    }
    break

    case 'lebur':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        if(!text) return newReply(`Kirim perintah ${prefix + command} jumlah yg ingin di jual\n\nContoh ${prefix + command} 10`)
        bayar = args.join(' ')
        const hargaOre = 2
        const hasil3 = bayar * hargaOre
        if ( getMiningore(m.sender) <= 1 ) return newReply(`Maaf ${pushname} ore kamu belum cukup, minimal 2 ore`)
        if ( getMiningore(m.sender) >= 1 ) {
            jualore(m.sender, bayar)
            addIngot(m.sender, hasil3)
            await newReply(`*「 LEBUR BERHASIL 」*\n\n*Jumlah Ore dilebur :* ${bayar}\n*Ingot didapat:* ${hasil3}\n\n*Sisa Ore:* ${getMiningore(m.sender)}`)
        }
    }
    break

    case 'jualstone':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        if(!text) return newReply(`Kirim perintah ${prefix + command} jumlah yg ingin di jual\n\nContoh ${prefix + command} 10`)
        bayar = args.join(' ')
        const hargaStone = 900
        const hasil4 = bayar * hargaStone
        if ( getMiningstone(m.sender) <= 1 ) return newReply(`Maaf ${pushname} stone kamu belum cukup, minimal 2 stone`)
        if ( getMiningstone(m.sender) >= 1 ) {
            jualstone(m.sender, bayar)
            addKoinUser(m.sender, hasil4)
            await newReply(`*「 PENJUALAN BERHASIL 」*${enter}${enter}*Jumlah Batu dijual:* ${bayar}${enter}*Uang didapat:* ${hasil4}${enter}${enter}*Sisa Batu:* ${getMiningstone(m.sender)}${enter}*Sisa uang:* ${checkATMuser(m.sender)}`)
        }
    }
    break

    case 'jualingot':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        if(!text) return newReply(`Kirim perintah ${prefix + command} jumlah yg ingin di jual\n\nContoh ${prefix + command} 10`)
        bayar = args.join(' ')
        const hargaIngot = 35000
        const hasil5 = bayar * hargaIngot
        if ( getMiningingot(m.sender) <= 1 ) return newReply(`Maaf ${pushname} ingot kamu belum cukup, minimal 2 ingot`)
        if ( getMiningingot(m.sender) >= 1 ) {
            jualingot(m.sender, bayar)
            addKoinUser(m.sender, hasil5)
            await newReply(`*「 PENJUALAN BERHASIL 」*${enter}${enter}*Jumlah Ingot dijual:* ${bayar}${enter}*Uang didapat:* ${hasil5}${enter}${enter}*Sisa Ingot:* ${getMiningingot(m.sender)}${enter}*Sisa uang:* ${checkATMuser(m.sender)}`)
        }
    }
    break

    case 'jualkayu':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        if(!text) return newReply(`Kirim perintah ${prefix + command} jumlah yg ingin di jual\n\nContoh ${prefix + command} 10`)
        bayar = args.join(' ')
        const hargaKayu = 18000
        const hasil6 = bayar * hargaKayu
        if ( getNebangKayu(m.sender) <= 1 ) return newReply(`Maaf ${pushname} kayu kamu belum cukup, minimal 2 kayu`)
        if ( getNebangKayu(m.sender) >= 1 ) {
            jualkayu(m.sender, bayar)
            addKoinUser(m.sender, hasil6)
            await newReply(`*「 PENJUALAN BERHASIL 」*${enter}${enter}*Jumlah Kayu dijual:* ${bayar}${enter}*Uang didapat:* ${hasil6}${enter}${enter}*Sisa Kayu :* ${await getNebangKayu(m.sender)}${enter}*Sisa uang:* ${await checkATMuser(m.sender)}`)
        }
    }
    break

    case 'nebang':{
        setTimeout( () => {
            const oreo = Math.ceil(Math.random() * 20)
            addKayu(m.sender, oreo)
            newReply(`*Congratulation 🎊*${enter}${enter}kamu mendapatkan *${oreo}*kayu selama 2 menit`)
        }, 2000);
        setTimeout( () => {
            newReply('Sedang menebang, silahkan tunggu...')
        }, 0)
    }
    break

    case 'goplanet':{
        setTimeout( () => {
            const bertualang = Math.ceil(Math.random() * 100)
            const goplanet =['merkurius','venus','mars','jupiter','saturnus','neptunus','uranus']
            const planetari = goplanet[Math.floor(Math.random() * goplanet.length)]
            addPlanet(m.sender, bertualang)
            newReply(`*Congratulation 🎊*${enter}${enter}kamu mendapatkan *${bertualang} bahan kimia dari ${planetari}* selama 2 tahun`)
        }, 2000);
        setTimeout( () => {
            newReply('Sedang meroket 😱, silahkan tunggu... 2 tahun')
        }, 0)
    }
    break

    case 'jualbahankimia':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdventure) return newReply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
        if(!text) return newReply(`Kirim perintah ${prefix + command} jumlah yg ingin di jual\n\nContoh ${prefix + command} 10`)
        buayar = args.join(' ')
        const hargakimia = 1000
        const dapetin = buayar * hargakimia
        if ( getBertualangPlanet(m.sender) <= 1 ) return newReply(`maaf ${pushname} kamu tidak punya bahankimia`)
        if ( getBertualangPlanet(m.sender) >= 1 ) {
            jualbahankimia(m.sender, buayar)
            addKoinUser(m.sender, dapetin)
            await newReply(`*「 PENJUALAN BERHASIL 」*${enter}${enter}*Jumlah bahankimia dijual:* ${buayar}${enter}*Uang didapat:* ${dapetin}${enter}${enter}*Sisa bahankimia:* ${getBertualangPlanet(m.sender)}${enter}*Sisa uang:* ${checkATMuser(m.sender)}${enter}${enter}`)
        }
    }
    break

// Downloader Menu
    case 'play': 
    case 'ytplay':{
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return
        if (!text) return newReply(`Example : ${prefix + command} Lagu sad`)
        try {
            let search = await yts(`${text}`);
            let { videoId, image, title, views, duration, author, ago, url, description } = search.all[0];
            let caption = `
「 *YOUTUBE PLAY* 」

🆔 ID : ${videoId}
💬 Title : ${title}
📺 Views : ${views}
⏰ Duration : ${duration.timestamp}
▶️ Channel : ${author.name}
📆 Upload : ${ago}
🔗 URL Video : ${url}
📝 Description : ${description}
`.trim();
            const repf = await haruka.sendMessage(m.chat, {
                image: {url: process}, 
                caption: caption
            }, {
                quoted: m
            })
            const data = await fetchJson(`https://api.khaliddesu.my.id/api/savetube?url=${url}&type=audio`)
            await haruka.sendMessage(m.chat, { 
                audio: {url: data.result}, 
                mimetype: 'audio/mpeg' 
            }, { 
                quoted: repf 
            })
        } catch (err) {
            console.log(err)
            m.reply(`*Data tidak ditemukan!* ☹️`)
        }
    }
    limitAdd(m.sender, limit)
    break

    case 'ytaudio': 
    case 'ytmp3':{
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return
        if (!text) return
        if (!text.includes('youtu')) return
        try {
            let search = await yts(`${text}`);
            let { videoId, image, title, views, duration, author, ago, url, description } = search.all[0];
            let caption = `
「 *YOUTUBE PLAY* 」

🆔 ID : ${videoId}
💬 Title : ${title}
📺 Views : ${views}
⏰ Duration : ${duration.timestamp}
▶️ Channel : ${author.name}
📆 Upload : ${ago}
🔗 URL Video : ${url}
📝 Description : ${description}
`.trim();
            const repf = await haruka.sendMessage(m.chat, {
                image: {url: process}, 
                caption: caption
            }, {
                quoted: m
            })
            const data = await fetchJson(`https://api.khaliddesu.my.id/api/savetube?url=${url}&type=audio`)
            await haruka.sendMessage(m.chat, { 
                audio: {url: data.result}, 
                mimetype: 'audio/mpeg' 
            }, { 
                quoted: repf 
            })
        } catch (err) {
            console.log(err)
            m.reply(`*Data tidak ditemukan!* ☹️`)
        }
    }
    limitAdd(m.sender, limit)
    break

    case 'ytmp4': 
    case 'ytvideo': 
    case 'ytv': {
        if (!text.includes('youtu')) return
        const vidId = ((_a = /(?:youtu\.be\/|youtube\.com(?:\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/|embed\/|v\/|m\/|watch\?(?:[^=]+=[^&]+&)*?v=))([^"&?\/\s]{11})/gm.exec(text)) === null || _a === void 0 ? void 0 : _a[1]) || "";
        const result = await yts({ 
            videoId: vidId, 
            hl: 'id', 
            gl: 'ID' 
        })
        try {
            const data = await fetchJson(`https://api.khaliddesu.my.id/api/savetube?url=${result.url}&type=video`)
            await haruka.sendMessage(m.chat, { 
                video: {url: data.result},
                caption: 'Done! ✅',
            }, { 
                quoted: m 
            })
        } catch (err) {
            console.log(err)
            m.reply(`*Data tidak ditemukan!* ☹️`)
        }
    }
    break

    case 'instagram': 
    case 'ig': 
    case 'igdl': 
    case 'igvideo': 
    case 'instavideo': 
    case 'instavid': 
    case 'igreels': 
    case 'instareels': 
    case 'instareel': 
    case 'igtv': 
    case 'instatv':{
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) return newReply(`Gunakan dengan cara ${prefix + command} *url*\n\n_Contoh_\n\n${prefix + command} https://www.instagram.com/reel/Cr5AXBQvBC1/?igshid=MzRlODBiNWFlZA==`)
        await newReply(mess.wait)
        try {
            let anu = await fetchJson(`https://api.zeeoneofc.my.id/api/downloader/instagram-video?url=${text}&apikey=${setting.BotKey}`)
            haruka.sendMessage(m.chat, { video: { url: anu.result.url}, caption: `Done Sayang >///<\n\nNote : If the video cannot be played, please type .ig2 *url*`}, {quoted: m})
        }catch (error) {
            newReply(`Sorry this video can't be download, Please try typing .ig2 *url*`);
        }
        limitAdd(m.sender, limit)
    }
    break

    case 'igphoto': 
    case 'instaphoto': 
    case 'instafoto': 
    case 'igfoto': {
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) return newReply(`Gunakan dengan cara ${prefix + command} *url*\n\n_Contoh_\n\n${prefix + command} https://www.instagram.com/reel/Cr5AXBQvBC1/?igshid=MzRlODBiNWFlZA==`)
        await newReply(mess.wait)
        let anu = await fetchJson(`https://skizo.tech/api/igdl?url=${text}&apikey=${setting.XznKey}`)
        for (let imgs of anu.media)
        haruka.sendMessage(m.chat, { image: { url: imgs}, caption: `Done Sayang >///<`}, {quoted: m})
    }
    limitAdd(m.sender, limit)
    break

    case 'ttslide': 
    case 'tiktokslide':{
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} *query*\n\n_Contoh_\n\n${prefix+command} https://vt.tiktok.com/ZSL36LfEP/`)
        await newReply(mess.wait)
        let ban = m.mentionedJid[0] || m.sender || haruka.parseMention(args[0]) || (args[0].replace(/[@.+-]/g, '').replace(' ', '') + '@s.whatsapp.net') || '';
        try {
            let anu = await fetchJson(`https://api.yanzbotz.my.id/api/downloader/tiktok?url=${text}`)
            for (let slide of anu.result.image) {
                await sleep(1500)
                await haruka.sendFile(ban, slide, null, ``, m)
            }
            await haruka.sendMessage(ban, {text: `Username : ${anu.result.username}\nvDeskripsi : ${anu.result.description}`}, {quoted: m})
            return haruka.sendMessage(m.chat, {text: `Done?`}, {quoted: m})
        } catch (error) {
            newReply(`Sorry this video can't be download\n\nRequest failed with status code *404*`);
        }
    }
    limitAdd(m.sender, limit)
    break

    case 'tiktokmp4': 
    case 'tt': 
    case 'ttnowm': 
    case 'tiktokwm': 
    case 'tiktoknowm': 
    case 'tiktok':{
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} *url*\n\n_Contoh_\n\n${prefix+command} https://vt.tiktok.com/ZS8KdFQcQ/`)
        await newReply(mess.wait)
        try {
            let anu = await fetchJson(`https://api.zeeoneofc.my.id/api/downloader/tiktok?apikey=${setting.BotKey}&url=${text}`)
            haruka.sendMessage(m.chat, { video: { url: anu.result.nowm}, caption: `Done Sayang >///<`}, {quoted: m})
        } catch (error) {
            newReply(`Sorry this video can't be download\n\nRequest failed with status code *400*`);
        }
        limitAdd(m.sender, limit)
    }
    break

    case 'tiktokmp3': 
    case 'ttmp3': 
    case 'tiktokaudio':{
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} *url*\n\n_Contoh_\n\n${prefix+command} https://vt.tiktok.com/ZS8KdFQcQ/`)
        await newReply(mess.wait)
        let anu = await fetchJson(`https://api.zeeoneofc.my.id/api/downloader/tiktok?apikey=${setting.BotKey}&url=${text}`)
        const aud = anu.result.audio
        haruka.sendMessage(m.chat, {audio : {url : aud}, mimetype:'audio/mpeg'}, {quoted:m})
    }
    limitAdd(m.sender, limit)
    break

    case 'gddl':
    case 'gdrivedl':
    case 'gdrive': {
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) return newReply(`Gunakan dengan cara ${prefix + command} *url*`)
        if (!text.includes('drive')) return newReply(mess.error.Iv)
        try {
            let res = await downloader.GDriveDl(text)
            if (res.error) return m.reply("Link Invalid!")
            haruka.sendMessage(m.chat, {
                document: {
                    url: res.downloadUrl
                },
                mimetype: res.mimetype,
                fileName: res.fileName,
                caption: `*GOOGLE DRIVE*

*Nama:* ${res.fileName}
*Size:* ${res.fileSize}
*Type:* ${res.mimetype}
`,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        title: `Google Drive🚀`,
                        previewType: "PHOTO",
                        thumbnailUrl: `https://pomf2.lain.la/f/e0flxz5u.png`,
                        sourceUrl: text
                    }
                }
            }, {
                quoted: m
            })
        } catch (error) {
            console.log(error);
        }
    }
    break

    case 'mediafire':
    case 'mfire':
    case 'mfdl': {
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} *url*`)
        if (!isUrl(text)) return newReply(mess.error.Iv)
        if (!text.includes('mediafire.com')) return newReply(mess.error.Iv)
        let url = text.replace("https://www.mediafire.com/file", "https://www.mediafire.com/download")
        try {
            let response = await downloader.mediafireDl(url)
            fileNama = decodeURIComponent(response[0].nama)
            let media = await getBuffer(response[0].link)
            if (response[0].mime.includes('mp4')) {
            haruka.sendMessage(m.chat, {
                document: media,
                fileName: fileNama,
                mimetype: 'video/mp4',
                caption: `*</> MEDIAFIRE DOWN </>*

*Name* : ${response[0].nama}
*Size* : ${response[0].size}
*Jenis* : ${response[0].mime}
`
                }, {
                    quoted: m
                })
            } else if (response[0].mime.includes('mp3')) {
                haruka.sendMessage(m.chat, {
                    document: media,
                    fileName: fileNama,
                    mimetype: 'audio/mp3'
                }, {
                    quoted: m
                })
            } else {
                haruka.sendMessage(m.chat, {
                    document: media,
                    fileName: fileNama,
                    mimetype: 'application/' + response[0].mime,
                    caption: `*</> MEDIAFIRE DOWN </>*

*Name* : ${response[0].nama}
*Size* : ${response[0].size}
*Jenis* : ${response[0].mime}
`,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        externalAdReply: {
                            title: `MediaFire🔥`,
                            previewType: "PHOTO",
                            thumbnailUrl: `https://pomf2.lain.la/f/jgb2lgdx.jpg`,
                            sourceUrl: text
                        }
                    }
                }, {
                    quoted: m
                })
            }
        } catch (error) {
            try {
                let {
                    response
                } = await fetchJson(`https://api.vreden.my.id/api/mediafiredl?url=${url}`)
                fileNama = decodeURIComponent(response[0].nama)
                let media = await getBuffer(response[0].link)
                if (response[0].mime.includes('mp4')) {
                    haruka.sendMessage(m.chat, {
                        document: media,
                        fileName: fileNama,
                        mimetype: 'video/mp4'
                    }, {
                        quoted: m
                    })
                } else if (response[0].mime.includes('mp3')) {
                    haruka.sendMessage(m.chat, {
                        document: media,
                        fileName: fileNama,
                        mimetype: 'audio/mp3'
                    }, {
                        quoted: m
                    })
                } else {
                    haruka.sendMessage(m.chat, {
                        document: media,
                        fileName: fileNama,
                        mimetype: 'application/' + response[0].mime
                    }, {
                        quoted: m
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    break

    case 'gitclone': {
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        let regx = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} *url*\n\n_Contoh_\n\n${prefix+command} https://github.com/`)
        if (!regx.test(text)) return newReply('Linknya salah')
        try {
            let [, usr, repo] = text.match(regx) || []
            let repos = repo.replace(/.git$/, '')
            let hasdl = `https://api.github.com/repos/${usr}/${repos}/zipball`
            let namafile = (await fetch(hasdl, {
                method: 'HEAD'
            })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
            haruka.sendMessage(m.chat, {
                document: {
                    url: hasdl
                },
                mimetype: 'application/zip',
                fileName: namafile
            }, {
                quoted: m
            })
        } catch (error) {
            console.log(error);
        }
    }
    break

    case 'capcut': {
        if (!text) return m.warning(`Gunakan dengan cara ${prefix + command} *url*\n\n_Contoh_\n\n${prefix + command} https://www.capcut.net/sharevideo?template_id=7239111787965205762&language=in&region=ID`)
        try {
            let anu = await downloader.capcutdl(text)
            haruka.sendMessage(m.chat, {
                video: {
                    url: `https://ssscap.net${anu.originalVideoUrl}`
                },
                caption: `*${anu.title}*\n\n • Desk: ${anu.description}\n • Digunakan: ${anu.usage}`
            }, {
                quoted: m
            })
        } catch (error) {
            console.log(error);
        }
    }
    break

    // Group Menu
    case 'autoaigrup':
    case 'aigrup': 
    case 'autoaigc':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins && !isCreator) return newReply(mess.GrupAdmin)
        if (args[0] === 'on') {
            if (isAutoAiGc) return newReply(`Udah aktif`)
            openaigc.push(m.chat)
            fs.writeFileSync('./database/openaigc.json', JSON.stringify(openaigc, null, 2))
            newReply('Successfully Activate Auto AI')
        } else if (args[0] === 'off') {
            if (!isAutoAiGc) return newReply(`Udah nonaktif`)
            let anu = openaigc.indexOf(m.chat)
            openaigc.splice(anu, 1)
            fs.writeFileSync('./database/openaigc.json', JSON.stringify(openaigc, null, 2))
            newReply('Successfully Disabling Auto AI')
        } else {
            newReply(`${prefix+command} on -- _mengaktifkan_\n${prefix+command} off -- _Menonaktifkan_`)
        }
    }
break

    case 'afk':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (isAfkOn) return
        let reason = text ? text : 'Nothing.'
        addAfkUser(m.sender, Date.now(), reason, afknye)
        haruka.sendTextWithMentions(m.chat, `@${m.sender.split('@')[0]} sedang afk\nAlasan : ${reason}`, m)
    break

    case 'welcome':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins && !isCreator) return newReply(mess.GrupAdmin)
        if (args[0] === 'on') {
            if (isWelcome) return newReply(`Udah on`)
            _welcome.push(m.chat)
            fs.writeFileSync('./database/welcome.json', JSON.stringify(_welcome, null, 2))
            newReply('Sukses mengaktifkan welcome di grup ini')
        } else if (args[0] === 'off') {
            if (!isWelcome) return newReply(`Udah off`)
            let anu = _welcome.indexOf(m.chat)
            _welcome.splice(anu, 1)
            fs.writeFileSync('./database/welcome.json', JSON.stringify(_welcome, null, 2))
            newReply('Sukses menonaktifkan welcome di grup ini')
        } else {
            newReply(`${prefix+command} on -- _mengaktifkan_\n${prefix+command} off -- _Menonaktifkan_`)
        }
    break

    case 'left': 
    case 'goodbye':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins && !isCreator) return newReply(mess.GrupAdmin)
        if (args[0] === 'on') {
            if (isLeft) return newReply(`Udah on`)
            _left.push(m.chat)
            fs.writeFileSync('./database/left.json', JSON.stringify(_left, null, 2))
            newReply('Sukses mengaktifkan goodbye di grup ini')
        } else if (args[0] === 'off') {
            if (!isLeft) return newReply(`Udah off`)
            let anu = _left.indexOf(m.chat)
            _left.splice(anu, 1)
            fs.writeFileSync('./database/welcome.json', JSON.stringify(_left, null, 2))
            newReply('Sukses menonaktifkan goodbye di grup ini')
        } else {
            newReply(`${prefix+command} on -- _mengaktifkan_\n${prefix+command} off -- _Menonaktifkan_`)
        }
    break

    case 'pppanjanggc': 
    case 'ppgcfull': 
    case 'setppgc2':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins) return newReply(mess.GrupAdmin)
        if (!isBotAdmins) return newReply(mess.BotAdmin)
        if (!quoted) return newReply(`Reply foto dgn caption ${prefix + command}`)
        if (!/image/.test(mime)) return newReply(`Reply foto dgn caption ${prefix + command}`)
        if (/webp/.test(mime)) return newReply(`Reply foto dgn caption ${prefix + command}`)
        let media = await haruka.downloadAndSaveMediaMessage(quoted)
        let { img } = await generateProfilePicture(media)
        await haruka.query({
            tag: 'iq',
            attrs: {
                to: m.chat,
                type:'set',
                xmlns: 'w:profile:picture'
            },
            content: [
                {
                    tag: 'picture',
                    attrs: { type: 'image' },
                    content: img
                } 
            ]
        })
        newReply('Done!!!')
    }
    break

    case 'setopen':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isCreator) return newReply(mess.OnlyOwner)
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} *teks open*\n\n_Contoh_\n\n${prefix+command} Halo Semuanya, group sudah buka`)
        if (isSetOpen(m.chat, set_open)) return newReply(`Set open sudah ada sebelumnya`)
        addSetOpen(text, m.chat, set_open)
        newReply(`✅ Done set open!`)
    }
    break

    case 'changeopen': 
    case 'changesetopen':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isCreator) return newReply(mess.OnlyOwner)
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} *teks open*\n\n_Contoh_\n\n${prefix+command} Halo Semuanya, group sudah buka`)
        if (isSetOpen(m.chat, set_open)) {
            changeSetOpen(text, m.chat, set_open)
            newReply(`Sukses ubah set open teks!`)
        } else {
            addSetOpen(text, m.chat, set_open)
        newReply(`Sukses ubah set open teks!`)
    }
    break

    case 'delsetopen':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isCreator) return newReply(mess.OnlyOwner)
        if (!isSetOpen(m.chat, set_open)) return newReply(`Belum ada set open di sini..`)
        removeSetOpen(m.chat, set_open)
        newReply(`Sukses delete set open`)
    break

    case 'setclose':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isCreator) return newReply(mess.OnlyOwner)
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} *teks close*\n\n_Contoh_\n\n${prefix+command} Halo Semuanya, group close dulu ya`)
        if (isSetClose(m.chat, set_close)) return newReply(`Set close sudah ada sebelumnya`)
        addSetClose(text, m.chat, set_close)
        newReply(`✅ Done set close!`)
    }
    break

    case 'changeclose': 
    case 'changesetclose':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isCreator) return newReply(mess.OnlyOwner)
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} *teks close*\n\n_Contoh_\n\n${prefix+command} Halo Semuanya, group close dulu ya`)
        if (isSetClose(m.chat, set_close)) {
            changeSetClose(text, m.chat, set_close)
            newReply(`Sukses ubah set close teks!`)
        } else {
            addSetClose(text, m.chat, set_close)
            newReply(`Sukses ubah set close teks!`)
        }
    break

    case 'delsetclose':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isCreator) return newReply(mess.OnlyOwner)
        if (!isSetClose(m.chat, set_close)) return newReply(`Belum ada set close di sini..`)
        removeSetClose(m.chat, set_close)
        newReply(`Sukses delete set close`)
    break

    case 'setwelcome':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isCreator && !isAdmins) return newReply(mess.OnlyOwner)
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} *teks_welcome*\n\n_Contoh_\n\n${prefix+command} Halo @user, Selamat datang di @group`)
        if (isSetWelcome(m.chat, set_welcome_db)) return newReply(`Set welcome already active`)
        addSetWelcome(text, m.chat, set_welcome_db)
        newReply(`Successfully set welcome!`)
    break

    case 'changewelcome':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isCreator && !isAdmins) return newReply(mess.OnlyOwner)
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} *teks_welcome*\n\n_Contoh_\n\n${prefix+command} Halo @user, Selamat datang di @group`)
        if (isSetWelcome(m.chat, set_welcome_db)) {
            changeSetWelcome(q, m.chat, set_welcome_db)
            newReply(`Sukses change set welcome teks!`)
        } else {
            addSetWelcome(q, m.chat, set_welcome_db)
            newReply(`Sukses change set welcome teks!`)
        }
    break

    case 'delsetwelcome':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isCreator && !isAdmins) return newReply(mess.OnlyOwner)
        if (!isSetWelcome(m.chat, set_welcome_db)) return newReply(`Belum ada set welcome di sini..`)
        removeSetWelcome(m.chat, set_welcome_db)
        newReply(`Sukses delete set welcome`)
    break

    case 'setleft':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isCreator && !isAdmins) return newReply(mess.OnlyOwner)
        if (!text) return newReply(`Gunakan dengan cara ${prefix + command} *teks_left*\n\n_Contoh_\n\n${prefix + command} Halo @user, Selamat tinggal dari @group`)
        if (isSetLeft(m.chat, set_left_db)) return newReply(`Set left already active`)
        addSetLeft(q, m.chat, set_left_db)
        newReply(`Successfully set left!`)
    break

    case 'changeleft':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isCreator && !isAdmins) return newReply(mess.OnlyOwner)
        if (!text) return newReply(`Gunakan dengan cara ${prefix + command} *teks_left*\n\n_Contoh_\n\n${prefix + command} Halo @user, Selamat tinggal dari @group`)
        if (isSetLeft(m.chat, set_left_db)) {
            changeSetLeft(q, m.chat, set_left_db)
            newReply(`Sukses change set left teks!`)
        } else {
            addSetLeft(q, m.chat, set_left_db)
            newReply(`Sukses change set left teks!`)
        }
    break

    case 'delsetleft':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isCreator && !isAdmins) return newReply(mess.OnlyOwner)
        if (!isSetLeft(m.chat, set_left_db)) return newReply(`Belum ada set left di sini..`)
        removeSetLeft(m.chat, set_left_db)
        newReply(`Sukses delete set left`)
    break

    case 'linkgrup': 
    case 'linkgroup': 
    case 'linkgc': {
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isBotAdmins) return newReply(mess.BotAdmin)
        let response = await haruka.groupInviteCode(m.chat)
        haruka.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`, m, { detectLink: true })
    }
    break

    case 'setppgroup': 
    case 'setppgrup': 
    case 'setppgc': {
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins) return newReply(mess.GrupAdmin)
        if (!isBotAdmins) return newReply(mess.BotAdmin)
        if (!quoted) return newReply (`Kirim/Reply Image Dengan Caption ${prefix + command}`)
        if (!/image/.test(mime)) return newReply (`Kirim/Reply Image Dengan Caption ${prefix + command}`)
        if (/webp/.test(mime)) return newReply (`Kirim/Reply Image Dengan Caption ${prefix + command}`)
        let media = await haruka.downloadAndSaveMediaMessage(quoted)
        await haruka.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
        newReply('Berhasil mengganti pp group')
    }
    break

    case 'setname': 
    case 'setsubject': {
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins) return newReply(mess.GrupAdmin)
        if (!isBotAdmins) return newReply(mess.BotAdmin)
        if (!text) return newReply(`Example ${prefix + command} WhatsApp Bot`)
        await haruka.groupUpdateSubject(m.chat, text).then((res) => newReply('Done')).catch((err) => newReply(jsonformat(err)))
    }
    break

    case 'setdesc': 
    case 'setdesk': {
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins) return newReply(mess.GrupAdmin)
        if (!isBotAdmins) return newReply(mess.BotAdmin)
        if (!text) return newReply(`Example ${prefix + command} WhatsApp Bot`)
        await haruka.groupUpdateDescription(m.chat, text).then((res) => newReply('Done')).catch((err) => newReply(jsonformat(err)))
    }
    break

    case 'antilink':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins && !isCreator) return newReply(mess.GrupAdmin)
        if (!isBotAdmins) return newReply(mess.BotAdmin)
        if (args[0] === 'on') {
            if (isAntiLink) return newReply(`Udah aktif`)
            antilink.push(m.chat)
            fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
            newReply('Successfully Activate Antilink In This Group')
        } else if (args[0] === 'off') {
            if (!isAntiLink) return newReply(`Udah nonaktif`)
            let anu = antilink.indexOf(m.chat)
            antilink.splice(anu, 1)
            fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
            newReply('Successfully Disabling Antilink In This Group')
        } else {
            newReply(`${prefix+command} on -- _mengaktifkan_\n${prefix+command} off -- _Menonaktifkan_`)
        }
    }
    break

    case 'antiwame':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins) return newReply(mess.GrupAdmin)
        if (!isBotAdmins) return newReply(mess.BotAdmin)
        if (args[0] === 'on') {
            if (isAntiWame) return newReply(`Udah aktif`)
            antiwame.push(m.chat)
            fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame, null, 2))
            newReply('Successfully Activate Antiwame In This Group')
        } else if (args[0] === 'off') {
            if (!isAntiWame) return newReply(`Udah nonaktif`)
            let anu = antiwame.indexOf(m.chat)
            antiwame.splice(anu, 1)
            fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame, null, 2))
            newReply('Successfully Disabling Antiwame In This Group')
        } else {
            newReply(`${prefix+command} on -- _mengaktifkan_\n${prefix+command} off -- _Menonaktifkan_`)
        }
    }
    break

    case 'open': 
    case 'buka':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins) return newReply(mess.GrupAdmin)
        if (!isBotAdmins) return newReply(mess.BotAdmin)
        haruka.groupSettingUpdate(m.chat, 'not_announcement')
        const textOpen = await getTextSetOpen(m.chat, set_open);
        newReply(textOpen || `Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
    }
    break

    case 'close': 
    case 'tutup':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins) return newReply(mess.GrupAdmin)
        if (!isBotAdmins) return newReply(mess.BotAdmin)
        haruka.groupSettingUpdate(m.chat, 'announcement')
        const textClose = await getTextSetClose(m.chat, set_close);
        newReply(textClose || `Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
    break

    case 'add': {
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isCreator && !isAdmins) return newReply(mess.GrupAdmin)
        if (!isBotAdmins) return newReply(mess.BotAdmin)
        let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
        await haruka.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => newReply('Sukses add member✅')).catch((err) => newReply('❌ Terjadi kesalahan, mungkin nmr nya privat'))
    }
    break

    case 'kick': {
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isCreator && !isAdmins) return newReply(mess.GrupAdmin)
        if (!isBotAdmins) return newReply(mess.BotAdmin)
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
        await haruka.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => newReply('Sukses kick target✅')).catch((err) => newReply('Tag/reply pesan target yang ingin di kick!'))
    }
    break

    case 'promote': 
    case 'pm': {
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isCreator && !isAdmins) return newReply(mess.GrupAdmin)
        if (!isBotAdmins) return newReply(mess.BotAdmin)
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
        await haruka.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => newReply('Sukses promote member✅')).catch((err) => newReply('❌ Terjadi kesalahan'))
    }
    break

    case 'demote': 
    case 'dm': {
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isCreator && !isAdmins) return newReply(mess.GrupAdmin)
        if (!isBotAdmins) return newReply(mess.BotAdmin)
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
        await haruka.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => newReply('Sukses demote admin✅')).catch((err) => newReply('❌ Terjadi kesalahan'))
    }
    break

    case 'revoke':
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins) return newReply(mess.GrupAdmin)
        if (!isBotAdmins) return newReply(mess.BotAdmin)
        await haruka.groupRevokeInvite(m.chat)
        .then( res => {
            newReply(`Sukses menyetel tautan undangan grup ini`)
        }).catch(() => newReply(mess.error.api))
    break

    case 'hidetag': 
    case 'h': {
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isAdmins && !isCreator) return newReply('Lu siapa kocak?')
        haruka.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
    }
    break

    case 'checksewa': 
    case 'ceksewa': {
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (!isSewa) return newReply(`Bot tidak di sewa group ini!`)
        let ceksewa = ms(getSewaExpired(m.chat, sewa) - Date.now())
        let sewanya = `*Expire :* ${ceksewa.days} day(s) ${ceksewa.hours} hour(s) ${ceksewa.minutes} minute(s)`
        newReply(sewanya)
    }
    break

    // Game Menu
    case 'tebakgambar': {
        if (tebakgambar[m.chat]) return haruka.sendMessage(m.chat, {
            text: 'Soal ini belum selesai'
        }, {
            quoted: tebakgambar[m.chat][0]
        })
        let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')
        let result = anu[Math.floor(Math.random() * anu.length)]
        console.log('Jawaban: ' + result.jawaban)
        tebakgambar[m.chat] = [
            await haruka.sendMessage(m.chat, {
                image: {
                    url: result.img
                },
                caption: `Silahkan Jawab Soal Di Atas Ini\n\nDeskripsi : ${result.deskripsi}\nWaktu : ${(120000 / 1000).toFixed(2)} detik`
            }, {
                quoted: m
            }), result, 250,
            setTimeout(() => {
                if (tebakgambar[m.chat]) {
                    return newReply (waktuHabis(result.jawaban), footxt, m)
                    delete tebakgambar[m.chat]
                }
            }, 120000)
        ]
    }
    break

    case 'tebakkata': {
        if (tebakkata[m.chat]) return haruka.sendMessage(m.chat, {
            text: 'Soal ini belum selesai'
        }, {
            quoted: tebakkata[m.chat][0]
        })
        let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json')
        let result = anu[Math.floor(Math.random() * anu.length)]
        console.log('Jawaban: ' + result.jawaban)
        tebakkata[m.chat] = [
            await haruka.sendText(m.chat, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\nWaktu : ${(120000 / 1000).toFixed(2)} detik`, m), result, 250,
            setTimeout(() => {
                if (tebakkata[m.chat]) {
                    return newReply (waktuHabis(result.jawaban), footxt, m)
                    delete tebakkata[m.chat]
                }
            }, 120000)
        ]
    }
    break

    case 'tebakbendera': {
        if (tebakbendera[m.chat]) return haruka.sendMessage(m.chat, {
            text: 'Soal ini belum selesai'
        }, {
            quoted: tebakbendera[m.chat][0]
        })
        let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera2.json')
        let result = anu[Math.floor(Math.random() * anu.length)]
        console.log('Jawaban: ' + result.name)
        tebakbendera[m.chat] = [
            await haruka.sendMessage(m.chat, {
                image: {
                    url: result.img
                },
                caption: `Gambar diatas adalah bendera negara?\n\nWaktu : ${(120000 / 1000).toFixed(2)} detik`
            }, {
                quoted: m
            }),
            result, 250,
            setTimeout(() => {
                if (tebakbendera[m.chat]) {
                    return newReply (waktuHabis(result.name), footxt, m)
                    delete tebakbendera[m.chat]
                }
            }, 120000)
        ]
    }
    break

    case 'tebakkalimat': {
        if (tebakkalimat[m.chat]) return haruka.sendMessage(m.chat, {
            text: 'Soal ini belum selesai'
        }, {
            quoted: tebakkalimat[m.chat][0]
        })
        let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkalimat.json')
        let result = anu[Math.floor(Math.random() * anu.length)]
        console.log('Jawaban: ' + result.jawaban)
        tebakkalimat[m.chat] = [
            await haruka.sendText(m.chat, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\nWaktu : ${(120000 / 1000).toFixed(2)} detik`, m), result, 250,
            setTimeout(() => {
                if (tebakkalimat[m.chat]) {
                    return newReply (waktuHabis(result.jawaban), footxt, m)
                    delete tebakkalimat[m.chat]
                }
            }, 120000)
        ]
    }
    break

    case 'tebaksiapa': {
        if (siapaaku[m.chat]) return haruka.sendMessage(m.chat, {
            text: 'Soal ini belum selesai'
        }, {
            quoted: siapaaku[m.chat][0]
        })
        let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json')
        let result = anu[Math.floor(Math.random() * anu.length)]
        console.log('Jawaban: ' + result.jawaban)
        siapaaku[m.chat] = [
            await haruka.sendText(m.chat, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\nWaktu : ${(120000 / 1000).toFixed(2)} detik`, m), result, 250,
            setTimeout(() => {
                if (siapaaku[m.chat]) {
                    return newReply (waktuHabis(result.jawaban), footxt, m)
                    delete siapaaku[m.chat]
                }
            }, 120000)
        ]
    }
    break

    case 'tebakkimia': {
        if (tebakkimia[m.chat]) return haruka.sendMessage(m.chat, {
            text: 'Soal ini belum selesai'
        }, {
            quoted: tebakkimia[m.chat][0]
        })
        let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkimia.json')
        let result = anu[Math.floor(Math.random() * anu.length)]
        console.log('Jawaban: ' + result.unsur)
        tebakkimia[m.chat] = [
            await haruka.sendText(m.chat, `Apa Arti Dari Simbol : *${result.lambang}*?\nWaktu : ${(120000 / 1000).toFixed(2)} detik`, m), result, 250,
            setTimeout(() => {
                if (tebakkimia[m.chat]) {
                    return newReply (waktuHabis(result.unsur), footxt, m)
                    delete tebakkimia[m.chat]
                }
            }, 120000)
        ]
    }
    break

    case 'tebaklirik': {
        if (tebaklirik[m.chat]) return haruka.sendMessage(m.chat, {
            text: 'Soal ini belum selesai'
        }, {
            quoted: tebaklirik[m.chat][0]
        })
        let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json')
        let result = anu[Math.floor(Math.random() * anu.length)]
        console.log('Jawaban: ' + result.jawaban)
        tebaklirik[m.chat] = [
            await haruka.sendText(m.chat, `Ini Adalah Lirik Dari Lagu? : *${result.soal}*?\nWaktu : ${(120000 / 1000).toFixed(2)} detik`, m), result, 250,
            setTimeout(() => {
                if (tebaklirik[m.chat]) {
                    return newReply (waktuHabis(result.jawaban), footxt, m)
                    delete tebaklirik[m.chat]
                }
            }, 120000)
        ]
    }
    break

    case 'tebaktebakan': {
        if (tebaktebakan[m.chat]) return haruka.sendMessage(m.chat, {
            text: 'Soal ini belum selesai'
        }, {
            quoted: tebaktebakan[m.chat][0]
        })
        let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaktebakan.json')
        let result = anu[Math.floor(Math.random() * anu.length)]
        console.log('Jawaban: ' + result.jawaban)
        tebaktebakan[m.chat] = [
            await haruka.sendText(m.chat, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\nWaktu : ${(120000 / 1000).toFixed(2)} detik`, m), result, 250,
            setTimeout(() => {
                if (tebaktebakan[m.chat]) {
                    return newReply (waktuHabis(result.jawaban), footxt, m)
                    delete tebaktebakan[m.chat]
                }
            }, 120000)
        ]
    }
    break

    case 'tekateki': {
        if (tekateki[m.chat]) return haruka.sendMessage(m.chat, {
            text: 'Soal ini belum selesai'
        }, {
            quoted: tekateki[m.chat][0]
        })
        let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json')
        let result = anu[Math.floor(Math.random() * anu.length)]
        console.log('Jawaban: ' + result.jawaban)
        tekateki[m.chat] = [
            await haruka.sendText(m.chat, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\nWaktu : ${(120000 / 1000).toFixed(2)} detik`, m), result, 250,
            setTimeout(() => {
                if (tekateki[m.chat]) {
                    return newReply (waktuHabis(result.jawaban), footxt, m)
                    delete tekateki[m.chat]
                }
            }, 120000)
        ]
    }
    break

    case 'susunkata': {
        if (susunkata[m.chat]) return haruka.sendMessage(m.chat, {
            text: 'Soal ini belum selesai'
        }, {
            quoted: susunkata[m.chat][0]
        })
        let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json')
        let result = anu[Math.floor(Math.random() * anu.length)]
        console.log('Jawaban: ' + result.jawaban)
        susunkata[m.chat] = [
            await haruka.sendText(m.chat, `*Jawablah Pertanyaan Berikut :*\nSoal : ${result.soal}\nTipe : ${result.tipe}\nWaktu : ${(120000 / 1000).toFixed(2)} detik`, m), result, 250,
            setTimeout(() => {
                if (susunkata[m.chat]) {
                    return newReply (waktuHabis(result.jawaban), footxt, m)
                    delete susunkata[m.chat]
                }
            }, 120000)
        ]
    }
    break

    case 'casino':{
        if (!m.isGroup) return newReply(mess.OnlyGrup)
        if (isGame(m.sender, isCreator, gcount, glimit)) return newReply(`Limit game kamu sudah habis`)
        if (!text) return newReply(`Kirim perintah *${prefix+command}* @tag nominal`)
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
        if (fs.existsSync(`./database/${m.chat}.json`)) return newReply(`Sedang Ada Sesi, tidak dapat dijalankan secara bersamaan\nKetik *${prefix}delcasino*, untuk menghapus sesi`)
        if (!args[1]) return newReply('Masukan Nominal Nya')
        if (args[1].includes('-')) return newReply(`Jangan menggunakan -`)
        if (isNaN(parseInt(args[1]))) return newReply('Nominal Harus Berupa Angka!')
        let anu = getBalance(m.sender, balance)
        let ani = getBalance(m.mentionedJid[0], balance)
        if (anu < args[1] || anu == 'undefined') return newReply(`Balance Tidak Mencukupi, Kumpulkan Terlebih Dahulu\nKetik ${prefix}balance, untuk mengecek Balance mu!`)
        if (ani < args[1] || ani == 'undefined') return newReply(`Balance Lawan Tidak Mencukupi Untuk Bermain Denganmu\nKetik ${prefix}balance @tag untuk mengecek Balance lawanmu`)
        let casinoo = setCasino(`${m.chat}`)
        casinoo.Z = m.sender.replace('@s.whatsapp.net', '')
        casinoo.Y = users
        casinoo.nominal = parseInt(args[1])
        fs.writeFileSync(`./database/casino/${m.chat}.json`, JSON.stringify(casinoo, null, 2))
        gameAdd(m.sender, glimit)
        let starGame = `🎰 Memulai Game Casino 💰\n\n• @${m.sender.replace('@s.whatsapp.net', '')} Menantang ${text}, dengan Nominal: *$ ${parseInt(args[1])}*\n• Ketik Y/N untuk menerima atau menolak Permainan!`
        haruka.sendMessage(m.chat, { text: starGame, mentions: [m.sender, users] }, { quoted: m })
    }
    break

    case 'delcasino':
        if (fs.existsSync('./database/casino/'+m.chat+'.json')) {
        let csn = JSON.parse(fs.readFileSync('./database/casino/'+m.chat+'.json'))
        if (csn.Z.includes(m.sender)) {
            deleteCasino(m.chat)
            newReply('Berhasil Menghapus Sesi Casino')
        } else if (csn.Y.includes(m.sender)) {
            deleteCasino(m.chat)
            newReply('Berhasil Menghapus Sesi Casino')
        } else if (isAdmins) {
            deleteCasino(m.chat)
            newReply('Berhasil Menghapus Sesi Casino')
        } else if (isCreator) {
            deleteCasino(m.chat)
            newReply('Berhasil Menghapus Sesi Casino')
        } else {
            newReply('Anda tidak bisa menghapus sesi casino, karena bukan pemain!')
        }
    } else {
        newReply('Tidak ada sesi yang berlangsung')
    }
    break

    case 'lirik': 
    case 'liriklagu':{
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} *judul*\n\n_Contoh_\n\n${prefix+command} Bila Nanti`)
        await newReply(mess.wait)
        try {
            let anu = await fetchJson('http://song-lyrics-api-o0m8tth8t-azharimm.vercel.app/search?q=' + text)
            if(!anu.data) return newReply('server eror')
            limitAdd(m.sender, limit)
            let anuu = await fetchJson (anu.data[0].songLyrics)
            let { artist, songTitle, songLyrics} = anuu.data
            newReply('*Artis:* ' + artist + '\n*Title*: ' + songTitle + '\n*Lirik*: ' + songLyrics)
        } catch (error) {
            newReply(`Lirik Lagu Tidak Ditemukan`);
        }
    }
    limitAdd(m.sender, limit)
    break

    case 'pinterest': 
    case 'pin':{
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) return newReply(`Gunakan dengan cara ${prefix+command} *text*\n\n_Contoh_\n\n${prefix+command} Anime`)
        let data = await fetchJson(`https://api.khaliddesu.my.id/api/pinterest?query=${text}`)
        let anu = data.result[Math.floor(Math.random() * data.result.length)]
        haruka.sendMessage(m.chat, { image: { url: anu }, caption: 'Done Kak ✅'}, { quoted: m })
    }
    break

    case 'yts': 
    case 'ytsearch':{
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        if (!text) newReply(`Gunakan dengan cara ${prefix+command} *text*\n\n_Contoh_\n\n${prefix+command} Cara membuat bot WhatsApp`)
        let reso = await yts(`${text}`)
        let aramat = reso.all
        let tbuff = await getBuffer(aramat[0].image)
        let teks = aramat.map(v => {
            switch (v.type) {

case 'video': return `
📛 Title : *${v.title}* 
⏰ Durasi: ${v.timestamp}
🚀 Diupload ${v.ago}
😎 Views : ${v.views}
🌀 Url : ${v.url}
`.trim()

case 'channel': return `
📛 Channel : *${v.name}*
🌀 Url : ${v.url}
👻 Subscriber : ${v.subCountLabel} (${v.subCount})
🎦 Total Video : ${v.videoCount}
`.trim()
            }
        }).filter(v => v).join('\n----------------------------------------\n')
        haruka.sendMessage(m.chat, { image: tbuff, caption: teks }, { quoted: m })
        .catch ((err) => {
            newReply('Not found')
        })
    }
    break

    case 'otakudesu':{
        let check = await internet.otakudesu.ongoing()
        let response = `「 *JADWAL ANIME* 」\n\n`
        for (let i of check) {
            response += `*💬 Judul :* ${i.title}\n`
            response += `*📺 Eps :* ${i.episode}\n`
            response += `*🔗 URL :* ${i.link}\n\n`
        }
        haruka.sendMessage(m.chat, {
            text: response,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 1,
                externalAdReply: {
                    showAdAttribution: true,
                    title: 'Ini pemberitahuan Anime terbaru!',
                    mediaType: 1,
                    previewType: 1,
                    body: 'Made with ❤️ by Khalid.',
                    thumbnailUrl: pathimg,
                    renderLargerThumbnail: false,
                    mediaUrl: 'https://otakudesu.cloud',
                    sourceUrl: 'https://otakudesu.cloud'
                }
            }
        }, {
            quoted: m
        })
    }
    limitAdd(m.sender, limit)
    break

    // Random Menu
    case 'cecan':{
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        await newReply(mess.wait)
        haruka.sendMessage(m.chat, { caption: 'Jangan Lupa Post Sw Biar Mantan Panas Coy🥵', image: { url: `https://api.zahwazein.xyz/randomasupan/cecan?apikey=${setting.ZenzKey}` }}, { quoted: m })
        .catch((e) => {
            newReply(mess.error.api)
        })
        limitAdd(m.sender, limit)
    }
    break

    case 'cogan':{
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        await newReply(mess.wait)
        let query = ['cowo korea','cowo china', 'cowo Thailand']
        let datax = await pinterest(query[Math.floor(Math.random() * query.length)])
        let anu = datax[Math.floor(Math.random() * datax.length)]
        haruka.sendMessage(m.chat, { caption: 'Random Cogan', image: { url: anu }}, { quoted: m })
        .catch((e) => {
            newReply(mess.error.api)
        })
        limitAdd(m.sender, limit)
    }
    break

    case 'waifu':{
        if (isLimit(m.sender, isPremium, isCreator, limitCount, limit)) return newReply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
        const BASE_URL = 'https://api.khaliddesu.my.id/api/waifu';
        const data = await BASE_URL;        
        haruka.sendMessage(m.chat, { image: { url: data }, caption: 'Random Waifu ✅' }, {quoted: m})
        limitAdd(m.sender, limit)
    }
    break

    // Balance Menu
    case 'topglobal':{
        if (!m.isGroup)return newReply(mess.OnlyGrup)
        balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
        let top = '*── 「 TOPGLOBAL BALANCE 」 ──*\n\n'
        let arrTop = []
        let total = 10
        if (balance.length < 10) total = balance.length
        for (let i = 0; i < total; i ++){
            top += `${i + 1}. @${balance[i].id.split('@')[0]}\n=> Balance : $${balance[i].balance}\n\n`
            arrTop.push(balance[i].id)
        }
        haruka.sendTextWithMentions(m.chat, top, m)
    }
    break

    case 'toplocal':{
        if (!m.isGroup)return newReply(mess.OnlyGrup)
        balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
        let top = '*── 「 TOPLOCAL BALANCE 」 ──*\n\n'
        let arrTop = []
        let total = 10
        if (balance.length < 10) total = balance.length
        let anggroup = groupMembers.map(a => a.id)
        for (let i = 0; i < total; i ++){
            if (anggroup.includes(balance[i].id)) {
                top += `${i + 1}. @${balance[i].id.split('@')[0]}\n=> Balance : $${balance[i].balance}\n\n`
                arrTop.push(balance[i].id)
            }
        }
        haruka.sendTextWithMentions(m.chat, top, m)
    }
    break

case 'buylimit':{
if (!text) return newReply(`Gunakan dengan cara ${prefix+command} *jumlah limit yang ingin dibeli*\n\nHarga 1 limit = $50 balance`)
if (text.includes('-')) return newReply(`Jangan menggunakan -`)
if (isNaN(text)) return newReply(`Harus berupa angka`)
if (args[0] === 'infinity') return newReply(`Yahaha saya ndak bisa di tipu`)
let ane = Number(parseInt(text) * 50)
if (getBalance(m.sender, balance) < ane) return newReply(`Balance kamu tidak mencukupi untuk pembelian ini`)
kurangBalance(m.sender, ane, balance)
giveLimit(m.sender, parseInt(text), limit)
newReply(`Pembeliaan limit sebanyak ${text} berhasil\n\nSisa Balance : $${getBalance(m.sender, balance)}\nSisa Limit : ${getLimit(m.sender, limitCount, limit)}/${limitCount}`)
}
break

case 'buygamelimit': 
case 'buyglimit':{
if (!text) return newReply(`Gunakan dengan cara ${prefix+command} *jumlah game limit yang ingin dibeli*\n\nHarga 1 game limit = $50 balance\nPajak $1 / $10`)
if (text.includes('-')) return newReply(`Jangan menggunakan -`)
if (isNaN(text)) return newReply(`Harus berupa angka`)
if (text === 'infinity') return newReply(`Yahaha saya ndak bisa di tipu`)
let ane = Number(parseInt(text) * 50)
if (getBalance(m.sender, balance) < ane) return newReply(`Balance kamu tidak mencukupi untuk pembelian ini`)
kurangBalance(m.sender, ane, balance)
givegame(m.sender, parseInt(text), glimit)
newReply(`Pembeliaan game limit sebanyak ${text} berhasil\n\nSisa Balance : $${getBalance(m.sender, balance)}\nSisa Game Limit : ${cekGLimit(m.sender, gcount, glimit)}/${gcount}`)
}
break

case 'transfer': 
case 'tf':{
if (!text) return newReply(`Gunakan dengan cara ${prefix+command} *@tag nominal*\n\nContoh : ${prefix+command} @6285600793871 2000`)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
if (!users) return newReply(`Tag orang yang ingin di transfer balance`)
if (!args[1]) return newReply(`Masukkan nominal nya!`)
if (isNaN(args[1])) return newReply(`Nominal harus berupa angka!`)
if (args[1] === 'infinity') return newReply(`Yahaha saya ndak bisa di tipu`)
if (args[1].includes('-')) return newReply(`Jangan menggunakan -`)
let anu = getBalance(m.sender, balance)
if (anu < args[1] || anu == 'undefined') return newReply(`Balance Kamu Tidak Mencukupi Untuk Transfer Sebesar $${args[1]}, Kumpulkan Terlebih Dahulu\nKetik ${prefix}balance, untuk mengecek Balance mu!`)
kurangBalance(m.sender, parseInt(text), balance)
addBalance(users, parseInt(args[1]), balance)
haruka.sendTextWithMentions(m.chat, `Sukses transfer balance sebesar ${args[1]} kepada @${users.split('@')[0]}`, m)
}
break

case 'limit': 
case 'balance': 
case 'ceklimit': 
case 'cekbalance':{
let mybal = await getBalance(m.sender, balance)
let limitPrib = `${getLimit(m.sender, limitCount, limit)}/${limitCount}`
newReply(`💳 Limit : ${isPremium ? 'Unlimited' : limitPrib}\n🕹️ Limit Game : ${cekGLimit(m.sender, gcount, glimit)}/${gcount}\n🏦 Balance : $${mybal}\n\nKamu dapat membeli limit dengan ${prefix}buylimit *jumlah* dan ${prefix}buyglimit *jumlah* untuk membeli game limit\n\n*Example :*\n${prefix}buylimit 1\n${prefix}buyglimit 1\n\n*Note :*\n• Harga 1 limit = $50 balance`)
break
}

    // Storage Menu
    case 'addstiker': 
    case 'addsticker': 
    case 'addstik':{
        if (!m.key.fromMe && !isCreator) return newReply(mess.OnlyOwner)
        if (!/webp/.test(mime)) return newReply(`Contoh : ${prefix + command} halo`)
        if (!text) return newReply(`Contoh : ${prefix + command} halo`)
        if (text.includes('|')) return newReply(`Contoh : ${prefix + command} halo`)
        let media = await haruka.downloadMediaMessage(quoted)
        setiker.push(`${text}`)
        fs.writeFileSync(`./database/${text}.webp`, media)
        fs.writeFileSync('./database/stik.json', JSON.stringify(setiker))
        newReply(`Berhasil menambahkan stiker ke dalam database.`)
    }
    break

    case 'delstiker': 
    case 'delsticker': 
    case 'delstik':{
        if (!isPremium) return newReply(mess.OnlyPrem)
        if (args.length < 1) return newReply('Ketik nama stiker yang ingin dihapus dari database.')
        if (!setiker.includes(text)) return newReply('Nama tidak ada dalam database.')
        let wanu = setiker.indexOf(text)
        setiker.splice(wanu, 1)
        fs.writeFileSync('./database/stik.json', JSON.stringify(setiker))
        fs.unlinkSync(`./database/${text}.webp`)
        newReply(`Berhasil menghapus stiker dari dalam database.`)
    }
    break

    case 'liststik': 
    case 'liststiker': 
    case 'liststc':{
        let teks = 'Berikut ini adalah daftar stiker yang ada dalam database:\n\n'
        for (let i of setiker) {
            teks += `- ${i}\n`
        }
        teks += `\n*Total : ${setiker.length}*`
        newReply(teks)
    }
    break

    case 'addfoto': 
    case 'addimage': 
    case 'addphoto': 
    case 'addimg':{
        if (!m.key.fromMe && !isCreator) return newReply(mess.OnlyOwner)
        if (!/image/.test(mime)) return newReply(`Contoh : ${prefix + command} halo`)
        if (!text) return newReply(`Contoh : ${prefix + command} halo`)
        if (text.includes('|')) return newReply(`Contoh : ${prefix + command} halo`)
        let media = await haruka.downloadMediaMessage(quoted)
        imagenye.push(`${text}`)
        fs.writeFileSync(`./database/${text}.jpg`, media)
        fs.writeFileSync('./database/image.json', JSON.stringify(imagenye))
        newReply(`Berhasil menambahkan gambar ke dalam database.`)
    }
    break

    case 'delimage': 
    case 'delfoto': 
    case 'delimg':{
        if (!isPremium) return newReply(mess.OnlyPrem)
        if (args.length < 1) return newReply('Ketik nama gambar yang ingin dihapus dari database.')
        if (!imagenye.includes(text)) return newReply('Nama tidak ada dalam database.')
        let wanu = imagenye.indexOf(text)
        imagenye.splice(wanu, 1)
        fs.writeFileSync('./database/image.json', JSON.stringify(imagenye))
        fs.unlinkSync(`./database/${text}.webp`)
        newReply(`Berhasil menghapus gambar dari dalam database.`)
    }
    break

    case 'listimage': 
    case 'imagelist': 
    case 'listimg':{
        let teks = 'Berikut ini adalah daftar gambar yang ada dalam database:\n\n'
        for (let i of imagenye) {
            teks += `- ${i}\n`
        }
        teks += `\n*Total : ${imagenye.length}*`
        newReply(teks)
    }
    break

    case 'addvideo': 
    case 'addvidio': 
    case 'addvid':{
        if (!m.key.fromMe && !isCreator) return newReply(mess.OnlyOwner)
        if (!/video/.test(mime)) return newReply(`Contoh : ${prefix + command} halo`)
        if ((quoted.msg || quoted).seconds > 31) return newReply('Maksimal 30 detik')
        if (!text) return newReply(`Contoh : ${prefix + command} halo`)
        if (text.includes('|')) return newReply(`Contoh : ${prefix + command} halo`)
        let media = await haruka.downloadMediaMessage(quoted)
        videonye.push(`${text}`)
        fs.writeFileSync(`./database/${text}.mp4`, media)
        fs.writeFileSync('./database/video.json', JSON.stringify(videonye))
        newReply(`Berhasil menambahkan video ke dalam database.`)
    }
    break

    case 'delvideo': 
    case 'delvid':{
        if (!isPremium) return newReply(mess.OnlyPrem)
        if (args.length < 1) return newReply('Ketik nama video yang ingin dihapus dari database.')
        if (!videonye.includes(text)) return newReply('Nama tidak ada dalam database.')
        let wanu = videonye.indexOf(text)
        videonye.splice(wanu, 1)
        fs.writeFileSync('./database/video.json', JSON.stringify(videonye))
        fs.unlinkSync(`./database/${text}.webp`)
        newReply(`Berhasil menghapus video dari dalam database.`)
    }
    break

    case 'videolist': 
    case 'listvidio': 
    case 'listvid': 
    case 'listvideo':{
        let teks = 'Berikut ini adalah daftar video yang ada dalam database:\n\n'
        for (let i of videonye) {
            teks += `- ${i}\n`
        }
        teks += `\n*Total : ${videonye.length}*`
        newReply(teks)
    }
    break

    case 'addaud': 
    case 'addaudio': 
    case 'addvn':{
        if (!m.key.fromMe && !isCreator) return newReply(mess.OnlyOwner)
        if (!/audio/.test(mime)) return newReply(`Contoh : ${prefix + command} halo`)
        if ((quoted.msg || quoted).seconds > 31) return newReply('Maksimal 30 detik')
        if (!text) return newReply(`Contoh : ${prefix + command} halo`)
        if (text.includes('|')) return newReply(`Contoh : ${prefix + command} halo`)
        let media = await haruka.downloadMediaMessage(quoted)
        audionye.push(`${text}`)
        fs.writeFileSync(`./database/${text}.mp3`, media)
        fs.writeFileSync('./database/vn.json', JSON.stringify(audionye))
        newReply(`Berhasil menambahkan audio ke dalam database.`)
    }
    break

    case 'delaudio': 
    case 'delaud': 
    case 'delvn':{
        if (!isPremium) return newReply(mess.OnlyPrem)
        if (args.length < 1) return newReply('Ketik nama audio yang ingin dihapus dari database.')
        if (!audionye.includes(text)) return newReply('Nama tidak ada dalam database.')
        let wanu = audionye.indexOf(text)
        audionye.splice(wanu, 1)
        fs.writeFileSync('./database/audio.json', JSON.stringify(audionye))
        fs.unlinkSync(`./database/${text}.webp`)
        newReply(`Berhasil menghapus audio dari dalam database.`)
    }
    break

    case 'listvn': 
    case 'listaudio':{
        let teks = 'Berikut ini adalah daftar audio yang ada dalam database:\n\n'
        for (let i of audionye) {
            teks += `- ${i}\n`
        }
        teks += `\n*Total : ${audionye.length}*`
        newReply(teks)
    }
    break

// Baileys Menu
case 'fitnah':
if (!m.isGroup) return newReply(mess.OnlyGrup)
if (!text) return haruka.sendTextWithMentions(m.chat, `Gunakan dengan cara ${prefix+command} *@tag|pesantarget|pesanbot*\n\n_Contoh_\n\n${prefix+command} @${m.sender.split('@')[0]}|enak ga semalem|enak banget`, m)
let org = text.split('|')[0]
let target = text.split('|')[1];
let bot = text.split('|')[2];
if (!org.startsWith('@')) return newReply('Tag orangnya')
if (!target) return newReply(`Masukkan pesan target!`)
if (!bot) return newReply(`Masukkan pesan bot!`)
let mens = parseMention(target)
let msg1 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: m.chat ? m.chat : '' }, message: { extemdedTextMessage: { text: `${target}`, contextInfo: { mentionedJid: mens }}}}
let msg2 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: m.chat ? m.chat : '' }, message: { conversation: `${target}` }}
haruka.sendMessage(m.chat, { text: bot, mentions: mens }, { quoted: mens.length > 2 ? msg1 : msg2 })
break

case 'nowa':
if (!isPremium) return newReply(mess.OnlyPrem)
if (!text) return newReply(`Gunakan dengan cara ${prefix+command} *nomor*\n\n_Contoh_\n\n${prefix+command} 628XXXXXXXXXX`)
if (!text.includes('x')) return newReply('Misal 6285xxx')
await newReply(mess.wait)
function countInstances(string, word) {
return string.split(word).length - 1;
}
let nomer0 = teks.split('x')[0]
let nomer1 = teks.split('x')[countInstances(teks, 'x')] ? teks.split('x')[countInstances(teks, 'x')] : ''
let random_length = countInstances(teks, 'x')
let random;
if (random_length == 1) {
random = 10
} else if (random_length == 2) {
random = 100
} else if (random_length == 3) {
random = 1000
}

let nomerny = `List Nomer\n\nPunya Bio/status/info\n`
let no_bio = `\nTanpa Bio/status/info || \nHey there! I am using WhatsApp.\n`
let no_watsap = `\nTidak Terdaftar\n`

for (let i = 0; i < random; i++) {
let nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
let dom1 = nu[Math.floor(Math.random() * nu.length)]
let dom2 = nu[Math.floor(Math.random() * nu.length)]
let dom3 = nu[Math.floor(Math.random() * nu.length)]
let dom4 = nu[Math.floor(Math.random() * nu.length)]

let rndm;
if (random_length == 1) {
rndm = `${dom1}`
} else if (random_length == 2) {
rndm = `${dom1}${dom2}`
} else if (random_length == 3) {
rndm = `${dom1}${dom2}${dom3}`
} else if (random_length == 4) {
rndm = `${dom1}${dom2}${dom3}${dom4}`
}

let anu = await haruka.onWhatsApp(`${nomer0}${i}${nomer1}@s.whatsapp.net`);
let anuu = anu.length !== 0 ? anu : false

try {
try {
let anu1 = await haruka.fetchStatus(anu[0].jid)
} catch {
let anu1 = '401'
}
if (anu1 == '401' || anu1.status.length == 0) {
no_bio += `wa.me/${anu[0].jid.split('@')[0]}\n`
console.log(`-${i}) ${nomer0}${i}${nomer1}`, color(` [REGISTERED]`, 'green'))
} else {
if (random_length == 6) {
let thn = `${moment(anu1.setAt).tz('Asia/Jakarta').format('ddd DD MMM YYYY')}`
if (thn.endsWith('2009')) {
nomerny += `wa.me/${anu[0].jid.split('@')[0]}\nBio Name : ${anu1.status}\nTahun : ${moment(anu1.setAt).tz('Asia/Jakarta').format('ddd DD MMM YYYY')}\n\n`
console.log(`-${i}) ${nomer0}${i}${nomer1}`, color(` [REGISTERED]`, 'green'))
}
} else {
nomerny += `wa.me/${anu[0].jid.split('@')[0]}\nBio Name : ${anu1.status}\nTahun : ${moment(anu1.setAt).tz('Asia/Jakarta').format('ddd DD MMM YYYY')}\n\n`
console.log(`-${i}) ${nomer0}${i}${nomer1}`, color(` [REGISTERED]`, 'green'))
}
}
} catch {
no_watsap += `${nomer0}${i}${nomer1}\n`
console.log(`-${i}) ${nomer0}${i}${nomer1}`, color(` [NOT REGISTERED]`, 'red'))
}
}
newReply(`${nomerny}${no_bio}${no_watsap}`)
break

case 'q': 
case 'quoted': {
if (!m.quoted) return newReply('Reply Pesannya!!')
let gwm = await haruka.serializeM(await m.getQuotedObj())
if (!gwm.quoted) return newReply('Pesan Yang anda reply tidak mengandung reply')
await gwm.quoted.copyNForward(m.chat, true)
}
break

case 'fakehidetag':{
if (!isPremium) return rely(mess.OnlyPrem)
if (!m.isGroup) return newReply(mess.OnlyGrup)
if (!text) return haruka.sendTextWithMentions(m.chat, `Gunakan dengan cara ${prefix + command} *@tag|text*\n\n_Contoh_\n\n${prefix + command} @${m.sender.split('@')[0]}|Halo`, m)
let org = text.split('|')[0]
let teks = text.split('|')[1];
if (!org.startsWith('@')) return newReply('Tag orangnya')
let mem2 = []
groupMembers.map( i => mem2.push(i.id) )
let mens = parseMention(target)
let msg1 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: m.chat ? m.chat : '' }, message: { extemdedTextMessage: { text: `${prefix}hidetag ${teks}`, contextInfo: { mentionedJid: mens }}}}
let msg2 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: m.chat ? m.chat : '' }, message: { conversation: `${prefix}hidetag ${teks}` }}
haruka.sendMessage(m.chat, { text: teks ? teks : '', mentions: mem2 }, { quoted: mens.length > 2 ? msg1 : msg2 })
}
break

case 'react':
if (!isPremium) return rely(mess.OnlyPrem)
if (!m.quoted) return newReply(`Balas pesannya`)
if (!text) return newReply(`Masukkan 1 emoji`)
if (!isEmoji(text)) return newReply(`Itu bukan emoji!`)
if (isEmoji(text).length > 1) return newReply(`Satu aja emojinya`)
let reactMsg = { reactionMessage: {
key: {
remoteJid: m.chat,
fromMe: m.key.fromMe,
id: quoted.id
},
text: text
}
}
haruka.sendMessageFromContent(m.chat, reactMsg)
break

case 'setcmd': 
case 'addcmd':{
if (!m.quoted) return newReply( 'Reply Pesan!')
if (!m.quoted.fileSha256) return newReply ('SHA256 Hash Missing')
if (!text) return newReply(`Contoh ${prefix + command} .menu`)
let hash = m.quoted.fileSha256.toString('base64')
if (db.data.sticker[hash] && db.data.sticker[hash].locked) return newReply( 'You have no permission to change this sticker command')
db.data.sticker[hash] = {
text,
mentionedJid: m.mentionedJid,
creator: m.sender,
at: + new Date,
locked: false,
}
newReply(`Done!`)
}
break

case 'delcmd': {
let hash = m.quoted.fileSha256.toString('base64')
if (!hash) return newReply ('SHA256 Hash Missing')
if (db.data.sticker[hash] && db.data.sticker[hash].locked) return newReply( 'You have no permission to change this sticker command')
delete db.data.sticker[hash]
newReply(`Done!`)
}
break

// Owner Menu
case 'autoaijapri':
case 'aipc': 
case 'autoaipc':{
if (m.isGroup) return newReply(mess.OnlyPM)
if (!isCreator) return newReply(mess.GrupAdmin)
if (args[0] === 'on') {
if (isAutoAiPc) return newReply(`Udah aktif`)
openaipc.push(botNumber)
fs.writeFileSync('./database/openaipc.json', JSON.stringify(openaipc, null, 2))
newReply('Successfully Activate Auto AI')
} else if (args[0] === 'off') {
if (!isAutoAiPc) return newReply(`Udah nonaktif`)
let anu = openaipc.indexOf(botNumber)
openaipc.splice(anu, 1)
fs.writeFileSync('./database/openaipc.json', JSON.stringify(openaipc, null, 2))
newReply('Successfully Disabling Auto AI')
} else {
newReply(`${prefix+command} on -- _mengaktifkan_\n${prefix+command} off -- _Menonaktifkan_`)
}}
break

case 'autoread': {
if (!isCreator) return newReply(mess.OnlyOwner)
if (args[0] === 'on') {
if (setting.autoread === true) return newReply('Udh on')
setting.autoread = true
newReply('Autoread berhasil diaktifkan')
} else if (args[0] === 'off') {
if (setting.autoread === false) return newReply('Udh off')
setting.autoread = false
newReply('Autoread berhasil dinonaktifkan')
} else {
newReply(`${prefix+command} on -- _mengaktifkan_\n${prefix+command} off -- _Menonaktifkan_`)
 }}
break

case 'autobio': {
if (!isCreator) return newReply(mess.OnlyOwner)
if (args[0] === 'on') {
if (setting.autobio === true) return newReply('Udh on')
setting.autobio = true
newReply('Autobio berhasil diaktifkan')
} else if (args[0] === 'off') {
if (setting.autobio === false) return newReply('Udh off')
setting.autobio = false
newReply('Autobio berhasil dinonaktifkan')
} else {
newReply(`${prefix+command} on -- _mengaktifkan_\n${prefix+command} off -- _Menonaktifkan_`)
 }}
break

case 'antidelete':{
if (!isCreator) return newReply(mess.OnlyOwner)
if (args[0] === 'on') {
if (setting.antiDelete) return newReply(`Udah aktif`)
setting.antiDelete = true
newReply('Successfully Activate antidelete In This bot')
} else if (args[0] === 'off') {
if (!setting.antiViewOnce) return newReply(`Udah nonaktif`)
setting.antiDelete = false
newReply('Successfully Disabling antidelete In This bot')
} else {
newReply(`${prefix+command} on -- _mengaktifkan_\n${prefix+command} off -- _Menonaktifkan_`)
}
}
break

case 'antionce':
case 'antivo': 
case 'antiviewonce':{
if (!isCreator) return newReply(mess.OnlyOwner)
if (args[0] === 'on') {
if (setting.antiViewOnce) return newReply(`Udah aktif`)
setting.antiViewOnce = true
newReply('Successfully Activate Anti view once In This bot')
} else if (args[0] === 'off') {
if (!setting.antiViewOnce) return newReply(`Udah nonaktif`)
setting.antiViewOnce = false
newReply('Successfully Disabling Anti view once In This bot')
} else {
newReply(`${prefix+command} on -- _mengaktifkan_\n${prefix+command} off -- _Menonaktifkan_`)
}
}
break

case 'autorespond': {
if (!isCreator) return newReply(mess.OnlyOwner)
if (args[0] === 'on') {
if (setting.autorespond === true) return newReply('Udh on')
setting.autorespond = true
newReply('Autorespond berhasil diaktifkan')
} else if (args[0] === 'off') {
if (setting.autorespond === false) return newReply('Udh off')
setting.autorespond = false
newReply('Autorespond berhasil dinonaktifkan')
} else {
newReply(`${prefix+command} on -- _mengaktifkan_\n${prefix+command} off -- _Menonaktifkan_`)
}}
break

case 'anticall': {
if (!isCreator) return newReply(mess.OnlyOwner)
if (args[0] === 'on') {
if (setting.anticall === true) return newReply('Udh on')
setting.anticall = true
newReply('Anticall berhasil diaktifkan')
} else if (args[0] === 'off') {
if (setting.anticall === false) return newReply('Udh off')
setting.anticall = false
newReply('Anticall berhasil dinonaktifkan')
} else {
newReply(`${prefix+command} on -- _mengaktifkan_\n${prefix+command} off -- _Menonaktifkan_`)
}}
break

case 'autoblok': 
case 'autoblok212': {
if (!isCreator) return newReply(mess.OnlyOwner)
if (args[0] === 'on') {
if (setting.autoblok212 === true) return newReply('Udh on')
setting.autoblok212 = true
newReply('Autoblok berhasil diaktifkan')
} else if (args[0] === 'off') {
if (setting.autoblok212 === false) return newReply('Udh off')
setting.autoblok212 = false
newReply('Autoblok berhasil dinonaktifkan')
} else {
newReply(`${prefix+command} on -- _mengaktifkan_\n${prefix+command} off -- _Menonaktifkan_`)
 }}
break

case 'joingc': 
case 'join': {
if (!isCreator) return newReply(`Mau sewa bot buat jaga gc? silahkan hubungi owner`)
if (!text) return newReply(`Kirim perintah ${prefix + command} _linkgrup_`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return newReply(mess.error.Iv)
await newReply(mess.wait)
let result = args[0].split('https://chat.whatsapp.com/')[1]
await haruka.groupAcceptInvite(result).then((res) => newReply(jsonformat(res))).catch((err) => newReply(jsonformat(err)))
}
break

case 'leavegc': {
if (!isCreator) return newReply(mess.OnlyOwner)
await haruka.groupLeave(m.chat).then((res) => newReply(jsonformat(res))).catch((err) => newReply(jsonformat(err)))
}
break

case 'public': {
if (!isCreator) return newReply(mess.OnlyOwner)
haruka.public = true
newReply('Sukses Change To Public Mode')
}
break

case 'self': {
if (!isCreator) return newReply(mess.OnlyOwner)
haruka.public = false
newReply('Sukses Change To Self Mode')
}
break

case 'setppbot': {
if (!isCreator) return newReply(mess.OnlyOwner)
if (!quoted) return newReply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (!/image/.test(mime)) return newReply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (/webp/.test(mime)) return newReply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
let media = await haruka.downloadAndSaveMediaMessage(quoted)
await haruka.updateProfilePicture(botNumber, { url: media }).catch((err) => fs.unlinkSync(media))
newReply('Done')
}
break

case 'bcimage': 
case 'bcimg':{
if (!isCreator) return newReply(mess.OnlyOwner)
if (!text) return newReply(`Reply foto dengan caption ${prefix + command} Tes`)
if (!/image/.test(mime)) return newReply(`Reply foto dengan caption ${prefix + command} Tes`)
let anu = await store.chats.all().map(v => v.id)
let media = await haruka.downloadAndSaveMediaMessage(quoted)
let buffer = fs.readFileSync(media)
for (let apaan of anu) {
let txt = `「 BROADCAST 」\n\n${text}`
haruka.sendMessage(apaan, {image: buffer, caption: txt}, {quoted: m})
}
newReply('Sukses Broadcast')
}
break

case 'bcvideo': 
case 'bcvid':{
if (!isCreator) return newReply(mess.OnlyOwner)
if (!text) return newReply(`Reply video dengan caption ${prefix + command} Tes`)
if (!/video/.test(mime)) return newReply(`Reply video dengan caption ${prefix + command} Tes`)
let anu = await store.chats.all().map(v => v.id)
let media = await haruka.downloadAndSaveMediaMessage(quoted)
let buffer = fs.readFileSync(media)
for (let apaan of anu) {
let txt = `「 BROADCAST 」\n\n${text}`
haruka.sendMessage(apaan, {video: buffer, caption: txt, mimetype: 'video/mp4', duration: 909090909}, {quoted: m})
}
newReply('Sukses Broadcast')
}
break

case 'bcaudio': 
case 'bcaud':{
if (!isCreator) return newReply(mess.OnlyOwner)
if (!/audio/.test(mime)) return newReply(`Reply audio dengan caption ${prefix + command} Tes`)
let anu = await store.chats.all().map(v => v.id)
let media = await haruka.downloadAndSaveMediaMessage(quoted)
let buffer = fs.readFileSync(media)
for (let apaan of anu) {
let txt = `「 BROADCAST 」\n\n${text}`
haruka.sendMessage(apaan, {audio: buffer, mimetype: 'audio/mpeg', ptt: false, duration: 909090909}, {quoted: m})
}
newReply('Sukses Broadcast')
}
break

case 'bcvn': {
if (!isCreator) return newReply(mess.OnlyOwner)
if (!/audio/.test(mime)) return newReply(`Reply audio dengan caption ${prefix + command} Tes`)
let anu = await store.chats.all().map(v => v.id)
let media = await haruka.downloadAndSaveMediaMessage(quoted)
let buffer = fs.readFileSync(media)
for (let apaan of anu) {
let txt = `「 BROADCAST 」\n\n${text}`
haruka.sendMessage(apaan, {audio: buffer, mimetype: 'audio/mpeg', ptt: true, duration: 909090909}, {quoted: m})
}
newReply('Sukses Broadcast')
}
break

case 'bcstiker': 
case 'bcstik': 
case 'bcsticker':{
if (!isCreator) return newReply(mess.OnlyOwner)
 if (!/webp/.test(mime)) return newReply(`Reply stiker dengan caption ${prefix + command}`)
let anu = await store.chats.all().map(v => v.id)
let media = await haruka.downloadAndSaveMediaMessage(quoted)
let buffer = fs.readFileSync(media)
for (let apaan of anu) {
let txt = `「 BROADCAST 」\n\n${text}`
haruka.sendMessage(apaan, {sticker :{url : media}}, {quoted: m})
}
newReply('Sukses Broadcast')
}
break

case 'bc': 
case 'broadcast': {
if (!isCreator) return newReply(mess.OnlyOwner)
if (!text) return newReply (`Example : ${prefix + command} Tes`)
let anu = await store.chats.all().map(v => v.id)
let todd = await haruka.reSize(`${setting.pathimg}`, 300, 300) 
newReply(`Mengirim Broadcast Ke ${anu.length} Chat\nWaktu Selesai ${anu.length * 1.5} detik`)
for (let apaan of anu) {
await sleep(1500)
haruka.sendMessage(apaan, {image: {url: `https://telegra.ph/file/5beafc90f688c8ad48b7d.png`}, caption: `*BROADCAST*\n\n${text}`})
}
newReply('Sukses Broadcast')
}
break

case 'addprem':{
if (!isCreator) return newReply(mess.OnlyOwner)
const swn = args.join(' ')
const pcknm = swn.split('|')[0];
const atnm = swn.split('|')[1];
if (!pcknm) return newReply(`Penggunaan :\n*${prefix}addprem* @tag|waktu\n*${prefix}addprem* nomor|waktu\n\nContoh : ${prefix+command} @tag|30d`)
if (!atnm) return newReply(`Mau yang berapa hari?`)
let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
if (users) {
addPremiumUser((pcknm.replace('@','')+'@s.whatsapp.net').replace(' @','@'), atnm, premium)
newReply('Sukses')
} else {
let cekap = await haruka.onWhatsApp(pcknm+'@s.whatsapp.net')
if (cekap.length == 0) return newReply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
addPremiumUser((pcknm.replace('@','')+'@s.whatsapp.net').replace(' @','@'), atnm, premium)
newReply('Sukses')
}}
break

case 'delprem':
if (!isCreator) return newReply(mess.OnlyOwner)
if (!args[0]) return newReply(`Penggunaan :\n*${prefix}delprem* @tag\n*${prefix}delprem* nomor`)
let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
if (users) {
premium.splice(getPremiumPosition(users, premium), 1)
fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
newReply('Sukses!')
} else {
let cekpr = await haruka.onWhatsApp(args[0]+'@s.whatsapp.net')
if (cekpr.length == 0) return newReply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
premium.splice(getPremiumPosition(args[0] + '@s.whatsapp.net', premium), 1)
fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
newReply('Sukses!')
}
break

case 'addsewa':
if (!isCreator) return newReply(mess.OnlyOwner)
if (text < 2) return newReply(`Gunakan dengan cara ${prefix+command} *linkgc waktu*\n\nContoh : ${prefix+command} https://chat.whatsapp.com/PnwpPqn0b 30d`)
if (!isUrl(args[0])) return newReply(mess.error.Iv)
let url = args[0]
url = url.split('https://chat.whatsapp.com/')[1]
if (!text) return newReply(`Waktunya?`)
let data = await haruka.groupAcceptInvite(url)
if (checkSewaGroup(data, sewa)) return newReply(`Bot sudah disewa oleh grup tersebut!`)
addSewaGroup(data, args[1], sewa)
newReply(`Success Add Sewa Group Berwaktu!`)
break

case 'delsewa':
if (!isCreator) return newReply(mess.OnlyOwner)
if (!m.isGroup) return newReply(`Perintah ini hanya bisa dilakukan di Grup yang menyewa bot`)
if (!isSewa) return newReply(`Bot tidak disewa di Grup ini`)
sewa.splice(getSewaPosition(args[0] ? args[0] : m.chat, sewa), 1)
fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa, null, 2))
newReply(`Sukses`)
break

case 'jadibot':{
if (!isCreator && !isPremium) return newReply(mess.OnlyPrem)
if (m.key.fromMe) return
await jadibot(haruka, m, m.chat)
}
break

case 'stopjadibot':{
if (!isCreator && !isPremium) return newReply(mess.OnlyPrem)
if (m.key.fromMe) return
await stopjadibot(haruka, m.chat)
m.reply('Berhasil menghapus perangkat dari database.')
}
break

case 'listjadibot':{
if (!isCreator && !isPremium) return newReply(mess.OnlyPrem)
if (m.key.fromMe) return
await listjadibot(haruka, m)
}
break

// Asupan Menu
case 'chika': 
case 'rikagusriani': 
case 'bocil': 
case 'geayubi': 
case 'santuy': 
case 'ukhty': 
case 'asupan': 
case 'delvira': 
case 'ayu': 
case 'bunga': 
case 'aura': 
case 'nisa': 
case 'ziva': 
case 'yana': 
case 'viona': 
case 'syania': 
case 'riri': 
case 'syifa': 
case 'mama_gina': 
case 'alcakenya': 
case 'mangayutri': {
if (!isCreator && !isPremium)return newReply(mess.OnlyPrem)
await newReply(mess.wait)
haruka.sendMessage(m.chat, {video: {url: `https://api.zeeoneofc.my.id/api/asupan/${command}?apikey=${setting.BotKey}`, mimetype:'video/mp4'}, caption: 'Nih asupan guys 😋'},{quoted: m})
.catch((err) => {
newReply(util.format(err))
})
}
break

// Nsfw Menu
case 'baka':
case 'smug':
case 'neko_sfw':
case 'hentai_gif':
case 'spank':
case 'blowjob':
case 'cumarts':
case 'eroyuri':
case 'eroneko':
case 'erokemonomimi':
case 'erokitsune':
case 'ero':
case 'feet':
case 'erofeet':
case 'feetgif':
case 'femdom':
case 'futanari':
case 'hentai':
case 'holoero':
case 'holo':
case 'keta':
case 'kitsune':
case 'kemonomimi':
case 'pussyart':
case 'pussywankgif':
case 'girl_solo':
case 'girl_solo_gif':
case 'tits':
case 'trap':
case 'yuri':
case 'avatar2':
case 'anal':
case 'bj':
case 'boobs':
case 'classic':
case 'cumsluts':
case 'kuni':
case 'lesbian':
case 'neko':
case 'neko_gif':
case 'ahegao':
case 'bdsm':
case 'cuckold':
case 'cum':
case 'foot':
case 'gangbang':
case 'glasses':
case 'jahy':
case 'masturbation':
case 'nsfw_neko':
case 'orgy':
case 'panties':
case 'tentacles':
case 'thighs':
case 'zettai':{
if (!m.isGroup)return newReply(mess.OnlyGrup)
if (!isCreator&&!isPremium) return newReply(mess.OnlyPrem)
if (!isNsfw && !m.key.fromMe && !isCreator) return newReply('Fitur nsfw belum di aktifkan')
await newReply(mess.wait)
let baka = await getBuffer(`https://api.zeeoneofc.my.id/api/nsfw/${command}?apikey=${setting.BotKey}`)
await haruka.sendMessage(m.chat, {image: baka, caption: `Nih ${command} Nya 😋`},{quoted: m})
}
break

default:
if ((budy) && ['proses', 'Proses',].includes(budy) && !isCmd) {
if (!m.isGroup) return newReply(mess.OnlyGrup)
if (!isAdmins) return newReply(mess.GrupAdmin)
if (!m.quoted) return newReply('Reply pesanan yang akan proses')
let tek = m.quoted ? quoted.text : quoted.text.split(args[0])[1]
let proses = `「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : @tanggal\n⌚ JAM : @jam\n✨ STATUS : Pending\`\`\`\n\n📝 Catatan :\n@pesanan\n\nPesanan @user sedang di proses!`
const getTextP = getTextSetProses(m.chat, set_proses)
if (getTextP !== undefined) {
let anunya = (getTextP.replace('@pesanan', tek ? tek : '-').replace('@user', '@' + m.quoted.sender.split('@')[0]).replace('@jam', time).replace('@tanggal', tanggal(new Date())).replace('@user', '@' + m.quoted.sender.split('@')[0]))
haruka.sendTextWithMentions(m.chat, anunya, m)
} else {
haruka.sendTextWithMentions(m.chat, (proses.replace('@pesanan', tek ? tek : '-').replace('@user', '@' + m.quoted.sender.split('@')[0]).replace('@jam', time).replace('@tanggal', tanggal(new Date())).replace('@user', '@' + m.quoted.sender.split('@')[0])), m)}
}

if ((budy) && ['done', 'Done'].includes(budy) && !isCmd) {
if (!m.isGroup) return newReply(mess.OnlyGrup)
if (!isAdmins) return newReply(mess.GrupAdmin)
if (!m.quoted) return newReply('Reply pesanan yang telah di proses')
let tek = m.quoted ? quoted.text : quoted.text.split(args[0])[1]
let sukses = `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : @tanggal\n⌚ JAM : @jam\n✨ STATUS : Berhasil\`\`\`\n\nTerimakasih @user Next Order ya🙏`
const getTextD = getTextSetDone(m.chat, set_done)
if (getTextD !== undefined) {
let anunya = (getTextD.replace('@pesanan', tek ? tek : '-').replace('@user', '@' + m.quoted.sender.split('@')[0]).replace('@jam', time).replace('@tanggal', tanggal(new Date())).replace('@user', '@' + m.quoted.sender.split('@')[0]))
haruka.sendTextWithMentions(m.chat, anunya, m)
} else {
haruka.sendTextWithMentions(m.chat, (sukses.replace('@pesanan', tek ? tek : '-').replace('@user', '@' + m.quoted.sender.split('@')[0]).replace('@jam', time).replace('@tanggal', tanggal(new Date())).replace('@user', '@' + m.quoted.sender.split('@')[0])), m)}
}

if (budy.startsWith('=> ')) {
if (!isCreator) return newReply(mess.OnlyOwner)
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)
}
return newReply(bang)
}
try {
newReply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) {
newReply(util.format(e))
}
}

if (budy.startsWith('> ')) {
if (!isCreator) return newReply(mess.OnlyOwner)
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await newReply(evaled)
} catch (err) {
await newReply(util.format(err))
}
}

if (budy.startsWith('$ ')) {
if (!isCreator) return newReply(mess.OnlyOwner)
exec(budy.slice(2), (err, stdout) => {
if (err) return newReply(`${err}`)
if (stdout) return newReply(stdout)
})
}
if (m.mtype == 'viewOnceMessageV2') {
if (!setting.antiViewOnce) return
let msg = m.message.viewOnceMessageV2.message
 console.log(msg)
let type = Object.keys(msg)[0]
let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
let buffer = Buffer.from([])
 for await (const chunk of media) {
buffer = Buffer.concat([buffer, chunk])
 }
let teks = `「 *ANTI VIEWONCE MESSAGE* 」

📛 *Name* : ${m.pushName}
👤 *User* : @${m.sender.split('@')[0]}
⏰ *Clock* : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')} WIB
✍️ *MessageType* : ${m.mtype}
💬 *Caption* : ${m.msg.caption ? m.msg.caption : 'no caption'}`

await haruka.sendTextWithMentions(m.chat, teks, m)
await delay(500)
if (/video/.test(type)) {
return haruka.sendFile(m.chat, buffer, 'media.mp4', msg[type].caption || '', m)
}
else if (/image/.test(type)) {
return haruka.sendFile(m.chat, buffer, 'media.jpg', msg[type].caption || '', m)
}
}

if (m.chat.endsWith('@s.whatsapp.net') && !isCmd) {
this.menfes = this.menfes ? this.menfes : {}
let room = Object.values(this.menfes).find(room => [room.a, room.b].includes(m.sender) && room.state === 'CHATTING')
if (room) {
if (/^.*(next|leave|start)/.test(m.text)) return
if (['.next', '.leave', '.stop', '.start', 'Cari Partner', 'Keluar', 'Lanjut', 'Stop'].includes(m.text)) return
find = Object.values(this.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender))
let other = find.a == m.sender ? find.b : find.a
await m.copyNForward(other, true, m.quoted && m.quoted.fromMe ? {
contextInfo: {
...m.msg.contextInfo,
participant: other
}
} : {})
}
}

if (m.chat.endsWith('@s.whatsapp.net') && !isCmd) {
this.anonymous = this.anonymous ? this.anonymous : {}
let room = Object.values(this.anonymous).find(room => [room.a, room.b].includes(m.sender) && room.state === 'CHATTING')
if (room) {
if (/^.*(next|leave|start)/.test(m.text)) return
if (['.next', '.leave', '.stop', '.start', 'Cari Partner', 'Keluar', 'Lanjut', 'Stop'].includes(m.text)) return
let other = [room.a, room.b].find(user => user !== m.sender)
m.copyNForward(other, true, m.quoted && m.quoted.fromMe ? {
contextInfo: {
...m.msg.contextInfo,
forwardingScore: 0,
isForwarded: true,
participant: other
}
} : {})
}
return !0
}
}

//
} catch (err) {
//m.reply(JSON.stringify(err, null, 2))
//console.log(JSON.stringify(err, null, 2))
m.reply(err);
console.log(err);
}
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})