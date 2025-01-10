
process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);
const { default: makeWASocket, delay, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, jidNormalizedUser, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, getAggregateVotesInPollMessage, proto } = require("@adiwajshing/baileys");
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const rimraf = require('rimraf');
const chalk = require('chalk');
const FileType = require('file-type');
const readline = require("readline");
const NodeCache = require("node-cache");
const msgRetryCounterCache = new NodeCache();
const path = require('path');
const fetch = require('node-fetch');
const axios = require('axios');
const PhoneNumber = require('awesome-phonenumber');
const { imageToWebp, videoToWebp, writeExif, writeExifImg, writeExifVid } = require('./lib/exif');
const { toAudio, toPTT, toVideo } = require('./lib/converter');
const { getRandom, smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/myfunc');
const { toBuffer, toDataURL } = require('qrcode');
const express = require ('express');

let app = express()
const { createServer } = require ('http');
let server = createServer(app);
let _qr = 'invalid'
let PORT = 3000 || 8000 || 8080

const { isSetWelcome, getTextSetWelcome } = require('./lib/setwelcome');
const { isSetLeft, getTextSetLeft } = require('./lib/setleft');

let set_welcome_db = JSON.parse(fs.readFileSync('./database/set_welcome.json'));
let set_left_db = JSON.parse(fs.readFileSync('./database/set_left.json'));
let setting = JSON.parse(fs.readFileSync('./config.json'));
let contacts = JSON.parse(fs.readFileSync('./contacts.json'));
let _welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
let _left = JSON.parse(fs.readFileSync('./database/left.json'));
let antidelete = JSON.parse(fs.readFileSync('./database/antidelete.json'));
let antionce = JSON.parse(fs.readFileSync('./database/antionce.json'));
let usePairingCode = true

const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(text, resolve)
    });
};

global.db = JSON.parse(fs.readFileSync('./database/database.json'));
if (global.db) global.db.data = {
    sticker: {},
    database: {},
    game: {},
    others: {},
    users: {},
    chats: {},
    settings: {},
    anonymous:{},
    ...(global.db.data || {})
};

const client = {}
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

function nocache(module, cb = () => {}) {
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
};

function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
};

const jadibot = async (haruka, m, from) => {
async function startHaruka() {
    const { state, saveCreds } = await useMultiFileAuthState(`./database/users/${m.sender.split("@")[0]}`)
    client[from] = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: !usePairingCode,
        auth: state,
        msgRetryCounterCache,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        emitOwnEvents: true,
        fireInitQueries: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
    });

    if (usePairingCode && !client[from].user && !client[from].authState.creds.registered) {
        setTimeout(async () => {
            code = await client[from].requestPairingCode(m.sender.split("@")[0])
            code = code?.match(/.{1,4}/g)?.join("-") || code
            haruka.sendMessage(from, { text: code })
        }, 3000)
    }

    require("./case")
    nocache('./case', module => console.log(chalk.greenBright('[ UPDATED ]') + new Date() + chalk.cyanBright(` "${module}" Telah diupdate!`)))

    if (client[from].user && client[from].user.id) client[from].user.jid = jidNormalizedUser(client[from].user.id)

    client[from].ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update
        if (qr) {
            app.use(async (req, res) => {
                res.setHeader('content-type', 'image/png')
                res.end(await toBuffer(qr))
            })
            app.use(express.static(path.join(__dirname, 'views')))
            server.listen(PORT, () => {
                console.log('App listened on port', PORT)
            })
        }
        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); client[from].logout(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); startHaruka(); }
            else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); startHaruka(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); client[from].logout(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); client[from].logout(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); startHaruka(); }
            else if (reason === DisconnectReason.timedOut) { console.log("harukaection TimedOut, Reconnecting..."); startHaruka(); }
            else client[from].end(`Unknown DisconnectReason: ${reason}|${connection}`)
        }
        if (update.connection == "open" || update.receivedPendingNotifications == "true") {
            haruka.sendMessage(from, { text: 'Anda berhasil di tambahkan ke dalam database.' })
        }
    })
    store.bind(client[from].ev)

    client[from].ev.on('call', async (celled) => {
        let botNumber = await client[from].decodeJid(client[from].user.id)
        let saklar = setting.anticall
        if (!saklar) return
        console.log(celled)
        for (let users of celled) {
            if (users.isGroup == false) {
                if (users.status == "offer") {
                    const repf = await client[from].sendTextWithMentions(users.from, `*${client[from].user.name}* tidak bisa menerima panggilan ${users.isVideo ? `video` : `suara`}. Maaf @${users.from.split('@')[0]} kamu akan diblokir. Silahkan hubungi Owner membuka blok !`)
                    client[from].sendContact(users.from, repf)
                    //await sleep(8000)
                    //await client[from].updateBlockStatus(users.from, "block")
                }
            }
        }
    })

    client[from].ev.on('messages.upsert', async chatUpdate => {
        try {
            //mek = chatUpdate.messages[0]
            for (let mek of chatUpdate.messages) {
                if (!mek.message) return
                mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
                if (mek.key && mek.key.remoteJid === 'status@broadcast') return
                if (!client[from].public && !mek.key.fromMe && chatUpdate.type === 'notify') return
                if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
                const m = smsg(client[from], mek, store)
                require("./case")(client[from], m, chatUpdate, mek, store, setting, isSetWelcome, getTextSetWelcome, set_welcome_db, set_left_db, isSetLeft, getTextSetLeft, _welcome, _left, antidelete, antionce)
            }
        } catch (err) {
            console.log(err)
        }
    })


    client[from].ev.on('group-participants.update', async (anu) => {
        const { welcome } = require ('./lib/welcome')
        const iswel = _welcome.includes(anu.id)
        const isLeft = _left.includes(anu.id)
        welcome(iswel, isLeft, client[from], anu)
    })

    client[from].ev.on("message.delete", async (anu) => {
        const { aDelete } = require ("./lib/welcome");
        aDelete(setting, client[from], anu)
    })

    client[from].ev.on("viewOnceMessage", async (anu) => {
        const { oneTime } = require ("./lib/welcome");
        oneTime(setting, client[from], anu)
    })

    client[from].ev.process(async (events) => {
        if (events['presence.update']) {
            await client[from].sendPresenceUpdate('available')
        }
        if (events['messages.upsert']) {
            const upsert = events['messages.upsert']
            for (let msg of upsert.messages) {
                if (msg.key.remoteJid === 'status@broadcast') {
                    if (msg.message?.protocolMessage) return
                    await delay(3000)
                    await client[from].readMessages([msg.key])
                }
            }
        }
        if (events['creds.update']) {
            await saveCreds()
        }
    })

    client[from].decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    client[from].ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = client[from].decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })

    client[from].getName = (jid, withoutContact = false) => {
        id = client[from].decodeJid(jid)
        withoutContact = client[from].withoutContact || withoutContact 
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = client[from].groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === client[from].decodeJid(client[from].user.id) ? client[from].user : (store.contacts[id] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }

    client[from].sendContact = async (jid, quoted) => {
        client[from].sendMessage(jid, { contacts: { displayName: "Owner", contacts: contacts } }, { quoted: quoted });
    }

    client[from].setStatus = (status) => {
        client[from].query({
            tag: 'iq',
            attrs: {
                to: '@s.whatsapp.net',
                type: 'set',
                xmlns: 'status',
            },
            content: [{
                tag: 'status',
                attrs: {},
                content: Buffer.from(status, 'utf-8')
            }]
        })
        return status
    }

    client[from].prefa = 'dame'
    client[from].public = true
    client[from].serializeM = (m) => smsg(client[from], m, store)

    client[from].reSize = async (image, width, height) => {
        let jimp = require('jimp')
        var oyy = await jimp.read(image);
        var kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
        return kiyomasa
    }

    client[from].sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
    let type = await client[from].getFile(path, true)
    let {
        res,
        data: file,
        filename: pathFile
    } = type
    if (res && res.status !== 200 || file.length <= 65536) {
        try {
            throw {
                json: JSON.parse(file.toString())
            }
        }
        catch (e) {
            if (e.json) throw e.json
        }
    }
    let opt = {
        filename
    }
    if (quoted) opt.quoted = quoted
    if (!type) options.asDocument = true
    let mtype = '',
    mimetype = type.mime,
    convert
    if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'
    else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'
    else if (/video/.test(type.mime)) mtype = 'video'
    else if (/audio/.test(type.mime))(
        convert = await toAudio(file, type.ext),
        file = convert.data,
        pathFile = convert.filename,
        mtype = 'audio',
        mimetype = 'audio/ogg; codecs=opus'
    )
    else mtype = 'document'
    if (options.asDocument) mtype = 'document'

    delete options.asSticker
    delete options.asLocation
    delete options.asVideo
    delete options.asDocument
    delete options.asImage

    let message = {
        ...options,
        caption,
        ptt,
        [mtype]: {
            url: pathFile
        },
        mimetype,
        fileName: filename || pathFile.split('/').pop()
    }
    let m
    try {
        m = await client[from].sendMessage(jid, message, {
            ...opt,
            ...options
        })
    }
    catch (e) {
        //console.error(e)
        m = null
    }
    finally {
        if (!m) m = await client[from].sendMessage(jid, {
            ...message,
            [mtype]: file
        }, {
            ...opt,
            ...options
        })
        file = null
        return m
    }
}

    client[from].sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
        let mime = '';
        let res = await axios.head(url)
        mime = res.headers['content-type']
        if (mime.split("/")[1] === "gif") {
            return client[from].sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
        }
        let type = mime.split("/")[0]+"Message"
        if (mime === "application/pdf"){
            return client[from].sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
        }
        if (mime.split("/")[0] === "image"){
            return client[from].sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
        }
        if (mime.split("/")[0] === "video"){
            return client[from].sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
        }
        if (mime.split("/")[0] === "audio"){
            return client[from].sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
        }
    }

    client[from].sendTextWithMentions = async (jid, text, quoted, options = {}) => client[from].sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })

    client[from].getFile = async (PATH, returnAsFilename) => {
        let res, filename
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
    if (data && returnAsFilename && !filename)(filename = path.join(__dirname, './sticker/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
    return {
        res,
        filename,
        ...type,
        data
    }
}

    client[from].sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await client[from].sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    client[from].sendMediaAsSticker = async (jid, path, quoted, options = {}) => {
        let { ext, mime, data } = await client[from].getFile(path)
        let media = {}
        let buffer
        media.data = data
        media.mimetype = mime
        if (options && (options.packname || options.author)) {
            buffer = await writeExif(media, options)
        } else {
            buffer = /image/.test(mime) ? await imageToWebp(data) : /video/.test(mime) ? await videoToWebp(data) : ""
        }
        await client[from].sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    client[from].sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await client[from].sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    client[from].sendImage = async (jid, path, caption = '', quoted = '', options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await client[from].sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }

    client[from].downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        let trueFileName = attachExtension ? ('./sticker/' + filename + '.' + type.ext) : './sticker/' + filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

    client[from].downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        return buffer
    } 
 
    client[from].sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await client[from].sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
    }

    client[from].sendVideo = async (jid, path, gif = false, caption = '', quoted = '', options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await client[from].sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
    }

    client[from].sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
        let types = await client[from].getFile(path, true)
        let { mime, ext, res, data, filename } = types
        if (res && res.status !== 200 || file.length <= 65536) {
            try { throw { json: JSON.parse(file.toString()) } }
            catch (e) { if (e.json) throw e.json }
        }
        let type = '', mimetype = mime, pathFile = filename
        if (options.asDocument) type = 'document'
        if (options.asSticker || /webp/.test(mime)) {
            let media = { mimetype: mime, data }
            pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
            await fs.promises.unlink(filename)
            type = 'sticker'
            mimetype = 'image/webp'
        }
        else if (/image/.test(mime)) type = 'image'
        else if (/video/.test(mime)) type = 'video'
        else if (/audio/.test(mime)) type = 'audio'
        else type = 'document'
        await client[from].sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
        return fs.promises.unlink(pathFile)
    }

    client[from].copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
        if (options.readViewOnce) {
            message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
            vtype = Object.keys(message.message.viewOnceMessage.message)[0]
            delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
            delete message.message.viewOnceMessage.message[vtype].viewOnce
            message.message = {
                ...message.message.viewOnceMessage.message
            }
        }

        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
        let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await client[from].relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
        return waMessage
    }

    client[from].sendText = (jid, text, quoted = '', options) => client[from].sendMessage(jid, { text: text, ...options }, { quoted, ...options })

    client[from].cMod = (jid, copy, text = '', sender = client[from].user.id, options = {}) => {
        //let copy = message.toJSON()
        let mtype = Object.keys(copy.message)[0]
        let isEphemeral = mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
        let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
        else if (content.caption) content.caption = text || content.caption
        else if (content.text) content.text = text || content.text
        if (typeof content !== 'string') msg[mtype] = {
            ...content,
            ...options
        }
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
        else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
        copy.key.remoteJid = jid
        copy.key.fromMe = sender === client[from].user.id

        return proto.WebMessageInfo.fromObject(copy)
    }

    return client[from]
}

startHaruka()
}

    async function stopjadibot(haruka, from) {
        if (!Object.keys(client).includes(from)) {
            return haruka.sendMessage(from, { text: 'Anda tidak ada di dalam database.' })
        }
        try {
            client[from].end("stop")
        } catch (err) {
            //console.log('Error! tidak dapat menghapus user dari database!')
            //console.log('Error! silahkan hapus secara manual dari database.')
        }
            delete client[from]
            rimraf.sync(`./database/users/${from.split("@")[0]}`)
        }

    async function listjadibot(haruka, m) {
        let from = m.key.remoteJid
        let mentions = []
        let text = '';
        for (let jadibot of Object.values(client)) {
            mentions.push(jadibot.user.jid)
            text += `- ${jadibot.user.jid || 'Tidak ada user!'}`
        }
        return haruka.sendMessage(from, { text: text.trim(), mentions, })
    }

module.exports = { jadibot, stopjadibot, listjadibot }
